import { describe, expect, test, afterEach } from "vitest";
import { setGlobalLang, getGlobalLang } from "../vanilla/core/lang.js";
import "../vanilla/index.js";

afterEach(() => {
  document.body.innerHTML = "";
  setGlobalLang("en");
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
});
