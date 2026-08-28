import { NaiBaseElement } from "../core/base-element.js";

const MAX_TOKENS = 128000;

const INITIAL_SEGMENTS = [
  {
    id: "system",
    labelEn: "System & Directives",
    labelZh: "系统指令与安全约束",
    tokens: 4200,
    color: "var(--accent, #0285ff)",
    badgeBg: "var(--accent-tint, #e9f3ff)",
    badgeColor: "var(--accent-ink, #0170dd)",
    descEn: "Base system instructions, developer constraints, and safety guidelines.",
    descZh: "基础系统提示词、开发者约束与安全合规守则。",
  },
  {
    id: "rag",
    labelEn: "RAG & Retrieved Docs",
    labelZh: "RAG 检索增强知识",
    tokens: 28400,
    color: "var(--green, #189a4d)",
    badgeBg: "var(--green-tint, #e8f5ed)",
    badgeColor: "var(--green, #189a4d)",
    descEn: "12 code chunks and 3 architectural design docs injected via semantic search.",
    descZh: "语义搜索注入的 12 个代码切片与 3 份架构设计文档。",
  },
  {
    id: "history",
    labelEn: "Conversation History",
    labelZh: "会话上下文历史",
    tokens: 16850,
    color: "var(--orange, #ef720c)",
    badgeBg: "var(--orange-tint, #fdf1e5)",
    badgeColor: "var(--orange, #ef720c)",
    descEn: "14 previous conversation turns including user prompts and code diffs.",
    descZh: "前 14 轮对话交互，包含用户指令与代码差异记录。",
  },
  {
    id: "tools",
    labelEn: "Tool Outputs & Traces",
    labelZh: "工具调用输出与追踪",
    tokens: 9350,
    color: "var(--ink-2, #62656b)",
    badgeBg: "var(--hover-2, #e7e9eb)",
    badgeColor: "var(--ink-2, #62656b)",
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
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .green-dot {
          display: flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green, #189a4d);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .capacity-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cost-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .btn-prune {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-prune:hover {
          background-color: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .gauge-metric {
          margin-top: 4px;
        }
        .metric-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 11.5px;
        }
        .tokens-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .tokens-max {
          color: var(--ink-3, #9a9da3);
        }
        .capacity-pct {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .segmented-bar {
          margin-top: 10px;
          display: flex;
          height: 10px;
          width: 100%;
          overflow: hidden;
          border-radius: 99px;
          background: var(--field, #f2f2f3);
          padding: 2px;
          box-sizing: border-box;
        }
        .segment-fill {
          height: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .segment-fill:first-child {
          border-top-left-radius: 99px;
          border-bottom-left-radius: 99px;
        }
        .segment-fill:last-child {
          border-top-right-radius: 99px;
          border-bottom-right-radius: 99px;
        }
        .breakdown-list {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
        }
        .breakdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          margin: 0 -8px;
          border-radius: var(--radius-control, 8px);
          border-bottom: 1px solid var(--line, #ecedef);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .breakdown-item:last-child {
          border-bottom: none;
        }
        .breakdown-item:hover, .breakdown-item.active {
          background-color: var(--hover, #f4f5f6);
        }
        .item-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .item-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .item-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .item-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .item-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .item-desc {
          margin-top: 2px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
        }
        .item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          padding-left: 8px;
        }
        .item-tokens {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .item-unit {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .model-tech {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="green-dot"></span>
            <h3 class="header-title">${zh ? "上下文窗口计量" : "Context Window"}</h3>
            <span class="capacity-chip">${zh ? "128k 容量" : "128k context"}</span>
          </div>
          <div class="header-right">
            <span class="cost-label">$${estimatedCost} ${zh ? "预估成本" : "est."}</span>
            <button type="button" class="btn-prune" id="btn-prune">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>${
                isPruned
                  ? zh
                    ? "恢复完整上下文"
                    : "Restore Context"
                  : zh
                  ? "精简历史"
                  : "Prune History"
              }</span>
            </button>
          </div>
        </div>

        <!-- Progress Metric Bar -->
        <div class="gauge-metric">
          <div class="metric-header">
            <span class="tokens-count">
              ${totalUsed.toLocaleString()} <span class="tokens-max">/ ${MAX_TOKENS.toLocaleString()} tokens</span>
            </span>
            <span class="capacity-pct">${percentUsed}% ${zh ? "已占用" : "capacity"}</span>
          </div>

          <!-- Segmented Bar -->
          <div class="segmented-bar">
            ${segments
              .map((seg) => {
                const widthPct = (seg.tokens / MAX_TOKENS) * 100;
                const isHovered = activeSegmentId === seg.id;
                const opacity = activeSegmentId && !isHovered ? 0.45 : 1;
                const transform = isHovered ? "scaleY(1.2)" : "scaleY(1)";

                return `
                  <div
                    class="segment-fill"
                    data-id="${seg.id}"
                    style="width: ${widthPct}%; background-color: ${seg.color}; opacity: ${opacity}; transform: ${transform};"
                  ></div>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Segment Breakdown Rows -->
        <div class="breakdown-list">
          ${segments
            .map((seg) => {
              const isSelected = activeSegmentId === seg.id;
              const segPercent = ((seg.tokens / totalUsed) * 100).toFixed(0);

              return `
                <div class="breakdown-item ${isSelected ? "active" : ""}" data-id="${seg.id}">
                  <div class="item-left">
                    <span class="item-dot" style="background-color: ${seg.color};"></span>
                    <div class="item-info">
                      <div class="item-title-row">
                        <span class="item-label">${zh ? seg.labelZh : seg.labelEn}</span>
                        <span class="item-badge" style="background-color: ${seg.badgeBg}; color: ${seg.badgeColor};">
                          ${segPercent}%
                        </span>
                      </div>
                      <span class="item-desc">${zh ? seg.descZh : seg.descEn}</span>
                    </div>
                  </div>
                  <div class="item-right">
                    <span class="item-tokens">${seg.tokens.toLocaleString()}</span>
                    <span class="item-unit">tokens</span>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${zh ? "自动压缩阈值: 85%" : "Auto-compaction threshold: 85%"}</span>
          <span class="model-tech">Claude 3.7 Sonnet</span>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#btn-prune")?.addEventListener("click", () => this.handlePruneHistory());

    this.shadowRoot.querySelectorAll(".segment-fill, .breakdown-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const id = el.getAttribute("data-id");
        this.setActiveSegment(id);
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
