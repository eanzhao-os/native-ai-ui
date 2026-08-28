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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
        }
        .container {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ink, #1f2124);
        }
        .pixel-grid {
          display: grid;
          grid-template-columns: repeat(3, 4px);
          gap: 1.5px;
        }
        .pixel {
          width: 4px;
          height: 4px;
          background: var(--ink, #1f2124);
          border-radius: ${round ? "50%" : "1px"};
        }
        .label {
          font-size: 13px;
          font-weight: 500;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, var(--ink-3, #9a9da3) 35%, var(--ink, #1f2124) 50%, var(--ink-3, #9a9da3) 65%);
          background-size: 200% 100%;
          animation: shimmer-text 1.4s linear infinite;
        }
        .elapsed-timer {
          font-family: var(--font-mono, ui-monospace, "SF Mono", monospace);
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }
        @keyframes shimmer-text {
          0% { background-position: 150%; }
          100% { background-position: -50%; }
        }
        @keyframes pixel-on {
          0%, 100% { opacity: 0.15; }
          18%, 42% { opacity: 1; }
          62% { opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .label { animation: none; color: var(--ink-2, #62656b); }
          .pixel { animation: none !important; opacity: 0.15 !important; }
        }
      </style>
      <div class="container">
        <span aria-hidden="true" class="pixel-grid">
          ${delays
            .map((d) => `
              <span
                class="pixel"
                style="opacity: ${d === null ? "0.07" : "0.15"}; animation: ${d === null ? "none" : `pixel-on ${dur}ms ease-in-out ${d}ms infinite`};"
              ></span>
            `)
            .join("")}
        </span>
        <span class="label">${displayLabel}</span>
        <span class="elapsed-timer">${this._formatElapsed()}</span>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-loading-state")) {
  customElements.define("nai-loading-state", NaiLoadingState);
}
