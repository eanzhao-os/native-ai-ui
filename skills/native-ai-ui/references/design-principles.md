# Design Principles — AI-Native Interfaces

Derived from the Native AI UI component source. Each section describes what a
pattern is for, how it behaves, and what to preserve when adapting it.

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

## Pattern: Attachment Queue

- Live: show each file moving through upload, parse, index, and ready with numeric
  progress and one polite status announcement.
- Settled: replace motion with a quiet ready result that keeps filename, type, size,
  and provenance visible.
- Failed: identify the failed stage without discarding successful files; expose
  retry and remove as separate actions.
- Preserve user control: let retry restart only the failed file and let remove name
  its exact target.

## Pattern: Message Branches

- Treat regenerated answers as siblings of one user message, not duplicated turns.
- Switching replaces answer, model, timestamp, and source metadata together and
  announces the new position, such as “2 of 3.”
- Disable previous/next at boundaries. “Continue from this branch” explicitly marks
  the chosen lineage; changing branches clears that settled confirmation.
- Preserve comparison context after completion so users can audit alternatives.

## Pattern: Checkpoint Timeline

- Show time, summary, changed-file count, verification state, and current marker.
- Selecting a checkpoint reveals its file-change summary without restoring it.
- Restoration is always two-step: request, then confirm the exact checkpoint and
  affected work. Keep Cancel safe and disable restore for the current checkpoint.
- During restore, prevent duplicate submission. On failure, keep the current state
  intact and offer retry; on success, announce and mark the restored checkpoint current.

## Patterns: Context Window, Memory Inspector, Context Spillover

- Context Window shows a segmented token budget, reserved capacity, and cost before
  truncation becomes surprising. Warn before hard limits and settle to actual usage.
- Memory Inspector keeps entity, source, confidence, age, and edit/delete controls
  visible. Never present inferred memory as user-authored fact.
- Context Spillover narrates compaction and disk spill as live stages, then shows
  what remained, moved, or failed. Recovery must name whether to retry, prune, or
  start a fresh context.

## Patterns: Subagent Tree, Agent Teams, Agent Inbox

- Subagent Tree shows delegation hierarchy, live worker state, latest trace, and
  failures in place; completed workers settle to a compact result.
- Agent Teams separates durable membership from the task DAG. Make ownership,
  blocked dependencies, handoff, and cancellation inspectable.
- Agent Inbox distinguishes queued from delivered messages and exposes recipient,
  ordering, and delivery failure. Let users cancel or amend only messages that have
  not been consumed.

## Patterns: Turn Lifecycle, Hook Pipeline, Session Telemetry, Workflow Run

- Turn Lifecycle brackets turn and step events in order, highlights the live event,
  and settles to duration plus outcome without deleting the trace.
- Hook Pipeline shows each hook decision and the final most-restrictive merge.
  Failed hooks remain visible; bypass or retry requires an explicit user action.
- Session Telemetry labels live estimates versus settled totals and never hides
  stale, unavailable, or partial metrics.
- Workflow Run shows fan-out, concurrency slots, queued/running/completed/failed
  nodes, and retry scope. Cancelling a run names the affected branches.

## Patterns: Artifact Sandbox, Model Arena

- Artifact Sandbox separates source, preview, logs, and failure state. Preview
  updates never imply persistence; copy/download success appears only after the
  operation succeeds.
- Model Arena keeps candidate identity blind while voting, aligns equivalent
  prompts and sources, and reveals models only after an explicit choice. Failed
  candidates remain distinguishable from low-quality answers and can be retried.

## Patterns: Cordis Plugin Tree and MCP Servers

- Cordis Plugin Tree shows plugin/service topology, activation, dependency health,
  and hot-reload state. A failed reload preserves the last working version and
  exposes retry or rollback.
- MCP Servers shows connection, transport, tool inventory, latency, and errors.
  Reconnect never erases the last known capabilities; permission changes require
  review before tools become available.

## Patterns: Permission Presets and Sandbox Manager

- Permission Presets preview the exact grants, denials, scope, and audit effect.
  Applying or replaying a preset requires confirmation when authority expands.
- Sandbox Manager shows container/process lifecycle, resource limits, and isolation
  boundaries. Stop and destroy are distinct; destructive actions name the sandbox
  and require confirmation.

## Patterns: LSP Diagnostics, Job Scheduler

- LSP Diagnostics streams analysis, then settles findings by file and severity.
  Fixes show the proposed diff and remain selectable; failure preserves diagnostics
  with retry.
- Job Scheduler shows schedule, next run, last result, overlap policy, and live
  execution. Pause, run-now, and delete are separate controls; delete requires
  confirmation and failed runs retain logs plus retry.

## Cross-Cutting Rules

- **Type scale is dense**: 10.5 / 11 / 11.5 / 12 / 12.5 / 13px for UI text;
  17px+ reserved for page titles. Mono for code, paths, commands, queries.
- **Motion budget**: 100–500ms; ease-out-strong (cubic-bezier(0.23,1,0.32,1))
  for entrances and state changes; no bounce for state changes — bounce reads as
  playfulness, agent state changes should read as competence.
- **Color is semantic**: ink (3 levels), surface (4 levels), line (2 levels),
  accent, green/orange/red each with a tint. Status = tint pair, never raw fill.
- **Dark mode is paired**: every semantic token has a light and dark value; do not
  derive one theme from opacity guesses at the call site.
- **Motion has a fallback**: reduced-motion removes loops, sweeps, and smooth
  scrolling while preserving final state and live status.
- **Status is accessible**: announce meaningful transitions, keep focus stable,
  and pair color with text, symbol, or position.
- **Shadows are hairlines first**: every elevation starts with
  a 1px line ring; blur is secondary. This keeps edges crisp at any scale.
