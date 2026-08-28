"use client";

import React, { useEffect, useRef } from "react";
import type { Lang } from "@/lib/lang-context";

// Ensure vanilla components and tokens are loaded on the client
if (typeof window !== "undefined") {
  import("@/vanilla/index.js").catch(console.error);
}

interface VanillaDemoWrapperProps {
  id: string;
  lang?: Lang;
  className?: string;
}

const COMPONENT_TAGS: Record<string, { tag: string; defaultAttrs?: Record<string, string> }> = {
  "loading-state": { tag: "nai-loading-state", defaultAttrs: { variant: "Drive" } },
  thinking: { tag: "nai-thinking", defaultAttrs: { variant: "Steps" } },
  "streaming-text": { tag: "nai-streaming-text" },
  "prompt-bar": { tag: "nai-prompt-bar", defaultAttrs: { variant: "Rounded" } },
  chat: { tag: "nai-chat" },
  "code-block": { tag: "nai-code-block" },
  "attachment-queue": { tag: "nai-attachment-queue" },
  "subagent-tree": { tag: "nai-subagent-tree" },
  "agent-teams": { tag: "nai-agent-teams" },
  "task-rows": { tag: "nai-task-rows" },
  "tool-chips": { tag: "nai-tool-chips" },
  "approval-card": { tag: "nai-approval-card" },
  "clarification-card": { tag: "nai-clarification-card" },
  "message-branches": { tag: "nai-message-branches" },
  "context-window": { tag: "nai-context-window" },
  "memory-inspector": { tag: "nai-memory-inspector" },
  "context-cards": { tag: "nai-context-cards" },
  "context-spillover": { tag: "nai-context-spillover" },
  "turn-lifecycle": { tag: "nai-turn-lifecycle" },
  "agent-inbox": { tag: "nai-agent-inbox" },
  "hook-pipeline": { tag: "nai-hook-pipeline" },
  "session-telemetry": { tag: "nai-session-telemetry" },
  "workflow-run": { tag: "nai-workflow-run" },
  "checkpoint-timeline": { tag: "nai-checkpoint-timeline" },
  "cordis-plugin-tree": { tag: "nai-cordis-plugin-tree" },
  "permission-preset-card": { tag: "nai-permission-preset-card" },
  "lsp-diagnostics": { tag: "nai-lsp-diagnostics" },
  "sandbox-manager": { tag: "nai-sandbox-manager" },
  "job-scheduler": { tag: "nai-job-scheduler" },
  "mcp-servers": { tag: "nai-mcp-servers" },
  "artifact-sandbox": { tag: "nai-artifact-sandbox" },
  "diff-table": { tag: "nai-diff-table" },
  "records-table": { tag: "nai-records-table" },
  "filter-table": { tag: "nai-filter-table" },
  "selection-actions": { tag: "nai-selection-actions" },
  "audio-orb": { tag: "nai-audio-orb" },
  "model-arena": { tag: "nai-model-arena" },
  "insight-cards": { tag: "nai-insight-cards" },
  "recommendation-card": { tag: "nai-recommendation-card" },
  "sensitive-input": { tag: "nai-sensitive-input" },
  "layer-card": { tag: "nai-layer-card" },
  "sidebar-nav": { tag: "nai-sidebar-nav" },
  search: { tag: "nai-search" },
  "fine-tune-card": { tag: "nai-fine-tune-card" },
};

export default function VanillaDemoWrapper({ id, lang, className }: VanillaDemoWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = COMPONENT_TAGS[id] || { tag: `nai-${id}` };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const el = document.createElement(config.tag);
    if (lang) el.setAttribute("lang", lang);
    if (config.defaultAttrs) {
      Object.entries(config.defaultAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    }
    container.appendChild(el);

    return () => {
      container.innerHTML = "";
    };
  }, [id, lang, config.tag]);

  return <div ref={containerRef} className={`w-full flex items-center justify-center ${className || ""}`} />;
}
