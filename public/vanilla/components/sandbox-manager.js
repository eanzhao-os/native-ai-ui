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

    const extraCss = `
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/30 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 30%, transparent); }
      .divide-line\\/60 > * + * { border-top-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .max-w-\\[240px\\] { max-width: 240px; }
    `;

    this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-green-tint text-green">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${zh ? "E2B 容器沙盒运行态" : "E2B Sandbox Container"}
                </h3>
                <span
                  class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${
                    this._isRunning ? "bg-green-tint text-green" : "bg-orange-tint text-orange"
                  }"
                >
                  ${this._isRunning ? (zh ? "运行中" : "Running") : zh ? "重启中..." : "Restarting..."}
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${zh ? "隔离环境 Linux x86_64 • Harness.Sandbox.E2b" : "Isolated Linux x86_64 • Harness.Sandbox.E2b"}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-restart"
            ${!this._isRunning ? "disabled" : ""}
            class="flex items-center gap-1 rounded-control border border-line bg-field px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>${zh ? "重启容器" : "Restart Container"}</span>
          </button>
        </div>

        
        <div class="mt-3.5 grid grid-cols-2 gap-2.5">
          <div class="rounded-control border border-line bg-inset/40 p-3">
            <div class="flex items-baseline justify-between">
              <span class="text-[11px] text-ink-3">${zh ? "vCPU 算力利用率" : "vCPU Utilization"}</span>
              <span class="font-mono text-[12px] font-semibold text-ink">${this._cpuUsage}%</span>
            </div>
            <div class="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
              <div
                class="h-full bg-accent rounded-full transition-all duration-500"
                style="width: ${this._cpuUsage * 2}%;"
              ></div>
            </div>
            <span class="mt-1 block font-mono text-[9.5px] text-ink-3">
              ${zh ? "独占 2 核心 vCPU" : "2 vCPUs dedicated"}
            </span>
          </div>

          <div class="rounded-control border border-line bg-inset/40 p-3">
            <div class="flex items-baseline justify-between">
              <span class="text-[11px] text-ink-3">${zh ? "内存占用 (RAM)" : "Memory (RAM)"}</span>
              <span class="font-mono text-[12px] font-semibold text-ink">${this._memUsage} MB</span>
            </div>
            <div class="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
              <div
                class="h-full bg-green rounded-full transition-all duration-500"
                style="width: ${(this._memUsage / 2048) * 100}%;"
              ></div>
            </div>
            <span class="mt-1 block font-mono text-[9.5px] text-ink-3">
              ${zh ? "内存配额上限: 2,048 MB" : "Limit: 2,048 MB"}
            </span>
          </div>
        </div>

        
        <div class="mt-3.5 rounded-control border border-line bg-inset/30 p-3">
          <span class="text-[11px] font-semibold text-ink">
            ${zh ? "活动隔离进程树" : "Active Isolated Processes"}
          </span>
          <div class="mt-2 flex flex-col divide-y divide-line/60">
            ${SAMPLE_PROCESSES.map(
              (p) => `
              <div class="flex items-center justify-between py-2 text-[11px]">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="font-mono text-[10px] text-ink-3">#${p.pid}</span>
                  <span class="font-mono text-[11px] font-medium text-ink truncate max-w-[240px]">
                    ${p.command}
                  </span>
                </div>
                <div class="flex items-center gap-2 font-mono text-[10px] text-ink-2 shrink-0">
                  <span>${p.cpuPct}% CPU</span>
                  <span>•</span>
                  <span>${p.memMb} MB</span>
                </div>
              </div>
            `
            ).join("")}
          </div>
        </div>
      </div>
    `, extraCss);

    this.shadowRoot.querySelector("#btn-restart")?.addEventListener("click", () => {
      this.handleRestart();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-sandbox-manager")) {
  customElements.define("nai-sandbox-manager", NaiSandboxManager);
}
