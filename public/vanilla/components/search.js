import { NaiBaseElement } from "../core/base-element.js";

const ITEMS = [
  { en: "Forecast summer demand", zh: "预测夏季需求" },
  { en: "Find waffle cone suppliers", zh: "寻找华夫脆筒供应商" },
  { en: "Compare seasonal flavors", zh: "对比季节限定口味" },
  { en: "Draft flavor launch plan", zh: "起草新口味上市计划" },
  { en: "Check cold-chain status", zh: "检查冷链状态" },
  { en: "Audit sugar costs", zh: "核算糖原料成本" },
  { en: "Retire low sellers", zh: "下架滞销口味" },
];

export class NaiSearch extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._query = "";
  }

  setQuery(q) {
    this._query = q;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const query = this._query;
    const labelOf = (item) => (zh ? item.zh : item.en);

    const results = query
      ? ITEMS.filter((i) => labelOf(i).toLowerCase().includes(query.toLowerCase()))
      : ITEMS.slice(0, 5);

    const empty = query.length > 2 && results.length === 0;

    this.setHtml(`
      <div class="flex min-h-[248px] w-full max-w-72 flex-col items-stretch">
        <div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-raised">
          
          <div class="flex h-10 items-center gap-2 border-b border-line px-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" class="shrink-0" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              id="search-input"
              value="${query}"
              placeholder="${zh ? "搜索风味…" : "Search flavors…"}"
              aria-label="${zh ? "搜索风味" : "Search flavors"}"
              class="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
            />
            ${
              query
                ? `
              <button
                id="btn-clear"
                aria-label="${zh ? "清除搜索" : "Clear search"}"
                type="button"
                class="flex size-5.5 items-center justify-center rounded-full text-ink-3 transition-colors duration-100 hover:bg-line/70 hover:text-ink cursor-pointer"
                style="animation: fade-in 150ms ease-out both;"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            `
                : ""
            }
          </div>

          
          ${
            empty
              ? `
            <div class="flex flex-col items-center justify-center gap-1 px-4 py-8" style="animation: fade-in 250ms ease-out both;">
              <span class="mb-1.5 flex size-8 items-center justify-center rounded-control bg-inset text-ink-3 shadow-hairline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <span class="text-[13px] font-medium text-ink">${zh ? "未找到相关结果" : "No results found"}</span>
              <span class="text-[12px] text-ink-3">${zh ? "换个关键词再试一次" : "Adjust your search to try again"}</span>
            </div>
          `
              : `
            <div class="p-1">
              ${results
                .map(
                  (item) => `
                <button
                  key="${item.en}"
                  type="button"
                  data-text="${labelOf(item)}"
                  class="result-item flex h-8 w-full items-center rounded-[6px] px-2 text-left text-[13px] text-ink transition-colors duration-100 hover:bg-hover cursor-pointer"
                  style="animation: fade-in 200ms ease-out both;"
                >
                  ${labelOf(item)}
                </button>
              `
                )
                .join("")}
            </div>
          `
          }
        </div>
      </div>
    `);

    const input = this.shadowRoot?.querySelector("#search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        this._query = e.target.value;
        this.render();
        const nextInput = this.shadowRoot?.querySelector("#search-input");
        if (nextInput) {
          nextInput.focus();
          nextInput.selectionStart = nextInput.selectionEnd = this._query.length;
        }
      });
    }

    this.shadowRoot?.querySelector("#btn-clear")?.addEventListener("click", () => {
      this.setQuery("");
    });

    this.shadowRoot?.querySelectorAll(".result-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-text");
        if (text) this.setQuery(text);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-search")) {
  customElements.define("nai-search", NaiSearch);
}
