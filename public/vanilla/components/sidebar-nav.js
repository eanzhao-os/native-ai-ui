import { NaiBaseElement } from "../core/base-element.js";

const ITEMS = [
  { key: "activity", labelEn: "Home", labelZh: "首页", section: "Workspace" },
  { key: "tasks", labelEn: "Agent tasks", labelZh: "智能体任务", section: "Workspace", count: true },
  { key: "dashboard", labelEn: "Inbox", labelZh: "收件箱", section: "Workspace" },
  { key: "spaces", labelEn: "Suppliers", labelZh: "供应商", section: "Objects", plus: true },
  { key: "analytics", labelEn: "Inventory", labelZh: "库存", section: "Objects" },
];

function getNavIcon(kind) {
  const map = {
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2" />',
    tasks: '<path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />',
    spaces: '<path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />',
    analytics: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />',
  };
  return `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      ${map[kind] || ""}
    </svg>
  `;
}

export class NaiSidebarNav extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._active = "tasks";
    this._hovered = null;
    this._query = "";
    this._badge = 4;
  }

  setActive(key) {
    this._active = key;
    this.render();
  }

  setHovered(key) {
    this._hovered = key;
    this._updateIndicator();
  }

  addNewTask() {
    this._badge++;
    this._active = "tasks";
    this.render();
  }

  onMount() {
    this._updateIndicator();
  }

  _updateIndicator() {
    const targetKey = this._hovered || this._active;
    const targetBtn = this.shadowRoot?.querySelector(`[data-key="${targetKey}"]`);
    const indicator = this.shadowRoot?.querySelector("#nav-indicator");
    const container = this.shadowRoot?.querySelector("#nav-list-container");

    if (targetBtn && indicator && container) {
      const cRect = container.getBoundingClientRect();
      const bRect = targetBtn.getBoundingClientRect();
      indicator.style.top = `${bRect.top - cRect.top}px`;
      indicator.style.height = `${bRect.height}px`;
      indicator.style.opacity = "1";
    } else if (indicator) {
      indicator.style.opacity = "0";
    }
  }

  render() {
    const zh = this.isZh;
    const active = this._active;
    const badge = this._badge;

    const sections = [
      { key: "Workspace", label: zh ? "工作区" : "Workspace" },
      { key: "Objects", label: zh ? "对象" : "Objects" },
    ];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 240px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 8px;
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          user-select: none;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .workspace-btn {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 6px;
          text-align: left;
          cursor: pointer;
          margin-bottom: 8px;
          transition: background-color 0.1s, transform 0.1s;
        }

        .workspace-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .workspace-avatar {
          display: flex;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--ink, #1f2124);
          color: var(--surface, #fff);
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .workspace-info {
          min-width: 0;
          flex: 1;
        }

        .ws-title {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
        }

        .ws-sub {
          display: block;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
          margin-top: 2px;
        }

        .search-box {
          display: flex;
          height: 32px;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          padding: 0 10px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-bottom: 6px;
        }

        .search-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .kbd-chip {
          display: flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: var(--surface, #fff);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        .btn-new-task {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 6px 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
          cursor: pointer;
          margin-bottom: 8px;
          transition: background-color 0.1s;
        }

        .btn-new-task:hover {
          background: var(--accent-tint, #e9f3ff);
        }

        .plus-dot {
          display: flex;
          width: 16px;
          height: 16px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .nav-list-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-indicator {
          position: absolute;
          left: 0;
          right: 0;
          border-radius: 7px;
          background: var(--hover, #f4f5f6);
          pointer-events: none;
          transition: top 220ms cubic-bezier(0.23, 1, 0.32, 1), height 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease;
          opacity: 0;
        }

        .section-header {
          padding: 4px 8px;
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-3, #9a9da3);
        }

        .nav-item-btn {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 8px;
          border-radius: 7px;
          border: none;
          background: transparent;
          padding: 6px 8px;
          text-align: left;
          cursor: pointer;
          transition: color 0.15s;
        }

        .nav-item-btn .item-icon {
          color: var(--ink-3, #9a9da3);
          display: flex;
        }

        .nav-item-btn.active .item-icon {
          color: var(--ink, #1f2124);
        }

        .nav-item-btn .item-label {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: var(--ink-2, #62656b);
        }

        .nav-item-btn.active .item-label {
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .count-badge {
          display: flex;
          height: 18px;
          min-width: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 0 4px;
          font-size: 10.5px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .nav-item-btn.active .count-badge {
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .plus-action-btn {
          display: flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          color: var(--ink-3, #9a9da3);
          opacity: 0;
          transition: opacity 0.1s, background-color 0.1s;
        }

        .nav-item-btn:hover .plus-action-btn {
          opacity: 1;
        }

        .plus-action-btn:hover {
          background: color-mix(in srgb, var(--line, #ecedef) 70%, transparent);
          color: var(--ink-2, #62656b);
        }
      </style>

      <button type="button" class="workspace-btn">
        <span class="workspace-avatar">C</span>
        <div class="workspace-info">
          <span class="ws-title">Creamery Ops</span>
          <span class="ws-sub">${zh ? "生产工作区" : "Production Workspace"}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2">
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
        </svg>
      </button>

      <div class="search-box">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input class="search-input" placeholder="${zh ? "快速搜索" : "Quick search"}" value="${this._query}" />
        <kbd class="kbd-chip">/</kbd>
      </div>

      <button type="button" class="btn-new-task" id="btn-new-task">
        <span>${zh ? "新建任务" : "New task"}</span>
        <span class="plus-dot">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div class="nav-list-container" id="nav-list-container">
        <span class="nav-indicator" id="nav-indicator"></span>

        ${sections
          .map(
            (sec) => `
          <div>
            <div class="section-header">${sec.label}</div>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              ${ITEMS.filter((item) => item.section === sec.key)
                .map((item) => {
                  const isActive = item.key === active;
                  return `
                  <button
                    type="button"
                    class="nav-item-btn ${isActive ? "active" : ""}"
                    data-key="${item.key}"
                  >
                    <span class="item-icon">${getNavIcon(item.key)}</span>
                    <span class="item-label">${zh ? item.labelZh : item.labelEn}</span>
                    ${item.count ? `<span class="count-badge">${badge}</span>` : ""}
                    ${
                      item.plus
                        ? `<span class="plus-action-btn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></span>`
                        : ""
                    }
                  </button>
                `;
                })
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.shadowRoot.querySelector("#btn-new-task")?.addEventListener("click", () => this.addNewTask());

    this.shadowRoot.querySelectorAll(".nav-item-btn").forEach((btn) => {
      const key = btn.getAttribute("data-key");
      btn.addEventListener("mouseenter", () => this.setHovered(key));
      btn.addEventListener("click", () => {
        if (key) this.setActive(key);
      });
    });

    this.shadowRoot.querySelector("#nav-list-container")?.addEventListener("mouseleave", () => {
      this.setHovered(null);
    });

    const searchInput = this.shadowRoot.querySelector(".search-input");
    searchInput?.addEventListener("input", (e) => {
      this._query = e.target.value;
    });

    this._updateIndicator();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sidebar-nav")) {
  customElements.define("nai-sidebar-nav", NaiSidebarNav);
}
