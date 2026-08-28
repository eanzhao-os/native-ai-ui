import { NaiBaseElement } from "../core/base-element.js";

const STRENGTH = {
  strong: { labelEn: "Very strong", labelZh: "非常强", color: "var(--green)", rank: 3 },
  weak: { labelEn: "Weak", labelZh: "较弱", color: "var(--orange)", rank: 2 },
  veryweak: { labelEn: "Very weak", labelZh: "非常弱", color: "var(--red)", rank: 1 },
  none: { labelEn: "No communication", labelZh: "无沟通", color: "var(--ink-3)", rank: 0 },
};

const TAG_COLORS = {
  B2B: "#f09a2f",
  B2C: "#92b72d",
  Cafe: "#ee6572",
  Catering: "#c84f9d",
  "Dairy-free": "#16a6c7",
  Gelato: "#9a5cff",
  Imports: "#3f78ff",
  Local: "#25a878",
  Seasonal: "#f09a2f",
  Sorbet: "#16a6c7",
  Vegan: "#92b72d",
  Wholesale: "#3f78ff",
};

const INITIAL_ROWS = [
  { id: "aurora", name: "Aurora Scoops — Reykjavík", tags: ["Gelato", "Seasonal"], lastEn: "9 days ago", lastZh: "9 天前", strength: "strong", website: "aurora-scoops.example.com" },
  { id: "kumo", name: "Kumo Creamery — Tokyo", tags: ["B2C", "Cafe", "Vegan"], lastEn: "3 weeks ago", lastZh: "3 周前", strength: "strong", website: "kumo-creamery.example.com" },
  { id: "sol-nieve", name: "Sol y Nieve — Buenos Aires", tags: ["Gelato", "Local"], lastEn: "2 months ago", lastZh: "2 个月前", strength: "weak", website: "sol-y-nieve.example.com" },
  { id: "maple-orbit", name: "Maple Orbit — Montréal", tags: ["B2B", "Wholesale", "Seasonal"], lastEn: "15 days ago", lastZh: "15 天前", strength: "weak", website: "maple-orbit.example.com" },
  { id: "blue-fig", name: "Blue Fig Gelato — Florence", tags: ["Gelato", "Cafe"], lastEn: "over 1 year ago", lastZh: "1 年多前", strength: "veryweak", website: "blue-fig.example.com" },
  { id: "sahara-swirl", name: "Sahara Swirl — Marrakech", tags: ["Sorbet", "Local"], lastEn: "5 months ago", lastZh: "5 个月前", strength: "veryweak" },
  { id: "cloudberry", name: "Cloudberry Cone — Helsinki", tags: ["Dairy-free", "Seasonal"], lastEn: "No contact", lastZh: "未联系", strength: "none", website: "cloudberry-cone.example.com" },
  { id: "palm-sugar", name: "Palm Sugar Creamery — Bangkok", tags: ["B2C", "Vegan"], lastEn: "3 months ago", lastZh: "3 个月前", strength: "veryweak", website: "palm-sugar.example.com" },
  { id: "cape-vanilla", name: "Cape Vanilla Co. — Cape Town", tags: ["Wholesale", "Imports"], lastEn: "over 1 year ago", lastZh: "1 年多前", strength: "veryweak", website: "cape-vanilla.example.com" },
  { id: "andes-snow", name: "Andes Snow Creamery — Quito", tags: ["Gelato", "Catering"], lastEn: "almost 2 years ago", lastZh: "近 2 年前", strength: "veryweak" },
  { id: "tasman-sea", name: "Tasman Sea Gelato — Hobart", tags: ["Gelato", "Local"], lastEn: "2 months ago", lastZh: "2 个月前", strength: "weak", website: "tasman-sea.example.com" },
  { id: "silk-road", name: "Silk Road Sorbet — Tbilisi", tags: ["Sorbet", "Imports"], lastEn: "about 1 month ago", lastZh: "约 1 个月前", strength: "weak", website: "silk-road.example.com" },
  { id: "rosewater", name: "Rosewater Kulfi — Jaipur", tags: ["B2C", "Seasonal"], lastEn: "2 months ago", lastZh: "2 个月前", strength: "veryweak" },
  { id: "lumen", name: "Lumen Soft Serve — Copenhagen", tags: ["Dairy-free", "Cafe"], lastEn: "8 months ago", lastZh: "8 个月前", strength: "weak", website: "lumen-soft-serve.example.com" },
  { id: "cacao-norte", name: "Cacao Norte — Oaxaca", tags: ["B2B", "Local", "Wholesale"], lastEn: "about 2 years ago", lastZh: "约 2 年前", strength: "none", website: "cacao-norte.example.com" },
  { id: "pine-pistachio", name: "Pine & Pistachio — Istanbul", tags: ["Gelato", "Catering"], lastEn: "about 1 month ago", lastZh: "约 1 个月前", strength: "veryweak" },
  { id: "ember-cone", name: "Ember Cone Company — Seoul", tags: ["B2C", "Vegan"], lastEn: "15 days ago", lastZh: "15 天前", strength: "weak", website: "ember-cone.example.com" },
  { id: "coral-coast", name: "Coral Coast Sorbet — Honolulu", tags: ["Sorbet", "Local"], lastEn: "9 days ago", lastZh: "9 天前", strength: "strong", website: "coral-coast.example.com" },
  { id: "sunbird", name: "Sunbird Gelateria — Lisbon", tags: ["Gelato", "Cafe"], lastEn: "over 2 years ago", lastZh: "2 年多前", strength: "none", website: "sunbird.example.com" },
  { id: "mooncake", name: "Mooncake Ice Cream — Singapore", tags: ["B2B", "Wholesale"], lastEn: "about 1 month ago", lastZh: "约 1 个月前", strength: "veryweak", website: "mooncake-ice-cream.example.com" },
  { id: "juniper", name: "Juniper & Cream — Vancouver", tags: ["Dairy-free", "Catering"], lastEn: "No contact", lastZh: "未联系", strength: "none" },
  { id: "mango-moon", name: "Mango Moon Gelato — Nairobi", tags: ["Sorbet", "Vegan"], lastEn: "almost 2 years ago", lastZh: "近 2 年前", strength: "veryweak", website: "mango-moon.example.com" },
  { id: "fjord-fizz", name: "Fjord Fizz Ice — Oslo", tags: ["Dairy-free", "Seasonal"], lastEn: "No contact", lastZh: "未联系", strength: "none" },
  { id: "pampa", name: "Pampa Creamery — Córdoba", tags: ["B2C", "Local"], lastEn: "12 months ago", lastZh: "12 个月前", strength: "veryweak", website: "pampa-creamery.example.com" },
  { id: "lotus-leaf", name: "Lotus Leaf Scoops — Hanoi", tags: ["Vegan", "Cafe"], lastEn: "15 days ago", lastZh: "15 天前", strength: "weak" },
  { id: "saffron-sky", name: "Saffron Sky Kulfi — Dubai", tags: ["Imports", "Catering"], lastEn: "almost 2 years ago", lastZh: "近 2 年前", strength: "veryweak", website: "saffron-sky.example.com" },
];

