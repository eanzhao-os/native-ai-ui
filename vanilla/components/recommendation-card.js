import { NaiBaseElement } from "../core/base-element.js";

const OPTIONS = [
  {
    key: "high",
    bodyZh: '建议从供应商 <code class="code-chip accent">cone_king</code> 追加补货华夫脆筒，预计交付周期为 <code class="code-chip accent">7_days</code>。',
    bodyEn: 'Reorder waffle cones from <code class="code-chip accent">cone_king</code> with lead time <code class="code-chip accent">7_days</code>.',
    shortZh: "从 cone_king 补货 · 7天到货",
    shortEn: "Reorder from cone_king · 7-day lead",
    signal: 3,
    tone: "var(--green, #189a4d)",
    labelZh: "高置信度推荐",
    labelEn: "High confidence",
    ctaZh: "采纳建议",
    ctaEn: "Accept",
    ctaStyle: "cta-accent",
  },
  {
    key: "review",
    bodyZh: '为迎接旺季需求，建议将香草原料配方切换为 <code class="code-chip orange">vanilla_madagascar</code>。',
    bodyEn: 'Switch vanilla to <code class="code-chip orange">vanilla_madagascar</code> for peak season.',
    shortZh: "切换为马达加斯加香草配方",
    shortEn: "Switch to vanilla_madagascar",
    signal: 2,
    tone: "var(--orange, #ef720c)",
    labelZh: "需要人工复核",
    labelEn: "Needs review",
    ctaZh: "配置参数",
    ctaEn: "Configure",
    ctaStyle: "cta-dark",
  },
  {
    key: "none",
    bodyZh: "对所有库存 SKU 发起全量紧急补货流程。",
    bodyEn: "Trigger a full restock cycle across every catalog SKU.",
    shortZh: "全品类 SKU 紧急补货",
    shortEn: "Full restock across every SKU",
    signal: 0,
    tone: "var(--line-strong, #e0e2e5)",
    labelZh: "无足够置信信号",
    labelEn: "No signal",
    ctaZh: "忽略",
    ctaEn: "Dismiss",
    ctaStyle: "cta-ghost",
  },
];

export class NaiRecommendationCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._activeKey = "high";
    this._openDrawer = false;
  }

  setActiveKey(key) {
    this._activeKey = key;
    this._openDrawer = false;
    this.render();
  }

  toggleDrawer() {
    this._openDrawer = !this._openDrawer;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const current = OPTIONS.find((o) => o.key === this._activeKey) || OPTIONS[0];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .body-card {
          padding: 16px;
        }

        .recommendation-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
          margin: 0;
        }

        .code-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
        }

        .code-chip.accent {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .code-chip.orange {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }

        .drawer {
          margin-top: 14px;
          border-top: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .drawer-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-3, #9a9da3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .alt-option {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 8px;
          text-align: left;
          font-size: 12px;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .alt-option:hover {
          background: var(--hover, #f4f5f6);
        }

        .alt-option.selected {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }

        .alt-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 16px;
        }

        .signal-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signal-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        .signal-bar {
          width: 4px;
          height: 10px;
          border-radius: 2px;
        }

        .signal-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .action-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-alt {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }

        .btn-alt:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-cta {
          border-radius: var(--radius-control, 8px);
          border: none;
          padding: 4px 12px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.1s, opacity 0.12s;
        }

        .btn-cta:active {
          transform: scale(0.96);
        }

        .cta-accent {
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .cta-dark {
          background: var(--ink, #1f2124);
          color: var(--canvas, #f1f2f3);
        }

        .cta-ghost {
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="body-card">
        <p class="recommendation-text">
          ${zh ? current.bodyZh : current.bodyEn}
        </p>

        ${
          this._openDrawer
            ? `
          <div class="drawer">
            <span class="drawer-title">${zh ? "备选方案" : "Alternative Actions"}</span>
            ${OPTIONS.map((opt) => {
              const isSel = opt.key === this._activeKey;
              return `
                <button type="button" class="alt-option ${isSel ? "selected" : ""}" data-key="${opt.key}">
                  <span>${zh ? opt.shortZh : opt.shortEn}</span>
                  <span class="alt-tag">${zh ? opt.labelZh : opt.labelEn}</span>
                </button>
              `;
            }).join("")}
          </div>
        `
            : ""
        }
      </div>

      <div class="footer">
        <div class="signal-group">
          <div class="signal-bars">
            <span class="signal-bar" style="background: ${current.signal >= 1 ? current.tone : "var(--line-strong, #e0e2e5)"}"></span>
            <span class="signal-bar" style="background: ${current.signal >= 2 ? current.tone : "var(--line-strong, #e0e2e5)"}"></span>
            <span class="signal-bar" style="background: ${current.signal >= 3 ? current.tone : "var(--line-strong, #e0e2e5)"}"></span>
          </div>
          <span class="signal-label">${zh ? current.labelZh : current.labelEn}</span>
        </div>

        <div class="action-group">
          <button type="button" class="btn-alt" id="btn-toggle-alt">
            ${zh ? "备选方案" : "Alternatives"}
          </button>
          <button type="button" class="btn-cta ${current.ctaStyle}">
            ${zh ? current.ctaZh : current.ctaEn}
          </button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#btn-toggle-alt")?.addEventListener("click", () => this.toggleDrawer());

    this.shadowRoot.querySelectorAll(".alt-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key) this.setActiveKey(key);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-recommendation-card")) {
  customElements.define("nai-recommendation-card", NaiRecommendationCard);
}
