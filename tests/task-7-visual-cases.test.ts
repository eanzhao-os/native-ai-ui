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

type ReturnableNode = CallableNode | ts.GetAccessorDeclaration;

function isCallableNode(node: ts.Node): node is CallableNode {
  return (
    ts.isArrowFunction(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isMethodDeclaration(node)
  );
}

type LocalBindings = {
  checker: ts.TypeChecker;
  functions: Map<string, ts.FunctionDeclaration>;
  initializers: Map<string, ts.Expression>;
  sourceFile: ts.SourceFile;
};

type Origin =
  | { kind: "absent" }
  | {
      context: OriginContext;
      kind: "array-literal";
      node: ts.ArrayLiteralExpression;
    }
  | { kind: "list"; values: Origin[] }
  | { kind: "node"; context: OriginContext; node: ts.Node }
  | { fallback?: Origin; kind: "object"; properties: Map<string, Origin> }
  | {
      context: OriginContext;
      kind: "object-literal";
      node: ts.ObjectLiteralExpression;
    }
  | { excluded: Set<string>; kind: "object-rest"; source: Origin }
  | { kind: "trusted"; root: "canvas" | "derived" | "page" }
  | { kind: "unknown" };

type OriginContext = Map<ts.Node, Origin>;

type OriginResolution = {
  active: Set<string>;
  remaining: number;
  tainted: Set<string>;
};

type ResolvedCallable = {
  callable: CallableNode;
  context: OriginContext;
};

const MAX_ORIGIN_WORK = 512;

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

function directReturnExpression(callable: ReturnableNode) {
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

function directAccessorReturnExpression(accessor: ts.GetAccessorDeclaration) {
  const statements = accessor.body?.statements;
  if (statements?.length !== 1) return undefined;
  const [statement] = statements;
  return ts.isReturnStatement(statement) ? statement.expression : undefined;
}

function resolveCallable(
  node: ts.Node | undefined,
  bindings: LocalBindings,
  seen = new Set<string>(),
): CallableNode | undefined {
  if (!node) return undefined;
  const current = unwrapNode(node);
  if (isCallableNode(current)) return current;
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
  let setter: ts.SetAccessorDeclaration | undefined;
  for (const property of [...object.properties].reverse()) {
    if (ts.isSpreadAssignment(property)) {
      const spread = resolveObject(property.expression, bindings, seen);
      if (!spread) return setter ?? property.expression;
      const resolved = resolveObjectProperty(spread, name, bindings, seen);
      if (resolved) return setter ?? resolved;
      continue;
    }
    if (propertyNameText(property.name, bindings) !== name) continue;
    if (ts.isGetAccessorDeclaration(property)) {
      return directAccessorReturnExpression(property) ?? property;
    }
    if (ts.isSetAccessorDeclaration(property)) {
      setter ??= property;
      continue;
    }
    if (setter) return setter;
    if (ts.isPropertyAssignment(property)) return property.initializer;
    if (ts.isShorthandPropertyAssignment(property)) return property.name;
    if (ts.isMethodDeclaration(property)) return property;
    return property;
  }
  return setter;
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
  const trustedDerivedOrigin: Origin = { kind: "trusted", root: "derived" };
  const unknownOrigin: Origin = { kind: "unknown" };

  const runnerOrigin: Origin = {
    kind: "object",
    properties: new Map([
      ["canvas", { kind: "trusted", root: "canvas" }],
      ["page", { kind: "trusted", root: "page" }],
    ]),
  };

  function createOriginResolution(): OriginResolution {
    return {
      active: new Set(),
      remaining: MAX_ORIGIN_WORK,
      tainted: new Set(),
    };
  }

  function boundedOrigin<T>(
    resolution: OriginResolution,
    key: string,
    fallback: T,
    resolve: () => T,
  ): T {
    if (resolution.remaining <= 0 || resolution.active.has(key)) {
      return fallback;
    }
    resolution.remaining -= 1;
    resolution.active.add(key);
    try {
      return resolve();
    } finally {
      resolution.active.delete(key);
    }
  }

  const originIds = new WeakMap<object, number>();
  let nextOriginId = 1;

  function originKey(origin: Origin): string {
    if (origin.kind === "node") {
      return `node:${origin.node.pos}:${origin.node.end}`;
    }
    if (origin.kind === "object-literal") {
      return `object:${origin.node.pos}:${origin.node.end}`;
    }
    if (origin.kind === "array-literal") {
      return `array:${origin.node.pos}:${origin.node.end}`;
    }
    if (origin.kind === "trusted") return `trusted:${origin.root}`;
    if (origin.kind === "absent" || origin.kind === "unknown") {
      return origin.kind;
    }
    let id = originIds.get(origin);
    if (!id) {
      id = nextOriginId;
      nextOriginId += 1;
      originIds.set(origin, id);
    }
    return `${origin.kind}:${id}`;
  }

  function sameOrigin(left: Origin | undefined, right: Origin | undefined) {
    if (left === right) return true;
    if (!left || !right || left.kind !== right.kind) return false;
    if (left.kind === "trusted" && right.kind === "trusted") {
      return left.root === right.root;
    }
    if (left.kind === "node" && right.kind === "node") {
      return left.node === right.node;
    }
    if (
      left.kind === "object-literal" &&
      right.kind === "object-literal"
    ) {
      return left.node === right.node;
    }
    if (left.kind === "array-literal" && right.kind === "array-literal") {
      return left.node === right.node;
    }
    return left.kind === "absent" || left.kind === "unknown";
  }

  function mergeFlowContexts(
    target: OriginContext,
    contexts: OriginContext[],
  ) {
    const keys = new Set<ts.Node>();
    for (const context of contexts) {
      for (const key of context.keys()) keys.add(key);
    }
    target.clear();
    for (const key of keys) {
      const values = contexts.map((context) => context.get(key));
      const first = values[0];
      target.set(
        key,
        first && values.every((value) => sameOrigin(first, value))
          ? first
          : unknownOrigin,
      );
    }
  }

  function listOrigins(
    origin: Origin,
    resolution: OriginResolution,
  ): Origin[] | undefined {
    return boundedOrigin(
      resolution,
      `list:${originKey(origin)}`,
      undefined,
      () => {
        if (origin.kind === "list") return origin.values;
        if (origin.kind === "array-literal") {
          const values: Origin[] = [];
          for (const element of origin.node.elements) {
            if (ts.isOmittedExpression(element)) {
              values.push(absentOrigin);
            } else if (ts.isSpreadElement(element)) {
              const spread = listOrigins(
                originForNode(element.expression, origin.context, resolution),
                resolution,
              );
              if (!spread) return undefined;
              values.push(...spread);
            } else {
              values.push(originForNode(element, origin.context, resolution));
            }
          }
          return values;
        }
        if (origin.kind === "node") {
          const resolved = originForNode(
            origin.node,
            origin.context,
            resolution,
          );
          return sameOrigin(origin, resolved)
            ? undefined
            : listOrigins(resolved, resolution);
        }
        return undefined;
      },
    );
  }

  function arrayElementOrigin(
    origin: Extract<Origin, { kind: "array-literal" }>,
    index: number,
    resolution: OriginResolution,
  ): Origin {
    let offset = 0;
    for (const element of origin.node.elements) {
      if (ts.isSpreadElement(element)) {
        const spread = listOrigins(
          originForNode(element.expression, origin.context, resolution),
          resolution,
        );
        if (!spread) return unknownOrigin;
        if (index < offset + spread.length) return spread[index - offset];
        offset += spread.length;
        continue;
      }
      if (offset === index) {
        return ts.isOmittedExpression(element)
          ? absentOrigin
          : originForNode(element, origin.context, resolution);
      }
      offset += 1;
    }
    return absentOrigin;
  }

  function accessorOrigin(
    accessor: ts.GetAccessorDeclaration,
    context: OriginContext,
    resolution: OriginResolution,
  ): Origin {
    const returned = directAccessorReturnExpression(accessor);
    return returned
      ? originForNode(returned, context, resolution)
      : unknownOrigin;
  }

  function propertyOrigin(
    origin: Origin,
    name: string,
    resolution: OriginResolution,
  ): Origin {
    return boundedOrigin(
      resolution,
      `property:${originKey(origin)}:${name}`,
      unknownOrigin,
      () => {
        if (resolution.tainted.has(originKey(origin))) return unknownOrigin;
        if (origin.kind === "trusted") return trustedDerivedOrigin;
        if (origin.kind === "object") {
          return origin.properties.get(name) ?? origin.fallback ?? absentOrigin;
        }
        if (origin.kind === "object-rest") {
          return origin.excluded.has(name)
            ? absentOrigin
            : propertyOrigin(origin.source, name, resolution);
        }
        if (origin.kind === "object-literal") {
          let setter: ts.SetAccessorDeclaration | undefined;
          for (const property of [...origin.node.properties].reverse()) {
            if (ts.isSpreadAssignment(property)) {
              const spreadValue = propertyOrigin(
                originForNode(property.expression, origin.context, resolution),
                name,
                resolution,
              );
              if (spreadValue.kind !== "absent") {
                return setter ? unknownOrigin : spreadValue;
              }
              continue;
            }
            const propertyName = propertyNameText(property.name, bindings);
            if (!propertyName) {
              if (ts.isComputedPropertyName(property.name)) return unknownOrigin;
              continue;
            }
            if (propertyName !== name) continue;
            if (ts.isSetAccessorDeclaration(property)) {
              setter ??= property;
              continue;
            }
            if (ts.isGetAccessorDeclaration(property)) {
              return accessorOrigin(property, origin.context, resolution);
            }
            if (setter) return unknownOrigin;
            if (ts.isPropertyAssignment(property)) {
              return originForNode(
                property.initializer,
                origin.context,
                resolution,
              );
            }
            if (ts.isShorthandPropertyAssignment(property)) {
              return originForNode(property.name, origin.context, resolution);
            }
            if (ts.isMethodDeclaration(property)) {
              return { kind: "node", context: origin.context, node: property };
            }
            return unknownOrigin;
          }
          return setter ? unknownOrigin : absentOrigin;
        }
        if (origin.kind === "array-literal") {
          const index = Number(name);
          return Number.isInteger(index) && index >= 0
            ? arrayElementOrigin(origin, index, resolution)
            : unknownOrigin;
        }
        if (origin.kind === "list") {
          const index = Number(name);
          return Number.isInteger(index) && index >= 0
            ? origin.values[index] ?? absentOrigin
            : unknownOrigin;
        }
        if (origin.kind === "node") {
          const resolved = originForNode(
            origin.node,
            origin.context,
            resolution,
          );
          return sameOrigin(origin, resolved)
            ? origin
            : propertyOrigin(resolved, name, resolution);
        }
        return unknownOrigin;
      },
    );
  }

  function bindPattern(
    name: ts.BindingName,
    origin: Origin,
    context: OriginContext,
    resolution: OriginResolution,
  ) {
    if (ts.isIdentifier(name)) {
      context.set(localDeclaration(name, bindings) ?? name, origin);
      return;
    }

    if (ts.isObjectBindingPattern(name)) {
      const used = new Set<string>();
      for (const element of name.elements) {
        if (element.dotDotDotToken) {
          bindPattern(
            element.name,
            origin.kind === "unknown"
              ? unknownOrigin
              : { excluded: new Set(used), kind: "object-rest", source: origin },
            context,
            resolution,
          );
          continue;
        }
        const key = element.propertyName
          ? propertyNameText(element.propertyName, bindings)
          : ts.isIdentifier(element.name)
            ? element.name.text
            : undefined;
        let value = key
          ? propertyOrigin(origin, key, resolution)
          : unknownOrigin;
        if (key) used.add(key);
        if (value.kind === "absent" && element.initializer) {
          value = originForNode(element.initializer, context, resolution);
        }
        bindPattern(element.name, value, context, resolution);
      }
      return;
    }

    let offset = 0;
    for (const element of name.elements) {
      if (ts.isOmittedExpression(element)) {
        offset += 1;
        continue;
      }
      if (element.dotDotDotToken) {
        const values = listOrigins(origin, resolution);
        bindPattern(
          element.name,
          values ? { kind: "list", values: values.slice(offset) } : unknownOrigin,
          context,
          resolution,
        );
        break;
      }
      let value = propertyOrigin(origin, String(offset), resolution);
      if (value.kind === "absent" && element.initializer) {
        value = originForNode(element.initializer, context, resolution);
      }
      bindPattern(element.name, value, context, resolution);
      offset += 1;
    }
  }

  function iterableElementOrigin(
    iterable: Origin,
    resolution: OriginResolution,
  ): Origin {
    if (iterable.kind === "trusted") return trustedDerivedOrigin;
    const values = listOrigins(iterable, resolution);
    if (!values?.length) return unknownOrigin;
    if (values.length === 1) return values[0];
    if (values.every((value) => value.kind === "trusted")) {
      return trustedDerivedOrigin;
    }
    const first = values[0];
    return values.every((value) => sameOrigin(first, value))
      ? first
      : unknownOrigin;
  }

  function bindingElementOrigin(
    declaration: ts.BindingElement,
    context: OriginContext,
    resolution: OriginResolution,
  ) {
    let pattern: ts.Node = declaration.parent;
    let container = pattern.parent;
    while (ts.isBindingElement(container)) {
      pattern = container.parent;
      container = pattern.parent;
    }
    if (!ts.isVariableDeclaration(container)) return unknownOrigin;
    const origin = container.initializer
      ? originForNode(container.initializer, context, resolution)
      : forOfElementOrigin(container, context, resolution);
    const derived = new Map(context);
    bindPattern(container.name, origin, derived, resolution);
    return derived.get(declaration) ?? unknownOrigin;
  }

  function forOfElementOrigin(
    declaration: ts.VariableDeclaration,
    context: OriginContext,
    resolution: OriginResolution,
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
    return iterableElementOrigin(
      originForNode(loop.expression, context, resolution),
      resolution,
    );
  }

  function originForNode(
    node: ts.Node | undefined,
    context: OriginContext,
    resolution: OriginResolution,
  ): Origin {
    if (!node) return unknownOrigin;
    const current = unwrapNode(node);
    return boundedOrigin(
      resolution,
      `origin:${current.pos}:${current.end}`,
      unknownOrigin,
      () => {
        if (ts.isAwaitExpression(current)) {
          return originForNode(current.expression, context, resolution);
        }
        if (ts.isSpreadElement(current)) {
          return originForNode(current.expression, context, resolution);
        }
        if (ts.isIdentifier(current)) {
          const declaration = localDeclaration(current, bindings);
          const mapped = declaration && context.get(declaration);
          if (mapped) return mapped;
          if (declaration && ts.isVariableDeclaration(declaration)) {
            if (declaration.initializer) {
              return originForNode(
                declaration.initializer,
                context,
                resolution,
              );
            }
            return forOfElementOrigin(declaration, context, resolution);
          }
          if (declaration && ts.isBindingElement(declaration)) {
            return bindingElementOrigin(declaration, context, resolution);
          }
          if (declaration && ts.isFunctionDeclaration(declaration)) {
            return { kind: "node", context, node: declaration };
          }
          if (declaration && ts.isParameter(declaration)) return unknownOrigin;
          return { kind: "node", context, node: current };
        }
        if (isCallableNode(current)) {
          return { kind: "node", context, node: current };
        }
        if (ts.isObjectLiteralExpression(current)) {
          return { context, kind: "object-literal", node: current };
        }
        if (ts.isArrayLiteralExpression(current)) {
          return { context, kind: "array-literal", node: current };
        }
        if (
          ts.isPropertyAccessExpression(current) ||
          ts.isElementAccessExpression(current)
        ) {
          const name = accessName(current, bindings);
          return name
            ? propertyOrigin(
                originForNode(current.expression, context, resolution),
                name,
                resolution,
              )
            : unknownOrigin;
        }
        if (ts.isCallExpression(current)) {
          const callee = unwrapNode(current.expression);
          const resolved = resolveCallableWithOrigins(
            callee,
            context,
            resolution,
          );
          if (resolved) {
            const returned = directReturnExpression(resolved.callable);
            if (returned) {
              return originForNode(
                returned,
                callContext(
                  resolved.callable,
                  current,
                  context,
                  resolved.context,
                  resolution,
                ),
                resolution,
              );
            }
          }
          if (
            ts.isPropertyAccessExpression(callee) ||
            ts.isElementAccessExpression(callee)
          ) {
            const receiver = originForNode(
              callee.expression,
              context,
              resolution,
            );
            if (receiver.kind === "trusted") return trustedDerivedOrigin;
          }
          return { kind: "node", context, node: current };
        }
        if (ts.isConditionalExpression(current)) {
          const whenTrue = originForNode(
            current.whenTrue,
            context,
            resolution,
          );
          const whenFalse = originForNode(
            current.whenFalse,
            context,
            resolution,
          );
          return sameOrigin(whenTrue, whenFalse) ? whenTrue : unknownOrigin;
        }
        return { kind: "node", context, node: current };
      },
    );
  }

  function resolvedCallableFromOrigin(
    origin: Origin,
    resolution: OriginResolution,
  ): ResolvedCallable | undefined {
    if (origin.kind !== "node") return undefined;
    return resolveCallableWithOrigins(
      origin.node,
      origin.context,
      resolution,
    );
  }

  function resolveCallableWithOrigins(
    node: ts.Node | undefined,
    context: OriginContext,
    resolution: OriginResolution,
  ): ResolvedCallable | undefined {
    if (!node) return undefined;
    const current = unwrapNode(node);
    return boundedOrigin(
      resolution,
      `callable:${current.pos}:${current.end}`,
      undefined,
      () => {
        if (isCallableNode(current)) return { callable: current, context };
        if (ts.isIdentifier(current)) {
          const declaration = localDeclaration(current, bindings);
          const mapped = declaration && context.get(declaration);
          if (mapped) return resolvedCallableFromOrigin(mapped, resolution);
          if (declaration && ts.isFunctionDeclaration(declaration)) {
            return { callable: declaration, context };
          }
          if (declaration && ts.isVariableDeclaration(declaration)) {
            return resolveCallableWithOrigins(
              declaration.initializer,
              context,
              resolution,
            );
          }
          if (declaration && ts.isBindingElement(declaration)) {
            return resolvedCallableFromOrigin(
              bindingElementOrigin(declaration, context, resolution),
              resolution,
            );
          }
          return undefined;
        }
        if (
          ts.isPropertyAccessExpression(current) ||
          ts.isElementAccessExpression(current)
        ) {
          const name = accessName(current, bindings);
          if (!name) return undefined;
          return resolvedCallableFromOrigin(
            propertyOrigin(
              originForNode(current.expression, context, resolution),
              name,
              resolution,
            ),
            resolution,
          );
        }
        if (ts.isCallExpression(current)) {
          return resolvedCallableFromOrigin(
            originForNode(current, context, resolution),
            resolution,
          );
        }
        return undefined;
      },
    );
  }

  function expandedArgumentOrigins(
    call: ts.CallExpression,
    context: OriginContext,
    resolution: OriginResolution,
  ) {
    const values: Origin[] = [];
    let ambiguousFrom: number | undefined;
    for (const argument of call.arguments) {
      if (ambiguousFrom !== undefined) continue;
      if (ts.isSpreadElement(argument)) {
        const spread = listOrigins(
          originForNode(argument.expression, context, resolution),
          resolution,
        );
        if (spread) values.push(...spread);
        else ambiguousFrom = values.length;
      } else {
        values.push(originForNode(argument, context, resolution));
      }
    }
    return { ambiguousFrom, values };
  }

  function callContext(
    callable: CallableNode,
    call: ts.CallExpression,
    callerContext: OriginContext,
    closureContext: OriginContext,
    resolution: OriginResolution,
  ) {
    const context = new Map(closureContext);
    const { ambiguousFrom, values } = expandedArgumentOrigins(
      call,
      callerContext,
      resolution,
    );
    let argumentIndex = 0;
    for (const parameter of callable.parameters) {
      let origin: Origin;
      const ambiguous =
        ambiguousFrom !== undefined && argumentIndex >= ambiguousFrom;
      if (parameter.dotDotDotToken) {
        origin = ambiguous
          ? unknownOrigin
          : { kind: "list", values: values.slice(argumentIndex) };
        argumentIndex = values.length;
      } else {
        origin = ambiguous
          ? unknownOrigin
          : values[argumentIndex] ?? absentOrigin;
        argumentIndex += 1;
      }
      if (origin.kind === "absent" && parameter.initializer) {
        origin = originForNode(parameter.initializer, context, resolution);
      }
      bindPattern(parameter.name, origin, context, resolution);
    }
    return context;
  }

  function actionContext(
    resolved: ResolvedCallable,
    resolution: OriginResolution,
  ) {
    const context: OriginContext = new Map(resolved.context);
    const [first, ...remaining] = resolved.callable.parameters;
    if (first) {
      const origin = first.dotDotDotToken
        ? ({ kind: "list", values: [runnerOrigin] } as Origin)
        : runnerOrigin;
      bindPattern(first.name, origin, context, resolution);
    }
    for (const parameter of remaining) {
      const origin = parameter.initializer
        ? originForNode(parameter.initializer, context, resolution)
        : absentOrigin;
      bindPattern(parameter.name, origin, context, resolution);
    }
    return context;
  }

  const runnerCallbackArguments = new Map<string, ReadonlySet<number>>([
    ["addListener", new Set([1])],
    ["evaluate", new Set([0])],
    ["evaluateAll", new Set([0])],
    ["evaluateHandle", new Set([0])],
    ["exposeBinding", new Set([1])],
    ["exposeFunction", new Set([1])],
    ["on", new Set([1])],
    ["once", new Set([1])],
    ["prependListener", new Set([1])],
    ["route", new Set([1])],
    ["unroute", new Set([1])],
    ["waitForFunction", new Set([0])],
    ["waitForRequest", new Set([0])],
    ["waitForResponse", new Set([0])],
  ]);

  function trustedPatternOrigin(name: ts.BindingName, rest = false): Origin {
    if (ts.isIdentifier(name)) {
      return rest
        ? { kind: "list", values: [trustedDerivedOrigin] }
        : trustedDerivedOrigin;
    }
    if (ts.isObjectBindingPattern(name)) {
      const properties = new Map<string, Origin>();
      for (const element of name.elements) {
        if (element.dotDotDotToken) continue;
        const key = element.propertyName
          ? propertyNameText(element.propertyName, bindings)
          : ts.isIdentifier(element.name)
            ? element.name.text
            : undefined;
        if (key) properties.set(key, trustedPatternOrigin(element.name));
      }
      return { fallback: trustedDerivedOrigin, kind: "object", properties };
    }
    const values: Origin[] = [];
    for (const element of name.elements) {
      values.push(
        ts.isOmittedExpression(element)
          ? trustedDerivedOrigin
          : trustedPatternOrigin(element.name),
      );
    }
    return {
      kind: "list",
      values: values.length > 0 ? values : [trustedDerivedOrigin],
    };
  }

  function runnerCallbackContext(
    resolved: ResolvedCallable,
    resolution: OriginResolution,
  ) {
    const context = new Map(resolved.context);
    for (const parameter of resolved.callable.parameters) {
      bindPattern(
        parameter.name,
        trustedPatternOrigin(parameter.name, Boolean(parameter.dotDotDotToken)),
        context,
        resolution,
      );
    }
    return context;
  }

  function originTrust(
    origin: Origin,
    resolution: OriginResolution,
  ): "local" | "trusted" | "unknown" | "untrusted" {
    return boundedOrigin(
      resolution,
      `trust:${originKey(origin)}`,
      "unknown" as const,
      () => {
        if (origin.kind === "absent") return "unknown";
        if (origin.kind === "trusted") return "trusted";
        if (
          origin.kind === "object" ||
          origin.kind === "object-literal" ||
          origin.kind === "object-rest" ||
          origin.kind === "array-literal" ||
          origin.kind === "list"
        ) {
          return "local";
        }
        if (origin.kind === "unknown") return "unknown";

        const current = unwrapNode(origin.node);
        if (
          isCallableNode(current) ||
          ts.isObjectLiteralExpression(current) ||
          ts.isArrayLiteralExpression(current)
        ) {
          return "local";
        }
        if (ts.isIdentifier(current)) {
          const declaration = localDeclaration(current, bindings);
          const mapped = declaration && origin.context.get(declaration);
          if (mapped) return originTrust(mapped, resolution);
          if (declaration && ts.isFunctionDeclaration(declaration)) return "local";
          if (
            declaration &&
            (ts.isParameter(declaration) || ts.isBindingElement(declaration))
          ) {
            return "unknown";
          }
          if (declaration && ts.isVariableDeclaration(declaration)) {
            return originTrust(
              originForNode(current, origin.context, resolution),
              resolution,
            );
          }
          if (!declaration) {
            return ["Math", "JSON", "Number", "String"].includes(current.text)
              ? "trusted"
              : "untrusted";
          }
          return "untrusted";
        }
        const resolved = originForNode(current, origin.context, resolution);
        return sameOrigin(origin, resolved)
          ? "unknown"
          : originTrust(resolved, resolution);
      },
    );
  }

  function originEvidence(origin: Origin): ts.Node | undefined {
    if (origin.kind === "node") return origin.node;
    if (origin.kind === "object-literal" || origin.kind === "array-literal") {
      return origin.node;
    }
    if (origin.kind === "object-rest") return originEvidence(origin.source);
    if (origin.kind === "list") {
      const candidates = origin.values
        .map(originEvidence)
        .filter((node): node is ts.Node => Boolean(node));
      return candidates.length === 1 ? candidates[0] : undefined;
    }
    return undefined;
  }

  function assignmentRootIdentifier(node: ts.Expression) {
    let current = unwrapNode(node);
    while (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      current = unwrapNode(current.expression);
    }
    return ts.isIdentifier(current) ? current : undefined;
  }

  function assignFlowTarget(
    target: ts.Expression,
    origin: Origin,
    context: OriginContext,
    resolution: OriginResolution,
  ) {
    const current = unwrapNode(target);
    if (ts.isIdentifier(current)) {
      const declaration = localDeclaration(current, bindings);
      if (declaration) context.set(declaration, origin);
      return;
    }
    if (ts.isObjectLiteralExpression(current)) {
      const used = new Set<string>();
      for (const property of current.properties) {
        if (ts.isSpreadAssignment(property)) {
          assignFlowTarget(
            property.expression,
            origin.kind === "unknown"
              ? unknownOrigin
              : { excluded: new Set(used), kind: "object-rest", source: origin },
            context,
            resolution,
          );
          continue;
        }
        const key = propertyNameText(property.name, bindings);
        let value = key
          ? propertyOrigin(origin, key, resolution)
          : unknownOrigin;
        if (key) used.add(key);
        if (ts.isPropertyAssignment(property)) {
          let assignmentTarget = property.initializer;
          if (
            ts.isBinaryExpression(assignmentTarget) &&
            assignmentTarget.operatorToken.kind === ts.SyntaxKind.EqualsToken
          ) {
            if (value.kind === "absent") {
              value = originForNode(
                assignmentTarget.right,
                context,
                resolution,
              );
            }
            assignmentTarget = assignmentTarget.left;
          }
          assignFlowTarget(assignmentTarget, value, context, resolution);
        } else if (ts.isShorthandPropertyAssignment(property)) {
          if (value.kind === "absent" && property.objectAssignmentInitializer) {
            value = originForNode(
              property.objectAssignmentInitializer,
              context,
              resolution,
            );
          }
          assignFlowTarget(property.name, value, context, resolution);
        }
      }
      return;
    }
    if (ts.isArrayLiteralExpression(current)) {
      let offset = 0;
      for (const element of current.elements) {
        if (ts.isOmittedExpression(element)) {
          offset += 1;
          continue;
        }
        if (ts.isSpreadElement(element)) {
          const values = listOrigins(origin, resolution);
          assignFlowTarget(
            element.expression,
            values
              ? { kind: "list", values: values.slice(offset) }
              : unknownOrigin,
            context,
            resolution,
          );
          break;
        }
        let value = propertyOrigin(origin, String(offset), resolution);
        let assignmentTarget = element;
        if (
          ts.isBinaryExpression(assignmentTarget) &&
          assignmentTarget.operatorToken.kind === ts.SyntaxKind.EqualsToken
        ) {
          if (value.kind === "absent") {
            value = originForNode(
              assignmentTarget.right,
              context,
              resolution,
            );
          }
          assignmentTarget = assignmentTarget.left;
        }
        assignFlowTarget(assignmentTarget, value, context, resolution);
        offset += 1;
      }
      return;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      const previous = originForNode(current.expression, context, resolution);
      if (
        previous.kind !== "absent" &&
        previous.kind !== "trusted" &&
        previous.kind !== "unknown"
      ) {
        resolution.tainted.add(originKey(previous));
      }
      for (const [candidate, value] of context) {
        if (sameOrigin(previous, value)) context.set(candidate, unknownOrigin);
      }
      const root = assignmentRootIdentifier(current.expression);
      const declaration = root && localDeclaration(root, bindings);
      if (declaration) context.set(declaration, unknownOrigin);
    }
  }

  const approvedGlobalCalls = new Set(["Boolean", "Number", "String"]);

  function inspectRunnerCallback(
    component: string,
    resolved: ResolvedCallable,
    activeCallables: Set<number>,
    resolution: OriginResolution,
  ) {
    if (activeCallables.has(resolved.callable.pos)) {
      recordViolation(component, "unresolved action helper", resolved.callable);
      return;
    }
    activeCallables.add(resolved.callable.pos);
    inspectReachable(
      component,
      resolved.callable.body,
      activeCallables,
      runnerCallbackContext(resolved, resolution),
      resolution,
    );
    activeCallables.delete(resolved.callable.pos);
  }

  function inspectTrustedCallCallbacks(
    component: string,
    call: ts.CallExpression,
    method: string | undefined,
    activeCallables: Set<number>,
    context: OriginContext,
    resolution: OriginResolution,
  ) {
    const requiredCallbackIndexes = method
      ? runnerCallbackArguments.get(method)
      : undefined;
    for (const [index, argument] of call.arguments.entries()) {
      const origin = originForNode(argument, context, resolution);
      const resolved = resolvedCallableFromOrigin(origin, resolution);
      if (resolved) {
        inspectRunnerCallback(
          component,
          resolved,
          activeCallables,
          resolution,
        );
      } else if (requiredCallbackIndexes?.has(index)) {
        recordViolation(
          component,
          "unresolved action helper",
          argument,
          originEvidence(origin) ?? argument,
        );
      }
    }
  }

  function inspectReachable(
    component: string,
    node: ts.Node | undefined,
    activeCallables: Set<number>,
    context: OriginContext,
    resolution: OriginResolution,
  ): void {
    if (!node) return;
    if (
      ts.isIdentifier(node) &&
      /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
        node.text,
      )
    ) {
      recordViolation(component, "stabilization helper", node);
    }

    if (
      isCallableNode(node) ||
      ts.isGetAccessorDeclaration(node) ||
      ts.isSetAccessorDeclaration(node)
    ) {
      return;
    }
    if (ts.isBlock(node) || ts.isSourceFile(node)) {
      for (const statement of node.statements) {
        inspectReachable(
          component,
          statement,
          activeCallables,
          context,
          resolution,
        );
      }
      return;
    }
    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        inspectReachable(
          component,
          declaration,
          activeCallables,
          context,
          resolution,
        );
      }
      return;
    }
    if (ts.isVariableDeclaration(node)) {
      if (node.initializer) {
        inspectReachable(
          component,
          node.initializer,
          activeCallables,
          context,
          resolution,
        );
      }
      const origin = node.initializer
        ? originForNode(node.initializer, context, resolution)
        : forOfElementOrigin(node, context, resolution);
      bindPattern(node.name, origin, context, resolution);
      return;
    }
    if (ts.isExpressionStatement(node)) {
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      return;
    }
    if (ts.isIfStatement(node)) {
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      const before = new Map(context);
      const whenTrue = new Map(before);
      const whenFalse = new Map(before);
      inspectReachable(
        component,
        node.thenStatement,
        activeCallables,
        whenTrue,
        resolution,
      );
      if (node.elseStatement) {
        inspectReachable(
          component,
          node.elseStatement,
          activeCallables,
          whenFalse,
          resolution,
        );
      }
      mergeFlowContexts(context, [whenTrue, whenFalse]);
      return;
    }
    if (ts.isSwitchStatement(node)) {
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      const before = new Map(context);
      const branches: OriginContext[] = [before];
      for (const clause of node.caseBlock.clauses) {
        const branch = new Map(before);
        if (ts.isCaseClause(clause)) {
          inspectReachable(
            component,
            clause.expression,
            activeCallables,
            branch,
            resolution,
          );
        }
        for (const statement of clause.statements) {
          inspectReachable(
            component,
            statement,
            activeCallables,
            branch,
            resolution,
          );
        }
        branches.push(branch);
      }
      mergeFlowContexts(context, branches);
      return;
    }
    if (ts.isForOfStatement(node)) {
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      const before = new Map(context);
      const loopContext = new Map(before);
      const element = iterableElementOrigin(
        originForNode(node.expression, context, resolution),
        resolution,
      );
      if (ts.isVariableDeclarationList(node.initializer)) {
        for (const declaration of node.initializer.declarations) {
          bindPattern(declaration.name, element, loopContext, resolution);
        }
      } else {
        assignFlowTarget(node.initializer, element, loopContext, resolution);
      }
      inspectReachable(
        component,
        node.statement,
        activeCallables,
        loopContext,
        resolution,
      );
      mergeFlowContexts(context, [before, loopContext]);
      return;
    }
    if (ts.isForInStatement(node)) {
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      const before = new Map(context);
      const loopContext = new Map(before);
      if (ts.isVariableDeclarationList(node.initializer)) {
        for (const declaration of node.initializer.declarations) {
          bindPattern(declaration.name, unknownOrigin, loopContext, resolution);
        }
      } else {
        assignFlowTarget(
          node.initializer,
          unknownOrigin,
          loopContext,
          resolution,
        );
      }
      inspectReachable(
        component,
        node.statement,
        activeCallables,
        loopContext,
        resolution,
      );
      mergeFlowContexts(context, [before, loopContext]);
      return;
    }
    if (ts.isForStatement(node)) {
      const before = new Map(context);
      const loopContext = new Map(before);
      if (node.initializer) {
        inspectReachable(
          component,
          node.initializer,
          activeCallables,
          loopContext,
          resolution,
        );
      }
      if (node.condition) {
        inspectReachable(
          component,
          node.condition,
          activeCallables,
          loopContext,
          resolution,
        );
      }
      inspectReachable(
        component,
        node.statement,
        activeCallables,
        loopContext,
        resolution,
      );
      if (node.incrementor) {
        inspectReachable(
          component,
          node.incrementor,
          activeCallables,
          loopContext,
          resolution,
        );
      }
      mergeFlowContexts(context, [before, loopContext]);
      return;
    }
    if (ts.isWhileStatement(node) || ts.isDoStatement(node)) {
      const before = new Map(context);
      const loopContext = new Map(before);
      inspectReachable(
        component,
        node.expression,
        activeCallables,
        loopContext,
        resolution,
      );
      inspectReachable(
        component,
        node.statement,
        activeCallables,
        loopContext,
        resolution,
      );
      mergeFlowContexts(context, [before, loopContext]);
      return;
    }
    if (ts.isTryStatement(node)) {
      const before = new Map(context);
      const branches: OriginContext[] = [new Map(before)];
      inspectReachable(
        component,
        node.tryBlock,
        activeCallables,
        branches[0],
        resolution,
      );
      if (node.catchClause) {
        const caught = new Map(before);
        if (node.catchClause.variableDeclaration) {
          bindPattern(
            node.catchClause.variableDeclaration.name,
            unknownOrigin,
            caught,
            resolution,
          );
        }
        inspectReachable(
          component,
          node.catchClause.block,
          activeCallables,
          caught,
          resolution,
        );
        branches.push(caught);
      } else if (node.finallyBlock) {
        branches.push(before);
      }
      mergeFlowContexts(context, branches);
      if (node.finallyBlock) {
        inspectReachable(
          component,
          node.finallyBlock,
          activeCallables,
          context,
          resolution,
        );
      }
      return;
    }
    if (ts.isReturnStatement(node) || ts.isThrowStatement(node)) {
      if (node.expression) {
        inspectReachable(
          component,
          node.expression,
          activeCallables,
          context,
          resolution,
        );
      }
      return;
    }
    if (ts.isConditionalExpression(node)) {
      inspectReachable(
        component,
        node.condition,
        activeCallables,
        context,
        resolution,
      );
      const whenTrue = new Map(context);
      const whenFalse = new Map(context);
      inspectReachable(
        component,
        node.whenTrue,
        activeCallables,
        whenTrue,
        resolution,
      );
      inspectReachable(
        component,
        node.whenFalse,
        activeCallables,
        whenFalse,
        resolution,
      );
      mergeFlowContexts(context, [whenTrue, whenFalse]);
      return;
    }
    if (ts.isBinaryExpression(node)) {
      const assignment =
        node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
        node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
      if (assignment) {
        inspectReachable(
          component,
          node.right,
          activeCallables,
          context,
          resolution,
        );
        if (
          (ts.isPropertyAccessExpression(node.left) ||
            ts.isElementAccessExpression(node.left)) &&
          ["hidden", "innerHTML", "innerText", "outerHTML", "textContent"].includes(
            accessName(node.left, bindings) ?? "",
          )
        ) {
          recordViolation(component, "DOM rewrite", node);
        }
        const origin =
          node.operatorToken.kind === ts.SyntaxKind.EqualsToken
            ? originForNode(node.right, context, resolution)
            : unknownOrigin;
        assignFlowTarget(node.left, origin, context, resolution);
        return;
      }
      if (
        node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
        node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
        node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
      ) {
        inspectReachable(
          component,
          node.left,
          activeCallables,
          context,
          resolution,
        );
        const skipped = new Map(context);
        const evaluated = new Map(context);
        inspectReachable(
          component,
          node.right,
          activeCallables,
          evaluated,
          resolution,
        );
        mergeFlowContexts(context, [skipped, evaluated]);
        return;
      }
    }
    if (
      ts.isPostfixUnaryExpression(node) ||
      (ts.isPrefixUnaryExpression(node) &&
        (node.operator === ts.SyntaxKind.PlusPlusToken ||
          node.operator === ts.SyntaxKind.MinusMinusToken))
    ) {
      assignFlowTarget(node.operand, unknownOrigin, context, resolution);
    }
    if (ts.isCallExpression(node)) {
      const callee = unwrapNode(node.expression);
      const resolved = resolveCallableWithOrigins(
        callee,
        context,
        resolution,
      );
      if (ts.isIdentifier(callee)) {
        if (resolved) {
          inspectLocalCall(
            component,
            resolved,
            node,
            activeCallables,
            context,
            resolution,
          );
        } else if (!approvedGlobalCalls.has(callee.text)) {
          const origin = originForNode(callee, context, resolution);
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
        if (ts.isElementAccessExpression(callee) && method === undefined) {
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
          const receiver = originForNode(
            callee.expression,
            context,
            resolution,
          );
          const receiverTrust = originTrust(receiver, resolution);
          if (resolved) {
            inspectLocalCall(
              component,
              resolved,
              node,
              activeCallables,
              context,
              resolution,
            );
          } else if (receiverTrust !== "trusted") {
            recordViolation(
              component,
              "unresolved action helper",
              node,
              originEvidence(receiver) ?? node,
            );
          }
          if (receiverTrust === "trusted") {
            inspectTrustedCallCallbacks(
              component,
              node,
              method,
              activeCallables,
              context,
              resolution,
            );
          }
        }
      } else if (resolved) {
        inspectLocalCall(
          component,
          resolved,
          node,
          activeCallables,
          context,
          resolution,
        );
      } else {
        recordViolation(component, "unresolved action helper", node);
      }

      inspectReachable(
        component,
        node.expression,
        activeCallables,
        context,
        resolution,
      );
      for (const argument of node.arguments) {
        if (isCallableNode(unwrapNode(argument))) continue;
        inspectReachable(
          component,
          argument,
          activeCallables,
          context,
          resolution,
        );
      }
      return;
    }
    if (
      ts.isPropertyAccessExpression(node) ||
      ts.isElementAccessExpression(node)
    ) {
      if (["style", "classList"].includes(accessName(node, bindings) ?? "")) {
        recordViolation(component, "style mutation", node);
      }
    }

    ts.forEachChild(node, (child) => {
      if (
        isCallableNode(child) ||
        ts.isGetAccessorDeclaration(child) ||
        ts.isSetAccessorDeclaration(child)
      ) {
        return;
      }
      inspectReachable(
        component,
        child,
        activeCallables,
        context,
        resolution,
      );
    });
  }

  function inspectLocalCall(
    component: string,
    resolved: ResolvedCallable,
    call: ts.CallExpression,
    activeCallables: Set<number>,
    callerContext: OriginContext,
    resolution: OriginResolution,
  ) {
    if (activeCallables.has(resolved.callable.pos)) {
      recordViolation(component, "unresolved action helper", call);
      return;
    }
    activeCallables.add(resolved.callable.pos);
    inspectReachable(
      component,
      resolved.callable.body,
      activeCallables,
      callContext(
        resolved.callable,
        call,
        callerContext,
        resolved.context,
        resolution,
      ),
      resolution,
    );
    activeCallables.delete(resolved.callable.pos);
  }

  const inspectAction = (component: string, node: ts.Node) => {
    const registration = unwrapNode(node);
    if (
      ts.isIdentifier(registration) &&
      /^(?:canonicalize|freezeCaseMotion|hideMatching|replaceWithCanonical|stabilize)/.test(
        registration.text,
      )
    ) {
      recordViolation(component, "stabilization helper", registration);
    }
    const resolution = createOriginResolution();
    const resolved = resolveCallableWithOrigins(
      node,
      new Map(),
      resolution,
    );
    if (!resolved) {
      recordViolation(component, "unresolved action registration", node);
      return;
    }
    const activeCallables = new Set<number>([resolved.callable.pos]);
    inspectReachable(
      component,
      resolved.callable.body,
      activeCallables,
      actionContext(resolved, resolution),
      resolution,
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

  test("keeps getter-returned imports untrusted through destructuring defaults", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      const source = {
        get helper() {
          return importedHelpers;
        },
      };
      async function action({ canvas }) {
        const { helper = safeLocal } = source;
        await helper.inspect(canvas.getByRole("button"));
      }
      const CASES = new Map([
        ["context-window", [{ name: "getter-default", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("preserves getter provenance through aliases, spreads, computed names, and property order", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      const helperKey = "helper";
      const getterSource = {
        get [helperKey]() {
          return importedHelpers;
        },
      };
      const getterAlias = getterSource;
      const spreadAfterSafe = { helper: safeLocal, ...getterAlias };
      const safeAfterSpread = { ...getterAlias, helper: safeLocal };
      const getterAfterSafe = {
        helper: safeLocal,
        get [helperKey]() {
          return importedHelpers;
        },
      };
      const safeAfterGetter = {
        get [helperKey]() {
          return importedHelpers;
        },
        helper: safeLocal,
      };
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        await spreadAfterSafe.helper.inspect(control);
        await safeAfterSpread.helper.inspect(control);
        await getterAfterSafe.helper.inspect(control);
        await safeAfterGetter.helper.inspect(control);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "getter-order", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("fails closed for unresolved and setter-backed accessor values", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      const unresolvedSource = {
        get helper() {
          return loadHelpers();
        },
      };
      const sideEffectSource = {
        get helper() {
          observe(importedHelpers);
          return safeLocal;
        },
      };
      const setterSource = {
        set helper(value) {
          consume(value);
        },
      };
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        const { helper: unresolvedHelper = safeLocal } = unresolvedSource;
        const { helper: sideEffectHelper = safeLocal } = sideEffectSource;
        const { helper: setterHelper = safeLocal } = setterSource;
        await unresolvedHelper.inspect(control);
        await sideEffectHelper.inspect(control);
        await setterHelper.inspect(control);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "accessor-fail-closed", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("allows safe local getters and definitely absent defaults", () => {
    const fixture = analyzeTask7VisualSource(`
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      const safeAccessor = {
        get helper() {
          return safeLocal;
        },
        set helper(value) {
          void value;
        },
      };
      const emptySource = {};
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        const { helper: getterHelper } = safeAccessor;
        const { helper: defaultHelper = safeLocal } = emptySource;
        await getterHelper.inspect(control);
        await defaultHelper.inspect(control);
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "safe-accessors", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("resolves safe callable values returned by local getters", () => {
    const fixture = analyzeTask7VisualSource(`
      async function clickControl(control) {
        await control.click();
      }
      const callbacks = {
        get onRoute() {
          return clickControl;
        },
      };
      async function action({ canvas }) {
        const callback = callbacks.onRoute;
        await callback(canvas.getByRole("button"));
      }
      const CASES = new Map([
        ["context-window", [{ name: "callable-getter", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("inspects direct and transparently wrapped runner callbacks", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      async function action({ page }) {
        await page.route("**/direct", () => importedHelpers.inspect(page));
        await page.route(
          "**/wrapped",
          (() => externalHelpers.inspect(page)),
        );
        await page.route("**/function", function callback() {
          importedHelpers.actions.inspect(page);
        });
      }
      const CASES = new Map([
        ["context-window", [{ name: "direct-callbacks", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("inspects aliased method callbacks and nested callback factories", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const handlers = {
        aliased: () => importedHelpers.inspect(),
        method() {
          importedHelpers.actions.inspect();
        },
      };
      const callbackAlias = handlers.aliased;
      const makeCallback = (helpers) => () => helpers.inspect();
      const wrapCallback = (callback) => (...args) => callback(...args);
      async function action({ page }) {
        await page.route("**/alias", callbackAlias);
        await page.route("**/method", handlers.method);
        await page.route(
          "**/factory",
          wrapCallback(makeCallback(importedHelpers)),
        );
      }
      const CASES = new Map([
        ["context-cards", [{ name: "callback-factories", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
      { component: "context-cards", kind: "unresolved action helper" },
      { component: "context-cards", kind: "unresolved action helper" },
    ]);
  });

  test("rejects dynamic members and DOM fabrication inside runner callbacks", () => {
    const fixture = analyzeTask7VisualSource(`
      const dynamicMember = chooseMember();
      const dynamicCallback = () => externalHelpers[dynamicMember]();
      const fabricate = (root) => {
        root.innerHTML = "fabricated";
      };
      async function action({ page }) {
        await page.route("**/dynamic", dynamicCallback);
        await page.route("**/fabricated", fabricate);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "callback-violations", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "DOM rewrite" },
      { component: "memory-inspector", kind: "unresolved action member" },
    ]);
  });

  test("maps runner callback destructuring and rest parameters to trusted data", () => {
    const fixture = analyzeTask7VisualSource(`
      async function action({ page }) {
        await page.route(
          "**/*",
          async ({ request, ...metadata }, ...routes) => {
            await request.continue();
            await metadata.response.finished();
            await routes[0].continue();
          },
        );
      }
      const CASES = new Map([
        ["context-spillover", [{ name: "callback-parameters", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("allows safe local runner callback aliases and factories", () => {
    const fixture = analyzeTask7VisualSource(`
      const safeHelpers = {
        async inspect(route) {
          await route.continue();
        },
      };
      const makeSafeCallback = ({ helpers }) =>
        (...[route]) => helpers.inspect(route);
      const safeCallback = makeSafeCallback({ helpers: safeHelpers });
      async function action({ page }) {
        await page.route("**/*", safeCallback);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "safe-callback", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("fails closed for imported, unbound, and dynamic runner callbacks", () => {
    const fixture = analyzeTask7VisualSource(`
      import { importedCallback } from "./visual-helpers.mjs";
      async function action({ page }) {
        await page.route("**/imported", importedCallback);
        await page.route("**/unbound", externalCallback);
        await page.route("**/dynamic", chooseCallback());
      }
      const CASES = new Map([
        ["context-window", [{ name: "unknown-callbacks", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("tracks local and parameter reassignment through one and two wrappers", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      async function oneWrapper(helper, control) {
        helper = importedHelpers;
        await helper.inspect(control);
      }
      async function innerWrapper(helper, control) {
        helper = importedHelpers;
        await helper.inspect(control);
      }
      async function twoWrappers(helper, control) {
        await innerWrapper(helper, control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        let local = safeLocal;
        local = importedHelpers;
        await local.inspect(control);
        await oneWrapper(safeLocal, control);
        await twoWrappers(safeLocal, control);
      }
      const CASES = new Map([
        ["context-window", [{ name: "reassigned-origins", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
    ]);
  });

  test("tracks compound and destructuring assignments without laundering aliases", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        let compound = safeLocal;
        compound &&= importedHelpers;
        await compound.inspect(control);

        let objectAlias = safeLocal;
        ({ helper: objectAlias } = { helper: importedHelpers });
        await objectAlias.inspect(control);

        let arrayAlias = safeLocal;
        [arrayAlias] = [importedHelpers];
        await arrayAlias.inspect(control);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "assignment-forms", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("allows immutable and local-only reassignment flows", () => {
    const fixture = analyzeTask7VisualSource(`
      const firstLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      const secondLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      async function normalize(helper, control) {
        helper = secondLocal;
        await helper.inspect(control);
      }
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        const immutable = firstLocal;
        await immutable.inspect(control);

        let reassigned = firstLocal;
        reassigned = secondLocal;
        await reassigned.inspect(control);

        let destructured = firstLocal;
        ({ helper: destructured } = { helper: secondLocal });
        await destructured.inspect(control);
        await normalize(firstLocal, control);
      }
      const CASES = new Map([
        ["context-cards", [{ name: "safe-reassignment", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("merges conditional assignment paths before trusting later calls", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      const safeLocal = {
        async inspect(control) {
          await control.click();
        },
      };
      async function logicalAction({ canvas }, ready) {
        let helper = importedHelpers;
        ready || (helper = safeLocal);
        await helper.inspect(canvas.getByRole("button"));
      }
      async function switchAction({ canvas }, mode) {
        let helper = importedHelpers;
        switch (mode) {
          case "safe":
            helper = safeLocal;
            break;
        }
        await helper.inspect(canvas.getByRole("button"));
      }
      async function forInAction({ canvas }) {
        let helper = importedHelpers;
        for (const key in {}) {
          void key;
          helper = safeLocal;
        }
        await helper.inspect(canvas.getByRole("button"));
      }
      async function finallyAction({ canvas }) {
        let helper = importedHelpers;
        try {
          await canvas.getByRole("button").count();
          helper = safeLocal;
        } finally {
          await helper.inspect(canvas.getByRole("button"));
        }
      }
      const CASES = new Map([
        ["context-window", [{ name: "logical-flow", action: logicalAction }]],
        ["memory-inspector", [{ name: "switch-flow", action: switchAction }]],
        ["context-cards", [{ name: "for-in-flow", action: forInAction }]],
        ["context-spillover", [{ name: "finally-flow", action: finallyAction }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("keeps nested member mutations untrusted through direct and aliased writes", () => {
    const fixture = analyzeTask7VisualSource(`
      import * as importedHelpers from "./visual-helpers.mjs";
      async function inspect(control) {
        await control.click();
      }
      const aliasedContainer = { helpers: { inspect } };
      const directContainer = { helpers: { inspect } };
      async function action({ canvas }) {
        const control = canvas.getByRole("button");
        const alias = aliasedContainer.helpers;
        alias.inspect = importedHelpers.inspect;
        await aliasedContainer.helpers.inspect(control);

        directContainer.helpers.inspect = importedHelpers.inspect;
        await directContainer.helpers.inspect(control);
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "nested-member-writes", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([
      { component: "memory-inspector", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("terminates and fails closed on used self, mutual, and forward object cycles", () => {
    let fixture: ReturnType<typeof analyzeTask7VisualSource> | undefined;
    expect(() => {
      fixture = analyzeTask7VisualSource(`
        var selfCycle = { helper: selfCycle };
        var mutualLeft = { helper: mutualRight };
        var mutualRight = { helper: mutualLeft };
        var forwardLeft = { helper: forwardRight };
        var forwardRight = { helper: forwardLeft };
        async function selfAction({ canvas }) {
          await selfCycle.helper.inspect(canvas.getByRole("button"));
        }
        async function mutualAction({ canvas }) {
          await mutualLeft.helper.inspect(canvas.getByRole("button"));
        }
        async function forwardAction({ canvas }) {
          await forwardRight.helper.inspect(canvas.getByRole("button"));
        }
        const CASES = new Map([
          ["context-window", [{ name: "self-cycle", action: selfAction }]],
          ["memory-inspector", [{ name: "mutual-cycle", action: mutualAction }]],
          ["context-cards", [{ name: "forward-cycle", action: forwardAction }]],
        ]);
      `);
    }).not.toThrow();

    expect(fixture?.violations).toEqual([
      { component: "context-cards", kind: "unresolved action helper" },
      { component: "context-window", kind: "unresolved action helper" },
      { component: "memory-inspector", kind: "unresolved action helper" },
    ]);
  });

  test("terminates on cycles through arrays, returns, and object spreads", () => {
    let fixture: ReturnType<typeof analyzeTask7VisualSource> | undefined;
    expect(() => {
      fixture = analyzeTask7VisualSource(`
        var cyclicArray = [cyclicArray];
        function returnCycle() {
          return returnedCycle;
        }
        var returnedCycle = { helper: returnCycle() };
        var spreadLeft = { ...spreadRight };
        var spreadRight = { ...spreadLeft };
        async function action({ canvas }) {
          const control = canvas.getByRole("button");
          await cyclicArray[0].inspect(control);
          await returnedCycle.helper.inspect(control);
          await spreadLeft.helper.inspect(control);
        }
        const CASES = new Map([
          ["context-spillover", [{ name: "composite-cycles", action }]],
        ]);
      `);
    }).not.toThrow();

    expect(fixture?.violations).toEqual([
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
      { component: "context-spillover", kind: "unresolved action helper" },
    ]);
  });

  test("does not expand unused cyclic properties", () => {
    let fixture: ReturnType<typeof analyzeTask7VisualSource> | undefined;
    expect(() => {
      fixture = analyzeTask7VisualSource(`
        const safeLocal = {
          async inspect(control) {
            await control.click();
          },
        };
        var selfCycle = { helper: safeLocal, unused: selfCycle };
        var mutualLeft = { helper: safeLocal, unused: mutualRight };
        var mutualRight = { unused: mutualLeft };
        async function action({ canvas }) {
          const control = canvas.getByRole("button");
          await selfCycle.helper.inspect(control);
          await mutualLeft.helper.inspect(control);
        }
        const CASES = new Map([
          ["context-cards", [{ name: "unused-cycles", action }]],
        ]);
      `);
    }).not.toThrow();

    expect(fixture?.violations).toEqual([]);
  });

  test("allows bounded local origin graphs", () => {
    const depth = 24;
    const declarations = Array.from(
      { length: depth },
      (_, index) => `const node${index + 1} = { helper: node${index} };`,
    ).join("\n");
    const helper = `node${depth}${".helper".repeat(depth)}`;
    const fixture = analyzeTask7VisualSource(`
      const node0 = {
        async inspect(control) {
          await control.click();
        },
      };
      ${declarations}
      async function action({ canvas }) {
        await ${helper}.inspect(canvas.getByRole("button"));
      }
      const CASES = new Map([
        ["memory-inspector", [{ name: "bounded-local-graph", action }]],
      ]);
    `);

    expect(fixture.violations).toEqual([]);
  });

  test("fails closed when the shared origin work limit is exhausted", () => {
    const depth = Math.ceil(MAX_ORIGIN_WORK / 2) + 32;
    const declarations = Array.from(
      { length: depth },
      (_, index) => `const node${index + 1} = { helper: node${index} };`,
    ).join("\n");
    const helper = `node${depth}${".helper".repeat(depth)}`;
    let fixture: ReturnType<typeof analyzeTask7VisualSource> | undefined;
    expect(() => {
      fixture = analyzeTask7VisualSource(`
        const node0 = {
          async inspect() {},
        };
        ${declarations}
        async function action() {
          await ${helper}.inspect();
        }
        const CASES = new Map([
          ["context-window", [{ name: "origin-work-limit", action }]],
        ]);
      `);
    }).not.toThrow();

    expect(fixture?.violations).toEqual([
      { component: "context-window", kind: "unresolved action helper" },
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
