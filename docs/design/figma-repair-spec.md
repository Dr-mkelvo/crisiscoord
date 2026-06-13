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
- imported responsive board with seven workspace sections and desktop, tablet, and mobile versions
- source-controlled SVG generator for the imported board

What is still limited:

- component examples were placed at page level and overlap the token board
- the Figma MCP call quota on the selected Starter team blocked native cleanup and component-frame generation
- the selected Figma Starter team also limits the file to three physical pages
- the current responsive board is an SVG import fallback, not the final native Figma component-library pass

## Required Repair

The product plan stays the same. We need seven app workspaces, and each workspace must have desktop, tablet, and mobile sketches.

Correct structure:

```text
00 Cover And Tokens
01 Signal Intake And Sandbox Launcher
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
02 Incident Registry
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
03 Crisis Command Room
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
04 Communications Review
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
05 Decision Desk
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
06 Evidence And Audit
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
07 Integrations And Demo Readiness
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844
08 Interaction States And References
```

If the team remains on Figma Starter, use this fallback physical-page structure:

```text
00 Cover And Tokens
01 Workspace Triptychs
  01 Signal Intake section
  02 Incident Registry section
  03 Crisis Command Room section
  04 Communications Review section
  05 Decision Desk section
  06 Evidence And Audit section
  07 Integrations And Demo Readiness section
02 States And References
```

The fallback still keeps the seven workspaces separate as clearly labeled sections.

## Fallback Repair Asset

The current fallback board source lives at:

- [figma-imports/crisiscoord-responsive-triptychs.svg](./figma-imports/crisiscoord-responsive-triptychs.svg)
- [../../scripts/generate-figma-triptych-svg.mjs](../../scripts/generate-figma-triptych-svg.mjs)

Run this command to regenerate the import asset:

```bash
node scripts/generate-figma-triptych-svg.mjs
```

Then paste or import the SVG into the Figma page named `01 Responsive Workspaces`.

## Layout Rules

Each workspace section should be a horizontal triptych:

```text
Desktop frame | Tablet frame | Mobile frame
```

Use these frame sizes:

- desktop: `1440 x 960`
- tablet: `834 x 1112`
- mobile: `390 x 844`

Place sections vertically with enough spacing that designers can zoom and review one workspace at a time.

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
- agent reasoning drawer
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

See [live-data-ui-components.md](./live-data-ui-components.md) for placement rules.

See [../product/interaction-and-notification-model.md](../product/interaction-and-notification-model.md) for button behavior, notification destinations, human escalation, and agent-node meaning.

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
- agent reasoning drawer entry point
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

### 07 Integrations And Demo Readiness

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
