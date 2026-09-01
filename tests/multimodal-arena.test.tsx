import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import AudioOrb from "@/components/audio-orb";
import InsightCards from "@/components/insight-cards";
import ModelArena from "@/components/model-arena";
import RecommendationCard from "@/components/recommendation-card";

vi.mock("liveline", () => ({
  Liveline: () => <div aria-hidden="true" data-liveline-stub="true" />,
}));

function motionPreference(matches: boolean) {
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

beforeEach(() => {
  motionPreference(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("AudioOrb", () => {
  test("restarts real listening from the ended voice state", () => {
    render(<AudioOrb />);

    fireEvent.click(screen.getByRole("button", { name: "End Voice" }));

    const start = screen.getByRole("button", {
      name: "Start voice conversation",
    });
    expect(screen.getByRole("status").textContent).toContain("Idle");

    fireEvent.click(start);

    expect(screen.getByRole("status").textContent).toContain("Listening");
    expect(screen.getByText("Listening to your request...")).not.toBeNull();
    expect(
      within(screen.getByRole("group", { name: "Voice state" })).getByRole(
        "button",
        { name: "Listening" },
      ).getAttribute("aria-pressed"),
    ).toBe("true");
  });

  test("keeps waveform samples stable when reduced motion is requested", async () => {
    vi.useFakeTimers();
    motionPreference(true);
    render(<AudioOrb />);

    await act(async () => {});
    const waveform = screen.getByRole("img", { name: "Live audio waveform" });
    const before = [...waveform.children].map(
      (bar) => (bar as HTMLElement).style.height,
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(2_600);
    });

    expect([...waveform.children].map(
      (bar) => (bar as HTMLElement).style.height,
    )).toEqual(before);
  });

  test("exposes microphone mute as a reversible pressed state", () => {
    render(<AudioOrb />);

    const mute = screen.getByRole("button", { name: "Mute microphone" });
    expect(mute.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(mute);

    const unmute = screen.getByRole("button", { name: "Unmute microphone" });
    expect(unmute).toBe(mute);
    expect(unmute.getAttribute("aria-pressed")).toBe("true");
  });
});

describe("ModelArena", () => {
  test("exposes one mutually exclusive recorded vote", () => {
    render(<ModelArena />);

    const group = screen.getByRole("group", {
      name: "Choose higher-quality response",
    });
    const modelA = within(group).getByRole("button", { name: "Model A Better" });
    const tie = within(group).getByRole("button", { name: "Tie" });
    const modelB = within(group).getByRole("button", { name: "Model B Better" });

    expect(modelA.getAttribute("aria-pressed")).toBe("false");
    expect(tie.getAttribute("aria-pressed")).toBe("false");
    expect(modelB.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(modelA);
    expect(modelA.getAttribute("aria-pressed")).toBe("true");
    expect(tie.getAttribute("aria-pressed")).toBe("false");
    expect(modelB.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(tie);
    expect(modelA.getAttribute("aria-pressed")).toBe("false");
    expect(tie.getAttribute("aria-pressed")).toBe("true");
    expect(modelB.getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByRole("status").textContent).toContain(
      "Preferences recorded for RLHF dataset",
    );
  });
});

describe("InsightCards", () => {
  test("keeps comparison values available without relying on the tooltip", () => {
    render(<InsightCards />);

    const table = screen.getByRole("table", { name: "Return comparison data" });
    expect(within(table).getAllByRole("row")).toHaveLength(9);
    expect(within(table).getByRole("cell", { name: "11:42" })).not.toBeNull();
    expect(within(table).getByRole("cell", { name: "-3.52%" })).not.toBeNull();
    expect(within(table).getByRole("cell", { name: "+0.76%" })).not.toBeNull();
  });

  test("pins a selected comparison point after pointer release with its real time", () => {
    render(<InsightCards />);

    const chart = screen.getByRole("group", { name: "Return comparison chart" });
    Object.defineProperty(chart, "getBoundingClientRect", {
      configurable: true,
      value: () => ({
        bottom: 180,
        height: 180,
        left: 0,
        right: 800,
        top: 0,
        width: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }),
    });

    fireEvent.pointerDown(chart, { clientX: 400 });
    fireEvent.pointerUp(chart, { clientX: 400 });

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.textContent).toContain("Today, 11:42");
    expect(tooltip.textContent).toContain("Mint Chip");
    expect(tooltip.textContent).toContain("-3.52%");
    const activeId = chart.getAttribute("aria-activedescendant");
    expect(activeId).toMatch(/-point-4$/);
    expect(document.getElementById(activeId!)).not.toBeNull();
  });

  test("moves and clears chart selection from the keyboard", () => {
    render(<InsightCards />);

    const chart = screen.getByRole("group", { name: "Return comparison chart" });
    chart.focus();
    fireEvent.keyDown(chart, { key: "End" });

    expect(screen.getByRole("tooltip").textContent).toContain("Today, 12:00");
    const lastId = chart.getAttribute("aria-activedescendant");
    expect(lastId).toMatch(/-point-7$/);
    expect(document.getElementById(lastId!)).not.toBeNull();

    fireEvent.keyDown(chart, { key: "ArrowLeft" });
    expect(screen.getByRole("tooltip").textContent).toContain("Today, 11:54");
    const previousId = chart.getAttribute("aria-activedescendant");
    expect(previousId).toMatch(/-point-6$/);
    expect(document.getElementById(previousId!)).not.toBeNull();

    fireEvent.keyDown(chart, { key: "Escape" });
    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(chart.hasAttribute("aria-activedescendant")).toBe(false);
  });

  test("submits the visible follow-up question instead of leaving an inert control", () => {
    render(<InsightCards />);

    fireEvent.click(
      screen.getByRole("button", { name: "Should I rebalance flavors?" }),
    );

    const submitted = screen.getByRole("button", { name: "Question added" });
    expect(submitted.hasAttribute("disabled")).toBe(true);
    expect(screen.getByRole("status").textContent).toContain(
      "Follow-up question added",
    );
  });
});

describe("RecommendationCard", () => {
  test("accepts a recommendation once and exposes localized success", () => {
    render(<RecommendationCard />);

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));

    const accepted = screen.getByRole("button", { name: "Accepted" });
    expect(accepted.hasAttribute("disabled")).toBe(true);
    expect(accepted.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("status").textContent).toContain(
      "Recommendation accepted",
    );
  });

  test("responds honestly to review and dismiss alternatives", () => {
    const { rerender } = render(<RecommendationCard />);

    fireEvent.click(screen.getByRole("button", { name: "Alternatives" }));
    fireEvent.click(
      screen.getByRole("button", { name: /Switch to vanilla_madagascar/ }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Configure" }));

    expect(screen.getByRole("button", { name: "Configured" }).hasAttribute(
      "disabled",
    )).toBe(true);
    expect(screen.getByRole("status").textContent).toContain(
      "Configuration ready for review",
    );

    rerender(<RecommendationCard lang="zh" />);
    fireEvent.click(screen.getByRole("button", { name: "备选方案" }));
    fireEvent.click(screen.getByRole("button", { name: /全品类 SKU 紧急补货/ }));
    fireEvent.click(screen.getByRole("button", { name: "忽略" }));

    expect(screen.getByRole("button", { name: "已忽略" }).hasAttribute(
      "disabled",
    )).toBe(true);
    expect(screen.getByRole("status").textContent).toContain("建议已忽略");
  });
});
