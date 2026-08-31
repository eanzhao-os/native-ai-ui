import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import CordisPluginTree from "@/components/cordis-plugin-tree";
import JobScheduler from "@/components/job-scheduler";
import LspDiagnostics from "@/components/lsp-diagnostics";
import McpServers from "@/components/mcp-servers";
import PermissionPresetCard from "@/components/permission-preset-card";
import SandboxManager from "@/components/sandbox-manager";

function controlledElement(control: HTMLElement) {
  const id = control.getAttribute("aria-controls");
  expect(id).toBeTruthy();
  const target = document.getElementById(id!);
  expect(target).not.toBeNull();
  return target!;
}

function expectInsetAccentFocusIndicator(control: HTMLElement) {
  const classes = control.getAttribute("class")?.split(/\s+/) ?? [];
  expect(classes).toContain(
    "focus-visible:shadow-[inset_0_0_0_2px_var(--accent)]",
  );
  expect(classes).not.toContain("focus-visible:ring-inset");
}

async function advance(milliseconds: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
}

afterEach(() => {
  vi.useRealTimers();
});

describe("CordisPluginTree", () => {
  test("uses real disclosure controls for plugin service topology", () => {
    render(<CordisPluginTree />);

    const cordis = screen.getByRole("button", {
      name: "Service topology: Cordis.Hmr",
    });
    const deepseek = screen.getByRole("button", {
      name: "Service topology: Harness.Llm.DeepSeek",
    });
    expect(cordis.getAttribute("aria-expanded")).toBe("true");
    expect(deepseek.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(cordis).hidden).toBe(false);
    expect(controlledElement(deepseek).hidden).toBe(true);

    fireEvent.click(cordis);
    expect(cordis.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(cordis).hidden).toBe(true);

    deepseek.focus();
    fireEvent.click(deepseek);
    expect(deepseek.getAttribute("aria-expanded")).toBe("true");
    expect(controlledElement(deepseek).hidden).toBe(false);
    expect(document.activeElement).toBe(deepseek);
  });

  test("keeps disclosure targets unique across component instances", () => {
    render(
      <>
        <CordisPluginTree />
        <CordisPluginTree />
      </>,
    );

    const controls = screen.getAllByRole("button", {
      name: /Service topology:/,
    });
    const ids = controls.map((control) => control.getAttribute("aria-controls"));
    expect(new Set(ids).size).toBe(ids.length);
    for (const control of controls) controlledElement(control);
  });
});

describe("PermissionPresetCard", () => {
  test("selects a permission preset through an accessible radio group", () => {
    render(<PermissionPresetCard />);

    const group = screen.getByRole("radiogroup", {
      name: "Permission presets",
    });
    const balanced = within(group).getByRole("radio", {
      name: /Balanced Dev/,
    }) as HTMLInputElement;
    const strict = within(group).getByRole("radio", {
      name: /Strict Sandboxed/,
    }) as HTMLInputElement;
    expect(balanced.checked).toBe(true);
    expect(strict.checked).toBe(false);

    strict.focus();
    fireEvent.click(strict);

    expect(strict.checked).toBe(true);
    expect(balanced.checked).toBe(false);
    expect(document.activeElement).toBe(strict);
    expect(screen.getByRole("status").textContent).toContain(
      "Selected Strict Sandboxed",
    );
  });

  test("localizes the preset group and selection announcement", () => {
    render(<PermissionPresetCard lang="zh" />);

    const group = screen.getByRole("radiogroup", { name: "权限预设" });
    fireEvent.click(
      within(group).getByRole("radio", { name: /严格沙盒隔离/ }),
    );
    expect(screen.getByRole("status").textContent).toContain(
      "已选择严格沙盒隔离",
    );
  });

  test("keeps the audit action name stable while verification is pending", () => {
    vi.useFakeTimers();
    render(<PermissionPresetCard />);

    const replay = screen.getByRole("button", { name: "Replay Audit" });
    fireEvent.click(replay);

    expect(screen.getByRole("button", { name: "Replay Audit" })).toBe(replay);
    expect(replay.getAttribute("aria-busy")).toBe("true");
  });
});

