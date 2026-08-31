"use client";

import { useId, useMemo, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * FILTER TABLE
 * Status chips directly filter a real task table.
 * ───────────────────────────────────────────────────────── */

type Status = "todo" | "progress" | "done";

const FILTERS: { key: "all" | Status; labelEn: string; labelZh: string; dot?: string }[] = [
  { key: "all", labelEn: "All", labelZh: "全部" },
  { key: "todo", labelEn: "To do", labelZh: "待办", dot: "#f09a2f" },
  { key: "progress", labelEn: "In Progress", labelZh: "进行中", dot: "#16a6c7" },
  { key: "done", labelEn: "Completed", labelZh: "已完成", dot: "#25a878" },
];

const ROWS: { taskEn: string; taskZh: string; dateEn: string; dateZh: string; status: Status; ownerEn: string; ownerZh: string }[] = [
  { taskEn: "Restock mango sorbet", taskZh: "补货芒果雪葩", dateEn: "Dec 03", dateZh: "12月3日", status: "todo", ownerEn: "Mango Moon Gelato", ownerZh: "Mango Moon 意式冰淇淋" },
  { taskEn: "Churn black sesame", taskZh: "搅拌黑芝麻基底", dateEn: "Sep 22", dateZh: "9月22日", status: "progress", ownerEn: "Kumo Creamery", ownerZh: "Kumo 乳品工坊" },
  { taskEn: "Print summer menu", taskZh: "印制夏季菜单", dateEn: "Jan 02", dateZh: "1月2日", status: "todo", ownerEn: "Coral Coast Sorbet", ownerZh: "Coral Coast 雪葩" },
  { taskEn: "Taste-test batch 42", taskZh: "试吃评测第 42 批", dateEn: "Nov 08", dateZh: "11月8日", status: "progress", ownerEn: "Maple Orbit", ownerZh: "Maple Orbit 枫糖" },
  { taskEn: "Order waffle cones", taskZh: "订购华夫脆筒", dateEn: "Apr 14", dateZh: "4月14日", status: "done", ownerEn: "Aurora Scoops", ownerZh: "Aurora 冰品铺" },
];

const PILLS: Record<Status, { labelEn: string; labelZh: string; color: string }> = {
  todo: { labelEn: "To do", labelZh: "待办", color: "#f09a2f" },
  progress: { labelEn: "In Progress", labelZh: "进行中", color: "#16a6c7" },
  done: { labelEn: "Completed", labelZh: "已完成", color: "#25a878" },
};

const HEADERS = [
  { en: "Task name", zh: "任务名称" },
  { en: "Date", zh: "日期" },
  { en: "Status", zh: "状态" },
  { en: "Advisor", zh: "顾问" },
];

export default function FilterTable({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("filter-table", propLang);
  const zh = lang === "zh";
  const bodyId = useId();
  const [filter, setFilter] = useState<"all" | Status>("all");

  const counts = useMemo(
    () => ({
      all: ROWS.length,
      todo: ROWS.filter((row) => row.status === "todo").length,
      progress: ROWS.filter((row) => row.status === "progress").length,
      done: ROWS.filter((row) => row.status === "done").length,
    }),
    [],
  );
  const filteredRows = filter === "all" ? ROWS : ROWS.filter((row) => row.status === filter);
  const statusText = zh
    ? `显示 ${filteredRows.length}/${ROWS.length} 项任务`
    : `Showing ${filteredRows.length} of ${ROWS.length} tasks`;

  return (
    <div className="w-full max-w-105">
      <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
        <div
          role="group"
          aria-label={zh ? "任务状态筛选" : "Task status filters"}
          className="-mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 py-1"
          style={{ scrollbarWidth: "none" }}
        >
          {FILTERS.map((item) => {
            const active = filter === item.key;
            const count = counts[item.key];
            return (
              <button
                key={item.key}
                type="button"
                aria-controls={bodyId}
                aria-pressed={active}
                onClick={() => setFilter(item.key)}
                className={`flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[11.5px] font-semibold transition-[background-color,box-shadow,color] duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent ${
                  active ? "bg-surface text-ink shadow-btn" : "text-ink-2 hover:bg-hover hover:text-ink"
                }`}
              >
                {item.dot ? <span className="size-1.5 rounded-full" style={{ background: item.dot }} aria-hidden="true" /> : null}
                {zh ? item.labelZh : item.labelEn}
                <span className={`rounded-[4px] px-1 text-[10.5px] tabular-nums ${active ? "bg-field text-ink-2" : "text-ink-3"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <span role="status" aria-live="polite" aria-atomic="true" className="shrink-0 px-1 text-[10.5px] font-medium text-ink-3">
          {statusText}
        </span>
      </div>

      <div
        role="region"
        aria-label={zh ? "可横向滚动的任务表格" : "Scrollable task table"}
        className="overflow-x-auto rounded-card border border-line bg-surface shadow-card focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
        tabIndex={0}
        style={{ scrollbarWidth: "thin" }}
      >
        <table className="w-full min-w-[560px] table-fixed border-collapse text-left text-[12px]" aria-label={zh ? "任务" : "Tasks"}>
          <caption className="sr-only">{statusText}</caption>
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[15%]" />
            <col className="w-[21%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-line bg-inset text-[11px] font-semibold text-ink-3">
              {HEADERS.map((header) => (
                <th key={header.en} scope="col" className="h-9 px-3">
                  {zh ? header.zh : header.en}
                </th>
              ))}
            </tr>
          </thead>
          <tbody id={bodyId}>
            {filteredRows.map((row) => {
              const pill = PILLS[row.status];
              const task = zh ? row.taskZh : row.taskEn;
              const owner = zh ? row.ownerZh : row.ownerEn;
              return (
                <tr key={row.taskEn} className="border-b border-line last:border-0 hover:bg-hover">
                  <th scope="row" className="h-10 truncate px-3 font-semibold text-ink" title={task}>{task}</th>
                  <td className="h-10 whitespace-nowrap px-3 tabular-nums text-ink-2">{zh ? row.dateZh : row.dateEn}</td>
                  <td className="h-10 px-3">
                    <span
                      className="inline-flex min-h-5 items-center rounded-[5px] px-1.5 text-[10.5px] font-semibold"
                      style={{
                        color: pill.color,
                        background: `color-mix(in srgb, ${pill.color} 14%, transparent)`,
                      }}
                    >
                      {zh ? pill.labelZh : pill.labelEn}
                    </span>
                  </td>
                  <td className="h-10 truncate px-3 text-ink-2" title={owner}>{owner}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
