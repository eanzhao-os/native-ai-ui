"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * KUMO-STYLE SENSITIVE INPUT & SECRET VAULT
 * ───────────────────────────────────────────────────────── */

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  try {
    textarea.select();
    return document.execCommand("copy");
  } finally {
    textarea.remove();
  }
}

export default function SensitiveInput({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("sensitive-input", propLang);
  const zh = lang === "zh";

  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [apiKey, setApiKey] = useState("dsk-live-9824f1a8c901e47d8b3a5c2e");
  const copyOperation = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      copyOperation.current += 1;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    const operation = copyOperation.current + 1;
    copyOperation.current = operation;
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
    setCopied(false);
    setCopyError(false);

    try {
      const success = await copyText(apiKey);
      if (operation !== copyOperation.current) return;
      if (!success) {
        setCopyError(true);
        return;
      }
      setCopied(true);
      resetTimer.current = setTimeout(() => {
        if (operation === copyOperation.current) setCopied(false);
      }, 1500);
    } catch {
      if (operation !== copyOperation.current) return;
      setCopied(false);
      setCopyError(true);
    }
  };

  const revealLabel = revealed
    ? zh
      ? "隐藏令牌"
      : "Hide token"
    : zh
      ? "显示令牌"
      : "Reveal token";

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "API 密钥与凭据保险箱" : "API Key & Credentials"}
              </h3>
              <span className="rounded-chip bg-accent-tint px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-accent-ink">
                Kumo Pattern
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-2">
              {zh ? "DeepSeek 认证令牌与 Harness 运行凭据" : "DeepSeek Reasoning & Harness credentials"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-chip bg-green-tint px-2 py-1 font-mono text-[10px] font-medium text-green">
          {zh ? "静态落盘加密" : "Encrypted at Rest"}
        </span>
      </div>

      {/* Sensitive Input Field */}
      <div className="mt-4">
        <label
          htmlFor="sensitive-api-token"
          className="mb-1.5 block text-[11.5px] font-medium text-ink-2"
        >
          {zh ? "DeepSeek API Token (生产环境)" : "DeepSeek API Token (Production)"}
        </label>

        <div className="flex items-center gap-2 rounded-control border border-line bg-field px-2 py-1 focus-within:border-accent focus-within:bg-surface focus-within:ring-2 focus-within:ring-accent/20 transition-all motion-reduce:transition-none">
          <input
            id="sensitive-api-token"
            type={revealed ? "text" : "password"}
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            autoComplete="new-password"
            spellCheck={false}
            className="min-h-11 w-full min-w-0 bg-transparent px-1 font-mono text-[12px] text-ink focus:outline-none"
          />

          <div className="flex shrink-0 items-center gap-1 text-ink-2">
            {/* Reveal / Hide Toggle */}
            <button
              type="button"
              aria-label={revealLabel}
              aria-pressed={revealed}
              onClick={() => setRevealed((current) => !current)}
              className="flex size-11 items-center justify-center rounded-control hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
              title={revealLabel}
            >
              {revealed ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12 s4 -8 11 -8 s11 8 11 8 s-4 8 -11 8 s-11 -8 -11 -8 z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>

            {/* Copy Button */}
            <button
              type="button"
              aria-label={zh ? "复制令牌" : "Copy token"}
              onClick={handleCopy}
              className="flex min-h-11 items-center gap-1.5 rounded-control border border-line-strong bg-surface px-3 text-[11px] font-medium text-ink-2 shadow-btn hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{zh ? "复制" : "Copy"}</span>
            </button>
          </div>
        </div>
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={`mt-1.5 min-h-4 text-right text-[10.5px] font-medium ${copyError ? "text-red" : "text-green"}`}
        >
          {copyError ? (zh ? "复制失败" : "Copy failed") : copied ? (zh ? "已复制!" : "Copied!") : ""}
        </div>
      </div>

      {/* Security Scope Footer */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] text-ink-2">
        <span className="font-mono">{zh ? "作用域: chat.completions, reasoner" : "Scope: chat.completions, reasoner"}</span>
        <span>{zh ? "有效期剩余 89 天" : "Expires in 89 days"}</span>
      </div>
    </div>
  );
}
