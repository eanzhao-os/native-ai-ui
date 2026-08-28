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

    const html = `
      <section
        aria-labelledby="message-branches-title"
        class="w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        <header class="flex items-start justify-between gap-4 border-b border-line bg-inset px-4 py-3">
          <div>
            <h3
              id="message-branches-title"
              class="text-[13px] font-semibold text-ink"
            >
              ${zh ? "回答分支" : "Answer branches"}
            </h3>
            <p class="mt-0.5 text-[11px] text-ink-3">
              ${zh ? "比较重新生成的回答" : "Compare regenerated responses"}
            </p>
          </div>
          <span class="rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2">
            ${branchIndex + 1} / ${BRANCHES.length}
          </span>
        </header>

        <div class="px-4 py-4">
          <div class="flex items-center gap-2 text-[10.5px] text-ink-3">
            <span class="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true"></span>
            <span class="font-medium text-ink-2">
              ${branch.model} · ${branch.time}
            </span>
          </div>

          <p
            aria-live="polite"
            class="mt-3 min-h-16 text-[13px] leading-6 text-ink"
          >
            ${zh ? branch.answerZh : branch.answerEn}
          </p>

          <div class="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                id="btn-prev"
                aria-label="${zh ? "上一个分支" : "Previous branch"}"
                ${branchIndex === 0 ? "disabled" : ""}
                class="flex h-7 w-8 items-center justify-center rounded-control border border-line bg-surface text-sm text-ink-2 shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none cursor-pointer"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                id="btn-next"
                aria-label="${zh ? "下一个分支" : "Next branch"}"
                ${branchIndex === BRANCHES.length - 1 ? "disabled" : ""}
                class="flex h-7 w-8 items-center justify-center rounded-control border border-line bg-surface text-sm text-ink-2 shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none cursor-pointer"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <button
              type="button"
              id="btn-continue"
              aria-label="${zh ? "从此分支继续" : "Continue from this branch"}"
              class="rounded-control bg-ink px-3 py-1.5 text-[10.5px] font-medium text-surface transition-opacity hover:opacity-85 motion-reduce:transition-none cursor-pointer"
            >
              ${zh ? "从此分支继续" : "Continue from here"}
            </button>
          </div>

          <p
            role="status"
            aria-live="polite"
            class="mt-2 min-h-4 text-right text-[10.5px] font-medium text-accent-ink"
          >
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

    this.setHtml(html);

    this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click", () => this.navigate(this._branchIndex - 1));
    this.shadowRoot.querySelector("#btn-next")?.addEventListener("click", () => this.navigate(this._branchIndex + 1));
    this.shadowRoot.querySelector("#btn-continue")?.addEventListener("click", () => this.continueFromCurrent());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-message-branches")) {
  customElements.define("nai-message-branches", NaiMessageBranches);
}
