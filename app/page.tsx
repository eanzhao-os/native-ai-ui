"use client";

import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./theme-toggle";
import { LangProvider, useLangContext } from "@/lib/lang-context";

// 1. Core & Composer
import LoadingState from "@/components/loading-state";
import ThinkingState from "@/components/thinking";
import StreamingText from "@/components/streaming-text";
import PromptBar from "@/components/prompt-bar";
import ChatComposer from "@/components/chat";
import CodeBlock from "@/components/code-block";

// 2. Agentic & Multi-Agent
import SubagentTree from "@/components/subagent-tree";
import TaskRows from "@/components/task-rows";
import ToolChips from "@/components/tool-chips";
import ApprovalCard from "@/components/approval-card";
import ClarificationCard from "@/components/clarification-card";

// 3. Context & Tokenomics
import ContextWindow from "@/components/context-window";
import MemoryInspector from "@/components/memory-inspector";
import ContextCards from "@/components/context-cards";
import ContextSpillover from "@/components/context-spillover";

// 4. Tether & Cordis Runtime
import CordisPluginTree from "@/components/cordis-plugin-tree";
import PermissionPresetCard from "@/components/permission-preset-card";
import LspDiagnostics from "@/components/lsp-diagnostics";
import SandboxManager from "@/components/sandbox-manager";
import JobScheduler from "@/components/job-scheduler";

// 5. Artifacts & Data
import ArtifactSandbox from "@/components/artifact-sandbox";
import DiffTable from "@/components/diff-table";
import RecordsTable from "@/components/records-table";
import FilterTable from "@/components/filter-table";
import SelectionActions from "@/components/selection-actions";

// 6. Multimodal & Arena
import AudioOrb from "@/components/audio-orb";
import ModelArena from "@/components/model-arena";
import InsightCards from "@/components/insight-cards";
import RecommendationCard from "@/components/recommendation-card";

// 7. Kumo & System Primitives
import SensitiveInput from "@/components/sensitive-input";
import LayerCard from "@/components/layer-card";
import SidebarNav from "@/components/sidebar-nav";
import SearchList from "@/components/search";
import FineTuneCard from "@/components/fine-tune-card";

type ComponentItem = {
  id: string;
  labelEn: string;
  labelZh: string;
  Component: React.ComponentType<any>;
};

type CategoryGroup = {
  categoryEn: string;
  categoryZh: string;
  items: ComponentItem[];
};

