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

const TASK9_COMPONENTS = [
  "cordis-plugin-tree",
  "permission-preset-card",
  "lsp-diagnostics",
  "sandbox-manager",
  "job-scheduler",
  "mcp-servers",
] as const;

const TASK9_COMPONENT_SET = new Set<string>(TASK9_COMPONENTS);
const TASK9_ACTION_START = "/* TASK 9 VISUAL ACTIONS START */";
const TASK9_ACTION_END = "/* TASK 9 VISUAL ACTIONS END */";
const TASK9_REGISTRATION_START = "/* TASK 9 VISUAL REGISTRATIONS START */";
const TASK9_REGISTRATION_END = "/* TASK 9 VISUAL REGISTRATIONS END */";

const EXPECTED_CASES = {
  "cordis-plugin-tree": [
    "initial",
    "second-expanded",
    "hmr-reloaded",
    "disabled",
    "focused",
  ],
  "permission-preset-card": [
    "balanced",
    "strict-selected",
    "audit-verifying",
    "audit-verified",
    "focused",
  ],
  "lsp-diagnostics": ["initial", "warnings", "fixing", "fixed", "focused"],
  "sandbox-manager": [
    "initial",
    "process-open",
    "restarting",
    "restarted",
    "focused",
  ],
  "job-scheduler": ["initial", "disabled", "triggering", "completed", "focused"],
  "mcp-servers": [
    "initial",
    "tools-open",
    "error-open",
    "retrying",
    "recovered",
    "focused",
  ],
} as const;

type CallableNode =
  | ts.ArrowFunction
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.MethodDeclaration;

const SAFE_TASK9_MEMBER_CALLS = new Set([
  "and",
  "boundingBox",
  "click",
  "count",
  "focus",
  "getAttribute",
  "getByRole",
  "getByText",
  "includes",
  "isChecked",
  "isDisabled",
  "locator",
  "press",
  "toFixed",
  "waitFor",
]);

type Registration = {
  cases: ts.ArrayLiteralExpression;
  component: string;
};

type SourceRange = { end: number; start: number };

type VisualViolation = {
  component: string;
  kind: string;
};

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

function markerRange(source: string, start: string, end: string): SourceRange | null {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end);
  if (
    startIndex < 0 ||
    endIndex < 0 ||
    source.indexOf(start, startIndex + start.length) >= 0 ||
    source.indexOf(end, endIndex + end.length) >= 0
  ) {
    return null;
  }
  const rangeStart = startIndex + start.length;
  return rangeStart <= endIndex ? { start: rangeStart, end: endIndex } : null;
}

function nodeWithin(node: ts.Node, range: SourceRange | null, sourceFile: ts.SourceFile) {
  return Boolean(
    range &&
      node.getStart(sourceFile) >= range.start &&
      node.end <= range.end,
  );
}

