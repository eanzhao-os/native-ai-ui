"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * AUTHORIZATION SURFACE — provider credentials & sign-in flows
 *
 * Directory rows show configured state as a tint chip, never
 * the secret itself. Begin routes a prompt card to exactly one
 * surface: masked secret with reveal, explicit accept / decline
 * / withdraw. Settling collapses to a quiet configured row.
 * ───────────────────────────────────────────────────────── */

type AuthEntry = {
  key: string;
  kind: string;
  scope: string;
};

const DIRECTORY: AuthEntry[] = [
  { key: "deepseek", kind: "oauth", scope: "chat.completions, reasoner" },
  { key: "openai", kind: "api-key", scope: "responses, embeddings" },
  { key: "e2b", kind: "api-key", scope: "sandboxes:write" },
];

type Phase = "idle" | "prompt" | "settling" | "done";
type Outcome = { kind: "revoked"; provider: string } | null;

const HOLD_IDLE_MS = 1400;
const TYPE_MS = 110;
const SETTLE_MS = 900;
const HOLD_DONE_MS = 3400;

export default function AuthorizationSurface({
  lang: propLang,
  visualCase,
}: {
  lang?: "en" | "zh";
  visualCase?: string;
}) {
  const lang = useLang("authorization-surface", propLang);
  const zh = lang === "zh";
  const providerSwitchedCase = visualCase === "provider-switched";
  const instanceId = useId();
  const promptId = `${instanceId}-prompt`;
  const promptInputRef = useRef<HTMLInputElement>(null);
  const providerControlRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const originatingProviderRef = useRef<string | null>(null);
  const promptFocusRequestedRef = useRef(false);
  const providerFocusRequestedRef = useRef<string | null>(null);

  const [configured, setConfigured] = useState<Record<string, boolean>>({ deepseek: false, openai: true, e2b: false });
  const [flowKey, setFlowKey] = useState<string | null>(providerSwitchedCase ? "e2b" : null);
  const [phase, setPhase] = useState<Phase>(providerSwitchedCase ? "prompt" : "idle");
  const [secret, setSecret] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);

  const fullSecret = "dsk-live-9824f1a8c901";

  const beginFlow = (key: string, moveFocus = false) => {
    const focusedProvider = Object.entries(providerControlRefs.current).find(
      ([, control]) => control === document.activeElement,
    )?.[0];
    originatingProviderRef.current = moveFocus ? key : (focusedProvider ?? null);
    promptFocusRequestedRef.current = moveFocus || focusedProvider !== undefined;
    setFlowKey(key);
    setPhase("prompt");
    setSecret("");
    setRevealed(false);
    setOutcome(null);
  };

  const withdrawFlow = () => {
    providerFocusRequestedRef.current = originatingProviderRef.current;
    originatingProviderRef.current = null;
    setFlowKey(null);
    setPhase("idle");
    setSecret("");
    setRevealed(false);
  };

  const revokeProvider = (provider: string) => {
    setConfigured((current) => ({ ...current, [provider]: false }));
    setOutcome({ kind: "revoked", provider });
  };

  useEffect(() => {
    if (phase === "prompt" && promptFocusRequestedRef.current) {
      promptFocusRequestedRef.current = false;
      promptInputRef.current?.focus();
    }

    const provider = providerFocusRequestedRef.current;
    const control = provider ? providerControlRefs.current[provider] : null;
    if (provider && control) {
      providerFocusRequestedRef.current = null;
      control.focus();
    }
  }, [configured, flowKey, phase]);

  /* demo loop: begin the deepseek flow, type the secret, accept, settle, reset. */
  useEffect(() => {
    if (phase === "idle" && flowKey === null) {
      const timer = setTimeout(() => beginFlow("deepseek"), HOLD_IDLE_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "prompt") {
      if (secret.length < fullSecret.length) {
        const timer = setTimeout(() => setSecret(fullSecret.slice(0, secret.length + 1)), TYPE_MS);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setPhase("settling"), 500);
      return () => clearTimeout(timer);
    }
    if (phase === "settling") {
      const timer = setTimeout(() => {
        const provider = flowKey ?? "deepseek";
        if (originatingProviderRef.current) {
          providerFocusRequestedRef.current = originatingProviderRef.current;
          originatingProviderRef.current = null;
        }
        setConfigured((current) => ({ ...current, [provider]: true }));
        setPhase("done");
      }, SETTLE_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "done") {
      const timer = setTimeout(() => {
        setFlowKey(null);
        setPhase("idle");
        setSecret("");
        setRevealed(false);
        setConfigured((current) => ({ ...current, deepseek: false }));
      }, HOLD_DONE_MS);
      return () => clearTimeout(timer);
    }
  }, [phase, flowKey, secret]);

  const flowOpen = flowKey !== null && phase !== "idle";
  const configuredCount = Object.values(configured).filter(Boolean).length;
  const busy = phase === "settling";
  const authorizationStatus = busy
    ? zh
      ? `正在授权 ${flowKey ?? ""}`
      : `Authorizing ${flowKey ?? ""}`
    : phase === "done"
      ? zh
        ? `已授权 ${flowKey ?? ""}`
        : `Authorized ${flowKey ?? ""}`
      : flowOpen
        ? zh
          ? `${flowKey ?? ""} 凭据输入已打开`
          : `Credential prompt open for ${flowKey ?? ""}`
        : outcome?.kind === "revoked"
          ? zh
            ? `已撤销 ${outcome.provider}`
            : `Revoked ${outcome.provider}`
          : zh
            ? `${configuredCount}/${DIRECTORY.length} 已配置`
            : `${configuredCount} of ${DIRECTORY.length} configured`;

  return (
    <section
      role="region"
      aria-label={zh ? "授权与凭据目录" : "Authorization directory"}
      aria-busy={busy}
      className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card"
    >
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "授权与凭据目录" : "Authorization Directory"}
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-2">
              {zh ? "凭据只写入不展示；配置状态是唯一事实" : "Secrets are write-only; configured state is the only display"}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-chip border border-line bg-inset px-2 py-1 font-mono text-[10px] text-ink-2">
          {configuredCount}/{DIRECTORY.length} {zh ? "已配置" : "configured"}
        </span>
      </div>

      <div
        role="status"
        aria-label={zh ? "授权状态" : "Authorization status"}
        aria-live="polite"
        aria-atomic="true"
        className="mt-3 min-h-8 rounded-control border border-line bg-inset/60 px-3 py-2 text-[11px] font-medium text-ink-2"
      >
        {authorizationStatus}
      </div>

      {/* directory rows */}
      <div className="mt-3 flex flex-col gap-2">
        {DIRECTORY.map((entry) => {
          const isConfigured = configured[entry.key];
          const inFlight = flowKey === entry.key && phase !== "idle";
          return (
            <div
              key={entry.key}
              aria-busy={inFlight && busy}
              className={`flex min-h-14 flex-wrap items-center gap-2.5 rounded-control border px-3 py-2 transition-colors duration-200 motion-reduce:transition-none ${
                inFlight ? "border-accent bg-accent-tint/30" : "border-line bg-surface"
              }`}
            >
              <div className="min-w-40 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[12.5px] font-medium text-ink">{entry.key}</span>
                  <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[9.5px] text-ink-2">
                    {entry.kind}
                  </span>
                </div>
                <p className="mt-0.5 whitespace-normal break-words font-mono text-[10px] leading-relaxed text-ink-2">{entry.scope}</p>
              </div>
              {isConfigured ? (
                <span className="flex min-h-7 items-center gap-1 rounded-chip bg-green-tint px-2 py-1 text-[10.5px] font-medium text-green motion-safe:animate-[pop-in_250ms_cubic-bezier(0.23,1,0.32,1)_both]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {zh ? "已配置" : "Configured"}
                </span>
              ) : inFlight ? (
                <span className="flex min-h-11 items-center gap-1.5 text-[10.5px] font-medium text-ink-2">
                  <span aria-hidden className="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2 animate-[spin_700ms_linear_infinite] motion-reduce:animate-none" />
                  {zh ? "授权中…" : "authorizing…"}
                </span>
              ) : (
                <button
                  ref={(control) => {
                    providerControlRefs.current[entry.key] = control;
                  }}
                  type="button"
                  aria-label={zh ? `登录 ${entry.key}` : `Sign in to ${entry.key}`}
                  onClick={() => beginFlow(entry.key, true)}
                  className="min-h-11 rounded-control border border-line-strong bg-surface px-3 text-[11px] font-medium text-ink shadow-btn hover:bg-hover focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-100 motion-reduce:transition-none cursor-pointer"
                >
                  {zh ? "登录" : "Sign in"}
                </button>
              )}
              {isConfigured && (
                <button
                  ref={(control) => {
                    providerControlRefs.current[entry.key] = control;
                  }}
                  type="button"
                  aria-label={zh ? `退出 ${entry.key}` : `Sign out of ${entry.key}`}
                  onClick={() => revokeProvider(entry.key)}
                  className="min-h-11 min-w-11 rounded-control px-2.5 text-[11px] font-medium text-ink-2 hover:bg-red-tint hover:text-red focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-100 motion-reduce:transition-none cursor-pointer"
                >
                  {zh ? "退出" : "Sign out"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* prompt card — exactly one surface while a flow is open */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none"
        style={{
          gridTemplateRows: flowOpen ? "1fr" : "0fr",
          opacity: flowOpen ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div className="overflow-hidden">
          {flowOpen ? (
            <div id={promptId} aria-busy={busy} className="mt-3 rounded-control border border-line bg-inset/70 p-3">
              {phase === "done" ? (
                <div className="flex items-center gap-2 py-1">
                  <span className="flex size-6 items-center justify-center rounded-full bg-green text-white motion-safe:animate-[pop-in_300ms_cubic-bezier(0.23,1,0.32,1)_both]">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[12px] font-medium text-ink">
                    {zh ? "授权完成，凭据已写入保险箱" : "Authorized — credential written to the vault"}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] font-medium text-ink">
                      {zh ? `授权 ${flowKey ?? ""}` : `Authorize ${flowKey ?? ""}`}
                    </span>
                    <span className="rounded-chip bg-accent-tint px-1.5 py-0.5 font-mono text-[9.5px] text-accent-ink">
                      {phase === "settling" ? (zh ? "写入中" : "writing") : zh ? "等待输入" : "awaiting input"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 rounded-control border border-line bg-field px-2 focus-within:border-accent focus-within:bg-surface focus-within:ring-2 focus-within:ring-accent/20 transition-colors motion-reduce:transition-none">
                    <input
                      ref={promptInputRef}
                      type={revealed ? "text" : "password"}
                      value={secret}
                      onChange={(event) => setSecret(event.target.value)}
                      aria-label={zh ? "访问令牌" : "Access token"}
                      autoComplete="new-password"
                      spellCheck={false}
                      className="min-h-11 w-full min-w-0 bg-transparent font-mono text-[12px] text-ink outline-none"
                    />
                    <button
                      type="button"
                      aria-label={revealed ? (zh ? "隐藏令牌" : "Hide token") : zh ? "显示令牌" : "Reveal token"}
                      aria-pressed={revealed}
                      onClick={() => setRevealed((current) => !current)}
                      className="flex size-11 shrink-0 items-center justify-center rounded-control text-ink-2 hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
                    >
                      {revealed ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={withdrawFlow}
                      className="min-h-11 rounded-control px-3 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
                    >
                      {zh ? "取消流程" : "Withdraw"}
                    </button>
                    <button
                      type="button"
                      disabled={secret.length === 0 || busy}
                      aria-busy={busy}
                      onClick={() => setPhase("settling")}
                      className="min-h-11 rounded-control bg-accent px-3.5 text-[11px] font-medium text-white hover:opacity-90 focus-visible:shadow-[inset_0_0_0_2px_var(--ink)] focus-visible:outline-none transition-opacity motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      {busy ? (zh ? "写入中…" : "Writing…") : zh ? "确认授权" : "Authorize"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
