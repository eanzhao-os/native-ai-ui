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

    const html = `
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Root Coordinator -->
        <div class="coordinator flex items-center justify-between rounded-control border border-line bg-inset p-3">
          <div class="flex items-center gap-2.5">
            <div class="relative flex size-6 items-center justify-center rounded-full bg-accent text-white shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[12.5px] font-semibold text-ink">
                  ${zh ? "主协调器 (Coordinator)" : "Main Coordinator"}
                </span>
                <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[10px] text-accent-ink">
                  Claude 3.7
                </span>
              </div>
              <p class="text-[11px] text-ink-2">
                ${zh ? "正在调度 3 个并行子智能体工作" : "Orchestrating 3 parallel subagent workers"}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 font-mono text-[11px] text-ink-3">
            <span class="flex size-1.5 rounded-full bg-green animate-pulse"></span>
            <span>${zh ? "运行中" : "Active"}</span>
          </div>
        </div>

        <!-- Subagent Hierarchy -->
        <div class="relative mt-4 pl-6">
          <div class="absolute left-2.5 top-0 bottom-6 w-px bg-line-strong"></div>

          <div class="flex flex-col gap-3">
            ${SUBAGENTS.map((agent) => {
              const isExpanded = this._expandedId === agent.id;
              return `
                <div class="relative">
                  <div class="absolute -left-3.5 top-4.5 h-px w-3.5 bg-line-strong"></div>

                  <div
                    data-id="${agent.id}"
                    class="agent-card rounded-control border transition-all cursor-pointer ${
                      isExpanded
                        ? "border-line-strong bg-hover/40 shadow-sm"
                        : "border-line bg-surface hover:border-line-strong hover:bg-hover/20"
                    }"
                  >
                    <div class="flex items-center justify-between p-3">
                      <div class="flex items-center gap-2.5 min-w-0">
                        ${
                          agent.status === "completed"
                            ? `
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-green-tint text-green shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        `
                            : agent.status === "running"
                            ? `
                          <span class="relative flex size-4.5 items-center justify-center rounded-full bg-accent-tint text-accent-ink shrink-0">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.5"
                              class="animate-spin"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                          </span>
                        `
                            : agent.status === "waiting"
                            ? `
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-field text-ink-3 shrink-0">
                            <span class="size-1 rounded-full bg-ink-3"></span>
                          </span>
                        `
                            : `
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-red-tint text-red shrink-0">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </span>
                        `
                        }

                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5">
                            <span class="text-[12px] font-medium text-ink truncate">
                              ${zh ? agent.nameZh : agent.nameEn}
                            </span>
                            <span class="rounded-chip border border-line bg-inset px-1 font-mono text-[9.5px] text-ink-3">
                              ${agent.model}
                            </span>
                          </div>
                          <p class="text-[11px] text-ink-2 truncate max-w-[240px] mt-0.5">
                            ${zh ? agent.actionZh : agent.actionEn}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2 shrink-0 pl-2">
                        ${
                          agent.duration !== "—"
                            ? `
                          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
                            ${agent.duration}
                          </span>
                        `
                            : ""
                        }
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="text-ink-3 transition-transform ${isExpanded ? "rotate-180" : ""}"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    ${
                      isExpanded
                        ? `
                      <div class="border-t border-line/60 bg-inset/70 p-3 text-[11px]">
                        <div class="mb-2 flex items-center justify-between text-ink-3">
                          <span class="font-mono text-[10px] uppercase tracking-wider">
                            ${zh ? "执行追踪日志 (Trace)" : "Execution Trace"}
                          </span>
                          ${
                            agent.tokens !== "0"
                              ? `
                            <span class="font-mono text-[10px] tabular-nums">
                              ${agent.tokens} tokens
                            </span>
                          `
                              : ""
                          }
                        </div>
                        <div class="flex flex-col gap-1 font-mono text-[10.5px] text-ink-2">
                          ${(zh ? agent.logsZh : agent.logsEn)
                            .map(
                              (log) => `
                            <div class="flex items-start gap-1.5">
                              <span class="text-ink-3 select-none">›</span>
                              <span class="break-all">${log}</span>
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

    this.setHtml(html);

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
