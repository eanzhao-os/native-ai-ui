"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * CONTEXT COMPACTION & DISK SPILLOVER
 * ───────────────────────────────────────────────────────── */

type SpillFile = {
  id: string;
  sourceTool: string;
  originalTokens: number;
  compactedTokens: number;
  diskPath: string;
  sizeBytes: string;
  spilledAtEn: string;
  spilledAtZh: string;
};

const SPILL_RECORDS: SpillFile[] = [
  {
    id: "spill-1",
    sourceTool: "fs.search_ripgrep",
    originalTokens: 48500,
    compactedTokens: 820,
    diskPath: "spill/ripgrep_ast_results.json",
    sizeBytes: "1.4 MB",
    spilledAtEn: "4m ago",
    spilledAtZh: "4分钟前",
  },
  {
    id: "spill-2",
    sourceTool: "shell.git_diff_full",
    originalTokens: 86200,
    compactedTokens: 1450,
    diskPath: "spill/git_diff_refactor_v2.patch",
    sizeBytes: "2.8 MB",
    spilledAtEn: "12m ago",
    spilledAtZh: "12分钟前",
  },
];

export default function ContextSpillover({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("context-spillover", propLang);
  const zh = lang === "zh";

  const [hydratedId, setHydratedId] = useState<string | null>(null);

  const totalSaved = SPILL_RECORDS.reduce(
    (acc, r) => acc + (r.originalTokens - r.compactedTokens),
    0
  );

  const handleHydrate = (id: string) => {
    setHydratedId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>
          <div>
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "上下文压缩与磁盘溢出" : "Context Compaction & Spill"}
            </h3>
            <p className="text-[11px] text-ink-3">
              {zh ? "Tether.Spill 超限数据磁盘分流存储" : "Tether.Spill disk-offloaded oversized tools"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 font-mono text-[11px] text-green font-medium">
          <span>↓ {totalSaved.toLocaleString()} {zh ? "token 已节省" : "tok saved"}</span>
        </div>
      </div>

      {/* Compaction Efficiency Gauge */}
      <div className="mt-3.5 rounded-control border border-line bg-inset/50 p-3">
        <div className="flex items-baseline justify-between text-[11.5px]">
          <span className="text-ink-2">{zh ? "压缩比率" : "Compaction Ratio"}</span>
          <span className="font-mono font-semibold text-accent">
            {zh ? "96.8% Token 压缩率" : "96.8% token compression"}
          </span>
        </div>

        <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-line">
          <div className="h-full bg-accent rounded-full" style={{ width: "3.2%" }} />
          <div className="h-full bg-green/60" style={{ width: "96.8%" }} />
        </div>

        <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
          <span>{zh ? "内存活跃上下文 (3.2%)" : "In-Memory Active (3.2%)"}</span>
          <span>{zh ? "溢出至磁盘存储 (96.8%)" : "Spilled to Disk (96.8%)"}</span>
        </div>
      </div>

      {/* Spilled Files List */}
      <div className="mt-3.5 flex flex-col gap-2">
        {SPILL_RECORDS.map((rec) => {
          const isHydrated = hydratedId === rec.id;
          return (
            <div
              key={rec.id}
              className="rounded-control border border-line bg-surface p-3 hover:border-line-strong transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex size-4.5 items-center justify-center rounded-full bg-field text-ink-3 shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11.5px] font-medium text-ink truncate">
                        {rec.diskPath}
                      </span>
                      <span className="rounded-chip border border-line bg-inset px-1 font-mono text-[9px] text-ink-3">
                        {rec.sizeBytes}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-ink-3">
                      {zh ? "源自" : "From"} {rec.sourceTool} • {zh ? rec.spilledAtZh : rec.spilledAtEn}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleHydrate(rec.id)}
                  className="rounded-control border border-line bg-field px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer shrink-0"
                >
                  {isHydrated
                    ? zh
                      ? "收起原文"
                      : "Hide Raw"
                    : zh
                    ? "按需水合"
                    : "Hydrate"}
                </button>
              </div>

              {isHydrated && (
                <div className="mt-2.5 border-t border-line/60 pt-2 font-mono text-[10.5px] text-ink-2">
                  <div className="rounded bg-page p-2 leading-relaxed text-ink-3">
                    {zh
                      ? "[水合片段预览: 48,500 token 原始输出已从 Tether.Spill.Local 磁盘缓存加载。原始 SHA256: 4d89a0b12...]"
                      : "[Hydrated snippet: 48,500 tokens offloaded to Tether.Spill.Local storage. Original hash: sha256:4d89a0b12...]"}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
