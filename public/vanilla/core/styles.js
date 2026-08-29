/**
 * Canonical utility CSS for Native AI UI Vanilla Web Components.
 *
 * GENERATED FILE — do not edit by hand.
 * Source of truth: app/globals.css tokens + the Tailwind classes used by the
 * React components. Regenerate with: npm run vanilla:styles
 *
 * The generated Tailwind utilities guarantee that a vanilla template using
 * the same class list as its React counterpart renders identically inside
 * the shadow DOM. Dark mode resolves through :host-context(.dark).
 */

export const UTILITY_CSS = `/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    --font-mono: var(--font-mono-face), ui-monospace, "SF Mono", monospace;
    --color-red-100: oklch(93.6% 0.032 17.717);
    --color-red-200: oklch(88.5% 0.062 18.334);
    --color-red-300: oklch(80.8% 0.114 19.571);
    --color-red-400: oklch(70.4% 0.191 22.216);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-red-700: oklch(50.5% 0.213 27.518);
    --color-red-800: oklch(44.4% 0.177 26.899);
    --color-red-900: oklch(39.6% 0.141 25.723);
    --color-orange-500: oklch(70.5% 0.213 47.604);
    --color-amber-100: oklch(96.2% 0.059 95.617);
    --color-amber-200: oklch(92.4% 0.12 95.746);
    --color-amber-300: oklch(87.9% 0.169 91.605);
    --color-amber-400: oklch(82.8% 0.189 84.429);
    --color-amber-500: oklch(76.9% 0.188 70.08);
    --color-amber-600: oklch(66.6% 0.179 58.318);
    --color-amber-700: oklch(55.5% 0.163 48.998);
    --color-amber-800: oklch(47.3% 0.137 46.201);
    --color-amber-900: oklch(41.4% 0.112 45.904);
    --color-green-100: oklch(96.2% 0.044 156.743);
    --color-green-200: oklch(92.5% 0.084 155.995);
    --color-green-300: oklch(87.1% 0.15 154.449);
    --color-green-400: oklch(79.2% 0.209 151.711);
    --color-green-500: oklch(72.3% 0.219 149.579);
    --color-green-600: oklch(62.7% 0.194 149.214);
    --color-green-700: oklch(52.7% 0.154 150.069);
    --color-green-800: oklch(44.8% 0.119 151.328);
    --color-green-900: oklch(39.3% 0.095 152.535);
    --color-blue-50: oklch(97% 0.014 254.604);
    --color-blue-100: oklch(93.2% 0.032 255.585);
    --color-blue-200: oklch(88.2% 0.059 254.128);
    --color-blue-300: oklch(80.9% 0.105 251.813);
    --color-blue-400: oklch(70.7% 0.165 254.624);
    --color-blue-500: oklch(62.3% 0.214 259.815);
    --color-blue-600: oklch(54.6% 0.245 262.881);
    --color-blue-700: oklch(48.8% 0.243 264.376);
    --color-blue-800: oklch(42.4% 0.199 265.638);
    --color-blue-900: oklch(37.9% 0.146 265.522);
    --color-blue-950: oklch(28.2% 0.091 267.935);
    --color-purple-50: oklch(97.7% 0.014 308.299);
    --color-purple-100: oklch(94.6% 0.033 307.174);
    --color-purple-200: oklch(90.2% 0.063 306.703);
    --color-purple-300: oklch(82.7% 0.119 306.383);
    --color-purple-400: oklch(71.4% 0.203 305.504);
    --color-purple-500: oklch(62.7% 0.265 303.9);
    --color-purple-600: oklch(55.8% 0.288 302.321);
    --color-purple-700: oklch(49.6% 0.265 301.924);
    --color-purple-800: oklch(43.8% 0.218 303.724);
    --color-purple-900: oklch(38.1% 0.176 304.987);
    --color-purple-950: oklch(29.1% 0.149 302.717);
    --color-slate-500: oklch(55.4% 0.046 257.417);
    --color-slate-950: oklch(12.9% 0.042 264.695);
    --color-gray-100: oklch(96.7% 0.003 264.542);
    --color-gray-200: oklch(92.8% 0.006 264.531);
    --color-gray-300: oklch(87.2% 0.01 258.338);
    --color-gray-400: oklch(70.7% 0.022 261.325);
    --color-gray-500: oklch(55.1% 0.027 264.364);
    --color-gray-600: oklch(44.6% 0.03 256.802);
    --color-gray-700: oklch(37.3% 0.034 259.733);
    --color-gray-800: oklch(27.8% 0.033 256.848);
    --color-gray-900: oklch(21% 0.034 264.665);
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-xs: 20rem;
    --container-sm: 24rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    --container-3xl: 48rem;
    --container-4xl: 56rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-lg: 1.125rem;
    --text-lg--line-height: calc(1.75 / 1.125);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --text-4xl: 2.25rem;
    --text-4xl--line-height: calc(2.5 / 2.25);
    --text-9xl: 8rem;
    --text-9xl--line-height: 1;
    --font-weight-thin: 100;
    --font-weight-extralight: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --font-weight-black: 900;
    --tracking-tight: -0.025em;
    --tracking-wide: 0.025em;
    --tracking-wider: 0.05em;
    --tracking-widest: 0.1em;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --radius-xs: 0.125rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --animate-spin: spin 1s linear infinite;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --blur-xs: 4px;
    --blur-md: 12px;
    --blur-xl: 24px;
    --blur-3xl: 64px;
    --aspect-video: 16 / 9;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    --default-mono-font-family: var(--font-mono-face), ui-monospace, "SF Mono", monospace;
    --color-accent: var(--accent);
    --shadow-hairline: var(--shadow-hairline);
    --shadow-btn: var(--shadow-btn);
    --shadow-card: var(--shadow-card);
    --shadow-raised: var(--shadow-raised);
    --shadow-overlay: var(--shadow-overlay);
    --shadow-inset-field: var(--shadow-inset-field);
    --radius-chip: 6px;
    --radius-control: 8px;
    --radius-card: 10px;
    --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-link: cubic-bezier(0.16, 1, 0.3, 1);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring:where(:not(iframe)) {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .\\@container-size\\/sidebar {
    container-type: size;
    container-name: sidebar;
  }
  .\\@container {
    container-type: inline-size;
  }
  .\\@container-\\[inline-size\\] {
    container-type: inline-size;
  }
  .\\@container-size {
    container-type: size;
  }
  .pointer-events-auto {
    pointer-events: auto;
  }
  .pointer-events-none {
    pointer-events: none;
  }
  .\\!visible {
    visibility: visible !important;
  }
  .collapse {
    visibility: collapse;
  }
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
  .visible\\! {
    visibility: visible !important;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip-path: none;
    white-space: normal;
  }
  .\\!absolute {
    position: absolute !important;
  }
  .absolute {
    position: absolute;
  }
  .absolute\\! {
    position: absolute !important;
  }
  .fixed {
    position: fixed;
  }
  .fixed\\! {
    position: fixed !important;
  }
  .relative {
    position: relative;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .-inset-1 {
    inset: calc(var(--spacing) * -1);
  }
  .inset-0 {
    inset: 0px;
  }
  .inset-x-0 {
    inset-inline: 0px;
  }
  .inset-x-1 {
    inset-inline: var(--spacing);
  }
  .inset-y-0 {
    inset-block: 0px;
  }
  .inset-y-0\\.5 {
    inset-block: calc(var(--spacing) * 0.5);
  }
  .inset-y-1 {
    inset-block: var(--spacing);
  }
  .-top-24 {
    top: calc(var(--spacing) * -24);
  }
  .top-0 {
    top: 0px;
  }
  .top-1 {
    top: var(--spacing);
  }
  .top-1\\/2 {
    top: calc(1 / 2 * 100%);
  }
  .top-2 {
    top: calc(var(--spacing) * 2);
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .top-4\\.5 {
    top: calc(var(--spacing) * 4.5);
  }
  .top-7 {
    top: calc(var(--spacing) * 7);
  }
  .right-0 {
    right: 0px;
  }
  .right-2 {
    right: calc(var(--spacing) * 2);
  }
  .bottom-0 {
    bottom: 0px;
  }
  .bottom-1 {
    bottom: var(--spacing);
  }
  .bottom-6 {
    bottom: calc(var(--spacing) * 6);
  }
  .bottom-8 {
    bottom: calc(var(--spacing) * 8);
  }
  .bottom-full {
    bottom: 100%;
  }
  .-left-3 {
    left: calc(var(--spacing) * -3);
  }
  .-left-3\\.5 {
    left: calc(var(--spacing) * -3.5);
  }
  .left-0 {
    left: 0px;
  }
  .left-1 {
    left: var(--spacing);
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
  }
  .left-2 {
    left: calc(var(--spacing) * 2);
  }
  .left-2\\.5 {
    left: calc(var(--spacing) * 2.5);
  }
  .left-\\[0\\.68rem\\] {
    left: 0.68rem;
  }
  .left-\\[3px\\] {
    left: 3px;
  }
  .isolate {
    isolation: isolate;
  }
  .isolation-auto {
    isolation: auto;
  }
  .-z-10 {
    z-index: calc(10 * -1);
  }
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .z-30 {
    z-index: 30;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }
  .order-0 {
    order: 0;
  }
  .order-none {
    order: 0;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-full {
    grid-column: 1 / -1;
  }
  .col-start-1 {
    grid-column-start: 1;
  }
  .col-start-2 {
    grid-column-start: 2;
  }
  .col-start-3 {
    grid-column-start: 3;
  }
  .col-start-4 {
    grid-column-start: 4;
  }
  .col-start-5 {
    grid-column-start: 5;
  }
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-start-1 {
    grid-row-start: 1;
  }
  .row-start-2 {
    grid-row-start: 2;
  }
  .float-end {
    float: inline-end;
  }
  .float-left {
    float: left;
  }
  .float-none {
    float: none;
  }
  .float-right {
    float: right;
  }
  .float-start {
    float: inline-start;
  }
  .clear-both {
    clear: both;
  }
  .clear-end {
    clear: inline-end;
  }
  .clear-left {
    clear: left;
  }
  .clear-none {
    clear: none;
  }
  .clear-right {
    clear: right;
  }
  .clear-start {
    clear: inline-start;
  }
  .\\!container {
    width: 100% !important;
    @media (width >= 40rem) {
      max-width: 40rem !important;
    }
    @media (width >= 48rem) {
      max-width: 48rem !important;
    }
    @media (width >= 64rem) {
      max-width: 64rem !important;
    }
    @media (width >= 80rem) {
      max-width: 80rem !important;
    }
    @media (width >= 96rem) {
      max-width: 96rem !important;
    }
  }
  .container {
    width: 100%;
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .container\\! {
    width: 100% !important;
    @media (width >= 40rem) {
      max-width: 40rem !important;
    }
    @media (width >= 48rem) {
      max-width: 48rem !important;
    }
    @media (width >= 64rem) {
      max-width: 64rem !important;
    }
    @media (width >= 80rem) {
      max-width: 80rem !important;
    }
    @media (width >= 96rem) {
      max-width: 96rem !important;
    }
  }
  .m-0 {
    margin: 0px;
  }
  .m-2 {
    margin: calc(var(--spacing) * 2);
  }
  .m-auto {
    margin: auto;
  }
  .-mx-1 {
    margin-inline: calc(var(--spacing) * -1);
  }
  .-mx-1\\.5 {
    margin-inline: calc(var(--spacing) * -1.5);
  }
  .-mx-2 {
    margin-inline: calc(var(--spacing) * -2);
  }
  .-mx-6 {
    margin-inline: calc(var(--spacing) * -6);
  }
  .-mx-\\[3px\\] {
    margin-inline: calc(3px * -1);
  }
  .mx-0 {
    margin-inline: 0px;
  }
  .mx-0\\.5 {
    margin-inline: calc(var(--spacing) * 0.5);
  }
  .mx-1 {
    margin-inline: var(--spacing);
  }
  .mx-2 {
    margin-inline: calc(var(--spacing) * 2);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .my-8 {
    margin-block: calc(var(--spacing) * 8);
  }
  .my-auto {
    margin-block: auto;
  }
  .mt-0 {
    margin-top: 0px;
  }
  .mt-0\\.5 {
    margin-top: calc(var(--spacing) * 0.5);
  }
  .mt-1 {
    margin-top: var(--spacing);
  }
  .mt-1\\.5 {
    margin-top: calc(var(--spacing) * 1.5);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-2\\.5 {
    margin-top: calc(var(--spacing) * 2.5);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-3\\.5 {
    margin-top: calc(var(--spacing) * 3.5);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
  .mt-24 {
    margin-top: calc(var(--spacing) * 24);
  }
  .mt-\\[16px\\] {
    margin-top: 16px;
  }
  .mt-auto {
    margin-top: auto;
  }
  .-mr-0 {
    margin-right: 0px;
  }
  .-mr-0\\.5 {
    margin-right: calc(var(--spacing) * -0.5);
  }
  .mr-0 {
    margin-right: 0px;
  }
  .mr-1 {
    margin-right: var(--spacing);
  }
  .mr-2 {
    margin-right: calc(var(--spacing) * 2);
  }
  .mr-3 {
    margin-right: calc(var(--spacing) * 3);
  }
  .mr-auto {
    margin-right: auto;
  }
  .mb-0 {
    margin-bottom: 0px;
  }
  .mb-1 {
    margin-bottom: var(--spacing);
  }
  .mb-1\\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4);
  }
  .mb-6 {
    margin-bottom: calc(var(--spacing) * 6);
  }
  .ml-0 {
    margin-left: 0px;
  }
  .ml-0\\.5 {
    margin-left: calc(var(--spacing) * 0.5);
  }
  .ml-1 {
    margin-left: var(--spacing);
  }
  .ml-1\\.5 {
    margin-left: calc(var(--spacing) * 1.5);
  }
  .ml-2 {
    margin-left: calc(var(--spacing) * 2);
  }
  .ml-3 {
    margin-left: calc(var(--spacing) * 3);
  }
  .ml-4 {
    margin-left: calc(var(--spacing) * 4);
  }
  .ml-\\[5px\\] {
    margin-left: 5px;
  }
  .ml-auto {
    margin-left: auto;
  }
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }
  .block {
    display: block;
  }
  .contents {
    display: contents;
  }
  .contents\\! {
    display: contents !important;
  }
  .flex {
    display: flex;
  }
  .flow-root {
    display: flow-root;
  }
  .grid {
    display: grid;
  }
  .grid\\! {
    display: grid !important;
  }
  .hidden {
    display: none;
  }
  .hidden\\! {
    display: none !important;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }
  .inline-table {
    display: inline-table;
  }
  .list-item {
    display: list-item;
  }
  .table {
    display: table;
  }
  .table-caption {
    display: table-caption;
  }
  .table-cell {
    display: table-cell;
  }
  .table-column {
    display: table-column;
  }
  .table-column-group {
    display: table-column-group;
  }
  .table-footer-group {
    display: table-footer-group;
  }
  .table-header-group {
    display: table-header-group;
  }
  .table-row {
    display: table-row;
  }
  .table-row-group {
    display: table-row-group;
  }
  .field-sizing-content {
    field-sizing: content;
  }
  .field-sizing-fixed {
    field-sizing: fixed;
  }
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    aspect-ratio: var(--aspect-video);
  }
  .size-0 {
    width: 0px;
    height: 0px;
  }
  .size-1 {
    width: var(--spacing);
    height: var(--spacing);
  }
  .size-1\\.5 {
    width: calc(var(--spacing) * 1.5);
    height: calc(var(--spacing) * 1.5);
  }
  .size-2 {
    width: calc(var(--spacing) * 2);
    height: calc(var(--spacing) * 2);
  }
  .size-2\\.5 {
    width: calc(var(--spacing) * 2.5);
    height: calc(var(--spacing) * 2.5);
  }
  .size-3 {
    width: calc(var(--spacing) * 3);
    height: calc(var(--spacing) * 3);
  }
  .size-3\\.5 {
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
  }
  .size-4 {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
  .size-4\\.5 {
    width: calc(var(--spacing) * 4.5);
    height: calc(var(--spacing) * 4.5);
  }
  .size-5 {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }
  .size-5\\.5 {
    width: calc(var(--spacing) * 5.5);
    height: calc(var(--spacing) * 5.5);
  }
  .size-6 {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }
  .size-7 {
    width: calc(var(--spacing) * 7);
    height: calc(var(--spacing) * 7);
  }
  .size-8 {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
  }
  .size-9 {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
  }
  .size-10 {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
  }
  .size-12 {
    width: calc(var(--spacing) * 12);
    height: calc(var(--spacing) * 12);
  }
  .size-28 {
    width: calc(var(--spacing) * 28);
    height: calc(var(--spacing) * 28);
  }
  .size-36 {
    width: calc(var(--spacing) * 36);
    height: calc(var(--spacing) * 36);
  }
  .size-\\[4px\\] {
    width: 4px;
    height: 4px;
  }
  .size-\\[7px\\] {
    width: 7px;
    height: 7px;
  }
  .size-auto {
    width: auto;
    height: auto;
  }
  .size-full {
    width: 100%;
    height: 100%;
  }
  .h-1 {
    height: var(--spacing);
  }
  .h-1\\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-2\\.5 {
    height: calc(var(--spacing) * 2.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-3\\.5 {
    height: calc(var(--spacing) * 3.5);
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-4\\.5 {
    height: calc(var(--spacing) * 4.5);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-5\\.5 {
    height: calc(var(--spacing) * 5.5);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-6\\.5 {
    height: calc(var(--spacing) * 6.5);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-7\\.5 {
    height: calc(var(--spacing) * 7.5);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-12 {
    height: calc(var(--spacing) * 12);
  }
  .h-14 {
    height: calc(var(--spacing) * 14);
  }
  .h-16 {
    height: calc(var(--spacing) * 16);
  }
  .h-20 {
    height: calc(var(--spacing) * 20);
  }
  .h-24 {
    height: calc(var(--spacing) * 24);
  }
  .h-32 {
    height: calc(var(--spacing) * 32);
  }
  .h-37 {
    height: calc(var(--spacing) * 37);
  }
  .h-48 {
    height: calc(var(--spacing) * 48);
  }
  .h-64 {
    height: calc(var(--spacing) * 64);
  }
  .h-\\[130px\\] {
    height: 130px;
  }
  .h-\\[166px\\] {
    height: 166px;
  }
  .h-\\[288px\\] {
    height: 288px;
  }
  .h-\\[var\\(--radix-select-trigger-height\\)\\] {
    height: var(--radix-select-trigger-height);
  }
  .h-auto {
    height: auto;
  }
  .h-fit {
    height: fit-content;
  }
  .h-full {
    height: 100%;
  }
  .h-lh {
    height: 1lh;
  }
  .h-min {
    height: min-content;
  }
  .h-px {
    height: 1px;
  }
  .h-screen {
    height: 100vh;
  }
  .max-h-\\(--radix-select-content-available-height\\) {
    max-height: var(--radix-select-content-available-height);
  }
  .max-h-56 {
    max-height: calc(var(--spacing) * 56);
  }
  .max-h-\\[300px\\] {
    max-height: 300px;
  }
  .max-h-lh {
    max-height: 1lh;
  }
  .max-h-none {
    max-height: none;
  }
  .max-h-screen {
    max-height: 100vh;
  }
  .min-h-0 {
    min-height: 0px;
  }
  .min-h-4 {
    min-height: calc(var(--spacing) * 4);
  }
  .min-h-4\\.5 {
    min-height: calc(var(--spacing) * 4.5);
  }
  .min-h-7 {
    min-height: calc(var(--spacing) * 7);
  }
  .min-h-16 {
    min-height: calc(var(--spacing) * 16);
  }
  .min-h-44 {
    min-height: calc(var(--spacing) * 44);
  }
  .min-h-80 {
    min-height: calc(var(--spacing) * 80);
  }
  .min-h-\\[15\\.5rem\\] {
    min-height: 15.5rem;
  }
  .min-h-\\[18px\\] {
    min-height: 18px;
  }
  .min-h-\\[38px\\] {
    min-height: 38px;
  }
  .min-h-\\[42px\\] {
    min-height: 42px;
  }
  .min-h-\\[64px\\] {
    min-height: 64px;
  }
  .min-h-\\[118px\\] {
    min-height: 118px;
  }
  .min-h-\\[132px\\] {
    min-height: 132px;
  }
  .min-h-\\[137px\\] {
    min-height: 137px;
  }
  .min-h-\\[176px\\] {
    min-height: 176px;
  }
  .min-h-\\[196px\\] {
    min-height: 196px;
  }
  .min-h-\\[220px\\] {
    min-height: 220px;
  }
  .min-h-\\[248px\\] {
    min-height: 248px;
  }
  .min-h-\\[278px\\] {
    min-height: 278px;
  }
  .min-h-\\[304px\\] {
    min-height: 304px;
  }
  .min-h-\\[384px\\] {
    min-height: 384px;
  }
  .min-h-\\[408px\\] {
    min-height: 408px;
  }
  .min-h-auto {
    min-height: auto;
  }
  .min-h-lh {
    min-height: 1lh;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-0 {
    width: 0px;
  }
  .w-0\\.5 {
    width: calc(var(--spacing) * 0.5);
  }
  .w-1 {
    width: var(--spacing);
  }
  .w-1\\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-1\\/2 {
    width: calc(1 / 2 * 100%);
  }
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-2\\.5 {
    width: calc(var(--spacing) * 2.5);
  }
  .w-2\\/3 {
    width: calc(2 / 3 * 100%);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-3\\.5 {
    width: calc(var(--spacing) * 3.5);
  }
  .w-3\\/4 {
    width: calc(3 / 4 * 100%);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-4\\/5 {
    width: calc(4 / 5 * 100%);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
  }
  .w-5\\/6 {
    width: calc(5 / 6 * 100%);
  }
  .w-6 {
    width: calc(var(--spacing) * 6);
  }
  .w-7 {
    width: calc(var(--spacing) * 7);
  }
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-9 {
    width: calc(var(--spacing) * 9);
  }
  .w-10 {
    width: calc(var(--spacing) * 10);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-16 {
    width: calc(var(--spacing) * 16);
  }
  .w-20 {
    width: calc(var(--spacing) * 20);
  }
  .w-24 {
    width: calc(var(--spacing) * 24);
  }
  .w-28 {
    width: calc(var(--spacing) * 28);
  }
  .w-30 {
    width: calc(var(--spacing) * 30);
  }
  .w-32 {
    width: calc(var(--spacing) * 32);
  }
  .w-36 {
    width: calc(var(--spacing) * 36);
  }
  .w-44 {
    width: calc(var(--spacing) * 44);
  }
  .w-48 {
    width: calc(var(--spacing) * 48);
  }
  .w-60 {
    width: calc(var(--spacing) * 60);
  }
  .w-64 {
    width: calc(var(--spacing) * 64);
  }
  .w-70 {
    width: calc(var(--spacing) * 70);
  }
  .w-72 {
    width: calc(var(--spacing) * 72);
  }
  .w-80 {
    width: calc(var(--spacing) * 80);
  }
  .w-96 {
    width: calc(var(--spacing) * 96);
  }
  .w-\\[2\\.5px\\] {
    width: 2.5px;
  }
  .w-\\[3px\\] {
    width: 3px;
  }
  .w-\\[30\\%\\] {
    width: 30%;
  }
  .w-\\[34\\%\\] {
    width: 34%;
  }
  .w-\\[36\\%\\] {
    width: 36%;
  }
  .w-\\[560px\\] {
    width: 560px;
  }
  .w-\\[calc\\(100\\%\\+6px\\)\\] {
    width: calc(100% + 6px);
  }
  .w-auto {
    width: auto;
  }
  .w-fit {
    width: fit-content;
  }
  .w-full {
    width: 100%;
  }
  .w-px {
    width: 1px;
  }
  .w-screen {
    width: 100vw;
  }
  .max-w-2xl {
    max-width: var(--container-2xl);
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .max-w-36 {
    max-width: calc(var(--spacing) * 36);
  }
  .max-w-60 {
    max-width: calc(var(--spacing) * 60);
  }
  .max-w-72 {
    max-width: calc(var(--spacing) * 72);
  }
  .max-w-80 {
    max-width: calc(var(--spacing) * 80);
  }
  .max-w-86 {
    max-width: calc(var(--spacing) * 86);
  }
  .max-w-95 {
    max-width: calc(var(--spacing) * 95);
  }
  .max-w-105 {
    max-width: calc(var(--spacing) * 105);
  }
  .max-w-110 {
    max-width: calc(var(--spacing) * 110);
  }
  .max-w-\\[180px\\] {
    max-width: 180px;
  }
  .max-w-\\[200px\\] {
    max-width: 200px;
  }
  .max-w-\\[240px\\] {
    max-width: 240px;
  }
  .max-w-\\[260px\\] {
    max-width: 260px;
  }
  .max-w-\\[280px\\] {
    max-width: 280px;
  }
  .max-w-\\[380px\\] {
    max-width: 380px;
  }
  .max-w-\\[460px\\] {
    max-width: 460px;
  }
  .max-w-\\[calc\\(100vw-48px\\)\\] {
    max-width: calc(100vw - 48px);
  }
  .max-w-full {
    max-width: 100%;
  }
  .max-w-lg {
    max-width: var(--container-lg);
  }
  .max-w-md {
    max-width: var(--container-md);
  }
  .max-w-none {
    max-width: none;
  }
  .max-w-screen {
    max-width: 100vw;
  }
  .max-w-sm {
    max-width: var(--container-sm);
  }
  .max-w-xl {
    max-width: var(--container-xl);
  }
  .max-w-xs {
    max-width: var(--container-xs);
  }
  .min-w-0 {
    min-width: 0px;
  }
  .min-w-4 {
    min-width: calc(var(--spacing) * 4);
  }
  .min-w-4\\.5 {
    min-width: calc(var(--spacing) * 4.5);
  }
  .min-w-5 {
    min-width: calc(var(--spacing) * 5);
  }
  .min-w-64 {
    min-width: calc(var(--spacing) * 64);
  }
  .min-w-\\[3ch\\] {
    min-width: 3ch;
  }
  .min-w-\\[8rem\\] {
    min-width: 8rem;
  }
  .min-w-\\[420px\\] {
    min-width: 420px;
  }
  .min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
    min-width: var(--radix-select-trigger-width);
  }
  .min-w-auto {
    min-width: auto;
  }
  .min-w-full {
    min-width: 100%;
  }
  .min-w-screen {
    min-width: 100vw;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-auto {
    flex: auto;
  }
  .flex-initial {
    flex: 0 auto;
  }
  .flex-none {
    flex: none;
  }
  .flex-shrink {
    flex-shrink: 1;
  }
  .shrink {
    flex-shrink: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .flex-grow-1 {
    flex-grow: 1;
  }
  .grow {
    flex-grow: 1;
  }
  .basis-auto {
    flex-basis: auto;
  }
  .basis-full {
    flex-basis: 100%;
  }
  .table-auto {
    table-layout: auto;
  }
  .table-fixed {
    table-layout: fixed;
  }
  .caption-bottom {
    caption-side: bottom;
  }
  .caption-top {
    caption-side: top;
  }
  .border-collapse {
    border-collapse: collapse;
  }
  .border-separate {
    border-collapse: separate;
  }
  .origin-\\(--radix-select-content-transform-origin\\) {
    transform-origin: var(--radix-select-content-transform-origin);
  }
  .origin-bottom-left {
    transform-origin: 0 100%;
  }
  .origin-bottom-right {
    transform-origin: 100% 100%;
  }
  .origin-left {
    transform-origin: 0;
  }
  .origin-right {
    transform-origin: 100%;
  }
  .origin-top-left {
    transform-origin: 0 0;
  }
  .origin-top-right {
    transform-origin: 100% 0;
  }
  .-translate-full {
    --tw-translate-x: -100%;
    --tw-translate-y: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-full {
    --tw-translate-x: 100%;
    --tw-translate-y: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-x-1 {
    --tw-translate-x: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-x-1\\/2 {
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-x-full {
    --tw-translate-x: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-x-0 {
    --tw-translate-x: 0px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1 {
    --tw-translate-y: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\\/2 {
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-0 {
    --tw-translate-y: 0px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-0\\.5 {
    --tw-translate-y: calc(var(--spacing) * 0.5);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-\\[-1px\\] {
    --tw-translate-y: -1px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-3d {
    translate: var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z);
  }
  .translate-none {
    translate: none;
  }
  .scale-85 {
    --tw-scale-x: 85%;
    --tw-scale-y: 85%;
    --tw-scale-z: 85%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-90 {
    --tw-scale-x: 90%;
    --tw-scale-y: 90%;
    --tw-scale-z: 90%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-95 {
    --tw-scale-x: 95%;
    --tw-scale-y: 95%;
    --tw-scale-z: 95%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-98 {
    --tw-scale-x: 98%;
    --tw-scale-y: 98%;
    --tw-scale-z: 98%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-105 {
    --tw-scale-x: 105%;
    --tw-scale-y: 105%;
    --tw-scale-z: 105%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-110 {
    --tw-scale-x: 110%;
    --tw-scale-y: 110%;
    --tw-scale-z: 110%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-115 {
    --tw-scale-x: 115%;
    --tw-scale-y: 115%;
    --tw-scale-z: 115%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-125 {
    --tw-scale-x: 125%;
    --tw-scale-y: 125%;
    --tw-scale-z: 125%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .scale-3d {
    scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z);
  }
  .scale-none {
    scale: none;
  }
  .-rotate-90 {
    rotate: calc(90deg * -1);
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .rotate-180 {
    rotate: 180deg;
  }
  .rotate-none {
    rotate: none;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .transform\\! {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,) !important;
  }
  .transform-cpu {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .transform-gpu {
    transform: translateZ(0) var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .transform-none {
    transform: none;
  }
  .animate-\\[spin_4s_linear_infinite\\] {
    animation: spin 4s linear infinite;
  }
  .animate-\\[spin_8s_linear_infinite\\] {
    animation: spin 8s linear infinite;
  }
  .animate-pulse {
    animation: var(--animate-pulse);
  }
  .animate-spin {
    animation: var(--animate-spin);
  }
  .cursor-col-resize {
    cursor: col-resize;
  }
  .cursor-crosshair {
    cursor: crosshair;
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-e-resize {
    cursor: e-resize;
  }
  .cursor-ew-resize {
    cursor: ew-resize;
  }
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-text {
    cursor: text;
  }
  .cursor-w-resize {
    cursor: w-resize;
  }
  .touch-pinch-zoom {
    --tw-pinch-zoom: pinch-zoom;
    touch-action: var(--tw-pan-x,) var(--tw-pan-y,) var(--tw-pinch-zoom,);
  }
  .touch-none {
    touch-action: none;
  }
  .resize {
    resize: both;
  }
  .resize-none {
    resize: none;
  }
  .resize-x {
    resize: horizontal;
  }
  .resize-y {
    resize: vertical;
  }
  .snap-none {
    scroll-snap-type: none;
  }
  .snap-mandatory {
    --tw-scroll-snap-strictness: mandatory;
  }
  .snap-proximity {
    --tw-scroll-snap-strictness: proximity;
  }
  .snap-align-none {
    scroll-snap-align: none;
  }
  .snap-center {
    scroll-snap-align: center;
  }
  .snap-end {
    scroll-snap-align: end;
  }
  .snap-start {
    scroll-snap-align: start;
  }
  .snap-always {
    scroll-snap-stop: always;
  }
  .snap-normal {
    scroll-snap-stop: normal;
  }
  .scroll-my-1 {
    scroll-margin-block: var(--spacing);
  }
  .scroll-mt-20 {
    scroll-margin-top: calc(var(--spacing) * 20);
  }
  .scroll-py-1 {
    scroll-padding-block: var(--spacing);
  }
  .\\[scrollbar-width\\:none\\] {
    scrollbar-width: none;
  }
  .scrollbar-auto {
    scrollbar-width: auto;
  }
  .scrollbar-none {
    scrollbar-width: none;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-gutter-auto {
    scrollbar-gutter: auto;
  }
  .scrollbar-gutter-both {
    scrollbar-gutter: stable both-edges;
  }
  .scrollbar-gutter-stable {
    scrollbar-gutter: stable;
  }
  .list-inside {
    list-style-position: inside;
  }
  .list-outside {
    list-style-position: outside;
  }
  .appearance-auto {
    appearance: auto;
  }
  .appearance-none {
    appearance: none;
  }
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-col-dense {
    grid-auto-flow: column dense;
  }
  .grid-flow-dense {
    grid-auto-flow: dense;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }
  .grid-flow-row-dense {
    grid-auto-flow: row dense;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
  .grid-cols-\\[1\\.3fr_0\\.6fr_0\\.95fr_0\\.9fr\\] {
    grid-template-columns: 1.3fr 0.6fr 0.95fr 0.9fr;
  }
  .grid-cols-\\[28px_minmax\\(0\\,1fr\\)_auto_28px_28px\\] {
    grid-template-columns: 28px minmax(0,1fr) auto 28px 28px;
  }
  .grid-cols-\\[34\\%_30\\%_36\\%\\] {
    grid-template-columns: 34% 30% 36%;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_auto_28px_28px\\] {
    grid-template-columns: minmax(0,1fr) auto 28px 28px;
  }
  .grid-cols-\\[repeat\\(3\\,4px\\)\\] {
    grid-template-columns: repeat(3,4px);
  }
  .grid-rows-8 {
    grid-template-rows: repeat(8, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }
  .place-content-around {
    place-content: space-around;
  }
  .place-content-baseline {
    place-content: baseline;
  }
  .place-content-between {
    place-content: space-between;
  }
  .place-content-center {
    place-content: center;
  }
  .place-content-center-safe {
    place-content: safe center;
  }
  .place-content-end {
    place-content: end;
  }
  .place-content-end-safe {
    place-content: safe end;
  }
  .place-content-evenly {
    place-content: space-evenly;
  }
  .place-content-start {
    place-content: start;
  }
  .place-content-stretch {
    place-content: stretch;
  }
  .place-items-baseline {
    place-items: baseline;
  }
  .place-items-center {
    place-items: center;
  }
  .place-items-center-safe {
    place-items: safe center;
  }
  .place-items-end {
    place-items: end;
  }
  .place-items-end-safe {
    place-items: safe end;
  }
  .place-items-start {
    place-items: start;
  }
  .place-items-stretch {
    place-items: stretch;
  }
  .content-around {
    align-content: space-around;
  }
  .content-baseline {
    align-content: baseline;
  }
  .content-between {
    align-content: space-between;
  }
  .content-center {
    align-content: center;
  }
  .content-center-safe {
    align-content: safe center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-end-safe {
    align-content: safe flex-end;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-normal {
    align-content: normal;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-stretch {
    align-content: stretch;
  }
  .items-baseline {
    align-items: baseline;
  }
  .items-baseline-last {
    align-items: last baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-center-safe {
    align-items: safe center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-end-safe {
    align-items: safe flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-baseline {
    justify-content: baseline;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-center-safe {
    justify-content: safe center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-end-safe {
    justify-content: safe flex-end;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }
  .justify-normal {
    justify-content: normal;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-stretch {
    justify-content: stretch;
  }
  .justify-items-center {
    justify-items: center;
  }
  .justify-items-center-safe {
    justify-items: safe center;
  }
  .justify-items-end {
    justify-items: end;
  }
  .justify-items-end-safe {
    justify-items: safe end;
  }
  .justify-items-normal {
    justify-items: normal;
  }
  .justify-items-start {
    justify-items: start;
  }
  .justify-items-stretch {
    justify-items: stretch;
  }
  .gap-0 {
    gap: 0px;
  }
  .gap-0\\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-1 {
    gap: var(--spacing);
  }
  .gap-1\\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-2\\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .gap-8 {
    gap: calc(var(--spacing) * 8);
  }
  .gap-10 {
    gap: calc(var(--spacing) * 10);
  }
  .gap-12 {
    gap: calc(var(--spacing) * 12);
  }
  .gap-16 {
    gap: calc(var(--spacing) * 16);
  }
  .gap-\\[1\\.5px\\] {
    gap: 1.5px;
  }
  .gap-\\[2\\.5px\\] {
    gap: 2.5px;
  }
  .gap-\\[3px\\] {
    gap: 3px;
  }
  .gap-px {
    gap: 1px;
  }
  :where(.space-y-0 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  :where(.space-y-1 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(var(--spacing) * var(--tw-space-y-reverse));
    margin-block-end: calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-2 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-3 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-4 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-8 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 8) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 8) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-reverse > :not(:last-child)) {
    --tw-space-y-reverse: 1;
  }
  .gap-x-1 {
    column-gap: var(--spacing);
  }
  .gap-x-2 {
    column-gap: calc(var(--spacing) * 2);
  }
  .gap-x-3 {
    column-gap: calc(var(--spacing) * 3);
  }
  .gap-x-4 {
    column-gap: calc(var(--spacing) * 4);
  }
  .gap-x-6 {
    column-gap: calc(var(--spacing) * 6);
  }
  :where(.-space-x-1 > :not(:last-child)) {
    --tw-space-x-reverse: 0;
    margin-inline-start: calc(calc(var(--spacing) * -1) * var(--tw-space-x-reverse));
    margin-inline-end: calc(calc(var(--spacing) * -1) * calc(1 - var(--tw-space-x-reverse)));
  }
  :where(.space-x-2 > :not(:last-child)) {
    --tw-space-x-reverse: 0;
    margin-inline-start: calc(calc(var(--spacing) * 2) * var(--tw-space-x-reverse));
    margin-inline-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-x-reverse)));
  }
  :where(.space-x-reverse > :not(:last-child)) {
    --tw-space-x-reverse: 1;
  }
  .gap-y-1 {
    row-gap: var(--spacing);
  }
  .gap-y-1\\.5 {
    row-gap: calc(var(--spacing) * 1.5);
  }
  .gap-y-2 {
    row-gap: calc(var(--spacing) * 2);
  }
  .gap-y-3 {
    row-gap: calc(var(--spacing) * 3);
  }
  :where(.divide-x > :not(:last-child)) {
    --tw-divide-x-reverse: 0;
    border-inline-style: var(--tw-border-style);
    border-inline-start-width: calc(1px * var(--tw-divide-x-reverse));
    border-inline-end-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
  }
  :where(.divide-y > :not(:last-child)) {
    --tw-divide-y-reverse: 0;
    border-bottom-style: var(--tw-border-style);
    border-top-style: var(--tw-border-style);
    border-top-width: calc(1px * var(--tw-divide-y-reverse));
    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  }
  :where(.divide-y-reverse > :not(:last-child)) {
    --tw-divide-y-reverse: 1;
  }
  :where(.divide-line > :not(:last-child)) {
    border-color: var(--line);
  }
  :where(.divide-line\\/40 > :not(:last-child)) {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 40%, transparent);
    }
  }
  :where(.divide-line\\/60 > :not(:last-child)) {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 60%, transparent);
    }
  }
  .place-self-auto {
    place-self: auto;
  }
  .place-self-center {
    place-self: center;
  }
  .place-self-center-safe {
    place-self: safe center;
  }
  .place-self-end {
    place-self: end;
  }
  .place-self-end-safe {
    place-self: safe end;
  }
  .place-self-start {
    place-self: start;
  }
  .place-self-stretch {
    place-self: stretch;
  }
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-baseline-last {
    align-self: last baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-center-safe {
    align-self: safe center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-end-safe {
    align-self: safe flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }
  .justify-self-auto {
    justify-self: auto;
  }
  .justify-self-center {
    justify-self: center;
  }
  .justify-self-center-safe {
    justify-self: safe center;
  }
  .justify-self-end {
    justify-self: flex-end;
  }
  .justify-self-end-safe {
    justify-self: safe flex-end;
  }
  .justify-self-start {
    justify-self: flex-start;
  }
  .justify-self-stretch {
    justify-self: stretch;
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }
  .overflow-visible {
    overflow: visible;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .scroll-auto {
    scroll-behavior: auto;
  }
  .scroll-smooth {
    scroll-behavior: smooth;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-\\[1px\\] {
    border-radius: 1px;
  }
  .rounded-\\[2px\\] {
    border-radius: 2px;
  }
  .rounded-\\[3px\\] {
    border-radius: 3px;
  }
  .rounded-\\[4px\\] {
    border-radius: 4px;
  }
  .rounded-\\[5px\\] {
    border-radius: 5px;
  }
  .rounded-\\[6px\\] {
    border-radius: 6px;
  }
  .rounded-\\[7px\\] {
    border-radius: 7px;
  }
  .rounded-\\[8px\\] {
    border-radius: 8px;
  }
  .rounded-\\[14px\\] {
    border-radius: 14px;
  }
  .rounded-\\[24px\\] {
    border-radius: 24px;
  }
  .rounded-card {
    border-radius: 10px;
  }
  .rounded-chip {
    border-radius: 6px;
  }
  .rounded-control {
    border-radius: 8px;
  }
  .rounded-full {
    border-radius: calc(infinity * 1px);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-none {
    border-radius: 0;
  }
  .rounded-sm {
    border-radius: var(--radius-sm);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .rounded-s {
    border-start-start-radius: 0.25rem;
    border-end-start-radius: 0.25rem;
  }
  .rounded-ss {
    border-start-start-radius: 0.25rem;
  }
  .rounded-e {
    border-start-end-radius: 0.25rem;
    border-end-end-radius: 0.25rem;
  }
  .rounded-se {
    border-start-end-radius: 0.25rem;
  }
  .rounded-ee {
    border-end-end-radius: 0.25rem;
  }
  .rounded-es {
    border-end-start-radius: 0.25rem;
  }
  .rounded-t {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  .rounded-t-\\[3px\\] {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .rounded-l {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .rounded-tl {
    border-top-left-radius: 0.25rem;
  }
  .rounded-r {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .rounded-tr {
    border-top-right-radius: 0.25rem;
  }
  .rounded-b {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .rounded-br {
    border-bottom-right-radius: 0.25rem;
  }
  .rounded-bl {
    border-bottom-left-radius: 0.25rem;
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-0 {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .border-2 {
    border-style: var(--tw-border-style);
    border-width: 2px;
  }
  .border-\\[1\\.2px\\] {
    border-style: var(--tw-border-style);
    border-width: 1.2px;
  }
  .border-\\[1\\.5px\\] {
    border-style: var(--tw-border-style);
    border-width: 1.5px;
  }
  .border-x {
    border-inline-style: var(--tw-border-style);
    border-inline-width: 1px;
  }
  .border-y {
    border-block-style: var(--tw-border-style);
    border-block-width: 1px;
  }
  .border-s {
    border-inline-start-style: var(--tw-border-style);
    border-inline-start-width: 1px;
  }
  .border-e {
    border-inline-end-style: var(--tw-border-style);
    border-inline-end-width: 1px;
  }
  .border-bs {
    border-block-start-style: var(--tw-border-style);
    border-block-start-width: 1px;
  }
  .border-be {
    border-block-end-style: var(--tw-border-style);
    border-block-end-width: 1px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-r {
    border-right-style: var(--tw-border-style);
    border-right-width: 1px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-l {
    border-left-style: var(--tw-border-style);
    border-left-width: 1px;
  }
  .border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  .border-dotted {
    --tw-border-style: dotted;
    border-style: dotted;
  }
  .border-double {
    --tw-border-style: double;
    border-style: double;
  }
  .border-hidden {
    --tw-border-style: hidden;
    border-style: hidden;
  }
  .border-none {
    --tw-border-style: none;
    border-style: none;
  }
  .border-solid {
    --tw-border-style: solid;
    border-style: solid;
  }
  .\\!border-tooltip-border {
    border-color: var(--tooltip-border) !important;
  }
  .border-accent {
    border-color: var(--accent);
  }
  .border-accent\\/30 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 30%, transparent);
    }
  }
  .border-accent\\/40 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 40%, transparent);
    }
  }
  .border-accent\\/50 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 50%, transparent);
    }
  }
  .border-current {
    border-color: currentcolor;
  }
  .border-green {
    border-color: var(--green);
  }
  .border-green\\/30 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 30%, transparent);
    }
  }
  .border-green\\/40 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 40%, transparent);
    }
  }
  .border-line {
    border-color: var(--line);
  }
  .border-line-strong {
    border-color: var(--line-strong);
  }
  .border-line\\/40 {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 40%, transparent);
    }
  }
  .border-line\\/60 {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 60%, transparent);
    }
  }
  .border-line\\/70 {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 70%, transparent);
    }
  }
  .border-line\\/80 {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 80%, transparent);
    }
  }
  .border-orange {
    border-color: var(--orange);
  }
  .border-orange\\/30 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 30%, transparent);
    }
  }
  .border-orange\\/35 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 35%, transparent);
    }
  }
  .border-orange\\/40 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 40%, transparent);
    }
  }
  .border-orange\\/50 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 50%, transparent);
    }
  }
  .border-red {
    border-color: var(--red);
  }
  .border-red\\/30 {
    border-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--red) 30%, transparent);
    }
  }
  .border-slate-500 {
    border-color: var(--color-slate-500);
  }
  .border-tooltip-border {
    border-color: var(--tooltip-border);
  }
  .border-tooltip-border\\/80 {
    border-color: var(--tooltip-border);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--tooltip-border) 80%, transparent);
    }
  }
  .border-transparent {
    border-color: transparent;
  }
  .border-t-ink-2 {
    border-top-color: var(--ink-2);
  }
  .border-t-orange {
    border-top-color: var(--orange);
  }
  .\\!bg-transparent {
    background-color: transparent !important;
  }
  .bg-\\(--my_variable\\) {
    background-color: var(--my_variable);
  }
  .bg-\\(color\\:--my-color\\) {
    background-color: var(--my-color);
  }
  .bg-\\[\\#0088cc\\] {
    background-color: #0088cc;
  }
  .bg-\\[\\#B91C1C\\] {
    background-color: #B91C1C;
  }
  .bg-\\[color-mix\\(in_srgb\\,var\\(--accent\\)_14\\%\\,var\\(--surface\\)\\)\\] {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in srgb,var(--accent) 14%,var(--surface));
    }
  }
  .bg-\\[color\\:var\\(--my-color\\)\\] {
    background-color: var(--my-color);
  }
  .bg-\\[var\\(--my_variable\\)\\] {
    background-color: var(--my_variable);
  }
  .bg-accent {
    background-color: var(--accent);
  }
  .bg-accent-ink {
    background-color: var(--accent-ink);
  }
  .bg-accent-tint {
    background-color: var(--accent-tint);
  }
  .bg-accent-tint\\/20 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 20%, transparent);
    }
  }
  .bg-accent-tint\\/25 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 25%, transparent);
    }
  }
  .bg-accent-tint\\/30 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 30%, transparent);
    }
  }
  .bg-accent-tint\\/40 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 40%, transparent);
    }
  }
  .bg-accent-tint\\/70 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 70%, transparent);
    }
  }
  .bg-accent\\/30 {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent) 30%, transparent);
    }
  }
  .bg-accent\\/35 {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent) 35%, transparent);
    }
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-black\\/20 {
    background-color: color-mix(in srgb, #000 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 20%, transparent);
    }
  }
  .bg-black\\/40 {
    background-color: color-mix(in srgb, #000 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 40%, transparent);
    }
  }
  .bg-blue-50 {
    background-color: var(--color-blue-50);
  }
  .bg-blue-200 {
    background-color: var(--color-blue-200);
  }
  .bg-blue-500 {
    background-color: var(--color-blue-500);
  }
  .bg-canvas {
    background-color: var(--canvas);
  }
  .bg-current {
    background-color: currentcolor;
  }
  .bg-field {
    background-color: var(--field);
  }
  .bg-field\\/70 {
    background-color: var(--field);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--field) 70%, transparent);
    }
  }
  .bg-gray-100 {
    background-color: var(--color-gray-100);
  }
  .bg-gray-100\\/50 {
    background-color: color-mix(in srgb, oklch(96.7% 0.003 264.542) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-gray-100) 50%, transparent);
    }
  }
  .bg-gray-200 {
    background-color: var(--color-gray-200);
  }
  .bg-green {
    background-color: var(--green);
  }
  .bg-green-tint {
    background-color: var(--green-tint);
  }
  .bg-green-tint\\/40 {
    background-color: var(--green-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green-tint) 40%, transparent);
    }
  }
  .bg-green-tint\\/50 {
    background-color: var(--green-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green-tint) 50%, transparent);
    }
  }
  .bg-green\\/25 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 25%, transparent);
    }
  }
  .bg-green\\/60 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 60%, transparent);
    }
  }
  .bg-green\\/80 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 80%, transparent);
    }
  }
  .bg-hover {
    background-color: var(--hover);
  }
  .bg-hover-2 {
    background-color: var(--hover-2);
  }
  .bg-hover-2\\/60 {
    background-color: var(--hover-2);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--hover-2) 60%, transparent);
    }
  }
  .bg-hover\\/30 {
    background-color: var(--hover);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--hover) 30%, transparent);
    }
  }
  .bg-hover\\/40 {
    background-color: var(--hover);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--hover) 40%, transparent);
    }
  }
  .bg-ink {
    background-color: var(--ink);
  }
  .bg-ink-2 {
    background-color: var(--ink-2);
  }
  .bg-ink-3 {
    background-color: var(--ink-3);
  }
  .bg-inset {
    background-color: var(--inset);
  }
  .bg-inset\\/30 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 30%, transparent);
    }
  }
  .bg-inset\\/40 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 40%, transparent);
    }
  }
  .bg-inset\\/45 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 45%, transparent);
    }
  }
  .bg-inset\\/50 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 50%, transparent);
    }
  }
  .bg-inset\\/60 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 60%, transparent);
    }
  }
  .bg-inset\\/70 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 70%, transparent);
    }
  }
  .bg-line {
    background-color: var(--line);
  }
  .bg-line-strong {
    background-color: var(--line-strong);
  }
  .bg-line\\/40 {
    background-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--line) 40%, transparent);
    }
  }
  .bg-orange {
    background-color: var(--orange);
  }
  .bg-orange-tint {
    background-color: var(--orange-tint);
  }
  .bg-orange-tint\\/20 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 20%, transparent);
    }
  }
  .bg-orange-tint\\/25 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 25%, transparent);
    }
  }
  .bg-orange-tint\\/40 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 40%, transparent);
    }
  }
  .bg-orange-tint\\/50 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 50%, transparent);
    }
  }
  .bg-orange\\/30 {
    background-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange) 30%, transparent);
    }
  }
  .bg-page {
    background-color: var(--page);
  }
  .bg-page\\/40 {
    background-color: var(--page);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--page) 40%, transparent);
    }
  }
  .bg-page\\/50 {
    background-color: var(--page);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--page) 50%, transparent);
    }
  }
  .bg-purple-50 {
    background-color: var(--color-purple-50);
  }
  .bg-red {
    background-color: var(--red);
  }
  .bg-red-500 {
    background-color: var(--color-red-500);
  }
  .bg-red-500\\/50 {
    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-500) 50%, transparent);
    }
  }
  .bg-red-500\\/\\[50\\%\\] {
    background-color: color-mix(in srgb, oklch(63.7% 0.237 25.331) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-red-500) 50%, transparent);
    }
  }
  .bg-red-600 {
    background-color: var(--color-red-600);
  }
  .bg-red-tint {
    background-color: var(--red-tint);
  }
  .bg-red-tint\\/20 {
    background-color: var(--red-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--red-tint) 20%, transparent);
    }
  }
  .bg-red-tint\\/35 {
    background-color: var(--red-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--red-tint) 35%, transparent);
    }
  }
  .bg-surface {
    background-color: var(--surface);
  }
  .bg-surface\\/50 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 50%, transparent);
    }
  }
  .bg-surface\\/90 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 90%, transparent);
    }
  }
  .bg-surface\\/95 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 95%, transparent);
    }
  }
  .bg-tooltip-bg {
    background-color: var(--tooltip-bg);
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-white\\/20 {
    background-color: color-mix(in srgb, #fff 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 20%, transparent);
    }
  }
  .bg-white\\/40 {
    background-color: color-mix(in srgb, #fff 40%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 40%, transparent);
    }
  }
  .-bg-conic {
    --tw-gradient-position: in oklab;
    background-image: conic-gradient(var(--tw-gradient-stops));
  }
  .bg-conic {
    --tw-gradient-position: in oklab;
    background-image: conic-gradient(var(--tw-gradient-stops));
  }
  .bg-radial {
    --tw-gradient-position: in oklab;
    background-image: radial-gradient(var(--tw-gradient-stops));
  }
  .bg-none {
    background-image: none;
  }
  .via-none {
    --tw-gradient-via-stops: initial;
  }
  .mask-none {
    mask-image: none;
  }
  .mask-circle {
    --tw-mask-radial-shape: circle;
  }
  .mask-ellipse {
    --tw-mask-radial-shape: ellipse;
  }
  .mask-radial-closest-corner {
    --tw-mask-radial-size: closest-corner;
  }
  .mask-radial-closest-side {
    --tw-mask-radial-size: closest-side;
  }
  .mask-radial-farthest-corner {
    --tw-mask-radial-size: farthest-corner;
  }
  .mask-radial-farthest-side {
    --tw-mask-radial-size: farthest-side;
  }
  .mask-radial-at-bottom {
    --tw-mask-radial-position: bottom;
  }
  .mask-radial-at-bottom-left {
    --tw-mask-radial-position: bottom left;
  }
  .mask-radial-at-bottom-right {
    --tw-mask-radial-position: bottom right;
  }
  .mask-radial-at-center {
    --tw-mask-radial-position: center;
  }
  .mask-radial-at-left {
    --tw-mask-radial-position: left;
  }
  .mask-radial-at-right {
    --tw-mask-radial-position: right;
  }
  .mask-radial-at-top {
    --tw-mask-radial-position: top;
  }
  .mask-radial-at-top-left {
    --tw-mask-radial-position: top left;
  }
  .mask-radial-at-top-right {
    --tw-mask-radial-position: top right;
  }
  .box-decoration-clone {
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
  .box-decoration-slice {
    -webkit-box-decoration-break: slice;
    box-decoration-break: slice;
  }
  .decoration-clone {
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
  .decoration-slice {
    -webkit-box-decoration-break: slice;
    box-decoration-break: slice;
  }
  .bg-auto {
    background-size: auto;
  }
  .bg-contain {
    background-size: contain;
  }
  .bg-cover {
    background-size: cover;
  }
  .bg-fixed {
    background-attachment: fixed;
  }
  .bg-local {
    background-attachment: local;
  }
  .bg-scroll {
    background-attachment: scroll;
  }
  .bg-clip-border {
    background-clip: border-box;
  }
  .bg-clip-content {
    background-clip: content-box;
  }
  .bg-clip-padding {
    background-clip: padding-box;
  }
  .bg-clip-text {
    background-clip: text;
  }
  .bg-bottom {
    background-position: bottom;
  }
  .bg-bottom-left {
    background-position: left bottom;
  }
  .bg-bottom-right {
    background-position: right bottom;
  }
  .bg-center {
    background-position: center;
  }
  .bg-left {
    background-position: left;
  }
  .bg-left-bottom {
    background-position: left bottom;
  }
  .bg-left-top {
    background-position: left top;
  }
  .bg-right {
    background-position: right;
  }
  .bg-right-bottom {
    background-position: right bottom;
  }
  .bg-right-top {
    background-position: right top;
  }
  .bg-top {
    background-position: top;
  }
  .bg-top-left {
    background-position: left top;
  }
  .bg-top-right {
    background-position: right top;
  }
  .bg-no-repeat {
    background-repeat: no-repeat;
  }
  .bg-repeat {
    background-repeat: repeat;
  }
  .bg-repeat-round {
    background-repeat: round;
  }
  .bg-repeat-space {
    background-repeat: space;
  }
  .bg-repeat-x {
    background-repeat: repeat-x;
  }
  .bg-repeat-y {
    background-repeat: repeat-y;
  }
  .bg-origin-border {
    background-origin: border-box;
  }
  .bg-origin-content {
    background-origin: content-box;
  }
  .bg-origin-padding {
    background-origin: padding-box;
  }
  .mask-add {
    mask-composite: add;
  }
  .mask-exclude {
    mask-composite: exclude;
  }
  .mask-intersect {
    mask-composite: intersect;
  }
  .mask-subtract {
    mask-composite: subtract;
  }
  .mask-alpha {
    mask-mode: alpha;
  }
  .mask-luminance {
    mask-mode: luminance;
  }
  .mask-match {
    mask-mode: match-source;
  }
  .mask-type-alpha {
    mask-type: alpha;
  }
  .mask-type-luminance {
    mask-type: luminance;
  }
  .mask-auto {
    mask-size: auto;
  }
  .mask-contain {
    mask-size: contain;
  }
  .mask-cover {
    mask-size: cover;
  }
  .mask-clip-border {
    mask-clip: border-box;
  }
  .mask-clip-content {
    mask-clip: content-box;
  }
  .mask-clip-fill {
    mask-clip: fill-box;
  }
  .mask-clip-padding {
    mask-clip: padding-box;
  }
  .mask-clip-stroke {
    mask-clip: stroke-box;
  }
  .mask-clip-view {
    mask-clip: view-box;
  }
  .mask-no-clip {
    mask-clip: no-clip;
  }
  .mask-bottom {
    mask-position: bottom;
  }
  .mask-bottom-left {
    mask-position: left bottom;
  }
  .mask-bottom-right {
    mask-position: right bottom;
  }
  .mask-center {
    mask-position: center;
  }
  .mask-left {
    mask-position: left;
  }
  .mask-right {
    mask-position: right;
  }
  .mask-top {
    mask-position: top;
  }
  .mask-top-left {
    mask-position: left top;
  }
  .mask-top-right {
    mask-position: right top;
  }
  .mask-no-repeat {
    mask-repeat: no-repeat;
  }
  .mask-repeat {
    mask-repeat: repeat;
  }
  .mask-repeat-round {
    mask-repeat: round;
  }
  .mask-repeat-space {
    mask-repeat: space;
  }
  .mask-repeat-x {
    mask-repeat: repeat-x;
  }
  .mask-repeat-y {
    mask-repeat: repeat-y;
  }
  .mask-origin-border {
    mask-origin: border-box;
  }
  .mask-origin-content {
    mask-origin: content-box;
  }
  .mask-origin-fill {
    mask-origin: fill-box;
  }
  .mask-origin-padding {
    mask-origin: padding-box;
  }
  .mask-origin-stroke {
    mask-origin: stroke-box;
  }
  .mask-origin-view {
    mask-origin: view-box;
  }
  .fill-none {
    fill: none;
  }
  .stroke-none {
    stroke: none;
  }
  .object-contain {
    object-fit: contain;
  }
  .object-cover {
    object-fit: cover;
  }
  .object-fill {
    object-fit: fill;
  }
  .object-none {
    object-fit: none;
  }
  .object-scale-down {
    object-fit: scale-down;
  }
  .object-left-bottom {
    object-position: left bottom;
  }
  .object-left-top {
    object-position: left top;
  }
  .object-right-bottom {
    object-position: right bottom;
  }
  .object-right-top {
    object-position: right top;
  }
  .p-0 {
    padding: 0px;
  }
  .p-0\\.5 {
    padding: calc(var(--spacing) * 0.5);
  }
  .p-1 {
    padding: var(--spacing);
  }
  .p-1\\.5 {
    padding: calc(var(--spacing) * 1.5);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-2\\.5 {
    padding: calc(var(--spacing) * 2.5);
  }
  .p-3 {
    padding: calc(var(--spacing) * 3);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-5 {
    padding: calc(var(--spacing) * 5);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .p-8 {
    padding: calc(var(--spacing) * 8);
  }
  .p-24 {
    padding: calc(var(--spacing) * 24);
  }
  .px-0 {
    padding-inline: 0px;
  }
  .px-0\\.5 {
    padding-inline: calc(var(--spacing) * 0.5);
  }
  .px-1 {
    padding-inline: var(--spacing);
  }
  .px-1\\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-2\\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-3\\.5 {
    padding-inline: calc(var(--spacing) * 3.5);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-5 {
    padding-inline: calc(var(--spacing) * 5);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .px-8 {
    padding-inline: calc(var(--spacing) * 8);
  }
  .px-\\[3px\\] {
    padding-inline: 3px;
  }
  .py-0 {
    padding-block: 0px;
  }
  .py-0\\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-1 {
    padding-block: var(--spacing);
  }
  .py-1\\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-2\\.5 {
    padding-block: calc(var(--spacing) * 2.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-3\\.5 {
    padding-block: calc(var(--spacing) * 3.5);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-5 {
    padding-block: calc(var(--spacing) * 5);
  }
  .py-6 {
    padding-block: calc(var(--spacing) * 6);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-\\[3px\\] {
    padding-block: 3px;
  }
  .py-\\[5px\\] {
    padding-block: 5px;
  }
  .py-px {
    padding-block: 1px;
  }
  .pt-0 {
    padding-top: 0px;
  }
  .pt-0\\.5 {
    padding-top: calc(var(--spacing) * 0.5);
  }
  .pt-1 {
    padding-top: var(--spacing);
  }
  .pt-1\\.5 {
    padding-top: calc(var(--spacing) * 1.5);
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pt-2\\.5 {
    padding-top: calc(var(--spacing) * 2.5);
  }
  .pt-3 {
    padding-top: calc(var(--spacing) * 3);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
  }
  .pt-6 {
    padding-top: calc(var(--spacing) * 6);
  }
  .pt-8 {
    padding-top: calc(var(--spacing) * 8);
  }
  .pt-12 {
    padding-top: calc(var(--spacing) * 12);
  }
  .pt-14 {
    padding-top: calc(var(--spacing) * 14);
  }
  .pr-0 {
    padding-right: 0px;
  }
  .pr-0\\.5 {
    padding-right: calc(var(--spacing) * 0.5);
  }
  .pr-1 {
    padding-right: var(--spacing);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-2\\.5 {
    padding-right: calc(var(--spacing) * 2.5);
  }
  .pr-3 {
    padding-right: calc(var(--spacing) * 3);
  }
  .pr-4 {
    padding-right: calc(var(--spacing) * 4);
  }
  .pr-7 {
    padding-right: calc(var(--spacing) * 7);
  }
  .pr-8 {
    padding-right: calc(var(--spacing) * 8);
  }
  .pr-\\[3px\\] {
    padding-right: 3px;
  }
  .pb-0 {
    padding-bottom: 0px;
  }
  .pb-1 {
    padding-bottom: var(--spacing);
  }
  .pb-1\\.5 {
    padding-bottom: calc(var(--spacing) * 1.5);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing) * 2);
  }
  .pb-3 {
    padding-bottom: calc(var(--spacing) * 3);
  }
  .pb-3\\.5 {
    padding-bottom: calc(var(--spacing) * 3.5);
  }
  .pb-4 {
    padding-bottom: calc(var(--spacing) * 4);
  }
  .pb-5 {
    padding-bottom: calc(var(--spacing) * 5);
  }
  .pb-6 {
    padding-bottom: calc(var(--spacing) * 6);
  }
  .pb-8 {
    padding-bottom: calc(var(--spacing) * 8);
  }
  .pb-12 {
    padding-bottom: calc(var(--spacing) * 12);
  }
  .pb-24 {
    padding-bottom: calc(var(--spacing) * 24);
  }
  .pl-0 {
    padding-left: 0px;
  }
  .pl-0\\.5 {
    padding-left: calc(var(--spacing) * 0.5);
  }
  .pl-1 {
    padding-left: var(--spacing);
  }
  .pl-1\\.5 {
    padding-left: calc(var(--spacing) * 1.5);
  }
  .pl-2 {
    padding-left: calc(var(--spacing) * 2);
  }
  .pl-2\\.5 {
    padding-left: calc(var(--spacing) * 2.5);
  }
  .pl-3 {
    padding-left: calc(var(--spacing) * 3);
  }
  .pl-3\\.5 {
    padding-left: calc(var(--spacing) * 3.5);
  }
  .pl-4 {
    padding-left: calc(var(--spacing) * 4);
  }
  .pl-6 {
    padding-left: calc(var(--spacing) * 6);
  }
  .pl-8 {
    padding-left: calc(var(--spacing) * 8);
  }
  .pl-14 {
    padding-left: calc(var(--spacing) * 14);
  }
  .pl-\\[3px\\] {
    padding-left: 3px;
  }
  .text-center {
    text-align: center;
  }
  .text-end {
    text-align: end;
  }
  .text-justify {
    text-align: justify;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .text-start {
    text-align: start;
  }
  .align-baseline {
    vertical-align: baseline;
  }
  .align-bottom {
    vertical-align: bottom;
  }
  .align-middle {
    vertical-align: middle;
  }
  .align-sub {
    vertical-align: sub;
  }
  .align-super {
    vertical-align: super;
  }
  .align-text-bottom {
    vertical-align: text-bottom;
  }
  .align-text-top {
    vertical-align: text-top;
  }
  .align-top {
    vertical-align: top;
  }
  .font-mono {
    font-family: var(--font-mono-face), ui-monospace, "SF Mono", monospace;
  }
  .font-sans {
    font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  }
  .text-3xl {
    font-size: var(--text-3xl);
    line-height: var(--tw-leading, var(--text-3xl--line-height));
  }
  .text-4xl {
    font-size: var(--text-4xl);
    line-height: var(--tw-leading, var(--text-4xl--line-height));
  }
  .text-9xl {
    font-size: var(--text-9xl);
    line-height: var(--tw-leading, var(--text-9xl--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .text-\\[7px\\] {
    font-size: 7px;
  }
  .text-\\[8\\.5px\\] {
    font-size: 8.5px;
  }
  .text-\\[8px\\] {
    font-size: 8px;
  }
  .text-\\[9\\.5px\\] {
    font-size: 9.5px;
  }
  .text-\\[9px\\] {
    font-size: 9px;
  }
  .text-\\[10\\.5px\\] {
    font-size: 10.5px;
  }
  .text-\\[10px\\] {
    font-size: 10px;
  }
  .text-\\[11\\.5px\\] {
    font-size: 11.5px;
  }
  .text-\\[11px\\] {
    font-size: 11px;
  }
  .text-\\[12\\.5px\\] {
    font-size: 12.5px;
  }
  .text-\\[12px\\] {
    font-size: 12px;
  }
  .text-\\[13\\.5px\\] {
    font-size: 13.5px;
  }
  .text-\\[13px\\] {
    font-size: 13px;
  }
  .text-\\[14px\\] {
    font-size: 14px;
  }
  .text-\\[15px\\] {
    font-size: 15px;
  }
  .text-\\[16px\\] {
    font-size: 16px;
  }
  .text-\\[17px\\] {
    font-size: 17px;
  }
  .text-\\[20px\\] {
    font-size: 20px;
  }
  .text-\\[34px\\] {
    font-size: 34px;
  }
  .text-\\[80px\\] {
    font-size: 80px;
  }
  .leading-4 {
    --tw-leading: calc(var(--spacing) * 4);
    line-height: calc(var(--spacing) * 4);
  }
  .leading-5 {
    --tw-leading: calc(var(--spacing) * 5);
    line-height: calc(var(--spacing) * 5);
  }
  .leading-6 {
    --tw-leading: calc(var(--spacing) * 6);
    line-height: calc(var(--spacing) * 6);
  }
  .leading-\\[1\\.3\\] {
    --tw-leading: 1.3;
    line-height: 1.3;
  }
  .leading-\\[1\\.4\\] {
    --tw-leading: 1.4;
    line-height: 1.4;
  }
  .leading-\\[1\\.6\\] {
    --tw-leading: 1.6;
    line-height: 1.6;
  }
  .leading-\\[1\\.7\\] {
    --tw-leading: 1.7;
    line-height: 1.7;
  }
  .leading-\\[1\\.12\\] {
    --tw-leading: 1.12;
    line-height: 1.12;
  }
  .leading-\\[1\\.86\\] {
    --tw-leading: 1.86;
    line-height: 1.86;
  }
  .leading-\\[18px\\] {
    --tw-leading: 18px;
    line-height: 18px;
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .leading-normal {
    --tw-leading: var(--leading-normal);
    line-height: var(--leading-normal);
  }
  .leading-relaxed {
    --tw-leading: var(--leading-relaxed);
    line-height: var(--leading-relaxed);
  }
  .leading-snug {
    --tw-leading: var(--leading-snug);
    line-height: var(--leading-snug);
  }
  .leading-tight {
    --tw-leading: var(--leading-tight);
    line-height: var(--leading-tight);
  }
  .font-black {
    --tw-font-weight: var(--font-weight-black);
    font-weight: var(--font-weight-black);
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-extrabold {
    --tw-font-weight: var(--font-weight-extrabold);
    font-weight: var(--font-weight-extrabold);
  }
  .font-extralight {
    --tw-font-weight: var(--font-weight-extralight);
    font-weight: var(--font-weight-extralight);
  }
  .font-light {
    --tw-font-weight: var(--font-weight-light);
    font-weight: var(--font-weight-light);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-normal {
    --tw-font-weight: var(--font-weight-normal);
    font-weight: var(--font-weight-normal);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .font-thin {
    --tw-font-weight: var(--font-weight-thin);
    font-weight: var(--font-weight-thin);
  }
  .tracking-\\[-0\\.01em\\] {
    --tw-tracking: -0.01em;
    letter-spacing: -0.01em;
  }
  .tracking-\\[0\\.08em\\] {
    --tw-tracking: 0.08em;
    letter-spacing: 0.08em;
  }
  .tracking-tight {
    --tw-tracking: var(--tracking-tight);
    letter-spacing: var(--tracking-tight);
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide);
    letter-spacing: var(--tracking-wide);
  }
  .tracking-wider {
    --tw-tracking: var(--tracking-wider);
    letter-spacing: var(--tracking-wider);
  }
  .text-balance {
    text-wrap: balance;
  }
  .text-nowrap {
    text-wrap: nowrap;
  }
  .text-pretty {
    text-wrap: pretty;
  }
  .text-wrap {
    text-wrap: wrap;
  }
  .break-normal {
    overflow-wrap: normal;
    word-break: normal;
  }
  .\\[overflow-wrap\\:anywhere\\] {
    overflow-wrap: anywhere;
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .wrap-anywhere {
    overflow-wrap: anywhere;
  }
  .wrap-break-word {
    overflow-wrap: break-word;
  }
  .wrap-normal {
    overflow-wrap: normal;
  }
  .break-all {
    word-break: break-all;
  }
  .break-keep {
    word-break: keep-all;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }
  .text-clip {
    text-overflow: clip;
  }
  .text-ellipsis {
    text-overflow: ellipsis;
  }
  .hyphens-auto {
    -webkit-hyphens: auto;
    hyphens: auto;
  }
  .hyphens-manual {
    -webkit-hyphens: manual;
    hyphens: manual;
  }
  .hyphens-none {
    -webkit-hyphens: none;
    hyphens: none;
  }
  .whitespace-break-spaces {
    white-space: break-spaces;
  }
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }
  .\\!text-tooltip-muted {
    color: var(--tooltip-muted) !important;
  }
  .\\[color\\:red\\] {
    color: red;
  }
  .\\[color\\:red\\]\\/50 {
    color: color-mix(in oklab, red 50%, transparent);
  }
  .\\[color\\:red\\]\\/50\\! {
    color: color-mix(in oklab, red 50%, transparent) !important;
  }
  .text-accent {
    color: var(--accent);
  }
  .text-accent-ink {
    color: var(--accent-ink);
  }
  .text-blue-500 {
    color: var(--color-blue-500);
  }
  .text-blue-700 {
    color: var(--color-blue-700);
  }
  .text-canvas {
    color: var(--canvas);
  }
  .text-gray-500 {
    color: var(--color-gray-500);
  }
  .text-green {
    color: var(--green);
  }
  .text-green-500 {
    color: var(--color-green-500);
  }
  .text-ink {
    color: var(--ink);
  }
  .text-ink-2 {
    color: var(--ink-2);
  }
  .text-ink-3 {
    color: var(--ink-3);
  }
  .text-ink-3\\/60 {
    color: var(--ink-3);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--ink-3) 60%, transparent);
    }
  }
  .text-orange {
    color: var(--orange);
  }
  .text-orange-500 {
    color: var(--color-orange-500);
  }
  .text-purple-500 {
    color: var(--color-purple-500);
  }
  .text-purple-700 {
    color: var(--color-purple-700);
  }
  .text-red {
    color: var(--red);
  }
  .text-red-500 {
    color: var(--color-red-500);
  }
  .text-surface {
    color: var(--surface);
  }
  .text-tooltip-fg {
    color: var(--tooltip-fg);
  }
  .text-tooltip-muted {
    color: var(--tooltip-muted);
  }
  .text-transparent {
    color: transparent;
  }
  .text-white {
    color: var(--color-white);
  }
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .normal-case {
    text-transform: none;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .italic {
    font-style: italic;
  }
  .not-italic {
    font-style: normal;
  }
  .font-stretch-condensed {
    font-stretch: condensed;
  }
  .font-stretch-expanded {
    font-stretch: expanded;
  }
  .font-stretch-extra-condensed {
    font-stretch: extra-condensed;
  }
  .font-stretch-extra-expanded {
    font-stretch: extra-expanded;
  }
  .font-stretch-normal {
    font-stretch: normal;
  }
  .font-stretch-semi-condensed {
    font-stretch: semi-condensed;
  }
  .font-stretch-semi-expanded {
    font-stretch: semi-expanded;
  }
  .font-stretch-ultra-condensed {
    font-stretch: ultra-condensed;
  }
  .font-stretch-ultra-expanded {
    font-stretch: ultra-expanded;
  }
  .diagonal-fractions {
    --tw-numeric-fraction: diagonal-fractions;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .lining-nums {
    --tw-numeric-figure: lining-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .oldstyle-nums {
    --tw-numeric-figure: oldstyle-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .ordinal {
    --tw-ordinal: ordinal;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .proportional-nums {
    --tw-numeric-spacing: proportional-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .slashed-zero {
    --tw-slashed-zero: slashed-zero;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .stacked-fractions {
    --tw-numeric-fraction: stacked-fractions;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .normal-nums {
    font-variant-numeric: normal;
  }
  .line-through {
    text-decoration-line: line-through;
  }
  .no-underline {
    text-decoration-line: none;
  }
  .overline {
    text-decoration-line: overline;
  }
  .underline {
    text-decoration-line: underline;
  }
  .underline\\! {
    text-decoration-line: underline !important;
  }
  .decoration-line-strong {
    text-decoration-color: var(--line-strong);
  }
  .decoration-transparent {
    text-decoration-color: transparent;
  }
  .decoration-dashed {
    text-decoration-style: dashed;
  }
  .decoration-dotted {
    text-decoration-style: dotted;
  }
  .decoration-double {
    text-decoration-style: double;
  }
  .decoration-solid {
    text-decoration-style: solid;
  }
  .decoration-wavy {
    text-decoration-style: wavy;
  }
  .decoration-auto {
    text-decoration-thickness: auto;
  }
  .decoration-from-font {
    text-decoration-thickness: from-font;
  }
  .underline-offset-2 {
    text-underline-offset: 2px;
  }
  .underline-offset-4 {
    text-underline-offset: 4px;
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .subpixel-antialiased {
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
  }
  .accent-accent {
    accent-color: var(--accent);
  }
  .accent-auto {
    accent-color: auto;
  }
  .accent-ink {
    accent-color: var(--ink);
  }
  .scheme-dark {
    color-scheme: dark;
  }
  .scheme-light {
    color-scheme: light;
  }
  .scheme-light-dark {
    color-scheme: light dark;
  }
  .scheme-normal {
    color-scheme: normal;
  }
  .scheme-only-dark {
    color-scheme: only dark;
  }
  .scheme-only-light {
    color-scheme: only light;
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-25 {
    opacity: 25%;
  }
  .opacity-40 {
    opacity: 40%;
  }
  .opacity-45 {
    opacity: 45%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-60 {
    opacity: 60%;
  }
  .opacity-70 {
    opacity: 70%;
  }
  .opacity-75 {
    opacity: 75%;
  }
  .opacity-80 {
    opacity: 80%;
  }
  .opacity-90 {
    opacity: 90%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .mix-blend-plus-darker {
    mix-blend-mode: plus-darker;
  }
  .mix-blend-plus-lighter {
    mix-blend-mode: plus-lighter;
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\\[0_0_0_1\\.5px_var\\(--canvas\\)\\] {
    --tw-shadow: 0 0 0 1.5px var(--tw-shadow-color, var(--canvas));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\\[inset_0_0_0_1\\.5px_var\\(--line-strong\\)\\] {
    --tw-shadow: inset 0 0 0 1.5px var(--tw-shadow-color, var(--line-strong));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-btn {
    --tw-shadow: var(--shadow-btn);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-card {
    --tw-shadow: var(--shadow-card);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-hairline {
    --tw-shadow: var(--shadow-hairline);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-inner {
    --tw-shadow: inset 0 2px 4px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-inset-field {
    --tw-shadow: var(--shadow-inset-field);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-md {
    --tw-shadow: 0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-none {
    --tw-shadow: 0 0 #0000;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-overlay {
    --tw-shadow: var(--shadow-overlay);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-raised {
    --tw-shadow: var(--shadow-raised);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-sm {
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xs {
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-2 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .inset-ring {
    --tw-inset-ring-shadow: inset 0 0 0 1px var(--tw-inset-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-initial {
    --tw-shadow-color: initial;
  }
  .ring-accent {
    --tw-ring-color: var(--accent);
  }
  .ring-accent\\/20 {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 20%, transparent);
    }
  }
  .ring-accent\\/40 {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 40%, transparent);
    }
  }
  .ring-blue-700 {
    --tw-ring-color: var(--color-blue-700);
  }
  .ring-blue-700\\/10 {
    --tw-ring-color: color-mix(in srgb, oklch(48.8% 0.243 264.376) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-blue-700) 10%, transparent);
    }
  }
  .ring-inset {
    --tw-ring-color: var(--inset);
  }
  .ring-purple-700 {
    --tw-ring-color: var(--color-purple-700);
  }
  .ring-purple-700\\/10 {
    --tw-ring-color: color-mix(in srgb, oklch(49.6% 0.265 301.924) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-purple-700) 10%, transparent);
    }
  }
  .inset-shadow-initial {
    --tw-inset-shadow-color: initial;
  }
  .outline-hidden {
    --tw-outline-style: none;
    outline-style: none;
    @media (forced-colors: active) {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .blur {
    --tw-blur: blur(8px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .blur-3xl {
    --tw-blur: blur(var(--blur-3xl));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .blur-\\[6px\\] {
    --tw-blur: blur(6px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .blur-xl {
    --tw-blur: blur(var(--blur-xl));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .drop-shadow {
    --tw-drop-shadow-size: drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.1))) drop-shadow(0 1px 1px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.06)));
    --tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow( 0 1px 1px rgb(0 0 0 / 0.06));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .drop-shadow-none {
    --tw-drop-shadow:  ;
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .grayscale {
    --tw-grayscale: grayscale(100%);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .invert {
    --tw-invert: invert(100%);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .sepia {
    --tw-sepia: sepia(100%);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .backdrop-blur {
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-md {
    --tw-backdrop-blur: blur(var(--blur-md));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-xs {
    --tw-backdrop-blur: blur(var(--blur-xs));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-grayscale {
    --tw-backdrop-grayscale: grayscale(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-invert {
    --tw-backdrop-invert: invert(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-sepia {
    --tw-backdrop-sepia: sepia(100%);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-filter {
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,box-shadow\\,color\\] {
    transition-property: background-color,box-shadow,color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,box-shadow\\] {
    transition-property: background-color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,box-shadow\\,transform\\] {
    transition-property: background-color,color,box-shadow,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,opacity\\] {
    transition-property: background-color,color,opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,transform\\] {
    transition-property: background-color,color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,opacity\\] {
    transition-property: background-color,opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,transform\\] {
    transition-property: background-color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[border-color\\,border-radius\\] {
    transition-property: border-color,border-radius;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[border-color\\,box-shadow\\] {
    transition-property: border-color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[border-radius\\] {
    transition-property: border-radius;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[color\\,box-shadow\\] {
    transition-property: color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[color\\,transform\\] {
    transition-property: color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[grid-template-rows\\,opacity\\] {
    transition-property: grid-template-rows,opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[max-width\\,opacity\\,margin\\] {
    transition-property: max-width,opacity,margin;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[max-width\\,opacity\\,transform\\] {
    transition-property: max-width,opacity,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\,filter\\,transform\\] {
    transition-property: opacity,filter,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\,transform\\,background-color\\] {
    transition-property: opacity,transform,background-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\,transform\\,box-shadow\\] {
    transition-property: opacity,transform,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\,transform\\] {
    transition-property: opacity,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[width\\,opacity\\] {
    transition-property: width,opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[width\\] {
    transition-property: width;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-shadow {
    transition-property: box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-discrete {
    transition-behavior: allow-discrete;
  }
  .transition-normal {
    transition-behavior: normal;
  }
  .duration-100 {
    --tw-duration: 100ms;
    transition-duration: 100ms;
  }
  .duration-150 {
    --tw-duration: 150ms;
    transition-duration: 150ms;
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .duration-400 {
    --tw-duration: 400ms;
    transition-duration: 400ms;
  }
  .duration-500 {
    --tw-duration: 500ms;
    transition-duration: 500ms;
  }
  .duration-700 {
    --tw-duration: 700ms;
    transition-duration: 700ms;
  }
  .ease-in {
    --tw-ease: var(--ease-in);
    transition-timing-function: var(--ease-in);
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .ease-link {
    --tw-ease: cubic-bezier(0.16, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .ease-out-strong {
    --tw-ease: cubic-bezier(0.23, 1, 0.32, 1);
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }
  .\\[will-change\\:filter\\,opacity\\] {
    will-change: filter,opacity;
  }
  .will-change-auto {
    will-change: auto;
  }
  .will-change-contents {
    will-change: contents;
  }
  .will-change-scroll {
    will-change: scroll-position;
  }
  .will-change-transform {
    will-change: transform;
  }
  .contain-inline-size {
    --tw-contain-size: inline-size;
    contain: var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,);
  }
  .contain-layout {
    --tw-contain-layout: layout;
    contain: var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,);
  }
  .contain-paint {
    --tw-contain-paint: paint;
    contain: var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,);
  }
  .contain-size {
    --tw-contain-size: size;
    contain: var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,);
  }
  .contain-style {
    --tw-contain-style: style;
    contain: var(--tw-contain-size,) var(--tw-contain-layout,) var(--tw-contain-paint,) var(--tw-contain-style,);
  }
  .contain-content {
    contain: content;
  }
  .contain-none {
    contain: none;
  }
  .contain-strict {
    contain: strict;
  }
  .content-none {
    --tw-content: none;
    content: none;
  }
  .forced-color-adjust-auto {
    forced-color-adjust: auto;
  }
  .forced-color-adjust-none {
    forced-color-adjust: none;
  }
  .outline-dashed {
    --tw-outline-style: dashed;
    outline-style: dashed;
  }
  .outline-dotted {
    --tw-outline-style: dotted;
    outline-style: dotted;
  }
  .outline-double {
    --tw-outline-style: double;
    outline-style: double;
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .outline-solid {
    --tw-outline-style: solid;
    outline-style: solid;
  }
  .select-all {
    -webkit-user-select: all;
    user-select: all;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .\\[hash\\:10\\] {
    hash: 10;
  }
  .\\[k\\:K\\] {
    k: K;
  }
  .\\[vite\\:html\\] {
    vite: html;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .backface-visible {
    backface-visibility: visible;
  }
  .block-auto {
    block-size: auto;
  }
  .block-lh {
    block-size: 1lh;
  }
  .block-screen {
    block-size: 100vh;
  }
  :where(.divide-x-reverse > :not(:last-child)) {
    --tw-divide-x-reverse: 1;
  }
  .duration-initial {
    --tw-duration: initial;
  }
  .inline-auto {
    inline-size: auto;
  }
  .inline-screen {
    inline-size: 100vw;
  }
  .max-block-lh {
    max-block-size: 1lh;
  }
  .max-block-none {
    max-block-size: none;
  }
  .max-block-screen {
    max-block-size: 100vh;
  }
  .max-inline-none {
    max-inline-size: none;
  }
  .max-inline-screen {
    max-inline-size: 100vw;
  }
  .min-block-auto {
    min-block-size: auto;
  }
  .min-block-lh {
    min-block-size: 1lh;
  }
  .min-block-screen {
    min-block-size: 100vh;
  }
  .min-inline-auto {
    min-inline-size: auto;
  }
  .min-inline-screen {
    min-inline-size: 100vw;
  }
  .ring-inset {
    --tw-ring-inset: inset;
  }
  .text-shadow-initial {
    --tw-text-shadow-color: initial;
  }
  .transform-3d {
    transform-style: preserve-3d;
  }
  .transform-border {
    transform-box: border-box;
  }
  .transform-content {
    transform-box: content-box;
  }
  .transform-fill {
    transform-box: fill-box;
  }
  .transform-flat {
    transform-style: flat;
  }
  .transform-stroke {
    transform-box: stroke-box;
  }
  .transform-view {
    transform-box: view-box;
  }
  @media (hover: hover) {
    .group-hover\\:bg-ink-3:is(:where(.group):hover *) {
      background-color: var(--ink-3);
    }
    .group-hover\\:opacity-100:is(:where(.group):hover *) {
      opacity: 100%;
    }
    .group-hover\\/row\\:opacity-0:is(:where(.group\\/row):hover *) {
      opacity: 0%;
    }
    .group-hover\\/row\\:opacity-100:is(:where(.group\\/row):hover *) {
      opacity: 100%;
    }
  }
  .group-has-data-pending\\:opacity-50:is(:where(.group):has([data-pending]) *) {
    opacity: 50%;
  }
  .file\\:border-0::file-selector-button {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .file\\:bg-transparent::file-selector-button {
    background-color: transparent;
  }
  .file\\:text-sm::file-selector-button {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .file\\:font-medium::file-selector-button {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .placeholder\\:text-ink-3::placeholder {
    color: var(--ink-3);
  }
  .first\\:rounded-l-full:first-child {
    border-top-left-radius: calc(infinity * 1px);
    border-bottom-left-radius: calc(infinity * 1px);
  }
  .first\\:border-t-0:first-child {
    border-top-style: var(--tw-border-style);
    border-top-width: 0px;
  }
  .first\\:pt-0:first-child {
    padding-top: 0px;
  }
  .last\\:rounded-r-full:last-child {
    border-top-right-radius: calc(infinity * 1px);
    border-bottom-right-radius: calc(infinity * 1px);
  }
  .last\\:border-0:last-child {
    border-style: var(--tw-border-style);
    border-width: 0px;
  }
  .last\\:pb-0:last-child {
    padding-bottom: 0px;
  }
  .focus-within\\:border-accent:focus-within {
    border-color: var(--accent);
  }
  .focus-within\\:border-line-strong:focus-within {
    border-color: var(--line-strong);
  }
  .focus-within\\:bg-hover:focus-within {
    background-color: var(--hover);
  }
  .focus-within\\:bg-surface:focus-within {
    background-color: var(--surface);
  }
  .focus-within\\:shadow-btn:focus-within {
    --tw-shadow: var(--shadow-btn);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-within\\:ring-2:focus-within {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-within\\:ring-accent\\/20:focus-within {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 20%, transparent);
    }
  }
  @media (hover: hover) {
    .hover\\:border-accent\\/40:hover {
      border-color: var(--accent);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-accent\\/40:hover {
        border-color: color-mix(in oklab, var(--accent) 40%, transparent);
      }
    }
    .hover\\:border-line-strong:hover {
      border-color: var(--line-strong);
    }
    .hover\\:border-orange\\/50:hover {
      border-color: var(--orange);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-orange\\/50:hover {
        border-color: color-mix(in oklab, var(--orange) 50%, transparent);
      }
    }
    .hover\\:border-red\\/50:hover {
      border-color: var(--red);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-red\\/50:hover {
        border-color: color-mix(in oklab, var(--red) 50%, transparent);
      }
    }
    .hover\\:bg-accent:hover {
      background-color: var(--accent);
    }
    .hover\\:bg-accent-tint:hover {
      background-color: var(--accent-tint);
    }
    .hover\\:bg-field:hover {
      background-color: var(--field);
    }
    .hover\\:bg-hover:hover {
      background-color: var(--hover);
    }
    .hover\\:bg-hover-2:hover {
      background-color: var(--hover-2);
    }
    .hover\\:bg-hover\\/20:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/20:hover {
        background-color: color-mix(in oklab, var(--hover) 20%, transparent);
      }
    }
    .hover\\:bg-hover\\/30:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/30:hover {
        background-color: color-mix(in oklab, var(--hover) 30%, transparent);
      }
    }
    .hover\\:bg-hover\\/40:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/40:hover {
        background-color: color-mix(in oklab, var(--hover) 40%, transparent);
      }
    }
    .hover\\:bg-hover\\/60:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/60:hover {
        background-color: color-mix(in oklab, var(--hover) 60%, transparent);
      }
    }
    .hover\\:bg-line-strong:hover {
      background-color: var(--line-strong);
    }
    .hover\\:bg-line\\/70:hover {
      background-color: var(--line);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-line\\/70:hover {
        background-color: color-mix(in oklab, var(--line) 70%, transparent);
      }
    }
    .hover\\:bg-red-tint:hover {
      background-color: var(--red-tint);
    }
    .hover\\:\\!text-tooltip-fg:hover {
      color: var(--tooltip-fg) !important;
    }
    .hover\\:text-ink:hover {
      color: var(--ink);
    }
    .hover\\:text-ink-2:hover {
      color: var(--ink-2);
    }
    .hover\\:text-red:hover {
      color: var(--red);
    }
    .hover\\:text-tooltip-fg:hover {
      color: var(--tooltip-fg);
    }
    .hover\\:underline:hover {
      text-decoration-line: underline;
    }
    .hover\\:decoration-current:hover {
      text-decoration-color: currentcolor;
    }
    .hover\\:opacity-75:hover {
      opacity: 75%;
    }
    .hover\\:opacity-85:hover {
      opacity: 85%;
    }
    .hover\\:opacity-90:hover {
      opacity: 90%;
    }
  }
  .focus\\:w-80:focus {
    width: calc(var(--spacing) * 80);
  }
  .focus\\:border-accent:focus {
    border-color: var(--accent);
  }
  .focus\\:bg-accent:focus {
    background-color: var(--accent);
  }
  .focus\\:bg-surface:focus {
    background-color: var(--surface);
  }
  .focus\\:ring-2:focus {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus\\:ring-offset-2:focus {
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  }
  .focus\\:outline-hidden:focus {
    --tw-outline-style: none;
    outline-style: none;
    @media (forced-colors: active) {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
  .focus\\:outline-none:focus {
    --tw-outline-style: none;
    outline-style: none;
  }
  .focus-visible\\:text-accent-ink:focus-visible {
    color: var(--accent-ink);
  }
  .focus-visible\\:ring-1:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-\\[3px\\]:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:outline-2:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  .focus-visible\\:outline-none:focus-visible {
    --tw-outline-style: none;
    outline-style: none;
  }
  .active\\:scale-95:active {
    --tw-scale-x: 95%;
    --tw-scale-y: 95%;
    --tw-scale-z: 95%;
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .active\\:scale-\\[0\\.94\\]:active {
    scale: 0.94;
  }
  .active\\:scale-\\[0\\.96\\]:active {
    scale: 0.96;
  }
  .active\\:scale-\\[0\\.98\\]:active {
    scale: 0.98;
  }
  @media (hover: hover) {
    .enabled\\:hover\\:bg-hover:enabled:hover {
      background-color: var(--hover);
    }
    .enabled\\:hover\\:text-ink-2:enabled:hover {
      color: var(--ink-2);
    }
  }
  .enabled\\:active\\:scale-\\[0\\.94\\]:enabled:active {
    scale: 0.94;
  }
  .enabled\\:active\\:scale-\\[0\\.96\\]:enabled:active {
    scale: 0.96;
  }
  .disabled\\:pointer-events-none:disabled {
    pointer-events: none;
  }
  .disabled\\:cursor-default:disabled {
    cursor: default;
  }
  .disabled\\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }
  .disabled\\:bg-inset:disabled {
    background-color: var(--inset);
  }
  .disabled\\:text-ink-3:disabled {
    color: var(--ink-3);
  }
  .disabled\\:opacity-35:disabled {
    opacity: 35%;
  }
  .disabled\\:opacity-40:disabled {
    opacity: 40%;
  }
  .disabled\\:opacity-50:disabled {
    opacity: 50%;
  }
  .disabled\\:shadow-none:disabled {
    --tw-shadow: 0 0 #0000;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .has-data-pending\\:opacity-30:has([data-pending]) {
    opacity: 30%;
  }
  .has-\\[input\\:focus-visible\\]\\:bg-accent:has(:is(input:focus-visible)) {
    background-color: var(--accent);
  }
  .data-\\[disabled\\]\\:pointer-events-none[data-disabled] {
    pointer-events: none;
  }
  .data-\\[disabled\\]\\:opacity-50[data-disabled] {
    opacity: 50%;
  }
  .data-\\[disabled\\=true\\]\\:pointer-events-none[data-disabled="true"] {
    pointer-events: none;
  }
  .data-\\[disabled\\=true\\]\\:opacity-50[data-disabled="true"] {
    opacity: 50%;
  }
  .data-\\[selected\\=true\\]\\:bg-accent[data-selected="true"] {
    background-color: var(--accent);
  }
  .data-\\[side\\=bottom\\]\\:translate-y-1[data-side="bottom"] {
    --tw-translate-y: var(--spacing);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .data-\\[side\\=left\\]\\:-right-1[data-side="left"] {
    right: calc(var(--spacing) * -1);
  }
  .data-\\[side\\=left\\]\\:-translate-x-1[data-side="left"] {
    --tw-translate-x: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .data-\\[side\\=right\\]\\:translate-x-1[data-side="right"] {
    --tw-translate-x: var(--spacing);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .data-\\[side\\=top\\]\\:-translate-y-1[data-side="top"] {
    --tw-translate-y: calc(var(--spacing) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .data-\\[size\\=default\\]\\:h-9[data-size="default"] {
    height: calc(var(--spacing) * 9);
  }
  .data-\\[size\\=sm\\]\\:h-8[data-size="sm"] {
    height: calc(var(--spacing) * 8);
  }
  :is(.\\*\\:data-\\[slot\\=select-value\\]\\:line-clamp-1 > *)[data-slot="select-value"] {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  :is(.\\*\\:data-\\[slot\\=select-value\\]\\:flex > *)[data-slot="select-value"] {
    display: flex;
  }
  :is(.\\*\\:data-\\[slot\\=select-value\\]\\:items-center > *)[data-slot="select-value"] {
    align-items: center;
  }
  :is(.\\*\\:data-\\[slot\\=select-value\\]\\:gap-2 > *)[data-slot="select-value"] {
    gap: calc(var(--spacing) * 2);
  }
  @media (prefers-reduced-motion: reduce) {
    .motion-reduce\\:animate-none {
      animation: none;
    }
    .motion-reduce\\:transition-none {
      transition-property: none;
    }
  }
  @media (width >= 40rem) {
    .sm\\:flex {
      display: flex;
    }
    .sm\\:inline {
      display: inline;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:flex-wrap {
      flex-wrap: wrap;
    }
    .sm\\:items-start {
      align-items: flex-start;
    }
    .sm\\:justify-between {
      justify-content: space-between;
    }
    .sm\\:gap-2 {
      gap: calc(var(--spacing) * 2);
    }
    .sm\\:gap-x-8 {
      column-gap: calc(var(--spacing) * 8);
    }
    .sm\\:p-4 {
      padding: calc(var(--spacing) * 4);
    }
    .sm\\:p-10 {
      padding: calc(var(--spacing) * 10);
    }
    .sm\\:text-\\[40px\\] {
      font-size: 40px;
    }
    .sm\\:group-data-\\[size\\=default\\]\\/alert-dialog-content\\:text-left:is(:where(.group\\/alert-dialog-content)[data-size="default"] *) {
      text-align: left;
    }
  }
  @media (width >= 48rem) {
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-\\[12rem_1fr\\] {
      grid-template-columns: 12rem 1fr;
    }
    .md\\:border-r {
      border-right-style: var(--tw-border-style);
      border-right-width: 1px;
    }
    .md\\:border-b-0 {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 0px;
    }
  }
  @media (width >= 64rem) {
    .lg\\:hidden {
      display: none;
    }
    .lg\\:translate-x-0 {
      --tw-translate-x: 0px;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
    .lg\\:pl-70 {
      padding-left: calc(var(--spacing) * 70);
    }
  }
  .rtl\\:rotate-180:where(:dir(rtl), [dir="rtl"], [dir="rtl"] *) {
    rotate: 180deg;
  }
  :host-context(.dark) .dark\\:bg-accent-tint {
    background-color: var(--accent-tint);
  }
  :host-context(.dark) .dark\\:bg-blue-950 {
    background-color: var(--color-blue-950);
  }
  :host-context(.dark) .dark\\:bg-field {
    background-color: var(--field);
  }
  :host-context(.dark) .dark\\:bg-purple-950 {
    background-color: var(--color-purple-950);
  }
  :host-context(.dark) .dark\\:bg-slate-950 {
    background-color: var(--color-slate-950);
  }
  :host-context(.dark) .dark\\:text-blue-300 {
    color: var(--color-blue-300);
  }
  :host-context(.dark) .dark\\:text-purple-300 {
    color: var(--color-purple-300);
  }
  :host-context(.dark) .dark\\:ring-blue-300\\/20 {
    --tw-ring-color: color-mix(in srgb, oklch(80.9% 0.105 251.813) 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-blue-300) 20%, transparent);
    }
  }
  :host-context(.dark) .dark\\:ring-purple-300\\/20 {
    --tw-ring-color: color-mix(in srgb, oklch(82.7% 0.119 306.383) 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--color-purple-300) 20%, transparent);
    }
  }
  @media (hover: hover) {
    :host-context(.dark) .dark\\:hover\\:bg-hover:hover {
      background-color: var(--hover);
    }
    :host-context(.dark) .hover\\:dark\\:\\!bg-gray-100:hover {
      background-color: var(--color-gray-100) !important;
    }
    :host-context(.dark) .hover\\:dark\\:bg-gray-100:hover {
      background-color: var(--color-gray-100);
    }
  }
  .\\[\\&_\\[cmdk-group-heading\\]\\]\\:px-2 [cmdk-group-heading] {
    padding-inline: calc(var(--spacing) * 2);
  }
  .\\[\\&_\\[cmdk-group-heading\\]\\]\\:py-1\\.5 [cmdk-group-heading] {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .\\[\\&_\\[cmdk-group-heading\\]\\]\\:text-xs [cmdk-group-heading] {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .\\[\\&_\\[cmdk-group-heading\\]\\]\\:font-medium [cmdk-group-heading] {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .\\[\\&_svg\\]\\:pointer-events-none svg {
    pointer-events: none;
  }
  .\\[\\&_svg\\]\\:size-4 svg {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
  .\\[\\&_svg\\]\\:shrink-0 svg {
    flex-shrink: 0;
  }
  .\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-3 svg:not([class*='size-']) {
    width: calc(var(--spacing) * 3);
    height: calc(var(--spacing) * 3);
  }
  .\\[\\&_svg\\:not\\(\\[class\\*\\=\\'size-\\'\\]\\)\\]\\:size-4 svg:not([class*='size-']) {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
  .\\[\\&\\:\\:-webkit-scrollbar\\]\\:hidden::-webkit-scrollbar {
    display: none;
  }
  :is(.\\*\\:\\[span\\]\\:last\\:flex > *):is(span):last-child {
    display: flex;
  }
  :is(.\\*\\:\\[span\\]\\:last\\:items-center > *):is(span):last-child {
    align-items: center;
  }
  :is(.\\*\\:\\[span\\]\\:last\\:gap-2 > *):is(span):last-child {
    gap: calc(var(--spacing) * 2);
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-pan-x {
  syntax: "*";
  inherits: false;
}
@property --tw-pan-y {
  syntax: "*";
  inherits: false;
}
@property --tw-pinch-zoom {
  syntax: "*";
  inherits: false;
}
@property --tw-scroll-snap-strictness {
  syntax: "*";
  inherits: false;
  initial-value: proximity;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-contain-size {
  syntax: "*";
  inherits: false;
}
@property --tw-contain-layout {
  syntax: "*";
  inherits: false;
}
@property --tw-contain-paint {
  syntax: "*";
  inherits: false;
}
@property --tw-contain-style {
  syntax: "*";
  inherits: false;
}
@property --tw-text-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-text-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-pan-x: initial;
      --tw-pan-y: initial;
      --tw-pinch-zoom: initial;
      --tw-scroll-snap-strictness: proximity;
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-divide-x-reverse: 0;
      --tw-border-style: solid;
      --tw-divide-y-reverse: 0;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-contain-size: initial;
      --tw-contain-layout: initial;
      --tw-contain-paint: initial;
      --tw-contain-style: initial;
      --tw-text-shadow-color: initial;
      --tw-text-shadow-alpha: 100%;
    }
  }
}

@keyframes shimmer-text{0%{background-position:150%}to{background-position:-50%}}
@keyframes fade-up{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes fade-in{0%{opacity:0}to{opacity:1}}
@keyframes eq-bounce{0%,to{transform:scaleY(.35)}50%{transform:scaleY(1)}}
@keyframes stream-in{0%{opacity:0;filter:blur(4px)}to{opacity:1;filter:blur(0)}}
@keyframes caret-blink{0%,to{opacity:1}50%{opacity:0}}
@keyframes pop-in{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(1turn)}}
@keyframes pixel-on{0%,to{opacity:.15}18%,42%{opacity:1}62%{opacity:.15}}
/* ── Shadow-host defaults (body-level inheritance the React side gets for
 * free from globals.css) ─────────────────────────────────────────────── */
:host {
  display: block;
  color: var(--ink, #1f2124);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/* ── Reduced motion: freeze decorative loops (mirrors globals.css) ────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  .pixel-grid > span { animation: none !important; }
}

/* ── Primitive card chrome (globals.css) ─────────────────────────────── */
.primitive-card-bar{padding:8px 12px}
.primitive-card-pad{padding:12px}
.primitive-card-footer{padding:10px 12px}
.primitive-icon-button{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px}
.primitive-table-cell{padding:6px 12px}

/* ── Streaming caret ─────────────────────────────────────────────────── */
.stream-caret{background:var(--ink);vertical-align:text-bottom;border-radius:1px;width:2px;height:1.05em;margin-left:1.5px;animation:caret-blink 1s step-end infinite;display:inline-block;translate:0 -.5px}
.stream-caret.is-streaming{animation:none}

/* ── Animated underline ──────────────────────────────────────────────── */
.animated-underline{display:inline-block;position:relative}
.animated-underline:after{content:"";transform-origin:0;height:1px;transition:transform .28s var(--ease-link);background:currentColor;position:absolute;bottom:-1px;left:0;right:0;transform:scaleX(0)}
a:focus-visible .animated-underline:after,a:hover .animated-underline:after{transform:scaleX(1)}

/* ── Records table & insight chart (verbatim from globals.css) ───────── */
/* ── Records table ─────────────────────────────────────── */
.records-shell{border:1px solid var(--line);background:var(--surface);border-radius:10px;width:100%;min-width:0;overflow:hidden;box-shadow:var(--shadow-card)}
.records-add-calculation,.records-company-header,.records-link,.records-strength{align-items:center;display:inline-flex}
.records-add-calculation:active{transform:scale(.96)}
.records-scroll{overscroll-behavior:none;scrollbar-color:var(--line-strong) transparent;scrollbar-gutter:stable;max-height:438px;overflow:auto}
.records-scroll:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.records-table{border-collapse:separate;border-spacing:0;width:100%;min-width:990px;color:var(--ink);table-layout:fixed;font-size:12px}
.records-company-col{width:270px}
.records-category-col{width:275px}
.records-last-col{width:190px}
.records-strength-col{width:210px}
.records-link-col{width:175px}
.records-table td,.records-table th{border-right:1px solid var(--line)}
.records-table td,.records-table th{border-bottom:1px solid var(--line)}
.records-table td,.records-table th{text-align:left;vertical-align:middle}
.records-table tr>:last-child{border-right:0}
.records-table thead th{z-index:5;background:var(--surface);height:42px;color:var(--ink-2);font-size:12px;font-weight:600;position:sticky;top:0}
.records-header-cell{padding:0}
.records-header-cell.records-sticky-cell{z-index:7}
.records-company-header,.records-header-button{gap:8px;width:100%;height:42px;padding:0 12px}
.records-company-header{padding-left:6px}
.records-header-button{color:var(--ink-2);text-align:left;align-items:center;transition:background-color .12s ease-out,color .12s ease-out;display:flex}
.records-header-button:hover{background:var(--hover);color:var(--ink)}
.records-header-icon{color:var(--ink-3);flex-shrink:0;display:inline-flex}
.records-sort{opacity:0;transition:opacity .12s ease-out,transform .16s var(--ease-out-strong);flex-shrink:0;margin-left:auto;display:inline-flex}
.records-header-button:hover .records-sort,.records-sort.is-visible{opacity:1}
.records-company-header{display:flex}
.records-company-header>span:not(.records-checkbox-box){white-space:nowrap}
.records-company-header:hover .records-add-field{opacity:1}
.records-checkbox{border-radius:var(--radius-chip);flex:0 0 24px;justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex;position:relative}
.records-checkbox input{opacity:0;width:1px;height:1px;position:absolute}
.records-checkbox-box{color:#4d555e;width:18px;height:18px;transition:border-color .14s ease-out,background-color .14s ease-out,box-shadow .14s ease-out,transform .14s var(--ease-out-strong);background:#fff;border:1px solid #c7cdd3;border-radius:6px;justify-content:center;align-items:center;display:inline-flex}
.records-checkbox:hover .records-checkbox-box{background:#f2f4f5;border-color:#aeb6bf}
.records-checkbox:active .records-checkbox-box{transform:scale(.96)}
.records-checkbox input:focus-visible+.records-checkbox-box{outline:2px solid var(--accent);outline-offset:2px}
.records-checkbox-box.is-active{border-color:var(--accent);color:#fff;background:var(--accent);box-shadow:none}
.records-checkbox-dash{background:#4d555e;border-radius:99px;width:8px;height:1.5px}
:host-context(.dark) .records-checkbox-box{color:#e0e4e8;background:#343a41;border-color:#4f565f}
:host-context(.dark) .records-checkbox:hover .records-checkbox-box{background:#3f464e;border-color:#626a74}
:host-context(.dark) .records-checkbox-box.is-active{border-color:var(--accent);color:#fff;background:var(--accent)}
:host-context(.dark) .records-checkbox-dash{background:#e0e4e8}
.records-cell{white-space:nowrap;text-overflow:ellipsis;height:42px;padding:0 12px;overflow:hidden}
.records-sticky-cell{z-index:2;background:var(--surface);position:sticky;left:0;box-shadow:5px 0 8px -10px #0006}
.records-company-cell{align-items:center;gap:4px;padding-left:6px;display:flex;overflow:visible}
.records-row>.records-cell{transition:background-color .12s ease-out,color .12s ease-out}
.records-row:hover>.records-cell{background:var(--hover)}
.records-row.is-selected>.records-cell{background:var(--accent-tint)}
.records-row.is-selected>.records-cell .records-company-name,.records-row.is-selected>.records-cell .records-link{color:var(--accent-ink)}
.records-company-mark{width:20px;height:20px;color:var(--ink-2);background:var(--field);border:0;border-radius:6px;flex:0 0 20px;justify-content:center;align-items:center;font-size:10px;font-weight:650;display:inline-flex}
.records-company-name{min-width:0;color:var(--ink);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:500;overflow:hidden}
.records-company-name.has-link:focus-visible,.records-company-name.has-link:hover{color:var(--accent-ink);text-underline-offset:3px;text-decoration:underline}
.records-tags{gap:4px;min-width:0;display:flex}
.records-tag,.records-tags{align-items:center;overflow:hidden}
.records-tag{cursor:pointer;border:1px solid color-mix(in srgb, var(--tag-color) 38%, transparent);flex-shrink:0;max-width:115px;height:23px;display:inline-flex}
.records-tag{color:var(--tag-color);border-radius:6px;padding:0 7px}
.records-tag{background:color-mix(in srgb, var(--tag-color) 13%, transparent)}
.records-tag{text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-weight:500}
.records-more-tag{border:1px solid var(--line-strong);height:23px;border-radius:6px;flex-shrink:0;align-items:center;padding:0 7px;font-size:11px;font-weight:500;display:inline-flex}
.records-tag-dot{border-radius:50%;flex:0 0 5px;width:5px;height:5px;margin-right:5px}
.records-more-tag{border-color:var(--line-strong);background:var(--inset)}
.records-more-tag,.records-muted{color:var(--ink-3)}
.records-strength{color:var(--ink-2);gap:8px}
.records-strength-dot{border-radius:50%;flex:0 0 8px;width:8px;height:8px;display:inline-block}
.records-link{max-width:100%;color:var(--accent-ink);text-overflow:ellipsis;gap:5px;text-decoration:underline;overflow:hidden}
.records-link{text-underline-offset:3px;transition:color .12s ease-out,text-decoration-color .12s ease-out}
.records-link:focus-visible,.records-link:hover{color:var(--ink);text-decoration-color:currentColor}
.records-table tfoot td{z-index:4;background:var(--inset);height:38px;color:var(--ink-2);font-size:11.5px;position:sticky;bottom:0}
.records-table tfoot .records-sticky-cell{z-index:6;background:var(--inset)}
.records-calculation-label{color:var(--ink-2);font-weight:550}
.records-calculation-number{color:var(--ink);font-variant-numeric:tabular-nums;margin-right:3px}
.records-add-calculation{color:var(--ink-3);transition:color .12s ease-out,transform .14s var(--ease-out-strong);gap:6px}
.records-add-calculation:hover{color:var(--ink)}
.records-average{color:var(--ink-2);align-items:center;gap:7px;display:inline-flex}
.records-calculation-row-secondary td{background:var(--inset);position:sticky;bottom:38px}
.records-calculation-row-secondary .records-sticky-cell{background:var(--inset);position:sticky}
.records-footer{min-height:38px;color:var(--ink-3);justify-content:space-between;align-items:center;gap:12px;padding:0 12px;font-size:11.5px;display:flex}
.records-footer strong{color:var(--ink-2);font-weight:600}
.records-shell:hover .records-footer-hint{opacity:1}
/* ── Insight cards chart ───────────────────────────────── */
.insight-chart-stage{overflow:hidden}
.insight-chart-cursor{z-index:4;background:var(--ink);opacity:.26;pointer-events:none;width:1px;position:absolute;top:0;bottom:0}
.insight-chart-tooltip-anchor{z-index:5;pointer-events:none;position:absolute;top:8px;transform:translate(-50%)}
.insight-chart-tooltip{border:1px solid var(--line-strong);min-width:154px;color:var(--tooltip-fg);background:var(--tooltip-bg);box-shadow:var(--shadow-overlay);border-radius:10px;padding:9px 10px;font-size:12px}
.insight-chart-tooltip-time{color:var(--tooltip-muted);margin-bottom:7px;font-size:11px;display:block}
.insight-chart-tooltip-row{justify-content:space-between;align-items:center;gap:16px;line-height:1.65;display:flex}
.insight-chart-tooltip-label{color:var(--tooltip-fg);align-items:center;gap:7px;display:inline-flex}
.insight-chart-tooltip-row strong{color:var(--tooltip-muted);font-variant-numeric:tabular-nums;font-weight:500}
.insight-chart-tooltip-dot{border-radius:50%;flex:0 0 8px;width:8px;height:8px}
`;
