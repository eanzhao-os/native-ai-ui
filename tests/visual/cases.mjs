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
async function waitForExpanded(control, failureMessage) {
  let actual = null;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    actual = await control.getAttribute("aria-expanded");
    if (actual === "true") return;
  }
  throw new Error(`${failureMessage} (aria-expanded=${actual})`);
}

async function expandSettledThinking({ canvas }) {
  const toggle = canvas.getByRole("button", {
    name: /Thought for 4 seconds|已深度思考 4 秒/,
  });
  await toggle.click();
  await waitForExpanded(toggle, "Thinking expanded state remained collapsed");
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
  await waitForExpanded(
    sources,
    "Streaming source drawer remained collapsed",
  );
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

/* TASK 6 VISUAL ACTIONS START */
async function waitForControlAttribute(control, attribute, expected, message) {
  let actual = null;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    actual = await control.getAttribute(attribute);
    if (actual === expected) return;
  }
  throw new Error(`${message} (${attribute}=${actual})`);
}

async function focusWithKeyboard({ canvas, page }, control, message) {
  await page.mouse.move(0, 0);
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(message);
  }
}

async function assertMinimumHitArea(control, label) {
  const box = await control.boundingBox();
  if (!box) throw new Error(`${label} is not visibly measurable`);
  if (box.width < 44 || box.height < 44) {
    throw new Error(
      `${label} hit area is ${box.width.toFixed(1)}×${box.height.toFixed(1)}; expected at least 44×44`,
    );
  }
}

async function assertButtonHitAreas(canvas, component) {
  const controls = await canvas.getByRole("button").all();
  for (let index = 0; index < controls.length; index += 1) {
    await assertMinimumHitArea(controls[index], `${component} button ${index + 1}`);
  }
}

async function assertChoiceLabelHitAreas(canvas, role, component) {
  const controls = await canvas.getByRole(role).all();
  for (let index = 0; index < controls.length; index += 1) {
    await assertMinimumHitArea(
      controls[index].locator(".."),
      `${component} ${role} ${index + 1}`,
    );
  }
}

async function assertApprovalHitAreas(canvas) {
  await assertButtonHitAreas(canvas, "Approval Card");
  await assertChoiceLabelHitAreas(canvas, "radio", "Approval Card");
  await assertChoiceLabelHitAreas(canvas, "checkbox", "Approval Card");
  const custom = approvalCustomInput(canvas);
  if ((await custom.count()) === 1) {
    await assertMinimumHitArea(custom.locator(".."), "Approval Card custom answer");
  }
}

async function assertClarificationHitAreas(canvas) {
  await assertButtonHitAreas(canvas, "Clarification Card");
  await assertChoiceLabelHitAreas(canvas, "radio", "Clarification Card");
  const custom = clarificationCustomInput(canvas);
  if ((await custom.count()) === 1) {
    await assertMinimumHitArea(custom, "Clarification Card custom input");
  }
}

async function openCompletedSubagent({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Web Researcher|网络检索子 Agent/,
  });
  await control.click();
  await waitForControlAttribute(
    control,
    "aria-expanded",
    "true",
    "Completed subagent trace remained collapsed",
  );
  const traceId = await control.getAttribute("aria-controls");
  if (!traceId) {
    throw new Error("Completed subagent disclosure has no controlled trace");
  }
  const trace = canvas.locator(`[id="${traceId}"]`);
  await trace.waitFor({ state: "visible" });
  await trace.getByText(/Execution Trace|执行追踪日志/).waitFor();
}

async function focusRunningSubagent(args) {
  const control = args.canvas.getByRole("button", {
    name: /Schema Architect|架构代码子 Agent/,
  });
  await focusWithKeyboard(
    args,
    control,
    "Running subagent did not receive keyboard-visible focus",
  );
}

async function verifyAgentHandoff({ canvas }) {
  await canvas.getByText(/2\/4 tasks|2\/4 任务/).waitFor();
  await canvas.getByText(/Add backoff unit tests|补退避策略单元测试/).waitFor();
}

async function verifyAgentCompletion({ canvas }) {
  await canvas.getByText(/4\/4 tasks|4\/4 任务/).waitFor();
  await canvas.getByText(/Review & sign off|评审并签收/).waitFor();
}

function taskRow(canvas, name) {
  return canvas.getByRole("button", { name });
}

async function openTaskDetails({ canvas }) {
  const control = taskRow(
    canvas,
    /Build reorder task list|生成自动补货计划清单/,
  );
  await control.click();
  await waitForControlAttribute(
    control,
    "aria-expanded",
    "true",
    "Task details remained collapsed",
  );
  await canvas.getByText(/Reading POS export|读取 POS 导出数据/).waitFor();
}

