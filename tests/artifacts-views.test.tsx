import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import ArtifactSandbox from "@/components/artifact-sandbox";
import DiffTable from "@/components/diff-table";
import FilterTable from "@/components/filter-table";
import RecordsTable from "@/components/records-table";
import SelectionActions from "@/components/selection-actions";
import { StreamText } from "@/components/atoms/StreamText";

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

  test("sorts last interaction chronologically and announces the direction", () => {
    render(<RecordsTable />);

    const sort = screen.getByRole("button", { name: "Last interaction" });
    fireEvent.click(sort);

    const rows = screen.getAllByRole("row");
    expect(rows[1].textContent).toContain("Aurora Scoops — Reykjavík");
    expect(sort.closest("th")?.getAttribute("aria-sort")).toBe("ascending");
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
});
