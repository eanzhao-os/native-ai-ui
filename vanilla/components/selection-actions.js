import { NaiBaseElement } from "../core/base-element.js";

const LEAD_EN = "Pistachio holds the top slot all weekend. ";
const LEAD_ZH = "整个周末，开心果口味都稳居销量榜首。";
const PICKED_EN =
  "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.";
const PICKED_ZH =
  "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。";
const REWRITE_EN =
  "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.";
const REWRITE_ZH =
  "周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。";
const SHORTEN_EN = "Churn pistachio Saturday morning so it firms before the rush.";
const SHORTEN_ZH = "周六早上先搅拌开心果，让它在高峰前凝冻成型。";
const TONE_EN =
  "Please churn pistachio first on Saturday so it is fully set before the afternoon rush.";
const TONE_ZH = "请在周六优先搅拌开心果，确保它在下午高峰前充分凝冻。";
const GRAMMAR_EN =
  "Churn the pistachio batch first thing Saturday so it has time to firm up before the afternoon rush.";
const GRAMMAR_ZH =
  "周六一开工，先搅拌开心果这一批，让它在下午高峰前有足够时间凝冻成型。";
const CUSTOM_DIRECT_EN =
  "Churn pistachio early Saturday; let it firm before the afternoon rush.";
const CUSTOM_DIRECT_ZH = "周六先搅拌开心果，下午高峰前完成凝冻。";
const CUSTOM_SHORTER_EN =
  "Churn pistachio Saturday morning; let it firm before the rush.";
const CUSTOM_SHORTER_ZH = "周六早上搅拌开心果，高峰前凝冻成型。";
const EXPLANATION_EN =
  "This sentence prioritizes the Saturday churn so the batch has enough setting time before peak service.";
const EXPLANATION_ZH =
  "这句话把周六的搅拌任务设为优先事项，确保冰淇淋在高峰营业前有足够的凝冻时间。";

const CUSTOM_PROMPTS = {
  direct: {
    instructionEn: "Make it more direct",
    instructionZh: "改得更直接",
    resultEn: CUSTOM_DIRECT_EN,
    resultZh: CUSTOM_DIRECT_ZH,
  },
  shorter: {
    instructionEn: "Make it shorter",
    instructionZh: "写得更简短",
    resultEn: CUSTOM_SHORTER_EN,
    resultZh: CUSTOM_SHORTER_ZH,
  },
};

