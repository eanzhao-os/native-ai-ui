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

/* TASK 13 VISUAL REGISTRATIONS START */
const TASK13_VISUAL_RUNNER = process.argv[1]?.endsWith(
  "scripts/run-visual-parity.mjs",
);
/* TASK 13 VISUAL REGISTRATIONS END */

/* TASK 5A VISUAL REGISTRATIONS START */
var task5PromptCases = [
  { name: "composer", advanceMs: 0, action: composeTask13Prompt },
  { name: "model-open", advanceMs: 0, action: openTask13PromptModel },
  { name: "connected", advanceMs: 0, action: connectTask13Prompt },
  { name: "model-selected", advanceMs: 0, action: selectTask13PromptModel },
  { name: "submitted", advanceMs: 0, action: submitTask13Prompt },
];
var task5StreamingCases = [
  { name: "followups", advanceMs: 0, action: captureTask13StreamingFollowups },
  { name: "sources-open", advanceMs: 0, action: openTask13StreamingSources },
];
if (!TASK13_VISUAL_RUNNER) {
  var task5PromptCases = [
    { name: "ready", advanceMs: 0, action: preparePrompt },
    { name: "submitted", advanceMs: 0, action: submitPrompt },
  ];
  var task5StreamingCases = [
    { name: "settled", advanceMs: 0, action: settleStreaming },
    { name: "sources-open", advanceMs: 0, action: openStreamingSources },
  ];
}
const TASK5A_CASES = [
  ["prompt-bar", task5PromptCases],
  ["streaming-text", task5StreamingCases],
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
var task6ApprovalCases = [
  { name: "custom-answer", advanceMs: 0, action: captureTask13ApprovalCustom },
  { name: "progress", advanceMs: 0, action: captureTask13ApprovalProgress },
  { name: "submitted", advanceMs: 0, action: submitApproval },
  { name: "focused", advanceMs: 0, action: focusApprovalOption },
];
if (!TASK13_VISUAL_RUNNER) {
  var task6ApprovalCases = [
    { name: "custom-answer", advanceMs: 0, action: captureApprovalCustom },
    { name: "multi-select", advanceMs: 0, action: selectApprovalMixIns },
    { name: "submitted", advanceMs: 0, action: submitApproval },
    { name: "focused", advanceMs: 0, action: focusApprovalOption },
  ];
}
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
  ["approval-card", task6ApprovalCases],
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

/* TASK 8 VISUAL ACTIONS START */
async function selectLifecycleEvent({ canvas }) {
  const event = canvas.getByRole("option", {
    name: /tool\/result: job-4f8c/,
  });
  await event.click();
  if ((await event.getAttribute("aria-selected")) !== "true") {
    throw new Error("Lifecycle event did not become selected");
  }
  await canvas
    .getByRole("status", { name: /Selected event|已选事件/ })
    .getByText(/job-4f8c/)
    .waitFor();
}

async function focusLifecycleTimeline({ canvas, page }) {
  const timeline = canvas.getByRole("listbox", {
    name: /Turn events|Turn 事件/,
  });
  await assertKeyboardFocus({
    canvas,
    page,
    control: timeline,
    label: "Turn lifecycle timeline",
  });
  await page.keyboard.press("Home");
  const firstEvent = canvas.getByRole("option").first();
  if (
    (await timeline.getAttribute("aria-activedescendant")) !==
    (await firstEvent.getAttribute("id"))
  ) {
    throw new Error("Lifecycle keyboard navigation did not select the first event");
  }
}

async function queueInboxMessages({ canvas }) {
  const followup = canvas.getByRole("button", {
    name: /Queue Followup|加入 Followup 队列/,
  });
  const steer = canvas.getByRole("button", {
    name: /Queue Steer|加入 Steer 队列/,
  });
  const inject = canvas.getByRole("button", {
    name: /Queue Inject|加入 Inject 队列/,
  });

  await followup.click();
  await canvas
    .getByRole("region", { name: /NextTurn queue|NextTurn 队列/ })
    .getByText(/also verify the rollout gate|顺便验证一下灰度发布门禁/)
    .waitFor();
  await steer.click();
  await inject.click();
  await canvas
    .getByRole("region", { name: /NextStep queue|NextStep 队列/ })
    .getByText(/fyi: trace dump|备注：trace 已转储/)
    .waitFor();

  for (const [control, label] of [
    [followup, "Followup queue control"],
    [steer, "Steer queue control"],
    [inject, "Inject queue control"],
  ]) {
    await assertMinimumTarget(control, label);
  }
}

async function claimInboxMessages(args) {
  await queueInboxMessages(args);
  const claim = args.canvas.getByRole("button", {
    name: /Claim next-step queue|领取 NextStep 队列/,
  });
  await assertMinimumTarget(claim, "Inbox claim control");
  await claim.click();
  await args.canvas.getByText(/claimed ×2/).waitFor();
  if ((await claim.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Inbox claim did not drain the next-step queue");
  }
}

async function focusInboxAction({ canvas, page }) {
  const control = canvas.getByRole("button", {
    name: /Queue Followup|加入 Followup 队列/,
  });
  await assertKeyboardFocus({
    canvas,
    page,
    control,
    label: "Inbox queue control",
  });
}

async function approveHookRequest({ canvas }) {
  const approval = canvas.getByRole("button", {
    name: /Approve hook request|批准 Hook 请求/,
  });
  await assertMinimumTarget(approval, "Hook approval control");
  await approval.click();
  await canvas.getByText(/allow · approved|allow · 已批准/).waitFor();
}

async function focusHookApproval({ canvas, page }) {
  const control = canvas.getByRole("button", {
    name: /Approve hook request|批准 Hook 请求/,
  });
  await assertKeyboardFocus({
    canvas,
    page,
    control,
    label: "Hook approval control",
  });
}

async function openCheckpointRestore({ canvas }) {
  const selection = canvas.getByRole("button", {
    name: /Select checkpoint Before edits|选择检查点 编辑前/,
  });
  await selection.click();
  if ((await selection.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Checkpoint selection did not become active");
  }

  const restore = canvas.getByRole("button", {
    name: /Restore checkpoint|恢复检查点/,
  });
  await assertMinimumTarget(restore, "Checkpoint restore control");
  await restore.click();
  await canvas
    .getByRole("alertdialog", {
      name: /Confirm restore “Before edits”|确认恢复“编辑前”/,
    })
    .waitFor();
}

async function restoreCheckpoint(args) {
  await openCheckpointRestore(args);
  const confirm = args.canvas.getByRole("button", {
    name: /Confirm restore|确认恢复/,
  });
  await assertMinimumTarget(confirm, "Checkpoint confirm control");
  await confirm.click();
  await args.canvas
    .getByText(/Restored “Before edits”|已恢复“编辑前”/)
    .waitFor();

  const current = args.canvas.getByRole("button", {
    name: /Current checkpoint|当前检查点/,
  });
  if (!(await current.isDisabled())) {
    throw new Error("Restored checkpoint did not become current");
  }
}

async function focusCheckpointConfirmation(args) {
  await openCheckpointRestore(args);
  const control = args.canvas.getByRole("button", {
    name: /Confirm restore|确认恢复/,
  });
  await assertKeyboardFocus({
    canvas: args.canvas,
    page: args.page,
    control,
    label: "Checkpoint confirm control",
  });
}

const TASK8_CASES = [
  [
    "turn-lifecycle",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 9000 },
      { name: "selected", advanceMs: 9000, action: selectLifecycleEvent },
      { name: "focused", advanceMs: 9000, action: focusLifecycleTimeline },
    ],
  ],
  [
    "agent-inbox",
    [
      { name: "initial", advanceMs: 0 },
      { name: "queued", advanceMs: 0, action: queueInboxMessages },
      { name: "claimed", advanceMs: 0, action: claimInboxMessages },
      { name: "settled", advanceMs: 9600 },
      { name: "focused", advanceMs: 0, action: focusInboxAction },
    ],
  ],
  [
    "hook-pipeline",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 4800 },
      { name: "approved", advanceMs: 4800, action: approveHookRequest },
      { name: "focused", advanceMs: 4800, action: focusHookApproval },
    ],
  ],
  [
    "session-telemetry",
    [
      { name: "initial", advanceMs: 0 },
      { name: "folded", advanceMs: 2500 },
      { name: "settled", advanceMs: 8000 },
    ],
  ],
  [
    "workflow-run",
    [
      { name: "initial", advanceMs: 0 },
      { name: "in-flight", advanceMs: 210 },
      { name: "settled", advanceMs: 7000 },
    ],
  ],
  [
    "checkpoint-timeline",
    [
      { name: "initial", advanceMs: 0 },
      { name: "confirming", advanceMs: 0, action: openCheckpointRestore },
      { name: "settled", advanceMs: 0, action: restoreCheckpoint },
      { name: "focused", advanceMs: 0, action: focusCheckpointConfirmation },
    ],
  ],
];
/* TASK 8 VISUAL ACTIONS END */

