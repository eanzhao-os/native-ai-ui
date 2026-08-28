"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * ARTIFACT SANDBOX & LIVE PREVIEWER
 * ───────────────────────────────────────────────────────── */

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

  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = async () => {
    setCopyError(false);
    try {
      if (!(await copyText(SAMPLE_CODE))) {
        setCopyError(true);
        return;
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-inset px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12.5px] font-semibold text-ink">MetricsWidget.tsx</span>
              <span className="rounded-chip border border-line bg-surface px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                v2.1
              </span>
            </div>
          </div>
        </div>

        {/* Tab & Viewport Switchers */}
        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="flex rounded-control bg-field p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                tab === "preview" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              {zh ? "实时预览" : "Preview"}
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                tab === "code" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              {zh ? "代码" : "Code"}
            </button>
          </div>

          {/* Viewport controls */}
          {tab === "preview" && (
            <div className="hidden sm:flex items-center gap-1 rounded-control bg-field p-0.5 text-ink-3">
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                className={`flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                  viewport === "desktop" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                }`}
                title={zh ? "桌面端" : "Desktop"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewport("tablet")}
                className={`flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                  viewport === "tablet" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                }`}
                title={zh ? "平板端" : "Tablet"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                className={`flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                  viewport === "mobile" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                }`}
                title={zh ? "移动端" : "Mobile"}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* Copy Button */}
          <button
            type="button"
            aria-label={zh ? "复制" : "Copy"}
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
          >
            {copyError ? (
              <span role="status" aria-live="polite" className="text-red">
                {zh ? "复制失败" : "Copy failed"}
              </span>
            ) : copied ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span role="status" aria-live="polite" className="text-green">
                  {zh ? "已复制" : "Copied"}
                </span>
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{zh ? "复制代码" : "Copy"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Canvas Body */}
      <div className="flex min-h-[220px] items-center justify-center bg-canvas p-6 transition-all">
        {tab === "preview" ? (
          <div
            className={`transition-all duration-300 w-full ${
              viewport === "mobile" ? "max-w-[280px]" : viewport === "tablet" ? "max-w-[380px]" : "max-w-md"
            }`}
          >
            {/* Live Rendered Component Inside Sandbox */}
            <div className="grid grid-cols-2 gap-3 rounded-control border border-line bg-surface p-4 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[11px] text-ink-3">{zh ? "日活跃用户 (DAU)" : "Daily Active Users"}</span>
                <span className="font-mono text-[16px] font-semibold text-ink mt-0.5">24,582</span>
                <span className="font-mono text-[10px] text-green font-medium mt-1">↑ +14.2%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-ink-3">{zh ? "平均响应延迟" : "Avg Latency"}</span>
                <span className="font-mono text-[16px] font-semibold text-ink mt-0.5">184ms</span>
                <span className="font-mono text-[10px] text-green font-medium mt-1">↓ -18.4%</span>
              </div>
              <div className="col-span-2 mt-1 border-t border-line pt-2 flex items-center justify-between text-[10.5px] text-ink-3">
                <span>{zh ? "2分钟前已自动刷新" : "Auto-refreshed 2m ago"}</span>
                <span className="text-accent cursor-pointer hover:underline">
                  {zh ? "查看遥测数据 →" : "View telemetry →"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-control border border-line bg-page p-3 font-mono text-[11px] leading-relaxed text-ink-2">
            <pre>
              <code>{SAMPLE_CODE}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Sandbox Footer */}
      <div className="flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3">
        <span>{zh ? "技术栈: React 19 + Tailwind CSS" : "Framework: React 19 + Tailwind CSS"}</span>
        <span className="font-mono">{zh ? "编译耗时: 12ms" : "Compiled in 12ms"}</span>
      </div>
    </div>
  );
}
