import { NaiBaseElement } from "../core/base-element.js";

const GLYPHS = {
  clip: '<path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path>',
  layers: '<g><path d="M12 2 2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></g>',
  globe: '<g><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></g>',
};

const BRANDS = {
  figma: '<svg width="11" height="16" viewBox="0 0 38 57" aria-hidden="true"><path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19z" fill="#0ACF83"></path><path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"></path><path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"></path><path d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" fill="#FF7262"></path><path d="M38 28.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z" fill="#1ABCFE"></path></svg>',
  slack: '<svg width="15" height="15" viewBox="0 0 127 127" aria-hidden="true"><path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"></path><path d="M47 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.7 39.7.8 47 .8c7.3 0 13.2 5.9 13.2 13.2v13.2H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"></path><path d="M99.9 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V47.1zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C66.9 6.6 72.8.7 80.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"></path><path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"></path></svg>',
  gmail: '<svg width="15" height="12" viewBox="0 0 256 193" aria-hidden="true"><path d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z" fill="#4285F4"></path><path d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z" fill="#34A853"></path><path d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.669 34.992-4.669 40.644L128 145.504 58.182 93.14Z" fill="#EA4335"></path><path d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z" fill="#FBBC04"></path><path d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z" fill="#C5221F"></path></svg>',
};

const SOURCES = [
  { key: "attach", nameEn: "Add photos & files", nameZh: "添加图片和文件", descEn: "Upload from your computer", descZh: "从本地上传", glyph: "clip", attach: true },
  { key: "scoop", nameEn: "Scoop Data", nameZh: "Scoop 数据", descEn: "Sales & churn metrics", descZh: "销售与产量指标", glyph: "chart" },
  { key: "flavors", nameEn: "Flavor records", nameZh: "风味档案", descEn: "26 makers, tags, links", descZh: "26 家厂商、标签与链接", glyph: "layers" },
  { key: "web", nameEn: "Web search", nameZh: "联网搜索", descEn: "Real-time news and info", descZh: "实时新闻与资讯", glyph: "globe" },
  { key: "figma", nameEn: "Figma", nameZh: "Figma", descEn: "Design-to-code workflows", descZh: "设计稿转代码工作流", brand: "figma" },
  { key: "slack", nameEn: "Slack", nameZh: "Slack", descEn: "Read and manage Slack", descZh: "读取并管理 Slack 消息", brand: "slack" },
  { key: "gmail", nameEn: "Gmail", nameZh: "Gmail", descEn: "Read and manage Gmail", descZh: "读取并管理 Gmail 邮件", brand: "gmail", connect: true },
];

const COMMANDS = [
  { key: "compare", name: "/compare", descEn: "Flavor vs. last summer", descZh: "对比风味与去年同期销量" },
  { key: "churn-plan", name: "/churn-plan", descEn: "Draft a churn schedule", descZh: "起草搅拌生产排期" },
  { key: "restock", name: "/restock", descEn: "Build a reorder list", descZh: "生成补货清单" },
  { key: "draft-email", name: "/draft-email", descEn: "Write a supplier email", descZh: "撰写供应商邮件" },
  { key: "summarize", name: "/summarize", descEn: "Digest the thread so far", descZh: "总结当前对话要点" },
];

const MODELS = [
  { key: "sprinkles-5", name: "Sprinkles 5", tagEn: "Flagship", tagZh: "旗舰" },
  { key: "vanilla-1", name: "Vanilla 1", tagEn: "Basic", tagZh: "基础" },
  { key: "freezer-burn", name: "Freezer Burn 0.4", tagEn: "Stale", tagZh: "过时" },
];

const FILES = ["flavor-chart.png", "summer-menu.pdf", "pos-export.csv"];
const DICTATION_EN = "Compare pistachio weekends to last summer";
const DICTATION_ZH = "对比开心果口味周末销量与去年同期";
const RAINBOW_HEX = [
  "#FF3D7F",
  "#FF7A1A",
  "#FFD600",
  "#C2FF3D",
  "#1FC8FF",
  "#2E70FF",
  "#D33CFF",
];
const SWEEP_OPTIONS = {
  direction: "ltr",
  sweepMs: 950,
  outroMs: 130,
  peakAlpha: 1.3,
  bandTight: 10,
  brightness: 1.4,
  swellAmount: 1,
  waveSpeed: 1.3,
  easing: "easeOutExpo",
};

let glimmModules = null;
let glimmModulesPromise = null;

