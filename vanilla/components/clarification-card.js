import { NaiBaseElement } from "../core/base-element.js";

const OPTIONS = [
  {
    id: "soft",
    titleEn: "Soft Token Migration",
    titleZh: "平滑双轨迁移 (推荐)",
    descEn: "Maintain backward compatibility for v1 JWTs until expiration (7 days).",
    descZh: "在旧版 JWT 过期（7天）前保持向后兼容，用户无感知过渡。",
    recommended: true,
    tagEn: "Recommended",
    tagZh: "推荐",
  },
  {
    id: "dual",
    titleEn: "Dual-Format Verification",
    titleZh: "双签名格式校验",
    descEn: "Verify both RSA256 and EdDSA key signatures concurrently at the gateway.",
    descZh: "在 API 网关同时验证 RSA256 与 EdDSA 密钥签名，保障零停机。",
    tagEn: "Zero Downtime",
    tagZh: "零停机",
  },
  {
    id: "revoke",
    titleEn: "Immediate Session Revocation",
    titleZh: "立即重置所有会话",
    descEn: "Flush Redis token store and force all active users to re-authenticate.",
    descZh: "立即清空 Redis 缓存并强制所有在线用户重新登录认证。",
    tagEn: "High Security",
    tagZh: "最高安全性",
  },
];

export class NaiClarificationCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._selectedId = "soft";
    this._customText = "";
    this._isSubmitted = false;
  }

  selectOption(id) {
    this._selectedId = id;
    this.render();
  }

  submit() {
    this._isSubmitted = true;
    this.render();
  }

  reset() {
    this._isSubmitted = false;
    this._selectedId = "soft";
    this._customText = "";
    this.render();
  }

  render() {
    const zh = this.isZh;
    const isSubmitted = this._isSubmitted;
    const selectedId = this._selectedId;
    const customText = this._customText;

    let selectedTitle = "";
    if (selectedId === "custom") {
      selectedTitle = customText || (zh ? "自定义指令" : "Custom Instruction");
    } else {
      const opt = OPTIONS.find((o) => o.id === selectedId);
      selectedTitle = opt ? (zh ? opt.titleZh : opt.titleEn) : "";
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
          transition: all 0.2s;
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-orange {
          display: flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-subtitle {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .step-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .question-text {
          margin: 12px 0 0 0;
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .options-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .option-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option-label:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .option-label.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .radio-input {
          margin-top: 2px;
          width: 14px;
          height: 14px;
          accent-color: var(--accent, #0285ff);
          cursor: pointer;
        }
        .option-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .option-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .option-title {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .option-tag {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .option-tag.recommended {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .option-tag.normal {
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }
        .option-desc {
          margin-top: 2px;
          font-size: 11px;
          line-height: 1.4;
          color: var(--ink-2, #62656b);
        }
        .custom-input-wrap {
          margin-top: 12px;
        }
        .custom-input {
          width: 100%;
          box-sizing: border-box;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 8px 12px;
          font-family: inherit;
          font-size: 12px;
          color: var(--ink, #1f2124);
          transition: background-color 0.15s, border-color 0.15s;
        }
        .custom-input:focus {
          outline: none;
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
        }
        .actions-row {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
        }
        .btn-skip {
          border: none;
          background: transparent;
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: color 0.12s;
        }
        .btn-skip:hover {
          color: var(--ink, #1f2124);
        }
        .btn-submit {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-submit:hover {
          opacity: 0.9;
        }
        .submitted-card {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid rgba(24, 154, 77, 0.3);
          background: var(--green-tint, #e8f5ed);
          padding: 16px;
          text-align: center;
        }
        .check-circle {
          display: flex;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--green, #189a4d);
          color: #fff;
          margin-bottom: 8px;
        }
        .recorded-title {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .recorded-desc {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .btn-reset {
          margin-top: 12px;
          border: none;
          background: transparent;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          text-decoration: underline;
          cursor: pointer;
        }
        .btn-reset:hover {
          color: var(--ink, #1f2124);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-orange">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <h4 class="header-title">${zh ? "需要架构决策澄清" : "Clarification Required"}</h4>
              <span class="header-subtitle">${zh ? "架构决策 #4" : "Architectural Decision #4"}</span>
            </div>
          </div>
          <span class="step-chip">${zh ? "第 2 步，共 5 步" : "Step 2 of 5"}</span>
        </div>

        <!-- Main Question -->
        <p class="question-text">
          ${zh
            ? "检测到 Redis 中存有历史活跃会话。在执行认证架构迁移时，您希望如何处理这些存量会话？"
            : "We detected existing session stores in Redis. How would you like the authentication migration to handle active sessions?"}
        </p>

        ${
          isSubmitted
            ? `
          <div class="submitted-card">
            <div class="check-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span class="recorded-title">
              ${zh ? "决策已确认：" : "Decision Recorded: "} ${selectedTitle}
            </span>
            <p class="recorded-desc">
              ${zh ? "智能体已根据所选策略恢复自动执行。" : "Agent execution resumed with selected migration policy."}
            </p>
            <button type="button" class="btn-reset" id="reset-btn">
              ${zh ? "修改决策" : "Change decision"}
            </button>
          </div>
        `
            : `
          <!-- Options List -->
          <div class="options-list">
            ${OPTIONS.map((opt) => {
              const isSelected = selectedId === opt.id;
              const tag = zh ? opt.tagZh : opt.tagEn;
              return `
                <label class="option-label ${isSelected ? "selected" : ""}" data-id="${opt.id}">
                  <input
                    type="radio"
                    name="clarification-choice"
                    class="radio-input"
                    ${isSelected ? "checked" : ""}
                  />
                  <div class="option-content">
                    <div class="option-title-row">
                      <span class="option-title">${zh ? opt.titleZh : opt.titleEn}</span>
                      ${
                        tag
                          ? `<span class="option-tag ${opt.recommended ? "recommended" : "normal"}">${tag}</span>`
                          : ""
                      }
                    </div>
                    <span class="option-desc">${zh ? opt.descZh : opt.descEn}</span>
                  </div>
                </label>
              `;
            }).join("")}
          </div>

          <!-- Custom Input -->
          <div class="custom-input-wrap">
            <input
              type="text"
              class="custom-input"
              placeholder="${zh ? "或直接输入自定义迁移要求..." : "Or provide custom migration rules..."}"
              value="${customText}"
            />
          </div>

          <!-- Actions -->
          <div class="actions-row">
            <button type="button" class="btn-skip" id="skip-btn">
              ${zh ? "跳过 (采纳推荐)" : "Skip (Use Recommended)"}
            </button>
            <button type="button" class="btn-submit" id="submit-btn">
              <span>${zh ? "确认并继续" : "Confirm & Proceed"}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        `
        }
      </div>
    `;

    if (isSubmitted) {
      this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click", () => this.reset());
    } else {
      this.shadowRoot.querySelectorAll(".option-label").forEach((el) => {
        el.addEventListener("click", () => {
          const id = el.getAttribute("data-id");
          if (id) this.selectOption(id);
        });
      });

      const input = this.shadowRoot.querySelector(".custom-input");
      input?.addEventListener("input", (e) => {
        this._customText = e.target.value;
        if (e.target.value) {
          this._selectedId = "custom";
        }
      });

      this.shadowRoot.querySelector("#skip-btn")?.addEventListener("click", () => {
        this._selectedId = "soft";
        this.submit();
      });

      this.shadowRoot.querySelector("#submit-btn")?.addEventListener("click", () => {
        this.submit();
      });
    }
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-clarification-card")) {
  customElements.define("nai-clarification-card", NaiClarificationCard);
}
