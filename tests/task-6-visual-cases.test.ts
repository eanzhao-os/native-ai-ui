import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, test } from "vitest";
import { buildCaseInventory } from "../scripts/visual-parity.mjs";
import { CASES } from "./visual/cases.mjs";

const TASK6_COMPONENTS = [
  "subagent-tree",
  "agent-teams",
  "task-rows",
  "tool-chips",
  "approval-card",
  "clarification-card",
  "message-branches",
] as const;

const TASK6_COMPONENT_SET = new Set<string>(TASK6_COMPONENTS);

const EXPECTED_CASES = {
  "subagent-tree": ["running-expanded", "completed-expanded", "focused"],
  "agent-teams": ["initial", "handoff", "completed"],
  "task-rows": ["initial", "details", "failed", "completed", "focused"],
  "tool-chips": ["settled", "detail-open", "collapsed", "focused"],
  "approval-card": ["custom-answer", "multi-select", "submitted", "focused"],
  "clarification-card": ["initial", "alternate", "submitted", "focused"],
  "message-branches": ["first", "last", "continued", "focused"],
} as const;

const TASK6_FOCUS_SOURCES = [
  "components/approval-card.tsx",
  "components/clarification-card.tsx",
  "components/message-branches.tsx",
  "components/tool-chips.tsx",
] as const;

type CallableNode =
  | ts.ArrowFunction
  | ts.FunctionDeclaration
  | ts.FunctionExpression;

type Registration = {
  cases: ts.ArrayLiteralExpression;
  component: string;
};

type VisualSourceViolation = {
  component: string;
  kind: string;
};

function propertyNameText(name: ts.PropertyName | undefined) {
  if (!name) return undefined;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return undefined;
}

function collectCallables(sourceFile: ts.SourceFile) {
  const callables = new Map<string, CallableNode>();
  const visit = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      callables.set(node.name.text, node);
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      (ts.isArrowFunction(node.initializer) ||
        ts.isFunctionExpression(node.initializer))
    ) {
      callables.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return callables;
}

