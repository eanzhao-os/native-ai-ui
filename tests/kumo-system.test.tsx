import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, test, vi } from "vitest";
import AuthorizationSurface from "@/components/authorization-surface";
import FineTuneCard from "@/components/fine-tune-card";
import LayerCard from "@/components/layer-card";
import SearchList from "@/components/search";
import SensitiveInput from "@/components/sensitive-input";
import SessionList from "@/components/session-list";
import SettingsEditor from "@/components/settings-editor";
import SidebarNav from "@/components/sidebar-nav";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const originalExecCommand = Object.getOwnPropertyDescriptor(document, "execCommand");

function setClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, reject, resolve };
}

function setMotionPreference(reduced: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      addEventListener: vi.fn(),
      addListener: vi.fn(),
      dispatchEvent: vi.fn(),
      matches: query === "(prefers-reduced-motion: reduce)" && reduced,
      media: query,
      onchange: null,
      removeEventListener: vi.fn(),
      removeListener: vi.fn(),
    })),
  );
}

async function advance(milliseconds: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
}

function expectMotionSafeAnimation(element: HTMLElement) {
  expect(element.style.animation).toBe("");
  expect(element.className).toContain("motion-safe:animate-[");
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  for (const textarea of document.body.querySelectorAll("body > textarea")) {
    textarea.remove();
  }
  if (originalClipboard) {
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
  if (originalExecCommand) {
    Object.defineProperty(document, "execCommand", originalExecCommand);
  } else {
    Reflect.deleteProperty(document, "execCommand");
  }
});

describe("SensitiveInput", () => {
  test("exposes a localized pressed reveal control and secret-oriented input contract", () => {
    render(<SensitiveInput />);

    const input = screen.getByLabelText("DeepSeek API Token (Production)");
    const reveal = screen.getByRole("button", { name: "Reveal token" });
    expect(reveal.getAttribute("aria-pressed")).toBe("false");
    expect(input.getAttribute("autocomplete")).toBe("new-password");
    expect(input.getAttribute("spellcheck")).toBe("false");

    fireEvent.click(reveal);

    expect(screen.getByRole("button", { name: "Hide token" })).toBe(reveal);
    expect(reveal.getAttribute("aria-pressed")).toBe("true");
    expect((input as HTMLInputElement).type).toBe("text");
  });

  test("cleans up its legacy textarea when the fallback throws", async () => {
    Reflect.deleteProperty(navigator, "clipboard");
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn(() => {
        throw new Error("copy blocked");
      }),
    });
    render(<SensitiveInput />);

    fireEvent.click(screen.getByRole("button", { name: "Copy token" }));

    expect(await screen.findByText("Copy failed")).not.toBeNull();
    expect(document.body.querySelector("textarea")).toBeNull();
    expect(screen.queryByText("Copied!")).toBeNull();
  });

  test("ignores an older copy failure after a newer copy succeeds", async () => {
    const first = deferred<void>();
    const second = deferred<void>();
    const writeText = vi
      .fn()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);
    setClipboard(writeText);
    render(<SensitiveInput />);

    const copy = screen.getByRole("button", { name: "Copy token" });
    fireEvent.click(copy);
    fireEvent.click(copy);
    await act(async () => {
      second.resolve();
      await second.promise;
    });
    expect(screen.getByText("Copied!")).not.toBeNull();

    await act(async () => {
      first.reject(new Error("stale denial"));
      await first.promise.catch(() => undefined);
    });

    expect(screen.getByText("Copied!")).not.toBeNull();
    expect(screen.queryByText("Copy failed")).toBeNull();
  });

  test("restarts the success timeout for the latest copy", async () => {
    vi.useFakeTimers();
    setClipboard(vi.fn().mockResolvedValue(undefined));
    render(<SensitiveInput />);

    const copy = screen.getByRole("button", { name: "Copy token" });
    fireEvent.click(copy);
    await act(async () => {});
    expect(screen.getByText("Copied!")).not.toBeNull();

    await advance(1_000);
    fireEvent.click(copy);
    await act(async () => {});
    await advance(500);
    expect(screen.getByText("Copied!")).not.toBeNull();

    await advance(1_001);
    expect(screen.queryByText("Copied!")).toBeNull();
    expect(copy.textContent).toContain("Copy");
  });
});

