import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, test, vi } from "vitest";
import registry from "../registry.json";
import {
  buildBaseMatrix,
  buildCaseInventory,
  compareImages,
  exitCodeForReport,
  getDefaultComponentIds,
  parseRunnerArgs,
  runVisualParity,
  VISUAL_ARTIFACT_DIRECTORY,
  writeVisualReports,
} from "../scripts/visual-parity.mjs";
import { runPagesSmoke } from "../scripts/pages-smoke.mjs";
import { main as runVisualCommand } from "../scripts/run-visual-parity.mjs";
import { startStaticServer } from "../scripts/serve-static.mjs";
import { CASES, DEFAULT_CASE } from "./visual/cases.mjs";

const require = createRequire(pathToFileURL(resolve("package.json")));
const yaml = require("js-yaml");
const mutableCases = CASES as Map<
  string,
  Array<{
    action?: (args: any) => unknown;
    advanceMs: number;
    name: string;
  }>
>;
const temporaryPaths: string[] = [];

afterEach(() => {
  for (const component of ["demo", "alpha", "beta"]) {
    mutableCases.delete(component);
  }
  for (const path of temporaryPaths.splice(0)) {
    rmSync(path, { force: true, recursive: true });
  }
});

function temporaryDirectory(prefix: string) {
  const path = mkdtempSync(join(tmpdir(), prefix));
  temporaryPaths.push(path);
  return path;
}

function markedSource(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start < 0 || end <= start) return "";
  return source.slice(start, end + endMarker.length);
}