function propertyNameText(name: ts.PropertyName | undefined) {
  if (!name || ts.isComputedPropertyName(name)) return undefined;
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteralLike(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return undefined;
}

function analyzeTask9VisualSource(source: string) {
  const sourceFile = ts.createSourceFile(
    "cases.mjs",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const actionRange = markerRange(source, TASK9_ACTION_START, TASK9_ACTION_END);
  const registrationRange = markerRange(
    source,
    TASK9_REGISTRATION_START,
    TASK9_REGISTRATION_END,
  );
  const callables = new Map<string, CallableNode>();
  const expressions = new Map<string, ts.Expression>();

  const collectDeclarations = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      callables.set(node.name.text, node);
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      expressions.set(node.name.text, node.initializer);
      if (
        ts.isArrowFunction(node.initializer) ||
        ts.isFunctionExpression(node.initializer)
      ) {
        callables.set(node.name.text, node.initializer);
      }
    }
    ts.forEachChild(node, collectDeclarations);
  };
  collectDeclarations(sourceFile);

  const resolveExpression = (
    expression: ts.Expression | undefined,
    visiting = new Set<string>(),
  ): ts.Expression | undefined => {
    if (!expression) return undefined;
    const current = unwrapVisualExpression(expression);
    if (!ts.isIdentifier(current) || visiting.has(current.text)) return current;
    const target = expressions.get(current.text);
    if (!target) return current;
    visiting.add(current.text);
    const resolved = resolveExpression(target, visiting);
    visiting.delete(current.text);
    return resolved;
  };

  const memberName = (
    access: ts.ElementAccessExpression | ts.PropertyAccessExpression,
  ) =>
    ts.isPropertyAccessExpression(access)
      ? access.name.text
      : staticText(access.argumentExpression);

  const resolveMemberValue = (
    access: ts.ElementAccessExpression | ts.PropertyAccessExpression,
    visiting = new Set<ts.Node>(),
  ): ts.Node | undefined => {
    if (visiting.has(access)) return undefined;
    visiting.add(access);
    const name = memberName(access);
    if (!name) return undefined;

    let receiver: ts.Node | undefined = resolveExpression(access.expression);
    if (
      receiver &&
      (ts.isPropertyAccessExpression(receiver) ||
        ts.isElementAccessExpression(receiver))
    ) {
      receiver = resolveMemberValue(receiver, visiting);
    }
    if (!receiver || !ts.isObjectLiteralExpression(receiver)) return undefined;
    if (receiver.properties.some(ts.isSpreadAssignment)) return undefined;

    const matches = receiver.properties.filter(
      (property) => propertyNameText(property.name) === name,
    );
    if (matches.length !== 1) return undefined;
    const [property] = matches;
    if (ts.isMethodDeclaration(property)) return property;
    if (ts.isPropertyAssignment(property)) {
      const value = resolveExpression(property.initializer);
      return value &&
        (ts.isPropertyAccessExpression(value) ||
          ts.isElementAccessExpression(value))
        ? resolveMemberValue(value, visiting)
        : value;
    }
    if (ts.isShorthandPropertyAssignment(property)) {
      return resolveExpression(property.name);
    }
    return undefined;
  };

  const resolveCallable = (
    expression: ts.Expression,
    visiting = new Set<ts.Node>(),
  ): CallableNode | undefined => {
    const current = unwrapVisualExpression(expression);
    if (visiting.has(current)) return undefined;
    if (
      ts.isArrowFunction(current) ||
      ts.isFunctionDeclaration(current) ||
      ts.isFunctionExpression(current) ||
      ts.isMethodDeclaration(current)
    ) {
      return current;
    }
    visiting.add(current);
    if (ts.isIdentifier(current)) {
      const target = callables.get(current.text) ?? expressions.get(current.text);
      return target && ts.isExpression(target)
        ? resolveCallable(target, visiting)
        : target &&
            (ts.isFunctionDeclaration(target) || ts.isMethodDeclaration(target))
          ? target
          : undefined;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      const memberVisiting = new Set(visiting);
      memberVisiting.delete(current);
      const target = resolveMemberValue(current, memberVisiting);
      return target && ts.isExpression(target)
        ? resolveCallable(target, visiting)
        : target && ts.isMethodDeclaration(target)
          ? target
          : undefined;
    }
    return undefined;
  };

  const memberRootName = (expression: ts.Expression): string | undefined => {
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
    return undefined;
  };

  const resolveArray = (
    expression: ts.Expression | undefined,
  ): ts.ArrayLiteralExpression | undefined => {
    const current = resolveExpression(expression);
    return current && ts.isArrayLiteralExpression(current) ? current : undefined;
  };

  const registrations: Registration[] = [];
  const addTuple = (expression: ts.Expression) => {
    const tuple = resolveArray(expression);
    if (!tuple || tuple.elements.length !== 2) return;
    const componentNode = resolveExpression(tuple.elements[0] as ts.Expression);
    const cases = resolveArray(tuple.elements[1] as ts.Expression);
    if (
      componentNode &&
      ts.isStringLiteralLike(componentNode) &&
      TASK9_COMPONENT_SET.has(componentNode.text) &&
      cases
    ) {
      registrations.push({ component: componentNode.text, cases });
    }
  };

  const addEntries = (
    entries: ts.ArrayLiteralExpression,
    visited = new Set<ts.ArrayLiteralExpression>(),
  ) => {
    if (visited.has(entries)) return;
    visited.add(entries);
    for (const element of entries.elements) {
      if (ts.isOmittedExpression(element)) continue;
      if (ts.isSpreadElement(element)) {
        const spread = resolveArray(element.expression);
        if (spread) addEntries(spread, visited);
      } else {
        addTuple(element);
      }
    }
  };

  const visitRegistrations = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "CASES" &&
      node.initializer
    ) {
      const initializer = unwrapVisualExpression(node.initializer);
      if (
        ts.isNewExpression(initializer) &&
        ts.isIdentifier(initializer.expression) &&
        initializer.expression.text === "Map" &&
        initializer.arguments?.length === 1
      ) {
        const entries = resolveArray(initializer.arguments[0]);
        if (entries) addEntries(entries);
      }
    }
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.expression) &&
      node.expression.expression.text === "CASES" &&
      node.expression.name.text === "set" &&
      node.arguments.length >= 2
    ) {
      const tuple = ts.factory.createArrayLiteralExpression([
        node.arguments[0],
        node.arguments[1],
      ]);
      const component = resolveExpression(tuple.elements[0]);
      const cases = resolveArray(tuple.elements[1]);
      if (
        component &&
        ts.isStringLiteralLike(component) &&
        TASK9_COMPONENT_SET.has(component.text) &&
        cases
      ) {
        registrations.push({ component: component.text, cases });
      }
    }
    ts.forEachChild(node, visitRegistrations);
  };
  visitRegistrations(sourceFile);

  const registrationCounts = new Map<string, number>();
  for (const registration of registrations) {
    registrationCounts.set(
      registration.component,
      (registrationCounts.get(registration.component) ?? 0) + 1,
    );
  }

  const violations: VisualViolation[] = [];
  const seenViolations = new Set<string>();
  const recordViolation = (component: string, kind: string, node: ts.Node) => {
    const key = `${component}:${kind}:${node.pos}:${node.end}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  };

  if (!actionRange) {
    recordViolation("<task-9>", "missing Task 9 action markers", sourceFile);
  }
  if (!registrationRange) {
    recordViolation(
      "<task-9>",
      "missing Task 9 registration markers",
      sourceFile,
    );
  }

  const rejectBindingDefaults = (component: string, name: ts.BindingName) => {
    if (ts.isIdentifier(name)) return;
    for (const element of name.elements) {
      if (ts.isOmittedExpression(element)) continue;
      if (element.initializer) {
        recordViolation(
          component,
          "unsupported action parameter default",
          element.initializer,
        );
      }
      rejectBindingDefaults(component, element.name);
    }
  };

  const inspectAction = (
    component: string,
    node: ts.Node,
    visited = new Set<ts.Node>(),
    localNames = new Set(["advance", "canvas", "page", "section"]),
  ) => {
    if (visited.has(node)) return;
    visited.add(node);

    for (const kind of classifyVisualOperation(node, operationResolver)) {
      recordViolation(component, kind, node);
    }

    if (
      ts.isFunctionDeclaration(node) ||
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isMethodDeclaration(node)
    ) {
      if (!nodeWithin(node, actionRange, sourceFile)) {
        recordViolation(component, "action helper outside Task 9 markers", node);
      }
      const nestedNames = new Set(localNames);
      for (const parameter of node.parameters) {
        if (parameter.initializer) {
          recordViolation(
            component,
            "unsupported action parameter default",
            parameter.initializer,
          );
        }
        rejectBindingDefaults(component, parameter.name);
        if (ts.isIdentifier(parameter.name)) nestedNames.add(parameter.name.text);
        if (ts.isObjectBindingPattern(parameter.name)) {
          for (const element of parameter.name.elements) {
            if (ts.isIdentifier(element.name)) nestedNames.add(element.name.text);
          }
        }
      }
      if (node.body) inspectAction(component, node.body, visited, nestedNames);
      return;
    }

    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name)
    ) {
      localNames.add(node.name.text);
    }

    if (ts.isCallExpression(node)) {
      const callee = unwrapVisualExpression(node.expression);
      if (ts.isIdentifier(callee) && !localNames.has(callee.text)) {
        const target = resolveCallable(callee);
        if (target) inspectAction(component, target, visited, localNames);
        else recordViolation(component, "unresolved action helper", callee);
      } else if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        const target = resolveCallable(callee);
        if (target) {
          inspectAction(component, target, visited, localNames);
        } else {
          const method = memberName(callee);
          const root = memberRootName(callee.expression);
          if (
            !method ||
            !root ||
            (!localNames.has(root) && !callables.has(root)) ||
            !SAFE_TASK9_MEMBER_CALLS.has(method)
          ) {
            recordViolation(component, "unresolved action helper", callee);
          }
        }
      }
    }

    if (ts.isIdentifier(node) && !localNames.has(node.text)) {
      const target = callables.get(node.text);
      if (target) inspectAction(component, target, visited, localNames);
    }

    ts.forEachChild(node, (child) =>
      inspectAction(component, child, visited, localNames),
    );
  };

  for (const registration of registrations) {
    for (const visualCase of registration.cases.elements) {
      if (ts.isSpreadElement(visualCase) || ts.isOmittedExpression(visualCase)) {
        recordViolation(
          registration.component,
          "unsupported action registration",
          visualCase,
        );
        continue;
      }
      const object = resolveExpression(visualCase);
      if (!object || !ts.isObjectLiteralExpression(object)) {
        recordViolation(
          registration.component,
          "unsupported action registration",
          visualCase,
        );
        continue;
      }
      for (const property of object.properties) {
        if (propertyNameText(property.name) !== "action") continue;
        if (ts.isPropertyAssignment(property)) {
          inspectAction(registration.component, property.initializer);
        } else if (ts.isShorthandPropertyAssignment(property)) {
          inspectAction(registration.component, property.name);
        } else if (ts.isMethodDeclaration(property)) {
          inspectAction(registration.component, property);
        } else {
          recordViolation(
            registration.component,
            "unsupported action registration",
            property,
          );
        }
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

describe("Task 9 React visual cases", () => {
  test("defines every reviewed Cordis & Infrastructure state explicitly", () => {
    for (const component of TASK9_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK9_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(31 * 2 * 2);
  });

  test("backs every non-initial Task 9 frame with a real action", () => {
    for (const component of TASK9_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        expect(typeof visualCase.action === "function").toBe(
          visualCase.name !== "initial" && visualCase.name !== "balanced",
        );
      }
    }
  });

  test("detects reachable DOM fabrication and duplicate registrations", () => {
    const fixture = `${TASK9_ACTION_START}
      async function action({ canvas }) { await helper(canvas); }
      async function helper(canvas) {
        await canvas.evaluate((root) => { root.innerHTML = "fabricated"; });
      }
      const TASK9_CASES = [
        ["mcp-servers", [{ name: "fabricated", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);
      CASES.set("mcp-servers", [{ name: "override" }]);`;

    const analysis = analyzeTask9VisualSource(fixture);
    expect(analysis.duplicateComponents).toEqual(["mcp-servers"]);
    expect(analysis.violations).toEqual(
      expect.arrayContaining([
        { component: "mcp-servers", kind: "DOM evaluation" },
        { component: "mcp-servers", kind: "DOM rewrite" },
      ]),
    );
  });

  test.each([
    [
      "object method",
      `const helpers = {
        async run(control) {
          await control.evaluate((root) => { root.innerHTML = "fabricated"; });
        },
      };`,
    ],
    [
      "property alias",
      `async function rewrite(control) {
        await control.evaluate((root) => { root.innerHTML = "fabricated"; });
      }
      const helpers = { run: rewrite };`,
    ],
  ])("classifies DOM fabrication reached through a local %s helper", (_label, helper) => {
    const fixture = `${TASK9_ACTION_START}
      ${helper}
      async function action({ canvas }) { await helpers.run(canvas); }
      const TASK9_CASES = [
        ["mcp-servers", [{ name: "fabricated", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);`;

    expect(analyzeTask9VisualSource(fixture).violations).toEqual(
      expect.arrayContaining([
        { component: "mcp-servers", kind: "DOM evaluation" },
        { component: "mcp-servers", kind: "DOM rewrite" },
      ]),
    );
  });

  test.each([
    [
      "object binding",
      `async function action({ helpers = hiddenHelpers }) { await helpers.click(canvas); }`,
    ],
    [
      "nested object binding",
      `async function action({ nested: { helpers = hiddenHelpers } }) { await helpers.click(canvas); }`,
    ],
    [
      "array binding",
      `async function action([helpers = hiddenHelpers]) { await helpers.click(canvas); }`,
    ],
  ])("fails closed on a defaulted member helper in %s", (_label, action) => {
    const fixture = `${TASK9_ACTION_START}
      const hiddenHelpers = {
        async click(control) {
          await control.evaluate((root) => { root.innerHTML = "fabricated"; });
        },
      };
      ${action}
      const TASK9_CASES = [
        ["mcp-servers", [{ name: "default-helper", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);`;

    expect(analyzeTask9VisualSource(fixture).violations).toContainEqual({
      component: "mcp-servers",
      kind: "unsupported action parameter default",
    });
  });

  test("fails closed on an unresolved member helper", () => {
    const fixture = `${TASK9_ACTION_START}
      async function action({ canvas }) { await helpers.run(canvas); }
      const TASK9_CASES = [
        ["sandbox-manager", [{ name: "unresolved", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);`;

    expect(analyzeTask9VisualSource(fixture).violations).toContainEqual({
      component: "sandbox-manager",
      kind: "unresolved action helper",
    });
  });

  test("accepts a resolved member helper that only drives Playwright controls", () => {
    const fixture = `${TASK9_ACTION_START}
      const helpers = {
        async run(control) {
          await control.getByRole("button").click();
        },
      };
      async function action({ canvas }) { await helpers.run(canvas); }
      const TASK9_CASES = [
        ["job-scheduler", [{ name: "safe", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);`;

    expect(analyzeTask9VisualSource(fixture).violations).toEqual([]);
  });

  test("rejects helpers outside the extractable Task 9 action range", () => {
    const fixture = `async function externalHelper(control) {
        await control.click();
      }
      ${TASK9_ACTION_START}
      async function action({ canvas }) { await externalHelper(canvas); }
      const TASK9_CASES = [
        ["job-scheduler", [{ name: "external", action }]],
      ];
      ${TASK9_ACTION_END}
      const CASES = new Map([
        ${TASK9_REGISTRATION_START}
        ...TASK9_CASES,
        ${TASK9_REGISTRATION_END}
      ]);`;

    expect(analyzeTask9VisualSource(fixture).violations).toContainEqual({
      component: "job-scheduler",
      kind: "action helper outside Task 9 markers",
    });
  });

  test("keeps one honest reachable registration for every Task 9 component", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask9VisualSource(source);
    expect(analysis.violations).toEqual([]);
    expect(analysis.duplicateComponents).toEqual([]);
    for (const component of TASK9_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });
});
