"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * MODEL ARENA & OUTPUT COMPARATOR
 * ───────────────────────────────────────────────────────── */

type Vote = "A" | "B" | "tie";

type ArenaModel = {
  code: string;
  cost: string;
  name: string;
  realName: string;
  throughput: string;
  ttft: string;
};

const MODELS: Record<"A" | "B", ArenaModel> = {
  A: {
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
  },
  B: {
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
  },
};

function ModelPanel({
  id,
  model,
  voted,
  zh,
}: {
  id: "A" | "B";
  model: ArenaModel;
  voted: Vote | null;
  zh: boolean;
}) {
  const selected = voted === id;
  const tied = voted === "tie";
  const badge = selected
    ? zh
      ? "您的选择"
      : "Your pick"
    : tied
      ? zh
        ? "并列选择"
        : "Tie"
      : null;

  return (
    <section
      aria-label={`${zh ? "模型" : "Model"} ${id}`}
      data-result={selected ? "selected" : tied ? "tie" : "unselected"}
      className={`flex min-w-0 flex-col rounded-control border p-3.5 transition-[background-color,border-color,box-shadow] ${
        selected
          ? "border-accent bg-accent-tint/20 shadow-[inset_0_0_0_1px_var(--accent)]"
          : tied
            ? "border-line-strong bg-hover/45 shadow-[inset_0_0_0_1px_var(--line-strong)]"
            : "border-line bg-inset/55"
      }`}
    >
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[12.5px] font-semibold text-ink">
            {voted ? model.realName : model.name}
          </span>
          {badge && (
            <span
              className={`shrink-0 rounded-chip px-1.5 py-0.5 text-[9px] font-semibold ${
                selected
                  ? "bg-accent-tint text-accent-ink"
                  : "bg-field text-ink-2"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <span className="rounded-full bg-surface px-2 py-0.5 font-mono text-[9.5px] font-semibold text-ink-3 shadow-hairline">
          {id}
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-1.5 border-b border-line/70 py-2.5 text-[9.5px]">
        {[
          [zh ? "首字延迟" : "TTFT", model.ttft],
          [zh ? "生成速率" : "Rate", model.throughput],
          [zh ? "估算成本" : "Cost", model.cost],
        ].map(([label, value]) => (
          <div key={label} className="min-w-0 rounded-chip bg-surface px-2 py-1.5 shadow-hairline">
            <dt className="truncate text-ink-3">{label}</dt>
            <dd className="mt-0.5 truncate font-mono font-semibold text-ink-2 tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        role="region"
        aria-label={`${zh ? "模型" : "Model"} ${id} ${zh ? "代码输出" : "code output"}`}
        tabIndex={0}
        className="mt-2.5 h-[250px] min-w-0 overflow-auto rounded-control bg-page p-3 font-mono text-[10.5px] leading-[1.65] text-ink-2 shadow-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <pre className="min-w-max">
          <code>{model.code}</code>
        </pre>
      </div>
    </section>
  );
}

export default function ModelArena({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("model-arena", propLang);
  const zh = lang === "zh";
  const [voted, setVoted] = useState<Vote | null>(null);

  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  return (
    <div className="w-full max-w-2xl rounded-card border border-line bg-surface p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-3.5">
        <div className="flex min-w-0 flex-1 items-start gap-2.5">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
              <polyline points="23 8 16 12 23 16" />
            </svg>
          </span>
          <p className="min-w-0 text-[12.5px] font-medium leading-relaxed text-ink">
            <span className="mr-1.5 font-semibold text-ink-2">Prompt</span>
            {zh
              ? "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"
              : "Implement sliding window rate limiting in TypeScript with Redis"}
          </p>
        </div>
        <span className="shrink-0 rounded-chip border border-line bg-inset px-2.5 py-1 font-mono text-[10px] text-ink-3">
          {zh ? "盲测试验" : "Blind Eval"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 items-stretch gap-3 md:grid-cols-2">
        <ModelPanel id="A" model={MODELS.A} voted={voted} zh={zh} />
        <ModelPanel id="B" model={MODELS.B} voted={voted} zh={zh} />
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-3.5 sm:flex-row sm:items-center sm:justify-between">
        <span role="status" aria-live="polite" className="min-h-5 text-[11.5px] leading-relaxed text-ink-3">
          {voted
            ? zh
              ? "偏好投票已记录至 RLHF 训练数据集"
              : "Preferences recorded for RLHF dataset"
            : zh
              ? "哪个模型的输出质量更高？"
              : "Which response is higher quality?"}
        </span>

        <div
          role="group"
          aria-label={zh ? "选择更高质量的回答" : "Choose higher-quality response"}
          className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center"
        >
          {([
            ["A", zh ? "模型 A 更好" : "Model A Better"],
            ["tie", zh ? "平手 / 均可" : "Tie"],
            ["B", zh ? "模型 B 更好" : "Model B Better"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={voted === value}
              onClick={() => setVoted(value)}
              className={`min-h-11 min-w-11 rounded-control border px-3 text-[11.5px] font-semibold transition-[background-color,border-color,color,transform] active:scale-[0.98] ${focusClasses} ${
                voted === value
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-ink-2 hover:border-line-strong hover:bg-hover hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
