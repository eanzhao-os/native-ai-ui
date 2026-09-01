"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChatBubbleQuestion,
  Check,
  EmojiSatisfied,
  NavArrowRight,
  Refresh,
  Scissor,
  Spark,
  TextBox,
  Xmark,
} from "iconoir-react";
import { Shimmer } from "@/components/atoms/Shimmer";
import { StreamText, usePrefersReducedMotion } from "@/components/atoms/StreamText";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SELECTION ACTIONS
 * A contextual, keyboard-operable AI toolbar beneath selected
 * text. Actions run a small honest local state machine.
 * ───────────────────────────────────────────────────────── */

const LEAD_EN = "Pistachio holds the top slot all weekend. ";
const LEAD_ZH = "整个周末，开心果口味都稳居销量榜首。";
const PICKED_EN =
  "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.";
const PICKED_ZH =
  "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。";
const REWRITE_EN =
  "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.";
const REWRITE_ZH =
  "周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。";
const SHORTEN_EN = "Churn pistachio Saturday morning so it firms before the rush.";
const SHORTEN_ZH = "周六早上先搅拌开心果，让它在高峰前凝冻成型。";
const TONE_EN = "Please churn pistachio first on Saturday so it is fully set before the afternoon rush.";
const TONE_ZH = "请在周六优先搅拌开心果，确保它在下午高峰前充分凝冻。";
const GRAMMAR_EN =
  "Churn the pistachio batch first thing Saturday so it has time to firm up before the afternoon rush.";
const GRAMMAR_ZH =
  "周六一开工，先搅拌开心果这一批，让它在下午高峰前有足够时间凝冻成型。";
const CUSTOM_DIRECT_EN =
  "Churn pistachio early Saturday; let it firm before the afternoon rush.";
const CUSTOM_DIRECT_ZH = "周六先搅拌开心果，下午高峰前完成凝冻。";
const CUSTOM_SHORTER_EN =
  "Churn pistachio Saturday morning; let it firm before the rush.";
const CUSTOM_SHORTER_ZH = "周六早上搅拌开心果，高峰前凝冻成型。";
const EXPLANATION_EN =
  "This sentence prioritizes the Saturday churn so the batch has enough setting time before peak service.";
const EXPLANATION_ZH =
  "这句话把周六的搅拌任务设为优先事项，确保冰淇淋在高峰营业前有足够的凝冻时间。";

type Mode = "idle" | "thinking" | "streaming" | "result";
type Action = "explain" | "improve" | "shorten" | "tone" | "grammar" | "custom";
type FocusTarget = "toolbar" | "result" | "idle";
type CustomPromptKey = "direct" | "shorter";

const CUSTOM_PROMPTS: Record<CustomPromptKey, {
  instructionEn: string;
  instructionZh: string;
  resultEn: string;
  resultZh: string;
}> = {
  direct: {
    instructionEn: "Make it more direct",
    instructionZh: "改得更直接",
    resultEn: CUSTOM_DIRECT_EN,
    resultZh: CUSTOM_DIRECT_ZH,
  },
  shorter: {
    instructionEn: "Make it shorter",
    instructionZh: "写得更简短",
    resultEn: CUSTOM_SHORTER_EN,
    resultZh: CUSTOM_SHORTER_ZH,
  },
};

function resolveCustomPrompt(prompt: string, zh: boolean): CustomPromptKey | null {
  const normalized = prompt.trim().replace(/\s+/g, " ").toLocaleLowerCase();
  for (const [key, definition] of Object.entries(CUSTOM_PROMPTS) as [CustomPromptKey, typeof CUSTOM_PROMPTS[CustomPromptKey]][]) {
    const instruction = zh ? definition.instructionZh : definition.instructionEn;
    if (normalized === instruction.toLocaleLowerCase()) return key;
  }
  return null;
}

function unsupportedPromptStatus(zh: boolean) {
  return zh
    ? "不支持该指令。请尝试“改得更直接”或“写得更简短”。"
    : "Unsupported instruction. Try “Make it more direct” or “Make it shorter”.";
}

function rewriteFor(
  action: Exclude<Action, "explain">,
  zh: boolean,
  customPrompt: CustomPromptKey | null,
) {
  if (action === "shorten") return zh ? SHORTEN_ZH : SHORTEN_EN;
  if (action === "tone") return zh ? TONE_ZH : TONE_EN;
  if (action === "grammar") return zh ? GRAMMAR_ZH : GRAMMAR_EN;
  if (action === "custom" && customPrompt) {
    const definition = CUSTOM_PROMPTS[customPrompt];
    return zh ? definition.resultZh : definition.resultEn;
  }
  return zh ? REWRITE_ZH : REWRITE_EN;
}

