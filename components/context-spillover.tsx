"use client";

import { useId, useState } from "react";
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
  const instanceId = useId();

  const [hydratedId, setHydratedId] = useState<string | null>(null);

  const totalOriginal = SPILL_RECORDS.reduce(
    (sum, record) => sum + record.originalTokens,
    0,
  );
  const totalCompacted = SPILL_RECORDS.reduce(
    (sum, record) => sum + record.compactedTokens,
    0,
  );
  const totalSaved = totalOriginal - totalCompacted;
  const compressionPercent = Number(
    ((totalSaved / totalOriginal) * 100).toFixed(1),
  );
  const activePercent = Number(
    ((totalCompacted / totalOriginal) * 100).toFixed(1),
  );

  const handleHydrate = (id: string) => {
    setHydratedId((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "上下文压缩与磁盘溢出" : "Context Compaction & Spill"}
            </h3>
            <p className="text-[11px] leading-snug text-ink-3">
              {zh
                ? "Harness.Spill 超限数据磁盘分流存储"
                : "Harness.Spill disk-offloaded oversized tools"}
            </p>
          </div>
        </div>

        <span className="ml-auto font-mono text-[11px] font-medium tabular-nums text-green">
          ↓ {totalSaved.toLocaleString()} {zh ? "tokens 已节省" : "tok saved"}
        </span>
      </div>

      <div className="mt-3.5 rounded-control border border-line bg-inset/60 p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11.5px]">
          <span className="text-ink-2">{zh ? "压缩比率" : "Compaction ratio"}</span>
          <span className="font-mono font-semibold tabular-nums text-accent">
            {compressionPercent.toFixed(1)}% {zh ? "Token 压缩率" : "token compression"}
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={zh ? "压缩效率" : "Compaction efficiency"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={compressionPercent}
          aria-valuetext={
            zh
              ? `${compressionPercent.toFixed(1)}% 已溢出至磁盘，${activePercent.toFixed(1)}% 保留在内存`
              : `${compressionPercent.toFixed(1)}% spilled to disk, ${activePercent.toFixed(1)}% retained in memory`
          }
          className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-field"
        >
          <span
            aria-hidden="true"
            className="h-full bg-accent"
            style={{ width: `${activePercent}%` }}
          />
          <span aria-hidden="true" className="h-full flex-1 bg-green/70" />
        </div>

        <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10px] text-ink-3">
          <span>
            {zh
              ? `内存活跃上下文 (${activePercent.toFixed(1)}%)`
              : `In-memory active (${activePercent.toFixed(1)}%)`}
          </span>
          <span>
            {zh
              ? `溢出至磁盘存储 (${compressionPercent.toFixed(1)}%)`
              : `Spilled to disk (${compressionPercent.toFixed(1)}%)`}
          </span>
        </div>
      </div>

      <div className="mt-3.5 flex flex-col gap-2">
        {SPILL_RECORDS.map((record) => {
          const isHydrated = hydratedId === record.id;
          const panelId = `${instanceId}-${record.id}-preview`;
          const actionLabel = isHydrated
            ? zh
              ? "收起原文"
              : "Hide raw"
            : zh
              ? "按需水合"
              : "Hydrate";

          return (
            <article
              key={record.id}
              className={`rounded-control border bg-surface p-3 transition-[background-color,border-color] focus-within:border-accent motion-reduce:transition-none ${
                isHydrated ? "border-accent bg-accent-tint/30" : "border-line hover:border-line-strong"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-field text-ink-3">
                    <svg
                      aria-hidden="true"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="break-all font-mono text-[11.5px] font-medium text-ink">
                        {record.diskPath}
                      </span>
                      <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[9px] text-ink-3">
                        {record.sizeBytes}
                      </span>
                    </div>
                    <span className="mt-0.5 block break-words text-[10.5px] leading-snug text-ink-3">
                      {zh ? "源自" : "From"} {record.sourceTool} · {zh ? record.spilledAtZh : record.spilledAtEn}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`${actionLabel} ${record.diskPath}`}
                  aria-expanded={isHydrated}
                  aria-controls={panelId}
                  onClick={() => handleHydrate(record.id)}
                  className="flex min-h-11 shrink-0 items-center rounded-control border border-line bg-field px-3 text-[11px] font-medium text-ink-2 transition-colors hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none cursor-pointer"
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

              <div
                id={panelId}
                role="region"
                aria-label={
                  zh
                    ? `${record.diskPath} 水合预览`
                    : `${record.diskPath} hydrated preview`
                }
                hidden={!isHydrated}
                className="mt-2.5 border-t border-line/60 pt-2 font-mono text-[10.5px] text-ink-2"
              >
                <div className="rounded-control bg-page p-2 leading-relaxed text-ink-3">
                  {zh
                    ? `[水合片段预览: ${record.originalTokens.toLocaleString()} token 原始输出已从 Harness.Spill.Local 磁盘缓存加载。原始 SHA256: 4d89a0b12...]`
                    : `[Hydrated snippet: ${record.originalTokens.toLocaleString()} tokens offloaded to Harness.Spill.Local storage. Original hash: sha256:4d89a0b12...]`}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