function loadGlimmModules() {
  if (!glimmModulesPromise) {
    glimmModulesPromise = import("glimm").then((modules) => {
      glimmModules = modules;
      return modules;
    });
  }
  return glimmModulesPromise;
}

function easeOutExpo(progress) {
  return progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - (-2 * progress + 2) ** 3 / 2;
}

function playFallbackSweep(controller, options = {}) {
  const sweepMs = options.sweepMs ?? 950;
  const outroMs = options.outroMs ?? 130;
  const peakAlpha = options.peakAlpha ?? 1.3;
  let cancelled = false;
  let frame = 0;
  let resolveDone;
  const done = new Promise((resolve) => {
    resolveDone = resolve;
  });

  const animate = (duration, update, easing) =>
    new Promise((resolve) => {
      const startedAt = performance.now();
      const tick = () => {
        if (cancelled) {
          resolve();
          return;
        }
        const raw = Math.min(1, (performance.now() - startedAt) / duration);
        update(easing(raw));
        if (raw < 1) frame = requestAnimationFrame(tick);
        else resolve();
      };
      frame = requestAnimationFrame(tick);
    });

  (async () => {
    controller.setAlpha(peakAlpha);
    controller.setProgress(0);
    await animate(sweepMs, (progress) => controller.setProgress(progress), easeOutExpo);
    if (cancelled) return;
    await animate(
      outroMs,
      (progress) => controller.setAlpha(peakAlpha * (1 - progress)),
      easeInOutCubic,
    );
    if (cancelled) return;
    controller.setAlpha(0);
    controller.setProgress(0);
    resolveDone();
  })();

  return {
    done,
    cancel() {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(frame);
      controller.setAlpha(0);
      controller.setProgress(0);
      resolveDone();
    },
  };
}

const AUTO_STEPS = [
  { draft: "", connect: false, model: "vanilla-1", hold: 1100 },
  { draft: "@", active: 0, hold: 900 },
  { draft: "@", active: 1, hold: 620 },
  { draft: "@", active: 4, hold: 620 },
  { draft: "@", active: 6, hold: 700 },
  { draft: "@", active: 6, connect: true, hold: 1000 },
  { draft: "", hold: 700 },
  { draft: "/", active: 0, hold: 900 },
  { draft: "/", active: 1, hold: 620 },
  { draft: "/", active: 3, hold: 1000 },
  { draft: "", hold: 800 },
  { draft: "", modelOpen: true, hold: 1200 },
  { draft: "", model: "sprinkles-5", hold: 2400 },
  { draft: "", hold: 900 },
];

