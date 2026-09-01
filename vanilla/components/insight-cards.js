import { NaiBaseElement } from "../core/base-element.js";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SNAPSHOT_END = Date.UTC(2026, 7, 29, 12, 0, 0) / 1000;

const COMPARE_DATA = {
  mint: [-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41],
  pistachio: [0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15],
};

const ANOMALY_DATA = {
  spend: [274, 289, 264, 307, 331, 1210, 1718, 2112],
  usage: [18, 19, 17, 21, 22, 58, 81, 96],
};

const ALLOCATION_SEGMENTS = [
  { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", cls: "bg-orange", tone: "text-orange" },
  { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", cls: "bg-line-strong", tone: "text-ink-2" },
  { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", cls: "bg-line", tone: "text-ink-3" },
];

const SERIES_COLORS = {
  orange: { light: "#ef720c", dark: "#d95926" },
  accent: { light: "#0285ff", dark: "#3987e5" },
  red: { light: "#e3474c", dark: "#ee5c61" },
};

const INSIGHT_CHART_CSS = `
:host{display:flex;justify-content:center;min-height:456px;width:100%}
.insight-chart-stage{touch-action:pan-y;user-select:none;overflow:hidden}
.insight-chart-cursor{z-index:4;background:var(--ink-3);opacity:.72;pointer-events:none;width:1px;position:absolute;top:0;bottom:0}
.insight-chart-tooltip-anchor{z-index:5;pointer-events:none;position:absolute;top:9px;transform:translate(-50%)}
.insight-chart-tooltip{border:1px solid var(--tooltip-border);min-width:158px;color:var(--tooltip-fg);background:var(--tooltip-bg);box-shadow:var(--shadow-overlay);border-radius:10px;padding:9px 10px;font-size:12px}
.insight-chart-tooltip-time{color:var(--tooltip-muted);margin-bottom:7px;font-size:11px;display:block}
.insight-chart-tooltip-row{justify-content:space-between;align-items:center;gap:16px;line-height:1.65;display:flex}
.insight-chart-tooltip-label{color:var(--tooltip-muted);align-items:center;gap:7px;display:inline-flex}
.insight-chart-tooltip-row strong{color:var(--tooltip-fg);font-variant-numeric:tabular-nums;font-weight:650}
.insight-chart-tooltip-dot{border-radius:99px;flex:0 0 10px;width:10px;height:2px}
`;

const formatPercent = (value) => `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
const formatMoney = (value) => `$${Math.round(value).toLocaleString("en-US")}`;
const pointDate = (time) => new Date(time * 1000);
const formatClockTime = (time) => {
  const date = pointDate(time);
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
};
const formatPointTime = (time, zh) => `${zh ? "今天" : "Today,"} ${formatClockTime(time)}`;
const formatPointDateTime = (time) => pointDate(time).toISOString();
const makePoints = (values, gapMinutes = 6) =>
  values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gapMinutes * 60,
    value,
  }));
const offsetPoints = (points, offset) =>
  points.map((point) => ({ ...point, time: point.time + offset }));

const mono = (text, tone) =>
  `<code class="font-mono text-[11.5px] ${tone === "red" ? "text-red" : "text-green"}">${text}</code>`;
const entity = (name, tone) =>
  `<span data-react-text-entity class="inline-flex items-center gap-1 align-baseline font-medium text-ink"><span aria-hidden="true" class="inline-block size-2.5 rounded-full ${tone}"></span>@${name}</span>`;

let insightInstance = 0;
let livelineModules = null;
let livelineModulesPromise = null;

function loadLivelineModules() {
  if (!livelineModulesPromise) {
    livelineModulesPromise = Promise.all([
      import("react"),
      import("react-dom/client"),
      import("react-dom"),
      import("liveline"),
    ]).then((modules) => {
      livelineModules = modules;
      return modules;
    });
  }
  return livelineModulesPromise;
}

if (
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  !/jsdom/i.test(navigator.userAgent)
) {
  loadLivelineModules().catch(() => {});
}

export class NaiInsightCards extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._page = 0;
    this._submittedPage = null;
    this._hoverIndex = null;
    this._selectedIndex = null;
    this._anomalyMetric = "spend";
    this._allocSelected = "VAN";
    this._instanceId = `nai-insight-${insightInstance++}`;
    this._chartRoot = null;
    this._chartModules = null;
    this._chartVersion = 0;
    this._fallbackChartFrame = 0;
    this._fallbackChartObserver = null;
    this._fallbackChartDraw = null;
    this._preserveChartOnRender = false;
    this._preserveHeaderOnRender = false;
  }

  onUnmount() {
    this._unmountChart();
  }

  _isDark() {
    return document.documentElement.classList.contains("dark");
  }

  _seriesColor(key) {
    return SERIES_COLORS[key][this._isDark() ? "dark" : "light"];
  }

  _destroyFallbackChart() {
    if (this._fallbackChartFrame) cancelAnimationFrame(this._fallbackChartFrame);
    this._fallbackChartFrame = 0;
    this._fallbackChartObserver?.disconnect();
    this._fallbackChartObserver = null;
    this._fallbackChartDraw = null;
  }

  _unmountChart() {
    this._chartVersion += 1;
    this._destroyFallbackChart();
    this._chartRoot?.unmount?.();
    this._chartRoot = null;
  }

  setPage(delta) {
    this._page = (this._page + delta + 3) % 3;
    this._submittedPage = null;
    this._hoverIndex = null;
    this._selectedIndex = null;
    this._preserveHeaderOnRender = true;
    this.render();
    this._preserveHeaderOnRender = false;
  }

  setAnomalyMetric(metric) {
    this._anomalyMetric = metric;
    this._hoverIndex = null;
    this._selectedIndex = null;

    this.shadowRoot?.querySelectorAll("#metric-spend, #metric-usage").forEach((button) => {
      const selected = button.id === `metric-${metric}`;
      button.setAttribute("aria-pressed", String(selected));
      button.className = `min-h-11 min-w-11 rounded-full px-2.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
        selected
          ? "bg-surface text-ink shadow-btn"
          : "text-ink-3 hover:text-ink-2"
      }`;
    });

    const stage = this.shadowRoot?.querySelector(".insight-chart-stage");
    if (stage) {
      stage.setAttribute(
        "aria-label",
        metric === "spend"
          ? this.isZh
            ? "支出趋势图"
            : "Spend trend chart"
          : this.isZh
            ? "用电趋势图"
            : "Usage trend chart",
      );
      const points = makePoints(
        metric === "spend" ? ANOMALY_DATA.spend : ANOMALY_DATA.usage,
        8,
      );
      stage.querySelectorAll(":scope > .sr-only").forEach((point, index) => {
        point.id = `${this._chartId()}-point-${index}`;
        point.textContent = `${formatPointTime(points[index].time, this.isZh)} · ${
          metric === "spend"
            ? formatMoney(points[index].value)
            : `${Math.round(points[index].value)} kWh`
        }`;
      });
    }

    this._syncChartSelection();
    this._renderMountedChart();
  }

  setAllocSelected(name) {
    this._allocSelected = name;
    const active =
      ALLOCATION_SEGMENTS.find((segment) => segment.name === name) ??
      ALLOCATION_SEGMENTS[0];
    const segmentGroup = this.shadowRoot?.querySelector(
      '[aria-label="Allocation segments"], [aria-label="配置分段"]',
    );
    segmentGroup?.querySelectorAll("button[data-allocation]").forEach((button) => {
      const segmentName = button.getAttribute("data-allocation");
      const selected = segmentName === name;
      button.setAttribute("aria-pressed", String(selected));
      button.style.opacity = selected ? "1" : "0.58";
      button.style.boxShadow = selected
        ? "inset 0 0 0 2px var(--surface)"
        : "none";
      const fill = button.firstElementChild;
      if (fill instanceof HTMLElement) {
        fill.style.width = selected ? "calc(100% - 8px)" : "0%";
        fill.style.opacity = selected ? "1" : "0";
      }
    });
    const legendGroup = this.shadowRoot?.querySelector(
      '[aria-label="Allocation legend"], [aria-label="配置图例"]',
    );
    legendGroup?.querySelectorAll("button[data-allocation]").forEach((button) => {
      const selected = button.getAttribute("data-allocation") === name;
      button.setAttribute("aria-pressed", String(selected));
      button.className = `flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-control px-1 text-[10.5px] transition-[background-color,color,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
        selected
          ? "bg-field text-ink"
          : "text-ink-2 hover:bg-hover hover:text-ink"
      }`;
    });
    const card = segmentGroup?.closest('[class~="min-h-[304px]"]');
    if (card instanceof HTMLElement) {
      const amount = card.children[1];
      if (amount) amount.textContent = active.amount;
      const detail = card.lastElementChild;
      const label = detail?.firstElementChild;
      if (label) {
        label.className = `block text-[11.5px] font-medium ${active.tone}`;
        label.textContent = active.label;
      }
    }
  }

  _activeIndex() {
    return this._hoverIndex ?? this._selectedIndex;
  }

  _pointIndex(event, count) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    const progress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    return Math.round(progress * (count - 1));
  }

  _chartKey() {
    return this._page === 0 ? "compare" : "anomaly";
  }

  _chartData() {
    if (this._page === 0) {
      return {
        primary: makePoints(COMPARE_DATA.mint),
        secondary: makePoints(COMPARE_DATA.pistachio),
      };
    }
    return {
      primary: makePoints(
        this._anomalyMetric === "spend" ? ANOMALY_DATA.spend : ANOMALY_DATA.usage,
        8,
      ),
      secondary: null,
    };
  }

  _chartId() {
    return `insight-${this._chartKey()}-${this._instanceId}`;
  }

  _tooltipHtml(index) {
    const zh = this.isZh;
    const { primary, secondary } = this._chartData();
    const point = primary[index];
    const rows = this._page === 0
      ? [
          { label: "Mint Chip", value: formatPercent(point.value), color: this._seriesColor("orange") },
          { label: "Pistachio", value: formatPercent(secondary[index].value), color: this._seriesColor("accent") },
        ]
      : [
          {
            label: this._anomalyMetric === "spend" ? (zh ? "支出" : "Spend") : zh ? "用电" : "Usage",
            value: this._anomalyMetric === "spend" ? formatMoney(point.value) : `${Math.round(point.value)} kWh`,
            color: this._seriesColor("red"),
          },
        ];
    return `<div id="${this._chartId()}-tooltip" role="tooltip" class="insight-chart-tooltip"><time class="insight-chart-tooltip-time" datetime="${formatPointDateTime(point.time)}">${formatPointTime(point.time, zh)}</time>${rows.map((row) => `<div class="insight-chart-tooltip-row"><span class="insight-chart-tooltip-label"><span aria-hidden="true" class="insight-chart-tooltip-dot" style="background:${row.color}"></span>${row.label}</span><strong>${row.value}</strong></div>`).join("")}</div>`;
  }

  _syncChartSelection() {
    const stage = this.shadowRoot?.querySelector(".insight-chart-stage");
    if (!(stage instanceof HTMLElement)) return;
    const { primary } = this._chartData();
    const active = this._activeIndex();
    stage.querySelector(".insight-chart-cursor")?.remove();
    stage.querySelector(".insight-chart-tooltip-anchor")?.remove();
    if (active === null) {
      stage.removeAttribute("aria-activedescendant");
    } else {
      stage.setAttribute("aria-activedescendant", `${this._chartId()}-point-${active}`);
      const position = (active / (primary.length - 1)) * 100;
      const cursor = document.createElement("span");
      cursor.className = "insight-chart-cursor";
      cursor.style.left = `${position}%`;
      const anchor = document.createElement("span");
      anchor.className = "insight-chart-tooltip-anchor";
      anchor.style.left = `${Math.min(Math.max(position, 28), 72)}%`;
      anchor.innerHTML = this._tooltipHtml(active);
      stage.append(cursor, anchor);
    }

    const anomalySummary = this.shadowRoot?.querySelector("[data-anomaly-summary]");
    if (anomalySummary) {
      if (active === null) {
        anomalySummary.textContent = this._anomalyMetric === "spend"
          ? this.isZh
            ? "$2,112 阈值"
            : "$2,112 threshold"
          : this.isZh
            ? "82 kWh 阈值"
            : "82 kWh threshold";
      } else {
        const value = primary[active].value;
        anomalySummary.textContent = this._anomalyMetric === "spend"
          ? formatMoney(value)
          : `${Math.round(value)} kWh`;
      }
    }
  }

  _wireChart(stage) {
    const count = 8;
    stage.addEventListener("pointerdown", (event) => {
      const index = this._pointIndex(event, count);
      this._selectedIndex = index;
      this._hoverIndex = index;
      this._syncChartSelection();
    });
    stage.addEventListener("pointermove", (event) => {
      this._hoverIndex = this._pointIndex(event, count);
      this._syncChartSelection();
    });
    const clearHover = () => {
      this._hoverIndex = null;
      this._syncChartSelection();
    };
    stage.addEventListener("pointerleave", clearHover);
    stage.addEventListener("pointercancel", clearHover);
    stage.addEventListener("keydown", (event) => {
      let next = this._selectedIndex;
      if (event.key === "Home") next = 0;
      else if (event.key === "End") next = count - 1;
      else if (event.key === "ArrowLeft") {
        next = this._selectedIndex === null ? count - 1 : Math.max(0, this._selectedIndex - 1);
      } else if (event.key === "ArrowRight") {
        next = this._selectedIndex === null ? 0 : Math.min(count - 1, this._selectedIndex + 1);
      } else if (event.key === "Escape") {
        this._hoverIndex = null;
        this._selectedIndex = null;
        event.preventDefault();
        this._syncChartSelection();
        return;
      } else {
        return;
      }
      this._hoverIndex = null;
      this._selectedIndex = next;
      event.preventDefault();
      this._syncChartSelection();
    });
  }

  _fallbackChart(container, cursor) {
    this._destroyFallbackChart();
    container.dataset.renderer = "fallback";
    container.innerHTML = `<div style="width:100%;height:100%;position:relative"><canvas style="display:block;width:100%;height:100%;cursor:${cursor}"></canvas></div>`;
    if (/jsdom/i.test(navigator.userAgent)) return;

    const canvas = container.querySelector("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const pixelWidth = Math.round(width * dpr);
      const pixelHeight = Math.round(height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const { primary, secondary } = this._chartData();
      const series = this._page === 0
        ? [
            { color: this._seriesColor("orange"), points: primary },
            { color: this._seriesColor("accent"), points: secondary },
          ]
        : [{ color: this._seriesColor("red"), points: primary }];
      const values = series.flatMap((item) => item.points.map((point) => point.value));
      let minimum = Math.min(...values);
      let maximum = Math.max(...values);
      const range = maximum - minimum || 1;
      minimum -= range * 0.12;
      maximum += range * 0.12;
      const padding = this._page === 0
        ? { top: 24, right: 0, bottom: 22, left: 0 }
        : { top: 18, right: 0, bottom: 22, left: 0 };
      const chartWidth = Math.max(1, width - padding.left - padding.right);
      const chartHeight = Math.max(1, height - padding.top - padding.bottom);
      const x = (index, count) =>
        padding.left + (index / Math.max(1, count - 1)) * chartWidth;
      const y = (value) =>
        padding.top + ((maximum - value) / (maximum - minimum)) * chartHeight;

      if (this._page === 1) {
        context.save();
        context.strokeStyle = this._isDark()
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.06)";
        context.lineWidth = 1;
        context.setLineDash([1, 3]);
        for (let row = 1; row <= 3; row += 1) {
          const gridY = padding.top + (row / 4) * chartHeight;
          context.beginPath();
          context.moveTo(padding.left, gridY);
          context.lineTo(width - padding.right, gridY);
          context.stroke();
        }
        context.restore();
      }

      series.forEach(({ color, points }) => {
        context.save();
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.beginPath();
        points.forEach((point, index) => {
          const pointX = x(index, points.length);
          const pointY = y(point.value);
          if (index === 0) context.moveTo(pointX, pointY);
          else context.lineTo(pointX, pointY);
        });
        context.stroke();
        const latest = points.at(-1);
        if (latest) {
          context.fillStyle = color;
          context.beginPath();
          context.arc(x(points.length - 1, points.length), y(latest.value), 3, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      });
    };

    this._fallbackChartDraw = draw;
    this._fallbackChartObserver = new ResizeObserver(draw);
    this._fallbackChartObserver.observe(container);
    this._fallbackChartFrame = requestAnimationFrame(() => {
      this._fallbackChartFrame = 0;
      draw();
    });
  }

  _livelineProps(
    offset = Math.floor(Date.now() / 1000) - SNAPSHOT_END,
  ) {
    const dark = this._isDark();
    if (this._page === 0) {
      const mint = makePoints(COMPARE_DATA.mint);
      const pistachio = makePoints(COMPARE_DATA.pistachio);
      return {
        data: [],
        value: 0,
        series: [
          { id: "mint", label: "", data: offsetPoints(mint, offset), value: -4.41, color: this._seriesColor("orange") },
          { id: "pistachio", label: "", data: offsetPoints(pistachio, offset), value: 1.15, color: this._seriesColor("accent") },
        ],
        theme: dark ? "dark" : "light",
        grid: false,
        pulse: false,
        window: 42 * 60,
        paused: true,
        scrub: false,
        cursor: "default",
        lineWidth: 2,
        padding: { top: 24, right: 0, bottom: 22, left: 0 },
        formatTime: (time) => formatClockTime(time - offset),
        formatValue: formatPercent,
      };
    }
    const values = this._anomalyMetric === "spend" ? ANOMALY_DATA.spend : ANOMALY_DATA.usage;
    const points = makePoints(values, 8);
    return {
      data: offsetPoints(points, offset),
      value: values.at(-1),
      theme: dark ? "dark" : "light",
      color: this._seriesColor("red"),
      grid: true,
      scrub: false,
      fill: false,
      pulse: false,
      momentum: false,
      paused: true,
      window: 56 * 60,
      lineWidth: 2,
      cursor: "crosshair",
      padding: { top: 18, right: 0, bottom: 22, left: 0 },
      formatTime: (time) => formatClockTime(time - offset),
      formatValue: (value) => this._anomalyMetric === "spend" ? formatMoney(value) : `${Math.round(value)} kWh`,
    };
  }

  _renderMountedChart(
    offset = Math.floor(Date.now() / 1000) - SNAPSHOT_END,
    key = offset,
  ) {
    if (!this._chartRoot || !this._chartModules) {
      this._fallbackChartDraw?.();
      return;
    }
    const { createElement, flushSync, Liveline } = this._chartModules;
    flushSync(() =>
      this._chartRoot.render(
        createElement(Liveline, { ...this._livelineProps(offset), key }),
      ),
    );
  }

  async _mountChart() {
    const container = this.shadowRoot?.querySelector("[data-liveline-root]");
    if (!(container instanceof HTMLElement)) return;
    const cursor = this._page === 0 ? "default" : "crosshair";
    this._fallbackChart(container, cursor);
    if (/jsdom/i.test(navigator.userAgent)) return;
    const version = ++this._chartVersion;
    try {
      const [{ createElement }, { createRoot }, { flushSync }, { Liveline }] =
        livelineModules ?? (await loadLivelineModules());
      if (version !== this._chartVersion || !container.isConnected) return;
      this._destroyFallbackChart();
      container.dataset.renderer = "liveline";
      this._chartModules = { createElement, flushSync, Liveline };
      this._chartRoot = createRoot(container);
      const offset = Math.floor(Date.now() / 1000) - SNAPSHOT_END;
      this._renderMountedChart(offset, offset);
    } catch {
      this._fallbackChart(container, cursor);
    }
  }

  _compareCard() {
    const zh = this.isZh;
    const mint = makePoints(COMPARE_DATA.mint);
    const pistachio = makePoints(COMPARE_DATA.pistachio);
    const mintColor = this._seriesColor("orange");
    const pistachioColor = this._seriesColor("accent");
    const tableId = `${this._chartId()}-table`;
    return `<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><div class="flex items-center gap-4">${[
      { name: "Mint Chip", delta: "-4.41%", sub: "-$2,377.66", tone: "red", color: mintColor },
      { name: "Pistachio", delta: "+1.15%", sub: "+$617.22", tone: "green", color: pistachioColor },
    ].map((item) => `<div class="min-w-0 flex-1"><span class="flex items-center gap-1.5 text-[11.5px] text-ink-2"><span aria-hidden="true" class="size-2 rounded-full" style="background:${item.color}"></span>${item.name}</span><span class="block text-[17px] font-semibold tracking-[-0.01em] tabular-nums ${item.tone === "red" ? "text-red" : "text-green"}">${item.delta}</span>${mono(item.sub, item.tone)}</div>`).join("")}</div><div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline"><div class="flex min-h-9 items-center justify-between border-b border-line px-2.5 py-1.5" style="min-height:36px"><span class="text-[11px] text-ink-3 tabular-nums">${zh ? "趋势快照" : "Trend snapshot"}</span><span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">${zh ? "8 个时点" : "8 points"}</span></div><div role="group" aria-label="${zh ? "收益对比趋势图" : "Return comparison chart"}" aria-describedby="${tableId}" tabindex="0" class="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="height:174px"><div data-liveline-root style="height:100%;width:100%"></div>${mint.map((point, index) => `<span id="${this._chartId()}-point-${index}" class="sr-only">${formatPointTime(point.time, zh)} · Mint Chip ${formatPercent(point.value)} · Pistachio ${formatPercent(pistachio[index].value)}</span>`).join("")}</div></div><table id="${tableId}" class="sr-only" aria-label="${zh ? "收益对比数据" : "Return comparison data"}"><thead><tr><th>${zh ? "时间" : "Time"}</th><th>Mint Chip</th><th>Pistachio</th></tr></thead><tbody>${mint.map((point, index) => `<tr><td><time datetime="${formatPointDateTime(point.time)}">${formatClockTime(point.time)}</time></td><td>${formatPercent(point.value)}</td><td>${formatPercent(pistachio[index].value)}</td></tr>`).join("")}</tbody></table></div>`;
  }

  _anomalyCard() {
    const zh = this.isZh;
    const spend = makePoints(ANOMALY_DATA.spend, 8);
    const usage = makePoints(ANOMALY_DATA.usage, 8);
    const data = this._anomalyMetric === "spend" ? spend : usage;
    const moneyLabel = formatMoney(ANOMALY_DATA.spend.at(-1));
    return `<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><div class="flex min-h-8 items-center justify-between gap-3" style="min-height:32px"><span class="flex min-w-0 items-center gap-1.5 text-[12px] font-medium text-ink"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"></path></svg><span class="truncate">${zh ? "冷柜支出偏高" : "High freezer spend"}</span></span><span class="rounded-full bg-red-tint px-2 py-0.5 text-[10.5px] font-medium text-red">${zh ? "异常" : "Anomaly"}</span></div><div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline"><div class="flex min-h-12 items-center justify-between gap-2 border-b border-line px-2.5 py-1.5"><span data-anomaly-summary class="min-w-0 truncate text-[11px] text-ink-3 tabular-nums">${this._anomalyMetric === "spend" ? (zh ? "$2,112 阈值" : "$2,112 threshold") : zh ? "82 kWh 阈值" : "82 kWh threshold"}</span><span role="group" aria-label="${zh ? "异常指标" : "Anomaly metric"}" class="flex shrink-0 rounded-full bg-field p-0.5">${["spend", "usage"].map((metric) => `<button id="metric-${metric}" type="button" aria-pressed="${this._anomalyMetric === metric}" class="min-h-11 min-w-11 rounded-full px-2.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${this._anomalyMetric === metric ? "bg-surface text-ink shadow-btn" : "text-ink-3 hover:text-ink-2"}">${metric === "spend" ? (zh ? "支出" : "Spend") : zh ? "用电" : "Usage"}</button>`).join("")}</span></div><div role="group" aria-label="${this._anomalyMetric === "spend" ? (zh ? "支出趋势图" : "Spend trend chart") : zh ? "用电趋势图" : "Usage trend chart"}" tabindex="0" class="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="height:174px"><div data-liveline-root style="height:100%;width:100%"></div>${data.map((point, index) => `<span id="${this._chartId()}-point-${index}" class="sr-only">${formatPointTime(point.time, zh)} · ${this._anomalyMetric === "spend" ? formatMoney(point.value) : `${Math.round(point.value)} kWh`}</span>`).join("")}</div></div><div class="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1" style="column-gap:8px"><span class="text-[17px] font-semibold tracking-[-0.01em] text-ink tabular-nums">${zh ? `${moneyLabel} 已支出` : `${moneyLabel} spent`}</span>${mono("+$1,834.66", "red")}<span class="text-[11px] text-ink-3">${zh ? "较 3 个月均值" : "vs 3 months"}</span></div></div>`;
  }

  _allocationCard() {
    const zh = this.isZh;
    const active = ALLOCATION_SEGMENTS.find((segment) => segment.name === this._allocSelected) ?? ALLOCATION_SEGMENTS[0];
    return `<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><span data-react-text-allocation-title class="flex items-center gap-1.5 text-[12px] font-medium text-ink"><span class="flex size-4 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">V</span>Vanilla ${zh ? "口味配置" : "allocation"}</span><span class="mt-1 block text-[20px] font-semibold tracking-[-0.01em] text-ink tabular-nums">${active.amount}</span><div class="mt-3 flex h-12 gap-0.5 overflow-hidden rounded-full bg-field p-0.5" role="group" aria-label="${zh ? "配置分段" : "Allocation segments"}">${ALLOCATION_SEGMENTS.map((segment) => `<button type="button" data-allocation="${segment.name}" aria-pressed="${this._allocSelected === segment.name}" aria-label="${segment.label}: ${segment.pct}%" class="relative h-full overflow-hidden rounded-full ${segment.cls} transition-[opacity,transform,box-shadow] duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="width:${segment.pct}%;opacity:${this._allocSelected === segment.name ? 1 : 0.58};box-shadow:${this._allocSelected === segment.name ? "inset 0 0 0 2px var(--surface)" : "none"};transition-timing-function:${EASE}"><span aria-hidden="true" class="absolute inset-y-1 left-1 rounded-full bg-white/20 transition-[width,opacity] duration-500" style="width:${this._allocSelected === segment.name ? "calc(100% - 8px)" : "0%"};opacity:${this._allocSelected === segment.name ? 1 : 0};transition-timing-function:${EASE}"></span></button>`).join("")}</div><div class="mt-2 grid grid-cols-3 gap-1" role="group" aria-label="${zh ? "配置图例" : "Allocation legend"}">${ALLOCATION_SEGMENTS.map((segment) => `<button type="button" data-allocation="${segment.name}" aria-pressed="${this._allocSelected === segment.name}" class="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-control px-1 text-[10.5px] transition-[background-color,color,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${this._allocSelected === segment.name ? "bg-field text-ink" : "text-ink-2 hover:bg-hover hover:text-ink"}"><span aria-hidden="true" class="size-1.5 shrink-0 rounded-full ${segment.cls}"></span><span class="truncate">${segment.name}</span><span class="shrink-0 tabular-nums">${segment.pct}%</span></button>`).join("")}</div><div class="mt-3 min-h-16 rounded-control bg-inset px-2.5 py-2 shadow-hairline"><span class="block text-[11.5px] font-medium ${active.tone}">${active.label}</span><span class="mt-1 block text-[11px] leading-relaxed text-ink-3">${zh ? "当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。" : "Contribution snapshot across current inventory value. Segment selection changes the inspected group without moving the card."}</span></div></div>`;
  }

  _pageMeta() {
    const zh = this.isZh;
    if (this._page === 0) {
      return {
        prose: zh
          ? `你的 ${entity("Creamery", "bg-orange")} 中表现最差的是 Rocky Road——下跌 ${mono("-6%", "red")}，合 ${mono("-$2,453.44", "red")}。`
          : `The worst performer in your ${entity("Creamery", "bg-orange")} is Rocky Road — down ${mono("-6%", "red")} or ${mono("-$2,453.44", "red")}.`,
        pill: zh ? "需要重新平衡口味组合吗？" : "Should I rebalance flavors?",
      };
    }
    if (this._page === 1) {
      return {
        prose: zh
          ? `<span class="font-medium text-ink">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 ${mono("+$1,834.66", "red")}。`
          : `Unusually high freezer bill on <span class="font-medium text-ink">Dec 13</span> — ${mono("+$1,834.66", "red")} above your average.`,
        pill: zh ? "获取降低冷柜成本的建议" : "Get tips on cutting freezer costs",
      };
    }
    return {
      prose: zh
        ? `你在 ${entity("Vanilla", "bg-orange")} 上投入过重——它占你库存的 <span class="font-medium text-ink">72.5%</span>。`
        : `You're heavily invested in ${entity("Vanilla", "bg-orange")} — it's <span class="font-medium text-ink">72.5%</span> of your case.`,
      pill: zh ? "如果看季节性口味，会有什么变化？" : "If we look at seasonals, what changes?",
    };
  }

  _submitFollowUp(button, container) {
    this._submittedPage = this._page;
    button.disabled = true;
    button.className = "min-h-11 rounded-full px-3 text-left text-[12px] shadow-btn transition-[background-color,color,opacity,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-not-allowed bg-accent-tint font-medium text-accent-ink";
    button.textContent = this.isZh ? "问题已添加" : "Question added";
    const status = document.createElement("span");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.className = "text-[11px] text-ink-3";
    status.textContent = this.isZh
      ? "后续问题已添加到对话。"
      : "Follow-up question added to the conversation.";
    container.append(status);
  }

  _alignReactTextNodes() {
    this.shadowRoot?.querySelectorAll("[data-react-text-entity]").forEach((element) => {
      const text = [...element.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.startsWith("@"),
      );
      if (text instanceof Text && text.length > 1) text.splitText(1);
      element.removeAttribute("data-react-text-entity");
    });

    const title = this.shadowRoot?.querySelector("[data-react-text-allocation-title]");
    const text = title
      ? [...title.childNodes].find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.startsWith("Vanilla "),
        )
      : null;
    if (text instanceof Text && text.length > 8) text.splitText(8);
    title?.removeAttribute("data-react-text-allocation-title");
  }

  render() {
    const preservedHeader = this._preserveHeaderOnRender
      ? this.shadowRoot?.querySelector('[class~="min-h-[456px]"]')?.firstElementChild
      : null;
    const preservedChart = this._preserveChartOnRender
      ? this.shadowRoot?.querySelector("[data-liveline-root]")
      : null;
    if (!(preservedChart instanceof HTMLElement)) this._unmountChart();
    const zh = this.isZh;
    const meta = this._pageMeta();
    const card = this._page === 0 ? this._compareCard() : this._page === 1 ? this._anomalyCard() : this._allocationCard();
    const submitted = this._submittedPage === this._page;
    const focusClasses = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page";
    this.setHtml(
      `<div class="min-h-[456px] w-full max-w-86"><div class="flex min-h-11 items-center justify-between"><span class="flex items-baseline gap-1.5"><span class="text-[13px] font-semibold text-ink">${zh ? "智能洞察" : "Insights"}</span><span class="text-[13px] text-ink-3 tabular-nums">3</span></span><span class="flex items-center gap-1"><button id="btn-prev" type="button" aria-label="${zh ? "上一条洞察" : "Previous insight"}" class="flex size-11 items-center justify-center rounded-control text-ink-3 transition-[background-color,color,transform] duration-100 hover:bg-hover hover:text-ink active:scale-[0.96] ${focusClasses}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg></button><button id="btn-next" type="button" aria-label="${zh ? "下一条洞察" : "Next insight"}" class="flex size-11 items-center justify-center rounded-control text-ink-3 transition-[background-color,color,transform] duration-100 hover:bg-hover hover:text-ink active:scale-[0.96] ${focusClasses}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></button></span></div><div style="animation:fade-up 300ms cubic-bezier(0.23,1,0.32,1) both"><p class="mt-1 text-[12.5px] leading-relaxed text-ink-2">${meta.prose}</p><div class="mt-2">${card}</div><div data-followup-container class="mt-2 flex flex-wrap items-center gap-2"><button data-followup type="button" ${submitted ? "disabled" : ""} class="min-h-11 rounded-full px-3 text-left text-[12px] shadow-btn transition-[background-color,color,opacity,transform] active:scale-[0.98] ${focusClasses} ${submitted ? "cursor-not-allowed bg-accent-tint font-medium text-accent-ink" : "bg-surface text-ink hover:bg-hover"}">${submitted ? (zh ? "问题已添加" : "Question added") : meta.pill}</button>${submitted ? `<span role="status" aria-live="polite" class="text-[11px] text-ink-3">${zh ? "后续问题已添加到对话。" : "Follow-up question added to the conversation."}</span>` : ""}</div></div></div>`,
      INSIGHT_CHART_CSS,
    );
    this._alignReactTextNodes();

    if (preservedHeader instanceof HTMLElement) {
      const nextHeader = this.shadowRoot?.querySelector(
        '[class~="min-h-[456px]"]',
      )?.firstElementChild;
      nextHeader?.replaceWith(preservedHeader);
    }

    if (preservedChart instanceof HTMLElement) {
      const nextChart = this.shadowRoot?.querySelector("[data-liveline-root]");
      nextChart?.replaceWith(preservedChart);
    }

    if (this._page < 2) {
      if (preservedChart instanceof HTMLElement && this._chartRoot) {
        this._renderMountedChart();
      } else {
        this._mountChart();
      }
    }

    if (!(preservedHeader instanceof HTMLElement)) {
      this.shadowRoot?.querySelector("#btn-prev")?.addEventListener("click", () => this.setPage(-1));
      this.shadowRoot?.querySelector("#btn-next")?.addEventListener("click", () => this.setPage(1));
    }
    this.shadowRoot?.querySelector("#metric-spend")?.addEventListener("click", () => this.setAnomalyMetric("spend"));
    this.shadowRoot?.querySelector("#metric-usage")?.addEventListener("click", () => this.setAnomalyMetric("usage"));
    this.shadowRoot?.querySelectorAll("[data-allocation]").forEach((button) => {
      button.addEventListener("click", () => this.setAllocSelected(button.getAttribute("data-allocation")));
    });
    const stage = this.shadowRoot?.querySelector(".insight-chart-stage");
    if (stage instanceof HTMLElement) this._wireChart(stage);
    const followUp = this.shadowRoot?.querySelector("[data-followup]");
    const followUpContainer = this.shadowRoot?.querySelector("[data-followup-container]");
    if (followUp instanceof HTMLButtonElement && followUpContainer instanceof HTMLElement) {
      followUp.addEventListener("click", () => this._submitFollowUp(followUp, followUpContainer));
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-insight-cards")) {
  customElements.define("nai-insight-cards", NaiInsightCards);
}
