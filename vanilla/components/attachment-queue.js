import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_ATTACHMENTS = [
  { id: "report", name: "quarterly-report.pdf", kind: "pdf", size: "2.4 MB", state: "ready", progress: 100 },
  { id: "wireframe", name: "wireframe.png", kind: "image", size: "1.8 MB", state: "parsing", progress: 42 },
  { id: "interview", name: "interview.wav", kind: "audio", size: "18.7 MB", state: "indexing", progress: 64 },
  { id: "notes", name: "research-notes.pdf", kind: "pdf", size: "840 KB", state: "failed", progress: 38 },
];

const STATE_COPY = {
  uploading: { en: "Uploading", zh: "上传中", tone: "text-accent-ink", tint: "bg-accent" },
  parsing: { en: "Parsing", zh: "解析中", tone: "text-orange", tint: "bg-orange" },
  indexing: { en: "Indexing", zh: "索引中", tone: "text-accent-ink", tint: "bg-accent" },
  ready: { en: "Ready", zh: "已就绪", tone: "text-green", tint: "bg-green" },
  failed: { en: "Parse failed", zh: "解析失败", tone: "text-red", tint: "bg-red" },
};

export class NaiAttachmentQueue extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._attachments = [...INITIAL_ATTACHMENTS];
  }

  retry(id) {
    this._attachments = this._attachments.map((item) =>
      item.id === id ? { ...item, state: "uploading", progress: 0 } : item
    );
    this.render();
  }

  remove(id) {
    this._attachments = this._attachments.filter((item) => item.id !== id);
    this.render();
  }

  render() {
    const zh = this.isZh;

    this.setHtml(`
      <section class="w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "附件队列" : "Attachment queue"}
            </h3>
            <p class="mt-0.5 text-[11px] text-ink-3">
              ${zh ? "上传、解析并建立检索索引" : "Upload, parse, and index for retrieval"}
            </p>
          </div>
          <span class="rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2">
            ${this._attachments.length} ${zh ? "个文件" : "files"}
          </span>
        </div>

        <div class="divide-y divide-line">
          ${this._attachments
            .map((attachment) => {
              const copy = STATE_COPY[attachment.state];
              const active =
                attachment.state === "uploading" ||
                attachment.state === "parsing" ||
                attachment.state === "indexing";
              const label = attachment.kind === "pdf" ? "PDF" : attachment.kind === "image" ? "IMG" : "WAV";

              return `
              <div class="item flex gap-3 px-4 py-3 ${attachment.state === "failed" ? "bg-red-tint/35" : "bg-surface"}">
                <span class="flex h-8 w-9 shrink-0 items-center justify-center rounded-control border border-line bg-inset font-mono text-[9px] font-semibold text-ink-2">
                  ${label}
                </span>
                <div class="min-w-0 flex-1">
                  <div class="flex min-w-0 items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="truncate text-[12.5px] font-medium text-ink">${attachment.name}</p>
                      <p class="mt-0.5 font-mono text-[10px] text-ink-3">${attachment.size}</p>
                    </div>
                    <span class="shrink-0 text-[10.5px] font-medium ${copy.tone}">
                      ${zh ? copy.zh : copy.en}
                    </span>
                  </div>

                  ${
                    active
                      ? `
                    <div class="mt-2 flex items-center gap-2.5">
                      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-field">
                        <span
                          class="block h-full rounded-full transition-all duration-300 ${copy.tint}"
                          style="width: ${attachment.progress}%;"
                        ></span>
                      </div>
                      <span class="w-7 text-right font-mono text-[10px] tabular-nums text-ink-3">
                        ${attachment.progress}%
                      </span>
                    </div>
                  `
                      : ""
                  }

                  ${
                    attachment.state === "ready"
                      ? `
                    <p class="mt-1.5 text-[10.5px] text-ink-3">
                      ${zh ? "12 个片段可用于上下文" : "12 chunks ready for context"}
                    </p>
                  `
                      : ""
                  }

                  ${
                    attachment.state === "failed"
                      ? `
                    <div class="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        data-retry="${attachment.id}"
                        class="btn-retry rounded-control border border-line-strong bg-surface px-2 py-1 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer"
                      >
                        ${zh ? "重试" : "Retry"}
                      </button>
                      <button
                        type="button"
                        data-remove="${attachment.id}"
                        class="rounded-control px-2 py-1 text-[10.5px] text-ink-3 transition-colors hover:bg-hover hover:text-red cursor-pointer"
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
      </section>
    `);

    // Wire up events
    this.shadowRoot?.querySelectorAll("[data-retry]").forEach((el) => {
      el.addEventListener("click", () => this.retry(el.getAttribute("data-retry")));
    });

    this.shadowRoot?.querySelectorAll("[data-remove]").forEach((el) => {
      el.addEventListener("click", () => this.remove(el.getAttribute("data-remove")));
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-attachment-queue")) {
  customElements.define("nai-attachment-queue", NaiAttachmentQueue);
}
