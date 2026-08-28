import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import DemoViewport from "@/app/demo-viewport";

class TestIntersectionObserver {
  static instances: TestIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin = "800px 0px";
  readonly thresholds = [0];
  private lastTarget: Element | null = null;

  constructor(private readonly callback: IntersectionObserverCallback) {
    TestIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.lastTarget = target;
  }

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(isIntersecting: boolean) {
    if (!this.lastTarget) throw new Error("No viewport boundary was observed");
    const rect = this.lastTarget.getBoundingClientRect();
    this.callback(
      [
        {
          boundingClientRect: rect,
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: rect,
          isIntersecting,
          rootBounds: null,
          target: this.lastTarget,
          time: 0,
        },
      ],
      this as unknown as IntersectionObserver,
    );
  }
}

afterEach(() => {
  TestIntersectionObserver.instances = [];
  vi.unstubAllGlobals();
});

describe("DemoViewport", () => {
  test("mounts near the viewport and remains mounted", () => {
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    render(
      <DemoViewport>
        <p>Expensive demo</p>
      </DemoViewport>,
    );

    expect(screen.queryByText("Expensive demo")).toBeNull();
    const observer = TestIntersectionObserver.instances[0];

    act(() => observer.trigger(false));
    expect(screen.queryByText("Expensive demo")).toBeNull();

    act(() => observer.trigger(true));
    expect(screen.getByText("Expensive demo")).not.toBeNull();

    act(() => observer.trigger(false));
    expect(screen.getByText("Expensive demo")).not.toBeNull();
  });

  test("mounts immediately when IntersectionObserver is unavailable", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(
      <DemoViewport>
        <p>Fallback demo</p>
      </DemoViewport>,
    );

    expect(await screen.findByText("Fallback demo")).not.toBeNull();
  });
});
