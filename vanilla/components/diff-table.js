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

const DOT = {
  Classic: "bg-accent",
  Retro: "bg-ink-3",
  Seasonal: "bg-orange",
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

    this.setHtml(`
      <div class="w-full max-w-95">
        <div class="relative overflow-hidden rounded-card bg-surface shadow-card">
          <div class="primitive-card-bar flex items-center justify-between border-b border-line">
            <span class="card-title text-[12.5px] font-medium text-ink">${zh ? "菜单清理建议" : "Proposed menu cleanup"}</span>
          </div>

          <table class="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col class="w-[34%]" />
              <col class="w-[30%]" />
              <col class="w-[36%]" />
            </colgroup>
            <thead>
              <tr class="border-b border-line">
                ${HEADERS.map(
                  (h) => `
                  <th class="primitive-table-cell text-[12px] font-medium text-ink-3">
                    ${zh ? h.zh : h.en}
                  </th>
                `
                ).join("")}
              </tr>
            </thead>
            <tbody>
              ${ROWS.map((row) => {
                const out = row.removed && tinted;
                const dotClass = DOT[row.dept] || "bg-ink-3";
                return `
                  <tr
                    class="row-item border-b border-line transition-colors duration-400 last:border-0 hover:bg-hover"
                    style="${out ? "background: var(--red-tint);" : ""}"
                  >
                    <td
                      class="primitive-table-cell text-[13px] font-medium tabular-nums transition-colors duration-400"
                      style="${out ? "color: var(--red);" : "color: var(--ink);"}"
                    >
                      ${zh ? row.nameZh : row.nameEn}
                    </td>
                    <td class="primitive-table-cell">
                      <span
                        class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-inset px-2 text-[11.5px] font-medium shadow-hairline transition-opacity duration-400"
                        style="opacity: ${out ? 0.55 : 1};"
                      >
                        <span class="size-1.5 rounded-full ${dotClass}"></span>
                        <span class="text-ink-2">${zh ? row.deptZh : row.deptEn}</span>
                      </span>
                    </td>
                    <td
                      class="primitive-table-cell text-[12.5px] whitespace-nowrap transition-colors duration-400"
                      style="${
                        out
                          ? "color: var(--red); text-decoration-line: line-through; text-decoration-color: color-mix(in srgb, var(--red) 50%, transparent);"
                          : "color: var(--ink-2); text-decoration-line: none;"
                      }"
                    >
                      ${row.email}
                    </td>
                  </tr>
                `;
              }).join("")}
              <!-- added row -->
              <tr>
                <td colspan="3" class="p-0">
                  <div
                    class="grid transition-[grid-template-rows,opacity] duration-400"
                    style="grid-template-rows: ${added ? "1fr" : "0fr"}; opacity: ${
      added ? 1 : 0
    }; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                  >
                    <div class="overflow-hidden" style="background: var(--green-tint);">
                      <div class="grid grid-cols-[34%_30%_36%] items-center border-t border-line">
                        <span class="primitive-table-cell text-[13px] font-medium text-green tabular-nums">
                          ${zh ? "开心果" : "Pistachio"}
                        </span>
                        <span class="primitive-table-cell">
                          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-surface px-2 text-[11.5px] font-medium shadow-hairline">
                            <span class="size-1.5 rounded-full bg-green"></span>
                            <span class="text-ink-2">${zh ? "季节限定" : "Seasonal"}</span>
                          </span>
                        </span>
                        <span class="primitive-table-cell text-[13px] text-green">
                          maple-orbit
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-diff-table")) {
  customElements.define("nai-diff-table", NaiDiffTable);
}
