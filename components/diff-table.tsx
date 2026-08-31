"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/* ─────────────────────────────────────────────────────────
 * DIFF TABLE
 * A proposed edit plays once, then exposes the completed
 * changes for explicit review and selection.
 * ───────────────────────────────────────────────────────── */

type ChangeKind = "remove" | "add";

type DiffRow = {
  id: string;
  nameEn: string;
  nameZh: string;
  dept: string;
  deptEn: string;
  deptZh: string;
  supplier: string;
  change?: ChangeKind;
};

const STAGE_STEPS = [800, 1_000, 1_000];
const CHANGE_IDS = ["rocky-road", "bubblegum", "pistachio"];

function useStage(steps: number[]) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    let elapsed = 0;
    const timers = steps.map((delay, index) => {
      elapsed += delay;
      return window.setTimeout(() => setStage(index + 1), elapsed);
    });
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [steps]);
  return stage;
}

const HEADERS = [
  { en: "Change", zh: "变更" },
  { en: "Flavor", zh: "风味" },
  { en: "Category", zh: "分类" },
  { en: "Supplier", zh: "供应商" },
];

const ROWS: DiffRow[] = [
  { id: "rocky-road", nameEn: "Rocky Road", nameZh: "石板街", dept: "Classic", deptEn: "Classic", deptZh: "经典", supplier: "aurora-scoops", change: "remove" },
  { id: "bubblegum", nameEn: "Bubblegum", nameZh: "泡泡糖", dept: "Retro", deptEn: "Retro", deptZh: "复古", supplier: "kumo-creamery", change: "remove" },
  { id: "mint-chip", nameEn: "Mint Chip", nameZh: "薄荷巧克力", dept: "Classic", deptEn: "Classic", deptZh: "经典", supplier: "maple-orbit" },
];

const ADDED_ROW: DiffRow = {
  id: "pistachio",
  nameEn: "Pistachio",
  nameZh: "开心果",
  dept: "Seasonal",
  deptEn: "Seasonal",
  deptZh: "季节限定",
  supplier: "maple-orbit",
  change: "add",
};

const DOT: Record<string, string> = {
  Classic: "bg-accent",
  Retro: "bg-ink-3",
  Seasonal: "bg-green",
};

function ChangeCheckbox({
  checked,
  disabled,
  label,
  mixed = false,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  mixed?: boolean;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex size-9 cursor-pointer items-center justify-center rounded-control focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-accent">
      <input
        type="checkbox"
        checked={checked}
        aria-checked={mixed ? "mixed" : checked}
        aria-label={label}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="flex size-4.5 items-center justify-center rounded-[5px] border border-line-strong bg-surface text-transparent transition-[background-color,border-color,color] motion-reduce:transition-none peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
        {mixed ? (
          <span className="h-0.5 w-2 rounded-full bg-current" />
        ) : (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        )}
      </span>
    </label>
  );
}

