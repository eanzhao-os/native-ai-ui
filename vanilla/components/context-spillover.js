import { NaiBaseElement } from "../core/base-element.js";

const SPILL_RECORDS = [
  {
    id: "spill-1",
    sourceTool: "fs.search_ripgrep",
    originalTokens: 48500,
    compactedTokens: 820,
    diskPath: "spill/ripgrep_ast_results.json",
    sizeBytes: "1.4 MB",
    spilledAtEn: "4m ago",
    spilledAtZh: "4分钟前",
  },
  {
    id: "spill-2",
    sourceTool: "shell.git_diff_full",
    originalTokens: 86200,
    compactedTokens: 1450,
    diskPath: "spill/git_diff_refactor_v2.patch",
    sizeBytes: "2.8 MB",
    spilledAtEn: "12m ago",
    spilledAtZh: "12分钟前",
  },
];

export class NaiContextSpillover extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._hydratedId = null;
  }

  handleHydrate(id) {
    this._hydratedId = this._hydratedId === id ? null : id;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const hydratedId = this._hydratedId;
    const totalSaved = SPILL_RECORDS.reduce(
      (acc, r) => acc + (r.originalTokens - r.compactedTokens),
      0
    );

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .saved-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .gauge-card {
          margin-top: 14px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .gauge-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 11.5px;
        }
        .gauge-label {
          color: var(--ink-2, #62656b);
        }
        .gauge-pct {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-weight: 600;
          color: var(--accent, #0285ff);
        }
        .gauge-bar-wrap {
          margin-top: 8px;
          display: flex;
          height: 8px;
          width: 100%;
          align-items: center;
          gap: 4px;
        }
        .gauge-dot-active {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--accent, #0285ff);
        }
        .gauge-bar-track {
          height: 8px;
          flex: 1;
          overflow: hidden;
          border-radius: 99px;
          background: var(--line, #ecedef);
        }
        .gauge-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: rgba(24, 154, 77, 0.6);
        }
        .gauge-legend {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .records-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .record-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 12px;
          transition: border-color 0.15s;
        }
        .record-card:hover {
          border-color: var(--line-strong, #e0e2e5);
        }
        .record-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .record-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .file-icon {
          display: flex;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
        .record-info {
          min-width: 0;
        }
        .record-path-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .record-path {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .size-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .record-meta {
          margin-top: 2px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .btn-hydrate {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-hydrate:hover {
          background-color: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .hydrate-preview {
          margin-top: 10px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .preview-box {
          border-radius: var(--radius-control, 8px);
          background: var(--page, #fafafb);
          padding: 8px;
          line-height: 1.6;
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </span>
            <div>
              <h3 class="header-title">${zh ? "上下文压缩与磁盘溢出" : "Context Compaction & Spill"}</h3>
              <p class="header-subtitle">${zh ? "Harness.Spill 超限数据磁盘分流存储" : "Harness.Spill disk-offloaded oversized tools"}</p>
            </div>
          </div>
          <div class="saved-badge">
            <span>↓ ${totalSaved.toLocaleString()} ${zh ? "token 已节省" : "tok saved"}</span>
          </div>
        </div>

        <!-- Compaction Efficiency Gauge -->
        <div class="gauge-card">
          <div class="gauge-header">
            <span class="gauge-label">${zh ? "压缩比率" : "Compaction Ratio"}</span>
            <span class="gauge-pct">${zh ? "96.8% Token 压缩率" : "96.8% token compression"}</span>
          </div>

          <div class="gauge-bar-wrap">
            <span class="gauge-dot-active" title="${zh ? "内存活跃 3.2%" : "In-memory 3.2%"}"></span>
            <div class="gauge-bar-track">
              <div class="gauge-bar-fill" style="width: 96.8%;"></div>
            </div>
          </div>

          <div class="gauge-legend">
            <span>${zh ? "内存活跃上下文 (3.2%)" : "In-Memory Active (3.2%)"}</span>
            <span>${zh ? "溢出至磁盘存储 (96.8%)" : "Spilled to Disk (96.8%)"}</span>
          </div>
        </div>

        <!-- Spilled Files List -->
        <div class="records-list">
          ${SPILL_RECORDS.map((rec) => {
            const isHydrated = hydratedId === rec.id;

            return `
              <div class="record-card">
                <div class="record-header">
                  <div class="record-left">
                    <span class="file-icon">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </span>
                    <div class="record-info">
                      <div class="record-path-row">
                        <span class="record-path">${rec.diskPath}</span>
                        <span class="size-chip">${rec.sizeBytes}</span>
                      </div>
                      <div class="record-meta">
                        ${zh ? "源自" : "From"} ${rec.sourceTool} • ${zh ? rec.spilledAtZh : rec.spilledAtEn}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="btn-hydrate"
                    data-id="${rec.id}"
                  >
                    ${
                      isHydrated
                        ? zh
                          ? "收起原文"
                          : "Hide Raw"
                        : zh
                        ? "按需水合"
                        : "Hydrate"
                    }
                  </button>
                </div>

                ${
                  isHydrated
                    ? `
                  <div class="hydrate-preview">
                    <div class="preview-box">
                      ${
                        zh
                          ? "[水合片段预览: 48,500 token 原始输出已从 Harness.Spill.Local 磁盘缓存加载。原始 SHA256: 4d89a0b12...]"
                          : "[Hydrated snippet: 48,500 tokens offloaded to Harness.Spill.Local storage. Original hash: sha256:4d89a0b12...]"
                      }
                    </div>
                  </div>
                `
                    : ""
                }
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".btn-hydrate").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.handleHydrate(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-context-spillover")) {
  customElements.define("nai-context-spillover", NaiContextSpillover);
}
