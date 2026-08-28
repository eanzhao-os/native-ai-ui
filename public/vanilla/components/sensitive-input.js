import { NaiBaseElement } from "../core/base-element.js";

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

export class NaiSensitiveInput extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._revealed = false;
    this._copied = false;
    this._copyError = false;
    this._apiKey = "dsk-live-9824f1a8c901e47d8b3a5c2e";
  }

  toggleReveal() {
    this._revealed = !this._revealed;
    this.render();
  }

  async handleCopy() {
    this._copyError = false;
    try {
      if (!(await copyText(this._apiKey))) {
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
    const revealed = this._revealed;
    const copied = this._copied;
    const copyError = this._copyError;
    const apiKey = this._apiKey;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${zh ? "API 密钥与凭据保险箱" : "API Key & Credentials"}
                </h3>
                <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-accent-ink">
                  Kumo Pattern
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${zh ? "DeepSeek 认证令牌与 Harness 运行凭据" : "DeepSeek Reasoning & Harness credentials"}
              </p>
            </div>
          </div>

          <span class="rounded-chip bg-green-tint px-2 py-0.5 font-mono text-[10px] text-green font-medium">
            ${zh ? "静态落盘加密" : "Encrypted at Rest"}
          </span>
        </div>

        
        <div class="mt-4">
          <label
            for="sensitive-api-token"
            class="mb-1.5 block text-[11.5px] font-medium text-ink-2"
          >
            ${zh ? "DeepSeek API Token (生产环境)" : "DeepSeek API Token (Production)"}
          </label>

          <div class="flex items-center gap-2 rounded-control border border-line bg-field px-3 py-2 focus-within:border-accent focus-within:bg-surface focus-within:ring-2 focus-within:ring-accent/20 transition-all">
            <input
              id="token-input"
              type="${revealed ? "text" : "password"}"
              value="${apiKey}"
              class="w-full font-mono text-[12px] text-ink bg-transparent focus:outline-none"
            />

            <div class="flex items-center gap-1 text-ink-3 shrink-0">
              
              <button
                type="button"
                id="btn-reveal"
                class="flex size-6 items-center justify-center rounded-chip hover:bg-hover hover:text-ink transition-colors cursor-pointer"
                title="${revealed ? (zh ? "隐藏令牌" : "Hide token") : zh ? "显示令牌" : "Reveal token"}"
              >
                ${
                  revealed
                    ? `
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                `
                    : `
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                `
                }
              </button>

              
              <button
                type="button"
                id="btn-copy"
                aria-label="${zh ? "复制令牌" : "Copy token"}"
                class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
              >
                ${
                  copyError
                    ? `
                  <span role="status" aria-live="polite" class="text-red font-medium">
                    ${zh ? "复制失败" : "Copy failed"}
                  </span>
                `
                    : copied
                    ? `
                  <span role="status" aria-live="polite" class="text-green font-medium">
                    ${zh ? "已复制!" : "Copied!"}
                  </span>
                `
                    : `
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>${zh ? "复制" : "Copy"}</span>
                `
                }
              </button>
            </div>
          </div>
        </div>

        
        <div class="mt-3.5 flex items-center justify-between text-[11px] text-ink-3">
          <span class="font-mono">${zh ? "作用域: chat.completions, reasoner" : "Scope: chat.completions, reasoner"}</span>
          <span>${zh ? "有效期剩余 89 天" : "Expires in 89 days"}</span>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector("#btn-reveal")?.addEventListener("click", () => this.toggleReveal());
    this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click", () => this.handleCopy());

    const input = this.shadowRoot?.querySelector("#sensitive-api-token");
    input?.addEventListener("input", (e) => {
      this._apiKey = e.target.value;
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sensitive-input")) {
  customElements.define("nai-sensitive-input", NaiSensitiveInput);
}

