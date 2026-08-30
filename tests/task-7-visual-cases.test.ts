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
  | ts.FunctionExpression
  | ts.MethodDeclaration;

type LocalBindings = {
  checker: ts.TypeChecker;
  functions: Map<string, ts.FunctionDeclaration>;
  initializers: Map<string, ts.Expression>;
  sourceFile: ts.SourceFile;
};

type Registration = {
  cases: ts.ArrayLiteralExpression;
  component: string;
};

type VisualSourceViolation = {
  component: string;
  kind: string;
};

function unwrapNode(node: ts.Node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current) ||
    ts.isAsExpression(current) ||
    ts.isTypeAssertionExpression(current) ||
    ts.isNonNullExpression(current) ||
    ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function propertyNameText(
  name: ts.PropertyName | undefined,
  bindings?: LocalBindings,
) {
  if (!name) return undefined;
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  if (ts.isComputedPropertyName(name)) {
    if (bindings) return resolveString(name.expression, bindings);
    const expression = unwrapNode(name.expression);
    if (
      ts.isStringLiteral(expression) ||
      ts.isNoSubstitutionTemplateLiteral(expression)
    ) {
      return expression.text;
    }
  }
  return undefined;
}

function accessName(
  node: ts.PropertyAccessExpression | ts.ElementAccessExpression,
  bindings?: LocalBindings,
) {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (!node.argumentExpression) return undefined;
  if (bindings) return resolveString(node.argumentExpression, bindings);
  const argument = unwrapNode(node.argumentExpression);
  if (
    ts.isStringLiteral(argument) ||
    ts.isNoSubstitutionTemplateLiteral(argument)
  ) {
    return argument.text;
  }
  return undefined;
}

function parseVisualProgram(source: string) {
  const fileName = "/task-7-visual-cases.mjs";
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
  const sourceFile = program.getSourceFile(fileName) ?? parsed;
  return {
    checker: program.getTypeChecker(),
    diagnostics: program.getSyntacticDiagnostics(sourceFile),
    sourceFile,
  };
}

function collectLocalBindings(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
): LocalBindings {
  const functions = new Map<string, ts.FunctionDeclaration>();
  const initializers = new Map<string, ts.Expression>();

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) {
      functions.set(statement.name.text, statement);
      continue;
    }
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) {
        initializers.set(declaration.name.text, declaration.initializer);
      }
    }
  }

  return { checker, functions, initializers, sourceFile };
}

function localDeclaration(node: ts.Node, bindings: LocalBindings) {
  let symbol = bindings.checker.getSymbolAtLocation(node);
  if (
    ts.isIdentifier(node) &&
    ts.isShorthandPropertyAssignment(node.parent) &&
    node.parent.name === node
  ) {
    symbol =
      bindings.checker.getShorthandAssignmentValueSymbol(node.parent) ?? symbol;
  }
  const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
  return declaration?.getSourceFile() === bindings.sourceFile
    ? declaration
    : undefined;
}

function localBindingValue(
  identifier: ts.Identifier,
  bindings: LocalBindings,
): ts.Node | undefined {
  const declaration = localDeclaration(identifier, bindings);
  if (declaration) {
    if (ts.isFunctionDeclaration(declaration)) return declaration;
    if (ts.isVariableDeclaration(declaration)) return declaration.initializer;
  }
  return (
    bindings.functions.get(identifier.text) ??
    bindings.initializers.get(identifier.text)
  );
}

function directReturnExpression(callable: CallableNode) {
  if (ts.isArrowFunction(callable) && !ts.isBlock(callable.body)) {
    return callable.body;
  }
  const body = callable.body;
  if (!body || !ts.isBlock(body)) return undefined;
  const returns = body.statements.filter(
    (statement): statement is ts.ReturnStatement =>
      ts.isReturnStatement(statement) && Boolean(statement.expression),
  );
  return returns.length === 1 ? returns[0].expression : undefined;
}