/* TASK 9 VISUAL ACTIONS START */
async function assertTask9Target(control, hitTarget, label) {
  const box = await hitTarget.boundingBox();
  if (!box) throw new Error(`${label} is not visibly measurable`);
  if (box.width < 44 || box.height < 44) {
    throw new Error(
      `${label} hit area is ${box.width.toFixed(1)}×${box.height.toFixed(1)}; expected at least 44×44`,
    );
  }
}

async function focusTask9Control({ canvas, page }, control, hitTarget, label) {
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(`${label} did not receive visible keyboard focus`);
  }
  await assertTask9Target(control, hitTarget, label);
}

async function task9ControlledRegion(canvas, control, label) {
  const controlledId = await control.getAttribute("aria-controls");
  if (!controlledId) throw new Error(`${label} is missing aria-controls`);
  const region = canvas.locator(`[id="${controlledId}"]`);
  if ((await region.count()) !== 1) {
    throw new Error(`${label} controlled region is missing or duplicated`);
  }
  return region;
}

async function expandSecondCordisPlugin({ canvas }) {
  const first = canvas.getByRole("button", {
    name: /Service topology: Cordis\.Hmr|服务拓扑：Cordis\.Hmr/,
  });
  const second = canvas.getByRole("button", {
    name: /Service topology: Harness\.Llm\.DeepSeek|服务拓扑：Harness\.Llm\.DeepSeek/,
  });
  await first.click();
  await second.click();
  if ((await first.getAttribute("aria-expanded")) !== "false") {
    throw new Error("First Cordis plugin remained expanded");
  }
  if ((await second.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Second Cordis plugin did not expand");
  }
  await (await task9ControlledRegion(canvas, second, "Cordis disclosure")).waitFor();
  await assertTask9Target(second, second, "Cordis disclosure");
}

async function reloadCordisPlugin({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Hot reload Cordis\.Hmr|热重载 Cordis\.Hmr/,
  });
  await control.click();
  if ((await control.getAttribute("aria-busy")) !== "true") {
    throw new Error("Cordis HMR did not enter its busy state");
  }
  await advance(800);
  await canvas.getByText("rev #4").waitFor();
  await assertTask9Target(control, control, "Cordis HMR control");
}

async function disableCordisPlugin({ canvas }) {
  const toggle = canvas.getByRole("button", {
    name: /Plugin enabled: Cordis\.Hmr|插件启用状态：Cordis\.Hmr/,
  });
  await toggle.click();
  if ((await toggle.getAttribute("aria-pressed")) !== "false") {
    throw new Error("Cordis plugin did not become disabled");
  }
  const hmr = canvas.getByRole("button", {
    name: /Hot reload Cordis\.Hmr|热重载 Cordis\.Hmr/,
  });
  if (!(await hmr.isDisabled())) {
    throw new Error("Disabled Cordis plugin retained an active HMR control");
  }
  await assertTask9Target(toggle, toggle, "Cordis enable control");
}

async function focusCordisPlugin(args) {
  const control = args.canvas.getByRole("button", {
    name: /Service topology: Harness\.Llm\.DeepSeek|服务拓扑：Harness\.Llm\.DeepSeek/,
  });
  await focusTask9Control(args, control, control, "Cordis disclosure");
}

async function selectStrictPermissionPreset({ canvas }) {
  const control = canvas.getByRole("radio", {
    name: /Strict Sandboxed|严格沙盒隔离/,
  });
  const hitTarget = control.locator("..");
  await hitTarget.click();
  if (!(await control.isChecked())) {
    throw new Error("Strict permission preset did not become selected");
  }
  await assertTask9Target(control, hitTarget, "Permission preset");
}

async function startPermissionAudit({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Replay Audit|重放审计/,
  });
  await control.click();
  if ((await control.getAttribute("aria-busy")) !== "true") {
    throw new Error("Permission audit did not enter its busy state");
  }
  await assertTask9Target(control, control, "Permission audit control");
}

async function verifyPermissionAudit({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Replay Audit|重放审计/,
  });
  await control.click();
  await advance(900);
  await canvas.getByText(/^✓ (Validated|校验通过)$/).waitFor();
}

async function focusPermissionPreset(args) {
  const control = args.canvas.getByRole("radio", {
    name: /Balanced Dev|开发平衡模式/,
  });
  await focusTask9Control(
    args,
    control,
    control.locator(".."),
    "Permission preset",
  );
}

async function filterLspWarnings({ canvas }) {
  const control = canvas.getByRole("button", { name: /Warnings|警告/ });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("LSP warnings filter did not become selected");
  }
  if ((await canvas.getByText("CS0103").count()) !== 0) {
    throw new Error("LSP warnings filter retained an error diagnostic");
  }
  await assertTask9Target(control, control, "LSP filter");
}

async function startLspFix({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Auto-Fix CS0103|一键修复 CS0103/,
  });
  await control.click();
  if (!(await control.isDisabled())) {
    throw new Error("LSP fix control remained enabled while pending");
  }
  if ((await control.getAttribute("aria-busy")) !== "true") {
    throw new Error("LSP fix control did not expose its busy state");
  }
  await assertTask9Target(control, control, "LSP fix control");
}

async function completeLspFix({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Auto-Fix CS0103|一键修复 CS0103/,
  });
  await control.click();
  await advance(600);
  if ((await canvas.getByText("CS0103", { exact: true }).count()) !== 0) {
    throw new Error("Fixed LSP diagnostic remained visible");
  }
  await canvas.getByText(/2 issues in scope|2 个范围内问题/).waitFor();
}

async function focusLspFix(args) {
  const control = args.canvas.getByRole("button", {
    name: /Auto-Fix CS0103|一键修复 CS0103/,
  });
  await focusTask9Control(args, control, control, "LSP fix control");
}

async function openSandboxProcess({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Process 1402: dotnet run|进程 1402：dotnet run/,
  });
  await control.click();
  if ((await control.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Sandbox process did not expand");
  }
  const region = await task9ControlledRegion(canvas, control, "Sandbox process");
  await region.waitFor();
  await region.getByText(/8m 12s|8分12秒/).waitFor();
  await assertTask9Target(control, control, "Sandbox process disclosure");
}

async function restartSandbox({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Restart Container|重启容器/,
  });
  await control.click();
  if (!(await control.isDisabled())) {
    throw new Error("Sandbox restart control remained enabled while pending");
  }
  if ((await control.getAttribute("aria-busy")) !== "true") {
    throw new Error("Sandbox restart did not expose its busy state");
  }
  await assertTask9Target(control, control, "Sandbox restart control");
}

async function settleSandboxRestart({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Restart Container|重启容器/,
  });
  await control.click();
  await advance(1000);
  await canvas.getByText("8.2%").waitFor();
}

async function focusSandboxProcess(args) {
  const control = args.canvas.getByRole("button", {
    name: /Process 1402: dotnet run|进程 1402：dotnet run/,
  });
  await focusTask9Control(args, control, control, "Sandbox process disclosure");
}

async function disableScheduledJob({ canvas }) {
  const toggle = canvas.getByRole("button", {
    name: /Job enabled: Vector Embeddings|任务启用状态：向量嵌入/,
  });
  await toggle.click();
  if ((await toggle.getAttribute("aria-pressed")) !== "false") {
    throw new Error("Scheduled job did not become disabled");
  }
  const trigger = canvas.getByRole("button", {
    name: /Trigger Vector Embeddings|立即触发 向量嵌入/,
  });
  if (!(await trigger.isDisabled())) {
    throw new Error("Disabled job retained an active trigger");
  }
  await canvas.getByText(/2 active jobs|2 个活跃任务/).waitFor();
  await assertTask9Target(toggle, toggle, "Job enable control");
}

async function triggerScheduledJob({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Trigger Vector Embeddings|立即触发 向量嵌入/,
  });
  await control.click();
  if (!(await control.isDisabled())) {
    throw new Error("Job trigger remained enabled while running");
  }
  if ((await control.getAttribute("aria-busy")) !== "true") {
    throw new Error("Job trigger did not expose its busy state");
  }
  await assertTask9Target(control, control, "Job trigger");
}

async function completeScheduledJob({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Trigger Vector Embeddings|立即触发 向量嵌入/,
  });
  await control.click();
  await advance(1200);
  const row = canvas.getByRole("listitem", {
    name: /Vector Embeddings Sync|向量嵌入同步/,
  });
  await row.getByText(/Success|执行成功/).waitFor();
  if (await control.isDisabled()) {
    throw new Error("Completed job trigger did not become available again");
  }
}

async function focusScheduledJob(args) {
  const control = args.canvas.getByRole("button", {
    name: /Trigger Vector Embeddings|立即触发 向量嵌入/,
  });
  await focusTask9Control(args, control, control, "Job trigger");
}

async function openMcpTools({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Server ripgrep|服务器 ripgrep/,
  });
  await control.click();
  if ((await control.getAttribute("aria-expanded")) !== "true") {
    throw new Error("MCP tool disclosure did not expand");
  }
  const region = await task9ControlledRegion(canvas, control, "MCP disclosure");
  await region.getByText("ripgrep__search").waitFor();
  await assertTask9Target(control, control, "MCP disclosure");
}

