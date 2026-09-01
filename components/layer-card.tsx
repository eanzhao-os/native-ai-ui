"use client";

import { useId, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * KUMO-STYLE LAYER CARD (RESOURCE METRICS & COLLAPSIBLE)
 * ───────────────────────────────────────────────────────── */

const TAB_KEYS = ["metrics", "events"] as const;
type TabKey = (typeof TAB_KEYS)[number];

export default function LayerCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("layer-card", propLang);
  const zh = lang === "zh";

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("metrics");
  const [actionStatus, setActionStatus] = useState(zh ? "工作节点已就绪" : "Worker ready");
  const instanceId = useId();
  const contentId = `${instanceId}-details`;
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    events: null,
    metrics: null,
  });

  const tabLabel = (tab: TabKey) =>
    tab === "metrics"
      ? zh
        ? "遥测监控指标"
        : "Telemetry Metrics"
      : zh
        ? "实时审计事件"
        : "Live Audit Events";

  const selectTab = (tab: TabKey, focus = false) => {
    setActiveTab(tab);
    if (focus) tabRefs.current[tab]?.focus();
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tab: TabKey) => {
    const index = TAB_KEYS.indexOf(tab);
    let next: TabKey | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = TAB_KEYS[(index + 1) % TAB_KEYS.length];
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = TAB_KEYS[(index - 1 + TAB_KEYS.length) % TAB_KEYS.length];
    } else if (event.key === "Home") {
      next = TAB_KEYS[0];
    } else if (event.key === "End") {
      next = TAB_KEYS[TAB_KEYS.length - 1];
    }
    if (!next) return;
    event.preventDefault();
    selectTab(next, true);
  };

  const disclosureLabel = isOpen
    ? zh
      ? "折叠 Harness 边缘工作节点详情"
      : "Collapse Harness Edge Worker details"
    : zh
      ? "展开 Harness 边缘工作节点详情"
      : "Expand Harness Edge Worker details";

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {/* Top Layer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-inset px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Harness 边缘工作节点" : "Harness Edge Worker"}
              </h3>
              <span className="rounded-chip bg-green-tint px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-green">
                {zh ? "健康" : "Healthy"}
              </span>
            </div>
            <span className="block break-all font-mono text-[10.5px] leading-relaxed text-ink-2">
              worker-harness-session-prod • us-east-1
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label={disclosureLabel}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((current) => !current)}
          className="flex size-11 shrink-0 items-center justify-center rounded-control border border-line-strong bg-surface text-ink-2 shadow-btn hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
          title={disclosureLabel}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Collapsible Content */}
      <div
        id={contentId}
        role="region"
        aria-label={zh ? "Harness 边缘工作节点详情" : "Harness Edge Worker details"}
        hidden={!isOpen}
        className="p-4"
      >
        {/* Subheader & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-3">
          <div
            role="tablist"
            aria-label={zh ? "工作节点详情" : "Worker details"}
            className="flex rounded-control bg-field p-0.5 text-[11px]"
          >
            {TAB_KEYS.map((tab) => {
              const selected = activeTab === tab;
              const tabId = `${instanceId}-${tab}-tab`;
              const panelId = `${instanceId}-${tab}-panel`;
              return (
                <button
                  key={tab}
                  ref={(element) => {
                    tabRefs.current[tab] = element;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(tab)}
                  onKeyDown={(event) => handleTabKeyDown(event, tab)}
                  className={`min-h-11 rounded-control px-3 font-medium focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer ${
                    selected ? "bg-surface text-ink shadow-sm" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {tabLabel(tab)}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[10.5px] text-ink-2">
            {zh ? "5秒前已更新" : "Last updated 5s ago"}
          </span>
        </div>

        {/* Tab Body */}
        <div
          id={`${instanceId}-metrics-panel`}
          role="tabpanel"
          aria-labelledby={`${instanceId}-metrics-tab`}
          hidden={activeTab !== "metrics"}
          className="mt-3 grid grid-cols-1 gap-2 text-center sm:grid-cols-3"
        >
          <div className="rounded-control border border-line bg-inset/50 p-2.5">
            <span className="text-[10.5px] text-ink-2">{zh ? "每分钟请求数" : "Requests / min"}</span>
            <span className="mt-0.5 block font-mono text-[14px] font-semibold text-ink">1,480</span>
          </div>
          <div className="rounded-control border border-line bg-inset/50 p-2.5">
            <span className="text-[10.5px] text-ink-2">{zh ? "P95 延迟" : "P95 Latency"}</span>
            <span className="mt-0.5 block font-mono text-[14px] font-semibold text-ink">18.2ms</span>
          </div>
          <div className="rounded-control border border-line bg-inset/50 p-2.5">
            <span className="text-[10.5px] text-ink-2">{zh ? "请求成功率" : "Success Rate"}</span>
            <span className="mt-0.5 block font-mono text-[14px] font-semibold text-green">99.98%</span>
          </div>
        </div>
        <div
          id={`${instanceId}-events-panel`}
          role="tabpanel"
          aria-labelledby={`${instanceId}-events-tab`}
          hidden={activeTab !== "events"}
          className="mt-3 flex flex-col gap-1.5 font-mono text-[10.5px]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-control bg-page p-2.5 text-ink-2">
            <span>{zh ? "[21:49:02] Cordis.Loader 初始化了 4 个服务" : "[21:49:02] Cordis.Loader initialized 4 services"}</span>
            <span className="font-medium text-green">OK</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-control bg-page p-2.5 text-ink-2">
            <span>{zh ? "[21:49:15] E2B 沙盒快照创建成功 (142MB)" : "[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
            <span className="font-medium text-accent">SNAPSHOT</span>
          </div>
        </div>
      </div>

      {/* Layer Card Footer Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-inset/70 px-4 py-2.5 text-[11.5px]">
        <div className="min-w-0">
          <span className="block text-ink-2">{zh ? "Kumo LayerCard 分层架构" : "Kumo LayerCard pattern"}</span>
          <span
            role="status"
            aria-label={zh ? "工作节点操作状态" : "Worker action status"}
            aria-live="polite"
            aria-atomic="true"
            className="mt-0.5 block text-[10.5px] font-medium text-accent-ink"
          >
            {actionStatus}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActionStatus(zh ? "缓存已清除" : "Cache purged")}
            className="min-h-11 rounded-control border border-line-strong bg-surface px-3 text-[11px] font-medium text-ink-2 shadow-btn hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors motion-reduce:transition-none cursor-pointer"
          >
            {zh ? "清除缓存" : "Purge Cache"}
          </button>
          <button
            type="button"
            onClick={() => setActionStatus(zh ? "变更已部署" : "Changes deployed")}
            className="min-h-11 rounded-control bg-accent px-3.5 text-[11px] font-medium text-white shadow-sm hover:opacity-90 focus-visible:shadow-[inset_0_0_0_2px_var(--ink)] focus-visible:outline-none transition-opacity motion-reduce:transition-none cursor-pointer"
          >
            {zh ? "部署变更" : "Deploy Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