describe("LayerCard", () => {
  test("keeps one controlled disclosure region with explicit state", () => {
    render(<LayerCard />);

    const disclosure = screen.getByRole("button", {
      name: "Collapse Harness Edge Worker details",
    });
    const regionId = disclosure.getAttribute("aria-controls");
    expect(disclosure.getAttribute("aria-expanded")).toBe("true");
    expect(regionId).toBeTruthy();
    const region = document.getElementById(regionId!);
    expect(region).not.toBeNull();
    expect(region?.hidden).toBe(false);

    fireEvent.click(disclosure);

    expect(screen.getByRole("button", {
      name: "Expand Harness Edge Worker details",
    })).toBe(disclosure);
    expect(disclosure.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById(regionId!)).toBe(region);
    expect(region?.hidden).toBe(true);
  });

  test("moves and selects the telemetry tabs from the keyboard", () => {
    render(<LayerCard />);

    const tablist = screen.getByRole("tablist", { name: "Worker details" });
    const metrics = within(tablist).getByRole("tab", { name: "Telemetry Metrics" });
    const events = within(tablist).getByRole("tab", { name: "Live Audit Events" });
    expect(metrics.getAttribute("aria-selected")).toBe("true");
    expect(events.getAttribute("aria-selected")).toBe("false");

    metrics.focus();
    fireEvent.keyDown(metrics, { key: "ArrowRight" });

    expect(document.activeElement).toBe(events);
    expect(events.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel", { name: "Live Audit Events" })).not.toBeNull();

    fireEvent.keyDown(events, { key: "Home" });
    expect(document.activeElement).toBe(metrics);
    expect(metrics.getAttribute("aria-selected")).toBe("true");
  });

  test("reports honest purge and deploy outcomes", () => {
    render(<LayerCard />);

    const status = screen.getByRole("status", { name: "Worker action status" });
    fireEvent.click(screen.getByRole("button", { name: "Purge Cache" }));
    expect(status.textContent).toContain("Cache purged");

    fireEvent.click(screen.getByRole("button", { name: "Deploy Changes" }));
    expect(screen.getByRole("status", { name: "Worker action status" })).toBe(status);
    expect(status.textContent).toContain("Changes deployed");
  });
});

describe("SidebarNav", () => {
  test("filters real navigation rows and announces empty quick-search results", () => {
    render(<SidebarNav />);

    const navigation = screen.getByRole("navigation", {
      name: "Workspace navigation",
    });
    expect(screen.queryByRole("button", { name: /Creamery Ops/ })).toBeNull();
    const search = within(navigation).getByRole("searchbox", {
      name: "Quick search navigation",
    });

    fireEvent.change(search, { target: { value: "supplier" } });
    expect(within(navigation).getByRole("button", { name: "Suppliers" })).not.toBeNull();
    expect(within(navigation).queryByRole("button", { name: /Agent tasks/ })).toBeNull();
    expect(screen.getByRole("status", { name: "Navigation search status" }).textContent).toContain(
      "1 navigation result",
    );

    fireEvent.change(search, { target: { value: "waffle" } });
    expect(within(navigation).getByText("No navigation results", { selector: "div" })).not.toBeNull();
    expect(screen.getByRole("status", { name: "Navigation search status" }).textContent).toContain(
      "No navigation results",
    );
  });

  test("focuses quick search with slash and moves among visible rows with arrows", () => {
    render(<SidebarNav />);

    const search = screen.getByRole("searchbox", {
      name: "Quick search navigation",
    });
    fireEvent.keyDown(document, { key: "/" });
    expect(document.activeElement).toBe(search);

    fireEvent.change(search, { target: { value: "" } });
    const tasks = screen.getByRole("button", { name: /Agent tasks/ });
    const inbox = screen.getByRole("button", { name: "Inbox" });
    tasks.focus();
    fireEvent.keyDown(tasks, { key: "ArrowDown" });
    expect(document.activeElement).toBe(inbox);

    fireEvent.keyDown(inbox, { key: "Home" });
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Home" }));
  });

  test("gates highlight movement and badge entry behind motion-safe styles", () => {
    setMotionPreference(true);
    const { container } = render(<SidebarNav />);

    const glide = container.querySelector<HTMLElement>(
      'span[aria-hidden][style*="top"]',
    );
    const badge = screen.getByText("4", { selector: "span" });

    expect(glide).not.toBeNull();
    expect(glide?.style.transition).toBe("");
    expect(glide?.className).toContain("motion-safe:transition-[");
    expectMotionSafeAnimation(badge);
  });
});

describe("SearchList", () => {
  test("uses one explicit clear action without a native search affordance", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    fireEvent.change(combobox, { target: { value: "seasonal" } });

    expect(combobox.getAttribute("type")).toBe("text");
    expect(screen.getAllByRole("button", { name: "Clear search" })).toHaveLength(1);
  });

  test("draws keyboard focus on the combobox shell", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    expect(combobox.parentElement?.className).toContain(
      "focus-within:shadow-[inset_0_0_0_2px_var(--accent)]",
    );
  });

  test("keeps every result-state entry animation motion-safe", () => {
    setMotionPreference(true);
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    fireEvent.change(combobox, { target: { value: "seasonal" } });

    expectMotionSafeAnimation(
      screen.getByRole("button", { name: "Clear search" }),
    );
    expectMotionSafeAnimation(
      screen.getByRole("option", { name: "Compare seasonal flavors" }),
    );

    fireEvent.change(combobox, { target: { value: "q" } });
    expectMotionSafeAnimation(screen.getByText("No results found").parentElement!);
  });

  test("keeps pointer focus on the combobox after clearing", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    fireEvent.change(combobox, { target: { value: "seasonal" } });
    combobox.focus();
    const clear = screen.getByRole("button", { name: "Clear search" });

    const pointerDefaultAllowed = fireEvent.pointerDown(clear, {
      pointerType: "mouse",
    });
    if (pointerDefaultAllowed) clear.focus();
    fireEvent.click(clear);

    expect(pointerDefaultAllowed).toBe(false);
    expect(document.activeElement).toBe(combobox);
    expect((combobox as HTMLInputElement).value).toBe("");
  });

  test("keeps pointer focus on the combobox after choosing an option", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    fireEvent.change(combobox, { target: { value: "seasonal" } });
    combobox.focus();
    const option = screen.getByRole("option", {
      name: "Compare seasonal flavors",
    });

    const pointerDefaultAllowed = fireEvent.pointerDown(option, {
      pointerType: "mouse",
    });
    if (pointerDefaultAllowed) option.focus();
    fireEvent.click(option);

    expect(pointerDefaultAllowed).toBe(false);
    expect(document.activeElement).toBe(combobox);
    expect((combobox as HTMLInputElement).value).toBe(
      "Compare seasonal flavors",
    );
  });

  test("exposes a combobox, listbox, options, and one-character empty state", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    const listbox = screen.getByRole("listbox", { name: "Flavor search results" });
    expect(within(listbox).getAllByRole("option")).toHaveLength(5);
    expect(screen.getByRole("status", { name: "Search status" }).textContent).toContain(
      "5 results",
    );

    fireEvent.change(combobox, { target: { value: "q" } });

    expect(screen.getByText("No results found")).not.toBeNull();
    expect(screen.queryByRole("option")).toBeNull();
    expect(screen.getByRole("status", { name: "Search status" }).textContent).toContain(
      "No results",
    );
  });

  test("moves the active option and confirms a keyboard selection", () => {
    render(<SearchList />);

    const combobox = screen.getByRole("combobox", { name: "Search flavors" });
    combobox.focus();
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(combobox.getAttribute("aria-activedescendant")).toMatch(/-option-0$/);

    fireEvent.keyDown(combobox, { key: "End" });
    const lastId = combobox.getAttribute("aria-activedescendant");
    expect(lastId).toMatch(/-option-4$/);
    fireEvent.keyDown(combobox, { key: "Enter" });

    expect((combobox as HTMLInputElement).value).toBe("Check cold-chain status");
    const selected = screen.getByRole("option", { name: "Check cold-chain status" });
    expect(selected.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("status", { name: "Search status" }).textContent).toContain(
      "Selected Check cold-chain status",
    );

    fireEvent.keyDown(combobox, { key: "Escape" });
    expect((combobox as HTMLInputElement).value).toBe("");
    expect(combobox.hasAttribute("aria-activedescendant")).toBe(false);
    expect(screen.getByRole("status", { name: "Search status" }).textContent).toContain(
      "5 results",
    );
  });
});