async function openMcpError({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Server web-fetch|服务器 web-fetch/,
  });
  await control.click();
  const region = await task9ControlledRegion(canvas, control, "MCP error disclosure");
  await region.getByRole("button", { name: /Retry web-fetch|重连 web-fetch/ }).waitFor();
}

async function retryMcpServer({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Server web-fetch|服务器 web-fetch/,
  });
  await control.click();
  const region = await task9ControlledRegion(canvas, control, "MCP retry disclosure");
  const retry = region.getByRole("button", {
    name: /Retry web-fetch|重连 web-fetch/,
  });
  await assertTask9Target(retry, retry, "MCP retry control");
  await retry.click();
  if ((await region.getAttribute("aria-busy")) !== "true") {
    throw new Error("MCP server did not enter its handshake state");
  }
}

async function recoverMcpServer({ advance, canvas }) {
  const control = canvas.getByRole("button", {
    name: /Server web-fetch|服务器 web-fetch/,
  });
  await control.click();
  const region = await task9ControlledRegion(canvas, control, "MCP recovery disclosure");
  await region
    .getByRole("button", { name: /Retry web-fetch|重连 web-fetch/ })
    .click();
  await advance(1600);
  await region.getByText("web-fetch__get").waitFor();
  await canvas.getByText(/3\/3 · 7 tools|3\/3 · 7 个工具/).waitFor();
}

async function focusMcpServer(args) {
  const control = args.canvas.getByRole("button", {
    name: /Server ripgrep|服务器 ripgrep/,
  });
  await focusTask9Control(args, control, control, "MCP disclosure");
}

const TASK9_CASES = [
  [
    "cordis-plugin-tree",
    [
      { name: "initial", advanceMs: 0 },
      { name: "second-expanded", advanceMs: 0, action: expandSecondCordisPlugin },
      { name: "hmr-reloaded", advanceMs: 0, action: reloadCordisPlugin },
      { name: "disabled", advanceMs: 0, action: disableCordisPlugin },
      { name: "focused", advanceMs: 0, action: focusCordisPlugin },
    ],
  ],
  [
    "permission-preset-card",
    [
      { name: "balanced", advanceMs: 0 },
      { name: "strict-selected", advanceMs: 0, action: selectStrictPermissionPreset },
      { name: "audit-verifying", advanceMs: 0, action: startPermissionAudit },
      { name: "audit-verified", advanceMs: 0, action: verifyPermissionAudit },
      { name: "focused", advanceMs: 0, action: focusPermissionPreset },
    ],
  ],
  [
    "lsp-diagnostics",
    [
      { name: "initial", advanceMs: 0 },
      { name: "warnings", advanceMs: 0, action: filterLspWarnings },
      { name: "fixing", advanceMs: 0, action: startLspFix },
      { name: "fixed", advanceMs: 0, action: completeLspFix },
      { name: "focused", advanceMs: 0, action: focusLspFix },
    ],
  ],
  [
    "sandbox-manager",
    [
      { name: "initial", advanceMs: 0 },
      { name: "process-open", advanceMs: 0, action: openSandboxProcess },
      { name: "restarting", advanceMs: 0, action: restartSandbox },
      { name: "restarted", advanceMs: 0, action: settleSandboxRestart },
      { name: "focused", advanceMs: 0, action: focusSandboxProcess },
    ],
  ],
  [
    "job-scheduler",
    [
      { name: "initial", advanceMs: 0 },
      { name: "disabled", advanceMs: 0, action: disableScheduledJob },
      { name: "triggering", advanceMs: 0, action: triggerScheduledJob },
      { name: "completed", advanceMs: 0, action: completeScheduledJob },
      { name: "focused", advanceMs: 0, action: focusScheduledJob },
    ],
  ],
  [
    "mcp-servers",
    [
      { name: "initial", advanceMs: 0 },
      { name: "tools-open", advanceMs: 0, action: openMcpTools },
      { name: "error-open", advanceMs: 0, action: openMcpError },
      { name: "retrying", advanceMs: 0, action: retryMcpServer },
      { name: "recovered", advanceMs: 0, action: recoverMcpServer },
      { name: "focused", advanceMs: 0, action: focusMcpServer },
    ],
  ],
];
/* TASK 9 VISUAL ACTIONS END */

/* TASK 10 VISUAL ACTIONS START */
async function focusTask10Control({ canvas, page }, control, label) {
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(`${label} did not receive visible keyboard focus`);
  }
}

async function chooseArtifactViewport({ canvas }, name) {
  const control = canvas.getByRole("button", { name });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error(`${name} preview did not become active`);
  }
}

async function openArtifactCode({ canvas }) {
  const control = canvas.getByRole("tab", { name: /^(Code|代码)$/ });
  await control.click();
  if ((await control.getAttribute("aria-selected")) !== "true") {
    throw new Error("Artifact Code tab did not become selected");
  }
  await canvas.getByRole("region", { name: /Source code|源代码/ }).waitFor();
}

async function copyArtifactCode({ canvas, page }) {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await canvas.getByRole("button", { name: /^(Copy|复制)$/ }).click();
  await canvas.getByText(/^(Copied|已复制)$/).waitFor();
}

async function focusArtifactCode(args) {
  const control = args.canvas.getByRole("tab", { name: /^(Code|代码)$/ });
  await control.click();
  await focusTask10Control(args, control, "Artifact Code tab");
}

async function enableDiffMotion({ advance, page }, milliseconds) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await advance(1);
  if (milliseconds > 0) await advance(milliseconds);
}

async function showDiffInitial(args) {
  await enableDiffMotion(args, 0);
  await args.canvas.getByText(/Analyzing 3 changes|正在分析 3 项变更/).waitFor();
}

async function showDiffRemovals(args) {
  await enableDiffMotion(args, 1800);
  await args.canvas.getByText(/2 removals found|发现 2 项移除变更/).waitFor();
}

async function showDiffCompleted(args) {
  await enableDiffMotion(args, 2800);
  await args.canvas.getByText(/3 of 3 changes selected|已选择 3\/3 项变更/).waitFor();
}

async function selectPartialDiffControl({ canvas }) {
  const control = canvas.getByRole("checkbox", {
    name: /Select removal Rocky Road|选择移除 石板街/,
  });
  await control.locator("..").click();
  if (await control.isChecked()) {
    throw new Error("Diff removal remained selected");
  }
  await canvas.getByText(/2 of 3 changes selected|已选择 2\/3 项变更/).waitFor();
}

async function selectPartialDiff(args) {
  await showDiffCompleted(args);
  await selectPartialDiffControl(args);
}

async function applyPartialDiff(args) {
  await showDiffCompleted(args);
  await selectPartialDiffControl(args);
  const control = args.canvas.getByRole("button", {
    name: /Apply 2 changes|应用 2 项变更/,
  });
  await control.click();
  await args.canvas.getByText(/Applied 2 changes|已应用 2 项变更/).waitFor();
}

async function focusDiffApply(args) {
  await args.page.emulateMedia({ reducedMotion: "reduce" });
  await args.canvas.getByRole("button", {
    name: /Apply 3 changes|应用 3 项变更/,
  }).waitFor();
  await focusTask10Control(
    args,
    args.canvas.getByRole("button", {
      name: /Apply 3 changes|应用 3 项变更/,
    }),
    "Diff apply control",
  );
}

async function selectFirstRecord({ canvas }) {
  const control = canvas.getByRole("checkbox", {
    name: /Select Aurora Scoops|选择 Aurora Scoops/,
  });
  await control.locator("..").click();
  if (!(await control.isChecked())) {
    throw new Error("Record did not become selected");
  }
  await canvas.getByRole("toolbar", {
    name: /Selected company actions|已选公司操作/,
  }).waitFor();
}

async function selectAllRecords({ canvas }) {
  const control = canvas.getByRole("checkbox", {
    name: /Select all companies|全选公司/,
  });
  await control.locator("..").click();
  if (!(await control.isChecked())) {
    throw new Error("Records select-all did not become checked");
  }
  await canvas.getByText(/26 companies selected|26 家公司已选择/).waitFor();
}

async function sortRecordsByInteraction({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Last interaction|最近互动/,
  });
  await control.click();
  const header = control.locator("..");
  if ((await header.getAttribute("aria-sort")) !== "ascending") {
    throw new Error("Records interaction sort did not become ascending");
  }
}

async function scrollRecordsTable({ canvas, page }) {
  const region = canvas.getByRole("region", {
    name: /Companies table|公司表格/,
  });
  const farColumn = canvas.getByRole("columnheader", { name: /Links|链接/ });
  const before = await farColumn.boundingBox();
  if (!before) throw new Error("Records scroll target was not visible");
  await region.hover();
  await page.mouse.wheel(900, 900);
  await region.focus();
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press("ArrowRight");
  }
  await page.keyboard.press("PageDown");
  const after = await farColumn.boundingBox();
  if (!after || after.x >= before.x) {
    throw new Error("Records table did not scroll horizontally");
  }
  await page.mouse.click(8, 8);
}

