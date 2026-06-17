# Figma Repair Spec

Last updated: June 13, 2026.

## Current State

The current Figma file exists:

[CrisisCoord UI Sketches - Responsive Workspaces](https://www.figma.com/design/TvJbJSgxMEnanM4DuCRi0L)

The file now has a clean fallback responsive board on the page `01 Responsive Workspaces`.

What exists:

- color/token board
- local paint and text styles
- editable component references
- imported responsive board with seven workspace sections, four tabs per workspace, and desktop/tablet/mobile frames for every tab state
- source-controlled SVG generator for the imported board

What is still limited:

- component examples were placed at page level and overlap the token board
- the Figma MCP call quota on the selected Starter team blocked native cleanup and component-frame generation
- the selected Figma Starter team also limits the file to three physical pages
- the current responsive board is an SVG import fallback, not the final native Figma component-library pass

## Required Repair

The product plan stays the same. We need seven app workspaces, but each workspace needs real tabs. Each tab must have desktop, tablet, and mobile sketches.

Current target:

- 7 top-level routes
- 4 tabs per route
- 28 tab states
- 84 responsive frames total

Correct structure:

```text
00 Cover And Tokens
01 Signal Intake And Sandbox Launcher
  Signals: Desktop / Tablet / Mobile
  Scenarios: Desktop / Tablet / Mobile
  Redaction: Desktop / Tablet / Mobile
  Launch Review: Desktop / Tablet / Mobile
02 Incident Registry
  Queue: Desktop / Tablet / Mobile
  Details: Desktop / Tablet / Mobile
  Owners: Desktop / Tablet / Mobile
  Deadlines: Desktop / Tablet / Mobile
03 Crisis Command Room
  Overview: Desktop / Tablet / Mobile
  Agents: Desktop / Tablet / Mobile
  Messaging: Desktop / Tablet / Mobile
  Decisions: Desktop / Tablet / Mobile
04 Communications Review
  Drafts: Desktop / Tablet / Mobile
  Email: Desktop / Tablet / Mobile
  SMS: Desktop / Tablet / Mobile
  Delivery Log: Desktop / Tablet / Mobile
05 Decision Desk
  Pending: Desktop / Tablet / Mobile
  Evidence Needed: Desktop / Tablet / Mobile
  Escalations: Desktop / Tablet / Mobile
  Resolved: Desktop / Tablet / Mobile
06 Evidence And Audit
  Timeline: Desktop / Tablet / Mobile
  Evidence: Desktop / Tablet / Mobile
  Agent Reasoning: Desktop / Tablet / Mobile
  Exports: Desktop / Tablet / Mobile
07 Integrations And Operations
  Providers: Desktop / Tablet / Mobile
  Notification Channels: Desktop / Tablet / Mobile
  Security Controls: Desktop / Tablet / Mobile
  System Health: Desktop / Tablet / Mobile
```

If the team remains on Figma Starter, use this fallback physical-page structure:

```text
00 Cover And Tokens
01 Responsive Tab-State Matrix
  01 Signal Intake section with four tab rows
  02 Incident Registry section with four tab rows
  03 Crisis Command Room section with four tab rows
  04 Communications Review section with four tab rows
  05 Decision Desk section with four tab rows
  06 Evidence And Audit section with four tab rows
  07 Integrations And Operations section with four tab rows
02 States And References
```

The fallback still keeps the seven workspaces separate as clearly labeled sections. Tabs do not increase the top-level route count. See [page-tabs-and-action-overlays.md](./page-tabs-and-action-overlays.md).

## Fallback Repair Asset

The current fallback board source lives at:

- [figma-imports/crisiscoord-responsive-triptychs.svg](./figma-imports/crisiscoord-responsive-triptychs.svg)
- [../../scripts/generate-figma-triptych-svg.mjs](../../scripts/generate-figma-triptych-svg.mjs)

Run this command to regenerate the import asset:

```bash
node scripts/generate-figma-triptych-svg.mjs
```

Then paste or import the SVG into the Figma page named `01 Responsive Workspaces` or a clean replacement page named `01 Responsive Tab-State Matrix`.

## Layout Rules

Each workspace section should have four tab rows. Each tab row should have a horizontal responsive triptych:

```text
Tab name
Desktop frame | Tablet frame | Mobile frame
```

Use these frame sizes:

- desktop: `1440 x 960`
- tablet: `834 x 1112`
- mobile: `390 x 844`

Place sections vertically with enough spacing that designers can zoom and review one tab state at a time.

## Components To Use

The repaired Figma frames must include:

- app shell
- sidebar and mobile drawer
- top bar
- notification bell
- Notification Center drawer
- global command/search bar
- operational status strip
- status badge
- severity badge
- provider/feed status badge
- agent rail item
- Band timeline item
- agent conversation map
- agent detail drawer
- handoff/dependency map
- dependency gate
- decision card
- human escalation ladder
- draft review panel
- outbound communication composer
- notification delivery log
- audit/event ledger row
- source/intel feed item
- signal source card
- readiness/provider status card
- mobile bottom action bar
- last-updated/confidence label
- page-level tabs with selected tab content
- thread inbox and selected-message panel
- email/SMS composer tab state
- delivery status and attempt log
- contextual drawer or modal where a tab alone is not enough
- provider setup drawer

See [live-data-ui-components.md](./live-data-ui-components.md) for placement rules.

See [../product/interaction-and-notification-model.md](../product/interaction-and-notification-model.md) for button behavior, notification destinations, human escalation, and agent-node meaning.

See [page-tabs-and-action-overlays.md](./page-tabs-and-action-overlays.md) for the tab map and action-state rules.

## Workspace Frame Content

### 01 Signal Intake And Sandbox Launcher

Desktop:

- global command bar
- notification bell
- source cards
- live source feed
- sandbox selector
- synthetic crisis signal input
- expected agents preview
- launch command room action

Tablet:

- compact source cards
- sandbox selector
- launch action
- source-health strip

Mobile:

- signal summary
- sandbox chips
- launch action
- source feed as stacked cards
- mobile bottom action bar

### 02 Incident Registry

Desktop:

- operational status strip
- notification count for unacknowledged decisions
- lean incident table
- deadline-risk and decision-needed filters

Tablet:

- compact incident list
- status strip
- filter chips

Mobile:

- incident cards
- decision/deadline badges
- no dense table above fold

### 03 Crisis Command Room

Desktop:

- incident bar
- agent rail
- agent conversation map
- Band timeline
- Communications dependency gate
- agent detail drawer entry point
- decision desk
- notification center preview
- human escalation ladder
- compact source feed

Tablet:

- compact incident bar
- agent rail as horizontal/accordion row
- timeline
- decision panel below

Mobile:

- incident summary
- active decision card
- acknowledgement and escalation status
- agent accordion
- timeline cards
- mobile bottom action bar

### 04 Communications Review

Desktop:

- draft selector
- generated draft
- facts used
- missing facts
- legal warnings
- approve/revise/escalate/queue actions
- recipient safety warning
- simulated-send status
- outbound communication composer

Tablet:

- draft preview plus facts/warnings stack

Mobile:

- draft card
- facts used chips
- missing fact warning
- review actions
- simulated-send badge

### 05 Decision Desk

Desktop:

- pending decision queue
- decision detail
- risk of approving
- risk of waiting
- facts used
- assigned owner
- acknowledgement timer
- escalation ladder
- notify/escalate controls

Tablet:

- two-column decision cards

Mobile:

- one primary decision
- approve, request more facts, escalate
- acknowledge action
- owner and escalation status
- next decisions below

### 06 Evidence And Audit

Desktop:

- event ledger table
- source snapshots
- provider/model metadata
- Band references
- notification attempts
- outbound communication delivery log
- human acknowledgements
- export action

Tablet:

- timeline cards and compact metadata

Mobile:

- audit timeline cards
- export action lower in flow

### 07 Integrations And Operations

Desktop:

- provider/feed status grid
- email provider status
- SMS provider status
- internal channel connector status
- last successful run
- seeded fallback mode
- safe diagnostics

Tablet:

- two-column provider cards

Mobile:

- stacked provider cards
- test/fallback actions

## Validation

After repair, capture screenshots for:

- desktop Crisis Command Room
- tablet Crisis Command Room
- mobile Decision Desk
- desktop Signal Intake

Then verify:

- no text overflow
- no dense mobile tables above the fold
- color is not the only status cue
- Command Room clearly shows Band handoff and Communications blocked/unblocked logic
- components are editable, not screenshot-only

## Blocker

As of June 13, 2026, Figma MCP operations are blocked by the selected Starter team's tool-call quota. Repair can continue when:

- the quota resets,
- the team upgrades, or
- a new Figma file is created in a plan with enough pages and MCP quota.
