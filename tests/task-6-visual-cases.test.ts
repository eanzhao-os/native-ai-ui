import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { buildCaseInventory } from "../scripts/visual-parity.mjs";
import { CASES } from "./visual/cases.mjs";

const TASK6_COMPONENTS = [
  "subagent-tree",
  "agent-teams",
  "task-rows",
  "tool-chips",
  "approval-card",
  "clarification-card",
  "message-branches",
] as const;

const EXPECTED_CASES = {
  "subagent-tree": ["running-expanded", "completed-expanded", "focused"],
  "agent-teams": ["initial", "handoff", "completed"],
  "task-rows": ["initial", "details", "failed", "completed", "focused"],
  "tool-chips": ["settled", "detail-open", "collapsed", "focused"],
  "approval-card": ["custom-answer", "multi-select", "submitted", "focused"],
  "clarification-card": ["initial", "alternate", "submitted", "focused"],
  "message-branches": ["first", "last", "continued", "focused"],
} as const;

function markedSource(source: string, startMarker: string, endMarker: string) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end <= start) return "";
  return source.slice(start, end + endMarker.length);
}

describe("Task 6 React visual cases", () => {
  test("defines every reviewed Agentic & Teams state explicitly", () => {
    for (const component of TASK6_COMPONENTS) {
      expect(CASES.get(component)?.map(({ name }) => name)).toEqual(
        EXPECTED_CASES[component],
      );
    }

    const inventory = buildCaseInventory({
      componentIds: [...TASK6_COMPONENTS],
      themes: ["light", "dark"],
      locales: ["en", "zh"],
    });
    expect(inventory).toHaveLength(27 * 2 * 2);
  });

  test("keeps every interactive Task 6 state backed by a real action", () => {
    const staticCases = new Set([
      "subagent-tree/running-expanded",
      "agent-teams/initial",
      "task-rows/initial",
      "clarification-card/initial",
    ]);

    for (const component of TASK6_COMPONENTS) {
      for (const visualCase of CASES.get(component) ?? []) {
        const key = `${component}/${visualCase.name}`;
        expect(typeof visualCase.action === "function").toBe(
          !staticCases.has(key),
        );
      }
    }
  });

  test("uses keyboard modality for focused states", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const actions = markedSource(
      source,
      "/* TASK 6 VISUAL ACTIONS START */",
      "/* TASK 6 VISUAL ACTIONS END */",
    );

    expect(actions).not.toBe("");
    expect(actions).toContain("await control.focus();");
    expect(actions).toContain('keyboard.press("Shift+Tab")');
    expect(actions).toContain('keyboard.press("Tab")');
    expect(actions).toContain('locator(":focus-visible")');
  });

  test("drives controls without DOM rewriting, hiding, or style normalization", () => {
    const source = readFileSync(resolve("tests/visual/cases.mjs"), "utf8");
    const actions = markedSource(
      source,
      "/* TASK 6 VISUAL ACTIONS START */",
      "/* TASK 6 VISUAL ACTIONS END */",
    );
    const registrations = markedSource(
      source,
      "/* TASK 6 VISUAL REGISTRATIONS START */",
      "/* TASK 6 VISUAL REGISTRATIONS END */",
    );

    expect(actions).not.toBe("");
    expect(registrations).not.toBe("");

    const guarded = `${actions}\n${registrations}`;
    const forbidden = [
      ["DOM evaluation", /\.(?:evaluate|evaluateHandle)\s*\(/],
      ["DOM rewrite", /\b(?:innerHTML|outerHTML|textContent|innerText)\b\s*=/],
      [
        "node replacement",
        /\.(?:replaceChildren|replaceChild|replaceWith|remove|removeChild|append|appendChild|prepend|before|after)\s*\(/,
      ],
      ["style mutation", /(?:\.style\b|\.classList\b|setProperty\s*\()/],
      [
        "stabilization helper",
        /stabilize[A-Z]|freezeCaseMotion|canonicalize|hideMatching|replaceWithCanonical/,
      ],
    ] as const;

    expect(
      forbidden
        .filter(([, pattern]) => pattern.test(guarded))
        .map(([label]) => label),
    ).toEqual([]);
  });
});
