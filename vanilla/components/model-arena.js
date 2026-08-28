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
    this._voted = null; // "A" | "B" | "tie" | null
  }

  vote(choice) {
    this._voted = choice;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const voted = this._voted;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 640px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header-banner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding-bottom: 12px;
          gap: 8px;
        }

        .prompt-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .prompt-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          flex-shrink: 0;
        }

        .prompt-text {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .eval-badge {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }

        .models-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 16px;
        }

        @media (max-width: 580px) {
          .models-grid {
            grid-template-columns: 1fr;
          }
        }

        .model-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent);
          padding: 12px;
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }

        .model-card.voted {
          border-color: var(--accent, #0285ff);
          background: color-mix(in srgb, var(--accent-tint, #e9f3ff) 20%, var(--surface, #fff));
          box-shadow: 0 0 0 1px var(--accent, #0285ff);
        }

        .model-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-bottom: 8px;
        }

        .model-title-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .model-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .pick-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }

        .model-metrics {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-fast {
          color: var(--green, #189a4d);
          font-weight: 500;
        }

        .code-box {
          margin-top: 10px;
          overflow-x: auto;
          border-radius: var(--radius-control, 8px);
          background: var(--page, #fafafb);
          padding: 10px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }

        .code-box pre {
          margin: 0;
        }

        .actions-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          margin-top: 16px;
        }

        .status-msg {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }

        .vote-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .vote-btn {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          padding: 4px 12px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, border-color 0.15s;
        }

        .vote-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .vote-btn.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }
      </style>

      <div class="header-banner">
        <div class="prompt-info">
          <span class="prompt-icon">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
              <polyline points="23 8 16 12 23 16" />
            </svg>
          </span>
          <span class="prompt-text">
            ${
              zh
                ? 'Prompt: "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"'
                : 'Prompt: "Implement sliding window rate limiting in TypeScript with Redis"'
            }
          </span>
        </div>
        <span class="eval-badge">
          ${zh ? "盲测试验" : "Blind Eval"}
        </span>
      </div>

      <div class="models-grid">
        <!-- Model A -->
        <div class="model-card ${voted === "A" ? "voted" : ""}">
          <div class="model-header">
            <div class="model-title-group">
              <span class="model-name">${voted ? MODEL_A.realName : MODEL_A.name}</span>
              ${voted === "A" ? `<span class="pick-badge">${zh ? "您的选择" : "Your Pick"}</span>` : ""}
            </div>
            <div class="model-metrics">
              <span>${MODEL_A.ttft}</span>
              <span>•</span>
              <span>${MODEL_A.throughput}</span>
            </div>
          </div>
          <div class="code-box">
            <pre><code>${MODEL_A.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
          </div>
        </div>

        <!-- Model B -->
        <div class="model-card ${voted === "B" ? "voted" : ""}">
          <div class="model-header">
            <div class="model-title-group">
              <span class="model-name">${voted ? MODEL_B.realName : MODEL_B.name}</span>
              ${voted === "B" ? `<span class="pick-badge">${zh ? "您的选择" : "Your Pick"}</span>` : ""}
            </div>
            <div class="model-metrics">
              <span class="metric-fast">${MODEL_B.ttft}</span>
              <span>•</span>
              <span class="metric-fast">${MODEL_B.throughput}</span>
            </div>
          </div>
          <div class="code-box">
            <pre><code>${MODEL_B.code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
          </div>
        </div>
      </div>

      <div class="actions-bar">
        <span class="status-msg">
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

        <div class="vote-btns">
          <button type="button" class="vote-btn ${voted === "A" ? "selected" : ""}" id="vote-a">
            ${zh ? "模型 A 更好" : "Model A Better"}
          </button>
          <button type="button" class="vote-btn ${voted === "tie" ? "selected" : ""}" id="vote-tie">
            ${zh ? "平手 / 均可" : "Tie"}
          </button>
          <button type="button" class="vote-btn ${voted === "B" ? "selected" : ""}" id="vote-b">
            ${zh ? "模型 B 更好" : "Model B Better"}
          </button>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector("#vote-a")?.addEventListener("click", () => this.vote("A"));
    this.shadowRoot.querySelector("#vote-tie")?.addEventListener("click", () => this.vote("tie"));
    this.shadowRoot.querySelector("#vote-b")?.addEventListener("click", () => this.vote("B"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-model-arena")) {
  customElements.define("nai-model-arena", NaiModelArena);
}
