import { NaiBaseElement } from "../core/base-element.js";

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

async function copyText(value) {
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

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export class NaiArtifactSandbox extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._tab = "preview";
    this._viewport = "desktop";
    this._copied = false;
    this._copyError = false;
  }

  setTab(tab) {
    this._tab = tab;
    this.render();
  }

  setViewport(viewport) {
    this._viewport = viewport;
    this.render();
  }

  async handleCopy() {
    this._copyError = false;
    try {
      const ok = await copyText(SAMPLE_CODE);
      if (!ok) {
        this._copyError = true;
        this.render();
        return;
      }
      this._copied = true;
      this.render();
      this.registerTimeout(() => {
        this._copied = false;
        this.render();
      }, 1600);
    } catch {
      this._copied = false;
      this._copyError = true;
      this.render();
    }
  }

  render() {
    const zh = this.isZh;
    const tab = this._tab;
    const viewport = this._viewport;
    const copied = this._copied;
    const copyError = this._copyError;

    const viewportMaxWidth =
      viewport === "mobile"
        ? "max-w-[280px]"
        : viewport === "tablet"
        ? "max-w-[380px]"
        : "max-w-md";

    this.setHtml(`
      <div class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
        {/* Top Header Bar */}
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-inset px-3.5 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[12.5px] font-semibold text-ink">MetricsWidget.tsx</span>
                <span class="rounded-chip border border-line bg-surface px-1.5 py-0.5 font-mono text-[9.5px] text-ink-3">
                  v2.1
                </span>
              </div>
            </div>
          </div>

          {/* Tab & Viewport Switchers */}
          <div class="flex items-center gap-2">
            {/* Tab Switcher */}
            <div class="flex rounded-control bg-field p-0.5 text-[11px]">
              <button
                type="button"
                id="tab-preview"
                class="rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                  tab === "preview" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
                }"
              >
                ${zh ? "实时预览" : "Preview"}
              </button>
              <button
                type="button"
                id="tab-code"
                class="rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                  tab === "code" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
                }"
              >
                ${zh ? "代码" : "Code"}
              </button>
            </div>

            {/* Viewport controls */}
            ${
              tab === "preview"
                ? `
              <div class="hidden sm:flex items-center gap-1 rounded-control bg-field p-0.5 text-ink-3">
                <button
                  type="button"
                  id="vp-desktop"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                    viewport === "desktop" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                  }"
                  title="${zh ? "桌面端" : "Desktop"}"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <button
                  type="button"
                  id="vp-tablet"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                    viewport === "tablet" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                  }"
                  title="${zh ? "平板端" : "Tablet"}"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>
                <button
                  type="button"
                  id="vp-mobile"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${
                    viewport === "mobile" ? "bg-surface text-ink shadow-sm" : "hover:text-ink"
                  }"
                  title="${zh ? "移动端" : "Mobile"}"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>
              </div>
            `
                : ""
            }

            {/* Copy Button */}
            <button
              type="button"
              id="btn-copy"
              aria-label="${zh ? "复制" : "Copy"}"
              class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${
                copyError
                  ? `
                <span role="status" aria-live="polite" class="text-red">
                  ${zh ? "复制失败" : "Copy failed"}
                </span>
              `
                  : copied
                  ? `
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-green" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span role="status" aria-live="polite" class="text-green">
                  ${zh ? "已复制" : "Copied"}
                </span>
              `
                  : `
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>${zh ? "复制代码" : "Copy"}</span>
              `
              }
            </button>
          </div>
        </div>

        {/* Main Canvas Body */}
        <div class="flex min-h-[220px] items-center justify-center bg-canvas p-6 transition-all">
          ${
            tab === "preview"
              ? `
            <div class="transition-all duration-300 w-full ${viewportMaxWidth}">
              {/* Live Rendered Component Inside Sandbox */}
              <div class="grid grid-cols-2 gap-3 rounded-control border border-line bg-surface p-4 shadow-sm">
                <div class="flex flex-col">
                  <span class="text-[11px] text-ink-3">${zh ? "日活跃用户 (DAU)" : "Daily Active Users"}</span>
                  <span class="font-mono text-[16px] font-semibold text-ink mt-0.5">24,582</span>
                  <span class="font-mono text-[10px] text-green font-medium mt-1">↑ +14.2%</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] text-ink-3">${zh ? "平均响应延迟" : "Avg Latency"}</span>
                  <span class="font-mono text-[16px] font-semibold text-ink mt-0.5">184ms</span>
                  <span class="font-mono text-[10px] text-green font-medium mt-1">↓ -18.4%</span>
                </div>
                <div class="col-span-2 mt-1 border-t border-line pt-2 flex items-center justify-between text-[10.5px] text-ink-3">
                  <span>${zh ? "2分钟前已自动刷新" : "Auto-refreshed 2m ago"}</span>
                  <span class="text-accent cursor-pointer hover:underline">
                    ${zh ? "查看遥测数据 →" : "View telemetry →"}
                  </span>
                </div>
              </div>
            </div>
          `
              : `
            <div class="w-full overflow-x-auto rounded-control border border-line bg-page p-3 font-mono text-[11px] leading-relaxed text-ink-2">
              <pre><code>${escapeHtml(SAMPLE_CODE)}</code></pre>
            </div>
          `
          }
        </div>

        {/* Sandbox Footer */}
        <div class="flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3">
          <span>${zh ? "技术栈: React 19 + Tailwind CSS" : "Framework: React 19 + Tailwind CSS"}</span>
          <span class="font-mono">${zh ? "编译耗时: 12ms" : "Compiled in 12ms"}</span>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector("#tab-preview")?.addEventListener("click", () => this.setTab("preview"));
    this.shadowRoot?.querySelector("#tab-code")?.addEventListener("click", () => this.setTab("code"));
    this.shadowRoot?.querySelector("#vp-desktop")?.addEventListener("click", () => this.setViewport("desktop"));
    this.shadowRoot?.querySelector("#vp-tablet")?.addEventListener("click", () => this.setViewport("tablet"));
    this.shadowRoot?.querySelector("#vp-mobile")?.addEventListener("click", () => this.setViewport("mobile"));
    this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click", () => this.handleCopy());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-artifact-sandbox")) {
  customElements.define("nai-artifact-sandbox", NaiArtifactSandbox);
}
