import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_PLUGINS = [
  {
    id: "cordis-hmr",
    name: "Cordis.Hmr",
    version: "1.0.4",
    scope: "Kernel",
    enabled: true,
    hmrVersion: 3,
    services: [
      {
        name: "IHmrWatcher",
        provider: "Cordis.Hmr.FileSystemWatcher",
        consumers: ["Harness.Core.AgentLoop", "Harness.Skill"],
        status: "active",
      },
    ],
  },
  {
    id: "harness-llm-deepseek",
    name: "Harness.Llm.DeepSeek",
    version: "0.9.2",
    scope: "Harness",
    enabled: true,
    hmrVersion: 1,
    services: [
      {
        name: "ILlmProvider",
        provider: "DeepSeekReasoningProvider",
        consumers: ["Harness.Core.AgentLoop", "Harness.Compaction"],
        status: "active",
      },
    ],
  },
  {
    id: "harness-sandbox-e2b",
    name: "Harness.Sandbox.E2b",
    version: "0.8.0",
    scope: "Harness",
    enabled: true,
    hmrVersion: 2,
    services: [
      {
        name: "ISandboxRuntime",
        provider: "E2bContainerWorker",
        consumers: ["Harness.CodeRuntime.Tools", "Harness.Terminal.Tools"],
        status: "active",
      },
    ],
  },
  {
    id: "harness-lsp",
    name: "Harness.Lsp.Stdio",
    version: "0.5.1",
    scope: "Extension",
    enabled: true,
    hmrVersion: 1,
    services: [
      {
        name: "ILspDiagnosticsService",
        provider: "OmniSharpStdioBridge",
        consumers: ["Harness.Fs.Tools"],
        status: "active",
      },
    ],
  },
];

