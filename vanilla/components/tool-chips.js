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

    const html = `
      <div class="min-h-[220px] w-full max-w-80 pb-1">
        <!-- collapsed run header -->
        <button
          type="button"
          aria-expanded="${open}"
          class="header-btn -mx-1.5 flex w-fit items-center gap-1.5 rounded-control px-1.5 py-1 text-[12.5px] text-ink-2 transition-colors duration-100 hover:bg-hover-2 cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-200"
            style="transform: ${open ? "rotate(0deg)" : "rotate(-90deg)"};"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span class="tabular-nums">${zh ? "4 次工具调用，2 条消息" : "4 tool calls, 2 messages"}</span>
        </button>

        <!-- tool call rows -->
        <div
          class="grid transition-[grid-template-rows,opacity] duration-300"
          style="grid-template-rows: ${open ? "1fr" : "0fr"}; opacity: ${open ? 1 : 0};"
        >
          <div class="-mx-1 overflow-hidden px-1.5 pb-1">
            <div class="mt-1.5 flex flex-col gap-1">
              ${ROWS.slice(0, step)
                .map((row) => {
                  const rowOpen = this._openRows.has(row.labelEn);
                  return `
                    <div style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
                      <button
                        type="button"
                        aria-expanded="${rowOpen}"
                        data-label="${row.labelEn}"
                        class="row-btn group/row -mx-[3px] flex h-7 w-[calc(100%+6px)] min-w-0 items-center gap-2 rounded-control px-[3px] text-left transition-colors duration-100 hover:bg-hover-2 cursor-pointer"
                      >
                        <span class="relative flex size-4 shrink-0 items-center justify-center text-ink-3">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="${row.icon === "think" ? "currentColor" : "none"}"
                            stroke="currentColor"
                            class="transition-opacity duration-100 group-hover/row:opacity-0 ${rowOpen ? "opacity-0" : ""}"
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
                            class="absolute transition-[opacity,transform] duration-150 group-hover/row:opacity-100 ${rowOpen ? "opacity-100" : "opacity-0"}"
                            style="transform: ${rowOpen ? "rotate(0deg)" : "rotate(-90deg)"};"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                        <span class="shrink-0 text-[12.5px] font-medium text-ink">${zh ? row.labelZh : row.labelEn}</span>
                        <span
                          class="inline-flex h-5.5 min-w-0 flex-1 cursor-pointer items-center truncate rounded-chip bg-hover-2 px-1.5
                            text-[11.5px] text-ink-2 shadow-hairline transition-colors duration-100 hover:bg-line-strong
                            dark:bg-field dark:hover:bg-hover
                            ${row.mono ? "font-mono" : ""}"
                        >
                          ${zh ? row.chipZh ?? row.chipEn : row.chipEn}
                        </span>
                      </button>

                      <!-- expanded detail -->
                      <div
                        class="grid transition-[grid-template-rows,opacity] duration-300"
                        style="grid-template-rows: ${rowOpen ? "1fr" : "0fr"}; opacity: ${rowOpen ? 1 : 0}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                      >
                        <div class="min-h-0 overflow-hidden">
                          <div class="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-line py-0.5 pl-3.5">
                            ${row.detail
                              .map(
                                (line) => `
                              <span
                                class="truncate text-[11.5px] leading-[1.6] ${row.detailMono ? "font-mono" : ""} ${line.tone === "add" ? "text-green" : "text-ink-2"}"
                              >
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

            <!-- file-diff chips -->
            ${
              step >= total
                ? `
              <div class="mt-2.5 flex max-w-full flex-wrap gap-1.5 border-t border-line pt-2.5">
                ${DIFFS.map(
                  (d, i) => `
                  <span
                    class="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-chip
                      bg-surface px-2 font-mono text-[11.5px] text-ink shadow-btn
                      transition-colors duration-100 hover:bg-hover"
                    style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both;"
                  >
                    <span class="min-w-0 truncate">${d.file}</span>
                    <span class="shrink-0 text-green tabular-nums">+${d.add}</span>
                    ${d.del > 0 ? `<span class="shrink-0 text-red tabular-nums">−${d.del}</span>` : ""}
                  </span>
                `
                ).join("")}
                <button
                  type="button"
                  class="inline-flex h-7 items-center rounded-chip px-1.5 font-mono text-[11.5px] text-ink-3
                    underline decoration-transparent underline-offset-2 transition-colors duration-100
                    hover:text-ink-2 hover:decoration-current cursor-pointer"
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
      </div>
    `;

    this.setHtml(html);

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
