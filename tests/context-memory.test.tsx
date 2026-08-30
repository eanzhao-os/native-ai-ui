import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import ContextCards from "@/components/context-cards";
import ContextSpillover from "@/components/context-spillover";
import ContextWindow from "@/components/context-window";
import MemoryInspector from "@/components/memory-inspector";

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

describe("ContextWindow", () => {
  test("exposes capacity and segment selection through real controls", () => {
    render(<ContextWindow />);

    const progress = screen.getByRole("progressbar", {
      name: "Context usage",
    });
    expect(progress.getAttribute("aria-valuenow")).toBe("45.9");
    expect(progress.getAttribute("aria-valuemax")).toBe("100");

    const rag = screen.getByRole("button", {
      name: /RAG & Retrieved Docs/,
    });
    const history = screen.getByRole("button", {
      name: /Conversation History/,
    });
    expect(rag.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(rag);
    expect(rag.getAttribute("aria-pressed")).toBe("true");
    expect(history.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(history);
    expect(rag.getAttribute("aria-pressed")).toBe("false");
    expect(history.getAttribute("aria-pressed")).toBe("true");
  });

  test("reports pruned and restored capacity without changing the toggle name", () => {
    render(<ContextWindow />);

    const progress = screen.getByRole("progressbar", {
      name: "Context usage",
    });
    const prune = screen.getByRole("button", { name: "History pruning" });
    expect(within(prune).getByText("Prune History")).not.toBeNull();

    prune.focus();
    fireEvent.click(prune);
    expect(screen.getByRole("button", { name: "History pruning" })).toBe(prune);
    expect(within(prune).getByText("Restore Context")).not.toBeNull();
    expect(prune.getAttribute("aria-pressed")).toBe("true");
    expect(progress.getAttribute("aria-valuenow")).toBe("33.6");
    expect(screen.getByText("7,583")).not.toBeNull();
    expect(screen.getByText("2,805")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Context pruned to 42,988 tokens",
    );
    expect(document.activeElement).toBe(prune);

    fireEvent.click(prune);
    expect(screen.getByRole("button", { name: "History pruning" })).toBe(prune);
    expect(within(prune).getByText("Prune History")).not.toBeNull();
    expect(prune.getAttribute("aria-pressed")).toBe("false");
    expect(progress.getAttribute("aria-valuenow")).toBe("45.9");
    expect(screen.getByText("16,850")).not.toBeNull();
    expect(screen.getByText("9,350")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain(
      "Context restored to 58,800 tokens",
    );
  });

  test("localizes progress and the stable compaction toggle name", () => {
    render(<ContextWindow lang="zh" />);

    expect(
      screen.getByRole("progressbar", { name: "上下文占用率" }),
    ).not.toBeNull();
    const prune = screen.getByRole("button", { name: "历史精简" });
    expect(within(prune).getByText("精简历史")).not.toBeNull();
    fireEvent.click(prune);
    expect(screen.getByRole("button", { name: "历史精简" })).toBe(prune);
    expect(within(prune).getByText("恢复完整上下文")).not.toBeNull();
    expect(prune.getAttribute("aria-pressed")).toBe("true");
  });
});

describe("MemoryInspector", () => {
  test("uses selected filters and search with distinct authoritative results", () => {
    render(<MemoryInspector />);

    const all = screen.getByRole("button", { name: "All memories" });
    const rules = screen.getByRole("button", { name: "Rules" });
    const facts = screen.getByRole("button", { name: "Facts" });
    const status = screen.getByRole("status");
    expect(all.getAttribute("aria-pressed")).toBe("true");
    expect(rules.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(rules);
    expect(all.getAttribute("aria-pressed")).toBe("false");
    expect(rules.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Never print raw database/)).not.toBeNull();
    const rulesMessage = status.textContent;
    expect(rulesMessage).toContain("Rules");
    expect(rulesMessage).toContain("1 of 4 memories shown");

    fireEvent.click(facts);
    expect(facts.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Project uses Turborepo/)).not.toBeNull();
    const factsMessage = status.textContent;
    expect(factsMessage).toContain("Facts");
    expect(factsMessage).toContain("1 of 4 memories shown");
    expect(factsMessage).not.toBe(rulesMessage);

    fireEvent.click(all);
    fireEvent.change(
      screen.getByRole("searchbox", { name: "Search memory" }),
      { target: { value: "Turborepo" } },
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/Project uses Turborepo/)).not.toBeNull();
    expect(status.textContent).toContain('search "Turborepo"');
  });

  test("keeps the exact pin toggle name stable while pressed state changes", () => {
    render(<MemoryInspector />);

    const pin = screen.getByRole("button", {
      name: /Pin to prompt: Prefers functional React 19 components/,
    });
    expect(pin.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(pin);

    expect(
      screen.getByRole("button", {
        name: /Pin to prompt: Prefers functional React 19 components/,
      }),
    ).toBe(pin);
    expect(pin.getAttribute("aria-pressed")).toBe("false");
    expect(screen.getAllByText("Pinned")).toHaveLength(1);
    expect(screen.getByRole("status").textContent).toContain(
      "Unpinned memory",
    );

    fireEvent.click(pin);
    expect(
      screen.getByRole("button", {
        name: /Pin to prompt: Prefers functional React 19 components/,
      }),
    ).toBe(pin);
    expect(pin.getAttribute("aria-pressed")).toBe("true");
  });

  test("announces an updated total for every repeated Add Fact action", () => {
    render(<MemoryInspector />);

    const add = screen.getByRole("button", { name: "Add fact" });
    const status = screen.getByRole("status");
    fireEvent.click(add);

    expect(screen.getByText("5 stored facts")).not.toBeNull();
    expect(screen.getAllByText("fact", { exact: true })).toHaveLength(2);
    expect(
      screen.getByText("Always provide TypeScript types for tool parameters."),
    ).not.toBeNull();
    const firstMessage = status.textContent;
    expect(firstMessage).toContain("Added fact");
    expect(firstMessage).toContain("5 memories total");

    fireEvent.click(add);
    expect(screen.getByText("6 stored facts")).not.toBeNull();
    expect(screen.getAllByText("fact", { exact: true })).toHaveLength(3);
    const secondMessage = status.textContent;
    expect(secondMessage).toContain("Added fact");
    expect(secondMessage).toContain("6 memories total");
    expect(secondMessage).not.toBe(firstMessage);
  });

  test("announces forgetting and moves focus to the next memory action", async () => {
    render(<MemoryInspector />);

    const firstItem = screen
      .getByText(/Prefers functional React 19 components/)
      .closest('[role="listitem"]');
    expect(firstItem).toBeInstanceOf(HTMLElement);
    const forget = within(firstItem as HTMLElement).getByRole("button", {
      name: /Forget this memory: Prefers functional React 19 components/,
    });
    forget.focus();
    fireEvent.click(forget);

    expect(screen.getByRole("status").textContent).toContain("Forgot memory");
    await waitFor(() => {
      expect(document.activeElement).toBe(
        screen.getByRole("button", {
          name: /Pin to prompt: Never print raw database connection strings/,
        }),
      );
    });
  });

  test("localizes filter, search, and stable row action names", () => {
    render(<MemoryInspector lang="zh" />);

    expect(screen.getByRole("button", { name: "全部记忆" })).not.toBeNull();
    expect(screen.getByRole("searchbox", { name: "搜索记忆" })).not.toBeNull();
    const pin = screen.getByRole("button", {
      name: /置顶到 Prompt：偏好使用 React 19/,
    });
    expect(pin.getAttribute("aria-pressed")).toBe("true");
  });

  test("announces distinct localized equal-count filter transitions", () => {
    render(<MemoryInspector lang="zh" />);

    const status = screen.getByRole("status");
    fireEvent.click(screen.getByRole("button", { name: "规范" }));
    const rulesMessage = status.textContent;
    expect(rulesMessage).toContain("规范");
    expect(rulesMessage).toContain("显示 1 / 4 条记忆");

    fireEvent.click(screen.getByRole("button", { name: "事实" }));
    const factsMessage = status.textContent;
    expect(factsMessage).toContain("事实");
    expect(factsMessage).toContain("显示 1 / 4 条记忆");
    expect(factsMessage).not.toBe(rulesMessage);
  });

  test("announces distinct localized equal-count search queries", () => {
    render(<MemoryInspector lang="zh" />);

    const search = screen.getByRole("searchbox", { name: "搜索记忆" });
    const status = screen.getByRole("status");
    fireEvent.change(search, { target: { value: "React 19" } });
    const reactMessage = status.textContent;
    expect(reactMessage).toContain("全部记忆，搜索“React 19”");
    expect(reactMessage).toContain("显示 1 / 4 条记忆");

    fireEvent.change(search, { target: { value: "Turborepo" } });
    const turborepoMessage = status.textContent;
    expect(turborepoMessage).toContain("全部记忆，搜索“Turborepo”");
    expect(turborepoMessage).toContain("显示 1 / 4 条记忆");
    expect(turborepoMessage).not.toBe(reactMessage);
  });

  test("announces changing localized totals for repeated Add Fact actions", () => {
    render(<MemoryInspector lang="zh" />);

    const add = screen.getByRole("button", { name: "添加事实" });
    const status = screen.getByRole("status");
    fireEvent.click(add);
    const firstMessage = status.textContent;
    expect(firstMessage).toContain("已添加事实");
    expect(firstMessage).toContain("共 5 条记忆");

    fireEvent.click(add);
    const secondMessage = status.textContent;
    expect(secondMessage).toContain("已添加事实");
    expect(secondMessage).toContain("共 6 条记忆");
    expect(secondMessage).not.toBe(firstMessage);
  });
});

describe("ContextCards", () => {
  test("keeps retrieval busy until source metadata is ready", async () => {
    vi.useFakeTimers();
    render(<ContextCards />);

    const region = screen.getByRole("region", {
      name: "Top retrieved chunks",
    });
    const source = screen
      .getByText("Dairy Onboarding SOP.pdf")
      .closest("[aria-hidden]");
    expect(region.getAttribute("aria-busy")).toBe("true");
    expect(source?.getAttribute("aria-hidden")).toBe("true");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(699);
    });
    expect(region.getAttribute("aria-busy")).toBe("true");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(region.getAttribute("aria-busy")).toBe("false");
    expect(source?.getAttribute("aria-hidden")).toBe("false");
  });

  test("identifies the two shown chunks without fake source controls", async () => {
    vi.useFakeTimers();
    render(<ContextCards />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(700);
    });

    const region = screen.getByRole("region", {
      name: "Top retrieved chunks",
    });
    expect(within(region).getByText("2 / 32")).not.toBeNull();
    expect(within(region).getAllByRole("listitem")).toHaveLength(2);
    expect(within(region).queryAllByRole("button")).toHaveLength(0);
    expect(within(region).queryAllByRole("link")).toHaveLength(0);
  });
});

