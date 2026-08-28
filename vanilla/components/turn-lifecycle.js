import { NaiBaseElement } from "../core/base-element.js";

const EVENTS = [
  { type: "turn/start", depth: 0, tone: "accent", opens: "turn", summaryEn: "Turn 3 begins", summaryZh: "第 3 轮开始", meta: "user prompt" },
  { type: "request/header", depth: 1, tone: "dim", summaryEn: "deepseek-reasoner · 128k", summaryZh: "deepseek-reasoner · 128k", meta: "41,208 tok" },
  { type: "step/start", depth: 1, tone: "muted", opens: "step", summaryEn: "Step 1", summaryZh: "步骤 1" },
  { type: "assistant/message", depth: 2, tone: "green", summaryEn: "Let me check the job registry…", summaryZh: "先检查作业注册表…", meta: "stream" },
  { type: "tool/call", depth: 2, tone: "orange", summaryEn: "job.list", summaryZh: "job.list", meta: "call_9f2a" },
  { type: "tool/result", depth: 2, tone: "orange", summaryEn: "3 running · 1 killed", summaryZh: "3 个运行中 · 1 个已终止", meta: "82ms" },
  { type: "step/end", depth: 1, tone: "muted", closes: "step", summaryEn: "Step 1 closed", summaryZh: "步骤 1 闭合", meta: "1.2s" },
  { type: "step/start", depth: 1, tone: "muted", opens: "step", summaryEn: "Step 2", summaryZh: "步骤 2" },
  { type: "assistant/message", depth: 2, tone: "green", summaryEn: "Restarting the telemetry export…", summaryZh: "正在重启遥测导出任务…", meta: "stream" },
  { type: "tool/call", depth: 2, tone: "orange", summaryEn: "job.start", summaryZh: "job.start", meta: "call_b771" },
  { type: "tool/result", depth: 2, tone: "orange", summaryEn: "job-4f8c · Running", summaryZh: "job-4f8c · 运行中", meta: "134ms" },
  { type: "step/end", depth: 1, tone: "muted", closes: "step", summaryEn: "Step 2 closed", summaryZh: "步骤 2 闭合", meta: "0.9s" },
  { type: "assistant/message", depth: 1, tone: "green", summaryEn: "Done — the export job is back up.", summaryZh: "完成 — 导出任务已恢复。" },
  { type: "turn/end", depth: 0, tone: "accent", closes: "turn", summaryEn: "Turn 3 · completed", summaryZh: "第 3 轮 · 已完成", meta: "2 steps · 2 calls" },
];

const TONE_DOT = {
  accent: "bg-accent",
  green: "bg-green",
  orange: "bg-orange",
  muted: "bg-ink-3",
  dim: "bg-line-strong",
};

const TONE_CHIP = {
  accent: "bg-accent-tint text-accent-ink",
  green: "bg-green-tint text-green",
  orange: "bg-orange-tint text-orange",
  muted: "bg-hover-2/60 text-ink-2",
  dim: "bg-field text-ink-3",
};

const STEP_MS = 620;
const HOLD_MS = 3600;

