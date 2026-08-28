import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_MEMORIES = [
  {
    id: "mem-1",
    category: "preference",
    textEn: "Prefers functional React 19 components with Tailwind v4 and CSS variables.",
    textZh: "偏好使用 React 19 函数式组件、Tailwind v4 及原生 CSS 变量设计系统。",
    confidence: 98,
    updatedAtEn: "2h ago",
    updatedAtZh: "2小时前",
    pinned: true,
  },
  {
    id: "mem-2",
    category: "rule",
    textEn: "Never print raw database connection strings or JWT secret keys to logs.",
    textZh: "严禁在控制台或日志中打印未经脱敏的数据库连接串或 JWT 密钥。",
    confidence: 99,
    updatedAtEn: "Yesterday",
    updatedAtZh: "昨天",
    pinned: true,
  },
  {
    id: "mem-3",
    category: "preference",
    textEn: "Favors hairline elevation borders (1px) over saturated drop shadows.",
    textZh: "倾向使用 1px 发丝边框质感替代浓重饱和的投影阴影（Kumo 极简风）。",
    confidence: 94,
    updatedAtEn: "3d ago",
    updatedAtZh: "3天前",
  },
  {
    id: "mem-4",
    category: "fact",
    textEn: "Project uses Turborepo monorepo structure with apps/web and packages/ui.",
    textZh: "项目采用 Turborepo Monorepo 架构，核心源码位于 apps/web 与 packages/ui。",
    confidence: 88,
    updatedAtEn: "5d ago",
    updatedAtZh: "5天前",
  },
];

