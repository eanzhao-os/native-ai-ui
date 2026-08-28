import { NaiBaseElement } from "../core/base-element.js";

export class NaiContextCards extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "auto"];
  }

  constructor() {
    super();
    this._chipsShown = false;
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    if (!this.autoPlay) {
      this._chipsShown = true;
      return;
    }
    this.registerTimeout(() => {
      this._chipsShown = true;
      this.render();
    }, 700);
  }

  render() {
    const zh = this.isZh;
    const chipsShown = this._chipsShown;

    const chunks = [
      {
        title: zh ? "供应商准入规范" : "Vendor onboarding rule",
        chars: zh ? "290 字符" : "290 characters",
        body: zh
          ? "在将新乳制品供应商纳入自动补货工作流之前，必须首先验证其冷链资质认证与卫生许可。"
          : "Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",
        source: "Dairy Onboarding SOP.pdf",
        badge: "PDF",
        badgeBg: "var(--red, #e3474c)",
      },
      {
        title: zh ? "季节性需求走势" : "Seasonal demand row",
        chars: zh ? "1,250 字符" : "1,250 characters",
        body: zh
          ? "第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。"
          : "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
        source: "Sales Velocity Export.csv",
        badge: "CSV",
        badgeBg: "var(--green, #189a4d)",
      },
    ];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          display: flex;
          width: 100%;
          flex-direction: column;
          gap: 8px;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 2px;
          animation: fade-in 400ms ease-out both;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .count-chip {
          display: inline-flex;
          height: 20px;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          background: var(--inset, #f7f8f9);
          padding: 0 6px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          font-variant-numeric: tabular-nums;
        }
        .card {
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          border: 1px solid var(--line, #ecedef);
        }
        .card-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 10px 12px;
          background: var(--surface, #fff);
        }
        .card-title-wrap {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .card-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-chars {
          margin-left: auto;
          flex-shrink: 0;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }
        .card-body {
          padding: 8px 12px 4px 12px;
          margin: 0;
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }
        .card-footer {
          padding: 0 12px 12px 12px;
        }
        .source-chip {
          display: inline-flex;
          height: 24px;
          align-items: center;
          gap: 6px;
          border-radius: 99px;
          background: var(--inset, #f7f8f9);
          padding: 0 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong));
          cursor: pointer;
          transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                      background-color 0.12s;
        }
        .source-chip:hover {
          background-color: var(--hover, #f4f5f6);
        }
        .badge-kind {
          display: flex;
          width: 14px;
          height: 14px;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 7px;
          font-weight: 700;
          color: #fff;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        <div class="header">
          <span class="header-title">${zh ? "检索知识分块" : "All chunks"}</span>
          <span class="count-chip">32</span>
        </div>

        ${chunks
          .map(
            (chunk, i) => `
          <div
            class="card"
            style="animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${i * 100}ms both;"
          >
            <div class="card-bar">
              <span class="card-title-wrap">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                <span class="card-title">${chunk.title}</span>
              </span>
              <span class="card-chars">${chunk.chars}</span>
            </div>

            <p class="card-body">${chunk.body}</p>

            <div class="card-footer">
              <span
                class="source-chip"
                style="opacity: ${chipsShown ? 1 : 0}; transform: ${chipsShown ? "scale(1)" : "scale(0.95)"}; transition-delay: ${i * 80}ms;"
              >
                <span class="badge-kind" style="background-color: ${chunk.badgeBg};">
                  ${chunk.badge}
                </span>
                <span>${chunk.source}</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-context-cards")) {
  customElements.define("nai-context-cards", NaiContextCards);
}