async function verifyFailedTask({ canvas }) {
  const control = taskRow(
    canvas,
    /Draft supplier emails|起草供应商跟进邮件/,
  );
  await control.getByText(/Failed|失败重试中/).waitFor();
}

async function verifyCompletedTask({ canvas }) {
  const control = taskRow(
    canvas,
    /Draft supplier emails|起草供应商跟进邮件/,
  );
  await control.getByText(/Completed|已完成/).waitFor();
}

async function focusTaskRow(args) {
  const control = taskRow(
    args.canvas,
    /Build reorder task list|生成自动补货计划清单/,
  );
  await focusWithKeyboard(
    args,
    control,
    "Task row did not receive keyboard-visible focus",
  );
}

function toolRunToggle(canvas) {
  return canvas.getByRole("button", {
    name: /4 tool calls, 2 messages|4 次工具调用，2 条消息/,
  });
}

function toolWriteRow(canvas) {
  return canvas.getByRole("button", { name: /Write 204 lines|写入 204 行/ });
}

async function verifySettledTools({ canvas }) {
  await canvas.getByText(/^\+2 more$|^\+ 还有 2 项$/).waitFor();
  await assertButtonHitAreas(canvas, "Tool Chips");
}

async function openToolDetail({ canvas }) {
  const control = toolWriteRow(canvas);
  await control.click();
  await waitForControlAttribute(
    control,
    "aria-expanded",
    "true",
    "Tool detail remained collapsed",
  );
  await canvas.getByText(/const windows = slots\.filter/).waitFor();
  await assertButtonHitAreas(canvas, "Tool Chips");
}

async function collapseToolRun({ canvas }) {
  const control = toolRunToggle(canvas);
  await control.click();
  await waitForControlAttribute(
    control,
    "aria-expanded",
    "false",
    "Tool run remained expanded",
  );
  await assertButtonHitAreas(canvas, "Tool Chips");
}

async function focusToolRow(args) {
  await focusWithKeyboard(
    args,
    toolWriteRow(args.canvas),
    "Tool row did not receive keyboard-visible focus",
  );
  await assertButtonHitAreas(args.canvas, "Tool Chips");
}

function approvalCustomInput(canvas) {
  return canvas.getByRole("textbox", { name: /Custom answer|自定义答案/ });
}

async function fillApprovalCustom(canvas) {
  const input = approvalCustomInput(canvas);
  const label = await input.getAttribute("aria-label");
  const value = label === "自定义答案" ? "四款季节限定口味" : "Four seasonal flavors";
  await input.fill(value);
  if ((await input.inputValue()) !== value) {
    throw new Error("Approval custom answer did not retain its value");
  }
}

async function captureApprovalCustom({ canvas }) {
  await fillApprovalCustom(canvas);
  const previous = canvas.getByRole("button", { name: /Previous|上一题/ });
  if (!(await previous.isDisabled())) {
    throw new Error("Approval first-question previous boundary remained enabled");
  }
  await assertApprovalHitAreas(canvas);
}

async function selectApprovalMixIns({ canvas }) {
  await fillApprovalCustom(canvas);
  await canvas
    .getByRole("button", { name: /Next question|继续下一题/ })
    .click();
  const chocolate = canvas.getByRole("checkbox", {
    name: /Chocolate chips|黑巧碎粒/,
  });
  const sprinkles = canvas.getByRole("checkbox", {
    name: /Sprinkles|彩色糖针/,
  });
  const chocolateLabel = canvas
    .locator("label")
    .filter({ hasText: /Chocolate chips|黑巧碎粒/ });
  const sprinklesLabel = canvas
    .locator("label")
    .filter({ hasText: /Sprinkles|彩色糖针/ });
  await chocolateLabel.click();
  await sprinklesLabel.click();
  if (!(await chocolate.isChecked())) {
    throw new Error("Chocolate mix-in was not selected");
  }
  if (!(await sprinkles.isChecked())) {
    throw new Error("Sprinkles mix-in was not selected");
  }

  await canvas.getByRole("button", { name: /Previous|上一题/ }).click();
  const restoredCustom = approvalCustomInput(canvas);
  if (!(await restoredCustom.inputValue())) {
    throw new Error("Approval previous navigation lost the first answer");
  }
  await canvas
    .getByRole("button", { name: /Go to question 2|转到第 2 题/ })
    .click();
  if (!(await chocolate.isChecked()) || !(await sprinkles.isChecked())) {
    throw new Error("Approval direct navigation lost multi-select answers");
  }
  await assertApprovalHitAreas(canvas);
}

