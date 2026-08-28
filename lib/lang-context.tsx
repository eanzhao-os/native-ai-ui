"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "zh";

interface LangContextType {
  globalLang: Lang;
  setGlobalLang: (lang: Lang) => void;
  componentLangs: Record<string, Lang>;
  setComponentLang: (id: string, lang: Lang) => void;
  getLang: (id?: string, override?: Lang) => Lang;
}

const LangContext = createContext<LangContextType>({
  globalLang: "en",
  setGlobalLang: () => {},
  componentLangs: {},
  setComponentLang: () => {},
  getLang: () => "en",
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [globalLang, setGlobalLangState] = useState<Lang>("en");
  const [componentLangs, setComponentLangs] = useState<Record<string, Lang>>({});

  // Restore the persisted global language on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("nai-lang");
      if (stored === "en" || stored === "zh") setGlobalLangState(stored);
    } catch {}
  }, []);

  const setGlobalLang = (lang: Lang) => {
    setGlobalLangState(lang);
    try {
      window.localStorage.setItem("nai-lang", lang);
    } catch {}
  };

  const setComponentLang = (id: string, lang: Lang) => {
    setComponentLangs((prev) => ({ ...prev, [id]: lang }));
  };

  const getLang = (id?: string, override?: Lang): Lang => {
    if (override) return override;
    if (id && componentLangs[id]) return componentLangs[id];
    return globalLang;
  };

  return (
    <LangContext.Provider
      value={{
        globalLang,
        setGlobalLang,
        componentLangs,
        setComponentLang,
        getLang,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang(id?: string, override?: Lang): Lang {
  const ctx = useContext(LangContext);
  return override ?? ctx.getLang(id);
}

export function useLangContext() {
  return useContext(LangContext);
}
