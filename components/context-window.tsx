"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * CONTEXT WINDOW & TOKENOMICS GAUGE
 * ───────────────────────────────────────────────────────── */

type ContextSegment = {
  id: string;
  labelEn: string;
  labelZh: string;
  tokens: number;
  color: string;
  badgeColor: string;
  descEn: string;
  descZh: string;
};

const MAX_TOKENS = 128000;

const INITIAL_SEGMENTS: ContextSegment[] = [
  {
    id: "system",
    labelEn: "System & Directives",
    labelZh: "系统指令与安全约束",
    tokens: 4200,
    color: "var(--accent)",
    badgeColor: "bg-accent-tint text-accent-ink",
    descEn: "Base system instructions, developer constraints, and safety guidelines.",
    descZh: "基础系统提示词、开发者约束与安全合规守则。",
  },
  {
    id: "rag",
    labelEn: "RAG & Retrieved Docs",
    labelZh: "RAG 检索增强知识",
    tokens: 28400,
    color: "var(--green)",
    badgeColor: "bg-green-tint text-green",
    descEn: "12 code chunks and 3 architectural design docs injected via semantic search.",
    descZh: "语义搜索注入的 12 个代码切片与 3 份架构设计文档。",
  },
  {
    id: "history",
    labelEn: "Conversation History",
    labelZh: "会话上下文历史",
    tokens: 16850,
    color: "var(--orange)",
    badgeColor: "bg-orange-tint text-orange",
    descEn: "14 previous conversation turns including user prompts and code diffs.",
    descZh: "前 14 轮对话交互，包含用户指令与代码差异记录。",
  },
  {
    id: "tools",
    labelEn: "Tool Outputs & Traces",
    labelZh: "工具调用输出与追踪",
    tokens: 9350,
    color: "var(--ink-2)",
    badgeColor: "bg-hover-2 text-ink-2",
    descEn: "Terminal stdout, ripgrep search results, and linter diagnostics.",
    descZh: "终端标准输出、ripgrep 搜索结果与 linter 诊断信息。",
  },
];

