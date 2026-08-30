"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Lang } from "@/lib/lang-context";

export type DemoProps = { lang?: Lang; visualCase?: string };
export type Framework = "react" | "vanilla";

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
const SessionList = dynamic<DemoProps>(() => import("@/components/session-list"));
const AuthorizationSurface = dynamic<DemoProps>(() => import("@/components/authorization-surface"));
const SettingsEditor = dynamic<DemoProps>(() => import("@/components/settings-editor"));
const FeedbackActions = dynamic<DemoProps>(() => import("@/components/feedback-actions"));

export type ComponentItem = {
  id: string;
  labelEn: string;
  labelZh: string;
  descEn: string;
  descZh: string;
  Component: ComponentType<DemoProps>;
};

export type CategoryGroup = {
  id: string;
  categoryEn: string;
  categoryZh: string;
  blurbEn: string;
  blurbZh: string;
  items: ComponentItem[];
};

export const CATEGORIES: CategoryGroup[] = [
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
      { id: "code-block", labelEn: "Code Block", labelZh: "代码块与复制", descEn: "Syntax block with copy", descZh: "支持复制的代码块", Component: CodeBlock },
      { id: "feedback-actions", labelEn: "Feedback Actions", labelZh: "消息评价操作组", descEn: "Per-message rating controls", descZh: "逐条消息的评价控件", Component: FeedbackActions },
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
      { id: "session-list", labelEn: "Session List", labelZh: "会话列表与活跃状态", descEn: "Session roster with live badges", descZh: "带实时徽章的会话名册", Component: SessionList },
      { id: "authorization-surface", labelEn: "Authorization Surface", labelZh: "授权与凭据管理面板", descEn: "Provider credentials & sign-in flows", descZh: "服务方凭据与登录流程", Component: AuthorizationSurface },
      { id: "settings-editor", labelEn: "Settings Editor", labelZh: "乐观并发配置编辑器", descEn: "Revisioned namespace editing with CAS", descZh: "基于 revision CAS 的命名空间编辑", Component: SettingsEditor },
      { id: "fine-tune-card", labelEn: "Fine-tune Card", labelZh: "微调参数调节与反馈卡", descEn: "Parameter tuning & feedback", descZh: "参数微调与反馈", Component: FineTuneCard },
    ],
  },
];

export const ALL_COMPONENTS = CATEGORIES.flatMap((category) => category.items);

export type VanillaComponentConfig = {
  tag: string;
  defaultAttrs?: Record<string, string>;
  centerFullWidth?: boolean;
  alignStart?: boolean;
};

const VANILLA_DEFAULT_ATTRIBUTES: Record<string, Record<string, string>> = {
  "loading-state": { variant: "Drive" },
  thinking: { variant: "Steps" },
  "prompt-bar": { variant: "Rounded" },
};

const FULL_WIDTH_VANILLA_COMPONENTS = new Set([
  "session-list",
  "authorization-surface",
  "settings-editor",
  "feedback-actions",
]);

export const COMPONENT_BY_ID = new Map(
  ALL_COMPONENTS.map((item) => [item.id, item] as const),
);

export const COMPONENT_TAGS: Record<string, VanillaComponentConfig> =
  Object.fromEntries(
    ALL_COMPONENTS.map(({ id }) => [
      id,
      {
        tag: `nai-${id}`,
        defaultAttrs: VANILLA_DEFAULT_ATTRIBUTES[id],
        centerFullWidth: FULL_WIDTH_VANILLA_COMPONENTS.has(id),
        alignStart: id === "settings-editor",
      },
    ]),
  );
