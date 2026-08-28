import { NaiBaseElement } from "../core/base-element.js";

const TOTAL_ITEMS = 40;
const SLOTS = 4;
const SLOT_MEMBERS = ["w-01", "w-02", "w-03", "w-04"];
const TICK_MS = 420;
const HOLD_MS = 4200;

export class NaiWorkflowRun extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._done = 0;
  }

  onMount() {
    this._done = 0;
    this._scheduleTick();
  }

  onUnmount() {
    this._done = 0;
  }

  _scheduleTick() {
    if (this._done < TOTAL_ITEMS) {
      this.registerTimeout(() => {
        this._done = Math.min(TOTAL_ITEMS, this._done + SLOTS);
        this.render();
        this._scheduleTick();
      }, TICK_MS);
    } else {
      this.registerTimeout(() => {
        this._done = 0;
        this.render();
        this._scheduleTick();
      }, HOLD_MS);
    }
  }

  render() {
    const zh = this.isZh;
    const done = this._done;
    const running = done < TOTAL_ITEMS;
    const inFlight = running ? Math.min(SLOTS, TOTAL_ITEMS - done) : 0;
    const pct = Math.round((done / TOTAL_ITEMS) * 100);

    const extraCss = `
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .bg-accent-tint\\/25 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 25%, transparent); }
      .bg-green\\/80 { background-color: color-mix(in srgb, var(--green, #189a4d) 80%, transparent); }
      .bg-field\\/70 { background-color: color-mix(in srgb, var(--field, #f2f2f3) 70%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-5 { width: 20px; height: 20px; }
      .grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
      .aspect-square { aspect-ratio: 1 / 1; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        {/* Header */}
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${running ? "bg-accent animate-pulse" : "bg-green"}"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "工作流扇出执行" : "Workflow Fan-out"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              run/8f2e1a
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">${pct}%</span>
        </div>

        {/* Run meta */}
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-control border border-line bg-inset px-2.5 py-2 font-mono text-[10px] text-ink-3">
          <span class="truncate">
            digest <span class="text-ink-2">sha256:9b7c…e4f1</span>
          </span>
          <span>
            concurrency <span class="text-ink-2 tabular-nums">${SLOTS}</span>
          </span>
          <span>
            max agents <span class="text-ink-2 tabular-nums">32</span>
          </span>
          <span>
            max items <span class="text-ink-2 tabular-nums">256</span>
          </span>
        </div>

        {/* Concurrency slots */}
        <div class="mt-3 flex flex-col gap-1.5">
          ${SLOT_MEMBERS.map((member, i) => {
            const slotActive = i < inFlight;
            const itemIdx = done + i;
            return `
              <div
                class="slot-row flex items-center gap-2.5 rounded-control border px-2.5 py-1.5 transition-all duration-300 ${
                  slotActive ? "border-accent/40 bg-accent-tint/25" : "border-line bg-surface"
                }"
              >
                <span
                  class="flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[8.5px] font-semibold ${
                    slotActive ? "bg-accent text-white" : "bg-field text-ink-3"
                  }"
                >
                  ${member.slice(-2)}
                </span>
                <span class="font-mono text-[10.5px] text-ink-2">${member}</span>
                <div class="min-w-0 flex-1">
                  ${
                    slotActive
                      ? `
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-field">
                      <div
                        class="h-full rounded-full bg-accent transition-all duration-300"
                        style="width: ${((done % SLOTS) + 1) * 25}%;"
                      ></div>
                    </div>
                  `
                      : `
                    <div class="h-1.5 w-full rounded-full bg-field/70"></div>
                  `
                  }
                </div>
                <span class="w-16 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                  ${
                    slotActive
                      ? `item-${String(itemIdx + 1).padStart(2, "0")}`
                      : running
                      ? zh
                        ? "空闲"
                        : "idle"
                      : zh
                      ? "完成"
                      : "done"
                  }
                </span>
              </div>
            `;
          }).join("")}
        </div>

        {/* Item grid */}
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${zh ? "条目网格" : "Items"}
            </span>
            <span class="font-mono text-[10px] tabular-nums text-ink-3">
              ${done}/${TOTAL_ITEMS}
            </span>
          </div>
          <div class="grid grid-cols-10 gap-1">
            ${Array.from({ length: TOTAL_ITEMS }, (_, i) => {
              const isDone = i < done;
              const isActive = running && i >= done && i < done + inFlight;
              return `
                <span
                  class="item-tile aspect-square w-full rounded-[4px] transition-all duration-300 ${
                    isDone
                      ? "bg-green/80"
                      : isActive
                      ? "bg-accent animate-pulse"
                      : "bg-field border border-line/60"
                  }"
                  title="item-${i + 1}"
                ></span>
              `;
            }).join("")}
          </div>
        </div>

        {/* Footer */}
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${
              running
                ? zh
                  ? `${inFlight} 个成员并发处理中`
                  : `${inFlight} members in flight`
                : zh
                ? "全部条目处理完成"
                : "All items processed"
            }
          </span>
          <span class="font-mono">Harness.Workflow</span>
        </div>
      </div>
    `, extraCss);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-workflow-run")) {
  customElements.define("nai-workflow-run", NaiWorkflowRun);
}
