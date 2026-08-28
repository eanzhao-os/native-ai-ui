import { NaiBaseElement } from "../core/base-element.js";

export class NaiLayerCard extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._isOpen = true;
    this._activeTab = "metrics"; // "metrics" | "events"
  }

  toggleOpen() {
    this._isOpen = !this._isOpen;
    this.render();
  }

  setActiveTab(tab) {
    this._activeTab = tab;
    this.render();
  }

  render() {
    const zh = this.isZh;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .zap-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .health-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }

        .worker-id {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          margin-top: 1px;
        }

        .btn-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-toggle:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .toggle-icon {
          transition: transform 0.2s ease;
          transform: ${this._isOpen ? "rotate(180deg)" : "rotate(0)"};
        }

        .body {
          padding: 16px;
        }

        .tab-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-bottom: 12px;
        }

        .tab-switcher {
          display: flex;
          background: var(--field, #f2f2f3);
          border-radius: var(--radius-control, 8px);
          padding: 2px;
        }

        .tab-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .updated-time {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 12px;
          text-align: center;
        }

        .metric-box {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent);
          padding: 10px;
        }

        .metric-label {
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-val {
          display: block;
          margin-top: 2px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 14px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .metric-val.success {
          color: var(--green, #189a4d);
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
        }

        .event-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-chip, 6px);
          background: var(--page, #fafafb);
          padding: 8px;
          color: var(--ink-2, #62656b);
        }

        .event-tag {
          font-weight: 500;
        }

        .event-tag.ok { color: var(--green, #189a4d); }
        .event-tag.snapshot { color: var(--accent, #0285ff); }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 60%, transparent);
          padding: 8px 16px;
          font-size: 11.5px;
        }

        .footer-desc {
          color: var(--ink-3, #9a9da3);
        }

        .footer-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-purge {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }

        .btn-purge:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-deploy {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(2, 133, 255, 0.2);
          transition: opacity 0.12s;
        }

        .btn-deploy:hover {
          opacity: 0.9;
        }
      </style>

      <div class="header">
        <div class="header-left">
          <div class="zap-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <div>
            <div class="title-row">
              <span class="title-text">${zh ? "Harness 边缘工作节点" : "Harness Edge Worker"}</span>
              <span class="health-badge">${zh ? "健康" : "Healthy"}</span>
            </div>
            <div class="worker-id">
              worker-harness-session-prod • us-east-1
            </div>
          </div>
        </div>

        <button
          type="button"
          class="btn-toggle"
          id="btn-toggle"
          title="${this._isOpen ? (zh ? "折叠" : "Collapse") : zh ? "展开" : "Expand"}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toggle-icon">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      ${
        this._isOpen
          ? `
        <div class="body">
          <div class="tab-bar">
            <div class="tab-switcher">
              <button type="button" class="tab-btn ${this._activeTab === "metrics" ? "active" : ""}" id="tab-metrics">
                ${zh ? "遥测监控指标" : "Telemetry Metrics"}
              </button>
              <button type="button" class="tab-btn ${this._activeTab === "events" ? "active" : ""}" id="tab-events">
                ${zh ? "实时审计事件" : "Live Audit Events"}
              </button>
            </div>

            <span class="updated-time">
              ${zh ? "5秒前已更新" : "Last updated 5s ago"}
            </span>
          </div>

          ${
            this._activeTab === "metrics"
              ? `
            <div class="metrics-grid">
              <div class="metric-box">
                <span class="metric-label">${zh ? "每分钟请求数" : "Requests / min"}</span>
                <span class="metric-val">1,480</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">${zh ? "P95 延迟" : "P95 Latency"}</span>
                <span class="metric-val">18.2ms</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">${zh ? "请求成功率" : "Success Rate"}</span>
                <span class="metric-val success">99.98%</span>
              </div>
            </div>
          `
              : `
            <div class="events-list">
              <div class="event-row">
                <span>${zh ? "[21:49:02] Cordis.Loader 初始化了 4 个服务" : "[21:49:02] Cordis.Loader initialized 4 services"}</span>
                <span class="event-tag ok">OK</span>
              </div>
              <div class="event-row">
                <span>${zh ? "[21:49:15] E2B 沙盒快照创建成功 (142MB)" : "[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
                <span class="event-tag snapshot">SNAPSHOT</span>
              </div>
            </div>
          `
          }
        </div>
      `
          : ""
      }

      <div class="footer">
        <span class="footer-desc">${zh ? "Kumo LayerCard 分层架构" : "Kumo LayerCard pattern"}</span>
        <div class="footer-actions">
          <button type="button" class="btn-purge">
            ${zh ? "清除缓存" : "Purge Cache"}
          </button>
          <button type="button" class="btn-deploy">
            ${zh ? "部署变更" : "Deploy Changes"}
          </button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#btn-toggle")?.addEventListener("click", () => this.toggleOpen());
    this.shadowRoot.querySelector("#tab-metrics")?.addEventListener("click", () => this.setActiveTab("metrics"));
    this.shadowRoot.querySelector("#tab-events")?.addEventListener("click", () => this.setActiveTab("events"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-layer-card")) {
  customElements.define("nai-layer-card", NaiLayerCard);
}
