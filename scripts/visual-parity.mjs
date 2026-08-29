import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { casesForComponent } from "../tests/visual/cases.mjs";

export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const DEFAULT_THEMES = Object.freeze(["light", "dark"]);
export const DEFAULT_LOCALES = Object.freeze(["en", "zh"]);
export const VISUAL_ARTIFACT_DIRECTORY = resolve(
  repositoryRoot,
  ".artifacts",
  "visual-parity",
);

export function readRegistryComponentIds(
  registryPath = resolve(repositoryRoot, "registry.json"),
) {
  try {
    const registry = JSON.parse(readFileSync(registryPath, "utf8"));
    return (registry.items ?? []).map(({ name }) => name).sort();
  } catch (error) {
    throw new Error(
      `Could not read registry ${registryPath}: ${errorMessage(error)}`,
      { cause: error },
    );
  }
}

export function getDefaultComponentIds(
  registryPath = resolve(repositoryRoot, "registry.json"),
) {
  return Object.freeze(readRegistryComponentIds(registryPath));
}

export function initializeVisualEnvironment({ locale, theme }) {
  window.localStorage.setItem("nai-lang", locale);
  window.localStorage.setItem("nai-theme", theme);

  const applyDocumentState = () => {
    const root = document.documentElement;
    if (!root) return false;
    root.classList.toggle("dark", theme === "dark");
    root.lang = locale;
    return true;
  };

  if (!applyDocumentState()) {
    const observer = new MutationObserver(() => {
      if (!applyDocumentState()) return;
      observer.disconnect();
    });
    observer.observe(document, { childList: true });
  }
}

export function buildBaseMatrix({ componentIds, themes, locales }) {
  const matrix = [];
  for (const theme of themes) {
    for (const locale of locales) {
      for (const component of componentIds) {
        matrix.push({ component, locale, theme });
      }
    }
  }
  return matrix;
}

export function buildCaseInventory({ componentIds, themes, locales }) {
  return buildBaseMatrix({ componentIds, themes, locales }).flatMap((entry) =>
    casesForComponent(entry.component).map((visualCase) => ({
      ...entry,
      action: visualCase.action,
      advanceMs: visualCase.advanceMs,
      caseName: visualCase.name,
    })),
  );
}

function optionValue(args, index, flag, inlineValue) {
  if (inlineValue !== undefined) return { index, value: inlineValue };
  const nextIndex = index + 1;
  if (nextIndex >= args.length) throw new Error(`${flag} requires a value`);
  return { index: nextIndex, value: args[nextIndex] };
}

function commaSeparated(value, flag) {
  const values = [...new Set(value.split(",").map((item) => item.trim()).filter(Boolean))];
  if (values.length === 0) throw new Error(`${flag} requires at least one value`);
  return values;
}

function normalizeExternalBaseUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid --base-url: ${value}`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Invalid --base-url protocol: ${url.protocol}`);
  }
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
  return url.href;
}

function navigationUrlForBase(baseUrl) {
  return new URL(".", normalizeExternalBaseUrl(baseUrl)).href;
}

export function parseRunnerArgs(
  args,
  availableComponentIds = getDefaultComponentIds(),
) {
  let componentIds = [...availableComponentIds];
  let themes = [...DEFAULT_THEMES];
  let locales = [...DEFAULT_LOCALES];
  let baseUrl;
  let reactOnly = false;

  for (let index = 0; index < args.length; index += 1) {
    const raw = args[index];
    if (raw === "--react-only") {
      reactOnly = true;
      continue;
    }

    const equals = raw.indexOf("=");
    const flag = equals === -1 ? raw : raw.slice(0, equals);
    const inlineValue = equals === -1 ? undefined : raw.slice(equals + 1);
    const option = optionValue(args, index, flag, inlineValue);
    index = option.index;

    if (flag === "--components") {
      componentIds = commaSeparated(option.value, flag);
    } else if (flag === "--themes") {
      themes = commaSeparated(option.value, flag);
    } else if (flag === "--locales") {
      locales = commaSeparated(option.value, flag);
    } else if (flag === "--base-url") {
      baseUrl = normalizeExternalBaseUrl(option.value);
    } else {
      throw new Error(`Unknown option: ${raw}`);
    }
  }

  for (const component of componentIds) {
    if (!availableComponentIds.includes(component)) {
      throw new Error(`Unknown component: ${component}`);
    }
  }
  for (const theme of themes) {
    if (!DEFAULT_THEMES.includes(theme)) throw new Error(`Unknown theme: ${theme}`);
  }
  for (const locale of locales) {
    if (!DEFAULT_LOCALES.includes(locale)) throw new Error(`Unknown locale: ${locale}`);
  }

  return {
    baseUrl,
    componentIds,
    locales,
    reactOnly,
    themes,
  };
}

