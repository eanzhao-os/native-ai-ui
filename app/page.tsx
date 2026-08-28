"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import ThemeToggle from "./theme-toggle";
import DemoViewport from "./demo-viewport";
import { useSectionSpy } from "./use-section-spy";
import {
  LangProvider,
  useLangContext,
  type Lang,
} from "@/lib/lang-context";
import VanillaDemoWrapper from "./vanilla-demo-wrapper";

type DemoProps = { lang?: Lang };
type Framework = "react" | "vanilla";

// 1. Core & Composer
const LoadingState = dynamic<DemoProps>(() => import("@/components/loading-state"));
const ThinkingState = dynamic<DemoProps>(() => import("@/components/thinking"));
const StreamingText = dynamic<DemoProps>(() => import("@/components/streaming-text"));
const PromptBar = dynamic<DemoProps>(() => import("@/components/prompt-bar"));
const ChatComposer = dynamic<DemoProps>(() => import("@/components/chat"));
const CodeBlock = dynamic<DemoProps>(() => import("@/components/code-block"));
const AttachmentQueue = dynamic<DemoProps>(() => import("@/components/attachment-queue"));

// 2. Agentic & Multi-Agent
const SubagentTree = dynamic<DemoProps>(() => import("@/components/subagent-tree"));
const AgentTeams = dynamic<DemoProps>(() => import("@/components/agent-teams"));
const TaskRows = dynamic<DemoProps>(() => import("@/components/task-rows"));
const ToolChips = dynamic<DemoProps>(() => import("@/components/tool-chips"));
const ApprovalCard = dynamic<DemoProps>(() => import("@/components/approval-card"));
const ClarificationCard = dynamic<DemoProps>(() => import("@/components/clarification-card"));
const MessageBranches = dynamic<DemoProps>(() => import("@/components/message-branches"));

// 3. Context & Tokenomics
const ContextWindow = dynamic<DemoProps>(() => import("@/components/context-window"));
const MemoryInspector = dynamic<DemoProps>(() => import("@/components/memory-inspector"));
const ContextCards = dynamic<DemoProps>(() => import("@/components/context-cards"));
const ContextSpillover = dynamic<DemoProps>(() => import("@/components/context-spillover"));

// 4. Agent Runtime
const TurnLifecycle = dynamic<DemoProps>(() => import("@/components/turn-lifecycle"));
const AgentInbox = dynamic<DemoProps>(() => import("@/components/agent-inbox"));
const HookPipeline = dynamic<DemoProps>(() => import("@/components/hook-pipeline"));
const SessionTelemetry = dynamic<DemoProps>(() => import("@/components/session-telemetry"));
const WorkflowRun = dynamic<DemoProps>(() => import("@/components/workflow-run"));
const CheckpointTimeline = dynamic<DemoProps>(() => import("@/components/checkpoint-timeline"));

// 5. Cordis & Infrastructure
const CordisPluginTree = dynamic<DemoProps>(() => import("@/components/cordis-plugin-tree"));
const PermissionPresetCard = dynamic<DemoProps>(() => import("@/components/permission-preset-card"));
const LspDiagnostics = dynamic<DemoProps>(() => import("@/components/lsp-diagnostics"));
const SandboxManager = dynamic<DemoProps>(() => import("@/components/sandbox-manager"));
const JobScheduler = dynamic<DemoProps>(() => import("@/components/job-scheduler"));
const McpServers = dynamic<DemoProps>(() => import("@/components/mcp-servers"));

// 6. Artifacts & Data
const ArtifactSandbox = dynamic<DemoProps>(() => import("@/components/artifact-sandbox"));
const DiffTable = dynamic<DemoProps>(() => import("@/components/diff-table"));
const RecordsTable = dynamic<DemoProps>(() => import("@/components/records-table"));
const FilterTable = dynamic<DemoProps>(() => import("@/components/filter-table"));
const SelectionActions = dynamic<DemoProps>(() => import("@/components/selection-actions"));

// 7. Multimodal & Arena
const AudioOrb = dynamic<DemoProps>(() => import("@/components/audio-orb"));
const ModelArena = dynamic<DemoProps>(() => import("@/components/model-arena"));
const InsightCards = dynamic<DemoProps>(() => import("@/components/insight-cards"));
const RecommendationCard = dynamic<DemoProps>(() => import("@/components/recommendation-card"));

