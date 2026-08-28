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

const DECISION_STYLE = {
  allow: { chip: "bg-green-tint text-green", dot: "bg-green", labelEn: "allow", labelZh: "允许" },
  ask: { chip: "bg-orange-tint text-orange", dot: "bg-orange", labelEn: "ask", labelZh: "询问" },
  deny: { chip: "bg-red-tint text-red", dot: "bg-red", labelEn: "deny", labelZh: "拒绝" },
  block: { chip: "bg-accent-tint text-accent-ink", dot: "bg-accent", labelEn: "block", labelZh: "阻断" },
};

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
          : (TOOLPRE_HOOKS.map((h) => h.decision).sort((a, b) => RANK[a] - RANK[b])[0] ?? "allow")
        : null;

    const extraCss = `
      .border-accent\\/50 { border-color: color-mix(in srgb, var(--accent, #0285ff) 50%, transparent); }
      .border-green\\/40 { border-color: color-mix(in srgb, var(--green, #189a4d) 40%, transparent); }
      .border-orange\\/40 { border-color: color-mix(in srgb, var(--orange, #ef720c) 40%, transparent); }
      .bg-green-tint\\/50 { background-color: color-mix(in srgb, var(--green-tint, #e8f5ed) 50%, transparent); }
      .bg-orange-tint\\/50 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 50%, transparent); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .opacity-45 { opacity: 0.45; }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
    `;

    this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-accent animate-pulse"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${zh ? "Hook 决策管线" : "Hook Pipeline"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              6 points
            </span>
          </div>
          <span class="font-mono text-[10.5px] text-ink-3">Harness.Hooks</span>
        </div>

        
        <div class="flex flex-wrap gap-1">
          ${POINTS.map(
            (p) => `
            <span
              class="point-tag rounded-chip border px-1.5 py-0.5 font-mono text-[9.5px] transition-colors duration-300 ${
                p === "ToolPre"
                  ? "border-accent/50 bg-accent-tint text-accent-ink"
                  : "border-line bg-inset text-ink-3"
              }"
            >
              ${p}
            </span>
          `
          ).join("")}
        </div>

        
        <div class="mt-3 flex items-center gap-2 rounded-control border border-line bg-inset px-2.5 py-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
          </svg>
          <code class="font-mono text-[11.5px] text-ink">fs.write</code>
          <span class="truncate font-mono text-[10.5px] text-ink-3">src/llm/retry.cs</span>
          <span class="ml-auto shrink-0 rounded-chip bg-field px-1.5 py-px font-mono text-[9.5px] text-ink-3">
            call_e51c
          </span>
        </div>

        
        <div class="mt-3 flex min-h-[132px] flex-col gap-1.5">
          ${TOOLPRE_HOOKS.map((hook, i) => {
            const active = i < evaluated;
            const style = DECISION_STYLE[hook.decision];
            return `
              <div
                class="hook-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${
                  active ? "border-line bg-surface" : "border-line/60 bg-inset/40 opacity-45"
                }"
                ${active ? 'style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"' : ""}
              >
                
                <span class="flex size-1.5 shrink-0 rounded-full ${active ? style.dot : "bg-line-strong"}"></span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <code class="font-mono text-[11px] font-medium text-ink">${hook.name}</code>
                    <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                      ${hook.matcher}
                    </span>
                  </div>
                  ${
                    active && hook.reasonEn
                      ? `
                    <span class="mt-0.5 block truncate text-[10.5px] text-ink-3">
                      ${zh ? hook.reasonZh : hook.reasonEn}
                    </span>
                  `
                      : ""
                  }
                </div>
                ${
                  active
                    ? `
                  <span class="shrink-0 rounded-chip px-1.5 py-0.5 font-mono text-[10px] font-medium ${style.chip}">
                    ${zh ? style.labelZh : style.labelEn}
                  </span>
                `
                    : `
                  <span class="shrink-0 font-mono text-[9.5px] text-ink-3">…</span>
                `
                }
                <span class="w-8 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                  ${active ? `${hook.latencyMs}ms` : ""}
                </span>
              </div>
            `;
          }).join("")}
        </div>

        
        <div
          class="merge-bar mt-1 flex items-center justify-between gap-2 rounded-control border px-3 py-2.5 transition-all duration-500 ${
            merged === "allow"
              ? "border-green/40 bg-green-tint/50"
              : merged === "ask"
              ? "border-orange/40 bg-orange-tint/50"
              : "border-line bg-inset/50"
          }"
        >
          <div class="flex min-w-0 items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
              <path d="M8 3v4a4 4 0 0 1-4 4h16M8 21v-4a4 4 0 0 0-4-4" />
              <path d="M18 8l3 3-3 3" transform="translate(-3 4)" />
            </svg>
            <span class="shrink-0 text-[11.5px] font-medium text-ink">
              ${zh ? "Merge · 最严优先" : "Merge · most-restrictive"}
            </span>
            <span class="hidden min-w-0 truncate font-mono text-[9.5px] text-ink-3 sm:inline">
              deny &gt; ask &gt; block &gt; allow
            </span>
          </div>
          ${
            merged
              ? `
            <span
              class="shrink-0 whitespace-nowrap rounded-chip px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                DECISION_STYLE[merged].chip
              }"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              ${
                merged === "allow" && phase >= 5
                  ? zh
                    ? "allow · 已批准"
                    : "allow · approved"
                  : zh
                  ? DECISION_STYLE[merged].labelZh
                  : DECISION_STYLE[merged].labelEn
              }
            </span>
          `
              : `
            <span class="font-mono text-[10px] text-ink-3">…</span>
          `
          }
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
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
          <span class="font-mono tabular-nums">
            ${phase >= 5 ? "fail-open: never" : "fail-closed"}
          </span>
        </div>
      </div>
    `, extraCss);
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-hook-pipeline")) {
  customElements.define("nai-hook-pipeline", NaiHookPipeline);
}
