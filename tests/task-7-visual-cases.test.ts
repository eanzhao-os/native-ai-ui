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

const TASK7_ACTION_START = "/* TASK 7 VISUAL ACTIONS START */";
const TASK7_ACTION_END = "/* TASK 7 VISUAL ACTIONS END */";
const TASK7_REGISTRATION_START =
  "/* TASK 7 VISUAL REGISTRATIONS START */";
const TASK7_REGISTRATION_END = "/* TASK 7 VISUAL REGISTRATIONS END */";
const MAX_TASK7_RESOLUTION_EDGES = 256;

const TASK7_ALLOWED_METHODS = new Set([
  "all",
  "and",
  "boundingBox",
  "click",
  "count",
  "fill",
  "first",
  "focus",
  "getAttribute",
  "getByRole",
  "getByText",
  "locator",
  "press",
  "toFixed",
  "waitFor",
]);

const TASK7_ALLOWED_PROPERTIES = new Set([
  "height",
  "keyboard",
  "length",
  "width",
]);

const TASK7_ALLOWED_BINARY_OPERATORS = new Set([
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.LessThanToken,
  ts.SyntaxKind.BarBarToken,
]);

type SourceRange = { end: number; start: number };

type VisualSourceViolation = {
  component: string;
  kind: string;
};

type Task7GuardResult = {
  duplicateComponents: string[];
  registrationCounts: Map<string, number>;
  violations: VisualSourceViolation[];
};

type ResolutionState = {
  remaining: number;
  resolved: Set<ts.Node>;
  visiting: Set<ts.Node>;
};

type GuardScope = {
  acceptedDeclarations: Set<ts.Declaration>;
  activeFunctions: Set<ts.FunctionDeclaration>;
  component: string;
  resolution: ResolutionState;
};

type FunctionResolution =
  | { kind: "external" }
  | { kind: "function"; node: ts.FunctionDeclaration }
  | { kind: "unresolved" }
  | { kind: "unsupported" };

function markerRange(
  source: string,
  startMarker: string,
  endMarker: string,
): SourceRange | null {
  const markerStart = source.indexOf(startMarker);
  if (markerStart < 0) return null;
  const start = markerStart + startMarker.length;
  const end = source.indexOf(endMarker, start);
  if (end < start) return null;
  if (source.indexOf(startMarker, start) >= 0) return null;
  if (source.indexOf(endMarker, end + endMarker.length) >= 0) return null;
  return { end, start };
}

function nodeWithin(
  node: ts.Node,
  range: SourceRange,
  sourceFile: ts.SourceFile,
): boolean {
  return node.getStart(sourceFile) >= range.start && node.end <= range.end;
}

function declarationFor(
  node: ts.Node,
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
): ts.Declaration | null {
  let symbol = checker.getSymbolAtLocation(node);
  if (
    ts.isIdentifier(node) &&
    ts.isShorthandPropertyAssignment(node.parent) &&
    node.parent.name === node
  ) {
    symbol = checker.getShorthandAssignmentValueSymbol(node.parent) ?? symbol;
  }
  const declaration = symbol?.valueDeclaration ?? symbol?.declarations?.[0];
  return declaration?.getSourceFile() === sourceFile ? declaration : null;
}

function consumeResolutionEdge(
  state: ResolutionState,
  node: ts.Node,
): boolean {
  if (state.resolved.has(node)) return true;
  if (state.visiting.has(node) || state.remaining <= 0) return false;
  state.remaining -= 1;
  return true;
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

function task7ExpressionPath(expression: ts.Expression): string[] {
  const current = unwrapVisualExpression(expression);
  if (ts.isIdentifier(current)) return [current.text];
  if (ts.isPropertyAccessExpression(current)) {
    return [...task7ExpressionPath(current.expression), current.name.text];
  }
  return [];
}

function task7StaticText(node: ts.Node | undefined): string | null {
  if (!node) return null;
  if (ts.isIdentifier(node) || ts.isStringLiteralLike(node)) return node.text;
  if (ts.isNumericLiteral(node)) return node.text;
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
  expressionPath: task7ExpressionPath,
  staticText: task7StaticText,
};

function isTopLevelConstDeclaration(
  declaration: ts.VariableDeclaration,
  sourceFile: ts.SourceFile,
): boolean {
  const declarationList = declaration.parent;
  return (
    ts.isVariableDeclarationList(declarationList) &&
    Boolean(declarationList.flags & ts.NodeFlags.Const) &&
    ts.isVariableStatement(declarationList.parent) &&
    declarationList.parent.parent === sourceFile
  );
}

function staticPropertyName(name: ts.PropertyName | undefined): string | null {
  if (!name || ts.isComputedPropertyName(name)) return null;
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteralLike(name) ||
    ts.isNumericLiteral(name)
  ) {
    return name.text;
  }
  return null;
}

