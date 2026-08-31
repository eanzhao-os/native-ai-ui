"use client";

import { useId, useState } from "react";
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
  scope: "Kernel" | "Harness" | "Extension";
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

function scopeLabel(scope: PluginNode["scope"], zh: boolean) {
  if (!zh) return scope;
  if (scope === "Kernel") return "内核";
  if (scope === "Harness") return "框架层";
  return "扩展";
}

export default function CordisPluginTree({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("cordis-plugin-tree", propLang);
  const zh = lang === "zh";
  const treeId = useId();

  const [plugins, setPlugins] = useState<PluginNode[]>(INITIAL_PLUGINS);
  const [expandedIds, setExpandedIds] = useState<string[]>([
    INITIAL_PLUGINS[0].id,
  ]);
  const [reloadingId, setReloadingId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleDisclosure = (id: string) => {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((expandedId) => expandedId !== id)
        : [...current, id],
    );
  };

  const handleTriggerHmr = (id: string) => {
    const plugin = plugins.find((item) => item.id === id);
    if (!plugin || !plugin.enabled || reloadingId) return;
    setReloadingId(id);
    setAnnouncement(
      zh ? `正在热重载 ${plugin.name}` : `Reloading ${plugin.name}`,
    );
    setTimeout(() => {
      setPlugins((current) =>
        current.map((item) =>
          item.id === id
            ? { ...item, hmrVersion: item.hmrVersion + 1 }
            : item,
        ),
      );
      setReloadingId(null);
      setAnnouncement(
        zh
          ? `${plugin.name} 已热重载至修订 ${plugin.hmrVersion + 1}`
          : `${plugin.name} reloaded to revision ${plugin.hmrVersion + 1}`,
      );
    }, 800);
  };

  const handleToggle = (id: string) => {
    const plugin = plugins.find((item) => item.id === id);
    if (!plugin || reloadingId === id) return;
    const enabled = !plugin.enabled;
    setPlugins((current) =>
      current.map((item) => (item.id === id ? { ...item, enabled } : item)),
    );
    setAnnouncement(
      zh
        ? `${plugin.name} 已${enabled ? "启用" : "禁用"}`
        : `${plugin.name} ${enabled ? "enabled" : "disabled"}`,
    );
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card dark:border-line-strong">
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3.5 dark:border-line-strong">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 2 7l10 5 10-5-10-5Z" />
              <path d="m2 12 10 5 10-5M2 17l10 5 10-5" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Cordis 插件运行时拓扑" : "Cordis Plugin Runtime"}
              </h3>
              <span className="rounded-chip border border-green/25 bg-green-tint px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-green">
                {zh ? "HMR 热重载就绪" : "HMR Active"}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
              {zh
                ? "Harness 插件微内核服务与消费者拓扑"
                : "Agent harness services, providers, and consumers"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-chip border border-line-strong bg-inset px-2 py-1 font-mono text-[10px] text-ink-2">
          {plugins.filter((plugin) => plugin.enabled).length}{" "}
          {zh ? "个活跃插件" : "active"}
        </span>
      </div>

      <div className="mt-3.5 flex flex-col gap-2.5">
        {plugins.map((plugin) => {
          const isReloading = reloadingId === plugin.id;
          const isExpanded = expandedIds.includes(plugin.id);
          const detailsVisible = plugin.enabled && isExpanded;
          const detailsId = `${treeId}-${plugin.id}-services`;
          const topologyName = zh
            ? `服务拓扑：${plugin.name}`
            : `Service topology: ${plugin.name}`;
          const enabledName = zh
            ? `插件启用状态：${plugin.name}`
            : `Plugin enabled: ${plugin.name}`;

          return (
            <div
              key={plugin.id}
              className={`overflow-hidden rounded-control border transition-colors motion-reduce:transition-none ${
                plugin.enabled
                  ? "border-line-strong bg-inset/25 hover:border-accent/35"
                  : "border-line bg-page/60"
              } dark:border-line-strong`}
            >
              <div className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-1 p-1.5">
                <button
                  type="button"
                  aria-label={enabledName}
                  aria-pressed={plugin.enabled}
                  onClick={() => handleToggle(plugin.id)}
                  disabled={isReloading}
                  className="flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-5 items-center justify-center rounded-full border ${
                      plugin.enabled
                        ? "border-accent/40 bg-accent-tint"
                        : "border-line-strong bg-surface"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        plugin.enabled ? "bg-accent" : "bg-ink-3/35"
                      }`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  aria-controls={detailsId}
                  aria-expanded={detailsVisible}
                  aria-label={topologyName}
                  onClick={() => handleDisclosure(plugin.id)}
                  disabled={!plugin.enabled}
                  className="flex min-h-11 min-w-0 items-center gap-2 rounded-control px-2 text-left transition-colors hover:bg-hover/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed motion-reduce:transition-none"
                >
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 text-ink-3 transition-transform duration-200 motion-reduce:transition-none ${
                      detailsVisible ? "rotate-90" : ""
                    }`}
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                      <span className="truncate font-mono text-[12px] font-semibold text-ink">
                        {plugin.name}
                      </span>
                      <span className="rounded-chip border border-line bg-surface px-1.5 py-0.5 font-mono text-[9px] text-ink-3 dark:border-line-strong">
                        v{plugin.version}
                      </span>
                      <span
                        className={`rounded-chip border px-1.5 py-0.5 font-mono text-[9px] font-medium ${
                          plugin.scope === "Kernel"
                            ? "border-orange/25 bg-orange-tint text-orange"
                            : plugin.scope === "Harness"
                              ? "border-accent/25 bg-accent-tint text-accent-ink"
                              : "border-green/25 bg-green-tint text-green"
                        }`}
                      >
                        {scopeLabel(plugin.scope, zh)}
                      </span>
                    </span>
                    <span className="mt-0.5 block font-mono text-[9.5px] text-ink-3">
                      {plugin.services.length}{" "}
                      {zh ? "项已发布服务" : "published service"}
                    </span>
                  </span>
                </button>

                <div className="flex items-center gap-1 pl-1">
                  <span className="hidden font-mono text-[9.5px] text-ink-3 sm:inline">
                    rev #{plugin.hmrVersion}
                  </span>
                  <button
                    type="button"
                    aria-label={
                      zh
                        ? `热重载 ${plugin.name}`
                        : `Hot reload ${plugin.name}`
                    }
                    aria-busy={isReloading}
                    onClick={() => handleTriggerHmr(plugin.id)}
                    disabled={isReloading || !plugin.enabled}
                    className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-2.5 text-[10.5px] font-medium text-ink-2 transition-colors hover:border-accent/40 hover:bg-accent-tint hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
                  >
                    <svg
                      aria-hidden="true"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        isReloading
                          ? "animate-spin text-accent motion-reduce:animate-none"
                          : ""
                      }
                    >
                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                    </svg>
                    <span>{isReloading ? (zh ? "重载中" : "Reloading") : "HMR"}</span>
                  </button>
                </div>
              </div>

              <div
                id={detailsId}
                role="region"
                aria-label={
                  zh
                    ? `${plugin.name} 服务拓扑详情`
                    : `${plugin.name} service topology details`
                }
                hidden={!detailsVisible}
                className="border-t border-line-strong bg-surface/70 px-3 py-2.5"
              >
                {plugin.services.map((service) => (
                  <div
                    key={service.name}
                    className="relative ml-2 border-l border-accent/35 pl-4"
                  >
                    <span className="absolute -left-px top-3 h-px w-3 bg-accent/45" />
                    <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10.5px] font-semibold text-accent-ink">
                        {service.name}
                      </span>
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="shrink-0 text-ink-3"
                      >
                        <path d="M5 12h14m-4-4 4 4-4 4" />
                      </svg>
                      <span className="min-w-0 truncate font-mono text-[10px] text-ink-2">
                        {service.provider}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[9.5px] font-medium uppercase tracking-[0.08em] text-ink-3">
                        {zh ? "消费者" : "Consumers"}
                      </span>
                      {service.consumers.map((consumer) => (
                        <span
                          key={consumer}
                          className="rounded-chip border border-line-strong bg-field px-1.5 py-0.5 font-mono text-[9px] text-ink-2"
                        >
                          {consumer}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[10.5px] text-ink-3 dark:border-line-strong">
        <span>
          {zh
            ? "Harness.Boot 容器装配耗时 84ms"
            : "Harness.Boot container loaded in 84ms"}
        </span>
        <span className="font-mono">Cordis v0.10.2</span>
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
