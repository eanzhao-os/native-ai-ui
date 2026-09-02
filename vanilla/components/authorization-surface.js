import { NaiBaseElement } from "../core/base-element.js";

/* ─────────────────────────────────────────────────────────
 * AUTHORIZATION SURFACE — provider credentials & sign-in flows
 * (vanilla custom element). Secrets write-only; configured
 * state is the only display; one prompt surface at a time.
 * ───────────────────────────────────────────────────────── */

const DIRECTORY = [
  { key: "deepseek", kind: "oauth", scope: "chat.completions, reasoner" },
  { key: "openai", kind: "api-key", scope: "responses, embeddings" },
  { key: "e2b", kind: "api-key", scope: "sandboxes:write" },
];

const FULL_SECRET = "dsk-live-9824f1a8c901";
const HOLD_IDLE_MS = 1400;
const TYPE_MS = 110;
const SETTLE_MS = 900;
const HOLD_DONE_MS = 3400;

export class NaiAuthorizationSurface extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "visual-case"];
  }

  constructor() {
    super();
    this._configured = { deepseek: false, openai: true, e2b: false };
    this._flowKey = null;
    this._phase = "idle"; // idle | prompt | settling | done
    this._secret = "";
    this._revealed = false;
    this._scheduleVersion = 0;
  }

  onMount() {
    if (this.getAttribute("visual-case") === "provider-switched") {
      this._beginFlow("e2b");
    }
    this._restartSchedule();
  }

  _beginFlow(key) {
    this._flowKey = key;
    this._phase = "prompt";
    this._secret = "";
    this._revealed = false;
  }

  _withdrawFlow() {
    this._flowKey = null;
    this._phase = "idle";
    this._secret = "";
    this._revealed = false;
  }

  _restartSchedule() {
    this._scheduleVersion += 1;
    this._schedule(this._scheduleVersion);
  }

  _schedule(version) {
    if (version !== this._scheduleVersion) return;
    if (this._phase === "idle" && this._flowKey === null) {
      this.registerTimeout(() => {
        if (version !== this._scheduleVersion) return;
        this._beginFlow("deepseek");
        this.render();
        this._schedule(version);
      }, HOLD_IDLE_MS);
      return;
    }
    if (this._phase === "prompt") {
      if (this._secret.length < FULL_SECRET.length) {
        this.registerTimeout(() => {
          if (version !== this._scheduleVersion) return;
          this._secret = FULL_SECRET.slice(0, this._secret.length + 1);
          this._syncSecretInput();
          this._schedule(version);
        }, TYPE_MS);
      } else {
        this.registerTimeout(() => {
          if (version !== this._scheduleVersion) return;
          this._phase = "settling";
          this.render();
          this._schedule(version);
        }, 500);
      }
      return;
    }
    if (this._phase === "settling") {
      this.registerTimeout(() => {
        if (version !== this._scheduleVersion) return;
        this._configured[this._flowKey ?? "deepseek"] = true;
        this._phase = "done";
        this.render();
        this._schedule(version);
      }, SETTLE_MS);
      return;
    }
    if (this._phase === "done") {
      this.registerTimeout(() => {
        if (version !== this._scheduleVersion) return;
        this._flowKey = null;
        this._phase = "idle";
        this._secret = "";
        this._revealed = false;
        this._configured.deepseek = false;
        this.render();
        this._schedule(version);
      }, HOLD_DONE_MS);
    }
  }

  /* typing animation updates only the input, not a full re-render */
  _syncSecretInput() {
    const input = this.shadowRoot?.querySelector(".secret-input");
    if (input) input.value = this._secret;
    const authorize = this.shadowRoot?.querySelector(".authorize-btn");
    if (authorize) authorize.disabled = this._secret.length === 0;
  }

  render() {
    const zh = this.isZh;
    const flowOpen = this._flowKey !== null && this._phase !== "idle";
    const stableInput = this.shadowRoot?.querySelector(".secret-input");
    const restoreInputFocus = this.shadowRoot?.activeElement === stableInput;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <div class="flex items-center justify-between border-b border-line pb-3.5">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
              </svg>
            </span>
            <div>
              <h3 class="text-[13px] font-semibold text-ink">${zh ? "授权与凭据目录" : "Authorization Directory"}</h3>
              <p class="text-[11px] text-ink-3">${zh ? "凭据只写入不展示；配置状态是唯一事实" : "Secrets are write-only; configured state is the only display"}</p>
            </div>
          </div>
          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-3">
            ${Object.values(this._configured).filter(Boolean).length}/${DIRECTORY.length} ${zh ? "已配置" : "configured"}
          </span>
        </div>

        <div class="mt-3 flex flex-col gap-2">
          ${DIRECTORY.map((entry) => {
            const isConfigured = this._configured[entry.key];
            const inFlight = this._flowKey === entry.key && this._phase !== "idle";
            return `
              <div class="flex items-center gap-2.5 rounded-control border px-3 py-2 transition-colors duration-200 ${inFlight ? "border-accent bg-accent-tint/25" : "border-line bg-surface"}">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[12.5px] font-medium text-ink">${entry.key}</span>
                    <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">${entry.kind}</span>
                  </div>
                  <p class="mt-0.5 truncate font-mono text-[10px] text-ink-3">${entry.scope}</p>
                </div>
                ${isConfigured ? `
                  <span class="flex items-center gap-1 rounded-chip bg-green-tint px-2 py-0.5 text-[10.5px] font-medium text-green"
                    style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    ${zh ? "已配置" : "Configured"}
                  </span>
                ` : inFlight ? `
                  <span class="flex items-center gap-1.5 text-[10.5px] text-ink-3">
                    <span class="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>
                    ${zh ? "授权中…" : "authorizing…"}
                  </span>
                ` : `
                  <button type="button" data-signin="${entry.key}"
                    aria-label="${zh ? `登录 ${entry.key}` : `Sign in to ${entry.key}`}"
                    class="rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors duration-100 hover:bg-hover cursor-pointer">
                    ${zh ? "登录" : "Sign in"}
                  </button>
                `}
                ${isConfigured ? `
                  <button type="button" data-signout="${entry.key}" class="text-[11px] text-ink-3 transition-colors duration-100 hover:text-red cursor-pointer">
                    ${zh ? "退出" : "Sign out"}
                  </button>
                ` : ""}
              </div>
            `;
          }).join("")}
        </div>

        <div class="grid transition-[grid-template-rows,opacity] duration-300"
          style="grid-template-rows: ${flowOpen ? "1fr" : "0fr"}; opacity: ${flowOpen ? 1 : 0}; transition-timing-function: cubic-bezier(0.23,1,0.32,1);">
          <div class="overflow-hidden">
            ${flowOpen ? `
              <div class="mt-3 rounded-control border border-line bg-inset/60 p-3">
                ${this._phase === "done" ? `
                  <div class="flex items-center gap-2 py-1">
                    <span class="flex size-5 items-center justify-center rounded-full bg-green text-white" style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                    <span class="text-[12px] font-medium text-ink">${zh ? "授权完成，凭据已写入保险箱" : "Authorized — credential written to the vault"}</span>
                  </div>
                ` : `
                  <div class="flex items-center justify-between">
                    <span class="text-[12px] font-medium text-ink">${zh ? `授权 ${this._flowKey ?? ""}` : `Authorize ${this._flowKey ?? ""}`}</span>
                    <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9.5px] text-accent-ink">
                      ${this._phase === "settling" ? (zh ? "写入中" : "writing") : zh ? "等待输入" : "awaiting input"}
                    </span>
                  </div>
                  <div class="mt-2 flex items-center gap-2 rounded-control border border-line bg-field px-2.5 py-1.5 focus-within:border-accent focus-within:bg-surface transition-colors">
                    <input type="${this._revealed ? "text" : "password"}"
                      aria-label="${zh ? "访问令牌" : "Access token"}"
                      class="secret-input w-full bg-transparent font-mono text-[12px] text-ink outline-none" />
                    <button type="button" class="reveal-btn flex size-5 shrink-0 items-center justify-center rounded-chip text-ink-3 transition-colors hover:bg-hover hover:text-ink cursor-pointer"
                      aria-label="${this._revealed ? (zh ? "隐藏令牌" : "Hide token") : zh ? "显示令牌" : "Reveal token"}">
                      ${this._revealed ? `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      ` : `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      `}
                    </button>
                  </div>
                  <div class="mt-2.5 flex items-center justify-end gap-2">
                    <button type="button" class="withdraw-btn rounded-control px-2.5 py-1 text-[11px] text-ink-3 transition-colors hover:bg-hover hover:text-ink cursor-pointer">
                      ${zh ? "取消流程" : "Withdraw"}
                    </button>
                    <button type="button" ${this._secret.length === 0 || this._phase === "settling" ? "disabled" : ""}
                      class="authorize-btn rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer">
                      ${this._phase === "settling" ? (zh ? "写入中…" : "Writing…") : zh ? "确认授权" : "Authorize"}
                    </button>
                  </div>
                `}
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `);

    const renderedInput = this.shadowRoot?.querySelector(".secret-input");
    if (stableInput && renderedInput) {
      for (const attribute of [...stableInput.attributes]) {
        if (!renderedInput.hasAttribute(attribute.name)) {
          stableInput.removeAttribute(attribute.name);
        }
      }
      for (const attribute of [...renderedInput.attributes]) {
        stableInput.setAttribute(attribute.name, attribute.value);
      }
      renderedInput.replaceWith(stableInput);
    }

    this._syncSecretInput();
    if (restoreInputFocus && stableInput?.isConnected) stableInput.focus();
    this.shadowRoot?.querySelectorAll("[data-signin]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._beginFlow(btn.getAttribute("data-signin"));
        this.render();
        this._restartSchedule();
      });
    });
    this.shadowRoot?.querySelectorAll("[data-signout]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._configured[btn.getAttribute("data-signout")] = false;
        this.render();
      });
    });
    this.shadowRoot?.querySelector(".reveal-btn")?.addEventListener("click", (event) => {
      const restoreFocus = this.shadowRoot?.activeElement === event.currentTarget;
      this._revealed = !this._revealed;
      this.render();
      if (restoreFocus) this.shadowRoot?.querySelector(".reveal-btn")?.focus();
    });
    const secretInput = this.shadowRoot?.querySelector(".secret-input");
    if (secretInput && secretInput !== stableInput) {
      secretInput.addEventListener("input", (event) => {
        this._secret = event.target.value;
        this._syncSecretInput();
      });
    }
    this.shadowRoot?.querySelector(".withdraw-btn")?.addEventListener("click", () => {
      this._withdrawFlow();
      this.render();
      this._restartSchedule();
    });
    this.shadowRoot?.querySelector(".authorize-btn")?.addEventListener("click", () => {
      if (this._phase !== "prompt" || this._secret.length === 0) return;
      this._phase = "settling";
      this.render();
      this._restartSchedule();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-authorization-surface")) {
  customElements.define("nai-authorization-surface", NaiAuthorizationSurface);
}
