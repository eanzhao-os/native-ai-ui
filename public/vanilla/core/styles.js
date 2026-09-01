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
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-sm: 24rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    --container-4xl: 56rem;
    --text-xs: 0.75rem;
    --text-xs--line-height: calc(1 / 0.75);
    --text-sm: 0.875rem;
    --text-sm--line-height: calc(1.25 / 0.875);
    --text-xl: 1.25rem;
    --text-xl--line-height: calc(1.75 / 1.25);
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --tracking-tight: -0.025em;
    --tracking-wide: 0.025em;
    --tracking-wider: 0.05em;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --radius-md: 0.375rem;
    --radius-xl: 0.75rem;
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --animate-spin: spin 1s linear infinite;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --blur-xs: 4px;
    --blur-md: 12px;
    --blur-2xl: 40px;
    --blur-3xl: 64px;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    --default-mono-font-family: var(--font-mono-face), ui-monospace, "SF Mono", monospace;
    --radius-control: 8px;
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
  .pointer-events-none {
    pointer-events: none;
  }
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
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
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: 0px;
  }
  .inset-1 {
    inset: var(--spacing);
  }
  .inset-2 {
    inset: calc(var(--spacing) * 2);
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
  .top-0\\.5 {
    top: calc(var(--spacing) * 0.5);
  }
  .top-2 {
    top: calc(var(--spacing) * 2);
  }
  .top-3 {
    top: calc(var(--spacing) * 3);
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
  .bottom-6 {
    bottom: calc(var(--spacing) * 6);
  }
  .bottom-8 {
    bottom: calc(var(--spacing) * 8);
  }
  .bottom-full {
    bottom: 100%;
  }
  .-left-3\\.5 {
    left: calc(var(--spacing) * -3.5);
  }
  .-left-px {
    left: -1px;
  }
  .left-0 {
    left: 0px;
  }
  .left-0\\.5 {
    left: calc(var(--spacing) * 0.5);
  }
  .left-1 {
    left: var(--spacing);
  }
  .left-1\\/2 {
    left: calc(1 / 2 * 100%);
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
  .left-\\[14px\\] {
    left: 14px;
  }
  .isolate {
    isolation: isolate;
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
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
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
  .row-start-1 {
    grid-row-start: 1;
  }
  .row-start-2 {
    grid-row-start: 2;
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
  .-m-2\\.5 {
    margin: calc(var(--spacing) * -2.5);
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
  .mx-0\\.5 {
    margin-inline: calc(var(--spacing) * 0.5);
  }
  .mx-1 {
    margin-inline: var(--spacing);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .my-6 {
    margin-block: calc(var(--spacing) * 6);
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
  .mt-auto {
    margin-top: auto;
  }
  .-mr-0\\.5 {
    margin-right: calc(var(--spacing) * -0.5);
  }
  .mr-1 {
    margin-right: var(--spacing);
  }
  .mr-1\\.5 {
    margin-right: calc(var(--spacing) * 1.5);
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
  .mb-6 {
    margin-bottom: calc(var(--spacing) * 6);
  }
  .ml-0 {
    margin-left: 0px;
  }
  .ml-0\\.5 {
    margin-left: calc(var(--spacing) * 0.5);
  }
  .ml-1\\.5 {
    margin-left: calc(var(--spacing) * 1.5);
  }
  .ml-2 {
    margin-left: calc(var(--spacing) * 2);
  }
  .ml-\\[5px\\] {
    margin-left: 5px;
  }
  .ml-auto {
    margin-left: auto;
  }
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
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
  .table {
    display: table;
  }
  .aspect-square {
    aspect-ratio: 1 / 1;
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
  .size-11 {
    width: calc(var(--spacing) * 11);
    height: calc(var(--spacing) * 11);
  }
  .size-24 {
    width: calc(var(--spacing) * 24);
    height: calc(var(--spacing) * 24);
  }
  .size-32 {
    width: calc(var(--spacing) * 32);
    height: calc(var(--spacing) * 32);
  }
  .size-\\[4px\\] {
    width: 4px;
    height: 4px;
  }
  .size-\\[7px\\] {
    width: 7px;
    height: 7px;
  }
  .size-full {
    width: 100%;
    height: 100%;
  }
  .h-0\\.5 {
    height: calc(var(--spacing) * 0.5);
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
  .h-64 {
    height: calc(var(--spacing) * 64);
  }
  .h-\\[130px\\] {
    height: 130px;
  }
  .h-\\[174px\\] {
    height: 174px;
  }
  .h-\\[212px\\] {
    height: 212px;
  }
  .h-\\[250px\\] {
    height: 250px;
  }
  .h-\\[288px\\] {
    height: 288px;
  }
  .h-full {
    height: 100%;
  }
  .h-px {
    height: 1px;
  }
  .max-h-56 {
    max-height: calc(var(--spacing) * 56);
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
  .min-h-5 {
    min-height: calc(var(--spacing) * 5);
  }
  .min-h-6 {
    min-height: calc(var(--spacing) * 6);
  }
  .min-h-7 {
    min-height: calc(var(--spacing) * 7);
  }
  .min-h-8 {
    min-height: calc(var(--spacing) * 8);
  }
  .min-h-9 {
    min-height: calc(var(--spacing) * 9);
  }
  .min-h-10 {
    min-height: calc(var(--spacing) * 10);
  }
  .min-h-11 {
    min-height: calc(var(--spacing) * 11);
  }
  .min-h-12 {
    min-height: calc(var(--spacing) * 12);
  }
  .min-h-16 {
    min-height: calc(var(--spacing) * 16);
  }
  .min-h-37 {
    min-height: calc(var(--spacing) * 37);
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
  .min-h-\\[172px\\] {
    min-height: 172px;
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
  .min-h-\\[244px\\] {
    min-height: 244px;
  }
  .min-h-\\[248px\\] {
    min-height: 248px;
  }
  .min-h-\\[272px\\] {
    min-height: 272px;
  }
  .min-h-\\[304px\\] {
    min-height: 304px;
  }
  .min-h-\\[384px\\] {
    min-height: 384px;
  }
  .min-h-\\[456px\\] {
    min-height: 456px;
  }
  .min-h-screen {
    min-height: 100vh;
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
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-2\\.5 {
    width: calc(var(--spacing) * 2.5);
  }
  .w-3 {
    width: calc(var(--spacing) * 3);
  }
  .w-3\\.5 {
    width: calc(var(--spacing) * 3.5);
  }
  .w-5 {
    width: calc(var(--spacing) * 5);
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
  .w-16 {
    width: calc(var(--spacing) * 16);
  }
  .w-30 {
    width: calc(var(--spacing) * 30);
  }
  .w-40 {
    width: calc(var(--spacing) * 40);
  }
  .w-44 {
    width: calc(var(--spacing) * 44);
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
  .w-\\[2\\.5px\\] {
    width: 2.5px;
  }
  .w-\\[3px\\] {
    width: 3px;
  }
  .w-\\[15\\%\\] {
    width: 15%;
  }
  .w-\\[21\\%\\] {
    width: 21%;
  }
  .w-\\[25\\%\\] {
    width: 25%;
  }
  .w-\\[27\\%\\] {
    width: 27%;
  }
  .w-\\[30\\%\\] {
    width: 30%;
  }
  .w-\\[34\\%\\] {
    width: 34%;
  }
  .w-\\[560px\\] {
    width: 560px;
  }
  .w-\\[calc\\(100\\%\\+6px\\)\\] {
    width: calc(100% + 6px);
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
  .max-w-2xl {
    max-width: var(--container-2xl);
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .max-w-6 {
    max-width: calc(var(--spacing) * 6);
  }
  .max-w-24 {
    max-width: calc(var(--spacing) * 24);
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
  .max-w-\\[19rem\\] {
    max-width: 19rem;
  }
  .max-w-\\[240px\\] {
    max-width: 240px;
  }
  .max-w-\\[280px\\] {
    max-width: 280px;
  }
  .max-w-\\[380px\\] {
    max-width: 380px;
  }
  .max-w-\\[520px\\] {
    max-width: 520px;
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
  .max-w-sm {
    max-width: var(--container-sm);
  }
  .max-w-xl {
    max-width: var(--container-xl);
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
  .min-w-7 {
    min-width: calc(var(--spacing) * 7);
  }
  .min-w-11 {
    min-width: calc(var(--spacing) * 11);
  }
  .min-w-\\[148px\\] {
    min-width: 148px;
  }
  .min-w-\\[470px\\] {
    min-width: 470px;
  }
  .min-w-\\[560px\\] {
    min-width: 560px;
  }
  .min-w-max {
    min-width: max-content;
  }
  .flex-1 {
    flex: 1;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .grow {
    flex-grow: 1;
  }
  .table-fixed {
    table-layout: fixed;
  }
  .border-collapse {
    border-collapse: collapse;
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
  .translate-y-0\\.5 {
    --tw-translate-y: calc(var(--spacing) * 0.5);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-\\[-1px\\] {
    --tw-translate-y: -1px;
    translate: var(--tw-translate-x) var(--tw-translate-y);
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
  .scale-100 {
    --tw-scale-x: 100%;
    --tw-scale-y: 100%;
    --tw-scale-z: 100%;
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
  .rotate-0 {
    rotate: 0deg;
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .rotate-180 {
    rotate: 180deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .animate-\\[spin_7s_linear_infinite\\] {
    animation: spin 7s linear infinite;
  }
  .animate-\\[spin_10s_linear_infinite\\] {
    animation: spin 10s linear infinite;
  }
  .animate-pulse {
    animation: var(--animate-pulse);
  }
  .animate-spin {
    animation: var(--animate-spin);
  }
  .cursor-crosshair {
    cursor: crosshair;
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
  .touch-none {
    touch-action: none;
  }
  .resize-none {
    resize: none;
  }
  .scroll-mt-20 {
    scroll-margin-top: calc(var(--spacing) * 20);
  }
  .\\[scrollbar-width\\:none\\] {
    scrollbar-width: none;
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
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-\\[28px_minmax\\(0\\,1fr\\)_auto_28px_28px\\] {
    grid-template-columns: 28px minmax(0,1fr) auto 28px 28px;
  }
  .grid-cols-\\[44px_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: 44px minmax(0,1fr);
  }
  .grid-cols-\\[44px_minmax\\(0\\,1fr\\)_auto\\] {
    grid-template-columns: 44px minmax(0,1fr) auto;
  }
  .grid-cols-\\[auto_minmax\\(0\\,1fr\\)_auto\\] {
    grid-template-columns: auto minmax(0,1fr) auto;
  }
  .grid-cols-\\[auto_minmax\\(0\\,1fr\\)_auto_auto\\] {
    grid-template-columns: auto minmax(0,1fr) auto auto;
  }
  .grid-cols-\\[auto_minmax\\(0\\,1fr\\)_auto_auto_auto\\] {
    grid-template-columns: auto minmax(0,1fr) auto auto auto;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_auto\\] {
    grid-template-columns: minmax(0,1fr) auto;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_auto_28px_28px\\] {
    grid-template-columns: minmax(0,1fr) auto 28px 28px;
  }
  .grid-cols-\\[minmax\\(0\\,1fr\\)_minmax\\(0\\,1fr\\)\\] {
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
  }
  .grid-cols-\\[repeat\\(3\\,4px\\)\\] {
    grid-template-columns: repeat(3,4px);
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-items-end {
    justify-items: end;
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
  .gap-6 {
    gap: calc(var(--spacing) * 6);
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
  :where(.space-y-1 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(var(--spacing) * var(--tw-space-y-reverse));
    margin-block-end: calc(var(--spacing) * calc(1 - var(--tw-space-y-reverse)));
  }
  :where(.space-y-4 > :not(:last-child)) {
    --tw-space-y-reverse: 0;
    margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
    margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
  }
  .gap-x-1 {
    column-gap: var(--spacing);
  }
  .gap-x-1\\.5 {
    column-gap: calc(var(--spacing) * 1.5);
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
  :where(.divide-y > :not(:last-child)) {
    --tw-divide-y-reverse: 0;
    border-bottom-style: var(--tw-border-style);
    border-top-style: var(--tw-border-style);
    border-top-width: calc(1px * var(--tw-divide-y-reverse));
    border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  }
  :where(.divide-line > :not(:last-child)) {
    border-color: var(--line);
  }
  :where(.divide-line\\/60 > :not(:last-child)) {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 60%, transparent);
    }
  }
  :where(.divide-line\\/70 > :not(:last-child)) {
    border-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--line) 70%, transparent);
    }
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }
  .justify-self-start {
    justify-self: flex-start;
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
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-y-auto {
    overflow-y: auto;
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
  .rounded-\\[22px\\] {
    border-radius: 22px;
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
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .rounded-t-\\[4px\\] {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
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
  .\\!border-tooltip-border {
    border-color: var(--tooltip-border) !important;
  }
  .border-accent {
    border-color: var(--accent);
  }
  .border-accent\\/25 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 25%, transparent);
    }
  }
  .border-accent\\/30 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 30%, transparent);
    }
  }
  .border-accent\\/35 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 35%, transparent);
    }
  }
  .border-accent\\/40 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 40%, transparent);
    }
  }
  .border-accent\\/45 {
    border-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--accent) 45%, transparent);
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
  .border-green\\/25 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 25%, transparent);
    }
  }
  .border-green\\/30 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 30%, transparent);
    }
  }
  .border-green\\/35 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 35%, transparent);
    }
  }
  .border-green\\/40 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 40%, transparent);
    }
  }
  .border-green\\/45 {
    border-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--green) 45%, transparent);
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
  .border-orange\\/25 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 25%, transparent);
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
  .border-orange\\/45 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 45%, transparent);
    }
  }
  .border-orange\\/50 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 50%, transparent);
    }
  }
  .border-red\\/25 {
    border-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--red) 25%, transparent);
    }
  }
  .border-red\\/30 {
    border-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--red) 30%, transparent);
    }
  }
  .border-red\\/40 {
    border-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--red) 40%, transparent);
    }
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
  .\\!bg-transparent {
    background-color: transparent !important;
  }
  .bg-\\[color-mix\\(in_srgb\\,var\\(--accent\\)_14\\%\\,var\\(--surface\\)\\)\\] {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in srgb,var(--accent) 14%,var(--surface));
    }
  }
  .bg-accent {
    background-color: var(--accent);
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
  .bg-accent-tint\\/35 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 35%, transparent);
    }
  }
  .bg-accent-tint\\/40 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 40%, transparent);
    }
  }
  .bg-accent-tint\\/45 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 45%, transparent);
    }
  }
  .bg-accent-tint\\/70 {
    background-color: var(--accent-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent-tint) 70%, transparent);
    }
  }
  .bg-accent\\/24 {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent) 24%, transparent);
    }
  }
  .bg-accent\\/35 {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent) 35%, transparent);
    }
  }
  .bg-accent\\/45 {
    background-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--accent) 45%, transparent);
    }
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
  .bg-green {
    background-color: var(--green);
  }
  .bg-green-tint {
    background-color: var(--green-tint);
  }
  .bg-green-tint\\/20 {
    background-color: var(--green-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green-tint) 20%, transparent);
    }
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
  .bg-green\\/22 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 22%, transparent);
    }
  }
  .bg-green\\/70 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 70%, transparent);
    }
  }
  .bg-green\\/75 {
    background-color: var(--green);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--green) 75%, transparent);
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
  .bg-hover\\/40 {
    background-color: var(--hover);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--hover) 40%, transparent);
    }
  }
  .bg-hover\\/45 {
    background-color: var(--hover);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--hover) 45%, transparent);
    }
  }
  .bg-ink {
    background-color: var(--ink);
  }
  .bg-ink-3 {
    background-color: var(--ink-3);
  }
  .bg-ink-3\\/35 {
    background-color: var(--ink-3);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--ink-3) 35%, transparent);
    }
  }
  .bg-ink-3\\/55 {
    background-color: var(--ink-3);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--ink-3) 55%, transparent);
    }
  }
  .bg-inset {
    background-color: var(--inset);
  }
  .bg-inset\\/25 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 25%, transparent);
    }
  }
  .bg-inset\\/30 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 30%, transparent);
    }
  }
  .bg-inset\\/35 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 35%, transparent);
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
  .bg-inset\\/55 {
    background-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--inset) 55%, transparent);
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
  .bg-line\\/30 {
    background-color: var(--line);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--line) 30%, transparent);
    }
  }
  .bg-orange {
    background-color: var(--orange);
  }
  .bg-orange-tint {
    background-color: var(--orange-tint);
  }
  .bg-orange-tint\\/18 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 18%, transparent);
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
  .bg-orange-tint\\/45 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 45%, transparent);
    }
  }
  .bg-orange-tint\\/50 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 50%, transparent);
    }
  }
  .bg-orange\\/22 {
    background-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange) 22%, transparent);
    }
  }
  .bg-page {
    background-color: var(--page);
  }
  .bg-page\\/55 {
    background-color: var(--page);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--page) 55%, transparent);
    }
  }
  .bg-page\\/60 {
    background-color: var(--page);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--page) 60%, transparent);
    }
  }
  .bg-red {
    background-color: var(--red);
  }
  .bg-red-tint {
    background-color: var(--red-tint);
  }
  .bg-red-tint\\/18 {
    background-color: var(--red-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--red-tint) 18%, transparent);
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
  .bg-surface\\/65 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 65%, transparent);
    }
  }
  .bg-surface\\/70 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 70%, transparent);
    }
  }
  .bg-surface\\/75 {
    background-color: var(--surface);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--surface) 75%, transparent);
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
  .bg-white\\/35 {
    background-color: color-mix(in srgb, #fff 35%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 35%, transparent);
    }
  }
  .box-decoration-clone {
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
  .bg-clip-text {
    background-clip: text;
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
  .p-3\\.5 {
    padding: calc(var(--spacing) * 3.5);
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
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .px-\\[3px\\] {
    padding-inline: 3px;
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
  .pt-3\\.5 {
    padding-top: calc(var(--spacing) * 3.5);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
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
  .pr-0\\.5 {
    padding-right: calc(var(--spacing) * 0.5);
  }
  .pr-1 {
    padding-right: var(--spacing);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-7 {
    padding-right: calc(var(--spacing) * 7);
  }
  .pr-\\[3px\\] {
    padding-right: 3px;
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
  .pb-2\\.5 {
    padding-bottom: calc(var(--spacing) * 2.5);
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
  .pb-8 {
    padding-bottom: calc(var(--spacing) * 8);
  }
  .pb-12 {
    padding-bottom: calc(var(--spacing) * 12);
  }
  .pb-24 {
    padding-bottom: calc(var(--spacing) * 24);
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
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .align-baseline {
    vertical-align: baseline;
  }
  .align-middle {
    vertical-align: middle;
  }
  .font-mono {
    font-family: var(--font-mono-face), ui-monospace, "SF Mono", monospace;
  }
  .font-sans {
    font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
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
  .leading-3 {
    --tw-leading: calc(var(--spacing) * 3);
    line-height: calc(var(--spacing) * 3);
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
  .leading-\\[1\\.45\\] {
    --tw-leading: 1.45;
    line-height: 1.45;
  }
  .leading-\\[1\\.65\\] {
    --tw-leading: 1.65;
    line-height: 1.65;
  }
  .leading-\\[1\\.75\\] {
    --tw-leading: 1.75;
    line-height: 1.75;
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
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-\\[-0\\.01em\\] {
    --tw-tracking: -0.01em;
    letter-spacing: -0.01em;
  }
  .tracking-\\[0\\.08em\\] {
    --tw-tracking: 0.08em;
    letter-spacing: 0.08em;
  }
  .tracking-\\[0\\.12em\\] {
    --tw-tracking: 0.12em;
    letter-spacing: 0.12em;
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
  .\\[overflow-wrap\\:anywhere\\] {
    overflow-wrap: anywhere;
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .break-all {
    word-break: break-all;
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
  .\\!text-tooltip-muted {
    color: var(--tooltip-muted) !important;
  }
  .text-accent {
    color: var(--accent);
  }
  .text-accent-ink {
    color: var(--accent-ink);
  }
  .text-canvas {
    color: var(--canvas);
  }
  .text-green {
    color: var(--green);
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
  .text-red {
    color: var(--red);
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
  .uppercase {
    text-transform: uppercase;
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .line-through {
    text-decoration-line: line-through;
  }
  .underline {
    text-decoration-line: underline;
  }
  .decoration-line-strong {
    text-decoration-color: var(--line-strong);
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .accent-accent {
    accent-color: var(--accent);
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-25 {
    opacity: 25%;
  }
  .opacity-35 {
    opacity: 35%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-55 {
    opacity: 55%;
  }
  .opacity-60 {
    opacity: 60%;
  }
  .opacity-65 {
    opacity: 65%;
  }
  .opacity-80 {
    opacity: 80%;
  }
  .opacity-85 {
    opacity: 85%;
  }
  .opacity-90 {
    opacity: 90%;
  }
  .opacity-100 {
    opacity: 100%;
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
  .shadow-\\[inset_0_0_0_1px_var\\(--accent\\)\\] {
    --tw-shadow: inset 0 0 0 1px var(--tw-shadow-color, var(--accent));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\\[inset_0_0_0_1px_var\\(--line-strong\\)\\] {
    --tw-shadow: inset 0 0 0 1px var(--tw-shadow-color, var(--line-strong));
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
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
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
  .shadow-xs {
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
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
  .shadow-inset {
    --tw-shadow-color: var(--inset);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, var(--inset) var(--tw-shadow-alpha), transparent);
    }
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
  .ring-accent\\/70 {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 70%, transparent);
    }
  }
  .ring-inset {
    --tw-ring-color: var(--inset);
  }
  .blur-2xl {
    --tw-blur: blur(var(--blur-2xl));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .blur-3xl {
    --tw-blur: blur(var(--blur-3xl));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .blur-\\[5px\\] {
    --tw-blur: blur(5px);
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
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
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,border-color\\,box-shadow\\] {
    transition-property: background-color,border-color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,border-color\\,color\\,transform\\] {
    transition-property: background-color,border-color,color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,border-color\\,color\\] {
    transition-property: background-color,border-color,color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,border-color\\] {
    transition-property: background-color,border-color;
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
  .transition-\\[background-color\\,color\\,border-color\\] {
    transition-property: background-color,color,border-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,box-shadow\\,transform\\] {
    transition-property: background-color,color,box-shadow,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,box-shadow\\] {
    transition-property: background-color,color,box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[background-color\\,color\\,opacity\\,transform\\] {
    transition-property: background-color,color,opacity,transform;
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
  .transition-\\[background-color\\,opacity\\,transform\\] {
    transition-property: background-color,opacity,transform;
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
  .transition-\\[border-color\\,background-color\\,opacity\\] {
    transition-property: border-color,background-color,opacity;
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
  .transition-\\[border-color\\,transform\\] {
    transition-property: border-color,transform;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[border-radius\\] {
    transition-property: border-radius;
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
  .transition-\\[height\\,background-color\\] {
    transition-property: height,background-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[left\\,background-color\\] {
    transition-property: left,background-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[max-width\\] {
    transition-property: max-width;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\\[opacity\\,filter\\,transform\\] {
    transition-property: opacity,filter,transform;
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
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .\\[will-change\\:filter\\,opacity\\] {
    will-change: filter,opacity;
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .ring-inset {
    --tw-ring-inset: inset;
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
  .peer-checked\\:border-accent:is(:where(.peer):checked ~ *) {
    border-color: var(--accent);
  }
  .peer-checked\\:bg-accent:is(:where(.peer):checked ~ *) {
    background-color: var(--accent);
  }
  .peer-checked\\:text-white:is(:where(.peer):checked ~ *) {
    color: var(--color-white);
  }
  .peer-focus-visible\\:ring-2:is(:where(.peer):focus-visible ~ *) {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .peer-focus-visible\\:ring-accent\\/60:is(:where(.peer):focus-visible ~ *) {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 60%, transparent);
    }
  }
  .peer-focus-visible\\:ring-offset-2:is(:where(.peer):focus-visible ~ *) {
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  }
  .peer-focus-visible\\:ring-offset-surface:is(:where(.peer):focus-visible ~ *) {
    --tw-ring-offset-color: var(--surface);
  }
  .peer-disabled\\:cursor-not-allowed:is(:where(.peer):disabled ~ *) {
    cursor: not-allowed;
  }
  .peer-disabled\\:opacity-50:is(:where(.peer):disabled ~ *) {
    opacity: 50%;
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
  .focus-within\\:ring-accent:focus-within {
    --tw-ring-color: var(--accent);
  }
  .focus-within\\:ring-accent\\/20:focus-within {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 20%, transparent);
    }
  }
  .focus-within\\:outline-2:focus-within {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  .focus-within\\:outline-offset-1:focus-within {
    outline-offset: 1px;
  }
  .focus-within\\:outline-accent:focus-within {
    outline-color: var(--accent);
  }
  .focus-within\\:outline-none:focus-within {
    --tw-outline-style: none;
    outline-style: none;
  }
  @media (hover: hover) {
    .hover\\:-translate-y-px:hover {
      --tw-translate-y: -1px;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
    .hover\\:border-accent\\/35:hover {
      border-color: var(--accent);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-accent\\/35:hover {
        border-color: color-mix(in oklab, var(--accent) 35%, transparent);
      }
    }
    .hover\\:border-accent\\/40:hover {
      border-color: var(--accent);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-accent\\/40:hover {
        border-color: color-mix(in oklab, var(--accent) 40%, transparent);
      }
    }
    .hover\\:border-accent\\/60:hover {
      border-color: var(--accent);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-accent\\/60:hover {
        border-color: color-mix(in oklab, var(--accent) 60%, transparent);
      }
    }
    .hover\\:border-line-strong:hover {
      border-color: var(--line-strong);
    }
    .hover\\:border-orange\\/60:hover {
      border-color: var(--orange);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-orange\\/60:hover {
        border-color: color-mix(in oklab, var(--orange) 60%, transparent);
      }
    }
    .hover\\:border-red\\/35:hover {
      border-color: var(--red);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-red\\/35:hover {
        border-color: color-mix(in oklab, var(--red) 35%, transparent);
      }
    }
    .hover\\:border-red\\/60:hover {
      border-color: var(--red);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:border-red\\/60:hover {
        border-color: color-mix(in oklab, var(--red) 60%, transparent);
      }
    }
    .hover\\:bg-accent-tint:hover {
      background-color: var(--accent-tint);
    }
    .hover\\:bg-accent-tint\\/55:hover {
      background-color: var(--accent-tint);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-accent-tint\\/55:hover {
        background-color: color-mix(in oklab, var(--accent-tint) 55%, transparent);
      }
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
    .hover\\:bg-hover\\/65:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/65:hover {
        background-color: color-mix(in oklab, var(--hover) 65%, transparent);
      }
    }
    .hover\\:bg-hover\\/70:hover {
      background-color: var(--hover);
    }
    @supports (color: color-mix(in lab, red, red)) {
      .hover\\:bg-hover\\/70:hover {
        background-color: color-mix(in oklab, var(--hover) 70%, transparent);
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
    .hover\\:bg-orange-tint:hover {
      background-color: var(--orange-tint);
    }
    .hover\\:bg-red-tint:hover {
      background-color: var(--red-tint);
    }
    .hover\\:\\!text-tooltip-fg:hover {
      color: var(--tooltip-fg) !important;
    }
    .hover\\:text-accent-ink:hover {
      color: var(--accent-ink);
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
  .focus\\:border-accent:focus {
    border-color: var(--accent);
  }
  .focus\\:bg-surface:focus {
    background-color: var(--surface);
  }
  .focus\\:ring-2:focus {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus\\:ring-accent:focus {
    --tw-ring-color: var(--accent);
  }
  .focus\\:outline-none:focus {
    --tw-outline-style: none;
    outline-style: none;
  }
  .focus-visible\\:text-accent-ink:focus-visible {
    color: var(--accent-ink);
  }
  .focus-visible\\:shadow-\\[inset_0_0_0_2px_var\\(--accent\\)\\]:focus-visible {
    --tw-shadow: inset 0 0 0 2px var(--tw-shadow-color, var(--accent));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-2:focus-visible {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .focus-visible\\:ring-accent:focus-visible {
    --tw-ring-color: var(--accent);
  }
  .focus-visible\\:ring-accent\\/55:focus-visible {
    --tw-ring-color: var(--accent);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--accent) 55%, transparent);
    }
  }
  .focus-visible\\:ring-inset:focus-visible {
    --tw-ring-color: var(--inset);
  }
  .focus-visible\\:ring-red\\/45:focus-visible {
    --tw-ring-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-ring-color: color-mix(in oklab, var(--red) 45%, transparent);
    }
  }
  .focus-visible\\:ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  }
  .focus-visible\\:ring-offset-page:focus-visible {
    --tw-ring-offset-color: var(--page);
  }
  .focus-visible\\:ring-offset-surface:focus-visible {
    --tw-ring-offset-color: var(--surface);
  }
  .focus-visible\\:outline-2:focus-visible {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  .focus-visible\\:outline-offset-1:focus-visible {
    outline-offset: 1px;
  }
  .focus-visible\\:outline-offset-2:focus-visible {
    outline-offset: 2px;
  }
  .focus-visible\\:outline-accent:focus-visible {
    outline-color: var(--accent);
  }
  .focus-visible\\:outline-none:focus-visible {
    --tw-outline-style: none;
    outline-style: none;
  }
  .focus-visible\\:ring-inset:focus-visible {
    --tw-ring-inset: inset;
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
  .active\\:scale-\\[0\\.99\\]:active {
    scale: 0.99;
  }
  .enabled\\:cursor-pointer:enabled {
    cursor: pointer;
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
  .disabled\\:cursor-default:disabled {
    cursor: default;
  }
  .disabled\\:cursor-not-allowed:disabled {
    cursor: not-allowed;
  }
  .disabled\\:cursor-wait:disabled {
    cursor: wait;
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
  .disabled\\:opacity-45:disabled {
    opacity: 45%;
  }
  .disabled\\:opacity-50:disabled {
    opacity: 50%;
  }
  .disabled\\:opacity-55:disabled {
    opacity: 55%;
  }
  .disabled\\:shadow-none:disabled {
    --tw-shadow: 0 0 #0000;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  @media (prefers-reduced-motion: no-preference) {
    .motion-safe\\:animate-spin {
      animation: var(--animate-spin);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .motion-reduce\\:transform-none {
      transform: none;
    }
    .motion-reduce\\:\\[animation\\:none\\] {
      animation: none;
    }
    .motion-reduce\\:animate-none {
      animation: none;
    }
    .motion-reduce\\:\\[filter\\:none\\] {
      filter: none;
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
    .sm\\:flex-none {
      flex: none;
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:flex-wrap {
      flex-wrap: wrap;
    }
    .sm\\:items-center {
      align-items: center;
    }
    .sm\\:items-start {
      align-items: flex-start;
    }
    .sm\\:justify-between {
      justify-content: space-between;
    }
    .sm\\:gap-x-8 {
      column-gap: calc(var(--spacing) * 8);
    }
    .sm\\:p-5 {
      padding: calc(var(--spacing) * 5);
    }
    .sm\\:p-6 {
      padding: calc(var(--spacing) * 6);
    }
    .sm\\:p-10 {
      padding: calc(var(--spacing) * 10);
    }
    .sm\\:px-4 {
      padding-inline: calc(var(--spacing) * 4);
    }
    .sm\\:text-\\[40px\\] {
      font-size: 40px;
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
  :host-context(.dark) :where(.dark\\:divide-line-strong > :not(:last-child)) {
    border-color: var(--line-strong);
  }
  :host-context(.dark) .dark\\:border-line-strong {
    border-color: var(--line-strong);
  }
  :host-context(.dark) .dark\\:border-orange\\/55 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 55%, transparent);
    }
  }
  :host-context(.dark) .dark\\:border-red\\/55 {
    border-color: var(--red);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--red) 55%, transparent);
    }
  }
  :host-context(.dark) .dark\\:bg-accent-tint {
    background-color: var(--accent-tint);
  }
  :host-context(.dark) .dark\\:bg-field {
    background-color: var(--field);
  }
  @media (hover: hover) {
    :host-context(.dark) .dark\\:hover\\:bg-hover:hover {
      background-color: var(--hover);
    }
  }
  .\\[\\&\\:\\:-webkit-scrollbar\\]\\:hidden::-webkit-scrollbar {
    display: none;
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
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
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
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
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
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
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
      --tw-outline-style: solid;
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
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    scroll-behavior:auto !important;
    transition-duration:.01ms !important;
  }
  .pixel-grid > span{animation:none !important}
  .shimmer-label{animation:none !important;background-image:none !important;color:var(--ink-2) !important}
}
/* ── Shadow-host defaults (body-level inheritance the React side gets for
 * free from globals.css) ─────────────────────────────────────────────── */
:host {
  display: block;
  color: var(--ink, #1f2124);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ── Primitive card chrome ───────────────────────────────
 * Compact card scaffolding shared by approval-card,
 * code-block, context-cards, diff-table, fine-tune-card.
 * ─────────────────────────────────────────────────────── */
.primitive-card-bar{padding:8px 12px}
.primitive-card-pad{padding:12px}
.primitive-card-footer{padding:10px 12px}
.primitive-icon-button{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px}
.primitive-table-cell{padding:6px 12px}

/* ── Streaming caret (atoms/StreamText) ────────────────── */
.stream-caret{background:var(--ink);vertical-align:text-bottom;border-radius:1px;width:2px;height:1.05em;margin-left:1.5px;animation:caret-blink 1s step-end infinite;display:inline-block;translate:0 -.5px}
.stream-caret.is-streaming{animation:none}

/* ── Animated underline ────────────────────────────────── */
.animated-underline{display:inline-block;position:relative}
.animated-underline:after{content:"";transform-origin:0;height:1px;transition:transform .28s var(--ease-link);background:currentColor;position:absolute;bottom:-1px;left:0;right:0;transform:scaleX(0)}
a:focus-visible .animated-underline:after,a:hover .animated-underline:after{transform:scaleX(1)}

/* ── Records table & insight chart (verbatim from globals.css) ───────── */
/* ── Records table ─────────────────────────────────────── */
.records-shell{border:1px solid var(--line);background:var(--surface);border-radius:10px;width:100%;min-width:0;overflow:hidden;box-shadow:var(--shadow-card)}
.records-selection-bar{min-height:44px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--accent) 9%,var(--surface));color:var(--accent-ink);display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 10px 6px 14px;font-size:12px}
.records-selection-bar strong{font-variant-numeric:tabular-nums;font-weight:700}
.records-clear-selection{min-height:32px;border:1px solid color-mix(in srgb,var(--accent) 24%,var(--line));border-radius:var(--radius-control);background:var(--surface);color:var(--accent-ink);padding:0 10px;font-size:11.5px;font-weight:600;transition:background-color .12s ease-out,color .12s ease-out,border-color .12s ease-out}
.records-clear-selection:hover{border-color:color-mix(in srgb,var(--accent) 45%,var(--line));background:var(--hover)}
.records-clear-selection:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.records-add-calculation,.records-company-header,.records-link,.records-strength,.records-summary-label{align-items:center;display:inline-flex}
.records-add-calculation:active{transform:scale(.96)}
.records-scroll{overscroll-behavior:none;scrollbar-color:var(--line-strong) transparent;scrollbar-gutter:stable;max-height:438px;overflow:auto;background:var(--surface)}
.records-scroll:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
.records-table{border-collapse:separate;border-spacing:0;width:100%;min-width:1040px;color:var(--ink);table-layout:fixed;font-size:12px}
.records-company-col{width:292px}
.records-category-col{width:275px}
.records-last-col{width:190px}
.records-strength-col{width:208px}
.records-link-col{width:175px}
.records-table td,.records-table th{border-right:1px solid var(--line)}
.records-table td,.records-table th{border-bottom:1px solid var(--line)}
.records-table td,.records-table th{text-align:left;vertical-align:middle}
.records-table tr>:last-child{border-right:0}
.records-table thead th{z-index:5;background:var(--surface);height:44px;color:var(--ink-2);font-size:12px;font-weight:600;position:sticky;top:0}
.records-header-cell{padding:0}
.records-header-cell.records-sticky-cell{z-index:7}
.records-company-header,.records-header-button{gap:8px;width:100%;height:44px;padding:0 12px}
.records-company-header{padding-left:4px}
.records-header-button{color:var(--ink-2);text-align:left;align-items:center;transition:background-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out;display:flex}
.records-header-button:hover{background:var(--hover);color:var(--ink)}
.records-header-button:focus-visible{outline:0;box-shadow:inset 0 0 0 2px var(--accent);color:var(--ink)}
.records-header-static:hover{background:transparent;color:var(--ink-2)}
.records-header-icon{color:var(--ink-3);flex-shrink:0;display:inline-flex}
.records-sort{opacity:0;transition:opacity .12s ease-out,transform .16s var(--ease-out-strong);flex-shrink:0;margin-left:auto;display:inline-flex}
.records-header-button:hover .records-sort,.records-sort.is-visible{opacity:1}
.records-company-header{display:flex}
.records-company-header>span:not(.records-checkbox-box){white-space:nowrap}
.records-company-header:hover .records-add-field{opacity:1}
.records-checkbox{border-radius:var(--radius-control);flex:0 0 44px;justify-content:center;align-items:center;width:44px;height:44px;display:inline-flex;position:relative;cursor:pointer}
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
.records-cell{white-space:nowrap;text-overflow:ellipsis;height:44px;padding:0 12px;overflow:hidden}
.records-sticky-cell{z-index:2;background:var(--surface);position:sticky;left:0;box-shadow:8px 0 12px -12px #0009}
.records-company-cell{align-items:center;gap:3px;padding-left:0;display:flex;overflow:visible}
.records-row>.records-cell{transition:background-color .12s ease-out,color .12s ease-out,box-shadow .12s ease-out}
.records-row:hover>.records-cell{background:var(--hover)}
.records-row.is-selected>.records-cell{background:color-mix(in srgb,var(--accent) 10%,var(--surface))}
.records-row.is-selected>.records-sticky-cell{box-shadow:inset 3px 0 var(--accent),8px 0 12px -12px #0009}
.records-row.is-selected>.records-cell .records-company-name,.records-row.is-selected>.records-cell .records-link{color:var(--accent-ink)}
.records-company-mark{width:20px;height:20px;color:var(--ink-2);background:var(--field);border:0;border-radius:6px;flex:0 0 20px;justify-content:center;align-items:center;font-size:10px;font-weight:650;display:inline-flex}
.records-company-name{min-width:0;color:var(--ink);text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;font-weight:500;overflow:hidden}
.records-company-name.has-link:focus-visible,.records-company-name.has-link:hover{color:var(--accent-ink);text-underline-offset:3px;text-decoration:underline}
.records-tags{gap:4px;min-width:0;display:flex}
.records-tag,.records-tags{align-items:center;overflow:hidden}
.records-tag{cursor:default;border:1px solid color-mix(in srgb, var(--tag-color) 38%, transparent);flex-shrink:0;max-width:115px;height:23px;display:inline-flex}
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
.records-summary-label{color:var(--ink-3);gap:6px}
.records-average{color:var(--ink-2);align-items:center;gap:7px;display:inline-flex}
.records-calculation-row-secondary td{background:var(--inset);position:sticky;bottom:38px}
.records-calculation-row-secondary .records-sticky-cell{background:var(--inset);position:sticky}
.records-footer{min-height:38px;color:var(--ink-3);justify-content:space-between;align-items:center;gap:12px;padding:0 12px;font-size:11.5px;display:flex}
.records-footer strong{color:var(--ink-2);font-weight:600}
.records-shell:hover .records-footer-hint{opacity:1}
/* ── Insight cards chart ───────────────────────────────── */
.insight-chart-stage{touch-action:pan-y;user-select:none;overflow:hidden}
.insight-chart-cursor{z-index:4;background:var(--ink-3);opacity:.72;pointer-events:none;width:1px;position:absolute;top:0;bottom:0}
.insight-chart-tooltip-anchor{z-index:5;pointer-events:none;position:absolute;top:9px;transform:translate(-50%)}
.insight-chart-tooltip{border:1px solid var(--tooltip-border);min-width:158px;color:var(--tooltip-fg);background:var(--tooltip-bg);box-shadow:var(--shadow-overlay);border-radius:10px;padding:9px 10px;font-size:12px}
.insight-chart-tooltip-time{color:var(--tooltip-muted);margin-bottom:7px;font-size:11px;display:block}
.insight-chart-tooltip-row{justify-content:space-between;align-items:center;gap:16px;line-height:1.65;display:flex}
.insight-chart-tooltip-label{color:var(--tooltip-muted);align-items:center;gap:7px;display:inline-flex}
.insight-chart-tooltip-row strong{color:var(--tooltip-fg);font-variant-numeric:tabular-nums;font-weight:650}
.insight-chart-tooltip-dot{border-radius:99px;flex:0 0 10px;width:10px;height:2px}
`;
