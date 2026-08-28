import { NaiBaseElement } from "../core/base-element.js";

const TICKS = [600, 900, 2400, 1400, 2400, 600];

const X_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>`;
const CHECK_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>`;
const RETRY_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>`;

export class NaiTaskRows extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "lang", "auto"];
  }

  constructor() {
    super();
    this._tick = 0;
    this._manualOpen = {};
  }

  get variant() {
    return this.getAttribute("variant") || "Capsules";
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    if (this.autoPlay) {
      this._scheduleNext();
    }
  }

  _scheduleNext() {
    if (!this.autoPlay) return;
    if (this._tick >= TICKS.length - 1) return;
    this.registerTimeout(() => {
      this._tick = this._tick + 1;
      this.render();
      this._scheduleNext();
    }, TICKS[this._tick]);
  }

  toggleRow(key) {
    const isAutoOpen = key === "index" && this._tick === 2;
    const open = this._manualOpen[key] ?? isAutoOpen;
    this._manualOpen[key] = !open;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const tick = this._tick;
    const list = this.variant === "List";
    const row2 = tick < 3 ? "pending" : tick === 3 ? "failed" : "done";

    const renderSpinnerRing = (active, text) => {
      const size = 24;
      const stroke = 2;
      const r = (size - stroke) / 2;
      const c = 2 * Math.PI * r;
      return `
        <span class="relative inline-flex shrink-0 items-center justify-center" style="width: ${size}px; height: ${size}px;">
          <svg
            width="${size}" height="${size}" class="absolute inset-0"
            style="${active ? "animation: spin 1.1s linear infinite;" : ""}"
          >
            <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}" />
            ${
              active
                ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ink-3)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c * 0.28} ${c * 0.72}" />`
                : ""
            }
          </svg>
          <span class="relative text-[10.5px] font-semibold tabular-nums text-ink">${text}</span>
        </span>
      `;
    };

    const renderBadge = (tone, icon) => `
      <span
        class="flex size-5.5 shrink-0 items-center justify-center rounded-full text-white ${tone === "red" ? "bg-red" : "bg-green"}"
        style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;"
      >
        ${icon}
      </span>
    `;

    const rows = [
      {
        key: "verify",
        badgeHtml: renderBadge("green", CHECK_ICON),
        label: zh ? "校验供应商资质档案" : "Verified vendor records",
        amount: zh ? "12 家供应商" : "12 suppliers",
        pillHtml: `
          <span class="inline-flex h-5.5 items-center rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green">
            ${zh ? "已完成" : "Completed"}
          </span>
        `,
        details: [
          { label: zh ? "核对税务与联系人 ID" : "Matched tax and contact IDs", meta: "12/12" },
          { label: zh ? "标记过期记录" : "Flagged stale records", meta: "0" },
        ],
      },
      {
        key: "index",
        badgeHtml: renderSpinnerRing(true, "2"),
        label: zh ? "生成自动补货计划清单" : "Build reorder task list",
        amount: zh ? "7 款 SKU" : "7 SKUs",
        pillHtml: null,
        details: [
          { label: zh ? "读取 POS 导出数据" : "Reading POS export", meta: zh ? "3 个文件" : "3 files" },
          { label: zh ? "评估缺货断货风险" : "Scoring stockout risk", meta: "68%" },
        ],
      },
      {
        key: "draft",
        badgeHtml:
          row2 === "pending"
            ? renderSpinnerRing(false, "3")
            : row2 === "failed"
            ? renderBadge("red", X_ICON)
            : renderBadge("green", CHECK_ICON),
        label: zh ? "起草供应商跟进邮件" : "Draft supplier emails",
        amount: zh ? "2 封草稿" : "2 messages",
        pillHtml:
          row2 === "failed"
            ? `
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-red-tint px-2 text-[11.5px] font-medium text-red" style="animation: fade-in 200ms ease-out both">
            ${zh ? "失败重试中" : "Failed"} <span style="animation: spin 1.2s linear infinite" class="flex">${RETRY_ICON}</span>
          </span>
        `
            : row2 === "done"
            ? `
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green" style="animation: fade-in 200ms ease-out both">
            ${zh ? "已完成" : "Completed"}
          </span>
        `
            : null,
        details: [
          { label: zh ? "脆筒供应商跟进通知" : "Cone supplier follow-up", meta: zh ? "草稿" : "draft" },
          { label: zh ? "开心果原料补货备注" : "Pistachio reorder note", meta: zh ? "草稿" : "draft" },
        ],
      },
    ];

    const html = `
      <div
        class="flex w-full max-w-110 flex-col ${
          list ? "gap-0 self-start overflow-hidden rounded-card bg-surface shadow-card" : "min-h-[196px] gap-2"
        }"
      >
        ${rows
          .map((row, i) => {
            const open = this._manualOpen[row.key] ?? (row.key === "index" && tick === 2);
            return `
              <div
                class="self-stretch overflow-hidden transition-[border-radius] duration-300 ${
                  list ? "border-b border-line last:border-0" : "bg-surface shadow-card"
                }"
                style="border-radius: ${list ? 0 : open ? 14 : 22}px; animation: fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both;"
              >
                <button
                  type="button"
                  aria-expanded="${open}"
                  data-key="${row.key}"
                  class="row-btn flex h-11 w-full items-center gap-2.5 px-2.5 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
                >
                  ${row.badgeHtml}
                  <span class="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                    ${row.label}
                  </span>
                  <span class="shrink-0 text-[12px] text-ink-3">
                    ${row.amount}
                  </span>
                  ${row.pillHtml || ""}
                </button>

                <!-- details dropdown -->
                ${
                  open
                    ? `
                  <div class="details-box border-t border-line/60 bg-inset/50 px-3 py-2 text-[11.5px] space-y-1">
                    ${row.details
                      .map(
                        (d) => `
                      <div class="flex items-center justify-between text-ink-2">
                        <span>${d.label}</span>
                        <span class="font-mono text-[10.5px] text-ink-3">${d.meta}</span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
              </div>
            `;
          })
          .join("")}
      </div>
    `;

    this.setHtml(html);

    this.shadowRoot.querySelectorAll(".row-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key) this.toggleRow(key);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-task-rows")) {
  customElements.define("nai-task-rows", NaiTaskRows);
}
