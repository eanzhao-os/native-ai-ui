"use client";

import React, { createContext, useContext, useState } from "react";

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
  const [globalLang, setGlobalLang] = useState<Lang>("en");
  const [componentLangs, setComponentLangs] = useState<Record<string, Lang>>({});

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
  return ctx.getLang(id, override);
}

export function useLangContext() {
  return useContext(LangContext);
}
