import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import registry from "../registry.json";
import {
  buildBaseMatrix,
  buildCaseInventory,
  compareImages,
  defaultComponentIds,
  exitCodeForReport,
  parseRunnerArgs,
  runVisualParity,
  VISUAL_ARTIFACT_DIRECTORY,
  writeVisualReports,
} from "../scripts/visual-parity.mjs";
import { runPagesSmoke } from "../scripts/pages-smoke.mjs";
import { startStaticServer } from "../scripts/serve-static.mjs";
import { CASES, DEFAULT_CASE } from "./visual/cases.mjs";

const temporaryPaths: string[] = [];

afterEach(() => {
  for (const path of temporaryPaths.splice(0)) {
    rmSync(path, { force: true, recursive: true });
  }
});

function temporaryDirectory(prefix: string) {
  const path = mkdtempSync(join(tmpdir(), prefix));
  temporaryPaths.push(path);
  return path;
}

function rgbaImage(
  width: number,
  height: number,
  pixels: Array<[number, number, number, number]>,
) {
  return {
    width,
    height,
    data: new Uint8ClampedArray(pixels.flat()),
  };
}

const WHITE: [number, number, number, number] = [255, 255, 255, 255];
const BLACK: [number, number, number, number] = [0, 0, 0, 255];

describe("strict image comparison", () => {
  test("reports zero mismatches for identical RGBA images", () => {
    const image = rgbaImage(1, 1, [WHITE]);

    expect(compareImages(image, image)).toMatchObject({
      ok: true,
      mismatched: 0,
      sizeMismatch: false,
    });
  });

  test("reports one mismatch when exactly one pixel changes", () => {
    const left = rgbaImage(1, 1, [WHITE]);
    const right = rgbaImage(1, 1, [BLACK]);

    expect(compareImages(left, right)).toMatchObject({
      ok: false,
      mismatched: 1,
      sizeMismatch: false,
    });
  });

  test("fails comparison when either screenshot is missing", () => {
    const image = rgbaImage(1, 1, [WHITE]);

    expect(compareImages(undefined, image)).toMatchObject({
      ok: false,
      error: "Missing React screenshot",
    });
    expect(compareImages(image, undefined)).toMatchObject({
      ok: false,
      error: "Missing Vanilla screenshot",
    });
  });

  test("fails comparison before diffing unequal image dimensions", () => {
    const left = rgbaImage(1, 1, [WHITE]);
    const right = rgbaImage(2, 1, [WHITE, WHITE]);

    expect(compareImages(left, right)).toMatchObject({
      ok: false,
      mismatched: null,
      sizeMismatch: true,
      dimensions: "1x1 vs 2x1",
    });
  });
});

