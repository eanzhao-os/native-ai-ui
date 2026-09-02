import { NaiBaseElement } from "../core/base-element.js";

const STAGES = [800, 600, 1800, 2600, 1600];

const VARIANTS_EN = {
  Steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading flavor briefs" },
      { primary: "Scanning supplier lists" },
      { primary: "Comparing tasting notes", secondary: "6 flavors" },
      { primary: "Writing the scoop report" },
    ],
  },
  Reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Summer demand spikes for stone-fruit flavors — peach and apricot lead." },
      { primary: "I should check cone inventory before promoting a waffle-bowl special." },
    ],
  },
  Search: {
    active: "Searching the web",
    done: "Searched the web",
    query: "best waffle cone supplier",
    rows: [
      { primary: "Joy Cone", secondary: "joycone.com", href: "https://joycone.com" },
      { primary: "WebstaurantStore", secondary: "webstaurantstore.com", href: "https://webstaurantstore.com" },
      { primary: "The Konery", secondary: "thekonery.com", href: "https://thekonery.com" },
    ],
  },
  Coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "flavors.ts", mono: true },
      { primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
      { primary: "Run", secondary: "npm run freeze", mono: true },
    ],
  },
};

const VARIANTS_ZH = {
  Steps: {
    active: "深度思考中",
    done: "已深度思考 4 秒",
    rows: [
      { primary: "解析风味研发简报" },
      { primary: "扫描合规原料供应商名录" },
      { primary: "比对盲测品鉴笔记", secondary: "6 款配方" },
      { primary: "生成冰淇淋上架评估报告" },
    ],
  },
  Reasoning: {
    active: "深度推理中",
    done: "已完成推理 (4秒)",
    rows: [
      { primary: "夏季水果口味需求激增 — 蜜桃与黄杏风味处于领跑地位。" },
      { primary: "在推广华夫脆筒套餐前，应先校验当前脆筒库存水位。" },
    ],
  },
  Search: {
    active: "正在检索全网资料",
    done: "全网检索完成",
    query: "顶级华夫甜筒供应商",
    rows: [
      { primary: "Joy Cone 官方供应链", secondary: "joycone.com", href: "https://joycone.com" },
      { primary: "WebstaurantStore 餐饮商城", secondary: "webstaurantstore.com", href: "https://webstaurantstore.com" },
      { primary: "The Konery 手工脆筒", secondary: "thekonery.com", href: "https://thekonery.com" },
    ],
  },
  Coding: {
    active: "正在执行工具调用",
    done: "已调用 3 项工具",
    rows: [
      { primary: "读取", secondary: "flavors.ts", mono: true },
      { primary: "修改", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
      { primary: "执行", secondary: "npm run freeze", mono: true },
    ],
  },
};

const TONES = ["bg-accent", "bg-orange", "bg-green"];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function globeDot(tone) {
  return `<span class="flex size-3.5 shrink-0 items-center justify-center rounded-full text-white ${tone}"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle><path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path></svg></span>`;
}

const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 6L9 17l-5-5"></path></svg>`;

export class NaiThinking extends NaiBaseElement {
  static get observedAttributes() {
    return ["variant", "lang", "auto"];
  }

  constructor() {
    super();
    this._stage = 0;
    this._manualExpanded = null;
    this._selectedTool = null;
  }

  get variant() {
    return this.getAttribute("variant") || "Steps";
  }

  onMount() {
    this._stage = 0;
    const runStage = (index) => {
      if (index >= STAGES.length - 1) return;
      this.registerTimeout(() => {
        this._stage = index + 1;
        this.render();
        runStage(this._stage);
      }, STAGES[index]);
    };
    runStage(0);
  }

  _rowContent(row, index, variant, visible, working) {
    const pieces = [];
    if (variant === "Search") {
      pieces.push(globeDot(TONES[index % TONES.length]));
    }
    if (variant === "Steps") {
      if (index < visible - 1 || !working) {
        pieces.push(checkIcon);
      } else {
        pieces.push('<span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>');
      }
    }

    const primaryTone = variant === "Reasoning"
      ? "whitespace-normal leading-relaxed text-ink-2"
      : "font-medium text-ink";
    const underline = variant === "Search" ? " animated-underline" : "";
    pieces.push(`<span class="min-w-0 truncate text-[12.5px] ${primaryTone}${underline}">${escapeHtml(row.primary)}</span>`);

    if (row.secondary) {
      pieces.push(`<span class="shrink-0 text-[11.5px] text-ink-3${row.mono ? " font-mono" : ""}">${escapeHtml(row.secondary)}</span>`);
    }
    if (row.add !== undefined) {
      pieces.push(`<span class="shrink-0 font-mono text-[11px] tabular-nums"><span class="text-green">+${row.add}</span> <span class="text-red">−${row.del}</span></span>`);
    }
    return pieces.join(" ");
  }

  _rowMarkup(row, index, variant, visible, working) {
    const rowClass = "flex min-h-7 w-full items-center gap-2 rounded-[6px] px-1.5 py-0.5 text-left";
    const animation = `animation: fade-up 320ms cubic-bezier(0.23,1,0.32,1) ${index * 120}ms both;`;
    const content = this._rowContent(row, index, variant, visible, working);

    if (variant === "Search") {
      return `<a href="${escapeHtml(row.href)}" target="_blank" rel="noreferrer" class="${rowClass} transition-colors duration-150 hover:bg-hover" style="${animation}">${content}</a>`;
    }

    if (variant === "Coding") {
      const selected = this._selectedTool === row.primary;
      return `<button type="button" aria-pressed="${selected}" class="${rowClass} transition-colors duration-150 ${selected ? "bg-inset" : "hover:bg-hover"} cursor-pointer" style="${animation}">${content}</button>`;
    }

    return `<div class="${rowClass}" style="${animation}">${content}</div>`;
  }

  _syncLineHeight() {
    const trace = this.shadowRoot?.querySelector(".trace-content");
    const line = this.shadowRoot?.querySelector(".trace-line");
    if (!trace || !line) return;
    const lineHeight = trace.offsetHeight;
    line.style.height = `${lineHeight ? lineHeight - 2 : 0}px`;
  }

  render() {
    const zh = this.isZh;
    const variant = this.variant;
    const variants = zh ? VARIANTS_ZH : VARIANTS_EN;
    const value = variants[variant] ?? variants.Steps;
    const autoExpanded = this._stage >= 1 && this._stage < 4;
    const expanded = this._manualExpanded ?? autoExpanded;
    const working = this._stage < 3;
    const visible = this._stage < 2
      ? 0
      : this._stage === 2
        ? Math.min(2, value.rows.length)
        : value.rows.length;

    const query = value.query
      ? `<div class="flex h-6 items-center gap-2 px-1.5"${expanded ? ' style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"' : ""}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" class="shrink-0"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg><span class="text-[12.5px] text-ink-2">${escapeHtml(value.query)}</span></div>`
      : "";
    const rows = value.rows
      .slice(0, visible)
      .map((row, index) => this._rowMarkup(row, index, variant, visible, working))
      .join("");
    const remaining = variant === "Search" && this._stage >= 3
      ? `<span class="text-[12px] text-ink-3" style="animation: fade-in 300ms ease-out both;">${zh ? "+ 更多 7 项结果" : "+7 more"}</span>`
      : "";
    const headerLabel = working
      ? `<span class="bg-clip-text text-[13px] font-medium whitespace-nowrap text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: 1.4s linear 0s infinite normal none running shimmer-text;">${escapeHtml(value.active)}</span>`
      : `<span class="text-[13px] font-medium whitespace-nowrap text-ink-2" style="animation: 350ms ease-out 0s 1 normal both running fade-in;">${escapeHtml(value.done)}</span>`;
    const header = [
      `<button type="button" aria-expanded="${expanded}" class="-mx-1.5 flex w-fit items-center gap-2 rounded-control px-1.5 py-1 transition-colors duration-100 hover:bg-hover-2 cursor-pointer">`,
      `<svg width="16" height="16" viewBox="0 0 24 24" fill="${working ? "var(--ink-2)" : "var(--ink-3)"}"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path></svg>`,
      headerLabel,
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" style="transform: ${expanded ? "rotate(180deg)" : "rotate(0deg)"};"><path d="M6 9l6 6 6-6"></path></svg>`,
      "</button>",
    ].join("");

    this.setHtml(`
      <div class="flex min-h-[176px] w-full max-w-95 flex-col">
        ${header}
        <div class="grid transition-[grid-template-rows,opacity] duration-400" style="grid-template-rows: ${expanded ? "1fr" : "0fr"}; opacity: ${expanded ? 1 : 0}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);">
          <div class="overflow-hidden">
            <div class="relative mt-1 ml-[5px] pl-4">
              <span aria-hidden="true" class="trace-line absolute left-[3px] w-px bg-line" style="top: -8px; height: 0px; transition: height 500ms cubic-bezier(0.23,1,0.32,1);"></span>
              <div class="trace-content flex flex-col gap-1 py-1">${query}${rows}${remaining}</div>
            </div>
          </div>
        </div>
      </div>
    `);

    this._syncLineHeight();

    this.shadowRoot?.querySelector("button")?.addEventListener("click", () => {
      this._manualExpanded = !(this._manualExpanded ?? autoExpanded);
      this.render();
    });

    const toolButtons = [...(this.shadowRoot?.querySelectorAll('button[aria-pressed]') ?? [])];
    toolButtons.forEach((button, index) => {
      const row = value.rows[index];
      button.addEventListener("click", () => {
        this._selectedTool = this._selectedTool === row.primary ? null : row.primary;
        this.render();
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-thinking")) {
  customElements.define("nai-thinking", NaiThinking);
}
