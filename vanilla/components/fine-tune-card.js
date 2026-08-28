import { NaiBaseElement } from "../core/base-element.js";

const SEGMENTS = ["row", "col", "grid"];

const TYPE_OPTIONS = [
  { key: "Seasonal", labelEn: "Seasonal", labelZh: "季节限定" },
  { key: "Classic", labelEn: "Classic", labelZh: "经典" },
  { key: "Limited", labelEn: "Limited", labelZh: "限量" },
];

function getSegmentIcon(kind) {
  const dot = "size-1.5 rounded-[2px] border-[1.2px] border-current";
  if (kind === "row") {
    return `
      <span class="flex gap-0.5">
        <span class="${dot}"></span>
        <span class="${dot}"></span>
        <span class="${dot}"></span>
      </span>
    `;
  }
  if (kind === "col") {
    return `
      <span class="flex flex-col gap-0.5">
        <span class="${dot}"></span>
        <span class="${dot}"></span>
      </span>
    `;
  }
  return `
    <span class="grid grid-cols-2 gap-0.5">
      <span class="${dot}"></span>
      <span class="${dot}"></span>
      <span class="${dot}"></span>
      <span class="${dot}"></span>
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
      <label
        class="flex h-6.5 min-w-0 items-center gap-1 rounded-chip py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200"
        style="
          background: ${isModified ? "var(--accent-tint)" : "var(--field)"};
          box-shadow: ${isModified ? "0 0 0 1px var(--accent)" : "none"};
        "
        data-field="${fieldKey}"
        data-min="${min}"
        data-max="${max}"
      >
        
        <span
          role="slider"
          aria-label="${label}"
          aria-valuenow="${value}"
          aria-valuemin="${min}"
          aria-valuemax="${max}"
          tabindex="0"
          data-field="${fieldKey}"
          class="scrub-handle flex h-full shrink-0 cursor-ew-resize touch-none items-center rounded-[4px] px-0.5 text-[12px] text-ink-3 select-none hover:text-ink-2 focus-visible:text-accent-ink focus-visible:outline-none"
        >
          ${label}
        </span>
        <input
          inputmode="numeric"
          value="${value}"
          data-field="${fieldKey}"
          aria-label="${label} value"
          class="scrub-input min-w-0 flex-1 bg-transparent text-[12px] text-ink tabular-nums outline-none"
        />
        ${suffix ? `<span class="shrink-0 pr-0.5 text-[11.5px] text-ink-3">${suffix}</span>` : ""}
      </label>
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

    this.setHtml(`
      <div class="relative w-full max-w-60 rounded-card bg-surface shadow-raised">
        
        <div class="primitive-card-bar flex items-center justify-between border-b border-line">
          <span class="text-[13px] font-medium text-ink">${zh ? "风味卡片" : "Flavor card"}</span>
          ${
            isDone
              ? `
            <span
              class="flex items-center gap-1.5 text-[12px] font-medium text-green"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              ${zh ? "已编辑" : "Edited"}
            </span>
          `
              : `
            <span class="flex items-center gap-1.5">
              <span class="flex size-4.5 items-center justify-center rounded-[5px] border border-accent/30 bg-accent-tint">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                </svg>
              </span>
              <span
                class="bg-clip-text text-[12px] font-medium text-transparent"
                style="
                  background-image: linear-gradient(90deg, var(--accent) 35%, var(--accent-ink) 50%, var(--accent) 65%);
                  background-size: 200% 100%;
                  animation: shimmer-text 1.4s linear infinite;
                "
              >
                ${zh ? "调整" : "Adjust"}
              </span>
            </span>
          `
          }
        </div>

        
        <div class="primitive-card-pad flex flex-col gap-2 border-b border-line">
          <p class="text-[12.5px] font-medium text-ink">${zh ? "布局" : "Layout"}</p>
          
          <div class="relative grid grid-cols-3 rounded-control bg-field p-0.5">
            <span
              aria-hidden="true"
              class="absolute inset-y-0.5 rounded-[6px] bg-surface shadow-btn transition-transform duration-300"
              style="
                width: calc((100% - 4px) / 3);
                left: 2px;
                transform: translateX(${this._seg * 100}%);
                transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
              "
            ></span>
            ${SEGMENTS.map(
              (s, i) => `
              <button
                key="${s}"
                type="button"
                data-idx="${i}"
                aria-label="${s} layout"
                aria-pressed="${i === this._seg}"
                class="seg-btn relative z-10 flex h-6 items-center justify-center transition-colors duration-200 cursor-pointer ${
                  i === this._seg ? "text-accent" : "text-ink-3"
                }"
              >
                ${getSegmentIcon(s)}
              </button>
            `
            ).join("")}
          </div>
          <div class="grid min-w-0 grid-cols-2 gap-2">
            ${this._renderScrubField("width", zh ? "宽" : "W", this._width, 40, 999)}
            ${this._renderScrubField("height", zh ? "高" : "H", this._height, 24, 999)}
          </div>
          <div class="grid min-w-0 grid-cols-2 gap-2">
            ${this._renderScrubField("radius", zh ? "圆角" : "Radius", this._radius, 0, 64)}
            ${this._renderScrubField("opacity", zh ? "不透明" : "Opacity", this._opacity, 0, 100, "%")}
          </div>
        </div>

        
        <div class="primitive-card-footer flex items-center justify-between">
          <span class="text-[12px] text-ink-3">${zh ? "类型" : "Type"}</span>
          <div class="relative -mr-0.5 w-30">
            <button
              type="button"
              id="btn-dropdown"
              aria-expanded="${this._menuOpen}"
              class="flex h-6.5 w-full items-center justify-between rounded-chip bg-inset py-1 pr-1 pl-2 shadow-hairline transition-shadow duration-200 focus-visible:outline-none cursor-pointer"
              style="${this._menuOpen ? "box-shadow: 0 0 0 1px var(--accent);" : ""}"
            >
              <span class="text-[12px] ${this._typeValue !== null ? "text-ink" : "text-ink-3"}">
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
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-3)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform duration-200"
                style="transform: ${this._menuOpen ? "rotate(180deg)" : "rotate(0)"};"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            ${
              this._menuOpen
                ? `
              <div
                class="absolute right-0 bottom-8 z-10 w-30 rounded-card bg-surface p-1 shadow-raised"
                style="
                  animation: pop-in 200ms cubic-bezier(0.23,1,0.32,1) both;
                  transform-origin: bottom right;
                "
              >
                ${TYPE_OPTIONS.map(
                  (item) => `
                  <button
                    key="${item.key}"
                    type="button"
                    data-key="${item.key}"
                    class="dropdown-item flex h-6.5 w-full items-center rounded-[6px] px-2 text-left text-[12.5px] text-ink transition-colors duration-150 hover:bg-field cursor-pointer"
                    style="background: ${item.key === this._typeValue ? "var(--field)" : "transparent"};"
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
      </div>
    `);

    // Segment clicks
    this.shadowRoot?.querySelectorAll("[data-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-idx") || "0", 10);
        this.setSeg(idx);
      });
    });

    // Scrub interactions
    this.shadowRoot?.querySelectorAll(".scrub-handle").forEach((handle) => {
      const fieldKey = handle.getAttribute("data-field");
      const parent = handle.closest("label");
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
        const delta = (e.clientX - this._dragState.x) / 2;
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
    this.shadowRoot?.querySelectorAll(".scrub-input").forEach((input) => {
      const fieldKey = input.getAttribute("data-field");
      const parent = input.closest("label");
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
    this.shadowRoot?.querySelector("#btn-dropdown")?.addEventListener("click", () => this.toggleMenu());

    this.shadowRoot?.querySelectorAll(".dropdown-item").forEach((item) => {
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