describe("ContextSpillover", () => {
  test("derives compaction progress from the spill records", () => {
    render(<ContextSpillover />);

    const progress = screen.getByRole("progressbar", {
      name: "Compaction efficiency",
    });
    expect(progress.getAttribute("aria-valuenow")).toBe("98.3");
    expect(screen.getByText("98.3% token compression")).not.toBeNull();
    expect(screen.getByText("In-memory active (1.7%)")).not.toBeNull();
    expect(screen.getByText("Spilled to disk (98.3%)")).not.toBeNull();
  });

  test("hydrates the exact spill with a valid disclosure relationship", () => {
    render(<ContextSpillover />);

    const first = screen.getByRole("button", {
      name: "Hydrate spill/ripgrep_ast_results.json",
    });
    const second = screen.getByRole("button", {
      name: "Hydrate spill/git_diff_refactor_v2.patch",
    });
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(second).hidden).toBe(true);

    fireEvent.click(second);

    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(controlledElement(second).hidden).toBe(false);
    expect(
      within(controlledElement(second)).getByText(/86,200 tokens offloaded/),
    ).not.toBeNull();

    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("false");
    expect(controlledElement(second).hidden).toBe(true);
  });

  test("keeps spill disclosure IDs unique across multiple instances", () => {
    render(
      <>
        <ContextSpillover />
        <ContextSpillover />
      </>,
    );

    const controls = screen.getAllByRole("button", { name: /Hydrate spill\// });
    const ids = controls.map((control) => control.getAttribute("aria-controls"));
    expect(new Set(ids).size).toBe(ids.length);
    for (const control of controls) controlledElement(control);
  });

  test("localizes spill progress and disclosure names", () => {
    render(<ContextSpillover lang="zh" />);

    expect(
      screen.getByRole("progressbar", { name: "压缩效率" }),
    ).not.toBeNull();
    expect(
      screen.getByRole("button", {
        name: "按需水合 spill/ripgrep_ast_results.json",
      }),
    ).not.toBeNull();
  });
});
