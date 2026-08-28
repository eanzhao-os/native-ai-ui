import { NaiBaseElement } from "../core/base-element.js";

const BRANCHES = [
  {
    model: "GPT-5.2",
    time: "10:41",
    answerEn: "Start with retrieval failures: 38% of missed answers share the same stale index.",
    answerZh: "先排查检索失败：38% 的漏答都指向同一个过期索引。",
  },
  {
    model: "Claude Sonnet 4.6",
    time: "10:42",
    answerEn: "The strongest signal is latency. Re-index before changing prompts.",
    answerZh: "最强信号是延迟。先重建索引，再考虑调整提示词。",
  },
  {
    model: "Gemini 3.1 Pro",
    time: "10:43",
    answerEn: "Compare a fresh-index cohort while keeping the prompt unchanged.",
    answerZh: "对比新索引样本，并保持提示词不变。",
  },
];

export class NaiMessageBranches extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._branchIndex = 1;
    this._continuingFrom = null;
  }

  navigate(nextIndex) {
    if (nextIndex < 0 || nextIndex >= BRANCHES.length) return;
    this._branchIndex = nextIndex;
    this._continuingFrom = null;
    this.render();
  }

  continueFromCurrent() {
    this._continuingFrom = this._branchIndex;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const branchIndex = this._branchIndex;
    const branch = BRANCHES[branchIndex];
    const continuingFrom = this._continuingFrom;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .title {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .body {
          padding: 16px;
        }
        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .green-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green, #189a4d);
        }
        .model-info {
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }
        .answer-text {
          margin: 12px 0 0 0;
          min-height: 64px;
          font-size: 13px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .footer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
        }
        .nav-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-nav {
          display: flex;
          height: 28px;
          width: 32px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          font-size: 14px;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-btn);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-nav:hover:not(:disabled) {
          background-color: var(--hover, #f4f5f6);
        }
        .btn-nav:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .btn-continue {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--ink, #1f2124);
          padding: 6px 12px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--surface, #fff);
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-continue:hover {
          opacity: 0.85;
        }
        .status-msg {
          margin: 8px 0 0 0;
          min-height: 16px;
          text-align: right;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
        }
      </style>

      <section class="container" aria-labelledby="message-branches-title">
        <header class="header">
          <div>
            <h3 id="message-branches-title" class="title">
              ${zh ? "回答分支" : "Answer branches"}
            </h3>
            <p class="subtitle">
              ${zh ? "比较重新生成的回答" : "Compare regenerated responses"}
            </p>
          </div>
          <span class="count-chip">
            ${branchIndex + 1} / ${BRANCHES.length}
          </span>
        </header>

        <div class="body">
          <div class="meta-row">
            <span class="green-dot" aria-hidden="true"></span>
            <span class="model-info">${branch.model} · ${branch.time}</span>
          </div>

          <p class="answer-text" aria-live="polite">
            ${zh ? branch.answerZh : branch.answerEn}
          </p>

          <div class="footer">
            <div class="nav-btns">
              <button
                type="button"
                class="btn-nav"
                id="btn-prev"
                aria-label="${zh ? "上一个分支" : "Previous branch"}"
                ${branchIndex === 0 ? "disabled" : ""}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                class="btn-nav"
                id="btn-next"
                aria-label="${zh ? "下一个分支" : "Next branch"}"
                ${branchIndex === BRANCHES.length - 1 ? "disabled" : ""}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <button
              type="button"
              class="btn-continue"
              id="btn-continue"
              aria-label="${zh ? "从此分支继续" : "Continue from this branch"}"
            >
              ${zh ? "从此分支继续" : "Continue from here"}
            </button>
          </div>

          <p role="status" aria-live="polite" class="status-msg">
            ${
              continuingFrom === null
                ? ""
                : zh
                ? `正从分支 ${continuingFrom + 1} 继续`
                : `Continuing from branch ${continuingFrom + 1}`
            }
          </p>
        </div>
      </section>
    `;

    this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click", () => this.navigate(this._branchIndex - 1));
    this.shadowRoot.querySelector("#btn-next")?.addEventListener("click", () => this.navigate(this._branchIndex + 1));
    this.shadowRoot.querySelector("#btn-continue")?.addEventListener("click", () => this.continueFromCurrent());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-message-branches")) {
  customElements.define("nai-message-branches", NaiMessageBranches);
}
