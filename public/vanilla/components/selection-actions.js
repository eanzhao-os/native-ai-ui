import { NaiBaseElement } from "../core/base-element.js";

const LEAD_EN = "Pistachio holds the top slot all weekend. ";
const LEAD_ZH = "整个周末，开心果口味都稳居销量榜首。";
const PICKED_EN = "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.";
const PICKED_ZH = "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。";
const REWRITE_EN = "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.";
const REWRITE_ZH = "周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。";

const controlClass =
  "inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-[12px] font-normal text-ink transition-[background-color,color,transform] duration-150 hover:bg-hover active:scale-[0.96] cursor-pointer";

const primaryClass =
  "inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-ink px-2.5 text-[12.5px] font-normal text-canvas shadow-hairline transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.96] cursor-pointer";

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
    this._anchor = { x: 0, y: 0 };
    this._positioned = false;
  }

  onMount() {
    this.registerTimeout(() => {
      this._shown = true;
      this.place();
      this.render();
    }, 280);

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => this.place());
      const host = this.shadowRoot?.querySelector(".selection-host");
      if (host) ro.observe(host);
      this._cleanups.push(() => ro.disconnect());
    }
  }

  reset() {
    this._mode = "idle";
    this._prompt = "";
    this._expanded = false;
    this._streamCount = 0;
    this.render();
  }

  place() {
    const host = this.shadowRoot?.querySelector(".selection-host");
    const selection = this.shadowRoot?.querySelector(".selection-target");
    if (!host || !selection) return;

    const bounds = selection.getBoundingClientRect();
    const hostBounds = host.getBoundingClientRect();
    const next = {
      x: Math.round(bounds.left - hostBounds.left + bounds.width / 2),
      y: Math.round(bounds.bottom - hostBounds.top + 8),
    };
    this._anchor = next;
    this._positioned = true;
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
        this.place();
        this.render();
        this.registerTimeout(step, 46);
      } else {
        this._mode = "result";
        this.place();
        this.render();
      }
    };
    this.registerTimeout(step, 46);
  }

  reset() {
    this._expanded = false;
    this._prompt = "";
    this._action = "Improve";
    this._mode = "idle";
    this.place();
    this.render();
  }

  render() {
    const zh = this.isZh;
    const LEAD = zh ? LEAD_ZH : LEAD_EN;
    const PICKED = zh ? PICKED_ZH : PICKED_EN;
    const REWRITE = zh ? REWRITE_ZH : REWRITE_EN;
    const rewriteTokens = zh ? REWRITE.split("") : REWRITE.split(" ");
    const busy = this._mode === "thinking" || this._mode === "streaming";
    const visible = this._shown;
    const hasPrompt = this._prompt.trim().length > 0;

    const busyLabel =
      this._action === "Improve"
        ? zh ? "优化中" : "Improving"
        : this._action === "Shorten"
        ? zh ? "精简中" : "Shortening"
        : this._action === "Change tone"
        ? zh ? "调整语气中" : "Changing tone"
        : zh ? "编辑中" : "Editing";

    this.setHtml(`
      <div class="w-full max-w-[460px]">
        <div class="selection-host relative select-none pb-12">
          <p class="text-[13px] leading-relaxed text-ink">
            ${LEAD}
            <span
              class="selection-target box-decoration-clone rounded-[3px] bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] text-ink dark:bg-accent-tint"
            >
              ${
                this._mode === "idle" || this._mode === "thinking"
                  ? PICKED
                  : this._mode === "streaming"
                  ? `${rewriteTokens
                      .slice(0, this._streamCount)
                      .join(zh ? "" : " ")}<span class="stream-caret is-streaming"></span>`
                  : REWRITE
              }
            </span>
          </p>

          <div
            class="bar-wrapper absolute top-0 left-0 z-10"
            style="
              transform: translate3d(${this._anchor.x}px, ${this._anchor.y}px, 0) translateX(-50%);
              transition: transform 320ms cubic-bezier(0.77,0,0.175,1), opacity 180ms ease-out;
              opacity: ${visible ? 1 : 0};
              pointer-events: ${visible ? "auto" : "none"};
              will-change: transform;
            "
          >
            <div
              class="flex h-9 w-fit max-w-[calc(100vw-48px)] items-center justify-center gap-0.5 overflow-hidden rounded-full bg-surface p-1 font-sans font-normal text-ink antialiased shadow-overlay"
              style="${visible ? "animation: pop-in 220ms cubic-bezier(0.23,1,0.32,1) both;" : ""}"
            >
              <div class="flex w-fit shrink-0 items-center justify-center gap-0.5">
                ${
                  busy
                    ? `
                  <span class="inline-flex h-7 items-center gap-1.5 whitespace-nowrap px-2.5 text-[12.5px] font-normal text-ink-2">
                    <span
                      class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 animate-spin"
                    ></span>
                    ${
                      this._mode === "thinking"
                        ? `<span class="bg-clip-text text-[12.5px] font-normal text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${busyLabel}…</span>`
                        : `<span>${busyLabel}…</span>`
                    }
                  </span>
                `
                    : ""
                }

                ${
                  this._mode === "result"
                    ? `
                  <button type="button" id="btn-keep" class="${primaryClass}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>${zh ? "保留" : "Keep"}</span>
                  </button>
                  <button type="button" id="btn-discard" class="${controlClass}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>${zh ? "放弃" : "Discard"}</span>
                  </button>
                  <span class="mx-0.5 h-4 w-px shrink-0 bg-line"></span>
                  <button
                    type="button"
                    id="btn-retry"
                    aria-label="${zh ? "重试" : "Try again"}"
                    class="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-3 transition-[background-color,color,transform] duration-150 hover:bg-hover-2 hover:text-ink-2 active:scale-[0.96] cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                    </svg>
                  </button>
                `
                    : ""
                }

                ${
                  this._mode === "idle"
                    ? `
                  <div
                    class="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${this._expanded ? "0px" : hasPrompt ? "145px" : "145px"};
                      opacity: ${this._expanded ? 0 : 1};
                      transform: ${this._expanded ? "translateX(-8px)" : "translateX(0)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    <form id="prompt-form" class="flex h-7 shrink-0 items-center transition-[width] duration-400" style="width: 145px;">
                      <input
                        id="prompt-input"
                        value="${this._prompt}"
                        aria-label="${zh ? "描述修改要求" : "Describe edits"}"
                        placeholder="${zh ? "描述修改要求" : "Describe edits"}"
                        class="h-7 w-full bg-transparent pr-2.5 pl-3 text-[12.5px] text-ink placeholder:text-ink-3 outline-none"
                      />
                    </form>
                  </div>

                  <div
                    class="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${hasPrompt ? "0px" : this._expanded ? "462px" : "224px"};
                      opacity: ${hasPrompt ? 0 : 1};
                      transform: ${hasPrompt ? "translateX(-8px)" : "translateX(0)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    ${!this._expanded ? '<span class="mx-1 h-4 w-px shrink-0 bg-line-strong"></span>' : ""}
                    <button type="button" id="btn-explain" class="${controlClass}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>${zh ? "解释" : "Explain"}</span>
                    </button>
                    <button type="button" id="btn-improve" class="${controlClass}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                      </svg>
                      <span>${zh ? "优化" : "Improve"}</span>
                    </button>

                    <div
                      class="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,margin] duration-400"
                      style="
                        max-width: ${this._expanded ? "262px" : "0px"};
                        opacity: ${this._expanded ? 1 : 0};
                        margin-left: ${this._expanded ? "2px" : "0px"};
                        transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                      "
                    >
                      <button type="button" id="btn-shorten" class="${controlClass}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                          <line x1="20" y1="4" x2="8.12" y2="15.88" />
                          <line x1="14.47" y1="14.48" x2="20" y2="20" />
                          <line x1="8.12" y1="8.12" x2="12" y2="12" />
                        </svg>
                        <span>${zh ? "精简" : "Shorten"}</span>
                      </button>
                      <button type="button" id="btn-tone" class="${controlClass}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <span>${zh ? "语气" : "Tone"}</span>
                      </button>
                      <button type="button" id="btn-grammar" class="${controlClass}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                        </svg>
                        <span>${zh ? "语法" : "Grammar"}</span>
                      </button>
                    </div>

                    <span class="mx-0.5 h-4 w-px shrink-0 bg-line"></span>
                    <button
                      type="button"
                      id="btn-toggle-expand"
                      aria-label="${
                        this._expanded
                          ? zh ? "收起更多操作" : "Show fewer actions"
                          : zh ? "展开更多操作" : "Show more actions"
                      }"
                      aria-expanded="${this._expanded}"
                      class="flex size-7 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 hover:bg-hover active:scale-[0.96] cursor-pointer"
                    >
                      <span
                        class="flex transition-transform duration-400"
                        style="
                          transform: ${this._expanded ? "rotate(180deg)" : "rotate(0deg)"};
                          transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                        "
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div
                    class="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${hasPrompt ? "30px" : "0px"};
                      opacity: ${hasPrompt ? 1 : 0};
                      transform: ${hasPrompt ? "scale(1)" : "scale(0.88)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    <button
                      type="button"
                      id="btn-send-prompt"
                      aria-label="${zh ? "发送编辑指令" : "Send edit instruction"}"
                      class="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-[opacity,transform] duration-200 active:scale-[0.94] cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </button>
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    // Wire up events
    this.shadowRoot?.querySelector("#btn-keep")?.addEventListener("click", () => this.reset());
    this.shadowRoot?.querySelector("#btn-discard")?.addEventListener("click", () => this.reset());
    this.shadowRoot?.querySelector("#btn-retry")?.addEventListener("click", () => this.run(this._action));
    this.shadowRoot?.querySelector("#btn-explain")?.addEventListener("click", () => this.run("Explain"));
    this.shadowRoot?.querySelector("#btn-improve")?.addEventListener("click", () => this.run("Improve"));
    this.shadowRoot?.querySelector("#btn-shorten")?.addEventListener("click", () => this.run("Shorten"));
    this.shadowRoot?.querySelector("#btn-tone")?.addEventListener("click", () => this.run("Change tone"));
    this.shadowRoot?.querySelector("#btn-grammar")?.addEventListener("click", () => this.run("Fix grammar"));

    this.shadowRoot?.querySelector("#btn-toggle-expand")?.addEventListener("click", () => {
      this._expanded = !this._expanded;
      this.render();
    });

    const promptInput = this.shadowRoot?.querySelector("#prompt-input");
    if (promptInput) {
      promptInput.addEventListener("input", (e) => {
        this._prompt = e.target.value;
        this.render();
        const nextInput = this.shadowRoot?.querySelector("#prompt-input");
        if (nextInput) {
          nextInput.focus();
          nextInput.selectionStart = nextInput.selectionEnd = this._prompt.length;
        }
      });
    }

    const form = this.shadowRoot?.querySelector("#prompt-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.run(this._prompt.trim() || "Improve");
      });
    }

    this.shadowRoot?.querySelector("#btn-send-prompt")?.addEventListener("click", () => {
      this.run(this._prompt.trim() || "Improve");
    });

    this.place();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-selection-actions")) {
  customElements.define("nai-selection-actions", NaiSelectionActions);
}
