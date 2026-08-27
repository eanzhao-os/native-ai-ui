"use client";

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * INSIGHT CARDS
 * Embedded mini-visualizations in an "Insights N ‹ ›"
 * carousel. Autoplay yields as soon as a person uses it.
 * ───────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const formatPercent = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;
const formatMoney = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const SNAPSHOT_END = Math.floor(Date.now() / 1000);

function makePoints(values: number[], gap = 6): LivelinePoint[] {
  return values.map((value, index) => ({
    time: SNAPSHOT_END - (values.length - 1 - index) * gap,
    value,
  }));
}

function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}

/* chart series colors follow the theme tokens (light/dark pairs) */
const SERIES_COLORS = {
  orange: { light: "#ef720c", dark: "#f68f3c" },
  accent: { light: "#0285ff", dark: "#3d9aff" },
  red: { light: "#e3474c", dark: "#ee5c61" },
} as const;

const seriesColor = (key: keyof typeof SERIES_COLORS, dark: boolean) =>
  dark ? SERIES_COLORS[key].dark : SERIES_COLORS[key].light;

/* inline @entity mention */
function Entity({ name, tone }: { name: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
      <span className={`inline-block size-2.5 rounded-full ${tone}`} />
      @{name}
    </span>
  );
}

function Mono({ children, tone }: { children: React.ReactNode; tone: "red" | "green" }) {
  return (
    <code className={`font-mono text-[11.5px] ${tone === "red" ? "text-red" : "text-green"}`}>
      {children}
    </code>
  );
}

function chartIndexFromPointer(event: React.PointerEvent<HTMLDivElement>, pointCount: number) {
  const rect = event.currentTarget.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  return Math.round(progress * (pointCount - 1));
}

