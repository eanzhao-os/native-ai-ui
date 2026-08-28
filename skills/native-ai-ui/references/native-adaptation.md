# Native Adaptation — SwiftUI, Compose, TUI

How to carry the Native AI UI patterns onto native platforms while preserving
their interaction model. Tokens translate 1:1 — see tokens.md for values;
this file maps tokens to platform primitives and gives per-pattern notes.

## Token Translation

| Web token | SwiftUI | Compose |
| --- | --- | --- |
| `--page`, `--canvas`, `--surface`, `--inset` | Named colors in Asset Catalog (light+dark variants), e.g. `Color("surface")` | `Color` entries in a theme data class read via CompositionLocal |
| `--ink` / `--ink-2` / `--ink-3` | Custom named colors; do NOT reuse system `.secondary` blindly — match the 3-level ramp | Same — explicit 3-level ramp in the theme |
| `--line` / `--line-strong` | 1px line-color borders via overlay + stroke | `BorderStroke(1.dp, lineColor)` |
| hairline shadows | overlay stroke + `.shadow(radius: 1, y: 1)` at near-zero opacity | border + small `shadow(1.dp)` |
| `--accent` + tints | `Color("accent")`; tint background = accent at ~10% opacity on surface | accent + `accent.copy(alpha = 0.1f)` surface |
| status tint pairs | status-color text on tint-color capsule background | status-color text on tinted `Surface` |
| radius 6/8/10 | `RoundedRectangle(cornerRadius:)`, continuous style | `RoundedCornerShape(6/8/10.dp)` |
| ease-out-strong | `.timingCurve(0.23, 1, 0.32, 1, duration: 0.2)` | `CubicBezierEasing(0.23f, 1f, 0.32f, 1f)`, 200–300ms |
| type scale 10.5–13 | `.system(size:)` 10.5–13, monospaced for code | `fontSize = 10.5.sp..13.sp`, `FontFamily.Monospace` |

On both platforms, define every token for light AND dark. The web tokens already
solve the dark ramp — copy the hex values directly into asset catalogs / theme
objects rather than re-deriving them.

For TUI work, map the same semantics to named terminal styles such as
`surface`, `ink-muted`, `accent`, `success`, `warning`, and `danger`.
Define ANSI 16-color, ANSI 256-color, and monochrome fallbacks. Never rely on
color alone.

## Cross-Platform Pattern Map

| Pattern | SwiftUI | Compose | TUI |
| --- | --- | --- | --- |
| Attachment Queue | `ProgressView` rows in `List` | `LinearProgressIndicator` rows | queued rows with percent and retry key |
| Message Branches | `TabView` paging plus toolbar arrows | `HorizontalPager` plus icon buttons | `[1/3]` with previous/next keys |
| Checkpoint Timeline | `DisclosureGroup` plus `confirmationDialog` | expandable list plus `AlertDialog` | numbered checkpoints plus typed confirmation |
| Approval Card | `confirmationDialog` or focused sheet with destructive role | `AlertDialog` with explicit confirm/cancel | focused approval pane; type the shown scope for destructive commands |
| Tool Progress | `ProgressView` plus expandable log disclosure | progress indicator plus expandable log | one live status line plus append-only detail log |
| Diff Review | `List` or `Table` with selectable hunks | lazy list with selectable hunks | unified diff with accept/reject keys |
| Agent Tree | `OutlineGroup` with status labels | expandable lazy tree | indented tree with stable row keys |
| Workflow Run | `Grid` or `List` with task cancellation | lazy grid/list with task cancellation | queued/running/done/failed rows with retry and cancel keys |

## Pattern Mapping

### Loading State
- SwiftUI: a `LazyVGrid` of small rectangles animating opacity with staggered
  delays + mono elapsed-time `Text`. The point is the elapsed timer — a bare
  `ProgressView` loses the information.
- Compose: grid of `Box` with `animateFloatAsState`; timer via
  `LaunchedEffect` + coroutine delay.

### Thinking (trace)
- SwiftUI: DisclosureGroup-style custom row; header = spinner + label while
  running, switching to summary text with a 200ms crossfade; rows appear with
  opacity+move transitions, staggered.
- Compose: `AnimatedVisibility` rows in a `Column`; header `Crossfade`;
  expansion via `animateContentSize()`.
- TUI: print rows as they happen; on completion, collapse to a one-line summary.

### Streaming Text
- SwiftUI: append to an `AttributedString`; disable animations on
  layout-affecting ancestors to avoid reflow jumps; blinking caret =
  `TimelineView` + opacity toggle on a trailing rect.
- Compose: `Text` backed by a snapshot-state list of tokens; caret via
  `rememberInfiniteTransition`.

### Approval Card
- SwiftUI: one `VStack` swapped by index; progress pills = `Capsule` row
  (active = ink, done = accent, todo = line). Advance button = circular button
  with arrow symbol; last page swaps to arrow-up. Never auto-advance.