describe("SessionList", () => {
  test("names the session roster and exposes a distinct focus boundary", () => {
    render(<SessionList />);

    expect(screen.getByRole("list", { name: "Sessions" })).not.toBeNull();
    expect(screen.getByRole("status", { name: "Live session count" }).textContent).toBe("2");
    const second = screen.getByRole("button", {
      name: /Audit supplier import jobs/,
    });
    expect(second.className).toContain(
      "focus-visible:shadow-[inset_0_0_0_2px_var(--accent)]",
    );
  });

  test("does not advance the activity loop under reduced motion", async () => {
    vi.useFakeTimers();
    setMotionPreference(true);
    render(<SessionList />);

    const second = screen.getByRole("button", {
      name: /Audit supplier import jobs/,
    });
    expect(within(second).getByLabelText("1 unread event")).not.toBeNull();

    await advance(5_200);

    expect(within(second).getByLabelText("1 unread event")).not.toBeNull();
    expect(within(second).queryByLabelText("2 unread events")).toBeNull();
  });

  test("hydrates a reduced-motion client without mismatching the server shell", async () => {
    setMotionPreference(false);
    const serverHtml = renderToString(<SessionList />);
    const container = document.createElement("div");
    container.innerHTML = serverHtml;
    document.body.append(container);

    setMotionPreference(true);
    const hydrationMessages: string[] = [];
    const errorSpy = vi.spyOn(console, "error").mockImplementation((...args) => {
      hydrationMessages.push(args.map(String).join(" "));
    });
    let root: Root | undefined;

    try {
      await act(async () => {
        root = hydrateRoot(container, <SessionList />, {
          onRecoverableError: (error) => {
            hydrationMessages.push(String(error));
          },
        });
      });

      expect(
        hydrationMessages.filter((message) => /hydrat/i.test(message)),
      ).toEqual([]);
      const glide = container.querySelector<HTMLElement>(
        'span[aria-hidden][style*="top"]',
      );
      expect(glide?.style.transition).toBe("none");
    } finally {
      await act(async () => root?.unmount());
      errorSpy.mockRestore();
      container.remove();
    }
  });
});

