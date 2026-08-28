import { NaiBaseElement } from "../core/base-element.js";

const FILTERS = [
  { key: "all", labelEn: "All", labelZh: "全部", count: 5 },
  { key: "todo", labelEn: "To do", labelZh: "待办", dot: "#f09a2f", count: 2 },
  { key: "progress", labelEn: "In Progress", labelZh: "进行中", dot: "#16a6c7", count: 2 },
  { key: "done", labelEn: "Completed", labelZh: "已完成", dot: "#25a878", count: 1 },
];

const ROWS = [
  { taskEn: "Restock mango sorbet", taskZh: "补货芒果雪葩", dateEn: "Dec 03", dateZh: "12月3日", status: "todo", ownerEn: "Mango Moon Gelato", ownerZh: "Mango Moon 意式冰淇淋" },
  { taskEn: "Churn black sesame", taskZh: "搅拌黑芝麻基底", dateEn: "Sep 22", dateZh: "9月22日", status: "progress", ownerEn: "Kumo Creamery", ownerZh: "Kumo 乳品工坊" },
  { taskEn: "Print summer menu", taskZh: "印制夏季菜单", dateEn: "Jan 02", dateZh: "1月2日", status: "todo", ownerEn: "Coral Coast Sorbet", ownerZh: "Coral Coast 雪葩" },
  { taskEn: "Taste-test batch 42", taskZh: "试吃评测第 42 批", dateEn: "Nov 08", dateZh: "11月8日", status: "progress", ownerEn: "Maple Orbit", ownerZh: "Maple Orbit 枫糖" },
  { taskEn: "Order waffle cones", taskZh: "订购华夫脆筒", dateEn: "Apr 14", dateZh: "4月14日", status: "done", ownerEn: "Aurora Scoops", ownerZh: "Aurora 冰品铺" },
];

const PILLS = {
  todo: { labelEn: "To do", labelZh: "待办", color: "#f09a2f" },
  progress: { labelEn: "In Progress", labelZh: "进行中", color: "#16a6c7" },
  done: { labelEn: "Completed", labelZh: "已完成", color: "#25a878" },
};

const HEADERS = [
  { en: "Task name", zh: "任务名称" },
  { en: "Date", zh: "日期" },
  { en: "Status", zh: "状态" },
  { en: "Advisor", zh: "顾问" },
];

export class NaiFilterTable extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._filter = "all";
  }

  setFilter(filter) {
    this._filter = filter;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const currentFilter = this._filter;

    this.setHtml(`
      <div class="w-full max-w-105">
        
        <div
          class="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1"
          style="scrollbar-width: none;"
        >
          ${FILTERS.map((f) => {
            const active = currentFilter === f.key;
            return `
              <button
                type="button"
                aria-pressed="${active}"
                data-key="${f.key}"
                class="chip-btn flex h-6.5 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition-[background-color,box-shadow,color] duration-200 cursor-pointer ${
                  active ? "bg-surface text-ink shadow-btn" : "text-ink-2 hover:bg-hover"
                }"
              >
                ${f.dot ? `<span class="size-1.5 rounded-full" style="background: ${f.dot}"></span>` : ""}
                ${zh ? f.labelZh : f.labelEn}
                <span
                  class="rounded-[4px] px-1 text-[10.5px] tabular-nums ${
                    active ? "bg-field text-ink-2" : "text-ink-3"
                  }"
                >
                  ${f.count}
                </span>
              </button>
            `;
          }).join("")}
        </div>

        
        <div
          aria-label="Scrollable task table"
          class="overflow-x-auto rounded-card bg-surface shadow-card"
          role="region"
          tabindex="0"
          style="scrollbar-width: none;"
        >
          <div class="min-w-[420px]">
            <div class="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] border-b border-line px-3 py-2 text-[11.5px] font-medium text-ink-3">
              ${HEADERS.map((h) => `<span>${zh ? h.zh : h.en}</span>`).join("")}
            </div>
            ${ROWS.map((row) => {
              const shown = currentFilter === "all" || row.status === currentFilter;
              const pill = PILLS[row.status];
              return `
                <div
                  class="row-wrapper ${shown ? "visible" : ""} grid transition-[grid-template-rows,opacity] duration-300"
                  style="grid-template-rows: ${shown ? "1fr" : "0fr"}; opacity: ${
                shown ? 1 : 0
              }; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                >
                  <div class="overflow-hidden">
                    <div
                      class="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b border-line px-3 py-2 text-[12px] transition-colors duration-100 last:border-0 hover:bg-hover"
                    >
                      <span class="truncate font-medium text-ink">${zh ? row.taskZh : row.taskEn}</span>
                      <span class="text-ink-2 tabular-nums">${zh ? row.dateZh : row.dateEn}</span>
                      <span>
                        <span
                          class="inline-flex h-5 items-center rounded-[5px] px-1.5 text-[11px] font-medium"
                          style="color: ${pill.color}; background: color-mix(in srgb, ${pill.color} 13%, transparent);"
                        >
                          ${zh ? pill.labelZh : pill.labelEn}
                        </span>
                      </span>
                      <span class="truncate text-ink-2">${zh ? row.ownerZh : row.ownerEn}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelectorAll("[data-key]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key) this.setFilter(key);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-filter-table")) {
  customElements.define("nai-filter-table", NaiFilterTable);
}
