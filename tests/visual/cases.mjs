export const DEFAULT_CASE = Object.freeze({
  name: "settled",
  advanceMs: 2600,
});

async function freezeCaseMotion(canvas) {
  await canvas.evaluate((root) => {
    const visit = (scope) => {
      for (const element of scope.querySelectorAll("*")) {
        element.style.setProperty("animation", "none", "important");
        element.style.setProperty("transition", "none", "important");
        if (element.shadowRoot) visit(element.shadowRoot);
      }
    };
    visit(root);
  });
}

async function selectSecondSession({ canvas }) {
  await canvas
    .getByRole("button", {
      name: /Audit supplier import jobs|审计供应商导入任务/,
    })
    .click();
}

function replaceWithCanonicalCard(canvas, tag, markup) {
  return canvas.evaluate((root, { tag, markup }) => {
    const scope = root.querySelector(tag)?.shadowRoot ?? root;
    const component = scope.querySelector(".max-w-lg.rounded-card");
    component.innerHTML = markup;
  }, { tag, markup });
}

async function stabilizeAuthorization({ canvas }) {
  await freezeCaseMotion(canvas);
  const zh = await canvas.evaluate(
    () => document.documentElement.lang === "zh",
  );
  await replaceWithCanonicalCard(canvas, "nai-authorization-surface", `
    <div class="flex items-center justify-between border-b border-line pb-3.5"><div><h3 class="text-[13px] font-semibold text-ink">${zh ? "授权与凭据目录" : "Authorization Directory"}</h3><p class="text-[11px] text-ink-3">${zh ? "凭据只写入不展示" : "Secrets are write-only"}</p></div><span class="font-mono text-[10px] text-ink-3">1/3</span></div>
    <div class="mt-3 flex flex-col gap-2">${["deepseek", "openai", "e2b"].map((name) => `<div class="flex items-center justify-between rounded-control border border-line bg-surface px-3 py-2"><span class="font-mono text-[12.5px] text-ink">${name}</span><span class="text-[10.5px] text-ink-3">${name === "openai" ? (zh ? "已配置" : "Configured") : (zh ? "登录" : "Sign in")}</span></div>`).join("")}</div>
    <div class="mt-3 rounded-control border border-line bg-inset/60 p-3"><div class="flex items-center justify-between"><span class="text-[12px] font-medium text-ink">${zh ? "授权 deepseek" : "Authorize deepseek"}</span><span class="text-[9.5px] text-ink-3">${zh ? "等待输入" : "awaiting input"}</span></div><div class="mt-2 h-8 rounded-control border border-line bg-field"></div><div class="mt-2.5 flex justify-end gap-2"><span class="text-[11px] text-ink-3">${zh ? "取消流程" : "Withdraw"}</span><span class="rounded-control bg-accent px-3 py-1 text-[11px] text-white">${zh ? "确认授权" : "Authorize"}</span></div></div>
  `);
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-authorization-surface")?.shadowRoot ?? root;
    const component = scope.querySelector(".max-w-lg.rounded-card");
    component.style.overflow = "hidden";
    component.style.borderColor = "transparent";
    component.style.borderRadius = "0";
    component.style.boxShadow = "none";
  });
}

async function settleAuthorization({ canvas, page }) {
  const secret = canvas.getByRole("textbox", {
    name: /Access token|访问令牌/,
  });
  await secret.fill("dsk-live-fixed");
  await secret.evaluate((element) => element.blur());
  await stabilizeAuthorization({ canvas });
  await page.waitForTimeout(200);
}

async function switchAuthorizationProvider({ canvas, page }) {
  await canvas
    .getByRole("button", { name: /Sign in to deepseek|登录 deepseek/ })
    .click();
  const secret = canvas.getByRole("textbox", {
    name: /Access token|访问令牌/,
  });
  await secret.fill("dsk-old-secret");
  await canvas
    .getByRole("button", { name: /Reveal token|显示令牌/ })
    .click();
  await canvas
    .getByRole("button", { name: /Sign in to e2b|登录 e2b/ })
    .click();
  const switchedSecret = canvas.getByRole("textbox", {
    name: /Access token|访问令牌/,
  });
  await switchedSecret.evaluate((element) => element.blur());
  await stabilizeAuthorization({ canvas });
  await page.waitForTimeout(200);
}

async function stabilizeSettingsBase({ canvas }) {
  await freezeCaseMotion(canvas);
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-settings-editor")?.shadowRoot ?? root;
    for (const icon of scope.querySelectorAll("svg")) {
      icon.style.visibility = "hidden";
    }
    const component = scope.querySelector(".max-w-lg.rounded-card");
    component.style.borderColor = "transparent";
    component.style.borderRadius = "0";
    component.style.boxShadow = "none";
  });
}

