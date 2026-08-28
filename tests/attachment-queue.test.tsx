import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AttachmentQueue from "@/components/attachment-queue";

describe("AttachmentQueue", () => {
  test("retries a failed attachment with progress semantics", () => {
    render(<AttachmentQueue />);

    fireEvent.click(
      screen.getByRole("button", { name: "Retry research-notes.pdf" }),
    );

    const progress = screen.getByRole("progressbar", {
      name: "research-notes.pdf upload progress",
    });
    expect(progress.getAttribute("aria-valuenow")).toBe("0");
    expect(screen.getByText("Uploading")).not.toBeNull();
  });

  test("removes only the selected attachment", () => {
    render(<AttachmentQueue />);

    fireEvent.click(
      screen.getByRole("button", { name: "Remove research-notes.pdf" }),
    );

    expect(screen.queryByText("research-notes.pdf")).toBeNull();
    expect(screen.getByText("quarterly-report.pdf")).not.toBeNull();
  });

  test("renders localized Chinese controls", () => {
    render(<AttachmentQueue lang="zh" />);

    expect(screen.getByText("附件队列")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: "重试 research-notes.pdf" }),
    ).not.toBeNull();
  });
});
