"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * KUMO-STYLE LAYER CARD (RESOURCE METRICS & COLLAPSIBLE)
 * ───────────────────────────────────────────────────────── */

export default function LayerCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("layer-card", propLang);
  const zh = lang === "zh";

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"metrics" | "events">("metrics");

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all">
      {/* Top Layer Header */}
      <div className="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-control bg-accent-tint text-accent-ink font-semibold text-[12px]">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Tether 边缘工作节点" : "Tether Edge Worker"}
              </h3>
              <span className="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                {zh ? "健康" : "Healthy"}
              </span>
            </div>
            <span className="font-mono text-[10.5px] text-ink-3">
              worker-tether-session-prod • us-east-1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-7 items-center justify-center rounded-control border border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            title={isOpen ? (zh ? "折叠" : "Collapse") : zh ? "展开" : "Expand"}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="p-4">
          {/* Subheader & Tabs */}
          <div className="flex items-center justify-between pb-3 border-b border-line/60">
            <div className="flex rounded-control bg-field p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("metrics")}
                className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                  activeTab === "metrics"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {zh ? "遥测监控指标" : "Telemetry Metrics"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("events")}
                className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                  activeTab === "events"
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {zh ? "实时审计事件" : "Live Audit Events"}
              </button>
            </div>

            <span className="font-mono text-[10.5px] text-ink-3">
              {zh ? "5秒前已更新" : "Last updated 5s ago"}
            </span>
          </div>

          {/* Tab Body */}
          {activeTab === "metrics" ? (
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-control border border-line bg-inset/40 p-2.5">
                <span className="text-[10.5px] text-ink-3">{zh ? "每分钟请求数" : "Requests / min"}</span>
                <span className="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                  1,480
                </span>
              </div>
              <div className="rounded-control border border-line bg-inset/40 p-2.5">
                <span className="text-[10.5px] text-ink-3">{zh ? "P95 延迟" : "P95 Latency"}</span>
                <span className="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                  18.2ms
                </span>
              </div>
              <div className="rounded-control border border-line bg-inset/40 p-2.5">
                <span className="text-[10.5px] text-ink-3">{zh ? "请求成功率" : "Success Rate"}</span>
                <span className="mt-0.5 block font-mono text-[14px] font-semibold text-green">
                  99.98%
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-1.5 font-mono text-[10.5px]">
              <div className="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                <span>{zh ? "[21:49:02] Cordis.Loader 初始化了 4 个服务" : "[21:49:02] Cordis.Loader initialized 4 services"}</span>
                <span className="text-green font-medium">OK</span>
              </div>
              <div className="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                <span>{zh ? "[21:49:15] E2B 沙盒快照创建成功 (142MB)" : "[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
                <span className="text-accent font-medium">SNAPSHOT</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Layer Card Footer Action Toolbar */}
      <div className="flex items-center justify-between border-t border-line bg-inset/60 px-4 py-2 text-[11.5px]">
        <span className="text-ink-3">{zh ? "Kumo LayerCard 分层架构" : "Kumo LayerCard pattern"}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-control border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
          >
            {zh ? "清除缓存" : "Purge Cache"}
          </button>
          <button
            type="button"
            className="rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            {zh ? "部署变更" : "Deploy Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
