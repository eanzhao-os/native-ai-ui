import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import {
  extractSharedKeyframes,
  rewriteShadowSelectors,
} from "../scripts/build-vanilla-styles.mjs";

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

  test("keeps source and public generated styles identical", () => {
    expect(readFileSync(resolve("vanilla/core/styles.js")))
      .toEqual(readFileSync(resolve("public/vanilla/core/styles.js")));
  });
});
