import { NaiBaseElement } from "../core/base-element.js";

const TICKS = [600, 900, 2400, 1400, 2400, 600];

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
    const current = this._manualOpen[key] ?? isAutoOpen;
    this._manualOpen[key] = !current;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const tick = this._tick;
    const isList = this.variant === "List";
    const row2State = tick < 3 ? "pending" : tick === 3 ? "failed" : "done";

    const rows = [
      {
        key: "verify",
        badgeType: "check",
        label: zh ? "校验供应商资质档案" : "Verified vendor records",
        amount: zh ? "12 家供应商" : "12 suppliers",
        pillHtml: `
          <span class="pill-badge pill-green">
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
        badgeType: "spinner-active",
        badgeNum: "2",
        label: zh ? "生成自动补货计划清单" : "Build reorder task list",
        amount: zh ? "7 款 SKU" : "7 SKUs",
        pillHtml: "",
        details: [
          { label: zh ? "读取 POS 导出数据" : "Reading POS export", meta: zh ? "3 个文件" : "3 files" },
          { label: zh ? "评估缺货断货风险" : "Scoring stockout risk", meta: "68%" },
        ],
      },
      {
        key: "draft",
        badgeType: row2State === "pending" ? "spinner-idle" : row2State === "failed" ? "cross" : "check",
        badgeNum: "3",
        label: zh ? "起草供应商跟进邮件" : "Draft supplier emails",
        amount: zh ? "2 封草稿" : "2 messages",
        pillHtml:
          row2State === "failed"
            ? `
          <span class="pill-badge pill-red">
            ${zh ? "失败重试中" : "Failed"}
            <span class="spin icon-flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/></svg>
            </span>
          </span>
        `
            : row2State === "done"
            ? `
          <span class="pill-badge pill-green">
            ${zh ? "已完成" : "Completed"}
          </span>
        `
            : "",
        details: [
          { label: zh ? "脆筒供应商跟进通知" : "Cone supplier follow-up", meta: zh ? "草稿" : "draft" },
          { label: zh ? "开心果原料补货备注" : "Pistachio reorder note", meta: zh ? "草稿" : "draft" },
        ],
      },
    ];

    const renderBadge = (row) => {
      if (row.badgeType === "check") {
        return `
          <span class="badge-pop badge-green">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
        `;
      }
      if (row.badgeType === "cross") {
        return `
          <span class="badge-pop badge-red">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
        `;
      }
      const isActive = row.badgeType === "spinner-active";
      const size = 24;
      const stroke = 2;
      const r = (size - stroke) / 2;
      const c = 2 * Math.PI * r;
      return `
        <span class="spinner-ring-wrap">
          <svg width="${size}" height="${size}" class="spinner-svg ${isActive ? "spin" : ""}">
            <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--line, #ecedef)" stroke-width="${stroke}" />
            ${
              isActive
                ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--ink-3, #9a9da3)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c * 0.28} ${c * 0.72}" />`
                : ""
            }
          </svg>
          <span class="spinner-num">${row.badgeNum}</span>
        </span>
      `;
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 440px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          display: flex;
          width: 100%;
          flex-direction: column;
          ${isList ? "gap: 0; overflow: hidden; border-radius: var(--radius-card, 10px); background: var(--surface, #fff); box-shadow: var(--shadow-card, 0 0 0 1px var(--line)); border: 1px solid var(--line, #ecedef);" : "min-height: 196px; gap: 8px;"}
        }
        .row-card {
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          transition: border-radius 0.3s ease;
          ${isList ? "border-bottom: 1px solid var(--line, #ecedef); background: var(--surface, #fff);" : "background: var(--surface, #fff); box-shadow: var(--shadow-card, 0 0 0 1px var(--line)); border: 1px solid var(--line, #ecedef);"}
        }
        ${isList ? ".row-card:last-child { border-bottom: none; }" : ""}
        .row-btn {
          display: flex;
          height: 44px;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          border: none;
          background: transparent;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.1s ease;
        }
        .row-btn:hover {
          background-color: var(--hover, #f4f5f6);
        }
        .badge-pop {
          display: flex;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          animation: pop-in 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .badge-green { background: var(--green, #189a4d); }
        .badge-red { background: var(--red, #e3474c); }
        .spinner-ring-wrap {
          position: relative;
          display: inline-flex;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }
        .spinner-svg {
          position: absolute;
          inset: 0;
        }
        .spinner-num {
          position: relative;
          font-size: 10.5px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .row-label {
          min-width: 0;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .row-amount {
          flex-shrink: 0;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }
        .pill-badge {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 99px;
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          animation: fade-in 200ms ease-out both;
        }
        .pill-green {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .pill-red {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .details-box {
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 12px;
          font-size: 11.5px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--ink-2, #62656b);
        }
        .detail-meta {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1.1s linear infinite;
        }
        .icon-flex {
          display: flex;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        ${rows
          .map((row, i) => {
            const isAutoOpen = row.key === "index" && tick === 2;
            const open = this._manualOpen[row.key] ?? isAutoOpen;
            const radiusStyle = isList ? "border-radius: 0;" : `border-radius: ${open ? 14 : 22}px;`;

            return `
              <div
                class="row-card"
                style="${radiusStyle} animation: fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both;"
              >
                <button
                  type="button"
                  class="row-btn"
                  data-key="${row.key}"
                  aria-expanded="${open}"
                >
                  ${renderBadge(row)}
                  <span class="row-label">${row.label}</span>
                  <span class="row-amount">${row.amount}</span>
                  ${row.pillHtml}
                </button>

                ${
                  open
                    ? `
                  <div class="details-box">
                    ${row.details
                      .map(
                        (d) => `
                      <div class="detail-line">
                        <span>${d.label}</span>
                        <span class="detail-meta">${d.meta}</span>
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