- Compose: simple index state (or a pager locked to user-confirmed gestures).
- Out-of-app approvals: actionable notifications mirroring the same options.
- Destructive or privileged actions: show exact command, target, working directory,
  and authority change. Use a destructive-role control, keep Cancel as the safe
  default, block duplicate confirmation, and require typed scope for irreversible
  terminal actions.

### Tool Chips
- SwiftUI: `HStack` of small capsule buttons with symbols + status tint;
  tap expands to a popover with detail. Target ~24–28pt height.
- Compose: custom chip composable — Material chips default too tall.

### Task Rows
- SwiftUI: `List` rows with spinner → checkmark transition; failed rows use red
  token text, never red background.
- Compose: `LazyColumn` items keyed by task id; status icon via `Crossfade`.

### Chat
- SwiftUI: `ScrollViewReader` + `LazyVStack` of message views; traces embedded
  as collapsed-by-default sections inside agent bubbles; composer pinned via
  `safeAreaInset(edge: .bottom)`. Tabs = segmented control (phone) or sidebar
  (iPad/macOS).
- Compose: `LazyColumn`; autoscroll only when already at bottom.

### Prompt Bar
- SwiftUI: `TextField` in a card `VStack` with a controls `HStack` (attach,
  model `Menu`, mic, send). Detect @ and / in `onChange(of:)` by scanning the
  last token; menus as anchored `.popover`; `.onKeyPress` for arrow/enter nav.
- Compose: `BasicTextField` + filtered `DropdownMenu`; handle `KeyEvent`.
- Dictation: `SFSpeechRecognizer` / Android `SpeechRecognizer` behind the mic.

### Recommendation Card
- Card with title, rationale, confidence meter (thin 3–4pt accent bar), and a
  paired accept (accent) / dismiss (ghost) button row.

### Context Cards
- Horizontal scrolling row of small cards (source mark, 2–3 line snippet,
  relevance label). SwiftUI: `ScrollView(.horizontal)`; Compose: `LazyRow`.

### Diff Table
- Native tables are rare; on iOS prefer a per-record card list where changed
  fields show old (strikethrough, red ink) → new (green ink), with per-item
  accept/reject. On desktop (macOS/Windows) a real grid works.
- The "sweep" = staggered highlight cascading down rows, settling to persistent
  green/red tints until resolved.

### Records / Filter Tables
- iOS: `List` with custom dense rows (12–13pt); status as tinted text capsules.
- Desktop: true grid with sortable headers; hairline row separators, hover fill.

### Sidebar Nav
- SwiftUI: `NavigationSplitView` with custom row styling — active = accent-tint
  background + accent ink; counts as trailing mono badges; live activity = small
  accent dot or spinner.
- Compose: `NavigationRail` or permanent drawer with custom items.

### Search
- SwiftUI: `.searchable` with custom suggestion sections; on macOS a
  Spotlight-style floating panel for command palettes.
- Compose: full-screen `Dialog` with text field + grouped result list.

### Insight Cards
- Grid of metric cards; sparklines via `Canvas` or a charts library stripped of
  axes; delta chip = tinted capsule with arrow.

### Code Block
- SwiftUI: horizontal `ScrollView` + mono `Text`; copy button on hover
  (macOS) / long-press (iOS).
- Compose: horizontal-scroll `SelectionContainer` + copy button in the corner.

### Fine-tune Card
- Grouped sliders with the preview pane updating on every value change —
  debounce network calls, never the visual preview.

### Selection Actions
- iOS: custom `UIMenuController` items on selectable text.
- Android: custom `ActionMode` with floating toolbar anchored to the selection.

## Terminal / TUI Notes

- Tokens map to ANSI 256-color approximations; keep the 3-level ink ramp
  (default / bright-black / faint).
- Traces print progressively and settle to a one-line summary; diffs use
  green/red +/- lines; approvals are single-question prompts with numbered options.
- Elapsed timers and spinners share one line, cleared on completion.
- Model focus explicitly: only the focused approval consumes `y/n`, arrow keys,
  or typed confirmation. Keep global help and cancel keys visible.
- Use `Tab`/reverse-`Tab` or documented previous/next keys to move between
  panes, `Enter` to inspect, `Esc` to cancel, and `Ctrl+C` to request
  interruption. Never bind a single unmodified key to an irreversible action.
- For dangerous commands, show the exact command and resolved targets. Read-only
  work may run directly; destructive, privileged, costly, or externally visible
  work always pauses for explicit approval. Irreversible scope requires typing the
  displayed confirmation phrase.
- Keep tool output append-only beneath one replaceable live status line. Settle to
  exit status and duration; on failure keep partial output and offer inspect, retry,
  or cancel. Reduced-motion mode replaces spinners with textual state labels.
