import { NaiBaseElement } from "../core/base-element.js";

const TABS = [
  { key: "flavors", labelEn: "Flavors", labelZh: "风味" },
  { key: "suppliers", labelEn: "Suppliers", labelZh: "供应商" },
];

export class NaiChat extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._phase = "done";
    this._draft = "";
    this._tab = "flavors";
    this._submitted = "";
  }

  onMount() {
    this._submitted = this.isZh
      ? "对比薄荷巧克力与去年同期销量"
      : "Compare mint chip to last summer";
  }

  setTab(k) {
    this._tab = k;
    this.render();
  }

  send() {
    if (!this._draft.trim()) return;
    this._submitted = this._draft.trim();
    this._draft = "";
    this._phase = "sent";
    this.render();

    this.registerTimeout(() => {
      this._phase = "reply1";
      this.render();
    }, 500);

    this.registerTimeout(() => {
      this._phase = "reply2";
      this.render();
    }, 1900);

    this.registerTimeout(() => {
      this._phase = "done";
      this.render();
    }, 3100);
  }

  render() {
    const zh = this.isZh;
    const sent = this._phase !== "idle";
    const canSend = this._draft.trim().length > 0;

    const renderSection = (label, sub, time, forLabel, body, resolving = false) => `
      <div
        class="flex w-full flex-col gap-1.5 transition-all duration-400"
        style="
          opacity: ${resolving ? 0.55 : 1};
          filter: ${resolving ? "blur(0.5px)" : "blur(0)"};
          transform: ${resolving ? "scale(0.985)" : "scale(1)"};
          transform-origin: top left;
          animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) both;
        "
      >
        <div class="flex items-center gap-1 text-[12px] leading-[1.3]">
          <span class="font-medium text-ink">${label}</span>
          <span class="text-ink-2">${sub}</span>
          <span class="text-ink">${forLabel} ${time}</span>
        </div>
        <p class="text-[13px] leading-normal text-ink">${body}</p>
      </div>
    `;

    this.setHtml(`
      <div class="flex h-[288px] w-full max-w-95 flex-col self-start overflow-hidden rounded-[14px] bg-surface shadow-card">
        {/* header — tabs + actions */}
        <div class="flex shrink-0 items-center justify-between border-b border-line p-1.5">
          <div class="flex items-center">
            ${TABS.map(
              (item) => `
              <button
                type="button"
                aria-pressed="${this._tab === item.key}"
                data-tab="${item.key}"
                class="tab-btn rounded-[6px] px-2 py-[3px] text-[13px] text-ink transition-colors duration-100 ${
                  this._tab === item.key ? "bg-field" : "opacity-50 hover:opacity-75"
                }"
              >
                ${zh ? item.labelZh : item.labelEn}
              </button>
            `
            ).join("")}
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              aria-label="${zh ? "添加" : "Add"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="${zh ? "历史" : "History"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="${zh ? "更多" : "More"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="5" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.8" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>

        {/* conversation — fixed region */}
        <div class="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
          <div class="flex justify-end pl-14">
            <div
              class="rounded-xl bg-field px-3 py-1.5 text-[13px] leading-[1.4] text-ink transition-all duration-300"
              style="
                opacity: ${sent ? 1 : 0};
                transform: ${sent ? "translateY(0)" : "translateY(10px)"};
              "
            >
              ${this._submitted}
            </div>
          </div>

          ${
            this._phase === "reply1" || this._phase === "reply2" || this._phase === "done"
              ? renderSection(
                  zh ? "销售历史" : "Sales History",
                  zh ? "风味数据" : "Flavor Data",
                  "4s",
                  zh ? "用时" : "for",
                  zh ? "已调取近三年夏季薄荷巧克力的销售数据用于对比。" : "Pulled 3 summers of mint chip sales for comparison."
                )
              : ""
          }

          ${
            this._phase === "reply2" || this._phase === "done"
              ? renderSection(
                  zh ? "对比分析" : "Comparison",
                  zh ? "趋势识别" : "Trend Detection",
                  "2s",
                  zh ? "用时" : "for",
                  zh ? "薄荷巧克力销量上涨 12%，周末峰值更加明显。" : "Mint chip is up 12% with stronger weekend peaks.",
                  this._phase === "reply2"
                )
              : ""
          }
        </div>

        {/* composer */}
        <div class="mt-auto shrink-0 p-1.5">
          <div class="composer-box flex cursor-text flex-col gap-2 rounded-control border border-line bg-field p-2.5 transition-colors duration-150">
            <input
              type="text"
              value="${this._draft}"
              placeholder="${zh ? "输入指令，或用 @ 标记风味" : "Prompt or tag a flavor with @"}"
              aria-label="${zh ? "聊天输入框" : "Chat prompt"}"
              class="min-h-[18px] bg-transparent text-[13px] leading-[1.4] text-ink outline-none"
            />
            <div class="flex items-center justify-end">
              <button
                type="button"
                aria-label="${zh ? "发送" : "Send"}"
                ${!canSend ? "disabled" : ""}
                class="send-btn flex size-7 items-center justify-center rounded-[8px] transition-all duration-200"
                style="
                  background: ${canSend ? "var(--ink)" : "var(--line-strong)"};
                  color: ${canSend ? "var(--surface)" : "var(--ink-2)"};
                  cursor: ${canSend ? "pointer" : "default"};
                "
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `);

    // Wire up events
    this.shadowRoot?.querySelectorAll("[data-tab]").forEach((el) => {
      el.addEventListener("click", () => this.setTab(el.getAttribute("data-tab")));
    });

    const input = this.shadowRoot?.querySelector("input");
    const sendBtn = this.shadowRoot?.querySelector(".send-btn");
    const composerBox = this.shadowRoot?.querySelector(".composer-box");

    if (input) {
      input.addEventListener("input", (e) => {
        this._draft = e.target.value;
        const currentCanSend = this._draft.trim().length > 0;
        if (sendBtn) {
          sendBtn.style.background = currentCanSend ? "var(--ink)" : "var(--line-strong)";
          sendBtn.style.color = currentCanSend ? "var(--surface)" : "var(--ink-2)";
          sendBtn.style.cursor = currentCanSend ? "pointer" : "default";
          if (currentCanSend) {
            sendBtn.removeAttribute("disabled");
          } else {
            sendBtn.setAttribute("disabled", "true");
          }
        }
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.send();
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => this.send());
    }

    if (composerBox && input) {
      composerBox.addEventListener("click", () => input.focus());
    }
  }
}

if (!customElements.get("nai-chat")) {
  customElements.define("nai-chat", NaiChat);
}
