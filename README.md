# AI-Native React Components

> 🌐 **Live Showcase**: [https://eanzhao-os.github.io/native-ai-ui/](https://eanzhao-os.github.io/native-ai-ui/)

41 crafted primitives for AI-native interfaces — loading and thinking states, streaming
text, approval flows, agent teams, turn lifecycles, dual-queue inboxes, hook pipelines,
session telemetry, audio orb, tokenomics, cordis plugins, MCP servers, sandbox managers,
LSP, artifacts, and Kumo-style primitives.

Every component is a self-contained `.tsx` file with no shared runtime beyond React and
a set of design tokens. Install one with the shadcn CLI and it arrives with its tokens,
keyframes, the bilingual `lang-context` helper, and npm dependencies already wired in:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/eanzhao-os/native-ai-ui/main/public/r/records-table.json
```

Requires a Tailwind CSS v4 project with a `components.json` (`npx shadcn@latest init`).

## Components

### Core & Streaming

| Component | File | Extra deps |
| --- | --- | --- |
| Loading State | `components/loading-state.tsx` | — |
| Thinking | `components/thinking.tsx` | — |
| Streaming Text | `components/streaming-text.tsx` | — |
| Prompt Bar | `components/prompt-bar.tsx` | `glimm` |
| Chat | `components/chat.tsx` | — |
| Code Block | `components/code-block.tsx` | — |

### Agentic & Teams

| Component | File | Extra deps |
| --- | --- | --- |
| Subagent Tree | `components/subagent-tree.tsx` | — |
| Agent Teams | `components/agent-teams.tsx` | — |
| Task Rows | `components/task-rows.tsx` | — |
| Tool Chips | `components/tool-chips.tsx` | — |
| Approval Card | `components/approval-card.tsx` | — |
| Clarification Card | `components/clarification-card.tsx` | — |

### Context & Memory

| Component | File | Extra deps |
| --- | --- | --- |
| Context Window | `components/context-window.tsx` | — |
| Memory Inspector | `components/memory-inspector.tsx` | — |
| Context Cards | `components/context-cards.tsx` | — |
| Context Spillover | `components/context-spillover.tsx` | — |

### Agent Runtime

| Component | File | Extra deps |
| --- | --- | --- |
| Turn Lifecycle | `components/turn-lifecycle.tsx` | — |
| Agent Inbox | `components/agent-inbox.tsx` | — |
| Hook Pipeline | `components/hook-pipeline.tsx` | — |
| Session Telemetry | `components/session-telemetry.tsx` | — |
| Workflow Run | `components/workflow-run.tsx` | — |

### Tether & Cordis Runtime

| Component | File | Extra deps |
| --- | --- | --- |
| Cordis Plugin Tree | `components/cordis-plugin-tree.tsx` | — |
| Permission Presets | `components/permission-preset-card.tsx` | — |
| LSP Diagnostics | `components/lsp-diagnostics.tsx` | — |
| Sandbox Manager | `components/sandbox-manager.tsx` | — |
| Job Scheduler | `components/job-scheduler.tsx` | — |
| MCP Servers | `components/mcp-servers.tsx` | — |

### Artifacts & Views

| Component | File | Extra deps |
| --- | --- | --- |
| Artifact Sandbox | `components/artifact-sandbox.tsx` | — |
| Diff Table | `components/diff-table.tsx` | — |
| Records Table | `components/records-table.tsx` | `.records-*` CSS |
| Filter Table | `components/filter-table.tsx` | — |
| Selection Actions | `components/selection-actions.tsx` | `iconoir-react`, `components/atoms/*` |

### Multimodal & Arena

| Component | File | Extra deps |
| --- | --- | --- |
| Audio Orb | `components/audio-orb.tsx` | — |
| Model Arena | `components/model-arena.tsx` | — |
| Insight Cards | `components/insight-cards.tsx` | `liveline`, `.insight-chart-*` CSS |
| Recommendation Card | `components/recommendation-card.tsx` | — |

### Kumo & System

| Component | File | Extra deps |
| --- | --- | --- |
| Sensitive Input | `components/sensitive-input.tsx` | — |
| Layer Card | `components/layer-card.tsx` | — |
| Sidebar Nav | `components/sidebar-nav.tsx` | — |
| Search Palette | `components/search.tsx` | — |
| Fine-tune Card | `components/fine-tune-card.tsx` | — |

## Internationalization & Language Switch (i18n)

All 41 components ship with English and Chinese copies:

- **Global Toggle**: Header & sidebar switch between `English` and `中文版本` across the showcase.
- **Per-Component Toggle**: Each component header has an individual `EN | 中文` button, allowing you to test bilingual copies independently.
- Components accept an optional `lang?: "en" | "zh"` prop and resolve it through `lib/lang-context` (installed alongside them by the CLI); without a `LangProvider` they simply render English.

## Running the showcase

```bash
npm install
npm run dev
```

`app/page.tsx` renders all 41 components grouped into 8 categories with a responsive
sidebar, scroll-spy navigation, per-component install commands, and light/dark toggle.

## Copying by hand

The CLI is a convenience, not a requirement — nothing here is locked to it.

1. Copy the `.tsx` file into your project. If it imports `@/lib/lang-context`, copy
   `lib/lang-context.tsx` too (or strip the hook and default to `"en"`).
2. Copy `app/globals.css` — or, if you already have a stylesheet, the `:root`/`.dark`
   token blocks, the `@theme inline` mapping, and the `@keyframes` from it. The
   components address colors only through tokens (`bg-surface`, `text-ink-2`,
   `shadow-card`), so re-skinning is a matter of editing the two token blocks.
3. Install the extra dependency listed above, if the component has one.

Requires Tailwind CSS v4 — the `@theme inline` block is v4 syntax.

## The registry

`registry.json` is the source of truth; `public/r/*.json` are the built items the CLI
fetches, each one carrying its component source, the full light/dark token set, only
the `@keyframes` that component actually uses, and its npm dependencies.

Regenerate after editing a component:

```bash
npm run registry:build
```

### Fonts

Components assume Inter (`--font-inter`) and JetBrains Mono (`--font-mono-face`),
wired up in `app/layout.tsx` via `next/font/google`. Substitute freely; nothing
depends on the specific faces beyond tabular figures in the mono stack.

## Notes & Acknowledgements

- **Beautiful UI**: Some components and foundational interactive primitives in this repository are adapted from and inspired by [Beautiful UI](https://www.beautifului.dev/) and [TurboKach/ai-native-react-components](https://github.com/TurboKach/ai-native-react-components).
- **Kumo UI**: The design system, hairline border elevations, neutral surface tokens, sensitive credential masking, and layered card architectures align with [Kumo UI](https://kumo-ui.com/) (Cloudflare).
- **Tether Harness**: Specialized runtime widgets (turn/step bracket timelines, dual-queue inbox semantics, hook decision pipelines, agent team rosters, workflow fan-out, session telemetry, Cordis plugin topologies, durable job schedules, exactly-once permission auditing, MCP inventories, and Roslyn LSP diagnostics) are tailored for the [Tether](https://github.com/eanzhao-os/tether) C# Agent Harness.
- Every component is `"use client"` and self-animating — they run their own demo loop
  (streaming, thinking, settling) rather than taking data props. Treat them as visual
  references to wire up to real state, not as finished API surfaces.

## License

MIT — see [LICENSE](LICENSE).

## Skill: native-ai-ui

This repo also ships a Codex/Claude skill at `skills/native-ai-ui/`: a framework-agnostic
design system for AI-native interfaces — design principles, complete light/dark tokens,
per-platform adaptation guides (SwiftUI, Compose, TUI), and a design mockup
(`skills/native-ai-ui/assets/preview/native-chat.html`). The React components in this
repo serve as its reference implementation.
