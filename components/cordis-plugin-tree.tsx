"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * CORDIS PLUGIN & SERVICE TOPOLOGY
 * ───────────────────────────────────────────────────────── */

type ServiceInfo = {
  name: string;
  provider: string;
  consumers: string[];
  status: "active" | "reloading" | "idle";
};

type PluginNode = {
  id: string;
  name: string;
  version: string;
  scope: "Kernel" | "Tether" | "Extension";
  services: ServiceInfo[];
  enabled: boolean;
  hmrVersion: number;
};

const INITIAL_PLUGINS: PluginNode[] = [
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
        consumers: ["Tether.Core.AgentLoop", "Tether.Skill"],
        status: "active",
      },
    ],
  },
  {
    id: "tether-llm-deepseek",
    name: "Tether.Llm.DeepSeek",
    version: "0.9.2",
    scope: "Tether",
    enabled: true,
    hmrVersion: 1,
    services: [
      {
        name: "ILlmProvider",
        provider: "DeepSeekReasoningProvider",
        consumers: ["Tether.Core.AgentLoop", "Tether.Compaction"],
        status: "active",
      },
    ],
  },
  {
    id: "tether-sandbox-e2b",
    name: "Tether.Sandbox.E2b",
    version: "0.8.0",
    scope: "Tether",
    enabled: true,
    hmrVersion: 2,
    services: [
      {
        name: "ISandboxRuntime",
        provider: "E2bContainerWorker",
        consumers: ["Tether.CodeRuntime.Tools", "Tether.Terminal.Tools"],
        status: "active",
      },
    ],
  },
  {
    id: "tether-lsp",
    name: "Tether.Lsp.Stdio",
    version: "0.5.1",
    scope: "Extension",
    enabled: true,
    hmrVersion: 1,
    services: [
      {
        name: "ILspDiagnosticsService",
        provider: "OmniSharpStdioBridge",
        consumers: ["Tether.Fs.Tools"],
        status: "active",
      },
    ],
  },
];

export default function CordisPluginTree({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("cordis-plugin-tree", propLang);
  const zh = lang === "zh";

  const [plugins, setPlugins] = useState<PluginNode[]>(INITIAL_PLUGINS);
  const [reloadingId, setReloadingId] = useState<string | null>(null);

  const handleTriggerHmr = (id: string) => {
    setReloadingId(id);
    setTimeout(() => {
      setPlugins((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, hmrVersion: p.hmrVersion + 1 }
            : p
        )
      );
      setReloadingId(null);
    }, 800);
  };

  const handleToggle = (id: string) => {
    setPlugins((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Cordis 插件运行时拓扑" : "Cordis Plugin Runtime"}
              </h3>
              <span className="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                {zh ? "HMR 热重载就绪" : "HMR Active"}
              </span>
            </div>
            <p className="text-[11px] text-ink-3">
              {zh ? "Tether 插件微内核依赖关系图" : "Tether harness plugin dependency graph"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-ink-2">
          <span className="rounded-chip border border-line bg-inset px-2 py-0.5">
            {plugins.filter((p) => p.enabled).length} {zh ? "个活跃插件" : "Active Plugins"}
          </span>
        </div>
      </div>

      {/* Plugin Cards List */}
      <div className="mt-3.5 flex flex-col gap-2.5">
        {plugins.map((plugin) => {
          const isReloading = reloadingId === plugin.id;
          return (
            <div
              key={plugin.id}
              className={`rounded-control border transition-all ${
                plugin.enabled
                  ? "border-line bg-inset/30 hover:border-line-strong hover:bg-hover/20"
                  : "border-line/60 bg-page/50 opacity-60"
              }`}
            >
              {/* Plugin Header Bar */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(plugin.id)}
                    className={`size-3.5 rounded-full border transition-colors cursor-pointer ${
                      plugin.enabled
                        ? "border-accent bg-accent"
                        : "border-line bg-surface"
                    }`}
                    title={plugin.enabled ? (zh ? "禁用插件" : "Disable plugin") : zh ? "启用插件" : "Enable plugin"}
                  />
                  <span className="text-[12.5px] font-mono font-medium text-ink truncate">
                    {plugin.name}
                  </span>
                  <span className="rounded-chip border border-line bg-surface px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                    v{plugin.version}
                  </span>
                  <span
                    className={`rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${
                      plugin.scope === "Kernel"
                        ? "bg-orange-tint text-orange"
                        : plugin.scope === "Tether"
                        ? "bg-accent-tint text-accent-ink"
                        : "bg-green-tint text-green"
                    }`}
                  >
                    {plugin.scope === "Kernel" ? (zh ? "内核" : "Kernel") : plugin.scope}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[10px] text-ink-3">
                    rev #{plugin.hmrVersion}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTriggerHmr(plugin.id)}
                    disabled={isReloading || !plugin.enabled}
                    className="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={isReloading ? "animate-spin text-accent" : ""}
                    >
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    <span>{isReloading ? (zh ? "重载中..." : "Reloading...") : "HMR"}</span>
                  </button>
                </div>
              </div>

              {/* Service Definitions */}
              {plugin.enabled && (
                <div className="border-t border-line/60 bg-surface/50 px-3 py-2 text-[11px]">
                  {plugin.services.map((svc, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10.5px] font-semibold text-accent-ink">
                            {svc.name}
                          </span>
                          <span className="text-ink-3">→</span>
                          <span className="font-mono text-[10px] text-ink-2 truncate max-w-[180px]">
                            {svc.provider}
                          </span>
                        </div>
                        <span className="font-mono text-[9.5px] text-ink-3">
                          {svc.consumers.length} {zh ? "个消费者" : "consumers"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {svc.consumers.map((c, ci) => (
                          <span
                            key={ci}
                            className="rounded-chip border border-line/80 bg-field px-1.5 py-0.2 font-mono text-[9px] text-ink-2"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "Tether.Boot 容器已在 84ms 内装配" : "Tether.Boot container loaded in 84ms"}</span>
        <span className="font-mono">Cordis v0.10.2</span>
      </div>
    </div>
  );
}
