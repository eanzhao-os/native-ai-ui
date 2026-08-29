import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function listRelativeFiles(directory, prefix = "") {
  if (!existsSync(directory)) return [];

  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listRelativeFiles(path, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  return files.sort();
}

function listComponentStems(directory, extension) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name.slice(0, -extension.length))
    .sort();
}

function readRegistryStems(path) {
  if (!existsSync(path)) return [];
  return (readJson(path).items ?? []).map((item) => item.name).sort();
}

function readIndexStems(path) {
  if (!existsSync(path)) return [];
  const source = ts.createSourceFile(
    path,
    readFileSync(path, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  );
  const stems = new Set();

  for (const statement of source.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      statement.isTypeOnly ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }
    const match = statement.moduleSpecifier.text.match(
      /^\.\/components\/([^/]+)\.js$/,
    );
    if (match) stems.add(match[1]);
  }

  return [...stems].sort();
}

function setsEqual(left, right) {
  return left.length === right.length &&
    left.every((value, index) => value === right[index]);
}

export function validateRegistry(root) {
  const errors = [];
  const artifactRoot = resolve(root, "public", "r");
  const registryPath = resolve(root, "registry.json");
  const aggregatePath = resolve(artifactRoot, "registry.json");
  const registryBytes = readFileSync(registryPath);
  const items = JSON.parse(registryBytes.toString("utf8")).items ?? [];
  const names = new Set();

  if (
    !existsSync(aggregatePath) ||
    !registryBytes.equals(readFileSync(aggregatePath))
  ) {
    errors.push("public/r/registry.json differs from registry.json");
  }

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

export function validateRepository(root) {
  const errors = validateRegistry(root);
  const sourceRoot = resolve(root, "vanilla");
  const publicRoot = resolve(root, "public", "vanilla");
  const sourceFiles = listRelativeFiles(sourceRoot);
  const publicFiles = listRelativeFiles(publicRoot);
  const mirrorFiles = [...new Set([...sourceFiles, ...publicFiles])].sort();

  for (const relativePath of mirrorFiles) {
    const sourcePath = resolve(sourceRoot, relativePath);
    const publicPath = resolve(publicRoot, relativePath);
    if (
      !existsSync(sourcePath) ||
      !existsSync(publicPath) ||
      !readFileSync(sourcePath).equals(readFileSync(publicPath))
    ) {
      errors.push(
        `vanilla/${relativePath} differs from public/vanilla/${relativePath}`,
      );
    }
  }

  const componentStems = listComponentStems(resolve(root, "components"), ".tsx");
  const vanillaStems = listComponentStems(
    resolve(root, "vanilla", "components"),
    ".js",
  );
  const publicStems = listComponentStems(
    resolve(root, "public", "vanilla", "components"),
    ".js",
  );
  const registryStems = readRegistryStems(resolve(root, "registry.json"));
  const publicRegistryStems = readRegistryStems(
    resolve(root, "public", "r", "registry.json"),
  );
  const vanillaIndexStems = readIndexStems(
    resolve(root, "vanilla", "index.js"),
  );
  const publicIndexStems = readIndexStems(
    resolve(root, "public", "vanilla", "index.js"),
  );
  const inventories = [
    vanillaStems,
    publicStems,
    registryStems,
    publicRegistryStems,
    vanillaIndexStems,
    publicIndexStems,
  ];

  if (inventories.some((inventory) => !setsEqual(componentStems, inventory))) {
    errors.push(
      "component inventory differs: " +
        `components=${componentStems.length} ` +
        `vanilla=${vanillaStems.length} ` +
        `public=${publicStems.length} ` +
        `registry=${registryStems.length}`,
    );
  }

  return errors;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const rootFlag = process.argv.indexOf("--root");
  const root =
    rootFlag === -1 ? process.cwd() : resolve(process.argv[rootFlag + 1]);
  const errors = validateRepository(root);

  for (const error of errors) console.error(error);
  if (errors.length > 0) process.exitCode = 1;
}
