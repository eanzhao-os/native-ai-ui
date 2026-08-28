import { NaiBaseElement } from "../core/base-element.js";
import { ICONS } from "../core/icons.js";

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

const TONES = ["var(--accent, #0285ff)", "var(--orange, #ef720c)", "var(--green, #189a4d)"];

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

  get autoPlay() {
    return this.getAttribute("auto") !== "false";
  }

  onMount() {
    this._startSequence();
  }

  _startSequence() {
    if (!this.autoPlay) {
      this._stage = STAGES.length;
      return;
    }
    this._stage = 0;
    const runNext = (s) => {
      if (s >= STAGES.length - 1) return;
      this.registerTimeout(() => {
        this._stage = s + 1;
        this.render();
        runNext(s + 1);
      }, STAGES[s]);
    };
    runNext(0);
  }

  toggleExpand() {
    const autoExpanded = this._stage >= 1 && this._stage < 4;
    const currentExpanded = this._manualExpanded ?? autoExpanded;
    this._manualExpanded = !currentExpanded;
    this.render();
  }

  render() {
    const zh = this.isZh;
    const variants = zh ? VARIANTS_ZH : VARIANTS_EN;
    const v = variants[this.variant] ?? variants.Steps;

    const autoExpanded = this._stage >= 1 && this._stage < 4;
    const expanded = this._manualExpanded ?? autoExpanded;
    const working = this._stage < 3;
    const visibleCount = this._stage < 2 ? 0 : this._stage === 2 ? Math.min(2, v.rows.length) : v.rows.length;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 380px;
          min-height: 140px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        button {
          font-family: inherit;
          cursor: pointer;
        }
        .header-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
          margin: 0 -6px;
          background: transparent;
          border: none;
          border-radius: var(--radius-control, 8px);
          color: inherit;
          transition: background-color 0.12s ease;
        }
        .header-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .spark-icon {
          color: ${working ? "var(--ink-2, #62656b)" : "var(--ink-3, #9a9da3)"};
          display: flex;
          align-items: center;
        }
        .title-working {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, var(--ink-3, #9a9da3) 35%, var(--ink, #1f2124) 50%, var(--ink-3, #9a9da3) 65%);
          background-size: 200% 100%;
          animation: shimmer-text 1.4s linear infinite;
        }
        .title-done {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: var(--ink-2, #62656b);
          animation: fade-in 350ms ease-out both;
        }
        .chevron-icon {
          color: var(--ink-3, #9a9da3);
          display: flex;
          align-items: center;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          transform: rotate(${expanded ? "180deg" : "0deg"});
        }
        .trace-container {
          position: relative;
          margin-top: 6px;
          padding-left: 20px;
          display: ${expanded ? "flex" : "none"};
          flex-direction: column;
          gap: 8px;
        }
        .guide-line {
          position: absolute;
          left: 7px;
          top: 4px;
          bottom: 4px;
          width: 1.5px;
          background: var(--line, #ecedef);
          border-radius: 99px;
        }
        .row-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .row-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }
        .row-primary {
          color: var(--ink-2, #62656b);
        }
        .row-primary.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
          color: var(--ink, #1f2124);
          font-size: 12px;
        }
        .row-secondary {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }
        .badge-diff {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          display: inline-flex;
          gap: 4px;
        }
        .badge-add { color: var(--green, #189a4d); }
        .badge-del { color: var(--red, #e3474c); }
        .search-link {
          color: var(--accent-ink, #0170dd);
          text-decoration: none;
        }
        .search-link:hover {
          text-decoration: underline;
        }
        @keyframes shimmer-text {
          0% { background-position: 150%; }
          100% { background-position: -50%; }
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fade-up { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
      </style>

      <button type="button" class="header-btn" aria-expanded="${expanded}">
        <span class="spark-icon">${ICONS.spark}</span>
        ${working ? `<span class="title-working">${v.active}</span>` : `<span class="title-done">${v.done}</span>`}
        <span class="chevron-icon">${ICONS.chevronDown}</span>
      </button>

      <div class="trace-container">
        <div class="guide-line"></div>
        ${v.rows
          .slice(0, visibleCount)
          .map(
            (row, idx) => `
              <div class="row-item" style="animation-delay: ${idx * 60}ms">
                <span class="row-dot"></span>
                <span class="row-primary ${row.mono ? "mono" : ""}">
                  ${row.href ? `<a href="${row.href}" target="_blank" rel="noreferrer" class="search-link">${row.primary}</a>` : row.primary}
                </span>
                ${row.secondary ? `<span class="row-secondary ${row.mono ? "mono" : ""}">${row.secondary}</span>` : ""}
                ${row.add !== undefined ? `<span class="badge-diff"><span class="badge-add">+${row.add}</span><span class="badge-del">-${row.del}</span></span>` : ""}
              </div>
            `
          )
          .join("")}
      </div>
    `;

    const btn = this.shadowRoot.querySelector(".header-btn");
    btn?.addEventListener("click", () => this.toggleExpand());
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-thinking")) {
  customElements.define("nai-thinking", NaiThinking);
}
