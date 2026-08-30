import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import PromptBar from "@/components/prompt-bar";
import StreamingText from "@/components/streaming-text";
import ThinkingState from "@/components/thinking";

const shaderProbe = vi.hoisted(() => ({
  randomAtCreate: undefined as typeof Math.random | undefined,
}));

vi.mock("glimm", () => ({
  ACCENTS: {
    red: "red",
    orange: "orange",
    yellow: "yellow",
    green: "green",
    cyan: "cyan",
    blue: "blue",
    purple: "purple",
  },
  accentChain: vi.fn((accents: unknown[]) => accents),
  createShader: vi.fn(() => {
    shaderProbe.randomAtCreate = Math.random;
    return { destroy: vi.fn() };
  }),
  playSweep: vi.fn(() => ({ done: Promise.resolve() })),
}));

async function advanceUntil(
  predicate: () => boolean,
  { maxSteps, stepMs }: { maxSteps: number; stepMs: number },
) {
  for (let step = 0; step < maxSteps; step += 1) {
    if (predicate()) return;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(stepMs);
    });
  }
  if (!predicate()) throw new Error("Timed state did not reach its condition");
}

afterEach(() => {
  vi.useRealTimers();
});

describe("PromptBar", () => {
  test("does not replace Math.random while creating its shader", () => {
    const randomBeforeRender = Math.random;

    render(<PromptBar />);

    expect(shaderProbe.randomAtCreate).toBe(randomBeforeRender);
  });

  test("submits and clears a localized draft through the real Send control", () => {
    render(<PromptBar lang="zh" />);

    const input = screen.getByRole("textbox", {
      name: "提示词输入框",
    }) as HTMLTextAreaElement;
    const send = screen.getByRole("button", {
      name: "发送",
    }) as HTMLButtonElement;

    fireEvent.pointerDown(input);
    fireEvent.change(input, { target: { value: "对比开心果周末销量" } });

    expect(input.value).toBe("对比开心果周末销量");
    expect(send.disabled).toBe(false);

    fireEvent.click(send);

    expect(input.value).toBe("");
    expect(input.placeholder).toBe("输入消息…");
    expect(send.disabled).toBe(true);
  });
});

describe("ThinkingState", () => {
  test("completes and toggles the localized trace expansion", async () => {
    vi.useFakeTimers();
    render(<ThinkingState lang="zh" />);

    await advanceUntil(() => {
      const completed = screen.queryByRole("button", {
        name: "已深度思考 4 秒",
      });
      return completed?.getAttribute("aria-expanded") === "false";
    }, { maxSteps: 80, stepMs: 100 });

    const toggle = screen.getByRole("button", {
      name: "已深度思考 4 秒",
    });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("解析风味研发简报")).not.toBeNull();
    expect(screen.getByText("扫描合规原料供应商名录")).not.toBeNull();
    expect(screen.getByText("比对盲测品鉴笔记")).not.toBeNull();
    expect(screen.getByText("生成冰淇淋上架评估报告")).not.toBeNull();

    fireEvent.click(toggle);

    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });
});

describe("StreamingText", () => {
  test("completes and toggles the localized source drawer", async () => {
    vi.useFakeTimers();
    render(<StreamingText lang="zh" />);

    const sources = screen.getByRole("button", { name: "10 处引用源" });
    expect(sources.parentElement?.style.opacity).toBe("0");

    await advanceUntil(
      () => sources.parentElement?.style.opacity === "1",
      { maxSteps: 100, stepMs: 55 },
    );

    expect(sources.parentElement?.style.opacity).toBe("1");
    expect(sources.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(sources);

    expect(sources.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Scoop Data")).not.toBeNull();
    expect(screen.getByText("Trends Index")).not.toBeNull();
    expect(screen.getByText("Market Basket")).not.toBeNull();

    fireEvent.click(sources);

    expect(sources.getAttribute("aria-expanded")).toBe("false");
  });
});
