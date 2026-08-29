#!/usr/bin/env node

import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { startStaticServer } from "./serve-static.mjs";
import {
  exitCodeForReport,
  parseRunnerArgs,
  repositoryRoot,
  runVisualParity,
  VISUAL_ARTIFACT_DIRECTORY,
  writeVisualReports,
} from "./visual-parity.mjs";

const PRODUCTION_BASE_PATH = "/native-ai-ui";
const DEFAULT_VISUAL_PORT = 3848;

function fatalReport(error, args, baseUrl = null) {
  const reactOnly = args.includes("--react-only");
  return {
    baseUrl,
    fatalError: error instanceof Error ? error.message : String(error),
    filters: null,
    generatedAt: new Date().toISOString(),
    mode: reactOnly ? "react-only" : "parity",
    results: [],
    summary: { failed: 0, passed: 0, total: 0 },
  };
}

export async function main(args = process.argv.slice(2)) {
  const artifactDir = VISUAL_ARTIFACT_DIRECTORY;
  rmSync(artifactDir, { force: true, recursive: true });

  let runningServer;
  let report;
  let baseUrl = null;
  try {
    const options = parseRunnerArgs(args);
    baseUrl = options.baseUrl ?? null;
    if (!baseUrl) {
      const outputRoot = resolve(repositoryRoot, "out");
      if (!existsSync(resolve(outputRoot, "index.html"))) {
        throw new Error(
          `Static export is missing at ${outputRoot}; run npm run build first`,
        );
      }
      runningServer = await startStaticServer({
        basePath: PRODUCTION_BASE_PATH,
        port: DEFAULT_VISUAL_PORT,
        root: outputRoot,
      });
      baseUrl = `${runningServer.baseUrl}${PRODUCTION_BASE_PATH}`;
    }

    report = await runVisualParity({
      artifactDir,
      baseUrl,
      componentIds: options.componentIds,
      locales: options.locales,
      reactOnly: options.reactOnly,
      themes: options.themes,
    });
  } catch (error) {
    report = fatalReport(error, args, baseUrl);
  } finally {
    try {
      await runningServer?.close();
    } catch (error) {
      if (!report?.fatalError) {
        report = fatalReport(error, args, baseUrl);
      }
    }
  }

  writeVisualReports(artifactDir, report);
  const exitCode = exitCodeForReport(report);
  console.log(
    `Visual ${report.mode} ${exitCode === 0 ? "passed" : "failed"}: ` +
      `${report.summary.passed}/${report.summary.total} cases`,
  );
  console.log(`Report: ${resolve(artifactDir, "report.html")}`);
  return exitCode;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  process.exitCode = await main();
}
