import { NaiBaseElement } from "../core/base-element.js";

const STEP_MS = 700;

const ICONS_SVG = {
  think: `<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />`,
  write: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>`,
  run: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>`,
  read: `<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>`,
};

const ROWS = [
  {
    icon: "think",
    labelEn: "Thinking",
    labelZh: "深度思考",
    chipEn: "Planning the churn schedule…",
    chipZh: "正在规划搅拌排期…",
    mono: false,
    detailMono: false,
    detail: [
      { textEn: "Weekend demand carries pistachio, so it churns first.", textZh: "周末需求以开心果口味为主，优先安排搅拌。" },
      { textEn: "Batch capacity leaves two evening freezer windows.", textZh: "批次产能还留出两个晚间冷冻空档。" },
    ],
  },
  {
    icon: "write",
    labelEn: "Write 204 lines",
    labelZh: "写入 204 行",
    chipEn: "ChurnSchedule.tsx",
    mono: true,
    detailMono: true,
    detail: [
      { textEn: "+ const windows = slots.filter((s) => s.temp <= -12)", tone: "add" },
      { textEn: "+ return schedule(windows, { hero: \"pistachio\" })", tone: "add" },
    ],
  },
  {
    icon: "run",
    labelEn: "Rebuild and verify",
    labelZh: "重新构建并验证",
    chipEn: "npm run freeze",
    mono: true,
    detailMono: true,
    detail: [
      { textEn: "✓ built in 1.2s", textZh: "✓ 构建完成，耗时 1.2s" },
      { textEn: "✓ 34 checks passed", textZh: "✓ 34 项检查通过" },
    ],
  },
  {
    icon: "read",
    labelEn: "Read image",
    labelZh: "读取图片",
    chipEn: "flavor-chart.png",
    mono: true,
    detailMono: false,
    detail: [
      { textEn: "1280 × 720 · line chart, three summers.", textZh: "1280 × 720 · 折线图，横跨三个夏季。" },
      { textEn: "Mint chip trends up 12% through July.", textZh: "薄荷巧克力口味到 7 月上涨 12%。" },
    ],
  },
];

const DIFFS = [
  { file: "flavors.css", add: 13, del: 0 },
  { file: "ChurnSchedule.tsx", add: 74, del: 41 },
  { file: "menu.ts", add: 8, del: 2 },
];

