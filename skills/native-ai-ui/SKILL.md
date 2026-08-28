---
name: native-ai-ui
description: Use when designing or implementing AI chat, copilots, agent workflows, reasoning traces, tool calls, approvals, streaming output, context or memory, multimodal ingestion, message branches, or checkpoints on web, SwiftUI, Jetpack Compose, desktop, or terminal interfaces.
---

# Native AI UI

Design AI interfaces that expose what the system is doing, settle into quiet summaries, and keep consequential decisions with the user.

## Workflow

1. Identify the target platform, the decision the user must make, and every applicable live, settled, failed, and recovery state.
2. Read [design-principles.md](references/design-principles.md) and [tokens.md](references/tokens.md) completely.
3. Read [component-catalog.md](references/component-catalog.md) and choose the smallest set of patterns that communicates those states honestly.
4. Read [native-adaptation.md](references/native-adaptation.md) completely only for SwiftUI, Jetpack Compose, desktop-native, or terminal work.
5. Inspect [native-chat.html](assets/preview/native-chat.html) only when a visual reference materially helps.
6. For React, install exact items from the current `eanzhao-os/native-ai-ui` registry URLs in the catalog. Treat demos as behavioral references and connect them to real application state.

## Implementation Contract

- Use semantic tokens only. Define every color in light and dark themes; pair status ink with its tint instead of relying on raw color.
- Distinguish live, settled, failed, cancelled, and retrying states. Keep partial output visible when recovery is possible.
- Announce asynchronous status through the platform accessibility API without repeatedly interrupting the user.
- Preserve keyboard operation, visible focus, reduced-motion behavior, and text or icon cues that do not depend on color.
- Keep model, source, tool, branch, checkpoint, and permission context inspectable whenever it changes the user's decision.
- Require explicit confirmation for destructive, privileged, costly, or externally visible actions. Show the exact scope, keep cancel safe, prevent duplicate submission, and report the result.
- Add bilingual copy when requested; keep accessible names localized with visible labels.

## Completion Check

Verify:

- the selected patterns cover the user's decision without duplicate surfaces;
- token pairs work in light and dark modes;
- live work settles, failures explain recovery, and destructive actions require confirmation;
- keyboard, screen-reader, narrow-layout, and reduced-motion paths remain complete;
- native targets use native controls and terminal targets document keys, focus, interruption, and typed confirmation.
