import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
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
    const tooltipTime = within(tooltip).getByText("Today, 11:42").closest("time");
    const tableTime = within(
      screen.getByRole("table", { name: "Return comparison data" }),
    ).getByText("11:42").closest("time");
    expect(tooltipTime?.getAttribute("datetime")).toBe(
      "2026-08-29T11:42:00.000Z",
    );
    expect(tableTime?.getAttribute("datetime")).toBe(
      "2026-08-29T11:42:00.000Z",
    );
    expect(tooltipTime?.getAttribute("datetime")).toBe(
      tableTime?.getAttribute("datetime"),
    );
    const activeId = chart.getAttribute("aria-activedescendant");
    expect(activeId).toMatch(/-point-4$/);
    expect(document.getElementById(activeId!)).not.toBeNull();
  });

  test("formats the localized tooltip from the selected point timestamp", () => {
    render(<InsightCards lang="zh" />);

    const chart = screen.getByRole("group", { name: "收益对比趋势图" });
    chart.focus();
    fireEvent.keyDown(chart, { key: "End" });

    const tooltipTime = within(screen.getByRole("tooltip"))
      .getByText("今天 12:00")
      .closest("time");
    const tableTime = within(
      screen.getByRole("table", { name: "收益对比数据" }),
    ).getByText("12:00").closest("time");
    expect(tooltipTime?.getAttribute("datetime")).toBe(
      "2026-08-29T12:00:00.000Z",
    );
    expect(tooltipTime?.getAttribute("datetime")).toBe(
      tableTime?.getAttribute("datetime"),
    );
  });

  test("renders exact point timestamps deterministically during SSR", () => {
    const now = vi.spyOn(Date, "now");
    let first = "";
    let second = "";
    try {
      now.mockReturnValue(Date.UTC(2020, 0, 1));
      first = renderToStaticMarkup(<InsightCards lang="en" />);
      now.mockReturnValue(Date.UTC(2040, 0, 1));
      second = renderToStaticMarkup(<InsightCards lang="en" />);
    } finally {
      now.mockRestore();
    }

    expect(second).toBe(first);
    expect(first).toMatch(
      /<time datetime="2026-08-29T11:18:00\.000Z">11:18<\/time>/i,
    );
    expect(first).toMatch(
      /<time datetime="2026-08-29T12:00:00\.000Z">12:00<\/time>/i,
    );
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
    const { unmount } = render(<RecommendationCard />);

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

    unmount();
    render(<RecommendationCard lang="zh" />);
    fireEvent.click(screen.getByRole("button", { name: "备选方案" }));
    fireEvent.click(screen.getByRole("button", { name: /全品类 SKU 紧急补货/ }));
    fireEvent.click(screen.getByRole("button", { name: "忽略" }));

    expect(screen.getByRole("button", { name: "已忽略" }).hasAttribute(
      "disabled",
    )).toBe(true);
    expect(screen.getByRole("status").textContent).toContain("建议已忽略");
  });

  test.each([
    {
      action: "Accept",
      attemptedAlternative: /Switch to vanilla_madagascar/,
      completed: "Accepted",
      option: null,
      status: "Recommendation accepted and added to the restock plan.",
    },
    {
      action: "Configure",
      attemptedAlternative: /Full restock across every SKU/,
      completed: "Configured",
      option: /Switch to vanilla_madagascar/,
      status: "Configuration ready for review.",
    },
    {
      action: "Dismiss",
      attemptedAlternative: /Reorder from cone_king/,
      completed: "Dismissed",
      option: /Full restock across every SKU/,
      status: "Recommendation dismissed; no restock action will run.",
    },
  ])(
    "keeps $completed terminal after attempted alternative actions",
    ({ action, attemptedAlternative, completed, option, status }) => {
      render(<RecommendationCard />);

      const alternatives = screen.getByRole("button", { name: "Alternatives" });
      if (option) {
        fireEvent.click(alternatives);
        fireEvent.click(screen.getByRole("button", { name: option }));
      }
      fireEvent.click(alternatives);
      const attemptedSelection = screen.getByRole("button", {
        name: attemptedAlternative,
      });
      const terminalAction = screen.getByRole("button", { name: action });

      fireEvent.click(terminalAction);

      expect(alternatives.hasAttribute("disabled")).toBe(true);
      expect(attemptedSelection.isConnected).toBe(false);
      fireEvent.click(attemptedSelection);
      fireEvent.click(alternatives);
      fireEvent.click(terminalAction);

      const completedAction = screen.getByRole("button", { name: completed });
      expect(completedAction.hasAttribute("disabled")).toBe(true);
      expect(screen.getAllByRole("status")).toHaveLength(1);
      expect(screen.getByRole("status").textContent).toContain(status);
    },
  );
});