// 8. Kumo & System Primitives
const SensitiveInput = dynamic<DemoProps>(() => import("@/components/sensitive-input"));
const LayerCard = dynamic<DemoProps>(() => import("@/components/layer-card"));
const SidebarNav = dynamic<DemoProps>(() => import("@/components/sidebar-nav"));
const SearchList = dynamic<DemoProps>(() => import("@/components/search"));
const FineTuneCard = dynamic<DemoProps>(() => import("@/components/fine-tune-card"));

type ComponentItem = {
  id: string;
  labelEn: string;
  labelZh: string;
  descEn: string;
  descZh: string;
  Component: ComponentType<DemoProps>;
};

type CategoryGroup = {
  id: string;
  categoryEn: string;
  categoryZh: string;
  blurbEn: string;
  blurbZh: string;
  items: ComponentItem[];
};

const CATEGORIES: CategoryGroup[] = [
  {
    id: "core",
    categoryEn: "Core & Streaming",
    categoryZh: "核心与流式生成",
    blurbEn: "Loading, reasoning, and token-by-token output primitives.",
    blurbZh: "加载、推理与逐 token 输出的基础原语。",
    items: [
      { id: "loading-state", labelEn: "Loading State", labelZh: "像素加载进度条", descEn: "Pixel-grid loader with elapsed timer", descZh: "像素网格加载器与计时", Component: LoadingState },
      { id: "thinking", labelEn: "Thinking Traces", labelZh: "深度思考与推理追踪", descEn: "Expandable agent reasoning trace", descZh: "可展开的推理过程追踪", Component: ThinkingState },
      { id: "streaming-text", labelEn: "Streaming Text", labelZh: "逐字流式文本与引用", descEn: "Word-by-word reveal with citations", descZh: "逐词显现并附引用", Component: StreamingText },
      { id: "prompt-bar", labelEn: "Prompt Bar", labelZh: "多模态输入栏", descEn: "Composer with shader sweep on send", descZh: "发送时带光谱扫过的输入栏", Component: PromptBar },
      { id: "chat", labelEn: "Chat Composer", labelZh: "对话消息与气泡输入", descEn: "Interactive chat panel with replies", descZh: "可交互的对话面板", Component: ChatComposer },
      { id: "code-block", labelEn: "Code Block", labelZh: "代码块与一键运行", descEn: "Syntax block with copy & run", descZh: "支持复制与运行的代码块", Component: CodeBlock },
      { id: "attachment-queue", labelEn: "Attachment Queue", labelZh: "附件摄取队列", descEn: "Upload, parse, and index file states", descZh: "上传、解析与索引文件状态", Component: AttachmentQueue },
    ],
  },
  {
    id: "agentic",
    categoryEn: "Agentic & Teams",
    categoryZh: "智能体与团队协同",
    blurbEn: "Delegation, tool calls, and human-in-the-loop control.",
    blurbZh: "任务分派、工具调用与人机协同控制。",
    items: [
      { id: "subagent-tree", labelEn: "Subagent Delegation Tree", labelZh: "多 Agent 任务调度树", descEn: "Parallel workers with live traces", descZh: "并行子代理与实时日志", Component: SubagentTree },
      { id: "agent-teams", labelEn: "Agent Teams", labelZh: "智能体团队名册与任务 DAG", descEn: "Durable roster & shared task DAG", descZh: "持久名册与共享任务 DAG", Component: AgentTeams },
      { id: "task-rows", labelEn: "Task Rows", labelZh: "多步骤任务执行进度行", descEn: "Multi-step plan execution rows", descZh: "多步骤计划执行行", Component: TaskRows },
      { id: "tool-chips", labelEn: "Tool Chips", labelZh: "工具调用状态胶囊徽章", descEn: "Tool-call status capsules", descZh: "工具调用状态胶囊", Component: ToolChips },
      { id: "approval-card", labelEn: "Approval Card", labelZh: "人机协同权限审批卡", descEn: "Human-in-the-loop action gate", descZh: "人在环路的操作审批", Component: ApprovalCard },
      { id: "clarification-card", labelEn: "Clarification Card", labelZh: "主动决策澄清卡片", descEn: "Agent asks before acting", descZh: "行动前主动澄清", Component: ClarificationCard },
      { id: "message-branches", labelEn: "Message Branches", labelZh: "回答分支导航", descEn: "Compare regenerated answer branches", descZh: "比较重新生成的回答分支", Component: MessageBranches },
    ],
  },
  {
    id: "context",
    categoryEn: "Context & Memory",
    categoryZh: "上下文与记忆计量",
    blurbEn: "Tokenomics, retrieval, and long-term agent memory.",
    blurbZh: "Token 计量、检索增强与长期记忆。",
    items: [
      { id: "context-window", labelEn: "Context Window", labelZh: "上下文用量与成本计量", descEn: "Segmented token budget gauge", descZh: "分段式 token 预算仪表", Component: ContextWindow },
      { id: "memory-inspector", labelEn: "Memory Inspector", labelZh: "长期记忆与实体认知看板", descEn: "Entity memory browser", descZh: "实体记忆浏览看板", Component: MemoryInspector },
      { id: "context-cards", labelEn: "Context Cards", labelZh: "RAG 检索知识卡片", descEn: "Retrieved knowledge cards", descZh: "检索命中的知识卡片", Component: ContextCards },
      { id: "context-spillover", labelEn: "Context Spillover", labelZh: "上下文压缩与磁盘溢出", descEn: "Compaction & disk spill states", descZh: "压缩与磁盘溢出状态", Component: ContextSpillover },
    ],
  },
  {
    id: "runtime",
    categoryEn: "Agent Runtime",
    categoryZh: "Agent 运行时",
    blurbEn: "The agent loop under the hood — turns, inbox, hooks, telemetry, workflows.",
    blurbZh: "表象之下的 agent 循环 —— 轮次、收件箱、钩子、遥测与工作流。",
    items: [
      { id: "turn-lifecycle", labelEn: "Turn Lifecycle", labelZh: "Turn 括号事件流", descEn: "turn/step bracket event timeline", descZh: "轮次/步骤括号事件时间线", Component: TurnLifecycle },
      { id: "agent-inbox", labelEn: "Agent Inbox", labelZh: "双队列收件箱", descEn: "Dual-queue delivery semantics", descZh: "双队列投递语义演示", Component: AgentInbox },
      { id: "hook-pipeline", labelEn: "Hook Pipeline", labelZh: "Hook 决策管线", descEn: "Most-restrictive decision merge", descZh: "最严优先的决策合并", Component: HookPipeline },
      { id: "session-telemetry", labelEn: "Session Telemetry", labelZh: "会话遥测投影", descEn: "Live session stats fold", descZh: "实时会话统计折叠", Component: SessionTelemetry },
      { id: "workflow-run", labelEn: "Workflow Run", labelZh: "工作流扇出执行", descEn: "Fan-out with concurrency slots", descZh: "带并发槽位的扇出执行", Component: WorkflowRun },
      { id: "checkpoint-timeline", labelEn: "Checkpoint Timeline", labelZh: "执行检查点时间线", descEn: "Inspect and restore execution state", descZh: "检查并恢复执行状态", Component: CheckpointTimeline },
    ],
  },
  {
    id: "infra",
    categoryEn: "Cordis & Infrastructure",
    categoryZh: "Cordis 与基础设施",
    blurbEn: "Runtime widgets for a Cordis-based C# agent harness.",
    blurbZh: "面向 Cordis 架构 C# Agent Harness 的运行态组件。",
    items: [
      { id: "cordis-plugin-tree", labelEn: "Cordis Plugin Tree", labelZh: "Cordis 插件与服务拓扑", descEn: "Plugin/service topology with HMR", descZh: "插件服务拓扑与热重载", Component: CordisPluginTree },
      { id: "permission-preset-card", labelEn: "Permission Presets", labelZh: "权限预设与审计重放", descEn: "Exactly-once permission auditing", descZh: "精确一次的权限审计", Component: PermissionPresetCard },
      { id: "lsp-diagnostics", labelEn: "LSP Diagnostics", labelZh: "Roslyn LSP 实时诊断修复", descEn: "Live Roslyn diagnostics & fixes", descZh: "实时 Roslyn 诊断与修复", Component: LspDiagnostics },
      { id: "sandbox-manager", labelEn: "Sandbox Manager", labelZh: "E2B 容器沙盒与进程树", descEn: "Container sandboxes & process tree", descZh: "容器沙盒与进程树", Component: SandboxManager },
      { id: "job-scheduler", labelEn: "Job Scheduler", labelZh: "Durable 持久化 Cron 调度", descEn: "Durable cron monitor", descZh: "持久化 Cron 监控", Component: JobScheduler },
      { id: "mcp-servers", labelEn: "MCP Servers", labelZh: "MCP 服务器面板", descEn: "Model Context Protocol inventory", descZh: "MCP 服务器与工具清单", Component: McpServers },
    ],
  },
  {
    id: "artifacts",
    categoryEn: "Artifacts & Views",
    categoryZh: "工件制品与数据视图",
    blurbEn: "Generated artifacts, diffs, and structured data.",
    blurbZh: "生成工件、差异比对与结构化数据。",
    items: [
      { id: "artifact-sandbox", labelEn: "Artifact Sandbox", labelZh: "生成式工件沙盒预览器", descEn: "Live preview of generated artifacts", descZh: "生成工件的实时预览", Component: ArtifactSandbox },
      { id: "diff-table", labelEn: "Diff Table", labelZh: "AI 代码差异比对表", descEn: "AI edit diff review", descZh: "AI 编辑差异审阅", Component: DiffTable },
      { id: "records-table", labelEn: "Records Table", labelZh: "结构化数据记录表", descEn: "Dense structured records grid", descZh: "高密度结构化记录表", Component: RecordsTable },
      { id: "filter-table", labelEn: "Filter Table", labelZh: "自然语言智能过滤表", descEn: "Natural-language row filtering", descZh: "自然语言行过滤", Component: FilterTable },
      { id: "selection-actions", labelEn: "Selection Actions", labelZh: "划词高亮浮动操作栏", descEn: "Floating toolbar on text select", descZh: "划词浮动操作栏", Component: SelectionActions },
    ],
  },
  {
    id: "multimodal",
    categoryEn: "Multimodal & Arena",
    categoryZh: "多模态与模型评测",
    blurbEn: "Voice, evaluation, and recommendation surfaces.",
    blurbZh: "语音、评测与智能推荐界面。",
    items: [
      { id: "audio-orb", labelEn: "Audio Orb", labelZh: "实时语音流体光球与频谱", descEn: "Voice agent orb & waveform", descZh: "语音光球与波形频谱", Component: AudioOrb },
      { id: "model-arena", labelEn: "Model Arena", labelZh: "双模型并排盲测竞技场", descEn: "Side-by-side blind A/B eval", descZh: "双模型并排盲测", Component: ModelArena },
      { id: "insight-cards", labelEn: "Insight Cards", labelZh: "AI 指标洞察与趋势图", descEn: "Metric insights with trends", descZh: "指标洞察与趋势图", Component: InsightCards },
      { id: "recommendation-card", labelEn: "Recommendation Card", labelZh: "高置信度智能建议卡", descEn: "High-confidence suggestions", descZh: "高置信度建议", Component: RecommendationCard },
    ],
  },
  {
    id: "system",
    categoryEn: "Kumo & System",
    categoryZh: "Kumo 系统级组件",
    blurbEn: "Credential masking, navigation, and system primitives.",
    blurbZh: "凭据脱敏、导航与系统级原语。",
    items: [
      { id: "sensitive-input", labelEn: "Sensitive Input", labelZh: "API 密钥与凭据脱敏输入", descEn: "Credential masking field", descZh: "凭据脱敏输入框", Component: SensitiveInput },
      { id: "layer-card", labelEn: "Layered Resource Card", labelZh: "分层资源折叠卡片", descEn: "Stacked collapsible resources", descZh: "分层折叠资源卡", Component: LayerCard },
      { id: "sidebar-nav", labelEn: "Sidebar Nav", labelZh: "会话历史侧边导航", descEn: "Session history navigation", descZh: "会话历史导航", Component: SidebarNav },
      { id: "search", labelEn: "Search Palette", labelZh: "语义搜索与命令面板", descEn: "Semantic command palette", descZh: "语义命令面板", Component: SearchList },
      { id: "fine-tune-card", labelEn: "Fine-tune Card", labelZh: "微调参数调节与反馈卡", descEn: "Parameter tuning & feedback", descZh: "参数微调与反馈", Component: FineTuneCard },
    ],
  },
];

