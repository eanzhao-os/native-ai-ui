import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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

  toggleOption(idx) {
    const zh = this.isZh;
    const questions = zh ? QUESTIONS_ZH : QUESTIONS_EN;
    const currentQ = questions[this._qi];
    const picked = this._answers[this._qi] ?? [];

    if (currentQ.type === "radio") {
      this._answers[this._qi] = [idx];
      this._custom[this._qi] = "";
      this.render();

      this.registerTimeout(() => {
        if (this._qi === questions.length - 1) {
          this._sent = true;
        } else {
          this._qi = Math.min(questions.length - 1, this._qi + 1);
        }
        this.render();
      }, 450);
    } else {
      if (picked.includes(idx)) {
        this._answers[this._qi] = picked.filter((i) => i !== idx);
      } else {
        this._answers[this._qi] = [...picked, idx];
      }
      this.render();
    }
  }

  next() {
    const zh = this.isZh;
    const questions = zh ? QUESTIONS_ZH : QUESTIONS_EN;
    if (this._qi < questions.length - 1) {
      this._qi++;
      this.render();
    } else {
      this._sent = true;
      this.render();
    }
  }

  prev() {
    if (this._qi > 0) {
      this._qi--;
      this.render();
    }
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
    const questions = zh ? QUESTIONS_ZH : QUESTIONS_EN;
    const total = questions.length;
    const q = questions[this._qi];
    const selected = this._answers[this._qi] ?? [];
    const isLast = this._qi === total - 1;
    const hasAnswer = selected.length > 0 || Boolean(this._custom[this._qi]?.trim());

    if (!this._open) {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: inline-block; font-family: var(--font-sans, sans-serif); }
          button {
            padding: 8px 14px;
            background: var(--surface, #fff);
            color: var(--ink, #1f2124);
            border: 1px solid var(--line-strong, #e0e2e5);
            border-radius: var(--radius-control, 8px);
            box-shadow: var(--shadow-btn);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.12s;
          }
          button:hover { background: var(--hover, #f4f5f6); }
        </style>
        <button type="button" id="reopen-btn">${zh ? "打开审批流卡片" : "Open approval card"}</button>
      `;
      this.shadowRoot.querySelector("#reopen-btn")?.addEventListener("click", () => {
        this._open = true;
        this.render();
      });
      return;
    }

    if (this._sent) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 420px;
            background: var(--surface, #fff);
            border: 1px solid var(--line, #ecedef);
            border-radius: var(--radius-card, 10px);
            box-shadow: var(--shadow-card);
            font-family: var(--font-sans, sans-serif);
            color: var(--ink, #1f2124);
            overflow: hidden;
            animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            border-bottom: 1px solid var(--line, #ecedef);
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink-2, #62656b);
          }
          .body {
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            text-align: center;
          }
          .success-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--green-tint, #e8f5ed);
            color: var(--green, #189a4d);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .title {
            font-size: 14px;
            font-weight: 600;
            color: var(--ink, #1f2124);
          }
          .desc {
            font-size: 12.5px;
            color: var(--ink-2, #62656b);
            line-height: 1.5;
          }
          .btn-reset {
            margin-top: 6px;
            padding: 6px 14px;
            border-radius: var(--radius-control, 8px);
            border: 1px solid var(--line-strong, #e0e2e5);
            background: var(--surface, #fff);
            color: var(--ink, #1f2124);
            font-size: 12.5px;
            cursor: pointer;
            transition: background-color 0.12s;
          }
          .btn-reset:hover { background: var(--hover, #f4f5f6); }
        </style>
        <div class="header">
          <span>${zh ? "人类反馈完成" : "Approval Submitted"}</span>
          <span style="color: var(--green, #189a4d);">✓ ${zh ? "已确认" : "Approved"}</span>
        </div>
        <div class="body">
          <div class="success-icon">${ICONS.check}</div>
          <div class="title">${zh ? "已向 Agent 发送决策指引" : "Decision dispatched to Agent"}</div>
          <div class="desc">${zh ? "Agent 已根据您的输入更新执行链路并恢复工作。" : "The agent has incorporated your input and resumed execution."}</div>
          <button type="button" class="btn-reset" id="reset-btn">${zh ? "重新模拟提问" : "Restart demo"}</button>
        </div>
      `;
      this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click", () => this.reset());
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 420px;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-card);
          font-family: var(--font-sans, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          font-size: 12px;
        }
        .header-title {
          font-weight: 600;
          color: var(--ink-2, #62656b);
        }
        .header-progress {
          color: var(--ink-3, #9a9da3);
          font-family: var(--font-mono, monospace);
        }
        .body {
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .question-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.4;
          color: var(--ink, #1f2124);
        }
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .option-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          color: var(--ink, #1f2124);
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.12s, background-color 0.12s;
          user-select: none;
        }
        .option-item:hover {
          background: var(--hover, #f4f5f6);
          border-color: var(--line-strong, #e0e2e5);
        }
        .option-item.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }
        .indicator {
          width: 14px;
          height: 14px;
          border-radius: ${q.type === "radio" ? "50%" : "4px"};
          border: 1.5px solid var(--line-strong, #e0e2e5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface, #fff);
          flex-shrink: 0;
        }
        .option-item.selected .indicator {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .btn-nav {
          padding: 5px 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-nav:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-nav:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-primary {
          padding: 5px 12px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.9;
        }
        .btn-primary:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      </style>

      <div class="header">
        <span class="header-title">${zh ? "决策审批" : "Human Approval"}</span>
        <span class="header-progress">${zh ? `第 ${this._qi + 1} / ${total} 题` : `${this._qi + 1} of ${total}`}</span>
      </div>

      <div class="body">
        <div class="question-title">${q.q}</div>
        <div class="options-list">
          ${q.options
            .map((opt, idx) => {
              const isSelected = selected.includes(idx);
              return `
                <div class="option-item ${isSelected ? "selected" : ""}" data-idx="${idx}">
                  <span class="indicator">${isSelected ? "✓" : ""}</span>
                  <span>${opt}</span>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="footer">
        <button type="button" class="btn-nav btn-prev" ${this._qi === 0 ? "disabled" : ""}>
          ${zh ? "上一题" : "Previous"}
        </button>
        <button type="button" class="btn-primary btn-next" ${hasAnswer ? "" : "disabled"}>
          ${isLast ? (zh ? "提交并执行" : "Submit & resume") : zh ? "下一题" : "Next"}
        </button>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".option-item").forEach((el) => {
      el.addEventListener("click", () => {
        const idx = parseInt(el.getAttribute("data-idx"), 10);
        this.toggleOption(idx);
      });
    });

    this.shadowRoot.querySelector(".btn-prev")?.addEventListener("click", () => this.prev());
    this.shadowRoot.querySelector(".btn-next")?.addEventListener("click", () => this.next());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-approval-card")) {
  customElements.define("nai-approval-card", NaiApprovalCard);
}
