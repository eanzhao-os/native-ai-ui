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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 288px;
          min-height: 248px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          overflow: hidden;
        }

        .input-row {
          display: flex;
          height: 40px;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 0 12px;
        }

        .search-icon {
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
          display: flex;
        }

        .search-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 13px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .btn-clear {
          display: flex;
          width: 22px;
          height: 22px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }

        .btn-clear:hover {
          background: color-mix(in srgb, var(--line, #ecedef) 70%, transparent);
          color: var(--ink, #1f2124);
        }

        .results-list {
          padding: 4px;
        }

        .result-item {
          display: flex;
          height: 32px;
          width: 100%;
          align-items: center;
          border-radius: 6px;
          border: none;
          background: transparent;
          padding: 0 8px;
          text-align: left;
          font-size: 13px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.1s;
        }

        .result-item:hover {
          background: var(--hover, #f4f5f6);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 32px 16px;
          text-align: center;
        }

        .empty-icon {
          display: flex;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          color: var(--ink-3, #9a9da3);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-bottom: 6px;
        }

        .empty-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .empty-sub {
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="card">
        <div class="input-row">
          <span class="search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>

          <input
            id="search-input"
            class="search-input"
            placeholder="${zh ? "搜索风味…" : "Search flavors…"}"
            aria-label="${zh ? "搜索风味" : "Search flavors"}"
            value="${query}"
          />

          ${
            query
              ? `
            <button type="button" class="btn-clear" id="btn-clear" aria-label="${zh ? "清除搜索" : "Clear search"}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
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
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <span class="empty-title">${zh ? "未找到相关结果" : "No results found"}</span>
            <span class="empty-sub">${zh ? "换个关键词再试一次" : "Adjust your search to try again"}</span>
          </div>
        `
            : `
          <div class="results-list">
            ${results
              .map(
                (item) => `
              <button type="button" class="result-item" data-text="${labelOf(item)}">
                ${labelOf(item)}
              </button>
            `
              )
              .join("")}
          </div>
        `
        }
      </div>
    `;

    const input = this.shadowRoot.querySelector("#search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        this._query = e.target.value;
        this.render();
        const nextInput = this.shadowRoot.querySelector("#search-input");
        if (nextInput) {
          nextInput.focus();
          nextInput.selectionStart = nextInput.selectionEnd = this._query.length;
        }
      });
    }

    this.shadowRoot.querySelector("#btn-clear")?.addEventListener("click", () => {
      this.setQuery("");
    });

    this.shadowRoot.querySelectorAll(".result-item").forEach((btn) => {
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
