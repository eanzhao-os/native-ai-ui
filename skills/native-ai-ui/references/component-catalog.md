# Component Catalog

Use this catalog to choose the smallest Native AI UI set that covers the
workflow. Every URL is a directly installable shadcn registry item.

## Contents

- [Install](#install)
- [Core & Streaming](#core--streaming)
- [Agentic & Teams](#agentic--teams)
- [Context & Memory](#context--memory)
- [Agent Runtime](#agent-runtime)
- [Cordis & Infrastructure](#cordis--infrastructure)
- [Artifacts & Views](#artifacts--views)
- [Multimodal & Arena](#multimodal--arena)
- [Kumo & System](#kumo--system)
- [Selection Rules](#selection-rules)

## Install

Install one item:

```bash
npx shadcn@latest add https://eanzhao-os.github.io/native-ai-ui/r/<name>.json
```

Requires Tailwind CSS v4 and a shadcn `components.json`. Each item brings its
component source, semantic tokens, bilingual language helper, and declared
optional npm dependencies.

## Core & Streaming

| Component | Best use | Registry URL |
| --- | --- | --- |
| Loading State | Initial wait before partial output exists | https://eanzhao-os.github.io/native-ai-ui/r/loading-state.json |
| Thinking Traces | Expandable reasoning, search, or coding trace | https://eanzhao-os.github.io/native-ai-ui/r/thinking.json |
| Streaming Text | Token-by-token answers with citations | https://eanzhao-os.github.io/native-ai-ui/r/streaming-text.json |
| Prompt Bar | Multimodal composer with sources, commands, and model choice | https://eanzhao-os.github.io/native-ai-ui/r/prompt-bar.json |
| Chat Composer | Message thread with inline agent traces | https://eanzhao-os.github.io/native-ai-ui/r/chat.json |
| Code Block | Copyable or runnable generated code | https://eanzhao-os.github.io/native-ai-ui/r/code-block.json |
| Attachment Queue | Upload, parse, index, retry, and remove file ingestion | https://eanzhao-os.github.io/native-ai-ui/r/attachment-queue.json |

## Agentic & Teams

| Component | Best use | Registry URL |
| --- | --- | --- |
| Subagent Delegation Tree | Hierarchical delegation with live worker traces | https://eanzhao-os.github.io/native-ai-ui/r/subagent-tree.json |
| Agent Teams | Durable roster and shared task DAG | https://eanzhao-os.github.io/native-ai-ui/r/agent-teams.json |
| Task Rows | Compact multi-step plan execution | https://eanzhao-os.github.io/native-ai-ui/r/task-rows.json |
| Tool Chips | Inline chronological tool-call status | https://eanzhao-os.github.io/native-ai-ui/r/tool-chips.json |
| Approval Card | Focused human-in-the-loop decisions | https://eanzhao-os.github.io/native-ai-ui/r/approval-card.json |
| Clarification Card | Ask one scoped question before acting | https://eanzhao-os.github.io/native-ai-ui/r/clarification-card.json |
| Message Branches | Compare regenerated answers and continue a lineage | https://eanzhao-os.github.io/native-ai-ui/r/message-branches.json |

## Context & Memory

| Component | Best use | Registry URL |
| --- | --- | --- |
| Context Window | Segmented token budget, cost, and limits | https://eanzhao-os.github.io/native-ai-ui/r/context-window.json |
| Memory Inspector | Audit long-term entity memory and provenance | https://eanzhao-os.github.io/native-ai-ui/r/memory-inspector.json |
| Context Cards | Explain retrieved sources and relevance | https://eanzhao-os.github.io/native-ai-ui/r/context-cards.json |
| Context Spillover | Show compaction and disk-spill lifecycle | https://eanzhao-os.github.io/native-ai-ui/r/context-spillover.json |

## Agent Runtime

| Component | Best use | Registry URL |
| --- | --- | --- |
| Turn Lifecycle | Ordered turn and step bracket events | https://eanzhao-os.github.io/native-ai-ui/r/turn-lifecycle.json |
| Agent Inbox | Queued versus delivered agent messages | https://eanzhao-os.github.io/native-ai-ui/r/agent-inbox.json |
| Hook Pipeline | Hook decisions and restrictive merge result | https://eanzhao-os.github.io/native-ai-ui/r/hook-pipeline.json |
| Session Telemetry | Live and settled session metrics | https://eanzhao-os.github.io/native-ai-ui/r/session-telemetry.json |
| Workflow Run | Fan-out execution with concurrency slots | https://eanzhao-os.github.io/native-ai-ui/r/workflow-run.json |
| Checkpoint Timeline | Inspect and explicitly restore execution state | https://eanzhao-os.github.io/native-ai-ui/r/checkpoint-timeline.json |

## Cordis & Infrastructure

| Component | Best use | Registry URL |
| --- | --- | --- |
| Cordis Plugin Tree | Plugin and service topology with hot reload | https://eanzhao-os.github.io/native-ai-ui/r/cordis-plugin-tree.json |
| Permission Presets | Preview and audit reusable permission scopes | https://eanzhao-os.github.io/native-ai-ui/r/permission-preset-card.json |
| LSP Diagnostics | Stream diagnostics and review proposed fixes | https://eanzhao-os.github.io/native-ai-ui/r/lsp-diagnostics.json |
| Sandbox Manager | Container, process, and isolation lifecycle | https://eanzhao-os.github.io/native-ai-ui/r/sandbox-manager.json |
| Job Scheduler | Durable schedules, runs, logs, and retry | https://eanzhao-os.github.io/native-ai-ui/r/job-scheduler.json |
| MCP Servers | Connection health and tool inventory | https://eanzhao-os.github.io/native-ai-ui/r/mcp-servers.json |

## Artifacts & Views

| Component | Best use | Registry URL |
| --- | --- | --- |
| Artifact Sandbox | Generated source, preview, and logs | https://eanzhao-os.github.io/native-ai-ui/r/artifact-sandbox.json |
| Diff Table | Select and review AI-proposed edits | https://eanzhao-os.github.io/native-ai-ui/r/diff-table.json |
| Records Table | Dense structured records with statuses | https://eanzhao-os.github.io/native-ai-ui/r/records-table.json |
| Filter Table | Natural-language filtering of structured rows | https://eanzhao-os.github.io/native-ai-ui/r/filter-table.json |
| Selection Actions | Contextual AI actions on selected text | https://eanzhao-os.github.io/native-ai-ui/r/selection-actions.json |

## Multimodal & Arena

| Component | Best use | Registry URL |
| --- | --- | --- |
| Audio Orb | Voice-agent listening and speaking state | https://eanzhao-os.github.io/native-ai-ui/r/audio-orb.json |
| Model Arena | Blind side-by-side model evaluation | https://eanzhao-os.github.io/native-ai-ui/r/model-arena.json |
| Insight Cards | Metrics, trends, and directional deltas | https://eanzhao-os.github.io/native-ai-ui/r/insight-cards.json |
| Recommendation Card | Explainable suggestion with confidence and response | https://eanzhao-os.github.io/native-ai-ui/r/recommendation-card.json |

## Kumo & System

| Component | Best use | Registry URL |
| --- | --- | --- |
| Sensitive Input | Masked credentials with honest copy status | https://eanzhao-os.github.io/native-ai-ui/r/sensitive-input.json |
| Layered Resource Card | Collapsible stacked resource hierarchy | https://eanzhao-os.github.io/native-ai-ui/r/layer-card.json |
| Sidebar Nav | Session and workspace navigation | https://eanzhao-os.github.io/native-ai-ui/r/sidebar-nav.json |
| Search Palette | Keyboard-first semantic search and commands | https://eanzhao-os.github.io/native-ai-ui/r/search.json |
| Fine-tune Card | Parameter tuning with immediate preview | https://eanzhao-os.github.io/native-ai-ui/r/fine-tune-card.json |

## Selection Rules

1. Start with the user's decision, not the catalog category.
2. Add one surface for each distinct state the user must observe or control.
3. Reuse an existing trace, row, or status surface before adding another panel.
4. Pair Attachment Queue with Prompt Bar only when ingestion begins in the composer.
5. Pair Message Branches with Chat only when regenerated answers stay conversational.
6. Pair Checkpoint Timeline with Diff Table when restoration depends on changed-file review.
7. Add Approval Card only when execution genuinely pauses for a human decision.
8. Keep telemetry secondary to the task unless the user must diagnose runtime behavior.
