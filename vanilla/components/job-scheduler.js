import { NaiBaseElement } from "../core/base-element.js";

const INITIAL_JOBS = [
  {
    id: "job-1",
    nameEn: "Vector Embeddings Sync & Reindex",
    nameZh: "向量嵌入同步与全量重索引",
    cron: "0 */4 * * *",
    nextRunEn: "In 1h 24m",
    nextRunZh: "1小时24分后",
    lastStatusEn: "Success",
    lastStatusZh: "执行成功",
    enabled: true,
  },
  {
    id: "job-2",
    nameEn: "Durable SQLite Session Snapshot",
    nameZh: "SQLite 会话不可变事实快照",
    cron: "0 * * * *",
    nextRunEn: "In 18m",
    nextRunZh: "18分钟后",
    lastStatusEn: "Success",
    lastStatusZh: "执行成功",
    enabled: true,
  },
  {
    id: "job-3",
    nameEn: "Telemetry Batch Export & Rollup",
    nameZh: "遥测遥控日志批量聚合导出",
    cron: "0 0 * * *",
    nextRunEn: "At 00:00 UTC",
    nextRunZh: "今天 00:00 UTC",
    lastStatusEn: "Running",
    lastStatusZh: "执行中",
    enabled: true,
  },
];

export class NaiJobScheduler extends NaiBaseElement {
  static get observedAttributes() {
    return ["lang"];
  }

  constructor() {
    super();
    this._jobs = JSON.parse(JSON.stringify(INITIAL_JOBS));
    this._triggeringId = null;
  }

  handleToggle(id) {
    this._jobs = this._jobs.map((j) =>
      j.id === id ? { ...j, enabled: !j.enabled } : j
    );
    this.render();
  }

  handleTriggerNow(id) {
    this._triggeringId = id;
    this.render();

    this.registerTimeout(() => {
      this._triggeringId = null;
      this.render();
    }, 1200);
  }

  render() {
    const zh = this.isZh;
    const activeCount = this._jobs.filter((j) => j.enabled).length;

    const extraCss = `
      .bg-inset\\/40 { background-color: color-mix(in srgb, var(--inset, #f7f8f9) 40%, transparent); }
      .bg-hover\\/20 { background-color: color-mix(in srgb, var(--hover, #f4f5f6) 20%, transparent); }
      .bg-page\\/40 { background-color: color-mix(in srgb, var(--page, #fafafb) 40%, transparent); }
      .border-line\\/60 { border-color: color-mix(in srgb, var(--line, #ecedef) 60%, transparent); }
      .size-3\\.5 { width: 14px; height: 14px; }
      .size-6 { width: 24px; height: 24px; }
      .py-0\\.2 { padding-top: 1px; padding-bottom: 1px; }
    `;

    this.setHtml(`
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
                  ${zh ? "持久化任务与 Cron 调度" : "Durable Job Scheduler"}
                </h3>
                <span class="rounded-chip border border-line bg-inset px-1.5 py-0.2 font-mono text-[9.5px] text-ink-3">
                  Harness.Jobs
                </span>
              </div>
              <p class="text-[11px] text-ink-3">
                ${zh ? "后台持久化 Cron 触发器与执行队列" : "Durable background cron triggers & queue"}
              </p>
            </div>
          </div>

          <span class="font-mono text-[11px] text-ink-2">
            ${activeCount} ${zh ? "个活跃 Cron" : "Active Crons"}
          </span>
        </div>

        
        <div class="mt-3.5 flex flex-col gap-2">
          ${this._jobs
            .map((job) => {
              const isTriggering = this._triggeringId === job.id;
              const statusStyle =
                job.lastStatusEn === "Success"
                  ? "bg-green-tint text-green"
                  : job.lastStatusEn === "Failed"
                  ? "bg-red-tint text-red"
                  : "bg-accent-tint text-accent-ink";
              const statusLabel = zh ? job.lastStatusZh : job.lastStatusEn;

              return `
              <div
                class="flex items-center justify-between rounded-control border p-3 transition-all ${
                  job.enabled
                    ? "border-line bg-inset/40 hover:border-line-strong hover:bg-hover/20"
                    : "border-line/60 bg-page/40 opacity-60"
                }"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    data-toggle="${job.id}"
                    class="toggle-btn size-3.5 rounded-full border transition-colors cursor-pointer shrink-0 ${
                      job.enabled ? "border-accent bg-accent" : "border-line bg-surface"
                    }"
                    title="${
                      job.enabled
                        ? zh
                          ? "禁用定时任务"
                          : "Disable cron"
                        : zh
                        ? "启用定时任务"
                        : "Enable cron"
                    }"
                  ></button>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="text-[12px] font-medium text-ink truncate">
                        ${zh ? job.nameZh : job.nameEn}
                      </span>
                      <span class="rounded-chip bg-field px-1.5 py-0.2 font-mono text-[9.5px] text-ink-2">
                        ${job.cron}
                      </span>
                    </div>
                    <span class="text-[10.5px] text-ink-3">
                      ${zh ? "下次运行: " : "Next run: "}
                      ${zh ? job.nextRunZh : job.nextRunEn}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0 pl-2">
                  <span
                    class="rounded-chip px-1.5 py-0.2 font-mono text-[9.5px] font-medium ${statusStyle}"
                  >
                    ${statusLabel}
                  </span>

                  <button
                    type="button"
                    data-trigger="${job.id}"
                    ${isTriggering || !job.enabled ? "disabled" : ""}
                    class="btn-trigger rounded-control border border-line bg-surface px-2 py-0.5 text-[10.5px] font-medium text-ink-2 hover:bg-hover hover:text-ink disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    ${
                      isTriggering
                        ? zh
                          ? "触发中..."
                          : "Running..."
                        : zh
                        ? "立即触发"
                        : "Trigger"
                    }
                  </button>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `, extraCss);

    this.shadowRoot.querySelectorAll("[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-toggle");
        this.handleToggle(id);
      });
    });

    this.shadowRoot.querySelectorAll("[data-trigger]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-trigger");
        this.handleTriggerNow(id);
      });
    });
  }
}

if (typeof customElements !== "undefined" && !customElements.get("nai-job-scheduler")) {
  customElements.define("nai-job-scheduler", NaiJobScheduler);
}
