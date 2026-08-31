"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * HOOK PIPELINE — decision merge across hook points
 *
 * Mirrors Harness.Hooks: every tool call passes ToolPre
 * hooks; each returns allow / ask / deny / block and the
 * most-restrictive decision wins (deny > ask > block > allow).
 * The demo walks one fs.write call through the pipeline.
 * ───────────────────────────────────────────────────────── */

type Decision = "allow" | "ask" | "deny" | "block";

type Hook = {
  name: string;
  matcher: string;
  decision: Decision;
  reasonEn?: string;
  reasonZh?: string;
  latencyMs: number;
};

const TOOLPRE_HOOKS: Hook[] = [
  { name: "secret-scrub", matcher: "*", decision: "allow", latencyMs: 4 },
  {
    name: "workspace-guard",
    matcher: "fs.*",
    decision: "ask",
    reasonEn: "writes outside declared scopes",
    reasonZh: "写入超出声明的 write scopes",
    latencyMs: 11,
  },
  { name: "rate-limiter", matcher: "*", decision: "allow", latencyMs: 2 },
];

const RANK: Record<Decision, number> = { deny: 0, ask: 1, block: 2, allow: 3 };

const DECISION_STYLE: Record<Decision, { chip: string; dot: string; labelEn: string; labelZh: string }> = {
  allow: { chip: "bg-green-tint text-green", dot: "bg-green", labelEn: "allow", labelZh: "允许" },
  ask: { chip: "bg-orange-tint text-orange", dot: "bg-orange", labelEn: "ask", labelZh: "询问" },
  deny: { chip: "bg-red-tint text-red", dot: "bg-red", labelEn: "deny", labelZh: "拒绝" },
  block: { chip: "bg-accent-tint text-accent-ink", dot: "bg-accent", labelEn: "block", labelZh: "阻断" },
};

const POINTS = ["SessionStart", "UserPrompt", "ToolPre", "ToolPost", "Stop", "Subagent"];

// phases: 0 idle → 1..3 hooks evaluate → 4 merged(ask) → explicit approval → 5 allow → hold → reset
const EVALUATION_MS = [700, 750, 750, 750];
const HOLD_MS = 3800;

