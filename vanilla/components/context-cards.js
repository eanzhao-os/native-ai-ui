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
        tone: "bg-red",
      },
      {
        title: zh ? "季节性需求走势" : "Seasonal demand row",
        chars: zh ? "1,250 字符" : "1,250 characters",
        body: zh
          ? "第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。"
          : "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
        source: "Sales Velocity Export.csv",
        badge: "CSV",
        tone: "bg-green",
      },
    ];

    const html = `
      <div class="flex w-full max-w-95 flex-col gap-2">
        <div
          class="flex items-center gap-2 px-0.5"
          style="animation: fade-in 400ms ease-out both;"
        >
          <span class="text-[13px] font-semibold text-ink">
            ${zh ? "检索知识分块" : "All chunks"}
          </span>
          <span class="count-chip inline-flex h-5 items-center rounded-md bg-inset px-1.5 text-[11.5px] font-medium text-ink-2 shadow-hairline tabular-nums">32</span>
        </div>

        ${chunks
          .map(
            (chunk, i) => `
          <div
            class="card overflow-hidden rounded-card bg-surface shadow-card"
            style="animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${i * 100}ms both;"
          >
            <div class="primitive-card-bar flex items-center gap-2.5 border-b border-line">
              <span class="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-ink">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                <span class="truncate">${chunk.title}</span>
              </span>
              <span class="ml-auto shrink-0 text-[12px] text-ink-3 tabular-nums">${chunk.chars}</span>
            </div>
            <p class="px-3 pt-2 pb-1 text-[12.5px] leading-relaxed text-ink-2">
              ${chunk.body}
            </p>
            <div class="px-3 pb-3">
              <span
                class="inline-flex h-6 items-center gap-1.5 rounded-full bg-inset px-2
                  text-[12px] font-medium text-ink-2 shadow-btn
                  transition-[opacity,transform,background-color] duration-300 hover:bg-hover cursor-pointer"
                style="
                  opacity: ${chipsShown ? 1 : 0};
                  transform: ${chipsShown ? "scale(1)" : "scale(0.95)"};
                  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
                  transition-delay: ${i * 80}ms;
                "
              >
                <span class="flex size-3.5 items-center justify-center rounded-[4px] ${chunk.tone} text-[7px] font-bold text-white">
                  ${chunk.badge}
                </span>
                ${chunk.source}
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

    this.setHtml(html);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-context-cards")) {
  customElements.define("nai-context-cards", NaiContextCards);
}
