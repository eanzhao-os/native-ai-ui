"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SESSION TELEMETRY — live session stats projection
 *
 * Mirrors Harness.Session.Stats: turn outcome buckets,
 * step/tool counters, LLM timing and token counters folded
 * from durable session facts. Numbers count up live; the
 * token sparkline grows with each folded turn.
 * ───────────────────────────────────────────────────────── */

type Frame = {
  turns: { completed: number; blocked: number; aborted: number; error: number; maxTokens: number; open: number };
  steps: number;
  toolCalls: number;
  tokensIn: number;
  tokensOut: number;
  llmMs: number;
  spark: number[];
};

const FRAMES: Frame[] = [
  { turns: { completed: 6, blocked: 1, aborted: 0, error: 0, maxTokens: 0, open: 1 }, steps: 14, toolCalls: 19, tokensIn: 41208, tokensOut: 6893, llmMs: 21400, spark: [8, 12, 18, 24, 31, 41] },
  { turns: { completed: 7, blocked: 1, aborted: 0, error: 0, maxTokens: 0, open: 1 }, steps: 17, toolCalls: 23, tokensIn: 50872, tokensOut: 8104, llmMs: 25800, spark: [8, 12, 18, 24, 31, 41, 51] },
  { turns: { completed: 8, blocked: 1, aborted: 1, error: 0, maxTokens: 0, open: 1 }, steps: 20, toolCalls: 27, tokensIn: 59930, tokensOut: 9761, llmMs: 30100, spark: [8, 12, 18, 24, 31, 41, 51, 60] },
  { turns: { completed: 9, blocked: 1, aborted: 1, error: 0, maxTokens: 1, open: 0 }, steps: 24, toolCalls: 31, tokensIn: 71455, tokensOut: 11290, llmMs: 36900, spark: [8, 12, 18, 24, 31, 41, 51, 60, 71] },
];

const FRAME_MS = 2400;
const HOLD_MS = 4600;

function fmtTokens(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function CountUp({
  value,
  format,
  reducedMotion,
}: {
  value: number;
  format?: (n: number) => string;
  reducedMotion: boolean;
}) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return;
    }
    if (display === value) return;
    const diff = value - display;
    const steps = Math.min(14, Math.abs(diff));
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      if (i >= steps) {
        setDisplay(value);
        clearInterval(t);
      } else {
        setDisplay((current) => current + Math.round(diff / steps));
      }
    }, 45);
    return () => clearInterval(t);
    // `display` is the captured animation origin for this incoming durable frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, value]);
  const shown = reducedMotion ? value : display;
  return <>{(format ?? ((n) => n.toLocaleString()))(shown)}</>;
}

