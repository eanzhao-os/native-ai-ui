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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pulse-accent {
          display: flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .team-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .task-counter {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .roster-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .member-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 10px;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .member-card.lead {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--inset, #f7f8f9);
        }
        .member-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .avatar {
          display: flex;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 600;
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }
        .avatar.lead {
          background: var(--ink, #1f2124);
          color: var(--surface, #fff);
        }
        .member-info {
          min-width: 0;
        }
        .name-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .member-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .model-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .member-role {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .phase-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-size: 10px;
          font-weight: 500;
          flex-shrink: 0;
        }
        .phase-badge.active {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .phase-badge.provisioning {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .phase-badge.failed {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .badge-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
        .badge-dot.active { background: var(--green, #189a4d); }
        .badge-dot.provisioning { background: var(--orange, #ef720c); animation: pulse 1.5s infinite; }
        .badge-dot.failed { background: var(--red, #e3474c); }
        .dag-section {
          margin-top: 16px;
        }
        .dag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          padding: 0 2px;
        }
        .dag-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .dag-meta {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .task-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 10px;
          transition: all 0.3s;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .task-item.in_progress {
          border-color: rgba(2, 133, 255, 0.4);
          background: var(--accent-tint, #e9f3ff);
        }
        .task-item.completed {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
          opacity: 0.75;
        }
        .task-icon {
          display: flex;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .task-icon.completed {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .task-icon.in_progress {
          background: var(--accent-tint, #e9f3ff);
        }
        .task-icon.pending {
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
        }
        .task-content {
          min-width: 0;
          flex: 1;
        }
        .task-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .task-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .task-title.completed {
          color: var(--ink-2, #62656b);
          text-decoration: line-through;
          text-decoration-color: var(--line-strong, #e0e2e5);
        }
        .rev-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }
        .task-meta-row {
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .assignee-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .deps-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .scope-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          border-radius: var(--radius-chip, 6px);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          border: 1px solid var(--line, #ecedef);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .blocked-tag {
          color: var(--orange, #ef720c);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-tech {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .spin {
          animation: spin 1.2s linear infinite;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="pulse-accent"></span>
            <h3 class="header-title">${zh ? "智能体团队" : "Agent Team"}</h3>
            <span class="team-tag">team/provider-migration</span>
          </div>
          <span class="task-counter">${doneCount}/${TASKS.length} ${zh ? "任务" : "tasks"}</span>
        </div>

        <!-- Roster -->
        <div class="roster-grid">
          ${MEMBERS.map((m) => {
            const phase = PHASE_SCRIPT[m.id][tick];
            const isLead = m.id === "lead";
            let phaseLabel = phase === "active" ? (zh ? "已激活" : "active") : phase === "provisioning" ? (zh ? "供给中" : "provisioning") : (zh ? "失败" : "failed");

            return `
              <div class="member-card ${isLead ? "lead" : ""}">
                <div class="member-left">
                  <span class="avatar ${isLead ? "lead" : ""}">${m.name.slice(0, 2)}</span>
                  <div class="member-info">
                    <div class="name-row">
                      <span class="member-name">${m.name}</span>
                      <span class="model-chip">${m.model}</span>
                    </div>
                    <span class="member-role">${zh ? m.roleZh : m.roleEn} · ${m.provider}</span>
                  </div>
                </div>
                <span class="phase-badge ${phase}">
                  <span class="badge-dot ${phase}"></span>
                  ${phaseLabel}
                </span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Shared task DAG -->
        <div class="dag-section">
          <div class="dag-header">
            <span class="dag-title">${zh ? "共享任务 DAG" : "Shared task DAG"}</span>
            <span class="dag-meta">CAS revisions</span>
          </div>

          <div class="tasks-list">
            ${TASKS.map((task, i) => {
              const state = TASK_SCRIPT[tick][i];
              const blocked = task.dependsOn.some((d) => {
                const di = TASKS.findIndex((t) => t.id === d);
                return TASK_SCRIPT[tick][di] !== "completed";
              });
              const assignee = memberById(task.assignee);
              const revision = 1 + TASK_SCRIPT.slice(0, tick + 1).filter((s) => s[i] !== TASK_SCRIPT[0][i]).length;

              let iconSvg = "";
              if (state === "completed") {
                iconSvg = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
              } else if (state === "in_progress") {
                iconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink, #0170dd)" stroke-width="2.6" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round"/></svg>`;
              }

              return `
                <div class="task-item ${state}">
                  <span class="task-icon ${state}">${iconSvg}</span>
                  <div class="task-content">
                    <div class="task-title-row">
                      <span class="task-title ${state === "completed" ? "completed" : ""}">${zh ? task.titleZh : task.titleEn}</span>
                      <span class="rev-chip">r${revision}</span>
                    </div>
                    <div class="task-meta-row">
                      ${assignee ? `<span class="assignee-tag">@${assignee.name}</span>` : ""}
                      ${task.dependsOn.length > 0 ? `<span class="deps-tag">⛓ ${task.dependsOn.join(", ")}</span>` : ""}
                      ${task.scopes.map((s) => `<span class="scope-tag">${s}</span>`).join("")}
                      ${blocked && state === "pending" ? `<span class="blocked-tag">${zh ? "被阻塞" : "blocked"}</span>` : ""}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${zh ? `${activeCount}/4 成员已激活 · 事件溯源名册` : `${activeCount}/4 members active · event-sourced roster`}</span>
          <span class="footer-tech">Harness.AgentTeams</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-agent-teams")) {
  customElements.define("nai-agent-teams", NaiAgentTeams);
}