function analyzeTask7VisualSource(source: string): Task7GuardResult {
  const { checker, diagnostics, sourceFile } = parseVisualProgram(source);
  const registrationCounts = new Map<string, number>();
  const violations: VisualSourceViolation[] = [];
  const seenViolations = new Set<string>();

  function recordViolation(
    component: string,
    kind: string,
    node: ts.Node,
  ): void {
    const key = `${component}:${kind}:${node.getStart(sourceFile)}:${node.end}`;
    if (seenViolations.has(key)) return;
    seenViolations.add(key);
    violations.push({ component, kind });
  }

  function result(): Task7GuardResult {
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

  if (diagnostics.length > 0) {
    recordViolation("<source>", "syntax error", sourceFile);
  }

  const actionRange = markerRange(source, TASK7_ACTION_START, TASK7_ACTION_END);
  const registrationRange = markerRange(
    source,
    TASK7_REGISTRATION_START,
    TASK7_REGISTRATION_END,
  );
  if (!actionRange || !registrationRange) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      sourceFile,
    );
    return result();
  }
  const strictActionRange = actionRange;
  const strictRegistrationRange = registrationRange;

  function newResolutionState(): ResolutionState {
    return {
      remaining: MAX_TASK7_RESOLUTION_EDGES,
      resolved: new Set(),
      visiting: new Set(),
    };
  }

  function consumeOrRecord(
    state: ResolutionState,
    edge: ts.Node,
    component: string,
    kind: string,
    request: ts.Node,
  ): boolean {
    if (consumeResolutionEdge(state, edge)) return true;
    recordViolation(component, kind, request);
    return false;
  }

  function topLevelVariable(name: string): ts.VariableDeclaration | null {
    for (const statement of sourceFile.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.name.text === name) {
          return declaration;
        }
      }
    }
    return null;
  }

  function resolveConstExpression(
    expression: ts.Expression,
    state: ResolutionState,
    component: string,
    kind: string,
    request: ts.Node,
  ): ts.Expression | null {
    const current = unwrapVisualExpression(expression);
    if (!ts.isIdentifier(current)) return current;
    if (!consumeOrRecord(state, current, component, kind, request)) return null;
    const declaration = declarationFor(current, checker, sourceFile);
    if (
      !declaration ||
      !ts.isVariableDeclaration(declaration) ||
      !declaration.initializer ||
      !isTopLevelConstDeclaration(declaration, sourceFile) ||
      !nodeWithin(declaration, strictActionRange, sourceFile)
    ) {
      return null;
    }
    if (state.visiting.has(declaration)) return null;
    if (!consumeOrRecord(state, declaration, component, kind, request)) {
      return null;
    }
    state.visiting.add(declaration);
    try {
      const resolved = resolveConstExpression(
        declaration.initializer,
        state,
        component,
        kind,
        request,
      );
      if (resolved) {
        state.resolved.add(current);
        state.resolved.add(declaration);
      }
      return resolved;
    } finally {
      state.visiting.delete(declaration);
    }
  }

  function resolveFunctionTarget(
    identifier: ts.Identifier,
    state: ResolutionState,
    component: string,
    kind: string,
    request: ts.Node,
  ): FunctionResolution {
    if (!consumeOrRecord(state, identifier, component, kind, request)) {
      return { kind: "unresolved" };
    }
    const declaration = declarationFor(identifier, checker, sourceFile);
    if (!declaration) return { kind: "unresolved" };
    if (ts.isFunctionDeclaration(declaration)) {
      if (!consumeOrRecord(state, declaration, component, kind, request)) {
        return { kind: "unresolved" };
      }
      state.resolved.add(identifier);
      state.resolved.add(declaration);
      return { kind: "function", node: declaration };
    }
    if (
      ts.isImportSpecifier(declaration) ||
      ts.isImportClause(declaration) ||
      ts.isNamespaceImport(declaration) ||
      ts.isImportEqualsDeclaration(declaration)
    ) {
      return { kind: "external" };
    }
    if (!ts.isVariableDeclaration(declaration)) {
      return { kind: "unresolved" };
    }
    if (!isTopLevelConstDeclaration(declaration, sourceFile)) {
      return { kind: "unsupported" };
    }
    if (
      !declaration.initializer ||
      !nodeWithin(declaration, strictActionRange, sourceFile)
    ) {
      return { kind: "unresolved" };
    }
    if (state.visiting.has(declaration)) return { kind: "unresolved" };
    if (!consumeOrRecord(state, declaration, component, kind, request)) {
      return { kind: "unresolved" };
    }
    const initializer = unwrapVisualExpression(declaration.initializer);
    if (!ts.isIdentifier(initializer)) return { kind: "unsupported" };
    state.visiting.add(declaration);
    try {
      const resolved = resolveFunctionTarget(
        initializer,
        state,
        component,
        kind,
        request,
      );
      if (resolved.kind === "function") {
        state.resolved.add(identifier);
        state.resolved.add(declaration);
      }
      return resolved;
    } finally {
      state.visiting.delete(declaration);
    }
  }

  function parameterBindings(
    functionNode: ts.FunctionDeclaration,
    actionRoot: boolean,
  ): ts.Declaration[] | null {
    if (functionNode.asteriskToken || !functionNode.body) return null;
    const bindings: ts.Declaration[] = [];
    if (actionRoot) {
      if (functionNode.parameters.length !== 1) return null;
      const [parameter] = functionNode.parameters;
      if (
        parameter.dotDotDotToken ||
        parameter.initializer ||
        parameter.questionToken ||
        !ts.isObjectBindingPattern(parameter.name)
      ) {
        return null;
      }
      const names: string[] = [];
      for (const element of parameter.name.elements) {
        if (
          element.dotDotDotToken ||
          element.initializer ||
          element.propertyName ||
          !ts.isIdentifier(element.name)
        ) {
          return null;
        }
        names.push(element.name.text);
        bindings.push(element);
      }
      names.sort();
      if (
        !(
          (names.length === 1 && names[0] === "canvas") ||
          (names.length === 2 &&
            names[0] === "canvas" &&
            names[1] === "page")
        )
      ) {
        return null;
      }
      return bindings;
    }

    for (const parameter of functionNode.parameters) {
      if (
        parameter.dotDotDotToken ||
        parameter.initializer ||
        parameter.questionToken
      ) {
        return null;
      }
      if (ts.isIdentifier(parameter.name)) {
        if (parameter.name.text === "this") return null;
        bindings.push(parameter);
        continue;
      }
      if (!ts.isObjectBindingPattern(parameter.name)) return null;
      for (const element of parameter.name.elements) {
        if (
          element.dotDotDotToken ||
          element.initializer ||
          element.propertyName ||
          !ts.isIdentifier(element.name)
        ) {
          return null;
        }
        bindings.push(element);
      }
    }
    return bindings;
  }

  function acceptedIdentifier(
    identifier: ts.Identifier,
    scope: GuardScope,
  ): boolean {
    if (
      !consumeOrRecord(
        scope.resolution,
        identifier,
        scope.component,
        "unsupported action syntax",
        identifier,
      )
    ) {
      return false;
    }
    const declaration = declarationFor(identifier, checker, sourceFile);
    if (declaration && scope.acceptedDeclarations.has(declaration)) {
      scope.resolution.resolved.add(identifier);
      return true;
    }
    recordViolation(scope.component, "unsupported action syntax", identifier);
    return false;
  }

  function acceptExpression(
    expression: ts.Expression,
    scope: GuardScope,
  ): boolean {
    const current = unwrapVisualExpression(expression);
    const categories = classifyVisualOperation(current, operationResolver);
    if (categories.length > 0) {
      for (const category of categories) {
        recordViolation(scope.component, category, current);
      }
      return false;
    }

    if (
      ts.isStringLiteralLike(current) ||
      ts.isNumericLiteral(current) ||
      ts.isRegularExpressionLiteral(current) ||
      current.kind === ts.SyntaxKind.TrueKeyword ||
      current.kind === ts.SyntaxKind.FalseKeyword ||
      current.kind === ts.SyntaxKind.NullKeyword
    ) {
      return true;
    }
    if (ts.isIdentifier(current)) {
      return acceptedIdentifier(current, scope);
    }
    if (ts.isTemplateExpression(current)) {
      let accepted = true;
      for (const span of current.templateSpans) {
        accepted = acceptExpression(span.expression, scope) && accepted;
      }
      return accepted;
    }
    if (ts.isAwaitExpression(current)) {
      return acceptExpression(current.expression, scope);
    }
    if (ts.isPrefixUnaryExpression(current)) {
      if (current.operator === ts.SyntaxKind.ExclamationToken) {
        return acceptExpression(current.operand, scope);
      }
      recordViolation(scope.component, "unsupported action syntax", current);
      return false;
    }
    if (ts.isBinaryExpression(current)) {
      if (!TASK7_ALLOWED_BINARY_OPERATORS.has(current.operatorToken.kind)) {
        recordViolation(scope.component, "unsupported action syntax", current);
        return false;
      }
      const left = acceptExpression(current.left, scope);
      const right = acceptExpression(current.right, scope);
      return left && right;
    }
    if (ts.isObjectLiteralExpression(current)) {
      let accepted = true;
      for (const property of current.properties) {
        if (ts.isPropertyAssignment(property)) {
          if (!staticPropertyName(property.name)) {
            recordViolation(
              scope.component,
              "unsupported action syntax",
              property,
            );
            accepted = false;
          } else {
            accepted = acceptExpression(property.initializer, scope) && accepted;
          }
          continue;
        }
        if (ts.isShorthandPropertyAssignment(property)) {
          accepted = acceptedIdentifier(property.name, scope) && accepted;
          continue;
        }
        recordViolation(scope.component, "unsupported action syntax", property);
        accepted = false;
      }
      return accepted;
    }
    if (ts.isArrayLiteralExpression(current)) {
      let accepted = true;
      for (const element of current.elements) {
        if (ts.isSpreadElement(element) || ts.isOmittedExpression(element)) {
          recordViolation(scope.component, "unsupported action syntax", element);
          accepted = false;
        } else {
          accepted = acceptExpression(element, scope) && accepted;
        }
      }
      return accepted;
    }
    if (ts.isNewExpression(current)) {
      if (
        !ts.isIdentifier(current.expression) ||
        current.expression.text !== "Error" ||
        current.arguments?.some((argument) => ts.isSpreadElement(argument))
      ) {
        recordViolation(scope.component, "unsupported action syntax", current);
        return false;
      }
      let accepted = true;
      for (const argument of current.arguments ?? []) {
        accepted = acceptExpression(argument, scope) && accepted;
      }
      return accepted;
    }
    if (ts.isCallExpression(current)) {
      if (
        current.questionDotToken ||
        ts.isCallChain(current) ||
        current.arguments.some((argument) => ts.isSpreadElement(argument))
      ) {
        recordViolation(scope.component, "unsupported action syntax", current);
        return false;
      }
      const callee = unwrapVisualExpression(current.expression);
      if (ts.isPropertyAccessExpression(callee)) {
        if (callee.questionDotToken || !TASK7_ALLOWED_METHODS.has(callee.name.text)) {
          recordViolation(scope.component, "unsupported action syntax", current);
          return false;
        }
        let accepted = acceptExpression(callee.expression, scope);
        for (const argument of current.arguments) {
          accepted = acceptExpression(argument, scope) && accepted;
        }
        return accepted;
      }
      if (ts.isIdentifier(callee)) {
        const awaitExpression = current.parent;
        if (
          !ts.isAwaitExpression(awaitExpression) ||
          awaitExpression.expression !== current ||
          !ts.isExpressionStatement(awaitExpression.parent) ||
          awaitExpression.parent.expression !== awaitExpression
        ) {
          recordViolation(scope.component, "unsupported action syntax", current);
          return false;
        }
        if (
          !consumeOrRecord(
            scope.resolution,
            current,
            scope.component,
            "unresolved action helper",
            current,
          )
        ) {
          return false;
        }
        const resolved = resolveFunctionTarget(
          callee,
          scope.resolution,
          scope.component,
          "unresolved action helper",
          current,
        );
        if (resolved.kind === "external") {
          recordViolation(scope.component, "external action helper", current);
          return false;
        }
        if (resolved.kind === "unsupported") {
          recordViolation(scope.component, "unsupported action syntax", current);
          return false;
        }
        if (resolved.kind === "unresolved") {
          recordViolation(scope.component, "unresolved action helper", current);
          return false;
        }
        const bindings = parameterBindings(resolved.node, false);
        if (
          !bindings ||
          resolved.node.parameters.length !== current.arguments.length
        ) {
          recordViolation(scope.component, "unsupported action syntax", current);
          return false;
        }
        let accepted = true;
        for (const argument of current.arguments) {
          accepted = acceptExpression(argument, scope) && accepted;
        }
        if (!accepted) return false;
        inspectFunction(
          resolved.node,
          {
            ...scope,
            acceptedDeclarations: new Set(bindings),
          },
          false,
        );
        return true;
      }
      recordViolation(scope.component, "unsupported action syntax", current);
      return false;
    }
    if (ts.isPropertyAccessExpression(current)) {
      if (
        current.questionDotToken ||
        ts.isPropertyAccessChain(current) ||
        !TASK7_ALLOWED_PROPERTIES.has(current.name.text)
      ) {
        recordViolation(scope.component, "unsupported action syntax", current);
        return false;
      }
      return acceptExpression(current.expression, scope);
    }

    recordViolation(scope.component, "unsupported action syntax", current);
    return false;
  }

  function inspectStatement(statement: ts.Statement, scope: GuardScope): void {
    if (ts.isBlock(statement)) {
      for (const child of statement.statements) inspectStatement(child, scope);
      return;
    }
    if (ts.isVariableStatement(statement)) {
      if (!(statement.declarationList.flags & ts.NodeFlags.Const)) {
        recordViolation(scope.component, "unsupported action syntax", statement);
        return;
      }
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) {
          recordViolation(scope.component, "unsupported action syntax", declaration);
          continue;
        }
        if (acceptExpression(declaration.initializer, scope)) {
          scope.acceptedDeclarations.add(declaration);
        }
      }
      return;
    }
    if (ts.isExpressionStatement(statement)) {
      const expression = unwrapVisualExpression(statement.expression);
      const operationNode = ts.isAwaitExpression(expression)
        ? unwrapVisualExpression(expression.expression)
        : expression;
      const categories = classifyVisualOperation(operationNode, operationResolver);
      if (categories.length > 0) {
        for (const category of categories) {
          recordViolation(scope.component, category, operationNode);
        }
        return;
      }
      if (!ts.isAwaitExpression(expression)) {
        recordViolation(scope.component, "unsupported action syntax", statement);
        return;
      }
      acceptExpression(expression, scope);
      return;
    }
    if (ts.isIfStatement(statement)) {
      acceptExpression(statement.expression, scope);
      inspectStatement(statement.thenStatement, {
        ...scope,
        acceptedDeclarations: new Set(scope.acceptedDeclarations),
      });
      if (statement.elseStatement) {
        inspectStatement(statement.elseStatement, {
          ...scope,
          acceptedDeclarations: new Set(scope.acceptedDeclarations),
        });
      }
      return;
    }
    if (ts.isForOfStatement(statement)) {
      const declarationList = statement.initializer;
      if (
        statement.awaitModifier ||
        !ts.isVariableDeclarationList(declarationList) ||
        !(declarationList.flags & ts.NodeFlags.Const) ||
        declarationList.declarations.length !== 1 ||
        !ts.isIdentifier(declarationList.declarations[0].name) ||
        !acceptExpression(statement.expression, scope)
      ) {
        recordViolation(scope.component, "unsupported action syntax", statement);
        return;
      }
      const loopScope = {
        ...scope,
        acceptedDeclarations: new Set(scope.acceptedDeclarations),
      };
      loopScope.acceptedDeclarations.add(declarationList.declarations[0]);
      inspectStatement(statement.statement, loopScope);
      return;
    }
    if (ts.isThrowStatement(statement) && statement.expression) {
      acceptExpression(statement.expression, scope);
      return;
    }
    recordViolation(scope.component, "unsupported action syntax", statement);
  }

  function inspectFunction(
    functionNode: ts.FunctionDeclaration,
    scope: GuardScope,
    actionRoot: boolean,
  ): void {
    if (!nodeWithin(functionNode, strictActionRange, sourceFile)) {
      recordViolation(scope.component, "external action helper", functionNode);
      return;
    }
    if (functionNode.parent !== sourceFile) {
      recordViolation(scope.component, "unresolved action helper", functionNode);
      return;
    }
    const bindings = parameterBindings(functionNode, actionRoot);
    if (!bindings || !functionNode.body) {
      recordViolation(
        scope.component,
        "unsupported action syntax",
        functionNode,
      );
      return;
    }
    if (scope.activeFunctions.has(functionNode)) {
      recordViolation(
        scope.component,
        "unresolved action helper",
        functionNode,
      );
      return;
    }
    const acceptedDeclarations = new Set<ts.Declaration>();
    if (actionRoot) {
      for (const binding of bindings) acceptedDeclarations.add(binding);
    } else {
      for (const binding of bindings) {
        if (!scope.acceptedDeclarations.has(binding)) {
          recordViolation(
            scope.component,
            "unsupported action syntax",
            functionNode,
          );
          return;
        }
        acceptedDeclarations.add(binding);
      }
    }
    const functionScope = { ...scope, acceptedDeclarations };
    scope.activeFunctions.add(functionNode);
    try {
      for (const statement of functionNode.body.statements) {
        inspectStatement(statement, functionScope);
      }
    } finally {
      scope.activeFunctions.delete(functionNode);
    }
  }

  function resolveRegisteredAction(
    component: string,
    identifier: ts.Identifier,
    request: ts.Node,
  ): void {
    const resolution = newResolutionState();
    if (
      !consumeOrRecord(
        resolution,
        request,
        component,
        "unresolved action registration",
        request,
      )
    ) {
      return;
    }
    const resolved = resolveFunctionTarget(
      identifier,
      resolution,
      component,
      "unresolved action registration",
      request,
    );
    if (
      resolved.kind !== "function" ||
      resolved.node.parent !== sourceFile ||
      !nodeWithin(resolved.node, strictActionRange, sourceFile)
    ) {
      recordViolation(component, "unresolved action registration", request);
      return;
    }
    inspectFunction(
      resolved.node,
      {
        acceptedDeclarations: new Set(),
        activeFunctions: new Set(),
        component,
        resolution,
      },
      true,
    );
  }

  function inspectCase(
    component: string,
    expression: ts.Expression,
    state: ResolutionState,
  ): void {
    const resolved = resolveConstExpression(
      expression,
      state,
      component,
      "unresolved action registration",
      expression,
    );
    if (!resolved || !ts.isObjectLiteralExpression(resolved)) {
      recordViolation(component, "unresolved action registration", expression);
      return;
    }
    let nameFound = false;
    let action: { identifier: ts.Identifier; node: ts.Node } | null = null;
    let malformed = false;
    for (const property of resolved.properties) {
      const propertyName = staticPropertyName(property.name);
      if (!propertyName) {
        malformed = true;
        continue;
      }
      if (propertyName === "name") {
        if (
          nameFound ||
          !ts.isPropertyAssignment(property) ||
          !ts.isStringLiteralLike(unwrapVisualExpression(property.initializer))
        ) {
          malformed = true;
        } else {
          nameFound = true;
        }
        continue;
      }
      if (propertyName === "action") {
        if (action) {
          malformed = true;
          continue;
        }
        if (ts.isPropertyAssignment(property)) {
          const initializer = unwrapVisualExpression(property.initializer);
          if (ts.isIdentifier(initializer)) {
            action = { identifier: initializer, node: property };
          } else {
            malformed = true;
          }
        } else if (ts.isShorthandPropertyAssignment(property)) {
          action = { identifier: property.name, node: property };
        } else {
          malformed = true;
        }
        continue;
      }
      if (!ts.isPropertyAssignment(property)) malformed = true;
    }
    if (!nameFound || malformed) {
      recordViolation(component, "unresolved action registration", expression);
      return;
    }
    if (action) {
      resolveRegisteredAction(component, action.identifier, action.node);
    }
  }

  const casesDeclaration = topLevelVariable("CASES");
  const casesInitializer = casesDeclaration?.initializer
    ? unwrapVisualExpression(casesDeclaration.initializer)
    : null;
  if (
    !casesDeclaration ||
    !isTopLevelConstDeclaration(casesDeclaration, sourceFile) ||
    !casesInitializer ||
    !ts.isNewExpression(casesInitializer) ||
    !ts.isIdentifier(casesInitializer.expression) ||
    casesInitializer.expression.text !== "Map" ||
    casesInitializer.arguments?.length !== 1
  ) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      casesDeclaration ?? sourceFile,
    );
    return result();
  }
  const entries = unwrapVisualExpression(casesInitializer.arguments[0]);
  if (!ts.isArrayLiteralExpression(entries)) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      casesInitializer.arguments[0],
    );
    return result();
  }
  const markedEntries = entries.elements.filter((element) =>
    nodeWithin(element, strictRegistrationRange, sourceFile),
  );
  if (
    markedEntries.length !== 1 ||
    !ts.isSpreadElement(markedEntries[0]) ||
    !ts.isIdentifier(markedEntries[0].expression) ||
    markedEntries[0].expression.text !== "TASK7_CASES"
  ) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      entries,
    );
    return result();
  }

  const registrationState = newResolutionState();
  const task7Spread = markedEntries[0];
  if (
    !consumeOrRecord(
      registrationState,
      task7Spread,
      "<unresolved>",
      "unresolved action registration",
      task7Spread,
    ) ||
    !consumeOrRecord(
      registrationState,
      task7Spread.expression,
      "<unresolved>",
      "unresolved action registration",
      task7Spread,
    )
  ) {
    return result();
  }
  const task7Declaration = declarationFor(
    task7Spread.expression,
    checker,
    sourceFile,
  );
  if (
    !task7Declaration ||
    !ts.isVariableDeclaration(task7Declaration) ||
    !task7Declaration.initializer ||
    !isTopLevelConstDeclaration(task7Declaration, sourceFile) ||
    !nodeWithin(task7Declaration, strictActionRange, sourceFile)
  ) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      task7Spread,
    );
    return result();
  }
  if (
    !consumeOrRecord(
      registrationState,
      task7Declaration,
      "<unresolved>",
      "unresolved action registration",
      task7Spread,
    )
  ) {
    return result();
  }
  registrationState.visiting.add(task7Declaration);
  const task7Initializer = resolveConstExpression(
    task7Declaration.initializer,
    registrationState,
    "<unresolved>",
    "unresolved action registration",
    task7Spread,
  );
  registrationState.visiting.delete(task7Declaration);
  if (!task7Initializer || !ts.isArrayLiteralExpression(task7Initializer)) {
    recordViolation(
      "<unresolved>",
      "unresolved action registration",
      task7Spread,
    );
    return result();
  }
  registrationState.resolved.add(task7Declaration);

  for (const item of task7Initializer.elements) {
    if (ts.isSpreadElement(item) || ts.isOmittedExpression(item)) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        item,
      );
      continue;
    }
    const tuple = resolveConstExpression(
      item,
      registrationState,
      "<unresolved>",
      "unresolved action registration",
      item,
    );
    if (
      !tuple ||
      !ts.isArrayLiteralExpression(tuple) ||
      tuple.elements.length !== 2 ||
      tuple.elements.some(
        (element) =>
          ts.isSpreadElement(element) || ts.isOmittedExpression(element),
      )
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        item,
      );
      continue;
    }
    const componentExpression = resolveConstExpression(
      tuple.elements[0],
      registrationState,
      "<unresolved>",
      "unresolved action registration",
      tuple.elements[0],
    );
    const casesExpression = resolveConstExpression(
      tuple.elements[1],
      registrationState,
      "<unresolved>",
      "unresolved action registration",
      tuple.elements[1],
    );
    if (
      !componentExpression ||
      !ts.isStringLiteralLike(componentExpression) ||
      !casesExpression ||
      !ts.isArrayLiteralExpression(casesExpression)
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        item,
      );
      continue;
    }
    const component = componentExpression.text;
    if (!TASK7_COMPONENT_SET.has(component)) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        componentExpression,
      );
      continue;
    }
    registrationCounts.set(component, (registrationCounts.get(component) ?? 0) + 1);
    for (const visualCase of casesExpression.elements) {
      if (
        ts.isSpreadElement(visualCase) ||
        ts.isOmittedExpression(visualCase)
      ) {
        recordViolation(
          component,
          "unresolved action registration",
          visualCase,
        );
      } else {
        inspectCase(component, visualCase, registrationState);
      }
    }
  }

  return result();
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

