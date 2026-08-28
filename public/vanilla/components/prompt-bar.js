import { NaiBaseElement } from "../core/base-element.js";

const SOURCES = [
  { key: "attach", nameEn: "Add photos & files", nameZh: "添加图片和文件", descEn: "Upload from your computer", descZh: "从本地上传", glyph: "clip", attach: true },
  { key: "scoop", nameEn: "Scoop Data", nameZh: "Scoop 数据", descEn: "Sales & churn metrics", descZh: "销售与产量指标", glyph: "chart" },
  { key: "flavors", nameEn: "Flavor records", nameZh: "风味档案", descEn: "26 makers, tags, links", descZh: "26 家厂商、标签与链接", glyph: "layers" },
  { key: "web", nameEn: "Web search", nameZh: "联网搜索", descEn: "Real-time news and info", descZh: "实时新闻与资讯", glyph: "globe" },
];

const COMMANDS = [
  { key: "compare", name: "/compare", descEn: "Flavor vs. last summer", descZh: "对比风味与去年同期销量" },
  { key: "churn-plan", name: "/churn-plan", descEn: "Draft a churn schedule", descZh: "起草搅拌生产排期" },
  { key: "restock", name: "/restock", descEn: "Build a reorder list", descZh: "生成补货清单" },
  { key: "draft-email", name: "/draft-email", descEn: "Write a supplier email", descZh: "撰写供应商邮件" },
  { key: "summarize", name: "/summarize", descEn: "Digest the thread so far", descZh: "总结当前对话要点" },
];

const MODELS = [
  { key: "sprinkles-5", name: "Sprinkles 5", tagEn: "Flagship", tagZh: "旗舰" },
  { key: "vanilla-1", name: "Vanilla 1", tagEn: "Basic", tagZh: "基础" },
  { key: "freezer-burn", name: "Freezer Burn 0.4", tagEn: "Stale", tagZh: "过时" },
];

const GLYPHS = {
  clip: `<path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />`,
  chart: `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />`,
  layers: `<g><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>`,
  globe: `<g><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></g>`,
};

