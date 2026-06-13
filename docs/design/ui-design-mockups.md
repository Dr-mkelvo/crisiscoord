# UI Design Mockups

Last updated: June 13, 2026.

These static mockups turn the CrisisCoord color system and seven-workspace UI plan into visual references for Figma.

They are not production app code. Use them to guide layout, color, density, and interaction states before building React screens.

For the newer live-data patterns inspired by external cybersecurity references, use [live-data-ui-components.md](./live-data-ui-components.md). Those additions stay inside the existing seven workspaces.

## Source

- [mockups/index.html](./mockups/index.html)
- [mockups/styles.css](./mockups/styles.css)
- [mockups/README.md](./mockups/README.md)
- [figma-imports/crisiscoord-responsive-triptychs.svg](./figma-imports/crisiscoord-responsive-triptychs.svg)
- [../../scripts/generate-figma-triptych-svg.mjs](../../scripts/generate-figma-triptych-svg.mjs)

## Editable Figma File

- [CrisisCoord UI Sketches - Responsive Workspaces](https://www.figma.com/design/TvJbJSgxMEnanM4DuCRi0L)

Current Figma status:

- Created in Dr_Mkelvo's team.
- Contains the color/token board, paint and text styles, and local editable component references.
- Uses the Starter-plan fallback structure because the selected Figma team is limited by MCP quota.
- Live canvas update completed on June 13, 2026: the old board was replaced through the Figma browser UI with the generated global responsive board.
- The current source of truth for the responsive board is [figma-imports/crisiscoord-responsive-triptychs.svg](./figma-imports/crisiscoord-responsive-triptychs.svg).
- That generated board has seven workspace sections and three responsive versions per section: desktop, tablet, and mobile.
- The generated board now includes the action layer: Notification Center, acknowledgement ladder, Communications delivery package, agent reasoning map, and simulated provider status.
- Re-import the generated SVG into Figma whenever the source changes, so the team does not rebuild the structure by hand.
- A later native Figma component pass should rebuild the same structure as true Figma frames/components once MCP write access is available again.

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

Start from the `01 Responsive Workspaces` board in Figma or from the generated SVG import asset. It includes:

1. Signal Intake And Sandbox Launcher: desktop, tablet, mobile.
2. Incident Registry: desktop, tablet, mobile.
3. Crisis Command Room: desktop, tablet, mobile.
4. Communications Review: desktop, tablet, mobile.
5. Decision Desk: desktop, tablet, mobile.
6. Evidence And Audit: desktop, tablet, mobile.
7. Integrations And Demo Readiness: desktop, tablet, mobile.

The Crisis Command Room remains the hero frame. Other pages should support the demo story without becoming broad admin dashboards.
