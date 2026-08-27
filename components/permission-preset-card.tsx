"use client";

import { useState } from "react";
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
  icon: string;
};

const PRESETS: Preset[] = [
  {
    id: "strict",
    nameEn: "Strict Sandboxed",
    nameZh: "严格沙盒隔离",
    sandbox: "E2B Cloud",
    approvalEn: "Strict Prompt",
    approvalZh: "全量拦截审批",
    descEn: "Isolated remote container. Prompt user before all file edits, shell commands, and outbound HTTP.",
    descZh: "在远程隔离容器中执行。任何文件修改、终端命令及外网 HTTP 调用均需用户手动确认。",
    icon: "🛡️",
  },
  {
    id: "balanced",
    nameEn: "Balanced Dev",
    nameZh: "开发平衡模式",
    sandbox: "Local Process",
    approvalEn: "Write-Only Prompt",
    approvalZh: "仅写操作审批",
    descEn: "Local sandbox with workspace isolation. Read operations auto-approve; write/exec prompt once.",
    descZh: "本地沙盒与工作区隔离。读操作自动放行；文件写入与命令执行仅提示一次。",
    icon: "⚖️",
  },
  {
    id: "autonomous",
    nameEn: "Autonomous Agent",
    nameZh: "全自主执行模式",
    sandbox: "Local Process",
    approvalEn: "Autonomous",
    approvalZh: "完全自主",
    descEn: "Full automated execution. Retains durable exactly-once audit ledger in SQLite.",
    descZh: "全自动执行流。在 SQLite 中保留可完整重放的 Exactly-Once 审计账本。",
    icon: "⚡",
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
    target: "src/Tether.Core/Session.cs",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:12",
    hash: "e4f8a1...3b9c",
  },
  {
    id: "aud-2",
    action: "shell.exec",
    target: "dotnet build Tether.slnx",
    statusEn: "Approved",
    statusZh: "已批准",
    timestamp: "21:48:19",
    hash: "82a0bc...19d4",
  },
  {
    id: "aud-3",
    action: "fs.read",
    target: "NuGet.config",
    statusEn: "Auto-Allowed",
    statusZh: "自动放行",
    timestamp: "21:48:22",
    hash: "6c7d1e...90fa",
  },
];

export default function PermissionPresetCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("permission-preset-card", propLang);
  const zh = lang === "zh";

  const [selectedPreset, setSelectedPreset] = useState<string>("balanced");
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayVerified, setReplayVerified] = useState(false);

  const handleReplayAudit = () => {
    setIsReplaying(true);
    setReplayVerified(false);
    setTimeout(() => {
      setIsReplaying(false);
      setReplayVerified(true);
    }, 900);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-orange-tint text-orange">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <div>
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "权限预设与审计重放" : "Permission Presets & Auditing"}
            </h3>
            <p className="text-[11px] text-ink-3">
              {zh ? "Tether 权限 Bundle 与持久化不可变事实" : "Tether authorization bundle & durable facts"}
            </p>
          </div>
        </div>

        <span className="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-2">
          {zh ? "Exactly-Once 审计" : "Exactly-Once Audit"}
        </span>
      </div>

      {/* Preset Selector Grid */}
      <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-2">
        {PRESETS.map((p) => {
          const isSelected = selectedPreset === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`flex flex-col justify-between rounded-control border p-2.5 transition-all cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent-tint/30 shadow-sm ring-1 ring-accent"
                  : "border-line bg-inset/40 hover:border-line-strong hover:bg-hover/30"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[13px]">{p.icon}</span>
                  <span className="text-[12px] font-semibold text-ink">
                    {zh ? p.nameZh : p.nameEn}
                  </span>
                </div>
                <p className="text-[10.5px] text-ink-2 leading-tight">
                  {zh ? p.descZh : p.descEn}
                </p>
              </div>

              <div className="mt-2.5 flex flex-col gap-1 border-t border-line/60 pt-2 font-mono text-[9.5px]">
                <div className="flex justify-between text-ink-3">
                  <span>{zh ? "沙盒:" : "Sandbox:"}</span>
                  <span className="text-ink font-medium">{p.sandbox}</span>
                </div>
                <div className="flex justify-between text-ink-3">
                  <span>{zh ? "审批:" : "Approval:"}</span>
                  <span className="text-ink font-medium">
                    {zh ? p.approvalZh : p.approvalEn}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exactly-Once Audit Trail */}
      <div className="mt-4 rounded-control border border-line bg-inset/50 p-3">
        <div className="flex items-center justify-between pb-2 border-b border-line/60">
          <div className="flex items-center gap-1.5">
            <span className="text-[11.5px] font-semibold text-ink">
              {zh ? "可重放审计流水 (Audit Trail)" : "Replayable Audit Trail"}
            </span>
            {replayVerified && (
              <span className="flex items-center gap-0.5 text-green font-mono text-[10px]">
                {zh ? "✓ 校验通过" : "✓ Validated"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleReplayAudit}
            disabled={isReplaying}
            className="flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
          >
            {isReplaying ? (zh ? "正在重放校验..." : "Verifying...") : zh ? "重放审计" : "Replay Audit"}
          </button>
        </div>

        <div className="mt-2 flex flex-col divide-y divide-line/40">
          {SAMPLE_AUDIT.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-1.5 text-[11px]">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${
                    item.statusEn === "Approved"
                      ? "bg-green-tint text-green"
                      : "bg-accent-tint text-accent-ink"
                  }`}
                >
                  {zh ? item.statusZh : item.statusEn}
                </span>
                <span className="font-mono text-[11px] font-medium text-ink truncate max-w-[200px]">
                  {item.action}: {item.target}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-[10px] text-ink-3">
                <span>{item.timestamp}</span>
                <span className="rounded bg-field px-1 py-0.2">{item.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
