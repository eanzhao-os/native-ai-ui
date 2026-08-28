# Native AI UI Expansion Design

**Date:** 2026-08-28
**Status:** Approved in chat; awaiting written-spec review

## Context

Native AI UI is a statically exported Next.js 16.3.3 showcase and shadcn
registry. It currently contains 41 bilingual, self-contained React demos. The
repository also contains an early `native-ai-ui` agent Skill, but the Skill and
README have drifted from the component library: the Skill covers only 26
patterns, points at an old repository URL, and describes source files that are
outside the installable Skill folder.

The review also found several concrete quality issues:

- The showcase imports and mounts every interactive demo at once. Most demos
  animate or run timers even when far outside the viewport.
- Scroll-spy measures every component section during every scroll event.
- Two copy controls report success without writing to the clipboard.
- Prompt Bar temporarily replaces global `Math.random` while constructing its
  shader.
- Reduced-motion behavior and interactive status semantics are inconsistent.
- Registry metadata and README counts can drift from source and generated
  registry artifacts.
- The repository has type checking and production builds, but no component
  interaction test harness.

## Goals

1. Add three complementary AI-native components that cover input ingestion,
   conversation branching, and reversible agent execution.
2. Reduce the showcase's initial JavaScript and offscreen runtime work without
   changing existing component installation names or props.
3. Fix confirmed correctness, accessibility, and metadata issues discovered by
   the repository review.
4. Turn `skills/native-ai-ui` into a concise, independently installable Skill
   for designing and implementing AI-native interfaces on web, SwiftUI,
   Compose, and terminal surfaces.
5. Document Skill installation for Codex and Claude Code in the root README.
6. Add repeatable tests and registry consistency checks that prevent the same
   regressions from returning.

## Non-goals

- Do not convert the existing 41 demo components into a new data-driven public
  API.
- Do not rename existing registry items, move existing component files, or
  change their `lang?: "en" | "zh"` contract.
- Do not add production dependencies.
- Do not hand-deduplicate the repeated token blocks in `registry.json`; they are
  part of the shadcn registry source format.
- Do not redesign the visual language or introduce a ninth showcase category.
- Do not add a second Skill with a competing name.

## Compatibility Contract

All existing shadcn URLs and component exports remain valid. New components use
the same contract as their neighbors:

```ts
export default function ComponentName({
  lang: propLang,
}: {
  lang?: "en" | "zh";
})
```

Each new component remains a self-contained Client Component, imports only
React and `@/lib/lang-context`, uses existing semantic tokens, and works without
a `LangProvider` by falling back to English.

## Showcase Architecture

### Explicit lazy component catalog

Replace the 44 static component imports in `app/page.tsx` with top-level,
explicit `next/dynamic` imports. Next.js requires literal import paths inside
`dynamic()` for reliable code splitting and preloading, so the catalog will not
use variable or template-string imports.

The catalog continues to hold component labels, descriptions, category IDs,
and the component reference, but the component type becomes:

```ts
type DemoProps = { lang?: Lang };
type ComponentItem = {
  // existing metadata
  Component: React.ComponentType<DemoProps>;
};
```

This removes `React.ComponentType<any>` without forcing new props onto existing
components.

### Near-viewport mounting

Add a small showcase-only `DemoViewport` boundary. It uses one
`IntersectionObserver` per rendered demo with a generous root margin so the
component bundle is requested before it becomes visible. Before activation it
renders a quiet, fixed-minimum-height placeholder that preserves the component
canvas. Once activated, the demo stays mounted; scrolling away does not reset
interactive state or restart its animation.

If `IntersectionObserver` is unavailable, the component activates immediately.
Search results still use the same boundary, and direct navigation calls
`scrollIntoView` on the stable section wrapper rather than an unmounted child.

### Intersection-based scroll-spy

Replace the window scroll handler and repeated `offsetTop`/`offsetHeight` reads
with a single `IntersectionObserver` over component sections. The active item is
the visible section closest to the top offset. The observer is rebuilt only when
the visible component list changes after search.

`CATEGORIES` and its flattened item list remain module constants; no empty-array
`useMemo` is needed for static data.