function missingImageResult(label) {
  return {
    dimensions: null,
    diff: null,
    error: `Missing ${label} screenshot`,
    mismatched: null,
    ok: false,
    pct: null,
    sizeMismatch: false,
    total: null,
  };
}

export function compareImages(reactImage, vanillaImage) {
  if (!reactImage) return missingImageResult("React");
  if (!vanillaImage) return missingImageResult("Vanilla");

  const dimensions =
    `${reactImage.width}x${reactImage.height} vs ` +
    `${vanillaImage.width}x${vanillaImage.height}`;
  const sizeMismatch =
    reactImage.width !== vanillaImage.width ||
    reactImage.height !== vanillaImage.height;
  if (sizeMismatch) {
    return {
      dimensions,
      diff: null,
      error: `Screenshot dimensions differ: ${dimensions}`,
      mismatched: null,
      ok: false,
      pct: null,
      sizeMismatch: true,
      total: null,
    };
  }

  const diff = new PNG({ width: reactImage.width, height: reactImage.height });
  const mismatched = pixelmatch(
    reactImage.data,
    vanillaImage.data,
    diff.data,
    reactImage.width,
    reactImage.height,
    {
      diffColor: [255, 0, 90],
      includeAA: true,
      threshold: 0,
    },
  );
  const total = reactImage.width * reactImage.height;
  const pct = total === 0 ? 0 : (mismatched / total) * 100;

  return {
    dimensions,
    diff,
    error: mismatched === 0 ? null : `${mismatched} mismatched pixels`,
    mismatched,
    ok: mismatched === 0,
    pct,
    sizeMismatch: false,
    total,
  };
}

function readPng(path) {
  if (!path || !existsSync(path)) return undefined;
  return PNG.sync.read(readFileSync(path));
}

