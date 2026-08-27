"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * AGENT INBOX — dual-queue delivery semantics
 *
 * Mirrors Tether's IInbox: NextTurn messages open their own
 * turn; NextStep messages are consumed at the step boundary.
 * Followup wakes the driver, Steer wakes at the boundary,
 * Inject slides in silently. The demo scripts all four.
 * ───────────────────────────────────────────────────────── */

type QueueMsg = {
  id: string;
  kind: "followup" | "steer" | "inject";
  textEn: string;
  textZh: string;
};

const FOLLOWUP: QueueMsg = {
  id: "m1",
  kind: "followup",
  textEn: "also verify the rollout gate",
  textZh: "顺便验证一下灰度发布门禁",
};

const STEER: QueueMsg = {
  id: "m2",
  kind: "steer",
  textEn: "use the staging endpoint",
  textZh: "改用 staging 环境的端点",
};

const INJECT: QueueMsg = {
  id: "m3",
  kind: "inject",
  textEn: "fyi: trace dump at /tmp/trace.log",
  textZh: "备注：trace 已转储到 /tmp/trace.log",
};

// phase choreography:
// 0  running turn 2 / step 1, queues empty
// 1  FollowupAsync  → NextTurn [f]        (queues for next turn)
// 2  SteerAsync     → NextStep [s]        (wakes at step boundary)
// 3  InjectAsync    → NextStep [s, i]     (silent, no wake)
// 4  step 1 ends    → boundary claims [s, i] into step 2
// 5  turn 2 ends    → idle… NextTurn claims [f] → turn 3
// 6  hold & replay
const PHASE_MS = [900, 1500, 1500, 1500, 1700, 2100, 4600];

