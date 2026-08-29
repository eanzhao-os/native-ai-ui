#!/usr/bin/env node

import {
  createReadStream,
  existsSync,
  realpathSync,
  statSync,
} from "node:fs";
import { createServer } from "node:http";
import { extname, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const MIME_TYPES = new Map([
  [".html", "text/html; charset=utf-8"],
  [".htm", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
  [".ttf", "font/ttf"],
  [".otf", "font/otf"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
]);

export function normalizeBasePath(basePath = "") {
  if (!basePath || basePath === "/") return "";
  const withLeadingSlash = basePath.startsWith("/")
    ? basePath
    : `/${basePath}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

function notFound(response) {
  response.writeHead(404, {
    "content-type": "text/plain; charset=utf-8",
  });
  response.end("Not found\n");
}

function resolvedRequestPath(requestUrl, root, basePath) {
  let pathname;
  try {
    pathname = new URL(requestUrl ?? "/", "http://static.invalid").pathname;
  } catch {
    return null;
  }

  if (
    basePath &&
    pathname !== basePath &&
    !pathname.startsWith(`${basePath}/`)
  ) {
    return null;
  }

  const withoutBasePath = basePath ? pathname.slice(basePath.length) : pathname;
  let decoded;
  try {
    decoded = decodeURIComponent(withoutBasePath || "/");
  } catch {
    return null;
  }

  if (decoded.includes("\0") || decoded.includes("\\")) return null;
  const segments = decoded.split("/");
  if (segments.some((segment) => segment === "..")) return null;

  let relativePath = decoded.replace(/^\/+/, "");
  if (!relativePath || decoded.endsWith("/")) {
    relativePath = `${relativePath}index.html`;
  }

  const rootPath = resolve(root);
  let candidate = resolve(rootPath, relativePath);
  if (candidate !== rootPath && !candidate.startsWith(`${rootPath}${sep}`)) {
    return null;
  }

  if (!existsSync(candidate)) return null;
  if (statSync(candidate).isDirectory()) candidate = resolve(candidate, "index.html");
  if (!existsSync(candidate) || !statSync(candidate).isFile()) return null;

  const realRoot = realpathSync(rootPath);
  const realCandidate = realpathSync(candidate);
  if (
    realCandidate !== realRoot &&
    !realCandidate.startsWith(`${realRoot}${sep}`)
  ) {
    return null;
  }

  return realCandidate;
}

export function createStaticServer({ root, basePath = "" }) {
  if (!root) throw new Error("Static server requires --root");
  const rootPath = resolve(root);
  if (!existsSync(rootPath) || !statSync(rootPath).isDirectory()) {
    throw new Error(`Static root does not exist: ${rootPath}`);
  }
  const normalizedBasePath = normalizeBasePath(basePath);

  return createServer((request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, {
        allow: "GET, HEAD",
        "content-type": "text/plain; charset=utf-8",
      });
      response.end("Method not allowed\n");
      return;
    }

    const filePath = resolvedRequestPath(
      request.url,
      rootPath,
      normalizedBasePath,
    );
    if (!filePath) {
      notFound(response);
      return;
    }

    const contentType =
      MIME_TYPES.get(extname(filePath).toLowerCase()) ??
      "application/octet-stream";
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-length": statSync(filePath).size,
      "content-type": contentType,
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    createReadStream(filePath).pipe(response);
  });
}

export async function startStaticServer({
  root,
  port = 3848,
  basePath = "",
  host = "127.0.0.1",
}) {
  const server = createStaticServer({ root, basePath });
  await new Promise((resolveListen, rejectListen) => {
    const onError = (error) => {
      server.off("listening", onListening);
      rejectListen(error);
    };
    const onListening = () => {
      server.off("error", onError);
      resolveListen();
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, host);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Static server did not expose a TCP address");
  }

  let closed = false;
  return {
    basePath: normalizeBasePath(basePath),
    baseUrl: `http://${host}:${address.port}`,
    port: address.port,
    server,
    async close() {
      if (closed) return;
      closed = true;
      await new Promise((resolveClose, rejectClose) => {
        server.close((error) => {
          if (error) rejectClose(error);
          else resolveClose();
        });
      });
    },
  };
}

function parseStaticServerArgs(args) {
  const options = {
    basePath: "",
    port: 3848,
    root: resolve("out"),
  };
  for (let index = 0; index < args.length; index += 1) {
    const raw = args[index];
    const equals = raw.indexOf("=");
    const flag = equals === -1 ? raw : raw.slice(0, equals);
    const inlineValue = equals === -1 ? undefined : raw.slice(equals + 1);
    const value = () => {
      if (inlineValue !== undefined) return inlineValue;
      index += 1;
      if (index >= args.length) throw new Error(`${flag} requires a value`);
      return args[index];
    };

    if (flag === "--root") options.root = resolve(value());
    else if (flag === "--port") options.port = Number(value());
    else if (flag === "--base-path") options.basePath = value();
    else throw new Error(`Unknown option: ${raw}`);
  }
  if (!Number.isInteger(options.port) || options.port < 0 || options.port > 65535) {
    throw new Error(`Invalid port: ${options.port}`);
  }
  return options;
}

async function main() {
  const options = parseStaticServerArgs(process.argv.slice(2));
  const running = await startStaticServer(options);
  console.log(
    `Serving ${relative(process.cwd(), resolve(options.root)) || "."} at ` +
      `${running.baseUrl}${running.basePath || "/"}`,
  );

  const stop = async () => {
    await running.close();
    process.exitCode = 0;
  };
  process.once("SIGINT", stop);
  process.once("SIGTERM", stop);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
