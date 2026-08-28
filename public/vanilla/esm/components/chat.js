import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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
    const zh = this.isZh;
    this._submitted = zh ? "对比薄荷巧克力与去年同期销量" : "Compare mint chip to last summer";
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
    const isWorking = this._phase === "sent" || this._phase === "reply1";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 420px;
          height: 320px;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: 14px;
          box-shadow: var(--shadow-card);
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .tab-btn {
          padding: 3px 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          opacity: 0.55;
          transition: opacity 0.1s, background-color 0.1s;
        }
        .tab-btn:hover { opacity: 0.85; }
        .tab-btn.active {
          opacity: 1;
          background: var(--field, #f2f2f3);
          font-weight: 500;
        }
        .body-scroll {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .user-msg {
          align-self: flex-end;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          padding: 6px 12px;
          border-radius: 10px 10px 2px 10px;
          font-size: 13px;
          max-width: 85%;
          animation: fade-up 250ms ease;
        }
        .agent-reply {
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: fade-up 300ms ease;
        }
        .agent-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
        }
        .agent-content {
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink, #1f2124);
        }
        .composer {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        input {
          flex: 1;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
        }
        input:focus {
          border-color: var(--accent, #0285ff);
        }
        .btn-send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-send:hover { opacity: 0.9; }
      </style>

      <div class="header">
        <div>
          ${TABS.map(
            (t) => `
              <button type="button" class="tab-btn ${this._tab === t.key ? "active" : ""}" data-tab="${t.key}">
                ${zh ? t.labelZh : t.labelEn}
              </button>
            `
          ).join("")}
        </div>
      </div>

      <div class="body-scroll">
        <div class="user-msg">${this._submitted || (zh ? "对比薄荷巧克力与去年同期销量" : "Compare mint chip to last summer")}</div>
        <div class="agent-reply">
          <div class="agent-label">
            <strong>Agent</strong>
            <span>•</span>
            <span>${zh ? "刚刚" : "Just now"}</span>
          </div>
          <div class="agent-content">
            ${isWorking
              ? `<span style="color: var(--ink-3);">${zh ? "正在比对历史销售数据..." : "Scanning historical records..."}</span>`
              : zh
                ? "薄荷巧克力本季度销量环比上升 18%，在气温超过 30℃ 的周末表现尤为突出，建议增加华夫筒的备货比例。"
                : "Mint chip is up 18% quarter-over-quarter, spiking particularly on weekends above 85°F. Consider lifting waffle cone reorder thresholds."}
          </div>
        </div>
      </div>

      <div class="composer">
        <input type="text" placeholder="${zh ? "回复 Agent..." : "Reply to agent..."}" value="${this._draft}">
        <button type="button" class="btn-send" title="${zh ? "发送" : "Send"}">
          ${ICONS.send}
        </button>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".tab-btn").forEach((el) => {
      el.addEventListener("click", () => {
        const k = el.getAttribute("data-tab");
        if (k) this.setTab(k);
      });
    });

    const input = this.shadowRoot.querySelector("input");
    input?.addEventListener("input", (e) => {
      this._draft = e.target.value;
    });
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.send();
      }
    });

    this.shadowRoot.querySelector(".btn-send")?.addEventListener("click", () => this.send());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-chat")) {
  customElements.define("nai-chat", NaiChat);
}
