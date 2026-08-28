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
  { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", color: "var(--orange, #ef720c)" },
  { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", color: "var(--line-strong, #3a3c40)" },
  { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", color: "var(--line, #ecedef)" },
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
    ctx.strokeStyle = "#ef720c";
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
    ctx.strokeStyle = "#0285ff";
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
    ctx.strokeStyle = "#e3474c";
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
          ? '你的 <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Creamery</span> 中表现最差的是 Rocky Road——下跌 <code class="mono-red">-6%</code>，合 <code class="mono-red">-$2,453.44</code>。'
          : 'The worst performer in your <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Creamery</span> is Rocky Road — down <code class="mono-red">-6%</code> or <code class="mono-red">-$2,453.44</code>.',
        pill: zh ? "需要重新平衡口味组合吗？" : "Should I rebalance flavors?",
      },
      {
        prose: zh
          ? '<span style="font-weight: 500; color: var(--ink);">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 <code class="mono-red">+$1,834.66</code>。'
          : 'Unusually high freezer bill on <span style="font-weight: 500; color: var(--ink);">Dec 13</span> — <code class="mono-red">+$1,834.66</code> above your average.',
        pill: zh ? "获取降低冷柜成本的建议" : "Get tips on cutting freezer costs",
      },
      {
        prose: zh
          ? '你在 <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Vanilla</span> 上投入过重——它占你库存的 <span style="font-weight: 500; color: var(--ink);">72.5%</span>。'
          : 'You\'re heavily invested in <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Vanilla</span> — it\'s <span style="font-weight: 500; color: var(--ink);">72.5%</span> of your case.',
        pill: zh ? "如果看季节性口味，会有什么变化？" : "If we look at seasonals, what changes?",
      },
    ];

    const currentMeta = pagesMeta[page];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 360px;
          min-height: 408px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .pager-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pager-title {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .title-count {
          font-size: 13px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }

        .nav-buttons {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }

        .nav-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .page-content {
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .prose-text {
          margin-top: 6px;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-2, #62656b);
        }

        .entity-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .entity-dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .dot-orange { background: var(--orange, #ef720c); }

        .mono-red {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--red, #e3474c);
        }

        .mono-green {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--green, #189a4d);
        }

        .inner-card {
          min-height: 278px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 12px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-top: 8px;
        }

        .chart-box {
          margin-top: 8px;
          overflow: hidden;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .chart-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 6px 10px;
        }

        .chart-topbar span {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .snapshot-chip {
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .canvas-stage {
          position: relative;
          height: 130px;
          width: 100%;
          cursor: crosshair;
        }

        canvas {
          display: block;
          width: 100%;
          height: 130px;
        }

        .tooltip-box {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--tooltip-bg, #25272b);
          color: var(--tooltip-fg, #f6f7f8);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 10.5px;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          white-space: nowrap;
          z-index: 5;
        }

        .followup-pill {
          margin-top: 8px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 6px 12px;
          text-align: left;
          font-size: 12px;
          color: var(--ink, #1f2124);
          border: none;
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
          cursor: pointer;
          transition: background-color 0.1s;
        }

        .followup-pill:hover {
          background: var(--hover, #f4f5f6);
        }

        /* Allocation Card styles */
        .alloc-bar {
          display: flex;
          height: 36px;
          gap: 2px;
          overflow: hidden;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          padding: 2px;
          margin-top: 12px;
        }

        .alloc-segment {
          position: relative;
          height: 100%;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .alloc-chips {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
        }

        .alloc-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 11px;
          border: none;
          background: transparent;
          color: var(--ink-2, #62656b);
          cursor: pointer;
        }

        .alloc-chip.active {
          background: var(--field, #f2f2f3);
          color: var(--ink, #1f2124);
        }

        .alloc-desc-box {
          margin-top: 12px;
          min-height: 64px;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="pager-header">
        <div class="pager-title">
          <span class="title-text">${zh ? "智能洞察" : "Insights"}</span>
          <span class="title-count">3</span>
        </div>
        <div class="nav-buttons">
          <button type="button" class="nav-btn" id="btn-prev" aria-label="${zh ? "上一条洞察" : "Previous insight"}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="nav-btn" id="btn-next" aria-label="${zh ? "下一条洞察" : "Next insight"}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <div class="page-content">
        <p class="prose-text">${currentMeta.prose}</p>

        <!-- Subcard Rendering -->
        <div class="inner-card">
          ${
            page === 0
              ? `
            <!-- Compare Card -->
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="flex: 1;">
                <span style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-2);">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--orange);"></span>
                  Mint Chip
                </span>
                <span style="display: block; font-size: 17px; font-weight: 600; color: var(--red); font-variant-numeric: tabular-nums;">-4.41%</span>
                <span class="mono-red">-$2,377.66</span>
              </div>
              <div style="flex: 1;">
                <span style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-2);">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent);"></span>
                  Pistachio
                </span>
                <span style="display: block; font-size: 17px; font-weight: 600; color: var(--green); font-variant-numeric: tabular-nums;">+1.15%</span>
                <span class="mono-green">+$617.22</span>
              </div>
            </div>

            <div class="chart-box">
              <div class="chart-topbar">
                <span>${zh ? "趋势快照" : "Trend snapshot"}</span>
                <span class="snapshot-chip">${zh ? "快照" : "Snapshot"}</span>
              </div>
              <div class="canvas-stage" id="chart-stage-compare">
                <canvas id="compare-canvas"></canvas>
                ${
                  this._hoverIndex !== null
                    ? `
                  <div class="tooltip-box">
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
            <!-- Anomaly Card -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: var(--ink);">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                ${zh ? "冷柜支出偏高" : "High freezer spend"}
              </span>
              <span class="snapshot-chip">${zh ? "快照" : "Snapshot"}</span>
            </div>

            <div class="chart-box">
              <div class="chart-topbar">
                <span>${this._anomalyMetric === "spend" ? "$2,112 阈值" : "82 kWh 阈值"}</span>
                <div style="display: flex; background: var(--field); border-radius: 9999px; padding: 2px;">
                  <button type="button" class="alloc-chip ${this._anomalyMetric === "spend" ? "active" : ""}" id="metric-spend">
                    ${zh ? "支出" : "Spend"}
                  </button>
                  <button type="button" class="alloc-chip ${this._anomalyMetric === "usage" ? "active" : ""}" id="metric-usage">
                    ${zh ? "用电" : "Usage"}
                  </button>
                </div>
              </div>
              <div class="canvas-stage" id="chart-stage-anomaly">
                <canvas id="anomaly-canvas"></canvas>
                ${
                  this._hoverIndex !== null
                    ? `
                  <div class="tooltip-box">
                    ${
                      this._anomalyMetric === "spend"
                        ? `支出: <strong>$${ANOMALY_DATA.spend[this._hoverIndex]}</strong>`
                        : `用电: <strong>${ANOMALY_DATA.usage[this._hoverIndex]} kWh</strong>`
                    }
                  </div>
                `
                    : ""
                }
              </div>
            </div>

            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 8px;">
              <span style="font-size: 17px; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums;">$2,112 ${zh ? "已支出" : "spent"}</span>
              <span class="mono-red">+$1,834.66</span>
              <span style="font-size: 11px; color: var(--ink-3);">${zh ? "较 3 个月均值" : "vs 3 months"}</span>
            </div>
          `
              : `
            <!-- Allocation Card -->
            <div>
              <span style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: var(--ink);">
                <span style="display: flex; width: 14px; height: 14px; align-items: center; justify-content: center; border-radius: 50%; background: var(--orange); color: #fff; font-size: 8px; font-weight: 700;">V</span>
                Vanilla ${zh ? "口味配置" : "allocation"}
              </span>
              <span style="display: block; margin-top: 4px; font-size: 20px; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums;">
                ${ALLOCATION_SEGMENTS.find((s) => s.name === this._allocSelected)?.amount}
              </span>

              <div class="alloc-bar">
                ${ALLOCATION_SEGMENTS.map((s) => {
                  const isSel = s.name === this._allocSelected;
                  return `
                    <button
                      type="button"
                      class="alloc-segment"
                      data-name="${s.name}"
                      style="width: ${s.pct}%; background: ${s.color}; opacity: ${isSel ? 1 : 0.58}; box-shadow: ${isSel ? "inset 0 0 0 1px rgba(255,255,255,0.3)" : "none"};"
                    ></button>
                  `;
                }).join("")}
              </div>

              <div class="alloc-chips">
                ${ALLOCATION_SEGMENTS.map((s) => {
                  const isSel = s.name === this._allocSelected;
                  return `
                    <button type="button" class="alloc-chip ${isSel ? "active" : ""}" data-name="${s.name}">
                      <span style="width: 6px; height: 6px; border-radius: 50%; background: ${s.color};"></span>
                      <span>${s.name} ${s.pct}%</span>
                    </button>
                  `;
                }).join("")}
              </div>

              <div class="alloc-desc-box">
                <span style="display: block; font-size: 11.5px; font-weight: 500; color: var(--orange);">
                  ${ALLOCATION_SEGMENTS.find((s) => s.name === this._allocSelected)?.label}
                </span>
                <span style="display: block; margin-top: 4px; font-size: 11px; line-height: 1.5; color: var(--ink-3);">
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

        <button type="button" class="followup-pill">
          ${currentMeta.pill}
        </button>
      </div>
    `;

    // Event handlers
    this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click", () => this.setPage(-1));
    this.shadowRoot.querySelector("#btn-next")?.addEventListener("click", () => this.setPage(1));

    if (page === 0) {
      const canvas = this.shadowRoot.querySelector("#compare-canvas");
      this._drawCompareChart(canvas);

      const stage = this.shadowRoot.querySelector("#chart-stage-compare");
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
      const canvas = this.shadowRoot.querySelector("#anomaly-canvas");
      this._drawAnomalyChart(canvas);

      this.shadowRoot.querySelector("#metric-spend")?.addEventListener("click", () => this.setAnomalyMetric("spend"));
      this.shadowRoot.querySelector("#metric-usage")?.addEventListener("click", () => this.setAnomalyMetric("usage"));

      const stage = this.shadowRoot.querySelector("#chart-stage-anomaly");
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
      this.shadowRoot.querySelectorAll(".alloc-segment, .alloc-chip").forEach((btn) => {
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