async function focusRecordsTable(args) {
  await focusTask10Control(
    args,
    args.canvas.getByRole("region", {
      name: /Companies table|公司表格/,
    }),
    "Records table",
  );
}

async function selectTaskFilter({ canvas }, name) {
  const control = canvas.getByRole("button", { name });
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Task filter did not become selected");
  }
}

async function scrollFilterTable({ canvas, page }) {
  const region = canvas.getByRole("region", {
    name: /Scrollable task table|可横向滚动的任务表格/,
  });
  const farColumn = canvas.getByRole("columnheader", { name: /Advisor|顾问/ });
  const before = await farColumn.boundingBox();
  if (!before) throw new Error("Task scroll target was not visible");
  await region.hover();
  await page.mouse.wheel(800, 0);
  await region.focus();
  for (let step = 0; step < 12; step += 1) {
    await page.keyboard.press("ArrowRight");
  }
  const after = await farColumn.boundingBox();
  if (!after || after.x >= before.x) {
    throw new Error("Task table did not scroll horizontally");
  }
  await page.mouse.click(8, 8);
}

async function focusTaskFilter(args) {
  await focusTask10Control(
    args,
    args.canvas.getByRole("button", {
      name: /^(In Progress|进行中)\s*2$/,
    }),
    "Task filter",
  );
}

async function expandSelectionToolbar({ canvas }) {
  await canvas.getByRole("button", {
    name: /Show more actions|展开更多操作/,
  }).click();
  const control = canvas.getByRole("button", {
    name: /Show fewer actions|收起更多操作/,
  });
  if ((await control.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Selection toolbar did not expand");
  }
}

async function promptSelectionToolbar({ canvas }) {
  const input = canvas.getByRole("textbox", {
    name: /Describe edits|描述修改要求/,
  });
  const label = await input.getAttribute("aria-label");
  const value = label === "描述修改要求" ? "改得更直接" : "Make it more direct";
  await input.fill(value);
  if ((await input.inputValue()) !== value) {
    throw new Error("Selection edit prompt did not retain its value");
  }
}

async function enableSelectionMotion({ advance, canvas, page }) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await advance(1);
  await advance(300);
  await canvas.getByRole("button", { name: /^(Improve|优化)$/ }).waitFor();
}

async function startSelectionRewrite(args) {
  await enableSelectionMotion(args);
  await args.canvas.getByRole("button", { name: /^(Improve|优化)$/ }).click();
  await args.canvas.getByText(/^(Improving|优化)…$/).waitFor();
}

async function streamSelectionRewrite(args) {
  await enableSelectionMotion(args);
  const { advance, canvas } = args;
  await canvas.getByRole("button", { name: /^(Improve|优化)$/ }).click();
  await advance(700);
  await advance(60);
  await canvas.getByText(/^(Improving|优化)…$/).waitFor();
  const visible = (await canvas.locator("[data-selection-text]").textContent())?.trim();
  if (!visible) throw new Error("Selection rewrite did not stream visible text");
}

async function finishSelectionRewrite(args) {
  await enableSelectionMotion(args);
  await args.canvas.getByRole("button", { name: /^(Improve|优化)$/ }).click();
  await args.advance(3200);
  await args.canvas.getByRole("button", { name: /^(Keep|保留)$/ }).waitFor();
}

async function keepSelectionRewrite(args) {
  await finishSelectionRewrite(args);
  await args.canvas.getByRole("button", { name: /^(Keep|保留)$/ }).click();
  await args.canvas.getByText(/Changes kept|已保留修改/).waitFor();
}

async function focusSelectionImprove(args) {
  await args.page.emulateMedia({ reducedMotion: "reduce" });
  await focusTask10Control(
    args,
    args.canvas.getByRole("button", { name: /^(Improve|优化)$/ }),
    "Selection Improve control",
  );
}

const TASK10_CASES = [
  [
    "artifact-sandbox",
    [
      { name: "preview", advanceMs: 0 },
      { name: "tablet", advanceMs: 0, action: (args) => chooseArtifactViewport(args, /Tablet|平板端/) },
      { name: "mobile", advanceMs: 0, action: (args) => chooseArtifactViewport(args, /Mobile|移动端/) },
      { name: "code", advanceMs: 0, action: openArtifactCode },
      { name: "copied", advanceMs: 0, action: copyArtifactCode },
      { name: "focused", advanceMs: 0, action: focusArtifactCode },
    ],
  ],
  [
    "diff-table",
    [
      { name: "initial", advanceMs: 0, action: showDiffInitial },
      { name: "removals", advanceMs: 0, action: showDiffRemovals },
      { name: "completed", advanceMs: 0, action: showDiffCompleted },
      { name: "partial-selected", advanceMs: 0, action: selectPartialDiff },
      { name: "applied", advanceMs: 0, action: applyPartialDiff },
      { name: "focused", advanceMs: 0, action: focusDiffApply },
    ],
  ],
  [
    "records-table",
    [
      { name: "initial", advanceMs: 0 },
      { name: "selected", advanceMs: 0, action: selectFirstRecord },
      { name: "all-selected", advanceMs: 0, action: selectAllRecords },
      { name: "sorted", advanceMs: 0, action: sortRecordsByInteraction },
      { name: "scrolled", advanceMs: 0, action: scrollRecordsTable },
      { name: "focused", advanceMs: 0, action: focusRecordsTable },
    ],
  ],
  [
    "filter-table",
    [
      { name: "all", advanceMs: 0 },
      { name: "todo", advanceMs: 0, action: (args) => selectTaskFilter(args, /^(To do|待办)\s*2$/) },
      { name: "progress", advanceMs: 0, action: (args) => selectTaskFilter(args, /^(In Progress|进行中)\s*2$/) },
      { name: "completed", advanceMs: 0, action: (args) => selectTaskFilter(args, /^(Completed|已完成)\s*1$/) },
      { name: "scrolled", advanceMs: 0, action: scrollFilterTable },
      { name: "focused", advanceMs: 0, action: focusTaskFilter },
    ],
  ],
  [
    "selection-actions",
    [
      { name: "idle", advanceMs: 300 },
      { name: "expanded", advanceMs: 300, action: expandSelectionToolbar },
      { name: "prompted", advanceMs: 300, action: promptSelectionToolbar },
      { name: "thinking", advanceMs: 300, action: startSelectionRewrite },
      { name: "streaming", advanceMs: 300, action: streamSelectionRewrite },
      { name: "result", advanceMs: 300, action: finishSelectionRewrite },
      { name: "kept", advanceMs: 300, action: keepSelectionRewrite },
      { name: "focused", advanceMs: 300, action: focusSelectionImprove },
    ],
  ],
];
/* TASK 10 VISUAL ACTIONS END */

/* TASK 11 VISUAL ACTIONS START */
async function assertTask11Target(control, label) {
  const box = await control.boundingBox();
  if (!box) throw new Error(`${label} is not visibly measurable`);
  if (box.width < 44 || box.height < 44) {
    throw new Error(
      `${label} hit area is ${box.width.toFixed(1)}×${box.height.toFixed(1)}; expected at least 44×44`,
    );
  }
}

async function focusTask11Control({ canvas, page }, control, label) {
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(`${label} did not receive visible keyboard focus`);
  }
  await assertTask11Target(control, label);
}

async function enableTask11AudioMotion({ advance, canvas, page }, milliseconds) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await advance(1);
  if (milliseconds > 0) await advance(milliseconds);
  await canvas.getByRole("status").getByText(/Speaking|回答中/).waitFor();
}

async function showTask11AudioInitial(args) {
  await enableTask11AudioMotion(args, 0);
}

async function showTask11AudioSettled(args) {
  await enableTask11AudioMotion(args, 2600);
}

async function restartTask11Recording({ canvas }) {
  await canvas.getByRole("button", { name: /End Voice|挂断通话/ }).click();
  const ended = canvas.getByRole("button", { name: /Voice ended|通话已结束/ });
  if (!(await ended.isDisabled())) {
    throw new Error("Ended voice action remained enabled");
  }
  const start = canvas.getByRole("button", {
    name: /Start voice conversation|开始语音对话/,
  });
  await assertTask11Target(start, "Audio recording control");
  await start.click();
  await canvas.getByText(/Listening to your request|正在聆听您的指令/).waitFor();
  const listening = canvas
    .getByRole("group", { name: /Voice state|语音状态/ })
    .getByRole("button", { name: /^(Listening|倾听中)$/ });
  if ((await listening.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Audio recording did not enter listening state");
  }
}

async function muteTask11Audio({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Mute microphone|将麦克风静音/,
  });
  await assertTask11Target(control, "Audio mute control");
  await control.click();
  const unmute = canvas.getByRole("button", {
    name: /Unmute microphone|取消麦克风静音/,
  });
  if ((await unmute.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Audio mute control did not become pressed");
  }
}

async function endTask11Audio({ canvas }) {
  await canvas.getByRole("button", { name: /End Voice|挂断通话/ }).click();
  const ended = canvas.getByRole("button", { name: /Voice ended|通话已结束/ });
  if (!(await ended.isDisabled())) {
    throw new Error("Ended voice action remained enabled");
  }
  await canvas.getByRole("status").getByText(/Idle|已就绪/).waitFor();
}

async function focusTask11Audio(args) {
  const control = args.canvas
    .getByRole("group", { name: /Voice state|语音状态/ })
    .getByRole("button", { name: /^(Listening|倾听中)$/ });
  await focusTask11Control(args, control, "Audio state control");
}

async function voteTask11Model({ canvas }, name) {
  const group = canvas.getByRole("group", {
    name: /Choose higher-quality response|选择更高质量的回答/,
  });
  const control = group.getByRole("button", { name });
  await assertTask11Target(control, "Arena vote control");
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Arena vote did not become pressed");
  }
  await canvas
    .getByRole("status")
    .getByText(/Preferences recorded for RLHF dataset|偏好投票已记录至 RLHF 训练数据集/)
    .waitFor();
}

