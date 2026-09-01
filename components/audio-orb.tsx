"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * VOICE AGENT AUDIO ORB & WAVEFORM
 * ───────────────────────────────────────────────────────── */

type VoiceState = "listening" | "thinking" | "speaking" | "idle";

const WAVEFORM_FRAMES: Record<VoiceState, number[][]> = {
  speaking: [
    [12, 22, 18, 30, 26, 38, 34, 46, 40, 32, 24, 36, 20, 16, 26, 14],
    [10, 18, 26, 34, 42, 36, 28, 24, 30, 40, 44, 32, 24, 18, 22, 12],
    [16, 28, 36, 30, 22, 18, 26, 40, 46, 38, 30, 24, 34, 28, 18, 12],
    [12, 20, 28, 40, 34, 26, 20, 32, 44, 48, 36, 26, 18, 30, 22, 14],
  ],
  listening: [
    [8, 14, 18, 24, 20, 28, 22, 32, 26, 20, 16, 24, 18, 12, 16, 8],
    [6, 12, 20, 26, 22, 18, 24, 30, 28, 22, 16, 20, 24, 18, 12, 8],
    [8, 16, 24, 20, 14, 22, 28, 32, 24, 18, 26, 20, 14, 18, 12, 6],
  ],
  thinking: [
    [6, 8, 12, 14, 10, 16, 12, 18, 14, 10, 12, 16, 10, 8, 12, 6],
    [6, 10, 14, 12, 8, 12, 18, 14, 10, 16, 12, 8, 14, 10, 8, 6],
  ],
  idle: [[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]],
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

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

export default function AudioOrb({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("audio-orb", propLang);
  const zh = lang === "zh";
  const reducedMotion = usePrefersReducedMotion();

  const [state, setState] = useState<VoiceState>("speaking");
  const [isMuted, setIsMuted] = useState(false);
  const [waveformFrame, setWaveformFrame] = useState(0);

  const transcripts: Record<VoiceState, string> = {
    listening: zh ? "正在聆听您的指令..." : "Listening to your request...",
    thinking: zh ? "正在分析抽象语法树并解决循环依赖..." : "Analyzing AST and resolving circular dependencies...",
    speaking: zh
      ? "已更新全局路由配置，并成功验证了全部 6 个接口端点。"
      : "I have updated the routing configuration and verified all 6 endpoints.",
    idle: zh ? "点击麦克风开始实时语音对话" : "Tap the microphone to start a voice conversation",
  };

  const stateLabels: Record<VoiceState, string> = {
    listening: zh ? "倾听中" : "Listening",
    thinking: zh ? "思考中" : "Thinking",
    speaking: zh ? "回答中" : "Speaking",
    idle: zh ? "已就绪" : "Idle",
  };

  useEffect(() => {
    setWaveformFrame(0);
    if (state === "idle" || reducedMotion) return;
    const interval = window.setInterval(
      () => setWaveformFrame((frame) => frame + 1),
      120,
    );
    return () => window.clearInterval(interval);
  }, [reducedMotion, state]);

  const waveformFrames = WAVEFORM_FRAMES[state];
  const bars = waveformFrames[reducedMotion ? 0 : waveformFrame % waveformFrames.length];
  const isIdle = state === "idle";

  const stateTone =
    state === "speaking"
      ? "var(--accent)"
      : state === "listening"
        ? "var(--green)"
        : state === "thinking"
          ? "var(--orange)"
          : "var(--line-strong)";

  const selectState = (mode: VoiceState) => {
    setState(mode);
    setWaveformFrame(0);
    if (mode === "idle") setIsMuted(false);
  };

  const handleAudioControl = () => {
    if (isIdle) {
      setIsMuted(false);
      selectState("listening");
      return;
    }
    setIsMuted((muted) => !muted);
  };

  const audioControlLabel = isIdle
    ? zh
      ? "开始语音对话"
      : "Start voice conversation"
    : isMuted
      ? zh
        ? "取消麦克风静音"
        : "Unmute microphone"
      : zh
        ? "将麦克风静音"
        : "Mute microphone";

  const focusClasses =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

  return (
    <div className="flex w-full max-w-sm flex-col items-center rounded-card border border-line bg-surface p-5 shadow-card sm:p-6">
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-6 w-full items-center justify-between gap-4 text-[11px] text-ink-3"
      >
        <div className="flex min-w-0 items-center gap-2 font-mono">
          <span
            aria-hidden="true"
            className={`size-2 shrink-0 rounded-full ${!reducedMotion && !isIdle ? "animate-pulse" : ""}`}
            style={{ backgroundColor: stateTone }}
          />
          <span className="truncate font-medium text-ink-2">
            {stateLabels[state]}
          </span>
          {isMuted && !isIdle && (
            <span className="rounded-full bg-red-tint px-1.5 py-0.5 text-[9px] font-semibold text-red">
              {zh ? "已静音" : "Muted"}
            </span>
          )}
        </div>
        <span className="shrink-0 font-mono text-[10.5px] tabular-nums">
          210ms · Opus 48kHz
        </span>
      </div>

      <div className="relative my-6 flex size-32 items-center justify-center">
        <div
          aria-hidden="true"
          className={`absolute inset-2 rounded-full blur-2xl transition-[background-color,opacity,transform] duration-500 ${
            state === "speaking"
              ? "scale-110 bg-accent/24 opacity-90"
              : state === "listening"
                ? "scale-105 bg-green/22 opacity-85"
                : state === "thinking"
                  ? "scale-100 bg-orange/22 opacity-80"
                  : "scale-90 bg-line/30 opacity-50"
          }`}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-1 rounded-full border transition-[border-color,transform] duration-500 ${
            state === "speaking"
              ? `border-accent/45 ${reducedMotion ? "" : "animate-[spin_10s_linear_infinite]"}`
              : state === "listening"
                ? "border-green/45"
                : state === "thinking"
                  ? `border-orange/45 ${reducedMotion ? "" : "animate-[spin_7s_linear_infinite]"}`
                  : "border-line"
          }`}
        />
        <div
          aria-hidden="true"
          className={`relative flex size-24 items-center justify-center rounded-full shadow-lg transition-[opacity,transform] duration-500 ${
            state === "speaking"
              ? "scale-105"
              : state === "listening"
                ? "scale-100"
                : state === "thinking"
                  ? "scale-95"
                  : "scale-90 opacity-65"
          }`}
          style={{
            background:
              state === "speaking"
                ? "radial-gradient(circle at 32% 28%, #6ba8ff, #2b6fe8 54%, #1f4fb5)"
                : state === "listening"
                  ? "radial-gradient(circle at 32% 28%, #54d9a0, #149866 54%, #086247)"
                  : state === "thinking"
                    ? "radial-gradient(circle at 32% 28%, #ffd06a, #dc8b18 54%, #9b5608)"
                    : "radial-gradient(circle at 32% 28%, var(--ink-3), var(--ink-2), var(--ink))",
          }}
        >
          <span className="size-7 rounded-full bg-white/35 blur-[5px]" />
        </div>
      </div>

      <div
        role="img"
        aria-label={zh ? "实时音频波形" : "Live audio waveform"}
        className={`flex h-12 w-full items-center justify-center gap-1 transition-opacity duration-200 ${
          isMuted ? "opacity-35" : "opacity-100"
        }`}
      >
        {bars.map((height, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="w-1 rounded-full transition-[height,background-color] duration-100"
            style={{ height: `${height}px`, backgroundColor: stateTone }}
          />
        ))}
      </div>

      <p className="mt-2 min-h-10 max-w-[19rem] text-center text-[12.5px] leading-relaxed text-ink-2">
        {transcripts[state]}
      </p>

      <div
        role="group"
        aria-label={zh ? "语音状态" : "Voice state"}
        className="mt-4 grid w-full grid-cols-4 gap-1 rounded-control bg-field p-1 text-[11px]"
      >
        {(["listening", "thinking", "speaking", "idle"] as VoiceState[]).map(
          (mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={state === mode}
              onClick={() => selectState(mode)}
              className={`min-h-11 rounded-chip px-1.5 font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.98] ${focusClasses} ${
                state === mode
                  ? "bg-surface text-ink shadow-btn"
                  : "text-ink-3 hover:bg-hover hover:text-ink-2"
              }`}
            >
              {stateLabels[mode]}
            </button>
          ),
        )}
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-3 border-t border-line pt-4">
        <button
          type="button"
          aria-label={audioControlLabel}
          aria-pressed={isIdle ? undefined : isMuted}
          onClick={handleAudioControl}
          className={`flex size-11 items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] active:scale-[0.96] ${focusClasses} ${
            isIdle
              ? "border-accent/35 bg-accent-tint text-accent-ink hover:border-accent/60"
              : isMuted
                ? "border-red/30 bg-red-tint text-red"
                : "border-line bg-field text-ink-2 hover:bg-hover hover:text-ink"
          }`}
        >
          {isMuted && !isIdle ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
              <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          )}
        </button>

        <button
          type="button"
          disabled={isIdle}
          onClick={() => selectState("idle")}
          className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-[11.5px] font-semibold transition-[background-color,color,opacity,transform] ${focusClasses} ${
            isIdle
              ? "cursor-not-allowed bg-field text-ink-3"
              : "bg-red text-white shadow-sm hover:opacity-90 active:scale-[0.98]"
          }`}
        >
          <span aria-hidden="true" className={`size-2 rounded-full ${isIdle ? "bg-ink-3" : "bg-white"}`} />
          {isIdle ? (zh ? "通话已结束" : "Voice ended") : zh ? "挂断通话" : "End Voice"}
        </button>
      </div>
    </div>
  );
}
