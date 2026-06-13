# Figma Repair Spec

Last updated: June 13, 2026.

## Current State

The current Figma file exists:

[CrisisCoord UI Sketches - Responsive Workspaces](https://www.figma.com/design/TvJbJSgxMEnanM4DuCRi0L)

The file is not yet usable as the final UI sketch set.

What exists:

- color/token board
- local paint and text styles
- editable component references

What is wrong:

- component examples were placed at page level and overlap the token board
- the seven workspace triptychs were not generated
- required screenshots were not captured
- the Figma MCP call quota on the selected Starter team blocked cleanup and further generation
- the selected Figma Starter team also limits the file to three physical pages

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
- global command/search bar
- operational status strip
- status badge
- severity badge
- provider/feed status badge
- agent rail item
- Band timeline item
- handoff topology map
- dependency gate
- decision card
- draft review panel
- audit/event ledger row
- source/intel feed item
- signal source card
- readiness/provider status card
- mobile bottom action bar
- last-updated/confidence label

See [live-data-ui-components.md](./live-data-ui-components.md) for placement rules.

## Workspace Frame Content

### 01 Signal Intake And Sandbox Launcher

Desktop:

- global command bar
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
- handoff topology map
- Band timeline
- Communications dependency gate
- decision desk
- compact source feed

Tablet:

- compact incident bar
- agent rail as horizontal/accordion row
- timeline
- decision panel below

Mobile:

- incident summary
- active decision card
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
- approve/revise/escalate actions

Tablet:

- draft preview plus facts/warnings stack

Mobile:

- draft card
- facts used chips
- missing fact warning
- review actions

### 05 Decision Desk

Desktop:

- pending decision queue
- decision detail
- risk of approving
- risk of waiting
- facts used

Tablet:

- two-column decision cards

Mobile:

- one primary decision
- approve, request more facts, escalate
- next decisions below

### 06 Evidence And Audit

Desktop:

- event ledger table
- source snapshots
- provider/model metadata
- Band references
- export action

Tablet:

- timeline cards and compact metadata

Mobile:

- audit timeline cards
- export action lower in flow

### 07 Integrations And Demo Readiness

Desktop:

- provider/feed status grid
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
