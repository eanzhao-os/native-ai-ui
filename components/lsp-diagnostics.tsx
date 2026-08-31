"use client";

import { useEffect, useRef, useState } from "react";
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
    messageEn:
      "The name 'ContextSpilloverService' does not exist in the current context.",
    messageZh:
      "当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",
    file: "src/Harness.Compaction/Compactor.cs",
    line: 38,
    col: 14,
  },
  {
    id: "diag-2",
    severity: "warning",
    code: "CS8618",
    messageEn:
      "Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",
    messageZh:
      "不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",
    file: "src/Harness.Session.Persistence/SqliteSessionStore.cs",
    line: 22,
    col: 29,
  },
  {
    id: "diag-3",
    severity: "warning",
    code: "CA2000",
    messageEn:
      "Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",
    messageZh:
      "在失去作用域前释放对象：'CancellationTokenSource' 从未被显式 Dispose。",
    file: "src/Harness.CodeRuntime/WorkerProcess.cs",
    line: 74,
    col: 21,
  },
];

type Filter = "all" | "error" | "warning";

export default function LspDiagnostics({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("lsp-diagnostics", propLang);
  const zh = lang === "zh";

  const [filter, setFilter] = useState<Filter>("all");
  const [diagnostics, setDiagnostics] =
    useState<Diagnostic[]>(INITIAL_DIAGNOSTICS);
  const [fixingIds, setFixingIds] = useState<string[]>([]);
  const [focusTarget, setFocusTarget] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const fixButtonRefs = useRef(new Map<string, HTMLButtonElement>());
  const filterButtonRefs = useRef(new Map<Filter, HTMLButtonElement>());

  const filtered = diagnostics.filter(
    (diagnostic) => filter === "all" || diagnostic.severity === filter,
  );

  useEffect(() => {
    if (!focusTarget) return;
    if (focusTarget === "filter") {
      filterButtonRefs.current.get(filter)?.focus();
    } else {
      fixButtonRefs.current.get(focusTarget)?.focus();
    }
    setFocusTarget(null);
  }, [diagnostics, filter, focusTarget]);

  const handleFilter = (nextFilter: Filter) => {
    setFilter(nextFilter);
    const count = diagnostics.filter(
      (diagnostic) =>
        nextFilter === "all" || diagnostic.severity === nextFilter,
    ).length;
    const label =
      nextFilter === "all"
        ? zh
          ? "全部"
          : "All"
        : nextFilter === "error"
          ? zh
            ? "错误"
            : "Errors"
          : zh
            ? "警告"
            : "Warnings";
    setAnnouncement(
      zh ? `${label}筛选，显示 ${count} 项诊断` : `${label} filter, ${count} diagnostics`,
    );
  };

  const handleFix = (id: string) => {
    const diagnostic = diagnostics.find((item) => item.id === id);
    if (!diagnostic || fixingIds.includes(id)) return;

    const remaining = diagnostics.filter(
      (item) =>
        item.id !== id &&
        (filter === "all" || item.severity === filter),
    );
    setFixingIds((current) => [...current, id]);
    setAnnouncement(
      zh ? `正在修复 ${diagnostic.code}` : `Fixing ${diagnostic.code}`,
    );

    setTimeout(() => {
      setDiagnostics((current) => current.filter((item) => item.id !== id));
      setFixingIds((current) => current.filter((fixingId) => fixingId !== id));
      setFocusTarget(remaining[0]?.id ?? "filter");
      setAnnouncement(
        zh ? `已修复 ${diagnostic.code}` : `Fixed ${diagnostic.code}`,
      );
    }, 600);
  };

  return (
    <div className="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card dark:border-line-strong">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3.5 dark:border-line-strong">
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
              <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-[13px] font-semibold text-ink">
                {zh ? "Roslyn LSP 实时诊断" : "LSP Diagnostics"}
              </h3>
              <span className="rounded-chip border border-line-strong bg-inset px-1.5 py-0.5 font-mono text-[9.5px] text-ink-3">
                Roslyn LSP
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
              {zh
                ? "Harness.Lsp 工作区静态分析诊断流"
                : "Harness.Lsp live workspace analyzer stream"}
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label={zh ? "诊断筛选" : "Diagnostic filters"}
          className="flex rounded-control border border-line-strong bg-field p-0.5"
        >
          {(["all", "error", "warning"] as const).map((tab) => {
            const label =
              tab === "all"
                ? zh
                  ? "全部"
                  : "All"
                : tab === "error"
                  ? zh
                    ? "错误"
                    : "Errors"
                  : zh
                    ? "警告"
                    : "Warnings";
            return (
              <button
                key={tab}
                ref={(element) => {
                  if (element) filterButtonRefs.current.set(tab, element);
                  else filterButtonRefs.current.delete(tab);
                }}
                type="button"
                aria-pressed={filter === tab}
                onClick={() => handleFilter(tab)}
                className={`min-h-11 min-w-11 rounded-control px-2.5 text-[10.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 motion-reduce:transition-none ${
                  filter === tab
                    ? "bg-surface text-ink shadow-sm"
                    : "text-ink-3 hover:bg-hover hover:text-ink-2"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div role="list" className="mt-3.5 flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="rounded-control border border-dashed border-green/35 bg-green-tint/20 p-6 text-center text-[11.5px] text-green">
            {zh
              ? "✓ 当前筛选范围内无活动诊断。"
              : "✓ No active diagnostics in this filter."}
          </div>
        ) : (
          filtered.map((diagnostic) => {
            const isFixing = fixingIds.includes(diagnostic.id);
            const isError = diagnostic.severity === "error";
            return (
              <div
                key={diagnostic.id}
                role="listitem"
                aria-busy={isFixing}
                className={`rounded-control border p-3 transition-[border-color,background-color,opacity] motion-reduce:transition-none ${
                  isError
                    ? "border-red/40 bg-red-tint/18 hover:border-red/60 dark:border-red/55"
                    : "border-orange/40 bg-orange-tint/18 hover:border-orange/60 dark:border-orange/55"
                } ${isFixing ? "opacity-55" : ""}`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`size-2 shrink-0 rounded-full ${
                          isError ? "bg-red" : "bg-orange"
                        }`}
                      />
                      <span className="font-mono text-[10.5px] font-semibold text-ink">
                        {diagnostic.code}
                      </span>
                      <span className="rounded-chip border border-line-strong bg-surface/75 px-1.5 py-0.5 font-mono text-[9px] text-ink-3">
                        {zh
                          ? `行 ${diagnostic.line} · 列 ${diagnostic.col}`
                          : `Line ${diagnostic.line} · Col ${diagnostic.col}`}
                      </span>
                    </div>
                    <code className="mt-1.5 block truncate font-mono text-[9.5px] text-ink-3">
                      {diagnostic.file}
                    </code>
                  </div>

                  <button
                    ref={(element) => {
                      if (element) {
                        fixButtonRefs.current.set(diagnostic.id, element);
                      } else {
                        fixButtonRefs.current.delete(diagnostic.id);
                      }
                    }}
                    type="button"
                    aria-label={
                      zh
                        ? `一键修复 ${diagnostic.code}`
                        : `Auto-Fix ${diagnostic.code}`
                    }
                    aria-busy={isFixing}
                    onClick={() => handleFix(diagnostic.id)}
                    disabled={isFixing}
                    className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-2.5 text-[10.5px] font-medium text-accent-ink transition-colors hover:border-accent/40 hover:bg-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/55 disabled:cursor-wait disabled:opacity-55 motion-reduce:transition-none"
                  >
                    {isFixing ? (zh ? "修复中" : "Fixing") : zh ? "一键修复" : "Auto-Fix"}
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
                        isFixing
                          ? "animate-spin motion-reduce:animate-none"
                          : ""
                      }
                    >
                      {isFixing ? (
                        <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                      ) : (
                        <path d="m9 18 6-6-6-6" />
                      )}
                    </svg>
                  </button>
                </div>

                <p className="mt-2 text-[11.5px] leading-relaxed text-ink">
                  {zh ? diagnostic.messageZh : diagnostic.messageEn}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[10.5px] text-ink-3 dark:border-line-strong">
        <span>{zh ? "目标框架：.NET 10.0" : "Target framework: .NET 10.0"}</span>
        <span className="font-mono">
          {diagnostics.length}{" "}
          {zh ? "个范围内问题" : "issues in scope"}
        </span>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
