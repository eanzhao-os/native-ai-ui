import { NaiBaseElement } from "../core/base-element.js";

const COMPARE_DATA = {
  mint: [-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41],
  pistachio: [0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15],
};

const ANOMALY_DATA = {
  spend: [274, 289, 264, 307, 331, 1210, 1718, 2112],
  usage: [18, 19, 17, 21, 22, 58, 81, 96],
};

const ALLOCATION_SEGMENTS = [
  { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", color: "var(--orange)" },
  { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", color: "var(--line-strong)" },
  { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", color: "var(--line)" },
];

export class NaiInsightCards extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._page = 0;
    this._hoverIndex = null;
    this._anomalyMetric = "spend";
    this._allocSelected = "VAN";
  }

  setPage(delta) {
    this._page = (this._page + delta + 3) % 3;
    this._hoverIndex = null;
    this.render();
  }

  setAnomalyMetric(metric) {
    this._anomalyMetric = metric;
    this._hoverIndex = null;
    this.render();
  }

  setAllocSelected(name) {
    this._allocSelected = name;
    this.render();
  }

  _drawCompareChart(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 320;
    const h = 130;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const mint = COMPARE_DATA.mint;
    const pistachio = COMPARE_DATA.pistachio;
    const count = mint.length;

    const allValues = [...mint, ...pistachio];
    const minVal = Math.min(...allValues) - 0.5;
    const maxVal = Math.max(...allValues) + 0.5;

    const getX = (i) => (i / (count - 1)) * (w - 24) + 12;
    const getY = (val) => h - 14 - ((val - minVal) / (maxVal - minVal)) * (h - 28);

    // Draw zero reference line
    const zeroY = getY(0);
    ctx.strokeStyle = "rgba(154, 157, 163, 0.25)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(12, zeroY);
    ctx.lineTo(w - 12, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Mint series (orange)
    ctx.strokeStyle = "var(--orange, #ef720c)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const x = getX(i);
      const y = getY(mint[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Pistachio series (accent blue)
    ctx.strokeStyle = "var(--accent, #0285ff)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const x = getX(i);
      const y = getY(pistachio[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Hover Cursor line and dots if active
    if (this._hoverIndex !== null && this._hoverIndex >= 0 && this._hoverIndex < count) {
      const hx = getX(this._hoverIndex);
      ctx.strokeStyle = "rgba(154, 157, 163, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx, 6);
      ctx.lineTo(hx, h - 6);
      ctx.stroke();

      // Dot for mint
      ctx.fillStyle = "#ef720c";
      ctx.beginPath();
      ctx.arc(hx, getY(mint[this._hoverIndex]), 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Dot for pistachio
      ctx.fillStyle = "#0285ff";
      ctx.beginPath();
      ctx.arc(hx, getY(pistachio[this._hoverIndex]), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawAnomalyChart(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 320;
    const h = 130;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    const data = this._anomalyMetric === "spend" ? ANOMALY_DATA.spend : ANOMALY_DATA.usage;
    const count = data.length;
    const minVal = Math.min(...data) * 0.8;
    const maxVal = Math.max(...data) * 1.1;

    const getX = (i) => (i / (count - 1)) * (w - 24) + 12;
    const getY = (val) => h - 14 - ((val - minVal) / (maxVal - minVal)) * (h - 28);

    // Draw Area gradient
    const areaGrad = ctx.createLinearGradient(0, 10, 0, h);
    areaGrad.addColorStop(0, "rgba(227, 71, 76, 0.2)");
    areaGrad.addColorStop(1, "rgba(227, 71, 76, 0.0)");

    ctx.fillStyle = areaGrad;
    ctx.beginPath();
    ctx.moveTo(getX(0), h - 14);
    for (let i = 0; i < count; i++) {
      ctx.lineTo(getX(i), getY(data[i]));
    }
    ctx.lineTo(getX(count - 1), h - 14);
    ctx.closePath();
    ctx.fill();

    // Draw Line
    ctx.strokeStyle = "var(--red, #e3474c)";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const x = getX(i);
      const y = getY(data[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Hover Cursor line
    if (this._hoverIndex !== null && this._hoverIndex >= 0 && this._hoverIndex < count) {
      const hx = getX(this._hoverIndex);
      ctx.strokeStyle = "rgba(154, 157, 163, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx, 6);
      ctx.lineTo(hx, h - 6);
      ctx.stroke();

      ctx.fillStyle = "#e3474c";
      ctx.beginPath();
      ctx.arc(hx, getY(data[this._hoverIndex]), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  render() {
    const zh = this.isZh;
    const page = this._page;

    const pagesMeta = [
      {
        prose: zh
          ? '你的 <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Creamery</span> 中表现最差的是 Rocky Road——下跌 <code class="font-mono text-[11.5px] text-red">-6%</code>，合 <code class="font-mono text-[11.5px] text-red">-$2,453.44</code>。'
          : 'The worst performer in your <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Creamery</span> is Rocky Road — down <code class="font-mono text-[11.5px] text-red">-6%</code> or <code class="font-mono text-[11.5px] text-red">-$2,453.44</code>.',
        pill: zh ? "需要重新平衡口味组合吗？" : "Should I rebalance flavors?",
      },
      {
        prose: zh
          ? '<span class="font-medium text-ink">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 <code class="font-mono text-[11.5px] text-red">+$1,834.66</code>。'
          : 'Unusually high freezer bill on <span class="font-medium text-ink">Dec 13</span> — <code class="font-mono text-[11.5px] text-red">+$1,834.66</code> above your average.',
        pill: zh ? "获取降低冷柜成本的建议" : "Get tips on cutting freezer costs",
      },
      {
        prose: zh
          ? '你在 <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Vanilla</span> 上投入过重——它占你库存的 <span class="font-medium text-ink">72.5%</span>。'
          : 'You\'re heavily invested in <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Vanilla</span> — it\'s <span class="font-medium text-ink">72.5%</span> of your case.',
        pill: zh ? "如果看季节性口味，会有什么变化？" : "If we look at seasonals, what changes?",
      },
    ];

    const currentMeta = pagesMeta[page];

    this.setHtml(`
      <div class="flex w-full max-w-sm flex-col gap-2 font-sans">
        
        <div class="flex items-center justify-between">
          <div class="flex items-baseline gap-1.5">
            <span class="text-[13px] font-semibold text-ink">${zh ? "智能洞察" : "Insights"}</span>
            <span class="text-[13px] text-ink-3 tabular-nums">3</span>
          </div>
          <div class="flex items-center gap-0.5">
            <button
              type="button"
              id="btn-prev"
              aria-label="${zh ? "上一条洞察" : "Previous insight"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 hover:bg-hover hover:text-ink cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              id="btn-next"
              aria-label="${zh ? "下一条洞察" : "Next insight"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 hover:bg-hover hover:text-ink cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        
        <div class="animate-fade-up">
          <p class="text-[12.5px] leading-relaxed text-ink-2">
            ${currentMeta.prose}
          </p>

          <div class="mt-2 min-h-[278px] rounded-card bg-surface p-3 shadow-hairline">
            ${
              page === 0
                ? `
              
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <span class="flex items-center gap-1.5 text-[11.5px] text-ink-2">
                    <span class="size-2 rounded-full bg-orange"></span>
                    Mint Chip
                  </span>
                  <span class="block text-[17px] font-semibold text-red tabular-nums">-4.41%</span>
                  <span class="font-mono text-[11.5px] text-red">-$2,377.66</span>
                </div>
                <div class="flex-1">
                  <span class="flex items-center gap-1.5 text-[11.5px] text-ink-2">
                    <span class="size-2 rounded-full bg-accent"></span>
                    Pistachio
                  </span>
                  <span class="block text-[17px] font-semibold text-green tabular-nums">+1.15%</span>
                  <span class="font-mono text-[11.5px] text-green">+$617.22</span>
                </div>
              </div>

              <div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
                <div class="flex items-center justify-between border-b border-line px-2.5 py-1.5">
                  <span class="text-[11px] text-ink-3">${zh ? "趋势快照" : "Trend snapshot"}</span>
                  <span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
                    ${zh ? "快照" : "Snapshot"}
                  </span>
                </div>
                <div class="relative h-[130px] w-full cursor-crosshair" id="chart-stage-compare">
                  <canvas id="compare-canvas" class="block size-full"></canvas>
                  ${
                    this._hoverIndex !== null
                      ? `
                    <div class="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-[6px] bg-ink px-2 py-1 text-[10.5px] text-canvas shadow-raised whitespace-nowrap">
                      <div>Mint Chip: <strong>${COMPARE_DATA.mint[this._hoverIndex]}%</strong></div>
                      <div>Pistachio: <strong>+${COMPARE_DATA.pistachio[this._hoverIndex]}%</strong></div>
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>
            `
                : page === 1
                ? `
              
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-red" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  ${zh ? "冷柜支出偏高" : "High freezer spend"}
                </span>
                <span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
                  ${zh ? "快照" : "Snapshot"}
                </span>
              </div>

              <div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
                <div class="flex items-center justify-between border-b border-line px-2.5 py-1.5">
                  <span class="text-[11px] text-ink-3">
                    ${this._anomalyMetric === "spend" ? (zh ? "$2,112 阈值" : "$2,112 threshold") : (zh ? "82 kWh 阈值" : "82 kWh threshold")}
                  </span>
                  <div class="flex rounded-full bg-field p-0.5">
                    <button
                      type="button"
                      id="metric-spend"
                      class="rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${
                        this._anomalyMetric === "spend" ? "bg-surface font-medium text-ink shadow-xs" : "text-ink-2"
                      }"
                    >
                      ${zh ? "支出" : "Spend"}
                    </button>
                    <button
                      type="button"
                      id="metric-usage"
                      class="rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${
                        this._anomalyMetric === "usage" ? "bg-surface font-medium text-ink shadow-xs" : "text-ink-2"
                      }"
                    >
                      ${zh ? "用电" : "Usage"}
                    </button>
                  </div>
                </div>
                <div class="relative h-[130px] w-full cursor-crosshair" id="chart-stage-anomaly">
                  <canvas id="anomaly-canvas" class="block size-full"></canvas>
                  ${
                    this._hoverIndex !== null
                      ? `
                    <div class="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-[6px] bg-ink px-2 py-1 text-[10.5px] text-canvas shadow-raised whitespace-nowrap">
                      ${
                        this._anomalyMetric === "spend"
                          ? `${zh ? "支出" : "Spend"}: <strong>$${ANOMALY_DATA.spend[this._hoverIndex]}</strong>`
                          : `${zh ? "用电" : "Usage"}: <strong>${ANOMALY_DATA.usage[this._hoverIndex]} kWh</strong>`
                      }
                    </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <div class="mt-2 flex items-baseline gap-2">
                <span class="text-[17px] font-semibold text-ink tabular-nums">$2,112 ${zh ? "已支出" : "spent"}</span>
                <span class="font-mono text-[11.5px] text-red">+$1,834.66</span>
                <span class="text-[11px] text-ink-3">${zh ? "较 3 个月均值" : "vs 3 months"}</span>
              </div>
            `
                : `
              
              <div>
                <span class="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <span class="flex size-3.5 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">V</span>
                  Vanilla ${zh ? "口味配置" : "allocation"}
                </span>
                <span class="mt-1 block text-[20px] font-semibold text-ink tabular-nums">
                  ${ALLOCATION_SEGMENTS.find((s) => s.name === this._allocSelected)?.amount}
                </span>

                <div class="mt-3 flex h-9 gap-0.5 overflow-hidden rounded-full bg-field p-0.5">
                  ${ALLOCATION_SEGMENTS.map((s) => {
                    const isSel = s.name === this._allocSelected;
                    return `
                      <button
                        type="button"
                        class="alloc-segment relative h-full rounded-full transition-opacity duration-300 cursor-pointer"
                        data-name="${s.name}"
                        style="width: ${s.pct}%; background: ${s.color}; opacity: ${isSel ? 1 : 0.58}; box-shadow: ${
                      isSel ? "inset 0 0 0 1px rgba(255,255,255,0.3)" : "none"
                    };"
                      ></button>
                    `;
                  }).join("")}
                </div>

                <div class="mt-2 flex items-center gap-1.5">
                  ${ALLOCATION_SEGMENTS.map((s) => {
                    const isSel = s.name === this._allocSelected;
                    return `
                      <button
                        type="button"
                        class="alloc-chip flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${
                          isSel ? "bg-field font-medium text-ink" : "text-ink-2"
                        }"
                        data-name="${s.name}"
                      >
                        <span class="size-1.5 rounded-full" style="background: ${s.color};"></span>
                        <span>${s.name} ${s.pct}%</span>
                      </button>
                    `;
                  }).join("")}
                </div>

                <div class="mt-3 min-h-[64px] rounded-control bg-inset p-2.5 shadow-hairline">
                  <span class="block text-[11.5px] font-medium text-orange">
                    ${ALLOCATION_SEGMENTS.find((s) => s.name === this._allocSelected)?.label}
                  </span>
                  <span class="mt-1 block text-[11px] leading-relaxed text-ink-3">
                    ${
                      zh
                        ? "当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。"
                        : "Contribution snapshot across current inventory value. Segment selection changes inspected group without moving card."
                    }
                  </span>
                </div>
              </div>
            `
            }
          </div>

          <button
            type="button"
            class="mt-2 w-fit rounded-full bg-surface px-3 py-1.5 text-left text-[12px] text-ink shadow-btn hover:bg-hover cursor-pointer"
          >
            ${currentMeta.pill}
          </button>
        </div>
      </div>
    `);

    // Event handlers
    this.shadowRoot?.querySelector("#btn-prev")?.addEventListener("click", () => this.setPage(-1));
    this.shadowRoot?.querySelector("#btn-next")?.addEventListener("click", () => this.setPage(1));

    if (page === 0) {
      const canvas = this.shadowRoot?.querySelector("#compare-canvas");
      this._drawCompareChart(canvas);

      const stage = this.shadowRoot?.querySelector("#chart-stage-compare");
      if (stage) {
        stage.addEventListener("pointermove", (e) => {
          const rect = stage.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          const idx = Math.round(progress * (COMPARE_DATA.mint.length - 1));
          if (idx !== this._hoverIndex) {
            this._hoverIndex = idx;
            this.render();
          }
        });
        stage.addEventListener("pointerleave", () => {
          this._hoverIndex = null;
          this.render();
        });
      }
    } else if (page === 1) {
      const canvas = this.shadowRoot?.querySelector("#anomaly-canvas");
      this._drawAnomalyChart(canvas);

      this.shadowRoot?.querySelector("#metric-spend")?.addEventListener("click", () => this.setAnomalyMetric("spend"));
      this.shadowRoot?.querySelector("#metric-usage")?.addEventListener("click", () => this.setAnomalyMetric("usage"));

      const stage = this.shadowRoot?.querySelector("#chart-stage-anomaly");
      if (stage) {
        stage.addEventListener("pointermove", (e) => {
          const rect = stage.getBoundingClientRect();
          const progress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          const idx = Math.round(progress * (ANOMALY_DATA.spend.length - 1));
          if (idx !== this._hoverIndex) {
            this._hoverIndex = idx;
            this.render();
          }
        });
        stage.addEventListener("pointerleave", () => {
          this._hoverIndex = null;
          this.render();
        });
      }
    } else if (page === 2) {
      this.shadowRoot?.querySelectorAll(".alloc-segment, .alloc-chip").forEach((btn) => {
        btn.addEventListener("click", () => {
          const name = btn.getAttribute("data-name");
          if (name) this.setAllocSelected(name);
        });
      });
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-insight-cards")) {
  customElements.define("nai-insight-cards", NaiInsightCards);
}
