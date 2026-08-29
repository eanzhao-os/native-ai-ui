import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import postcss, { type Node } from "postcss";
import { describe, expect, test } from "vitest";
import {
  buildStyleModule,
  buildTailwindCssForSources,
  extractComponentExtras,
  extractSharedKeyframes,
  rewriteShadowSelectors,
} from "../scripts/build-vanilla-styles.mjs";

const root = resolve(".");
const styleScript = resolve("scripts/build-vanilla-styles.mjs");
const styleOutputs = [
  "vanilla/core/styles.js",
  "public/vanilla/core/styles.js",
];

function runStyleCheck() {
  return spawnSync(process.execPath, [styleScript, "--check"], {
    cwd: root,
    encoding: "utf8",
  });
}

const tailwindBuilds = new Map<string, Promise<string>>();

function buildTailwindOnce(sources: string[]) {
  const key = JSON.stringify(sources);
  let build = tailwindBuilds.get(key);
  if (!build) {
    build = buildTailwindCssForSources(sources);
    tailwindBuilds.set(key, build);
  }
  return build;
}

function utilitySelectorSet(css: string) {
  const selectors = new Set<string>();
  postcss.parse(css).walkRules((rule) => {
    let ancestor: Node["parent"] = rule.parent;
    while (ancestor) {
      if (
        ancestor.type === "atrule"
        && "name" in ancestor
        && ancestor.name === "layer"
        && "params" in ancestor
        && typeof ancestor.params === "string"
        && ancestor.params.trim() === "utilities"
      ) {
        for (const selector of rule.selectors) selectors.add(selector);
        break;
      }
      ancestor = ancestor.parent;
    }
  });
  return selectors;
}

function setDifference(left: Set<string>, right: Set<string>) {
  return new Set([...left].filter((value) => !right.has(value)));
}

