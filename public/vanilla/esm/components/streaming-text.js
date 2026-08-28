import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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

const SOURCES = [
  { name: "Scoop Data", domain: "scoopdata.io", href: "https://scoopdata.io/" },
  { name: "Trends Index", domain: "trends.google.com", href: "https://trends.google.com/trends/" },
  { name: "Market Basket", domain: "marketbasket.io", href: "https://marketbasket.io/" },
];

export class NaiStreamingText extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "auto"];
  }

  constructor() {
    super();
    this._count = 0;
    this._sourcesOpen = false;
    this._copied = false;
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    this._startStream();
  }

  _startStream() {
    this._count = 0;
    if (!this.autoPlay) {
      const tokens = this.isZh ? TOKENS_ZH : TOKENS_EN;
      this._count = tokens.length;
      this.render();
      return;
    }

    const streamLoop = () => {
      const tokens = this.isZh ? TOKENS_ZH : TOKENS_EN;
      if (this._count < tokens.length) {
        this._count++;
        this.render();
        this.registerTimeout(streamLoop, WORD_MS);
      } else {
        this.registerTimeout(() => {
          this._count = 0;
          this.render();
          streamLoop();
        }, HOLD_MS);
      }
    };

    this.registerTimeout(streamLoop, 300);
  }

  copyText() {
    const zh = this.isZh;
    const fullText = zh
      ? "开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。"
      : "Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points. Stone-fruit flavors are trending in the same range.";

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        this._copied = true;
        this.render();
        this.registerTimeout(() => {
          this._copied = false;
          this.render();
        }, 1800);
      });
    }
  }

  toggleSources() {
    this._sourcesOpen = !this._sourcesOpen;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const tokens = zh ? TOKENS_ZH : TOKENS_EN;
    const followUps = zh ? FOLLOW_UPS_ZH : FOLLOW_UPS_EN;
    const visibleTokens = tokens.slice(0, this._count);
    const isDone = this._count >= tokens.length;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 480px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .content {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .token {
          display: inline;
        }
        .space {
          display: inline;
        }
        .caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          vertical-align: text-bottom;
          background: var(--ink, #1f2124);
          margin-left: 2px;
          border-radius: 1px;
          animation: ${isDone ? "caret-blink 1s step-end infinite" : "none"};
        }
        .source-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 6px;
          margin: 0 4px;
          background: var(--inset, #f7f8f9);
          border: 1px solid var(--line, #ecedef);
          border-radius: 5px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-2, #62656b);
          text-decoration: none;
          vertical-align: baseline;
          transition: background-color 0.12s ease;
        }
        .source-chip:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
        }
        .btn-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .icon-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .copied-badge {
          font-size: 11px;
          color: var(--green, #189a4d);
          font-weight: 500;
          animation: fade-in 200ms ease;
        }
        .follow-ups {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .follow-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 99px;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background-color 0.15s;
        }
        .follow-pill:hover {
          border-color: var(--line-strong, #e0e2e5);
          color: var(--ink, #1f2124);
          background: var(--hover, #f4f5f6);
        }
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      </style>

      <div class="content">
        ${visibleTokens
          .map((tok, i) => {
            if (tok.cite) {
              return `<a href="${SOURCES[0].href}" target="_blank" rel="noreferrer" class="source-chip">${SOURCES[0].domain}</a>`;
            }
            return `<span class="token">${tok.text}</span>${zh ? "" : " "}`;
          })
          .join("")}
        <span class="caret"></span>
      </div>

      <div class="actions-bar">
        <div class="btn-group">
          <button type="button" class="icon-btn copy-btn" title="${zh ? "复制回答" : "Copy response"}">
            ${this._copied ? `<span class="copied-badge">✓</span>` : ICONS.copy}
          </button>
          <button type="button" class="icon-btn retry-btn" title="${zh ? "重新生成" : "Regenerate"}">
            ${ICONS.retry}
          </button>
          <button type="button" class="icon-btn thumb-up" title="${zh ? "有用" : "Helpful"}">
            ${ICONS.thumbsUp}
          </button>
          <button type="button" class="icon-btn thumb-down" title="${zh ? "不满意" : "Not helpful"}">
            ${ICONS.thumbsDown}
          </button>
        </div>
      </div>

      <div class="follow-ups">
        ${followUps
          .map(
            (item) => `
              <button type="button" class="follow-pill">
                <span>${item}</span>
                <span>→</span>
              </button>
            `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot.querySelector(".copy-btn")?.addEventListener("click", () => this.copyText());
    this.shadowRoot.querySelector(".retry-btn")?.addEventListener("click", () => this._startStream());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-streaming-text")) {
  customElements.define("nai-streaming-text", NaiStreamingText);
}
