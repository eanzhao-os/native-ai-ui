import { describe, expect, test, afterEach, vi } from "vitest";
import { setGlobalLang, getGlobalLang } from "../vanilla/core/lang.js";
import "../vanilla/index.js";

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);
const originalExecCommand = Object.getOwnPropertyDescriptor(
  document,
  "execCommand",
);

function useClipboard(writeText: (value: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function useLegacyCopy(result: boolean) {
  const execCommand = vi.fn(() => result);
  Object.defineProperty(document, "execCommand", {
    configurable: true,
    value: execCommand,
  });
  return execCommand;
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

afterEach(() => {
  document.body.innerHTML = "";
  setGlobalLang("en");
  vi.useRealTimers();
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

describe("Vanilla ES Modules & Web Components", () => {
  test("i18n manager manages global language and dispatches event", () => {
    expect(getGlobalLang()).toBe("en");
    let notified = "";
    const handler = (e: any) => {
      notified = e.detail.lang;
    };
    window.addEventListener("nai-lang-change", handler);

    setGlobalLang("zh");
    expect(getGlobalLang()).toBe("zh");
    expect(notified).toBe("zh");
    expect(document.documentElement.lang).toBe("zh");

    window.removeEventListener("nai-lang-change", handler);
  });

  test("<nai-loading-state> mounts and renders correctly", () => {
    const el = document.createElement("nai-loading-state") as any;
    el.setAttribute("variant", "Dots");
    el.setAttribute("label", "Processing");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const labelEl = el.shadowRoot.querySelector(".label");
    expect(labelEl.textContent).toBe("Processing");
    const pixels = el.shadowRoot.querySelectorAll(".pixel");
    expect(pixels.length).toBe(9);
  });

  test("<nai-thinking> renders active state and handles expand toggle", () => {
    const el = document.createElement("nai-thinking") as any;
    el.setAttribute("variant", "Reasoning");
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const headerBtn = el.shadowRoot.querySelector(".header-btn");
    expect(headerBtn).toBeTruthy();

    const trace = el.shadowRoot.querySelector(".trace-container");
    expect(trace).toBeTruthy();
  });

  test("<nai-streaming-text> renders content and action buttons", () => {
    const el = document.createElement("nai-streaming-text") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const content = el.shadowRoot.querySelector(".content");
    expect(content).toBeTruthy();
    const copyBtn = el.shadowRoot.querySelector(".copy-btn");
    expect(copyBtn).toBeTruthy();
  });

  test("<nai-approval-card> handles option selection and navigation", () => {
    const el = document.createElement("nai-approval-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const options = el.shadowRoot.querySelectorAll(".option-item");
    expect(options.length).toBeGreaterThan(0);

    // Click first option
    options[0].click();
    const selectedOption = el.shadowRoot.querySelector(".option-item.selected");
    expect(selectedOption).toBeTruthy();
  });

  test("<nai-prompt-bar> mounts, updates input, and handles send event", () => {
    const el = document.createElement("nai-prompt-bar") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const textarea = el.shadowRoot.querySelector("textarea");
    expect(textarea).toBeTruthy();

    let submittedData: any = null;
    el.addEventListener("submit", (e: any) => {
      submittedData = e.detail;
    });

    textarea.value = "Test query";
    textarea.dispatchEvent(new Event("input"));

    el.send();
    expect(submittedData).toEqual({
      text: "Test query",
      model: "sprinkles-5",
    });
  });

  test("<nai-chat> switches tabs and sends message", () => {
    const el = document.createElement("nai-chat") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const tabBtns = el.shadowRoot.querySelectorAll(".tab-btn");
    expect(tabBtns.length).toBe(2);

    tabBtns[1].click();
    expect(el._tab).toBe("suppliers");
  });

  test("<nai-turn-lifecycle> mounts and displays event bracket stream", () => {
    const el = document.createElement("nai-turn-lifecycle") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const title = el.shadowRoot.querySelector(".title");
    expect(title.textContent).toBe("Turn Bracket Stream");
    const timeline = el.shadowRoot.querySelector(".timeline");
    expect(timeline).toBeTruthy();
  });

  test("<nai-agent-inbox> mounts and displays dual-queue lanes", () => {
    const el = document.createElement("nai-agent-inbox") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const lanes = el.shadowRoot.querySelectorAll(".lane");
    expect(lanes.length).toBe(2);
    const methods = el.shadowRoot.querySelectorAll(".method-card");
    expect(methods.length).toBe(4);
  });

  test("<nai-hook-pipeline> mounts and evaluates decision pipeline", () => {
    const el = document.createElement("nai-hook-pipeline") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const points = el.shadowRoot.querySelectorAll(".point-tag");
    expect(points.length).toBe(6);
    const hooks = el.shadowRoot.querySelectorAll(".hook-item");
    expect(hooks.length).toBe(3);
    const mergeBar = el.shadowRoot.querySelector(".merge-bar");
    expect(mergeBar).toBeTruthy();
  });

  test("<nai-session-telemetry> mounts and displays metrics and sparkline", () => {
    const el = document.createElement("nai-session-telemetry") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const metrics = el.shadowRoot.querySelectorAll(".metric-tile");
    expect(metrics.length).toBe(6);
    const spark = el.shadowRoot.querySelector(".spark-container");
    expect(spark).toBeTruthy();
  });

  test("<nai-workflow-run> mounts and displays slots and item grid", () => {
    const el = document.createElement("nai-workflow-run") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const slots = el.shadowRoot.querySelectorAll(".slot-row");
    expect(slots.length).toBe(4);
    const items = el.shadowRoot.querySelectorAll(".item-tile");
    expect(items.length).toBe(40);
  });

  test("<nai-checkpoint-timeline> handles checkpoint selection and restoration", () => {
    const el = document.createElement("nai-checkpoint-timeline") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const navBtns = el.shadowRoot.querySelectorAll(".nav-btn");
    expect(navBtns.length).toBe(3);

    // Select first checkpoint
    navBtns[0].click();
    expect(el._selected).toBe(0);

    const restoreBtn = el.shadowRoot.querySelector("#btn-trigger-restore");
    expect(restoreBtn).toBeTruthy();
    restoreBtn.click();
    expect(el._confirming).toBe(true);

    const confirmBtn = el.shadowRoot.querySelector("#btn-confirm-restore");
    expect(confirmBtn).toBeTruthy();
    confirmBtn.click();
    expect(el._current).toBe(0);
    expect(el._confirming).toBe(false);
  });

  test("<nai-cordis-plugin-tree> toggles plugins and triggers HMR", () => {
    const el = document.createElement("nai-cordis-plugin-tree") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const toggleBtns = el.shadowRoot.querySelectorAll(".toggle-btn");
    expect(toggleBtns.length).toBe(4);

    // Toggle first plugin
    toggleBtns[0].click();
    expect(el._plugins[0].enabled).toBe(false);

    // Toggle back
    toggleBtns[0].click();
    expect(el._plugins[0].enabled).toBe(true);
  });

  test("<nai-permission-preset-card> selects preset and replays audit", () => {
    const el = document.createElement("nai-permission-preset-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const presets = el.shadowRoot.querySelectorAll(".preset-tile");
    expect(presets.length).toBe(3);

    // Select first preset
    presets[0].click();
    expect(el._selectedPreset).toBe("strict");

    const replayBtn = el.shadowRoot.querySelector("#btn-replay-audit");
    expect(replayBtn).toBeTruthy();
    replayBtn.click();
    expect(el._isReplaying).toBe(true);
  });

  test("<nai-lsp-diagnostics> filters diagnostics and triggers auto-fix", () => {
    const el = document.createElement("nai-lsp-diagnostics") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const filterBtns = el.shadowRoot.querySelectorAll(".filter-btn");
    expect(filterBtns.length).toBe(3);

    // Filter to error
    filterBtns[1].click();
    expect(el._filter).toBe("error");

    const fixBtn = el.shadowRoot.querySelector(".btn-fix");
    expect(fixBtn).toBeTruthy();
    fixBtn.click();
    expect(el._fixedIds.length).toBe(1);
  });

  test("<nai-sandbox-manager> restarts container and updates metrics", () => {
    const el = document.createElement("nai-sandbox-manager") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const restartBtn = el.shadowRoot.querySelector("#btn-restart");
    expect(restartBtn).toBeTruthy();

    restartBtn.click();
    expect(el._isRunning).toBe(false);
  });

  test("<nai-job-scheduler> toggles cron jobs and triggers immediate run", () => {
    const el = document.createElement("nai-job-scheduler") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const toggleBtns = el.shadowRoot.querySelectorAll(".toggle-btn");
    expect(toggleBtns.length).toBe(3);

    toggleBtns[0].click();
    expect(el._jobs[0].enabled).toBe(false);

    const triggerBtns = el.shadowRoot.querySelectorAll(".btn-trigger");
    expect(triggerBtns.length).toBe(3);
    triggerBtns[1].click();
    expect(el._triggeringId).toBe("job-2");
  });

  test("<nai-mcp-servers> toggles accordion and handles server retry", () => {
    const el = document.createElement("nai-mcp-servers") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const serverRows = el.shadowRoot.querySelectorAll(".server-row");
    expect(serverRows.length).toBe(3);

    // Expand second server
    serverRows[1].click();
    expect(el._expanded).toBe("rg");

    // Expand third server (error)
    serverRows[2].click();
    expect(el._expanded).toBe("web");

    const retryBtn = el.shadowRoot.querySelector("#btn-retry-mcp");
    expect(retryBtn).toBeTruthy();
    retryBtn.click();
    expect(el._retrying).toBe(true);
  });

  test("<nai-code-block> mounts and renders code lines and copy button", async () => {
    const el = document.createElement("nai-code-block") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const filename = el.shadowRoot.querySelector(".filename");
    expect(filename.textContent).toBe("churn.ts");
    const pre = el.shadowRoot.querySelector("pre");
    expect(pre).toBeTruthy();
    const copyBtn = el.shadowRoot.querySelector(".copy-btn");
    expect(copyBtn).toBeTruthy();
  });

  test("<nai-attachment-queue> mounts, retries, and removes attachments", () => {
    const el = document.createElement("nai-attachment-queue") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const items = el.shadowRoot.querySelectorAll(".item");
    expect(items.length).toBe(4);

    // Test retry on failed item
    const retryBtn = el.shadowRoot.querySelector(".btn-retry");
    expect(retryBtn).toBeTruthy();
    retryBtn.click();
    expect(el._attachments.find((a: any) => a.id === "notes").state).toBe("uploading");

    // Test remove
    el.remove("report");
    expect(el._attachments.length).toBe(3);
  });

  test("<nai-subagent-tree> mounts, toggles subagent expansion and displays traces", () => {
    const el = document.createElement("nai-subagent-tree") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const coord = el.shadowRoot.querySelector(".coordinator");
    expect(coord).toBeTruthy();
    const agents = el.shadowRoot.querySelectorAll(".agent-card");
    expect(agents.length).toBe(3);

    // Toggle expansion
    expect(el._expandedId).toBe("sub-2");
    agents[0].click();
    expect(el._expandedId).toBe("sub-1");
  });

  test("<nai-agent-teams> mounts, displays roster and task DAG", () => {
    const el = document.createElement("nai-agent-teams") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const members = el.shadowRoot.querySelectorAll(".member-card");
    expect(members.length).toBe(4);
    const tasks = el.shadowRoot.querySelectorAll(".task-item");
    expect(tasks.length).toBe(4);
  });

  test("<nai-task-rows> mounts and toggles row detail accordion", () => {
    const el = document.createElement("nai-task-rows") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const rows = el.shadowRoot.querySelectorAll(".row-btn");
    expect(rows.length).toBe(3);

    // Toggle first row
    rows[0].click();
    expect(el._manualOpen.verify).toBe(true);
    const details = el.shadowRoot.querySelector(".details-box");
    expect(details).toBeTruthy();
  });

  test("<nai-tool-chips> mounts, toggles run visibility and row detail", () => {
    const el = document.createElement("nai-tool-chips") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const headerBtn = el.shadowRoot.querySelector(".header-btn");
    expect(headerBtn).toBeTruthy();

    headerBtn.click();
    expect(el._open).toBe(false);

    headerBtn.click();
    expect(el._open).toBe(true);

    const rows = el.shadowRoot.querySelectorAll(".row-btn");
    expect(rows.length).toBe(4);
    rows[0].click();
    expect(el._openRows.has("Thinking")).toBe(true);
  });

  test("<nai-clarification-card> handles option selection, custom text, submit and reset", () => {
    const el = document.createElement("nai-clarification-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const options = el.shadowRoot.querySelectorAll(".option-label");
    expect(options.length).toBe(3);

    // Select second option
    options[1].click();
    expect(el._selectedId).toBe("dual");

    // Submit
    const submitBtn = el.shadowRoot.querySelector("#submit-btn");
    expect(submitBtn).toBeTruthy();
    submitBtn.click();
    expect(el._isSubmitted).toBe(true);

    // Reset
    const resetBtn = el.shadowRoot.querySelector("#reset-btn");
    expect(resetBtn).toBeTruthy();
    resetBtn.click();
    expect(el._isSubmitted).toBe(false);
    expect(el._selectedId).toBe("soft");
  });

  test("<nai-message-branches> navigates branches and continues from branch", () => {
    const el = document.createElement("nai-message-branches") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._branchIndex).toBe(1);

    const prevBtn = el.shadowRoot.querySelector("#btn-prev");
    expect(prevBtn).toBeTruthy();
    prevBtn.click();
    expect(el._branchIndex).toBe(0);

    const nextBtn = el.shadowRoot.querySelector("#btn-next");
    expect(nextBtn).toBeTruthy();
    nextBtn.click();
    expect(el._branchIndex).toBe(1);

    const continueBtn = el.shadowRoot.querySelector("#btn-continue");
    expect(continueBtn).toBeTruthy();
    continueBtn.click();
    expect(el._continuingFrom).toBe(1);
  });

  test("<nai-context-window> mounts, toggles pruning and updates metrics", () => {
    const el = document.createElement("nai-context-window") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const pruneBtn = el.shadowRoot.querySelector("#btn-prune");
    expect(pruneBtn).toBeTruthy();

    // Prune history
    pruneBtn.click();
    expect(el._isPruned).toBe(true);
    const historySeg = el._segments.find((s: any) => s.id === "history");
    expect(historySeg.tokens).toBeLessThan(16850);

    // Restore
    pruneBtn.click();
    expect(el._isPruned).toBe(false);
    const restoredHistory = el._segments.find((s: any) => s.id === "history");
    expect(restoredHistory.tokens).toBe(16850);
  });

  test("<nai-memory-inspector> filters, pins, deletes, and adds memories", () => {
    const el = document.createElement("nai-memory-inspector") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const tabBtns = el.shadowRoot.querySelectorAll(".tab-btn");
    expect(tabBtns.length).toBe(4);

    // Filter to rules
    tabBtns[2].click();
    expect(el._filter).toBe("rule");

    // Toggle Pin on item
    el.setFilter("all");
    const pinBtns = el.shadowRoot.querySelectorAll(".icon-action-btn.pin");
    pinBtns[2].click(); // mem-3
    expect(el._memories.find((m: any) => m.id === "mem-3").pinned).toBe(true);

    // Delete item
    const deleteBtns = el.shadowRoot.querySelectorAll(".icon-action-btn.delete");
    deleteBtns[0].click(); // mem-1
    expect(el._memories.find((m: any) => m.id === "mem-1")).toBeUndefined();

    // Add fact
    const addFactBtn = el.shadowRoot.querySelector("#btn-add-fact");
    expect(addFactBtn).toBeTruthy();
    addFactBtn.click();
    expect(el._memories.length).toBe(4);
  });

  test("<nai-context-cards> mounts and displays chunk cards with source tags", () => {
    const el = document.createElement("nai-context-cards") as any;
    el.setAttribute("auto", "false");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const cards = el.shadowRoot.querySelectorAll(".card");
    expect(cards.length).toBe(2);
    const countChip = el.shadowRoot.querySelector(".count-chip");
    expect(countChip.textContent).toBe("32");
  });

  test("<nai-context-spillover> toggles hydration preview on spilled files", () => {
    const el = document.createElement("nai-context-spillover") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const hydrateBtns = el.shadowRoot.querySelectorAll(".btn-hydrate");
    expect(hydrateBtns.length).toBe(2);

    // Click hydrate on first file
    hydrateBtns[0].click();
    expect(el._hydratedId).toBe("spill-1");
    const preview = el.shadowRoot.querySelector(".hydrate-preview");
    expect(preview).toBeTruthy();

    // Toggle off
    hydrateBtns[0].click();
    expect(el._hydratedId).toBe(null);
  });

  test("<nai-artifact-sandbox> switches tabs, viewports and handles copy", () => {
    const el = document.createElement("nai-artifact-sandbox") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const tabCode = el.shadowRoot.querySelector("#tab-code");
    expect(tabCode).toBeTruthy();
    tabCode.click();
    expect(el._tab).toBe("code");

    const tabPreview = el.shadowRoot.querySelector("#tab-preview");
    tabPreview.click();
    expect(el._tab).toBe("preview");

    const vpMobile = el.shadowRoot.querySelector("#vp-mobile");
    expect(vpMobile).toBeTruthy();
    vpMobile.click();
    expect(el._viewport).toBe("mobile");
  });

  test("<nai-diff-table> mounts and renders headers and rows", () => {
    const el = document.createElement("nai-diff-table") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const title = el.shadowRoot.querySelector(".card-title");
    expect(title.textContent).toBe("Proposed menu cleanup");
    const rows = el.shadowRoot.querySelectorAll("tr.row-item");
    expect(rows.length).toBe(3);
  });

  test("<nai-records-table> selects rows, sorts columns, and calculates totals", () => {
    const el = document.createElement("nai-records-table") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const rows = el.shadowRoot.querySelectorAll("tr.records-row");
    expect(rows.length).toBe(26);

    // Toggle single row selection
    const firstCheck = el.shadowRoot.querySelector(".row-check");
    expect(firstCheck).toBeTruthy();
    firstCheck.click();
    expect(el._selected.size).toBe(1);

    // Toggle sort
    const sortLastBtn = el.shadowRoot.querySelector("#sort-last");
    expect(sortLastBtn).toBeTruthy();
    sortLastBtn.click();
    expect(el._sort.key).toBe("last");
  });

  test("<nai-filter-table> filters rows by status", () => {
    const el = document.createElement("nai-filter-table") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const chips = el.shadowRoot.querySelectorAll(".chip-btn");
    expect(chips.length).toBe(4);

    // Filter to 'todo'
    chips[1].click();
    expect(el._filter).toBe("todo");
    const visibleRows = el.shadowRoot.querySelectorAll(".row-wrapper.visible");
    expect(visibleRows.length).toBe(2);
  });

  test("<nai-selection-actions> runs action and resets state", () => {
    const el = document.createElement("nai-selection-actions") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._mode).toBe("idle");

    const improveBtn = el.shadowRoot.querySelector("#btn-improve");
    expect(improveBtn).toBeTruthy();
    improveBtn.click();
    expect(el._mode).toBe("thinking");

    el.reset();
    expect(el._mode).toBe("idle");
  });

  test("<nai-audio-orb> switches voice state and toggles mute", () => {
    const el = document.createElement("nai-audio-orb") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._state).toBe("speaking");

    const pills = el.shadowRoot.querySelectorAll(".pill-btn");
    expect(pills.length).toBe(4);

    // Switch to listening
    pills[0].click();
    expect(el._state).toBe("listening");

    // Toggle mute
    const muteBtn = el.shadowRoot.querySelector("#btn-mute");
    expect(muteBtn).toBeTruthy();
    muteBtn.click();
    expect(el._isMuted).toBe(true);
  });

  test("<nai-model-arena> registers model vote", () => {
    const el = document.createElement("nai-model-arena") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._voted).toBe(null);

    const voteABtn = el.shadowRoot.querySelector("#vote-a");
    expect(voteABtn).toBeTruthy();
    voteABtn.click();
    expect(el._voted).toBe("A");

    const voteBBtn = el.shadowRoot.querySelector("#vote-b");
    voteBBtn.click();
    expect(el._voted).toBe("B");
  });

  test("<nai-insight-cards> navigates carousel and toggles anomaly metrics", () => {
    const el = document.createElement("nai-insight-cards") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._page).toBe(0);

    const nextBtn = el.shadowRoot.querySelector("#btn-next");
    expect(nextBtn).toBeTruthy();
    nextBtn.click();
    expect(el._page).toBe(1);

    const metricUsage = el.shadowRoot.querySelector("#metric-usage");
    expect(metricUsage).toBeTruthy();
    metricUsage.click();
    expect(el._anomalyMetric).toBe("usage");
  });

  test("<nai-recommendation-card> selects alternatives and toggles drawer", () => {
    const el = document.createElement("nai-recommendation-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._activeKey).toBe("high");

    const toggleAltBtn = el.shadowRoot.querySelector("#btn-toggle-alt");
    expect(toggleAltBtn).toBeTruthy();
    toggleAltBtn.click();
    expect(el._openDrawer).toBe(true);

    const altOptions = el.shadowRoot.querySelectorAll(".alt-option");
    expect(altOptions.length).toBe(3);
    altOptions[1].click();
    expect(el._activeKey).toBe("review");
  });

  test("<nai-sensitive-input> toggles reveal and input update", () => {
    const el = document.createElement("nai-sensitive-input") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._revealed).toBe(false);

    const revealBtn = el.shadowRoot.querySelector("#btn-reveal");
    expect(revealBtn).toBeTruthy();
    revealBtn.click();
    expect(el._revealed).toBe(true);

    const input = el.shadowRoot.querySelector("#token-input");
    expect(input.type).toBe("text");
  });

  test("<nai-layer-card> toggles collapse and switches tabs", () => {
    const el = document.createElement("nai-layer-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._isOpen).toBe(true);

    const tabEvents = el.shadowRoot.querySelector("#tab-events");
    expect(tabEvents).toBeTruthy();
    tabEvents.click();
    expect(el._activeTab).toBe("events");

    const toggleBtn = el.shadowRoot.querySelector("#btn-toggle");
    expect(toggleBtn).toBeTruthy();
    toggleBtn.click();
    expect(el._isOpen).toBe(false);
  });

  test("<nai-sidebar-nav> switches active section and adds tasks", () => {
    const el = document.createElement("nai-sidebar-nav") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._active).toBe("tasks");

    const homeItem = el.shadowRoot.querySelector('[data-key="activity"]');
    expect(homeItem).toBeTruthy();
    homeItem.click();
    expect(el._active).toBe("activity");

    const newTaskBtn = el.shadowRoot.querySelector("#btn-new-task");
    expect(newTaskBtn).toBeTruthy();
    newTaskBtn.click();
    expect(el._badge).toBe(5);
    expect(el._active).toBe("tasks");
  });

  test("<nai-search> filters search queries and clears input", () => {
    const el = document.createElement("nai-search") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const input = el.shadowRoot.querySelector("#search-input");
    expect(input).toBeTruthy();

    el.setQuery("summer");
    const results = el.shadowRoot.querySelectorAll(".result-item");
    expect(results.length).toBe(1);

    const clearBtn = el.shadowRoot.querySelector("#btn-clear");
    expect(clearBtn).toBeTruthy();
    clearBtn.click();
    expect(el._query).toBe("");
  });

  test("<nai-fine-tune-card> adjusts segments and dropdown type", () => {
    const el = document.createElement("nai-fine-tune-card") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._seg).toBe(0);

    const segBtns = el.shadowRoot.querySelectorAll(".seg-btn");
    expect(segBtns.length).toBe(3);
    segBtns[1].click();
    expect(el._seg).toBe(1);

    const dropdownBtn = el.shadowRoot.querySelector("#btn-dropdown");
    expect(dropdownBtn).toBeTruthy();
    dropdownBtn.click();
    expect(el._menuOpen).toBe(true);

    const dropdownItems = el.shadowRoot.querySelectorAll(".dropdown-item");
    expect(dropdownItems.length).toBe(3);
    dropdownItems[0].click();
    expect(el._typeValue).toBe("Seasonal");
  });

  test("<nai-session-list> shares its pointer and keyboard glide state", () => {
    const el = document.createElement("nai-session-list") as any;
    document.body.appendChild(el);

    const first = el.shadowRoot.querySelector('[data-id="s1"]');
    const second = el.shadowRoot.querySelector('[data-id="s2"]');
    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");

    second.dispatchEvent(new MouseEvent("mouseenter"));
    expect(first.dataset.active).toBe("false");
    expect(second.dataset.active).toBe("true");

    second.dispatchEvent(new MouseEvent("mouseleave"));
    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");

    second.dispatchEvent(new FocusEvent("focus"));
    expect(first.dataset.active).toBe("false");
    expect(second.dataset.active).toBe("true");

    second.dispatchEvent(new FocusEvent("blur"));
    expect(first.dataset.active).toBe("true");
    expect(second.dataset.active).toBe("false");
  });

  test("<nai-session-list> selects rows and clears only their activity badges", () => {
    const el = document.createElement("nai-session-list") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    expect(el._active).toBe("s1");
    expect(el._badges).toEqual({ s1: 2, s2: 1 });

    const row = el.shadowRoot.querySelector('[data-id="s2"]');
    expect(row).toBeTruthy();
    row.click();
    expect(el._active).toBe("s2");
    expect(el._badges).toEqual({ s1: 2, s2: 0 });
  });

  test("<nai-authorization-surface> begins a sign-in flow and writes the credential", () => {
    vi.useFakeTimers();
    try {
      const el = document.createElement("nai-authorization-surface") as any;
      document.body.appendChild(el);

      expect(el.shadowRoot).toBeTruthy();
      expect(el._configured.openai).toBe(true);
      expect(el._configured.e2b).toBe(false);

      const signIn = el.shadowRoot.querySelector('[data-signin="e2b"]');
      expect(signIn).toBeTruthy();
      signIn.click();
      expect(el._flowKey).toBe("e2b");
      expect(el._phase).toBe("prompt");

      el._secret = "e2b-key";
      el.render();
      const authorize = el.shadowRoot.querySelector(".authorize-btn");
      expect(authorize.disabled).toBe(false);
      authorize.click();
      expect(el._phase).toBe("settling");

      vi.advanceTimersByTime(900);
      expect(el._phase).toBe("done");
      expect(el._configured.e2b).toBe(true);
    } finally {
      vi.clearAllTimers();
      vi.useRealTimers();
    }
  });

  test("<nai-authorization-surface> clears and masks secrets when switching or withdrawing providers", () => {
    const el = document.createElement("nai-authorization-surface") as any;
    document.body.appendChild(el);

    el.shadowRoot.querySelector('[data-signin="deepseek"]').click();
    let input = el.shadowRoot.querySelector(".secret-input");
    input.value = "dsk-old-secret";
    input.dispatchEvent(new Event("input"));
    el.shadowRoot.querySelector(".reveal-btn").click();
    input = el.shadowRoot.querySelector(".secret-input");
    expect(input.type).toBe("text");

    el.shadowRoot.querySelector('[data-signin="e2b"]').click();
    input = el.shadowRoot.querySelector(".secret-input");
    expect(el._flowKey).toBe("e2b");
    expect(el._secret).toBe("");
    expect(el._revealed).toBe(false);
    expect(input.value).toBe("");
    expect(input.type).toBe("password");

    input.value = "e2b-secret";
    input.dispatchEvent(new Event("input"));
    el.shadowRoot.querySelector(".reveal-btn").click();
    input = el.shadowRoot.querySelector(".secret-input");
    expect(input.type).toBe("text");
    el.shadowRoot.querySelector(".withdraw-btn").click();

    expect(el._secret).toBe("");
    expect(el._revealed).toBe(false);
    expect(el.shadowRoot.querySelector(".secret-input")).toBeNull();
  });

  test("<nai-authorization-surface> keeps reveal ARIA and SVG state in sync", () => {
    const el = document.createElement("nai-authorization-surface") as any;
    document.body.appendChild(el);

    el.shadowRoot.querySelector('[data-signin="e2b"]').click();
    let input = el.shadowRoot.querySelector(".secret-input");
    let reveal = el.shadowRoot.querySelector(".reveal-btn");
    input.value = "e2b-secret";
    input.dispatchEvent(new Event("input"));
    reveal.focus();

    expect(input.type).toBe("password");
    expect(reveal.getAttribute("aria-label")).toBe("Reveal token");
    expect(reveal.querySelector('path[d^="M1 12"]')).not.toBeNull();
    expect(reveal.querySelector("line")).toBeNull();

    reveal.click();
    input = el.shadowRoot.querySelector(".secret-input");
    reveal = el.shadowRoot.querySelector(".reveal-btn");
    expect(input.type).toBe("text");
    expect(input.value).toBe("e2b-secret");
    expect(reveal.getAttribute("aria-label")).toBe("Hide token");
    expect(reveal.querySelector('path[d^="M17.94"]')).not.toBeNull();
    expect(reveal.querySelector("line")).not.toBeNull();
    expect(el.shadowRoot.activeElement).toBe(reveal);

    reveal.click();
    input = el.shadowRoot.querySelector(".secret-input");
    reveal = el.shadowRoot.querySelector(".reveal-btn");
    expect(input.type).toBe("password");
    expect(input.value).toBe("e2b-secret");
    expect(reveal.getAttribute("aria-label")).toBe("Reveal token");
    expect(reveal.querySelector('path[d^="M1 12"]')).not.toBeNull();
    expect(reveal.querySelector("line")).toBeNull();
    expect(el.shadowRoot.activeElement).toBe(reveal);
  });

  test("<nai-authorization-surface> keeps credential text out of shadow DOM markup", () => {
    const el = document.createElement("nai-authorization-surface") as any;
    document.body.appendChild(el);

    const secret = '\"><img data-injected src=x onerror="globalThis.__naiInjected = true">';
    el._flowKey = "e2b";
    el._phase = "prompt";
    el._secret = secret;
    el.render();

    expect(el.shadowRoot.querySelector("[data-injected]")).toBeNull();
    expect(el.shadowRoot.querySelector(".secret-input").value).toBe(secret);
    expect((globalThis as any).__naiInjected).toBeUndefined();
  });

  test("<nai-settings-editor> assigns editable user drafts through textarea.value", () => {
    const el = document.createElement("nai-settings-editor") as any;
    document.body.appendChild(el);

    const injection = '\"><img data-injected src=x onerror="globalThis.__naiInjected = true">';
    const textarea = el.shadowRoot.querySelector(".editor-area");
    expect(textarea.readOnly).toBe(false);

    textarea.value = injection;
    textarea.dispatchEvent(new Event("input"));

    expect(el._draft).toBe(injection);
    expect(el.shadowRoot.querySelector("[data-injected]")).toBeNull();
    expect(el.shadowRoot.querySelector(".editor-area").value).toBe(injection);
    expect((globalThis as any).__naiInjected).toBeUndefined();
  });

  test("<nai-settings-editor> preserves a conflicting draft until discard and refetch", () => {
    vi.useFakeTimers();
    const el = document.createElement("nai-settings-editor") as any;
    document.body.appendChild(el);

    const textarea = el.shadowRoot.querySelector(".editor-area");
    textarea.value = '{\n  "theme": "dark"\n}';
    textarea.dispatchEvent(new Event("input"));
    el.shadowRoot.querySelector(".save-btn").click();
    vi.advanceTimersByTime(650 + 1500);
    expect(el._revision).toBe(8);

    const conflictDraft = '{\n  "theme": "dark",\n  "maxTokens": 12288\n}';
    const nextTextarea = el.shadowRoot.querySelector(".editor-area");
    nextTextarea.value = conflictDraft;
    nextTextarea.dispatchEvent(new Event("input"));
    el.shadowRoot.querySelector(".save-btn").click();
    vi.advanceTimersByTime(650);

    expect(el._phase).toBe("conflict");
    expect(el._draft).toBe(conflictDraft);
    expect(el.shadowRoot.querySelector(".editor-area").value).toBe(conflictDraft);
    expect(el._revision).toBe(8);

    el.shadowRoot.querySelector(".refetch-btn").click();
    expect(el._draft).toBe(conflictDraft);
    vi.advanceTimersByTime(900);

    expect(el._phase).toBe("edit");
    expect(el._revision).toBe(9);
    expect(el._draft).toContain('"temperature": 0.4');
    expect(el.shadowRoot.querySelector(".editor-area").value).toBe(el._draft);
  });

  test("<nai-feedback-actions> toggles exclusive reversible ratings", () => {
    const el = document.createElement("nai-feedback-actions") as any;
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeTruthy();
    const up = el.shadowRoot.querySelector(".up-btn");
    const down = el.shadowRoot.querySelector(".down-btn");
    expect(up).toBeTruthy();
    expect(down).toBeTruthy();

    up.click();
    expect(el._rating).toBe("up");
    // render() replaces the shadow DOM; re-query after each state change.
    expect(el.shadowRoot.querySelector(".up-btn").getAttribute("aria-pressed")).toBe("true");

    el.shadowRoot.querySelector(".down-btn").click();
    expect(el._rating).toBe("down");

    el.shadowRoot.querySelector(".down-btn").click();
    expect(el._rating).toBe(null);
  });

  test("<nai-feedback-actions> uses fallback success after Clipboard API denial", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    useLegacyCopy(true);
    const el = document.createElement("nai-feedback-actions") as any;
    document.body.appendChild(el);

    el.shadowRoot.querySelector(".copy-btn").click();
    await vi.waitFor(() => expect(el._copyStatus).toBe("copied"));

    expect(el.shadowRoot.querySelector('[role="status"]').textContent).toBe("Copied");
  });

  test("<nai-feedback-actions> reports failure after both copy paths fail", async () => {
    useClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    useLegacyCopy(false);
    const el = document.createElement("nai-feedback-actions") as any;
    document.body.appendChild(el);

    el.shadowRoot.querySelector(".copy-btn").click();
    await vi.waitFor(() => expect(el._copyStatus).toBe("copy-error"));

    expect(el.shadowRoot.querySelector('[role="status"]').textContent).toBe("Copy failed");
    expect(el.shadowRoot.textContent).not.toContain("Copied");
  });

  test.each(["resolve", "reject"] as const)(
    "<nai-feedback-actions> stops a pending clipboard %s after removal",
    async (outcome) => {
      vi.useFakeTimers();
      const pending = deferred<void>();
      useClipboard(vi.fn(() => pending.promise));
      const execCommand = useLegacyCopy(false);
      const el = document.createElement("nai-feedback-actions") as any;
      document.body.appendChild(el);
      const render = vi.spyOn(el, "render");
      const renderCount = render.mock.calls.length;
      const unhandled: unknown[] = [];
      const onUnhandled = (event: PromiseRejectionEvent) => {
        unhandled.push(event.reason);
        event.preventDefault();
      };
      window.addEventListener("unhandledrejection", onUnhandled);

      try {
        el.shadowRoot.querySelector(".copy-btn").click();
        el.remove();

        if (outcome === "resolve") pending.resolve(undefined);
        else pending.reject(new Error("denied after removal"));
        await Promise.resolve();
        await Promise.resolve();
        await Promise.resolve();

        expect(render).toHaveBeenCalledTimes(renderCount);
        expect(el._copyStatus).toBe("idle");
        expect(el._cleanups).toEqual([]);
        expect(execCommand).not.toHaveBeenCalled();
        expect(vi.getTimerCount()).toBe(0);
        expect(unhandled).toEqual([]);
      } finally {
        window.removeEventListener("unhandledrejection", onUnhandled);
      }
    },
  );

  test("<nai-feedback-actions> never simulates copy success on a timer", () => {
    vi.useFakeTimers();
    const el = document.createElement("nai-feedback-actions") as any;
    document.body.appendChild(el);

    vi.advanceTimersByTime(1200);

    expect(el._copyStatus).toBe("idle");
    expect(el.shadowRoot.textContent).not.toContain("Copied");
  });
});