export default function SessionTelemetry({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("session-telemetry", propLang);
  const zh = lang === "zh";
  const reducedMotion = usePrefersReducedMotion();

  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (frame < FRAMES.length - 1) {
      const t = setTimeout(() => setFrame((f) => f + 1), FRAME_MS);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => setFrame(0), HOLD_MS);
    return () => clearTimeout(hold);
  }, [frame]);

  const f = FRAMES[frame];
  const totalTurns =
    f.turns.completed + f.turns.blocked + f.turns.aborted + f.turns.error + f.turns.maxTokens + f.turns.open;
  const maxSpark = Math.max(...FRAMES[FRAMES.length - 1].spark);

  const buckets = [
    { key: "completed", labelEn: "completed", labelZh: "完成", value: f.turns.completed, color: "var(--green)" },
    { key: "blocked", labelEn: "blocked", labelZh: "阻塞", value: f.turns.blocked, color: "var(--orange)" },
    { key: "aborted", labelEn: "aborted", labelZh: "中止", value: f.turns.aborted, color: "var(--ink-3)" },
    { key: "error", labelEn: "error", labelZh: "错误", value: f.turns.error, color: "var(--red)" },
    { key: "maxTokens", labelEn: "max-tokens", labelZh: "达到上限", value: f.turns.maxTokens, color: "#b585e0" },
    { key: "open", labelEn: "open", labelZh: "进行中", value: f.turns.open, color: "var(--accent)" },
  ];
  const outcomeDescription = `${zh ? "轮次结局" : "Turn outcomes"}: ${buckets
    .map((bucket) => `${zh ? bucket.labelZh : bucket.labelEn} ${bucket.value}`)
    .join(", ")}`;
  const sparkDescription = `${zh ? "累计输入 tokens" : "Cumulative tokens in"}: ${f.tokensIn.toLocaleString()}; ${zh ? "各轮累计" : "turn totals"} ${f.spark
    .map((value) => `${value}k`)
    .join(", ")}`;

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className={`flex size-2 rounded-full ${f.turns.open > 0 ? "bg-accent animate-pulse motion-reduce:animate-none" : "bg-green"}`} />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "会话遥测" : "Session Telemetry"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            sessionStats
          </span>
        </div>
        <span aria-live="polite" className="font-mono text-[10.5px] tabular-nums text-ink-3">
          {f.turns.open > 0 ? (zh ? "折叠中…" : "folding…") : zh ? "已归档" : "archived"}
        </span>
      </div>

      {/* Metric tiles */}
      <div
        role="group"
        aria-label={zh ? "会话指标" : "Session metrics"}
        className="grid grid-cols-3 gap-1.5"
      >
        {[
          { labelEn: "Turns", labelZh: "轮次", value: totalTurns, mono: true },
          { labelEn: "Steps", labelZh: "步骤", value: f.steps, mono: true },
          { labelEn: "Tool calls", labelZh: "工具调用", value: f.toolCalls, mono: true },
          { labelEn: "Tokens in", labelZh: "输入 tokens", value: f.tokensIn, format: fmtTokens },
          { labelEn: "Tokens out", labelZh: "输出 tokens", value: f.tokensOut, format: fmtTokens },
          { labelEn: "LLM time", labelZh: "LLM 耗时", value: Math.round(f.llmMs / 100) / 10, format: (n: number) => `${n.toFixed(1)}s` },
        ].map((m) => (
          <div key={m.labelEn} className="rounded-control border border-line bg-inset/60 px-2.5 py-2">
            <div className="font-mono text-[16px] font-semibold tabular-nums tracking-tight text-ink">
              <CountUp value={m.value} format={m.format} reducedMotion={reducedMotion} />
            </div>
            <div className="mt-0.5 text-[10.5px] leading-4 text-ink-2">{zh ? m.labelZh : m.labelEn}</div>
          </div>
        ))}
      </div>

      {/* Turn outcome breakdown */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            {zh ? "轮次结局分布" : "Turn outcomes"}
          </span>
          <span className="font-mono text-[9.5px] text-ink-3">turn/end · six kinds</span>
        </div>
        <div
          role="img"
          aria-label={outcomeDescription}
          className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-surface"
        >
          {buckets.map((b) =>
            b.value > 0 ? (
              <span
                key={b.key}
                className="h-full transition-all duration-700 motion-reduce:transition-none"
                style={{ width: `${(b.value / totalTurns) * 100}%`, background: b.color }}
                title={`${b.key}: ${b.value}`}
              />
            ) : null
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
          {buckets.map((b) => (
            <span key={b.key} className="flex items-center gap-1 text-[10.5px] leading-4 text-ink-2">
              <span className="size-1.5 rounded-full" style={{ background: b.color }} />
              {zh ? b.labelZh : b.labelEn}
              <span className="font-mono tabular-nums text-ink-3">{b.value}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Token sparkline */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            {zh ? "累计输入 tokens" : "Cumulative tokens in"}
          </span>
          <span className="font-mono text-[10px] tabular-nums text-ink-3">
            <CountUp value={f.tokensIn} reducedMotion={reducedMotion} />
          </span>
        </div>
        <div
          role="img"
          aria-label={sparkDescription}
          className="flex h-12 items-end justify-between gap-1.5"
        >
          {FRAMES[FRAMES.length - 1].spark.map((_, i) => {
            const v = f.spark[i];
            return (
              <span
                key={i}
                className={`w-full max-w-6 rounded-t-[4px] transition-all duration-700 motion-reduce:transition-none ${
                  v === undefined ? "bg-field" : i === f.spark.length - 1 ? "bg-accent" : "bg-accent/35"
                }`}
                title={v === undefined ? undefined : `${v}k tokens`}
                style={{ height: v === undefined ? "8%" : `${Math.max(8, (v / maxSpark) * 100)}%` }}
              />
            );
          })}
        </div>
      </div>

      <table className="sr-only">
        <caption>{zh ? "轮次结局计数" : "Turn outcome counts"}</caption>
        <tbody>
          {buckets.map((bucket) => (
            <tr key={bucket.key}>
              <th scope="row">{zh ? bucket.labelZh : bucket.labelEn}</th>
              <td>{bucket.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="sr-only">
        <caption>{zh ? "各轮累计输入 tokens" : "Cumulative input tokens by turn"}</caption>
        <tbody>
          {f.spark.map((value, index) => (
            <tr key={index}>
              <th scope="row">{zh ? `轮次 ${index + 1}` : `Turn ${index + 1}`}</th>
              <td>{value}k</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "投影 = durable 事实的纯折叠" : "Projection = pure fold of durable facts"}</span>
        <span className="font-mono">Harness.Session.Stats</span>
      </div>
    </div>
  );
}
