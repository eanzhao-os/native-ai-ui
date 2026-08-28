import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_ATTACHMENTS = [
  {
    id: "report",
    name: "quarterly-report.pdf",
    kind: "pdf",
    size: "2.4 MB",
    state: "ready",
    progress: 100,
  },
  {
    id: "wireframe",
    name: "wireframe.png",
    kind: "image",
    size: "1.8 MB",
    state: "parsing",
    progress: 42,
  },
  {
    id: "interview",
    name: "interview.wav",
    kind: "audio",
    size: "18.7 MB",
    state: "indexing",
    progress: 64,
  },
  {
    id: "notes",
    name: "research-notes.pdf",
    kind: "pdf",
    size: "840 KB",
    state: "failed",
    progress: 38,
  },
];

const STATE_COPY = {
  uploading: {
    en: "Uploading",
    zh: "上传中",
    tone: "var(--accent-ink, #0170dd)",
    tint: "var(--accent, #0285ff)",
  },
  parsing: {
    en: "Parsing",
    zh: "解析中",
    tone: "var(--orange, #ef720c)",
    tint: "var(--orange, #ef720c)",
  },
  indexing: {
    en: "Indexing",
    zh: "索引中",
    tone: "var(--accent-ink, #0170dd)",
    tint: "var(--accent, #0285ff)",
  },
  ready: {
    en: "Ready",
    zh: "已就绪",
    tone: "var(--green, #189a4d)",
    tint: "var(--green, #189a4d)",
  },
  failed: {
    en: "Parse failed",
    zh: "解析失败",
    tone: "var(--red, #e3474c)",
    tint: "var(--red, #e3474c)",
  },
};

export class NaiAttachmentQueue extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._attachments = JSON.parse(JSON.stringify(INITIAL_ATTACHMENTS));
    this._announcement = "";
  }

  retry(id) {
    const zh = this.isZh;
    const item = this._attachments.find((a) => a.id === id);
    if (!item) return;
    this._attachments = this._attachments.map((a) =>
      a.id === id ? { ...a, state: "uploading", progress: 0 } : a
    );
    this._announcement = zh ? `正在重试 ${item.name}` : `Retrying ${item.name}`;
    this.render();
  }

  remove(id) {
    const zh = this.isZh;
    const item = this._attachments.find((a) => a.id === id);
    if (!item) return;
    this._attachments = this._attachments.filter((a) => a.id !== id);
    this._announcement = zh ? `已移除 ${item.name}` : `Removed ${item.name}`;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const attachments = this._attachments;

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
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
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
        .list {
          display: flex;
          flex-direction: column;
        }
        .item {
          display: flex;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          transition: background-color 0.2s;
        }
        .item:last-child {
          border-bottom: none;
        }
        .item.failed {
          background: var(--red-tint, #fcecec);
        }
        .file-mark {
          display: flex;
          height: 32px;
          width: 36px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 600;
          color: var(--ink-2, #62656b);
        }
        .item-content {
          min-width: 0;
          flex: 1;
        }
        .item-header {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .item-name {
          margin: 0;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-size {
          margin: 2px 0 0 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .status-text {
          flex-shrink: 0;
          font-size: 10.5px;
          font-weight: 500;
        }
        .progress-row {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .progress-bar-bg {
          height: 6px;
          flex: 1;
          overflow: hidden;
          border-radius: 99px;
          background: var(--field, #f2f2f3);
        }
        .progress-bar-fill {
          display: block;
          height: 100%;
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .progress-pct {
          width: 28px;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .ready-text {
          margin: 6px 0 0 0;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .action-row {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-retry {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-retry:hover {
          background: var(--hover, #f4f5f6);
        }
        .btn-remove {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 4px 8px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-remove:hover {
          background: var(--hover, #f4f5f6);
          color: var(--red, #e3474c);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>

      <section class="container" aria-labelledby="attachment-queue-title">
        <div class="header">
          <div>
            <h3 id="attachment-queue-title" class="title">
              ${zh ? "附件队列" : "Attachment queue"}
            </h3>
            <p class="subtitle">
              ${zh ? "上传、解析并建立检索索引" : "Upload, parse, and index for retrieval"}
            </p>
          </div>
          <span class="count-chip">
            ${attachments.length} ${zh ? "个文件" : "files"}
          </span>
        </div>

        <div class="list">
          ${attachments
            .map((att) => {
              const copy = STATE_COPY[att.state] ?? STATE_COPY.ready;
              const active =
                att.state === "uploading" ||
                att.state === "parsing" ||
                att.state === "indexing";
              const label = att.kind === "pdf" ? "PDF" : att.kind === "image" ? "IMG" : "WAV";

              return `
                <div class="item ${att.state === "failed" ? "failed" : ""}">
                  <span class="file-mark" aria-hidden="true">${label}</span>
                  <div class="item-content">
                    <div class="item-header">
                      <div style="min-width: 0;">
                        <p class="item-name">${att.name}</p>
                        <p class="item-size">${att.size}</p>
                      </div>
                      <span class="status-text" style="color: ${copy.tone};">
                        ${zh ? copy.zh : copy.en}
                      </span>
                    </div>

                    ${
                      active
                        ? `
                      <div class="progress-row">
                        <div
                          role="progressbar"
                          aria-label="${zh ? `${att.name} 上传进度` : `${att.name} upload progress`}"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-valuenow="${att.progress}"
                          class="progress-bar-bg"
                        >
                          <span
                            class="progress-bar-fill"
                            style="width: ${att.progress}%; background-color: ${copy.tint};"
                          ></span>
                        </div>
                        <span class="progress-pct">${att.progress}%</span>
                      </div>
                    `
                        : ""
                    }

                    ${
                      att.state === "ready"
                        ? `<p class="ready-text">${zh ? "12 个片段可用于上下文" : "12 chunks ready for context"}</p>`
                        : ""
                    }

                    ${
                      att.state === "failed"
                        ? `
                      <div class="action-row" role="alert">
                        <button
                          type="button"
                          class="btn-retry"
                          data-id="${att.id}"
                          aria-label="${zh ? "重试" : "Retry"} ${att.name}"
                        >
                          ${zh ? "重试" : "Retry"}
                        </button>
                        <button
                          type="button"
                          class="btn-remove"
                          data-id="${att.id}"
                          aria-label="${zh ? "移除" : "Remove"} ${att.name}"
                        >
                          ${zh ? "移除" : "Remove"}
                        </button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>

        <p class="sr-only" aria-live="polite">${this._announcement}</p>
      </section>
    `;

    this.shadowRoot.querySelectorAll(".btn-retry").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.retry(id);
      });
    });

    this.shadowRoot.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.remove(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-attachment-queue")) {
  customElements.define("nai-attachment-queue", NaiAttachmentQueue);
}
