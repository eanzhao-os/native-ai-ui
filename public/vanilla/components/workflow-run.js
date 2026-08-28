import { NaiBaseElement } from "../core/base-element.js";

const TOTAL_ITEMS = 40;
const SLOTS = 4;
const SLOT_MEMBERS = ["w-01", "w-02", "w-03", "w-04"];
const TICK_MS = 420;
const HOLD_MS = 4200;

export class NaiWorkflowRun extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._done = 0;
  }

  onMount() {
    this._done = 0;
    this._scheduleTick();
  }

  onUnmount() {
    this._done = 0;
  }

  _scheduleTick() {
    if (this._done < TOTAL_ITEMS) {
      this.registerTimeout(() => {
        this._done = Math.min(TOTAL_ITEMS, this._done + SLOTS);
        this.render();
        this._scheduleTick();
      }, TICK_MS);
    } else {
      this.registerTimeout(() => {
        this._done = 0;
        this.render();
        this._scheduleTick();
      }, HOLD_MS);
    }
  }

  render() {
    const zh = this.isZh;
    const done = this._done;
    const running = done < TOTAL_ITEMS;
    const inFlight = running ? Math.min(SLOTS, TOTAL_ITEMS - done) : 0;
    const pct = Math.round((done / TOTAL_ITEMS) * 100);

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
          background: ${running ? "var(--accent, #0285ff)" : "var(--green, #189a4d)"};
          ${running ? "animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;" : ""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .run-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .percentage {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          column-gap: 12px;
          row-gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .meta-val {
          color: var(--ink-2, #62656b);
        }

        .slots-list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .slot-row {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 6px 10px;
          transition: all 0.3s;
        }
        .slot-active {
          border-color: rgba(2, 133, 255, 0.4);
          background: rgba(233, 243, 255, 0.4);
        }
        .slot-inactive {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .slot-avatar {
          display: flex;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8.5px;
          font-weight: 600;
        }
        .avatar-active { background: var(--accent, #0285ff); color: #fff; }
        .avatar-inactive { background: var(--field, #f2f2f3); color: var(--ink-3, #9a9da3); }

        .slot-member {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .slot-bar-wrap {
          min-width: 0;
          flex: 1;
        }
        .slot-bar-bg {
          height: 6px;
          width: 100%;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          overflow: hidden;
        }
        .slot-bar-fill {
          height: 100%;
          border-radius: 9999px;
          background: var(--accent, #0285ff);
          transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .slot-status {
          width: 64px;
          flex-shrink: 0;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .grid-header {
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .grid-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .grid-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .item-tile {
          aspect-ratio: 1 / 1;
          width: 100%;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .item-done { background: rgba(24, 154, 77, 0.8); }
        .item-active { background: var(--accent, #0285ff); animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .item-pending { background: var(--field, #f2f2f3); border: 1px solid rgba(236, 237, 239, 0.6); }

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
            <h3 class="title">${zh ? "工作流扇出执行" : "Workflow Fan-out"}</h3>
            <span class="run-chip">run/8f2e1a</span>
          </div>
          <span class="percentage">${pct}%</span>
        </div>

        <!-- Run meta -->
        <div class="meta-bar">
          <span>digest <span class="meta-val">sha256:9b7c…e4f1</span></span>
          <span>concurrency <span class="meta-val">${SLOTS}</span></span>
          <span>max agents <span class="meta-val">32</span></span>
          <span>max items <span class="meta-val">256</span></span>
        </div>

        <!-- Concurrency slots -->
        <div class="slots-list">
          ${SLOT_MEMBERS.map((member, i) => {
            const slotActive = i < inFlight;
            const itemIdx = done + i;
            return `
              <div class="slot-row ${slotActive ? "slot-active" : "slot-inactive"}">
                <span class="slot-avatar ${slotActive ? "avatar-active" : "avatar-inactive"}">
                  ${member.slice(-2)}
                </span>
                <span class="slot-member">${member}</span>
                <div class="slot-bar-wrap">
                  <div class="slot-bar-bg">
                    ${
                      slotActive
                        ? `<div class="slot-bar-fill" style="width: ${((done % SLOTS) + 1) * 25}%;"></div>`
                        : ""
                    }
                  </div>
                </div>
                <span class="slot-status">
                  ${
                    slotActive
                      ? `item-${String(itemIdx + 1).padStart(2, "0")}`
                      : running
                      ? zh
                        ? "空闲"
                        : "idle"
                      : zh
                      ? "完成"
                      : "done"
                  }
                </span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Item grid -->
        <div style="margin-top: 16px;">
          <div class="grid-header">
            <span class="grid-title">${zh ? "条目网格" : "Items"}</span>
            <span class="grid-count">${done}/${TOTAL_ITEMS}</span>
          </div>
          <div class="items-grid">
            ${Array.from({ length: TOTAL_ITEMS }, (_, i) => {
              const isDone = i < done;
              const isActive = running && i >= done && i < done + inFlight;
              const cls = isDone ? "item-done" : isActive ? "item-active" : "item-pending";
              return `<span class="item-tile ${cls}" title="item-${i + 1}"></span>`;
            }).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>
            ${
              running
                ? zh
                  ? `${inFlight} 个成员并发处理中`
                  : `${inFlight} members in flight`
                : zh
                ? "全部条目处理完成"
                : "All items processed"
            }
          </span>
          <span class="footer-mono">Harness.Workflow</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-workflow-run")) {
  customElements.define("nai-workflow-run", NaiWorkflowRun);
}
