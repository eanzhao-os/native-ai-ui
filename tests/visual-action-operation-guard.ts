import ts from "typescript";

export type VisualOperationCategory =
  | "DOM construction"
  | "DOM evaluation"
  | "DOM rewrite"
  | "node replacement"
  | "style or hiding mutation"
  | "unsupported action syntax";

export type VisualOperationResolver = {
  arrayItems(node: ts.Node): ts.Expression[] | null;
  expressionPath(expression: ts.Expression): string[];
  staticText(node: ts.Node | undefined): string | null;
};

export type NormalizedVisualCall = {
  args: ts.Expression[] | null;
  expression: ts.Expression;
};

const rewriteProperties = new Set([
  "checked",
  "innerHTML",
  "innerText",
  "outerHTML",
  "outerText",
  "selectedIndex",
  "src",
  "textContent",
  "value",
]);

const styleProperties = new Set([
  "ariaHidden",
  "className",
  "display",
  "hidden",
  "inert",
  "opacity",
  "scrollLeft",
  "scrollTop",
  "visibility",
]);

const replacementMethods = new Set([
  "after",
  "append",
  "appendChild",
  "before",
  "insertAdjacentElement",
  "insertAdjacentHTML",
  "insertBefore",
  "prepend",
  "remove",
  "removeChild",
  "replaceChild",
  "replaceChildren",
  "replaceWith",
]);

const constructionMethods = new Set([
  "adoptNode",
  "cloneNode",
  "createComment",
  "createDocumentFragment",
  "createElement",
  "createElementNS",
  "createTextNode",
  "importNode",
]);

const styleMethods = new Set([
  "removeAttribute",
  "removeProperty",
  "setAttribute",
  "setProperty",
  "toggleAttribute",
]);

export function unwrapVisualExpression(
  expression: ts.Expression,
): ts.Expression {
  let current = expression;
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

function mutationCategory(path: string[]): VisualOperationCategory | null {
  const property = path.at(-1);
  if (!property) return null;
  if (rewriteProperties.has(property)) return "DOM rewrite";
  return styleProperties.has(property) ||
      path.some((part) => ["classList", "dataset", "style"].includes(part))
    ? "style or hiding mutation"
    : null;
}

export function normalizeVisualCall(
  call: ts.CallExpression,
  resolver: VisualOperationResolver,
): NormalizedVisualCall {
  let expression = unwrapVisualExpression(call.expression);
  let args: ts.Expression[] | null = [...call.arguments];
  while (true) {
    let wrapper: "call" | "apply" | null = null;
    let target: ts.Expression | null = null;
    if (ts.isPropertyAccessExpression(expression)) {
      if (expression.name.text === "call" || expression.name.text === "apply") {
        wrapper = expression.name.text;
        target = expression.expression;
      }
    } else if (ts.isElementAccessExpression(expression)) {
      const name = resolver.staticText(expression.argumentExpression);
      if (name === "call" || name === "apply") {
        wrapper = name;
        target = expression.expression;
      }
    }
    if (!wrapper || !target) break;
    args = wrapper === "call"
      ? args && args.length >= 1
        ? args.slice(1)
        : null
      : args && args.length === 2
        ? resolver.arrayItems(args[1])
        : null;
    expression = unwrapVisualExpression(target);
  }
  return { args, expression };
}

export function classifyVisualOperation(
  node: ts.Node,
  resolver: VisualOperationResolver,
): VisualOperationCategory[] {
  const violations = new Set<VisualOperationCategory>();
  if (ts.isBinaryExpression(node)) {
    const assignment =
      node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
      node.operatorToken.kind <= ts.SyntaxKind.LastAssignment;
    if (assignment) {
      const category = mutationCategory(resolver.expressionPath(node.left));
      if (category) violations.add(category);
    }
  } else if (ts.isDeleteExpression(node)) {
    const category = mutationCategory(resolver.expressionPath(node.expression));
    if (category) violations.add(category);
  } else if (ts.isCallExpression(node)) {
    const normalized = normalizeVisualCall(node, resolver);
    const normalizedPath = resolver.expressionPath(normalized.expression);
    const normalizedMethod = normalizedPath.at(-1);
    if (
      normalizedMethod === "evaluate" ||
      normalizedMethod === "evaluateAll" ||
      normalizedMethod === "evaluateHandle"
    ) {
      violations.add("DOM evaluation");
    }

    const path = resolver.expressionPath(node.expression);
    const root = path[0];
    const method = path.at(-1);
    if (method && replacementMethods.has(method)) {
      violations.add(
        method === "insertAdjacentHTML" ? "DOM rewrite" : "node replacement",
      );
    }
    if (
      method &&
      (styleMethods.has(method) ||
        path.includes("classList") ||
        path.includes("style"))
    ) {
      violations.add("style or hiding mutation");
    }
    if (method && constructionMethods.has(method) && path.includes("document")) {
      violations.add("DOM construction");
    }
    if (
      (root === "Object" && method === "defineProperty") ||
      (root === "Reflect" &&
        (method === "set" || method === "deleteProperty"))
    ) {
      const category = mutationCategory([
        resolver.staticText(node.arguments[1]) ?? "",
      ]);
      if (category) violations.add(category);
    }
    if (root === "Object" && method === "assign" && node.arguments[0]) {
      const category = mutationCategory(
        resolver.expressionPath(node.arguments[0]),
      );
      if (category) violations.add(category);
    }
  } else if (ts.isNewExpression(node)) {
    const path = resolver.expressionPath(node.expression);
    const constructor = path.at(-1);
    if (
      path.includes("document") ||
      constructor === "DOMParser" ||
      constructor === "MutationObserver"
    ) {
      violations.add("DOM construction");
    }
  } else if (ts.isTaggedTemplateExpression(node)) {
    violations.add("unsupported action syntax");
  }
  return [...violations];
}
