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

    const html = `
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card transition-all">
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-orange-tint text-orange">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <h4 class="text-[13px] font-semibold text-ink">
                ${zh ? "需要架构决策澄清" : "Clarification Required"}
              </h4>
              <span class="text-[11px] text-ink-3">
                ${zh ? "架构决策 #4" : "Architectural Decision #4"}
              </span>
            </div>
          </div>

          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-2">
            ${zh ? "第 2 步，共 5 步" : "Step 2 of 5"}
          </span>
        </div>

        <!-- Main Question & Context -->
        <p class="mt-3 text-[12.5px] leading-relaxed text-ink">
          ${
            zh
              ? "检测到 Redis 中存有历史活跃会话。在执行认证架构迁移时，您希望如何处理这些存量会话？"
              : "We detected existing session stores in Redis. How would you like the authentication migration to handle active sessions?"
          }
        </p>

        <!-- Success / Submitted State -->
        ${
          isSubmitted
            ? `
          <div class="mt-4 flex flex-col items-center justify-center rounded-control border border-green/30 bg-green-tint p-4 text-center">
            <div class="flex size-7 items-center justify-center rounded-full bg-green text-white mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span class="text-[12.5px] font-medium text-green">
              ${zh ? "决策已确认：" : "Decision Recorded: "}
              ${selectedTitle}
            </span>
            <p class="mt-1 text-[11px] text-ink-2">
              ${zh ? "智能体已根据所选策略恢复自动执行。" : "Agent execution resumed with selected migration policy."}
            </p>
            <button
              type="button"
              id="reset-btn"
              class="mt-3 text-[11px] text-ink-3 underline hover:text-ink cursor-pointer"
            >
              ${zh ? "修改决策" : "Change decision"}
            </button>
          </div>
        `
            : `
          <!-- Selectable Options -->
          <div class="mt-3.5 flex flex-col gap-2">
            ${OPTIONS.map((opt) => {
              const isSelected = selectedId === opt.id;
              return `
                <label
                  data-id="${opt.id}"
                  class="option-label option-item flex items-start gap-3 rounded-control border p-3 transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent-tint/30 shadow-sm"
                      : "border-line bg-surface hover:border-line-strong hover:bg-hover/40"
                  }"
                >
                  <input
                    type="radio"
                    name="clarification-choice"
                    ${isSelected ? "checked" : ""}
                    class="mt-0.5 size-3.5 accent-accent"
                  />
                  <div class="flex flex-col min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-[12px] font-medium text-ink">
                        ${zh ? opt.titleZh : opt.titleEn}
                      </span>
                      ${
                        opt.tagZh || opt.tagEn
                          ? `
                        <span
                          class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${
                            opt.recommended ? "bg-accent-tint text-accent-ink" : "bg-field text-ink-2"
                          }"
                        >
                          ${zh ? opt.tagZh : opt.tagEn}
                        </span>
                      `
                          : ""
                      }
                    </div>
                    <span class="mt-0.5 text-[11px] text-ink-2 leading-normal">
                      ${zh ? opt.descZh : opt.descEn}
                    </span>
                  </div>
                </label>
              `;
            }).join("")}
          </div>

          <!-- Custom Instruction Input -->
          <div class="mt-3">
            <input
              type="text"
              placeholder="${zh ? "或直接输入自定义迁移要求..." : "Or provide custom migration rules..."}"
              value="${customText}"
              class="custom-input w-full rounded-control border border-line bg-field px-3 py-2 text-[12px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex items-center justify-between border-t border-line pt-3">
            <button
              type="button"
              id="skip-btn"
              class="text-[11.5px] text-ink-3 hover:text-ink transition-colors cursor-pointer"
            >
              ${zh ? "跳过 (采纳推荐)" : "Skip (Use Recommended)"}
            </button>
            <button
              type="button"
              id="submit-btn"
              class="flex items-center gap-1.5 rounded-control bg-accent px-3.5 py-1.5 text-[12px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
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

    this.setHtml(html);

    if (isSubmitted) {
      this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click", () => this.reset());
    } else {
      this.shadowRoot.querySelectorAll(".option-item").forEach((el) => {
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
