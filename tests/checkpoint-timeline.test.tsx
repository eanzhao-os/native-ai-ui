import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CheckpointTimeline from "@/components/checkpoint-timeline";

describe("CheckpointTimeline", () => {
  test("requires confirmation and supports cancellation", () => {
    render(<CheckpointTimeline />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select checkpoint Before edits" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Restore checkpoint" }),
    );

    expect(screen.getByText("Restore “Before edits”?")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Cancel restore" }));
    expect(screen.queryByText("Restore “Before edits”?")).toBeNull();
  });

  test("restores the selection and disables restoring it again", () => {
    render(<CheckpointTimeline />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select checkpoint Before edits" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Restore checkpoint" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Confirm restore" }));

    expect(screen.getByText("Restored “Before edits”")).not.toBeNull();
    expect(
      screen
        .getByRole("button", { name: "Current checkpoint" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });

  test("renders Chinese restore controls", () => {
    render(<CheckpointTimeline lang="zh" />);

    fireEvent.click(
      screen.getByRole("button", { name: "选择检查点 编辑前" }),
    );

    expect(screen.getByRole("button", { name: "恢复检查点" })).not.toBeNull();
  });
});
