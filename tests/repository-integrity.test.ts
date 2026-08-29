import {
  mkdirSync,
  mkdtempSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, test } from "vitest";
import { validateRepository } from "../scripts/check-registry.mjs";

function registryJson(name = "demo") {
  return JSON.stringify({
    items: [
      {
        name,
        files: [
          {
            path: "components/demo.tsx",
            target: "components/demo.tsx",
          },
        ],
      },
    ],
  });
}

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "native-ai-ui-repository-"));
  for (const directory of [
    ["components"],
    ["vanilla", "components"],
    ["public", "r"],
    ["public", "vanilla", "components"],
  ]) {
    mkdirSync(join(root, ...directory), { recursive: true });
  }

  const reactSource = "export default function Demo() { return null; }\n";
  const vanillaSource = "export class NaiDemo {}\n";
  const indexSource = 'export { NaiDemo } from "./components/demo.js";\n';
  const aggregateRegistry = registryJson();

  writeFileSync(join(root, "components", "demo.tsx"), reactSource);
  writeFileSync(join(root, "vanilla", "components", "demo.js"), vanillaSource);
  writeFileSync(
    join(root, "public", "vanilla", "components", "demo.js"),
    vanillaSource,
  );
  writeFileSync(join(root, "vanilla", "index.js"), indexSource);
  writeFileSync(join(root, "public", "vanilla", "index.js"), indexSource);
  writeFileSync(join(root, "registry.json"), aggregateRegistry);
  writeFileSync(
    join(root, "public", "r", "registry.json"),
    aggregateRegistry,
  );
  writeFileSync(
    join(root, "public", "r", "demo.json"),
    JSON.stringify({
      name: "demo",
      files: [
        {
          path: "components/demo.tsx",
          target: "components/demo.tsx",
          content: reactSource,
        },
      ],
    }),
  );

  return root;
}

describe("repository integrity checker", () => {
  test("rejects a Vanilla component whose public mirror differs", () => {
    const root = fixture();
    writeFileSync(
      join(root, "public", "vanilla", "components", "demo.js"),
      "export class NaiDemoStale {}\n",
    );

    expect(validateRepository(root)).toContain(
      "vanilla/components/demo.js differs from public/vanilla/components/demo.js",
    );
  });

  test("rejects missing Vanilla component inventories", () => {
    const root = fixture();
    rmSync(join(root, "vanilla", "components", "demo.js"));
    rmSync(join(root, "public", "vanilla", "components", "demo.js"));

    expect(validateRepository(root)).toContain(
      "component inventory differs: components=1 vanilla=0 public=0 registry=1",
    );
  });

  test("compares component stems when inventory counts are equal", () => {
    const root = fixture();
    renameSync(
      join(root, "vanilla", "components", "demo.js"),
      join(root, "vanilla", "components", "other.js"),
    );
    renameSync(
      join(root, "public", "vanilla", "components", "demo.js"),
      join(root, "public", "vanilla", "components", "other.js"),
    );

    expect(validateRepository(root)).toContain(
      "component inventory differs: components=1 vanilla=1 public=1 registry=1",
    );
  });

  test("compares root registry item stems", () => {
    const root = fixture();
    const alternateRegistry = registryJson("other");
    writeFileSync(join(root, "registry.json"), alternateRegistry);
    writeFileSync(
      join(root, "public", "r", "registry.json"),
      alternateRegistry,
    );

    expect(validateRepository(root)).toContain(
      "component inventory differs: components=1 vanilla=1 public=1 registry=1",
    );
  });

  test("compares public aggregate registry item stems", () => {
    const root = fixture();
    writeFileSync(
      join(root, "public", "r", "registry.json"),
      registryJson("other"),
    );

    expect(validateRepository(root)).toContain(
      "component inventory differs: components=1 vanilla=1 public=1 registry=1",
    );
  });

  test("compares the source Vanilla index imports", () => {
    const root = fixture();
    writeFileSync(
      join(root, "vanilla", "index.js"),
      'export { NaiOther } from "./components/other.js";\n',
    );

    expect(validateRepository(root)).toContain(
      "component inventory differs: components=1 vanilla=1 public=1 registry=1",
    );
  });

  test("compares the public Vanilla index imports", () => {
    const root = fixture();
    writeFileSync(
      join(root, "public", "vanilla", "index.js"),
      'export { NaiOther } from "./components/other.js";\n',
    );

    const errors = validateRepository(root);
    expect(errors).toContain(
      "vanilla/index.js differs from public/vanilla/index.js",
    );
    expect(errors).toContain(
      "component inventory differs: components=1 vanilla=1 public=1 registry=1",
    );
  });

  test("accepts a consistent inventory without requiring 48 components", () => {
    expect(validateRepository(fixture())).toEqual([]);
  });

  test("accepts the real repository inventory", () => {
    expect(validateRepository(resolve("."))).toEqual([]);
  });
});
