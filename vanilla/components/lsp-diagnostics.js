import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_DIAGNOSTICS = [
  {
    id: "diag-1",
    severity: "error",
    code: "CS0103",
    messageEn: "The name 'ContextSpilloverService' does not exist in the current context.",
    messageZh: "当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",
    file: "src/Harness.Compaction/Compactor.cs",
    line: 38,
    col: 14,
  },
  {
    id: "diag-2",
    severity: "warning",
    code: "CS8618",
    messageEn: "Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",
    messageZh: "不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",
    file: "src/Harness.Session.Persistence/SqliteSessionStore.cs",
    line: 22,
    col: 29,
  },
  {
    id: "diag-3",
    severity: "warning",
    code: "CA2000",
    messageEn: "Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",
    messageZh: "在失去作用域前释放对象: 'CancellationTokenSource' 从未被显式 Dispose 释放。",
    file: "src/Harness.CodeRuntime/WorkerProcess.cs",
    line: 74,
    col: 21,
  },
];

export class NaiLspDiagnostics extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._filter = "all";
    this._diagnostics = JSON.parse(JSON.stringify(INITIAL_DIAGNOSTICS));
    this._fixedIds = [];
  }

  setFilter(filter) {
    this._filter = filter;
    this.render();
  }

  handleFix(id) {
    this._fixedIds.push(id);
    this.render();

    this.registerTimeout(() => {
      this._diagnostics = this._diagnostics.filter((d) => d.id !== id);
      this._fixedIds = this._fixedIds.filter((i) => i !== id);
      this.render();
    }, 600);
  }

  render() {
    const zh = this.isZh;
    const filtered = this._diagnostics.filter((d) => {
      if (this._filter !== "all" && d.severity !== this._filter) return false;
      return true;
    });

    const filterLabels = {
      all: zh ? "全部" : "All",
      error: zh ? "错误" : "Errors",
      warning: zh ? "警告" : "Warnings",
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
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
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .lsp-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .filter-tabs {
          display: flex;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          font-size: 11px;
        }
        .filter-btn {
          border-radius: var(--radius-chip, 6px);
          padding: 2px 8px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          transition: all 0.15s;
          font-family: inherit;
        }
        .filter-btn:hover {
          color: var(--ink-2, #62656b);
        }
        .filter-active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .diagnostics-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .empty-state {
          border-radius: var(--radius-control, 8px);
          border: 1px dashed var(--line, #ecedef);
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: var(--green, #189a4d);
        }

        .diag-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 12px;
          transition: all 0.2s;
        }
        .diag-error {
          border-color: rgba(227, 71, 76, 0.3);
          background: rgba(252, 236, 236, 0.2);
        }
        .diag-error:hover {
          border-color: rgba(227, 71, 76, 0.5);
        }
        .diag-warning {
          border-color: rgba(239, 114, 12, 0.3);
          background: rgba(253, 241, 229, 0.2);
        }
        .diag-warning:hover {
          border-color: rgba(239, 114, 12, 0.5);
        }
        .diag-fixing {
          opacity: 0.4;
          transform: scale(0.98);
        }

        .diag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .diag-target {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .diag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-error { background: var(--red, #e3474c); }
        .dot-warning { background: var(--orange, #ef720c); }

        .diag-code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .diag-location {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .btn-fix {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .btn-fix:hover {
          background: var(--accent-tint, #e9f3ff);
          border-color: rgba(2, 133, 255, 0.4);
        }

        .diag-msg {
          margin: 0;
          font-size: 11.5px;
          line-height: 1.35;
          color: var(--ink, #1f2124);
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${zh ? "Roslyn LSP 实时诊断" : "LSP Diagnostics"}</h3>
                <span class="lsp-chip">Roslyn LSP</span>
              </div>
              <p class="sub-text">${zh ? "Harness.Lsp 工作区静态分析诊断流" : "Harness.Lsp live workspace analyzer stream"}</p>
            </div>
          </div>

          <div class="filter-tabs">
            ${(["all", "error", "warning"])
              .map(
                (tab) => `
              <button
                type="button"
                class="filter-btn ${this._filter === tab ? "filter-active" : ""}"
                data-tab="${tab}"
              >
                ${filterLabels[tab]}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="diagnostics-list">
          ${
            filtered.length === 0
              ? `
            <div class="empty-state">
              ${zh ? "✓ 当前工作区内无活动编译错误或警告。" : "✓ Zero active compilation errors or warnings."}
            </div>
          `
              : filtered
                  .map((diag) => {
                    const isFixing = this._fixedIds.includes(diag.id);
                    const isErr = diag.severity === "error";
                    return `
                <div class="diag-card ${isErr ? "diag-error" : "diag-warning"} ${isFixing ? "diag-fixing" : ""}">
                  <div class="diag-header">
                    <div class="diag-target">
                      <span class="diag-dot ${isErr ? "dot-error" : "dot-warning"}"></span>
                      <span class="diag-code">${diag.code}</span>
                      <span class="diag-location">${diag.file}:${diag.line}:${diag.col}</span>
                    </div>

                    <button
                      type="button"
                      class="btn-fix"
                      data-fix="${diag.id}"
                    >
                      <span>${isFixing ? (zh ? "修复中..." : "Fixing...") : zh ? "一键修复" : "Auto-Fix"}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <p class="diag-msg">${zh ? diag.messageZh : diag.messageEn}</p>
                </div>
              `;
                  })
                  .join("")
          }
        </div>

        <div class="footer">
          <span>${zh ? "目标框架: .NET 10.0" : "Target framework: .NET 10.0"}</span>
          <span class="footer-mono">
            ${this._diagnostics.length} ${zh ? "个作用域内问题" : "issues in scope"}
          </span>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        this.setFilter(tab);
      });
    });

    this.shadowRoot.querySelectorAll("[data-fix]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-fix");
        this.handleFix(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-lsp-diagnostics")) {
  customElements.define("nai-lsp-diagnostics", NaiLspDiagnostics);
}
