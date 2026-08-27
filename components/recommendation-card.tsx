"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * RECOMMENDATION CARD
 * ───────────────────────────────────────────────────────── */

export default function RecommendationCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("recommendation-card", propLang);
  const zh = lang === "zh";

  const OPTIONS = [
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
      ctaStyle: "bg-accent text-white",
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
      ctaStyle: "bg-ink text-canvas",
    },
    {
      key: "none",
      body: zh ? (
        <>
          对所有库存 SKU 发起全量紧急补货流程。
        </>
      ) : (
        <>
          Trigger a full restock cycle across every catalog SKU.
        </>
      ),
      short: zh ? "全品类 SKU 紧急补货" : "Full restock across every SKU",
      signal: 0,
      tone: "var(--line-strong)",
      label: zh ? "无足够置信信号" : "No signal",
      cta: zh ? "忽略" : "Dismiss",
      ctaStyle: "bg-field text-ink-3",
    },
  ];

  const [activeKey, setActiveKey] = useState<string>("high");
  const [openDrawer, setOpenDrawer] = useState(false);
  const current = OPTIONS.find((o) => o.key === activeKey) ?? OPTIONS[0];

  return (
    <div className="w-full max-w-95 overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[13px] leading-relaxed text-ink">{current.body}</p>
        </div>

        {/* Drawer for alternatives */}
        {openDrawer && (
          <div className="mt-3.5 border-t border-line/60 pt-3 space-y-1">
            <span className="text-[11px] font-semibold text-ink-3 uppercase tracking-wider block mb-2">
              {zh ? "备选方案" : "Alternative Actions"}
            </span>
            {OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  setActiveKey(opt.key);
                  setOpenDrawer(false);
                }}
                className={`flex w-full items-center justify-between rounded-control p-2 text-left text-[12px] transition-colors cursor-pointer ${
                  opt.key === activeKey ? "bg-accent-tint text-accent-ink font-medium" : "hover:bg-hover text-ink-2"
                }`}
              >
                <span>{opt.short}</span>
                <span className="font-mono text-[10px] text-ink-3">{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-line bg-inset px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-end gap-0.5">
            <span className="w-1 rounded-full" style={{ height: 10, background: current.signal >= 1 ? current.tone : "var(--line-strong)" }} />
            <span className="w-1 rounded-full" style={{ height: 10, background: current.signal >= 2 ? current.tone : "var(--line-strong)" }} />
            <span className="w-1 rounded-full" style={{ height: 10, background: current.signal >= 3 ? current.tone : "var(--line-strong)" }} />
          </span>
          <span className="text-[12px] font-medium text-ink-2">{current.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpenDrawer(!openDrawer)}
            className="rounded-control border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
          >
            {zh ? "备选方案" : "Alternatives"}
          </button>
          <button
            type="button"
            className={`rounded-control px-3 py-1 text-[11.5px] font-medium transition-transform active:scale-95 cursor-pointer ${current.ctaStyle}`}
          >
            {current.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
