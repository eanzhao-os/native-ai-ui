# Task 7 Visual Action Guard Design

**Date:** 2026-08-31
**Status:** Approved in chat

## Context

Task 7 freezes the React visuals for Context Window, Memory Inspector, Context Cards, and Context Spillover. Its visual actions must interact with the rendered component honestly through Playwright locators. They must not fabricate the expected screenshot by rewriting, replacing, constructing, hiding, or directly evaluating DOM.

The original Task 7 source guard grew into a test-local abstract interpreter. Successive review rounds added imported-value provenance, wrapper calls, assignments, accessors, callbacks, cycles, switch flow, and loop replay. Adversarial review then found additional unsound cases involving default initializers, call instances, accessor execution, callback overloads, abrupt completion, evaluation order, and budget exhaustion. Continuing to model arbitrary JavaScript inside one Vitest file is not a convergent or maintainable boundary.

The live Task 7 actions do not need arbitrary JavaScript. They use top-level functions inside the existing Task 7 marker, immutable local values, Playwright-derived objects, direct local helper calls, `if`, one `for…of`, `await`, and `throw`. The guard will therefore validate that strict, auditable subset and fail closed for every unsupported executable form.

## Decision

Replace the Task 7 abstract interpreter with a marker-scoped, allowlisted source guard.

The guard will not attempt to prove arbitrary JavaScript safe. It will accept the syntax and data flow used by the live Task 7 actions and reject unsupported complexity with a deterministic violation. Future syntax is added only when a real visual action needs it and a focused positive and negative test define its boundary.

Extract the operation-classification logic already hardened by Task 4 into a shared test helper. Task 4 and Task 7 retain separate thin adapters because their registration, authority, and evaluation policies differ.

## Goals

1. Keep every live Task 7 action and registration valid without changing visual behavior or screenshots.
2. Fail closed for external, imported, unbound, dynamic, mutable, callback-driven, accessor-driven, or otherwise unsupported action code.
3. Share one DOM-operation classifier between Task 4 and Task 7.
4. Remove the duplicated Task 7 abstract interpreter and its flow/cycle/call-instance state.
5. Terminate deterministically on every fixture without stack overflow or silent budget exhaustion.
6. Make the accepted language small enough to understand by reading the guard and its table-driven tests.

## Non-goals

- Do not support arbitrary JavaScript control flow or implement a control-flow graph, SSA, taint engine, or general abstract interpreter.
- Do not introduce an action DSL in this task.
- Do not change `tests/visual/cases.mjs` behavior, Task 7 copy, components, registry output, or captures.
- Do not weaken Task 4 clipboard evaluation validation or marker/inventory rules.
- Do not add production dependencies.
- Do not generalize the guard for Tasks 8–12 before those tasks demonstrate a concrete need.

## Architecture

### Shared visual-operation kernel

Create `tests/visual-action-operation-guard.ts` as the small shared test-only module. It owns pure AST helpers and operation classification:

- transparent expression unwrapping;
- static property/member text extraction;
- `.call()` / `.apply()` invocation normalization;
- expression-path extraction;
- DOM rewrite properties;
- style, dataset, class, and hiding properties/methods;
- node replacement and insertion methods;
- DOM construction methods and constructors;
- destructive `Object` and `Reflect` forms;
- assignment, update, delete, `new`, and tagged-template classification.

The kernel accepts AST nodes and returns operation categories. It does not resolve registrations, decide trust, walk helper functions, or know Task numbers.

### Task 4 adapter

`tests/visual-parity-runner.test.ts` keeps responsibility for:

- Task 4 action and registration marker ranges;
- exact Task 4 inventory;
- helper-region authority;
- the `feedback-actions/copy-error` clipboard setup/restore exception and structural hashes;
- Task 4-specific violation names.

Its existing operation tables and invocation normalization move to the shared kernel. Existing Task 4 tests remain behaviorally unchanged.

### Task 7 adapter

`tests/task-7-visual-cases.test.ts` keeps responsibility for:

- locating the Task 7 action and registration markers;
- resolving the static `TASK7_CASES` registration array and its registration spread;
- enforcing exactly one registration for each Task 7 component;
- resolving action functions and local helpers inside the Task 7 action marker;
- validating the strict action-language contract;
- delegating forbidden operation detection to the shared kernel;
- reporting deterministic violations.

The Task 7 adapter does not retain `Origin`, `OriginContext`, flow merges, call-instance contexts, accessor provenance, callback policies, or origin-work budgets.

## Task 7 Action-Language Contract

### Authority boundary

Every registered Task 7 action and every helper it calls must resolve to a top-level function declared inside:

```text
/* TASK 7 VISUAL ACTIONS START */
...
/* TASK 7 VISUAL ACTIONS END */
```

A helper outside the marker, an imported function, an unbound identifier, a dynamic member, or an unresolved target produces a violation. Nested function declarations and function factories are unsupported.

