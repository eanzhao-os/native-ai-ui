"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SANDBOX RUNTIME & CONTAINER MANAGER
 * ───────────────────────────────────────────────────────── */

type ProcessInfo = {
  pid: number;
  command: string;
  cpuPct: number;
  memMb: number;
  uptimeEn: string;
  uptimeZh: string;
};

const SAMPLE_PROCESSES: ProcessInfo[] = [
  {
    pid: 1402,
    command: "dotnet run --project src/Tether.Boot",
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

export default function SandboxManager({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("sandbox-manager", propLang);
  const zh = lang === "zh";

  const [isRunning, setIsRunning] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(15.5);
  const [memUsage, setMemUsage] = useState(325);

  const handleRestart = () => {
    setIsRunning(false);
    setTimeout(() => {
      setIsRunning(true);
      setCpuUsage(8.2);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-green-tint text-green">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" />
              <line x1="6" y1="18" x2="6.01" y2="18" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "E2B 容器沙盒运行态" : "E2B Sandbox Container"}
              </h3>
              <span
                className={`rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${
                  isRunning ? "bg-green-tint text-green" : "bg-orange-tint text-orange"
                }`}
              >
                {isRunning ? (zh ? "运行中" : "Running") : zh ? "重启中..." : "Restarting..."}
              </span>
            </div>
            <p className="text-[11px] text-ink-3">
              {zh ? "隔离环境 Linux x86_64 • Tether.Sandbox.E2b" : "Isolated Linux x86_64 • Tether.Sandbox.E2b"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRestart}
          disabled={!isRunning}
          className="flex items-center gap-1 rounded-control border border-line bg-field px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span>{zh ? "重启容器" : "Restart Container"}</span>
        </button>
      </div>

      {/* Resource Metrics Gauges */}
      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <div className="rounded-control border border-line bg-inset/40 p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-ink-3">{zh ? "vCPU 算力利用率" : "vCPU Utilization"}</span>
            <span className="font-mono text-[12px] font-semibold text-ink">{cpuUsage}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${cpuUsage * 2}%` }}
            />
          </div>
          <span className="mt-1 block font-mono text-[9.5px] text-ink-3">
            {zh ? "独占 2 核心 vCPU" : "2 vCPUs dedicated"}
          </span>
        </div>

        <div className="rounded-control border border-line bg-inset/40 p-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] text-ink-3">{zh ? "内存占用 (RAM)" : "Memory (RAM)"}</span>
            <span className="font-mono text-[12px] font-semibold text-ink">{memUsage} MB</span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
            <div
              className="h-full bg-green rounded-full transition-all duration-500"
              style={{ width: `${(memUsage / 2048) * 100}%` }}
            />
          </div>
          <span className="mt-1 block font-mono text-[9.5px] text-ink-3">
            {zh ? "内存配额上限: 2,048 MB" : "Limit: 2,048 MB"}
          </span>
        </div>
      </div>

      {/* Process Table */}
      <div className="mt-3.5 rounded-control border border-line bg-inset/30 p-3">
        <span className="text-[11px] font-semibold text-ink">
          {zh ? "活动隔离进程树" : "Active Isolated Processes"}
        </span>
        <div className="mt-2 flex flex-col divide-y divide-line/60">
          {SAMPLE_PROCESSES.map((p) => (
            <div key={p.pid} className="flex items-center justify-between py-2 text-[11px]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] text-ink-3">#{p.pid}</span>
                <span className="font-mono text-[11px] font-medium text-ink truncate max-w-[240px]">
                  {p.command}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-ink-2 shrink-0">
                <span>{p.cpuPct}% CPU</span>
                <span>•</span>
                <span>{p.memMb} MB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
