import { NaiBaseElement } from "../core/base-element.js";

/* ─────────────────────────────────────────────────────────
 * SESSION LIST — agent session roster (vanilla custom element)
 * Live pulse dot, activity badges, gliding hover highlight.
 * ───────────────────────────────────────────────────────── */

const SESSIONS = [
  { id: "s1", titleEn: "Refactor the churn scheduler", titleZh: "重构搅拌排期器", short: "01a0492d", live: true },
  { id: "s2", titleEn: "Audit supplier import jobs", titleZh: "审计供应商导入任务", short: "01a04771", live: true },
  { id: "s3", titleEn: "Draft the summer menu copy", titleZh: "起草夏季菜单文案", short: "01a03fe0", live: false },
  { id: "s4", titleEn: "Investigate freezer telemetry gaps", titleZh: "排查冷冻遥测数据缺口", short: "01a02b9c", live: false },
];

const TICK_MS = 2600;

export class NaiSessionList extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "visual-case"];
  }

  constructor() {
    super();
    this._active = "s1";
    this._hovered = null;
    this._badges = { s1: 2, s2: 1 };
    this._tick = 0;
  }

  onMount() {
    if (this.getAttribute("visual-case") === "selected") {
      this._active = "s2";
      this._badges = { s1: 2, s2: 0 };
    }
    this._scheduleTick();
  }

  _scheduleTick() {
    this.registerTimeout(() => {
      this._tick = (this._tick + 1) % SESSIONS.length;
      const target = SESSIONS[this._tick];
      if (target.live) {
        this._badges[target.id] = (this._badges[target.id] ?? 0) + 1;
      }
      this.render();
      if (this._mounted) this._scheduleTick();
    }, TICK_MS);
  }

  _moveGlide() {
    const glide = this.shadowRoot?.querySelector(".nav-glide");
    const list = this.shadowRoot?.querySelector(".roster");
    const target = this.shadowRoot?.querySelector(`[data-id="${this._hovered ?? this._active}"]`);
    if (!glide || !list) return;
    if (!target) {
      glide.style.opacity = "0";
      return;
    }
    const listRect = list.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    glide.style.top = `${targetRect.top - listRect.top}px`;
    glide.style.height = `${targetRect.height}px`;
    glide.style.opacity = "1";
  }

  _syncHighlightedRows() {
    const highlighted = this._hovered ?? this._active;
    this.shadowRoot?.querySelectorAll(".row").forEach((row) => {
      row.dataset.active = String(row.getAttribute("data-id") === highlighted);
    });
    this._moveGlide();
  }

  render() {
    const zh = this.isZh;
    const openCount = SESSIONS.filter((s) => s.live).length;
    const highlighted = this._hovered ?? this._active;

    this.setHtml(`
      <div class="w-64 rounded-card bg-surface p-2 shadow-raised">
        <div class="flex items-center justify-between px-2 pb-1 pt-1">
          <span class="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">${zh ? "会话" : "Sessions"}</span>
          <span class="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-tint px-1 text-[10px] font-semibold tabular-nums text-accent-ink">${openCount}</span>
        </div>
        <div class="roster relative flex flex-col gap-px">
          <span aria-hidden="true" class="nav-glide pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
            style="opacity: 0; transition: top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease;"></span>
          ${SESSIONS.map((session) => {
            const isActive = session.id === this._active;
            const badge = this._badges[session.id] ?? 0;
            return `
              <button type="button" data-id="${session.id}" data-active="${highlighted === session.id}"
                class="row relative z-10 flex w-full flex-col gap-0.5 rounded-[7px] px-2 py-1.5 text-left transition-transform duration-150 active:scale-[0.98]"
                ${isActive ? 'aria-current="page"' : ""}>
                <span class="flex min-w-0 items-center gap-1.5">
                  ${session.live ? '<span class="size-1.5 shrink-0 animate-pulse rounded-full bg-green"></span>' : ""}
                  <span class="min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${isActive ? "font-medium text-ink" : "text-ink-2"}">
                    ${zh ? session.titleZh : session.titleEn}
                  </span>
                  ${badge > 0 ? `
                    <span aria-label="${zh ? `${badge} 条未读事件` : `${badge} unread event${badge === 1 ? "" : "s"}`}"
                      class="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${isActive ? "bg-surface text-ink-2 shadow-hairline" : "bg-accent-tint text-accent-ink"}"
                      style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;">${badge}</span>
                  ` : ""}
                </span>
                <span class="truncate pl-3 font-mono text-[10.5px] text-ink-3">
                  ${session.short}${session.live ? "" : ` · ${zh ? "空闲" : "idle"}`}
                </span>
              </button>
            `;
          }).join("")}
        </div>
        <div class="mt-1 border-t border-line px-2 pb-1 pt-1.5 text-[11px] text-ink-3">
          ${zh ? "活动会话实时推送" : "Live sessions stream in real time"}
        </div>
      </div>
    `);

    this.shadowRoot?.querySelectorAll(".row").forEach((row) => {
      const id = row.getAttribute("data-id");
      row.addEventListener("mouseenter", () => {
        this._hovered = id;
        this._syncHighlightedRows();
      });
      row.addEventListener("mouseleave", () => {
        this._hovered = null;
        this._syncHighlightedRows();
      });
      row.addEventListener("focus", () => {
        this._hovered = id;
        this._syncHighlightedRows();
      });
      row.addEventListener("blur", () => {
        this._hovered = null;
        this._syncHighlightedRows();
      });
      row.addEventListener("click", () => {
        this._active = id;
        this._badges[id] = 0;
        this.render();
      });
    });
    this._moveGlide();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-session-list")) {
  customElements.define("nai-session-list", NaiSessionList);
}
