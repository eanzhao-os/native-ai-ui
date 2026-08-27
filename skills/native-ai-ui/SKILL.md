---
name: native-ai-ui
description: Design AI-native interfaces on any platform — a framework-agnostic design system for chat agents, thinking/reasoning traces, streaming text, human-in-the-loop approvals, tool chips, task rows, prompt composers, recommendation cards, context cards, diff/data tables, sidebar nav, search, insight cards, code blocks, fine-tune cards, and selection actions. Use when designing or implementing UI for AI agents, copilots, chat assistants, agentic workflows, or LLM-powered features — on iOS/SwiftUI, Android/Compose, desktop, terminal, or web. Ships design principles, complete light/dark tokens, per-platform adaptation guidance, a design mockup, and the full Beautiful UI React component source as reference implementation.
---

# Native AI UI

## Overview

A framework-agnostic design system for AI-native interfaces, distilled from the
[Beautiful UI](https://www.beautifului.dev/) component library (19 primitives, MIT,
by Shane Levine — full React source included in this repo as reference implementation).
Use it to design agent interfaces that feel alive on any platform: visible reasoning,
honest progress, reversible actions.

## Workflow

Design first, platform second:

1. Read `references/design-principles.md` — the interaction model and per-pattern
   behavior: what animates, what settles, what the user controls. This is the core
   of the skill and applies to every platform.
2. Read `references/tokens.md` — lift colors, radii, shadows, type scale, and
   motion curves verbatim. Tokens are platform-neutral values, not CSS-only.
3. Read `references/native-adaptation.md` — concrete mappings of each pattern to
   SwiftUI, Jetpack Compose, and terminal UIs, plus token translation tables.
4. Open `assets/preview/native-chat.html` — a native-app-style design mockup
   assembled from the tokens (sidebar + chat, traces, approvals, diff table, tasks,
   composer; light/dark toggle). Treat it as the visual bar to match.

Only if the target is web/React: skip to "Reference Implementation (Web)" below and
copy component source directly.

## The 26 Patterns

Loading State · Thinking (traces: Steps / Reasoning / Search / Coding) ·
Streaming Text · Approval Card (human-in-the-loop) · Tool Chips · Task Rows ·
Chat · Prompt Bar (composer: @ sources, / commands, model picker, dictation) ·
Recommendation Card (confidence meter) · Context Cards (retrieved knowledge) ·
Diff Table (AI-proposed edits) · Records Table · Filter Table · Sidebar Nav ·
Search · Insight Cards · Code Block · Fine-tune Card · Selection Actions ·
Context Window (Tokenomics) · Subagent Tree · Audio Orb · Clarification Card ·
Artifact Sandbox · Model Arena · Memory Inspector

Each is specified behaviorally in `references/design-principles.md` and mapped to
native widgets in `references/native-adaptation.md`. The React source in
`components/` is the ground truth for exact spacing, timing, and state logic —
read it when a design decision is ambiguous, whatever the target platform.

## Design Tenets (apply everywhere, any platform)

1. **Show the work.** Reasoning, tool calls, and sources are first-class UI —
   expandable traces, not spinners.
2. **Settle, then summarize.** Live states (spinners, shimmer, sweeps) resolve
   into quiet, scannable summaries ("Thought for 4 seconds").
3. **One question at a time.** Approvals and human-in-the-loop prompts never
   stack; progress pills show where the user is.
4. **Everything reversible.** Proposed edits (diff tables) are previewed,
   selectable, and undoable before commit.
5. **Token-only color.** Never hardcode a hex in a component; all color goes
   through the semantic tokens.
6. **Dense type, hairline elevation.** UI text at 10.5–13px equivalents; every
   elevation starts with a 1px line, blur is secondary.
7. **Status as tint.** Accent/green/orange/red always paired with their tint
   backgrounds; never raw saturated fills.

## Non-Negotiables

- Keep dark mode in lockstep: every token exists in both light and dark; on
  native, provide both variants in the asset catalog / theme.
- Keep live-state motion within the bundled durations (100–500ms equivalents,
  ease-out-strong curve); avoid bouncy springs for state changes — competence,
  not playfulness.
- Do not restyle with ad-hoc values — extend the token set instead.
- Preserve attribution: components are MIT by Shane Levine — keep `LICENSE`
  with copied code.

## Reference Implementation (Web)

This repo is the full Beautiful UI Next.js showcase. For web/React targets:

**shadcn CLI** (needs Tailwind CSS v4 + `components.json`):

```bash
npx shadcn@latest add https://raw.githubusercontent.com/TurboKach/ai-native-react-components/main/public/r/<name>.json
```

**Copy by hand**:

1. Copy `components/<name>.tsx` into the project.
2. Copy `app/globals.css` — or merge its `:root`/`.dark` token blocks,
   `@theme inline` mapping, and `@keyframes` into the existing stylesheet.
   Components address color only through tokens (`bg-surface`, `text-ink-2`,
   `shadow-card`), so re-skinning = editing the two token blocks.
3. Check the README table for per-component extras: `prompt-bar.tsx` needs
   `glimm`; `insight-cards.tsx` needs `liveline` + `.insight-chart-*` CSS;
   `records-table.tsx` needs `.records-*` CSS; `selection-actions.tsx` needs
   `iconoir-react` + `components/atoms/*`.

## Repo Layout

- `references/design-principles.md` — design philosophy + per-pattern behavior (start here).
- `references/tokens.md` — complete color/shadow/radius/motion/type tokens, light + dark.
- `references/native-adaptation.md` — per-pattern SwiftUI / Compose / TUI mappings.
- `assets/preview/native-chat.html` — native-style design mockup built from the tokens.
- `components/*.tsx` — 19 reference components (React), self-contained.
- `components/atoms/` — `Shimmer.tsx`, `StreamText.tsx`.
- `app/globals.css` — token source of truth (CSS form).
- `public/r/*.json` — shadcn registry entries.
