(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74312,e=>{"use strict";let t="en",a=new Set;try{let e=window.localStorage.getItem("nai-lang");"en"===e||"zh"===e?t=e:("zh"===document.documentElement.lang||document.documentElement.lang?.startsWith("zh-"))&&(t="zh")}catch{}function o(){return t}function r(e){if(("en"===e||"zh"===e)&&t!==e){t=e;try{window.localStorage.setItem("nai-lang",e)}catch{}for(let t of(document.documentElement.lang=e,window.dispatchEvent(new CustomEvent("nai-lang-change",{detail:{lang:e}})),a))try{t(e)}catch(e){console.error("[nai-lang] listener error:",e)}}}function n(e){return a.add(e),()=>{a.delete(e)}}function i(e){return"en"===e||"zh"===e?e:t}e.s(["getGlobalLang",0,o,"onLangChange",0,n,"resolveLang",0,i,"setGlobalLang",0,r],29218);class s extends HTMLElement{static get observedAttributes(){return["lang"]}constructor(){super(),this.attachShadow({mode:"open"}),this._cleanups=[],this._mounted=!1}get currentLang(){return i(this.getAttribute("lang"))}get isZh(){return"zh"===this.currentLang}connectedCallback(){this._mounted=!0,this._unsubLang=n(()=>{this.hasAttribute("lang")||this.requestUpdate()}),this.onMount(),this.requestUpdate()}disconnectedCallback(){this._mounted=!1,this._unsubLang&&(this._unsubLang(),this._unsubLang=null),this.cleanup(),this.onUnmount()}attributeChangedCallback(e,t,a){t!==a&&this._mounted&&(this.onAttributeChange(e,t,a),this.requestUpdate())}onMount(){}onUnmount(){}onAttributeChange(e,t,a){}registerTimeout(e,t){let a=window.setTimeout(e,t);return this._cleanups.push(()=>clearTimeout(a)),a}registerInterval(e,t){let a=window.setInterval(e,t);return this._cleanups.push(()=>clearInterval(a)),a}registerRaf(e){let t,a=o=>{e(o),t=requestAnimationFrame(a)};t=requestAnimationFrame(a);let o=()=>cancelAnimationFrame(t);return this._cleanups.push(o),o}registerListener(e,t,a,o){e.addEventListener(t,a,o),this._cleanups.push(()=>e.removeEventListener(t,a,o))}cleanup(){for(;this._cleanups.length>0;){let e=this._cleanups.pop();try{e()}catch(e){console.error("[nai-base-element] cleanup error:",e)}}}requestUpdate(){this._mounted&&this.render()}render(){}}e.s(["NaiBaseElement",0,s],43516);let d=Array.from({length:9},(e,t)=>{let a=Math.floor(t/3);return(t%3+Math.abs(a-1))*90}),l=[0,1,2,5,8,7,6,3],c={Drive:{delays:d,dur:650,round:!1},Dots:{delays:d,dur:650,round:!0},Orbit:{delays:Array.from({length:9},(e,t)=>{let a=l.indexOf(t);return -1===a?null:110*a}),dur:950,round:!1}};class p extends s{static get observedAttributes(){return["variant","label","lang"]}constructor(){super(),this._ds=0}get variant(){return this.getAttribute("variant")||"Drive"}get label(){return this.getAttribute("label")||"Churning"}onMount(){this._ds=0,this.registerInterval(()=>{this._ds++,this._updateTimerDisplay()},100)}_formatElapsed(){let e=this._ds/10;return e<60?`${e.toFixed(1)}s`:`${Math.floor(e/60)}m ${(e%60).toFixed(1)}s`}_updateTimerDisplay(){let e=this.shadowRoot?.querySelector(".elapsed-timer");e&&(e.textContent=this._formatElapsed())}render(){let e=this.isZh,t=this.label,{delays:a,dur:o,round:r}=c[this.variant]??c.Drive;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: inline-flex;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
        }
        .container {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--ink, #1f2124);
        }
        .pixel-grid {
          display: grid;
          grid-template-columns: repeat(3, 4px);
          gap: 1.5px;
        }
        .pixel {
          width: 4px;
          height: 4px;
          background: var(--ink, #1f2124);
          border-radius: ${r?"50%":"1px"};
        }
        .label {
          font-size: 13px;
          font-weight: 500;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, var(--ink-3, #9a9da3) 35%, var(--ink, #1f2124) 50%, var(--ink-3, #9a9da3) 65%);
          background-size: 200% 100%;
          animation: shimmer-text 1.4s linear infinite;
        }
        .elapsed-timer {
          font-family: var(--font-mono, ui-monospace, "SF Mono", monospace);
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }
        @keyframes shimmer-text {
          0% { background-position: 150%; }
          100% { background-position: -50%; }
        }
        @keyframes pixel-on {
          0%, 100% { opacity: 0.15; }
          18%, 42% { opacity: 1; }
          62% { opacity: 0.15; }
        }
        @media (prefers-reduced-motion: reduce) {
          .label { animation: none; color: var(--ink-2, #62656b); }
          .pixel { animation: none !important; opacity: 0.15 !important; }
        }
      </style>
      <div class="container">
        <span aria-hidden="true" class="pixel-grid">
          ${a.map(e=>`
              <span
                class="pixel"
                style="opacity: ${null===e?"0.07":"0.15"}; animation: ${null===e?"none":`pixel-on ${o}ms ease-in-out ${e}ms infinite`};"
              ></span>
            `).join("")}
        </span>
        <span class="label">${e&&"Churning"===t?"搅拌中":t}</span>
        <span class="elapsed-timer">${this._formatElapsed()}</span>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-loading-state")&&customElements.define("nai-loading-state",p);let h={spark:`<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
  </svg>`};e.s(["ICONS",0,h],54143);let f=[800,600,1800,2600,1600],u={Steps:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Reading flavor briefs"},{primary:"Scanning supplier lists"},{primary:"Comparing tasting notes",secondary:"6 flavors"},{primary:"Writing the scoop report"}]},Reasoning:{active:"Thinking",done:"Thought for 4 seconds",rows:[{primary:"Summer demand spikes for stone-fruit flavors — peach and apricot lead."},{primary:"I should check cone inventory before promoting a waffle-bowl special."}]},Search:{active:"Searching the web",done:"Searched the web",query:"best waffle cone supplier",rows:[{primary:"Joy Cone",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"Running tools",done:"Ran 3 tools",rows:[{primary:"Read",secondary:"flavors.ts",mono:!0},{primary:"Edit",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"Run",secondary:"npm run freeze",mono:!0}]}},g={Steps:{active:"深度思考中",done:"已深度思考 4 秒",rows:[{primary:"解析风味研发简报"},{primary:"扫描合规原料供应商名录"},{primary:"比对盲测品鉴笔记",secondary:"6 款配方"},{primary:"生成冰淇淋上架评估报告"}]},Reasoning:{active:"深度推理中",done:"已完成推理 (4秒)",rows:[{primary:"夏季水果口味需求激增 — 蜜桃与黄杏风味处于领跑地位。"},{primary:"在推广华夫脆筒套餐前，应先校验当前脆筒库存水位。"}]},Search:{active:"正在检索全网资料",done:"全网检索完成",query:"顶级华夫甜筒供应商",rows:[{primary:"Joy Cone 官方供应链",secondary:"joycone.com",href:"https://joycone.com"},{primary:"WebstaurantStore 餐饮商城",secondary:"webstaurantstore.com",href:"https://webstaurantstore.com"},{primary:"The Konery 手工脆筒",secondary:"thekonery.com",href:"https://thekonery.com"}]},Coding:{active:"正在执行工具调用",done:"已调用 3 项工具",rows:[{primary:"读取",secondary:"flavors.ts",mono:!0},{primary:"修改",secondary:"ChurnSchedule.tsx",mono:!0,add:74,del:41},{primary:"执行",secondary:"npm run freeze",mono:!0}]}};class v extends s{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._stage=0,this._manualExpanded=null,this._selectedTool=null}get variant(){return this.getAttribute("variant")||"Steps"}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this._startSequence()}_startSequence(){if(!this.autoPlay){this._stage=f.length;return}this._stage=0;let e=t=>{t>=f.length-1||this.registerTimeout(()=>{this._stage=t+1,this.render(),e(t+1)},f[t])};e(0)}toggleExpand(){let e=this._stage>=1&&this._stage<4,t=this._manualExpanded??e;this._manualExpanded=!t,this.render()}render(){let e=this.isZh?g:u,t=e[this.variant]??e.Steps,a=this._stage>=1&&this._stage<4,o=this._manualExpanded??a,r=this._stage<3,n=this._stage<2?0:2===this._stage?Math.min(2,t.rows.length):t.rows.length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 380px;
          min-height: 140px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        button {
          font-family: inherit;
          cursor: pointer;
        }
        .header-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
          margin: 0 -6px;
          background: transparent;
          border: none;
          border-radius: var(--radius-control, 8px);
          color: inherit;
          transition: background-color 0.12s ease;
        }
        .header-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .spark-icon {
          color: ${r?"var(--ink-2, #62656b)":"var(--ink-3, #9a9da3)"};
          display: flex;
          align-items: center;
        }
        .title-working {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: linear-gradient(90deg, var(--ink-3, #9a9da3) 35%, var(--ink, #1f2124) 50%, var(--ink-3, #9a9da3) 65%);
          background-size: 200% 100%;
          animation: shimmer-text 1.4s linear infinite;
        }
        .title-done {
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          color: var(--ink-2, #62656b);
          animation: fade-in 350ms ease-out both;
        }
        .chevron-icon {
          color: var(--ink-3, #9a9da3);
          display: flex;
          align-items: center;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          transform: rotate(${o?"180deg":"0deg"});
        }
        .trace-container {
          position: relative;
          margin-top: 6px;
          padding-left: 20px;
          display: ${o?"flex":"none"};
          flex-direction: column;
          gap: 8px;
        }
        .guide-line {
          position: absolute;
          left: 7px;
          top: 4px;
          bottom: 4px;
          width: 1.5px;
          background: var(--line, #ecedef);
          border-radius: 99px;
        }
        .row-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .row-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }
        .row-primary {
          color: var(--ink-2, #62656b);
        }
        .row-primary.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
          color: var(--ink, #1f2124);
          font-size: 12px;
        }
        .row-secondary {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }
        .badge-diff {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          display: inline-flex;
          gap: 4px;
        }
        .badge-add { color: var(--green, #189a4d); }
        .badge-del { color: var(--red, #e3474c); }
        .search-link {
          color: var(--accent-ink, #0170dd);
          text-decoration: none;
        }
        .search-link:hover {
          text-decoration: underline;
        }
        @keyframes shimmer-text {
          0% { background-position: 150%; }
          100% { background-position: -50%; }
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fade-up { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
      </style>

      <button type="button" class="header-btn" aria-expanded="${o}">
        <span class="spark-icon">${h.spark}</span>
        ${r?`<span class="title-working">${t.active}</span>`:`<span class="title-done">${t.done}</span>`}
        <span class="chevron-icon">${h.chevronDown}</span>
      </button>

      <div class="trace-container">
        <div class="guide-line"></div>
        ${t.rows.slice(0,n).map((e,t)=>`
              <div class="row-item" style="animation-delay: ${60*t}ms">
                <span class="row-dot"></span>
                <span class="row-primary ${e.mono?"mono":""}">
                  ${e.href?`<a href="${e.href}" target="_blank" rel="noreferrer" class="search-link">${e.primary}</a>`:e.primary}
                </span>
                ${e.secondary?`<span class="row-secondary ${e.mono?"mono":""}">${e.secondary}</span>`:""}
                ${void 0!==e.add?`<span class="badge-diff"><span class="badge-add">+${e.add}</span><span class="badge-del">-${e.del}</span></span>`:""}
              </div>
            `).join("")}
      </div>
    `;let i=this.shadowRoot.querySelector(".header-btn");i?.addEventListener("click",()=>this.toggleExpand())}}"u">typeof customElements&&!customElements.get("nai-thinking")&&customElements.define("nai-thinking",v);let m=[..."Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points.".split(" ").map(e=>({text:e})),{text:"",cite:!0},..."Stone-fruit flavors are trending in the same range.".split(" ").map(e=>({text:e}))],b=[..."开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。".split("").map(e=>({text:e})),{text:"",cite:!0},..."同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。".split("").map(e=>({text:e}))],x=["Which flavors sell best in winter","Compare gelato and soft serve margins"],y=["冬季哪些冰淇淋风味销量最高？","对比意式硬冰与软冰淇淋的利润率"],k=[{name:"Scoop Data",domain:"scoopdata.io",href:"https://scoopdata.io/"},{name:"Trends Index",domain:"trends.google.com",href:"https://trends.google.com/trends/"},{name:"Market Basket",domain:"marketbasket.io",href:"https://marketbasket.io/"}];class w extends s{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._count=0,this._sourcesOpen=!1,this._copied=!1}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this._startStream()}_startStream(){if(this._count=0,!this.autoPlay){let e=this.isZh?b:m;this._count=e.length,this.render();return}let e=()=>{let t=this.isZh?b:m;this._count<t.length?(this._count++,this.render(),this.registerTimeout(e,55)):this.registerTimeout(()=>{this._count=0,this.render(),e()},3400)};this.registerTimeout(e,300)}copyText(){let e=this.isZh;navigator.clipboard?.writeText&&navigator.clipboard.writeText(e?"开心果口味是当前增长最快的产品 — 本月销量环比上涨 23%，毛利率相比传统香草高出 8 个百分点。同品类中，以蜜桃与黄杏为代表的水果风味也呈现出强劲的同步增长势头。":"Pistachio is your fastest-growing flavor — sales are up 23% this month and margins beat vanilla by 8 points. Stone-fruit flavors are trending in the same range.").then(()=>{this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1800)})}toggleSources(){this._sourcesOpen=!this._sourcesOpen,this.render()}render(){let e=this.isZh,t=e?b:m,a=t.slice(0,this._count),o=this._count>=t.length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 480px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .content {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .token {
          display: inline;
        }
        .space {
          display: inline;
        }
        .caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          vertical-align: text-bottom;
          background: var(--ink, #1f2124);
          margin-left: 2px;
          border-radius: 1px;
          animation: ${o?"caret-blink 1s step-end infinite":"none"};
        }
        .source-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 6px;
          margin: 0 4px;
          background: var(--inset, #f7f8f9);
          border: 1px solid var(--line, #ecedef);
          border-radius: 5px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-2, #62656b);
          text-decoration: none;
          vertical-align: baseline;
          transition: background-color 0.12s ease;
        }
        .source-chip:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 4px;
        }
        .btn-group {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .icon-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .copied-badge {
          font-size: 11px;
          color: var(--green, #189a4d);
          font-weight: 500;
          animation: fade-in 200ms ease;
        }
        .follow-ups {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .follow-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 99px;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background-color 0.15s;
        }
        .follow-pill:hover {
          border-color: var(--line-strong, #e0e2e5);
          color: var(--ink, #1f2124);
          background: var(--hover, #f4f5f6);
        }
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      </style>

      <div class="content">
        ${a.map((t,a)=>t.cite?`<a href="${k[0].href}" target="_blank" rel="noreferrer" class="source-chip">${k[0].domain}</a>`:`<span class="token">${t.text}</span>${e?"":" "}`).join("")}
        <span class="caret"></span>
      </div>

      <div class="actions-bar">
        <div class="btn-group">
          <button type="button" class="icon-btn copy-btn" title="${e?"复制回答":"Copy response"}">
            ${this._copied?'<span class="copied-badge">✓</span>':h.copy}
          </button>
          <button type="button" class="icon-btn retry-btn" title="${e?"重新生成":"Regenerate"}">
            ${h.retry}
          </button>
          <button type="button" class="icon-btn thumb-up" title="${e?"有用":"Helpful"}">
            ${h.thumbsUp}
          </button>
          <button type="button" class="icon-btn thumb-down" title="${e?"不满意":"Not helpful"}">
            ${h.thumbsDown}
          </button>
        </div>
      </div>

      <div class="follow-ups">
        ${(e?y:x).map(e=>`
              <button type="button" class="follow-pill">
                <span>${e}</span>
                <span>→</span>
              </button>
            `).join("")}
      </div>
    `,this.shadowRoot.querySelector(".copy-btn")?.addEventListener("click",()=>this.copyText()),this.shadowRoot.querySelector(".retry-btn")?.addEventListener("click",()=>this._startStream())}}"u">typeof customElements&&!customElements.get("nai-streaming-text")&&customElements.define("nai-streaming-text",w);let $=[{q:"How many flavors should we launch?",type:"radio",options:["Three (core line)","Five (full case)","Just one hero"]},{q:"Which mix-ins should we stock?",type:"check",options:["Chocolate chips","Waffle bits","Sprinkles"]},{q:"Which market do we enter first?",type:"radio",options:["Food trucks","Grocery freezers","Scoop shops"]}],_=[{q:"首批上线推出几款新口味？",type:"radio",options:["3 款 (核心经典线)","5 款 (完整全品类)","仅推 1 款爆品"]},{q:"首批需要进货哪些混合配料？",type:"check",options:["黑巧碎粒","华夫脆角碎片","彩色糖针"]},{q:"优先切入哪个试点销售渠道？",type:"radio",options:["流动餐车","精品超市冷柜","线下直营体验店"]}];class E extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0}toggleOption(e){let t=this.isZh?_:$,a=t[this._qi],o=this._answers[this._qi]??[];"radio"===a.type?(this._answers[this._qi]=[e],this._custom[this._qi]="",this.render(),this.registerTimeout(()=>{this._qi===t.length-1?this._sent=!0:this._qi=Math.min(t.length-1,this._qi+1),this.render()},450)):(o.includes(e)?this._answers[this._qi]=o.filter(t=>t!==e):this._answers[this._qi]=[...o,e],this.render())}next(){let e=this.isZh;this._qi<(e?_:$).length-1?this._qi++:this._sent=!0,this.render()}prev(){this._qi>0&&(this._qi--,this.render())}reset(){this._qi=0,this._answers={},this._custom={},this._sent=!1,this._open=!0,this.render()}render(){let e=this.isZh,t=e?_:$,a=t.length,o=t[this._qi],r=this._answers[this._qi]??[],n=this._qi===a-1,i=r.length>0||!!this._custom[this._qi]?.trim();if(!this._open){this.shadowRoot.innerHTML=`
        <style>
          :host { display: inline-block; font-family: var(--font-sans, sans-serif); }
          button {
            padding: 8px 14px;
            background: var(--surface, #fff);
            color: var(--ink, #1f2124);
            border: 1px solid var(--line-strong, #e0e2e5);
            border-radius: var(--radius-control, 8px);
            box-shadow: var(--shadow-btn);
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.12s;
          }
          button:hover { background: var(--hover, #f4f5f6); }
        </style>
        <button type="button" id="reopen-btn">${e?"打开审批流卡片":"Open approval card"}</button>
      `,this.shadowRoot.querySelector("#reopen-btn")?.addEventListener("click",()=>{this._open=!0,this.render()});return}if(this._sent){this.shadowRoot.innerHTML=`
        <style>
          :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 420px;
            background: var(--surface, #fff);
            border: 1px solid var(--line, #ecedef);
            border-radius: var(--radius-card, 10px);
            box-shadow: var(--shadow-card);
            font-family: var(--font-sans, sans-serif);
            color: var(--ink, #1f2124);
            overflow: hidden;
            animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            border-bottom: 1px solid var(--line, #ecedef);
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink-2, #62656b);
          }
          .body {
            padding: 20px 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            text-align: center;
          }
          .success-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--green-tint, #e8f5ed);
            color: var(--green, #189a4d);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .title {
            font-size: 14px;
            font-weight: 600;
            color: var(--ink, #1f2124);
          }
          .desc {
            font-size: 12.5px;
            color: var(--ink-2, #62656b);
            line-height: 1.5;
          }
          .btn-reset {
            margin-top: 6px;
            padding: 6px 14px;
            border-radius: var(--radius-control, 8px);
            border: 1px solid var(--line-strong, #e0e2e5);
            background: var(--surface, #fff);
            color: var(--ink, #1f2124);
            font-size: 12.5px;
            cursor: pointer;
            transition: background-color 0.12s;
          }
          .btn-reset:hover { background: var(--hover, #f4f5f6); }
        </style>
        <div class="header">
          <span>${e?"人类反馈完成":"Approval Submitted"}</span>
          <span style="color: var(--green, #189a4d);">✓ ${e?"已确认":"Approved"}</span>
        </div>
        <div class="body">
          <div class="success-icon">${h.check}</div>
          <div class="title">${e?"已向 Agent 发送决策指引":"Decision dispatched to Agent"}</div>
          <div class="desc">${e?"Agent 已根据您的输入更新执行链路并恢复工作。":"The agent has incorporated your input and resumed execution."}</div>
          <button type="button" class="btn-reset" id="reset-btn">${e?"重新模拟提问":"Restart demo"}</button>
        </div>
      `,this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click",()=>this.reset());return}this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 420px;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-card);
          font-family: var(--font-sans, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          font-size: 12px;
        }
        .header-title {
          font-weight: 600;
          color: var(--ink-2, #62656b);
        }
        .header-progress {
          color: var(--ink-3, #9a9da3);
          font-family: var(--font-mono, monospace);
        }
        .body {
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .question-title {
          font-size: 13.5px;
          font-weight: 600;
          line-height: 1.4;
          color: var(--ink, #1f2124);
        }
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .option-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          color: var(--ink, #1f2124);
          font-size: 13px;
          cursor: pointer;
          transition: border-color 0.12s, background-color 0.12s;
          user-select: none;
        }
        .option-item:hover {
          background: var(--hover, #f4f5f6);
          border-color: var(--line-strong, #e0e2e5);
        }
        .option-item.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }
        .indicator {
          width: 14px;
          height: 14px;
          border-radius: ${"radio"===o.type?"50%":"4px"};
          border: 1.5px solid var(--line-strong, #e0e2e5);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface, #fff);
          flex-shrink: 0;
        }
        .option-item.selected .indicator {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .btn-nav {
          padding: 5px 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-nav:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-nav:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn-primary {
          padding: 5px 12px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.9;
        }
        .btn-primary:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      </style>

      <div class="header">
        <span class="header-title">${e?"决策审批":"Human Approval"}</span>
        <span class="header-progress">${e?`第 ${this._qi+1} / ${a} 题`:`${this._qi+1} of ${a}`}</span>
      </div>

      <div class="body">
        <div class="question-title">${o.q}</div>
        <div class="options-list">
          ${o.options.map((e,t)=>{let a=r.includes(t);return`
                <div class="option-item ${a?"selected":""}" data-idx="${t}">
                  <span class="indicator">${a?"✓":""}</span>
                  <span>${e}</span>
                </div>
              `}).join("")}
        </div>
      </div>

      <div class="footer">
        <button type="button" class="btn-nav btn-prev" ${0===this._qi?"disabled":""}>
          ${e?"上一题":"Previous"}
        </button>
        <button type="button" class="btn-primary btn-next" ${i?"":"disabled"}>
          ${n?e?"提交并执行":"Submit & resume":e?"下一题":"Next"}
        </button>
      </div>
    `,this.shadowRoot.querySelectorAll(".option-item").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx"),10);this.toggleOption(t)})}),this.shadowRoot.querySelector(".btn-prev")?.addEventListener("click",()=>this.prev()),this.shadowRoot.querySelector(".btn-next")?.addEventListener("click",()=>this.next())}}"u">typeof customElements&&!customElements.get("nai-approval-card")&&customElements.define("nai-approval-card",E);let z=[{key:"attach",nameEn:"Add photos & files",nameZh:"添加图片和文件",descEn:"Upload from computer",descZh:"从本地上传",icon:h.clip},{key:"scoop",nameEn:"Scoop Data",nameZh:"Scoop 数据",descEn:"Sales & churn metrics",descZh:"销售与产量指标",icon:h.chart},{key:"flavors",nameEn:"Flavor records",nameZh:"风味档案",descEn:"26 makers, tags, links",descZh:"26 家厂商与配方",icon:h.layers},{key:"web",nameEn:"Web search",nameZh:"联网搜索",descEn:"Real-time news and info",descZh:"实时新闻与资讯",icon:h.globe}],S=[{key:"compare",name:"/compare",descEn:"Flavor vs. last summer",descZh:"对比风味与去年同期销量"},{key:"churn-plan",name:"/churn-plan",descEn:"Draft a churn schedule",descZh:"起草搅拌生产排期"},{key:"restock",name:"/restock",descEn:"Build a reorder list",descZh:"生成补货清单"},{key:"draft-email",name:"/draft-email",descEn:"Write a supplier email",descZh:"撰写供应商邮件"},{key:"summarize",name:"/summarize",descEn:"Digest the thread so far",descZh:"总结当前对话要点"}],M=[{key:"sprinkles-5",name:"Sprinkles 5",tagEn:"Flagship",tagZh:"旗舰"},{key:"vanilla-1",name:"Vanilla 1",tagEn:"Basic",tagZh:"基础"},{key:"freezer-burn",name:"Freezer Burn 0.4",tagEn:"Stale",tagZh:"过时"}];class C extends s{static get observedAttributes(){return["variant","lang","placeholder"]}constructor(){super(),this._draft="",this._menu=null,this._activeIdx=0,this._modelOpen=!1,this._model=M[0],this._sweeping=!1}get variant(){return this.getAttribute("variant")||"Rounded"}get isPill(){return"pill"===this.variant.toLowerCase()}onMount(){this.registerListener(document,"click",e=>{!this.contains(e.target)&&!this.shadowRoot?.contains(e.target)&&(this._menu||this._modelOpen)&&(this._menu=null,this._modelOpen=!1,this.render())})}_parseToken(e){let t=/(^|\s)([@/])([\w-]*)$/.exec(e);return t?{kind:"@"===t[2]?"at":"slash",query:t[3].toLowerCase(),start:t.index+t[1].length}:null}_handleInput(e){this._draft=e;let t=this._parseToken(e);t?(this._menu=t.kind,this._activeIdx=0):this._menu=null,this.render()}_selectItem(e){"at"===this._menu?this._draft=this._draft.replace(/@[\w-]*$/,`@${e.name} `):"slash"===this._menu&&(this._draft=e.name+" "),this._menu=null,this.render();let t=this.shadowRoot?.querySelector("textarea");t&&(t.focus(),t.value=this._draft)}_selectModel(e){this._model=e,this._modelOpen=!1,"sprinkles-5"===e.key&&(this._sweeping=!0,this.registerTimeout(()=>{this._sweeping=!1,this.render()},1500)),this.render()}send(){if(!this._draft.trim())return;let e=this._draft.trim();this.dispatchEvent(new CustomEvent("submit",{detail:{text:e,model:this._model.key}})),this._draft="",this._menu=null,this.render()}render(){let e=this.isZh,t=this.isPill,a=this.getAttribute("placeholder")||(e?"向 Agent 提问、输入 @ 关联资源，或输入 / 触发指令...":"Ask the agent, type @ for sources, or / for commands..."),o="at"===this._menu?z.map(t=>({key:t.key,name:e?t.nameZh:t.nameEn,desc:e?t.descZh:t.descEn,icon:t.icon})):"slash"===this._menu?S.map(t=>({key:t.key,name:t.name,desc:e?t.descZh:t.descEn,icon:h.spark})):[];this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          position: relative;
        }
        .composer {
          display: flex;
          flex-direction: column;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: ${t?"24px":"var(--radius-card, 10px)"};
          box-shadow: var(--shadow-card);
          padding: 10px 12px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .composer:focus-within {
          border-color: var(--line-strong, #e0e2e5);
          box-shadow: var(--shadow-raised);
        }
        .sweep-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(61, 154, 255, 0.12), rgba(246, 143, 60, 0.12), rgba(61, 187, 114, 0.12), transparent);
          background-size: 200% 100%;
          animation: sweep-run 1.4s ease-out both;
        }
        @keyframes sweep-run {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        textarea {
          width: 100%;
          min-height: 48px;
          max-height: 140px;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 13.5px;
          color: var(--ink, #1f2124);
          resize: none;
          line-height: 1.5;
        }
        textarea::placeholder {
          color: var(--ink-3, #9a9da3);
        }
        .bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }
        .left-controls, .right-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: ${t?"50%":"var(--radius-control, 8px)"};
          border: none;
          background: transparent;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-icon:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .model-picker-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          color: var(--ink-2, #62656b);
          font-size: 12px;
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .model-picker-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: ${t?"50%":"var(--radius-control, 8px)"};
          border: none;
          background: ${this._draft.trim()?"var(--accent, #0285ff)":"var(--hover, #f4f5f6)"};
          color: ${this._draft.trim()?"#fff":"var(--ink-3, #9a9da3)"};
          cursor: ${this._draft.trim()?"pointer":"default"};
          transition: background-color 0.12s, color 0.12s;
        }
        /* Autocomplete Menu */
        .autocomplete-popup {
          position: absolute;
          bottom: 100%;
          left: 0;
          margin-bottom: 8px;
          width: 280px;
          background: var(--surface, #fff);
          border: 1px solid var(--line-strong, #e0e2e5);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-overlay);
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 50;
        }
        .menu-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          color: var(--ink, #1f2124);
          text-align: left;
          cursor: pointer;
          transition: background 0.1s;
        }
        .menu-row:hover {
          background: var(--hover, #f4f5f6);
        }
        .menu-row-icon {
          color: var(--ink-2, #62656b);
          display: flex;
          align-items: center;
        }
        .menu-row-content {
          display: flex;
          flex-direction: column;
        }
        .menu-row-title {
          font-size: 12.5px;
          font-weight: 500;
        }
        .menu-row-desc {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        /* Model Menu Popup */
        .model-popup {
          position: absolute;
          bottom: 100%;
          left: 12px;
          margin-bottom: 8px;
          width: 220px;
          background: var(--surface, #fff);
          border: 1px solid var(--line-strong, #e0e2e5);
          border-radius: var(--radius-card, 10px);
          box-shadow: var(--shadow-overlay);
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 50;
        }
        .model-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          color: var(--ink, #1f2124);
          font-size: 12.5px;
          cursor: pointer;
        }
        .model-item:hover {
          background: var(--hover, #f4f5f6);
        }
        .model-item.active {
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }
        .model-tag {
          font-size: 10.5px;
          padding: 1px 6px;
          border-radius: 4px;
          background: var(--inset, #f7f8f9);
          color: var(--ink-2, #62656b);
        }
      </style>

      ${this._menu&&o.length>0?`
        <div class="autocomplete-popup">
          ${o.map(e=>`
                <button type="button" class="menu-row" data-key="${e.key}">
                  <span class="menu-row-icon">${e.icon}</span>
                  <div class="menu-row-content">
                    <span class="menu-row-title">${e.name}</span>
                    <span class="menu-row-desc">${e.desc}</span>
                  </div>
                </button>
              `).join("")}
        </div>
      `:""}

      ${this._modelOpen?`
        <div class="model-popup">
          ${M.map(t=>`
            <button type="button" class="model-item ${t.key===this._model.key?"active":""}" data-model="${t.key}">
              <span>${t.name}</span>
              <span class="model-tag">${e?t.tagZh:t.tagEn}</span>
            </button>
          `).join("")}
        </div>
      `:""}

      <div class="composer">
        ${this._sweeping?'<div class="sweep-overlay"></div>':""}
        <textarea placeholder="${a}">${this._draft}</textarea>
        <div class="bottom-bar">
          <div class="left-controls">
            <button type="button" class="btn-icon btn-plus" title="${e?"添加上下文 (@)":"Add context (@)"}">
              ${h.plus}
            </button>
            <button type="button" class="model-picker-btn" id="model-toggle">
              <span>${this._model.name}</span>
              <span>${h.chevronDown}</span>
            </button>
          </div>
          <div class="right-controls">
            <button type="button" class="btn-icon btn-mic" title="${e?"语音输入":"Dictate"}">
              ${h.mic}
            </button>
            <button type="button" class="btn-send" title="${e?"发送":"Send"}">
              ${h.send}
            </button>
          </div>
        </div>
      </div>
    `;let r=this.shadowRoot.querySelector("textarea");r?.addEventListener("input",e=>this._handleInput(e.target.value)),r?.addEventListener("keydown",e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this.send())}),this.shadowRoot.querySelector("#model-toggle")?.addEventListener("click",()=>{this._modelOpen=!this._modelOpen,this._menu=null,this.render()}),this.shadowRoot.querySelectorAll(".model-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-model"),a=M.find(e=>e.key===t);a&&this._selectModel(a)})}),this.shadowRoot.querySelectorAll(".menu-row").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key"),a=o.find(e=>e.key===t);a&&this._selectItem(a)})}),this.shadowRoot.querySelector(".btn-plus")?.addEventListener("click",()=>{this._menu="at"===this._menu?null:"at",this._modelOpen=!1,this.render()}),this.shadowRoot.querySelector(".btn-send")?.addEventListener("click",()=>this.send())}}"u">typeof customElements&&!customElements.get("nai-prompt-bar")&&customElements.define("nai-prompt-bar",C);let R=[{key:"flavors",labelEn:"Flavors",labelZh:"风味"},{key:"suppliers",labelEn:"Suppliers",labelZh:"供应商"}];class Z extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase="done",this._draft="",this._tab="flavors",this._submitted=""}onMount(){let e=this.isZh;this._submitted=e?"对比薄荷巧克力与去年同期销量":"Compare mint chip to last summer"}setTab(e){this._tab=e,this.render()}send(){this._draft.trim()&&(this._submitted=this._draft.trim(),this._draft="",this._phase="sent",this.render(),this.registerTimeout(()=>{this._phase="reply1",this.render()},500),this.registerTimeout(()=>{this._phase="reply2",this.render()},1900),this.registerTimeout(()=>{this._phase="done",this.render()},3100))}render(){let e=this.isZh,t="sent"===this._phase||"reply1"===this._phase;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 420px;
          height: 320px;
          background: var(--surface, #fff);
          border: 1px solid var(--line, #ecedef);
          border-radius: 14px;
          box-shadow: var(--shadow-card);
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .tab-btn {
          padding: 3px 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          opacity: 0.55;
          transition: opacity 0.1s, background-color 0.1s;
        }
        .tab-btn:hover { opacity: 0.85; }
        .tab-btn.active {
          opacity: 1;
          background: var(--field, #f2f2f3);
          font-weight: 500;
        }
        .body-scroll {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .user-msg {
          align-self: flex-end;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          padding: 6px 12px;
          border-radius: 10px 10px 2px 10px;
          font-size: 13px;
          max-width: 85%;
          animation: fade-up 250ms ease;
        }
        .agent-reply {
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: fade-up 300ms ease;
        }
        .agent-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
        }
        .agent-content {
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink, #1f2124);
        }
        .composer {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        input {
          flex: 1;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
        }
        input:focus {
          border-color: var(--accent, #0285ff);
        }
        .btn-send {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-send:hover { opacity: 0.9; }
      </style>

      <div class="header">
        <div>
          ${R.map(t=>`
              <button type="button" class="tab-btn ${this._tab===t.key?"active":""}" data-tab="${t.key}">
                ${e?t.labelZh:t.labelEn}
              </button>
            `).join("")}
        </div>
      </div>

      <div class="body-scroll">
        <div class="user-msg">${this._submitted||(e?"对比薄荷巧克力与去年同期销量":"Compare mint chip to last summer")}</div>
        <div class="agent-reply">
          <div class="agent-label">
            <strong>Agent</strong>
            <span>•</span>
            <span>${e?"刚刚":"Just now"}</span>
          </div>
          <div class="agent-content">
            ${t?`<span style="color: var(--ink-3);">${e?"正在比对历史销售数据...":"Scanning historical records..."}</span>`:e?"薄荷巧克力本季度销量环比上升 18%，在气温超过 30℃ 的周末表现尤为突出，建议增加华夫筒的备货比例。":"Mint chip is up 18% quarter-over-quarter, spiking particularly on weekends above 85°F. Consider lifting waffle cone reorder thresholds."}
          </div>
        </div>
      </div>

      <div class="composer">
        <input type="text" placeholder="${e?"回复 Agent...":"Reply to agent..."}" value="${this._draft}">
        <button type="button" class="btn-send" title="${e?"发送":"Send"}">
          ${h.send}
        </button>
      </div>
    `,this.shadowRoot.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");t&&this.setTab(t)})});let a=this.shadowRoot.querySelector("input");a?.addEventListener("input",e=>{this._draft=e.target.value}),a?.addEventListener("keydown",e=>{"Enter"===e.key&&this.send()}),this.shadowRoot.querySelector(".btn-send")?.addEventListener("click",()=>this.send())}}"u">typeof customElements&&!customElements.get("nai-chat")&&customElements.define("nai-chat",Z);let A=[[{t:"export async function ",c:"kw"},{t:"churnBatch",c:"fn"},{t:"() {",c:"dim"}],[{t:"  const ",c:"kw"},{t:"flavor = "},{t:"await ",c:"kw"},{t:"getFlavor",c:"fn"},{t:"(",c:"dim"},{t:'"pistachio"',c:"str"},{t:");",c:"dim"}],[{t:"  const ",c:"kw"},{t:"base = "},{t:"await ",c:"kw"},{t:"dairy."},{t:"fetch",c:"fn"},{t:"({ flavor });",c:"dim"}],[{t:"  await ",c:"kw"},{t:"freezer."},{t:"store",c:"fn"},{t:"(base, { temp: ",c:"dim"},{t:'"-14C"',c:"str"},{t:" });",c:"dim"}],[{t:"  return ",c:"kw"},{t:"base.gallons;"}],[{t:"}",c:"dim"}]],j={kw:"var(--accent-ink, #0170dd)",str:"var(--green, #189a4d)",num:"var(--orange, #ef720c)",fn:"var(--ink, #1f2124)",dim:"var(--ink-3, #9a9da3)"},L=`export async function churnBatch() {
  const flavor = await getFlavor("pistachio");
  const base = await dairy.fetch({ flavor });
  await freezer.store(base, { temp: "-14C" });
  return base.gallons;
}`;async function T(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a}class I extends s{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._count=0,this._copied=!1,this._copyError=!1}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._count=A.length;return}this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=this._count>=A.length,t=0===this._count?400:e?3200:240;this.registerTimeout(()=>{this._count=this._count>=A.length?0:this._count+1,this.render(),this._scheduleNext()},t)}async copy(){this._copyError=!1;try{if(!await T(L)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh,t=this._count,a=t>=A.length,o=e?"复制":"Copy";this._copyError?o=e?"复制失败":"Copy failed":this._copied&&(o=e?"已复制":"Copied");let r=this._copyError?"color: var(--red, #e3474c);":this._copied?"color: var(--green, #189a4d);":"color: var(--ink-3, #9a9da3);";this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          border: 1px solid var(--line, #ecedef);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .file-info {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .filename {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .filetype {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          height: 24px;
          padding: 0 6px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
          ${r}
        }
        .copy-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        pre {
          margin: 0;
          min-height: 137px;
          background: var(--inset, #f7f8f9);
          padding: 10px 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          line-height: 1.7;
          overflow-x: auto;
        }
        .line {
          display: flex;
          animation: fade-up 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .line-num {
          width: 20px;
          flex-shrink: 0;
          text-align: right;
          font-size: 10.5px;
          line-height: 1.86;
          color: var(--ink-3, #9a9da3);
          opacity: 0.6;
          user-select: none;
        }
        .line-code {
          padding-left: 10px;
          white-space: pre;
        }
        .cursor {
          display: inline-block;
          margin-left: 2px;
          width: 3px;
          height: 12px;
          vertical-align: -1px;
          border-radius: 99px;
          background: var(--accent, #0285ff);
          animation: caret-blink 0.8s ease-in-out infinite;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      </style>

      <div class="container">
        <div class="header">
          <div class="file-info">
            <span class="filename">churn.ts</span>
            <span class="filetype">TypeScript</span>
          </div>
          <button
            type="button"
            class="copy-btn"
            aria-label="${e?"复制代码":"Copy code"}"
          >
            ${this._copied?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>':'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'}
            <span role="status" aria-live="polite">${o}</span>
          </button>
        </div>

        <pre>${A.slice(0,t).map((e,o)=>`
          <div class="line">
            <span class="line-num">${o+1}</span>
            <span class="line-code">${e.map(e=>`<span style="color: ${e.c?j[e.c]:"var(--ink-2, #62656b)"}">${e.t}</span>`).join("")}${o===t-1&&!a?'<span class="cursor"></span>':""}</span>
          </div>`).join("")}</pre>
      </div>
    `,this.shadowRoot.querySelector(".copy-btn")?.addEventListener("click",()=>this.copy())}}"u">typeof customElements&&!customElements.get("nai-code-block")&&customElements.define("nai-code-block",I);let B=[{id:"report",name:"quarterly-report.pdf",kind:"pdf",size:"2.4 MB",state:"ready",progress:100},{id:"wireframe",name:"wireframe.png",kind:"image",size:"1.8 MB",state:"parsing",progress:42},{id:"interview",name:"interview.wav",kind:"audio",size:"18.7 MB",state:"indexing",progress:64},{id:"notes",name:"research-notes.pdf",kind:"pdf",size:"840 KB",state:"failed",progress:38}],q={uploading:{en:"Uploading",zh:"上传中",tone:"var(--accent-ink, #0170dd)",tint:"var(--accent, #0285ff)"},parsing:{en:"Parsing",zh:"解析中",tone:"var(--orange, #ef720c)",tint:"var(--orange, #ef720c)"},indexing:{en:"Indexing",zh:"索引中",tone:"var(--accent-ink, #0170dd)",tint:"var(--accent, #0285ff)"},ready:{en:"Ready",zh:"已就绪",tone:"var(--green, #189a4d)",tint:"var(--green, #189a4d)"},failed:{en:"Parse failed",zh:"解析失败",tone:"var(--red, #e3474c)",tint:"var(--red, #e3474c)"}};class P extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._attachments=JSON.parse(JSON.stringify(B)),this._announcement=""}retry(e){let t=this.isZh,a=this._attachments.find(t=>t.id===e);a&&(this._attachments=this._attachments.map(t=>t.id===e?{...t,state:"uploading",progress:0}:t),this._announcement=t?`正在重试 ${a.name}`:`Retrying ${a.name}`,this.render())}remove(e){let t=this.isZh,a=this._attachments.find(t=>t.id===e);a&&(this._attachments=this._attachments.filter(t=>t.id!==e),this._announcement=t?`已移除 ${a.name}`:`Removed ${a.name}`,this.render())}render(){let e=this.isZh,t=this._attachments;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .list {
          display: flex;
          flex-direction: column;
        }
        .item {
          display: flex;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          transition: background-color 0.2s;
        }
        .item:last-child {
          border-bottom: none;
        }
        .item.failed {
          background: var(--red-tint, #fcecec);
        }
        .file-mark {
          display: flex;
          height: 32px;
          width: 36px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 600;
          color: var(--ink-2, #62656b);
        }
        .item-content {
          min-width: 0;
          flex: 1;
        }
        .item-header {
          display: flex;
          min-width: 0;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .item-name {
          margin: 0;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-size {
          margin: 2px 0 0 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .status-text {
          flex-shrink: 0;
          font-size: 10.5px;
          font-weight: 500;
        }
        .progress-row {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .progress-bar-bg {
          height: 6px;
          flex: 1;
          overflow: hidden;
          border-radius: 99px;
          background: var(--field, #f2f2f3);
        }
        .progress-bar-fill {
          display: block;
          height: 100%;
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .progress-pct {
          width: 28px;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .ready-text {
          margin: 6px 0 0 0;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .action-row {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-retry {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-retry:hover {
          background: var(--hover, #f4f5f6);
        }
        .btn-remove {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 4px 8px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-remove:hover {
          background: var(--hover, #f4f5f6);
          color: var(--red, #e3474c);
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      </style>

      <section class="container" aria-labelledby="attachment-queue-title">
        <div class="header">
          <div>
            <h3 id="attachment-queue-title" class="title">
              ${e?"附件队列":"Attachment queue"}
            </h3>
            <p class="subtitle">
              ${e?"上传、解析并建立检索索引":"Upload, parse, and index for retrieval"}
            </p>
          </div>
          <span class="count-chip">
            ${t.length} ${e?"个文件":"files"}
          </span>
        </div>

        <div class="list">
          ${t.map(t=>{let a=q[t.state]??q.ready,o="uploading"===t.state||"parsing"===t.state||"indexing"===t.state,r="pdf"===t.kind?"PDF":"image"===t.kind?"IMG":"WAV";return`
                <div class="item ${"failed"===t.state?"failed":""}">
                  <span class="file-mark" aria-hidden="true">${r}</span>
                  <div class="item-content">
                    <div class="item-header">
                      <div style="min-width: 0;">
                        <p class="item-name">${t.name}</p>
                        <p class="item-size">${t.size}</p>
                      </div>
                      <span class="status-text" style="color: ${a.tone};">
                        ${e?a.zh:a.en}
                      </span>
                    </div>

                    ${o?`
                      <div class="progress-row">
                        <div
                          role="progressbar"
                          aria-label="${e?`${t.name} 上传进度`:`${t.name} upload progress`}"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          aria-valuenow="${t.progress}"
                          class="progress-bar-bg"
                        >
                          <span
                            class="progress-bar-fill"
                            style="width: ${t.progress}%; background-color: ${a.tint};"
                          ></span>
                        </div>
                        <span class="progress-pct">${t.progress}%</span>
                      </div>
                    `:""}

                    ${"ready"===t.state?`<p class="ready-text">${e?"12 个片段可用于上下文":"12 chunks ready for context"}</p>`:""}

                    ${"failed"===t.state?`
                      <div class="action-row" role="alert">
                        <button
                          type="button"
                          class="btn-retry"
                          data-id="${t.id}"
                          aria-label="${e?"重试":"Retry"} ${t.name}"
                        >
                          ${e?"重试":"Retry"}
                        </button>
                        <button
                          type="button"
                          class="btn-remove"
                          data-id="${t.id}"
                          aria-label="${e?"移除":"Remove"} ${t.name}"
                        >
                          ${e?"移除":"Remove"}
                        </button>
                      </div>
                    `:""}
                  </div>
                </div>
              `}).join("")}
        </div>

        <p class="sr-only" aria-live="polite">${this._announcement}</p>
      </section>
    `,this.shadowRoot.querySelectorAll(".btn-retry").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.retry(t)})}),this.shadowRoot.querySelectorAll(".btn-remove").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.remove(t)})})}}"u">typeof customElements&&!customElements.get("nai-attachment-queue")&&customElements.define("nai-attachment-queue",P);let H=[{id:"sub-1",nameEn:"Web Researcher",nameZh:"网络检索子 Agent",roleEn:"Information Retrieval",roleZh:"资料检索",model:"gemini-2.5-flash",status:"completed",duration:"1.8s",tokens:"1,420",actionEn:"Indexed 4 documentation pages & RFC specs",actionZh:"已解析 4 篇技术文档与 RFC 规范",logsEn:["query: 'Next.js 16 server action streaming rfc'","fetched: https://nextjs.org/docs/app/building-your-application","extracted: 4 key code samples & contract definitions","returned payload to coordinator"],logsZh:["查询: 'Next.js 16 server action streaming rfc'","抓取: https://nextjs.org/docs/app/building-your-application","提取: 4 段核心代码示例与契约定义","已将检索工件返回至主协调器"]},{id:"sub-2",nameEn:"Schema Architect",nameZh:"架构代码子 Agent",roleEn:"Code Generation",roleZh:"代码生成",model:"claude-3-7-sonnet",status:"running",duration:"3.4s",tokens:"3,890",actionEn:"Synthesizing Prisma schema with relational indexes...",actionZh:"正在合成带有关系索引的 Prisma 数据模型...",logsEn:["analyzed entities: User, Workspace, SubagentSession","drafted models & enum definitions","invoking tool: write_file('prisma/schema.prisma')"],logsZh:["分析实体关系: User, Workspace, SubagentSession","起草数据表与枚举类型定义","调用工具: write_file('prisma/schema.prisma')"]},{id:"sub-3",nameEn:"Security Linter",nameZh:"安全审计子 Agent",roleEn:"Vulnerability Audit",roleZh:"漏洞审计",model:"claude-3-5-haiku",status:"waiting",duration:"—",tokens:"0",actionEn:"Waiting for schema file generation...",actionZh:"等待数据架构文件生成完成...",logsEn:["queued: will scan for SQL injection & unindexed foreign keys"],logsZh:["已入队: 将扫描 SQL 注入风险与未索引的外键"]}];class F extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._expandedId="sub-2"}toggleExpand(e){this._expandedId=this._expandedId===e?null:e,this.render()}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .coordinator {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .coord-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .coord-icon {
          position: relative;
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          color: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .coord-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coord-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .coord-model {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--accent-ink, #0170dd);
        }
        .coord-desc {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .coord-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .pulse-dot {
          display: flex;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green, #189a4d);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .tree-body {
          position: relative;
          margin-top: 16px;
          padding-left: 24px;
        }
        .tree-line-v {
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 24px;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
        }
        .agent-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .agent-wrapper {
          position: relative;
        }
        .tree-line-h {
          position: absolute;
          left: -14px;
          top: 18px;
          height: 1px;
          width: 14px;
          background: var(--line-strong, #e0e2e5);
        }
        .agent-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .agent-card:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .agent-card.expanded {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .agent-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
        }
        .agent-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .status-icon {
          display: flex;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .status-completed {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .status-running {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .status-waiting {
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
        .status-failed {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .agent-info {
          min-width: 0;
        }
        .agent-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .agent-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .agent-model-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .agent-action {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 240px;
        }
        .agent-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding-left: 8px;
        }
        .agent-duration {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .chevron {
          color: var(--ink-3, #9a9da3);
          transition: transform 0.2s ease;
        }
        .chevron.expanded {
          transform: rotate(180deg);
        }
        .trace-box {
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
          font-size: 11px;
        }
        .trace-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--ink-3, #9a9da3);
          margin-bottom: 8px;
        }
        .trace-title {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .trace-tokens {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
        }
        .trace-logs {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .trace-log-line {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .trace-prompt {
          color: var(--ink-3, #9a9da3);
          user-select: none;
        }
        .trace-log-text {
          word-break: break-all;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .spin {
          animation: spin 1.2s linear infinite;
        }
      </style>

      <div class="container">
        <!-- Root Coordinator -->
        <div class="coordinator">
          <div class="coord-left">
            <div class="coord-icon">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <div class="coord-title-row">
                <span class="coord-title">${e?"主协调器 (Coordinator)":"Main Coordinator"}</span>
                <span class="coord-model">Claude 3.7</span>
              </div>
              <p class="coord-desc">${e?"正在调度 3 个并行子智能体工作":"Orchestrating 3 parallel subagent workers"}</p>
            </div>
          </div>
          <div class="coord-status">
            <span class="pulse-dot"></span>
            <span>${e?"运行中":"Active"}</span>
          </div>
        </div>

        <!-- Subagent Hierarchy -->
        <div class="tree-body">
          <div class="tree-line-v"></div>
          <div class="agent-list">
            ${H.map(t=>{let a=this._expandedId===t.id,o="",r=`status-${t.status}`;"completed"===t.status?o='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':"running"===t.status?o='<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>':"waiting"===t.status?o='<span style="width: 4px; height: 4px; border-radius: 50%; background: var(--ink-3, #9a9da3);"></span>':"failed"===t.status&&(o='<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>');let n=e?t.logsZh:t.logsEn;return`
                <div class="agent-wrapper">
                  <div class="tree-line-h"></div>
                  <div class="agent-card ${a?"expanded":""}" data-id="${t.id}">
                    <div class="agent-header">
                      <div class="agent-left">
                        <span class="status-icon ${r}">${o}</span>
                        <div class="agent-info">
                          <div class="agent-name-row">
                            <span class="agent-name">${e?t.nameZh:t.nameEn}</span>
                            <span class="agent-model-chip">${t.model}</span>
                          </div>
                          <p class="agent-action">${e?t.actionZh:t.actionEn}</p>
                        </div>
                      </div>
                      <div class="agent-right">
                        ${"—"!==t.duration?`<span class="agent-duration">${t.duration}</span>`:""}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron ${a?"expanded":""}">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                    </div>

                    ${a?`
                      <div class="trace-box">
                        <div class="trace-header">
                          <span class="trace-title">${e?"执行追踪日志 (Trace)":"Execution Trace"}</span>
                          ${"0"!==t.tokens?`<span class="trace-tokens">${t.tokens} tokens</span>`:""}
                        </div>
                        <div class="trace-logs">
                          ${n.map(e=>`
                            <div class="trace-log-line">
                              <span class="trace-prompt">›</span>
                              <span class="trace-log-text">${e}</span>
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
    `,this.shadowRoot.querySelectorAll(".agent-card").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.toggleExpand(t)})})}}"u">typeof customElements&&!customElements.get("nai-subagent-tree")&&customElements.define("nai-subagent-tree",F);let N=[{id:"lead",name:"lead",roleEn:"Coordinator",roleZh:"协调者",provider:"deepseek",model:"reasoner"},{id:"scout",name:"scout",roleEn:"Research",roleZh:"调研",provider:"deepseek",model:"chat"},{id:"forge",name:"forge",roleEn:"Implementer",roleZh:"实现",provider:"anthropic",model:"sonnet"},{id:"audit",name:"audit",roleEn:"Reviewer",roleZh:"评审",provider:"openai",model:"gpt-5"}],U=[{id:"t1",titleEn:"Map provider rate limits",titleZh:"梳理提供方速率限制",assignee:"scout",dependsOn:[],scopes:["docs/limits.md"]},{id:"t2",titleEn:"Implement retry backoff",titleZh:"实现指数退避重试",assignee:"forge",dependsOn:["t1"],scopes:["src/llm/retry.cs"]},{id:"t3",titleEn:"Add backoff unit tests",titleZh:"补退避策略单元测试",assignee:"forge",dependsOn:["t2"],scopes:["tests/retry.cs"]},{id:"t4",titleEn:"Review & sign off",titleZh:"评审并签收",assignee:"audit",dependsOn:["t2","t3"],scopes:[]}],O={lead:["active","active","active","active","active"],scout:["active","active","active","active","active"],forge:["provisioning","active","active","active","active"],audit:["provisioning","provisioning","active","active","active"]},D=[["in_progress","pending","pending","pending"],["completed","in_progress","pending","pending"],["completed","completed","in_progress","pending"],["completed","completed","completed","in_progress"],["completed","completed","completed","completed"]];class V extends s{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._tick=0}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=this._tick>=O.lead.length-1;this.registerTimeout(()=>{this._tick=e?0:this._tick+1,this.render(),this._scheduleNext()},e?4200:2100)}render(){let e=this.isZh,t=this._tick,a=N.filter(e=>"active"===O[e.id][t]).length,o=D[t].filter(e=>"completed"===e).length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pulse-accent {
          display: flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .team-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .task-counter {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .roster-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .member-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 10px;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .member-card.lead {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--inset, #f7f8f9);
        }
        .member-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .avatar {
          display: flex;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 600;
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }
        .avatar.lead {
          background: var(--ink, #1f2124);
          color: var(--surface, #fff);
        }
        .member-info {
          min-width: 0;
        }
        .name-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .member-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .model-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .member-role {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .phase-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-size: 10px;
          font-weight: 500;
          flex-shrink: 0;
        }
        .phase-badge.active {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .phase-badge.provisioning {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .phase-badge.failed {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .badge-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
        }
        .badge-dot.active { background: var(--green, #189a4d); }
        .badge-dot.provisioning { background: var(--orange, #ef720c); animation: pulse 1.5s infinite; }
        .badge-dot.failed { background: var(--red, #e3474c); }
        .dag-section {
          margin-top: 16px;
        }
        .dag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
          padding: 0 2px;
        }
        .dag-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .dag-meta {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .task-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 10px;
          transition: all 0.3s;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .task-item.in_progress {
          border-color: rgba(2, 133, 255, 0.4);
          background: var(--accent-tint, #e9f3ff);
        }
        .task-item.completed {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
          opacity: 0.75;
        }
        .task-icon {
          display: flex;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        .task-icon.completed {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .task-icon.in_progress {
          background: var(--accent-tint, #e9f3ff);
        }
        .task-icon.pending {
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
        }
        .task-content {
          min-width: 0;
          flex: 1;
        }
        .task-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .task-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .task-title.completed {
          color: var(--ink-2, #62656b);
          text-decoration: line-through;
          text-decoration-color: var(--line-strong, #e0e2e5);
        }
        .rev-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }
        .task-meta-row {
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .assignee-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .deps-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .scope-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          border-radius: var(--radius-chip, 6px);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          border: 1px solid var(--line, #ecedef);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .blocked-tag {
          color: var(--orange, #ef720c);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-tech {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .spin {
          animation: spin 1.2s linear infinite;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="pulse-accent"></span>
            <h3 class="header-title">${e?"智能体团队":"Agent Team"}</h3>
            <span class="team-tag">team/provider-migration</span>
          </div>
          <span class="task-counter">${o}/${U.length} ${e?"任务":"tasks"}</span>
        </div>

        <!-- Roster -->
        <div class="roster-grid">
          ${N.map(a=>{let o=O[a.id][t],r="lead"===a.id;return`
              <div class="member-card ${r?"lead":""}">
                <div class="member-left">
                  <span class="avatar ${r?"lead":""}">${a.name.slice(0,2)}</span>
                  <div class="member-info">
                    <div class="name-row">
                      <span class="member-name">${a.name}</span>
                      <span class="model-chip">${a.model}</span>
                    </div>
                    <span class="member-role">${e?a.roleZh:a.roleEn} \xb7 ${a.provider}</span>
                  </div>
                </div>
                <span class="phase-badge ${o}">
                  <span class="badge-dot ${o}"></span>
                  ${"active"===o?e?"已激活":"active":"provisioning"===o?e?"供给中":"provisioning":e?"失败":"failed"}
                </span>
              </div>
            `}).join("")}
        </div>

        <!-- Shared task DAG -->
        <div class="dag-section">
          <div class="dag-header">
            <span class="dag-title">${e?"共享任务 DAG":"Shared task DAG"}</span>
            <span class="dag-meta">CAS revisions</span>
          </div>

          <div class="tasks-list">
            ${U.map((a,o)=>{let r,n=D[t][o],i=a.dependsOn.some(e=>{let a=U.findIndex(t=>t.id===e);return"completed"!==D[t][a]}),s=(r=a.assignee,N.find(e=>e.id===r)),d=1+D.slice(0,t+1).filter(e=>e[o]!==D[0][o]).length,l="";return"completed"===n?l='<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>':"in_progress"===n&&(l='<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-ink, #0170dd)" stroke-width="2.6" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" stroke-linecap="round"/></svg>'),`
                <div class="task-item ${n}">
                  <span class="task-icon ${n}">${l}</span>
                  <div class="task-content">
                    <div class="task-title-row">
                      <span class="task-title ${"completed"===n?"completed":""}">${e?a.titleZh:a.titleEn}</span>
                      <span class="rev-chip">r${d}</span>
                    </div>
                    <div class="task-meta-row">
                      ${s?`<span class="assignee-tag">@${s.name}</span>`:""}
                      ${a.dependsOn.length>0?`<span class="deps-tag">deps: ${a.dependsOn.join(", ")}</span>`:""}
                      ${a.scopes.map(e=>`<span class="scope-tag">${e}</span>`).join("")}
                      ${i&&"pending"===n?`<span class="blocked-tag">${e?"被阻塞":"blocked"}</span>`:""}
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${e?`${a}/4 成员已激活 \xb7 事件溯源名册`:`${a}/4 members active \xb7 event-sourced roster`}</span>
          <span class="footer-tech">Harness.AgentTeams</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-agent-teams")&&customElements.define("nai-agent-teams",V);let W=[600,900,2400,1400,2400,600];class K extends s{static get observedAttributes(){return["variant","lang","auto"]}constructor(){super(),this._tick=0,this._manualOpen={}}get variant(){return this.getAttribute("variant")||"Capsules"}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){this.autoPlay&&this._scheduleNext()}_scheduleNext(){!this.autoPlay||this._tick>=W.length-1||this.registerTimeout(()=>{this._tick=this._tick+1,this.render(),this._scheduleNext()},W[this._tick])}toggleRow(e){let t="index"===e&&2===this._tick,a=this._manualOpen[e]??t;this._manualOpen[e]=!a,this.render()}render(){let e=this.isZh,t=this._tick,a="List"===this.variant,o=t<3?"pending":3===t?"failed":"done",r=[{key:"verify",badgeType:"check",label:e?"校验供应商资质档案":"Verified vendor records",amount:e?"12 家供应商":"12 suppliers",pillHtml:`
          <span class="pill-badge pill-green">
            ${e?"已完成":"Completed"}
          </span>
        `,details:[{label:e?"核对税务与联系人 ID":"Matched tax and contact IDs",meta:"12/12"},{label:e?"标记过期记录":"Flagged stale records",meta:"0"}]},{key:"index",badgeType:"spinner-active",badgeNum:"2",label:e?"生成自动补货计划清单":"Build reorder task list",amount:e?"7 款 SKU":"7 SKUs",pillHtml:"",details:[{label:e?"读取 POS 导出数据":"Reading POS export",meta:e?"3 个文件":"3 files"},{label:e?"评估缺货断货风险":"Scoring stockout risk",meta:"68%"}]},{key:"draft",badgeType:"pending"===o?"spinner-idle":"failed"===o?"cross":"check",badgeNum:"3",label:e?"起草供应商跟进邮件":"Draft supplier emails",amount:e?"2 封草稿":"2 messages",pillHtml:"failed"===o?`
          <span class="pill-badge pill-red">
            ${e?"失败重试中":"Failed"}
            <span class="spin icon-flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"/></svg>
            </span>
          </span>
        `:"done"===o?`
          <span class="pill-badge pill-green">
            ${e?"已完成":"Completed"}
          </span>
        `:"",details:[{label:e?"脆筒供应商跟进通知":"Cone supplier follow-up",meta:e?"草稿":"draft"},{label:e?"开心果原料补货备注":"Pistachio reorder note",meta:e?"草稿":"draft"}]}];this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 440px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          display: flex;
          width: 100%;
          flex-direction: column;
          ${a?"gap: 0; overflow: hidden; border-radius: var(--radius-card, 10px); background: var(--surface, #fff); box-shadow: var(--shadow-card, 0 0 0 1px var(--line)); border: 1px solid var(--line, #ecedef);":"min-height: 196px; gap: 8px;"}
        }
        .row-card {
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
          transition: border-radius 0.3s ease;
          ${a?"border-bottom: 1px solid var(--line, #ecedef); background: var(--surface, #fff);":"background: var(--surface, #fff); box-shadow: var(--shadow-card, 0 0 0 1px var(--line)); border: 1px solid var(--line, #ecedef);"}
        }
        ${a?".row-card:last-child { border-bottom: none; }":""}
        .row-btn {
          display: flex;
          height: 44px;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 0 12px;
          border: none;
          background: transparent;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.1s ease;
        }
        .row-btn:hover {
          background-color: var(--hover, #f4f5f6);
        }
        .badge-pop {
          display: flex;
          width: 22px;
          height: 22px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          animation: pop-in 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .badge-green { background: var(--green, #189a4d); }
        .badge-red { background: var(--red, #e3474c); }
        .spinner-ring-wrap {
          position: relative;
          display: inline-flex;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }
        .spinner-svg {
          position: absolute;
          inset: 0;
        }
        .spinner-num {
          position: relative;
          font-size: 10.5px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .row-label {
          min-width: 0;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .row-amount {
          flex-shrink: 0;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }
        .pill-badge {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 99px;
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          animation: fade-in 200ms ease-out both;
        }
        .pill-green {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .pill-red {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .details-box {
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 12px;
          font-size: 11.5px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .detail-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--ink-2, #62656b);
        }
        .detail-meta {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1.1s linear infinite;
        }
        .icon-flex {
          display: flex;
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        ${r.map((e,o)=>{let r="index"===e.key&&2===t,n=this._manualOpen[e.key]??r,i=a?"border-radius: 0;":`border-radius: ${n?14:22}px;`;return`
              <div
                class="row-card"
                style="${i} animation: fade-up 450ms cubic-bezier(0.23,1,0.32,1) ${80*o}ms both;"
              >
                <button
                  type="button"
                  class="row-btn"
                  data-key="${e.key}"
                  aria-expanded="${n}"
                >
                  ${(e=>{if("check"===e.badgeType)return`
          <span class="badge-pop badge-green">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </span>
        `;if("cross"===e.badgeType)return`
          <span class="badge-pop badge-red">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </span>
        `;let t="spinner-active"===e.badgeType,a=2*Math.PI*11;return`
        <span class="spinner-ring-wrap">
          <svg width="24" height="24" class="spinner-svg ${t?"spin":""}">
            <circle cx="12" cy="12" r="11" fill="none" stroke="var(--line, #ecedef)" stroke-width="2" />
            ${t?`<circle cx="12" cy="12" r="11" fill="none" stroke="var(--ink-3, #9a9da3)" stroke-width="2" stroke-linecap="round" stroke-dasharray="${.28*a} ${.72*a}" />`:""}
          </svg>
          <span class="spinner-num">${e.badgeNum}</span>
        </span>
      `})(e)}
                  <span class="row-label">${e.label}</span>
                  <span class="row-amount">${e.amount}</span>
                  ${e.pillHtml}
                </button>

                ${n?`
                  <div class="details-box">
                    ${e.details.map(e=>`
                      <div class="detail-line">
                        <span>${e.label}</span>
                        <span class="detail-meta">${e.meta}</span>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            `}).join("")}
      </div>
    `,this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-task-rows")&&customElements.define("nai-task-rows",K);let G={think:'<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />',write:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>',run:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>',read:'<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>'},J=[{icon:"think",labelEn:"Thinking",labelZh:"深度思考",chipEn:"Planning the churn schedule…",chipZh:"正在规划搅拌排期…",mono:!1,detailMono:!1,detail:[{textEn:"Weekend demand carries pistachio, so it churns first.",textZh:"周末需求以开心果口味为主，优先安排搅拌。"},{textEn:"Batch capacity leaves two evening freezer windows.",textZh:"批次产能还留出两个晚间冷冻空档。"}]},{icon:"write",labelEn:"Write 204 lines",labelZh:"写入 204 行",chipEn:"ChurnSchedule.tsx",mono:!0,detailMono:!0,detail:[{textEn:"+ const windows = slots.filter((s) => s.temp <= -12)",tone:"add"},{textEn:'+ return schedule(windows, { hero: "pistachio" })',tone:"add"}]},{icon:"run",labelEn:"Rebuild and verify",labelZh:"重新构建并验证",chipEn:"npm run freeze",mono:!0,detailMono:!0,detail:[{textEn:"✓ built in 1.2s",textZh:"✓ 构建完成，耗时 1.2s"},{textEn:"✓ 34 checks passed",textZh:"✓ 34 项检查通过"}]},{icon:"read",labelEn:"Read image",labelZh:"读取图片",chipEn:"flavor-chart.png",mono:!0,detailMono:!1,detail:[{textEn:"1280 × 720 · line chart, three summers.",textZh:"1280 × 720 · 折线图，横跨三个夏季。"},{textEn:"Mint chip trends up 12% through July.",textZh:"薄荷巧克力口味到 7 月上涨 12%。"}]}],Y=[{file:"flavors.css",add:13,del:0},{file:"ChurnSchedule.tsx",add:74,del:41},{file:"menu.ts",add:8,del:2}];class Q extends s{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._step=0,this._open=!0,this._openRows=new Set}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._step=J.length+1;return}this._scheduleNext()}_scheduleNext(){if(!this.autoPlay)return;let e=J.length+1;this._step>=e||this.registerTimeout(()=>{this._step=this._step+1,this.render(),this._scheduleNext()},700)}toggleRun(){this._open=!this._open,this.render()}toggleRow(e){this._openRows.has(e)?this._openRows.delete(e):this._openRows.add(e),this.render()}render(){let e=this.isZh,t=this._step,a=this._open,o=J.length+1;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 320px;
          min-height: 220px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          padding-bottom: 4px;
        }
        .header-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 4px 6px;
          margin: 0 -6px;
          font-size: 12.5px;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .header-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .chevron-main {
          transition: transform 0.2s;
          transform: rotate(${a?"0deg":"-90deg"});
        }
        .content-collapse {
          display: grid;
          grid-template-rows: ${a?"1fr":"0fr"};
          opacity: ${+!!a};
          transition: grid-template-rows 0.3s, opacity 0.3s;
        }
        .content-inner {
          overflow: hidden;
          padding: 0 6px 4px 6px;
          margin: 0 -4px;
        }
        .rows-list {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .row-item {
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .row-btn {
          display: flex;
          height: 28px;
          width: calc(100% + 6px);
          margin: 0 -3px;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 0 4px;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .row-btn:hover {
          background-color: var(--hover-2, #e7e9eb);
        }
        .icon-wrap {
          position: relative;
          display: flex;
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          color: var(--ink-3, #9a9da3);
        }
        .icon-tool {
          transition: opacity 0.1s;
        }
        .icon-chev {
          position: absolute;
          transition: opacity 0.15s, transform 0.15s;
        }
        .row-btn:hover .icon-tool { opacity: 0; }
        .row-btn:hover .icon-chev { opacity: 1 !important; }
        .row-label {
          flex-shrink: 0;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .chip {
          display: inline-flex;
          height: 22px;
          min-width: 0;
          flex: 1;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          background: var(--hover-2, #e7e9eb);
          padding: 0 6px;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: background-color 0.1s;
        }
        .chip:hover {
          background: var(--line-strong, #e0e2e5);
        }
        .chip.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .detail-collapse {
          display: grid;
          transition: grid-template-rows 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .detail-inner {
          min-height: 0;
          overflow: hidden;
        }
        .detail-lines {
          margin: 2px 0 4px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          border-left: 1px solid var(--line, #ecedef);
          padding: 2px 0 2px 14px;
        }
        .detail-line {
          font-size: 11.5px;
          line-height: 1.6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--ink-2, #62656b);
        }
        .detail-line.mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
        .detail-line.add {
          color: var(--green, #189a4d);
        }
        .diffs-section {
          margin-top: 10px;
          display: flex;
          max-width: 100%;
          flex-wrap: wrap;
          gap: 6px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 10px;
        }
        .diff-chip {
          display: inline-flex;
          height: 28px;
          max-width: 100%;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-chip, 6px);
          background: var(--surface, #fff);
          padding: 0 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong));
          cursor: pointer;
          transition: background-color 0.1s;
        }
        .diff-chip:hover {
          background: var(--hover, #f4f5f6);
        }
        .diff-file {
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .diff-add {
          flex-shrink: 0;
          color: var(--green, #189a4d);
          font-variant-numeric: tabular-nums;
        }
        .diff-del {
          flex-shrink: 0;
          color: var(--red, #e3474c);
          font-variant-numeric: tabular-nums;
        }
        .diff-more {
          display: inline-flex;
          height: 28px;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          padding: 0 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.1s, text-decoration-color 0.1s;
        }
        .diff-more:hover {
          color: var(--ink-2, #62656b);
          text-decoration-color: currentColor;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      </style>

      <button type="button" class="header-btn" aria-expanded="${a}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="chevron-main">
          <path d="M6 9l6 6 6-6"/>
        </svg>
        <span>${e?"4 次工具调用，2 条消息":"4 tool calls, 2 messages"}</span>
      </button>

      <div class="content-collapse">
        <div class="content-inner">
          <div class="rows-list">
            ${J.slice(0,t).map(t=>{let a=this._openRows.has(t.labelEn);return`
                  <div class="row-item">
                    <button
                      type="button"
                      class="row-btn"
                      data-label="${t.labelEn}"
                      aria-expanded="${a}"
                    >
                      <span class="icon-wrap">
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="${"think"===t.icon?"currentColor":"none"}"
                          stroke="currentColor"
                          class="icon-tool"
                          style="opacity: ${+!a};"
                        >
                          ${G[t.icon]}
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
                          class="icon-chev"
                          style="opacity: ${+!!a}; transform: rotate(${a?"0deg":"-90deg"});"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                      <span class="row-label">${e?t.labelZh:t.labelEn}</span>
                      <span class="chip ${t.mono?"mono":""}">
                        ${e?t.chipZh??t.chipEn:t.chipEn}
                      </span>
                    </button>

                    <div
                      class="detail-collapse"
                      style="grid-template-rows: ${a?"1fr":"0fr"}; opacity: ${+!!a};"
                    >
                      <div class="detail-inner">
                        <div class="detail-lines">
                          ${t.detail.map(a=>`
                            <span class="detail-line ${t.detailMono?"mono":""} ${"add"===a.tone?"add":""}">
                              ${e?a.textZh??a.textEn:a.textEn}
                            </span>
                          `).join("")}
                        </div>
                      </div>
                    </div>
                  </div>
                `}).join("")}
          </div>

          ${t>=o?`
            <div class="diffs-section">
              ${Y.map((e,t)=>`
                <span
                  class="diff-chip"
                  style="animation: pop-in 250ms cubic-bezier(0.23,1,0.32,1) ${80*t}ms both;"
                >
                  <span class="diff-file">${e.file}</span>
                  <span class="diff-add">+${e.add}</span>
                  ${e.del>0?`<span class="diff-del">−${e.del}</span>`:""}
                </span>
              `).join("")}
              <button
                type="button"
                class="diff-more"
                style="animation: fade-in 300ms ease-out ${80*Y.length}ms both;"
              >
                ${e?"+ 还有 2 项":"+2 more"}
              </button>
            </div>
          `:""}
        </div>
      </div>
    `,this.shadowRoot.querySelector(".header-btn")?.addEventListener("click",()=>this.toggleRun()),this.shadowRoot.querySelectorAll(".row-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-label");t&&this.toggleRow(t)})})}}"u">typeof customElements&&!customElements.get("nai-tool-chips")&&customElements.define("nai-tool-chips",Q);let X=[{id:"soft",titleEn:"Soft Token Migration",titleZh:"平滑双轨迁移 (推荐)",descEn:"Maintain backward compatibility for v1 JWTs until expiration (7 days).",descZh:"在旧版 JWT 过期（7天）前保持向后兼容，用户无感知过渡。",recommended:!0,tagEn:"Recommended",tagZh:"推荐"},{id:"dual",titleEn:"Dual-Format Verification",titleZh:"双签名格式校验",descEn:"Verify both RSA256 and EdDSA key signatures concurrently at the gateway.",descZh:"在 API 网关同时验证 RSA256 与 EdDSA 密钥签名，保障零停机。",tagEn:"Zero Downtime",tagZh:"零停机"},{id:"revoke",titleEn:"Immediate Session Revocation",titleZh:"立即重置所有会话",descEn:"Flush Redis token store and force all active users to re-authenticate.",descZh:"立即清空 Redis 缓存并强制所有在线用户重新登录认证。",tagEn:"High Security",tagZh:"最高安全性"}];class ee extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedId="soft",this._customText="",this._isSubmitted=!1}selectOption(e){this._selectedId=e,this.render()}submit(){this._isSubmitted=!0,this.render()}reset(){this._isSubmitted=!1,this._selectedId="soft",this._customText="",this.render()}render(){let e=this.isZh,t=this._isSubmitted,a=this._selectedId,o=this._customText,r="";if("custom"===a)r=o||(e?"自定义指令":"Custom Instruction");else{let t=X.find(e=>e.id===a);r=t?e?t.titleZh:t.titleEn:""}if(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
          transition: all 0.2s;
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-orange {
          display: flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-subtitle {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .step-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .question-text {
          margin: 12px 0 0 0;
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .options-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .option-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .option-label:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .option-label.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .radio-input {
          margin-top: 2px;
          width: 14px;
          height: 14px;
          accent-color: var(--accent, #0285ff);
          cursor: pointer;
        }
        .option-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .option-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .option-title {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .option-tag {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .option-tag.recommended {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .option-tag.normal {
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }
        .option-desc {
          margin-top: 2px;
          font-size: 11px;
          line-height: 1.4;
          color: var(--ink-2, #62656b);
        }
        .custom-input-wrap {
          margin-top: 12px;
        }
        .custom-input {
          width: 100%;
          box-sizing: border-box;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 8px 12px;
          font-family: inherit;
          font-size: 12px;
          color: var(--ink, #1f2124);
          transition: background-color 0.15s, border-color 0.15s;
        }
        .custom-input:focus {
          outline: none;
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
        }
        .actions-row {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
        }
        .btn-skip {
          border: none;
          background: transparent;
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: color 0.12s;
        }
        .btn-skip:hover {
          color: var(--ink, #1f2124);
        }
        .btn-submit {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #fff;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-submit:hover {
          opacity: 0.9;
        }
        .submitted-card {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid rgba(24, 154, 77, 0.3);
          background: var(--green-tint, #e8f5ed);
          padding: 16px;
          text-align: center;
        }
        .check-circle {
          display: flex;
          width: 28px;
          height: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--green, #189a4d);
          color: #fff;
          margin-bottom: 8px;
        }
        .recorded-title {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .recorded-desc {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .btn-reset {
          margin-top: 12px;
          border: none;
          background: transparent;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          text-decoration: underline;
          cursor: pointer;
        }
        .btn-reset:hover {
          color: var(--ink, #1f2124);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-orange">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <div>
              <h4 class="header-title">${e?"需要架构决策澄清":"Clarification Required"}</h4>
              <span class="header-subtitle">${e?"架构决策 #4":"Architectural Decision #4"}</span>
            </div>
          </div>
          <span class="step-chip">${e?"第 2 步，共 5 步":"Step 2 of 5"}</span>
        </div>

        <!-- Main Question -->
        <p class="question-text">
          ${e?"检测到 Redis 中存有历史活跃会话。在执行认证架构迁移时，您希望如何处理这些存量会话？":"We detected existing session stores in Redis. How would you like the authentication migration to handle active sessions?"}
        </p>

        ${t?`
          <div class="submitted-card">
            <div class="check-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span class="recorded-title">
              ${e?"决策已确认：":"Decision Recorded: "} ${r}
            </span>
            <p class="recorded-desc">
              ${e?"智能体已根据所选策略恢复自动执行。":"Agent execution resumed with selected migration policy."}
            </p>
            <button type="button" class="btn-reset" id="reset-btn">
              ${e?"修改决策":"Change decision"}
            </button>
          </div>
        `:`
          <!-- Options List -->
          <div class="options-list">
            ${X.map(t=>{let o=a===t.id,r=e?t.tagZh:t.tagEn;return`
                <label class="option-label ${o?"selected":""}" data-id="${t.id}">
                  <input
                    type="radio"
                    name="clarification-choice"
                    class="radio-input"
                    ${o?"checked":""}
                  />
                  <div class="option-content">
                    <div class="option-title-row">
                      <span class="option-title">${e?t.titleZh:t.titleEn}</span>
                      ${r?`<span class="option-tag ${t.recommended?"recommended":"normal"}">${r}</span>`:""}
                    </div>
                    <span class="option-desc">${e?t.descZh:t.descEn}</span>
                  </div>
                </label>
              `}).join("")}
          </div>

          <!-- Custom Input -->
          <div class="custom-input-wrap">
            <input
              type="text"
              class="custom-input"
              placeholder="${e?"或直接输入自定义迁移要求...":"Or provide custom migration rules..."}"
              value="${o}"
            />
          </div>

          <!-- Actions -->
          <div class="actions-row">
            <button type="button" class="btn-skip" id="skip-btn">
              ${e?"跳过 (采纳推荐)":"Skip (Use Recommended)"}
            </button>
            <button type="button" class="btn-submit" id="submit-btn">
              <span>${e?"确认并继续":"Confirm & Proceed"}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        `}
      </div>
    `,t)this.shadowRoot.querySelector("#reset-btn")?.addEventListener("click",()=>this.reset());else{this.shadowRoot.querySelectorAll(".option-label").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.selectOption(t)})});let e=this.shadowRoot.querySelector(".custom-input");e?.addEventListener("input",e=>{this._customText=e.target.value,e.target.value&&(this._selectedId="custom")}),this.shadowRoot.querySelector("#skip-btn")?.addEventListener("click",()=>{this._selectedId="soft",this.submit()}),this.shadowRoot.querySelector("#submit-btn")?.addEventListener("click",()=>{this.submit()})}}}"u">typeof customElements&&!customElements.get("nai-clarification-card")&&customElements.define("nai-clarification-card",ee);let et=[{model:"GPT-5.2",time:"10:41",answerEn:"Start with retrieval failures: 38% of missed answers share the same stale index.",answerZh:"先排查检索失败：38% 的漏答都指向同一个过期索引。"},{model:"Claude Sonnet 4.6",time:"10:42",answerEn:"The strongest signal is latency. Re-index before changing prompts.",answerZh:"最强信号是延迟。先重建索引，再考虑调整提示词。"},{model:"Gemini 3.1 Pro",time:"10:43",answerEn:"Compare a fresh-index cohort while keeping the prompt unchanged.",answerZh:"对比新索引样本，并保持提示词不变。"}];class ea extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._branchIndex=1,this._continuingFrom=null}navigate(e){e<0||e>=et.length||(this._branchIndex=e,this._continuingFrom=null,this.render())}continueFromCurrent(){this._continuingFrom=this._branchIndex,this.render()}render(){let e=this.isZh,t=this._branchIndex,a=et[t],o=this._continuingFrom;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .title {
          margin: 0;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .body {
          padding: 16px;
        }
        .meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .green-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green, #189a4d);
        }
        .model-info {
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }
        .answer-text {
          margin: 12px 0 0 0;
          min-height: 64px;
          font-size: 13px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }
        .footer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
        }
        .nav-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .btn-nav {
          display: flex;
          height: 28px;
          width: 32px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          font-size: 14px;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-btn);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .btn-nav:hover:not(:disabled) {
          background-color: var(--hover, #f4f5f6);
        }
        .btn-nav:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .btn-continue {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--ink, #1f2124);
          padding: 6px 12px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--surface, #fff);
          cursor: pointer;
          transition: opacity 0.12s;
        }
        .btn-continue:hover {
          opacity: 0.85;
        }
        .status-msg {
          margin: 8px 0 0 0;
          min-height: 16px;
          text-align: right;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
        }
      </style>

      <section class="container" aria-labelledby="message-branches-title">
        <header class="header">
          <div>
            <h3 id="message-branches-title" class="title">
              ${e?"回答分支":"Answer branches"}
            </h3>
            <p class="subtitle">
              ${e?"比较重新生成的回答":"Compare regenerated responses"}
            </p>
          </div>
          <span class="count-chip">
            ${t+1} / ${et.length}
          </span>
        </header>

        <div class="body">
          <div class="meta-row">
            <span class="green-dot" aria-hidden="true"></span>
            <span class="model-info">${a.model} \xb7 ${a.time}</span>
          </div>

          <p class="answer-text" aria-live="polite">
            ${e?a.answerZh:a.answerEn}
          </p>

          <div class="footer">
            <div class="nav-btns">
              <button
                type="button"
                class="btn-nav"
                id="btn-prev"
                aria-label="${e?"上一个分支":"Previous branch"}"
                ${0===t?"disabled":""}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                class="btn-nav"
                id="btn-next"
                aria-label="${e?"下一个分支":"Next branch"}"
                ${t===et.length-1?"disabled":""}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <button
              type="button"
              class="btn-continue"
              id="btn-continue"
              aria-label="${e?"从此分支继续":"Continue from this branch"}"
            >
              ${e?"从此分支继续":"Continue from here"}
            </button>
          </div>

          <p role="status" aria-live="polite" class="status-msg">
            ${null===o?"":e?`正从分支 ${o+1} 继续`:`Continuing from branch ${o+1}`}
          </p>
        </div>
      </section>
    `,this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click",()=>this.navigate(this._branchIndex-1)),this.shadowRoot.querySelector("#btn-next")?.addEventListener("click",()=>this.navigate(this._branchIndex+1)),this.shadowRoot.querySelector("#btn-continue")?.addEventListener("click",()=>this.continueFromCurrent())}}"u">typeof customElements&&!customElements.get("nai-message-branches")&&customElements.define("nai-message-branches",ea);let eo=[{id:"system",labelEn:"System & Directives",labelZh:"系统指令与安全约束",tokens:4200,color:"var(--accent, #0285ff)",badgeBg:"var(--accent-tint, #e9f3ff)",badgeColor:"var(--accent-ink, #0170dd)",descEn:"Base system instructions, developer constraints, and safety guidelines.",descZh:"基础系统提示词、开发者约束与安全合规守则。"},{id:"rag",labelEn:"RAG & Retrieved Docs",labelZh:"RAG 检索增强知识",tokens:28400,color:"var(--green, #189a4d)",badgeBg:"var(--green-tint, #e8f5ed)",badgeColor:"var(--green, #189a4d)",descEn:"12 code chunks and 3 architectural design docs injected via semantic search.",descZh:"语义搜索注入的 12 个代码切片与 3 份架构设计文档。"},{id:"history",labelEn:"Conversation History",labelZh:"会话上下文历史",tokens:16850,color:"var(--orange, #ef720c)",badgeBg:"var(--orange-tint, #fdf1e5)",badgeColor:"var(--orange, #ef720c)",descEn:"14 previous conversation turns including user prompts and code diffs.",descZh:"前 14 轮对话交互，包含用户指令与代码差异记录。"},{id:"tools",labelEn:"Tool Outputs & Traces",labelZh:"工具调用输出与追踪",tokens:9350,color:"var(--ink-2, #62656b)",badgeBg:"var(--hover-2, #e7e9eb)",badgeColor:"var(--ink-2, #62656b)",descEn:"Terminal stdout, ripgrep search results, and linter diagnostics.",descZh:"终端标准输出、ripgrep 搜索结果与 linter 诊断信息。"}];class er extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._segments=JSON.parse(JSON.stringify(eo)),this._activeSegmentId=null,this._isPruned=!1}handlePruneHistory(){this._isPruned?(this._segments=JSON.parse(JSON.stringify(eo)),this._isPruned=!1):(this._segments=this._segments.map(e=>"history"===e.id?{...e,tokens:Math.round(.45*e.tokens)}:"tools"===e.id?{...e,tokens:Math.round(.3*e.tokens)}:e),this._isPruned=!0),this.render()}setActiveSegment(e){this._activeSegmentId=e,this.render()}render(){let e=this.isZh,t=this._segments,a=this._activeSegmentId,o=this._isPruned,r=t.reduce((e,t)=>e+t.tokens,0),n=(r/128e3*100).toFixed(1),i=(r/1e6*3).toFixed(4);this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .green-dot {
          display: flex;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green, #189a4d);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .capacity-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cost-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .btn-prune {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-prune:hover {
          background-color: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .gauge-metric {
          margin-top: 4px;
        }
        .metric-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 11.5px;
        }
        .tokens-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .tokens-max {
          color: var(--ink-3, #9a9da3);
        }
        .capacity-pct {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          color: var(--ink-2, #62656b);
        }
        .segmented-bar {
          margin-top: 10px;
          display: flex;
          height: 10px;
          width: 100%;
          overflow: hidden;
          border-radius: 99px;
          background: var(--field, #f2f2f3);
          padding: 2px;
          box-sizing: border-box;
        }
        .segment-fill {
          height: 100%;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .segment-fill:first-child {
          border-top-left-radius: 99px;
          border-bottom-left-radius: 99px;
        }
        .segment-fill:last-child {
          border-top-right-radius: 99px;
          border-bottom-right-radius: 99px;
        }
        .breakdown-list {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
        }
        .breakdown-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          margin: 0 -8px;
          border-radius: var(--radius-control, 8px);
          border-bottom: 1px solid var(--line, #ecedef);
          cursor: pointer;
          transition: background-color 0.12s;
        }
        .breakdown-item:last-child {
          border-bottom: none;
        }
        .breakdown-item:hover, .breakdown-item.active {
          background-color: var(--hover, #f4f5f6);
        }
        .item-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .item-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .item-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .item-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .item-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .item-desc {
          margin-top: 2px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
        }
        .item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          padding-left: 8px;
        }
        .item-tokens {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-variant-numeric: tabular-nums;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .item-unit {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .model-tech {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="green-dot"></span>
            <h3 class="header-title">${e?"上下文窗口计量":"Context Window"}</h3>
            <span class="capacity-chip">${e?"128k 容量":"128k context"}</span>
          </div>
          <div class="header-right">
            <span class="cost-label">$${i} ${e?"预估成本":"est."}</span>
            <button type="button" class="btn-prune" id="btn-prune">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>${o?e?"恢复完整上下文":"Restore Context":e?"精简历史":"Prune History"}</span>
            </button>
          </div>
        </div>

        <!-- Progress Metric Bar -->
        <div class="gauge-metric">
          <div class="metric-header">
            <span class="tokens-count">
              ${r.toLocaleString()} <span class="tokens-max">/ ${128e3.toLocaleString()} tokens</span>
            </span>
            <span class="capacity-pct">${n}% ${e?"已占用":"capacity"}</span>
          </div>

          <!-- Segmented Bar -->
          <div class="segmented-bar">
            ${t.map(e=>{let t=e.tokens/128e3*100,o=a===e.id;return`
                  <div
                    class="segment-fill"
                    data-id="${e.id}"
                    style="width: ${t}%; background-color: ${e.color}; opacity: ${a&&!o?.45:1}; transform: ${o?"scaleY(1.2)":"scaleY(1)"};"
                  ></div>
                `}).join("")}
          </div>
        </div>

        <!-- Segment Breakdown Rows -->
        <div class="breakdown-list">
          ${t.map(t=>{let o=a===t.id,n=(t.tokens/r*100).toFixed(0);return`
                <div class="breakdown-item ${o?"active":""}" data-id="${t.id}">
                  <div class="item-left">
                    <span class="item-dot" style="background-color: ${t.color};"></span>
                    <div class="item-info">
                      <div class="item-title-row">
                        <span class="item-label">${e?t.labelZh:t.labelEn}</span>
                        <span class="item-badge" style="background-color: ${t.badgeBg}; color: ${t.badgeColor};">
                          ${n}%
                        </span>
                      </div>
                      <span class="item-desc">${e?t.descZh:t.descEn}</span>
                    </div>
                  </div>
                  <div class="item-right">
                    <span class="item-tokens">${t.tokens.toLocaleString()}</span>
                    <span class="item-unit">tokens</span>
                  </div>
                </div>
              `}).join("")}
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${e?"自动压缩阈值: 85%":"Auto-compaction threshold: 85%"}</span>
          <span class="model-tech">Claude 3.7 Sonnet</span>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#btn-prune")?.addEventListener("click",()=>this.handlePruneHistory()),this.shadowRoot.querySelectorAll(".segment-fill, .breakdown-item").forEach(e=>{e.addEventListener("mouseenter",()=>{let t=e.getAttribute("data-id");this.setActiveSegment(t)}),e.addEventListener("mouseleave",()=>{this.setActiveSegment(null)})})}}"u">typeof customElements&&!customElements.get("nai-context-window")&&customElements.define("nai-context-window",er);let en=[{id:"mem-1",category:"preference",textEn:"Prefers functional React 19 components with Tailwind v4 and CSS variables.",textZh:"偏好使用 React 19 函数式组件、Tailwind v4 及原生 CSS 变量设计系统。",confidence:98,updatedAtEn:"2h ago",updatedAtZh:"2小时前",pinned:!0},{id:"mem-2",category:"rule",textEn:"Never print raw database connection strings or JWT secret keys to logs.",textZh:"严禁在控制台或日志中打印未经脱敏的数据库连接串或 JWT 密钥。",confidence:99,updatedAtEn:"Yesterday",updatedAtZh:"昨天",pinned:!0},{id:"mem-3",category:"preference",textEn:"Favors hairline elevation borders (1px) over saturated drop shadows.",textZh:"倾向使用 1px 发丝边框质感替代浓重饱和的投影阴影（Kumo 极简风）。",confidence:94,updatedAtEn:"3d ago",updatedAtZh:"3天前"},{id:"mem-4",category:"fact",textEn:"Project uses Turborepo monorepo structure with apps/web and packages/ui.",textZh:"项目采用 Turborepo Monorepo 架构，核心源码位于 apps/web 与 packages/ui。",confidence:88,updatedAtEn:"5d ago",updatedAtZh:"5天前"}];class ei extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._memories=JSON.parse(JSON.stringify(en)),this._filter="all",this._query=""}setFilter(e){this._filter=e,this.render()}setQuery(e){this._query=e,this.render()}handleDelete(e){this._memories=this._memories.filter(t=>t.id!==e),this.render()}handleTogglePin(e){this._memories=this._memories.map(t=>t.id===e?{...t,pinned:!t.pinned}:t),this.render()}handleAddFact(){this._memories=[{id:`mem-${Date.now()}`,category:"preference",textEn:"Always provide TypeScript types for tool parameters.",textZh:"始终为 Tool 参数提供完整的 TypeScript 类型注解与 Zod 校验。",confidence:100,updatedAtEn:"Just now",updatedAtZh:"刚刚"},...this._memories],this.render()}render(){let e=this.isZh,t=this._filter,a=this._query,o=this._memories,r=o.filter(o=>{if("all"!==t&&o.category!==t)return!1;let r=e?o.textZh:o.textEn;return!a||!!r.toLowerCase().includes(a.toLowerCase())});this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-bulb {
          display: flex;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .toolbar {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .tabs {
          display: flex;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          font-size: 11px;
        }
        .tab-btn {
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          padding: 2px 8px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }
        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }
        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }
        .search-input {
          width: 144px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-family: inherit;
          font-size: 11px;
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          transition: border-color 0.12s, background-color 0.12s;
        }
        .search-input:focus {
          outline: none;
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
        }
        .memories-list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .memory-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
          transition: border-color 0.15s, background-color 0.15s;
        }
        .memory-card:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: var(--hover, #f4f5f6);
        }
        .card-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }
        .card-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .cat-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .cat-preference {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .cat-rule {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .cat-fact {
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .pin-tag {
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .conf-meta {
          margin-left: auto;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .memory-text {
          margin: 0;
          font-size: 12px;
          line-height: 1.4;
          color: var(--ink, #1f2124);
        }
        .actions-col {
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          transition: opacity 0.15s;
        }
        .memory-card:hover .actions-col {
          opacity: 1;
        }
        .icon-action-btn {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }
        .icon-action-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .icon-action-btn.pinned {
          color: var(--accent-ink, #0170dd);
        }
        .icon-action-btn.delete:hover {
          background: var(--red-tint, #fcecec);
          color: var(--red, #e3474c);
        }
        .empty-box {
          border-radius: var(--radius-control, 8px);
          border: 1px dashed var(--line, #ecedef);
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .btn-add-fact {
          border: none;
          background: transparent;
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
          cursor: pointer;
        }
        .btn-add-fact:hover {
          text-decoration: underline;
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-bulb">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <path d="M9 21h6" />
              </svg>
            </span>
            <h3 class="header-title">${e?"智能体长期记忆看板":"Agent Long-Term Memory"}</h3>
          </div>
          <span class="header-count">
            ${o.length} ${e?"条已存记忆":1===o.length?"stored fact":"stored facts"}
          </span>
        </div>

        <!-- Filter Tabs & Search -->
        <div class="toolbar">
          <div class="tabs">
            ${["all","preference","rule","fact"].map(a=>{let o="";return"all"===a?o=e?"全部":"All":"preference"===a?o=e?"偏好":"Prefs":"rule"===a?o=e?"规范":"Rules":"fact"===a&&(o=e?"事实":"Facts"),`
                  <button
                    type="button"
                    class="tab-btn ${t===a?"active":""}"
                    data-tab="${a}"
                  >
                    ${o}
                  </button>
                `}).join("")}
          </div>

          <div>
            <input
              type="text"
              class="search-input"
              placeholder="${e?"搜索记忆...":"Search memory..."}"
              value="${a}"
            />
          </div>
        </div>

        <!-- Memories List -->
        <div class="memories-list">
          ${0===r.length?`
            <div class="empty-box">
              ${e?"当前筛选条件下无记忆项。":"No memories match the current filter."}
            </div>
          `:r.map(t=>{let a="";return a="preference"===t.category?e?"偏好":"preference":"rule"===t.category?e?"规范":"rule":e?"事实":"fact",`
                  <div class="memory-card">
                    <div class="card-content">
                      <div class="card-meta-row">
                        <span class="cat-chip cat-${t.category}">
                          ${a}
                        </span>
                        ${t.pinned?`
                          <span class="pin-tag">
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 3a1 1 0 0 1 .71.29l4 4A1 1 0 0 1 21 9l-6.5 6.5-.5 4.5a1 1 0 0 1-1.7.7L9 17.4 4.7 21.7a1 1 0 0 1-1.4-1.4L7.6 16l-3.3-3.3a1 1 0 0 1 .7-1.7l4.5-.5L15 4a1 1 0 0 1 1-1z" />
                            </svg>
                            ${e?"已置顶":"Pinned"}
                          </span>
                        `:""}
                        <span class="conf-meta">
                          ${t.confidence}% ${e?"置信":"conf"} • ${e?t.updatedAtZh:t.updatedAtEn}
                        </span>
                      </div>
                      <p class="memory-text">${e?t.textZh:t.textEn}</p>
                    </div>

                    <div class="actions-col">
                      <button
                        type="button"
                        class="icon-action-btn pin ${t.pinned?"pinned":""}"
                        data-id="${t.id}"
                        title="${t.pinned?e?"取消置顶":"Unpin":e?"置顶到 Prompt":"Pin to prompt"}"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="17" x2="12" y2="22" />
                          <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.77V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.77a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="icon-action-btn delete"
                        data-id="${t.id}"
                        title="${e?"遗忘此记忆":"Forget this memory"}"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                `}).join("")}
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${e?"已在当前 Agent 会话中实时同步":"Synced across current agent sessions"}</span>
          <button type="button" class="btn-add-fact" id="btn-add-fact">
            ${e?"+ 添加事实":"+ Add Fact"}
          </button>
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");t&&this.setFilter(t)})});let n=this.shadowRoot.querySelector(".search-input");n?.addEventListener("input",e=>{this.setQuery(e.target.value)}),this.shadowRoot.querySelectorAll(".icon-action-btn.pin").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleTogglePin(t)})}),this.shadowRoot.querySelectorAll(".icon-action-btn.delete").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleDelete(t)})}),this.shadowRoot.querySelector("#btn-add-fact")?.addEventListener("click",()=>{this.handleAddFact()})}}"u">typeof customElements&&!customElements.get("nai-memory-inspector")&&customElements.define("nai-memory-inspector",ei);class es extends s{static get observedAttributes(){return["lang","auto"]}constructor(){super(),this._chipsShown=!1}get autoPlay(){return"false"!==this.getAttribute("auto")}onMount(){if(!this.autoPlay){this._chipsShown=!0;return}this.registerTimeout(()=>{this._chipsShown=!0,this.render()},700)}render(){let e=this.isZh,t=this._chipsShown;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          display: flex;
          width: 100%;
          flex-direction: column;
          gap: 8px;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 2px;
          animation: fade-in 400ms ease-out both;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .count-chip {
          display: inline-flex;
          height: 20px;
          align-items: center;
          border-radius: var(--radius-chip, 6px);
          background: var(--inset, #f7f8f9);
          padding: 0 6px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          font-variant-numeric: tabular-nums;
        }
        .card {
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          border: 1px solid var(--line, #ecedef);
        }
        .card-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 10px 12px;
          background: var(--surface, #fff);
        }
        .card-title-wrap {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .card-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-chars {
          margin-left: auto;
          flex-shrink: 0;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }
        .card-body {
          padding: 8px 12px 4px 12px;
          margin: 0;
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }
        .card-footer {
          padding: 0 12px 12px 12px;
        }
        .source-chip {
          display: inline-flex;
          height: 24px;
          align-items: center;
          gap: 6px;
          border-radius: 99px;
          background: var(--inset, #f7f8f9);
          padding: 0 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong));
          cursor: pointer;
          transition: opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                      transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
                      background-color 0.12s;
        }
        .source-chip:hover {
          background-color: var(--hover, #f4f5f6);
        }
        .badge-kind {
          display: flex;
          width: 14px;
          height: 14px;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 7px;
          font-weight: 700;
          color: #fff;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="container">
        <div class="header">
          <span class="header-title">${e?"检索知识分块":"All chunks"}</span>
          <span class="count-chip">32</span>
        </div>

        ${[{title:e?"供应商准入规范":"Vendor onboarding rule",chars:e?"290 字符":"290 characters",body:e?"在将新乳制品供应商纳入自动补货工作流之前，必须首先验证其冷链资质认证与卫生许可。":"Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",source:"Dairy Onboarding SOP.pdf",badge:"PDF",badgeBg:"var(--red, #e3474c)"},{title:e?"季节性需求走势":"Seasonal demand row",chars:e?"1,250 字符":"1,250 characters",body:e?"第四季度动销统计：开心果风味 +18%，香草 +6%，巧克力曲奇 -11%；周均销量低于40份的风味将被退市下架。":"Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",source:"Sales Velocity Export.csv",badge:"CSV",badgeBg:"var(--green, #189a4d)"}].map((e,a)=>`
          <div
            class="card"
            style="animation: fade-up 400ms cubic-bezier(0.23,1,0.32,1) ${100*a}ms both;"
          >
            <div class="card-bar">
              <span class="card-title-wrap">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                <span class="card-title">${e.title}</span>
              </span>
              <span class="card-chars">${e.chars}</span>
            </div>

            <p class="card-body">${e.body}</p>

            <div class="card-footer">
              <span
                class="source-chip"
                style="opacity: ${+!!t}; transform: ${t?"scale(1)":"scale(0.95)"}; transition-delay: ${80*a}ms;"
              >
                <span class="badge-kind" style="background-color: ${e.badgeBg};">
                  ${e.badge}
                </span>
                <span>${e.source}</span>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </span>
            </div>
          </div>
        `).join("")}
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-context-cards")&&customElements.define("nai-context-cards",es);let ed=[{id:"spill-1",sourceTool:"fs.search_ripgrep",originalTokens:48500,compactedTokens:820,diskPath:"spill/ripgrep_ast_results.json",sizeBytes:"1.4 MB",spilledAtEn:"4m ago",spilledAtZh:"4分钟前"},{id:"spill-2",sourceTool:"shell.git_diff_full",originalTokens:86200,compactedTokens:1450,diskPath:"spill/git_diff_refactor_v2.patch",sizeBytes:"2.8 MB",spilledAtEn:"12m ago",spilledAtZh:"12分钟前"}];class el extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._hydratedId=null}handleHydrate(e){this._hydratedId=this._hydratedId===e?null:e,this.render()}render(){let e=this.isZh,t=this._hydratedId,a=ed.reduce((e,t)=>e+(t.originalTokens-t.compactedTokens),0);this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        .container {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 0 0 1px var(--line));
          box-sizing: border-box;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-subtitle {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .saved-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .gauge-card {
          margin-top: 14px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .gauge-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 11.5px;
        }
        .gauge-label {
          color: var(--ink-2, #62656b);
        }
        .gauge-pct {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-weight: 600;
          color: var(--accent, #0285ff);
        }
        .gauge-bar-wrap {
          margin-top: 8px;
          display: flex;
          height: 8px;
          width: 100%;
          align-items: center;
          gap: 4px;
        }
        .gauge-dot-active {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--accent, #0285ff);
        }
        .gauge-bar-track {
          height: 8px;
          flex: 1;
          overflow: hidden;
          border-radius: 99px;
          background: var(--line, #ecedef);
        }
        .gauge-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: rgba(24, 154, 77, 0.6);
        }
        .gauge-legend {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .records-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .record-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 12px;
          transition: border-color 0.15s;
        }
        .record-card:hover {
          border-color: var(--line-strong, #e0e2e5);
        }
        .record-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .record-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .file-icon {
          display: flex;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
        .record-info {
          min-width: 0;
        }
        .record-path-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .record-path {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .size-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 0 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .record-meta {
          margin-top: 2px;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .btn-hydrate {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.12s, color 0.12s;
        }
        .btn-hydrate:hover {
          background-color: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .hydrate-preview {
          margin-top: 10px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .preview-box {
          border-radius: var(--radius-control, 8px);
          background: var(--page, #fafafb);
          padding: 8px;
          line-height: 1.6;
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </span>
            <div>
              <h3 class="header-title">${e?"上下文压缩与磁盘溢出":"Context Compaction & Spill"}</h3>
              <p class="header-subtitle">${e?"Harness.Spill 超限数据磁盘分流存储":"Harness.Spill disk-offloaded oversized tools"}</p>
            </div>
          </div>
          <div class="saved-badge">
            <span>↓ ${a.toLocaleString()} ${e?"token 已节省":"tok saved"}</span>
          </div>
        </div>

        <!-- Compaction Efficiency Gauge -->
        <div class="gauge-card">
          <div class="gauge-header">
            <span class="gauge-label">${e?"压缩比率":"Compaction Ratio"}</span>
            <span class="gauge-pct">${e?"96.8% Token 压缩率":"96.8% token compression"}</span>
          </div>

          <div class="gauge-bar-wrap">
            <span class="gauge-dot-active" title="${e?"内存活跃 3.2%":"In-memory 3.2%"}"></span>
            <div class="gauge-bar-track">
              <div class="gauge-bar-fill" style="width: 96.8%;"></div>
            </div>
          </div>

          <div class="gauge-legend">
            <span>${e?"内存活跃上下文 (3.2%)":"In-Memory Active (3.2%)"}</span>
            <span>${e?"溢出至磁盘存储 (96.8%)":"Spilled to Disk (96.8%)"}</span>
          </div>
        </div>

        <!-- Spilled Files List -->
        <div class="records-list">
          ${ed.map(a=>{let o=t===a.id;return`
              <div class="record-card">
                <div class="record-header">
                  <div class="record-left">
                    <span class="file-icon">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </span>
                    <div class="record-info">
                      <div class="record-path-row">
                        <span class="record-path">${a.diskPath}</span>
                        <span class="size-chip">${a.sizeBytes}</span>
                      </div>
                      <div class="record-meta">
                        ${e?"源自":"From"} ${a.sourceTool} • ${e?a.spilledAtZh:a.spilledAtEn}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    class="btn-hydrate"
                    data-id="${a.id}"
                  >
                    ${o?e?"收起原文":"Hide Raw":e?"按需水合":"Hydrate"}
                  </button>
                </div>

                ${o?`
                  <div class="hydrate-preview">
                    <div class="preview-box">
                      ${e?"[水合片段预览: 48,500 token 原始输出已从 Harness.Spill.Local 磁盘缓存加载。原始 SHA256: 4d89a0b12...]":"[Hydrated snippet: 48,500 tokens offloaded to Harness.Spill.Local storage. Original hash: sha256:4d89a0b12...]"}
                    </div>
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll(".btn-hydrate").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-id");t&&this.handleHydrate(t)})})}}"u">typeof customElements&&!customElements.get("nai-context-spillover")&&customElements.define("nai-context-spillover",el);let ec=[{type:"turn/start",depth:0,tone:"accent",opens:"turn",summaryEn:"Turn 3 begins",summaryZh:"第 3 轮开始",meta:"user prompt"},{type:"request/header",depth:1,tone:"dim",summaryEn:"deepseek-reasoner · 128k",summaryZh:"deepseek-reasoner · 128k",meta:"41,208 tok"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 1",summaryZh:"步骤 1"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Let me check the job registry…",summaryZh:"先检查作业注册表…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.list",summaryZh:"job.list",meta:"call_9f2a"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"3 running · 1 killed",summaryZh:"3 个运行中 · 1 个已终止",meta:"82ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 1 closed",summaryZh:"步骤 1 闭合",meta:"1.2s"},{type:"step/start",depth:1,tone:"muted",opens:"step",summaryEn:"Step 2",summaryZh:"步骤 2"},{type:"assistant/message",depth:2,tone:"green",summaryEn:"Restarting the telemetry export…",summaryZh:"正在重启遥测导出任务…",meta:"stream"},{type:"tool/call",depth:2,tone:"orange",summaryEn:"job.start",summaryZh:"job.start",meta:"call_b771"},{type:"tool/result",depth:2,tone:"orange",summaryEn:"job-4f8c · Running",summaryZh:"job-4f8c · 运行中",meta:"134ms"},{type:"step/end",depth:1,tone:"muted",closes:"step",summaryEn:"Step 2 closed",summaryZh:"步骤 2 闭合",meta:"0.9s"},{type:"assistant/message",depth:1,tone:"green",summaryEn:"Done — the export job is back up.",summaryZh:"完成 — 导出任务已恢复。"},{type:"turn/end",depth:0,tone:"accent",closes:"turn",summaryEn:"Turn 3 · completed",summaryZh:"第 3 轮 · 已完成",meta:"2 steps · 2 calls"}];class ep extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._visible=0}onMount(){this._visible=0,this._scheduleNext()}onUnmount(){this._visible=0}_scheduleNext(){if(this._visible<ec.length){let e=0===this._visible?500:620;this.registerTimeout(()=>{this._visible++,this.render(),this._scheduleNext()},e)}else this.registerTimeout(()=>{this._visible=0,this.render(),this._scheduleNext()},3600)}render(){let e=this.isZh,t=this._visible>=ec.length,a=ec.slice(0,this._visible),o=!1,r=!1,n=a.map(e=>{"turn"===e.opens&&(o=!0),"step"===e.opens&&(r=!0);let t={turn:o,step:r};return"step"===e.closes&&(r=!1),"turn"===e.closes&&(o=!1,r=!1),t});this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: ${t?"var(--green, #189a4d)":"var(--accent, #0285ff)"};
          ${!t?"animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;":""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .session-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .counter {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .timeline {
          position: relative;
          display: flex;
          min-height: 304px;
          flex-direction: column;
          gap: 3px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px;
        }
        .event-row {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-chip, 6px);
          padding: 5px 6px;
          font-size: 11.5px;
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .guide-turn {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--accent, #0285ff);
          opacity: 0.35;
          left: 12px;
          pointer-events: none;
        }
        .guide-step {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
          left: 34px;
          pointer-events: none;
        }
        .elbow-turn {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid var(--accent, #0285ff);
          background: var(--accent-tint, #e9f3ff);
          left: 9px;
          pointer-events: none;
        }
        .elbow-step {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          left: 31px;
          pointer-events: none;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-accent { background: var(--accent, #0285ff); }
        .dot-green { background: var(--green, #189a4d); }
        .dot-orange { background: var(--orange, #ef720c); }
        .dot-muted { background: var(--ink-3, #9a9da3); }
        .dot-dim { background: var(--line-strong, #e0e2e5); }

        .chip {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .chip-accent { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .chip-green { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .chip-orange { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .chip-muted { background: var(--hover-2, #e7e9eb); color: var(--ink-2, #62656b); }
        .chip-dim { background: var(--field, #f2f2f3); color: var(--ink-3, #9a9da3); }

        .summary {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--ink-2, #62656b);
        }
        .meta {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .caret-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 6px;
        }
        .caret-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--ink-3, #9a9da3);
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .caret-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"Turn 括号事件流":"Turn Bracket Stream"}</h3>
            <span class="session-chip">session/7c1d</span>
          </div>
          <span class="counter">${Math.min(this._visible,ec.length)}/${ec.length} events</span>
        </div>

        <div class="timeline">
          ${a.map((o,r)=>{let i=n[r],s=r===a.length-1,d=6+22*o.depth;return`
                <div class="event-row" style="padding-left: ${d}px; ${s&&!t?"background: var(--hover, #f4f5f6);":""}">
                  ${i.turn?'<span class="guide-turn" aria-hidden="true"></span>':""}
                  ${o.depth>=1&&i.step?'<span class="guide-step" aria-hidden="true"></span>':""}
                  ${o.closes?`<span class="${"turn"===o.closes?"elbow-turn":"elbow-step"}" aria-hidden="true"></span>`:""}
                  <span class="dot dot-${o.tone}"></span>
                  <code class="chip chip-${o.tone}">${o.type}</code>
                  <span class="summary">${e?o.summaryZh:o.summaryEn}</span>
                  ${o.meta?`<span class="meta">${o.meta}</span>`:""}
                </div>
              `}).join("")}

          ${!t?`
              <div class="caret-row" style="padding-left: ${6+Math.min((ec[this._visible]?.depth??0)*22+22,66)}px">
                <span class="caret-dot"></span>
                <span class="caret-text">${e?"等待下一事件…":"awaiting next event…"}</span>
              </div>
            `:""}
        </div>

        <div class="footer">
          <span>${e?"括号结构: turn ⊃ step ⊃ tool/call":"Brackets: turn ⊃ step ⊃ tool/call"}</span>
          <span class="footer-mono">agent/loop \xb7 durable</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-turn-lifecycle")&&customElements.define("nai-turn-lifecycle",ep);let eh={id:"m1",kind:"followup",textEn:"also verify the rollout gate",textZh:"顺便验证一下灰度发布门禁"},ef={id:"m2",kind:"steer",textEn:"use the staging endpoint",textZh:"改用 staging 环境的端点"},eu={id:"m3",kind:"inject",textEn:"fyi: trace dump at /tmp/trace.log",textZh:"备注：trace 已转储到 /tmp/trace.log"},eg=[900,1500,1500,1500,1700,2100,4600];class ev extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=eg[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%eg.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,a=t>=1&&t<5?[eh]:[],o=2===t?[ef]:3===t?[ef,eu]:[],r=5===t;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background-color 0.3s;
          background: ${r?"var(--ink-3, #9a9da3)":"var(--accent, #0285ff)"};
          ${!r?"animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;":""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .state-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .turn-step {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .lanes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .lane {
          display: flex;
          min-height: 118px;
          flex-direction: column;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px;
        }
        .lane-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px 6px 4px;
        }
        .lane-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .lane-desc {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .lane-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 4px;
        }
        .empty-placeholder {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-chip, 6px);
          border: 1px dashed var(--line, #ecedef);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .msg-box {
          border-radius: var(--radius-chip, 6px);
          padding: 6px 8px;
          animation: pop-in 260ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .msg-followup {
          border: 1px solid var(--accent, #0285ff);
          border-color: rgba(2, 133, 255, 0.4);
          background: var(--accent-tint, #e9f3ff);
        }
        .msg-steer {
          border: 1px solid var(--orange, #ef720c);
          border-color: rgba(239, 114, 12, 0.4);
          background: var(--orange-tint, #fdf1e5);
        }
        .msg-inject {
          border: 1px dashed var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
        }
        .msg-header {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .msg-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .msg-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .msg-text {
          margin: 2px 0 0 0;
          font-size: 10.5px;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .claim-indicator {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 8px 10px;
          transition: all 0.5s;
        }
        .claim-active {
          border-color: rgba(24, 154, 77, 0.4);
          background: var(--green-tint, #e8f5ed);
        }
        .claim-inactive {
          border-color: var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .claim-text {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }
        .claim-badge {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .methods-grid {
          margin-top: 12px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
        }
        .method-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          padding: 6px 4px;
          transition: all 0.3s;
        }
        .method-send { border-color: var(--line, #ecedef); background: var(--field, #f2f2f3); color: var(--ink-2, #62656b); }
        .method-followup { border-color: rgba(2, 133, 255, 0.4); background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .method-steer { border-color: rgba(239, 114, 12, 0.4); background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .method-inject { border: 1px dashed var(--line-strong, #e0e2e5); background: var(--surface, #fff); color: var(--ink-3, #9a9da3); }

        .method-flash {
          outline: 2px solid var(--accent, #0285ff);
          transform: scale(1.05);
        }
        .method-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 600;
        }
        .method-desc {
          font-size: 8.5px;
          opacity: 0.8;
        }

        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"双队列收件箱":"Agent Inbox"}</h3>
            <span class="state-chip">${r?e?"空闲":"idle":e?"运行中":"running"}</span>
          </div>
          <span class="turn-step">turn ${t>=5?3:2} \xb7 step ${t>=4?2:1}</span>
        </div>

        <div class="lanes-grid">
          <!-- NextTurn lane -->
          <div class="lane">
            <div class="lane-header">
              <span class="lane-name">NextTurn</span>
              <span class="lane-desc">${e?"各开一轮":"own turn"}</span>
            </div>
            <div class="lane-content">
              ${0===a.length?`<span class="empty-placeholder">${e?"空":"empty"}</span>`:a.map(t=>`
                    <div class="msg-box msg-followup">
                      <div class="msg-header">
                        <span class="msg-dot" style="background: var(--accent, #0285ff);"></span>
                        <span class="msg-tag" style="color: var(--accent-ink, #0170dd);">FollowupAsync</span>
                      </div>
                      <p class="msg-text">${e?t.textZh:t.textEn}</p>
                    </div>
                  `).join("")}
            </div>
          </div>

          <!-- NextStep lane -->
          <div class="lane">
            <div class="lane-header">
              <span class="lane-name">NextStep</span>
              <span class="lane-desc">${e?"步骤边界消费":"step edge"}</span>
            </div>
            <div class="lane-content">
              ${0===o.length?`<span class="empty-placeholder">${e?"空":"empty"}</span>`:o.map(t=>`
                    <div class="msg-box ${"inject"===t.kind?"msg-inject":"msg-steer"}">
                      <div class="msg-header">
                        <span class="msg-dot" style="background: ${"inject"===t.kind?"var(--ink-3, #9a9da3)":"var(--orange, #ef720c)"};"></span>
                        <span class="msg-tag" style="color: ${"inject"===t.kind?"var(--ink-3, #9a9da3)":"var(--orange, #ef720c)"};">
                          ${"inject"===t.kind?"InjectAsync":"SteerAsync"}
                        </span>
                      </div>
                      <p class="msg-text">${e?t.textZh:t.textEn}</p>
                    </div>
                  `).join("")}
            </div>
          </div>
        </div>

        <!-- Step boundary claim indicator -->
        <div class="claim-indicator ${t>=4?"claim-active":"claim-inactive"}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${t>=4?"var(--green, #189a4d)":"var(--ink-3, #9a9da3)"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M4 4v16M4 12h10m0 0-4-4m4 4-4 4" transform="translate(2 0)" />
          </svg>
          <span class="claim-text">
            ${t>=4?e?"步骤边界：ClaimAsync 整批取走 2 条消息":"Step boundary: ClaimAsync drained 2 messages":e?"等待步骤边界…":"awaiting step boundary…"}
          </span>
          ${t>=4?'<span class="claim-badge">claimed ×2</span>':""}
        </div>

        <!-- Delivery methods -->
        <div class="methods-grid">
          ${[{name:"Send",descEn:"owns send",descZh:"独占发送",kind:"send"},{name:"Followup",descEn:"→ turn+wake",descZh:"→ 下轮+唤醒",kind:"followup"},{name:"Steer",descEn:"→ step+wake",descZh:"→ 边界+唤醒",kind:"steer"},{name:"Inject",descEn:"→ step, silent",descZh:"→ 边界,静默",kind:"inject"}].map((a,o)=>`
              <div class="method-card method-${a.kind} ${1===o&&1===t||2===o&&2===t||3===o&&3===t?"method-flash":""}">
                <span class="method-name">${a.name}</span>
                <span class="method-desc">${e?a.descZh:a.descEn}</span>
              </div>
            `).join("")}
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>
            ${t>=5?e?"空闲后 NextTurn 唤醒驱动，开启第 3 轮":"NextTurn wakes the driver into turn 3":e?"所有 mutation 归一化为 splice 事件":"Every mutation folds into a splice event"}
          </span>
          <span class="footer-mono">agent/inbox/spliced</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-agent-inbox")&&customElements.define("nai-agent-inbox",ev);let em=[{name:"secret-scrub",matcher:"*",decision:"allow",latencyMs:4},{name:"workspace-guard",matcher:"fs.*",decision:"ask",reasonEn:"writes outside declared scopes",reasonZh:"写入超出声明的 write scopes",latencyMs:11},{name:"rate-limiter",matcher:"*",decision:"allow",latencyMs:2}],eb={deny:0,ask:1,block:2,allow:3},ex=["SessionStart","UserPrompt","ToolPre","ToolPost","Stop","Subagent"],ey=[700,750,750,750,1400,1400,3800];class ek extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._phase=0}onMount(){this._phase=0,this._schedulePhase()}onUnmount(){this._phase=0}_schedulePhase(){let e=ey[this._phase];this.registerTimeout(()=>{this._phase=(this._phase+1)%ey.length,this.render(),this._schedulePhase()},e)}render(){let e=this.isZh,t=this._phase,a=Math.max(0,Math.min(t,em.length)),o=t>=4?t>=5?"allow":em.map(e=>e.decision).sort((e,t)=>eb[e]-eb[t])[0]??"allow":null,r={allow:{labelEn:"allow",labelZh:"允许"},ask:{labelEn:"ask",labelZh:"询问"},deny:{labelEn:"deny",labelZh:"拒绝"},block:{labelEn:"block",labelZh:"阻断"}};this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--accent, #0285ff);
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .points-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .harness-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .points-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .point-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
          transition: all 0.3s;
        }
        .point-active {
          border-color: rgba(2, 133, 255, 0.5);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .tool-target {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
        }
        .tool-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--ink, #1f2124);
        }
        .tool-file {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }
        .call-id {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .pipeline-list {
          margin-top: 12px;
          display: flex;
          min-height: 132px;
          flex-direction: column;
          gap: 6px;
        }
        .hook-item {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 8px 10px;
          transition: all 0.3s;
        }
        .hook-active {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .hook-inactive {
          border-color: rgba(236, 237, 239, 0.6);
          background: var(--inset, #f7f8f9);
          opacity: 0.45;
        }
        .hook-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-allow { background: var(--green, #189a4d); }
        .dot-ask { background: var(--orange, #ef720c); }
        .dot-deny { background: var(--red, #e3474c); }
        .dot-block { background: var(--accent, #0285ff); }
        .dot-inactive { background: var(--line-strong, #e0e2e5); }

        .hook-info {
          min-width: 0;
          flex: 1;
        }
        .hook-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hook-title {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .hook-matcher {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }
        .hook-reason {
          margin-top: 2px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .decision-chip {
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
        }
        .decision-allow { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .decision-ask { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .decision-deny { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }
        .decision-block { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }

        .latency {
          width: 32px;
          flex-shrink: 0;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .merge-bar {
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 10px 12px;
          transition: all 0.5s;
        }
        .merge-allow {
          border-color: rgba(24, 154, 77, 0.4);
          background: var(--green-tint, #e8f5ed);
        }
        .merge-ask {
          border-color: rgba(239, 114, 12, 0.4);
          background: var(--orange-tint, #fdf1e5);
        }
        .merge-idle {
          border-color: var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
        }
        .merge-left {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 8px;
        }
        .merge-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          white-space: nowrap;
        }
        .merge-hierarchy {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .merge-chip {
          flex-shrink: 0;
          white-space: nowrap;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-variant-numeric: tabular-nums;
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"Hook 决策管线":"Hook Pipeline"}</h3>
            <span class="points-chip">6 points</span>
          </div>
          <span class="harness-tag">Harness.Hooks</span>
        </div>

        <!-- Hook points strip -->
        <div class="points-strip">
          ${ex.map(e=>`
            <span class="point-tag ${"ToolPre"===e?"point-active":""}">${e}</span>
          `).join("")}
        </div>

        <!-- Inspected tool call -->
        <div class="tool-target">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2, #62656b)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
            <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
          </svg>
          <code class="tool-name">fs.write</code>
          <span class="tool-file">src/llm/retry.cs</span>
          <span class="call-id">call_e51c</span>
        </div>

        <!-- Pipeline: hooks evaluated in sequence -->
        <div class="pipeline-list">
          ${em.map((t,o)=>{let n=o<a;return`
              <div class="hook-item ${n?"hook-active":"hook-inactive"}">
                <span class="hook-dot ${n?`dot-${t.decision}`:"dot-inactive"}"></span>
                <div class="hook-info">
                  <div class="hook-title-row">
                    <code class="hook-title">${t.name}</code>
                    <span class="hook-matcher">${t.matcher}</span>
                  </div>
                  ${n&&t.reasonEn?`<span class="hook-reason">${e?t.reasonZh:t.reasonEn}</span>`:""}
                </div>
                ${n?`
                  <span class="decision-chip decision-${t.decision}">
                    ${e?r[t.decision].labelZh:r[t.decision].labelEn}
                  </span>
                `:'<span style="font-family: var(--font-mono, monospace); font-size: 9.5px; color: var(--ink-3, #9a9da3);">…</span>'}
                <span class="latency">${n?`${t.latencyMs}ms`:""}</span>
              </div>
            `}).join("")}
        </div>

        <!-- Merge bar -->
        <div class="merge-bar ${"allow"===o?"merge-allow":"ask"===o?"merge-ask":"merge-idle"}">
          <div class="merge-left">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2, #62656b)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
              <path d="M8 3v4a4 4 0 0 1-4 4h16M8 21v-4a4 4 0 0 0-4-4" />
              <path d="M18 8l3 3-3 3" transform="translate(-3 4)" />
            </svg>
            <span class="merge-title">${e?"Merge · 最严优先":"Merge · most-restrictive"}</span>
            <span class="merge-hierarchy">deny &gt; ask &gt; block &gt; allow</span>
          </div>
          ${o?`
            <span class="merge-chip decision-${o}">
              ${"allow"===o&&t>=5?e?"allow · 已批准":"allow · approved":e?r[o].labelZh:r[o].labelEn}
            </span>
          `:'<span style="font-family: var(--font-mono, monospace); font-size: 10px; color: var(--ink-3, #9a9da3);">…</span>'}
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>
            ${t>=4&&t<5?e?"workspace-guard 升级为 ask → 等待人工批准":"workspace-guard escalated to ask → awaiting approval":e?"HookInvokedFact 全部落入 durable log":"Every HookInvokedFact lands in the durable log"}
          </span>
          <span class="footer-mono">${t>=5?"fail-open: never":"fail-closed"}</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-hook-pipeline")&&customElements.define("nai-hook-pipeline",ek);let ew=[{turns:{completed:6,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:14,toolCalls:19,tokensIn:41208,tokensOut:6893,llmMs:21400,spark:[8,12,18,24,31,41]},{turns:{completed:7,blocked:1,aborted:0,error:0,maxTokens:0,open:1},steps:17,toolCalls:23,tokensIn:50872,tokensOut:8104,llmMs:25800,spark:[8,12,18,24,31,41,51]},{turns:{completed:8,blocked:1,aborted:1,error:0,maxTokens:0,open:1},steps:20,toolCalls:27,tokensIn:59930,tokensOut:9761,llmMs:30100,spark:[8,12,18,24,31,41,51,60]},{turns:{completed:9,blocked:1,aborted:1,error:0,maxTokens:1,open:0},steps:24,toolCalls:31,tokensIn:71455,tokensOut:11290,llmMs:36900,spark:[8,12,18,24,31,41,51,60,71]}];function e$(e){return e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}class e_ extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._frame=0}onMount(){this._frame=0,this._scheduleFrame()}onUnmount(){this._frame=0}_scheduleFrame(){this._frame<ew.length-1?this.registerTimeout(()=>{this._frame++,this.render(),this._scheduleFrame()},2400):this.registerTimeout(()=>{this._frame=0,this.render(),this._scheduleFrame()},4600)}render(){let e=this.isZh,t=ew[this._frame],a=t.turns.completed+t.turns.blocked+t.turns.aborted+t.turns.error+t.turns.maxTokens+t.turns.open,o=Math.max(...ew[ew.length-1].spark),r=[{key:"completed",labelEn:"completed",labelZh:"完成",value:t.turns.completed,color:"var(--green, #189a4d)"},{key:"blocked",labelEn:"blocked",labelZh:"阻塞",value:t.turns.blocked,color:"var(--orange, #ef720c)"},{key:"aborted",labelEn:"aborted",labelZh:"中止",value:t.turns.aborted,color:"var(--ink-3, #9a9da3)"},{key:"error",labelEn:"error",labelZh:"错误",value:t.turns.error,color:"var(--red, #e3474c)"},{key:"maxTokens",labelEn:"max-tokens",labelZh:"达到上限",value:t.turns.maxTokens,color:"#b585e0"},{key:"open",labelEn:"open",labelZh:"进行中",value:t.turns.open,color:"var(--accent, #0285ff)"}],n=[{labelEn:"Turns",labelZh:"轮次",value:String(a)},{labelEn:"Steps",labelZh:"步骤",value:String(t.steps)},{labelEn:"Tool calls",labelZh:"工具调用",value:String(t.toolCalls)},{labelEn:"Tokens in",labelZh:"输入 tokens",value:e$(t.tokensIn)},{labelEn:"Tokens out",labelZh:"输出 tokens",value:e$(t.tokensOut)},{labelEn:"LLM time",labelZh:"LLM 耗时",value:`${(Math.round(t.llmMs/100)/10).toFixed(1)}s`}];this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: ${t.turns.open>0?"var(--accent, #0285ff)":"var(--green, #189a4d)"};
          ${t.turns.open>0?"animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;":""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .stat-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .state-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .metric-tile {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
        }
        .metric-val {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 15px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--ink, #1f2124);
        }
        .metric-label {
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .section-header {
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .section-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .section-sub {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .breakdown-bar {
          display: flex;
          height: 8px;
          width: 100%;
          overflow: hidden;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
        }
        .bar-segment {
          height: 100%;
          transition: width 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .breakdown-legend {
          margin-top: 6px;
          display: flex;
          flex-wrap: wrap;
          column-gap: 12px;
          row-gap: 4px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .legend-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .spark-container {
          display: flex;
          height: 48px;
          align-items: flex-end;
          gap: 4px;
        }
        .spark-bar {
          flex: 1;
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          transition: height 0.7s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.3s;
        }

        .footer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"会话遥测":"Session Telemetry"}</h3>
            <span class="stat-chip">sessionStats</span>
          </div>
          <span class="state-text">${t.turns.open>0?e?"折叠中…":"folding…":e?"已归档":"archived"}</span>
        </div>

        <!-- Metric tiles -->
        <div class="metrics-grid">
          ${n.map(t=>`
            <div class="metric-tile">
              <div class="metric-val">${t.value}</div>
              <div class="metric-label">${e?t.labelZh:t.labelEn}</div>
            </div>
          `).join("")}
        </div>

        <!-- Turn outcome breakdown -->
        <div style="margin-top: 16px;">
          <div class="section-header">
            <span class="section-title">${e?"轮次结局分布":"Turn outcomes"}</span>
            <span class="section-sub">turn/end \xb7 six kinds</span>
          </div>
          <div class="breakdown-bar">
            ${r.map(e=>e.value>0?`<span class="bar-segment" style="width: ${e.value/a*100}%; background: ${e.color};" title="${e.key}: ${e.value}"></span>`:"").join("")}
          </div>
          <div class="breakdown-legend">
            ${r.map(t=>`
              <span class="legend-item">
                <span class="legend-dot" style="background: ${t.color};"></span>
                <span>${e?t.labelZh:t.labelEn}</span>
                <span class="legend-count">${t.value}</span>
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Token sparkline -->
        <div style="margin-top: 16px;">
          <div class="section-header">
            <span class="section-title">${e?"累计输入 tokens":"Cumulative tokens in"}</span>
            <span style="font-family: var(--font-mono, monospace); font-size: 10px; font-variant-numeric: tabular-nums; color: var(--ink-3, #9a9da3);">
              ${t.tokensIn.toLocaleString()}
            </span>
          </div>
          <div class="spark-container">
            ${ew[ew.length-1].spark.map((e,a)=>{let r=t.spark[a],n=a===t.spark.length-1,i=void 0===r?"8%":`${Math.max(8,r/o*100)}%`;return`<span class="spark-bar" style="height: ${i}; background: ${void 0===r?"var(--field, #f2f2f3)":n?"var(--accent, #0285ff)":"rgba(2, 133, 255, 0.35)"};"></span>`}).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>${e?"投影 = durable 事实的纯折叠":"Projection = pure fold of durable facts"}</span>
          <span class="footer-mono">Harness.Session.Stats</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-session-telemetry")&&customElements.define("nai-session-telemetry",e_);let eE=["w-01","w-02","w-03","w-04"];class ez extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._done=0}onMount(){this._done=0,this._scheduleTick()}onUnmount(){this._done=0}_scheduleTick(){this._done<40?this.registerTimeout(()=>{this._done=Math.min(40,this._done+4),this.render(),this._scheduleTick()},420):this.registerTimeout(()=>{this._done=0,this.render(),this._scheduleTick()},4200)}render(){let e=this.isZh,t=this._done,a=t<40,o=a?Math.min(4,40-t):0,r=Math.round(t/40*100);this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: ${a?"var(--accent, #0285ff)":"var(--green, #189a4d)"};
          ${a?"animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;":""}
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .run-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .percentage {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .meta-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          column-gap: 12px;
          row-gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .meta-val {
          color: var(--ink-2, #62656b);
        }

        .slots-list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .slot-row {
          display: flex;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 6px 10px;
          transition: all 0.3s;
        }
        .slot-active {
          border-color: rgba(2, 133, 255, 0.4);
          background: rgba(233, 243, 255, 0.4);
        }
        .slot-inactive {
          border-color: var(--line, #ecedef);
          background: var(--surface, #fff);
        }
        .slot-avatar {
          display: flex;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 8.5px;
          font-weight: 600;
        }
        .avatar-active { background: var(--accent, #0285ff); color: #fff; }
        .avatar-inactive { background: var(--field, #f2f2f3); color: var(--ink-3, #9a9da3); }

        .slot-member {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
        }
        .slot-bar-wrap {
          min-width: 0;
          flex: 1;
        }
        .slot-bar-bg {
          height: 6px;
          width: 100%;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          overflow: hidden;
        }
        .slot-bar-fill {
          height: 100%;
          border-radius: 9999px;
          background: var(--accent, #0285ff);
          transition: width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .slot-status {
          width: 64px;
          flex-shrink: 0;
          text-align: right;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .grid-header {
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .grid-title {
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--ink-3, #9a9da3);
        }
        .grid-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 4px;
        }
        .item-tile {
          aspect-ratio: 1 / 1;
          width: 100%;
          border-radius: 4px;
          transition: all 0.3s;
        }
        .item-done { background: rgba(24, 154, 77, 0.8); }
        .item-active { background: var(--accent, #0285ff); animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .item-pending { background: var(--field, #f2f2f3); border: 1px solid rgba(236, 237, 239, 0.6); }

        .footer {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"工作流扇出执行":"Workflow Fan-out"}</h3>
            <span class="run-chip">run/8f2e1a</span>
          </div>
          <span class="percentage">${r}%</span>
        </div>

        <!-- Run meta -->
        <div class="meta-bar">
          <span>digest <span class="meta-val">sha256:9b7c…e4f1</span></span>
          <span>concurrency <span class="meta-val">4</span></span>
          <span>max agents <span class="meta-val">32</span></span>
          <span>max items <span class="meta-val">256</span></span>
        </div>

        <!-- Concurrency slots -->
        <div class="slots-list">
          ${eE.map((r,n)=>{let i=n<o;return`
              <div class="slot-row ${i?"slot-active":"slot-inactive"}">
                <span class="slot-avatar ${i?"avatar-active":"avatar-inactive"}">
                  ${r.slice(-2)}
                </span>
                <span class="slot-member">${r}</span>
                <div class="slot-bar-wrap">
                  <div class="slot-bar-bg">
                    ${i?`<div class="slot-bar-fill" style="width: ${(t%4+1)*25}%;"></div>`:""}
                  </div>
                </div>
                <span class="slot-status">
                  ${i?`item-${String(t+n+1).padStart(2,"0")}`:a?e?"空闲":"idle":e?"完成":"done"}
                </span>
              </div>
            `}).join("")}
        </div>

        <!-- Item grid -->
        <div style="margin-top: 16px;">
          <div class="grid-header">
            <span class="grid-title">${e?"条目网格":"Items"}</span>
            <span class="grid-count">${t}/40</span>
          </div>
          <div class="items-grid">
            ${Array.from({length:40},(e,r)=>`<span class="item-tile ${r<t?"item-done":a&&r>=t&&r<t+o?"item-active":"item-pending"}" title="item-${r+1}"></span>`).join("")}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span>
            ${a?e?`${o} 个成员并发处理中`:`${o} members in flight`:e?"全部条目处理完成":"All items processed"}
          </span>
          <span class="footer-mono">Harness.Workflow</span>
        </div>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-workflow-run")&&customElements.define("nai-workflow-run",ez);let eS=[{id:"before",titleEn:"Before edits",titleZh:"编辑前",time:"10:31",files:["app/page.tsx","components/chat.tsx"],summaryEn:"Clean baseline before the agent changed the chat flow.",summaryZh:"智能体修改聊天流程前的干净基线。"},{id:"edited",titleEn:"Implementation",titleZh:"实现完成",time:"10:38",files:["app/page.tsx","components/chat.tsx","tests/chat.test.tsx"],summaryEn:"Streaming behavior updated and regression coverage added.",summaryZh:"已更新流式交互，并新增回归测试。"},{id:"verified",titleEn:"Verified",titleZh:"验证通过",time:"10:42",files:["tests/chat.test.tsx"],summaryEn:"Checks passed; this is the current execution state.",summaryZh:"检查已通过；这是当前执行状态。"}];class eM extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=1,this._current=2,this._confirming=!1,this._announcement=""}selectCheckpoint(e){this._selected=e,this._confirming=!1,this.render()}confirmRestore(){this._current=this._selected,this._confirming=!1;let e=eS[this._selected],t=this.isZh?e.titleZh:e.titleEn;this._announcement=this.isZh?`已恢复“${t}”`:`Restored “${t}”`,this.render()}render(){let e=this.isZh,t=eS[this._selected],a=e?t.titleZh:t.titleEn,o=this._selected===this._current;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
          overflow: hidden;
        }
        .header {
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }
        .header-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .header-sub {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .body-grid {
          display: grid;
          grid-template-columns: 12rem 1fr;
        }
        @media (max-width: 640px) {
          .body-grid {
            grid-template-columns: 1fr;
          }
        }
        .sidebar {
          border-right: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.45);
          padding: 12px;
          margin: 0;
          list-style: none;
        }
        @media (max-width: 640px) {
          .sidebar {
            border-right: none;
            border-bottom: 1px solid var(--line, #ecedef);
          }
        }
        .timeline-item {
          position: relative;
          padding-bottom: 8px;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-line {
          position: absolute;
          top: 28px;
          bottom: 0;
          left: 0.68rem;
          width: 1px;
          background: var(--line-strong, #e0e2e5);
          pointer-events: none;
        }
        .nav-btn {
          position: relative;
          display: flex;
          width: 100%;
          align-items: flex-start;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          padding: 8px;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background-color 0.15s;
        }
        .nav-btn:hover {
          background: var(--hover, #f4f5f6);
        }
        .nav-selected-current {
          background: var(--green-tint, #e8f5ed);
        }
        .nav-selected-other {
          background: var(--accent-tint, #e9f3ff);
        }
        .dot-indicator {
          margin-top: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          flex-shrink: 0;
        }
        .dot-current {
          border-color: var(--green, #189a4d);
          background: var(--green, #189a4d);
        }
        .dot-selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
        }
        .btn-text-wrap {
          min-width: 0;
        }
        .btn-title {
          display: block;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .btn-time {
          margin-top: 2px;
          display: block;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .main-pane {
          min-width: 0;
          padding: 16px;
        }
        .detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .detail-title {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .detail-summary {
          margin: 4px 0 0 0;
          font-size: 11px;
          line-height: 1.4;
          color: var(--ink-3, #9a9da3);
        }
        .detail-time {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .snapshot-card {
          margin-top: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 12px;
        }
        .snapshot-title {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--ink-3, #9a9da3);
          margin: 0;
        }
        .files-list {
          margin: 8px 0 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .file-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }
        .file-m {
          color: var(--accent-ink, #0170dd);
        }

        .alert-box {
          margin-top: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid rgba(239, 114, 12, 0.35);
          background: var(--orange-tint, #fdf1e5);
          padding: 10px 12px;
        }
        .alert-title {
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .alert-desc {
          margin: 4px 0 0 0;
          font-size: 10px;
          line-height: 1.4;
          color: var(--ink-3, #9a9da3);
        }
        .alert-actions {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .btn-cancel {
          border-radius: var(--radius-control, 8px);
          padding: 6px 10px;
          font-size: 10.5px;
          color: var(--ink-2, #62656b);
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .btn-cancel:hover {
          background: var(--hover, #f4f5f6);
        }
        .btn-confirm {
          border-radius: var(--radius-control, 8px);
          background: var(--orange, #ef720c);
          padding: 6px 10px;
          font-size: 10.5px;
          font-weight: 500;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .btn-confirm:hover {
          opacity: 0.85;
        }

        .btn-restore {
          margin-top: 12px;
          width: 100%;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          padding: 8px 12px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 1px 2px #1018280d);
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .btn-restore:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
        }
        .btn-restore:disabled {
          cursor: not-allowed;
          background: var(--inset, #f7f8f9);
          color: var(--ink-3, #9a9da3);
          box-shadow: none;
        }

        .announcement {
          margin: 8px 0 0 0;
          min-height: 16px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
      </style>

      <section class="card" aria-labelledby="checkpoint-timeline-title">
        <header class="header">
          <h3 id="checkpoint-timeline-title" class="header-title">
            ${e?"执行检查点":"Execution checkpoints"}
          </h3>
          <p class="header-sub">
            ${e?"检查并恢复智能体的执行状态":"Inspect and restore agent execution state"}
          </p>
        </header>

        <div class="body-grid">
          <ol class="sidebar">
            ${eS.map((t,a)=>{let o=e?t.titleZh:t.titleEn,r=a===this._current,n=a===this._selected;return`
                <li class="timeline-item">
                  ${a<eS.length-1?'<span class="timeline-line" aria-hidden="true"></span>':""}
                  <button
                    type="button"
                    class="nav-btn ${n?r?"nav-selected-current":"nav-selected-other":""}"
                    data-idx="${a}"
                    aria-label="${e?"选择检查点":"Select checkpoint"} ${o}"
                    aria-pressed="${n}"
                    ${r?'aria-current="step"':""}
                  >
                    <span class="dot-indicator ${r?"dot-current":n?"dot-selected":""}" aria-hidden="true"></span>
                    <span class="btn-text-wrap">
                      <span class="btn-title">${o}</span>
                      <span class="btn-time">
                        ${t.time}${r?` \xb7 ${e?"当前":"current"}`:""}
                      </span>
                    </span>
                  </button>
                </li>
              `}).join("")}
          </ol>

          <div class="main-pane">
            <div class="detail-header">
              <div>
                <p class="detail-title">${a}</p>
                <p class="detail-summary">${e?t.summaryZh:t.summaryEn}</p>
              </div>
              <span class="detail-time">${t.time}</span>
            </div>

            <div class="snapshot-card">
              <p class="snapshot-title">${e?"文件快照":"File snapshot"}</p>
              <ul class="files-list">
                ${t.files.map(e=>`
                  <li class="file-item">
                    <span class="file-m" aria-hidden="true">M</span>
                    <span>${e}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            ${this._confirming?`
              <div role="alert" class="alert-box">
                <p class="alert-title">${e?`恢复“${a}”？`:`Restore “${a}”?`}</p>
                <p class="alert-desc">
                  ${e?"后续文件改动将被替换。":"Later file changes will be replaced."}
                </p>
                <div class="alert-actions">
                  <button type="button" class="btn-cancel" id="btn-cancel-restore">
                    ${e?"取消":"Cancel"}
                  </button>
                  <button type="button" class="btn-confirm" id="btn-confirm-restore">
                    ${e?"确认恢复":"Confirm restore"}
                  </button>
                </div>
              </div>
            `:`
              <button
                type="button"
                id="btn-trigger-restore"
                class="btn-restore"
                ${o?"disabled":""}
                aria-label="${o?e?"当前检查点":"Current checkpoint":e?"恢复检查点":"Restore checkpoint"}"
              >
                ${o?e?"当前检查点":"Current checkpoint":e?"恢复到此检查点":"Restore this checkpoint"}
              </button>
            `}

            <p role="status" aria-live="polite" class="announcement">
              ${this._announcement}
            </p>
          </div>
        </div>
      </section>
    `,this.shadowRoot.querySelectorAll(".nav-btn").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx"),10);this.selectCheckpoint(t)})}),this.shadowRoot.querySelector("#btn-trigger-restore")?.addEventListener("click",()=>{this._confirming=!0,this.render()}),this.shadowRoot.querySelector("#btn-cancel-restore")?.addEventListener("click",()=>{this._confirming=!1,this.render()}),this.shadowRoot.querySelector("#btn-confirm-restore")?.addEventListener("click",()=>{this.confirmRestore()})}}"u">typeof customElements&&!customElements.get("nai-checkpoint-timeline")&&customElements.define("nai-checkpoint-timeline",eM);let eC=[{id:"cordis-hmr",name:"Cordis.Hmr",version:"1.0.4",scope:"Kernel",enabled:!0,hmrVersion:3,services:[{name:"IHmrWatcher",provider:"Cordis.Hmr.FileSystemWatcher",consumers:["Harness.Core.AgentLoop","Harness.Skill"],status:"active"}]},{id:"harness-llm-deepseek",name:"Harness.Llm.DeepSeek",version:"0.9.2",scope:"Harness",enabled:!0,hmrVersion:1,services:[{name:"ILlmProvider",provider:"DeepSeekReasoningProvider",consumers:["Harness.Core.AgentLoop","Harness.Compaction"],status:"active"}]},{id:"harness-sandbox-e2b",name:"Harness.Sandbox.E2b",version:"0.8.0",scope:"Harness",enabled:!0,hmrVersion:2,services:[{name:"ISandboxRuntime",provider:"E2bContainerWorker",consumers:["Harness.CodeRuntime.Tools","Harness.Terminal.Tools"],status:"active"}]},{id:"harness-lsp",name:"Harness.Lsp.Stdio",version:"0.5.1",scope:"Extension",enabled:!0,hmrVersion:1,services:[{name:"ILspDiagnosticsService",provider:"OmniSharpStdioBridge",consumers:["Harness.Fs.Tools"],status:"active"}]}];class eR extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._plugins=JSON.parse(JSON.stringify(eC)),this._reloadingId=null}handleToggle(e){this._plugins=this._plugins.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerHmr(e){this._reloadingId=e,this.render(),this.registerTimeout(()=>{this._plugins=this._plugins.map(t=>t.id===e?{...t,hmrVersion:t.hmrVersion+1}:t),this._reloadingId=null,this.render()},800)}render(){let e=this.isZh,t=this._plugins.filter(e=>e.enabled).length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .hmr-tag {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }

        .plugin-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .plugin-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          transition: all 0.2s;
        }
        .plugin-enabled {
          background: rgba(247, 248, 249, 0.3);
        }
        .plugin-enabled:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.2);
        }
        .plugin-disabled {
          background: rgba(250, 250, 251, 0.5);
          border-color: rgba(236, 237, 239, 0.6);
          opacity: 0.6;
        }

        .plugin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
        }
        .plugin-info {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .toggle-btn {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s, border-color 0.15s;
          padding: 0;
        }
        .toggle-active {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
        }
        .plugin-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .version-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .scope-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .scope-kernel { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .scope-harness { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }
        .scope-extension { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }

        .plugin-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .rev-label {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .btn-hmr {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-hmr:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-hmr:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .services-box {
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          background: rgba(255, 255, 255, 0.5);
          padding: 8px 12px;
          font-size: 11px;
        }
        .service-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .service-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .service-target {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .service-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--accent-ink, #0170dd);
        }
        .arrow { color: var(--ink-3, #9a9da3); }
        .provider-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
          max-width: 180px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .consumers-count {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .consumers-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 2px;
        }
        .consumer-tag {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid rgba(236, 237, 239, 0.8);
          background: var(--field, #f2f2f3);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-2, #62656b);
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes spin {
          to { transform: rotate(1turn); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${e?"Cordis 插件运行时拓扑":"Cordis Plugin Runtime"}</h3>
                <span class="hmr-tag">${e?"HMR 热重载就绪":"HMR Active"}</span>
              </div>
              <p class="sub-text">${e?"Harness 插件微内核依赖关系图":"Agent harness plugin dependency graph"}</p>
            </div>
          </div>
          <span class="count-chip">${t} ${e?"个活跃插件":"Active Plugins"}</span>
        </div>

        <div class="plugin-list">
          ${this._plugins.map(t=>{let a=this._reloadingId===t.id,o="Kernel"===t.scope?"scope-kernel":"Harness"===t.scope?"scope-harness":"scope-extension",r="Kernel"===t.scope?e?"内核":"Kernel":t.scope;return`
              <div class="plugin-card ${t.enabled?"plugin-enabled":"plugin-disabled"}">
                <div class="plugin-header">
                  <div class="plugin-info">
                    <button
                      type="button"
                      class="toggle-btn ${t.enabled?"toggle-active":""}"
                      data-toggle="${t.id}"
                      title="${t.enabled?e?"禁用插件":"Disable plugin":e?"启用插件":"Enable plugin"}"
                    ></button>
                    <span class="plugin-name">${t.name}</span>
                    <span class="version-chip">v${t.version}</span>
                    <span class="scope-badge ${o}">${r}</span>
                  </div>

                  <div class="plugin-actions">
                    <span class="rev-label">rev #${t.hmrVersion}</span>
                    <button
                      type="button"
                      class="btn-hmr"
                      data-hmr="${t.id}"
                      ${a||!t.enabled?"disabled":""}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        class="${a?"spin":""}"
                        style="${a?"color: var(--accent, #0285ff);":""}"
                      >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                      </svg>
                      <span>${a?e?"重载中...":"Reloading...":"HMR"}</span>
                    </button>
                  </div>
                </div>

                ${t.enabled?`
                  <div class="services-box">
                    ${t.services.map(t=>`
                      <div class="service-row">
                        <div class="service-header">
                          <div class="service-target">
                            <span class="service-name">${t.name}</span>
                            <span class="arrow">→</span>
                            <span class="provider-name">${t.provider}</span>
                          </div>
                          <span class="consumers-count">${t.consumers.length} ${e?"个消费者":"consumers"}</span>
                        </div>
                        <div class="consumers-tags">
                          ${t.consumers.map(e=>`<span class="consumer-tag">${e}</span>`).join("")}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>

        <div class="footer">
          <span>${e?"Harness.Boot 容器已在 84ms 内装配":"Harness.Boot container loaded in 84ms"}</span>
          <span class="footer-mono">Cordis v0.10.2</span>
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-hmr]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-hmr");this.handleTriggerHmr(t)})})}}"u">typeof customElements&&!customElements.get("nai-cordis-plugin-tree")&&customElements.define("nai-cordis-plugin-tree",eR);let eZ=[{id:"strict",nameEn:"Strict Sandboxed",nameZh:"严格沙盒隔离",sandbox:"E2B Cloud",approvalEn:"Strict Prompt",approvalZh:"全量拦截审批",descEn:"Isolated remote container. Prompt user before all file edits, shell commands, and outbound HTTP.",descZh:"在远程隔离容器中执行。任何文件修改、终端命令及外网 HTTP 调用均需用户手动确认。",icon:"shield"},{id:"balanced",nameEn:"Balanced Dev",nameZh:"开发平衡模式",sandbox:"Local Process",approvalEn:"Write-Only Prompt",approvalZh:"仅写操作审批",descEn:"Local sandbox with workspace isolation. Read operations auto-approve; write/exec prompt once.",descZh:"本地沙盒与工作区隔离。读操作自动放行；文件写入与命令执行仅提示一次。",icon:"scale"},{id:"autonomous",nameEn:"Autonomous Agent",nameZh:"全自主执行模式",sandbox:"Local Process",approvalEn:"Autonomous",approvalZh:"完全自主",descEn:"Full automated execution. Retains durable exactly-once audit ledger in SQLite.",descZh:"全自动执行流。在 SQLite 中保留可完整重放的 Exactly-Once 审计账本。",icon:"bolt"}],eA=[{id:"aud-1",action:"fs.write",target:"src/Harness.Core/Session.cs",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:12",hash:"e4f8a1...3b9c"},{id:"aud-2",action:"shell.exec",target:"dotnet build Harness.slnx",statusEn:"Approved",statusZh:"已批准",timestamp:"21:48:19",hash:"82a0bc...19d4"},{id:"aud-3",action:"fs.read",target:"NuGet.config",statusEn:"Auto-Allowed",statusZh:"自动放行",timestamp:"21:48:22",hash:"6c7d1e...90fa"}];class ej extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._selectedPreset="balanced",this._isReplaying=!1,this._replayVerified=!1}handleSelectPreset(e){this._selectedPreset=e,this.render()}handleReplayAudit(){this._isReplaying=!0,this._replayVerified=!1,this.render(),this.registerTimeout(()=>{this._isReplaying=!1,this._replayVerified=!0,this.render()},900)}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .audit-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
        }

        .presets-grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        @media (max-width: 640px) {
          .presets-grid {
            grid-template-columns: 1fr;
          }
        }
        .preset-tile {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .preset-selected {
          border-color: var(--accent, #0285ff);
          background: rgba(233, 243, 255, 0.3);
          box-shadow: 0 1px 2px rgba(2, 133, 255, 0.1);
          outline: 1px solid var(--accent, #0285ff);
        }
        .preset-unselected {
          background: rgba(247, 248, 249, 0.4);
        }
        .preset-unselected:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.3);
        }

        .preset-top {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }
        .preset-icon {
          display: flex;
          width: 16px;
          height: 16px;
          align-items: center;
          justify-content: center;
        }
        .preset-icon-selected { color: var(--accent-ink, #0170dd); }
        .preset-icon-unselected { color: var(--ink-2, #62656b); }

        .preset-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .preset-desc {
          margin: 0;
          font-size: 10.5px;
          line-height: 1.35;
          color: var(--ink-2, #62656b);
        }

        .preset-meta {
          margin-top: 10px;
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          padding-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
        }
        .meta-line {
          display: flex;
          justify-content: space-between;
          color: var(--ink-3, #9a9da3);
        }
        .meta-line-val {
          color: var(--ink, #1f2124);
          font-weight: 500;
        }

        .audit-box {
          margin-top: 16px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.5);
          padding: 12px;
        }
        .audit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(236, 237, 239, 0.6);
        }
        .audit-header-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .audit-title {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .valid-tag {
          display: flex;
          align-items: center;
          gap: 2px;
          color: var(--green, #189a4d);
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
        }
        .btn-replay {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-replay:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-replay:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .audit-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
        }
        .audit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(236, 237, 239, 0.4);
          font-size: 11px;
        }
        .audit-row:last-child {
          border-bottom: none;
        }
        .audit-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .status-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          font-weight: 500;
        }
        .badge-approved { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .badge-denied { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }
        .badge-auto { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }

        .audit-target {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 200px;
        }
        .audit-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .hash-tag {
          border-radius: 4px;
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div>
              <h3 class="title">${e?"权限预设与审计重放":"Permission Presets & Auditing"}</h3>
              <p class="sub-text">${e?"Harness 权限 Bundle 与持久化不可变事实":"Harness authorization bundle & durable facts"}</p>
            </div>
          </div>
          <span class="audit-chip">${e?"Exactly-Once 审计":"Exactly-Once Audit"}</span>
        </div>

        <div class="presets-grid">
          ${eZ.map(t=>{var a;let o=this._selectedPreset===t.id;return`
              <div
                class="preset-tile ${o?"preset-selected":"preset-unselected"}"
                data-preset="${t.id}"
              >
                <div>
                  <div class="preset-top">
                    <span class="preset-icon ${o?"preset-icon-selected":"preset-icon-unselected"}">
                      ${"shield"===(a=t.icon)?`
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        `:"scale"===a?`
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v18M8 21h8M3 7h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zm14 0h4l-3 7a3.5 3.5 0 0 1-4 0l3-7zM5 7l7-4 7 4" transform="translate(1 0) scale(0.92)" />
          </svg>
        `:`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      `}
                    </span>
                    <span class="preset-name">${e?t.nameZh:t.nameEn}</span>
                  </div>
                  <p class="preset-desc">${e?t.descZh:t.descEn}</p>
                </div>

                <div class="preset-meta">
                  <div class="meta-line">
                    <span>${e?"沙盒:":"Sandbox:"}</span>
                    <span class="meta-line-val">${t.sandbox}</span>
                  </div>
                  <div class="meta-line">
                    <span>${e?"审批:":"Approval:"}</span>
                    <span class="meta-line-val">${e?t.approvalZh:t.approvalEn}</span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>

        <div class="audit-box">
          <div class="audit-header">
            <div class="audit-header-left">
              <span class="audit-title">${e?"可重放审计流水 (Audit Trail)":"Replayable Audit Trail"}</span>
              ${this._replayVerified?`<span class="valid-tag">${e?"✓ 校验通过":"✓ Validated"}</span>`:""}
            </div>
            <button
              type="button"
              id="btn-replay-audit"
              class="btn-replay"
              ${this._isReplaying?"disabled":""}
            >
              ${this._isReplaying?e?"正在重放校验...":"Verifying...":e?"重放审计":"Replay Audit"}
            </button>
          </div>

          <div class="audit-list">
            ${eA.map(t=>{let a="Approved"===t.statusEn?"badge-approved":"Denied"===t.statusEn?"badge-denied":"badge-auto";return`
                <div class="audit-row">
                  <div class="audit-left">
                    <span class="status-badge ${a}">${e?t.statusZh:t.statusEn}</span>
                    <span class="audit-target">${t.action}: ${t.target}</span>
                  </div>
                  <div class="audit-right">
                    <span>${t.timestamp}</span>
                    <span class="hash-tag">${t.hash}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll("[data-preset]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-preset");this.handleSelectPreset(t)})}),this.shadowRoot.querySelector("#btn-replay-audit")?.addEventListener("click",()=>{this.handleReplayAudit()})}}"u">typeof customElements&&!customElements.get("nai-permission-preset-card")&&customElements.define("nai-permission-preset-card",ej);let eL=[{id:"diag-1",severity:"error",code:"CS0103",messageEn:"The name 'ContextSpilloverService' does not exist in the current context.",messageZh:"当前上下文中不存在名称 'ContextSpilloverService'，缺少对应命名空间引用。",file:"src/Harness.Compaction/Compactor.cs",line:38,col:14},{id:"diag-2",severity:"warning",code:"CS8618",messageEn:"Non-nullable property 'SessionLedger' must contain a non-null value when exiting constructor.",messageZh:"不可为 null 的属性 'SessionLedger' 在退出构造函数时必须包含非 null 值。",file:"src/Harness.Session.Persistence/SqliteSessionStore.cs",line:22,col:29},{id:"diag-3",severity:"warning",code:"CA2000",messageEn:"Dispose objects before losing scope: 'CancellationTokenSource' is never disposed.",messageZh:"在失去作用域前释放对象: 'CancellationTokenSource' 从未被显式 Dispose 释放。",file:"src/Harness.CodeRuntime/WorkerProcess.cs",line:74,col:21}];class eT extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all",this._diagnostics=JSON.parse(JSON.stringify(eL)),this._fixedIds=[]}setFilter(e){this._filter=e,this.render()}handleFix(e){this._fixedIds.push(e),this.render(),this.registerTimeout(()=>{this._diagnostics=this._diagnostics.filter(t=>t.id!==e),this._fixedIds=this._fixedIds.filter(t=>t!==e),this.render()},600)}render(){let e=this.isZh,t=this._diagnostics.filter(e=>"all"===this._filter||e.severity===this._filter),a={all:e?"全部":"All",error:e?"错误":"Errors",warning:e?"警告":"Warnings"};this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .lsp-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .filter-tabs {
          display: flex;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          font-size: 11px;
        }
        .filter-btn {
          border-radius: var(--radius-chip, 6px);
          padding: 2px 8px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          transition: all 0.15s;
          font-family: inherit;
        }
        .filter-btn:hover {
          color: var(--ink-2, #62656b);
        }
        .filter-active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .diagnostics-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .empty-state {
          border-radius: var(--radius-control, 8px);
          border: 1px dashed var(--line, #ecedef);
          padding: 24px;
          text-align: center;
          font-size: 12px;
          color: var(--green, #189a4d);
        }

        .diag-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 12px;
          transition: all 0.2s;
        }
        .diag-error {
          border-color: rgba(227, 71, 76, 0.3);
          background: rgba(252, 236, 236, 0.2);
        }
        .diag-error:hover {
          border-color: rgba(227, 71, 76, 0.5);
        }
        .diag-warning {
          border-color: rgba(239, 114, 12, 0.3);
          background: rgba(253, 241, 229, 0.2);
        }
        .diag-warning:hover {
          border-color: rgba(239, 114, 12, 0.5);
        }
        .diag-fixing {
          opacity: 0.4;
          transform: scale(0.98);
        }

        .diag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .diag-target {
          display: flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
        }
        .diag-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-error { background: var(--red, #e3474c); }
        .dot-warning { background: var(--orange, #ef720c); }

        .diag-code {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .diag-location {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .btn-fix {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .btn-fix:hover {
          background: var(--accent-tint, #e9f3ff);
          border-color: rgba(2, 133, 255, 0.4);
        }

        .diag-msg {
          margin: 0;
          font-size: 11.5px;
          line-height: 1.35;
          color: var(--ink, #1f2124);
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${e?"Roslyn LSP 实时诊断":"LSP Diagnostics"}</h3>
                <span class="lsp-chip">Roslyn LSP</span>
              </div>
              <p class="sub-text">${e?"Harness.Lsp 工作区静态分析诊断流":"Harness.Lsp live workspace analyzer stream"}</p>
            </div>
          </div>

          <div class="filter-tabs">
            ${["all","error","warning"].map(e=>`
              <button
                type="button"
                class="filter-btn ${this._filter===e?"filter-active":""}"
                data-tab="${e}"
              >
                ${a[e]}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="diagnostics-list">
          ${0===t.length?`
            <div class="empty-state">
              ${e?"✓ 当前工作区内无活动编译错误或警告。":"✓ Zero active compilation errors or warnings."}
            </div>
          `:t.map(t=>{let a=this._fixedIds.includes(t.id),o="error"===t.severity;return`
                <div class="diag-card ${o?"diag-error":"diag-warning"} ${a?"diag-fixing":""}">
                  <div class="diag-header">
                    <div class="diag-target">
                      <span class="diag-dot ${o?"dot-error":"dot-warning"}"></span>
                      <span class="diag-code">${t.code}</span>
                      <span class="diag-location">${t.file}:${t.line}:${t.col}</span>
                    </div>

                    <button
                      type="button"
                      class="btn-fix"
                      data-fix="${t.id}"
                    >
                      <span>${a?e?"修复中...":"Fixing...":e?"一键修复":"Auto-Fix"}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>

                  <p class="diag-msg">${e?t.messageZh:t.messageEn}</p>
                </div>
              `}).join("")}
        </div>

        <div class="footer">
          <span>${e?"目标框架: .NET 10.0":"Target framework: .NET 10.0"}</span>
          <span class="footer-mono">
            ${this._diagnostics.length} ${e?"个作用域内问题":"issues in scope"}
          </span>
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-tab");this.setFilter(t)})}),this.shadowRoot.querySelectorAll("[data-fix]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-fix");this.handleFix(t)})})}}"u">typeof customElements&&!customElements.get("nai-lsp-diagnostics")&&customElements.define("nai-lsp-diagnostics",eT);let eI=[{pid:1402,command:"dotnet run --project src/Harness.Boot",cpuPct:12.4,memMb:240,uptimeEn:"8m 12s",uptimeZh:"8分12秒"},{pid:1489,command:"node ./worker/lsp-bridge.js",cpuPct:3.1,memMb:85,uptimeEn:"6m 40s",uptimeZh:"6分40秒"}];class eB extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._isRunning=!0,this._cpuUsage=15.5,this._memUsage=325}handleRestart(){this._isRunning=!1,this.render(),this.registerTimeout(()=>{this._isRunning=!0,this._cpuUsage=8.2,this._memUsage=212,this.render()},1e3)}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--green-tint, #e8f5ed);
          color: var(--green, #189a4d);
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .status-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .status-running { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .status-restarting { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }

        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .btn-restart {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-restart:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-restart:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .gauges-grid {
          margin-top: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .gauge-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.4);
          padding: 12px;
        }
        .gauge-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .gauge-label {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .gauge-value {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .bar-track {
          margin-top: 8px;
          height: 6px;
          width: 100%;
          border-radius: 9999px;
          background: var(--line, #ecedef);
          overflow: hidden;
        }
        .bar-cpu {
          height: 100%;
          border-radius: 9999px;
          background: var(--accent, #0285ff);
          transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .bar-mem {
          height: 100%;
          border-radius: 9999px;
          background: var(--green, #189a4d);
          transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .gauge-sub {
          margin-top: 4px;
          display: block;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .process-box {
          margin-top: 14px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: rgba(247, 248, 249, 0.3);
          padding: 12px;
        }
        .process-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }
        .process-list {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
        }
        .process-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(236, 237, 239, 0.6);
          font-size: 11px;
        }
        .process-row:last-child {
          border-bottom: none;
        }
        .process-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .process-pid {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .process-cmd {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 240px;
        }
        .process-stats {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-2, #62656b);
          flex-shrink: 0;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${e?"E2B 容器沙盒运行态":"E2B Sandbox Container"}</h3>
                <span class="status-chip ${this._isRunning?"status-running":"status-restarting"}">
                  ${this._isRunning?e?"运行中":"Running":e?"重启中...":"Restarting..."}
                </span>
              </div>
              <p class="sub-text">${e?"隔离环境 Linux x86_64 • Harness.Sandbox.E2b":"Isolated Linux x86_64 • Harness.Sandbox.E2b"}</p>
            </div>
          </div>

          <button
            type="button"
            id="btn-restart"
            class="btn-restart"
            ${!this._isRunning?"disabled":""}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>${e?"重启容器":"Restart Container"}</span>
          </button>
        </div>

        <div class="gauges-grid">
          <div class="gauge-card">
            <div class="gauge-header">
              <span class="gauge-label">${e?"vCPU 算力利用率":"vCPU Utilization"}</span>
              <span class="gauge-value">${this._cpuUsage}%</span>
            </div>
            <div class="bar-track">
              <div class="bar-cpu" style="width: ${2*this._cpuUsage}%;"></div>
            </div>
            <span class="gauge-sub">${e?"独占 2 核心 vCPU":"2 vCPUs dedicated"}</span>
          </div>

          <div class="gauge-card">
            <div class="gauge-header">
              <span class="gauge-label">${e?"内存占用 (RAM)":"Memory (RAM)"}</span>
              <span class="gauge-value">${this._memUsage} MB</span>
            </div>
            <div class="bar-track">
              <div class="bar-mem" style="width: ${this._memUsage/2048*100}%;"></div>
            </div>
            <span class="gauge-sub">${e?"内存配额上限: 2,048 MB":"Limit: 2,048 MB"}</span>
          </div>
        </div>

        <div class="process-box">
          <span class="process-title">${e?"活动隔离进程树":"Active Isolated Processes"}</span>
          <div class="process-list">
            ${eI.map(e=>`
              <div class="process-row">
                <div class="process-left">
                  <span class="process-pid">#${e.pid}</span>
                  <span class="process-cmd">${e.command}</span>
                </div>
                <div class="process-stats">
                  <span>${e.cpuPct}% CPU</span>
                  <span>•</span>
                  <span>${e.memMb} MB</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#btn-restart")?.addEventListener("click",()=>{this.handleRestart()})}}"u">typeof customElements&&!customElements.get("nai-sandbox-manager")&&customElements.define("nai-sandbox-manager",eB);let eq=[{id:"job-1",nameEn:"Vector Embeddings Sync & Reindex",nameZh:"向量嵌入同步与全量重索引",cron:"0 */4 * * *",nextRunEn:"In 1h 24m",nextRunZh:"1小时24分后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-2",nameEn:"Durable SQLite Session Snapshot",nameZh:"SQLite 会话不可变事实快照",cron:"0 * * * *",nextRunEn:"In 18m",nextRunZh:"18分钟后",lastStatusEn:"Success",lastStatusZh:"执行成功",enabled:!0},{id:"job-3",nameEn:"Telemetry Batch Export & Rollup",nameZh:"遥测遥控日志批量聚合导出",cron:"0 0 * * *",nextRunEn:"At 00:00 UTC",nextRunZh:"今天 00:00 UTC",lastStatusEn:"Running",lastStatusZh:"执行中",enabled:!0}];class eP extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._jobs=JSON.parse(JSON.stringify(eq)),this._triggeringId=null}handleToggle(e){this._jobs=this._jobs.map(t=>t.id===e?{...t,enabled:!t.enabled}:t),this.render()}handleTriggerNow(e){this._triggeringId=e,this.render(),this.registerTimeout(()=>{this._triggeringId=null,this.render()},1200)}render(){let e=this.isZh,t=this._jobs.filter(e=>e.enabled).length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--line, #ecedef);
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .icon-box {
          display: flex;
          width: 24px;
          height: 24px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .harness-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }
        .sub-text {
          margin: 2px 0 0 0;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .count-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          color: var(--ink-2, #62656b);
        }

        .jobs-list {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .job-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          padding: 12px;
          transition: all 0.2s;
        }
        .job-enabled {
          background: rgba(247, 248, 249, 0.4);
        }
        .job-enabled:hover {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.2);
        }
        .job-disabled {
          background: rgba(250, 250, 251, 0.4);
          border-color: rgba(236, 237, 239, 0.6);
          opacity: 0.6;
        }

        .job-left {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .toggle-btn {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s, border-color 0.15s;
          padding: 0;
        }
        .toggle-active {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
        }

        .job-info {
          min-width: 0;
        }
        .job-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .job-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cron-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-2, #62656b);
        }
        .next-run {
          margin-top: 2px;
          display: block;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .job-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          padding-left: 8px;
        }
        .status-badge {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .badge-success { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .badge-failed { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }
        .badge-running { background: var(--accent-tint, #e9f3ff); color: var(--accent-ink, #0170dd); }

        .btn-trigger {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 3px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-trigger:hover:not(:disabled) {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }
        .btn-trigger:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="icon-box">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <div>
              <div class="title-row">
                <h3 class="title">${e?"持久化任务与 Cron 调度":"Durable Job Scheduler"}</h3>
                <span class="harness-chip">Harness.Jobs</span>
              </div>
              <p class="sub-text">${e?"后台持久化 Cron 触发器与执行队列":"Durable background cron triggers & queue"}</p>
            </div>
          </div>

          <span class="count-text">${t} ${e?"个活跃 Cron":"Active Crons"}</span>
        </div>

        <div class="jobs-list">
          ${this._jobs.map(t=>{let a=this._triggeringId===t.id,o="Success"===t.lastStatusEn?"badge-success":"Failed"===t.lastStatusEn?"badge-failed":"badge-running",r=e?t.lastStatusZh:t.lastStatusEn;return`
              <div class="job-card ${t.enabled?"job-enabled":"job-disabled"}">
                <div class="job-left">
                  <button
                    type="button"
                    class="toggle-btn ${t.enabled?"toggle-active":""}"
                    data-toggle="${t.id}"
                    title="${t.enabled?e?"禁用定时任务":"Disable cron":e?"启用定时任务":"Enable cron"}"
                  ></button>
                  <div class="job-info">
                    <div class="job-title-row">
                      <span class="job-name">${e?t.nameZh:t.nameEn}</span>
                      <span class="cron-chip">${t.cron}</span>
                    </div>
                    <span class="next-run">
                      ${e?"下次运行: ":"Next run: "}
                      ${e?t.nextRunZh:t.nextRunEn}
                    </span>
                  </div>
                </div>

                <div class="job-right">
                  <span class="status-badge ${o}">${r}</span>
                  <button
                    type="button"
                    class="btn-trigger"
                    data-trigger="${t.id}"
                    ${a||!t.enabled?"disabled":""}
                  >
                    ${a?e?"触发中...":"Running...":e?"立即触发":"Trigger"}
                  </button>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll("[data-toggle]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-toggle");this.handleToggle(t)})}),this.shadowRoot.querySelectorAll("[data-trigger]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-trigger");this.handleTriggerNow(t)})})}}"u">typeof customElements&&!customElements.get("nai-job-scheduler")&&customElements.define("nai-job-scheduler",eP);let eH=[{id:"fs",name:"filesystem",transport:"stdio",status:"connected",latencyMs:3,tools:[{qualified:"filesystem__read_file",descEn:"Read a workspace file",descZh:"读取工作区文件"},{qualified:"filesystem__write_file",descEn:"Write within declared scopes",descZh:"在声明范围内写文件"},{qualified:"filesystem__grep",descEn:"ripgrep over the repo",descZh:"对仓库执行 ripgrep"}]},{id:"rg",name:"ripgrep",transport:"stdio",status:"connected",latencyMs:5,tools:[{qualified:"ripgrep__search",descEn:"Pattern search with globs",descZh:"带 glob 的模式搜索"},{qualified:"ripgrep__files",descEn:"List files matching a glob",descZh:"按 glob 列出文件"}]},{id:"web",name:"web-fetch",transport:"stdio",status:"error",tools:[],errorEn:"handshake timeout after 10s · exit 1",errorZh:"握手 10 秒超时 · 退出码 1"}];class eF extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._expanded="fs",this._retrying=!1,this._recovered=!1}toggleExpand(e){this._expanded=this._expanded===e?null:e,this.render()}handleRetry(){this._retrying=!0,this.render(),this.registerTimeout(()=>{this._retrying=!1,this._recovered=!0,this.render()},1600)}render(){let e=this.isZh,t=this._recovered?"connected":this._retrying?"handshaking":"error",a=eH.filter(e=>("web"===e.id?t:e.status)==="connected").length,o=eH.reduce((e,t)=>e+t.tools.length,0)+2*!!this._recovered,r={connected:{labelEn:"connected",labelZh:"已连接"},handshaking:{labelEn:"handshake",labelZh:"握手中"},error:{labelEn:"error",labelZh:"错误"}};this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
        }
        * { box-sizing: border-box; }
        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 2px #1018280a, 0 2px 6px #10182808);
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--green, #189a4d);
        }
        .title {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin: 0;
        }
        .version-chip {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }
        .count-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .servers-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .server-card {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          transition: background-color 0.15s, border-color 0.15s;
          background: var(--surface, #fff);
        }
        .server-card-expanded {
          border-color: var(--line-strong, #e0e2e5);
          background: rgba(244, 245, 246, 0.3);
        }

        .server-row {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          cursor: pointer;
          user-select: none;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-connected { background: var(--green, #189a4d); }
        .dot-handshaking { background: var(--orange, #ef720c); animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .dot-error { background: var(--red, #e3474c); }

        .server-name {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }
        .transport-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          padding: 1px 4px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--ink-3, #9a9da3);
        }

        .status-chip {
          margin-left: auto;
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
        }
        .status-chip-connected { background: var(--green-tint, #e8f5ed); color: var(--green, #189a4d); }
        .status-chip-handshaking { background: var(--orange-tint, #fdf1e5); color: var(--orange, #ef720c); }
        .status-chip-error { background: var(--red-tint, #fcecec); color: var(--red, #e3474c); }

        .latency-text {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .chevron {
          flex-shrink: 0;
          transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .chevron-rotated {
          transform: rotate(180deg);
        }

        .detail-pane {
          border-top: 1px solid rgba(236, 237, 239, 0.6);
          padding: 8px 10px;
          animation: fade-up 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .error-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .error-msg {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--red, #e3474c);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn-retry {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-retry:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .handshake-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .spinner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          border-top-color: var(--orange, #ef720c);
          animation: spin 1s linear infinite;
          flex-shrink: 0;
        }
        .handshake-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .tools-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tool-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .tool-qualified {
          flex-shrink: 0;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--accent-ink, #0170dd);
        }
        .tool-desc {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .footer {
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }
        .footer-mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(1turn); }
        }
        @keyframes pulse {
          50% { opacity: 0.5; }
        }
      </style>

      <div class="card">
        <div class="header">
          <div class="header-left">
            <span class="status-dot"></span>
            <h3 class="title">${e?"MCP 服务器":"MCP Servers"}</h3>
            <span class="version-chip">v2024-11-05</span>
          </div>
          <span class="count-text">
            ${a}/${eH.length} \xb7 ${o} tools
          </span>
        </div>

        <div class="servers-list">
          ${eH.map(a=>{let o="web"===a.id?t:a.status,n=this._expanded===a.id,i="web"===a.id&&this._recovered?[{qualified:"web-fetch__get",descEn:"GET a URL as markdown",descZh:"以 markdown 获取 URL"},{qualified:"web-fetch__search",descEn:"Web search",descZh:"网页搜索"}]:a.tools,s="web"===a.id?41:a.latencyMs;return`
              <div class="server-card ${n?"server-card-expanded":""}">
                <div
                  role="button"
                  tabindex="0"
                  class="server-row"
                  data-expand="${a.id}"
                >
                  <span class="dot dot-${o}"></span>
                  <code class="server-name">${a.name}</code>
                  <span class="transport-chip">${a.transport}</span>
                  <span class="status-chip status-chip-${o}">
                    ${e?r[o].labelZh:r[o].labelEn}
                  </span>
                  ${"connected"===o&&void 0!==s?`<span class="latency-text">${s}ms</span>`:""}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--ink-3, #9a9da3)"
                    stroke-width="2.4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="chevron ${n?"chevron-rotated":""}"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                ${n?`
                  <div class="detail-pane">
                    ${"error"===o?`
                      <div class="error-row">
                        <span class="error-msg">${e?a.errorZh:a.errorEn}</span>
                        <button type="button" class="btn-retry" id="btn-retry-mcp">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
                          </svg>
                          <span>${e?"重连":"Retry"}</span>
                        </button>
                      </div>
                    `:"handshaking"===o?`
                      <div class="handshake-row">
                        <span class="spinner"></span>
                        <span class="handshake-text">initialize → tools/list…</span>
                      </div>
                    `:`
                      <div class="tools-list">
                        ${i.map(t=>`
                          <div class="tool-row">
                            <code class="tool-qualified">${t.qualified}</code>
                            <span class="tool-desc">${e?t.descZh:t.descEn}</span>
                          </div>
                        `).join("")}
                      </div>
                    `}
                  </div>
                `:""}
              </div>
            `}).join("")}
        </div>

        <div class="footer">
          <span>${e?"工具以 server__tool 限定名注册":"Tools register as server__tool"}</span>
          <span class="footer-mono">Harness.Mcp</span>
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll("[data-expand]").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-expand");this.toggleExpand(t)}),e.addEventListener("keydown",t=>{if("Enter"===t.key||" "===t.key){t.preventDefault();let a=e.getAttribute("data-expand");this.toggleExpand(a)}})}),this.shadowRoot.querySelector("#btn-retry-mcp")?.addEventListener("click",e=>{e.stopPropagation(),this.handleRetry()})}}"u">typeof customElements&&!customElements.get("nai-mcp-servers")&&customElements.define("nai-mcp-servers",eF);let eN=`import React from 'react';

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
}`;async function eU(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a}class eO extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._tab="preview",this._viewport="desktop",this._copied=!1,this._copyError=!1}setTab(e){this._tab=e,this.render()}setViewport(e){this._viewport=e,this.render()}async handleCopy(){this._copyError=!1;try{if(!await eU(eN)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1600)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 14px;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .file-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .file-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filename {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .version-badge {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          color: var(--ink-3, #9a9da3);
        }

        .controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tab-switcher {
          display: flex;
          background: var(--field, #f2f2f3);
          border-radius: var(--radius-control, 8px);
          padding: 2px;
          font-size: 11px;
        }

        .tab-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
        }

        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .viewport-controls {
          display: flex;
          align-items: center;
          gap: 2px;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
          color: var(--ink-3, #9a9da3);
        }

        .vp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          color: inherit;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .vp-btn:hover {
          color: var(--ink, #1f2124);
        }

        .vp-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .copy-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .copy-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .copy-success {
          color: var(--green, #189a4d);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .copy-error {
          color: var(--red, #e3474c);
        }

        .canvas-body {
          display: flex;
          min-height: 220px;
          align-items: center;
          justify-content: center;
          background: var(--canvas, #f1f2f3);
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .preview-container {
          width: 100%;
          transition: max-width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .preview-container.mobile {
          max-width: 280px;
        }

        .preview-container.tablet {
          max-width: 380px;
        }

        .preview-container.desktop {
          max-width: 448px;
        }

        .widget-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .metric-col {
          display: flex;
          flex-direction: column;
        }

        .metric-label {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-value {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 16px;
          font-weight: 600;
          color: var(--ink, #1f2124);
          margin-top: 2px;
        }

        .metric-change {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
          color: var(--green, #189a4d);
          margin-top: 4px;
        }

        .widget-footer {
          grid-column: span 2;
          margin-top: 4px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .link-telemetry {
          color: var(--accent, #0285ff);
          text-decoration: none;
          cursor: pointer;
        }

        .link-telemetry:hover {
          text-decoration: underline;
        }

        .code-block {
          width: 100%;
          overflow-x: auto;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--page, #fafafb);
          padding: 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }

        .code-block pre {
          margin: 0;
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 8px 16px;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="header">
        <div class="file-info">
          <span class="file-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </span>
          <div class="file-title">
            <span class="filename">MetricsWidget.tsx</span>
            <span class="version-badge">v2.1</span>
          </div>
        </div>

        <div class="controls">
          <div class="tab-switcher">
            <button type="button" class="tab-btn ${"preview"===this._tab?"active":""}" id="tab-preview">
              ${e?"实时预览":"Preview"}
            </button>
            <button type="button" class="tab-btn ${"code"===this._tab?"active":""}" id="tab-code">
              ${e?"代码":"Code"}
            </button>
          </div>

          ${"preview"===this._tab?`
            <div class="viewport-controls">
              <button type="button" class="vp-btn ${"desktop"===this._viewport?"active":""}" id="vp-desktop" title="${e?"桌面端":"Desktop"}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </button>
              <button type="button" class="vp-btn ${"tablet"===this._viewport?"active":""}" id="vp-tablet" title="${e?"平板端":"Tablet"}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
              <button type="button" class="vp-btn ${"mobile"===this._viewport?"active":""}" id="vp-mobile" title="${e?"移动端":"Mobile"}">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </button>
            </div>
          `:""}

          <button type="button" class="copy-btn" id="copy-btn" aria-label="${e?"复制":"Copy"}">
            ${this._copyError?`<span class="copy-error">${e?"复制失败":"Copy failed"}</span>`:this._copied?`<span class="copy-success">${h.check} <span>${e?"已复制":"Copied"}</span></span>`:`${h.copy} <span>${e?"复制代码":"Copy"}</span>`}
          </button>
        </div>
      </div>

      <div class="canvas-body">
        ${"preview"===this._tab?`
          <div class="preview-container ${this._viewport}">
            <div class="widget-card">
              <div class="metric-col">
                <span class="metric-label">${e?"日活跃用户 (DAU)":"Daily Active Users"}</span>
                <span class="metric-value">24,582</span>
                <span class="metric-change">↑ +14.2%</span>
              </div>
              <div class="metric-col">
                <span class="metric-label">${e?"平均响应延迟":"Avg Latency"}</span>
                <span class="metric-value">184ms</span>
                <span class="metric-change">↓ -18.4%</span>
              </div>
              <div class="widget-footer">
                <span>${e?"2分钟前已自动刷新":"Auto-refreshed 2m ago"}</span>
                <span class="link-telemetry">${e?"查看遥测数据 →":"View telemetry →"}</span>
              </div>
            </div>
          </div>
        `:`
          <div class="code-block">
            <pre><code>${eN.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
          </div>
        `}
      </div>

      <div class="footer">
        <span>${e?"技术栈: React 19 + Tailwind CSS":"Framework: React 19 + Tailwind CSS"}</span>
        <span class="mono">${e?"编译耗时: 12ms":"Compiled in 12ms"}</span>
      </div>
    `,this.shadowRoot.querySelector("#tab-preview")?.addEventListener("click",()=>this.setTab("preview")),this.shadowRoot.querySelector("#tab-code")?.addEventListener("click",()=>this.setTab("code")),this.shadowRoot.querySelector("#vp-desktop")?.addEventListener("click",()=>this.setViewport("desktop")),this.shadowRoot.querySelector("#vp-tablet")?.addEventListener("click",()=>this.setViewport("tablet")),this.shadowRoot.querySelector("#vp-mobile")?.addEventListener("click",()=>this.setViewport("mobile")),this.shadowRoot.querySelector("#copy-btn")?.addEventListener("click",()=>this.handleCopy())}}"u">typeof customElements&&!customElements.get("nai-artifact-sandbox")&&customElements.define("nai-artifact-sandbox",eO);let eD=[{en:"Flavor",zh:"风味"},{en:"Category",zh:"分类"},{en:"Supplier",zh:"供应商"}],eV=[{nameEn:"Rocky Road",nameZh:"石板街",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"aurora-scoops",removed:!0},{nameEn:"Bubblegum",nameZh:"泡泡糖",dept:"Retro",deptEn:"Retro",deptZh:"复古",email:"kumo-creamery",removed:!0},{nameEn:"Mint Chip",nameZh:"薄荷巧克力",dept:"Classic",deptEn:"Classic",deptZh:"经典",email:"maple-orbit",removed:!1}],eW={Classic:"var(--accent, #0285ff)",Retro:"var(--ink-3, #9a9da3)",Seasonal:"var(--orange, #ef720c)"};class eK extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._stage=0}onMount(){this._startStageProgression()}_startStageProgression(){this._stage=0,this.render(),this.registerTimeout(()=>{this._stage=1,this.render(),this.registerTimeout(()=>{this._stage=2,this.render(),this.registerTimeout(()=>{this._stage=3,this.render()},1e3)},1e3)},800)}render(){let e=this.isZh,t=this._stage>=2,a=this._stage>=3;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .card {
          position: relative;
          overflow: hidden;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
        }

        .card-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 10px 14px;
        }

        .card-title {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        table {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          text-align: left;
        }

        col.col-name { width: 34%; }
        col.col-category { width: 30%; }
        col.col-supplier { width: 36%; }

        th {
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          border-bottom: 1px solid var(--line, #ecedef);
        }

        tr.row-item {
          border-bottom: 1px solid var(--line, #ecedef);
          transition: background-color 400ms ease, color 400ms ease;
        }

        tr.row-item:last-child {
          border-bottom: 0;
        }

        tr.row-item:hover {
          background: var(--hover, #f4f5f6);
        }

        tr.row-item.tinted-out {
          background: var(--red-tint, #fcecec);
        }

        td {
          padding: 8px 12px;
          font-size: 13px;
        }

        .cell-name {
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          transition: color 400ms ease;
          color: var(--ink, #1f2124);
        }

        .cell-name.out {
          color: var(--red, #e3474c);
        }

        .tag-pill {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          background: var(--inset, #f7f8f9);
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          transition: opacity 400ms ease;
        }

        .tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .tag-label {
          color: var(--ink-2, #62656b);
        }

        .cell-supplier {
          font-size: 12.5px;
          white-space: nowrap;
          transition: color 400ms ease, text-decoration 400ms ease;
          color: var(--ink-2, #62656b);
        }

        .cell-supplier.out {
          color: var(--red, #e3474c);
          text-decoration: line-through;
          text-decoration-color: rgba(227, 71, 76, 0.5);
        }

        /* Added row expansion */
        .added-row-container {
          display: grid;
          grid-template-rows: ${a?"1fr":"0fr"};
          opacity: ${a?"1":"0"};
          transition: grid-template-rows 400ms cubic-bezier(0.23, 1, 0.32, 1), opacity 400ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .added-row-inner {
          overflow: hidden;
          background: var(--green-tint, #e8f5ed);
        }

        .added-grid {
          display: grid;
          grid-template-columns: 34% 30% 36%;
          align-items: center;
          border-top: 1px solid var(--line, #ecedef);
          padding: 8px 0;
        }

        .added-grid > span {
          padding: 0 12px;
        }

        .added-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--green, #189a4d);
          font-variant-numeric: tabular-nums;
        }

        .added-tag-pill {
          display: inline-flex;
          height: 22px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 0 8px;
          font-size: 11.5px;
          font-weight: 500;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .added-supplier {
          font-size: 13px;
          color: var(--green, #189a4d);
        }
      </style>

      <div class="card">
        <div class="card-bar">
          <span class="card-title">${e?"菜单清理建议":"Proposed menu cleanup"}</span>
        </div>

        <table>
          <colgroup>
            <col class="col-name" />
            <col class="col-category" />
            <col class="col-supplier" />
          </colgroup>
          <thead>
            <tr>
              ${eD.map(t=>`<th>${e?t.zh:t.en}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${eV.map(a=>{let o=a.removed&&t,r=eW[a.dept]||"var(--ink-3)";return`
                <tr class="row-item ${o?"tinted-out":""}">
                  <td class="cell-name ${o?"out":""}">
                    ${e?a.nameZh:a.nameEn}
                  </td>
                  <td>
                    <span class="tag-pill" style="opacity: ${o?.55:1}">
                      <span class="tag-dot" style="background: ${r}"></span>
                      <span class="tag-label">${e?a.deptZh:a.deptEn}</span>
                    </span>
                  </td>
                  <td class="cell-supplier ${o?"out":""}">
                    ${a.email}
                  </td>
                </tr>
              `}).join("")}

            <tr>
              <td colspan="3" style="padding: 0;">
                <div class="added-row-container">
                  <div class="added-row-inner">
                    <div class="added-grid">
                      <span class="added-name">${e?"开心果":"Pistachio"}</span>
                      <span>
                        <span class="added-tag-pill">
                          <span class="tag-dot" style="background: var(--green, #189a4d)"></span>
                          <span class="tag-label">${e?"季节限定":"Seasonal"}</span>
                        </span>
                      </span>
                      <span class="added-supplier">maple-orbit</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `}}"u">typeof customElements&&!customElements.get("nai-diff-table")&&customElements.define("nai-diff-table",eK);let eG={strong:{labelEn:"Very strong",labelZh:"非常强",color:"var(--green, #189a4d)",rank:3},weak:{labelEn:"Weak",labelZh:"较弱",color:"var(--orange, #ef720c)",rank:2},veryweak:{labelEn:"Very weak",labelZh:"非常弱",color:"var(--red, #e3474c)",rank:1},none:{labelEn:"No communication",labelZh:"无沟通",color:"var(--ink-3, #9a9da3)",rank:0}},eJ={B2B:"#f09a2f",B2C:"#92b72d",Cafe:"#ee6572",Catering:"#c84f9d","Dairy-free":"#16a6c7",Gelato:"#9a5cff",Imports:"#3f78ff",Local:"#25a878",Seasonal:"#f09a2f",Sorbet:"#16a6c7",Vegan:"#92b72d",Wholesale:"#3f78ff"},eY=[{id:"aurora",name:"Aurora Scoops — Reykjavík",tags:["Gelato","Seasonal"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"aurora-scoops.example.com"},{id:"kumo",name:"Kumo Creamery — Tokyo",tags:["B2C","Cafe","Vegan"],lastEn:"3 weeks ago",lastZh:"3 周前",strength:"strong",website:"kumo-creamery.example.com"},{id:"sol-nieve",name:"Sol y Nieve — Buenos Aires",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"sol-y-nieve.example.com"},{id:"maple-orbit",name:"Maple Orbit — Montréal",tags:["B2B","Wholesale","Seasonal"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"maple-orbit.example.com"},{id:"blue-fig",name:"Blue Fig Gelato — Florence",tags:["Gelato","Cafe"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"blue-fig.example.com"},{id:"sahara-swirl",name:"Sahara Swirl — Marrakech",tags:["Sorbet","Local"],lastEn:"5 months ago",lastZh:"5 个月前",strength:"veryweak"},{id:"cloudberry",name:"Cloudberry Cone — Helsinki",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none",website:"cloudberry-cone.example.com"},{id:"palm-sugar",name:"Palm Sugar Creamery — Bangkok",tags:["B2C","Vegan"],lastEn:"3 months ago",lastZh:"3 个月前",strength:"veryweak",website:"palm-sugar.example.com"},{id:"cape-vanilla",name:"Cape Vanilla Co. — Cape Town",tags:["Wholesale","Imports"],lastEn:"over 1 year ago",lastZh:"1 年多前",strength:"veryweak",website:"cape-vanilla.example.com"},{id:"andes-snow",name:"Andes Snow Creamery — Quito",tags:["Gelato","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak"},{id:"tasman-sea",name:"Tasman Sea Gelato — Hobart",tags:["Gelato","Local"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"weak",website:"tasman-sea.example.com"},{id:"silk-road",name:"Silk Road Sorbet — Tbilisi",tags:["Sorbet","Imports"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"weak",website:"silk-road.example.com"},{id:"rosewater",name:"Rosewater Kulfi — Jaipur",tags:["B2C","Seasonal"],lastEn:"2 months ago",lastZh:"2 个月前",strength:"veryweak"},{id:"lumen",name:"Lumen Soft Serve — Copenhagen",tags:["Dairy-free","Cafe"],lastEn:"8 months ago",lastZh:"8 个月前",strength:"weak",website:"lumen-soft-serve.example.com"},{id:"cacao-norte",name:"Cacao Norte — Oaxaca",tags:["B2B","Local","Wholesale"],lastEn:"about 2 years ago",lastZh:"约 2 年前",strength:"none",website:"cacao-norte.example.com"},{id:"pine-pistachio",name:"Pine & Pistachio — Istanbul",tags:["Gelato","Catering"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak"},{id:"ember-cone",name:"Ember Cone Company — Seoul",tags:["B2C","Vegan"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak",website:"ember-cone.example.com"},{id:"coral-coast",name:"Coral Coast Sorbet — Honolulu",tags:["Sorbet","Local"],lastEn:"9 days ago",lastZh:"9 天前",strength:"strong",website:"coral-coast.example.com"},{id:"sunbird",name:"Sunbird Gelateria — Lisbon",tags:["Gelato","Cafe"],lastEn:"over 2 years ago",lastZh:"2 年多前",strength:"none",website:"sunbird.example.com"},{id:"mooncake",name:"Mooncake Ice Cream — Singapore",tags:["B2B","Wholesale"],lastEn:"about 1 month ago",lastZh:"约 1 个月前",strength:"veryweak",website:"mooncake-ice-cream.example.com"},{id:"juniper",name:"Juniper & Cream — Vancouver",tags:["Dairy-free","Catering"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"mango-moon",name:"Mango Moon Gelato — Nairobi",tags:["Sorbet","Vegan"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"mango-moon.example.com"},{id:"fjord-fizz",name:"Fjord Fizz Ice — Oslo",tags:["Dairy-free","Seasonal"],lastEn:"No contact",lastZh:"未联系",strength:"none"},{id:"pampa",name:"Pampa Creamery — Córdoba",tags:["B2C","Local"],lastEn:"12 months ago",lastZh:"12 个月前",strength:"veryweak",website:"pampa-creamery.example.com"},{id:"lotus-leaf",name:"Lotus Leaf Scoops — Hanoi",tags:["Vegan","Cafe"],lastEn:"15 days ago",lastZh:"15 天前",strength:"weak"},{id:"saffron-sky",name:"Saffron Sky Kulfi — Dubai",tags:["Imports","Catering"],lastEn:"almost 2 years ago",lastZh:"近 2 年前",strength:"veryweak",website:"saffron-sky.example.com"}];class eQ extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._selected=new Set,this._sort={key:"name",dir:1}}toggleSort(e){this._sort.key===e?this._sort.dir=1===this._sort.dir?-1:1:this._sort={key:e,dir:1},this.render()}toggleRow(e){this._selected.has(e)?this._selected.delete(e):this._selected.add(e),this.render()}toggleAll(e,t){e?t.forEach(e=>this._selected.delete(e.id)):t.forEach(e=>this._selected.add(e.id)),this.render()}render(){let e=this.isZh,t=this._sort,a=[...eY].sort((e,a)=>("name"===t.key?e.name.localeCompare(a.name):"last"===t.key?e.lastEn.localeCompare(a.lastEn):eG[e.strength].rank-eG[a.strength].rank)*t.dir),o=a.length>0&&a.every(e=>this._selected.has(e.id)),r=!o&&a.some(e=>this._selected.has(e.id)),n=Math.round(eY.reduce((e,t)=>e+eG[t.strength].rank,0)/eY.length/3*100);this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .records-shell {
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
          overflow: hidden;
        }

        .records-scroll {
          overflow: auto;
          max-height: 480px;
          outline: none;
        }

        table.records-table {
          width: 100%;
          min-width: 760px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        col.records-company-col { width: 240px; }
        col.records-category-col { width: 220px; }
        col.records-last-col { width: 140px; }
        col.records-strength-col { width: 160px; }
        col.records-link-col { width: 180px; }

        th.records-header-cell {
          position: sticky;
          top: 0;
          z-index: 2;
          background: var(--inset, #f7f8f9);
          border-bottom: 1px solid var(--line, #ecedef);
          border-right: 1px solid var(--line, #ecedef);
          padding: 0;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        th.records-header-cell:last-child {
          border-right: none;
        }

        .records-sticky-cell {
          position: sticky;
          left: 0;
          z-index: 3;
          background: var(--surface, #fff);
        }

        th.records-sticky-cell {
          z-index: 4;
          background: var(--inset, #f7f8f9);
        }

        .records-header-button {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          font-size: 11.5px;
          font-weight: 500;
          color: inherit;
          cursor: pointer;
          text-align: left;
        }

        .records-header-button:hover {
          background: var(--hover, #f4f5f6);
        }

        .records-company-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
        }

        .records-sort-icon {
          display: inline-flex;
          margin-left: auto;
          color: var(--ink-3, #9a9da3);
          transition: transform 0.15s ease;
        }

        .records-row {
          transition: background-color 0.1s ease;
        }

        .records-row:hover td {
          background-color: var(--hover, #f4f5f6);
        }

        .records-row.is-selected td {
          background-color: var(--accent-tint, #e9f3ff);
        }

        td.records-cell {
          padding: 8px 12px;
          border-bottom: 1px solid var(--line, #ecedef);
          border-right: 1px solid var(--line, #ecedef);
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          background: var(--surface, #fff);
        }

        td.records-cell:last-child {
          border-right: none;
        }

        .records-company-cell {
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .records-company-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: var(--radius-chip, 6px);
          background: var(--field, #f2f2f3);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--ink-2, #62656b);
          flex-shrink: 0;
        }

        .records-company-name {
          font-weight: 500;
          color: var(--ink, #1f2124);
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .records-company-name.has-link:hover {
          color: var(--accent, #0285ff);
          text-decoration: underline;
        }

        .records-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: center;
        }

        .records-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 1px 6px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 500;
          background: var(--inset, #f7f8f9);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          color: var(--ink-2, #62656b);
        }

        .records-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
        }

        .records-strength {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--ink-2, #62656b);
        }

        .records-strength-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .records-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: var(--accent, #0285ff);
          text-decoration: none;
        }

        .records-link:hover {
          text-decoration: underline;
        }

        .records-muted {
          color: var(--ink-3, #9a9da3);
        }

        /* Checkbox styling */
        .records-checkbox {
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .records-checkbox input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .records-checkbox-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          border-radius: 3.5px;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          background: var(--surface, #fff);
          transition: background-color 0.12s, border-color 0.12s;
        }

        .records-checkbox-box.is-active {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .records-checkbox-dash {
          width: 8px;
          height: 2px;
          background: #fff;
          border-radius: 1px;
        }

        /* Footer Calculation Row */
        tfoot tr.records-calculation-row td {
          position: sticky;
          bottom: 0;
          z-index: 2;
          background: var(--inset, #f7f8f9);
          border-top: 1px solid var(--line-strong, #e0e2e5);
          border-bottom: none;
          font-size: 11.5px;
          color: var(--ink-2, #62656b);
        }

        tfoot tr.records-calculation-row td.records-sticky-cell {
          z-index: 4;
          background: var(--inset, #f7f8f9);
        }

        .records-add-calculation {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: transparent;
          padding: 2px 6px;
          font-size: 11.5px;
          color: var(--accent, #0285ff);
          cursor: pointer;
          border-radius: var(--radius-chip, 6px);
        }

        .records-add-calculation:hover {
          background: var(--hover, #f4f5f6);
        }
      </style>

      <div class="records-shell">
        <div class="records-scroll" tabindex="0" aria-label="${e?"公司表格":"Companies table"}">
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
                    <label class="records-checkbox" id="check-all-label">
                      <span class="records-checkbox-box ${o||r?"is-active":""}">
                        ${r?'<span class="records-checkbox-dash"></span>':o?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':""}
                      </span>
                    </label>
                    <button type="button" class="records-header-button" id="sort-name">
                      <span>${e?"公司":"Company"}</span>
                      <span class="records-sort-icon" style="transform: ${"name"===t.key&&-1===t.dir?"rotate(180deg)":"none"}; opacity: ${"name"===t.key?1:.3}">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                      </span>
                    </button>
                  </div>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01"/></svg>
                    <span>${e?"分类":"Categories"}</span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-last">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6"/></svg>
                    <span>${e?"最近互动":"Last interaction"}</span>
                    <span class="records-sort-icon" style="transform: ${"last"===t.key&&-1===t.dir?"rotate(180deg)":"none"}; opacity: ${"last"===t.key?1:.3}">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button" id="sort-strength">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z"/></svg>
                    <span>${e?"联系强度":"Connection strength"}</span>
                    <span class="records-sort-icon" style="transform: ${"strength"===t.key&&-1===t.dir?"rotate(180deg)":"none"}; opacity: ${"strength"===t.key?1:.3}">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </span>
                  </button>
                </th>
                <th class="records-header-cell">
                  <button type="button" class="records-header-button">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>
                    <span>${e?"链接":"Links"}</span>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              ${a.map(t=>{let a=this._selected.has(t.id),o=eG[t.strength];return`
                    <tr class="records-row ${a?"is-selected":""}" data-row-id="${t.id}">
                      <td class="records-cell records-sticky-cell">
                        <div class="records-company-cell">
                          <label class="records-checkbox row-check" data-id="${t.id}">
                            <span class="records-checkbox-box ${a?"is-active":""}">
                              ${a?'<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>':""}
                            </span>
                          </label>
                          <span class="records-company-mark">${t.name.slice(0,1).toUpperCase()}</span>
                          <a href="${t.website?`https://${t.website}`:"#"}" target="_blank" rel="noreferrer" class="records-company-name ${t.website?"has-link":""}">
                            ${t.name}
                          </a>
                        </div>
                      </td>
                      <td class="records-cell">
                        <div class="records-tags">
                          ${t.tags.map(e=>{let t=eJ[e]||"#7f858d";return`
                                <span class="records-tag">
                                  <span class="records-tag-dot" style="background: ${t}"></span>
                                  <span>${e}</span>
                                </span>
                              `}).join("")}
                        </div>
                      </td>
                      <td class="records-cell ${"No contact"===t.lastEn?"records-muted":""}">
                        ${e?t.lastZh:t.lastEn}
                      </td>
                      <td class="records-cell">
                        <span class="records-strength">
                          <span class="records-strength-dot" style="background: ${o.color}"></span>
                          <span>${e?o.labelZh:o.labelEn}</span>
                        </span>
                      </td>
                      <td class="records-cell">
                        ${t.website?`<a class="records-link" href="https://${t.website}" target="_blank" rel="noreferrer">
                                <span>${t.website}</span>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 5h5v5M19 5l-8 8"/></svg>
                               </a>`:'<span class="records-muted">—</span>'}
                      </td>
                    </tr>
                  `}).join("")}
            </tbody>
            <tfoot>
              <tr class="records-calculation-row">
                <td class="records-cell records-sticky-cell">
                  <strong>${eY.length}</strong> ${e?"条记录":"count"}
                </td>
                <td class="records-cell">
                  <button type="button" class="records-add-calculation">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                    <span>${e?"添加计算":"Add calculation"}</span>
                  </button>
                </td>
                <td class="records-cell records-muted">—</td>
                <td class="records-cell">
                  <span class="records-strength">
                    <span class="records-strength-dot" style="background: var(--orange, #ef720c)"></span>
                    <span>${e?`平均 ${n}%`:`${n}% average`}</span>
                  </span>
                </td>
                <td class="records-cell">
                  <span class="records-muted">${eY.filter(e=>e.website).length} ${e?"个链接":"links"}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#check-all-label")?.addEventListener("click",e=>{e.stopPropagation(),this.toggleAll(o,a)}),this.shadowRoot.querySelectorAll(".row-check").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();let a=e.getAttribute("data-id");a&&this.toggleRow(a)})}),this.shadowRoot.querySelector("#sort-name")?.addEventListener("click",()=>this.toggleSort("name")),this.shadowRoot.querySelector("#sort-last")?.addEventListener("click",()=>this.toggleSort("last")),this.shadowRoot.querySelector("#sort-strength")?.addEventListener("click",()=>this.toggleSort("strength"))}}"u">typeof customElements&&!customElements.get("nai-records-table")&&customElements.define("nai-records-table",eQ);let eX=[{key:"all",labelEn:"All",labelZh:"全部",count:5},{key:"todo",labelEn:"To do",labelZh:"待办",dot:"#f09a2f",count:2},{key:"progress",labelEn:"In Progress",labelZh:"进行中",dot:"#16a6c7",count:2},{key:"done",labelEn:"Completed",labelZh:"已完成",dot:"#25a878",count:1}],e1=[{taskEn:"Restock mango sorbet",taskZh:"补货芒果雪葩",dateEn:"Dec 03",dateZh:"12月3日",status:"todo",ownerEn:"Mango Moon Gelato",ownerZh:"Mango Moon 意式冰淇淋"},{taskEn:"Churn black sesame",taskZh:"搅拌黑芝麻基底",dateEn:"Sep 22",dateZh:"9月22日",status:"progress",ownerEn:"Kumo Creamery",ownerZh:"Kumo 乳品工坊"},{taskEn:"Print summer menu",taskZh:"印制夏季菜单",dateEn:"Jan 02",dateZh:"1月2日",status:"todo",ownerEn:"Coral Coast Sorbet",ownerZh:"Coral Coast 雪葩"},{taskEn:"Taste-test batch 42",taskZh:"试吃评测第 42 批",dateEn:"Nov 08",dateZh:"11月8日",status:"progress",ownerEn:"Maple Orbit",ownerZh:"Maple Orbit 枫糖"},{taskEn:"Order waffle cones",taskZh:"订购华夫脆筒",dateEn:"Apr 14",dateZh:"4月14日",status:"done",ownerEn:"Aurora Scoops",ownerZh:"Aurora 冰品铺"}],e0={todo:{labelEn:"To do",labelZh:"待办",color:"#f09a2f"},progress:{labelEn:"In Progress",labelZh:"进行中",color:"#16a6c7"},done:{labelEn:"Completed",labelZh:"已完成",color:"#25a878"}},e2=[{en:"Task name",zh:"任务名称"},{en:"Date",zh:"日期"},{en:"Status",zh:"状态"},{en:"Advisor",zh:"顾问"}];class e4 extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._filter="all"}setFilter(e){this._filter=e,this.render()}render(){let e=this.isZh,t=this._filter;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 440px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .filter-chips {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          padding: 4px 0 8px 0;
          scrollbar-width: none;
        }

        .filter-chips::-webkit-scrollbar {
          display: none;
        }

        .chip-btn {
          display: flex;
          height: 26px;
          flex-shrink: 0;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          border: none;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          color: var(--ink-2, #62656b);
          transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
        }

        .chip-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .chip-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
        }

        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .chip-count {
          border-radius: 4px;
          padding: 0 4px;
          font-size: 10.5px;
          font-variant-numeric: tabular-nums;
          color: var(--ink-3, #9a9da3);
        }

        .chip-btn.active .chip-count {
          background: var(--field, #f2f2f3);
          color: var(--ink-2, #62656b);
        }

        .table-card {
          overflow-x: auto;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          border: 1px solid var(--line, #ecedef);
          scrollbar-width: none;
        }

        .table-card::-webkit-scrollbar {
          display: none;
        }

        .table-inner {
          min-width: 420px;
        }

        .header-row {
          display: grid;
          grid-template-columns: 1.3fr 0.6fr 0.95fr 0.9fr;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
        }

        .row-wrapper {
          display: grid;
          transition: grid-template-rows 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .row-wrapper.hidden {
          grid-template-rows: 0fr;
          opacity: 0;
        }

        .row-wrapper.visible {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .row-inner {
          overflow: hidden;
        }

        .row-content {
          display: grid;
          grid-template-columns: 1.3fr 0.6fr 0.95fr 0.9fr;
          align-items: center;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
          font-size: 12px;
          transition: background-color 0.1s ease;
        }

        .row-wrapper:last-child .row-content {
          border-bottom: none;
        }

        .row-content:hover {
          background: var(--hover, #f4f5f6);
        }

        .task-name {
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-right: 8px;
        }

        .task-date {
          color: var(--ink-2, #62656b);
          font-variant-numeric: tabular-nums;
        }

        .status-pill {
          display: inline-flex;
          height: 20px;
          align-items: center;
          border-radius: 5px;
          padding: 0 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .task-owner {
          color: var(--ink-2, #62656b);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      </style>

      <div class="filter-chips">
        ${eX.map(a=>{let o=t===a.key;return`
            <button
              type="button"
              class="chip-btn ${o?"active":""}"
              data-key="${a.key}"
              aria-pressed="${o}"
            >
              ${a.dot?`<span class="chip-dot" style="background: ${a.dot}"></span>`:""}
              <span>${e?a.labelZh:a.labelEn}</span>
              <span class="chip-count">${a.count}</span>
            </button>
          `}).join("")}
      </div>

      <div class="table-card" role="region" tabindex="0" aria-label="${e?"可滚动任务表格":"Scrollable task table"}">
        <div class="table-inner">
          <div class="header-row">
            ${e2.map(t=>`<span>${e?t.zh:t.en}</span>`).join("")}
          </div>

          ${e1.map(a=>{let o="all"===t||a.status===t,r=e0[a.status];return`
              <div class="row-wrapper ${o?"visible":"hidden"}">
                <div class="row-inner">
                  <div class="row-content">
                    <span class="task-name">${e?a.taskZh:a.taskEn}</span>
                    <span class="task-date">${e?a.dateZh:a.dateEn}</span>
                    <span>
                      <span class="status-pill" style="color: ${r.color}; background: color-mix(in srgb, ${r.color} 13%, transparent);">
                        ${e?r.labelZh:r.labelEn}
                      </span>
                    </span>
                    <span class="task-owner">${e?a.ownerZh:a.ownerEn}</span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll(".chip-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setFilter(t)})})}}"u">typeof customElements&&!customElements.get("nai-filter-table")&&customElements.define("nai-filter-table",e4);let e5="Churn pistachio first thing Saturday so the batch has time to fully firm before the afternoon rush.",e3="周六一开工就先搅拌开心果这一批，让冰淇淋在下午高峰前充分凝冻成型。";class e6 extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._mode="idle",this._action="Improve",this._prompt="",this._expanded=!1,this._streamCount=0,this._shown=!1}onMount(){this.registerTimeout(()=>{this._shown=!0,this.render()},280)}run(e){this._action=e,this._expanded=!1,this._mode="thinking",this.render(),this.registerTimeout(()=>{this._mode="streaming",this._streamCount=0,this.render(),this._runStream()},700)}_runStream(){let e=this.isZh,t=e?e3:e5,a=e?t.split(""):t.split(" "),o=()=>{"streaming"===this._mode&&(this._streamCount<a.length?(this._streamCount++,this.render(),this.registerTimeout(o,46)):(this._mode="result",this.render()))};this.registerTimeout(o,46)}reset(){this._expanded=!1,this._prompt="",this._action="Improve",this._mode="idle",this.render()}render(){let e=this.isZh,t=e?e3:e5,a=e?t.split(""):t.split(" "),o="thinking"===this._mode||"streaming"===this._mode,r=this._prompt.trim().length>0,n="Improve"===this._action?e?"优化中":"Improving":"Shorten"===this._action?e?"精简中":"Shortening":"Change tone"===this._action?e?"调整语气中":"Changing tone":e?"编辑中":"Editing";this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 480px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .container {
          position: relative;
          padding-bottom: 56px;
          user-select: none;
        }

        .text-body {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
        }

        .selection-highlight {
          border-radius: 3px;
          background: color-mix(in srgb, var(--accent, #0285ff) 14%, var(--surface, #fff));
          padding: 1px 2px;
          transition: background-color 0.2s ease;
        }

        .stream-token {
          display: inline;
          animation: stream-in 420ms cubic-bezier(0.22, 0.61, 0.25, 1) both;
        }

        .stream-caret {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          vertical-align: text-bottom;
          background: var(--ink, #1f2124);
          margin-left: 2px;
          animation: caret-blink 1s step-end infinite;
        }

        /* Floating action bar */
        .bar-anchor {
          position: absolute;
          left: 50%;
          bottom: 4px;
          transform: translateX(-50%);
          z-index: 10;
          opacity: ${this._shown?"1":"0"};
          transition: opacity 180ms ease-out, transform 320ms cubic-bezier(0.77, 0, 0.175, 1);
        }

        .bar-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 4px;
          box-shadow: var(--shadow-overlay, 0 8px 28px rgba(0,0,0,0.12), 0 0 0 1px var(--line));
          animation: pop-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
          white-space: nowrap;
        }

        .control-btn {
          display: inline-flex;
          height: 28px;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          padding: 0 10px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.15s, transform 0.15s;
        }

        .control-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .control-btn:active {
          transform: scale(0.96);
        }

        .primary-btn {
          display: inline-flex;
          height: 28px;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          border: none;
          background: var(--ink, #1f2124);
          color: var(--page, #fff);
          padding: 0 12px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
        }

        .primary-btn:hover {
          opacity: 0.9;
        }

        .primary-btn:active {
          transform: scale(0.96);
        }

        .icon-only-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, transform 0.15s;
        }

        .icon-only-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .icon-only-btn:active {
          transform: scale(0.96);
        }

        .divider {
          width: 1px;
          height: 16px;
          background: var(--line, #ecedef);
          margin: 0 2px;
        }

        .prompt-input {
          height: 28px;
          border: none;
          background: transparent;
          padding: 0 10px;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
          width: 130px;
        }

        .prompt-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .spinner {
          width: 12px;
          height: 12px;
          border: 1.5px solid var(--line-strong, #e0e2e5);
          border-top-color: var(--ink-2, #62656b);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .shimmer-text {
          font-size: 12.5px;
          color: var(--ink-2, #62656b);
          background: linear-gradient(90deg, var(--ink-3) 35%, var(--ink) 50%, var(--ink-3) 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 1.4s linear infinite;
        }

        @keyframes shimmer-text { 0% { background-position: 150%; } 100% { background-position: -50%; } }
        @keyframes spin { to { transform: rotate(1turn); } }
        @keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes stream-in { 0% { opacity: 0; filter: blur(4px); } 100% { opacity: 1; filter: blur(0); } }
        @keyframes caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      </style>

      <div class="container">
        <p class="text-body">
          ${e?"整个周末，开心果口味都稳居销量榜首。":"Pistachio holds the top slot all weekend. "}
          <span class="selection-highlight">
            ${"idle"===this._mode||"thinking"===this._mode?e?"周六一开工就先搅拌这一批，让它在下午高峰前有足够时间凝冻成型。":"Churn it first thing Saturday so the batch has time to firm up before the afternoon rush.":"streaming"===this._mode?`${a.slice(0,this._streamCount).map(t=>`<span class="stream-token">${t}${e?"":" "}</span>`).join("")}<span class="stream-caret"></span>`:t}
          </span>
        </p>

        <div class="bar-anchor">
          <div class="bar-pill">
            ${o?`
              <div style="display: flex; align-items: center; gap: 6px; padding: 0 10px;">
                <span class="spinner"></span>
                <span class="shimmer-text">${n}…</span>
              </div>
            `:"result"===this._mode?`
              <button type="button" class="primary-btn" id="btn-keep">
                ${h.check}
                <span>${e?"保留":"Keep"}</span>
              </button>
              <button type="button" class="control-btn" id="btn-discard">
                ${h.x}
                <span>${e?"放弃":"Discard"}</span>
              </button>
              <span class="divider"></span>
              <button type="button" class="icon-only-btn" id="btn-retry" title="${e?"重试":"Try again"}">
                ${h.retry}
              </button>
            `:`
              <input
                type="text"
                class="prompt-input"
                id="prompt-input"
                placeholder="${e?"描述修改要求":"Describe edits"}"
                value="${this._prompt}"
              />

              ${!r?`
                <span class="divider"></span>
                <button type="button" class="control-btn" id="btn-explain">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>${e?"解释":"Explain"}</span>
                </button>
                <button type="button" class="control-btn" id="btn-improve">
                  ${h.spark}
                  <span>${e?"优化":"Improve"}</span>
                </button>

                ${this._expanded?`
                  <button type="button" class="control-btn" id="btn-shorten">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
                    <span>${e?"精简":"Shorten"}</span>
                  </button>
                  <button type="button" class="control-btn" id="btn-tone">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span>${e?"语气":"Tone"}</span>
                  </button>
                  <button type="button" class="control-btn" id="btn-grammar">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                    <span>${e?"语法":"Grammar"}</span>
                  </button>
                `:""}

                <span class="divider"></span>
                <button type="button" class="icon-only-btn" id="btn-toggle-expand" title="${this._expanded?e?"收起":"Fewer":e?"展开":"More"}">
                  <span style="display: flex; transform: ${this._expanded?"rotate(180deg)":"none"}; transition: transform 0.2s ease;">
                    ${h.chevronRight}
                  </span>
                </button>
              `:`
                <button type="button" class="icon-only-btn" id="btn-send-prompt" style="background: var(--ink, #1f2124); color: var(--surface, #fff); width: 24px; height: 24px; margin-right: 2px;" title="${e?"发送":"Send"}">
                  ${h.arrowUp}
                </button>
              `}
            `}
          </div>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#btn-keep")?.addEventListener("click",()=>this.reset()),this.shadowRoot.querySelector("#btn-discard")?.addEventListener("click",()=>this.reset()),this.shadowRoot.querySelector("#btn-retry")?.addEventListener("click",()=>this.run(this._action)),this.shadowRoot.querySelector("#btn-improve")?.addEventListener("click",()=>this.run("Improve")),this.shadowRoot.querySelector("#btn-shorten")?.addEventListener("click",()=>this.run("Shorten")),this.shadowRoot.querySelector("#btn-tone")?.addEventListener("click",()=>this.run("Change tone")),this.shadowRoot.querySelector("#btn-grammar")?.addEventListener("click",()=>this.run("Fix grammar")),this.shadowRoot.querySelector("#btn-explain")?.addEventListener("click",()=>this.run("Explain")),this.shadowRoot.querySelector("#btn-toggle-expand")?.addEventListener("click",()=>{this._expanded=!this._expanded,this.render()});let i=this.shadowRoot.querySelector("#prompt-input");i&&(i.addEventListener("input",e=>{this._prompt=e.target.value,this.render();let t=this.shadowRoot.querySelector("#prompt-input");t&&(t.focus(),t.selectionStart=t.selectionEnd=this._prompt.length)}),i.addEventListener("keydown",e=>{"Enter"===e.key&&(e.preventDefault(),this.run(this._prompt.trim()||"Improve"))})),this.shadowRoot.querySelector("#btn-send-prompt")?.addEventListener("click",()=>{this.run(this._prompt.trim()||"Improve")})}}"u">typeof customElements&&!customElements.get("nai-selection-actions")&&customElements.define("nai-selection-actions",e6);let e8={listening:{en:"Listening",zh:"倾听中",color:"var(--accent, #0285ff)"},thinking:{en:"Thinking",zh:"思考中",color:"var(--orange, #ef720c)"},speaking:{en:"Speaking",zh:"回答中",color:"var(--green, #189a4d)"},idle:{en:"Idle",zh:"已就绪",color:"var(--ink-3, #9a9da3)"}},e9={listening:"Listening to your request...",thinking:"Analyzing AST and resolving circular dependencies...",speaking:"I have updated the routing configuration and verified all 6 endpoints.",idle:"Tap to start voice conversation"},e7={listening:"正在聆听您的指令...",thinking:"正在分析抽象语法树并解决循环依赖...",speaking:"已更新全局路由配置，并成功验证了全部 6 个接口端点。",idle:"点击麦克风开始实时语音对话"};class te extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._state="speaking",this._isMuted=!1,this._bars=Array(16).fill(12)}setState(e){this._state=e,this.render()}toggleMute(){this._isMuted=!this._isMuted,this.render()}onMount(){this._initCanvasAnimation()}_initCanvasAnimation(){let e=this.shadowRoot?.querySelector("#orb-canvas");if(!e)return;let t=e.getContext("2d");if(!t)return;let a=0,o=window.devicePixelRatio||1;e.width=240*o,e.height=180*o,t.scale(o,o),this.registerRaf(e=>{a+=.025,t.clearRect(0,0,240,180);let o=this._state,r="rgba(24, 154, 77, ",n="rgba(2, 133, 255, ",i=2;"speaking"===o?(r="rgba(2, 133, 255, ",n="rgba(59, 130, 246, ",i=3):"listening"===o?(r="rgba(24, 154, 77, ",n="rgba(52, 211, 153, ",i=2):"thinking"===o?(r="rgba(239, 114, 12, ",n="rgba(251, 191, 36, ",i=4):(r="rgba(154, 157, 163, ",n="rgba(224, 226, 229, ",i=.5);let s=38+("idle"===o?0:4*Math.sin(.003*e*i)),d=t.createRadialGradient(120,70,.5*s,120,70,1.8*s);d.addColorStop(0,r+"0.35)"),d.addColorStop(.6,r+"0.12)"),d.addColorStop(1,r+"0)"),t.fillStyle=d,t.beginPath(),t.arc(120,70,1.8*s,0,2*Math.PI),t.fill(),"idle"!==o&&(t.save(),t.translate(120,70),t.rotate(a*("thinking"===o?1.5:.8)),t.strokeStyle=n+"0.45)",t.lineWidth=1.5,t.setLineDash([6,6]),t.beginPath(),t.arc(0,0,s+14,0,2*Math.PI),t.stroke(),t.restore());let l=t.createRadialGradient(120-.3*s,70-.3*s,.1*s,120,70,s);l.addColorStop(0,"#ffffff"),l.addColorStop(.2,r+"0.95)"),l.addColorStop(.7,r+"0.75)"),l.addColorStop(1,r+"0.4)"),t.fillStyle=l,t.beginPath(),t.arc(120,70,s,0,2*Math.PI),t.fill(),t.fillStyle="rgba(255, 255, 255, 0.4)",t.beginPath(),t.arc(120-.35*s,70-.35*s,.28*s,0,2*Math.PI),t.fill();for(let a=0;a<16;a++){let n=4;n=Math.max(3,n="speaking"===o?12*Math.sin(.008*e+.5*a)+6*Math.cos(.004*e+a)+18:"listening"===o?8*Math.sin(.006*e+.4*a)+10:"thinking"===o?5*Math.sin(.01*e+.8*a)+7:3);let i=66+7*a;t.fillStyle=r+"0.85)",t.beginPath(),t.roundRect(i,155-n/2,3,n,2),t.fill()}})}render(){let e=this.isZh,t=this._state,a=e8[t];this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 360px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .status-header {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: ${a.color};
          animation: ${"idle"===t?"none":"pulse-anim 1.5s infinite"};
        }

        .status-label {
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .latency-text {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
        }

        .canvas-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 180px;
          margin: 6px 0;
        }

        canvas {
          display: block;
          width: 240px;
          height: 180px;
        }

        .transcript-box {
          min-height: 40px;
          margin-top: 6px;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          color: var(--ink-2, #62656b);
        }

        .state-pills {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 4px;
          margin-top: 12px;
        }

        .pill-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .pill-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .pill-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .actions-footer {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 16px;
          margin-top: 16px;
        }

        .btn-mute {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--line, #ecedef);
          background: ${this._isMuted?"var(--red-tint, #fcecec)":"var(--field, #f2f2f3)"};
          color: ${this._isMuted?"var(--red, #e3474c)":"var(--ink-2, #62656b)"};
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-mute:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-end {
          display: flex;
          height: 32px;
          align-items: center;
          gap: 6px;
          border-radius: 9999px;
          border: none;
          background: var(--red, #e3474c);
          color: #fff;
          padding: 0 14px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(227, 71, 76, 0.2);
          transition: opacity 0.15s;
        }

        .btn-end:hover {
          opacity: 0.9;
        }

        .end-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
        }

        @keyframes pulse-anim {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.15); }
        }
      </style>

      <div class="status-header">
        <div class="status-badge">
          <span class="pulse-dot"></span>
          <span class="status-label">${e?a.zh:a.en}</span>
        </div>
        <span class="latency-text">210ms • Opus 48kHz</span>
      </div>

      <div class="canvas-wrapper">
        <canvas id="orb-canvas"></canvas>
      </div>

      <p class="transcript-box">
        ${(e?e7:e9)[t]}
      </p>

      <div class="state-pills">
        ${["listening","thinking","speaking","idle"].map(a=>`
          <button type="button" class="pill-btn ${t===a?"active":""}" data-mode="${a}">
            ${e?e8[a].zh:e8[a].en}
          </button>
        `).join("")}
      </div>

      <div class="actions-footer">
        <button type="button" class="btn-mute" id="btn-mute" title="${this._isMuted?e?"取消静音":"Unmute":e?"静音":"Mute"}">
          ${this._isMuted?'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/></svg>':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>'}
        </button>

        <button type="button" class="btn-end" id="btn-end">
          <span class="end-dot"></span>
          <span>${e?"挂断通话":"End Voice"}</span>
        </button>
      </div>
    `,this.shadowRoot.querySelectorAll(".pill-btn").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-mode");t&&this.setState(t)})}),this.shadowRoot.querySelector("#btn-mute")?.addEventListener("click",()=>this.toggleMute()),this.shadowRoot.querySelector("#btn-end")?.addEventListener("click",()=>this.setState("idle")),this._initCanvasAnimation()}}"u">typeof customElements&&!customElements.get("nai-audio-orb")&&customElements.define("nai-audio-orb",te);let tt={name:"Model Alpha",realName:"Claude 3.7 Sonnet",ttft:"340ms",throughput:"78 tok/s",cost:"$0.0024",code:`export class SlidingRateLimiter {
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
}`},ta={name:"Model Beta",realName:"Gemini 2.5 Flash",ttft:"180ms",throughput:"142 tok/s",cost:"$0.0007",code:`export async function checkRateLimit(key: string, limit = 60, windowMs = 60000) {
  const now = Date.now();
  const tx = redis.pipeline();
  tx.zremrangebyscore(key, '-inf', now - windowMs);
  tx.zadd(key, { score: now, member: crypto.randomUUID() });
  tx.zcard(key);
  tx.pexpire(key, windowMs);
  const [_, __, count] = await tx.exec();
  return Number(count) <= limit;
}`};class to extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._voted=null}vote(e){this._voted=e,this.render()}render(){let e=this.isZh,t=this._voted;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 640px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header-banner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding-bottom: 12px;
          gap: 8px;
        }

        .prompt-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .prompt-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          flex-shrink: 0;
        }

        .prompt-text {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .eval-badge {
          border-radius: var(--radius-chip, 6px);
          border: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
        }

        .models-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 16px;
        }

        @media (max-width: 580px) {
          .models-grid {
            grid-template-columns: 1fr;
          }
        }

        .model-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent);
          padding: 12px;
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }

        .model-card.voted {
          border-color: var(--accent, #0285ff);
          background: color-mix(in srgb, var(--accent-tint, #e9f3ff) 20%, var(--surface, #fff));
          box-shadow: 0 0 0 1px var(--accent, #0285ff);
        }

        .model-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-bottom: 8px;
        }

        .model-title-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .model-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .pick-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9px;
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }

        .model-metrics {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-fast {
          color: var(--green, #189a4d);
          font-weight: 500;
        }

        .code-box {
          margin-top: 10px;
          overflow-x: auto;
          border-radius: var(--radius-control, 8px);
          background: var(--page, #fafafb);
          padding: 10px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          line-height: 1.6;
          color: var(--ink-2, #62656b);
        }

        .code-box pre {
          margin: 0;
        }

        .actions-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-top: 1px solid var(--line, #ecedef);
          padding-top: 12px;
          margin-top: 16px;
        }

        .status-msg {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
        }

        .vote-btns {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .vote-btn {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          padding: 4px 12px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s, border-color 0.15s;
        }

        .vote-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .vote-btn.selected {
          border-color: var(--accent, #0285ff);
          background: var(--accent, #0285ff);
          color: #fff;
        }
      </style>

      <div class="header-banner">
        <div class="prompt-info">
          <span class="prompt-icon">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
              <polyline points="23 8 16 12 23 16" />
            </svg>
          </span>
          <span class="prompt-text">
            ${e?'Prompt: "在 TypeScript 中基于 Redis 实现滑动窗口限流算法"':'Prompt: "Implement sliding window rate limiting in TypeScript with Redis"'}
          </span>
        </div>
        <span class="eval-badge">
          ${e?"盲测试验":"Blind Eval"}
        </span>
      </div>

      <div class="models-grid">
        <!-- Model A -->
        <div class="model-card ${"A"===t?"voted":""}">
          <div class="model-header">
            <div class="model-title-group">
              <span class="model-name">${t?tt.realName:tt.name}</span>
              ${"A"===t?`<span class="pick-badge">${e?"您的选择":"Your Pick"}</span>`:""}
            </div>
            <div class="model-metrics">
              <span>${tt.ttft}</span>
              <span>•</span>
              <span>${tt.throughput}</span>
            </div>
          </div>
          <div class="code-box">
            <pre><code>${tt.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
          </div>
        </div>

        <!-- Model B -->
        <div class="model-card ${"B"===t?"voted":""}">
          <div class="model-header">
            <div class="model-title-group">
              <span class="model-name">${t?ta.realName:ta.name}</span>
              ${"B"===t?`<span class="pick-badge">${e?"您的选择":"Your Pick"}</span>`:""}
            </div>
            <div class="model-metrics">
              <span class="metric-fast">${ta.ttft}</span>
              <span>•</span>
              <span class="metric-fast">${ta.throughput}</span>
            </div>
          </div>
          <div class="code-box">
            <pre><code>${ta.code.replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
          </div>
        </div>
      </div>

      <div class="actions-bar">
        <span class="status-msg">
          ${t?e?"偏好投票已记录至 RLHF 训练数据集":"Preferences recorded for RLHF dataset":e?"哪个模型的输出质量更高？":"Which response is higher quality?"}
        </span>

        <div class="vote-btns">
          <button type="button" class="vote-btn ${"A"===t?"selected":""}" id="vote-a">
            ${e?"模型 A 更好":"Model A Better"}
          </button>
          <button type="button" class="vote-btn ${"tie"===t?"selected":""}" id="vote-tie">
            ${e?"平手 / 均可":"Tie"}
          </button>
          <button type="button" class="vote-btn ${"B"===t?"selected":""}" id="vote-b">
            ${e?"模型 B 更好":"Model B Better"}
          </button>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#vote-a")?.addEventListener("click",()=>this.vote("A")),this.shadowRoot.querySelector("#vote-tie")?.addEventListener("click",()=>this.vote("tie")),this.shadowRoot.querySelector("#vote-b")?.addEventListener("click",()=>this.vote("B"))}}"u">typeof customElements&&!customElements.get("nai-model-arena")&&customElements.define("nai-model-arena",to);let tr=[-2.9,-3.4,-3.05,-3.86,-3.52,-4.1,-3.82,-4.41],tn=[.22,.58,.42,.91,.76,1.08,.96,1.15],ti=[274,289,264,307,331,1210,1718,2112],ts=[18,19,17,21,22,58,81,96],td=[{name:"VAN",label:"Vanilla",pct:72.5,amount:"$51,785",color:"var(--orange, #ef720c)"},{name:"CHOC",label:"Chocolate",pct:22.8,amount:"$16,278",color:"var(--line-strong, #3a3c40)"},{name:"MINT",label:"Mint",pct:4.7,amount:"$3,357",color:"var(--line, #ecedef)"}];class tl extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._page=0,this._hoverIndex=null,this._anomalyMetric="spend",this._allocSelected="VAN"}setPage(e){this._page=(this._page+e+3)%3,this._hoverIndex=null,this.render()}setAnomalyMetric(e){this._anomalyMetric=e,this._hoverIndex=null,this.render()}setAllocSelected(e){this._allocSelected=e,this.render()}_drawCompareChart(e){if(!e)return;let t=e.getContext("2d");if(!t)return;let a=window.devicePixelRatio||1,o=e.getBoundingClientRect().width||320;e.width=o*a,e.height=130*a,t.scale(a,a),t.clearRect(0,0,o,130);let r=tr.length,n=[...tr,...tn],i=Math.min(...n)-.5,s=Math.max(...n)+.5,d=e=>e/(r-1)*(o-24)+12,l=e=>116-(e-i)/(s-i)*102,c=l(0);t.strokeStyle="rgba(154, 157, 163, 0.25)",t.lineWidth=1,t.setLineDash([4,4]),t.beginPath(),t.moveTo(12,c),t.lineTo(o-12,c),t.stroke(),t.setLineDash([]),t.strokeStyle="#ef720c",t.lineWidth=2.2,t.beginPath();for(let e=0;e<r;e++){let a=d(e),o=l(tr[e]);0===e?t.moveTo(a,o):t.lineTo(a,o)}t.stroke(),t.strokeStyle="#0285ff",t.lineWidth=2.2,t.beginPath();for(let e=0;e<r;e++){let a=d(e),o=l(tn[e]);0===e?t.moveTo(a,o):t.lineTo(a,o)}if(t.stroke(),null!==this._hoverIndex&&this._hoverIndex>=0&&this._hoverIndex<r){let e=d(this._hoverIndex);t.strokeStyle="rgba(154, 157, 163, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(e,6),t.lineTo(e,124),t.stroke(),t.fillStyle="#ef720c",t.beginPath(),t.arc(e,l(tr[this._hoverIndex]),3.5,0,2*Math.PI),t.fill(),t.fillStyle="#0285ff",t.beginPath(),t.arc(e,l(tn[this._hoverIndex]),3.5,0,2*Math.PI),t.fill()}}_drawAnomalyChart(e){if(!e)return;let t=e.getContext("2d");if(!t)return;let a=window.devicePixelRatio||1,o=e.getBoundingClientRect().width||320;e.width=o*a,e.height=130*a,t.scale(a,a),t.clearRect(0,0,o,130);let r="spend"===this._anomalyMetric?ti:ts,n=r.length,i=.8*Math.min(...r),s=1.1*Math.max(...r),d=e=>e/(n-1)*(o-24)+12,l=e=>116-(e-i)/(s-i)*102,c=t.createLinearGradient(0,10,0,130);c.addColorStop(0,"rgba(227, 71, 76, 0.2)"),c.addColorStop(1,"rgba(227, 71, 76, 0.0)"),t.fillStyle=c,t.beginPath(),t.moveTo(d(0),116);for(let e=0;e<n;e++)t.lineTo(d(e),l(r[e]));t.lineTo(d(n-1),116),t.closePath(),t.fill(),t.strokeStyle="#e3474c",t.lineWidth=2.2,t.beginPath();for(let e=0;e<n;e++){let a=d(e),o=l(r[e]);0===e?t.moveTo(a,o):t.lineTo(a,o)}if(t.stroke(),null!==this._hoverIndex&&this._hoverIndex>=0&&this._hoverIndex<n){let e=d(this._hoverIndex);t.strokeStyle="rgba(154, 157, 163, 0.4)",t.lineWidth=1,t.beginPath(),t.moveTo(e,6),t.lineTo(e,124),t.stroke(),t.fillStyle="#e3474c",t.beginPath(),t.arc(e,l(r[this._hoverIndex]),3.5,0,2*Math.PI),t.fill()}}render(){let e=this.isZh,t=this._page,a=[{prose:e?'你的 <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Creamery</span> 中表现最差的是 Rocky Road——下跌 <code class="mono-red">-6%</code>，合 <code class="mono-red">-$2,453.44</code>。':'The worst performer in your <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Creamery</span> is Rocky Road — down <code class="mono-red">-6%</code> or <code class="mono-red">-$2,453.44</code>.',pill:e?"需要重新平衡口味组合吗？":"Should I rebalance flavors?"},{prose:e?'<span style="font-weight: 500; color: var(--ink);">12 月 13 日</span>的冷柜电费异常偏高——比你的平均水平高出 <code class="mono-red">+$1,834.66</code>。':'Unusually high freezer bill on <span style="font-weight: 500; color: var(--ink);">Dec 13</span> — <code class="mono-red">+$1,834.66</code> above your average.',pill:e?"获取降低冷柜成本的建议":"Get tips on cutting freezer costs"},{prose:e?'你在 <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Vanilla</span> 上投入过重——它占你库存的 <span style="font-weight: 500; color: var(--ink);">72.5%</span>。':'You\'re heavily invested in <span class="entity-tag"><span class="entity-dot dot-orange"></span>@Vanilla</span> — it\'s <span style="font-weight: 500; color: var(--ink);">72.5%</span> of your case.',pill:e?"如果看季节性口味，会有什么变化？":"If we look at seasonals, what changes?"}][t];if(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 360px;
          min-height: 408px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .pager-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pager-title {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .title-count {
          font-size: 13px;
          color: var(--ink-3, #9a9da3);
          font-variant-numeric: tabular-nums;
        }

        .nav-buttons {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }

        .nav-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .page-content {
          animation: fade-up 300ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .prose-text {
          margin-top: 6px;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--ink-2, #62656b);
        }

        .entity-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .entity-dot {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
        }

        .dot-orange { background: var(--orange, #ef720c); }

        .mono-red {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--red, #e3474c);
        }

        .mono-green {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 11.5px;
          color: var(--green, #189a4d);
        }

        .inner-card {
          min-height: 278px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 12px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-top: 8px;
        }

        .chart-box {
          margin-top: 8px;
          overflow: hidden;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .chart-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 6px 10px;
        }

        .chart-topbar span {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .snapshot-chip {
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .canvas-stage {
          position: relative;
          height: 130px;
          width: 100%;
          cursor: crosshair;
        }

        canvas {
          display: block;
          width: 100%;
          height: 130px;
        }

        .tooltip-box {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--tooltip-bg, #25272b);
          color: var(--tooltip-fg, #f6f7f8);
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 10.5px;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          white-space: nowrap;
          z-index: 5;
        }

        .followup-pill {
          margin-top: 8px;
          border-radius: 9999px;
          background: var(--surface, #fff);
          padding: 6px 12px;
          text-align: left;
          font-size: 12px;
          color: var(--ink, #1f2124);
          border: none;
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
          cursor: pointer;
          transition: background-color 0.1s;
        }

        .followup-pill:hover {
          background: var(--hover, #f4f5f6);
        }

        /* Allocation Card styles */
        .alloc-bar {
          display: flex;
          height: 36px;
          gap: 2px;
          overflow: hidden;
          border-radius: 9999px;
          background: var(--field, #f2f2f3);
          padding: 2px;
          margin-top: 12px;
        }

        .alloc-segment {
          position: relative;
          height: 100%;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .alloc-chips {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
        }

        .alloc-chip {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 9999px;
          padding: 2px 8px;
          font-size: 11px;
          border: none;
          background: transparent;
          color: var(--ink-2, #62656b);
          cursor: pointer;
        }

        .alloc-chip.active {
          background: var(--field, #f2f2f3);
          color: var(--ink, #1f2124);
        }

        .alloc-desc-box {
          margin-top: 12px;
          min-height: 64px;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          padding: 8px 10px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="pager-header">
        <div class="pager-title">
          <span class="title-text">${e?"智能洞察":"Insights"}</span>
          <span class="title-count">3</span>
        </div>
        <div class="nav-buttons">
          <button type="button" class="nav-btn" id="btn-prev" aria-label="${e?"上一条洞察":"Previous insight"}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button type="button" class="nav-btn" id="btn-next" aria-label="${e?"下一条洞察":"Next insight"}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <div class="page-content">
        <p class="prose-text">${a.prose}</p>

        <!-- Subcard Rendering -->
        <div class="inner-card">
          ${0===t?`
            <!-- Compare Card -->
            <div style="display: flex; align-items: center; gap: 16px;">
              <div style="flex: 1;">
                <span style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-2);">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--orange);"></span>
                  Mint Chip
                </span>
                <span style="display: block; font-size: 17px; font-weight: 600; color: var(--red); font-variant-numeric: tabular-nums;">-4.41%</span>
                <span class="mono-red">-$2,377.66</span>
              </div>
              <div style="flex: 1;">
                <span style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--ink-2);">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--accent);"></span>
                  Pistachio
                </span>
                <span style="display: block; font-size: 17px; font-weight: 600; color: var(--green); font-variant-numeric: tabular-nums;">+1.15%</span>
                <span class="mono-green">+$617.22</span>
              </div>
            </div>

            <div class="chart-box">
              <div class="chart-topbar">
                <span>${e?"趋势快照":"Trend snapshot"}</span>
                <span class="snapshot-chip">${e?"快照":"Snapshot"}</span>
              </div>
              <div class="canvas-stage" id="chart-stage-compare">
                <canvas id="compare-canvas"></canvas>
                ${null!==this._hoverIndex?`
                  <div class="tooltip-box">
                    <div>Mint Chip: <strong>${tr[this._hoverIndex]}%</strong></div>
                    <div>Pistachio: <strong>+${tn[this._hoverIndex]}%</strong></div>
                  </div>
                `:""}
              </div>
            </div>
          `:1===t?`
            <!-- Anomaly Card -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: var(--ink);">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                ${e?"冷柜支出偏高":"High freezer spend"}
              </span>
              <span class="snapshot-chip">${e?"快照":"Snapshot"}</span>
            </div>

            <div class="chart-box">
              <div class="chart-topbar">
                <span>${"spend"===this._anomalyMetric?"$2,112 阈值":"82 kWh 阈值"}</span>
                <div style="display: flex; background: var(--field); border-radius: 9999px; padding: 2px;">
                  <button type="button" class="alloc-chip ${"spend"===this._anomalyMetric?"active":""}" id="metric-spend">
                    ${e?"支出":"Spend"}
                  </button>
                  <button type="button" class="alloc-chip ${"usage"===this._anomalyMetric?"active":""}" id="metric-usage">
                    ${e?"用电":"Usage"}
                  </button>
                </div>
              </div>
              <div class="canvas-stage" id="chart-stage-anomaly">
                <canvas id="anomaly-canvas"></canvas>
                ${null!==this._hoverIndex?`
                  <div class="tooltip-box">
                    ${"spend"===this._anomalyMetric?`支出: <strong>$${ti[this._hoverIndex]}</strong>`:`用电: <strong>${ts[this._hoverIndex]} kWh</strong>`}
                  </div>
                `:""}
              </div>
            </div>

            <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 8px;">
              <span style="font-size: 17px; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums;">$2,112 ${e?"已支出":"spent"}</span>
              <span class="mono-red">+$1,834.66</span>
              <span style="font-size: 11px; color: var(--ink-3);">${e?"较 3 个月均值":"vs 3 months"}</span>
            </div>
          `:`
            <!-- Allocation Card -->
            <div>
              <span style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: var(--ink);">
                <span style="display: flex; width: 14px; height: 14px; align-items: center; justify-content: center; border-radius: 50%; background: var(--orange); color: #fff; font-size: 8px; font-weight: 700;">V</span>
                Vanilla ${e?"口味配置":"allocation"}
              </span>
              <span style="display: block; margin-top: 4px; font-size: 20px; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums;">
                ${td.find(e=>e.name===this._allocSelected)?.amount}
              </span>

              <div class="alloc-bar">
                ${td.map(e=>{let t=e.name===this._allocSelected;return`
                    <button
                      type="button"
                      class="alloc-segment"
                      data-name="${e.name}"
                      style="width: ${e.pct}%; background: ${e.color}; opacity: ${t?1:.58}; box-shadow: ${t?"inset 0 0 0 1px rgba(255,255,255,0.3)":"none"};"
                    ></button>
                  `}).join("")}
              </div>

              <div class="alloc-chips">
                ${td.map(e=>{let t=e.name===this._allocSelected;return`
                    <button type="button" class="alloc-chip ${t?"active":""}" data-name="${e.name}">
                      <span style="width: 6px; height: 6px; border-radius: 50%; background: ${e.color};"></span>
                      <span>${e.name} ${e.pct}%</span>
                    </button>
                  `}).join("")}
              </div>

              <div class="alloc-desc-box">
                <span style="display: block; font-size: 11.5px; font-weight: 500; color: var(--orange);">
                  ${td.find(e=>e.name===this._allocSelected)?.label}
                </span>
                <span style="display: block; margin-top: 4px; font-size: 11px; line-height: 1.5; color: var(--ink-3);">
                  ${e?"当前库存价值的贡献快照。切换分段即可查看对应分组，卡片位置保持不变。":"Contribution snapshot across current inventory value. Segment selection changes inspected group without moving card."}
                </span>
              </div>
            </div>
          `}
        </div>

        <button type="button" class="followup-pill">
          ${a.pill}
        </button>
      </div>
    `,this.shadowRoot.querySelector("#btn-prev")?.addEventListener("click",()=>this.setPage(-1)),this.shadowRoot.querySelector("#btn-next")?.addEventListener("click",()=>this.setPage(1)),0===t){let e=this.shadowRoot.querySelector("#compare-canvas");this._drawCompareChart(e);let t=this.shadowRoot.querySelector("#chart-stage-compare");t&&(t.addEventListener("pointermove",e=>{let a=t.getBoundingClientRect(),o=Math.round(Math.max(0,Math.min(1,(e.clientX-a.left)/a.width))*(tr.length-1));o!==this._hoverIndex&&(this._hoverIndex=o,this.render())}),t.addEventListener("pointerleave",()=>{this._hoverIndex=null,this.render()}))}else if(1===t){let e=this.shadowRoot.querySelector("#anomaly-canvas");this._drawAnomalyChart(e),this.shadowRoot.querySelector("#metric-spend")?.addEventListener("click",()=>this.setAnomalyMetric("spend")),this.shadowRoot.querySelector("#metric-usage")?.addEventListener("click",()=>this.setAnomalyMetric("usage"));let t=this.shadowRoot.querySelector("#chart-stage-anomaly");t&&(t.addEventListener("pointermove",e=>{let a=t.getBoundingClientRect(),o=Math.round(Math.max(0,Math.min(1,(e.clientX-a.left)/a.width))*(ti.length-1));o!==this._hoverIndex&&(this._hoverIndex=o,this.render())}),t.addEventListener("pointerleave",()=>{this._hoverIndex=null,this.render()}))}else 2===t&&this.shadowRoot.querySelectorAll(".alloc-segment, .alloc-chip").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-name");t&&this.setAllocSelected(t)})})}}"u">typeof customElements&&!customElements.get("nai-insight-cards")&&customElements.define("nai-insight-cards",tl);let tc=[{key:"high",bodyZh:'建议从供应商 <code class="code-chip accent">cone_king</code> 追加补货华夫脆筒，预计交付周期为 <code class="code-chip accent">7_days</code>。',bodyEn:'Reorder waffle cones from <code class="code-chip accent">cone_king</code> with lead time <code class="code-chip accent">7_days</code>.',shortZh:"从 cone_king 补货 · 7天到货",shortEn:"Reorder from cone_king · 7-day lead",signal:3,tone:"var(--green, #189a4d)",labelZh:"高置信度推荐",labelEn:"High confidence",ctaZh:"采纳建议",ctaEn:"Accept",ctaStyle:"cta-accent"},{key:"review",bodyZh:'为迎接旺季需求，建议将香草原料配方切换为 <code class="code-chip orange">vanilla_madagascar</code>。',bodyEn:'Switch vanilla to <code class="code-chip orange">vanilla_madagascar</code> for peak season.',shortZh:"切换为马达加斯加香草配方",shortEn:"Switch to vanilla_madagascar",signal:2,tone:"var(--orange, #ef720c)",labelZh:"需要人工复核",labelEn:"Needs review",ctaZh:"配置参数",ctaEn:"Configure",ctaStyle:"cta-dark"},{key:"none",bodyZh:"对所有库存 SKU 发起全量紧急补货流程。",bodyEn:"Trigger a full restock cycle across every catalog SKU.",shortZh:"全品类 SKU 紧急补货",shortEn:"Full restock across every SKU",signal:0,tone:"var(--line-strong, #e0e2e5)",labelZh:"无足够置信信号",labelEn:"No signal",ctaZh:"忽略",ctaEn:"Dismiss",ctaStyle:"cta-ghost"}];class tp extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._activeKey="high",this._openDrawer=!1}setActiveKey(e){this._activeKey=e,this._openDrawer=!1,this.render()}toggleDrawer(){this._openDrawer=!this._openDrawer,this.render()}render(){let e=this.isZh,t=tc.find(e=>e.key===this._activeKey)||tc[0];this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 380px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .body-card {
          padding: 16px;
        }

        .recommendation-text {
          font-size: 13px;
          line-height: 1.6;
          color: var(--ink, #1f2124);
          margin: 0;
        }

        .code-chip {
          border-radius: var(--radius-chip, 6px);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
        }

        .code-chip.accent {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .code-chip.orange {
          background: var(--orange-tint, #fdf1e5);
          color: var(--orange, #ef720c);
        }

        .drawer {
          margin-top: 14px;
          border-top: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .drawer-title {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-3, #9a9da3);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .alt-option {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 8px;
          text-align: left;
          font-size: 12px;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .alt-option:hover {
          background: var(--hover, #f4f5f6);
        }

        .alt-option.selected {
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
          font-weight: 500;
        }

        .alt-tag {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
        }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 10px 16px;
        }

        .signal-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .signal-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
        }

        .signal-bar {
          width: 4px;
          height: 10px;
          border-radius: 2px;
        }

        .signal-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .action-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-alt {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 10px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }

        .btn-alt:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-cta {
          border-radius: var(--radius-control, 8px);
          border: none;
          padding: 4px 12px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.1s, opacity 0.12s;
        }

        .btn-cta:active {
          transform: scale(0.96);
        }

        .cta-accent {
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .cta-dark {
          background: var(--ink, #1f2124);
          color: var(--canvas, #f1f2f3);
        }

        .cta-ghost {
          background: var(--field, #f2f2f3);
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="body-card">
        <p class="recommendation-text">
          ${e?t.bodyZh:t.bodyEn}
        </p>

        ${this._openDrawer?`
          <div class="drawer">
            <span class="drawer-title">${e?"备选方案":"Alternative Actions"}</span>
            ${tc.map(t=>{let a=t.key===this._activeKey;return`
                <button type="button" class="alt-option ${a?"selected":""}" data-key="${t.key}">
                  <span>${e?t.shortZh:t.shortEn}</span>
                  <span class="alt-tag">${e?t.labelZh:t.labelEn}</span>
                </button>
              `}).join("")}
          </div>
        `:""}
      </div>

      <div class="footer">
        <div class="signal-group">
          <div class="signal-bars">
            <span class="signal-bar" style="background: ${t.signal>=1?t.tone:"var(--line-strong, #e0e2e5)"}"></span>
            <span class="signal-bar" style="background: ${t.signal>=2?t.tone:"var(--line-strong, #e0e2e5)"}"></span>
            <span class="signal-bar" style="background: ${t.signal>=3?t.tone:"var(--line-strong, #e0e2e5)"}"></span>
          </div>
          <span class="signal-label">${e?t.labelZh:t.labelEn}</span>
        </div>

        <div class="action-group">
          <button type="button" class="btn-alt" id="btn-toggle-alt">
            ${e?"备选方案":"Alternatives"}
          </button>
          <button type="button" class="btn-cta ${t.ctaStyle}">
            ${e?t.ctaZh:t.ctaEn}
          </button>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#btn-toggle-alt")?.addEventListener("click",()=>this.toggleDrawer()),this.shadowRoot.querySelectorAll(".alt-option").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setActiveKey(t)})})}}async function th(e){if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0;let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();let a=document.execCommand("copy");return t.remove(),a}"u">typeof customElements&&!customElements.get("nai-recommendation-card")&&customElements.define("nai-recommendation-card",tp);class tf extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._revealed=!1,this._copied=!1,this._copyError=!1,this._apiKey="dsk-live-9824f1a8c901e47d8b3a5c2e"}toggleReveal(){this._revealed=!this._revealed,this.render()}async handleCopy(){this._copyError=!1;try{if(!await th(this._apiKey)){this._copyError=!0,this.render();return}this._copied=!0,this.render(),this.registerTimeout(()=>{this._copied=!1,this.render()},1500)}catch{this._copied=!1,this._copyError=!0,this.render()}}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 512px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 20px;
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding-bottom: 14px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .key-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .kumo-chip {
          border-radius: var(--radius-chip, 6px);
          background: var(--accent-tint, #e9f3ff);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
        }

        .subtitle {
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          margin-top: 2px;
        }

        .security-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 2px 8px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }

        .field-container {
          margin-top: 16px;
        }

        .field-label {
          display: block;
          margin-bottom: 6px;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--field, #f2f2f3);
          padding: 8px 12px;
          transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
        }

        .input-box:focus-within {
          border-color: var(--accent, #0285ff);
          background: var(--surface, #fff);
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent, #0285ff) 20%, transparent);
        }

        .token-input {
          width: 100%;
          border: none;
          background: transparent;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 12px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .input-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          color: var(--ink-3, #9a9da3);
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .icon-btn:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-copy {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 2px 8px;
          font-size: 10.5px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-copy:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .copy-ok {
          color: var(--green, #189a4d);
          font-weight: 500;
        }

        .copy-err {
          color: var(--red, #e3474c);
          font-weight: 500;
        }

        .footer {
          margin-top: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
        }

        .mono {
          font-family: var(--font-mono, ui-monospace, monospace);
        }
      </style>

      <div class="header">
        <div class="header-left">
          <span class="key-icon">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M21 2l-2 2m-1-1l-3 3 2 2 3-3-1-1zm-6 6l-1.5 1.5M10 14l-4 4-2-2 4-4M3 21l3-3" />
            </svg>
          </span>
          <div>
            <div class="title-group">
              <span class="title-text">${e?"API 密钥与凭据保险箱":"API Key & Credentials"}</span>
              <span class="kumo-chip">Kumo Pattern</span>
            </div>
            <div class="subtitle">
              ${e?"DeepSeek 认证令牌与 Harness 运行凭据":"DeepSeek Reasoning & Harness credentials"}
            </div>
          </div>
        </div>

        <span class="security-badge">
          ${e?"静态落盘加密":"Encrypted at Rest"}
        </span>
      </div>

      <div class="field-container">
        <label class="field-label" for="token-input">
          ${e?"DeepSeek API Token (生产环境)":"DeepSeek API Token (Production)"}
        </label>

        <div class="input-box">
          <input
            id="token-input"
            class="token-input"
            type="${this._revealed?"text":"password"}"
            value="${this._apiKey}"
          />

          <div class="input-actions">
            <button
              type="button"
              class="icon-btn"
              id="btn-reveal"
              title="${this._revealed?e?"隐藏令牌":"Hide token":e?"显示令牌":"Reveal token"}"
            >
              ${this._revealed?'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>':'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'}
            </button>

            <button type="button" class="btn-copy" id="btn-copy" aria-label="${e?"复制令牌":"Copy token"}">
              ${this._copyError?`<span class="copy-err">${e?"复制失败":"Copy failed"}</span>`:this._copied?`<span class="copy-ok">${e?"已复制!":"Copied!"}</span>`:`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>${e?"复制":"Copy"}</span>`}
            </button>
          </div>
        </div>
      </div>

      <div class="footer">
        <span class="mono">${e?"作用域: chat.completions, reasoner":"Scope: chat.completions, reasoner"}</span>
        <span>${e?"有效期剩余 89 天":"Expires in 89 days"}</span>
      </div>
    `,this.shadowRoot.querySelector("#btn-reveal")?.addEventListener("click",()=>this.toggleReveal()),this.shadowRoot.querySelector("#btn-copy")?.addEventListener("click",()=>this.handleCopy());let t=this.shadowRoot.querySelector("#token-input");t?.addEventListener("input",e=>{this._apiKey=e.target.value})}}"u">typeof customElements&&!customElements.get("nai-sensitive-input")&&customElements.define("nai-sensitive-input",tf);class tu extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._isOpen=!0,this._activeTab="metrics"}toggleOpen(){this._isOpen=!this._isOpen,this.render()}setActiveTab(e){this._activeTab=e,this.render()}render(){let e=this.isZh;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 576px;
          border-radius: var(--radius-card, 10px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-card, 0 1px 3px rgba(0,0,0,0.06));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          overflow: hidden;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          background: var(--inset, #f7f8f9);
          padding: 12px 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .zap-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-control, 8px);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .title-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .health-badge {
          border-radius: var(--radius-chip, 6px);
          background: var(--green-tint, #e8f5ed);
          padding: 1px 6px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 9.5px;
          font-weight: 500;
          color: var(--green, #189a4d);
        }

        .worker-id {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
          margin-top: 1px;
        }

        .btn-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .btn-toggle:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .toggle-icon {
          transition: transform 0.2s ease;
          transform: ${this._isOpen?"rotate(180deg)":"rotate(0)"};
        }

        .body {
          padding: 16px;
        }

        .tab-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid color-mix(in srgb, var(--line, #ecedef) 60%, transparent);
          padding-bottom: 12px;
        }

        .tab-switcher {
          display: flex;
          background: var(--field, #f2f2f3);
          border-radius: var(--radius-control, 8px);
          padding: 2px;
        }

        .tab-btn {
          border: none;
          background: transparent;
          border-radius: var(--radius-chip, 6px);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.15s, color 0.15s;
        }

        .tab-btn:hover {
          color: var(--ink-2, #62656b);
        }

        .tab-btn.active {
          background: var(--surface, #fff);
          color: var(--ink, #1f2124);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .updated-time {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 12px;
          text-align: center;
        }

        .metric-box {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent);
          padding: 10px;
        }

        .metric-label {
          font-size: 10.5px;
          color: var(--ink-3, #9a9da3);
        }

        .metric-val {
          display: block;
          margin-top: 2px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 14px;
          font-weight: 600;
          color: var(--ink, #1f2124);
        }

        .metric-val.success {
          color: var(--green, #189a4d);
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 12px;
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 10.5px;
        }

        .event-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-chip, 6px);
          background: var(--page, #fafafb);
          padding: 8px;
          color: var(--ink-2, #62656b);
        }

        .event-tag {
          font-weight: 500;
        }

        .event-tag.ok { color: var(--green, #189a4d); }
        .event-tag.snapshot { color: var(--accent, #0285ff); }

        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--line, #ecedef);
          background: color-mix(in srgb, var(--inset, #f7f8f9) 60%, transparent);
          padding: 8px 16px;
          font-size: 11.5px;
        }

        .footer-desc {
          color: var(--ink-3, #9a9da3);
        }

        .footer-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-purge {
          border-radius: var(--radius-control, 8px);
          border: 1px solid var(--line, #ecedef);
          background: var(--surface, #fff);
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-2, #62656b);
          cursor: pointer;
          transition: background-color 0.12s, color 0.12s;
        }

        .btn-purge:hover {
          background: var(--hover, #f4f5f6);
          color: var(--ink, #1f2124);
        }

        .btn-deploy {
          border-radius: var(--radius-control, 8px);
          border: none;
          background: var(--accent, #0285ff);
          color: #fff;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(2, 133, 255, 0.2);
          transition: opacity 0.12s;
        }

        .btn-deploy:hover {
          opacity: 0.9;
        }
      </style>

      <div class="header">
        <div class="header-left">
          <div class="zap-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
          </div>
          <div>
            <div class="title-row">
              <span class="title-text">${e?"Harness 边缘工作节点":"Harness Edge Worker"}</span>
              <span class="health-badge">${e?"健康":"Healthy"}</span>
            </div>
            <div class="worker-id">
              worker-harness-session-prod • us-east-1
            </div>
          </div>
        </div>

        <button
          type="button"
          class="btn-toggle"
          id="btn-toggle"
          title="${this._isOpen?e?"折叠":"Collapse":e?"展开":"Expand"}"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="toggle-icon">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      ${this._isOpen?`
        <div class="body">
          <div class="tab-bar">
            <div class="tab-switcher">
              <button type="button" class="tab-btn ${"metrics"===this._activeTab?"active":""}" id="tab-metrics">
                ${e?"遥测监控指标":"Telemetry Metrics"}
              </button>
              <button type="button" class="tab-btn ${"events"===this._activeTab?"active":""}" id="tab-events">
                ${e?"实时审计事件":"Live Audit Events"}
              </button>
            </div>

            <span class="updated-time">
              ${e?"5秒前已更新":"Last updated 5s ago"}
            </span>
          </div>

          ${"metrics"===this._activeTab?`
            <div class="metrics-grid">
              <div class="metric-box">
                <span class="metric-label">${e?"每分钟请求数":"Requests / min"}</span>
                <span class="metric-val">1,480</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">${e?"P95 延迟":"P95 Latency"}</span>
                <span class="metric-val">18.2ms</span>
              </div>
              <div class="metric-box">
                <span class="metric-label">${e?"请求成功率":"Success Rate"}</span>
                <span class="metric-val success">99.98%</span>
              </div>
            </div>
          `:`
            <div class="events-list">
              <div class="event-row">
                <span>${e?"[21:49:02] Cordis.Loader 初始化了 4 个服务":"[21:49:02] Cordis.Loader initialized 4 services"}</span>
                <span class="event-tag ok">OK</span>
              </div>
              <div class="event-row">
                <span>${e?"[21:49:15] E2B 沙盒快照创建成功 (142MB)":"[21:49:15] E2B Sandbox snapshot created (142MB)"}</span>
                <span class="event-tag snapshot">SNAPSHOT</span>
              </div>
            </div>
          `}
        </div>
      `:""}

      <div class="footer">
        <span class="footer-desc">${e?"Kumo LayerCard 分层架构":"Kumo LayerCard pattern"}</span>
        <div class="footer-actions">
          <button type="button" class="btn-purge">
            ${e?"清除缓存":"Purge Cache"}
          </button>
          <button type="button" class="btn-deploy">
            ${e?"部署变更":"Deploy Changes"}
          </button>
        </div>
      </div>
    `,this.shadowRoot.querySelector("#btn-toggle")?.addEventListener("click",()=>this.toggleOpen()),this.shadowRoot.querySelector("#tab-metrics")?.addEventListener("click",()=>this.setActiveTab("metrics")),this.shadowRoot.querySelector("#tab-events")?.addEventListener("click",()=>this.setActiveTab("events"))}}"u">typeof customElements&&!customElements.get("nai-layer-card")&&customElements.define("nai-layer-card",tu);let tg=[{key:"activity",labelEn:"Home",labelZh:"首页",section:"Workspace"},{key:"tasks",labelEn:"Agent tasks",labelZh:"智能体任务",section:"Workspace",count:!0},{key:"dashboard",labelEn:"Inbox",labelZh:"收件箱",section:"Workspace"},{key:"spaces",labelEn:"Suppliers",labelZh:"供应商",section:"Objects",plus:!0},{key:"analytics",labelEn:"Inventory",labelZh:"库存",section:"Objects"}];class tv extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._active="tasks",this._hovered=null,this._query="",this._badge=4}setActive(e){this._active=e,this.render()}setHovered(e){this._hovered=e,this._updateIndicator()}addNewTask(){this._badge++,this._active="tasks",this.render()}onMount(){this._updateIndicator()}_updateIndicator(){let e=this._hovered||this._active,t=this.shadowRoot?.querySelector(`[data-key="${e}"]`),a=this.shadowRoot?.querySelector("#nav-indicator"),o=this.shadowRoot?.querySelector("#nav-list-container");if(t&&a&&o){let e=o.getBoundingClientRect(),r=t.getBoundingClientRect();a.style.top=`${r.top-e.top}px`,a.style.height=`${r.height}px`,a.style.opacity="1"}else a&&(a.style.opacity="0")}render(){let e=this.isZh,t=this._active,a=this._badge;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 240px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 8px;
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          user-select: none;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .workspace-btn {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 10px;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 6px;
          text-align: left;
          cursor: pointer;
          margin-bottom: 8px;
          transition: background-color 0.1s, transform 0.1s;
        }

        .workspace-btn:hover {
          background: var(--hover, #f4f5f6);
        }

        .workspace-avatar {
          display: flex;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: var(--ink, #1f2124);
          color: var(--surface, #fff);
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .workspace-info {
          min-width: 0;
          flex: 1;
        }

        .ws-title {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
        }

        .ws-sub {
          display: block;
          font-size: 11px;
          color: var(--ink-3, #9a9da3);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
          margin-top: 2px;
        }

        .search-box {
          display: flex;
          height: 32px;
          align-items: center;
          gap: 8px;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          padding: 0 10px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-bottom: 6px;
        }

        .search-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .kbd-chip {
          display: flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          background: var(--surface, #fff);
          font-size: 10px;
          color: var(--ink-3, #9a9da3);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          font-family: var(--font-mono, ui-monospace, monospace);
        }

        .btn-new-task {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-control, 8px);
          border: none;
          background: transparent;
          padding: 6px 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--accent-ink, #0170dd);
          cursor: pointer;
          margin-bottom: 8px;
          transition: background-color 0.1s;
        }

        .btn-new-task:hover {
          background: var(--accent-tint, #e9f3ff);
        }

        .plus-dot {
          display: flex;
          width: 16px;
          height: 16px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent, #0285ff);
          color: #fff;
        }

        .nav-list-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-indicator {
          position: absolute;
          left: 0;
          right: 0;
          border-radius: 7px;
          background: var(--hover, #f4f5f6);
          pointer-events: none;
          transition: top 220ms cubic-bezier(0.23, 1, 0.32, 1), height 220ms cubic-bezier(0.23, 1, 0.32, 1), opacity 150ms ease;
          opacity: 0;
        }

        .section-header {
          padding: 4px 8px;
          font-size: 10.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink-3, #9a9da3);
        }

        .nav-item-btn {
          position: relative;
          z-index: 1;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 8px;
          border-radius: 7px;
          border: none;
          background: transparent;
          padding: 6px 8px;
          text-align: left;
          cursor: pointer;
          transition: color 0.15s;
        }

        .nav-item-btn .item-icon {
          color: var(--ink-3, #9a9da3);
          display: flex;
        }

        .nav-item-btn.active .item-icon {
          color: var(--ink, #1f2124);
        }

        .nav-item-btn .item-label {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: var(--ink-2, #62656b);
        }

        .nav-item-btn.active .item-label {
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .count-badge {
          display: flex;
          height: 18px;
          min-width: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          padding: 0 4px;
          font-size: 10.5px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent-ink, #0170dd);
        }

        .nav-item-btn.active .count-badge {
          background: var(--surface, #fff);
          color: var(--ink-2, #62656b);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
        }

        .plus-action-btn {
          display: flex;
          width: 18px;
          height: 18px;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          color: var(--ink-3, #9a9da3);
          opacity: 0;
          transition: opacity 0.1s, background-color 0.1s;
        }

        .nav-item-btn:hover .plus-action-btn {
          opacity: 1;
        }

        .plus-action-btn:hover {
          background: color-mix(in srgb, var(--line, #ecedef) 70%, transparent);
          color: var(--ink-2, #62656b);
        }
      </style>

      <button type="button" class="workspace-btn">
        <span class="workspace-avatar">C</span>
        <div class="workspace-info">
          <span class="ws-title">Creamery Ops</span>
          <span class="ws-sub">${e?"生产工作区":"Production Workspace"}</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2">
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
        </svg>
      </button>

      <div class="search-box">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input class="search-input" placeholder="${e?"快速搜索":"Quick search"}" value="${this._query}" />
        <kbd class="kbd-chip">/</kbd>
      </div>

      <button type="button" class="btn-new-task" id="btn-new-task">
        <span>${e?"新建任务":"New task"}</span>
        <span class="plus-dot">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div class="nav-list-container" id="nav-list-container">
        <span class="nav-indicator" id="nav-indicator"></span>

        ${[{key:"Workspace",label:e?"工作区":"Workspace"},{key:"Objects",label:e?"对象":"Objects"}].map(o=>`
          <div>
            <div class="section-header">${o.label}</div>
            <div style="display: flex; flex-direction: column; gap: 1px;">
              ${tg.filter(e=>e.section===o.key).map(o=>{var r;let n=o.key===t;return`
                  <button
                    type="button"
                    class="nav-item-btn ${n?"active":""}"
                    data-key="${o.key}"
                  >
                    <span class="item-icon">${r=o.key,`
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      ${({activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2" />',tasks:'<path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />',spaces:'<path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />',dashboard:'<rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />',analytics:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />'})[r]||""}
    </svg>
  `}</span>
                    <span class="item-label">${e?o.labelZh:o.labelEn}</span>
                    ${o.count?`<span class="count-badge">${a}</span>`:""}
                    ${o.plus?'<span class="plus-action-btn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg></span>':""}
                  </button>
                `}).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `,this.shadowRoot.querySelector("#btn-new-task")?.addEventListener("click",()=>this.addNewTask()),this.shadowRoot.querySelectorAll(".nav-item-btn").forEach(e=>{let t=e.getAttribute("data-key");e.addEventListener("mouseenter",()=>this.setHovered(t)),e.addEventListener("click",()=>{t&&this.setActive(t)})}),this.shadowRoot.querySelector("#nav-list-container")?.addEventListener("mouseleave",()=>{this.setHovered(null)});let o=this.shadowRoot.querySelector(".search-input");o?.addEventListener("input",e=>{this._query=e.target.value}),this._updateIndicator()}}"u">typeof customElements&&!customElements.get("nai-sidebar-nav")&&customElements.define("nai-sidebar-nav",tv);let tm=[{en:"Forecast summer demand",zh:"预测夏季需求"},{en:"Find waffle cone suppliers",zh:"寻找华夫脆筒供应商"},{en:"Compare seasonal flavors",zh:"对比季节限定口味"},{en:"Draft flavor launch plan",zh:"起草新口味上市计划"},{en:"Check cold-chain status",zh:"检查冷链状态"},{en:"Audit sugar costs",zh:"核算糖原料成本"},{en:"Retire low sellers",zh:"下架滞销口味"}];class tb extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._query=""}setQuery(e){this._query=e,this.render()}render(){let e=this.isZh,t=this._query,a=t=>e?t.zh:t.en,o=t?tm.filter(e=>a(e).toLowerCase().includes(t.toLowerCase())):tm.slice(0,5),r=t.length>2&&0===o.length;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 288px;
          min-height: 248px;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .card {
          width: 100%;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          overflow: hidden;
        }

        .input-row {
          display: flex;
          height: 40px;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 0 12px;
        }

        .search-icon {
          color: var(--ink-3, #9a9da3);
          flex-shrink: 0;
          display: flex;
        }

        .search-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 13px;
          color: var(--ink, #1f2124);
          outline: none;
        }

        .search-input::placeholder {
          color: var(--ink-3, #9a9da3);
        }

        .btn-clear {
          display: flex;
          width: 22px;
          height: 22px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: var(--ink-3, #9a9da3);
          cursor: pointer;
          transition: background-color 0.1s, color 0.1s;
        }

        .btn-clear:hover {
          background: color-mix(in srgb, var(--line, #ecedef) 70%, transparent);
          color: var(--ink, #1f2124);
        }

        .results-list {
          padding: 4px;
        }

        .result-item {
          display: flex;
          height: 32px;
          width: 100%;
          align-items: center;
          border-radius: 6px;
          border: none;
          background: transparent;
          padding: 0 8px;
          text-align: left;
          font-size: 13px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.1s;
        }

        .result-item:hover {
          background: var(--hover, #f4f5f6);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 32px 16px;
          text-align: center;
        }

        .empty-icon {
          display: flex;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-control, 8px);
          background: var(--inset, #f7f8f9);
          color: var(--ink-3, #9a9da3);
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          margin-bottom: 6px;
        }

        .empty-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .empty-sub {
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }
      </style>

      <div class="card">
        <div class="input-row">
          <span class="search-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>

          <input
            id="search-input"
            class="search-input"
            placeholder="${e?"搜索风味…":"Search flavors…"}"
            aria-label="${e?"搜索风味":"Search flavors"}"
            value="${t}"
          />

          ${t?`
            <button type="button" class="btn-clear" id="btn-clear" aria-label="${e?"清除搜索":"Clear search"}">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          `:""}
        </div>

        ${r?`
          <div class="empty-state">
            <div class="empty-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </div>
            <span class="empty-title">${e?"未找到相关结果":"No results found"}</span>
            <span class="empty-sub">${e?"换个关键词再试一次":"Adjust your search to try again"}</span>
          </div>
        `:`
          <div class="results-list">
            ${o.map(e=>`
              <button type="button" class="result-item" data-text="${a(e)}">
                ${a(e)}
              </button>
            `).join("")}
          </div>
        `}
      </div>
    `;let n=this.shadowRoot.querySelector("#search-input");n&&n.addEventListener("input",e=>{this._query=e.target.value,this.render();let t=this.shadowRoot.querySelector("#search-input");t&&(t.focus(),t.selectionStart=t.selectionEnd=this._query.length)}),this.shadowRoot.querySelector("#btn-clear")?.addEventListener("click",()=>{this.setQuery("")}),this.shadowRoot.querySelectorAll(".result-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-text");t&&this.setQuery(t)})})}}"u">typeof customElements&&!customElements.get("nai-search")&&customElements.define("nai-search",tb);let tx=["row","col","grid"],ty=[{key:"Seasonal",labelEn:"Seasonal",labelZh:"季节限定"},{key:"Classic",labelEn:"Classic",labelZh:"经典"},{key:"Limited",labelEn:"Limited",labelZh:"限量"}];class tk extends s{static get observedAttributes(){return["lang"]}constructor(){super(),this._seg=0,this._width=324,this._height=96,this._radius=28,this._opacity=100,this._menuOpen=!1,this._typeValue=null,this._dragState=null}setSeg(e){this._seg=e,this.render()}setTypeValue(e){this._typeValue=e,this._menuOpen=!1,this.render()}toggleMenu(){this._menuOpen=!this._menuOpen,this.render()}_clamp(e,t,a){return Math.min(a,Math.max(t,Math.round(e)))}_renderScrubField(e,t,a,o,r,n=""){return`
      <div
        class="scrub-field ${"width"===e&&324!==a||"height"===e&&96!==a||"radius"===e&&28!==a||"opacity"===e&&100!==a?"active":""}"
        data-field="${e}"
        data-min="${o}"
        data-max="${r}"
      >
        <span class="scrub-handle" data-field="${e}" role="slider" aria-label="${t}" aria-valuenow="${a}" tabindex="0">
          ${t}
        </span>
        <input
          class="scrub-input"
          data-field="${e}"
          type="text"
          inputmode="numeric"
          value="${a}"
          aria-label="${t} value"
        />
        ${n?`<span class="scrub-suffix">${n}</span>`:""}
      </div>
    `}render(){let e=this.isZh,t=0!==this._seg||324!==this._width||96!==this._height||28!==this._radius||100!==this._opacity||null!==this._typeValue;this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 240px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif);
          color: var(--ink, #1f2124);
          box-sizing: border-box;
          user-select: none;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        .header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--line, #ecedef);
          padding: 8px 12px;
        }

        .card-title {
          font-size: 13px;
          font-weight: 500;
          color: var(--ink, #1f2124);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .badge-edited {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
          color: var(--green, #189a4d);
          animation: pop-in 250ms cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .badge-adjust {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .spark-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1px solid color-mix(in srgb, var(--accent, #0285ff) 30%, transparent);
          background: var(--accent-tint, #e9f3ff);
          color: var(--accent, #0285ff);
        }

        .shimmer-text {
          font-size: 12px;
          font-weight: 500;
          background: linear-gradient(90deg, var(--accent, #0285ff) 35%, var(--accent-ink, #0170dd) 50%, var(--accent, #0285ff) 65%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 1.4s linear infinite;
        }

        .pad-section {
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--line, #ecedef);
        }

        .section-label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink, #1f2124);
          margin: 0;
        }

        .segmented-ctrl {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-radius: var(--radius-control, 8px);
          background: var(--field, #f2f2f3);
          padding: 2px;
        }

        .seg-thumb {
          position: absolute;
          top: 2px;
          bottom: 2px;
          width: calc((100% - 4px) / 3);
          left: 2px;
          border-radius: 6px;
          background: var(--surface, #fff);
          box-shadow: var(--shadow-btn, 0 0 0 1px var(--line-strong), 0 1px 2px rgba(0,0,0,0.05));
          transform: translateX(${100*this._seg}%);
          transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .seg-btn {
          position: relative;
          z-index: 1;
          display: flex;
          height: 24px;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--ink-3, #9a9da3);
          transition: color 0.2s;
        }

        .seg-btn.active {
          color: var(--accent, #0285ff);
        }

        .fields-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .scrub-field {
          display: flex;
          height: 26px;
          min-width: 0;
          align-items: center;
          gap: 4px;
          border-radius: var(--radius-chip, 6px);
          padding: 2px 4px 2px 6px;
          background: var(--field, #f2f2f3);
          transition: background-color 0.2s, box-shadow 0.2s;
        }

        .scrub-field.active {
          background: var(--accent-tint, #e9f3ff);
          box-shadow: 0 0 0 1px var(--accent, #0285ff);
        }

        .scrub-handle {
          display: flex;
          height: 100%;
          align-items: center;
          cursor: ew-resize;
          touch-action: none;
          border-radius: 4px;
          padding: 0 2px;
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
          outline: none;
          flex-shrink: 0;
        }

        .scrub-handle:hover {
          color: var(--ink-2, #62656b);
        }

        .scrub-input {
          min-width: 0;
          flex: 1;
          border: none;
          background: transparent;
          font-size: 12px;
          color: var(--ink, #1f2124);
          font-variant-numeric: tabular-nums;
          outline: none;
          padding: 0;
        }

        .scrub-suffix {
          font-size: 11.5px;
          color: var(--ink-3, #9a9da3);
          padding-right: 2px;
          flex-shrink: 0;
        }

        .footer-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
        }

        .type-label {
          font-size: 12px;
          color: var(--ink-3, #9a9da3);
        }

        .dropdown-container {
          position: relative;
          width: 120px;
        }

        .btn-dropdown {
          display: flex;
          height: 26px;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          border-radius: var(--radius-chip, 6px);
          border: none;
          background: var(--inset, #f7f8f9);
          padding: 2px 4px 2px 8px;
          font-size: 12px;
          box-shadow: var(--shadow-hairline, 0 0 0 1px var(--line));
          cursor: pointer;
        }

        .dropdown-chevron {
          transition: transform 0.2s ease;
          transform: ${this._menuOpen?"rotate(180deg)":"rotate(0)"};
          color: var(--ink-3, #9a9da3);
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          bottom: 32px;
          z-index: 10;
          width: 120px;
          border-radius: var(--radius-card, 10px);
          background: var(--surface, #fff);
          padding: 4px;
          box-shadow: var(--shadow-raised, 0 2px 10px rgba(0,0,0,0.06), 0 0 0 1px var(--line));
          animation: pop-in 200ms cubic-bezier(0.23, 1, 0.32, 1) both;
          transform-origin: bottom right;
        }

        .dropdown-item {
          display: flex;
          height: 26px;
          width: 100%;
          align-items: center;
          border-radius: 6px;
          border: none;
          background: transparent;
          padding: 0 8px;
          text-align: left;
          font-size: 12.5px;
          color: var(--ink, #1f2124);
          cursor: pointer;
          transition: background-color 0.15s;
        }

        .dropdown-item:hover {
          background: var(--field, #f2f2f3);
        }

        .dropdown-item.selected {
          background: var(--field, #f2f2f3);
        }

        @keyframes shimmer-text { 0% { background-position: 150%; } 100% { background-position: -50%; } }
        @keyframes pop-in { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
      </style>

      <div class="header-bar">
        <span class="card-title">${e?"风味卡片":"Flavor card"}</span>
        <div class="status-badge">
          ${t?`
            <span class="badge-edited">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${e?"已编辑":"Edited"}</span>
            </span>
          `:`
            <div class="badge-adjust">
              <span class="spark-icon">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>
              </span>
              <span class="shimmer-text">${e?"调整":"Adjust"}</span>
            </div>
          `}
        </div>
      </div>

      <div class="pad-section">
        <p class="section-label">${e?"布局":"Layout"}</p>

        <div class="segmented-ctrl">
          <span class="seg-thumb"></span>
          ${tx.map((e,t)=>`
            <button type="button" class="seg-btn ${t===this._seg?"active":""}" data-idx="${t}" aria-label="${e} layout">
              ${"row"===e?`
      <span style="display: flex; gap: 2px;">
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      </span>
    `:"col"===e?`
      <span style="display: flex; flex-direction: column; gap: 2px;">
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
        <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      </span>
    `:`
    <span style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;">
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
      <span style="width: 5px; height: 5px; border-radius: 1.5px; border: 1.2px solid currentColor;"></span>
    </span>
  `}
            </button>
          `).join("")}
        </div>

        <div class="fields-grid">
          ${this._renderScrubField("width",e?"宽":"W",this._width,40,999)}
          ${this._renderScrubField("height",e?"高":"H",this._height,24,999)}
        </div>

        <div class="fields-grid">
          ${this._renderScrubField("radius",e?"圆角":"Radius",this._radius,0,64)}
          ${this._renderScrubField("opacity",e?"不透明":"Opacity",this._opacity,0,100,"%")}
        </div>
      </div>

      <div class="footer-section">
        <span class="type-label">${e?"类型":"Type"}</span>

        <div class="dropdown-container">
          <button type="button" class="btn-dropdown" id="btn-dropdown" aria-expanded="${this._menuOpen}">
            <span style="color: ${null!==this._typeValue?"var(--ink)":"var(--ink-3)"}">
              ${null!==this._typeValue?e?ty.find(e=>e.key===this._typeValue)?.labelZh:this._typeValue:e?"选择类型":"Select type"}
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="dropdown-chevron">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          ${this._menuOpen?`
            <div class="dropdown-menu">
              ${ty.map(t=>`
                <button
                  type="button"
                  class="dropdown-item ${t.key===this._typeValue?"selected":""}"
                  data-key="${t.key}"
                >
                  ${e?t.labelZh:t.labelEn}
                </button>
              `).join("")}
            </div>
          `:""}
        </div>
      </div>
    `,this.shadowRoot.querySelectorAll(".seg-btn").forEach(e=>{e.addEventListener("click",()=>{let t=parseInt(e.getAttribute("data-idx"),10);this.setSeg(t)})}),this.shadowRoot.querySelectorAll(".scrub-handle").forEach(e=>{let t=e.getAttribute("data-field"),a=e.closest(".scrub-field"),o=parseInt(a?.getAttribute("data-min")||"0",10),r=parseInt(a?.getAttribute("data-max")||"999",10);e.addEventListener("pointerdown",a=>{e.setPointerCapture(a.pointerId);let n="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;this._dragState={x:a.clientX,val:n,fieldKey:t,min:o,max:r}}),e.addEventListener("pointermove",e=>{if(!this._dragState)return;let t=(e.clientX-this._dragState.x)/2,a=this._clamp(this._dragState.val+t,this._dragState.min,this._dragState.max);"width"===this._dragState.fieldKey?this._width=a:"height"===this._dragState.fieldKey?this._height=a:"radius"===this._dragState.fieldKey?this._radius=a:"opacity"===this._dragState.fieldKey&&(this._opacity=a),this.render()}),e.addEventListener("pointerup",()=>{this._dragState=null}),e.addEventListener("keydown",e=>{let a=e.shiftKey?10:1,n="width"===t?this._width:"height"===t?this._height:"radius"===t?this._radius:this._opacity;if("ArrowUp"===e.key||"ArrowRight"===e.key){e.preventDefault();let i=this._clamp(n+a,o,r);"width"===t?this._width=i:"height"===t?this._height=i:"radius"===t?this._radius=i:"opacity"===t&&(this._opacity=i),this.render()}else if("ArrowDown"===e.key||"ArrowLeft"===e.key){e.preventDefault();let i=this._clamp(n-a,o,r);"width"===t?this._width=i:"height"===t?this._height=i:"radius"===t?this._radius=i:"opacity"===t&&(this._opacity=i),this.render()}})}),this.shadowRoot.querySelectorAll(".scrub-input").forEach(e=>{let t=e.getAttribute("data-field"),a=e.closest(".scrub-field"),o=parseInt(a?.getAttribute("data-min")||"0",10),r=parseInt(a?.getAttribute("data-max")||"999",10);e.addEventListener("input",e=>{let a=Number(e.target.value.replace(/[^\d-]/g,""));if(!Number.isNaN(a)){let e=this._clamp(a,o,r);"width"===t?this._width=e:"height"===t?this._height=e:"radius"===t?this._radius=e:"opacity"===t&&(this._opacity=e)}}),e.addEventListener("blur",()=>{this.render()})}),this.shadowRoot.querySelector("#btn-dropdown")?.addEventListener("click",()=>this.toggleMenu()),this.shadowRoot.querySelectorAll(".dropdown-item").forEach(e=>{e.addEventListener("click",()=>{let t=e.getAttribute("data-key");t&&this.setTypeValue(t)})})}}"u">typeof customElements&&!customElements.get("nai-fine-tune-card")&&customElements.define("nai-fine-tune-card",tk),e.s([],76170),e.i(76170),e.i(29218),e.i(43516),e.i(54143),e.s(["ICONS",0,h,"NaiAgentInbox",0,ev,"NaiAgentTeams",0,V,"NaiApprovalCard",0,E,"NaiArtifactSandbox",0,eO,"NaiAttachmentQueue",0,P,"NaiAudioOrb",0,te,"NaiBaseElement",0,s,"NaiChat",0,Z,"NaiCheckpointTimeline",0,eM,"NaiClarificationCard",0,ee,"NaiCodeBlock",0,I,"NaiContextCards",0,es,"NaiContextSpillover",0,el,"NaiContextWindow",0,er,"NaiCordisPluginTree",0,eR,"NaiDiffTable",0,eK,"NaiFilterTable",0,e4,"NaiFineTuneCard",0,tk,"NaiHookPipeline",0,ek,"NaiInsightCards",0,tl,"NaiJobScheduler",0,eP,"NaiLayerCard",0,tu,"NaiLoadingState",0,p,"NaiLspDiagnostics",0,eT,"NaiMcpServers",0,eF,"NaiMemoryInspector",0,ei,"NaiMessageBranches",0,ea,"NaiModelArena",0,to,"NaiPermissionPresetCard",0,ej,"NaiPromptBar",0,C,"NaiRecommendationCard",0,tp,"NaiRecordsTable",0,eQ,"NaiSandboxManager",0,eB,"NaiSearch",0,tb,"NaiSelectionActions",0,e6,"NaiSensitiveInput",0,tf,"NaiSessionTelemetry",0,e_,"NaiSidebarNav",0,tv,"NaiStreamingText",0,w,"NaiSubagentTree",0,F,"NaiTaskRows",0,K,"NaiThinking",0,v,"NaiToolChips",0,Q,"NaiTurnLifecycle",0,ep,"NaiWorkflowRun",0,ez,"getGlobalLang",0,o,"onLangChange",0,n,"resolveLang",0,i,"setGlobalLang",0,r],74312)}]);