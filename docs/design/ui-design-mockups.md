# UI Design Mockups

Last updated: June 13, 2026.

These static mockups turn the CrisisCoord color system and seven-workspace UI plan into visual references for Figma.

They are not production app code. Use them to guide layout, color, density, and interaction states before building React screens.

## Source

- [mockups/index.html](./mockups/index.html)
- [mockups/styles.css](./mockups/styles.css)
- [mockups/README.md](./mockups/README.md)

## Screenshots

Screenshots are exported into [mockups/screenshots](./mockups/screenshots).

Current references:

### Color System

![Color system](./mockups/screenshots/color-system.png)

### Signal Intake And Sandbox Launcher

![Signal Intake And Sandbox Launcher](./mockups/screenshots/signals.png)

### Incident Registry

![Incident Registry](./mockups/screenshots/incidents.png)

### Crisis Command Room

![Crisis Command Room](./mockups/screenshots/command-room.png)

### Communications Review

![Communications Review](./mockups/screenshots/communications.png)

### Decision Desk

![Decision Desk](./mockups/screenshots/decision-desk.png)

### Evidence And Audit

![Evidence And Audit](./mockups/screenshots/audit.png)

### Integrations And Demo Readiness

![Integrations And Demo Readiness](./mockups/screenshots/settings.png)

## Export Command

Run this after editing [mockups/index.html](./mockups/index.html) or [mockups/styles.css](./mockups/styles.css):

```bash
NODE_PATH=/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules \
  /Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  scripts/export-ui-mockups.cjs
```

## Design Notes

The visual system uses:

- graphite/deep navy app shell
- light readable work panels
- blue/cyan for active Band coordination
- amber/orange for waiting, risk, and missing facts
- red for critical or failed states
- green for approved or complete states
- purple for human review and escalation

Every state should pair color with text. Do not rely on color alone.

## Figma Starting Point

Start by recreating these frames:

1. Color system board.
2. Signal Intake And Sandbox Launcher.
3. Incident Registry.
4. Crisis Command Room.
5. Communications Review.
6. Decision Desk mobile frame.
7. Evidence And Audit.
8. Integrations And Demo Readiness.

The Crisis Command Room remains the hero frame. Other pages should support the demo story without becoming broad admin dashboards.