export class NaiTurnLifecycle extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._visible = 0;
  }

  onMount() {
    this._visible = 0;
    this._scheduleNext();
  }

  onUnmount() {
    this._visible = 0;
  }

  _scheduleNext() {
    if (this._visible < EVENTS.length) {
      const delay = this._visible === 0 ? 500 : STEP_MS;
      this.registerTimeout(() => {
        this._visible++;
        this.render();
        this._scheduleNext();
      }, delay);
    } else {
      this.registerTimeout(() => {
        this._visible = 0;
        this.render();
        this._scheduleNext();
      }, HOLD_MS);
    }
  }

  render() {
    const zh = this.isZh;
    const done = this._visible >= EVENTS.length;
    const rows = EVENTS.slice(0, this._visible);

    let turnOpen = false;
    let stepOpen = false;
    const guides = rows.map((e) => {
      if (e.opens === "turn") turnOpen = true;
      if (e.opens === "step") stepOpen = true;
      const g = { turn: turnOpen, step: stepOpen };
      if (e.closes === "step") stepOpen = false;
      if (e.closes === "turn") {
        turnOpen = false;
        stepOpen = false;
      }
      return g;
    });

    const extraCss = `
      .bg-accent\\/35 { background-color: color-mix(in srgb, var(--accent, #0285ff) 35%, transparent); }
      .bg-hover-2\\/60 { background-color: color-mix(in srgb, var(--hover-2, #e7e9eb) 60%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .size-\\[7px\\] { width: 7px; height: 7px; }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .py-\\[5px\\] { padding-top: 5px; padding-bottom: 5px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
      .border-\\[1\\.5px\\] { border-width: 1.5px; }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${done ? "bg-green" : "bg-accent animate-pulse"}"></span>
            <h3 class="title text-[13px] font-semibold text-ink">${zh ? "Turn 括号事件流" : "Turn Bracket Stream"}</h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              session/7c1d
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${Math.min(this._visible, EVENTS.length)}/${EVENTS.length} events
          </span>
        </div>

        
        <div class="timeline relative flex min-h-[304px] flex-col gap-[3px] rounded-control border border-line bg-inset/50 p-3">
          ${rows
            .map((e, i) => {
              const g = guides[i];
              const isLast = i === rows.length - 1;
              return `
                <div
                  class="relative flex items-center gap-2.5 rounded-chip px-1.5 py-[5px]"
                  style="padding-left: ${6 + e.depth * 22}px; animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both; ${
                    isLast && !done ? "background: var(--hover);" : ""
                  }"
                >
                  ${
                    g.turn
                      ? `<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-accent/35" style="left: 12px;"></span>`
                      : ""
                  }
                  ${
                    e.depth >= 1 && g.step
                      ? `<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-line-strong" style="left: ${
                          12 + 22
                        }px;"></span>`
                      : ""
                  }
                  ${
                    e.closes
                      ? `<span aria-hidden="true" class="absolute size-[7px] rounded-full border-[1.5px] ${
                          e.closes === "turn"
                            ? "border-accent bg-accent-tint"
                            : "border-line-strong bg-surface"
                        }" style="left: ${12 + (e.closes === "turn" ? 0 : 22) - 3}px;"></span>`
                      : ""
                  }

                  <span class="size-1.5 shrink-0 rounded-full ${TONE_DOT[e.tone]}"></span>
                  <code class="shrink-0 rounded-chip px-1.5 py-px font-mono text-[10px] ${TONE_CHIP[e.tone]}">
                    ${e.type}
                  </code>
                  <span class="min-w-0 flex-1 truncate text-[11.5px] text-ink-2">
                    ${zh ? e.summaryZh : e.summaryEn}
                  </span>
                  ${
                    e.meta
                      ? `<span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">${e.meta}</span>`
                      : ""
                  }
                </div>
              `;
            })
            .join("")}

          ${
            !done
              ? `
            <div
              class="flex items-center gap-2 px-1.5 py-1"
              style="padding-left: ${6 + Math.min((EVENTS[this._visible]?.depth ?? 0) * 22 + 22, 66)}px;"
            >
              <span class="size-1.5 rounded-full bg-ink-3 animate-pulse"></span>
              <span class="font-mono text-[10px] text-ink-3">
                ${zh ? "等待下一事件…" : "awaiting next event…"}
              </span>
            </div>
          `
              : ""
          }
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${zh ? "括号结构: turn ⊃ step ⊃ tool/call" : "Brackets: turn ⊃ step ⊃ tool/call"}
          </span>
          <span class="font-mono">agent/loop · durable</span>
        </div>
      </div>
    `, extraCss);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-turn-lifecycle")) {
  customElements.define("nai-turn-lifecycle", NaiTurnLifecycle);
}
