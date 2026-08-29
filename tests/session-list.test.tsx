import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import SessionList from "@/components/session-list";

describe("SessionList", () => {
  test("mounts the deterministic selected visual case", () => {
    render(<SessionList visualCase="selected" />);

    const second = screen.getByRole("button", {
      name: /Audit supplier import jobs/,
    });
    expect(second.getAttribute("aria-current")).toBe("page");
    expect(within(second).queryByLabelText("1 unread event")).toBeNull();
  });

  test("uses the same highlighted row for pointer hover and keyboard focus", () => {
    render(<SessionList />);

    const first = screen.getByRole("button", {
      name: /Refactor the churn scheduler/,
    });
    const second = screen.getByRole("button", {
      name: /Audit supplier import jobs/,
    });

    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");

    fireEvent.mouseEnter(second);
    expect(first.dataset.active).toBe("false");
    expect(second.dataset.active).toBe("true");

    fireEvent.mouseLeave(second);
    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");

    fireEvent.focus(second);
    expect(first.dataset.active).toBe("false");
    expect(second.dataset.active).toBe("true");

    fireEvent.blur(second);
    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");
  });

  test("selecting a session clears only that session activity badge", () => {
    render(<SessionList />);

    const first = screen.getByRole("button", {
      name: /Refactor the churn scheduler/,
    });
    const second = screen.getByRole("button", {
      name: /Audit supplier import jobs/,
    });

    expect(within(first).getByLabelText("2 unread events")).not.toBeNull();
    expect(within(second).getByLabelText("1 unread event")).not.toBeNull();

    fireEvent.click(second);

    expect(second.getAttribute("aria-current")).toBe("page");
    expect(within(second).queryByLabelText("1 unread event")).toBeNull();
    expect(within(first).getByLabelText("2 unread events")).not.toBeNull();
  });
});
