# Native AI UI Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three bilingual AI-native components, improve the showcase and existing interactions, and ship an independently installable Native AI UI Skill with verified documentation.

**Architecture:** Preserve every existing component and registry contract. Add three self-contained Client Components, load showcase demos through explicit Next.js dynamic imports near the viewport, replace scroll-time layout scans with observers, and guard generated registry content with a non-mutating Node check. Keep the Skill concise and route detailed component, token, and platform guidance through one-level references.

**Tech Stack:** Next.js 16.3.3 App Router, React 19.2, TypeScript 5.9, Tailwind CSS 4, shadcn registry, Vitest, jsdom, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-28-native-ai-ui-expansion-design.md`

## Global Constraints

- Keep the successful static export and GitHub Pages base-path behavior.
- Read the relevant local Next.js 16.3.3 guide in `node_modules/next/dist/docs/` before changing Next.js code.
- Do not rename or change the props of the existing 41 registry components.
- New components accept only `lang?: "en" | "zh"`, use `useLang`, and add no production dependency.
- Keep all eight showcase categories; the finished catalog contains exactly 44 items.
- Use only existing semantic color, radius, shadow, typography, and motion tokens.
- Preserve English and Chinese copy, keyboard operation, reduced motion, and explicit confirmation for destructive-looking actions.
- Treat `registry.json` as source and `public/r/*.json` as generated artifacts.
- Apply RED → GREEN → REFACTOR for every behavior change and record the expected RED failure before writing production code.
- Preserve unrelated user changes if the worktree becomes dirty.

---

### Task 1: Test Harness and Registry Integrity Guard

**Files:**
- Modify: `package.json:10`
- Modify: `package-lock.json`
- Modify: `.github/workflows/deploy.yml`
- Create: `vitest.config.mts`
- Create: `tests/setup.ts`
- Create: `tests/registry-integrity.test.ts`
- Create: `scripts/check-registry.mjs`

**Interfaces:**
- Produces `npm test -- --run` and `npm run registry:check`.
- Produces `node scripts/check-registry.mjs --root <path>`, exiting 0 on consistency and 1 with one diagnostic per mismatch.

- [ ] **Step 1: Install only test-development dependencies**

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

Add `"test": "vitest"` and
`"registry:check": "node scripts/check-registry.mjs"` to `scripts`. Do not
change production dependencies.

- [ ] **Step 2: Configure Vitest and DOM cleanup**

Create `vitest.config.mts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    restoreMocks: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
```

Create `tests/setup.ts`:

```ts
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 3: Write the failing registry-integrity behavior test**

Create `tests/registry-integrity.test.ts`:

```ts
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, test } from "vitest";

const checker = resolve("scripts/check-registry.mjs");

function fixture(embeddedContent: string) {
  const root = mkdtempSync(join(tmpdir(), "native-ai-ui-registry-"));
  mkdirSync(join(root, "components"), { recursive: true });
  mkdirSync(join(root, "public", "r"), { recursive: true });
  writeFileSync(join(root, "components", "demo.tsx"), "export default 1;\n");
  writeFileSync(
    join(root, "registry.json"),
    JSON.stringify({
      items: [{
        name: "demo",
        files: [{ path: "components/demo.tsx", target: "components/demo.tsx" }],
      }],
    }),
  );
  writeFileSync(
    join(root, "public", "r", "demo.json"),
    JSON.stringify({
      name: "demo",
      files: [{
        path: "components/demo.tsx",
        target: "components/demo.tsx",
        content: embeddedContent,
      }],
    }),
  );
  return root;
}

describe("registry integrity checker", () => {
  test("rejects an artifact whose embedded source is stale", () => {
    const result = spawnSync(
      process.execPath,
      [checker, "--root", fixture("export default 0;\n")],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "demo: components/demo.tsx embedded content differs from source",
    );
  });

  test("accepts an artifact that embeds the current source", () => {
    const result = spawnSync(
      process.execPath,
      [checker, "--root", fixture("export default 1;\n")],
      { encoding: "utf8" },
    );
    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
  });
});
```

- [ ] **Step 4: Verify RED**

```bash
npm test -- --run tests/registry-integrity.test.ts
```

Expected: FAIL because the checker does not produce the required stale-content
diagnostic.

- [ ] **Step 5: Implement the non-mutating checker**

Create `scripts/check-registry.mjs`:

```js
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function validateRegistry(root) {
  const errors = [];
  const artifactRoot = resolve(root, "public", "r");
  const items = readJson(resolve(root, "registry.json")).items ?? [];
  const names = new Set();

  for (const item of items) {
    if (names.has(item.name)) errors.push(item.name + ": duplicate registry name");
    names.add(item.name);
    const artifactPath = resolve(artifactRoot, item.name + ".json");
    if (!existsSync(artifactPath)) {
      errors.push(item.name + ": missing public/r/" + item.name + ".json");
      continue;
    }
    const artifact = readJson(artifactPath);
    for (const file of item.files ?? []) {
      const sourcePath = resolve(root, file.path);
      if (!existsSync(sourcePath)) {
        errors.push(item.name + ": missing source " + file.path);
        continue;
      }
      const builtFile = (artifact.files ?? []).find(
        (candidate) =>
          candidate.path === file.path ||
          (file.target && candidate.target === file.target),
      );
      if (!builtFile) {
        errors.push(item.name + ": artifact omits " + file.path);
      } else if (builtFile.content !== readFileSync(sourcePath, "utf8")) {
        errors.push(
          item.name + ": " + file.path + " embedded content differs from source",
        );
      }
    }
  }

  if (existsSync(artifactRoot)) {
    for (const filename of readdirSync(artifactRoot)) {
      if (!filename.endsWith(".json") || filename === "registry.json") continue;
      const name = filename.slice(0, -5);
      if (!names.has(name)) errors.push(name + ": orphan registry artifact");
    }
  }
  return errors;
}

const rootFlag = process.argv.indexOf("--root");
const root = rootFlag === -1 ? process.cwd() : resolve(process.argv[rootFlag + 1]);
const errors = validateRegistry(root);
for (const error of errors) console.error(error);
if (errors.length > 0) process.exitCode = 1;
```

- [ ] **Step 6: Verify GREEN and wire CI**

```bash
npm test -- --run tests/registry-integrity.test.ts
npm run registry:check
```

Add before the production build in `.github/workflows/deploy.yml`:

```yaml
      - name: Test
        run: npm test -- --run

      - name: Check registry artifacts
        run: npm run registry:check
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.mts tests/setup.ts tests/registry-integrity.test.ts scripts/check-registry.mjs .github/workflows/deploy.yml
git commit -m "test: add registry integrity guard"
```

---

### Task 2: Attachment Queue Component

**Files:**
- Create: `components/attachment-queue.tsx`
- Create: `tests/attachment-queue.test.tsx`
- Modify: `registry.json`
- Create: `public/r/attachment-queue.json`
- Modify: `public/r/registry.json`

**Interfaces:**
- Produces default `AttachmentQueue({ lang?: "en" | "zh" })`.
- Produces registry item `attachment-queue` with no npm dependencies.

- [ ] **Step 1: Write failing interaction tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AttachmentQueue from "@/components/attachment-queue";

describe("AttachmentQueue", () => {
  test("retries a failed attachment with progress semantics", () => {
    render(<AttachmentQueue />);
    fireEvent.click(
      screen.getByRole("button", { name: "Retry research-notes.pdf" }),
    );
    const progress = screen.getByRole("progressbar", {
      name: "research-notes.pdf upload progress",
    });
    expect(progress.getAttribute("aria-valuenow")).toBe("0");
    expect(screen.getByText("Uploading")).not.toBeNull();
  });

  test("removes only the selected attachment", () => {
    render(<AttachmentQueue />);
    fireEvent.click(
      screen.getByRole("button", { name: "Remove research-notes.pdf" }),
    );
    expect(screen.queryByText("research-notes.pdf")).toBeNull();
    expect(screen.getByText("quarterly-report.pdf")).not.toBeNull();
  });

  test("renders localized Chinese controls", () => {
    render(<AttachmentQueue lang="zh" />);
    expect(screen.getByText("附件队列")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "重试 research-notes.pdf" }),
    ).not.toBeNull();
  });
});
```

Run `npm test -- --run tests/attachment-queue.test.tsx`. Expected RED: the
component is absent.

- [ ] **Step 2: Implement the state model and accessible rows**

Use:

```tsx
type AttachmentState = "uploading" | "parsing" | "indexing" | "ready" | "failed";
type Attachment = {
  id: string;
  name: string;
  kind: "pdf" | "image" | "audio";
  size: string;
  state: AttachmentState;
  progress: number;
};

const INITIAL_ATTACHMENTS: Attachment[] = [
  { id: "report", name: "quarterly-report.pdf", kind: "pdf", size: "2.4 MB", state: "ready", progress: 100 },
  { id: "interview", name: "interview.wav", kind: "audio", size: "18.7 MB", state: "indexing", progress: 64 },
  { id: "notes", name: "research-notes.pdf", kind: "pdf", size: "840 KB", state: "failed", progress: 38 },
];
```

Render a `max-w-lg` token-only card. Each live row has `role="progressbar"`,
localized label, 0/100 bounds, and current numeric value. The failed row has
Retry and Remove buttons whose accessible names include the filename. Retry
immutably changes only that row to `uploading` with progress 0; remove filters
only that ID. One hidden polite live region announces both operations. Apply
`motion-reduce:animate-none` to decorative indicators.

- [ ] **Step 3: Verify GREEN and register**

```bash
npm test -- --run tests/attachment-queue.test.tsx
npm run lint
```

Add a registry item titled “Attachment Queue” with description “File ingestion
queue with upload, parse, index, ready, retry, and remove states.” Its files are
`components/attachment-queue.tsx` and `lib/lang-context.tsx`; retain the complete
common `cssVars` block and add no dependency.

```bash
npm run registry:build
npm run registry:check
```

- [ ] **Step 4: Commit**

```bash
git add components/attachment-queue.tsx tests/attachment-queue.test.tsx registry.json public/r
git commit -m "feat: add attachment queue"
```

---

### Task 3: Message Branches Component

**Files:**
- Create: `components/message-branches.tsx`
- Create: `tests/message-branches.test.tsx`
- Modify: `registry.json`
- Create: `public/r/message-branches.json`
- Modify: `public/r/registry.json`

**Interfaces:**
- Produces default `MessageBranches({ lang?: "en" | "zh" })`.
- Produces registry item `message-branches` with no npm dependencies.

- [ ] **Step 1: Write failing branch tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MessageBranches from "@/components/message-branches";

describe("MessageBranches", () => {
  test("navigates branches and disables the previous boundary", () => {
    render(<MessageBranches />);
    fireEvent.click(screen.getByRole("button", { name: "Previous branch" }));
    expect(screen.getByText("1 / 3")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "Previous branch" }).hasAttribute("disabled"),
    ).toBe(true);
    expect(screen.getByText("GPT-5.2 · 10:41")).not.toBeNull();
  });

  test("continues from the selected branch and clears after navigation", () => {
    render(<MessageBranches />);
    fireEvent.click(screen.getByRole("button", { name: "Continue from this branch" }));
    expect(screen.getByText("Continuing from branch 2")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Next branch" }));
    expect(screen.queryByText("Continuing from branch 2")).toBeNull();
  });

  test("renders Chinese navigation names", () => {
    render(<MessageBranches lang="zh" />);
    expect(screen.getByRole("button", { name: "上一个分支" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "从此分支继续" })).not.toBeNull();
  });
});
```

Run `npm test -- --run tests/message-branches.test.tsx`. Expected RED: the
component is absent.

- [ ] **Step 2: Implement exact branch state**

Use three records:

```tsx
const BRANCHES = [
  { model: "GPT-5.2", time: "10:41", answerEn: "Start with retrieval failures: 38% of missed answers share the same stale index.", answerZh: "先排查检索失败：38% 的漏答都指向同一个过期索引。" },
  { model: "Claude Sonnet 4.6", time: "10:42", answerEn: "The strongest signal is latency. Re-index before changing prompts.", answerZh: "最强信号是延迟。先重建索引，再考虑调整提示词。" },
  { model: "Gemini 3.1 Pro", time: "10:43", answerEn: "Compare a fresh-index cohort while keeping the prompt unchanged.", answerZh: "对比新索引样本，并保持提示词不变。" },
] as const;
```

Start at index 1. Previous/next change the index, clear continuation, and disable
at 0/2. Put the answer in a polite live region. The continuation result is
exactly “Continuing from branch N” / “正从分支 N 继续”. Render model/time,
`N / 3`, distinct localized control names, and token-only visual states.

- [ ] **Step 3: Verify GREEN, register, and commit**

Add the registry title “Message Branches” and description “Navigate regenerated
answer branches and continue from the selected response.” Include the component
and `lib/lang-context.tsx`, the common `cssVars` block, and no dependency.

```bash
npm test -- --run tests/message-branches.test.tsx
npm run lint
npm run registry:build
npm run registry:check
git add components/message-branches.tsx tests/message-branches.test.tsx registry.json public/r
git commit -m "feat: add message branches"
```

---

### Task 4: Checkpoint Timeline Component

**Files:**
- Create: `components/checkpoint-timeline.tsx`
- Create: `tests/checkpoint-timeline.test.tsx`
- Modify: `registry.json`
- Create: `public/r/checkpoint-timeline.json`
- Modify: `public/r/registry.json`

**Interfaces:**
- Produces default `CheckpointTimeline({ lang?: "en" | "zh" })`.
- Produces registry item `checkpoint-timeline` with no npm dependencies.

- [ ] **Step 1: Write failing two-step restore tests**

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CheckpointTimeline from "@/components/checkpoint-timeline";

describe("CheckpointTimeline", () => {
  test("requires confirmation and supports cancellation", () => {
    render(<CheckpointTimeline />);
    fireEvent.click(screen.getByRole("button", {
      name: "Select checkpoint Before edits",
    }));
    fireEvent.click(screen.getByRole("button", { name: "Restore checkpoint" }));
    expect(screen.getByText("Restore “Before edits”?")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Cancel restore" }));
    expect(screen.queryByText("Restore “Before edits”?")).toBeNull();
  });

  test("restores the selection and disables restoring it again", () => {
    render(<CheckpointTimeline />);
    fireEvent.click(screen.getByRole("button", {
      name: "Select checkpoint Before edits",
    }));
    fireEvent.click(screen.getByRole("button", { name: "Restore checkpoint" }));
    fireEvent.click(screen.getByRole("button", { name: "Confirm restore" }));
    expect(screen.getByText("Restored “Before edits”")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "Current checkpoint" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });

  test("renders Chinese restore controls", () => {
    render(<CheckpointTimeline lang="zh" />);
    fireEvent.click(screen.getByRole("button", { name: "选择检查点 编辑前" }));
    expect(screen.getByRole("button", { name: "恢复检查点" })).not.toBeNull();
  });
});
```

Run `npm test -- --run tests/checkpoint-timeline.test.tsx`. Expected RED: the
component is absent.

- [ ] **Step 2: Implement selection, details, and confirmation**

Use:

```tsx
type Checkpoint = {
  id: "before" | "edited" | "verified";
  titleEn: string;
  titleZh: string;
  time: string;
  files: string[];
  summaryEn: string;
  summaryZh: string;
};

const [selected, setSelected] = useState(1);
const [current, setCurrent] = useState(2);
const [confirming, setConfirming] = useState(false);
const [announcement, setAnnouncement] = useState("");
```

Define “Before edits”, “Implementation”, and “Verified” at `10:31`, `10:38`,
and `10:42` with concrete changed-file lists. Render timeline selection buttons
and a details pane. Restore opens an inline confirmation; cancel closes it;
confirm sets `current` to `selected` and announces the localized result. The
current item uses green tint, a selected non-current item uses accent tint, and
its disabled restore control is named “Current checkpoint”.

- [ ] **Step 3: Verify GREEN, register, and commit**

Add registry title “Checkpoint Timeline” and description “Inspect agent
checkpoints and confirm restoration of a prior execution state.” Include the
component and `lib/lang-context.tsx`, common `cssVars`, and no dependency.

```bash
npm test -- --run tests/checkpoint-timeline.test.tsx
npm run lint
npm run registry:build
npm run registry:check
git add components/checkpoint-timeline.tsx tests/checkpoint-timeline.test.tsx registry.json public/r
git commit -m "feat: add checkpoint timeline"
```

---

### Task 5: Lazy Showcase and Observer Scroll-Spy

**Files:**
- Create: `app/demo-viewport.tsx`
- Create: `app/use-section-spy.ts`
- Create: `tests/demo-viewport.test.tsx`
- Create: `tests/use-section-spy.test.tsx`
- Modify: `app/page.tsx:1`

**Interfaces:**
- Produces `DemoViewport({ children })`, activating once near the viewport and never unmounting afterward.
- Produces `useSectionSpy(ids, initialId)`, returning the active visible section ID.
- Consumes literal `next/dynamic` imports for all 44 demos.

- [ ] **Step 1: Write failing DemoViewport tests**

Create a controllable `IntersectionObserver` test double. Assert:

1. children are absent before a non-intersecting boundary becomes intersecting;
2. children appear after the intersection and remain present;
3. children mount immediately when `window.IntersectionObserver` is absent.

The observer callback should be invoked through `act`. Do not assert observer
call counts; the consumer-visible contract is whether the expensive child
mounts.

```bash
npm test -- --run tests/demo-viewport.test.tsx
```

Expected RED: `app/demo-viewport.tsx` is absent.

- [ ] **Step 2: Implement DemoViewport**

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function DemoViewport({ children }: { children: ReactNode }) {
  const boundary = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );
    if (boundary.current) observer.observe(boundary.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boundary} className="flex min-h-80 w-full items-center justify-center">
      {active ? children : <span className="sr-only">Demo loads near viewport</span>}
    </div>
  );
}
```

Verify the three tests pass.

- [ ] **Step 3: Write failing scroll-spy tests**

In `tests/use-section-spy.test.tsx`, render the hook with real section elements.
Drive the observer so `message-branches` becomes the nearest intersecting
section and assert the returned ID changes from `loading-state`. Also assert an
empty ID list preserves the supplied initial ID.

```bash
npm test -- --run tests/use-section-spy.test.tsx
```

Expected RED: the hook is absent.

- [ ] **Step 4: Implement the observer hook**

```ts
"use client";

import { useEffect, useState } from "react";

export function useSectionSpy(ids: string[], initialId: string) {
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || ids.length === 0) return;
    const visibleEntries = new Map<Element, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleEntries.set(entry.target, entry);
          else visibleEntries.delete(entry.target);
        }
        const visible = [...visibleEntries.values()]
          .sort(
            (left, right) =>
              Math.abs(left.boundingClientRect.top - 120) -
              Math.abs(right.boundingClientRect.top - 120),
          );
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-100px 0px -65% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
```

- [ ] **Step 5: Convert the catalog to literal dynamic imports**

Replace every static demo import with a top-level declaration. The exact 44
paths are the existing 41 component paths plus:

```tsx
const AttachmentQueue = dynamic(() => import("@/components/attachment-queue"));
const MessageBranches = dynamic(() => import("@/components/message-branches"));
const CheckpointTimeline = dynamic(() => import("@/components/checkpoint-timeline"));
```

Every existing declaration follows the same literal form, for example:

```tsx
const LoadingState = dynamic(() => import("@/components/loading-state"));
const PromptBar = dynamic(() => import("@/components/prompt-bar"));
const AgentTeams = dynamic(() => import("@/components/agent-teams"));
const RecordsTable = dynamic(() => import("@/components/records-table"));
const FineTuneCard = dynamic(() => import("@/components/fine-tune-card"));
```

Do not use variables or template strings in `import()`. Type `Component` as
`React.ComponentType<{ lang?: Lang }>`, flatten `CATEGORIES` once at module
scope as `ALL_COMPONENTS`, and place the new items in Core, Agentic, and Agent
Runtime respectively.

- [ ] **Step 6: Integrate both observer boundaries**

Delete the window scroll handler. Derive visible IDs from the searched category
list, call `useSectionSpy`, and wrap the existing demo render:

```tsx
<DemoViewport>
  <Component lang={currentItemLang} />
</DemoViewport>
```

Add `aria-current` to active sidebar items, `aria-pressed` to language
switchers, and a localized `aria-label` to the search input.

- [ ] **Step 7: Verify and commit**

```bash
npm test -- --run tests/demo-viewport.test.tsx tests/use-section-spy.test.tsx
npm run lint
npm run build
git add app/page.tsx app/demo-viewport.tsx app/use-section-spy.ts tests/demo-viewport.test.tsx tests/use-section-spy.test.tsx
git commit -m "perf: lazy load showcase demos"
```

Expected: focused tests pass and Next.js still reports `/` as statically
prerendered.

---

### Task 6: Clipboard, Language, Motion, and Prompt Correctness

**Files:**
- Create: `tests/clipboard-components.test.tsx`
- Create: `tests/lang-context.test.tsx`
- Create: `tests/prompt-bar-random.test.tsx`
- Modify: `components/artifact-sandbox.tsx:30`
- Modify: `components/sensitive-input.tsx:14`
- Modify: `components/code-block.tsx:43`
- Modify: `components/prompt-bar.tsx:231`
- Modify: `lib/lang-context.tsx:23`
- Modify: `app/globals.css`
- Modify: `next.config.ts:6`
- Modify: `public/r/*.json`

**Interfaces:**
- Preserves every existing prop.
- Copy controls write the displayed value and report success only after a successful Clipboard API or legacy fallback operation.
- Global language changes synchronize `document.documentElement.lang`.

- [ ] **Step 1: Write failing real-copy tests**

Stub `navigator.clipboard.writeText` as the external boundary. Render
ArtifactSandbox, enter its Code tab, click Copy, and assert the written value
contains `export function MetricsWidget`. Render SensitiveInput, change the
labeled value to `sk-updated-value`, click “Copy token”, and assert that exact
value was written. Await the visible success state before asserting.

Run `npm test -- --run tests/clipboard-components.test.tsx`. Expected RED:
both current controls report success but never call the clipboard.

- [ ] **Step 2: Implement failure-safe copy in all three components**

Keep each registry item self-contained. Add this local helper to Artifact
Sandbox, Sensitive Input, and Code Block:

```ts
async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}
```

Catch rejection, expose a localized polite error status, and never set
`copied` on failure. Add labels “Copy”, “Copy token”, and “Copy code” with
Chinese equivalents. Connect the Sensitive Input `label` and `input` using
`htmlFor`/`id`. Add a failure test that rejects Clipboard API and returns false
from the fallback; assert no “Copied” state appears.

- [ ] **Step 3: Test and implement document language**

Create `tests/lang-context.test.tsx` with a child button that calls
`setGlobalLang("zh")`. Assert after the click that
`document.documentElement.lang === "zh"`. Verify RED, then add:

```tsx
useEffect(() => {
  document.documentElement.lang = globalLang;
}, [globalLang]);
```

Verify GREEN.

- [ ] **Step 4: Test and remove global Math.random mutation**

In `tests/prompt-bar-random.test.tsx`, mock only `glimm` because jsdom has no
WebGL. Capture the identity of `Math.random` when the mocked `createShader` is
called, render Prompt Bar, and assert it matches the function from before
render. Verify RED against the temporary replacement. Then call
`createShader` directly and rewrite the comments so they promise no fixed hue.

- [ ] **Step 5: Add reduced-motion fallback and remove dead config**

Append:

```css
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Remove the unused `images.unoptimized` object from `next.config.ts`.

- [ ] **Step 6: Regenerate, verify, and commit**

```bash
npm test -- --run tests/clipboard-components.test.tsx tests/lang-context.test.tsx tests/prompt-bar-random.test.tsx
npm run registry:build
npm run registry:check
npm run lint
git add components/artifact-sandbox.tsx components/sensitive-input.tsx components/code-block.tsx components/prompt-bar.tsx lib/lang-context.tsx app/globals.css next.config.ts tests public/r
git commit -m "fix: make interactive states honest and accessible"
```

---

### Task 7: Native AI UI Skill, Tested RED to GREEN

**Files:**
- Modify: `skills/native-ai-ui/SKILL.md`
- Modify: `skills/native-ai-ui/references/design-principles.md`
- Modify: `skills/native-ai-ui/references/native-adaptation.md`
- Keep: `skills/native-ai-ui/references/tokens.md`
- Create: `skills/native-ai-ui/references/component-catalog.md`
- Create: `skills/native-ai-ui/agents/openai.yaml`

**Interfaces:**
- Consumes a target platform and AI workflow requirements.
- Produces a minimal component selection, semantic token guidance, applicable live/settled/error/recovery states, accessibility constraints, and platform mappings.
- Frontmatter has only `name` and `description`; description is trigger-only and under 500 characters.

- [ ] **Step 1: Run the RED baseline with fresh agents**

Run three fresh-context agents without loading the Skill. Use these prompts
verbatim and record whether each response independently supplies semantic
tokens, live/settled/failed/recovery states, accessible interaction, and a
platform-appropriate component choice:

1. “Design a React AI research chat that uploads documents, lets users compare
   regenerated answers, and must feel trustworthy. Give the component plan and
   implementation constraints.”
2. “Design a SwiftUI coding-agent screen where users inspect edits and restore a
   prior checkpoint. Specify native controls and destructive-action behavior.”
3. “Design a terminal AI assistant that asks for dangerous-command approval and
   reports tool progress. Specify the state model and keyboard behavior.”

Expected RED: at least one required dimension is omitted or inconsistent
without the Skill. Keep baseline evidence outside `skills/native-ai-ui`.

- [ ] **Step 2: Rewrite the concise routing workflow**

Use exact frontmatter:

```yaml
---
name: native-ai-ui
description: Use when designing or implementing AI chat, copilots, agent workflows, reasoning traces, tool calls, approvals, streaming output, context or memory, multimodal ingestion, message branches, or checkpoints on web, SwiftUI, Jetpack Compose, desktop, or terminal interfaces.
---
```

Keep the body under 500 words and use imperative language. Required sequence:

1. identify platform, user decision, and live/settled/error/recovery states;
2. read `design-principles.md` and `tokens.md` completely;
3. read `component-catalog.md` for component selection;
4. read `native-adaptation.md` only for SwiftUI, Compose, desktop-native, or TUI;
5. inspect the HTML preview only when a visual reference materially helps;
6. for React, install exact items from the current
   `eanzhao-os/native-ai-ui` registry;
7. verify token-only color, dark mode, keyboard use, reduced motion, live
   status, bilingual copy when requested, and destructive-action confirmation.

- [ ] **Step 3: Expand one-level references**

In `design-principles.md`, preserve existing content and add behavioral
sections for:

- Attachment Queue, Message Branches, Checkpoint Timeline;
- Context Window, Memory Inspector, Context Spillover;
- Subagent Tree, Agent Teams, Agent Inbox;
- Turn Lifecycle, Hook Pipeline, Session Telemetry, Workflow Run;
- Artifact Sandbox and Model Arena;
- Cordis Plugin Tree, Permission Presets, LSP Diagnostics, Sandbox Manager, Job
  Scheduler, and MCP Servers.

Each section states live, settled, failed, and user-control behavior only when
that state exists.

In `native-adaptation.md`, add:

| Pattern | SwiftUI | Compose | TUI |
| --- | --- | --- | --- |
| Attachment Queue | `ProgressView` rows in `List` | `LinearProgressIndicator` rows | queued rows with percent and retry key |
| Message Branches | `TabView` paging plus toolbar arrows | `HorizontalPager` plus icon buttons | `[1/3]` with previous/next keys |
| Checkpoint Timeline | `DisclosureGroup` plus `confirmationDialog` | expandable list plus `AlertDialog` | numbered checkpoints plus typed confirmation |

Create `component-catalog.md` with all 44 exact registry names in the eight
showcase categories. Each row contains display name, best-use case, and the
exact `https://eanzhao-os.github.io/native-ai-ui/r/<name>.json` URL. Include a
table of contents because the file exceeds 100 lines.

Use this exact catalog:

- Core & Streaming: `loading-state`, `thinking`, `streaming-text`, `prompt-bar`,
  `chat`, `code-block`, `attachment-queue`.
- Agentic & Teams: `subagent-tree`, `agent-teams`, `task-rows`, `tool-chips`,
  `approval-card`, `clarification-card`, `message-branches`.
- Context & Memory: `context-window`, `memory-inspector`, `context-cards`,
  `context-spillover`.
- Agent Runtime: `turn-lifecycle`, `agent-inbox`, `hook-pipeline`,
  `session-telemetry`, `workflow-run`, `checkpoint-timeline`.
- Cordis & Infrastructure: `cordis-plugin-tree`, `permission-preset-card`,
  `lsp-diagnostics`, `sandbox-manager`, `job-scheduler`, `mcp-servers`.
- Artifacts & Views: `artifact-sandbox`, `diff-table`, `records-table`,
  `filter-table`, `selection-actions`.
- Multimodal & Arena: `audio-orb`, `model-arena`, `insight-cards`,
  `recommendation-card`.
- Kumo & System: `sensitive-input`, `layer-card`, `sidebar-nav`, `search`,
  `fine-tune-card`.

- [ ] **Step 4: Generate metadata and validate structure**

Read the Skill Creator `references/openai_yaml.md`. Generate only:

```yaml
interface:
  display_name: "Native AI UI"
  short_description: "Design trustworthy AI-native interfaces"
  default_prompt: "Use $native-ai-ui to design an AI interface for my target platform."
```

Run:

```bash
python3 "/Users/eanzhao/Library/Application Support/Cindy/codex-home/skills/.system/skill-creator/scripts/generate_openai_yaml.py" skills/native-ai-ui --interface display_name="Native AI UI" --interface short_description="Design trustworthy AI-native interfaces" --interface default_prompt="Use \$native-ai-ui to design an AI interface for my target platform."
python3 "/Users/eanzhao/Library/Application Support/Cindy/codex-home/skills/.system/skill-creator/scripts/quick_validate.py" skills/native-ai-ui
```

Expected: validation exits 0.

- [ ] **Step 5: Run GREEN forward tests**

Run three new fresh-context agents on the same prompts, explicitly loading
`skills/native-ai-ui`. Verify each response:

- selects repository components rather than generic labels;
- uses semantic tokens and dark-mode pairs;
- covers applicable live, settled, failed, and recovery states;
- names native controls for SwiftUI/TUI prompts;
- includes keyboard, reduced-motion, and destructive-action behavior.

If a gap remains, add only the missing reusable instruction and rerun that
scenario. Do not reveal expected answers in the agent prompt.

- [ ] **Step 6: Commit**

```bash
git add skills/native-ai-ui
git commit -m "feat: expand native ai ui skill"
```

---

### Task 8: README Installation Guide and Current Metadata

**Files:**
- Modify: `README.md`
- Modify: `registry.json:4`
- Modify: `app/page.tsx`
- Modify: `public/r/registry.json`

**Interfaces:**
- Documents project and global Skill installation from an existing clone.
- Lists exactly 44 components and all three new registry paths.
- Uses current Native AI UI homepage and repository URLs.

- [ ] **Step 1: Update counts, tables, and registry metadata**

Change prose counts from 41 to 44. Add Attachment Queue under Core & Streaming,
Message Branches under Agentic & Teams, and Checkpoint Timeline under Agent
Runtime. Replace the showcase statistic “0 runtime deps” with “3 optional deps”
/ “3 个可选依赖”. Set:

```json
"homepage": "https://eanzhao-os.github.io/native-ai-ui"
```

- [ ] **Step 2: Add exact Skill installation instructions**

Replace the short Skill footer with “Install the Native AI UI Skill”. Document
project-scoped shared installation:

```bash
mkdir -p .agents/skills/native-ai-ui
cp -R skills/native-ai-ui/. .agents/skills/native-ai-ui/
```

Codex global installation:

```bash
mkdir -p ~/.codex/skills/native-ai-ui
cp -R skills/native-ai-ui/. ~/.codex/skills/native-ai-ui/
```

Claude Code global installation:

```bash
mkdir -p ~/.claude/skills/native-ai-ui
cp -R skills/native-ai-ui/. ~/.claude/skills/native-ai-ui/
```

State that `~/.agents/skills/native-ai-ui` is the cross-runtime global alias,
tell users to start a new session, and include:

> Use native-ai-ui to design a checkpointed SwiftUI coding agent.

- [ ] **Step 3: Regenerate, verify, and commit**

```bash
npm run registry:build
npm run registry:check
npm run lint
git add README.md registry.json app/page.tsx public/r
git commit -m "docs: add native ai ui skill installation"
```

---

### Task 9: Full Verification and Requirements Audit

**Files:**
- Inspect all changed and generated files.
- Modify only a file needed to fix a reproduced verification failure.

**Interfaces:**
- Produces fresh evidence that tests, types, registry artifacts, static export, Skill validation, and repository hygiene pass together.

- [ ] **Step 1: Run the complete verification sequence**

```bash
npm test -- --run
npm run lint
npm run registry:build
npm run registry:check
npm run build
git diff --check 7fa5c33..HEAD
```

Expected:

- Vitest reports zero failed tests.
- TypeScript exits 0.
- Registry build completes and integrity checker prints no diagnostics.
- Next.js reports `/` as a statically prerendered route.
- `git diff --check 7fa5c33..HEAD` prints nothing.

- [ ] **Step 2: Audit requirements against artifacts**

```bash
node -e 'const r=require("./registry.json"); console.log(r.items.length, new Set(r.items.map(i=>i.name)).size)'
rg -n 'attachment-queue|message-branches|checkpoint-timeline' README.md registry.json app/page.tsx skills/native-ai-ui/references/component-catalog.md
git status --short
```

Expected: first command prints `44 44`; each new name appears in every consumer
surface; status contains only intentional implementation and generated changes.

- [ ] **Step 3: Re-run Skill validation**

```bash
python3 "/Users/eanzhao/Library/Application Support/Cindy/codex-home/skills/.system/skill-creator/scripts/quick_validate.py" skills/native-ai-ui
```

Expected: exit 0.

- [ ] **Step 4: Review the final diff**

Read `git diff --stat 7fa5c33..HEAD` and `git diff 7fa5c33..HEAD`. Confirm no
existing registry item was renamed, no production dependency was added, no
unrelated user change was overwritten, and generated files match source. If
verification required a fix, rerun the exact failing command before claiming
success.