async function voteTask11ModelA(args) {
  await voteTask11Model(args, /Model A Better|模型 A 更好/);
}

async function voteTask11Tie(args) {
  await voteTask11Model(args, /^(Tie|平手 \/ 均可)$/);
}

async function voteTask11ModelB(args) {
  await voteTask11Model(args, /Model B Better|模型 B 更好/);
}

async function focusTask11Arena(args) {
  const control = args.canvas.getByRole("button", {
    name: /Model A Better|模型 A 更好/,
  });
  await focusTask11Control(args, control, "Arena vote control");
}

async function showTask11CompareTooltip({ canvas }) {
  const chart = canvas.getByRole("group", {
    name: /Return comparison chart|收益对比趋势图/,
  });
  await chart.hover({ position: { x: 190, y: 88 } });
  await canvas.getByRole("tooltip").waitFor();
  if (!(await chart.getAttribute("aria-activedescendant"))) {
    throw new Error("Comparison chart did not expose its active point");
  }
}

async function openTask11Anomaly({ canvas }) {
  await canvas.getByRole("button", { name: /Next insight|下一条洞察/ }).click();
  await canvas.getByText(/High freezer spend|冷柜支出偏高/).waitFor();
}

async function selectTask11Usage(args) {
  await openTask11Anomaly(args);
  const control = args.canvas.getByRole("button", { name: /^(Usage|用电)$/ });
  await assertTask11Target(control, "Insight metric control");
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Usage metric did not become selected");
  }
}

async function showTask11UsageTooltip(args) {
  await selectTask11Usage(args);
  const chart = args.canvas.getByRole("group", {
    name: /Usage trend chart|用电趋势图/,
  });
  await chart.hover({ position: { x: 210, y: 88 } });
  await args.canvas.getByRole("tooltip").waitFor();
  if (!(await chart.getAttribute("aria-activedescendant"))) {
    throw new Error("Usage chart did not expose its active point");
  }
}

async function selectTask11Allocation({ canvas }) {
  const next = canvas.getByRole("button", { name: /Next insight|下一条洞察/ });
  await next.click();
  await next.click();
  const control = canvas.getByRole("button", { name: "Chocolate: 22.8%" });
  await assertTask11Target(control, "Allocation segment");
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Chocolate allocation did not become selected");
  }
  await canvas.getByText("$16,278").waitFor();
}

async function focusTask11Insight(args) {
  const control = args.canvas.getByRole("button", {
    name: /Next insight|下一条洞察/,
  });
  await focusTask11Control(args, control, "Insight pager control");
}

async function openTask11Alternatives({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /^(Alternatives|备选方案)$/,
  });
  await assertTask11Target(control, "Recommendation alternatives control");
  await control.click();
  if ((await control.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Recommendation alternatives remained collapsed");
  }
  await canvas.getByText(/Alternative Actions|备选方案/).first().waitFor();
}

async function selectTask11Review(args) {
  await openTask11Alternatives(args);
  const control = args.canvas.getByRole("button", {
    name: /Switch to vanilla_madagascar|切换为马达加斯加香草配方/,
  });
  await assertTask11Target(control, "Recommendation alternative");
  await control.click();
  await args.canvas.getByRole("button", { name: /Configure|配置参数/ }).waitFor();
}

async function acceptTask11Recommendation({ canvas }) {
  const control = canvas.getByRole("button", { name: /^(Accept|采纳建议)$/ });
  await assertTask11Target(control, "Recommendation accept control");
  await control.click();
  const accepted = canvas.getByRole("button", { name: /Accepted|已采纳/ });
  if (!(await accepted.isDisabled())) {
    throw new Error("Accepted recommendation remained actionable");
  }
  if ((await accepted.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Accepted recommendation did not become pressed");
  }
  await canvas
    .getByRole("status")
    .getByText(/Recommendation accepted|建议已采纳/)
    .waitFor();
}

async function focusTask11Recommendation(args) {
  const control = args.canvas.getByRole("button", { name: /^(Accept|采纳建议)$/ });
  await focusTask11Control(args, control, "Recommendation accept control");
}

var task11InsightCases = [
  { name: "initial", advanceMs: 0, action: captureTask13InsightInitial },
  { name: "compare-selected", advanceMs: 0, action: selectTask13ComparePoint },
  { name: "anomaly", advanceMs: 0, action: openTask13Anomaly },
  { name: "usage-selected", advanceMs: 0, action: selectTask13UsagePoint },
  { name: "allocation-selected", advanceMs: 0, action: selectTask13Allocation },
  { name: "followup-submitted", advanceMs: 0, action: submitTask13InsightFollowup },
];
if (!TASK13_VISUAL_RUNNER) {
  var task11InsightCases = [
    { name: "initial", advanceMs: 0 },
    { name: "settled", advanceMs: 2600 },
    { name: "compare-tooltip", advanceMs: 0, action: showTask11CompareTooltip },
    { name: "anomaly", advanceMs: 0, action: openTask11Anomaly },
    { name: "usage", advanceMs: 0, action: selectTask11Usage },
    { name: "usage-tooltip", advanceMs: 0, action: showTask11UsageTooltip },
    { name: "allocation-selected", advanceMs: 0, action: selectTask11Allocation },
    { name: "focused", advanceMs: 0, action: focusTask11Insight },
  ];
}
const TASK11_CASES = [
  [
    "audio-orb",
    [
      { name: "initial", advanceMs: 0, action: showTask11AudioInitial },
      { name: "settled", advanceMs: 0, action: showTask11AudioSettled },
      { name: "recording", advanceMs: 0, action: restartTask11Recording },
      { name: "muted", advanceMs: 0, action: muteTask11Audio },
      { name: "ended", advanceMs: 0, action: endTask11Audio },
      { name: "focused", advanceMs: 0, action: focusTask11Audio },
    ],
  ],
  [
    "model-arena",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 2600 },
      { name: "voted-a", advanceMs: 0, action: voteTask11ModelA },
      { name: "voted-tie", advanceMs: 0, action: voteTask11Tie },
      { name: "voted-b", advanceMs: 0, action: voteTask11ModelB },
      { name: "focused", advanceMs: 0, action: focusTask11Arena },
    ],
  ],
  ["insight-cards", task11InsightCases],
  [
    "recommendation-card",
    [
      { name: "initial", advanceMs: 0 },
      { name: "settled", advanceMs: 2600 },
      { name: "alternatives-open", advanceMs: 0, action: openTask11Alternatives },
      { name: "review-selected", advanceMs: 0, action: selectTask11Review },
      { name: "accepted", advanceMs: 0, action: acceptTask11Recommendation },
      { name: "focused", advanceMs: 0, action: focusTask11Recommendation },
    ],
  ],
];
/* TASK 11 VISUAL ACTIONS END */

/* TASK 12 VISUAL ACTIONS START */
async function assertTask12Target(control, label) {
  const box = await control.boundingBox();
  if (!box) throw new Error(`${label} is not visibly measurable`);
  if (box.width < 44 || box.height < 44) {
    throw new Error(
      `${label} hit area is ${box.width.toFixed(1)}×${box.height.toFixed(1)}; expected at least 44×44`,
    );
  }
}

async function focusTask12Control({ canvas, page }, control, label) {
  await control.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  if ((await control.and(canvas.locator(":focus-visible")).count()) !== 1) {
    throw new Error(`${label} did not receive visible keyboard focus`);
  }
  await assertTask12Target(control, label);
}