export default function AgentInbox({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("agent-inbox", propLang);
  const zh = lang === "zh";

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % PHASE_MS.length), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const nextTurn: QueueMsg[] = phase >= 1 && phase < 5 ? [FOLLOWUP] : [];
  const nextStep: QueueMsg[] =
    phase === 2 ? [STEER] : phase === 3 ? [STEER, INJECT] : [];
  const claimed = phase >= 4 ? [STEER, INJECT] : [];

  const agentRunning = phase < 5 || phase >= 5; // always running except the brief idle in 5's start
  const idleFlicker = phase === 5;
  const turnNo = phase >= 5 ? 3 : 2;
  const stepNo = phase >= 4 ? 2 : 1;

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header — driver state */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-2 rounded-full transition-colors duration-300 ${
              idleFlicker ? "bg-ink-3" : "bg-accent animate-pulse"
            }`}
          />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "双队列收件箱" : "Agent Inbox"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            {idleFlicker ? (zh ? "空闲" : "idle") : zh ? "运行中" : "running"}
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
          turn {turnNo} · step {stepNo}
        </span>
      </div>

      {/* Queue lanes */}
      <div className="grid grid-cols-2 gap-2">
        {/* NextTurn lane */}
        <div className="flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
          <div className="flex items-center justify-between px-1 pb-1.5">
            <span className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
              NextTurn
            </span>
            <span className="font-mono text-[9px] text-ink-3">
              {zh ? "各开一轮" : "own turn"}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            {nextTurn.length === 0 ? (
              <span className="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">
                {zh ? "空" : "empty"}
              </span>
            ) : (
              nextTurn.map((m) => (
                <div
                  key={m.id}
                  className="rounded-chip border border-accent/40 bg-accent-tint/40 px-2 py-1.5"
                  style={{ animation: "pop-in 260ms cubic-bezier(0.23,1,0.32,1) both" }}
                >
                  <div className="flex items-center gap-1">
                    <span className="size-1 rounded-full bg-accent" />
                    <span className="font-mono text-[9px] font-medium text-accent-ink">FollowupAsync</span>
                  </div>
                  <p className="mt-0.5 truncate text-[10.5px] text-ink">
                    {zh ? m.textZh : m.textEn}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* NextStep lane */}
        <div className="flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
          <div className="flex items-center justify-between px-1 pb-1.5">
            <span className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
              NextStep
            </span>
            <span className="font-mono text-[9px] text-ink-3">
              {zh ? "步骤边界消费" : "step edge"}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            {nextStep.length === 0 ? (
              <span className="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">
                {zh ? "空" : "empty"}
              </span>
            ) : (
              nextStep.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-chip px-2 py-1.5 ${
                    m.kind === "inject"
                      ? "border border-dashed border-line-strong bg-surface"
                      : "border border-orange/40 bg-orange-tint/40"
                  }`}
                  style={{ animation: "pop-in 260ms cubic-bezier(0.23,1,0.32,1) both" }}
                >
                  <div className="flex items-center gap-1">
                    <span className={`size-1 rounded-full ${m.kind === "inject" ? "bg-ink-3" : "bg-orange"}`} />
                    <span className={`font-mono text-[9px] font-medium ${m.kind === "inject" ? "text-ink-3" : "text-orange"}`}>
                      {m.kind === "inject" ? "InjectAsync" : "SteerAsync"}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[10.5px] text-ink">
                    {zh ? m.textZh : m.textEn}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Step boundary claim indicator */}
      <div
        className={`mt-2 flex items-center gap-2 rounded-control border px-2.5 py-2 transition-all duration-500 ${
          phase >= 4 ? "border-green/40 bg-green-tint/40" : "border-line bg-inset/40"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={phase >= 4 ? "var(--green)" : "var(--ink-3)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
        </svg>
        <span className="min-w-0 flex-1 truncate text-[11px] text-ink-2">
          {phase >= 4
            ? zh
              ? "步骤边界：ClaimAsync 整批取走 2 条消息"
              : "Step boundary: ClaimAsync drained 2 messages"
            : zh
            ? "等待步骤边界…"
            : "awaiting step boundary…"}
        </span>
        {phase >= 4 && (
          <span
            className="shrink-0 rounded-chip bg-green-tint px-1.5 py-px font-mono text-[9.5px] font-medium text-green"
            style={{ animation: "pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            claimed ×2
          </span>
        )}
      </div>

      {/* Delivery methods */}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {[
          { name: "Send", descEn: "owns send", descZh: "独占发送", style: "border-line bg-field text-ink-2" },
          { name: "Followup", descEn: "→ turn+wake", descZh: "→ 下轮+唤醒", style: "border-accent/40 bg-accent-tint/40 text-accent-ink" },
          { name: "Steer", descEn: "→ step+wake", descZh: "→ 边界+唤醒", style: "border-orange/40 bg-orange-tint/40 text-orange" },
          { name: "Inject", descEn: "→ step, silent", descZh: "→ 边界,静默", style: "border-dashed border-line-strong bg-surface text-ink-3" },
        ].map((b, i) => {
          const flash =
            (i === 1 && phase === 1) || (i === 2 && phase === 2) || (i === 3 && phase === 3);
          return (
            <div
              key={b.name}
              className={`flex flex-col items-center gap-0.5 rounded-chip border px-1 py-1.5 transition-all duration-300 ${b.style} ${
                flash ? "ring-2 ring-accent/40 scale-105" : ""
              }`}
              style={b.name === "Inject" ? { borderStyle: "dashed" } : undefined}
            >
              <span className="font-mono text-[10px] font-semibold">{b.name}</span>
              <span className="text-[8.5px] opacity-80">{zh ? b.descZh : b.descEn}</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {phase >= 5
            ? zh
              ? "空闲后 NextTurn 唤醒驱动，开启第 3 轮"
              : "NextTurn wakes the driver into turn 3"
            : zh
            ? "所有 mutation 归一化为 splice 事件"
            : "Every mutation folds into a splice event"}
        </span>
        <span className="font-mono">agent/inbox/spliced</span>
      </div>
    </div>
  );
}
