"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * DURABLE JOB SCHEDULER & CRON MONITOR
 * ───────────────────────────────────────────────────────── */

type JobItem = {
  id: string;
  nameEn: string;
  nameZh: string;
  cron: string;
  nextRunEn: string;
  nextRunZh: string;
  lastStatusEn: "Success" | "Running" | "Failed";
  lastStatusZh: "执行成功" | "执行中" | "失败";
  enabled: boolean;
};

const INITIAL_JOBS: JobItem[] = [
  {
    id: "job-1",
    nameEn: "Vector Embeddings Sync & Reindex",
    nameZh: "向量嵌入同步与全量重索引",
    cron: "0 */4 * * *",
    nextRunEn: "In 1h 24m",
    nextRunZh: "1小时24分后",
    lastStatusEn: "Success",
    lastStatusZh: "执行成功",
    enabled: true,
  },
  {
    id: "job-2",
    nameEn: "Durable SQLite Session Snapshot",
    nameZh: "SQLite 会话不可变事实快照",
    cron: "0 * * * *",
    nextRunEn: "In 18m",
    nextRunZh: "18分钟后",
    lastStatusEn: "Success",
    lastStatusZh: "执行成功",
    enabled: true,
  },
  {
    id: "job-3",
    nameEn: "Telemetry Batch Export & Rollup",
    nameZh: "遥测遥控日志批量聚合导出",
    cron: "0 0 * * *",
    nextRunEn: "At 00:00 UTC",
    nextRunZh: "今天 00:00 UTC",
    lastStatusEn: "Running",
    lastStatusZh: "执行中",
    enabled: true,
  },
];

export default function JobScheduler({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("job-scheduler", propLang);
  const zh = lang === "zh";

  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS);
  const [triggeringId, setTriggeringId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, enabled: !j.enabled } : j))
    );
  };

  const handleTriggerNow = (id: string) => {
    setTriggeringId(id);
    setTimeout(() => {
      setTriggeringId(null);
    }, 1200);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "持久化任务与 Cron 调度" : "Durable Job Scheduler"}
              </h3>
              <span className="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                Tether.Jobs
              </span>
            </div>
            <p className="text-[11px] text-ink-3">
              {zh ? "后台持久化 Cron 触发器与执行队列" : "Durable background cron triggers & queue"}
            </p>
          </div>
        </div>

        <span className="font-mono text-[11px] text-ink-2">
          {jobs.filter((j) => j.enabled).length} {zh ? "个活跃 Cron" : "Active Crons"}
        </span>
      </div>

      {/* Jobs List */}
      <div className="mt-3.5 flex flex-col gap-2">
        {jobs.map((job) => {
          const isTriggering = triggeringId === job.id;
          return (
            <div
              key={job.id}
              className={`flex items-center justify-between rounded-control border p-3 transition-all ${
                job.enabled
                  ? "border-line bg-inset/40 hover:border-line-strong hover:bg-hover/20"
                  : "border-line/60 bg-page/40 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggle(job.id)}
                  className={`size-3.5 rounded-full border transition-colors cursor-pointer shrink-0 ${
                    job.enabled ? "border-accent bg-accent" : "border-line bg-surface"
                  }`}
                  title={job.enabled ? (zh ? "禁用定时任务" : "Disable cron") : zh ? "启用定时任务" : "Enable cron"}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium text-ink truncate">
                      {zh ? job.nameZh : job.nameEn}
                    </span>
                    <span className="rounded-chip bg-field px-1.5 py-0.2 font-mono text-[9.5px] text-ink-2">
                      {job.cron}
                    </span>
                  </div>
                  <span className="text-[10.5px] text-ink-3">
                    {zh ? "下次运行: " : "Next run: "}
                    {zh ? job.nextRunZh : job.nextRunEn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2">
                <span
                  className={`rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${
                    job.lastStatusEn === "Success"
                      ? "bg-green-tint text-green"
                      : "bg-accent-tint text-accent-ink"
                  }`}
                >
                  {zh ? job.lastStatusZh : job.lastStatusEn}
                </span>

                <button
                  type="button"
                  onClick={() => handleTriggerNow(job.id)}
                  disabled={isTriggering || !job.enabled}
                  className="rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-colors cursor-pointer"
                >
                  {isTriggering ? (zh ? "触发中..." : "Running...") : zh ? "立即触发" : "Trigger"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
