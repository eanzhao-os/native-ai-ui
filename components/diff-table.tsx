"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * DIFF TABLE
 * The proposed edit plays once and rests on the completed diff.
 * ───────────────────────────────────────────────────────── */

function useStage(steps: number[]) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (stage >= steps.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage, steps]);
  return stage;
}

const HEADERS = [
  { en: "Flavor", zh: "风味" },
  { en: "Category", zh: "分类" },
  { en: "Supplier", zh: "供应商" },
];

const ROWS = [
  { nameEn: "Rocky Road", nameZh: "石板街", dept: "Classic", deptEn: "Classic", deptZh: "经典", email: "aurora-scoops", removed: true },
  { nameEn: "Bubblegum", nameZh: "泡泡糖", dept: "Retro", deptEn: "Retro", deptZh: "复古", email: "kumo-creamery", removed: true },
  { nameEn: "Mint Chip", nameZh: "薄荷巧克力", dept: "Classic", deptEn: "Classic", deptZh: "经典", email: "maple-orbit", removed: false },
];

const DOT: Record<string, string> = {
  Classic: "bg-accent",
  Retro: "bg-ink-3",
  Seasonal: "bg-orange",
};

export default function DiffTable({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("diff-table", propLang);
  const zh = lang === "zh";

  const stage = useStage([800, 1000, 1000]);
  // 0 plain · 1 red tint · 2 completed diff
  const tinted = stage >= 2;
  const added = stage >= 3;

  return (
    <div className="w-full max-w-95">
      <div className="relative overflow-hidden rounded-card bg-surface shadow-card">
        <div className="primitive-card-bar flex items-center justify-between border-b border-line">
          <span className="text-[12.5px] font-medium text-ink">{zh ? "菜单清理建议" : "Proposed menu cleanup"}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[30%]" />
            <col className="w-[36%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-line">
              {HEADERS.map((h) => (
                <th key={h.en} className="primitive-table-cell text-[12px] font-medium text-ink-3">
                  {zh ? h.zh : h.en}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => {
              const out = row.removed && tinted;
              return (
                <tr
                  key={row.nameEn}
                  className="border-b border-line transition-colors duration-400 last:border-0 hover:bg-hover"
                  style={{ background: out ? "var(--red-tint)" : undefined }}
                >
                  <td
                    className="primitive-table-cell text-[13px] font-medium tabular-nums transition-colors duration-400"
                    style={{ color: out ? "var(--red)" : "var(--ink)" }}
                  >
                    {zh ? row.nameZh : row.nameEn}
                  </td>
                  <td className="primitive-table-cell">
                    <span
                      className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-inset px-2 text-[11.5px] font-medium shadow-hairline transition-opacity duration-400"
                      style={{ opacity: out ? 0.55 : 1 }}
                    >
                      <span className={`size-1.5 rounded-full ${DOT[row.dept]}`} />
                      <span className="text-ink-2">{zh ? row.deptZh : row.deptEn}</span>
                    </span>
                  </td>
                  <td
                    className="primitive-table-cell text-[12.5px] whitespace-nowrap transition-colors duration-400"
                    style={{
                      color: out ? "var(--red)" : "var(--ink-2)",
                      textDecorationLine: out ? "line-through" : "none",
                      textDecorationColor: "color-mix(in srgb, var(--red) 50%, transparent)",
                    }}
                  >
                    {row.email}
                  </td>
                </tr>
              );
            })}
            {/* added row */}
            <tr>
              <td colSpan={3} className="p-0">
                <div
                  className="grid transition-[grid-template-rows,opacity] duration-400"
                  style={{
                    gridTemplateRows: added ? "1fr" : "0fr",
                    opacity: added ? 1 : 0,
                    transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <div className="overflow-hidden" style={{ background: "var(--green-tint)" }}>
                    <div className="grid grid-cols-[34%_30%_36%] items-center border-t border-line">
                      <span className="primitive-table-cell text-[13px] font-medium text-green tabular-nums">
                        {zh ? "开心果" : "Pistachio"}
                      </span>
                      <span className="primitive-table-cell">
                        <span className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-surface px-2 text-[11.5px] font-medium shadow-hairline">
                          <span className="size-1.5 rounded-full bg-green" />
                          <span className="text-ink-2">{zh ? "季节限定" : "Seasonal"}</span>
                        </span>
                      </span>
                      <span className="primitive-table-cell text-[13px] text-green">
                        maple-orbit
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
