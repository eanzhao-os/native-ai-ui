"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * TURN LIFECYCLE — turn/step bracket event timeline
 *
 * Mirrors Harness's agent loop structure:
 *   turn/start → request/header
 *     → (step/start → assistant/message → tool/call → tool/result → step/end)*
 *   → turn/end
 * Events stream in one by one; the nested brackets on the
 * left grow with them, then the loop replays.
 * ───────────────────────────────────────────────────────── */

type BracketEvent = {
  type: string;
  depth: number; // 0 = turn, 1 = step, 2 = leaf
  tone: "accent" | "green" | "orange" | "muted" | "dim";
  summaryEn: string;
  summaryZh: string;
  meta?: string;
  // which bracket levels this event opens / closes
  opens?: "turn" | "step";
  closes?: "turn" | "step";
};

const EVENTS: BracketEvent[] = [
  { type: "turn/start", depth: 0, tone: "accent", opens: "turn", summaryEn: "Turn 3 begins", summaryZh: "第 3 轮开始", meta: "user prompt" },
  { type: "request/header", depth: 1, tone: "dim", summaryEn: "deepseek-reasoner · 128k", summaryZh: "deepseek-reasoner · 128k", meta: "41,208 tok" },
  { type: "step/start", depth: 1, tone: "muted", opens: "step", summaryEn: "Step 1", summaryZh: "步骤 1" },
  { type: "assistant/message", depth: 2, tone: "green", summaryEn: "Let me check the job registry…", summaryZh: "先检查作业注册表…", meta: "stream" },
  { type: "tool/call", depth: 2, tone: "orange", summaryEn: "job.list", summaryZh: "job.list", meta: "call_9f2a" },
  { type: "tool/result", depth: 2, tone: "orange", summaryEn: "3 running · 1 killed", summaryZh: "3 个运行中 · 1 个已终止", meta: "82ms" },
  { type: "step/end", depth: 1, tone: "muted", closes: "step", summaryEn: "Step 1 closed", summaryZh: "步骤 1 闭合", meta: "1.2s" },
  { type: "step/start", depth: 1, tone: "muted", opens: "step", summaryEn: "Step 2", summaryZh: "步骤 2" },
  { type: "assistant/message", depth: 2, tone: "green", summaryEn: "Restarting the telemetry export…", summaryZh: "正在重启遥测导出任务…", meta: "stream" },
  { type: "tool/call", depth: 2, tone: "orange", summaryEn: "job.start", summaryZh: "job.start", meta: "call_b771" },
  { type: "tool/result", depth: 2, tone: "orange", summaryEn: "job-4f8c · Running", summaryZh: "job-4f8c · 运行中", meta: "134ms" },
  { type: "step/end", depth: 1, tone: "muted", closes: "step", summaryEn: "Step 2 closed", summaryZh: "步骤 2 闭合", meta: "0.9s" },
  { type: "assistant/message", depth: 1, tone: "green", summaryEn: "Done — the export job is back up.", summaryZh: "完成 — 导出任务已恢复。" },
  { type: "turn/end", depth: 0, tone: "accent", closes: "turn", summaryEn: "Turn 3 · completed", summaryZh: "第 3 轮 · 已完成", meta: "2 steps · 2 calls" },
];

const TONE_DOT: Record<string, string> = {
  accent: "bg-accent",
  green: "bg-green",
  orange: "bg-orange",
  muted: "bg-ink-3",
  dim: "bg-line-strong",
};

const TONE_CHIP: Record<string, string> = {
  accent: "bg-accent-tint text-accent-ink",
  green: "bg-green-tint text-green",
  orange: "bg-orange-tint text-orange",
  muted: "bg-hover-2/60 text-ink-2",
  dim: "bg-field text-ink-3",
};

const STEP_MS = 620;
const HOLD_MS = 3600;

export default function TurnLifecycle({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("turn-lifecycle", propLang);
  const zh = lang === "zh";

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible < EVENTS.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 500 : STEP_MS);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => setVisible(0), HOLD_MS);
    return () => clearTimeout(hold);
  }, [visible]);

  const done = visible >= EVENTS.length;

  // Track which bracket levels are open at each rendered row,
  // so the left rail can draw continuous turn/step guides.
  const rows = EVENTS.slice(0, visible);
  let turnOpen = false;
  let stepOpen = false;
  const guides = rows.map((e) => {
    if (e.opens === "turn") turnOpen = true;
    if (e.opens === "step") stepOpen = true;
    const g = { turn: turnOpen, step: stepOpen };
    if (e.closes === "step") stepOpen = false;
    if (e.closes === "turn") { turnOpen = false; stepOpen = false; }
    return g;
  });

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className={`flex size-2 rounded-full ${done ? "bg-green" : "bg-accent animate-pulse"}`} />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "Turn 括号事件流" : "Turn Bracket Stream"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            session/7c1d
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
          {Math.min(visible, EVENTS.length)}/{EVENTS.length} events
        </span>
      </div>

      {/* Timeline */}
      <div className="relative flex min-h-[304px] flex-col gap-[3px] rounded-control border border-line bg-inset/50 p-3">
        {rows.map((e, i) => {
          const g = guides[i];
          const isLast = i === rows.length - 1;
          return (
            <div
              key={`${e.type}-${i}`}
              className="relative flex items-center gap-2.5 rounded-chip px-1.5 py-[5px]"
              style={{
                paddingLeft: `${6 + e.depth * 22}px`,
                animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both",
                background: isLast && !done ? "var(--hover)" : undefined,
              }}
            >
              {/* bracket guides */}
              {g.turn && (
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-accent/35"
                  style={{ left: 12 }}
                />
              )}
              {e.depth >= 1 && g.step && (
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 w-px bg-line-strong"
                  style={{ left: 12 + 22 }}
                />
              )}
              {/* bracket elbows on close */}
              {e.closes && (
                <span
                  aria-hidden
                  className={`absolute size-[7px] rounded-full border-[1.5px] ${
                    e.closes === "turn" ? "border-accent bg-accent-tint" : "border-line-strong bg-surface"
                  }`}
                  style={{ left: 12 + (e.closes === "turn" ? 0 : 22) - 3 }}
                />
              )}

              <span className={`size-1.5 shrink-0 rounded-full ${TONE_DOT[e.tone]}`} />
              <code className={`shrink-0 rounded-chip px-1.5 py-px font-mono text-[10px] ${TONE_CHIP[e.tone]}`}>
                {e.type}
              </code>
              <span className="min-w-0 flex-1 truncate text-[11.5px] text-ink-2">
                {zh ? e.summaryZh : e.summaryEn}
              </span>
              {e.meta && (
                <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">
                  {e.meta}
                </span>
              )}
            </div>
          );
        })}

        {/* caret while streaming */}
        {!done && (
          <div
            className="flex items-center gap-2 px-1.5 py-1"
            style={{ paddingLeft: `${6 + Math.min((EVENTS[visible]?.depth ?? 0) * 22 + 22, 66)}px` }}
          >
            <span className="size-1.5 rounded-full bg-ink-3 animate-pulse" />
            <span className="font-mono text-[10px] text-ink-3">
              {zh ? "等待下一事件…" : "awaiting next event…"}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {zh ? "括号结构: turn ⊃ step ⊃ tool/call" : "Brackets: turn ⊃ step ⊃ tool/call"}
        </span>
        <span className="font-mono">agent/loop · durable</span>
      </div>
    </div>
  );
}
