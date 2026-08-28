"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * WORKFLOW RUN — fan-out execution with concurrency slots
 *
 * Mirrors Harness.Workflow: a published WorkflowRun fans out
 * over items; members pick work bounded by MaxConcurrency.
 * The slot lanes show in-flight members; the item grid
 * fills as results land.
 * ───────────────────────────────────────────────────────── */

const TOTAL_ITEMS = 40;
const SLOTS = 4;

const SLOT_MEMBERS = ["w-01", "w-02", "w-03", "w-04"];

const TICK_MS = 420;
const HOLD_MS = 4200;

export default function WorkflowRun({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("workflow-run", propLang);
  const zh = lang === "zh";

  // done = completed item count; each slot works on item done+slotIndex
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done < TOTAL_ITEMS) {
      const t = setTimeout(() => setDone((d) => Math.min(TOTAL_ITEMS, d + SLOTS)), TICK_MS);
      return () => clearTimeout(t);
    }
    const hold = setTimeout(() => setDone(0), HOLD_MS);
    return () => clearTimeout(hold);
  }, [done]);

  const running = done < TOTAL_ITEMS;
  const inFlight = running ? Math.min(SLOTS, TOTAL_ITEMS - done) : 0;
  const pct = Math.round((done / TOTAL_ITEMS) * 100);

  return (
    <div className="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className={`flex size-2 rounded-full ${running ? "bg-accent animate-pulse" : "bg-green"}`} />
          <h3 className="text-[13px] font-semibold text-ink">
            {zh ? "工作流扇出执行" : "Workflow Fan-out"}
          </h3>
          <span className="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            run/8f2e1a
          </span>
        </div>
        <span className="font-mono text-[10.5px] tabular-nums text-ink-3">{pct}%</span>
      </div>

      {/* Run meta */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-control border border-line bg-inset px-2.5 py-2 font-mono text-[10px] text-ink-3">
        <span className="truncate">
          digest <span className="text-ink-2">sha256:9b7c…e4f1</span>
        </span>
        <span>
          concurrency <span className="text-ink-2 tabular-nums">{SLOTS}</span>
        </span>
        <span>
          max agents <span className="text-ink-2 tabular-nums">32</span>
        </span>
        <span>
          max items <span className="text-ink-2 tabular-nums">256</span>
        </span>
      </div>

      {/* Concurrency slots */}
      <div className="mt-3 flex flex-col gap-1.5">
        {SLOT_MEMBERS.map((member, i) => {
          const slotActive = i < inFlight;
          const itemIdx = done + i;
          return (
            <div
              key={member}
              className={`flex items-center gap-2.5 rounded-control border px-2.5 py-1.5 transition-all duration-300 ${
                slotActive ? "border-accent/40 bg-accent-tint/25" : "border-line bg-surface"
              }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[8.5px] font-semibold ${
                  slotActive ? "bg-accent text-white" : "bg-field text-ink-3"
                }`}
              >
                {member.slice(-2)}
              </span>
              <span className="font-mono text-[10.5px] text-ink-2">{member}</span>
              <div className="min-w-0 flex-1">
                {slotActive ? (
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-field">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-300"
                      style={{ width: `${((done % SLOTS) + 1) * 25}%` }}
                    />
                  </div>
                ) : (
                  <div className="h-1.5 w-full rounded-full bg-field/70" />
                )}
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                {slotActive
                  ? `item-${String(itemIdx + 1).padStart(2, "0")}`
                  : running
                  ? zh
                    ? "空闲"
                    : "idle"
                  : zh
                  ? "完成"
                  : "done"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Item grid */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            {zh ? "条目网格" : "Items"}
          </span>
          <span className="font-mono text-[10px] tabular-nums text-ink-3">
            {done}/{TOTAL_ITEMS}
          </span>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: TOTAL_ITEMS }, (_, i) => {
            const isDone = i < done;
            const isActive = running && i >= done && i < done + inFlight;
            return (
              <span
                key={i}
                className={`aspect-square w-full rounded-[4px] transition-all duration-300 ${
                  isDone
                    ? "bg-green/80"
                    : isActive
                    ? "bg-accent animate-pulse"
                    : "bg-field border border-line/60"
                }`}
                title={`item-${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
        <span>
          {running
            ? zh
              ? `${inFlight} 个成员并发处理中`
              : `${inFlight} members in flight`
            : zh
            ? "全部条目处理完成"
            : "All items processed"}
        </span>
        <span className="font-mono">Harness.Workflow</span>
      </div>
    </div>
  );
}
