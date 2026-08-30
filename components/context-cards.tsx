"use client";

import { useEffect, useId, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * CONTEXT CARDS
 * ───────────────────────────────────────────────────────── */

export default function ContextCards({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("context-cards", propLang);
  const zh = lang === "zh";
  const headingId = useId();

  const chunks = [
    {
      title: zh ? "供应商准入规范" : "Vendor onboarding rule",
      chars: zh ? "290 字符" : "290 characters",
      body: zh
        ? "在将新乳制品供应商纳入自动补货工作流之前，必须首先验证其冷链资质认证与卫生许可。"
        : "Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",
      source: "Dairy Onboarding SOP.pdf",
      badge: "PDF",
      tone: "bg-red",
    },
    {
      title: zh ? "季节性需求走势" : "Seasonal demand row",
      chars: zh ? "1,250 字符" : "1,250 characters",
      body: zh
        ? "第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。"
        : "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
      source: "Sales Velocity Export.csv",
      badge: "CSV",
      tone: "bg-green",
    },
  ];

  const [chipsShown, setChipsShown] = useState(false);

  useEffect(() => {
    const chips = window.setTimeout(() => setChipsShown(true), 700);
    return () => window.clearTimeout(chips);
  }, []);

  return (
    <section
      aria-labelledby={headingId}
      aria-busy={!chipsShown}
      className="flex w-full max-w-95 flex-col gap-2"
    >
      <div
        className="flex flex-wrap items-center gap-2 px-0.5"
        style={{ animation: "fade-in 400ms ease-out both" }}
      >
        <h3 id={headingId} className="text-[13px] font-semibold text-ink">
          {zh ? "高相关检索分块" : "Top retrieved chunks"}
        </h3>
        <span className="inline-flex h-6 items-center rounded-md bg-inset px-2 font-mono text-[11px] font-medium tabular-nums text-ink-2 shadow-hairline">
          2 / 32
        </span>
      </div>

      <div role="list" className="flex flex-col gap-2">
        {chunks.map((chunk, index) => (
          <article
            key={chunk.title}
            role="listitem"
            className="overflow-hidden rounded-card border border-line bg-surface shadow-card"
            style={{
              animation: `fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${index * 100}ms both`,
            }}
          >
            <div className="primitive-card-bar flex items-center gap-2.5 border-b border-line">
              <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-ink">
                <svg
                  aria-hidden="true"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                <span className="truncate">{chunk.title}</span>
              </span>
              <span className="ml-auto shrink-0 font-mono text-[11px] tabular-nums text-ink-3">
                {chunk.chars}
              </span>
            </div>
            <p className="px-3 pb-1 pt-2 text-[12.5px] leading-relaxed text-ink-2">
              {chunk.body}
            </p>
            <div className="px-3 pb-3">
              <span
                aria-hidden={!chipsShown}
                className="inline-flex h-6 max-w-full items-center gap-1.5 rounded-full bg-inset px-2 text-[12px] font-medium text-ink-2 shadow-btn transition-[opacity,transform] duration-300 motion-reduce:transition-none"
                style={{
                  opacity: chipsShown ? 1 : 0,
                  transform: chipsShown ? "scale(1)" : "scale(0.95)",
                  transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-[4px] ${chunk.tone} text-[7px] font-bold text-white`}
                >
                  {chunk.badge}
                </span>
                <span className="min-w-0 truncate">{chunk.source}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
