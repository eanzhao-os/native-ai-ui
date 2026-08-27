"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * MODEL ARENA & OUTPUT COMPARATOR
 * ───────────────────────────────────────────────────────── */

export default function ModelArena({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("model-arena", propLang);
  const zh = lang === "zh";

  const [voted, setVoted] = useState<"A" | "B" | "tie" | null>(null);

  const modelA = {
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

  const modelB = {
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

  return (
    <div className="w-full max-w-2xl rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Prompt Banner */}
      <div className="flex items-start justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
              <polyline points="23 8 16 12 23 16" />
            </svg>
          </span>
          <span className="text-[12.5px] font-medium text-ink">
            {zh
              ? 'Prompt: "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"'
              : 'Prompt: "Implement sliding window rate limiting in TypeScript with Redis"'}
          </span>
        </div>
        <span className="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-3">
          {zh ? "盲测试验" : "Blind Eval"}
        </span>
      </div>

      {/* Side-by-Side Model Output Grid */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Model A */}
        <div
          className={`flex flex-col rounded-control border p-3 transition-all ${
            voted === "A"
              ? "border-accent bg-accent-tint/20 ring-1 ring-accent"
              : "border-line bg-inset/40"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-line/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-ink">
                {voted ? modelA.realName : modelA.name}
              </span>
              {voted === "A" && (
                <span className="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                  {zh ? "您的选择" : "Your Pick"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
              <span>{modelA.ttft}</span>
              <span>•</span>
              <span>{modelA.throughput}</span>
            </div>
          </div>
          <div className="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
            <pre>
              <code>{modelA.code}</code>
            </pre>
          </div>
        </div>

        {/* Model B */}
        <div
          className={`flex flex-col rounded-control border p-3 transition-all ${
            voted === "B"
              ? "border-accent bg-accent-tint/20 ring-1 ring-accent"
              : "border-line bg-inset/40"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-line/60">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-ink">
                {voted ? modelB.realName : modelB.name}
              </span>
              {voted === "B" && (
                <span className="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                  {zh ? "您的选择" : "Your Pick"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
              <span className="text-green font-medium">{modelB.ttft}</span>
              <span>•</span>
              <span className="text-green font-medium">{modelB.throughput}</span>
            </div>
          </div>
          <div className="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
            <pre>
              <code>{modelB.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Voting Actions & Feedback */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        <span className="text-[11.5px] text-ink-3">
          {voted
            ? zh
              ? "偏好投票已记录至 RLHF 训练数据集"
              : "Preferences recorded for RLHF dataset"
            : zh
            ? "哪个模型的输出质量更高？"
            : "Which response is higher quality?"}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setVoted("A")}
            className={`rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
              voted === "A"
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
            }`}
          >
            {zh ? "模型 A 更好" : "Model A Better"}
          </button>
          <button
            type="button"
            onClick={() => setVoted("tie")}
            className={`rounded-control border px-2.5 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
              voted === "tie"
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
            }`}
          >
            {zh ? "平手 / 均可" : "Tie"}
          </button>
          <button
            type="button"
            onClick={() => setVoted("B")}
            className={`rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${
              voted === "B"
                ? "border-accent bg-accent text-white"
                : "border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"
            }`}
          >
            {zh ? "模型 B 更好" : "Model B Better"}
          </button>
        </div>
      </div>
    </div>
  );
}