export class NaiRecordsTable extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._selected = new Set();
    this._sort = { key: "name", dir: 1 };
  }

  toggleSort(key) {
    if (this._sort.key === key) {
      this._sort.dir = this._sort.dir === 1 ? -1 : 1;
    } else {
      this._sort = { key, dir: 1 };
    }
    this.render();
  }

  toggleRow(id) {
    if (this._selected.has(id)) {
      this._selected.delete(id);
    } else {
      this._selected.add(id);
    }
    this.render();
  }

  toggleAll(allSelected, visibleRows) {
    if (allSelected) {
      visibleRows.forEach((r) => this._selected.delete(r.id));
    } else {
      visibleRows.forEach((r) => this._selected.add(r.id));
    }
    this.render();
  }

  render() {
    const zh = this.isZh;
    const rows = INITIAL_ROWS;
    const sort = this._sort;

    const visibleRows = [...rows].sort((a, b) => {
      const value =
        sort.key === "name"
          ? a.name.localeCompare(b.name)
          : sort.key === "last"
          ? a.lastEn.localeCompare(b.lastEn)
          : STRENGTH[a.strength].rank - STRENGTH[b.strength].rank;
      return value * sort.dir;
    });

    const allSelected = visibleRows.length > 0 && visibleRows.every((r) => this._selected.has(r.id));
    const partiallySelected = !allSelected && visibleRows.some((r) => this._selected.has(r.id));
    const averagePct = Math.round(
      (rows.reduce((sum, row) => sum + STRENGTH[row.strength].rank, 0) / rows.length / 3) * 100
    );

    this.setHtml(`
      <div class="records-shell">
        <div class="records-scroll" tabindex="0" aria-label="${
          zh
            ? "公司表格。横向与纵向滚动以查看所有列与记录。"
            : "Companies table. Scroll horizontally and vertically to view all columns and records."
        }">
          <table class="records-table">
            <colgroup>
              <col class="records-company-col" />
              <col class="records-category-col" />
              <col class="records-last-col" />
              <col class="records-strength-col" />
              <col class="records-link-col" />
            </colgroup>
            <thead>
              <tr>
                <th class="records-header-cell records-sticky-cell">
                  <div class="records-company-header">
                    <label class="records-checkbox" title="${zh ? "全选公司" : "Select all companies"}">
                      <input type="checkbox" id="check-all-input" ${allSelected ? "checked" : ""} aria-label="${
      zh ? "全选公司" : "Select all companies"
    }" />
                      <span class="records-checkbox-box ${allSelected || partiallySelected ? "is-active" : ""}">
                        ${
                          partiallySelected
                            ? '<span class="records-checkbox-dash"></span>'
                            : allSelected
                            ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>'
                            : ""
                        }
                      </span>
                    </label>
                    <span>${zh ? "公司" : "Company"}</span>
                  </div>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-categories">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01" />
                      </svg>
                    </span>
                    <span class="truncate">${zh ? "分类" : "Categories"}</span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-last">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6" />
                      </svg>
                    </span>
                    <span class="truncate">${zh ? "最近互动" : "Last interaction"}</span>
                    <span class="records-sort ${sort.key === "last" ? "is-visible" : ""}" style="${
      sort.key === "last" && sort.dir === -1 ? "transform: rotate(180deg);" : ""
    }">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-strength">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z" />
                      </svg>
                    </span>
                    <span class="truncate">${zh ? "联系强度" : "Connection strength"}</span>
                    <span class="records-sort ${sort.key === "strength" ? "is-visible" : ""}" style="${
      sort.key === "strength" && sort.dir === -1 ? "transform: rotate(180deg);" : ""
    }">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-links">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
                      </svg>
                    </span>
                    <span class="truncate">${zh ? "链接" : "Links"}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              ${visibleRows
                .map((row) => {
                  const isSelected = this._selected.has(row.id);
                  const strength = STRENGTH[row.strength];
                  const websiteUrl = row.website ? `https://${row.website}` : "#";
                  return `
                    <tr class="records-row ${isSelected ? "is-selected" : ""}">
                      <td class="records-cell records-sticky-cell records-company-cell">
                        <label class="records-checkbox" title="${zh ? `选择 ${row.name}` : `Select ${row.name}`}">
                          <input type="checkbox" class="row-check row-checkbox" data-id="${row.id}" ${
                    isSelected ? "checked" : ""
                  } aria-label="${zh ? `选择 ${row.name}` : `Select ${row.name}`}" />
                          <span class="records-checkbox-box ${isSelected ? "is-active" : ""}">
                            ${
                              isSelected
                                ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>'
                                : ""
                            }
                          </span>
                        </label>
                        <span class="records-company-mark">${row.name.slice(0, 1).toUpperCase()}</span>
                        <a href="${websiteUrl}" class="records-company-name ${row.website ? "has-link" : ""}" ${
                    !row.website ? 'onclick="event.preventDefault()"' : ""
                  }>
                          ${row.name}
                        </a>
                      </td>
                      <td class="records-cell">
                        <div class="records-tags">
                          ${row.tags
                            .slice(0, 4)
                            .map((tag) => {
                              const color = TAG_COLORS[tag] || "#7f858d";
                              return `
                                <span class="records-tag" style="--tag-color: ${color};">
                                  <span class="records-tag-dot" style="background: ${color};"></span>
                                  ${tag}
                                </span>
                              `;
                            })
                            .join("")}
                          ${row.tags.length > 4 ? `<span class="records-more-tag">+${row.tags.length - 4}</span>` : ""}
                        </div>
                      </td>
                      <td class="records-cell ${row.lastEn === "No contact" ? "records-muted" : ""}">
                        ${zh ? row.lastZh : row.lastEn}
                      </td>
                      <td class="records-cell">
                        <span class="records-strength">
                          <span class="records-strength-dot" style="background: ${strength.color};"></span>
                          ${zh ? strength.labelZh : strength.labelEn}
                        </span>
                      </td>
                      <td class="records-cell">
                        ${
                          row.website
                            ? `<a class="records-link" href="https://${row.website}" target="_blank" rel="noreferrer">
                                ${row.website}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                  <path d="M14 5h5v5M19 5l-8 8" />
                                </svg>
                              </a>`
                            : '<span class="records-muted">—</span>'
                        }
                      </td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
            <tfoot>
              <tr class="records-calculation-row">
                <td class="records-cell records-sticky-cell records-calculation-label">
                  <span class="records-calculation-number">${rows.length}</span> ${zh ? "条记录" : "count"}
                </td>
                <td class="records-cell">
                  <button type="button" class="records-add-calculation">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    ${zh ? "添加计算" : "Add calculation"}
                  </button>
                </td>
                <td class="records-cell records-muted">—</td>
                <td class="records-cell">
                  <span class="records-average">
                    <span class="records-strength-dot" style="background: var(--orange);"></span>
                    ${zh ? `平均 ${averagePct}%` : `${averagePct}% average`}
                  </span>
                </td>
                <td class="records-cell">
                  <span class="records-muted">${rows.filter((row) => row.website).length} ${zh ? "个链接" : "links"}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector("#check-all-input")?.addEventListener("change", () => {
      this.toggleAll(allSelected, visibleRows);
    });

    this.shadowRoot?.querySelectorAll(".row-checkbox").forEach((cb) => {
      cb.addEventListener("change", (e) => {
        const id = cb.getAttribute("data-id");
        if (id) this.toggleRow(id);
      });
    });

    this.shadowRoot?.querySelector("#sort-last")?.addEventListener("click", () => this.toggleSort("last"));
    this.shadowRoot?.querySelector("#btn-sort-strength")?.addEventListener("click", () => this.toggleSort("strength"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-records-table")) {
  customElements.define("nai-records-table", NaiRecordsTable);
}
