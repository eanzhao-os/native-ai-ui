import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { validateRegistry } from "../scripts/check-registry.mjs";

function fixture(embeddedContent: string) {
  const root = mkdtempSync(join(tmpdir(), "native-ai-ui-registry-"));
  mkdirSync(join(root, "components"), { recursive: true });
  mkdirSync(join(root, "public", "r"), { recursive: true });
  writeFileSync(join(root, "components", "demo.tsx"), "export default 1;\n");

  const registry = {
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
  };
  const registryJson = JSON.stringify(registry);
  writeFileSync(join(root, "registry.json"), registryJson);
  writeFileSync(join(root, "public", "r", "registry.json"), registryJson);
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
  return { root, registry };
}

describe("registry integrity checker", () => {
  test("rejects an artifact whose embedded source is stale", () => {
    const { root } = fixture("export default 0;\n");

    expect(validateRegistry(root)).toContain(
      "demo: components/demo.tsx embedded content differs from source",
    );
  });

  test("accepts an artifact that embeds the current source", () => {
    const { root } = fixture("export default 1;\n");

    expect(validateRegistry(root)).toEqual([]);
  });

  test("rejects semantic drift in the aggregate registry", () => {
    const { root } = fixture("export default 1;\n");
    writeFileSync(
      join(root, "public", "r", "registry.json"),
      JSON.stringify({ items: [] }),
    );

    expect(validateRegistry(root)).toContain(
      "public/r/registry.json differs from registry.json",
    );
  });

  test("rejects byte drift in a semantically equal aggregate registry", () => {
    const { root, registry } = fixture("export default 1;\n");
    writeFileSync(
      join(root, "public", "r", "registry.json"),
      JSON.stringify(registry, null, 2),
    );

    expect(validateRegistry(root)).toContain(
      "public/r/registry.json differs from registry.json",
    );
  });
});
