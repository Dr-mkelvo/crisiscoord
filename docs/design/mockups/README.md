# CrisisCoord Static UI Mockups

Last updated: June 13, 2026.

This folder contains an editable static HTML/CSS design board for the first CrisisCoord UI direction.

Use it as a visual reference before creating or polishing Figma frames. It is not production app code.

## Files

- [index.html](./index.html): all mockup frames.
- [styles.css](./styles.css): palette, layout, and component styling.
- [screenshots](./screenshots): exported PNG references.
- [../ui-design-mockups.md](../ui-design-mockups.md): screenshot gallery for GitHub review.

## Frames

The mockup board covers:

1. Color system and component tokens.
2. Signal Intake And Sandbox Launcher.
3. Incident Registry.
4. Crisis Command Room.
5. Communications Review.
6. Decision Desk.
7. Evidence And Audit.
8. Integrations And Demo Readiness.

## Design Intent

The palette should feel like a calm regulated operations room:

- graphite/deep navy app shell
- light readable work surfaces
- blue/cyan for Band coordination
- amber/orange for risk and missing facts
- red for critical severity and failures
- green for approval and completion
- purple for human review and escalation

Every status still needs a label or icon. Color alone is not enough.

## Export

From the repository root:

```bash
NODE_PATH=/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
  /Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/export-ui-mockups.cjs
```
