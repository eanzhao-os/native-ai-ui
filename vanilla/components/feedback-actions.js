import { NaiBaseElement } from "../core/base-element.js";

/* ─────────────────────────────────────────────────────────
 * FEEDBACK ACTIONS — per-message rating controls (vanilla
 * custom element). Ratings are exclusive and reversible;
 * copy success is reported only after a browser copy path
 * actually succeeds.
 * ───────────────────────────────────────────────────────── */

const MESSAGE_EN = "Pistachio churns fastest on weekends — schedule it first on Saturday mornings.";
const MESSAGE_ZH = "开心果口味在周末搅拌最快 —— 建议排在每周六清晨的首批。";
const STATUS_HOLD_MS = 1400;

function legacyCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return typeof document.execCommand === "function" && document.execCommand("copy") === true;
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export class NaiFeedbackActions extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "visual-case"];
  }

  constructor() {
    super();
    this._rating = null; // "up" | "down" | null
    this._copyStatus = "idle"; // idle | copied | copy-error
    this._copyOperationVersion = 0;
  }

  onMount() {
    const visualCase = this.getAttribute("visual-case");
    if (visualCase === "liked") this._rating = "up";
    else if (visualCase === "disliked") this._rating = "down";
    else if (visualCase === "copy-error") this._copyStatus = "copy-error";
  }

  onUnmount() {
    this._copyOperationVersion += 1;
  }

  _rate(next) {
    this._rating = this._rating === next ? null : next;
    this.render();
  }

  async _copy() {
    const text = this.isZh ? MESSAGE_ZH : MESSAGE_EN;
    const version = ++this._copyOperationVersion;
    const isCurrent = () =>
      this._mounted && this.isConnected && version === this._copyOperationVersion;
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        // A denied async clipboard attempt still gets the legacy fallback.
      }
    }
    if (!copied && isCurrent()) copied = legacyCopy(text);
    if (!isCurrent()) return;

    this._copyStatus = copied ? "copied" : "copy-error";
    this.render();
    this.registerTimeout(() => {
      if (!isCurrent()) return;
      this._copyStatus = "idle";
      this.render();
    }, STATUS_HOLD_MS);
  }

  render() {
    const zh = this.isZh;
    const rating = this._rating;
    const copyStatus = this._copyStatus;
    const hasStatus = rating !== null || copyStatus !== "idle";
    const readout =
      copyStatus === "copied"
        ? zh ? "已复制" : "Copied"
        : copyStatus === "copy-error"
          ? zh ? "复制失败" : "Copy failed"
          : rating === "up"
            ? zh ? "已标记为有用" : "Marked helpful"
            : rating === "down"
              ? zh ? "已标记为有问题" : "Marked unhelpful"
              : "";

    this.setHtml(`
      <div class="w-full max-w-95 rounded-card bg-surface p-4 shadow-card" style="transform: translateZ(0);">
        <p class="text-[13px] leading-relaxed text-ink">${zh ? MESSAGE_ZH : MESSAGE_EN}</p>
        <div class="mt-2 flex items-center gap-0.5" role="group" aria-label="${zh ? "消息操作" : "Message actions"}">
          <button type="button" class="copy-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${
            copyStatus === "copied"
              ? "text-green"
              : copyStatus === "copy-error"
                ? "text-red"
                : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"
          }" aria-label="${zh ? "复制回复" : "Copy response"}">
            ${copyStatus === "copied" ? `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            ` : `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            `}
          </button>
          <button type="button" class="up-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${rating === "up" ? "bg-accent-tint text-accent-ink" : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"}"
            aria-label="${zh ? "回答不错" : "Good response"}" aria-pressed="${rating === "up"}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" /></svg>
          </button>
          <button type="button" class="down-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${rating === "down" ? "bg-red-tint text-red" : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"}"
            aria-label="${zh ? "回答有问题" : "Bad response"}" aria-pressed="${rating === "down"}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" /></svg>
          </button>
          <span role="status" aria-live="polite"
            class="ml-1.5 text-[11px] transition-opacity duration-300 ${copyStatus === "copy-error" ? "text-red" : "text-ink-3"}"
            style="opacity: ${hasStatus ? 1 : 0};">${readout}</span>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click", () => this._copy());
    this.shadowRoot?.querySelector(".up-btn")?.addEventListener("click", () => this._rate("up"));
    this.shadowRoot?.querySelector(".down-btn")?.addEventListener("click", () => this._rate("down"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-feedback-actions")) {
  customElements.define("nai-feedback-actions", NaiFeedbackActions);
}
