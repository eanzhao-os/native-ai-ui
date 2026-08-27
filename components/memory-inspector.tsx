"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * AGENT LONG-TERM MEMORY INSPECTOR
 * ───────────────────────────────────────────────────────── */

type MemoryItem = {
  id: string;
  category: "preference" | "rule" | "fact";
  textEn: string;
  textZh: string;
  confidence: number;
  updatedAtEn: string;
  updatedAtZh: string;
  pinned?: boolean;
};

const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: "mem-1",
    category: "preference",
    textEn: "Prefers functional React 19 components with Tailwind v4 and CSS variables.",
    textZh: "偏好使用 React 19 函数式组件、Tailwind v4 及原生 CSS 变量设计系统。",
    confidence: 98,
    updatedAtEn: "2h ago",
    updatedAtZh: "2小时前",
    pinned: true,
  },
  {
    id: "mem-2",
    category: "rule",
    textEn: "Never print raw database connection strings or JWT secret keys to logs.",
    textZh: "严禁在控制台或日志中打印未经脱敏的数据库连接串或 JWT 密钥。",
    confidence: 99,
    updatedAtEn: "Yesterday",
    updatedAtZh: "昨天",
    pinned: true,
  },
  {
    id: "mem-3",
    category: "preference",
    textEn: "Favors hairline elevation borders (1px) over saturated drop shadows.",
    textZh: "倾向使用 1px 发丝边框质感替代浓重饱和的投影阴影（Kumo 极简风）。",
    confidence: 94,
    updatedAtEn: "3d ago",
    updatedAtZh: "3天前",
  },
  {
    id: "mem-4",
    category: "fact",
    textEn: "Project uses Turborepo monorepo structure with apps/web and packages/ui.",
    textZh: "项目采用 Turborepo Monorepo 架构，核心源码位于 apps/web 与 packages/ui。",
    confidence: 88,
    updatedAtEn: "5d ago",
    updatedAtZh: "5天前",
  },
];

export default function MemoryInspector({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("memory-inspector", propLang);
  const zh = lang === "zh";

  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [filter, setFilter] = useState<"all" | "preference" | "rule" | "fact">("all");
  const [query, setQuery] = useState("");

  const filtered = memories.filter((m) => {
    if (filter !== "all" && m.category !== filter) return false;
    const text = zh ? m.textZh : m.textEn;
    if (query && !text.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleTogglePin = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m))
    );
  };

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
              <path d="M9 21h6" />
            </svg>
          </span>
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "智能体长期记忆看板" : "Agent Long-Term Memory"}
          </h3>
        </div>

        <span className="font-mono text-[11px] text-ink-3">
          {memories.length} {zh ? "条已存记忆" : memories.length === 1 ? "stored fact" : "stored facts"}
        </span>
      </div>

      {/* Filter Tabs & Search */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex rounded-control bg-field p-0.5 text-[11px]">
          {(["all", "preference", "rule", "fact"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${
                filter === tab ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              {tab === "all"
                ? zh ? "全部" : "All"
                : tab === "preference"
                ? zh ? "偏好" : "Prefs"
                : tab === "rule"
                ? zh ? "规范" : "Rules"
                : zh ? "事实" : "Facts"}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder={zh ? "搜索记忆..." : "Search memory..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-36 rounded-control border border-line bg-field px-2 py-1 text-[11px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Memory Cards List */}
      <div className="mt-3 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-ink-3">
            {zh ? "当前筛选条件下无记忆项。" : "No memories match the current filter."}
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="group relative flex items-start justify-between gap-2.5 rounded-control border border-line bg-inset/40 p-3 hover:border-line-strong hover:bg-hover/30 transition-all"
            >
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium capitalize ${
                      item.category === "preference"
                        ? "bg-accent-tint text-accent-ink"
                        : item.category === "rule"
                        ? "bg-orange-tint text-orange"
                        : "bg-green-tint text-green"
                    }`}
                  >
                    {item.category === "preference"
                      ? zh ? "偏好" : "preference"
                      : item.category === "rule"
                      ? zh ? "规范" : "rule"
                      : zh ? "事实" : "fact"}
                  </span>
                  {item.pinned && (
                    <span className="flex items-center gap-0.5 font-mono text-[9.5px] text-ink-3">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 3a1 1 0 0 1 .71.29l4 4A1 1 0 0 1 21 9l-6.5 6.5-.5 4.5a1 1 0 0 1-1.7.7L9 17.4 4.7 21.7a1 1 0 0 1-1.4-1.4L7.6 16l-3.3-3.3a1 1 0 0 1 .7-1.7l4.5-.5L15 4a1 1 0 0 1 1-1z" />
                      </svg>
                      {zh ? "已置顶" : "Pinned"}
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-ink-3 tabular-nums ml-auto">
                    {item.confidence}% {zh ? "置信" : "conf"} • {zh ? item.updatedAtZh : item.updatedAtEn}
                  </span>
                </div>
                <p className="text-[12px] text-ink leading-snug">
                  {zh ? item.textZh : item.textEn}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleTogglePin(item.id)}
                  title={item.pinned ? (zh ? "取消置顶" : "Unpin") : zh ? "置顶到 Prompt" : "Pin to prompt"}
                  className={`flex size-6 items-center justify-center rounded-chip text-ink-3 hover:bg-hover hover:text-ink transition-colors cursor-pointer ${
                    item.pinned ? "text-accent-ink" : ""
                  }`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="17" x2="12" y2="22" />
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  title={zh ? "遗忘此记忆" : "Forget this memory"}
                  className="flex size-6 items-center justify-center rounded-chip text-ink-3 hover:bg-red-tint hover:text-red transition-colors cursor-pointer"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "已在当前 Agent 会话中实时同步" : "Synced across current agent sessions"}</span>
        <button
          type="button"
          onClick={() => {
            setMemories((prev) => [
              {
                id: `mem-${Date.now()}`,
                category: "preference",
                textEn: "Always provide TypeScript types for tool parameters.",
                textZh: "始终为 Tool 参数提供完整的 TypeScript 类型注解与 Zod 校验。",
                confidence: 100,
                updatedAtEn: "Just now",
                updatedAtZh: "刚刚",
              },
              ...prev,
            ]);
          }}
          className="text-accent-ink hover:underline font-medium cursor-pointer"
        >
          {zh ? "+ 添加事实" : "+ Add Fact"}
        </button>
      </div>
    </div>
  );
}