export default function ContextWindow({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("context-window", propLang);
  const zh = lang === "zh";

  const [segments, setSegments] = useState<ContextSegment[]>(INITIAL_SEGMENTS);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [previewSegmentId, setPreviewSegmentId] = useState<string | null>(null);
  const [isPruned, setIsPruned] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const totalUsed = segments.reduce((sum, segment) => sum + segment.tokens, 0);
  const percentUsed = Number(((totalUsed / MAX_TOKENS) * 100).toFixed(1));
  const estimatedCost = ((totalUsed / 1000000) * 3.0).toFixed(4); // $3 / MTok
  const activeSegmentId = previewSegmentId ?? selectedSegmentId;

  const handlePruneHistory = () => {
    if (isPruned) {
      const restoredTotal = INITIAL_SEGMENTS.reduce(
        (sum, segment) => sum + segment.tokens,
        0,
      );
      setSegments(INITIAL_SEGMENTS);
      setIsPruned(false);
      setAnnouncement(
        zh
          ? `上下文已恢复至 ${restoredTotal.toLocaleString()} tokens`
          : `Context restored to ${restoredTotal.toLocaleString()} tokens`,
      );
      return;
    }

    const prunedSegments = segments.map((segment) =>
      segment.id === "history"
        ? { ...segment, tokens: Math.round(segment.tokens * 0.45) }
        : segment.id === "tools"
          ? { ...segment, tokens: Math.round(segment.tokens * 0.3) }
          : segment,
    );
    const prunedTotal = prunedSegments.reduce(
      (sum, segment) => sum + segment.tokens,
      0,
    );
    setSegments(prunedSegments);
    setIsPruned(true);
    setAnnouncement(
      zh
        ? `上下文已精简至 ${prunedTotal.toLocaleString()} tokens`
        : `Context pruned to ${prunedTotal.toLocaleString()} tokens`,
    );
  };

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="flex size-2 shrink-0 rounded-full bg-green" />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "上下文窗口计量" : "Context Window"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2">
            {zh ? "128k 容量" : "128k context"}
          </span>
        </div>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <span className="font-mono text-[11px] tabular-nums text-ink-2">
            ${estimatedCost} {zh ? "预估成本" : "est."}
          </span>
          <button
            type="button"
            aria-label={zh ? "历史精简" : "History pruning"}
            aria-pressed={isPruned}
            onClick={handlePruneHistory}
            className="flex min-h-11 items-center gap-1.5 rounded-control border border-line bg-field px-3 text-[11.5px] font-medium text-ink-2 transition-colors hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none cursor-pointer"
          >
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            {isPruned
              ? zh
                ? "恢复完整上下文"
                : "Restore Context"
              : zh
                ? "精简历史"
                : "Prune History"}
          </button>
        </div>
      </div>

      <div className="mt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2 text-[11.5px]">
          <span className="font-mono tabular-nums text-ink">
            {totalUsed.toLocaleString()} {" "}
            <span className="text-ink-3">
              / {MAX_TOKENS.toLocaleString()} tokens
            </span>
          </span>
          <span className="font-mono font-medium tabular-nums text-ink-2">
            {percentUsed.toFixed(1)}% {zh ? "已占用" : "capacity"}
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={zh ? "上下文占用率" : "Context usage"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentUsed}
          aria-valuetext={
            zh
              ? `${totalUsed.toLocaleString()} / ${MAX_TOKENS.toLocaleString()} tokens，已占用 ${percentUsed.toFixed(1)}%`
              : `${totalUsed.toLocaleString()} of ${MAX_TOKENS.toLocaleString()} tokens, ${percentUsed.toFixed(1)}% used`
          }
          className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-field p-0.5"
        >
          {segments.map((segment) => {
            const widthPercent = (segment.tokens / MAX_TOKENS) * 100;
            const isActive = activeSegmentId === segment.id;
            return (
              <span
                key={segment.id}
                aria-hidden="true"
                className="h-full first:rounded-l-full last:rounded-r-full transition-[opacity,transform] duration-300 motion-reduce:transition-none"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: segment.color,
                  opacity: activeSegmentId && !isActive ? 0.45 : 1,
                  transform: isActive ? "scaleY(1.2)" : "scaleY(1)",
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col divide-y divide-line/60">
        {segments.map((segment) => {
          const isActive = activeSegmentId === segment.id;
          const isSelected = selectedSegmentId === segment.id;
          const segmentPercent = ((segment.tokens / totalUsed) * 100).toFixed(0);
          return (
            <button
              key={segment.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                setSelectedSegmentId((current) =>
                  current === segment.id ? null : segment.id,
                )
              }
              onMouseEnter={() => setPreviewSegmentId(segment.id)}
              onMouseLeave={() => setPreviewSegmentId(null)}
              onFocus={() => setPreviewSegmentId(segment.id)}
              onBlur={() => setPreviewSegmentId(null)}
              className={`-mx-2 grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-control px-2 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] motion-reduce:transition-none cursor-pointer ${
                isActive ? "bg-hover" : "hover:bg-hover/60"
              }`}
            >
              <span className="flex min-w-0 items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="flex min-w-0 flex-col">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[12px] font-medium text-ink">
                      {zh ? segment.labelZh : segment.labelEn}
                    </span>
                    <span
                      className={`rounded-chip px-1.5 py-0.5 font-mono text-[10px] ${segment.badgeColor}`}
                    >
                      {segmentPercent}%
                    </span>
                  </span>
                  <span className="text-[11px] leading-snug text-ink-3">
                    {zh ? segment.descZh : segment.descEn}
                  </span>
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end pl-2">
                <span className="font-mono text-[11.5px] font-medium tabular-nums text-ink">
                  {segment.tokens.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-ink-3">tokens</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "自动压缩阈值: 85%" : "Auto-compaction threshold: 85%"}</span>
        <span className="font-mono">Claude 3.7 Sonnet</span>
      </div>
      <p role="status" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
