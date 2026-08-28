import { NaiBaseElement } from "../core/base-element.js";

const FRAMES = [
  { turns: { completed: 6, blocked: 1, aborted: 0, error: 0, maxTokens: 0, open: 1 }, steps: 14, toolCalls: 19, tokensIn: 41208, tokensOut: 6893, llmMs: 21400, spark: [8, 12, 18, 24, 31, 41] },
  { turns: { completed: 7, blocked: 1, aborted: 0, error: 0, maxTokens: 0, open: 1 }, steps: 17, toolCalls: 23, tokensIn: 50872, tokensOut: 8104, llmMs: 25800, spark: [8, 12, 18, 24, 31, 41, 51] },
  { turns: { completed: 8, blocked: 1, aborted: 1, error: 0, maxTokens: 0, open: 1 }, steps: 20, toolCalls: 27, tokensIn: 59930, tokensOut: 9761, llmMs: 30100, spark: [8, 12, 18, 24, 31, 41, 51, 60] },
  { turns: { completed: 9, blocked: 1, aborted: 1, error: 0, maxTokens: 1, open: 0 }, steps: 24, toolCalls: 31, tokensIn: 71455, tokensOut: 11290, llmMs: 36900, spark: [8, 12, 18, 24, 31, 41, 51, 60, 71] },
];

const FRAME_MS = 2400;
const HOLD_MS = 4600;

function fmtTokens(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export class NaiSessionTelemetry extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._frame = 0;
  }

  onMount() {
    this._frame = 0;
    this._scheduleFrame();
  }

  onUnmount() {
    this._frame = 0;
  }

  _scheduleFrame() {
    if (this._frame < FRAMES.length - 1) {
      this.registerTimeout(() => {
        this._frame++;
        this.render();
        this._scheduleFrame();
      }, FRAME_MS);
    } else {
      this.registerTimeout(() => {
        this._frame = 0;
        this.render();
        this._scheduleFrame();
      }, HOLD_MS);
    }
  }

  render() {
    const zh = this.isZh;
    const f = FRAMES[this._frame];
    const totalTurns =
      f.turns.completed + f.turns.blocked + f.turns.aborted + f.turns.error + f.turns.maxTokens + f.turns.open;
    const maxSpark = Math.max(...FRAMES[FRAMES.length - 1].spark);

    const buckets = [
      { key: "completed", labelEn: "completed", labelZh: "完成", value: f.turns.completed, color: "var(--green, #189a4d)" },
      { key: "blocked", labelEn: "blocked", labelZh: "阻塞", value: f.turns.blocked, color: "var(--orange, #ef720c)" },
      { key: "aborted", labelEn: "aborted", labelZh: "中止", value: f.turns.aborted, color: "var(--ink-3, #9a9da3)" },
      { key: "error", labelEn: "error", labelZh: "错误", value: f.turns.error, color: "var(--red, #e3474c)" },
      { key: "maxTokens", labelEn: "max-tokens", labelZh: "达到上限", value: f.turns.maxTokens, color: "#b585e0" },
      { key: "open", labelEn: "open", labelZh: "进行中", value: f.turns.open, color: "var(--accent, #0285ff)" },
    ];

    const metrics = [
      { labelEn: "Turns", labelZh: "轮次", value: String(totalTurns) },
      { labelEn: "Steps", labelZh: "步骤", value: String(f.steps) },
      { labelEn: "Tool calls", labelZh: "工具调用", value: String(f.toolCalls) },
      { labelEn: "Tokens in", labelZh: "输入 tokens", value: fmtTokens(f.tokensIn) },
      { labelEn: "Tokens out", labelZh: "输出 tokens", value: fmtTokens(f.tokensOut) },
      { labelEn: "LLM time", labelZh: "LLM 耗时", value: `${(Math.round(f.llmMs / 100) / 10).toFixed(1)}s` },
    ];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
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
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: ${f.turns.open > 0 ? "var(--accent, #0285ff)" : "var(--green, #189a4d)"};
          ${f.turns.open > 0 ? "animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;" : ""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .stat-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .state-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .metric-tile {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
        }
        .metric-val {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 15px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .metric-label {
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .section-header {
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .section-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .section-sub {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .breakdown-bar {
          display: flex;
          height: 8px;
          width: 100%;
          overflow: hidden;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
        }
        .bar-segment {
          height: 100%;
          transition: width 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .breakdown-legend {
          margin-top: 6px;
          display: flex;
          flex-wrap: wrap;
          column-gap: 12px;
          row-gap: 4px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .legend-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .spark-container {
          display: flex;
          height: 48px;
          align-items: flex-end;
          gap: 4px;
        }
        .spark-bar {
          flex: 1;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          transition: height 0.7s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.3s;
        }

        .footer {
          margin-top: 16px;
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

        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${zh ? "会话遥测" : "Session Telemetry"}</h3>
            <span class="stat-chip">sessionStats</span>
          </div>
          <span class="state-text">${f.turns.open > 0 ? (zh ? "折叠中…" : "folding…") : zh ? "已归档" : "archived"}</span>
        </div>

        <!-- Metric tiles -->
        <div class="metrics-grid">
          ${metrics
            .map(
              (m) => `
            <div class="metric-tile">
              <div class="metric-val">${m.value}</div>
              <div class="metric-label">${zh ? m.labelZh : m.labelEn}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Turn outcome breakdown -->
        <div style="margin-top: 16px;">
          <div class="section-header">
            <span class="section-title">${zh ? "轮次结局分布" : "Turn outcomes"}</span>
            <span class="section-sub">turn/end · six kinds</span>
          </div>
          <div class="breakdown-bar">
            ${buckets
              .map((b) =>
                b.value > 0
                  ? `<span class="bar-segment" style="width: ${
                      (b.value / totalTurns) * 100
                    }%; background: ${b.color};" title="${b.key}: ${b.value}"></span>`
                  : ""
              )
              .join("")}
          </div>
          <div class="breakdown-legend">
            ${buckets
              .map(
                (b) => `
              <span class="legend-item">
                <span class="legend-dot" style="background: ${b.color};"></span>
                <span>${zh ? b.labelZh : b.labelEn}</span>
                <span class="legend-count">${b.value}</span>
              </span>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Token sparkline -->
        <div style="margin-top: 16px;">
          <div class="section-header">
            <span class="section-title">${zh ? "累计输入 tokens" : "Cumulative tokens in"}</span>
            <span style="font-family: var(--font-mono, monospace); font-size: 10px; font-variant-numeric: tabular-nums; color: var(--ink-3, #9a9da3);">
              ${f.tokensIn.toLocaleString()}
            </span>
          </div>
          <div class="spark-container">
            ${FRAMES[FRAMES.length - 1].spark
              .map((_, i) => {
                const v = f.spark[i];
                const isLatest = i === f.spark.length - 1;
                const bg =
                  v === undefined
                    ? "var(--field, #f2f2f3)"
                    : isLatest
                    ? "var(--accent, #0285ff)"
                    : "rgba(2, 133, 255, 0.35)";
                const h = v === undefined ? "8%" : `${Math.max(8, (v / maxSpark) * 100)}%`;
                return `<span class="spark-bar" style="height: ${h}; background: ${bg};"></span>`;
              })
              .join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${zh ? "投影 = durable 事实的纯折叠" : "Projection = pure fold of durable facts"}</span>
          <span class="footer-mono">Harness.Session.Stats</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-session-telemetry")) {
  customElements.define("nai-session-telemetry", NaiSessionTelemetry);
}
