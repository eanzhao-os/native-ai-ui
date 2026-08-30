import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, test } from "vitest";
import { buildCaseInventory } from "../scripts/visual-parity.mjs";
import { CASES } from "./visual/cases.mjs";

const TASK7_COMPONENTS = [
  "context-window",
  "memory-inspector",
  "context-cards",
  "context-spillover",
] as const;

const TASK7_COMPONENT_SET = new Set<string>(TASK7_COMPONENTS);

const EXPECTED_CASES = {
  "context-window": ["initial", "selected", "pruned", "focused"],
  "memory-inspector": ["all", "rules", "search", "focused"],
  "context-cards": ["initial", "sources-ready"],
  "context-spillover": [
    "compacted",
    "first-hydrated",
    "second-hydrated",
    "focused",
  ],
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

function collectTask7Registrations(sourceFile: ts.SourceFile) {
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

  const resolveCases = (node: ts.Expression | undefined) => {
    if (!node) return undefined;
    if (ts.isArrayLiteralExpression(node)) return node;
    if (ts.isIdentifier(node)) return arrayBindings.get(node.text);
    return undefined;
  };

  const addRegistration = (
    componentNode: ts.Expression | undefined,
    casesNode: ts.Expression | undefined,
  ) => {
    if (
      !componentNode ||
      !ts.isStringLiteral(componentNode) ||
      !TASK7_COMPONENT_SET.has(componentNode.text)
    ) {
      return;
    }
    const cases = resolveCases(casesNode);
    if (!cases) return;
    registrations.push({ cases, component: componentNode.text });
  };

  const visit = (node: ts.Node) => {
    if (ts.isArrayLiteralExpression(node) && node.elements.length >= 2) {
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

function analyzeTask7VisualSource(source: string) {
  const sourceFile = ts.createSourceFile(
    "cases.mjs",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const callables = collectCallables(sourceFile);
  const registrations = collectTask7Registrations(sourceFile);
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
      ["hidden", "innerHTML", "innerText", "outerHTML", "textContent"].includes(
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

describe("Task 7 React visual cases", () => {
  test("defines every reviewed Context & Memory state explicitly", () => {
    for (const component of TASK7_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK7_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(14 * 2 * 2);
  });

  test("backs every interactive state with a real action", () => {
    const staticCases = new Set([
      "context-window/initial",
      "memory-inspector/all",
      "context-cards/initial",
      "context-cards/sources-ready",
      "context-spillover/compacted",
    ]);

    for (const component of TASK7_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        const key = `${component}/${visualCase.name}`;
        expect(typeof visualCase.action === "function").toBe(
          !staticCases.has(key),
        );
      }
    }
  });

  test("rejects duplicate Task 7 registrations and reachable DOM fabrication", () => {
    const fixture = analyzeTask7VisualSource(`
      async function rewriteCard({ canvas }) {
        await hiddenLegacyHelper(canvas);
      }
      async function hiddenLegacyHelper(canvas) {
        await canvas.evaluate((root) => {
          root.innerHTML = "fabricated";
        });
      }
      const directCases = [{ name: "direct", action: rewriteCard }];
      const CASES = new Map([
        ["memory-inspector", [{ name: "tuple" }]],
      ]);
      CASES.set("memory-inspector", directCases);
    `);
    expect(fixture.duplicateComponents).toEqual(["memory-inspector"]);
    expect(fixture.violations.map(({ kind }) => kind)).toEqual([
      "DOM evaluation",
      "DOM rewrite",
    ]);

    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask7VisualSource(source);
    expect(analysis.duplicateComponents).toEqual([]);
    for (const component of TASK7_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
    expect(analysis.violations).toEqual([]);
  });
});
