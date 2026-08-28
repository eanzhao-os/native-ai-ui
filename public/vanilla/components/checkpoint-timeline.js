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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
          overflow: hidden;
        }
        .header {
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-sub {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .body-grid {
          display: grid;
          grid-template-columns: 12rem 1fr;
        }
        @media (max-width: 640px) {
          .body-grid {
            grid-template-columns: 1fr;
          }
        }
        .sidebar {
          border-right: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.45);
          padding: 12px;
          margin: 0;
          list-style: none;
        }
        @media (max-width: 640px) {
          .sidebar {
            border-right: none;
            border-bottom: 1px solid var(--line, #ecedef);
          }
        }
        .timeline-item {
          position: relative;
          padding-bottom: 8px;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-line {
          position: absolute;
          top: 28px;
          bottom: 0;
          left: 0.68rem;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
          pointer-events: none;
        }
        .nav-btn {
          position: relative;
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          padding: 8px;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background-color 0.15s;
        }
        .nav-btn:hover {
          background: var(--hover, #f4f5f6);
        }
        .nav-selected-current {
          background: var(--green-tint, #e8f5ed);
        }
        .nav-selected-other {
          background: var(--accent-tint, #e9f3ff);
        }
        .dot-indicator {
          margin-top: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          flex-shrink: 0;
        }
        .dot-current {
          border-color: var(--green, #189a4d);
          background: var(--green, #189a4d);
        }
        .dot-selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
        }
        .btn-text-wrap {
          min-width: 0;
        }
        .btn-title {
          display: block;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .btn-time {
          margin-top: 2px;
          display: block;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .main-pane {
          min-width: 0;
          padding: 16px;
        }
        .detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .detail-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .detail-summary {
          margin: 4px 0 0 0;
          font-size: 11px;
          line-height: 1.4;
          color: var(--ink-3, #9a9da3);
        }
        .detail-time {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .snapshot-card {
          margin-top: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 12px;
        }
        .snapshot-title {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--ink-3, #9a9da3);
          margin: 0;
        }
        .files-list {
          margin: 8px 0 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .file-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .file-m {
          color: var(--accent-ink, #0170dd);
        }

        .alert-box {
          margin-top: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid rgba(239, 114, 12, 0.35);
          background: var(--orange-tint, #fdf1e5);
          padding: 10px 12px;
        }
        .alert-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .alert-desc {
          margin: 4px 0 0 0;
          font-size: 10px;
          line-height: 1.4;
          color: var(--ink-3, #9a9da3);
        }
        .alert-actions {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .btn-cancel {
          border-radius: var(--radius-control, 8px);
          padding: 6px 10px;
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .btn-cancel:hover {
          background: var(--hover, #f4f5f6);
        }
        .btn-confirm {
          border-radius: var(--radius-control, 8px);
          background: var(--orange, #ef720c);
          padding: 6px 10px;
          font-size: 10.5px;
          font-weight: 500;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .btn-confirm:hover {
          opacity: 0.85;
        }

        .btn-restore {
          margin-top: 12px;
          width: 100%;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          padding: 8px 12px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 1px 2px #1018280d);
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .btn-restore:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
        }
        .btn-restore:disabled {
          cursor: not-allowed;
          background: var(--inset, #f7f8f9);
          color: var(--ink-3, #9a9da3);
          box-shadow: none;
        }

        .announcement {
          margin: 8px 0 0 0;
          min-height: 16px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
      </style>

      <section class="card" aria-labelledby="checkpoint-timeline-title">
        <header class="header">
          <h3 id="checkpoint-timeline-title" class="header-title">
            ${zh ? "执行检查点" : "Execution checkpoints"}
          </h3>
          <p class="header-sub">
            ${zh ? "检查并恢复智能体的执行状态" : "Inspect and restore agent execution state"}
          </p>
        </header>

        <div class="body-grid">
          <ol class="sidebar">
            ${CHECKPOINTS.map((item, index) => {
              const itemTitle = zh ? item.titleZh : item.titleEn;
              const itemCurrent = index === this._current;
              const itemSelected = index === this._selected;

              const selClass = itemSelected
                ? itemCurrent
                  ? "nav-selected-current"
                  : "nav-selected-other"
                : "";

              const dotClass = itemCurrent
                ? "dot-current"
                : itemSelected
                ? "dot-selected"
                : "";

              return `
                <li class="timeline-item">
                  ${index < CHECKPOINTS.length - 1 ? `<span class="timeline-line" aria-hidden="true"></span>` : ""}
                  <button
                    type="button"
                    class="nav-btn ${selClass}"
                    data-idx="${index}"
                    aria-label="${zh ? "选择检查点" : "Select checkpoint"} ${itemTitle}"
                    aria-pressed="${itemSelected}"
                    ${itemCurrent ? 'aria-current="step"' : ""}
                  >
                    <span class="dot-indicator ${dotClass}" aria-hidden="true"></span>
                    <span class="btn-text-wrap">
                      <span class="btn-title">${itemTitle}</span>
                      <span class="btn-time">
                        ${item.time}${itemCurrent ? ` · ${zh ? "当前" : "current"}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              `;
            }).join("")}
          </ol>

          <div class="main-pane">
            <div class="detail-header">
              <div>
                <p class="detail-title">${title}</p>
                <p class="detail-summary">${zh ? checkpoint.summaryZh : checkpoint.summaryEn}</p>
              </div>
              <span class="detail-time">${checkpoint.time}</span>
            </div>

            <div class="snapshot-card">
              <p class="snapshot-title">${zh ? "文件快照" : "File snapshot"}</p>
              <ul class="files-list">
                ${checkpoint.files
                  .map(
                    (file) => `
                  <li class="file-item">
                    <span class="file-m" aria-hidden="true">M</span>
                    <span>${file}</span>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            ${
              this._confirming
                ? `
              <div role="alert" class="alert-box">
                <p class="alert-title">${zh ? `恢复“${title}”？` : `Restore “${title}”?`}</p>
                <p class="alert-desc">
                  ${zh ? "后续文件改动将被替换。" : "Later file changes will be replaced."}
                </p>
                <div class="alert-actions">
                  <button type="button" class="btn-cancel" id="btn-cancel-restore">
                    ${zh ? "取消" : "Cancel"}
                  </button>
                  <button type="button" class="btn-confirm" id="btn-confirm-restore">
                    ${zh ? "确认恢复" : "Confirm restore"}
                  </button>
                </div>
              </div>
            `
                : `
              <button
                type="button"
                id="btn-trigger-restore"
                class="btn-restore"
                ${isCurrent ? "disabled" : ""}
                aria-label="${
                  isCurrent
                    ? zh
                      ? "当前检查点"
                      : "Current checkpoint"
                    : zh
                    ? "恢复检查点"
                    : "Restore checkpoint"
                }"
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

            <p role="status" aria-live="polite" class="announcement">
              ${this._announcement}
            </p>
          </div>
        </div>
      </section>
    `;

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
