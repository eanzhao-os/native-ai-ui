import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useSectionSpy } from "@/app/use-section-spy";

class TestIntersectionObserver {
  static instances: TestIntersectionObserver[] = [];

  readonly root = null;
  readonly rootMargin = "-100px 0px -65% 0px";
  readonly thresholds = [0];

  constructor(private readonly callback: IntersectionObserverCallback) {
    TestIntersectionObserver.instances.push(this);
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  trigger(
    values: Array<{ target: Element; isIntersecting: boolean; top: number }>,
  ) {
    this.callback(
      values.map(({ target, isIntersecting, top }) => {
        const rect = {
          ...target.getBoundingClientRect(),
          top,
        } as DOMRect;
        return {
          boundingClientRect: rect,
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: rect,
          isIntersecting,
          rootBounds: null,
          target,
          time: 0,
        };
      }),
      this as unknown as IntersectionObserver,
    );
  }
}

afterEach(() => {
  TestIntersectionObserver.instances = [];
  document.body.replaceChildren();
  vi.unstubAllGlobals();
});

describe("useSectionSpy", () => {
  test("selects the intersecting section nearest the reading line", () => {
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
    const loading = document.createElement("section");
    loading.id = "loading-state";
    const branches = document.createElement("section");
    branches.id = "message-branches";
    document.body.append(loading, branches);

    const { result } = renderHook(() =>
      useSectionSpy(["loading-state", "message-branches"], "loading-state"),
    );

    act(() => {
      TestIntersectionObserver.instances[0].trigger([
        { target: loading, isIntersecting: true, top: 420 },
        { target: branches, isIntersecting: true, top: 128 },
      ]);
    });

    expect(result.current).toBe("message-branches");
  });

  test("preserves the initial section for an empty catalog", () => {
    vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);

    const { result } = renderHook(() =>
      useSectionSpy([], "loading-state"),
    );

    expect(result.current).toBe("loading-state");
  });
});
