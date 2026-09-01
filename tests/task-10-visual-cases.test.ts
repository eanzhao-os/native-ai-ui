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

const TASK10_COMPONENTS = [
  "artifact-sandbox",
  "diff-table",
  "records-table",
  "filter-table",
  "selection-actions",
] as const;

const TASK10_COMPONENT_SET = new Set<string>(TASK10_COMPONENTS);

const EXPECTED_CASES = {
  "artifact-sandbox": ["preview", "tablet", "mobile", "code", "copied", "focused"],
  "diff-table": ["initial", "removals", "completed", "partial-selected", "applied", "focused"],
  "records-table": ["initial", "selected", "all-selected", "sorted", "scrolled", "focused"],
  "filter-table": ["all", "todo", "progress", "completed", "scrolled", "focused"],
  "selection-actions": ["idle", "expanded", "prompted", "thinking", "streaming", "result", "kept", "focused"],
} as const;

const INTERACTIVE_CASES = new Set([
  "artifact-sandbox/tablet",
  "artifact-sandbox/mobile",
  "artifact-sandbox/code",
  "artifact-sandbox/copied",
  "artifact-sandbox/focused",
  "diff-table/initial",
  "diff-table/removals",
  "diff-table/completed",
  "diff-table/partial-selected",
  "diff-table/applied",
  "diff-table/focused",
  "records-table/selected",
  "records-table/all-selected",
  "records-table/sorted",
  "records-table/scrolled",
  "records-table/focused",
  "filter-table/todo",
  "filter-table/progress",
  "filter-table/completed",
  "filter-table/scrolled",
  "filter-table/focused",
  "selection-actions/expanded",
  "selection-actions/prompted",
  "selection-actions/thinking",
  "selection-actions/streaming",
  "selection-actions/result",
  "selection-actions/kept",
  "selection-actions/focused",
]);

const SCROLLED_CASES = new Set([
  "records-table/scrolled",
  "filter-table/scrolled",
]);

const STREAMING_CASE = "selection-actions/streaming";

const NAMED_POSTCONDITION_CALLS: Record<string, readonly string[]> = {
  "artifact-sandbox/tablet": ["getAttribute"],
  "artifact-sandbox/mobile": ["getAttribute"],
  "artifact-sandbox/code": ["getAttribute", "waitFor"],
  "artifact-sandbox/copied": ["waitFor"],
  "artifact-sandbox/focused": ["count"],
  "diff-table/initial": ["waitFor"],
  "diff-table/removals": ["waitFor"],
  "diff-table/completed": ["waitFor"],
  "diff-table/partial-selected": ["isChecked", "waitFor"],
  "diff-table/applied": ["waitFor"],
  "diff-table/focused": ["count"],
  "records-table/selected": ["isChecked", "waitFor"],
  "records-table/all-selected": ["isChecked", "waitFor"],
  "records-table/sorted": ["getAttribute"],
  "records-table/focused": ["count"],
  "filter-table/todo": ["getAttribute"],
  "filter-table/progress": ["getAttribute"],
  "filter-table/completed": ["getAttribute"],
  "filter-table/focused": ["count"],
  "selection-actions/expanded": ["getAttribute"],
  "selection-actions/prompted": ["inputValue"],
  "selection-actions/thinking": ["waitFor"],
  "selection-actions/result": ["waitFor"],
  "selection-actions/kept": ["waitFor"],
  "selection-actions/focused": ["count"],
};

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

type ActionEvidence = {
  calls: Map<string, number>;
  comparisons: number;
  guards: number;
  throws: number;
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

function collectConstExpressions(sourceFile: ts.SourceFile) {
  const expressions = new Map<string, ts.Expression>();
  for (const statement of sourceFile.statements) {
    if (
      !ts.isVariableStatement(statement) ||
      !(statement.declarationList.flags & ts.NodeFlags.Const)
    ) {
      continue;
    }
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) {
        expressions.set(declaration.name.text, declaration.initializer);
      }
    }
  }
  return expressions;
}

function collectImportedBindings(sourceFile: ts.SourceFile) {
  const bindings = new Set<string>();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !statement.importClause) continue;
    if (statement.importClause.name) bindings.add(statement.importClause.name.text);
    const named = statement.importClause.namedBindings;
    if (named && ts.isNamespaceImport(named)) bindings.add(named.name.text);
    if (named && ts.isNamedImports(named)) {
      for (const element of named.elements) bindings.add(element.name.text);
    }
  }
  return bindings;
}