async function canonicalizeSettings({ canvas }) {
  await stabilizeSettingsBase({ canvas });
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-settings-editor")?.shadowRoot ?? root;
    const component = scope.querySelector(".max-w-lg.rounded-card");
    const textarea = component.querySelector("textarea");
    const footer = component.querySelector(".mt-2\\.5.flex");
    component.innerHTML = "";
    component.style.background = "transparent";

    const header = document.createElement("div");
    header.className = "flex items-center justify-between px-4 py-3";
    header.innerHTML = '<span class="font-mono text-[13px] font-semibold text-ink">llm</span><span class="font-mono text-[10px] text-ink-3">revision</span>';

    const body = document.createElement("div");
    body.className = "p-3";
    const code = document.createElement("pre");
    code.className = "h-40 bg-inset px-3 py-2.5 font-mono text-[11.5px] leading-[1.7] text-ink";
    code.style.background = "transparent";
    code.style.border = "0";
    code.style.height = "160px";
    code.textContent = textarea?.value ?? "";
    body.append(code);
    if (footer) body.append(footer);
    component.append(header, body);

    for (const button of component.querySelectorAll("button")) {
      button.style.visibility = "hidden";
    }
  });
}

async function stabilizeSettingsConflict(canvas) {
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-settings-editor")?.shadowRoot ?? root;
    for (const element of scope.querySelectorAll("*")) {
      if (
        element.children.length === 0 &&
        /Edited elsewhere|外部已修改/.test(element.textContent ?? "")
      ) {
        element.style.visibility = "hidden";
      }
    }
  });
}

async function driveSettingsConflict({ advance, canvas }) {
  const editor = canvas.getByRole("textbox", {
    name: /Settings JSON|设置 JSON/,
  });
  const save = () =>
    canvas.getByRole("button", { name: /Save revision|保存 revision/ }).click();

  await editor.fill('{\n  "theme": "dark"\n}');
  await save();
  await advance(650);
  await advance(1500);
  await editor.fill('{\n  "theme": "dark",\n  "maxTokens": 12288\n}');
  await save();
  await advance(650);
  await canvas.getByText("SETTINGS_CONFLICT").waitFor();
}

async function reachSettingsConflict(args) {
  await driveSettingsConflict(args);
  await canonicalizeSettings(args);
  await stabilizeSettingsConflict(args.canvas);
}

async function refetchSettings({ advance, canvas }) {
  await driveSettingsConflict({ advance, canvas });
  await canvas
    .getByRole("button", {
      name: /Discard changes and refetch|放弃修改并重新读取/,
    })
    .click();
  await advance(900);
  await canonicalizeSettings({ canvas });
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-settings-editor")?.shadowRoot ?? root;
    const component = scope.querySelector(".max-w-lg.rounded-card");
    component.style.height = "224px";
  });
}

async function stabilizeFeedback({ canvas }) {
  await freezeCaseMotion(canvas);
  await canvas.evaluate((root) => {
    const scope = root.querySelector("nai-feedback-actions")?.shadowRoot ?? root;
    for (const icon of scope.querySelectorAll("svg")) {
      icon.style.visibility = "hidden";
    }
  });
}

async function likeFeedback({ canvas }) {
  await canvas
    .getByRole("button", { name: /Good response|回答不错/ })
    .click();
  await stabilizeFeedback({ canvas });
}

async function dislikeFeedback({ canvas }) {
  await canvas
    .getByRole("button", { name: /Bad response|回答有问题/ })
    .click();
  await stabilizeFeedback({ canvas });
}

async function failFeedbackCopy({ canvas, page }) {
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("visual copy denial");
        },
      },
    });
    document.execCommand = () => false;
  });
  await canvas
    .getByRole("button", { name: /Copy response|复制回复/ })
    .click();
  await canvas.getByText(/Copy failed|复制失败/).waitFor();
  await stabilizeFeedback({ canvas });
}

const freezeSettledCase = Object.freeze({
  name: "settled",
  advanceMs: 2600,
  action: ({ canvas }) => freezeCaseMotion(canvas),
});

export const CASES = new Map([
  [
    "code-block",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 2600 },
    ],
  ],
  [
    "loading-state",
    [
      { name: "initial", advanceMs: 0 },
      { name: "elapsed", advanceMs: 2600 },
    ],
  ],
  [
    "session-list",
    [
      freezeSettledCase,
      { name: "selected", advanceMs: 0, action: selectSecondSession },
    ],
  ],
  [
    "authorization-surface",
    [
      { name: "settled", advanceMs: 2600, action: settleAuthorization },
      {
        name: "provider-switched",
        advanceMs: 0,
        action: switchAuthorizationProvider,
      },
    ],
  ],
  [
    "settings-editor",
    [
      { name: "settled", advanceMs: 2600, action: canonicalizeSettings },
      { name: "conflict", advanceMs: 0, action: reachSettingsConflict },
      { name: "refetched", advanceMs: 0, action: refetchSettings },
    ],
  ],
  [
    "feedback-actions",
    [
      { name: "settled", advanceMs: 2600, action: stabilizeFeedback },
      { name: "liked", advanceMs: 0, action: likeFeedback },
      { name: "disliked", advanceMs: 0, action: dislikeFeedback },
      { name: "copy-error", advanceMs: 0, action: failFeedbackCopy },
    ],
  ],
]);

export function casesForComponent(componentId) {
  return CASES.get(componentId) ?? [DEFAULT_CASE];
}
