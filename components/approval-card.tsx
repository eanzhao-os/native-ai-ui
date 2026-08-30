"use client";

import {
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * APPROVAL CARD (human-in-the-loop)
 * ───────────────────────────────────────────────────────── */

const QUESTIONS_EN = [
  {
    q: "How many flavors should we launch?",
    type: "radio" as const,
    options: ["Three (core line)", "Five (full case)", "Just one hero"],
  },
  {
    q: "Which mix-ins should we stock?",
    type: "check" as const,
    options: ["Chocolate chips", "Waffle bits", "Sprinkles"],
  },
  {
    q: "Which market do we enter first?",
    type: "radio" as const,
    options: ["Food trucks", "Grocery freezers", "Scoop shops"],
  },
];

const QUESTIONS_ZH = [
  {
    q: "首批上线推出几款新口味？",
    type: "radio" as const,
    options: ["3 款 (核心经典线)", "5 款 (完整全品类)", "仅推 1 款爆品"],
  },
  {
    q: "首批需要进货哪些混合配料？",
    type: "check" as const,
    options: ["黑巧碎粒", "华夫脆角碎片", "彩色糖针"],
  },
  {
    q: "优先切入哪个试点销售渠道？",
    type: "radio" as const,
    options: ["流动餐车", "精品超市冷柜", "线下直营体验店"],
  },
];

export default function ApprovalCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("approval-card", propLang);
  const zh = lang === "zh";
  const choiceGroupId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const optionRefs = useRef<Array<HTMLInputElement | null>>([]);
  const startOverRef = useRef<HTMLButtonElement>(null);

  const QUESTIONS = zh ? QUESTIONS_ZH : QUESTIONS_EN;

  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [custom, setCustom] = useState<Record<number, string>>({});
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(true);
  const question = QUESTIONS[qi];
  const last = qi === QUESTIONS.length - 1;
  const selected = answers[qi] ?? [];
  const hasAnswer = selected.length > 0 || Boolean(custom[qi]?.trim());

  useEffect(() => {
    if (sent) startOverRef.current?.focus();
  }, [sent]);

  const toggle = (index: number) => {
    setAnswers((current) => {
      const picked = current[qi] ?? [];
      const next =
        question.type === "radio"
          ? [index]
          : picked.includes(index)
            ? picked.filter((item) => item !== index)
            : [...picked, index];
      return { ...current, [qi]: next };
    });
    if (question.type === "radio") {
      setCustom((current) => ({ ...current, [qi]: "" }));
      window.setTimeout(() => {
        if (qi === QUESTIONS.length - 1) setSent(true);
        else setQi((current) => Math.min(QUESTIONS.length - 1, current + 1));
      }, 480);
    }
  };

  const handleChoiceKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === " ") {
      event.preventDefault();
      toggle(index);
      return;
    }
    if (
      question.type !== "radio" ||
      !["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].includes(
        event.key,
      )
    ) {
      return;
    }

    event.preventDefault();
    const direction =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (index + direction + question.options.length) % question.options.length;
    optionRefs.current[nextIndex]?.focus();
    toggle(nextIndex);
  };

  const reset = () => {
    setQi(0);
    setAnswers({});
    setCustom({});
    setSent(false);
    setOpen(true);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="min-h-11 rounded-control bg-surface px-3 text-[12.5px] font-medium text-ink shadow-btn transition-colors duration-150 hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
      >
        {zh ? "打开审批流卡片" : "Open approval"}
      </button>
    );
  }

  return (
    <div className="flex min-h-[196px] w-full max-w-80 flex-col items-stretch">
      <div className="w-full self-start overflow-hidden rounded-card bg-surface shadow-card">
        {sent ? (
          <div
            role="status"
            className="flex min-h-37 flex-col items-center justify-center gap-2"
          >
            <span
              className="flex size-6 items-center justify-center rounded-full bg-green text-white"
              style={{ animation: "pop-in 300ms cubic-bezier(0.23,1,0.32,1) both" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <span className="text-[13px] font-medium text-ink" style={{ animation: "fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both" }}>
              {zh ? "审批决策已提交" : "Answers sent"}
            </span>
            <button
              ref={startOverRef}
              type="button"
              onClick={reset}
              className="min-h-11 rounded-control px-3 text-[12px] font-medium text-accent-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              {zh ? "重新填写" : "Start over"}
            </button>
          </div>
        ) : (
          <div key={qi} className="primitive-card-pad" style={{ animation: "fade-up 350ms cubic-bezier(0.23,1,0.32,1) both" }}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[13px] font-medium text-ink">{question.q}</span>
              <button
                type="button"
                aria-label={zh ? "关闭审批" : "Dismiss"}
                onClick={() => setOpen(false)}
                className="-m-2.5 flex size-11 shrink-0 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <fieldset className="mt-2 flex flex-col gap-0.5">
              <legend className="sr-only">{question.q}</legend>
              {question.options.map((option, i) => {
                const on = selected.includes(i);
                return (
                  <label
                    key={option}
                    className="-mx-1.5 flex min-h-11 cursor-pointer items-center gap-2 rounded-control px-1.5 text-left transition-colors duration-100 hover:bg-hover focus-within:ring-2 focus-within:ring-accent"
                  >
                    <input
                      ref={(node) => {
                        optionRefs.current[i] = node;
                      }}
                      type={question.type === "radio" ? "radio" : "checkbox"}
                      name={`approval-${choiceGroupId}-${qi}`}
                      checked={on}
                      onChange={() => toggle(i)}
                      onKeyDown={(event) => handleChoiceKeyDown(event, i)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex size-4 shrink-0 items-center justify-center transition-colors duration-200
                        ${question.type === "radio" ? "rounded-full" : "rounded-[5px]"}
                        ${on ? "bg-ink text-canvas" : "shadow-[inset_0_0_0_1.5px_var(--line-strong)] text-transparent"}`}
                    >
                      {question.type === "radio" ? (
                        <span className="size-1.5 rounded-full bg-canvas transition-transform duration-200" style={{ transform: on ? "scale(1)" : "scale(0)" }} />
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      )}
                    </span>
                    <span className={`text-[13px] transition-colors duration-200 ${on ? "text-ink" : "text-ink-2"}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
              <label className="-mx-1.5 flex min-h-11 items-center gap-2 rounded-control px-1.5 transition-colors duration-100 focus-within:bg-hover focus-within:ring-2 focus-within:ring-accent hover:bg-hover">
                <span aria-hidden="true" className="size-4 shrink-0" />
                <input
                  value={custom[qi] ?? ""}
                  onChange={(event) => {
                    setCustom((current) => ({ ...current, [qi]: event.target.value }));
                    if (question.type === "radio") setAnswers((current) => ({ ...current, [qi]: [] }));
                  }}
                  placeholder={zh ? "输入其他自定义内容…" : "Type something…"}
                  aria-label={zh ? "自定义答案" : "Custom answer"}
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
                />
              </label>
            </fieldset>
          </div>
        )}

        {/* footer */}
        <div className="primitive-card-footer flex items-center justify-between">
          <span className="flex items-center gap-2">
            <button
              type="button"
              aria-label={zh ? "上一题" : "Previous"}
              disabled={qi === 0 || sent}
              onClick={() => setQi((current) => Math.max(0, current - 1))}
              className="flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="flex items-center gap-1">
              {QUESTIONS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={zh ? `转到第 ${i + 1} 题` : `Go to question ${i + 1}`}
                  aria-current={i === qi && !sent ? "step" : undefined}
                  disabled={sent}
                  onClick={() => setQi(i)}
                  className="flex size-11 items-center justify-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default"
                >
                  <span
                    aria-hidden="true"
                    className="rounded-full transition-all duration-300"
                    style={
                      i === qi && !sent
                        ? { width: 9, height: 9, border: "2.5px solid var(--ink)" }
                        : sent || i < qi
                          ? { width: 7, height: 7, background: "var(--ink-3)" }
                          : { width: 7, height: 7, border: "1.5px solid var(--ink-3)" }
                    }
                  />
                </button>
              ))}
            </span>
            <button
              type="button"
              aria-label={zh ? "下一题" : "Next"}
              disabled={last || sent}
              onClick={() => setQi((current) => Math.min(QUESTIONS.length - 1, current + 1))}
              className="flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          </span>
          {!sent && (
            <button
              type="button"
              aria-label={last ? (zh ? "提交答案" : "Send answers") : (zh ? "继续下一题" : "Next question")}
              disabled={!hasAnswer}
              onClick={() => last ? setSent(true) : setQi((current) => current + 1)}
              className="flex size-11 items-center justify-center rounded-[8px] transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed enabled:cursor-pointer"
              style={{
                background: hasAnswer ? "var(--ink)" : "var(--field)",
                color: hasAnswer ? "var(--canvas)" : "var(--ink-3)",
                boxShadow: hasAnswer
                  ? "inset 0 1px 0 color-mix(in srgb, var(--surface) 22%, transparent)"
                  : "var(--shadow-btn)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
