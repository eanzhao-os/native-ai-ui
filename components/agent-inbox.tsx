"use client";

import { useEffect, useReducer } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * AGENT INBOX — dual-queue delivery semantics
 *
 * Mirrors Harness's IInbox: NextTurn messages open their own
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
// 4  step 1 ends    → boundary claims the visible NextStep queue
// 5  turn 2 ends    → idle… visible NextTurn messages may start turn 3
// 6  hold & replay
const PHASE_MS = [900, 1500, 1500, 1500, 1700, 2100, 4600];

type InboxState = {
  claimed: QueueMsg[];
  lastAction: "send" | null;
  nextStep: QueueMsg[];
  nextTurn: QueueMsg[];
  nextTurnStarted: boolean;
  phase: number;
  stepNo: number;
  turnNo: number;
};

type InboxAction = {
  type: "claim" | "followup" | "inject" | "send" | "steer" | "tick";
};

const INITIAL_INBOX_STATE: InboxState = {
  claimed: [],
  lastAction: null,
  nextStep: [],
  nextTurn: [],
  nextTurnStarted: false,
  phase: 0,
  stepNo: 1,
  turnNo: 2,
};

function enqueueUnique(queue: QueueMsg[], message: QueueMsg) {
  return queue.some(({ id }) => id === message.id) ? queue : [...queue, message];
}

function claimVisibleNextStep(state: InboxState): InboxState {
  if (state.nextStep.length === 0) return state;
  return {
    ...state,
    claimed: state.nextStep,
    lastAction: null,
    nextStep: [],
    nextTurnStarted: false,
    phase: 4,
    stepNo: state.stepNo + 1,
  };
}

function restartReplayForQueueing(state: InboxState): InboxState {
  if (state.phase < 4) return state;
  return {
    ...state,
    claimed: [],
    nextTurnStarted: false,
    phase: 0,
    stepNo: 1,
  };
}

function inboxReducer(state: InboxState, action: InboxAction): InboxState {
  if (action.type === "send") {
    return { ...INITIAL_INBOX_STATE, lastAction: "send" };
  }
  if (action.type === "followup") {
    const running = restartReplayForQueueing(state);
    return {
      ...running,
      lastAction: null,
      nextTurn: enqueueUnique(running.nextTurn, FOLLOWUP),
    };
  }
  if (action.type === "steer") {
    const running = restartReplayForQueueing(state);
    return {
      ...running,
      lastAction: null,
      nextStep: enqueueUnique(running.nextStep, STEER),
    };
  }
  if (action.type === "inject") {
    const running = restartReplayForQueueing(state);
    return {
      ...running,
      lastAction: null,
      nextStep: enqueueUnique(running.nextStep, INJECT),
    };
  }
  if (action.type === "claim") return claimVisibleNextStep(state);

  if (state.phase === 0) {
    return {
      ...state,
      lastAction: null,
      nextTurn: enqueueUnique(state.nextTurn, FOLLOWUP),
      phase: 1,
    };
  }
  if (state.phase === 1) {
    return {
      ...state,
      nextStep: enqueueUnique(state.nextStep, STEER),
      phase: 2,
    };
  }
  if (state.phase === 2) {
    return {
      ...state,
      nextStep: enqueueUnique(state.nextStep, INJECT),
      phase: 3,
    };
  }
  if (state.phase === 3) {
    return state.nextStep.length > 0
      ? claimVisibleNextStep(state)
      : { ...state, claimed: [], phase: 4 };
  }
  if (state.phase === 4) {
    const nextTurnStarted = state.nextTurn.length > 0;
    return {
      ...state,
      claimed: [],
      nextTurn: [],
      nextTurnStarted,
      phase: 5,
      stepNo: nextTurnStarted ? 1 : state.stepNo,
      turnNo: nextTurnStarted ? state.turnNo + 1 : state.turnNo,
    };
  }
  if (state.phase === 5) return { ...state, phase: 6 };
  return INITIAL_INBOX_STATE;
}

