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

/* TASK 5A VISUAL ACTIONS START */
async function expandSettledThinking({ canvas }) {
  await canvas
    .getByRole("button", {
      name: /Thought for 4 seconds|已深度思考 4 秒/,
    })
    .click();
  await canvas
    .getByText(/Writing the scoop report|生成冰淇淋上架评估报告/)
    .waitFor();
}

async function waitForStreamingSettled({ advance, canvas }) {
  const sources = canvas.getByRole("button", {
    name: /10 sources|10 处引用源/,
  });
  const actions = sources.locator("..");
  let lastStyle = null;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    lastStyle = await actions.getAttribute("style");
    if (/opacity:\s*1(?:;|$)/.test(lastStyle ?? "")) {
      await canvas.getByText(/Follow-ups|猜您想问/).waitFor();
      return sources;
    }
    await advance(100);
  }
  throw new Error(
    `Streaming Text did not settle (actions style: ${lastStyle})`,
  );
}

async function settleStreaming(args) {
  await waitForStreamingSettled(args);
}

async function openStreamingSources(args) {
  const sources = await waitForStreamingSettled(args);
  await sources.click();
  await args.canvas.getByText("Scoop Data").waitFor();
}

async function preparePrompt({ canvas }) {
  const input = canvas.getByRole("textbox", {
    name: /Prompt|提示词输入框/,
  });
  await input.click();
  const label = await input.getAttribute("aria-label");
  const draft =
    label === "提示词输入框"
      ? "对比开心果周末销量"
      : "Compare pistachio weekends";
  await input.fill(draft);
  if ((await input.inputValue()) !== draft) {
    throw new Error("Prompt ready state did not retain the draft");
  }
}

async function submitPrompt(args) {
  const input = args.canvas.getByRole("textbox", {
    name: /Prompt|提示词输入框/,
  });
  await preparePrompt(args);
  await args.canvas.getByRole("button", { name: /Send|发送/ }).click();
  if ((await input.inputValue()) !== "") {
    throw new Error("Prompt submission did not clear the composer");
  }
}
/* TASK 5A VISUAL ACTIONS END */

/* TASK 5A VISUAL REGISTRATIONS START */
const TASK5A_CASES = [
  [
    "prompt-bar",
    [
      { name: "ready", advanceMs: 0, action: preparePrompt },
      { name: "submitted", advanceMs: 0, action: submitPrompt },
    ],
  ],
  [
    "streaming-text",
    [
      { name: "settled", advanceMs: 0, action: settleStreaming },
      { name: "sources-open", advanceMs: 0, action: openStreamingSources },
    ],
  ],
  [
    "thinking",
    [
      { name: "settled", advanceMs: 6000 },
      { name: "expanded", advanceMs: 6000, action: expandSettledThinking },
    ],
  ],
];
/* TASK 5A VISUAL REGISTRATIONS END */

/* TASK 4 VISUAL ACTIONS START */
async function selectSecondSession({ canvas }) {
  await canvas
    .getByRole("button", {
      name: /Audit supplier import jobs|审计供应商导入任务/,
    })
    .click();
}

async function settleAuthorization({ advance, canvas }) {
  await canvas
    .getByRole("button", { name: /Sign in to deepseek|登录 deepseek/ })
    .click();
  await canvas
    .getByRole("textbox", { name: /Access token|访问令牌/ })
    .fill("dsk-live-fixed");
  await canvas
    .getByRole("button", { name: /Authorize|确认授权/, exact: true })
    .click();
  await advance(900);
  await canvas
    .getByText(/Authorized — credential written to the vault|授权完成，凭据已写入保险箱/)
    .waitFor();
}

async function switchAuthorizationProvider({ canvas }) {
  await canvas
    .getByRole("button", { name: /Sign in to deepseek|登录 deepseek/ })
    .click();
  const secret = canvas.getByRole("textbox", { name: /Access token|访问令牌/ });
  await secret.fill("dsk-old-secret");
  await canvas
    .getByRole("button", { name: /Reveal token|显示令牌/ })
    .click();
  await canvas
    .getByRole("button", { name: /Sign in to e2b|登录 e2b/ })
    .click();

  await canvas.getByText(/Authorize e2b|授权 e2b/).waitFor();
  const switchedSecret = canvas.getByRole("textbox", {
    name: /Access token|访问令牌/,
  });
  if ((await switchedSecret.inputValue()) !== "") {
    throw new Error("Provider switch retained the previous secret");
  }
  if ((await switchedSecret.getAttribute("type")) !== "password") {
    throw new Error("Provider switch did not restore masking");
  }
  await canvas
    .getByRole("button", { name: /Reveal token|显示令牌/ })
    .waitFor();

  await canvas
    .getByRole("button", { name: /Withdraw|取消流程/ })
    .click();
  await canvas
    .getByRole("button", { name: /Sign in to e2b|登录 e2b/ })
    .click();
  await canvas.getByText(/Authorize e2b|授权 e2b/).waitFor();

  const restartedSecret = canvas.getByRole("textbox", {
    name: /Access token|访问令牌/,
  });
  if ((await restartedSecret.inputValue()) !== "") {
    throw new Error("Restarted provider flow retained a secret");
  }
  if ((await restartedSecret.getAttribute("type")) !== "password") {
    throw new Error("Restarted provider flow did not restore masking");
  }
}

