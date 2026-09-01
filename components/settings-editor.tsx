"use client";

import { useEffect, useId, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SETTINGS EDITOR — revisioned configuration namespaces
 *
 * Every namespace card pins the document revision it edited;
 * Save captures that revision and the current editable draft.
 * A simulated external write surfaces as a conflict without
 * replacing the draft. Only Discard & refetch accepts remote
 * state and advances the pinned revision.
 * ───────────────────────────────────────────────────────── */

type Phase = "edit" | "saving" | "saved" | "conflict" | "refetching";
type SaveAttempt = {
  draft: string;
  expectedRevision: number;
};

const NAMESPACE = "llm";
const BASE_DOC = {
  defaultRoute: "deepseek/reasoner",
  temperature: 0.7,
  maxTokens: 8192,
};
const EXTERNAL_DOC = {
  defaultRoute: "deepseek/reasoner",
  temperature: 0.4,
  maxTokens: 8192,
};
const INITIAL_DOC = JSON.stringify(BASE_DOC, null, 2);
const REMOTE_DOC = JSON.stringify(EXTERNAL_DOC, null, 2);
const CONFLICT_DRAFT = '{\n  "theme": "dark",\n  "maxTokens": 12288\n}';

const SAVE_MS = 650;
const HOLD_SAVED_MS = 1500;
const REFETCH_MS = 900;

export default function SettingsEditor({
  lang: propLang,
  visualCase,
}: {
  lang?: "en" | "zh";
  visualCase?: string;
}) {
  const lang = useLang("settings-editor", propLang);
  const zh = lang === "zh";
  const conflictCase = visualCase === "conflict";
  const refetchedCase = visualCase === "refetched";
  const instanceId = useId();
  const statusId = `${instanceId}-status`;
  const conflictId = `${instanceId}-conflict`;

  const [revision, setRevision] = useState(refetchedCase ? 9 : conflictCase ? 8 : 7);
  const [saved, setSaved] = useState(refetchedCase ? REMOTE_DOC : INITIAL_DOC);
  const [draft, setDraft] = useState(
    refetchedCase ? REMOTE_DOC : conflictCase ? CONFLICT_DRAFT : INITIAL_DOC,
  );
  const [phase, setPhase] = useState<Phase>(conflictCase ? "conflict" : "edit");
  const [attempt, setAttempt] = useState<SaveAttempt | null>(null);
  const [nextSaveConflicts, setNextSaveConflicts] = useState(conflictCase);
  const [remoteRevision, setRemoteRevision] = useState<number | null>(
    conflictCase ? 9 : null,
  );

  useEffect(() => {
    if (phase !== "saving" || !attempt) return;
    const timer = setTimeout(() => {
      if (nextSaveConflicts) {
        setRemoteRevision(attempt.expectedRevision + 1);
        setPhase("conflict");
        return;
      }

      setSaved(attempt.draft);
      setDraft(attempt.draft);
      setRevision(attempt.expectedRevision + 1);
      setNextSaveConflicts(true);
      setAttempt(null);
      setPhase("saved");
    }, SAVE_MS);
    return () => clearTimeout(timer);
  }, [attempt, nextSaveConflicts, phase]);

  useEffect(() => {
    if (phase !== "saved") return;
    const timer = setTimeout(() => setPhase("edit"), HOLD_SAVED_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "refetching") return;
    const acceptedRevision = remoteRevision ?? revision + 1;
    const timer = setTimeout(() => {
      setRevision(acceptedRevision);
      setSaved(REMOTE_DOC);
      setDraft(REMOTE_DOC);
      setAttempt(null);
      setRemoteRevision(null);
      setNextSaveConflicts(false);
      setPhase("edit");
    }, REFETCH_MS);
    return () => clearTimeout(timer);
  }, [phase, remoteRevision, revision]);

  const saveDraft = () => {
    if (phase !== "edit" || draft === saved) return;
    setAttempt({ draft, expectedRevision: revision });
    setPhase("saving");
  };

  const busy = phase === "saving" || phase === "refetching";
  const conflictLike = phase === "conflict" || phase === "refetching";
  const readOnly = phase !== "edit";
  const tone = conflictLike
    ? "bg-orange-tint text-orange"
    : phase === "saved"
      ? "bg-green-tint text-green"
      : "bg-field text-ink-2";

  const statusText = phase === "saving"
    ? zh ? "保存中…" : "Saving…"
    : phase === "saved"
      ? zh ? `已保存 revision ${revision}` : `Saved revision ${revision}`
      : phase === "conflict"
        ? zh ? "外部已修改" : "Edited elsewhere"
        : phase === "refetching"
          ? zh ? "正在重新读取…" : "Refetching…"
          : draft === saved
            ? zh ? "已同步" : "In sync"
            : zh ? "编辑中" : "Editing";

  return (
    <section
      role="region"
      aria-label={zh ? `${NAMESPACE} 设置` : `${NAMESPACE} settings`}
      aria-busy={busy}
      className="w-full max-w-lg self-start overflow-hidden rounded-card border border-line bg-surface shadow-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-inset px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="font-mono text-[13px] font-semibold text-ink">{NAMESPACE}</h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-2">
              {zh ? "配置命名空间 · 乐观并发" : "Configuration namespace · optimistic concurrency"}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2" style={{ transform: "translateZ(0)" }}>
          revision {revision}
        </span>
      </div>

      <div className="p-3">
        <textarea
          value={draft}
          readOnly={readOnly}
          onChange={(event) => setDraft(event.target.value)}
          aria-label={zh ? "设置 JSON" : "Settings JSON"}
          aria-invalid={conflictLike}
          aria-describedby={`${statusId}${conflictLike ? ` ${conflictId}` : ""}`}
          spellCheck={false}
          rows={7}
          style={{ appearance: "none", transform: "translateZ(0)" }}
          className={`w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] transition-colors duration-200 motion-reduce:transition-none ${
            conflictLike
              ? "border-orange/60 bg-orange-tint/30 text-ink"
              : "border-line-strong bg-inset text-ink focus:border-accent focus:bg-surface"
          }`}
        />

        {conflictLike && (
          <div
            id={conflictId}
            role="alert"
            className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-control border border-orange/40 bg-orange-tint px-3 py-2.5 motion-safe:animate-[fade-up_300ms_cubic-bezier(0.23,1,0.32,1)_both]"
          >
            <span className="text-[11.5px] font-medium leading-relaxed text-ink">
              {phase === "refetching"
                ? zh ? "正在接受远端 revision，草稿即将替换" : "Accepting the remote revision — draft replacement pending"
                : zh ? "预期 revision 已过期 — 草稿仍保留" : "expectedRevision is stale — your draft is preserved"}
            </span>
            <span className="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
          </div>
        )}

        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
          <span
            id={statusId}
            role="status"
            aria-label={zh ? "设置状态" : "Settings status"}
            aria-live="polite"
            aria-atomic="true"
            className={`flex min-h-8 items-center gap-1.5 rounded-chip px-2.5 py-1 text-[10.5px] font-medium ${tone}`}
          >
            {busy ? (
              <span aria-hidden className="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2 animate-[spin_700ms_linear_infinite] motion-reduce:animate-none" />
            ) : null}
            {statusText}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {conflictLike && (
              <button
                type="button"
                aria-label={phase === "refetching" ? (zh ? "正在重新读取设置" : "Refetching settings") : zh ? "放弃修改并重新读取" : "Discard changes and refetch"}
                aria-busy={phase === "refetching"}
                disabled={phase === "refetching"}
                onClick={() => setPhase("refetching")}
                className="min-h-11 rounded-control border border-line-strong bg-surface px-3 text-[11px] font-medium text-ink shadow-btn hover:bg-hover focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none disabled:cursor-wait disabled:opacity-60 cursor-pointer"
              >
                {phase === "refetching" ? (zh ? "重新读取中…" : "Refetching…") : zh ? "放弃修改并刷新" : "Discard & refetch"}
              </button>
            )}
            <button
              type="button"
              aria-label={zh ? "保存 revision" : "Save revision"}
              aria-busy={phase === "saving"}
              disabled={phase !== "edit" || draft === saved}
              onClick={saveDraft}
              className="min-h-11 rounded-control bg-accent px-3.5 text-[11px] font-medium text-white hover:opacity-90 focus-visible:shadow-[inset_0_0_0_2px_var(--ink)] focus-visible:outline-none transition-opacity motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              {phase === "saving" ? (zh ? "保存中…" : "Saving…") : zh ? "保存" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