async function submitApproval({ canvas }) {
  for (let question = 0; question < 2; question += 1) {
    await fillApprovalCustom(canvas);
    await canvas
      .getByRole("button", { name: /Next question|继续下一题/ })
      .click();
  }
  await fillApprovalCustom(canvas);
  await canvas
    .getByRole("button", { name: /Send answers|提交答案/ })
    .click();
  await canvas.getByText(/Answers sent|审批决策已提交/).waitFor();
  const startOver = canvas.getByRole("button", { name: /Start over|重新填写/ });
  if ((await startOver.and(canvas.locator(":focus")).count()) !== 1) {
    throw new Error("Approval confirmation did not move focus to Start over");
  }
  await assertApprovalHitAreas(canvas);
}

async function focusApprovalOption(args) {
  const control = args.canvas.getByRole("radio", {
    name: /Three \(core line\)|3 款 \(核心经典线\)/,
  });
  await focusWithKeyboard(
    args,
    control,
    "Approval option did not receive keyboard-visible focus",
  );
  await assertApprovalHitAreas(args.canvas);
}

function clarificationCustomInput(canvas) {
  return canvas.getByRole("textbox", {
    name: /Custom migration rules|自定义迁移要求/,
  });
}

async function verifyInitialClarification({ canvas }) {
  await assertClarificationHitAreas(canvas);
}

async function selectAlternateClarification({ canvas }) {
  const option = canvas.getByRole("radio", {
    name: /Dual-Format Verification|双签名格式校验/,
  });
  await option.click();
  if (!(await option.isChecked())) {
    throw new Error("Alternate clarification option was not selected");
  }
  await assertClarificationHitAreas(canvas);
}

async function submitCustomClarification({ canvas }) {
  const input = clarificationCustomInput(canvas);
  const label = await input.getAttribute("aria-label");
  const value = label === "自定义迁移要求"
    ? "先迁移内部账号，再迁移外部用户"
    : "Migrate staff accounts before customer sessions";
  await input.fill(value);
  await canvas
    .getByRole("button", { name: /Confirm & Proceed|确认并继续/ })
    .click();
  await canvas.getByText(value).waitFor();
  const changeDecision = canvas.getByRole("button", {
    name: /Change decision|修改决策/,
  });
  if ((await changeDecision.and(canvas.locator(":focus")).count()) !== 1) {
    throw new Error("Clarification confirmation did not move focus to Change decision");
  }
  await assertClarificationHitAreas(canvas);
}

async function focusClarificationOption({ canvas, page }) {
  const recommended = canvas.getByRole("radio", {
    name: /Soft Token Migration|平滑双轨迁移/,
  });
  const control = canvas.getByRole("radio", {
    name: /Dual-Format Verification|双签名格式校验/,
  });
  await recommended.focus();
  await page.keyboard.press("ArrowDown");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error("Clarification option did not receive keyboard-visible focus");
  }
  await assertClarificationHitAreas(canvas);
}

async function navigateFirstBranch({ canvas }) {
  const previous = canvas.getByRole("button", {
    name: /Previous branch|上一个分支/,
  });
  await previous.click();
  if (!(await previous.isDisabled())) {
    throw new Error("Previous branch boundary remained enabled");
  }
  await canvas.getByText("GPT-5.2 · 10:41").waitFor();
  await assertButtonHitAreas(canvas, "Message Branches");
}

async function navigateLastBranch({ canvas }) {
  const next = canvas.getByRole("button", { name: /Next branch|下一个分支/ });
  await next.click();
  if (!(await next.isDisabled())) {
    throw new Error("Next branch boundary remained enabled");
  }
  await canvas.getByText("Gemini 3.1 Pro · 10:43").waitFor();
  await assertButtonHitAreas(canvas, "Message Branches");
}

async function continueBranch({ canvas }) {
  await canvas
    .getByRole("button", {
      name: /Continue from this branch|从此分支继续/,
    })
    .click();
  await canvas
    .getByText(/Continuing from branch 2|正从分支 2 继续/)
    .waitFor();
  await assertButtonHitAreas(canvas, "Message Branches");
}

async function focusBranchContinue(args) {
  const control = args.canvas.getByRole("button", {
    name: /Continue from this branch|从此分支继续/,
  });
  await focusWithKeyboard(
    args,
    control,
    "Branch continuation did not receive keyboard-visible focus",
  );
  await assertButtonHitAreas(args.canvas, "Message Branches");
}
/* TASK 6 VISUAL ACTIONS END */

