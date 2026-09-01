import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";
import { describe, expect, test } from "vitest";
import { buildCaseInventory } from "../scripts/visual-parity.mjs";
import {
  classifyVisualOperation,
  normalizeVisualCall,
  unwrapVisualExpression,
  type VisualOperationResolver,
} from "./visual-action-operation-guard";
import { CASES } from "./visual/cases.mjs";

const TASK12_COMPONENTS = [
  "sensitive-input",
  "layer-card",
  "sidebar-nav",
  "search",
  "session-list",
  "authorization-surface",
  "settings-editor",
  "fine-tune-card",
] as const;

const TASK12_COMPONENT_SET = new Set<string>(TASK12_COMPONENTS);

const EXPECTED_CASES = {
  "sensitive-input": ["masked", "revealed", "copied", "copy-error", "focused"],
  "layer-card": ["metrics", "events", "collapsed", "focused"],
  "sidebar-nav": ["selected", "searched", "focused"],
  search: ["initial", "results", "chosen", "empty", "focused"],
  "session-list": ["initial", "activity", "selected", "focused"],
  "authorization-surface": [
    "directory",
    "masked",
    "revealed",
    "provider-switched",
    "authorized",
    "revoked",
    "focused",
  ],
  "settings-editor": ["initial", "editing", "saved", "conflict", "refetched", "focused"],
  "fine-tune-card": [
    "initial",
    "layout-selected",
    "tuned",
    "menu-open",
    "type-selected",
    "focused",
  ],
} as const;

const INTERACTIVE_CASES = new Set([
  "sensitive-input/revealed",
  "sensitive-input/copied",
  "sensitive-input/copy-error",
  "sensitive-input/focused",
  "layer-card/events",
  "layer-card/collapsed",
  "layer-card/focused",
  "sidebar-nav/searched",
  "sidebar-nav/focused",
  "search/results",
  "search/chosen",
  "search/empty",
  "search/focused",
  "session-list/activity",
  "session-list/selected",
  "session-list/focused",
  "authorization-surface/masked",
  "authorization-surface/revealed",
  "authorization-surface/provider-switched",
  "authorization-surface/authorized",
  "authorization-surface/revoked",
  "authorization-surface/focused",
  "settings-editor/editing",
  "settings-editor/saved",
  "settings-editor/conflict",
  "settings-editor/refetched",
  "settings-editor/focused",
  "fine-tune-card/layout-selected",
  "fine-tune-card/tuned",
  "fine-tune-card/menu-open",
  "fine-tune-card/type-selected",
  "fine-tune-card/focused",
]);

const APPROVED_INTERACTION_METHODS = new Set([
  "clearPermissions",
  "click",
  "emulateMedia",
  "fill",
  "focus",
  "grantPermissions",
  "press",
]);

const OBSERVATION_METHODS = new Set([
  "boundingBox",
  "count",
  "getAttribute",
  "inputValue",
  "isChecked",
  "textContent",
]);

type CallableNode =
  | ts.ArrowFunction
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.MethodDeclaration;

type Registration = {
  cases: ts.ArrayLiteralExpression;
  component: string;
};

type VisualViolation = {
  component: string;
  kind: string;
};

type ActionEvidence = {
  approvedInteractions: number;
  postconditions: number;
};

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

function parseTask12VisualProgram(source: string) {
  const fileName = "/task-12-cases.mjs";
  const parsed = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const options: ts.CompilerOptions = {
    allowJs: true,
    checkJs: true,
    module: ts.ModuleKind.ESNext,
    noLib: true,
    noResolve: true,
    target: ts.ScriptTarget.Latest,
  };
  const host: ts.CompilerHost = {
    fileExists: (path) => path === fileName,
    getCanonicalFileName: (path) => path,
    getCurrentDirectory: () => "/",
    getDefaultLibFileName: () => "lib.d.ts",
    getDirectories: () => [],
    getNewLine: () => "\n",
    getSourceFile: (path) => (path === fileName ? parsed : undefined),
    readFile: (path) => (path === fileName ? source : undefined),
    useCaseSensitiveFileNames: () => true,
    writeFile: () => {},
  };
  const program = ts.createProgram({
    host,
    options,
    rootNames: [fileName],
  });
  return {
    checker: program.getTypeChecker(),
    sourceFile: program.getSourceFile(fileName) ?? parsed,
  };
}

