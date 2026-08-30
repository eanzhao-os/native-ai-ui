import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import AgentTeams from "@/components/agent-teams";
import ApprovalCard from "@/components/approval-card";
import ClarificationCard from "@/components/clarification-card";
import SubagentTree from "@/components/subagent-tree";
import TaskRows from "@/components/task-rows";
import ToolChips from "@/components/tool-chips";

async function advanceTimerSteps(count: number, milliseconds: number) {
  for (let step = 0; step < count; step += 1) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(milliseconds);
    });
  }
}

afterEach(() => {
  vi.useRealTimers();
});

describe("SubagentTree", () => {
  test("exposes expandable agent rows as keyboard controls", () => {
    render(<SubagentTree />);

    const schema = screen.getByRole("button", { name: /Schema Architect/ });
    expect(schema.getAttribute("aria-expanded")).toBe("true");

    schema.focus();
    expect(document.activeElement).toBe(schema);
    fireEvent.click(schema);
    expect(schema.getAttribute("aria-expanded")).toBe("false");

    const researcher = screen.getByRole("button", { name: /Web Researcher/ });
    fireEvent.click(researcher);
    expect(researcher.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Execution Trace")).not.toBeNull();
  });
});

describe("AgentTeams", () => {
  test("advances the real roster and shared task DAG", async () => {
    vi.useFakeTimers();
    render(<AgentTeams />);

    expect(screen.getByText("0/4 tasks")).not.toBeNull();
    expect(screen.getAllByText("provisioning")).toHaveLength(2);

    await advanceTimerSteps(2, 2100);

    expect(screen.getByText("2/4 tasks")).not.toBeNull();
    expect(screen.getAllByText("active")).toHaveLength(4);
    expect(screen.getByText("Add backoff unit tests")).not.toBeNull();
  });
});

describe("TaskRows", () => {
  test("toggles row details through the real disclosure control", () => {
    render(<TaskRows />);

    const row = screen.getByRole("button", {
      name: /Build reorder task list/,
    });
    expect(row.getAttribute("aria-expanded")).toBe("false");

    row.focus();
    expect(document.activeElement).toBe(row);
    fireEvent.click(row);

    expect(row.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Reading POS export")).not.toBeNull();

    fireEvent.click(row);
    expect(row.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("ToolChips", () => {
  test("removes collapsed tool rows from keyboard navigation", async () => {
    vi.useFakeTimers();
    render(<ToolChips />);
    await advanceTimerSteps(5, 700);

    const runToggle = screen.getByRole("button", {
      name: "4 tool calls, 2 messages",
    });
    const writeRow = screen.getByRole("button", { name: /Write 204 lines/ });

    fireEvent.click(runToggle);

    expect(runToggle.getAttribute("aria-expanded")).toBe("false");
    expect(writeRow.closest("[inert]")).not.toBeNull();
  });

  test("opens a tool detail through its disclosure control", async () => {
    vi.useFakeTimers();
    render(<ToolChips lang="zh" />);
    await advanceTimerSteps(5, 700);

    const writeRow = screen.getByRole("button", { name: /写入 204 行/ });
    expect(writeRow.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(writeRow);

    expect(writeRow.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByText('+ const windows = slots.filter((s) => s.temp <= -12)'),
    ).not.toBeNull();
  });

  test("keeps the undisclosed diff count out of keyboard navigation", async () => {
    vi.useFakeTimers();
    render(<ToolChips />);
    await advanceTimerSteps(5, 700);

    expect(screen.getByText("+2 more")).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "+2 more" }),
    ).toBeNull();
  });
});

describe("ApprovalCard", () => {
  test("preserves custom and multi-select answers through submission", () => {
    render(<ApprovalCard />);

    fireEvent.change(screen.getByRole("textbox", { name: "Custom answer" }), {
      target: { value: "Four seasonal flavors" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    fireEvent.click(screen.getByRole("button", { name: "Chocolate chips" }));
    fireEvent.click(screen.getByRole("button", { name: "Sprinkles" }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    fireEvent.change(screen.getByRole("textbox", { name: "Custom answer" }), {
      target: { value: "Campus pop-ups" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send answers" }));

    expect(screen.getByText("Answers sent")).not.toBeNull();
  });

  test("localizes approval navigation and custom-answer names", () => {
    render(<ApprovalCard lang="zh" />);

    expect(screen.getByRole("button", { name: "关闭审批" })).not.toBeNull();
    expect(screen.getByRole("textbox", { name: "自定义答案" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "上一题" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "下一题" })).not.toBeNull();
    expect(screen.getByRole("button", { name: "转到第 1 题" })).not.toBeNull();
  });
});

describe("ClarificationCard", () => {
  test("restores the visible recommended selection when custom text is cleared", () => {
    render(<ClarificationCard />);

    const recommended = screen.getByRole("radio", {
      name: /Soft Token Migration/,
    }) as HTMLInputElement;
    const custom = screen.getByPlaceholderText(
      "Or provide custom migration rules...",
    );

    expect(recommended.checked).toBe(true);
    fireEvent.change(custom, { target: { value: "Rotate sessions gradually" } });
    expect(recommended.checked).toBe(false);

    fireEvent.change(custom, { target: { value: "" } });
    expect(recommended.checked).toBe(true);
  });

  test("submits and resets an alternate decision", () => {
    render(<ClarificationCard lang="zh" />);

    fireEvent.click(screen.getByRole("radio", { name: /双签名格式校验/ }));
    fireEvent.click(screen.getByRole("button", { name: "确认并继续" }));

    expect(screen.getByText(/决策已确认：/)).not.toBeNull();
    expect(screen.getByText(/双签名格式校验/)).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "修改决策" }));
    expect(
      (screen.getByRole("radio", { name: /平滑双轨迁移/ }) as HTMLInputElement)
        .checked,
    ).toBe(true);
  });
});
