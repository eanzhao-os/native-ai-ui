"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
 * STREAM TEXT — language-aware incremental reveal.
 *
 * Latin words keep their trailing whitespace while CJK text
 * advances in readable grapheme-sized units instead of
 * appearing as one all-or-nothing token.
 * ───────────────────────────────────────────────────────── */

const WORD_MS = 46;
const STREAM_UNIT = /\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|[^\s\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+\s*|\s+/gu;

function streamUnits(text: string) {
  return text.match(STREAM_UNIT) ?? Array.from(text);
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function StreamText({
  text,
  onProgress,
  onDone,
}: {
  text: string;
  onProgress?: () => void;
  onDone?: () => void;
}) {
  const units = useMemo(() => streamUnits(text), [text]);
  const reducedMotion = usePrefersReducedMotion();
  const [stream, setStream] = useState({ text, count: 0 });
  const doneTextRef = useRef<string | null>(null);
  const current = stream.text === text;
  const count = reducedMotion ? units.length : current ? stream.count : 0;
  const done = (reducedMotion || current) && count >= units.length;

  useEffect(() => {
    doneTextRef.current = null;
    if (reducedMotion) return;
    setStream({ text, count: 0 });
    if (units.length === 0) return;

    const timer = window.setInterval(() => {
      setStream((value) => {
        if (value.text !== text || value.count >= units.length) return value;
        const next = value.count + 1;
        if (next >= units.length) window.clearInterval(timer);
        return { ...value, count: next };
      });
    }, WORD_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion, text, units.length]);

  useEffect(() => {
    if (done && doneTextRef.current !== text) {
      doneTextRef.current = text;
      onDone?.();
    }
    // Callers intentionally pass inline progress/done closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, text]);

  useEffect(() => {
    if (current) onProgress?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, current]);

  if (reducedMotion) return <>{text}</>;

  return (
    <>
      {units.slice(0, count).map((unit, index) => (
        <span
          key={`${index}-${unit}`}
          className="inline [will-change:filter,opacity] motion-reduce:[animation:none] motion-reduce:[filter:none]"
          style={{
            animation: "stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both",
          }}
        >
          {unit}
        </span>
      ))}
      {!done && <span className="stream-caret is-streaming" aria-hidden="true" />}
    </>
  );
}