function progressStatus(
  action: Action,
  zh: boolean,
  customPrompt: CustomPromptKey | null,
) {
  if (action === "explain") return zh ? "解释处理中" : "Explanation in progress";
  if (action === "improve") return zh ? "优化处理中" : "Improvement in progress";
  if (action === "shorten") return zh ? "精简处理中" : "Shortening in progress";
  if (action === "tone") return zh ? "语气调整处理中" : "Tone change in progress";
  if (action === "grammar") return zh ? "语法修正处理中" : "Grammar fix in progress";
  return customPrompt === "shorter"
    ? zh ? "自定义精简处理中" : "Shorter edit in progress"
    : zh ? "自定义直接改写处理中" : "Direct edit in progress";
}

function readyStatus(
  action: Exclude<Action, "explain">,
  zh: boolean,
  customPrompt: CustomPromptKey | null,
) {
  if (action === "improve") return zh ? "优化文本已就绪" : "Improved text ready";
  if (action === "shorten") return zh ? "精简文本已就绪" : "Shortened text ready";
  if (action === "tone") return zh ? "语气调整已就绪" : "Tone change ready";
  if (action === "grammar") return zh ? "语法修正已就绪" : "Grammar fix ready";
  return customPrompt === "shorter"
    ? zh ? "自定义精简已就绪" : "Shorter edit ready"
    : zh ? "自定义直接改写已就绪" : "Direct edit ready";
}

const iconProps = {
  width: 14,
  height: 14,
  strokeWidth: 1.8,
  "aria-hidden": true,
} as const;

const icons = {
  explain: <ChatBubbleQuestion {...iconProps} />,
  improve: <Spark {...iconProps} />,
  shorten: <Scissor {...iconProps} />,
  tone: <EmojiSatisfied {...iconProps} />,
  grammar: <TextBox {...iconProps} />,
  send: <ArrowUp width="16" height="16" strokeWidth="2.4" aria-hidden="true" />,
  chevron: <NavArrowRight {...iconProps} />,
  check: <Check {...iconProps} />,
  close: <Xmark {...iconProps} />,
  retry: <Refresh {...iconProps} />,
};

const control =
  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-ink transition-[background-color,color,transform] duration-150 motion-reduce:transition-none hover:bg-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent";
