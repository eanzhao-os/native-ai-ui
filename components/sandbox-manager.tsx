"use client";

import { useId, useState } from "react";
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

export default function SandboxManager({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("sandbox-manager", propLang);
  const zh = lang === "zh";
  const managerId = useId();

  const [isRunning, setIsRunning] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(15.5);
  const [memUsage, setMemUsage] = useState(325);
  const [expandedPid, setExpandedPid] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleRestart = () => {
    if (!isRunning) return;
    setIsRunning(false);
    setAnnouncement(zh ? "正在重启 E2B 容器" : "Restarting E2B container");
    setTimeout(() => {
      setIsRunning(true);
      setCpuUsage(8.2);
      setMemUsage(212);
      setAnnouncement(
        zh
          ? "E2B 容器已重启，资源指标已刷新"
          : "E2B container restarted; resource metrics refreshed",
      );
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card dark:border-line-strong">
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3.5 dark:border-line-strong">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-control bg-green-tint text-green">
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
              <rect x="2" y="2" width="20" height="8" rx="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" />
              <path d="M6 6h.01M6 18h.01" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "E2B 容器沙盒运行态" : "E2B Sandbox Container"}
              </h3>
              <span
                className={`rounded-chip border px-1.5 py-0.5 font-mono text-[9.5px] font-medium ${
                  isRunning
                    ? "border-green/25 bg-green-tint text-green"
                    : "border-orange/25 bg-orange-tint text-orange"
                }`}
              >
                {isRunning
                  ? zh
                    ? "运行中"
                    : "Running"
                  : zh
                    ? "重启中"
                    : "Restarting"}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
              {zh
                ? "隔离 Linux x86_64 · Harness.Sandbox.E2b"
                : "Isolated Linux x86_64 · Harness.Sandbox.E2b"}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={zh ? "重启容器" : "Restart Container"}
          onClick={handleRestart}
          disabled={!isRunning}
          aria-busy={!isRunning}
          className="flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-control border border-line-strong bg-field px-3 text-[10.5px] font-medium text-ink-2 transition-colors hover:border-accent/35 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-wait disabled:opacity-50 motion-reduce:transition-none"
        >
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              !isRunning
                ? "animate-spin text-orange motion-reduce:animate-none"
                : ""
            }
          >
            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
          </svg>
          <span>
            {!isRunning
              ? zh
                ? "正在重启"
                : "Restarting"
              : zh
                ? "重启容器"
                : "Restart Container"}
          </span>
        </button>
      </div>

      <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="rounded-control border border-line-strong bg-inset/40 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10.5px] font-medium text-ink-3">
              {zh ? "vCPU 算力利用率" : "vCPU Utilization"}
            </span>
            <span className="font-mono text-[12px] font-semibold tabular-nums text-ink">
              {cpuUsage}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={zh ? "vCPU 算力利用率" : "vCPU utilization"}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={cpuUsage}
            className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${cpuUsage}%` }}
            />
          </div>
          <span className="mt-1.5 block font-mono text-[9.5px] text-ink-3">
            {zh ? "独占 2 核 vCPU" : "2 dedicated vCPUs"}
          </span>
        </div>

        <div className="rounded-control border border-line-strong bg-inset/40 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[10.5px] font-medium text-ink-3">
              {zh ? "内存占用" : "Memory (RAM)"}
            </span>
            <span className="font-mono text-[12px] font-semibold tabular-nums text-ink">
              {memUsage} MB
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={zh ? "内存占用" : "Memory usage"}
            aria-valuemin={0}
            aria-valuemax={2048}
            aria-valuenow={memUsage}
            className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line"
          >
            <div
              className="h-full rounded-full bg-green transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${(memUsage / 2048) * 100}%` }}
            />
          </div>
          <span className="mt-1.5 block font-mono text-[9.5px] text-ink-3">
            {zh ? "配额上限 2,048 MB" : "2,048 MB limit"}
          </span>
        </div>
      </div>

      <div className="mt-3.5 overflow-hidden rounded-control border border-line-strong bg-inset/30">
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2.5 dark:border-line-strong">
          <span className="text-[11px] font-semibold text-ink">
            {zh ? "活动隔离进程树" : "Active Isolated Processes"}
          </span>
          <span className="rounded-chip bg-field px-1.5 py-0.5 font-mono text-[9px] text-ink-3">
            {SAMPLE_PROCESSES.length} {zh ? "个进程" : "processes"}
          </span>
        </div>

        <div role="list" className="divide-y divide-line dark:divide-line-strong">
          {SAMPLE_PROCESSES.map((process) => {
            const isExpanded = expandedPid === process.pid;
            const detailsId = `${managerId}-process-${process.pid}`;
            const disclosureName = zh
              ? `进程 ${process.pid}：${process.command}`
              : `Process ${process.pid}: ${process.command}`;
            return (
              <div key={process.pid} role="listitem">
                <button
                  type="button"
                  aria-label={disclosureName}
                  aria-controls={detailsId}
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedPid((current) =>
                      current === process.pid ? null : process.pid,
                    )
                  }
                  className="grid min-h-11 w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-2 px-3 py-1.5 text-left transition-colors hover:bg-hover/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/55 motion-reduce:transition-none"
                >
                  <span className="font-mono text-[9.5px] text-ink-3">
                    #{process.pid}
                  </span>
                  <code className="min-w-0 truncate font-mono text-[10.5px] font-medium text-ink">
                    {process.command}
                  </code>
                  <span className="hidden whitespace-nowrap font-mono text-[9.5px] tabular-nums text-ink-2 sm:inline">
                    {process.cpuPct}% · {process.memMb} MB
                  </span>
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
                    className={`text-ink-3 transition-transform duration-200 motion-reduce:transition-none ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div
                  id={detailsId}
                  role="region"
                  aria-label={
                    zh
                      ? `进程 ${process.pid} 详情`
                      : `Process ${process.pid} details`
                  }
                  hidden={!isExpanded}
                  className="border-t border-line bg-surface/65 px-3 py-2.5 dark:border-line-strong"
                >
                  <dl className="grid grid-cols-3 gap-2 text-[9.5px]">
                    <div className="rounded-control border border-line-strong bg-field/70 px-2 py-1.5">
                      <dt className="text-ink-3">{zh ? "运行时长" : "Uptime"}</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-ink">
                        {zh ? process.uptimeZh : process.uptimeEn}
                      </dd>
                    </div>
                    <div className="rounded-control border border-line-strong bg-field/70 px-2 py-1.5">
                      <dt className="text-ink-3">CPU</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-ink">
                        {process.cpuPct}%
                      </dd>
                    </div>
                    <div className="rounded-control border border-line-strong bg-field/70 px-2 py-1.5">
                      <dt className="text-ink-3">{zh ? "内存" : "Memory"}</dt>
                      <dd className="mt-0.5 font-mono font-semibold text-ink">
                        {process.memMb} MB
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