function resolveCallable(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): CallableNode | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (
    ts.isArrowFunction(current) ||
    ts.isFunctionExpression(current) ||
    ts.isFunctionDeclaration(current) ||
    ts.isMethodDeclaration(current)
  ) {
    return current;
  }
  if (ts.isIdentifier(current)) {
    const binding = localBindingValue(current, bindings);
    const key = `callable:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveCallable(binding, bindings, seen);
  }
  if (ts.isCallExpression(current) && current.arguments.length === 0) {
    const factory = resolveCallable(current.expression, bindings, seen);
    if (!factory) return undefined;
    return resolveCallable(directReturnExpression(factory), bindings, seen);
  }
  if (
    ts.isPropertyAccessExpression(current) ||
    ts.isElementAccessExpression(current)
  ) {
    const object = resolveObject(current.expression, bindings, seen);
    const name = accessName(current, bindings);
    return resolveCallable(
      object && name ? resolveObjectProperty(object, name, bindings, seen) : undefined,
      bindings,
      seen,
    );
  }
  return undefined;
}

function resolveArray(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): ts.ArrayLiteralExpression | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (ts.isArrayLiteralExpression(current)) return current;
  if (ts.isIdentifier(current)) {
    const binding = localBindingValue(current, bindings);
    const key = `array:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveArray(binding, bindings, seen);
  }
  if (ts.isCallExpression(current) && current.arguments.length === 0) {
    const factory = resolveCallable(current.expression, bindings);
    if (!factory) return undefined;
    return resolveArray(directReturnExpression(factory), bindings, seen);
  }
  return undefined;
}

function resolveObject(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): ts.ObjectLiteralExpression | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (ts.isObjectLiteralExpression(current)) return current;
  if (ts.isIdentifier(current)) {
    const binding = localBindingValue(current, bindings);
    const key = `object:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveObject(binding, bindings, seen);
  }
  if (ts.isCallExpression(current) && current.arguments.length === 0) {
    const factory = resolveCallable(current.expression, bindings);
    if (!factory) return undefined;
    return resolveObject(directReturnExpression(factory), bindings, seen);
  }
  return undefined;
}

function resolveString(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): string | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (
    ts.isStringLiteral(current) ||
    ts.isNoSubstitutionTemplateLiteral(current)
  ) {
    return current.text;
  }
  if (ts.isIdentifier(current)) {
    const binding = localBindingValue(current, bindings);
    const key = `string:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveString(binding, bindings, seen);
  }
  if (ts.isCallExpression(current) && current.arguments.length === 0) {
    const factory = resolveCallable(current.expression, bindings);
    if (!factory) return undefined;
    return resolveString(directReturnExpression(factory), bindings, seen);
  }
  return undefined;
}

function resolveObjectProperty(
  object: ts.ObjectLiteralExpression,
  name: string,
  bindings: LocalBindings,
  seen: Set<string>,
): ts.Node | undefined {
  for (const property of [...object.properties].reverse()) {
    if (ts.isSpreadAssignment(property)) {
      const spread = resolveObject(property.expression, bindings, seen);
      const resolved =
        spread && resolveObjectProperty(spread, name, bindings, seen);
      if (resolved) return resolved;
      continue;
    }
    if (propertyNameText(property.name, bindings) !== name) continue;
    if (ts.isPropertyAssignment(property)) return property.initializer;
    if (ts.isShorthandPropertyAssignment(property)) return property.name;
    if (ts.isMethodDeclaration(property)) return property;
    return undefined;
  }
  return undefined;
}

