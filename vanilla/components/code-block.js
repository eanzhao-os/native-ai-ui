import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

const LINE_MS = 240;
const HOLD_MS = 3200;

const LINES = [
  [{ t: "export async function ", c: "kw" }, { t: "churnBatch", c: "fn" }, { t: "() {", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "flavor = " }, { t: "await ", c: "kw" }, { t: "getFlavor", c: "fn" }, { t: "(", c: "dim" }, { t: "\"pistachio\"", c: "str" }, { t: ");", c: "dim" }],
  [{ t: "  const ", c: "kw" }, { t: "base = " }, { t: "await ", c: "kw" }, { t: "dairy." }, { t: "fetch", c: "fn" }, { t: "({ flavor });", c: "dim" }],
  [{ t: "  await ", c: "kw" }, { t: "freezer." }, { t: "store", c: "fn" }, { t: "(base, { temp: ", c: "dim" }, { t: "\"-14C\"", c: "str" }, { t: " });", c: "dim" }],
  [{ t: "  return ", c: "kw" }, { t: "base.gallons;" }],
  [{ t: "}", c: "dim" }],
];

const COLORS = {
  kw: "var(--accent-ink, #0170dd)",
  str: "var(--green, #189a4d)",
  num: "var(--orange, #ef720c)",
  fn: "var(--ink, #1f2124)",
  dim: "var(--ink-3, #9a9da3)",
};

const RAW = `export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`;

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export class NaiCodeBlock extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "auto"];
  }

  constructor() {
    super();
    this._count = 0;
    this._copied = false;
    this._copyError = false;
  }

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    if (!this.autoPlay) {
      this._count = LINES.length;
      return;
    }
    this._scheduleNext();
  }

  _scheduleNext() {
    if (!this.autoPlay) return;
    const done = this._count >= LINES.length;
    const delay = this._count === 0 ? 400 : done ? HOLD_MS : LINE_MS;
    this.registerTimeout(() => {
      this._count = this._count >= LINES.length ? 0 : this._count + 1;
      this.render();
      this._scheduleNext();
    }, delay);
  }

  async copy() {
    this._copyError = false;
    try {
      if (!(await copyText(RAW))) {
        this._copyError = true;
        this.render();
        return;
      }
      this._copied = true;
      this.render();
      this.registerTimeout(() => {
        this._copied = false;
        this.render();
      }, 1500);
    } catch {
      this._copied = false;
      this._copyError = true;
      this.render();
    }
  }

  render() {
    const zh = this.isZh;
    const count = this._count;
    const done = count >= LINES.length;

    let copyStatusText = zh ? "复制" : "Copy";
    if (this._copyError) {
      copyStatusText = zh ? "复制失败" : "Copy failed";
    } else if (this._copied) {
      copyStatusText = zh ? "已复制" : "Copied";
    }

    const copyBtnColorClass = this._copyError
      ? "color: var(--red, #e3474c);"
      : this._copied
      ? "color: var(--green, #189a4d);"
      : "color: var(--ink-3, #9a9da3);";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          border: 1px solid var(--line, #ecedef);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .file-info {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .filename {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .filetype {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 24px;
          padding: 0 6px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
          ${copyBtnColorClass}
        }
        .copy-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        pre {
          margin: 0;
          min-height: 137px;
          background: var(--inset, #f7f8f9);
          padding: 10px 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          line-height: 1.7;
          overflow-x: auto;
        }
        .line {
          display: flex;
          animation: fade-up 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .line-num {
          width: 20px;
          flex-shrink: 0;
          text-align: right;
          font-size: 10.5px;
          line-height: 1.86;
          color: var(--ink-3, #9a9da3);
          opacity: 0.6;
          user-select: none;
        }
        .line-code {
          padding-left: 10px;
          white-space: pre;
        }
        .cursor {
          display: inline-block;
          margin-left: 2px;
          width: 3px;
          height: 12px;
          vertical-align: -1px;
          border-radius: 99px;
          background: var(--accent, #0285ff);
          animation: caret-blink 0.8s ease-in-out infinite;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      </style>

      <div class="container">
        <div class="header">
          <div class="file-info">
            <span class="filename">churn.ts</span>
            <span class="filetype">TypeScript</span>
          </div>
          <button
            type="button"
            class="copy-btn"
            aria-label="${zh ? "复制代码" : "Copy code"}"
          >
            ${
              this._copied
                ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
                : `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
            }
            <span role="status" aria-live="polite">${copyStatusText}</span>
          </button>
        </div>

        <pre>${LINES.slice(0, count)
          .map(
            (line, i) => `
          <div class="line">
            <span class="line-num">${i + 1}</span>
            <span class="line-code">${line
              .map((tok) => `<span style="color: ${tok.c ? COLORS[tok.c] : "var(--ink-2, #62656b)"}">${tok.t}</span>`)
              .join("")}${i === count - 1 && !done ? `<span class="cursor"></span>` : ""}</span>
          </div>`
          )
          .join("")}</pre>
      </div>
    `;

    this.shadowRoot.querySelector(".copy-btn")?.addEventListener("click", () => this.copy());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-code-block")) {
  customElements.define("nai-code-block", NaiCodeBlock);
}