async function revealTask12Sensitive({ canvas }) {
  const control = canvas.getByRole("button", { name: /Reveal token|显示令牌/ });
  await assertTask12Target(control, "Sensitive reveal control");
  await control.click();
  const hiddenControl = canvas.getByRole("button", { name: /Hide token|隐藏令牌/ });
  if ((await hiddenControl.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Sensitive reveal control did not become pressed");
  }
  const input = canvas.getByRole("textbox", {
    name: /DeepSeek API Token \(Production\)|DeepSeek API Token \(生产环境\)/,
  });
  if ((await input.getAttribute("type")) !== "text") {
    throw new Error("Sensitive token remained masked after reveal");
  }
}

async function copyTask12Sensitive({ canvas, page }) {
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  const control = canvas.getByRole("button", { name: /Copy token|复制令牌/ });
  await assertTask12Target(control, "Sensitive copy control");
  await control.click();
  await canvas.getByText(/Copied!|已复制!/).waitFor();
}

async function failTask12SensitiveCopy({ canvas, page }) {
  await page.context().clearPermissions();
  try {
    await canvas.getByRole("button", { name: /Copy token|复制令牌/ }).click();
    await canvas.getByText(/Copy failed|复制失败/).waitFor();
  } finally {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  }
}

async function focusTask12Sensitive(args) {
  const control = args.canvas.getByRole("button", {
    name: /Reveal token|显示令牌/,
  });
  await focusTask12Control(args, control, "Sensitive reveal control");
}

async function showTask12LayerEvents({ canvas }) {
  const control = canvas.getByRole("tab", {
    name: /Live Audit Events|实时审计事件/,
  });
  await assertTask12Target(control, "Layer events tab");
  await control.click();
  if ((await control.getAttribute("aria-selected")) !== "true") {
    throw new Error("Layer events tab did not become selected");
  }
  await canvas.getByRole("tabpanel", { name: /Live Audit Events|实时审计事件/ }).waitFor();
}

async function collapseTask12Layer({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Collapse Harness Edge Worker details|折叠 Harness 边缘工作节点详情/,
  });
  await assertTask12Target(control, "Layer disclosure control");
  await control.click();
  const expandedControl = canvas.getByRole("button", {
    name: /Expand Harness Edge Worker details|展开 Harness 边缘工作节点详情/,
  });
  if ((await expandedControl.getAttribute("aria-expanded")) !== "false") {
    throw new Error("Layer disclosure remained expanded");
  }
}

async function focusTask12Layer(args) {
  const control = args.canvas.getByRole("button", {
    name: /Collapse Harness Edge Worker details|折叠 Harness 边缘工作节点详情/,
  });
  await focusTask12Control(args, control, "Layer disclosure control");
}

async function searchTask12Sidebar({ canvas }) {
  const search = canvas.getByRole("searchbox", {
    name: /Quick search navigation|快速搜索导航/,
  });
  const searchLabel = await search.getAttribute("aria-label");
  await search.fill(searchLabel === "快速搜索导航" ? "供应" : "supplier");
  await canvas.getByRole("button", { name: /Suppliers|供应商/ }).waitFor();
  if ((await canvas.getByRole("button", { name: /Agent tasks|智能体任务/ }).count()) !== 0) {
    throw new Error("Sidebar quick search did not filter navigation rows");
  }
  await canvas
    .getByRole("status", { name: /Navigation search status|导航搜索状态/ })
    .getByText(/1 navigation result|1 个导航结果/)
    .waitFor();
}

async function focusTask12Sidebar(args) {
  const control = args.canvas.getByRole("button", { name: /Agent tasks|智能体任务/ });
  await focusTask12Control(args, control, "Sidebar navigation row");
}

async function fillTask12SeasonalSearch(search) {
  const searchLabel = await search.getAttribute("aria-label");
  await search.fill(searchLabel === "搜索风味" ? "季节" : "seasonal");
}

async function searchTask12Results({ canvas }) {
  const search = canvas.getByRole("combobox", { name: /Search flavors|搜索风味/ });
  await fillTask12SeasonalSearch(search);
  await canvas.getByRole("option", { name: /Compare seasonal flavors|对比季节限定口味/ }).waitFor();
}

async function chooseTask12Search({ canvas, page }) {
  const search = canvas.getByRole("combobox", { name: /Search flavors|搜索风味/ });
  await fillTask12SeasonalSearch(search);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await canvas
    .getByRole("status", { name: /Search status|搜索状态/ })
    .getByText(/Selected Compare seasonal flavors|已选择 对比季节限定口味/)
    .waitFor();
  const selected = canvas.getByRole("option", {
    name: /Compare seasonal flavors|对比季节限定口味/,
  });
  if ((await selected.getAttribute("aria-selected")) !== "true") {
    throw new Error("Search result did not become selected");
  }
}

async function emptyTask12Search({ canvas }) {
  await canvas.getByRole("combobox", { name: /Search flavors|搜索风味/ }).fill("q");
  await canvas.getByText(/No results found|未找到相关结果/).waitFor();
}

async function focusTask12Search(args) {
  const control = args.canvas.getByRole("combobox", {
    name: /Search flavors|搜索风味/,
  });
  await focusTask12Control(args, control, "Search combobox");
}

async function showTask12SessionActivity({ advance, canvas, page }) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await advance(1);
  await advance(2600);
  await canvas.getByLabel(/2 unread events|2 条未读事件/).last().waitFor();
}

async function selectTask12Session({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Audit supplier import jobs|审计供应商导入任务/,
  });
  await assertTask12Target(control, "Session row");
  await control.click();
  if ((await control.getAttribute("aria-current")) !== "page") {
    throw new Error("Selected session did not become current");
  }
}

async function focusTask12Session(args) {
  const control = args.canvas.getByRole("button", {
    name: /Audit supplier import jobs|审计供应商导入任务/,
  });
  await focusTask12Control(args, control, "Session row");
}

async function openTask12Authorization({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Sign in to deepseek|登录 deepseek/,
  });
  await assertTask12Target(control, "Authorization sign-in control");
  await control.click();
  const input = canvas.getByRole("textbox", { name: /Access token|访问令牌/ });
  if ((await input.getAttribute("type")) !== "password") {
    throw new Error("Authorization credential did not open masked");
  }
}

async function revealTask12Authorization(args) {
  await openTask12Authorization(args);
  const control = args.canvas.getByRole("button", {
    name: /Reveal token|显示令牌/,
  });
  await assertTask12Target(control, "Authorization reveal control");
  await control.click();
  const hiddenControl = args.canvas.getByRole("button", {
    name: /Hide token|隐藏令牌/,
  });
  if ((await hiddenControl.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Authorization reveal control did not become pressed");
  }
}

async function revokeTask12Authorization({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Sign out of openai|退出 openai/,
  });
  await assertTask12Target(control, "Authorization revoke control");
  await control.click();
  await canvas
    .getByRole("status", { name: /Authorization status|授权状态/ })
    .getByText(/Revoked openai|已撤销 openai/)
    .waitFor();
}

async function focusTask12Authorization(args) {
  const control = args.canvas.getByRole("button", {
    name: /Sign in to deepseek|登录 deepseek/,
  });
  await focusTask12Control(args, control, "Authorization sign-in control");
}

async function editTask12Settings({ canvas }) {
  const editor = canvas.getByRole("textbox", { name: /Settings JSON|设置 JSON/ });
  await editor.fill('{\n  "theme": "dark"\n}');
  await canvas
    .getByRole("status", { name: /Settings status|设置状态/ })
    .getByText(/Editing|编辑中/)
    .waitFor();
}

async function saveTask12Settings({ advance, canvas }) {
  await editTask12Settings({ canvas });
  const control = canvas.getByRole("button", {
    name: /Save revision|保存 revision/,
  });
  await assertTask12Target(control, "Settings save control");
  await control.click();
  await advance(650);
  await canvas
    .getByRole("status", { name: /Settings status|设置状态/ })
    .getByText(/Saved revision 8|已保存 revision 8/)
    .waitFor();
}

async function focusTask12Settings(args) {
  const control = args.canvas.getByRole("textbox", {
    name: /Settings JSON|设置 JSON/,
  });
  await focusTask12Control(args, control, "Settings editor");
}

async function selectTask12Layout({ canvas }) {
  const control = canvas.getByRole("button", { name: "col layout" });
  await assertTask12Target(control, "Layout segment");
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Layout segment did not become pressed");
  }
}

async function tuneTask12Radius({ canvas, page }) {
  const control = canvas.getByRole("slider", { name: /Radius|圆角/ });
  await assertTask12Target(control, "Radius slider");
  await control.focus();
  await page.keyboard.press("End");
  if ((await control.getAttribute("aria-valuenow")) !== "64") {
    throw new Error("Radius slider did not reach its End value");
  }
  await canvas
    .getByRole("status", { name: /Tuning status|调优状态/ })
    .getByText(/Edited|已编辑/)
    .waitFor();
}

