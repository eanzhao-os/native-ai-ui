import { NaiBaseElement } from "../core/base-element.js";

const FOLLOWUP = {
  id: "m1",
  kind: "followup",
  textEn: "also verify the rollout gate",
  textZh: "顺便验证一下灰度发布门禁",
};

const STEER = {
  id: "m2",
  kind: "steer",
  textEn: "use the staging endpoint",
  textZh: "改用 staging 环境的端点",
};

const INJECT = {
  id: "m3",
  kind: "inject",
  textEn: "fyi: trace dump at /tmp/trace.log",
  textZh: "备注：trace 已转储到 /tmp/trace.log",
};

const PHASE_MS = [900, 1500, 1500, 1500, 1700, 2100, 4600];

export class NaiAgentInbox extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._phase = 0;
  }

  onMount() {
    this._phase = 0;
    this._schedulePhase();
  }

  onUnmount() {
    this._phase = 0;
  }

  _schedulePhase() {
    const ms = PHASE_MS[this._phase];
    this.registerTimeout(() => {
      this._phase = (this._phase + 1) % PHASE_MS.length;
      this.render();
      this._schedulePhase();
    }, ms);
  }

  render() {
    const zh = this.isZh;
    const phase = this._phase;

    const nextTurn = phase >= 1 && phase < 5 ? [FOLLOWUP] : [];
    const nextStep =
      phase === 2 ? [STEER] : phase === 3 ? [STEER, INJECT] : [];
    const idleFlicker = phase === 5;
    const turnNo = phase >= 5 ? 3 : 2;
    const stepNo = phase >= 4 ? 2 : 1;

    const extraCss = `
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .bg-accent-tint\\/40 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 40%, transparent); }
      .border-orange\\/40 { border-color: color-mix(in srgb, var(--orange, #ef720c) 40%, transparent); }
      .bg-orange-tint\\/40 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 40%, transparent); }
      .border-green\\/40 { border-color: color-mix(in srgb, var(--green, #189a4d) 40%, transparent); }
      .bg-green-tint\\/40 { background-color: color-mix(in srgb, var(--green-tint, #e8f5ed) 40%, transparent); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .ring-2 { box-shadow: 0 0 0 2px var(--ring-color, currentColor); }
      .ring-accent\\/40 { --ring-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .size-1 { width: 4px; height: 4px; }
      .size-2 { width: 8px; height: 8px; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        {/* Header — driver state */}
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span
              class="flex size-2 rounded-full transition-colors duration-300 ${
                idleFlicker ? "bg-ink-3" : "bg-accent animate-pulse"
              }"
            ></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "双队列收件箱" : "Agent Inbox"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              ${idleFlicker ? (zh ? "空闲" : "idle") : zh ? "运行中" : "running"}
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            turn ${turnNo} · step ${stepNo}
          </span>
        </div>

        {/* Queue lanes */}
        <div class="grid grid-cols-2 gap-2">
          {/* NextTurn lane */}
          <div class="lane flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
            <div class="flex items-center justify-between px-1 pb-1.5">
              <span class="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
                NextTurn
              </span>
              <span class="font-mono text-[9px] text-ink-3">
                ${zh ? "各开一轮" : "own turn"}
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              ${
                nextTurn.length === 0
                  ? `<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${
                      zh ? "空" : "empty"
                    }</span>`
                  : nextTurn
                      .map(
                        (m) => `
                    <div
                      class="rounded-chip border border-accent/40 bg-accent-tint/40 px-2 py-1.5"
                      style="animation: pop-in 260ms cubic-bezier(0.23,1,0.32,1) both;"
                    >
                      <div class="flex items-center gap-1">
                        <span class="size-1 rounded-full bg-accent"></span>
                        <span class="font-mono text-[9px] font-medium text-accent-ink">FollowupAsync</span>
                      </div>
                      <p class="mt-0.5 truncate text-[10.5px] text-ink">
                        ${zh ? m.textZh : m.textEn}
                      </p>
                    </div>
                  `
                      )
                      .join("")
              }
            </div>
          </div>

          {/* NextStep lane */}
          <div class="lane flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
            <div class="flex items-center justify-between px-1 pb-1.5">
              <span class="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
                NextStep
              </span>
              <span class="font-mono text-[9px] text-ink-3">
                ${zh ? "步骤边界消费" : "step edge"}
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              ${
                nextStep.length === 0
                  ? `<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${
                      zh ? "空" : "empty"
                    }</span>`
                  : nextStep
                      .map(
                        (m) => `
                    <div
                      class="rounded-chip px-2 py-1.5 ${
                        m.kind === "inject"
                          ? "border border-dashed border-line-strong bg-surface"
                          : "border border-orange/40 bg-orange-tint/40"
                      }"
                      style="animation: pop-in 260ms cubic-bezier(0.23,1,0.32,1) both;"
                    >
                      <div class="flex items-center gap-1">
                        <span class="size-1 rounded-full ${
                          m.kind === "inject" ? "bg-ink-3" : "bg-orange"
                        }"></span>
                        <span class="font-mono text-[9px] font-medium ${
                          m.kind === "inject" ? "text-ink-3" : "text-orange"
                        }">
                          ${m.kind === "inject" ? "InjectAsync" : "SteerAsync"}
                        </span>
                      </div>
                      <p class="mt-0.5 truncate text-[10.5px] text-ink">
                        ${zh ? m.textZh : m.textEn}
                      </p>
                    </div>
                  `
                      )
                      .join("")
              }
            </div>
          </div>
        </div>

        {/* Step boundary claim indicator */}
        <div
          class="mt-2 flex items-center gap-2 rounded-control border px-2.5 py-2 transition-all duration-500 ${
            phase >= 4 ? "border-green/40 bg-green-tint/40" : "border-line bg-inset/40"
          }"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${
            phase >= 4 ? "var(--green)" : "var(--ink-3)"
          }" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
          </svg>
          <span class="min-w-0 flex-1 truncate text-[11px] text-ink-2">
            ${
              phase >= 4
                ? zh
                  ? "步骤边界：ClaimAsync 整批取走 2 条消息"
                  : "Step boundary: ClaimAsync drained 2 messages"
                : zh
                ? "等待步骤边界…"
                : "awaiting step boundary…"
            }
          </span>
          ${
            phase >= 4
              ? `
            <span
              class="shrink-0 rounded-chip bg-green-tint px-1.5 py-px font-mono text-[9.5px] font-medium text-green"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              claimed ×2
            </span>
          `
              : ""
          }
        </div>

        {/* Delivery methods */}
        <div class="mt-3 grid grid-cols-4 gap-1.5">
          ${[
            { name: "Send", descEn: "owns send", descZh: "独占发送", style: "border-line bg-field text-ink-2" },
            { name: "Followup", descEn: "→ turn+wake", descZh: "→ 下轮+唤醒", style: "border-accent/40 bg-accent-tint/40 text-accent-ink" },
            { name: "Steer", descEn: "→ step+wake", descZh: "→ 边界+唤醒", style: "border-orange/40 bg-orange-tint/40 text-orange" },
            { name: "Inject", descEn: "→ step, silent", descZh: "→ 边界,静默", style: "border-dashed border-line-strong bg-surface text-ink-3" },
          ]
            .map((b, i) => {
              const flash =
                (i === 1 && phase === 1) || (i === 2 && phase === 2) || (i === 3 && phase === 3);
              return `
              <div
                class="method-card flex flex-col items-center gap-0.5 rounded-chip border px-1 py-1.5 transition-all duration-300 ${b.style} ${
                  flash ? "ring-2 ring-accent/40 scale-105" : ""
                }"
                ${b.name === "Inject" ? 'style="border-style: dashed;"' : ""}
              >
                <span class="font-mono text-[10px] font-semibold">${b.name}</span>
                <span class="text-[8.5px] opacity-80">${zh ? b.descZh : b.descEn}</span>
              </div>
            `;
            })
            .join("")}
        </div>

        {/* Footer */}
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${
              phase >= 5
                ? zh
                  ? "空闲后 NextTurn 唤醒驱动，开启第 3 轮"
                  : "NextTurn wakes the driver into turn 3"
                : zh
                ? "所有 mutation 归一化为 splice 事件"
                : "Every mutation folds into a splice event"
            }
          </span>
          <span class="font-mono">agent/inbox/spliced</span>
        </div>
      </div>
    `, extraCss);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-agent-inbox")) {
  customElements.define("nai-agent-inbox", NaiAgentInbox);
}