function task4VisualGuardViolations(source: string) {
  const actionSource = markedSource(
    source,
    "/* TASK 4 VISUAL ACTIONS START */",
    "/* TASK 4 VISUAL ACTIONS END */",
  );
  const registrationSource = markedSource(
    source,
    "/* TASK 4 VISUAL REGISTRATIONS START */",
    "/* TASK 4 VISUAL REGISTRATIONS END */",
  );
  const setupSource = markedSource(
    actionSource,
    "/* TASK 4 CLIPBOARD PAGE EVALUATE SETUP START */",
    "/* TASK 4 CLIPBOARD PAGE EVALUATE SETUP END */",
  );
  const restoreSource = markedSource(
    actionSource,
    "/* TASK 4 CLIPBOARD PAGE EVALUATE RESTORE START */",
    "/* TASK 4 CLIPBOARD PAGE EVALUATE RESTORE END */",
  );
  const violations = new Set<string>();

  if (!actionSource) violations.add("missing action guard markers");
  if (!registrationSource) violations.add("missing registration guard markers");

  const guardedSource = `${actionSource}\n${registrationSource}`;
  const forbidden = [
    ["DOM rewrite", /(?:\b(?:innerHTML|outerHTML|textContent|innerText)\b\s*=|\.insertAdjacentHTML\s*\()/],
    ["node replacement", /\.(?:replaceChildren|replaceChild|replaceWith|remove|removeChild|append|appendChild|prepend|before|after|insertBefore|insertAdjacentElement)\s*\(/],
    ["DOM construction", /\bdocument\s*\.\s*(?:createElement|createDocumentFragment)\s*\(/],
    ["style or hiding mutation", /(?:\.style\b|\.classList\b|\bclassName\s*=|setProperty\s*\(|setAttribute\s*\(\s*["'](?:style|hidden|aria-hidden)["']|\.hidden\s*=|\b(?:display|visibility|opacity)\s*:)/],
    ["canonical replacement helper", /replaceWithCanonicalCard|canonicalize/],
    ["stabilization helper", /stabilize[A-Z]|freezeCaseMotion/],
  ] as const;
  for (const [label, pattern] of forbidden) {
    if (pattern.test(guardedSource)) violations.add(label);
  }

  const canvasEvaluation = /\bcanvas\s*(?:\.\s*(?:evaluate|evaluateHandle)|\[\s*["'](?:evaluate|evaluateHandle)["']\s*\])\s*\(/;
  if (canvasEvaluation.test(guardedSource)) {
    violations.add("canvas evaluation");
  }

  const pageEvaluation = /\bpage\s*(?:\.\s*(?:evaluate|evaluateHandle)|\[\s*["'](?:evaluate|evaluateHandle)["']\s*\])\s*\(/g;
  const actionWithoutClipboardBoundary = actionSource
    .replace(setupSource, "")
    .replace(restoreSource, "");
  if (
    pageEvaluation.test(`${actionWithoutClipboardBoundary}\n${registrationSource}`)
  ) {
    violations.add("page evaluation boundary");
  }

  if (/copy-error|failFeedbackCopy/.test(guardedSource)) {
    const setupEvaluations = setupSource.match(pageEvaluation)?.length ?? 0;
    const restoreEvaluations = restoreSource.match(pageEvaluation)?.length ?? 0;
    if (setupEvaluations !== 1 || restoreEvaluations !== 1) {
      violations.add("page evaluation boundary");
    }

    const setupRequirements = [
      /Object\.getOwnPropertyDescriptor\(navigator,\s*["']clipboard["']\)/,
      /Object\.getOwnPropertyDescriptor\(document,\s*["']execCommand["']\)/,
      /Object\.defineProperty\(navigator,\s*["']clipboard["']/,
      /Object\.defineProperty\(document,\s*["']execCommand["']/,
    ];
    const restoreRequirements = [
      /Object\.defineProperty\(navigator,\s*["']clipboard["']/,
      /Object\.defineProperty\(document,\s*["']execCommand["']/,
      /Reflect\.deleteProperty\(navigator,\s*["']clipboard["']\)/,
      /Reflect\.deleteProperty\(document,\s*["']execCommand["']\)/,
    ];
    if (
      setupRequirements.some((pattern) => !pattern.test(setupSource)) ||
      restoreRequirements.some((pattern) => !pattern.test(restoreSource))
    ) {
      violations.add("clipboard evaluate validation");
    }
  }

  return [...violations];
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
    const defaultComponentIds = getDefaultComponentIds();

    expect(defaultComponentIds).toEqual(expected);
    expect(defaultComponentIds).toHaveLength(48);
  });

  test("builds 48 light/dark and en/zh pairs before state expansion", () => {
    const matrix = buildBaseMatrix({
      componentIds: getDefaultComponentIds(),
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });

    expect(matrix).toHaveLength(48 * 2 * 2);
  });

  test("defines representative behavior cases for the four interactive controls", () => {
    expect(CASES.get("session-list")?.map(({ name }) => name)).toEqual([
      "settled",
      "selected",
    ]);
    expect(CASES.get("authorization-surface")?.map(({ name }) => name)).toEqual([
      "settled",
      "provider-switched",
    ]);
    expect(CASES.get("settings-editor")?.map(({ name }) => name)).toEqual([
      "settled",
      "conflict",
      "refetched",
    ]);
    expect(CASES.get("feedback-actions")?.map(({ name }) => name)).toEqual([
      "settled",
      "liked",
      "disliked",
      "copy-error",
    ]);
  });

  test("keeps Task 4 visual actions and registrations on the rendered component DOM", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    expect(task4VisualGuardViolations(source)).toEqual([]);
  });

  test.each([
    [
      "registration evaluate bypass",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected() {}
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: ({ canvas }) => canvas.evaluate(() => {}) }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "canvas evaluation",
    ],
    [
      "canvas evaluate bypass",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected({ canvas }) { await canvas.evaluate(() => {}); }
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: selected }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "canvas evaluation",
    ],
    [
      "textContent rewrite",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected({ root }) { root.textContent = "fabricated"; }
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: selected }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "DOM rewrite",
    ],
    [
      "outerHTML rewrite",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected({ root }) { root.outerHTML = "<div>fabricated</div>"; }
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: selected }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "DOM rewrite",
    ],
    [
      "replaceChild bypass",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected({ root }) { root.replaceChild(next, current); }
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: selected }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "node replacement",
    ],
    [
      "unauthorized page evaluate",
      `/* TASK 4 VISUAL ACTIONS START */
      async function selected({ page }) { await page.evaluate(() => document.body.remove()); }
      /* TASK 4 VISUAL ACTIONS END */
      /* TASK 4 VISUAL REGISTRATIONS START */
      ["session-list", [{ action: selected }]]
      /* TASK 4 VISUAL REGISTRATIONS END */`,
      "page evaluation boundary",
    ],
  ])("rejects the Task 4 %s", (_label, source, violation) => {
    expect(task4VisualGuardViolations(source)).toContain(violation);
  });

  test("restores clipboard globals after the copy-error visual action", async () => {
    const action = CASES.get("feedback-actions")?.find(
      ({ name }) => name === "copy-error",
    )?.action;
    expect(typeof action).toBe("function");

    const clipboardDescriptor = Object.getOwnPropertyDescriptor(
      navigator,
      "clipboard",
    );
    const execCommandDescriptor = Object.getOwnPropertyDescriptor(
      document,
      "execCommand",
    );
    const originalWriteText = vi.fn().mockResolvedValue(undefined);
    const originalExecCommand = vi.fn(() => true);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: originalWriteText },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: originalExecCommand,
    });

    let failed = false;
    const page = {
      evaluate: async (callback: () => unknown) => callback(),
    };
    const canvas = {
      getByRole: () => ({
        click: async () => {
          let copied = false;
          try {
            await navigator.clipboard.writeText("during visual action");
            copied = true;
          } catch {
            copied = document.execCommand("copy") === true;
          }
          failed = !copied;
        },
      }),
      getByText: () => ({
        waitFor: async () => expect(failed).toBe(true),
      }),
    };

    try {
      await action?.({ advance: async () => {}, canvas, page });

      expect(navigator.clipboard.writeText).toBe(originalWriteText);
      expect(document.execCommand).toBe(originalExecCommand);
      await navigator.clipboard.writeText("after visual action");
      expect(document.execCommand("copy")).toBe(true);
      expect(originalWriteText).toHaveBeenCalledWith("after visual action");
      expect(originalExecCommand).toHaveBeenCalledWith("copy");
    } finally {
      if (clipboardDescriptor) {
        Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
      } else {
        Reflect.deleteProperty(navigator, "clipboard");
      }
      if (execCommandDescriptor) {
        Object.defineProperty(document, "execCommand", execCommandDescriptor);
      } else {
        Reflect.deleteProperty(document, "execCommand");
      }
    }
  });

  test("restores exact clipboard globals after partial copy-error setup failure", async () => {
    const action = CASES.get("feedback-actions")?.find(
      ({ name }) => name === "copy-error",
    )?.action;
    expect(typeof action).toBe("function");

    const clipboardDescriptor = Object.getOwnPropertyDescriptor(
      navigator,
      "clipboard",
    );
    const execCommandDescriptor = Object.getOwnPropertyDescriptor(
      document,
      "execCommand",
    );
    const originalWriteText = vi.fn().mockResolvedValue(undefined);
    const originalExecCommand = vi.fn(() => true);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: originalWriteText },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: originalExecCommand,
    });
    const expectedClipboard = Object.getOwnPropertyDescriptor(
      navigator,
      "clipboard",
    );
    const expectedExecCommand = Object.getOwnPropertyDescriptor(
      document,
      "execCommand",
    );

    let evaluateCalls = 0;
    const page = {
      evaluate: async (callback: () => unknown) => {
        evaluateCalls += 1;
        if (evaluateCalls !== 1) return callback();

        const originalDefineProperty = Object.defineProperty;
        const defineProperty = vi
          .spyOn(Object, "defineProperty")
          .mockImplementation((target, property, attributes) => {
            if (target === document && property === "execCommand") {
              throw new Error("execCommand mock install failed");
            }
            return originalDefineProperty(target, property, attributes);
          });
        try {
          return callback();
        } finally {
          defineProperty.mockRestore();
        }
      },
    };
    const canvas = {
      getByRole: vi.fn(() => {
        throw new Error("copy click must not run after setup failure");
      }),
      getByText: vi.fn(),
    };

    try {
      await expect(
        action?.({ advance: async () => {}, canvas, page }),
      ).rejects.toThrow("execCommand mock install failed");

      expect(evaluateCalls).toBe(2);
      expect(Object.getOwnPropertyDescriptor(navigator, "clipboard")).toEqual(
        expectedClipboard,
      );
      expect(Object.getOwnPropertyDescriptor(document, "execCommand")).toEqual(
        expectedExecCommand,
      );
      expect(navigator.clipboard.writeText).toBe(originalWriteText);
      expect(document.execCommand).toBe(originalExecCommand);
    } finally {
      Reflect.deleteProperty(globalThis, "__naiTask4FeedbackCopyGlobals");
      if (clipboardDescriptor) {
        Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
      } else {
        Reflect.deleteProperty(navigator, "clipboard");
      }
      if (execCommandDescriptor) {
        Object.defineProperty(document, "execCommand", execCommandDescriptor);
      } else {
        Reflect.deleteProperty(document, "execCommand");
      }
    }
  });

  test("defines deterministic Task 5A Core states", () => {
    expect(CASES.get("thinking")?.map(({ name, advanceMs }) => ({
      advanceMs,
      name,
    }))).toEqual([
      { name: "settled", advanceMs: 6000 },
      { name: "expanded", advanceMs: 6000 },
    ]);
    expect(CASES.get("streaming-text")?.map(({ name, advanceMs }) => ({
      advanceMs,
      name,
    }))).toEqual([
      { name: "settled", advanceMs: 0 },
      { name: "sources-open", advanceMs: 0 },
    ]);
    expect(CASES.get("prompt-bar")?.map(({ name, advanceMs }) => ({
      advanceMs,
      name,
    }))).toEqual([
      { name: "ready", advanceMs: 0 },
      { name: "submitted", advanceMs: 0 },
    ]);
  });

  test("keeps Task 5A visual actions and registrations on real UI", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const marked = (startMarker: string, endMarker: string) => {
      const start = source.indexOf(startMarker);
      const end = source.indexOf(endMarker, start);
      if (start < 0 || end <= start) return "";
      return source.slice(start, end + endMarker.length);
    };
    const actions = marked(
      "/* TASK 5A VISUAL ACTIONS START */",
      "/* TASK 5A VISUAL ACTIONS END */",
    );
    const registrations = marked(
      "/* TASK 5A VISUAL REGISTRATIONS START */",
      "/* TASK 5A VISUAL REGISTRATIONS END */",
    );

    expect(actions).not.toBe("");
    expect(registrations).not.toBe("");

    const guarded = `${actions}\n${registrations}`;
    const forbidden = [
      ["DOM evaluation", /\.(?:evaluate|evaluateHandle)\s*\(/],
      ["DOM rewrite", /\b(?:innerHTML|outerHTML|textContent|innerText)\b\s*=/],
      ["node replacement", /\.(?:replaceChildren|replaceChild|replaceWith|remove|removeChild|append|appendChild|prepend|before|after)\s*\(/],
      ["style mutation", /(?:\.style\b|\.classList\b|setProperty\s*\()/],
      ["stabilization helper", /stabilize[A-Z]|freezeCaseMotion|canonicalize/],
    ] as const;

    expect(
      forbidden
        .filter(([, pattern]) => pattern.test(guarded))
        .map(([label]) => label),
    ).toEqual([]);
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
      baseUrl: "https://example.test/native-ai-ui/",
      componentIds: ["code-block", "loading-state"],
      locales: ["zh"],
      reactOnly: true,
      themes: ["dark"],
    });
  });

  test.each([
    ["root", "https://example.test/", "https://example.test/"],
    [
      "nested path",
      "https://example.test/preview///",
      "https://example.test/preview/",
    ],
  ])("preserves the meaningful trailing slash for a %s base", (_label, input, expected) => {
    expect(parseRunnerArgs(["--base-url", input]).baseUrl).toBe(expected);
  });

  test("rejects unknown component filters", () => {
    expect(() => parseRunnerArgs(["--components", "not-in-registry"])).toThrow(
      "Unknown component: not-in-registry",
    );
  });

  test("writes fatal reports when the selected registry is malformed", async () => {
    const root = temporaryDirectory("native-ai-ui-malformed-registry-root-");
    const artifactDir = temporaryDirectory("native-ai-ui-malformed-registry-artifacts-");
    const registryPath = join(root, "registry.json");
    writeFileSync(registryPath, "{not-json\n");

    const exitCode = await runVisualCommand(["--components", "demo"], {
      artifactDir,
      outputRoot: root,
      port: 0,
      registryPath,
    });

    expect(exitCode).toBe(1);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.fatalError).toContain("registry.json");
    expect(existsSync(join(artifactDir, "report.html"))).toBe(true);
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

describe("deployment visual gates", () => {
  test("smokes Pages before parity and uploads hidden reports on failure", () => {
    const workflow = yaml.load(
      readFileSync(resolve(".github/workflows/deploy.yml"), "utf8"),
    );
    const steps = workflow.jobs.deploy.steps as Array<{
      if?: string;
      run?: string;
      uses?: string;
      with?: Record<string, unknown>;
    }>;
    const smokeIndex = steps.findIndex(
      (step) => step.run === "npm run pages:smoke",
    );
    const parityIndex = steps.findIndex(
      (step) => step.run === "npm run visual:parity",
    );
    const upload = steps.find(
      (step) => step.uses === "actions/upload-artifact@v4",
    );

    expect(smokeIndex).toBeGreaterThan(-1);
    expect(parityIndex).toBeGreaterThan(smokeIndex);
    expect(upload).toMatchObject({
      if: "failure()",
      with: {
        "if-no-files-found": "error",
        "include-hidden-files": true,
        path: ".artifacts/visual-parity",
      },
    });
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

function parityCommandFixture({
  chainedTimer = false,
  detectCoordinateRewrite = false,
  reactOffset = 0,
  stalledImage = false,
  vanillaOffset = reactOffset,
  vanillaThrows = false,
}: {
  chainedTimer?: boolean;
  detectCoordinateRewrite?: boolean;
  reactOffset?: number;
  stalledImage?: boolean;
  vanillaOffset?: number;
  vanillaThrows?: boolean;
} = {}) {
  const root = temporaryDirectory("native-ai-ui-parity-command-");
  const registryPath = join(root, "registry.json");
  writeFileSync(registryPath, JSON.stringify({ items: [{ name: "demo" }] }));
  writeFileSync(
    join(root, "index.html"),
    `<!doctype html>
<html lang="en">
<head>
<style>
  html,body{margin:0;background:#fff;color:#111;font-family:monospace}
  .rounded-card{width:240px;height:120px;display:flex;align-items:center;background:#fff}
  .viewport{width:100%;height:100%;display:flex;align-items:center}
  .visual-box{position:relative;width:32px;height:32px;background:#2463eb}
</style>
</head>
<body>
  <aside><button type="button">EN</button></aside>
  <input aria-label="Search components" value="">
  <div id="loading-state">ready</div>
  <main>
    <section id="demo">
      <button type="button" data-framework="react" aria-pressed="true">React</button>
      <button type="button" data-framework="vanilla" aria-pressed="false">Vanilla</button>
      <div class="rounded-card"><div class="viewport"></div></div>
    </section>
  </main>
  <script>
    let reactMounts = 0;
    const contextColor = () =>
      localStorage.getItem("visual-pair-context") === "ready"
        ? "#2463eb"
        : "#dc2626";
    const main = document.querySelector("main");
    const section = document.getElementById("demo");
    const viewport = section.querySelector(".viewport");
    const chainedTimer = ${JSON.stringify(chainedTimer)};
    const reactOffset = ${JSON.stringify(reactOffset)};
    const stalledImage = ${JSON.stringify(stalledImage)};
    const vanillaOffset = ${JSON.stringify(vanillaOffset)};
    ${detectCoordinateRewrite ? `new MutationObserver(() => {
      if (viewport.style.transform) {
        console.error("capture rewrote internal canvas coordinates");
      }
    }).observe(viewport, { attributes: true, attributeFilter: ["style"] });` : ""}

    customElements.define("nai-demo", class extends HTMLElement {
      constructor() {
        super();
        ${vanillaThrows ? 'throw new Error("Vanilla lifecycle exploded");' : ""}
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = '<style>.visual-box{width:32px;height:32px;background:#2463eb}</style><div class="visual-box"></div>';
      }
      connectedCallback() {
        this.style.cssText = "display:block;position:relative;left:" + vanillaOffset + "px;width:32px;height:32px";
        this.shadowRoot.querySelector(".visual-box").style.background = contextColor();
      }
    });

    function selectFramework(framework) {
      for (const button of section.querySelectorAll("[data-framework]")) {
        button.setAttribute("aria-pressed", String(button.dataset.framework === framework));
      }
      if (framework === "react") {
        reactMounts += 1;
        if (reactMounts >= 2) {
          localStorage.setItem("visual-pair-context", "ready");
        }
        const content = document.createElement("div");
        content.className = "visual-box";
        content.style.left = reactOffset + "px";
        content.style.background = contextColor();
        if (chainedTimer) {
          content.textContent = "initial";
          const observer = new MutationObserver(() => {
            if (content.textContent !== "first") return;
            observer.disconnect();
            setTimeout(() => { content.textContent = "second"; }, 0);
          });
          observer.observe(content, { childList: true });
          setTimeout(() => { content.textContent = "first"; }, 2600);
        }
        if (stalledImage) {
          const image = document.createElement("img");
          image.alt = "stalled";
          Object.defineProperty(image, "complete", { get: () => false });
          Object.defineProperty(image, "naturalWidth", { get: () => 0 });
          content.appendChild(image);
        }
        viewport.replaceChildren(content);
      } else {
        viewport.replaceChildren(document.createElement("nai-demo"));
      }
    }

    for (const button of section.querySelectorAll("[data-framework]")) {
      button.addEventListener("click", () => selectFramework(button.dataset.framework));
    }
    document.querySelector('[aria-label="Search components"]').addEventListener("input", (event) => {
      if (event.target.value === "__nai_visual_remount__") {
        section.remove();
      } else if (!section.isConnected) {
        main.appendChild(section);
        const selected = section.querySelector('[aria-pressed="true"]').dataset.framework;
        selectFramework(selected);
      }
    });
    selectFramework("react");
  </script>
</body>
</html>`,
  );
  return { registryPath, root };
}

function reactOnlyMultiComponentFixture() {
  const componentIds = ["alpha", "beta"];
  const root = temporaryDirectory("native-ai-ui-react-only-multi-");
  const registryPath = join(root, "registry.json");
  writeFileSync(
    registryPath,
    JSON.stringify({ items: componentIds.map((name) => ({ name })) }),
  );
  const sections = componentIds
    .map(
      (id) => `
      <section id="${id}">
        <button type="button" data-framework="react" aria-pressed="true">React</button>
        <button type="button" data-framework="vanilla" aria-pressed="false">Vanilla</button>
        <div class="rounded-card"><div class="viewport"></div></div>
      </section>`,
    )
    .join("");
  const definitions = componentIds
    .map(
      (id) => `
      customElements.define("nai-${id}", class extends HTMLElement {
        constructor() {
          super();
          throw new Error("Vanilla ${id} must not mount");
        }
      });`,
    )
    .join("");
  writeFileSync(
    join(root, "index.html"),
    `<!doctype html>
<html lang="en">
<head>
<style>
  html,body{margin:0;background:#fff;color:#111;font-family:monospace}
  main{display:flex;flex-direction:column;gap:16px}
  .rounded-card{width:240px;height:120px;display:flex;align-items:center;background:#fff}
  .viewport{width:100%;height:100%;display:flex;align-items:center}
  .visual-box{width:32px;height:32px;background:#2463eb}
</style>
</head>
<body>
  <aside><button type="button">EN</button></aside>
  <input aria-label="Search components" value="">
  <div id="loading-state">ready</div>
  <main>${sections}</main>
  <script>
    const ids = ${JSON.stringify(componentIds)};
    const main = document.querySelector("main");
    const sectionById = new Map(
      ids.map((id) => [id, document.getElementById(id)]),
    );
    ${definitions}

    function selectFramework(id, framework) {
      const section = sectionById.get(id);
      for (const button of section.querySelectorAll("[data-framework]")) {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.framework === framework),
        );
      }
      const viewport = section.querySelector(".viewport");
      if (framework === "react") {
        const content = document.createElement("div");
        content.className = "visual-box";
        content.dataset.component = id;
        viewport.replaceChildren(content);
      } else {
        viewport.replaceChildren(document.createElement("nai-" + id));
      }
    }

    for (const id of ids) {
      const section = sectionById.get(id);
      for (const button of section.querySelectorAll("[data-framework]")) {
        button.addEventListener(
          "click",
          () => selectFramework(id, button.dataset.framework),
        );
      }
      selectFramework(id, "react");
    }

    function applyFilter(value) {
      for (const id of ids) {
        const section = sectionById.get(id);
        const matches = !value || id.includes(value);
        if (matches && !section.isConnected) {
          main.appendChild(section);
          const selected = section.querySelector('[aria-pressed="true"]');
          selectFramework(id, selected.dataset.framework);
        } else if (!matches && section.isConnected) {
          section.remove();
        }
      }
    }

    document
      .querySelector('[aria-label="Search components"]')
      .addEventListener("input", (event) => applyFilter(event.target.value));
  </script>
</body>
</html>`,
  );
  return { componentIds, registryPath, root };
}

async function expectServerClosed(baseUrl: string) {
  await expect(fetch(baseUrl)).rejects.toThrow();
}

describe("browser visual environment", () => {
  test("captures an exact React and Vanilla pair in one context and closes its internal server", async () => {
    const { registryPath, root } = parityCommandFixture({
      detectCoordinateRewrite: true,
    });
    const artifactDir = temporaryDirectory("native-ai-ui-exact-parity-artifacts-");
    mutableCases.set("demo", [{ name: "exact", advanceMs: 0 }]);

    const exitCode = await runVisualCommand(
      ["--components", "demo", "--themes", "light", "--locales", "en"],
      {
        artifactDir,
        basePath: "/preview",
        outputRoot: root,
        port: 0,
        registryPath,
      },
    );

    expect(exitCode).toBe(0);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.baseUrl).toMatch(/\/preview\/$/);
    // The fixture paints Vanilla blue only after React marked this BrowserContext.
    expect(report.summary).toEqual({ failed: 0, passed: 1, total: 1 });
    expect(report.results[0]).toMatchObject({
      mismatched: 0,
      ok: true,
      reactScreenshot: expect.any(String),
      vanillaScreenshot: expect.any(String),
    });
    expect(existsSync(join(artifactDir, report.results[0].reactScreenshot))).toBe(true);
    expect(existsSync(join(artifactDir, report.results[0].vanillaScreenshot))).toBe(true);
    expect(existsSync(join(artifactDir, "report.html"))).toBe(true);
    await expectServerClosed(report.baseUrl);
  }, 60_000);

  test("fails a real parity command for a one-pixel internal offset and closes its server", async () => {
    const { registryPath, root } = parityCommandFixture({
      reactOffset: 0,
      vanillaOffset: 1,
    });
    const artifactDir = temporaryDirectory("native-ai-ui-offset-parity-artifacts-");
    mutableCases.set("demo", [{ name: "offset", advanceMs: 0 }]);

    const exitCode = await runVisualCommand(
      ["--components", "demo", "--themes", "light", "--locales", "en"],
      {
        artifactDir,
        basePath: "/",
        outputRoot: root,
        port: 0,
        registryPath,
      },
    );

    expect(exitCode).toBe(1);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.summary).toEqual({ failed: 1, passed: 0, total: 1 });
    expect(report.results[0]).toMatchObject({ ok: false });
    expect(report.results[0].mismatched).toBeGreaterThan(0);
    expect(existsSync(join(artifactDir, "report.html"))).toBe(true);
    await expectServerClosed(report.baseUrl);
  }, 60_000);

  test("captures two filtered React-only components without mounting Vanilla", async () => {
    const { componentIds, registryPath, root } = reactOnlyMultiComponentFixture();
    const artifactDir = temporaryDirectory(
      "native-ai-ui-react-only-multi-artifacts-",
    );
    for (const component of componentIds) {
      mutableCases.set(component, [{ name: "review", advanceMs: 0 }]);
    }

    const exitCode = await runVisualCommand(
      [
        "--react-only",
        "--components",
        componentIds.join(","),
        "--themes",
        "light",
        "--locales",
        "en",
      ],
      {
        artifactDir,
        basePath: "/",
        outputRoot: root,
        port: 0,
        registryPath,
      },
    );

    expect(exitCode).toBe(0);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.summary).toEqual({ failed: 0, passed: 2, total: 2 });
    expect(report.results.map((result: { component: string }) => result.component))
      .toEqual(componentIds);
    for (const result of report.results) {
      expect(result).toMatchObject({
        ok: true,
        reactScreenshot: expect.any(String),
        vanillaScreenshot: null,
      });
      expect(existsSync(join(artifactDir, result.reactScreenshot))).toBe(true);
    }
    await expectServerClosed(report.baseUrl);
  }, 60_000);

  test("captures two React-only cases without ever mounting Vanilla", async () => {
    const { registryPath, root } = parityCommandFixture({ vanillaThrows: true });
    const artifactDir = temporaryDirectory("native-ai-ui-react-only-artifacts-");
    mutableCases.set("demo", [
      { name: "first", advanceMs: 0 },
      { name: "second", advanceMs: 0 },
    ]);

    const exitCode = await runVisualCommand(
      [
        "--react-only",
        "--components",
        "demo",
        "--themes",
        "light",
        "--locales",
        "en",
      ],
      {
        artifactDir,
        basePath: "/",
        outputRoot: root,
        port: 0,
        registryPath,
      },
    );

    expect(exitCode).toBe(0);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.summary).toEqual({ failed: 0, passed: 2, total: 2 });
    expect(report.results.every((result: { ok: boolean }) => result.ok)).toBe(true);
    await expectServerClosed(report.baseUrl);
  }, 60_000);

  test("drains a zero-delay timer registered after a boundary timer effect", async () => {
    const { registryPath, root } = parityCommandFixture({ chainedTimer: true });
    const artifactDir = temporaryDirectory("native-ai-ui-timer-chain-artifacts-");
    mutableCases.set("demo", [
      {
        name: "timer-chain",
        advanceMs: 2600,
        action: async ({ canvas }: { canvas: any }) => {
          const text = await canvas.locator(".visual-box").textContent();
          if (text !== "second") {
            throw new Error(`Expected second timer transition, received ${text}`);
          }
        },
      },
    ]);

    const exitCode = await runVisualCommand(
      [
        "--react-only",
        "--components",
        "demo",
        "--themes",
        "light",
        "--locales",
        "en",
      ],
      {
        artifactDir,
        basePath: "/",
        outputRoot: root,
        port: 0,
        registryPath,
      },
    );

    expect(exitCode).toBe(0);
    const report = JSON.parse(
      readFileSync(join(artifactDir, "report.json"), "utf8"),
    );
    expect(report.summary).toEqual({ failed: 0, passed: 1, total: 1 });
  }, 60_000);

  test("times out stalled image readiness and still writes reports", () => {
    const { registryPath, root } = parityCommandFixture({ stalledImage: true });
    const artifactDir = temporaryDirectory("native-ai-ui-stalled-image-artifacts-");
    const runnerUrl = pathToFileURL(
      resolve("scripts/run-visual-parity.mjs"),
    ).href;
    const source = `
      import { readFileSync } from "node:fs";
      import { resolve } from "node:path";
      import { main } from ${JSON.stringify(runnerUrl)};
      const artifactDir = ${JSON.stringify(artifactDir)};
      const exitCode = await main(
        ["--react-only", "--components", "demo", "--themes", "light", "--locales", "en"],
        ${JSON.stringify({
          artifactDir,
          basePath: "/",
          imageTimeoutMs: 50,
          outputRoot: root,
          port: 0,
          registryPath,
        })},
      );
      const report = JSON.parse(readFileSync(resolve(artifactDir, "report.json"), "utf8"));
      let serverClosed = false;
      try { await fetch(report.baseUrl); } catch { serverClosed = true; }
      console.log("__STALLED_RESULT__" + JSON.stringify({ exitCode, serverClosed }));
      process.exitCode = exitCode === 1 && serverClosed ? 1 : 2;
    `;

    const result = spawnSync(
      process.execPath,
      ["--input-type=module", "--eval", source],
      { encoding: "utf8", timeout: 15_000 },
    );

    expect(result.error).toBeUndefined();
    expect(result.signal).toBeNull();
    expect(result.status).toBe(1);
    expect(result.stdout).toContain(
      '__STALLED_RESULT__{"exitCode":1,"serverClosed":true}',
    );
    const reportPath = join(artifactDir, "report.json");
    if (!existsSync(reportPath)) {
      throw new Error(`Stalled-image subprocess wrote no report:\n${result.stderr}`);
    }
    const report = JSON.parse(readFileSync(reportPath, "utf8"));
    expect(report.results[0]?.error).toContain(
      "Image readiness timed out after 50ms",
    );
    expect(existsSync(join(artifactDir, "report.html"))).toBe(true);
  }, 20_000);

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
