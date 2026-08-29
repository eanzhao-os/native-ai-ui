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
    // Scope the prescribed replacements to selector text. Applying the first
    // regex to complete CSS can consume declarations from the preceding rule.
    rule.selector = rule.selector
      .replace(
        /([^,{]+):where\(\.dark, \.dark \*\)/g,
        (_, selector) => `:host-context(.dark) ${selector.trim()}`,
      )
      .replace(/(^|})\.dark\s+([^,{]+)/gm, "$1:host-context(.dark) $2");
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

export async function buildStyleModule() {
  const globalsCss = readFileSync(resolve(root, "app/globals.css"), "utf8");

  const themeMatch = globalsCss.match(/@theme inline \{[\s\S]*?\n\}/);
  if (!themeMatch) {
    throw new Error("Could not find @theme inline block in app/globals.css");
  }

  const input = `
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

${themeMatch[0]}

@source "../components";
@source "../app";
`;

  const tmpEntry = resolve(root, "node_modules/.cache/vanilla-tailwind-entry.css");
  mkdirSync(dirname(tmpEntry), { recursive: true });
  writeFileSync(tmpEntry, input);

  const result = await postcss([tailwindcss({ base: root })]).process(input, {
    from: tmpEntry,
  });
  const utilityCss = rewriteShadowSelectors(result.css);

  for (const needle of [
    ".flex",
    ".text-ink",
    "--color-accent",
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

/* ── Primitive card chrome (globals.css) ─────────────────────────────── */
.primitive-card-bar{padding:8px 12px}
.primitive-card-pad{padding:12px}
.primitive-card-footer{padding:10px 12px}
.primitive-icon-button{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px}
.primitive-table-cell{padding:6px 12px}

/* ── Streaming caret ─────────────────────────────────────────────────── */
.stream-caret{background:var(--ink);vertical-align:text-bottom;border-radius:1px;width:2px;height:1.05em;margin-left:1.5px;animation:caret-blink 1s step-end infinite;display:inline-block;translate:0 -.5px}
.stream-caret.is-streaming{animation:none}

/* ── Animated underline ──────────────────────────────────────────────── */
.animated-underline{display:inline-block;position:relative}
.animated-underline:after{content:"";transform-origin:0;height:1px;transition:transform .28s var(--ease-link);background:currentColor;position:absolute;bottom:-1px;left:0;right:0;transform:scaleX(0)}
a:focus-visible .animated-underline:after,a:hover .animated-underline:after{transform:scaleX(1)}
`;

  const completeCss = `${utilityCss}\n${extractSharedKeyframes(globalsCss)}${componentExtras}${sharedBlocks}`;
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
