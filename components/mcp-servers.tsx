"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * MCP SERVERS — Model Context Protocol server panel
 *
 * Mirrors Harness.Mcp: stdio clients handshake with
 * protocolVersion, then expose tools as server__tool.
 * One server is down with a retry action; servers expand
 * to show their tool inventory.
 * ───────────────────────────────────────────────────────── */

type ServerStatus = "connected" | "handshaking" | "error";

type McpServer = {
  id: string;
  name: string;
  transport: string;
  status: ServerStatus;
  latencyMs?: number;
  tools: { qualified: string; descEn: string; descZh: string }[];
  errorEn?: string;
  errorZh?: string;
};

const SERVERS: McpServer[] = [
  {
    id: "fs",
    name: "filesystem",
    transport: "stdio",
    status: "connected",
    latencyMs: 3,
    tools: [
      { qualified: "filesystem__read_file", descEn: "Read a workspace file", descZh: "读取工作区文件" },
      { qualified: "filesystem__write_file", descEn: "Write within declared scopes", descZh: "在声明范围内写文件" },
      { qualified: "filesystem__grep", descEn: "ripgrep over the repo", descZh: "对仓库执行 ripgrep" },
    ],
  },
  {
    id: "rg",
    name: "ripgrep",
    transport: "stdio",
    status: "connected",
    latencyMs: 5,
    tools: [
      { qualified: "ripgrep__search", descEn: "Pattern search with globs", descZh: "带 glob 的模式搜索" },
      { qualified: "ripgrep__files", descEn: "List files matching a glob", descZh: "按 glob 列出文件" },
    ],
  },
  {
    id: "web",
    name: "web-fetch",
    transport: "stdio",
    status: "error",
    tools: [],
    errorEn: "handshake timeout after 10s · exit 1",
    errorZh: "握手 10 秒超时 · 退出码 1",
  },
];

const STATUS_STYLE: Record<ServerStatus, { dot: string; chip: string; labelEn: string; labelZh: string }> = {
  connected: { dot: "bg-green", chip: "bg-green-tint text-green", labelEn: "connected", labelZh: "已连接" },
  handshaking: { dot: "bg-orange animate-pulse", chip: "bg-orange-tint text-orange", labelEn: "handshake", labelZh: "握手中" },
  error: { dot: "bg-red", chip: "bg-red-tint text-red", labelEn: "error", labelZh: "错误" },
};

export default function McpServers({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("mcp-servers", propLang);
  const zh = lang === "zh";

  const [expanded, setExpanded] = useState<string | null>("fs");
  const [retrying, setRetrying] = useState(false);
  const [recovered, setRecovered] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setRecovered(true);
    }, 1600);
  };

  const webStatus: ServerStatus = recovered ? "connected" : retrying ? "handshaking" : "error";
  const connectedCount = SERVERS.filter((s) => (s.id === "web" ? webStatus : s.status) === "connected").length;
  const toolCount = SERVERS.reduce((n, s) => n + s.tools.length, 0) + (recovered ? 2 : 0);

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-green" />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "MCP 服务器" : "MCP Servers"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            v2024-11-05
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
          {connectedCount}/{SERVERS.length} · {toolCount} tools
        </span>
      </div>

      {/* Server rows */}
      <div className="flex flex-col gap-1.5">
        {SERVERS.map((server) => {
          const status = server.id === "web" ? webStatus : server.status;
          const style = STATUS_STYLE[status];
          const isExpanded = expanded === server.id;
          const tools =
            server.id === "web" && recovered
              ? [
                  { qualified: "web-fetch__get", descEn: "GET a URL as markdown", descZh: "以 markdown 获取 URL" },
                  { qualified: "web-fetch__search", descEn: "Web search", descZh: "网页搜索" },
                ]
              : server.tools;
          return (
            <div
              key={server.id}
              className={`rounded-control border transition-colors ${
                isExpanded ? "border-line-strong bg-hover/30" : "border-line bg-surface"
              }`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpanded(isExpanded ? null : server.id)}
                onKeyDown={(e) => e.key === "Enter" && setExpanded(isExpanded ? null : server.id)}
                className="flex w-full items-center gap-2.5 px-2.5 py-2 cursor-pointer"
              >
                <span className={`size-2 shrink-0 rounded-full ${style.dot}`} />
                <code className="font-mono text-[11.5px] font-medium text-ink">{server.name}</code>
                <span className="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                  {server.transport}
                </span>
                <span className={`ml-auto shrink-0 rounded-chip px-1.5 py-px font-mono text-[9.5px] font-medium ${style.chip}`}>
                  {zh ? style.labelZh : style.labelEn}
                </span>
                {status === "connected" && server.latencyMs !== undefined && (
                  <span className="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">
                    {server.id === "web" ? 41 : server.latencyMs}ms
                  </span>
                )}
                <svg
                  width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                  className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {isExpanded && (
                <div className="border-t border-line/60 px-2.5 py-2" style={{ animation: "fade-up 250ms cubic-bezier(0.23,1,0.32,1) both" }}>
                  {status === "error" ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-[10.5px] text-red">
                        {zh ? server.errorZh : server.errorEn}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRetry();
                        }}
                        className="flex shrink-0 items-center gap-1 rounded-chip border border-line bg-surface px-2 py-1 text-[10.5px] font-medium text-ink-2 transition-colors hover:bg-hover hover:text-ink cursor-pointer"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                        </svg>
                        {zh ? "重连" : "Retry"}
                      </button>
                    </div>
                  ) : status === "handshaking" ? (
                    <div className="flex items-center gap-2">
                      <span className="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-orange animate-spin" />
                      <span className="font-mono text-[10.5px] text-ink-3">
                        initialize → tools/list…
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {tools.map((t) => (
                        <div key={t.qualified} className="flex items-baseline gap-2">
                          <code className="shrink-0 font-mono text-[10.5px] text-accent-ink">{t.qualified}</code>
                          <span className="truncate text-[10.5px] text-ink-3">
                            {zh ? t.descZh : t.descEn}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>{zh ? "工具以 server__tool 限定名注册" : "Tools register as server__tool"}</span>
        <span className="font-mono">Harness.Mcp</span>
      </div>
    </div>
  );
}
