import { NaiBaseElement } from "../core/base-element.js";

const SEGMENTS = ["row", "col", "grid"];

const TYPE_OPTIONS = [
  { key: "Seasonal", labelEn: "Seasonal", labelZh: "季节限定" },
  { key: "Classic", labelEn: "Classic", labelZh: "经典" },
  { key: "Limited", labelEn: "Limited", labelZh: "限量" },
];

function getSegmentIcon(kind) {
  if (kind === "row") {
    return `
      <span style="display: flex; gap: 2px;">
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      </span>
    `;
  }
  if (kind === "col") {
    return `
      <span style="display: flex; flex-direction: column; gap: 2px;">
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      </span>
    `;
  }
  return `
    <span style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;">
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
    </span>
  `;
}

export class NaiFineTuneCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._seg = 0;
    this._width = 324;
    this._height = 96;
    this._radius = 28;
    this._opacity = 100;
    this._menuOpen = false;
    this._typeValue = null;
    this._dragState = null;
  }

  setSeg(idx) {
    this._seg = idx;
    this.render();
  }

  setTypeValue(val) {
    this._typeValue = val;
    this._menuOpen = false;
    this.render();
  }

  toggleMenu() {
    this._menuOpen = !this._menuOpen;
    this.render();
  }

  _clamp(v, min, max) {
    return Math.min(max, Math.max(min, Math.round(v)));
  }

  _renderScrubField(fieldKey, label, value, min, max, suffix = "") {
    const isModified =
      (fieldKey === "width" && value !== 324) ||
      (fieldKey === "height" && value !== 96) ||
      (fieldKey === "radius" && value !== 28) ||
      (fieldKey === "opacity" && value !== 100);

    return `
      <div
        class="scrub-field ${isModified ? "active" : ""}"
        data-field="${fieldKey}"
        data-min="${min}"
        data-max="${max}"
      >
        <span class="scrub-handle" data-field="${fieldKey}" role="slider" aria-label="${label}" aria-valuenow="${value}" tabindex="0">
          ${label}
        </span>
        <input
          class="scrub-input"
          data-field="${fieldKey}"
          type="text"
          inputmode="numeric"
          value="${value}"
          aria-label="${label} value"
        />
        ${suffix ? `<span class="scrub-suffix">${suffix}</span>` : ""}
      </div>
    `;
  }

  render() {
    const zh = this.isZh;
    const isDone =
      this._seg !== 0 ||
      this._width !== 324 ||
      this._height !== 96 ||
      this._radius !== 28 ||
      this._opacity !== 100 ||
      this._typeValue !== null;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 240px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          user-select: none;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
        }

        .card-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .badge-edited {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
          color: var(--green, #189a4d);
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .badge-adjust {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .spark-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1px solid color-mix(in srgb, var(--accent, #0285ff) 30%, transparent);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent, #0285ff);
        }

        .shimmer-text {
          font-size: 12px;
          font-weight: 500;
          background: linear-gradient(90deg, var(--accent, #0285ff) 35%, var(--accent-ink, #0170dd) 50%, var(--accent, #0285ff) 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 1.4s linear infinite;
        }

        .pad-section {
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
        }

        .section-label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          margin: 0;
        }

        .segmented-ctrl {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
        }

        .seg-thumb {
          position: absolute;
          top: 2px;
          bottom: 2px;
          width: calc((100% - 4px) / 3);
          left: 2px;
          border-radius: 6px;
          background: var(--surface, #fff);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
          transform: translateX(${this._seg * 100}%);
          transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .seg-btn {
          position: relative;
          z-index: 1;
          display: flex;
          height: 24px;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--ink-3, #9a9da3);
          transition: color 0.2s;
        }

        .seg-btn.active {
          color: var(--accent, #0285ff);
        }

        .fields-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .scrub-field {
          display: flex;
          height: 26px;
          min-width: 0;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 4px 2px 6px;
          background: var(--field, #f2f2f3);
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .scrub-field.active {
          background: var(--accent-tint, #e9f3ff);
          box-shadow: 0 0 0 1px var(--accent, #0285ff);
        }

        .scrub-handle {
          display: flex;
          height: 100%;
          align-items: center;
          cursor: ew-resize;
          touch-action: none;
          border-radius: 4px;
          padding: 0 2px;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          outline: none;
          flex-shrink: 0;
        }

        .scrub-handle:hover {
          color: var(--ink-2, #62656b);
        }

        .scrub-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 12px;
          color: var(--ink, #1f2124);
          font-variant-numeric: tabular-nums;
          outline: none;
          padding: 0;
        }

        .scrub-suffix {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          padding-right: 2px;
          flex-shrink: 0;
        }

        .footer-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
        }

        .type-label {
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }

        .dropdown-container {
          position: relative;
          width: 120px;
        }

        .btn-dropdown {
          display: flex;
          height: 26px;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: var(--inset, #f7f8f9);
          padding: 2px 4px 2px 8px;
          font-size: 12px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          cursor: pointer;
        }

        .dropdown-chevron {
          transition: transform 0.2s ease;
          transform: ${this._menuOpen ? "rotate(180deg)" : "rotate(0)"};
          color: var(--ink-3, #9a9da3);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          bottom: 32px;
          z-index: 10;
          width: 120px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 4px;
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          animation: pop-in 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
          transform-origin: bottom right;
        }

        .dropdown-item {
          display: flex;
          height: 26px;
          width: 100%;
          align-items: center;
          border-radius: 6px;
          border: none;
          background: transparent;
          padding: 0 8px;
          text-align: left;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.15s;
        }

        .dropdown-item:hover {
          background: var(--field, #f2f2f3);
        }

        .dropdown-item.selected {
          background: var(--field, #f2f2f3);
        }

        @keyframes shimmer-text { 0% { background-position: 150%; } 100% { background-position: -50%; } }
        @keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
      </style>

      <div class="header-bar">
        <span class="card-title">${zh ? "风味卡片" : "Flavor card"}</span>
        <div class="status-badge">
          ${
            isDone
              ? `
            <span class="badge-edited">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${zh ? "已编辑" : "Edited"}</span>
            </span>
          `
              : `
            <div class="badge-adjust">
              <span class="spark-icon">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
              </span>
              <span class="shimmer-text">${zh ? "调整" : "Adjust"}</span>
            </div>
          `
          }
        </div>
      </div>

      <div class="pad-section">
        <p class="section-label">${zh ? "布局" : "Layout"}</p>

        <div class="segmented-ctrl">
          <span class="seg-thumb"></span>
          ${SEGMENTS.map(
            (s, i) => `
            <button type="button" class="seg-btn ${i === this._seg ? "active" : ""}" data-idx="${i}" aria-label="${s} layout">
              ${getSegmentIcon(s)}
            </button>
          `
          ).join("")}
        </div>

        <div class="fields-grid">
          ${this._renderScrubField("width", zh ? "宽" : "W", this._width, 40, 999)}
          ${this._renderScrubField("height", zh ? "高" : "H", this._height, 24, 999)}
        </div>

        <div class="fields-grid">
          ${this._renderScrubField("radius", zh ? "圆角" : "Radius", this._radius, 0, 64)}
          ${this._renderScrubField("opacity", zh ? "不透明" : "Opacity", this._opacity, 0, 100, "%")}
        </div>
      </div>

      <div class="footer-section">
        <span class="type-label">${zh ? "类型" : "Type"}</span>

        <div class="dropdown-container">
          <button type="button" class="btn-dropdown" id="btn-dropdown" aria-expanded="${this._menuOpen}">
            <span style="color: ${this._typeValue !== null ? "var(--ink)" : "var(--ink-3)"}">
              ${
                this._typeValue !== null
                  ? zh
                    ? TYPE_OPTIONS.find((o) => o.key === this._typeValue)?.labelZh
                    : this._typeValue
                  : zh
                  ? "选择类型"
                  : "Select type"
              }
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="dropdown-chevron">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          ${
            this._menuOpen
              ? `
            <div class="dropdown-menu">
              ${TYPE_OPTIONS.map(
                (item) => `
                <button
                  type="button"
                  class="dropdown-item ${item.key === this._typeValue ? "selected" : ""}"
                  data-key="${item.key}"
                >
                  ${zh ? item.labelZh : item.labelEn}
                </button>
              `
              ).join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    // Segment clicks
    this.shadowRoot.querySelectorAll(".seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        this.setSeg(idx);
      });
    });

    // Scrub interactions
    this.shadowRoot.querySelectorAll(".scrub-handle").forEach((handle) => {
      const fieldKey = handle.getAttribute("data-field");
      const parent = handle.closest(".scrub-field");
      const min = parseInt(parent?.getAttribute("data-min") || "0", 10);
      const max = parseInt(parent?.getAttribute("data-max") || "999", 10);

      handle.addEventListener("pointerdown", (e) => {
        handle.setPointerCapture(e.pointerId);
        const startVal =
          fieldKey === "width"
            ? this._width
            : fieldKey === "height"
            ? this._height
            : fieldKey === "radius"
            ? this._radius
            : this._opacity;

        this._dragState = {
          x: e.clientX,
          val: startVal,
          fieldKey,
          min,
          max,
        };
      });

      handle.addEventListener("pointermove", (e) => {
        if (!this._dragState) return;
        const delta = ((e.clientX - this._dragState.x) / 2);
        const nextVal = this._clamp(this._dragState.val + delta, this._dragState.min, this._dragState.max);

        if (this._dragState.fieldKey === "width") this._width = nextVal;
        else if (this._dragState.fieldKey === "height") this._height = nextVal;
        else if (this._dragState.fieldKey === "radius") this._radius = nextVal;
        else if (this._dragState.fieldKey === "opacity") this._opacity = nextVal;

        this.render();
      });

      handle.addEventListener("pointerup", () => {
        this._dragState = null;
      });

      handle.addEventListener("keydown", (e) => {
        const mult = e.shiftKey ? 10 : 1;
        const curVal =
          fieldKey === "width"
            ? this._width
            : fieldKey === "height"
            ? this._height
            : fieldKey === "radius"
            ? this._radius
            : this._opacity;

        if (e.key === "ArrowUp" || e.key === "ArrowRight") {
          e.preventDefault();
          const nextVal = this._clamp(curVal + mult, min, max);
          if (fieldKey === "width") this._width = nextVal;
          else if (fieldKey === "height") this._height = nextVal;
          else if (fieldKey === "radius") this._radius = nextVal;
          else if (fieldKey === "opacity") this._opacity = nextVal;
          this.render();
        } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
          e.preventDefault();
          const nextVal = this._clamp(curVal - mult, min, max);
          if (fieldKey === "width") this._width = nextVal;
          else if (fieldKey === "height") this._height = nextVal;
          else if (fieldKey === "radius") this._radius = nextVal;
          else if (fieldKey === "opacity") this._opacity = nextVal;
          this.render();
        }
      });
    });

    // Input changes
    this.shadowRoot.querySelectorAll(".scrub-input").forEach((input) => {
      const fieldKey = input.getAttribute("data-field");
      const parent = input.closest(".scrub-field");
      const min = parseInt(parent?.getAttribute("data-min") || "0", 10);
      const max = parseInt(parent?.getAttribute("data-max") || "999", 10);

      input.addEventListener("input", (e) => {
        const num = Number(e.target.value.replace(/[^\d-]/g, ""));
        if (!Number.isNaN(num)) {
          const clamped = this._clamp(num, min, max);
          if (fieldKey === "width") this._width = clamped;
          else if (fieldKey === "height") this._height = clamped;
          else if (fieldKey === "radius") this._radius = clamped;
          else if (fieldKey === "opacity") this._opacity = clamped;
        }
      });

      input.addEventListener("blur", () => {
        this.render();
      });
    });

    // Dropdown clicks
    this.shadowRoot.querySelector("#btn-dropdown")?.addEventListener("click", () => this.toggleMenu());

    this.shadowRoot.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", () => {
        const key = item.getAttribute("data-key");
        if (key) this.setTypeValue(key);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-fine-tune-card")) {
  customElements.define("nai-fine-tune-card", NaiFineTuneCard);
}
