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

    const statusLabels = {
      connected: { labelEn: "connected", labelZh: "已连接" },
      handshaking: { labelEn: "handshake", labelZh: "握手中" },
      error: { labelEn: "error", labelZh: "错误" },
    };

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--green, #189a4d);
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .version-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .count-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .servers-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .server-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          transition: background-color 0.15s, border-color 0.15s;
          background: var(--surface, #fff);
        }
        .server-card-expanded {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.3);
        }

        .server-row {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          cursor: pointer;
          user-select: none;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-connected { background: var(--green, #189a4d); }
        .dot-handshaking { background: var(--orange, #ef720c); animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .dot-error { background: var(--red, #e3474c); }

        .server-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .transport-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }

        .status-chip {
          margin-left: auto;
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .status-chip-connected { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .status-chip-handshaking { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .status-chip-error { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }

        .latency-text {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .chevron {
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .chevron-rotated {
          transform: rotate(180deg);
        }

        .detail-pane {
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          padding: 8px 10px;
          animation: fade-up 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .error-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .error-msg {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--red, #e3474c);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn-retry {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-retry:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .handshake-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spinner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          border-top-color: var(--orange, #ef720c);
          animation: spin 1s linear infinite;
          flex-shrink: 0;
        }
        .handshake-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .tools-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tool-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .tool-qualified {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--accent-ink, #0170dd);
        }
        .tool-desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(1turn); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${zh ? "MCP 服务器" : "MCP Servers"}</h3>
            <span class="version-chip">v2024-11-05</span>
          </div>
          <span class="count-text">
            ${connectedCount}/${SERVERS.length} · ${toolCount} tools
          </span>
        </div>

        <div class="servers-list">
          ${SERVERS.map((server) => {
            const status = server.id === "web" ? webStatus : server.status;
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
              <div class="server-card ${isExpanded ? "server-card-expanded" : ""}">
                <div
                  role="button"
                  tabindex="0"
                  class="server-row"
                  data-expand="${server.id}"
                >
                  <span class="dot dot-${status}"></span>
                  <code class="server-name">${server.name}</code>
                  <span class="transport-chip">${server.transport}</span>
                  <span class="status-chip status-chip-${status}">
                    ${zh ? statusLabels[status].labelZh : statusLabels[status].labelEn}
                  </span>
                  ${
                    status === "connected" && latency !== undefined
                      ? `<span class="latency-text">${latency}ms</span>`
                      : ""
                  }
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink-3, #9a9da3)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="chevron ${isExpanded ? "chevron-rotated" : ""}"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                ${
                  isExpanded
                    ? `
                  <div class="detail-pane">
                    ${
                      status === "error"
                        ? `
                      <div class="error-row">
                        <span class="error-msg">${zh ? server.errorZh : server.errorEn}</span>
                        <button type="button" class="btn-retry" id="btn-retry-mcp">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                          </svg>
                          <span>${zh ? "重连" : "Retry"}</span>
                        </button>
                      </div>
                    `
                        : status === "handshaking"
                        ? `
                      <div class="handshake-row">
                        <span class="spinner"></span>
                        <span class="handshake-text">initialize → tools/list…</span>
                      </div>
                    `
                        : `
                      <div class="tools-list">
                        ${tools
                          .map(
                            (t) => `
                          <div class="tool-row">
                            <code class="tool-qualified">${t.qualified}</code>
                            <span class="tool-desc">${zh ? t.descZh : t.descEn}</span>
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

        <div class="footer">
          <span>${zh ? "工具以 server__tool 限定名注册" : "Tools register as server__tool"}</span>
          <span class="footer-mono">Harness.Mcp</span>
        </div>
      </div>
    `;

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
