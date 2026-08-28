import { NaiBaseElement } from "../core/base-element.js";

const QUESTIONS_EN = [
  {
    q: "How many flavors should we launch?",
    type: "radio",
    options: ["Three (core line)", "Five (full case)", "Just one hero"],
  },
  {
    q: "Which mix-ins should we stock?",
    type: "check",
    options: ["Chocolate chips", "Waffle bits", "Sprinkles"],
  },
  {
    q: "Which market do we enter first?",
    type: "radio",
    options: ["Food trucks", "Grocery freezers", "Scoop shops"],
  },
];

const QUESTIONS_ZH = [
  {
    q: "首批上线推出几款新口味？",
    type: "radio",
    options: ["3 款 (核心经典线)", "5 款 (完整全品类)", "仅推 1 款爆品"],
  },
  {
    q: "首批需要进货哪些混合配料？",
    type: "check",
    options: ["黑巧碎粒", "华夫脆角碎片", "彩色糖针"],
  },
  {
    q: "优先切入哪个试点销售渠道？",
    type: "radio",
    options: ["流动餐车", "精品超市冷柜", "线下直营体验店"],
  },
];

export class NaiApprovalCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._qi = 0;
    this._answers = {};
    this._custom = {};
    this._sent = false;
    this._open = true;
  }

  toggle(index) {
    const QUESTIONS = this.isZh ? QUESTIONS_ZH : QUESTIONS_EN;
    const question = QUESTIONS[this._qi];
    const picked = this._answers[this._qi] ?? [];

    const next =
      question.type === "radio"
        ? [index]
        : picked.includes(index)
        ? picked.filter((item) => item !== index)
        : [...picked, index];

    this._answers[this._qi] = next;

    if (question.type === "radio") {
      this._custom[this._qi] = "";
      this.render();
      this.registerTimeout(() => {
        if (this._qi === QUESTIONS.length - 1) {
          this._sent = true;
        } else {
          this._qi = Math.min(QUESTIONS.length - 1, this._qi + 1);
        }
        this.render();
      }, 480);
    } else {
      this.render();
    }
  }

  submitNext() {
    const QUESTIONS = this.isZh ? QUESTIONS_ZH : QUESTIONS_EN;
    if (this._qi === QUESTIONS.length - 1) {
      this._sent = true;
    } else {
      this._qi = Math.min(QUESTIONS.length - 1, this._qi + 1);
    }
    this.render();
  }

  reset() {
    this._qi = 0;
    this._answers = {};
    this._custom = {};
    this._sent = false;
    this._open = true;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const QUESTIONS = zh ? QUESTIONS_ZH : QUESTIONS_EN;

    if (!this._open) {
      this.setHtml(`
        <button
          type="button"
          class="reopen-btn rounded-control bg-surface px-3 py-2 text-[12.5px] font-medium text-ink shadow-btn transition-colors duration-150 hover:bg-hover cursor-pointer"
        >
          ${zh ? "打开审批流卡片" : "Open approval"}
        </button>
      `);
      this.shadowRoot?.querySelector(".reopen-btn")?.addEventListener("click", () => {
        this._open = true;
        this.render();
      });
      return;
    }

    const question = QUESTIONS[this._qi];
    const last = this._qi === QUESTIONS.length - 1;
    const selected = this._answers[this._qi] ?? [];
    const hasAnswer = selected.length > 0 || Boolean(this._custom[this._qi]?.trim());

    this.setHtml(`
      <div class="flex min-h-[196px] w-full max-w-80 flex-col items-stretch">
        <div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-card p-3">
          ${
            this._sent
              ? `
            <div class="flex h-37 flex-col items-center justify-center gap-2">
              <span
                class="flex size-6 items-center justify-center rounded-full bg-green text-white"
                style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-[13px] font-medium text-ink" style="animation: fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both;">
                ${zh ? "审批决策已提交" : "Answers sent"}
              </span>
              <button type="button" class="reset-btn text-[12px] font-medium text-accent-ink hover:underline cursor-pointer">
                ${zh ? "重新填写" : "Start over"}
              </button>
            </div>
          `
              : `
            <div style="animation: fade-up 350ms cubic-bezier(0.23,1,0.32,1) both;">
              <div class="flex items-start justify-between gap-3">
                <span class="text-[13px] font-medium text-ink">${question.q}</span>
                <button
                  type="button"
                  aria-label="Dismiss"
                  class="dismiss-btn flex size-5 items-center justify-center rounded-[4px] shrink-0 text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="mt-2 flex flex-col gap-0.5">
                ${question.options
                  .map((option, i) => {
                    const on = selected.includes(i);
                    return `
                    <button
                      type="button"
                      data-option="${i}"
                      class="option-item ${on ? "selected" : ""} flex min-h-7 w-full items-center gap-2 rounded-[6px] px-1.5 py-1 text-left transition-colors duration-100 cursor-pointer ${
                        on ? "bg-accent-tint text-accent-ink font-medium" : "text-ink hover:bg-hover"
                      }"
                    >
                      <span class="flex size-3.5 shrink-0 items-center justify-center rounded-${
                        question.type === "radio" ? "full" : "[3px]"
                      } border border-line-strong ${on ? "border-accent bg-accent text-white" : "bg-surface"}">
                        ${
                          on
                            ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
                            : ""
                        }
                      </span>
                      <span class="text-[12.5px]">${option}</span>
                    </button>
                  `;
                  })
                  .join("")}
              </div>

              ${
                question.type === "check"
                  ? `
                <div class="mt-3 flex items-center justify-between border-t border-line pt-2">
                  <span class="text-[11px] text-ink-3">${zh ? `问题 ${this._qi + 1}/${QUESTIONS.length}` : `Question ${this._qi + 1}/${QUESTIONS.length}`}</span>
                  <button
                    type="button"
                    ${!hasAnswer ? "disabled" : ""}
                    class="next-btn rounded-control px-2.5 py-1 text-[11.5px] font-medium transition-all duration-150 ${
                      hasAnswer
                        ? "bg-accent text-white shadow-btn hover:opacity-90 cursor-pointer"
                        : "bg-field text-ink-3 cursor-not-allowed opacity-60"
                    }"
                  >
                    ${last ? (zh ? "提交" : "Submit") : zh ? "下一题" : "Next"}
                  </button>
                </div>
              `
                  : ""
              }
            </div>
          `
          }
        </div>
      </div>
    `);

    // Wire up listeners
    this.shadowRoot?.querySelector(".dismiss-btn")?.addEventListener("click", () => {
      this._open = false;
      this.render();
    });

    this.shadowRoot?.querySelector(".reset-btn")?.addEventListener("click", () => {
      this.reset();
    });

    this.shadowRoot?.querySelectorAll("[data-option]").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.getAttribute("data-option"));
        this.toggle(idx);
      });
    });

    this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click", () => {
      if (hasAnswer) this.submitNext();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-approval-card")) {
  customElements.define("nai-approval-card", NaiApprovalCard);
}
