"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

type Checkpoint = {
  id: "before" | "edited" | "verified";
  titleEn: string;
  titleZh: string;
  time: string;
  files: string[];
  summaryEn: string;
  summaryZh: string;
};

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "before",
    titleEn: "Before edits",
    titleZh: "编辑前",
    time: "10:31",
    files: ["app/page.tsx", "components/chat.tsx"],
    summaryEn: "Clean baseline before the agent changed the chat flow.",
    summaryZh: "智能体修改聊天流程前的干净基线。",
  },
  {
    id: "edited",
    titleEn: "Implementation",
    titleZh: "实现完成",
    time: "10:38",
    files: ["app/page.tsx", "components/chat.tsx", "tests/chat.test.tsx"],
    summaryEn: "Streaming behavior updated and regression coverage added.",
    summaryZh: "已更新流式交互，并新增回归测试。",
  },
  {
    id: "verified",
    titleEn: "Verified",
    titleZh: "验证通过",
    time: "10:42",
    files: ["tests/chat.test.tsx"],
    summaryEn: "Checks passed; this is the current execution state.",
    summaryZh: "检查已通过；这是当前执行状态。",
  },
];

export default function CheckpointTimeline({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("checkpoint-timeline", propLang);
  const zh = lang === "zh";
  const [selected, setSelected] = useState(1);
  const [current, setCurrent] = useState(2);
  const [confirming, setConfirming] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const checkpoint = CHECKPOINTS[selected];
  const title = zh ? checkpoint.titleZh : checkpoint.titleEn;
  const isCurrent = selected === current;

  const selectCheckpoint = (index: number) => {
    setSelected(index);
    setConfirming(false);
  };

  const confirmRestore = () => {
    setCurrent(selected);
    setConfirming(false);
    setAnnouncement(
      zh ? `已恢复“${title}”` : `Restored “${title}”`,
    );
  };

  return (
    <section
      aria-labelledby="checkpoint-timeline-title"
      className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card"
    >
      <header className="border-b border-line bg-inset px-4 py-3">
        <h3
          id="checkpoint-timeline-title"
          className="text-[13px] font-semibold text-ink"
        >
          {zh ? "执行检查点" : "Execution checkpoints"}
        </h3>
        <p className="mt-0.5 text-[11px] text-ink-3">
          {zh ? "检查并恢复智能体的执行状态" : "Inspect and restore agent execution state"}
        </p>
      </header>

      <div className="grid md:grid-cols-[12rem_1fr]">
        <ol className="border-b border-line bg-inset/45 p-3 md:border-r md:border-b-0">
          {CHECKPOINTS.map((item, index) => {
            const itemTitle = zh ? item.titleZh : item.titleEn;
            const itemCurrent = index === current;
            const itemSelected = index === selected;

            return (
              <li key={item.id} className="relative pb-2 last:pb-0">
                {index < CHECKPOINTS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-7 bottom-0 left-[0.68rem] w-px bg-line-strong"
                  />
                ) : null}
                <button
                  type="button"
                  aria-label={`${zh ? "选择检查点" : "Select checkpoint"} ${itemTitle}`}
                  aria-pressed={itemSelected}
                  aria-current={itemCurrent ? "step" : undefined}
                  onClick={() => selectCheckpoint(index)}
                  className={`relative flex w-full items-start gap-2.5 rounded-control px-2 py-2 text-left transition-colors motion-reduce:transition-none ${
                    itemSelected
                      ? itemCurrent
                        ? "bg-green-tint"
                        : "bg-accent-tint"
                      : "hover:bg-hover"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                      itemCurrent
                        ? "border-green bg-green"
                        : itemSelected
                          ? "border-accent bg-accent"
                          : "border-line-strong bg-surface"
                    }`}
                  />
                  <span className="min-w-0">
                    <span className="block text-[11.5px] font-medium text-ink">
                      {itemTitle}
                    </span>
                    <span className="mt-0.5 block font-mono text-[9.5px] text-ink-3">
                      {item.time}
                      {itemCurrent ? ` · ${zh ? "当前" : "current"}` : ""}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12.5px] font-semibold text-ink">{title}</p>
              <p className="mt-1 text-[11px] leading-5 text-ink-3">
                {zh ? checkpoint.summaryZh : checkpoint.summaryEn}
              </p>
            </div>
            <span className="shrink-0 font-mono text-[10px] text-ink-3">
              {checkpoint.time}
            </span>
          </div>

          <div className="mt-3 rounded-control border border-line bg-inset px-3 py-2.5">
            <p className="text-[9.5px] font-semibold tracking-wide text-ink-3 uppercase">
              {zh ? "文件快照" : "File snapshot"}
            </p>
            <ul className="mt-2 space-y-1">
              {checkpoint.files.map((file) => (
                <li
                  key={file}
                  className="flex items-center gap-2 font-mono text-[10px] text-ink-2"
                >
                  <span className="text-accent-ink" aria-hidden="true">M</span>
                  {file}
                </li>
              ))}
            </ul>
          </div>

          {confirming ? (
            <div
              role="alert"
              className="mt-3 rounded-control border border-orange/35 bg-orange-tint px-3 py-2.5"
            >
              <p className="text-[11.5px] font-medium text-ink">
                {zh ? `恢复“${title}”？` : `Restore “${title}”?`}
              </p>
              <p className="mt-1 text-[10px] leading-4 text-ink-3">
                {zh
                  ? "后续文件改动将被替换。"
                  : "Later file changes will be replaced."}
              </p>
              <div className="mt-2.5 flex justify-end gap-2">
                <button
                  type="button"
                  aria-label={zh ? "取消恢复" : "Cancel restore"}
                  onClick={() => setConfirming(false)}
                  className="rounded-control px-2.5 py-1.5 text-[10.5px] text-ink-2 transition-colors hover:bg-hover motion-reduce:transition-none"
                >
                  {zh ? "取消" : "Cancel"}
                </button>
                <button
                  type="button"
                  aria-label={zh ? "确认恢复" : "Confirm restore"}
                  onClick={confirmRestore}
                  className="rounded-control bg-orange px-2.5 py-1.5 text-[10.5px] font-medium text-surface transition-opacity hover:opacity-85 motion-reduce:transition-none"
                >
                  {zh ? "确认恢复" : "Confirm restore"}
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              aria-label={
                isCurrent
                  ? zh
                    ? "当前检查点"
                    : "Current checkpoint"
                  : zh
                    ? "恢复检查点"
                    : "Restore checkpoint"
              }
              disabled={isCurrent}
              onClick={() => setConfirming(true)}
              className="mt-3 w-full rounded-control border border-line-strong bg-surface px-3 py-2 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:bg-inset disabled:text-ink-3 disabled:shadow-none motion-reduce:transition-none"
            >
              {isCurrent
                ? zh
                  ? "当前检查点"
                  : "Current checkpoint"
                : zh
                  ? "恢复到此检查点"
                  : "Restore this checkpoint"}
            </button>
          )}

          <p
            role="status"
            aria-live="polite"
            className="mt-2 min-h-4 text-[10.5px] font-medium text-green"
          >
            {announcement}
          </p>
        </div>
      </div>
    </section>
  );
}
