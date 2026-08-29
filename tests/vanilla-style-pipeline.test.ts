import { spawnSync } from "node:child_process";
import {
  existsSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, test } from "vitest";
import {
  buildStyleModule,
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
