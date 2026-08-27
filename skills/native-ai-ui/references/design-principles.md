# Design Principles — AI-Native Interfaces

Distilled from the Beautiful UI component source. Each section: what the pattern is
for, how it behaves, and what to preserve when redesigning it.

## The Interaction Model

AI-native UI differs from classic CRUD UI in three ways:

1. **Time is visible.** The system works for seconds-to-minutes. The UI narrates that
   time (elapsed counters, staged traces, progress pills) instead of hiding it behind
   a spinner.
2. **Process is inspectable.** Users trust agents they can audit. Every conclusion
   links back to steps, sources, or diffs that produced it.
3. **Control stays with the human.** Agents propose; humans dispose. Approvals,
   selection actions, and diff previews put the commit decision in the user's hands.

## Pattern: Loading State

- Pixel-grid loader (cells light up in sequence) + shimmer label + elapsed time.
- Use for initial waits before any content exists. Once partial content exists,
  switch to streaming/thinking patterns — never stack a loader on top of content.
- Preserve: the elapsed-time readout. It converts anxiety into information.

## Pattern: Thinking (agent trace)

Four variants — Steps, Reasoning, Search, Coding — one interaction model:

- While running: a header row with spinner + active label ("Thinking…"), and the
  current trace rows appearing one at a time.
- On completion: the header settles to a quiet summary ("Thought for 4 seconds",
  "Searched 6 sources"), the trace collapses but **stays expandable**.
- Row anatomy: primary label, optional secondary detail (count, file, command),
  optional +/- counters for edits. Mono font for paths/commands/queries.
- Preserve: the settle-then-summarize rhythm; expandability after completion;
  one active row at a time.

## Pattern: Streaming Text

- Tokens render progressively with a caret/shimmer on the tail; inline source
  citations as small superscript chips; follow-up suggestions appear only after
  the stream completes.
- Never animate layout shifts — stream into a stable container.
- Preserve: inline attribution (sources are part of the text, not a footnote list)
  and the distinction between streaming state and settled state.

## Pattern: Approval Card (human-in-the-loop)

- Exactly one question visible. Elongated progress pills at top show position;
  the circular-arrow button advances (and becomes "send" on the last question).
- Radio = single select, check = multi select, plus a free-text "other" input.
- All navigation is directly controlled by the user — no auto-advance on select
  (auto-advance robs the user of the chance to revise).
- Preserve: single-question focus, visible progress, explicit submit.

## Pattern: Tool Chips

- Tool calls and code edits rendered as compact inline chips: icon + name +
  status, expanding to detail on tap.
- Chips sit in the flow of the conversation, not in a separate panel — the user
  reads what the agent did in the order it did it.
- Preserve: compactness (a chip is one line), status clarity
  (running / done / failed at a glance), chronological placement.

## Pattern: Task Rows

- A row per background task: status icon (spinner → check / cross), title,
  elapsed or remaining time, chevron to detail.
- Running tasks sort above completed; failures are visually loud (red token),
  completed tasks are muted.
- Preserve: the live status icon; failures must not be able to hide.

## Pattern: Chat

- Tabbed panel: multiple conversations side by side; reasoning replies carry
  expandable traces (Thinking pattern) inline; a composer docks at the bottom.
- Preserve: the hierarchy — message content primary, traces collapsed by default,
  composer always reachable.

## Pattern: Prompt Bar (composer)

- The composer is a control surface, not a text field: attach, @ data-source
  menu, / command menu, model picker, dictation, send.
- Menus open from the trigger character, filter as you type, and are fully
  keyboard-navigable (↑↓ + Enter).
- Two silhouettes: rounded (card radius) for panel docking, pill for standalone.
- Preserve: @ and / as first-class input modes, and visible model selection —
  the user must always know which model will answer.

## Pattern: Recommendation Card

- An agent proposal: title, rationale, a **confidence meter**, and action buttons
  (accept / dismiss / adjust).
- Confidence is shown numerically and visually; low-confidence suggestions get
  softer visual weight, never stronger.
- Preserve: the confidence display and the one-tap accept/dismiss pair.

## Pattern: Context Cards

- Retrieved knowledge chunks shown as small cards: source, snippet, relevance.
  They answer "why does the agent know this?"
- Preserve: source attribution on every card; snippets truncated, full text on demand.

## Pattern: Diff Table

- AI-proposed edits sweep through tabular data: changed cells highlight in
  sequence, additions and deletions are color-coded (green/red tokens), and the
  user can accept per-row or globally.
- Preserve: per-cell granularity of accept, and the sweep animation that shows
  *where* changes landed.

## Pattern: Records / Filter Tables

- Dense data grids (CRM-style) with tags, sorting, and relationship/status columns.
- Status uses tinted text chips (accent/green/orange/red + tint backgrounds), never
  raw saturated fills.
- Preserve: density (12–13px type, tight rows), hairline separators, status as tint.

## Pattern: Sidebar Nav

- App-level navigation for agent workspaces: sections, item counts, active state
  via tint + ink, badges for live activity.
- Preserve: quiet default state; only the active item and live badges carry color.

## Pattern: Search

- Command-palette style: grouped results, keyboard-first, recent + suggested.
- Preserve: grouping and keyboard parity with pointer.

## Pattern: Insight Cards

- Metric cards with live sparklines and delta chips.
- Preserve: delta direction encoded by color token; charts are ambient, annotations
  carry the meaning.

## Pattern: Code Block

- Mono, line-aware, copy button on hover; language tag in the header.
- Preserve: copy affordance and language identification.

## Pattern: Fine-tune Card

- Parameter-tuning card: sliders/inputs grouped by effect, with a preview that
  updates as parameters change.
- Preserve: immediate preview feedback — no "apply" step between tuning and seeing.

## Pattern: Selection Actions

- Text selection summons a floating action menu (ask, rewrite, explain…).
- Appears near the selection, dismisses on outside interaction, keyboard reachable.
- Preserve: proximity to the selection and fast dismissal.

## Cross-Cutting Rules

- **Type scale is dense**: 10.5 / 11 / 11.5 / 12 / 12.5 / 13px for UI text;
  17px+ reserved for page titles. Mono for code, paths, commands, queries.
- **Motion budget**: 100–500ms; ease-out-strong (cubic-bezier(0.23,1,0.32,1))
  for entrances and state changes; no bounce for state changes — bounce reads as
  playfulness, agent state changes should read as competence.
- **Color is semantic**: ink (3 levels), surface (4 levels), line (2 levels),
  accent, green/orange/red each with a tint. Status = tint pair, never raw fill.
- **Shadows are hairlines first**: every elevation starts with
  a 1px line ring; blur is secondary. This keeps edges crisp at any scale.
