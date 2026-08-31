import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import AgentInbox from "@/components/agent-inbox";
import CheckpointTimeline from "@/components/checkpoint-timeline";
import HookPipeline from "@/components/hook-pipeline";
import SessionTelemetry from "@/components/session-telemetry";
import TurnLifecycle from "@/components/turn-lifecycle";
import WorkflowRun from "@/components/workflow-run";

async function advance(milliseconds: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
}

async function advanceSteps(count: number, milliseconds: number) {
  for (let step = 0; step < count; step += 1) {
    await advance(milliseconds);
  }
}

function reducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === "(prefers-reduced-motion: reduce)" && matches,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("TurnLifecycle", () => {
  test("selects streamed events with pointer and composite keyboard navigation", async () => {
    vi.useFakeTimers();
    render(<TurnLifecycle />);

    const timeline = screen.getByRole("listbox", { name: "Turn events" });
    expect(within(timeline).queryAllByRole("option")).toHaveLength(0);

    await advance(500);
    await advanceSteps(2, 620);

    const options = within(timeline).getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[2].getAttribute("aria-selected")).toBe("true");

    fireEvent.click(options[0]);
    expect(options[0].getAttribute("aria-selected")).toBe("true");
    expect(
      screen.getByRole("status", { name: "Selected event" }).textContent,
    ).toContain("Turn 3 begins");

    timeline.focus();
    fireEvent.keyDown(timeline, { key: "End" });
    expect(options[2].getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(timeline, { key: "ArrowUp" });
    expect(options[1].getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(timeline);
  });
});

describe("AgentInbox", () => {
  test("queues followup, steer, and inject messages through real controls", () => {
    render(<AgentInbox />);

    const nextTurn = screen.getByRole("region", { name: "NextTurn queue" });
    const nextStep = screen.getByRole("region", { name: "NextStep queue" });
    const followup = screen.getByRole("button", { name: "Queue Followup" });

    followup.focus();
    expect(document.activeElement).toBe(followup);
    fireEvent.click(followup);
    expect(within(nextTurn).getByText("also verify the rollout gate")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Queue Steer" }));
    expect(within(nextStep).getByText("use the staging endpoint")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Queue Inject" }));
    expect(within(nextStep).getByText("fyi: trace dump at /tmp/trace.log")).not.toBeNull();
  });

  test("does not fabricate preceding messages when delivery controls are clicked out of order", () => {
    render(<AgentInbox />);

    const nextTurn = screen.getByRole("region", { name: "NextTurn queue" });
    const nextStep = screen.getByRole("region", { name: "NextStep queue" });

    fireEvent.click(screen.getByRole("button", { name: "Queue Inject" }));

    expect(within(nextTurn).queryByText("also verify the rollout gate")).toBeNull();
    expect(within(nextStep).queryByText("use the staging endpoint")).toBeNull();
    expect(
      within(nextStep).getByText("fyi: trace dump at /tmp/trace.log"),
    ).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Queue Followup" }));

    expect(within(nextTurn).getByText("also verify the rollout gate")).not.toBeNull();
    expect(within(nextStep).queryByText("use the staging endpoint")).toBeNull();
    expect(
      within(nextStep).getByText("fyi: trace dump at /tmp/trace.log"),
    ).not.toBeNull();
  });

  test("claims exactly the one visible next-step message at the boundary", () => {
    render(<AgentInbox />);

    const nextStep = screen.getByRole("region", { name: "NextStep queue" });
    const claim = screen.getByRole("button", { name: "Claim next-step queue" });
    expect(claim.hasAttribute("disabled")).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Queue Inject" }));

    expect(within(nextStep).queryByText("use the staging endpoint")).toBeNull();
    expect(within(nextStep).getByText("fyi: trace dump at /tmp/trace.log")).not.toBeNull();
    expect(claim.hasAttribute("disabled")).toBe(false);

    fireEvent.click(claim);

    expect(screen.getByRole("status").textContent).toContain(
      "ClaimAsync drained 1 message",
    );
    expect(screen.getByText("claimed ×1")).not.toBeNull();
    expect(within(nextStep).getByText("empty")).not.toBeNull();
    expect(claim.hasAttribute("disabled")).toBe(true);
  });

  test("claims the next-step queue and starts the next turn at step one", async () => {
    vi.useFakeTimers();
    render(<AgentInbox />);

    fireEvent.click(screen.getByRole("button", { name: "Queue Followup" }));
    fireEvent.click(screen.getByRole("button", { name: "Queue Steer" }));
    fireEvent.click(screen.getByRole("button", { name: "Queue Inject" }));

    const claim = screen.getByRole("button", { name: "Claim next-step queue" });
    expect(claim.hasAttribute("disabled")).toBe(false);
    fireEvent.click(claim);

    expect(screen.getByRole("status").textContent).toContain(
      "ClaimAsync drained 2 messages",
    );
    expect(
      within(screen.getByRole("region", { name: "NextStep queue" })).getByText(
        "empty",
      ),
    ).not.toBeNull();

    await advance(1700);

    expect(screen.getByText("turn 3 · step 1")).not.toBeNull();
    expect(screen.queryByText("claimed ×2")).toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "NextTurn woke the driver into turn 3",
    );
  });
});

describe("HookPipeline", () => {
  test("stops at the most-restrictive ask decision until explicit approval", async () => {
    vi.useFakeTimers();
    render(<HookPipeline />);

    await advance(700);
    await advanceSteps(3, 750);

    const approve = screen.getByRole("button", { name: "Approve hook request" });
    expect(screen.getAllByText("ask")).toHaveLength(2);

    await advance(5000);
    expect(screen.getByRole("button", { name: "Approve hook request" })).toBe(
      approve,
    );
    expect(screen.queryByText("allow · approved")).toBeNull();

    approve.focus();
    expect(document.activeElement).toBe(approve);
    fireEvent.click(approve);

    expect(screen.getByText("allow · approved")).not.toBeNull();
    expect(
      screen.queryByRole("button", { name: "Approve hook request" }),
    ).toBeNull();
  });

  test("moves focus to a stable authoritative result after approval", async () => {
    vi.useFakeTimers();
    render(<HookPipeline />);

    await advance(700);
    await advanceSteps(3, 750);

    const result = screen.getByRole("status", {
      name: "Hook approval result",
    });
    expect(result.textContent).toContain("awaiting human approval");

    const approve = screen.getByRole("button", {
      name: "Approve hook request",
    });
    approve.focus();
    fireEvent.click(approve);

    expect(document.activeElement).toBe(result);
    expect(
      screen.getByRole("status", { name: "Hook approval result" }),
    ).toBe(result);
    expect(result.getAttribute("aria-live")).toBe("polite");
    expect(result.getAttribute("aria-atomic")).toBe("true");
    expect(result.textContent).toContain(
      "Hook request approved. Final decision: allow.",
    );
  });
});

describe("SessionTelemetry", () => {
  test("folds complete durable frames immediately when reduced motion is requested", async () => {
    vi.useFakeTimers();
    reducedMotion(true);
    render(<SessionTelemetry />);

    const metrics = screen.getByRole("group", { name: "Session metrics" });
    expect(within(metrics).getByText("41.2k")).not.toBeNull();

    await advance(2400);

    expect(within(metrics).getByText("50.9k")).not.toBeNull();
    expect(within(metrics).getByText("25.8s")).not.toBeNull();
    expect(
      screen.getByRole("img", { name: /Turn outcomes: completed 7/ }),
    ).not.toBeNull();
    expect(
      screen.getByRole("img", { name: /Cumulative tokens in: 50,872/ }),
    ).not.toBeNull();

    await advanceSteps(2, 2400);

    expect(screen.getByText("archived")).not.toBeNull();
    expect(within(metrics).getByText("71.5k")).not.toBeNull();
  });
});

describe("WorkflowRun", () => {
  test("advances stable four-lane progress before completing each fan-out batch", async () => {
    vi.useFakeTimers();
    render(<WorkflowRun />);

    const overall = screen.getByRole("progressbar", {
      name: "Workflow progress",
    });
    const firstSlot = screen.getByRole("progressbar", {
      name: "w-01 progress",
    });
    expect(overall.getAttribute("aria-valuenow")).toBe("0");
    expect(firstSlot.getAttribute("aria-valuenow")).toBe("25");
    expect(screen.getByText("item-01")).not.toBeNull();

    await advance(105);

    expect(firstSlot.getAttribute("aria-valuenow")).toBe("50");
    expect(screen.getByText("item-01")).not.toBeNull();

    await advanceSteps(3, 105);

    expect(overall.getAttribute("aria-valuenow")).toBe("10");
    expect(firstSlot.getAttribute("aria-valuenow")).toBe("25");
    expect(screen.getByText("item-05")).not.toBeNull();
    expect(
      screen.getAllByRole("listitem", { name: /completed$/ }),
    ).toHaveLength(4);

    await advanceSteps(36, 105);

    expect(overall.getAttribute("aria-valuenow")).toBe("100");
    expect(screen.getByText("All items processed")).not.toBeNull();
  });
});

describe("CheckpointTimeline focus recovery", () => {
  test("returns focus to the restored checkpoint and clears stale success on selection", () => {
    render(<CheckpointTimeline />);

    const before = screen.getByRole("button", {
      name: "Select checkpoint Before edits",
    });
    fireEvent.click(before);
    fireEvent.click(screen.getByRole("button", { name: "Restore checkpoint" }));
    const confirm = screen.getByRole("button", { name: "Confirm restore" });
    confirm.focus();
    fireEvent.click(confirm);

    expect(document.activeElement).toBe(before);
    expect(screen.getByRole("status").textContent).toContain(
      "Restored “Before edits”",
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Select checkpoint Implementation" }),
    );
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("returns focus to the restore trigger after cancellation", () => {
    render(<CheckpointTimeline />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select checkpoint Before edits" }),
    );
    const restore = screen.getByRole("button", { name: "Restore checkpoint" });
    fireEvent.click(restore);
    fireEvent.click(screen.getByRole("button", { name: "Cancel restore" }));

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Restore checkpoint" }),
    );
  });
});