function resolveNewMap(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): ts.NewExpression | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (
    ts.isNewExpression(current) &&
    ts.isIdentifier(current.expression) &&
    current.expression.text === "Map"
  ) {
    return current;
  }
  if (ts.isIdentifier(current)) {
    const binding = localBindingValue(current, bindings);
    const key = `map:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveNewMap(binding, bindings, seen);
  }
  return undefined;
}

function analyzeTask7VisualSource(source: string) {
  const { checker, diagnostics, sourceFile } = parseVisualProgram(source);
  const bindings = collectLocalBindings(sourceFile, checker);
  const registrations: Registration[] = [];
  const registrationCounts = new Map<string, number>();
  const violations: VisualSourceViolation[] = [];
  const seenViolations = new Set<string>();

  const recordViolation = (component: string, kind: string, node: ts.Node) => {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  };

  if (diagnostics.length > 0) {
    recordViolation("<source>", "syntax error", sourceFile);
  }

  const addRegistration = (
    componentNode: ts.Node | undefined,
    casesNode: ts.Node | undefined,
    origin: ts.Node,
  ) => {
    const component = resolveString(componentNode, bindings);
    if (!component) {
      recordViolation("<unresolved>", "unresolved registration", origin);
      return;
    }
    if (!TASK7_COMPONENT_SET.has(component)) return;

    registrationCounts.set(component, (registrationCounts.get(component) ?? 0) + 1);
    const cases = resolveArray(casesNode, bindings);
    if (!cases) {
      recordViolation(component, "unresolved registration", origin);
      return;
    }
    registrations.push({ cases, component });
  };

  const collectRegistrationEntries = (
    entries: ts.ArrayLiteralExpression,
    visited = new Set<number>(),
  ) => {
    if (visited.has(entries.pos)) return;
    visited.add(entries.pos);
    for (const element of entries.elements) {
      if (ts.isSpreadElement(element)) {
        const spread = resolveArray(element.expression, bindings);
        if (!spread) {
          recordViolation("<unresolved>", "unresolved registration", element);
        } else {
          collectRegistrationEntries(spread, visited);
        }
        continue;
      }
      const tuple = resolveArray(element, bindings);
      if (!tuple || tuple.elements.length < 2) {
        recordViolation("<unresolved>", "unresolved registration", element);
        continue;
      }
      addRegistration(tuple.elements[0], tuple.elements[1], element);
    }
  };

  const map = resolveNewMap(bindings.initializers.get("CASES"), bindings);
  if (!map) {
    recordViolation(
      "<unresolved>",
      "unresolved registration",
      bindings.initializers.get("CASES") ?? sourceFile,
    );
  } else if (map.arguments?.length) {
    const entries = resolveArray(map.arguments[0], bindings);
    if (!entries) {
      recordViolation("<unresolved>", "unresolved registration", map.arguments[0]);
    } else {
      collectRegistrationEntries(entries);
    }
  }

  const refersToCases = (
    node: ts.Node,
    seen = new Set<string>(),
  ): boolean => {
    const current = unwrapNode(node);
    if (!ts.isIdentifier(current)) return false;
    if (current.text === "CASES") return true;
    if (seen.has(current.text)) return false;
    seen.add(current.text);
    const initializer = localBindingValue(current, bindings);
    return initializer ? refersToCases(initializer, seen) : false;
  };

  const collectSetRegistrations = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      (ts.isPropertyAccessExpression(node.expression) ||
        ts.isElementAccessExpression(node.expression)) &&
      accessName(node.expression, bindings) === "set" &&
      refersToCases(node.expression.expression)
    ) {
      addRegistration(node.arguments[0], node.arguments[1], node);
    }
    ts.forEachChild(node, collectSetRegistrations);
  };
  collectSetRegistrations(sourceFile);

  const runtimeRoot = (
    node: ts.Node,
    seen = new Set<ts.Node>(),
  ): string | undefined => {
    const current = unwrapNode(node);
    if (seen.has(current)) return undefined;
    seen.add(current);
    if (ts.isIdentifier(current)) {
      const binding = localBindingValue(current, bindings);
      return binding ? runtimeRoot(binding, seen) : current.text;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      return runtimeRoot(current.expression, seen);
    }
    if (ts.isCallExpression(current) || ts.isNewExpression(current)) {
      return runtimeRoot(current.expression, seen);
    }
    if (ts.isAwaitExpression(current)) return runtimeRoot(current.expression, seen);
    return undefined;
  };

  const inspectReachable = (
    component: string,
    node: ts.Node,
    visitedCallables: Set<number>,
  ) => {
    if (
      ts.isIdentifier(node) &&
      /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
        node.text,
      )
    ) {
      recordViolation(component, "stabilization helper", node);
    }

    if (ts.isCallExpression(node)) {
      if (ts.isIdentifier(node.expression)) {
        const callable = resolveCallable(node.expression, bindings);
        if (!callable) {
          recordViolation(component, "unresolved action helper", node);
        } else if (!visitedCallables.has(callable.pos)) {
          visitedCallables.add(callable.pos);
          inspectReachable(component, callable, visitedCallables);
        }
      }
      if (
        ts.isPropertyAccessExpression(node.expression) ||
        ts.isElementAccessExpression(node.expression)
      ) {
        const method = accessName(node.expression, bindings);
        if (["evaluate", "evaluateAll", "evaluateHandle"].includes(method ?? "")) {
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
          ].includes(method ?? "")
        ) {
          recordViolation(component, "node replacement", node);
        }
        if (method === "setProperty") {
          recordViolation(component, "style mutation", node);
        }

        const callable = resolveCallable(node.expression, bindings);
        if (callable && !visitedCallables.has(callable.pos)) {
          visitedCallables.add(callable.pos);
          inspectReachable(component, callable, visitedCallables);
        } else if (!callable) {
          const receiver = unwrapNode(node.expression.expression);
          const receiverObject = resolveObject(receiver, bindings);
          const receiverBinding = ts.isIdentifier(receiver)
            ? localBindingValue(receiver, bindings)
            : undefined;
          const root = runtimeRoot(receiver);
          const approvedRuntimeRoot =
            root !== undefined &&
            ["canvas", "page", "Math", "JSON", "Number", "String"].includes(
              root,
            );
          if (receiverObject || (receiverBinding && !approvedRuntimeRoot)) {
            recordViolation(component, "unresolved action helper", node);
          }
        }
      }
    }

    if (
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node)
    ) {
      if (["style", "classList"].includes(accessName(node, bindings) ?? "")) {
        recordViolation(component, "style mutation", node);
      }
    }

    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment &&
      (ts.isPropertyAccessExpression(node.left) ||
        ts.isElementAccessExpression(node.left)) &&
      ["hidden", "innerHTML", "innerText", "outerHTML", "textContent"].includes(
        accessName(node.left, bindings) ?? "",
      )
    ) {
      recordViolation(component, "DOM rewrite", node);
    }

    ts.forEachChild(node, (child) =>
      inspectReachable(component, child, visitedCallables),
    );
  };

  const inspectAction = (
    component: string,
    node: ts.Node,
  ) => {
    const callable = resolveCallable(node, bindings);
    if (!callable) {
      recordViolation(component, "unresolved action registration", node);
      return;
    }
    const visited = new Set<number>([callable.pos]);
    inspectReachable(component, node, visited);
    inspectReachable(component, callable, visited);
  };

  const inspectCaseObject = (
    component: string,
    visualCase: ts.ObjectLiteralExpression,
    visitedObjects: Set<number>,
  ) => {
    if (visitedObjects.has(visualCase.pos)) return;
    visitedObjects.add(visualCase.pos);
    for (const property of visualCase.properties) {
      if (ts.isSpreadAssignment(property)) {
        const spread = resolveObject(property.expression, bindings);
        if (!spread) {
          recordViolation(component, "unresolved action registration", property);
        } else {
          inspectCaseObject(component, spread, visitedObjects);
        }
        continue;
      }
      const name = propertyNameText(property.name, bindings);
      if (!name && ts.isComputedPropertyName(property.name)) {
        recordViolation(component, "unresolved action registration", property);
        continue;
      }
      if (name !== "action") continue;
      if (ts.isPropertyAssignment(property)) {
        inspectAction(component, property.initializer);
      } else if (ts.isShorthandPropertyAssignment(property)) {
        inspectAction(component, property.name);
      } else if (ts.isMethodDeclaration(property)) {
        inspectReachable(component, property, new Set<number>([property.pos]));
      } else {
        recordViolation(component, "unresolved action registration", property);
      }
    }
  };

  const inspectCases = (
    registration: Registration,
    cases: ts.ArrayLiteralExpression,
    visitedArrays = new Set<number>(),
  ) => {
    if (visitedArrays.has(cases.pos)) return;
    visitedArrays.add(cases.pos);
    for (const visualCase of cases.elements) {
      if (ts.isSpreadElement(visualCase)) {
        const spread = resolveArray(visualCase.expression, bindings);
        if (!spread) {
          recordViolation(
            registration.component,
            "unresolved action registration",
            visualCase,
          );
        } else {
          inspectCases(registration, spread, visitedArrays);
        }
        continue;
      }
      const object = resolveObject(visualCase, bindings);
      if (!object) {
        recordViolation(
          registration.component,
          "unresolved action registration",
          visualCase,
        );
        continue;
      }
      inspectCaseObject(registration.component, object, new Set<number>());
    }
  };

  for (const registration of registrations) {
    inspectCases(registration, registration.cases);
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

function memoryRulesAction() {
  const visualCase = CASES.get("memory-inspector")?.find(
    ({ name }) => name === "rules",
  );
  expect(typeof visualCase?.action).toBe("function");
  return visualCase!.action!;
}

function memoryFilterActionHarness(
  locale: "en" | "zh",
  narrowLabel?: string,
) {
  const labels =
    locale === "zh"
      ? ["全部记忆", "偏好", "规范", "事实"]
      : ["All memories", "Preferences", "Rules", "Facts"];
  const measured: string[] = [];
  const controls = labels.map((label, index) => ({
    boundingBox: async () => {
      measured.push(label);
      return {
        height: 44,
        width: label === narrowLabel ? 43 : 44,
        x: index * 44,
        y: 0,
      };
    },
    click: async () => {},
    getAttribute: async (attribute: string) => {
      if (attribute === "aria-label") return label;
      if (attribute === "aria-pressed") return index === 2 ? "true" : "false";
      return null;
    },
  }));
  const canvas = {
    getByRole: (role: string) => {
      if (role === "button") return controls[2];
      if (role === "group") {
        return {
          getByRole: (nestedRole: string) => {
            expect(nestedRole).toBe("button");
            return { all: async () => controls };
          },
        };
      }
      if (role === "listitem") return { count: async () => 1 };
      throw new Error(`Unexpected role: ${role}`);
    },
  };
  return { canvas, labels, measured };
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

  test.each(["en", "zh"] as const)(
    "measures every Memory filter in the %s visual action",
    async (locale) => {
      const action = memoryRulesAction();
      const { canvas, labels, measured } = memoryFilterActionHarness(locale);

      await action({ advance: async () => {}, canvas, page: {} });

      expect(measured).toEqual(labels);
    },
  );

  test.each(
    (["en", "zh"] as const).flatMap((locale) =>
      memoryFilterActionHarness(locale).labels.map((label) => ({ label, locale })),
    ),
  )("fails closed for a sub-44 $locale $label filter", async ({ label, locale }) => {
    const action = memoryRulesAction();
    const { canvas } = memoryFilterActionHarness(locale, label);

    await expect(
      action({ advance: async () => {}, canvas, page: {} }),
    ).rejects.toThrow(label);
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
  });

  test("counts aliased component IDs and case factories across tuple and direct forms", () => {
    const fixture = analyzeTask7VisualSource(`
      const memoryComponent = "memory-inspector";
      const aliasedComponent = memoryComponent;
      const makeTupleCases = () => [{ name: "tuple" }];
      const tupleFactory = makeTupleCases;
      const registrations = [[aliasedComponent, tupleFactory()]];
      const CASES = new Map([...registrations]);
      function makeDirectCases() {
        return [{ name: "direct" }];
      }
      CASES.set(memoryComponent, makeDirectCases());
    `);

    expect(fixture.registrationCounts.get("memory-inspector")).toBe(2);
    expect(fixture.duplicateComponents).toEqual(["memory-inspector"]);
    expect(fixture.violations).toEqual([]);
  });

  test("counts computed direct set registrations through a safe CASES alias", () => {
    const fixture = analyzeTask7VisualSource(`
      const component = "memory-inspector";
      const makeCases = () => [{ name: "state" }];
      const CASES = new Map([[component, makeCases()]]);
      const registry = CASES;
      const setMethod = "set";
      registry[setMethod](component, makeCases());
    `);

    expect(fixture.registrationCounts.get("memory-inspector")).toBe(2);
    expect(fixture.duplicateComponents).toEqual(["memory-inspector"]);
    expect(fixture.violations).toEqual([]);
  });

  test("resolves safe local case, action factory, and binding aliases", () => {
    const fixture = analyzeTask7VisualSource(`
      async function inspectRealControl({ canvas }) {
        const control = canvas.getByRole("button");
        await control.click();
      }
      const makeAction = () => inspectRealControl;
      const boundAction = makeAction();
      const makeCase = () => ({ name: "aliased", action: boundAction });
      const makeCases = () => [makeCase()];
      const component = "context-window";
      const CASES = new Map([[component, makeCases()]]);
    `);

    expect(fixture.registrationCounts.get("context-window")).toBe(1);
    expect(fixture.violations).toEqual([]);
  });

  test("resolves safe action helpers declared and aliased inside the action", () => {
    const fixture = analyzeTask7VisualSource(`
      const CASES = new Map([["context-window", [{
        name: "local-helper",
        action: async ({ canvas }) => {
          const clickRealControl = async () => {
            await canvas.getByRole("button").click();
          };
          const helperAlias = clickRealControl;
          await helperAlias();
        },
      }]]]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("follows reachable object-member helpers into nested evaluateAll", () => {
    const fixture = analyzeTask7VisualSource(`
      async function inspectNodes(canvas) {
        await canvas.locator("button").evaluateAll((buttons) => buttons.length);
      }
      const helpers = { inspect: inspectNodes };
      async function action({ canvas }) {
        await helpers.inspect(canvas);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "object-helper", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "DOM evaluation" },
    ]);
  });

  test("resolves computed evaluateAll aliases and rejects unresolved member helpers", () => {
    const fixture = analyzeTask7VisualSource(`
      const evaluationMethod = "evaluateAll";
      const unresolvedHelpers = loadHelpers();
      const CASES = new Map([
        ["context-window", [{
          name: "computed-evaluation",
          async action({ canvas }) {
            await canvas[evaluationMethod]((nodes) => nodes.length);
          },
        }]],
        ["memory-inspector", [{
          name: "unknown-helper",
          async action({ canvas }) {
            await unresolvedHelpers.inspect(canvas);
          },
        }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("inspects shorthand, method, spread, aliased helper, and nested evaluateAll actions", () => {
    const fixture = analyzeTask7VisualSource(`
      async function nestedEvaluation(canvas) {
        await canvas.getByRole("button").evaluateAll((buttons) => buttons.length);
      }
      const helperAlias = nestedEvaluation;
      async function action({ canvas }) {
        await helperAlias(canvas);
      }
      const spreadAction = async ({ canvas }) => {
        await canvas.locator("button").evaluateAll((buttons) => buttons.length);
      };
      const spread = { action: spreadAction };
      const CASES = new Map([
        ["context-window", [{ name: "shorthand", action }]],
        ["memory-inspector", [{
          name: "method",
          async action({ canvas }) {
            await canvas.evaluateAll((nodes) => nodes.length);
          },
        }]],
        ["context-cards", [{ name: "spread", ...spread }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "DOM evaluation" },
      { component: "context-window", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "DOM evaluation" },
    ]);
  });

  test("fails closed for unresolved Task 7 registrations and actions", () => {
    const fixture = analyzeTask7VisualSource(`
      const unresolvedCases = loadCases();
      const maybeTask7 = chooseComponent("memory-inspector");
      const CASES = new Map([
        ["context-cards", unresolvedCases],
        [maybeTask7, [{ name: "unknown-component" }]],
      ]);
      CASES.set("context-spillover", [
        { name: "unknown-action", action: missingAction },
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "<unresolved>", kind: "unresolved registration" },
      { component: "context-cards", kind: "unresolved registration" },
      {
        component: "context-spillover",
        kind: "unresolved action registration",
      },
    ]);
  });

  test("keeps one live registration and zero violations for every Task 7 component", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask7VisualSource(source);
    expect(analysis.duplicateComponents).toEqual([]);
    for (const component of TASK7_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
    expect(analysis.violations).toEqual([]);
  });
});
