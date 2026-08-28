import { NaiBaseElement } from "../core/base-element.js";

const MODEL_A = {
  name: "Model Alpha",
  realName: "Claude 3.7 Sonnet",
  ttft: "340ms",
  throughput: "78 tok/s",
  cost: "$0.0024",
  code: `export class SlidingRateLimiter {
  async isAllowed(key: string, limit: number, windowSec: number): Promise<boolean> {
    const now = Date.now();
    const clearBefore = now - windowSec * 1000;
    const multi = redis.multi();
    multi.zremrangebyscore(key, 0, clearBefore);
    multi.zadd(key, now, \`\${now}-\${Math.random()}\`);
    multi.zcard(key);
    multi.expire(key, windowSec);
    const results = await multi.exec();
    return (results?.[2] as number) <= limit;
  }
}`,
};

const MODEL_B = {
  name: "Model Beta",
  realName: "Gemini 2.5 Flash",
  ttft: "180ms",
  throughput: "142 tok/s",
  cost: "$0.0007",
  code: `export async function checkRateLimit(key: string, limit = 60, windowMs = 60000) {
  const now = Date.now();
  const tx = redis.pipeline();
  tx.zremrangebyscore(key, '-inf', now - windowMs);
  tx.zadd(key, { score: now, member: crypto.randomUUID() });
  tx.zcard(key);
  tx.pexpire(key, windowMs);
  const [_, __, count] = await tx.exec();
  return Number(count) <= limit;
}`,
};

export class NaiModelArena extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._voted = null;
  }

  vote(choice) {
    this._voted = choice;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const voted = this._voted;

    const extraCss = `
      .max-w-2xl { max-width: 672px; }
      .bg-accent-tint\\/20 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 20%, var(--surface, #fff)); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .ring-1 { box-shadow: 0 0 0 1px var(--ring-color, currentColor); }
      .ring-accent { --ring-color: var(--accent, #0285ff); }
      .size-5 { width: 20px; height: 20px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .leading-relaxed { line-height: 1.625; }
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
    `;

    this.setHtml(`
      <div class="w-full max-w-2xl rounded-card border border-line bg-surface p-5 shadow-card">
        {/* Prompt Banner */}
        <div class="flex items-start justify-between border-b border-line pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <polyline points="23 8 16 12 23 16" />
              </svg>
            </span>
            <span class="text-[12.5px] font-medium text-ink">
              ${
                zh
                  ? 'Prompt: "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"'
                  : 'Prompt: "Implement sliding window rate limiting in TypeScript with Redis"'
              }
            </span>
          </div>
          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-3">
            ${zh ? "盲测试验" : "Blind Eval"}
          </span>
        </div>

        {/* Side-by-Side Model Output Grid */}
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Model A */}
          <div
            class="flex flex-col rounded-control border p-3 transition-all ${
              voted === "A"
                ? "border-accent bg-accent-tint/20 ring-1 ring-accent"
                : "border-line bg-inset/40"
            }"
          >
            <div class="flex items-center justify-between pb-2 border-b border-line/60">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] font-semibold text-ink">
                  ${voted ? MODEL_A.realName : MODEL_A.name}
                </span>
                ${
                  voted === "A"
                    ? `
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${zh ? "您的选择" : "Your Pick"}
                  </span>
                `
                    : ""
                }
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span>${MODEL_A.ttft}</span>
                <span>•</span>
                <span>${MODEL_A.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${MODEL_A.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            </div>
          </div>

          {/* Model B */}
          <div
            class="flex flex-col rounded-control border p-3 transition-all ${
              voted === "B"
                ? "border-accent bg-accent-tint/20 ring-1 ring-accent"
                : "border-line bg-inset/40"
            }"
          >
            <div class="flex items-center justify-between pb-2 border-b border-line/60">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] font-semibold text-ink">
                  ${voted ? MODEL_B.realName : MODEL_B.name}
                </span>
                ${
                  voted === "B"
                    ? `
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${zh ? "您的选择" : "Your Pick"}
                  </span>
                `
                    : ""
                }
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span class="text-green font-medium">${MODEL_B.ttft}</span>
                <span>•</span>
                <span class="text-green font-medium">${MODEL_B.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${MODEL_B.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            </div>
          </div>
        </div>

        {/* Voting Actions & Feedback */}
        <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
          <span class="text-[11.5px] text-ink-3">
            ${
              voted
                ? zh
                  ? "偏好投票已记录至 RLHF 训练数据集"
                  : "Preferences recorded for RLHF dataset"
                : zh
                ? "哪个模型的输出质量更高？"
                : "Which response is higher quality?"
            }
          </span>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              id="vote-a"
              class="rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
                voted === "A"
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
              }"
            >
              ${zh ? "模型 A 更好" : "Model A Better"}
            </button>
            <button
              type="button"
              id="vote-tie"
              class="rounded-control border px-2.5 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
                voted === "tie"
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
              }"
            >
              ${zh ? "平手 / 均可" : "Tie"}
            </button>
            <button
              type="button"
              id="vote-b"
              class="rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
                voted === "B"
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
              }"
            >
              ${zh ? "模型 B 更好" : "Model B Better"}
            </button>
          </div>
        </div>
      </div>
    `, extraCss);

    this.shadowRoot.querySelector("#vote-a")?.addEventListener("click", () => this.vote("A"));
    this.shadowRoot.querySelector("#vote-tie")?.addEventListener("click", () => this.vote("tie"));
    this.shadowRoot.querySelector("#vote-b")?.addEventListener("click", () => this.vote("B"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-model-arena")) {
  customElements.define("nai-model-arena", NaiModelArena);
}
