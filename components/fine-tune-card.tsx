"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * FINE-TUNE CARD — compact interactive inspector.
 * Number fields scrub: hover the label for an ↔ cursor and
 * drag to adjust, use ↑/↓ (⇧ for ×10), or type directly.
 * ───────────────────────────────────────────────────────── */

function ScrubField({
  label,
  valueLabel,
  valueText,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  active,
}: {
  label: string;
  valueLabel: string;
  valueText: (value: number) => string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  active?: boolean;
}) {
  const drag = useRef<{ x: number; value: number } | null>(null);
  const clamp = (next: number) => Math.min(max, Math.max(min, Math.round(next)));
  const stopDrag = () => {
    drag.current = null;
  };

  return (
    <div
      className="flex min-h-11 min-w-0 items-center gap-1 rounded-control py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none"
      style={{
        background: active ? "var(--accent-tint)" : "var(--field)",
        boxShadow: active ? "0 0 0 1px var(--accent)" : "none",
      }}
    >
      {/* scrub handle */}
      <span
        role="slider"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={valueText(value)}
        tabIndex={0}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture?.(event.pointerId);
          drag.current = { x: event.clientX, value };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          onChange(clamp(drag.current.value + ((event.clientX - drag.current.x) / 2) * step));
        }}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        onKeyDown={(event) => {
          const multiplier = event.shiftKey ? 10 : 1;
          if (event.key === "Home") {
            event.preventDefault();
            onChange(min);
          } else if (event.key === "End") {
            event.preventDefault();
            onChange(max);
          } else if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            event.preventDefault();
            onChange(clamp(value + step * multiplier));
          } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
            event.preventDefault();
            onChange(clamp(value - step * multiplier));
          }
        }}
        className="flex min-h-11 min-w-11 shrink-0 cursor-ew-resize touch-none items-center justify-center rounded-[5px] px-1 text-[12px] font-medium text-ink-2 select-none hover:bg-surface hover:text-ink focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:text-accent-ink focus-visible:outline-none transition-colors motion-reduce:transition-none"
      >
        {label}
      </span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(event) => {
          const next = Number(event.target.value.replace(/[^\d-]/g, ""));
          if (!Number.isNaN(next)) onChange(clamp(next));
        }}
        aria-label={valueLabel}
        className="min-h-11 min-w-0 flex-1 rounded-[5px] bg-transparent px-1 text-[12px] text-ink tabular-nums outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--accent)]"
      />
      {suffix && <span className="shrink-0 pr-1 text-[11.5px] text-ink-2">{suffix}</span>}
    </div>
  );
}

const SEGMENTS = ["row", "col", "grid"] as const;

const TYPE_OPTIONS = [
  { key: "Seasonal", labelEn: "Seasonal", labelZh: "季节限定" },
  { key: "Classic", labelEn: "Classic", labelZh: "经典" },
  { key: "Limited", labelEn: "Limited", labelZh: "限量" },
];

function SegmentIcon({ kind }: { kind: string }) {
  const dot = "size-1.5 rounded-[2px] border-[1.2px] border-current";
  if (kind === "row") {
    return <span className="flex gap-0.5">{[0, 1, 2].map((index) => <span key={index} className={dot} />)}</span>;
  }
  if (kind === "col") {
    return <span className="flex flex-col gap-0.5">{[0, 1].map((index) => <span key={index} className={dot} />)}</span>;
  }
  return (
    <span className="grid grid-cols-2 gap-0.5">
      {[0, 1, 2, 3].map((index) => <span key={index} className={dot} />)}
    </span>
  );
}

