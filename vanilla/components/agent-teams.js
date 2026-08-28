import { NaiBaseElement } from "../core/base-element.js";

const MEMBERS = [
  { id: "lead", name: "lead", roleEn: "Coordinator", roleZh: "协调者", provider: "deepseek", model: "reasoner" },
  { id: "scout", name: "scout", roleEn: "Research", roleZh: "调研", provider: "deepseek", model: "chat" },
  { id: "forge", name: "forge", roleEn: "Implementer", roleZh: "实现", provider: "anthropic", model: "sonnet" },
  { id: "audit", name: "audit", roleEn: "Reviewer", roleZh: "评审", provider: "openai", model: "gpt-5" },
];

const TASKS = [
  { id: "t1", titleEn: "Map provider rate limits", titleZh: "梳理提供方速率限制", assignee: "scout", dependsOn: [], scopes: ["docs/limits.md"] },
  { id: "t2", titleEn: "Implement retry backoff", titleZh: "实现指数退避重试", assignee: "forge", dependsOn: ["t1"], scopes: ["src/llm/retry.cs"] },
  { id: "t3", titleEn: "Add backoff unit tests", titleZh: "补退避策略单元测试", assignee: "forge", dependsOn: ["t2"], scopes: ["tests/retry.cs"] },
  { id: "t4", titleEn: "Review & sign off", titleZh: "评审并签收", assignee: "audit", dependsOn: ["t2", "t3"], scopes: [] },
];

const PHASE_SCRIPT = {
  lead: ["active", "active", "active", "active", "active"],
  scout: ["active", "active", "active", "active", "active"],
  forge: ["provisioning", "active", "active", "active", "active"],
  audit: ["provisioning", "provisioning", "active", "active", "active"],
};

const TASK_SCRIPT = [
  ["in_progress", "pending", "pending", "pending"],
  ["completed", "in_progress", "pending", "pending"],
  ["completed", "completed", "in_progress", "pending"],
  ["completed", "completed", "completed", "in_progress"],
  ["completed", "completed", "completed", "completed"],
];

const TICK_MS = 2100;
const HOLD_MS = 4200;

