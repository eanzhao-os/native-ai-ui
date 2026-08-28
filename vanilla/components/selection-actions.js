import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

const LEAD_EN = "Pistachio holds the top slot all weekend. ";
const LEAD_ZH = "整个周末，开心果口味都稳居销量榜首。";
const PICKED_EN = "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.";
const PICKED_ZH = "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。";
const REWRITE_EN = "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.";
const REWRITE_ZH = "周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。";

const WORD_MS = 46;

export class NaiSelectionActions extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._mode = "idle"; // "idle" | "thinking" | "streaming" | "result"
    this._action = "Improve";
    this._prompt = "";
    this._expanded = false;
    this._streamCount = 0;
    this._shown = false;
  }

  onMount() {
    this.registerTimeout(() => {
      this._shown = true;
      this.render();
    }, 280);
  }

  run(actionName) {
    this._action = actionName;
    this._expanded = false;
    this._mode = "thinking";
    this.render();

    this.registerTimeout(() => {
      this._mode = "streaming";
      this._streamCount = 0;
      this.render();
      this._runStream();
    }, 700);
  }

  _runStream() {
    const zh = this.isZh;
    const rewrite = zh ? REWRITE_ZH : REWRITE_EN;
    const tokens = zh ? rewrite.split("") : rewrite.split(" ");

    const step = () => {
      if (this._mode !== "streaming") return;
      if (this._streamCount < tokens.length) {
        this._streamCount++;
        this.render();
        this.registerTimeout(step, WORD_MS);
      } else {
        this._mode = "result";
        this.render();
      }
    };
    this.registerTimeout(step, WORD_MS);
  }

  reset() {
    this._expanded = false;
    this._prompt = "";
    this._action = "Improve";
    this._mode = "idle";
    this.render();
  }

  render() {
    const zh = this.isZh;
    const lead = zh ? LEAD_ZH : LEAD_EN;
    const picked = zh ? PICKED_ZH : PICKED_EN;
    const rewrite = zh ? REWRITE_ZH : REWRITE_EN;
    const rewriteTokens = zh ? rewrite.split("") : rewrite.split(" ");
    const busy = this._mode === "thinking" || this._mode === "streaming";
    const hasPrompt = this._prompt.trim().length > 0;

    const busyLabel =
      this._action === "Improve"
        ? zh ? "优化中" : "Improving"
        : this._action === "Shorten"
        ? zh ? "精简中" : "Shortening"
        : this._action === "Change tone"
        ? zh ? "调整语气中" : "Changing tone"
        : zh ? "编辑中" : "Editing";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 480px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .container {
          position: relative;
          padding-bottom: 56px;
          user-select: none;
        }

        .text-body {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }

        .selection-highlight {
          border-radius: 3px;
          background: color-mix(in srgb, var(--accent, #0285ff) 14%, var(--surface, #fff));
          padding: 1px 2px;
          transition: background-color 0.2s ease;
        }

        .stream-token {
          display: inline;
          animation: stream-in 420ms cubic-bezier(0.22, 0.61, 0.25, 1) both;
        }

        .stream-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          vertical-align: text-bottom;
          background: var(--ink, #1f2124);
          margin-left: 2px;
          animation: caret-blink 1s step-end infinite;
        }

        /* Floating action bar */
        .bar-anchor {
          position: absolute;
          left: 50%;
          bottom: 4px;
          transform: translateX(-50%);
          z-index: 10;
          opacity: ${this._shown ? "1" : "0"};
          transition: opacity 180ms ease-out, transform 320ms cubic-bezier(0.77, 0, 0.175, 1);
        }

        .bar-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 4px;
          box-shadow: var(--shadow-overlay, 0 8px 28px rgba(0,0,0,0.12), 0 0 0 1px var(--line));
          animation: pop-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
          white-space: nowrap;
        }

        .control-btn {
          display: inline-flex;
          height: 28px;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.15s, transform 0.15s;
        }

        .control-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .control-btn:active {
          transform: scale(0.96);
        }

        .primary-btn {
          display: inline-flex;
          height: 28px;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          border: none;
          background: var(--ink, #1f2124);
          color: var(--page, #fff);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }

        .primary-btn:hover {
          opacity: 0.9;
        }

        .primary-btn:active {
          transform: scale(0.96);
        }

        .icon-only-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, transform 0.15s;
        }

        .icon-only-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .icon-only-btn:active {
          transform: scale(0.96);
        }

        .divider {
          width: 1px;
          height: 16px;
          background: var(--line, #ecedef);
          margin: 0 2px;
        }

        .prompt-input {
          height: 28px;
          border: none;
          background: transparent;
          padding: 0 10px;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
          width: 130px;
        }

        .prompt-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .spinner {
          width: 12px;
          height: 12px;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          border-top-color: var(--ink-2, #62656b);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .shimmer-text {
          font-size: 12.5px;
          color: var(--ink-2, #62656b);
          background: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 1.4s linear infinite;
        }

        @keyframes shimmer-text { 0% { background-position: 150%; } 100% { background-position: -50%; } }
        @keyframes spin { to { transform: rotate(1turn); } }
        @keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes stream-in { 0% { opacity: 0; filter: blur(4px); } 100% { opacity: 1; filter: blur(0); } }
        @keyframes caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      </style>

      <div class="container">
        <p class="text-body">
          ${lead}
          <span class="selection-highlight">
            ${
              this._mode === "idle" || this._mode === "thinking"
                ? picked
                : this._mode === "streaming"
                ? `${rewriteTokens
                    .slice(0, this._streamCount)
                    .map((t) => `<span class="stream-token">${t}${zh ? "" : " "}</span>`)
                    .join("")}<span class="stream-caret"></span>`
                : rewrite
            }
          </span>
        </p>

        <div class="bar-anchor">
          <div class="bar-pill">
            ${
              busy
                ? `
              <div style="display: flex; align-items: center; gap: 6px; padding: 0 10px;">
                <span class="spinner"></span>
                <span class="shimmer-text">${busyLabel}…</span>
              </div>
            `
                : this._mode === "result"
                ? `
              <button type="button" class="primary-btn" id="btn-keep">
                ${ICONS.check}
                <span>${zh ? "保留" : "Keep"}</span>
              </button>
              <button type="button" class="control-btn" id="btn-discard">
                ${ICONS.x}
                <span>${zh ? "放弃" : "Discard"}</span>
              </button>
              <span class="divider"></span>
              <button type="button" class="icon-only-btn" id="btn-retry" title="${zh ? "重试" : "Try again"}">
                ${ICONS.retry}
              </button>
            `
                : `
              <input
                type="text"
                class="prompt-input"
                id="prompt-input"
                placeholder="${zh ? "描述修改要求" : "Describe edits"}"
                value="${this._prompt}"
              />

              ${
                !hasPrompt
                  ? `
                <span class="divider"></span>
                <button type="button" class="control-btn" id="btn-explain">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>${zh ? "解释" : "Explain"}</span>
                </button>
                <button type="button" class="control-btn" id="btn-improve">
                  ${ICONS.spark}
                  <span>${zh ? "优化" : "Improve"}</span>
                </button>

                ${
                  this._expanded
                    ? `
                  <button type="button" class="control-btn" id="btn-shorten">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
                    <span>${zh ? "精简" : "Shorten"}</span>
                  </button>
                  <button type="button" class="control-btn" id="btn-tone">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span>${zh ? "语气" : "Tone"}</span>
                  </button>
                  <button type="button" class="control-btn" id="btn-grammar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                    <span>${zh ? "语法" : "Grammar"}</span>
                  </button>
                `
                    : ""
                }

                <span class="divider"></span>
                <button type="button" class="icon-only-btn" id="btn-toggle-expand" title="${this._expanded ? (zh ? "收起" : "Fewer") : zh ? "展开" : "More"}">
                  <span style="display: flex; transform: ${this._expanded ? "rotate(180deg)" : "none"}; transition: transform 0.2s ease;">
                    ${ICONS.chevronRight}
                  </span>
                </button>
              `
                  : `
                <button type="button" class="icon-only-btn" id="btn-send-prompt" style="background: var(--ink, #1f2124); color: var(--surface, #fff); width: 24px; height: 24px; margin-right: 2px;" title="${zh ? "发送" : "Send"}">
                  ${ICONS.arrowUp}
                </button>
              `
              }
            `
            }
          </div>
        </div>
      </div>
    `;

    // Event listeners
    this.shadowRoot.querySelector("#btn-keep")?.addEventListener("click", () => this.reset());
    this.shadowRoot.querySelector("#btn-discard")?.addEventListener("click", () => this.reset());
    this.shadowRoot.querySelector("#btn-retry")?.addEventListener("click", () => this.run(this._action));
    this.shadowRoot.querySelector("#btn-improve")?.addEventListener("click", () => this.run("Improve"));
    this.shadowRoot.querySelector("#btn-shorten")?.addEventListener("click", () => this.run("Shorten"));
    this.shadowRoot.querySelector("#btn-tone")?.addEventListener("click", () => this.run("Change tone"));
    this.shadowRoot.querySelector("#btn-grammar")?.addEventListener("click", () => this.run("Fix grammar"));
    this.shadowRoot.querySelector("#btn-explain")?.addEventListener("click", () => this.run("Explain"));

    this.shadowRoot.querySelector("#btn-toggle-expand")?.addEventListener("click", () => {
      this._expanded = !this._expanded;
      this.render();
    });

    const promptInput = this.shadowRoot.querySelector("#prompt-input");
    if (promptInput) {
      promptInput.addEventListener("input", (e) => {
        this._prompt = e.target.value;
        this.render();
        const nextInput = this.shadowRoot.querySelector("#prompt-input");
        if (nextInput) {
          nextInput.focus();
          nextInput.selectionStart = nextInput.selectionEnd = this._prompt.length;
        }
      });
      promptInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.run(this._prompt.trim() || "Improve");
        }
      });
    }

    this.shadowRoot.querySelector("#btn-send-prompt")?.addEventListener("click", () => {
      this.run(this._prompt.trim() || "Improve");
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-selection-actions")) {
  customElements.define("nai-selection-actions", NaiSelectionActions);
}
