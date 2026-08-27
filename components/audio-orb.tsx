"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * VOICE AGENT AUDIO ORB & WAVEFORM
 * ───────────────────────────────────────────────────────── */

type VoiceState = "listening" | "thinking" | "speaking" | "idle";

export default function AudioOrb({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("audio-orb", propLang);
  const zh = lang === "zh";

  const [state, setState] = useState<VoiceState>("speaking");
  const [isMuted, setIsMuted] = useState(false);

  const transcriptsEn: Record<VoiceState, string> = {
    listening: "Listening to your request...",
    thinking: "Analyzing AST and resolving circular dependencies...",
    speaking: "I have updated the routing configuration and verified all 6 endpoints.",
    idle: "Tap to start voice conversation",
  };

  const transcriptsZh: Record<VoiceState, string> = {
    listening: "正在聆听您的指令...",
    thinking: "正在分析抽象语法树并解决循环依赖...",
    speaking: "已更新全局路由配置，并成功验证了全部 6 个接口端点。",
    idle: "点击麦克风开始实时语音对话",
  };

  const stateLabels: Record<VoiceState, { en: string; zh: string }> = {
    listening: { en: "Listening", zh: "倾听中" },
    thinking: { en: "Thinking", zh: "思考中" },
    speaking: { en: "Speaking", zh: "回答中" },
    idle: { en: "Idle", zh: "已就绪" },
  };

  const [bars, setBars] = useState<number[]>([12, 24, 18, 32, 28, 40, 36, 48, 42, 34, 26, 38, 20, 16, 28, 14]);

  useEffect(() => {
    if (state === "idle") {
      setBars((prev) => prev.map(() => 4));
      return;
    }
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() => {
          if (state === "speaking") return Math.floor(Math.random() * 38) + 10;
          if (state === "listening") return Math.floor(Math.random() * 20) + 6;
          if (state === "thinking") return Math.floor(Math.random() * 12) + 4;
          return 4;
        })
      );
    }, 120);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="flex w-full max-w-sm flex-col items-center rounded-card border border-line bg-surface p-6 shadow-card">
      {/* Top Status & Latency Bar */}
      <div className="flex w-full items-center justify-between text-[11px] text-ink-3">
        <div className="flex items-center gap-1.5 font-mono">
          <span
            className={`size-2 rounded-full ${
              state === "speaking"
                ? "bg-green animate-pulse"
                : state === "listening"
                ? "bg-accent animate-pulse"
                : state === "thinking"
                ? "bg-orange animate-pulse"
                : "bg-ink-3"
            }`}
          />
          <span className="capitalize font-medium text-ink-2">
            {zh ? stateLabels[state].zh : stateLabels[state].en}
          </span>
        </div>
        <span className="font-mono text-[10.5px]">210ms • Opus 48kHz</span>
      </div>

      {/* Fluid Gradient Orb */}
      <div className="relative my-8 flex size-36 items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
            state === "speaking"
              ? "bg-accent/30 scale-125"
              : state === "listening"
              ? "bg-green/25 scale-110"
              : state === "thinking"
              ? "bg-orange/30 scale-115"
              : "bg-line/40 scale-90"
          }`}
        />

        <div
          className={`absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${
            state === "speaking"
              ? "border-accent/40 animate-[spin_8s_linear_infinite]"
              : state === "thinking"
              ? "border-orange/50 animate-[spin_4s_linear_infinite]"
              : "border-line"
          }`}
        />

        <div
          className={`relative flex size-28 items-center justify-center rounded-full shadow-lg transition-transform duration-500 ${
            state === "speaking"
              ? "scale-105"
              : state === "listening"
              ? "scale-95 animate-pulse"
              : state === "thinking"
              ? "scale-90"
              : "scale-85 opacity-70"
          }`}
          style={{
            background:
              state === "speaking"
                ? "radial-gradient(circle at 30% 30%, #60a5fa, #2563eb, #1e3a8a)"
                : state === "listening"
                ? "radial-gradient(circle at 30% 30%, #34d399, #059669, #064e3b)"
                : state === "thinking"
                ? "radial-gradient(circle at 30% 30%, #fbbf24, #d97706, #78350f)"
                : "radial-gradient(circle at 30% 30%, var(--ink-3), var(--ink-2), var(--ink))",
          }}
        >
          <div className="size-10 rounded-full bg-white/40 blur-[6px] animate-pulse" />
        </div>
      </div>

      {/* Audio Waveform Equalizer */}
      <div className="flex h-10 w-full items-center justify-center gap-1">
        {bars.map((height, i) => (
          <span
            key={i}
            className="w-1 rounded-full transition-all duration-100"
            style={{
              height: `${height}px`,
              backgroundColor:
                state === "speaking"
                  ? "var(--accent)"
                  : state === "listening"
                  ? "var(--green)"
                  : state === "thinking"
                  ? "var(--orange)"
                  : "var(--line-strong)",
            }}
          />
        ))}
      </div>

      {/* Streaming Live Transcript */}
      <p className="mt-4 min-h-[38px] text-center text-[12px] leading-relaxed text-ink-2">
        {zh ? transcriptsZh[state] : transcriptsEn[state]}
      </p>

      {/* State Switcher Pills */}
      <div className="mt-4 flex items-center gap-1 rounded-control bg-field p-1 text-[11px]">
        {(["listening", "thinking", "speaking", "idle"] as VoiceState[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setState(mode)}
            className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
              state === mode
                ? "bg-surface text-ink shadow-sm"
                : "text-ink-3 hover:text-ink-2"
            }`}
          >
            {zh ? stateLabels[mode].zh : stateLabels[mode].en}
          </button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="mt-5 flex w-full items-center justify-center gap-3 border-t border-line pt-4">
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className={`flex size-8 items-center justify-center rounded-full border border-line transition-colors cursor-pointer ${
            isMuted ? "bg-red-tint text-red" : "bg-field text-ink-2 hover:bg-hover hover:text-ink"
          }`}
          title={isMuted ? (zh ? "取消静音" : "Unmute") : zh ? "静音" : "Mute"}
        >
          {isMuted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={() => setState("idle")}
          className="flex h-8 items-center gap-1.5 rounded-full bg-red px-3.5 text-[11.5px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="size-2 rounded-full bg-white" />
          {zh ? "挂断通话" : "End Voice"}
        </button>
      </div>
    </div>
  );
}
