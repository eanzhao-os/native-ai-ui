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
          background: ${done ? "var(--green, #189a4d)" : "var(--accent, #0285ff)"};
          ${!done ? "animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;" : ""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .session-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .counter {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .timeline {
          position: relative;
          display: flex;
          min-height: 304px;
          flex-direction: column;
          gap: 3px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .event-row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-chip, 6px);
          padding: 5px 6px;
          font-size: 11.5px;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .guide-turn {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--accent, #0285ff);
          opacity: 0.35;
          left: 12px;
          pointer-events: none;
        }
        .guide-step {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
          left: 34px;
          pointer-events: none;
        }
        .elbow-turn {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          left: 9px;
          pointer-events: none;
        }
        .elbow-step {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          left: 31px;
          pointer-events: none;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-accent { background: var(--accent, #0285ff); }
        .dot-green { background: var(--green, #189a4d); }
        .dot-orange { background: var(--orange, #ef720c); }
        .dot-muted { background: var(--ink-3, #9a9da3); }
        .dot-dim { background: var(--line-strong, #e0e2e5); }

        .chip {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .chip-accent { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .chip-green { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .chip-orange { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .chip-muted { background: var(--hover-2, #e7e9eb); color: var(--ink-2, #62656b); }
        .chip-dim { background: var(--field, #f2f2f3); color: var(--ink-3, #9a9da3); }

        .summary {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--ink-2, #62656b);
        }
        .meta {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .caret-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
        }
        .caret-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ink-3, #9a9da3);
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .caret-text {
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
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${zh ? "Turn 括号事件流" : "Turn Bracket Stream"}</h3>
            <span class="session-chip">session/7c1d</span>
          </div>
          <span class="counter">${Math.min(this._visible, EVENTS.length)}/${EVENTS.length} events</span>
        </div>

        <div class="timeline">
          ${rows
            .map((e, i) => {
              const g = guides[i];
              const isLast = i === rows.length - 1;
              const padLeft = 6 + e.depth * 22;
              const bg = isLast && !done ? "background: var(--hover, #f4f5f6);" : "";
              return `
                <div class="event-row" style="padding-left: ${padLeft}px; ${bg}">
                  ${g.turn ? `<span class="guide-turn" aria-hidden="true"></span>` : ""}
                  ${e.depth >= 1 && g.step ? `<span class="guide-step" aria-hidden="true"></span>` : ""}
                  ${
                    e.closes
                      ? `<span class="${e.closes === "turn" ? "elbow-turn" : "elbow-step"}" aria-hidden="true"></span>`
                      : ""
                  }
                  <span class="dot dot-${e.tone}"></span>
                  <code class="chip chip-${e.tone}">${e.type}</code>
                  <span class="summary">${zh ? e.summaryZh : e.summaryEn}</span>
                  ${e.meta ? `<span class="meta">${e.meta}</span>` : ""}
                </div>
              `;
            })
            .join("")}

          ${
            !done
              ? `
              <div class="caret-row" style="padding-left: ${
                6 + Math.min((EVENTS[this._visible]?.depth ?? 0) * 22 + 22, 66)
              }px">
                <span class="caret-dot"></span>
                <span class="caret-text">${zh ? "等待下一事件…" : "awaiting next event…"}</span>
              </div>
            `
              : ""
          }
        </div>

        <div class="footer">
          <span>${zh ? "括号结构: turn ⊃ step ⊃ tool/call" : "Brackets: turn ⊃ step ⊃ tool/call"}</span>
          <span class="footer-mono">agent/loop · durable</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-turn-lifecycle")) {
  customElements.define("nai-turn-lifecycle", NaiTurnLifecycle);
}
