export const DEFAULT_CASE = Object.freeze({
  name: "settled",
  advanceMs: 2600,
});

export const CASES = new Map([
  [
    "code-block",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 2600 },
    ],
  ],
  [
    "loading-state",
    [
      { name: "initial", advanceMs: 0 },
      { name: "elapsed", advanceMs: 2600 },
    ],
  ],
]);

export function casesForComponent(componentId) {
  return CASES.get(componentId) ?? [DEFAULT_CASE];
}