function icon(children, size = 15, strokeWidth = 1.8) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${children}</svg>`;
}

function parseToken(draft) {
  const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);
  if (!match) return null;
  return {
    kind: match[2] === "@" ? "at" : "slash",
    query: match[3].toLowerCase(),
    start: match.index + match[1].length,
  };
}

export class NaiPromptBar extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "lang"];
  }

  constructor() {
    super();
    this._draft = "";
    this._dismissed = false;
    this._plusOpen = false;
    this._modelOpen = false;
    this._model = MODELS[1];
    this._attachments = [];
    this._connected = false;
    this._active = 0;
    this._listening = false;
    this._auto = true;
    this._autoStep = 0;
    this._expanded = false;
    this._engaged = false;
    this._modelHovered = null;
    this._autoTimer = null;
    this._dictationTimer = null;
    this._glRaf = 0;
    this._glResizeObserver = null;
    this._glCanvas = null;
    this._glShader = null;
    this._glRenderer = null;
    this._glSweepHandle = null;
    this._glInitVersion = 0;
    this._pendingSweep = false;
    this._sweeping = false;
  }

  get variant() {
    return this.getAttribute("variant") || "Rounded";
  }

  get isPill() {
    return this.variant.toLowerCase() === "pill";
  }

  onMount() {
    this._runAutoStep();
  }

  onUnmount() {
    this._clearAutoTimer();
    this._clearDictationTimer();
    this._pendingSweep = false;
    this._destroyCanvas();
  }

  _destroyCanvas() {
    this._glInitVersion += 1;
    this._glSweepHandle?.cancel?.();
    this._glSweepHandle = null;
    this._glShader?.destroy?.();
    this._glShader = null;
    this._glRenderer = null;
    this._sweeping = false;
    if (this._glRaf) cancelAnimationFrame(this._glRaf);
    this._glRaf = 0;
    this._glResizeObserver?.disconnect();
    this._glResizeObserver = null;
    if (this._glCanvas) {
      this._glCanvas.style.opacity = "0";
      delete this._glCanvas.dataset.sweeping;
    }
    this._glCanvas = null;
  }

  async _initCanvas() {
    const canvas = this.shadowRoot?.querySelector("canvas");
    if (!(canvas instanceof HTMLCanvasElement)) return;
    if (this._glCanvas === canvas && this._glShader) return;
    this._destroyCanvas();
    this._glCanvas = canvas;
    canvas.style.opacity = "0";
    canvas.dataset.renderer = "loading";
    const version = this._glInitVersion;
    try {
      const { ACCENTS, accentChain, createShader, playSweep } =
        glimmModules ?? (await loadGlimmModules());
      if (
        version !== this._glInitVersion ||
        canvas !== this.shadowRoot?.querySelector("canvas")
      ) {
        return;
      }
      const palette = accentChain([
        ACCENTS.red,
        ACCENTS.orange,
        ACCENTS.yellow,
        ACCENTS.green,
        ACCENTS.cyan,
        ACCENTS.blue,
        ACCENTS.purple,
      ]);
      this._glShader = createShader({
        canvas,
        palette,
        direction: "ltr",
        bandTight: 10,
        swellAmount: 0.85,
      });
      if (this._glShader) {
        this._glRenderer = { createShader, palette, playSweep, type: "glimm" };
        canvas.dataset.renderer = "glimm";
        if (this._pendingSweep) this._celebrate();
        return;
      }
    } catch {
      // Native browser modules cannot resolve package bare specifiers without
      // an import map. Continue with the framework-free canvas renderer.
    }
    if (version !== this._glInitVersion || canvas !== this._glCanvas) return;
    this._initFallbackCanvas(canvas);
    if (this._pendingSweep) this._celebrate();
  }

  _initFallbackCanvas(canvas) {
    const context = canvas.getContext("2d");
    if (!context) {
      canvas.dataset.renderer = "unavailable";
      return;
    }
    const state = { alpha: 0, progress: 0 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      context.clearRect(0, 0, width, height);
      if (state.alpha <= 0 || width <= 0 || height <= 0) return;

      const center = (-0.2 + state.progress * 1.4) * width;
      const band = Math.max(72, width * 0.38);
      const gradient = context.createLinearGradient(
        center - band,
        0,
        center + band,
        0,
      );
      gradient.addColorStop(0, "rgba(255,61,127,0)");
      RAINBOW_HEX.forEach((color, index) => {
        gradient.addColorStop(0.08 + (index / (RAINBOW_HEX.length - 1)) * 0.84, color);
      });
      gradient.addColorStop(1, "rgba(211,60,255,0)");
      const entryFade = 0.2 + 0.8 * 4 * state.progress * (1 - state.progress);
      context.save();
      context.globalAlpha = Math.min(1, state.alpha * entryFade);
      context.globalCompositeOperation = "screen";
      context.fillStyle = gradient;
      context.fillRect(center - band, 0, band * 2, height);
      context.restore();
    };

    const controller = {
      destroy: () => {
        this._glResizeObserver?.disconnect();
        this._glResizeObserver = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
      },
      getAlpha: () => state.alpha,
      getProgress: () => state.progress,
      setAlpha: (alpha) => {
        state.alpha = Math.max(0, Math.min(1.5, alpha));
        draw();
      },
      setBandTight: () => {},
      setBrightness: () => {},
      setDirection: () => {},
      setPalette: () => {},
      setProgress: (progress) => {
        state.progress = Math.max(0, Math.min(1, progress));
        draw();
      },
      setRippleAmount: () => {},
      setSwellAmount: () => {},
      setWaveAmount: () => {},
      setWaveSpeed: () => {},
    };

    this._glResizeObserver = new ResizeObserver(resize);
    this._glResizeObserver.observe(canvas);
    resize();
    this._glShader = controller;
    this._glRenderer = { playSweep: playFallbackSweep, type: "fallback" };
    canvas.dataset.renderer = "fallback";
  }

  _celebrate() {
    if (this._sweeping) return;
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (!this._glCanvas || !this._glShader || !this._glRenderer) {
      this._pendingSweep = true;
      this._initCanvas();
      return;
    }

    this._pendingSweep = false;
    if (this._glRenderer.type === "glimm") {
      this._glShader.destroy?.();
      this._glShader = this._glRenderer.createShader({
        canvas: this._glCanvas,
        palette: this._glRenderer.palette,
        direction: "ltr",
        bandTight: 10,
        swellAmount: 0.85,
      });
      if (!this._glShader) {
        this._initFallbackCanvas(this._glCanvas);
      }
    }
    if (!this._glShader || !this._glRenderer) return;

    const canvas = this._glCanvas;
    canvas.style.opacity = "1";
    canvas.dataset.sweeping = "true";
    this._sweeping = true;
    const options =
      this._glRenderer.type === "glimm"
        ? { ...SWEEP_OPTIONS, palette: this._glRenderer.palette }
        : SWEEP_OPTIONS;
    const handle = this._glRenderer.playSweep(this._glShader, options);
    this._glSweepHandle = handle;
    handle.done.finally(() => {
      if (this._glSweepHandle !== handle) return;
      this._glSweepHandle = null;
      this._sweeping = false;
      canvas.style.opacity = "0";
      delete canvas.dataset.sweeping;
    });
  }

  _clearAutoTimer() {
    if (this._autoTimer === null) return;
    window.clearTimeout(this._autoTimer);
    this._autoTimer = null;
  }

  _clearDictationTimer() {
    if (this._dictationTimer === null) return;
    window.clearTimeout(this._dictationTimer);
    this._dictationTimer = null;
  }

  _takeOver(target) {
    if (!this._auto) return;
    this._auto = false;
    this._clearAutoTimer();
    if (target === this.shadowRoot?.querySelector("textarea")) this._draft = "";
  }

  _runAutoStep() {
    if (!this._auto) return;
    const step = AUTO_STEPS[this._autoStep % AUTO_STEPS.length];
    let celebrate = false;
    this._draft = step.draft;
    if (step.active !== undefined) this._active = step.active;
    if (step.connect !== undefined) this._connected = step.connect;
    if (step.modelOpen !== undefined) this._modelOpen = step.modelOpen;
    if (step.model) {
      const next = MODELS.find((model) => model.key === step.model);
      if (next) {
        this._model = next;
        this._modelOpen = false;
        celebrate = next.key === "sprinkles-5";
      }
    }
    if (this._mounted) this.render();
    if (celebrate) this._celebrate();
    this._autoTimer = this.registerTimeout(() => {
      this._autoTimer = null;
      this._autoStep += 1;
      this._runAutoStep();
    }, step.hold);
  }

  _token() {
    return this._dismissed ? null : parseToken(this._draft);
  }

  _menu() {
    return this._plusOpen ? "at" : this._token()?.kind ?? null;
  }

  _rows() {
    const zh = this.isZh;
    const menu = this._menu();
    const token = this._token();
    const query = this._plusOpen ? "" : token?.query ?? "";
    if (menu === "at") {
      return SOURCES.filter((source) =>
        (zh ? source.nameZh : source.nameEn).toLowerCase().includes(query),
      ).map((source) => ({
        key: source.key,
        name: zh ? source.nameZh : source.nameEn,
        desc: zh ? source.descZh : source.descEn,
      }));
    }
    if (menu === "slash") {
      return COMMANDS.filter((command) => command.name.slice(1).startsWith(query)).map((command) => ({
        key: command.key,
        name: command.name,
        desc: zh ? command.descZh : command.descEn,
      }));
    }
    return [];
  }

  _renderAndFocus(selector) {
    this.render();
    this.shadowRoot?.querySelector(selector)?.focus();
  }

  _handleInput(value) {
    this._draft = value;
    this._dismissed = false;
    this._plusOpen = false;
    this._active = 0;
    this._engaged = false;
    this._renderAndFocus("textarea");
  }

  _pick(row) {
    const token = this._token();
    const menu = this._menu();
    const source = SOURCES.find((item) => item.key === row.key);
    if (source?.attach) {
      this._attachments = [
        ...this._attachments,
        FILES[this._attachments.length % FILES.length],
      ];
      if (token) this._draft = this._draft.slice(0, token.start);
    } else if (menu === "at") {
      this._draft = `${token ? this._draft.slice(0, token.start) : this._draft}@${row.name} `;
    } else {
      this._draft = `${token ? this._draft.slice(0, token.start) : this._draft}${row.name} `;
    }
    this._plusOpen = false;
    this._dismissed = false;
    this._renderAndFocus("textarea");
  }

  _selectModel(model) {
    this._model = model;
    this._modelOpen = false;
    this._modelHovered = null;

    this.shadowRoot
      ?.querySelector("[data-model-highlight]")
      ?.parentElement?.remove();
    const control = this.shadowRoot?.querySelector(
      '[aria-label="Choose model"], [aria-label="选择模型"]',
    );
    if (control) {
      control.setAttribute("aria-expanded", "false");
      const label = [...control.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE,
      );
      if (label) label.textContent = model.name;
    }
    this.shadowRoot?.querySelector("textarea")?.focus();
    if (model.key === "sprinkles-5") this._celebrate();
  }

  _startDictation() {
    this._listening = !this._listening;
    this._clearDictationTimer();
    if (!this._listening) {
      this.render();
      return;
    }
    this.render();
    this._dictationTimer = this.registerTimeout(() => {
      this._dictationTimer = null;
      const dictation = this.isZh ? DICTATION_ZH : DICTATION_EN;
      this._draft = this._draft
        ? `${this._draft.trimEnd()} ${dictation}`
        : dictation;
      this._listening = false;
      this._renderAndFocus("textarea");
    }, 2200);
  }

  _canSend() {
    return this._draft.trim().length > 0 || this._attachments.length > 0;
  }

  send() {
    if (!this._canSend()) return;
    this.dispatchEvent(
      new CustomEvent("submit", {
        detail: { text: this._draft.trim(), model: this._model.key },
      }),
    );
    this._draft = "";
    this._attachments = [];
    this._plusOpen = false;
    this._modelOpen = false;
    this.render();
    this.shadowRoot?.querySelector('[aria-label="Send"], [aria-label="发送"]')?.focus();
  }

  _updateRowHighlight(index) {
    this._active = index;
    this._engaged = true;
    const highlight = this.shadowRoot?.querySelector("[data-menu-highlight]");
    const row = this.shadowRoot?.querySelector(`[data-row-index="${index}"]`);
    if (!(highlight instanceof HTMLElement) || !(row instanceof HTMLElement)) return;
    highlight.style.top = `${row.offsetTop}px`;
    highlight.style.height = `${row.offsetHeight}px`;
    highlight.style.opacity = "1";
  }

  _updateModelHighlight(index) {
    this._modelHovered = index;
    const highlight = this.shadowRoot?.querySelector("[data-model-highlight]");
    const row = this.shadowRoot?.querySelector(`[data-model-index="${index}"]`);
    if (!(highlight instanceof HTMLElement) || !(row instanceof HTMLElement)) return;
    highlight.style.top = `${row.offsetTop}px`;
    highlight.style.height = `${row.offsetHeight}px`;
    highlight.style.opacity = "1";
  }

  _measureComposer() {
    const controls = this.shadowRoot?.querySelector("[data-controls]");
    const input = this.shadowRoot?.querySelector("textarea");
    const measure = this.shadowRoot?.querySelector("[data-measure]");
    const modelButton = this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]');
    if (!(controls instanceof HTMLElement) || !(input instanceof HTMLTextAreaElement) || !(measure instanceof HTMLElement) || !(modelButton instanceof HTMLElement)) return;

    if (controls.clientWidth > 0) {
      const fixedControlsWidth = 28 * 3 + modelButton.offsetWidth;
      const inlineGaps = 4 * 4;
      const inlineInputWidth = controls.clientWidth - fixedControlsWidth - inlineGaps;
      const needsFullWidth =
        this._draft.includes("\n") || measure.offsetWidth + 8 > inlineInputWidth;
      if (needsFullWidth !== this._expanded) {
        this._expanded = needsFullWidth;
        this.render();
        return;
      }
    }

    input.style.height = "0px";
    const contentHeight = input.scrollHeight;
    input.style.height = `${Math.min(Math.max(contentHeight, 28), 100)}px`;
    input.style.overflowY = contentHeight > 100 ? "auto" : "hidden";
  }

  render() {
    const stableCanvas = this.shadowRoot?.querySelector("canvas");
    const stableComposer = stableCanvas?.parentElement;
    const stableSend = this.shadowRoot?.querySelector(
      '[aria-label="Send"], [aria-label="发送"]',
    );
    const zh = this.isZh;
    const pill = this.isPill;
    const token = this._token();
    const menu = this._menu();
    const query = this._plusOpen ? "" : token?.query ?? "";
    const rows = this._rows();
    const canSend = this._canSend();
    const expanded = this._expanded;
    const modelIndex = MODELS.findIndex((model) => model.key === this._model.key);

    const sourceMenu = menu
      ? `<div class="absolute inset-x-0 bottom-full z-10 mb-2 rounded-card bg-surface p-1 shadow-raised" style="animation:pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;transform-origin:bottom center"><span data-menu-highlight aria-hidden="true" class="pointer-events-none absolute inset-x-1 rounded-[6px] bg-hover" style="top:${4 + this._active * 36}px;height:36px;opacity:${this._engaged && rows.length > 0 ? 1 : 0};transition:top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease"></span>${rows.map((row, index) => {
          const source = menu === "at" ? SOURCES.find((item) => item.key === row.key) : undefined;
          const sourceIcon = source
            ? `<span class="flex size-5.5 shrink-0 items-center justify-center text-ink-2">${source.brand ? BRANDS[source.brand] : icon(GLYPHS[source.glyph ?? "clip"], 15)}</span>`
            : "";
          const connection = source?.connect
            ? `<span role="button" tabindex="-1" data-connect class="shrink-0 text-[12px] font-medium transition-colors duration-100 ${this._connected ? "text-green" : "text-accent-ink hover:underline"}">${this._connected ? (zh ? "已连接" : "Connected") : zh ? "连接" : "Connect"}</span>`
            : "";
          return `<button type="button" data-row-index="${index}" data-row-key="${row.key}" class="relative z-10 flex h-9 w-full items-center gap-2.5 rounded-[6px] px-2 text-left">${sourceIcon}<span class="shrink-0 text-[12.5px] font-medium text-ink">${row.name}</span><span class="min-w-0 flex-1 truncate text-[12px] text-ink-3">${row.desc}</span>${connection}</button>`;
        }).join("")}${rows.length === 0 ? `<div class="flex h-9 items-center px-2 text-[12px] text-ink-3">${zh ? `没有匹配「${query}」的结果` : `No matches for “${query}”`}</div>` : ""}<div class="mt-1 border-t border-line px-2 pt-1.5 pb-1 text-[11px] text-ink-3">${menu === "at" ? (zh ? "输入以搜索数据源与文件" : "Type to search sources & files") : zh ? "输入以搜索命令" : "Type to search commands"}</div></div>`
      : "";

    const modelMenu = this._modelOpen
      ? `<div class="absolute right-0 bottom-full z-10 mb-2 w-44 rounded-card bg-surface p-1 shadow-raised" style="animation:pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;transform-origin:bottom right"><span data-model-highlight aria-hidden="true" class="pointer-events-none absolute inset-x-1 rounded-[6px] bg-hover" style="top:${4 + (this._modelHovered ?? modelIndex) * 30}px;height:30px;opacity:${this._modelHovered === null ? 0 : 1};transition:top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease"></span>${MODELS.map((model, index) => `<button type="button" data-model-index="${index}" data-model="${model.key}" class="relative z-10 flex h-7.5 w-full items-center gap-2 rounded-[6px] px-2 text-left"><span class="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">${model.name}</span><span class="shrink-0 text-[11px] text-ink-3">${zh ? model.tagZh : model.tagEn}</span><span class="shrink-0 text-ink ${model.key === this._model.key ? "" : "invisible"}">${icon('<path d="M20 6L9 17l-5-5"></path>', 13, 2.5)}</span></button>`).join("")}</div>`
      : "";

    const attachments = this._attachments.length > 0
      ? `<div class="flex flex-wrap gap-1.5 pt-0.5 ${pill ? "px-1" : "px-0.5"}">${this._attachments.map((file, index) => `<span class="flex h-6.5 items-center gap-1.5 bg-field py-1 pr-1 pl-1.5 text-[11.5px] text-ink-2 shadow-hairline ${pill ? "rounded-full" : "rounded-chip"}" style="animation:pop-in 200ms cubic-bezier(0.23,1,0.32,1) both">${icon('<g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></g>', 12)}<span class="max-w-36 truncate">${file}</span><button type="button" data-remove="${index}" aria-label="${zh ? `移除 ${file}` : `Remove ${file}`}" class="flex size-4 items-center justify-center text-ink-3 transition-colors duration-100 hover:bg-line/70 hover:text-ink ${pill ? "rounded-full" : "rounded-[4px]"}">${icon('<path d="M18 6L6 18M6 6l12 12"></path>', 10, 2.5)}</button></span>`).join("")}</div>`
      : "";

    const equalizer = '<span class="flex h-3.5 items-center gap-[2.5px]"><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 0ms infinite"></span><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 150ms infinite"></span><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 300ms infinite"></span></span>';

    this.setHtml(
      `<div class="flex min-h-[384px] w-full max-w-105 flex-col justify-end pb-8"><div class="relative">${sourceMenu}${modelMenu}<div class="relative isolate flex flex-col gap-1.5 overflow-hidden border border-line bg-surface p-1.5 shadow-card transition-[border-color,border-radius] duration-150 focus-within:border-line-strong ${pill ? (this._attachments.length > 0 || expanded ? "rounded-[24px]" : "rounded-full") : "rounded-[14px]"}"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 h-full w-full" style="border-radius:inherit;opacity:0"></canvas><span data-measure aria-hidden="true" class="pointer-events-none absolute invisible whitespace-pre text-[13px] leading-[18px]"></span>${attachments}<div data-controls class="grid items-end gap-x-1 gap-y-1.5 ${expanded ? "grid-cols-[minmax(0,1fr)_auto_28px_28px]" : "grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]"}"><button type="button" aria-label="${zh ? "添加附件与数据源" : "Add attachments and sources"}" aria-expanded="${this._plusOpen}" class="flex size-7 shrink-0 items-center justify-center justify-self-start text-ink-3 transition-[background-color,color,transform] duration-150 hover:bg-hover hover:text-ink active:scale-[0.94] ${pill ? "rounded-full" : "rounded-[8px]"} ${this._plusOpen ? "bg-hover text-ink" : ""} ${expanded ? "col-start-1 row-start-2" : "col-start-1 row-start-1"}">${icon('<path d="M12 5v14M5 12h14"></path>', 16, 2)}</button><textarea rows="1" placeholder="${this._listening ? (zh ? "正在聆听…" : "Listening…") : zh ? "输入消息…" : "Write a message…"}" aria-label="${zh ? "提示词输入框" : "Prompt"}" class="min-h-7 min-w-0 w-full resize-none bg-transparent px-1 py-[5px] text-[13px] leading-[18px] text-ink outline-none [overflow-wrap:anywhere] placeholder:text-ink-3 ${expanded ? "col-span-full col-start-1 row-start-1" : "col-start-2 row-start-1"}"></textarea><button type="button" aria-expanded="${this._modelOpen}" aria-label="${zh ? "选择模型" : "Choose model"}" class="flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink ${pill ? "rounded-full" : "rounded-[8px]"} ${expanded ? "col-start-2 row-start-2" : "col-start-3 row-start-1"}">${this._model.name}<span class="text-ink-3">${icon('<path d="M6 9l6 6 6-6"></path>', 11, 2.4)}</span></button><button type="button" aria-label="${this._listening ? (zh ? "停止听写" : "Stop dictation") : zh ? "开始听写" : "Start dictation"}" aria-pressed="${this._listening}" class="flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-150 active:scale-[0.94] ${pill ? "rounded-full" : "rounded-[8px]"} ${this._listening ? "bg-accent-tint text-accent-ink" : "text-ink-3 hover:bg-hover hover:text-ink"} ${expanded ? "col-start-3 row-start-2" : "col-start-4 row-start-1"}">${this._listening ? equalizer : icon('<g><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"></path></g>', 15, 2)}</button><button type="button" aria-label="${zh ? "发送" : "Send"}" ${canSend ? "" : "disabled"} class="flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.94] ${pill ? "rounded-full" : "rounded-[8px]"} ${expanded ? "col-start-4 row-start-2" : "col-start-5 row-start-1"}" style="background:${canSend ? "var(--ink)" : "var(--line-strong)"};color:${canSend ? "var(--surface)" : "var(--ink-2)"}">${icon('<path d="M12 19V5M5 12l7-7 7 7"></path>', 16, 2.4)}</button></div></div></div></div>`,
      ":host{display:flex;justify-content:center;width:100%}",
    );

    const nextCanvas = this.shadowRoot?.querySelector("canvas");
    if (
      stableCanvas instanceof HTMLCanvasElement &&
      nextCanvas instanceof HTMLCanvasElement
    ) {
      nextCanvas.replaceWith(stableCanvas);
    }
    const nextSend = this.shadowRoot?.querySelector(
      '[aria-label="Send"], [aria-label="发送"]',
    );
    if (
      stableSend instanceof HTMLButtonElement &&
      nextSend instanceof HTMLButtonElement
    ) {
      stableSend.className = nextSend.className;
      stableSend.disabled = nextSend.disabled;
      stableSend.style.cssText = nextSend.style.cssText;
      stableSend.setAttribute("aria-label", nextSend.getAttribute("aria-label"));
      nextSend.replaceWith(stableSend);
    }

    const nextComposer = this.shadowRoot?.querySelector(".relative.isolate");
    if (
      stableComposer instanceof HTMLElement &&
      nextComposer instanceof HTMLElement
    ) {
      stableComposer.className = nextComposer.className;
      stableComposer.replaceChildren(...nextComposer.childNodes);
      nextComposer.replaceWith(stableComposer);
    }

    const textarea = this.shadowRoot?.querySelector("textarea");
    const measure = this.shadowRoot?.querySelector("[data-measure]");
    if (textarea instanceof HTMLTextAreaElement) textarea.value = this._draft;
    if (measure) measure.textContent = this._draft;

    const root = this.shadowRoot?.querySelector(".min-h-\\[384px\\]");
    root?.addEventListener("pointerdown", (event) => this._takeOver(event.target), true);
    root?.addEventListener("keydown", (event) => this._takeOver(event.target), true);

    textarea?.addEventListener("input", (event) => this._handleInput(event.target.value));
    textarea?.addEventListener("keydown", (event) => {
      const currentRows = this._rows();
      if (this._menu() && currentRows.length > 0) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          this._active =
            (this._active + (event.key === "ArrowDown" ? 1 : currentRows.length - 1)) %
            currentRows.length;
          this._updateRowHighlight(this._active);
          return;
        }
        if ((event.key === "Enter" && !event.shiftKey) || event.key === "Tab") {
          event.preventDefault();
          this._pick(currentRows[this._active]);
          return;
        }
      }
      if (event.key === "Escape") {
        this._dismissed = true;
        this._plusOpen = false;
        this._modelOpen = false;
        this.render();
        return;
      }
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        this.send();
      }
    });

    this.shadowRoot?.querySelector('[aria-label="Add attachments and sources"], [aria-label="添加附件与数据源"]')?.addEventListener("click", () => {
      this._modelOpen = false;
      this._plusOpen = !this._plusOpen;
      this._renderAndFocus("textarea");
    });
    this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]')?.addEventListener("click", () => {
      this._plusOpen = false;
      this._modelOpen = !this._modelOpen;
      this.render();
      this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]')?.focus();
    });
    this.shadowRoot?.querySelector('[aria-label="Start dictation"], [aria-label="Stop dictation"], [aria-label="开始听写"], [aria-label="停止听写"]')?.addEventListener("click", () => this._startDictation());
    const sendControl = this.shadowRoot?.querySelector(
      '[aria-label="Send"], [aria-label="发送"]',
    );
    if (sendControl && sendControl !== stableSend) {
      sendControl.addEventListener("click", () => this.send());
    }

    this.shadowRoot?.querySelectorAll("[data-row-index]").forEach((button) => {
      const index = Number(button.getAttribute("data-row-index"));
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("mouseenter", () => this._updateRowHighlight(index));
      button.addEventListener("click", () => this._pick(rows[index]));
      button.querySelector("[data-connect]")?.addEventListener("click", (event) => {
        event.stopPropagation();
        this._connected = !this._connected;
        const control = event.currentTarget;
        control.textContent = this._connected
          ? this.isZh
            ? "已连接"
            : "Connected"
          : this.isZh
            ? "连接"
            : "Connect";
        control.classList.toggle("text-green", this._connected);
        control.classList.toggle("text-accent-ink", !this._connected);
        control.classList.toggle("hover:underline", !this._connected);
      });
    });
    const sourceMenuElement = this.shadowRoot?.querySelector("[data-menu-highlight]")?.parentElement;
    sourceMenuElement?.addEventListener("mouseleave", () => {
      this._engaged = false;
      const highlight = this.shadowRoot?.querySelector("[data-menu-highlight]");
      if (highlight instanceof HTMLElement) highlight.style.opacity = "0";
    });

    this.shadowRoot?.querySelectorAll("[data-model-index]").forEach((button) => {
      const index = Number(button.getAttribute("data-model-index"));
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("mouseenter", () => this._updateModelHighlight(index));
      button.addEventListener("click", () => this._selectModel(MODELS[index]));
    });
    const modelMenuElement = this.shadowRoot?.querySelector("[data-model-highlight]")?.parentElement;
    modelMenuElement?.addEventListener("mouseleave", () => {
      this._modelHovered = null;
      const highlight = this.shadowRoot?.querySelector("[data-model-highlight]");
      if (highlight instanceof HTMLElement) highlight.style.opacity = "0";
    });

    this.shadowRoot?.querySelectorAll("[data-remove]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = Number(button.getAttribute("data-remove"));
        this._attachments = this._attachments.filter((_, itemIndex) => itemIndex !== index);
        this.render();
      });
    });

    this._measureComposer();
    this._initCanvas();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-prompt-bar")) {
  customElements.define("nai-prompt-bar", NaiPromptBar);
}
