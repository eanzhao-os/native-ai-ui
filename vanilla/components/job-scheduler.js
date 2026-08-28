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

    this.shadowRoot.innerHTML = `
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
                <h3 class="title">${zh ? "持久化任务与 Cron 调度" : "Durable Job Scheduler"}</h3>
                <span class="harness-chip">Harness.Jobs</span>
              </div>
              <p class="sub-text">${zh ? "后台持久化 Cron 触发器与执行队列" : "Durable background cron triggers & queue"}</p>
            </div>
          </div>

          <span class="count-text">${activeCount} ${zh ? "个活跃 Cron" : "Active Crons"}</span>
        </div>

        <div class="jobs-list">
          ${this._jobs
            .map((job) => {
              const isTriggering = this._triggeringId === job.id;
              const badgeClass =
                job.lastStatusEn === "Success"
                  ? "badge-success"
                  : job.lastStatusEn === "Failed"
                  ? "badge-failed"
                  : "badge-running";
              const statusLabel = zh ? job.lastStatusZh : job.lastStatusEn;

              return `
              <div class="job-card ${job.enabled ? "job-enabled" : "job-disabled"}">
                <div class="job-left">
                  <button
                    type="button"
                    class="toggle-btn ${job.enabled ? "toggle-active" : ""}"
                    data-toggle="${job.id}"
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
                  <div class="job-info">
                    <div class="job-title-row">
                      <span class="job-name">${zh ? job.nameZh : job.nameEn}</span>
                      <span class="cron-chip">${job.cron}</span>
                    </div>
                    <span class="next-run">
                      ${zh ? "下次运行: " : "Next run: "}
                      ${zh ? job.nextRunZh : job.nextRunEn}
                    </span>
                  </div>
                </div>

                <div class="job-right">
                  <span class="status-badge ${badgeClass}">${statusLabel}</span>
                  <button
                    type="button"
                    class="btn-trigger"
                    data-trigger="${job.id}"
                    ${isTriggering || !job.enabled ? "disabled" : ""}
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
    `;

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
