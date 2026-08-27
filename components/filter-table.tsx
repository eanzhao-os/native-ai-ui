"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * FILTER TABLE
 * Status chips directly filter the task table.
 * ───────────────────────────────────────────────────────── */

type Status = "todo" | "progress" | "done";

const FILTERS: { key: "all" | Status; labelEn: string; labelZh: string; dot?: string; count: number }[] = [
  { key: "all", labelEn: "All", labelZh: "全部", count: 5 },
  { key: "todo", labelEn: "To do", labelZh: "待办", dot: "#f09a2f", count: 2 },
  { key: "progress", labelEn: "In Progress", labelZh: "进行中", dot: "#16a6c7", count: 2 },
  { key: "done", labelEn: "Completed", labelZh: "已完成", dot: "#25a878", count: 1 },
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

  const [filter, setFilter] = useState<"all" | Status>("all");

  return (
    <div className="w-full max-w-105">
      {/* filter chips */}
      <div
        className="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1"
        style={{ scrollbarWidth: "none" }}
      >
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={`flex h-6.5 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px]
                font-medium transition-[background-color,box-shadow,color] duration-200
                ${active ? "bg-surface text-ink shadow-btn" : "text-ink-2 hover:bg-hover"}`}
            >
              {f.dot && <span className="size-1.5 rounded-full" style={{ background: f.dot }} />}
              {zh ? f.labelZh : f.labelEn}
              <span
                className={`rounded-[4px] px-1 text-[10.5px] tabular-nums
                  ${active ? "bg-field text-ink-2" : "text-ink-3"}`}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* table */}
      <div
        aria-label="Scrollable task table"
        className="overflow-x-auto rounded-card bg-surface shadow-card"
        role="region"
        tabIndex={0}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="min-w-[420px]">
          <div className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] border-b border-line px-3 py-2 text-[11.5px] font-medium text-ink-3">
            {HEADERS.map((h) => (
              <span key={h.en}>{zh ? h.zh : h.en}</span>
            ))}
          </div>
          {ROWS.map((row) => {
            const shown = filter === "all" || row.status === filter;
            const pill = PILLS[row.status];
            return (
              <div
                key={row.taskEn}
                className="grid transition-[grid-template-rows,opacity] duration-300"
                style={{
                  gridTemplateRows: shown ? "1fr" : "0fr",
                  opacity: shown ? 1 : 0,
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b
                      border-line px-3 py-2 text-[12px] transition-colors duration-100
                      last:border-0 hover:bg-hover"
                  >
                    <span className="truncate font-medium text-ink">{zh ? row.taskZh : row.taskEn}</span>
                    <span className="text-ink-2 tabular-nums">{zh ? row.dateZh : row.dateEn}</span>
                    <span>
                      <span
                        className="inline-flex h-5 items-center rounded-[5px] px-1.5 text-[11px] font-medium"
                        style={{
                          color: pill.color,
                          background: `color-mix(in srgb, ${pill.color} 13%, transparent)`,
                        }}
                      >
                        {zh ? pill.labelZh : pill.labelEn}
                      </span>
                    </span>
                    <span className="truncate text-ink-2">{zh ? row.ownerZh : row.ownerEn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
