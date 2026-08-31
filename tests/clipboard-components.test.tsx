import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import ArtifactSandbox from "@/components/artifact-sandbox";
import CodeBlock from "@/components/code-block";
import SensitiveInput from "@/components/sensitive-input";

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);
const originalExecCommand = Object.getOwnPropertyDescriptor(
  document,
  "execCommand",
);

function useClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
  if (originalExecCommand) {
    Object.defineProperty(document, "execCommand", originalExecCommand);
  } else {
    Reflect.deleteProperty(document, "execCommand");
  }
});

describe("clipboard components", () => {
  test("copies the code shown by Artifact Sandbox", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    useClipboard(writeText);
    render(<ArtifactSandbox />);

    fireEvent.click(screen.getByRole("tab", { name: "Code" }));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining("export function MetricsWidget"),
      ),
    );
    expect(await screen.findByText("Copied")).not.toBeNull();
  });

  test("copies the current sensitive token and exposes its label", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    useClipboard(writeText);
    render(<SensitiveInput />);

    const input = screen.getByLabelText("DeepSeek API Token (Production)");
    fireEvent.change(input, { target: { value: "sk-updated-value" } });
    fireEvent.click(screen.getByRole("button", { name: "Copy token" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("sk-updated-value"),
    );
    expect(await screen.findByText("Copied!")).not.toBeNull();
  });

  test("copies the complete Code Block source", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    useClipboard(writeText);
    render(<CodeBlock />);

    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        expect.stringContaining("export async function churnBatch"),
      ),
    );
    expect(await screen.findByText("Copied")).not.toBeNull();
  });

  test("Code Block reports a rejected copy without showing success", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("permission denied")));
    render(<CodeBlock />);

    fireEvent.click(screen.getByRole("button", { name: "Copy code" }));

    expect(await screen.findByText("Copy failed")).not.toBeNull();
    expect(screen.queryByText("Copied")).toBeNull();
  });

  test("reports a rejected copy without showing success", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("permission denied")));
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn(() => false),
    });
    render(<ArtifactSandbox />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    expect(await screen.findByText("Copy failed")).not.toBeNull();
    expect(screen.queryByText("Copied")).toBeNull();
  });
});
