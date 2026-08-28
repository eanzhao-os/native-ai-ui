import { NaiBaseElement } from "../core/base-element.js";

const OPTIONS = [
  {
    key: "high",
    bodyZh: '建议从供应商 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> 追加补货华夫脆筒，预计交付周期为 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>。',
    bodyEn: 'Reorder waffle cones from <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> with lead time <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>.',
    shortZh: "从 cone_king 补货 · 7天到货",
    shortEn: "Reorder from cone_king · 7-day lead",
    signal: 3,
    tone: "var(--green)",
    labelZh: "高置信度推荐",
    labelEn: "High confidence",
    ctaZh: "采纳建议",
    ctaEn: "Accept",
    ctaStyle: "bg-accent text-white",
  },
  {
    key: "review",
    bodyZh: '为迎接旺季需求，建议将香草原料配方切换为 <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code>。',
    bodyEn: 'Switch vanilla to <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code> for peak season.',
    shortZh: "切换为马达加斯加香草配方",
    shortEn: "Switch to vanilla_madagascar",
    signal: 2,
    tone: "var(--orange)",
    labelZh: "需要人工复核",
    labelEn: "Needs review",
    ctaZh: "配置参数",
    ctaEn: "Configure",
    ctaStyle: "bg-ink text-canvas",
  },
  {
    key: "none",
    bodyZh: "对所有库存 SKU 发起全量紧急补货流程。",
    bodyEn: "Trigger a full restock cycle across every catalog SKU.",
    shortZh: "全品类 SKU 紧急补货",
    shortEn: "Full restock across every SKU",
    signal: 0,
    tone: "var(--line-strong)",
    labelZh: "无足够置信信号",
    labelEn: "No signal",
    ctaZh: "忽略",
    ctaEn: "Dismiss",
    ctaStyle: "bg-field text-ink-3",
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

    this.setHtml(`
      <div class="w-full max-w-95 overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div class="p-4">
          <div class="flex items-start justify-between gap-3">
            <p class="text-[13px] leading-relaxed text-ink">
              ${zh ? current.bodyZh : current.bodyEn}
            </p>
          </div>

          
          ${
            this._openDrawer
              ? `
            <div class="mt-3.5 border-t border-line/60 pt-3 space-y-1">
              <span class="text-[11px] font-semibold text-ink-3 uppercase tracking-wider block mb-2">
                ${zh ? "备选方案" : "Alternative Actions"}
              </span>
              ${OPTIONS.map((opt) => {
                const isSel = opt.key === this._activeKey;
                return `
                  <button
                    key="${opt.key}"
                    type="button"
                    data-key="${opt.key}"
                    class="alt-option flex w-full items-center justify-between rounded-control p-2 text-left text-[12px] transition-colors cursor-pointer ${
                      isSel ? "bg-accent-tint text-accent-ink font-medium" : "hover:bg-hover text-ink-2"
                    }"
                  >
                    <span>${zh ? opt.shortZh : opt.shortEn}</span>
                    <span class="font-mono text-[10px] text-ink-3">${zh ? opt.labelZh : opt.labelEn}</span>
                  </button>
                `;
              }).join("")}
            </div>
          `
              : ""
          }
        </div>

        
        <div class="flex items-center justify-between border-t border-line bg-inset px-4 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex items-end gap-0.5">
              <span class="w-1 rounded-full" style="height: 10px; background: ${
                current.signal >= 1 ? current.tone : "var(--line-strong)"
              };"></span>
              <span class="w-1 rounded-full" style="height: 10px; background: ${
                current.signal >= 2 ? current.tone : "var(--line-strong)"
              };"></span>
              <span class="w-1 rounded-full" style="height: 10px; background: ${
                current.signal >= 3 ? current.tone : "var(--line-strong)"
              };"></span>
            </span>
            <span class="text-[12px] font-medium text-ink-2">${zh ? current.labelZh : current.labelEn}</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              id="btn-toggle-alt"
              class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${zh ? "备选方案" : "Alternatives"}
            </button>
            <button
              type="button"
              class="rounded-control px-3 py-1 text-[11.5px] font-medium transition-transform active:scale-95 cursor-pointer ${
                current.ctaStyle
              }"
            >
              ${zh ? current.ctaZh : current.ctaEn}
            </button>
          </div>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector("#btn-toggle-alt")?.addEventListener("click", () => this.toggleDrawer());

    this.shadowRoot?.querySelectorAll("[data-key]").forEach((btn) => {
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
