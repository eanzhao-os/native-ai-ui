"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * LSP DIAGNOSTICS & SYMBOL INSPECTOR
 * ───────────────────────────────────────────────────────── */

type Diagnostic = {
  id: string;
  severity: "error" | "warning" | "info";
  code: string;
  messageEn: string;
  messageZh: string;
  file: string;
  line: number;
  col: number;
};

const INITIAL_DIAGNOSTICS: Diagnostic[] = [
  {
    id: "diag-1",
    severity: "error",
    code: "CS0103",
    messageEn: "The name 'ContextSpilloverService' does not exist in the current context.",
    messageZh: "当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",
    file: "src/Tether.Compaction/Compactor.cs",
    line: 38,
    col: 14,
  },
  {
    id: "diag-2",
    severity: "warning",
    code: "CS8618",
    messageEn: "Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",
    messageZh: "不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",
    file: "src/Tether.Session.Persistence/SqliteSessionStore.cs",
    line: 22,
    col: 29,
  },
  {
    id: "diag-3",
    severity: "warning",
    code: "CA2000",
    messageEn: "Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",
    messageZh: "在失去作用域前释放对象: 'CancellationTokenSource' 从未被显式 Dispose 释放。",
    file: "src/Tether.CodeRuntime/WorkerProcess.cs",
    line: 74,
    col: 21,
  },
];

export default function LspDiagnostics({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("lsp-diagnostics", propLang);
  const zh = lang === "zh";

  const [filter, setFilter] = useState<"all" | "error" | "warning">("all");
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>(INITIAL_DIAGNOSTICS);
  const [fixedIds, setFixedIds] = useState<string[]>([]);

  const filtered = diagnostics.filter((d) => {
    if (filter !== "all" && d.severity !== filter) return false;
    return true;
  });

  const handleFix = (id: string) => {
    setFixedIds((prev) => [...prev, id]);
    setTimeout(() => {
      setDiagnostics((prev) => prev.filter((d) => d.id !== id));
    }, 600);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-line">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Roslyn LSP 实时诊断" : "LSP Diagnostics"}
              </h3>
              <span className="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                Roslyn LSP
              </span>
            </div>
            <p className="text-[11px] text-ink-3">
              {zh ? "Tether.Lsp 工作区静态分析诊断流" : "Tether.Lsp live workspace analyzer stream"}
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex rounded-control bg-field p-0.5 text-[11px]">
          {(["all", "error", "warning"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${
                filter === tab ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              {tab === "all" ? (zh ? "全部" : "All") : tab === "error" ? (zh ? "错误" : "Errors") : (zh ? "警告" : "Warnings")}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnostics List */}
      <div className="mt-3.5 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-green">
            {zh ? "✓ 当前工作区内无活动编译错误或警告。" : "✓ Zero active compilation errors or warnings."}
          </div>
        ) : (
          filtered.map((diag) => {
            const isFixing = fixedIds.includes(diag.id);
            return (
              <div
                key={diag.id}
                className={`flex flex-col gap-1.5 rounded-control border p-3 transition-all ${
                  diag.severity === "error"
                    ? "border-red/30 bg-red-tint/20 hover:border-red/50"
                    : "border-orange/30 bg-orange-tint/20 hover:border-orange/50"
                } ${isFixing ? "opacity-40 scale-98" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className={`size-2 rounded-full shrink-0 ${
                        diag.severity === "error" ? "bg-red" : "bg-orange"
                      }`}
                    />
                    <span className="font-mono text-[10.5px] font-semibold text-ink">
                      {diag.code}
                    </span>
                    <span className="font-mono text-[10.5px] text-ink-3 truncate">
                      {diag.file}:{diag.line}:{diag.col}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFix(diag.id)}
                    className="flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-accent-ink hover:bg-accent-tint hover:border-accent/40 transition-colors cursor-pointer shrink-0"
                  >
                    <span>{isFixing ? (zh ? "修复中..." : "Fixing...") : zh ? "一键修复" : "Auto-Fix"}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <p className="text-[11.5px] text-ink leading-snug">
                  {zh ? diag.messageZh : diag.messageEn}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "目标框架: .NET 10.0" : "Target framework: .NET 10.0"}</span>
        <span className="font-mono">
          {diagnostics.length} {zh ? "个作用域内问题" : "issues in scope"}
        </span>
      </div>
    </div>
  );
}
