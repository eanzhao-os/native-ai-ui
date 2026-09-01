"use client";

import { Liveline, type LivelinePoint, type LivelineSeries } from "liveline";
import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * INSIGHT CARDS
 * Embedded mini-visualizations in an "Insights N ‹ ›"
 * carousel. Chart details stay available to pointer, keyboard,
 * and non-tooltip readers.
 * ───────────────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DISPLAY_END_MINUTE = 12 * 60;

const formatPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
const formatMoney = (value: number) =>
  `$${Math.round(value).toLocaleString("en-US")}`;

type InsightPoint = LivelinePoint & {
  displayMinute: number;
};

function formatClockMinute(minute: number) {
  const hour = Math.floor(minute / 60) % 24;
  const remainder = minute % 60;
  return `${String(hour).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatPointTime(point: InsightPoint, zh: boolean) {
  const clock = formatClockMinute(point.displayMinute);
  return zh ? `今天 ${clock}` : `Today, ${clock}`;
}

function makePoints(
  values: number[],
  snapshotEnd: number,
  gapSeconds = 6,
  displayGapMinutes = 6,
): InsightPoint[] {
  return values.map((value, index) => {
    const remaining = values.length - 1 - index;
    return {
      time: snapshotEnd - remaining * gapSeconds,
      value,
      displayMinute: DISPLAY_END_MINUTE - remaining * displayGapMinutes,
    };
  });
}

function useSnapshotEnd() {
  const [snapshotEnd] = useState(() => Math.floor(Date.now() / 1000));
  return snapshotEnd;
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

const SERIES_COLORS = {
  orange: { light: "#ef720c", dark: "#d95926" },
  accent: { light: "#0285ff", dark: "#3987e5" },
  red: { light: "#e3474c", dark: "#ee5c61" },
} as const;

const seriesColor = (key: keyof typeof SERIES_COLORS, dark: boolean) =>
  dark ? SERIES_COLORS[key].dark : SERIES_COLORS[key].light;

function Entity({ name, tone }: { name: string; tone: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-ink">
      <span aria-hidden="true" className={`inline-block size-2.5 rounded-full ${tone}`} />
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

function chartIndexFromPointer(
  event: ReactPointerEvent<HTMLDivElement>,
  pointCount: number,
) {
  const rect = event.currentTarget.getBoundingClientRect();
  if (rect.width <= 0) return 0;
  const progress = Math.max(
    0,
    Math.min(1, (event.clientX - rect.left) / rect.width),
  );
  return Math.round(progress * (pointCount - 1));
}

function useChartSelection(pointCount: number) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? selectedIndex;

  const pointFromPointer = (event: ReactPointerEvent<HTMLDivElement>) =>
    chartIndexFromPointer(event, pointCount);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const index = pointFromPointer(event);
    setSelectedIndex(index);
    setHoverIndex(index);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    setHoverIndex(pointFromPointer(event));
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    let next: number | null = selectedIndex;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = pointCount - 1;
    else if (event.key === "ArrowLeft") {
      next = selectedIndex === null ? pointCount - 1 : Math.max(0, selectedIndex - 1);
    } else if (event.key === "ArrowRight") {
      next = selectedIndex === null ? 0 : Math.min(pointCount - 1, selectedIndex + 1);
    } else if (event.key === "Escape") {
      setHoverIndex(null);
      setSelectedIndex(null);
      event.preventDefault();
      return;
    } else {
      return;
    }
    setHoverIndex(null);
    setSelectedIndex(next);
    event.preventDefault();
  };

  return {
    activeIndex,
    clearHover: () => setHoverIndex(null),
    clearSelection: () => {
      setHoverIndex(null);
      setSelectedIndex(null);
    },
    onKeyDown,
    onPointerDown,
    onPointerMove,
  };
}

function ChartTooltip({
  id,
  rows,
  time,
}: {
  id: string;
  rows: { label: string; value: string; color: string }[];
  time: string;
}) {
  return (
    <div id={id} role="tooltip" className="insight-chart-tooltip">
      <span className="insight-chart-tooltip-time">{time}</span>
      {rows.map((row) => (
        <div key={row.label} className="insight-chart-tooltip-row">
          <span className="insight-chart-tooltip-label">
            <span
              aria-hidden="true"
              className="insight-chart-tooltip-dot"
              style={{ background: row.color }}
            />
            {row.label}
          </span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}

function CompareCard({ zh }: { zh: boolean }) {
  const dark = useDarkMode();
  const snapshotEnd = useSnapshotEnd();
  const selection = useChartSelection(8);
  const instanceId = useId().replaceAll(":", "");
  const chartId = `insight-compare-${instanceId}`;
  const tableId = `${chartId}-table`;
  const tooltipId = `${chartId}-tooltip`;
  const data = useMemo(
    () => ({
      mint: makePoints(
        [-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41],
        snapshotEnd,
      ),
      pistachio: makePoints(
        [0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15],
        snapshotEnd,
      ),
    }),
    [snapshotEnd],
  );

  const latestMint = data.mint.at(-1)?.value ?? -4.41;
  const latestPistachio = data.pistachio.at(-1)?.value ?? 1.15;
  const mintColor = seriesColor("orange", dark);
  const pistachioColor = seriesColor("accent", dark);
  const series: LivelineSeries[] = useMemo(
    () => [
      {
        id: "mint",
        label: "",
        data: data.mint,
        value: latestMint,
        color: mintColor,
      },
      {
        id: "pistachio",
        label: "",
        data: data.pistachio,
        value: latestPistachio,
        color: pistachioColor,
      },
    ],
    [data.mint, data.pistachio, latestMint, latestPistachio, mintColor, pistachioColor],
  );
  const activePoint =
    selection.activeIndex === null ? null : data.mint[selection.activeIndex];
  const activePosition =
    selection.activeIndex === null
      ? 0
      : (selection.activeIndex / (data.mint.length - 1)) * 100;

  return (
    <div className="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline">
      <div className="flex items-center gap-4">
        {[
          {
            name: "Mint Chip",
            delta: formatPercent(latestMint),
            sub: "-$2,377.66",
            tone: "red",
            color: mintColor,
          },
          {
            name: "Pistachio",
            delta: formatPercent(latestPistachio),
            sub: "+$617.22",
            tone: "green",
            color: pistachioColor,
          },
        ].map((item) => (
          <div key={item.name} className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5 text-[11.5px] text-ink-2">
              <span aria-hidden="true" className="size-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className={`block text-[17px] font-semibold tracking-[-0.01em] tabular-nums ${item.tone === "red" ? "text-red" : "text-green"}`}>
              {item.delta}
            </span>
            <Mono tone={item.tone as "red" | "green"}>{item.sub}</Mono>
          </div>
        ))}
      </div>

      <div className="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
        <div className="flex min-h-9 items-center justify-between border-b border-line px-2.5 py-1.5">
          <span className="text-[11px] text-ink-3 tabular-nums">
            {zh ? "趋势快照" : "Trend snapshot"}
          </span>
          <span className="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
            {zh ? "8 个时点" : "8 points"}
          </span>
        </div>
        <div
          role="group"
          aria-label={zh ? "收益对比趋势图" : "Return comparison chart"}
          aria-activedescendant={
            selection.activeIndex === null
              ? undefined
              : `${chartId}-point-${selection.activeIndex}`
          }
          aria-describedby={tableId}
          tabIndex={0}
          className="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          onKeyDown={selection.onKeyDown}
          onPointerDown={selection.onPointerDown}
          onPointerMove={selection.onPointerMove}
          onPointerLeave={selection.clearHover}
          onPointerCancel={selection.clearHover}
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
            lineWidth={2}
            padding={{ top: 24, right: 0, bottom: 22, left: 0 }}
            formatValue={formatPercent}
          />
          {data.mint.map((point, index) => (
            <span key={point.displayMinute} id={`${chartId}-point-${index}`} className="sr-only">
              {formatPointTime(point, zh)} · Mint Chip {formatPercent(point.value)} · Pistachio {formatPercent(data.pistachio[index].value)}
            </span>
          ))}
          {activePoint && selection.activeIndex !== null && (
            <>
              <span className="insight-chart-cursor" style={{ left: `${activePosition}%` }} />
              <span
                className="insight-chart-tooltip-anchor"
                style={{ left: `${Math.min(Math.max(activePosition, 28), 72)}%` }}
              >
                <ChartTooltip
                  id={tooltipId}
                  time={formatPointTime(activePoint, zh)}
                  rows={[
                    {
                      label: "Mint Chip",
                      value: formatPercent(activePoint.value),
                      color: mintColor,
                    },
                    {
                      label: "Pistachio",
                      value: formatPercent(data.pistachio[selection.activeIndex].value),
                      color: pistachioColor,
                    },
                  ]}
                />
              </span>
            </>
          )}
        </div>
      </div>

      <table id={tableId} className="sr-only" aria-label={zh ? "收益对比数据" : "Return comparison data"}>
        <thead>
          <tr>
            <th>{zh ? "时间" : "Time"}</th>
            <th>Mint Chip</th>
            <th>Pistachio</th>
          </tr>
        </thead>
        <tbody>
          {data.mint.map((point, index) => (
            <tr key={point.displayMinute}>
              <td>{formatClockMinute(point.displayMinute)}</td>
              <td>{formatPercent(point.value)}</td>
              <td>{formatPercent(data.pistachio[index].value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnomalyCard({ zh }: { zh: boolean }) {
  const dark = useDarkMode();
  const snapshotEnd = useSnapshotEnd();
  const [metric, setMetric] = useState<"spend" | "usage">("spend");
  const selection = useChartSelection(8);
  const instanceId = useId().replaceAll(":", "");
  const chartId = `insight-anomaly-${instanceId}`;
  const tooltipId = `${chartId}-tooltip`;
  const spend = useMemo(
    () => makePoints([274, 289, 264, 307, 331, 1210, 1718, 2112], snapshotEnd, 7, 8),
    [snapshotEnd],
  );
  const usage = useMemo(
    () => makePoints([18, 19, 17, 21, 22, 58, 81, 96], snapshotEnd, 7, 8),
    [snapshotEnd],
  );

  const data = metric === "spend" ? spend : usage;
  const value = data.at(-1)?.value ?? (metric === "spend" ? 2112 : 96);
  const threshold = metric === "spend" ? "$2,112" : "82 kWh";
  const moneyLabel = formatMoney(spend.at(-1)?.value ?? 2112);
  const color = seriesColor("red", dark);
  const activePoint =
    selection.activeIndex === null ? null : data[selection.activeIndex];
  const activePosition =
    selection.activeIndex === null
      ? 0
      : (selection.activeIndex / (data.length - 1)) * 100;

  const chooseMetric = (next: "spend" | "usage") => {
    setMetric(next);
    selection.clearSelection();
  };

  return (
    <div className="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline">
      <div className="flex min-h-8 items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-1.5 text-[12px] font-medium text-ink">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          <span className="truncate">{zh ? "冷柜支出偏高" : "High freezer spend"}</span>
        </span>
        <span className="rounded-full bg-red-tint px-2 py-0.5 text-[10.5px] font-medium text-red">
          {zh ? "异常" : "Anomaly"}
        </span>
      </div>

      <div className="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
        <div className="flex min-h-12 items-center justify-between gap-2 border-b border-line px-2.5 py-1.5">
          <span className="min-w-0 truncate text-[11px] text-ink-3 tabular-nums">
            {selection.activeIndex !== null
              ? metric === "spend"
                ? formatMoney(data[selection.activeIndex].value)
                : `${Math.round(data[selection.activeIndex].value)} kWh`
              : zh
                ? `${threshold} 阈值`
                : `${threshold} threshold`}
          </span>
          <span role="group" aria-label={zh ? "异常指标" : "Anomaly metric"} className="flex shrink-0 rounded-full bg-field p-0.5">
            {(["spend", "usage"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={metric === item}
                onClick={() => chooseMetric(item)}
                className={`min-h-11 min-w-11 rounded-full px-2.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                  metric === item
                    ? "bg-surface text-ink shadow-btn"
                    : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {item === "spend" ? (zh ? "支出" : "Spend") : zh ? "用电" : "Usage"}
              </button>
            ))}
          </span>
        </div>
        <div
          role="group"
          aria-label={
            metric === "spend"
              ? zh
                ? "支出趋势图"
                : "Spend trend chart"
              : zh
                ? "用电趋势图"
                : "Usage trend chart"
          }
          aria-activedescendant={
            selection.activeIndex === null
              ? undefined
              : `${chartId}-point-${selection.activeIndex}`
          }
          tabIndex={0}
          className="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
          onKeyDown={selection.onKeyDown}
          onPointerDown={selection.onPointerDown}
          onPointerMove={selection.onPointerMove}
          onPointerLeave={selection.clearHover}
          onPointerCancel={selection.clearHover}
        >
          <Liveline
            data={data}
            value={value}
            theme={dark ? "dark" : "light"}
            color={color}
            grid
            scrub={false}
            fill={false}
            pulse={false}
            momentum={false}
            paused
            window={49}
            lineWidth={2}
            cursor="crosshair"
            padding={{ top: 18, right: 0, bottom: 22, left: 0 }}
            formatValue={(current) =>
              metric === "spend"
                ? formatMoney(current)
                : `${Math.round(current)} kWh`
            }
          />
          {data.map((point, index) => (
            <span key={point.displayMinute} id={`${chartId}-point-${index}`} className="sr-only">
              {formatPointTime(point, zh)} · {metric === "spend" ? formatMoney(point.value) : `${Math.round(point.value)} kWh`}
            </span>
          ))}
          {activePoint && selection.activeIndex !== null && (
            <>
              <span className="insight-chart-cursor" style={{ left: `${activePosition}%` }} />
              <span
                className="insight-chart-tooltip-anchor"
                style={{ left: `${Math.min(Math.max(activePosition, 28), 72)}%` }}
              >
                <ChartTooltip
                  id={tooltipId}
                  time={formatPointTime(activePoint, zh)}
                  rows={[
                    {
                      label:
                        metric === "spend"
                          ? zh
                            ? "支出"
                            : "Spend"
                          : zh
                            ? "用电"
                            : "Usage",
                      value:
                        metric === "spend"
                          ? formatMoney(activePoint.value)
                          : `${Math.round(activePoint.value)} kWh`,
                      color,
                    },
                  ]}
                />
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-[17px] font-semibold tracking-[-0.01em] text-ink tabular-nums">
          {zh ? `${moneyLabel} 已支出` : `${moneyLabel} spent`}
        </span>
        <Mono tone="red">+$1,834.66</Mono>
        <span className="text-[11px] text-ink-3">{zh ? "较 3 个月均值" : "vs 3 months"}</span>
      </div>
    </div>
  );
}

