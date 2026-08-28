import { NaiBaseElement } from "../core/base-element.js";

const MAX_TOKENS = 128000;

const INITIAL_SEGMENTS = [
  {
    id: "system",
    labelEn: "System & Directives",
    labelZh: "系统指令与安全约束",
    tokens: 4200,
    color: "var(--accent)",
    badgeColor: "bg-accent-tint text-accent-ink",
    descEn: "Base system instructions, developer constraints, and safety guidelines.",
    descZh: "基础系统提示词、开发者约束与安全合规守则。",
  },
  {
    id: "rag",
    labelEn: "RAG & Retrieved Docs",
    labelZh: "RAG 检索增强知识",
    tokens: 28400,
    color: "var(--green)",
    badgeColor: "bg-green-tint text-green",
    descEn: "12 code chunks and 3 architectural design docs injected via semantic search.",
    descZh: "语义搜索注入的 12 个代码切片与 3 份架构设计文档。",
  },
  {
    id: "history",
    labelEn: "Conversation History",
    labelZh: "会话上下文历史",
    tokens: 16850,
    color: "var(--orange)",
    badgeColor: "bg-orange-tint text-orange",
    descEn: "14 previous conversation turns including user prompts and code diffs.",
    descZh: "前 14 轮对话交互，包含用户指令与代码差异记录。",
  },
  {
    id: "tools",
    labelEn: "Tool Outputs & Traces",
    labelZh: "工具调用输出与追踪",
    tokens: 9350,
    color: "var(--ink-2)",
    badgeColor: "bg-hover-2 text-ink-2",
    descEn: "Terminal stdout, ripgrep search results, and linter diagnostics.",
    descZh: "终端标准输出、ripgrep 搜索结果与 linter 诊断信息。",
  },
];

export class NaiContextWindow extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._segments = JSON.parse(JSON.stringify(INITIAL_SEGMENTS));
    this._activeSegmentId = null;
    this._isPruned = false;
  }

  handlePruneHistory() {
    if (this._isPruned) {
      this._segments = JSON.parse(JSON.stringify(INITIAL_SEGMENTS));
      this._isPruned = false;
    } else {
      this._segments = this._segments.map((s) =>
        s.id === "history"
          ? { ...s, tokens: Math.round(s.tokens * 0.45) }
          : s.id === "tools"
          ? { ...s, tokens: Math.round(s.tokens * 0.3) }
          : s
      );
      this._isPruned = true;
    }
    this.render();
  }

  setActiveSegment(id) {
    this._activeSegmentId = id;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const segments = this._segments;
    const activeSegmentId = this._activeSegmentId;
    const isPruned = this._isPruned;

    const totalUsed = segments.reduce((sum, s) => sum + s.tokens, 0);
    const percentUsed = ((totalUsed / MAX_TOKENS) * 100).toFixed(1);
    const estimatedCost = ((totalUsed / 1000000) * 3.0).toFixed(4);

    const html = `
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-green"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "上下文窗口计量" : "Context Window"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2">
              ${zh ? "128k 容量" : "128k context"}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-[11px] tabular-nums text-ink-2">
              $${estimatedCost} ${zh ? "预估成本" : "est."}
            </span>
            <button
              type="button"
              id="btn-prune"
              class="flex items-center gap-1 rounded-control border border-line bg-field px-2 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              ${
                isPruned
                  ? zh
                    ? "恢复完整上下文"
                    : "Restore Context"
                  : zh
                  ? "精简历史"
                  : "Prune History"
              }
            </button>
          </div>
        </div>

        <!-- Progress Metric Bar -->
        <div class="mt-1">
          <div class="flex items-baseline justify-between text-[11.5px]">
            <span class="font-mono tabular-nums text-ink">
              ${totalUsed.toLocaleString()}{" "}
              <span class="text-ink-3">/ ${MAX_TOKENS.toLocaleString()} tokens</span>
            </span>
            <span class="font-mono font-medium tabular-nums text-ink-2">
              ${percentUsed}% ${zh ? "已占用" : "capacity"}
            </span>
          </div>

          <!-- Segmented Bar -->
          <div class="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-field p-0.5">
            ${segments
              .map((seg) => {
                const widthPct = (seg.tokens / MAX_TOKENS) * 100;
                const isHovered = activeSegmentId === seg.id;
                return `
                  <div
                    data-id="${seg.id}"
                    class="segment-bar h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 cursor-pointer"
                    style="
                      width: ${widthPct}%;
                      background-color: ${seg.color};
                      opacity: ${activeSegmentId && !isHovered ? 0.45 : 1};
                      transform: ${isHovered ? "scaleY(1.2)" : "scaleY(1)"};
                    "
                  ></div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Segment Breakdown Rows -->
        <div class="mt-4 flex flex-col divide-y divide-line/60">
          ${segments
            .map((seg) => {
              const isSelected = activeSegmentId === seg.id;
              const segPercent = ((seg.tokens / totalUsed) * 100).toFixed(0);
              return `
                <div
                  data-id="${seg.id}"
                  class="segment-row flex items-center justify-between py-2.5 px-2 -mx-2 rounded-control transition-colors cursor-pointer ${
                    isSelected ? "bg-hover" : "hover:bg-hover/60"
                  }"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span
                      class="size-2 rounded-full shrink-0"
                      style="background-color: ${seg.color};"
                    ></span>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[12px] font-medium text-ink truncate">
                          ${zh ? seg.labelZh : seg.labelEn}
                        </span>
                        <span class="rounded-chip px-1.5 py-0.2 font-mono text-[10px] ${seg.badgeColor}">
                          ${segPercent}%
                        </span>
                      </div>
                      <span class="text-[11px] text-ink-3 truncate max-w-[260px]">
                        ${zh ? seg.descZh : seg.descEn}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0 pl-2">
                    <span class="font-mono text-[11.5px] tabular-nums font-medium text-ink">
                      ${seg.tokens.toLocaleString()}
                    </span>
                    <span class="font-mono text-[10px] text-ink-3">tokens</span>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>

        <!-- Footer Info -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${zh ? "自动压缩阈值: 85%" : "Auto-compaction threshold: 85%"}</span>
          <span class="font-mono">Claude 3.7 Sonnet</span>
        </div>
      </div>
    `;

    this.setHtml(html);

    this.shadowRoot.querySelector("#btn-prune")?.addEventListener("click", () => this.handlePruneHistory());

    this.shadowRoot.querySelectorAll(".segment-bar, .segment-row").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const id = el.getAttribute("data-id");
        if (id) this.setActiveSegment(id);
      });
      el.addEventListener("mouseleave", () => {
        this.setActiveSegment(null);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-context-window")) {
  customElements.define("nai-context-window", NaiContextWindow);
}
