import { NaiBaseElement } from "../core/base-element.js";

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
  kw: "var(--accent-ink)",
  str: "var(--green)",
  num: "var(--orange)",
  fn: "var(--ink)",
  dim: "var(--ink-3)",
};

const RAW = `export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`;

export class NaiCodeBlock extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._count = 0;
    this._copied = false;
  }

  onMount() {
    this._count = 0;
    this._tick();
  }

  _tick() {
    const done = this._count >= LINES.length;
    this.registerTimeout(() => {
      this._count = this._count >= LINES.length ? 0 : this._count + 1;
      this.render();
      this._tick();
    }, this._count === 0 ? 400 : done ? HOLD_MS : LINE_MS);
  }

  copy() {
    navigator.clipboard?.writeText(RAW).then(() => {
      this._copied = true;
      this.render();
      this.registerTimeout(() => {
        this._copied = false;
        this.render();
      }, 1500);
    });
  }

  render() {
    const zh = this.isZh;
    const done = this._count >= LINES.length;

    this.setHtml(`
      <div class="w-full max-w-95 overflow-hidden rounded-card bg-surface shadow-card">
        {/* header */}
        <div class="flex items-center justify-between border-b border-line px-3.5 py-2">
          <span class="flex items-baseline gap-2">
            <span class="filename font-mono text-[12px] font-medium text-ink">churn.ts</span>
            <span class="text-[11.5px] text-ink-3">TypeScript</span>
          </span>
          <button
            type="button"
            aria-label="${zh ? "复制代码" : "Copy code"}"
            class="copy-btn flex h-6 items-center gap-1 rounded-[6px] px-1.5 text-[11.5px] font-medium transition-colors duration-100 hover:bg-hover cursor-pointer ${
              this._copied ? "text-green" : "text-ink-2"
            }"
          >
            ${
              this._copied
                ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                   <span>${zh ? "已复制" : "Copied"}</span>`
                : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                   <span>${zh ? "复制" : "Copy"}</span>`
            }
          </button>
        </div>

        {/* code content */}
        <pre class="overflow-x-auto p-3.5 font-mono text-[12.5px] leading-relaxed text-ink [tab-size:2]"><code>${LINES.slice(
          0,
          this._count
        )
          .map(
            (tokens, i) => `
            <div class="flex items-baseline" style="animation: stream-in 300ms ease-out both;">
              <span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${i + 1}</span>
              <span class="min-w-0 flex-1 whitespace-pre">${tokens
                .map((t) => `<span style="color: ${t.c ? COLORS[t.c] : "inherit"};">${t.t}</span>`)
                .join("")}</span>
            </div>
          `
          )
          .join("")}${
          !done
            ? `<div class="flex items-baseline"><span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${this._count + 1}</span><span class="inline-block h-3.5 w-1.5 bg-accent align-middle animate-pulse"></span></div>`
            : ""
        }</code></pre>
      </div>
    `);

    this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click", () => this.copy());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-code-block")) {
  customElements.define("nai-code-block", NaiCodeBlock);
}