async function driveSettingsConflict({ advance, canvas }) {
  const editor = canvas.getByRole("textbox", { name: /Settings JSON|设置 JSON/ });
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
}

async function refetchSettings({ advance, canvas }) {
  await driveSettingsConflict({ advance, canvas });
  await canvas
    .getByRole("button", {
      name: /Discard changes and refetch|放弃修改并重新读取/,
    })
    .click();
  await advance(900);
  await canvas.getByText(/In sync|已同步/).waitFor();
  await canvas.getByText("revision 9").waitFor();
  const value = await canvas
    .getByRole("textbox", { name: /Settings JSON|设置 JSON/ })
    .inputValue();
  if (!value.includes('"temperature": 0.4')) {
    throw new Error("Refetch did not replace the draft with remote settings");
  }
}

async function likeFeedback({ canvas }) {
  const button = canvas.getByRole("button", {
    name: /Good response|回答不错/,
  });
  await button.click();
  await canvas.getByText(/Marked helpful|已标记为有用/).waitFor();
  if ((await button.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Positive feedback did not become pressed");
  }
}

async function dislikeFeedback({ canvas }) {
  const button = canvas.getByRole("button", {
    name: /Bad response|回答有问题/,
  });
  await button.click();
  await canvas.getByText(/Marked unhelpful|已标记为有问题/).waitFor();
  if ((await button.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Negative feedback did not become pressed");
  }
}

async function failFeedbackCopy({ canvas, page }) {
  try {
    /* TASK 4 CLIPBOARD PAGE EVALUATE SETUP START */
    await page.evaluate(() => {
      globalThis.__naiTask4FeedbackCopyGlobals = {
        clipboard: Object.getOwnPropertyDescriptor(navigator, "clipboard"),
        execCommand: Object.getOwnPropertyDescriptor(document, "execCommand"),
      };
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async () => {
            throw new Error("visual copy denial");
          },
        },
      });
      Object.defineProperty(document, "execCommand", {
        configurable: true,
        value: () => false,
      });
    });
    /* TASK 4 CLIPBOARD PAGE EVALUATE SETUP END */

    await canvas
      .getByRole("button", { name: /Copy response|复制回复/ })
      .click();
    await canvas.getByText(/Copy failed|复制失败/).waitFor();
  } finally {
    /* TASK 4 CLIPBOARD PAGE EVALUATE RESTORE START */
    await page.evaluate(() => {
      const originals = globalThis.__naiTask4FeedbackCopyGlobals;
      if (!originals) return;
      const errors = [];
      try {
        if (originals.clipboard) {
          Object.defineProperty(navigator, "clipboard", originals.clipboard);
        } else {
          Reflect.deleteProperty(navigator, "clipboard");
        }
      } catch (error) {
        errors.push(error);
      }
      try {
        if (originals.execCommand) {
          Object.defineProperty(document, "execCommand", originals.execCommand);
        } else {
          Reflect.deleteProperty(document, "execCommand");
        }
      } catch (error) {
        errors.push(error);
      }
      Reflect.deleteProperty(globalThis, "__naiTask4FeedbackCopyGlobals");
      if (errors.length > 0) {
        throw new AggregateError(errors, "Could not restore copy-error globals");
      }
    });
    /* TASK 4 CLIPBOARD PAGE EVALUATE RESTORE END */
  }
}
/* TASK 4 VISUAL ACTIONS END */

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
  ...TASK5A_CASES,
  /* TASK 4 VISUAL REGISTRATIONS START */
  [
    "session-list",
    [
      { name: "settled", advanceMs: 2600 },
      { name: "selected", advanceMs: 0, action: selectSecondSession },
    ],
  ],
  [
    "authorization-surface",
    [
      { name: "settled", advanceMs: 0, action: settleAuthorization },
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
      { name: "settled", advanceMs: 0 },
      { name: "conflict", advanceMs: 0, action: reachSettingsConflict },
      { name: "refetched", advanceMs: 0, action: refetchSettings },
    ],
  ],
  [
    "feedback-actions",
    [
      { name: "settled", advanceMs: 0 },
      { name: "liked", advanceMs: 0, action: likeFeedback },
      { name: "disliked", advanceMs: 0, action: dislikeFeedback },
      { name: "copy-error", advanceMs: 0, action: failFeedbackCopy },
    ],
  ],
  /* TASK 4 VISUAL REGISTRATIONS END */
]);

export function casesForComponent(componentId) {
  return CASES.get(componentId) ?? [DEFAULT_CASE];
}
