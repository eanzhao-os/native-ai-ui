import ThemeToggle from "./theme-toggle";
import LoadingState from "@/components/loading-state";
import ThinkingState from "@/components/thinking";
import StreamingText from "@/components/streaming-text";
import ApprovalCard from "@/components/approval-card";
import ToolChips from "@/components/tool-chips";
import TaskRows from "@/components/task-rows";
import ChatComposer from "@/components/chat";
import PromptBar from "@/components/prompt-bar";
import RecommendationCard from "@/components/recommendation-card";
import ContextCards from "@/components/context-cards";
import DiffTable from "@/components/diff-table";
import RecordsTable from "@/components/records-table";
import FilterTable from "@/components/filter-table";
import SidebarNav from "@/components/sidebar-nav";
import SearchList from "@/components/search";
import InsightCards from "@/components/insight-cards";
import CodeBlock from "@/components/code-block";
import FineTuneCard from "@/components/fine-tune-card";
import SelectionActions from "@/components/selection-actions";

const COMPONENTS = [
  { id: "loading-state", label: "Loading State", Component: LoadingState },
  { id: "thinking", label: "Thinking", Component: ThinkingState },
  { id: "streaming-text", label: "Streaming Text", Component: StreamingText },
  { id: "approval-card", label: "Approval Card", Component: ApprovalCard },
  { id: "tool-chips", label: "Tool Chips", Component: ToolChips },
  { id: "task-rows", label: "Task Rows", Component: TaskRows },
  { id: "chat", label: "Chat", Component: ChatComposer },
  { id: "prompt-bar", label: "Prompt Bar", Component: PromptBar },
  { id: "recommendation-card", label: "Recommendation Card", Component: RecommendationCard },
  { id: "context-cards", label: "Context Cards", Component: ContextCards },
  { id: "diff-table", label: "Diff Table", Component: DiffTable },
  { id: "records-table", label: "Records Table", Component: RecordsTable },
  { id: "filter-table", label: "Filter Table", Component: FilterTable },
  { id: "sidebar-nav", label: "Sidebar Nav", Component: SidebarNav },
  { id: "search", label: "Search", Component: SearchList },
  { id: "insight-cards", label: "Insight Cards", Component: InsightCards },
  { id: "code-block", label: "Code Block", Component: CodeBlock },
  { id: "fine-tune-card", label: "Fine-tune Card", Component: FineTuneCard },
  { id: "selection-actions", label: "Selection Actions", Component: SelectionActions },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <header className="mb-14 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            AI-Native React Components
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            {COMPONENTS.length} crafted primitives for AI-native interfaces.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="flex flex-col gap-20">
        {COMPONENTS.map(({ id, label, Component }) => (
          <section key={id} id={id} className="scroll-mt-8">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="text-[13px] font-medium text-ink">{label}</h2>
              <code className="font-mono text-[11.5px] text-ink-3">
                components/{id}.tsx
              </code>
            </div>
            <div className="flex min-h-40 w-full items-center justify-center rounded-card border border-line bg-canvas p-8">
              <Component />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
