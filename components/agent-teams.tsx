"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * AGENT TEAMS — durable roster + shared task DAG
 *
 * Mirrors Harness.AgentTeams: members provision → active,
 * tasks flow pending → in_progress → completed with CAS
 * revisions, dependencies, and workspace write scopes.
 * ───────────────────────────────────────────────────────── */

type MemberPhase = "provisioning" | "active" | "failed";
type TaskState = "pending" | "in_progress" | "completed";

type Member = {
  id: string;
  name: string;
  roleEn: string;
  roleZh: string;
  provider: string;
  model: string;
};

type Task = {
  id: string;
  titleEn: string;
  titleZh: string;
  assignee?: string;
  dependsOn: string[];
  scopes: string[];
};

const MEMBERS: Member[] = [
  { id: "lead", name: "lead", roleEn: "Coordinator", roleZh: "协调者", provider: "deepseek", model: "reasoner" },
  { id: "scout", name: "scout", roleEn: "Research", roleZh: "调研", provider: "deepseek", model: "chat" },
  { id: "forge", name: "forge", roleEn: "Implementer", roleZh: "实现", provider: "anthropic", model: "sonnet" },
  { id: "audit", name: "audit", roleEn: "Reviewer", roleZh: "评审", provider: "openai", model: "gpt-5" },
];

const TASKS: Task[] = [
  { id: "t1", titleEn: "Map provider rate limits", titleZh: "梳理提供方速率限制", assignee: "scout", dependsOn: [], scopes: ["docs/limits.md"] },
  { id: "t2", titleEn: "Implement retry backoff", titleZh: "实现指数退避重试", assignee: "forge", dependsOn: ["t1"], scopes: ["src/llm/retry.cs"] },
  { id: "t3", titleEn: "Add backoff unit tests", titleZh: "补退避策略单元测试", assignee: "forge", dependsOn: ["t2"], scopes: ["tests/retry.cs"] },
  { id: "t4", titleEn: "Review & sign off", titleZh: "评审并签收", assignee: "audit", dependsOn: ["t2", "t3"], scopes: [] },
];

// Demo script: member phases & task states at each tick.
// tick 0: scout+forge active, audit provisioning; t1 in_progress
// tick 1: t1 completed, t2 in_progress
// tick 2: audit active; t2 completed, t3 in_progress
// tick 3: t3 completed, t4 in_progress
// tick 4: all completed
const PHASE_SCRIPT: Record<string, MemberPhase[]> = {
  lead: ["active", "active", "active", "active", "active"],
  scout: ["active", "active", "active", "active", "active"],
  forge: ["provisioning", "active", "active", "active", "active"],
  audit: ["provisioning", "provisioning", "active", "active", "active"],
};

const TASK_SCRIPT: TaskState[][] = [
  ["in_progress", "pending", "pending", "pending"],
  ["completed", "in_progress", "pending", "pending"],
  ["completed", "completed", "in_progress", "pending"],
  ["completed", "completed", "completed", "in_progress"],
  ["completed", "completed", "completed", "completed"],
];

const TICK_MS = 2100;
const HOLD_MS = 4200;

function PhaseBadge({ phase, zh }: { phase: MemberPhase; zh: boolean }) {
  if (phase === "active")
    return (
      <span className="flex items-center gap-1 rounded-chip bg-green-tint px-1.5 py-px text-[10px] font-medium text-green">
        <span className="size-1 rounded-full bg-green" />
        {zh ? "已激活" : "active"}
      </span>
    );
  if (phase === "provisioning")
    return (
      <span className="flex items-center gap-1 rounded-chip bg-orange-tint px-1.5 py-px text-[10px] font-medium text-orange">
        <span className="size-1 rounded-full bg-orange animate-pulse" />
        {zh ? "供给中" : "provisioning"}
      </span>
    );
  return (
    <span className="flex items-center gap-1 rounded-chip bg-red-tint px-1.5 py-px text-[10px] font-medium text-red">
      <span className="size-1 rounded-full bg-red" />
      {zh ? "失败" : "failed"}
    </span>
  );
}

function TaskIcon({ state }: { state: TaskState }) {
  if (state === "completed")
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-tint text-green">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    );
  if (state === "in_progress")
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-tint">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" strokeWidth="2.6" className="animate-spin">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
        </svg>
      </span>
    );
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-surface" />
  );
}