export default function HookPipeline({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("hook-pipeline", propLang);
  const zh = lang === "zh";

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase < EVALUATION_MS.length) {
      const t = setTimeout(() => setPhase((p) => p + 1), EVALUATION_MS[phase]);
      return () => clearTimeout(t);
    }
    if (phase === 5) {
      const hold = setTimeout(() => setPhase(0), HOLD_MS);
      return () => clearTimeout(hold);
    }
  }, [phase]);

  const evaluated = Math.max(0, Math.min(phase, TOOLPRE_HOOKS.length));
  const merged: Decision | null =
    phase >= 4
      ? phase >= 5
        ? "allow"
        : (TOOLPRE_HOOKS.map((h) => h.decision).sort((a, b) => RANK[a] - RANK[b])[0] ?? "allow")
      : null;

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-2 rounded-full ${
              phase === 5
                ? "bg-green"
                : phase === 4
                  ? "bg-orange"
                  : "bg-accent animate-pulse motion-reduce:animate-none"
            }`}
          />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "Hook 决策管线" : "Hook Pipeline"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            6 points
          </span>
        </div>
        <span className="font-mono text-[10.5px] text-ink-3">Harness.Hooks</span>
      </div>

      {/* Hook points strip */}
      <div className="flex flex-wrap gap-1">
        {POINTS.map((p) => (
          <span
            key={p}
            className={`rounded-chip border px-1.5 py-0.5 font-mono text-[9.5px] transition-colors duration-300 motion-reduce:transition-none ${
              p === "ToolPre"
                ? "border-accent/50 bg-accent-tint text-accent-ink"
                : "border-line bg-inset text-ink-3"
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      {/* The tool call being inspected */}
      <div className="mt-3 flex items-center gap-2 rounded-control border border-line bg-inset px-2.5 py-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
        </svg>
        <code className="font-mono text-[11.5px] text-ink">fs.write</code>
        <span className="truncate font-mono text-[10.5px] text-ink-3">src/llm/retry.cs</span>
        <span className="ml-auto shrink-0 rounded-chip bg-field px-1.5 py-px font-mono text-[9.5px] text-ink-3">
          call_e51c
        </span>
      </div>

      {/* Pipeline: hooks evaluating in sequence */}
      <div className="mt-3 flex min-h-[132px] flex-col gap-1.5">
        {TOOLPRE_HOOKS.map((hook, i) => {
          const active = i < evaluated;
          const style = DECISION_STYLE[hook.decision];
          return (
            <div
              key={hook.name}
              className={`flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 motion-reduce:transition-none motion-reduce:[animation:none!important] ${
                active ? "border-line bg-surface" : "border-line/70 bg-inset/55 opacity-65"
              }`}
              style={active ? { animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" } : undefined}
            >
              {/* connector */}
              <span className={`flex size-1.5 shrink-0 rounded-full ${active ? style.dot : "bg-line-strong"}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-[11px] font-medium text-ink">{hook.name}</code>
                  <span className="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                    {hook.matcher}
                  </span>
                </div>
                {active && hook.reasonEn && (
                  <span className="mt-0.5 block truncate text-[10.5px] text-ink-3">
                    {zh ? hook.reasonZh : hook.reasonEn}
                  </span>
                )}
              </div>
              {active ? (
                <span className={`shrink-0 rounded-chip px-1.5 py-0.5 font-mono text-[10px] font-medium ${style.chip}`}>
                  {zh ? style.labelZh : style.labelEn}
                </span>
              ) : (
                <span className="shrink-0 font-mono text-[9.5px] text-ink-3">…</span>
              )}
              <span className="w-8 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                {active ? `${hook.latencyMs}ms` : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Merge bar */}
      <div
        className={`mt-1 flex items-center justify-between gap-2 rounded-control border px-3 py-2.5 transition-all duration-500 motion-reduce:transition-none ${
          merged === "allow"
            ? "border-green/40 bg-green-tint/50"
            : merged === "ask"
            ? "border-orange/40 bg-orange-tint/50"
            : "border-line bg-inset/50"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M8 3v4a4 4 0 0 1-4 4h16M8 21v-4a4 4 0 0 0-4-4" />
            <path d="M18 8l3 3-3 3" transform="translate(-3 4)" />
          </svg>
          <span className="shrink-0 text-[11.5px] font-medium text-ink">
            {zh ? "Merge · 最严优先" : "Merge · most-restrictive"}
          </span>
          <span className="hidden min-w-0 truncate font-mono text-[9.5px] text-ink-3 sm:inline">
            deny &gt; ask &gt; block &gt; allow
          </span>
        </div>
        {merged ? (
          <span
            className={`shrink-0 whitespace-nowrap rounded-chip px-2 py-0.5 font-mono text-[10.5px] font-semibold motion-reduce:[animation:none!important] ${DECISION_STYLE[merged].chip}`}
            style={{ animation: "pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
          >
            {merged === "allow" && phase >= 5
              ? zh
                ? "allow · 已批准"
                : "allow · approved"
              : zh
              ? DECISION_STYLE[merged].labelZh
              : DECISION_STYLE[merged].labelEn}
          </span>
        ) : (
          <span className="font-mono text-[10px] text-ink-3">…</span>
        )}
      </div>

      {phase === 4 && (
        <button
          type="button"
          aria-label={zh ? "批准 Hook 请求" : "Approve hook request"}
          onClick={() => setPhase(5)}
          className="mt-2 flex min-h-11 w-full items-center justify-between rounded-control border border-orange/40 bg-orange-tint/45 px-3 text-left text-[11.5px] font-medium text-ink transition-colors hover:bg-orange-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
        >
          <span>{zh ? "批准 workspace-guard 请求" : "Approve workspace-guard request"}</span>
          <span className="rounded-chip bg-surface px-2 py-0.5 font-mono text-[9.5px] text-orange">
            {zh ? "人工批准" : "human approval"}
          </span>
        </button>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {phase >= 4 && phase < 5
            ? zh
              ? "workspace-guard 升级为 ask → 等待人工批准"
              : "workspace-guard escalated to ask → awaiting approval"
            : zh
            ? "HookInvokedFact 全部落入 durable log"
            : "Every HookInvokedFact lands in the durable log"}
        </span>
        <span className="font-mono tabular-nums">
          {phase >= 5 ? "fail-open: never" : "fail-closed"}
        </span>
      </div>
    </div>
  );
}
