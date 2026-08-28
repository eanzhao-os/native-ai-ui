import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MessageBranches from "@/components/message-branches";

describe("MessageBranches", () => {
  test("navigates branches and disables the previous boundary", () => {
    render(<MessageBranches />);

    fireEvent.click(screen.getByRole("button", { name: "Previous branch" }));

    expect(screen.getByText("1 / 3")).not.toBeNull();
    expect(
      screen
        .getByRole("button", { name: "Previous branch" })
        .hasAttribute("disabled"),
    ).toBe(true);
    expect(screen.getByText("GPT-5.2 · 10:41")).not.toBeNull();
  });

  test("continues from the selected branch and clears after navigation", () => {
    render(<MessageBranches />);

    fireEvent.click(
      screen.getByRole("button", { name: "Continue from this branch" }),
    );
    expect(screen.getByText("Continuing from branch 2")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Next branch" }));
    expect(screen.queryByText("Continuing from branch 2")).toBeNull();
  });

  test("renders Chinese navigation names", () => {
    render(<MessageBranches lang="zh" />);

    expect(screen.getByRole("button", { name: "上一个分支" })).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "从此分支继续" }),
    ).not.toBeNull();
  });
});