export default function AgentTeams({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("agent-teams", propLang);
  const zh = lang === "zh";

  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (tick < PHASE_SCRIPT.lead.length - 1) {
      const t = setTimeout(() => setTick((v) => v + 1), TICK_MS);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => setTick(0), HOLD_MS);
    return () => clearTimeout(hold);
  }, [tick]);

  const memberById = (id?: string) => MEMBERS.find((m) => m.id === id);
  const activeCount = MEMBERS.filter((m) => PHASE_SCRIPT[m.id][tick] === "active").length;
  const doneCount = TASK_SCRIPT[tick].filter((s) => s === "completed").length;

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-accent animate-pulse" />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "智能体团队" : "Agent Team"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            team/provider-migration
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
          {doneCount}/{TASKS.length} {zh ? "任务" : "tasks"}
        </span>
      </div>

      {/* Roster */}
      <div className="grid grid-cols-2 gap-1.5">
        {MEMBERS.map((m) => {
          const phase = PHASE_SCRIPT[m.id][tick];
          const isLead = m.id === "lead";
          return (
            <div
              key={m.id}
              className={`flex items-center justify-between gap-2 rounded-control border px-2.5 py-2 transition-colors duration-300 ${
                isLead ? "border-line-strong bg-inset" : "border-line bg-surface"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${
                    isLead ? "bg-ink text-canvas" : "bg-field text-ink-2"
                  }`}
                >
                  {m.name.slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-mono text-[11px] font-medium text-ink">{m.name}</span>
                    <span className="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">{m.model}</span>
                  </div>
                  <span className="block truncate text-[10px] text-ink-3">
                    {zh ? m.roleZh : m.roleEn} · {m.provider}
                  </span>
                </div>
              </div>
              <PhaseBadge phase={phase} zh={zh} />
            </div>
          );
        })}
      </div>

      {/* Shared task DAG */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between px-0.5">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            {zh ? "共享任务 DAG" : "Shared task DAG"}
          </span>
          <span className="font-mono text-[9.5px] text-ink-3">CAS revisions</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {TASKS.map((task, i) => {
            const state = TASK_SCRIPT[tick][i];
            const blocked = task.dependsOn.some((d) => {
              const di = TASKS.findIndex((t) => t.id === d);
              return TASK_SCRIPT[tick][di] !== "completed";
            });
            const assignee = memberById(task.assignee);
            // revision = 1 + number of state transitions so far
            const revision = 1 + TASK_SCRIPT.slice(0, tick + 1).filter((s) => s[i] !== TASK_SCRIPT[0][i]).length;
            return (
              <div
                key={task.id}
                className={`flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${
                  state === "in_progress"
                    ? "border-accent/40 bg-accent-tint/30"
                    : "border-line bg-surface"
                }`}
                style={{ animation: "fade-up 300ms cubic-bezier(0.23,1,0.32,1) both" }}
              >
                <TaskIcon state={state} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`truncate text-[11.5px] font-medium ${state === "completed" ? "text-ink-2 line-through decoration-line-strong" : "text-ink"}`}>
                      {zh ? task.titleZh : task.titleEn}
                    </span>
                    <span className="shrink-0 rounded-chip bg-field px-1 font-mono text-[9px] tabular-nums text-ink-3">
                      r{revision}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-[10px] text-ink-3">
                    {assignee && (
                      <span className="font-mono">@{assignee.name}</span>
                    )}
                    {task.dependsOn.length > 0 && (
                      <span className="font-mono">
                        deps: {task.dependsOn.join(", ")}
                      </span>
                    )}
                    {task.scopes.map((s) => (
                      <span key={s} className="truncate font-mono rounded-chip bg-inset px-1 border border-line/60">
                        {s}
                      </span>
                    ))}
                    {blocked && state === "pending" && (
                      <span className="text-orange">{zh ? "被阻塞" : "blocked"}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {zh ? `${activeCount}/4 成员已激活 · 事件溯源名册` : `${activeCount}/4 members active · event-sourced roster`}
        </span>
        <span className="font-mono">Harness.AgentTeams</span>
      </div>
    </div>
  );
}