describe("registry-derived visual case inventory", () => {
  test("uses every sorted registry item as the default component list", () => {
    const expected = registry.items.map((item) => item.name).sort();

    expect(defaultComponentIds).toEqual(expected);
    expect(defaultComponentIds).toHaveLength(48);
  });

  test("builds 48 light/dark and en/zh pairs before state expansion", () => {
    const matrix = buildBaseMatrix({
      componentIds: defaultComponentIds,
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });

    expect(matrix).toHaveLength(48 * 2 * 2);
  });

  test("defines deterministic initial and settled cases for Code Block", () => {
    expect(DEFAULT_CASE).toEqual({ name: "settled", advanceMs: 2600 });
    expect(CASES.get("code-block")).toEqual([
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 2600 },
    ]);

    const inventory = buildCaseInventory({
      componentIds: ["code-block"],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(8);
    expect(new Set(inventory.map((item) => item.caseName))).toEqual(
      new Set(["initial", "settled"]),
    );
  });
});

describe("visual runner CLI and reports", () => {
  test("writes ignored artifacts under .artifacts/visual-parity", () => {
    expect(basename(dirname(VISUAL_ARTIFACT_DIRECTORY))).toBe(".artifacts");
    expect(basename(VISUAL_ARTIFACT_DIRECTORY)).toBe("visual-parity");
  });

  test("parses component, theme, locale, and external base URL filters", () => {
    expect(
      parseRunnerArgs([
        "--components",
        "code-block,loading-state",
        "--themes=dark",
        "--locales",
        "zh",
        "--base-url",
        "https://example.test/native-ai-ui/",
        "--react-only",
      ]),
    ).toEqual({
      baseUrl: "https://example.test/native-ai-ui",
      componentIds: ["code-block", "loading-state"],
      locales: ["zh"],
      reactOnly: true,
      themes: ["dark"],
    });
  });

  test("rejects unknown component filters", () => {
    expect(() => parseRunnerArgs(["--components", "not-in-registry"])).toThrow(
      "Unknown component: not-in-registry",
    );
  });

  test("writes JSON and HTML reports and returns nonzero for failures", () => {
    const artifactDir = temporaryDirectory("native-ai-ui-visual-report-");
    const report = {
      baseUrl: "http://127.0.0.1/native-ai-ui",
      fatalError: null,
      generatedAt: "2026-08-29T00:00:00.000Z",
      mode: "parity",
      results: [
        {
          caseName: "settled",
          component: "code-block",
          error: "1 mismatched pixel",
          locale: "en",
          mismatched: 1,
          ok: false,
          theme: "light",
        },
      ],
      summary: { failed: 1, passed: 0, total: 1 },
    };

    writeVisualReports(artifactDir, report);

    expect(exitCodeForReport(report)).toBe(1);
    expect(JSON.parse(readFileSync(join(artifactDir, "report.json"), "utf8"))).toEqual(
      report,
    );
    expect(readFileSync(join(artifactDir, "report.html"), "utf8")).toContain(
      "code-block",
    );
  });
});

function visualRuntimeFixture({
  brokenImage = false,
  consoleError = false,
}: {
  brokenImage?: boolean;
  consoleError?: boolean;
} = {}) {
  const root = temporaryDirectory("native-ai-ui-runtime-page-");
  writeFileSync(
    join(root, "index.html"),
    `<!doctype html>
<html lang="en">
<body>
  <aside><button type="button">EN</button></aside>
  <div id="loading-state">ready</div>
  <section id="demo">
    <button type="button" data-framework="react" aria-pressed="false">React</button>
    <button type="button" data-framework="vanilla" aria-pressed="true">Vanilla</button>
    <div class="rounded-card" style="width:160px;height:80px;background:white">
      <div><nai-demo></nai-demo></div>
    </div>
  </section>
  <script>
    customElements.define("nai-demo", class extends HTMLElement {
      constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.innerHTML = "<style>:host{display:block}</style><div>demo</div>";
      }
    });
    const section = document.getElementById("demo");
    const viewport = section.querySelector(".rounded-card > div");
    for (const button of section.querySelectorAll("[data-framework]")) {
      button.addEventListener("click", () => {
        const framework = button.dataset.framework;
        for (const candidate of section.querySelectorAll("[data-framework]")) {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        }
        if (framework === "react") {
          const content = Object.assign(document.createElement("div"), { textContent: "demo" });
          ${brokenImage ? 'content.appendChild(Object.assign(document.createElement("img"), { src: "/missing.png", alt: "missing" }));' : ""}
          viewport.replaceChildren(content);
        } else {
          viewport.replaceChildren(document.createElement("nai-demo"));
        }
      });
    }
    ${consoleError ? 'console.error("visual boom");' : ""}
  </script>
</body>
</html>`,
  );
  return root;
}

describe("browser visual environment", () => {
  test("initializes locale and theme before app code without dereferencing a missing document root", async () => {
    const root = temporaryDirectory("native-ai-ui-visual-page-");
    const artifactDir = temporaryDirectory("native-ai-ui-visual-artifacts-");
    writeFileSync(
      join(root, "index.html"),
      `<!doctype html>
<html lang="en">
<body>
  <aside><button type="button">EN</button></aside>
  <div id="loading-state">ready</div>
  <section id="demo">
    <button type="button" data-framework="react" aria-pressed="false">React</button>
    <button type="button" data-framework="vanilla" aria-pressed="true">Vanilla</button>
    <div class="rounded-card" style="width:160px;height:80px;background:white">
      <div><nai-demo></nai-demo></div>
    </div>
  </section>
  <script>
    customElements.define("nai-demo", class extends HTMLElement {
      constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.innerHTML = "<style>:host{display:block}</style><div>demo</div>";
      }
    });
    const section = document.getElementById("demo");
    const viewport = section.querySelector(".rounded-card > div");
    for (const button of section.querySelectorAll("[data-framework]")) {
      button.addEventListener("click", () => {
        const framework = button.dataset.framework;
        for (const candidate of section.querySelectorAll("[data-framework]")) {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        }
        viewport.replaceChildren(
          framework === "react"
            ? Object.assign(document.createElement("div"), { textContent: "demo" })
            : document.createElement("nai-demo"),
        );
      });
    }
  </script>
</body>
</html>`,
    );
    const running = await startStaticServer({ root, port: 0 });

    try {
      const report = await runVisualParity({
        artifactDir,
        baseUrl: running.baseUrl,
        componentIds: ["demo"],
        locales: ["en"],
        reactOnly: true,
        themes: ["dark"],
        log: () => {},
      });

      expect(report.fatalError).toBeNull();
      expect(report.results[0]?.error).toBeNull();
      expect(report.summary).toEqual({ failed: 0, passed: 1, total: 1 });
      expect(report.results[0]).toMatchObject({ ok: true, component: "demo" });
    } finally {
      await running.close();
    }
  }, 60_000);

  test("fails a capture when the page emits console errors", async () => {
    const root = visualRuntimeFixture({ consoleError: true });
    const artifactDir = temporaryDirectory("native-ai-ui-console-artifacts-");
    const running = await startStaticServer({ root, port: 0 });

    try {
      const report = await runVisualParity({
        artifactDir,
        baseUrl: running.baseUrl,
        componentIds: ["demo"],
        locales: ["en"],
        reactOnly: true,
        themes: ["light"],
        log: () => {},
      });

      expect(report.summary).toEqual({ failed: 1, passed: 0, total: 1 });
      expect(report.results[0]?.error).toContain("console.error: visual boom");
    } finally {
      await running.close();
    }
  }, 30_000);

  test("fails a capture when an image never loads", async () => {
    const root = visualRuntimeFixture({ brokenImage: true });
    const artifactDir = temporaryDirectory("native-ai-ui-image-artifacts-");
    const running = await startStaticServer({ root, port: 0 });

    try {
      const report = await runVisualParity({
        artifactDir,
        baseUrl: running.baseUrl,
        componentIds: ["demo"],
        locales: ["en"],
        reactOnly: true,
        themes: ["light"],
        log: () => {},
      });

      expect(report.summary).toEqual({ failed: 1, passed: 0, total: 1 });
      expect(report.results[0]?.error).toContain("Image failed to load: /missing.png");
    } finally {
      await running.close();
    }
  }, 30_000);
});

describe("base-path static server", () => {
  test("serves trailing-slash HTML and required MIME types without traversal", async () => {
    const fixtureRoot = temporaryDirectory("native-ai-ui-static-root-");
    const outsidePath = join(dirname(fixtureRoot), `${basename(fixtureRoot)}-secret.txt`);
    temporaryPaths.push(outsidePath);
    mkdirSync(join(fixtureRoot, "nested"), { recursive: true });
    writeFileSync(join(fixtureRoot, "index.html"), "<h1>root</h1>");
    writeFileSync(join(fixtureRoot, "nested", "index.html"), "<h1>nested</h1>");
    writeFileSync(join(fixtureRoot, "app.js"), "export default 1;\n");
    writeFileSync(join(fixtureRoot, "tokens.css"), ":root{}\n");
    writeFileSync(outsidePath, "secret\n");

    const running = await startStaticServer({
      basePath: "/native-ai-ui",
      port: 0,
      root: fixtureRoot,
    });

    try {
      const rootResponse = await fetch(`${running.baseUrl}/native-ai-ui/`);
      expect(rootResponse.status).toBe(200);
      expect(rootResponse.headers.get("content-type")).toContain("text/html");
      expect(await rootResponse.text()).toContain("root");

      const nestedResponse = await fetch(`${running.baseUrl}/native-ai-ui/nested/`);
      expect(nestedResponse.status).toBe(200);
      expect(await nestedResponse.text()).toContain("nested");

      const scriptResponse = await fetch(`${running.baseUrl}/native-ai-ui/app.js`);
      expect(scriptResponse.status).toBe(200);
      expect(scriptResponse.headers.get("content-type")).toContain(
        "text/javascript",
      );

      const cssResponse = await fetch(`${running.baseUrl}/native-ai-ui/tokens.css`);
      expect(cssResponse.status).toBe(200);
      expect(cssResponse.headers.get("content-type")).toContain("text/css");

      const traversalResponse = await fetch(
        `${running.baseUrl}/native-ai-ui/%2e%2e/${basename(outsidePath)}`,
      );
      expect(traversalResponse.status).toBe(404);
      expect(existsSync(outsidePath)).toBe(true);

      const outsideBasePath = await fetch(`${running.baseUrl}/`);
      expect(outsideBasePath.status).toBe(404);
    } finally {
      await running.close();
    }
  });
});

describe("Pages smoke", () => {
  function pagesFixture() {
    const root = temporaryDirectory("native-ai-ui-pages-smoke-");
    for (const directory of ["_next", "r", "vanilla"]) {
      mkdirSync(join(root, directory), { recursive: true });
    }
    writeFileSync(
      join(root, "index.html"),
      '<!doctype html><link rel="stylesheet" href="/native-ai-ui/_next/app.css"><script src="/native-ai-ui/_next/app.js"></script>',
    );
    writeFileSync(join(root, "_next", "app.css"), ":root{}\n");
    writeFileSync(join(root, "_next", "app.js"), "export {};\n");
    writeFileSync(join(root, "vanilla", "index.js"), "export {};\n");
    writeFileSync(join(root, "vanilla", "tokens.css"), ":root{}\n");
    writeFileSync(join(root, "r", "registry.json"), '{"items":[]}\n');
    writeFileSync(join(root, "r", "demo.json"), '{"name":"demo"}\n');
    return root;
  }

  test("checks the homepage, package files, every registry item, and Next assets", async () => {
    const root = pagesFixture();

    const result = await runPagesSmoke({
      basePath: "/native-ai-ui",
      componentIds: ["demo"],
      root,
    });

    expect(result.ok).toBe(true);
    expect(result.checked).toEqual(
      expect.arrayContaining([
        "/native-ai-ui/",
        "/native-ai-ui/_next/app.css",
        "/native-ai-ui/_next/app.js",
        "/native-ai-ui/vanilla/index.js",
        "/native-ai-ui/vanilla/tokens.css",
        "/native-ai-ui/r/registry.json",
        "/native-ai-ui/r/demo.json",
      ]),
    );
  });

  test("fails when a homepage Next asset is missing", async () => {
    const root = pagesFixture();
    rmSync(join(root, "_next", "app.js"));

    await expect(
      runPagesSmoke({
        basePath: "/native-ai-ui",
        componentIds: ["demo"],
        root,
      }),
    ).rejects.toThrow("/native-ai-ui/_next/app.js returned 404");
  });
});
