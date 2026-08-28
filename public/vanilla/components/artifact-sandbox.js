import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 14px;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .file-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .file-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filename {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .version-badge {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tab-switcher {
          display: flex;
          background: var(--field, #f2f2f3);
          border-radius: var(--radius-control, 8px);
          padding: 2px;
          font-size: 11px;
        }

        .tab-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
        }

        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .viewport-controls {
          display: flex;
          align-items: center;
          gap: 2px;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          color: var(--ink-3, #9a9da3);
        }

        .vp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          color: inherit;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .vp-btn:hover {
          color: var(--ink, #1f2124);
        }

        .vp-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .copy-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .copy-success {
          color: var(--green, #189a4d);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .copy-error {
          color: var(--red, #e3474c);
        }

        .canvas-body {
          display: flex;
          min-height: 220px;
          align-items: center;
          justify-content: center;
          background: var(--canvas, #f1f2f3);
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .preview-container {
          width: 100%;
          transition: max-width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .preview-container.mobile {
          max-width: 280px;
        }

        .preview-container.tablet {
          max-width: 380px;
        }

        .preview-container.desktop {
          max-width: 448px;
        }

        .widget-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .metric-col {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-value {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 16px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin-top: 2px;
        }

        .metric-change {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
          color: var(--green, #189a4d);
          margin-top: 4px;
        }

        .widget-footer {
          grid-column: span 2;
          margin-top: 4px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .link-telemetry {
          color: var(--accent, #0285ff);
          text-decoration: none;
          cursor: pointer;
        }

        .link-telemetry:hover {
          text-decoration: underline;
        }

        .code-block {
          width: 100%;
          overflow-x: auto;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--page, #fafafb);
          padding: 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }

        .code-block pre {
          margin: 0;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 16px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="header">
        <div class="file-info">
          <span class="file-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </span>
          <div class="file-title">
            <span class="filename">MetricsWidget.tsx</span>
            <span class="version-badge">v2.1</span>
          </div>
        </div>

        <div class="controls">
          <div class="tab-switcher">
            <button type="button" class="tab-btn ${this._tab === "preview" ? "active" : ""}" id="tab-preview">
              ${zh ? "实时预览" : "Preview"}
            </button>
            <button type="button" class="tab-btn ${this._tab === "code" ? "active" : ""}" id="tab-code">
              ${zh ? "代码" : "Code"}
            </button>
          </div>

          ${
            this._tab === "preview"
              ? `
            <div class="viewport-controls">
              <button type="button" class="vp-btn ${this._viewport === "desktop" ? "active" : ""}" id="vp-desktop" title="${zh ? "桌面端" : "Desktop"}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button type="button" class="vp-btn ${this._viewport === "tablet" ? "active" : ""}" id="vp-tablet" title="${zh ? "平板端" : "Tablet"}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
              <button type="button" class="vp-btn ${this._viewport === "mobile" ? "active" : ""}" id="vp-mobile" title="${zh ? "移动端" : "Mobile"}">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
            </div>
          `
              : ""
          }

          <button type="button" class="copy-btn" id="copy-btn" aria-label="${zh ? "复制" : "Copy"}">
            ${
              this._copyError
                ? `<span class="copy-error">${zh ? "复制失败" : "Copy failed"}</span>`
                : this._copied
                ? `<span class="copy-success">${ICONS.check} <span>${zh ? "已复制" : "Copied"}</span></span>`
                : `${ICONS.copy} <span>${zh ? "复制代码" : "Copy"}</span>`
            }
          </button>
        </div>
      </div>

      <div class="canvas-body">
        ${
          this._tab === "preview"
            ? `
          <div class="preview-container ${this._viewport}">
            <div class="widget-card">
              <div class="metric-col">
                <span class="metric-label">${zh ? "日活跃用户 (DAU)" : "Daily Active Users"}</span>
                <span class="metric-value">24,582</span>
                <span class="metric-change">↑ +14.2%</span>
              </div>
              <div class="metric-col">
                <span class="metric-label">${zh ? "平均响应延迟" : "Avg Latency"}</span>
                <span class="metric-value">184ms</span>
                <span class="metric-change">↓ -18.4%</span>
              </div>
              <div class="widget-footer">
                <span>${zh ? "2分钟前已自动刷新" : "Auto-refreshed 2m ago"}</span>
                <span class="link-telemetry">${zh ? "查看遥测数据 →" : "View telemetry →"}</span>
              </div>
            </div>
          </div>
        `
            : `
          <div class="code-block">
            <pre><code>${SAMPLE_CODE.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
          </div>
        `
        }
      </div>

      <div class="footer">
        <span>${zh ? "技术栈: React 19 + Tailwind CSS" : "Framework: React 19 + Tailwind CSS"}</span>
        <span class="mono">${zh ? "编译耗时: 12ms" : "Compiled in 12ms"}</span>
      </div>
    `;

    this.shadowRoot.querySelector("#tab-preview")?.addEventListener("click", () => this.setTab("preview"));
    this.shadowRoot.querySelector("#tab-code")?.addEventListener("click", () => this.setTab("code"));
    this.shadowRoot.querySelector("#vp-desktop")?.addEventListener("click", () => this.setViewport("desktop"));
    this.shadowRoot.querySelector("#vp-tablet")?.addEventListener("click", () => this.setViewport("tablet"));
    this.shadowRoot.querySelector("#vp-mobile")?.addEventListener("click", () => this.setViewport("mobile"));
    this.shadowRoot.querySelector("#copy-btn")?.addEventListener("click", () => this.handleCopy());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-artifact-sandbox")) {
  customElements.define("nai-artifact-sandbox", NaiArtifactSandbox);
}