function guardedTask7Source(
  actions: string,
  contextWindowAction = "action",
) {
  return `/* TASK 7 VISUAL ACTIONS START */
    ${actions}
    const TASK7_CASES = [
      ["context-window", [
        { name: "initial" },
        { name: "selected", action: ${contextWindowAction} },
      ]],
      ["memory-inspector", [{ name: "all" }]],
      ["context-cards", [{ name: "initial" }]],
      ["context-spillover", [{ name: "compacted" }]],
    ];
    /* TASK 7 VISUAL ACTIONS END */
    const CASES = new Map([
      /* TASK 7 VISUAL REGISTRATIONS START */
      ...TASK7_CASES
      /* TASK 7 VISUAL REGISTRATIONS END */
    ]);`;
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

  test("accepts the exact live Task 7 action language", () => {
    const source = guardedTask7Source(`
      async function assertMinimumTarget(control, label) {
        const box = await control.boundingBox();
        if (!box) throw new Error(\`\${label} is not measurable\`);
        if (box.width < 44 || box.height < 44) {
          throw new Error(\`\${label}: \${box.width.toFixed(1)}\`);
        }
      }
      async function assertKeyboardFocus({ canvas, page, control, label }) {
        await control.focus();
        await page.keyboard.press("Tab");
        if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
          throw new Error(\`\${label} did not receive focus\`);
        }
      }
      async function action({ canvas, page }) {
        const controls = await canvas.getByRole("button").all();
        for (const control of controls) {
          await assertMinimumTarget(control, "Control");
        }
        const control = canvas.getByRole("button").first();
        await assertKeyboardFocus({ canvas, page, control, label: "Control" });
      }
    `);

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test.each([
    ["mutable binding", `
      async function safe(control) { await control.click(); }
      async function action({ canvas }) {
        let helper = safe;
        helper = importedHelper;
        await helper(canvas);
      }
    `],
    ["accessor", `
      const source = { get helper() { return importedHelper; } };
      async function action({ canvas }) { await source.helper(canvas); }
    `],
    ["switch", `
      async function action({ canvas }) {
        switch (await canvas.getByRole("button").count()) {
          case 1: throw new Error("one");
        }
      }
    `],
    ["runner callback", `
      async function action({ canvas, page }) {
        await page.route("**/*", () => importedHelper(canvas));
      }
    `],
    ["optional invocation", `
      async function action({ canvas }) {
        await canvas?.getByRole("button").click();
      }
    `],
    ["tagged template", `
      async function action({ canvas }) { importedHelper\`unsafe\`; }
    `],
    ["unsupported constructor", `
      async function action({ canvas }) { new Date(); }
    `],
  ])("rejects strict-subset escape: %s", (_label, actions) => {
    expect(analyzeTask7VisualSource(guardedTask7Source(actions)).violations)
      .toContainEqual({
        component: "context-window",
        kind: "unsupported action syntax",
      });
  });

  test("requires the Task 7 action and registration markers", () => {
    const source = `async function action() {}
      const CASES = new Map([
        ["context-window", [{ name: "selected", action }]],
      ]);`;

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    ["DOM rewrite", `async function action({ canvas }) {
      canvas.textContent = "fabricated";
    }`],
    ["node replacement", `async function action({ canvas }) {
      await canvas.replaceChildren();
    }`],
    ["DOM construction", `async function action({ canvas }) {
      new DOMParser();
    }`],
    ["style or hiding mutation", `async function action({ canvas }) {
      await canvas.setAttribute("hidden", "true");
    }`],
    ["DOM evaluation", `async function action({ canvas }) {
      await canvas.evaluate(() => document.body.remove());
    }`],
  ])("classifies dishonest Task 7 operation: %s", (kind, actions) => {
    expect(analyzeTask7VisualSource(guardedTask7Source(actions)).violations)
      .toContainEqual({ component: "context-window", kind });
  });

  test.each([
    ["imported helper", `import { helper } from "./helpers.mjs";
      async function action({ canvas }) { await helper(canvas); }`,
      "external action helper"],
    ["unbound helper", `async function action({ canvas }) {
      await missingHelper(canvas);
    }`, "unresolved action helper"],
    ["recursive helper", `async function helper(control) {
        await helper(control);
      }
      async function action({ canvas }) { await helper(canvas); }`,
      "unresolved action helper"],
    ["referenced cycle", `const values = [values];
      async function action({ canvas }) {
        await canvas.getByRole(values[0]);
      }`, "unsupported action syntax"],
  ])("fails closed for %s", (_label, actions, kind) => {
    expect(analyzeTask7VisualSource(guardedTask7Source(actions)).violations)
      .toContainEqual({ component: "context-window", kind });
  });

  test.each([
    ["parameter default", `async function helper(control = importedHelper) {
      await control.click();
    }
    async function action({ canvas }) { await helper(canvas); }`],
    ["rest parameter", `async function helper(...controls) {}
    async function action({ canvas }) { await helper(canvas); }`],
    ["nested binding", `async function helper({ nested: { control } }) {}
    async function action({ canvas }) {
      await helper({ nested: { control: canvas } });
    }`],
    ["return", `async function action({ canvas }) { return canvas; }`],
    ["break", `async function action({ canvas }) {
      const controls = await canvas.getByRole("button").all();
      for (const control of controls) { break; }
    }`],
    ["continue", `async function action({ canvas }) {
      const controls = await canvas.getByRole("button").all();
      for (const control of controls) { continue; }
    }`],
    ["nested function", `async function action({ canvas }) {
      async function nested() { await canvas.getByRole("button").click(); }
      await nested();
    }`],
    ["while", `async function action({ canvas }) {
      while (await canvas.getByRole("button").count()) {}
    }`],
    ["classic for", `async function action({ canvas }) {
      for (let index = 0; index < 1; index += 1) {}
    }`],
    ["for-in", `async function action({ canvas }) {
      for (const key in canvas) {}
    }`],
    ["do-while", `async function action({ canvas }) {
      do {} while (await canvas.getByRole("button").count());
    }`],
    ["try", `async function action({ canvas }) {
      try { await canvas.getByRole("button").click(); } finally {}
    }`],
    ["element access", `async function action({ canvas }) {
      await canvas["getByRole"]("button").click();
    }`],
    ["call wrapper", `async function action({ canvas }) {
      await canvas.getByRole.call(canvas, "button");
    }`],
    ["spread argument", `async function action({ canvas }) {
      await canvas.getByRole(...["button"]);
    }`],
    ["unsupported operator", `async function action({ canvas }) {
      if ((await canvas.getByRole("button").count()) === 1) {
        throw new Error("one");
      }
    }`],
    ["unsupported method", `async function action({ canvas }) {
      await canvas.getByRole("button").hover();
    }`],
    ["dynamic import", `async function action({ canvas }) {
      await import("./helpers.mjs");
    }`],
  ])("rejects unsupported grammar: %s", (_label, actions) => {
    expect(analyzeTask7VisualSource(guardedTask7Source(actions)).violations)
      .toContainEqual({
        component: "context-window",
        kind: "unsupported action syntax",
      });
  });

  test("does not expand unreachable unsupported declarations", () => {
    const source = guardedTask7Source(`
      const unused = { get helper() { return importedHelper; } };
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `);

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test("reports duplicate Task 7 component registrations", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `).replace(
      '["memory-inspector", [{ name: "all" }]],',
      '["context-window", [{ name: "duplicate" }]],',
    );

    expect(analyzeTask7VisualSource(source).duplicateComponents).toEqual([
      "context-window",
    ]);
  });

  test("fails closed on a cyclic registered action alias", () => {
    const source = guardedTask7Source(
      `const actionAlias = actionAlias;`,
      "actionAlias",
    );

    expect(() => analyzeTask7VisualSource(source)).not.toThrow();
    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unresolved action registration",
    });
  });

  test("fails closed at the 256-edge registration ceiling", () => {
    const aliases = Array.from(
      { length: 257 },
      (_, index) => `const action${index} = action${index + 1};`,
    ).join("\n");
    const source = guardedTask7Source(
      `${aliases}
      async function action257({ canvas }) {
        await canvas.getByRole("button").click();
      }`,
      "action0",
    );

    expect(() => analyzeTask7VisualSource(source)).not.toThrow();
    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unresolved action registration",
    });
  });

  test("fails closed at the 256-edge action identifier ceiling", () => {
    const statements = Array.from(
      { length: 257 },
      () => 'await canvas.getByRole("button").count();',
    ).join("\n");
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        ${statements}
      }
    `);

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unsupported action syntax",
    });
  });

  test("reuses resolved registration declarations without another edge", () => {
    const sharedCases = Array.from({ length: 130 }, () => "sharedCase").join(
      ",\n",
    );
    const source = `/* TASK 7 VISUAL ACTIONS START */
      const sharedCase = { name: "shared" };
      const TASK7_CASES = [
        ["context-window", [${sharedCases}]],
        ["memory-inspector", [{ name: "all" }]],
        ["context-cards", [{ name: "initial" }]],
        ["context-spillover", [{ name: "compacted" }]],
      ];
      /* TASK 7 VISUAL ACTIONS END */
      const CASES = new Map([
        /* TASK 7 VISUAL REGISTRATIONS START */
        ...TASK7_CASES
        /* TASK 7 VISUAL REGISTRATIONS END */
      ]);`;

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test("keeps one live registration and zero violations for every Task 7 component", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const analysis = analyzeTask7VisualSource(source);
    expect(analysis.violations).toEqual([]);
    expect(analysis.duplicateComponents).toEqual([]);
    for (const component of TASK7_COMPONENTS) {
      expect(analysis.registrationCounts.get(component)).toBe(1);
    }
  });
});
