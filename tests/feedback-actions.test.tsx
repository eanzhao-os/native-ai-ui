import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import FeedbackActions from "@/components/feedback-actions";

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

function useLegacyCopy(result: boolean) {
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value: vi.fn(() => result),
  });
}

afterEach(() => {
  vi.useRealTimers();
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

describe("FeedbackActions", () => {
  test("mounts deterministic rating and copy-error visual cases", () => {
    const liked = render(<FeedbackActions visualCase="liked" />);
    expect(
      screen.getByRole("button", { name: "Good response" }).getAttribute("aria-pressed"),
    ).toBe("true");

    liked.unmount();
    const disliked = render(<FeedbackActions visualCase="disliked" />);
    expect(
      screen.getByRole("button", { name: "Bad response" }).getAttribute("aria-pressed"),
    ).toBe("true");

    disliked.unmount();
    render(<FeedbackActions visualCase="copy-error" />);
    expect(screen.getByText("Copy failed")).not.toBeNull();
  });

  test("keeps positive and negative ratings exclusive and reversible", () => {
    render(<FeedbackActions />);

    const up = screen.getByRole("button", { name: "Good response" });
    const down = screen.getByRole("button", { name: "Bad response" });

    fireEvent.click(up);
    expect(up.getAttribute("aria-pressed")).toBe("true");
    expect(down.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(down);
    expect(up.getAttribute("aria-pressed")).toBe("false");
    expect(down.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(down);
    expect(up.getAttribute("aria-pressed")).toBe("false");
    expect(down.getAttribute("aria-pressed")).toBe("false");
  });

  test("shows copy success only after the Clipboard API succeeds", async () => {
    useClipboard(vi.fn().mockResolvedValue(undefined));
    useLegacyCopy(false);
    render(<FeedbackActions />);

    fireEvent.click(screen.getByRole("button", { name: "Copy response" }));

    expect(await screen.findByText("Copied")).not.toBeNull();
    expect(screen.queryByText("Copy failed")).toBeNull();
  });

  test("uses the legacy fallback when the Clipboard API is denied", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    useLegacyCopy(true);
    render(<FeedbackActions />);

    fireEvent.click(screen.getByRole("button", { name: "Copy response" }));

    expect(await screen.findByText("Copied")).not.toBeNull();
    expect(screen.queryByText("Copy failed")).toBeNull();
  });

  test("shows localized failure only after both copy paths fail", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    useLegacyCopy(false);
    render(<FeedbackActions lang="zh" />);

    fireEvent.click(screen.getByRole("button", { name: "复制回复" }));

    expect(await screen.findByText("复制失败")).not.toBeNull();
    expect(screen.queryByText("已复制")).toBeNull();
  });

  test("never claims a copy from the demo timer", () => {
    vi.useFakeTimers();
    render(<FeedbackActions />);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.queryByText("Copied")).toBeNull();
    expect(screen.queryByText("Copy failed")).toBeNull();
  });
});
