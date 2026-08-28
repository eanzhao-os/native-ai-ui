import { resolveLang, onLangChange } from "./lang.js";
import { UTILITY_CSS } from "./styles.js";

/**
 * Base Custom Element class for Native AI UI components.
 * Provides shadow DOM setup, reactive attributes, automatic timer cleanup, and i18n support.
 */
export class NaiBaseElement extends HTMLElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._cleanups = [];
    this._mounted = false;
  }

  /**
   * Helper to set innerHTML with shared utility stylesheet
   */
  setHtml(html, extraCss = "") {
    const cleanHtml = typeof html === "string" ? html.replace(/\{\/\*[\s\S]*?\*\/\}/g, "") : html;
    this.shadowRoot.innerHTML = `
      <style>
        ${UTILITY_CSS}
        ${extraCss}
      </style>
      ${cleanHtml}
    `;
  }

  /**
   * Current resolved language ("en" | "zh")
   */
  get currentLang() {
    return resolveLang(this.getAttribute("lang"));
  }

  /**
   * Shortcut for checking Chinese language
   */
  get isZh() {
    return this.currentLang === "zh";
  }

  connectedCallback() {
    this._mounted = true;
    // Listen for global language changes unless an explicit lang attribute is set
    this._unsubLang = onLangChange(() => {
      if (!this.hasAttribute("lang")) {
        this.requestUpdate();
      }
    });

    this.onMount();
    this.requestUpdate();
  }

  disconnectedCallback() {
    this._mounted = false;
    if (this._unsubLang) {
      this._unsubLang();
      this._unsubLang = null;
    }
    this.cleanup();
    this.onUnmount();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._mounted) {
      this.onAttributeChange(name, oldValue, newValue);
      this.requestUpdate();
    }
  }

  /**
   * Hook called when element mounts to DOM
   */
  onMount() {}

  /**
   * Hook called when element unmounts from DOM
   */
  onUnmount() {}

  /**
   * Hook called when an observed attribute changes
   */
  onAttributeChange(name, oldValue, newValue) {}

  /**
   * Register a timer that will be automatically cleared on unmount
   * @param {() => void} fn
   * @param {number} ms
   * @returns {number}
   */
  registerTimeout(fn, ms) {
    const id = window.setTimeout(fn, ms);
    this._cleanups.push(() => clearTimeout(id));
    return id;
  }

  /**
   * Register an interval that will be automatically cleared on unmount
   * @param {() => void} fn
   * @param {number} ms
   * @returns {number}
   */
  registerInterval(fn, ms) {
    const id = window.setInterval(fn, ms);
    this._cleanups.push(() => clearInterval(id));
    return id;
  }

  /**
   * Register an animation frame loop
   * @param {(time: number) => void} fn
   * @returns {() => void}
   */
  registerRaf(fn) {
    let handle;
    const loop = (time) => {
      fn(time);
      handle = requestAnimationFrame(loop);
    };
    handle = requestAnimationFrame(loop);
    const cancel = () => cancelAnimationFrame(handle);
    this._cleanups.push(cancel);
    return cancel;
  }

  /**
   * Register an event listener on target with auto cleanup
   * @param {EventTarget} target
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  registerListener(target, type, listener, options) {
    target.addEventListener(type, listener, options);
    this._cleanups.push(() => target.removeEventListener(type, listener, options));
  }

  /**
   * Execute all registered cleanups
   */
  cleanup() {
    while (this._cleanups.length > 0) {
      const cleanup = this._cleanups.pop();
      try {
        cleanup();
      } catch (e) {
        console.error("[nai-base-element] cleanup error:", e);
      }
    }
  }

  /**
   * Trigger a re-render
   */
  requestUpdate() {
    if (!this._mounted) return;
    this.render();
  }

  /**
   * Render function to be implemented by child classes
   */
  render() {}
}