export class NaiToolChips extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "auto"];
  }

  constructor() {
    super();
    this._step = 0;
    this._open = true;
    this._openRows = new Set();
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    if (!this.autoPlay) {
      this._step = ROWS.length + 1;
      return;
    }
    this._scheduleNext();
  }

  _scheduleNext() {
    if (!this.autoPlay) return;
    const total = ROWS.length + 1;
    if (this._step >= total) return;
    this.registerTimeout(() => {
      this._step = this._step + 1;
      this.render();
      this._scheduleNext();
    }, STEP_MS);
  }

  toggleRun() {
    this._open = !this._open;
    this.render();
  }

  toggleRow(labelEn) {
    if (this._openRows.has(labelEn)) {
      this._openRows.delete(labelEn);
    } else {
      this._openRows.add(labelEn);
    }
    this.render();
  }

  render() {
    const zh = this.isZh;
    const step = this._step;
    const open = this._open;
    const total = ROWS.length + 1;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 320px;
          min-height: 220px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          padding-bottom: 4px;
        }
        .header-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 4px 6px;
          margin: 0 -6px;
          font-size: 12.5px;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .header-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .chevron-main {
          transition: transform 0.2s;
          transform: rotate(${open ? "0deg" : "-90deg"});
        }
        .content-collapse {
          display: grid;
          grid-template-rows: ${open ? "1fr" : "0fr"};
          opacity: ${open ? 1 : 0};
          transition: grid-template-rows 0.3s, opacity 0.3s;
        }
        .content-inner {
          overflow: hidden;
          padding: 0 6px 4px 6px;
          margin: 0 -4px;
        }
        .rows-list {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .row-item {
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .row-btn {
          display: flex;
          height: 28px;
          width: calc(100% + 6px);
          margin: 0 -3px;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 0 4px;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .row-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .icon-wrap {
          position: relative;
          display: flex;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          color: var(--ink-3, #9a9da3);
        }
        .icon-tool {
          transition: opacity 0.1s;
        }
        .icon-chev {
          position: absolute;
          transition: opacity 0.15s, transform 0.15s;
        }
        .row-btn:hover .icon-tool { opacity: 0; }
        .row-btn:hover .icon-chev { opacity: 1 !important; }
        .row-label {
          flex-shrink: 0;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .chip {
          display: inline-flex;
          height: 22px;
          min-width: 0;
          flex: 1;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          background: var(--hover-2, #e7e9eb);
          padding: 0 6px;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background-color 0.1s;
        }
        .chip:hover {
          background: var(--line-strong, #e0e2e5);
        }
        .chip.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .detail-collapse {
          display: grid;
          transition: grid-template-rows 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .detail-inner {
          min-height: 0;
          overflow: hidden;
        }
        .detail-lines {
          margin: 2px 0 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 1px solid var(--line, #ecedef);
          padding: 2px 0 2px 14px;
        }
        .detail-line {
          font-size: 11.5px;
          line-height: 1.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--ink-2, #62656b);
        }
        .detail-line.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .detail-line.add {
          color: var(--green, #189a4d);
        }
        .diffs-section {
          margin-top: 10px;
          display: flex;
          max-width: 100%;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 10px;
        }
        .diff-chip {
          display: inline-flex;
          height: 28px;
          max-width: 100%;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-chip, 6px);
          background: var(--surface, #fff);
          padding: 0 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong));
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .diff-chip:hover {
          background: var(--hover, #f4f5f6);
        }
        .diff-file {
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .diff-add {
          flex-shrink: 0;
          color: var(--green, #189a4d);
          font-variant-numeric: tabular-nums;
        }
        .diff-del {
          flex-shrink: 0;
          color: var(--red, #e3474c);
          font-variant-numeric: tabular-nums;
        }
        .diff-more {
          display: inline-flex;
          height: 28px;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          padding: 0 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.1s, text-decoration-color 0.1s;
        }
        .diff-more:hover {
          color: var(--ink-2, #62656b);
          text-decoration-color: currentColor;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      </style>

      <button type="button" class="header-btn" aria-expanded="${open}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="chevron-main">
          <path d="M6 9l6 6 6-6"/>
        </svg>
        <span>${zh ? "4 次工具调用，2 条消息" : "4 tool calls, 2 messages"}</span>
      </button>

      <div class="content-collapse">
        <div class="content-inner">
          <div class="rows-list">
            ${ROWS.slice(0, step)
              .map((row) => {
                const rowOpen = this._openRows.has(row.labelEn);
                return `
                  <div class="row-item">
                    <button
                      type="button"
                      class="row-btn"
                      data-label="${row.labelEn}"
                      aria-expanded="${rowOpen}"
                    >
                      <span class="icon-wrap">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="${row.icon === "think" ? "currentColor" : "none"}"
                          stroke="currentColor"
                          class="icon-tool"
                          style="opacity: ${rowOpen ? 0 : 1};"
                        >
                          ${ICONS_SVG[row.icon]}
                        </svg>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2.2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="icon-chev"
                          style="opacity: ${rowOpen ? 1 : 0}; transform: rotate(${rowOpen ? "0deg" : "-90deg"});"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                      <span class="row-label">${zh ? row.labelZh : row.labelEn}</span>
                      <span class="chip ${row.mono ? "mono" : ""}">
                        ${zh ? row.chipZh ?? row.chipEn : row.chipEn}
                      </span>
                    </button>

                    <div
                      class="detail-collapse"
                      style="grid-template-rows: ${rowOpen ? "1fr" : "0fr"}; opacity: ${rowOpen ? 1 : 0};"
                    >
                      <div class="detail-inner">
                        <div class="detail-lines">
                          ${row.detail
                            .map(
                              (line) => `
                            <span class="detail-line ${row.detailMono ? "mono" : ""} ${line.tone === "add" ? "add" : ""}">
                              ${zh ? line.textZh ?? line.textEn : line.textEn}
                            </span>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>

          ${
            step >= total
              ? `
            <div class="diffs-section">
              ${DIFFS.map(
                (d, i) => `
                <span
                  class="diff-chip"
                  style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both;"
                >
                  <span class="diff-file">${d.file}</span>
                  <span class="diff-add">+${d.add}</span>
                  ${d.del > 0 ? `<span class="diff-del">−${d.del}</span>` : ""}
                </span>
              `
              ).join("")}
              <button
                type="button"
                class="diff-more"
                style="animation: fade-in 300ms ease-out ${DIFFS.length * 80}ms both;"
              >
                ${zh ? "+ 还有 2 项" : "+2 more"}
              </button>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    this.shadowRoot.querySelector(".header-btn")?.addEventListener("click", () => this.toggleRun());

    this.shadowRoot.querySelectorAll(".row-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const label = btn.getAttribute("data-label");
        if (label) this.toggleRow(label);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-tool-chips")) {
  customElements.define("nai-tool-chips", NaiToolChips);
}