export function compareScreenshotFiles({
  reactPath,
  vanillaPath,
  diffPath,
}) {
  const result = compareImages(readPng(reactPath), readPng(vanillaPath));
  if (result.diff && diffPath) {
    writeFileSync(diffPath, PNG.sync.write(result.diff));
  }
  const { diff: _diff, ...serializable } = result;
  return serializable;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function imageCell(path, label) {
  if (!path) return "";
  return `<a href="${escapeHtml(path)}"><img src="${escapeHtml(path)}" alt="${escapeHtml(label)}" loading="lazy"></a>`;
}

function reportHtml(report) {
  const rows = report.results
    .map((result) => {
      const mismatch =
        result.mismatched === null || result.mismatched === undefined
          ? ""
          : `${result.mismatched} (${(result.pct ?? 0).toFixed(6)}%)`;
      return `<tr class="${result.ok ? "pass" : "fail"}">
        <td>${escapeHtml(result.component)}</td>
        <td>${escapeHtml(result.theme)}</td>
        <td>${escapeHtml(result.locale)}</td>
        <td>${escapeHtml(result.caseName)}</td>
        <td>${result.ok ? "PASS" : "FAIL"}</td>
        <td>${escapeHtml(mismatch)}</td>
        <td>${escapeHtml(result.dimensions)}</td>
        <td>${escapeHtml(result.error)}</td>
        <td>${imageCell(result.reactScreenshot, "React")}</td>
        <td>${imageCell(result.vanillaScreenshot, "Vanilla")}</td>
        <td>${imageCell(result.diffScreenshot, "Diff")}</td>
      </tr>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Native AI UI visual parity</title>
<style>
  :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  body { margin: 0; padding: 24px; background: #111317; color: #eef0f3; }
  h1 { margin: 0 0 8px; font-size: 24px; }
  .meta { margin: 0 0 20px; color: #aeb4bf; }
  .fatal { padding: 12px; border: 1px solid #7f1d1d; background: #2d1518; color: #fecaca; white-space: pre-wrap; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { border: 1px solid #343943; padding: 7px; text-align: left; vertical-align: top; }
  th { position: sticky; top: 0; background: #1c2027; }
  tr.fail { background: #25181b; }
  tr.pass { background: #141c18; }
  img { display: block; max-width: 360px; height: auto; background: white; }
</style>
</head>
<body>
<h1>React / Vanilla visual parity</h1>
<p class="meta">Mode: ${escapeHtml(report.mode)} · Base URL: ${escapeHtml(report.baseUrl)} · ${report.summary.passed}/${report.summary.total} passed</p>
${report.fatalError ? `<pre class="fatal">${escapeHtml(report.fatalError)}</pre>` : ""}
<div class="table-wrap">
<table>
<thead><tr><th>Component</th><th>Theme</th><th>Locale</th><th>Case</th><th>Status</th><th>Mismatch</th><th>Dimensions</th><th>Error</th><th>React</th><th>Vanilla</th><th>Diff</th></tr></thead>
<tbody>${rows}</tbody>
</table>
</div>
</body>
</html>\n`;
}

export function writeVisualReports(artifactDir, report) {
  mkdirSync(artifactDir, { recursive: true });
  writeFileSync(
    resolve(artifactDir, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  writeFileSync(resolve(artifactDir, "report.html"), reportHtml(report));
}

export function exitCodeForReport(report) {
  if (report.fatalError) return 1;
  if (report.results.some((result) => !result.ok)) return 1;
  return 0;
}

function errorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

function artifactStem(entry) {
  return [entry.component, entry.theme, entry.locale, entry.caseName]
    .map((part) => String(part).replace(/[^a-z0-9_-]+/gi, "-"))
    .join("__");
}

const VIRTUAL_CLOCK_SCRIPT = `
(() => {
  const initialNow = 1000000;
  const initialRandomState = 0x1a2b3c4d;
  let now = initialNow;
  let randomState = initialRandomState;
  let sequence = 1;
  const timers = new Map();
  const realSetTimeout = window.setTimeout.bind(window);
  const RealDate = window.Date;

  class VirtualDate extends RealDate {
    constructor(...args) {
      super(...(args.length === 0 ? [now] : args));
    }
    static now() { return now; }
  }

  window.Date = VirtualDate;
  Math.random = () => {
    randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
    return randomState / 0x100000000;
  };
  window.__naiRealSetTimeout = realSetTimeout;
  window.__naiTimerErrors = [];
  window.setTimeout = (callback, delay = 0, ...args) => {
    const id = sequence++;
    timers.set(id, {
      at: now + Math.max(0, Number(delay) || 0),
      callback: () => callback(...args),
      interval: 0,
    });
    return id;
  };
  window.setInterval = (callback, delay = 0, ...args) => {
    const interval = Math.max(1, Number(delay) || 0);
    const id = sequence++;
    timers.set(id, {
      at: now + interval,
      callback: () => callback(...args),
      interval,
    });
    return id;
  };
  window.clearTimeout = (id) => timers.delete(id);
  window.clearInterval = (id) => timers.delete(id);
  window.__naiResetVirtualClock = () => {
    timers.clear();
    window.__naiTimerErrors.length = 0;
    now = initialNow;
    randomState = initialRandomState;
  };
  window.__naiResetVirtualRandom = () => {
    randomState = initialRandomState;
  };
  window.__naiAdvanceVirtualClock = (milliseconds) => {
    const target = now + Math.max(0, milliseconds);
    let guard = 100000;
    let ran = 0;
    while (guard-- > 0) {
      let nextId = null;
      let nextTimer = null;
      for (const [id, timer] of timers) {
        if (
          timer.at <= target &&
          (nextTimer === null || timer.at < nextTimer.at ||
            (timer.at === nextTimer.at && id < nextId))
        ) {
          nextId = id;
          nextTimer = timer;
        }
      }
      if (nextTimer === null) break;
      now = nextTimer.at;
      ran += 1;
      if (nextTimer.interval) nextTimer.at = now + nextTimer.interval;
      else timers.delete(nextId);
      try {
        nextTimer.callback();
      } catch (error) {
        window.__naiTimerErrors.push(String(error && error.stack || error));
      }
    }
    if (guard <= 0) {
      window.__naiTimerErrors.push("Virtual clock exceeded its timer guard");
    }
    now = target;
    return ran;
  };
})();
`;

async function waitForMounted(page, component, framework) {
  await page.waitForFunction(
    ({ component, framework }) => {
      const section = document.getElementById(component);
      if (!section) return false;
      const canvas = [...section.children].find((child) =>
        child.classList.contains("rounded-card"),
      );
      const viewport = canvas?.firstElementChild;
      const content = viewport?.firstElementChild;
      if (!content || content.classList.contains("sr-only")) return false;
      if (framework === "vanilla") {
        const element = section.querySelector(`nai-${component}`);
        return Boolean(
          element &&
            element.shadowRoot &&
            element.shadowRoot.children.length > 1,
        );
      }
      return !content.localName.startsWith("nai-");
    },
    { component, framework },
    { timeout: 20_000 },
  );
}

async function settleBrowserPaint(page) {
  await page.evaluate(
    () =>
      new Promise((resolvePaint) => {
        requestAnimationFrame(() => requestAnimationFrame(resolvePaint));
      }),
  );
}

async function advanceVirtualTime(page, milliseconds) {
  await page.evaluate(async (advanceMs) => {
    const flushRealTask = async () => {
      await Promise.resolve();
      await new Promise((resolveTick) => window.__naiRealSetTimeout(resolveTick, 0));
      await Promise.resolve();
    };
    const step = 50;
    for (let elapsed = 0; elapsed < advanceMs; elapsed += step) {
      window.__naiAdvanceVirtualClock(Math.min(step, advanceMs - elapsed));
      await flushRealTask();
    }

    let idleRounds = 0;
    for (let round = 0; round < 50; round += 1) {
      const ran = window.__naiAdvanceVirtualClock(0);
      await flushRealTask();
      idleRounds = ran === 0 ? idleRounds + 1 : 0;
      if (idleRounds >= 2) return;
    }
    throw new Error("Virtual timer settle exceeded 50 rounds");
  }, milliseconds);
  await settleBrowserPaint(page);
}

async function resetVirtualTime(page) {
  await page.evaluate(() => window.__naiResetVirtualClock());
}

function frameworkButton(section, framework) {
  return section
    .getByRole("button", {
      exact: true,
      name: framework === "react" ? "React" : "Vanilla",
    })
    .first();
}

async function finishFreshMount(page, component, framework) {
  await waitForMounted(page, component, framework);
  await settleBrowserPaint(page);
  await page.evaluate(
    () => new Promise((resolveTask) => window.__naiRealSetTimeout(resolveTask, 0)),
  );
  await page.evaluate(() => window.__naiResetVirtualRandom());
}

async function freshMount(page, section, component, framework) {
  const target = frameworkButton(section, framework);
  if ((await target.getAttribute("aria-pressed")) === "true") {
    const otherFramework = framework === "react" ? "vanilla" : "react";
    await frameworkButton(section, otherFramework).click();
    await waitForMounted(page, component, otherFramework);
  }

  await resetVirtualTime(page);
  await target.click();
  await finishFreshMount(page, component, framework);
}

function componentLocators(page, component) {
  const section = page.locator(`#${component}`);
  return {
    canvas: section.locator(":scope > div.rounded-card").first(),
    section,
  };
}

async function freshReactOnlyMount(page, component) {
  const search = page
    .getByRole("textbox", { name: /Search components|搜索组件/ })
    .first();
  const hasSearch = (await search.count()) > 0;
  if (hasSearch) {
    await search.fill("__nai_visual_remount__");
    await page
      .locator(`#${component}`)
      .waitFor({ state: "detached", timeout: 20_000 });
    await resetVirtualTime(page);
    await search.fill(component);
  }

  const locators = componentLocators(page, component);
  if (!hasSearch) {
    await resetVirtualTime(page);
    await frameworkButton(locators.section, "react").click();
  }
  await finishFreshMount(page, component, "react");
  return locators;
}

async function drainRuntimeErrors(page, pageErrors) {
  let timerErrors = [];
  if (!page.isClosed()) {
    try {
      timerErrors = await page.evaluate(() => [
        ...window.__naiTimerErrors.splice(0),
      ]);
    } catch {
      // The primary capture error is more useful when the page is already gone.
    }
  }
  return [...pageErrors.splice(0), ...timerErrors];
}

async function screenshotCanvas(page, canvas, screenshotPath) {
  await settleBrowserPaint(page);
  await canvas.screenshot({
    animations: "disabled",
    caret: "hide",
    path: screenshotPath,
  });
}

async function validateCanvasRuntime(
  canvas,
  component,
  framework,
  imageTimeoutMs,
) {
  const failures = await canvas.evaluate(async (root, options) => {
    const images = [];
    const visit = (scope) => {
      images.push(...scope.querySelectorAll("img"));
      for (const element of scope.querySelectorAll("*")) {
        if (element.shadowRoot) visit(element.shadowRoot);
      }
    };
    visit(root);

    const imageReadiness = Promise.all(
      images.map(
        (image) =>
          image.complete
            ? undefined
            : new Promise((resolveImage) => {
                image.addEventListener("load", resolveImage, { once: true });
                image.addEventListener("error", resolveImage, { once: true });
              }),
      ),
    );
    await Promise.race([
      imageReadiness,
      new Promise((_, rejectTimeout) => {
        window.__naiRealSetTimeout(
          () => rejectTimeout(
            new Error(
              `Image readiness timed out after ${options.imageTimeoutMs}ms`,
            ),
          ),
          options.imageTimeoutMs,
        );
      }),
    ]);

    const errors = [];
    for (const image of images) {
      if (image.complete && image.naturalWidth > 0) continue;
      const source = image.currentSrc || image.getAttribute("src") || "<missing src>";
      let label = source;
      try {
        const url = new URL(source, document.baseURI);
        label = `${url.pathname}${url.search}`;
      } catch {
        // Preserve the raw source when it is not a valid URL.
      }
      errors.push(`Image failed to load: ${label}`);
    }

    const tag = `nai-${options.component}`;
    const customElement = root.querySelector(tag);
    if (options.framework === "vanilla") {
      if (!customElement) errors.push(`Missing custom element: ${tag}`);
      else if (!customElements.get(tag)) errors.push(`Undefined custom element: ${tag}`);
      else if (!customElement.shadowRoot) errors.push(`Missing shadow root: ${tag}`);
    } else if (customElement) {
      errors.push(`React capture mounted unexpected custom element: ${tag}`);
    }

    return errors;
  }, { component, framework, imageTimeoutMs });

  if (failures.length > 0) throw new Error(failures.join("\n"));
}

async function captureFramework({
  artifactDir,
  entry,
  framework,
  imageTimeoutMs,
  page,
  pageErrors,
  reactOnly = false,
}) {
  const screenshot = `${artifactStem(entry)}__${framework}.png`;
  const screenshotPath = resolve(artifactDir, screenshot);

  try {
    const { section, canvas } = reactOnly
      ? await freshReactOnlyMount(page, entry.component)
      : componentLocators(page, entry.component);
    await section.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await canvas.waitFor({ state: "visible", timeout: 20_000 });
    if (!reactOnly) {
      await freshMount(page, section, entry.component, framework);
    }
    await advanceVirtualTime(page, entry.advanceMs);
    if (typeof entry.action === "function") {
      await entry.action({
        advance: (milliseconds) => advanceVirtualTime(page, milliseconds),
        canvas,
        framework,
        page,
        section,
      });
      await settleBrowserPaint(page);
    }

    await validateCanvasRuntime(
      canvas,
      entry.component,
      framework,
      imageTimeoutMs,
    );
    await screenshotCanvas(page, canvas, screenshotPath);
    const runtimeErrors = await drainRuntimeErrors(page, pageErrors);
    if (runtimeErrors.length > 0) {
      throw new Error(runtimeErrors.join("\n"));
    }
    return { error: null, ok: true, screenshot, screenshotPath };
  } catch (error) {
    const runtimeErrors = await drainRuntimeErrors(page, pageErrors);
    const messages = [errorMessage(error), ...runtimeErrors].filter(
      (message, index, all) => message && all.indexOf(message) === index,
    );
    return {
      error: messages.join("\n"),
      ok: false,
      screenshot: existsSync(screenshotPath) ? screenshot : null,
      screenshotPath: existsSync(screenshotPath) ? screenshotPath : null,
    };
  }
}

function resultBase(entry) {
  return {
    advanceMs: entry.advanceMs,
    caseName: entry.caseName,
    component: entry.component,
    locale: entry.locale,
    theme: entry.theme,
  };
}

function failedResult(entry, error) {
  return {
    ...resultBase(entry),
    dimensions: null,
    diffScreenshot: null,
    error: errorMessage(error),
    mismatched: null,
    ok: false,
    pct: null,
    reactScreenshot: null,
    sizeMismatch: false,
    total: null,
    vanillaScreenshot: null,
  };
}

function summarize(results) {
  const passed = results.filter((result) => result.ok).length;
  return {
    failed: results.length - passed,
    passed,
    total: results.length,
  };
}

function createReport({ baseUrl, fatalError, mode, options, results }) {
  return {
    baseUrl,
    fatalError,
    filters: {
      components: options.componentIds,
      locales: options.locales,
      themes: options.themes,
    },
    generatedAt: new Date().toISOString(),
    mode,
    results,
    summary: summarize(results),
  };
}

/**
 * @param {{
 *   artifactDir?: string,
 *   baseUrl?: string,
 *   componentIds?: readonly string[],
 *   imageTimeoutMs?: number,
 *   locales?: readonly string[],
 *   reactOnly?: boolean,
 *   themes?: readonly string[],
 *   log?: (message: string) => void,
 * }} [options]
 */
export async function runVisualParity({
  artifactDir = VISUAL_ARTIFACT_DIRECTORY,
  baseUrl,
  componentIds,
  imageTimeoutMs = 5_000,
  locales = DEFAULT_LOCALES,
  reactOnly = false,
  registryPath = resolve(repositoryRoot, "registry.json"),
  themes = DEFAULT_THEMES,
  log = console.log,
} = {}) {
  const mode = reactOnly ? "react-only" : "parity";
  const results = [];
  let browser;
  let fatalError = null;
  let resolvedComponentIds = componentIds;
  let options = {
    componentIds: resolvedComponentIds ?? [],
    locales,
    themes,
  };

  mkdirSync(artifactDir, { recursive: true });
  if (!baseUrl) {
    return createReport({
      baseUrl: null,
      fatalError: "Visual runner requires a base URL",
      mode,
      options,
      results,
    });
  }

  try {
    resolvedComponentIds ??= getDefaultComponentIds(registryPath);
    options = {
      componentIds: resolvedComponentIds,
      locales,
      themes,
    };
    const inventory = buildCaseInventory(options);
    browser = await chromium.launch({ headless: true });
    for (const theme of themes) {
      for (const locale of locales) {
        const contextEntries = inventory.filter(
          (entry) => entry.theme === theme && entry.locale === locale,
        );
        let context;
        try {
          context = await browser.newContext({
            deviceScaleFactor: 1,
            locale: locale === "zh" ? "zh-CN" : "en-US",
            reducedMotion: "reduce",
            viewport: { height: 900, width: 1360 },
          });
          const page = await context.newPage();
          const pageErrors = [];
          page.on("pageerror", (error) =>
            pageErrors.push(error.stack || errorMessage(error)),
          );
          page.on("console", (message) => {
            if (message.type() === "error") {
              pageErrors.push(`console.error: ${message.text()}`);
            }
          });
          await page.addInitScript({ content: VIRTUAL_CLOCK_SCRIPT });
          await page.addInitScript(initializeVisualEnvironment, {
            locale,
            theme,
          });
          await page.goto(navigationUrlForBase(baseUrl), {
            waitUntil: "networkidle",
            timeout: 45_000,
          });
          await page.waitForSelector("#loading-state", { timeout: 30_000 });
          await page.evaluate(() => document.fonts.ready);
          await page
            .locator("aside")
            .first()
            .getByRole("button", {
              exact: true,
              name: locale === "zh" ? "中" : "EN",
            })
            .click();
          await page.waitForFunction(
            (expectedLocale) => document.documentElement.lang === expectedLocale,
            locale,
          );
          await page.evaluate(
            (expectedTheme) => {
              document.documentElement.classList.toggle(
                "dark",
                expectedTheme === "dark",
              );
            },
            theme,
          );
          if (pageErrors.length > 0) {
            throw new Error(pageErrors.splice(0).join("\n"));
          }

          for (const entry of contextEntries) {
            const react = await captureFramework({
              artifactDir,
              entry,
              framework: "react",
              imageTimeoutMs,
              page,
              pageErrors,
              reactOnly,
            });

            if (reactOnly) {
              const result = {
                ...resultBase(entry),
                dimensions: null,
                diffScreenshot: null,
                error: react.error,
                mismatched: null,
                ok: react.ok,
                pct: null,
                reactScreenshot: react.screenshot,
                sizeMismatch: false,
                total: null,
                vanillaScreenshot: null,
              };
              results.push(result);
              log(
                `${result.ok ? "PASS" : "FAIL"} ${entry.component} ${theme}/${locale}/${entry.caseName} React`,
              );
              continue;
            }

            const vanilla = await captureFramework({
              artifactDir,
              entry,
              framework: "vanilla",
              imageTimeoutMs,
              page,
              pageErrors,
            });
            const diffScreenshot = `${artifactStem(entry)}__diff.png`;
            const comparison = compareScreenshotFiles({
              diffPath: resolve(artifactDir, diffScreenshot),
              reactPath: react.screenshotPath,
              vanillaPath: vanilla.screenshotPath,
            });
            const errors = [react.error, vanilla.error, comparison.error].filter(Boolean);
            const result = {
              ...resultBase(entry),
              ...comparison,
              diffScreenshot:
                existsSync(resolve(artifactDir, diffScreenshot))
                  ? diffScreenshot
                  : null,
              error: errors.length > 0 ? errors.join("; ") : null,
              ok: react.ok && vanilla.ok && comparison.ok,
              reactScreenshot: react.screenshot,
              vanillaScreenshot: vanilla.screenshot,
            };
            results.push(result);
            log(
              `${result.ok ? "PASS" : "FAIL"} ${entry.component} ${theme}/${locale}/${entry.caseName}` +
                (result.mismatched === null
                  ? ` ${result.error ?? ""}`
                  : ` ${result.mismatched} px`),
            );
          }
        } catch (error) {
          const completedKeys = new Set(
            results.map((result) =>
              [
                result.component,
                result.theme,
                result.locale,
                result.caseName,
              ].join("\0"),
            ),
          );
          for (const entry of contextEntries) {
            const key = [
              entry.component,
              entry.theme,
              entry.locale,
              entry.caseName,
            ].join("\0");
            if (!completedKeys.has(key)) results.push(failedResult(entry, error));
          }
        } finally {
          await context?.close();
        }
      }
    }
  } catch (error) {
    fatalError = errorMessage(error);
  } finally {
    await browser?.close();
  }

  return createReport({ baseUrl, fatalError, mode, options, results });
}
