import { NaiBaseElement } from "../core/base-element.js";

const SAMPLE_PROCESSES = [
  {
    pid: 1402,
    command: "dotnet run --project src/Harness.Boot",
    cpuPct: 12.4,
    memMb: 240,
    uptimeEn: "8m 12s",
    uptimeZh: "8分12秒",
  },
  {
    pid: 1489,
    command: "node ./worker/lsp-bridge.js",
    cpuPct: 3.1,
    memMb: 85,
    uptimeEn: "6m 40s",
    uptimeZh: "6分40秒",
  },
];

export class NaiSandboxManager extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._isRunning = true;
    this._cpuUsage = 15.5;
    this._memUsage = 325;
  }

  handleRestart() {
    this._isRunning = false;
    this.render();

    this.registerTimeout(() => {
      this._isRunning = true;
      this._cpuUsage = 8.2;
      this._memUsage = 212;
      this.render();
    }, 1000);
  }

  render() {
    const zh = this.isZh;

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
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .status-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .status-running { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .status-restarting { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }

        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .btn-restart {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-restart:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-restart:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .gauges-grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .gauge-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.4);
          padding: 12px;
        }
        .gauge-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .gauge-label {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .gauge-value {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .bar-track {
          margin-top: 8px;
          height: 6px;
          width: 100%;
          border-radius: 9999px;
          background: var(--line, #ecedef);
          overflow: hidden;
        }
        .bar-cpu {
          height: 100%;
          border-radius: 9999px;
          background: var(--accent, #0285ff);
          transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bar-mem {
          height: 100%;
          border-radius: 9999px;
          background: var(--green, #189a4d);
          transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .gauge-sub {
          margin-top: 4px;
          display: block;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .process-box {
          margin-top: 14px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.3);
          padding: 12px;
        }
        .process-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .process-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
        }
        .process-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(236, 237, 239, 0.6);
          font-size: 11px;
        }
        .process-row:last-child {
          border-bottom: none;
        }
        .process-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .process-pid {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .process-cmd {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 240px;
        }
        .process-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
          flex-shrink: 0;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${zh ? "E2B 容器沙盒运行态" : "E2B Sandbox Container"}</h3>
                <span class="status-chip ${this._isRunning ? "status-running" : "status-restarting"}">
                  ${this._isRunning ? (zh ? "运行中" : "Running") : zh ? "重启中..." : "Restarting..."}
                </span>
              </div>
              <p class="sub-text">${zh ? "隔离环境 Linux x86_64 • Harness.Sandbox.E2b" : "Isolated Linux x86_64 • Harness.Sandbox.E2b"}</p>
            </div>
          </div>

          <button
            type="button"
            id="btn-restart"
            class="btn-restart"
            ${!this._isRunning ? "disabled" : ""}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>${zh ? "重启容器" : "Restart Container"}</span>
          </button>
        </div>

        <div class="gauges-grid">
          <div class="gauge-card">
            <div class="gauge-header">
              <span class="gauge-label">${zh ? "vCPU 算力利用率" : "vCPU Utilization"}</span>
              <span class="gauge-value">${this._cpuUsage}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-cpu" style="width: ${this._cpuUsage * 2}%;"></div>
            </div>
            <span class="gauge-sub">${zh ? "独占 2 核心 vCPU" : "2 vCPUs dedicated"}</span>
          </div>

          <div class="gauge-card">
            <div class="gauge-header">
              <span class="gauge-label">${zh ? "内存占用 (RAM)" : "Memory (RAM)"}</span>
              <span class="gauge-value">${this._memUsage} MB</span>
            </div>
            <div class="bar-track">
              <div class="bar-mem" style="width: ${(this._memUsage / 2048) * 100}%;"></div>
            </div>
            <span class="gauge-sub">${zh ? "内存配额上限: 2,048 MB" : "Limit: 2,048 MB"}</span>
          </div>
        </div>

        <div class="process-box">
          <span class="process-title">${zh ? "活动隔离进程树" : "Active Isolated Processes"}</span>
          <div class="process-list">
            ${SAMPLE_PROCESSES.map((p) => `
              <div class="process-row">
                <div class="process-left">
                  <span class="process-pid">#${p.pid}</span>
                  <span class="process-cmd">${p.command}</span>
                </div>
                <div class="process-stats">
                  <span>${p.cpuPct}% CPU</span>
                  <span>•</span>
                  <span>${p.memMb} MB</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#btn-restart")?.addEventListener("click", () => {
      this.handleRestart();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sandbox-manager")) {
  customElements.define("nai-sandbox-manager", NaiSandboxManager);
}
