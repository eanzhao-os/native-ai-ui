# AI-Native React Components

19 crafted primitives for AI-native interfaces — loading and thinking states, streaming
text, approval flows, tool traces, tables, and search. Sourced from
[beautifului.dev](https://www.beautifului.dev/).

Every component is a self-contained `.tsx` file with no shared runtime beyond React and
a set of design tokens. Install one with the shadcn CLI and it arrives with its tokens,
keyframes, and npm dependencies already wired in:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/TurboKach/ai-native-react-components/main/public/r/records-table.json
```

Requires a Tailwind CSS v4 project with a `components.json` (`npx shadcn@latest init`).

## Components

Swap the file name at the end of the URL above for any of these.

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

## Running the showcase

```bash
npm install
npm run dev
```

`app/page.tsx` renders all 19 on one page with a light/dark toggle.

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

Serving the repo (or the deployed showcase) at a domain also makes
`https://<your-domain>/r/<name>.json` work, since the built items live under `public/`.

### Fonts

Components assume Inter (`--font-inter`) and JetBrains Mono (`--font-mono-face`),
wired up in `app/layout.tsx` via `next/font/google`. Substitute freely; nothing
depends on the specific faces beyond tabular figures in the mono stack.

## Notes

- Every component is `"use client"` and self-animating — they run their own demo loop
  (streaming, thinking, settling) rather than taking data props. Treat them as visual
  references to wire up to real state, not as finished API surfaces.
- `components/atoms/Shimmer.tsx` and `components/atoms/StreamText.tsx` are
  reimplementations, matching the CSS and call sites of the originals.

## License

MIT — see [LICENSE](LICENSE).

## Skill: native-ai-ui

This repo also ships a Codex/Claude skill at `skills/native-ai-ui/`: a framework-agnostic
design system for AI-native interfaces — design principles, complete light/dark tokens,
per-platform adaptation guides (SwiftUI, Compose, TUI), and a design mockup
(`skills/native-ai-ui/assets/preview/native-chat.html`). The React components in this
repo serve as its reference implementation.
