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
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
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
        .hmr-tag {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }

        .plugin-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .plugin-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          transition: all 0.2s;
        }
        .plugin-enabled {
          background: rgba(247, 248, 249, 0.3);
        }
        .plugin-enabled:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.2);
        }
        .plugin-disabled {
          background: rgba(250, 250, 251, 0.5);
          border-color: rgba(236, 237, 239, 0.6);
          opacity: 0.6;
        }

        .plugin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
        }
        .plugin-info {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .toggle-btn {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s, border-color 0.15s;
          padding: 0;
        }
        .toggle-active {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
        }
        .plugin-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .version-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .scope-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .scope-kernel { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .scope-harness { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .scope-extension { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }

        .plugin-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .rev-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .btn-hmr {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-hmr:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-hmr:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .services-box {
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          background: rgba(255, 255, 255, 0.5);
          padding: 8px 12px;
          font-size: 11px;
        }
        .service-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .service-target {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .service-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--accent-ink, #0170dd);
        }
        .arrow { color: var(--ink-3, #9a9da3); }
        .provider-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .consumers-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .consumers-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 2px;
        }
        .consumer-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid rgba(236, 237, 239, 0.8);
          background: var(--field, #f2f2f3);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-2, #62656b);
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes spin {
          to { transform: rotate(1turn); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${zh ? "Cordis 插件运行时拓扑" : "Cordis Plugin Runtime"}</h3>
                <span class="hmr-tag">${zh ? "HMR 热重载就绪" : "HMR Active"}</span>
              </div>
              <p class="sub-text">${zh ? "Harness 插件微内核依赖关系图" : "Agent harness plugin dependency graph"}</p>
            </div>
          </div>
          <span class="count-chip">${activeCount} ${zh ? "个活跃插件" : "Active Plugins"}</span>
        </div>

        <div class="plugin-list">
          ${this._plugins
            .map((plugin) => {
              const isReloading = this._reloadingId === plugin.id;
              const scopeClass =
                plugin.scope === "Kernel"
                  ? "scope-kernel"
                  : plugin.scope === "Harness"
                  ? "scope-harness"
                  : "scope-extension";
              const scopeLabel = plugin.scope === "Kernel" ? (zh ? "内核" : "Kernel") : plugin.scope;

              return `
              <div class="plugin-card ${plugin.enabled ? "plugin-enabled" : "plugin-disabled"}">
                <div class="plugin-header">
                  <div class="plugin-info">
                    <button
                      type="button"
                      class="toggle-btn ${plugin.enabled ? "toggle-active" : ""}"
                      data-toggle="${plugin.id}"
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
                    <span class="plugin-name">${plugin.name}</span>
                    <span class="version-chip">v${plugin.version}</span>
                    <span class="scope-badge ${scopeClass}">${scopeLabel}</span>
                  </div>

                  <div class="plugin-actions">
                    <span class="rev-label">rev #${plugin.hmrVersion}</span>
                    <button
                      type="button"
                      class="btn-hmr"
                      data-hmr="${plugin.id}"
                      ${isReloading || !plugin.enabled ? "disabled" : ""}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class="${isReloading ? "spin" : ""}"
                        style="${isReloading ? "color: var(--accent, #0285ff);" : ""}"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>${isReloading ? (zh ? "重载中..." : "Reloading...") : "HMR"}</span>
                    </button>
                  </div>
                </div>

                ${
                  plugin.enabled
                    ? `
                  <div class="services-box">
                    ${plugin.services
                      .map(
                        (svc) => `
                      <div class="service-row">
                        <div class="service-header">
                          <div class="service-target">
                            <span class="service-name">${svc.name}</span>
                            <span class="arrow">→</span>
                            <span class="provider-name">${svc.provider}</span>
                          </div>
                          <span class="consumers-count">${svc.consumers.length} ${
                          zh ? "个消费者" : "consumers"
                        }</span>
                        </div>
                        <div class="consumers-tags">
                          ${svc.consumers
                            .map((c) => `<span class="consumer-tag">${c}</span>`)
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

        <div class="footer">
          <span>${zh ? "Harness.Boot 容器已在 84ms 内装配" : "Harness.Boot container loaded in 84ms"}</span>
          <span class="footer-mono">Cordis v0.10.2</span>
        </div>
      </div>
    `;

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
