"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * SIDEBAR NAV
 * Workspace navigation with direct selection and search.
 * ───────────────────────────────────────────────────────── */

const ITEMS = [
  { key: "activity", labelEn: "Home", labelZh: "首页", section: "Workspace" },
  { key: "tasks", labelEn: "Agent tasks", labelZh: "智能体任务", section: "Workspace", count: true },
  { key: "dashboard", labelEn: "Inbox", labelZh: "收件箱", section: "Workspace" },
  { key: "spaces", labelEn: "Suppliers", labelZh: "供应商", section: "Objects" },
  { key: "analytics", labelEn: "Inventory", labelZh: "库存", section: "Objects" },
];

type NavItem = (typeof ITEMS)[number];

function Icon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    tasks: <g><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></g>,
    spaces: <g><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>,
    dashboard: <g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    analytics: <g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
  };
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[kind]}
    </svg>
  );
}

export default function SidebarNav({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("sidebar-nav", propLang);
  const zh = lang === "zh";
  const [active, setActive] = useState("tasks");
  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const [query, setQuery] = useState("");
  const [badge, setBadge] = useState(4);
  const [selectionNotice, setSelectionNotice] = useState("");
  const sections = [
    { key: "Workspace", label: zh ? "工作区" : "Workspace" },
    { key: "Objects", label: zh ? "对象" : "Objects" },
  ];
  const navRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const labelOf = (item: NavItem) => (zh ? item.labelZh : item.labelEn);
  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(lang);
    return normalized
      ? ITEMS.filter((item) => labelOf(item).toLocaleLowerCase(lang).includes(normalized))
      : ITEMS;
  }, [lang, query, zh]);
  const visibleKeys = visibleItems.map((item) => item.key);
  const focusKey = visibleKeys.includes(active) ? active : visibleKeys[0];

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.key !== "/" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA"
      ) {
        return;
      }
      event.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener("keydown", focusSearch);
    return () => document.removeEventListener("keydown", focusSearch);
  }, []);

  useLayoutEffect(() => {
    const container = navRef.current;
    const target = itemRefs.current[hovered ?? active];
    if (!container || !target || !container.contains(target)) {
      setBox(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({
      top: targetRect.top - containerRect.top,
      height: targetRect.height,
    });
  }, [hovered, active, query]);

  const selectItem = (item: NavItem) => {
    setActive(item.key);
    setSelectionNotice(zh ? `已选择 ${item.labelZh}` : `Selected ${item.labelEn}`);
  };

  const focusVisibleItem = (index: number) => {
    const item = visibleItems[index];
    if (item) itemRefs.current[item.key]?.focus();
  };

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, item: NavItem) => {
    const index = visibleItems.findIndex((candidate) => candidate.key === item.key);
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % visibleItems.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + visibleItems.length) % visibleItems.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = visibleItems.length - 1;
    }
    if (next === null || visibleItems.length === 0) return;
    event.preventDefault();
    focusVisibleItem(next);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setQuery("");
      setSelectionNotice("");
      return;
    }
    if (visibleItems.length === 0) return;
    if (event.key === "ArrowDown" || event.key === "Home") {
      event.preventDefault();
      focusVisibleItem(0);
    } else if (event.key === "ArrowUp" || event.key === "End") {
      event.preventDefault();
      focusVisibleItem(visibleItems.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectItem(visibleItems[0]);
      itemRefs.current[visibleItems[0].key]?.focus();
    }
  };

  const searchStatus = selectionNotice || (query.trim()
    ? visibleItems.length === 0
      ? zh
        ? "没有导航结果"
        : "No navigation results"
      : zh
        ? `${visibleItems.length} 个导航结果`
        : `${visibleItems.length} navigation result${visibleItems.length === 1 ? "" : "s"}`
    : zh
      ? `${ITEMS.length} 个导航项目`
      : `${ITEMS.length} navigation items`);

  return (
    <nav aria-label={zh ? "工作区导航" : "Workspace navigation"} className="w-64 rounded-card bg-surface p-2 shadow-raised">
      {/* workspace row — static identity, not a false disclosure */}
      <div className="mb-2 flex min-h-11 w-full items-center gap-2.5 rounded-control p-1.5 text-left">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-ink text-[13px] font-semibold text-surface">
          C
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium leading-tight text-ink">Creamery Ops</span>
          <span className="mt-0.5 block truncate text-[11px] leading-tight text-ink-2">{zh ? "生产工作区" : "Production Workspace"}</span>
        </span>
      </div>

      {/* quick search */}
      <label className="mb-1 flex min-h-11 items-center gap-2 rounded-control border border-transparent bg-inset px-2.5 shadow-hairline focus-within:border-accent focus-within:bg-surface focus-within:ring-2 focus-within:ring-accent/20 transition-colors motion-reduce:transition-none">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectionNotice("");
          }}
          onKeyDown={handleSearchKeyDown}
          placeholder={zh ? "快速搜索" : "Quick search"}
          aria-label={zh ? "快速搜索导航" : "Quick search navigation"}
          className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-2"
        />
        <kbd className="flex size-5 items-center justify-center rounded-[5px] bg-surface text-[10px] text-ink-2 shadow-hairline">
          /
        </kbd>
      </label>
      <span
        role="status"
        aria-label={zh ? "导航搜索状态" : "Navigation search status"}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {searchStatus}
      </span>

      {/* accent action */}
      <button
        type="button"
        onClick={() => {
          setBadge((current) => current + 1);
          const tasks = ITEMS.find((item) => item.key === "tasks")!;
          selectItem(tasks);
        }}
        className="mb-2 flex min-h-11 w-full items-center gap-2 rounded-control px-2 text-[13px] font-medium text-accent-ink hover:bg-accent-tint focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-[background-color,transform] duration-100 motion-reduce:transition-none active:scale-[0.98] motion-reduce:transform-none"
      >
        <span className="min-w-0 flex-1 truncate text-left">{zh ? "新建任务" : "New task"}</span>
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {/* items */}
      <div
        ref={navRef}
        onMouseLeave={() => setHovered(null)}
        className="relative flex flex-col gap-1"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover motion-reduce:transition-none"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition:
              "top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease",
          }}
        />
        {visibleItems.length === 0 ? (
          <div className="rounded-control border border-dashed border-line px-3 py-5 text-center text-[12px] text-ink-2">
            {zh ? "没有导航结果" : "No navigation results"}
          </div>
        ) : (
          sections.map((section) => {
            const sectionItems = visibleItems.filter((item) => item.section === section.key);
            if (sectionItems.length === 0) return null;
            return (
              <div key={section.key}>
                <div className="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-2">
                  {section.label}
                </div>
                <div className="flex flex-col gap-px">
                  {sectionItems.map((item) => {
                    const isActive = item.key === active;
                    return (
                      <button
                        key={item.key}
                        ref={(element) => {
                          itemRefs.current[item.key] = element;
                        }}
                        type="button"
                        tabIndex={item.key === focusKey ? 0 : -1}
                        onMouseEnter={() => setHovered(item.key)}
                        onFocus={() => setHovered(item.key)}
                        onBlur={() => setHovered(null)}
                        onClick={() => selectItem(item)}
                        onKeyDown={(event) => handleItemKeyDown(event, item)}
                        aria-current={isActive ? "page" : undefined}
                        className="group relative z-10 flex min-h-11 w-full items-center gap-2 rounded-[7px] px-2 text-left focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-[color,transform] duration-150 motion-reduce:transition-none active:scale-[0.98] motion-reduce:transform-none"
                      >
                        <span className={isActive ? "text-ink" : "text-ink-2"}>
                          <Icon kind={item.key} />
                        </span>
                        <span className={`min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 motion-reduce:transition-none ${isActive ? "font-medium text-ink" : "text-ink-2"}`}>
                          {labelOf(item)}
                        </span>
                        {item.count && (
                          <span
                            key={badge}
                            className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums motion-reduce:animate-none ${
                              isActive ? "bg-surface text-ink-2 shadow-hairline" : "bg-accent-tint text-accent-ink"
                            }`}
                            style={{ animation: "pop-in 250ms cubic-bezier(0.23,1,0.32,1) both" }}
                          >
                            {badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </nav>
  );
}
