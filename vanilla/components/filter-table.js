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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 440px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .filter-chips {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding: 4px 0 8px 0;
          scrollbar-width: none;
        }

        .filter-chips::-webkit-scrollbar {
          display: none;
        }

        .chip-btn {
          display: flex;
          height: 26px;
          flex-shrink: 0;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          border: none;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: var(--ink-2, #62656b);
          transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .chip-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .chip-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
        }

        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .chip-count {
          border-radius: 4px;
          padding: 0 4px;
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .chip-btn.active .chip-count {
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }

        .table-card {
          overflow-x: auto;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
          scrollbar-width: none;
        }

        .table-card::-webkit-scrollbar {
          display: none;
        }

        .table-inner {
          min-width: 420px;
        }

        .header-row {
          display: grid;
          grid-template-columns: 1.3fr 0.6fr 0.95fr 0.9fr;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
        }

        .row-wrapper {
          display: grid;
          transition: grid-template-rows 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .row-wrapper.hidden {
          grid-template-rows: 0fr;
          opacity: 0;
        }

        .row-wrapper.visible {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .row-inner {
          overflow: hidden;
        }

        .row-content {
          display: grid;
          grid-template-columns: 1.3fr 0.6fr 0.95fr 0.9fr;
          align-items: center;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
          font-size: 12px;
          transition: background-color 0.1s ease;
        }

        .row-wrapper:last-child .row-content {
          border-bottom: none;
        }

        .row-content:hover {
          background: var(--hover, #f4f5f6);
        }

        .task-name {
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 8px;
        }

        .task-date {
          color: var(--ink-2, #62656b);
          font-variant-numeric: tabular-nums;
        }

        .status-pill {
          display: inline-flex;
          height: 20px;
          align-items: center;
          border-radius: 5px;
          padding: 0 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .task-owner {
          color: var(--ink-2, #62656b);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>

      <div class="filter-chips">
        ${FILTERS.map((f) => {
          const active = currentFilter === f.key;
          return `
            <button
              type="button"
              class="chip-btn ${active ? "active" : ""}"
              data-key="${f.key}"
              aria-pressed="${active}"
            >
              ${f.dot ? `<span class="chip-dot" style="background: ${f.dot}"></span>` : ""}
              <span>${zh ? f.labelZh : f.labelEn}</span>
              <span class="chip-count">${f.count}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="table-card" role="region" tabindex="0" aria-label="${zh ? "可滚动任务表格" : "Scrollable task table"}">
        <div class="table-inner">
          <div class="header-row">
            ${HEADERS.map((h) => `<span>${zh ? h.zh : h.en}</span>`).join("")}
          </div>

          ${ROWS.map((row) => {
            const shown = currentFilter === "all" || row.status === currentFilter;
            const pill = PILLS[row.status];
            return `
              <div class="row-wrapper ${shown ? "visible" : "hidden"}">
                <div class="row-inner">
                  <div class="row-content">
                    <span class="task-name">${zh ? row.taskZh : row.taskEn}</span>
                    <span class="task-date">${zh ? row.dateZh : row.dateEn}</span>
                    <span>
                      <span class="status-pill" style="color: ${pill.color}; background: color-mix(in srgb, ${pill.color} 13%, transparent);">
                        ${zh ? pill.labelZh : pill.labelEn}
                      </span>
                    </span>
                    <span class="task-owner">${zh ? row.ownerZh : row.ownerEn}</span>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".chip-btn").forEach((btn) => {
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
