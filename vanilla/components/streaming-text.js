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

const ACTION_ICONS = [
  '<g><rect x="9" y="9" width="12" height="12" rx="2.5"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></g>',
  '<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"></path>',
  '<path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z"></path>',
  '<path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z"></path>',
];

function sourceChip() {
  const source = SOURCES[0];
  return `<a href="${source.href}" target="_blank" rel="noreferrer" class="ml-0 mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-inset pr-[3px] pl-[3px] align-middle font-mono text-[10.5px] text-ink-2 shadow-hairline transition-colors duration-150 hover:bg-hover hover:text-ink" style="animation:pop-in 250ms cubic-bezier(0.23,1,0.32,1) both"><img src="${source.image}" alt="" class="source-avatar size-3 rounded-[3px]"><span>${source.domain}</span></a>`;
}

export class NaiStreamingText extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._count = 0;
    this._sourcesOpen = false;
    this._tickTimer = null;
    this._renderedLang = null;
    this._renderedCount = 0;
  }

  onMount() {
    this._count = 0;
    this._scheduleTick();
  }

  onUnmount() {
    this._clearTick();
  }

  onAttributeChange(name) {
    if (name !== "lang") return;
    this._count = 0;
    this._clearTick();
    this._scheduleTick();
  }

  _tokens() {
    return this.isZh ? TOKENS_ZH : TOKENS_EN;
  }

  _clearTick() {
    if (this._tickTimer === null) return;
    window.clearTimeout(this._tickTimer);
    this._tickTimer = null;
  }

  _scheduleTick() {
    this._clearTick();
    const tokens = this._tokens();
    const done = this._count >= tokens.length;
    this._tickTimer = this.registerTimeout(() => {
      this._tickTimer = null;
      this._count = this._count >= this._tokens().length ? 0 : this._count + 1;
      queueMicrotask(() => {
        if (!this._mounted) return;
        this.render();
        this._scheduleTick();
      });
    }, done ? HOLD_MS : WORD_MS);
  }

  _renderShell() {
    const zh = this.isZh;
    const followUps = zh ? FOLLOW_UPS_ZH : FOLLOW_UPS_EN;
    this.setHtml(
      `<div class="min-h-[15.5rem] w-full max-w-95"><p class="content text-[13px] leading-relaxed text-ink"></p><div class="mt-2 flex items-center gap-0.5 transition-opacity duration-400" style="opacity:0;pointer-events:none">${ACTION_ICONS.map(
        (icon) => `<button type="button" aria-label="Action" class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover-2 hover:text-ink-2 cursor-pointer"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></button>`,
      ).join("")}<button type="button" aria-expanded="${this._sourcesOpen}" class="sources-btn ml-1.5 flex items-center gap-1.5 rounded-[6px] px-1 py-0.5 text-left transition-colors duration-150 hover:bg-hover cursor-pointer"><span class="flex -space-x-1">${SOURCES.map(
        (source) => `<img src="${source.image}" alt="" class="source-avatar size-3.5 rounded-full bg-surface shadow-[0_0_0_1.5px_var(--canvas)]">`,
      ).join("")}</span><span class="text-[12px] text-ink-2">${zh ? "10 处引用源" : "10 sources"}</span></button></div><div class="grid transition-[grid-template-rows,opacity] duration-300" style="grid-template-rows:0fr;opacity:0;transition-timing-function:cubic-bezier(0.23, 1, 0.32, 1)"><div class="overflow-hidden"><div class="mt-1.5 flex flex-col rounded-card bg-inset p-1 shadow-hairline">${SOURCES.map(
        (source) => `<a href="${source.href}" target="_blank" rel="noreferrer" class="flex items-center gap-2 rounded-[6px] px-1.5 py-1 text-[12px] text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink"><img src="${source.image}" alt="" class="source-avatar size-4 rounded-[4px]"><span class="animated-underline">${source.name}</span><span class="ml-auto font-mono text-[10.5px] text-ink-3">${source.domain}</span></a>`,
      ).join("")}</div></div></div><div class="mt-2.5 transition-opacity duration-400" style="opacity:0;pointer-events:none"><p class="text-[12px] font-medium text-ink-2">${zh ? "猜您想问" : "Follow-ups"}</p><div class="mt-0.5 flex flex-col">${followUps.map(
        (text) => `<button class="-mx-1.5 flex items-center gap-2 rounded-[7px] border-b border-line px-1.5 py-1.5 text-left text-[12.5px] text-ink transition-colors duration-100 hover:bg-hover-2 cursor-pointer" style="opacity:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M9 10l-5 5 5 5"></path><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>${text}</button>`,
      ).join("")}</div></div></div>`,
      ":host{display:block;width:100%}",
    );

    const root = this.shadowRoot?.querySelector(".min-h-\\[15\\.5rem\\]");
    this._paragraph = root?.children[0] ?? null;
    this._actions = root?.children[1] ?? null;
    this._sourcesButton = this._actions?.querySelector(".sources-btn") ?? null;
    this._drawer = root?.children[2] ?? null;
    this._followUps = root?.children[3] ?? null;
    this._renderedLang = this.currentLang;
    this._renderedCount = 0;

    this._sourcesButton?.addEventListener("click", () => {
      this._sourcesOpen = !this._sourcesOpen;
      this._syncVisibility();
    });
  }

  _appendToken(token, zh) {
    const template = document.createElement("template");
    template.innerHTML = token.cite
      ? sourceChip()
      : `<span class="inline [will-change:filter,opacity]" style="animation:stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both">${token.text}${zh ? "" : " "}</span>`;
    this._paragraph?.append(template.content);
  }

  _syncVisibility() {
    const tokens = this._tokens();
    const done = this._count >= tokens.length;
    if (this._actions) {
      this._actions.style.opacity = done ? "1" : "0";
      this._actions.style.pointerEvents = done ? "auto" : "none";
    }
    if (this._sourcesButton) {
      this._sourcesButton.setAttribute("aria-expanded", String(this._sourcesOpen));
    }
    if (this._drawer) {
      this._drawer.style.gridTemplateRows = done && this._sourcesOpen ? "1fr" : "0fr";
      this._drawer.style.opacity = done && this._sourcesOpen ? "1" : "0";
    }
    if (this._followUps) {
      this._followUps.style.opacity = done ? "1" : "0";
      this._followUps.style.pointerEvents = done ? "auto" : "none";
      this._followUps.querySelectorAll("button").forEach((button, index) => {
        button.style.animation = done
          ? `fade-up 350ms cubic-bezier(0.23,1,0.32,1) ${index * 90}ms both`
          : "";
        button.style.opacity = done ? "" : "0";
      });
    }
  }

  _syncStream() {
    if (!this._paragraph) return;
    const zh = this.isZh;
    const tokens = zh ? TOKENS_ZH : TOKENS_EN;
    const targetCount = Math.min(this._count, tokens.length);
    if (targetCount < this._renderedCount) {
      this._paragraph.replaceChildren();
      this._renderedCount = 0;
    }

    this._paragraph.querySelector("[data-stream-caret]")?.remove();
    while (this._renderedCount < targetCount) {
      this._appendToken(tokens[this._renderedCount], zh);
      this._renderedCount += 1;
    }
    if (this._count < tokens.length) {
      const template = document.createElement("template");
      template.innerHTML = '<span data-stream-caret class="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-ink" style="animation:fade-in 150ms ease-out both"></span>';
      this._paragraph.append(template.content);
    }
    this._syncVisibility();
  }

  render() {
    if (
      this._renderedLang !== this.currentLang ||
      !this._paragraph?.isConnected
    ) {
      this._renderShell();
    }
    this._syncStream();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-streaming-text")) {
  customElements.define("nai-streaming-text", NaiStreamingText);
}