function ChartTooltip({ zh, rows }: { zh: boolean; rows: { label: string; value: string; color: string }[] }) {
  return (
    <div className="insight-chart-tooltip">
      <span className="insight-chart-tooltip-time">{zh ? "今天 12:00" : "Today, 12:00"}</span>
      {rows.map((row) => (
        <div key={row.label} className="insight-chart-tooltip-row">
          <span className="insight-chart-tooltip-label"><span className="insight-chart-tooltip-dot" style={{ background: row.color }} />{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}

/* 1 — return comparison: 2 series, legend + big deltas + line chart */
function CompareCard({ zh }: { zh: boolean }) {
  const dark = useDarkMode();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const data = useMemo(
    () => ({
      mint: makePoints([-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41]),
      pistachio: makePoints([0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15]),
    }),
    [],
  );

  const latestMint = data.mint.at(-1)?.value ?? -4.41;
  const latestPistachio = data.pistachio.at(-1)?.value ?? 1.15;
  const series: LivelineSeries[] = useMemo(
    () => [
      {
        id: "mint",
        label: "",
        data: data.mint,
        value: latestMint,
        color: seriesColor("orange", dark),
      },
      {
        id: "pistachio",
        label: "",
        data: data.pistachio,
        value: latestPistachio,
        color: seriesColor("accent", dark),
      },
    ],
    [data.mint, data.pistachio, latestMint, latestPistachio, dark],
  );

  return (
    <div className="min-h-[278px] rounded-card bg-surface p-3 shadow-hairline">
      <div className="flex items-center gap-4">
        {[
          {
            name: "Mint Chip",
            delta: formatPercent(latestMint),
            sub: "-$2,377.66",
            tone: "red",
            dot: "bg-orange",
          },
          {
            name: "Pistachio",
            delta: formatPercent(latestPistachio),
            sub: "+$617.22",
            tone: "green",
            dot: "bg-accent",
          },
        ].map((s) => (
          <div key={s.name} className="flex-1">
            <span className="flex items-center gap-1.5 text-[11.5px] text-ink-2">
              <span className={`size-2 rounded-full ${s.dot}`} />
              {s.name}
            </span>
            <span className={`block text-[17px] font-semibold tracking-[-0.01em] tabular-nums ${s.tone === "red" ? "text-red" : "text-green"}`}>
              {s.delta}
            </span>
            <Mono tone={s.tone as "red" | "green"}>{s.sub}</Mono>
          </div>
        ))}
      </div>
      <div className="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
        <div className="flex items-center justify-between border-b border-line px-2.5 py-1.5">
          <span className="text-[11px] text-ink-3 tabular-nums">
            {zh ? "趋势快照" : "Trend snapshot"}
          </span>
          <span className="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
            {zh ? "快照" : "Snapshot"}
          </span>
        </div>
        <div
          className="insight-chart-stage relative h-[166px]"
          onPointerDown={(event) => setHoverIndex(chartIndexFromPointer(event, data.mint.length))}
          onPointerMove={(event) => setHoverIndex(chartIndexFromPointer(event, data.mint.length))}
          onPointerLeave={() => setHoverIndex(null)}
          onPointerCancel={() => setHoverIndex(null)}
          onPointerUp={() => setHoverIndex(null)}
        >
          <Liveline
            data={[]}
            value={0}
            series={series}
            theme={dark ? "dark" : "light"}
            grid={false}
            pulse={false}
            window={42}
            paused
            scrub={false}
            cursor="default"
            lineWidth={2.25}
            padding={{ top: 24, right: 0, bottom: 22, left: 0 }}
            formatValue={formatPercent}
          />
          {hoverIndex !== null && <>
            <span className="insight-chart-cursor" style={{ left: `${(hoverIndex / (data.mint.length - 1)) * 100}%` }} />
            <span className="insight-chart-tooltip-anchor" style={{ left: `${Math.min(Math.max((hoverIndex / (data.mint.length - 1)) * 100, 28), 72)}%` }}>
              <ChartTooltip zh={zh} rows={[{ label: "Mint Chip", value: formatPercent(data.mint[hoverIndex].value), color: "var(--orange)" }, { label: "Pistachio", value: formatPercent(data.pistachio[hoverIndex].value), color: "var(--accent)" }]} />
            </span>
          </>}
        </div>
      </div>
    </div>
  );
}

/* 2 — anomaly: bars with threshold + big spent value */
function AnomalyCard({ zh }: { zh: boolean }) {
  const dark = useDarkMode();
  const [metric, setMetric] = useState<"spend" | "usage">("spend");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const spend = useMemo(
    () => makePoints([274, 289, 264, 307, 331, 1210, 1718, 2112], 7),
    [],
  );
  const usage = useMemo(
    () => makePoints([18, 19, 17, 21, 22, 58, 81, 96], 7),
    [],
  );

  const data = metric === "spend" ? spend : usage;
  const value = data.at(-1)?.value ?? (metric === "spend" ? 2112 : 96);
  const threshold = metric === "spend" ? "$2,112" : "82 kWh";
  const moneyLabel = formatMoney(spend.at(-1)?.value ?? 2112);

  return (
    <div className="min-h-[278px] rounded-card bg-surface p-3 shadow-hairline">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          {zh ? "冷柜支出偏高" : "High freezer spend"}
        </span>
        <span className="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
          {zh ? "快照" : "Snapshot"}
        </span>
      </div>
      <div className="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
        <div className="flex items-center justify-between border-b border-line px-2.5 py-1.5">
          <span className="text-[11px] text-ink-3 tabular-nums">
            {hoverIndex !== null
              ? metric === "spend"
                ? formatMoney(data[hoverIndex].value)
                : `${Math.round(data[hoverIndex].value)} kWh`
              : zh ? `${threshold} 阈值` : `${threshold} threshold`}
          </span>
          <span className="flex rounded-full bg-field p-0.5">
            {(["spend", "usage"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => setMetric(item)}
                className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.96] ${
                  metric === item ? "bg-surface text-ink shadow-btn" : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {item === "spend" ? (zh ? "支出" : "Spend") : (zh ? "用电" : "Usage")}
              </button>
            ))}
          </span>
        </div>
        <div
          className="insight-chart-stage relative h-[166px]"
          onPointerDown={(event) => setHoverIndex(chartIndexFromPointer(event, data.length))}
          onPointerMove={(event) => setHoverIndex(chartIndexFromPointer(event, data.length))}
          onPointerLeave={() => setHoverIndex(null)}
          onPointerCancel={() => setHoverIndex(null)}
          onPointerUp={() => setHoverIndex(null)}
        >
          <Liveline
            data={data}
            value={value}
            theme={dark ? "dark" : "light"}
            color={seriesColor("red", dark)}
            grid
            scrub={false}
            fill={false}
            pulse={false}
            momentum={false}
            paused
            window={49}
            lineWidth={2.25}
            cursor="crosshair"
            padding={{ top: 18, right: 0, bottom: 22, left: 0 }}
            formatValue={(v) => (metric === "spend" ? formatMoney(v) : `${Math.round(v)} kWh`)}
          />
          {hoverIndex !== null && <>
            <span className="insight-chart-cursor" style={{ left: `${(hoverIndex / (data.length - 1)) * 100}%` }} />
            <span className="insight-chart-tooltip-anchor" style={{ left: `${Math.min(Math.max((hoverIndex / (data.length - 1)) * 100, 28), 72)}%` }}>
              <ChartTooltip zh={zh} rows={[{ label: metric === "spend" ? (zh ? "支出" : "Spend") : (zh ? "用电" : "Usage"), value: metric === "spend" ? formatMoney(data[hoverIndex].value) : `${Math.round(data[hoverIndex].value)} kWh`, color: "var(--red)" }]} />
            </span>
          </>}
        </div>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink tabular-nums">
          {zh ? `${moneyLabel} 已支出` : `${moneyLabel} spent`}
        </span>
        <Mono tone="red">+$1,834.66</Mono>
        <span className="text-[11px] text-ink-3">{zh ? "较 3 个月均值" : "vs 3 months"}</span>
      </div>
    </div>
  );
}

/* 3 — allocation: hero number + segmented bar + legend */
function AllocationCard({ zh }: { zh: boolean }) {
  const segments = [
    { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", cls: "bg-orange", tone: "text-orange" },
    { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", cls: "bg-line-strong", tone: "text-ink-2" },
    { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", cls: "bg-line", tone: "text-ink-3" },
  ];
  const [selected, setSelected] = useState(segments[0].name);
  const active = segments.find((segment) => segment.name === selected) ?? segments[0];

  return (
    <div className="min-h-[278px] rounded-card bg-surface p-3 shadow-hairline">
      <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">
          V
        </span>
        Vanilla {zh ? "口味配置" : "allocation"}
      </span>
      <span className="mt-1 block text-[20px] font-semibold tracking-[-0.01em] text-ink tabular-nums">
        {active.amount}
      </span>
      <div
        className="mt-3 flex h-9 gap-0.5 overflow-hidden rounded-full bg-field p-0.5"
        role="group"
        aria-label={zh ? "配置分段" : "Allocation segments"}
      >
        {segments.map((s) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={selected === s.name}
            aria-label={`${s.label}: ${s.pct}%`}
            onClick={() => setSelected(s.name)}
            className={`relative h-full overflow-hidden rounded-full ${s.cls} transition-[opacity,transform,box-shadow] duration-300 active:scale-[0.98]`}
            style={{
              width: `${s.pct}%`,
              opacity: selected === s.name ? 1 : 0.58,
              boxShadow: selected === s.name ? "inset 0 0 0 1px rgba(255,255,255,0.22)" : undefined,
              transitionTimingFunction: EASE,
            }}
          >
            <span
              className="absolute inset-y-1 left-1 rounded-full bg-white/20 transition-[width,opacity] duration-500"
              style={{
                width: selected === s.name ? "calc(100% - 8px)" : "0%",
                opacity: selected === s.name ? 1 : 0,
                transitionTimingFunction: EASE,
              }}
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {segments.map((s) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={selected === s.name}
            onClick={() => setSelected(s.name)}
            className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] transition-[background-color,color,transform] duration-150 active:scale-[0.96] ${
              selected === s.name ? "bg-field text-ink" : "text-ink-2 hover:bg-hover hover:text-ink"
            }`}
          >
            <span className={`size-1.5 rounded-full ${s.cls}`} />
            {s.name} <span className="tabular-nums">{s.pct}%</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-16 rounded-control bg-inset px-2.5 py-2 shadow-hairline">
        <span className={`block text-[11.5px] font-medium ${active.tone}`}>{active.label}</span>
        <span className="mt-1 block text-[11px] leading-relaxed text-ink-3">
          {zh
            ? "当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。"
            : "Contribution snapshot across current inventory value. Segment selection changes the inspected group without moving the card."}
        </span>
      </div>
    </div>
  );
}

const PAGES = [
  {
    key: "compare",
    proseEn: (
      <>
        The worst performer in your <Entity name="Creamery" tone="bg-orange" /> is
        Rocky Road — down <Mono tone="red">-6%</Mono> or <Mono tone="red">-$2,453.44</Mono>.
      </>
    ),
    proseZh: (
      <>
        你的 <Entity name="Creamery" tone="bg-orange" /> 中表现最差的是
        Rocky Road——下跌 <Mono tone="red">-6%</Mono>，合 <Mono tone="red">-$2,453.44</Mono>。
      </>
    ),
    Card: CompareCard,
    pillEn: "Should I rebalance flavors?",
    pillZh: "需要重新平衡口味组合吗？",
  },
  {
    key: "anomaly",
    proseEn: (
      <>
        Unusually high freezer bill on <span className="font-medium text-ink">Dec 13</span> —{" "}
        <Mono tone="red">+$1,834.66</Mono> above your average.
      </>
    ),
    proseZh: (
      <>
        <span className="font-medium text-ink">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出{" "}
        <Mono tone="red">+$1,834.66</Mono>。
      </>
    ),
    Card: AnomalyCard,
    pillEn: "Get tips on cutting freezer costs",
    pillZh: "获取降低冷柜成本的建议",
  },
  {
    key: "allocation",
    proseEn: (
      <>
        You&apos;re heavily invested in <Entity name="Vanilla" tone="bg-orange" /> — it&apos;s{" "}
        <span className="font-medium text-ink">72.5%</span> of your case.
      </>
    ),
    proseZh: (
      <>
        你在 <Entity name="Vanilla" tone="bg-orange" /> 上投入过重——它占你库存的{" "}
        <span className="font-medium text-ink">72.5%</span>。
      </>
    ),
    Card: AllocationCard,
    pillEn: "If we look at seasonals, what changes?",
    pillZh: "如果看季节性口味，会有什么变化？",
  },
];

export default function InsightCards({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("insight-cards", propLang);
  const zh = lang === "zh";
  const [page, setPage] = useState(0);

  const move = (direction: -1 | 1) => {
    setPage((current) => (current + direction + PAGES.length) % PAGES.length);
  };

  const { proseEn, proseZh, Card, pillEn, pillZh } = PAGES[page];

  return (
    <div className="min-h-[408px] w-full max-w-86">
      {/* pager header */}
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-semibold text-ink">{zh ? "智能洞察" : "Insights"}</span>
          <span className="text-[13px] text-ink-3 tabular-nums">{PAGES.length}</span>
        </span>
        <span className="flex items-center gap-0.5">
          {(["M15 18l-6-6 6-6", "M9 6l6 6-6 6"] as const).map((d, i) => (
            <button
              key={i}
              aria-label={i === 0 ? (zh ? "上一条洞察" : "Previous insight") : (zh ? "下一条洞察" : "Next insight")}
              onClick={() => move(i === 0 ? -1 : 1)}
              className="flex size-6 items-center justify-center rounded-[6px] text-ink-3
                transition-[background-color,color,transform] duration-100 hover:bg-hover
                hover:text-ink active:scale-[0.96]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </button>
          ))}
        </span>
      </div>

      {/* page content — keyed so each page fades up on arrival */}
      <div
        key={page}
        style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}
      >
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">{zh ? proseZh : proseEn}</p>
        <div className="mt-2">
          <Card zh={zh} />
        </div>
        <button
          className="mt-2 rounded-full bg-surface px-3 py-1.5 text-left text-[12px] text-ink
            shadow-btn transition-colors duration-100 hover:bg-hover"
        >
          {zh ? pillZh : pillEn}
        </button>
      </div>
    </div>
  );
}