/* TASK 6 VISUAL REGISTRATIONS START */
const TASK6_CASES = [
  [
    "subagent-tree",
    [
      { name: "running-expanded", advanceMs: 0 },
      { name: "completed-expanded", advanceMs: 0, action: openCompletedSubagent },
      { name: "focused", advanceMs: 0, action: focusRunningSubagent },
    ],
  ],
  [
    "agent-teams",
    [
      { name: "initial", advanceMs: 0 },
      { name: "handoff", advanceMs: 4200, action: verifyAgentHandoff },
      { name: "completed", advanceMs: 8400, action: verifyAgentCompletion },
    ],
  ],
  [
    "task-rows",
    [
      { name: "initial", advanceMs: 0 },
      { name: "details", advanceMs: 0, action: openTaskDetails },
      { name: "failed", advanceMs: 4000, action: verifyFailedTask },
      { name: "completed", advanceMs: 5400, action: verifyCompletedTask },
      { name: "focused", advanceMs: 0, action: focusTaskRow },
    ],
  ],
  [
    "tool-chips",
    [
      { name: "settled", advanceMs: 3600, action: verifySettledTools },
      { name: "detail-open", advanceMs: 3600, action: openToolDetail },
      { name: "collapsed", advanceMs: 3600, action: collapseToolRun },
      { name: "focused", advanceMs: 3600, action: focusToolRow },
    ],
  ],
  [
    "approval-card",
    [
      { name: "custom-answer", advanceMs: 0, action: captureApprovalCustom },
      { name: "multi-select", advanceMs: 0, action: selectApprovalMixIns },
      { name: "submitted", advanceMs: 0, action: submitApproval },
      { name: "focused", advanceMs: 0, action: focusApprovalOption },
    ],
  ],
  [
    "clarification-card",
    [
      { name: "initial", advanceMs: 0, action: verifyInitialClarification },
      { name: "alternate", advanceMs: 0, action: selectAlternateClarification },
      { name: "submitted", advanceMs: 0, action: submitCustomClarification },
      { name: "focused", advanceMs: 0, action: focusClarificationOption },
    ],
  ],
  [
    "message-branches",
    [
      { name: "first", advanceMs: 0, action: navigateFirstBranch },
      { name: "last", advanceMs: 0, action: navigateLastBranch },
      { name: "continued", advanceMs: 0, action: continueBranch },
      { name: "focused", advanceMs: 0, action: focusBranchContinue },
    ],
  ],
];
/* TASK 6 VISUAL REGISTRATIONS END */

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

/* TASK 7 VISUAL ACTIONS START */
async function assertMinimumTarget(control, label) {
  const box = await control.boundingBox();
  if (!box) throw new Error(`${label} is not visibly measurable`);
  if (box.width < 44 || box.height < 44) {
    throw new Error(
      `${label} hit area is ${box.width.toFixed(1)}×${box.height.toFixed(1)}; expected at least 44×44`,
    );
  }
}

async function assertKeyboardFocus({ canvas, page, control, label }) {
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(`${label} did not receive visible keyboard focus`);
  }
  await assertMinimumTarget(control, label);
}

async function selectContextSegment({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /RAG & Retrieved Docs|RAG 检索增强知识/,
  });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Context segment did not become selected");
  }
  await assertMinimumTarget(control, "Context segment");
}

async function pruneContextWindow({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /History pruning|历史精简/,
  });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Context compaction did not become active");
  }
  const progress = canvas.getByRole("progressbar", {
    name: /Context usage|上下文占用率/,
  });
  if ((await progress.getAttribute("aria-valuenow")) !== "33.6") {
    throw new Error("Context progress did not report the pruned capacity");
  }
  await assertMinimumTarget(control, "Context compaction control");
}

async function focusContextSegment({ canvas, page }) {
  const control = canvas.getByRole("button", {
    name: /System & Directives|系统指令与安全约束/,
  });
  await assertKeyboardFocus({
    canvas,
    page,
    control,
    label: "Context segment",
  });
}

async function assertMemoryFilterTargets(canvas) {
  const group = canvas.getByRole("group", {
    name: /Memory filters|记忆筛选/,
  });
  const controls = await group.getByRole("button").all();
  if (controls.length !== 4) {
    throw new Error(`Memory filters exposed ${controls.length} controls; expected 4`);
  }
  for (const control of controls) {
    const label = await control.getAttribute("aria-label");
    if (!label) throw new Error("Memory filter is missing an accessible name");
    await assertMinimumTarget(control, label);
  }
}