const CATEGORIES: CategoryGroup[] = [
  {
    categoryEn: "Core & Streaming",
    categoryZh: "核心与流式生成",
    items: [
      { id: "loading-state", labelEn: "Loading State", labelZh: "像素加载进度条", Component: LoadingState },
      { id: "thinking", labelEn: "Thinking Traces", labelZh: "深度思考与推理追踪", Component: ThinkingState },
      { id: "streaming-text", labelEn: "Streaming Text", labelZh: "逐字流式文本与引用", Component: StreamingText },
      { id: "prompt-bar", labelEn: "Prompt Bar", labelZh: "多模态输入栏 (Prompt Bar)", Component: PromptBar },
      { id: "chat", labelEn: "Chat Composer", labelZh: "对话消息与气泡输入", Component: ChatComposer },
      { id: "code-block", labelEn: "Code Block", labelZh: "代码块与一键运行", Component: CodeBlock },
    ],
  },
  {
    categoryEn: "Agentic & Teams",
    categoryZh: "智能体与团队协同",
    items: [
      { id: "subagent-tree", labelEn: "Subagent Delegation Tree", labelZh: "多 Agent 任务调度树", Component: SubagentTree },
      { id: "task-rows", labelEn: "Task Rows", labelZh: "多步骤任务执行进度行", Component: TaskRows },
      { id: "tool-chips", labelEn: "Tool Chips", labelZh: "工具调用状态胶囊徽章", Component: ToolChips },
      { id: "approval-card", labelEn: "Approval Card", labelZh: "人机协同权限审批卡", Component: ApprovalCard },
      { id: "clarification-card", labelEn: "Clarification Card", labelZh: "主动决策澄清卡片", Component: ClarificationCard },
    ],
  },
  {
    categoryEn: "Context & Memory",
    categoryZh: "上下文与记忆计量",
    items: [
      { id: "context-window", labelEn: "Context Window (Tokenomics)", labelZh: "上下文用量与成本计量", Component: ContextWindow },
      { id: "memory-inspector", labelEn: "Memory Inspector", labelZh: "长期记忆与实体认知看板", Component: MemoryInspector },
      { id: "context-cards", labelEn: "Context Cards", labelZh: "RAG 检索知识卡片", Component: ContextCards },
      { id: "context-spillover", labelEn: "Context Spillover", labelZh: "上下文压缩与磁盘溢出", Component: ContextSpillover },
    ],
  },
  {
    categoryEn: "Tether & Cordis Runtime",
    categoryZh: "Tether & Cordis 运行态",
    items: [
      { id: "cordis-plugin-tree", labelEn: "Cordis Plugin Tree", labelZh: "Cordis 插件与服务拓扑", Component: CordisPluginTree },
      { id: "permission-preset-card", labelEn: "Permission Presets", labelZh: "权限预设与审计重放", Component: PermissionPresetCard },
      { id: "lsp-diagnostics", labelEn: "LSP Diagnostics", labelZh: "Roslyn LSP 实时诊断修复", Component: LspDiagnostics },
      { id: "sandbox-manager", labelEn: "Sandbox Manager", labelZh: "E2B 容器沙盒与进程树", Component: SandboxManager },
      { id: "job-scheduler", labelEn: "Job Scheduler", labelZh: "Durable 持久化 Cron 调度", Component: JobScheduler },
    ],
  },
  {
    categoryEn: "Artifacts & Views",
    categoryZh: "工件制品与数据视图",
    items: [
      { id: "artifact-sandbox", labelEn: "Artifact Sandbox", labelZh: "生成式工件沙盒预览器", Component: ArtifactSandbox },
      { id: "diff-table", labelEn: "Diff Table", labelZh: "AI 代码差异比对表", Component: DiffTable },
      { id: "records-table", labelEn: "Records Table", labelZh: "结构化数据记录表", Component: RecordsTable },
      { id: "filter-table", labelEn: "Filter Table", labelZh: "自然语言智能过滤表", Component: FilterTable },
      { id: "selection-actions", labelEn: "Selection Actions", labelZh: "划词高亮浮动操作栏", Component: SelectionActions },
    ],
  },
  {
    categoryEn: "Multimodal & Arena",
    categoryZh: "多模态与模型评测",
    items: [
      { id: "audio-orb", labelEn: "Audio Orb (Voice Agent)", labelZh: "实时语音流体光球与频谱", Component: AudioOrb },
      { id: "model-arena", labelEn: "Model Arena (A/B Eval)", labelZh: "双模型并排盲测竞技场", Component: ModelArena },
      { id: "insight-cards", labelEn: "Insight Cards", labelZh: "AI 指标洞察与趋势图", Component: InsightCards },
      { id: "recommendation-card", labelEn: "Recommendation Card", labelZh: "高置信度智能建议卡", Component: RecommendationCard },
    ],
  },
  {
    categoryEn: "Kumo & System",
    categoryZh: "Kumo 系统级组件",
    items: [
      { id: "sensitive-input", labelEn: "Sensitive Input", labelZh: "API 密钥与凭据脱敏输入", Component: SensitiveInput },
      { id: "layer-card", labelEn: "Layered Resource Card", labelZh: "分层资源折叠卡片", Component: LayerCard },
      { id: "sidebar-nav", labelEn: "Sidebar Nav", labelZh: "会话历史侧边导航", Component: SidebarNav },
      { id: "search", labelEn: "Search Palette", labelZh: "语义搜索与命令面板", Component: SearchList },
      { id: "fine-tune-card", labelEn: "Fine-tune Card", labelZh: "微调参数调节与反馈卡", Component: FineTuneCard },
    ],
  },
];