export class NaiAgentTeams extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "auto"];
  }

  constructor() {
    super();
    this._tick = 0;
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    if (this.autoPlay) {
      this._scheduleNext();
    }
  }

  _scheduleNext() {
    if (!this.autoPlay) return;
    const isEnd = this._tick >= PHASE_SCRIPT.lead.length - 1;
    const delay = isEnd ? HOLD_MS : TICK_MS;
    this.registerTimeout(() => {
      this._tick = isEnd ? 0 : this._tick + 1;
      this.render();
      this._scheduleNext();
    }, delay);
  }

  render() {
    const zh = this.isZh;
    const tick = this._tick;
    const memberById = (id) => MEMBERS.find((m) => m.id === id);
    const activeCount = MEMBERS.filter((m) => PHASE_SCRIPT[m.id][tick] === "active").length;
    const doneCount = TASK_SCRIPT[tick].filter((s) => s === "completed").length;

    const renderPhaseBadge = (phase) => {
      if (phase === "active") {
        return `
          <span class="flex items-center gap-1 rounded-chip bg-green-tint px-1.5 py-px text-[10px] font-medium text-green">
            <span class="size-1 rounded-full bg-green"></span>
            ${zh ? "已激活" : "active"}
          </span>
        `;
      }
      if (phase === "provisioning") {
        return `
          <span class="flex items-center gap-1 rounded-chip bg-orange-tint px-1.5 py-px text-[10px] font-medium text-orange">
            <span class="size-1 rounded-full bg-orange animate-pulse"></span>
            ${zh ? "供给中" : "provisioning"}
          </span>
        `;
      }
      return `
        <span class="flex items-center gap-1 rounded-chip bg-red-tint px-1.5 py-px text-[10px] font-medium text-red">
          <span class="size-1 rounded-full bg-red"></span>
          ${zh ? "失败" : "failed"}
        </span>
      `;
    };

    const renderTaskIcon = (state) => {
      if (state === "completed") {
        return `
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-tint text-green">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        `;
      }
      if (state === "in_progress") {
        return `
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-tint">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" stroke-width="2.6" class="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round" />
            </svg>
          </span>
        `;
      }
      return `
        <span class="flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-surface"></span>
      `;
    };

    const html = `
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-accent animate-pulse"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "智能体团队" : "Agent Team"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              team/provider-migration
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${doneCount}/${TASKS.length} ${zh ? "任务" : "tasks"}
          </span>
        </div>

        <!-- Roster -->
        <div class="grid grid-cols-2 gap-1.5">
          ${MEMBERS.map((m) => {
            const phase = PHASE_SCRIPT[m.id][tick];
            const isLead = m.id === "lead";
            return `
              <div
                class="member-card flex items-center justify-between gap-2 rounded-control border px-2.5 py-2 transition-colors duration-300 ${
                  isLead ? "border-line-strong bg-inset" : "border-line bg-surface"
                }"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${
                      isLead ? "bg-ink text-canvas" : "bg-field text-ink-2"
                    }"
                  >
                    ${m.name.slice(0, 2)}
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1">
                      <span class="truncate font-mono text-[11px] font-medium text-ink">${m.name}</span>
                      <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">${m.model}</span>
                    </div>
                    <span class="block truncate text-[10px] text-ink-3">
                      ${zh ? m.roleZh : m.roleEn} · ${m.provider}
                    </span>
                  </div>
                </div>
                ${renderPhaseBadge(phase)}
              </div>
            `;
          }).join("")}
        </div>

        <!-- Shared task DAG -->
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between px-0.5">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${zh ? "共享任务 DAG" : "Shared task DAG"}
            </span>
            <span class="font-mono text-[9.5px] text-ink-3">CAS revisions</span>
          </div>
          <div class="flex flex-col gap-1.5">
            ${TASKS.map((task, i) => {
              const state = TASK_SCRIPT[tick][i];
              const blocked = task.dependsOn.some((d) => {
                const di = TASKS.findIndex((t) => t.id === d);
                return TASK_SCRIPT[tick][di] !== "completed";
              });
              const assignee = memberById(task.assignee);
              const revision = 1 + TASK_SCRIPT.slice(0, tick + 1).filter((s) => s[i] !== TASK_SCRIPT[0][i]).length;
              return `
                <div
                  class="task-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${
                    state === "in_progress"
                      ? "border-accent/40 bg-accent-tint/30"
                      : state === "completed"
                      ? "border-line bg-surface opacity-75"
                      : "border-line bg-surface"
                  }"
                  style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"
                >
                  ${renderTaskIcon(state)}
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                      <span class="truncate text-[11.5px] font-medium ${
                        state === "completed" ? "text-ink-2 line-through decoration-line-strong" : "text-ink"
                      }">
                        ${zh ? task.titleZh : task.titleEn}
                      </span>
                      <span class="shrink-0 rounded-chip bg-field px-1 font-mono text-[9px] tabular-nums text-ink-3">
                        r${revision}
                      </span>
                    </div>
                    <div class="mt-0.5 flex items-center gap-2 text-[10px] text-ink-3">
                      ${assignee ? `<span class="font-mono">@${assignee.name}</span>` : ""}
                      ${task.dependsOn.length > 0 ? `<span class="font-mono">deps: ${task.dependsOn.join(", ")}</span>` : ""}
                      ${task.scopes
                        .map(
                          (s) => `
                        <span class="truncate font-mono rounded-chip bg-inset px-1 border border-line/60">
                          ${s}
                        </span>
                      `
                        )
                        .join("")}
                      ${blocked && state === "pending" ? `<span class="text-orange">${zh ? "被阻塞" : "blocked"}</span>` : ""}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${zh ? `${activeCount}/4 成员已激活 · 事件溯源名册` : `${activeCount}/4 members active · event-sourced roster`}
          </span>
          <span class="font-mono">Harness.AgentTeams</span>
        </div>
      </div>
    `;

    this.setHtml(html);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-agent-teams")) {
  customElements.define("nai-agent-teams", NaiAgentTeams);
}
