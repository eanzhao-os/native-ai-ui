"use client";

import React, { useEffect, useRef } from "react";
import type { Lang } from "@/lib/lang-context";
import { COMPONENT_TAGS } from "./component-catalog";

// Ensure vanilla components and tokens are loaded on the client
if (typeof window !== "undefined") {
  import("@/vanilla/index.js").catch(console.error);
}

interface VanillaDemoWrapperProps {
  id: string;
  lang?: Lang;
  visualCase?: string;
  className?: string;
}

export default function VanillaDemoWrapper({ id, lang, visualCase, className }: VanillaDemoWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = COMPONENT_TAGS[id] || { tag: `nai-${id}` };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const el = document.createElement(config.tag);
    if (config.centerFullWidth) {
      Object.assign(el.style, {
        display: "flex",
        justifyContent: "center",
        width: "100%",
      });
    }
    if (lang) el.setAttribute("lang", lang);
    if (visualCase) el.setAttribute("visual-case", visualCase);
    if (config.defaultAttrs) {
      Object.entries(config.defaultAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    }
    container.appendChild(el);

    return () => {
      container.innerHTML = "";
    };
  }, [
    id,
    lang,
    visualCase,
    config.tag,
    config.defaultAttrs,
    config.centerFullWidth,
    config.alignStart,
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full flex items-center justify-center ${
        config.alignStart ? "self-start" : ""
      } ${className || ""}`}
    />
  );
}