function analyzeTask12VisualSource(source: string) {
  const { checker, sourceFile } = parseTask12VisualProgram(source);
  const callables = new Map<string, CallableNode>();
  const expressions = new Map<string, ts.Expression>();
  const arrayBindings = new Map<string, ts.ArrayLiteralExpression>();

  const collectDeclarations = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      callables.set(node.name.text, node);
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      expressions.set(node.name.text, node.initializer);
      if (ts.isArrayLiteralExpression(node.initializer)) {
        arrayBindings.set(node.name.text, node.initializer);
      }
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
      const target = resolveMemberValue(current);
      return target && ts.isExpression(target)
        ? resolveCallable(target, visiting)
        : target && ts.isMethodDeclaration(target)
          ? target
          : undefined;
    }
    return undefined;
  };

  const resolveArray = (expression: ts.Expression | undefined) => {
    if (!expression) return undefined;
    const current = unwrapVisualExpression(expression);
    if (ts.isArrayLiteralExpression(current)) return current;
    if (ts.isIdentifier(current)) return arrayBindings.get(current.text);
    return undefined;
  };

  const registrations: Registration[] = [];
  const addRegistration = (
    componentNode: ts.Expression | undefined,
    casesNode: ts.Expression | undefined,
  ) => {
    const component = componentNode
      ? resolveExpression(componentNode)
      : undefined;
    if (
      !component ||
      !ts.isStringLiteralLike(component) ||
      !TASK12_COMPONENT_SET.has(component.text)
    ) {
      return;
    }
    const cases = resolveArray(casesNode);
    if (cases) registrations.push({ component: component.text, cases });
  };

  const visitRegistrations = (node: ts.Node) => {
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
    ts.forEachChild(node, visitRegistrations);
  };
  visitRegistrations(sourceFile);

  const registrationCounts = new Map<string, number>();
  for (const { component } of registrations) {
    registrationCounts.set(
      component,
      (registrationCounts.get(component) ?? 0) + 1,
    );
  }

  const violations: VisualViolation[] = [];
  const seenViolations = new Set<string>();
  const recordViolation = (component: string, kind: string, node: ts.Node) => {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}:${node.end}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  };

  const enclosingVerificationScope = (node: ts.Node): ts.Node => {
    let current: ts.Node | undefined = node.parent;
    while (current && current !== sourceFile) {
      if (ts.isFunctionLike(current)) return current;
      current = current.parent;
    }
    return sourceFile;
  };

  function variableParticipatesInVerification(
    declaration: ts.VariableDeclaration,
    seen: Set<ts.VariableDeclaration>,
  ): boolean {
    if (!ts.isIdentifier(declaration.name) || seen.has(declaration)) return false;
    const declarationSymbol = checker.getSymbolAtLocation(declaration.name);
    if (!declarationSymbol) return false;
    const nextSeen = new Set(seen).add(declaration);
    const scope = enclosingVerificationScope(declaration);
    let verified = false;
    const visit = (node: ts.Node) => {
      if (verified) return;
      if (node !== scope && ts.isFunctionLike(node)) return;
      if (
        ts.isIdentifier(node) &&
        node !== declaration.name &&
        checker.getSymbolAtLocation(node) === declarationSymbol &&
        resultParticipatesInVerification(node, nextSeen)
      ) {
        verified = true;
        return;
      }
      ts.forEachChild(node, visit);
    };
    visit(scope);
    return verified;
  }

  function resultParticipatesInVerification(
    node: ts.Node,
    seen = new Set<ts.VariableDeclaration>(),
  ): boolean {
    let current = node;
    while (current.parent) {
      const parent = current.parent;
      if (
        ts.isAwaitExpression(parent) ||
        ts.isParenthesizedExpression(parent) ||
        ts.isAsExpression(parent) ||
        ts.isTypeAssertionExpression(parent) ||
        ts.isNonNullExpression(parent) ||
        ts.isSatisfiesExpression(parent)
      ) {
        current = parent;
        continue;
      }
      if (
        (ts.isPropertyAccessExpression(parent) ||
          ts.isElementAccessExpression(parent)) &&
        parent.expression === current
      ) {
        current = parent;
        continue;
      }
      if (ts.isCallExpression(parent) && parent.expression === current) {
        current = parent;
        continue;
      }
      if (ts.isPrefixUnaryExpression(parent) && parent.operand === current) {
        current = parent;
        continue;
      }
      if (
        ts.isBinaryExpression(parent) &&
        (parent.left === current || parent.right === current)
      ) {
        if (
          parent.operatorToken.kind === ts.SyntaxKind.CommaToken &&
          parent.left === current
        ) {
          return false;
        }
        current = parent;
        continue;
      }
      if (
        (ts.isIfStatement(parent) ||
          ts.isWhileStatement(parent) ||
          ts.isDoStatement(parent)) &&
        parent.expression === current
      ) {
        return true;
      }
      if (ts.isForStatement(parent) && parent.condition === current) return true;
      if (
        ts.isConditionalExpression(parent) &&
        parent.condition === current
      ) {
        return true;
      }
      if (ts.isThrowStatement(parent) && parent.expression === current) return true;
      if (
        ts.isVariableDeclaration(parent) &&
        parent.initializer === current
      ) {
        return variableParticipatesInVerification(parent, seen);
      }
      return false;
    }
    return false;
  }

  const isAwaitedOrReturned = (node: ts.CallExpression) => {
    let current: ts.Node = node;
    while (
      current.parent &&
      (ts.isParenthesizedExpression(current.parent) ||
        ts.isAsExpression(current.parent) ||
        ts.isTypeAssertionExpression(current.parent) ||
        ts.isNonNullExpression(current.parent) ||
        ts.isSatisfiesExpression(current.parent))
    ) {
      current = current.parent;
    }
    return ts.isAwaitExpression(current.parent) ||
      ts.isReturnStatement(current.parent);
  };

  const collectActionEvidence = (
    node: ts.CallExpression,
    evidence: ActionEvidence,
  ) => {
    const normalized = normalizeVisualCall(node, operationResolver);
    const path = expressionPath(normalized.expression);
    const method = path.at(-1);
    if (
      method === "advance" ||
      (method && APPROVED_INTERACTION_METHODS.has(method))
    ) {
      evidence.approvedInteractions += 1;
    }
    if (
      (method === "waitFor" && isAwaitedOrReturned(node)) ||
      (method !== undefined &&
        OBSERVATION_METHODS.has(method) &&
        resultParticipatesInVerification(node))
    ) {
      evidence.postconditions += 1;
    }
  };

  const inspectReachable = (
    component: string,
    node: ts.Node,
    evidence: ActionEvidence,
    visited = new Set<ts.Node>(),
  ) => {
    if (visited.has(node)) return;
    visited.add(node);

    for (const kind of classifyVisualOperation(node, operationResolver)) {
      recordViolation(component, kind, node);
    }

    if (ts.isIdentifier(node)) {
      if (
        /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
          node.text,
        )
      ) {
        recordViolation(component, "stabilization helper", node);
      }
      const target = callables.get(node.text);
      if (target) inspectReachable(component, target, evidence, visited);
    }

    if (ts.isCallExpression(node)) {
      collectActionEvidence(node, evidence);
      const target = resolveCallable(node.expression);
      if (target) inspectReachable(component, target, evidence, visited);
    }

    ts.forEachChild(node, (child) =>
      inspectReachable(component, child, evidence, visited),
    );
  };

  const resolveObjectLiteral = (
    expression: ts.Expression,
    visiting: Set<string>,
  ): ts.ObjectLiteralExpression | null => {
    const current = unwrapVisualExpression(expression);
    if (ts.isObjectLiteralExpression(current)) return current;
    if (!ts.isIdentifier(current) || visiting.has(current.text)) return null;
    const initializer = expressions.get(current.text);
    if (!initializer) return null;
    visiting.add(current.text);
    const resolved = resolveObjectLiteral(initializer, visiting);
    visiting.delete(current.text);
    return resolved;
  };

  const resolveCaseAction = (
    component: string,
    visualCase: ts.ObjectLiteralExpression,
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
        const spread = resolveObjectLiteral(property.expression, new Set());
        if (!spread) {
          recordViolation(component, "unsupported action syntax", property);
          continue;
        }
        const spreadAction = resolveCaseAction(component, spread, activeObjects);
        if (spreadAction) action = spreadAction;
        continue;
      }
      if (propertyNameText(property.name) !== "action") continue;
      if (ts.isPropertyAssignment(property)) action = property.initializer;
      else if (ts.isShorthandPropertyAssignment(property)) action = property.name;
      else if (ts.isMethodDeclaration(property)) action = property;
      else recordViolation(component, "unsupported action syntax", property);
    }
    activeObjects.delete(visualCase);
    return action;
  };

  const resolveCaseName = (
    visualCase: ts.ObjectLiteralExpression,
    activeObjects = new Set<ts.ObjectLiteralExpression>(),
  ): string | null => {
    if (activeObjects.has(visualCase)) return null;
    activeObjects.add(visualCase);
    let name: string | null = null;
    for (const property of visualCase.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = resolveObjectLiteral(property.expression, new Set());
        if (spread) {
          const spreadName = resolveCaseName(spread, activeObjects);
          if (spreadName) name = spreadName;
        }
        continue;
      }
      if (
        propertyNameText(property.name) === "name" &&
        ts.isPropertyAssignment(property)
      ) {
        const value = resolveExpression(property.initializer);
        if (value && ts.isStringLiteralLike(value)) name = value.text;
      }
    }
    activeObjects.delete(visualCase);
    return name;
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
      const object = resolveObjectLiteral(visualCase, new Set());
      if (!object) {
        recordViolation(
          registration.component,
          "unsupported action syntax",
          visualCase,
        );
        continue;
      }
      const caseName = resolveCaseName(object);
      const action = resolveCaseAction(registration.component, object);
      const evidence: ActionEvidence = {
        approvedInteractions: 0,
        postconditions: 0,
      };
      if (action) {
        const target = ts.isExpression(action)
          ? resolveCallable(action)
          : ts.isFunctionDeclaration(action) || ts.isMethodDeclaration(action)
            ? action
            : undefined;
        if (target) {
          inspectReachable(registration.component, target, evidence);
        } else {
          recordViolation(
            registration.component,
            "unsupported action syntax",
            action,
          );
        }
      }

      if (caseName && INTERACTIVE_CASES.has(`${registration.component}/${caseName}`)) {
        if (evidence.approvedInteractions === 0) {
          recordViolation(
            registration.component,
            "missing approved interaction",
            action ?? object,
          );
        }
        if (evidence.postconditions === 0) {
          recordViolation(
            registration.component,
            "missing postcondition",
            action ?? object,
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

describe("Task 12 React visual cases", () => {
  test("defines every Kumo & System state explicitly", () => {
    for (const component of TASK12_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK12_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(40 * 2 * 2);
  });

  test("backs every interactive Task 12 frame with a real action", () => {
    for (const component of TASK12_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        expect(typeof visualCase.action === "function").toBe(
          INTERACTIVE_CASES.has(`${component}/${visualCase.name}`),
        );
      }
    }
  });

  test("detects reachable DOM fabrication and duplicate registrations", () => {
    const fixture = analyzeTask12VisualSource(`
      async function action({ canvas }) { await helper(canvas); }
      async function helper(canvas) {
        await canvas.evaluate((root) => { root.innerHTML = "fabricated"; });
      }
      const spreadAction = { action };
      const CASES = new Map([
        ["search", [{ name: "fabricated", ...spreadAction }]],
      ]);
      CASES.set("search", [{ name: "override" }]);
    `);

    expect(fixture.duplicateComponents).toEqual(["search"]);
    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        { component: "search", kind: "DOM evaluation" },
        { component: "search", kind: "DOM rewrite" },
      ]),
    );
  });

  test("follows action aliases and member expressions to reachable fabrication", () => {
    const fixture = analyzeTask12VisualSource(`
      async function fabricate({ canvas }) {
        await canvas.evaluate((root) => { root.innerHTML = "fabricated"; });
      }
      const actions = { fabricated: fabricate };
      const memberExpression = actions.fabricated;
      const actionAlias = memberExpression;
      const CASES = new Map([
        ["search", [{ name: "results", action: actionAlias }]],
      ]);
    `);

    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        { component: "search", kind: "DOM evaluation" },
        { component: "search", kind: "DOM rewrite" },
      ]),
    );
  });

  test("accepts actions that drive live controls and verify a postcondition", () => {
    const fixture = analyzeTask12VisualSource(`
      async function action({ canvas, page }) {
        const control = canvas.getByRole("combobox", { name: "Search flavors" });
        await control.fill("seasonal");
        await control.focus();
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await canvas.getByText("Selected Compare seasonal flavors").waitFor();
      }
      const CASES = new Map([
        ["search", [{ name: "chosen", action }]],
      ]);
    `);

    expect(fixture.duplicateComponents).toEqual([]);
    expect(fixture.violations).toEqual([]);
  });

  test("rejects an interactive state backed by an empty action", () => {
    const fixture = analyzeTask12VisualSource(`
      const CASES = new Map([
        ["search", [{ name: "results", action: async () => {} }]],
      ]);
    `);

    expect(fixture.violations).toEqual(
      expect.arrayContaining([
        { component: "search", kind: "missing approved interaction" },
        { component: "search", kind: "missing postcondition" },
      ]),
    );
  });

  test("rejects a read-only action with no approved interaction", () => {
    const fixture = analyzeTask12VisualSource(`
      async function action({ canvas }) {
        await canvas.getByText("Compare seasonal flavors").waitFor();
      }
      const CASES = new Map([
        ["search", [{ name: "results", action }]],
      ]);
    `);

    expect(fixture.violations).toContainEqual({
      component: "search",
      kind: "missing approved interaction",
    });
  });

  test("rejects an interaction that never verifies its postcondition", () => {
    const fixture = analyzeTask12VisualSource(`
      async function action({ canvas }) {
        await canvas.getByRole("combobox", { name: "Search flavors" }).fill("seasonal");
      }
      const CASES = new Map([
        ["search", [{ name: "results", action }]],
      ]);
    `);

    expect(fixture.violations).toContainEqual({
      component: "search",
      kind: "missing postcondition",
    });
  });

  test("keeps one honest reachable registration for every Task 12 component", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask12VisualSource(source);

    expect(analysis.duplicateComponents).toEqual([]);
    expect(analysis.violations).toEqual([]);
    for (const component of TASK12_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });
});
