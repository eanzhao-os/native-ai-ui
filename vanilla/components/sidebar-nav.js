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
    tasks: '<g><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></g>',
    spaces: '<g><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>',
    dashboard: '<g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>',
    analytics: '<g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>',
  };
  return `
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
    const query = this._query;

    const sections = [
      { key: "Workspace", label: zh ? "工作区" : "Workspace" },
      { key: "Objects", label: zh ? "对象" : "Objects" },
    ];

    this.setHtml(`
      <div class="w-60 rounded-card bg-surface p-2 shadow-raised">
        {/* workspace row */}
        <button
          type="button"
          class="mb-2 flex w-full items-center gap-2.5 rounded-control p-1.5 text-left transition-[background-color,transform] duration-100 hover:bg-hover active:scale-[0.96] cursor-pointer"
        >
          <span class="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-ink text-[13px] font-semibold text-surface">
            C
          </span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-[13px] font-medium leading-tight text-ink">Creamery Ops</span>
            <span class="block truncate text-[11px] leading-tight text-ink-3">${zh ? "生产工作区" : "Production Workspace"}</span>
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
          </svg>
        </button>

        {/* quick search */}
        <label class="mb-1 flex h-8 items-center gap-2 rounded-control bg-inset px-2.5 shadow-hairline">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            id="sidebar-search-input"
            value="${query}"
            placeholder="${zh ? "快速搜索" : "Quick search"}"
            class="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-3"
          />
          <kbd class="flex size-4.5 items-center justify-center rounded-[5px] bg-surface text-[10px] text-ink-3 shadow-hairline font-mono">
            /
          </kbd>
        </label>

        {/* accent action */}
        <button
          type="button"
          id="btn-new-task"
          class="mb-2 flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-[13px] font-medium text-accent-ink transition-[background-color,transform] duration-100 hover:bg-accent-tint active:scale-[0.96] cursor-pointer"
        >
          <span class="min-w-0 flex-1 truncate text-left">${zh ? "新建任务" : "New task"}</span>
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>

        {/* items */}
        <div
          id="nav-list-container"
          class="relative flex flex-col gap-2"
        >
          <span
            id="nav-indicator"
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
            style="
              top: 0px;
              height: 0px;
              opacity: 0;
              transition: top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease;
            "
          ></span>

          ${sections
            .map(
              (section) => `
            <div>
              <div class="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">
                ${section.label}
              </div>
              <div class="flex flex-col gap-px">
                ${ITEMS.filter((item) => item.section === section.key)
                  .map((item) => {
                    const isActive = item.key === active;
                    return `
                    <button
                      type="button"
                      data-key="${item.key}"
                      aria-current="${isActive ? "page" : "false"}"
                      class="group relative z-10 flex w-full items-center gap-2 rounded-[7px] px-2 py-1.5 text-left transition-[color,transform] duration-150 active:scale-[0.96] cursor-pointer"
                    >
                      <span class="${isActive ? "text-ink" : "text-ink-3"}">
                        ${getNavIcon(item.key)}
                      </span>
                      <span
                        class="min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${
                          isActive ? "font-medium text-ink" : "text-ink-2"
                        }"
                      >
                        ${zh ? item.labelZh : item.labelEn}
                      </span>
                      ${
                        item.count
                          ? `
                        <span
                          class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums ${
                            isActive ? "bg-surface text-ink-2 shadow-hairline" : "bg-accent-tint text-accent-ink"
                          }"
                          style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
                        >
                          ${badge}
                        </span>
                      `
                          : ""
                      }
                      ${
                        item.plus
                          ? `
                        <span
                          class="flex size-4.5 items-center justify-center rounded-[5px] text-ink-3 opacity-0 transition-[background-color,color,opacity] duration-100 group-hover:opacity-100 hover:bg-line/70 hover:text-ink-2 ${
                            isActive ? "opacity-100" : ""
                          }"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      `
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
      </div>
    `);

    this.shadowRoot?.querySelector("#btn-new-task")?.addEventListener("click", () => this.addNewTask());

    this.shadowRoot?.querySelectorAll("[data-key]").forEach((btn) => {
      const key = btn.getAttribute("data-key");
      btn.addEventListener("mouseenter", () => this.setHovered(key));
      btn.addEventListener("click", () => {
        if (key) this.setActive(key);
      });
    });

    this.shadowRoot?.querySelector("#nav-list-container")?.addEventListener("mouseleave", () => {
      this.setHovered(null);
    });

    const searchInput = this.shadowRoot?.querySelector("#sidebar-search-input");
    searchInput?.addEventListener("input", (e) => {
      this._query = e.target.value;
    });

    this._updateIndicator();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sidebar-nav")) {
  customElements.define("nai-sidebar-nav", NaiSidebarNav);
}
