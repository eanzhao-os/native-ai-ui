import { NaiBaseElement } from "../core/base-element.js";

const TRANSCRIPTS_EN = {
  listening: "Listening to your request...",
  thinking: "Analyzing AST and resolving circular dependencies...",
  speaking: "I have updated the routing configuration and verified all 6 endpoints.",
  idle: "Tap to start voice conversation",
};

const TRANSCRIPTS_ZH = {
  listening: "正在聆听您的指令...",
  thinking: "正在分析抽象语法树并解决循环依赖...",
  speaking: "已更新全局路由配置，并成功验证了全部 6 个接口端点。",
  idle: "点击麦克风开始实时语音对话",
};

const STATE_LABELS = {
  listening: { en: "Listening", zh: "倾听中" },
  thinking: { en: "Thinking", zh: "思考中" },
  speaking: { en: "Speaking", zh: "回答中" },
  idle: { en: "Idle", zh: "已就绪" },
};

export class NaiAudioOrb extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._state = "speaking"; // "listening" | "thinking" | "speaking" | "idle"
    this._isMuted = false;
    this._bars = [12, 24, 18, 32, 28, 40, 36, 48, 42, 34, 26, 38, 20, 16, 28, 14];
  }

  onMount() {
    this.registerInterval(() => {
      if (this._state === "idle") {
        this._bars = this._bars.map(() => 4);
      } else {
        this._bars = this._bars.map(() => {
          if (this._state === "speaking") return Math.floor(Math.random() * 38) + 10;
          if (this._state === "listening") return Math.floor(Math.random() * 20) + 6;
          if (this._state === "thinking") return Math.floor(Math.random() * 12) + 4;
          return 4;
        });
      }
      this._updateBarsOnly();
    }, 120);
  }

  _updateBarsOnly() {
    const barsContainer = this.shadowRoot?.querySelector("#equalizer-bars");
    if (!barsContainer) return;
    const color =
      this._state === "speaking"
        ? "var(--accent)"
        : this._state === "listening"
        ? "var(--green)"
        : this._state === "thinking"
        ? "var(--orange)"
        : "var(--line-strong)";

    const spans = barsContainer.querySelectorAll("span");
    spans.forEach((span, i) => {
      span.style.height = `${this._bars[i]}px`;
      span.style.backgroundColor = color;
    });
  }

  setState(nextState) {
    this._state = nextState;
    if (nextState === "idle") {
      this._bars = this._bars.map(() => 4);
    }
    this.render();
  }

  toggleMute() {
    this._isMuted = !this._isMuted;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const state = this._state;
    const isMuted = this._isMuted;
    const bars = this._bars;

    const orbBg =
      state === "speaking"
        ? "radial-gradient(circle at 30% 30%, #60a5fa, #2563eb, #1e3a8a)"
        : state === "listening"
        ? "radial-gradient(circle at 30% 30%, #34d399, #059669, #064e3b)"
        : state === "thinking"
        ? "radial-gradient(circle at 30% 30%, #fbbf24, #d97706, #78350f)"
        : "radial-gradient(circle at 30% 30%, var(--ink-3), var(--ink-2), var(--ink))";

    const barColor =
      state === "speaking"
        ? "var(--accent)"
        : state === "listening"
        ? "var(--green)"
        : state === "thinking"
        ? "var(--orange)"
        : "var(--line-strong)";

    this.setHtml(`
      <div class="flex w-full max-w-sm flex-col items-center rounded-card border border-line bg-surface p-6 shadow-card">
        
        <div class="flex w-full items-center justify-between text-[11px] text-ink-3">
          <div class="flex items-center gap-1.5 font-mono">
            <span
              class="size-2 rounded-full ${
                state === "speaking"
                  ? "bg-green animate-pulse"
                  : state === "listening"
                  ? "bg-accent animate-pulse"
                  : state === "thinking"
                  ? "bg-orange animate-pulse"
                  : "bg-ink-3"
              }"
            ></span>
            <span class="capitalize font-medium text-ink-2">
              ${zh ? STATE_LABELS[state].zh : STATE_LABELS[state].en}
            </span>
          </div>
          <span class="font-mono text-[10.5px]">210ms • Opus 48kHz</span>
        </div>

        
        <div class="relative my-8 flex size-36 items-center justify-center">
          <div
            class="absolute inset-0 rounded-full blur-xl transition-all duration-700 ${
              state === "speaking"
                ? "bg-accent/30 scale-125"
                : state === "listening"
                ? "bg-green/25 scale-110"
                : state === "thinking"
                ? "bg-orange/30 scale-115"
                : "bg-line/40 scale-90"
            }"
          ></div>

          <div
            class="absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${
              state === "speaking"
                ? "border-accent/40 animate-spin"
                : state === "thinking"
                ? "border-orange/50 animate-spin"
                : "border-line"
            }"
            style="${
              state === "speaking"
                ? "animation-duration: 8s;"
                : state === "thinking"
                ? "animation-duration: 4s;"
                : ""
            }"
          ></div>

          <div
            class="relative flex size-28 items-center justify-center rounded-full shadow-lg transition-transform duration-500 ${
              state === "speaking"
                ? "scale-105"
                : state === "listening"
                ? "scale-95 animate-pulse"
                : state === "thinking"
                ? "scale-90"
                : "scale-85 opacity-70"
            }"
            style="background: ${orbBg};"
          >
            <div class="size-10 rounded-full bg-white/40 blur-[6px] animate-pulse"></div>
          </div>
        </div>

        
        <div id="equalizer-bars" class="flex h-10 w-full items-center justify-center gap-1">
          ${bars
            .map(
              (height) => `
            <span
              class="w-1 rounded-full transition-all duration-100"
              style="height: ${height}px; background-color: ${barColor};"
            ></span>
          `
            )
            .join("")}
        </div>

        
        <p class="mt-4 min-h-[38px] text-center text-[12px] leading-relaxed text-ink-2">
          ${zh ? TRANSCRIPTS_ZH[state] : TRANSCRIPTS_EN[state]}
        </p>

        
        <div class="mt-4 flex items-center gap-1 rounded-control bg-field p-1 text-[11px]">
          ${(["listening", "thinking", "speaking", "idle"])
            .map(
              (mode) => `
            <button
              key="${mode}"
              type="button"
              data-mode="${mode}"
              class="pill-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                state === mode ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
              }"
            >
              ${zh ? STATE_LABELS[mode].zh : STATE_LABELS[mode].en}
            </button>
          `
            )
            .join("")}
        </div>

        
        <div class="mt-5 flex w-full items-center justify-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            id="btn-mute"
            class="flex size-8 items-center justify-center rounded-full border border-line transition-colors cursor-pointer ${
              isMuted ? "bg-red-tint text-red" : "bg-field text-ink-2 hover:bg-hover hover:text-ink"
            }"
            title="${isMuted ? (zh ? "取消静音" : "Unmute") : zh ? "静音" : "Mute"}"
          >
            ${
              isMuted
                ? `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              </svg>
            `
                : `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
            `
            }
          </button>

          <button
            type="button"
            id="btn-end"
            class="flex h-8 items-center gap-1.5 rounded-full bg-red px-3.5 text-[11.5px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span class="size-2 rounded-full bg-white"></span>
            <span>${zh ? "挂断通话" : "End Voice"}</span>
          </button>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        if (mode) this.setState(mode);
      });
    });

    this.shadowRoot?.querySelector("#btn-mute")?.addEventListener("click", () => this.toggleMute());
    this.shadowRoot?.querySelector("#btn-end")?.addEventListener("click", () => this.setState("idle"));
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-audio-orb")) {
  customElements.define("nai-audio-orb", NaiAudioOrb);
}
