"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * RECOMMENDATION CARD
 * ───────────────────────────────────────────────────────── */

type OptionKey = "high" | "review" | "none";
type Outcome = "accepted" | "configured" | "dismissed" | null;

type RecommendationOption = {
  body: React.ReactNode;
  completed: string;
  key: OptionKey;
  label: string;
  outcome: Exclude<Outcome, null>;
  short: string;
  signal: number;
  status: string;
  tone: string;
  cta: string;
};

export default function RecommendationCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("recommendation-card", propLang);
  const zh = lang === "zh";

  const options: RecommendationOption[] = [
    {
      key: "high",
      body: zh ? (
        <>
          建议从供应商{" "}
          <code className="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code>{" "}
          追加补货华夫脆筒，预计交付周期为{" "}
          <code className="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>。
        </>
      ) : (
        <>
          Reorder waffle cones from{" "}
          <code className="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code>{" "}
          with lead time{" "}
          <code className="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>.
        </>
      ),
      short: zh ? "从 cone_king 补货 · 7天到货" : "Reorder from cone_king · 7-day lead",
      signal: 3,
      tone: "var(--green)",
      label: zh ? "高置信度推荐" : "High confidence",
      cta: zh ? "采纳建议" : "Accept",
      completed: zh ? "已采纳" : "Accepted",
      outcome: "accepted",
      status: zh ? "建议已采纳，将进入补货计划。" : "Recommendation accepted and added to the restock plan.",
    },
    {
      key: "review",
      body: zh ? (
        <>
          为迎接旺季需求，建议将香草原料配方切换为{" "}
          <code className="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code>。
        </>
      ) : (
        <>
          Switch vanilla to{" "}
          <code className="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code>{" "}
          for peak season.
        </>
      ),
      short: zh ? "切换为马达加斯加香草配方" : "Switch to vanilla_madagascar",
      signal: 2,
      tone: "var(--orange)",
      label: zh ? "需要人工复核" : "Needs review",
      cta: zh ? "配置参数" : "Configure",
      completed: zh ? "已配置" : "Configured",
      outcome: "configured",
      status: zh ? "配置草案已准备，可进入人工复核。" : "Configuration ready for review.",
    },
    {
      key: "none",
      body: zh ? (
        <>对所有库存 SKU 发起全量紧急补货流程。</>
      ) : (
        <>Trigger a full restock cycle across every catalog SKU.</>
      ),
      short: zh ? "全品类 SKU 紧急补货" : "Full restock across every SKU",
      signal: 0,
      tone: "var(--line-strong)",
      label: zh ? "无足够置信信号" : "No signal",
      cta: zh ? "忽略" : "Dismiss",
      completed: zh ? "已忽略" : "Dismissed",
      outcome: "dismissed",
      status: zh ? "建议已忽略，不会执行补货操作。" : "Recommendation dismissed; no restock action will run.",
    },
  ];

  const [activeKey, setActiveKey] = useState<OptionKey>("high");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const current = options.find((option) => option.key === activeKey) ?? options[0];
  const terminal = outcome !== null;
  const completed = outcome === current.outcome;
  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  const selectOption = (key: OptionKey) => {
    if (terminal) return;
    setActiveKey(key);
    setOpenDrawer(false);
  };

  const toggleDrawer = () => {
    if (terminal) return;
    setOpenDrawer((open) => !open);
  };

  const completeCurrent = () => {
    if (terminal) return;
    setOpenDrawer(false);
    setOutcome(current.outcome);
  };

  return (
    <div className="w-full max-w-95 overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div className="p-4">
        <p className="text-[13px] leading-relaxed text-ink">{current.body}</p>

        {outcome && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-3 flex min-h-11 items-center gap-2 rounded-control border px-3 py-2 text-[11.5px] font-medium leading-relaxed ${
              outcome === "accepted"
                ? "border-green/25 bg-green-tint text-green"
                : outcome === "configured"
                  ? "border-orange/25 bg-orange-tint text-orange"
                  : "border-line-strong bg-field text-ink-2"
            }`}
          >
            <span aria-hidden="true" className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface/70 text-[11px] shadow-hairline">
              {outcome === "accepted" ? "✓" : outcome === "configured" ? "↗" : "×"}
            </span>
            {current.status}
          </div>
        )}

        {openDrawer && !terminal && (
          <div className="mt-3.5 space-y-1 border-t border-line/70 pt-3">
            <span className="mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">
              {zh ? "备选方案" : "Alternative Actions"}
            </span>
            {options.map((option) => (
              <button
                key={option.key}
                type="button"
                aria-pressed={option.key === activeKey}
                onClick={() => selectOption(option.key)}
                className={`grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-control px-2.5 py-2 text-left transition-[background-color,color,transform] active:scale-[0.99] ${focusClasses} ${
                  option.key === activeKey
                    ? "bg-accent-tint font-medium text-accent-ink"
                    : "text-ink-2 hover:bg-hover hover:text-ink"
                }`}
              >
                <span className="min-w-0 text-[12px] leading-snug">{option.short}</span>
                <span className="max-w-24 text-right font-mono text-[9.5px] leading-snug text-ink-3">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-inset px-4 py-2.5">
        <div className="flex min-h-8 min-w-0 items-center gap-2">
          <span aria-hidden="true" className="flex h-4 shrink-0 items-end gap-0.5">
            {[6, 10, 14].map((height, index) => (
              <span
                key={height}
                className="w-1 rounded-full"
                style={{
                  height,
                  background:
                    current.signal >= index + 1
                      ? current.tone
                      : "var(--line-strong)",
                }}
              />
            ))}
          </span>
          <span className="truncate text-[12px] font-medium text-ink-2">{current.label}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            aria-expanded={openDrawer && !terminal}
            disabled={terminal}
            onClick={toggleDrawer}
            className={`min-h-11 rounded-control border border-line bg-surface px-3 text-[11.5px] font-semibold text-ink-2 transition-[background-color,border-color,color,transform] hover:border-line-strong hover:bg-hover hover:text-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55 ${focusClasses}`}
          >
            {zh ? "备选方案" : "Alternatives"}
          </button>
          <button
            type="button"
            aria-pressed={completed}
            disabled={terminal}
            onClick={completeCurrent}
            className={`min-h-11 rounded-control px-3.5 text-[11.5px] font-semibold transition-[background-color,color,opacity,transform] active:scale-[0.98] ${focusClasses} ${
              completed
                ? "cursor-not-allowed bg-green-tint text-green shadow-hairline"
                : current.key === "high"
                  ? "bg-accent text-white shadow-sm hover:opacity-90"
                  : current.key === "review"
                    ? "bg-ink text-canvas shadow-sm hover:opacity-90"
                    : "bg-field text-ink-2 shadow-hairline hover:bg-hover hover:text-ink"
            }`}
          >
            {completed ? current.completed : current.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
