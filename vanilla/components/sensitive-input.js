import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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
      const ok = await copyText(this._apiKey);
      if (!ok) {
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

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding-bottom: 14px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .key-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .kumo-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
        }

        .subtitle {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          margin-top: 2px;
        }

        .security-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }

        .field-container {
          margin-top: 16px;
        }

        .field-label {
          display: block;
          margin-bottom: 6px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 8px 12px;
          transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
        }

        .input-box:focus-within {
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent, #0285ff) 20%, transparent);
        }

        .token-input {
          width: 100%;
          border: none;
          background: transparent;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .input-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          color: var(--ink-3, #9a9da3);
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .icon-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-copy {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-copy:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .copy-ok {
          color: var(--green, #189a4d);
          font-weight: 500;
        }

        .copy-err {
          color: var(--red, #e3474c);
          font-weight: 500;
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="header">
        <div class="header-left">
          <span class="key-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
            </svg>
          </span>
          <div>
            <div class="title-group">
              <span class="title-text">${zh ? "API 密钥与凭据保险箱" : "API Key & Credentials"}</span>
              <span class="kumo-chip">Kumo Pattern</span>
            </div>
            <div class="subtitle">
              ${zh ? "DeepSeek 认证令牌与 Harness 运行凭据" : "DeepSeek Reasoning & Harness credentials"}
            </div>
          </div>
        </div>

        <span class="security-badge">
          ${zh ? "静态落盘加密" : "Encrypted at Rest"}
        </span>
      </div>

      <div class="field-container">
        <label class="field-label" for="token-input">
          ${zh ? "DeepSeek API Token (生产环境)" : "DeepSeek API Token (Production)"}
        </label>

        <div class="input-box">
          <input
            id="token-input"
            class="token-input"
            type="${this._revealed ? "text" : "password"}"
            value="${this._apiKey}"
          />

          <div class="input-actions">
            <button
              type="button"
              class="icon-btn"
              id="btn-reveal"
              title="${this._revealed ? (zh ? "隐藏令牌" : "Hide token") : zh ? "显示令牌" : "Reveal token"}"
            >
              ${
                this._revealed
                  ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
                  : `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`
              }
            </button>

            <button type="button" class="btn-copy" id="btn-copy" aria-label="${zh ? "复制令牌" : "Copy token"}">
              ${
                this._copyError
                  ? `<span class="copy-err">${zh ? "复制失败" : "Copy failed"}</span>`
                  : this._copied
                  ? `<span class="copy-ok">${zh ? "已复制!" : "Copied!"}</span>`
                  : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>${zh ? "复制" : "Copy"}</span>`
              }
            </button>
          </div>
        </div>
      </div>

      <div class="footer">
        <span class="mono">${zh ? "作用域: chat.completions, reasoner" : "Scope: chat.completions, reasoner"}</span>
        <span>${zh ? "有效期剩余 89 天" : "Expires in 89 days"}</span>
      </div>
    `;

    this.shadowRoot.querySelector("#btn-reveal")?.addEventListener("click", () => this.toggleReveal());
    this.shadowRoot.querySelector("#btn-copy")?.addEventListener("click", () => this.handleCopy());

    const input = this.shadowRoot.querySelector("#token-input");
    input?.addEventListener("input", (e) => {
      this._apiKey = e.target.value;
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sensitive-input")) {
  customElements.define("nai-sensitive-input", NaiSensitiveInput);
}
