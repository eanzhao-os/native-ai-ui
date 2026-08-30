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

type Origin =
  | { kind: "absent" }
  | { kind: "list"; values: Origin[] }
  | { kind: "node"; context: OriginContext; node: ts.Node }
  | { fallback?: Origin; kind: "object"; properties: Map<string, Origin> }
  | { kind: "trusted"; root: "canvas" | "derived" | "page" }
  | { kind: "unknown" };

type OriginContext = Map<ts.Node, Origin>;

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
  const fileName = "/task-7-visual-cases.ts";
  const parsed = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
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
    if (ts.isVariableDeclaration(declaration)) {
      if (declaration.initializer) return declaration.initializer;
      const declarationList = declaration.parent;
      const loop = declarationList.parent;
      if (
        ts.isVariableDeclarationList(declarationList) &&
        ts.isForOfStatement(loop) &&
        loop.initializer === declarationList
      ) {
        return loop.expression;
      }
    }
  }
  return (
    bindings.functions.get(identifier.text) ??
    bindings.initializers.get(identifier.text)
  );
}

function localConstantValue(
  identifier: ts.Identifier,
  bindings: LocalBindings,
) {
  const declaration = localDeclaration(identifier, bindings);
  if (!declaration || !ts.isVariableDeclaration(declaration)) return undefined;
  const declarationList = declaration.parent;
  if (
    !ts.isVariableDeclarationList(declarationList) ||
    !(declarationList.flags & ts.NodeFlags.Const)
  ) {
    return undefined;
  }
  return declaration.initializer;
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

type StaticMemberValue = string | number;

function resolveStaticMemberValue(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): StaticMemberValue | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (
    ts.isStringLiteral(current) ||
    ts.isNoSubstitutionTemplateLiteral(current)
  ) {
    return current.text;
  }
  if (ts.isNumericLiteral(current)) return Number(current.text);
  if (ts.isTemplateExpression(current)) {
    let value = current.head.text;
    for (const span of current.templateSpans) {
      const expression = resolveStaticMemberValue(
        span.expression,
        bindings,
        new Set(seen),
      );
      if (expression === undefined) return undefined;
      value += `${expression}${span.literal.text}`;
    }
    return value;
  }
  if (ts.isIdentifier(current)) {
    const binding = localConstantValue(current, bindings);
    const key = `static-member:${binding?.pos ?? current.text}`;
    if (seen.has(key)) return undefined;
    seen.add(key);
    return resolveStaticMemberValue(binding, bindings, seen);
  }
  if (
    ts.isBinaryExpression(current) &&
    current.operatorToken.kind === ts.SyntaxKind.PlusToken
  ) {
    const left = resolveStaticMemberValue(
      current.left,
      bindings,
      new Set(seen),
    );
    const right = resolveStaticMemberValue(
      current.right,
      bindings,
      new Set(seen),
    );
    if (left === undefined || right === undefined) return undefined;
    return typeof left === "number" && typeof right === "number"
      ? left + right
      : `${left}${right}`;
  }
  if (ts.isCallExpression(current) && current.arguments.length === 0) {
    const factory = resolveCallable(current.expression, bindings);
    if (!factory) return undefined;
    return resolveStaticMemberValue(
      directReturnExpression(factory),
      bindings,
      seen,
    );
  }
  return undefined;
}