export class NaiCordisPluginTree extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._plugins = JSON.parse(JSON.stringify(INITIAL_PLUGINS));
    this._reloadingId = null;
  }

  handleToggle(id) {
    this._plugins = this._plugins.map((p) =>
      p.id === id ? { ...p, enabled: !p.enabled } : p
    );
    this.render();
  }

  handleTriggerHmr(id) {
    this._reloadingId = id;
    this.render();
    this.registerTimeout(() => {
      this._plugins = this._plugins.map((p) =>
        p.id === id ? { ...p, hmrVersion: p.hmrVersion + 1 } : p
      );
      this._reloadingId = null;
      this.render();
    }, 800);
  }

  render() {
    const zh = this.isZh;
    const activeCount = this._plugins.filter((p) => p.enabled).length;

    const extraCss = `
      .bg-inset\\/30 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 30%, transparent); }
      .bg-hover\\/20 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
      .bg-page\\/50 { background-color: color-mix(in srgb, var(--page, #fafafb) 50%, transparent); }
      .bg-surface\\/50 { background-color: color-mix(in srgb, var(--surface, #fff) 50%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .border-line\\/80 { border-color: color-mix(in srgb, var(--line, #ecedef) 80%, transparent); }
      .size-3\\.5 { width: 14px; height: 14px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .max-w-\\[180px\\] { max-width: 180px; }
    `;

    this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        {/* Header */}
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${zh ? "Cordis 插件运行时拓扑" : "Cordis Plugin Runtime"}
                </h3>
                <span class="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                  ${zh ? "HMR 热重载就绪" : "HMR Active"}
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${zh ? "Harness 插件微内核依赖关系图" : "Agent harness plugin dependency graph"}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 font-mono text-[11px] text-ink-2">
            <span class="rounded-chip border border-line bg-inset px-2 py-0.5">
              ${activeCount} ${zh ? "个活跃插件" : "Active Plugins"}
            </span>
          </div>
        </div>

        {/* Plugin Cards List */}
        <div class="mt-3.5 flex flex-col gap-2.5">
          ${this._plugins
            .map((plugin) => {
              const isReloading = this._reloadingId === plugin.id;
              const scopeStyle =
                plugin.scope === "Kernel"
                  ? "bg-orange-tint text-orange"
                  : plugin.scope === "Harness"
                  ? "bg-accent-tint text-accent-ink"
                  : "bg-green-tint text-green";
              const scopeLabel = plugin.scope === "Kernel" ? (zh ? "内核" : "Kernel") : plugin.scope;

              return `
              <div
                class="rounded-control border transition-all ${
                  plugin.enabled
                    ? "border-line bg-inset/30 hover:border-line-strong hover:bg-hover/20"
                    : "border-line/60 bg-page/50 opacity-60"
                }"
              >
                {/* Plugin Header Bar */}
                <div class="flex items-center justify-between p-3">
                  <div class="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      data-toggle="${plugin.id}"
                      class="toggle-btn size-3.5 rounded-full border transition-colors cursor-pointer ${
                        plugin.enabled
                          ? "border-accent bg-accent"
                          : "border-line bg-surface"
                      }"
                      title="${
                        plugin.enabled
                          ? zh
                            ? "禁用插件"
                            : "Disable plugin"
                          : zh
                          ? "启用插件"
                          : "Enable plugin"
                      }"
                    ></button>
                    <span class="text-[12.5px] font-mono font-medium text-ink truncate">
                      ${plugin.name}
                    </span>
                    <span class="rounded-chip border border-line bg-surface px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                      v${plugin.version}
                    </span>
                    <span
                      class="rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${scopeStyle}"
                    >
                      ${scopeLabel}
                    </span>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <span class="font-mono text-[10px] text-ink-3">
                      rev #${plugin.hmrVersion}
                    </span>
                    <button
                      type="button"
                      data-hmr="${plugin.id}"
                      ${isReloading || !plugin.enabled ? "disabled" : ""}
                      class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class="${isReloading ? "animate-spin text-accent" : ""}"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>${isReloading ? (zh ? "重载中..." : "Reloading...") : "HMR"}</span>
                    </button>
                  </div>
                </div>

                {/* Service Definitions */}
                ${
                  plugin.enabled
                    ? `
                  <div class="border-t border-line/60 bg-surface/50 px-3 py-2 text-[11px]">
                    ${plugin.services
                      .map(
                        (svc, i) => `
                      <div class="flex flex-col gap-1 ${i > 0 ? "mt-2" : ""}">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-1.5">
                            <span class="font-mono text-[10.5px] font-semibold text-accent-ink">
                              ${svc.name}
                            </span>
                            <span class="text-ink-3">→</span>
                            <span class="font-mono text-[10px] text-ink-2 truncate max-w-[180px]">
                              ${svc.provider}
                            </span>
                          </div>
                          <span class="font-mono text-[9.5px] text-ink-3">
                            ${svc.consumers.length} ${zh ? "个消费者" : "consumers"}
                          </span>
                        </div>
                        <div class="flex flex-wrap gap-1 mt-0.5">
                          ${svc.consumers
                            .map(
                              (c) => `
                            <span
                              class="rounded-chip border border-line/80 bg-field px-1.5 py-0.2 font-mono text-[9px] text-ink-2"
                            >
                              ${c}
                            </span>
                          `
                            )
                            .join("")}
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `
                    : ""
                }
              </div>
            `;
            })
            .join("")}
        </div>

        {/* Footer */}
        <div class="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${zh ? "Harness.Boot 容器已在 84ms 内装配" : "Harness.Boot container loaded in 84ms"}</span>
          <span class="font-mono">Cordis v0.10.2</span>
        </div>
      </div>
    `, extraCss);

    this.shadowRoot.querySelectorAll("[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-toggle");
        this.handleToggle(id);
      });
    });

    this.shadowRoot.querySelectorAll("[data-hmr]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-hmr");
        this.handleTriggerHmr(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-cordis-plugin-tree")) {
  customElements.define("nai-cordis-plugin-tree", NaiCordisPluginTree);
}
