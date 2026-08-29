"use client";

import { useEffect, useState } from "react";
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

  const tone =
    phase === "conflict" ? "bg-orange-tint text-orange"
    : phase === "saved" ? "bg-green-tint text-green"
    : "bg-field text-ink-2";

  const statusText =
    phase === "saving" ? (zh ? "保存中…" : "Saving…")
    : phase === "saved" ? (zh ? `已保存 revision ${revision}` : `Saved revision ${revision}`)
    : phase === "conflict" ? (zh ? "外部已修改" : "Edited elsewhere")
    : phase === "refetching" ? (zh ? "正在重新读取…" : "Refetching…")
    : draft === saved ? (zh ? "已同步" : "In sync")
    : zh ? "编辑中" : "Editing";

  const readOnly = phase !== "edit";
  const conflictLike = phase === "conflict" || phase === "refetching";

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface shadow-card">
      <div className="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </span>
          <div>
            <h3 className="font-mono text-[13px] font-semibold text-ink">{NAMESPACE}</h3>
            <p className="text-[11px] text-ink-3">
              {zh ? "配置命名空间 · 乐观并发" : "Configuration namespace · optimistic concurrency"}
            </p>
          </div>
        </div>
        <span className="rounded-chip border border-line bg-surface px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-3">
          revision {revision}
        </span>
      </div>

      <div className="p-3">
        <textarea
          value={draft}
          readOnly={readOnly}
          onChange={(event) => setDraft(event.target.value)}
          aria-label={zh ? "设置 JSON" : "Settings JSON"}
          spellCheck={false}
          rows={7}
          className={`w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none transition-colors duration-200 ${
            conflictLike
              ? "border-orange/50 bg-orange-tint/25 text-ink-2"
              : "border-line bg-inset text-ink focus:border-accent focus:bg-surface"
          }`}
        />

        {phase === "conflict" && (
          <div
            role="alert"
            className="mt-2 flex items-center justify-between rounded-control border border-orange/35 bg-orange-tint px-3 py-2"
            style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            <span className="text-[11.5px] font-medium text-ink">
              {zh ? "预期 revision 已过期 — 草稿仍保留" : "expectedRevision is stale — your draft is preserved"}
            </span>
            <span className="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
          </div>
        )}

        <div className="mt-2.5 flex items-center justify-between">
          <span className={`flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-[10.5px] font-medium ${tone}`}>
            {phase === "saving" || phase === "refetching" ? (
              <span
                className="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2"
                style={{ animation: "spin 700ms linear infinite" }}
              />
            ) : null}
            {statusText}
          </span>
          <div className="flex items-center gap-2">
            {phase === "conflict" && (
              <button
                type="button"
                aria-label={zh ? "放弃修改并重新读取" : "Discard changes and refetch"}
                onClick={() => setPhase("refetching")}
                className="rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer"
              >
                {zh ? "放弃修改并刷新" : "Discard & refetch"}
              </button>
            )}
            <button
              type="button"
              aria-label={zh ? "保存 revision" : "Save revision"}
              disabled={phase !== "edit" || draft === saved}
              onClick={saveDraft}
              className="rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer"
            >
              {zh ? "保存" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
