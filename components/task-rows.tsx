"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * TASK ROWS
 * ───────────────────────────────────────────────────────── */

const TICKS = [600, 900, 2400, 1400, 2400, 600];

function useTick(intervals: number[]) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (tick >= intervals.length - 1) return;
    const t = setTimeout(() => setTick((x) => x + 1), intervals[tick]);
    return () => clearTimeout(t);
  }, [tick, intervals]);
  return tick;
}

function SpinnerRing({ active, children }: { active?: boolean; children?: React.ReactNode }) {
  const size = 24, stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size} height={size} className="absolute inset-0"
        style={active ? { animation: "spin 1.1s linear infinite" } : undefined}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        {active && (
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke="var(--ink-3)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${c * 0.28} ${c * 0.72}`}
          />
        )}
      </svg>
      <span className="relative text-[10.5px] font-semibold tabular-nums text-ink">{children}</span>
    </span>
  );
}

function Badge({ tone, children }: { tone: "red" | "green"; children: React.ReactNode }) {
  return (
    <span
      className={`flex size-5.5 shrink-0 items-center justify-center rounded-full text-white
        ${tone === "red" ? "bg-red" : "bg-green"}`}
      style={{ animation: "pop-in 300ms cubic-bezier(0.23,1,0.32,1) both" }}
    >
      {children}
    </span>
  );
}

const XIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);
const RetryIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
);

export default function TaskRows({
  variant = "Capsules",
  lang: propLang,
}: {
  variant?: string;
  lang?: "en" | "zh";
}) {
  const lang = useLang("task-rows", propLang);
  const zh = lang === "zh";

  const tick = useTick(TICKS);
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const row2: "pending" | "failed" | "done" = tick < 3 ? "pending" : tick === 3 ? "failed" : "done";

  const rows = [
    {
      key: "verify",
      badge: <Badge tone="green">{CheckIcon}</Badge>,
      label: zh ? "校验供应商资质档案" : "Verified vendor records",
      amount: zh ? "12 家供应商" : "12 suppliers",
      pill: (
        <span className="inline-flex h-5.5 items-center rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green">
          {zh ? "已完成" : "Completed"}
        </span>
      ),
      details: [
        { label: zh ? "核对税务与联系人 ID" : "Matched tax and contact IDs", meta: "12/12" },
        { label: zh ? "标记过期记录" : "Flagged stale records", meta: "0" },
      ],
    },
    {
      key: "index",
      badge: <SpinnerRing active>2</SpinnerRing>,
      label: zh ? "生成自动补货计划清单" : "Build reorder task list",
      amount: zh ? "7 款 SKU" : "7 SKUs",
      pill: null,
      details: [
        { label: zh ? "读取 POS 导出数据" : "Reading POS export", meta: zh ? "3 个文件" : "3 files" },
        { label: zh ? "评估缺货断货风险" : "Scoring stockout risk", meta: "68%" },
      ],
    },
    {
      key: "draft",
      badge:
        row2 === "pending" ? (
          <SpinnerRing>3</SpinnerRing>
        ) : row2 === "failed" ? (
          <Badge tone="red">{XIcon}</Badge>
        ) : (
          <Badge tone="green">{CheckIcon}</Badge>
        ),
      label: zh ? "起草供应商跟进邮件" : "Draft supplier emails",
      amount: zh ? "2 封草稿" : "2 messages",
      pill:
        row2 === "failed" ? (
          <span className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-red-tint px-2 text-[11.5px] font-medium text-red" style={{ animation: "fade-in 200ms ease-out both" }}>
            {zh ? "失败重试中" : "Failed"} <span style={{ animation: "spin 1.2s linear infinite" }} className="flex">{RetryIcon}</span>
          </span>
        ) : row2 === "done" ? (
          <span className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green" style={{ animation: "fade-in 200ms ease-out both" }}>
            {zh ? "已完成" : "Completed"}
          </span>
        ) : null,
      details: [
        { label: zh ? "脆筒供应商跟进通知" : "Cone supplier follow-up", meta: zh ? "草稿" : "draft" },
        { label: zh ? "开心果原料补货备注" : "Pistachio reorder note", meta: zh ? "草稿" : "draft" },
      ],
    },
  ];

  const list = variant === "List";
  return (
    <div
      className={`flex w-full max-w-110 flex-col ${
        list ? "gap-0 self-start overflow-hidden rounded-card bg-surface shadow-card" : "min-h-[196px] gap-2"
      }`}
    >
      {rows.map((row, i) => {
        const open = manualOpen[row.key] ?? (row.key === "index" && tick === 2);
        return (
          <div
            key={row.key}
            className={`self-stretch overflow-hidden transition-[border-radius] duration-300 ${
              list ? "border-b border-line last:border-0" : "bg-surface shadow-card"
            }`}
            style={{
              borderRadius: list ? 0 : open ? 14 : 22,
              animation: `fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${i * 80}ms both`,
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setManualOpen((current) => ({ ...current, [row.key]: !open }))}
              className="flex h-11 w-full items-center gap-2.5 px-2.5 text-left transition-colors duration-100 hover:bg-hover focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] cursor-pointer"
            >
              {row.badge}
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                {row.label}
              </span>
              <span className="shrink-0 text-[12px] text-ink-3">
                {row.amount}
              </span>
              {row.pill}
            </button>

            {/* details dropdown */}
            {open && (
              <div className="border-t border-line/60 bg-inset/50 px-3 py-2 text-[11.5px] space-y-1">
                {row.details.map((d, di) => (
                  <div key={di} className="flex items-center justify-between text-ink-2">
                    <span>{d.label}</span>
                    <span className="font-mono text-[10.5px] text-ink-3">{d.meta}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