export default function AgentInbox({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("agent-inbox", propLang);
  const zh = lang === "zh";

  const [state, dispatch] = useReducer(inboxReducer, INITIAL_INBOX_STATE);

  useEffect(() => {
    const t = setTimeout(() => dispatch({ type: "tick" }), PHASE_MS[state.phase]);
    return () => clearTimeout(t);
  }, [state.phase]);

  const {
    claimed,
    lastAction,
    nextStep,
    nextTurn,
    nextTurnStarted,
    phase,
    stepNo,
    turnNo,
  } = state;
  const idleFlicker = phase === 5;
  const claimReady = nextStep.length > 0;
  const claimActive = phase === 4 && claimed.length > 0;
  const boundaryComplete = claimActive || (phase >= 5 && nextTurnStarted);
  const boundaryText =
    lastAction === "send"
      ? zh
        ? "SendAsync 已接管当前发送"
        : "SendAsync owns the current send"
      : claimActive
        ? zh
          ? `步骤边界：ClaimAsync 整批取走 ${claimed.length} 条消息`
          : `Step boundary: ClaimAsync drained ${claimed.length} ${claimed.length === 1 ? "message" : "messages"}`
        : phase >= 5
          ? nextTurnStarted
            ? zh
              ? `NextTurn 唤醒驱动，开启第 ${turnNo} 轮`
              : `NextTurn woke the driver into turn ${turnNo}`
            : zh
              ? "本轮结束，没有待处理的 NextTurn 消息"
              : "Turn completed with no queued NextTurn message"
          : zh
            ? "等待步骤边界…"
            : "awaiting step boundary…";

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header — driver state */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-2 rounded-full transition-colors duration-300 ${
              idleFlicker ? "bg-ink-3" : "bg-accent animate-pulse motion-reduce:animate-none"
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
        <div
          role="region"
          aria-label={zh ? "NextTurn 队列" : "NextTurn queue"}
          className="flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2"
        >
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
                  className="rounded-chip border border-accent/40 bg-accent-tint/40 px-2 py-1.5 motion-reduce:[animation:none!important]"
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
        <div
          role="region"
          aria-label={zh ? "NextStep 队列" : "NextStep queue"}
          className="flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2"
        >
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
                  className={`rounded-chip px-2 py-1.5 motion-reduce:[animation:none!important] ${
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
      <button
        type="button"
        aria-label={zh ? "领取 NextStep 队列" : "Claim next-step queue"}
        aria-pressed={claimActive}
        disabled={!claimReady}
        onClick={() => dispatch({ type: "claim" })}
        className={`mt-2 flex min-h-11 w-full items-center gap-2 rounded-control border px-2.5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default motion-reduce:transition-none ${
          boundaryComplete
            ? "border-green/40 bg-green-tint/40"
            : claimReady
              ? "border-accent/40 bg-accent-tint/35 hover:bg-accent-tint/55"
              : "border-line bg-inset/40"
        }`}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={boundaryComplete ? "var(--green)" : "var(--ink-3)"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
        </svg>
        <span
          role="status"
          aria-live="polite"
          className="min-w-0 flex-1 text-[11px] leading-4 text-ink-2"
        >
          {boundaryText}
        </span>
        {claimActive && (
          <span
            className="shrink-0 rounded-chip bg-green-tint px-1.5 py-px font-mono text-[9.5px] font-medium text-green motion-reduce:[animation:none!important]"
            style={{ animation: "pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            claimed ×{claimed.length}
          </span>
        )}
      </button>

      {/* Delivery methods */}
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {[
          {
            name: "Send",
            ariaEn: "Send immediately",
            ariaZh: "立即发送",
            descEn: "owns send",
            descZh: "独占发送",
            style: "border-line bg-field text-ink-2",
            pressed: lastAction === "send",
            onClick: () => dispatch({ type: "send" }),
          },
          {
            name: "Followup",
            ariaEn: "Queue Followup",
            ariaZh: "加入 Followup 队列",
            descEn: "→ turn + wake",
            descZh: "→ 下轮 + 唤醒",
            style: "border-accent/40 bg-accent-tint/40 text-accent-ink",
            pressed: nextTurn.some(({ id }) => id === FOLLOWUP.id),
            onClick: () => dispatch({ type: "followup" }),
          },
          {
            name: "Steer",
            ariaEn: "Queue Steer",
            ariaZh: "加入 Steer 队列",
            descEn: "→ step + wake",
            descZh: "→ 边界 + 唤醒",
            style: "border-orange/40 bg-orange-tint/40 text-orange",
            pressed: nextStep.some(({ id }) => id === STEER.id),
            onClick: () => dispatch({ type: "steer" }),
          },
          {
            name: "Inject",
            ariaEn: "Queue Inject",
            ariaZh: "加入 Inject 队列",
            descEn: "→ step, silent",
            descZh: "→ 边界，静默",
            style: "border-dashed border-line-strong bg-surface text-ink-3",
            pressed: nextStep.some(({ id }) => id === INJECT.id),
            onClick: () => dispatch({ type: "inject" }),
          },
        ].map((method) => {
          const flash = method.pressed;
          return (
            <button
              type="button"
              key={method.name}
              aria-label={zh ? method.ariaZh : method.ariaEn}
              aria-pressed={flash}
              onClick={method.onClick}
              className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-chip border px-1.5 text-center transition-all duration-300 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transform-none motion-reduce:transition-none ${method.style} ${
                flash ? "ring-2 ring-accent/40" : ""
              }`}
              style={method.name === "Inject" ? { borderStyle: "dashed" } : undefined}
            >
              <span className="font-mono text-[10.5px] font-semibold">{method.name}</span>
              <span className="text-[9.5px] leading-3 opacity-85">
                {zh ? method.descZh : method.descEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {phase >= 5
            ? nextTurnStarted
              ? zh
                ? `空闲后 NextTurn 唤醒驱动，开启第 ${turnNo} 轮`
                : `NextTurn wakes the driver into turn ${turnNo}`
              : zh
                ? "本轮结束，NextTurn 队列为空"
                : "Turn ended with an empty NextTurn queue"
            : zh
              ? "所有 mutation 归一化为 splice 事件"
              : "Every mutation folds into a splice event"}
        </span>
        <span className="font-mono">agent/inbox/spliced</span>
      </div>
    </div>
  );
}
