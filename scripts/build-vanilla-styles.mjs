#!/usr/bin/env node
/**
 * Compiles the React-side Tailwind utilities and shared global CSS into the
 * Shadow DOM stylesheet consumed by every Vanilla Web Component.
 *
 * Usage:
 *   node scripts/build-vanilla-styles.mjs
 *   node scripts/build-vanilla-styles.mjs --check
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPaths = [
  resolve(root, "vanilla/core/styles.js"),
  resolve(root, "public/vanilla/core/styles.js"),
];

export function rewriteShadowSelectors(css) {
  const stylesheet = postcss.parse(css);
  stylesheet.walkRules((rule) => {
    // Scope the prescribed replacements to each selector-list branch. Applying
    // the first regex to complete CSS can consume the preceding declaration,
    // while applying the second to the unsplit list misses later branches.
    rule.selectors = rule.selectors.map((selector) => selector
      .replace(
        /([^,{]+):where\(\.dark, \.dark \*\)/g,
        (_, darkSelector) => `:host-context(.dark) ${darkSelector.trim()}`,
      )
      .replace(/^\.dark\s+([^,{]+)/, ":host-context(.dark) $1"));
  });
  return stylesheet.toString();
}

export function extractSharedKeyframes(css) {
  const names = [
    "shimmer-text", "fade-up", "fade-in", "eq-bounce", "stream-in",
    "caret-blink", "pop-in", "spin", "pixel-on",
  ];
  return names.map((name) => {
    const start = css.indexOf(`@keyframes ${name}`);
    if (start < 0) throw new Error(`Missing @keyframes ${name}`);
    let depth = 0;
    let opened = false;
    for (let index = start; index < css.length; index += 1) {
      if (css[index] === "{") { depth += 1; opened = true; }
      if (css[index] === "}") depth -= 1;
      if (opened && depth === 0) return css.slice(start, index + 1);
    }
    throw new Error(`Unclosed @keyframes ${name}`);
  }).join("\n");
}

export function extractComponentExtras(css) {
  const match = css.match(
    /\/\* ── Primitive card chrome ─+[\s\S]*?(?=\/\* ── Records table)/,
  );
  if (!match) {
    throw new Error("Could not extract shared component extras from globals.css");
  }
  return match[0].trim();
}

function removeSelfReferentialShadowTokens(css) {
  const stylesheet = postcss.parse(css);
  stylesheet.walkDecls(/^--shadow-/, (declaration) => {
    if (declaration.value === `var(${declaration.prop})`) {
      declaration.remove();
    }
  });
  return stylesheet.toString();
}

export async function buildStyleModule() {
  const globalsPath = resolve(root, "app/globals.css");
  const globalsCss = readFileSync(globalsPath, "utf8");

  const themeMatch = globalsCss.match(/@theme inline \{[\s\S]*?\n\}/);
  if (!themeMatch) {
    throw new Error("Could not find @theme inline block in app/globals.css");
  }

  const input = `
@import "tailwindcss" source(none);

@custom-variant dark (&:where(.dark, .dark *));

${themeMatch[0]}

@source "../components";
@source "../app";
`;

  const result = await postcss([
    tailwindcss({ base: root, optimize: false }),
  ]).process(input, {
    from: globalsPath,
  });
  const utilityCss = rewriteShadowSelectors(
    removeSelfReferentialShadowTokens(result.css),
  );

  for (const needle of [
    ".flex",
    ".text-ink",
    ".bg-accent",
    ":host-context(.dark) .dark\\:",
  ]) {
    if (!utilityCss.includes(needle)) {
      throw new Error(
        `Generated CSS is missing ${needle} — Tailwind output shape changed?`,
      );
    }
  }

  const recordsMatch = globalsCss.match(
    /\/\* ── Records table ─+[\s\S]*?(?=\/\* ── Insight cards chart)/,
  );
  const insightMatch = globalsCss.match(
    /\/\* ── Insight cards chart ─+[\s\S]*?$/,
  );
  if (!recordsMatch || !insightMatch) {
    throw new Error("Could not extract records/insight blocks from globals.css");
  }

  const sharedBlocks = rewriteShadowSelectors(`
/* ── Records table & insight chart (verbatim from globals.css) ───────── */
${recordsMatch[0].replace(/^\/\* ── Records table ─+\s*\n/, "").trim()}
${insightMatch[0].replace(/^\/\* ── Insight cards chart ─+\s*\n/, "").trim()}
`);

  const componentExtras = `
/* ── Shadow-host defaults (body-level inheritance the React side gets for
 * free from globals.css) ─────────────────────────────────────────────── */
:host {
  display: block;
  color: var(--ink, #1f2124);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/* ── Reduced motion: freeze decorative loops (mirrors globals.css) ────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  .pixel-grid > span { animation: none !important; }
}
`;

  const completeCss = `${utilityCss}\n${extractSharedKeyframes(globalsCss)}${componentExtras}\n${extractComponentExtras(globalsCss)}\n${sharedBlocks}`;
  const escapeForTemplate = (value) => value
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  return `/**
 * Canonical utility CSS for Native AI UI Vanilla Web Components.
 *
 * GENERATED FILE — do not edit by hand.
 * Source of truth: app/globals.css tokens + the Tailwind classes used by the
 * React components. Regenerate with: npm run vanilla:styles
 *
 * The generated Tailwind utilities guarantee that a vanilla template using
 * the same class list as its React counterpart renders identically inside
 * the shadow DOM. Dark mode resolves through :host-context(.dark).
 */

export const UTILITY_CSS = \`${escapeForTemplate(completeCss)}\`;
`;
}

async function run() {
  const generated = await buildStyleModule();
  const check = process.argv.includes("--check");

  if (check) {
    let stale = false;
    for (const outputPath of outputPaths) {
      let current = null;
      try {
        current = readFileSync(outputPath, "utf8");
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      if (current !== generated) {
        console.error(`${relative(root, outputPath)} is stale`);
        stale = true;
      }
    }
    if (stale) {
      process.exitCode = 1;
    } else {
      console.log("Vanilla generated styles are current");
    }
    return;
  }

  for (const outputPath of outputPaths) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, generated);
  }
  console.log(
    `Vanilla styles written to both outputs (${(generated.length / 1024).toFixed(1)} KB each)`,
  );
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await run();
}