async function openTask12TypeMenu({ canvas }) {
  const control = canvas.getByRole("button", {
    name: /Select flavor type|选择风味类型/,
  });
  await assertTask12Target(control, "Type menu control");
  await control.click();
  if ((await control.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Type menu remained closed");
  }
  await canvas.getByRole("listbox", { name: /Flavor type|风味类型/ }).waitFor();
}

async function selectTask12Type(args) {
  await openTask12TypeMenu(args);
  const control = args.canvas.getByRole("option", { name: /Seasonal|季节限定/ });
  await assertTask12Target(control, "Type option");
  await control.click();
  await args.canvas
    .getByRole("status", { name: /Tuning status|调优状态/ })
    .getByText(/Edited|已编辑/)
    .waitFor();
}

async function focusTask12FineTune(args) {
  const control = args.canvas.getByRole("slider", { name: /Radius|圆角/ });
  await focusTask12Control(args, control, "Radius slider");
}

const TASK12_CASES = [
  [
    "sensitive-input",
    [
      { name: "masked", advanceMs: 0 },
      { name: "revealed", advanceMs: 0, action: revealTask12Sensitive },
      { name: "copied", advanceMs: 0, action: copyTask12Sensitive },
      { name: "copy-error", advanceMs: 0, action: failTask12SensitiveCopy },
      { name: "focused", advanceMs: 0, action: focusTask12Sensitive },
    ],
  ],
  [
    "layer-card",
    [
      { name: "metrics", advanceMs: 0 },
      { name: "events", advanceMs: 0, action: showTask12LayerEvents },
      { name: "collapsed", advanceMs: 0, action: collapseTask12Layer },
      { name: "focused", advanceMs: 0, action: focusTask12Layer },
    ],
  ],
  [
    "sidebar-nav",
    [
      { name: "selected", advanceMs: 0 },
      { name: "searched", advanceMs: 0, action: searchTask12Sidebar },
      { name: "focused", advanceMs: 0, action: focusTask12Sidebar },
    ],
  ],
  [
    "search",
    [
      { name: "initial", advanceMs: 0 },
      { name: "results", advanceMs: 0, action: searchTask12Results },
      { name: "chosen", advanceMs: 0, action: chooseTask12Search },
      { name: "empty", advanceMs: 0, action: emptyTask12Search },
      { name: "focused", advanceMs: 0, action: focusTask12Search },
    ],
  ],
  [
    "session-list",
    [
      { name: "initial", advanceMs: 0 },
      { name: "activity", advanceMs: 0, action: showTask12SessionActivity },
      { name: "selected", advanceMs: 0, action: selectTask12Session },
      { name: "focused", advanceMs: 0, action: focusTask12Session },
    ],
  ],
  [
    "authorization-surface",
    [
      { name: "directory", advanceMs: 0 },
      { name: "masked", advanceMs: 0, action: openTask12Authorization },
      { name: "revealed", advanceMs: 0, action: revealTask12Authorization },
      { name: "provider-switched", advanceMs: 0, action: switchAuthorizationProvider },
      { name: "authorized", advanceMs: 0, action: settleAuthorization },
      { name: "revoked", advanceMs: 0, action: revokeTask12Authorization },
      { name: "focused", advanceMs: 0, action: focusTask12Authorization },
    ],
  ],
  [
    "settings-editor",
    [
      { name: "initial", advanceMs: 0 },
      { name: "editing", advanceMs: 0, action: editTask12Settings },
      { name: "saved", advanceMs: 0, action: saveTask12Settings },
      { name: "conflict", advanceMs: 0, action: reachSettingsConflict },
      { name: "refetched", advanceMs: 0, action: refetchSettings },
      { name: "focused", advanceMs: 0, action: focusTask12Settings },
    ],
  ],
  [
    "fine-tune-card",
    [
      { name: "initial", advanceMs: 0 },
      { name: "layout-selected", advanceMs: 0, action: selectTask12Layout },
      { name: "tuned", advanceMs: 0, action: tuneTask12Radius },
      { name: "menu-open", advanceMs: 0, action: openTask12TypeMenu },
      { name: "type-selected", advanceMs: 0, action: selectTask12Type },
      { name: "focused", advanceMs: 0, action: focusTask12FineTune },
    ],
  ],
];
/* TASK 12 VISUAL ACTIONS END */

/* TASK 13 VISUAL ACTIONS START */
async function captureTask13ApprovalCustom({ canvas }) {
  await fillApprovalCustom(canvas);
  const submit = canvas.getByRole("button", {
    name: /Next question|继续下一题/,
  });
  if (await submit.isDisabled()) {
    throw new Error("Approval custom answer did not enable the footer action");
  }
  const progress = canvas.getByRole("button", {
    name: /Go to question 1|转到第 1 题/,
  });
  if ((await progress.getAttribute("aria-current")) !== "step") {
    throw new Error("Approval progress did not expose the current question");
  }
  await assertApprovalHitAreas(canvas);
}

async function captureTask13ApprovalProgress({ canvas, page }) {
  await fillApprovalCustom(canvas);
  await canvas
    .getByRole("button", { name: /Next question|继续下一题/ })
    .click();
  const progress = canvas.getByRole("button", {
    name: /Go to question 2|转到第 2 题/,
  });
  if ((await progress.getAttribute("aria-current")) !== "step") {
    throw new Error("Approval footer did not advance to question 2");
  }
  const chocolate = canvas.getByRole("checkbox", {
    name: /Chocolate chips|黑巧碎粒/,
  });
  await chocolate.locator("..").click();
  if (!(await chocolate.isChecked())) {
    throw new Error("Approval progress state did not retain its selection");
  }
  await page.mouse.move(0, 0);
  await page.waitForTimeout(100);
  await freezeCaseMotion(canvas);
  await assertApprovalHitAreas(canvas);
}

async function waitForTask13StreamingMotion({ canvas, page }) {
  await page.waitForTimeout(550);
  await freezeCaseMotion(canvas);
}

async function captureTask13StreamingFollowups(args) {
  await waitForStreamingSettled(args);
  if ((await args.canvas.getByRole("button", { name: "Action" }).count()) !== 4) {
    throw new Error("Streaming actions did not match the React action row");
  }
  await args.canvas.getByText(/Follow-ups|猜您想问/).waitFor();
  const followUps = args.canvas.getByRole("button").filter({
    hasText: /Which flavors sell best|Compare gelato|冬季哪些冰淇淋|对比意式硬冰/,
  });
  if ((await followUps.count()) !== 2) {
    throw new Error("Streaming follow-ups did not expose two prompts");
  }
  await waitForTask13StreamingMotion(args);
}

async function openTask13StreamingSources(args) {
  await openStreamingSources(args);
  await waitForTask13StreamingMotion(args);
}

function task13PromptInput(canvas) {
  return canvas.getByRole("textbox", { name: /Prompt|提示词输入框/ });
}

async function stopTask13PromptCanvas(page) {
  await page.evaluate(() => {
    const realRequestAnimationFrame = window.requestAnimationFrame;
    const realCancelAnimationFrame = window.cancelAnimationFrame;
    let sequence = -1;
    const callbacks = new Map();
    window.requestAnimationFrame = (callback) => {
      const id = sequence;
      sequence -= 1;
      callbacks.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = (id) => callbacks.delete(id);
    globalThis.__naiTask13PromptCanvasRestore = () => {
      callbacks.clear();
      window.requestAnimationFrame = realRequestAnimationFrame;
      window.cancelAnimationFrame = realCancelAnimationFrame;
      Reflect.deleteProperty(globalThis, "__naiTask13PromptCanvasRestore");
    };
  });
  await page.waitForTimeout(100);
  await page.evaluate(() => globalThis.__naiTask13PromptCanvasRestore?.());
}

async function composeTask13Prompt({ canvas, page }) {
  await stopTask13PromptCanvas(page);
  await freezeCaseMotion(canvas);
  const input = task13PromptInput(canvas);
  await input.click();
  const label = await input.getAttribute("aria-label");
  const value = label === "提示词输入框" ? "对比开心果周末销量" : "Compare pistachio weekends";
  await input.fill(value);
  if ((await input.inputValue()) !== value) {
    throw new Error("Prompt composer did not retain its draft");
  }
  const model = canvas.getByRole("button", { name: /Choose model|选择模型/ });
  if (!(await model.textContent())?.includes("Vanilla 1")) {
    throw new Error("Prompt composer did not start on Vanilla 1");
  }
  await settleTask13PromptFrame(canvas, page);
  await page.waitForTimeout(100);
}

async function settleTask13PromptFrame(canvas, page) {
  await page.waitForTimeout(550);
  await freezeCaseMotion(canvas);
  await page.waitForTimeout(100);
}

async function openTask13PromptModel({ canvas, page }) {
  const model = canvas.getByRole("button", { name: /Choose model|选择模型/ });
  await model.click();
  if ((await model.getAttribute("aria-expanded")) !== "true") {
    throw new Error("Prompt model picker remained closed");
  }
  await page.mouse.move(0, 0);
  await canvas.getByText(/Flagship|旗舰/).waitFor();
  await canvas.getByText(/Basic|基础/).waitFor();
  await canvas.getByText(/Stale|过时/).waitFor();
  await settleTask13PromptFrame(canvas, page);
}

async function connectTask13Prompt({ canvas, page }) {
  const input = task13PromptInput(canvas);
  await input.click();
  await input.fill("@gmail");
  const connect = canvas.getByRole("button", {
    exact: true,
    name: /^(Connect|连接)$/,
  });
  await connect.click();
  await canvas.getByText(/^(Connected|已连接)$/).waitFor();
  if ((await input.inputValue()) !== "@gmail") {
    throw new Error("Prompt connection action replaced the composer token");
  }
  await page.mouse.move(0, 0);
  await settleTask13PromptFrame(canvas, page);
}

async function selectTask13PromptModel({ canvas, page }) {
  await composeTask13Prompt({ canvas, page });
  await openTask13PromptModel({ canvas, page });
  await canvas
    .getByRole("button", { name: /Sprinkles 5/ })
    .last()
    .evaluate((element) => element.click());
  const model = canvas.getByRole("button", { name: /Choose model|选择模型/ });
  if (!(await model.textContent())?.includes("Sprinkles 5")) {
    throw new Error("Prompt model selection did not update the composer");
  }
  await page.mouse.click(0, 0);
  await page.waitForTimeout(100);
  await task13PromptInput(canvas).focus();
  await page.waitForTimeout(100);
  await settleTask13PromptFrame(canvas, page);
}

async function submitTask13Prompt({ canvas, page }) {
  await composeTask13Prompt({ canvas, page });
  await canvas.getByRole("button", { name: /Send|发送/ }).click();
  if ((await task13PromptInput(canvas).inputValue()) !== "") {
    throw new Error("Prompt submission did not clear the composer");
  }
  await settleTask13PromptFrame(canvas, page);
}

async function installTask13InsightClock({ page }) {
  await page.evaluate(() => {
    if (globalThis.__naiTask13InsightClock) {
      throw new Error("Insight animation clock was already installed");
    }

    const realRequestAnimationFrame = window.requestAnimationFrame;
    const realCancelAnimationFrame = window.cancelAnimationFrame;
    const ownPerformanceNow = Object.getOwnPropertyDescriptor(
      window.performance,
      "now",
    );
    let now = 1;
    let sequence = -1;
    const callbacks = new Map();

    Object.defineProperty(window.performance, "now", {
      configurable: true,
      value: () => now,
    });
    window.requestAnimationFrame = (callback) => {
      const id = sequence;
      sequence -= 1;
      callbacks.set(id, callback);
      return id;
    };
    window.cancelAnimationFrame = (id) => callbacks.delete(id);

    globalThis.__naiTask13InsightClock = {
      flush(frameCount) {
        let ran = 0;
        for (let frame = 0; frame < frameCount; frame += 1) {
          now += 1000 / 60;
          const frameCallbacks = [...callbacks.values()];
          callbacks.clear();
          for (const callback of frameCallbacks) callback(now);
          ran += frameCallbacks.length;
        }
        return { pending: callbacks.size, ran };
      },
      restore() {
        callbacks.clear();
        window.requestAnimationFrame = realRequestAnimationFrame;
        window.cancelAnimationFrame = realCancelAnimationFrame;
        if (ownPerformanceNow) {
          Object.defineProperty(window.performance, "now", ownPerformanceNow);
        } else {
          Reflect.deleteProperty(window.performance, "now");
        }
        Reflect.deleteProperty(globalThis, "__naiTask13InsightClock");
      },
    };
  });
}

async function clickTask13InsightControl(page, control) {
  await control.evaluate((element) => element.click());
  await page.evaluate(
    () => new Promise((resolve) => window.__naiRealSetTimeout(resolve, 0)),
  );
}

async function prepareTask13Compare(args) {
  await installTask13InsightClock(args);
  await clickTask13InsightControl(
    args.page,
    args.canvas.getByRole("button", { name: /Next insight|下一条洞察/ }),
  );
  await clickTask13InsightControl(
    args.page,
    args.canvas.getByRole("button", { name: /Previous insight|上一条洞察/ }),
  );
}

async function prepareTask13Anomaly(args) {
  await installTask13InsightClock(args);
  await clickTask13InsightControl(
    args.page,
    args.canvas.getByRole("button", { name: /Next insight|下一条洞察/ }),
  );
}

async function settleTask13InsightFrame({ canvas, page }) {
  await page.mouse.move(0, 0);
  const hasClock = await page.evaluate(
    () => Boolean(globalThis.__naiTask13InsightClock),
  );

  try {
    if (hasClock) {
      const chartCanvas = canvas.locator("canvas").first();
      let ready = false;
      for (let attempt = 0; attempt < 20; attempt += 1) {
        await page.evaluate(
          () => new Promise((resolve) => window.__naiRealSetTimeout(resolve, 0)),
        );
        await page.evaluate(() => globalThis.__naiTask13InsightClock.flush(1));
        ready =
          (await chartCanvas.count()) > 0 &&
          (await chartCanvas.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            const scale = window.devicePixelRatio || 1;
            return (
              rect.width > 0 &&
              rect.height > 0 &&
              element.width === Math.round(rect.width * scale) &&
              element.height === Math.round(rect.height * scale) &&
              Boolean(element.style.width) &&
              Boolean(element.style.height)
            );
          }));
        if (ready) break;
      }
      if (!ready) {
        throw new Error("Insight chart canvas did not become measurable");
      }

      await page.evaluate(() => globalThis.__naiTask13InsightClock.flush(120));
    }
    await page.waitForTimeout(550);
    await freezeCaseMotion(canvas);
  } finally {
    if (hasClock) {
      await page.evaluate(() => globalThis.__naiTask13InsightClock?.restore());
    }
  }
  await page.waitForTimeout(100);
}

