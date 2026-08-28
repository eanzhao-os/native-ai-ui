import { NaiBaseElement } from "../core/base-element.js";

const TOOLPRE_HOOKS = [
  { name: "secret-scrub", matcher: "*", decision: "allow", latencyMs: 4 },
  {
    name: "workspace-guard",
    matcher: "fs.*",
    decision: "ask",
    reasonEn: "writes outside declared scopes",
    reasonZh: "写入超出声明的 write scopes",
    latencyMs: 11,
  },
  { name: "rate-limiter", matcher: "*", decision: "allow", latencyMs: 2 },
];

const RANK = { deny: 0, ask: 1, block: 2, allow: 3 };

const POINTS = ["SessionStart", "UserPrompt", "ToolPre", "ToolPost", "Stop", "Subagent"];

const PHASE_MS = [700, 750, 750, 750, 1400, 1400, 3800];

export class NaiHookPipeline extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._phase = 0;
  }

  onMount() {
    this._phase = 0;
    this._schedulePhase();
  }

  onUnmount() {
    this._phase = 0;
  }

  _schedulePhase() {
    const ms = PHASE_MS[this._phase];
    this.registerTimeout(() => {
      this._phase = (this._phase + 1) % PHASE_MS.length;
      this.render();
      this._schedulePhase();
    }, ms);
  }

  render() {
    const zh = this.isZh;
    const phase = this._phase;

    const evaluated = Math.max(0, Math.min(phase, TOOLPRE_HOOKS.length));
    const merged =
      phase >= 4
        ? phase >= 5
          ? "allow"
          : TOOLPRE_HOOKS.map((h) => h.decision).sort((a, b) => RANK[a] - RANK[b])[0] ?? "allow"
        : null;

    const decisionLabels = {
      allow: { labelEn: "allow", labelZh: "允许" },
      ask: { labelEn: "ask", labelZh: "询问" },
      deny: { labelEn: "deny", labelZh: "拒绝" },
      block: { labelEn: "block", labelZh: "阻断" },
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
          background: var(--accent, #0285ff);
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .points-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .harness-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .points-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .point-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
          transition: all 0.3s;
        }
        .point-active {
          border-color: rgba(2, 133, 255, 0.5);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .tool-target {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
        }
        .tool-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink, #1f2124);
        }
        .tool-file {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .call-id {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .pipeline-list {
          margin-top: 12px;
          display: flex;
          min-height: 132px;
          flex-direction: column;
          gap: 6px;
        }
        .hook-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 8px 10px;
          transition: all 0.3s;
        }
        .hook-active {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .hook-inactive {
          border-color: rgba(236, 237, 239, 0.6);
          background: var(--inset, #f7f8f9);
          opacity: 0.45;
        }
        .hook-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-allow { background: var(--green, #189a4d); }
        .dot-ask { background: var(--orange, #ef720c); }
        .dot-deny { background: var(--red, #e3474c); }
        .dot-block { background: var(--accent, #0285ff); }
        .dot-inactive { background: var(--line-strong, #e0e2e5); }

        .hook-info {
          min-width: 0;
          flex: 1;
        }
        .hook-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hook-title {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .hook-matcher {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .hook-reason {
          margin-top: 2px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .decision-chip {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
        }
        .decision-allow { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .decision-ask { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .decision-deny { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }
        .decision-block { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }

        .latency {
          width: 32px;
          flex-shrink: 0;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .merge-bar {
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 10px 12px;
          transition: all 0.5s;
        }
        .merge-allow {
          border-color: rgba(24, 154, 77, 0.4);
          background: var(--green-tint, #e8f5ed);
        }
        .merge-ask {
          border-color: rgba(239, 114, 12, 0.4);
          background: var(--orange-tint, #fdf1e5);
        }
        .merge-idle {
          border-color: var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .merge-left {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 8px;
        }
        .merge-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
        }
        .merge-hierarchy {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .merge-chip {
          flex-shrink: 0;
          white-space: nowrap;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
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
          font-variant-numeric: tabular-nums;
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${zh ? "Hook 决策管线" : "Hook Pipeline"}</h3>
            <span class="points-chip">6 points</span>
          </div>
          <span class="harness-tag">Harness.Hooks</span>
        </div>

        <!-- Hook points strip -->
        <div class="points-strip">
          ${POINTS.map(
            (p) => `
            <span class="point-tag ${p === "ToolPre" ? "point-active" : ""}">${p}</span>
          `
          ).join("")}
        </div>

        <!-- Inspected tool call -->
        <div class="tool-target">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2, #62656b)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
          </svg>
          <code class="tool-name">fs.write</code>
          <span class="tool-file">src/llm/retry.cs</span>
          <span class="call-id">call_e51c</span>
        </div>

        <!-- Pipeline: hooks evaluated in sequence -->
        <div class="pipeline-list">
          ${TOOLPRE_HOOKS.map((hook, i) => {
            const active = i < evaluated;
            return `
              <div class="hook-item ${active ? "hook-active" : "hook-inactive"}">
                <span class="hook-dot ${active ? `dot-${hook.decision}` : "dot-inactive"}"></span>
                <div class="hook-info">
                  <div class="hook-title-row">
                    <code class="hook-title">${hook.name}</code>
                    <span class="hook-matcher">${hook.matcher}</span>
                  </div>
                  ${
                    active && hook.reasonEn
                      ? `<span class="hook-reason">${zh ? hook.reasonZh : hook.reasonEn}</span>`
                      : ""
                  }
                </div>
                ${
                  active
                    ? `
                  <span class="decision-chip decision-${hook.decision}">
                    ${zh ? decisionLabels[hook.decision].labelZh : decisionLabels[hook.decision].labelEn}
                  </span>
                `
                    : `<span style="font-family: var(--font-mono, monospace); font-size: 9.5px; color: var(--ink-3, #9a9da3);">…</span>`
                }
                <span class="latency">${active ? `${hook.latencyMs}ms` : ""}</span>
              </div>
            `;
          }).join("")}
        </div>

        <!-- Merge bar -->
        <div class="merge-bar ${
          merged === "allow" ? "merge-allow" : merged === "ask" ? "merge-ask" : "merge-idle"
        }">
          <div class="merge-left">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2, #62656b)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <path d="M8 3v4a4 4 0 0 1-4 4h16M8 21v-4a4 4 0 0 0-4-4" />
              <path d="M18 8l3 3-3 3" transform="translate(-3 4)" />
            </svg>
            <span class="merge-title">${zh ? "Merge · 最严优先" : "Merge · most-restrictive"}</span>
            <span class="merge-hierarchy">deny &gt; ask &gt; block &gt; allow</span>
          </div>
          ${
            merged
              ? `
            <span class="merge-chip decision-${merged}">
              ${
                merged === "allow" && phase >= 5
                  ? zh
                    ? "allow · 已批准"
                    : "allow · approved"
                  : zh
                  ? decisionLabels[merged].labelZh
                  : decisionLabels[merged].labelEn
              }
            </span>
          `
              : `<span style="font-family: var(--font-mono, monospace); font-size: 10px; color: var(--ink-3, #9a9da3);">…</span>`
          }
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>
            ${
              phase >= 4 && phase < 5
                ? zh
                  ? "workspace-guard 升级为 ask → 等待人工批准"
                  : "workspace-guard escalated to ask → awaiting approval"
                : zh
                ? "HookInvokedFact 全部落入 durable log"
                : "Every HookInvokedFact lands in the durable log"
            }
          </span>
          <span class="footer-mono">${phase >= 5 ? "fail-open: never" : "fail-closed"}</span>
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-hook-pipeline")) {
  customElements.define("nai-hook-pipeline", NaiHookPipeline);
}
