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
    const isOpen = this._isOpen;
    const activeTab = this._activeTab;

    const html = `
      <div class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all">
        <!-- Top Layer Header -->
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div class="flex items-center gap-2.5">
            <div class="flex size-7 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${zh ? "Harness 边缘工作节点" : "Harness Edge Worker"}
                </h3>
                <span class="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                  ${zh ? "健康" : "Healthy"}
                </span>
              </div>
              <span class="font-mono text-[10.5px] text-ink-3">
                worker-harness-session-prod • us-east-1
              </span>
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              id="btn-toggle"
              class="flex size-7 items-center justify-center rounded-control border border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
              title="${isOpen ? (zh ? "折叠" : "Collapse") : zh ? "展开" : "Expand"}"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="transition-transform duration-200 ${isOpen ? "rotate-180" : ""}"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Collapsible Content -->
        ${
          isOpen
            ? `
          <div class="p-4">
            <!-- Subheader & Tabs -->
            <div class="flex items-center justify-between pb-3 border-b border-line/60">
              <div class="flex rounded-control bg-field p-0.5 text-[11px]">
                <button
                  type="button"
                  id="tab-metrics"
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                    activeTab === "metrics"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-ink-3 hover:text-ink-2"
                  }"
                >
                  ${zh ? "遥测监控指标" : "Telemetry Metrics"}
                </button>
                <button
                  type="button"
                  id="tab-events"
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                    activeTab === "events"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-ink-3 hover:text-ink-2"
                  }"
                >
                  ${zh ? "实时审计事件" : "Live Audit Events"}
                </button>
              </div>

              <span class="font-mono text-[10.5px] text-ink-3">
                ${zh ? "5秒前已更新" : "Last updated 5s ago"}
              </span>
            </div>

            <!-- Tab Body -->
            ${
              activeTab === "metrics"
                ? `
              <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${zh ? "每分钟请求数" : "Requests / min"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                    1,480
                  </span>
                </div>
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${zh ? "P95 延迟" : "P95 Latency"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                    18.2ms
                  </span>
                </div>
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${zh ? "请求成功率" : "Success Rate"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-green">
                    99.98%
                  </span>
                </div>
              </div>
            `
                : `
              <div class="mt-3 flex flex-col gap-1.5 font-mono text-[10.5px]">
                <div class="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                  <span>${zh ? "[21:49:02] Cordis.Loader 初始化了 4 个服务" : "[21:49:02] Cordis.Loader initialized 4 services"}</span>
                  <span class="text-green font-medium">OK</span>
                </div>
                <div class="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                  <span>${zh ? "[21:49:15] E2B 沙盒快照创建成功 (142MB)" : "[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
                  <span class="text-accent font-medium">SNAPSHOT</span>
                </div>
              </div>
            `
            }
          </div>
        `
            : ""
        }

        <!-- Layer Card Footer Action Toolbar -->
        <div class="flex items-center justify-between border-t border-line bg-inset/60 px-4 py-2 text-[11.5px]">
          <span class="text-ink-3">${zh ? "Kumo LayerCard 分层架构" : "Kumo LayerCard pattern"}</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${zh ? "清除缓存" : "Purge Cache"}
            </button>
            <button
              type="button"
              class="rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              ${zh ? "部署变更" : "Deploy Changes"}
            </button>
          </div>
        </div>
      </div>
    `;

    this.setHtml(html);

    this.shadowRoot.querySelector("#btn-toggle")?.addEventListener("click", () => this.toggleOpen());
    this.shadowRoot.querySelector("#tab-metrics")?.addEventListener("click", () => this.setActiveTab("metrics"));
    this.shadowRoot.querySelector("#tab-events")?.addEventListener("click", () => this.setActiveTab("events"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-layer-card")) {
  customElements.define("nai-layer-card", NaiLayerCard);
}