## New Components

### Attachment Queue

**Registry name:** `attachment-queue`
**Showcase category:** Core & Streaming

The component visualizes the ingestion lifecycle for PDF, image, and audio
attachments. Its internal demo state includes:

- one ready file;
- one file progressing through upload, parsing, indexing, and ready states;
- one failed file with retry and remove actions.

Each row shows a file-type icon, filename, size, current state, and either a
semantic progress bar or a settled result. Retry restarts the failed row from
uploading. Remove deletes only that row. Progress has `role="progressbar"` with
numeric values; failures use an alert; state changes are announced through one
polite live region. Reduced-motion users receive state changes without looping
decorative animation.

### Message Branches

**Registry name:** `message-branches`
**Showcase category:** Agentic & Teams

The component shows three assistant answers branching from the same user
message. It provides previous and next controls, a `2 / 3`-style position,
model and timestamp metadata, and a “Continue from this branch” action.

Switching branches replaces the answer and metadata in a polite live region.
Previous and next controls are disabled at their boundaries. Continuing marks
the selected branch as active and settles into a compact confirmation state;
switching to another branch clears that confirmation. Controls have distinct
English and Chinese accessible names.

### Checkpoint Timeline

**Registry name:** `checkpoint-timeline`
**Showcase category:** Agent Runtime

The component shows three checkpoints: before edits, after implementation, and
after verification. Each checkpoint contains a timestamp, short summary,
changed-file count, and status. Selecting a checkpoint reveals its file-change
summary.

Restoration is deliberately two-step. “Restore checkpoint” opens an inline
confirmation associated with the selected checkpoint. Cancel returns to the
details view; confirm marks that checkpoint current and announces the result.
The current checkpoint cannot be restored again. This keeps a destructive-
looking demo action explicit and reversible in the UI model.

## Repository Quality Improvements

### Correct clipboard behavior

`ArtifactSandbox` will copy the source shown in its code tab.
`SensitiveInput` will copy its current input value. Both controls will await the
clipboard operation, use a small `document.execCommand("copy")` fallback when
the Clipboard API is unavailable, and show success only when copying succeeds.
Errors leave the original icon and expose a localized accessible failure
message. The existing Code Block copy action receives the same failure-safe
behavior while remaining self-contained for registry installation.

### Remove global random mutation

Prompt Bar will construct the Glimm shader without replacing `Math.random`.
Visual hue may vary between shader instances; global correctness takes priority
over a deterministic decorative phase. Existing reduced-motion short-circuiting
for the shader remains.

### Language and accessibility

- `LangProvider` synchronizes `document.documentElement.lang` with the global
  language while preserving the persisted language behavior.
- The showcase search input receives an accessible label; active navigation
  items and language toggles expose their selected state.
- New progress, retry, restore, and branch interactions expose appropriate
  names, disabled states, and live status.
- A global `prefers-reduced-motion: reduce` block shortens CSS animation and
  transition durations, disables smooth scrolling, and prevents infinite
  decorative loops while preserving final state.

### Metadata and dead configuration

- Update the registry homepage to the Native AI UI site.
- Update README and showcase totals from 41 to 44.
- Replace the misleading “0 runtime deps” statistic with wording that makes
  per-component optional dependencies explicit.
- Remove `images.unoptimized` because the repository does not use `next/image`.

## Registry Integrity

Add a Node standard-library script that validates all of the following without
mutating the worktree:

1. Registry item names are unique.
2. Every registry component source path exists.
3. Every registry item has a corresponding `public/r/<name>.json` artifact.
4. Every built artifact has a source registry item; orphan artifacts fail.
5. File content embedded in each built artifact exactly matches its current
   source file.

Expose it as `npm run registry:check`. Continue using
`npm run registry:build` as the only generator.

## Native AI UI Skill

Update the existing `skills/native-ai-ui` folder rather than scaffolding a
second Skill. Keep `SKILL.md` procedural and concise; detailed material remains
one level deep in `references/`.

### Trigger and workflow

