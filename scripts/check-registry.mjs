import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function validateRegistry(root) {
  const errors = [];
  const artifactRoot = resolve(root, "public", "r");
  const items = readJson(resolve(root, "registry.json")).items ?? [];
  const names = new Set();

  for (const item of items) {
    if (names.has(item.name)) {
      errors.push(`${item.name}: duplicate registry name`);
    }
    names.add(item.name);

    const artifactPath = resolve(artifactRoot, `${item.name}.json`);
    if (!existsSync(artifactPath)) {
      errors.push(`${item.name}: missing public/r/${item.name}.json`);
      continue;
    }

    const artifact = readJson(artifactPath);
    for (const file of item.files ?? []) {
      const sourcePath = resolve(root, file.path);
      if (!existsSync(sourcePath)) {
        errors.push(`${item.name}: missing source ${file.path}`);
        continue;
      }

      const builtFile = (artifact.files ?? []).find(
        (candidate) =>
          candidate.path === file.path ||
          (file.target && candidate.target === file.target),
      );
      if (!builtFile) {
        errors.push(`${item.name}: artifact omits ${file.path}`);
      } else if (builtFile.content !== readFileSync(sourcePath, "utf8")) {
        errors.push(
          `${item.name}: ${file.path} embedded content differs from source`,
        );
      }
    }
  }

  if (existsSync(artifactRoot)) {
    for (const filename of readdirSync(artifactRoot)) {
      if (!filename.endsWith(".json") || filename === "registry.json") continue;
      const name = filename.slice(0, -5);
      if (!names.has(name)) errors.push(`${name}: orphan registry artifact`);
    }
  }

  return errors;
}

const rootFlag = process.argv.indexOf("--root");
const root =
  rootFlag === -1 ? process.cwd() : resolve(process.argv[rootFlag + 1]);
const errors = validateRegistry(root);

for (const error of errors) console.error(error);
if (errors.length > 0) process.exitCode = 1;