async function filterMemoryRules({ canvas }) {
  await assertMemoryFilterTargets(canvas);
  const control = canvas.getByRole("button", {
    exact: true,
    name: /^(Rules|规范)$/,
  });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Memory rule filter did not become selected");
  }
  if ((await canvas.getByRole("listitem").count()) !== 1) {
    throw new Error("Memory rule filter did not isolate one result");
  }
}

async function searchMemory({ canvas }) {
  const control = canvas.getByRole("searchbox", {
    name: /Search memory|搜索记忆/,
  });
  await control.fill("Turborepo");
  await canvas.getByText(/Project uses Turborepo|项目采用 Turborepo/).waitFor();
  if ((await canvas.getByRole("listitem").count()) !== 1) {
    throw new Error("Memory search did not isolate one result");
  }
  await assertMinimumTarget(control, "Memory search");
}

async function focusMemoryAction({ canvas, page }) {
  const control = canvas
    .getByRole("button", { name: /^(Pin to prompt:|置顶到 Prompt：)/ })
    .first();
  await assertKeyboardFocus({
    canvas,
    page,
    control,
    label: "Memory row action",
  });
}

async function hydrateSpill(canvas, control, tokenPattern) {
  const controlledId = await control.getAttribute("aria-controls");
  if (!controlledId) {
    throw new Error("Spill disclosure is missing aria-controls");
  }
  const stableControl = canvas.locator(`[aria-controls="${controlledId}"]`);
  const region = canvas.locator(`[id="${controlledId}"]`);
  if ((await region.count()) !== 1) {
    throw new Error("Spill disclosure target is missing or duplicated");
  }

  await control.click();
  if ((await stableControl.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Spill disclosure did not expand");
  }
  await region.waitFor({ state: "visible" });
  await region.getByText(tokenPattern).waitFor();
  await assertMinimumTarget(stableControl, "Spill hydrate control");
}

async function hydrateFirstSpill({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /^(Hydrate|按需水合) spill\/ripgrep_ast_results\.json$/,
  });
  await hydrateSpill(canvas, control, /48,500 token/);
}

async function hydrateSecondSpill({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /^(Hydrate|按需水合) spill\/git_diff_refactor_v2\.patch$/,
  });
  await hydrateSpill(canvas, control, /86,200 token/);
}

async function focusSpillAction({ canvas, page }) {
  const control = canvas.getByRole("button", {
    name: /^(Hydrate|按需水合) spill\/ripgrep_ast_results\.json$/,
  });
  await assertKeyboardFocus({
    canvas,
    page,
    control,
    label: "Spill hydrate control",
  });
}

const TASK7_CASES = [
  [
    "context-window",
    [
      { name: "initial", advanceMs: 0 },
      { name: "selected", advanceMs: 0, action: selectContextSegment },
      { name: "pruned", advanceMs: 0, action: pruneContextWindow },
      { name: "focused", advanceMs: 0, action: focusContextSegment },
    ],
  ],
  [
    "memory-inspector",
    [
      { name: "all", advanceMs: 0 },
      { name: "rules", advanceMs: 0, action: filterMemoryRules },
      { name: "search", advanceMs: 0, action: searchMemory },
      { name: "focused", advanceMs: 0, action: focusMemoryAction },
    ],
  ],
  [
    "context-cards",
    [
      { name: "initial", advanceMs: 0 },
      { name: "sources-ready", advanceMs: 700 },
    ],
  ],
  [
    "context-spillover",
    [
      { name: "compacted", advanceMs: 0 },
      { name: "first-hydrated", advanceMs: 0, action: hydrateFirstSpill },
      { name: "second-hydrated", advanceMs: 0, action: hydrateSecondSpill },
      { name: "focused", advanceMs: 0, action: focusSpillAction },
    ],
  ],
];
/* TASK 7 VISUAL ACTIONS END */

/**
 * @typedef {{
 *   action?: (args: {
 *     advance: (milliseconds: number) => Promise<void>,
 *     canvas: any,
 *     framework?: string,
 *     page: any,
 *     section?: any,
 *   }) => unknown,
 *   advanceMs: number,
 *   name: string,
 * }} VisualCase
 */

/** @type {Map<string, VisualCase[]>} */
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
  ...TASK6_CASES,
  /* TASK 7 VISUAL REGISTRATIONS START */
  ...TASK7_CASES,
  /* TASK 7 VISUAL REGISTRATIONS END */
]);

export function casesForComponent(componentId) {
  return CASES.get(componentId) ?? [DEFAULT_CASE];
}
