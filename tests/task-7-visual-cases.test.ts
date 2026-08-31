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

type FunctionResolution =
  | { kind: "external" }
  | { kind: "function"; node: ts.FunctionDeclaration }
  | { kind: "unresolved" }
  | { kind: "unsupported" };

type ResolutionState = {
  acceptedTargets: Set<ts.Declaration>;
  expressionTargets: Map<ts.Declaration, ts.Expression>;
  functionTargets: Map<ts.Declaration, FunctionResolution>;
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

function markerRange(
  source: string,
  startMarker: string,
  endMarker: string,
): SourceRange | null {
  const sourceFile = ts.createSourceFile(
    "/task-7-markers.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const comments = new Map<string, ts.CommentRange>();
  const addComments = (ranges: ts.CommentRange[] | undefined) => {
    for (const range of ranges ?? []) {
      comments.set(`${range.pos}:${range.end}`, range);
    }
  };
  const visit = (node: ts.Node) => {
    addComments(ts.getLeadingCommentRanges(source, node.pos));
    addComments(ts.getTrailingCommentRanges(source, node.end));
    for (const child of node.getChildren(sourceFile)) visit(child);
  };
  visit(sourceFile);

  const exactRanges = (marker: string) =>
    [...comments.values()].filter(
      (range) =>
        range.kind === ts.SyntaxKind.MultiLineCommentTrivia &&
        source.slice(range.pos, range.end) === marker,
    );
  const starts = exactRanges(startMarker);
  const ends = exactRanges(endMarker);
  if (starts.length !== 1 || ends.length !== 1) return null;
  const [start] = starts;
  const [end] = ends;
  return start.end <= end.pos ? { end: end.pos, start: start.end } : null;
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
  _node: ts.Node,
): boolean {
  if (state.remaining <= 0) return false;
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
      acceptedTargets: new Set(),
      expressionTargets: new Map(),
      functionTargets: new Map(),
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
    declarationRange: SourceRange | null = strictActionRange,
  ): ts.Expression | null {
    const current = unwrapVisualExpression(expression);
    if (!ts.isIdentifier(current)) return current;
    const declaration = declarationFor(current, checker, sourceFile);
    if (
      declaration &&
      state.resolved.has(declaration) &&
      state.expressionTargets.has(declaration)
    ) {
      return state.expressionTargets.get(declaration) ?? null;
    }
    if (!consumeOrRecord(state, current, component, kind, request)) return null;
    if (
      !declaration ||
      !ts.isVariableDeclaration(declaration) ||
      !declaration.initializer ||
      !isTopLevelConstDeclaration(declaration, sourceFile) ||
      (declarationRange && !nodeWithin(declaration, declarationRange, sourceFile))
    ) {
      return null;
    }
    if (state.visiting.has(declaration)) return null;
    if (
      !consumeOrRecord(
        state,
        declaration.initializer,
        component,
        kind,
        request,
      )
    ) {
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
        declarationRange,
      );
      if (resolved) {
        state.expressionTargets.set(declaration, resolved);
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
    const declaration = declarationFor(identifier, checker, sourceFile);
    if (
      declaration &&
      state.resolved.has(declaration) &&
      state.functionTargets.has(declaration)
    ) {
      return state.functionTargets.get(declaration) ?? { kind: "unresolved" };
    }
    if (!consumeOrRecord(state, identifier, component, kind, request)) {
      return { kind: "unresolved" };
    }
    if (!declaration) return { kind: "unresolved" };

    const cache = (resolved: FunctionResolution) => {
      state.functionTargets.set(declaration, resolved);
      state.resolved.add(declaration);
      return resolved;
    };
    if (ts.isFunctionDeclaration(declaration)) {
      return cache({ kind: "function", node: declaration });
    }
    if (
      ts.isImportSpecifier(declaration) ||
      ts.isImportClause(declaration) ||
      ts.isNamespaceImport(declaration) ||
      ts.isImportEqualsDeclaration(declaration)
    ) {
      return cache({ kind: "external" });
    }
    if (!ts.isVariableDeclaration(declaration)) {
      return { kind: "unresolved" };
    }
    if (!isTopLevelConstDeclaration(declaration, sourceFile)) {
      return cache({ kind: "unsupported" });
    }
    if (
      !declaration.initializer ||
      !nodeWithin(declaration, strictActionRange, sourceFile)
    ) {
      return { kind: "unresolved" };
    }
    if (state.visiting.has(declaration)) return { kind: "unresolved" };
    if (
      !consumeOrRecord(
        state,
        declaration.initializer,
        component,
        kind,
        request,
      )
    ) {
      return { kind: "unresolved" };
    }
    const initializer = unwrapVisualExpression(declaration.initializer);
    if (!ts.isIdentifier(initializer)) return cache({ kind: "unsupported" });
    state.visiting.add(declaration);
    try {
      const resolved = resolveFunctionTarget(
        initializer,
        state,
        component,
        kind,
        request,
      );
      return resolved.kind === "unresolved" ? resolved : cache(resolved);
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
    const declaration = declarationFor(identifier, checker, sourceFile);
    if (!declaration || !scope.acceptedDeclarations.has(declaration)) {
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
      recordViolation(scope.component, "unsupported action syntax", identifier);
      return false;
    }
    if (scope.resolution.acceptedTargets.has(declaration)) return true;
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
    scope.resolution.acceptedTargets.add(declaration);
    scope.resolution.resolved.add(declaration);
    return true;
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
    const inlineCase = unwrapVisualExpression(expression) === resolved;
    let nameFound = false;
    let advanceMsFound = false;
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
      if (inlineCase && propertyName === "advanceMs") {
        if (
          advanceMsFound ||
          !ts.isPropertyAssignment(property) ||
          !ts.isNumericLiteral(unwrapVisualExpression(property.initializer))
        ) {
          malformed = true;
        } else {
          advanceMsFound = true;
        }
        continue;
      }
      malformed = true;
    }
    if (!nameFound || malformed) {
      recordViolation(component, "unresolved action registration", expression);
      return;
    }
    if (action) {
      resolveRegisteredAction(component, action.identifier, action.node);
    }
  }

  function inspectUnmarkedRegistrationElement(
    element: ts.Expression,
    state: ResolutionState,
    visited: Set<ts.ArrayLiteralExpression>,
  ): void {
    if (ts.isOmittedExpression(element)) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        element,
      );
      return;
    }
    if (ts.isSpreadElement(element)) {
      if (
        !consumeOrRecord(
          state,
          element,
          "<unresolved>",
          "unresolved action registration",
          element,
        )
      ) {
        return;
      }
      const spread = resolveConstExpression(
        element.expression,
        state,
        "<unresolved>",
        "unresolved action registration",
        element,
        null,
      );
      if (!spread || !ts.isArrayLiteralExpression(spread)) {
        recordViolation(
          "<unresolved>",
          "unresolved action registration",
          element,
        );
      } else {
        inspectUnmarkedRegistrationArray(spread, state, visited);
      }
      return;
    }
    const tuple = resolveConstExpression(
      element,
      state,
      "<unresolved>",
      "unresolved action registration",
      element,
      null,
    );
    if (
      !tuple ||
      !ts.isArrayLiteralExpression(tuple) ||
      tuple.elements.length !== 2 ||
      tuple.elements.some(
        (item) => ts.isSpreadElement(item) || ts.isOmittedExpression(item),
      )
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        element,
      );
      return;
    }
    const component = resolveConstExpression(
      tuple.elements[0],
      state,
      "<unresolved>",
      "unresolved action registration",
      tuple.elements[0],
      null,
    );
    if (!component || !ts.isStringLiteralLike(component)) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        tuple.elements[0],
      );
    } else if (TASK7_COMPONENT_SET.has(component.text)) {
      recordViolation(
        component.text,
        "unresolved action registration",
        element,
      );
    }
  }

  function inspectUnmarkedRegistrationArray(
    array: ts.ArrayLiteralExpression,
    state: ResolutionState,
    visited: Set<ts.ArrayLiteralExpression>,
  ): void {
    if (visited.has(array)) return;
    visited.add(array);
    for (const element of array.elements) {
      inspectUnmarkedRegistrationElement(element, state, visited);
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
  const strictCasesDeclaration: ts.VariableDeclaration = casesDeclaration;
  const strictTask7Declaration: ts.VariableDeclaration = task7Declaration;
  const registrationMutators = new Set([
    "clear",
    "copyWithin",
    "delete",
    "fill",
    "pop",
    "push",
    "reverse",
    "set",
    "shift",
    "sort",
    "splice",
    "unshift",
  ]);

  function registrationMemberName(
    access: ts.ElementAccessExpression | ts.PropertyAccessExpression,
  ): string | null {
    if (ts.isPropertyAccessExpression(access)) return access.name.text;
    const argument = access.argumentExpression
      ? unwrapVisualExpression(access.argumentExpression)
      : null;
    return argument && ts.isStringLiteralLike(argument) ? argument.text : null;
  }

  type RegistryBinding = ts.BindingElement | ts.VariableDeclaration;

  const guardedRegistryAliases = new Set<RegistryBinding>([
    strictCasesDeclaration,
    strictTask7Declaration,
  ]);

  function registryAliasDeclaration(
    expression: ts.Expression,
  ): RegistryBinding | null {
    const current = unwrapVisualExpression(expression);
    if (!ts.isIdentifier(current)) return null;
    const declaration = declarationFor(current, checker, sourceFile);
    return declaration &&
      (ts.isVariableDeclaration(declaration) || ts.isBindingElement(declaration))
      ? declaration
      : null;
  }

  const registrationGraphAdjacent = new Map<
    RegistryBinding,
    Set<RegistryBinding>
  >();

  function addRegistrationGraphEdge(
    from: RegistryBinding,
    to: RegistryBinding,
  ): void {
    const fromAdjacent = registrationGraphAdjacent.get(from) ?? new Set();
    fromAdjacent.add(to);
    registrationGraphAdjacent.set(from, fromAdjacent);
    const toAdjacent = registrationGraphAdjacent.get(to) ?? new Set();
    toAdjacent.add(from);
    registrationGraphAdjacent.set(to, toAdjacent);
  }

  function bindingElements(name: ts.BindingName): ts.BindingElement[] {
    if (ts.isIdentifier(name)) return [];
    const elements: ts.BindingElement[] = [];
    for (const element of name.elements) {
      if (ts.isOmittedExpression(element)) continue;
      elements.push(element);
      elements.push(...bindingElements(element.name));
    }
    return elements;
  }

  function referencedRegistryBindings(node: ts.Node): Set<RegistryBinding> {
    const references = new Set<RegistryBinding>();
    const visit = (child: ts.Node) => {
      if (
        ts.isArrowFunction(child) ||
        ts.isFunctionExpression(child) ||
        ts.isFunctionDeclaration(child) ||
        ts.isMethodDeclaration(child) ||
        ts.isGetAccessorDeclaration(child) ||
        ts.isSetAccessorDeclaration(child) ||
        ts.isConstructorDeclaration(child)
      ) {
        return;
      }
      if (ts.isIdentifier(child)) {
        const declaration = registryAliasDeclaration(child);
        if (declaration) references.add(declaration);
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
    return references;
  }

  const registrationDeclarations: ts.VariableDeclaration[] = [];
  const collectRegistrationDeclarations = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node)) registrationDeclarations.push(node);
    ts.forEachChild(node, collectRegistrationDeclarations);
  };
  collectRegistrationDeclarations(sourceFile);

  for (const declaration of registrationDeclarations) {
    registrationGraphAdjacent.set(
      declaration,
      registrationGraphAdjacent.get(declaration) ?? new Set(),
    );
    for (const binding of bindingElements(declaration.name)) {
      addRegistrationGraphEdge(declaration, binding);
      if (binding.initializer) {
        for (const reference of referencedRegistryBindings(binding.initializer)) {
          addRegistrationGraphEdge(binding, reference);
        }
      }
    }
    if (!declaration.initializer) continue;
    for (const reference of referencedRegistryBindings(declaration.initializer)) {
      addRegistrationGraphEdge(declaration, reference);
    }
  }

  const reachability = newResolutionState();
  reachability.resolved.add(strictCasesDeclaration);
  reachability.resolved.add(strictTask7Declaration);
  const registrationQueue: RegistryBinding[] = [];
  const enqueueRegistrationBinding = (binding: RegistryBinding) => {
    if (!reachability.resolved.has(binding)) registrationQueue.push(binding);
  };
  for (const root of [strictCasesDeclaration, strictTask7Declaration]) {
    for (const adjacent of registrationGraphAdjacent.get(root) ?? []) {
      enqueueRegistrationBinding(adjacent);
    }
  }
  for (const entry of entries.elements) {
    if (ts.isOmittedExpression(entry)) continue;
    for (const binding of referencedRegistryBindings(entry)) {
      enqueueRegistrationBinding(binding);
    }
  }

  for (let index = 0; index < registrationQueue.length; index += 1) {
    const binding = registrationQueue[index];
    if (reachability.resolved.has(binding)) continue;
    if (
      !consumeOrRecord(
        reachability,
        binding,
        "<unresolved>",
        "unresolved action registration",
        binding,
      )
    ) {
      break;
    }
    reachability.resolved.add(binding);
    guardedRegistryAliases.add(binding);
    for (const adjacent of registrationGraphAdjacent.get(binding) ?? []) {
      enqueueRegistrationBinding(adjacent);
    }
  }

  const constituentVisiting = new Set<RegistryBinding>();
  const constituentResolved = new Set<RegistryBinding>([
    strictCasesDeclaration,
    strictTask7Declaration,
  ]);

  function inspectRegistrationConstituent(
    expression: ts.Expression,
    request: ts.Node,
  ): boolean {
    const current = unwrapVisualExpression(expression);
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
    if (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) {
      return true;
    }
    if (ts.isIdentifier(current)) {
      const binding = registryAliasDeclaration(current);
      if (binding) return inspectRegistrationBinding(binding, request);
      const declaration = declarationFor(current, checker, sourceFile);
      return Boolean(declaration && ts.isFunctionDeclaration(declaration));
    }
    if (ts.isArrayLiteralExpression(current)) {
      let valid = true;
      for (const element of current.elements) {
        if (ts.isOmittedExpression(element)) continue;
        const value = ts.isSpreadElement(element) ? element.expression : element;
        valid = inspectRegistrationConstituent(value, element) && valid;
      }
      return valid;
    }
    if (ts.isObjectLiteralExpression(current)) {
      let valid = true;
      for (const property of current.properties) {
        if (ts.isPropertyAssignment(property)) {
          valid = Boolean(staticPropertyName(property.name)) && valid;
          valid =
            inspectRegistrationConstituent(property.initializer, property) && valid;
        } else if (ts.isShorthandPropertyAssignment(property)) {
          valid = inspectRegistrationConstituent(property.name, property) && valid;
        } else if (ts.isSpreadAssignment(property)) {
          valid =
            inspectRegistrationConstituent(property.expression, property) && valid;
        } else {
          valid = false;
        }
      }
      return valid;
    }
    if (ts.isPropertyAccessExpression(current)) {
      return inspectRegistrationConstituent(current.expression, current);
    }
    if (ts.isElementAccessExpression(current)) {
      const argument = current.argumentExpression
        ? unwrapVisualExpression(current.argumentExpression)
        : null;
      return Boolean(
        argument &&
          (ts.isStringLiteralLike(argument) || ts.isNumericLiteral(argument)) &&
          inspectRegistrationConstituent(current.expression, current),
      );
    }
    return false;
  }

  function inspectRegistrationBinding(
    binding: RegistryBinding,
    request: ts.Node,
  ): boolean {
    if (constituentResolved.has(binding)) return true;
    if (constituentVisiting.has(binding)) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        request,
      );
      return false;
    }
    constituentVisiting.add(binding);
    let valid = true;
    if (ts.isVariableDeclaration(binding) && binding.initializer) {
      valid = inspectRegistrationConstituent(binding.initializer, binding);
    } else if (ts.isBindingElement(binding) && binding.initializer) {
      valid = inspectRegistrationConstituent(binding.initializer, binding);
    }
    constituentVisiting.delete(binding);
    if (valid) {
      constituentResolved.add(binding);
    } else {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        request,
      );
    }
    return valid;
  }

  for (const binding of guardedRegistryAliases) {
    if (
      binding !== strictCasesDeclaration &&
      binding !== strictTask7Declaration
    ) {
      inspectRegistrationBinding(binding, binding);
    }
  }

  function guardedRegistryRoot(
    expression: ts.Expression,
    visiting = new Set<ts.Declaration>(),
  ): RegistryBinding | null {
    const current = unwrapVisualExpression(expression);
    if (ts.isIdentifier(current)) {
      const declaration = registryAliasDeclaration(current);
      if (declaration && guardedRegistryAliases.has(declaration)) {
        return declaration;
      }
      if (
        !declaration ||
        !declaration.initializer ||
        visiting.has(declaration)
      ) {
        return null;
      }
      visiting.add(declaration);
      const root = guardedRegistryRoot(declaration.initializer, visiting);
      visiting.delete(declaration);
      return root;
    }
    if (
      ts.isPropertyAccessExpression(current) ||
      ts.isElementAccessExpression(current)
    ) {
      return guardedRegistryRoot(current.expression, visiting);
    }
    if (ts.isCallExpression(current)) {
      const callee = unwrapVisualExpression(current.expression);
      if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        return guardedRegistryRoot(callee.expression, visiting);
      }
    }
    return null;
  }

  function containsGuardedRegistry(node: ts.Node): boolean {
    let found = false;
    const visit = (child: ts.Node) => {
      if (found) return;
      if (ts.isIdentifier(child) && guardedRegistryRoot(child)) {
        found = true;
        return;
      }
      ts.forEachChild(child, visit);
    };
    visit(node);
    return found;
  }

  function inspectRegistrationMutation(node: ts.Node): void {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment
    ) {
      const guardedLeft = guardedRegistryRoot(node.left);
      const assignedAlias =
        node.operatorToken.kind === ts.SyntaxKind.EqualsToken
          ? registryAliasDeclaration(node.left)
          : null;
      const guardedRight =
        guardedRegistryRoot(node.right) || containsGuardedRegistry(node.right);
      if (assignedAlias && !guardedLeft && guardedRight) {
        guardedRegistryAliases.add(assignedAlias);
      } else if (!assignedAlias && !guardedLeft && guardedRight) {
        recordViolation(
          "<unresolved>",
          "unresolved action registration",
          node,
        );
      }
      if (guardedLeft) {
        recordViolation(
          "<unresolved>",
          "unresolved action registration",
          node,
        );
      }
    } else if (
      ts.isDeleteExpression(node) &&
      guardedRegistryRoot(node.expression)
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        node,
      );
    } else if (
      (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
      (node.operator === ts.SyntaxKind.PlusPlusToken ||
        node.operator === ts.SyntaxKind.MinusMinusToken) &&
      guardedRegistryRoot(node.operand)
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        node,
      );
    } else if (ts.isCallExpression(node)) {
      const callee = unwrapVisualExpression(node.expression);
      if (
        ts.isPropertyAccessExpression(callee) ||
        ts.isElementAccessExpression(callee)
      ) {
        const root = guardedRegistryRoot(callee.expression);
        const member = registrationMemberName(callee);
        const safeCasesRead =
          root === strictCasesDeclaration &&
          ts.isPropertyAccessExpression(callee) &&
          member === "get";
        if (
          root &&
          !safeCasesRead &&
          (ts.isElementAccessExpression(callee) ||
            registrationMutators.has(member ?? "") ||
            root !== strictCasesDeclaration)
        ) {
          recordViolation(
            "<unresolved>",
            "unresolved action registration",
            node,
          );
        }
      } else if (ts.isIdentifier(callee) && guardedRegistryRoot(callee)) {
        recordViolation(
          "<unresolved>",
          "unresolved action registration",
          node,
        );
      }
      if (node.arguments.some(containsGuardedRegistry)) {
        recordViolation(
          "<unresolved>",
          "unresolved action registration",
          node,
        );
      }
    } else if (
      ts.isNewExpression(node) &&
      node !== casesInitializer &&
      node.arguments?.some(containsGuardedRegistry)
    ) {
      recordViolation(
        "<unresolved>",
        "unresolved action registration",
        node,
      );
    }
    ts.forEachChild(node, inspectRegistrationMutation);
  }

  inspectRegistrationMutation(sourceFile);
  const unmarkedState = newResolutionState();
  const visitedUnmarkedArrays = new Set<ts.ArrayLiteralExpression>();
  for (const entry of entries.elements) {
    if (!nodeWithin(entry, strictRegistrationRange, sourceFile)) {
      inspectUnmarkedRegistrationElement(
        entry,
        unmarkedState,
        visitedUnmarkedArrays,
      );
    }
  }

  if (
    !consumeOrRecord(
      registrationState,
      task7Declaration.initializer,
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
  registrationState.expressionTargets.set(task7Declaration, task7Initializer);
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

type Task7MarkerCarrier =
  | "regular expression"
  | "string"
  | "template"
  | "unrelated comment";

function encodedTask7MarkerSource(carrier: Task7MarkerCarrier) {
  const encodedValue = (marker: string) => {
    if (carrier === "string") return JSON.stringify(marker);
    if (carrier === "template") return `\`${marker}\``;
    return `/${marker.replaceAll("/", "\\/").replaceAll("*", "\\*")}/`;
  };
  const statement = (marker: string) =>
    carrier === "unrelated comment"
      ? `// ${marker}`
      : `void ${encodedValue(marker)};`;
  const arrayEntry = (marker: string) =>
    carrier === "unrelated comment"
      ? `// ${marker}`
      : `${encodedValue(marker)},`;

  return `${statement(TASK7_ACTION_START)}
    async function action({ canvas }) {
      await canvas.getByRole("button").click();
    }
    const TASK7_CASES = [
      ["context-window", [{ name: "selected", action }]],
      ["memory-inspector", [{ name: "all" }]],
      ["context-cards", [{ name: "initial" }]],
      ["context-spillover", [{ name: "compacted" }]],
    ];
    ${statement(TASK7_ACTION_END)}
    const CASES = new Map([
      ${arrayEntry(TASK7_REGISTRATION_START)}
      ...TASK7_CASES,
      ${arrayEntry(TASK7_REGISTRATION_END)}
    ]);`;
}

function regexTemplateTask7MarkerSource(
  range: "actions" | "registrations",
  brace: "open" | "close",
) {
  const expression = brace === "open" ? "/\\{/" : "/\\}/";
  const encoded = (marker: string) =>
    `\`\${${expression}.test("x")} ${marker}\``;
  const statement = (marker: string) => `void ${encoded(marker)};`;
  const actionStart =
    range === "actions" ? statement(TASK7_ACTION_START) : TASK7_ACTION_START;
  const actionEnd =
    range === "actions" ? statement(TASK7_ACTION_END) : TASK7_ACTION_END;
  const registrationStart =
    range === "registrations"
      ? statement(TASK7_REGISTRATION_START)
      : TASK7_REGISTRATION_START;
  const registrationEnd =
    range === "registrations"
      ? statement(TASK7_REGISTRATION_END)
      : TASK7_REGISTRATION_END;

  return `${actionStart}
    async function action({ canvas }) {
      await canvas.getByRole("button").click();
    }
    const TASK7_CASES = [
      ["context-window", [{ name: "selected", action }]],
      ["memory-inspector", [{ name: "all" }]],
      ["context-cards", [{ name: "initial" }]],
      ["context-spillover", [{ name: "compacted" }]],
    ];
    ${actionEnd}
    ${registrationStart}
    const CASES = new Map([
      ...TASK7_CASES
    ]);
    ${registrationEnd}`;
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
    "string",
    "template",
    "regular expression",
    "unrelated comment",
  ] as const)("rejects Task 7 markers encoded in a %s", (carrier) => {
    expect(
      analyzeTask7VisualSource(encodedTask7MarkerSource(carrier)).violations,
    ).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    ["actions", "open"],
    ["actions", "close"],
    ["registrations", "open"],
    ["registrations", "close"],
  ] as const)(
    "rejects regex-template fake Task 7 %s markers after a %s brace",
    (range, brace) => {
      expect(
        analyzeTask7VisualSource(regexTemplateTask7MarkerSource(range, brace))
          .violations,
      ).toContainEqual({
        component: "<unresolved>",
        kind: "unresolved action registration",
      });
    },
  );

  test("rejects a later unmarked Task 7 registration override", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `).replace(
      "/* TASK 7 VISUAL REGISTRATIONS END */",
      `/* TASK 7 VISUAL REGISTRATIONS END */
      , ["context-window", [{ name: "override" }]]`,
    );

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unresolved action registration",
    });
  });

  test("rejects a recursively spread unmarked Task 7 registration", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)
      .replace(
        "const CASES = new Map([",
        `const UNMARKED_CASES = [
          ["context-window", [{ name: "override" }]],
        ];
        const CASES = new Map([`,
      )
      .replace(
        TASK7_REGISTRATION_END,
        `${TASK7_REGISTRATION_END},
        ...UNMARKED_CASES`,
      );

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unresolved action registration",
    });
  });

  test("fails closed for an unresolved unmarked registration spread", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `).replace(
      TASK7_REGISTRATION_END,
      `${TASK7_REGISTRATION_END},
      ...unknownCases`,
    );

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    ["direct write before construction", "", 'tuple[0] = "context-window";', ""],
    [
      "aliased write before construction",
      "const tupleAlias = tuple;",
      'tupleAlias[0] = "context-window";',
      "",
    ],
    [
      "aliased mutating call after construction",
      "const tupleAlias = tuple;",
      "",
      'tupleAlias.splice(0, 1, "context-window");',
    ],
  ])(
    "rejects %s to an unmarked registration tuple component",
    (_label, alias, beforeConstruction, afterConstruction) => {
      const source = `${guardedTask7Source(`
        async function action({ canvas }) {
          await canvas.getByRole("button").click();
        }
      `)
        .replace(
          "const CASES = new Map([",
          `const tuple = ["unrelated-component", [{ name: "override" }]];
          ${alias}
          ${beforeConstruction}
          const CASES = new Map([`,
        )
        .replace(
          TASK7_REGISTRATION_END,
          `${TASK7_REGISTRATION_END},
          tuple`,
        )}
        ${afterConstruction}`;

      expect(analyzeTask7VisualSource(source).violations).toContainEqual({
        component: "<unresolved>",
        kind: "unresolved action registration",
      });
    },
  );

  test.each([
    [
      "destructured TASK7_CASES entry",
      `const [entry] = TASK7_CASES;
      entry[1][1].action = dishonestAction;`,
    ],
    [
      "nested destructured Task 7 case",
      `const [[, cases]] = TASK7_CASES;
      const [, selected] = cases;
      selected.action = dishonestAction;`,
    ],
    [
      "nested container alias",
      `const selected = TASK7_CASES[0][1][1];
      const holder = { nested: { selected } };
      holder.nested.selected.action = dishonestAction;`,
    ],
  ])("rejects action replacement through a %s", (_label, mutation) => {
    const source = `${guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)}
      ${mutation}`;

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    [
      "nested reverse case container",
      `const selected = { name: "selected", action };
      const inner = { selected };
      const holder = { inner };`,
      "selected",
      "holder.inner.selected.action = dishonestAction;",
    ],
    [
      "reverse case container",
      `const selected = { name: "selected", action };
      const holder = { selected };`,
      "selected",
      "holder.selected.action = dishonestAction;",
    ],
    [
      "late assigned case container",
      `const selected = { name: "selected", action };
      const holder = {};`,
      "selected",
      `holder.selected = selected;
      holder.selected.action = dishonestAction;`,
    ],
  ])(
    "rejects action replacement through a %s",
    (_label, declarations, registeredCase, mutation) => {
      const source = `${guardedTask7Source(
        `async function action({ canvas }) {
          await canvas.getByRole("button").click();
        }
        ${declarations}`,
        "action",
      ).replace('{ name: "selected", action: action }', registeredCase)}
        ${mutation}`;

      expect(analyzeTask7VisualSource(source).violations).toContainEqual({
        component: "<unresolved>",
        kind: "unresolved action registration",
      });
    },
  );

  test.each([
    ["resolved", 'const method = "splice";'],
    ["dynamic", "const method = chooseMethod();"],
  ])("rejects a %s computed registration mutator", (_label, method) => {
    const source = `${guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)
      .replace(
        "const CASES = new Map([",
        `const tuple = ["unrelated-component", [{ name: "override" }]];
        ${method}
        const CASES = new Map([`,
      )
      .replace(
        TASK7_REGISTRATION_END,
        `${TASK7_REGISTRATION_END},
        tuple`,
      )}
      tuple[method](0, 1, "context-window");`;

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test("fails closed for a cyclic reachable registration graph", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)
      .replace(
        "const CASES = new Map([",
        `const first = { next: second };
        const second = { next: first };
        const tuple = ["unrelated-component", first];
        const CASES = new Map([`,
      )
      .replace(
        TASK7_REGISTRATION_END,
        `${TASK7_REGISTRATION_END},
        tuple`,
      );

    expect(() => analyzeTask7VisualSource(source)).not.toThrow();
    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test("reuses a resolved declaration in a reachable diamond graph", () => {
    const repeatedLeaf = Array.from({ length: 300 }, () => "leaf").join(", ");
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)
      .replace(
        "const CASES = new Map([",
        `const leaf = { value: "leaf" };
        const diamond = { branches: [${repeatedLeaf}] };
        const tuple = ["unrelated-component", diamond];
        const CASES = new Map([`,
      )
      .replace(
        TASK7_REGISTRATION_END,
        `${TASK7_REGISTRATION_END},
        tuple`,
      );

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test.each([
    [256, false],
    [257, true],
  ])(
    "bounds the reachable registration walk at %i edges",
    (edgeCount, exhausted) => {
      const graphDeclarations = Array.from(
        { length: edgeCount - 1 },
        (_, index) =>
          index === 0
            ? 'const graph0 = { value: "leaf" };'
            : `const graph${index} = { previous: graph${index - 1} };`,
      ).join("\n");
      const source = guardedTask7Source(`
        async function action({ canvas }) {
          await canvas.getByRole("button").click();
        }
      `)
        .replace(
          "const CASES = new Map([",
          `${graphDeclarations}
          const tuple = ["unrelated-component", graph${edgeCount - 2}];
          const CASES = new Map([`,
        )
        .replace(
          TASK7_REGISTRATION_END,
          `${TASK7_REGISTRATION_END},
          tuple`,
        );
      const violations = analyzeTask7VisualSource(source).violations;

      if (exhausted) {
        expect(violations).toContainEqual({
          component: "<unresolved>",
          kind: "unresolved action registration",
        });
      } else {
        expect(violations).toEqual([]);
      }
    },
  );

  test("allows an unrelated function-valued registration constituent", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)
      .replace(
        "const CASES = new Map([",
        `const unrelatedAction = (args) => stabilizeUnrelated(args);
        const unrelatedTuple = [
          "unrelated-component",
          [{ name: "settled", action: unrelatedAction }],
        ];
        const CASES = new Map([`,
      )
      .replace(
        TASK7_REGISTRATION_END,
        `${TASK7_REGISTRATION_END},
        unrelatedTuple`,
      );

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test.each([
    ["call", "const dynamic = loadCases();"],
    [
      "computed property",
      'const dynamic = { [chooseKey()]: "value" };',
    ],
  ])(
    "fails closed for an unresolved dynamic registration constituent: %s",
    (_label, declaration) => {
      const source = guardedTask7Source(`
        async function action({ canvas }) {
          await canvas.getByRole("button").click();
        }
      `)
        .replace(
          "const CASES = new Map([",
          `${declaration}
          const tuple = ["unrelated-component", dynamic];
          const CASES = new Map([`,
        )
        .replace(
          TASK7_REGISTRATION_END,
          `${TASK7_REGISTRATION_END},
          tuple`,
        );

      expect(analyzeTask7VisualSource(source).violations).toContainEqual({
        component: "<unresolved>",
        kind: "unresolved action registration",
      });
    },
  );

  test.each([
    [
      "TASK7_CASES.push",
      (source: string) =>
        source.replace(
          "/* TASK 7 VISUAL ACTIONS END */",
          `/* TASK 7 VISUAL ACTIONS END */
          TASK7_CASES.push(["context-window", [{ name: "override" }]]);`,
        ),
    ],
    [
      "CASES.set",
      (source: string) =>
        `${source}
        CASES.set("context-window", [{ name: "override" }]);`,
    ],
    [
      "a mutable TASK7_CASES alias",
      (source: string) =>
        source.replace(
          "/* TASK 7 VISUAL ACTIONS END */",
          `/* TASK 7 VISUAL ACTIONS END */
          let task7Alias = TASK7_CASES;
          task7Alias.push(["context-window", [{ name: "override" }]]);`,
        ),
    ],
  ])("rejects registration mutation through %s", (_label, mutate) => {
    const source = mutate(guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `));

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test("rejects mutation through a registry alias established by assignment", () => {
    const source = `${guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)}
      let alias;
      alias = TASK7_CASES;
      alias.push(["context-window", [{ name: "override" }]]);`;

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    ["parenthesized", "(TASK7_CASES)"],
    ["as-typed", "TASK7_CASES as typeof TASK7_CASES"],
    ["type-asserted", "<typeof TASK7_CASES>TASK7_CASES"],
  ])("tracks a %s registry assignment before mutation", (_label, assigned) => {
    const source = `${guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `)}
      let alias;
      alias = ${assigned};
      alias.push(["context-window", [{ name: "override" }]]);`;

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "<unresolved>",
      kind: "unresolved action registration",
    });
  });

  test.each([
    [
      "extra callback property",
      `{ name: "selected", action, after: () => importedHelper() }`,
    ],
    [
      "extra imported-call property",
      `{ name: "selected", action, metadata: importedHelper() }`,
    ],
  ])("rejects a referenced case with an %s", (_label, visualCase) => {
    const source = guardedTask7Source(
      `async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
      const selectedCase = ${visualCase};`,
      "action",
    ).replace('{ name: "selected", action: action }', "selectedCase");

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unresolved action registration",
    });
  });

  test("rejects duplicate inline numeric advanceMs metadata", () => {
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        await canvas.getByRole("button").click();
      }
    `).replace(
      '{ name: "initial" },',
      '{ name: "initial", advanceMs: 0, advanceMs: 1 },',
    );

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
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

  test("reuses an accepted action binding without another edge", () => {
    const statements = Array.from(
      { length: 300 },
      () => 'await canvas.getByRole("button").count();',
    ).join("\n");
    const source = guardedTask7Source(`
      async function action({ canvas }) {
        ${statements}
      }
    `);

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test("reuses a resolved registration expression target", () => {
    const sharedCases = Array.from({ length: 300 }, () => "sharedCase").join(
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

  test("reuses a resolved helper function target", () => {
    const helperCalls = Array.from(
      { length: 300 },
      () => "await helper(canvas);",
    ).join("\n");
    const source = guardedTask7Source(`
      async function helper(control) {
        await control.click();
      }
      async function action({ canvas }) {
        ${helperCalls}
      }
    `);

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test("accepts exactly 256 Task 7 resolution edges", () => {
    const aliases = Array.from(
      { length: 127 },
      (_, index) => `const action${index} = action${index + 1};`,
    ).join("\n");
    const source = guardedTask7Source(
      `${aliases}
      async function action127({ canvas }) {}`,
      "action0",
    );

    expect(analyzeTask7VisualSource(source).violations).toEqual([]);
  });

  test("fails closed on the 257th Task 7 resolution edge", () => {
    const aliases = Array.from(
      { length: 127 },
      (_, index) => `const action${index} = action${index + 1};`,
    ).join("\n");
    const source = guardedTask7Source(
      `${aliases}
      async function action127({ canvas }) {
        const control = canvas;
      }`,
      "action0",
    );

    expect(analyzeTask7VisualSource(source).violations).toContainEqual({
      component: "context-window",
      kind: "unsupported action syntax",
    });
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