const ALL_COMPONENTS = CATEGORIES.flatMap((category) => category.items);
const REGISTRY_BASE = "https://eanzhao-os.github.io/native-ai-ui/r";

function CopyButton({ text, zh, className = "", title }: { text: string; zh: boolean; className?: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  const defaultTitle = zh ? "复制安装命令" : "Copy install command";
  return (
    <button
      type="button"
      onClick={copy}
      title={title || defaultTitle}
      className={`flex size-6 items-center justify-center rounded-chip border border-line/70 bg-surface text-ink-3 transition-all hover:border-line-strong hover:text-ink cursor-pointer ${className}`}
    >
      {copied ? (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function ShowcaseContent() {
  const { globalLang, setGlobalLang, setComponentLang, getLang } = useLangContext();
  const [globalFramework, setGlobalFramework] = useState<Framework>("react");
  const [componentFrameworks, setComponentFrameworks] = useState<Record<string, Framework>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const zh = globalLang === "zh";
  const totalCount = ALL_COMPONENTS.length;

  const getFramework = (id: string): Framework => componentFrameworks[id] ?? globalFramework;
  const setComponentFramework = (id: string, fw: Framework) => {
    setComponentFrameworks((prev) => ({ ...prev, [id]: fw }));
  };

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

  const visibleIds = useMemo(
    () => filteredCategories.flatMap((category) => category.items.map((item) => item.id)),
    [filteredCategories],
  );
  const activeSection = useSectionSpy(
    visibleIds,
    visibleIds[0] ?? ALL_COMPONENTS[0].id,
  );

  // "/" focuses the sidebar search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToComponent = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }, []);

  const searching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-page text-ink flex">
      {/* ── Left Sticky Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-70 flex-col border-r border-line bg-surface/95 backdrop-blur-md transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand & Language Header */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 cursor-pointer min-w-0"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-control bg-ink text-canvas shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-[13px] font-semibold text-ink leading-none tracking-tight">Native AI UI</h1>
                <span className="rounded-chip border border-line bg-inset px-1 py-px font-mono text-[9px] text-ink-3">
                  v0.3.0
                </span>
              </div>
              <span className="text-[10.5px] text-ink-3 mt-0.5 block truncate">
                {zh ? `${totalCount} 个 AI 原生组件` : `${totalCount} AI-native primitives`}
              </span>
            </div>
          </a>

          {/* Global Language Toggle */}
          <div className="flex items-center rounded-control border border-line/60 bg-field p-0.5 text-[10px] shrink-0">
            {(["en", "zh"] as const).map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={globalLang === l}
                onClick={() => setGlobalLang(l)}
                className={`rounded-chip px-1.5 py-0.5 font-medium transition-colors cursor-pointer ${
                  globalLang === l ? "bg-surface text-ink shadow-xs" : "text-ink-3 hover:text-ink-2"
                }`}
              >
                {l === "en" ? "EN" : "中"}
              </button>
            ))}
          </div>
        </div>

        {/* Framework Selector Bar */}
        <div className="border-b border-line px-3 py-2 bg-inset/30">
          <div className="grid grid-cols-2 gap-1 rounded-control border border-line/70 bg-field p-0.5 text-[11px]">
            <button
              type="button"
              aria-pressed={globalFramework === "react"}
              onClick={() => setGlobalFramework("react")}
              className={`rounded-chip py-1 text-center font-medium transition-all cursor-pointer ${
                globalFramework === "react"
                  ? "bg-surface text-ink shadow-xs font-semibold"
                  : "text-ink-3 hover:text-ink-2"
              }`}
            >
              React (.tsx)
            </button>
            <button
              type="button"
              aria-pressed={globalFramework === "vanilla"}
              onClick={() => setGlobalFramework("vanilla")}
              className={`rounded-chip py-1 text-center font-medium transition-all cursor-pointer ${
                globalFramework === "vanilla"
                  ? "bg-surface text-ink shadow-xs font-semibold"
                  : "text-ink-3 hover:text-ink-2"
              }`}
            >
              Vanilla (ESM)
            </button>
          </div>
        </div>

        {/* Sidebar Search */}
        <div className="p-3 border-b border-line">
          <div className="relative flex items-center">
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-2.5 text-ink-3 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              aria-label={zh ? "搜索组件" : "Search components"}
              placeholder={zh ? "搜索组件..." : "Search components..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-control border border-line bg-field pl-8 pr-7 py-1.5 text-[11.5px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label={zh ? "清除搜索" : "Clear search"}
                onClick={() => setSearchQuery("")}
                className="absolute right-2 flex size-4 items-center justify-center rounded-full text-[10px] text-ink-3 hover:text-ink cursor-pointer"
              >
                ✕
              </button>
            ) : (
              <kbd className="absolute right-2 font-mono text-[9px] text-ink-3 border border-line/60 rounded px-1 py-px bg-inset select-none">
                /
              </kbd>
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
              <div key={cat.id} className="space-y-1">
                <button
                  type="button"
                  onClick={() => scrollToComponent(`cat-${cat.id}`)}
                  className="flex w-full items-center justify-between px-2 pt-2.5 pb-1 text-[10.5px] font-semibold tracking-wider text-ink-3 uppercase border-t border-line/40 first:border-t-0 first:pt-0 hover:text-ink-2 transition-colors cursor-pointer"
                >
                  <span>{zh ? cat.categoryZh : cat.categoryEn}</span>
                  <span className="font-mono text-[9.5px] tabular-nums opacity-60">{cat.items.length}</span>
                </button>
                <div className="flex flex-col gap-0.5">
                  {cat.items.map((item) => {
                    const isActive = activeSection === item.id;
                    const itemLabel = zh ? item.labelZh : item.labelEn;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-current={isActive ? "location" : undefined}
                        onClick={() => scrollToComponent(item.id)}
                        className={`group flex w-full items-center gap-2 rounded-control px-2.5 py-1.5 text-left text-[11.5px] transition-all cursor-pointer ${
                          isActive
                            ? "bg-accent-tint/70 text-accent-ink font-medium shadow-xs ring-1 ring-accent/20"
                            : "text-ink-2 hover:bg-hover hover:text-ink"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full transition-all shrink-0 ${
                            isActive ? "bg-accent scale-110" : "bg-line-strong group-hover:bg-ink-3"
                          }`}
                        />
                        <span className="truncate">{itemLabel}</span>
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
      <div id="top" className="flex-1 lg:pl-70 flex flex-col min-w-0">
        {/* Mobile Top Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface/90 px-4 backdrop-blur-md lg:hidden">
          <button
            type="button"
            aria-label={zh ? "打开组件导航" : "Open component navigation"}
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-8 items-center justify-center rounded-control border border-line bg-field text-ink hover:bg-hover cursor-pointer"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-[13px] font-semibold text-ink tracking-tight">Native AI UI</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-control bg-field p-0.5 text-[10px]">
              <button
                type="button"
                aria-pressed={globalFramework === "react"}
                onClick={() => setGlobalFramework("react")}
                className={`rounded-chip px-1.5 py-0.5 font-medium cursor-pointer ${
                  globalFramework === "react" ? "bg-surface text-ink shadow-xs" : "text-ink-3"
                }`}
              >
                React
              </button>
              <button
                type="button"
                aria-pressed={globalFramework === "vanilla"}
                onClick={() => setGlobalFramework("vanilla")}
                className={`rounded-chip px-1.5 py-0.5 font-medium cursor-pointer ${
                  globalFramework === "vanilla" ? "bg-surface text-ink shadow-xs" : "text-ink-3"
                }`}
              >
                Vanilla
              </button>
            </div>
            <div className="flex items-center rounded-control bg-field p-0.5 text-[10px]">
              {(["en", "zh"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={globalLang === l}
                  onClick={() => setGlobalLang(l)}
                  className={`rounded-chip px-1.5 py-0.5 font-medium cursor-pointer ${
                    globalLang === l ? "bg-surface text-ink shadow-xs" : "text-ink-3"
                  }`}
                >
                  {l === "en" ? "EN" : "中"}
                </button>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Showcase Container */}
        <main className="mx-auto w-full max-w-4xl px-6 pb-24">
          {/* ── Hero ── */}
          <div className="relative -mx-6 overflow-hidden border-b border-line px-6 pb-12 pt-14">
            {/* dot grid backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                maskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black 30%, transparent 75%)",
              }}
            />
            {/* accent glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }}
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 shadow-xs">
                  <span className="size-1.5 rounded-full bg-green" />
                  v0.3.0
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 shadow-xs">
                  MIT
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 shadow-xs">
                  EN / 中文
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 shadow-xs">
                  React 19 &amp; Web Components
                </span>
              </div>

              <h1 className="mt-5 max-w-xl text-[34px] font-semibold leading-[1.12] tracking-tight text-ink sm:text-[40px]">
                {zh ? (
                  <>为 AI 原生界面打造的 <span className="text-accent-ink">44 款交互原语</span></>
                ) : (
                  <>Crafted primitives for <span className="text-accent-ink">AI-native</span> interfaces</>
                )}
              </h1>
              <p className="mt-3.5 max-w-lg text-[14px] leading-relaxed text-ink-2">
                {zh
                  ? `${totalCount} 个自包含、自演示的组件：流式生成、思考追踪、审批流、多智能体、Token 计量，以及 Agent 运行时与 Kumo 风格系统原语。支持 React (shadcn CLI) 与零依赖 Vanilla Web Components 两种形态。`
                  : `${totalCount} self-contained, self-animating primitives — streaming, thinking traces, approvals, agent teams, tokenomics, runtime widgets, and Kumo-style system cards. Available as React (shadcn CLI) and zero-dependency Vanilla Web Components.`}
              </p>

              {/* Integrated Install & Framework Switcher Box */}
              <div className="mt-6 max-w-xl rounded-control border border-line bg-tooltip-bg shadow-card overflow-hidden">
                {/* Tab header */}
                <div className="flex items-center justify-between border-b border-tooltip-border/80 bg-black/20 px-3 py-1.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-pressed={globalFramework === "react"}
                      onClick={() => setGlobalFramework("react")}
                      className={`rounded-chip px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                        globalFramework === "react"
                          ? "bg-surface text-ink shadow-xs font-semibold"
                          : "text-tooltip-muted hover:text-tooltip-fg"
                      }`}
                    >
                      React (.tsx)
                    </button>
                    <button
                      type="button"
                      aria-pressed={globalFramework === "vanilla"}
                      onClick={() => setGlobalFramework("vanilla")}
                      className={`rounded-chip px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                        globalFramework === "vanilla"
                          ? "bg-surface text-ink shadow-xs font-semibold"
                          : "text-tooltip-muted hover:text-tooltip-fg"
                      }`}
                    >
                      Vanilla (ESM)
                    </button>
                  </div>
                  <CopyButton
                    zh={zh}
                    text={
                      globalFramework === "react"
                        ? `npx shadcn@latest add ${REGISTRY_BASE}/chat.json`
                        : `<script type="module" src="https://eanzhao-os.github.io/native-ai-ui/vanilla/index.js"></script>`
                    }
                    className="!border-tooltip-border !bg-transparent !text-tooltip-muted hover:!text-tooltip-fg shrink-0"
                  />
                </div>

                {/* Code body */}
                <div className="flex items-center px-3.5 py-2.5 font-mono text-[12px] text-tooltip-fg min-h-[42px] overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {globalFramework === "react" ? (
                    <div className="flex items-center gap-2">
                      <span className="text-tooltip-muted select-none">$</span>
                      <code>npx shadcn@latest add {REGISTRY_BASE}/chat.json</code>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-tooltip-muted select-none">&lt;&gt;</span>
                      <code>&lt;script type="module" src="https://eanzhao-os.github.io/native-ai-ui/vanilla/index.js"&gt;&lt;/script&gt;</code>
                    </div>
                  )}
                </div>
              </div>

              {/* Action row */}
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://github.com/eanzhao-os/native-ai-ui"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-control border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <span className="text-[11px] text-ink-3">
                  {zh ? "支持 shadcn CLI 与 CDN 原生引入" : "Supports shadcn CLI & direct CDN imports"}
                </span>
              </div>

              {/* Stats row */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line/70 pt-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {[
                  { n: String(totalCount), en: "primitives", zh: "个组件" },
                  { n: String(CATEGORIES.length), en: "categories", zh: "个分类" },
                  { n: "2", en: "framework targets", zh: "种框架形态" },
                  { n: "2", en: "languages", zh: "种语言" },
                ].map((s) => (
                  <div key={s.en} className="flex items-baseline gap-1.5">
                    <span className="font-mono text-[20px] font-semibold tabular-nums text-ink">{s.n}</span>
                    <span className="text-[11.5px] text-ink-3">{zh ? s.zh : s.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Category streams ── */}
          <div className="flex flex-col gap-16 pt-12">
            {(searching ? filteredCategories : CATEGORIES).map((cat) => (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
                {/* Category header */}
                <div className="mb-6 flex items-baseline justify-between gap-3 border-b border-line pb-3">
                  <div>
                    <h2 className="text-[15px] font-semibold tracking-tight text-ink">
                      {zh ? cat.categoryZh : cat.categoryEn}
                    </h2>
                    <p className="mt-0.5 text-[12px] text-ink-3">{zh ? cat.blurbZh : cat.blurbEn}</p>
                  </div>
                  <span className="shrink-0 rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-ink-3">
                    {cat.items.length}
                  </span>
                </div>

                <div className="flex flex-col gap-12">
                  {cat.items.map(({ id, labelEn, labelZh, descEn, descZh, Component }) => {
                    const currentItemLang = getLang(id);
                    const currentFramework = getFramework(id);
                    const isZh = currentItemLang === "zh";
                    const label = isZh ? labelZh : labelEn;
                    const desc = isZh ? descZh : descEn;
                    const isReact = currentFramework === "react";
                    const installCmd = isReact
                      ? `npx shadcn@latest add ${REGISTRY_BASE}/${id}.json`
                      : `<nai-${id}></nai-${id}>`;

                    return (
                      <section key={id} id={id} className="scroll-mt-20">
                        {/* Component header */}
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                          <div className="flex min-w-0 items-baseline gap-2.5">
                            <h3 className="text-[13.5px] font-semibold text-ink">{label}</h3>
                            <span className="hidden text-[11.5px] text-ink-3 sm:inline">{desc}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Per-component Framework switcher */}
                            <div className="flex items-center rounded-control border border-line bg-field p-0.5 text-[11px]">
                              <button
                                type="button"
                                aria-pressed={currentFramework === "react"}
                                onClick={() => setComponentFramework(id, "react")}
                                className={`rounded-chip px-2 py-0.5 font-medium transition-all cursor-pointer ${
                                  currentFramework === "react"
                                    ? "bg-surface text-ink shadow-xs font-semibold"
                                    : "text-ink-3 hover:text-ink-2"
                                }`}
                              >
                                React
                              </button>
                              <button
                                type="button"
                                aria-pressed={currentFramework === "vanilla"}
                                onClick={() => setComponentFramework(id, "vanilla")}
                                className={`rounded-chip px-2 py-0.5 font-medium transition-all cursor-pointer ${
                                  currentFramework === "vanilla"
                                    ? "bg-surface text-ink shadow-xs font-semibold"
                                    : "text-ink-3 hover:text-ink-2"
                                }`}
                              >
                                Vanilla
                              </button>
                            </div>

                            {/* Per-component language switcher */}
                            <div className="flex items-center rounded-control border border-line bg-field p-0.5 text-[11px]">
                              {(["en", "zh"] as const).map((l) => (
                                <button
                                  key={l}
                                  type="button"
                                  aria-pressed={currentItemLang === l}
                                  onClick={() => setComponentLang(id, l)}
                                  className={`rounded-chip px-2 py-0.5 font-medium transition-all cursor-pointer ${
                                    currentItemLang === l
                                      ? "bg-surface text-ink shadow-xs font-semibold"
                                      : "text-ink-3 hover:text-ink-2"
                                  }`}
                                >
                                  {l === "en" ? "EN" : "中文"}
                                </button>
                              ))}
                            </div>

                            <CopyButton
                              zh={isZh}
                              text={installCmd}
                              title={
                                isZh
                                  ? isReact
                                    ? `复制安装命令 (shadcn)`
                                    : `复制引用代码 (<nai-${id}>)`
                                  : isReact
                                  ? `Copy shadcn command`
                                  : `Copy tag (<nai-${id}>)`
                              }
                            />
                          </div>
                        </div>

                        {/* Component canvas — dot grid stage */}
                        <div
                          className="relative flex min-h-44 w-full items-center justify-center overflow-hidden rounded-card border border-line bg-canvas p-6 shadow-card sm:p-10"
                          style={{
                            backgroundImage: "radial-gradient(var(--line) 1.1px, transparent 1.1px)",
                            backgroundSize: "18px 18px",
                          }}
                        >
                          <DemoViewport>
                            {isReact ? (
                              <Component lang={currentItemLang} />
                            ) : (
                              <VanillaDemoWrapper id={id} lang={currentItemLang} />
                            )}
                          </DemoViewport>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <footer className="mt-24 border-t border-line pt-8 pb-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-sm">
                <div className="flex items-center gap-2">
                  <div className="flex size-5 items-center justify-center rounded-chip bg-ink text-canvas">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-semibold text-ink">Native AI UI</span>
                </div>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-ink-3">
                  {zh
                    ? "每个组件都是自包含的 .tsx 文件，自带演示动画。设计语言与 tokens 对齐 Kumo UI；运行态组件面向 C# Agent Harness。"
                    : "Every component is a self-contained .tsx that runs its own demo loop. Design tokens align with Kumo UI; runtime widgets target C# agent harnesses."}
                </p>
              </div>
              <div className="flex gap-10 text-[11.5px]">
                <div className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
                    {zh ? "资源" : "Resources"}
                  </span>
                  <a href="https://github.com/eanzhao-os/native-ai-ui" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">GitHub</a>
                  <a href="https://github.com/koishijs/cordis" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">Cordis</a>
                  <a href="https://kumo-ui.com" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">Kumo UI</a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
                    {zh ? "开始" : "Get started"}
                  </span>
                  <a href="https://github.com/eanzhao-os/native-ai-ui#copying-by-hand" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">
                    {zh ? "手动复制" : "Copy by hand"}
                  </a>
                  <a href="https://github.com/eanzhao-os/native-ai-ui#the-registry" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">Registry</a>
                  <a href="https://github.com/eanzhao-os/native-ai-ui/blob/main/LICENSE" target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink transition-colors">MIT License</a>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-line/60 pt-4 text-[10.5px] text-ink-3">
              <span>© 2026 Native AI UI · MIT</span>
              <span className="font-mono">{zh ? "3 个可选依赖：glimm、liveline、iconoir-react" : "3 optional deps: glimm, liveline, iconoir-react"}</span>
            </div>
          </footer>
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
