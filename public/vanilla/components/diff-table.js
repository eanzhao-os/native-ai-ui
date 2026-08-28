import { NaiBaseElement } from "../core/base-element.js";

const HEADERS = [
  { en: "Flavor", zh: "风味" },
  { en: "Category", zh: "分类" },
  { en: "Supplier", zh: "供应商" },
];

const ROWS = [
  { nameEn: "Rocky Road", nameZh: "石板街", dept: "Classic", deptEn: "Classic", deptZh: "经典", email: "aurora-scoops", removed: true },
  { nameEn: "Bubblegum", nameZh: "泡泡糖", dept: "Retro", deptEn: "Retro", deptZh: "复古", email: "kumo-creamery", removed: true },
  { nameEn: "Mint Chip", nameZh: "薄荷巧克力", dept: "Classic", deptEn: "Classic", deptZh: "经典", email: "maple-orbit", removed: false },
];

const DOT_COLORS = {
  Classic: "var(--accent, #0285ff)",
  Retro: "var(--ink-3, #9a9da3)",
  Seasonal: "var(--orange, #ef720c)",
};

export class NaiDiffTable extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._stage = 0;
  }

  onMount() {
    this._startStageProgression();
  }

  _startStageProgression() {
    this._stage = 0;
    this.render();

    this.registerTimeout(() => {
      this._stage = 1;
      this.render();
      this.registerTimeout(() => {
        this._stage = 2;
        this.render();
        this.registerTimeout(() => {
          this._stage = 3;
          this.render();
        }, 1000);
      }, 1000);
    }, 800);
  }

  render() {
    const zh = this.isZh;
    const tinted = this._stage >= 2;
    const added = this._stage >= 3;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .card {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
        }

        .card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 10px 14px;
        }

        .card-title {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          text-align: left;
        }

        col.col-name { width: 34%; }
        col.col-category { width: 30%; }
        col.col-supplier { width: 36%; }

        th {
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          border-bottom: 1px solid var(--line, #ecedef);
        }

        tr.row-item {
          border-bottom: 1px solid var(--line, #ecedef);
          transition: background-color 400ms ease, color 400ms ease;
        }

        tr.row-item:last-child {
          border-bottom: 0;
        }

        tr.row-item:hover {
          background: var(--hover, #f4f5f6);
        }

        tr.row-item.tinted-out {
          background: var(--red-tint, #fcecec);
        }

        td {
          padding: 8px 12px;
          font-size: 13px;
        }

        .cell-name {
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          transition: color 400ms ease;
          color: var(--ink, #1f2124);
        }

        .cell-name.out {
          color: var(--red, #e3474c);
        }

        .tag-pill {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          background: var(--inset, #f7f8f9);
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          transition: opacity 400ms ease;
        }

        .tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .tag-label {
          color: var(--ink-2, #62656b);
        }

        .cell-supplier {
          font-size: 12.5px;
          white-space: nowrap;
          transition: color 400ms ease, text-decoration 400ms ease;
          color: var(--ink-2, #62656b);
        }

        .cell-supplier.out {
          color: var(--red, #e3474c);
          text-decoration: line-through;
          text-decoration-color: rgba(227, 71, 76, 0.5);
        }

        /* Added row expansion */
        .added-row-container {
          display: grid;
          grid-template-rows: ${added ? "1fr" : "0fr"};
          opacity: ${added ? "1" : "0"};
          transition: grid-template-rows 400ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .added-row-inner {
          overflow: hidden;
          background: var(--green-tint, #e8f5ed);
        }

        .added-grid {
          display: grid;
          grid-template-columns: 34% 30% 36%;
          align-items: center;
          border-top: 1px solid var(--line, #ecedef);
          padding: 8px 0;
        }

        .added-grid > span {
          padding: 0 12px;
        }

        .added-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--green, #189a4d);
          font-variant-numeric: tabular-nums;
        }

        .added-tag-pill {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .added-supplier {
          font-size: 13px;
          color: var(--green, #189a4d);
        }
      </style>

      <div class="card">
        <div class="card-bar">
          <span class="card-title">${zh ? "菜单清理建议" : "Proposed menu cleanup"}</span>
        </div>

        <table>
          <colgroup>
            <col class="col-name" />
            <col class="col-category" />
            <col class="col-supplier" />
          </colgroup>
          <thead>
            <tr>
              ${HEADERS.map((h) => `<th>${zh ? h.zh : h.en}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${ROWS.map((row) => {
              const out = row.removed && tinted;
              const dotBg = DOT_COLORS[row.dept] || "var(--ink-3)";
              return `
                <tr class="row-item ${out ? "tinted-out" : ""}">
                  <td class="cell-name ${out ? "out" : ""}">
                    ${zh ? row.nameZh : row.nameEn}
                  </td>
                  <td>
                    <span class="tag-pill" style="opacity: ${out ? 0.55 : 1}">
                      <span class="tag-dot" style="background: ${dotBg}"></span>
                      <span class="tag-label">${zh ? row.deptZh : row.deptEn}</span>
                    </span>
                  </td>
                  <td class="cell-supplier ${out ? "out" : ""}">
                    ${row.email}
                  </td>
                </tr>
              `;
            }).join("")}

            <tr>
              <td colspan="3" style="padding: 0;">
                <div class="added-row-container">
                  <div class="added-row-inner">
                    <div class="added-grid">
                      <span class="added-name">${zh ? "开心果" : "Pistachio"}</span>
                      <span>
                        <span class="added-tag-pill">
                          <span class="tag-dot" style="background: var(--green, #189a4d)"></span>
                          <span class="tag-label">${zh ? "季节限定" : "Seasonal"}</span>
                        </span>
                      </span>
                      <span class="added-supplier">maple-orbit</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-diff-table")) {
  customElements.define("nai-diff-table", NaiDiffTable);
}
