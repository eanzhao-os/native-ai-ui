import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ArtifactSandbox from "@/components/artifact-sandbox";
import DiffTable from "@/components/diff-table";
import FilterTable from "@/components/filter-table";
import RecordsTable from "@/components/records-table";
import SelectionActions from "@/components/selection-actions";
import { StreamText } from "@/components/atoms/StreamText";
import { LangProvider, useLangContext } from "@/lib/lang-context";

const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, "animate");

class TestResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

async function advance(milliseconds: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
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

function LanguageControls() {
  const { setGlobalLang } = useLangContext();
  return (
    <button type="button" onClick={() => setGlobalLang("zh")}>
      Switch globally to Chinese
    </button>
  );
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", TestResizeObserver);
  Object.defineProperty(Element.prototype, "animate", {
    configurable: true,
    value: vi.fn(() => ({
      cancel: vi.fn(),
      onfinish: null,
      playState: "finished",
    })),
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  if (originalAnimate) {
    Object.defineProperty(Element.prototype, "animate", originalAnimate);
  } else {
    Reflect.deleteProperty(Element.prototype, "animate");
  }
});

describe("ArtifactSandbox", () => {
  test("exposes keyboard-operated tabs and their active panel", () => {
    render(<ArtifactSandbox />);

    const tablist = screen.getByRole("tablist", { name: "Artifact view" });
    const preview = within(tablist).getByRole("tab", { name: "Preview" });
    const code = within(tablist).getByRole("tab", { name: "Code" });

    expect(preview.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel", { name: "Preview" })).not.toBeNull();

    preview.focus();
    fireEvent.keyDown(preview, { key: "ArrowRight" });

    expect(code.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(code);
    expect(screen.getByRole("tabpanel", { name: "Code" })).not.toBeNull();
  });

  test("exposes localized pressed viewport controls", () => {
    render(<ArtifactSandbox lang="zh" />);

    const group = screen.getByRole("group", { name: "预览尺寸" });
    const desktop = within(group).getByRole("button", { name: "桌面端" });
    const mobile = within(group).getByRole("button", { name: "移动端" });

    expect(desktop.getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(mobile);
    expect(desktop.getAttribute("aria-pressed")).toBe("false");
    expect(mobile.getAttribute("aria-pressed")).toBe("true");
  });
});

describe("DiffTable", () => {
  test("selects completed changes and applies only the reviewed subset", async () => {
    vi.useFakeTimers();
    render(<DiffTable />);

    await advance(2_800);

    const rocky = screen.getByRole("checkbox", {
      name: "Select removal Rocky Road",
    });
    expect(screen.getByRole("status").textContent).toContain(
      "3 of 3 changes selected",
    );

    fireEvent.click(rocky);
    expect(rocky.getAttribute("aria-checked")).toBe("false");
    expect(screen.getByRole("status").textContent).toContain(
      "2 of 3 changes selected",
    );

    fireEvent.click(screen.getByRole("button", { name: "Apply 2 changes" }));
    expect(screen.getByRole("status").textContent).toContain("Applied 2 changes");
  });

  test("exposes text operation labels instead of color-only diff meaning", async () => {
    vi.useFakeTimers();
    render(<DiffTable lang="zh" />);

    await advance(2_800);

    expect(screen.getAllByText("移除")).toHaveLength(2);
    expect(screen.getByText("新增")).not.toBeNull();
  });

  test("exposes a native and visibly explicit mixed header selection", async () => {
    vi.useFakeTimers();
    render(<DiffTable />);

    await advance(2_800);
    fireEvent.click(screen.getByRole("checkbox", {
      name: "Select removal Rocky Road",
    }));

    const header = screen.getByRole("checkbox", { name: "Select all changes" });
    expect(header.getAttribute("aria-checked")).toBe("mixed");
    expect((header as HTMLInputElement).indeterminate).toBe(true);
    const indicator = header.nextElementSibling as HTMLElement;
    expect(indicator.dataset.state).toBe("mixed");
    expect(indicator.className).toContain("bg-accent");
    expect(indicator.className).toContain("text-white");
    expect(indicator.className).not.toContain("text-transparent");
  });

  test("resolves directly to the stable review state with reduced motion", () => {
    vi.useFakeTimers();
    reducedMotion(true);
    render(<DiffTable />);

    expect(screen.getByRole("status").textContent).toContain(
      "3 of 3 changes selected",
    );
    expect(screen.getByRole("checkbox", {
      name: "Select addition Pistachio",
    })).not.toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("RecordsTable", () => {
  test("exposes the real scroll region and a clearable selection toolbar", () => {
    render(<RecordsTable />);

    expect(
      screen.getByRole("region", {
        name: "Companies table. Scroll horizontally and vertically to view all columns and records.",
      }),
    ).not.toBeNull();

    const aurora = screen.getByRole("checkbox", {
      name: "Select Aurora Scoops — Reykjavík",
    });
    fireEvent.click(aurora);

    const toolbar = screen.getByRole("toolbar", {
      name: "Selected company actions",
    });
    expect(toolbar.textContent).toContain("1 company selected");

    fireEvent.click(within(toolbar).getByRole("button", { name: "Clear selection" }));
    expect(aurora.getAttribute("aria-checked")).toBe("false");
    expect(
      screen.queryByRole("toolbar", { name: "Selected company actions" }),
    ).toBeNull();
  });

  test("sorts every last-interaction age monotonically in both directions", () => {
    render(<RecordsTable />);

    const ageDays = new Map([
      ["9 days ago", 9],
      ["15 days ago", 15],
      ["3 weeks ago", 21],
      ["about 1 month ago", 30],
      ["2 months ago", 60],
      ["3 months ago", 90],
      ["5 months ago", 150],
      ["8 months ago", 240],
      ["12 months ago", 365],
      ["over 1 year ago", 420],
      ["almost 2 years ago", 680],
      ["about 2 years ago", 730],
      ["over 2 years ago", 800],
      ["No contact", Number.POSITIVE_INFINITY],
    ]);
    const renderedAges = () =>
      [...document.querySelectorAll(".records-row")].map((row) => {
        const value = within(row as HTMLElement).getAllByRole("cell")[2]
          .textContent?.trim();
        const days = value ? ageDays.get(value) : undefined;
        expect(days, `Missing test age for ${value}`).not.toBeUndefined();
        return days as number;
      });
    const expectMonotonic = (ages: number[], direction: "ascending" | "descending") => {
      expect(ages).toHaveLength(26);
      for (let index = 1; index < ages.length; index += 1) {
        if (direction === "ascending") expect(ages[index - 1]).toBeLessThanOrEqual(ages[index]);
        else expect(ages[index - 1]).toBeGreaterThanOrEqual(ages[index]);
      }
    };

    const sort = screen.getByRole("button", { name: "Last interaction" });
    fireEvent.click(sort);
    expect(sort.closest("th")?.getAttribute("aria-sort")).toBe("ascending");
    expectMonotonic(renderedAges(), "ascending");

    fireEvent.click(sort);
    expect(sort.closest("th")?.getAttribute("aria-sort")).toBe("descending");
    expectMonotonic(renderedAges(), "descending");
  });

  test("does not expose inert header or company links", () => {
    render(<RecordsTable />);

    expect(screen.queryByRole("button", { name: "Categories" })).toBeNull();
    expect(
      screen.queryByRole("link", { name: "Sahara Swirl — Marrakech" }),
    ).toBeNull();
  });
});

describe("FilterTable", () => {
  test("removes filtered rows from the accessibility tree and announces results", () => {
    render(<FilterTable />);

    fireEvent.click(screen.getByRole("button", { name: /To do\s*2/ }));

    const table = screen.getByRole("table", { name: "Tasks" });
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).queryByText("Churn black sesame")).toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Showing 2 of 5 tasks",
    );
  });

  test("localizes the filter group and scroll-region names", () => {
    render(<FilterTable lang="zh" />);

    expect(screen.getByRole("group", { name: "任务状态筛选" })).not.toBeNull();
    expect(screen.getByRole("region", { name: "可横向滚动的任务表格" })).not.toBeNull();
  });
});

describe("SelectionActions", () => {
  test("exposes a named toolbar and makes Explain perform an action", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    const toolbar = screen.getByRole("toolbar", { name: "Selection actions" });
    fireEvent.click(within(toolbar).getByRole("button", { name: "Explain" }));
    await advance(1_000);

    expect(screen.getByRole("status").textContent).toContain(
      "This sentence prioritizes the Saturday churn",
    );
  });

  test("keeps an accepted rewrite and focuses the stable Keep action", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    fireEvent.click(screen.getByRole("button", { name: "Improve" }));
    await advance(700);
    await advance(3_000);

    const keep = screen.getByRole("button", { name: "Keep" });
    expect(document.activeElement).toBe(keep);
    fireEvent.click(keep);

    expect(
      screen.getByText(
        "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.",
      ),
    ).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain("Changes kept");
  });

  test("restores the committed text when a rewrite is discarded", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    fireEvent.click(screen.getByRole("button", { name: "Improve" }));
    await advance(700);
    await advance(3_000);
    fireEvent.click(screen.getByRole("button", { name: "Discard" }));

    expect(
      screen.getByText(
        "Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.",
      ),
    ).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Changes discarded",
    );
  });

  test("gives Grammar its own deterministic result and ready status", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    fireEvent.click(screen.getByRole("button", { name: "Show more actions" }));
    fireEvent.click(screen.getByRole("button", { name: "Grammar" }));
    await advance(700);
    await advance(3_000);

    expect(screen.getByText(
      "Churn the pistachio batch first thing Saturday so it has time to firm up before the afternoon rush.",
    )).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Grammar fix ready",
    );
  });

  test("gives the visual custom prompt its own deterministic result and status", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    const prompt = screen.getByRole("textbox", { name: "Describe edits" });
    fireEvent.change(prompt, { target: { value: "Make it more direct" } });
    fireEvent.click(screen.getByRole("button", { name: "Send edit instruction" }));
    await advance(700);
    await advance(3_000);

    expect(screen.getByText(
      "Churn pistachio early Saturday; let it firm before the afternoon rush.",
    )).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Custom edit ready: “Make it more direct”",
    );
  });

  test("resets locale-derived state on prop rerender but preserves the authored prompt", async () => {
    vi.useFakeTimers();
    const { rerender } = render(<SelectionActions lang="en" />);

    await advance(300);
    const prompt = screen.getByRole("textbox", { name: "Describe edits" });
    fireEvent.change(prompt, { target: { value: "Keep my exact instruction" } });
    fireEvent.click(screen.getByRole("button", { name: "Improve" }));
    await advance(700);
    await advance(3_000);
    expect(screen.getByRole("button", { name: "Keep" })).not.toBeNull();

    rerender(<SelectionActions lang="zh" />);

    expect(screen.queryByRole("button", { name: "保留" })).toBeNull();
    expect(screen.getByText(
      "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。",
    )).not.toBeNull();
    expect((screen.getByRole("textbox", { name: "描述修改要求" }) as HTMLInputElement).value)
      .toBe("Keep my exact instruction");
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("resets locale-derived state after a resolved context language toggle", async () => {
    vi.useFakeTimers();
    render(
      <LangProvider>
        <LanguageControls />
        <SelectionActions />
      </LangProvider>,
    );

    await advance(300);
    fireEvent.change(screen.getByRole("textbox", { name: "Describe edits" }), {
      target: { value: "Authored prompt" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Explain" }));
    await advance(700);
    expect(screen.getByRole("button", { name: "Done" })).not.toBeNull();

    fireEvent.click(screen.getByRole("button", {
      name: "Switch globally to Chinese",
    }));

    expect(screen.queryByRole("button", { name: "完成" })).toBeNull();
    expect(screen.getByText(
      "周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。",
    )).not.toBeNull();
    expect((screen.getByRole("textbox", { name: "描述修改要求" }) as HTMLInputElement).value)
      .toBe("Authored prompt");
    expect(screen.getByRole("status").textContent).toBe("");
  });

  test("keeps the delayed toolbar unmounted until reveal", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    expect(screen.queryByRole("toolbar", { name: "Selection actions" })).toBeNull();
    expect(screen.queryByRole("textbox", { name: "Describe edits" })).toBeNull();

    await advance(279);
    expect(screen.queryByRole("toolbar", { name: "Selection actions" })).toBeNull();

    await advance(1);
    expect(screen.getByRole("toolbar", { name: "Selection actions" })).not.toBeNull();
  });

  test("hands focus through Explain and Done when their controls unmount", async () => {
    vi.useFakeTimers();
    render(<SelectionActions />);

    await advance(300);
    const toolbar = screen.getByRole("toolbar", { name: "Selection actions" });
    const explain = screen.getByRole("button", { name: "Explain" });
    explain.focus();
    fireEvent.click(explain);
    expect(document.activeElement).toBe(toolbar);

    await advance(700);
    const done = screen.getByRole("button", { name: "Done" });
    expect(document.activeElement).toBe(done);
    fireEvent.click(done);
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Improve" }),
    );
  });

  test.each(["Keep", "Discard"])(
    "restores focus to Improve after %s unmounts",
    async (terminal) => {
      vi.useFakeTimers();
      render(<SelectionActions />);

      await advance(300);
      fireEvent.click(screen.getByRole("button", { name: "Improve" }));
      await advance(700);
    await advance(3_000);
      const control = screen.getByRole("button", { name: terminal });
      expect(document.activeElement).toBe(
        terminal === "Keep"
          ? control
          : screen.getByRole("button", { name: "Keep" }),
      );
      control.focus();
      fireEvent.click(control);
      expect(document.activeElement).toBe(
        screen.getByRole("button", { name: "Improve" }),
      );
    },
  );

  test("skips reveal, thinking, and streaming stages with reduced motion", () => {
    vi.useFakeTimers();
    reducedMotion(true);
    render(<SelectionActions />);

    fireEvent.click(screen.getByRole("button", { name: "Improve" }));

    expect(screen.getByText(
      "Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.",
    )).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain("Improved text ready");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Keep" }),
    );
  });
});

describe("StreamText", () => {
  test("streams Chinese text in incremental language-aware units", async () => {
    vi.useFakeTimers();
    const text = "周六一开工就先搅拌开心果这一批";
    const { container } = render(<StreamText text={text} />);

    await advance(46);

    const visible = container.textContent ?? "";
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.length).toBeLessThan(text.length);
  });

  test("renders complete non-typewriter text with reduced motion", () => {
    vi.useFakeTimers();
    reducedMotion(true);
    const onDone = vi.fn();
    const text = "Complete immediately";
    const { container } = render(<StreamText text={text} onDone={onDone} />);

    expect(container.textContent).toBe(text);
    expect(container.querySelector(".stream-caret")).toBeNull();
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });
});
