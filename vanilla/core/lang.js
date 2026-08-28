/**
 * Lightweight i18n manager for Native AI UI Vanilla ES modules.
 */

let globalLang = "en";
const listeners = new Set();

// Initialize from localStorage or document language if in browser environment
if (typeof window !== "undefined") {
  try {
    const stored = window.localStorage.getItem("nai-lang");
    if (stored === "en" || stored === "zh") {
      globalLang = stored;
    } else if (document.documentElement.lang === "zh" || document.documentElement.lang?.startsWith("zh-")) {
      globalLang = "zh";
    }
  } catch {}
}

/**
 * Get current global language
 * @returns {"en" | "zh"}
 */
export function getGlobalLang() {
  return globalLang;
}

/**
 * Set global language and notify all components
 * @param {"en" | "zh"} lang
 */
export function setGlobalLang(lang) {
  if (lang !== "en" && lang !== "zh") return;
  if (globalLang === lang) return;
  globalLang = lang;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("nai-lang", lang);
    } catch {}
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent("nai-lang-change", { detail: { lang } }));
  }

  for (const listener of listeners) {
    try {
      listener(lang);
    } catch (e) {
      console.error("[nai-lang] listener error:", e);
    }
  }
}

/**
 * Subscribe to language changes
 * @param {(lang: "en" | "zh") => void} callback
 * @returns {() => void} unsubscribe function
 */
export function onLangChange(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Resolve effective language for a component
 * @param {string | null | undefined} propLang
 * @returns {"en" | "zh"}
 */
export function resolveLang(propLang) {
  if (propLang === "en" || propLang === "zh") return propLang;
  return globalLang;
}
