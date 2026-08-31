import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, test } from "vitest";
import { buildCaseInventory } from "../scripts/visual-parity.mjs";
import {
  classifyVisualOperation,
  unwrapVisualExpression,
  type VisualOperationResolver,
} from "./visual-action-operation-guard";
import { CASES } from "./visual/cases.mjs";

const TASK8_COMPONENTS = [
  "turn-lifecycle",
  "agent-inbox",
  "hook-pipeline",
  "session-telemetry",
  "workflow-run",
  "checkpoint-timeline",
] as const;

const TASK8_COMPONENT_SET = new Set<string>(TASK8_COMPONENTS);

const EXPECTED_CASES = {
  "turn-lifecycle": ["initial", "settled", "selected", "focused"],
  "agent-inbox": ["initial", "queued", "claimed", "settled", "focused"],
  "hook-pipeline": ["initial", "settled", "approved", "focused"],
  "session-telemetry": ["initial", "folded", "settled"],
  "workflow-run": ["initial", "in-flight", "settled"],
  "checkpoint-timeline": ["initial", "confirming", "settled", "focused"],
} as const;

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
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteralLike(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

function expressionPath(expression: ts.Expression): string[] {
  const current = unwrapVisualExpression(expression);
  if (ts.isIdentifier(current)) return [current.text];
  if (ts.isPropertyAccessExpression(current)) {
    return [...expressionPath(current.expression), current.name.text];
  }
  if (ts.isElementAccessExpression(current)) {
    const property = staticText(current.argumentExpression);
    return property
      ? [...expressionPath(current.expression), property]
      : expressionPath(current.expression);
  }
  return [];
}

function staticText(node: ts.Node | undefined): string | null {
  if (!node) return null;
  if (
    ts.isIdentifier(node) ||
    ts.isStringLiteralLike(node) ||
    ts.isNumericLiteral(node)
  ) {
    return node.text;
  }
  return null;
}

const operationResolver: VisualOperationResolver = {
  arrayItems: (node) => {
    if (!ts.isArrayLiteralExpression(node)) return null;
    if (
      node.elements.some(
        (element) =>
          ts.isSpreadElement(element) || ts.isOmittedExpression(element),
      )
    ) {
      return null;
    }
    return [...node.elements] as ts.Expression[];
  },
  expressionPath,
  staticText,
};

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

function collectTask8Registrations(sourceFile: ts.SourceFile) {
  const registrations: Registration[] = [];
  const arrayBindings = new Map<string, ts.ArrayLiteralExpression>();

  const collectBindings = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      arrayBindings.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, collectBindings);
  };
  collectBindings(sourceFile);

  const resolveArray = (node: ts.Expression | undefined) => {
    if (!node) return undefined;
    const current = unwrapVisualExpression(node);
    if (ts.isArrayLiteralExpression(current)) return current;
    if (ts.isIdentifier(current)) return arrayBindings.get(current.text);
    return undefined;
  };

  const addRegistration = (
    componentNode: ts.Expression | undefined,
    casesNode: ts.Expression | undefined,
  ) => {
    const component = componentNode
      ? unwrapVisualExpression(componentNode)
      : undefined;
    if (
      !component ||
      !ts.isStringLiteralLike(component) ||
      !TASK8_COMPONENT_SET.has(component.text)
    ) {
      return;
    }
    const cases = resolveArray(casesNode);
    if (cases) registrations.push({ cases, component: component.text });
  };

  const visit = (node: ts.Node) => {
    if (ts.isArrayLiteralExpression(node) && node.elements.length === 2) {
      addRegistration(
        node.elements[0] as ts.Expression,
        node.elements[1] as ts.Expression,
      );
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "CASES" &&
      node.expression.name.text === "set"
    ) {
      addRegistration(node.arguments[0], node.arguments[1]);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return registrations;
}

function analyzeTask8VisualSource(source: string) {
  const sourceFile = ts.createSourceFile(
    "cases.mjs",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const callables = collectCallables(sourceFile);
  const registrations = collectTask8Registrations(sourceFile);
  const registrationCounts = new Map<string, number>();
  const violations: VisualSourceViolation[] = [];
  const seenViolations = new Set<string>();

  for (const { component } of registrations) {
    registrationCounts.set(component, (registrationCounts.get(component) ?? 0) + 1);
  }

  const recordViolation = (component: string, kind: string, node: ts.Node) => {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}:${node.end}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  };

  const inspectReachable = (
    component: string,
    node: ts.Node,
    visitedCallables: Set<string>,
  ) => {
    for (const kind of classifyVisualOperation(node, operationResolver)) {
      recordViolation(component, kind, node);
    }

    if (ts.isIdentifier(node)) {
      if (/^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(node.text)) {
        recordViolation(component, "stabilization helper", node);
      }
      const callable = callables.get(node.text);
      if (callable && !visitedCallables.has(node.text)) {
        visitedCallables.add(node.text);
        inspectReachable(component, callable, visitedCallables);
      }
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

describe("Task 8 React visual cases", () => {
  test("defines initial and settled frames for every Agent Runtime component", () => {
    for (const component of TASK8_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK8_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(23 * 2 * 2);
  });

  test("backs every interactive Task 8 frame with a real action", () => {
    const interactiveCases = new Set([
      "turn-lifecycle/selected",
      "turn-lifecycle/focused",
      "agent-inbox/queued",
      "agent-inbox/claimed",
      "agent-inbox/focused",
      "hook-pipeline/approved",
      "hook-pipeline/focused",
      "checkpoint-timeline/confirming",
      "checkpoint-timeline/settled",
      "checkpoint-timeline/focused",
    ]);

    for (const component of TASK8_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        expect(typeof visualCase.action === "function").toBe(
          interactiveCases.has(`${component}/${visualCase.name}`),
        );
      }
    }
  });

  test("rejects reachable Task 8 DOM fabrication and duplicate registrations", () => {
    const fixture = analyzeTask8VisualSource(`
      async function rewrite({ canvas }) {
        await helper(canvas);
      }
      async function helper(canvas) {
        await canvas.evaluate((root) => {
          root.innerHTML = "fabricated";
        });
      }
      const CASES = new Map([
        ["agent-inbox", [{ name: "settled", action: rewrite }]],
      ]);
      CASES.set("agent-inbox", [{ name: "override" }]);
    `);

    expect(fixture.duplicateComponents).toEqual(["agent-inbox"]);
    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        { component: "agent-inbox", kind: "DOM evaluation" },
        { component: "agent-inbox", kind: "DOM rewrite" },
      ]),
    );

    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask8VisualSource(source);
    expect(analysis.duplicateComponents).toEqual([]);
    expect(analysis.violations).toEqual([]);
    for (const component of TASK8_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });
});
