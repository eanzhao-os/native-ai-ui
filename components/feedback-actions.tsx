"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * FEEDBACK ACTIONS — per-message rating controls
 *
 * Copy, thumbs-up, thumbs-down as a quiet icon row that
 * appears with the settled message. A rating is exclusive
 * and reversible: tapping the active thumb clears it,
 * tapping the other switches. Copy success is shown only
 * after a browser copy path actually succeeds.
 * ───────────────────────────────────────────────────────── */

type Rating = "up" | "down" | null;
type CopyStatus = "idle" | "copied" | "copy-error";

const MESSAGE_EN = "Pistachio churns fastest on weekends — schedule it first on Saturday mornings.";
const MESSAGE_ZH = "开心果口味在周末搅拌最快 —— 建议排在每周六清晨的首批。";
const STATUS_HOLD_MS = 1400;

function legacyCopy(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return typeof document.execCommand === "function" &&
      document.execCommand("copy") === true;
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // A denied async clipboard attempt still gets the legacy fallback.
    }
  }
  return legacyCopy(text);
}

export default function FeedbackActions({
  lang: propLang,
  visualCase,
}: {
  lang?: "en" | "zh";
  visualCase?: string;
}) {
  const lang = useLang("feedback-actions", propLang);
  const zh = lang === "zh";
  const initialRating: Rating =
    visualCase === "liked" ? "up" : visualCase === "disliked" ? "down" : null;
  const initialCopyStatus: CopyStatus =
    visualCase === "copy-error" ? "copy-error" : "idle";

  const [rating, setRating] = useState<Rating>(initialRating);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(initialCopyStatus);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const rate = (next: Exclude<Rating, null>) => {
    setRating((current) => (current === next ? null : next));
  };

  const copy = async () => {
    const copied = await copyText(zh ? MESSAGE_ZH : MESSAGE_EN);
    setCopyStatus(copied ? "copied" : "copy-error");
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(
      () => setCopyStatus("idle"),
      STATUS_HOLD_MS,
    );
  };

  const hasStatus = rating !== null || copyStatus !== "idle";
  const statusText =
    copyStatus === "copied"
      ? zh ? "已复制" : "Copied"
      : copyStatus === "copy-error"
        ? zh ? "复制失败" : "Copy failed"
        : rating === "up"
          ? zh ? "已标记为有用" : "Marked helpful"
          : rating === "down"
            ? zh ? "已标记为有问题" : "Marked unhelpful"
            : "";

  return (
    <div className="w-full max-w-95 rounded-card bg-surface p-4 shadow-card">
      <p className="text-[13px] leading-relaxed text-ink">
        {zh ? MESSAGE_ZH : MESSAGE_EN}
      </p>

      <div className="mt-2 flex items-center gap-0.5" role="group" aria-label={zh ? "消息操作" : "Message actions"}>
        <button
          type="button"
          aria-label={zh ? "复制回复" : "Copy response"}
          onClick={copy}
          className={`flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${
            copyStatus === "copied"
              ? "text-green"
              : copyStatus === "copy-error"
                ? "text-red"
                : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"
          }`}
        >
          {copyStatus === "copied" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="12" height="12" rx="2.5" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
        <button
          type="button"
          aria-label={zh ? "回答不错" : "Good response"}
          aria-pressed={rating === "up"}
          onClick={() => rate("up")}
          className={`flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${
            rating === "up" ? "bg-accent-tint text-accent-ink" : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={zh ? "回答有问题" : "Bad response"}
          aria-pressed={rating === "down"}
          onClick={() => rate("down")}
          className={`flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${
            rating === "down" ? "bg-red-tint text-red" : "text-ink-3 hover:bg-hover-2 hover:text-ink-2"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />
          </svg>
        </button>

        <span
          role="status"
          aria-live="polite"
          className={`ml-1.5 text-[11px] transition-opacity duration-300 ${
            copyStatus === "copy-error" ? "text-red" : "text-ink-3"
          }`}
          style={{ opacity: hasStatus ? 1 : 0 }}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}
