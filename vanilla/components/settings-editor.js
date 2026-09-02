import { NaiBaseElement } from "../core/base-element.js";

/* ─────────────────────────────────────────────────────────
 * SETTINGS EDITOR — revisioned configuration namespaces
 * (vanilla custom element). Save captures the pinned revision
 * and editable draft. Conflicts preserve the draft; only an
 * explicit discard/refetch accepts remote state.
 * ───────────────────────────────────────────────────────── */

const NAMESPACE = "llm";
const BASE_DOC = { defaultRoute: "deepseek/reasoner", temperature: 0.7, maxTokens: 8192 };
const EXTERNAL_DOC = { defaultRoute: "deepseek/reasoner", temperature: 0.4, maxTokens: 8192 };
const INITIAL_DOC = JSON.stringify(BASE_DOC, null, 2);
const REMOTE_DOC = JSON.stringify(EXTERNAL_DOC, null, 2);
const CONFLICT_DRAFT = '{\n  "theme": "dark",\n  "maxTokens": 12288\n}';

const SAVE_MS = 650;
const HOLD_SAVED_MS = 1500;
const REFETCH_MS = 900;

export class NaiSettingsEditor extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang", "visual-case"];
  }

  constructor() {
    super();
    this._revision = 7;
    this._saved = INITIAL_DOC;
    this._draft = INITIAL_DOC;
    this._phase = "edit"; // edit | saving | saved | conflict | refetching
    this._attempt = null;
    this._nextSaveConflicts = false;
    this._remoteRevision = null;
    this._transitionVersion = 0;
  }

  onMount() {
    const visualCase = this.getAttribute("visual-case");
    if (visualCase === "conflict") {
      this._revision = 8;
      this._draft = CONFLICT_DRAFT;
      this._phase = "conflict";
      this._nextSaveConflicts = true;
      this._remoteRevision = 9;
    } else if (visualCase === "refetched") {
      this._revision = 9;
      this._saved = REMOTE_DOC;
      this._draft = REMOTE_DOC;
    }
  }

  _statusText() {
    const zh = this.isZh;
    if (this._phase === "saving") return zh ? "保存中…" : "Saving…";
    if (this._phase === "saved") return zh ? `已保存 revision ${this._revision}` : `Saved revision ${this._revision}`;
    if (this._phase === "conflict") return zh ? "外部已修改" : "Edited elsewhere";
    if (this._phase === "refetching") return zh ? "正在重新读取…" : "Refetching…";
    if (this._draft === this._saved) return zh ? "已同步" : "In sync";
    return zh ? "编辑中" : "Editing";
  }

  _syncTextarea() {
    const textarea = this.shadowRoot?.querySelector(".editor-area");
    if (!textarea) return;
    if (textarea.value !== this._draft) textarea.value = this._draft;
    textarea.readOnly = this._phase !== "edit";
  }

  _syncDraftControls() {
    this._syncTextarea();
    const save = this.shadowRoot?.querySelector(".save-btn");
    const disabled = this._phase !== "edit" || this._draft === this._saved;
    if (save && save.disabled !== disabled) save.disabled = disabled;
  }

  _syncView() {
    const zh = this.isZh;
    const conflictLike = this._phase === "conflict" || this._phase === "refetching";
    const tone =
      this._phase === "conflict" ? "bg-orange-tint text-orange"
      : this._phase === "saved" ? "bg-green-tint text-green"
      : "bg-field text-ink-2";

    const description = this.shadowRoot?.querySelector(".namespace-description");
    if (description) {
      const text = zh
        ? "配置命名空间 · 乐观并发"
        : "Configuration namespace · optimistic concurrency";
      if (description.textContent !== text) description.textContent = text;
    }
    const revision = this.shadowRoot?.querySelector(".revision-chip");
    const revisionText = `revision ${this._revision}`;
    if (revision && revision.textContent?.trim() !== revisionText) {
      revision.textContent = revisionText;
    }

    const textarea = this.shadowRoot?.querySelector(".editor-area");
    if (textarea) {
      const label = zh ? "设置 JSON" : "Settings JSON";
      if (textarea.getAttribute("aria-label") !== label) {
        textarea.setAttribute("aria-label", label);
      }
      const className = `editor-area w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none transition-colors duration-200 ${
        conflictLike
          ? "border-orange/50 bg-orange-tint/25 text-ink-2"
          : "border-line bg-inset text-ink focus:border-accent focus:bg-surface"
      }`;
      if (textarea.className !== className) textarea.className = className;
    }

    const footer = this.shadowRoot?.querySelector(".editor-footer");
    let alert = this.shadowRoot?.querySelector('[role="alert"]');
    if (this._phase === "conflict") {
      if (!alert && footer) {
        const template = document.createElement("template");
        template.innerHTML = `
          <div role="alert" class="mt-2 flex items-center justify-between rounded-control border border-orange/35 bg-orange-tint px-3 py-2"
            style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
            <span class="conflict-message text-[11.5px] font-medium text-ink"></span>
            <span class="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
          </div>`;
        footer.before(template.content.firstElementChild);
        alert = this.shadowRoot?.querySelector('[role="alert"]');
      }
      const message = alert?.querySelector(".conflict-message");
      if (message) {
        message.textContent = zh
          ? "预期 revision 已过期 — 草稿仍保留"
          : "expectedRevision is stale — your draft is preserved";
      }
    } else {
      alert?.remove();
    }

    const actions = this.shadowRoot?.querySelector(".editor-actions");
    const save = this.shadowRoot?.querySelector(".save-btn");
    let refetch = this.shadowRoot?.querySelector(".refetch-btn");
    if (this._phase === "conflict") {
      if (!refetch && actions && save) {
        refetch = document.createElement("button");
        refetch.type = "button";
        refetch.className = "refetch-btn rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer";
        refetch.addEventListener("click", () => this._discardAndRefetch());
        actions.insertBefore(refetch, save);
      }
      if (refetch) {
        refetch.setAttribute("aria-label", zh ? "放弃修改并重新读取" : "Discard changes and refetch");
        refetch.textContent = zh ? "放弃修改并刷新" : "Discard & refetch";
      }
    } else {
      refetch?.remove();
    }

    if (save) {
      const label = zh ? "保存 revision" : "Save revision";
      const text = zh ? "保存" : "Save";
      if (save.getAttribute("aria-label") !== label) {
        save.setAttribute("aria-label", label);
      }
      if (save.textContent !== text) save.textContent = text;
    }

    const status = this.shadowRoot?.querySelector(".status-chip");
    if (status) {
      status.className = `status-chip flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-[10.5px] font-medium ${tone}`;
      status.replaceChildren();
      if (this._phase === "saving" || this._phase === "refetching") {
        const spinner = document.createElement("span");
        spinner.className = "size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2";
        spinner.style.animation = "spin 700ms linear infinite";
        status.appendChild(spinner);
      }
      status.append(this._statusText());
    }

    this._syncDraftControls();
  }

  _save() {
    if (this._phase !== "edit" || this._draft === this._saved) return;
    this._attempt = {
      draft: this._draft,
      expectedRevision: this._revision,
    };
    this._phase = "saving";
    this.render();

    const version = ++this._transitionVersion;
    this.registerTimeout(() => {
      if (version !== this._transitionVersion) return;
      if (this._nextSaveConflicts) {
        this._remoteRevision = this._attempt.expectedRevision + 1;
        this._phase = "conflict";
        this.render();
        return;
      }

      this._saved = this._attempt.draft;
      this._draft = this._attempt.draft;
      this._revision = this._attempt.expectedRevision + 1;
      this._nextSaveConflicts = true;
      this._attempt = null;
      this._phase = "saved";
      this.render();

      this.registerTimeout(() => {
        if (version !== this._transitionVersion || this._phase !== "saved") return;
        this._phase = "edit";
        this.render();
      }, HOLD_SAVED_MS);
    }, SAVE_MS);
  }

  _discardAndRefetch() {
    if (this._phase !== "conflict") return;
    const acceptedRevision = this._remoteRevision ?? this._revision + 1;
    this._phase = "refetching";
    this.render();

    const version = ++this._transitionVersion;
    this.registerTimeout(() => {
      if (version !== this._transitionVersion) return;
      this._revision = acceptedRevision;
      this._saved = REMOTE_DOC;
      this._draft = REMOTE_DOC;
      this._attempt = null;
      this._remoteRevision = null;
      this._nextSaveConflicts = false;
      this._phase = "edit";
      this.render();
    }, REFETCH_MS);
  }

  render() {
    if (this.shadowRoot?.querySelector(".max-w-lg.rounded-card")) {
      this._syncView();
      return;
    }

    const zh = this.isZh;
    const conflictLike = this._phase === "conflict" || this._phase === "refetching";
    const tone =
      this._phase === "conflict" ? "bg-orange-tint text-orange"
      : this._phase === "saved" ? "bg-green-tint text-green"
      : "bg-field text-ink-2";

    this.setHtml(`
      <div class="w-full max-w-lg self-start overflow-hidden rounded-card bg-surface shadow-card">
        <div class="flex items-center justify-between border-b border-line bg-inset px-4 py-3">
          <div class="flex items-center gap-2">
            <span class="flex size-6 items-center justify-center rounded-control bg-accent-tint text-accent-ink">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
            <div>
              <h3 class="font-mono text-[13px] font-semibold text-ink">${NAMESPACE}</h3>
              <p class="namespace-description text-[11px] text-ink-3">${zh ? "配置命名空间 · 乐观并发" : "Configuration namespace · optimistic concurrency"}</p>
            </div>
          </div>
          <span class="revision-chip rounded-chip border border-line bg-surface px-2 py-0.5 font-mono text-[10px] tabular-nums text-ink-3" style="transform: translateZ(0px);">
            revision ${this._revision}
          </span>
        </div>

        <div class="p-3">
          <textarea spellcheck="false" rows="7" style="appearance: none; transform: translateZ(0px);"
            aria-label="${zh ? "设置 JSON" : "Settings JSON"}"
            class="editor-area w-full resize-none rounded-control border px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] outline-none transition-colors duration-200 ${
              conflictLike
                ? "border-orange/50 bg-orange-tint/25 text-ink-2"
                : "border-line bg-inset text-ink focus:border-accent focus:bg-surface"
            }"></textarea>

          ${this._phase === "conflict" ? `
            <div role="alert" class="mt-2 flex items-center justify-between rounded-control border border-orange/35 bg-orange-tint px-3 py-2"
              style="animation: fade-up 300ms cubic-bezier(0.23,1,0.32,1) both;">
              <span class="conflict-message text-[11.5px] font-medium text-ink">
                ${zh ? "预期 revision 已过期 — 草稿仍保留" : "expectedRevision is stale — your draft is preserved"}
              </span>
              <span class="font-mono text-[10px] text-orange">SETTINGS_CONFLICT</span>
            </div>
          ` : ""}

          <div class="editor-footer mt-2.5 flex items-center justify-between">
            <span class="status-chip flex items-center gap-1.5 rounded-chip px-2 py-0.5 text-[10.5px] font-medium ${tone}">
              ${this._phase === "saving" || this._phase === "refetching" ? `
                <span class="size-3 rounded-full border-[1.5px] border-line-strong border-t-ink-2" style="animation: spin 700ms linear infinite;"></span>
              ` : ""}
              ${this._statusText()}
            </span>
            <div class="editor-actions flex items-center gap-2">
              ${this._phase === "conflict" ? `
                <button type="button" aria-label="${zh ? "放弃修改并重新读取" : "Discard changes and refetch"}"
                  class="refetch-btn rounded-control border border-line-strong bg-surface px-2.5 py-1 text-[11px] font-medium text-ink shadow-btn transition-colors hover:bg-hover cursor-pointer">
                  ${zh ? "放弃修改并刷新" : "Discard & refetch"}
                </button>
              ` : ""}
              <button type="button" aria-label="${zh ? "保存 revision" : "Save revision"}"
                class="save-btn rounded-control bg-accent px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 cursor-pointer">
                ${zh ? "保存" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `);

    this.shadowRoot?.querySelector(".editor-area")?.addEventListener("input", (event) => {
      this._draft = event.target.value;
      this._syncDraftControls();
    });
    this.shadowRoot?.querySelector(".save-btn")?.addEventListener("click", () => this._save());
    this.shadowRoot?.querySelector(".refetch-btn")?.addEventListener("click", () => this._discardAndRefetch());
    this._syncView();
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-settings-editor")) {
  customElements.define("nai-settings-editor", NaiSettingsEditor);
}
