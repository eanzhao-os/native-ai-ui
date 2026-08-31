"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * ARTIFACT SANDBOX & LIVE PREVIEWER
 * ───────────────────────────────────────────────────────── */

type Tab = "preview" | "code";
type Viewport = "desktop" | "tablet" | "mobile";

const SAMPLE_CODE = `import React from 'react';

export function MetricsWidget({ title, value, change }: Props) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <span className="text-xs text-ink-2">{title}</span>
      <div className="mt-1 flex items-baseline gap-2">
        <h3 className="text-xl font-semibold text-ink">{value}</h3>
        <span className="text-xs font-medium text-green">{change}</span>
      </div>
    </div>
  );
}`;

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
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export default function ArtifactSandbox({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("artifact-sandbox", propLang);
  const zh = lang === "zh";
  const id = useId();

  const [tab, setTab] = useState<Tab>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    preview: null,
    code: null,
  });
  const copyTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    },
    [],
  );

  const selectTab = (next: Tab, focus = false) => {
    setTab(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const next =
      event.key === "ArrowRight" || event.key === "End"
        ? "code"
        : event.key === "ArrowLeft" || event.key === "Home"
          ? "preview"
          : null;
    if (!next) return;
    event.preventDefault();
    selectTab(next, true);
  };

  const handleCopy = async () => {
    setCopied(false);
    setCopyError(false);
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    try {
      if (!(await copyText(SAMPLE_CODE))) {
        setCopyError(true);
        return;
      }
      setCopied(true);
      copyTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimerRef.current = null;
      }, 1_600);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  const tabLabel = tab === "preview" ? (zh ? "实时预览" : "Preview") : zh ? "代码" : "Code";

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div className="border-b border-line bg-inset px-3 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink shadow-hairline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[12.5px] font-semibold text-ink">MetricsWidget.tsx</span>
              <span className="shrink-0 rounded-chip border border-line-strong bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-2">
                v2.1
              </span>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
            <div
              role="tablist"
              aria-label={zh ? "工件视图" : "Artifact view"}
              className="flex rounded-control border border-line bg-field p-0.5 text-[11.5px] shadow-hairline"
            >
              {(["preview", "code"] as const).map((value) => {
                const active = tab === value;
                const label = value === "preview" ? (zh ? "实时预览" : "Preview") : zh ? "代码" : "Code";
                return (
                  <button
                    key={value}
                    ref={(node) => {
                      tabRefs.current[value] = node;
                    }}
                    id={`${id}-${value}-tab`}
                    type="button"
                    role="tab"
                    aria-controls={`${id}-${value}-panel`}
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectTab(value)}
                    onKeyDown={handleTabKeyDown}
                    className={`min-h-8 rounded-chip px-2.5 font-medium transition-[background-color,color,box-shadow] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
                      active ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {tab === "preview" && (
              <div
                role="group"
                aria-label={zh ? "预览尺寸" : "Preview size"}
                className="hidden items-center gap-0.5 rounded-control border border-line bg-field p-0.5 text-ink-3 shadow-hairline sm:flex"
              >
                {(["desktop", "tablet", "mobile"] as const).map((value) => {
                  const active = viewport === value;
                  const label =
                    value === "desktop"
                      ? zh ? "桌面端" : "Desktop"
                      : value === "tablet"
                        ? zh ? "平板端" : "Tablet"
                        : zh ? "移动端" : "Mobile";
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-label={label}
                      aria-pressed={active}
                      onClick={() => setViewport(value)}
                      className={`flex size-8 items-center justify-center rounded-chip transition-[background-color,color,box-shadow] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
                        active ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                      }`}
                    >
                      {value === "desktop" ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      ) : value === "tablet" ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <rect x="5" y="2" width="14" height="20" rx="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              aria-label={zh ? "复制" : "Copy"}
              onClick={handleCopy}
              className="flex min-h-8 items-center gap-1.5 rounded-control border border-line bg-surface px-2.5 text-[11.5px] font-medium text-ink-2 shadow-hairline transition-[background-color,color,border-color] motion-reduce:transition-none hover:border-line-strong hover:bg-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            >
              {copyError ? (
                <span role="status" aria-live="polite" className="text-red">
                  {zh ? "复制失败" : "Copy failed"}
                </span>
              ) : copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span role="status" aria-live="polite" className="text-green">
                    {zh ? "已复制" : "Copied"}
                  </span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{zh ? "复制代码" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {tab === "preview" ? (
        <div
          id={`${id}-preview-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-preview-tab`}
          aria-label={tabLabel}
          className="flex min-h-[244px] items-center justify-center bg-canvas p-4 sm:p-6"
        >
          <div
            className={`w-full transition-[max-width] duration-300 motion-reduce:transition-none ${
              viewport === "mobile" ? "max-w-[280px]" : viewport === "tablet" ? "max-w-[380px]" : "max-w-md"
            }`}
          >
            <div
              className={`grid gap-3 rounded-control border border-line bg-surface p-4 shadow-sm ${
                viewport === "mobile" ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] text-ink-3">{zh ? "日活跃用户 (DAU)" : "Daily Active Users"}</span>
                <span className="mt-0.5 font-mono text-[16px] font-semibold text-ink">24,582</span>
                <span className="mt-1 font-mono text-[10px] font-medium text-green">↑ +14.2%</span>
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] text-ink-3">{zh ? "平均响应延迟" : "Avg Latency"}</span>
                <span className="mt-0.5 font-mono text-[16px] font-semibold text-ink">184ms</span>
                <span className="mt-1 font-mono text-[10px] font-medium text-green">↓ -18.4%</span>
              </div>
              <div
                className={`mt-1 flex flex-wrap items-center justify-between gap-1.5 border-t border-line pt-2 text-[10.5px] text-ink-3 ${
                  viewport === "mobile" ? "col-span-1" : "col-span-2"
                }`}
              >
                <span>{zh ? "2 分钟前自动刷新" : "Auto-refreshed 2m ago"}</span>
                <span className="font-medium text-green">{zh ? "遥测正常" : "Telemetry healthy"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          id={`${id}-code-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-code-tab`}
          aria-label={tabLabel}
          className="min-h-[244px] bg-canvas p-4 sm:p-5"
        >
          <div role="region" aria-label={zh ? "源代码" : "Source code"} className="h-[212px] overflow-auto rounded-control border border-line bg-page shadow-inset focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-accent">
            <pre tabIndex={0} className="min-w-max p-3.5 font-mono text-[11px] leading-[1.65] text-ink-2 focus:outline-none">
              <code>{SAMPLE_CODE}</code>
            </pre>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3">
        <span>{zh ? "技术栈：React 19 + Tailwind CSS" : "Framework: React 19 + Tailwind CSS"}</span>
        <span className="font-mono">{zh ? "编译耗时：12ms" : "Compiled in 12ms"}</span>
      </div>
    </div>
  );
}
