import { NaiBaseElement } from "../core/base-element.js";

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3);
  const c = i % 3;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export class NaiLoadingState extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "label", "lang"];
  }

  constructor() {
    super();
    this._ds = 0;
    this._timerElement = null;
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
      this._ds += 1;
      this._updateTimerDisplay();
    }, 100);
  }

  _formatElapsed() {
    const total = this._ds / 10;
    if (total < 60) return `${total.toFixed(1)}s`;
    return `${Math.floor(total / 60)}m ${(total % 60).toFixed(1)}s`;
  }

  _updateTimerDisplay() {
    if (this._timerElement?.isConnected) {
      this._timerElement.textContent = this._formatElapsed();
    }
  }

  render() {
    const rawLabel = this.label;
    const displayLabel = this.isZh && rawLabel === "Churning" ? "搅拌中" : rawLabel;
    const { delays, dur, round } = PATTERNS[this.variant] ?? PATTERNS.Drive;

    this.setHtml(`
      <div class="flex w-fit items-center gap-2.5">
        <span aria-hidden="true" class="pixel-grid grid grid-cols-[repeat(3,4px)] gap-[1.5px]">
          ${delays
            .map(
              (delay) => `<span class="size-[4px] bg-ink ${round ? "rounded-full" : "rounded-[1px]"}" style="opacity: ${delay === null ? 0.07 : 0.15}; animation: ${delay === null ? "none" : `pixel-on ${dur}ms ease-in-out ${delay}ms infinite`};"></span>`,
            )
            .join("")}
        </span>
        <span class="bg-clip-text text-[13px] font-medium text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${escapeHtml(displayLabel)}</span>
        <span class="font-mono text-[12px] text-ink-3 tabular-nums">${this._formatElapsed()}</span>
      </div>
    `);

    this._timerElement = this.shadowRoot?.querySelector(".tabular-nums") ?? null;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-loading-state")) {
  customElements.define("nai-loading-state", NaiLoadingState);
}