export class NaiMemoryInspector extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._memories = JSON.parse(JSON.stringify(INITIAL_MEMORIES));
    this._filter = "all";
    this._query = "";
  }

  setFilter(tab) {
    this._filter = tab;
    this.render();
  }

  setQuery(q) {
    this._query = q;
    this.render();
  }

  handleDelete(id) {
    this._memories = this._memories.filter((m) => m.id !== id);
    this.render();
  }

  handleTogglePin(id) {
    this._memories = this._memories.map((m) =>
      m.id === id ? { ...m, pinned: !m.pinned } : m
    );
    this.render();
  }

  handleAddFact() {
    this._memories = [
      {
        id: `mem-${Date.now()}`,
        category: "preference",
        textEn: "Always provide TypeScript types for tool parameters.",
        textZh: "始终为 Tool 参数提供完整的 TypeScript 类型注解与 Zod 校验。",
        confidence: 100,
        updatedAtEn: "Just now",
        updatedAtZh: "刚刚",
      },
      ...this._memories,
    ];
    this.render();
  }

  render() {
    const zh = this.isZh;
    const filter = this._filter;
    const query = this._query;
    const memories = this._memories;

    const filtered = memories.filter((m) => {
      if (filter !== "all" && m.category !== filter) return false;
      const text = zh ? m.textZh : m.textEn;
      if (query && !text.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

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
        .icon-bulb {
          display: flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .toolbar {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .tabs {
          display: flex;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          font-size: 11px;
        }
        .tab-btn {
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          padding: 2px 8px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }
        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }
        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }
        .search-input {
          width: 144px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-family: inherit;
          font-size: 11px;
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          transition: border-color 0.12s, background-color 0.12s;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
        }
        .memories-list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .memory-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
          transition: border-color 0.15s, background-color 0.15s;
        }
        .memory-card:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .card-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .card-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .cat-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .cat-preference {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .cat-rule {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .cat-fact {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .pin-tag {
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .conf-meta {
          margin-left: auto;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .memory-text {
          margin: 0;
          font-size: 12px;
          line-height: 1.4;
          color: var(--ink, #1f2124);
        }
        .actions-col {
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .memory-card:hover .actions-col {
          opacity: 1;
        }
        .icon-action-btn {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }
        .icon-action-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .icon-action-btn.pinned {
          color: var(--accent-ink, #0170dd);
        }
        .icon-action-btn.delete:hover {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .empty-box {
          border-radius: var(--radius-control, 8px);
          border: 1px dashed var(--line, #ecedef);
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
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
        .btn-add-fact {
          border: none;
          background: transparent;
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
          cursor: pointer;
        }
        .btn-add-fact:hover {
          text-decoration: underline;
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-bulb">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M9 21h6" />
              </svg>
            </span>
            <h3 class="header-title">${zh ? "智能体长期记忆看板" : "Agent Long-Term Memory"}</h3>
          </div>
          <span class="header-count">
            ${memories.length} ${zh ? "条已存记忆" : memories.length === 1 ? "stored fact" : "stored facts"}
          </span>
        </div>

        <!-- Filter Tabs & Search -->
        <div class="toolbar">
          <div class="tabs">
            ${["all", "preference", "rule", "fact"]
              .map((tab) => {
                const isActive = filter === tab;
                let tabLabel = "";
                if (tab === "all") tabLabel = zh ? "全部" : "All";
                else if (tab === "preference") tabLabel = zh ? "偏好" : "Prefs";
                else if (tab === "rule") tabLabel = zh ? "规范" : "Rules";
                else if (tab === "fact") tabLabel = zh ? "事实" : "Facts";

                return `
                  <button
                    type="button"
                    class="tab-btn ${isActive ? "active" : ""}"
                    data-tab="${tab}"
                  >
                    ${tabLabel}
                  </button>
                `;
              })
              .join("")}
          </div>

          <div>
            <input
              type="text"
              class="search-input"
              placeholder="${zh ? "搜索记忆..." : "Search memory..."}"
              value="${query}"
            />
          </div>
        </div>

        <!-- Memories List -->
        <div class="memories-list">
          ${
            filtered.length === 0
              ? `
            <div class="empty-box">
              ${zh ? "当前筛选条件下无记忆项。" : "No memories match the current filter."}
            </div>
          `
              : filtered
                  .map((item) => {
                    let catLabel = "";
                    if (item.category === "preference") catLabel = zh ? "偏好" : "preference";
                    else if (item.category === "rule") catLabel = zh ? "规范" : "rule";
                    else catLabel = zh ? "事实" : "fact";

                    return `
                  <div class="memory-card">
                    <div class="card-content">
                      <div class="card-meta-row">
                        <span class="cat-chip cat-${item.category}">
                          ${catLabel}
                        </span>
                        ${
                          item.pinned
                            ? `
                          <span class="pin-tag">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 3a1 1 0 0 1 .71.29l4 4A1 1 0 0 1 21 9l-6.5 6.5-.5 4.5a1 1 0 0 1-1.7.7L9 17.4 4.7 21.7a1 1 0 0 1-1.4-1.4L7.6 16l-3.3-3.3a1 1 0 0 1 .7-1.7l4.5-.5L15 4a1 1 0 0 1 1-1z" />
                            </svg>
                            ${zh ? "已置顶" : "Pinned"}
                          </span>
                        `
                            : ""
                        }
                        <span class="conf-meta">
                          ${item.confidence}% ${zh ? "置信" : "conf"} • ${zh ? item.updatedAtZh : item.updatedAtEn}
                        </span>
                      </div>
                      <p class="memory-text">${zh ? item.textZh : item.textEn}</p>
                    </div>

                    <div class="actions-col">
                      <button
                        type="button"
                        class="icon-action-btn pin ${item.pinned ? "pinned" : ""}"
                        data-id="${item.id}"
                        title="${item.pinned ? (zh ? "取消置顶" : "Unpin") : zh ? "置顶到 Prompt" : "Pin to prompt"}"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="17" x2="12" y2="22" />
                          <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="icon-action-btn delete"
                        data-id="${item.id}"
                        title="${zh ? "遗忘此记忆" : "Forget this memory"}"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                `;
                  })
                  .join("")
          }
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${zh ? "已在当前 Agent 会话中实时同步" : "Synced across current agent sessions"}</span>
          <button type="button" class="btn-add-fact" id="btn-add-fact">
            ${zh ? "+ 添加事实" : "+ Add Fact"}
          </button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        if (tab) this.setFilter(tab);
      });
    });

    const searchInput = this.shadowRoot.querySelector(".search-input");
    searchInput?.addEventListener("input", (e) => {
      this.setQuery(e.target.value);
    });

    this.shadowRoot.querySelectorAll(".icon-action-btn.pin").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.handleTogglePin(id);
      });
    });

    this.shadowRoot.querySelectorAll(".icon-action-btn.delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id) this.handleDelete(id);
      });
    });

    this.shadowRoot.querySelector("#btn-add-fact")?.addEventListener("click", () => {
      this.handleAddFact();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-memory-inspector")) {
  customElements.define("nai-memory-inspector", NaiMemoryInspector);
}
