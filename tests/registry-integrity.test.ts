import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";

const checker = resolve("scripts/check-registry.mjs");

function fixture(embeddedContent: string) {
  const root = mkdtempSync(join(tmpdir(), "native-ai-ui-registry-"));
  mkdirSync(join(root, "components"), { recursive: true });
  mkdirSync(join(root, "public", "r"), { recursive: true });
  writeFileSync(join(root, "components", "demo.tsx"), "export default 1;\n");
  writeFileSync(
    join(root, "registry.json"),
    JSON.stringify({
      items: [
        {
          name: "demo",
          files: [
            {
              path: "components/demo.tsx",
              target: "components/demo.tsx",
            },
          ],
        },
      ],
    }),
  );
  writeFileSync(
    join(root, "public", "r", "demo.json"),
    JSON.stringify({
      name: "demo",
      files: [
        {
          path: "components/demo.tsx",
          target: "components/demo.tsx",
          content: embeddedContent,
        },
      ],
    }),
  );
  return root;
}

describe("registry integrity checker", () => {
  test("rejects an artifact whose embedded source is stale", () => {
    const result = spawnSync(
      process.execPath,
      [checker, "--root", fixture("export default 0;\n")],
      { encoding: "utf8" },
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "demo: components/demo.tsx embedded content differs from source",
    );
  });

  test("accepts an artifact that embeds the current source", () => {
    const result = spawnSync(
      process.execPath,
      [checker, "--root", fixture("export default 1;\n")],
      { encoding: "utf8" },
    );

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
  });
});