function resolveString(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): string | undefined {
  const value = resolveStaticMemberValue(node, bindings, seen);
  return value === undefined ? undefined : String(value);
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

  const recordViolation = (
    component: string,
    kind: string,
    node: ts.Node,
    identity = node,
  ) => {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}:${identity.getStart(sourceFile)}`;
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
    if (ts.isCallExpression(node)) {
      const callee = unwrapNode(node.expression);
      if (
        (ts.isPropertyAccessExpression(callee) ||
          ts.isElementAccessExpression(callee)) &&
        refersToCases(callee.expression)
      ) {
        const member = accessName(callee, bindings);
        if (member === "set") {
          addRegistration(node.arguments[0], node.arguments[1], node);
        } else if (
          member === undefined &&
          ts.isElementAccessExpression(callee)
        ) {
          const component = resolveString(node.arguments[0], bindings);
          if (!component) {
            recordViolation(
              "<unresolved>",
              "unresolved registration member",
              callee,
            );
          } else if (TASK7_COMPONENT_SET.has(component)) {
            recordViolation(
              component,
              "unresolved registration member",
              callee,
            );
          }
        }
      }
    }
    ts.forEachChild(node, collectSetRegistrations);
  };
  collectSetRegistrations(sourceFile);

  const absentOrigin: Origin = { kind: "absent" };
  const unknownOrigin: Origin = { kind: "unknown" };

  const runnerOrigin: Origin = {
    kind: "object",
    properties: new Map([
      ["canvas", { kind: "trusted", root: "canvas" }],
      ["page", { kind: "trusted", root: "page" }],
    ]),
  };

  function callableFromOrigin(
    origin: Origin,
    seen = new Set<ts.Node>(),
  ): CallableNode | undefined {
    if (origin.kind !== "node") return undefined;
    return resolveCallableWithOrigins(origin.node, origin.context, seen);
  }

  function propertyOrigin(
    origin: Origin,
    name: string,
  ): Origin {
    if (origin.kind === "trusted") {
      return { kind: "trusted", root: "derived" };
    }
    if (origin.kind === "object") {
      return origin.properties.get(name) ?? origin.fallback ?? absentOrigin;
    }
    if (origin.kind === "list") {
      const index = Number(name);
      return Number.isInteger(index) && index >= 0
        ? origin.values[index] ?? absentOrigin
        : unknownOrigin;
    }
    return origin.kind === "node" ? origin : unknownOrigin;
  }

  function bindPattern(
    name: ts.BindingName,
    origin: Origin,
    context: OriginContext,
  ) {
    if (ts.isIdentifier(name)) {
      context.set(localDeclaration(name, bindings) ?? name, origin);
      return;
    }

    if (ts.isObjectBindingPattern(name)) {
      const used = new Set<string>();
      for (const element of name.elements) {
        if (element.dotDotDotToken) {
          if (origin.kind !== "object") {
            bindPattern(element.name, unknownOrigin, context);
            continue;
          }
          const properties = new Map(origin.properties);
          for (const key of used) properties.delete(key);
          bindPattern(
            element.name,
            { fallback: origin.fallback, kind: "object", properties },
            context,
          );
          continue;
        }
        const key = element.propertyName
          ? propertyNameText(element.propertyName, bindings)
          : ts.isIdentifier(element.name)
            ? element.name.text
            : undefined;
        let value = key ? propertyOrigin(origin, key) : unknownOrigin;
        if (key) used.add(key);
        if (value.kind === "absent" && element.initializer) {
          value = originForNode(element.initializer, context);
        }
        bindPattern(element.name, value, context);
      }
      return;
    }

    let offset = 0;
    for (let index = 0; index < name.elements.length; index += 1) {
      const element = name.elements[index];
      if (ts.isOmittedExpression(element)) {
        offset += 1;
        continue;
      }
      if (element.dotDotDotToken) {
        const values =
          origin.kind === "list" ? origin.values.slice(offset) : [];
        bindPattern(
          element.name,
          origin.kind === "list" ? { kind: "list", values } : unknownOrigin,
          context,
        );
        break;
      }
      let value = propertyOrigin(origin, String(offset));
      if (value.kind === "absent" && element.initializer) {
        value = originForNode(element.initializer, context);
      }
      bindPattern(element.name, value, context);
      offset += 1;
    }
  }

  function bindingElementOrigin(
    declaration: ts.BindingElement,
    context: OriginContext,
  ) {
    let pattern: ts.Node = declaration.parent;
    let container = pattern.parent;
    while (ts.isBindingElement(container)) {
      pattern = container.parent;
      container = pattern.parent;
    }
    if (!ts.isVariableDeclaration(container)) return unknownOrigin;
    const origin = container.initializer
      ? originForNode(container.initializer, context)
      : forOfElementOrigin(container, context);
    const derived = new Map(context);
    bindPattern(container.name, origin, derived);
    return derived.get(declaration) ?? unknownOrigin;
  }

  function forOfElementOrigin(
    declaration: ts.VariableDeclaration,
    context: OriginContext,
  ) {
    const declarationList = declaration.parent;
    const loop = declarationList.parent;
    if (
      !ts.isVariableDeclarationList(declarationList) ||
      !ts.isForOfStatement(loop) ||
      loop.initializer !== declarationList
    ) {
      return unknownOrigin;
    }
    const iterable = originForNode(loop.expression, context);
    if (iterable.kind === "trusted") {
      return { kind: "trusted", root: "derived" } as Origin;
    }
    if (iterable.kind === "list") {
      if (iterable.values.length === 1) return iterable.values[0];
      if (
        iterable.values.length > 0 &&
        iterable.values.every((value) => value.kind === "trusted")
      ) {
        return { kind: "trusted", root: "derived" } as Origin;
      }
    }
    return unknownOrigin;
  }

  function originForNode(
    node: ts.Node | undefined,
    context: OriginContext,
    seen = new Set<ts.Node>(),
  ): Origin {
    if (!node) return unknownOrigin;
    const current = unwrapNode(node);
    if (seen.has(current)) return unknownOrigin;
    seen.add(current);

    if (ts.isAwaitExpression(current)) {
      return originForNode(current.expression, context, seen);
    }
    if (ts.isSpreadElement(current)) {
      return originForNode(current.expression, context, seen);
    }
    if (ts.isIdentifier(current)) {
      const declaration = localDeclaration(current, bindings);
      const mapped = declaration && context.get(declaration);
      if (mapped) return mapped;
      if (declaration && ts.isVariableDeclaration(declaration)) {
        if (declaration.initializer) {
          return originForNode(declaration.initializer, context, seen);
        }
        return forOfElementOrigin(declaration, context);
      }
      if (declaration && ts.isBindingElement(declaration)) {
        return bindingElementOrigin(declaration, context);
      }
      if (declaration && ts.isFunctionDeclaration(declaration)) {
        return { kind: "node", context, node: declaration };
      }
      return { kind: "node", context, node: current };
    }
    if (
      ts.isArrowFunction(current) ||
      ts.isFunctionExpression(current) ||
      ts.isFunctionDeclaration(current) ||
      ts.isMethodDeclaration(current)
    ) {
      return { kind: "node", context, node: current };
    }
    if (ts.isObjectLiteralExpression(current)) {
      const properties = new Map<string, Origin>();
      let fallback: Origin | undefined;
      for (const property of current.properties) {
        if (ts.isSpreadAssignment(property)) {
          const spread = originForNode(property.expression, context, seen);
          if (spread.kind === "object") {
            if (spread.fallback) {
              properties.clear();
              fallback = spread.fallback;
            }
            for (const [key, value] of spread.properties) {
              properties.set(key, value);
            }
          } else {
            properties.clear();
            fallback = spread;
          }
          continue;
        }
        const name = propertyNameText(property.name, bindings);
        if (!name) {
          properties.clear();
          fallback = unknownOrigin;
          continue;
        }
        if (ts.isPropertyAssignment(property)) {
          properties.set(name, originForNode(property.initializer, context));
        } else if (ts.isShorthandPropertyAssignment(property)) {
          properties.set(name, originForNode(property.name, context));
        } else if (ts.isMethodDeclaration(property)) {
          properties.set(name, { kind: "node", context, node: property });
        }
      }
      return { fallback, kind: "object", properties };
    }
    if (ts.isArrayLiteralExpression(current)) {
      const values: Origin[] = [];
      for (const element of current.elements) {
        if (ts.isOmittedExpression(element)) {
          values.push(absentOrigin);
        } else if (ts.isSpreadElement(element)) {
          const spread = originForNode(element.expression, context);
          if (spread.kind !== "list") return unknownOrigin;
          values.push(...spread.values);
        } else {
          values.push(originForNode(element, context));
        }
      }
      return { kind: "list", values };
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      const name = accessName(current, bindings);
      return name
        ? propertyOrigin(originForNode(current.expression, context, seen), name)
        : unknownOrigin;
    }
    if (ts.isCallExpression(current)) {
      const callee = unwrapNode(current.expression);
      const callable = resolveCallableWithOrigins(callee, context);
      if (callable) {
        const returned = directReturnExpression(callable);
        if (returned) {
          return originForNode(
            returned,
            callContext(callable, current, context),
          );
        }
      }
      if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        const receiver = originForNode(callee.expression, context, seen);
        if (receiver.kind === "trusted") {
          return { kind: "trusted", root: "derived" };
        }
      }
      return { kind: "node", context, node: current };
    }
    return { kind: "node", context, node: current };
  }

  function resolveCallableWithOrigins(
    node: ts.Node | undefined,
    context: OriginContext,
    seen = new Set<ts.Node>(),
  ): CallableNode | undefined {
    if (!node) return undefined;
    const current = unwrapNode(node);
    if (seen.has(current)) return undefined;
    seen.add(current);
    if (
      ts.isArrowFunction(current) ||
      ts.isFunctionExpression(current) ||
      ts.isFunctionDeclaration(current) ||
      ts.isMethodDeclaration(current)
    ) {
      return current;
    }
    if (ts.isIdentifier(current)) {
      const declaration = localDeclaration(current, bindings);
      const mapped = declaration && context.get(declaration);
      if (mapped) return callableFromOrigin(mapped, seen);
      return resolveCallable(current, bindings);
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      const name = accessName(current, bindings);
      if (!name) return undefined;
      return callableFromOrigin(
        propertyOrigin(originForNode(current.expression, context), name),
        seen,
      );
    }
    if (ts.isCallExpression(current) && current.arguments.length === 0) {
      const factory = resolveCallableWithOrigins(
        current.expression,
        context,
        seen,
      );
      return factory
        ? resolveCallableWithOrigins(
            directReturnExpression(factory),
            callContext(factory, current, context),
            seen,
          )
        : undefined;
    }
    return resolveCallable(current, bindings);
  }

  function expandedArgumentOrigins(
    call: ts.CallExpression,
    context: OriginContext,
  ) {
    const values: Origin[] = [];
    let ambiguousFrom: number | undefined;
    for (const argument of call.arguments) {
      if (ambiguousFrom !== undefined) continue;
      if (ts.isSpreadElement(argument)) {
        const spread = originForNode(argument.expression, context);
        if (spread.kind === "list") values.push(...spread.values);
        else ambiguousFrom = values.length;
      } else {
        values.push(originForNode(argument, context));
      }
    }
    return { ambiguousFrom, values };
  }

  function callContext(
    callable: CallableNode,
    call: ts.CallExpression,
    callerContext: OriginContext,
  ) {
    const context = new Map(callerContext);
    const { ambiguousFrom, values } = expandedArgumentOrigins(
      call,
      callerContext,
    );
    let argumentIndex = 0;
    for (const parameter of callable.parameters) {
      let origin: Origin;
      const ambiguous =
        ambiguousFrom !== undefined && argumentIndex >= ambiguousFrom;
      if (parameter.dotDotDotToken) {
        origin = ambiguous
          ? unknownOrigin
          : {
              kind: "list",
              values: values.slice(argumentIndex),
            };
        argumentIndex = values.length;
      } else {
        origin = ambiguous ? unknownOrigin : values[argumentIndex] ?? absentOrigin;
        argumentIndex += 1;
      }
      if (origin.kind === "absent" && parameter.initializer) {
        origin = originForNode(parameter.initializer, context);
      }
      bindPattern(parameter.name, origin, context);
    }
    return context;
  }

  function actionContext(callable: CallableNode) {
    const context: OriginContext = new Map();
    const first = callable.parameters[0];
    if (first) {
      const origin = first.dotDotDotToken
        ? ({ kind: "list", values: [runnerOrigin] } as Origin)
        : runnerOrigin;
      bindPattern(first.name, origin, context);
    }
    for (const parameter of callable.parameters.slice(1)) {
      const origin = parameter.initializer
        ? originForNode(parameter.initializer, context)
        : absentOrigin;
      bindPattern(parameter.name, origin, context);
    }
    return context;
  }

  function originTrust(
    origin: Origin,
    seen = new Set<ts.Node>(),
  ): "local" | "trusted" | "unknown" | "untrusted" {
    if (origin.kind === "absent") return "unknown";
    if (origin.kind === "trusted") return "trusted";
    if (origin.kind === "object" || origin.kind === "list") return "local";
    if (origin.kind === "unknown") return "unknown";

    const current = unwrapNode(origin.node);
    if (seen.has(current)) return "unknown";
    seen.add(current);
    if (
      ts.isArrowFunction(current) ||
      ts.isFunctionExpression(current) ||
      ts.isFunctionDeclaration(current) ||
      ts.isMethodDeclaration(current) ||
      ts.isObjectLiteralExpression(current) ||
      ts.isArrayLiteralExpression(current)
    ) {
      return "local";
    }
    if (ts.isIdentifier(current)) {
      const declaration = localDeclaration(current, bindings);
      const mapped = declaration && origin.context.get(declaration);
      if (mapped) return originTrust(mapped, seen);
      if (declaration && ts.isFunctionDeclaration(declaration)) return "local";
      if (
        declaration &&
        (ts.isParameter(declaration) || ts.isBindingElement(declaration))
      ) {
        return "unknown";
      }
      if (declaration && ts.isVariableDeclaration(declaration)) {
        return originTrust(originForNode(current, origin.context), seen);
      }
      if (!declaration) {
        return ["Math", "JSON", "Number", "String"].includes(current.text)
          ? "trusted"
          : "untrusted";
      }
      return "untrusted";
    }
    const resolved = originForNode(current, origin.context);
    if (
      resolved.kind !== "node" ||
      resolved.node !== current ||
      resolved.context !== origin.context
    ) {
      return originTrust(resolved, seen);
    }
    return "unknown";
  }

  function originEvidence(origin: Origin): ts.Node | undefined {
    if (origin.kind === "node") return origin.node;
    if (origin.kind === "list") {
      const candidates = origin.values
        .map(originEvidence)
        .filter((node): node is ts.Node => Boolean(node));
      return candidates.length === 1 ? candidates[0] : undefined;
    }
    return undefined;
  }

  const inspectReachable = (
    component: string,
    node: ts.Node,
    activeCallables: Set<number>,
    context: OriginContext,
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
      const callee = unwrapNode(node.expression);
      const callable = resolveCallableWithOrigins(callee, context);
      if (ts.isIdentifier(callee)) {
        if (callable) {
          inspectLocalCall(
            component,
            callable,
            node,
            activeCallables,
            context,
          );
        } else {
          const origin = originForNode(callee, context);
          recordViolation(
            component,
            "unresolved action helper",
            node,
            originEvidence(origin) ?? node,
          );
        }
      } else if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        const method = accessName(callee, bindings);
        const unresolvedComputedMember =
          ts.isElementAccessExpression(callee) && method === undefined;
        if (unresolvedComputedMember) {
          recordViolation(component, "unresolved action member", callee);
        } else {
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

          if (callable) {
            inspectLocalCall(
              component,
              callable,
              node,
              activeCallables,
              context,
            );
          } else {
            const receiver = originForNode(callee.expression, context);
            if (originTrust(receiver) !== "trusted") {
              recordViolation(
                component,
                "unresolved action helper",
                node,
                originEvidence(receiver) ?? node,
              );
            }
          }
        }
      } else if (callable) {
        inspectLocalCall(
          component,
          callable,
          node,
          activeCallables,
          context,
        );
      } else {
        recordViolation(component, "unresolved action helper", node);
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

    ts.forEachChild(node, (child) => {
      const callableChild =
        ts.isArrowFunction(child) ||
        ts.isFunctionExpression(child) ||
        ts.isFunctionDeclaration(child) ||
        ts.isMethodDeclaration(child);
      const callbackArgument =
        ts.isCallExpression(node) &&
        node.arguments.some((argument) => unwrapNode(argument) === child);
      if (callableChild && !callbackArgument) return;
      inspectReachable(component, child, activeCallables, context);
    });
  };

  function inspectLocalCall(
    component: string,
    callable: CallableNode,
    call: ts.CallExpression,
    activeCallables: Set<number>,
    callerContext: OriginContext,
  ) {
    if (activeCallables.has(callable.pos)) return;
    activeCallables.add(callable.pos);
    inspectReachable(
      component,
      callable,
      activeCallables,
      callContext(callable, call, callerContext),
    );
    activeCallables.delete(callable.pos);
  }

  const inspectAction = (
    component: string,
    node: ts.Node,
  ) => {
    const registration = unwrapNode(node);
    if (
      ts.isIdentifier(registration) &&
      /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
        registration.text,
      )
    ) {
      recordViolation(component, "stabilization helper", registration);
    }
    const context: OriginContext = new Map();
    const callable = resolveCallableWithOrigins(node, context);
    if (!callable) {
      recordViolation(component, "unresolved action registration", node);
      return;
    }
    const activeCallables = new Set<number>([callable.pos]);
    inspectReachable(
      component,
      callable,
      activeCallables,
      actionContext(callable),
    );
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
        inspectAction(component, property);
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

  test("fails closed for imported and unbound namespace helper calls", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      import * as page from "./page-helpers.mjs";
      async function action({ canvas }) {
        await importedHelpers.inspect(canvas);
        await importedHelpers.actions.inspect(canvas);
        await page.inspect(canvas);
        await externalHelpers["inspect"](canvas);
        await externalHelpers.actions["inspect"](canvas);
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "namespace-helpers", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
    ]);
  });

  test("normalizes parenthesized static and dynamic registration callees", () => {
    const fixture = analyzeTask7VisualSource(`
      const dynamicMember = chooseMember();
      const CASES = new Map([
        ["context-window", [{ name: "tuple" }]],
      ]);
      (CASES["s" + "et"])("context-window", [{ name: "direct" }]);
      (CASES[dynamicMember])("context-window", [{ name: "dynamic" }]);
    `);

    expect(fixture.registrationCounts.get("context-window")).toBe(2);
    expect(fixture.duplicateComponents).toEqual(["context-window"]);
    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved registration member" },
    ]);
  });

  test("normalizes parenthesized and transparent action callees", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const CASES = new Map([["memory-inspector", [{
        name: "wrapped-callees",
        async action({ canvas }) {
          (canvas["evaluate" + "All"])((nodes) => nodes.length);
          (canvas.evaluateAll as typeof canvas.evaluateAll)((nodes) => nodes.length);
          (<typeof canvas.evaluateAll> canvas.evaluateAll)((nodes) => nodes.length);
          (canvas.evaluateAll!)((nodes) => nodes.length);
          (importedHelpers.inspect)(canvas);
          (importedHelpers.actions.inspect!)(canvas);
          (importedHelpers.inspect as typeof importedHelpers.inspect)(canvas);
          (<typeof importedHelpers.inspect> importedHelpers.inspect)(canvas);
        },
      }]]]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("rejects destructured imported receivers", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const { actions } = importedHelpers;
      async function action({ canvas }) {
        await actions.inspect(canvas);
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "destructured-import", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-spillover", kind: "unresolved action helper" },
    ]);
  });

  test("allows parenthesized safe CASES.get calls", () => {
    const fixture = analyzeTask7VisualSource(`
      const CASES = new Map([
        ["context-cards", [{ name: "safe" }]],
      ]);
      (CASES["g" + "et"])("context-cards");
      ((CASES.get))("context-cards");
    `);

    expect(fixture.registrationCounts.get("context-cards")).toBe(1);
    expect(fixture.violations).toEqual([]);
  });

  test("rejects imported and unbound namespaces passed through one wrapper", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const localHelpers = {
        async inspect(canvas) {
          await canvas.getByRole("button").count();
        },
      };
      async function invoke(helper, canvas) {
        await helper.inspect(canvas);
      }
      async function action({ canvas }) {
        await invoke(localHelpers, canvas);
        await invoke(importedHelpers, canvas);
        await invoke(externalHelpers, canvas);
      }
      const CASES = new Map([
        ["context-window", [{ name: "one-wrapper", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("keeps untrusted provenance through aliases, destructuring, rest, spread, and two wrappers", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      async function invoke({ helper: alias, runner: { canvas } }) {
        await alias.actions.inspect(canvas);
      }
      async function relay(helper, ...roots) {
        const payload = {
          helper,
          runner: { canvas: roots[0] },
        };
        await invoke(payload);
      }
      async function action({ canvas }) {
        const namespaceAlias = importedHelpers;
        await relay(namespaceAlias, ...[canvas]);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "two-wrappers", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("accepts runner roots and derived locator controls through local wrappers", () => {
    const fixture = analyzeTask7VisualSource(`
      async function clickControl(control) {
        await control.click();
      }
      async function invokeRunner({ canvas, page, locator }) {
        const control = locator.getByRole("button");
        await clickControl(control);
        await page.keyboard.press("Tab");
        await canvas.getByRole("button").count();
      }
      async function relay(...[payload]) {
        await invokeRunner(payload);
      }
      async function action({ canvas, page }) {
        const locator = canvas.locator("button");
        await relay(...[{ canvas, page, locator }]);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "trusted-wrappers", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("accepts inspectable safe local objects passed through a wrapper", () => {
    const fixture = analyzeTask7VisualSource(`
      const localHelpers = {
        async inspect(control) {
          await control.click();
        },
      };
      async function invoke({ helpers, control }) {
        await helpers.inspect(control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        const helpersAlias = localHelpers;
        await invoke({ helpers: helpersAlias, control });
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "local-object", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("unwraps parenthesized and typed CASES callees before registration classification", () => {
    const fixture = analyzeTask7VisualSource(`
      const dynamicMember = chooseMember();
      const CASES = new Map([
        ["context-window", [{ name: "initial" }]],
      ]);
      ((CASES[dynamicMember]))(
        "context-window",
        [{ name: "parenthesized-registration" }],
      );
      (CASES[dynamicMember] as typeof CASES.set)(
        "context-window",
        [{ name: "as-registration" }],
      );
      (<typeof CASES.set> CASES[dynamicMember])(
        "context-window",
        [{ name: "asserted-registration" }],
      );
      (CASES[dynamicMember]!)(
        "context-window",
        [{ name: "non-null-registration" }],
      );
    `);

    expect(fixture.registrationCounts.get("context-window")).toBe(1);
    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved registration member" },
      { component: "context-window", kind: "unresolved registration member" },
      { component: "context-window", kind: "unresolved registration member" },
      { component: "context-window", kind: "unresolved registration member" },
    ]);
  });

  test("allows parenthesized safe CASES.get calls", () => {
    const fixture = analyzeTask7VisualSource(`
      const CASES = new Map([
        ["context-cards", [{ name: "initial" }]],
      ]);
      (((CASES["g" + "et"])))("context-cards");
    `);

    expect(fixture.registrationCounts.get("context-cards")).toBe(1);
    expect(fixture.violations).toEqual([]);
  });

  test("unwraps parenthesized action callees before DOM and helper classification", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      async function action({ canvas }) {
        await ((canvas["evaluate" + "All"]))((nodes) => nodes.length);
        await ((importedHelpers.inspect))(canvas);
        await (externalHelpers.actions.inspect)(canvas);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "wrapped-callees", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "DOM evaluation" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("rejects destructured and aliased imported receivers", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const {
        actions: importedActions,
        ...importedRest
      } = importedHelpers;
      const aliasedActions = importedActions;
      async function action({ canvas }) {
        await aliasedActions.inspect(canvas);
        await importedRest.inspect(canvas);
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "destructured-imports", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
    ]);
  });

  test("fails closed for dynamic destructuring parameter mappings", () => {
    const fixture = analyzeTask7VisualSource(`
      const dynamicKey = chooseMember();
      const localHelpers = {
        async inspect(canvas) {
          await canvas.getByRole("button").count();
        },
      };
      async function invoke({ [dynamicKey]: helper }, canvas) {
        await helper.inspect(canvas);
      }
      async function action({ canvas }) {
        await invoke({ helper: localHelpers }, canvas);
      }
      const CASES = new Map([
        ["context-window", [{ name: "dynamic-destructuring", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("applies destructuring defaults only to definitely absent values", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const dynamicKey = chooseMember();
      const localHelpers = {
        async inspect(control) {
          await control.click();
        },
      };
      async function invoke({ helper = localHelpers }, control) {
        await helper.inspect(control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await invoke({}, control);
        await invoke({ [dynamicKey]: importedHelpers }, control);
      }
      const CASES = new Map([
        ["context-window", [{ name: "destructuring-default", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("fails closed when unresolved spreads feed destructured rest parameters", () => {
    const fixture = analyzeTask7VisualSource(`
      async function invoke(...[{ helper, canvas }]) {
        await helper.inspect(canvas);
      }
      async function action({ canvas }) {
        await invoke(...externalArguments);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "unresolved-spread", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("fails closed when unresolved spreads shift later safe arguments", () => {
    const fixture = analyzeTask7VisualSource(`
      const localHelpers = {
        async inspect(control) {
          await control.click();
        },
      };
      async function invoke(ignored, helper, control) {
        await helper.inspect(control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await invoke(...externalArguments, localHelpers, control);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "shifted-spread", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("distinguishes safe local callables from imported and unbound callbacks", () => {
    const fixture = analyzeTask7VisualSource(`
      import { inspect as importedInspect } from "./visual-helpers.mjs";
      async function clickControl(control) {
        await control.click();
      }
      async function invoke(callback, control) {
        await callback(control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await invoke(clickControl, control);
        await invoke(importedInspect, control);
        await invoke(externalInspect, control);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "callable-provenance", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("preserves trusted provenance through wrapped Playwright calls", () => {
    const fixture = analyzeTask7VisualSource(`
      async function action({ canvas, page }) {
        const locator = ((canvas.locator))("main");
        const control = ((locator.getByRole))("button");
        await ((control.click))();
        await ((page.keyboard.press))("Tab");
      }
      const CASES = new Map([
        ["context-window", [{ name: "wrapped-safe-calls", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("does not treat runner roots or derived controls as callables", () => {
    const fixture = analyzeTask7VisualSource(`
      async function invokeCanvas(callback) {
        await callback();
      }
      async function invokeControl(callback) {
        await callback();
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await invokeCanvas(canvas);
        await invokeControl(control);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "non-callable-roots", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("keeps imported object spreads untrusted unless a later local property overrides them", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      async function inspect(control) {
        await control.click();
      }
      const unsafeHelpers = { inspect, ...importedHelpers };
      const safeHelpers = { ...importedHelpers, inspect };
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await unsafeHelpers.inspect(control);
        await safeHelpers.inspect(control);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "object-spread-provenance", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("keeps unresolved computed object properties untrusted", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const dynamicKey = chooseMember();
      async function inspect(control) {
        await control.click();
      }
      const helpers = {
        inspect,
        [dynamicKey]: importedHelpers.inspect,
      };
      async function action({ canvas }) {
        await helpers.inspect(canvas.getByRole("button"));
      }
      const CASES = new Map([
        ["context-cards", [{ name: "dynamic-object-member", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("maps safe for-of destructuring to derived controls", () => {
    const fixture = analyzeTask7VisualSource(`
      async function action({ canvas }) {
        const entries = [{ control: canvas.getByRole("button") }];
        for (const { control } of entries) {
          await control.click();
        }
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "for-of-destructuring", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("retains stabilization rejection through action aliases", () => {
    const fixture = analyzeTask7VisualSource(`
      async function inspectRealControl({ canvas }) {
        await canvas.getByRole("button").count();
      }
      const stabilizeAlias = inspectRealControl;
      const CASES = new Map([
        ["context-window", [{ name: "stabilized", action: stabilizeAlias }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "stabilization helper" },
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

  test("counts concatenated tuple and direct registration names", () => {
    const fixture = analyzeTask7VisualSource(`
      const CASES = new Map([
        ["memory-" + "inspector", [{ name: "tuple" }]],
      ]);
      CASES["s" + "et"]("memory-inspector", [{ name: "direct" }]);
    `);

    expect(fixture.registrationCounts.get("memory-inspector")).toBe(2);
    expect(fixture.duplicateComponents).toEqual(["memory-inspector"]);
    expect(fixture.violations).toEqual([]);
  });

  test("rejects concatenated evaluateAll member names", () => {
    const fixture = analyzeTask7VisualSource(`
      const CASES = new Map([
        ["context-window", [{
          name: "computed-evaluation",
          async action({ canvas }) {
            await canvas["evaluate" + "All"]((nodes) => nodes.length);
          },
        }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "DOM evaluation" },
    ]);
  });

  test("normalizes aliased and templated static member names", () => {
    const fixture = analyzeTask7VisualSource(`
      const component = \`memory-inspector\`;
      const setPrefix = \`s\`;
      const setSuffix = ("et");
      const setMethod = \`${"${setPrefix}"}${"${setSuffix}"}\`;
      const evaluationPrefix = "evaluate";
      const evaluationSuffix = \`All\`;
      const evaluationMethod = \`${"${evaluationPrefix}"}${"${evaluationSuffix}"}\`;
      const CASES = new Map([[component, [{
        name: "computed-evaluation",
        async action({ canvas }) {
          await canvas[evaluationMethod]((nodes) => nodes.length);
        },
      }]]]);
      const registry = CASES;
      registry[setMethod](component, [{ name: "duplicate" }]);
    `);

    expect(fixture.registrationCounts.get("memory-inspector")).toBe(2);
    expect(fixture.duplicateComponents).toEqual(["memory-inspector"]);
    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "DOM evaluation" },
    ]);
  });

  test("fails closed for dynamic computed registration and action members", () => {
    const fixture = analyzeTask7VisualSource(`
      const dynamicMember = chooseMember();
      const helpers = {
        inspect: async (canvas) => canvas.getByRole("button").count(),
      };
      const CASES = new Map([["context-window", [{
        name: "dynamic-action",
        async action({ canvas, page }) {
          await canvas[dynamicMember]();
          await page[dynamicMember]();
          await helpers[dynamicMember](canvas);
        },
      }]]]);
      CASES[dynamicMember]("context-window", [{ name: "dynamic-registration" }]);
    `);

    expect(fixture.registrationCounts.get("context-window")).toBe(1);
    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action member" },
      { component: "context-window", kind: "unresolved action member" },
      { component: "context-window", kind: "unresolved action member" },
      { component: "context-window", kind: "unresolved registration member" },
    ]);
  });

  test("fails closed for mutable computed member bindings", () => {
    const fixture = analyzeTask7VisualSource(`
      let mutableMember = "click";
      mutableMember = chooseMember();
      const CASES = new Map([["context-window", [{
        name: "mutable-action",
        async action({ canvas }) {
          await canvas[mutableMember]();
        },
      }]]]);
      CASES[mutableMember]("context-window", [{ name: "mutable-registration" }]);
    `);

    expect(fixture.registrationCounts.get("context-window")).toBe(1);
    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action member" },
      { component: "context-window", kind: "unresolved registration member" },
    ]);
  });

  test("allows safe computed approved operations and numeric helper keys", () => {
    const fixture = analyzeTask7VisualSource(`
      const rolePrefix = \`getBy\`;
      const roleSuffix = "Role";
      const roleMethod = \`${"${rolePrefix}"}${"${roleSuffix}"}\`;
      const clickMethod = ("cl" + "ick");
      const helperKey = 1;
      const helpers = {
        1: async (canvas) => {
          const control = canvas[roleMethod]("button");
          await control[clickMethod]();
        },
      };
      async function action({ canvas, page }) {
        await helpers[helperKey](canvas);
        const pressMethod = "press";
        await page["keyboard"][pressMethod]("Tab");
      }
      const CASES = new Map([
        ["context-cards", [{ name: "safe-computed", action }]],
      ]);
      CASES["g" + "et"]("context-cards");
    `);

    expect(fixture.registrationCounts.get("context-cards")).toBe(1);
    expect(fixture.violations).toEqual([]);
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