The frontmatter description starts with “Use when” and names concrete trigger
contexts: AI chat, copilots, agent workflows, reasoning traces, tool calls,
approvals, streaming output, context/memory, multimodal ingestion, checkpoints,
and native or web implementation.

The body instructs an agent to:

1. identify the target platform and workflow state;
2. read design principles and tokens;
3. load only the relevant platform adaptation and component catalog sections;
4. choose the smallest component set that communicates live, settled, failed,
   approval, and recovery states honestly;
5. implement with semantic tokens, bilingual copy where requested, reduced
   motion, keyboard access, and explicit destructive-action confirmation;
6. verify the result against a compact completion checklist.

### Bundled resources

- `references/design-principles.md`: interaction rules and behavioral patterns,
  expanded for the new components and existing runtime components.
- `references/tokens.md`: semantic light/dark tokens and motion values.
- `references/native-adaptation.md`: SwiftUI, Compose, and TUI mappings,
  expanded for ingestion, branching, checkpoints, and runtime states.
- `references/component-catalog.md`: all 44 registry items grouped by user need,
  with exact current install URLs for web consumers.
- `assets/preview/native-chat.html`: retained as the visual reference asset.
- `agents/openai.yaml`: generated from the finished Skill with only display
  name, short description, and default prompt.

The Skill will not claim that repository-root `components/` or `app/` folders
are bundled inside an installed Skill. It points web implementations to the
public registry and repository instead.

### Skill testing

Treat the Skill as a reference/technique Skill. Before editing it, run fresh
agents on representative prompts without loading the Skill and record the
missing design decisions as the RED baseline. After editing, run equivalent
fresh prompts with the Skill and confirm that agents select appropriate
components, use tokens, cover non-happy states, and route correctly by platform.
Run the Skill Creator validator against the finished folder and verify
`agents/openai.yaml` matches the frontmatter and body.

## README Installation Documentation

The root README gains a dedicated “Install the Skill” section. It documents:

- the cross-runtime project location `.agents/skills/native-ai-ui`;
- Codex's global locations `~/.codex/skills/native-ai-ui` and
  `~/.agents/skills/native-ai-ui`;
- Claude Code's global location `~/.claude/skills/native-ai-ui` and the shared
  `~/.agents/skills/native-ai-ui` alias;
- copy commands to install from an existing clone;
- a simple trigger example such as “Use native-ai-ui to design a checkpointed
  SwiftUI agent chat.”

The instructions tell users to restart or open a new agent session after
installation so the Skill catalog is refreshed. No unverified package-runner
command is presented as the primary installation path.

## Testing Strategy

Follow test-driven development for code and Skill changes.

### Component tests

Add Vitest, jsdom, React Testing Library, and the official Next.js-recommended
Vite helpers as development dependencies. Tests cover behavior rather than
snapshots:

- Attachment Queue retries a failed item, reports progress semantics, removes
  an item, and renders Chinese copy.
- Message Branches enforces navigation boundaries, changes answer metadata,
  and confirms continuation from the selected branch.
- Checkpoint Timeline requires confirmation, supports cancellation, restores
  the selected checkpoint, and disables restoring the current checkpoint.
- Language context synchronizes the document language.
- DemoViewport activates when intersecting and falls back safely without the
  observer API.

### Command-level checks

The final verification sequence is:

```bash
npm test -- --run
npm run lint
npm run registry:build
npm run registry:check
npm run build
git diff --check
```

After `registry:build`, inspect the worktree to ensure all generated changes are
intentional. The production build must remain a successful static export.

## Acceptance Criteria

- The showcase lists and renders 44 bilingual components in the existing eight
  categories.
- The three new components implement the approved interactions and have no new
  production dependencies.
- Existing registry item names and props remain compatible.
- Offscreen demos do not load or mount until they approach the viewport, and
  scroll-spy performs no per-scroll full-page layout scan.
- Copy controls write the promised value and never report false success.
- Global language and reduced-motion behavior are correct.
- The registry source, artifacts, README, and Skill all refer to the current
  repository and 44-component catalog.
- The Skill can be installed independently and passes structural plus
  fresh-agent application tests.
- Every command in the final verification sequence exits successfully.
