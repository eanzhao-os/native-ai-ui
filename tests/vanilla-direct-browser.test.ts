/** @vitest-environment node */

import { chromium, type Browser } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

const publicRoot = fileURLToPath(new URL("../public/", import.meta.url));
const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/vanilla/tokens.css">
    <style>
      html, body { margin: 0; min-height: 100%; background: var(--canvas); }
      body { display: grid; grid-template-columns: 380px 460px; gap: 24px; padding: 24px; }
      nai-insight-cards, nai-prompt-bar { width: 100%; }
    </style>
    <script type="module" src="/vanilla/index.js"></script>
  </head>
  <body>
    <nai-insight-cards></nai-insight-cards>
    <nai-prompt-bar variant="Rounded"></nai-prompt-bar>
  </body>
</html>`;

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

let browser: Browser;
let server: Server;
let origin = "";

beforeAll(async () => {
  server = createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
      if (pathname === "/") {
        response.writeHead(200, { "content-type": contentTypes[".html"] });
        response.end(indexHtml);
        return;
      }

      const filePath = resolve(publicRoot, `.${decodeURIComponent(pathname)}`);
      if (!filePath.startsWith(`${resolve(publicRoot)}${sep}`)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }
      const body = await readFile(filePath);
      response.writeHead(200, {
        "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream",
      });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  await new Promise<void>((resolveListen) => {
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Direct-browser test server did not expose a TCP address");
  }
  origin = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
  await browser?.close();
  await new Promise<void>((resolveClose, rejectClose) => {
    server?.close((error) => (error ? rejectClose(error) : resolveClose()));
  });
});

describe("documented direct Vanilla module install", () => {
  test("renders visible Insight charts and the Prompt flagship sweep when bare imports fail", async () => {
    const page = await browser.newPage();
    const externalRequests: string[] = [];
    await page.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) {
        externalRequests.push(url.href);
        await route.abort();
        return;
      }
      await route.continue();
    });

    try {
      await page.goto(origin, { waitUntil: "networkidle" });
      await page.waitForFunction(
        () =>
          customElements.get("nai-insight-cards") &&
          customElements.get("nai-prompt-bar"),
      );
      await page.waitForTimeout(300);

      const initial = await page.evaluate(() => {
        const countVisiblePixels = (canvas: HTMLCanvasElement) => {
          const context = canvas.getContext("2d");
          if (!context || canvas.width === 0 || canvas.height === 0) return -1;
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
          let visible = 0;
          for (let index = 3; index < pixels.length; index += 4) {
            if (pixels[index] > 0) visible += 1;
          }
          return visible;
        };

        const insight = document.querySelector("nai-insight-cards");
        const insightRoot = insight?.shadowRoot?.querySelector(
          "[data-liveline-root]",
        ) as HTMLElement | null;
        const insightCanvas = insightRoot?.querySelector("canvas") as HTMLCanvasElement | null;
        const prompt = document.querySelector("nai-prompt-bar");
        const promptCanvas = prompt?.shadowRoot?.querySelector("canvas") as HTMLCanvasElement | null;

        return {
          insightPixels: insightCanvas ? countVisiblePixels(insightCanvas) : -1,
          insightRenderer: insightRoot?.dataset.renderer ?? null,
          promptPixels: promptCanvas ? countVisiblePixels(promptCanvas) : -1,
          promptRenderer: promptCanvas?.dataset.renderer ?? null,
          promptOpacity: promptCanvas?.style.opacity ?? null,
        };
      });

      expect(initial.insightRenderer).toBe("fallback");
      expect(initial.insightPixels).toBeGreaterThan(0);
      expect(initial.promptRenderer).toBe("fallback");
      expect(initial.promptPixels).toBe(0);
      expect(initial.promptOpacity).toBe("0");

      await page.evaluate(() => {
        const prompt = document.querySelector("nai-prompt-bar");
        const root = prompt?.shadowRoot;
        const input = root?.querySelector("textarea") as HTMLTextAreaElement | null;
        input?.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
        const picker = root?.querySelector(
          '[aria-label="Choose model"]',
        ) as HTMLButtonElement | null;
        picker?.click();
        const flagship = [...(root?.querySelectorAll("[data-model]") ?? [])].find(
          (button) => button.getAttribute("data-model") === "sprinkles-5",
        ) as HTMLButtonElement | undefined;
        flagship?.click();
      });
      await page.waitForTimeout(240);

      const sweep = await page.evaluate(() => {
        const prompt = document.querySelector("nai-prompt-bar");
        const canvas = prompt?.shadowRoot?.querySelector("canvas") as HTMLCanvasElement | null;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return { opacity: null, visiblePixels: -1 };
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let visiblePixels = 0;
        for (let index = 3; index < pixels.length; index += 4) {
          if (pixels[index] > 0) visiblePixels += 1;
        }
        return { opacity: canvas.style.opacity, visiblePixels };
      });

      expect(sweep.opacity).toBe("1");
      expect(sweep.visiblePixels).toBeGreaterThan(0);
      expect(externalRequests).toEqual([]);
    } finally {
      await page.close();
    }
  }, 20_000);
});