describe("AuthorizationSurface", () => {
  test("names provider withdrawal and announces the revoked provider", () => {
    render(<AuthorizationSurface />);

    const signOut = screen.getByRole("button", { name: "Sign out of openai" });
    fireEvent.click(signOut);

    expect(screen.getByRole("button", { name: "Sign in to openai" })).not.toBeNull();
    expect(screen.getByRole("status", { name: "Authorization status" }).textContent).toContain(
      "Revoked openai",
    );
  });

  test("focuses the credential input after keyboard sign-in", () => {
    render(<AuthorizationSurface />);

    const signIn = screen.getByRole("button", { name: "Sign in to deepseek" });
    signIn.focus();
    fireEvent.click(signIn, { detail: 0 });

    expect(document.activeElement).toBe(screen.getByLabelText("Access token"));
  });

  test("restores the originating provider control after keyboard withdrawal", () => {
    render(<AuthorizationSurface />);

    const signIn = screen.getByRole("button", { name: "Sign in to deepseek" });
    signIn.focus();
    fireEvent.click(signIn, { detail: 0 });
    const withdraw = screen.getByRole("button", { name: "Withdraw" });
    withdraw.focus();
    fireEvent.click(withdraw, { detail: 0 });

    const restored = screen.getByRole("button", { name: "Sign in to deepseek" });
    expect(document.activeElement).toBe(restored);
  });

  test("restores the originating provider control after authorization completes", async () => {
    vi.useFakeTimers();
    render(<AuthorizationSurface />);

    const signIn = screen.getByRole("button", { name: "Sign in to deepseek" });
    signIn.focus();
    fireEvent.click(signIn, { detail: 0 });
    fireEvent.change(screen.getByLabelText("Access token"), {
      target: { value: "dsk-live-test" },
    });
    const authorize = screen.getByRole("button", { name: "Authorize" });
    authorize.focus();
    fireEvent.click(authorize, { detail: 0 });

    await advance(900);

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Sign out of deepseek" }),
    );
  });

  test("hands focused provider control into and back out of the automatic prompt", async () => {
    vi.useFakeTimers();
    render(<AuthorizationSurface />);

    const signIn = screen.getByRole("button", { name: "Sign in to deepseek" });
    signIn.focus();

    await advance(1_400);

    expect(document.activeElement).toBe(screen.getByLabelText("Access token"));
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }), {
      detail: 0,
    });
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Sign in to deepseek" }),
    );
  });

  test("restores the focused provider after the automatic flow completes", async () => {
    vi.useFakeTimers();
    render(<AuthorizationSurface />);

    const signIn = screen.getByRole("button", { name: "Sign in to deepseek" });
    signIn.focus();

    await advance(1_400);

    const input = screen.getByLabelText("Access token");
    expect(document.activeElement).toBe(input);
    fireEvent.change(input, { target: { value: "dsk-live-test" } });
    fireEvent.click(screen.getByRole("button", { name: "Authorize" }), {
      detail: 0,
    });
    await advance(900);

    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "Sign out of deepseek" }),
    );
  });

  test("does not steal outside focus when the automatic prompt opens", async () => {
    vi.useFakeTimers();
    render(
      <>
        <button type="button">Outside control</button>
        <AuthorizationSurface />
      </>,
    );

    const outside = screen.getByRole("button", { name: "Outside control" });
    outside.focus();

    await advance(1_400);

    expect(screen.getByLabelText("Access token")).not.toBeNull();
    expect(document.activeElement).toBe(outside);
  });

  test("gates configured and completion entry animations behind motion-safe styles", async () => {
    vi.useFakeTimers();
    setMotionPreference(true);
    render(<AuthorizationSurface />);

    expectMotionSafeAnimation(screen.getByText("Configured", { selector: "span" }));

    fireEvent.click(screen.getByRole("button", { name: "Sign in to deepseek" }));
    fireEvent.change(screen.getByLabelText("Access token"), {
      target: { value: "dsk-live-test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Authorize" }));
    await advance(900);

    const completion = screen.getByText(
      "Authorized — credential written to the vault",
    ).previousElementSibling as HTMLElement;
    expectMotionSafeAnimation(completion);
    for (const configured of screen.getAllByText("Configured", {
      selector: "span",
    })) {
      expectMotionSafeAnimation(configured);
    }
  });

  test("exposes pressed reveal and busy authorization semantics", () => {
    render(<AuthorizationSurface />);

    const surface = screen.getByRole("region", { name: "Authorization directory" });
    fireEvent.click(screen.getByRole("button", { name: "Sign in to deepseek" }));
    const reveal = screen.getByRole("button", { name: "Reveal token" });
    expect(reveal.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(reveal);
    expect(reveal.getAttribute("aria-pressed")).toBe("true");

    fireEvent.change(screen.getByLabelText("Access token"), {
      target: { value: "dsk-live-test" },
    });
    const authorize = screen.getByRole("button", { name: "Authorize" });
    fireEvent.click(authorize);

    expect(surface.getAttribute("aria-busy")).toBe("true");
    expect(authorize.hasAttribute("disabled")).toBe(true);
    expect(authorize.getAttribute("aria-busy")).toBe("true");
    expect(screen.getByRole("status", { name: "Authorization status" }).textContent).toContain(
      "Authorizing deepseek",
    );
  });
});

