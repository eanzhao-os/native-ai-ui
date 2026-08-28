import { NaiBaseElement } from "../core/base-element.js";

const PRESETS = [
  {
    id: "strict",
    nameEn: "Strict Sandboxed",
    nameZh: "严格沙盒隔离",
    sandbox: "E2B Cloud",
    approvalEn: "Strict Prompt",
    approvalZh: "全量拦截审批",
    descEn: "Isolated remote container. Prompt user before all file edits, shell commands, and outbound HTTP.",
    descZh: "在远程隔离容器中执行。任何文件修改、终端命令及外网 HTTP 调用均需用户手动确认。",
    icon: "shield",
  },
  {
    id: "balanced",
    nameEn: "Balanced Dev",
    nameZh: "开发平衡模式",
    sandbox: "Local Process",
    approvalEn: "Write-Only Prompt",
    approvalZh: "仅写操作审批",
    descEn: "Local sandbox with workspace isolation. Read operations auto-approve; write/exec prompt once.",
    descZh: "本地沙盒与工作区隔离。读操作自动放行；文件写入与命令执行仅提示一次。",
    icon: "scale",
  },
  {
    id: "autonomous",
    nameEn: "Autonomous Agent",
    nameZh: "全自主执行模式",
    sandbox: "Local Process",
    approvalEn: "Autonomous",
    approvalZh: "完全自主",
    descEn: "Full automated execution. Retains durable exactly-once audit ledger in SQLite.",
    descZh: "全自动执行流。在 SQLite 中保留可完整重放的 Exactly-Once 审计账本。",
    icon: "bolt",
  },
];

const SAMPLE_AUDIT = [
  {
    id: "aud-1",
    action: "fs.write",
    target: "src/Harness.Core/Session.cs",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:12",
    hash: "e4f8a1...3b9c",
  },
  {
    id: "aud-2",
    action: "shell.exec",
    target: "dotnet build Harness.slnx",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:19",
    hash: "82a0bc...19d4",
  },
  {
    id: "aud-3",
    action: "fs.read",
    target: "NuGet.config",
    statusEn: "Auto-Allowed",
    statusZh: "自动放行",
    timestamp: "21:48:22",
    hash: "6c7d1e...90fa",
  },
];

