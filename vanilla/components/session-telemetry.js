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
      { key: "completed", labelEn: "completed", labelZh: "完成", value: f.turns.completed, color: "var(--green)" },
      { key: "blocked", labelEn: "blocked", labelZh: "阻塞", value: f.turns.blocked, color: "var(--orange)" },
      { key: "aborted", labelEn: "aborted", labelZh: "中止", value: f.turns.aborted, color: "var(--ink-3)" },
      { key: "error", labelEn: "error", labelZh: "错误", value: f.turns.error, color: "var(--red)" },
      { key: "maxTokens", labelEn: "max-tokens", labelZh: "达到上限", value: f.turns.maxTokens, color: "#b585e0" },
      { key: "open", labelEn: "open", labelZh: "进行中", value: f.turns.open, color: "var(--accent)" },
    ];

    const metrics = [
      { labelEn: "Turns", labelZh: "轮次", value: String(totalTurns) },
      { labelEn: "Steps", labelZh: "步骤", value: String(f.steps) },
      { labelEn: "Tool calls", labelZh: "工具调用", value: String(f.toolCalls) },
      { labelEn: "Tokens in", labelZh: "输入 tokens", value: fmtTokens(f.tokensIn) },
      { labelEn: "Tokens out", labelZh: "输出 tokens", value: fmtTokens(f.tokensOut) },
      { labelEn: "LLM time", labelZh: "LLM 耗时", value: `${(Math.round(f.llmMs / 100) / 10).toFixed(1)}s` },
    ];

    const extraCss = `
      .bg-inset\\/60 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 60%, transparent); }
      .bg-accent\\/35 { background-color: color-mix(in srgb, var(--accent, #0285ff) 35%, transparent); }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .rounded-t-\\[3px\\] { border-top-left-radius: 3px; border-top-right-radius: 3px; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${f.turns.open > 0 ? "bg-accent animate-pulse" : "bg-green"}"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "会话遥测" : "Session Telemetry"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              sessionStats
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${f.turns.open > 0 ? (zh ? "折叠中…" : "folding…") : zh ? "已归档" : "archived"}
          </span>
        </div>

        
        <div class="grid grid-cols-3 gap-1.5">
          ${metrics
            .map(
              (m) => `
            <div class="metric-tile rounded-control border border-line bg-inset/60 px-2.5 py-2">
              <div class="font-mono text-[15px] font-semibold tabular-nums text-ink">
                ${m.value}
              </div>
              <div class="text-[10px] text-ink-3">${zh ? m.labelZh : m.labelEn}</div>
            </div>
          `
            )
            .join("")}
        </div>

        
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${zh ? "轮次结局分布" : "Turn outcomes"}
            </span>
            <span class="font-mono text-[9.5px] text-ink-3">turn/end · six kinds</span>
          </div>
          <div class="flex h-2 w-full overflow-hidden rounded-full bg-field">
            ${buckets
              .map((b) =>
                b.value > 0
                  ? `
                <span
                  class="h-full transition-all duration-700"
                  style="width: ${(b.value / totalTurns) * 100}%; background: ${b.color};"
                  title="${b.key}: ${b.value}"
                ></span>
              `
                  : ""
              )
              .join("")}
          </div>
          <div class="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            ${buckets
              .map(
                (b) => `
              <span class="flex items-center gap-1 text-[10px] text-ink-2">
                <span class="size-1.5 rounded-full" style="background: ${b.color};"></span>
                ${zh ? b.labelZh : b.labelEn}
                <span class="font-mono tabular-nums text-ink-3">${b.value}</span>
              </span>
            `
              )
              .join("")}
          </div>
        </div>

        
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${zh ? "累计输入 tokens" : "Cumulative tokens in"}
            </span>
            <span class="font-mono text-[10px] tabular-nums text-ink-3">
              ${f.tokensIn.toLocaleString()}
            </span>
          </div>
          <div class="spark-container flex h-12 items-end gap-1">
            ${FRAMES[FRAMES.length - 1].spark
              .map((_, i) => {
                const v = f.spark[i];
                return `
                <span
                  class="flex-1 rounded-t-[3px] transition-all duration-700 ${
                    v === undefined ? "bg-field" : i === f.spark.length - 1 ? "bg-accent" : "bg-accent/35"
                  }"
                  style="height: ${v === undefined ? "8%" : `${Math.max(8, (v / maxSpark) * 100)}%`};"
                ></span>
              `;
              })
              .join("")}
          </div>
        </div>

        
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${zh ? "投影 = durable 事实的纯折叠" : "Projection = pure fold of durable facts"}</span>
          <span class="font-mono">Harness.Session.Stats</span>
        </div>
      </div>
    `, extraCss);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-session-telemetry")) {
  customElements.define("nai-session-telemetry", NaiSessionTelemetry);
}