function AllocationCard({ zh }: { zh: boolean }) {
  const segments = [
    { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", cls: "bg-orange", tone: "text-orange" },
    { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", cls: "bg-line-strong", tone: "text-ink-2" },
    { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", cls: "bg-line", tone: "text-ink-3" },
  ];
  const [selected, setSelected] = useState(segments[0].name);
  const active = segments.find((segment) => segment.name === selected) ?? segments[0];

  return (
    <div className="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline">
      <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
        <span className="flex size-4 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">
          V
        </span>
        Vanilla {zh ? "口味配置" : "allocation"}
      </span>
      <span className="mt-1 block text-[20px] font-semibold tracking-[-0.01em] text-ink tabular-nums">
        {active.amount}
      </span>

      <div
        className="mt-3 flex h-12 gap-0.5 overflow-hidden rounded-full bg-field p-0.5"
        role="group"
        aria-label={zh ? "配置分段" : "Allocation segments"}
      >
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            aria-label={`${segment.label}: ${segment.pct}%`}
            onClick={() => setSelected(segment.name)}
            className={`relative h-full overflow-hidden rounded-full ${segment.cls} transition-[opacity,transform,box-shadow] duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset`}
            style={{
              width: `${segment.pct}%`,
              opacity: selected === segment.name ? 1 : 0.58,
              boxShadow:
                selected === segment.name
                  ? "inset 0 0 0 2px var(--surface)"
                  : undefined,
              transitionTimingFunction: EASE,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 rounded-full bg-white/20 transition-[width,opacity] duration-500"
              style={{
                width: selected === segment.name ? "calc(100% - 8px)" : "0%",
                opacity: selected === segment.name ? 1 : 0,
                transitionTimingFunction: EASE,
              }}
            />
          </button>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1" role="group" aria-label={zh ? "配置图例" : "Allocation legend"}>
        {segments.map((segment) => (
          <button
            key={segment.name}
            type="button"
            aria-pressed={selected === segment.name}
            onClick={() => setSelected(segment.name)}
            className={`flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-control px-1 text-[10.5px] transition-[background-color,color,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
              selected === segment.name
                ? "bg-field text-ink"
                : "text-ink-2 hover:bg-hover hover:text-ink"
            }`}
          >
            <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${segment.cls}`} />
            <span className="truncate">{segment.name}</span>
            <span className="shrink-0 tabular-nums">{segment.pct}%</span>
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
  const [submittedPage, setSubmittedPage] = useState<number | null>(null);

  const move = (direction: -1 | 1) => {
    setPage((current) => (current + direction + PAGES.length) % PAGES.length);
    setSubmittedPage(null);
  };

  const { proseEn, proseZh, Card, pillEn, pillZh } = PAGES[page];
  const submitted = submittedPage === page;
  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page";

  return (
    <div className="min-h-[456px] w-full max-w-86">
      <div className="flex min-h-11 items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-semibold text-ink">{zh ? "智能洞察" : "Insights"}</span>
          <span className="text-[13px] text-ink-3 tabular-nums">{PAGES.length}</span>
        </span>
        <span className="flex items-center gap-1">
          {(["M15 18l-6-6 6-6", "M9 6l6 6-6 6"] as const).map((path, index) => (
            <button
              key={path}
              type="button"
              aria-label={
                index === 0
                  ? zh
                    ? "上一条洞察"
                    : "Previous insight"
                  : zh
                    ? "下一条洞察"
                    : "Next insight"
              }
              onClick={() => move(index === 0 ? -1 : 1)}
              className={`flex size-11 items-center justify-center rounded-control text-ink-3 transition-[background-color,color,transform] duration-100 hover:bg-hover hover:text-ink active:scale-[0.96] ${focusClasses}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={path} />
              </svg>
            </button>
          ))}
        </span>
      </div>

      <div
        key={page}
        style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}
      >
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{zh ? proseZh : proseEn}</p>
        <div className="mt-2">
          <Card zh={zh} />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={submitted}
            onClick={() => setSubmittedPage(page)}
            className={`min-h-11 rounded-full px-3 text-left text-[12px] shadow-btn transition-[background-color,color,opacity,transform] active:scale-[0.98] ${focusClasses} ${
              submitted
                ? "cursor-not-allowed bg-accent-tint font-medium text-accent-ink"
                : "bg-surface text-ink hover:bg-hover"
            }`}
          >
            {submitted ? (zh ? "问题已添加" : "Question added") : zh ? pillZh : pillEn}
          </button>
          {submitted && (
            <span role="status" aria-live="polite" className="text-[11px] text-ink-3">
              {zh ? "后续问题已添加到对话。" : "Follow-up question added to the conversation."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