function ShowcaseContent() {
  const { globalLang, setGlobalLang, componentLangs, setComponentLang, getLang } = useLangContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>("loading-state");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const zh = globalLang === "zh";

  const allComponents = useMemo(() => {
    return CATEGORIES.flatMap((c) => c.items);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return CATEGORIES;
    const q = searchQuery.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.labelEn.toLowerCase().includes(q) ||
          item.labelZh.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (const item of allComponents) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allComponents]);

  const scrollToComponent = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-page text-ink flex">
      {/* ── Left Sticky Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col border-r border-line bg-surface/95 backdrop-blur-md transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-14 items-center justify-between border-b border-line px-4 bg-inset/30">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-control bg-ink text-canvas font-bold text-[11px] shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[13px] font-semibold text-ink leading-none">Native AI UI</h1>
                <span className="rounded-chip border border-line bg-surface px-1 py-0.2 font-mono text-[9px] text-ink-3">
                  v0.2.0
                </span>
              </div>
              <span className="text-[10.5px] text-ink-3 mt-0.5 block">
                {zh ? "34 个交互原语" : "34 Crafted Primitives"}
              </span>
            </div>
          </div>

          {/* Global Language Toggle in Sidebar */}
          <div className="flex items-center rounded-control border border-line/60 bg-field p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => setGlobalLang("en")}
              className={`rounded-chip px-1.5 py-0.2 font-medium transition-colors cursor-pointer ${
                globalLang === "en" ? "bg-surface text-ink shadow-xs" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setGlobalLang("zh")}
              className={`rounded-chip px-1.5 py-0.2 font-medium transition-colors cursor-pointer ${
                globalLang === "zh" ? "bg-surface text-ink shadow-xs" : "text-ink-3 hover:text-ink-2"
              }`}
            >
              中
            </button>
          </div>
        </div>

        {/* Sidebar Search Input */}
        <div className="p-3 border-b border-line bg-inset/20">
          <div className="relative flex items-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-2.5 text-ink-3 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder={zh ? "搜索组件..." : "Search components..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-control border border-line bg-field pl-8 pr-7 py-1.5 text-[11.5px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 flex size-4 items-center justify-center rounded-full text-[10px] text-ink-3 hover:text-ink cursor-pointer"
              >
                ✕
              </button>
            ) : (
              <span className="absolute right-2 font-mono text-[9px] text-ink-3 border border-line/60 rounded px-1 py-0.2 bg-inset select-none">
                /
              </span>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-[12px]">
          {filteredCategories.length === 0 ? (
            <div className="p-4 text-center text-[11.5px] text-ink-3">
              {zh ? `未找到匹配 "${searchQuery}" 的组件` : `No components matching "${searchQuery}"`}
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.categoryEn} className="space-y-1">
                {/* Category Header */}
                <div className="flex items-center justify-between px-2 pt-2.5 pb-1 text-[10.5px] font-semibold tracking-wider text-ink-3 uppercase border-t border-line/40 first:border-t-0 first:pt-0">
                  <span>{zh ? cat.categoryZh : cat.categoryEn}</span>
                  <span className="font-mono text-[9.5px] text-ink-3 tabular-nums opacity-60">
                    {cat.items.length}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-0.5">
                  {cat.items.map((item) => {
                    const isActive = activeSection === item.id;
                    const itemLabel = zh ? item.labelZh : item.labelEn;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToComponent(item.id)}
                        className={`group flex w-full items-center justify-between rounded-control px-2.5 py-1.5 text-left text-[11.5px] transition-all cursor-pointer ${
                          isActive
                            ? "bg-accent-tint/70 text-accent-ink font-medium shadow-xs ring-1 ring-accent/20"
                            : "text-ink-2 hover:bg-hover hover:text-ink"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`size-1.5 rounded-full transition-all shrink-0 ${
                              isActive
                                ? "bg-accent scale-110"
                                : "bg-line-strong group-hover:bg-ink-3"
                            }`}
                          />
                          <span className="truncate">{itemLabel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-line p-3 flex items-center justify-between text-[11px] text-ink-3 bg-inset/40">
          <a
            href="https://github.com/eanzhao-os/native-ai-ui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-ink-2 hover:text-ink transition-colors cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 lg:pl-70 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-8 items-center justify-center rounded-control border border-line bg-field text-ink hover:bg-hover cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-[13px] font-semibold text-ink">Native AI UI</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-control bg-field p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setGlobalLang("en")}
                className={`rounded-chip px-1.5 py-0.2 font-medium ${
                  globalLang === "en" ? "bg-surface text-ink shadow-xs" : "text-ink-3"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setGlobalLang("zh")}
                className={`rounded-chip px-1.5 py-0.2 font-medium ${
                  globalLang === "zh" ? "bg-surface text-ink shadow-xs" : "text-ink-3"
                }`}
              >
                中
              </button>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Showcase Container */}
        <main className="mx-auto w-full max-w-4xl px-6 py-12">
          {/* Header Banner */}
          <div className="mb-14 border-b border-line pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight text-ink">
                    {zh ? "AI-Native 原生组件库" : "AI-Native React Components"}
                  </h1>
                  <span className="rounded-chip bg-accent-tint px-2 py-0.5 font-mono text-[11px] text-accent-ink font-medium">
                    v0.2.0
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-2">
                  {zh
                    ? `${allComponents.length} 个面向智能体交互、Tether C# 运行态与 Kumo UI 风格的现代化 AI 原生组件。`
                    : `${allComponents.length} crafted primitives for AI-native interfaces, Tether C# Harness runtime, and Kumo UI patterns.`}
                </p>
              </div>

              {/* Global Lang Switcher Banner */}
              <div className="hidden lg:flex items-center gap-2 rounded-card border border-line bg-surface p-1.5 shadow-sm">
                <span className="text-[11.5px] text-ink-3 px-1.5">
                  {zh ? "全局语言:" : "Language:"}
                </span>
                <div className="flex rounded-control bg-field p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setGlobalLang("en")}
                    className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                      globalLang === "en" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setGlobalLang("zh")}
                    className={`rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                      globalLang === "zh" ? "bg-surface text-ink shadow-sm" : "text-ink-3 hover:text-ink-2"
                    }`}
                  >
                    中文版本
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Components Stream */}
          <div className="flex flex-col gap-20">
            {allComponents.map(({ id, labelEn, labelZh, Component }) => {
              const currentItemLang = getLang(id);
              const isZh = currentItemLang === "zh";
              const label = isZh ? labelZh : labelEn;

              return (
                <section key={id} id={id} className="scroll-mt-16">
                  {/* Component Header with Local Lang Toggle */}
                  <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-[13.5px] font-semibold text-ink">{label}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Per-Component Language Switcher */}
                      <div className="flex items-center rounded-control border border-line bg-field p-0.5 text-[10.5px]">
                        <button
                          type="button"
                          onClick={() => setComponentLang(id, "en")}
                          className={`rounded-chip px-1.5 py-0.2 font-medium transition-colors cursor-pointer ${
                            currentItemLang === "en"
                              ? "bg-surface text-ink shadow-xs"
                              : "text-ink-3 hover:text-ink-2"
                          }`}
                          title="Switch this component to English"
                        >
                          EN
                        </button>
                        <button
                          type="button"
                          onClick={() => setComponentLang(id, "zh")}
                          className={`rounded-chip px-1.5 py-0.2 font-medium transition-colors cursor-pointer ${
                            currentItemLang === "zh"
                              ? "bg-surface text-ink shadow-xs"
                              : "text-ink-3 hover:text-ink-2"
                          }`}
                          title="切换为中文版本"
                        >
                          中文
                        </button>
                      </div>

                      <code className="hidden sm:inline-block font-mono text-[11px] text-ink-3">
                        components/{id}.tsx
                      </code>
                    </div>
                  </div>

                  {/* Component Canvas */}
                  <div className="flex min-h-40 w-full items-center justify-center rounded-card border border-line bg-canvas p-6 sm:p-8 shadow-sm">
                    <Component lang={currentItemLang} />
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <LangProvider>
      <ShowcaseContent />
    </LangProvider>
  );
}
