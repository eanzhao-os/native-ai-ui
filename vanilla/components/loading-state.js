import { NaiBaseElement } from "../core/base-element.js";

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3), c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

const PATTERNS = {
  Drive: { delays: chevron, dur: 650, round: false },
  Dots: { delays: chevron, dur: 650, round: true },
  Orbit: { delays: orbit, dur: 950, round: false },
};

export class NaiLoadingState extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "label", "lang"];
  }

  constructor() {
    super();
    this._ds = 0;
  }

  get variant() {
    return this.getAttribute("variant") || "Drive";
  }

  get label() {
    return this.getAttribute("label") || "Churning";
  }

  onMount() {
    this._ds = 0;
    this.registerInterval(() => {
      this._ds++;
      this._updateTimerDisplay();
    }, 100);
  }

  _formatElapsed() {
    const total = this._ds / 10;
    if (total < 60) return `${total.toFixed(1)}s`;
    return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
  }

  _updateTimerDisplay() {
    const timerEl = this.shadowRoot?.querySelector(".elapsed-timer");
    if (timerEl) {
      timerEl.textContent = this._formatElapsed();
    }
  }

  render() {
    const zh = this.isZh;
    const rawLabel = this.label;
    const displayLabel = zh && rawLabel === "Churning" ? "搅拌中" : rawLabel;
    const { delays, dur, round } = PATTERNS[this.variant] ?? PATTERNS.Drive;

    this.setHtml(`
      <div class="flex w-fit items-center gap-2.5">
        <span aria-hidden="true" class="pixel-grid grid" style="grid-template-columns: repeat(3, 4px); gap: 1.5px;">
          ${delays
            .map(
              (d) => `
            <span
              class="pixel size-1 bg-ink ${round ? "rounded-full" : "rounded-[1px]"}"
              style="
                opacity: ${d === null ? "0.07" : "0.15"};
                animation: ${d === null ? "none" : `pixel-on ${dur}ms ease-in-out ${d}ms infinite`};
              "
            ></span>
          `
            )
            .join("")}
        </span>
        <span
          class="label text-[13px] font-medium text-transparent"
          style="
            background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shimmer-text 1.4s linear infinite;
          "
        >${displayLabel}</span>
        <span class="elapsed-timer font-mono text-[12px] text-ink-3 tabular-nums">${this._formatElapsed()}</span>
      </div>
    `);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-loading-state")) {
  customElements.define("nai-loading-state", NaiLoadingState);
}
