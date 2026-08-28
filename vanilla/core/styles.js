/**
 * Shared utility CSS rules for Native AI UI Vanilla Web Components.
 * Matches Tailwind CSS utility classes 1:1 so Vanilla Web Components render
 * with pixel-perfect visual parity to React counterparts.
 */

export const UTILITY_CSS = `
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:host {
  display: block;
  font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Helvetica, Arial, sans-serif);
  color: var(--ink, #1f2124);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Layout & Flexbox / Grid */
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.inline-grid { display: inline-grid; }
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }
.shrink-0 { flex-shrink: 0; }
.grow { flex-grow: 1; }

.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }

.self-start { align-self: flex-start; }
.self-end { align-self: flex-end; }
.self-center { align-self: center; }
.self-stretch { align-self: stretch; }

/* Grid columns */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }

/* Gap */
.gap-0 { gap: 0; }
.gap-0\\.5, .gap-0\\.5 { gap: 2px; }
.gap-1 { gap: 4px; }
.gap-1\\.5 { gap: 6px; }
.gap-2 { gap: 8px; }
.gap-2\\.5 { gap: 10px; }
.gap-3 { gap: 12px; }
.gap-3\\.5 { gap: 14px; }
.gap-4 { gap: 16px; }
.gap-5 { gap: 20px; }
.gap-6 { gap: 24px; }
.gap-8 { gap: 32px; }
.gap-x-1 { column-gap: 4px; }
.gap-x-2 { column-gap: 8px; }
.gap-x-3 { column-gap: 12px; }
.gap-x-4 { column-gap: 16px; }
.gap-y-1 { row-gap: 4px; }
.gap-y-1\\.5 { row-gap: 6px; }
.gap-y-2 { row-gap: 8px; }
.gap-y-3 { row-gap: 12px; }

/* Sizing */
.w-full { width: 100%; }
.w-fit { width: fit-content; }
.w-auto { width: auto; }
.w-4 { width: 16px; }
.w-5 { width: 20px; }
.w-6 { width: 24px; }
.w-7 { width: 28px; }
.w-8 { width: 32px; }
.w-9 { width: 36px; }
.w-10 { width: 40px; }
.w-12 { width: 48px; }
.w-16 { width: 64px; }
.w-20 { width: 80px; }
.w-24 { width: 96px; }
.w-32 { width: 128px; }
.w-48 { width: 192px; }
.w-64 { width: 256px; }
.w-72 { width: 288px; }
.w-80 { width: 320px; }
.w-96 { width: 384px; }

.min-w-0 { min-width: 0; }
.min-w-full { min-width: 100%; }
.max-w-xs { max-width: 320px; }
.max-w-sm { max-width: 384px; }
.max-w-md { max-width: 448px; }
.max-w-lg { max-width: 512px; }
.max-w-xl { max-width: 576px; }
.max-w-2xl { max-width: 672px; }
.max-w-3xl { max-width: 768px; }
.max-w-4xl { max-width: 896px; }
.max-w-95 { max-width: 380px; }

.h-full { height: 100%; }
.h-auto { height: auto; }
.h-fit { height: fit-content; }
.h-1 { height: 4px; }
.h-1\\.5 { height: 6px; }
.h-2 { height: 8px; }
.h-2\\.5 { height: 10px; }
.h-3 { height: 12px; }
.h-4 { height: 16px; }
.h-5 { height: 20px; }
.h-6 { height: 24px; }
.h-7 { height: 28px; }
.h-8 { height: 32px; }
.h-9 { height: 36px; }
.h-10 { height: 40px; }
.h-12 { height: 48px; }
.h-14 { height: 56px; }
.h-16 { height: 64px; }
.h-20 { height: 80px; }
.h-24 { height: 96px; }
.h-32 { height: 128px; }
.h-48 { height: 192px; }
.h-64 { height: 256px; }
.h-\\[288px\\] { height: 288px; }
.h-\\[320px\\] { height: 320px; }

.min-h-0 { min-height: 0; }
.min-h-\\[42px\\] { min-height: 42px; }
.min-h-44 { min-height: 176px; }

.size-1 { width: 4px; height: 4px; }
.size-1\\.5 { width: 6px; height: 6px; }
.size-2 { width: 8px; height: 8px; }
.size-2\\.5 { width: 10px; height: 10px; }
.size-3 { width: 12px; height: 12px; }
.size-3\\.5 { width: 14px; height: 14px; }
.size-4 { width: 16px; height: 16px; }
.size-4\\.5 { width: 18px; height: 18px; }
.size-5 { width: 20px; height: 20px; }
.size-6 { width: 24px; height: 24px; }
.size-7 { width: 28px; height: 28px; }
.size-8 { width: 32px; height: 32px; }
.size-9 { width: 36px; height: 36px; }
.size-10 { width: 40px; height: 40px; }
.size-12 { width: 48px; height: 48px; }

/* Spacing (Padding) */
.p-0 { padding: 0; }
.p-0\\.5 { padding: 2px; }
.p-1 { padding: 4px; }
.p-1\\.5 { padding: 6px; }
.p-2 { padding: 8px; }
.p-2\\.5 { padding: 10px; }
.p-3 { padding: 12px; }
.p-3\\.5 { padding: 14px; }
.p-4 { padding: 16px; }
.p-5 { padding: 20px; }
.p-6 { padding: 24px; }
.p-8 { padding: 32px; }

.px-0 { padding-left: 0; padding-right: 0; }
.px-0\\.5 { padding-left: 2px; padding-right: 2px; }
.px-1 { padding-left: 4px; padding-right: 4px; }
.px-1\\.5 { padding-left: 6px; padding-right: 6px; }
.px-2 { padding-left: 8px; padding-right: 8px; }
.px-2\\.5 { padding-left: 10px; padding-right: 10px; }
.px-3 { padding-left: 12px; padding-right: 12px; }
.px-3\\.5 { padding-left: 14px; padding-right: 14px; }
.px-4 { padding-left: 16px; padding-right: 16px; }
.px-5 { padding-left: 20px; padding-right: 20px; }
.px-6 { padding-left: 24px; padding-right: 24px; }

.py-0 { padding-top: 0; padding-bottom: 0; }
.py-px { padding-top: 1px; padding-bottom: 1px; }
.py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
.py-1 { padding-top: 4px; padding-bottom: 4px; }
.py-1\\.5 { padding-top: 6px; padding-bottom: 6px; }
.py-2 { padding-top: 8px; padding-bottom: 8px; }
.py-2\\.5 { padding-top: 10px; padding-bottom: 10px; }
.py-3 { padding-top: 12px; padding-bottom: 12px; }
.py-3\\.5 { padding-top: 14px; padding-bottom: 14px; }
.py-4 { padding-top: 16px; padding-bottom: 16px; }
.py-5 { padding-top: 20px; padding-bottom: 20px; }

.pt-0 { padding-top: 0; }
.pt-1 { padding-top: 4px; }
.pt-1\\.5 { padding-top: 6px; }
.pt-2 { padding-top: 8px; }
.pt-2\\.5 { padding-top: 10px; }
.pt-3 { padding-top: 12px; }
.pt-4 { padding-top: 16px; }
.pt-5 { padding-top: 20px; }
.pt-6 { padding-top: 24px; }

.pb-0 { padding-bottom: 0; }
.pb-1 { padding-bottom: 4px; }
.pb-1\\.5 { padding-bottom: 6px; }
.pb-2 { padding-bottom: 8px; }
.pb-2\\.5 { padding-bottom: 10px; }
.pb-3 { padding-bottom: 12px; }
.pb-4 { padding-bottom: 16px; }
.pb-5 { padding-bottom: 20px; }
.pb-6 { padding-bottom: 24px; }

.pl-2 { padding-left: 8px; }
.pl-3 { padding-left: 12px; }
.pl-4 { padding-left: 16px; }
.pl-6 { padding-left: 24px; }
.pr-2 { padding-right: 8px; }
.pr-3 { padding-right: 12px; }
.pr-4 { padding-right: 16px; }

/* Margins */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-auto { margin-top: auto; margin-bottom: auto; }

.mt-0 { margin-top: 0; }
.mt-0\\.5 { margin-top: 2px; }
.mt-1 { margin-top: 4px; }
.mt-1\\.5 { margin-top: 6px; }
.mt-2 { margin-top: 8px; }
.mt-2\\.5 { margin-top: 10px; }
.mt-3 { margin-top: 12px; }
.mt-3\\.5 { margin-top: 14px; }
.mt-4 { margin-top: 16px; }
.mt-5 { margin-top: 20px; }
.mt-6 { margin-top: 24px; }
.mt-8 { margin-top: 32px; }

.mb-0 { margin-bottom: 0; }
.mb-0\\.5 { margin-bottom: 2px; }
.mb-1 { margin-bottom: 4px; }
.mb-1\\.5 { margin-bottom: 6px; }
.mb-2 { margin-bottom: 8px; }
.mb-2\\.5 { margin-bottom: 10px; }
.mb-3 { margin-bottom: 12px; }
.mb-4 { margin-bottom: 16px; }

.ml-0\\.5 { margin-left: 2px; }
.ml-1 { margin-left: 4px; }
.ml-1\\.5 { margin-left: 6px; }
.ml-2 { margin-left: 8px; }
.ml-3 { margin-left: 12px; }
.ml-4 { margin-left: 16px; }
.ml-auto { margin-left: auto; }

.mr-0\\.5 { margin-right: 2px; }
.mr-1 { margin-right: 4px; }
.mr-1\\.5 { margin-right: 6px; }
.mr-2 { margin-right: 8px; }
.mr-3 { margin-right: 12px; }
.mr-auto { margin-right: auto; }

/* Colors: Backgrounds */
.bg-surface { background-color: var(--surface, #fff); }
.bg-inset { background-color: var(--inset, #f7f8f9); }
.bg-field { background-color: var(--field, #f2f2f3); }
.bg-page { background-color: var(--page, #fafafb); }
.bg-canvas { background-color: var(--canvas, #f1f2f3); }
.bg-hover { background-color: var(--hover, #f4f5f6); }
.bg-hover-2 { background-color: var(--hover-2, #e7e9eb); }
.bg-ink { background-color: var(--ink, #1f2124); }
.bg-ink-2 { background-color: var(--ink-2, #62656b); }
.bg-ink-3 { background-color: var(--ink-3, #9a9da3); }
.bg-accent { background-color: var(--accent, #0285ff); }
.bg-accent-ink { background-color: var(--accent-ink, #0170dd); }
.bg-accent-tint { background-color: var(--accent-tint, #e9f3ff); }
.bg-accent-tint\\/30 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 30%, transparent); }
.bg-accent-tint\\/50 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 50%, transparent); }
.bg-accent-tint\\/70 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 70%, transparent); }
.bg-green { background-color: var(--green, #189a4d); }
.bg-green-tint { background-color: var(--green-tint, #e8f5ed); }
.bg-orange { background-color: var(--orange, #ef720c); }
.bg-orange-tint { background-color: var(--orange-tint, #fdf1e5); }
.bg-red { background-color: var(--red, #e3474c); }
.bg-red-tint { background-color: var(--red-tint, #fcecec); }
.bg-red-tint\\/35 { background-color: color-mix(in srgb, var(--red-tint, #fcecec) 35%, transparent); }
.bg-tooltip-bg { background-color: var(--tooltip-bg, #25272b); }
.bg-transparent { background-color: transparent; }
.bg-black\\/20 { background-color: rgba(0, 0, 0, 0.2); }
.bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4); }

/* Colors: Text */
.text-ink { color: var(--ink, #1f2124); }
.text-ink-2 { color: var(--ink-2, #62656b); }
.text-ink-3 { color: var(--ink-3, #9a9da3); }
.text-canvas { color: var(--canvas, #f1f2f3); }
.text-surface { color: var(--surface, #fff); }
.text-accent { color: var(--accent, #0285ff); }
.text-accent-ink { color: var(--accent-ink, #0170dd); }
.text-green { color: var(--green, #189a4d); }
.text-orange { color: var(--orange, #ef720c); }
.text-red { color: var(--red, #e3474c); }
.text-tooltip-fg { color: var(--tooltip-fg, #f6f7f8); }
.text-tooltip-muted { color: var(--tooltip-muted, #a5a8ad); }
.text-transparent { color: transparent; }

/* Borders & Dividers */
.border { border-width: 1px; border-style: solid; border-color: var(--line, #ecedef); }
.border-0 { border-width: 0; }
.border-t { border-top-width: 1px; border-top-style: solid; border-top-color: var(--line, #ecedef); }
.border-b { border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: var(--line, #ecedef); }
.border-l { border-left-width: 1px; border-left-style: solid; border-left-color: var(--line, #ecedef); }
.border-r { border-right-width: 1px; border-right-style: solid; border-right-color: var(--line, #ecedef); }

.border-line { border-color: var(--line, #ecedef); }
.border-line\\/40 { border-color: color-mix(in srgb, var(--line, #ecedef) 40%, transparent); }
.border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
.border-line\\/70 { border-color: color-mix(in srgb, var(--line, #ecedef) 70%, transparent); }
.border-line-strong { border-color: var(--line-strong, #e0e2e5); }
.border-accent { border-color: var(--accent, #0285ff); }
.border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
.border-green { border-color: var(--green, #189a4d); }
.border-orange { border-color: var(--orange, #ef720c); }
.border-red { border-color: var(--red, #e3474c); }
.border-transparent { border-color: transparent; }

.divide-y > * + * { border-top-width: 1px; border-top-style: solid; border-top-color: var(--line, #ecedef); }
.divide-line > * + * { border-top-color: var(--line, #ecedef); }

/* Border Radius */
.rounded-none { border-radius: 0; }
.rounded-full { border-radius: 9999px; }
.rounded-chip { border-radius: var(--radius-chip, 6px); }
.rounded-control { border-radius: var(--radius-control, 8px); }
.rounded-card { border-radius: var(--radius-card, 10px); }
.rounded-\\[1px\\] { border-radius: 1px; }
.rounded-\\[2px\\] { border-radius: 2px; }
.rounded-\\[4px\\] { border-radius: 4px; }
.rounded-\\[6px\\] { border-radius: 6px; }
.rounded-\\[8px\\] { border-radius: 8px; }
.rounded-\\[10px\\] { border-radius: 10px; }
.rounded-\\[12px\\] { border-radius: 12px; }
.rounded-\\[14px\\] { border-radius: 14px; }
.rounded-\\[16px\\] { border-radius: 16px; }

/* Typography */
.font-sans { font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif); }
.font-mono { font-family: var(--font-mono, ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace); }

.text-\\[9px\\] { font-size: 9px; line-height: 1.2; }
.text-\\[9\\.5px\\] { font-size: 9.5px; line-height: 1.2; }
.text-\\[10px\\] { font-size: 10px; line-height: 1.3; }
.text-\\[10\\.5px\\] { font-size: 10.5px; line-height: 1.35; }
.text-\\[11px\\] { font-size: 11px; line-height: 1.4; }
.text-\\[11\\.5px\\] { font-size: 11.5px; line-height: 1.4; }
.text-\\[12px\\] { font-size: 12px; line-height: 1.45; }
.text-\\[12\\.5px\\] { font-size: 12.5px; line-height: 1.45; }
.text-\\[13px\\] { font-size: 13px; line-height: 1.5; }
.text-\\[13\\.5px\\] { font-size: 13.5px; line-height: 1.5; }
.text-\\[14px\\] { font-size: 14px; line-height: 1.5; }
.text-\\[15px\\] { font-size: 15px; line-height: 1.5; }
.text-\\[16px\\] { font-size: 16px; line-height: 1.5; }
.text-\\[18px\\] { font-size: 18px; line-height: 1.4; }
.text-\\[20px\\] { font-size: 20px; line-height: 1.3; }

.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.tabular-nums { font-variant-numeric: tabular-nums; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.line-through { text-decoration: line-through; }
.underline { text-decoration: underline; }
.uppercase { text-transform: uppercase; }
.capitalize { text-transform: capitalize; }
.lowercase { text-transform: lowercase; }
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.25; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }

/* Shadows */
.shadow-xs { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1); }
.shadow-hairline { box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line, #ecedef)); }
.shadow-btn { box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong, #e0e2e5), 0 1px 2px #1018280d); }
.shadow-card { box-shadow: var(--shadow-card, 0 0 0 1px var(--line, #ecedef), 0 1px 2px #1018280a, 0 2px 6px #10182808); }
.shadow-raised { box-shadow: var(--shadow-raised, 0 0 0 1px var(--line, #ecedef), 0 2px 10px #0000000b); }
.shadow-overlay { box-shadow: var(--shadow-overlay, 0 0 0 1px var(--line, #ecedef), 0 8px 28px #0001); }

/* Sizing additions */
.w-1 { width: 4px; }
.w-4\\.5 { width: 18px; }
.w-30 { width: 120px; }
.w-60 { width: 240px; }
.w-\\[30\\%\\] { width: 30%; }
.w-\\[34\\%\\] { width: 34%; }
.w-\\[36\\%\\] { width: 36%; }

.h-4\\.5 { height: 18px; }
.h-5\\.5 { height: 22px; }
.h-6\\.5 { height: 26px; }

.min-w-4\\.5 { min-width: 18px; }
.min-w-\\[420px\\] { min-width: 420px; }

.max-w-60 { max-width: 240px; }
.max-w-72 { max-width: 288px; }
.max-w-86 { max-width: 344px; }
.max-w-105 { max-width: 420px; }
.max-w-\\[280px\\] { max-width: 280px; }
.max-w-\\[380px\\] { max-width: 380px; }
.max-w-\\[460px\\] { max-width: 460px; }
.max-w-\\[calc\\(100vw-48px\\)\\] { max-width: calc(100vw - 48px); }

.size-4\\.5 { width: 18px; height: 18px; }
.size-5\\.5 { width: 22px; height: 22px; }
.size-28 { width: 112px; height: 112px; }
.size-36 { width: 144px; height: 144px; }

.min-h-16 { min-height: 64px; }
.min-h-\\[38px\\] { min-height: 38px; }
.min-h-\\[220px\\] { min-height: 220px; }
.min-h-\\[248px\\] { min-height: 248px; }
.min-h-\\[278px\\] { min-height: 278px; }
.min-h-\\[408px\\] { min-height: 408px; }

/* Filter & Transforms */
.blur-xl { filter: blur(24px); }
.blur-\\[6px\\] { filter: blur(6px); }

.scale-85 { transform: scale(0.85); }
.scale-90 { transform: scale(0.9); }
.scale-95 { transform: scale(0.95); }
.scale-105 { transform: scale(1.05); }
.scale-110 { transform: scale(1.1); }
.scale-115 { transform: scale(1.15); }
.scale-125 { transform: scale(1.25); }

/* Opacity and Color additions */
.bg-accent\\/20 { background-color: color-mix(in srgb, var(--accent, #0285ff) 20%, transparent); }
.bg-accent\\/30 { background-color: color-mix(in srgb, var(--accent, #0285ff) 30%, transparent); }
.bg-green\\/25 { background-color: color-mix(in srgb, var(--green, #189a4d) 25%, transparent); }
.bg-orange\\/30 { background-color: color-mix(in srgb, var(--orange, #ef720c) 30%, transparent); }
.bg-white\\/20 { background-color: rgba(255, 255, 255, 0.2); }
.bg-white\\/40 { background-color: rgba(255, 255, 255, 0.4); }

.border-accent\\/30 { border-color: color-mix(in srgb, var(--accent, #0285ff) 30%, transparent); }
.border-orange\\/50 { border-color: color-mix(in srgb, var(--orange, #ef720c) 50%, transparent); }
.border-dashed { border-style: dashed; }
.border-t-ink-2 { border-top-color: var(--ink-2, #62656b); }

.cursor-ew-resize { cursor: ew-resize; }
.touch-none { touch-action: none; }
.box-decoration-clone { box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.tracking-\\[0\\.08em\\] { letter-spacing: 0.08em; }
.gap-px { gap: 1px; }

/* Positioning & Overflow */
.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; }
.top-0 { top: 0; }
.bottom-0 { bottom: 0; }
.bottom-8 { bottom: 32px; }
.left-0 { left: 0; }
.right-0 { right: 0; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.inset-x-0 { left: 0; right: 0; }
.inset-y-0\\.5 { top: 2px; bottom: 2px; }
.inset-y-1 { top: 4px; bottom: 4px; }
.left-1 { left: 4px; }
.z-10 { z-index: 10; }

.overflow-hidden { overflow: hidden; }
.overflow-visible { overflow: visible; }
.overflow-auto { overflow: auto; }
.overflow-y-auto { overflow-y: auto; }
.overflow-x-auto { overflow-x: auto; }

.select-none { user-select: none; }
.pointer-events-none { pointer-events: none; }
.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }

/* Transitions & Opacity */
.opacity-0 { opacity: 0; }
.opacity-25 { opacity: 0.25; }
.opacity-50 { opacity: 0.5; }
.opacity-60 { opacity: 0.6; }
.opacity-70 { opacity: 0.7; }
.opacity-75 { opacity: 0.75; }
.opacity-90 { opacity: 0.9; }
.opacity-100 { opacity: 1; }

.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-100 { transition-duration: 100ms; }
.duration-150 { transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.duration-400 { transition-duration: 400ms; }
.duration-500 { transition-duration: 500ms; }
.duration-700 { transition-duration: 700ms; }

/* Animations */
.animate-spin { animation: spin 1s linear infinite; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 50% { opacity: .5; } }
@keyframes fade-up { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes pop-in { 0% { opacity: 0; transform: scale(.95); } 100% { opacity: 1; transform: scale(1); } }
@keyframes shimmer-text { 0% { background-position: 150%; } 100% { background-position: -50%; } }
@keyframes caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes pixel-on { 0%, 100% { opacity: 0.15; } 18%, 42% { opacity: 1; } 62% { opacity: 0.15; } }

/* Media query responsive helpers */
@media (min-width: 640px) {
  .sm\\:flex { display: flex; }
}
@media (min-width: 768px) {
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* Dynamic pseudo-classes and modifiers */
.hover\\:bg-hover:hover { background-color: var(--hover, #f4f5f6); }
.hover\\:bg-hover-2:hover { background-color: var(--hover-2, #e7e9eb); }
.hover\\:bg-hover\\/20:hover { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
.hover\\:bg-hover\\/30:hover { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 30%, transparent); }
.hover\\:bg-hover\\/40:hover { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 40%, transparent); }
.hover\\:bg-hover\\/60:hover { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 60%, transparent); }
.hover\\:bg-line-strong:hover { background-color: var(--line-strong, #e0e2e5); }
.hover\\:bg-red-tint:hover { background-color: var(--red-tint, #fcecec); }
.hover\\:border-line-strong:hover { border-color: var(--line-strong, #e0e2e5); }
.hover\\:text-ink:hover { color: var(--ink, #1f2124); }
.hover\\:text-ink-2:hover { color: var(--ink-2, #62656b); }
.hover\\:text-red:hover { color: var(--red, #e3474c); }
.hover\\:opacity-85:hover { opacity: 0.85; }
.hover\\:opacity-90:hover { opacity: 0.9; }
.hover\\:underline:hover { text-decoration: underline; }
.hover\\:decoration-current:hover { text-decoration-color: currentColor; }

.group:hover .group-hover\\:opacity-100 { opacity: 1; }
.group\\/row:hover .group-hover\\/row\\:opacity-0 { opacity: 0; }
.group\\/row:hover .group-hover\\/row\\:opacity-100 { opacity: 1; }

.focus\\:border-accent:focus { border-color: var(--accent, #0285ff); }
.focus\\:bg-surface:focus { background-color: var(--surface, #fff); }
.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }

.disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
.disabled\\:opacity-35:disabled { opacity: 0.35; }

.placeholder\\:text-ink-3::placeholder { color: var(--ink-3, #9a9da3); }

.first\\:rounded-l-full:first-child { border-top-left-radius: 9999px; border-bottom-left-radius: 9999px; }
.last\\:rounded-r-full:last-child { border-top-right-radius: 9999px; border-bottom-right-radius: 9999px; }
.last\\:border-0:last-child { border-width: 0; }

.rotate-180 { transform: rotate(180deg); }
.rotate-90 { transform: rotate(90deg); }
.-rotate-90 { transform: rotate(-90deg); }

.max-w-110 { max-width: 440px; }
.max-w-95 { max-width: 380px; }
.max-w-80 { max-width: 320px; }
.max-w-\\[200px\\] { max-width: 200px; }
.max-w-\\[240px\\] { max-width: 240px; }
.max-w-\\[260px\\] { max-width: 260px; }
.w-\\[calc\\(100\\%\\+6px\\)\\] { width: calc(100% + 6px); }

.-mx-1\\.5 { margin-left: -6px; margin-right: -6px; }
.-mx-1 { margin-left: -4px; margin-right: -4px; }
.-mx-2 { margin-left: -8px; margin-right: -8px; }
.-mx-\\[3px\\] { margin-left: -3px; margin-right: -3px; }
.px-\\[3px\\] { padding-left: 3px; padding-right: 3px; }

.left-2\\.5 { left: 10px; }
.-left-3\\.5 { left: -14px; }
.top-4\\.5 { top: 18px; }
.bottom-6 { bottom: 24px; }
.py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }

.bg-line-strong { background-color: var(--line-strong, #e0e2e5); }
.bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
.bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
.bg-inset\\/60 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 60%, transparent); }
.bg-inset\\/70 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 70%, transparent); }
.bg-hover\\/20 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
.bg-hover\\/30 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 30%, transparent); }
.bg-hover\\/40 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 40%, transparent); }
.bg-hover\\/60 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 60%, transparent); }
.bg-green\\/60 { background-color: color-mix(in srgb, var(--green, #189a4d) 60%, transparent); }
.border-green\\/30 { border-color: color-mix(in srgb, var(--green, #189a4d) 30%, transparent); }

.ring-1 { box-shadow: 0 0 0 1px var(--ring, currentColor); }
.ring-accent { --ring: var(--accent, #0285ff); box-shadow: 0 0 0 1px var(--accent, #0285ff); }
.accent-accent { accent-color: var(--accent, #0285ff); }

.line-through { text-decoration: line-through; }
.decoration-line-strong { text-decoration-color: var(--line-strong, #e0e2e5); }
.decoration-transparent { text-decoration-color: transparent; }
.underline-offset-2 { text-underline-offset: 2px; }

.leading-6 { line-height: 24px; }
.leading-snug { line-height: 1.375; }
.break-all { word-break: break-all; }

/* Space Y utility */
.space-y-0\\.5 > * + * { margin-top: 2px; }
.space-y-1 > * + * { margin-top: 4px; }
.space-y-1\\.5 > * + * { margin-top: 6px; }
.space-y-2 > * + * { margin-top: 8px; }
.space-y-2\\.5 > * + * { margin-top: 10px; }
.space-y-3 > * + * { margin-top: 12px; }
.space-y-4 > * + * { margin-top: 16px; }

/* Button & Input Resets inside Shadow DOM */
button, input, textarea, select {
  font: inherit;
  color: inherit;
  background: transparent;
  border: none;
  outline: none;
}
button {
  cursor: pointer;
}

/* ── Primitive card chrome ─────────────────────────────── */
.primitive-card-bar { padding: 8px 12px; }
.primitive-card-pad { padding: 12px; }
.primitive-card-footer { padding: 10px 12px; }
.primitive-icon-button { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; }
.primitive-table-cell { padding: 6px 12px; }

/* ── Streaming caret ───────────────────────────────────── */
.stream-caret { background: var(--ink); vertical-align: text-bottom; border-radius: 1px; width: 2px; height: 1.05em; margin-left: 1.5px; animation: caret-blink 1s step-end infinite; display: inline-block; translate: 0 -.5px; }
.stream-caret.is-streaming { animation: none; }

/* ── Animated underline ────────────────────────────────── */
.animated-underline { display: inline-block; position: relative; }
.animated-underline:after { content: ""; transform-origin: 0; height: 1px; transition: transform .28s cubic-bezier(0.16, 1, 0.3, 1); background: currentColor; position: absolute; bottom: -1px; left: 0; right: 0; transform: scaleX(0); }
a:focus-visible .animated-underline:after, a:hover .animated-underline:after { transform: scaleX(1); }

/* ── Records table & Insight chart ─────────────────────── */
.records-shell { border: 1px solid var(--line); background: var(--surface); border-radius: 10px; width: 100%; min-width: 0; overflow: hidden; box-shadow: var(--shadow-card); }
.records-add-calculation, .records-company-header, .records-link, .records-strength { align-items: center; display: inline-flex; }
.records-add-calculation:active { transform: scale(.96); }
.records-scroll { overscroll-behavior: none; scrollbar-color: var(--line-strong) transparent; scrollbar-gutter: stable; max-height: 438px; overflow: auto; }
.records-scroll:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.records-table { border-collapse: separate; border-spacing: 0; width: 100%; min-width: 990px; color: var(--ink); table-layout: fixed; font-size: 12px; }
.records-company-col { width: 270px; }
.records-category-col { width: 275px; }
.records-last-col { width: 190px; }
.records-strength-col { width: 210px; }
.records-link-col { width: 175px; }
.records-table td, .records-table th { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); text-align: left; vertical-align: middle; }
.records-table tr > :last-child { border-right: 0; }
.records-table thead th { z-index: 5; background: var(--surface); height: 42px; color: var(--ink-2); font-size: 12px; font-weight: 600; position: sticky; top: 0; }
.records-header-cell { padding: 0; }
.records-header-cell.records-sticky-cell { z-index: 7; }
.records-company-header, .records-header-button { gap: 8px; width: 100%; height: 42px; padding: 0 12px; }
.records-company-header { padding-left: 6px; display: flex; }
.records-header-button { color: var(--ink-2); text-align: left; align-items: center; transition: background-color .12s ease-out, color .12s ease-out; display: flex; }
.records-header-button:hover { background: var(--hover); color: var(--ink); }
.records-header-icon { color: var(--ink-3); flex-shrink: 0; display: inline-flex; }
.records-sort { opacity: 0; transition: opacity .12s ease-out, transform .16s cubic-bezier(0.23, 1, 0.32, 1); flex-shrink: 0; margin-left: auto; display: inline-flex; }
.records-header-button:hover .records-sort, .records-sort.is-visible { opacity: 1; }
.records-checkbox { border-radius: var(--radius-chip); flex: 0 0 24px; justify-content: center; align-items: center; width: 24px; height: 24px; display: inline-flex; position: relative; }
.records-checkbox input { opacity: 0; width: 1px; height: 1px; position: absolute; }
.records-checkbox-box { color: #4d555e; width: 18px; height: 18px; transition: border-color .14s ease-out, background-color .14s ease-out, box-shadow .14s ease-out, transform .14s cubic-bezier(0.23, 1, 0.32, 1); background: #fff; border: 1px solid #c7cdd3; border-radius: 6px; justify-content: center; align-items: center; display: inline-flex; }
.records-checkbox:hover .records-checkbox-box { background: #f2f4f5; border-color: #aeb6bf; }
.records-checkbox:active .records-checkbox-box { transform: scale(.96); }
.records-checkbox-box.is-active { border-color: var(--accent); color: #fff; background: var(--accent); box-shadow: none; }
.records-checkbox-dash { background: #4d555e; border-radius: 99px; width: 8px; height: 1.5px; }
.records-cell { white-space: nowrap; text-overflow: ellipsis; height: 42px; padding: 0 12px; overflow: hidden; }
.records-sticky-cell { z-index: 2; background: var(--surface); position: sticky; left: 0; box-shadow: 5px 0 8px -10px #0006; }
.records-company-cell { align-items: center; gap: 4px; padding-left: 6px; display: flex; overflow: visible; }
.records-row > .records-cell { transition: background-color .12s ease-out, color .12s ease-out; }
.records-row:hover > .records-cell { background: var(--hover); }
.records-row.is-selected > .records-cell { background: var(--accent-tint); }
.records-row.is-selected > .records-cell .records-company-name, .records-row.is-selected > .records-cell .records-link { color: var(--accent-ink); }
.records-company-mark { width: 20px; height: 20px; color: var(--ink-2); background: var(--field); border: 0; border-radius: 6px; flex: 0 0 20px; justify-content: center; align-items: center; font-size: 10px; font-weight: 650; display: inline-flex; }
.records-company-name { min-width: 0; color: var(--ink); text-overflow: ellipsis; white-space: nowrap; font-size: 12.5px; font-weight: 500; overflow: hidden; }
.records-company-name.has-link:focus-visible, .records-company-name.has-link:hover { color: var(--accent-ink); text-underline-offset: 3px; text-decoration: underline; }
.records-tags { gap: 4px; min-width: 0; display: flex; align-items: center; overflow: hidden; }
.records-tag { cursor: pointer; border: 1px solid color-mix(in srgb, var(--tag-color) 38%, transparent); flex-shrink: 0; max-width: 115px; height: 23px; display: inline-flex; align-items: center; color: var(--tag-color); border-radius: 6px; padding: 0 7px; background: color-mix(in srgb, var(--tag-color) 13%, transparent); text-overflow: ellipsis; white-space: nowrap; font-size: 11px; font-weight: 500; }
.records-more-tag { border: 1px solid var(--line-strong); height: 23px; border-radius: 6px; flex-shrink: 0; align-items: center; padding: 0 7px; font-size: 11px; font-weight: 500; display: inline-flex; background: var(--inset); color: var(--ink-3); }
.records-tag-dot { border-radius: 50%; flex: 0 0 5px; width: 5px; height: 5px; margin-right: 5px; }
.records-strength { color: var(--ink-2); gap: 8px; align-items: center; display: inline-flex; }
.records-strength-dot { border-radius: 50%; flex: 0 0 8px; width: 8px; height: 8px; display: inline-block; }
.records-link { max-width: 100%; color: var(--accent-ink); text-overflow: ellipsis; gap: 5px; text-decoration: underline; overflow: hidden; text-underline-offset: 3px; transition: color .12s ease-out, text-decoration-color .12s ease-out; align-items: center; display: inline-flex; }
.records-link:focus-visible, .records-link:hover { color: var(--ink); text-decoration-color: currentColor; }
.records-muted { color: var(--ink-3); }
.records-table tfoot td { z-index: 4; background: var(--inset); height: 38px; color: var(--ink-2); font-size: 11.5px; position: sticky; bottom: 0; }
.records-table tfoot .records-sticky-cell { z-index: 6; background: var(--inset); }
.records-calculation-label { color: var(--ink-2); font-weight: 550; }
.records-calculation-number { color: var(--ink); font-variant-numeric: tabular-nums; margin-right: 3px; }
.records-add-calculation { color: var(--ink-3); transition: color .12s ease-out, transform .14s cubic-bezier(0.23, 1, 0.32, 1); gap: 6px; }
.records-add-calculation:hover { color: var(--ink); }
.records-average { color: var(--ink-2); align-items: center; gap: 7px; display: inline-flex; }

/* ── Insight chart tooltip ─────────────────────────────── */
.insight-chart-stage { overflow: hidden; }
.insight-chart-cursor { z-index: 4; background: var(--ink); opacity: .26; pointer-events: none; width: 1px; position: absolute; top: 0; bottom: 0; }
.insight-chart-tooltip-anchor { z-index: 5; pointer-events: none; position: absolute; top: 8px; transform: translate(-50%); }
.insight-chart-tooltip { border: 1px solid var(--line-strong); min-width: 154px; color: var(--tooltip-fg); background: var(--tooltip-bg); box-shadow: var(--shadow-overlay); border-radius: 10px; padding: 9px 10px; font-size: 12px; }
.insight-chart-tooltip-time { color: var(--tooltip-muted); margin-bottom: 7px; font-size: 11px; display: block; }
.insight-chart-tooltip-row { justify-content: space-between; align-items: center; gap: 16px; line-height: 1.65; display: flex; }
.insight-chart-tooltip-label { color: var(--tooltip-fg); align-items: center; gap: 7px; display: inline-flex; }
.insight-chart-tooltip-row strong { color: var(--tooltip-muted); font-variant-numeric: tabular-nums; font-weight: 500; }
.insight-chart-tooltip-dot { border-radius: 50%; flex: 0 0 8px; width: 8px; height: 8px; }
`;

