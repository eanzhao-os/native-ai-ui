import { NaiBaseElement } from "../core/base-element.js";

const CHECKPOINTS = [
  {
    id: "before",
    titleEn: "Before edits",
    titleZh: "编辑前",
    time: "10:31",
    files: ["app/page.tsx", "components/chat.tsx"],
    summaryEn: "Clean baseline before the agent changed the chat flow.",
    summaryZh: "智能体修改聊天流程前的干净基线。",
  },
  {
    id: "edited",
    titleEn: "Implementation",
    titleZh: "实现完成",
    time: "10:38",
    files: ["app/page.tsx", "components/chat.tsx", "tests/chat.test.tsx"],
    summaryEn: "Streaming behavior updated and regression coverage added.",
    summaryZh: "已更新流式交互，并新增回归测试。",
  },
  {
    id: "verified",
    titleEn: "Verified",
    titleZh: "验证通过",
    time: "10:42",
    files: ["tests/chat.test.tsx"],
    summaryEn: "Checks passed; this is the current execution state.",
    summaryZh: "检查已通过；这是当前执行状态。",
  },
];

export class NaiCheckpointTimeline extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._selected = 1;
    this._current = 2;
    this._confirming = false;
    this._announcement = "";
  }

  selectCheckpoint(index) {
    this._selected = index;
    this._confirming = false;
    this.render();
  }

  confirmRestore() {
    this._current = this._selected;
    this._confirming = false;
    const checkpoint = CHECKPOINTS[this._selected];
    const title = this.isZh ? checkpoint.titleZh : checkpoint.titleEn;
    this._announcement = this.isZh ? `已恢复“${title}”` : `Restored “${title}”`;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const checkpoint = CHECKPOINTS[this._selected];
    const title = zh ? checkpoint.titleZh : checkpoint.titleEn;
    const isCurrent = this._selected === this._current;

    const extraCss = `
      .bg-inset\\/45 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 45%, transparent); }
      .border-orange\\/35 { border-color: color-mix(in srgb, var(--orange, #ef720c) 35%, transparent); }
      .grid-cols-\\[12rem_1fr\\] { grid-template-columns: 12rem 1fr; }
      @media (max-width: 768px) {
        .md\\:grid-cols-\\[12rem_1fr\\] { grid-template-columns: 1fr; }
        .md\\:border-r { border-right-width: 0; }
        .md\\:border-b-0 { border-bottom-width: 1px; }
      }
      @media (min-width: 768px) {
        .md\\:grid-cols-\\[12rem_1fr\\] { grid-template-columns: 12rem 1fr; }
        .md\\:border-r { border-right-width: 1px; }
        .md\\:border-b-0 { border-bottom-width: 0; }
      }
      .leading-5 { line-height: 20px; }
      .leading-4 { line-height: 16px; }
      .min-h-4 { min-height: 16px; }
    `;

    this.setHtml(`
      <section
        aria-labelledby="checkpoint-timeline-title"
        class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        <header class="border-b border-line bg-inset px-4 py-3">
          <h3
            id="checkpoint-timeline-title"
            class="text-[13px] font-semibold text-ink"
          >
            ${zh ? "执行检查点" : "Execution checkpoints"}
          </h3>
          <p class="mt-0.5 text-[11px] text-ink-3">
            ${zh ? "检查并恢复智能体的执行状态" : "Inspect and restore agent execution state"}
          </p>
        </header>

        <div class="grid md:grid-cols-[12rem_1fr]">
          <ol class="border-b border-line bg-inset/45 p-3 md:border-r md:border-b-0">
            ${CHECKPOINTS.map((item, index) => {
              const itemTitle = zh ? item.titleZh : item.titleEn;
              const itemCurrent = index === this._current;
              const itemSelected = index === this._selected;

              return `
                <li class="relative pb-2 last:pb-0">
                  ${
                    index < CHECKPOINTS.length - 1
                      ? `<span
                          aria-hidden="true"
                          class="absolute top-7 bottom-0 left-[0.68rem] w-px bg-line-strong"
                        ></span>`
                      : ""
                  }
                  <button
                    type="button"
                    data-idx="${index}"
                    aria-label="${zh ? "选择检查点" : "Select checkpoint"} ${itemTitle}"
                    aria-pressed="${itemSelected}"
                    ${itemCurrent ? 'aria-current="step"' : ""}
                    class="nav-btn relative flex w-full items-start gap-2.5 rounded-control px-2 py-2 text-left transition-colors motion-reduce:transition-none ${
                      itemSelected
                        ? itemCurrent
                          ? "bg-green-tint"
                          : "bg-accent-tint"
                        : "hover:bg-hover"
                    }"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                        itemCurrent
                          ? "border-green bg-green"
                          : itemSelected
                            ? "border-accent bg-accent"
                            : "border-line-strong bg-surface"
                      }"
                    ></span>
                    <span class="min-w-0">
                      <span class="block text-[11.5px] font-medium text-ink">
                        ${itemTitle}
                      </span>
                      <span class="mt-0.5 block font-mono text-[9.5px] text-ink-3">
                        ${item.time}${itemCurrent ? ` · ${zh ? "当前" : "current"}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              `;
            }).join("")}
          </ol>

          <div class="min-w-0 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-[12.5px] font-semibold text-ink">${title}</p>
                <p class="mt-1 text-[11px] leading-5 text-ink-3">
                  ${zh ? checkpoint.summaryZh : checkpoint.summaryEn}
                </p>
              </div>
              <span class="shrink-0 font-mono text-[10px] text-ink-3">
                ${checkpoint.time}
              </span>
            </div>

            <div class="mt-3 rounded-control border border-line bg-inset px-3 py-2.5">
              <p class="text-[9.5px] font-semibold tracking-wide text-ink-3 uppercase">
                ${zh ? "文件快照" : "File snapshot"}
              </p>
              <ul class="mt-2 space-y-1">
                ${checkpoint.files
                  .map(
                    (file) => `
                  <li class="flex items-center gap-2 font-mono text-[10px] text-ink-2">
                    <span class="text-accent-ink" aria-hidden="true">M</span>
                    ${file}
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            ${
              this._confirming
                ? `
              <div
                role="alert"
                class="mt-3 rounded-control border border-orange/35 bg-orange-tint px-3 py-2.5"
              >
                <p class="text-[11.5px] font-medium text-ink">
                  ${zh ? `恢复“${title}”？` : `Restore “${title}”?`}
                </p>
                <p class="mt-1 text-[10px] leading-4 text-ink-3">
                  ${
                    zh
                      ? "后续文件改动将被替换。"
                      : "Later file changes will be replaced."
                  }
                </p>
                <div class="mt-2.5 flex justify-end gap-2">
                  <button
                    type="button"
                    id="btn-cancel-restore"
                    aria-label="${zh ? "取消恢复" : "Cancel restore"}"
                    class="rounded-control px-2.5 py-1.5 text-[10.5px] text-ink-2 transition-colors hover:bg-hover motion-reduce:transition-none"
                  >
                    ${zh ? "取消" : "Cancel"}
                  </button>
                  <button
                    type="button"
                    id="btn-confirm-restore"
                    aria-label="${zh ? "确认恢复" : "Confirm restore"}"
                    class="rounded-control bg-orange px-2.5 py-1.5 text-[10.5px] font-medium text-surface transition-opacity hover:opacity-85 motion-reduce:transition-none"
                  >
                    ${zh ? "确认恢复" : "Confirm restore"}
                  </button>
                </div>
              </div>
            `
                : `
              <button
                type="button"
                id="btn-trigger-restore"
                aria-label="${
                  isCurrent
                    ? zh
                      ? "当前检查点"
                      : "Current checkpoint"
                    : zh
                      ? "恢复检查点"
                      : "Restore checkpoint"
                }"
                ${isCurrent ? "disabled" : ""}
                class="mt-3 w-full rounded-control border border-line-strong bg-surface px-3 py-2 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:bg-inset disabled:text-ink-3 disabled:shadow-none motion-reduce:transition-none"
              >
                ${
                  isCurrent
                    ? zh
                      ? "当前检查点"
                      : "Current checkpoint"
                    : zh
                      ? "恢复到此检查点"
                      : "Restore this checkpoint"
                }
              </button>
            `
            }

            <p
              role="status"
              aria-live="polite"
              class="mt-2 min-h-4 text-[10.5px] font-medium text-green"
            >
              ${this._announcement}
            </p>
          </div>
        </div>
      </section>
    `, extraCss);

    this.shadowRoot.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        this.selectCheckpoint(idx);
      });
    });

    this.shadowRoot.querySelector("#btn-trigger-restore")?.addEventListener("click", () => {
      this._confirming = true;
      this.render();
    });

    this.shadowRoot.querySelector("#btn-cancel-restore")?.addEventListener("click", () => {
      this._confirming = false;
      this.render();
    });

    this.shadowRoot.querySelector("#btn-confirm-restore")?.addEventListener("click", () => {
      this.confirmRestore();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-checkpoint-timeline")) {
  customElements.define("nai-checkpoint-timeline", NaiCheckpointTimeline);
}
