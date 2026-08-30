import { act, fireEvent, render, screen, within } from "@testing-library/react";
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

function controlledElement(control: HTMLElement) {
  const id = control.getAttribute("aria-controls");
  expect(id).toBeTruthy();
  const target = document.getElementById(id!);
  expect(target).not.toBeNull();
  return target!;
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
    expect(controlledElement(researcher).hidden).toBe(false);
    expect(
      within(controlledElement(researcher)).getByText("Execution Trace"),
    ).not.toBeNull();
  });

  test("keeps disclosure IDREFs unique and valid across multiple instances", () => {
    render(
      <>
        <SubagentTree />
        <SubagentTree />
      </>,
    );

    const controls = [
      ...screen.getAllByRole("button", { name: /Web Researcher/ }),
      ...screen.getAllByRole("button", { name: /Schema Architect/ }),
      ...screen.getAllByRole("button", { name: /Security Linter/ }),
    ];
    const controlledIds = controls.map((control) =>
      control.getAttribute("aria-controls"),
    );

    expect(new Set(controlledIds).size).toBe(controlledIds.length);
    for (const control of controls) controlledElement(control);

    const researchers = screen.getAllByRole("button", {
      name: /Web Researcher/,
    });
    const schemas = screen.getAllByRole("button", { name: /Schema Architect/ });
    expect(controlledElement(researchers[0]).hidden).toBe(true);
    expect(controlledElement(schemas[0]).hidden).toBe(false);

    fireEvent.click(researchers[0]);

    expect(controlledElement(researchers[0]).hidden).toBe(false);
    expect(controlledElement(schemas[0]).hidden).toBe(true);
    expect(controlledElement(schemas[1]).hidden).toBe(false);
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

  test("keeps run disclosure IDREFs unique and valid across multiple instances", async () => {
    vi.useFakeTimers();
    render(
      <>
        <ToolChips />
        <ToolChips />
      </>,
    );
    await advanceTimerSteps(5, 700);

    const toggles = screen.getAllByRole("button", {
      name: "4 tool calls, 2 messages",
    });
    const controlledIds = toggles.map((control) =>
      control.getAttribute("aria-controls"),
    );

    expect(new Set(controlledIds).size).toBe(toggles.length);
    expect(controlledElement(toggles[0]).getAttribute("aria-hidden")).toBe(
      "false",
    );
    expect(controlledElement(toggles[1]).getAttribute("aria-hidden")).toBe(
      "false",
    );

    fireEvent.click(toggles[0]);

    expect(controlledElement(toggles[0]).getAttribute("aria-hidden")).toBe(
      "true",
    );
    expect(controlledElement(toggles[0]).hasAttribute("inert")).toBe(true);
    expect(controlledElement(toggles[1]).getAttribute("aria-hidden")).toBe(
      "false",
    );
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
  test("exposes labeled radio and checkbox groups with keyboard operation", async () => {
    vi.useFakeTimers();
    render(<ApprovalCard />);

    const flavorGroup = screen.getByRole("group", {
      name: "How many flavors should we launch?",
    });
    const firstFlavor = within(flavorGroup).getByRole("radio", {
      name: "Three (core line)",
    }) as HTMLInputElement;
    const secondFlavor = within(flavorGroup).getByRole("radio", {
      name: "Five (full case)",
    }) as HTMLInputElement;
    const custom = screen.getByRole("textbox", { name: "Custom answer" });

    fireEvent.change(custom, { target: { value: "Four seasonal flavors" } });
    firstFlavor.focus();
    fireEvent.keyDown(firstFlavor, { key: "ArrowDown" });

    expect(secondFlavor.checked).toBe(true);
    expect(document.activeElement).toBe(secondFlavor);
    expect((custom as HTMLInputElement).value).toBe("");

    await advanceTimerSteps(1, 480);

    const mixInGroup = screen.getByRole("group", {
      name: "Which mix-ins should we stock?",
    });
    const chocolate = within(mixInGroup).getByRole("checkbox", {
      name: "Chocolate chips",
    }) as HTMLInputElement;
    chocolate.focus();
    fireEvent.keyDown(chocolate, { key: " " });

    expect(chocolate.checked).toBe(true);
    expect(document.activeElement).toBe(chocolate);
  });

  test("advances one radio selection once after exactly 480 ms", async () => {
    vi.useFakeTimers();
    render(<ApprovalCard />);

    fireEvent.keyDown(
      screen.getByRole("radio", { name: "Three (core line)" }),
      { key: " " },
    );
    expect(vi.getTimerCount()).toBe(1);

    await advanceTimerSteps(1, 479);
    expect(
      screen.getByRole("group", { name: "How many flavors should we launch?" }),
    ).not.toBeNull();
    expect(vi.getTimerCount()).toBe(1);

    await advanceTimerSteps(1, 1);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();
    expect(vi.getTimerCount()).toBe(0);

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();
  });

  test("keeps one pending auto-advance for rapid radio keyboard selections", async () => {
    vi.useFakeTimers();
    render(<ApprovalCard />);

    const firstFlavor = screen.getByRole("radio", {
      name: "Three (core line)",
    }) as HTMLInputElement;
    const secondFlavor = screen.getByRole("radio", {
      name: "Five (full case)",
    }) as HTMLInputElement;

    firstFlavor.focus();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    fireEvent.keyDown(firstFlavor, { key: "ArrowDown" });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(secondFlavor.checked).toBe(true);
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.keyDown(secondFlavor, { key: " " });
    expect(vi.getTimerCount()).toBe(1);

    await advanceTimerSteps(1, 480);

    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();
    expect(vi.getTimerCount()).toBe(0);

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();
  });

  test("cancels pending auto-advance across manual and direct navigation", async () => {
    vi.useFakeTimers();
    render(<ApprovalCard />);

    fireEvent.keyDown(
      screen.getByRole("radio", { name: "Three (core line)" }),
      { key: " " },
    );
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Go to question 3" }));
    fireEvent.keyDown(screen.getByRole("radio", { name: "Food trucks" }), {
      key: " ",
    });
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Go to question 1" }));
    fireEvent.keyDown(
      screen.getByRole("radio", { name: "Three (core line)" }),
      { key: " " },
    );
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Go to question 3" }));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.getByRole("group", { name: "Which market do we enter first?" }),
    ).not.toBeNull();

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "Which market do we enter first?" }),
    ).not.toBeNull();
  });

  test("cancels pending auto-advance on submission and reset", async () => {
    vi.useFakeTimers();
    render(<ApprovalCard />);

    fireEvent.click(screen.getByRole("button", { name: "Go to question 3" }));
    fireEvent.keyDown(screen.getByRole("radio", { name: "Food trucks" }), {
      key: " ",
    });
    expect(vi.getTimerCount()).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Send answers" }));
    expect(screen.getByRole("status").textContent).toContain("Answers sent");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(vi.getTimerCount()).toBe(0);

    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(vi.getTimerCount()).toBe(0);
    expect(
      screen.getByRole("group", { name: "How many flavors should we launch?" }),
    ).not.toBeNull();

    await advanceTimerSteps(1, 480);
    expect(
      screen.getByRole("group", { name: "How many flavors should we launch?" }),
    ).not.toBeNull();
  });

  test("cancels the pending auto-advance on unmount", () => {
    vi.useFakeTimers();
    const { unmount } = render(<ApprovalCard />);

    fireEvent.keyDown(
      screen.getByRole("radio", { name: "Three (core line)" }),
      { key: " " },
    );
    expect(vi.getTimerCount()).toBe(1);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  test("preserves custom and multi-select answers through submission", () => {
    render(<ApprovalCard />);

    fireEvent.change(screen.getByRole("textbox", { name: "Custom answer" }), {
      target: { value: "Four seasonal flavors" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    fireEvent.click(screen.getByRole("checkbox", { name: "Chocolate chips" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Sprinkles" }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    fireEvent.change(screen.getByRole("textbox", { name: "Custom answer" }), {
      target: { value: "Campus pop-ups" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send answers" }));

    expect(screen.getByText("Answers sent")).not.toBeNull();
  });

  test("preserves answers across previous and direct progress navigation", () => {
    render(<ApprovalCard />);

    const previous = screen.getByRole("button", { name: "Previous" });
    const next = screen.getByRole("button", { name: "Next" });
    expect(previous.hasAttribute("disabled")).toBe(true);
    expect(next.hasAttribute("disabled")).toBe(false);

    const firstCustom = screen.getByRole("textbox", { name: "Custom answer" });
    fireEvent.change(firstCustom, {
      target: { value: "Four seasonal flavors" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    expect(
      screen.getByRole("group", { name: "Which mix-ins should we stock?" }),
    ).not.toBeNull();

    const chocolate = screen.getByRole("checkbox", {
      name: "Chocolate chips",
    }) as HTMLInputElement;
    fireEvent.click(chocolate);
    fireEvent.click(previous);

    expect(
      screen.getByRole("group", { name: "How many flavors should we launch?" }),
    ).not.toBeNull();
    expect(previous.hasAttribute("disabled")).toBe(true);
    expect(
      (screen.getByRole("textbox", { name: "Custom answer" }) as HTMLInputElement)
        .value,
    ).toBe("Four seasonal flavors");

    fireEvent.click(screen.getByRole("button", { name: "Go to question 2" }));
    expect(
      (screen.getByRole("checkbox", { name: "Chocolate chips" }) as HTMLInputElement)
        .checked,
    ).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Go to question 3" }));
    expect(
      screen.getByRole("group", { name: "Which market do we enter first?" }),
    ).not.toBeNull();
    expect(previous.hasAttribute("disabled")).toBe(false);
    expect(next.hasAttribute("disabled")).toBe(true);
  });

  test("announces submission and moves focus to Start over", () => {
    render(<ApprovalCard />);

    fireEvent.click(screen.getByRole("button", { name: "Go to question 3" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Custom answer" }), {
      target: { value: "Campus pop-ups" },
    });
    const submit = screen.getByRole("button", { name: "Send answers" });
    submit.focus();
    fireEvent.click(submit);

    expect(screen.getByRole("status").textContent).toContain("Answers sent");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Start over" }),
    );
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

  test("announces submission and moves focus to Change decision", () => {
    render(<ClarificationCard />);

    const submit = screen.getByRole("button", { name: "Confirm & Proceed" });
    submit.focus();
    fireEvent.click(submit);

    expect(screen.getByRole("status").textContent).toContain(
      "Decision Recorded",
    );
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Change decision" }),
    );
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