const primary =
  "inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-semibold text-canvas shadow-hairline transition-[opacity,transform] duration-150 motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function SelectionActions({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("selection-actions", propLang);
  const zh = lang === "zh";
  const lead = zh ? LEAD_ZH : LEAD_EN;
  const initial = zh ? PICKED_ZH : PICKED_EN;
  const reducedMotion = usePrefersReducedMotion();

  const [shown, setShown] = useState(reducedMotion);
  const [mode, setMode] = useState<Mode>("idle");
  const [action, setAction] = useState<Action>("improve");
  const [committedText, setCommittedText] = useState(initial);
  const [draftText, setDraftText] = useState(initial);
  const [prompt, setPrompt] = useState("");
  const [submittedCustomPrompt, setSubmittedCustomPrompt] = useState<CustomPromptKey | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const toolbarRef = useRef<HTMLDivElement>(null);
  const improveRef = useRef<HTMLButtonElement>(null);
  const keepRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);
  const pendingFocusRef = useRef<FocusTarget | null>(null);
  const previousLangRef = useRef(lang);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      return;
    }

    setShown(false);
    const timer = window.setTimeout(() => setShown(true), 280);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (previousLangRef.current === lang) return;
    previousLangRef.current = lang;
    pendingFocusRef.current = null;
    setMode("idle");
    setAction("improve");
    setCommittedText(initial);
    setDraftText(initial);
    setSubmittedCustomPrompt(null);
    setExpanded(false);
    setExplanation("");
    setAnnouncement("");
  }, [initial, lang]);

  useEffect(() => {
    if (mode !== "thinking") return;
    const timer = window.setTimeout(() => {
      if (action === "explain") {
        const next = zh ? EXPLANATION_ZH : EXPLANATION_EN;
        pendingFocusRef.current = "result";
        setExplanation(next);
        setAnnouncement(next);
        setMode("result");
        return;
      }

      setDraftText(rewriteFor(action, zh, submittedCustomPrompt));
      setMode("streaming");
    }, 700);
    return () => window.clearTimeout(timer);
  }, [action, mode, submittedCustomPrompt, zh]);

  useEffect(() => {
    const pending = pendingFocusRef.current;
    if (!pending || !shown) return;

    if (pending === "toolbar" && (mode === "thinking" || mode === "streaming")) {
      toolbarRef.current?.focus();
      pendingFocusRef.current = null;
    } else if (pending === "result" && mode === "result") {
      (action === "explain" ? doneRef : keepRef).current?.focus();
      pendingFocusRef.current = null;
    } else if (pending === "idle" && mode === "idle") {
      improveRef.current?.focus();
      pendingFocusRef.current = null;
    }
  }, [action, mode, shown]);

  const actionLabel =
    action === "explain"
      ? zh ? "解释" : "Explaining"
      : action === "improve"
        ? zh ? "优化" : "Improving"
        : action === "shorten"
          ? zh ? "精简" : "Shortening"
          : action === "tone"
            ? zh ? "调整语气" : "Changing tone"
            : action === "grammar"
              ? zh ? "修正文法" : "Fixing grammar"
              : submittedCustomPrompt === "shorter"
                ? zh ? "自定义精简" : "Applying shorter edit"
                : zh ? "自定义直接改写" : "Applying direct edit";

  const run = (nextAction: Action) => {
    const customPrompt = nextAction === "custom"
      ? resolveCustomPrompt(prompt, zh)
      : null;
    if (nextAction === "custom" && !customPrompt) {
      setAnnouncement(unsupportedPromptStatus(zh));
      return;
    }

    setAction(nextAction);
    setSubmittedCustomPrompt(customPrompt);
    setExpanded(false);
    setExplanation("");
    setAnnouncement(progressStatus(nextAction, zh, customPrompt));

    if (reducedMotion) {
      pendingFocusRef.current = "result";
      if (nextAction === "explain") {
        const next = zh ? EXPLANATION_ZH : EXPLANATION_EN;
        setExplanation(next);
        setAnnouncement(next);
      } else {
        setDraftText(rewriteFor(nextAction, zh, customPrompt));
        setAnnouncement(readyStatus(nextAction, zh, customPrompt));
      }
      setMode("result");
      return;
    }

    pendingFocusRef.current = "toolbar";
    setMode("thinking");
  };

  const resetToolbar = (message: string, restoreFocus = false) => {
    if (restoreFocus) pendingFocusRef.current = "idle";
    setMode("idle");
    setExpanded(false);
    setPrompt("");
    setSubmittedCustomPrompt(null);
    setExplanation("");
    setAnnouncement(message);
  };

  const keep = () => {
    setCommittedText(draftText);
    resetToolbar(zh ? "已保留修改" : "Changes kept", true);
  };

  const discard = () => {
    setDraftText(committedText);
    resetToolbar(zh ? "已放弃修改" : "Changes discarded", true);
  };

  const retry = () => run(action);
  const busy = mode === "thinking" || mode === "streaming";
  const rewriteVisible = mode === "streaming" || (mode === "result" && action !== "explain");
  const resolvedCustomPrompt = resolveCustomPrompt(prompt, zh);
  const unsupportedCustomPrompt =
    mode === "idle" && prompt.trim().length > 0 && !resolvedCustomPrompt;
  const statusText = unsupportedCustomPrompt
    ? unsupportedPromptStatus(zh)
    : announcement;

  return (
    <div className="w-full max-w-[520px]">
      <div className="relative rounded-card border border-transparent px-3 py-4 sm:px-4">
        <p className="text-[13px] leading-[1.75] text-ink">
          {lead}
          <span
            data-selection-text=""
            className="box-decoration-clone rounded-[4px] bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] px-0.5 text-ink dark:bg-accent-tint"
          >
            {mode === "streaming" ? (
              <StreamText
                text={draftText}
                onDone={() => {
                  if (action === "explain") return;
                  pendingFocusRef.current = "result";
                  setMode("result");
                  setAnnouncement(readyStatus(action, zh, submittedCustomPrompt));
                }}
              />
            ) : rewriteVisible ? (
              draftText
            ) : (
              committedText
            )}
          </span>
        </p>

        {mode === "result" && action === "explain" ? (
          <div role="note" className="mt-2.5 rounded-control border border-line bg-inset px-3 py-2 text-[11.5px] leading-relaxed text-ink-2 shadow-hairline">
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">
              {zh ? "说明" : "Explanation"}
            </span>
            {explanation}
          </div>
        ) : null}

        <div className="mt-3 flex justify-center">
          {shown ? (
            <div
              ref={toolbarRef}
              role="toolbar"
              tabIndex={-1}
              aria-label={zh ? "选中文本操作" : "Selection actions"}
              aria-busy={busy}
              className="flex min-h-11 max-w-full flex-wrap items-center justify-center gap-1 rounded-[22px] border border-line bg-surface p-1 font-sans text-ink shadow-overlay focus:outline-none"
            >
            {busy ? (
              <span className="inline-flex min-h-9 items-center gap-2 whitespace-nowrap px-3 text-[12.5px] font-medium text-ink-2">
                <span className="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 motion-safe:animate-spin" aria-hidden="true" />
                {mode === "thinking" ? (
                  <Shimmer className="text-[12.5px] font-medium">{actionLabel}…</Shimmer>
                ) : (
                  <span>{actionLabel}…</span>
                )}
              </span>
            ) : mode === "result" && action === "explain" ? (
              <>
                <button ref={doneRef} type="button" onClick={() => resetToolbar(zh ? "说明已关闭" : "Explanation closed", true)} className={primary}>
                  {icons.check}
                  {zh ? "完成" : "Done"}
                </button>
                <button type="button" aria-label={zh ? "重新解释" : "Explain again"} onClick={retry} className={control}>
                  {icons.retry}
                  {zh ? "重试" : "Try again"}
                </button>
              </>
            ) : mode === "result" ? (
              <>
                <button ref={keepRef} type="button" onClick={keep} className={primary}>
                  {icons.check}
                  {zh ? "保留" : "Keep"}
                </button>
                <button type="button" onClick={discard} className={control}>
                  {icons.close}
                  {zh ? "放弃" : "Discard"}
                </button>
                <span className="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true" />
                <button type="button" aria-label={zh ? "重试" : "Try again"} onClick={retry} className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors motion-reduce:transition-none hover:bg-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent">
                  {icons.retry}
                </button>
              </>
            ) : (
              <>
                <form
                  className="flex min-h-9 min-w-[148px] flex-1 items-center sm:flex-none"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (prompt.trim()) run("custom");
                  }}
                >
                  <input
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    aria-label={zh ? "描述修改要求" : "Describe edits"}
                    placeholder={zh ? "描述修改要求" : "Describe edits"}
                    className="h-9 min-w-0 flex-1 bg-transparent pr-2 pl-3 text-[12px] text-ink placeholder:text-ink-3 focus:outline-none"
                  />
                  {prompt.trim() ? (
                    <button
                      type="submit"
                      disabled={!resolvedCustomPrompt}
                      aria-label={zh ? "发送编辑指令" : "Send edit instruction"}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                    >
                      {icons.send}
                    </button>
                  ) : null}
                </form>

                <span className="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true" />
                <button type="button" onClick={() => run("explain")} className={control}>
                  {icons.explain}
                  {zh ? "解释" : "Explain"}
                </button>
                <button ref={improveRef} type="button" onClick={() => run("improve")} className={control}>
                  {icons.improve}
                  {zh ? "优化" : "Improve"}
                </button>

                {expanded ? (
                  <>
                    <button type="button" onClick={() => run("shorten")} className={control}>
                      {icons.shorten}
                      {zh ? "精简" : "Shorten"}
                    </button>
                    <button type="button" onClick={() => run("tone")} className={control}>
                      {icons.tone}
                      {zh ? "语气" : "Tone"}
                    </button>
                    <button type="button" onClick={() => run("grammar")} className={control}>
                      {icons.grammar}
                      {zh ? "语法" : "Grammar"}
                    </button>
                  </>
                ) : null}

                <button
                  type="button"
                  aria-label={expanded ? (zh ? "收起更多操作" : "Show fewer actions") : zh ? "展开更多操作" : "Show more actions"}
                  aria-expanded={expanded}
                  onClick={() => setExpanded((value) => !value)}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 motion-reduce:transition-none hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                >
                  <span className={`flex transition-transform duration-200 motion-reduce:transition-none ${expanded ? "rotate-180" : "rotate-0"}`}>
                    {icons.chevron}
                  </span>
                </button>
                </>
              )}
            </div>
          ) : null}
        </div>

        <div role="status" aria-live="polite" aria-atomic="true" className="mt-2 min-h-4 text-center text-[10.5px] font-medium text-ink-3">
          {statusText}
        </div>
      </div>
    </div>
  );
}
