import { NaiBaseElement } from "../core/base-element.js";

const WORD_MS = 55;
const HOLD_MS = 3400;

const TOKENS_EN = [
  ..."Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points."
    .split(" ")
    .map((text) => ({ text })),
  { text: "", cite: true },
  ..."Stone-fruit flavors are trending in the same range."
    .split(" ")
    .map((text) => ({ text })),
];

const TOKENS_ZH = [
  ..."开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。"
    .split("")
    .map((text) => ({ text })),
  { text: "", cite: true },
  ..."同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。"
    .split("")
    .map((text) => ({ text })),
];

const FOLLOW_UPS_EN = [
  "Which flavors sell best in winter",
  "Compare gelato and soft serve margins",
];

const FOLLOW_UPS_ZH = [
  "冬季哪些冰淇淋风味销量最高？",
  "对比意式硬冰与软冰淇淋的利润率",
];

const SOURCE_IMAGES = {
  scoop:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M20 36c0 7 5.4 12 12 12s12-5 12-12H20Z' fill='%23fff'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23bff3dd'/%3E%3Cpath d='M24 24c4-7 13-7 17 0' fill='none' stroke='%231f7a5f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
  trends:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232f6fec'/%3E%3Cpath d='M15 43 27 31l8 7 14-18' fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='49' cy='20' r='5' fill='%23bfe0ff'/%3E%3C/svg%3E",
  market:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23e56d24'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3Cpath d='M16 49h32' stroke='%23ffd6b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
};

const SOURCES = [
  { name: "Scoop Data", domain: "scoopdata.io", href: "https://scoopdata.io/", image: SOURCE_IMAGES.scoop },
  { name: "Trends Index", domain: "trends.google.com", href: "https://trends.google.com/trends/", image: SOURCE_IMAGES.trends },
  { name: "Market Basket", domain: "marketbasket.io", href: "https://marketbasket.io/", image: SOURCE_IMAGES.market },
];

export class NaiStreamingText extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._count = 0;
    this._sourcesOpen = false;
    this._copied = false;
  }

  onMount() {
    this._count = 0;
    this._tick();
  }

  _tick() {
    const zh = this.isZh;
    const TOKENS = zh ? TOKENS_ZH : TOKENS_EN;
    const done = this._count >= TOKENS.length;

    this.registerTimeout(() => {
      this._count = this._count >= TOKENS.length ? 0 : this._count + 1;
      this.render();
      this._tick();
    }, done ? HOLD_MS : WORD_MS);
  }

  render() {
    const zh = this.isZh;
    const TOKENS = zh ? TOKENS_ZH : TOKENS_EN;
    const FOLLOW_UPS = zh ? FOLLOW_UPS_ZH : FOLLOW_UPS_EN;
    const done = this._count >= TOKENS.length;

    this.setHtml(`
      <div class="min-h-[15.5rem] w-full max-w-95">
        <p class="content text-[13px] leading-relaxed text-ink">
          ${TOKENS.slice(0, this._count)
            .map((token) =>
              token.cite
                ? `
              <a
                href="${SOURCES[0].href}"
                target="_blank"
                rel="noreferrer"
                class="ml-0 mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-inset pr-[3px] pl-[3px] align-middle font-mono text-[10.5px] text-ink-2 shadow-xs transition-colors duration-150 hover:bg-hover hover:text-ink"
                style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
              >
                <img src="${SOURCES[0].image}" alt="" class="size-3 rounded-[3px]" />
                <span>${SOURCES[0].domain}</span>
              </a>
            `
                : `
              <span class="inline" style="animation: stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both;">
                ${token.text}${zh ? "" : " "}
              </span>
            `
            )
            .join("")}
          ${
            !done
              ? `<span class="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-ink" style="animation: fade-in 150ms ease-out both;"></span>`
              : ""
          }
        </p>

        {/* Action icons row */}
        <div
          class="mt-2 flex items-center gap-0.5 transition-opacity duration-400"
          style="opacity: ${done ? 1 : 0}; pointer-events: ${done ? "auto" : "none"};"
        >
          <button
            type="button"
            class="copy-btn flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${zh ? "复制" : "Copy"}"
          >
            ${
              this._copied
                ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>`
                : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>`
            }
          </button>
          <button
            type="button"
            class="retry-btn flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${zh ? "重新生成" : "Retry"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
          </button>
          <button
            type="button"
            class="flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${zh ? "赞" : "Thumbs up"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
            </svg>
          </button>
          <button
            type="button"
            class="flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${zh ? "踩" : "Thumbs down"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />
            </svg>
          </button>
        </div>

        {/* Follow ups */}
        <div
          class="mt-3 flex flex-col gap-1.5 transition-opacity duration-500"
          style="opacity: ${done ? 1 : 0}; pointer-events: ${done ? "auto" : "none"};"
        >
          <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            ${zh ? "后续建议" : "Suggested follow-ups"}
          </span>
          <div class="flex flex-wrap gap-1.5">
            ${FOLLOW_UPS.map(
              (f) => `
              <button
                type="button"
                class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11.5px] text-ink shadow-xs transition-colors duration-150 hover:bg-hover cursor-pointer"
              >
                ${f}
              </button>
            `
            ).join("")}
          </div>
        </div>
      </div>
    `);

    // Wire up events
    this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click", () => {
      this._copied = true;
      this.render();
      this.registerTimeout(() => {
        this._copied = false;
        this.render();
      }, 1600);
    });

    this.shadowRoot?.querySelector(".retry-btn")?.addEventListener("click", () => {
      this._count = 0;
      this.render();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-streaming-text")) {
  customElements.define("nai-streaming-text", NaiStreamingText);
}