export default function FineTuneCard({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("fine-tune-card", propLang);
  const zh = lang === "zh";
  const menuId = `${useId()}-type-menu`;

  const [seg, setSeg] = useState(0);
  const [width, setWidth] = useState(324);
  const [height, setHeight] = useState(96);
  const [radius, setRadius] = useState(28);
  const [opacity, setOpacity] = useState(100);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const [typeValue, setTypeValue] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const done = seg !== 0 || width !== 324 || height !== 96 || radius !== 28 || opacity !== 100 || typeValue !== null;

  useEffect(() => {
    if (menuOpen) optionRefs.current[activeOption]?.focus();
  }, [activeOption, menuOpen]);

  const optionLabel = (index: number) => zh ? TYPE_OPTIONS[index].labelZh : TYPE_OPTIONS[index].labelEn;
  const selectedOption = TYPE_OPTIONS.findIndex((option) => option.key === typeValue);
  const openMenu = (index = selectedOption >= 0 ? selectedOption : 0) => {
    setActiveOption(index);
    setMenuOpen(true);
  };
  const closeMenu = (restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };
  const chooseType = (index: number) => {
    setTypeValue(TYPE_OPTIONS[index].key);
    closeMenu(true);
  };
  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % TYPE_OPTIONS.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + TYPE_OPTIONS.length) % TYPE_OPTIONS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = TYPE_OPTIONS.length - 1;
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseType(index);
      return;
    } else if (event.key === "Tab") {
      setMenuOpen(false);
      return;
    }
    if (next === null) return;
    event.preventDefault();
    setActiveOption(next);
  };

  const pixels = (value: number) => zh ? `${value} 像素` : `${value} pixels`;
  const percent = (value: number) => zh ? `${value}%` : `${value} percent`;

  return (
    <div className="relative w-full max-w-xs rounded-card border border-line bg-surface shadow-raised">
      {/* header */}
      <div className="primitive-card-bar flex min-h-12 items-center justify-between gap-3 border-b border-line">
        <span className="text-[13px] font-medium text-ink">{zh ? "风味卡片" : "Flavor card"}</span>
        <span
          role="status"
          aria-label={zh ? "调优状态" : "Tuning status"}
          aria-live="polite"
          aria-atomic="true"
          className={`flex min-h-8 items-center gap-1.5 text-[12px] font-medium ${done ? "text-green" : "text-accent-ink"}`}
        >
          {done ? (
            <>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {zh ? "已编辑" : "Edited"}
            </>
          ) : (
            <>
              <span className="flex size-5 items-center justify-center rounded-[5px] border border-accent/30 bg-accent-tint">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="var(--accent)">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                </svg>
              </span>
              <span
                className="bg-clip-text text-transparent animate-[shimmer-text_1.4s_linear_infinite] motion-reduce:animate-none"
                style={{
                  backgroundImage: "linear-gradient(90deg, var(--accent) 35%, var(--accent-ink) 50%, var(--accent) 65%)",
                  backgroundSize: "200% 100%",
                }}
              >
                {zh ? "调整" : "Adjust"}
              </span>
            </>
          )}
        </span>
      </div>

      {/* layout section */}
      <div className="primitive-card-pad flex flex-col gap-2.5 border-b border-line">
        <p className="text-[12.5px] font-medium text-ink">{zh ? "布局" : "Layout"}</p>
        {/* segmented control: gray track, raised white thumb */}
        <div
          role="group"
          aria-label={zh ? "布局方向" : "Layout direction"}
          className="relative grid grid-cols-3 rounded-control bg-field p-0.5"
        >
          <span
            aria-hidden
            className="absolute inset-y-0.5 rounded-[6px] bg-surface shadow-btn transition-transform duration-300 motion-reduce:transition-none"
            style={{
              width: "calc((100% - 4px) / 3)",
              left: 2,
              transform: `translateX(${seg * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          />
          {SEGMENTS.map((segment, index) => (
            <button
              key={segment}
              type="button"
              aria-label={`${segment} layout`}
              aria-pressed={index === seg}
              onClick={() => setSeg(index)}
              className={`relative z-10 flex min-h-11 items-center justify-center rounded-control focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-200 motion-reduce:transition-none ${
                index === seg ? "text-accent" : "text-ink-2 hover:text-ink"
              }`}
            >
              <SegmentIcon kind={segment} />
            </button>
          ))}
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          <ScrubField
            label={zh ? "宽" : "W"}
            valueLabel={zh ? "宽度数值" : "Width value"}
            valueText={pixels}
            value={width}
            onChange={setWidth}
            min={40}
            max={999}
            active={width !== 324}
          />
          <ScrubField
            label={zh ? "高" : "H"}
            valueLabel={zh ? "高度数值" : "Height value"}
            valueText={pixels}
            value={height}
            onChange={setHeight}
            min={24}
            max={999}
            active={height !== 96}
          />
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          <ScrubField
            label={zh ? "圆角" : "Radius"}
            valueLabel={zh ? "圆角数值" : "Radius value"}
            valueText={pixels}
            value={radius}
            onChange={setRadius}
            min={0}
            max={64}
            active={radius !== 28}
          />
          <ScrubField
            label={zh ? "不透明" : "Opacity"}
            valueLabel={zh ? "不透明度数值" : "Opacity value"}
            valueText={percent}
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={100}
            suffix="%"
            active={opacity !== 100}
          />
        </div>
      </div>

      {/* interaction section */}
      <div className="primitive-card-footer flex min-h-14 flex-wrap items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-ink-2">{zh ? "类型" : "Type"}</span>
        <div className="relative min-w-40 flex-1 sm:max-w-44">
          <button
            ref={triggerRef}
            type="button"
            aria-label={zh ? "选择风味类型" : "Select flavor type"}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => menuOpen ? closeMenu(false) : openMenu()}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                openMenu();
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                openMenu(selectedOption >= 0 ? selectedOption : TYPE_OPTIONS.length - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                openMenu(0);
              } else if (event.key === "End") {
                event.preventDefault();
                openMenu(TYPE_OPTIONS.length - 1);
              } else if (event.key === "Escape" && menuOpen) {
                event.preventDefault();
                closeMenu(true);
              }
            }}
            className="flex min-h-11 w-full items-center justify-between rounded-control bg-inset py-1 pr-2 pl-3 shadow-hairline hover:bg-field focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none"
          >
            <span className={`text-[12px] ${typeValue !== null ? "font-medium text-ink" : "text-ink-2"}`}>
              {typeValue !== null
                ? zh
                  ? TYPE_OPTIONS.find((option) => option.key === typeValue)?.labelZh
                  : typeValue
                : zh
                  ? "选择类型"
                  : "Select type"}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink-2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 motion-reduce:transition-none"
              style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0)" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen && (
            <div
              id={menuId}
              role="listbox"
              aria-label={zh ? "风味类型" : "Flavor type"}
              className="absolute right-0 bottom-12 z-10 w-full rounded-card border border-line bg-surface p-1 shadow-raised animate-[pop-in_200ms_cubic-bezier(0.23,1,0.32,1)_both] motion-reduce:animate-none"
              style={{ transformOrigin: "bottom right" }}
            >
              {TYPE_OPTIONS.map((item, index) => (
                <button
                  key={item.key}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={item.key === typeValue}
                  tabIndex={index === activeOption ? 0 : -1}
                  onFocus={() => setActiveOption(index)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  onClick={() => chooseType(index)}
                  className={`flex min-h-11 w-full items-center rounded-[6px] px-2.5 text-left text-[12.5px] focus-visible:shadow-[inset_0_0_0_2px_var(--accent)] focus-visible:outline-none transition-colors duration-150 motion-reduce:transition-none ${
                    item.key === typeValue ? "bg-accent-tint font-medium text-accent-ink" : index === activeOption ? "bg-field text-ink" : "text-ink-2 hover:bg-field hover:text-ink"
                  }`}
                >
                  {optionLabel(index)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
