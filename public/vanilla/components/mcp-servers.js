import { NaiBaseElement } from "../core/base-element.js";

const SERVERS = [
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

const STATUS_STYLE = {
  connected: { dot: "bg-green", chip: "bg-green-tint text-green", labelEn: "connected", labelZh: "已连接" },
  handshaking: { dot: "bg-orange animate-pulse", chip: "bg-orange-tint text-orange", labelEn: "handshake", labelZh: "握手中" },
  error: { dot: "bg-red", chip: "bg-red-tint text-red", labelEn: "error", labelZh: "错误" },
};

export class NaiMcpServers extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._expanded = "fs";
    this._retrying = false;
    this._recovered = false;
  }

  toggleExpand(id) {
    this._expanded = this._expanded === id ? null : id;
    this.render();
  }

  handleRetry() {
    this._retrying = true;
    this.render();

    this.registerTimeout(() => {
      this._retrying = false;
      this._recovered = true;
      this.render();
    }, 1600);
  }

  render() {
    const zh = this.isZh;
    const webStatus = this._recovered ? "connected" : this._retrying ? "handshaking" : "error";
    const connectedCount = SERVERS.filter(
      (s) => (s.id === "web" ? webStatus : s.status) === "connected"
    ).length;
    const toolCount = SERVERS.reduce((n, s) => n + s.tools.length, 0) + (this._recovered ? 2 : 0);

    const extraCss = `
      .bg-hover\\/30 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 30%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-3 { width: 12px; height: 12px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
      .border-t-orange { border-top-color: var(--orange, #ef720c); }
      .border-\\[1\\.5px\\] { border-width: 1.5px; }
      .rotate-180 { transform: rotate(180deg); }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-green"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "MCP 服务器" : "MCP Servers"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              v2024-11-05
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${connectedCount}/${SERVERS.length} · ${toolCount} tools
          </span>
        </div>

        
        <div class="flex flex-col gap-1.5">
          ${SERVERS.map((server) => {
            const status = server.id === "web" ? webStatus : server.status;
            const style = STATUS_STYLE[status];
            const isExpanded = this._expanded === server.id;
            const tools =
              server.id === "web" && this._recovered
                ? [
                    { qualified: "web-fetch__get", descEn: "GET a URL as markdown", descZh: "以 markdown 获取 URL" },
                    { qualified: "web-fetch__search", descEn: "Web search", descZh: "网页搜索" },
                  ]
                : server.tools;
            const latency = server.id === "web" ? 41 : server.latencyMs;

            return `
              <div
                class="rounded-control border transition-colors ${
                  isExpanded ? "border-line-strong bg-hover/30" : "border-line bg-surface"
                }"
              >
                <div
                  role="button"
                  tabindex="0"
                  data-expand="${server.id}"
                  class="server-row flex w-full items-center gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <span class="size-2 shrink-0 rounded-full ${style.dot}"></span>
                  <code class="font-mono text-[11.5px] font-medium text-ink">${server.name}</code>
                  <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                    ${server.transport}
                  </span>
                  <span class="ml-auto shrink-0 rounded-chip px-1.5 py-px font-mono text-[9.5px] font-medium ${style.chip}">
                    ${zh ? style.labelZh : style.labelEn}
                  </span>
                  ${
                    status === "connected" && latency !== undefined
                      ? `
                    <span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">
                      ${latency}ms
                    </span>
                  `
                      : ""
                  }
                  <svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                ${
                  isExpanded
                    ? `
                  <div class="border-t border-line/60 px-2.5 py-2" style="animation: fade-up 250ms cubic-bezier(0.23,1,0.32,1) both;">
                    ${
                      status === "error"
                        ? `
                      <div class="flex items-center justify-between gap-2">
                        <span class="truncate font-mono text-[10.5px] text-red">
                          ${zh ? server.errorZh : server.errorEn}
                        </span>
                        <button
                          type="button"
                          id="btn-retry-mcp"
                          class="flex shrink-0 items-center gap-1 rounded-chip border border-line bg-surface px-2 py-1 text-[10.5px] font-medium text-ink-2 transition-colors hover:bg-hover hover:text-ink cursor-pointer"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                          </svg>
                          ${zh ? "重连" : "Retry"}
                        </button>
                      </div>
                    `
                        : status === "handshaking"
                        ? `
                      <div class="flex items-center gap-2">
                        <span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-orange animate-spin"></span>
                        <span class="font-mono text-[10.5px] text-ink-3">
                          initialize → tools/list…
                        </span>
                      </div>
                    `
                        : `
                      <div class="flex flex-col gap-1">
                        ${tools
                          .map(
                            (t) => `
                          <div class="flex items-baseline gap-2">
                            <code class="shrink-0 font-mono text-[10.5px] text-accent-ink">${t.qualified}</code>
                            <span class="truncate text-[10.5px] text-ink-3">
                              ${zh ? t.descZh : t.descEn}
                            </span>
                          </div>
                        `
                          )
                          .join("")}
                      </div>
                    `
                    }
                  </div>
                `
                    : ""
                }
              </div>
            `;
          }).join("")}
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${zh ? "工具以 server__tool 限定名注册" : "Tools register as server__tool"}</span>
          <span class="font-mono">Harness.Mcp</span>
        </div>
      </div>
    `, extraCss);

    this.shadowRoot.querySelectorAll("[data-expand]").forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-expand");
        this.toggleExpand(id);
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const id = el.getAttribute("data-expand");
          this.toggleExpand(id);
        }
      });
    });

    this.shadowRoot.querySelector("#btn-retry-mcp")?.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleRetry();
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-mcp-servers")) {
  customElements.define("nai-mcp-servers", NaiMcpServers);
}