function setIntersection(left: Set<string>, right: Set<string>) {
  return new Set([...left].filter((value) => right.has(value)));
}

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = resolve(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

const compatibilityPath = resolve("app/vanilla-style-compatibility.ts");
const confirmedCompatibilitySelectors = [
  ".h-\\[130px\\]",
  ".size-full",
  ".top-2",
  ".z-20",
  ".w-72",
  ".max-h-56",
];

// Tailwind's raw file scanner also sees JavaScript keywords/event names and
// prefixes inside hand-written CSS selectors. These are not template classes.
const vanillaScannerArtifactSelectors = new Set([
  ".blur",
  ".border-orange",
  ".border-red",
  ".py-0",
  ".static",
]);

describe("Vanilla Shadow CSS generation", () => {
  test("places host context before a dark utility descendant", () => {
    const input = ".dark\\:bg-accent:where(.dark, .dark *){background:var(--accent)}";
    expect(rewriteShadowSelectors(input)).toBe(
      ":host-context(.dark) .dark\\:bg-accent{background:var(--accent)}",
    );
  });

  test("does not consume a preceding rule while rewriting dark utilities", () => {
    const input = ".foo{color:red}.dark\\:bg-accent:where(.dark, .dark *){background:var(--accent)}";
    expect(rewriteShadowSelectors(input)).toBe(
      ".foo{color:red}:host-context(.dark) .dark\\:bg-accent{background:var(--accent)}",
    );
  });

  test("rewrites shared document dark selectors", () => {
    expect(rewriteShadowSelectors(".dark .records-checkbox-box{color:white}"))
      .toBe(":host-context(.dark) .records-checkbox-box{color:white}");
  });

  test("rewrites every branch in a grouped document dark selector", () => {
    expect(rewriteShadowSelectors(".dark .a,.dark .b{color:white}"))
      .toBe(":host-context(.dark) .a,:host-context(.dark) .b{color:white}");
  });

  test("copies every shared keyframe into Shadow CSS", () => {
    const globals = readFileSync(resolve("app/globals.css"), "utf8");
    const keyframes = extractSharedKeyframes(globals);
    for (const name of [
      "shimmer-text", "fade-up", "fade-in", "eq-bounce", "stream-in",
      "caret-blink", "pop-in", "spin", "pixel-on",
    ]) {
      expect(keyframes).toContain(`@keyframes ${name}`);
    }
  });

  test("builds shared keyframes and host-context dark descendants", async () => {
    const moduleSource = await buildStyleModule();
    expect(moduleSource).toContain(":host-context(.dark) .dark\\\\:");
    for (const name of [
      "shimmer-text", "fade-up", "fade-in", "eq-bounce", "stream-in",
      "caret-blink", "pop-in", "spin", "pixel-on",
    ]) {
      expect(moduleSource).toContain(`@keyframes ${name}`);
    }
  }, 30_000);

  test("keeps inherited shadow tokens valid while retaining their utilities", async () => {
    const moduleSource = await buildStyleModule();
    for (const name of [
      "hairline", "btn", "card", "raised", "overlay", "inset-field",
    ]) {
      expect(moduleSource).not.toContain(
        `--shadow-${name}: var(--shadow-${name});`,
      );
    }
    expect(moduleSource).toContain(".shadow-card");
  }, 30_000);

  test("compiles an explicit source set for compatibility audits", async () => {
    expect(buildTailwindCssForSources).toBeTypeOf("function");
    const css = await buildTailwindCssForSources(["../components", "../app"]);
    expect(css).toContain(".flex");
  }, 30_000);

  test("scans configured React sources but ignores non-React files", async () => {
    const fixturePath = resolve(".task-1-non-react-source.html");
    const nonReactClass = ["mt-[", "12345px", "]"].join("");
    writeFileSync(fixturePath, `<div class="${nonReactClass}"></div>`);
    try {
      const moduleSource = await buildStyleModule();
      expect(moduleSource).not.toContain("12345px");
      expect(moduleSource).toContain(".flex");
    } finally {
      rmSync(fixturePath, { force: true });
    }
  }, 30_000);

  test("covers every current Vanilla Tailwind selector in production CSS", async () => {
    const productionCss = await buildTailwindOnce(["../components", "../app"]);
    const vanillaCss = await buildTailwindOnce(["../vanilla/components"]);
    const vanillaOnlySelectors = setDifference(
      utilitySelectorSet(vanillaCss),
      utilitySelectorSet(productionCss),
    );
    expect([
      ...setDifference(vanillaScannerArtifactSelectors, vanillaOnlySelectors),
    ]).toEqual([]);
    const missingSelectors = setDifference(
      vanillaOnlySelectors,
      vanillaScannerArtifactSelectors,
    );
    if (missingSelectors.size > 0) {
      const confirmed = confirmedCompatibilitySelectors.filter((selector) =>
        missingSelectors.has(selector)
      );
      throw new Error(
        `Vanilla-only Tailwind selectors (${missingSelectors.size}); `
        + `confirmed=${JSON.stringify(confirmed)}; `
        + `all=${JSON.stringify([...missingSelectors].sort())}`,
      );
    }
    expect([...missingSelectors]).toEqual([]);
  }, 60_000);

  test("keeps the compatibility bridge bounded and runtime-inert", async () => {
    expect(relative(root, compatibilityPath).split(sep)[0]).toBe("app");
    expect(compatibilityPath.endsWith(".ts")).toBe(true);
    expect(existsSync(compatibilityPath)).toBe(true);

    const compatibilitySource = readFileSync(compatibilityPath, "utf8");
    expect(compatibilitySource).toContain("Task 16");
    const candidates = [...compatibilitySource.matchAll(/^\s*"([^"]+)",?$/gm)]
      .map((match) => match[1]);
    expect(candidates.length).toBeGreaterThan(0);
    expect(new Set(candidates).size).toBe(candidates.length);

    const runtimeImports = ["app", "components", "vanilla"]
      .flatMap((directory) => listFiles(resolve(directory)))
      .filter((filePath) => filePath !== compatibilityPath)
      .filter((filePath) => /\.[cm]?[jt]sx?$/.test(filePath))
      .flatMap((filePath) => readFileSync(filePath, "utf8")
        .split("\n")
        .filter((line) =>
          line.includes("vanilla-style-compatibility")
          && /\b(?:import|require)\b/.test(line)
        )
        .map((line) => `${relative(root, filePath)}: ${line.trim()}`));
    expect(runtimeImports).toEqual([]);

    const globalsDirectory = dirname(resolve("app/globals.css"));
    const appSourcesWithoutCompatibility = listFiles(resolve("app"))
      .filter((filePath) => filePath !== compatibilityPath)
      .map((filePath) => {
        const source = relative(globalsDirectory, filePath).split(sep).join("/");
        return source.startsWith(".") ? source : `./${source}`;
      });
    const baselineCss = await buildTailwindOnce([
      "../components",
      ...appSourcesWithoutCompatibility,
    ]);
    const compatibilityCss = await buildTailwindOnce([
      "./vanilla-style-compatibility.ts",
    ]);
    const vanillaCss = await buildTailwindOnce(["../vanilla/components"]);
    const baselineSelectors = utilitySelectorSet(baselineCss);
    const compatibilitySelectors = utilitySelectorSet(compatibilityCss);
    const vanillaOnlyBeforeBridge = setDifference(
      utilitySelectorSet(vanillaCss),
      baselineSelectors,
    );
    expect([
      ...setDifference(
        vanillaScannerArtifactSelectors,
        vanillaOnlyBeforeBridge,
      ),
    ]).toEqual([]);
    const missingBeforeBridge = setDifference(
      vanillaOnlyBeforeBridge,
      vanillaScannerArtifactSelectors,
    );

    expect([...setIntersection(compatibilitySelectors, baselineSelectors)])
      .toEqual([]);
    expect([...setDifference(compatibilitySelectors, missingBeforeBridge)])
      .toEqual([]);
    expect([...setDifference(missingBeforeBridge, compatibilitySelectors)])
      .toEqual([]);
    expect(compatibilitySelectors.size).toBe(candidates.length);
    expect(candidates.length).toBe(missingBeforeBridge.size);
  }, 60_000);

  test("extracts component extras from the canonical globals source", () => {
    const css = `before
/* ── Primitive card chrome ── */
.primitive-card-pad{padding:12.345px}
/* ── Streaming caret (atoms/StreamText) ── */
.stream-caret{width:3px}
/* ── Animated underline ── */
.animated-underline{display:block}
/* ── Records table ── */
after`;
    expect(extractComponentExtras(css)).toBe(`/* ── Primitive card chrome ── */
.primitive-card-pad{padding:12.345px}
/* ── Streaming caret (atoms/StreamText) ── */
.stream-caret{width:3px}
/* ── Animated underline ── */
.animated-underline{display:block}`);
  });

  test("passes check mode when both generated outputs are current", () => {
    const result = runStyleCheck();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Vanilla generated styles are current");
  }, 30_000);

  test.each(styleOutputs)("fails check mode when %s is stale", (relativePath) => {
    const outputPath = resolve(relativePath);
    const original = readFileSync(outputPath, "utf8");
    try {
      writeFileSync(outputPath, `${original}\n/* stale test */\n`);
      const result = runStyleCheck();
      expect(result.status).toBe(1);
      expect(result.stderr).toContain(`${relativePath} is stale`);
    } finally {
      writeFileSync(outputPath, original);
    }
  }, 30_000);

  test("check mode creates or changes no files", () => {
    const cacheEntry = resolve("node_modules/.cache/vanilla-tailwind-entry.css");
    const backupEntry = `${cacheEntry}.test-backup-${process.pid}`;
    rmSync(backupEntry, { force: true });
    if (existsSync(cacheEntry)) renameSync(cacheEntry, backupEntry);
    const outputMtimes = styleOutputs.map((relativePath) =>
      statSync(resolve(relativePath)).mtimeMs
    );

    try {
      const result = runStyleCheck();
      expect(result.status).toBe(0);
      expect(existsSync(cacheEntry)).toBe(false);
      for (const [index, relativePath] of styleOutputs.entries()) {
        expect(statSync(resolve(relativePath)).mtimeMs).toBe(outputMtimes[index]);
      }
    } finally {
      rmSync(cacheEntry, { force: true });
      if (existsSync(backupEntry)) renameSync(backupEntry, cacheEntry);
    }
  }, 30_000);

  test("build output is identical in development and production", () => {
    const moduleUrl = pathToFileURL(styleScript).href;
    const source = `
      import { buildStyleModule } from ${JSON.stringify(moduleUrl)};
      process.stdout.write(await buildStyleModule());
    `;
    const buildFor = (nodeEnv: "development" | "production") => spawnSync(
      process.execPath,
      ["--input-type=module", "--eval", source],
      {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, NODE_ENV: nodeEnv },
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    const development = buildFor("development");
    const production = buildFor("production");
    expect(development.status).toBe(0);
    expect(production.status).toBe(0);
    expect(production.stdout).toBe(development.stdout);
  }, 60_000);

  test("keeps source and public generated styles identical", () => {
    expect(readFileSync(resolve("vanilla/core/styles.js")))
      .toEqual(readFileSync(resolve("public/vanilla/core/styles.js")));
  });
});
