"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SESSION LIST — agent session roster
 *
 * Rows read quiet by default: only the live pulse and the
 * active selection carry color. Live sessions keep a green
 * pulse dot; event activity lands as a tint count badge;
 * a single gliding highlight follows hover, falling back to
 * the active row.
 * ───────────────────────────────────────────────────────── */

type Session = {
  id: string;
  titleEn: string;
  titleZh: string;
  short: string;
  live: boolean;
};

const SESSIONS: Session[] = [
  { id: "s1", titleEn: "Refactor the churn scheduler", titleZh: "重构搅拌排期器", short: "01a0492d", live: true },
  { id: "s2", titleEn: "Audit supplier import jobs", titleZh: "审计供应商导入任务", short: "01a04771", live: true },
  { id: "s3", titleEn: "Draft the summer menu copy", titleZh: "起草夏季菜单文案", short: "01a03fe0", live: false },
  { id: "s4", titleEn: "Investigate freezer telemetry gaps", titleZh: "排查冷冻遥测数据缺口", short: "01a02b9c", live: false },
];

const TICK_MS = 2600;

export default function SessionList({
  lang: propLang,
  visualCase,
}: {
  lang?: "en" | "zh";
  visualCase?: string;
}) {
  const lang = useLang("session-list", propLang);
  const zh = lang === "zh";
  const selectedCase = visualCase === "selected";
  const headingId = `${useId()}-heading`;
  const countId = `${headingId}-count`;
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [active, setActive] = useState(selectedCase ? "s2" : "s1");
  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const [badges, setBadges] = useState<Record<string, number>>(
    selectedCase ? { s1: 2, s2: 0 } : { s1: 2, s2: 1 },
  );
  const [tick, setTick] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener?.("change", update);
    return () => preference.removeEventListener?.("change", update);
  }, []);

  /* Demo loop: activity lands on live sessions. Reduced-motion users keep
   * the roster stable instead of receiving timer-driven badge changes. */
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => {
      setTick((current) => (current + 1) % SESSIONS.length);
      const target = SESSIONS[(tick + 1) % SESSIONS.length];
      if (target.live) {
        setBadges((current) => ({ ...current, [target.id]: (current[target.id] ?? 0) + 1 }));
      }
    }, TICK_MS);
    return () => clearTimeout(timer);
  }, [reducedMotion, tick]);

  useLayoutEffect(() => {
    const container = listRef.current;
    const target = rowRefs.current[hovered ?? active];
    if (!container || !target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height });
  }, [hovered, active]);

  const openCount = SESSIONS.filter((session) => session.live).length;
  const highlighted = hovered ?? active;

  return (
    <div className="w-72 rounded-card bg-surface p-2 shadow-raised">
      {/* section header */}
      <div className="flex min-h-9 items-center justify-between px-2 pb-1 pt-1">
        <span id={headingId} className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-2">
          {zh ? "会话" : "Sessions"}
        </span>
        <span
          id={countId}
          role="status"
          aria-label={zh ? "实时会话数量" : "Live session count"}
          aria-live="polite"
          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-tint px-1 text-[10px] font-semibold tabular-nums text-accent-ink"
        >
          {openCount}
        </span>
      </div>

      {/* roster */}
      <div
        ref={listRef}
        role="list"
        aria-labelledby={headingId}
        aria-describedby={countId}
        onMouseLeave={() => setHovered(null)}
        className="relative flex flex-col gap-px"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition: reducedMotion
              ? "none"
              : "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
          }}
        />
        {SESSIONS.map((session) => {
          const isActive = session.id === active;
          const badge = badges[session.id] ?? 0;
          return (
            <div key={session.id} role="listitem" className="relative z-10">
              <button
                ref={(element) => {
                  rowRefs.current[session.id] = element;
                }}
                type="button"
                data-active={highlighted === session.id}
                onMouseEnter={() => setHovered(session.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(session.id)}
                onBlur={() => setHovered(null)}
                onClick={() => {
                  setActive(session.id);
                  setBadges((current) => ({ ...current, [session.id]: 0 }));
                }}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex min-h-11 w-full flex-col justify-center gap-0.5 rounded-[7px] px-2 py-1.5 text-left focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-transform duration-150 motion-reduce:transition-none active:scale-[0.98] motion-reduce:transform-none"
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  {session.live && (
                    <span aria-hidden className="size-1.5 shrink-0 animate-pulse rounded-full bg-green motion-reduce:animate-none" />
                  )}
                  <span className={`min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 motion-reduce:transition-none ${
                    isActive ? "font-medium text-ink" : "text-ink-2"
                  }`}>
                    {zh ? session.titleZh : session.titleEn}
                  </span>
                  {badge > 0 && (
                    <span
                      key={badge}
                      aria-label={zh ? `${badge} 条未读事件` : `${badge} unread event${badge === 1 ? "" : "s"}`}
                      className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums motion-reduce:animate-none ${
                        isActive ? "bg-surface text-ink-2 shadow-hairline" : "bg-accent-tint text-accent-ink"
                      }`}
                      style={{ animation: reducedMotion ? "none" : "pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
                    >
                      {badge}
                    </span>
                  )}
                </span>
                <span className="truncate pl-3 font-mono text-[10.5px] text-ink-2">
                  {session.short}
                  {!session.live && ` · ${zh ? "空闲" : "idle"}`}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* footer hint */}
      <div className="mt-1 border-t border-line px-2 pb-1 pt-1.5 text-[11px] text-ink-2">
        {zh ? "活动会话实时推送" : "Live sessions stream in real time"}
      </div>
    </div>
  );
}
