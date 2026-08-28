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
    const nextStep = phase === 2 ? [STEER] : phase === 3 ? [STEER, INJECT] : [];
    const idleFlicker = phase === 5;
    const turnNo = phase >= 5 ? 3 : 2;
    const stepNo = phase >= 4 ? 2 : 1;

    const deliveryMethods = [
      { name: "Send", descEn: "owns send", descZh: "独占发送", kind: "send" },
      { name: "Followup", descEn: "→ turn+wake", descZh: "→ 下轮+唤醒", kind: "followup" },
      { name: "Steer", descEn: "→ step+wake", descZh: "→ 边界+唤醒", kind: "steer" },
      { name: "Inject", descEn: "→ step, silent", descZh: "→ 边界,静默", kind: "inject" },
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
          transition: background-color 0.3s;
          background: ${idleFlicker ? "var(--ink-3, #9a9da3)" : "var(--accent, #0285ff)"};
          ${!idleFlicker ? "animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;" : ""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .state-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .turn-step {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .lanes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .lane {
          display: flex;
          min-height: 118px;
          flex-direction: column;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px;
        }
        .lane-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 6px 4px;
        }
        .lane-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .lane-desc {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .lane-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 4px;
        }
        .empty-placeholder {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-chip, 6px);
          border: 1px dashed var(--line, #ecedef);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .msg-box {
          border-radius: var(--radius-chip, 6px);
          padding: 6px 8px;
          animation: pop-in 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .msg-followup {
          border: 1px solid var(--accent, #0285ff);
          border-color: rgba(2, 133, 255, 0.4);
          background: var(--accent-tint, #e9f3ff);
        }
        .msg-steer {
          border: 1px solid var(--orange, #ef720c);
          border-color: rgba(239, 114, 12, 0.4);
          background: var(--orange-tint, #fdf1e5);
        }
        .msg-inject {
          border: 1px dashed var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
        }
        .msg-header {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .msg-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .msg-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .msg-text {
          margin: 2px 0 0 0;
          font-size: 10.5px;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .claim-indicator {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 8px 10px;
          transition: all 0.5s;
        }
        .claim-active {
          border-color: rgba(24, 154, 77, 0.4);
          background: var(--green-tint, #e8f5ed);
        }
        .claim-inactive {
          border-color: var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .claim-text {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .claim-badge {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .methods-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .method-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          padding: 6px 4px;
          transition: all 0.3s;
        }
        .method-send { border-color: var(--line, #ecedef); background: var(--field, #f2f2f3); color: var(--ink-2, #62656b); }
        .method-followup { border-color: rgba(2, 133, 255, 0.4); background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .method-steer { border-color: rgba(239, 114, 12, 0.4); background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .method-inject { border: 1px dashed var(--line-strong, #e0e2e5); background: var(--surface, #fff); color: var(--ink-3, #9a9da3); }

        .method-flash {
          outline: 2px solid var(--accent, #0285ff);
          transform: scale(1.05);
        }
        .method-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 600;
        }
        .method-desc {
          font-size: 8.5px;
          opacity: 0.8;
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
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${zh ? "双队列收件箱" : "Agent Inbox"}</h3>
            <span class="state-chip">${idleFlicker ? (zh ? "空闲" : "idle") : zh ? "运行中" : "running"}</span>
          </div>
          <span class="turn-step">turn ${turnNo} · step ${stepNo}</span>
        </div>

        <div class="lanes-grid">
          <!-- NextTurn lane -->
          <div class="lane">
            <div class="lane-header">
              <span class="lane-name">NextTurn</span>
              <span class="lane-desc">${zh ? "各开一轮" : "own turn"}</span>
            </div>
            <div class="lane-content">
              ${
                nextTurn.length === 0
                  ? `<span class="empty-placeholder">${zh ? "空" : "empty"}</span>`
                  : nextTurn
                      .map(
                        (m) => `
                    <div class="msg-box msg-followup">
                      <div class="msg-header">
                        <span class="msg-dot" style="background: var(--accent, #0285ff);"></span>
                        <span class="msg-tag" style="color: var(--accent-ink, #0170dd);">FollowupAsync</span>
                      </div>
                      <p class="msg-text">${zh ? m.textZh : m.textEn}</p>
                    </div>
                  `
                      )
                      .join("")
              }
            </div>
          </div>

          <!-- NextStep lane -->
          <div class="lane">
            <div class="lane-header">
              <span class="lane-name">NextStep</span>
              <span class="lane-desc">${zh ? "步骤边界消费" : "step edge"}</span>
            </div>
            <div class="lane-content">
              ${
                nextStep.length === 0
                  ? `<span class="empty-placeholder">${zh ? "空" : "empty"}</span>`
                  : nextStep
                      .map(
                        (m) => `
                    <div class="msg-box ${m.kind === "inject" ? "msg-inject" : "msg-steer"}">
                      <div class="msg-header">
                        <span class="msg-dot" style="background: ${
                          m.kind === "inject" ? "var(--ink-3, #9a9da3)" : "var(--orange, #ef720c)"
                        };"></span>
                        <span class="msg-tag" style="color: ${
                          m.kind === "inject" ? "var(--ink-3, #9a9da3)" : "var(--orange, #ef720c)"
                        };">
                          ${m.kind === "inject" ? "InjectAsync" : "SteerAsync"}
                        </span>
                      </div>
                      <p class="msg-text">${zh ? m.textZh : m.textEn}</p>
                    </div>
                  `
                      )
                      .join("")
              }
            </div>
          </div>
        </div>

        <!-- Step boundary claim indicator -->
        <div class="claim-indicator ${phase >= 4 ? "claim-active" : "claim-inactive"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${
            phase >= 4 ? "var(--green, #189a4d)" : "var(--ink-3, #9a9da3)"
          }" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
          </svg>
          <span class="claim-text">
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
          ${phase >= 4 ? `<span class="claim-badge">claimed ×2</span>` : ""}
        </div>

        <!-- Delivery methods -->
        <div class="methods-grid">
          ${deliveryMethods
            .map((b, i) => {
              const flash =
                (i === 1 && phase === 1) || (i === 2 && phase === 2) || (i === 3 && phase === 3);
              return `
              <div class="method-card method-${b.kind} ${flash ? "method-flash" : ""}">
                <span class="method-name">${b.name}</span>
                <span class="method-desc">${zh ? b.descZh : b.descEn}</span>
              </div>
            `;
            })
            .join("")}
        </div>

        <!-- Footer -->
        <div class="footer">
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
          <span class="footer-mono">agent/inbox/spliced</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-agent-inbox")) {
  customElements.define("nai-agent-inbox", NaiAgentInbox);
}
