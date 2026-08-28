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

    const extraCss = `
      .border-red\\/30 { border-color: color-mix(in srgb, var(--red, #e3474c) 30%, transparent); }
      .border-red\\/50 { border-color: color-mix(in srgb, var(--red, #e3474c) 50%, transparent); }
      .bg-red-tint\\/20 { background-color: color-mix(in srgb, var(--red-tint, #fcecec) 20%, transparent); }
      .border-orange\\/30 { border-color: color-mix(in srgb, var(--orange, #ef720c) 30%, transparent); }
      .border-orange\\/50 { border-color: color-mix(in srgb, var(--orange, #ef720c) 50%, transparent); }
      .bg-orange-tint\\/20 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 20%, transparent); }
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .scale-98 { transform: scale(0.98); }
      .leading-snug { line-height: 1.375; }
    `;

    this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${zh ? "Roslyn LSP 实时诊断" : "LSP Diagnostics"}
                </h3>
                <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                  Roslyn LSP
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${zh ? "Harness.Lsp 工作区静态分析诊断流" : "Harness.Lsp live workspace analyzer stream"}
              </p>
            </div>
          </div>

          
          <div class="flex rounded-control bg-field p-0.5 text-[11px]">
            ${(["all", "error", "warning"])
              .map((tab) => {
                const label = tab === "all" ? (zh ? "全部" : "All") : tab === "error" ? (zh ? "错误" : "Errors") : (zh ? "警告" : "Warnings");
                return `
                <button
                  type="button"
                  data-tab="${tab}"
                  class="filter-btn rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${
                    this._filter === tab ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
                  }"
                >
                  ${label}
                </button>
              `;
              })
              .join("")}
          </div>
        </div>

        
        <div class="mt-3.5 flex flex-col gap-2">
          ${
            filtered.length === 0
              ? `
            <div class="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-green">
              ${zh ? "✓ 当前工作区内无活动编译错误或警告。" : "✓ Zero active compilation errors or warnings."}
            </div>
          `
              : filtered
                  .map((diag) => {
                    const isFixing = this._fixedIds.includes(diag.id);
                    return `
                <div
                  class="flex flex-col gap-1.5 rounded-control border p-3 transition-all ${
                    diag.severity === "error"
                      ? "border-red/30 bg-red-tint/20 hover:border-red/50"
                      : "border-orange/30 bg-orange-tint/20 hover:border-orange/50"
                  } ${isFixing ? "opacity-40 scale-98" : ""}"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="size-2 rounded-full shrink-0 ${
                          diag.severity === "error" ? "bg-red" : "bg-orange"
                        }"
                      ></span>
                      <span class="font-mono text-[10.5px] font-semibold text-ink">
                        ${diag.code}
                      </span>
                      <span class="font-mono text-[10.5px] text-ink-3 truncate">
                        ${diag.file}:${diag.line}:${diag.col}
                      </span>
                    </div>

                    <button
                      type="button"
                      data-fix="${diag.id}"
                      class="btn-fix flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-accent-ink hover:bg-accent-tint hover:border-accent/40 transition-colors cursor-pointer shrink-0"
                    >
                      <span>${isFixing ? (zh ? "修复中..." : "Fixing...") : zh ? "一键修复" : "Auto-Fix"}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <p class="text-[11.5px] text-ink leading-snug">
                    ${zh ? diag.messageZh : diag.messageEn}
                  </p>
                </div>
              `;
                  })
                  .join("")
          }
        </div>

        
        <div class="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${zh ? "目标框架: .NET 10.0" : "Target framework: .NET 10.0"}</span>
          <span class="font-mono">
            ${this._diagnostics.length} ${zh ? "个作用域内问题" : "issues in scope"}
          </span>
        </div>
      </div>
    `, extraCss);

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