The registration adapter reads only the existing Task 7 registration marker and resolves the static spread of `TASK7_CASES`. Dynamic registration construction fails closed.

### Allowed statements

The initial accepted statement set is exactly what live Task 7 uses:

- blocks;
- top-level marker function declarations;
- `const` variable declarations;
- expression statements;
- `if` / `else`;
- `for…of` with a `const` loop binding;
- `throw`;
- `await` within allowed expressions.

`return`, `break`, and `continue` are unsupported. Marker helpers are effect-only async procedures whose calls are directly awaited and whose result is discarded.

### Allowed values and expressions

The guard accepts only these parameter forms:

- registered action roots use a flat, noncomputed object pattern containing `canvas` or `canvas` plus `page`;
- marker helper parameters are identifiers or flat, noncomputed object patterns;
- defaults, rest elements, nested or aliased binding patterns, generators, and `this` parameters are rejected.

The accepted expression set is:

- identifiers already accepted by the current action/helper scope;
- Playwright member reads on trusted runner-derived values, including the live data properties `keyboard`, `length`, `width`, and `height`;
- direct calls to marker-contained helpers only as an awaited expression statement whose result is discarded;
- direct member calls on accepted values using the exact live method allowlist: `all`, `and`, `boundingBox`, `click`, `count`, `fill`, `first`, `focus`, `getAttribute`, `getByRole`, `getByText`, `locator`, `press`, `toFixed`, and `waitFor`;
- literals, regular expressions, template strings, `await`, unary `!`, and the binary operators `<`, `!==`, and `||`;
- object and array literals composed only of accepted values, with shorthand or ordinary noncomputed properties;
- `new Error(...)` only.

Optional chaining, bracket invocation, `.call()`, and `.apply()` are normalized by the shared kernel so their operation can be diagnosed, but Task 7 rejects them unless a later spec explicitly adds the exact form. Accessors declared or resolved in analyzed source are rejected; ordinary Playwright member access is trusted as part of the runner API contract.

Local `const` bindings are resolved lazily through their initializer with separate `visiting` and `resolved` sets. Re-entering a `visiting` node is a cycle; reading a `resolved` node is not. Unused declarations are not expanded, so an irrelevant cycle cannot crash or poison an action.

### Rejected executable forms

The adapter rejects these forms even when a particular instance might be harmless:

- `let` or `var` inside Task 7 action code;
- assignment operators, compound/logical assignment, update expressions, and delete;
- parameter defaults, rest parameters/elements, nested or aliased patterns, generators, and `this` parameters;
- `return`, `break`, and `continue`;
- getters, setters, object/class methods used as values, and computed accessor names;
- function/arrow expressions inside action bodies;
- function factories, returned closures, bound functions, and per-call closure instances;
- `switch`, `while`, classic `for`, `for…in`, and `do…while`;
- `try` / `catch` / `finally`;
- callbacks to runner methods, conditional callback registration, and callback values passed through spreads;
- dynamic property names or indexes, optional chaining, bracket invocation, `.call()`, and `.apply()`;
- member calls outside the exact Task 7 method allowlist;
- spread syntax inside executable action expressions;
- tagged templates;
- every constructor except direct `new Error(...)`;
- `eval`, `Function`, dynamic import, and direct page/canvas evaluation;
- any AST node not explicitly handled by the allowed visitor.

Unsupported syntax produces `unsupported action syntax` or a more specific shared-kernel violation. It never falls through as accepted.

### Trusted data flow

The action root begins with trusted runner arguments. Starting from registered actions, the adapter follows only reachable direct helper calls. Each reachable helper call is checked at the call site; every argument must be an accepted expression, and helper recursion—direct or indirect—is an `unresolved action helper` violation. Unused functions and declarations are not inspected.

Marker helpers are effect-only: each helper call is directly awaited as an expression statement, helper return values are not consumed, and explicit `return` is unsupported. Parameters are treated as accepted only for the duration of a validated call edge.

Because mutable bindings, factories, nested functions, analyzed-source accessors, and callback values are rejected, the adapter does not simulate reassignment, closure instances, getter execution, callback overloads, switch fallthrough, or loop fixed points.

The accepted `for…of` iterator must be an accepted local or runner-derived value. Its `const` element binding is treated as derived from that iterable for the loop body.

## Violation Semantics

The guard preserves specific operation categories where they help diagnose dishonest visuals:

- `DOM rewrite`;
- `node replacement`;
- `DOM construction`;
- `style or hiding mutation`;
- `DOM evaluation`;
- `external action helper`;
- `unresolved action helper`;
- `unresolved action registration`;
- `unsupported action syntax`.

Violations are deduplicated by component, category, and source location. Unsupported or unresolved code is always a violation.

Static resolution maintains separate `visiting` and `resolved` sets per registered action and a ceiling of 256 resolution edges. Resolving an identifier, declaration initializer, registration spread, action target, or helper-call target consumes one edge. A cycle or ceiling reached while resolving action code emits `unresolved action helper` at the requesting reference/call; an outside/imported function emits `external action helper` at the call; an unbound or dynamic target emits `unresolved action helper`; and the equivalent failures in registration discovery emit `unresolved action registration` at the registration entry. Exhaustion cannot silently return an accepted fallback.