const STREAM_UNIT = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|[^\s\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+\s*|\s+/gu;
const WORD_MS = 46;

const controlClass =
  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-ink transition-[background-color,color,transform] duration-150 motion-reduce:transition-none hover:bg-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent";
const primaryClass =
  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-semibold text-canvas shadow-hairline transition-[opacity,transform] duration-150 motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const icons = {
  explain:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  improve:
    '<svg width="14" height="14" viewBox="0 0 24 24" stroke-width="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M3 12C9.26752 12 12 9.36306 12 3C12 9.36306 14.7134 12 21 12C14.7134 12 12 14.7134 12 21C12 14.7134 9.26752 12 3 12Z" stroke="currentColor" stroke-linejoin="round"></path></svg>',
  shorten:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M7.23611 7C7.71115 6.46924 8 5.76835 8 5C8 3.34315 6.65685 2 5 2C3.34315 2 2 3.34315 2 5C2 6.65685 3.34315 8 5 8C5.8885 8 6.68679 7.61375 7.23611 7ZM7.23611 7L20 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.23611 17C7.71115 17.5308 8 18.2316 8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C5.8885 16 6.68679 16.3863 7.23611 17ZM7.23611 17L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  tone:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M10 9H8M16 9H14M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.5 14.5C16.5 14.5 15 16.5 12 16.5C9 16.5 7.5 14.5 7.5 14.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  grammar:
    '<svg width="14" height="14" viewBox="0 0 24 24" stroke-width="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M12 8L12 16M12 8H8M12 8H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 13.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13.5M21 10.5V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V10.5" stroke="currentColor" stroke-linejoin="round"></path><path d="M19.5 13.5V10.5H22.5V13.5H19.5Z" stroke="currentColor" stroke-linejoin="round"></path><path d="M1.5 13.5V10.5H4.5V13.5H1.5Z" stroke="currentColor" stroke-linejoin="round"></path></svg>',
  send:
    '<svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  chevron:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  check:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  close:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
  retry:
    '<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function streamUnits(text) {
  return text.match(STREAM_UNIT) ?? Array.from(text);
}

function resolveCustomPrompt(prompt, zh) {
  const normalized = prompt.trim().replace(/\s+/g, " ").toLocaleLowerCase();
  for (const [key, definition] of Object.entries(CUSTOM_PROMPTS)) {
    const instruction = zh ? definition.instructionZh : definition.instructionEn;
    if (normalized === instruction.toLocaleLowerCase()) return key;
  }
  return null;
}

function unsupportedPromptStatus(zh) {
  return zh
    ? "不支持该指令。请尝试“改得更直接”或“写得更简短”。"
    : "Unsupported instruction. Try “Make it more direct” or “Make it shorter”.";
}

function rewriteFor(action, zh, customPrompt) {
  if (action === "shorten") return zh ? SHORTEN_ZH : SHORTEN_EN;
  if (action === "tone") return zh ? TONE_ZH : TONE_EN;
  if (action === "grammar") return zh ? GRAMMAR_ZH : GRAMMAR_EN;
  if (action === "custom" && customPrompt) {
    const definition = CUSTOM_PROMPTS[customPrompt];
    return zh ? definition.resultZh : definition.resultEn;
  }
  return zh ? REWRITE_ZH : REWRITE_EN;
}

function progressStatus(action, zh, customPrompt) {
  if (action === "explain") return zh ? "解释处理中" : "Explanation in progress";
  if (action === "improve") return zh ? "优化处理中" : "Improvement in progress";
  if (action === "shorten") return zh ? "精简处理中" : "Shortening in progress";
  if (action === "tone") return zh ? "语气调整处理中" : "Tone change in progress";
  if (action === "grammar") return zh ? "语法修正处理中" : "Grammar fix in progress";
  return customPrompt === "shorter"
    ? zh ? "自定义精简处理中" : "Shorter edit in progress"
    : zh ? "自定义直接改写处理中" : "Direct edit in progress";
}

function readyStatus(action, zh, customPrompt) {
  if (action === "improve") return zh ? "优化文本已就绪" : "Improved text ready";
  if (action === "shorten") return zh ? "精简文本已就绪" : "Shortened text ready";
  if (action === "tone") return zh ? "语气调整已就绪" : "Tone change ready";
  if (action === "grammar") return zh ? "语法修正已就绪" : "Grammar fix ready";
  return customPrompt === "shorter"
    ? zh ? "自定义精简已就绪" : "Shorter edit ready"
    : zh ? "自定义直接改写已就绪" : "Direct edit ready";
}

function actionFromPublicName(value) {
  const normalized = String(value).trim().toLocaleLowerCase();
  if (normalized === "explain") return "explain";
  if (normalized === "improve") return "improve";
  if (normalized === "shorten") return "shorten";
  if (normalized === "tone" || normalized === "change tone") return "tone";
  if (normalized === "grammar" || normalized === "fix grammar") return "grammar";
  if (normalized === "custom") return "custom";
  return null;
}

export class NaiSelectionActions extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._mode = "idle";
    this._action = "improve";
    this._committedText = PICKED_EN;
    this._draftText = PICKED_EN;
    this._prompt = "";
    this._submittedCustomPrompt = null;
    this._expanded = false;
    this._explanation = "";
    this._announcement = "";
    this._shown = false;
    this._reducedMotion = false;
    this._currentLang = null;
    this._operationToken = 0;
    this._thinkingTimer = null;
    this._streamTimer = null;
    this._revealTimer = null;
    this._stream = { count: 0, units: [] };
    this._card = null;
    this._paragraph = null;
    this._selection = null;
    this._toolbarMount = null;
    this._toolbar = null;
    this._status = null;
  }

  onMount() {
    this._initializeLanguage(this.currentLang);
    const media = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    this._reducedMotion = Boolean(media?.matches);
    this._shown = this._reducedMotion;
    if (!this._reducedMotion) this._scheduleReveal();

    if (media) {
      const onChange = (event) => this._setReducedMotion(Boolean(event.matches));
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", onChange);
        this._cleanups.push(() => media.removeEventListener("change", onChange));
      } else if (typeof media.addListener === "function") {
        media.addListener(onChange);
        this._cleanups.push(() => media.removeListener(onChange));
      }
    }
    this._cleanups.push(() => this._cancelAllTimers());
  }

  onAttributeChange(name) {
    if (name === "lang") this._syncLanguage();
  }

  _initialText() {
    return this.isZh ? PICKED_ZH : PICKED_EN;
  }

  _initializeLanguage(lang) {
    this._currentLang = lang;
    const initial = lang === "zh" ? PICKED_ZH : PICKED_EN;
    this._committedText = initial;
    this._draftText = initial;
  }

  _syncLanguage() {
    const lang = this.currentLang;
    if (this._currentLang === null) {
      this._initializeLanguage(lang);
      return;
    }
    if (lang === this._currentLang) return;

    this._cancelOperation();
    this._currentLang = lang;
    const initial = lang === "zh" ? PICKED_ZH : PICKED_EN;
    this._mode = "idle";
    this._action = "improve";
    this._committedText = initial;
    this._draftText = initial;
    this._submittedCustomPrompt = null;
    this._expanded = false;
    this._explanation = "";
    this._announcement = "";
  }

  _cancelTimer(name) {
    const id = this[name];
    if (id !== null) {
      window.clearTimeout(id);
      window.clearInterval(id);
      this[name] = null;
    }
  }

  _cancelAllTimers() {
    this._cancelTimer("_thinkingTimer");
    this._cancelTimer("_streamTimer");
    this._cancelTimer("_revealTimer");
  }

  _cancelOperation() {
    this._operationToken += 1;
    this._cancelTimer("_thinkingTimer");
    this._cancelTimer("_streamTimer");
    this._stream = { count: 0, units: [] };
  }

  _scheduleReveal() {
    this._cancelTimer("_revealTimer");
    this._revealTimer = window.setTimeout(() => {
      this._revealTimer = null;
      this._shown = true;
      this.render();
    }, 280);
  }

  _setReducedMotion(reduced) {
    if (this._reducedMotion === reduced) return;
    this._reducedMotion = reduced;
    this._cancelTimer("_revealTimer");
    if (reduced) {
      this._shown = true;
      if (this._mode === "streaming") this._finishStream();
    } else {
      this._shown = false;
      this._scheduleReveal();
    }
    this.render();
  }

  _ensureSkeleton() {
    if (this._card?.isConnected) return;
    const zh = this.isZh;
    const lead = zh ? LEAD_ZH : LEAD_EN;
    this.setHtml(`
      <div class="w-full max-w-[520px]">
        <div class="relative rounded-card border border-transparent px-3 py-4 sm:px-4">
          <p class="text-[13px] leading-[1.75] text-ink">${escapeHtml(lead)}<span data-selection-text="" class="box-decoration-clone rounded-[4px] bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] px-0.5 text-ink dark:bg-accent-tint"></span></p>
          <div class="mt-3 flex justify-center"></div>
          <div role="status" aria-live="polite" aria-atomic="true" class="mt-2 min-h-4 text-center text-[10.5px] font-medium text-ink-3"></div>
        </div>
      </div>
    `);
    this._card = this.shadowRoot?.querySelector(".relative.rounded-card") ?? null;
    this._paragraph = this._card?.querySelector("p") ?? null;
    this._selection = this._card?.querySelector("[data-selection-text]") ?? null;
    this._toolbarMount = this._card?.querySelector(".mt-3.flex.justify-center") ?? null;
    this._status = this._card?.querySelector('[role="status"]') ?? null;
    this._toolbar = null;
  }

  _renderSelection() {
    if (!this._paragraph || !this._selection) return;
    const zh = this.isZh;
    const lead = zh ? LEAD_ZH : LEAD_EN;
    if (this._paragraph.firstChild?.nodeType === Node.TEXT_NODE) {
      this._paragraph.firstChild.nodeValue = lead;
    }

    const rewriteVisible = this._mode === "streaming" ||
      (this._mode === "result" && this._action !== "explain");
    if (this._mode !== "streaming") {
      this._selection.textContent = rewriteVisible
        ? this._draftText
        : this._committedText;
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const [index, unit] of this._stream.units.slice(0, this._stream.count).entries()) {
      const span = document.createElement("span");
      span.className = "inline [will-change:filter,opacity] motion-reduce:[animation:none] motion-reduce:[filter:none]";
      span.style.animation = "stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both";
      span.textContent = unit;
      span.dataset.streamIndex = String(index);
      fragment.appendChild(span);
    }
    if (this._stream.count < this._stream.units.length) {
      const caret = document.createElement("span");
      caret.className = "stream-caret is-streaming";
      caret.setAttribute("aria-hidden", "true");
      fragment.appendChild(caret);
    }
    this._selection.replaceChildren(fragment);
  }

  _renderExplanation() {
    const existing = this._card?.querySelector('[role="note"]');
    if (this._mode !== "result" || this._action !== "explain") {
      existing?.remove();
      return;
    }

    const zh = this.isZh;
    const markup = `<div role="note" class="mt-2.5 rounded-control border border-line bg-inset px-3 py-2 text-[11.5px] leading-relaxed text-ink-2 shadow-hairline"><span class="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">${zh ? "说明" : "Explanation"}</span>${escapeHtml(this._explanation)}</div>`;
    if (existing) {
      existing.outerHTML = markup;
    } else {
      this._toolbarMount?.insertAdjacentHTML("beforebegin", markup);
    }
  }

  _actionLabel() {
    const zh = this.isZh;
    if (this._action === "explain") return zh ? "解释" : "Explaining";
    if (this._action === "improve") return zh ? "优化" : "Improving";
    if (this._action === "shorten") return zh ? "精简" : "Shortening";
    if (this._action === "tone") return zh ? "调整语气" : "Changing tone";
    if (this._action === "grammar") return zh ? "修正文法" : "Fixing grammar";
    return this._submittedCustomPrompt === "shorter"
      ? zh ? "自定义精简" : "Applying shorter edit"
      : zh ? "自定义直接改写" : "Applying direct edit";
  }

  _busyMarkup() {
    const label = escapeHtml(this._actionLabel());
    const content = this._mode === "thinking"
      ? `<span class="shimmer-label bg-clip-text text-transparent text-[12.5px] font-medium" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${label}…</span>`
      : `<span>${label}…</span>`;
    return `<span class="inline-flex min-h-9 items-center gap-2 whitespace-nowrap px-3 text-[12.5px] font-medium text-ink-2"><span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 motion-safe:animate-spin" aria-hidden="true"></span>${content}</span>`;
  }

  _resultMarkup() {
    const zh = this.isZh;
    if (this._action === "explain") {
      return `<button type="button" class="${primaryClass}">${icons.check}${zh ? "完成" : "Done"}</button><button type="button" aria-label="${zh ? "重新解释" : "Explain again"}" class="${controlClass}">${icons.retry}${zh ? "重试" : "Try again"}</button>`;
    }
    return `<button type="button" class="${primaryClass}">${icons.check}${zh ? "保留" : "Keep"}</button><button type="button" class="${controlClass}">${icons.close}${zh ? "放弃" : "Discard"}</button><span class="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true"></span><button type="button" aria-label="${zh ? "重试" : "Try again"}" class="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors motion-reduce:transition-none hover:bg-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent">${icons.retry}</button>`;
  }

  _sendMarkup(resolved) {
    const zh = this.isZh;
    return `<button type="submit"${resolved ? "" : " disabled"} aria-label="${zh ? "发送编辑指令" : "Send edit instruction"}" class="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent">${icons.send}</button>`;
  }

  _idleMarkup() {
    const zh = this.isZh;
    const resolved = resolveCustomPrompt(this._prompt, zh);
    const send = this._prompt.trim() ? this._sendMarkup(resolved) : "";
    const extra = this._expanded
      ? `<button type="button" class="${controlClass}">${icons.shorten}${zh ? "精简" : "Shorten"}</button><button type="button" class="${controlClass}">${icons.tone}${zh ? "语气" : "Tone"}</button><button type="button" class="${controlClass}">${icons.grammar}${zh ? "语法" : "Grammar"}</button>`
      : "";
    const expandLabel = this._expanded
      ? zh ? "收起更多操作" : "Show fewer actions"
      : zh ? "展开更多操作" : "Show more actions";

    return `<form class="flex min-h-9 min-w-[148px] flex-1 items-center sm:flex-none"><input value="${escapeHtml(this._prompt)}" aria-label="${zh ? "描述修改要求" : "Describe edits"}" placeholder="${zh ? "描述修改要求" : "Describe edits"}" class="h-9 min-w-0 flex-1 bg-transparent pr-2 pl-3 text-[12px] text-ink placeholder:text-ink-3 focus:outline-none">${send}</form><span class="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true"></span><button type="button" class="${controlClass}">${icons.explain}${zh ? "解释" : "Explain"}</button><button type="button" class="${controlClass}">${icons.improve}${zh ? "优化" : "Improve"}</button>${extra}<button type="button" aria-label="${expandLabel}" aria-expanded="${this._expanded}" class="flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 motion-reduce:transition-none hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"><span class="flex transition-transform duration-200 motion-reduce:transition-none ${this._expanded ? "rotate-180" : "rotate-0"}">${icons.chevron}</span></button>`;
  }

  _syncPromptControl(input) {
    const form = input.closest("form");
    if (!form) return;

    const resolved = resolveCustomPrompt(this._prompt, this.isZh);
    let send = form.querySelector('button[type="submit"]');
    if (!this._prompt.trim()) {
      send?.remove();
      return;
    }
    if (!send) {
      form.insertAdjacentHTML("beforeend", this._sendMarkup(resolved));
      send = form.querySelector('button[type="submit"]');
    }
    if (send) send.disabled = !resolved;
  }

  _renderToolbar() {
    if (!this._toolbarMount) return;
    if (!this._shown) {
      this._toolbarMount.replaceChildren();
      this._toolbar = null;
      return;
    }

    if (!this._toolbar?.isConnected) {
      this._toolbar = document.createElement("div");
      this._toolbar.setAttribute("role", "toolbar");
      this._toolbar.tabIndex = -1;
      this._toolbar.className = "flex min-h-11 max-w-full flex-wrap items-center justify-center gap-1 rounded-[22px] border border-line bg-surface p-1 font-sans text-ink shadow-overlay focus:outline-none";
      this._toolbarMount.replaceChildren(this._toolbar);
    }

    const busy = this._mode === "thinking" || this._mode === "streaming";
    this._toolbar.setAttribute("aria-label", this.isZh ? "选中文本操作" : "Selection actions");
    this._toolbar.setAttribute("aria-busy", String(busy));
    this._toolbar.innerHTML = busy
      ? this._busyMarkup()
      : this._mode === "result"
        ? this._resultMarkup()
        : this._idleMarkup();
    this._wireToolbar();
  }

  _buttonWithText(text) {
    return [...(this._toolbar?.querySelectorAll("button") ?? [])].find(
      (button) => button.textContent?.trim() === text,
    ) ?? null;
  }

  _wireToolbar() {
    if (!this._toolbar) return;
    const zh = this.isZh;
    if (this._mode === "thinking" || this._mode === "streaming") return;

    if (this._mode === "result" && this._action === "explain") {
      this._buttonWithText(zh ? "完成" : "Done")?.addEventListener("click", () => {
        this._resetToolbar(zh ? "说明已关闭" : "Explanation closed", true);
      });
      this._buttonWithText(zh ? "重试" : "Try again")?.addEventListener("click", () => this._run(this._action));
      return;
    }

    if (this._mode === "result") {
      this._buttonWithText(zh ? "保留" : "Keep")?.addEventListener("click", () => this._keep());
      this._buttonWithText(zh ? "放弃" : "Discard")?.addEventListener("click", () => this._discard());
      this._toolbar.querySelector(`button[aria-label="${zh ? "重试" : "Try again"}"]`)?.addEventListener("click", () => this._run(this._action));
      return;
    }

    const input = this._toolbar.querySelector("input");
    input?.addEventListener("input", (event) => {
      this._prompt = event.target.value;
      this._syncPromptControl(event.target);
      this._renderStatus();
    });
    this._toolbar.querySelector("form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._prompt.trim()) this._run("custom");
    });

    this._buttonWithText(zh ? "解释" : "Explain")?.addEventListener("click", () => this._run("explain"));
    this._buttonWithText(zh ? "优化" : "Improve")?.addEventListener("click", () => this._run("improve"));
    this._buttonWithText(zh ? "精简" : "Shorten")?.addEventListener("click", () => this._run("shorten"));
    this._buttonWithText(zh ? "语气" : "Tone")?.addEventListener("click", () => this._run("tone"));
    this._buttonWithText(zh ? "语法" : "Grammar")?.addEventListener("click", () => this._run("grammar"));

    const expand = this._toolbar.querySelector("button[aria-expanded]");
    expand?.addEventListener("click", () => {
      this._expanded = !this._expanded;
      this._renderToolbar();
    });
  }

  _renderStatus() {
    if (!this._status) return;
    const unsupported = this._mode === "idle" &&
      this._prompt.trim().length > 0 &&
      !resolveCustomPrompt(this._prompt, this.isZh);
    this._status.textContent = unsupported
      ? unsupportedPromptStatus(this.isZh)
      : this._announcement;
  }

  _focusToolbar() {
    this._toolbar?.focus();
  }

  _focusResult() {
    const label = this._action === "explain"
      ? this.isZh ? "完成" : "Done"
      : this.isZh ? "保留" : "Keep";
    this._buttonWithText(label)?.focus();
  }

  _focusImprove() {
    this._buttonWithText(this.isZh ? "优化" : "Improve")?.focus();
  }

  _startStream(token) {
    this._cancelTimer("_streamTimer");
    this._streamTimer = window.setInterval(() => {
      if (token !== this._operationToken || this._mode !== "streaming") return;
      this._stream.count += 1;
      this._renderSelection();
      if (this._stream.count >= this._stream.units.length) this._finishStream();
    }, WORD_MS);
  }

  _finishStream() {
    if (this._mode !== "streaming") return;
    this._cancelTimer("_streamTimer");
    this._stream.count = this._stream.units.length;
    this._mode = "result";
    this._announcement = readyStatus(
      this._action,
      this.isZh,
      this._submittedCustomPrompt,
    );
    this.render();
    this._focusResult();
  }

  _run(action) {
    const customPrompt = action === "custom"
      ? resolveCustomPrompt(this._prompt, this.isZh)
      : null;
    if (action === "custom" && !customPrompt) {
      this._announcement = unsupportedPromptStatus(this.isZh);
      this._renderStatus();
      return;
    }

    this._cancelOperation();
    this._action = action;
    this._submittedCustomPrompt = customPrompt;
    this._expanded = false;
    this._explanation = "";
    this._announcement = progressStatus(action, this.isZh, customPrompt);

    if (this._reducedMotion) {
      if (action === "explain") {
        this._explanation = this.isZh ? EXPLANATION_ZH : EXPLANATION_EN;
        this._announcement = this._explanation;
      } else {
        this._draftText = rewriteFor(action, this.isZh, customPrompt);
        this._announcement = readyStatus(action, this.isZh, customPrompt);
      }
      this._mode = "result";
      this.render();
      this._focusResult();
      return;
    }

    this._mode = "thinking";
    this.render();
    this._focusToolbar();
    const token = this._operationToken;
    this._thinkingTimer = window.setTimeout(() => {
      this._thinkingTimer = null;
      if (token !== this._operationToken || this._mode !== "thinking") return;
      if (this._action === "explain") {
        this._explanation = this.isZh ? EXPLANATION_ZH : EXPLANATION_EN;
        this._announcement = this._explanation;
        this._mode = "result";
        this.render();
        this._focusResult();
        return;
      }

      this._draftText = rewriteFor(
        this._action,
        this.isZh,
        this._submittedCustomPrompt,
      );
      this._stream = { count: 0, units: streamUnits(this._draftText) };
      this._mode = "streaming";
      if (this._reducedMotion) {
        this._finishStream();
        return;
      }
      this.render();
      this._startStream(token);
    }, 700);
  }

  run(actionName) {
    const action = actionFromPublicName(actionName);
    if (action) this._run(action);
  }

  _resetToolbar(message, restoreFocus = false) {
    this._cancelOperation();
    this._mode = "idle";
    this._expanded = false;
    this._prompt = "";
    this._submittedCustomPrompt = null;
    this._explanation = "";
    this._announcement = message;
    this.render();
    if (restoreFocus) this._focusImprove();
  }

  _keep() {
    this._committedText = this._draftText;
    this._resetToolbar(this.isZh ? "已保留修改" : "Changes kept", true);
  }

  _discard() {
    this._draftText = this._committedText;
    this._resetToolbar(this.isZh ? "已放弃修改" : "Changes discarded", true);
  }

  reset() {
    this._cancelOperation();
    this._mode = "idle";
    this._action = "improve";
    this._committedText = this._initialText();
    this._draftText = this._committedText;
    this._prompt = "";
    this._submittedCustomPrompt = null;
    this._expanded = false;
    this._explanation = "";
    this._announcement = "";
    this.render();
  }

  render() {
    this._syncLanguage();
    this._ensureSkeleton();
    this._renderSelection();
    this._renderExplanation();
    this._renderToolbar();
    this._renderStatus();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-selection-actions")) {
  customElements.define("nai-selection-actions", NaiSelectionActions);
}