describe("SettingsEditor", () => {
  test("gates the conflict entry animation behind motion-safe styles", () => {
    setMotionPreference(true);
    render(<SettingsEditor visualCase="conflict" />);

    expectMotionSafeAnimation(screen.getByRole("alert"));
  });

  test("keeps one live status node and marks save work busy", async () => {
    vi.useFakeTimers();
    render(<SettingsEditor />);

    const region = screen.getByRole("region", { name: "llm settings" });
    const status = screen.getByRole("status", { name: "Settings status" });
    const editor = screen.getByLabelText("Settings JSON");
    fireEvent.change(editor, { target: { value: '{\n  "theme": "dark"\n}' } });
    fireEvent.click(screen.getByRole("button", { name: "Save revision" }));

    expect(region.getAttribute("aria-busy")).toBe("true");
    expect(status.textContent).toContain("Saving");
    await advance(650);

    expect(screen.getByRole("status", { name: "Settings status" })).toBe(status);
    expect(status.textContent).toContain("Saved revision 8");
    expect(region.getAttribute("aria-busy")).toBe("false");
  });

  test("describes conflict errors and keeps refetch controls busy until replacement", async () => {
    vi.useFakeTimers();
    render(<SettingsEditor visualCase="conflict" />);

    const region = screen.getByRole("region", { name: "llm settings" });
    const editor = screen.getByLabelText("Settings JSON");
    const conflict = screen.getByRole("alert");
    expect(editor.getAttribute("aria-invalid")).toBe("true");
    expect(editor.getAttribute("aria-describedby")?.split(" ")).toContain(conflict.id);

    fireEvent.click(
      screen.getByRole("button", { name: "Discard changes and refetch" }),
    );

    const refetching = screen.getByRole("button", { name: "Refetching settings" });
    expect(refetching.hasAttribute("disabled")).toBe(true);
    expect(refetching.getAttribute("aria-busy")).toBe("true");
    expect(region.getAttribute("aria-busy")).toBe("true");

    await advance(900);
    expect(editor.getAttribute("aria-invalid")).toBe("false");
    expect(region.getAttribute("aria-busy")).toBe("false");
  });
});