export default function DiffTable({ lang: propLang }: { lang?: "en" | "zh" }) {
  const lang = useLang("diff-table", propLang);
  const zh = lang === "zh";
  const stage = useStage(STAGE_STEPS);
  const removalsVisible = stage >= 2;
  const completed = stage >= 3;

  const [selected, setSelected] = useState<Set<string>>(() => new Set(CHANGE_IDS));
  const [appliedCount, setAppliedCount] = useState<number | null>(null);

  const allSelected = selected.size === CHANGE_IDS.length;
  const partiallySelected = selected.size > 0 && !allSelected;

  const toggle = (id: string) => {
    setAppliedCount(null);
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setAppliedCount(null);
    setSelected(allSelected ? new Set() : new Set(CHANGE_IDS));
  };

  const selectionStatus = zh
    ? `已选择 ${selected.size}/${CHANGE_IDS.length} 项变更`
    : `${selected.size} of ${CHANGE_IDS.length} changes selected`;
  const status =
    appliedCount !== null
      ? zh ? `已应用 ${appliedCount} 项变更` : `Applied ${appliedCount} changes`
      : completed
        ? selectionStatus
        : removalsVisible
          ? zh ? "发现 2 项移除变更" : "2 removals found"
          : zh ? "正在分析 3 项变更" : "Analyzing 3 changes";

  const renderRow = (row: DiffRow) => {
    const removed = row.change === "remove" && removalsVisible;
    const added = row.change === "add";
    const changed = Boolean(row.change) && completed;
    const selectedRow = selected.has(row.id);
    const operation =
      row.change === "remove"
        ? removalsVisible ? (zh ? "移除" : "Remove") : zh ? "待定" : "Pending"
        : row.change === "add"
          ? zh ? "新增" : "Add"
          : "—";

    return (
      <tr
        key={row.id}
        aria-selected={changed ? selectedRow : undefined}
        className="border-b border-line last:border-0"
        style={{
          background: removed
            ? "var(--red-tint)"
            : added
              ? "var(--green-tint)"
              : undefined,
        }}
      >
        <td className="w-10 px-1 text-center">
          {changed ? (
            <ChangeCheckbox
              checked={selectedRow}
              disabled={appliedCount !== null}
              label={
                row.change === "remove"
                  ? zh ? `选择移除 ${row.nameZh}` : `Select removal ${row.nameEn}`
                  : zh ? `选择新增 ${row.nameZh}` : `Select addition ${row.nameEn}`
              }
              onChange={() => toggle(row.id)}
            />
          ) : null}
        </td>
        <td className="primitive-table-cell px-1.5">
          <span
            className={`inline-flex min-h-5 items-center rounded-chip border px-1.5 text-[10.5px] font-semibold ${
              row.change === "remove" && removalsVisible
                ? "border-red/25 bg-surface/65 text-red"
                : row.change === "add"
                  ? "border-green/25 bg-surface/65 text-green"
                  : "border-line bg-inset text-ink-3"
            }`}
          >
            {operation}
          </span>
        </td>
        <td
          className="primitive-table-cell truncate text-[12.5px] font-medium transition-colors duration-300 motion-reduce:transition-none"
          style={{ color: removed ? "var(--red)" : added ? "var(--green)" : "var(--ink)" }}
          title={zh ? row.nameZh : row.nameEn}
        >
          {zh ? row.nameZh : row.nameEn}
        </td>
        <td className="primitive-table-cell overflow-hidden">
          <span className="inline-flex h-5.5 max-w-full items-center gap-1.5 rounded-full bg-inset px-2 text-[11px] font-medium shadow-hairline">
            <span className={`size-1.5 shrink-0 rounded-full ${DOT[row.dept]}`} />
            <span className="truncate text-ink-2">{zh ? row.deptZh : row.deptEn}</span>
          </span>
        </td>
        <td
          className="primitive-table-cell truncate text-[12px] transition-colors duration-300 motion-reduce:transition-none"
          style={{
            color: removed ? "var(--red)" : added ? "var(--green)" : "var(--ink-2)",
            textDecorationLine: removed ? "line-through" : "none",
            textDecorationColor: "color-mix(in srgb, var(--red) 55%, transparent)",
          }}
          title={row.supplier}
        >
          {row.supplier}
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div className="primitive-card-bar flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-line bg-inset">
          <div>
            <h3 className="text-[12.5px] font-semibold text-ink">{zh ? "菜单清理建议" : "Proposed menu cleanup"}</h3>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{zh ? "检查后再应用智能变更" : "Review AI changes before applying"}</p>
          </div>
          <span role="status" aria-live="polite" aria-atomic="true" className={`rounded-chip border px-2 py-1 text-[10.5px] font-medium ${appliedCount !== null ? "border-green/25 bg-green-tint text-green" : "border-line bg-surface text-ink-2"}`}>
            {status}
          </span>
        </div>

        <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
          <table className="w-full min-w-[470px] table-fixed border-collapse text-left" aria-label={zh ? "菜单变更" : "Menu changes"}>
            <caption className="sr-only">{zh ? "选择并应用菜单变更" : "Select and apply proposed menu changes"}</caption>
            <colgroup>
              <col className="w-10" />
              <col className="w-16" />
              <col className="w-[27%]" />
              <col className="w-[25%]" />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-line bg-surface">
                <th className="px-1 text-center">
                  {completed ? (
                    <ChangeCheckbox
                      checked={allSelected}
                      mixed={partiallySelected}
                      disabled={appliedCount !== null}
                      label={zh ? "选择全部变更" : "Select all changes"}
                      onChange={toggleAll}
                    />
                  ) : null}
                </th>
                {HEADERS.map((header) => (
                  <th key={header.en} className="primitive-table-cell px-1.5 text-[11px] font-semibold text-ink-3">
                    {zh ? header.zh : header.en}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(renderRow)}
              {completed ? renderRow(ADDED_ROW) : null}
            </tbody>
          </table>
        </div>

        {completed && (
          <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-t border-line bg-inset px-3 py-2">
            <button
              type="button"
              disabled={appliedCount !== null || selected.size === 0}
              onClick={() => setAppliedCount(selected.size)}
              className="inline-flex min-h-8 items-center rounded-control bg-ink px-3 text-[11.5px] font-semibold text-canvas shadow-btn transition-[opacity,transform] motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {appliedCount !== null
                ? zh ? "已应用" : "Applied"
                : zh ? `应用 ${selected.size} 项变更` : `Apply ${selected.size} changes`}
            </button>
            <button
              type="button"
              disabled={appliedCount !== null || selected.size === 0}
              onClick={() => {
                setAppliedCount(null);
                setSelected(new Set());
              }}
              className="inline-flex min-h-8 items-center rounded-control px-2.5 text-[11.5px] font-medium text-ink-2 transition-colors motion-reduce:transition-none hover:bg-hover hover:text-ink disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            >
              {zh ? "取消全选" : "Deselect all"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
