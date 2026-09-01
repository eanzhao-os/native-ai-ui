import { NaiBaseElement } from "../core/base-element.js";

const QUESTIONS_EN = [
  { q: "How many flavors should we launch?", type: "radio", options: ["Three (core line)", "Five (full case)", "Just one hero"] },
  { q: "Which mix-ins should we stock?", type: "check", options: ["Chocolate chips", "Waffle bits", "Sprinkles"] },
  { q: "Which market do we enter first?", type: "radio", options: ["Food trucks", "Grocery freezers", "Scoop shops"] },
];

const QUESTIONS_ZH = [
  { q: "首批上线推出几款新口味？", type: "radio", options: ["3 款 (核心经典线)", "5 款 (完整全品类)", "仅推 1 款爆品"] },
  { q: "首批需要进货哪些混合配料？", type: "check", options: ["黑巧碎粒", "华夫脆角碎片", "彩色糖针"] },
  { q: "优先切入哪个试点销售渠道？", type: "radio", options: ["流动餐车", "精品超市冷柜", "线下直营体验店"] },
];

let approvalInstance = 0;

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
    this._autoAdvanceTimer = null;
    this._choiceGroupId = `nai-approval-${approvalInstance++}`;
  }

  onUnmount() {
    this._cancelAutoAdvance();
  }

  _questions() {
    return this.isZh ? QUESTIONS_ZH : QUESTIONS_EN;
  }

  _cancelAutoAdvance() {
    if (this._autoAdvanceTimer === null) return;
    window.clearTimeout(this._autoAdvanceTimer);
    this._autoAdvanceTimer = null;
  }

  _goToQuestion(index) {
    this._cancelAutoAdvance();
    this._qi = index;
    this.render();
  }

  _submit() {
    this._cancelAutoAdvance();
    this._sent = true;
    this.render();
  }

  toggle(index) {
    const questions = this._questions();
    const question = questions[this._qi];
    const picked = this._answers[this._qi] ?? [];
    this._answers[this._qi] =
      question.type === "radio"
        ? [index]
        : picked.includes(index)
          ? picked.filter((item) => item !== index)
          : [...picked, index];

    if (question.type === "radio") {
      this._custom[this._qi] = "";
      this._cancelAutoAdvance();
    }
    this._syncQuestionControls();

    if (question.type === "radio") {
      const questionIndex = this._qi;
      this._autoAdvanceTimer = this.registerTimeout(() => {
        this._autoAdvanceTimer = null;
        if (questionIndex === questions.length - 1) {
          this._sent = true;
        } else if (this._qi === questionIndex) {
          this._qi = Math.min(questions.length - 1, this._qi + 1);
        }
        this.render();
      }, 480);
    }
  }

  _handleChoiceKeyDown(event, index) {
    const question = this._questions()[this._qi];
    if (event.key === " ") {
      event.preventDefault();
      this.toggle(index);
      return;
    }
    if (
      question.type !== "radio" ||
      !["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(event.key)
    ) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (index + direction + question.options.length) % question.options.length;
    this.shadowRoot?.querySelector(`input[data-option="${nextIndex}"]`)?.focus();
    this.toggle(nextIndex);
  }

  _syncQuestionControls() {
    const question = this._questions()[this._qi];
    const selected = this._answers[this._qi] ?? [];
    this.shadowRoot?.querySelectorAll("input[data-option]").forEach((option) => {
      const index = Number(option.getAttribute("data-option"));
      const on = selected.includes(index);
      option.checked = on;
      const mark = option.nextElementSibling;
      const label = mark?.nextElementSibling;
      mark?.classList.toggle("bg-ink", on);
      mark?.classList.toggle("text-canvas", on);
      mark?.classList.toggle(
        "shadow-[inset_0_0_0_1.5px_var(--line-strong)]",
        !on,
      );
      mark?.classList.toggle("text-transparent", !on);
      const dot = mark?.firstElementChild;
      if (question.type === "radio" && dot instanceof HTMLElement) {
        dot.style.transform = on ? "scale(1)" : "scale(0)";
      }
      label?.classList.toggle("text-ink", on);
      label?.classList.toggle("text-ink-2", !on);
    });

    const customInput = this.shadowRoot?.querySelector(".custom-input");
    if (customInput instanceof HTMLInputElement) {
      customInput.value = this._custom[this._qi] ?? "";
    }
    const hasAnswer =
      selected.length > 0 || Boolean(this._custom[this._qi]?.trim());
    const submit = this.shadowRoot?.querySelector(".submit-btn");
    if (submit instanceof HTMLButtonElement) {
      submit.disabled = !hasAnswer;
      submit.style.background = hasAnswer ? "var(--ink)" : "var(--field)";
      submit.style.color = hasAnswer ? "var(--canvas)" : "var(--ink-3)";
      submit.style.boxShadow = hasAnswer
        ? "inset 0 1px 0 color-mix(in srgb, var(--surface) 22%, transparent)"
        : "var(--shadow-btn)";
    }
  }

  _syncCustomAnswer(input) {
    const question = this._questions()[this._qi];
    this._custom[this._qi] = input.value;
    if (question.type === "radio") this._answers[this._qi] = [];
    this._syncQuestionControls();
  }

  reset() {
    this._cancelAutoAdvance();
    this._qi = 0;
    this._answers = {};
    this._custom = {};
    this._sent = false;
    this._open = true;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const questions = zh ? QUESTIONS_ZH : QUESTIONS_EN;

    if (!this._open) {
      this.setHtml(
        `<button type="button" class="reopen-btn min-h-11 rounded-control bg-surface px-3 text-[12.5px] font-medium text-ink shadow-btn transition-colors duration-150 hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">${zh ? "打开审批流卡片" : "Open approval"}</button>`,
        ":host{display:block;width:100%}",
      );
      this.shadowRoot?.querySelector(".reopen-btn")?.addEventListener("click", () => {
        this._open = true;
        this.render();
      });
      return;
    }

    const question = questions[this._qi];
    const last = this._qi === questions.length - 1;
    const selected = this._answers[this._qi] ?? [];
    const hasAnswer = selected.length > 0 || Boolean(this._custom[this._qi]?.trim());
    const body = this._sent
      ? `<div role="status" class="flex min-h-37 flex-col items-center justify-center gap-2"><span class="flex size-6 items-center justify-center rounded-full bg-green text-white" style="animation:pop-in 300ms cubic-bezier(0.23,1,0.32,1) both"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span class="text-[13px] font-medium text-ink" style="animation:fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both">${zh ? "审批决策已提交" : "Answers sent"}</span><button type="button" class="reset-btn min-h-11 rounded-control px-3 text-[12px] font-medium text-accent-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">${zh ? "重新填写" : "Start over"}</button></div>`
      : `<div class="primitive-card-pad" style="animation:fade-up 350ms cubic-bezier(0.23,1,0.32,1) both"><div class="flex items-start justify-between gap-3"><span class="text-[13px] font-medium text-ink">${question.q}</span><button type="button" aria-label="${zh ? "关闭审批" : "Dismiss"}" class="dismiss-btn -m-2.5 flex size-11 shrink-0 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></div><fieldset class="mt-2 flex flex-col gap-0.5"><legend class="sr-only">${question.q}</legend>${question.options.map((option, index) => {
        const on = selected.includes(index);
        return `<label class="-mx-1.5 flex min-h-11 cursor-pointer items-center gap-2 rounded-control px-1.5 text-left transition-colors duration-100 hover:bg-hover focus-within:ring-2 focus-within:ring-accent"><input data-option="${index}" type="${question.type === "radio" ? "radio" : "checkbox"}" name="approval-${this._choiceGroupId}-${this._qi}" ${on ? "checked" : ""} class="sr-only"><span aria-hidden="true" class="flex size-4 shrink-0 items-center justify-center transition-colors duration-200 ${question.type === "radio" ? "rounded-full" : "rounded-[5px]"} ${on ? "bg-ink text-canvas" : "shadow-[inset_0_0_0_1.5px_var(--line-strong)] text-transparent"}">${question.type === "radio" ? `<span class="size-1.5 rounded-full bg-canvas transition-transform duration-200" style="transform:${on ? "scale(1)" : "scale(0)"}"></span>` : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>'}</span><span class="text-[13px] transition-colors duration-200 ${on ? "text-ink" : "text-ink-2"}">${option}</span></label>`;
      }).join("")}<label class="-mx-1.5 flex min-h-11 items-center gap-2 rounded-control px-1.5 transition-colors duration-100 focus-within:bg-hover focus-within:ring-2 focus-within:ring-accent hover:bg-hover"><span aria-hidden="true" class="size-4 shrink-0"></span><input placeholder="${zh ? "输入其他自定义内容…" : "Type something…"}" aria-label="${zh ? "自定义答案" : "Custom answer"}" class="custom-input min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"></label></fieldset></div>`;

    const footer = `<div class="primitive-card-footer flex items-center justify-between"><span class="flex items-center gap-2"><button type="button" aria-label="${zh ? "上一题" : "Previous"}" ${this._qi === 0 || this._sent ? "disabled" : ""} class="prev-btn flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></button><span class="flex items-center gap-1">${questions.map((_, index) => {
      const current = index === this._qi && !this._sent;
      const style = current
        ? "width:9px;height:9px;border:2.5px solid var(--ink)"
        : this._sent || index < this._qi
          ? "width:7px;height:7px;background:var(--ink-3)"
          : "width:7px;height:7px;border:1.5px solid var(--ink-3)";
      return `<button type="button" data-question="${index}" aria-label="${zh ? `转到第 ${index + 1} 题` : `Go to question ${index + 1}`}" ${current ? 'aria-current="step"' : ""} ${this._sent ? "disabled" : ""} class="flex size-11 items-center justify-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default"><span aria-hidden="true" class="rounded-full transition-all duration-300" style="${style}"></span></button>`;
    }).join("")}</span><button type="button" aria-label="${zh ? "下一题" : "Next"}" ${last || this._sent ? "disabled" : ""} class="next-nav-btn flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></span>${this._sent ? "" : `<button type="button" aria-label="${last ? (zh ? "提交答案" : "Send answers") : zh ? "继续下一题" : "Next question"}" ${hasAnswer ? "" : "disabled"} class="submit-btn flex size-11 items-center justify-center rounded-[8px] transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed enabled:cursor-pointer" style="background:${hasAnswer ? "var(--ink)" : "var(--field)"};color:${hasAnswer ? "var(--canvas)" : "var(--ink-3)"};box-shadow:${hasAnswer ? "inset 0 1px 0 color-mix(in srgb, var(--surface) 22%, transparent)" : "var(--shadow-btn)"}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg></button>`}</div>`;

    this.setHtml(
      `<div class="flex min-h-[196px] w-full max-w-80 flex-col items-stretch"><div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-card">${body}${footer}</div></div>`,
      ":host{display:block;width:100%}",
    );

    const customInput = this.shadowRoot?.querySelector(".custom-input");
    if (customInput instanceof HTMLInputElement) {
      customInput.value = this._custom[this._qi] ?? "";
      customInput.addEventListener("input", () => this._syncCustomAnswer(customInput));
    }
    this.shadowRoot?.querySelector(".dismiss-btn")?.addEventListener("click", () => {
      this._open = false;
      this.render();
    });
    this.shadowRoot?.querySelector(".reset-btn")?.addEventListener("click", () => this.reset());
    this.shadowRoot?.querySelectorAll("input[data-option]").forEach((input) => {
      const index = Number(input.getAttribute("data-option"));
      input.addEventListener("change", () => this.toggle(index));
      input.addEventListener("keydown", (event) => this._handleChoiceKeyDown(event, index));
    });
    this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click", () => {
      this._goToQuestion(Math.max(0, this._qi - 1));
    });
    this.shadowRoot?.querySelector(".next-nav-btn")?.addEventListener("click", () => {
      this._goToQuestion(Math.min(questions.length - 1, this._qi + 1));
    });
    this.shadowRoot?.querySelectorAll("[data-question]").forEach((button) => {
      button.addEventListener("click", () => {
        this._goToQuestion(Number(button.getAttribute("data-question")));
      });
    });
    this.shadowRoot?.querySelector(".submit-btn")?.addEventListener("click", () => {
      const currentHasAnswer =
        (this._answers[this._qi]?.length ?? 0) > 0 ||
        Boolean(this._custom[this._qi]?.trim());
      if (!currentHasAnswer) return;
      if (last) this._submit();
      else this._goToQuestion(this._qi + 1);
    });

    if (this._sent) {
      this.shadowRoot?.querySelector(".reset-btn")?.focus();
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-approval-card")) {
  customElements.define("nai-approval-card", NaiApprovalCard);
}
