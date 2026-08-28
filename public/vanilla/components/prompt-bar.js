import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

const SOURCES = [
  { key: "attach", nameEn: "Add photos & files", nameZh: "添加图片和文件", descEn: "Upload from computer", descZh: "从本地上传", icon: ICONS.clip },
  { key: "scoop", nameEn: "Scoop Data", nameZh: "Scoop 数据", descEn: "Sales & churn metrics", descZh: "销售与产量指标", icon: ICONS.chart },
  { key: "flavors", nameEn: "Flavor records", nameZh: "风味档案", descEn: "26 makers, tags, links", descZh: "26 家厂商与配方", icon: ICONS.layers },
  { key: "web", nameEn: "Web search", nameZh: "联网搜索", descEn: "Real-time news and info", descZh: "实时新闻与资讯", icon: ICONS.globe },
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

export class NaiPromptBar extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "lang", "placeholder"];
  }

  constructor() {
    super();
    this._draft = "";
    this._menu = null; // 'at' | 'slash' | null
    this._activeIdx = 0;
    this._modelOpen = false;
    this._model = MODELS[0];
    this._sweeping = false;
  }

  get variant() {
    return this.getAttribute("variant") || "Rounded";
  }

  get isPill() {
    return this.variant.toLowerCase() === "pill";
  }

  onMount() {
    // Optional click outside handler
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
      this._activeIdx = 0;
    } else {
      this._menu = null;
    }
    this.render();
  }

  _selectItem(item) {
    if (this._menu === "at") {
      this._draft = this._draft.replace(/@[\w-]*$/, `@${item.name} `);
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
    if (m.key === "sprinkles-5") {
      this._sweeping = true;
      this.registerTimeout(() => {
        this._sweeping = false;
        this.render();
      }, 1500);
    }
    this.render();
  }

  send() {
    if (!this._draft.trim()) return;
    const text = this._draft.trim();
    this.dispatchEvent(new CustomEvent("submit", { detail: { text, model: this._model.key } }));
    this._draft = "";
    this._menu = null;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const pill = this.isPill;
    const placeholder =
      this.getAttribute("placeholder") ||
      (zh ? "向 Agent 提问、输入 @ 关联资源，或输入 / 触发指令..." : "Ask the agent, type @ for sources, or / for commands...");

    const rows =
      this._menu === "at"
        ? SOURCES.map((s) => ({
            key: s.key,
            name: zh ? s.nameZh : s.nameEn,
            desc: zh ? s.descZh : s.descEn,
            icon: s.icon,
          }))
        : this._menu === "slash"
          ? COMMANDS.map((c) => ({
              key: c.key,
              name: c.name,
              desc: zh ? c.descZh : c.descEn,
              icon: ICONS.spark,
            }))
          : [];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          position: relative;
        }
        .composer {
          display: flex;
          flex-direction: column;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: ${pill ? "24px" : "var(--radius-card, 10px)"};
          box-shadow: var(--shadow-card);
          padding: 10px 12px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .composer:focus-within {
          border-color: var(--line-strong, #e0e2e5);
          box-shadow: var(--shadow-raised);
        }
        .sweep-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(61, 154, 255, 0.12), rgba(246, 143, 60, 0.12), rgba(61, 187, 114, 0.12), transparent);
          background-size: 200% 100%;
          animation: sweep-run 1.4s ease-out both;
        }
        @keyframes sweep-run {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        textarea {
          width: 100%;
          min-height: 48px;
          max-height: 140px;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 13.5px;
          color: var(--ink, #1f2124);
          resize: none;
          line-height: 1.5;
        }
        textarea::placeholder {
          color: var(--ink-3, #9a9da3);
        }
        .bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }
        .left-controls, .right-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: ${pill ? "50%" : "var(--radius-control, 8px)"};
          border: none;
          background: transparent;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-icon:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .model-picker-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .model-picker-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: ${pill ? "50%" : "var(--radius-control, 8px)"};
          border: none;
          background: ${this._draft.trim() ? "var(--accent, #0285ff)" : "var(--hover, #f4f5f6)"};
          color: ${this._draft.trim() ? "#fff" : "var(--ink-3, #9a9da3)"};
          cursor: ${this._draft.trim() ? "pointer" : "default"};
          transition: background-color 0.12s, color 0.12s;
        }
        /* Autocomplete Menu */
        .autocomplete-popup {
          position: absolute;
          bottom: 100%;
          left: 0;
          margin-bottom: 8px;
          width: 280px;
          background: var(--surface, #fff);
          border: 1px solid var(--line-strong, #e0e2e5);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-overlay);
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 50;
        }
        .menu-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          color: var(--ink, #1f2124);
          text-align: left;
          cursor: pointer;
          transition: background 0.1s;
        }
        .menu-row:hover {
          background: var(--hover, #f4f5f6);
        }
        .menu-row-icon {
          color: var(--ink-2, #62656b);
          display: flex;
          align-items: center;
        }
        .menu-row-content {
          display: flex;
          flex-direction: column;
        }
        .menu-row-title {
          font-size: 12.5px;
          font-weight: 500;
        }
        .menu-row-desc {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        /* Model Menu Popup */
        .model-popup {
          position: absolute;
          bottom: 100%;
          left: 12px;
          margin-bottom: 8px;
          width: 220px;
          background: var(--surface, #fff);
          border: 1px solid var(--line-strong, #e0e2e5);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-overlay);
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 50;
        }
        .model-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          color: var(--ink, #1f2124);
          font-size: 12.5px;
          cursor: pointer;
        }
        .model-item:hover {
          background: var(--hover, #f4f5f6);
        }
        .model-item.active {
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }
        .model-tag {
          font-size: 10.5px;
          padding: 1px 6px;
          border-radius: 4px;
          background: var(--inset, #f7f8f9);
          color: var(--ink-2, #62656b);
        }
      </style>

      ${this._menu && rows.length > 0 ? `
        <div class="autocomplete-popup">
          ${rows
            .map(
              (r) => `
                <button type="button" class="menu-row" data-key="${r.key}">
                  <span class="menu-row-icon">${r.icon}</span>
                  <div class="menu-row-content">
                    <span class="menu-row-title">${r.name}</span>
                    <span class="menu-row-desc">${r.desc}</span>
                  </div>
                </button>
              `
            )
            .join("")}
        </div>
      ` : ""}

      ${this._modelOpen ? `
        <div class="model-popup">
          ${MODELS.map((m) => `
            <button type="button" class="model-item ${m.key === this._model.key ? "active" : ""}" data-model="${m.key}">
              <span>${m.name}</span>
              <span class="model-tag">${zh ? m.tagZh : m.tagEn}</span>
            </button>
          `).join("")}
        </div>
      ` : ""}

      <div class="composer">
        ${this._sweeping ? `<div class="sweep-overlay"></div>` : ""}
        <textarea placeholder="${placeholder}">${this._draft}</textarea>
        <div class="bottom-bar">
          <div class="left-controls">
            <button type="button" class="btn-icon btn-plus" title="${zh ? "添加上下文 (@)" : "Add context (@)"}">
              ${ICONS.plus}
            </button>
            <button type="button" class="model-picker-btn" id="model-toggle">
              <span>${this._model.name}</span>
              <span>${ICONS.chevronDown}</span>
            </button>
          </div>
          <div class="right-controls">
            <button type="button" class="btn-icon btn-mic" title="${zh ? "语音输入" : "Dictate"}">
              ${ICONS.mic}
            </button>
            <button type="button" class="btn-send" title="${zh ? "发送" : "Send"}">
              ${ICONS.send}
            </button>
          </div>
        </div>
      </div>
    `;

    const textarea = this.shadowRoot.querySelector("textarea");
    textarea?.addEventListener("input", (e) => this._handleInput(e.target.value));
    textarea?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.send();
      }
    });

    this.shadowRoot.querySelector("#model-toggle")?.addEventListener("click", () => {
      this._modelOpen = !this._modelOpen;
      this._menu = null;
      this.render();
    });

    this.shadowRoot.querySelectorAll(".model-item").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-model");
        const found = MODELS.find((m) => m.key === key);
        if (found) this._selectModel(found);
      });
    });

    this.shadowRoot.querySelectorAll(".menu-row").forEach((el) => {
      el.addEventListener("click", () => {
        const key = el.getAttribute("data-key");
        const found = rows.find((r) => r.key === key);
        if (found) this._selectItem(found);
      });
    });

    this.shadowRoot.querySelector(".btn-plus")?.addEventListener("click", () => {
      this._menu = this._menu === "at" ? null : "at";
      this._modelOpen = false;
      this.render();
    });

    this.shadowRoot.querySelector(".btn-send")?.addEventListener("click", () => this.send());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-prompt-bar")) {
  customElements.define("nai-prompt-bar", NaiPromptBar);
}
