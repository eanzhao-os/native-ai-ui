"use client";

import { useId, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * PERMISSION PRESET & AUDIT TRAIL
 * ───────────────────────────────────────────────────────── */

type Preset = {
  id: string;
  nameEn: string;
  nameZh: string;
  sandbox: "E2B Cloud" | "Local Process" | "Host Root";
  approvalEn: string;
  approvalZh: string;
  descEn: string;
  descZh: string;
  icon: "shield" | "scale" | "bolt";
};

const PRESETS: Preset[] = [
  {
    id: "strict",
    nameEn: "Strict Sandboxed",
    nameZh: "严格沙盒隔离",
    sandbox: "E2B Cloud",
    approvalEn: "Strict Prompt",
    approvalZh: "全量拦截审批",
    descEn:
      "Remote isolation with approval before edits, commands, and outbound HTTP.",
    descZh: "远程隔离执行；文件修改、终端命令与外网 HTTP 均需逐项确认。",
    icon: "shield",
  },
  {
    id: "balanced",
    nameEn: "Balanced Dev",
    nameZh: "开发平衡模式",
    sandbox: "Local Process",
    approvalEn: "Write-Only Prompt",
    approvalZh: "仅写操作审批",
    descEn:
      "Workspace-isolated local runtime. Reads auto-approve; write and exec prompt once.",
    descZh: "本地工作区隔离；读取自动放行，写入与执行仅提示一次。",
    icon: "scale",
  },
  {
    id: "autonomous",
    nameEn: "Autonomous Agent",
    nameZh: "全自主执行模式",
    sandbox: "Local Process",
    approvalEn: "Autonomous",
    approvalZh: "完全自主",
    descEn:
      "Automated execution backed by a durable exactly-once SQLite audit ledger.",
    descZh: "自动执行，并由 SQLite Exactly-Once 审计账本保留可重放事实。",
    icon: "bolt",
  },
];

type AuditRecord = {
  id: string;
  action: string;
  target: string;
  statusEn: "Approved" | "Auto-Allowed" | "Denied";
  statusZh: "已批准" | "自动放行" | "已拦截";
  timestamp: string;
  hash: string;
};

const SAMPLE_AUDIT: AuditRecord[] = [
  {
    id: "aud-1",
    action: "fs.write",
    target: "src/Harness.Core/Session.cs",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:12",
    hash: "e4f8a1…3b9c",
  },
  {
    id: "aud-2",
    action: "shell.exec",
    target: "dotnet build Harness.slnx",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:19",
    hash: "82a0bc…19d4",
  },
  {
    id: "aud-3",
    action: "fs.read",
    target: "NuGet.config",
    statusEn: "Auto-Allowed",
    statusZh: "自动放行",
    timestamp: "21:48:22",
    hash: "6c7d1e…90fa",
  },
];

function PresetIcon({ icon }: { icon: Preset["icon"] }) {
  if (icon === "shield") {
    return (
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    );
  }
  if (icon === "scale") {
    return (
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18M8 21h8M5 7l7-4 7 4M3 7h4l-2 6H1l2-6Zm14 0h4l2 6h-4l-2-6Z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

export default function PermissionPresetCard({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("permission-preset-card", propLang);
  const zh = lang === "zh";
  const groupId = useId();

  const [selectedPreset, setSelectedPreset] = useState("balanced");
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayVerified, setReplayVerified] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset.id);
    setAnnouncement(
      zh
        ? `已选择${preset.nameZh}`
        : `Selected ${preset.nameEn}`,
    );
  };

  const handleReplayAudit = () => {
    if (isReplaying) return;
    setIsReplaying(true);
    setReplayVerified(false);
    setAnnouncement(zh ? "正在重放审计流水" : "Replaying audit trail");
    setTimeout(() => {
      setIsReplaying(false);
      setReplayVerified(true);
      setAnnouncement(
        zh
          ? "审计重放完成，3 条记录校验通过"
          : "Audit replay complete; 3 records validated",
      );
    }, 900);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card dark:border-line-strong">
      <div className="flex items-start justify-between gap-3 border-b border-line pb-3.5 dark:border-line-strong">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-control bg-orange-tint text-orange">
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
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "权限预设与审计重放" : "Permission Presets & Auditing"}
            </h3>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
              {zh
                ? "Harness 权限 Bundle 与持久化不可变事实"
                : "Harness authorization bundle and durable facts"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-chip border border-line-strong bg-inset px-2 py-1 font-mono text-[9.5px] text-ink-2">
          {zh ? "Exactly-Once 审计" : "Exactly-Once"}
        </span>
      </div>

      <fieldset
        role="radiogroup"
        aria-label={zh ? "权限预设" : "Permission presets"}
        className="mt-3.5"
      >
        <legend className="sr-only">
          {zh ? "选择权限预设" : "Choose a permission preset"}
        </legend>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            const descriptionId = `${groupId}-${preset.id}-description`;
            const name = zh ? preset.nameZh : preset.nameEn;
            return (
              <label
                key={preset.id}
                className={`relative flex min-h-[172px] cursor-pointer flex-col justify-between rounded-control border p-3 transition-colors focus-within:outline-none motion-reduce:transition-none ${
                  isSelected
                    ? "border-accent bg-accent-tint/35 shadow-sm ring-1 ring-accent/70"
                    : "border-line-strong bg-inset/35 hover:border-accent/35 hover:bg-hover/40"
                } dark:border-line-strong`}
              >
                <input
                  type="radio"
                  name={`permission-preset-${groupId}`}
                  value={preset.id}
                  checked={isSelected}
                  aria-describedby={descriptionId}
                  onChange={() => handlePresetChange(preset)}
                  className="peer sr-only"
                />
                <span className="pointer-events-none absolute inset-0 rounded-control peer-focus-visible:ring-2 peer-focus-visible:ring-accent/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface" />

                <span>
                  <span className="flex items-start justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-control ${
                          isSelected
                            ? "bg-accent text-white"
                            : "bg-field text-ink-2"
                        }`}
                      >
                        <PresetIcon icon={preset.icon} />
                      </span>
                      <span className="text-[11.5px] font-semibold leading-tight text-ink">
                        {name}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold ${
                        isSelected
                          ? "border-accent bg-accent text-white"
                          : "border-line-strong text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </span>
                  <span
                    id={descriptionId}
                    className="mt-2 block text-[10.5px] leading-[1.45] text-ink-2"
                  >
                    {zh ? preset.descZh : preset.descEn}
                  </span>
                </span>

                <span className="mt-3 grid gap-1.5 border-t border-line pt-2.5 font-mono text-[9.5px] dark:border-line-strong">
                  <span className="flex items-start justify-between gap-2 text-ink-3">
                    <span>{zh ? "沙盒" : "Sandbox"}</span>
                    <span className="text-right font-medium text-ink">
                      {preset.sandbox}
                    </span>
                  </span>
                  <span className="flex items-start justify-between gap-2 text-ink-3">
                    <span>{zh ? "审批" : "Approval"}</span>
                    <span className="text-right font-medium text-ink">
                      {zh ? preset.approvalZh : preset.approvalEn}
                    </span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-4 overflow-hidden rounded-control border border-line-strong bg-inset/45">
        <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-1.5 dark:border-line-strong">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-[11.5px] font-semibold text-ink">
              {zh ? "可重放审计流水" : "Replayable Audit Trail"}
            </span>
            {replayVerified && (
              <span className="rounded-chip border border-green/25 bg-green-tint px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-green">
                {zh ? "✓ 校验通过" : "✓ Validated"}
              </span>
            )}
          </div>
          <button
            type="button"
            aria-label={zh ? "重放审计" : "Replay Audit"}
            onClick={handleReplayAudit}
            disabled={isReplaying}
            aria-busy={isReplaying}
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-3 text-[10.5px] font-medium text-ink-2 transition-colors hover:border-accent/35 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
          >
            <svg
              aria-hidden="true"
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                isReplaying
                  ? "animate-spin text-accent motion-reduce:animate-none"
                  : ""
              }
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
            {isReplaying
              ? zh
                ? "正在校验"
                : "Verifying"
              : zh
                ? "重放审计"
                : "Replay Audit"}
          </button>
        </div>

        <div className="divide-y divide-line/70 px-3 dark:divide-line-strong">
          {SAMPLE_AUDIT.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2 text-[10.5px]"
            >
              <span
                className={`rounded-chip border px-1.5 py-0.5 font-mono text-[8.5px] font-medium ${
                  item.statusEn === "Approved"
                    ? "border-green/25 bg-green-tint text-green"
                    : item.statusEn === "Denied"
                      ? "border-red/25 bg-red-tint text-red"
                      : "border-accent/25 bg-accent-tint text-accent-ink"
                }`}
              >
                {zh ? item.statusZh : item.statusEn}
              </span>
              <span className="min-w-0 font-mono text-ink">
                <span className="font-semibold">{item.action}</span>
                <span className="mx-1 text-ink-3">·</span>
                <span className="break-all text-ink-2">{item.target}</span>
              </span>
              <span className="grid justify-items-end gap-0.5 font-mono text-[9px] text-ink-3">
                <span>{item.timestamp}</span>
                <span className="rounded bg-field px-1 py-0.5">{item.hash}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
