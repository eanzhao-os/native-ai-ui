#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { normalizeBasePath, startStaticServer } from "./serve-static.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function readRegistryComponentIds(
  registryPath = resolve(repositoryRoot, "registry.json"),
) {
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  return (registry.items ?? []).map(({ name }) => name).sort();
}

function decodeHtmlAttribute(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

export function extractNextAssetPaths(html, basePath = "/native-ai-ui") {
  const normalizedBasePath = normalizeBasePath(basePath);
  const allowedPrefixes = ["/_next/"];
  if (normalizedBasePath) {
    allowedPrefixes.push(`${normalizedBasePath}/_next/`);
  }

  const paths = new Set();
  const attributePattern = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const value = decodeHtmlAttribute(match[1]);
    let url;
    try {
      url = new URL(value, "http://pages-smoke.invalid");
    } catch {
      continue;
    }
    if (allowedPrefixes.some((prefix) => url.pathname.startsWith(prefix))) {
      paths.add(`${url.pathname}${url.search}`);
    }
  }
  return [...paths].sort();
}

async function fetchOk(origin, path) {
  let response;
  try {
    response = await fetch(new URL(path, origin));
  } catch (error) {
    throw new Error(
      `${path} request failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  if (response.status !== 200) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response;
}

export async function runPagesSmoke({
  root = resolve(repositoryRoot, "out"),
  basePath = "/native-ai-ui",
  componentIds = readRegistryComponentIds(),
} = {}) {
  const normalizedBasePath = normalizeBasePath(basePath);
  const running = await startStaticServer({
    basePath: normalizedBasePath,
    port: 0,
    root,
  });
  const checked = [];

  try {
    const homepagePath = `${normalizedBasePath}/` || "/";
    const homepageResponse = await fetchOk(running.baseUrl, homepagePath);
    checked.push(homepagePath);
    const homepage = await homepageResponse.text();

    const requiredPaths = [
      `${normalizedBasePath}/vanilla/index.js`,
      `${normalizedBasePath}/vanilla/tokens.css`,
      `${normalizedBasePath}/r/registry.json`,
      ...componentIds.map((name) => `${normalizedBasePath}/r/${name}.json`),
      ...extractNextAssetPaths(homepage, normalizedBasePath),
    ];

    for (const path of [...new Set(requiredPaths)]) {
      await fetchOk(running.baseUrl, path);
      checked.push(path);
    }

    return {
      baseUrl: `${running.baseUrl}${normalizedBasePath}`,
      checked,
      ok: true,
    };
  } finally {
    await running.close();
  }
}

async function main() {
  const result = await runPagesSmoke();
  console.log(`Pages smoke passed (${result.checked.length} URLs)`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