export class NaiPromptBar extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "lang"];
  }

  constructor() {
    super();
    this._draft = "";
    this._menu = null; // 'at' | 'slash' | 'plus' | null
    this._modelOpen = false;
    this._model = MODELS[0];
    this._listening = false;
    this._attachments = [];
  }

  get variant() {
    return this.getAttribute("variant") || "Rounded";
  }

  get isPill() {
    return this.variant.toLowerCase() === "pill";
  }

  onMount() {
    this.registerListener(document, "click", (e) => {
      if (!this.contains(e.target) && !this.shadowRoot?.contains(e.target)) {
        if (this._menu || this._modelOpen) {
          this._menu = null;
          this._modelOpen = false;
          this.render();
        }
      }
    });
  }

  _parseToken(draft) {
    const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);
    if (!match) return null;
    return {
      kind: match[2] === "@" ? "at" : "slash",
      query: match[3].toLowerCase(),
      start: match.index + match[1].length,
    };
  }

  _handleInput(val) {
    this._draft = val;
    const tok = this._parseToken(val);
    if (tok) {
      this._menu = tok.kind;
    } else if (this._menu === "at" || this._menu === "slash") {
      this._menu = null;
    }
    this.render();
  }

  _selectItem(item) {
    if (this._menu === "at" || this._menu === "plus") {
      if (item.attach) {
        this._attachments.push("uploaded-file.pdf");
      } else {
        this._draft = this._draft.replace(/@[\w-]*$/, `@${item.nameEn} `);
      }
    } else if (this._menu === "slash") {
      this._draft = item.name + " ";
    }
    this._menu = null;
    this.render();
    const textarea = this.shadowRoot?.querySelector("textarea");
    if (textarea) {
      textarea.focus();
      textarea.value = this._draft;
    }
  }

  _selectModel(m) {
    this._model = m;
    this._modelOpen = false;
    this.render();
  }

  send() {
    if (!this._draft.trim() && this._attachments.length === 0) return;
    const detail = {
      text: this._draft.trim(),
      model: this._model.key,
    };
    this.dispatchEvent(new CustomEvent("submit", { detail }));
    this._draft = "";
    this._attachments = [];
    this._menu = null;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const pill = this.isPill;
    const canSend = this._draft.trim().length > 0 || this._attachments.length > 0;
    const expanded = this._draft.length > 40 || this._draft.includes("\n");

    const rows =
      this._menu === "at" || this._menu === "plus"
        ? SOURCES.map((s) => ({ ...s, name: zh ? s.nameZh : s.nameEn, desc: zh ? s.descZh : s.descEn }))
        : this._menu === "slash"
        ? COMMANDS.map((c) => ({ ...c, name: c.name, desc: zh ? c.descZh : c.descEn }))
        : [];

    this.setHtml(`
      <div class="relative w-full max-w-lg select-none">
        {/* Dropdown Menu */}
        ${
          this._menu && rows.length > 0
            ? `
          <div
            class="absolute left-0 bottom-full z-20 mb-2 w-72 rounded-card border border-line bg-surface p-1 shadow-raised overflow-hidden"
            style="animation: pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;"
          >
            <div class="flex flex-col gap-0.5 max-h-56 overflow-y-auto">
              ${rows
                .map(
                  (row, i) => `
                <button
                  type="button"
                  data-idx="${i}"
                  class="menu-item flex h-9 w-full items-center gap-2.5 rounded-[6px] px-2 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
                >
                  ${
                    row.glyph
                      ? `<span class="flex size-5.5 shrink-0 items-center justify-center text-ink-2">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            ${GLYPHS[row.glyph]}
                          </svg>
                        </span>`
                      : ""
                  }
                  <span class="shrink-0 text-[12.5px] font-medium text-ink">${row.name}</span>
                  <span class="min-w-0 flex-1 truncate text-[12px] text-ink-3">${row.desc}</span>
                </button>
              `
                )
                .join("")}
            </div>
            <div class="mt-1 border-t border-line px-2 pt-1.5 pb-1 text-[11px] text-ink-3">
              ${this._menu === "at" ? (zh ? "输入以搜索数据源与文件" : "Type to search sources & files") : zh ? "输入以搜索命令" : "Type to search commands"}
            </div>
          </div>
        `
            : ""
        }

        {/* Model Menu */}
        ${
          this._modelOpen
            ? `
          <div
            class="absolute right-0 bottom-full z-20 mb-2 w-44 rounded-card border border-line bg-surface p-1 shadow-raised overflow-hidden"
            style="animation: pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;"
          >
            ${MODELS.map(
              (m) => `
              <button
                type="button"
                data-model="${m.key}"
                class="model-item flex h-7.5 w-full items-center gap-2 rounded-[6px] px-2 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
              >
                <span class="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">${m.name}</span>
                <span class="shrink-0 text-[11px] text-ink-3">${zh ? m.tagZh : m.tagEn}</span>
                <span class="shrink-0 text-ink ${m.key === this._model.key ? "" : "opacity-0"}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </button>
            `
            ).join("")}
          </div>
        `
            : ""
        }

        {/* Main Composer Box */}
        <div
          class="relative isolate flex flex-col gap-1.5 overflow-hidden border border-line bg-surface p-1.5 shadow-card transition-all duration-150 ${
            pill ? (this._attachments.length > 0 || expanded ? "rounded-[24px]" : "rounded-full") : "rounded-[14px]"
          }"
        >
          ${
            this._attachments.length > 0
              ? `
            <div class="flex flex-wrap gap-1.5 pt-0.5 ${pill ? "px-1" : "px-0.5"}">
              ${this._attachments
                .map(
                  (file, idx) => `
                <span class="flex h-6.5 items-center gap-1.5 bg-field py-1 pr-1 pl-1.5 text-[11.5px] text-ink-2 shadow-xs ${
                  pill ? "rounded-full" : "rounded-chip"
                }">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                  <span class="max-w-36 truncate">${file}</span>
                  <button type="button" data-remove="${idx}" class="flex size-4 items-center justify-center text-ink-3 hover:text-ink cursor-pointer">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          <div
            class="grid items-end gap-x-1 gap-y-1.5 ${
              expanded ? "grid-cols-[minmax(0,1fr)_auto_28px_28px]" : "grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]"
            }"
          >
            {/* Plus button */}
            <button
              type="button"
              aria-label="${zh ? "添加附件与数据源" : "Add attachments and sources"}"
              class="plus-btn flex size-7 shrink-0 items-center justify-center justify-self-start text-ink-3 transition-colors duration-150 hover:bg-hover hover:text-ink cursor-pointer ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${this._menu === "plus" ? "bg-hover text-ink" : ""}"
              style="grid-column-start: 1; grid-row-start: ${expanded ? "2" : "1"};"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>

            {/* Input textarea */}
            <textarea
              rows="1"
              placeholder="${zh ? "输入消息…" : "Write a message…"}"
              aria-label="${zh ? "提示词输入框" : "Prompt"}"
              class="min-h-7 min-w-0 w-full resize-none bg-transparent px-1 py-[5px] text-[13px] leading-[18px] text-ink outline-none placeholder:text-ink-3"
              style="
                grid-column: ${expanded ? "1 / -1" : "2"};
                grid-row-start: 1;
              "
            >${this._draft}</textarea>

            {/* Model Picker button */}
            <button
              type="button"
              aria-label="${zh ? "选择模型" : "Choose model"}"
              class="model-picker-btn flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink cursor-pointer ${
                pill ? "rounded-full" : "rounded-[8px]"
              }"
              style="grid-column-start: ${expanded ? "2" : "3"}; grid-row-start: ${expanded ? "2" : "1"};"
            >
              <span>${this._model.name}</span>
              <span class="text-ink-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            {/* Dictation button */}
            <button
              type="button"
              aria-label="${zh ? "听写" : "Dictation"}"
              class="mic-btn flex size-7 shrink-0 items-center justify-center transition-colors duration-150 cursor-pointer ${
                pill ? "rounded-full" : "rounded-[8px]"
              } ${this._listening ? "bg-accent-tint text-accent-ink" : "text-ink-3 hover:bg-hover hover:text-ink"}"
              style="grid-column-start: ${expanded ? "3" : "4"}; grid-row-start: ${expanded ? "2" : "1"};"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
              </svg>
            </button>

            {/* Send button */}
            <button
              type="button"
              aria-label="${zh ? "发送" : "Send"}"
              ${!canSend ? "disabled" : ""}
              class="send-btn flex size-7 shrink-0 items-center justify-center transition-all duration-200 ${
                pill ? "rounded-full" : "rounded-[8px]"
              }"
              style="
                grid-column-start: ${expanded ? "4" : "5"};
                grid-row-start: ${expanded ? "2" : "1"};
                background: ${canSend ? "var(--ink)" : "var(--line-strong)"};
                color: ${canSend ? "var(--surface)" : "var(--ink-2)"};
                cursor: ${canSend ? "pointer" : "default"};
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `);

    // Wire up interactions
    const textarea = this.shadowRoot?.querySelector("textarea");
    const plusBtn = this.shadowRoot?.querySelector(".plus-btn");
    const modelPickerBtn = this.shadowRoot?.querySelector(".model-picker-btn");
    const micBtn = this.shadowRoot?.querySelector(".mic-btn");
    const sendBtn = this.shadowRoot?.querySelector(".send-btn");

    if (textarea) {
      textarea.addEventListener("input", (e) => this._handleInput(e.target.value));
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.send();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener("click", () => {
        this._modelOpen = false;
        this._menu = this._menu === "plus" ? null : "plus";
        this.render();
      });
    }

    if (modelPickerBtn) {
      modelPickerBtn.addEventListener("click", () => {
        this._menu = null;
        this._modelOpen = !this._modelOpen;
        this.render();
      });
    }

    if (micBtn) {
      micBtn.addEventListener("click", () => {
        this._listening = !this._listening;
        if (this._listening) {
          this._draft = zh ? "对比开心果口味周末销量与去年同期" : "Compare pistachio weekends to last summer";
        }
        this.render();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.send());
    }

    this.shadowRoot?.querySelectorAll(".menu-item").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = Number(el.getAttribute("data-idx"));
        this._selectItem(rows[idx]);
      });
    });

    this.shadowRoot?.querySelectorAll(".model-item").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-model");
        const found = MODELS.find((m) => m.key === key);
        if (found) this._selectModel(found);
      });
    });

    this.shadowRoot?.querySelectorAll("[data-remove]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(el.getAttribute("data-remove"));
        this._attachments.splice(idx, 1);
        this.render();
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-prompt-bar")) {
  customElements.define("nai-prompt-bar", NaiPromptBar);
}
