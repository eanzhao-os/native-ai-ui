"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";

type AttachmentState =
  | "uploading"
  | "parsing"
  | "indexing"
  | "ready"
  | "failed";

type Attachment = {
  id: string;
  name: string;
  kind: "pdf" | "image" | "audio";
  size: string;
  state: AttachmentState;
  progress: number;
};

const INITIAL_ATTACHMENTS: Attachment[] = [
  {
    id: "report",
    name: "quarterly-report.pdf",
    kind: "pdf",
    size: "2.4 MB",
    state: "ready",
    progress: 100,
  },
  {
    id: "wireframe",
    name: "wireframe.png",
    kind: "image",
    size: "1.8 MB",
    state: "parsing",
    progress: 42,
  },
  {
    id: "interview",
    name: "interview.wav",
    kind: "audio",
    size: "18.7 MB",
    state: "indexing",
    progress: 64,
  },
  {
    id: "notes",
    name: "research-notes.pdf",
    kind: "pdf",
    size: "840 KB",
    state: "failed",
    progress: 38,
  },
];

const STATE_COPY: Record<
  AttachmentState,
  { en: string; zh: string; tone: string; tint: string }
> = {
  uploading: {
    en: "Uploading",
    zh: "上传中",
    tone: "text-accent-ink",
    tint: "bg-accent",
  },
  parsing: {
    en: "Parsing",
    zh: "解析中",
    tone: "text-orange",
    tint: "bg-orange",
  },
  indexing: {
    en: "Indexing",
    zh: "索引中",
    tone: "text-accent-ink",
    tint: "bg-accent",
  },
  ready: {
    en: "Ready",
    zh: "已就绪",
    tone: "text-green",
    tint: "bg-green",
  },
  failed: {
    en: "Parse failed",
    zh: "解析失败",
    tone: "text-red",
    tint: "bg-red",
  },
};

function FileMark({ kind }: { kind: Attachment["kind"] }) {
  const label = kind === "pdf" ? "PDF" : kind === "image" ? "IMG" : "WAV";
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-9 shrink-0 items-center justify-center rounded-control border border-line bg-inset font-mono text-[9px] font-semibold text-ink-2"
    >
      {label}
    </span>
  );
}

export default function AttachmentQueue({
  lang: propLang,
}: {
  lang?: "en" | "zh";
}) {
  const lang = useLang("attachment-queue", propLang);
  const zh = lang === "zh";
  const [attachments, setAttachments] = useState(INITIAL_ATTACHMENTS);
  const [announcement, setAnnouncement] = useState("");

  const retry = (attachment: Attachment) => {
    setAttachments((items) =>
      items.map((item) =>
        item.id === attachment.id
          ? { ...item, state: "uploading", progress: 0 }
          : item,
      ),
    );
    setAnnouncement(
      zh
        ? `正在重试 ${attachment.name}`
        : `Retrying ${attachment.name}`,
    );
  };

  const remove = (attachment: Attachment) => {
    setAttachments((items) =>
      items.filter((item) => item.id !== attachment.id),
    );
    setAnnouncement(
      zh ? `已移除 ${attachment.name}` : `Removed ${attachment.name}`,
    );
  };

  return (
    <section
      aria-labelledby="attachment-queue-title"
      className="w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-card"
    >
      <div className="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
        <div>
          <h3
            id="attachment-queue-title"
            className="text-[13px] font-semibold text-ink"
          >
            {zh ? "附件队列" : "Attachment queue"}
          </h3>
          <p className="mt-0.5 text-[11px] text-ink-3">
            {zh ? "上传、解析并建立检索索引" : "Upload, parse, and index for retrieval"}
          </p>
        </div>
        <span className="rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2">
          {attachments.length} {zh ? "个文件" : "files"}
        </span>
      </div>

      <div className="divide-y divide-line">
        {attachments.map((attachment) => {
          const copy = STATE_COPY[attachment.state];
          const active =
            attachment.state === "uploading" ||
            attachment.state === "parsing" ||
            attachment.state === "indexing";

          return (
            <div
              key={attachment.id}
              className={`flex gap-3 px-4 py-3 ${
                attachment.state === "failed" ? "bg-red-tint/35" : "bg-surface"
              }`}
            >
              <FileMark kind={attachment.kind} />
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink">
                      {attachment.name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-3">
                      {attachment.size}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10.5px] font-medium ${copy.tone}`}>
                    {zh ? copy.zh : copy.en}
                  </span>
                </div>

                {active ? (
                  <div className="mt-2 flex items-center gap-2.5">
                    <div
                      role="progressbar"
                      aria-label={
                        zh
                          ? `${attachment.name} 上传进度`
                          : `${attachment.name} upload progress`
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={attachment.progress}
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-field"
                    >
                      <span
                        className={`block h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none ${copy.tint}`}
                        style={{ width: `${attachment.progress}%` }}
                      />
                    </div>
                    <span className="w-7 text-right font-mono text-[10px] tabular-nums text-ink-3">
                      {attachment.progress}%
                    </span>
                  </div>
                ) : null}

                {attachment.state === "ready" ? (
                  <p className="mt-1.5 text-[10.5px] text-ink-3">
                    {zh ? "12 个片段可用于上下文" : "12 chunks ready for context"}
                  </p>
                ) : null}

                {attachment.state === "failed" ? (
                  <div className="mt-2 flex items-center gap-2" role="alert">
                    <button
                      type="button"
                      onClick={() => retry(attachment)}
                      aria-label={`${zh ? "重试" : "Retry"} ${attachment.name}`}
                      className="rounded-control border border-line-strong bg-surface px-2 py-1 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover"
                    >
                      {zh ? "重试" : "Retry"}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(attachment)}
                      aria-label={`${zh ? "移除" : "Remove"} ${attachment.name}`}
                      className="rounded-control px-2 py-1 text-[10.5px] text-ink-3 transition-colors hover:bg-hover hover:text-red"
                    >
                      {zh ? "移除" : "Remove"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
