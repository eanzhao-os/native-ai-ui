import { NaiBaseElement } from "../core/base-element.js";

const STRENGTH = {
  strong: { labelEn: "Very strong", labelZh: "非常强", color: "var(--green, #189a4d)", rank: 3 },
  weak: { labelEn: "Weak", labelZh: "较弱", color: "var(--orange, #ef720c)", rank: 2 },
  veryweak: { labelEn: "Very weak", labelZh: "非常弱", color: "var(--red, #e3474c)", rank: 1 },
  none: { labelEn: "No communication", labelZh: "无沟通", color: "var(--ink-3, #9a9da3)", rank: 0 },
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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .records-shell {
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
          overflow: hidden;
        }

        .records-scroll {
          overflow: auto;
          max-height: 480px;
          outline: none;
        }

        table.records-table {
          width: 100%;
          min-width: 760px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        col.records-company-col { width: 240px; }
        col.records-category-col { width: 220px; }
        col.records-last-col { width: 140px; }
        col.records-strength-col { width: 160px; }
        col.records-link-col { width: 180px; }

        th.records-header-cell {
          position: sticky;
          top: 0;
          z-index: 2;
          background: var(--inset, #f7f8f9);
          border-bottom: 1px solid var(--line, #ecedef);
          border-right: 1px solid var(--line, #ecedef);
          padding: 0;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        th.records-header-cell:last-child {
          border-right: none;
        }

        .records-sticky-cell {
          position: sticky;
          left: 0;
          z-index: 3;
          background: var(--surface, #fff);
        }

        th.records-sticky-cell {
          z-index: 4;
          background: var(--inset, #f7f8f9);
        }

        .records-header-button {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 500;
          color: inherit;
          cursor: pointer;
          text-align: left;
        }

        .records-header-button:hover {
          background: var(--hover, #f4f5f6);
        }

        .records-company-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
        }

        .records-sort-icon {
          display: inline-flex;
          margin-left: auto;
          color: var(--ink-3, #9a9da3);
          transition: transform 0.15s ease;
        }

        .records-row {
          transition: background-color 0.1s ease;
        }

        .records-row:hover td {
          background-color: var(--hover, #f4f5f6);
        }

        .records-row.is-selected td {
          background-color: var(--accent-tint, #e9f3ff);
        }

        td.records-cell {
          padding: 8px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          border-right: 1px solid var(--line, #ecedef);
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          background: var(--surface, #fff);
        }

        td.records-cell:last-child {
          border-right: none;
        }

        .records-company-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .records-company-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink-2, #62656b);
          flex-shrink: 0;
        }

        .records-company-name {
          font-weight: 500;
          color: var(--ink, #1f2124);
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .records-company-name.has-link:hover {
          color: var(--accent, #0285ff);
          text-decoration: underline;
        }

        .records-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }

        .records-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 6px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          background: var(--inset, #f7f8f9);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          color: var(--ink-2, #62656b);
        }

        .records-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .records-strength {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--ink-2, #62656b);
        }

        .records-strength-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .records-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--accent, #0285ff);
          text-decoration: none;
        }

        .records-link:hover {
          text-decoration: underline;
        }

        .records-muted {
          color: var(--ink-3, #9a9da3);
        }

        /* Checkbox styling */
        .records-checkbox {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .records-checkbox input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .records-checkbox-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          border-radius: 3.5px;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          transition: background-color 0.12s, border-color 0.12s;
        }

        .records-checkbox-box.is-active {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .records-checkbox-dash {
          width: 8px;
          height: 2px;
          background: #fff;
          border-radius: 1px;
        }

        /* Footer Calculation Row */
        tfoot tr.records-calculation-row td {
          position: sticky;
          bottom: 0;
          z-index: 2;
          background: var(--inset, #f7f8f9);
          border-top: 1px solid var(--line-strong, #e0e2e5);
          border-bottom: none;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
        }

        tfoot tr.records-calculation-row td.records-sticky-cell {
          z-index: 4;
          background: var(--inset, #f7f8f9);
        }

        .records-add-calculation {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: transparent;
          padding: 2px 6px;
          font-size: 11.5px;
          color: var(--accent, #0285ff);
          cursor: pointer;
          border-radius: var(--radius-chip, 6px);
        }

        .records-add-calculation:hover {
          background: var(--hover, #f4f5f6);
        }
      </style>

      <div class="records-shell">
        <div class="records-scroll" tabindex="0" aria-label="${zh ? "公司表格" : "Companies table"}">
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
                    <label class="records-checkbox" id="check-all-label">
                      <span class="records-checkbox-box ${allSelected || partiallySelected ? "is-active" : ""}">
                        ${
                          partiallySelected
                            ? '<span class="records-checkbox-dash"></span>'
                            : allSelected
                            ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>'
                            : ""
                        }
                      </span>
                    </label>
                    <button type="button" class="records-header-button" id="sort-name">
                      <span>${zh ? "公司" : "Company"}</span>
                      <span class="records-sort-icon" style="transform: ${sort.key === "name" && sort.dir === -1 ? "rotate(180deg)" : "none"}; opacity: ${sort.key === "name" ? 1 : 0.3}">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                      </span>
                    </button>
                  </div>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01"/></svg>
                    <span>${zh ? "分类" : "Categories"}</span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-last">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6"/></svg>
                    <span>${zh ? "最近互动" : "Last interaction"}</span>
                    <span class="records-sort-icon" style="transform: ${sort.key === "last" && sort.dir === -1 ? "rotate(180deg)" : "none"}; opacity: ${sort.key === "last" ? 1 : 0.3}">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-strength">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z"/></svg>
                    <span>${zh ? "联系强度" : "Connection strength"}</span>
                    <span class="records-sort-icon" style="transform: ${sort.key === "strength" && sort.dir === -1 ? "rotate(180deg)" : "none"}; opacity: ${sort.key === "strength" ? 1 : 0.3}">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>
                    <span>${zh ? "链接" : "Links"}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              ${visibleRows
                .map((row) => {
                  const isSelected = this._selected.has(row.id);
                  const strength = STRENGTH[row.strength];
                  return `
                    <tr class="records-row ${isSelected ? "is-selected" : ""}" data-row-id="${row.id}">
                      <td class="records-cell records-sticky-cell">
                        <div class="records-company-cell">
                          <label class="records-checkbox row-check" data-id="${row.id}">
                            <span class="records-checkbox-box ${isSelected ? "is-active" : ""}">
                              ${isSelected ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ""}
                            </span>
                          </label>
                          <span class="records-company-mark">${row.name.slice(0, 1).toUpperCase()}</span>
                          <a href="${row.website ? `https://${row.website}` : "#"}" target="_blank" rel="noreferrer" class="records-company-name ${row.website ? "has-link" : ""}">
                            ${row.name}
                          </a>
                        </div>
                      </td>
                      <td class="records-cell">
                        <div class="records-tags">
                          ${row.tags
                            .map((tag) => {
                              const color = TAG_COLORS[tag] || "#7f858d";
                              return `
                                <span class="records-tag">
                                  <span class="records-tag-dot" style="background: ${color}"></span>
                                  <span>${tag}</span>
                                </span>
                              `;
                            })
                            .join("")}
                        </div>
                      </td>
                      <td class="records-cell ${row.lastEn === "No contact" ? "records-muted" : ""}">
                        ${zh ? row.lastZh : row.lastEn}
                      </td>
                      <td class="records-cell">
                        <span class="records-strength">
                          <span class="records-strength-dot" style="background: ${strength.color}"></span>
                          <span>${zh ? strength.labelZh : strength.labelEn}</span>
                        </span>
                      </td>
                      <td class="records-cell">
                        ${
                          row.website
                            ? `<a class="records-link" href="https://${row.website}" target="_blank" rel="noreferrer">
                                <span>${row.website}</span>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 5h5v5M19 5l-8 8"/></svg>
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
                <td class="records-cell records-sticky-cell">
                  <strong>${rows.length}</strong> ${zh ? "条记录" : "count"}
                </td>
                <td class="records-cell">
                  <button type="button" class="records-add-calculation">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                    <span>${zh ? "添加计算" : "Add calculation"}</span>
                  </button>
                </td>
                <td class="records-cell records-muted">—</td>
                <td class="records-cell">
                  <span class="records-strength">
                    <span class="records-strength-dot" style="background: var(--orange, #ef720c)"></span>
                    <span>${zh ? `平均 ${averagePct}%` : `${averagePct}% average`}</span>
                  </span>
                </td>
                <td class="records-cell">
                  <span class="records-muted">${rows.filter((r) => r.website).length} ${zh ? "个链接" : "links"}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#check-all-label")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleAll(allSelected, visibleRows);
    });

    this.shadowRoot.querySelectorAll(".row-check").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = el.getAttribute("data-id");
        if (id) this.toggleRow(id);
      });
    });

    this.shadowRoot.querySelector("#sort-name")?.addEventListener("click", () => this.toggleSort("name"));
    this.shadowRoot.querySelector("#sort-last")?.addEventListener("click", () => this.toggleSort("last"));
    this.shadowRoot.querySelector("#sort-strength")?.addEventListener("click", () => this.toggleSort("strength"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-records-table")) {
  customElements.define("nai-records-table", NaiRecordsTable);
}