## Migration

1. Freeze the current Task 7 live source and 56 React captures as the behavioral baseline.
2. Add shared-kernel characterization tests from the existing Task 4 operation matrix.
3. Extract the Task 4 operation kernel without changing Task 4 results.
4. Replace `analyzeTask7VisualSource()` with the strict marker-scoped adapter.
5. Keep focused positive fixtures for every syntax form used by live Task 7 actions.
6. Convert the complex round-review fixtures to table-driven fail-closed expectations. They prove that assignments, cycles, accessors, factories, callbacks, dynamic members, and unsupported control flow are rejected; they no longer require arbitrary-JavaScript precision.
7. Delete the Task 7 origin graph, call-context, callback-policy, assignment-flow, branch-merge, and loop-replay implementation.
8. Verify that `tests/visual/cases.mjs` needs no behavioral or textual change. If a live construct falls outside the approved subset, stop and amend this design before implementation rather than silently widening the language or rewriting the live action.

The current experimental uncommitted interpreter changes are not an implementation baseline and must not be staged as the final solution.

## Testing

### Shared kernel

Table-driven tests cover direct, optional, bracket, `.call()`, and `.apply()` forms for every forbidden operation family. Task 4’s existing operation cases remain green after extraction.

### Task 7 positive fixtures

Positive fixtures mirror live patterns:

- root action destructuring;
- marker-contained direct helper calls;
- object argument forwarding;
- runner-derived property and method chains;
- `const` aliases;
- `if` checks and throws;
- `for…of` over a runner-derived list;
- static registration array/spread;
- all four live component registrations with zero violations.

### Task 7 fail-closed fixtures

Table-driven negatives cover:

- imported, external, unbound, and dynamic helpers;
- `let`/`var`, all assignment forms, and updates;
- self/mutual/forward object, array, spread, and return cycles when referenced;
- getters, setters, computed accessors, factories, and closures;
- direct, aliased, spread, factory, and unknown runner callbacks;
- `switch`, loop backedges, abrupt-completion variants, and default side effects;
- constructor, tagged-template, callback, and evaluation bypasses;
- ambiguous registration members and dynamic registration construction;
- static-resolution cycle and ceiling exhaustion.

These fixtures assert a violation and deterministic termination. They do not require the guard to reproduce JavaScript runtime state.

### Required verification

```bash
npm test -- --run tests/task-7-visual-cases.test.ts tests/visual-parity-runner.test.ts tests/context-memory.test.tsx --no-file-parallelism
npm run typecheck
npm run vanilla:styles
npm run vanilla:styles:check
npm run registry:build
npm run registry:check
npm run build
npm run visual:capture:react -- --components context-window,memory-inspector,context-cards,context-spillover
python3 - <<'PY'
from pathlib import Path
from PIL import Image, ImageChops

baseline = Path('.artifacts/task7-fix-round-4-exact-react')
current = Path('.artifacts/visual-parity')
images = sorted(baseline.glob('*__react.png'))
assert len(images) == 56, len(images)
for expected in images:
    actual = current / expected.name
    assert actual.is_file(), actual
    with Image.open(expected).convert('RGBA') as left, Image.open(actual).convert('RGBA') as right:
        assert left.size == right.size, expected.name
        assert ImageChops.difference(left, right).getbbox() is None, expected.name
PY
```

The capture command must produce 56/56 successful React captures. The named `.artifacts/task7-fix-round-4-exact-react` baseline is authoritative for this replacement, and all 56 new RGBA images must have zero mismatched pixels.

## Acceptance Criteria

- The Task 7 abstract interpreter and its origin/flow/callback machinery are removed.
- The shared operation kernel is used by both Task 4 and Task 7 adapters.
- Existing Task 4 guard behavior and clipboard exception remain unchanged.
- All live Task 7 actions and exactly four Task 7 registrations pass with zero violations.
- Every unsupported executable form fails closed with a deterministic violation.
- Referenced cycles and resolution ceilings terminate without stack overflow; unused unsupported declarations are not eagerly expanded.
- No production component, copy, registry data, visual case behavior, or capture output changes.
- Focused tests, type checking, generators/checks, build, and all 56 Task 7 captures pass.
- The implementation diff is limited to `tests/visual-action-operation-guard.ts`, `tests/visual-parity-runner.test.ts`, and `tests/task-7-visual-cases.test.ts`; planning records are handled separately, and unrelated working-tree changes remain untouched.

## Deferred Upgrade Path

If a future visual action genuinely needs syntax outside this subset, add the smallest explicit rule with one live-style positive fixture and one adversarial negative fixture. If multiple future tasks require richer action composition, design a declarative action DSL as a separate project. Do not restart incremental arbitrary-JavaScript interpretation inside a test file.