function collectLocalBindings(sourceFile: ts.SourceFile) {
  const bindings = new Set<string>();
  const addBindingName = (name: ts.BindingName) => {
    if (ts.isIdentifier(name)) {
      bindings.add(name.text);
      return;
    }
    for (const element of name.elements) {
      if (!ts.isOmittedExpression(element)) addBindingName(element.name);
    }
  };
  const visit = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name) bindings.add(node.name.text);
    if (ts.isVariableDeclaration(node)) addBindingName(node.name);
    if (ts.isParameter(node)) addBindingName(node.name);
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return bindings;
}

function memberRootName(expression: ts.Expression): string | null {
  const current = unwrapVisualExpression(expression);
  if (ts.isIdentifier(current)) return current.text;
  if (
    ts.isPropertyAccessExpression(current) ||
    ts.isElementAccessExpression(current)
  ) {
    return memberRootName(current.expression);
  }
  if (ts.isCallExpression(current)) return memberRootName(current.expression);
  if (ts.isAwaitExpression(current)) return memberRootName(current.expression);
  return null;
}

function collectTask10Registrations(sourceFile: ts.SourceFile) {
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
      !TASK10_COMPONENT_SET.has(component.text)
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

function analyzeTask10VisualSource(source: string) {
  const sourceFile = ts.createSourceFile(
    "cases.mjs",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const callables = collectCallables(sourceFile);
  const constExpressions = collectConstExpressions(sourceFile);
  const importedBindings = collectImportedBindings(sourceFile);
  const localBindings = collectLocalBindings(sourceFile);
  const registrations = collectTask10Registrations(sourceFile);
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
    evidence: ActionEvidence,
  ) => {
    for (const kind of classifyVisualOperation(node, operationResolver)) {
      recordViolation(component, kind, node);
    }

    if (ts.isCallExpression(node)) {
      const callee = unwrapVisualExpression(node.expression);
      const name = ts.isPropertyAccessExpression(callee)
        ? callee.name.text
        : ts.isElementAccessExpression(callee)
          ? staticText(callee.argumentExpression)
          : ts.isIdentifier(callee)
            ? callee.text
            : null;
      if (name) evidence.calls.set(name, (evidence.calls.get(name) ?? 0) + 1);

      if (ts.isIdentifier(callee) && callee.text !== "advance") {
        const target = callables.get(callee.text) ?? constExpressions.get(callee.text);
        if (!target) {
          recordViolation(
            component,
            importedBindings.has(callee.text)
              ? "imported action helper"
              : "unresolved action helper",
            callee,
          );
        }
      } else if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        const root = memberRootName(callee.expression);
        if (root && importedBindings.has(root)) {
          recordViolation(component, "imported action helper", callee);
        } else if (root && !localBindings.has(root)) {
          recordViolation(component, "unresolved action helper", callee);
        }
      }
    }
    if (ts.isBinaryExpression(node)) evidence.comparisons += 1;
    if (ts.isIfStatement(node)) evidence.guards += 1;
    if (ts.isThrowStatement(node)) evidence.throws += 1;

    if (ts.isIdentifier(node)) {
      if (/^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(node.text)) {
        recordViolation(component, "stabilization helper", node);
      }
      const target = callables.get(node.text) ?? constExpressions.get(node.text);
      if (target && !visitedCallables.has(node.text)) {
        visitedCallables.add(node.text);
        inspectReachable(component, target, visitedCallables, evidence);
      }
    }

    ts.forEachChild(node, (child) =>
      inspectReachable(component, child, visitedCallables, evidence),
    );
  };

  const resolveObjectLiteral = (
    expression: ts.Expression,
    visiting: Set<string>,
  ): ts.ObjectLiteralExpression | null => {
    const current = unwrapVisualExpression(expression);
    if (ts.isObjectLiteralExpression(current)) return current;
    if (!ts.isIdentifier(current) || visiting.has(current.text)) return null;
    const initializer = constExpressions.get(current.text);
    if (!initializer) return null;
    visiting.add(current.text);
    const resolved = resolveObjectLiteral(initializer, visiting);
    visiting.delete(current.text);
    return resolved;
  };

  const resolveCaseName = (visualCase: ts.ObjectLiteralExpression) => {
    for (const property of visualCase.properties) {
      if (
        propertyNameText(property.name) === "name" &&
        ts.isPropertyAssignment(property)
      ) {
        const value = unwrapVisualExpression(property.initializer);
        if (ts.isStringLiteralLike(value)) return value.text;
      }
    }
    return null;
  };

  const resolveCaseAction = (
    component: string,
    visualCase: ts.ObjectLiteralExpression,
    visiting: Set<string>,
    activeObjects = new Set<ts.ObjectLiteralExpression>(),
  ): ts.Node | null => {
    if (activeObjects.has(visualCase)) {
      recordViolation(component, "unsupported action syntax", visualCase);
      return null;
    }
    activeObjects.add(visualCase);
    let action: ts.Node | null = null;
    for (const property of visualCase.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = resolveObjectLiteral(property.expression, visiting);
        if (!spread) {
          recordViolation(component, "unsupported action syntax", property);
          continue;
        }
        const spreadAction = resolveCaseAction(
          component,
          spread,
          visiting,
          activeObjects,
        );
        if (spreadAction) action = spreadAction;
        continue;
      }

      const name = propertyNameText(property.name);
      if (!name) {
        if (property.name && ts.isComputedPropertyName(property.name)) {
          recordViolation(component, "unsupported action syntax", property);
        }
        continue;
      }
      if (name !== "action") continue;

      if (ts.isPropertyAssignment(property)) {
        action = property.initializer;
      } else if (ts.isShorthandPropertyAssignment(property)) {
        action = property.name;
      } else if (ts.isMethodDeclaration(property)) {
        action = property;
      } else {
        recordViolation(component, "unsupported action syntax", property);
      }
    }
    activeObjects.delete(visualCase);
    return action;
  };

  const hasCall = (evidence: ActionEvidence, name: string, minimum = 1) =>
    (evidence.calls.get(name) ?? 0) >= minimum;

  const validatePostcondition = (
    component: string,
    caseName: string | null,
    evidence: ActionEvidence,
    node: ts.Node,
  ) => {
    if (!caseName) return;
    const key = `${component}/${caseName}`;
    if (!INTERACTIVE_CASES.has(key)) return;

    if (SCROLLED_CASES.has(key)) {
      if (
        !hasCall(evidence, "wheel") ||
        !hasCall(evidence, "boundingBox", 2) ||
        evidence.comparisons === 0 ||
        evidence.guards === 0 ||
        evidence.throws === 0
      ) {
        recordViolation(
          component,
          "missing scroll displacement postcondition",
          node,
        );
      }
      return;
    }

    if (key === STREAMING_CASE) {
      if (
        !hasCall(evidence, "textContent") ||
        !hasCall(evidence, "trim") ||
        evidence.guards === 0 ||
        evidence.throws === 0
      ) {
        recordViolation(
          component,
          "missing visible streaming postcondition",
          node,
        );
      }
      return;
    }

    const requiredCalls = NAMED_POSTCONDITION_CALLS[key];
    if (
      !requiredCalls ||
      requiredCalls.some((name) => !hasCall(evidence, name))
    ) {
      recordViolation(component, "missing named state postcondition", node);
    }
  };

  for (const registration of registrations) {
    for (const visualCase of registration.cases.elements) {
      if (ts.isSpreadElement(visualCase) || ts.isOmittedExpression(visualCase)) {
        recordViolation(
          registration.component,
          "unsupported action syntax",
          visualCase,
        );
        continue;
      }
      const resolvedCase = resolveObjectLiteral(visualCase, new Set<string>());
      if (!resolvedCase) {
        recordViolation(
          registration.component,
          "unsupported action syntax",
          visualCase,
        );
        continue;
      }
      const caseName = resolveCaseName(resolvedCase);
      const action = resolveCaseAction(
        registration.component,
        resolvedCase,
        new Set<string>(),
      );
      const evidence: ActionEvidence = {
        calls: new Map(),
        comparisons: 0,
        guards: 0,
        throws: 0,
      };
      if (action) {
        const current = ts.isExpression(action)
          ? unwrapVisualExpression(action)
          : action;
        if (ts.isIdentifier(current)) {
          const target = callables.get(current.text) ?? constExpressions.get(current.text);
          if (!target) {
            recordViolation(
              registration.component,
              importedBindings.has(current.text)
                ? "imported action helper"
                : "unresolved action helper",
              current,
            );
          }
        }
        inspectReachable(
          registration.component,
          action,
          new Set<string>(),
          evidence,
        );
      }
      validatePostcondition(
        registration.component,
        caseName,
        evidence,
        action ?? resolvedCase,
      );
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

describe("Task 10 React visual cases", () => {
  test("defines every honest Artifacts & Views state exactly once", () => {
    for (const component of TASK10_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK10_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(32 * 2 * 2);
  });

  test("backs every interactive Task 10 frame with a real action", () => {
    for (const component of TASK10_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        expect(typeof visualCase.action === "function").toBe(
          INTERACTIVE_CASES.has(`${component}/${visualCase.name}`),
        );
      }
    }
  });

  test("classifies reachable Task 10 fabrication hidden behind helpers and spreads", () => {
    const fixture = analyzeTask10VisualSource(`
      async function rewrite({ canvas }) {
        await helper(canvas);
      }
      async function helper(canvas) {
        await canvas.evaluate((root) => {
          root.innerHTML = "fabricated";
        });
      }
      const spreadAction = { action: rewrite };
      const CASES = new Map([
        ["artifact-sandbox", [{ name: "settled", ...spreadAction }]],
      ]);
      CASES.set("artifact-sandbox", [{ name: "override" }]);
    `);

    expect(fixture.duplicateComponents).toEqual(["artifact-sandbox"]);
    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        { component: "artifact-sandbox", kind: "DOM evaluation" },
        { component: "artifact-sandbox", kind: "DOM rewrite" },
      ]),
    );
  });

  test("accepts Task 10 actions that drive controls and prove their named state", () => {
    const fixture = analyzeTask10VisualSource(`
      async function action({ canvas, page }) {
        const control = canvas.getByRole("button", { name: "Apply" });
        await control.click();
        await control.focus();
        await page.keyboard.press("Enter");
        await page.mouse.wheel(800, 400);
        await canvas.getByText("Applied 2 changes").waitFor();
      }
      const CASES = new Map([
        ["diff-table", [{ name: "applied", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("rejects an interactive named state backed by a no-op action", () => {
    const fixture = analyzeTask10VisualSource(`
      const CASES = new Map([
        ["artifact-sandbox", [{ name: "tablet", action: async () => {} }]],
      ]);
    `);

    expect(fixture.violations).toContainEqual({
      component: "artifact-sandbox",
      kind: "missing named state postcondition",
    });
  });

  test("rejects a scrolled state that never proves scroll displacement", () => {
    const fixture = analyzeTask10VisualSource(`
      async function action({ canvas, page }) {
        const region = canvas.getByRole("region", { name: "Companies table" });
        await region.hover();
        await page.mouse.wheel(900, 900);
      }
      const CASES = new Map([
        ["records-table", [{ name: "scrolled", action }]],
      ]);
    `);

    expect(fixture.violations).toContainEqual({
      component: "records-table",
      kind: "missing scroll displacement postcondition",
    });
  });

  test("rejects a streaming state that can settle on blank selected text", () => {
    const fixture = analyzeTask10VisualSource(`
      async function action({ advance, canvas }) {
        await canvas.getByRole("button", { name: "Improve" }).click();
        await advance(760);
        await canvas.getByText("Improving").waitFor();
      }
      const CASES = new Map([
        ["selection-actions", [{ name: "streaming", action }]],
      ]);
    `);

    expect(fixture.violations).toContainEqual({
      component: "selection-actions",
      kind: "missing visible streaming postcondition",
    });
  });

  test.each([
    ["unresolved", "async function action() { await missingHelper(); }"],
    ["unresolved member", "async function action() { await missingHelper.run(); }"],
    [
      "imported",
      'import { importedHelper } from "./visual-helper.mjs"; async function action() { await importedHelper(); }',
    ],
    [
      "imported member",
      'import * as importedHelper from "./visual-helper.mjs"; async function action() { await importedHelper.run(); }',
    ],
  ])("rejects an %s action helper", (_label, declaration) => {
    const fixture = analyzeTask10VisualSource(`
      ${declaration}
      const CASES = new Map([
        ["artifact-sandbox", [{ name: "tablet", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        {
          component: "artifact-sandbox",
          kind: expect.stringMatching(/^(?:imported|unresolved) action helper$/),
        },
      ]),
    );
  });

  test("rejects reachable fabrication and duplicate registrations in the live manifest", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask10VisualSource(source);
    expect(analysis.duplicateComponents).toEqual([]);
    expect(analysis.violations).toEqual([]);
    for (const component of TASK10_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });
});
