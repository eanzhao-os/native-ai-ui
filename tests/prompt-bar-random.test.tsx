import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PromptBar from "@/components/prompt-bar";

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

describe("PromptBar", () => {
  test("does not replace Math.random while creating its shader", () => {
    const randomBeforeRender = Math.random;

    render(<PromptBar />);

    expect(shaderProbe.randomAtCreate).toBe(randomBeforeRender);
  });
});