describe("LspDiagnostics", () => {
  test("disables a fix while pending, removes the diagnostic, and recovers focus", async () => {
    vi.useFakeTimers();
    render(<LspDiagnostics />);

    const fix = screen.getByRole("button", { name: "Auto-Fix CS0103" });
    fix.focus();
    fireEvent.click(fix);

    expect(fix.hasAttribute("disabled")).toBe(true);
    expect(fix.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("status").textContent).toContain("Fixing CS0103");

    await advance(600);

    expect(screen.queryByText("CS0103")).toBeNull();
    const nextFix = screen.getByRole("button", { name: "Auto-Fix CS8618" });
    expect(document.activeElement).toBe(nextFix);
    expect(screen.getByRole("status").textContent).toContain("Fixed CS0103");
    expect(screen.getByText("2 issues in scope")).not.toBeNull();
  });

  test("serializes fixes while one diagnostic is pending", async () => {
    vi.useFakeTimers();
    render(<LspDiagnostics />);

    const firstFix = screen.getByRole("button", { name: "Auto-Fix CS0103" });
    const secondFix = screen.getByRole("button", { name: "Auto-Fix CS8618" });
    fireEvent.click(firstFix);

    expect(firstFix.hasAttribute("disabled")).toBe(true);
    expect(secondFix.hasAttribute("disabled")).toBe(true);
    fireEvent.click(secondFix);

    await advance(600);

    expect(screen.queryByText("CS0103")).toBeNull();
    expect(screen.getByText("CS8618")).not.toBeNull();
    await advance(600);
    expect(screen.getByText("CS8618")).not.toBeNull();
  });

  test("recovers focus from the latest visible diagnostics after a filter change", async () => {
    vi.useFakeTimers();
    render(<LspDiagnostics />);

    fireEvent.click(screen.getByRole("button", { name: "Warnings" }));
    const warningFix = screen.getByRole("button", { name: "Auto-Fix CS8618" });
    warningFix.focus();
    fireEvent.click(warningFix);
    fireEvent.click(screen.getByRole("button", { name: "Errors" }));

    await advance(600);

    const visibleFix = screen.getByRole("button", { name: "Auto-Fix CS0103" });
    expect(document.activeElement).toBe(visibleFix);
    expect(screen.queryByText("CS8618")).toBeNull();
  });

  test("exposes selected diagnostic filters and localized source positions", () => {
    render(<LspDiagnostics lang="zh" />);

    const warnings = screen.getByRole("button", { name: "警告" });
    expect(warnings.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(warnings);
    expect(warnings.getAttribute("aria-pressed")).toBe("true");
    expect(screen.queryByText("CS0103")).toBeNull();
    expect(screen.getByText("行 22 · 列 29")).not.toBeNull();
  });
});

describe("SandboxManager", () => {
  test("expands and collapses process details through a controlled disclosure", () => {
    render(<SandboxManager />);

    const process = screen.getByRole("button", {
      name: /Process 1402: dotnet run --project src\/Harness\.Boot/,
    });
    expect(process.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(process).hidden).toBe(true);

    process.focus();
    fireEvent.click(process);
    expect(process.getAttribute("aria-expanded")).toBe("true");
    expect(controlledElement(process).hidden).toBe(false);
    expect(within(controlledElement(process)).getByText("8m 12s")).not.toBeNull();
    expect(document.activeElement).toBe(process);

    fireEvent.click(process);
    expect(process.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(process).hidden).toBe(true);
  });

  test("uses an unambiguous inset accent focus indicator for process disclosures", () => {
    render(<SandboxManager />);

    const process = screen.getByRole("button", {
      name: /Process 1402: dotnet run --project src\/Harness\.Boot/,
    });
    process.focus();

    expect(document.activeElement).toBe(process);
    expectInsetAccentFocusIndicator(process);
  });

  test("reports resource meters and localized process disclosure names", () => {
    render(<SandboxManager lang="zh" />);

    expect(
      screen.getByRole("progressbar", { name: "vCPU 算力利用率" })
        .getAttribute("aria-valuenow"),
    ).toBe("15.5");
    expect(
      screen.getByRole("progressbar", { name: "内存占用" })
        .getAttribute("aria-valuemax"),
    ).toBe("2048");
    expect(
      screen.getByRole("button", {
        name: /进程 1402：dotnet run --project src\/Harness\.Boot/,
      }),
    ).not.toBeNull();
  });

  test("keeps the restart action name stable while the container is busy", () => {
    vi.useFakeTimers();
    render(<SandboxManager />);

    const restart = screen.getByRole("button", { name: "Restart Container" });
    fireEvent.click(restart);

    expect(screen.getByRole("button", { name: "Restart Container" })).toBe(
      restart,
    );
    expect(restart.getAttribute("aria-busy")).toBe("true");
  });
});

describe("JobScheduler", () => {
  test("exposes honest enable and trigger controls with durable job state", async () => {
    vi.useFakeTimers();
    render(<JobScheduler />);

    const firstJob = screen.getByRole("listitem", {
      name: "Vector Embeddings Sync & Reindex",
    });
    const enabled = within(firstJob).getByRole("button", {
      name: "Job enabled: Vector Embeddings Sync & Reindex",
    });
    const trigger = within(firstJob).getByRole("button", {
      name: "Trigger Vector Embeddings Sync & Reindex",
    });
    expect(enabled.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(enabled);
    expect(enabled.getAttribute("aria-pressed")).toBe("false");
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("2 active jobs")).not.toBeNull();

    fireEvent.click(enabled);
    fireEvent.click(trigger);
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.getAttribute("aria-busy")).toBe("true");
    expect(within(firstJob).getByText("Running")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Running Vector Embeddings Sync & Reindex now",
    );

    await advance(1200);

    expect(trigger.hasAttribute("disabled")).toBe(false);
    expect(within(firstJob).getByText("Success")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Vector Embeddings Sync & Reindex completed successfully",
    );
  });

  test("does not offer a duplicate trigger for an already-running job", () => {
    render(<JobScheduler />);

    expect(
      screen
        .getByRole("button", { name: "Trigger Telemetry Batch Export & Rollup" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});

describe("McpServers", () => {
  test("uses controlled server disclosures and tool lists", () => {
    render(<McpServers />);

    const filesystem = screen.getByRole("button", {
      name: "Server filesystem",
    });
    const ripgrep = screen.getByRole("button", { name: "Server ripgrep" });
    expect(filesystem.getAttribute("aria-expanded")).toBe("true");
    expect(ripgrep.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(filesystem).hidden).toBe(false);
    expect(controlledElement(ripgrep).hidden).toBe(true);
    expect(
      within(controlledElement(filesystem)).getAllByRole("listitem"),
    ).toHaveLength(3);

    fireEvent.click(ripgrep);
    expect(ripgrep.getAttribute("aria-expanded")).toBe("true");
    expect(controlledElement(ripgrep).hidden).toBe(false);
    expect(
      within(controlledElement(ripgrep)).getByText("ripgrep__search"),
    ).not.toBeNull();
  });

  test("uses an unambiguous inset accent focus indicator for server disclosures", () => {
    render(<McpServers />);

    const ripgrep = screen.getByRole("button", { name: "Server ripgrep" });
    ripgrep.focus();

    expect(document.activeElement).toBe(ripgrep);
    expectInsetAccentFocusIndicator(ripgrep);
  });

  test("keeps the retry action stable and moves focus to the disclosure while busy", async () => {
    vi.useFakeTimers();
    render(<McpServers />);

    const web = screen.getByRole("button", { name: "Server web-fetch" });
    fireEvent.click(web);
    const region = controlledElement(web);
    const retry = within(region).getByRole("button", {
      name: "Retry web-fetch",
    }) as HTMLButtonElement;
    retry.focus();
    fireEvent.click(retry);

    expect(within(region).getByRole("button", { name: "Retry web-fetch" })).toBe(
      retry,
    );
    expect(retry.disabled).toBe(true);
    expect(retry.getAttribute("aria-busy")).toBe("true");
    expect(document.activeElement).toBe(web);

    await advance(1600);

    expect(within(region).queryByRole("button", { name: "Retry web-fetch" })).toBeNull();
    expect(document.activeElement).toBe(web);
  });

  test("retries the failed server without nesting controls and announces recovery", async () => {
    vi.useFakeTimers();
    render(<McpServers />);

    const web = screen.getByRole("button", { name: "Server web-fetch" });
    fireEvent.click(web);
    const region = controlledElement(web);
    const retry = within(region).getByRole("button", {
      name: "Retry web-fetch",
    });
    expect(web.contains(retry)).toBe(false);

    fireEvent.click(retry);
    expect(web.getAttribute("aria-expanded")).toBe("true");
    expect(region.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("status").textContent).toContain(
      "Reconnecting web-fetch",
    );

    await advance(1600);

    expect(region.getAttribute("aria-busy")).toBe("false");
    expect(within(region).getByText("web-fetch__get")).not.toBeNull();
    expect(screen.getByText("3/3 · 7 tools")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "web-fetch connected with 2 tools",
    );
  });
});
