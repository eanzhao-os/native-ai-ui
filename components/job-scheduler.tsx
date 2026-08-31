"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * DURABLE JOB SCHEDULER & CRON MONITOR
 * ───────────────────────────────────────────────────────── */

type JobStatus = "Success" | "Running" | "Failed";

type JobItem = {
  id: string;
  nameEn: string;
  nameZh: string;
  cron: string;
  nextRunEn: string;
  nextRunZh: string;
  lastStatusEn: JobStatus;
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
    nameZh: "遥测日志批量聚合导出",
    cron: "0 0 * * *",
    nextRunEn: "At 00:00 UTC",
    nextRunZh: "今天 00:00 UTC",
    lastStatusEn: "Running",
    lastStatusZh: "执行中",
    enabled: true,
  },
];

function statusClasses(status: JobStatus) {
  if (status === "Success") {
    return "border-green/25 bg-green-tint text-green";
  }
  if (status === "Failed") {
    return "border-red/25 bg-red-tint text-red";
  }
  return "border-accent/25 bg-accent-tint text-accent-ink";
}

export default function JobScheduler({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("job-scheduler", propLang);
  const zh = lang === "zh";

  const [jobs, setJobs] = useState<JobItem[]>(INITIAL_JOBS);
  const [triggeringId, setTriggeringId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleToggle = (id: string) => {
    const job = jobs.find((item) => item.id === id);
    if (!job || triggeringId === id) return;
    const enabled = !job.enabled;
    setJobs((current) =>
      current.map((item) => (item.id === id ? { ...item, enabled } : item)),
    );
    setAnnouncement(
      zh
        ? `${job.nameZh} 已${enabled ? "启用" : "暂停"}`
        : `${job.nameEn} ${enabled ? "enabled" : "paused"}`,
    );
  };

  const handleTriggerNow = (id: string) => {
    const job = jobs.find((item) => item.id === id);
    if (
      !job ||
      !job.enabled ||
      job.lastStatusEn === "Running" ||
      triggeringId
    ) {
      return;
    }

    setTriggeringId(id);
    setJobs((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              lastStatusEn: "Running",
              lastStatusZh: "执行中",
            }
          : item,
      ),
    );
    setAnnouncement(
      zh ? `正在立即执行 ${job.nameZh}` : `Running ${job.nameEn} now`,
    );

    setTimeout(() => {
      setJobs((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                lastStatusEn: "Success",
                lastStatusZh: "执行成功",
              }
            : item,
        ),
      );
      setTriggeringId(null);
      setAnnouncement(
        zh
          ? `${job.nameZh} 已成功完成`
          : `${job.nameEn} completed successfully`,
      );
    }, 1200);
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
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "持久化任务与 Cron 调度" : "Durable Job Scheduler"}
              </h3>
              <span className="rounded-chip border border-line-strong bg-inset px-1.5 py-0.5 font-mono text-[9px] text-ink-3">
                Harness.Jobs
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
              {zh
                ? "持久化 Cron 触发器与后台执行队列"
                : "Durable cron triggers and background execution queue"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-chip border border-line-strong bg-inset px-2 py-1 font-mono text-[9.5px] text-ink-2">
          {jobs.filter((job) => job.enabled).length}{" "}
          {zh ? "个活跃任务" : "active jobs"}
        </span>
      </div>

      <div role="list" className="mt-3.5 flex flex-col gap-2.5">
        {jobs.map((job) => {
          const name = zh ? job.nameZh : job.nameEn;
          const isTriggering = triggeringId === job.id;
          const triggerDisabled =
            Boolean(triggeringId) ||
            !job.enabled ||
            job.lastStatusEn === "Running";
          return (
            <div
              key={job.id}
              role="listitem"
              aria-label={name}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-control border p-2.5 transition-colors motion-reduce:transition-none ${
                job.enabled
                  ? "border-line-strong bg-inset/35 hover:border-accent/35"
                  : "border-line bg-page/55"
              } dark:border-line-strong`}
            >
              <div className="grid min-w-0 grid-cols-[44px_minmax(0,1fr)] items-center gap-1">
                <button
                  type="button"
                  aria-label={
                    zh ? `任务启用状态：${name}` : `Job enabled: ${name}`
                  }
                  aria-pressed={job.enabled}
                  onClick={() => handleToggle(job.id)}
                  disabled={isTriggering}
                  className="flex size-11 items-center justify-center rounded-control transition-colors hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className={`relative h-5 w-8 rounded-full border transition-colors motion-reduce:transition-none ${
                      job.enabled
                        ? "border-accent/45 bg-accent-tint"
                        : "border-line-strong bg-field"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-3.5 rounded-full transition-[left,background-color] motion-reduce:transition-none ${
                        job.enabled
                          ? "left-[14px] bg-accent"
                          : "left-0.5 bg-ink-3/55"
                      }`}
                    />
                  </span>
                </button>

                <div className="min-w-0 py-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    <span
                      className={`min-w-0 truncate text-[11.5px] font-semibold ${
                        job.enabled ? "text-ink" : "text-ink-3"
                      }`}
                    >
                      {name}
                    </span>
                    <code className="rounded-chip border border-line bg-field px-1.5 py-0.5 font-mono text-[9px] text-ink-2 dark:border-line-strong">
                      {job.cron}
                    </code>
                  </div>
                  <span className="mt-1 block text-[10px] text-ink-3">
                    {zh ? "下次运行：" : "Next run: "}
                    {zh ? job.nextRunZh : job.nextRunEn}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <span
                  className={`rounded-chip border px-1.5 py-0.5 font-mono text-[9px] font-medium ${statusClasses(
                    job.lastStatusEn,
                  )}`}
                >
                  {zh ? job.lastStatusZh : job.lastStatusEn}
                </span>

                <button
                  type="button"
                  aria-label={zh ? `立即触发 ${name}` : `Trigger ${name}`}
                  aria-busy={isTriggering}
                  onClick={() => handleTriggerNow(job.id)}
                  disabled={triggerDisabled}
                  className="min-h-11 min-w-11 rounded-control border border-line-strong bg-surface px-2.5 text-[10.5px] font-medium text-ink-2 transition-colors hover:border-accent/40 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none"
                >
                  {isTriggering
                    ? zh
                      ? "执行中…"
                      : "Running…"
                    : zh
                      ? "立即触发"
                      : "Trigger"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
