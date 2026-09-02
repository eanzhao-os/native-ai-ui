(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74312,e=>{"use strict";let t="en",i=new Set;try{let e=window.localStorage.getItem("nai-lang");"en"===e||"zh"===e?t=e:("zh"===document.documentElement.lang||document.documentElement.lang?.startsWith("zh-"))&&(t="zh")}catch{}function r(){return t}function n(e){if(("en"===e||"zh"===e)&&t!==e){t=e;try{window.localStorage.setItem("nai-lang",e)}catch{}for(let t of(document.documentElement.lang=e,window.dispatchEvent(new CustomEvent("nai-lang-change",{detail:{lang:e}})),i))try{t(e)}catch(e){console.error("[nai-lang] listener error:",e)}}}function a(e){return i.add(e),()=>{i.delete(e)}}function s(e){return"en"===e||"zh"===e?e:t}e.s(["getGlobalLang",0,r,"onLangChange",0,a,"resolveLang",0,s,"setGlobalLang",0,n],29218);let o=`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
    --color-black: #000;
    --color-white: #fff;
    --spacing: 0.25rem;
    --container-xs: 20rem;
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
  .static {
    position: static;
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
  .bottom-12 {
    bottom: calc(var(--spacing) * 12);
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
  .min-h-14 {
    min-height: calc(var(--spacing) * 14);
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
  .min-h-\\[272px\\] {
    min-height: 272px;
  }
  .min-h-\\[300px\\] {
    min-height: 300px;
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
  .w-40 {
    width: calc(var(--spacing) * 40);
  }
  .w-44 {
    width: calc(var(--spacing) * 44);
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
  .max-w-xs {
    max-width: var(--container-xs);
  }
  .min-w-0 {
    min-width: 0px;
  }
  .min-w-5 {
    min-width: calc(var(--spacing) * 5);
  }
  .min-w-7 {
    min-width: calc(var(--spacing) * 7);
  }
  .min-w-11 {
    min-width: calc(var(--spacing) * 11);
  }
  .min-w-40 {
    min-width: calc(var(--spacing) * 40);
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
  .animate-\\[pop-in_200ms_cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)_both\\] {
    animation: pop-in 200ms cubic-bezier(0.23,1,0.32,1) both;
  }
  .animate-\\[shimmer-text_1\\.4s_linear_infinite\\] {
    animation: shimmer-text 1.4s linear infinite;
  }
  .animate-\\[spin_7s_linear_infinite\\] {
    animation: spin 7s linear infinite;
  }
  .animate-\\[spin_10s_linear_infinite\\] {
    animation: spin 10s linear infinite;
  }
  .animate-\\[spin_700ms_linear_infinite\\] {
    animation: spin 700ms linear infinite;
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
  .border-orange\\/60 {
    border-color: var(--orange);
    @supports (color: color-mix(in lab, red, red)) {
      border-color: color-mix(in oklab, var(--orange) 60%, transparent);
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
  .bg-orange-tint\\/30 {
    background-color: var(--orange-tint);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--orange-tint) 30%, transparent);
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
  .py-5 {
    padding-block: calc(var(--spacing) * 5);
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
  .placeholder\\:text-ink-2::placeholder {
    color: var(--ink-2);
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
  .focus-within\\:shadow-\\[inset_0_0_0_2px_var\\(--accent\\)\\]:focus-within {
    --tw-shadow: inset 0 0 0 2px var(--tw-shadow-color, var(--accent));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
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
    .hover\\:bg-surface:hover {
      background-color: var(--surface);
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
  .focus-visible\\:shadow-\\[inset_0_0_0_2px_var\\(--ink\\)\\]:focus-visible {
    --tw-shadow: inset 0 0 0 2px var(--tw-shadow-color, var(--ink));
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
  .disabled\\:opacity-60:disabled {
    opacity: 60%;
  }
  .disabled\\:shadow-none:disabled {
    --tw-shadow: 0 0 #0000;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  @media (prefers-reduced-motion: no-preference) {
    .motion-safe\\:animate-\\[fade-in_150ms_ease-out_both\\] {
      animation: fade-in 150ms ease-out both;
    }
    .motion-safe\\:animate-\\[fade-in_200ms_ease-out_both\\] {
      animation: fade-in 200ms ease-out both;
    }
    .motion-safe\\:animate-\\[fade-in_250ms_ease-out_both\\] {
      animation: fade-in 250ms ease-out both;
    }
    .motion-safe\\:animate-\\[fade-up_300ms_cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)_both\\] {
      animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;
    }
    .motion-safe\\:animate-\\[pop-in_250ms_cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)_both\\] {
      animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;
    }
    .motion-safe\\:animate-\\[pop-in_300ms_cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)_both\\] {
      animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;
    }
    .motion-safe\\:animate-spin {
      animation: var(--animate-spin);
    }
    .motion-safe\\:transition-\\[top\\,height\\,opacity\\] {
      transition-property: top,height,opacity;
      transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
      transition-duration: var(--tw-duration, var(--default-transition-duration));
    }
    .motion-safe\\:duration-200 {
      --tw-duration: 200ms;
      transition-duration: 200ms;
    }
    .motion-safe\\:ease-\\[cubic-bezier\\(0\\.23\\,1\\,0\\.32\\,1\\)\\] {
      --tw-ease: cubic-bezier(0.23,1,0.32,1);
      transition-timing-function: cubic-bezier(0.23,1,0.32,1);
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
    .sm\\:max-w-44 {
      max-width: calc(var(--spacing) * 44);
    }
    .sm\\:flex-none {
      flex: none;
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
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
`;e.s(["UTILITY_CSS",0,o],32083);class l extends HTMLElement{static get observedAttributes(){return["lang"]}constructor(){super(),this.attachShadow({mode:"open"}),this._cleanups=[],this._mounted=!1}setHtml(e,t=""){let i="string"==typeof e?e.replace(/\{\/\*[\s\S]*?\*\/\}/g,""):e;this.shadowRoot.innerHTML=`
      <style>
        ${o}
        ${t}
      </style>
      ${i}
    `}get currentLang(){return s(this.getAttribute("lang"))}get isZh(){return"zh"===this.currentLang}connectedCallback(){this._mounted=!0,this._unsubLang=a(()=>{this.hasAttribute("lang")||this.requestUpdate()}),this.onMount(),this.requestUpdate()}disconnectedCallback(){this._mounted=!1,this._unsubLang&&(this._unsubLang(),this._unsubLang=null),this.cleanup(),this.onUnmount()}attributeChangedCallback(e,t,i){t!==i&&this._mounted&&(this.onAttributeChange(e,t,i),this.requestUpdate())}onMount(){}onUnmount(){}onAttributeChange(e,t,i){}registerTimeout(e,t){let i=window.setTimeout(e,t);return this._cleanups.push(()=>clearTimeout(i)),i}registerInterval(e,t){let i=window.setInterval(e,t);return this._cleanups.push(()=>clearInterval(i)),i}registerRaf(e){let t,i=r=>{e(r),t=requestAnimationFrame(i)};t=requestAnimationFrame(i);let r=()=>cancelAnimationFrame(t);return this._cleanups.push(r),r}registerListener(e,t,i,r){e.addEventListener(t,i,r),this._cleanups.push(()=>e.removeEventListener(t,i,r))}cleanup(){for(;this._cleanups.length>0;){let e=this._cleanups.pop();try{e()}catch(e){console.error("[nai-base-element] cleanup error:",e)}}}requestUpdate(){this._mounted&&this.render()}render(){}}e.s(["NaiBaseElement",0,l],43516);let c=Array.from({length:9},(e,t)=>{let i=Math.floor(t/3);return(t%3+Math.abs(i-1))*90}),d=[0,1,2,5,8,7,6,3],p={Drive:{delays:c,dur:650,round:!1},Dots:{delays:c,dur:650,round:!0},Orbit:{delays:Array.from({length:9},(e,t)=>{let i=d.indexOf(t);return -1===i?null:110*i}),dur:950,round:!1}};class h extends l{static get observedAttributes(){return["variant","label","lang"]}constructor(){super(),this._ds=0,this._timerElement=null}get variant(){return this.getAttribute("variant")||"Drive"}get label(){return this.getAttribute("label")||"Churning"}onMount(){this._ds=0,this.registerInterval(()=>{this._ds+=1,this._updateTimerDisplay()},100)}_formatElapsed(){let e=this._ds/10;return e<60?`${e.toFixed(1)}s`:`${Math.floor(e/60)}m ${(e%60).toFixed(1)}s`}_updateTimerDisplay(){this._timerElement?.isConnected&&(this._timerElement.textContent=this._formatElapsed())}render(){let e=this.label,t=this.isZh&&"Churning"===e?"搅拌中":e,{delays:i,dur:r,round:n}=p[this.variant]??p.Drive;this.setHtml(`
      <div class="flex w-fit items-center gap-2.5">
        <span aria-hidden="true" class="pixel-grid grid grid-cols-[repeat(3,4px)] gap-[1.5px]">
          ${i.map(e=>`<span class="size-[4px] bg-ink ${n?"rounded-full":"rounded-[1px]"}" style="opacity: ${null===e?.07:.15}; animation: ${null===e?"none":`pixel-on ${r}ms ease-in-out ${e}ms infinite`};"></span>`).join("")}
        </span>
        <span class="bg-clip-text text-[13px] font-medium text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}</span>
        <span class="font-mono text-[12px] text-ink-3 tabular-nums">${this._formatElapsed()}</span>
      </div>
    `),this._timerElement=this.shadowRoot?.querySelector(".tabular-nums")??null}}"u">typeof customElements&&!customElements.get("nai-loading-state")&&customElements.define("nai-loading-state",h);let u=[800,600,1800,2600,1600],g={Steps:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Reading flavor briefs"},{primary:"Scanning supplier lists"},{primary:"Comparing tasting notes",secondary:"6 flavors"},{primary:"Writing the scoop report"}]},Reasoning:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Summer demand spikes for stone-fruit flavors — peach and apricot lead."},{primary:"I should check cone inventory before promoting a waffle-bowl special."}]},Search:{active:"Searching the web",done:"Searched the web",query:"best waffle cone supplier",rows:[{primary:"Joy Cone",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"Running tools",done:"Ran 3 tools",rows:[{primary:"Read",secondary:"flavors.ts",mono:!0},{primary:"Edit",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"Run",secondary:"npm run freeze",mono:!0}]}},m={Steps:{active:"深度思考中",done:"已深度思考 4 秒",rows:[{primary:"解析风味研发简报"},{primary:"扫描合规原料供应商名录"},{primary:"比对盲测品鉴笔记",secondary:"6 款配方"},{primary:"生成冰淇淋上架评估报告"}]},Reasoning:{active:"深度推理中",done:"已完成推理 (4秒)",rows:[{primary:"夏季水果口味需求激增 — 蜜桃与黄杏风味处于领跑地位。"},{primary:"在推广华夫脆筒套餐前，应先校验当前脆筒库存水位。"}]},Search:{active:"正在检索全网资料",done:"全网检索完成",query:"顶级华夫甜筒供应商",rows:[{primary:"Joy Cone 官方供应链",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore 餐饮商城",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery 手工脆筒",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"正在执行工具调用",done:"已调用 3 项工具",rows:[{primary:"读取",secondary:"flavors.ts",mono:!0},{primary:"修改",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"执行",secondary:"npm run freeze",mono:!0}]}},b=["bg-accent","bg-orange","bg-green"];function x(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}class v extends l{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._stage=0,this._manualExpanded=null,this._selectedTool=null}get variant(){return this.getAttribute("variant")||"Steps"}onMount(){this._stage=0;let e=t=>{t>=u.length-1||this.registerTimeout(()=>{this._stage=t+1,this.render(),e(this._stage)},u[t])};e(0)}_rowContent(e,t,i,r,n){var a;let s=[];return"Search"===i&&s.push((a=b[t%b.length],`<span class="flex size-3.5 shrink-0 items-center justify-center rounded-full text-white ${a}"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"></circle><path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path></svg></span>`)),"Steps"===i&&(t<r-1||!n?s.push('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 6L9 17l-5-5"></path></svg>'):s.push('<span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>')),s.push(`<span class="min-w-0 truncate text-[12.5px] ${"Reasoning"===i?"whitespace-normal leading-relaxed text-ink-2":"font-medium text-ink"}${"Search"===i?" animated-underline":""}">${x(e.primary)}</span>`),e.secondary&&s.push(`<span class="shrink-0 text-[11.5px] text-ink-3${e.mono?" font-mono":""}">${x(e.secondary)}</span>`),void 0!==e.add&&s.push(`<span class="shrink-0 font-mono text-[11px] tabular-nums"><span class="text-green">+${e.add}</span> <span class="text-red">−${e.del}</span></span>`),s.join(" ")}_rowMarkup(e,t,i,r,n){let a="flex min-h-7 w-full items-center gap-2 rounded-[6px] px-1.5 py-0.5 text-left",s=`animation: fade-up 320ms cubic-bezier(0.23,1,0.32,1) ${120*t}ms both;`,o=this._rowContent(e,t,i,r,n);if("Search"===i)return`<a href="${x(e.href)}" target="_blank" rel="noreferrer" class="${a} transition-colors duration-150 hover:bg-hover" style="${s}">${o}</a>`;if("Coding"===i){let t=this._selectedTool===e.primary;return`<button type="button" aria-pressed="${t}" class="${a} transition-colors duration-150 ${t?"bg-inset":"hover:bg-hover"} cursor-pointer" style="${s}">${o}</button>`}return`<div class="${a}" style="${s}">${o}</div>`}_syncLineHeight(){let e=this.shadowRoot?.querySelector(".trace-content"),t=this.shadowRoot?.querySelector(".trace-line");if(!e||!t)return;let i=e.offsetHeight;t.style.height=`${i?i-2:0}px`}render(){let e=this.isZh,t=this.variant,i=e?m:g,r=i[t]??i.Steps,n=this._stage>=1&&this._stage<4,a=this._manualExpanded??n,s=this._stage<3,o=this._stage<2?0:2===this._stage?Math.min(2,r.rows.length):r.rows.length,l=r.query?`<div class="flex h-6 items-center gap-2 px-1.5"${a?' style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"':""}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" class="shrink-0"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.3-4.3"></path></svg><span class="text-[12.5px] text-ink-2">${x(r.query)}</span></div>`:"",c=r.rows.slice(0,o).map((e,i)=>this._rowMarkup(e,i,t,o,s)).join(""),d="Search"===t&&this._stage>=3?`<span class="text-[12px] text-ink-3" style="animation: fade-in 300ms ease-out both;">${e?"+ 更多 7 项结果":"+7 more"}</span>`:"",p=s?`<span class="bg-clip-text text-[13px] font-medium whitespace-nowrap text-transparent" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: 1.4s linear 0s infinite normal none running shimmer-text;">${x(r.active)}</span>`:`<span class="text-[13px] font-medium whitespace-nowrap text-ink-2" style="animation: 350ms ease-out 0s 1 normal both running fade-in;">${x(r.done)}</span>`,h=[`<button type="button" aria-expanded="${a}" class="-mx-1.5 flex w-fit items-center gap-2 rounded-control px-1.5 py-1 transition-colors duration-100 hover:bg-hover-2 cursor-pointer">`,`<svg width="16" height="16" viewBox="0 0 24 24" fill="${s?"var(--ink-2)":"var(--ink-3)"}"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"></path></svg>`,p,`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" style="transform: ${a?"rotate(180deg)":"rotate(0deg)"};"><path d="M6 9l6 6 6-6"></path></svg>`,"</button>"].join("");this.setHtml(`
      <div class="flex min-h-[176px] w-full max-w-95 flex-col">
        ${h}
        <div class="grid transition-[grid-template-rows,opacity] duration-400" style="grid-template-rows: ${a?"1fr":"0fr"}; opacity: ${+!!a}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);">
          <div class="overflow-hidden">
            <div class="relative mt-1 ml-[5px] pl-4">
              <span aria-hidden="true" class="trace-line absolute left-[3px] w-px bg-line" style="top: -8px; height: 0px; transition: height 500ms cubic-bezier(0.23,1,0.32,1);"></span>
              <div class="trace-content flex flex-col gap-1 py-1">${l}${c}${d}</div>
            </div>
          </div>
        </div>
      </div>
    `),this._syncLineHeight(),this.shadowRoot?.querySelector("button")?.addEventListener("click",()=>{this._manualExpanded=!(this._manualExpanded??n),this.render()}),[...this.shadowRoot?.querySelectorAll("button[aria-pressed]")??[]].forEach((e,t)=>{let i=r.rows[t];e.addEventListener("click",()=>{this._selectedTool=this._selectedTool===i.primary?null:i.primary,this.render()})})}}"u">typeof customElements&&!customElements.get("nai-thinking")&&customElements.define("nai-thinking",v);let f=[..."Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points.".split(" ").map(e=>({text:e})),{text:"",cite:!0},..."Stone-fruit flavors are trending in the same range.".split(" ").map(e=>({text:e}))],w=[..."开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。".split("").map(e=>({text:e})),{text:"",cite:!0},..."同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。".split("").map(e=>({text:e}))],k=["Which flavors sell best in winter","Compare gelato and soft serve margins"],y=["冬季哪些冰淇淋风味销量最高？","对比意式硬冰与软冰淇淋的利润率"],_=[{name:"Scoop Data",domain:"scoopdata.io",href:"https://scoopdata.io/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%231f7a5f'/%3E%3Cpath d='M20 36c0 7 5.4 12 12 12s12-5 12-12H20Z' fill='%23fff'/%3E%3Ccircle cx='32' cy='25' r='11' fill='%23bff3dd'/%3E%3Cpath d='M24 24c4-7 13-7 17 0' fill='none' stroke='%231f7a5f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E"},{name:"Trends Index",domain:"trends.google.com",href:"https://trends.google.com/trends/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232f6fec'/%3E%3Cpath d='M15 43 27 31l8 7 14-18' fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='49' cy='20' r='5' fill='%23bfe0ff'/%3E%3C/svg%3E"},{name:"Market Basket",domain:"marketbasket.io",href:"https://marketbasket.io/",image:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23e56d24'/%3E%3Cpath d='M17 45V25h8v20h-8Zm11 0V16h8v29h-8Zm11 0V30h8v15h-8Z' fill='%23fff'/%3E%3Cpath d='M16 49h32' stroke='%23ffd6b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E"}],$=['<g><rect x="9" y="9" width="12" height="12" rx="2.5"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></g>','<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"></path>','<path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z"></path>','<path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z"></path>'];class E extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._count=0,this._sourcesOpen=!1,this._tickTimer=null,this._renderedLang=null,this._renderedCount=0}onMount(){this._count=0,this._scheduleTick()}onUnmount(){this._clearTick()}onAttributeChange(e){"lang"===e&&(this._count=0,this._clearTick(),this._scheduleTick())}_tokens(){return this.isZh?w:f}_clearTick(){null!==this._tickTimer&&(window.clearTimeout(this._tickTimer),this._tickTimer=null)}_scheduleTick(){this._clearTick();let e=this._tokens(),t=this._count>=e.length;this._tickTimer=this.registerTimeout(()=>{this._tickTimer=null,this._count=this._count>=this._tokens().length?0:this._count+1,queueMicrotask(()=>{this._mounted&&(this.render(),this._scheduleTick())})},t?3400:55)}_renderShell(){let e=this.isZh;this.setHtml(`<div class="min-h-[15.5rem] w-full max-w-95"><p class="content text-[13px] leading-relaxed text-ink"></p><div class="mt-2 flex items-center gap-0.5 transition-opacity duration-400" style="opacity:0;pointer-events:none">${$.map(e=>`<button type="button" aria-label="Action" class="flex size-6 items-center justify-center rounded-[6px] text-ink-3 transition-colors duration-100 hover:bg-hover-2 hover:text-ink-2 cursor-pointer"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${e}</svg></button>`).join("")}<button type="button" aria-expanded="${this._sourcesOpen}" class="sources-btn ml-1.5 flex items-center gap-1.5 rounded-[6px] px-1 py-0.5 text-left transition-colors duration-150 hover:bg-hover cursor-pointer"><span class="flex -space-x-1">${_.map(e=>`<img src="${e.image}" alt="" class="source-avatar size-3.5 rounded-full bg-surface shadow-[0_0_0_1.5px_var(--canvas)]">`).join("")}</span><span class="text-[12px] text-ink-2">${e?"10 处引用源":"10 sources"}</span></button></div><div class="grid transition-[grid-template-rows,opacity] duration-300" style="grid-template-rows:0fr;opacity:0;transition-timing-function:cubic-bezier(0.23, 1, 0.32, 1)"><div class="overflow-hidden"><div class="mt-1.5 flex flex-col rounded-card bg-inset p-1 shadow-hairline">${_.map(e=>`<a href="${e.href}" target="_blank" rel="noreferrer" class="flex items-center gap-2 rounded-[6px] px-1.5 py-1 text-[12px] text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink"><img src="${e.image}" alt="" class="source-avatar size-4 rounded-[4px]"><span class="animated-underline">${e.name}</span><span class="ml-auto font-mono text-[10.5px] text-ink-3">${e.domain}</span></a>`).join("")}</div></div></div><div class="mt-2.5 transition-opacity duration-400" style="opacity:0;pointer-events:none"><p class="text-[12px] font-medium text-ink-2">${e?"猜您想问":"Follow-ups"}</p><div class="mt-0.5 flex flex-col">${(e?y:k).map(e=>`<button class="-mx-1.5 flex items-center gap-2 rounded-[7px] border-b border-line px-1.5 py-1.5 text-left text-[12.5px] text-ink transition-colors duration-100 hover:bg-hover-2 cursor-pointer" style="opacity:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M9 10l-5 5 5 5"></path><path d="M20 4v7a4 4 0 0 1-4 4H4"></path></svg>${e}</button>`).join("")}</div></div></div>`,":host{display:block;width:100%}");let t=this.shadowRoot?.querySelector(".min-h-\\[15\\.5rem\\]");this._paragraph=t?.children[0]??null,this._actions=t?.children[1]??null,this._sourcesButton=this._actions?.querySelector(".sources-btn")??null,this._drawer=t?.children[2]??null,this._followUps=t?.children[3]??null,this._renderedLang=this.currentLang,this._renderedCount=0,this._sourcesButton?.addEventListener("click",()=>{this._sourcesOpen=!this._sourcesOpen,this._syncVisibility()})}_appendToken(e,t){let i,r=document.createElement("template");r.innerHTML=e.cite?(i=_[0],`<a href="${i.href}" target="_blank" rel="noreferrer" class="ml-0 mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-inset pr-[3px] pl-[3px] align-middle font-mono text-[10.5px] text-ink-2 shadow-hairline transition-colors duration-150 hover:bg-hover hover:text-ink" style="animation:pop-in 250ms cubic-bezier(0.23,1,0.32,1) both"><img src="${i.image}" alt="" class="source-avatar size-3 rounded-[3px]"><span>${i.domain}</span></a>`):`<span class="inline [will-change:filter,opacity]" style="animation:stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both">${e.text}${t?"":" "}</span>`,this._paragraph?.append(r.content)}_syncVisibility(){let e=this._tokens(),t=this._count>=e.length;this._actions&&(this._actions.style.opacity=t?"1":"0",this._actions.style.pointerEvents=t?"auto":"none"),this._sourcesButton&&this._sourcesButton.setAttribute("aria-expanded",String(this._sourcesOpen)),this._drawer&&(this._drawer.style.gridTemplateRows=t&&this._sourcesOpen?"1fr":"0fr",this._drawer.style.opacity=t&&this._sourcesOpen?"1":"0"),this._followUps&&(this._followUps.style.opacity=t?"1":"0",this._followUps.style.pointerEvents=t?"auto":"none",this._followUps.querySelectorAll("button").forEach((e,i)=>{e.style.animation=t?`fade-up 350ms cubic-bezier(0.23,1,0.32,1) ${90*i}ms both`:"",e.style.opacity=t?"":"0"}))}_syncStream(){if(!this._paragraph)return;let e=this.isZh,t=e?w:f,i=Math.min(this._count,t.length);for(i<this._renderedCount&&(this._paragraph.replaceChildren(),this._renderedCount=0),this._paragraph.querySelector("[data-stream-caret]")?.remove();this._renderedCount<i;)this._appendToken(t[this._renderedCount],e),this._renderedCount+=1;if(this._count<t.length){let e=document.createElement("template");e.innerHTML='<span data-stream-caret class="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-ink" style="animation:fade-in 150ms ease-out both"></span>',this._paragraph.append(e.content)}this._syncVisibility()}render(){this._renderedLang===this.currentLang&&this._paragraph?.isConnected||this._renderShell(),this._syncStream()}}"u">typeof customElements&&!customElements.get("nai-streaming-text")&&customElements.define("nai-streaming-text",E);let S=[{q:"How many flavors should we launch?",type:"radio",options:["Three (core line)","Five (full case)","Just one hero"]},{q:"Which mix-ins should we stock?",type:"check",options:["Chocolate chips","Waffle bits","Sprinkles"]},{q:"Which market do we enter first?",type:"radio",options:["Food trucks","Grocery freezers","Scoop shops"]}],C=[{q:"首批上线推出几款新口味？",type:"radio",options:["3 款 (核心经典线)","5 款 (完整全品类)","仅推 1 款爆品"]},{q:"首批需要进货哪些混合配料？",type:"check",options:["黑巧碎粒","华夫脆角碎片","彩色糖针"]},{q:"优先切入哪个试点销售渠道？",type:"radio",options:["流动餐车","精品超市冷柜","线下直营体验店"]}],M=0;class A extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0,this._autoAdvanceTimer=null,this._choiceGroupId=`nai-approval-${M++}`}onUnmount(){this._cancelAutoAdvance()}_questions(){return this.isZh?C:S}_cancelAutoAdvance(){null!==this._autoAdvanceTimer&&(window.clearTimeout(this._autoAdvanceTimer),this._autoAdvanceTimer=null)}_goToQuestion(e){this._cancelAutoAdvance(),this._qi=e,this.render()}_submit(){this._cancelAutoAdvance(),this._sent=!0,this.render()}toggle(e){let t=this._questions(),i=t[this._qi],r=this._answers[this._qi]??[];if(this._answers[this._qi]="radio"===i.type?[e]:r.includes(e)?r.filter(t=>t!==e):[...r,e],"radio"===i.type&&(this._custom[this._qi]="",this._cancelAutoAdvance()),this._syncQuestionControls(),"radio"===i.type){let e=this._qi;this._autoAdvanceTimer=this.registerTimeout(()=>{this._autoAdvanceTimer=null,e===t.length-1?this._sent=!0:this._qi===e&&(this._qi=Math.min(t.length-1,this._qi+1)),this.render()},480)}}_handleChoiceKeyDown(e,t){let i=this._questions()[this._qi];if(" "===e.key){e.preventDefault(),this.toggle(t);return}if("radio"!==i.type||!["ArrowDown","ArrowLeft","ArrowRight","ArrowUp"].includes(e.key))return;e.preventDefault();let r=(t+("ArrowDown"===e.key||"ArrowRight"===e.key?1:-1)+i.options.length)%i.options.length;this.shadowRoot?.querySelector(`input[data-option="${r}"]`)?.focus(),this.toggle(r)}_syncQuestionControls(){let e=this._questions()[this._qi],t=this._answers[this._qi]??[];this.shadowRoot?.querySelectorAll("input[data-option]").forEach(i=>{let r=Number(i.getAttribute("data-option")),n=t.includes(r);i.checked=n;let a=i.nextElementSibling,s=a?.nextElementSibling;a?.classList.toggle("bg-ink",n),a?.classList.toggle("text-canvas",n),a?.classList.toggle("shadow-[inset_0_0_0_1.5px_var(--line-strong)]",!n),a?.classList.toggle("text-transparent",!n);let o=a?.firstElementChild;"radio"===e.type&&o instanceof HTMLElement&&(o.style.transform=n?"scale(1)":"scale(0)"),s?.classList.toggle("text-ink",n),s?.classList.toggle("text-ink-2",!n)});let i=this.shadowRoot?.querySelector(".custom-input");i instanceof HTMLInputElement&&(i.value=this._custom[this._qi]??"");let r=t.length>0||!!this._custom[this._qi]?.trim(),n=this.shadowRoot?.querySelector(".submit-btn");n instanceof HTMLButtonElement&&(n.disabled=!r,n.style.background=r?"var(--ink)":"var(--field)",n.style.color=r?"var(--canvas)":"var(--ink-3)",n.style.boxShadow=r?"inset 0 1px 0 color-mix(in srgb, var(--surface) 22%, transparent)":"var(--shadow-btn)")}_syncCustomAnswer(e){let t=this._questions()[this._qi];this._cancelAutoAdvance(),this._custom[this._qi]=e.value,"radio"===t.type&&(this._answers[this._qi]=[]),this._syncQuestionControls()}submitNext(){let e=this._questions();this._qi===e.length-1?this._submit():this._goToQuestion(Math.min(e.length-1,this._qi+1))}reset(){this._cancelAutoAdvance(),this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0,this.render()}render(){let e=this.isZh,t=e?C:S;if(!this._open){this.setHtml(`<button type="button" class="reopen-btn min-h-11 rounded-control bg-surface px-3 text-[12.5px] font-medium text-ink shadow-btn transition-colors duration-150 hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">${e?"打开审批流卡片":"Open approval"}</button>`,":host{display:block;width:100%}"),this.shadowRoot?.querySelector(".reopen-btn")?.addEventListener("click",()=>{this._open=!0,this.render()});return}let i=t[this._qi],r=this._qi===t.length-1,n=this._answers[this._qi]??[],a=n.length>0||!!this._custom[this._qi]?.trim(),s=this._sent?`<div role="status" class="flex min-h-37 flex-col items-center justify-center gap-2"><span class="flex size-6 items-center justify-center rounded-full bg-green text-white" style="animation:pop-in 300ms cubic-bezier(0.23,1,0.32,1) both"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg></span><span class="text-[13px] font-medium text-ink" style="animation:fade-up 350ms cubic-bezier(0.23,1,0.32,1) 100ms both">${e?"审批决策已提交":"Answers sent"}</span><button type="button" class="reset-btn min-h-11 rounded-control px-3 text-[12px] font-medium text-accent-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">${e?"重新填写":"Start over"}</button></div>`:`<div class="primitive-card-pad" style="animation:fade-up 350ms cubic-bezier(0.23,1,0.32,1) both"><div class="flex items-start justify-between gap-3"><span class="text-[13px] font-medium text-ink">${i.q}</span><button type="button" aria-label="${e?"关闭审批":"Dismiss"}" class="dismiss-btn -m-2.5 flex size-11 shrink-0 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 hover:bg-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></div><fieldset class="mt-2 flex flex-col gap-0.5"><legend class="sr-only">${i.q}</legend>${i.options.map((e,t)=>{let r=n.includes(t);return`<label class="-mx-1.5 flex min-h-11 cursor-pointer items-center gap-2 rounded-control px-1.5 text-left transition-colors duration-100 hover:bg-hover focus-within:ring-2 focus-within:ring-accent"><input data-option="${t}" type="${"radio"===i.type?"radio":"checkbox"}" name="approval-${this._choiceGroupId}-${this._qi}" ${r?"checked":""} class="sr-only"><span aria-hidden="true" class="flex size-4 shrink-0 items-center justify-center transition-colors duration-200 ${"radio"===i.type?"rounded-full":"rounded-[5px]"} ${r?"bg-ink text-canvas":"shadow-[inset_0_0_0_1.5px_var(--line-strong)] text-transparent"}">${"radio"===i.type?`<span class="size-1.5 rounded-full bg-canvas transition-transform duration-200" style="transform:${r?"scale(1)":"scale(0)"}"></span>`:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>'}</span><span class="text-[13px] transition-colors duration-200 ${r?"text-ink":"text-ink-2"}">${e}</span></label>`}).join("")}<label class="-mx-1.5 flex min-h-11 items-center gap-2 rounded-control px-1.5 transition-colors duration-100 focus-within:bg-hover focus-within:ring-2 focus-within:ring-accent hover:bg-hover"><span aria-hidden="true" class="size-4 shrink-0"></span><input placeholder="${e?"输入其他自定义内容…":"Type something…"}" aria-label="${e?"自定义答案":"Custom answer"}" class="custom-input min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-3"></label></fieldset></div>`,o=`<div class="primitive-card-footer flex items-center justify-between"><span class="flex items-center gap-2"><button type="button" aria-label="${e?"上一题":"Previous"}" ${0===this._qi||this._sent?"disabled":""} class="prev-btn flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"></path></svg></button><span class="flex items-center gap-1">${t.map((t,i)=>{let r=i===this._qi&&!this._sent,n=r?"width:9px;height:9px;border:2.5px solid var(--ink)":this._sent||i<this._qi?"width:7px;height:7px;background:var(--ink-3)":"width:7px;height:7px;border:1.5px solid var(--ink-3)";return`<button type="button" data-question="${i}" aria-label="${e?`转到第 ${i+1} 题`:`Go to question ${i+1}`}" ${r?'aria-current="step"':""} ${this._sent?"disabled":""} class="flex size-11 items-center justify-center rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-default"><span aria-hidden="true" class="rounded-full transition-all duration-300" style="${n}"></span></button>`}).join("")}</span><button type="button" aria-label="${e?"下一题":"Next"}" ${r||this._sent?"disabled":""} class="next-nav-btn flex size-11 items-center justify-center rounded-control text-ink-3 transition-colors duration-100 enabled:hover:bg-hover enabled:hover:text-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-35"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"></path></svg></button></span>${this._sent?"":`<button type="button" aria-label="${r?e?"提交答案":"Send answers":e?"继续下一题":"Next question"}" ${a?"":"disabled"} class="submit-btn flex size-11 items-center justify-center rounded-[8px] transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed enabled:cursor-pointer" style="background:${a?"var(--ink)":"var(--field)"};color:${a?"var(--canvas)":"var(--ink-3)"};box-shadow:${a?"inset 0 1px 0 color-mix(in srgb, var(--surface) 22%, transparent)":"var(--shadow-btn)"}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg></button>`}</div>`;this.setHtml(`<div class="flex min-h-[196px] w-full max-w-80 flex-col items-stretch"><div class="w-full self-start overflow-hidden rounded-card bg-surface shadow-card">${s}${o}</div></div>`,":host{display:block;width:100%}");let l=this.shadowRoot?.querySelector(".custom-input");l instanceof HTMLInputElement&&(l.value=this._custom[this._qi]??"",l.addEventListener("input",()=>this._syncCustomAnswer(l))),this.shadowRoot?.querySelector(".dismiss-btn")?.addEventListener("click",()=>{this._cancelAutoAdvance(),this._open=!1,this.render()}),this.shadowRoot?.querySelector(".reset-btn")?.addEventListener("click",()=>this.reset()),this.shadowRoot?.querySelectorAll("input[data-option]").forEach(e=>{let t=Number(e.getAttribute("data-option"));e.addEventListener("change",()=>this.toggle(t)),e.addEventListener("keydown",e=>this._handleChoiceKeyDown(e,t))}),this.shadowRoot?.querySelector(".prev-btn")?.addEventListener("click",()=>{this._goToQuestion(Math.max(0,this._qi-1))}),this.shadowRoot?.querySelector(".next-nav-btn")?.addEventListener("click",()=>{this._goToQuestion(Math.min(t.length-1,this._qi+1))}),this.shadowRoot?.querySelectorAll("[data-question]").forEach(e=>{e.addEventListener("click",()=>{this._goToQuestion(Number(e.getAttribute("data-question")))})}),this.shadowRoot?.querySelector(".submit-btn")?.addEventListener("click",()=>{((this._answers[this._qi]?.length??0)>0||this._custom[this._qi]?.trim())&&(r?this._submit():this._goToQuestion(this._qi+1))}),this._sent&&this.shadowRoot?.querySelector(".reset-btn")?.focus()}}"u">typeof customElements&&!customElements.get("nai-approval-card")&&customElements.define("nai-approval-card",A);let z={clip:'<path d="m21.4 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>',chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path>',layers:'<g><path d="M12 2 2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path></g>',globe:'<g><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></g>'},T={figma:'<svg width="11" height="16" viewBox="0 0 38 57" aria-hidden="true"><path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19z" fill="#0ACF83"></path><path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#A259FF"></path><path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#F24E1E"></path><path d="M19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" fill="#FF7262"></path><path d="M38 28.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0z" fill="#1ABCFE"></path></svg>',slack:'<svg width="15" height="15" viewBox="0 0 127 127" aria-hidden="true"><path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"></path><path d="M47 27.2c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.7 39.7.8 47 .8c7.3 0 13.2 5.9 13.2 13.2v13.2H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H13.9C6.6 60.3.7 54.4.7 47.1c0-7.3 5.9-13.2 13.2-13.2H47z" fill="#36C5F0"></path><path d="M99.9 47.1c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V47.1zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V13.9C66.9 6.6 72.8.7 80.1.7c7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"></path><path d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.1c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80.1z" fill="#ECB22E"></path></svg>',gmail:'<svg width="15" height="12" viewBox="0 0 256 193" aria-hidden="true"><path d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z" fill="#4285F4"></path><path d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z" fill="#34A853"></path><path d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.669 34.992-4.669 40.644L128 145.504 58.182 93.14Z" fill="#EA4335"></path><path d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z" fill="#FBBC04"></path><path d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z" fill="#C5221F"></path></svg>'},j=[{key:"attach",nameEn:"Add photos & files",nameZh:"添加图片和文件",descEn:"Upload from your computer",descZh:"从本地上传",glyph:"clip",attach:!0},{key:"scoop",nameEn:"Scoop Data",nameZh:"Scoop 数据",descEn:"Sales & churn metrics",descZh:"销售与产量指标",glyph:"chart"},{key:"flavors",nameEn:"Flavor records",nameZh:"风味档案",descEn:"26 makers, tags, links",descZh:"26 家厂商、标签与链接",glyph:"layers"},{key:"web",nameEn:"Web search",nameZh:"联网搜索",descEn:"Real-time news and info",descZh:"实时新闻与资讯",glyph:"globe"},{key:"figma",nameEn:"Figma",nameZh:"Figma",descEn:"Design-to-code workflows",descZh:"设计稿转代码工作流",brand:"figma"},{key:"slack",nameEn:"Slack",nameZh:"Slack",descEn:"Read and manage Slack",descZh:"读取并管理 Slack 消息",brand:"slack"},{key:"gmail",nameEn:"Gmail",nameZh:"Gmail",descEn:"Read and manage Gmail",descZh:"读取并管理 Gmail 邮件",brand:"gmail",connect:!0}],R=[{key:"compare",name:"/compare",descEn:"Flavor vs. last summer",descZh:"对比风味与去年同期销量"},{key:"churn-plan",name:"/churn-plan",descEn:"Draft a churn schedule",descZh:"起草搅拌生产排期"},{key:"restock",name:"/restock",descEn:"Build a reorder list",descZh:"生成补货清单"},{key:"draft-email",name:"/draft-email",descEn:"Write a supplier email",descZh:"撰写供应商邮件"},{key:"summarize",name:"/summarize",descEn:"Digest the thread so far",descZh:"总结当前对话要点"}],L=[{key:"sprinkles-5",name:"Sprinkles 5",tagEn:"Flagship",tagZh:"旗舰"},{key:"vanilla-1",name:"Vanilla 1",tagEn:"Basic",tagZh:"基础"},{key:"freezer-burn",name:"Freezer Burn 0.4",tagEn:"Stale",tagZh:"过时"}],Z=["flavor-chart.png","summer-menu.pdf","pos-export.csv"],q=["#FF3D7F","#FF7A1A","#FFD600","#C2FF3D","#1FC8FF","#2E70FF","#D33CFF"],H={direction:"ltr",sweepMs:950,outroMs:130,peakAlpha:1.3,bandTight:10,brightness:1.4,swellAmount:1,waveSpeed:1.3,easing:"easeOutExpo"},B=null,I=null;function P(e){return 1===e?1:1-2**(-10*e)}function N(e){return e<.5?4*e**3:1-(-2*e+2)**3/2}function O(e,t={}){let i,r=t.sweepMs??950,n=t.outroMs??130,a=t.peakAlpha??1.3,s=!1,o=0,l=new Promise(e=>{i=e}),c=(e,t,i)=>new Promise(r=>{let n=performance.now(),a=()=>{if(s)return void r();let l=Math.min(1,(performance.now()-n)/e);t(i(l)),l<1?o=requestAnimationFrame(a):r()};o=requestAnimationFrame(a)});return(async()=>{e.setAlpha(a),e.setProgress(0),await c(r,t=>e.setProgress(t),P),s||(await c(n,t=>e.setAlpha(a*(1-t)),N),s||(e.setAlpha(0),e.setProgress(0),i()))})(),{done:l,cancel(){s||(s=!0,cancelAnimationFrame(o),e.setAlpha(0),e.setProgress(0),i())}}}let F=[{draft:"",connect:!1,model:"vanilla-1",hold:1100},{draft:"@",active:0,hold:900},{draft:"@",active:1,hold:620},{draft:"@",active:4,hold:620},{draft:"@",active:6,hold:700},{draft:"@",active:6,connect:!0,hold:1e3},{draft:"",hold:700},{draft:"/",active:0,hold:900},{draft:"/",active:1,hold:620},{draft:"/",active:3,hold:1e3},{draft:"",hold:800},{draft:"",modelOpen:!0,hold:1200},{draft:"",model:"sprinkles-5",hold:2400},{draft:"",hold:900}];function V(e,t=15,i=1.8){return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${i}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`}class D extends l{static get observedAttributes(){return["variant","lang"]}constructor(){super(),this._draft="",this._dismissed=!1,this._plusOpen=!1,this._modelOpen=!1,this._model=L[1],this._attachments=[],this._connected=!1,this._active=0,this._listening=!1,this._auto=!0,this._autoStep=0,this._expanded=!1,this._engaged=!1,this._modelHovered=null,this._autoTimer=null,this._dictationTimer=null,this._glRaf=0,this._glResizeObserver=null,this._glCanvas=null,this._glShader=null,this._glRenderer=null,this._glSweepHandle=null,this._glInitVersion=0,this._pendingSweep=!1,this._sweeping=!1}get variant(){return this.getAttribute("variant")||"Rounded"}get isPill(){return"pill"===this.variant.toLowerCase()}onMount(){this._runAutoStep()}onUnmount(){this._clearAutoTimer(),this._clearDictationTimer(),this._pendingSweep=!1,this._destroyCanvas()}_destroyCanvas(){this._glInitVersion+=1,this._glSweepHandle?.cancel?.(),this._glSweepHandle=null,this._glShader?.destroy?.(),this._glShader=null,this._glRenderer=null,this._sweeping=!1,this._glRaf&&cancelAnimationFrame(this._glRaf),this._glRaf=0,this._glResizeObserver?.disconnect(),this._glResizeObserver=null,this._glCanvas&&(this._glCanvas.style.opacity="0",delete this._glCanvas.dataset.sweeping),this._glCanvas=null}async _initCanvas(){let t=this.shadowRoot?.querySelector("canvas");if(!(t instanceof HTMLCanvasElement)||this._glCanvas===t&&this._glShader)return;this._destroyCanvas(),this._glCanvas=t,t.style.opacity="0",t.dataset.renderer="loading";let i=this._glInitVersion;try{let{ACCENTS:r,accentChain:n,createShader:a,playSweep:s}=B??await (!I&&(I=e.A(92760).then(e=>(B=e,e))),I);if(i!==this._glInitVersion||t!==this.shadowRoot?.querySelector("canvas"))return;let o=n([r.red,r.orange,r.yellow,r.green,r.cyan,r.blue,r.purple]);if(this._glShader=a({canvas:t,palette:o,direction:"ltr",bandTight:10,swellAmount:.85}),this._glShader){this._glRenderer={createShader:a,palette:o,playSweep:s,type:"glimm"},t.dataset.renderer="glimm",this._pendingSweep&&this._celebrate();return}}catch{}i===this._glInitVersion&&t===this._glCanvas&&(this._initFallbackCanvas(t),this._pendingSweep&&this._celebrate())}_initFallbackCanvas(e){let t=e.getContext("2d");if(!t){e.dataset.renderer="unavailable";return}let i={alpha:0,progress:0},r=()=>{let i=Math.min(window.devicePixelRatio||1,2),r=e.getBoundingClientRect(),a=Math.max(1,Math.round(r.width*i)),s=Math.max(1,Math.round(r.height*i));(e.width!==a||e.height!==s)&&(e.width=a,e.height=s),t.setTransform(i,0,0,i,0,0),n()},n=()=>{let r=Math.min(window.devicePixelRatio||1,2),n=e.width/r,a=e.height/r;if(t.clearRect(0,0,n,a),i.alpha<=0||n<=0||a<=0)return;let s=(-.2+1.4*i.progress)*n,o=Math.max(72,.38*n),l=t.createLinearGradient(s-o,0,s+o,0);l.addColorStop(0,"rgba(255,61,127,0)"),q.forEach((e,t)=>{l.addColorStop(.08+t/(q.length-1)*.84,e)}),l.addColorStop(1,"rgba(211,60,255,0)");let c=.2+3.2*i.progress*(1-i.progress);t.save(),t.globalAlpha=Math.min(1,i.alpha*c),t.globalCompositeOperation="screen",t.fillStyle=l,t.fillRect(s-o,0,2*o,a),t.restore()};this._glResizeObserver=new ResizeObserver(r),this._glResizeObserver.observe(e),r(),this._glShader={destroy:()=>{this._glResizeObserver?.disconnect(),this._glResizeObserver=null,t.clearRect(0,0,e.width,e.height)},getAlpha:()=>i.alpha,getProgress:()=>i.progress,setAlpha:e=>{i.alpha=Math.max(0,Math.min(1.5,e)),n()},setBandTight:()=>{},setBrightness:()=>{},setDirection:()=>{},setPalette:()=>{},setProgress:e=>{i.progress=Math.max(0,Math.min(1,e)),n()},setRippleAmount:()=>{},setSwellAmount:()=>{},setWaveAmount:()=>{},setWaveSpeed:()=>{}},this._glRenderer={playSweep:O,type:"fallback"},e.dataset.renderer="fallback"}_celebrate(){if(this._sweeping||"function"==typeof window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(!this._glCanvas||!this._glShader||!this._glRenderer){this._pendingSweep=!0,this._initCanvas();return}if(this._pendingSweep=!1,"glimm"===this._glRenderer.type&&(this._glShader.destroy?.(),this._glShader=this._glRenderer.createShader({canvas:this._glCanvas,palette:this._glRenderer.palette,direction:"ltr",bandTight:10,swellAmount:.85}),this._glShader||this._initFallbackCanvas(this._glCanvas)),!this._glShader||!this._glRenderer)return;let e=this._glCanvas;e.style.opacity="1",e.dataset.sweeping="true",this._sweeping=!0;let t="glimm"===this._glRenderer.type?{...H,palette:this._glRenderer.palette}:H,i=this._glRenderer.playSweep(this._glShader,t);this._glSweepHandle=i,i.done.finally(()=>{this._glSweepHandle===i&&(this._glSweepHandle=null,this._sweeping=!1,e.style.opacity="0",delete e.dataset.sweeping)})}_clearAutoTimer(){null!==this._autoTimer&&(window.clearTimeout(this._autoTimer),this._autoTimer=null)}_clearDictationTimer(){null!==this._dictationTimer&&(window.clearTimeout(this._dictationTimer),this._dictationTimer=null)}_takeOver(e){this._auto&&(this._auto=!1,this._clearAutoTimer(),e===this.shadowRoot?.querySelector("textarea")&&(this._draft=""))}_runAutoStep(){if(!this._auto)return;let e=F[this._autoStep%F.length],t=!1;if(this._draft=e.draft,void 0!==e.active&&(this._active=e.active),void 0!==e.connect&&(this._connected=e.connect),void 0!==e.modelOpen&&(this._modelOpen=e.modelOpen),e.model){let i=L.find(t=>t.key===e.model);i&&(this._model=i,this._modelOpen=!1,t="sprinkles-5"===i.key)}this._mounted&&this.render(),t&&this._celebrate(),this._autoTimer=this.registerTimeout(()=>{this._autoTimer=null,this._autoStep+=1,this._runAutoStep()},e.hold)}_token(){var e;let t;return this._dismissed?null:(e=this._draft,(t=/(^|\s)([@/])([\w-]*)$/.exec(e))?{kind:"@"===t[2]?"at":"slash",query:t[3].toLowerCase(),start:t.index+t[1].length}:null)}_menu(){return this._plusOpen?"at":this._token()?.kind??null}_rows(){let e=this.isZh,t=this._menu(),i=this._token(),r=this._plusOpen?"":i?.query??"";return"at"===t?j.filter(t=>(e?t.nameZh:t.nameEn).toLowerCase().includes(r)).map(t=>({key:t.key,name:e?t.nameZh:t.nameEn,desc:e?t.descZh:t.descEn})):"slash"===t?R.filter(e=>e.name.slice(1).startsWith(r)).map(t=>({key:t.key,name:t.name,desc:e?t.descZh:t.descEn})):[]}_renderAndFocus(e){this.render(),this.shadowRoot?.querySelector(e)?.focus()}_handleInput(e){this._draft=e,this._dismissed=!1,this._plusOpen=!1,this._active=0,this._engaged=!1,this._renderAndFocus("textarea")}_pick(e){let t=this._token(),i=this._menu(),r=j.find(t=>t.key===e.key);r?.attach?(this._attachments=[...this._attachments,Z[this._attachments.length%Z.length]],t&&(this._draft=this._draft.slice(0,t.start))):"at"===i?this._draft=`${t?this._draft.slice(0,t.start):this._draft}@${e.name} `:this._draft=`${t?this._draft.slice(0,t.start):this._draft}${e.name} `,this._plusOpen=!1,this._dismissed=!1,this._renderAndFocus("textarea")}_selectModel(e){this._model=e,this._modelOpen=!1,this._modelHovered=null,this.shadowRoot?.querySelector("[data-model-highlight]")?.parentElement?.remove();let t=this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]');if(t){t.setAttribute("aria-expanded","false");let i=[...t.childNodes].find(e=>e.nodeType===Node.TEXT_NODE);i&&(i.textContent=e.name)}this.shadowRoot?.querySelector("textarea")?.focus(),"sprinkles-5"===e.key&&this._celebrate()}_startDictation(){(this._listening=!this._listening,this._clearDictationTimer(),this._listening)?(this.render(),this._dictationTimer=this.registerTimeout(()=>{this._dictationTimer=null;let e=this.isZh?"对比开心果口味周末销量与去年同期":"Compare pistachio weekends to last summer";this._draft=this._draft?`${this._draft.trimEnd()} ${e}`:e,this._listening=!1,this._renderAndFocus("textarea")},2200)):this.render()}_canSend(){return this._draft.trim().length>0||this._attachments.length>0}send(){this._canSend()&&(this.dispatchEvent(new CustomEvent("submit",{detail:{text:this._draft.trim(),model:this._model.key}})),this._draft="",this._attachments=[],this._plusOpen=!1,this._modelOpen=!1,this.render(),this.shadowRoot?.querySelector('[aria-label="Send"], [aria-label="发送"]')?.focus())}_updateRowHighlight(e){this._active=e,this._engaged=!0;let t=this.shadowRoot?.querySelector("[data-menu-highlight]"),i=this.shadowRoot?.querySelector(`[data-row-index="${e}"]`);t instanceof HTMLElement&&i instanceof HTMLElement&&(t.style.top=`${i.offsetTop}px`,t.style.height=`${i.offsetHeight}px`,t.style.opacity="1")}_updateModelHighlight(e){this._modelHovered=e;let t=this.shadowRoot?.querySelector("[data-model-highlight]"),i=this.shadowRoot?.querySelector(`[data-model-index="${e}"]`);t instanceof HTMLElement&&i instanceof HTMLElement&&(t.style.top=`${i.offsetTop}px`,t.style.height=`${i.offsetHeight}px`,t.style.opacity="1")}_measureComposer(){let e=this.shadowRoot?.querySelector("[data-controls]"),t=this.shadowRoot?.querySelector("textarea"),i=this.shadowRoot?.querySelector("[data-measure]"),r=this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]');if(!(e instanceof HTMLElement)||!(t instanceof HTMLTextAreaElement)||!(i instanceof HTMLElement)||!(r instanceof HTMLElement))return;if(e.clientWidth>0){let t=84+r.offsetWidth,n=e.clientWidth-t-16,a=this._draft.includes("\n")||i.offsetWidth+8>n;if(a!==this._expanded){this._expanded=a,this.render();return}}t.style.height="0px";let n=t.scrollHeight;t.style.height=`${Math.min(Math.max(n,28),100)}px`,t.style.overflowY=n>100?"auto":"hidden"}render(){let e=this.shadowRoot?.querySelector("canvas"),t=e?.parentElement,i=this.shadowRoot?.querySelector('[aria-label="Send"], [aria-label="发送"]'),r=this.isZh,n=this.isPill,a=this._token(),s=this._menu(),o=this._plusOpen?"":a?.query??"",l=this._rows(),c=this._canSend(),d=this._expanded,p=L.findIndex(e=>e.key===this._model.key),h=s?`<div class="absolute inset-x-0 bottom-full z-10 mb-2 rounded-card bg-surface p-1 shadow-raised" style="animation:pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;transform-origin:bottom center"><span data-menu-highlight aria-hidden="true" class="pointer-events-none absolute inset-x-1 rounded-[6px] bg-hover" style="top:${4+36*this._active}px;height:36px;opacity:${this._engaged&&l.length>0?1:0};transition:top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease"></span>${l.map((e,t)=>{let i="at"===s?j.find(t=>t.key===e.key):void 0,n=i?`<span class="flex size-5.5 shrink-0 items-center justify-center text-ink-2">${i.brand?T[i.brand]:V(z[i.glyph??"clip"],15)}</span>`:"",a=i?.connect?`<span role="button" tabindex="-1" data-connect class="shrink-0 text-[12px] font-medium transition-colors duration-100 ${this._connected?"text-green":"text-accent-ink hover:underline"}">${this._connected?r?"已连接":"Connected":r?"连接":"Connect"}</span>`:"";return`<button type="button" data-row-index="${t}" data-row-key="${e.key}" class="relative z-10 flex h-9 w-full items-center gap-2.5 rounded-[6px] px-2 text-left">${n}<span class="shrink-0 text-[12.5px] font-medium text-ink">${e.name}</span><span class="min-w-0 flex-1 truncate text-[12px] text-ink-3">${e.desc}</span>${a}</button>`}).join("")}${0===l.length?`<div class="flex h-9 items-center px-2 text-[12px] text-ink-3">${r?`没有匹配「${o}」的结果`:`No matches for “${o}”`}</div>`:""}<div class="mt-1 border-t border-line px-2 pt-1.5 pb-1 text-[11px] text-ink-3">${"at"===s?r?"输入以搜索数据源与文件":"Type to search sources & files":r?"输入以搜索命令":"Type to search commands"}</div></div>`:"",u=this._modelOpen?`<div class="absolute right-0 bottom-full z-10 mb-2 w-44 rounded-card bg-surface p-1 shadow-raised" style="animation:pop-in 180ms cubic-bezier(0.23,1,0.32,1) both;transform-origin:bottom right"><span data-model-highlight aria-hidden="true" class="pointer-events-none absolute inset-x-1 rounded-[6px] bg-hover" style="top:${4+(this._modelHovered??p)*30}px;height:30px;opacity:${+(null!==this._modelHovered)};transition:top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease"></span>${L.map((e,t)=>`<button type="button" data-model-index="${t}" data-model="${e.key}" class="relative z-10 flex h-7.5 w-full items-center gap-2 rounded-[6px] px-2 text-left"><span class="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">${e.name}</span><span class="shrink-0 text-[11px] text-ink-3">${r?e.tagZh:e.tagEn}</span><span class="shrink-0 text-ink ${e.key===this._model.key?"":"invisible"}">${V('<path d="M20 6L9 17l-5-5"></path>',13,2.5)}</span></button>`).join("")}</div>`:"",g=this._attachments.length>0?`<div class="flex flex-wrap gap-1.5 pt-0.5 ${n?"px-1":"px-0.5"}">${this._attachments.map((e,t)=>`<span class="flex h-6.5 items-center gap-1.5 bg-field py-1 pr-1 pl-1.5 text-[11.5px] text-ink-2 shadow-hairline ${n?"rounded-full":"rounded-chip"}" style="animation:pop-in 200ms cubic-bezier(0.23,1,0.32,1) both">${V('<g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></g>',12)}<span class="max-w-36 truncate">${e}</span><button type="button" data-remove="${t}" aria-label="${r?`移除 ${e}`:`Remove ${e}`}" class="flex size-4 items-center justify-center text-ink-3 transition-colors duration-100 hover:bg-line/70 hover:text-ink ${n?"rounded-full":"rounded-[4px]"}">${V('<path d="M18 6L6 18M6 6l12 12"></path>',10,2.5)}</button></span>`).join("")}</div>`:"";this.setHtml(`<div class="flex min-h-[384px] w-full max-w-105 flex-col justify-end pb-8"><div class="relative">${h}${u}<div class="relative isolate flex flex-col gap-1.5 overflow-hidden border border-line bg-surface p-1.5 shadow-card transition-[border-color,border-radius] duration-150 focus-within:border-line-strong ${n?this._attachments.length>0||d?"rounded-[24px]":"rounded-full":"rounded-[14px]"}"><canvas aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 h-full w-full" style="border-radius:inherit;opacity:0"></canvas><span data-measure aria-hidden="true" class="pointer-events-none absolute invisible whitespace-pre text-[13px] leading-[18px]"></span>${g}<div data-controls class="grid items-end gap-x-1 gap-y-1.5 ${d?"grid-cols-[minmax(0,1fr)_auto_28px_28px]":"grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]"}"><button type="button" aria-label="${r?"添加附件与数据源":"Add attachments and sources"}" aria-expanded="${this._plusOpen}" class="flex size-7 shrink-0 items-center justify-center justify-self-start text-ink-3 transition-[background-color,color,transform] duration-150 hover:bg-hover hover:text-ink active:scale-[0.94] ${n?"rounded-full":"rounded-[8px]"} ${this._plusOpen?"bg-hover text-ink":""} ${d?"col-start-1 row-start-2":"col-start-1 row-start-1"}">${V('<path d="M12 5v14M5 12h14"></path>',16,2)}</button><textarea rows="1" placeholder="${this._listening?r?"正在聆听…":"Listening…":r?"输入消息…":"Write a message…"}" aria-label="${r?"提示词输入框":"Prompt"}" class="min-h-7 min-w-0 w-full resize-none bg-transparent px-1 py-[5px] text-[13px] leading-[18px] text-ink outline-none [overflow-wrap:anywhere] placeholder:text-ink-3 ${d?"col-span-full col-start-1 row-start-1":"col-start-2 row-start-1"}"></textarea><button type="button" aria-expanded="${this._modelOpen}" aria-label="${r?"选择模型":"Choose model"}" class="flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-ink-2 transition-colors duration-150 hover:bg-hover hover:text-ink ${n?"rounded-full":"rounded-[8px]"} ${d?"col-start-2 row-start-2":"col-start-3 row-start-1"}">${this._model.name}<span class="text-ink-3">${V('<path d="M6 9l6 6 6-6"></path>',11,2.4)}</span></button><button type="button" aria-label="${this._listening?r?"停止听写":"Stop dictation":r?"开始听写":"Start dictation"}" aria-pressed="${this._listening}" class="flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-150 active:scale-[0.94] ${n?"rounded-full":"rounded-[8px]"} ${this._listening?"bg-accent-tint text-accent-ink":"text-ink-3 hover:bg-hover hover:text-ink"} ${d?"col-start-3 row-start-2":"col-start-4 row-start-1"}">${this._listening?'<span class="flex h-3.5 items-center gap-[2.5px]"><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 0ms infinite"></span><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 150ms infinite"></span><span class="w-[2.5px] rounded-full bg-current" style="height:100%;animation:eq-bounce 900ms ease-in-out 300ms infinite"></span></span>':V('<g><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"></path></g>',15,2)}</button><button type="button" aria-label="${r?"发送":"Send"}" ${c?"":"disabled"} class="flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.94] ${n?"rounded-full":"rounded-[8px]"} ${d?"col-start-4 row-start-2":"col-start-5 row-start-1"}" style="background:${c?"var(--ink)":"var(--line-strong)"};color:${c?"var(--surface)":"var(--ink-2)"}">${V('<path d="M12 19V5M5 12l7-7 7 7"></path>',16,2.4)}</button></div></div></div></div>`,":host{display:flex;justify-content:center;width:100%}");let m=this.shadowRoot?.querySelector("canvas");e instanceof HTMLCanvasElement&&m instanceof HTMLCanvasElement&&m.replaceWith(e);let b=this.shadowRoot?.querySelector('[aria-label="Send"], [aria-label="发送"]');i instanceof HTMLButtonElement&&b instanceof HTMLButtonElement&&(i.className=b.className,i.disabled=b.disabled,i.style.cssText=b.style.cssText,i.setAttribute("aria-label",b.getAttribute("aria-label")),b.replaceWith(i));let x=this.shadowRoot?.querySelector(".relative.isolate");t instanceof HTMLElement&&x instanceof HTMLElement&&(t.className=x.className,t.replaceChildren(...x.childNodes),x.replaceWith(t));let v=this.shadowRoot?.querySelector("textarea"),f=this.shadowRoot?.querySelector("[data-measure]");v instanceof HTMLTextAreaElement&&(v.value=this._draft),f&&(f.textContent=this._draft);let w=this.shadowRoot?.querySelector(".min-h-\\[384px\\]");w?.addEventListener("pointerdown",e=>this._takeOver(e.target),!0),w?.addEventListener("keydown",e=>this._takeOver(e.target),!0),v?.addEventListener("input",e=>this._handleInput(e.target.value)),v?.addEventListener("keydown",e=>{let t=this._rows();if(this._menu()&&t.length>0){if("ArrowDown"===e.key||"ArrowUp"===e.key){e.preventDefault(),this._active=(this._active+("ArrowDown"===e.key?1:t.length-1))%t.length,this._updateRowHighlight(this._active);return}if("Enter"===e.key&&!e.shiftKey||"Tab"===e.key){e.preventDefault(),this._pick(t[this._active]);return}}if("Escape"===e.key){this._dismissed=!0,this._plusOpen=!1,this._modelOpen=!1,this.render();return}"Enter"!==e.key||e.shiftKey||e.isComposing||(e.preventDefault(),this.send())}),this.shadowRoot?.querySelector('[aria-label="Add attachments and sources"], [aria-label="添加附件与数据源"]')?.addEventListener("click",()=>{this._modelOpen=!1,this._plusOpen=!this._plusOpen,this._renderAndFocus("textarea")}),this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]')?.addEventListener("click",()=>{this._plusOpen=!1,this._modelOpen=!this._modelOpen,this.render(),this.shadowRoot?.querySelector('[aria-label="Choose model"], [aria-label="选择模型"]')?.focus()}),this.shadowRoot?.querySelector('[aria-label="Start dictation"], [aria-label="Stop dictation"], [aria-label="开始听写"], [aria-label="停止听写"]')?.addEventListener("click",()=>this._startDictation());let k=this.shadowRoot?.querySelector('[aria-label="Send"], [aria-label="发送"]');k&&k!==i&&k.addEventListener("click",()=>this.send()),this.shadowRoot?.querySelectorAll("[data-row-index]").forEach(e=>{let t=Number(e.getAttribute("data-row-index"));e.addEventListener("mousedown",e=>e.preventDefault()),e.addEventListener("mouseenter",()=>this._updateRowHighlight(t)),e.addEventListener("click",()=>this._pick(l[t])),e.querySelector("[data-connect]")?.addEventListener("click",e=>{e.stopPropagation(),this._connected=!this._connected;let t=e.currentTarget;t.textContent=this._connected?this.isZh?"已连接":"Connected":this.isZh?"连接":"Connect",t.classList.toggle("text-green",this._connected),t.classList.toggle("text-accent-ink",!this._connected),t.classList.toggle("hover:underline",!this._connected)})});let y=this.shadowRoot?.querySelector("[data-menu-highlight]")?.parentElement;y?.addEventListener("mouseleave",()=>{this._engaged=!1;let e=this.shadowRoot?.querySelector("[data-menu-highlight]");e instanceof HTMLElement&&(e.style.opacity="0")}),this.shadowRoot?.querySelectorAll("[data-model-index]").forEach(e=>{let t=Number(e.getAttribute("data-model-index"));e.addEventListener("mousedown",e=>e.preventDefault()),e.addEventListener("mouseenter",()=>this._updateModelHighlight(t)),e.addEventListener("click",()=>this._selectModel(L[t]))});let _=this.shadowRoot?.querySelector("[data-model-highlight]")?.parentElement;_?.addEventListener("mouseleave",()=>{this._modelHovered=null;let e=this.shadowRoot?.querySelector("[data-model-highlight]");e instanceof HTMLElement&&(e.style.opacity="0")}),this.shadowRoot?.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();let i=Number(e.getAttribute("data-remove"));this._attachments=this._attachments.filter((e,t)=>t!==i),this.render()})}),this._measureComposer(),this._initCanvas()}}"u">typeof customElements&&!customElements.get("nai-prompt-bar")&&customElements.define("nai-prompt-bar",D);let W=[{key:"flavors",labelEn:"Flavors",labelZh:"风味"},{key:"suppliers",labelEn:"Suppliers",labelZh:"供应商"}];class U extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase="done",this._draft="",this._tab="flavors",this._submitted=""}onMount(){this._submitted=this.isZh?"对比薄荷巧克力与去年同期销量":"Compare mint chip to last summer"}setTab(e){this._tab=e,this.render()}send(){this._draft.trim()&&(this._submitted=this._draft.trim(),this._draft="",this._phase="sent",this.render(),this.registerTimeout(()=>{this._phase="reply1",this.render()},500),this.registerTimeout(()=>{this._phase="reply2",this.render()},1900),this.registerTimeout(()=>{this._phase="done",this.render()},3100))}render(){let e=this.isZh,t="idle"!==this._phase,i=this._draft.trim().length>0,r=(e,t,i,r,n,a=!1)=>`
      <div
        class="flex w-full flex-col gap-1.5 transition-all duration-400"
        style="
          opacity: ${a?.55:1};
          filter: ${a?"blur(0.5px)":"blur(0)"};
          transform: ${a?"scale(0.985)":"scale(1)"};
          transform-origin: top left;
          animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) both;
        "
      >
        <div class="flex items-center gap-1 text-[12px] leading-[1.3]">
          <span class="font-medium text-ink">${e}</span>
          <span class="text-ink-2">${t}</span>
          <span class="text-ink">${r} ${i}</span>
        </div>
        <p class="text-[13px] leading-normal text-ink">${n}</p>
      </div>
    `;this.setHtml(`
      <div class="flex h-[288px] w-full max-w-95 flex-col self-start overflow-hidden rounded-[14px] bg-surface shadow-card">
        
        <div class="flex shrink-0 items-center justify-between border-b border-line p-1.5">
          <div class="flex items-center">
            ${W.map(t=>`
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

          ${"reply1"===this._phase||"reply2"===this._phase||"done"===this._phase?r(e?"销售历史":"Sales History",e?"风味数据":"Flavor Data","4s",e?"用时":"for",e?"已调取近三年夏季薄荷巧克力的销售数据用于对比。":"Pulled 3 summers of mint chip sales for comparison."):""}

          ${"reply2"===this._phase||"done"===this._phase?r(e?"对比分析":"Comparison",e?"趋势识别":"Trend Detection","2s",e?"用时":"for",e?"薄荷巧克力销量上涨 12%，周末峰值更加明显。":"Mint chip is up 12% with stronger weekend peaks.","reply2"===this._phase):""}
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
                ${!i?"disabled":""}
                class="send-btn flex size-7 items-center justify-center rounded-[8px] transition-all duration-200"
                style="
                  background: ${i?"var(--ink)":"var(--line-strong)"};
                  color: ${i?"var(--surface)":"var(--ink-2)"};
                  cursor: ${i?"pointer":"default"};
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
    `),this.shadowRoot?.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>this.setTab(e.getAttribute("data-tab")))});let n=this.shadowRoot?.querySelector("input"),a=this.shadowRoot?.querySelector(".send-btn"),s=this.shadowRoot?.querySelector(".composer-box");n&&(n.addEventListener("input",e=>{this._draft=e.target.value;let t=this._draft.trim().length>0;a&&(a.style.background=t?"var(--ink)":"var(--line-strong)",a.style.color=t?"var(--surface)":"var(--ink-2)",a.style.cursor=t?"pointer":"default",t?a.removeAttribute("disabled"):a.setAttribute("disabled","true"))}),n.addEventListener("keydown",e=>{"Enter"===e.key&&this.send()})),a&&a.addEventListener("click",()=>this.send()),s&&n&&s.addEventListener("click",()=>n.focus())}}customElements.get("nai-chat")||customElements.define("nai-chat",U);let K=[[{t:"export async function ",c:"kw"},{t:"churnBatch",c:"fn"},{t:"() {",c:"dim"}],[{t:"  const ",c:"kw"},{t:"flavor = "},{t:"await ",c:"kw"},{t:"getFlavor",c:"fn"},{t:"(",c:"dim"},{t:'"pistachio"',c:"str"},{t:");",c:"dim"}],[{t:"  const ",c:"kw"},{t:"base = "},{t:"await ",c:"kw"},{t:"dairy."},{t:"fetch",c:"fn"},{t:"({ flavor });",c:"dim"}],[{t:"  await ",c:"kw"},{t:"freezer."},{t:"store",c:"fn"},{t:"(base, { temp: ",c:"dim"},{t:'"-14C"',c:"str"},{t:" });",c:"dim"}],[{t:"  return ",c:"kw"},{t:"base.gallons;"}],[{t:"}",c:"dim"}]],G={kw:"var(--accent-ink)",str:"var(--green)",num:"var(--orange)",fn:"var(--ink)",dim:"var(--ink-3)"},J=`export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`;class Q extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._count=0,this._copied=!1}onMount(){this._count=0,this._tick()}_tick(){let e=this._count>=K.length;this.registerTimeout(()=>{this._count=this._count>=K.length?0:this._count+1,this.render(),this._tick()},0===this._count?400:e?3200:240)}copy(){navigator.clipboard?.writeText(J).then(()=>{this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)})}render(){let e=this.isZh,t=this._count>=K.length;this.setHtml(`
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

        
        <pre class="overflow-x-auto p-3.5 font-mono text-[12.5px] leading-relaxed text-ink [tab-size:2]"><code>${K.slice(0,this._count).map((e,t)=>`
            <div class="flex items-baseline" style="animation: stream-in 300ms ease-out both;">
              <span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${t+1}</span>
              <span class="min-w-0 flex-1 whitespace-pre">${e.map(e=>`<span style="color: ${e.c?G[e.c]:"inherit"};">${e.t}</span>`).join("")}</span>
            </div>
          `).join("")}${!t?`<div class="flex items-baseline"><span class="mr-3 w-4 shrink-0 select-none text-right text-[11px] text-ink-3 opacity-50">${this._count+1}</span><span class="inline-block h-3.5 w-1.5 bg-accent align-middle animate-pulse"></span></div>`:""}</code></pre>
      </div>
    `),this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click",()=>this.copy())}}"u">typeof customElements&&!customElements.get("nai-code-block")&&customElements.define("nai-code-block",Q);let Y=[{id:"report",name:"quarterly-report.pdf",kind:"pdf",size:"2.4 MB",state:"ready",progress:100},{id:"wireframe",name:"wireframe.png",kind:"image",size:"1.8 MB",state:"parsing",progress:42},{id:"interview",name:"interview.wav",kind:"audio",size:"18.7 MB",state:"indexing",progress:64},{id:"notes",name:"research-notes.pdf",kind:"pdf",size:"840 KB",state:"failed",progress:38}],X={uploading:{en:"Uploading",zh:"上传中",tone:"text-accent-ink",tint:"bg-accent"},parsing:{en:"Parsing",zh:"解析中",tone:"text-orange",tint:"bg-orange"},indexing:{en:"Indexing",zh:"索引中",tone:"text-accent-ink",tint:"bg-accent"},ready:{en:"Ready",zh:"已就绪",tone:"text-green",tint:"bg-green"},failed:{en:"Parse failed",zh:"解析失败",tone:"text-red",tint:"bg-red"}};class ee extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._attachments=[...Y]}retry(e){this._attachments=this._attachments.map(t=>t.id===e?{...t,state:"uploading",progress:0}:t),this.render()}remove(e){this._attachments=this._attachments.filter(t=>t.id!==e),this.render()}render(){let e=this.isZh;this.setHtml(`
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
          ${this._attachments.map(t=>{let i=X[t.state],r="uploading"===t.state||"parsing"===t.state||"indexing"===t.state,n="pdf"===t.kind?"PDF":"image"===t.kind?"IMG":"WAV";return`
              <div class="item flex gap-3 px-4 py-3 ${"failed"===t.state?"bg-red-tint/35":"bg-surface"}">
                <span class="flex h-8 w-9 shrink-0 items-center justify-center rounded-control border border-line bg-inset font-mono text-[9px] font-semibold text-ink-2">
                  ${n}
                </span>
                <div class="min-w-0 flex-1">
                  <div class="flex min-w-0 items-start justify-between gap-3">
                    <div class="min-w-0">
                      <p class="truncate text-[12.5px] font-medium text-ink">${t.name}</p>
                      <p class="mt-0.5 font-mono text-[10px] text-ink-3">${t.size}</p>
                    </div>
                    <span class="shrink-0 text-[10.5px] font-medium ${i.tone}">
                      ${e?i.zh:i.en}
                    </span>
                  </div>

                  ${r?`
                    <div class="mt-2 flex items-center gap-2.5">
                      <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-field">
                        <span
                          class="block h-full rounded-full transition-all duration-300 ${i.tint}"
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
    `),this.shadowRoot?.querySelectorAll("[data-retry]").forEach(e=>{e.addEventListener("click",()=>this.retry(e.getAttribute("data-retry")))}),this.shadowRoot?.querySelectorAll("[data-remove]").forEach(e=>{e.addEventListener("click",()=>this.remove(e.getAttribute("data-remove")))})}}"u">typeof customElements&&!customElements.get("nai-attachment-queue")&&customElements.define("nai-attachment-queue",ee);let et=[{id:"sub-1",nameEn:"Web Researcher",nameZh:"网络检索子 Agent",roleEn:"Information Retrieval",roleZh:"资料检索",model:"gemini-2.5-flash",status:"completed",duration:"1.8s",tokens:"1,420",actionEn:"Indexed 4 documentation pages & RFC specs",actionZh:"已解析 4 篇技术文档与 RFC 规范",logsEn:["query: 'Next.js 16 server action streaming rfc'","fetched: https://nextjs.org/docs/app/building-your-application","extracted: 4 key code samples & contract definitions","returned payload to coordinator"],logsZh:["查询: 'Next.js 16 server action streaming rfc'","抓取: https://nextjs.org/docs/app/building-your-application","提取: 4 段核心代码示例与契约定义","已将检索工件返回至主协调器"]},{id:"sub-2",nameEn:"Schema Architect",nameZh:"架构代码子 Agent",roleEn:"Code Generation",roleZh:"代码生成",model:"claude-3-7-sonnet",status:"running",duration:"3.4s",tokens:"3,890",actionEn:"Synthesizing Prisma schema with relational indexes...",actionZh:"正在合成带有关系索引的 Prisma 数据模型...",logsEn:["analyzed entities: User, Workspace, SubagentSession","drafted models & enum definitions","invoking tool: write_file('prisma/schema.prisma')"],logsZh:["分析实体关系: User, Workspace, SubagentSession","起草数据表与枚举类型定义","调用工具: write_file('prisma/schema.prisma')"]},{id:"sub-3",nameEn:"Security Linter",nameZh:"安全审计子 Agent",roleEn:"Vulnerability Audit",roleZh:"漏洞审计",model:"claude-3-5-haiku",status:"waiting",duration:"—",tokens:"0",actionEn:"Waiting for schema file generation...",actionZh:"等待数据架构文件生成完成...",logsEn:["queued: will scan for SQL injection & unindexed foreign keys"],logsZh:["已入队: 将扫描 SQL 注入风险与未索引的外键"]}];class ei extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._expandedId="sub-2"}toggleExpand(e){this._expandedId=this._expandedId===e?null:e,this.render()}render(){let e=this.isZh,t=`
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
            ${et.map(t=>{let i=this._expandedId===t.id;return`
                <div class="relative">
                  <div class="absolute -left-3.5 top-4.5 h-px w-3.5 bg-line-strong"></div>

                  <div
                    data-id="${t.id}"
                    class="agent-card rounded-control border transition-all cursor-pointer ${i?"border-line-strong bg-hover/40 shadow-sm":"border-line bg-surface hover:border-line-strong hover:bg-hover/20"}"
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
                          class="text-ink-3 transition-transform ${i?"rotate-180":""}"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    ${i?`
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
    `;this.setHtml(t),this.shadowRoot.querySelectorAll(".agent-card").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.toggleExpand(t)})})}}"u">typeof customElements&&!customElements.get("nai-subagent-tree")&&customElements.define("nai-subagent-tree",ei);let er=[{id:"lead",name:"lead",roleEn:"Coordinator",roleZh:"协调者",provider:"deepseek",model:"reasoner"},{id:"scout",name:"scout",roleEn:"Research",roleZh:"调研",provider:"deepseek",model:"chat"},{id:"forge",name:"forge",roleEn:"Implementer",roleZh:"实现",provider:"anthropic",model:"sonnet"},{id:"audit",name:"audit",roleEn:"Reviewer",roleZh:"评审",provider:"openai",model:"gpt-5"}],en=[{id:"t1",titleEn:"Map provider rate limits",titleZh:"梳理提供方速率限制",assignee:"scout",dependsOn:[],scopes:["docs/limits.md"]},{id:"t2",titleEn:"Implement retry backoff",titleZh:"实现指数退避重试",assignee:"forge",dependsOn:["t1"],scopes:["src/llm/retry.cs"]},{id:"t3",titleEn:"Add backoff unit tests",titleZh:"补退避策略单元测试",assignee:"forge",dependsOn:["t2"],scopes:["tests/retry.cs"]},{id:"t4",titleEn:"Review & sign off",titleZh:"评审并签收",assignee:"audit",dependsOn:["t2","t3"],scopes:[]}],ea={lead:["active","active","active","active","active"],scout:["active","active","active","active","active"],forge:["provisioning","active","active","active","active"],audit:["provisioning","provisioning","active","active","active"]},es=[["in_progress","pending","pending","pending"],["completed","in_progress","pending","pending"],["completed","completed","in_progress","pending"],["completed","completed","completed","in_progress"],["completed","completed","completed","completed"]];class eo extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._tick=0}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=this._tick>=ea.lead.length-1;this.registerTimeout(()=>{this._tick=e?0:this._tick+1,this.render(),this._scheduleNext()},e?4200:2100)}render(){let e=this.isZh,t=this._tick,i=er.filter(e=>"active"===ea[e.id][t]).length,r=es[t].filter(e=>"completed"===e).length,n=`
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
            ${r}/${en.length} ${e?"任务":"tasks"}
          </span>
        </div>

        <!-- Roster -->
        <div class="grid grid-cols-2 gap-1.5">
          ${er.map(i=>{let r=ea[i.id][t],n="lead"===i.id;return`
              <div
                class="member-card flex items-center justify-between gap-2 rounded-control border px-2.5 py-2 transition-colors duration-300 ${n?"border-line-strong bg-inset":"border-line bg-surface"}"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <span
                    class="flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${n?"bg-ink text-canvas":"bg-field text-ink-2"}"
                  >
                    ${i.name.slice(0,2)}
                  </span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1">
                      <span class="truncate font-mono text-[11px] font-medium text-ink">${i.name}</span>
                      <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">${i.model}</span>
                    </div>
                    <span class="block truncate text-[10px] text-ink-3">
                      ${e?i.roleZh:i.roleEn} \xb7 ${i.provider}
                    </span>
                  </div>
                </div>
                ${"active"===r?`
          <span class="flex items-center gap-1 rounded-chip bg-green-tint px-1.5 py-px text-[10px] font-medium text-green">
            <span class="size-1 rounded-full bg-green"></span>
            ${e?"已激活":"active"}
          </span>
        `:"provisioning"===r?`
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
            ${en.map((i,r)=>{let n,a=es[t][r],s=i.dependsOn.some(e=>{let i=en.findIndex(t=>t.id===e);return"completed"!==es[t][i]}),o=(n=i.assignee,er.find(e=>e.id===n)),l=1+es.slice(0,t+1).filter(e=>e[r]!==es[0][r]).length;return`
                <div
                  class="task-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${"in_progress"===a?"border-accent/40 bg-accent-tint/30":"completed"===a?"border-line bg-surface opacity-75":"border-line bg-surface"}"
                  style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"
                >
                  ${"completed"===a?`
          <span class="flex size-4 shrink-0 items-center justify-center rounded-full bg-green-tint text-green">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        `:"in_progress"===a?`
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
                      <span class="truncate text-[11.5px] font-medium ${"completed"===a?"text-ink-2 line-through decoration-line-strong":"text-ink"}">
                        ${e?i.titleZh:i.titleEn}
                      </span>
                      <span class="shrink-0 rounded-chip bg-field px-1 font-mono text-[9px] tabular-nums text-ink-3">
                        r${l}
                      </span>
                    </div>
                    <div class="mt-0.5 flex items-center gap-2 text-[10px] text-ink-3">
                      ${o?`<span class="font-mono">@${o.name}</span>`:""}
                      ${i.dependsOn.length>0?`<span class="font-mono">deps: ${i.dependsOn.join(", ")}</span>`:""}
                      ${i.scopes.map(e=>`
                        <span class="truncate font-mono rounded-chip bg-inset px-1 border border-line/60">
                          ${e}
                        </span>
                      `).join("")}
                      ${s&&"pending"===a?`<span class="text-orange">${e?"被阻塞":"blocked"}</span>`:""}
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-3 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${e?`${i}/4 成员已激活 \xb7 事件溯源名册`:`${i}/4 members active \xb7 event-sourced roster`}
          </span>
          <span class="font-mono">Harness.AgentTeams</span>
        </div>
      </div>
    `;this.setHtml(n)}}"u">typeof customElements&&!customElements.get("nai-agent-teams")&&customElements.define("nai-agent-teams",eo);let el=[600,900,2400,1400,2400,600],ec='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>';class ed extends l{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._tick=0,this._manualOpen={}}get variant(){return this.getAttribute("variant")||"Capsules"}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){!this.autoPlay||this._tick>=el.length-1||this.registerTimeout(()=>{this._tick=this._tick+1,this.render(),this._scheduleNext()},el[this._tick])}toggleRow(e){let t="index"===e&&2===this._tick,i=this._manualOpen[e]??t;this._manualOpen[e]=!i,this.render()}render(){let e=this.isZh,t=this._tick,i="List"===this.variant,r=t<3?"pending":3===t?"failed":"done",n=(e,t)=>{let i=2*Math.PI*11;return`
        <span class="relative inline-flex shrink-0 items-center justify-center" style="width: 24px; height: 24px;">
          <svg
            width="24" height="24" class="absolute inset-0"
            style="${e?"animation: spin 1.1s linear infinite;":""}"
          >
            <circle cx="12" cy="12" r="11" fill="none" stroke="var(--line)" stroke-width="2" />
            ${e?`<circle cx="12" cy="12" r="11" fill="none" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" stroke-dasharray="${.28*i} ${.72*i}" />`:""}
          </svg>
          <span class="relative text-[10.5px] font-semibold tabular-nums text-ink">${t}</span>
        </span>
      `},a=(e,t)=>`
      <span
        class="flex size-5.5 shrink-0 items-center justify-center rounded-full text-white ${"red"===e?"bg-red":"bg-green"}"
        style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;"
      >
        ${t}
      </span>
    `,s=[{key:"verify",badgeHtml:a("green",ec),label:e?"校验供应商资质档案":"Verified vendor records",amount:e?"12 家供应商":"12 suppliers",pillHtml:`
          <span class="inline-flex h-5.5 items-center rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green">
            ${e?"已完成":"Completed"}
          </span>
        `,details:[{label:e?"核对税务与联系人 ID":"Matched tax and contact IDs",meta:"12/12"},{label:e?"标记过期记录":"Flagged stale records",meta:"0"}]},{key:"index",badgeHtml:n(!0,"2"),label:e?"生成自动补货计划清单":"Build reorder task list",amount:e?"7 款 SKU":"7 SKUs",pillHtml:null,details:[{label:e?"读取 POS 导出数据":"Reading POS export",meta:e?"3 个文件":"3 files"},{label:e?"评估缺货断货风险":"Scoring stockout risk",meta:"68%"}]},{key:"draft",badgeHtml:"pending"===r?n(!1,"3"):"failed"===r?a("red",'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>'):a("green",ec),label:e?"起草供应商跟进邮件":"Draft supplier emails",amount:e?"2 封草稿":"2 messages",pillHtml:"failed"===r?`
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-red-tint px-2 text-[11.5px] font-medium text-red" style="animation: fade-in 200ms ease-out both">
            ${e?"失败重试中":"Failed"} <span style="animation: spin 1.2s linear infinite" class="flex"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg></span>
          </span>
        `:"done"===r?`
          <span class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-green-tint px-2 text-[11.5px] font-medium text-green" style="animation: fade-in 200ms ease-out both">
            ${e?"已完成":"Completed"}
          </span>
        `:null,details:[{label:e?"脆筒供应商跟进通知":"Cone supplier follow-up",meta:e?"草稿":"draft"},{label:e?"开心果原料补货备注":"Pistachio reorder note",meta:e?"草稿":"draft"}]}],o=`
      <div
        class="flex w-full max-w-110 flex-col ${i?"gap-0 self-start overflow-hidden rounded-card bg-surface shadow-card":"min-h-[196px] gap-2"}"
      >
        ${s.map((e,r)=>{let n=this._manualOpen[e.key]??("index"===e.key&&2===t);return`
              <div
                class="self-stretch overflow-hidden transition-[border-radius] duration-300 ${i?"border-b border-line last:border-0":"bg-surface shadow-card"}"
                style="border-radius: ${i?0:n?14:22}px; animation: fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${80*r}ms both;"
              >
                <button
                  type="button"
                  aria-expanded="${n}"
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
                ${n?`
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
    `;this.setHtml(o),this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-task-rows")&&customElements.define("nai-task-rows",ed);let ep={think:'<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />',write:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>',run:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>',read:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>'},eh=[{icon:"think",labelEn:"Thinking",labelZh:"深度思考",chipEn:"Planning the churn schedule…",chipZh:"正在规划搅拌排期…",mono:!1,detailMono:!1,detail:[{textEn:"Weekend demand carries pistachio, so it churns first.",textZh:"周末需求以开心果口味为主，优先安排搅拌。"},{textEn:"Batch capacity leaves two evening freezer windows.",textZh:"批次产能还留出两个晚间冷冻空档。"}]},{icon:"write",labelEn:"Write 204 lines",labelZh:"写入 204 行",chipEn:"ChurnSchedule.tsx",mono:!0,detailMono:!0,detail:[{textEn:"+ const windows = slots.filter((s) => s.temp <= -12)",tone:"add"},{textEn:'+ return schedule(windows, { hero: "pistachio" })',tone:"add"}]},{icon:"run",labelEn:"Rebuild and verify",labelZh:"重新构建并验证",chipEn:"npm run freeze",mono:!0,detailMono:!0,detail:[{textEn:"✓ built in 1.2s",textZh:"✓ 构建完成，耗时 1.2s"},{textEn:"✓ 34 checks passed",textZh:"✓ 34 项检查通过"}]},{icon:"read",labelEn:"Read image",labelZh:"读取图片",chipEn:"flavor-chart.png",mono:!0,detailMono:!1,detail:[{textEn:"1280 × 720 · line chart, three summers.",textZh:"1280 × 720 · 折线图，横跨三个夏季。"},{textEn:"Mint chip trends up 12% through July.",textZh:"薄荷巧克力口味到 7 月上涨 12%。"}]}],eu=[{file:"flavors.css",add:13,del:0},{file:"ChurnSchedule.tsx",add:74,del:41},{file:"menu.ts",add:8,del:2}];class eg extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._step=0,this._open=!0,this._openRows=new Set}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._step=eh.length+1;return}this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=eh.length+1;this._step>=e||this.registerTimeout(()=>{this._step=this._step+1,this.render(),this._scheduleNext()},700)}toggleRun(){this._open=!this._open,this.render()}toggleRow(e){this._openRows.has(e)?this._openRows.delete(e):this._openRows.add(e),this.render()}render(){let e=this.isZh,t=this._step,i=this._open,r=eh.length+1,n=`
      <div class="min-h-[220px] w-full max-w-80 pb-1">
        <!-- collapsed run header -->
        <button
          type="button"
          aria-expanded="${i}"
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
            style="transform: ${i?"rotate(0deg)":"rotate(-90deg)"};"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span class="tabular-nums">${e?"4 次工具调用，2 条消息":"4 tool calls, 2 messages"}</span>
        </button>

        <!-- tool call rows -->
        <div
          class="grid transition-[grid-template-rows,opacity] duration-300"
          style="grid-template-rows: ${i?"1fr":"0fr"}; opacity: ${+!!i};"
        >
          <div class="-mx-1 overflow-hidden px-1.5 pb-1">
            <div class="mt-1.5 flex flex-col gap-1">
              ${eh.slice(0,t).map(t=>{let i=this._openRows.has(t.labelEn);return`
                    <div style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
                      <button
                        type="button"
                        aria-expanded="${i}"
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
                            class="transition-opacity duration-100 group-hover/row:opacity-0 ${i?"opacity-0":""}"
                          >
                            ${ep[t.icon]}
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
                            class="absolute transition-[opacity,transform] duration-150 group-hover/row:opacity-100 ${i?"opacity-100":"opacity-0"}"
                            style="transform: ${i?"rotate(0deg)":"rotate(-90deg)"};"
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
                        style="grid-template-rows: ${i?"1fr":"0fr"}; opacity: ${+!!i}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                      >
                        <div class="min-h-0 overflow-hidden">
                          <div class="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-line py-0.5 pl-3.5">
                            ${t.detail.map(i=>`
                              <span
                                class="truncate text-[11.5px] leading-[1.6] ${t.detailMono?"font-mono":""} ${"add"===i.tone?"text-green":"text-ink-2"}"
                              >
                                ${e?i.textZh??i.textEn:i.textEn}
                              </span>
                            `).join("")}
                          </div>
                        </div>
                      </div>
                    </div>
                  `}).join("")}
            </div>

            <!-- file-diff chips -->
            ${t>=r?`
              <div class="mt-2.5 flex max-w-full flex-wrap gap-1.5 border-t border-line pt-2.5">
                ${eu.map((e,t)=>`
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
                  style="animation: fade-in 300ms ease-out ${80*eu.length}ms both;"
                >
                  ${e?"+ 还有 2 项":"+2 more"}
                </button>
              </div>
            `:""}
          </div>
        </div>
      </div>
    `;this.setHtml(n),this.shadowRoot.querySelector(".header-btn")?.addEventListener("click",()=>this.toggleRun()),this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-label");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-tool-chips")&&customElements.define("nai-tool-chips",eg);let em=[{id:"soft",titleEn:"Soft Token Migration",titleZh:"平滑双轨迁移 (推荐)",descEn:"Maintain backward compatibility for v1 JWTs until expiration (7 days).",descZh:"在旧版 JWT 过期（7天）前保持向后兼容，用户无感知过渡。",recommended:!0,tagEn:"Recommended",tagZh:"推荐"},{id:"dual",titleEn:"Dual-Format Verification",titleZh:"双签名格式校验",descEn:"Verify both RSA256 and EdDSA key signatures concurrently at the gateway.",descZh:"在 API 网关同时验证 RSA256 与 EdDSA 密钥签名，保障零停机。",tagEn:"Zero Downtime",tagZh:"零停机"},{id:"revoke",titleEn:"Immediate Session Revocation",titleZh:"立即重置所有会话",descEn:"Flush Redis token store and force all active users to re-authenticate.",descZh:"立即清空 Redis 缓存并强制所有在线用户重新登录认证。",tagEn:"High Security",tagZh:"最高安全性"}];class eb extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedId="soft",this._customText="",this._isSubmitted=!1}selectOption(e){this._selectedId=e,this.render()}submit(){this._isSubmitted=!0,this.render()}reset(){this._isSubmitted=!1,this._selectedId="soft",this._customText="",this.render()}render(){let e=this.isZh,t=this._isSubmitted,i=this._selectedId,r=this._customText,n="";if("custom"===i)n=r||(e?"自定义指令":"Custom Instruction");else{let t=em.find(e=>e.id===i);n=t?e?t.titleZh:t.titleEn:""}let a=`
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
              ${n}
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
            ${em.map(t=>{let r=i===t.id;return`
                <label
                  data-id="${t.id}"
                  class="option-label option-item flex items-start gap-3 rounded-control border p-3 transition-all cursor-pointer ${r?"border-accent bg-accent-tint/30 shadow-sm":"border-line bg-surface hover:border-line-strong hover:bg-hover/40"}"
                >
                  <input
                    type="radio"
                    name="clarification-choice"
                    ${r?"checked":""}
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
              value="${r}"
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
    `;if(this.setHtml(a),t)this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click",()=>this.reset());else{this.shadowRoot.querySelectorAll(".option-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.selectOption(t)})});let e=this.shadowRoot.querySelector(".custom-input");e?.addEventListener("input",e=>{this._customText=e.target.value,e.target.value&&(this._selectedId="custom")}),this.shadowRoot.querySelector("#skip-btn")?.addEventListener("click",()=>{this._selectedId="soft",this.submit()}),this.shadowRoot.querySelector("#submit-btn")?.addEventListener("click",()=>{this.submit()})}}}"u">typeof customElements&&!customElements.get("nai-clarification-card")&&customElements.define("nai-clarification-card",eb);let ex=[{model:"GPT-5.2",time:"10:41",answerEn:"Start with retrieval failures: 38% of missed answers share the same stale index.",answerZh:"先排查检索失败：38% 的漏答都指向同一个过期索引。"},{model:"Claude Sonnet 4.6",time:"10:42",answerEn:"The strongest signal is latency. Re-index before changing prompts.",answerZh:"最强信号是延迟。先重建索引，再考虑调整提示词。"},{model:"Gemini 3.1 Pro",time:"10:43",answerEn:"Compare a fresh-index cohort while keeping the prompt unchanged.",answerZh:"对比新索引样本，并保持提示词不变。"}];class ev extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._branchIndex=1,this._continuingFrom=null}navigate(e){e<0||e>=ex.length||(this._branchIndex=e,this._continuingFrom=null,this.render())}continueFromCurrent(){this._continuingFrom=this._branchIndex,this.render()}render(){let e=this.isZh,t=this._branchIndex,i=ex[t],r=this._continuingFrom,n=`
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
            ${t+1} / ${ex.length}
          </span>
        </header>

        <div class="px-4 py-4">
          <div class="flex items-center gap-2 text-[10.5px] text-ink-3">
            <span class="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true"></span>
            <span class="font-medium text-ink-2">
              ${i.model} \xb7 ${i.time}
            </span>
          </div>

          <p
            aria-live="polite"
            class="mt-3 min-h-16 text-[13px] leading-6 text-ink"
          >
            ${e?i.answerZh:i.answerEn}
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
                ${t===ex.length-1?"disabled":""}
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
            ${null===r?"":e?`正从分支 ${r+1} 继续`:`Continuing from branch ${r+1}`}
          </p>
        </div>
      </section>
    `;this.setHtml(n),this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click",()=>this.navigate(this._branchIndex-1)),this.shadowRoot.querySelector("#btn-next")?.addEventListener("click",()=>this.navigate(this._branchIndex+1)),this.shadowRoot.querySelector("#btn-continue")?.addEventListener("click",()=>this.continueFromCurrent())}}"u">typeof customElements&&!customElements.get("nai-message-branches")&&customElements.define("nai-message-branches",ev);let ef=[{id:"system",labelEn:"System & Directives",labelZh:"系统指令与安全约束",tokens:4200,color:"var(--accent)",badgeColor:"bg-accent-tint text-accent-ink",descEn:"Base system instructions, developer constraints, and safety guidelines.",descZh:"基础系统提示词、开发者约束与安全合规守则。"},{id:"rag",labelEn:"RAG & Retrieved Docs",labelZh:"RAG 检索增强知识",tokens:28400,color:"var(--green)",badgeColor:"bg-green-tint text-green",descEn:"12 code chunks and 3 architectural design docs injected via semantic search.",descZh:"语义搜索注入的 12 个代码切片与 3 份架构设计文档。"},{id:"history",labelEn:"Conversation History",labelZh:"会话上下文历史",tokens:16850,color:"var(--orange)",badgeColor:"bg-orange-tint text-orange",descEn:"14 previous conversation turns including user prompts and code diffs.",descZh:"前 14 轮对话交互，包含用户指令与代码差异记录。"},{id:"tools",labelEn:"Tool Outputs & Traces",labelZh:"工具调用输出与追踪",tokens:9350,color:"var(--ink-2)",badgeColor:"bg-hover-2 text-ink-2",descEn:"Terminal stdout, ripgrep search results, and linter diagnostics.",descZh:"终端标准输出、ripgrep 搜索结果与 linter 诊断信息。"}];class ew extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._segments=JSON.parse(JSON.stringify(ef)),this._activeSegmentId=null,this._isPruned=!1}handlePruneHistory(){this._isPruned?(this._segments=JSON.parse(JSON.stringify(ef)),this._isPruned=!1):(this._segments=this._segments.map(e=>"history"===e.id?{...e,tokens:Math.round(.45*e.tokens)}:"tools"===e.id?{...e,tokens:Math.round(.3*e.tokens)}:e),this._isPruned=!0),this.render()}setActiveSegment(e){this._activeSegmentId=e,this.render()}render(){let e=this.isZh,t=this._segments,i=this._activeSegmentId,r=this._isPruned,n=t.reduce((e,t)=>e+t.tokens,0),a=(n/128e3*100).toFixed(1),s=(n/1e6*3).toFixed(4),o=`
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
              $${s} ${e?"预估成本":"est."}
            </span>
            <button
              type="button"
              id="btn-prune"
              class="flex items-center gap-1 rounded-control border border-line bg-field px-2 py-1 text-[11.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              ${r?e?"恢复完整上下文":"Restore Context":e?"精简历史":"Prune History"}
            </button>
          </div>
        </div>

        <!-- Progress Metric Bar -->
        <div class="mt-1">
          <div class="flex items-baseline justify-between text-[11.5px]">
            <span class="font-mono tabular-nums text-ink">
              ${n.toLocaleString()}{" "}
              <span class="text-ink-3">/ ${128e3.toLocaleString()} tokens</span>
            </span>
            <span class="font-mono font-medium tabular-nums text-ink-2">
              ${a}% ${e?"已占用":"capacity"}
            </span>
          </div>

          <!-- Segmented Bar -->
          <div class="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-field p-0.5">
            ${t.map(e=>{let t=e.tokens/128e3*100,r=i===e.id;return`
                  <div
                    data-id="${e.id}"
                    class="segment-bar h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 cursor-pointer"
                    style="
                      width: ${t}%;
                      background-color: ${e.color};
                      opacity: ${i&&!r?.45:1};
                      transform: ${r?"scaleY(1.2)":"scaleY(1)"};
                    "
                  ></div>
                `}).join("")}
          </div>
        </div>

        <!-- Segment Breakdown Rows -->
        <div class="mt-4 flex flex-col divide-y divide-line/60">
          ${t.map(t=>{let r=i===t.id,a=(t.tokens/n*100).toFixed(0);return`
                <div
                  data-id="${t.id}"
                  class="segment-row flex items-center justify-between py-2.5 px-2 -mx-2 rounded-control transition-colors cursor-pointer ${r?"bg-hover":"hover:bg-hover/60"}"
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
                          ${a}%
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
    `;this.setHtml(o),this.shadowRoot.querySelector("#btn-prune")?.addEventListener("click",()=>this.handlePruneHistory()),this.shadowRoot.querySelectorAll(".segment-bar, .segment-row").forEach(e=>{e.addEventListener("mouseenter",()=>{let t=e.getAttribute("data-id");t&&this.setActiveSegment(t)}),e.addEventListener("mouseleave",()=>{this.setActiveSegment(null)})})}}"u">typeof customElements&&!customElements.get("nai-context-window")&&customElements.define("nai-context-window",ew);let ek=[{id:"mem-1",category:"preference",textEn:"Prefers functional React 19 components with Tailwind v4 and CSS variables.",textZh:"偏好使用 React 19 函数式组件、Tailwind v4 及原生 CSS 变量设计系统。",confidence:98,updatedAtEn:"2h ago",updatedAtZh:"2小时前",pinned:!0},{id:"mem-2",category:"rule",textEn:"Never print raw database connection strings or JWT secret keys to logs.",textZh:"严禁在控制台或日志中打印未经脱敏的数据库连接串或 JWT 密钥。",confidence:99,updatedAtEn:"Yesterday",updatedAtZh:"昨天",pinned:!0},{id:"mem-3",category:"preference",textEn:"Favors hairline elevation borders (1px) over saturated drop shadows.",textZh:"倾向使用 1px 发丝边框质感替代浓重饱和的投影阴影（Kumo 极简风）。",confidence:94,updatedAtEn:"3d ago",updatedAtZh:"3天前"},{id:"mem-4",category:"fact",textEn:"Project uses Turborepo monorepo structure with apps/web and packages/ui.",textZh:"项目采用 Turborepo Monorepo 架构，核心源码位于 apps/web 与 packages/ui。",confidence:88,updatedAtEn:"5d ago",updatedAtZh:"5天前"}];class ey extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._memories=JSON.parse(JSON.stringify(ek)),this._filter="all",this._query=""}setFilter(e){this._filter=e,this.render()}setQuery(e){this._query=e,this.render()}handleDelete(e){this._memories=this._memories.filter(t=>t.id!==e),this.render()}handleTogglePin(e){this._memories=this._memories.map(t=>t.id===e?{...t,pinned:!t.pinned}:t),this.render()}handleAddFact(){this._memories=[{id:`mem-${Date.now()}`,category:"preference",textEn:"Always provide TypeScript types for tool parameters.",textZh:"始终为 Tool 参数提供完整的 TypeScript 类型注解与 Zod 校验。",confidence:100,updatedAtEn:"Just now",updatedAtZh:"刚刚"},...this._memories],this.render()}render(){let e=this.isZh,t=this._filter,i=this._query,r=this._memories,n=r.filter(r=>{if("all"!==t&&r.category!==t)return!1;let n=e?r.textZh:r.textEn;return!i||!!n.toLowerCase().includes(i.toLowerCase())}),a=`
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
            ${r.length} ${e?"条已存记忆":1===r.length?"stored fact":"stored facts"}
          </span>
        </div>

        <!-- Filter Tabs & Search -->
        <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div class="flex rounded-control bg-field p-0.5 text-[11px]">
            ${["all","preference","rule","fact"].map(i=>`
              <button
                type="button"
                data-tab="${i}"
                class="tab-btn rounded-chip px-2 py-0.5 font-medium capitalize transition-colors cursor-pointer ${t===i?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
              >
                ${"all"===i?e?"全部":"All":"preference"===i?e?"偏好":"Prefs":"rule"===i?e?"规范":"Rules":e?"事实":"Facts"}
              </button>
            `).join("")}
          </div>

          <div class="relative">
            <input
              type="text"
              placeholder="${e?"搜索记忆...":"Search memory..."}"
              value="${i}"
              class="search-input w-36 rounded-control border border-line bg-field px-2 py-1 text-[11px] text-ink placeholder:text-ink-3 focus:border-accent focus:bg-surface focus:outline-none transition-colors"
            />
          </div>
        </div>

        <!-- Memory Cards List -->
        <div class="mt-3 flex flex-col gap-2">
          ${0===n.length?`
            <div class="rounded-control border border-dashed border-line p-6 text-center text-[12px] text-ink-3">
              ${e?"当前筛选条件下无记忆项。":"No memories match the current filter."}
            </div>
          `:n.map(t=>`
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
    `;this.setHtml(a),this.shadowRoot.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");t&&this.setFilter(t)})});let s=this.shadowRoot.querySelector(".search-input");s?.addEventListener("input",e=>{this.setQuery(e.target.value)}),this.shadowRoot.querySelectorAll(".btn-pin").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleTogglePin(t)})}),this.shadowRoot.querySelectorAll(".btn-delete").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleDelete(t)})}),this.shadowRoot.querySelector("#btn-add-fact")?.addEventListener("click",()=>{this.handleAddFact()})}}"u">typeof customElements&&!customElements.get("nai-memory-inspector")&&customElements.define("nai-memory-inspector",ey);class e_ extends l{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._chipsShown=!1}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._chipsShown=!0;return}this.registerTimeout(()=>{this._chipsShown=!0,this.render()},700)}render(){let e=this.isZh,t=this._chipsShown,i=`
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

        ${[{title:e?"供应商准入规范":"Vendor onboarding rule",chars:e?"290 字符":"290 characters",body:e?"在将新乳制品供应商纳入自动补货工作流之前，必须首先验证其冷链资质认证与卫生许可。":"Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",source:"Dairy Onboarding SOP.pdf",badge:"PDF",tone:"bg-red"},{title:e?"季节性需求走势":"Seasonal demand row",chars:e?"1,250 字符":"1,250 characters",body:e?"第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。":"Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",source:"Sales Velocity Export.csv",badge:"CSV",tone:"bg-green"}].map((e,i)=>`
          <div
            class="card overflow-hidden rounded-card bg-surface shadow-card"
            style="animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${100*i}ms both;"
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
                  transition-delay: ${80*i}ms;
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
    `;this.setHtml(i)}}"u">typeof customElements&&!customElements.get("nai-context-cards")&&customElements.define("nai-context-cards",e_);let e$=[{id:"spill-1",sourceTool:"fs.search_ripgrep",originalTokens:48500,compactedTokens:820,diskPath:"spill/ripgrep_ast_results.json",sizeBytes:"1.4 MB",spilledAtEn:"4m ago",spilledAtZh:"4分钟前"},{id:"spill-2",sourceTool:"shell.git_diff_full",originalTokens:86200,compactedTokens:1450,diskPath:"spill/git_diff_refactor_v2.patch",sizeBytes:"2.8 MB",spilledAtEn:"12m ago",spilledAtZh:"12分钟前"}];class eE extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._hydratedId=null}handleHydrate(e){this._hydratedId=this._hydratedId===e?null:e,this.render()}render(){let e=this.isZh,t=this._hydratedId,i=e$.reduce((e,t)=>e+(t.originalTokens-t.compactedTokens),0),r=`
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
            <span>↓ ${i.toLocaleString()} ${e?"token 已节省":"tok saved"}</span>
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
          ${e$.map(i=>{let r=t===i.id;return`
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
                          ${i.diskPath}
                        </span>
                        <span class="rounded-chip border border-line bg-inset px-1 font-mono text-[9px] text-ink-3">
                          ${i.sizeBytes}
                        </span>
                      </div>
                      <span class="text-[10.5px] text-ink-3">
                        ${e?"源自":"From"} ${i.sourceTool} • ${e?i.spilledAtZh:i.spilledAtEn}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    data-id="${i.id}"
                    class="btn-hydrate rounded-control border border-line bg-field px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer shrink-0"
                  >
                    ${r?e?"收起原文":"Hide Raw":e?"按需水合":"Hydrate"}
                  </button>
                </div>

                ${r?`
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
    `;this.setHtml(r),this.shadowRoot.querySelectorAll(".btn-hydrate").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleHydrate(t)})})}}"u">typeof customElements&&!customElements.get("nai-context-spillover")&&customElements.define("nai-context-spillover",eE);let eS=[{type:"turn/start",depth:0,tone:"accent",opens:"turn",summaryEn:"Turn 3 begins",summaryZh:"第 3 轮开始",meta:"user prompt"},{type:"request/header",depth:1,tone:"dim",summaryEn:"deepseek-reasoner · 128k",summaryZh:"deepseek-reasoner · 128k",meta:"41,208 tok"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 1",summaryZh:"步骤 1"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Let me check the job registry…",summaryZh:"先检查作业注册表…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.list",summaryZh:"job.list",meta:"call_9f2a"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"3 running · 1 killed",summaryZh:"3 个运行中 · 1 个已终止",meta:"82ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 1 closed",summaryZh:"步骤 1 闭合",meta:"1.2s"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 2",summaryZh:"步骤 2"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Restarting the telemetry export…",summaryZh:"正在重启遥测导出任务…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.start",summaryZh:"job.start",meta:"call_b771"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"job-4f8c · Running",summaryZh:"job-4f8c · 运行中",meta:"134ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 2 closed",summaryZh:"步骤 2 闭合",meta:"0.9s"},{type:"assistant/message",depth:1,tone:"green",summaryEn:"Done — the export job is back up.",summaryZh:"完成 — 导出任务已恢复。"},{type:"turn/end",depth:0,tone:"accent",closes:"turn",summaryEn:"Turn 3 · completed",summaryZh:"第 3 轮 · 已完成",meta:"2 steps · 2 calls"}],eC={accent:"bg-accent",green:"bg-green",orange:"bg-orange",muted:"bg-ink-3",dim:"bg-line-strong"},eM={accent:"bg-accent-tint text-accent-ink",green:"bg-green-tint text-green",orange:"bg-orange-tint text-orange",muted:"bg-hover-2/60 text-ink-2",dim:"bg-field text-ink-3"};class eA extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._visible=0}onMount(){this._visible=0,this._scheduleNext()}onUnmount(){this._visible=0}_scheduleNext(){if(this._visible<eS.length){let e=0===this._visible?500:620;this.registerTimeout(()=>{this._visible++,this.render(),this._scheduleNext()},e)}else this.registerTimeout(()=>{this._visible=0,this.render(),this._scheduleNext()},3600)}render(){let e=this.isZh,t=this._visible>=eS.length,i=eS.slice(0,this._visible),r=!1,n=!1,a=i.map(e=>{"turn"===e.opens&&(r=!0),"step"===e.opens&&(n=!0);let t={turn:r,step:n};return"step"===e.closes&&(n=!1),"turn"===e.closes&&(r=!1,n=!1),t}),s=`
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
            ${Math.min(this._visible,eS.length)}/${eS.length} events
          </span>
        </div>

        
        <div class="timeline relative flex min-h-[304px] flex-col gap-[3px] rounded-control border border-line bg-inset/50 p-3">
          ${i.map((r,n)=>{let s=a[n],o=n===i.length-1;return`
                <div
                  class="relative flex items-center gap-2.5 rounded-chip px-1.5 py-[5px]"
                  style="padding-left: ${6+22*r.depth}px; animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both; ${o&&!t?"background: var(--hover);":""}"
                >
                  ${s.turn?'<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-accent/35" style="left: 12px;"></span>':""}
                  ${r.depth>=1&&s.step?'<span aria-hidden="true" class="absolute top-0 bottom-0 w-px bg-line-strong" style="left: 34px;"></span>':""}
                  ${r.closes?`<span aria-hidden="true" class="absolute size-[7px] rounded-full border-[1.5px] ${"turn"===r.closes?"border-accent bg-accent-tint":"border-line-strong bg-surface"}" style="left: ${12+22*("turn"!==r.closes)-3}px;"></span>`:""}

                  <span class="size-1.5 shrink-0 rounded-full ${eC[r.tone]}"></span>
                  <code class="shrink-0 rounded-chip px-1.5 py-px font-mono text-[10px] ${eM[r.tone]}">
                    ${r.type}
                  </code>
                  <span class="min-w-0 flex-1 truncate text-[11.5px] text-ink-2">
                    ${e?r.summaryZh:r.summaryEn}
                  </span>
                  ${r.meta?`<span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">${r.meta}</span>`:""}
                </div>
              `}).join("")}

          ${!t?`
            <div
              class="flex items-center gap-2 px-1.5 py-1"
              style="padding-left: ${6+Math.min((eS[this._visible]?.depth??0)*22+22,66)}px;"
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
    `,s)}}"u">typeof customElements&&!customElements.get("nai-turn-lifecycle")&&customElements.define("nai-turn-lifecycle",eA);let ez={id:"m1",kind:"followup",textEn:"also verify the rollout gate",textZh:"顺便验证一下灰度发布门禁"},eT={id:"m2",kind:"steer",textEn:"use the staging endpoint",textZh:"改用 staging 环境的端点"},ej={id:"m3",kind:"inject",textEn:"fyi: trace dump at /tmp/trace.log",textZh:"备注：trace 已转储到 /tmp/trace.log"},eR=[900,1500,1500,1500,1700,2100,4600];class eL extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=eR[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%eR.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,i=t>=1&&t<5?[ez]:[],r=2===t?[eT]:3===t?[eT,ej]:[],n=5===t,a=`
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
              class="flex size-2 rounded-full transition-colors duration-300 ${n?"bg-ink-3":"bg-accent animate-pulse"}"
            ></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"双队列收件箱":"Agent Inbox"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              ${n?e?"空闲":"idle":e?"运行中":"running"}
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
              ${0===i.length?`<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${e?"空":"empty"}</span>`:i.map(t=>`
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
              ${0===r.length?`<span class="flex flex-1 items-center justify-center rounded-chip border border-dashed border-line text-[10px] text-ink-3">${e?"空":"empty"}</span>`:r.map(t=>`
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
          ${[{name:"Send",descEn:"owns send",descZh:"独占发送",style:"border-line bg-field text-ink-2"},{name:"Followup",descEn:"→ turn+wake",descZh:"→ 下轮+唤醒",style:"border-accent/40 bg-accent-tint/40 text-accent-ink"},{name:"Steer",descEn:"→ step+wake",descZh:"→ 边界+唤醒",style:"border-orange/40 bg-orange-tint/40 text-orange"},{name:"Inject",descEn:"→ step, silent",descZh:"→ 边界,静默",style:"border-dashed border-line-strong bg-surface text-ink-3"}].map((i,r)=>`
              <div
                class="method-card flex flex-col items-center gap-0.5 rounded-chip border px-1 py-1.5 transition-all duration-300 ${i.style} ${1===r&&1===t||2===r&&2===t||3===r&&3===t?"ring-2 ring-accent/40 scale-105":""}"
                ${"Inject"===i.name?'style="border-style: dashed;"':""}
              >
                <span class="font-mono text-[10px] font-semibold">${i.name}</span>
                <span class="text-[8.5px] opacity-80">${e?i.descZh:i.descEn}</span>
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
    `,a)}}"u">typeof customElements&&!customElements.get("nai-agent-inbox")&&customElements.define("nai-agent-inbox",eL);let eZ=[{name:"secret-scrub",matcher:"*",decision:"allow",latencyMs:4},{name:"workspace-guard",matcher:"fs.*",decision:"ask",reasonEn:"writes outside declared scopes",reasonZh:"写入超出声明的 write scopes",latencyMs:11},{name:"rate-limiter",matcher:"*",decision:"allow",latencyMs:2}],eq={deny:0,ask:1,block:2,allow:3},eH={allow:{chip:"bg-green-tint text-green",dot:"bg-green",labelEn:"allow",labelZh:"允许"},ask:{chip:"bg-orange-tint text-orange",dot:"bg-orange",labelEn:"ask",labelZh:"询问"},deny:{chip:"bg-red-tint text-red",dot:"bg-red",labelEn:"deny",labelZh:"拒绝"},block:{chip:"bg-accent-tint text-accent-ink",dot:"bg-accent",labelEn:"block",labelZh:"阻断"}},eB=["SessionStart","UserPrompt","ToolPre","ToolPost","Stop","Subagent"],eI=[700,750,750,750,1400,1400,3800];class eP extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=eI[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%eI.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,i=Math.max(0,Math.min(t,eZ.length)),r=t>=4?t>=5?"allow":eZ.map(e=>e.decision).sort((e,t)=>eq[e]-eq[t])[0]??"allow":null,n=`
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
          ${eB.map(e=>`
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
          ${eZ.map((t,r)=>{let n=r<i,a=eH[t.decision];return`
              <div
                class="hook-item flex items-center gap-2.5 rounded-control border px-2.5 py-2 transition-all duration-300 ${n?"border-line bg-surface":"border-line/60 bg-inset/40 opacity-45"}"
                ${n?'style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;"':""}
              >
                
                <span class="flex size-1.5 shrink-0 rounded-full ${n?a.dot:"bg-line-strong"}"></span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-1.5">
                    <code class="font-mono text-[11px] font-medium text-ink">${t.name}</code>
                    <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                      ${t.matcher}
                    </span>
                  </div>
                  ${n&&t.reasonEn?`
                    <span class="mt-0.5 block truncate text-[10.5px] text-ink-3">
                      ${e?t.reasonZh:t.reasonEn}
                    </span>
                  `:""}
                </div>
                ${n?`
                  <span class="shrink-0 rounded-chip px-1.5 py-0.5 font-mono text-[10px] font-medium ${a.chip}">
                    ${e?a.labelZh:a.labelEn}
                  </span>
                `:`
                  <span class="shrink-0 font-mono text-[9.5px] text-ink-3">…</span>
                `}
                <span class="w-8 shrink-0 text-right font-mono text-[9.5px] tabular-nums text-ink-3">
                  ${n?`${t.latencyMs}ms`:""}
                </span>
              </div>
            `}).join("")}
        </div>

        
        <div
          class="merge-bar mt-1 flex items-center justify-between gap-2 rounded-control border px-3 py-2.5 transition-all duration-500 ${"allow"===r?"border-green/40 bg-green-tint/50":"ask"===r?"border-orange/40 bg-orange-tint/50":"border-line bg-inset/50"}"
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
          ${r?`
            <span
              class="shrink-0 whitespace-nowrap rounded-chip px-2 py-0.5 font-mono text-[10.5px] font-semibold ${eH[r].chip}"
              style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
            >
              ${"allow"===r&&t>=5?e?"allow · 已批准":"allow · approved":e?eH[r].labelZh:eH[r].labelEn}
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
    `,n)}}"u">typeof customElements&&!customElements.get("nai-hook-pipeline")&&customElements.define("nai-hook-pipeline",eP);let eN=[{turns:{completed:6,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:14,toolCalls:19,tokensIn:41208,tokensOut:6893,llmMs:21400,spark:[8,12,18,24,31,41]},{turns:{completed:7,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:17,toolCalls:23,tokensIn:50872,tokensOut:8104,llmMs:25800,spark:[8,12,18,24,31,41,51]},{turns:{completed:8,blocked:1,aborted:1,error:0,maxTokens:0,open:1},steps:20,toolCalls:27,tokensIn:59930,tokensOut:9761,llmMs:30100,spark:[8,12,18,24,31,41,51,60]},{turns:{completed:9,blocked:1,aborted:1,error:0,maxTokens:1,open:0},steps:24,toolCalls:31,tokensIn:71455,tokensOut:11290,llmMs:36900,spark:[8,12,18,24,31,41,51,60,71]}];function eO(e){return e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}class eF extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._frame=0}onMount(){this._frame=0,this._scheduleFrame()}onUnmount(){this._frame=0}_scheduleFrame(){this._frame<eN.length-1?this.registerTimeout(()=>{this._frame++,this.render(),this._scheduleFrame()},2400):this.registerTimeout(()=>{this._frame=0,this.render(),this._scheduleFrame()},4600)}render(){let e=this.isZh,t=eN[this._frame],i=t.turns.completed+t.turns.blocked+t.turns.aborted+t.turns.error+t.turns.maxTokens+t.turns.open,r=Math.max(...eN[eN.length-1].spark),n=[{key:"completed",labelEn:"completed",labelZh:"完成",value:t.turns.completed,color:"var(--green)"},{key:"blocked",labelEn:"blocked",labelZh:"阻塞",value:t.turns.blocked,color:"var(--orange)"},{key:"aborted",labelEn:"aborted",labelZh:"中止",value:t.turns.aborted,color:"var(--ink-3)"},{key:"error",labelEn:"error",labelZh:"错误",value:t.turns.error,color:"var(--red)"},{key:"maxTokens",labelEn:"max-tokens",labelZh:"达到上限",value:t.turns.maxTokens,color:"#b585e0"},{key:"open",labelEn:"open",labelZh:"进行中",value:t.turns.open,color:"var(--accent)"}],a=[{labelEn:"Turns",labelZh:"轮次",value:String(i)},{labelEn:"Steps",labelZh:"步骤",value:String(t.steps)},{labelEn:"Tool calls",labelZh:"工具调用",value:String(t.toolCalls)},{labelEn:"Tokens in",labelZh:"输入 tokens",value:eO(t.tokensIn)},{labelEn:"Tokens out",labelZh:"输出 tokens",value:eO(t.tokensOut)},{labelEn:"LLM time",labelZh:"LLM 耗时",value:`${(Math.round(t.llmMs/100)/10).toFixed(1)}s`}],s=`
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
          ${a.map(t=>`
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
            ${n.map(e=>e.value>0?`
                <span
                  class="h-full transition-all duration-700"
                  style="width: ${e.value/i*100}%; background: ${e.color};"
                  title="${e.key}: ${e.value}"
                ></span>
              `:"").join("")}
          </div>
          <div class="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
            ${n.map(t=>`
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
            ${eN[eN.length-1].spark.map((e,i)=>{let n=t.spark[i];return`
                <span
                  class="flex-1 rounded-t-[3px] transition-all duration-700 ${void 0===n?"bg-field":i===t.spark.length-1?"bg-accent":"bg-accent/35"}"
                  style="height: ${void 0===n?"8%":`${Math.max(8,n/r*100)}%`};"
                ></span>
              `}).join("")}
          </div>
        </div>

        
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>${e?"投影 = durable 事实的纯折叠":"Projection = pure fold of durable facts"}</span>
          <span class="font-mono">Harness.Session.Stats</span>
        </div>
      </div>
    `,s)}}"u">typeof customElements&&!customElements.get("nai-session-telemetry")&&customElements.define("nai-session-telemetry",eF);let eV=["w-01","w-02","w-03","w-04"];class eD extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._done=0}onMount(){this._done=0,this._scheduleTick()}onUnmount(){this._done=0}_scheduleTick(){this._done<40?this.registerTimeout(()=>{this._done=Math.min(40,this._done+4),this.render(),this._scheduleTick()},420):this.registerTimeout(()=>{this._done=0,this.render(),this._scheduleTick()},4200)}render(){let e=this.isZh,t=this._done,i=t<40,r=i?Math.min(4,40-t):0,n=Math.round(t/40*100),a=`
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
            <span class="flex size-2 rounded-full ${i?"bg-accent animate-pulse":"bg-green"}"></span>
            <h3 class="text-[13px] font-semibold text-ink">
              ${e?"工作流扇出执行":"Workflow Fan-out"}
            </h3>
            <span class="rounded-chip border border-line bg-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
              run/8f2e1a
            </span>
          </div>
          <span class="font-mono text-[10.5px] tabular-nums text-ink-3">${n}%</span>
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
          ${eV.map((n,a)=>{let s=a<r;return`
              <div
                class="slot-row flex items-center gap-2.5 rounded-control border px-2.5 py-1.5 transition-all duration-300 ${s?"border-accent/40 bg-accent-tint/25":"border-line bg-surface"}"
              >
                <span
                  class="flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[8.5px] font-semibold ${s?"bg-accent text-white":"bg-field text-ink-3"}"
                >
                  ${n.slice(-2)}
                </span>
                <span class="font-mono text-[10.5px] text-ink-2">${n}</span>
                <div class="min-w-0 flex-1">
                  ${s?`
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
                  ${s?`item-${String(t+a+1).padStart(2,"0")}`:i?e?"空闲":"idle":e?"完成":"done"}
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
            ${Array.from({length:40},(e,n)=>`
                <span
                  class="item-tile aspect-square w-full rounded-[4px] transition-all duration-300 ${n<t?"bg-green/80":i&&n>=t&&n<t+r?"bg-accent animate-pulse":"bg-field border border-line/60"}"
                  title="item-${n+1}"
                ></span>
              `).join("")}
          </div>
        </div>

        
        <div class="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-ink-3">
          <span>
            ${i?e?`${r} 个成员并发处理中`:`${r} members in flight`:e?"全部条目处理完成":"All items processed"}
          </span>
          <span class="font-mono">Harness.Workflow</span>
        </div>
      </div>
    `,a)}}"u">typeof customElements&&!customElements.get("nai-workflow-run")&&customElements.define("nai-workflow-run",eD);let eW=[{id:"before",titleEn:"Before edits",titleZh:"编辑前",time:"10:31",files:["app/page.tsx","components/chat.tsx"],summaryEn:"Clean baseline before the agent changed the chat flow.",summaryZh:"智能体修改聊天流程前的干净基线。"},{id:"edited",titleEn:"Implementation",titleZh:"实现完成",time:"10:38",files:["app/page.tsx","components/chat.tsx","tests/chat.test.tsx"],summaryEn:"Streaming behavior updated and regression coverage added.",summaryZh:"已更新流式交互，并新增回归测试。"},{id:"verified",titleEn:"Verified",titleZh:"验证通过",time:"10:42",files:["tests/chat.test.tsx"],summaryEn:"Checks passed; this is the current execution state.",summaryZh:"检查已通过；这是当前执行状态。"}];class eU extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=1,this._current=2,this._confirming=!1,this._announcement=""}selectCheckpoint(e){this._selected=e,this._confirming=!1,this.render()}confirmRestore(){this._current=this._selected,this._confirming=!1;let e=eW[this._selected],t=this.isZh?e.titleZh:e.titleEn;this._announcement=this.isZh?`已恢复“${t}”`:`Restored “${t}”`,this.render()}render(){let e=this.isZh,t=eW[this._selected],i=e?t.titleZh:t.titleEn,r=this._selected===this._current,n=`
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
            ${eW.map((t,i)=>{let r=e?t.titleZh:t.titleEn,n=i===this._current,a=i===this._selected;return`
                <li class="relative pb-2 last:pb-0">
                  ${i<eW.length-1?`<span
                          aria-hidden="true"
                          class="absolute top-7 bottom-0 left-[0.68rem] w-px bg-line-strong"
                        ></span>`:""}
                  <button
                    type="button"
                    data-idx="${i}"
                    aria-label="${e?"选择检查点":"Select checkpoint"} ${r}"
                    aria-pressed="${a}"
                    ${n?'aria-current="step"':""}
                    class="nav-btn relative flex w-full items-start gap-2.5 rounded-control px-2 py-2 text-left transition-colors motion-reduce:transition-none ${a?n?"bg-green-tint":"bg-accent-tint":"hover:bg-hover"}"
                  >
                    <span
                      aria-hidden="true"
                      class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${n?"border-green bg-green":a?"border-accent bg-accent":"border-line-strong bg-surface"}"
                    ></span>
                    <span class="min-w-0">
                      <span class="block text-[11.5px] font-medium text-ink">
                        ${r}
                      </span>
                      <span class="mt-0.5 block font-mono text-[9.5px] text-ink-3">
                        ${t.time}${n?` \xb7 ${e?"当前":"current"}`:""}
                      </span>
                    </span>
                  </button>
                </li>
              `}).join("")}
          </ol>

          <div class="min-w-0 p-4">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-[12.5px] font-semibold text-ink">${i}</p>
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
                  ${e?`恢复“${i}”？`:`Restore “${i}”?`}
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
                aria-label="${r?e?"当前检查点":"Current checkpoint":e?"恢复检查点":"Restore checkpoint"}"
                ${r?"disabled":""}
                class="mt-3 w-full rounded-control border border-line-strong bg-surface px-3 py-2 text-[10.5px] font-medium text-ink shadow-btn transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:bg-inset disabled:text-ink-3 disabled:shadow-none motion-reduce:transition-none"
              >
                ${r?e?"当前检查点":"Current checkpoint":e?"恢复到此检查点":"Restore this checkpoint"}
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
    `,n),this.shadowRoot.querySelectorAll(".nav-btn").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx"),10);this.selectCheckpoint(t)})}),this.shadowRoot.querySelector("#btn-trigger-restore")?.addEventListener("click",()=>{this._confirming=!0,this.render()}),this.shadowRoot.querySelector("#btn-cancel-restore")?.addEventListener("click",()=>{this._confirming=!1,this.render()}),this.shadowRoot.querySelector("#btn-confirm-restore")?.addEventListener("click",()=>{this.confirmRestore()})}}"u">typeof customElements&&!customElements.get("nai-checkpoint-timeline")&&customElements.define("nai-checkpoint-timeline",eU);let eK=[{id:"cordis-hmr",name:"Cordis.Hmr",version:"1.0.4",scope:"Kernel",enabled:!0,hmrVersion:3,services:[{name:"IHmrWatcher",provider:"Cordis.Hmr.FileSystemWatcher",consumers:["Harness.Core.AgentLoop","Harness.Skill"],status:"active"}]},{id:"harness-llm-deepseek",name:"Harness.Llm.DeepSeek",version:"0.9.2",scope:"Harness",enabled:!0,hmrVersion:1,services:[{name:"ILlmProvider",provider:"DeepSeekReasoningProvider",consumers:["Harness.Core.AgentLoop","Harness.Compaction"],status:"active"}]},{id:"harness-sandbox-e2b",name:"Harness.Sandbox.E2b",version:"0.8.0",scope:"Harness",enabled:!0,hmrVersion:2,services:[{name:"ISandboxRuntime",provider:"E2bContainerWorker",consumers:["Harness.CodeRuntime.Tools","Harness.Terminal.Tools"],status:"active"}]},{id:"harness-lsp",name:"Harness.Lsp.Stdio",version:"0.5.1",scope:"Extension",enabled:!0,hmrVersion:1,services:[{name:"ILspDiagnosticsService",provider:"OmniSharpStdioBridge",consumers:["Harness.Fs.Tools"],status:"active"}]}];class eG extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._plugins=JSON.parse(JSON.stringify(eK)),this._reloadingId=null}handleToggle(e){this._plugins=this._plugins.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerHmr(e){this._reloadingId=e,this.render(),this.registerTimeout(()=>{this._plugins=this._plugins.map(t=>t.id===e?{...t,hmrVersion:t.hmrVersion+1}:t),this._reloadingId=null,this.render()},800)}render(){let e=this.isZh,t=this._plugins.filter(e=>e.enabled).length,i=`
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
          ${this._plugins.map(t=>{let i=this._reloadingId===t.id,r="Kernel"===t.scope?"bg-orange-tint text-orange":"Harness"===t.scope?"bg-accent-tint text-accent-ink":"bg-green-tint text-green",n="Kernel"===t.scope?e?"内核":"Kernel":t.scope;return`
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
                      class="rounded-chip px-1.5 py-0.2 font-mono text-[9px] font-medium ${r}"
                    >
                      ${n}
                    </span>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    <span class="font-mono text-[10px] text-ink-3">
                      rev #${t.hmrVersion}
                    </span>
                    <button
                      type="button"
                      data-hmr="${t.id}"
                      ${i||!t.enabled?"disabled":""}
                      class="flex items-center gap-1 rounded-control border border-line bg-surface px-2 py-1 text-[11px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class="${i?"animate-spin text-accent":""}"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>${i?e?"重载中...":"Reloading...":"HMR"}</span>
                    </button>
                  </div>
                </div>

                
                ${t.enabled?`
                  <div class="border-t border-line/60 bg-surface/50 px-3 py-2 text-[11px]">
                    ${t.services.map((t,i)=>`
                      <div class="flex flex-col gap-1 ${i>0?"mt-2":""}">
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
    `,i),this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-hmr]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-hmr");this.handleTriggerHmr(t)})})}}"u">typeof customElements&&!customElements.get("nai-cordis-plugin-tree")&&customElements.define("nai-cordis-plugin-tree",eG);let eJ=[{id:"strict",nameEn:"Strict Sandboxed",nameZh:"严格沙盒隔离",sandbox:"E2B Cloud",approvalEn:"Strict Prompt",approvalZh:"全量拦截审批",descEn:"Isolated remote container. Prompt user before all file edits, shell commands, and outbound HTTP.",descZh:"在远程隔离容器中执行。任何文件修改、终端命令及外网 HTTP 调用均需用户手动确认。",icon:"shield"},{id:"balanced",nameEn:"Balanced Dev",nameZh:"开发平衡模式",sandbox:"Local Process",approvalEn:"Write-Only Prompt",approvalZh:"仅写操作审批",descEn:"Local sandbox with workspace isolation. Read operations auto-approve; write/exec prompt once.",descZh:"本地沙盒与工作区隔离。读操作自动放行；文件写入与命令执行仅提示一次。",icon:"scale"},{id:"autonomous",nameEn:"Autonomous Agent",nameZh:"全自主执行模式",sandbox:"Local Process",approvalEn:"Autonomous",approvalZh:"完全自主",descEn:"Full automated execution. Retains durable exactly-once audit ledger in SQLite.",descZh:"全自动执行流。在 SQLite 中保留可完整重放的 Exactly-Once 审计账本。",icon:"bolt"}],eQ=[{id:"aud-1",action:"fs.write",target:"src/Harness.Core/Session.cs",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:12",hash:"e4f8a1...3b9c"},{id:"aud-2",action:"shell.exec",target:"dotnet build Harness.slnx",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:19",hash:"82a0bc...19d4"},{id:"aud-3",action:"fs.read",target:"NuGet.config",statusEn:"Auto-Allowed",statusZh:"自动放行",timestamp:"21:48:22",hash:"6c7d1e...90fa"}];class eY extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedPreset="balanced",this._isReplaying=!1,this._replayVerified=!1}handleSelectPreset(e){this._selectedPreset=e,this.render()}handleReplayAudit(){this._isReplaying=!0,this._replayVerified=!1,this.render(),this.registerTimeout(()=>{this._isReplaying=!1,this._replayVerified=!0,this.render()},900)}render(){let e=this.isZh,t=this._selectedPreset,i=this._isReplaying,r=this._replayVerified,n=`
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
          ${eJ.map(i=>{var r;let n=t===i.id;return`
              <div
                data-preset="${i.id}"
                class="preset-tile preset-item flex flex-col justify-between rounded-control border p-2.5 transition-all cursor-pointer ${n?"border-accent bg-accent-tint/30 shadow-sm ring-1 ring-accent":"border-line bg-inset/40 hover:border-line-strong hover:bg-hover/30"}"
              >
                <div>
                  <div class="flex items-center gap-1.5 mb-1">
                    <span class="flex size-4 items-center justify-center ${n?"text-accent-ink":"text-ink-2"}">
                      ${"shield"===(r=i.icon)?`
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        `:"scale"===r?`
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
                      ${e?i.nameZh:i.nameEn}
                    </span>
                  </div>
                  <p class="text-[10.5px] text-ink-2 leading-tight">
                    ${e?i.descZh:i.descEn}
                  </p>
                </div>

                <div class="mt-2.5 flex flex-col gap-1 border-t border-line/60 pt-2 font-mono text-[9.5px]">
                  <div class="flex justify-between text-ink-3">
                    <span>${e?"沙盒:":"Sandbox:"}</span>
                    <span class="text-ink font-medium">${i.sandbox}</span>
                  </div>
                  <div class="flex justify-between text-ink-3">
                    <span>${e?"审批:":"Approval:"}</span>
                    <span class="text-ink font-medium">
                      ${e?i.approvalZh:i.approvalEn}
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
              ${r?`
                <span class="flex items-center gap-0.5 text-green font-mono text-[10px]">
                  ${e?"✓ 校验通过":"✓ Validated"}
                </span>
              `:""}
            </div>
            <button
              type="button"
              id="btn-replay-audit"
              ${i?"disabled":""}
              class="flex items-center gap-1 rounded-chip border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            >
              ${i?e?"正在重放校验...":"Verifying...":e?"重放审计":"Replay Audit"}
            </button>
          </div>

          <div class="mt-2 flex flex-col divide-y divide-line/40">
            ${eQ.map(t=>`
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
    `;this.setHtml(n),this.shadowRoot.querySelectorAll(".preset-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-preset");t&&this.handleSelectPreset(t)})}),this.shadowRoot.querySelector("#btn-replay-audit")?.addEventListener("click",()=>{this.handleReplayAudit()})}}"u">typeof customElements&&!customElements.get("nai-permission-preset-card")&&customElements.define("nai-permission-preset-card",eY);let eX=[{id:"diag-1",severity:"error",code:"CS0103",messageEn:"The name 'ContextSpilloverService' does not exist in the current context.",messageZh:"当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",file:"src/Harness.Compaction/Compactor.cs",line:38,col:14},{id:"diag-2",severity:"warning",code:"CS8618",messageEn:"Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",messageZh:"不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",file:"src/Harness.Session.Persistence/SqliteSessionStore.cs",line:22,col:29},{id:"diag-3",severity:"warning",code:"CA2000",messageEn:"Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",messageZh:"在失去作用域前释放对象: 'CancellationTokenSource' 从未被显式 Dispose 释放。",file:"src/Harness.CodeRuntime/WorkerProcess.cs",line:74,col:21}];class e1 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all",this._diagnostics=JSON.parse(JSON.stringify(eX)),this._fixedIds=[]}setFilter(e){this._filter=e,this.render()}handleFix(e){this._fixedIds.push(e),this.render(),this.registerTimeout(()=>{this._diagnostics=this._diagnostics.filter(t=>t.id!==e),this._fixedIds=this._fixedIds.filter(t=>t!==e),this.render()},600)}render(){let e=this.isZh,t=this._diagnostics.filter(e=>"all"===this._filter||e.severity===this._filter),i=`
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
          `:t.map(t=>{let i=this._fixedIds.includes(t.id);return`
                <div
                  class="flex flex-col gap-1.5 rounded-control border p-3 transition-all ${"error"===t.severity?"border-red/30 bg-red-tint/20 hover:border-red/50":"border-orange/30 bg-orange-tint/20 hover:border-orange/50"} ${i?"opacity-40 scale-98":""}"
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
                      <span>${i?e?"修复中...":"Fixing...":e?"一键修复":"Auto-Fix"}</span>
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
    `,i),this.shadowRoot.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");this.setFilter(t)})}),this.shadowRoot.querySelectorAll("[data-fix]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-fix");this.handleFix(t)})})}}"u">typeof customElements&&!customElements.get("nai-lsp-diagnostics")&&customElements.define("nai-lsp-diagnostics",e1);let e0=[{pid:1402,command:"dotnet run --project src/Harness.Boot",cpuPct:12.4,memMb:240,uptimeEn:"8m 12s",uptimeZh:"8分12秒"},{pid:1489,command:"node ./worker/lsp-bridge.js",cpuPct:3.1,memMb:85,uptimeEn:"6m 40s",uptimeZh:"6分40秒"}];class e2 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._isRunning=!0,this._cpuUsage=15.5,this._memUsage=325}handleRestart(){this._isRunning=!1,this.render(),this.registerTimeout(()=>{this._isRunning=!0,this._cpuUsage=8.2,this._memUsage=212,this.render()},1e3)}render(){let e=this.isZh,t=`
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
            ${e0.map(e=>`
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
    `,t),this.shadowRoot.querySelector("#btn-restart")?.addEventListener("click",()=>{this.handleRestart()})}}"u">typeof customElements&&!customElements.get("nai-sandbox-manager")&&customElements.define("nai-sandbox-manager",e2);let e5=[{id:"job-1",nameEn:"Vector Embeddings Sync & Reindex",nameZh:"向量嵌入同步与全量重索引",cron:"0 */4 * * *",nextRunEn:"In 1h 24m",nextRunZh:"1小时24分后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-2",nameEn:"Durable SQLite Session Snapshot",nameZh:"SQLite 会话不可变事实快照",cron:"0 * * * *",nextRunEn:"In 18m",nextRunZh:"18分钟后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-3",nameEn:"Telemetry Batch Export & Rollup",nameZh:"遥测遥控日志批量聚合导出",cron:"0 0 * * *",nextRunEn:"At 00:00 UTC",nextRunZh:"今天 00:00 UTC",lastStatusEn:"Running",lastStatusZh:"执行中",enabled:!0}];class e3 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._jobs=JSON.parse(JSON.stringify(e5)),this._triggeringId=null}handleToggle(e){this._jobs=this._jobs.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerNow(e){this._triggeringId=e,this.render(),this.registerTimeout(()=>{this._triggeringId=null,this.render()},1200)}render(){let e=this.isZh,t=this._jobs.filter(e=>e.enabled).length,i=`
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
          ${this._jobs.map(t=>{let i=this._triggeringId===t.id,r="Success"===t.lastStatusEn?"bg-green-tint text-green":"Failed"===t.lastStatusEn?"bg-red-tint text-red":"bg-accent-tint text-accent-ink",n=e?t.lastStatusZh:t.lastStatusEn;return`
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
                    class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${r}"
                  >
                    ${n}
                  </span>

                  <button
                    type="button"
                    data-trigger="${t.id}"
                    ${i||!t.enabled?"disabled":""}
                    class="btn-trigger rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    ${i?e?"触发中...":"Running...":e?"立即触发":"Trigger"}
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,i),this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-trigger]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-trigger");this.handleTriggerNow(t)})})}}"u">typeof customElements&&!customElements.get("nai-job-scheduler")&&customElements.define("nai-job-scheduler",e3);let e4=[{id:"fs",name:"filesystem",transport:"stdio",status:"connected",latencyMs:3,tools:[{qualified:"filesystem__read_file",descEn:"Read a workspace file",descZh:"读取工作区文件"},{qualified:"filesystem__write_file",descEn:"Write within declared scopes",descZh:"在声明范围内写文件"},{qualified:"filesystem__grep",descEn:"ripgrep over the repo",descZh:"对仓库执行 ripgrep"}]},{id:"rg",name:"ripgrep",transport:"stdio",status:"connected",latencyMs:5,tools:[{qualified:"ripgrep__search",descEn:"Pattern search with globs",descZh:"带 glob 的模式搜索"},{qualified:"ripgrep__files",descEn:"List files matching a glob",descZh:"按 glob 列出文件"}]},{id:"web",name:"web-fetch",transport:"stdio",status:"error",tools:[],errorEn:"handshake timeout after 10s · exit 1",errorZh:"握手 10 秒超时 · 退出码 1"}],e6={connected:{dot:"bg-green",chip:"bg-green-tint text-green",labelEn:"connected",labelZh:"已连接"},handshaking:{dot:"bg-orange animate-pulse",chip:"bg-orange-tint text-orange",labelEn:"handshake",labelZh:"握手中"},error:{dot:"bg-red",chip:"bg-red-tint text-red",labelEn:"error",labelZh:"错误"}};class e8 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._expanded="fs",this._retrying=!1,this._recovered=!1}toggleExpand(e){this._expanded=this._expanded===e?null:e,this.render()}handleRetry(){this._retrying=!0,this.render(),this.registerTimeout(()=>{this._retrying=!1,this._recovered=!0,this.render()},1600)}render(){let e=this.isZh,t=this._recovered?"connected":this._retrying?"handshaking":"error",i=e4.filter(e=>("web"===e.id?t:e.status)==="connected").length,r=e4.reduce((e,t)=>e+t.tools.length,0)+2*!!this._recovered,n=`
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
            ${i}/${e4.length} \xb7 ${r} tools
          </span>
        </div>

        
        <div class="flex flex-col gap-1.5">
          ${e4.map(i=>{let r="web"===i.id?t:i.status,n=e6[r],a=this._expanded===i.id,s="web"===i.id&&this._recovered?[{qualified:"web-fetch__get",descEn:"GET a URL as markdown",descZh:"以 markdown 获取 URL"},{qualified:"web-fetch__search",descEn:"Web search",descZh:"网页搜索"}]:i.tools,o="web"===i.id?41:i.latencyMs;return`
              <div
                class="rounded-control border transition-colors ${a?"border-line-strong bg-hover/30":"border-line bg-surface"}"
              >
                <div
                  role="button"
                  tabindex="0"
                  data-expand="${i.id}"
                  class="server-row flex w-full items-center gap-2.5 px-2.5 py-2 cursor-pointer"
                >
                  <span class="size-2 shrink-0 rounded-full ${n.dot}"></span>
                  <code class="font-mono text-[11.5px] font-medium text-ink">${i.name}</code>
                  <span class="rounded-chip bg-field px-1 font-mono text-[9px] text-ink-3">
                    ${i.transport}
                  </span>
                  <span class="ml-auto shrink-0 rounded-chip px-1.5 py-px font-mono text-[9.5px] font-medium ${n.chip}">
                    ${e?n.labelZh:n.labelEn}
                  </span>
                  ${"connected"===r&&void 0!==o?`
                    <span class="shrink-0 font-mono text-[9.5px] tabular-nums text-ink-3">
                      ${o}ms
                    </span>
                  `:""}
                  <svg
                    width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 transition-transform duration-200 ${a?"rotate-180":""}"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                ${a?`
                  <div class="border-t border-line/60 px-2.5 py-2" style="animation: fade-up 250ms cubic-bezier(0.23,1,0.32,1) both;">
                    ${"error"===r?`
                      <div class="flex items-center justify-between gap-2">
                        <span class="truncate font-mono text-[10.5px] text-red">
                          ${e?i.errorZh:i.errorEn}
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
                    `:"handshaking"===r?`
                      <div class="flex items-center gap-2">
                        <span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-orange animate-spin"></span>
                        <span class="font-mono text-[10.5px] text-ink-3">
                          initialize → tools/list…
                        </span>
                      </div>
                    `:`
                      <div class="flex flex-col gap-1">
                        ${s.map(t=>`
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
    `,n),this.shadowRoot.querySelectorAll("[data-expand]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-expand");this.toggleExpand(t)}),e.addEventListener("keydown",t=>{if("Enter"===t.key||" "===t.key){t.preventDefault();let i=e.getAttribute("data-expand");this.toggleExpand(i)}})}),this.shadowRoot.querySelector("#btn-retry-mcp")?.addEventListener("click",e=>{e.stopPropagation(),this.handleRetry()})}}"u">typeof customElements&&!customElements.get("nai-mcp-servers")&&customElements.define("nai-mcp-servers",e8);let e7=`import React from 'react';

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
}`;async function e9(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let i=document.execCommand("copy");return t.remove(),i}class te extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._tab="preview",this._viewport="desktop",this._copied=!1,this._copyError=!1}setTab(e){this._tab=e,this.render()}setViewport(e){this._viewport=e,this.render()}async handleCopy(){this._copyError=!1;try{if(!await e9(e7)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1600)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh,t=this._tab,i=this._viewport,r=this._copied,n=this._copyError;this.setHtml(`
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
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"desktop"===i?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
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
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"tablet"===i?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
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
                  class="flex size-6 items-center justify-center rounded-chip transition-colors cursor-pointer ${"mobile"===i?"bg-surface text-ink shadow-sm":"hover:text-ink"}"
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
              ${n?`
                <span role="status" aria-live="polite" class="text-red">
                  ${e?"复制失败":"Copy failed"}
                </span>
              `:r?`
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
            <div class="transition-all duration-300 w-full ${"mobile"===i?"max-w-[280px]":"tablet"===i?"max-w-[380px]":"max-w-md"}">
              
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
              <pre><code>${e7.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}</code></pre>
            </div>
          `}
        </div>

        
        <div class="flex items-center justify-between border-t border-line bg-surface px-4 py-2 text-[11px] text-ink-3">
          <span>${e?"技术栈: React 19 + Tailwind CSS":"Framework: React 19 + Tailwind CSS"}</span>
          <span class="font-mono">${e?"编译耗时: 12ms":"Compiled in 12ms"}</span>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#tab-preview")?.addEventListener("click",()=>this.setTab("preview")),this.shadowRoot?.querySelector("#tab-code")?.addEventListener("click",()=>this.setTab("code")),this.shadowRoot?.querySelector("#vp-desktop")?.addEventListener("click",()=>this.setViewport("desktop")),this.shadowRoot?.querySelector("#vp-tablet")?.addEventListener("click",()=>this.setViewport("tablet")),this.shadowRoot?.querySelector("#vp-mobile")?.addEventListener("click",()=>this.setViewport("mobile")),this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click",()=>this.handleCopy())}}"u">typeof customElements&&!customElements.get("nai-artifact-sandbox")&&customElements.define("nai-artifact-sandbox",te);let tt=[{en:"Flavor",zh:"风味"},{en:"Category",zh:"分类"},{en:"Supplier",zh:"供应商"}],ti=[{nameEn:"Rocky Road",nameZh:"石板街",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"aurora-scoops",removed:!0},{nameEn:"Bubblegum",nameZh:"泡泡糖",dept:"Retro",deptEn:"Retro",deptZh:"复古",email:"kumo-creamery",removed:!0},{nameEn:"Mint Chip",nameZh:"薄荷巧克力",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"maple-orbit",removed:!1}],tr={Classic:"bg-accent",Retro:"bg-ink-3",Seasonal:"bg-orange"};class tn extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._stage=0}onMount(){this._startStageProgression()}_startStageProgression(){this._stage=0,this.render(),this.registerTimeout(()=>{this._stage=1,this.render(),this.registerTimeout(()=>{this._stage=2,this.render(),this.registerTimeout(()=>{this._stage=3,this.render()},1e3)},1e3)},800)}render(){let e=this.isZh,t=this._stage>=2,i=this._stage>=3;this.setHtml(`
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
                ${tt.map(t=>`
                  <th class="primitive-table-cell text-[12px] font-medium text-ink-3">
                    ${e?t.zh:t.en}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              ${ti.map(i=>{let r=i.removed&&t,n=tr[i.dept]||"bg-ink-3";return`
                  <tr
                    class="row-item border-b border-line transition-colors duration-400 last:border-0 hover:bg-hover"
                    style="${r?"background: var(--red-tint);":""}"
                  >
                    <td
                      class="primitive-table-cell text-[13px] font-medium tabular-nums transition-colors duration-400"
                      style="${r?"color: var(--red);":"color: var(--ink);"}"
                    >
                      ${e?i.nameZh:i.nameEn}
                    </td>
                    <td class="primitive-table-cell">
                      <span
                        class="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-inset px-2 text-[11.5px] font-medium shadow-hairline transition-opacity duration-400"
                        style="opacity: ${r?.55:1};"
                      >
                        <span class="size-1.5 rounded-full ${n}"></span>
                        <span class="text-ink-2">${e?i.deptZh:i.deptEn}</span>
                      </span>
                    </td>
                    <td
                      class="primitive-table-cell text-[12.5px] whitespace-nowrap transition-colors duration-400"
                      style="${r?"color: var(--red); text-decoration-line: line-through; text-decoration-color: color-mix(in srgb, var(--red) 50%, transparent);":"color: var(--ink-2); text-decoration-line: none;"}"
                    >
                      ${i.email}
                    </td>
                  </tr>
                `}).join("")}
              <!-- added row -->
              <tr>
                <td colspan="3" class="p-0">
                  <div
                    class="grid transition-[grid-template-rows,opacity] duration-400"
                    style="grid-template-rows: ${i?"1fr":"0fr"}; opacity: ${+!!i}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
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
    `)}}"u">typeof customElements&&!customElements.get("nai-diff-table")&&customElements.define("nai-diff-table",tn);let ta={strong:{labelEn:"Very strong",labelZh:"非常强",color:"var(--green)",rank:3},weak:{labelEn:"Weak",labelZh:"较弱",color:"var(--orange)",rank:2},veryweak:{labelEn:"Very weak",labelZh:"非常弱",color:"var(--red)",rank:1},none:{labelEn:"No communication",labelZh:"无沟通",color:"var(--ink-3)",rank:0}},ts={B2B:"#f09a2f",B2C:"#92b72d",Cafe:"#ee6572",Catering:"#c84f9d","Dairy-free":"#16a6c7",Gelato:"#9a5cff",Imports:"#3f78ff",Local:"#25a878",Seasonal:"#f09a2f",Sorbet:"#16a6c7",Vegan:"#92b72d",Wholesale:"#3f78ff"},to=[{id:"aurora",name:"Aurora Scoops — Reykjavík",tags:["Gelato","Seasonal"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"aurora-scoops.example.com"},{id:"kumo",name:"Kumo Creamery — Tokyo",tags:["B2C","Cafe","Vegan"],lastEn:"3 weeks ago",lastZh:"3 周前",strength:"strong",website:"kumo-creamery.example.com"},{id:"sol-nieve",name:"Sol y Nieve — Buenos Aires",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"sol-y-nieve.example.com"},{id:"maple-orbit",name:"Maple Orbit — Montréal",tags:["B2B","Wholesale","Seasonal"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"maple-orbit.example.com"},{id:"blue-fig",name:"Blue Fig Gelato — Florence",tags:["Gelato","Cafe"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"blue-fig.example.com"},{id:"sahara-swirl",name:"Sahara Swirl — Marrakech",tags:["Sorbet","Local"],lastEn:"5 months ago",lastZh:"5 个月前",strength:"veryweak"},{id:"cloudberry",name:"Cloudberry Cone — Helsinki",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none",website:"cloudberry-cone.example.com"},{id:"palm-sugar",name:"Palm Sugar Creamery — Bangkok",tags:["B2C","Vegan"],lastEn:"3 months ago",lastZh:"3 个月前",strength:"veryweak",website:"palm-sugar.example.com"},{id:"cape-vanilla",name:"Cape Vanilla Co. — Cape Town",tags:["Wholesale","Imports"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"cape-vanilla.example.com"},{id:"andes-snow",name:"Andes Snow Creamery — Quito",tags:["Gelato","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak"},{id:"tasman-sea",name:"Tasman Sea Gelato — Hobart",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"tasman-sea.example.com"},{id:"silk-road",name:"Silk Road Sorbet — Tbilisi",tags:["Sorbet","Imports"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"weak",website:"silk-road.example.com"},{id:"rosewater",name:"Rosewater Kulfi — Jaipur",tags:["B2C","Seasonal"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"veryweak"},{id:"lumen",name:"Lumen Soft Serve — Copenhagen",tags:["Dairy-free","Cafe"],lastEn:"8 months ago",lastZh:"8 个月前",strength:"weak",website:"lumen-soft-serve.example.com"},{id:"cacao-norte",name:"Cacao Norte — Oaxaca",tags:["B2B","Local","Wholesale"],lastEn:"about 2 years ago",lastZh:"约 2 年前",strength:"none",website:"cacao-norte.example.com"},{id:"pine-pistachio",name:"Pine & Pistachio — Istanbul",tags:["Gelato","Catering"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak"},{id:"ember-cone",name:"Ember Cone Company — Seoul",tags:["B2C","Vegan"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"ember-cone.example.com"},{id:"coral-coast",name:"Coral Coast Sorbet — Honolulu",tags:["Sorbet","Local"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"coral-coast.example.com"},{id:"sunbird",name:"Sunbird Gelateria — Lisbon",tags:["Gelato","Cafe"],lastEn:"over 2 years ago",lastZh:"2 年多前",strength:"none",website:"sunbird.example.com"},{id:"mooncake",name:"Mooncake Ice Cream — Singapore",tags:["B2B","Wholesale"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak",website:"mooncake-ice-cream.example.com"},{id:"juniper",name:"Juniper & Cream — Vancouver",tags:["Dairy-free","Catering"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"mango-moon",name:"Mango Moon Gelato — Nairobi",tags:["Sorbet","Vegan"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"mango-moon.example.com"},{id:"fjord-fizz",name:"Fjord Fizz Ice — Oslo",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"pampa",name:"Pampa Creamery — Córdoba",tags:["B2C","Local"],lastEn:"12 months ago",lastZh:"12 个月前",strength:"veryweak",website:"pampa-creamery.example.com"},{id:"lotus-leaf",name:"Lotus Leaf Scoops — Hanoi",tags:["Vegan","Cafe"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak"},{id:"saffron-sky",name:"Saffron Sky Kulfi — Dubai",tags:["Imports","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"saffron-sky.example.com"}];class tl extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=new Set,this._sort={key:"name",dir:1}}toggleSort(e){this._sort.key===e?this._sort.dir=1===this._sort.dir?-1:1:this._sort={key:e,dir:1},this.render()}toggleRow(e){this._selected.has(e)?this._selected.delete(e):this._selected.add(e),this.render()}toggleAll(e,t){e?t.forEach(e=>this._selected.delete(e.id)):t.forEach(e=>this._selected.add(e.id)),this.render()}render(){let e=this.isZh,t=this._sort,i=[...to].sort((e,i)=>("name"===t.key?e.name.localeCompare(i.name):"last"===t.key?e.lastEn.localeCompare(i.lastEn):ta[e.strength].rank-ta[i.strength].rank)*t.dir),r=i.length>0&&i.every(e=>this._selected.has(e.id)),n=!r&&i.some(e=>this._selected.has(e.id)),a=Math.round(to.reduce((e,t)=>e+ta[t.strength].rank,0)/to.length/3*100);this.setHtml(`
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
                      <input type="checkbox" id="check-all-input" ${r?"checked":""} aria-label="${e?"全选公司":"Select all companies"}" />
                      <span class="records-checkbox-box ${r||n?"is-active":""}">
                        ${n?'<span class="records-checkbox-dash"></span>':r?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>':""}
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
              ${i.map(t=>{let i=this._selected.has(t.id),r=ta[t.strength],n=t.website?`https://${t.website}`:"#";return`
                    <tr class="records-row ${i?"is-selected":""}">
                      <td class="records-cell records-sticky-cell records-company-cell">
                        <label class="records-checkbox" title="${e?`选择 ${t.name}`:`Select ${t.name}`}">
                          <input type="checkbox" class="row-check row-checkbox" data-id="${t.id}" ${i?"checked":""} aria-label="${e?`选择 ${t.name}`:`Select ${t.name}`}" />
                          <span class="records-checkbox-box ${i?"is-active":""}">
                            ${i?'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>':""}
                          </span>
                        </label>
                        <span class="records-company-mark">${t.name.slice(0,1).toUpperCase()}</span>
                        <a href="${n}" class="records-company-name ${t.website?"has-link":""}" ${!t.website?'onclick="event.preventDefault()"':""}>
                          ${t.name}
                        </a>
                      </td>
                      <td class="records-cell">
                        <div class="records-tags">
                          ${t.tags.slice(0,4).map(e=>{let t=ts[e]||"#7f858d";return`
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
                          <span class="records-strength-dot" style="background: ${r.color};"></span>
                          ${e?r.labelZh:r.labelEn}
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
                  <span class="records-calculation-number">${to.length}</span> ${e?"条记录":"count"}
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
                    ${e?`平均 ${a}%`:`${a}% average`}
                  </span>
                </td>
                <td class="records-cell">
                  <span class="records-muted">${to.filter(e=>e.website).length} ${e?"个链接":"links"}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `),this.shadowRoot?.querySelector("#check-all-input")?.addEventListener("change",()=>{this.toggleAll(r,i)}),this.shadowRoot?.querySelectorAll(".row-checkbox").forEach(e=>{e.addEventListener("change",t=>{let i=e.getAttribute("data-id");i&&this.toggleRow(i)})}),this.shadowRoot?.querySelector("#sort-last")?.addEventListener("click",()=>this.toggleSort("last")),this.shadowRoot?.querySelector("#btn-sort-strength")?.addEventListener("click",()=>this.toggleSort("strength"))}}"u">typeof customElements&&!customElements.get("nai-records-table")&&customElements.define("nai-records-table",tl);let tc=[{key:"all",labelEn:"All",labelZh:"全部",count:5},{key:"todo",labelEn:"To do",labelZh:"待办",dot:"#f09a2f",count:2},{key:"progress",labelEn:"In Progress",labelZh:"进行中",dot:"#16a6c7",count:2},{key:"done",labelEn:"Completed",labelZh:"已完成",dot:"#25a878",count:1}],td=[{taskEn:"Restock mango sorbet",taskZh:"补货芒果雪葩",dateEn:"Dec 03",dateZh:"12月3日",status:"todo",ownerEn:"Mango Moon Gelato",ownerZh:"Mango Moon 意式冰淇淋"},{taskEn:"Churn black sesame",taskZh:"搅拌黑芝麻基底",dateEn:"Sep 22",dateZh:"9月22日",status:"progress",ownerEn:"Kumo Creamery",ownerZh:"Kumo 乳品工坊"},{taskEn:"Print summer menu",taskZh:"印制夏季菜单",dateEn:"Jan 02",dateZh:"1月2日",status:"todo",ownerEn:"Coral Coast Sorbet",ownerZh:"Coral Coast 雪葩"},{taskEn:"Taste-test batch 42",taskZh:"试吃评测第 42 批",dateEn:"Nov 08",dateZh:"11月8日",status:"progress",ownerEn:"Maple Orbit",ownerZh:"Maple Orbit 枫糖"},{taskEn:"Order waffle cones",taskZh:"订购华夫脆筒",dateEn:"Apr 14",dateZh:"4月14日",status:"done",ownerEn:"Aurora Scoops",ownerZh:"Aurora 冰品铺"}],tp={todo:{labelEn:"To do",labelZh:"待办",color:"#f09a2f"},progress:{labelEn:"In Progress",labelZh:"进行中",color:"#16a6c7"},done:{labelEn:"Completed",labelZh:"已完成",color:"#25a878"}},th=[{en:"Task name",zh:"任务名称"},{en:"Date",zh:"日期"},{en:"Status",zh:"状态"},{en:"Advisor",zh:"顾问"}];class tu extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all"}setFilter(e){this._filter=e,this.render()}render(){let e=this.isZh,t=this._filter;this.setHtml(`
      <div class="w-full max-w-105">
        
        <div
          class="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1"
          style="scrollbar-width: none;"
        >
          ${tc.map(i=>{let r=t===i.key;return`
              <button
                type="button"
                aria-pressed="${r}"
                data-key="${i.key}"
                class="chip-btn flex h-6.5 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition-[background-color,box-shadow,color] duration-200 cursor-pointer ${r?"bg-surface text-ink shadow-btn":"text-ink-2 hover:bg-hover"}"
              >
                ${i.dot?`<span class="size-1.5 rounded-full" style="background: ${i.dot}"></span>`:""}
                ${e?i.labelZh:i.labelEn}
                <span
                  class="rounded-[4px] px-1 text-[10.5px] tabular-nums ${r?"bg-field text-ink-2":"text-ink-3"}"
                >
                  ${i.count}
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
              ${th.map(t=>`<span>${e?t.zh:t.en}</span>`).join("")}
            </div>
            ${td.map(i=>{let r="all"===t||i.status===t,n=tp[i.status];return`
                <div
                  class="row-wrapper ${r?"visible":""} grid transition-[grid-template-rows,opacity] duration-300"
                  style="grid-template-rows: ${r?"1fr":"0fr"}; opacity: ${+!!r}; transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);"
                >
                  <div class="overflow-hidden">
                    <div
                      class="grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr] items-center border-b border-line px-3 py-2 text-[12px] transition-colors duration-100 last:border-0 hover:bg-hover"
                    >
                      <span class="truncate font-medium text-ink">${e?i.taskZh:i.taskEn}</span>
                      <span class="text-ink-2 tabular-nums">${e?i.dateZh:i.dateEn}</span>
                      <span>
                        <span
                          class="inline-flex h-5 items-center rounded-[5px] px-1.5 text-[11px] font-medium"
                          style="color: ${n.color}; background: color-mix(in srgb, ${n.color} 13%, transparent);"
                        >
                          ${e?n.labelZh:n.labelEn}
                        </span>
                      </span>
                      <span class="truncate text-ink-2">${e?i.ownerZh:i.ownerEn}</span>
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setFilter(t)})})}}"u">typeof customElements&&!customElements.get("nai-filter-table")&&customElements.define("nai-filter-table",tu);let tg="Pistachio holds the top slot all weekend. ",tm="整个周末，开心果口味都稳居销量榜首。",tb="Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.",tx="周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。",tv="This sentence prioritizes the Saturday churn so the batch has enough setting time before peak service.",tf="这句话把周六的搅拌任务设为优先事项，确保冰淇淋在高峰营业前有足够的凝冻时间。",tw={direct:{instructionEn:"Make it more direct",instructionZh:"改得更直接",resultEn:"Churn pistachio early Saturday; let it firm before the afternoon rush.",resultZh:"周六先搅拌开心果，下午高峰前完成凝冻。"},shorter:{instructionEn:"Make it shorter",instructionZh:"写得更简短",resultEn:"Churn pistachio Saturday morning; let it firm before the rush.",resultZh:"周六早上搅拌开心果，高峰前凝冻成型。"}},tk=/\p{Script=Han}|\p{Script=Hiragana}|\p{Script=Katakana}|[^\s\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+\s*|\s+/gu,ty="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-ink transition-[background-color,color,transform] duration-150 motion-reduce:transition-none hover:bg-hover active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",t_="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-[12px] font-semibold text-canvas shadow-hairline transition-[opacity,transform] duration-150 motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",t$='<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M5 13L9 17L19 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',tE='<svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>';function tS(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function tC(e,t){let i=e.trim().replace(/\s+/g," ").toLocaleLowerCase();for(let[e,r]of Object.entries(tw))if(i===(t?r.instructionZh:r.instructionEn).toLocaleLowerCase())return e;return null}function tM(e){return e?"不支持该指令。请尝试“改得更直接”或“写得更简短”。":"Unsupported instruction. Try “Make it more direct” or “Make it shorter”."}function tA(e,t,i){if("shorten"===e)return t?"周六早上先搅拌开心果，让它在高峰前凝冻成型。":"Churn pistachio Saturday morning so it firms before the rush.";if("tone"===e)return t?"请在周六优先搅拌开心果，确保它在下午高峰前充分凝冻。":"Please churn pistachio first on Saturday so it is fully set before the afternoon rush.";if("grammar"===e)return t?"周六一开工，先搅拌开心果这一批，让它在下午高峰前有足够时间凝冻成型。":"Churn the pistachio batch first thing Saturday so it has time to firm up before the afternoon rush.";if("custom"===e&&i){let e=tw[i];return t?e.resultZh:e.resultEn}return t?"周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。":"Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush."}function tz(e,t,i){return"improve"===e?t?"优化文本已就绪":"Improved text ready":"shorten"===e?t?"精简文本已就绪":"Shortened text ready":"tone"===e?t?"语气调整已就绪":"Tone change ready":"grammar"===e?t?"语法修正已就绪":"Grammar fix ready":"shorter"===i?t?"自定义精简已就绪":"Shorter edit ready":t?"自定义直接改写已就绪":"Direct edit ready"}class tT extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._mode="idle",this._action="improve",this._committedText=tb,this._draftText=tb,this._prompt="",this._submittedCustomPrompt=null,this._expanded=!1,this._explanation="",this._announcement="",this._shown=!1,this._reducedMotion=!1,this._currentLang=null,this._operationToken=0,this._thinkingTimer=null,this._streamTimer=null,this._revealTimer=null,this._stream={count:0,units:[]},this._card=null,this._paragraph=null,this._selection=null,this._toolbarMount=null,this._toolbar=null,this._status=null}onMount(){this._initializeLanguage(this.currentLang);let e="function"==typeof window.matchMedia?window.matchMedia("(prefers-reduced-motion: reduce)"):null;if(this._reducedMotion=!!e?.matches,this._shown=this._reducedMotion,this._reducedMotion||this._scheduleReveal(),e){let t=e=>this._setReducedMotion(!!e.matches);"function"==typeof e.addEventListener?(e.addEventListener("change",t),this._cleanups.push(()=>e.removeEventListener("change",t))):"function"==typeof e.addListener&&(e.addListener(t),this._cleanups.push(()=>e.removeListener(t)))}this._cleanups.push(()=>this._cancelAllTimers())}onAttributeChange(e){"lang"===e&&this._syncLanguage()}_initialText(){return this.isZh?tx:tb}_initializeLanguage(e){this._currentLang=e;let t="zh"===e?tx:tb;this._committedText=t,this._draftText=t}_syncLanguage(){let e=this.currentLang;if(null===this._currentLang)return void this._initializeLanguage(e);if(e===this._currentLang)return;this._cancelOperation(),this._currentLang=e;let t="zh"===e?tx:tb;this._mode="idle",this._action="improve",this._committedText=t,this._draftText=t,this._submittedCustomPrompt=null,this._expanded=!1,this._explanation="",this._announcement=""}_cancelTimer(e){let t=this[e];null!==t&&(window.clearTimeout(t),window.clearInterval(t),this[e]=null)}_cancelAllTimers(){this._cancelTimer("_thinkingTimer"),this._cancelTimer("_streamTimer"),this._cancelTimer("_revealTimer")}_cancelOperation(){this._operationToken+=1,this._cancelTimer("_thinkingTimer"),this._cancelTimer("_streamTimer"),this._stream={count:0,units:[]}}_scheduleReveal(){this._cancelTimer("_revealTimer"),this._revealTimer=window.setTimeout(()=>{this._revealTimer=null,this._shown=!0,this.render()},280)}_setReducedMotion(e){this._reducedMotion!==e&&(this._reducedMotion=e,this._cancelTimer("_revealTimer"),e?(this._shown=!0,"streaming"===this._mode&&this._finishStream()):(this._shown=!1,this._scheduleReveal()),this.render())}_ensureSkeleton(){if(this._card?.isConnected)return;let e=this.isZh;this.setHtml(`
      <div class="w-full max-w-[520px]">
        <div class="relative rounded-card border border-transparent px-3 py-4 sm:px-4">
          <p class="text-[13px] leading-[1.75] text-ink">${tS(e?tm:tg)}<span data-selection-text="" class="box-decoration-clone rounded-[4px] bg-[color-mix(in_srgb,var(--accent)_14%,var(--surface))] px-0.5 text-ink dark:bg-accent-tint"></span></p>
          <div class="mt-3 flex justify-center"></div>
          <div role="status" aria-live="polite" aria-atomic="true" class="mt-2 min-h-4 text-center text-[10.5px] font-medium text-ink-3"></div>
        </div>
      </div>
    `),this._card=this.shadowRoot?.querySelector(".relative.rounded-card")??null,this._paragraph=this._card?.querySelector("p")??null,this._selection=this._card?.querySelector("[data-selection-text]")??null,this._toolbarMount=this._card?.querySelector(".mt-3.flex.justify-center")??null,this._status=this._card?.querySelector('[role="status"]')??null,this._toolbar=null}_renderSelection(){if(!this._paragraph||!this._selection)return;let e=this.isZh?tm:tg;this._paragraph.firstChild?.nodeType===Node.TEXT_NODE&&(this._paragraph.firstChild.nodeValue=e);let t="streaming"===this._mode||"result"===this._mode&&"explain"!==this._action;if("streaming"!==this._mode){this._selection.textContent=t?this._draftText:this._committedText;return}let i=document.createDocumentFragment();for(let[e,t]of this._stream.units.slice(0,this._stream.count).entries()){let r=document.createElement("span");r.className="inline [will-change:filter,opacity] motion-reduce:[animation:none] motion-reduce:[filter:none]",r.style.animation="stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both",r.textContent=t,r.dataset.streamIndex=String(e),i.appendChild(r)}if(this._stream.count<this._stream.units.length){let e=document.createElement("span");e.className="stream-caret is-streaming",e.setAttribute("aria-hidden","true"),i.appendChild(e)}this._selection.replaceChildren(i)}_renderExplanation(){let e=this._card?.querySelector('[role="note"]');if("result"!==this._mode||"explain"!==this._action)return void e?.remove();let t=this.isZh,i=`<div role="note" class="mt-2.5 rounded-control border border-line bg-inset px-3 py-2 text-[11.5px] leading-relaxed text-ink-2 shadow-hairline"><span class="mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-3">${t?"说明":"Explanation"}</span>${tS(this._explanation)}</div>`;e?e.outerHTML=i:this._toolbarMount?.insertAdjacentHTML("beforebegin",i)}_actionLabel(){let e=this.isZh;return"explain"===this._action?e?"解释":"Explaining":"improve"===this._action?e?"优化":"Improving":"shorten"===this._action?e?"精简":"Shortening":"tone"===this._action?e?"调整语气":"Changing tone":"grammar"===this._action?e?"修正文法":"Fixing grammar":"shorter"===this._submittedCustomPrompt?e?"自定义精简":"Applying shorter edit":e?"自定义直接改写":"Applying direct edit"}_busyMarkup(){let e=tS(this._actionLabel()),t="thinking"===this._mode?`<span class="shimmer-label bg-clip-text text-transparent text-[12.5px] font-medium" style="background-image: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%); background-size: 200% 100%; animation: shimmer-text 1.4s linear infinite;">${e}…</span>`:`<span>${e}…</span>`;return`<span class="inline-flex min-h-9 items-center gap-2 whitespace-nowrap px-3 text-[12.5px] font-medium text-ink-2"><span class="size-3 shrink-0 rounded-full border-[1.5px] border-line-strong border-t-ink-2 motion-safe:animate-spin" aria-hidden="true"></span>${t}</span>`}_resultMarkup(){let e=this.isZh;return"explain"===this._action?`<button type="button" class="${t_}">${t$}${e?"完成":"Done"}</button><button type="button" aria-label="${e?"重新解释":"Explain again"}" class="${ty}">${tE}${e?"重试":"Try again"}</button>`:`<button type="button" class="${t_}">${t$}${e?"保留":"Keep"}</button><button type="button" class="${ty}"><svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>${e?"放弃":"Discard"}</button><span class="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true"></span><button type="button" aria-label="${e?"重试":"Try again"}" class="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors motion-reduce:transition-none hover:bg-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent">${tE}</button>`}_sendMarkup(e){let t=this.isZh;return`<button type="submit"${e?"":" disabled"} aria-label="${t?"发送编辑指令":"Send edit instruction"}" class="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"><svg width="16" height="16" viewBox="0 0 24 24" stroke-width="2.4" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M12 21L12 3M12 3L20.5 11.5M12 3L3.5 11.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`}_idleMarkup(){let e=this.isZh,t=tC(this._prompt,e),i=this._prompt.trim()?this._sendMarkup(t):"",r=this._expanded?`<button type="button" class="${ty}"><svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M7.23611 7C7.71115 6.46924 8 5.76835 8 5C8 3.34315 6.65685 2 5 2C3.34315 2 2 3.34315 2 5C2 6.65685 3.34315 8 5 8C5.8885 8 6.68679 7.61375 7.23611 7ZM7.23611 7L20 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.23611 17C7.71115 17.5308 8 18.2316 8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C5.8885 16 6.68679 16.3863 7.23611 17ZM7.23611 17L20 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>${e?"精简":"Shorten"}</button><button type="button" class="${ty}"><svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M10 9H8M16 9H14M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.5 14.5C16.5 14.5 15 16.5 12 16.5C9 16.5 7.5 14.5 7.5 14.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>${e?"语气":"Tone"}</button><button type="button" class="${ty}"><svg width="14" height="14" viewBox="0 0 24 24" stroke-width="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M12 8L12 16M12 8H8M12 8H16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 13.5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13.5M21 10.5V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V10.5" stroke="currentColor" stroke-linejoin="round"></path><path d="M19.5 13.5V10.5H22.5V13.5H19.5Z" stroke="currentColor" stroke-linejoin="round"></path><path d="M1.5 13.5V10.5H4.5V13.5H1.5Z" stroke="currentColor" stroke-linejoin="round"></path></svg>${e?"语法":"Grammar"}</button>`:"",n=this._expanded?e?"收起更多操作":"Show fewer actions":e?"展开更多操作":"Show more actions";return`<form class="flex min-h-9 min-w-[148px] flex-1 items-center sm:flex-none"><input value="${tS(this._prompt)}" aria-label="${e?"描述修改要求":"Describe edits"}" placeholder="${e?"描述修改要求":"Describe edits"}" class="h-9 min-w-0 flex-1 bg-transparent pr-2 pl-3 text-[12px] text-ink placeholder:text-ink-3 focus:outline-none">${i}</form><span class="mx-0.5 h-5 w-px shrink-0 bg-line" aria-hidden="true"></span><button type="button" class="${ty}"><svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M9 9C9 5.49997 14.5 5.5 14.5 9C14.5 11.5 12 10.9999 12 13.9999" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 18.01L12.01 17.9989" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>${e?"解释":"Explain"}</button><button type="button" class="${ty}"><svg width="14" height="14" viewBox="0 0 24 24" stroke-width="1.8" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M3 12C9.26752 12 12 9.36306 12 3C12 9.36306 14.7134 12 21 12C14.7134 12 12 14.7134 12 21C12 14.7134 9.26752 12 3 12Z" stroke="currentColor" stroke-linejoin="round"></path></svg>${e?"优化":"Improve"}</button>${r}<button type="button" aria-label="${n}" aria-expanded="${this._expanded}" class="flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-200 motion-reduce:transition-none hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"><span class="flex transition-transform duration-200 motion-reduce:transition-none ${this._expanded?"rotate-180":"rotate-0"}"><svg width="14" height="14" stroke-width="1.8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" aria-hidden="true"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></button>`}_syncPromptControl(e){let t=e.closest("form");if(!t)return;let i=tC(this._prompt,this.isZh),r=t.querySelector('button[type="submit"]');this._prompt.trim()?(r||(t.insertAdjacentHTML("beforeend",this._sendMarkup(i)),r=t.querySelector('button[type="submit"]')),r&&(r.disabled=!i)):r?.remove()}_renderToolbar(){if(!this._toolbarMount)return;if(!this._shown){this._toolbarMount.replaceChildren(),this._toolbar=null;return}this._toolbar?.isConnected||(this._toolbar=document.createElement("div"),this._toolbar.setAttribute("role","toolbar"),this._toolbar.tabIndex=-1,this._toolbar.className="flex min-h-11 max-w-full flex-wrap items-center justify-center gap-1 rounded-[22px] border border-line bg-surface p-1 font-sans text-ink shadow-overlay focus:outline-none",this._toolbarMount.replaceChildren(this._toolbar));let e="thinking"===this._mode||"streaming"===this._mode;this._toolbar.setAttribute("aria-label",this.isZh?"选中文本操作":"Selection actions"),this._toolbar.setAttribute("aria-busy",String(e)),this._toolbar.innerHTML=e?this._busyMarkup():"result"===this._mode?this._resultMarkup():this._idleMarkup(),this._wireToolbar()}_buttonWithText(e){return[...this._toolbar?.querySelectorAll("button")??[]].find(t=>t.textContent?.trim()===e)??null}_wireToolbar(){if(!this._toolbar)return;let e=this.isZh;if("thinking"===this._mode||"streaming"===this._mode)return;if("result"===this._mode&&"explain"===this._action){this._buttonWithText(e?"完成":"Done")?.addEventListener("click",()=>{this._resetToolbar(e?"说明已关闭":"Explanation closed",!0)}),this._buttonWithText(e?"重试":"Try again")?.addEventListener("click",()=>this._run(this._action));return}if("result"===this._mode){this._buttonWithText(e?"保留":"Keep")?.addEventListener("click",()=>this._keep()),this._buttonWithText(e?"放弃":"Discard")?.addEventListener("click",()=>this._discard()),this._toolbar.querySelector(`button[aria-label="${e?"重试":"Try again"}"]`)?.addEventListener("click",()=>this._run(this._action));return}let t=this._toolbar.querySelector("input");t?.addEventListener("input",e=>{this._prompt=e.target.value,this._syncPromptControl(e.target),this._renderStatus()}),this._toolbar.querySelector("form")?.addEventListener("submit",e=>{e.preventDefault(),this._prompt.trim()&&this._run("custom")}),this._buttonWithText(e?"解释":"Explain")?.addEventListener("click",()=>this._run("explain")),this._buttonWithText(e?"优化":"Improve")?.addEventListener("click",()=>this._run("improve")),this._buttonWithText(e?"精简":"Shorten")?.addEventListener("click",()=>this._run("shorten")),this._buttonWithText(e?"语气":"Tone")?.addEventListener("click",()=>this._run("tone")),this._buttonWithText(e?"语法":"Grammar")?.addEventListener("click",()=>this._run("grammar"));let i=this._toolbar.querySelector("button[aria-expanded]");i?.addEventListener("click",()=>{this._expanded=!this._expanded,this._renderToolbar()})}_renderStatus(){if(!this._status)return;let e="idle"===this._mode&&this._prompt.trim().length>0&&!tC(this._prompt,this.isZh);this._status.textContent=e?tM(this.isZh):this._announcement}_focusToolbar(){this._toolbar?.focus()}_focusResult(){let e="explain"===this._action?this.isZh?"完成":"Done":this.isZh?"保留":"Keep";this._buttonWithText(e)?.focus()}_focusImprove(){this._buttonWithText(this.isZh?"优化":"Improve")?.focus()}_startStream(e){this._cancelTimer("_streamTimer"),this._streamTimer=window.setInterval(()=>{e===this._operationToken&&"streaming"===this._mode&&(this._stream.count+=1,this._renderSelection(),this._stream.count>=this._stream.units.length&&this._finishStream())},46)}_finishStream(){"streaming"===this._mode&&(this._cancelTimer("_streamTimer"),this._stream.count=this._stream.units.length,this._mode="result",this._announcement=tz(this._action,this.isZh,this._submittedCustomPrompt),this.render(),this._focusResult())}_run(e){var t;let i="custom"===e?tC(this._prompt,this.isZh):null;if("custom"===e&&!i){this._announcement=tM(this.isZh),this._renderStatus();return}if(this._cancelOperation(),this._action=e,this._submittedCustomPrompt=i,this._expanded=!1,this._explanation="",this._announcement=(t=this.isZh,"explain"===e?t?"解释处理中":"Explanation in progress":"improve"===e?t?"优化处理中":"Improvement in progress":"shorten"===e?t?"精简处理中":"Shortening in progress":"tone"===e?t?"语气调整处理中":"Tone change in progress":"grammar"===e?t?"语法修正处理中":"Grammar fix in progress":"shorter"===i?t?"自定义精简处理中":"Shorter edit in progress":t?"自定义直接改写处理中":"Direct edit in progress"),this._reducedMotion){"explain"===e?(this._explanation=this.isZh?tf:tv,this._announcement=this._explanation):(this._draftText=tA(e,this.isZh,i),this._announcement=tz(e,this.isZh,i)),this._mode="result",this.render(),this._focusResult();return}this._mode="thinking",this.render(),this._focusToolbar();let r=this._operationToken;this._thinkingTimer=window.setTimeout(()=>{if(this._thinkingTimer=null,r===this._operationToken&&"thinking"===this._mode){var e;if("explain"===this._action){this._explanation=this.isZh?tf:tv,this._announcement=this._explanation,this._mode="result",this.render(),this._focusResult();return}if(this._draftText=tA(this._action,this.isZh,this._submittedCustomPrompt),this._stream={count:0,units:(e=this._draftText).match(tk)??Array.from(e)},this._mode="streaming",this._reducedMotion)return void this._finishStream();this.render(),this._startStream(r)}},700)}run(e){let t,i="explain"===(t=String(e).trim().toLocaleLowerCase())?"explain":"improve"===t?"improve":"shorten"===t?"shorten":"tone"===t||"change tone"===t?"tone":"grammar"===t||"fix grammar"===t?"grammar":"custom"===t?"custom":null;i&&this._run(i)}_resetToolbar(e,t=!1){this._cancelOperation(),this._mode="idle",this._expanded=!1,this._prompt="",this._submittedCustomPrompt=null,this._explanation="",this._announcement=e,this.render(),t&&this._focusImprove()}_keep(){this._committedText=this._draftText,this._resetToolbar(this.isZh?"已保留修改":"Changes kept",!0)}_discard(){this._draftText=this._committedText,this._resetToolbar(this.isZh?"已放弃修改":"Changes discarded",!0)}reset(){this._cancelOperation(),this._mode="idle",this._action="improve",this._committedText=this._initialText(),this._draftText=this._committedText,this._prompt="",this._submittedCustomPrompt=null,this._expanded=!1,this._explanation="",this._announcement="",this.render()}render(){this._syncLanguage(),this._ensureSkeleton(),this._renderSelection(),this._renderExplanation(),this._renderToolbar(),this._renderStatus()}}"u">typeof customElements&&!customElements.get("nai-selection-actions")&&customElements.define("nai-selection-actions",tT);let tj={listening:"Listening to your request...",thinking:"Analyzing AST and resolving circular dependencies...",speaking:"I have updated the routing configuration and verified all 6 endpoints.",idle:"Tap to start voice conversation"},tR={listening:"正在聆听您的指令...",thinking:"正在分析抽象语法树并解决循环依赖...",speaking:"已更新全局路由配置，并成功验证了全部 6 个接口端点。",idle:"点击麦克风开始实时语音对话"},tL={listening:{en:"Listening",zh:"倾听中"},thinking:{en:"Thinking",zh:"思考中"},speaking:{en:"Speaking",zh:"回答中"},idle:{en:"Idle",zh:"已就绪"}};class tZ extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._state="speaking",this._isMuted=!1,this._bars=[12,24,18,32,28,40,36,48,42,34,26,38,20,16,28,14]}onMount(){this.registerInterval(()=>{"idle"===this._state?this._bars=this._bars.map(()=>4):this._bars=this._bars.map(()=>"speaking"===this._state?Math.floor(38*Math.random())+10:"listening"===this._state?Math.floor(20*Math.random())+6:"thinking"===this._state?Math.floor(12*Math.random())+4:4),this._updateBarsOnly()},120)}_updateBarsOnly(){let e=this.shadowRoot?.querySelector("#equalizer-bars");if(!e)return;let t="speaking"===this._state?"var(--accent)":"listening"===this._state?"var(--green)":"thinking"===this._state?"var(--orange)":"var(--line-strong)";e.querySelectorAll("span").forEach((e,i)=>{e.style.height=`${this._bars[i]}px`,e.style.backgroundColor=t})}setState(e){this._state=e,"idle"===e&&(this._bars=this._bars.map(()=>4)),this.render()}toggleMute(){this._isMuted=!this._isMuted,this.render()}render(){let e=this.isZh,t=this._state,i=this._isMuted,r=this._bars,n="speaking"===t?"var(--accent)":"listening"===t?"var(--green)":"thinking"===t?"var(--orange)":"var(--line-strong)";this.setHtml(`
      <div class="flex w-full max-w-sm flex-col items-center rounded-card border border-line bg-surface p-6 shadow-card">
        
        <div class="flex w-full items-center justify-between text-[11px] text-ink-3">
          <div class="flex items-center gap-1.5 font-mono">
            <span
              class="size-2 rounded-full ${"speaking"===t?"bg-green animate-pulse":"listening"===t?"bg-accent animate-pulse":"thinking"===t?"bg-orange animate-pulse":"bg-ink-3"}"
            ></span>
            <span class="capitalize font-medium text-ink-2">
              ${e?tL[t].zh:tL[t].en}
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
          ${r.map(e=>`
            <span
              class="w-1 rounded-full transition-all duration-100"
              style="height: ${e}px; background-color: ${n};"
            ></span>
          `).join("")}
        </div>

        
        <p class="mt-4 min-h-[38px] text-center text-[12px] leading-relaxed text-ink-2">
          ${e?tR[t]:tj[t]}
        </p>

        
        <div class="mt-4 flex items-center gap-1 rounded-control bg-field p-1 text-[11px]">
          ${["listening","thinking","speaking","idle"].map(i=>`
            <button
              key="${i}"
              type="button"
              data-mode="${i}"
              class="pill-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${t===i?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
            >
              ${e?tL[i].zh:tL[i].en}
            </button>
          `).join("")}
        </div>

        
        <div class="mt-5 flex w-full items-center justify-center gap-3 border-t border-line pt-4">
          <button
            type="button"
            id="btn-mute"
            class="flex size-8 items-center justify-center rounded-full border border-line transition-colors cursor-pointer ${i?"bg-red-tint text-red":"bg-field text-ink-2 hover:bg-hover hover:text-ink"}"
            title="${i?e?"取消静音":"Unmute":e?"静音":"Mute"}"
          >
            ${i?`
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
    `),this.shadowRoot?.querySelectorAll("[data-mode]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-mode");t&&this.setState(t)})}),this.shadowRoot?.querySelector("#btn-mute")?.addEventListener("click",()=>this.toggleMute()),this.shadowRoot?.querySelector("#btn-end")?.addEventListener("click",()=>this.setState("idle"))}}"u">typeof customElements&&!customElements.get("nai-audio-orb")&&customElements.define("nai-audio-orb",tZ);let tq={name:"Model Alpha",realName:"Claude 3.7 Sonnet",ttft:"340ms",throughput:"78 tok/s",cost:"$0.0024",code:`export class SlidingRateLimiter {
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
}`},tH={name:"Model Beta",realName:"Gemini 2.5 Flash",ttft:"180ms",throughput:"142 tok/s",cost:"$0.0007",code:`export async function checkRateLimit(key: string, limit = 60, windowMs = 60000) {
  const now = Date.now();
  const tx = redis.pipeline();
  tx.zremrangebyscore(key, '-inf', now - windowMs);
  tx.zadd(key, { score: now, member: crypto.randomUUID() });
  tx.zcard(key);
  tx.pexpire(key, windowMs);
  const [_, __, count] = await tx.exec();
  return Number(count) <= limit;
}`};class tB extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._voted=null}vote(e){this._voted=e,this.render()}render(){let e=this.isZh,t=this._voted,i=`
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
                  ${t?tq.realName:tq.name}
                </span>
                ${"A"===t?`
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${e?"您的选择":"Your Pick"}
                  </span>
                `:""}
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span>${tq.ttft}</span>
                <span>•</span>
                <span>${tq.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${tq.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
            </div>
          </div>

          
          <div
            class="flex flex-col rounded-control border p-3 transition-all ${"B"===t?"border-accent bg-accent-tint/20 ring-1 ring-accent":"border-line bg-inset/40"}"
          >
            <div class="flex items-center justify-between pb-2 border-b border-line/60">
              <div class="flex items-center gap-1.5">
                <span class="text-[12px] font-semibold text-ink">
                  ${t?tH.realName:tH.name}
                </span>
                ${"B"===t?`
                  <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9px] text-accent-ink font-medium">
                    ${e?"您的选择":"Your Pick"}
                  </span>
                `:""}
              </div>
              <div class="flex items-center gap-1.5 font-mono text-[10px] text-ink-3">
                <span class="text-green font-medium">${tH.ttft}</span>
                <span>•</span>
                <span class="text-green font-medium">${tH.throughput}</span>
              </div>
            </div>
            <div class="mt-2.5 overflow-x-auto rounded-control bg-page p-2.5 font-mono text-[10.5px] leading-relaxed text-ink-2">
              <pre><code>${tH.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
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
    `,i),this.shadowRoot.querySelector("#vote-a")?.addEventListener("click",()=>this.vote("A")),this.shadowRoot.querySelector("#vote-tie")?.addEventListener("click",()=>this.vote("tie")),this.shadowRoot.querySelector("#vote-b")?.addEventListener("click",()=>this.vote("B"))}}"u">typeof customElements&&!customElements.get("nai-model-arena")&&customElements.define("nai-model-arena",tB);let tI="cubic-bezier(0.16, 1, 0.3, 1)",tP=Date.UTC(2026,7,29,12,0,0)/1e3,tN=[-2.9,-3.4,-3.05,-3.86,-3.52,-4.1,-3.82,-4.41],tO=[.22,.58,.42,.91,.76,1.08,.96,1.15],tF=[274,289,264,307,331,1210,1718,2112],tV=[18,19,17,21,22,58,81,96],tD=[{name:"VAN",label:"Vanilla",pct:72.5,amount:"$51,785",cls:"bg-orange",tone:"text-orange"},{name:"CHOC",label:"Chocolate",pct:22.8,amount:"$16,278",cls:"bg-line-strong",tone:"text-ink-2"},{name:"MINT",label:"Mint",pct:4.7,amount:"$3,357",cls:"bg-line",tone:"text-ink-3"}],tW={orange:{light:"#ef720c",dark:"#d95926"},accent:{light:"#0285ff",dark:"#3987e5"},red:{light:"#e3474c",dark:"#ee5c61"}},tU=`
:host{display:flex;justify-content:center;min-height:456px;width:100%}
.insight-chart-stage{touch-action:pan-y;user-select:none;overflow:hidden}
.insight-chart-cursor{z-index:4;background:var(--ink-3);opacity:.72;pointer-events:none;width:1px;position:absolute;top:0;bottom:0}
.insight-chart-tooltip-anchor{z-index:5;pointer-events:none;position:absolute;top:9px;transform:translate(-50%)}
.insight-chart-tooltip{border:1px solid var(--tooltip-border);min-width:158px;color:var(--tooltip-fg);background:var(--tooltip-bg);box-shadow:var(--shadow-overlay);border-radius:10px;padding:9px 10px;font-size:12px}
.insight-chart-tooltip-time{color:var(--tooltip-muted);margin-bottom:7px;font-size:11px;display:block}
.insight-chart-tooltip-row{justify-content:space-between;align-items:center;gap:16px;line-height:1.65;display:flex}
.insight-chart-tooltip-label{color:var(--tooltip-muted);align-items:center;gap:7px;display:inline-flex}
.insight-chart-tooltip-row strong{color:var(--tooltip-fg);font-variant-numeric:tabular-nums;font-weight:650}
.insight-chart-tooltip-dot{border-radius:99px;flex:0 0 10px;width:10px;height:2px}
`,tK=e=>`${e>0?"+":""}${e.toFixed(2)}%`,tG=e=>`$${Math.round(e).toLocaleString("en-US")}`,tJ=e=>new Date(1e3*e),tQ=e=>{let t=tJ(e);return`${String(t.getUTCHours()).padStart(2,"0")}:${String(t.getUTCMinutes()).padStart(2,"0")}`},tY=(e,t)=>`${t?"今天":"Today,"} ${tQ(e)}`,tX=(e,t=6)=>e.map((i,r)=>({time:tP-(e.length-1-r)*t*60,value:i})),t1=(e,t)=>e.map(e=>({...e,time:e.time+t})),t0=(e,t)=>`<code class="font-mono text-[11.5px] ${"red"===t?"text-red":"text-green"}">${e}</code>`,t2=(e,t)=>`<span data-react-text-entity class="inline-flex items-center gap-1 align-baseline font-medium text-ink"><span aria-hidden="true" class="inline-block size-2.5 rounded-full ${t}"></span>@${e}</span>`,t5=0,t3=null,t4=null;function t6(){return t4||(t4=Promise.all([e.A(85837),e.A(66448),e.A(32246),e.A(6783)]).then(e=>(t3=e,e))),t4}"u">typeof navigator&&!/jsdom/i.test(navigator.userAgent)&&t6().catch(()=>{});class t8 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._page=0,this._submittedPage=null,this._hoverIndex=null,this._selectedIndex=null,this._anomalyMetric="spend",this._allocSelected="VAN",this._instanceId=`nai-insight-${t5++}`,this._chartRoot=null,this._chartModules=null,this._chartVersion=0,this._fallbackChartFrame=0,this._fallbackChartObserver=null,this._fallbackChartDraw=null,this._preserveChartOnRender=!1,this._preserveHeaderOnRender=!1}onUnmount(){this._unmountChart()}_isDark(){return document.documentElement.classList.contains("dark")}_seriesColor(e){return tW[e][this._isDark()?"dark":"light"]}_destroyFallbackChart(){this._fallbackChartFrame&&cancelAnimationFrame(this._fallbackChartFrame),this._fallbackChartFrame=0,this._fallbackChartObserver?.disconnect(),this._fallbackChartObserver=null,this._fallbackChartDraw=null}_unmountChart(){this._chartVersion+=1,this._destroyFallbackChart(),this._chartRoot?.unmount?.(),this._chartRoot=null}setPage(e){this._page=(this._page+e+3)%3,this._submittedPage=null,this._hoverIndex=null,this._selectedIndex=null,this._preserveHeaderOnRender=!0,this.render(),this._preserveHeaderOnRender=!1}setAnomalyMetric(e){this._anomalyMetric=e,this._hoverIndex=null,this._selectedIndex=null,this.shadowRoot?.querySelectorAll("#metric-spend, #metric-usage").forEach(t=>{let i=t.id===`metric-${e}`;t.setAttribute("aria-pressed",String(i)),t.className=`min-h-11 min-w-11 rounded-full px-2.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${i?"bg-surface text-ink shadow-btn":"text-ink-3 hover:text-ink-2"}`});let t=this.shadowRoot?.querySelector(".insight-chart-stage");if(t){t.setAttribute("aria-label","spend"===e?this.isZh?"支出趋势图":"Spend trend chart":this.isZh?"用电趋势图":"Usage trend chart");let i=tX("spend"===e?tF:tV,8);t.querySelectorAll(":scope > .sr-only").forEach((t,r)=>{t.id=`${this._chartId()}-point-${r}`,t.textContent=`${tY(i[r].time,this.isZh)} \xb7 ${"spend"===e?tG(i[r].value):`${Math.round(i[r].value)} kWh`}`})}this._syncChartSelection(),this._renderMountedChart()}setAllocSelected(e){this._allocSelected=e;let t=tD.find(t=>t.name===e)??tD[0],i=this.shadowRoot?.querySelector('[aria-label="Allocation segments"], [aria-label="配置分段"]');i?.querySelectorAll("button[data-allocation]").forEach(t=>{let i=t.getAttribute("data-allocation")===e;t.setAttribute("aria-pressed",String(i)),t.style.opacity=i?"1":"0.58",t.style.boxShadow=i?"inset 0 0 0 2px var(--surface)":"none";let r=t.firstElementChild;r instanceof HTMLElement&&(r.style.width=i?"calc(100% - 8px)":"0%",r.style.opacity=i?"1":"0")});let r=this.shadowRoot?.querySelector('[aria-label="Allocation legend"], [aria-label="配置图例"]');r?.querySelectorAll("button[data-allocation]").forEach(t=>{let i=t.getAttribute("data-allocation")===e;t.setAttribute("aria-pressed",String(i)),t.className=`flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-control px-1 text-[10.5px] transition-[background-color,color,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${i?"bg-field text-ink":"text-ink-2 hover:bg-hover hover:text-ink"}`});let n=i?.closest('[class~="min-h-[304px]"]');if(n instanceof HTMLElement){let e=n.children[1];e&&(e.textContent=t.amount);let i=n.lastElementChild,r=i?.firstElementChild;r&&(r.className=`block text-[11.5px] font-medium ${t.tone}`,r.textContent=t.label)}}_activeIndex(){return this._hoverIndex??this._selectedIndex}_pointIndex(e,t){let i=e.currentTarget.getBoundingClientRect();return i.width<=0?0:Math.round(Math.max(0,Math.min(1,(e.clientX-i.left)/i.width))*(t-1))}_chartKey(){return 0===this._page?"compare":"anomaly"}_chartData(){return 0===this._page?{primary:tX(tN),secondary:tX(tO)}:{primary:tX("spend"===this._anomalyMetric?tF:tV,8),secondary:null}}_chartId(){return`insight-${this._chartKey()}-${this._instanceId}`}_tooltipHtml(e){let t=this.isZh,{primary:i,secondary:r}=this._chartData(),n=i[e],a=0===this._page?[{label:"Mint Chip",value:tK(n.value),color:this._seriesColor("orange")},{label:"Pistachio",value:tK(r[e].value),color:this._seriesColor("accent")}]:[{label:"spend"===this._anomalyMetric?t?"支出":"Spend":t?"用电":"Usage",value:"spend"===this._anomalyMetric?tG(n.value):`${Math.round(n.value)} kWh`,color:this._seriesColor("red")}];return`<div id="${this._chartId()}-tooltip" role="tooltip" class="insight-chart-tooltip"><time class="insight-chart-tooltip-time" datetime="${tJ(n.time).toISOString()}">${tY(n.time,t)}</time>${a.map(e=>`<div class="insight-chart-tooltip-row"><span class="insight-chart-tooltip-label"><span aria-hidden="true" class="insight-chart-tooltip-dot" style="background:${e.color}"></span>${e.label}</span><strong>${e.value}</strong></div>`).join("")}</div>`}_syncChartSelection(){let e=this.shadowRoot?.querySelector(".insight-chart-stage");if(!(e instanceof HTMLElement))return;let{primary:t}=this._chartData(),i=this._activeIndex();if(e.querySelector(".insight-chart-cursor")?.remove(),e.querySelector(".insight-chart-tooltip-anchor")?.remove(),null===i)e.removeAttribute("aria-activedescendant");else{e.setAttribute("aria-activedescendant",`${this._chartId()}-point-${i}`);let r=i/(t.length-1)*100,n=document.createElement("span");n.className="insight-chart-cursor",n.style.left=`${r}%`;let a=document.createElement("span");a.className="insight-chart-tooltip-anchor",a.style.left=`${Math.min(Math.max(r,28),72)}%`,a.innerHTML=this._tooltipHtml(i),e.append(n,a)}let r=this.shadowRoot?.querySelector("[data-anomaly-summary]");if(r)if(null===i)r.textContent="spend"===this._anomalyMetric?this.isZh?"$2,112 阈值":"$2,112 threshold":this.isZh?"82 kWh 阈值":"82 kWh threshold";else{let e=t[i].value;r.textContent="spend"===this._anomalyMetric?tG(e):`${Math.round(e)} kWh`}}_wireChart(e){e.addEventListener("pointerdown",e=>{let t=this._pointIndex(e,8);this._selectedIndex=t,this._hoverIndex=t,this._syncChartSelection()}),e.addEventListener("pointermove",e=>{this._hoverIndex=this._pointIndex(e,8),this._syncChartSelection()});let t=()=>{this._hoverIndex=null,this._syncChartSelection()};e.addEventListener("pointerleave",t),e.addEventListener("pointercancel",t),e.addEventListener("keydown",e=>{let t=this._selectedIndex;if("Home"===e.key)t=0;else if("End"===e.key)t=7;else if("ArrowLeft"===e.key)t=null===this._selectedIndex?7:Math.max(0,this._selectedIndex-1);else if("ArrowRight"===e.key)t=null===this._selectedIndex?0:Math.min(7,this._selectedIndex+1);else{if("Escape"!==e.key)return;this._hoverIndex=null,this._selectedIndex=null,e.preventDefault(),this._syncChartSelection();return}this._hoverIndex=null,this._selectedIndex=t,e.preventDefault(),this._syncChartSelection()})}_fallbackChart(e,t){if(this._destroyFallbackChart(),e.dataset.renderer="fallback",e.innerHTML=`<div style="width:100%;height:100%;position:relative"><canvas style="display:block;width:100%;height:100%;cursor:${t}"></canvas></div>`,/jsdom/i.test(navigator.userAgent))return;let i=e.querySelector("canvas");if(!(i instanceof HTMLCanvasElement))return;let r=i.getContext("2d");if(!r)return;let n=()=>{let t=e.getBoundingClientRect();if(t.width<=0||t.height<=0)return;let n=Math.min(window.devicePixelRatio||1,3),a=Math.max(1,Math.round(t.width)),s=Math.max(1,Math.round(t.height)),o=Math.round(a*n),l=Math.round(s*n);(i.width!==o||i.height!==l)&&(i.width=o,i.height=l),i.style.width=`${a}px`,i.style.height=`${s}px`,r.setTransform(n,0,0,n,0,0),r.clearRect(0,0,a,s);let{primary:c,secondary:d}=this._chartData(),p=0===this._page?[{color:this._seriesColor("orange"),points:c},{color:this._seriesColor("accent"),points:d}]:[{color:this._seriesColor("red"),points:c}],h=p.flatMap(e=>e.points.map(e=>e.value)),u=Math.min(...h),g=Math.max(...h),m=g-u||1;u-=.12*m,g+=.12*m;let b=0===this._page?{top:24,right:0,bottom:22,left:0}:{top:18,right:0,bottom:22,left:0},x=Math.max(1,a-b.left-b.right),v=Math.max(1,s-b.top-b.bottom),f=(e,t)=>b.left+e/Math.max(1,t-1)*x,w=e=>b.top+(g-e)/(g-u)*v;if(1===this._page){r.save(),r.strokeStyle=this._isDark()?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.06)",r.lineWidth=1,r.setLineDash([1,3]);for(let e=1;e<=3;e+=1){let t=b.top+e/4*v;r.beginPath(),r.moveTo(b.left,t),r.lineTo(a-b.right,t),r.stroke()}r.restore()}p.forEach(({color:e,points:t})=>{r.save(),r.strokeStyle=e,r.lineWidth=2,r.lineCap="round",r.lineJoin="round",r.beginPath(),t.forEach((e,i)=>{let n=f(i,t.length),a=w(e.value);0===i?r.moveTo(n,a):r.lineTo(n,a)}),r.stroke();let i=t.at(-1);i&&(r.fillStyle=e,r.beginPath(),r.arc(f(t.length-1,t.length),w(i.value),3,0,2*Math.PI),r.fill()),r.restore()})};this._fallbackChartDraw=n,this._fallbackChartObserver=new ResizeObserver(n),this._fallbackChartObserver.observe(e),this._fallbackChartFrame=requestAnimationFrame(()=>{this._fallbackChartFrame=0,n()})}_livelineProps(e=Math.floor(Date.now()/1e3)-tP){let t=this._isDark();if(0===this._page){let i=tX(tN),r=tX(tO);return{data:[],value:0,series:[{id:"mint",label:"",data:t1(i,e),value:-4.41,color:this._seriesColor("orange")},{id:"pistachio",label:"",data:t1(r,e),value:1.15,color:this._seriesColor("accent")}],theme:t?"dark":"light",grid:!1,pulse:!1,window:2520,paused:!0,scrub:!1,cursor:"default",lineWidth:2,padding:{top:24,right:0,bottom:22,left:0},formatTime:t=>tQ(t-e),formatValue:tK}}let i="spend"===this._anomalyMetric?tF:tV;return{data:t1(tX(i,8),e),value:i.at(-1),theme:t?"dark":"light",color:this._seriesColor("red"),grid:!0,scrub:!1,fill:!1,pulse:!1,momentum:!1,paused:!0,window:3360,lineWidth:2,cursor:"crosshair",padding:{top:18,right:0,bottom:22,left:0},formatTime:t=>tQ(t-e),formatValue:e=>"spend"===this._anomalyMetric?tG(e):`${Math.round(e)} kWh`}}_renderMountedChart(e=Math.floor(Date.now()/1e3)-tP,t=e){if(!this._chartRoot||!this._chartModules)return void this._fallbackChartDraw?.();let{createElement:i,flushSync:r,Liveline:n}=this._chartModules;r(()=>this._chartRoot.render(i(n,{...this._livelineProps(e),key:t})))}async _mountChart(){let e=this.shadowRoot?.querySelector("[data-liveline-root]");if(!(e instanceof HTMLElement))return;let t=0===this._page?"default":"crosshair";if(this._fallbackChart(e,t),/jsdom/i.test(navigator.userAgent))return;let i=++this._chartVersion;try{let[{createElement:t},{createRoot:r},{flushSync:n},{Liveline:a}]=t3??await t6();if(i!==this._chartVersion||!e.isConnected)return;this._destroyFallbackChart(),e.dataset.renderer="liveline",this._chartModules={createElement:t,flushSync:n,Liveline:a},this._chartRoot=r(e);let s=Math.floor(Date.now()/1e3)-tP;this._renderMountedChart(s,s)}catch{this._fallbackChart(e,t)}}_compareCard(){let e=this.isZh,t=tX(tN),i=tX(tO),r=this._seriesColor("orange"),n=this._seriesColor("accent"),a=`${this._chartId()}-table`;return`<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><div class="flex items-center gap-4">${[{name:"Mint Chip",delta:"-4.41%",sub:"-$2,377.66",tone:"red",color:r},{name:"Pistachio",delta:"+1.15%",sub:"+$617.22",tone:"green",color:n}].map(e=>`<div class="min-w-0 flex-1"><span class="flex items-center gap-1.5 text-[11.5px] text-ink-2"><span aria-hidden="true" class="size-2 rounded-full" style="background:${e.color}"></span>${e.name}</span><span class="block text-[17px] font-semibold tracking-[-0.01em] tabular-nums ${"red"===e.tone?"text-red":"text-green"}">${e.delta}</span>${t0(e.sub,e.tone)}</div>`).join("")}</div><div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline"><div class="flex min-h-9 items-center justify-between border-b border-line px-2.5 py-1.5" style="min-height:36px"><span class="text-[11px] text-ink-3 tabular-nums">${e?"趋势快照":"Trend snapshot"}</span><span class="rounded-full bg-field px-2 py-0.5 text-[10.5px] font-medium text-ink-2">${e?"8 个时点":"8 points"}</span></div><div role="group" aria-label="${e?"收益对比趋势图":"Return comparison chart"}" aria-describedby="${a}" tabindex="0" class="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="height:174px"><div data-liveline-root style="height:100%;width:100%"></div>${t.map((t,r)=>`<span id="${this._chartId()}-point-${r}" class="sr-only">${tY(t.time,e)} \xb7 Mint Chip ${tK(t.value)} \xb7 Pistachio ${tK(i[r].value)}</span>`).join("")}</div></div><table id="${a}" class="sr-only" aria-label="${e?"收益对比数据":"Return comparison data"}"><thead><tr><th>${e?"时间":"Time"}</th><th>Mint Chip</th><th>Pistachio</th></tr></thead><tbody>${t.map((e,t)=>`<tr><td><time datetime="${tJ(e.time).toISOString()}">${tQ(e.time)}</time></td><td>${tK(e.value)}</td><td>${tK(i[t].value)}</td></tr>`).join("")}</tbody></table></div>`}_anomalyCard(){let e=this.isZh,t=tX(tF,8),i=tX(tV,8),r="spend"===this._anomalyMetric?t:i,n=tG(tF.at(-1));return`<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><div class="flex min-h-8 items-center justify-between gap-3" style="min-height:32px"><span class="flex min-w-0 items-center gap-1.5 text-[12px] font-medium text-ink"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"></path></svg><span class="truncate">${e?"冷柜支出偏高":"High freezer spend"}</span></span><span class="rounded-full bg-red-tint px-2 py-0.5 text-[10.5px] font-medium text-red">${e?"异常":"Anomaly"}</span></div><div class="mt-2 overflow-hidden rounded-control bg-inset shadow-hairline"><div class="flex min-h-12 items-center justify-between gap-2 border-b border-line px-2.5 py-1.5"><span data-anomaly-summary class="min-w-0 truncate text-[11px] text-ink-3 tabular-nums">${"spend"===this._anomalyMetric?e?"$2,112 阈值":"$2,112 threshold":e?"82 kWh 阈值":"82 kWh threshold"}</span><span role="group" aria-label="${e?"异常指标":"Anomaly metric"}" class="flex shrink-0 rounded-full bg-field p-0.5">${["spend","usage"].map(t=>`<button id="metric-${t}" type="button" aria-pressed="${this._anomalyMetric===t}" class="min-h-11 min-w-11 rounded-full px-2.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${this._anomalyMetric===t?"bg-surface text-ink shadow-btn":"text-ink-3 hover:text-ink-2"}">${"spend"===t?e?"支出":"Spend":e?"用电":"Usage"}</button>`).join("")}</span></div><div role="group" aria-label="${"spend"===this._anomalyMetric?e?"支出趋势图":"Spend trend chart":e?"用电趋势图":"Usage trend chart"}" tabindex="0" class="insight-chart-stage relative h-[174px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="height:174px"><div data-liveline-root style="height:100%;width:100%"></div>${r.map((t,i)=>`<span id="${this._chartId()}-point-${i}" class="sr-only">${tY(t.time,e)} \xb7 ${"spend"===this._anomalyMetric?tG(t.value):`${Math.round(t.value)} kWh`}</span>`).join("")}</div></div><div class="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1" style="column-gap:8px"><span class="text-[17px] font-semibold tracking-[-0.01em] text-ink tabular-nums">${e?`${n} 已支出`:`${n} spent`}</span>${t0("+$1,834.66","red")}<span class="text-[11px] text-ink-3">${e?"较 3 个月均值":"vs 3 months"}</span></div></div>`}_allocationCard(){let e=this.isZh,t=tD.find(e=>e.name===this._allocSelected)??tD[0];return`<div class="min-h-[304px] rounded-card bg-surface p-3 shadow-hairline"><span data-react-text-allocation-title class="flex items-center gap-1.5 text-[12px] font-medium text-ink"><span class="flex size-4 items-center justify-center rounded-full bg-orange text-[8px] font-bold text-white">V</span>Vanilla ${e?"口味配置":"allocation"}</span><span class="mt-1 block text-[20px] font-semibold tracking-[-0.01em] text-ink tabular-nums">${t.amount}</span><div class="mt-3 flex h-12 gap-0.5 overflow-hidden rounded-full bg-field p-0.5" role="group" aria-label="${e?"配置分段":"Allocation segments"}">${tD.map(e=>`<button type="button" data-allocation="${e.name}" aria-pressed="${this._allocSelected===e.name}" aria-label="${e.label}: ${e.pct}%" class="relative h-full overflow-hidden rounded-full ${e.cls} transition-[opacity,transform,box-shadow] duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset" style="width:${e.pct}%;opacity:${this._allocSelected===e.name?1:.58};box-shadow:${this._allocSelected===e.name?"inset 0 0 0 2px var(--surface)":"none"};transition-timing-function:${tI}"><span aria-hidden="true" class="absolute inset-y-1 left-1 rounded-full bg-white/20 transition-[width,opacity] duration-500" style="width:${this._allocSelected===e.name?"calc(100% - 8px)":"0%"};opacity:${+(this._allocSelected===e.name)};transition-timing-function:${tI}"></span></button>`).join("")}</div><div class="mt-2 grid grid-cols-3 gap-1" role="group" aria-label="${e?"配置图例":"Allocation legend"}">${tD.map(e=>`<button type="button" data-allocation="${e.name}" aria-pressed="${this._allocSelected===e.name}" class="flex min-h-11 min-w-0 items-center justify-center gap-1 rounded-control px-1 text-[10.5px] transition-[background-color,color,transform] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${this._allocSelected===e.name?"bg-field text-ink":"text-ink-2 hover:bg-hover hover:text-ink"}"><span aria-hidden="true" class="size-1.5 shrink-0 rounded-full ${e.cls}"></span><span class="truncate">${e.name}</span><span class="shrink-0 tabular-nums">${e.pct}%</span></button>`).join("")}</div><div class="mt-3 min-h-16 rounded-control bg-inset px-2.5 py-2 shadow-hairline"><span class="block text-[11.5px] font-medium ${t.tone}">${t.label}</span><span class="mt-1 block text-[11px] leading-relaxed text-ink-3">${e?"当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。":"Contribution snapshot across current inventory value. Segment selection changes the inspected group without moving the card."}</span></div></div>`}_pageMeta(){let e=this.isZh;return 0===this._page?{prose:e?`你的 ${t2("Creamery","bg-orange")} 中表现最差的是 Rocky Road——下跌 ${t0("-6%","red")}，合 ${t0("-$2,453.44","red")}。`:`The worst performer in your ${t2("Creamery","bg-orange")} is Rocky Road — down ${t0("-6%","red")} or ${t0("-$2,453.44","red")}.`,pill:e?"需要重新平衡口味组合吗？":"Should I rebalance flavors?"}:1===this._page?{prose:e?`<span class="font-medium text-ink">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 ${t0("+$1,834.66","red")}。`:`Unusually high freezer bill on <span class="font-medium text-ink">Dec 13</span> — ${t0("+$1,834.66","red")} above your average.`,pill:e?"获取降低冷柜成本的建议":"Get tips on cutting freezer costs"}:{prose:e?`你在 ${t2("Vanilla","bg-orange")} 上投入过重——它占你库存的 <span class="font-medium text-ink">72.5%</span>。`:`You're heavily invested in ${t2("Vanilla","bg-orange")} — it's <span class="font-medium text-ink">72.5%</span> of your case.`,pill:e?"如果看季节性口味，会有什么变化？":"If we look at seasonals, what changes?"}}_submitFollowUp(e,t){this._submittedPage=this._page,e.disabled=!0,e.className="min-h-11 rounded-full px-3 text-left text-[12px] shadow-btn transition-[background-color,color,opacity,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-not-allowed bg-accent-tint font-medium text-accent-ink",e.textContent=this.isZh?"问题已添加":"Question added";let i=document.createElement("span");i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.className="text-[11px] text-ink-3",i.textContent=this.isZh?"后续问题已添加到对话。":"Follow-up question added to the conversation.",t.append(i)}_alignReactTextNodes(){this.shadowRoot?.querySelectorAll("[data-react-text-entity]").forEach(e=>{let t=[...e.childNodes].find(e=>e.nodeType===Node.TEXT_NODE&&e.textContent?.startsWith("@"));t instanceof Text&&t.length>1&&t.splitText(1),e.removeAttribute("data-react-text-entity")});let e=this.shadowRoot?.querySelector("[data-react-text-allocation-title]"),t=e?[...e.childNodes].find(e=>e.nodeType===Node.TEXT_NODE&&e.textContent?.startsWith("Vanilla ")):null;t instanceof Text&&t.length>8&&t.splitText(8),e?.removeAttribute("data-react-text-allocation-title")}render(){let e=this._preserveHeaderOnRender?this.shadowRoot?.querySelector('[class~="min-h-[456px]"]')?.firstElementChild:null,t=this._preserveChartOnRender?this.shadowRoot?.querySelector("[data-liveline-root]"):null;t instanceof HTMLElement||this._unmountChart();let i=this.isZh,r=this._pageMeta(),n=0===this._page?this._compareCard():1===this._page?this._anomalyCard():this._allocationCard(),a=this._submittedPage===this._page,s="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page";if(this.setHtml(`<div class="min-h-[456px] w-full max-w-86"><div class="flex min-h-11 items-center justify-between"><span class="flex items-baseline gap-1.5"><span class="text-[13px] font-semibold text-ink">${i?"智能洞察":"Insights"}</span><span class="text-[13px] text-ink-3 tabular-nums">3</span></span><span class="flex items-center gap-1"><button id="btn-prev" type="button" aria-label="${i?"上一条洞察":"Previous insight"}" class="flex size-11 items-center justify-center rounded-control text-ink-3 transition-[background-color,color,transform] duration-100 hover:bg-hover hover:text-ink active:scale-[0.96] ${s}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"></path></svg></button><button id="btn-next" type="button" aria-label="${i?"下一条洞察":"Next insight"}" class="flex size-11 items-center justify-center rounded-control text-ink-3 transition-[background-color,color,transform] duration-100 hover:bg-hover hover:text-ink active:scale-[0.96] ${s}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg></button></span></div><div style="animation:fade-up 300ms cubic-bezier(0.23,1,0.32,1) both"><p class="mt-1 text-[12.5px] leading-relaxed text-ink-2">${r.prose}</p><div class="mt-2">${n}</div><div data-followup-container class="mt-2 flex flex-wrap items-center gap-2"><button data-followup type="button" ${a?"disabled":""} class="min-h-11 rounded-full px-3 text-left text-[12px] shadow-btn transition-[background-color,color,opacity,transform] active:scale-[0.98] ${s} ${a?"cursor-not-allowed bg-accent-tint font-medium text-accent-ink":"bg-surface text-ink hover:bg-hover"}">${a?i?"问题已添加":"Question added":r.pill}</button>${a?`<span role="status" aria-live="polite" class="text-[11px] text-ink-3">${i?"后续问题已添加到对话。":"Follow-up question added to the conversation."}</span>`:""}</div></div></div>`,tU),this._alignReactTextNodes(),e instanceof HTMLElement){let t=this.shadowRoot?.querySelector('[class~="min-h-[456px]"]')?.firstElementChild;t?.replaceWith(e)}if(t instanceof HTMLElement){let e=this.shadowRoot?.querySelector("[data-liveline-root]");e?.replaceWith(t)}this._page<2&&(t instanceof HTMLElement&&this._chartRoot?this._renderMountedChart():this._mountChart()),e instanceof HTMLElement||(this.shadowRoot?.querySelector("#btn-prev")?.addEventListener("click",()=>this.setPage(-1)),this.shadowRoot?.querySelector("#btn-next")?.addEventListener("click",()=>this.setPage(1))),this.shadowRoot?.querySelector("#metric-spend")?.addEventListener("click",()=>this.setAnomalyMetric("spend")),this.shadowRoot?.querySelector("#metric-usage")?.addEventListener("click",()=>this.setAnomalyMetric("usage")),this.shadowRoot?.querySelectorAll("[data-allocation]").forEach(e=>{e.addEventListener("click",()=>this.setAllocSelected(e.getAttribute("data-allocation")))});let o=this.shadowRoot?.querySelector(".insight-chart-stage");o instanceof HTMLElement&&this._wireChart(o);let l=this.shadowRoot?.querySelector("[data-followup]"),c=this.shadowRoot?.querySelector("[data-followup-container]");l instanceof HTMLButtonElement&&c instanceof HTMLElement&&l.addEventListener("click",()=>this._submitFollowUp(l,c))}}"u">typeof customElements&&!customElements.get("nai-insight-cards")&&customElements.define("nai-insight-cards",t8);let t7=[{key:"high",bodyZh:'建议从供应商 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> 追加补货华夫脆筒，预计交付周期为 <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>。',bodyEn:'Reorder waffle cones from <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">cone_king</code> with lead time <code class="rounded-md bg-accent-tint px-1.5 py-0.5 font-mono text-[12px] text-accent-ink">7_days</code>.',shortZh:"从 cone_king 补货 · 7天到货",shortEn:"Reorder from cone_king · 7-day lead",signal:3,tone:"var(--green)",labelZh:"高置信度推荐",labelEn:"High confidence",ctaZh:"采纳建议",ctaEn:"Accept",ctaStyle:"bg-accent text-white"},{key:"review",bodyZh:'为迎接旺季需求，建议将香草原料配方切换为 <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code>。',bodyEn:'Switch vanilla to <code class="rounded-md bg-orange-tint px-1.5 py-0.5 font-mono text-[12px] text-orange">vanilla_madagascar</code> for peak season.',shortZh:"切换为马达加斯加香草配方",shortEn:"Switch to vanilla_madagascar",signal:2,tone:"var(--orange)",labelZh:"需要人工复核",labelEn:"Needs review",ctaZh:"配置参数",ctaEn:"Configure",ctaStyle:"bg-ink text-canvas"},{key:"none",bodyZh:"对所有库存 SKU 发起全量紧急补货流程。",bodyEn:"Trigger a full restock cycle across every catalog SKU.",shortZh:"全品类 SKU 紧急补货",shortEn:"Full restock across every SKU",signal:0,tone:"var(--line-strong)",labelZh:"无足够置信信号",labelEn:"No signal",ctaZh:"忽略",ctaEn:"Dismiss",ctaStyle:"bg-field text-ink-3"}];class t9 extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._activeKey="high",this._openDrawer=!1}setActiveKey(e){this._activeKey=e,this._openDrawer=!1,this.render()}toggleDrawer(){this._openDrawer=!this._openDrawer,this.render()}render(){let e=this.isZh,t=t7.find(e=>e.key===this._activeKey)||t7[0];this.setHtml(`
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
              ${t7.map(t=>{let i=t.key===this._activeKey;return`
                  <button
                    key="${t.key}"
                    type="button"
                    data-key="${t.key}"
                    class="alt-option flex w-full items-center justify-between rounded-control p-2 text-left text-[12px] transition-colors cursor-pointer ${i?"bg-accent-tint text-accent-ink font-medium":"hover:bg-hover text-ink-2"}"
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
    `),this.shadowRoot?.querySelector("#btn-toggle-alt")?.addEventListener("click",()=>this.toggleDrawer()),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setActiveKey(t)})})}}async function ie(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let i=document.execCommand("copy");return t.remove(),i}"u">typeof customElements&&!customElements.get("nai-recommendation-card")&&customElements.define("nai-recommendation-card",t9);class it extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._revealed=!1,this._copied=!1,this._copyError=!1,this._apiKey="dsk-live-9824f1a8c901e47d8b3a5c2e"}toggleReveal(){this._revealed=!this._revealed,this.render()}async handleCopy(){this._copyError=!1;try{if(!await ie(this._apiKey)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh,t=this._revealed,i=this._copied,r=this._copyError,n=this._apiKey;this.setHtml(`
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
              value="${n}"
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
                ${r?`
                  <span role="status" aria-live="polite" class="text-red font-medium">
                    ${e?"复制失败":"Copy failed"}
                  </span>
                `:i?`
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
    `),this.shadowRoot?.querySelector("#btn-reveal")?.addEventListener("click",()=>this.toggleReveal()),this.shadowRoot?.querySelector("#btn-copy")?.addEventListener("click",()=>this.handleCopy());let a=this.shadowRoot?.querySelector("#sensitive-api-token");a?.addEventListener("input",e=>{this._apiKey=e.target.value})}}"u">typeof customElements&&!customElements.get("nai-sensitive-input")&&customElements.define("nai-sensitive-input",it);class ii extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._isOpen=!0,this._activeTab="metrics"}toggleOpen(){this._isOpen=!this._isOpen,this.render()}setActiveTab(e){this._activeTab=e,this.render()}render(){let e=this.isZh,t=this._isOpen,i=this._activeTab,r=`
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
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"metrics"===i?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
                >
                  ${e?"遥测监控指标":"Telemetry Metrics"}
                </button>
                <button
                  type="button"
                  id="tab-events"
                  class="tab-btn rounded-chip px-2.5 py-1 font-medium transition-colors cursor-pointer ${"events"===i?"bg-surface text-ink shadow-sm":"text-ink-3 hover:text-ink-2"}"
                >
                  ${e?"实时审计事件":"Live Audit Events"}
                </button>
              </div>

              <span class="font-mono text-[10.5px] text-ink-3">
                ${e?"5秒前已更新":"Last updated 5s ago"}
              </span>
            </div>

            <!-- Tab Body -->
            ${"metrics"===i?`
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
    `;this.setHtml(r),this.shadowRoot.querySelector("#btn-toggle")?.addEventListener("click",()=>this.toggleOpen()),this.shadowRoot.querySelector("#tab-metrics")?.addEventListener("click",()=>this.setActiveTab("metrics")),this.shadowRoot.querySelector("#tab-events")?.addEventListener("click",()=>this.setActiveTab("events"))}}"u">typeof customElements&&!customElements.get("nai-layer-card")&&customElements.define("nai-layer-card",ii);let ir=[{key:"activity",labelEn:"Home",labelZh:"首页",section:"Workspace"},{key:"tasks",labelEn:"Agent tasks",labelZh:"智能体任务",section:"Workspace",count:!0},{key:"dashboard",labelEn:"Inbox",labelZh:"收件箱",section:"Workspace"},{key:"spaces",labelEn:"Suppliers",labelZh:"供应商",section:"Objects",plus:!0},{key:"analytics",labelEn:"Inventory",labelZh:"库存",section:"Objects"}];class ia extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._active="tasks",this._hovered=null,this._query="",this._badge=4}setActive(e){this._active=e,this.render()}setHovered(e){this._hovered=e,this._updateIndicator()}addNewTask(){this._badge++,this._active="tasks",this.render()}onMount(){this._updateIndicator()}_updateIndicator(){let e=this._hovered||this._active,t=this.shadowRoot?.querySelector(`[data-key="${e}"]`),i=this.shadowRoot?.querySelector("#nav-indicator"),r=this.shadowRoot?.querySelector("#nav-list-container");if(t&&i&&r){let e=r.getBoundingClientRect(),n=t.getBoundingClientRect();i.style.top=`${n.top-e.top}px`,i.style.height=`${n.height}px`,i.style.opacity="1"}else i&&(i.style.opacity="0")}render(){let e=this.isZh,t=this._active,i=this._badge,r=this._query;this.setHtml(`
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
            value="${r}"
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

          ${[{key:"Workspace",label:e?"工作区":"Workspace"},{key:"Objects",label:e?"对象":"Objects"}].map(r=>`
            <div>
              <div class="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">
                ${r.label}
              </div>
              <div class="flex flex-col gap-px">
                ${ir.filter(e=>e.section===r.key).map(r=>{var n;let a=r.key===t;return`
                    <button
                      type="button"
                      data-key="${r.key}"
                      aria-current="${a?"page":"false"}"
                      class="group relative z-10 flex w-full items-center gap-2 rounded-[7px] px-2 py-1.5 text-left transition-[color,transform] duration-150 active:scale-[0.96] cursor-pointer"
                    >
                      <span class="${a?"text-ink":"text-ink-3"}">
                        ${n=r.key,`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${({activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2" />',tasks:'<g><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></g>',spaces:'<g><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></g>',dashboard:'<g><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>',analytics:'<g><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>'})[n]||""}
    </svg>
  `}
                      </span>
                      <span
                        class="min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${a?"font-medium text-ink":"text-ink-2"}"
                      >
                        ${e?r.labelZh:r.labelEn}
                      </span>
                      ${r.count?`
                        <span
                          class="flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums ${a?"bg-surface text-ink-2 shadow-hairline":"bg-accent-tint text-accent-ink"}"
                          style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;"
                        >
                          ${i}
                        </span>
                      `:""}
                      ${r.plus?`
                        <span
                          class="flex size-4.5 items-center justify-center rounded-[5px] text-ink-3 opacity-0 transition-[background-color,color,opacity] duration-100 group-hover:opacity-100 hover:bg-line/70 hover:text-ink-2 ${a?"opacity-100":""}"
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
    `),this.shadowRoot?.querySelector("#btn-new-task")?.addEventListener("click",()=>this.addNewTask()),this.shadowRoot?.querySelectorAll("[data-key]").forEach(e=>{let t=e.getAttribute("data-key");e.addEventListener("mouseenter",()=>this.setHovered(t)),e.addEventListener("click",()=>{t&&this.setActive(t)})}),this.shadowRoot?.querySelector("#nav-list-container")?.addEventListener("mouseleave",()=>{this.setHovered(null)});let n=this.shadowRoot?.querySelector("#sidebar-search-input");n?.addEventListener("input",e=>{this._query=e.target.value}),this._updateIndicator()}}"u">typeof customElements&&!customElements.get("nai-sidebar-nav")&&customElements.define("nai-sidebar-nav",ia);let is=[{en:"Forecast summer demand",zh:"预测夏季需求"},{en:"Find waffle cone suppliers",zh:"寻找华夫脆筒供应商"},{en:"Compare seasonal flavors",zh:"对比季节限定口味"},{en:"Draft flavor launch plan",zh:"起草新口味上市计划"},{en:"Check cold-chain status",zh:"检查冷链状态"},{en:"Audit sugar costs",zh:"核算糖原料成本"},{en:"Retire low sellers",zh:"下架滞销口味"}];class io extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._query=""}setQuery(e){this._query=e,this.render()}render(){let e=this.isZh,t=this._query,i=t=>e?t.zh:t.en,r=t?is.filter(e=>i(e).toLowerCase().includes(t.toLowerCase())):is.slice(0,5),n=t.length>2&&0===r.length;this.setHtml(`
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

          
          ${n?`
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
              ${r.map(e=>`
                <button
                  key="${e.en}"
                  type="button"
                  data-text="${i(e)}"
                  class="result-item flex h-8 w-full items-center rounded-[6px] px-2 text-left text-[13px] text-ink transition-colors duration-100 hover:bg-hover cursor-pointer"
                  style="animation: fade-in 200ms ease-out both;"
                >
                  ${i(e)}
                </button>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    `);let a=this.shadowRoot?.querySelector("#search-input");a&&a.addEventListener("input",e=>{this._query=e.target.value,this.render();let t=this.shadowRoot?.querySelector("#search-input");t&&(t.focus(),t.selectionStart=t.selectionEnd=this._query.length)}),this.shadowRoot?.querySelector("#btn-clear")?.addEventListener("click",()=>{this.setQuery("")}),this.shadowRoot?.querySelectorAll(".result-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-text");t&&this.setQuery(t)})})}}"u">typeof customElements&&!customElements.get("nai-search")&&customElements.define("nai-search",io);let il=["row","col","grid"],ic=[{key:"Seasonal",labelEn:"Seasonal",labelZh:"季节限定"},{key:"Classic",labelEn:"Classic",labelZh:"经典"},{key:"Limited",labelEn:"Limited",labelZh:"限量"}];class id extends l{static get observedAttributes(){return["lang"]}constructor(){super(),this._seg=0,this._width=324,this._height=96,this._radius=28,this._opacity=100,this._menuOpen=!1,this._typeValue=null,this._dragState=null}setSeg(e){this._seg=e,this.render()}setTypeValue(e){this._typeValue=e,this._menuOpen=!1,this.render()}toggleMenu(){this._menuOpen=!this._menuOpen,this.render()}_clamp(e,t,i){return Math.min(i,Math.max(t,Math.round(e)))}_renderScrubField(e,t,i,r,n,a=""){let s="width"===e&&324!==i||"height"===e&&96!==i||"radius"===e&&28!==i||"opacity"===e&&100!==i;return`
      <label
        class="flex h-6.5 min-w-0 items-center gap-1 rounded-chip py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200"
        style="
          background: ${s?"var(--accent-tint)":"var(--field)"};
          box-shadow: ${s?"0 0 0 1px var(--accent)":"none"};
        "
        data-field="${e}"
        data-min="${r}"
        data-max="${n}"
      >
        
        <span
          role="slider"
          aria-label="${t}"
          aria-valuenow="${i}"
          aria-valuemin="${r}"
          aria-valuemax="${n}"
          tabindex="0"
          data-field="${e}"
          class="scrub-handle flex h-full shrink-0 cursor-ew-resize touch-none items-center rounded-[4px] px-0.5 text-[12px] text-ink-3 select-none hover:text-ink-2 focus-visible:text-accent-ink focus-visible:outline-none"
        >
          ${t}
        </span>
        <input
          inputmode="numeric"
          value="${i}"
          data-field="${e}"
          aria-label="${t} value"
          class="scrub-input min-w-0 flex-1 bg-transparent text-[12px] text-ink tabular-nums outline-none"
        />
        ${a?`<span class="shrink-0 pr-0.5 text-[11.5px] text-ink-3">${a}</span>`:""}
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
            ${il.map((e,t)=>{let i;return`
              <button
                key="${e}"
                type="button"
                data-idx="${t}"
                aria-label="${e} layout"
                aria-pressed="${t===this._seg}"
                class="seg-btn relative z-10 flex h-6 items-center justify-center transition-colors duration-200 cursor-pointer ${t===this._seg?"text-accent":"text-ink-3"}"
              >
                ${i="size-1.5 rounded-[2px] border-[1.2px] border-current","row"===e?`
      <span class="flex gap-0.5">
        <span class="${i}"></span>
        <span class="${i}"></span>
        <span class="${i}"></span>
      </span>
    `:"col"===e?`
      <span class="flex flex-col gap-0.5">
        <span class="${i}"></span>
        <span class="${i}"></span>
      </span>
    `:`
    <span class="grid grid-cols-2 gap-0.5">
      <span class="${i}"></span>
      <span class="${i}"></span>
      <span class="${i}"></span>
      <span class="${i}"></span>
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
                ${null!==this._typeValue?e?ic.find(e=>e.key===this._typeValue)?.labelZh:this._typeValue:e?"选择类型":"Select type"}
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
                ${ic.map(t=>`
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
    `),this.shadowRoot?.querySelectorAll("[data-idx]").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx")||"0",10);this.setSeg(t)})}),this.shadowRoot?.querySelectorAll(".scrub-handle").forEach(e=>{let t=e.getAttribute("data-field"),i=e.closest("label"),r=parseInt(i?.getAttribute("data-min")||"0",10),n=parseInt(i?.getAttribute("data-max")||"999",10);e.addEventListener("pointerdown",i=>{e.setPointerCapture(i.pointerId);let a="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;this._dragState={x:i.clientX,val:a,fieldKey:t,min:r,max:n}}),e.addEventListener("pointermove",e=>{if(!this._dragState)return;let t=(e.clientX-this._dragState.x)/2,i=this._clamp(this._dragState.val+t,this._dragState.min,this._dragState.max);"width"===this._dragState.fieldKey?this._width=i:"height"===this._dragState.fieldKey?this._height=i:"radius"===this._dragState.fieldKey?this._radius=i:"opacity"===this._dragState.fieldKey&&(this._opacity=i),this.render()}),e.addEventListener("pointerup",()=>{this._dragState=null}),e.addEventListener("keydown",e=>{let i=e.shiftKey?10:1,a="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;if("ArrowUp"===e.key||"ArrowRight"===e.key){e.preventDefault();let s=this._clamp(a+i,r,n);"width"===t?this._width=s:"height"===t?this._height=s:"radius"===t?this._radius=s:"opacity"===t&&(this._opacity=s),this.render()}else if("ArrowDown"===e.key||"ArrowLeft"===e.key){e.preventDefault();let s=this._clamp(a-i,r,n);"width"===t?this._width=s:"height"===t?this._height=s:"radius"===t?this._radius=s:"opacity"===t&&(this._opacity=s),this.render()}})}),this.shadowRoot?.querySelectorAll(".scrub-input").forEach(e=>{let t=e.getAttribute("data-field"),i=e.closest("label"),r=parseInt(i?.getAttribute("data-min")||"0",10),n=parseInt(i?.getAttribute("data-max")||"999",10);e.addEventListener("input",e=>{let i=Number(e.target.value.replace(/[^\d-]/g,""));if(!Number.isNaN(i)){let e=this._clamp(i,r,n);"width"===t?this._width=e:"height"===t?this._height=e:"radius"===t?this._radius=e:"opacity"===t&&(this._opacity=e)}}),e.addEventListener("blur",()=>{this.render()})}),this.shadowRoot?.querySelector("#btn-dropdown")?.addEventListener("click",()=>this.toggleMenu()),this.shadowRoot?.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setTypeValue(t)})})}}"u">typeof customElements&&!customElements.get("nai-fine-tune-card")&&customElements.define("nai-fine-tune-card",id);let ip=[{id:"s1",titleEn:"Refactor the churn scheduler",titleZh:"重构搅拌排期器",short:"01a0492d",live:!0},{id:"s2",titleEn:"Audit supplier import jobs",titleZh:"审计供应商导入任务",short:"01a04771",live:!0},{id:"s3",titleEn:"Draft the summer menu copy",titleZh:"起草夏季菜单文案",short:"01a03fe0",live:!1},{id:"s4",titleEn:"Investigate freezer telemetry gaps",titleZh:"排查冷冻遥测数据缺口",short:"01a02b9c",live:!1}];class ih extends l{static get observedAttributes(){return["lang","visual-case"]}constructor(){super(),this._active="s1",this._hovered=null,this._badges={s1:2,s2:1},this._tick=0}onMount(){"selected"===this.getAttribute("visual-case")&&(this._active="s2",this._badges={s1:2,s2:0}),this._scheduleTick()}_scheduleTick(){this.registerTimeout(()=>{this._tick=(this._tick+1)%ip.length;let e=ip[this._tick];e.live&&(this._badges[e.id]=(this._badges[e.id]??0)+1),this.render(),this._mounted&&this._scheduleTick()},2600)}_moveGlide(){let e=this.shadowRoot?.querySelector(".nav-glide"),t=this.shadowRoot?.querySelector(".roster"),i=this.shadowRoot?.querySelector(`[data-id="${this._hovered??this._active}"]`);if(!e||!t)return;if(!i){e.style.opacity="0";return}let r=t.getBoundingClientRect(),n=i.getBoundingClientRect();e.style.top=`${n.top-r.top}px`,e.style.height=`${n.height}px`,e.style.opacity="1"}_syncHighlightedRows(){let e=this._hovered??this._active;this.shadowRoot?.querySelectorAll(".row").forEach(t=>{t.dataset.active=String(t.getAttribute("data-id")===e)}),this._moveGlide()}render(){let e=this.isZh,t=ip.filter(e=>e.live).length,i=this._hovered??this._active;this.setHtml(`
      <div class="w-64 rounded-card bg-surface p-2 shadow-raised">
        <div class="flex items-center justify-between px-2 pb-1 pt-1">
          <span class="text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-3">${e?"会话":"Sessions"}</span>
          <span class="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-tint px-1 text-[10px] font-semibold tabular-nums text-accent-ink">${t}</span>
        </div>
        <div class="roster relative flex flex-col gap-px">
          <span aria-hidden="true" class="nav-glide pointer-events-none absolute inset-x-0 rounded-[7px] bg-hover"
            style="opacity: 0; transition: top 220ms cubic-bezier(0.23,1,0.32,1), height 220ms cubic-bezier(0.23,1,0.32,1), opacity 150ms ease;"></span>
          ${ip.map(t=>{let r=t.id===this._active,n=this._badges[t.id]??0;return`
              <button type="button" data-id="${t.id}" data-active="${i===t.id}"
                class="row relative z-10 flex w-full flex-col gap-0.5 rounded-[7px] px-2 py-1.5 text-left transition-transform duration-150 active:scale-[0.98]"
                ${r?'aria-current="page"':""}>
                <span class="flex min-w-0 items-center gap-1.5">
                  ${t.live?'<span class="size-1.5 shrink-0 animate-pulse rounded-full bg-green"></span>':""}
                  <span class="min-w-0 flex-1 truncate text-[13px] transition-colors duration-150 ${r?"font-medium text-ink":"text-ink-2"}">
                    ${e?t.titleZh:t.titleEn}
                  </span>
                  ${n>0?`
                    <span aria-label="${e?`${n} 条未读事件`:`${n} unread event${1===n?"":"s"}`}"
                      class="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${r?"bg-surface text-ink-2 shadow-hairline":"bg-accent-tint text-accent-ink"}"
                      style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;">${n}</span>
                  `:""}
                </span>
                <span class="truncate pl-3 font-mono text-[10.5px] text-ink-3">
                  ${t.short}${t.live?"":` \xb7 ${e?"空闲":"idle"}`}
                </span>
              </button>
            `}).join("")}
        </div>
        <div class="mt-1 border-t border-line px-2 pb-1 pt-1.5 text-[11px] text-ink-3">
          ${e?"活动会话实时推送":"Live sessions stream in real time"}
        </div>
      </div>
    `),this.shadowRoot?.querySelectorAll(".row").forEach(e=>{let t=e.getAttribute("data-id");e.addEventListener("mouseenter",()=>{this._hovered=t,this._syncHighlightedRows()}),e.addEventListener("mouseleave",()=>{this._hovered=null,this._syncHighlightedRows()}),e.addEventListener("focus",()=>{this._hovered=t,this._syncHighlightedRows()}),e.addEventListener("blur",()=>{this._hovered=null,this._syncHighlightedRows()}),e.addEventListener("click",()=>{this._active=t,this._badges[t]=0,this.render()})}),this._moveGlide()}}"u">typeof customElements&&!customElements.get("nai-session-list")&&customElements.define("nai-session-list",ih);let iu=[{key:"deepseek",kind:"oauth",scope:"chat.completions, reasoner"},{key:"openai",kind:"api-key",scope:"responses, embeddings"},{key:"e2b",kind:"api-key",scope:"sandboxes:write"}],ig="dsk-live-9824f1a8c901";class im extends l{static get observedAttributes(){return["lang","visual-case"]}constructor(){super(),this._configured={deepseek:!1,openai:!0,e2b:!1},this._flowKey=null,this._phase="idle",this._secret="",this._revealed=!1,this._scheduleVersion=0}onMount(){"provider-switched"===this.getAttribute("visual-case")&&this._beginFlow("e2b"),this._restartSchedule()}_beginFlow(e){this._flowKey=e,this._phase="prompt",this._secret="",this._revealed=!1}_withdrawFlow(){this._flowKey=null,this._phase="idle",this._secret="",this._revealed=!1}_restartSchedule(){this._scheduleVersion+=1,this._schedule(this._scheduleVersion)}_schedule(e){if(e===this._scheduleVersion){if("idle"===this._phase&&null===this._flowKey)return void this.registerTimeout(()=>{e===this._scheduleVersion&&(this._beginFlow("deepseek"),this.render(),this._schedule(e))},1400);if("prompt"===this._phase)return void(this._secret.length<ig.length?this.registerTimeout(()=>{e===this._scheduleVersion&&(this._secret=ig.slice(0,this._secret.length+1),this._syncSecretInput(),this._schedule(e))},110):this.registerTimeout(()=>{e===this._scheduleVersion&&(this._phase="settling",this.render(),this._schedule(e))},500));if("settling"===this._phase)return void this.registerTimeout(()=>{e===this._scheduleVersion&&(this._configured[this._flowKey??"deepseek"]=!0,this._phase="done",this.render(),this._schedule(e))},900);"done"===this._phase&&this.registerTimeout(()=>{e===this._scheduleVersion&&(this._flowKey=null,this._phase="idle",this._secret="",this._revealed=!1,this._configured.deepseek=!1,this.render(),this._schedule(e))},3400)}}_syncSecretInput(){let e=this.shadowRoot?.querySelector(".secret-input");e&&(e.value=this._secret);let t=this.shadowRoot?.querySelector(".authorize-btn");t&&(t.disabled=0===this._secret.length)}render(){let e=this.isZh,t=null!==this._flowKey&&"idle"!==this._phase,i=this.shadowRoot?.querySelector(".secret-input"),r=this.shadowRoot?.activeElement===i;this.setHtml(`
      <div class="w-full max-w-lg rounded-card border border-line bg-surface p-5 shadow-card">
        <div class="flex items-center justify-between border-b border-line pb-3.5">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
              </svg>
            </span>
            <div>
              <h3 class="text-[13px] font-semibold text-ink">${e?"授权与凭据目录":"Authorization Directory"}</h3>
              <p class="text-[11px] text-ink-3">${e?"凭据只写入不展示；配置状态是唯一事实":"Secrets are write-only; configured state is the only display"}</p>
            </div>
          </div>
          <span class="rounded-chip border border-line bg-inset px-2 py-0.5 font-mono text-[10px] text-ink-3">
            ${Object.values(this._configured).filter(Boolean).length}/${iu.length} ${e?"已配置":"configured"}
          </span>
        </div>

        <div class="mt-3 flex flex-col gap-2">
          ${iu.map(t=>{let i=this._configured[t.key],r=this._flowKey===t.key&&"idle"!==this._phase;return`
              <div class="flex items-center gap-2.5 rounded-control border px-3 py-2 transition-colors duration-200 ${r?"border-accent bg-accent-tint/25":"border-line bg-surface"}">
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="font-mono text-[12.5px] font-medium text-ink">${t.key}</span>
                    <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">${t.kind}</span>
                  </div>
                  <p class="mt-0.5 truncate font-mono text-[10px] text-ink-3">${t.scope}</p>
                </div>
                ${i?`
                  <span class="flex items-center gap-1 rounded-chip bg-green-tint px-2 py-0.5 text-[10.5px] font-medium text-green"
                    style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) both;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    ${e?"已配置":"Configured"}
                  </span>
                `:r?`
                  <span class="flex items-center gap-1.5 text-[10.5px] text-ink-3">
                    <span class="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>
                    ${e?"授权中…":"authorizing…"}
                  </span>
                `:`
                  <button type="button" data-signin="${t.key}"
                    aria-label="${e?`登录 ${t.key}`:`Sign in to ${t.key}`}"
                    class="rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors duration-100 hover:bg-hover cursor-pointer">
                    ${e?"登录":"Sign in"}
                  </button>
                `}
                ${i?`
                  <button type="button" data-signout="${t.key}" class="text-[11px] text-ink-3 transition-colors duration-100 hover:text-red cursor-pointer">
                    ${e?"退出":"Sign out"}
                  </button>
                `:""}
              </div>
            `}).join("")}
        </div>

        <div class="grid transition-[grid-template-rows,opacity] duration-300"
          style="grid-template-rows: ${t?"1fr":"0fr"}; opacity: ${+!!t}; transition-timing-function: cubic-bezier(0.23,1,0.32,1);">
          <div class="overflow-hidden">
            ${t?`
              <div class="mt-3 rounded-control border border-line bg-inset/60 p-3">
                ${"done"===this._phase?`
                  <div class="flex items-center gap-2 py-1">
                    <span class="flex size-5 items-center justify-center rounded-full bg-green text-white" style="animation: pop-in 300ms cubic-bezier(0.23,1,0.32,1) both;">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                    <span class="text-[12px] font-medium text-ink">${e?"授权完成，凭据已写入保险箱":"Authorized — credential written to the vault"}</span>
                  </div>
                `:`
                  <div class="flex items-center justify-between">
                    <span class="text-[12px] font-medium text-ink">${e?`授权 ${this._flowKey??""}`:`Authorize ${this._flowKey??""}`}</span>
                    <span class="rounded-chip bg-accent-tint px-1.5 py-0.2 font-mono text-[9.5px] text-accent-ink">
                      ${"settling"===this._phase?e?"写入中":"writing":e?"等待输入":"awaiting input"}
                    </span>
                  </div>
                  <div class="mt-2 flex items-center gap-2 rounded-control border border-line bg-field px-2.5 py-1.5 focus-within:border-accent focus-within:bg-surface transition-colors">
                    <input type="${this._revealed?"text":"password"}"
                      aria-label="${e?"访问令牌":"Access token"}"
                      class="secret-input w-full bg-transparent font-mono text-[12px] text-ink outline-none" />
                    <button type="button" class="reveal-btn flex size-5 shrink-0 items-center justify-center rounded-chip text-ink-3 transition-colors hover:bg-hover hover:text-ink cursor-pointer"
                      aria-label="${this._revealed?e?"隐藏令牌":"Hide token":e?"显示令牌":"Reveal token"}">
                      ${this._revealed?`
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      `:`
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      `}
                    </button>
                  </div>
                  <div class="mt-2.5 flex items-center justify-end gap-2">
                    <button type="button" class="withdraw-btn rounded-control px-2.5 py-1 text-[11px] text-ink-3 transition-colors hover:bg-hover hover:text-ink cursor-pointer">
                      ${e?"取消流程":"Withdraw"}
                    </button>
                    <button type="button" ${0===this._secret.length||"settling"===this._phase?"disabled":""}
                      class="authorize-btn rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer">
                      ${"settling"===this._phase?e?"写入中…":"Writing…":e?"确认授权":"Authorize"}
                    </button>
                  </div>
                `}
              </div>
            `:""}
          </div>
        </div>
      </div>
    `);let n=this.shadowRoot?.querySelector(".secret-input");if(i&&n){for(let e of[...i.attributes])n.hasAttribute(e.name)||i.removeAttribute(e.name);for(let e of[...n.attributes])i.setAttribute(e.name,e.value);n.replaceWith(i)}this._syncSecretInput(),r&&i?.isConnected&&i.focus(),this.shadowRoot?.querySelectorAll("[data-signin]").forEach(e=>{e.addEventListener("click",()=>{this._beginFlow(e.getAttribute("data-signin")),this.render(),this._restartSchedule()})}),this.shadowRoot?.querySelectorAll("[data-signout]").forEach(e=>{e.addEventListener("click",()=>{this._configured[e.getAttribute("data-signout")]=!1,this.render()})}),this.shadowRoot?.querySelector(".reveal-btn")?.addEventListener("click",e=>{let t=this.shadowRoot?.activeElement===e.currentTarget;this._revealed=!this._revealed,this.render(),t&&this.shadowRoot?.querySelector(".reveal-btn")?.focus()});let a=this.shadowRoot?.querySelector(".secret-input");a&&a!==i&&a.addEventListener("input",e=>{this._secret=e.target.value,this._syncSecretInput()}),this.shadowRoot?.querySelector(".withdraw-btn")?.addEventListener("click",()=>{this._withdrawFlow(),this.render(),this._restartSchedule()}),this.shadowRoot?.querySelector(".authorize-btn")?.addEventListener("click",()=>{"prompt"===this._phase&&0!==this._secret.length&&(this._phase="settling",this.render(),this._restartSchedule())})}}"u">typeof customElements&&!customElements.get("nai-authorization-surface")&&customElements.define("nai-authorization-surface",im);let ib=JSON.stringify({defaultRoute:"deepseek/reasoner",temperature:.7,maxTokens:8192},null,2),ix=JSON.stringify({defaultRoute:"deepseek/reasoner",temperature:.4,maxTokens:8192},null,2);class iv extends l{static get observedAttributes(){return["lang","visual-case"]}constructor(){super(),this._revision=7,this._saved=ib,this._draft=ib,this._phase="edit",this._attempt=null,this._nextSaveConflicts=!1,this._remoteRevision=null,this._transitionVersion=0}onMount(){let e=this.getAttribute("visual-case");"conflict"===e?(this._revision=8,this._draft='{\n  "theme": "dark",\n  "maxTokens": 12288\n}',this._phase="conflict",this._nextSaveConflicts=!0,this._remoteRevision=9):"refetched"===e&&(this._revision=9,this._saved=ix,this._draft=ix)}_statusText(){let e=this.isZh;return"saving"===this._phase?e?"保存中…":"Saving…":"saved"===this._phase?e?`已保存 revision ${this._revision}`:`Saved revision ${this._revision}`:"conflict"===this._phase?e?"外部已修改":"Edited elsewhere":"refetching"===this._phase?e?"正在重新读取…":"Refetching…":this._draft===this._saved?e?"已同步":"In sync":e?"编辑中":"Editing"}_syncTextarea(){let e=this.shadowRoot?.querySelector(".editor-area");e&&(e.value!==this._draft&&(e.value=this._draft),e.readOnly="edit"!==this._phase)}_syncDraftControls(){this._syncTextarea();let e=this.shadowRoot?.querySelector(".save-btn"),t="edit"!==this._phase||this._draft===this._saved;e&&e.disabled!==t&&(e.disabled=t)}_syncView(){let e=this.isZh,t="conflict"===this._phase||"refetching"===this._phase,i="conflict"===this._phase?"bg-orange-tint text-orange":"saved"===this._phase?"bg-green-tint text-green":"bg-field text-ink-2",r=this.shadowRoot?.querySelector(".namespace-description");if(r){let t=e?"配置命名空间 · 乐观并发":"Configuration namespace · optimistic concurrency";r.textContent!==t&&(r.textContent=t)}let n=this.shadowRoot?.querySelector(".revision-chip"),a=`revision ${this._revision}`;n&&n.textContent?.trim()!==a&&(n.textContent=a);let s=this.shadowRoot?.querySelector(".editor-area");if(s){let i=e?"设置 JSON":"Settings JSON";s.getAttribute("aria-label")!==i&&s.setAttribute("aria-label",i);let r=`editor-area w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none transition-colors duration-200 ${t?"border-orange/50 bg-orange-tint/25 text-ink-2":"border-line bg-inset text-ink focus:border-accent focus:bg-surface"}`;s.className!==r&&(s.className=r)}let o=this.shadowRoot?.querySelector(".editor-footer"),l=this.shadowRoot?.querySelector('[role="alert"]');if("conflict"===this._phase){if(!l&&o){let e=document.createElement("template");e.innerHTML=`
          <div role="alert" class="mt-2 flex items-center justify-between rounded-control border border-orange/35 bg-orange-tint px-3 py-2"
            style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
            <span class="conflict-message text-[11.5px] font-medium text-ink"></span>
            <span class="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
          </div>`,o.before(e.content.firstElementChild),l=this.shadowRoot?.querySelector('[role="alert"]')}let t=l?.querySelector(".conflict-message");t&&(t.textContent=e?"预期 revision 已过期 — 草稿仍保留":"expectedRevision is stale — your draft is preserved")}else l?.remove();let c=this.shadowRoot?.querySelector(".editor-actions"),d=this.shadowRoot?.querySelector(".save-btn"),p=this.shadowRoot?.querySelector(".refetch-btn");if("conflict"===this._phase?(!p&&c&&d&&((p=document.createElement("button")).type="button",p.className="refetch-btn rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer",p.addEventListener("click",()=>this._discardAndRefetch()),c.insertBefore(p,d)),p&&(p.setAttribute("aria-label",e?"放弃修改并重新读取":"Discard changes and refetch"),p.textContent=e?"放弃修改并刷新":"Discard & refetch")):p?.remove(),d){let t=e?"保存 revision":"Save revision",i=e?"保存":"Save";d.getAttribute("aria-label")!==t&&d.setAttribute("aria-label",t),d.textContent!==i&&(d.textContent=i)}let h=this.shadowRoot?.querySelector(".status-chip");if(h){if(h.className=`status-chip flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-[10.5px] font-medium ${i}`,h.replaceChildren(),"saving"===this._phase||"refetching"===this._phase){let e=document.createElement("span");e.className="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2",e.style.animation="spin 700ms linear infinite",h.appendChild(e)}h.append(this._statusText())}this._syncDraftControls()}_save(){if("edit"!==this._phase||this._draft===this._saved)return;this._attempt={draft:this._draft,expectedRevision:this._revision},this._phase="saving",this.render();let e=++this._transitionVersion;this.registerTimeout(()=>{if(e===this._transitionVersion){if(this._nextSaveConflicts){this._remoteRevision=this._attempt.expectedRevision+1,this._phase="conflict",this.render();return}this._saved=this._attempt.draft,this._draft=this._attempt.draft,this._revision=this._attempt.expectedRevision+1,this._nextSaveConflicts=!0,this._attempt=null,this._phase="saved",this.render(),this.registerTimeout(()=>{e===this._transitionVersion&&"saved"===this._phase&&(this._phase="edit",this.render())},1500)}},650)}_discardAndRefetch(){if("conflict"!==this._phase)return;let e=this._remoteRevision??this._revision+1;this._phase="refetching",this.render();let t=++this._transitionVersion;this.registerTimeout(()=>{t===this._transitionVersion&&(this._revision=e,this._saved=ix,this._draft=ix,this._attempt=null,this._remoteRevision=null,this._nextSaveConflicts=!1,this._phase="edit",this.render())},900)}render(){if(this.shadowRoot?.querySelector(".max-w-lg.rounded-card"))return void this._syncView();let e=this.isZh,t="conflict"===this._phase||"refetching"===this._phase,i="conflict"===this._phase?"bg-orange-tint text-orange":"saved"===this._phase?"bg-green-tint text-green":"bg-field text-ink-2";this.setHtml(`
      <div class="w-full max-w-lg self-start overflow-hidden rounded-card bg-surface shadow-card">
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
            <div>
              <h3 class="font-mono text-[13px] font-semibold text-ink">llm</h3>
              <p class="namespace-description text-[11px] text-ink-3">${e?"配置命名空间 · 乐观并发":"Configuration namespace · optimistic concurrency"}</p>
            </div>
          </div>
          <span class="revision-chip rounded-chip border border-line bg-surface px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-3" style="transform: translateZ(0px);">
            revision ${this._revision}
          </span>
        </div>

        <div class="p-3">
          <textarea spellcheck="false" rows="7" style="appearance: none; transform: translateZ(0px);"
            aria-label="${e?"设置 JSON":"Settings JSON"}"
            class="editor-area w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none transition-colors duration-200 ${t?"border-orange/50 bg-orange-tint/25 text-ink-2":"border-line bg-inset text-ink focus:border-accent focus:bg-surface"}"></textarea>

          ${"conflict"===this._phase?`
            <div role="alert" class="mt-2 flex items-center justify-between rounded-control border border-orange/35 bg-orange-tint px-3 py-2"
              style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
              <span class="conflict-message text-[11.5px] font-medium text-ink">
                ${e?"预期 revision 已过期 — 草稿仍保留":"expectedRevision is stale — your draft is preserved"}
              </span>
              <span class="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
            </div>
          `:""}

          <div class="editor-footer mt-2.5 flex items-center justify-between">
            <span class="status-chip flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-[10.5px] font-medium ${i}">
              ${"saving"===this._phase||"refetching"===this._phase?`
                <span class="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>
              `:""}
              ${this._statusText()}
            </span>
            <div class="editor-actions flex items-center gap-2">
              ${"conflict"===this._phase?`
                <button type="button" aria-label="${e?"放弃修改并重新读取":"Discard changes and refetch"}"
                  class="refetch-btn rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer">
                  ${e?"放弃修改并刷新":"Discard & refetch"}
                </button>
              `:""}
              <button type="button" aria-label="${e?"保存 revision":"Save revision"}"
                class="save-btn rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer">
                ${e?"保存":"Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `),this.shadowRoot?.querySelector(".editor-area")?.addEventListener("input",e=>{this._draft=e.target.value,this._syncDraftControls()}),this.shadowRoot?.querySelector(".save-btn")?.addEventListener("click",()=>this._save()),this.shadowRoot?.querySelector(".refetch-btn")?.addEventListener("click",()=>this._discardAndRefetch()),this._syncView()}}"u">typeof customElements&&!customElements.get("nai-settings-editor")&&customElements.define("nai-settings-editor",iv);let iw="Pistachio churns fastest on weekends — schedule it first on Saturday mornings.",ik="开心果口味在周末搅拌最快 —— 建议排在每周六清晨的首批。";class iy extends l{static get observedAttributes(){return["lang","visual-case"]}constructor(){super(),this._rating=null,this._copyStatus="idle",this._copyOperationVersion=0}onMount(){let e=this.getAttribute("visual-case");"liked"===e?this._rating="up":"disliked"===e?this._rating="down":"copy-error"===e&&(this._copyStatus="copy-error")}onUnmount(){this._copyOperationVersion+=1}_rate(e){this._rating=this._rating===e?null:e,this.render()}async _copy(){let e=this.isZh?ik:iw,t=++this._copyOperationVersion,i=()=>this._mounted&&this.isConnected&&t===this._copyOperationVersion,r=!1;if(navigator.clipboard?.writeText)try{await navigator.clipboard.writeText(e),r=!0}catch{}!r&&i()&&(r=function(e){let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.left="-9999px",t.style.opacity="0",document.body.appendChild(t),t.select();try{return"function"==typeof document.execCommand&&!0===document.execCommand("copy")}catch{return!1}finally{t.remove()}}(e)),i()&&(this._copyStatus=r?"copied":"copy-error",this.render(),this.registerTimeout(()=>{i()&&(this._copyStatus="idle",this.render())},1400))}render(){let e=this.isZh,t=this._rating,i=this._copyStatus;this.setHtml(`
      <div class="w-full max-w-95 rounded-card bg-surface p-4 shadow-card" style="transform: translateZ(0);">
        <p class="text-[13px] leading-relaxed text-ink">${e?ik:iw}</p>
        <div class="mt-2 flex items-center gap-0.5" role="group" aria-label="${e?"消息操作":"Message actions"}">
          <button type="button" class="copy-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${"copied"===i?"text-green":"copy-error"===i?"text-red":"text-ink-3 hover:bg-hover-2 hover:text-ink-2"}" aria-label="${e?"复制回复":"Copy response"}">
            ${"copied"===i?`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            `:`
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
            `}
          </button>
          <button type="button" class="up-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${"up"===t?"bg-accent-tint text-accent-ink":"text-ink-3 hover:bg-hover-2 hover:text-ink-2"}"
            aria-label="${e?"回答不错":"Good response"}" aria-pressed="${"up"===t}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" /></svg>
          </button>
          <button type="button" class="down-btn flex size-6 items-center justify-center rounded-[6px] transition-colors duration-100 cursor-pointer ${"down"===t?"bg-red-tint text-red":"text-ink-3 hover:bg-hover-2 hover:text-ink-2"}"
            aria-label="${e?"回答有问题":"Bad response"}" aria-pressed="${"down"===t}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" /></svg>
          </button>
          <span role="status" aria-live="polite"
            class="ml-1.5 text-[11px] transition-opacity duration-300 ${"copy-error"===i?"text-red":"text-ink-3"}"
            style="opacity: ${+(null!==t||"idle"!==i)};">${"copied"===i?e?"已复制":"Copied":"copy-error"===i?e?"复制失败":"Copy failed":"up"===t?e?"已标记为有用":"Marked helpful":"down"===t?e?"已标记为有问题":"Marked unhelpful":""}</span>
        </div>
      </div>
    `),this.shadowRoot?.querySelector(".copy-btn")?.addEventListener("click",()=>this._copy()),this.shadowRoot?.querySelector(".up-btn")?.addEventListener("click",()=>this._rate("up")),this.shadowRoot?.querySelector(".down-btn")?.addEventListener("click",()=>this._rate("down"))}}"u">typeof customElements&&!customElements.get("nai-feedback-actions")&&customElements.define("nai-feedback-actions",iy),e.s([],76170),e.i(76170),e.i(29218),e.i(43516);let i_={spark:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
  </svg>`};e.s(["ICONS",0,i_],54143),e.i(54143),e.i(32083),e.s(["ICONS",0,i_,"NaiAgentInbox",0,eL,"NaiAgentTeams",0,eo,"NaiApprovalCard",0,A,"NaiArtifactSandbox",0,te,"NaiAttachmentQueue",0,ee,"NaiAudioOrb",0,tZ,"NaiAuthorizationSurface",0,im,"NaiBaseElement",0,l,"NaiChat",0,U,"NaiCheckpointTimeline",0,eU,"NaiClarificationCard",0,eb,"NaiCodeBlock",0,Q,"NaiContextCards",0,e_,"NaiContextSpillover",0,eE,"NaiContextWindow",0,ew,"NaiCordisPluginTree",0,eG,"NaiDiffTable",0,tn,"NaiFeedbackActions",0,iy,"NaiFilterTable",0,tu,"NaiFineTuneCard",0,id,"NaiHookPipeline",0,eP,"NaiInsightCards",0,t8,"NaiJobScheduler",0,e3,"NaiLayerCard",0,ii,"NaiLoadingState",0,h,"NaiLspDiagnostics",0,e1,"NaiMcpServers",0,e8,"NaiMemoryInspector",0,ey,"NaiMessageBranches",0,ev,"NaiModelArena",0,tB,"NaiPermissionPresetCard",0,eY,"NaiPromptBar",0,D,"NaiRecommendationCard",0,t9,"NaiRecordsTable",0,tl,"NaiSandboxManager",0,e2,"NaiSearch",0,io,"NaiSelectionActions",0,tT,"NaiSensitiveInput",0,it,"NaiSessionList",0,ih,"NaiSessionTelemetry",0,eF,"NaiSettingsEditor",0,iv,"NaiSidebarNav",0,ia,"NaiStreamingText",0,E,"NaiSubagentTree",0,ei,"NaiTaskRows",0,ed,"NaiThinking",0,v,"NaiToolChips",0,eg,"NaiTurnLifecycle",0,eA,"NaiWorkflowRun",0,eD,"UTILITY_CSS",0,o,"getGlobalLang",0,r,"onLangChange",0,a,"resolveLang",0,s,"setGlobalLang",0,n],74312)}]);