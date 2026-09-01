"use client";

import { useId, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SEARCH — command search with live filtering.
 * The field, clear action, and results are directly usable.
 * ───────────────────────────────────────────────────────── */

const ITEMS = [
  { en: "Forecast summer demand", zh: "预测夏季需求" },
  { en: "Find waffle cone suppliers", zh: "寻找华夫脆筒供应商" },
  { en: "Compare seasonal flavors", zh: "对比季节限定口味" },
  { en: "Draft flavor launch plan", zh: "起草新口味上市计划" },
  { en: "Check cold-chain status", zh: "检查冷链状态" },
  { en: "Audit sugar costs", zh: "核算糖原料成本" },
  { en: "Retire low sellers", zh: "下架滞销口味" },
];

type SearchItem = (typeof ITEMS)[number];

export default function SearchList({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("search", propLang);
  const zh = lang === "zh";
  const instanceId = useId();
  const listboxId = `${instanceId}-results`;

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const labelOf = (item: SearchItem) => (zh ? item.zh : item.en);
  const resultsFor = (value: string) => {
    const normalized = value.trim().toLocaleLowerCase(lang);
    return normalized
      ? ITEMS.filter((item) => labelOf(item).toLocaleLowerCase(lang).includes(normalized))
      : ITEMS.slice(0, 5);
  };
  const results = resultsFor(query);
  const empty = query.trim().length > 0 && results.length === 0;
  const activeId = activeIndex >= 0 && activeIndex < results.length
    ? `${instanceId}-option-${activeIndex}`
    : undefined;

  const choose = (item: SearchItem) => {
    const label = labelOf(item);
    setQuery(label);
    setSelectedKey(item.en);
    setActiveIndex(0);
  };

  const clear = () => {
    setQuery("");
    setSelectedKey(null);
    setActiveIndex(-1);
  };

  const handleChange = (value: string) => {
    const nextResults = resultsFor(value);
    setQuery(value);
    setSelectedKey(null);
    setActiveIndex(nextResults.length > 0 ? 0 : -1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      clear();
      return;
    }
    if (results.length === 0) return;

    let nextIndex: number | null = null;
    if (event.key === "ArrowDown") {
      nextIndex = activeIndex < 0 ? 0 : (activeIndex + 1) % results.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = activeIndex < 0 ? results.length - 1 : (activeIndex - 1 + results.length) % results.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = results.length - 1;
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      choose(results[activeIndex]);
      return;
    }
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
  };

  const statusText = selectedKey
    ? zh
      ? `已选择 ${labelOf(ITEMS.find((item) => item.en === selectedKey)! )}`
      : `Selected ${selectedKey}`
    : empty
      ? zh
        ? "没有结果"
        : "No results"
      : zh
        ? `${results.length} 个结果`
        : `${results.length} result${results.length === 1 ? "" : "s"}`;

  return (
    <div className="flex min-h-[300px] w-full max-w-xs flex-col items-stretch">
      <div className="w-full self-start overflow-hidden rounded-card border border-line bg-surface shadow-raised">
        {/* input row */}
        <div className="flex min-h-12 items-center gap-2 border-b border-line px-2 focus-within:shadow-[inset_0_0_0_2px_var(--accent)] transition-shadow motion-reduce:transition-none">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" className="shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            role="combobox"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={zh ? "搜索风味…" : "Search flavors…"}
            aria-label={zh ? "搜索风味" : "Search flavors"}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={results.length > 0}
            aria-activedescendant={activeId}
            className="min-h-11 min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-2"
          />
          {query && (
            <button
              aria-label={zh ? "清除搜索" : "Clear search"}
              type="button"
              onClick={clear}
              className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-2 hover:bg-hover hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-100 motion-reduce:transition-none"
              style={{ animation: "fade-in 150ms ease-out both" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* results / empty state */}
        {empty ? (
          <div className="flex min-h-44 flex-col items-center justify-center gap-1 px-4 py-8 motion-reduce:animate-none" style={{ animation: "fade-in 250ms ease-out both" }}>
            <span className="mb-1.5 flex size-9 items-center justify-center rounded-control bg-inset text-ink-2 shadow-hairline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
            <span className="text-[13px] font-medium text-ink">{zh ? "未找到相关结果" : "No results found"}</span>
            <span className="text-center text-[12px] leading-relaxed text-ink-2">{zh ? "换个关键词再试一次" : "Adjust your search to try again"}</span>
          </div>
        ) : (
          <div id={listboxId} role="listbox" aria-label={zh ? "风味搜索结果" : "Flavor search results"} className="p-1.5">
            {results.map((item, index) => {
              const selected = item.en === selectedKey;
              const active = index === activeIndex;
              return (
                <button
                  key={item.en}
                  id={`${instanceId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(item)}
                  className={`flex min-h-11 w-full items-center rounded-[7px] px-2.5 text-left text-[13px] text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-100 motion-reduce:transition-none ${
                    selected ? "bg-accent-tint font-medium text-accent-ink" : active ? "bg-hover" : "hover:bg-hover"
                  }`}
                  style={{ animation: "fade-in 200ms ease-out both" }}
                >
                  <span className="min-w-0 flex-1 truncate">{labelOf(item)}</span>
                  {selected ? (
                    <svg className="ml-2 shrink-0 text-accent" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}

        <div
          role="status"
          aria-label={zh ? "搜索状态" : "Search status"}
          aria-live="polite"
          aria-atomic="true"
          className="min-h-8 border-t border-line bg-inset/60 px-3 py-2 text-[11px] font-medium text-ink-2"
        >
          {statusText}
        </div>
      </div>
    </div>
  );
}
