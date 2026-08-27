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
  const [activeSegmentId, setActiveSegmentId] = useState<string | null>(null);
  const [isPruned, setIsPruned] = useState(false);

  const totalUsed = segments.reduce((sum, s) => sum + s.tokens, 0);
  const percentUsed = ((totalUsed / MAX_TOKENS) * 100).toFixed(1);
  const estimatedCost = ((totalUsed / 1000000) * 3.0).toFixed(4); // $3 / MTok

  const handlePruneHistory = () => {
    if (isPruned) {
      setSegments(INITIAL_SEGMENTS);
      setIsPruned(false);
    } else {
      setSegments((prev) =>
        prev.map((s) =>
          s.id === "history"
            ? { ...s, tokens: Math.round(s.tokens * 0.45) }
            : s.id === "tools"
            ? { ...s, tokens: Math.round(s.tokens * 0.3) }
            : s
        )
      );
      setIsPruned(true);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-green" />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "上下文窗口计量" : "Context Window"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2">
            {zh ? "128k 容量" : "128k context"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] tabular-nums text-ink-2">
            ${estimatedCost} {zh ? "预估成本" : "est."}
          </span>
          <button
            type="button"
            onClick={handlePruneHistory}
            className="flex items-center gap-1 rounded-control border border-line bg-field px-2 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

      {/* Progress Metric Bar */}
      <div className="mt-1">
        <div className="flex items-baseline justify-between text-[11.5px]">
          <span className="font-mono tabular-nums text-ink">
            {totalUsed.toLocaleString()}{" "}
            <span className="text-ink-3">/ {MAX_TOKENS.toLocaleString()} tokens</span>
          </span>
          <span className="font-mono font-medium tabular-nums text-ink-2">
            {percentUsed}% {zh ? "已占用" : "capacity"}
          </span>
        </div>

        {/* Segmented Bar */}
        <div className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-field p-0.5">
          {segments.map((seg) => {
            const widthPct = (seg.tokens / MAX_TOKENS) * 100;
            const isHovered = activeSegmentId === seg.id;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setActiveSegmentId(seg.id)}
                onMouseLeave={() => setActiveSegmentId(null)}
                className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 cursor-pointer"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: seg.color,
                  opacity: activeSegmentId && !isHovered ? 0.45 : 1,
                  transform: isHovered ? "scaleY(1.2)" : "scaleY(1)",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Segment Breakdown Rows */}
      <div className="mt-4 flex flex-col divide-y divide-line/60">
        {segments.map((seg) => {
          const isSelected = activeSegmentId === seg.id;
          const segPercent = ((seg.tokens / totalUsed) * 100).toFixed(0);
          return (
            <div
              key={seg.id}
              onMouseEnter={() => setActiveSegmentId(seg.id)}
              onMouseLeave={() => setActiveSegmentId(null)}
              className={`flex items-center justify-between py-2.5 px-2 -mx-2 rounded-control transition-colors cursor-pointer ${
                isSelected ? "bg-hover" : "hover:bg-hover/60"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="size-2 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium text-ink truncate">
                      {zh ? seg.labelZh : seg.labelEn}
                    </span>
                    <span className={`rounded-chip px-1.5 py-0.2 font-mono text-[10px] ${seg.badgeColor}`}>
                      {segPercent}%
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-3 truncate max-w-[260px]">
                    {zh ? seg.descZh : seg.descEn}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="font-mono text-[11.5px] tabular-nums font-medium text-ink">
                  {seg.tokens.toLocaleString()}
                </span>
                <span className="font-mono text-[10px] text-ink-3">tokens</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "自动压缩阈值: 85%" : "Auto-compaction threshold: 85%"}</span>
        <span className="font-mono">Claude 3.7 Sonnet</span>
      </div>
    </div>
  );
}