describe("FineTuneCard", () => {
  test("labels layout selection and exposes slider bounds with localized value text", () => {
    render(<FineTuneCard />);

    expect(screen.getByRole("group", { name: "Layout direction" })).not.toBeNull();
    const radius = screen.getByRole("slider", { name: "Radius" });
    expect(radius.getAttribute("aria-valuetext")).toBe("28 pixels");

    radius.focus();
    fireEvent.keyDown(radius, { key: "Home" });
    expect(radius.getAttribute("aria-valuenow")).toBe("0");
    expect(radius.getAttribute("aria-valuetext")).toBe("0 pixels");

    fireEvent.keyDown(radius, { key: "End" });
    expect(radius.getAttribute("aria-valuenow")).toBe("64");
    expect(radius.getAttribute("aria-valuetext")).toBe("64 pixels");
    expect(screen.getByRole("status", { name: "Tuning status" }).textContent).toContain(
      "Edited",
    );
  });

  test("stops scrubbing after pointer cancellation", () => {
    render(<FineTuneCard />);

    const width = screen.getByRole("slider", { name: "W" });
    Object.defineProperty(width, "setPointerCapture", {
      configurable: true,
      value: vi.fn(),
    });
    fireEvent.pointerDown(width, { clientX: 10, pointerId: 1 });
    fireEvent.pointerCancel(width, { pointerId: 1 });
    fireEvent.pointerMove(width, { clientX: 100, pointerId: 1 });

    expect(width.getAttribute("aria-valuenow")).toBe("324");
  });

  test("operates type options by keyboard and restores trigger focus", () => {
    render(<FineTuneCard />);

    const trigger = screen.getByRole("button", { name: "Select flavor type" });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    const listbox = screen.getByRole("listbox", { name: "Flavor type" });
    const seasonal = within(listbox).getByRole("option", { name: "Seasonal" });
    expect(document.activeElement).toBe(seasonal);
    fireEvent.keyDown(seasonal, { key: "End" });
    const limited = within(listbox).getByRole("option", { name: "Limited" });
    expect(document.activeElement).toBe(limited);
    fireEvent.keyDown(limited, { key: "Enter" });

    expect(document.activeElement).toBe(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.textContent).toContain("Limited");
    expect(screen.getByRole("status", { name: "Tuning status" }).textContent).toContain(
      "Edited",
    );

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const reopened = screen.getByRole("listbox", { name: "Flavor type" });
    const selected = within(reopened).getByRole("option", { name: "Limited" });
    expect(selected.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(selected, { key: "Escape" });
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByRole("listbox", { name: "Flavor type" })).toBeNull();
  });
});