export class NaiPermissionPresetCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._selectedPreset = "balanced";
    this._isReplaying = false;
    this._replayVerified = false;
  }

  handleSelectPreset(id) {
    this._selectedPreset = id;
    this.render();
  }

  handleReplayAudit() {
    this._isReplaying = true;
    this._replayVerified = false;
    this.render();

    this.registerTimeout(() => {
      this._isReplaying = false;
      this._replayVerified = true;
      this.render();
    }, 900);
  }

  render() {
    const zh = this.isZh;

    const renderIcon = (icon) => {
      if (icon === "shield") {
        return `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        `;
      }
      if (icon === "scale") {
        return `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18M8 21h8M3 7h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zm14 0h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zM5 7l7-4 7 4" transform="translate(1 0) scale(0.92)" />
          </svg>
        `;
      }
      return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      `;
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .audit-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }

        .presets-grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        @media (max-width: 640px) {
          .presets-grid {
            grid-template-columns: 1fr;
          }
        }
        .preset-tile {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .preset-selected {
          border-color: var(--accent, #0285ff);
          background: rgba(233, 243, 255, 0.3);
          box-shadow: 0 1px 2px rgba(2, 133, 255, 0.1);
          outline: 1px solid var(--accent, #0285ff);
        }
        .preset-unselected {
          background: rgba(247, 248, 249, 0.4);
        }
        .preset-unselected:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.3);
        }

        .preset-top {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .preset-icon {
          display: flex;
          width: 16px;
          height: 16px;
          align-items: center;
          justify-content: center;
        }
        .preset-icon-selected { color: var(--accent-ink, #0170dd); }
        .preset-icon-unselected { color: var(--ink-2, #62656b); }

        .preset-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .preset-desc {
          margin: 0;
          font-size: 10.5px;
          line-height: 1.35;
          color: var(--ink-2, #62656b);
        }

        .preset-meta {
          margin-top: 10px;
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
        }
        .meta-line {
          display: flex;
          justify-content: space-between;
          color: var(--ink-3, #9a9da3);
        }
        .meta-line-val {
          color: var(--ink, #1f2124);
          font-weight: 500;
        }

        .audit-box {
          margin-top: 16px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.5);
          padding: 12px;
        }
        .audit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(236, 237, 239, 0.6);
        }
        .audit-header-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .audit-title {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .valid-tag {
          display: flex;
          align-items: center;
          gap: 2px;
          color: var(--green, #189a4d);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .btn-replay {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-replay:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-replay:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .audit-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
        }
        .audit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(236, 237, 239, 0.4);
          font-size: 11px;
        }
        .audit-row:last-child {
          border-bottom: none;
        }
        .audit-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .status-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .badge-approved { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .badge-denied { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }
        .badge-auto { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }

        .audit-target {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }
        .audit-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .hash-tag {
          border-radius: 4px;
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div>
              <h3 class="title">${zh ? "权限预设与审计重放" : "Permission Presets & Auditing"}</h3>
              <p class="sub-text">${zh ? "Harness 权限 Bundle 与持久化不可变事实" : "Harness authorization bundle & durable facts"}</p>
            </div>
          </div>
          <span class="audit-chip">${zh ? "Exactly-Once 审计" : "Exactly-Once Audit"}</span>
        </div>

        <div class="presets-grid">
          ${PRESETS.map((p) => {
            const isSelected = this._selectedPreset === p.id;
            return `
              <div
                class="preset-tile ${isSelected ? "preset-selected" : "preset-unselected"}"
                data-preset="${p.id}"
              >
                <div>
                  <div class="preset-top">
                    <span class="preset-icon ${isSelected ? "preset-icon-selected" : "preset-icon-unselected"}">
                      ${renderIcon(p.icon)}
                    </span>
                    <span class="preset-name">${zh ? p.nameZh : p.nameEn}</span>
                  </div>
                  <p class="preset-desc">${zh ? p.descZh : p.descEn}</p>
                </div>

                <div class="preset-meta">
                  <div class="meta-line">
                    <span>${zh ? "沙盒:" : "Sandbox:"}</span>
                    <span class="meta-line-val">${p.sandbox}</span>
                  </div>
                  <div class="meta-line">
                    <span>${zh ? "审批:" : "Approval:"}</span>
                    <span class="meta-line-val">${zh ? p.approvalZh : p.approvalEn}</span>
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="audit-box">
          <div class="audit-header">
            <div class="audit-header-left">
              <span class="audit-title">${zh ? "可重放审计流水 (Audit Trail)" : "Replayable Audit Trail"}</span>
              ${
                this._replayVerified
                  ? `<span class="valid-tag">${zh ? "✓ 校验通过" : "✓ Validated"}</span>`
                  : ""
              }
            </div>
            <button
              type="button"
              id="btn-replay-audit"
              class="btn-replay"
              ${this._isReplaying ? "disabled" : ""}
            >
              ${
                this._isReplaying
                  ? zh
                    ? "正在重放校验..."
                    : "Verifying..."
                  : zh
                  ? "重放审计"
                  : "Replay Audit"
              }
            </button>
          </div>

          <div class="audit-list">
            ${SAMPLE_AUDIT.map((item) => {
              const badgeClass =
                item.statusEn === "Approved"
                  ? "badge-approved"
                  : item.statusEn === "Denied"
                  ? "badge-denied"
                  : "badge-auto";
              return `
                <div class="audit-row">
                  <div class="audit-left">
                    <span class="status-badge ${badgeClass}">${zh ? item.statusZh : item.statusEn}</span>
                    <span class="audit-target">${item.action}: ${item.target}</span>
                  </div>
                  <div class="audit-right">
                    <span>${item.timestamp}</span>
                    <span class="hash-tag">${item.hash}</span>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelectorAll("[data-preset]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-preset");
        this.handleSelectPreset(id);
      });
    });

    this.shadowRoot.querySelector("#btn-replay-audit")?.addEventListener("click", () => {
      this.handleReplayAudit();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-permission-preset-card")) {
  customElements.define("nai-permission-preset-card", NaiPermissionPresetCard);
}
