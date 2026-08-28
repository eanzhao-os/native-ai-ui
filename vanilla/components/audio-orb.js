import { NaiBaseElement } from "../core/base-element.js";

const STATE_LABELS = {
  listening: { en: "Listening", zh: "倾听中", color: "var(--accent, #0285ff)" },
  thinking: { en: "Thinking", zh: "思考中", color: "var(--orange, #ef720c)" },
  speaking: { en: "Speaking", zh: "回答中", color: "var(--green, #189a4d)" },
  idle: { en: "Idle", zh: "已就绪", color: "var(--ink-3, #9a9da3)" },
};

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

export class NaiAudioOrb extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._state = "speaking"; // "listening" | "thinking" | "speaking" | "idle"
    this._isMuted = false;
    this._bars = new Array(16).fill(12);
  }

  setState(nextState) {
    this._state = nextState;
    this.render();
  }

  toggleMute() {
    this._isMuted = !this._isMuted;
    this.render();
  }

  onMount() {
    this._initCanvasAnimation();
  }

  _initCanvasAnimation() {
    const canvas = this.shadowRoot?.querySelector("#orb-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const dpr = window.devicePixelRatio || 1;
    const w = 240;
    const h = 180;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    this.registerRaf((time) => {
      angle += 0.025;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = 70;
      const state = this._state;

      // Color scheme based on state
      let mainColor = "rgba(24, 154, 77, "; // green for speaking
      let ringColor = "rgba(2, 133, 255, "; // blue
      let pulseSpeed = 2;

      if (state === "speaking") {
        mainColor = "rgba(2, 133, 255, ";
        ringColor = "rgba(59, 130, 246, ";
        pulseSpeed = 3;
      } else if (state === "listening") {
        mainColor = "rgba(24, 154, 77, ";
        ringColor = "rgba(52, 211, 153, ";
        pulseSpeed = 2;
      } else if (state === "thinking") {
        mainColor = "rgba(239, 114, 12, ";
        ringColor = "rgba(251, 191, 36, ";
        pulseSpeed = 4;
      } else {
        mainColor = "rgba(154, 157, 163, ";
        ringColor = "rgba(224, 226, 229, ";
        pulseSpeed = 0.5;
      }

      const pulse = state === "idle" ? 0 : Math.sin(time * 0.003 * pulseSpeed) * 4;
      const baseRadius = 38 + pulse;

      // 1. Outer Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 1.8);
      glowGrad.addColorStop(0, mainColor + "0.35)");
      glowGrad.addColorStop(0.6, mainColor + "0.12)");
      glowGrad.addColorStop(1, mainColor + "0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Rotating orbital dashed ring
      if (state !== "idle") {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle * (state === "thinking" ? 1.5 : 0.8));
        ctx.strokeStyle = ringColor + "0.45)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius + 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 3. Fluid Sphere
      const orbGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.3,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius
      );
      orbGrad.addColorStop(0, "#ffffff");
      orbGrad.addColorStop(0.2, mainColor + "0.95)");
      orbGrad.addColorStop(0.7, mainColor + "0.75)");
      orbGrad.addColorStop(1, mainColor + "0.4)");

      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Highlight reflection
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.beginPath();
      ctx.arc(cx - baseRadius * 0.35, cy - baseRadius * 0.35, baseRadius * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // 5. Equalizer bars underneath
      const barCount = 16;
      const barWidth = 3;
      const barSpacing = 4;
      const totalWidth = barCount * (barWidth + barSpacing) - barSpacing;
      const startX = (w - totalWidth) / 2;
      const barBaseY = 155;

      for (let i = 0; i < barCount; i++) {
        let barHeight = 4;
        if (state === "speaking") {
          barHeight = Math.sin(time * 0.008 + i * 0.5) * 12 + Math.cos(time * 0.004 + i) * 6 + 18;
        } else if (state === "listening") {
          barHeight = Math.sin(time * 0.006 + i * 0.4) * 8 + 10;
        } else if (state === "thinking") {
          barHeight = Math.sin(time * 0.01 + i * 0.8) * 5 + 7;
        } else {
          barHeight = 3;
        }
        barHeight = Math.max(3, barHeight);

        const bx = startX + i * (barWidth + barSpacing);
        ctx.fillStyle = mainColor + "0.85)";
        ctx.beginPath();
        ctx.roundRect(bx, barBaseY - barHeight / 2, barWidth, barHeight, 2);
        ctx.fill();
      }
    });
  }

  render() {
    const zh = this.isZh;
    const state = this._state;
    const statusMeta = STATE_LABELS[state];
    const transcripts = zh ? TRANSCRIPTS_ZH : TRANSCRIPTS_EN;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 360px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .status-header {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${statusMeta.color};
          animation: ${state === "idle" ? "none" : "pulse-anim 1.5s infinite"};
        }

        .status-label {
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .latency-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
        }

        .canvas-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 180px;
          margin: 6px 0;
        }

        canvas {
          display: block;
          width: 240px;
          height: 180px;
        }

        .transcript-box {
          min-height: 40px;
          margin-top: 6px;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          color: var(--ink-2, #62656b);
        }

        .state-pills {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 4px;
          margin-top: 12px;
        }

        .pill-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .pill-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .pill-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .actions-footer {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 16px;
          margin-top: 16px;
        }

        .btn-mute {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--line, #ecedef);
          background: ${this._isMuted ? "var(--red-tint, #fcecec)" : "var(--field, #f2f2f3)"};
          color: ${this._isMuted ? "var(--red, #e3474c)" : "var(--ink-2, #62656b)"};
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-mute:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-end {
          display: flex;
          height: 32px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          border: none;
          background: var(--red, #e3474c);
          color: #fff;
          padding: 0 14px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(227, 71, 76, 0.2);
          transition: opacity 0.15s;
        }

        .btn-end:hover {
          opacity: 0.9;
        }

        .end-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
        }

        @keyframes pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
      </style>

      <div class="status-header">
        <div class="status-badge">
          <span class="pulse-dot"></span>
          <span class="status-label">${zh ? statusMeta.zh : statusMeta.en}</span>
        </div>
        <span class="latency-text">210ms • Opus 48kHz</span>
      </div>

      <div class="canvas-wrapper">
        <canvas id="orb-canvas"></canvas>
      </div>

      <p class="transcript-box">
        ${transcripts[state]}
      </p>

      <div class="state-pills">
        ${(["listening", "thinking", "speaking", "idle"])
          .map(
            (mode) => `
          <button type="button" class="pill-btn ${state === mode ? "active" : ""}" data-mode="${mode}">
            ${zh ? STATE_LABELS[mode].zh : STATE_LABELS[mode].en}
          </button>
        `
          )
          .join("")}
      </div>

      <div class="actions-footer">
        <button type="button" class="btn-mute" id="btn-mute" title="${this._isMuted ? (zh ? "取消静音" : "Unmute") : zh ? "静音" : "Mute"}">
          ${
            this._isMuted
              ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/></svg>`
              : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>`
          }
        </button>

        <button type="button" class="btn-end" id="btn-end">
          <span class="end-dot"></span>
          <span>${zh ? "挂断通话" : "End Voice"}</span>
        </button>
      </div>
    `;

    this.shadowRoot.querySelectorAll(".pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-mode");
        if (mode) this.setState(mode);
      });
    });

    this.shadowRoot.querySelector("#btn-mute")?.addEventListener("click", () => this.toggleMute());
    this.shadowRoot.querySelector("#btn-end")?.addEventListener("click", () => this.setState("idle"));

    this._initCanvasAnimation();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-audio-orb")) {
  customElements.define("nai-audio-orb", NaiAudioOrb);
}