async function captureTask13InsightInitial(args) {
  await prepareTask13Compare(args);
  await settleTask13InsightFrame(args);
}

async function selectTask13ComparePoint({ canvas, page }) {
  await prepareTask13Compare({ canvas, page });
  await settleTask13InsightFrame({ canvas, page });
  await page.waitForTimeout(100);
  const chart = canvas.getByRole("group", {
    name: /Return comparison chart|收益对比趋势图/,
  });
  await chart.click({ position: { x: 190, y: 88 } });
  await page.mouse.move(0, 0);
  await canvas.getByRole("tooltip").waitFor();
  if (!(await chart.getAttribute("aria-activedescendant"))) {
    throw new Error("Comparison chart selection did not persist after pointer leave");
  }
  await settleTask13InsightFrame({ canvas, page });
}

async function selectTask13UsagePoint({ canvas, page }) {
  await prepareTask13Anomaly({ canvas, page });
  await freezeCaseMotion(canvas);
  await page.waitForTimeout(100);
  await clickTask13InsightControl(
    page,
    canvas.getByRole("button", { name: /^(Usage|用电)$/ }),
  );
  await settleTask13InsightFrame({ canvas, page });
  const chart = canvas.getByRole("group", {
    name: /Usage trend chart|用电趋势图/,
  });
  await chart.focus();
  await page.keyboard.press("End");
  await canvas.getByRole("tooltip").waitFor();
  if (!(await chart.getAttribute("aria-activedescendant"))?.endsWith("-point-7")) {
    throw new Error("Usage chart keyboard selection did not reach the final point");
  }
  await settleTask13InsightFrame({ canvas, page });
}

async function submitTask13InsightFollowup({ canvas, page }) {
  await prepareTask13Compare({ canvas, page });
  const followUp = canvas.getByRole("button", {
    name: /Should I rebalance flavors|需要重新平衡口味组合吗/,
  });
  await clickTask13InsightControl(page, followUp);
  const submitted = canvas.getByRole("button", {
    name: /Question added|问题已添加/,
  });
  if (!(await submitted.isDisabled())) {
    throw new Error("Submitted insight follow-up remained actionable");
  }
  await canvas
    .getByRole("status")
    .getByText(/Follow-up question added|后续问题已添加/)
    .waitFor();
  await settleTask13InsightFrame({ canvas, page });
}

async function openTask13Anomaly(args) {
  await prepareTask13Anomaly(args);
  await settleTask13InsightFrame(args);
}

async function selectTask13Allocation({ canvas, page }) {
  const next = canvas.getByRole("button", { name: /Next insight|下一条洞察/ });
  await next.click();
  await next.click();
  const control = canvas.getByRole("button", { name: "Chocolate: 22.8%" });
  await freezeCaseMotion(canvas);
  await page.waitForTimeout(100);
  await control.click();
  if ((await control.getAttribute("aria-pressed")) !== "true") {
    throw new Error("Chocolate allocation did not become selected");
  }
  await canvas.getByText("$16,278").waitFor();
  await settleTask13InsightFrame({ canvas, page });
}

/* TASK 13 VISUAL ACTIONS END */

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
  /* TASK 8 VISUAL REGISTRATIONS START */
  ...TASK8_CASES,
  /* TASK 8 VISUAL REGISTRATIONS END */
  /* TASK 9 VISUAL REGISTRATIONS START */
  ...TASK9_CASES,
  /* TASK 9 VISUAL REGISTRATIONS END */
  /* TASK 10 VISUAL REGISTRATIONS START */
  ...TASK10_CASES,
  /* TASK 10 VISUAL REGISTRATIONS END */
  /* TASK 11 VISUAL REGISTRATIONS START */
  ...TASK11_CASES,
  /* TASK 11 VISUAL REGISTRATIONS END */
/* TASK 12 VISUAL REGISTRATIONS START */
  ...TASK12_CASES,
  /* TASK 12 VISUAL REGISTRATIONS END */
  /* TASK 4 VISUAL REGISTRATIONS START */
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
