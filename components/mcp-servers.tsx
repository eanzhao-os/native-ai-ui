"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * MCP SERVERS — Model Context Protocol server panel
 * ───────────────────────────────────────────────────────── */

type ServerStatus = "connected" | "handshaking" | "error";

type McpTool = {
  qualified: string;
  descEn: string;
  descZh: string;
};

type McpServer = {
  id: string;
  name: string;
  transport: string;
  status: ServerStatus;
  latencyMs?: number;
  tools: McpTool[];
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
      {
        qualified: "filesystem__read_file",
        descEn: "Read a workspace file",
        descZh: "读取工作区文件",
      },
      {
        qualified: "filesystem__write_file",
        descEn: "Write within declared scopes",
        descZh: "在声明范围内写文件",
      },
      {
        qualified: "filesystem__grep",
        descEn: "ripgrep over the repo",
        descZh: "对仓库执行 ripgrep",
      },
    ],
  },
  {
    id: "rg",
    name: "ripgrep",
    transport: "stdio",
    status: "connected",
    latencyMs: 5,
    tools: [
      {
        qualified: "ripgrep__search",
        descEn: "Pattern search with globs",
        descZh: "带 glob 的模式搜索",
      },
      {
        qualified: "ripgrep__files",
        descEn: "List files matching a glob",
        descZh: "按 glob 列出文件",
      },
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

const RECOVERED_WEB_TOOLS: McpTool[] = [
  {
    qualified: "web-fetch__get",
    descEn: "GET a URL as markdown",
    descZh: "以 markdown 获取 URL",
  },
  {
    qualified: "web-fetch__search",
    descEn: "Web search",
    descZh: "网页搜索",
  },
];

const STATUS_STYLE: Record<
  ServerStatus,
  { dot: string; chip: string; labelEn: string; labelZh: string }
> = {
  connected: {
    dot: "bg-green",
    chip: "border-green/25 bg-green-tint text-green",
    labelEn: "connected",
    labelZh: "已连接",
  },
  handshaking: {
    dot: "bg-orange animate-pulse motion-reduce:animate-none",
    chip: "border-orange/25 bg-orange-tint text-orange",
    labelEn: "handshake",
    labelZh: "握手中",
  },
  error: {
    dot: "bg-red",
    chip: "border-red/25 bg-red-tint text-red",
    labelEn: "error",
    labelZh: "错误",
  },
};

export default function McpServers({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("mcp-servers", propLang);
  const zh = lang === "zh";
  const panelId = useId();

  const [expanded, setExpanded] = useState<string | null>("fs");
  const [retrying, setRetrying] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  const webDisclosureRef = useRef<HTMLButtonElement>(null);
  const restoreRetryFocusRef = useRef(false);

  useEffect(() => {
    if (!recovered || !restoreRetryFocusRef.current) return;
    restoreRetryFocusRef.current = false;
    webDisclosureRef.current?.focus();
  }, [recovered]);

  const handleRetry = () => {
    if (retrying || recovered) return;
    restoreRetryFocusRef.current =
      document.activeElement === retryButtonRef.current;
    if (restoreRetryFocusRef.current) webDisclosureRef.current?.focus();
    setRetrying(true);
    setAnnouncement(zh ? "正在重新连接 web-fetch" : "Reconnecting web-fetch");
    setTimeout(() => {
      setRetrying(false);
      setRecovered(true);
      setAnnouncement(
        zh
          ? "web-fetch 已连接并注册 2 个工具"
          : "web-fetch connected with 2 tools",
      );
    }, 1600);
  };

  const webStatus: ServerStatus = recovered
    ? "connected"
    : retrying
      ? "handshaking"
      : "error";
  const connectedCount = SERVERS.filter(
    (server) =>
      (server.id === "web" ? webStatus : server.status) === "connected",
  ).length;
  const toolCount =
    SERVERS.reduce((count, server) => count + server.tools.length, 0) +
    (recovered ? RECOVERED_WEB_TOOLS.length : 0);

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card dark:border-line-strong">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 dark:border-line-strong">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-control bg-green-tint text-green">
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
              <rect x="3" y="4" width="18" height="6" rx="2" />
              <rect x="3" y="14" width="18" height="6" rx="2" />
              <path d="M7 7h.01M7 17h.01" />
            </svg>
          </span>
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-ink">
              {zh ? "MCP 服务器" : "MCP Servers"}
            </h3>
            <span className="font-mono text-[9.5px] text-ink-3">
              protocol v2024-11-05
            </span>
          </div>
        </div>
        <span className="rounded-chip border border-line-strong bg-inset px-2 py-1 font-mono text-[9.5px] tabular-nums text-ink-2">
          {connectedCount}/{SERVERS.length} · {toolCount}{" "}
          {zh ? "个工具" : "tools"}
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {SERVERS.map((server) => {
          const status = server.id === "web" ? webStatus : server.status;
          const style = STATUS_STYLE[status];
          const isExpanded = expanded === server.id;
          const tools =
            server.id === "web" && recovered
              ? RECOVERED_WEB_TOOLS
              : server.tools;
          const detailsId = `${panelId}-${server.id}-details`;
          const latency = server.id === "web" ? 41 : server.latencyMs;

          return (
            <div
              key={server.id}
              className={`overflow-hidden rounded-control border transition-colors motion-reduce:transition-none ${
                isExpanded
                  ? "border-line-strong bg-inset/35"
                  : "border-line bg-surface hover:border-line-strong"
              } dark:border-line-strong`}
            >
              <button
                ref={server.id === "web" ? webDisclosureRef : undefined}
                type="button"
                aria-label={
                  zh ? `服务器 ${server.name}` : `Server ${server.name}`
                }
                aria-controls={detailsId}
                aria-expanded={isExpanded}
                onClick={() => setExpanded(isExpanded ? null : server.id)}
                className="grid min-h-11 w-full grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-2 px-3 py-1.5 text-left transition-colors hover:bg-hover/60 focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className={`size-2 shrink-0 rounded-full ${style.dot}`}
                />
                <span className="flex min-w-0 items-center gap-1.5">
                  <code className="truncate font-mono text-[11.5px] font-semibold text-ink">
                    {server.name}
                  </code>
                  <span className="rounded-chip border border-line bg-field px-1.5 py-0.5 font-mono text-[8.5px] text-ink-3 dark:border-line-strong">
                    {server.transport}
                  </span>
                </span>
                <span
                  className={`rounded-chip border px-1.5 py-0.5 font-mono text-[9px] font-medium ${style.chip}`}
                >
                  {zh ? style.labelZh : style.labelEn}
                </span>
                <span className="min-w-7 text-right font-mono text-[9px] tabular-nums text-ink-3">
                  {status === "connected" && latency !== undefined
                    ? `${latency}ms`
                    : "—"}
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
                  className={`shrink-0 text-ink-3 transition-transform duration-200 motion-reduce:transition-none ${
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
                    ? `${server.name} 服务器详情`
                    : `${server.name} server details`
                }
                aria-busy={status === "handshaking"}
                hidden={!isExpanded}
                className="border-t border-line-strong bg-surface/70 px-3 py-2.5"
              >
                {status === "error" || status === "handshaking" ? (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`min-w-0 flex-1 font-mono text-[10px] leading-relaxed ${
                        retrying ? "text-ink-3" : "text-red"
                      }`}
                    >
                      {retrying
                        ? "initialize → tools/list…"
                        : zh
                          ? server.errorZh
                          : server.errorEn}
                    </span>
                    <button
                      ref={retryButtonRef}
                      type="button"
                      aria-label={
                        zh
                          ? `重连 ${server.name}`
                          : `Retry ${server.name}`
                      }
                      aria-busy={retrying}
                      onClick={handleRetry}
                      disabled={retrying}
                      className="flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-control border border-line-strong bg-surface px-3 text-[10.5px] font-medium text-ink-2 transition-colors hover:border-red/35 hover:bg-red-tint hover:text-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/45 disabled:cursor-wait disabled:bg-inset disabled:text-ink-3 disabled:opacity-50 motion-reduce:transition-none"
                    >
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
                          retrying
                            ? "animate-spin text-orange motion-reduce:animate-none"
                            : ""
                        }
                      >
                        <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                      </svg>
                      {retrying
                        ? zh
                          ? "重连中"
                          : "Retrying"
                        : zh
                          ? "重连"
                          : "Retry"}
                    </button>
                  </div>
                ) : (
                  <ul role="list" className="flex flex-col gap-1.5">
                    {tools.map((tool) => (
                      <li
                        key={tool.qualified}
                        className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-baseline gap-2"
                      >
                        <code className="truncate font-mono text-[10.5px] font-medium text-accent-ink">
                          {tool.qualified}
                        </code>
                        <span className="truncate text-[10px] text-ink-3">
                          {zh ? tool.descZh : tool.descEn}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[10.5px] text-ink-3 dark:border-line-strong">
        <span>
          {zh
            ? "工具以 server__tool 限定名注册"
            : "Tools register as server__tool"}
        </span>
        <span className="font-mono">Harness.Mcp</span>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