function collectTask6Registrations(sourceFile: ts.SourceFile) {
  const registrations: Registration[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isArrayLiteralExpression(node) &&
      node.elements.length >= 2 &&
      ts.isStringLiteral(node.elements[0]) &&
      TASK6_COMPONENT_SET.has(node.elements[0].text) &&
      ts.isArrayLiteralExpression(node.elements[1])
    ) {
      registrations.push({
        cases: node.elements[1],
        component: node.elements[0].text,
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return registrations;
}

function analyzeTask6VisualSource(source: string) {
  const sourceFile = ts.createSourceFile(
    "cases.mjs",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const callables = collectCallables(sourceFile);
  const registrations = collectTask6Registrations(sourceFile);
  const registrationCounts = new Map<string, number>();
  const violations: VisualSourceViolation[] = [];
  const seenViolations = new Set<string>();

  for (const { component } of registrations) {
    registrationCounts.set(component, (registrationCounts.get(component) ?? 0) + 1);
  }

  const recordViolation = (component: string, kind: string, node: ts.Node) => {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  };

  const inspectReachable = (
    component: string,
    node: ts.Node,
    visitedCallables: Set<string>,
  ) => {
    if (ts.isIdentifier(node)) {
      if (
        /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
          node.text,
        )
      ) {
        recordViolation(component, "stabilization helper", node);
      }
      const callable = callables.get(node.text);
      if (callable && !visitedCallables.has(node.text)) {
        visitedCallables.add(node.text);
        inspectReachable(component, callable, visitedCallables);
      }
    }

    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
      const method = node.expression.name.text;
      if (method === "evaluate" || method === "evaluateHandle") {
        recordViolation(component, "DOM evaluation", node);
      }
      if (
        [
          "after",
          "append",
          "appendChild",
          "before",
          "prepend",
          "remove",
          "removeChild",
          "replaceChild",
          "replaceChildren",
          "replaceWith",
        ].includes(method)
      ) {
        recordViolation(component, "node replacement", node);
      }
      if (method === "setProperty") {
        recordViolation(component, "style mutation", node);
      }
    }

    if (ts.isPropertyAccessExpression(node)) {
      if (node.name.text === "style" || node.name.text === "classList") {
        recordViolation(component, "style mutation", node);
      }
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment &&
      ts.isPropertyAccessExpression(node.left) &&
      ["innerHTML", "innerText", "outerHTML", "textContent"].includes(
        node.left.name.text,
      )
    ) {
      recordViolation(component, "DOM rewrite", node);
    }

    ts.forEachChild(node, (child) =>
      inspectReachable(component, child, visitedCallables),
    );
  };

  for (const registration of registrations) {
    for (const visualCase of registration.cases.elements) {
      if (!ts.isObjectLiteralExpression(visualCase)) continue;
      const action = visualCase.properties.find(
        (property): property is ts.PropertyAssignment =>
          ts.isPropertyAssignment(property) &&
          propertyNameText(property.name) === "action",
      );
      if (action) {
        inspectReachable(
          registration.component,
          action.initializer,
          new Set<string>(),
        );
      }
    }
  }

  return {
    duplicateComponents: [...registrationCounts]
      .filter(([, count]) => count > 1)
      .map(([component]) => component)
      .sort(),
    registrationCounts,
    violations: violations.sort((left, right) =>
      `${left.component}:${left.kind}`.localeCompare(
        `${right.component}:${right.kind}`,
      ),
    ),
  };
}

function tokenBlock(css: string, selector: ":root" | ".dark") {
  const start = css.indexOf(`${selector} {`);
  const end = css.indexOf("}", start);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return css.slice(start, end + 1);
}

function hexToken(block: string, name: string) {
  const match = block.match(
    new RegExp(`--${name}:\\s*(#(?:[0-9a-f]{3}|[0-9a-f]{6}))\\b`, "i"),
  );
  expect(match).not.toBeNull();
  return match![1];
}

function relativeLuminance(hex: string) {
  const normalized =
    hex.length === 4
      ? `#${[...hex.slice(1)].map((channel) => channel.repeat(2)).join("")}`
      : hex;
  const encoded = Number.parseInt(normalized.slice(1), 16);
  const channels = [encoded >> 16, (encoded >> 8) & 0xff, encoded & 0xff];
  const [red, green, blue] = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(left: string, right: string) {
  const luminances = [relativeLuminance(left), relativeLuminance(right)].sort(
    (a, b) => b - a,
  );
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

describe("Task 6 React visual cases", () => {
  test("defines every reviewed Agentic & Teams state explicitly", () => {
    for (const component of TASK6_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK6_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(27 * 2 * 2);
  });

  test("keeps every interactive Task 6 state backed by a real action", () => {
    const staticCases = new Set([
      "subagent-tree/running-expanded",
      "agent-teams/initial",
      "task-rows/initial",
    ]);

    for (const component of TASK6_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        const key = `${component}/${visualCase.name}`;
        expect(typeof visualCase.action === "function").toBe(
          !staticCases.has(key),
        );
      }
    }
  });

  test("rejects duplicate Task 6 registrations in fixtures and the real source", () => {
    const fixture = analyzeTask6VisualSource(`
      const cases = [
        ["tool-chips", [{ name: "first" }]],
        ["tool-chips", [{ name: "second" }]],
      ];
    `);
    expect(fixture.duplicateComponents).toEqual(["tool-chips"]);

    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask6VisualSource(source);
    expect(analysis.duplicateComponents).toEqual([]);
    for (const component of TASK6_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });

  test("rejects dishonest helpers reachable from Task 6 actions", () => {
    const fixture = analyzeTask6VisualSource(`
      async function rewriteCard({ canvas }) {
        await hiddenLegacyHelper(canvas);
      }
      async function hiddenLegacyHelper(canvas) {
        await canvas.evaluate((root) => {
          root.innerHTML = "fabricated";
        });
      }
      const cases = [
        ["approval-card", [{ name: "legacy", action: rewriteCard }]],
      ];
    `);
    expect(fixture.violations.map(({ kind }) => kind)).toEqual([
      "DOM evaluation",
      "DOM rewrite",
    ]);

    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    expect(analyzeTask6VisualSource(source).violations).toEqual([]);
  });

  test("uses keyboard modality for focused states", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");

    expect(source).toContain("await control.focus();");
    expect(source).toContain('keyboard.press("Shift+Tab")');
    expect(source).toContain('keyboard.press("Tab")');
    expect(source).toContain('locator(":focus-visible")');
  });

  test("uses solid focus tokens with at least 3:1 surface contrast", () => {
    for (const path of TASK6_FOCUS_SOURCES) {
      const source = readFileSync(resolve(path), "utf8");
      expect(
        source.match(
          /\b(?:focus|focus-visible|focus-within):ring-accent\/\d+\b/g,
        ) ?? [],
      ).toEqual([]);
      expect(source).toMatch(
        /\b(?:focus|focus-visible|focus-within):ring-accent\b/,
      );
    }

    const css = readFileSync(resolve("app/globals.css"), "utf8");
    for (const selector of [":root", ".dark"] as const) {
      const block = tokenBlock(css, selector);
      const accent = hexToken(block, "accent");
      for (const surface of ["page", "canvas", "surface", "inset", "field"]) {
        expect(
          contrastRatio(accent, hexToken(block, surface)),
        ).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
