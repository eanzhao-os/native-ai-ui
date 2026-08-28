(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74312,e=>{"use strict";let t="en",n=new Set;try{let e=window.localStorage.getItem("nai-lang");"en"===e||"zh"===e?t=e:("zh"===document.documentElement.lang||document.documentElement.lang?.startsWith("zh-"))&&(t="zh")}catch{}function s(){return t}function i(e){if(("en"===e||"zh"===e)&&t!==e){t=e;try{window.localStorage.setItem("nai-lang",e)}catch{}for(let t of(document.documentElement.lang=e,window.dispatchEvent(new CustomEvent("nai-lang-change",{detail:{lang:e}})),n))try{t(e)}catch(e){console.error("[nai-lang] listener error:",e)}}}function r(e){return n.add(e),()=>{n.delete(e)}}function o(e){return"en"===e||"zh"===e?e:t}e.s(["getGlobalLang",0,s,"onLangChange",0,r,"resolveLang",0,o,"setGlobalLang",0,i],29218);let a=`
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
`;e.s(["UTILITY_CSS",0,a],32083);class l extends HTMLElement{static get observedAttributes(){return["lang"]}constructor(){super(),this.attachShadow({mode:"open"}),this._cleanups=[],this._mounted=!1}setHtml(e,t=""){let n="string"==typeof e?e.replace(/\{\/\*[\s\S]*?\*\/\}/g,""):e;this.shadowRoot.innerHTML=`
      <style>
        ${a}
        ${t}
      </style>
      ${n}
    `}get currentLang(){return o(this.getAttribute("lang"))}get isZh(){return"zh"===this.currentLang}connectedCallback(){this._mounted=!0,this._unsubLang=r(()=>{this.hasAttribute("lang")||this.requestUpdate()}),this.onMount(),this.requestUpdate()}disconnectedCallback(){this._mounted=!1,this._unsubLang&&(this._unsubLang(),this._unsubLang=null),this.cleanup(),this.onUnmount()}attributeChangedCallback(e,t,n){t!==n&&this._mounted&&(this.onAttributeChange(e,t,n),this.requestUpdate())}onMount(){}onUnmount(){}onAttributeChange(e,t,n){}registerTimeout(e,t){let n=window.setTimeout(e,t);return this._cleanups.push(()=>clearTimeout(n)),n}registerInterval(e,t){let n=window.setInterval(e,t);return this._cleanups.push(()=>clearInterval(n)),n}registerRaf(e){let t,n=s=>{e(s),t=requestAnimationFrame(n)};t=requestAnimationFrame(n);let s=()=>cancelAnimationFrame(t);return this._cleanups.push(s),s}registerListener(e,t,n,s){e.addEventListener(t,n,s),this._cleanups.push(()=>e.removeEventListener(t,n,s))}cleanup(){for(;this._cleanups.length>0;){let e=this._cleanups.pop();try{e()}catch(e){console.error("[nai-base-element] cleanup error:",e)}}}requestUpdate(){this._mounted&&this.render()}render(){}}e.s(["NaiBaseElement",0,l],43516);let d=Array.from({length:9},(e,t)=>{let n=Math.floor(t/3);return(t%3+Math.abs(n-1))*90}),c=[0,1,2,5,8,7,6,3],p={Drive:{delays:d,dur:650,round:!1},Dots:{delays:d,dur:650,round:!0},Orbit:{delays:Array.from({length:9},(e,t)=>{let n=c.indexOf(t);return -1===n?null:110*n}),dur:950,round:!1}};class h extends l{static get observedAttributes(){return["variant","label","lang"]}constructor(){super(),this._ds=0}get variant(){return this.getAttribute("variant")||"Drive"}get label(){return this.getAttribute("label")||"Churning"}onMount(){this._ds=0,this.registerInterval(()=>{this._ds++,this._updateTimerDisplay()},100)}_formatElapsed(){let e=this._ds/10;return e<60?`${e.toFixed(1)}s`:`${Math.floor(e/60)}m ${(e%60).toFixed(1)}s`}_updateTimerDisplay(){let e=this.shadowRoot?.querySelector(".elapsed-timer");e&&(e.textContent=this._formatElapsed())}render(){let e=this.isZh,t=this.label,{delays:n,dur:s,round:i}=p[this.variant]??p.Drive;this.setHtml(`
      <div class="flex w-fit items-center gap-2.5">
        <span aria-hidden="true" class="pixel-grid grid" style="grid-template-columns: repeat(3, 4px); gap: 1.5px;">
          ${n.map(e=>`
            <span
              class="pixel size-1 bg-ink ${i?"rounded-full":"rounded-[1px]"}"
              style="
                opacity: ${null===e?"0.07":"0.15"};
                animation: ${null===e?"none":`pixel-on ${s}ms ease-in-out ${e}ms infinite`};
              "
            ></span>
          `).join("")}
        </span>
        <span
          class="label text-[13px] font-medium text-transparent"
          style="
            background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shimmer-text 1.4s linear infinite;
          "
        >${e&&"Churning"===t?"搅拌中":t}</span>
        <span class="elapsed-timer font-mono text-[12px] text-ink-3 tabular-nums">${this._formatElapsed()}</span>
      </div>
    `)}}"u">typeof customElements&&!customElements.get("nai-loading-state")&&customElements.define("nai-loading-state",h);let u=[800,600,1800,2600,1600],x={Steps:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Reading flavor briefs"},{primary:"Scanning supplier lists"},{primary:"Comparing tasting notes",secondary:"6 flavors"},{primary:"Writing the scoop report"}]},Reasoning:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Summer demand spikes for stone-fruit flavors — peach and apricot lead."},{primary:"I should check cone inventory before promoting a waffle-bowl special."}]},Search:{active:"Searching the web",done:"Searched the web",query:"best waffle cone supplier",rows:[{primary:"Joy Cone",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"Running tools",done:"Ran 3 tools",rows:[{primary:"Read",secondary:"flavors.ts",mono:!0},{primary:"Edit",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"Run",secondary:"npm run freeze",mono:!0}]}},g={Steps:{active:"深度思考中",done:"已深度思考 4 秒",rows:[{primary:"解析风味研发简报"},{primary:"扫描合规原料供应商名录"},{primary:"比对盲测品鉴笔记",secondary:"6 款配方"},{primary:"生成冰淇淋上架评估报告"}]},Reasoning:{active:"深度推理中",done:"已完成推理 (4秒)",rows:[{primary:"夏季水果口味需求激增 — 蜜桃与黄杏风味处于领跑地位。"},{primary:"在推广华夫脆筒套餐前，应先校验当前脆筒库存水位。"}]},Search:{active:"正在检索全网资料",done:"全网检索完成",query:"顶级华夫甜筒供应商",rows:[{primary:"Joy Cone 官方供应链",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore 餐饮商城",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery 手工脆筒",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"正在执行工具调用",done:"已调用 3 项工具",rows:[{primary:"读取",secondary:"flavors.ts",mono:!0},{primary:"修改",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"执行",secondary:"npm run freeze",mono:!0}]}},m=["bg-accent","bg-orange","bg-green"];class b extends l{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._stage=0,this._manualExpanded=null,this._selectedTool=null}get variant(){return this.getAttribute("variant")||"Steps"}onMount(){this._stage=0;let e=t=>{t>=u.length-1||this.registerTimeout(()=>{this._stage=t+1,this.render(),e(this._stage)},u[t])};e(0)}render(){let e=this.isZh,t=this.variant,n=e?g:x,s=n[t]??n.Steps,i=this._stage>=1&&this._stage<4,r=this._manualExpanded??i,o=this._stage<3,a=this._stage<2?0:2===this._stage?Math.min(2,s.rows.length):s.rows.length;this.setHtml(`
      <div class="flex min-h-[176px] w-full max-w-95 flex-col">
        
        <button
          type="button"
          aria-expanded="${r}"
          class="header-btn toggle-btn -mx-1.5 flex w-fit items-center gap-2 rounded-control px-1.5 py-1 transition-colors duration-100 hover:bg-hover-2 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${o?"var(--ink-2)":"var(--ink-3)"}">
            <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
          </svg>
          ${o?`
            <span
              class="text-[13px] font-medium whitespace-nowrap text-transparent"
              style="
                background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%);
                background-size: 200% 100%;
                -webkit-background-clip: text;
                background-clip: text;
                animation: shimmer-text 1.4s linear infinite;
              "
            >
              ${s.active}
            </span>
          `:`
            <span class="text-[13px] font-medium whitespace-nowrap text-ink-2">
              ${s.done}
            </span>
          `}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--ink-3)"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-300"
            style="transform: ${r?"rotate(180deg)":"rotate(0)"};"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        
        <div
          class="trace-container grid transition-all duration-400"
          style="
            grid-template-rows: ${r?"1fr":"0fr"};
            opacity: ${+!!r};
          "
        >
          <div class="overflow-hidden">
            <div class="relative mt-1 ml-[5px] pl-4 border-l border-line">
              <div class="flex flex-col gap-1 py-1">
                ${s.query?`
                  <div class="flex h-6 items-center gap-2 px-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" class="shrink-0">
                      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                    </svg>
                    <span class="text-[12.5px] text-ink-2">${s.query}</span>
                  </div>
                `:""}
                ${s.rows.slice(0,a).map((e,n)=>{let s=n===a-1&&o;return`
                    <div
                      class="flex min-h-7 w-full items-center gap-2 rounded-[6px] px-1.5 py-0.5 text-left transition-colors duration-150 ${"Search"===t?"hover:bg-hover cursor-pointer":""}"
                      style="animation: fade-up 320ms cubic-bezier(0.23,1,0.32,1) ${120*n}ms both;"
                    >
                      ${"Search"===t?`<span class="flex size-3.5 shrink-0 items-center justify-center rounded-full text-white ${m[n%3]}">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
                            </span>`:"Steps"===t?s?'<span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 animate-spin"></span>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 6L9 17l-5-5" /></svg>':""}
                      <span class="min-w-0 truncate text-[12.5px] ${"Reasoning"===t?"whitespace-normal leading-relaxed text-ink-2":"font-medium text-ink"}">
                        ${e.primary}
                      </span>
                      ${e.secondary?`<span class="shrink-0 text-[11.5px] text-ink-3 ${e.mono?"font-mono":""}">${e.secondary}</span>`:""}
                      ${void 0!==e.add?`<span class="shrink-0 font-mono text-[11px] tabular-nums"><span class="text-green">+${e.add}</span> <span class="text-red">−${e.del}</span></span>`:""}
                    </div>
                  `}).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `);let l=this.shadowRoot?.querySelector(".toggle-btn");l&&l.addEventListener("click",()=>{this._manualExpanded=!(this._manualExpanded??i),this.render()})}}"u">typeof customElements&&!customElements.get("nai-thinking")&&customElements.define("nai-thinking",b);let f=[..."Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points.".split(" ").map(e=>({text:e})),{text:"",cite:!0},..."Stone-fruit flavors are trending in the same range.".split(" ").map(e=>({text:e}))],v=[..."开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。".split("").map(e=>({text:e})),{text:"",cite:!0},..."同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。".split("").map(e=>({text:e}))],k=["Which flavors sell best in winter","Compare gelato and soft serve margins"],w=["冬季哪些冰淇淋风味销量最高？","对比意式硬冰与软冰淇淋的利润率"],y=[{name:"Scoop Data",domain:"scoopdata.io",href:"https://scoopdata.io/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M20 36c0 7 5.4 12 12 12s12-5 12-12H20Z' fill='%23fff'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23bff3dd'/%3E%3Cpath d='M24 24c4-7 13-7 17 0' fill='none' stroke='%231f7a5f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E"},{name:"Trends Index",domain:"trends.google.com",href:"https://trends.google.com/trends/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232f6fec'/%3E%3Cpath d='M15 43 27 31l8 7 14-18' fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='49' cy='20' r='5' fill='%23bfe0ff'/%3E%3C/svg%3E"},{name:"Market Basket",domain:"marketbasket.io",href:"https://marketbasket.io/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23e56d24'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3Cpath d='M16 49h32' stroke='%23ffd6b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E"}];class $ extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._count=0,this._sourcesOpen=!1,this._copied=!1}onMount(){this._count=0,this._tick()}_tick(){let e=this.isZh?v:f,t=this._count>=e.length;this.registerTimeout(()=>{this._count=this._count>=e.length?0:this._count+1,this.render(),this._tick()},t?3400:55)}render(){let e=this.isZh,t=e?v:f,n=this._count>=t.length;this.setHtml(`
      <div class="min-h-[15.5rem] w-full max-w-95">
        <p class="content text-[13px] leading-relaxed text-ink">
          ${t.slice(0,this._count).map(t=>t.cite?`
              <a
                href="${y[0].href}"
                target="_blank"
                rel="noreferrer"
                class="ml-0 mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-inset pr-[3px] pl-[3px] align-middle font-mono text-[10.5px] text-ink-2 shadow-xs transition-colors duration-150 hover:bg-hover hover:text-ink"
                style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
              >
                <img src="${y[0].image}" alt="" class="size-3 rounded-[3px]" />
                <span>${y[0].domain}</span>
              </a>
            `:`
              <span class="inline" style="animation: stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both;">
                ${t.text}${e?"":" "}
              </span>
            `).join("")}
          ${!n?'<span class="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-ink" style="animation: fade-in 150ms ease-out both;"></span>':""}
        </p>

        
        <div
          class="mt-2 flex items-center gap-0.5 transition-opacity duration-400"
          style="opacity: ${+!!n}; pointer-events: ${n?"auto":"none"};"
        >
          <button
            type="button"
            class="copy-btn flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${e?"复制":"Copy"}"
          >
            ${this._copied?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>'}
          </button>
          <button
            type="button"
            class="retry-btn flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${e?"重新生成":"Retry"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
            </svg>
          </button>
          <button
            type="button"
            class="flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${e?"赞":"Thumbs up"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
            </svg>
          </button>
          <button
            type="button"
            class="flex size-7 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
            aria-label="${e?"踩":"Thumbs down"}"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />
            </svg>
          </button>
        </div>

        
        <div
          class="mt-3 flex flex-col gap-1.5 transition-opacity duration-500"
          style="opacity: ${+!!n}; pointer-events: ${n?"auto":"none"};"
        >
          <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
            ${e?"后续建议":"Suggested follow-ups"}
          </span>
          <div class="flex flex-wrap gap-1.5">
            ${(e?w:k).map(e=>`
              <button
                type="button"
                class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11.5px] text-ink shadow-xs transition-colors duration-150 hover:bg-hover cursor-pointer"
              >
                ${e}
              </button>
            `).join("")}
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click",()=>{this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1600)}),this.shadowRoot?.querySelector(".retry-btn")?.addEventListener("click",()=>{this._count=0,this.render()})}}"u">typeof customElements&&!customElements.get("nai-streaming-text")&&customElements.define("nai-streaming-text",$);let _=[{q:"How many flavors should we launch?",type:"radio",options:["Three (core line)","Five (full case)","Just one hero"]},{q:"Which mix-ins should we stock?",type:"check",options:["Chocolate chips","Waffle bits","Sprinkles"]},{q:"Which market do we enter first?",type:"radio",options:["Food trucks","Grocery freezers","Scoop shops"]}],E=[{q:"首批上线推出几款新口味？",type:"radio",options:["3 款 (核心经典线)","5 款 (完整全品类)","仅推 1 款爆品"]},{q:"首批需要进货哪些混合配料？",type:"check",options:["黑巧碎粒","华夫脆角碎片","彩色糖针"]},{q:"优先切入哪个试点销售渠道？",type:"radio",options:["流动餐车","精品超市冷柜","线下直营体验店"]}];class S extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0}toggle(e){let t=this.isZh?E:_,n=t[this._qi],s=this._answers[this._qi]??[],i="radio"===n.type?[e]:s.includes(e)?s.filter(t=>t!==e):[...s,e];this._answers[this._qi]=i,"radio"===n.type?(this._custom[this._qi]="",this.render(),this.registerTimeout(()=>{this._qi===t.length-1?this._sent=!0:this._qi=Math.min(t.length-1,this._qi+1),this.render()},480)):this.render()}submitNext(){let e=this.isZh?E:_;this._qi===e.length-1?this._sent=!0:this._qi=Math.min(e.length-1,this._qi+1),this.render()}reset(){this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0,this.render()}render(){let e=this.isZh,t=e?E:_;if(!this._open){this.setHtml(`
        <button
          type="button"
          class="reopen-btn rounded-control bg-surface px-3 py-2 text-[12.5px] font-medium text-ink shadow-btn transition-colors duration-150 hover:bg-hover cursor-pointer"
        >
          ${e?"打开审批流卡片":"Open approval"}
        </button>
      `),this.shadowRoot?.querySelector(".reopen-btn")?.addEventListener("click",()=>{this._open=!0,this.render()});return}let n=t[this._qi],s=this._qi===t.length-1,i=this._answers[this._qi]??[],r=i.length>0||!!this._custom[this._qi]?.trim();this.setHtml(`
      <div class="flex min-h-[196px] w-full max-w-80 flex-col items-stretch">
        <div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-card p-3">
          ${this._sent?`
            <div class="flex h-37 flex-col items-center justify-center gap-2">
              <span
                class="flex size-6 items-center justify-center rounded-full bg-green text-white"
                style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-[13px] font-medium text-ink" style="animation: fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both;">
                ${e?"审批决策已提交":"Answers sent"}
              </span>
              <button type="button" class="reset-btn text-[12px] font-medium text-accent-ink hover:underline cursor-pointer">
                ${e?"重新填写":"Start over"}
              </button>
            </div>
          `:`
            <div style="animation: fade-up 350ms cubic-bezier(0.23,1,0.32,1) both;">
              <div class="flex items-start justify-between gap-3">
                <span class="text-[13px] font-medium text-ink">${n.q}</span>
                <button
                  type="button"
                  aria-label="Dismiss"
                  class="dismiss-btn flex size-5 items-center justify-center rounded-[4px] shrink-0 text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="mt-2 flex flex-col gap-0.5">
                ${n.options.map((e,t)=>{let s=i.includes(t);return`
                    <button
                      type="button"
                      data-option="${t}"
                      class="option-item ${s?"selected":""} flex min-h-7 w-full items-center gap-2 rounded-[6px] px-1.5 py-1 text-left transition-colors duration-100 cursor-pointer ${s?"bg-accent-tint text-accent-ink font-medium":"text-ink hover:bg-hover"}"
                    >
                      <span class="flex size-3.5 shrink-0 items-center justify-center rounded-${"radio"===n.type?"full":"[3px]"} border border-line-strong ${s?"border-accent bg-accent text-white":"bg-surface"}">
                        ${s?'<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>':""}
                      </span>
                      <span class="text-[12.5px]">${e}</span>
                    </button>
                  `}).join("")}
              </div>

              ${"check"===n.type?`
                <div class="mt-3 flex items-center justify-between border-t border-line pt-2">
                  <span class="text-[11px] text-ink-3">${e?`问题 ${this._qi+1}/${t.length}`:`Question ${this._qi+1}/${t.length}`}</span>
                  <button
                    type="button"
                    ${!r?"disabled":""}
                    class="next-btn rounded-control px-2.5 py-1 text-[11.5px] font-medium transition-all duration-150 ${r?"bg-accent text-white shadow-btn hover:opacity-90 cursor-pointer":"bg-field text-ink-3 cursor-not-allowed opacity-60"}"
                  >
                    ${s?e?"提交":"Submit":e?"下一题":"Next"}
                  </button>
                </div>
              `:""}
            </div>
          `}
        </div>
      </div>
    `),this.shadowRoot?.querySelector(".dismiss-btn")?.addEventListener("click",()=>{this._open=!1,this.render()}),this.shadowRoot?.querySelector(".reset-btn")?.addEventListener("click",()=>{this.reset()}),this.shadowRoot?.querySelectorAll("[data-option]").forEach(e=>{e.addEventListener("click",()=>{let t=Number(e.getAttribute("data-option"));this.toggle(t)})}),this.shadowRoot?.querySelector(".next-btn")?.addEventListener("click",()=>{r&&this.submitNext()})}}"u">typeof customElements&&!customElements.get("nai-approval-card")&&customElements.define("nai-approval-card",S);let C=[{key:"attach",nameEn:"Add photos & files",nameZh:"添加图片和文件",descEn:"Upload from your computer",descZh:"从本地上传",glyph:"clip",attach:!0},{key:"scoop",nameEn:"Scoop Data",nameZh:"Scoop 数据",descEn:"Sales & churn metrics",descZh:"销售与产量指标",glyph:"chart"},{key:"flavors",nameEn:"Flavor records",nameZh:"风味档案",descEn:"26 makers, tags, links",descZh:"26 家厂商、标签与链接",glyph:"layers"},{key:"web",nameEn:"Web search",nameZh:"联网搜索",descEn:"Real-time news and info",descZh:"实时新闻与资讯",glyph:"globe"}],j=[{key:"compare",name:"/compare",descEn:"Flavor vs. last summer",descZh:"对比风味与去年同期销量"},{key:"churn-plan",name:"/churn-plan",descEn:"Draft a churn schedule",descZh:"起草搅拌生产排期"},{key:"restock",name:"/restock",descEn:"Build a reorder list",descZh:"生成补货清单"},{key:"draft-email",name:"/draft-email",descEn:"Write a supplier email",descZh:"撰写供应商邮件"},{key:"summarize",name:"/summarize",descEn:"Digest the thread so far",descZh:"总结当前对话要点"}],M=[{key:"sprinkles-5",name:"Sprinkles 5",tagEn:"Flagship",tagZh:"旗舰"},{key:"vanilla-1",name:"Vanilla 1",tagEn:"Basic",tagZh:"基础"},{key:"freezer-burn",name:"Freezer Burn 0.4",tagEn:"Stale",tagZh:"过时"}],z={clip:'<path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />',layers:'<g><path d="M12 2 2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>',globe:'<g><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" /></g>'};class Z extends l{static get observedAttributes(){return["variant","lang"]}constructor(){super(),this._draft="",this._menu=null,this._modelOpen=!1,this._model=M[0],this._listening=!1,this._attachments=[]}get variant(){return this.getAttribute("variant")||"Rounded"}get isPill(){return"pill"===this.variant.toLowerCase()}onMount(){this.registerListener(document,"click",e=>{!this.contains(e.target)&&!this.shadowRoot?.contains(e.target)&&(this._menu||this._modelOpen)&&(this._menu=null,this._modelOpen=!1,this.render())})}_parseToken(e){let t=/(^|\s)([@/])([\w-]*)$/.exec(e);return t?{kind:"@"===t[2]?"at":"slash",query:t[3].toLowerCase(),start:t.index+t[1].length}:null}_handleInput(e){this._draft=e;let t=this._parseToken(e);t?this._menu=t.kind:("at"===this._menu||"slash"===this._menu)&&(this._menu=null),this.render()}_selectItem(e){"at"===this._menu||"plus"===this._menu?e.attach?this._attachments.push("uploaded-file.pdf"):this._draft=this._draft.replace(/@[\w-]*$/,`@${e.nameEn} `):"slash"===this._menu&&(this._draft=e.name+" "),this._menu=null,this.render();let t=this.shadowRoot?.querySelector("textarea");t&&(t.focus(),t.value=this._draft)}_selectModel(e){this._model=e,this._modelOpen=!1,this.render()}send(){if(!this._draft.trim()&&0===this._attachments.length)return;let e={text:this._draft.trim(),model:this._model.key};this.dispatchEvent(new CustomEvent("submit",{detail:e})),this._draft="",this._attachments=[],this._menu=null,this.render()}render(){let e=this.isZh,t=this.isPill,n=this._draft.trim().length>0||this._attachments.length>0,s=this._draft.length>40||this._draft.includes("\n"),i="at"===this._menu||"plus"===this._menu?C.map(t=>({...t,name:e?t.nameZh:t.nameEn,desc:e?t.descZh:t.descEn})):"slash"===this._menu?j.map(t=>({...t,name:t.name,desc:e?t.descZh:t.descEn})):[];this.setHtml(`
      <div class="relative w-full max-w-lg select-none">
        
        ${this._menu&&i.length>0?`
          <div
            class="absolute left-0 bottom-full z-20 mb-2 w-72 rounded-card border border-line bg-surface p-1 shadow-raised overflow-hidden"
            style="animation: pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;"
          >
            <div class="flex flex-col gap-0.5 max-h-56 overflow-y-auto">
              ${i.map((e,t)=>`
                <button
                  type="button"
                  data-idx="${t}"
                  class="menu-item flex h-9 w-full items-center gap-2.5 rounded-[6px] px-2 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
                >
                  ${e.glyph?`<span class="flex size-5.5 shrink-0 items-center justify-center text-ink-2">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            ${z[e.glyph]}
                          </svg>
                        </span>`:""}
                  <span class="shrink-0 text-[12.5px] font-medium text-ink">${e.name}</span>
                  <span class="min-w-0 flex-1 truncate text-[12px] text-ink-3">${e.desc}</span>
                </button>
              `).join("")}
            </div>
            <div class="mt-1 border-t border-line px-2 pt-1.5 pb-1 text-[11px] text-ink-3">
              ${"at"===this._menu?e?"输入以搜索数据源与文件":"Type to search sources & files":e?"输入以搜索命令":"Type to search commands"}
            </div>
          </div>
        `:""}

        
        ${this._modelOpen?`
          <div
            class="absolute right-0 bottom-full z-20 mb-2 w-44 rounded-card border border-line bg-surface p-1 shadow-raised overflow-hidden"
            style="animation: pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;"
          >
            ${M.map(t=>`
              <button
                type="button"
                data-model="${t.key}"
                class="model-item flex h-7.5 w-full items-center gap-2 rounded-[6px] px-2 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
              >
                <span class="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">${t.name}</span>
                <span class="shrink-0 text-[11px] text-ink-3">${e?t.tagZh:t.tagEn}</span>
                <span class="shrink-0 text-ink ${t.key===this._model.key?"":"opacity-0"}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
              </button>
            `).join("")}
          </div>
        `:""}

        
        <div
          class="relative isolate flex flex-col gap-1.5 overflow-hidden border border-line bg-surface p-1.5 shadow-card transition-all duration-150 ${t?this._attachments.length>0||s?"rounded-[24px]":"rounded-full":"rounded-[14px]"}"
        >
          ${this._attachments.length>0?`
            <div class="flex flex-wrap gap-1.5 pt-0.5 ${t?"px-1":"px-0.5"}">
              ${this._attachments.map((e,n)=>`
                <span class="flex h-6.5 items-center gap-1.5 bg-field py-1 pr-1 pl-1.5 text-[11.5px] text-ink-2 shadow-xs ${t?"rounded-full":"rounded-chip"}">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                  <span class="max-w-36 truncate">${e}</span>
                  <button type="button" data-remove="${n}" class="flex size-4 items-center justify-center text-ink-3 hover:text-ink cursor-pointer">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              `).join("")}
            </div>
          `:""}

          <div
            class="grid items-end gap-x-1 gap-y-1.5 ${s?"grid-cols-[minmax(0,1fr)_auto_28px_28px]":"grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]"}"
          >
            
            <button
              type="button"
              aria-label="${e?"添加附件与数据源":"Add attachments and sources"}"
              class="plus-btn flex size-7 shrink-0 items-center justify-center justify-self-start text-ink-3 transition-colors duration-150 hover:bg-hover hover:text-ink cursor-pointer ${t?"rounded-full":"rounded-[8px]"} ${"plus"===this._menu?"bg-hover text-ink":""}"
              style="grid-column-start: 1; grid-row-start: ${s?"2":"1"};"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>

            
            <textarea
              rows="1"
              placeholder="${e?"输入消息…":"Write a message…"}"
              aria-label="${e?"提示词输入框":"Prompt"}"
              class="min-h-7 min-w-0 w-full resize-none bg-transparent px-1 py-[5px] text-[13px] leading-[18px] text-ink outline-none placeholder:text-ink-3"
              style="
                grid-column: ${s?"1 / -1":"2"};
                grid-row-start: 1;
              "
            >${this._draft}</textarea>

            
            <button
              type="button"
              aria-label="${e?"选择模型":"Choose model"}"
              class="model-picker-btn flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink cursor-pointer ${t?"rounded-full":"rounded-[8px]"}"
              style="grid-column-start: ${s?"2":"3"}; grid-row-start: ${s?"2":"1"};"
            >
              <span>${this._model.name}</span>
              <span class="text-ink-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            
            <button
              type="button"
              aria-label="${e?"听写":"Dictation"}"
              class="mic-btn flex size-7 shrink-0 items-center justify-center transition-colors duration-150 cursor-pointer ${t?"rounded-full":"rounded-[8px]"} ${this._listening?"bg-accent-tint text-accent-ink":"text-ink-3 hover:bg-hover hover:text-ink"}"
              style="grid-column-start: ${s?"3":"4"}; grid-row-start: ${s?"2":"1"};"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
              </svg>
            </button>

            
            <button
              type="button"
              aria-label="${e?"发送":"Send"}"
              ${!n?"disabled":""}
              class="send-btn flex size-7 shrink-0 items-center justify-center transition-all duration-200 ${t?"rounded-full":"rounded-[8px]"}"
              style="
                grid-column-start: ${s?"4":"5"};
                grid-row-start: ${s?"2":"1"};
                background: ${n?"var(--ink)":"var(--line-strong)"};
                color: ${n?"var(--surface)":"var(--ink-2)"};
                cursor: ${n?"pointer":"default"};
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `);let r=this.shadowRoot?.querySelector("textarea"),o=this.shadowRoot?.querySelector(".plus-btn"),a=this.shadowRoot?.querySelector(".model-picker-btn"),l=this.shadowRoot?.querySelector(".mic-btn"),d=this.shadowRoot?.querySelector(".send-btn");r&&(r.addEventListener("input",e=>this._handleInput(e.target.value)),r.addEventListener("keydown",e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this.send())})),o&&o.addEventListener("click",()=>{this._modelOpen=!1,this._menu="plus"===this._menu?null:"plus",this.render()}),a&&a.addEventListener("click",()=>{this._menu=null,this._modelOpen=!this._modelOpen,this.render()}),l&&l.addEventListener("click",()=>{this._listening=!this._listening,this._listening&&(this._draft=e?"对比开心果口味周末销量与去年同期":"Compare pistachio weekends to last summer"),this.render()}),d&&d.addEventListener("click",()=>this.send()),this.shadowRoot?.querySelectorAll(".menu-item").forEach(e=>{e.addEventListener("click",()=>{let t=Number(e.getAttribute("data-idx"));this._selectItem(i[t])})}),this.shadowRoot?.querySelectorAll(".model-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-model"),n=M.find(e=>e.key===t);n&&this._selectModel(n)})}),this.shadowRoot?.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();let n=Number(e.getAttribute("data-remove"));this._attachments.splice(n,1),this.render()})})}}"u">typeof customElements&&!customElements.get("nai-prompt-bar")&&customElements.define("nai-prompt-bar",Z);let A=[{key:"flavors",labelEn:"Flavors",labelZh:"风味"},{key:"suppliers",labelEn:"Suppliers",labelZh:"供应商"}];class R extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase="done",this._draft="",this._tab="flavors",this._submitted=""}onMount(){this._submitted=this.isZh?"对比薄荷巧克力与去年同期销量":"Compare mint chip to last summer"}setTab(e){this._tab=e,this.render()}send(){this._draft.trim()&&(this._submitted=this._draft.trim(),this._draft="",this._phase="sent",this.render(),this.registerTimeout(()=>{this._phase="reply1",this.render()},500),this.registerTimeout(()=>{this._phase="reply2",this.render()},1900),this.registerTimeout(()=>{this._phase="done",this.render()},3100))}render(){let e=this.isZh,t="idle"!==this._phase,n=this._draft.trim().length>0,s=(e,t,n,s,i,r=!1)=>`
      <div
        class="flex w-full flex-col gap-1.5 transition-all duration-400"
        style="
          opacity: ${r?.55:1};
          filter: ${r?"blur(0.5px)":"blur(0)"};
          transform: ${r?"scale(0.985)":"scale(1)"};
          transform-origin: top left;
          animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) both;
        "
      >
        <div class="flex items-center gap-1 text-[12px] leading-[1.3]">
          <span class="font-medium text-ink">${e}</span>
          <span class="text-ink-2">${t}</span>
          <span class="text-ink">${s} ${n}</span>
        </div>
        <p class="text-[13px] leading-normal text-ink">${i}</p>
      </div>
    `;this.setHtml(`
      <div class="flex h-[288px] w-full max-w-95 flex-col self-start overflow-hidden rounded-[14px] bg-surface shadow-card">
        
        <div class="flex shrink-0 items-center justify-between border-b border-line p-1.5">
          <div class="flex items-center">
            ${A.map(t=>`
              <button
                type="button"
                aria-pressed="${this._tab===t.key}"
                data-tab="${t.key}"
                class="tab-btn rounded-[6px] px-2 py-[3px] text-[13px] text-ink transition-colors duration-100 ${this._tab===t.key?"bg-field":"opacity-50 hover:opacity-75"}"
              >
                ${e?t.labelZh:t.labelEn}
              </button>
            `).join("")}
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              aria-label="${e?"添加":"Add"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="${e?"历史":"History"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="${e?"更多":"More"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="5" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.8" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </div>
        </div>

        
        <div class="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
          <div class="flex justify-end pl-14">
            <div
              class="rounded-xl bg-field px-3 py-1.5 text-[13px] leading-[1.4] text-ink transition-all duration-300"
              style="
                opacity: ${+!!t};
                transform: ${t?"translateY(0)":"translateY(10px)"};
              "
            >
              ${this._submitted}
            </div>
          </div>

          ${"reply1"===this._phase||"reply2"===this._phase||"done"===this._phase?s(e?"销售历史":"Sales History",e?"风味数据":"Flavor Data","4s",e?"用时":"for",e?"已调取近三年夏季薄荷巧克力的销售数据用于对比。":"Pulled 3 summers of mint chip sales for comparison."):""}

          ${"reply2"===this._phase||"done"===this._phase?s(e?"对比分析":"Comparison",e?"趋势识别":"Trend Detection","2s",e?"用时":"for",e?"薄荷巧克力销量上涨 12%，周末峰值更加明显。":"Mint chip is up 12% with stronger weekend peaks.","reply2"===this._phase):""}
        </div>

        
        <div class="mt-auto shrink-0 p-1.5">
          <div class="composer-box flex cursor-text flex-col gap-2 rounded-control border border-line bg-field p-2.5 transition-colors duration-150">
            <input
              type="text"
              value="${this._draft}"
              placeholder="${e?"输入指令，或用 @ 标记风味":"Prompt or tag a flavor with @"}"
              aria-label="${e?"聊天输入框":"Chat prompt"}"
              class="min-h-[18px] bg-transparent text-[13px] leading-[1.4] text-ink outline-none"
            />
            <div class="flex items-center justify-end">
              <button
                type="button"
                aria-label="${e?"发送":"Send"}"
                ${!n?"disabled":""}
                class="send-btn flex size-7 items-center justify-center rounded-[8px] transition-all duration-200"
                style="
                  background: ${n?"var(--ink)":"var(--line-strong)"};
                  color: ${n?"var(--surface)":"var(--ink-2)"};
                  cursor: ${n?"pointer":"default"};
                "
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>this.setTab(e.getAttribute("data-tab")))});let i=this.shadowRoot?.querySelector("input"),r=this.shadowRoot?.querySelector(".send-btn"),o=this.shadowRoot?.querySelector(".composer-box");i&&(i.addEventListener("input",e=>{this._draft=e.target.value;let t=this._draft.trim().length>0;r&&(r.style.background=t?"var(--ink)":"var(--line-strong)",r.style.color=t?"var(--surface)":"var(--ink-2)",r.style.cursor=t?"pointer":"default",t?r.removeAttribute("disabled"):r.setAttribute("disabled","true"))}),i.addEventListener("keydown",e=>{"Enter"===e.key&&this.send()})),r&&r.addEventListener("click",()=>this.send()),o&&i&&o.addEventListener("click",()=>i.focus())}}customElements.get("nai-chat")||customElements.define("nai-chat",R);let L=[[{t:"export async function ",c:"kw"},{t:"churnBatch",c:"fn"},{t:"() {",c:"dim"}],[{t:"  const ",c:"kw"},{t:"flavor = "},{t:"await ",c:"kw"},{t:"getFlavor",c:"fn"},{t:"(",c:"dim"},{t:'"pistachio"',c:"str"},{t:");",c:"dim"}],[{t:"  const ",c:"kw"},{t:"base = "},{t:"await ",c:"kw"},{t:"dairy."},{t:"fetch",c:"fn"},{t:"({ flavor });",c:"dim"}],[{t:"  await ",c:"kw"},{t:"freezer."},{t:"store",c:"fn"},{t:"(base, { temp: ",c:"dim"},{t:'"-14C"',c:"str"},{t:" });",c:"dim"}],[{t:"  return ",c:"kw"},{t:"base.gallons;"}],[{t:"}",c:"dim"}]],T={kw:"var(--accent-ink)",str:"var(--green)",num:"var(--orange)",fn:"var(--ink)",dim:"var(--ink-3)"},B=`export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`;class q extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._count=0,this._copied=!1}onMount(){this._count=0,this._tick()}_tick(){let e=this._count>=L.length;this.registerTimeout(()=>{this._count=this._count>=L.length?0:this._count+1,this.render(),this._tick()},0===this._count?400:e?3200:240)}copy(){navigator.clipboard?.writeText(B).then(()=>{this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)})}render(){let e=this.isZh,t=this._count>=L.length;this.setHtml(`
      <div class="w-full max-w-95 overflow-hidden rounded-card bg-surface shadow-card">
        
        <div class="flex items-center justify-between border-b border-line px-3.5 py-2">
          <span class="flex items-baseline gap-2">
            <span class="filename font-mono text-[12px] font-medium text-ink">churn.ts</span>
            <span class="text-[11.5px] text-ink-3">TypeScript</span>
          </span>
          <button
            type="button"
            aria-label="${e?"复制代码":"Copy code"}"
            class="copy-btn flex h-6 items-center gap-1 rounded-[6px] px-1.5 text-[11.5px] font-medium transition-colors duration-100 hover:bg-hover cursor-pointer ${this._copied?"text-green":"text-ink-2"}"
          >
            ${this._copied?`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                   <span>${e?"已复制":"Copied"}</span>`:`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                   <span>${e?"复制":"Copy"}</span>`}
          </button>
        </div>

        
        <pre class="overflow-x-auto p-3.5 font-mono text-[12.5px] leading-relaxed text-ink [tab-size:2]"><code>${L.slice(0,this._count).map((e,t)=>`
            <div class="flex items-baseline" style="animation: stream-in 300ms ease-out both;">
              <span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${t+1}</span>
              <span class="min-w-0 flex-1 whitespace-pre">${e.map(e=>`<span style="color: ${e.c?T[e.c]:"inherit"};">${e.t}</span>`).join("")}</span>
            </div>
          `).join("")}${!t?`<div class="flex items-baseline"><span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${this._count+1}</span><span class="inline-block h-3.5 w-1.5 bg-accent align-middle animate-pulse"></span></div>`:""}</code></pre>
      </div>
    `),this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click",()=>this.copy())}}"u">typeof customElements&&!customElements.get("nai-code-block")&&customElements.define("nai-code-block",q);let H=[{id:"report",name:"quarterly-report.pdf",kind:"pdf",size:"2.4 MB",state:"ready",progress:100},{id:"wireframe",name:"wireframe.png",kind:"image",size:"1.8 MB",state:"parsing",progress:42},{id:"interview",name:"interview.wav",kind:"audio",size:"18.7 MB",state:"indexing",progress:64},{id:"notes",name:"research-notes.pdf",kind:"pdf",size:"840 KB",state:"failed",progress:38}],I={uploading:{en:"Uploading",zh:"上传中",tone:"text-accent-ink",tint:"bg-accent"},parsing:{en:"Parsing",zh:"解析中",tone:"text-orange",tint:"bg-orange"},indexing:{en:"Indexing",zh:"索引中",tone:"text-accent-ink",tint:"bg-accent"},ready:{en:"Ready",zh:"已就绪",tone:"text-green",tint:"bg-green"},failed:{en:"Parse failed",zh:"解析失败",tone:"text-red",tint:"bg-red"}};class P extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._attachments=[...H]}retry(e){this._attachments=this._attachments.map(t=>t.id===e?{...t,state:"uploading",progress:0}:t),this.render()}remove(e){this._attachments=this._attachments.filter(t=>t.id!==e),this.render()}render(){let e=this.isZh;this.setHtml(`
      <section class="w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"附件队列":"Attachment queue"}
            </h3>
            <p class="mt-0.5 text-[11px] text-ink-3">
              ${e?"上传、解析并建立检索索引":"Upload, parse, and index for retrieval"}
            </p>
          </div>
          <span class="rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2">
            ${this._attachments.length} ${e?"个文件":"files"}
          </span>
        </div>

        <div class="divide-y divide-line">
          ${this._attachments.map(t=>{let n=I[t.state],s="uploading"===t.state||"parsing"===t.state||"indexing"===t.state,i="pdf"===t.kind?"PDF":"image"===t.kind?"IMG":"WAV";return`
              <div class="item flex gap-3 px-4 py-3 ${"failed"===t.state?"bg-red-tint/35":"bg-surface"}">
                <span class="flex h-8 w-9 shrink-0 items-center justify-center rounded-control border border-line bg-inset font-mono text-[9px] font-semibold text-ink-2">
                  ${i}
                </span>
                <div class="min-w-0 flex-1">
                  <div class="flex min-w-0 items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="truncate text-[12.5px] font-medium text-ink">${t.name}</p>
                      <p class="mt-0.5 font-mono text-[10px] text-ink-3">${t.size}</p>
                    </div>
                    <span class="shrink-0 text-[10.5px] font-medium ${n.tone}">
                      ${e?n.zh:n.en}
                    </span>
                  </div>

                  ${s?`
                    <div class="mt-2 flex items-center gap-2.5">
                      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-field">
                        <span
                          class="block h-full rounded-full transition-all duration-300 ${n.tint}"
                          style="width: ${t.progress}%;"
                        ></span>
                      </div>
                      <span class="w-7 text-right font-mono text-[10px] tabular-nums text-ink-3">
                        ${t.progress}%
                      </span>
                    </div>
                  `:""}

                  ${"ready"===t.state?`
                    <p class="mt-1.5 text-[10.5px] text-ink-3">
                      ${e?"12 个片段可用于上下文":"12 chunks ready for context"}
                    </p>
                  `:""}

                  ${"failed"===t.state?`
                    <div class="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        data-retry="${t.id}"
                        class="btn-retry rounded-control border border-line-strong bg-surface px-2 py-1 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer"
                      >
                        ${e?"重试":"Retry"}
                      </button>
                      <button
                        type="button"
                        data-remove="${t.id}"
                        class="rounded-control px-2 py-1 text-[10.5px] text-ink-3 transition-colors hover:bg-hover hover:text-red cursor-pointer"
                      >
                        ${e?"移除":"Remove"}
                      </button>
                    </div>
                  `:""}
                </div>
              </div>
            `}).join("")}
        </div>
      </section>
    `),this.shadowRoot?.querySelectorAll("[data-retry]").forEach(e=>{e.addEventListener("click",()=>this.retry(e.getAttribute("data-retry")))}),this.shadowRoot?.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>this.remove(e.getAttribute("data-remove")))})}}"u">typeof customElements&&!customElements.get("nai-attachment-queue")&&customElements.define("nai-attachment-queue",P);let N=[{id:"sub-1",nameEn:"Web Researcher",nameZh:"网络检索子 Agent",roleEn:"Information Retrieval",roleZh:"资料检索",model:"gemini-2.5-flash",status:"completed",duration:"1.8s",tokens:"1,420",actionEn:"Indexed 4 documentation pages & RFC specs",actionZh:"已解析 4 篇技术文档与 RFC 规范",logsEn:["query: 'Next.js 16 server action streaming rfc'","fetched: https://nextjs.org/docs/app/building-your-application","extracted: 4 key code samples & contract definitions","returned payload to coordinator"],logsZh:["查询: 'Next.js 16 server action streaming rfc'","抓取: https://nextjs.org/docs/app/building-your-application","提取: 4 段核心代码示例与契约定义","已将检索工件返回至主协调器"]},{id:"sub-2",nameEn:"Schema Architect",nameZh:"架构代码子 Agent",roleEn:"Code Generation",roleZh:"代码生成",model:"claude-3-7-sonnet",status:"running",duration:"3.4s",tokens:"3,890",actionEn:"Synthesizing Prisma schema with relational indexes...",actionZh:"正在合成带有关系索引的 Prisma 数据模型...",logsEn:["analyzed entities: User, Workspace, SubagentSession","drafted models & enum definitions","invoking tool: write_file('prisma/schema.prisma')"],logsZh:["分析实体关系: User, Workspace, SubagentSession","起草数据表与枚举类型定义","调用工具: write_file('prisma/schema.prisma')"]},{id:"sub-3",nameEn:"Security Linter",nameZh:"安全审计子 Agent",roleEn:"Vulnerability Audit",roleZh:"漏洞审计",model:"claude-3-5-haiku",status:"waiting",duration:"—",tokens:"0",actionEn:"Waiting for schema file generation...",actionZh:"等待数据架构文件生成完成...",logsEn:["queued: will scan for SQL injection & unindexed foreign keys"],logsZh:["已入队: 将扫描 SQL 注入风险与未索引的外键"]}];class O extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._expandedId="sub-2"}toggleExpand(e){this._expandedId=this._expandedId===e?null:e,this.render()}render(){let e=this.isZh,t=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Root Coordinator -->
        <div class="coordinator flex items-center justify-between rounded-control border border-line bg-inset p-3">
          <div class="flex items-center gap-2.5">
            <div class="relative flex size-6 items-center justify-center rounded-full bg-accent text-white shadow-sm">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[12.5px] font-semibold text-ink">
                  ${e?"主协调器 (Coordinator)":"Main Coordinator"}
                </span>
                <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[10px] text-accent-ink">
                  Claude 3.7
                </span>
              </div>
              <p class="text-[11px] text-ink-2">
                ${e?"正在调度 3 个并行子智能体工作":"Orchestrating 3 parallel subagent workers"}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 font-mono text-[11px] text-ink-3">
            <span class="flex size-1.5 rounded-full bg-green animate-pulse"></span>
            <span>${e?"运行中":"Active"}</span>
          </div>
        </div>

        <!-- Subagent Hierarchy -->
        <div class="relative mt-4 pl-6">
          <div class="absolute left-2.5 top-0 bottom-6 w-px bg-line-strong"></div>

          <div class="flex flex-col gap-3">
            ${N.map(t=>{let n=this._expandedId===t.id;return`
                <div class="relative">
                  <div class="absolute -left-3.5 top-4.5 h-px w-3.5 bg-line-strong"></div>

                  <div
                    data-id="${t.id}"
                    class="agent-card rounded-control border transition-all cursor-pointer ${n?"border-line-strong bg-hover/40 shadow-sm":"border-line bg-surface hover:border-line-strong hover:bg-hover/20"}"
                  >
                    <div class="flex items-center justify-between p-3">
                      <div class="flex items-center gap-2.5 min-w-0">
                        ${"completed"===t.status?`
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-green-tint text-green shrink-0">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        `:"running"===t.status?`
                          <span class="relative flex size-4.5 items-center justify-center rounded-full bg-accent-tint text-accent-ink shrink-0">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.5"
                              class="animate-spin"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                          </span>
                        `:"waiting"===t.status?`
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-field text-ink-3 shrink-0">
                            <span class="size-1 rounded-full bg-ink-3"></span>
                          </span>
                        `:`
                          <span class="flex size-4.5 items-center justify-center rounded-full bg-red-tint text-red shrink-0">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </span>
                        `}

                        <div class="min-w-0">
                          <div class="flex items-center gap-1.5">
                            <span class="text-[12px] font-medium text-ink truncate">
                              ${e?t.nameZh:t.nameEn}
                            </span>
                            <span class="rounded-chip border border-line bg-inset px-1 font-mono text-[9.5px] text-ink-3">
                              ${t.model}
                            </span>
                          </div>
                          <p class="text-[11px] text-ink-2 truncate max-w-[240px] mt-0.5">
                            ${e?t.actionZh:t.actionEn}
                          </p>
                        </div>
                      </div>

                      <div class="flex items-center gap-2 shrink-0 pl-2">
                        ${"—"!==t.duration?`
                          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
                            ${t.duration}
                          </span>
                        `:""}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class="text-ink-3 transition-transform ${n?"rotate-180":""}"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    ${n?`
                      <div class="border-t border-line/60 bg-inset/70 p-3 text-[11px]">
                        <div class="mb-2 flex items-center justify-between text-ink-3">
                          <span class="font-mono text-[10px] uppercase tracking-wider">
                            ${e?"执行追踪日志 (Trace)":"Execution Trace"}
                          </span>
                          ${"0"!==t.tokens?`
                            <span class="font-mono text-[10px] tabular-nums">
                              ${t.tokens} tokens
                            </span>
                          `:""}
                        </div>
                        <div class="flex flex-col gap-1 font-mono text-[10.5px] text-ink-2">
                          ${(e?t.logsZh:t.logsEn).map(e=>`
                            <div class="flex items-start gap-1.5">
                              <span class="text-ink-3 select-none">›</span>
                              <span class="break-all">${e}</span>
                            </div>
                          `).join("")}
                        </div>
                      </div>
                    `:""}
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `;this.setHtml(t),this.shadowRoot.querySelectorAll(".agent-card").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.toggleExpand(t)})})}}"u">typeof customElements&&!customElements.get("nai-subagent-tree")&&customElements.define("nai-subagent-tree",O);let D=[{id:"lead",name:"lead",roleEn:"Coordinator",roleZh:"协调者",provider:"deepseek",model:"reasoner"},{id:"scout",name:"scout",roleEn:"Research",roleZh:"调研",provider:"deepseek",model:"chat"},{id:"forge",name:"forge",roleEn:"Implementer",roleZh:"实现",provider:"anthropic",model:"sonnet"},{id:"audit",name:"audit",roleEn:"Reviewer",roleZh:"评审",provider:"openai",model:"gpt-5"}],F=[{id:"t1",titleEn:"Map provider rate limits",titleZh:"梳理提供方速率限制",assignee:"scout",dependsOn:[],scopes:["docs/limits.md"]},{id:"t2",titleEn:"Implement retry backoff",titleZh:"实现指数退避重试",assignee:"forge",dependsOn:["t1"],scopes:["src/llm/retry.cs"]},{id:"t3",titleEn:"Add backoff unit tests",titleZh:"补退避策略单元测试",assignee:"forge",dependsOn:["t2"],scopes:["tests/retry.cs"]},{id:"t4",titleEn:"Review & sign off",titleZh:"评审并签收",assignee:"audit",dependsOn:["t2","t3"],scopes:[]}],V={lead:["active","active","active","active","active"],scout:["active","active","active","active","active"],forge:["provisioning","active","active","active","active"],audit:["provisioning","provisioning","active","active","active"]},W=[["in_progress","pending","pending","pending"],["completed","in_progress","pending","pending"],["completed","completed","in_progress","pending"],["completed","completed","completed","in_progress"],["completed","completed","completed","completed"]];class U extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._tick=0}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=this._tick>=V.lead.length-1;this.registerTimeout(()=>{this._tick=e?0:this._tick+1,this.render(),this._scheduleNext()},e?4200:2100)}render(){let e=this.isZh,t=this._tick,n=D.filter(e=>"active"===V[e.id][t]).length,s=W[t].filter(e=>"completed"===e).length,i=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-accent animate-pulse"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"智能体团队":"Agent Team"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              team/provider-migration
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${s}/${F.length} ${e?"任务":"tasks"}
          </span>
        </div>

        <!-- Roster -->
        <div class="grid grid-cols-2 gap-1.5">
          ${D.map(n=>{let s=V[n.id][t],i="lead"===n.id;return`
              <div
                class="member-card flex items-center justify-between gap-2 rounded-control border px-2.5 py-2 transition-colors duration-300 ${i?"border-line-strong bg-inset":"border-line bg-surface"}"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${i?"bg-ink text-canvas":"bg-field text-ink-2"}"
                  >
                    ${n.name.slice(0,2)}
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1">
                      <span class="truncate font-mono text-[11px] font-medium text-ink">${n.name}</span>
                      <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">${n.model}</span>
                    </div>
                    <span class="block truncate text-[10px] text-ink-3">
                      ${e?n.roleZh:n.roleEn} \xb7 ${n.provider}
                    </span>
                  </div>
                </div>
                ${"active"===s?`
          <span class="flex items-center gap-1 rounded-chip bg-green-tint px-1.5 py-px text-[10px] font-medium text-green">
            <span class="size-1 rounded-full bg-green"></span>
            ${e?"已激活":"active"}
          </span>
        `:"provisioning"===s?`
          <span class="flex items-center gap-1 rounded-chip bg-orange-tint px-1.5 py-px text-[10px] font-medium text-orange">
            <span class="size-1 rounded-full bg-orange animate-pulse"></span>
            ${e?"供给中":"provisioning"}
          </span>
        `:`
        <span class="flex items-center gap-1 rounded-chip bg-red-tint px-1.5 py-px text-[10px] font-medium text-red">
          <span class="size-1 rounded-full bg-red"></span>
          ${e?"失败":"failed"}
        </span>
      `}
              </div>
            `}).join("")}
        </div>

        <!-- Shared task DAG -->
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between px-0.5">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${e?"共享任务 DAG":"Shared task DAG"}
            </span>
            <span class="font-mono text-[9.5px] text-ink-3">CAS revisions</span>
          </div>
          <div class="flex flex-col gap-1.5">
            ${F.map((n,s)=>{let i,r=W[t][s],o=n.dependsOn.some(e=>{let n=F.findIndex(t=>t.id===e);return"completed"!==W[t][n]}),a=(i=n.assignee,D.find(e=>e.id===i)),l=1+W.slice(0,t+1).filter(e=>e[s]!==W[0][s]).length;return`
                <div
                  class="task-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${"in_progress"===r?"border-accent/40 bg-accent-tint/30":"completed"===r?"border-line bg-surface opacity-75":"border-line bg-surface"}"
                  style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"
                >
                  ${"completed"===r?`
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-tint text-green">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        `:"in_progress"===r?`
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent-tint">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink)" stroke-width="2.6" class="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round" />
            </svg>
          </span>
        `:`
        <span class="flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-strong bg-surface"></span>
      `}
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5">
                      <span class="truncate text-[11.5px] font-medium ${"completed"===r?"text-ink-2 line-through decoration-line-strong":"text-ink"}">
                        ${e?n.titleZh:n.titleEn}
                      </span>
                      <span class="shrink-0 rounded-chip bg-field px-1 font-mono text-[9px] tabular-nums text-ink-3">
                        r${l}
                      </span>
                    </div>
                    <div class="mt-0.5 flex items-center gap-2 text-[10px] text-ink-3">
                      ${a?`<span class="font-mono">@${a.name}</span>`:""}
                      ${n.dependsOn.length>0?`<span class="font-mono">deps: ${n.dependsOn.join(", ")}</span>`:""}
                      ${n.scopes.map(e=>`
                        <span class="truncate font-mono rounded-chip bg-inset px-1 border border-line/60">
                          ${e}
                        </span>
                      `).join("")}
                      ${o&&"pending"===r?`<span class="text-orange">${e?"被阻塞":"blocked"}</span>`:""}
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${e?`${n}/4 成员已激活 \xb7 事件溯源名册`:`${n}/4 members active \xb7 event-sourced roster`}
          </span>
          <span class="font-mono">Harness.AgentTeams</span>
        </div>
      </div>
    `;this.setHtml(i)}}"u">typeof customElements&&!customElements.get("nai-agent-teams")&&customElements.define("nai-agent-teams",U);let K=[600,900,2400,1400,2400,600],G='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>';class J extends l{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._tick=0,this._manualOpen={}}get variant(){return this.getAttribute("variant")||"Capsules"}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){!this.autoPlay||this._tick>=K.length-1||this.registerTimeout(()=>{this._tick=this._tick+1,this.render(),this._scheduleNext()},K[this._tick])}toggleRow(e){let t="index"===e&&2===this._tick,n=this._manualOpen[e]??t;this._manualOpen[e]=!n,this.render()}render(){let e=this.isZh,t=this._tick,n="List"===this.variant,s=t<3?"pending":3===t?"failed":"done",i=(e,t)=>{let n=2*Math.PI*11;return`
        <span class="relative inline-flex shrink-0 items-center justify-center" style="width: 24px; height: 24px;">
          <svg
            width="24" height="24" class="absolute inset-0"
            style="${e?"animation: spin 1.1s linear infinite;":""}"
          >
            <circle cx="12" cy="12" r="11" fill="none" stroke="var(--line)" stroke-width="2" />
            ${e?`<circle cx="12" cy="12" r="11" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-dasharray="${.28*n} ${.72*n}" />`:""}
          </svg>
          <span class="relative text-[10.5px] font-semibold tabular-nums text-ink">${t}</span>
        </span>
      `},r=(e,t)=>`
      <span
        class="flex size-5.5 shrink-0 items-center justify-center rounded-full text-white ${"red"===e?"bg-red":"bg-green"}"
        style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;"
      >
        ${t}
      </span>
    `,o=[{key:"verify",badgeHtml:r("green",G),label:e?"校验供应商资质档案":"Verified vendor records",amount:e?"12 家供应商":"12 suppliers",pillHtml:`
          <span class="inline-flex h-5.5 items-center rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green">
            ${e?"已完成":"Completed"}
          </span>
        `,details:[{label:e?"核对税务与联系人 ID":"Matched tax and contact IDs",meta:"12/12"},{label:e?"标记过期记录":"Flagged stale records",meta:"0"}]},{key:"index",badgeHtml:i(!0,"2"),label:e?"生成自动补货计划清单":"Build reorder task list",amount:e?"7 款 SKU":"7 SKUs",pillHtml:null,details:[{label:e?"读取 POS 导出数据":"Reading POS export",meta:e?"3 个文件":"3 files"},{label:e?"评估缺货断货风险":"Scoring stockout risk",meta:"68%"}]},{key:"draft",badgeHtml:"pending"===s?i(!1,"3"):"failed"===s?r("red",'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>'):r("green",G),label:e?"起草供应商跟进邮件":"Draft supplier emails",amount:e?"2 封草稿":"2 messages",pillHtml:"failed"===s?`
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-red-tint px-2 text-[11.5px] font-medium text-red" style="animation: fade-in 200ms ease-out both">
            ${e?"失败重试中":"Failed"} <span style="animation: spin 1.2s linear infinite" class="flex"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg></span>
          </span>
        `:"done"===s?`
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green" style="animation: fade-in 200ms ease-out both">
            ${e?"已完成":"Completed"}
          </span>
        `:null,details:[{label:e?"脆筒供应商跟进通知":"Cone supplier follow-up",meta:e?"草稿":"draft"},{label:e?"开心果原料补货备注":"Pistachio reorder note",meta:e?"草稿":"draft"}]}],a=`
      <div
        class="flex w-full max-w-110 flex-col ${n?"gap-0 self-start overflow-hidden rounded-card bg-surface shadow-card":"min-h-[196px] gap-2"}"
      >
        ${o.map((e,s)=>{let i=this._manualOpen[e.key]??("index"===e.key&&2===t);return`
              <div
                class="self-stretch overflow-hidden transition-[border-radius] duration-300 ${n?"border-b border-line last:border-0":"bg-surface shadow-card"}"
                style="border-radius: ${n?0:i?14:22}px; animation: fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${80*s}ms both;"
              >
                <button
                  type="button"
                  aria-expanded="${i}"
                  data-key="${e.key}"
                  class="row-btn flex h-11 w-full items-center gap-2.5 px-2.5 text-left transition-colors duration-100 hover:bg-hover cursor-pointer"
                >
                  ${e.badgeHtml}
                  <span class="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">
                    ${e.label}
                  </span>
                  <span class="shrink-0 text-[12px] text-ink-3">
                    ${e.amount}
                  </span>
                  ${e.pillHtml||""}
                </button>

                <!-- details dropdown -->
                ${i?`
                  <div class="details-box border-t border-line/60 bg-inset/50 px-3 py-2 text-[11.5px] space-y-1">
                    ${e.details.map(e=>`
                      <div class="flex items-center justify-between text-ink-2">
                        <span>${e.label}</span>
                        <span class="font-mono text-[10.5px] text-ink-3">${e.meta}</span>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            `}).join("")}
      </div>
    `;this.setHtml(a),this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-task-rows")&&customElements.define("nai-task-rows",J);let Q={think:'<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />',write:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>',run:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>',read:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>'},Y=[{icon:"think",labelEn:"Thinking",labelZh:"深度思考",chipEn:"Planning the churn schedule…",chipZh:"正在规划搅拌排期…",mono:!1,detailMono:!1,detail:[{textEn:"Weekend demand carries pistachio, so it churns first.",textZh:"周末需求以开心果口味为主，优先安排搅拌。"},{textEn:"Batch capacity leaves two evening freezer windows.",textZh:"批次产能还留出两个晚间冷冻空档。"}]},{icon:"write",labelEn:"Write 204 lines",labelZh:"写入 204 行",chipEn:"ChurnSchedule.tsx",mono:!0,detailMono:!0,detail:[{textEn:"+ const windows = slots.filter((s) => s.temp <= -12)",tone:"add"},{textEn:'+ return schedule(windows, { hero: "pistachio" })',tone:"add"}]},{icon:"run",labelEn:"Rebuild and verify",labelZh:"重新构建并验证",chipEn:"npm run freeze",mono:!0,detailMono:!0,detail:[{textEn:"✓ built in 1.2s",textZh:"✓ 构建完成，耗时 1.2s"},{textEn:"✓ 34 checks passed",textZh:"✓ 34 项检查通过"}]},{icon:"read",labelEn:"Read image",labelZh:"读取图片",chipEn:"flavor-chart.png",mono:!0,detailMono:!1,detail:[{textEn:"1280 × 720 · line chart, three summers.",textZh:"1280 × 720 · 折线图，横跨三个夏季。"},{textEn:"Mint chip trends up 12% through July.",textZh:"薄荷巧克力口味到 7 月上涨 12%。"}]}],X=[{file:"flavors.css",add:13,del:0},{file:"ChurnSchedule.tsx",add:74,del:41},{file:"menu.ts",add:8,del:2}];class ee extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._step=0,this._open=!0,this._openRows=new Set}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._step=Y.length+1;return}this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=Y.length+1;this._step>=e||this.registerTimeout(()=>{this._step=this._step+1,this.render(),this._scheduleNext()},700)}toggleRun(){this._open=!this._open,this.render()}toggleRow(e){this._openRows.has(e)?this._openRows.delete(e):this._openRows.add(e),this.render()}render(){let e=this.isZh,t=this._step,n=this._open,s=Y.length+1,i=`
      <div class="min-h-[220px] w-full max-w-80 pb-1">
        <!-- collapsed run header -->
        <button
          type="button"
          aria-expanded="${n}"
          class="header-btn -mx-1.5 flex w-fit items-center gap-1.5 rounded-control px-1.5 py-1 text-[12.5px] text-ink-2 transition-colors duration-100 hover:bg-hover-2 cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-200"
            style="transform: ${n?"rotate(0deg)":"rotate(-90deg)"};"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span class="tabular-nums">${e?"4 次工具调用，2 条消息":"4 tool calls, 2 messages"}</span>
        </button>

        <!-- tool call rows -->
        <div
          class="grid transition-[grid-template-rows,opacity] duration-300"
          style="grid-template-rows: ${n?"1fr":"0fr"}; opacity: ${+!!n};"
        >
          <div class="-mx-1 overflow-hidden px-1.5 pb-1">
            <div class="mt-1.5 flex flex-col gap-1">
              ${Y.slice(0,t).map(t=>{let n=this._openRows.has(t.labelEn);return`
                    <div style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
                      <button
                        type="button"
                        aria-expanded="${n}"
                        data-label="${t.labelEn}"
                        class="row-btn group/row -mx-[3px] flex h-7 w-[calc(100%+6px)] min-w-0 items-center gap-2 rounded-control px-[3px] text-left transition-colors duration-100 hover:bg-hover-2 cursor-pointer"
                      >
                        <span class="relative flex size-4 shrink-0 items-center justify-center text-ink-3">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="${"think"===t.icon?"currentColor":"none"}"
                            stroke="currentColor"
                            class="transition-opacity duration-100 group-hover/row:opacity-0 ${n?"opacity-0":""}"
                          >
                            ${Q[t.icon]}
                          </svg>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="absolute transition-[opacity,transform] duration-150 group-hover/row:opacity-100 ${n?"opacity-100":"opacity-0"}"
                            style="transform: ${n?"rotate(0deg)":"rotate(-90deg)"};"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                        <span class="shrink-0 text-[12.5px] font-medium text-ink">${e?t.labelZh:t.labelEn}</span>
                        <span
                          class="inline-flex h-5.5 min-w-0 flex-1 cursor-pointer items-center truncate rounded-chip bg-hover-2 px-1.5
                            text-[11.5px] text-ink-2 shadow-hairline transition-colors duration-100 hover:bg-line-strong
                            dark:bg-field dark:hover:bg-hover
                            ${t.mono?"font-mono":""}"
                        >
                          ${e?t.chipZh??t.chipEn:t.chipEn}
                        </span>
                      </button>

                      <!-- expanded detail -->
                      <div
                        class="grid transition-[grid-template-rows,opacity] duration-300"
                        style="grid-template-rows: ${n?"1fr":"0fr"}; opacity: ${+!!n}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                      >
                        <div class="min-h-0 overflow-hidden">
                          <div class="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-line py-0.5 pl-3.5">
                            ${t.detail.map(n=>`
                              <span
                                class="truncate text-[11.5px] leading-[1.6] ${t.detailMono?"font-mono":""} ${"add"===n.tone?"text-green":"text-ink-2"}"
                              >
                                ${e?n.textZh??n.textEn:n.textEn}
                              </span>
                            `).join("")}
                          </div>
                        </div>
                      </div>
                    </div>
                  `}).join("")}
            </div>

            <!-- file-diff chips -->
            ${t>=s?`
              <div class="mt-2.5 flex max-w-full flex-wrap gap-1.5 border-t border-line pt-2.5">
                ${X.map((e,t)=>`
                  <span
                    class="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-chip
                      bg-surface px-2 font-mono text-[11.5px] text-ink shadow-btn
                      transition-colors duration-100 hover:bg-hover"
                    style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) ${80*t}ms both;"
                  >
                    <span class="min-w-0 truncate">${e.file}</span>
                    <span class="shrink-0 text-green tabular-nums">+${e.add}</span>
                    ${e.del>0?`<span class="shrink-0 text-red tabular-nums">−${e.del}</span>`:""}
                  </span>
                `).join("")}
                <button
                  type="button"
                  class="inline-flex h-7 items-center rounded-chip px-1.5 font-mono text-[11.5px] text-ink-3
                    underline decoration-transparent underline-offset-2 transition-colors duration-100
                    hover:text-ink-2 hover:decoration-current cursor-pointer"
                  style="animation: fade-in 300ms ease-out ${80*X.length}ms both;"
                >
                  ${e?"+ 还有 2 项":"+2 more"}
                </button>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `;this.setHtml(i),this.shadowRoot.querySelector(".header-btn")?.addEventListener("click",()=>this.toggleRun()),this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-label");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-tool-chips")&&customElements.define("nai-tool-chips",ee);let et=[{id:"soft",titleEn:"Soft Token Migration",titleZh:"平滑双轨迁移 (推荐)",descEn:"Maintain backward compatibility for v1 JWTs until expiration (7 days).",descZh:"在旧版 JWT 过期（7天）前保持向后兼容，用户无感知过渡。",recommended:!0,tagEn:"Recommended",tagZh:"推荐"},{id:"dual",titleEn:"Dual-Format Verification",titleZh:"双签名格式校验",descEn:"Verify both RSA256 and EdDSA key signatures concurrently at the gateway.",descZh:"在 API 网关同时验证 RSA256 与 EdDSA 密钥签名，保障零停机。",tagEn:"Zero Downtime",tagZh:"零停机"},{id:"revoke",titleEn:"Immediate Session Revocation",titleZh:"立即重置所有会话",descEn:"Flush Redis token store and force all active users to re-authenticate.",descZh:"立即清空 Redis 缓存并强制所有在线用户重新登录认证。",tagEn:"High Security",tagZh:"最高安全性"}];class en extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedId="soft",this._customText="",this._isSubmitted=!1}selectOption(e){this._selectedId=e,this.render()}submit(){this._isSubmitted=!0,this.render()}reset(){this._isSubmitted=!1,this._selectedId="soft",this._customText="",this.render()}render(){let e=this.isZh,t=this._isSubmitted,n=this._selectedId,s=this._customText,i="";if("custom"===n)i=s||(e?"自定义指令":"Custom Instruction");else{let t=et.find(e=>e.id===n);i=t?e?t.titleZh:t.titleEn:""}let r=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card transition-all">
        <!-- Header -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-orange-tint text-orange">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <h4 class="text-[13px] font-semibold text-ink">
                ${e?"需要架构决策澄清":"Clarification Required"}
              </h4>
              <span class="text-[11px] text-ink-3">
                ${e?"架构决策 #4":"Architectural Decision #4"}
              </span>
            </div>
          </div>

          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-2">
            ${e?"第 2 步，共 5 步":"Step 2 of 5"}
          </span>
        </div>

        <!-- Main Question & Context -->
        <p class="mt-3 text-[12.5px] leading-relaxed text-ink">
          ${e?"检测到 Redis 中存有历史活跃会话。在执行认证架构迁移时，您希望如何处理这些存量会话？":"We detected existing session stores in Redis. How would you like the authentication migration to handle active sessions?"}
        </p>

        <!-- Success / Submitted State -->
        ${t?`
          <div class="mt-4 flex flex-col items-center justify-center rounded-control border border-green/30 bg-green-tint p-4 text-center">
            <div class="flex size-7 items-center justify-center rounded-full bg-green text-white mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span class="text-[12.5px] font-medium text-green">
              ${e?"决策已确认：":"Decision Recorded: "}
              ${i}
            </span>
            <p class="mt-1 text-[11px] text-ink-2">
              ${e?"智能体已根据所选策略恢复自动执行。":"Agent execution resumed with selected migration policy."}
            </p>
            <button
              type="button"
              id="reset-btn"
              class="mt-3 text-[11px] text-ink-3 underline hover:text-ink cursor-pointer"
            >
              ${e?"修改决策":"Change decision"}
            </button>
          </div>
        `:`
          <!-- Selectable Options -->
          <div class="mt-3.5 flex flex-col gap-2">
            ${et.map(t=>{let s=n===t.id;return`
                <label
                  data-id="${t.id}"
                  class="option-label option-item flex items-start gap-3 rounded-control border p-3 transition-all cursor-pointer ${s?"border-accent bg-accent-tint/30 shadow-sm":"border-line bg-surface hover:border-line-strong hover:bg-hover/40"}"
                >
                  <input
                    type="radio"
                    name="clarification-choice"
                    ${s?"checked":""}
                    class="mt-0.5 size-3.5 accent-accent"
                  />
                  <div class="flex flex-col min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <span class="text-[12px] font-medium text-ink">
                        ${e?t.titleZh:t.titleEn}
                      </span>
                      ${t.tagZh||t.tagEn?`
                        <span
                          class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${t.recommended?"bg-accent-tint text-accent-ink":"bg-field text-ink-2"}"
                        >
                          ${e?t.tagZh:t.tagEn}
                        </span>
                      `:""}
                    </div>
                    <span class="mt-0.5 text-[11px] text-ink-2 leading-normal">
                      ${e?t.descZh:t.descEn}
                    </span>
                  </div>
                </label>
              `}).join("")}
          </div>

          <!-- Custom Instruction Input -->
          <div class="mt-3">
            <input
              type="text"
              placeholder="${e?"或直接输入自定义迁移要求...":"Or provide custom migration rules..."}"
              value="${s}"
              class="custom-input w-full rounded-control border border-line bg-field px-3 py-2 text-[12px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex items-center justify-between border-t border-line pt-3">
            <button
              type="button"
              id="skip-btn"
              class="text-[11.5px] text-ink-3 hover:text-ink transition-colors cursor-pointer"
            >
              ${e?"跳过 (采纳推荐)":"Skip (Use Recommended)"}
            </button>
            <button
              type="button"
              id="submit-btn"
              class="flex items-center gap-1.5 rounded-control bg-accent px-3.5 py-1.5 text-[12px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>${e?"确认并继续":"Confirm & Proceed"}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        `}
      </div>
    `;if(this.setHtml(r),t)this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click",()=>this.reset());else{this.shadowRoot.querySelectorAll(".option-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.selectOption(t)})});let e=this.shadowRoot.querySelector(".custom-input");e?.addEventListener("input",e=>{this._customText=e.target.value,e.target.value&&(this._selectedId="custom")}),this.shadowRoot.querySelector("#skip-btn")?.addEventListener("click",()=>{this._selectedId="soft",this.submit()}),this.shadowRoot.querySelector("#submit-btn")?.addEventListener("click",()=>{this.submit()})}}}"u">typeof customElements&&!customElements.get("nai-clarification-card")&&customElements.define("nai-clarification-card",en);let es=[{model:"GPT-5.2",time:"10:41",answerEn:"Start with retrieval failures: 38% of missed answers share the same stale index.",answerZh:"先排查检索失败：38% 的漏答都指向同一个过期索引。"},{model:"Claude Sonnet 4.6",time:"10:42",answerEn:"The strongest signal is latency. Re-index before changing prompts.",answerZh:"最强信号是延迟。先重建索引，再考虑调整提示词。"},{model:"Gemini 3.1 Pro",time:"10:43",answerEn:"Compare a fresh-index cohort while keeping the prompt unchanged.",answerZh:"对比新索引样本，并保持提示词不变。"}];class ei extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._branchIndex=1,this._continuingFrom=null}navigate(e){e<0||e>=es.length||(this._branchIndex=e,this._continuingFrom=null,this.render())}continueFromCurrent(){this._continuingFrom=this._branchIndex,this.render()}render(){let e=this.isZh,t=this._branchIndex,n=es[t],s=this._continuingFrom,i=`
      <section
        aria-labelledby="message-branches-title"
        class="w-full max-w-lg overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        <header class="flex items-start justify-between gap-4 border-b border-line bg-inset px-4 py-3">
          <div>
            <h3
              id="message-branches-title"
              class="text-[13px] font-semibold text-ink"
            >
              ${e?"回答分支":"Answer branches"}
            </h3>
            <p class="mt-0.5 text-[11px] text-ink-3">
              ${e?"比较重新生成的回答":"Compare regenerated responses"}
            </p>
          </div>
          <span class="rounded-chip border border-line bg-surface px-2 py-1 font-mono text-[10px] tabular-nums text-ink-2">
            ${t+1} / ${es.length}
          </span>
        </header>

        <div class="px-4 py-4">
          <div class="flex items-center gap-2 text-[10.5px] text-ink-3">
            <span class="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true"></span>
            <span class="font-medium text-ink-2">
              ${n.model} \xb7 ${n.time}
            </span>
          </div>

          <p
            aria-live="polite"
            class="mt-3 min-h-16 text-[13px] leading-6 text-ink"
          >
            ${e?n.answerZh:n.answerEn}
          </p>

          <div class="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <div class="flex items-center gap-1.5">
              <button
                type="button"
                id="btn-prev"
                aria-label="${e?"上一个分支":"Previous branch"}"
                ${0===t?"disabled":""}
                class="flex h-7 w-8 items-center justify-center rounded-control border border-line bg-surface text-sm text-ink-2 shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none cursor-pointer"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                id="btn-next"
                aria-label="${e?"下一个分支":"Next branch"}"
                ${t===es.length-1?"disabled":""}
                class="flex h-7 w-8 items-center justify-center rounded-control border border-line bg-surface text-sm text-ink-2 shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-35 motion-reduce:transition-none cursor-pointer"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <button
              type="button"
              id="btn-continue"
              aria-label="${e?"从此分支继续":"Continue from this branch"}"
              class="rounded-control bg-ink px-3 py-1.5 text-[10.5px] font-medium text-surface transition-opacity hover:opacity-85 motion-reduce:transition-none cursor-pointer"
            >
              ${e?"从此分支继续":"Continue from here"}
            </button>
          </div>

          <p
            role="status"
            aria-live="polite"
            class="mt-2 min-h-4 text-right text-[10.5px] font-medium text-accent-ink"
          >
            ${null===s?"":e?`正从分支 ${s+1} 继续`:`Continuing from branch ${s+1}`}
          </p>
        </div>
      </section>
    `;this.setHtml(i),this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click",()=>this.navigate(this._branchIndex-1)),this.shadowRoot.querySelector("#btn-next")?.addEventListener("click",()=>this.navigate(this._branchIndex+1)),this.shadowRoot.querySelector("#btn-continue")?.addEventListener("click",()=>this.continueFromCurrent())}}"u">typeof customElements&&!customElements.get("nai-message-branches")&&customElements.define("nai-message-branches",ei);let er=[{id:"system",labelEn:"System & Directives",labelZh:"系统指令与安全约束",tokens:4200,color:"var(--accent)",badgeColor:"bg-accent-tint text-accent-ink",descEn:"Base system instructions, developer constraints, and safety guidelines.",descZh:"基础系统提示词、开发者约束与安全合规守则。"},{id:"rag",labelEn:"RAG & Retrieved Docs",labelZh:"RAG 检索增强知识",tokens:28400,color:"var(--green)",badgeColor:"bg-green-tint text-green",descEn:"12 code chunks and 3 architectural design docs injected via semantic search.",descZh:"语义搜索注入的 12 个代码切片与 3 份架构设计文档。"},{id:"history",labelEn:"Conversation History",labelZh:"会话上下文历史",tokens:16850,color:"var(--orange)",badgeColor:"bg-orange-tint text-orange",descEn:"14 previous conversation turns including user prompts and code diffs.",descZh:"前 14 轮对话交互，包含用户指令与代码差异记录。"},{id:"tools",labelEn:"Tool Outputs & Traces",labelZh:"工具调用输出与追踪",tokens:9350,color:"var(--ink-2)",badgeColor:"bg-hover-2 text-ink-2",descEn:"Terminal stdout, ripgrep search results, and linter diagnostics.",descZh:"终端标准输出、ripgrep 搜索结果与 linter 诊断信息。"}];class eo extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._segments=JSON.parse(JSON.stringify(er)),this._activeSegmentId=null,this._isPruned=!1}handlePruneHistory(){this._isPruned?(this._segments=JSON.parse(JSON.stringify(er)),this._isPruned=!1):(this._segments=this._segments.map(e=>"history"===e.id?{...e,tokens:Math.round(.45*e.tokens)}:"tools"===e.id?{...e,tokens:Math.round(.3*e.tokens)}:e),this._isPruned=!0),this.render()}setActiveSegment(e){this._activeSegmentId=e,this.render()}render(){let e=this.isZh,t=this._segments,n=this._activeSegmentId,s=this._isPruned,i=t.reduce((e,t)=>e+t.tokens,0),r=(i/128e3*100).toFixed(1),o=(i/1e6*3).toFixed(4),a=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-green"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"上下文窗口计量":"Context Window"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2">
              ${e?"128k 容量":"128k context"}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-mono text-[11px] tabular-nums text-ink-2">
              $${o} ${e?"预估成本":"est."}
            </span>
            <button
              type="button"
              id="btn-prune"
              class="flex items-center gap-1 rounded-control border border-line bg-field px-2 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              ${s?e?"恢复完整上下文":"Restore Context":e?"精简历史":"Prune History"}
            </button>
          </div>
        </div>

        <!-- Progress Metric Bar -->
        <div class="mt-1">
          <div class="flex items-baseline justify-between text-[11.5px]">
            <span class="font-mono tabular-nums text-ink">
              ${i.toLocaleString()}{" "}
              <span class="text-ink-3">/ ${128e3.toLocaleString()} tokens</span>
            </span>
            <span class="font-mono font-medium tabular-nums text-ink-2">
              ${r}% ${e?"已占用":"capacity"}
            </span>
          </div>

          <!-- Segmented Bar -->
          <div class="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-field p-0.5">
            ${t.map(e=>{let t=e.tokens/128e3*100,s=n===e.id;return`
                  <div
                    data-id="${e.id}"
                    class="segment-bar h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 cursor-pointer"
                    style="
                      width: ${t}%;
                      background-color: ${e.color};
                      opacity: ${n&&!s?.45:1};
                      transform: ${s?"scaleY(1.2)":"scaleY(1)"};
                    "
                  ></div>
                `}).join("")}
          </div>
        </div>

        <!-- Segment Breakdown Rows -->
        <div class="mt-4 flex flex-col divide-y divide-line/60">
          ${t.map(t=>{let s=n===t.id,r=(t.tokens/i*100).toFixed(0);return`
                <div
                  data-id="${t.id}"
                  class="segment-row flex items-center justify-between py-2.5 px-2 -mx-2 rounded-control transition-colors cursor-pointer ${s?"bg-hover":"hover:bg-hover/60"}"
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span
                      class="size-2 rounded-full shrink-0"
                      style="background-color: ${t.color};"
                    ></span>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="text-[12px] font-medium text-ink truncate">
                          ${e?t.labelZh:t.labelEn}
                        </span>
                        <span class="rounded-chip px-1.5 py-0.2 font-mono text-[10px] ${t.badgeColor}">
                          ${r}%
                        </span>
                      </div>
                      <span class="text-[11px] text-ink-3 truncate max-w-[260px]">
                        ${e?t.descZh:t.descEn}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0 pl-2">
                    <span class="font-mono text-[11.5px] tabular-nums font-medium text-ink">
                      ${t.tokens.toLocaleString()}
                    </span>
                    <span class="font-mono text-[10px] text-ink-3">tokens</span>
                  </div>
                </div>
              `}).join("")}
        </div>

        <!-- Footer Info -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"自动压缩阈值: 85%":"Auto-compaction threshold: 85%"}</span>
          <span class="font-mono">Claude 3.7 Sonnet</span>
        </div>
      </div>
    `;this.setHtml(a),this.shadowRoot.querySelector("#btn-prune")?.addEventListener("click",()=>this.handlePruneHistory()),this.shadowRoot.querySelectorAll(".segment-bar, .segment-row").forEach(e=>{e.addEventListener("mouseenter",()=>{let t=e.getAttribute("data-id");t&&this.setActiveSegment(t)}),e.addEventListener("mouseleave",()=>{this.setActiveSegment(null)})})}}"u">typeof customElements&&!customElements.get("nai-context-window")&&customElements.define("nai-context-window",eo);let ea=[{id:"mem-1",category:"preference",textEn:"Prefers functional React 19 components with Tailwind v4 and CSS variables.",textZh:"偏好使用 React 19 函数式组件、Tailwind v4 及原生 CSS 变量设计系统。",confidence:98,updatedAtEn:"2h ago",updatedAtZh:"2小时前",pinned:!0},{id:"mem-2",category:"rule",textEn:"Never print raw database connection strings or JWT secret keys to logs.",textZh:"严禁在控制台或日志中打印未经脱敏的数据库连接串或 JWT 密钥。",confidence:99,updatedAtEn:"Yesterday",updatedAtZh:"昨天",pinned:!0},{id:"mem-3",category:"preference",textEn:"Favors hairline elevation borders (1px) over saturated drop shadows.",textZh:"倾向使用 1px 发丝边框质感替代浓重饱和的投影阴影（Kumo 极简风）。",confidence:94,updatedAtEn:"3d ago",updatedAtZh:"3天前"},{id:"mem-4",category:"fact",textEn:"Project uses Turborepo monorepo structure with apps/web and packages/ui.",textZh:"项目采用 Turborepo Monorepo 架构，核心源码位于 apps/web 与 packages/ui。",confidence:88,updatedAtEn:"5d ago",updatedAtZh:"5天前"}];class el extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._memories=JSON.parse(JSON.stringify(ea)),this._filter="all",this._query=""}setFilter(e){this._filter=e,this.render()}setQuery(e){this._query=e,this.render()}handleDelete(e){this._memories=this._memories.filter(t=>t.id!==e),this.render()}handleTogglePin(e){this._memories=this._memories.map(t=>t.id===e?{...t,pinned:!t.pinned}:t),this.render()}handleAddFact(){this._memories=[{id:`mem-${Date.now()}`,category:"preference",textEn:"Always provide TypeScript types for tool parameters.",textZh:"始终为 Tool 参数提供完整的 TypeScript 类型注解与 Zod 校验。",confidence:100,updatedAtEn:"Just now",updatedAtZh:"刚刚"},...this._memories],this.render()}render(){let e=this.isZh,t=this._filter,n=this._query,s=this._memories,i=s.filter(s=>{if("all"!==t&&s.category!==t)return!1;let i=e?s.textZh:s.textEn;return!n||!!i.toLowerCase().includes(n.toLowerCase())}),r=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M9 21h6" />
              </svg>
            </span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"智能体长期记忆看板":"Agent Long-Term Memory"}
            </h3>
          </div>

          <span class="font-mono text-[11px] text-ink-3">
            ${s.length} ${e?"条已存记忆":1===s.length?"stored fact":"stored facts"}
          </span>
        </div>

        <!-- Filter Tabs & Search -->
        <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div class="flex rounded-control bg-field p-0.5 text-[11px]">
            ${["all","preference","rule","fact"].map(n=>`
              <button
                type="button"
                data-tab="${n}"
                class="tab-btn rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${t===n?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
              >
                ${"all"===n?e?"全部":"All":"preference"===n?e?"偏好":"Prefs":"rule"===n?e?"规范":"Rules":e?"事实":"Facts"}
              </button>
            `).join("")}
          </div>

          <div class="relative">
            <input
              type="text"
              placeholder="${e?"搜索记忆...":"Search memory..."}"
              value="${n}"
              class="search-input w-36 rounded-control border border-line bg-field px-2 py-1 text-[11px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
          </div>
        </div>

        <!-- Memory Cards List -->
        <div class="mt-3 flex flex-col gap-2">
          ${0===i.length?`
            <div class="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-ink-3">
              ${e?"当前筛选条件下无记忆项。":"No memories match the current filter."}
            </div>
          `:i.map(t=>`
            <div
              class="group relative flex items-start justify-between gap-2.5 rounded-control border border-line bg-inset/40 p-3 hover:border-line-strong hover:bg-hover/30 transition-all"
            >
              <div class="flex flex-col min-w-0 flex-1">
                <div class="flex items-center gap-1.5 mb-1">
                  <span
                    class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium capitalize ${"preference"===t.category?"bg-accent-tint text-accent-ink":"rule"===t.category?"bg-orange-tint text-orange":"bg-green-tint text-green"}"
                  >
                    ${"preference"===t.category?e?"偏好":"preference":"rule"===t.category?e?"规范":"rule":e?"事实":"fact"}
                  </span>
                  ${t.pinned?`
                    <span class="flex items-center gap-0.5 font-mono text-[9.5px] text-ink-3">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 3a1 1 0 0 1 .71.29l4 4A1 1 0 0 1 21 9l-6.5 6.5-.5 4.5a1 1 0 0 1-1.7.7L9 17.4 4.7 21.7a1 1 0 0 1-1.4-1.4L7.6 16l-3.3-3.3a1 1 0 0 1 .7-1.7l4.5-.5L15 4a1 1 0 0 1 1-1z" />
                      </svg>
                      ${e?"已置顶":"Pinned"}
                    </span>
                  `:""}
                  <span class="font-mono text-[10px] text-ink-3 tabular-nums ml-auto">
                    ${t.confidence}% ${e?"置信":"conf"} • ${e?t.updatedAtZh:t.updatedAtEn}
                  </span>
                </div>
                <p class="text-[12px] text-ink leading-snug">
                  ${e?t.textZh:t.textEn}
                </p>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  data-id="${t.id}"
                  title="${t.pinned?e?"取消置顶":"Unpin":e?"置顶到 Prompt":"Pin to prompt"}"
                  class="icon-action-btn pin btn-pin flex size-6 items-center justify-center rounded-chip text-ink-3 hover:bg-hover hover:text-ink transition-colors cursor-pointer ${t.pinned?"text-accent-ink":""}"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="17" x2="12" y2="22" />
                    <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
                  </svg>
                </button>
                <button
                  type="button"
                  data-id="${t.id}"
                  title="${e?"遗忘此记忆":"Forget this memory"}"
                  class="icon-action-btn delete btn-delete flex size-6 items-center justify-center rounded-chip text-ink-3 hover:bg-red-tint hover:text-red transition-colors cursor-pointer"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"已在当前 Agent 会话中实时同步":"Synced across current agent sessions"}</span>
          <button
            type="button"
            id="btn-add-fact"
            class="text-accent-ink hover:underline font-medium cursor-pointer"
          >
            ${e?"+ 添加事实":"+ Add Fact"}
          </button>
        </div>
      </div>
    `;this.setHtml(r),this.shadowRoot.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");t&&this.setFilter(t)})});let o=this.shadowRoot.querySelector(".search-input");o?.addEventListener("input",e=>{this.setQuery(e.target.value)}),this.shadowRoot.querySelectorAll(".btn-pin").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleTogglePin(t)})}),this.shadowRoot.querySelectorAll(".btn-delete").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleDelete(t)})}),this.shadowRoot.querySelector("#btn-add-fact")?.addEventListener("click",()=>{this.handleAddFact()})}}"u">typeof customElements&&!customElements.get("nai-memory-inspector")&&customElements.define("nai-memory-inspector",el);class ed extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._chipsShown=!1}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._chipsShown=!0;return}this.registerTimeout(()=>{this._chipsShown=!0,this.render()},700)}render(){let e=this.isZh,t=this._chipsShown,n=`
      <div class="flex w-full max-w-95 flex-col gap-2">
        <div
          class="flex items-center gap-2 px-0.5"
          style="animation: fade-in 400ms ease-out both;"
        >
          <span class="text-[13px] font-semibold text-ink">
            ${e?"检索知识分块":"All chunks"}
          </span>
          <span class="count-chip inline-flex h-5 items-center rounded-md bg-inset px-1.5 text-[11.5px] font-medium text-ink-2 shadow-hairline tabular-nums">32</span>
        </div>

        ${[{title:e?"供应商准入规范":"Vendor onboarding rule",chars:e?"290 字符":"290 characters",body:e?"在将新乳制品供应商纳入自动补货工作流之前，必须首先验证其冷链资质认证与卫生许可。":"Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",source:"Dairy Onboarding SOP.pdf",badge:"PDF",tone:"bg-red"},{title:e?"季节性需求走势":"Seasonal demand row",chars:e?"1,250 字符":"1,250 characters",body:e?"第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。":"Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",source:"Sales Velocity Export.csv",badge:"CSV",tone:"bg-green"}].map((e,n)=>`
          <div
            class="card overflow-hidden rounded-card bg-surface shadow-card"
            style="animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${100*n}ms both;"
          >
            <div class="primitive-card-bar flex items-center gap-2.5 border-b border-line">
              <span class="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-ink">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                <span class="truncate">${e.title}</span>
              </span>
              <span class="ml-auto shrink-0 text-[12px] text-ink-3 tabular-nums">${e.chars}</span>
            </div>
            <p class="px-3 pt-2 pb-1 text-[12.5px] leading-relaxed text-ink-2">
              ${e.body}
            </p>
            <div class="px-3 pb-3">
              <span
                class="inline-flex h-6 items-center gap-1.5 rounded-full bg-inset px-2
                  text-[12px] font-medium text-ink-2 shadow-btn
                  transition-[opacity,transform,background-color] duration-300 hover:bg-hover cursor-pointer"
                style="
                  opacity: ${+!!t};
                  transform: ${t?"scale(1)":"scale(0.95)"};
                  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
                  transition-delay: ${80*n}ms;
                "
              >
                <span class="flex size-3.5 items-center justify-center rounded-[4px] ${e.tone} text-[7px] font-bold text-white">
                  ${e.badge}
                </span>
                ${e.source}
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    `;this.setHtml(n)}}"u">typeof customElements&&!customElements.get("nai-context-cards")&&customElements.define("nai-context-cards",ed);let ec=[{id:"spill-1",sourceTool:"fs.search_ripgrep",originalTokens:48500,compactedTokens:820,diskPath:"spill/ripgrep_ast_results.json",sizeBytes:"1.4 MB",spilledAtEn:"4m ago",spilledAtZh:"4分钟前"},{id:"spill-2",sourceTool:"shell.git_diff_full",originalTokens:86200,compactedTokens:1450,diskPath:"spill/git_diff_refactor_v2.patch",sizeBytes:"2.8 MB",spilledAtEn:"12m ago",spilledAtZh:"12分钟前"}];class ep extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._hydratedId=null}handleHydrate(e){this._hydratedId=this._hydratedId===e?null:e,this.render()}render(){let e=this.isZh,t=this._hydratedId,n=ec.reduce((e,t)=>e+(t.originalTokens-t.compactedTokens),0),s=`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </span>
            <div>
              <h3 class="text-[13px] font-semibold text-ink">
                ${e?"上下文压缩与磁盘溢出":"Context Compaction & Spill"}
              </h3>
              <p class="text-[11px] text-ink-3">
                ${e?"Harness.Spill 超限数据磁盘分流存储":"Harness.Spill disk-offloaded oversized tools"}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-1 font-mono text-[11px] text-green font-medium">
            <span>↓ ${n.toLocaleString()} ${e?"token 已节省":"tok saved"}</span>
          </div>
        </div>

        <!-- Compaction Efficiency Gauge -->
        <div class="mt-3.5 rounded-control border border-line bg-inset/50 p-3">
          <div class="flex items-baseline justify-between text-[11.5px]">
            <span class="text-ink-2">${e?"压缩比率":"Compaction Ratio"}</span>
            <span class="font-mono font-semibold text-accent">
              ${e?"96.8% Token 压缩率":"96.8% token compression"}
            </span>
          </div>

          <div class="mt-2 flex h-2 w-full items-center gap-1">
            <span class="size-2 shrink-0 rounded-full bg-accent" title="${e?"内存活跃 3.2%":"In-memory 3.2%"}"></span>
            <div class="h-2 flex-1 overflow-hidden rounded-full bg-line">
              <div class="h-full rounded-full bg-green/60" style="width: 96.8%;"></div>
            </div>
          </div>

          <div class="mt-2 flex justify-between font-mono text-[10px] text-ink-3">
            <span>${e?"内存活跃上下文 (3.2%)":"In-Memory Active (3.2%)"}</span>
            <span>${e?"溢出至磁盘存储 (96.8%)":"Spilled to Disk (96.8%)"}</span>
          </div>
        </div>

        <!-- Spilled Files List -->
        <div class="mt-3.5 flex flex-col gap-2">
          ${ec.map(n=>{let s=t===n.id;return`
              <div
                class="rounded-control border border-line bg-surface p-3 hover:border-line-strong transition-all"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="flex size-4.5 items-center justify-center rounded-full bg-field text-ink-3 shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </span>
                    <div class="min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="font-mono text-[11.5px] font-medium text-ink truncate">
                          ${n.diskPath}
                        </span>
                        <span class="rounded-chip border border-line bg-inset px-1 font-mono text-[9px] text-ink-3">
                          ${n.sizeBytes}
                        </span>
                      </div>
                      <span class="text-[10.5px] text-ink-3">
                        ${e?"源自":"From"} ${n.sourceTool} • ${e?n.spilledAtZh:n.spilledAtEn}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-id="${n.id}"
                    class="btn-hydrate rounded-control border border-line bg-field px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer shrink-0"
                  >
                    ${s?e?"收起原文":"Hide Raw":e?"按需水合":"Hydrate"}
                  </button>
                </div>

                ${s?`
                  <div class="hydrate-preview mt-2.5 border-t border-line/60 pt-2 font-mono text-[10.5px] text-ink-2">
                    <div class="rounded bg-page p-2 leading-relaxed text-ink-3">
                      ${e?"[水合片段预览: 48,500 token 原始输出已从 Harness.Spill.Local 磁盘缓存加载。原始 SHA256: 4d89a0b12...]":"[Hydrated snippet: 48,500 tokens offloaded to Harness.Spill.Local storage. Original hash: sha256:4d89a0b12...]"}
                    </div>
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `;this.setHtml(s),this.shadowRoot.querySelectorAll(".btn-hydrate").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleHydrate(t)})})}}"u">typeof customElements&&!customElements.get("nai-context-spillover")&&customElements.define("nai-context-spillover",ep);let eh=[{type:"turn/start",depth:0,tone:"accent",opens:"turn",summaryEn:"Turn 3 begins",summaryZh:"第 3 轮开始",meta:"user prompt"},{type:"request/header",depth:1,tone:"dim",summaryEn:"deepseek-reasoner · 128k",summaryZh:"deepseek-reasoner · 128k",meta:"41,208 tok"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 1",summaryZh:"步骤 1"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Let me check the job registry…",summaryZh:"先检查作业注册表…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.list",summaryZh:"job.list",meta:"call_9f2a"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"3 running · 1 killed",summaryZh:"3 个运行中 · 1 个已终止",meta:"82ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 1 closed",summaryZh:"步骤 1 闭合",meta:"1.2s"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 2",summaryZh:"步骤 2"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Restarting the telemetry export…",summaryZh:"正在重启遥测导出任务…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.start",summaryZh:"job.start",meta:"call_b771"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"job-4f8c · Running",summaryZh:"job-4f8c · 运行中",meta:"134ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 2 closed",summaryZh:"步骤 2 闭合",meta:"0.9s"},{type:"assistant/message",depth:1,tone:"green",summaryEn:"Done — the export job is back up.",summaryZh:"完成 — 导出任务已恢复。"},{type:"turn/end",depth:0,tone:"accent",closes:"turn",summaryEn:"Turn 3 · completed",summaryZh:"第 3 轮 · 已完成",meta:"2 steps · 2 calls"}],eu={accent:"bg-accent",green:"bg-green",orange:"bg-orange",muted:"bg-ink-3",dim:"bg-line-strong"},ex={accent:"bg-accent-tint text-accent-ink",green:"bg-green-tint text-green",orange:"bg-orange-tint text-orange",muted:"bg-hover-2/60 text-ink-2",dim:"bg-field text-ink-3"};class eg extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._visible=0}onMount(){this._visible=0,this._scheduleNext()}onUnmount(){this._visible=0}_scheduleNext(){if(this._visible<eh.length){let e=0===this._visible?500:620;this.registerTimeout(()=>{this._visible++,this.render(),this._scheduleNext()},e)}else this.registerTimeout(()=>{this._visible=0,this.render(),this._scheduleNext()},3600)}render(){let e=this.isZh,t=this._visible>=eh.length,n=eh.slice(0,this._visible),s=!1,i=!1,r=n.map(e=>{"turn"===e.opens&&(s=!0),"step"===e.opens&&(i=!0);let t={turn:s,step:i};return"step"===e.closes&&(i=!1),"turn"===e.closes&&(s=!1,i=!1),t}),o=`
      .bg-accent\\/35 { background-color: color-mix(in srgb, var(--accent, #0285ff) 35%, transparent); }
      .bg-hover-2\\/60 { background-color: color-mix(in srgb, var(--hover-2, #e7e9eb) 60%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .size-\\[7px\\] { width: 7px; height: 7px; }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .py-\\[5px\\] { padding-top: 5px; padding-bottom: 5px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
      .border-\\[1\\.5px\\] { border-width: 1.5px; }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${t?"bg-green":"bg-accent animate-pulse"}"></span>
            <h3 class="title text-[13px] font-semibold text-ink">${e?"Turn 括号事件流":"Turn Bracket Stream"}</h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              session/7c1d
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${Math.min(this._visible,eh.length)}/${eh.length} events
          </span>
        </div>

        
        <div class="timeline relative flex min-h-[304px] flex-col gap-[3px] rounded-control border border-line bg-inset/50 p-3">
          ${n.map((s,i)=>{let o=r[i],a=i===n.length-1;return`
                <div
                  class="relative flex items-center gap-2.5 rounded-chip px-1.5 py-[5px]"
                  style="padding-left: ${6+22*s.depth}px; animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both; ${a&&!t?"background: var(--hover);":""}"
                >
                  ${o.turn?'<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-accent/35" style="left: 12px;"></span>':""}
                  ${s.depth>=1&&o.step?'<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-line-strong" style="left: 34px;"></span>':""}
                  ${s.closes?`<span aria-hidden="true" class="absolute size-[7px] rounded-full border-[1.5px] ${"turn"===s.closes?"border-accent bg-accent-tint":"border-line-strong bg-surface"}" style="left: ${12+22*("turn"!==s.closes)-3}px;"></span>`:""}

                  <span class="size-1.5 shrink-0 rounded-full ${eu[s.tone]}"></span>
                  <code class="shrink-0 rounded-chip px-1.5 py-px font-mono text-[10px] ${ex[s.tone]}">
                    ${s.type}
                  </code>
                  <span class="min-w-0 flex-1 truncate text-[11.5px] text-ink-2">
                    ${e?s.summaryZh:s.summaryEn}
                  </span>
                  ${s.meta?`<span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">${s.meta}</span>`:""}
                </div>
              `}).join("")}

          ${!t?`
            <div
              class="flex items-center gap-2 px-1.5 py-1"
              style="padding-left: ${6+Math.min((eh[this._visible]?.depth??0)*22+22,66)}px;"
            >
              <span class="size-1.5 rounded-full bg-ink-3 animate-pulse"></span>
              <span class="font-mono text-[10px] text-ink-3">
                ${e?"等待下一事件…":"awaiting next event…"}
              </span>
            </div>
          `:""}
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${e?"括号结构: turn ⊃ step ⊃ tool/call":"Brackets: turn ⊃ step ⊃ tool/call"}
          </span>
          <span class="font-mono">agent/loop \xb7 durable</span>
        </div>
      </div>
    `,o)}}"u">typeof customElements&&!customElements.get("nai-turn-lifecycle")&&customElements.define("nai-turn-lifecycle",eg);let em={id:"m1",kind:"followup",textEn:"also verify the rollout gate",textZh:"顺便验证一下灰度发布门禁"},eb={id:"m2",kind:"steer",textEn:"use the staging endpoint",textZh:"改用 staging 环境的端点"},ef={id:"m3",kind:"inject",textEn:"fyi: trace dump at /tmp/trace.log",textZh:"备注：trace 已转储到 /tmp/trace.log"},ev=[900,1500,1500,1500,1700,2100,4600];class ek extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=ev[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%ev.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,n=t>=1&&t<5?[em]:[],s=2===t?[eb]:3===t?[eb,ef]:[],i=5===t,r=`
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .bg-accent-tint\\/40 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 40%, transparent); }
      .border-orange\\/40 { border-color: color-mix(in srgb, var(--orange, #ef720c) 40%, transparent); }
      .bg-orange-tint\\/40 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 40%, transparent); }
      .border-green\\/40 { border-color: color-mix(in srgb, var(--green, #189a4d) 40%, transparent); }
      .bg-green-tint\\/40 { background-color: color-mix(in srgb, var(--green-tint, #e8f5ed) 40%, transparent); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .ring-2 { box-shadow: 0 0 0 2px var(--ring-color, currentColor); }
      .ring-accent\\/40 { --ring-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .size-1 { width: 4px; height: 4px; }
      .size-2 { width: 8px; height: 8px; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span
              class="flex size-2 rounded-full transition-colors duration-300 ${i?"bg-ink-3":"bg-accent animate-pulse"}"
            ></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"双队列收件箱":"Agent Inbox"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              ${i?e?"空闲":"idle":e?"运行中":"running"}
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            turn ${t>=5?3:2} \xb7 step ${t>=4?2:1}
          </span>
        </div>

        
        <div class="grid grid-cols-2 gap-2">
          
          <div class="lane flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
            <div class="flex items-center justify-between px-1 pb-1.5">
              <span class="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
                NextTurn
              </span>
              <span class="font-mono text-[9px] text-ink-3">
                ${e?"各开一轮":"own turn"}
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              ${0===n.length?`<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${e?"空":"empty"}</span>`:n.map(t=>`
                    <div
                      class="rounded-chip border border-accent/40 bg-accent-tint/40 px-2 py-1.5"
                      style="animation: pop-in 260ms cubic-bezier(0.23,1,0.32,1) both;"
                    >
                      <div class="flex items-center gap-1">
                        <span class="size-1 rounded-full bg-accent"></span>
                        <span class="font-mono text-[9px] font-medium text-accent-ink">FollowupAsync</span>
                      </div>
                      <p class="mt-0.5 truncate text-[10.5px] text-ink">
                        ${e?t.textZh:t.textEn}
                      </p>
                    </div>
                  `).join("")}
            </div>
          </div>

          
          <div class="lane flex min-h-[118px] flex-col rounded-control border border-line bg-inset/50 p-2">
            <div class="flex items-center justify-between px-1 pb-1.5">
              <span class="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-ink-3">
                NextStep
              </span>
              <span class="font-mono text-[9px] text-ink-3">
                ${e?"步骤边界消费":"step edge"}
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-1">
              ${0===s.length?`<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${e?"空":"empty"}</span>`:s.map(t=>`
                    <div
                      class="rounded-chip px-2 py-1.5 ${"inject"===t.kind?"border border-dashed border-line-strong bg-surface":"border border-orange/40 bg-orange-tint/40"}"
                      style="animation: pop-in 260ms cubic-bezier(0.23,1,0.32,1) both;"
                    >
                      <div class="flex items-center gap-1">
                        <span class="size-1 rounded-full ${"inject"===t.kind?"bg-ink-3":"bg-orange"}"></span>
                        <span class="font-mono text-[9px] font-medium ${"inject"===t.kind?"text-ink-3":"text-orange"}">
                          ${"inject"===t.kind?"InjectAsync":"SteerAsync"}
                        </span>
                      </div>
                      <p class="mt-0.5 truncate text-[10.5px] text-ink">
                        ${e?t.textZh:t.textEn}
                      </p>
                    </div>
                  `).join("")}
            </div>
          </div>
        </div>

        
        <div
          class="mt-2 flex items-center gap-2 rounded-control border px-2.5 py-2 transition-all duration-500 ${t>=4?"border-green/40 bg-green-tint/40":"border-line bg-inset/40"}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${t>=4?"var(--green)":"var(--ink-3)"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
          </svg>
          <span class="min-w-0 flex-1 truncate text-[11px] text-ink-2">
            ${t>=4?e?"步骤边界：ClaimAsync 整批取走 2 条消息":"Step boundary: ClaimAsync drained 2 messages":e?"等待步骤边界…":"awaiting step boundary…"}
          </span>
          ${t>=4?`
            <span
              class="shrink-0 rounded-chip bg-green-tint px-1.5 py-px font-mono text-[9.5px] font-medium text-green"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              claimed \xd72
            </span>
          `:""}
        </div>

        
        <div class="mt-3 grid grid-cols-4 gap-1.5">
          ${[{name:"Send",descEn:"owns send",descZh:"独占发送",style:"border-line bg-field text-ink-2"},{name:"Followup",descEn:"→ turn+wake",descZh:"→ 下轮+唤醒",style:"border-accent/40 bg-accent-tint/40 text-accent-ink"},{name:"Steer",descEn:"→ step+wake",descZh:"→ 边界+唤醒",style:"border-orange/40 bg-orange-tint/40 text-orange"},{name:"Inject",descEn:"→ step, silent",descZh:"→ 边界,静默",style:"border-dashed border-line-strong bg-surface text-ink-3"}].map((n,s)=>`
              <div
                class="method-card flex flex-col items-center gap-0.5 rounded-chip border px-1 py-1.5 transition-all duration-300 ${n.style} ${1===s&&1===t||2===s&&2===t||3===s&&3===t?"ring-2 ring-accent/40 scale-105":""}"
                ${"Inject"===n.name?'style="border-style: dashed;"':""}
              >
                <span class="font-mono text-[10px] font-semibold">${n.name}</span>
                <span class="text-[8.5px] opacity-80">${e?n.descZh:n.descEn}</span>
              </div>
            `).join("")}
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${t>=5?e?"空闲后 NextTurn 唤醒驱动，开启第 3 轮":"NextTurn wakes the driver into turn 3":e?"所有 mutation 归一化为 splice 事件":"Every mutation folds into a splice event"}
          </span>
          <span class="font-mono">agent/inbox/spliced</span>
        </div>
      </div>
    `,r)}}"u">typeof customElements&&!customElements.get("nai-agent-inbox")&&customElements.define("nai-agent-inbox",ek);let ew=[{name:"secret-scrub",matcher:"*",decision:"allow",latencyMs:4},{name:"workspace-guard",matcher:"fs.*",decision:"ask",reasonEn:"writes outside declared scopes",reasonZh:"写入超出声明的 write scopes",latencyMs:11},{name:"rate-limiter",matcher:"*",decision:"allow",latencyMs:2}],ey={deny:0,ask:1,block:2,allow:3},e$={allow:{chip:"bg-green-tint text-green",dot:"bg-green",labelEn:"allow",labelZh:"允许"},ask:{chip:"bg-orange-tint text-orange",dot:"bg-orange",labelEn:"ask",labelZh:"询问"},deny:{chip:"bg-red-tint text-red",dot:"bg-red",labelEn:"deny",labelZh:"拒绝"},block:{chip:"bg-accent-tint text-accent-ink",dot:"bg-accent",labelEn:"block",labelZh:"阻断"}},e_=["SessionStart","UserPrompt","ToolPre","ToolPost","Stop","Subagent"],eE=[700,750,750,750,1400,1400,3800];class eS extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=eE[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%eE.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,n=Math.max(0,Math.min(t,ew.length)),s=t>=4?t>=5?"allow":ew.map(e=>e.decision).sort((e,t)=>ey[e]-ey[t])[0]??"allow":null,i=`
      .border-accent\\/50 { border-color: color-mix(in srgb, var(--accent, #0285ff) 50%, transparent); }
      .border-green\\/40 { border-color: color-mix(in srgb, var(--green, #189a4d) 40%, transparent); }
      .border-orange\\/40 { border-color: color-mix(in srgb, var(--orange, #ef720c) 40%, transparent); }
      .bg-green-tint\\/50 { background-color: color-mix(in srgb, var(--green-tint, #e8f5ed) 50%, transparent); }
      .bg-orange-tint\\/50 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 50%, transparent); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/50 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 50%, transparent); }
      .opacity-45 { opacity: 0.45; }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-accent animate-pulse"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"Hook 决策管线":"Hook Pipeline"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              6 points
            </span>
          </div>
          <span class="font-mono text-[10.5px] text-ink-3">Harness.Hooks</span>
        </div>

        
        <div class="flex flex-wrap gap-1">
          ${e_.map(e=>`
            <span
              class="point-tag rounded-chip border px-1.5 py-0.5 font-mono text-[9.5px] transition-colors duration-300 ${"ToolPre"===e?"border-accent/50 bg-accent-tint text-accent-ink":"border-line bg-inset text-ink-3"}"
            >
              ${e}
            </span>
          `).join("")}
        </div>

        
        <div class="mt-3 flex items-center gap-2 rounded-control border border-line bg-inset px-2.5 py-2">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
            <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
          </svg>
          <code class="font-mono text-[11.5px] text-ink">fs.write</code>
          <span class="truncate font-mono text-[10.5px] text-ink-3">src/llm/retry.cs</span>
          <span class="ml-auto shrink-0 rounded-chip bg-field px-1.5 py-px font-mono text-[9.5px] text-ink-3">
            call_e51c
          </span>
        </div>

        
        <div class="mt-3 flex min-h-[132px] flex-col gap-1.5">
          ${ew.map((t,s)=>{let i=s<n,r=e$[t.decision];return`
              <div
                class="hook-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${i?"border-line bg-surface":"border-line/60 bg-inset/40 opacity-45"}"
                ${i?'style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"':""}
              >
                
                <span class="flex size-1.5 shrink-0 rounded-full ${i?r.dot:"bg-line-strong"}"></span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <code class="font-mono text-[11px] font-medium text-ink">${t.name}</code>
                    <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                      ${t.matcher}
                    </span>
                  </div>
                  ${i&&t.reasonEn?`
                    <span class="mt-0.5 block truncate text-[10.5px] text-ink-3">
                      ${e?t.reasonZh:t.reasonEn}
                    </span>
                  `:""}
                </div>
                ${i?`
                  <span class="shrink-0 rounded-chip px-1.5 py-0.5 font-mono text-[10px] font-medium ${r.chip}">
                    ${e?r.labelZh:r.labelEn}
                  </span>
                `:`
                  <span class="shrink-0 font-mono text-[9.5px] text-ink-3">…</span>
                `}
                <span class="w-8 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                  ${i?`${t.latencyMs}ms`:""}
                </span>
              </div>
            `}).join("")}
        </div>

        
        <div
          class="merge-bar mt-1 flex items-center justify-between gap-2 rounded-control border px-3 py-2.5 transition-all duration-500 ${"allow"===s?"border-green/40 bg-green-tint/50":"ask"===s?"border-orange/40 bg-orange-tint/50":"border-line bg-inset/50"}"
        >
          <div class="flex min-w-0 items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0">
              <path d="M8 3v4a4 4 0 0 1-4 4h16M8 21v-4a4 4 0 0 0-4-4" />
              <path d="M18 8l3 3-3 3" transform="translate(-3 4)" />
            </svg>
            <span class="shrink-0 text-[11.5px] font-medium text-ink">
              ${e?"Merge · 最严优先":"Merge · most-restrictive"}
            </span>
            <span class="hidden min-w-0 truncate font-mono text-[9.5px] text-ink-3 sm:inline">
              deny &gt; ask &gt; block &gt; allow
            </span>
          </div>
          ${s?`
            <span
              class="shrink-0 whitespace-nowrap rounded-chip px-2 py-0.5 font-mono text-[10.5px] font-semibold ${e$[s].chip}"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              ${"allow"===s&&t>=5?e?"allow · 已批准":"allow · approved":e?e$[s].labelZh:e$[s].labelEn}
            </span>
          `:`
            <span class="font-mono text-[10px] text-ink-3">…</span>
          `}
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${t>=4&&t<5?e?"workspace-guard 升级为 ask → 等待人工批准":"workspace-guard escalated to ask → awaiting approval":e?"HookInvokedFact 全部落入 durable log":"Every HookInvokedFact lands in the durable log"}
          </span>
          <span class="font-mono tabular-nums">
            ${t>=5?"fail-open: never":"fail-closed"}
          </span>
        </div>
      </div>
    `,i)}}"u">typeof customElements&&!customElements.get("nai-hook-pipeline")&&customElements.define("nai-hook-pipeline",eS);let eC=[{turns:{completed:6,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:14,toolCalls:19,tokensIn:41208,tokensOut:6893,llmMs:21400,spark:[8,12,18,24,31,41]},{turns:{completed:7,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:17,toolCalls:23,tokensIn:50872,tokensOut:8104,llmMs:25800,spark:[8,12,18,24,31,41,51]},{turns:{completed:8,blocked:1,aborted:1,error:0,maxTokens:0,open:1},steps:20,toolCalls:27,tokensIn:59930,tokensOut:9761,llmMs:30100,spark:[8,12,18,24,31,41,51,60]},{turns:{completed:9,blocked:1,aborted:1,error:0,maxTokens:1,open:0},steps:24,toolCalls:31,tokensIn:71455,tokensOut:11290,llmMs:36900,spark:[8,12,18,24,31,41,51,60,71]}];function ej(e){return e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}class eM extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._frame=0}onMount(){this._frame=0,this._scheduleFrame()}onUnmount(){this._frame=0}_scheduleFrame(){this._frame<eC.length-1?this.registerTimeout(()=>{this._frame++,this.render(),this._scheduleFrame()},2400):this.registerTimeout(()=>{this._frame=0,this.render(),this._scheduleFrame()},4600)}render(){let e=this.isZh,t=eC[this._frame],n=t.turns.completed+t.turns.blocked+t.turns.aborted+t.turns.error+t.turns.maxTokens+t.turns.open,s=Math.max(...eC[eC.length-1].spark),i=[{key:"completed",labelEn:"completed",labelZh:"完成",value:t.turns.completed,color:"var(--green)"},{key:"blocked",labelEn:"blocked",labelZh:"阻塞",value:t.turns.blocked,color:"var(--orange)"},{key:"aborted",labelEn:"aborted",labelZh:"中止",value:t.turns.aborted,color:"var(--ink-3)"},{key:"error",labelEn:"error",labelZh:"错误",value:t.turns.error,color:"var(--red)"},{key:"maxTokens",labelEn:"max-tokens",labelZh:"达到上限",value:t.turns.maxTokens,color:"#b585e0"},{key:"open",labelEn:"open",labelZh:"进行中",value:t.turns.open,color:"var(--accent)"}],r=[{labelEn:"Turns",labelZh:"轮次",value:String(n)},{labelEn:"Steps",labelZh:"步骤",value:String(t.steps)},{labelEn:"Tool calls",labelZh:"工具调用",value:String(t.toolCalls)},{labelEn:"Tokens in",labelZh:"输入 tokens",value:ej(t.tokensIn)},{labelEn:"Tokens out",labelZh:"输出 tokens",value:ej(t.tokensOut)},{labelEn:"LLM time",labelZh:"LLM 耗时",value:`${(Math.round(t.llmMs/100)/10).toFixed(1)}s`}],o=`
      .bg-inset\\/60 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 60%, transparent); }
      .bg-accent\\/35 { background-color: color-mix(in srgb, var(--accent, #0285ff) 35%, transparent); }
      .size-1\\.5 { width: 6px; height: 6px; }
      .size-2 { width: 8px; height: 8px; }
      .rounded-t-\\[3px\\] { border-top-left-radius: 3px; border-top-right-radius: 3px; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${t.turns.open>0?"bg-accent animate-pulse":"bg-green"}"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"会话遥测":"Session Telemetry"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              sessionStats
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${t.turns.open>0?e?"折叠中…":"folding…":e?"已归档":"archived"}
          </span>
        </div>

        
        <div class="grid grid-cols-3 gap-1.5">
          ${r.map(t=>`
            <div class="metric-tile rounded-control border border-line bg-inset/60 px-2.5 py-2">
              <div class="font-mono text-[15px] font-semibold tabular-nums text-ink">
                ${t.value}
              </div>
              <div class="text-[10px] text-ink-3">${e?t.labelZh:t.labelEn}</div>
            </div>
          `).join("")}
        </div>

        
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${e?"轮次结局分布":"Turn outcomes"}
            </span>
            <span class="font-mono text-[9.5px] text-ink-3">turn/end \xb7 six kinds</span>
          </div>
          <div class="flex h-2 w-full overflow-hidden rounded-full bg-field">
            ${i.map(e=>e.value>0?`
                <span
                  class="h-full transition-all duration-700"
                  style="width: ${e.value/n*100}%; background: ${e.color};"
                  title="${e.key}: ${e.value}"
                ></span>
              `:"").join("")}
          </div>
          <div class="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            ${i.map(t=>`
              <span class="flex items-center gap-1 text-[10px] text-ink-2">
                <span class="size-1.5 rounded-full" style="background: ${t.color};"></span>
                ${e?t.labelZh:t.labelEn}
                <span class="font-mono tabular-nums text-ink-3">${t.value}</span>
              </span>
            `).join("")}
          </div>
        </div>

        
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${e?"累计输入 tokens":"Cumulative tokens in"}
            </span>
            <span class="font-mono text-[10px] tabular-nums text-ink-3">
              ${t.tokensIn.toLocaleString()}
            </span>
          </div>
          <div class="spark-container flex h-12 items-end gap-1">
            ${eC[eC.length-1].spark.map((e,n)=>{let i=t.spark[n];return`
                <span
                  class="flex-1 rounded-t-[3px] transition-all duration-700 ${void 0===i?"bg-field":n===t.spark.length-1?"bg-accent":"bg-accent/35"}"
                  style="height: ${void 0===i?"8%":`${Math.max(8,i/s*100)}%`};"
                ></span>
              `}).join("")}
          </div>
        </div>

        
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"投影 = durable 事实的纯折叠":"Projection = pure fold of durable facts"}</span>
          <span class="font-mono">Harness.Session.Stats</span>
        </div>
      </div>
    `,o)}}"u">typeof customElements&&!customElements.get("nai-session-telemetry")&&customElements.define("nai-session-telemetry",eM);let ez=["w-01","w-02","w-03","w-04"];class eZ extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._done=0}onMount(){this._done=0,this._scheduleTick()}onUnmount(){this._done=0}_scheduleTick(){this._done<40?this.registerTimeout(()=>{this._done=Math.min(40,this._done+4),this.render(),this._scheduleTick()},420):this.registerTimeout(()=>{this._done=0,this.render(),this._scheduleTick()},4200)}render(){let e=this.isZh,t=this._done,n=t<40,s=n?Math.min(4,40-t):0,i=Math.round(t/40*100),r=`
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .bg-accent-tint\\/25 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 25%, transparent); }
      .bg-green\\/80 { background-color: color-mix(in srgb, var(--green, #189a4d) 80%, transparent); }
      .bg-field\\/70 { background-color: color-mix(in srgb, var(--field, #f2f2f3) 70%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-5 { width: 20px; height: 20px; }
      .grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
      .aspect-square { aspect-ratio: 1 / 1; }
      .tracking-wider { letter-spacing: 0.05em; }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full ${n?"bg-accent animate-pulse":"bg-green"}"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"工作流扇出执行":"Workflow Fan-out"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              run/8f2e1a
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">${i}%</span>
        </div>

        
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-control border border-line bg-inset px-2.5 py-2 font-mono text-[10px] text-ink-3">
          <span class="truncate">
            digest <span class="text-ink-2">sha256:9b7c…e4f1</span>
          </span>
          <span>
            concurrency <span class="text-ink-2 tabular-nums">4</span>
          </span>
          <span>
            max agents <span class="text-ink-2 tabular-nums">32</span>
          </span>
          <span>
            max items <span class="text-ink-2 tabular-nums">256</span>
          </span>
        </div>

        
        <div class="mt-3 flex flex-col gap-1.5">
          ${ez.map((i,r)=>{let o=r<s;return`
              <div
                class="slot-row flex items-center gap-2.5 rounded-control border px-2.5 py-1.5 transition-all duration-300 ${o?"border-accent/40 bg-accent-tint/25":"border-line bg-surface"}"
              >
                <span
                  class="flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[8.5px] font-semibold ${o?"bg-accent text-white":"bg-field text-ink-3"}"
                >
                  ${i.slice(-2)}
                </span>
                <span class="font-mono text-[10.5px] text-ink-2">${i}</span>
                <div class="min-w-0 flex-1">
                  ${o?`
                    <div class="h-1.5 w-full overflow-hidden rounded-full bg-field">
                      <div
                        class="h-full rounded-full bg-accent transition-all duration-300"
                        style="width: ${(t%4+1)*25}%;"
                      ></div>
                    </div>
                  `:`
                    <div class="h-1.5 w-full rounded-full bg-field/70"></div>
                  `}
                </div>
                <span class="w-16 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                  ${o?`item-${String(t+r+1).padStart(2,"0")}`:n?e?"空闲":"idle":e?"完成":"done"}
                </span>
              </div>
            `}).join("")}
        </div>

        
        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between">
            <span class="text-[10.5px] font-semibold uppercase tracking-wider text-ink-3">
              ${e?"条目网格":"Items"}
            </span>
            <span class="font-mono text-[10px] tabular-nums text-ink-3">
              ${t}/40
            </span>
          </div>
          <div class="grid grid-cols-10 gap-1">
            ${Array.from({length:40},(e,i)=>`
                <span
                  class="item-tile aspect-square w-full rounded-[4px] transition-all duration-300 ${i<t?"bg-green/80":n&&i>=t&&i<t+s?"bg-accent animate-pulse":"bg-field border border-line/60"}"
                  title="item-${i+1}"
                ></span>
              `).join("")}
          </div>
        </div>

        
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${n?e?`${s} 个成员并发处理中`:`${s} members in flight`:e?"全部条目处理完成":"All items processed"}
          </span>
          <span class="font-mono">Harness.Workflow</span>
        </div>
      </div>
    `,r)}}"u">typeof customElements&&!customElements.get("nai-workflow-run")&&customElements.define("nai-workflow-run",eZ);let eA=[{id:"before",titleEn:"Before edits",titleZh:"编辑前",time:"10:31",files:["app/page.tsx","components/chat.tsx"],summaryEn:"Clean baseline before the agent changed the chat flow.",summaryZh:"智能体修改聊天流程前的干净基线。"},{id:"edited",titleEn:"Implementation",titleZh:"实现完成",time:"10:38",files:["app/page.tsx","components/chat.tsx","tests/chat.test.tsx"],summaryEn:"Streaming behavior updated and regression coverage added.",summaryZh:"已更新流式交互，并新增回归测试。"},{id:"verified",titleEn:"Verified",titleZh:"验证通过",time:"10:42",files:["tests/chat.test.tsx"],summaryEn:"Checks passed; this is the current execution state.",summaryZh:"检查已通过；这是当前执行状态。"}];class eR extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=1,this._current=2,this._confirming=!1,this._announcement=""}selectCheckpoint(e){this._selected=e,this._confirming=!1,this.render()}confirmRestore(){this._current=this._selected,this._confirming=!1;let e=eA[this._selected],t=this.isZh?e.titleZh:e.titleEn;this._announcement=this.isZh?`已恢复“${t}”`:`Restored “${t}”`,this.render()}render(){let e=this.isZh,t=eA[this._selected],n=e?t.titleZh:t.titleEn,s=this._selected===this._current,i=`
      .bg-inset\\/45 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 45%, transparent); }
      .border-orange\\/35 { border-color: color-mix(in srgb, var(--orange, #ef720c) 35%, transparent); }
      .grid-cols-\\[12rem_1fr\\] { grid-template-columns: 12rem 1fr; }
      @media (max-width: 768px) {
        .md\\:grid-cols-\\[12rem_1fr\\] { grid-template-columns: 1fr; }
        .md\\:border-r { border-right-width: 0; }
        .md\\:border-b-0 { border-bottom-width: 1px; }
      }
      @media (min-width: 768px) {
        .md\\:grid-cols-\\[12rem_1fr\\] { grid-template-columns: 12rem 1fr; }
        .md\\:border-r { border-right-width: 1px; }
        .md\\:border-b-0 { border-bottom-width: 0; }
      }
      .leading-5 { line-height: 20px; }
      .leading-4 { line-height: 16px; }
      .min-h-4 { min-height: 16px; }
    `;this.setHtml(`
      <section
        aria-labelledby="checkpoint-timeline-title"
        class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card"
      >
        <header class="border-b border-line bg-inset px-4 py-3">
          <h3
            id="checkpoint-timeline-title"
            class="text-[13px] font-semibold text-ink"
          >
            ${e?"执行检查点":"Execution checkpoints"}
          </h3>
          <p class="mt-0.5 text-[11px] text-ink-3">
            ${e?"检查并恢复智能体的执行状态":"Inspect and restore agent execution state"}
          </p>
        </header>

        <div class="grid md:grid-cols-[12rem_1fr]">
          <ol class="border-b border-line bg-inset/45 p-3 md:border-r md:border-b-0">
            ${eA.map((t,n)=>{let s=e?t.titleZh:t.titleEn,i=n===this._current,r=n===this._selected;return`
                <li class="relative pb-2 last:pb-0">
                  ${n<eA.length-1?`<span
                          aria-hidden="true"
                          class="absolute top-7 bottom-0 left-[0.68rem] w-px bg-line-strong"
                        ></span>`:""}
                  <button
                    type="button"
                    data-idx="${n}"
                    aria-label="${e?"选择检查点":"Select checkpoint"} ${s}"
                    aria-pressed="${r}"
                    ${i?'aria-current="step"':""}
                    class="nav-btn relative flex w-full items-start gap-2.5 rounded-control px-2 py-2 text-left transition-colors motion-reduce:transition-none ${r?i?"bg-green-tint":"bg-accent-tint":"hover:bg-hover"}"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${i?"border-green bg-green":r?"border-accent bg-accent":"border-line-strong bg-surface"}"
                    ></span>
                    <span class="min-w-0">
                      <span class="block text-[11.5px] font-medium text-ink">
                        ${s}
                      </span>
                      <span class="mt-0.5 block font-mono text-[9.5px] text-ink-3">
                        ${t.time}${i?` \xb7 ${e?"当前":"current"}`:""}
                      </span>
                    </span>
                  </button>
                </li>
              `}).join("")}
          </ol>

          <div class="min-w-0 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-[12.5px] font-semibold text-ink">${n}</p>
                <p class="mt-1 text-[11px] leading-5 text-ink-3">
                  ${e?t.summaryZh:t.summaryEn}
                </p>
              </div>
              <span class="shrink-0 font-mono text-[10px] text-ink-3">
                ${t.time}
              </span>
            </div>

            <div class="mt-3 rounded-control border border-line bg-inset px-3 py-2.5">
              <p class="text-[9.5px] font-semibold tracking-wide text-ink-3 uppercase">
                ${e?"文件快照":"File snapshot"}
              </p>
              <ul class="mt-2 space-y-1">
                ${t.files.map(e=>`
                  <li class="flex items-center gap-2 font-mono text-[10px] text-ink-2">
                    <span class="text-accent-ink" aria-hidden="true">M</span>
                    ${e}
                  </li>
                `).join("")}
              </ul>
            </div>

            ${this._confirming?`
              <div
                role="alert"
                class="mt-3 rounded-control border border-orange/35 bg-orange-tint px-3 py-2.5"
              >
                <p class="text-[11.5px] font-medium text-ink">
                  ${e?`恢复“${n}”？`:`Restore “${n}”?`}
                </p>
                <p class="mt-1 text-[10px] leading-4 text-ink-3">
                  ${e?"后续文件改动将被替换。":"Later file changes will be replaced."}
                </p>
                <div class="mt-2.5 flex justify-end gap-2">
                  <button
                    type="button"
                    id="btn-cancel-restore"
                    aria-label="${e?"取消恢复":"Cancel restore"}"
                    class="rounded-control px-2.5 py-1.5 text-[10.5px] text-ink-2 transition-colors hover:bg-hover motion-reduce:transition-none"
                  >
                    ${e?"取消":"Cancel"}
                  </button>
                  <button
                    type="button"
                    id="btn-confirm-restore"
                    aria-label="${e?"确认恢复":"Confirm restore"}"
                    class="rounded-control bg-orange px-2.5 py-1.5 text-[10.5px] font-medium text-surface transition-opacity hover:opacity-85 motion-reduce:transition-none"
                  >
                    ${e?"确认恢复":"Confirm restore"}
                  </button>
                </div>
              </div>
            `:`
              <button
                type="button"
                id="btn-trigger-restore"
                aria-label="${s?e?"当前检查点":"Current checkpoint":e?"恢复检查点":"Restore checkpoint"}"
                ${s?"disabled":""}
                class="mt-3 w-full rounded-control border border-line-strong bg-surface px-3 py-2 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:bg-inset disabled:text-ink-3 disabled:shadow-none motion-reduce:transition-none"
              >
                ${s?e?"当前检查点":"Current checkpoint":e?"恢复到此检查点":"Restore this checkpoint"}
              </button>
            `}

            <p
              role="status"
              aria-live="polite"
              class="mt-2 min-h-4 text-[10.5px] font-medium text-green"
            >
              ${this._announcement}
            </p>
          </div>
        </div>
      </section>
    `,i),this.shadowRoot.querySelectorAll(".nav-btn").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx"),10);this.selectCheckpoint(t)})}),this.shadowRoot.querySelector("#btn-trigger-restore")?.addEventListener("click",()=>{this._confirming=!0,this.render()}),this.shadowRoot.querySelector("#btn-cancel-restore")?.addEventListener("click",()=>{this._confirming=!1,this.render()}),this.shadowRoot.querySelector("#btn-confirm-restore")?.addEventListener("click",()=>{this.confirmRestore()})}}"u">typeof customElements&&!customElements.get("nai-checkpoint-timeline")&&customElements.define("nai-checkpoint-timeline",eR);let eL=[{id:"cordis-hmr",name:"Cordis.Hmr",version:"1.0.4",scope:"Kernel",enabled:!0,hmrVersion:3,services:[{name:"IHmrWatcher",provider:"Cordis.Hmr.FileSystemWatcher",consumers:["Harness.Core.AgentLoop","Harness.Skill"],status:"active"}]},{id:"harness-llm-deepseek",name:"Harness.Llm.DeepSeek",version:"0.9.2",scope:"Harness",enabled:!0,hmrVersion:1,services:[{name:"ILlmProvider",provider:"DeepSeekReasoningProvider",consumers:["Harness.Core.AgentLoop","Harness.Compaction"],status:"active"}]},{id:"harness-sandbox-e2b",name:"Harness.Sandbox.E2b",version:"0.8.0",scope:"Harness",enabled:!0,hmrVersion:2,services:[{name:"ISandboxRuntime",provider:"E2bContainerWorker",consumers:["Harness.CodeRuntime.Tools","Harness.Terminal.Tools"],status:"active"}]},{id:"harness-lsp",name:"Harness.Lsp.Stdio",version:"0.5.1",scope:"Extension",enabled:!0,hmrVersion:1,services:[{name:"ILspDiagnosticsService",provider:"OmniSharpStdioBridge",consumers:["Harness.Fs.Tools"],status:"active"}]}];class eT extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._plugins=JSON.parse(JSON.stringify(eL)),this._reloadingId=null}handleToggle(e){this._plugins=this._plugins.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerHmr(e){this._reloadingId=e,this.render(),this.registerTimeout(()=>{this._plugins=this._plugins.map(t=>t.id===e?{...t,hmrVersion:t.hmrVersion+1}:t),this._reloadingId=null,this.render()},800)}render(){let e=this.isZh,t=this._plugins.filter(e=>e.enabled).length,n=`
      .bg-inset\\/30 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 30%, transparent); }
      .bg-hover\\/20 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
      .bg-page\\/50 { background-color: color-mix(in srgb, var(--page, #fafafb) 50%, transparent); }
      .bg-surface\\/50 { background-color: color-mix(in srgb, var(--surface, #fff) 50%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .border-line\\/80 { border-color: color-mix(in srgb, var(--line, #ecedef) 80%, transparent); }
      .size-3\\.5 { width: 14px; height: 14px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .max-w-\\[180px\\] { max-width: 180px; }
    `;this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"Cordis 插件运行时拓扑":"Cordis Plugin Runtime"}
                </h3>
                <span class="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                  ${e?"HMR 热重载就绪":"HMR Active"}
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${e?"Harness 插件微内核依赖关系图":"Agent harness plugin dependency graph"}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 font-mono text-[11px] text-ink-2">
            <span class="rounded-chip border border-line bg-inset px-2 py-0.5">
              ${t} ${e?"个活跃插件":"Active Plugins"}
            </span>
          </div>
        </div>

        
        <div class="mt-3.5 flex flex-col gap-2.5">
          ${this._plugins.map(t=>{let n=this._reloadingId===t.id,s="Kernel"===t.scope?"bg-orange-tint text-orange":"Harness"===t.scope?"bg-accent-tint text-accent-ink":"bg-green-tint text-green",i="Kernel"===t.scope?e?"内核":"Kernel":t.scope;return`
              <div
                class="rounded-control border transition-all ${t.enabled?"border-line bg-inset/30 hover:border-line-strong hover:bg-hover/20":"border-line/60 bg-page/50 opacity-60"}"
              >
                
                <div class="flex items-center justify-between p-3">
                  <div class="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      data-toggle="${t.id}"
                      class="toggle-btn size-3.5 rounded-full border transition-colors cursor-pointer ${t.enabled?"border-accent bg-accent":"border-line bg-surface"}"
                      title="${t.enabled?e?"禁用插件":"Disable plugin":e?"启用插件":"Enable plugin"}"
                    ></button>
                    <span class="text-[12.5px] font-mono font-medium text-ink truncate">
                      ${t.name}
                    </span>
                    <span class="rounded-chip border border-line bg-surface px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                      v${t.version}
                    </span>
                    <span
                      class="rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${s}"
                    >
                      ${i}
                    </span>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <span class="font-mono text-[10px] text-ink-3">
                      rev #${t.hmrVersion}
                    </span>
                    <button
                      type="button"
                      data-hmr="${t.id}"
                      ${n||!t.enabled?"disabled":""}
                      class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class="${n?"animate-spin text-accent":""}"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>${n?e?"重载中...":"Reloading...":"HMR"}</span>
                    </button>
                  </div>
                </div>

                
                ${t.enabled?`
                  <div class="border-t border-line/60 bg-surface/50 px-3 py-2 text-[11px]">
                    ${t.services.map((t,n)=>`
                      <div class="flex flex-col gap-1 ${n>0?"mt-2":""}">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-1.5">
                            <span class="font-mono text-[10.5px] font-semibold text-accent-ink">
                              ${t.name}
                            </span>
                            <span class="text-ink-3">→</span>
                            <span class="font-mono text-[10px] text-ink-2 truncate max-w-[180px]">
                              ${t.provider}
                            </span>
                          </div>
                          <span class="font-mono text-[9.5px] text-ink-3">
                            ${t.consumers.length} ${e?"个消费者":"consumers"}
                          </span>
                        </div>
                        <div class="flex flex-wrap gap-1 mt-0.5">
                          ${t.consumers.map(e=>`
                            <span
                              class="rounded-chip border border-line/80 bg-field px-1.5 py-0.2 font-mono text-[9px] text-ink-2"
                            >
                              ${e}
                            </span>
                          `).join("")}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>

        
        <div class="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"Harness.Boot 容器已在 84ms 内装配":"Harness.Boot container loaded in 84ms"}</span>
          <span class="font-mono">Cordis v0.10.2</span>
        </div>
      </div>
    `,n),this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-hmr]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-hmr");this.handleTriggerHmr(t)})})}}"u">typeof customElements&&!customElements.get("nai-cordis-plugin-tree")&&customElements.define("nai-cordis-plugin-tree",eT);let eB=[{id:"strict",nameEn:"Strict Sandboxed",nameZh:"严格沙盒隔离",sandbox:"E2B Cloud",approvalEn:"Strict Prompt",approvalZh:"全量拦截审批",descEn:"Isolated remote container. Prompt user before all file edits, shell commands, and outbound HTTP.",descZh:"在远程隔离容器中执行。任何文件修改、终端命令及外网 HTTP 调用均需用户手动确认。",icon:"shield"},{id:"balanced",nameEn:"Balanced Dev",nameZh:"开发平衡模式",sandbox:"Local Process",approvalEn:"Write-Only Prompt",approvalZh:"仅写操作审批",descEn:"Local sandbox with workspace isolation. Read operations auto-approve; write/exec prompt once.",descZh:"本地沙盒与工作区隔离。读操作自动放行；文件写入与命令执行仅提示一次。",icon:"scale"},{id:"autonomous",nameEn:"Autonomous Agent",nameZh:"全自主执行模式",sandbox:"Local Process",approvalEn:"Autonomous",approvalZh:"完全自主",descEn:"Full automated execution. Retains durable exactly-once audit ledger in SQLite.",descZh:"全自动执行流。在 SQLite 中保留可完整重放的 Exactly-Once 审计账本。",icon:"bolt"}],eq=[{id:"aud-1",action:"fs.write",target:"src/Harness.Core/Session.cs",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:12",hash:"e4f8a1...3b9c"},{id:"aud-2",action:"shell.exec",target:"dotnet build Harness.slnx",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:19",hash:"82a0bc...19d4"},{id:"aud-3",action:"fs.read",target:"NuGet.config",statusEn:"Auto-Allowed",statusZh:"自动放行",timestamp:"21:48:22",hash:"6c7d1e...90fa"}];class eH extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedPreset="balanced",this._isReplaying=!1,this._replayVerified=!1}handleSelectPreset(e){this._selectedPreset=e,this.render()}handleReplayAudit(){this._isReplaying=!0,this._replayVerified=!1,this.render(),this.registerTimeout(()=>{this._isReplaying=!1,this._replayVerified=!0,this.render()},900)}render(){let e=this.isZh,t=this._selectedPreset,n=this._isReplaying,s=this._replayVerified,i=`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        <!-- Header -->
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-orange-tint text-orange">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div>
              <h3 class="text-[13px] font-semibold text-ink">
                ${e?"权限预设与审计重放":"Permission Presets & Auditing"}
              </h3>
              <p class="text-[11px] text-ink-3">
                ${e?"Harness 权限 Bundle 与持久化不可变事实":"Harness authorization bundle & durable facts"}
              </p>
            </div>
          </div>

          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-2">
            ${e?"Exactly-Once 审计":"Exactly-Once Audit"}
          </span>
        </div>

        <!-- Preset Selector Grid -->
        <div class="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-2">
          ${eB.map(n=>{var s;let i=t===n.id;return`
              <div
                data-preset="${n.id}"
                class="preset-tile preset-item flex flex-col justify-between rounded-control border p-2.5 transition-all cursor-pointer ${i?"border-accent bg-accent-tint/30 shadow-sm ring-1 ring-accent":"border-line bg-inset/40 hover:border-line-strong hover:bg-hover/30"}"
              >
                <div>
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="flex size-4 items-center justify-center ${i?"text-accent-ink":"text-ink-2"}">
                      ${"shield"===(s=n.icon)?`
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        `:"scale"===s?`
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18M8 21h8M3 7h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zm14 0h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zM5 7l7-4 7 4" transform="translate(1 0) scale(0.92)" />
          </svg>
        `:`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      `}
                    </span>
                    <span class="text-[12px] font-semibold text-ink">
                      ${e?n.nameZh:n.nameEn}
                    </span>
                  </div>
                  <p class="text-[10.5px] text-ink-2 leading-tight">
                    ${e?n.descZh:n.descEn}
                  </p>
                </div>

                <div class="mt-2.5 flex flex-col gap-1 border-t border-line/60 pt-2 font-mono text-[9.5px]">
                  <div class="flex justify-between text-ink-3">
                    <span>${e?"沙盒:":"Sandbox:"}</span>
                    <span class="text-ink font-medium">${n.sandbox}</span>
                  </div>
                  <div class="flex justify-between text-ink-3">
                    <span>${e?"审批:":"Approval:"}</span>
                    <span class="text-ink font-medium">
                      ${e?n.approvalZh:n.approvalEn}
                    </span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>

        <!-- Exactly-Once Audit Trail -->
        <div class="mt-4 rounded-control border border-line bg-inset/50 p-3">
          <div class="flex items-center justify-between pb-2 border-b border-line/60">
            <div class="flex items-center gap-1.5">
              <span class="text-[11.5px] font-semibold text-ink">
                ${e?"可重放审计流水 (Audit Trail)":"Replayable Audit Trail"}
              </span>
              ${s?`
                <span class="flex items-center gap-0.5 text-green font-mono text-[10px]">
                  ${e?"✓ 校验通过":"✓ Validated"}
                </span>
              `:""}
            </div>
            <button
              type="button"
              id="btn-replay-audit"
              ${n?"disabled":""}
              class="flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${n?e?"正在重放校验...":"Verifying...":e?"重放审计":"Replay Audit"}
            </button>
          </div>

          <div class="mt-2 flex flex-col divide-y divide-line/40">
            ${eq.map(t=>`
              <div class="flex items-center justify-between py-1.5 text-[11px]">
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${"Approved"===t.statusEn?"bg-green-tint text-green":"Denied"===t.statusEn?"bg-red-tint text-red":"bg-accent-tint text-accent-ink"}"
                  >
                    ${e?t.statusZh:t.statusEn}
                  </span>
                  <span class="font-mono text-[11px] font-medium text-ink truncate max-w-[200px]">
                    ${t.action}: ${t.target}
                  </span>
                </div>
                <div class="flex items-center gap-2 shrink-0 font-mono text-[10px] text-ink-3">
                  <span>${t.timestamp}</span>
                  <span class="rounded bg-field px-1 py-0.2">${t.hash}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;this.setHtml(i),this.shadowRoot.querySelectorAll(".preset-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-preset");t&&this.handleSelectPreset(t)})}),this.shadowRoot.querySelector("#btn-replay-audit")?.addEventListener("click",()=>{this.handleReplayAudit()})}}"u">typeof customElements&&!customElements.get("nai-permission-preset-card")&&customElements.define("nai-permission-preset-card",eH);let eI=[{id:"diag-1",severity:"error",code:"CS0103",messageEn:"The name 'ContextSpilloverService' does not exist in the current context.",messageZh:"当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",file:"src/Harness.Compaction/Compactor.cs",line:38,col:14},{id:"diag-2",severity:"warning",code:"CS8618",messageEn:"Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",messageZh:"不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",file:"src/Harness.Session.Persistence/SqliteSessionStore.cs",line:22,col:29},{id:"diag-3",severity:"warning",code:"CA2000",messageEn:"Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",messageZh:"在失去作用域前释放对象: 'CancellationTokenSource' 从未被显式 Dispose 释放。",file:"src/Harness.CodeRuntime/WorkerProcess.cs",line:74,col:21}];class eP extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all",this._diagnostics=JSON.parse(JSON.stringify(eI)),this._fixedIds=[]}setFilter(e){this._filter=e,this.render()}handleFix(e){this._fixedIds.push(e),this.render(),this.registerTimeout(()=>{this._diagnostics=this._diagnostics.filter(t=>t.id!==e),this._fixedIds=this._fixedIds.filter(t=>t!==e),this.render()},600)}render(){let e=this.isZh,t=this._diagnostics.filter(e=>"all"===this._filter||e.severity===this._filter),n=`
      .border-red\\/30 { border-color: color-mix(in srgb, var(--red, #e3474c) 30%, transparent); }
      .border-red\\/50 { border-color: color-mix(in srgb, var(--red, #e3474c) 50%, transparent); }
      .bg-red-tint\\/20 { background-color: color-mix(in srgb, var(--red-tint, #fcecec) 20%, transparent); }
      .border-orange\\/30 { border-color: color-mix(in srgb, var(--orange, #ef720c) 30%, transparent); }
      .border-orange\\/50 { border-color: color-mix(in srgb, var(--orange, #ef720c) 50%, transparent); }
      .bg-orange-tint\\/20 { background-color: color-mix(in srgb, var(--orange-tint, #fdf1e5) 20%, transparent); }
      .border-accent\\/40 { border-color: color-mix(in srgb, var(--accent, #0285ff) 40%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .scale-98 { transform: scale(0.98); }
      .leading-snug { line-height: 1.375; }
    `;this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"Roslyn LSP 实时诊断":"LSP Diagnostics"}
                </h3>
                <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                  Roslyn LSP
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${e?"Harness.Lsp 工作区静态分析诊断流":"Harness.Lsp live workspace analyzer stream"}
              </p>
            </div>
          </div>

          
          <div class="flex rounded-control bg-field p-0.5 text-[11px]">
            ${["all","error","warning"].map(t=>`
                <button
                  type="button"
                  data-tab="${t}"
                  class="filter-btn rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${this._filter===t?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
                >
                  ${"all"===t?e?"全部":"All":"error"===t?e?"错误":"Errors":e?"警告":"Warnings"}
                </button>
              `).join("")}
          </div>
        </div>

        
        <div class="mt-3.5 flex flex-col gap-2">
          ${0===t.length?`
            <div class="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-green">
              ${e?"✓ 当前工作区内无活动编译错误或警告。":"✓ Zero active compilation errors or warnings."}
            </div>
          `:t.map(t=>{let n=this._fixedIds.includes(t.id);return`
                <div
                  class="flex flex-col gap-1.5 rounded-control border p-3 transition-all ${"error"===t.severity?"border-red/30 bg-red-tint/20 hover:border-red/50":"border-orange/30 bg-orange-tint/20 hover:border-orange/50"} ${n?"opacity-40 scale-98":""}"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 min-w-0">
                      <span
                        class="size-2 rounded-full shrink-0 ${"error"===t.severity?"bg-red":"bg-orange"}"
                      ></span>
                      <span class="font-mono text-[10.5px] font-semibold text-ink">
                        ${t.code}
                      </span>
                      <span class="font-mono text-[10.5px] text-ink-3 truncate">
                        ${t.file}:${t.line}:${t.col}
                      </span>
                    </div>

                    <button
                      type="button"
                      data-fix="${t.id}"
                      class="btn-fix flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-accent-ink hover:bg-accent-tint hover:border-accent/40 transition-colors cursor-pointer shrink-0"
                    >
                      <span>${n?e?"修复中...":"Fixing...":e?"一键修复":"Auto-Fix"}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <p class="text-[11.5px] text-ink leading-snug">
                    ${e?t.messageZh:t.messageEn}
                  </p>
                </div>
              `}).join("")}
        </div>

        
        <div class="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"目标框架: .NET 10.0":"Target framework: .NET 10.0"}</span>
          <span class="font-mono">
            ${this._diagnostics.length} ${e?"个作用域内问题":"issues in scope"}
          </span>
        </div>
      </div>
    `,n),this.shadowRoot.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");this.setFilter(t)})}),this.shadowRoot.querySelectorAll("[data-fix]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-fix");this.handleFix(t)})})}}"u">typeof customElements&&!customElements.get("nai-lsp-diagnostics")&&customElements.define("nai-lsp-diagnostics",eP);let eN=[{pid:1402,command:"dotnet run --project src/Harness.Boot",cpuPct:12.4,memMb:240,uptimeEn:"8m 12s",uptimeZh:"8分12秒"},{pid:1489,command:"node ./worker/lsp-bridge.js",cpuPct:3.1,memMb:85,uptimeEn:"6m 40s",uptimeZh:"6分40秒"}];class eO extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._isRunning=!0,this._cpuUsage=15.5,this._memUsage=325}handleRestart(){this._isRunning=!1,this.render(),this.registerTimeout(()=>{this._isRunning=!0,this._cpuUsage=8.2,this._memUsage=212,this.render()},1e3)}render(){let e=this.isZh,t=`
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-inset\\/30 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 30%, transparent); }
      .divide-line\\/60 > * + * { border-top-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .max-w-\\[240px\\] { max-width: 240px; }
    `;this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-green-tint text-green">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"E2B 容器沙盒运行态":"E2B Sandbox Container"}
                </h3>
                <span
                  class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${this._isRunning?"bg-green-tint text-green":"bg-orange-tint text-orange"}"
                >
                  ${this._isRunning?e?"运行中":"Running":e?"重启中...":"Restarting..."}
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${e?"隔离环境 Linux x86_64 • Harness.Sandbox.E2b":"Isolated Linux x86_64 • Harness.Sandbox.E2b"}
              </p>
            </div>
          </div>

          <button
            type="button"
            id="btn-restart"
            ${!this._isRunning?"disabled":""}
            class="flex items-center gap-1 rounded-control border border-line bg-field px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer disabled:opacity-50"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>${e?"重启容器":"Restart Container"}</span>
          </button>
        </div>

        
        <div class="mt-3.5 grid grid-cols-2 gap-2.5">
          <div class="rounded-control border border-line bg-inset/40 p-3">
            <div class="flex items-baseline justify-between">
              <span class="text-[11px] text-ink-3">${e?"vCPU 算力利用率":"vCPU Utilization"}</span>
              <span class="font-mono text-[12px] font-semibold text-ink">${this._cpuUsage}%</span>
            </div>
            <div class="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
              <div
                class="h-full bg-accent rounded-full transition-all duration-500"
                style="width: ${2*this._cpuUsage}%;"
              ></div>
            </div>
            <span class="mt-1 block font-mono text-[9.5px] text-ink-3">
              ${e?"独占 2 核心 vCPU":"2 vCPUs dedicated"}
            </span>
          </div>

          <div class="rounded-control border border-line bg-inset/40 p-3">
            <div class="flex items-baseline justify-between">
              <span class="text-[11px] text-ink-3">${e?"内存占用 (RAM)":"Memory (RAM)"}</span>
              <span class="font-mono text-[12px] font-semibold text-ink">${this._memUsage} MB</span>
            </div>
            <div class="mt-2 h-1.5 w-full rounded-full bg-line overflow-hidden">
              <div
                class="h-full bg-green rounded-full transition-all duration-500"
                style="width: ${this._memUsage/2048*100}%;"
              ></div>
            </div>
            <span class="mt-1 block font-mono text-[9.5px] text-ink-3">
              ${e?"内存配额上限: 2,048 MB":"Limit: 2,048 MB"}
            </span>
          </div>
        </div>

        
        <div class="mt-3.5 rounded-control border border-line bg-inset/30 p-3">
          <span class="text-[11px] font-semibold text-ink">
            ${e?"活动隔离进程树":"Active Isolated Processes"}
          </span>
          <div class="mt-2 flex flex-col divide-y divide-line/60">
            ${eN.map(e=>`
              <div class="flex items-center justify-between py-2 text-[11px]">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="font-mono text-[10px] text-ink-3">#${e.pid}</span>
                  <span class="font-mono text-[11px] font-medium text-ink truncate max-w-[240px]">
                    ${e.command}
                  </span>
                </div>
                <div class="flex items-center gap-2 font-mono text-[10px] text-ink-2 shrink-0">
                  <span>${e.cpuPct}% CPU</span>
                  <span>•</span>
                  <span>${e.memMb} MB</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,t),this.shadowRoot.querySelector("#btn-restart")?.addEventListener("click",()=>{this.handleRestart()})}}"u">typeof customElements&&!customElements.get("nai-sandbox-manager")&&customElements.define("nai-sandbox-manager",eO);let eD=[{id:"job-1",nameEn:"Vector Embeddings Sync & Reindex",nameZh:"向量嵌入同步与全量重索引",cron:"0 */4 * * *",nextRunEn:"In 1h 24m",nextRunZh:"1小时24分后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-2",nameEn:"Durable SQLite Session Snapshot",nameZh:"SQLite 会话不可变事实快照",cron:"0 * * * *",nextRunEn:"In 18m",nextRunZh:"18分钟后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-3",nameEn:"Telemetry Batch Export & Rollup",nameZh:"遥测遥控日志批量聚合导出",cron:"0 0 * * *",nextRunEn:"At 00:00 UTC",nextRunZh:"今天 00:00 UTC",lastStatusEn:"Running",lastStatusZh:"执行中",enabled:!0}];class eF extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._jobs=JSON.parse(JSON.stringify(eD)),this._triggeringId=null}handleToggle(e){this._jobs=this._jobs.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerNow(e){this._triggeringId=e,this.render(),this.registerTimeout(()=>{this._triggeringId=null,this.render()},1200)}render(){let e=this.isZh,t=this._jobs.filter(e=>e.enabled).length,n=`
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-hover\\/20 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
      .bg-page\\/40 { background-color: color-mix(in srgb, var(--page, #fafafb) 40%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-3\\.5 { width: 14px; height: 14px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
    `;this.setHtml(`
      <div class="w-full max-w-xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"持久化任务与 Cron 调度":"Durable Job Scheduler"}
                </h3>
                <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                  Harness.Jobs
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${e?"后台持久化 Cron 触发器与执行队列":"Durable background cron triggers & queue"}
              </p>
            </div>
          </div>

          <span class="font-mono text-[11px] text-ink-2">
            ${t} ${e?"个活跃 Cron":"Active Crons"}
          </span>
        </div>

        
        <div class="mt-3.5 flex flex-col gap-2">
          ${this._jobs.map(t=>{let n=this._triggeringId===t.id,s="Success"===t.lastStatusEn?"bg-green-tint text-green":"Failed"===t.lastStatusEn?"bg-red-tint text-red":"bg-accent-tint text-accent-ink",i=e?t.lastStatusZh:t.lastStatusEn;return`
              <div
                class="flex items-center justify-between rounded-control border p-3 transition-all ${t.enabled?"border-line bg-inset/40 hover:border-line-strong hover:bg-hover/20":"border-line/60 bg-page/40 opacity-60"}"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    data-toggle="${t.id}"
                    class="toggle-btn size-3.5 rounded-full border transition-colors cursor-pointer shrink-0 ${t.enabled?"border-accent bg-accent":"border-line bg-surface"}"
                    title="${t.enabled?e?"禁用定时任务":"Disable cron":e?"启用定时任务":"Enable cron"}"
                  ></button>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[12px] font-medium text-ink truncate">
                        ${e?t.nameZh:t.nameEn}
                      </span>
                      <span class="rounded-chip bg-field px-1.5 py-0.2 font-mono text-[9.5px] text-ink-2">
                        ${t.cron}
                      </span>
                    </div>
                    <span class="text-[10.5px] text-ink-3">
                      ${e?"下次运行: ":"Next run: "}
                      ${e?t.nextRunZh:t.nextRunEn}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0 pl-2">
                  <span
                    class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${s}"
                  >
                    ${i}
                  </span>

                  <button
                    type="button"
                    data-trigger="${t.id}"
                    ${n||!t.enabled?"disabled":""}
                    class="btn-trigger rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    ${n?e?"触发中...":"Running...":e?"立即触发":"Trigger"}
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,n),this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-trigger]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-trigger");this.handleTriggerNow(t)})})}}"u">typeof customElements&&!customElements.get("nai-job-scheduler")&&customElements.define("nai-job-scheduler",eF);let eV=[{id:"fs",name:"filesystem",transport:"stdio",status:"connected",latencyMs:3,tools:[{qualified:"filesystem__read_file",descEn:"Read a workspace file",descZh:"读取工作区文件"},{qualified:"filesystem__write_file",descEn:"Write within declared scopes",descZh:"在声明范围内写文件"},{qualified:"filesystem__grep",descEn:"ripgrep over the repo",descZh:"对仓库执行 ripgrep"}]},{id:"rg",name:"ripgrep",transport:"stdio",status:"connected",latencyMs:5,tools:[{qualified:"ripgrep__search",descEn:"Pattern search with globs",descZh:"带 glob 的模式搜索"},{qualified:"ripgrep__files",descEn:"List files matching a glob",descZh:"按 glob 列出文件"}]},{id:"web",name:"web-fetch",transport:"stdio",status:"error",tools:[],errorEn:"handshake timeout after 10s · exit 1",errorZh:"握手 10 秒超时 · 退出码 1"}],eW={connected:{dot:"bg-green",chip:"bg-green-tint text-green",labelEn:"connected",labelZh:"已连接"},handshaking:{dot:"bg-orange animate-pulse",chip:"bg-orange-tint text-orange",labelEn:"handshake",labelZh:"握手中"},error:{dot:"bg-red",chip:"bg-red-tint text-red",labelEn:"error",labelZh:"错误"}};class eU extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._expanded="fs",this._retrying=!1,this._recovered=!1}toggleExpand(e){this._expanded=this._expanded===e?null:e,this.render()}handleRetry(){this._retrying=!0,this.render(),this.registerTimeout(()=>{this._retrying=!1,this._recovered=!0,this.render()},1600)}render(){let e=this.isZh,t=this._recovered?"connected":this._retrying?"handshaking":"error",n=eV.filter(e=>("web"===e.id?t:e.status)==="connected").length,s=eV.reduce((e,t)=>e+t.tools.length,0)+2*!!this._recovered,i=`
      .bg-hover\\/30 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 30%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-2 { width: 8px; height: 8px; }
      .size-3 { width: 12px; height: 12px; }
      .py-px { padding-top: 1px; padding-bottom: 1px; }
      .border-t-orange { border-top-color: var(--orange, #ef720c); }
      .border-\\[1\\.5px\\] { border-width: 1.5px; }
      .rotate-180 { transform: rotate(180deg); }
    `;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-2 rounded-full bg-green"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"MCP 服务器":"MCP Servers"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              v2024-11-05
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">
            ${n}/${eV.length} \xb7 ${s} tools
          </span>
        </div>

        
        <div class="flex flex-col gap-1.5">
          ${eV.map(n=>{let s="web"===n.id?t:n.status,i=eW[s],r=this._expanded===n.id,o="web"===n.id&&this._recovered?[{qualified:"web-fetch__get",descEn:"GET a URL as markdown",descZh:"以 markdown 获取 URL"},{qualified:"web-fetch__search",descEn:"Web search",descZh:"网页搜索"}]:n.tools,a="web"===n.id?41:n.latencyMs;return`
              <div
                class="rounded-control border transition-colors ${r?"border-line-strong bg-hover/30":"border-line bg-surface"}"
              >
                <div
                  role="button"
                  tabindex="0"
                  data-expand="${n.id}"
                  class="server-row flex w-full items-center gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <span class="size-2 shrink-0 rounded-full ${i.dot}"></span>
                  <code class="font-mono text-[11.5px] font-medium text-ink">${n.name}</code>
                  <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                    ${n.transport}
                  </span>
                  <span class="ml-auto shrink-0 rounded-chip px-1.5 py-px font-mono text-[9.5px] font-medium ${i.chip}">
                    ${e?i.labelZh:i.labelEn}
                  </span>
                  ${"connected"===s&&void 0!==a?`
                    <span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">
                      ${a}ms
                    </span>
                  `:""}
                  <svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 transition-transform duration-200 ${r?"rotate-180":""}"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                ${r?`
                  <div class="border-t border-line/60 px-2.5 py-2" style="animation: fade-up 250ms cubic-bezier(0.23,1,0.32,1) both;">
                    ${"error"===s?`
                      <div class="flex items-center justify-between gap-2">
                        <span class="truncate font-mono text-[10.5px] text-red">
                          ${e?n.errorZh:n.errorEn}
                        </span>
                        <button
                          type="button"
                          id="btn-retry-mcp"
                          class="flex shrink-0 items-center gap-1 rounded-chip border border-line bg-surface px-2 py-1 text-[10.5px] font-medium text-ink-2 transition-colors hover:bg-hover hover:text-ink cursor-pointer"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                          </svg>
                          ${e?"重连":"Retry"}
                        </button>
                      </div>
                    `:"handshaking"===s?`
                      <div class="flex items-center gap-2">
                        <span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-orange animate-spin"></span>
                        <span class="font-mono text-[10.5px] text-ink-3">
                          initialize → tools/list…
                        </span>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1">
                        ${o.map(t=>`
                          <div class="flex items-baseline gap-2">
                            <code class="shrink-0 font-mono text-[10.5px] text-accent-ink">${t.qualified}</code>
                            <span class="truncate text-[10.5px] text-ink-3">
                              ${e?t.descZh:t.descEn}
                            </span>
                          </div>
                        `).join("")}
                      </div>
                    `}
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>

        
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"工具以 server__tool 限定名注册":"Tools register as server__tool"}</span>
          <span class="font-mono">Harness.Mcp</span>
        </div>
      </div>
    `,i),this.shadowRoot.querySelectorAll("[data-expand]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-expand");this.toggleExpand(t)}),e.addEventListener("keydown",t=>{if("Enter"===t.key||" "===t.key){t.preventDefault();let n=e.getAttribute("data-expand");this.toggleExpand(n)}})}),this.shadowRoot.querySelector("#btn-retry-mcp")?.addEventListener("click",e=>{e.stopPropagation(),this.handleRetry()})}}"u">typeof customElements&&!customElements.get("nai-mcp-servers")&&customElements.define("nai-mcp-servers",eU);let eK=`import React from 'react';

export function MetricsWidget({ title, value, change }: Props) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <span className="text-xs text-ink-2">{title}</span>
      <div className="mt-1 flex items-baseline gap-2">
        <h3 className="text-xl font-semibold text-ink">{value}</h3>
        <span className="text-xs font-medium text-green">{change}</span>
      </div>
    </div>
  );
}`;async function eG(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}class eJ extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._tab="preview",this._viewport="desktop",this._copied=!1,this._copyError=!1}setTab(e){this._tab=e,this.render()}setViewport(e){this._viewport=e,this.render()}async handleCopy(){this._copyError=!1;try{if(!await eG(eK)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1600)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh,t=this._tab,n=this._viewport,s=this._copied,i=this._copyError;this.setHtml(`
      <div class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card">
        
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-inset px-3.5 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[12.5px] font-semibold text-ink">MetricsWidget.tsx</span>
                <span class="rounded-chip border border-line bg-surface px-1.5 py-0.5 font-mono text-[9.5px] text-ink-3">
                  v2.1
                </span>
              </div>
            </div>
          </div>

          
          <div class="flex items-center gap-2">
            
            <div class="flex rounded-control bg-field p-0.5 text-[11px]">
              <button
                type="button"
                id="tab-preview"
                class="rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"preview"===t?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
              >
                ${e?"实时预览":"Preview"}
              </button>
              <button
                type="button"
                id="tab-code"
                class="rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"code"===t?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
              >
                ${e?"代码":"Code"}
              </button>
            </div>

            
            ${"preview"===t?`
              <div class="hidden sm:flex items-center gap-1 rounded-control bg-field p-0.5 text-ink-3">
                <button
                  type="button"
                  id="vp-desktop"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"desktop"===n?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
                  title="${e?"桌面端":"Desktop"}"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </button>
                <button
                  type="button"
                  id="vp-tablet"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"tablet"===n?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
                  title="${e?"平板端":"Tablet"}"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>
                <button
                  type="button"
                  id="vp-mobile"
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"mobile"===n?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
                  title="${e?"移动端":"Mobile"}"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </button>
              </div>
            `:""}

            
            <button
              type="button"
              id="btn-copy"
              aria-label="${e?"复制":"Copy"}"
              class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${i?`
                <span role="status" aria-live="polite" class="text-red">
                  ${e?"复制失败":"Copy failed"}
                </span>
              `:s?`
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-green" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span role="status" aria-live="polite" class="text-green">
                  ${e?"已复制":"Copied"}
                </span>
              `:`
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>${e?"复制代码":"Copy"}</span>
              `}
            </button>
          </div>
        </div>

        
        <div class="flex min-h-[220px] items-center justify-center bg-canvas p-6 transition-all">
          ${"preview"===t?`
            <div class="transition-all duration-300 w-full ${"mobile"===n?"max-w-[280px]":"tablet"===n?"max-w-[380px]":"max-w-md"}">
              
              <div class="grid grid-cols-2 gap-3 rounded-control border border-line bg-surface p-4 shadow-sm">
                <div class="flex flex-col">
                  <span class="text-[11px] text-ink-3">${e?"日活跃用户 (DAU)":"Daily Active Users"}</span>
                  <span class="font-mono text-[16px] font-semibold text-ink mt-0.5">24,582</span>
                  <span class="font-mono text-[10px] text-green font-medium mt-1">↑ +14.2%</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-[11px] text-ink-3">${e?"平均响应延迟":"Avg Latency"}</span>
                  <span class="font-mono text-[16px] font-semibold text-ink mt-0.5">184ms</span>
                  <span class="font-mono text-[10px] text-green font-medium mt-1">↓ -18.4%</span>
                </div>
                <div class="col-span-2 mt-1 border-t border-line pt-2 flex items-center justify-between text-[10.5px] text-ink-3">
                  <span>${e?"2分钟前已自动刷新":"Auto-refreshed 2m ago"}</span>
                  <span class="text-accent cursor-pointer hover:underline">
                    ${e?"查看遥测数据 →":"View telemetry →"}
                  </span>
                </div>
              </div>
            </div>
          `:`
            <div class="w-full overflow-x-auto rounded-control border border-line bg-page p-3 font-mono text-[11px] leading-relaxed text-ink-2">
              <pre><code>${eK.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}</code></pre>
            </div>
          `}
        </div>

        
        <div class="flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3">
          <span>${e?"技术栈: React 19 + Tailwind CSS":"Framework: React 19 + Tailwind CSS"}</span>
          <span class="font-mono">${e?"编译耗时: 12ms":"Compiled in 12ms"}</span>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#tab-preview")?.addEventListener("click",()=>this.setTab("preview")),this.shadowRoot?.querySelector("#tab-code")?.addEventListener("click",()=>this.setTab("code")),this.shadowRoot?.querySelector("#vp-desktop")?.addEventListener("click",()=>this.setViewport("desktop")),this.shadowRoot?.querySelector("#vp-tablet")?.addEventListener("click",()=>this.setViewport("tablet")),this.shadowRoot?.querySelector("#vp-mobile")?.addEventListener("click",()=>this.setViewport("mobile")),this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click",()=>this.handleCopy())}}"u">typeof customElements&&!customElements.get("nai-artifact-sandbox")&&customElements.define("nai-artifact-sandbox",eJ);let eQ=[{en:"Flavor",zh:"风味"},{en:"Category",zh:"分类"},{en:"Supplier",zh:"供应商"}],eY=[{nameEn:"Rocky Road",nameZh:"石板街",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"aurora-scoops",removed:!0},{nameEn:"Bubblegum",nameZh:"泡泡糖",dept:"Retro",deptEn:"Retro",deptZh:"复古",email:"kumo-creamery",removed:!0},{nameEn:"Mint Chip",nameZh:"薄荷巧克力",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"maple-orbit",removed:!1}],eX={Classic:"bg-accent",Retro:"bg-ink-3",Seasonal:"bg-orange"};class e1 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._stage=0}onMount(){this._startStageProgression()}_startStageProgression(){this._stage=0,this.render(),this.registerTimeout(()=>{this._stage=1,this.render(),this.registerTimeout(()=>{this._stage=2,this.render(),this.registerTimeout(()=>{this._stage=3,this.render()},1e3)},1e3)},800)}render(){let e=this.isZh,t=this._stage>=2,n=this._stage>=3;this.setHtml(`
      <div class="w-full max-w-95">
        <div class="relative overflow-hidden rounded-card bg-surface shadow-card">
          <div class="primitive-card-bar flex items-center justify-between border-b border-line">
            <span class="card-title text-[12.5px] font-medium text-ink">${e?"菜单清理建议":"Proposed menu cleanup"}</span>
          </div>

          <table class="w-full table-fixed border-collapse text-left">
            <colgroup>
              <col class="w-[34%]" />
              <col class="w-[30%]" />
              <col class="w-[36%]" />
            </colgroup>
            <thead>
              <tr class="border-b border-line">
                ${eQ.map(t=>`
                  <th class="primitive-table-cell text-[12px] font-medium text-ink-3">
                    ${e?t.zh:t.en}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${eY.map(n=>{let s=n.removed&&t,i=eX[n.dept]||"bg-ink-3";return`
                  <tr
                    class="row-item border-b border-line transition-colors duration-400 last:border-0 hover:bg-hover"
                    style="${s?"background: var(--red-tint);":""}"
                  >
                    <td
                      class="primitive-table-cell text-[13px] font-medium tabular-nums transition-colors duration-400"
                      style="${s?"color: var(--red);":"color: var(--ink);"}"
                    >
                      ${e?n.nameZh:n.nameEn}
                    </td>
                    <td class="primitive-table-cell">
                      <span
                        class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-inset px-2 text-[11.5px] font-medium shadow-hairline transition-opacity duration-400"
                        style="opacity: ${s?.55:1};"
                      >
                        <span class="size-1.5 rounded-full ${i}"></span>
                        <span class="text-ink-2">${e?n.deptZh:n.deptEn}</span>
                      </span>
                    </td>
                    <td
                      class="primitive-table-cell text-[12.5px] whitespace-nowrap transition-colors duration-400"
                      style="${s?"color: var(--red); text-decoration-line: line-through; text-decoration-color: color-mix(in srgb, var(--red) 50%, transparent);":"color: var(--ink-2); text-decoration-line: none;"}"
                    >
                      ${n.email}
                    </td>
                  </tr>
                `}).join("")}
              <!-- added row -->
              <tr>
                <td colspan="3" class="p-0">
                  <div
                    class="grid transition-[grid-template-rows,opacity] duration-400"
                    style="grid-template-rows: ${n?"1fr":"0fr"}; opacity: ${+!!n}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                  >
                    <div class="overflow-hidden" style="background: var(--green-tint);">
                      <div class="grid grid-cols-[34%_30%_36%] items-center border-t border-line">
                        <span class="primitive-table-cell text-[13px] font-medium text-green tabular-nums">
                          ${e?"开心果":"Pistachio"}
                        </span>
                        <span class="primitive-table-cell">
                          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-surface px-2 text-[11.5px] font-medium shadow-hairline">
                            <span class="size-1.5 rounded-full bg-green"></span>
                            <span class="text-ink-2">${e?"季节限定":"Seasonal"}</span>
                          </span>
                        </span>
                        <span class="primitive-table-cell text-[13px] text-green">
                          maple-orbit
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `)}}"u">typeof customElements&&!customElements.get("nai-diff-table")&&customElements.define("nai-diff-table",e1);let e0={strong:{labelEn:"Very strong",labelZh:"非常强",color:"var(--green)",rank:3},weak:{labelEn:"Weak",labelZh:"较弱",color:"var(--orange)",rank:2},veryweak:{labelEn:"Very weak",labelZh:"非常弱",color:"var(--red)",rank:1},none:{labelEn:"No communication",labelZh:"无沟通",color:"var(--ink-3)",rank:0}},e2={B2B:"#f09a2f",B2C:"#92b72d",Cafe:"#ee6572",Catering:"#c84f9d","Dairy-free":"#16a6c7",Gelato:"#9a5cff",Imports:"#3f78ff",Local:"#25a878",Seasonal:"#f09a2f",Sorbet:"#16a6c7",Vegan:"#92b72d",Wholesale:"#3f78ff"},e5=[{id:"aurora",name:"Aurora Scoops — Reykjavík",tags:["Gelato","Seasonal"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"aurora-scoops.example.com"},{id:"kumo",name:"Kumo Creamery — Tokyo",tags:["B2C","Cafe","Vegan"],lastEn:"3 weeks ago",lastZh:"3 周前",strength:"strong",website:"kumo-creamery.example.com"},{id:"sol-nieve",name:"Sol y Nieve — Buenos Aires",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"sol-y-nieve.example.com"},{id:"maple-orbit",name:"Maple Orbit — Montréal",tags:["B2B","Wholesale","Seasonal"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"maple-orbit.example.com"},{id:"blue-fig",name:"Blue Fig Gelato — Florence",tags:["Gelato","Cafe"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"blue-fig.example.com"},{id:"sahara-swirl",name:"Sahara Swirl — Marrakech",tags:["Sorbet","Local"],lastEn:"5 months ago",lastZh:"5 个月前",strength:"veryweak"},{id:"cloudberry",name:"Cloudberry Cone — Helsinki",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none",website:"cloudberry-cone.example.com"},{id:"palm-sugar",name:"Palm Sugar Creamery — Bangkok",tags:["B2C","Vegan"],lastEn:"3 months ago",lastZh:"3 个月前",strength:"veryweak",website:"palm-sugar.example.com"},{id:"cape-vanilla",name:"Cape Vanilla Co. — Cape Town",tags:["Wholesale","Imports"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"cape-vanilla.example.com"},{id:"andes-snow",name:"Andes Snow Creamery — Quito",tags:["Gelato","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak"},{id:"tasman-sea",name:"Tasman Sea Gelato — Hobart",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"tasman-sea.example.com"},{id:"silk-road",name:"Silk Road Sorbet — Tbilisi",tags:["Sorbet","Imports"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"weak",website:"silk-road.example.com"},{id:"rosewater",name:"Rosewater Kulfi — Jaipur",tags:["B2C","Seasonal"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"veryweak"},{id:"lumen",name:"Lumen Soft Serve — Copenhagen",tags:["Dairy-free","Cafe"],lastEn:"8 months ago",lastZh:"8 个月前",strength:"weak",website:"lumen-soft-serve.example.com"},{id:"cacao-norte",name:"Cacao Norte — Oaxaca",tags:["B2B","Local","Wholesale"],lastEn:"about 2 years ago",lastZh:"约 2 年前",strength:"none",website:"cacao-norte.example.com"},{id:"pine-pistachio",name:"Pine & Pistachio — Istanbul",tags:["Gelato","Catering"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak"},{id:"ember-cone",name:"Ember Cone Company — Seoul",tags:["B2C","Vegan"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"ember-cone.example.com"},{id:"coral-coast",name:"Coral Coast Sorbet — Honolulu",tags:["Sorbet","Local"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"coral-coast.example.com"},{id:"sunbird",name:"Sunbird Gelateria — Lisbon",tags:["Gelato","Cafe"],lastEn:"over 2 years ago",lastZh:"2 年多前",strength:"none",website:"sunbird.example.com"},{id:"mooncake",name:"Mooncake Ice Cream — Singapore",tags:["B2B","Wholesale"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak",website:"mooncake-ice-cream.example.com"},{id:"juniper",name:"Juniper & Cream — Vancouver",tags:["Dairy-free","Catering"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"mango-moon",name:"Mango Moon Gelato — Nairobi",tags:["Sorbet","Vegan"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"mango-moon.example.com"},{id:"fjord-fizz",name:"Fjord Fizz Ice — Oslo",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"pampa",name:"Pampa Creamery — Córdoba",tags:["B2C","Local"],lastEn:"12 months ago",lastZh:"12 个月前",strength:"veryweak",website:"pampa-creamery.example.com"},{id:"lotus-leaf",name:"Lotus Leaf Scoops — Hanoi",tags:["Vegan","Cafe"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak"},{id:"saffron-sky",name:"Saffron Sky Kulfi — Dubai",tags:["Imports","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"saffron-sky.example.com"}];class e3 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=new Set,this._sort={key:"name",dir:1}}toggleSort(e){this._sort.key===e?this._sort.dir=1===this._sort.dir?-1:1:this._sort={key:e,dir:1},this.render()}toggleRow(e){this._selected.has(e)?this._selected.delete(e):this._selected.add(e),this.render()}toggleAll(e,t){e?t.forEach(e=>this._selected.delete(e.id)):t.forEach(e=>this._selected.add(e.id)),this.render()}render(){let e=this.isZh,t=this._sort,n=[...e5].sort((e,n)=>("name"===t.key?e.name.localeCompare(n.name):"last"===t.key?e.lastEn.localeCompare(n.lastEn):e0[e.strength].rank-e0[n.strength].rank)*t.dir),s=n.length>0&&n.every(e=>this._selected.has(e.id)),i=!s&&n.some(e=>this._selected.has(e.id)),r=Math.round(e5.reduce((e,t)=>e+e0[t.strength].rank,0)/e5.length/3*100);this.setHtml(`
      <div class="records-shell">
        <div class="records-scroll" tabindex="0" aria-label="${e?"公司表格。横向与纵向滚动以查看所有列与记录。":"Companies table. Scroll horizontally and vertically to view all columns and records."}">
          <table class="records-table">
            <colgroup>
              <col class="records-company-col" />
              <col class="records-category-col" />
              <col class="records-last-col" />
              <col class="records-strength-col" />
              <col class="records-link-col" />
            </colgroup>
            <thead>
              <tr>
                <th class="records-header-cell records-sticky-cell">
                  <div class="records-company-header">
                    <label class="records-checkbox" title="${e?"全选公司":"Select all companies"}">
                      <input type="checkbox" id="check-all-input" ${s?"checked":""} aria-label="${e?"全选公司":"Select all companies"}" />
                      <span class="records-checkbox-box ${s||i?"is-active":""}">
                        ${i?'<span class="records-checkbox-dash"></span>':s?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>':""}
                      </span>
                    </label>
                    <span>${e?"公司":"Company"}</span>
                  </div>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-categories">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01" />
                      </svg>
                    </span>
                    <span class="truncate">${e?"分类":"Categories"}</span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-last">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6" />
                      </svg>
                    </span>
                    <span class="truncate">${e?"最近互动":"Last interaction"}</span>
                    <span class="records-sort ${"last"===t.key?"is-visible":""}" style="${"last"===t.key&&-1===t.dir?"transform: rotate(180deg);":""}">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-strength">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z" />
                      </svg>
                    </span>
                    <span class="truncate">${e?"联系强度":"Connection strength"}</span>
                    <span class="records-sort ${"strength"===t.key?"is-visible":""}" style="${"strength"===t.key&&-1===t.dir?"transform: rotate(180deg);":""}">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    </span>
                  </button>
                </th>

                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="btn-sort-links">
                    <span class="records-header-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
                      </svg>
                    </span>
                    <span class="truncate">${e?"链接":"Links"}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              ${n.map(t=>{let n=this._selected.has(t.id),s=e0[t.strength],i=t.website?`https://${t.website}`:"#";return`
                    <tr class="records-row ${n?"is-selected":""}">
                      <td class="records-cell records-sticky-cell records-company-cell">
                        <label class="records-checkbox" title="${e?`选择 ${t.name}`:`Select ${t.name}`}">
                          <input type="checkbox" class="row-check row-checkbox" data-id="${t.id}" ${n?"checked":""} aria-label="${e?`选择 ${t.name}`:`Select ${t.name}`}" />
                          <span class="records-checkbox-box ${n?"is-active":""}">
                            ${n?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>':""}
                          </span>
                        </label>
                        <span class="records-company-mark">${t.name.slice(0,1).toUpperCase()}</span>
                        <a href="${i}" class="records-company-name ${t.website?"has-link":""}" ${!t.website?'onclick="event.preventDefault()"':""}>
                          ${t.name}
                        </a>
                      </td>
                      <td class="records-cell">
                        <div class="records-tags">
                          ${t.tags.slice(0,4).map(e=>{let t=e2[e]||"#7f858d";return`
                                <span class="records-tag" style="--tag-color: ${t};">
                                  <span class="records-tag-dot" style="background: ${t};"></span>
                                  ${e}
                                </span>
                              `}).join("")}
                          ${t.tags.length>4?`<span class="records-more-tag">+${t.tags.length-4}</span>`:""}
                        </div>
                      </td>
                      <td class="records-cell ${"No contact"===t.lastEn?"records-muted":""}">
                        ${e?t.lastZh:t.lastEn}
                      </td>
                      <td class="records-cell">
                        <span class="records-strength">
                          <span class="records-strength-dot" style="background: ${s.color};"></span>
                          ${e?s.labelZh:s.labelEn}
                        </span>
                      </td>
                      <td class="records-cell">
                        ${t.website?`<a class="records-link" href="https://${t.website}" target="_blank" rel="noreferrer">
                                ${t.website}
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                  <path d="M14 5h5v5M19 5l-8 8" />
                                </svg>
                              </a>`:'<span class="records-muted">—</span>'}
                      </td>
                    </tr>
                  `}).join("")}
            </tbody>
            <tfoot>
              <tr class="records-calculation-row">
                <td class="records-cell records-sticky-cell records-calculation-label">
                  <span class="records-calculation-number">${e5.length}</span> ${e?"条记录":"count"}
                </td>
                <td class="records-cell">
                  <button type="button" class="records-add-calculation">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    ${e?"添加计算":"Add calculation"}
                  </button>
                </td>
                <td class="records-cell records-muted">—</td>
                <td class="records-cell">
                  <span class="records-average">
                    <span class="records-strength-dot" style="background: var(--orange);"></span>
                    ${e?`平均 ${r}%`:`${r}% average`}
                  </span>
                </td>
                <td class="records-cell">
                  <span class="records-muted">${e5.filter(e=>e.website).length} ${e?"个链接":"links"}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#check-all-input")?.addEventListener("change",()=>{this.toggleAll(s,n)}),this.shadowRoot?.querySelectorAll(".row-checkbox").forEach(e=>{e.addEventListener("change",t=>{let n=e.getAttribute("data-id");n&&this.toggleRow(n)})}),this.shadowRoot?.querySelector("#sort-last")?.addEventListener("click",()=>this.toggleSort("last")),this.shadowRoot?.querySelector("#btn-sort-strength")?.addEventListener("click",()=>this.toggleSort("strength"))}}"u">typeof customElements&&!customElements.get("nai-records-table")&&customElements.define("nai-records-table",e3);let e4=[{key:"all",labelEn:"All",labelZh:"全部",count:5},{key:"todo",labelEn:"To do",labelZh:"待办",dot:"#f09a2f",count:2},{key:"progress",labelEn:"In Progress",labelZh:"进行中",dot:"#16a6c7",count:2},{key:"done",labelEn:"Completed",labelZh:"已完成",dot:"#25a878",count:1}],e6=[{taskEn:"Restock mango sorbet",taskZh:"补货芒果雪葩",dateEn:"Dec 03",dateZh:"12月3日",status:"todo",ownerEn:"Mango Moon Gelato",ownerZh:"Mango Moon 意式冰淇淋"},{taskEn:"Churn black sesame",taskZh:"搅拌黑芝麻基底",dateEn:"Sep 22",dateZh:"9月22日",status:"progress",ownerEn:"Kumo Creamery",ownerZh:"Kumo 乳品工坊"},{taskEn:"Print summer menu",taskZh:"印制夏季菜单",dateEn:"Jan 02",dateZh:"1月2日",status:"todo",ownerEn:"Coral Coast Sorbet",ownerZh:"Coral Coast 雪葩"},{taskEn:"Taste-test batch 42",taskZh:"试吃评测第 42 批",dateEn:"Nov 08",dateZh:"11月8日",status:"progress",ownerEn:"Maple Orbit",ownerZh:"Maple Orbit 枫糖"},{taskEn:"Order waffle cones",taskZh:"订购华夫脆筒",dateEn:"Apr 14",dateZh:"4月14日",status:"done",ownerEn:"Aurora Scoops",ownerZh:"Aurora 冰品铺"}],e8={todo:{labelEn:"To do",labelZh:"待办",color:"#f09a2f"},progress:{labelEn:"In Progress",labelZh:"进行中",color:"#16a6c7"},done:{labelEn:"Completed",labelZh:"已完成",color:"#25a878"}},e7=[{en:"Task name",zh:"任务名称"},{en:"Date",zh:"日期"},{en:"Status",zh:"状态"},{en:"Advisor",zh:"顾问"}];class e9 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all"}setFilter(e){this._filter=e,this.render()}render(){let e=this.isZh,t=this._filter;this.setHtml(`
      <div class="w-full max-w-105">
        
        <div
          class="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1"
          style="scrollbar-width: none;"
        >
          ${e4.map(n=>{let s=t===n.key;return`
              <button
                type="button"
                aria-pressed="${s}"
                data-key="${n.key}"
                class="chip-btn flex h-6.5 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition-[background-color,box-shadow,color] duration-200 cursor-pointer ${s?"bg-surface text-ink shadow-btn":"text-ink-2 hover:bg-hover"}"
              >
                ${n.dot?`<span class="size-1.5 rounded-full" style="background: ${n.dot}"></span>`:""}
                ${e?n.labelZh:n.labelEn}
                <span
                  class="rounded-[4px] px-1 text-[10.5px] tabular-nums ${s?"bg-field text-ink-2":"text-ink-3"}"
                >
                  ${n.count}
                </span>
              </button>
            `}).join("")}
        </div>

        
        <div
          aria-label="Scrollable task table"
          class="overflow-x-auto rounded-card bg-surface shadow-card"
          role="region"
          tabindex="0"
          style="scrollbar-width: none;"
        >
          <div class="min-w-[420px]">
            <div class="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] border-b border-line px-3 py-2 text-[11.5px] font-medium text-ink-3">
              ${e7.map(t=>`<span>${e?t.zh:t.en}</span>`).join("")}
            </div>
            ${e6.map(n=>{let s="all"===t||n.status===t,i=e8[n.status];return`
                <div
                  class="row-wrapper ${s?"visible":""} grid transition-[grid-template-rows,opacity] duration-300"
                  style="grid-template-rows: ${s?"1fr":"0fr"}; opacity: ${+!!s}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                >
                  <div class="overflow-hidden">
                    <div
                      class="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b border-line px-3 py-2 text-[12px] transition-colors duration-100 last:border-0 hover:bg-hover"
                    >
                      <span class="truncate font-medium text-ink">${e?n.taskZh:n.taskEn}</span>
                      <span class="text-ink-2 tabular-nums">${e?n.dateZh:n.dateEn}</span>
                      <span>
                        <span
                          class="inline-flex h-5 items-center rounded-[5px] px-1.5 text-[11px] font-medium"
                          style="color: ${i.color}; background: color-mix(in srgb, ${i.color} 13%, transparent);"
                        >
                          ${e?i.labelZh:i.labelEn}
                        </span>
                      </span>
                      <span class="truncate text-ink-2">${e?n.ownerZh:n.ownerEn}</span>
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setFilter(t)})})}}"u">typeof customElements&&!customElements.get("nai-filter-table")&&customElements.define("nai-filter-table",e9);let te="Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.",tt="周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。",tn="inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-[12px] font-normal text-ink transition-[background-color,color,transform] duration-150 hover:bg-hover active:scale-[0.96] cursor-pointer";class ts extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._mode="idle",this._action="Improve",this._prompt="",this._expanded=!1,this._streamCount=0,this._shown=!1,this._anchor={x:0,y:0},this._positioned=!1}onMount(){if(this.registerTimeout(()=>{this._shown=!0,this.place(),this.render()},280),"u">typeof ResizeObserver){let e=new ResizeObserver(()=>this.place()),t=this.shadowRoot?.querySelector(".selection-host");t&&e.observe(t),this._cleanups.push(()=>e.disconnect())}}reset(){this._mode="idle",this._prompt="",this._expanded=!1,this._streamCount=0,this.render()}place(){let e=this.shadowRoot?.querySelector(".selection-host"),t=this.shadowRoot?.querySelector(".selection-target");if(!e||!t)return;let n=t.getBoundingClientRect(),s=e.getBoundingClientRect(),i={x:Math.round(n.left-s.left+n.width/2),y:Math.round(n.bottom-s.top+8)};this._anchor=i,this._positioned=!0}run(e){this._action=e,this._expanded=!1,this._mode="thinking",this.render(),this.registerTimeout(()=>{this._mode="streaming",this._streamCount=0,this.render(),this._runStream()},700)}_runStream(){let e=this.isZh,t=e?tt:te,n=e?t.split(""):t.split(" "),s=()=>{"streaming"===this._mode&&(this._streamCount<n.length?(this._streamCount++,this.place(),this.render(),this.registerTimeout(s,46)):(this._mode="result",this.place(),this.render()))};this.registerTimeout(s,46)}reset(){this._expanded=!1,this._prompt="",this._action="Improve",this._mode="idle",this.place(),this.render()}render(){let e=this.isZh,t=e?tt:te,n=e?t.split(""):t.split(" "),s="thinking"===this._mode||"streaming"===this._mode,i=this._shown,r=this._prompt.trim().length>0,o="Improve"===this._action?e?"优化中":"Improving":"Shorten"===this._action?e?"精简中":"Shortening":"Change tone"===this._action?e?"调整语气中":"Changing tone":e?"编辑中":"Editing";this.setHtml(`
      <div class="w-full max-w-[460px]">
        <div class="selection-host relative select-none pb-12">
          <p class="text-[13px] leading-relaxed text-ink">
            ${e?"整个周末，开心果口味都稳居销量榜首。":"Pistachio holds the top slot all weekend. "}
            <span
              class="selection-target box-decoration-clone rounded-[3px] bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] text-ink dark:bg-accent-tint"
            >
              ${"idle"===this._mode||"thinking"===this._mode?e?"周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。":"Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.":"streaming"===this._mode?`${n.slice(0,this._streamCount).join(e?"":" ")}<span class="stream-caret is-streaming"></span>`:t}
            </span>
          </p>

          <div
            class="bar-wrapper absolute top-0 left-0 z-10"
            style="
              transform: translate3d(${this._anchor.x}px, ${this._anchor.y}px, 0) translateX(-50%);
              transition: transform 320ms cubic-bezier(0.77,0,0.175,1), opacity 180ms ease-out;
              opacity: ${+!!i};
              pointer-events: ${i?"auto":"none"};
              will-change: transform;
            "
          >
            <div
              class="flex h-9 w-fit max-w-[calc(100vw-48px)] items-center justify-center gap-0.5 overflow-hidden rounded-full bg-surface p-1 font-sans font-normal text-ink antialiased shadow-overlay"
              style="${i?"animation: pop-in 220ms cubic-bezier(0.23,1,0.32,1) both;":""}"
            >
              <div class="flex w-fit shrink-0 items-center justify-center gap-0.5">
                ${s?`
                  <span class="inline-flex h-7 items-center gap-1.5 whitespace-nowrap px-2.5 text-[12.5px] font-normal text-ink-2">
                    <span
                      class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 animate-spin"
                    ></span>
                    ${"thinking"===this._mode?`<span class="bg-clip-text text-[12.5px] font-normal text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${o}…</span>`:`<span>${o}…</span>`}
                  </span>
                `:""}

                ${"result"===this._mode?`
                  <button type="button" id="btn-keep" class="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-ink px-2.5 text-[12.5px] font-normal text-canvas shadow-hairline transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.96] cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>${e?"保留":"Keep"}</span>
                  </button>
                  <button type="button" id="btn-discard" class="${tn}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    <span>${e?"放弃":"Discard"}</span>
                  </button>
                  <span class="mx-0.5 h-4 w-px shrink-0 bg-line"></span>
                  <button
                    type="button"
                    id="btn-retry"
                    aria-label="${e?"重试":"Try again"}"
                    class="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-3 transition-[background-color,color,transform] duration-150 hover:bg-hover-2 hover:text-ink-2 active:scale-[0.96] cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                    </svg>
                  </button>
                `:""}

                ${"idle"===this._mode?`
                  <div
                    class="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${this._expanded?"0px":"145px"};
                      opacity: ${+!this._expanded};
                      transform: ${this._expanded?"translateX(-8px)":"translateX(0)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    <form id="prompt-form" class="flex h-7 shrink-0 items-center transition-[width] duration-400" style="width: 145px;">
                      <input
                        id="prompt-input"
                        value="${this._prompt}"
                        aria-label="${e?"描述修改要求":"Describe edits"}"
                        placeholder="${e?"描述修改要求":"Describe edits"}"
                        class="h-7 w-full bg-transparent pr-2.5 pl-3 text-[12.5px] text-ink placeholder:text-ink-3 outline-none"
                      />
                    </form>
                  </div>

                  <div
                    class="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${r?"0px":this._expanded?"462px":"224px"};
                      opacity: ${+!r};
                      transform: ${r?"translateX(-8px)":"translateX(0)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    ${!this._expanded?'<span class="mx-1 h-4 w-px shrink-0 bg-line-strong"></span>':""}
                    <button type="button" id="btn-explain" class="${tn}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>${e?"解释":"Explain"}</span>
                    </button>
                    <button type="button" id="btn-improve" class="${tn}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                      </svg>
                      <span>${e?"优化":"Improve"}</span>
                    </button>

                    <div
                      class="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,margin] duration-400"
                      style="
                        max-width: ${this._expanded?"262px":"0px"};
                        opacity: ${+!!this._expanded};
                        margin-left: ${this._expanded?"2px":"0px"};
                        transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                      "
                    >
                      <button type="button" id="btn-shorten" class="${tn}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
                          <line x1="20" y1="4" x2="8.12" y2="15.88" />
                          <line x1="14.47" y1="14.48" x2="20" y2="20" />
                          <line x1="8.12" y1="8.12" x2="12" y2="12" />
                        </svg>
                        <span>${e?"精简":"Shorten"}</span>
                      </button>
                      <button type="button" id="btn-tone" class="${tn}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <span>${e?"语气":"Tone"}</span>
                      </button>
                      <button type="button" id="btn-grammar" class="${tn}">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                        </svg>
                        <span>${e?"语法":"Grammar"}</span>
                      </button>
                    </div>

                    <span class="mx-0.5 h-4 w-px shrink-0 bg-line"></span>
                    <button
                      type="button"
                      id="btn-toggle-expand"
                      aria-label="${this._expanded?e?"收起更多操作":"Show fewer actions":e?"展开更多操作":"Show more actions"}"
                      aria-expanded="${this._expanded}"
                      class="flex size-7 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 hover:bg-hover active:scale-[0.96] cursor-pointer"
                    >
                      <span
                        class="flex transition-transform duration-400"
                        style="
                          transform: ${this._expanded?"rotate(180deg)":"rotate(0deg)"};
                          transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                        "
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    </button>
                  </div>

                  <div
                    class="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style="
                      max-width: ${r?"30px":"0px"};
                      opacity: ${+!!r};
                      transform: ${r?"scale(1)":"scale(0.88)"};
                      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
                    "
                  >
                    <button
                      type="button"
                      id="btn-send-prompt"
                      aria-label="${e?"发送编辑指令":"Send edit instruction"}"
                      class="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-[opacity,transform] duration-200 active:scale-[0.94] cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </button>
                  </div>
                `:""}
              </div>
            </div>
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#btn-keep")?.addEventListener("click",()=>this.reset()),this.shadowRoot?.querySelector("#btn-discard")?.addEventListener("click",()=>this.reset()),this.shadowRoot?.querySelector("#btn-retry")?.addEventListener("click",()=>this.run(this._action)),this.shadowRoot?.querySelector("#btn-explain")?.addEventListener("click",()=>this.run("Explain")),this.shadowRoot?.querySelector("#btn-improve")?.addEventListener("click",()=>this.run("Improve")),this.shadowRoot?.querySelector("#btn-shorten")?.addEventListener("click",()=>this.run("Shorten")),this.shadowRoot?.querySelector("#btn-tone")?.addEventListener("click",()=>this.run("Change tone")),this.shadowRoot?.querySelector("#btn-grammar")?.addEventListener("click",()=>this.run("Fix grammar")),this.shadowRoot?.querySelector("#btn-toggle-expand")?.addEventListener("click",()=>{this._expanded=!this._expanded,this.render()});let a=this.shadowRoot?.querySelector("#prompt-input");a&&a.addEventListener("input",e=>{this._prompt=e.target.value,this.render();let t=this.shadowRoot?.querySelector("#prompt-input");t&&(t.focus(),t.selectionStart=t.selectionEnd=this._prompt.length)});let l=this.shadowRoot?.querySelector("#prompt-form");l&&l.addEventListener("submit",e=>{e.preventDefault(),this.run(this._prompt.trim()||"Improve")}),this.shadowRoot?.querySelector("#btn-send-prompt")?.addEventListener("click",()=>{this.run(this._prompt.trim()||"Improve")}),this.place()}}"u">typeof customElements&&!customElements.get("nai-selection-actions")&&customElements.define("nai-selection-actions",ts);let ti={listening:"Listening to your request...",thinking:"Analyzing AST and resolving circular dependencies...",speaking:"I have updated the routing configuration and verified all 6 endpoints.",idle:"Tap to start voice conversation"},tr={listening:"正在聆听您的指令...",thinking:"正在分析抽象语法树并解决循环依赖...",speaking:"已更新全局路由配置，并成功验证了全部 6 个接口端点。",idle:"点击麦克风开始实时语音对话"},to={listening:{en:"Listening",zh:"倾听中"},thinking:{en:"Thinking",zh:"思考中"},speaking:{en:"Speaking",zh:"回答中"},idle:{en:"Idle",zh:"已就绪"}};class ta extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._state="speaking",this._isMuted=!1,this._bars=[12,24,18,32,28,40,36,48,42,34,26,38,20,16,28,14]}onMount(){this.registerInterval(()=>{"idle"===this._state?this._bars=this._bars.map(()=>4):this._bars=this._bars.map(()=>"speaking"===this._state?Math.floor(38*Math.random())+10:"listening"===this._state?Math.floor(20*Math.random())+6:"thinking"===this._state?Math.floor(12*Math.random())+4:4),this._updateBarsOnly()},120)}_updateBarsOnly(){let e=this.shadowRoot?.querySelector("#equalizer-bars");if(!e)return;let t="speaking"===this._state?"var(--accent)":"listening"===this._state?"var(--green)":"thinking"===this._state?"var(--orange)":"var(--line-strong)";e.querySelectorAll("span").forEach((e,n)=>{e.style.height=`${this._bars[n]}px`,e.style.backgroundColor=t})}setState(e){this._state=e,"idle"===e&&(this._bars=this._bars.map(()=>4)),this.render()}toggleMute(){this._isMuted=!this._isMuted,this.render()}render(){let e=this.isZh,t=this._state,n=this._isMuted,s=this._bars,i="speaking"===t?"var(--accent)":"listening"===t?"var(--green)":"thinking"===t?"var(--orange)":"var(--line-strong)";this.setHtml(`
      <div class="flex w-full max-w-sm flex-col items-center rounded-card border border-line bg-surface p-6 shadow-card">
        
        <div class="flex w-full items-center justify-between text-[11px] text-ink-3">
          <div class="flex items-center gap-1.5 font-mono">
            <span
              class="size-2 rounded-full ${"speaking"===t?"bg-green animate-pulse":"listening"===t?"bg-accent animate-pulse":"thinking"===t?"bg-orange animate-pulse":"bg-ink-3"}"
            ></span>
            <span class="capitalize font-medium text-ink-2">
              ${e?to[t].zh:to[t].en}
            </span>
          </div>
          <span class="font-mono text-[10.5px]">210ms • Opus 48kHz</span>
        </div>

        
        <div class="relative my-8 flex size-36 items-center justify-center">
          <div
            class="absolute inset-0 rounded-full blur-xl transition-all duration-700 ${"speaking"===t?"bg-accent/30 scale-125":"listening"===t?"bg-green/25 scale-110":"thinking"===t?"bg-orange/30 scale-115":"bg-line/40 scale-90"}"
          ></div>

          <div
            class="absolute inset-0 rounded-full border border-dashed transition-all duration-500 ${"speaking"===t?"border-accent/40 animate-spin":"thinking"===t?"border-orange/50 animate-spin":"border-line"}"
            style="${"speaking"===t?"animation-duration: 8s;":"thinking"===t?"animation-duration: 4s;":""}"
          ></div>

          <div
            class="relative flex size-28 items-center justify-center rounded-full shadow-lg transition-transform duration-500 ${"speaking"===t?"scale-105":"listening"===t?"scale-95 animate-pulse":"thinking"===t?"scale-90":"scale-85 opacity-70"}"
            style="background: ${"speaking"===t?"radial-gradient(circle at 30% 30%, #60a5fa, #2563eb, #1e3a8a)":"listening"===t?"radial-gradient(circle at 30% 30%, #34d399, #059669, #064e3b)":"thinking"===t?"radial-gradient(circle at 30% 30%, #fbbf24, #d97706, #78350f)":"radial-gradient(circle at 30% 30%, var(--ink-3), var(--ink-2), var(--ink))"};"
          >
            <div class="size-10 rounded-full bg-white/40 blur-[6px] animate-pulse"></div>
          </div>
        </div>

        
        <div id="equalizer-bars" class="flex h-10 w-full items-center justify-center gap-1">
          ${s.map(e=>`
            <span
              class="w-1 rounded-full transition-all duration-100"
              style="height: ${e}px; background-color: ${i};"
            ></span>
          `).join("")}
        </div>

        
        <p class="mt-4 min-h-[38px] text-center text-[12px] leading-relaxed text-ink-2">
          ${e?tr[t]:ti[t]}
        </p>

        
        <div class="mt-4 flex items-center gap-1 rounded-control bg-field p-1 text-[11px]">
          ${["listening","thinking","speaking","idle"].map(n=>`
            <button
              key="${n}"
              type="button"
              data-mode="${n}"
              class="pill-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${t===n?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
            >
              ${e?to[n].zh:to[n].en}
            </button>
          `).join("")}
        </div>

        
        <div class="mt-5 flex w-full items-center justify-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            id="btn-mute"
            class="flex size-8 items-center justify-center rounded-full border border-line transition-colors cursor-pointer ${n?"bg-red-tint text-red":"bg-field text-ink-2 hover:bg-hover hover:text-ink"}"
            title="${n?e?"取消静音":"Unmute":e?"静音":"Mute"}"
          >
            ${n?`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
              </svg>
            `:`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
              </svg>
            `}
          </button>

          <button
            type="button"
            id="btn-end"
            class="flex h-8 items-center gap-1.5 rounded-full bg-red px-3.5 text-[11.5px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span class="size-2 rounded-full bg-white"></span>
            <span>${e?"挂断通话":"End Voice"}</span>
          </button>
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll("[data-mode]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-mode");t&&this.setState(t)})}),this.shadowRoot?.querySelector("#btn-mute")?.addEventListener("click",()=>this.toggleMute()),this.shadowRoot?.querySelector("#btn-end")?.addEventListener("click",()=>this.setState("idle"))}}"u">typeof customElements&&!customElements.get("nai-audio-orb")&&customElements.define("nai-audio-orb",ta);let tl={name:"Model Alpha",realName:"Claude 3.7 Sonnet",ttft:"340ms",throughput:"78 tok/s",cost:"$0.0024",code:`export class SlidingRateLimiter {
  async isAllowed(key: string, limit: number, windowSec: number): Promise<boolean> {
    const now = Date.now();
    const clearBefore = now - windowSec * 1000;
    const multi = redis.multi();
    multi.zremrangebyscore(key, 0, clearBefore);
    multi.zadd(key, now, \`\${now}-\${Math.random()}\`);
    multi.zcard(key);
    multi.expire(key, windowSec);
    const results = await multi.exec();
    return (results?.[2] as number) <= limit;
  }
}`},td={name:"Model Beta",realName:"Gemini 2.5 Flash",ttft:"180ms",throughput:"142 tok/s",cost:"$0.0007",code:`export async function checkRateLimit(key: string, limit = 60, windowMs = 60000) {
  const now = Date.now();
  const tx = redis.pipeline();
  tx.zremrangebyscore(key, '-inf', now - windowMs);
  tx.zadd(key, { score: now, member: crypto.randomUUID() });
  tx.zcard(key);
  tx.pexpire(key, windowMs);
  const [_, __, count] = await tx.exec();
  return Number(count) <= limit;
}`};class tc extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._voted=null}vote(e){this._voted=e,this.render()}render(){let e=this.isZh,t=this._voted,n=`
      .max-w-2xl { max-width: 672px; }
      .bg-accent-tint\\/20 { background-color: color-mix(in srgb, var(--accent-tint, #e9f3ff) 20%, var(--surface, #fff)); }
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .ring-1 { box-shadow: 0 0 0 1px var(--ring-color, currentColor); }
      .ring-accent { --ring-color: var(--accent, #0285ff); }
      .size-5 { width: 20px; height: 20px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
      .leading-relaxed { line-height: 1.625; }
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
    `;this.setHtml(`
      <div class="w-full max-w-2xl rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-start justify-between border-b border-line pb-3">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-accent-tint text-accent-ink">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
                <polyline points="23 8 16 12 23 16" />
              </svg>
            </span>
            <span class="text-[12.5px] font-medium text-ink">
              ${e?'Prompt: "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"':'Prompt: "Implement sliding window rate limiting in TypeScript with Redis"'}
            </span>
          </div>
          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-3">
            ${e?"盲测试验":"Blind Eval"}
          </span>
        </div>

        
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          
          <div
            class="flex flex-col rounded-control border p-3 transition-all ${"A"===t?"border-accent bg-accent-tint/20 ring-1 ring-accent":"border-line bg-inset/40"}"
          >
            <div class="flex items-center justify-between pb-2 border-b border-line/60">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] font-semibold text-ink">
                  ${t?tl.realName:tl.name}
                </span>
                ${"A"===t?`
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${e?"您的选择":"Your Pick"}
                  </span>
                `:""}
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span>${tl.ttft}</span>
                <span>•</span>
                <span>${tl.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${tl.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
            </div>
          </div>

          
          <div
            class="flex flex-col rounded-control border p-3 transition-all ${"B"===t?"border-accent bg-accent-tint/20 ring-1 ring-accent":"border-line bg-inset/40"}"
          >
            <div class="flex items-center justify-between pb-2 border-b border-line/60">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] font-semibold text-ink">
                  ${t?td.realName:td.name}
                </span>
                ${"B"===t?`
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${e?"您的选择":"Your Pick"}
                  </span>
                `:""}
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span class="text-green font-medium">${td.ttft}</span>
                <span>•</span>
                <span class="text-green font-medium">${td.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${td.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
            </div>
          </div>
        </div>

        
        <div class="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
          <span class="text-[11.5px] text-ink-3">
            ${t?e?"偏好投票已记录至 RLHF 训练数据集":"Preferences recorded for RLHF dataset":e?"哪个模型的输出质量更高？":"Which response is higher quality?"}
          </span>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              id="vote-a"
              class="rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${"A"===t?"border-accent bg-accent text-white":"border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"}"
            >
              ${e?"模型 A 更好":"Model A Better"}
            </button>
            <button
              type="button"
              id="vote-tie"
              class="rounded-control border px-2.5 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${"tie"===t?"border-accent bg-accent text-white":"border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"}"
            >
              ${e?"平手 / 均可":"Tie"}
            </button>
            <button
              type="button"
              id="vote-b"
              class="rounded-control border px-3 py-1 text-[11.5px] font-medium transition-colors cursor-pointer ${"B"===t?"border-accent bg-accent text-white":"border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink"}"
            >
              ${e?"模型 B 更好":"Model B Better"}
            </button>
          </div>
        </div>
      </div>
    `,n),this.shadowRoot.querySelector("#vote-a")?.addEventListener("click",()=>this.vote("A")),this.shadowRoot.querySelector("#vote-tie")?.addEventListener("click",()=>this.vote("tie")),this.shadowRoot.querySelector("#vote-b")?.addEventListener("click",()=>this.vote("B"))}}"u">typeof customElements&&!customElements.get("nai-model-arena")&&customElements.define("nai-model-arena",tc);let tp=[-2.9,-3.4,-3.05,-3.86,-3.52,-4.1,-3.82,-4.41],th=[.22,.58,.42,.91,.76,1.08,.96,1.15],tu=[274,289,264,307,331,1210,1718,2112],tx=[18,19,17,21,22,58,81,96],tg=[{name:"VAN",label:"Vanilla",pct:72.5,amount:"$51,785",color:"var(--orange)"},{name:"CHOC",label:"Chocolate",pct:22.8,amount:"$16,278",color:"var(--line-strong)"},{name:"MINT",label:"Mint",pct:4.7,amount:"$3,357",color:"var(--line)"}];class tm extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._page=0,this._hoverIndex=null,this._anomalyMetric="spend",this._allocSelected="VAN"}setPage(e){this._page=(this._page+e+3)%3,this._hoverIndex=null,this.render()}setAnomalyMetric(e){this._anomalyMetric=e,this._hoverIndex=null,this.render()}setAllocSelected(e){this._allocSelected=e,this.render()}_drawCompareChart(e){if(!e)return;let t=e.getContext("2d");if(!t)return;let n=window.devicePixelRatio||1,s=e.getBoundingClientRect().width||320;e.width=s*n,e.height=130*n,t.scale(n,n),t.clearRect(0,0,s,130);let i=tp.length,r=[...tp,...th],o=Math.min(...r)-.5,a=Math.max(...r)+.5,l=e=>e/(i-1)*(s-24)+12,d=e=>116-(e-o)/(a-o)*102,c=d(0);t.strokeStyle="rgba(154, 157, 163, 0.25)",t.lineWidth=1,t.setLineDash([4,4]),t.beginPath(),t.moveTo(12,c),t.lineTo(s-12,c),t.stroke(),t.setLineDash([]),t.strokeStyle="var(--orange, #ef720c)",t.lineWidth=2.2,t.beginPath();for(let e=0;e<i;e++){let n=l(e),s=d(tp[e]);0===e?t.moveTo(n,s):t.lineTo(n,s)}t.stroke(),t.strokeStyle="var(--accent, #0285ff)",t.lineWidth=2.2,t.beginPath();for(let e=0;e<i;e++){let n=l(e),s=d(th[e]);0===e?t.moveTo(n,s):t.lineTo(n,s)}if(t.stroke(),null!==this._hoverIndex&&this._hoverIndex>=0&&this._hoverIndex<i){let e=l(this._hoverIndex);t.strokeStyle="rgba(154, 157, 163, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(e,6),t.lineTo(e,124),t.stroke(),t.fillStyle="#ef720c",t.beginPath(),t.arc(e,d(tp[this._hoverIndex]),3.5,0,2*Math.PI),t.fill(),t.fillStyle="#0285ff",t.beginPath(),t.arc(e,d(th[this._hoverIndex]),3.5,0,2*Math.PI),t.fill()}}_drawAnomalyChart(e){if(!e)return;let t=e.getContext("2d");if(!t)return;let n=window.devicePixelRatio||1,s=e.getBoundingClientRect().width||320;e.width=s*n,e.height=130*n,t.scale(n,n),t.clearRect(0,0,s,130);let i="spend"===this._anomalyMetric?tu:tx,r=i.length,o=.8*Math.min(...i),a=1.1*Math.max(...i),l=e=>e/(r-1)*(s-24)+12,d=e=>116-(e-o)/(a-o)*102,c=t.createLinearGradient(0,10,0,130);c.addColorStop(0,"rgba(227, 71, 76, 0.2)"),c.addColorStop(1,"rgba(227, 71, 76, 0.0)"),t.fillStyle=c,t.beginPath(),t.moveTo(l(0),116);for(let e=0;e<r;e++)t.lineTo(l(e),d(i[e]));t.lineTo(l(r-1),116),t.closePath(),t.fill(),t.strokeStyle="var(--red, #e3474c)",t.lineWidth=2.2,t.beginPath();for(let e=0;e<r;e++){let n=l(e),s=d(i[e]);0===e?t.moveTo(n,s):t.lineTo(n,s)}if(t.stroke(),null!==this._hoverIndex&&this._hoverIndex>=0&&this._hoverIndex<r){let e=l(this._hoverIndex);t.strokeStyle="rgba(154, 157, 163, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(e,6),t.lineTo(e,124),t.stroke(),t.fillStyle="#e3474c",t.beginPath(),t.arc(e,d(i[this._hoverIndex]),3.5,0,2*Math.PI),t.fill()}}render(){let e=this.isZh,t=this._page,n=[{prose:e?'你的 <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Creamery</span> 中表现最差的是 Rocky Road——下跌 <code class="font-mono text-[11.5px] text-red">-6%</code>，合 <code class="font-mono text-[11.5px] text-red">-$2,453.44</code>。':'The worst performer in your <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Creamery</span> is Rocky Road — down <code class="font-mono text-[11.5px] text-red">-6%</code> or <code class="font-mono text-[11.5px] text-red">-$2,453.44</code>.',pill:e?"需要重新平衡口味组合吗？":"Should I rebalance flavors?"},{prose:e?'<span class="font-medium text-ink">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 <code class="font-mono text-[11.5px] text-red">+$1,834.66</code>。':'Unusually high freezer bill on <span class="font-medium text-ink">Dec 13</span> — <code class="font-mono text-[11.5px] text-red">+$1,834.66</code> above your average.',pill:e?"获取降低冷柜成本的建议":"Get tips on cutting freezer costs"},{prose:e?'你在 <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Vanilla</span> 上投入过重——它占你库存的 <span class="font-medium text-ink">72.5%</span>。':'You\'re heavily invested in <span class="inline-flex items-center gap-1 font-medium text-ink"><span class="size-2 rounded-full bg-orange"></span>@Vanilla</span> — it\'s <span class="font-medium text-ink">72.5%</span> of your case.',pill:e?"如果看季节性口味，会有什么变化？":"If we look at seasonals, what changes?"}][t];if(this.setHtml(`
      <div class="flex w-full max-w-sm flex-col gap-2 font-sans">
        
        <div class="flex items-center justify-between">
          <div class="flex items-baseline gap-1.5">
            <span class="text-[13px] font-semibold text-ink">${e?"智能洞察":"Insights"}</span>
            <span class="text-[13px] text-ink-3 tabular-nums">3</span>
          </div>
          <div class="flex items-center gap-0.5">
            <button
              type="button"
              id="btn-prev"
              aria-label="${e?"上一条洞察":"Previous insight"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 hover:bg-hover hover:text-ink cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              id="btn-next"
              aria-label="${e?"下一条洞察":"Next insight"}"
              class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 hover:bg-hover hover:text-ink cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        
        <div class="animate-fade-up">
          <p class="text-[12.5px] leading-relaxed text-ink-2">
            ${n.prose}
          </p>

          <div class="mt-2 min-h-[278px] rounded-card bg-surface p-3 shadow-hairline">
            ${0===t?`
              
              <div class="flex items-center gap-4">
                <div class="flex-1">
                  <span class="flex items-center gap-1.5 text-[11.5px] text-ink-2">
                    <span class="size-2 rounded-full bg-orange"></span>
                    Mint Chip
                  </span>
                  <span class="block text-[17px] font-semibold text-red tabular-nums">-4.41%</span>
                  <span class="font-mono text-[11.5px] text-red">-$2,377.66</span>
                </div>
                <div class="flex-1">
                  <span class="flex items-center gap-1.5 text-[11.5px] text-ink-2">
                    <span class="size-2 rounded-full bg-accent"></span>
                    Pistachio
                  </span>
                  <span class="block text-[17px] font-semibold text-green tabular-nums">+1.15%</span>
                  <span class="font-mono text-[11.5px] text-green">+$617.22</span>
                </div>
              </div>

              <div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
                <div class="flex items-center justify-between border-b border-line px-2.5 py-1.5">
                  <span class="text-[11px] text-ink-3">${e?"趋势快照":"Trend snapshot"}</span>
                  <span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
                    ${e?"快照":"Snapshot"}
                  </span>
                </div>
                <div class="relative h-[130px] w-full cursor-crosshair" id="chart-stage-compare">
                  <canvas id="compare-canvas" class="block size-full"></canvas>
                  ${null!==this._hoverIndex?`
                    <div class="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-[6px] bg-ink px-2 py-1 text-[10.5px] text-canvas shadow-raised whitespace-nowrap">
                      <div>Mint Chip: <strong>${tp[this._hoverIndex]}%</strong></div>
                      <div>Pistachio: <strong>+${th[this._hoverIndex]}%</strong></div>
                    </div>
                  `:""}
                </div>
              </div>
            `:1===t?`
              
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="text-red" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  ${e?"冷柜支出偏高":"High freezer spend"}
                </span>
                <span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">
                  ${e?"快照":"Snapshot"}
                </span>
              </div>

              <div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline">
                <div class="flex items-center justify-between border-b border-line px-2.5 py-1.5">
                  <span class="text-[11px] text-ink-3">
                    ${"spend"===this._anomalyMetric?e?"$2,112 阈值":"$2,112 threshold":e?"82 kWh 阈值":"82 kWh threshold"}
                  </span>
                  <div class="flex rounded-full bg-field p-0.5">
                    <button
                      type="button"
                      id="metric-spend"
                      class="rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${"spend"===this._anomalyMetric?"bg-surface font-medium text-ink shadow-xs":"text-ink-2"}"
                    >
                      ${e?"支出":"Spend"}
                    </button>
                    <button
                      type="button"
                      id="metric-usage"
                      class="rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${"usage"===this._anomalyMetric?"bg-surface font-medium text-ink shadow-xs":"text-ink-2"}"
                    >
                      ${e?"用电":"Usage"}
                    </button>
                  </div>
                </div>
                <div class="relative h-[130px] w-full cursor-crosshair" id="chart-stage-anomaly">
                  <canvas id="anomaly-canvas" class="block size-full"></canvas>
                  ${null!==this._hoverIndex?`
                    <div class="pointer-events-none absolute top-2 left-1/2 z-10 -translate-x-1/2 rounded-[6px] bg-ink px-2 py-1 text-[10.5px] text-canvas shadow-raised whitespace-nowrap">
                      ${"spend"===this._anomalyMetric?`${e?"支出":"Spend"}: <strong>$${tu[this._hoverIndex]}</strong>`:`${e?"用电":"Usage"}: <strong>${tx[this._hoverIndex]} kWh</strong>`}
                    </div>
                  `:""}
                </div>
              </div>

              <div class="mt-2 flex items-baseline gap-2">
                <span class="text-[17px] font-semibold text-ink tabular-nums">$2,112 ${e?"已支出":"spent"}</span>
                <span class="font-mono text-[11.5px] text-red">+$1,834.66</span>
                <span class="text-[11px] text-ink-3">${e?"较 3 个月均值":"vs 3 months"}</span>
              </div>
            `:`
              
              <div>
                <span class="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                  <span class="flex size-3.5 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">V</span>
                  Vanilla ${e?"口味配置":"allocation"}
                </span>
                <span class="mt-1 block text-[20px] font-semibold text-ink tabular-nums">
                  ${tg.find(e=>e.name===this._allocSelected)?.amount}
                </span>

                <div class="mt-3 flex h-9 gap-0.5 overflow-hidden rounded-full bg-field p-0.5">
                  ${tg.map(e=>{let t=e.name===this._allocSelected;return`
                      <button
                        type="button"
                        class="alloc-segment relative h-full rounded-full transition-opacity duration-300 cursor-pointer"
                        data-name="${e.name}"
                        style="width: ${e.pct}%; background: ${e.color}; opacity: ${t?1:.58}; box-shadow: ${t?"inset 0 0 0 1px rgba(255,255,255,0.3)":"none"};"
                      ></button>
                    `}).join("")}
                </div>

                <div class="mt-2 flex items-center gap-1.5">
                  ${tg.map(e=>{let t=e.name===this._allocSelected;return`
                      <button
                        type="button"
                        class="alloc-chip flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] cursor-pointer ${t?"bg-field font-medium text-ink":"text-ink-2"}"
                        data-name="${e.name}"
                      >
                        <span class="size-1.5 rounded-full" style="background: ${e.color};"></span>
                        <span>${e.name} ${e.pct}%</span>
                      </button>
                    `}).join("")}
                </div>

                <div class="mt-3 min-h-[64px] rounded-control bg-inset p-2.5 shadow-hairline">
                  <span class="block text-[11.5px] font-medium text-orange">
                    ${tg.find(e=>e.name===this._allocSelected)?.label}
                  </span>
                  <span class="mt-1 block text-[11px] leading-relaxed text-ink-3">
                    ${e?"当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。":"Contribution snapshot across current inventory value. Segment selection changes inspected group without moving card."}
                  </span>
                </div>
              </div>
            `}
          </div>

          <button
            type="button"
            class="mt-2 w-fit rounded-full bg-surface px-3 py-1.5 text-left text-[12px] text-ink shadow-btn hover:bg-hover cursor-pointer"
          >
            ${n.pill}
          </button>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#btn-prev")?.addEventListener("click",()=>this.setPage(-1)),this.shadowRoot?.querySelector("#btn-next")?.addEventListener("click",()=>this.setPage(1)),0===t){let e=this.shadowRoot?.querySelector("#compare-canvas");this._drawCompareChart(e);let t=this.shadowRoot?.querySelector("#chart-stage-compare");t&&(t.addEventListener("pointermove",e=>{let n=t.getBoundingClientRect(),s=Math.round(Math.max(0,Math.min(1,(e.clientX-n.left)/n.width))*(tp.length-1));s!==this._hoverIndex&&(this._hoverIndex=s,this.render())}),t.addEventListener("pointerleave",()=>{this._hoverIndex=null,this.render()}))}else if(1===t){let e=this.shadowRoot?.querySelector("#anomaly-canvas");this._drawAnomalyChart(e),this.shadowRoot?.querySelector("#metric-spend")?.addEventListener("click",()=>this.setAnomalyMetric("spend")),this.shadowRoot?.querySelector("#metric-usage")?.addEventListener("click",()=>this.setAnomalyMetric("usage"));let t=this.shadowRoot?.querySelector("#chart-stage-anomaly");t&&(t.addEventListener("pointermove",e=>{let n=t.getBoundingClientRect(),s=Math.round(Math.max(0,Math.min(1,(e.clientX-n.left)/n.width))*(tu.length-1));s!==this._hoverIndex&&(this._hoverIndex=s,this.render())}),t.addEventListener("pointerleave",()=>{this._hoverIndex=null,this.render()}))}else 2===t&&this.shadowRoot?.querySelectorAll(".alloc-segment, .alloc-chip").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-name");t&&this.setAllocSelected(t)})})}}"u">typeof customElements&&!customElements.get("nai-insight-cards")&&customElements.define("nai-insight-cards",tm);let tb=[{key:"high",bodyZh:'建议从供应商 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> 追加补货华夫脆筒，预计交付周期为 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>。',bodyEn:'Reorder waffle cones from <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> with lead time <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>.',shortZh:"从 cone_king 补货 · 7天到货",shortEn:"Reorder from cone_king · 7-day lead",signal:3,tone:"var(--green)",labelZh:"高置信度推荐",labelEn:"High confidence",ctaZh:"采纳建议",ctaEn:"Accept",ctaStyle:"bg-accent text-white"},{key:"review",bodyZh:'为迎接旺季需求，建议将香草原料配方切换为 <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code>。',bodyEn:'Switch vanilla to <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code> for peak season.',shortZh:"切换为马达加斯加香草配方",shortEn:"Switch to vanilla_madagascar",signal:2,tone:"var(--orange)",labelZh:"需要人工复核",labelEn:"Needs review",ctaZh:"配置参数",ctaEn:"Configure",ctaStyle:"bg-ink text-canvas"},{key:"none",bodyZh:"对所有库存 SKU 发起全量紧急补货流程。",bodyEn:"Trigger a full restock cycle across every catalog SKU.",shortZh:"全品类 SKU 紧急补货",shortEn:"Full restock across every SKU",signal:0,tone:"var(--line-strong)",labelZh:"无足够置信信号",labelEn:"No signal",ctaZh:"忽略",ctaEn:"Dismiss",ctaStyle:"bg-field text-ink-3"}];class tf extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._activeKey="high",this._openDrawer=!1}setActiveKey(e){this._activeKey=e,this._openDrawer=!1,this.render()}toggleDrawer(){this._openDrawer=!this._openDrawer,this.render()}render(){let e=this.isZh,t=tb.find(e=>e.key===this._activeKey)||tb[0];this.setHtml(`
      <div class="w-full max-w-95 overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <div class="p-4">
          <div class="flex items-start justify-between gap-3">
            <p class="text-[13px] leading-relaxed text-ink">
              ${e?t.bodyZh:t.bodyEn}
            </p>
          </div>

          
          ${this._openDrawer?`
            <div class="mt-3.5 border-t border-line/60 pt-3 space-y-1">
              <span class="text-[11px] font-semibold text-ink-3 uppercase tracking-wider block mb-2">
                ${e?"备选方案":"Alternative Actions"}
              </span>
              ${tb.map(t=>{let n=t.key===this._activeKey;return`
                  <button
                    key="${t.key}"
                    type="button"
                    data-key="${t.key}"
                    class="alt-option flex w-full items-center justify-between rounded-control p-2 text-left text-[12px] transition-colors cursor-pointer ${n?"bg-accent-tint text-accent-ink font-medium":"hover:bg-hover text-ink-2"}"
                  >
                    <span>${e?t.shortZh:t.shortEn}</span>
                    <span class="font-mono text-[10px] text-ink-3">${e?t.labelZh:t.labelEn}</span>
                  </button>
                `}).join("")}
            </div>
          `:""}
        </div>

        
        <div class="flex items-center justify-between border-t border-line bg-inset px-4 py-2.5">
          <div class="flex items-center gap-2">
            <span class="flex items-end gap-0.5">
              <span class="w-1 rounded-full" style="height: 10px; background: ${t.signal>=1?t.tone:"var(--line-strong)"};"></span>
              <span class="w-1 rounded-full" style="height: 10px; background: ${t.signal>=2?t.tone:"var(--line-strong)"};"></span>
              <span class="w-1 rounded-full" style="height: 10px; background: ${t.signal>=3?t.tone:"var(--line-strong)"};"></span>
            </span>
            <span class="text-[12px] font-medium text-ink-2">${e?t.labelZh:t.labelEn}</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              id="btn-toggle-alt"
              class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${e?"备选方案":"Alternatives"}
            </button>
            <button
              type="button"
              class="rounded-control px-3 py-1 text-[11.5px] font-medium transition-transform active:scale-95 cursor-pointer ${t.ctaStyle}"
            >
              ${e?t.ctaZh:t.ctaEn}
            </button>
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#btn-toggle-alt")?.addEventListener("click",()=>this.toggleDrawer()),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setActiveKey(t)})})}}async function tv(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let n=document.execCommand("copy");return t.remove(),n}"u">typeof customElements&&!customElements.get("nai-recommendation-card")&&customElements.define("nai-recommendation-card",tf);class tk extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._revealed=!1,this._copied=!1,this._copyError=!1,this._apiKey="dsk-live-9824f1a8c901e47d8b3a5c2e"}toggleReveal(){this._revealed=!this._revealed,this.render()}async handleCopy(){this._copyError=!1;try{if(!await tv(this._apiKey)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh,t=this._revealed,n=this._copied,s=this._copyError,i=this._apiKey;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        
        <div class="flex items-center justify-between pb-3.5 border-b border-line">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
              </svg>
            </span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"API 密钥与凭据保险箱":"API Key & Credentials"}
                </h3>
                <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-accent-ink">
                  Kumo Pattern
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${e?"DeepSeek 认证令牌与 Harness 运行凭据":"DeepSeek Reasoning & Harness credentials"}
              </p>
            </div>
          </div>

          <span class="rounded-chip bg-green-tint px-2 py-0.5 font-mono text-[10px] text-green font-medium">
            ${e?"静态落盘加密":"Encrypted at Rest"}
          </span>
        </div>

        
        <div class="mt-4">
          <label
            for="sensitive-api-token"
            class="mb-1.5 block text-[11.5px] font-medium text-ink-2"
          >
            ${e?"DeepSeek API Token (生产环境)":"DeepSeek API Token (Production)"}
          </label>

          <div class="flex items-center gap-2 rounded-control border border-line bg-field px-3 py-2 focus-within:border-accent focus-within:bg-surface focus-within:ring-2 focus-within:ring-accent/20 transition-all">
            <input
              id="token-input"
              type="${t?"text":"password"}"
              value="${i}"
              class="w-full font-mono text-[12px] text-ink bg-transparent focus:outline-none"
            />

            <div class="flex items-center gap-1 text-ink-3 shrink-0">
              
              <button
                type="button"
                id="btn-reveal"
                class="flex size-6 items-center justify-center rounded-chip hover:bg-hover hover:text-ink transition-colors cursor-pointer"
                title="${t?e?"隐藏令牌":"Hide token":e?"显示令牌":"Reveal token"}"
              >
                ${t?`
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                `:`
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                `}
              </button>

              
              <button
                type="button"
                id="btn-copy"
                aria-label="${e?"复制令牌":"Copy token"}"
                class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
              >
                ${s?`
                  <span role="status" aria-live="polite" class="text-red font-medium">
                    ${e?"复制失败":"Copy failed"}
                  </span>
                `:n?`
                  <span role="status" aria-live="polite" class="text-green font-medium">
                    ${e?"已复制!":"Copied!"}
                  </span>
                `:`
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>${e?"复制":"Copy"}</span>
                `}
              </button>
            </div>
          </div>
        </div>

        
        <div class="mt-3.5 flex items-center justify-between text-[11px] text-ink-3">
          <span class="font-mono">${e?"作用域: chat.completions, reasoner":"Scope: chat.completions, reasoner"}</span>
          <span>${e?"有效期剩余 89 天":"Expires in 89 days"}</span>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#btn-reveal")?.addEventListener("click",()=>this.toggleReveal()),this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click",()=>this.handleCopy());let r=this.shadowRoot?.querySelector("#sensitive-api-token");r?.addEventListener("input",e=>{this._apiKey=e.target.value})}}"u">typeof customElements&&!customElements.get("nai-sensitive-input")&&customElements.define("nai-sensitive-input",tk);class tw extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._isOpen=!0,this._activeTab="metrics"}toggleOpen(){this._isOpen=!this._isOpen,this.render()}setActiveTab(e){this._activeTab=e,this.render()}render(){let e=this.isZh,t=this._isOpen,n=this._activeTab,s=`
      <div class="w-full max-w-xl overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all">
        <!-- Top Layer Header -->
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div class="flex items-center gap-2.5">
            <div class="flex size-7 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-[13px] font-semibold text-ink">
                  ${e?"Harness 边缘工作节点":"Harness Edge Worker"}
                </h3>
                <span class="rounded-chip bg-green-tint px-1.5 py-0.2 font-mono text-[9.5px] font-medium text-green">
                  ${e?"健康":"Healthy"}
                </span>
              </div>
              <span class="font-mono text-[10.5px] text-ink-3">
                worker-harness-session-prod • us-east-1
              </span>
            </div>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              id="btn-toggle"
              class="flex size-7 items-center justify-center rounded-control border border-line bg-surface text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
              title="${t?e?"折叠":"Collapse":e?"展开":"Expand"}"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                class="transition-transform duration-200 ${t?"rotate-180":""}"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Collapsible Content -->
        ${t?`
          <div class="p-4">
            <!-- Subheader & Tabs -->
            <div class="flex items-center justify-between pb-3 border-b border-line/60">
              <div class="flex rounded-control bg-field p-0.5 text-[11px]">
                <button
                  type="button"
                  id="tab-metrics"
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"metrics"===n?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
                >
                  ${e?"遥测监控指标":"Telemetry Metrics"}
                </button>
                <button
                  type="button"
                  id="tab-events"
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"events"===n?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
                >
                  ${e?"实时审计事件":"Live Audit Events"}
                </button>
              </div>

              <span class="font-mono text-[10.5px] text-ink-3">
                ${e?"5秒前已更新":"Last updated 5s ago"}
              </span>
            </div>

            <!-- Tab Body -->
            ${"metrics"===n?`
              <div class="mt-3 grid grid-cols-3 gap-2 text-center">
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${e?"每分钟请求数":"Requests / min"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                    1,480
                  </span>
                </div>
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${e?"P95 延迟":"P95 Latency"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-ink">
                    18.2ms
                  </span>
                </div>
                <div class="rounded-control border border-line bg-inset/40 p-2.5">
                  <span class="text-[10.5px] text-ink-3">${e?"请求成功率":"Success Rate"}</span>
                  <span class="mt-0.5 block font-mono text-[14px] font-semibold text-green">
                    99.98%
                  </span>
                </div>
              </div>
            `:`
              <div class="mt-3 flex flex-col gap-1.5 font-mono text-[10.5px]">
                <div class="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                  <span>${e?"[21:49:02] Cordis.Loader 初始化了 4 个服务":"[21:49:02] Cordis.Loader initialized 4 services"}</span>
                  <span class="text-green font-medium">OK</span>
                </div>
                <div class="flex items-center justify-between rounded bg-page p-2 text-ink-2">
                  <span>${e?"[21:49:15] E2B 沙盒快照创建成功 (142MB)":"[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
                  <span class="text-accent font-medium">SNAPSHOT</span>
                </div>
              </div>
            `}
          </div>
        `:""}

        <!-- Layer Card Footer Action Toolbar -->
        <div class="flex items-center justify-between border-t border-line bg-inset/60 px-4 py-2 text-[11.5px]">
          <span class="text-ink-3">${e?"Kumo LayerCard 分层架构":"Kumo LayerCard pattern"}</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="rounded-control border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${e?"清除缓存":"Purge Cache"}
            </button>
            <button
              type="button"
              class="rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              ${e?"部署变更":"Deploy Changes"}
            </button>
          </div>
        </div>
      </div>
    `;this.setHtml(s),this.shadowRoot.querySelector("#btn-toggle")?.addEventListener("click",()=>this.toggleOpen()),this.shadowRoot.querySelector("#tab-metrics")?.addEventListener("click",()=>this.setActiveTab("metrics")),this.shadowRoot.querySelector("#tab-events")?.addEventListener("click",()=>this.setActiveTab("events"))}}"u">typeof customElements&&!customElements.get("nai-layer-card")&&customElements.define("nai-layer-card",tw);let ty=[{key:"activity",labelEn:"Home",labelZh:"首页",section:"Workspace"},{key:"tasks",labelEn:"Agent tasks",labelZh:"智能体任务",section:"Workspace",count:!0},{key:"dashboard",labelEn:"Inbox",labelZh:"收件箱",section:"Workspace"},{key:"spaces",labelEn:"Suppliers",labelZh:"供应商",section:"Objects",plus:!0},{key:"analytics",labelEn:"Inventory",labelZh:"库存",section:"Objects"}];class t$ extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._active="tasks",this._hovered=null,this._query="",this._badge=4}setActive(e){this._active=e,this.render()}setHovered(e){this._hovered=e,this._updateIndicator()}addNewTask(){this._badge++,this._active="tasks",this.render()}onMount(){this._updateIndicator()}_updateIndicator(){let e=this._hovered||this._active,t=this.shadowRoot?.querySelector(`[data-key="${e}"]`),n=this.shadowRoot?.querySelector("#nav-indicator"),s=this.shadowRoot?.querySelector("#nav-list-container");if(t&&n&&s){let e=s.getBoundingClientRect(),i=t.getBoundingClientRect();n.style.top=`${i.top-e.top}px`,n.style.height=`${i.height}px`,n.style.opacity="1"}else n&&(n.style.opacity="0")}render(){let e=this.isZh,t=this._active,n=this._badge,s=this._query;this.setHtml(`
      <div class="w-60 rounded-card bg-surface p-2 shadow-raised">
        
        <button
          type="button"
          class="mb-2 flex w-full items-center gap-2.5 rounded-control p-1.5 text-left transition-[background-color,transform] duration-100 hover:bg-hover active:scale-[0.96] cursor-pointer"
        >
          <span class="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-ink text-[13px] font-semibold text-surface">
            C
          </span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-[13px] font-medium leading-tight text-ink">Creamery Ops</span>
            <span class="block truncate text-[11px] leading-tight text-ink-3">${e?"生产工作区":"Production Workspace"}</span>
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
          </svg>
        </button>

        
        <label class="mb-1 flex h-8 items-center gap-2 rounded-control bg-inset px-2.5 shadow-hairline">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            id="sidebar-search-input"
            value="${s}"
            placeholder="${e?"快速搜索":"Quick search"}"
            class="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-3"
          />
          <kbd class="flex size-4.5 items-center justify-center rounded-[5px] bg-surface text-[10px] text-ink-3 shadow-hairline font-mono">
            /
          </kbd>
        </label>

        
        <button
          type="button"
          id="btn-new-task"
          class="mb-2 flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-[13px] font-medium text-accent-ink transition-[background-color,transform] duration-100 hover:bg-accent-tint active:scale-[0.96] cursor-pointer"
        >
          <span class="min-w-0 flex-1 truncate text-left">${e?"新建任务":"New task"}</span>
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-white">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>

        
        <div
          id="nav-list-container"
          class="relative flex flex-col gap-2"
        >
          <span
            id="nav-indicator"
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
            style="
              top: 0px;
              height: 0px;
              opacity: 0;
              transition: top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease;
            "
          ></span>

          ${[{key:"Workspace",label:e?"工作区":"Workspace"},{key:"Objects",label:e?"对象":"Objects"}].map(s=>`
            <div>
              <div class="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">
                ${s.label}
              </div>
              <div class="flex flex-col gap-px">
                ${ty.filter(e=>e.section===s.key).map(s=>{var i;let r=s.key===t;return`
                    <button
                      type="button"
                      data-key="${s.key}"
                      aria-current="${r?"page":"false"}"
                      class="group relative z-10 flex w-full items-center gap-2 rounded-[7px] px-2 py-1.5 text-left transition-[color,transform] duration-150 active:scale-[0.96] cursor-pointer"
                    >
                      <span class="${r?"text-ink":"text-ink-3"}">
                        ${i=s.key,`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${({activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2" />',tasks:'<g><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></g>',spaces:'<g><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>',dashboard:'<g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>',analytics:'<g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>'})[i]||""}
    </svg>
  `}
                      </span>
                      <span
                        class="min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${r?"font-medium text-ink":"text-ink-2"}"
                      >
                        ${e?s.labelZh:s.labelEn}
                      </span>
                      ${s.count?`
                        <span
                          class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums ${r?"bg-surface text-ink-2 shadow-hairline":"bg-accent-tint text-accent-ink"}"
                          style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
                        >
                          ${n}
                        </span>
                      `:""}
                      ${s.plus?`
                        <span
                          class="flex size-4.5 items-center justify-center rounded-[5px] text-ink-3 opacity-0 transition-[background-color,color,opacity] duration-100 group-hover:opacity-100 hover:bg-line/70 hover:text-ink-2 ${r?"opacity-100":""}"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      `:""}
                    </button>
                  `}).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#btn-new-task")?.addEventListener("click",()=>this.addNewTask()),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{let t=e.getAttribute("data-key");e.addEventListener("mouseenter",()=>this.setHovered(t)),e.addEventListener("click",()=>{t&&this.setActive(t)})}),this.shadowRoot?.querySelector("#nav-list-container")?.addEventListener("mouseleave",()=>{this.setHovered(null)});let i=this.shadowRoot?.querySelector("#sidebar-search-input");i?.addEventListener("input",e=>{this._query=e.target.value}),this._updateIndicator()}}"u">typeof customElements&&!customElements.get("nai-sidebar-nav")&&customElements.define("nai-sidebar-nav",t$);let t_=[{en:"Forecast summer demand",zh:"预测夏季需求"},{en:"Find waffle cone suppliers",zh:"寻找华夫脆筒供应商"},{en:"Compare seasonal flavors",zh:"对比季节限定口味"},{en:"Draft flavor launch plan",zh:"起草新口味上市计划"},{en:"Check cold-chain status",zh:"检查冷链状态"},{en:"Audit sugar costs",zh:"核算糖原料成本"},{en:"Retire low sellers",zh:"下架滞销口味"}];class tE extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._query=""}setQuery(e){this._query=e,this.render()}render(){let e=this.isZh,t=this._query,n=t=>e?t.zh:t.en,s=t?t_.filter(e=>n(e).toLowerCase().includes(t.toLowerCase())):t_.slice(0,5),i=t.length>2&&0===s.length;this.setHtml(`
      <div class="flex min-h-[248px] w-full max-w-72 flex-col items-stretch">
        <div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-raised">
          
          <div class="flex h-10 items-center gap-2 border-b border-line px-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" class="shrink-0" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              id="search-input"
              value="${t}"
              placeholder="${e?"搜索风味…":"Search flavors…"}"
              aria-label="${e?"搜索风味":"Search flavors"}"
              class="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"
            />
            ${t?`
              <button
                id="btn-clear"
                aria-label="${e?"清除搜索":"Clear search"}"
                type="button"
                class="flex size-5.5 items-center justify-center rounded-full text-ink-3 transition-colors duration-100 hover:bg-line/70 hover:text-ink cursor-pointer"
                style="animation: fade-in 150ms ease-out both;"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            `:""}
          </div>

          
          ${i?`
            <div class="flex flex-col items-center justify-center gap-1 px-4 py-8" style="animation: fade-in 250ms ease-out both;">
              <span class="mb-1.5 flex size-8 items-center justify-center rounded-control bg-inset text-ink-3 shadow-hairline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <span class="text-[13px] font-medium text-ink">${e?"未找到相关结果":"No results found"}</span>
              <span class="text-[12px] text-ink-3">${e?"换个关键词再试一次":"Adjust your search to try again"}</span>
            </div>
          `:`
            <div class="p-1">
              ${s.map(e=>`
                <button
                  key="${e.en}"
                  type="button"
                  data-text="${n(e)}"
                  class="result-item flex h-8 w-full items-center rounded-[6px] px-2 text-left text-[13px] text-ink transition-colors duration-100 hover:bg-hover cursor-pointer"
                  style="animation: fade-in 200ms ease-out both;"
                >
                  ${n(e)}
                </button>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    `);let r=this.shadowRoot?.querySelector("#search-input");r&&r.addEventListener("input",e=>{this._query=e.target.value,this.render();let t=this.shadowRoot?.querySelector("#search-input");t&&(t.focus(),t.selectionStart=t.selectionEnd=this._query.length)}),this.shadowRoot?.querySelector("#btn-clear")?.addEventListener("click",()=>{this.setQuery("")}),this.shadowRoot?.querySelectorAll(".result-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-text");t&&this.setQuery(t)})})}}"u">typeof customElements&&!customElements.get("nai-search")&&customElements.define("nai-search",tE);let tS=["row","col","grid"],tC=[{key:"Seasonal",labelEn:"Seasonal",labelZh:"季节限定"},{key:"Classic",labelEn:"Classic",labelZh:"经典"},{key:"Limited",labelEn:"Limited",labelZh:"限量"}];class tj extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._seg=0,this._width=324,this._height=96,this._radius=28,this._opacity=100,this._menuOpen=!1,this._typeValue=null,this._dragState=null}setSeg(e){this._seg=e,this.render()}setTypeValue(e){this._typeValue=e,this._menuOpen=!1,this.render()}toggleMenu(){this._menuOpen=!this._menuOpen,this.render()}_clamp(e,t,n){return Math.min(n,Math.max(t,Math.round(e)))}_renderScrubField(e,t,n,s,i,r=""){let o="width"===e&&324!==n||"height"===e&&96!==n||"radius"===e&&28!==n||"opacity"===e&&100!==n;return`
      <label
        class="flex h-6.5 min-w-0 items-center gap-1 rounded-chip py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200"
        style="
          background: ${o?"var(--accent-tint)":"var(--field)"};
          box-shadow: ${o?"0 0 0 1px var(--accent)":"none"};
        "
        data-field="${e}"
        data-min="${s}"
        data-max="${i}"
      >
        
        <span
          role="slider"
          aria-label="${t}"
          aria-valuenow="${n}"
          aria-valuemin="${s}"
          aria-valuemax="${i}"
          tabindex="0"
          data-field="${e}"
          class="scrub-handle flex h-full shrink-0 cursor-ew-resize touch-none items-center rounded-[4px] px-0.5 text-[12px] text-ink-3 select-none hover:text-ink-2 focus-visible:text-accent-ink focus-visible:outline-none"
        >
          ${t}
        </span>
        <input
          inputmode="numeric"
          value="${n}"
          data-field="${e}"
          aria-label="${t} value"
          class="scrub-input min-w-0 flex-1 bg-transparent text-[12px] text-ink tabular-nums outline-none"
        />
        ${r?`<span class="shrink-0 pr-0.5 text-[11.5px] text-ink-3">${r}</span>`:""}
      </label>
    `}render(){let e=this.isZh,t=0!==this._seg||324!==this._width||96!==this._height||28!==this._radius||100!==this._opacity||null!==this._typeValue;this.setHtml(`
      <div class="relative w-full max-w-60 rounded-card bg-surface shadow-raised">
        
        <div class="primitive-card-bar flex items-center justify-between border-b border-line">
          <span class="text-[13px] font-medium text-ink">${e?"风味卡片":"Flavor card"}</span>
          ${t?`
            <span
              class="flex items-center gap-1.5 text-[12px] font-medium text-green"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              ${e?"已编辑":"Edited"}
            </span>
          `:`
            <span class="flex items-center gap-1.5">
              <span class="flex size-4.5 items-center justify-center rounded-[5px] border border-accent/30 bg-accent-tint">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
                </svg>
              </span>
              <span
                class="bg-clip-text text-[12px] font-medium text-transparent"
                style="
                  background-image: linear-gradient(90deg, var(--accent) 35%, var(--accent-ink) 50%, var(--accent) 65%);
                  background-size: 200% 100%;
                  animation: shimmer-text 1.4s linear infinite;
                "
              >
                ${e?"调整":"Adjust"}
              </span>
            </span>
          `}
        </div>

        
        <div class="primitive-card-pad flex flex-col gap-2 border-b border-line">
          <p class="text-[12.5px] font-medium text-ink">${e?"布局":"Layout"}</p>
          
          <div class="relative grid grid-cols-3 rounded-control bg-field p-0.5">
            <span
              aria-hidden="true"
              class="absolute inset-y-0.5 rounded-[6px] bg-surface shadow-btn transition-transform duration-300"
              style="
                width: calc((100% - 4px) / 3);
                left: 2px;
                transform: translateX(${100*this._seg}%);
                transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
              "
            ></span>
            ${tS.map((e,t)=>{let n;return`
              <button
                key="${e}"
                type="button"
                data-idx="${t}"
                aria-label="${e} layout"
                aria-pressed="${t===this._seg}"
                class="seg-btn relative z-10 flex h-6 items-center justify-center transition-colors duration-200 cursor-pointer ${t===this._seg?"text-accent":"text-ink-3"}"
              >
                ${n="size-1.5 rounded-[2px] border-[1.2px] border-current","row"===e?`
      <span class="flex gap-0.5">
        <span class="${n}"></span>
        <span class="${n}"></span>
        <span class="${n}"></span>
      </span>
    `:"col"===e?`
      <span class="flex flex-col gap-0.5">
        <span class="${n}"></span>
        <span class="${n}"></span>
      </span>
    `:`
    <span class="grid grid-cols-2 gap-0.5">
      <span class="${n}"></span>
      <span class="${n}"></span>
      <span class="${n}"></span>
      <span class="${n}"></span>
    </span>
  `}
              </button>
            `}).join("")}
          </div>
          <div class="grid min-w-0 grid-cols-2 gap-2">
            ${this._renderScrubField("width",e?"宽":"W",this._width,40,999)}
            ${this._renderScrubField("height",e?"高":"H",this._height,24,999)}
          </div>
          <div class="grid min-w-0 grid-cols-2 gap-2">
            ${this._renderScrubField("radius",e?"圆角":"Radius",this._radius,0,64)}
            ${this._renderScrubField("opacity",e?"不透明":"Opacity",this._opacity,0,100,"%")}
          </div>
        </div>

        
        <div class="primitive-card-footer flex items-center justify-between">
          <span class="text-[12px] text-ink-3">${e?"类型":"Type"}</span>
          <div class="relative -mr-0.5 w-30">
            <button
              type="button"
              id="btn-dropdown"
              aria-expanded="${this._menuOpen}"
              class="flex h-6.5 w-full items-center justify-between rounded-chip bg-inset py-1 pr-1 pl-2 shadow-hairline transition-shadow duration-200 focus-visible:outline-none cursor-pointer"
              style="${this._menuOpen?"box-shadow: 0 0 0 1px var(--accent);":""}"
            >
              <span class="text-[12px] ${null!==this._typeValue?"text-ink":"text-ink-3"}">
                ${null!==this._typeValue?e?tC.find(e=>e.key===this._typeValue)?.labelZh:this._typeValue:e?"选择类型":"Select type"}
              </span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink-3)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="transition-transform duration-200"
                style="transform: ${this._menuOpen?"rotate(180deg)":"rotate(0)"};"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            ${this._menuOpen?`
              <div
                class="absolute right-0 bottom-8 z-10 w-30 rounded-card bg-surface p-1 shadow-raised"
                style="
                  animation: pop-in 200ms cubic-bezier(0.23,1,0.32,1) both;
                  transform-origin: bottom right;
                "
              >
                ${tC.map(t=>`
                  <button
                    key="${t.key}"
                    type="button"
                    data-key="${t.key}"
                    class="dropdown-item flex h-6.5 w-full items-center rounded-[6px] px-2 text-left text-[12.5px] text-ink transition-colors duration-150 hover:bg-field cursor-pointer"
                    style="background: ${t.key===this._typeValue?"var(--field)":"transparent"};"
                  >
                    ${e?t.labelZh:t.labelEn}
                  </button>
                `).join("")}
              </div>
            `:""}
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll("[data-idx]").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx")||"0",10);this.setSeg(t)})}),this.shadowRoot?.querySelectorAll(".scrub-handle").forEach(e=>{let t=e.getAttribute("data-field"),n=e.closest("label"),s=parseInt(n?.getAttribute("data-min")||"0",10),i=parseInt(n?.getAttribute("data-max")||"999",10);e.addEventListener("pointerdown",n=>{e.setPointerCapture(n.pointerId);let r="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;this._dragState={x:n.clientX,val:r,fieldKey:t,min:s,max:i}}),e.addEventListener("pointermove",e=>{if(!this._dragState)return;let t=(e.clientX-this._dragState.x)/2,n=this._clamp(this._dragState.val+t,this._dragState.min,this._dragState.max);"width"===this._dragState.fieldKey?this._width=n:"height"===this._dragState.fieldKey?this._height=n:"radius"===this._dragState.fieldKey?this._radius=n:"opacity"===this._dragState.fieldKey&&(this._opacity=n),this.render()}),e.addEventListener("pointerup",()=>{this._dragState=null}),e.addEventListener("keydown",e=>{let n=e.shiftKey?10:1,r="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;if("ArrowUp"===e.key||"ArrowRight"===e.key){e.preventDefault();let o=this._clamp(r+n,s,i);"width"===t?this._width=o:"height"===t?this._height=o:"radius"===t?this._radius=o:"opacity"===t&&(this._opacity=o),this.render()}else if("ArrowDown"===e.key||"ArrowLeft"===e.key){e.preventDefault();let o=this._clamp(r-n,s,i);"width"===t?this._width=o:"height"===t?this._height=o:"radius"===t?this._radius=o:"opacity"===t&&(this._opacity=o),this.render()}})}),this.shadowRoot?.querySelectorAll(".scrub-input").forEach(e=>{let t=e.getAttribute("data-field"),n=e.closest("label"),s=parseInt(n?.getAttribute("data-min")||"0",10),i=parseInt(n?.getAttribute("data-max")||"999",10);e.addEventListener("input",e=>{let n=Number(e.target.value.replace(/[^\d-]/g,""));if(!Number.isNaN(n)){let e=this._clamp(n,s,i);"width"===t?this._width=e:"height"===t?this._height=e:"radius"===t?this._radius=e:"opacity"===t&&(this._opacity=e)}}),e.addEventListener("blur",()=>{this.render()})}),this.shadowRoot?.querySelector("#btn-dropdown")?.addEventListener("click",()=>this.toggleMenu()),this.shadowRoot?.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setTypeValue(t)})})}}"u">typeof customElements&&!customElements.get("nai-fine-tune-card")&&customElements.define("nai-fine-tune-card",tj),e.s([],76170),e.i(76170),e.i(29218),e.i(43516);let tM={spark:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>
  </svg>`,chevronDown:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6"/>
  </svg>`,chevronRight:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6"/>
  </svg>`,check:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>`,x:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>`,arrowUp:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>`,clip:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>`,chart:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>
  </svg>`,layers:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>`,globe:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>`,copy:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>`,retry:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/>
  </svg>`,thumbsUp:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z"/>
  </svg>`,thumbsDown:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z"/>
  </svg>`,send:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>`,mic:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>
  </svg>`,plus:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>`};e.s(["ICONS",0,tM],54143),e.i(54143),e.i(32083),e.s(["ICONS",0,tM,"NaiAgentInbox",0,ek,"NaiAgentTeams",0,U,"NaiApprovalCard",0,S,"NaiArtifactSandbox",0,eJ,"NaiAttachmentQueue",0,P,"NaiAudioOrb",0,ta,"NaiBaseElement",0,l,"NaiChat",0,R,"NaiCheckpointTimeline",0,eR,"NaiClarificationCard",0,en,"NaiCodeBlock",0,q,"NaiContextCards",0,ed,"NaiContextSpillover",0,ep,"NaiContextWindow",0,eo,"NaiCordisPluginTree",0,eT,"NaiDiffTable",0,e1,"NaiFilterTable",0,e9,"NaiFineTuneCard",0,tj,"NaiHookPipeline",0,eS,"NaiInsightCards",0,tm,"NaiJobScheduler",0,eF,"NaiLayerCard",0,tw,"NaiLoadingState",0,h,"NaiLspDiagnostics",0,eP,"NaiMcpServers",0,eU,"NaiMemoryInspector",0,el,"NaiMessageBranches",0,ei,"NaiModelArena",0,tc,"NaiPermissionPresetCard",0,eH,"NaiPromptBar",0,Z,"NaiRecommendationCard",0,tf,"NaiRecordsTable",0,e3,"NaiSandboxManager",0,eO,"NaiSearch",0,tE,"NaiSelectionActions",0,ts,"NaiSensitiveInput",0,tk,"NaiSessionTelemetry",0,eM,"NaiSidebarNav",0,t$,"NaiStreamingText",0,$,"NaiSubagentTree",0,O,"NaiTaskRows",0,J,"NaiThinking",0,b,"NaiToolChips",0,ee,"NaiTurnLifecycle",0,eg,"NaiWorkflowRun",0,eZ,"UTILITY_CSS",0,a,"getGlobalLang",0,s,"onLangChange",0,r,"resolveLang",0,o,"setGlobalLang",0,i],74312)}]);