# AI-Native React Components

> 🌐 **Live Showcase**: [https://eanzhao-os.github.io/native-ai-ui/](https://eanzhao-os.github.io/native-ai-ui/)

34 crafted primitives for AI-native interfaces — loading and thinking states, streaming
text, approval flows, subagents, audio orb, tokenomics, cordis plugins, sandbox managers, LSP, artifacts, and Kumo-style primitives.

Every component is a self-contained `.tsx` file with no shared runtime beyond React and
a set of design tokens. Install one with the shadcn CLI and it arrives with its tokens,
keyframes, and npm dependencies already wired in:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/eanzhao-os/native-ai-ui/main/public/r/records-table.json
```

Requires a Tailwind CSS v4 project with a `components.json` (`npx shadcn@latest init`).

## Components

| Component | File | Extra deps |
| --- | --- | --- |
| Loading State | `components/loading-state.tsx` | — |
| Thinking | `components/thinking.tsx` | — |
| Streaming Text | `components/streaming-text.tsx` | — |
| Approval Card | `components/approval-card.tsx` | — |
| Tool Chips | `components/tool-chips.tsx` | — |
| Task Rows | `components/task-rows.tsx` | — |
| Chat | `components/chat.tsx` | — |
| Prompt Bar | `components/prompt-bar.tsx` | `glimm` |
| Recommendation Card | `components/recommendation-card.tsx` | — |
| Context Cards | `components/context-cards.tsx` | — |
| Diff Table | `components/diff-table.tsx` | — |
| Records Table | `components/records-table.tsx` | `.records-*` CSS |
| Filter Table | `components/filter-table.tsx` | — |
| Sidebar Nav | `components/sidebar-nav.tsx` | — |
| Search | `components/search.tsx` | — |
| Insight Cards | `components/insight-cards.tsx` | `liveline`, `.insight-chart-*` CSS |
| Code Block | `components/code-block.tsx` | — |
| Fine-tune Card | `components/fine-tune-card.tsx` | — |
| Selection Actions | `components/selection-actions.tsx` | `iconoir-react`, `components/atoms/*` |
| Context Window | `components/context-window.tsx` | — |
| Subagent Tree | `components/subagent-tree.tsx` | — |
| Audio Orb | `components/audio-orb.tsx` | — |
| Clarification Card | `components/clarification-card.tsx` | — |
| Artifact Sandbox | `components/artifact-sandbox.tsx` | — |
| Model Arena | `components/model-arena.tsx` | — |
| Memory Inspector | `components/memory-inspector.tsx` | — |
| Cordis Plugin Tree | `components/cordis-plugin-tree.tsx` | — |
| Permission Presets | `components/permission-preset-card.tsx` | — |
| Context Spillover | `components/context-spillover.tsx` | — |
| LSP Diagnostics | `components/lsp-diagnostics.tsx` | — |
| Sandbox Manager | `components/sandbox-manager.tsx` | — |
| Job Scheduler | `components/job-scheduler.tsx` | — |
| Sensitive Input | `components/sensitive-input.tsx` | — |
| Layer Card | `components/layer-card.tsx` | — |

## Internationalization & Language Switch (i18n)

All components support English and Chinese with fluid runtime toggles:
- **Global Toggle**: Header & sidebar switch between `English` and `中文版本` across all 34 components.
- **Per-Component Toggle**: Each component header has an individual `EN | 中文` button, allowing you to test bilingual copies independently.

## Running the showcase

```bash
npm install
npm run dev
```

`app/page.tsx` renders all 34 components on one page with a responsive sidebar and light/dark toggle.

## Copying by hand

The CLI is a convenience, not a requirement — nothing here is locked to it.

1. Copy the `.tsx` file into your project.
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
- **Tether Harness**: Specialized runtime widgets (Cordis plugin topologies, durable job schedules, exactly-once permission auditing, and Roslyn LSP diagnostics) are tailored for the [Tether](https://github.com/eanzhao-os/tether) C# Agent Harness.
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
