import { NaiBaseElement } from "../core/base-element.js";

const SUBAGENTS = [
  {
    id: "sub-1",
    nameEn: "Web Researcher",
    nameZh: "网络检索子 Agent",
    roleEn: "Information Retrieval",
    roleZh: "资料检索",
    model: "gemini-2.5-flash",
    status: "completed",
    duration: "1.8s",
    tokens: "1,420",
    actionEn: "Indexed 4 documentation pages & RFC specs",
    actionZh: "已解析 4 篇技术文档与 RFC 规范",
    logsEn: [
      "query: 'Next.js 16 server action streaming rfc'",
      "fetched: https://nextjs.org/docs/app/building-your-application",
      "extracted: 4 key code samples & contract definitions",
      "returned payload to coordinator",
    ],
    logsZh: [
      "查询: 'Next.js 16 server action streaming rfc'",
      "抓取: https://nextjs.org/docs/app/building-your-application",
      "提取: 4 段核心代码示例与契约定义",
      "已将检索工件返回至主协调器",
    ],
  },
  {
    id: "sub-2",
    nameEn: "Schema Architect",
    nameZh: "架构代码子 Agent",
    roleEn: "Code Generation",
    roleZh: "代码生成",
    model: "claude-3-7-sonnet",
    status: "running",
    duration: "3.4s",
    tokens: "3,890",
    actionEn: "Synthesizing Prisma schema with relational indexes...",
    actionZh: "正在合成带有关系索引的 Prisma 数据模型...",
    logsEn: [
      "analyzed entities: User, Workspace, SubagentSession",
      "drafted models & enum definitions",
      "invoking tool: write_file('prisma/schema.prisma')",
    ],
    logsZh: [
      "分析实体关系: User, Workspace, SubagentSession",
      "起草数据表与枚举类型定义",
      "调用工具: write_file('prisma/schema.prisma')",
    ],
  },
  {
    id: "sub-3",
    nameEn: "Security Linter",
    nameZh: "安全审计子 Agent",
    roleEn: "Vulnerability Audit",
    roleZh: "漏洞审计",
    model: "claude-3-5-haiku",
    status: "waiting",
    duration: "—",
    tokens: "0",
    actionEn: "Waiting for schema file generation...",
    actionZh: "等待数据架构文件生成完成...",
    logsEn: ["queued: will scan for SQL injection & unindexed foreign keys"],
    logsZh: ["已入队: 将扫描 SQL 注入风险与未索引的外键"],
  },
];

export class NaiSubagentTree extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._expandedId = "sub-2";
  }

  toggleExpand(id) {
    this._expandedId = this._expandedId === id ? null : id;
    this.render();
  }

  render() {
    const zh = this.isZh;

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
        .coordinator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .coord-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .coord-icon {
          position: relative;
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          color: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .coord-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coord-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .coord-model {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--accent-ink, #0170dd);
        }
        .coord-desc {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .coord-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .pulse-dot {
          display: flex;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green, #189a4d);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .tree-body {
          position: relative;
          margin-top: 16px;
          padding-left: 24px;
        }
        .tree-line-v {
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 24px;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
        }
        .agent-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .agent-wrapper {
          position: relative;
        }
        .tree-line-h {
          position: absolute;
          left: -14px;
          top: 18px;
          height: 1px;
          width: 14px;
          background: var(--line-strong, #e0e2e5);
        }
        .agent-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .agent-card:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .agent-card.expanded {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .agent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
        }
        .agent-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .status-icon {
          display: flex;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .status-completed {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .status-running {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .status-waiting {
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
        .status-failed {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .agent-info {
          min-width: 0;
        }
        .agent-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .agent-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agent-model-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .agent-action {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 240px;
        }
        .agent-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding-left: 8px;
        }
        .agent-duration {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .chevron {
          color: var(--ink-3, #9a9da3);
          transition: transform 0.2s ease;
        }
        .chevron.expanded {
          transform: rotate(180deg);
        }
        .trace-box {
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
          font-size: 11px;
        }
        .trace-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--ink-3, #9a9da3);
          margin-bottom: 8px;
        }
        .trace-title {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .trace-tokens {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
        }
        .trace-logs {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .trace-log-line {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .trace-prompt {
          color: var(--ink-3, #9a9da3);
          user-select: none;
        }
        .trace-log-text {
          word-break: break-all;
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
      </style>

      <div class="container">
        <!-- Root Coordinator -->
        <div class="coordinator">
          <div class="coord-left">
            <div class="coord-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div class="coord-title-row">
                <span class="coord-title">${zh ? "主协调器 (Coordinator)" : "Main Coordinator"}</span>
                <span class="coord-model">Claude 3.7</span>
              </div>
              <p class="coord-desc">${zh ? "正在调度 3 个并行子智能体工作" : "Orchestrating 3 parallel subagent workers"}</p>
            </div>
          </div>
          <div class="coord-status">
            <span class="pulse-dot"></span>
            <span>${zh ? "运行中" : "Active"}</span>
          </div>
        </div>

        <!-- Subagent Hierarchy -->
        <div class="tree-body">
          <div class="tree-line-v"></div>
          <div class="agent-list">
            ${SUBAGENTS.map((agent) => {
              const isExpanded = this._expandedId === agent.id;
              let statusIconSvg = "";
              let statusClass = `status-${agent.status}`;

              if (agent.status === "completed") {
                statusIconSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
              } else if (agent.status === "running") {
                statusIconSvg = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
              } else if (agent.status === "waiting") {
                statusIconSvg = `<span style="width: 4px; height: 4px; border-radius: 50%; background: var(--ink-3, #9a9da3);"></span>`;
              } else if (agent.status === "failed") {
                statusIconSvg = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;
              }

              const logs = zh ? agent.logsZh : agent.logsEn;

              return `
                <div class="agent-wrapper">
                  <div class="tree-line-h"></div>
                  <div class="agent-card ${isExpanded ? "expanded" : ""}" data-id="${agent.id}">
                    <div class="agent-header">
                      <div class="agent-left">
                        <span class="status-icon ${statusClass}">${statusIconSvg}</span>
                        <div class="agent-info">
                          <div class="agent-name-row">
                            <span class="agent-name">${zh ? agent.nameZh : agent.nameEn}</span>
                            <span class="agent-model-chip">${agent.model}</span>
                          </div>
                          <p class="agent-action">${zh ? agent.actionZh : agent.actionEn}</p>
                        </div>
                      </div>
                      <div class="agent-right">
                        ${agent.duration !== "—" ? `<span class="agent-duration">${agent.duration}</span>` : ""}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron ${isExpanded ? "expanded" : ""}">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>

                    ${
                      isExpanded
                        ? `
                      <div class="trace-box">
                        <div class="trace-header">
                          <span class="trace-title">${zh ? "执行追踪日志 (Trace)" : "Execution Trace"}</span>
                          ${agent.tokens !== "0" ? `<span class="trace-tokens">${agent.tokens} tokens</span>` : ""}
                        </div>
                        <div class="trace-logs">
                          ${logs
                            .map(
                              (log) => `
                            <div class="trace-log-line">
                              <span class="trace-prompt">›</span>
                              <span class="trace-log-text">${log}</span>
                            </div>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    `
                        : ""
                    }
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".agent-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        if (id) this.toggleExpand(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-subagent-tree")) {
  customElements.define("nai-subagent-tree", NaiSubagentTree);
}
