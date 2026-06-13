# Final UI/UX Build Brief

Last updated: June 13, 2026.

## Recommendation

Build one excellent crisis command room first.

Do not build a broad admin portal. Do not start with file upload. Do not create a marketing landing page as the main screen.

The UI should feel like:

- a calm enterprise incident room
- an audit-ready legal/compliance workspace
- a Band-mediated agent handoff surface
- a human decision cockpit

It should not feel like:

- a generic SOC dashboard
- a spreadsheet tool
- a chatbot
- a file-analysis app
- a dark cyber template with labels changed

## Business Position

CrisisCoord sits between existing business systems and human crisis leadership.

```text
Security / vendor / support / legal signals
  -> CrisisCoord crisis room
  -> Band-mediated agent coordination
  -> Human legal, technical, communications, and executive decisions
  -> Approved updates back to business tools later
```

It is not replacing SIEM, SOAR, GRC, legal counsel, incident commanders, ticketing, or communications platforms.

It is the coordination layer that makes cross-functional crisis response visible, reviewable, and auditable.

## Competitor-Informed UI Direction

Use these lessons:

- Incident-management tools win with timelines, owners, status, and tasks.
- Adjacent Band demos win when the agent handoff is visible.
- Upload-first demos look narrow and make the product feel like document analysis.
- Large KPI dashboards are weaker than one clear operational workflow.
- The dependency gate should be the visual centerpiece.

The UI should prove:

1. A crisis signal started the room.
2. Assessment recruited the right agents.
3. Legal and Technical worked from shared context.
4. Communications waited for required findings.
5. Escalation created a human decision.
6. The system notified the right human owner and tracked acknowledgement.
7. Approved communications were queued or simulated safely.
8. The audit trail preserved who said what, who was notified, what was approved, and why.

## Visual Style

Use the color direction the team liked from the darker competitor/reference work, but apply it in a more enterprise-safe way:

- graphite or deep navy shell for focus
- light, readable content panels
- electric blue/cyan for active Band coordination
- amber for risk, waiting, and missing evidence
- red for critical severity or failed runs
- green for completion and approval
- purple only for human-review emphasis

Keep the palette restrained. The product should look serious and premium, not neon or decorative.

The first visual mockups and screenshot gallery live in [ui-design-mockups.md](./ui-design-mockups.md). Use them as inspiration for the Figma frames, not as final locked UI.

The UI interaction rules live in [../product/interaction-and-notification-model.md](../product/interaction-and-notification-model.md). Treat that document as the source of truth for button behavior, notification destinations, human escalation, agent-node meaning, and demo sandbox count.

The editable Figma file is [CrisisCoord UI Sketches - Responsive Workspaces](https://www.figma.com/design/TvJbJSgxMEnanM4DuCRi0L). The page `01 Responsive Workspaces` contains the repaired responsive sketch board: seven workspace sections, each with desktop, tablet, and mobile versions.

The repaired board was imported from [figma-imports/crisiscoord-responsive-triptychs.svg](./figma-imports/crisiscoord-responsive-triptychs.svg) because the selected Figma Starter team is still blocking MCP write calls. Treat it as the clean visual baseline for UI planning. When MCP write access is available again, rebuild the same layout as native Figma frames/components.

Live-data UI components inspired by external references are documented in [live-data-ui-components.md](./live-data-ui-components.md). They do not change the page count. They add real source feeds, search, status strips, event ledgers, provider health, mobile action navigation, and confidence labels to the existing seven workspaces.

The Figma repair target is documented in [figma-repair-spec.md](./figma-repair-spec.md). The correct structure is seven workspace triptychs: desktop, tablet, and mobile for each existing page.

## Page Count

Best recommendation: seven real workspaces.

Do not count incident creation as a standalone page. Starting an incident is an action inside Signal Intake, because the product should feel like an enterprise crisis workspace, not a form collection.

The seven-workspace model is:

1. `/signals` - Signal Intake And Sandbox Launcher
2. `/incidents` - Incident Registry
3. `/incidents/:incidentId` - Crisis Command Room
4. `/incidents/:incidentId/communications` - Communications Review
5. `/decisions` - Decision Desk
6. `/incidents/:incidentId/audit` - Evidence And Audit
7. `/settings` - Integrations And Demo Readiness

This is the best balance between depth and scope. It gives the team enough real pages to make the product feel complete, while still keeping the first build focused on one excellent command-room workflow.

For the first demo, the command room remains the primary screen. Signal Intake, Communications, Decision Desk, Audit, and Settings can start as lighter pages that support the main story.

## Command Room Layout

Desktop:

```text
Top incident bar
  severity | phase | active clock | data category | demo mode | provider status

Left agent rail
  Assessment
  Legal
  Technical
  Communications
  Escalation

Center workspace
  Overview | Handoffs | Findings | Drafts | Notifications | Audit

Right decision desk
  active human decision
  assigned owner and acknowledgement state
  risks of approving
  risks of waiting
  approve / request revision / notify / escalate
```

Mobile:

```text
Incident summary
Active decision card
Notification and acknowledgement status
Agent status accordion
Overview timeline
Draft and audit tabs
```

Tablet:

```text
Incident bar
Compact agent rail
Main workspace
Decision panel below or drawer
```

## First Figma Frames

Create these before frontend polish:

1. Desktop signal intake: sandbox launcher and incoming signal sources.
2. Desktop command room: overview tab.
3. Desktop command room: communications blocked state.
4. Desktop command room: communications unlocked with draft review.
5. Desktop communications review: draft needs approval.
6. Desktop communications review: approved draft queued for simulated send.
7. Desktop audit tab: provider metadata, Band references, and notification delivery log.
8. Mobile command room: active decision and escalation ladder.
9. Settings: partner/demo readiness diagnostics.

## Required Components

- incident bar
- agent rail row
- agent detail drawer
- Band timeline item
- global command/search bar
- notification bell
- Notification Center drawer
- operational status strip
- handoff/dependency gate
- handoff topology map
- legal finding card
- technical finding card
- draft review panel
- outbound communication composer
- notification delivery log
- escalation ladder
- decision card
- source/intel feed item
- audit event row
- provider badge
- provider/feed status card
- last-updated/confidence label
- mobile bottom action bar
- demo mode banner
- redaction/synthetic-data badge
- loading, blocked, failed, fallback, and needs-review states

## State Model

Every agent and workflow element must support:

- waiting
- running
- blocked
- complete
- failed
- needs review
- approved
- rejected
- fallback

Color cannot be the only status cue. Use label, icon, and supporting text.

## Responsive Rule

The product must work on:

- mobile
- tablet
- laptop
- desktop
- wide desktop

Mobile is not a mini desktop. On mobile, the user should be able to see the incident summary, understand the active human decision, and approve/request revision/escalate without scanning dense tables.

## What Will Impress Judges

The strongest UI moment is not a chart.

The strongest UI moment is this:

```text
Communications Agent
Blocked: waiting for Legal + Technical

Legal complete.
Technical complete.

Communications unlocked.
Draft created.

Escalation asks for human decision.
Audit trail records the whole chain.
```

Make that sequence obvious without narration.

## What To Avoid

- fake metrics
- giant charts
- huge page count
- decorative hero screen
- upload-first interaction
- hidden agent work
- generic AI chat panel
- legal advice phrasing
- dark-blue dashboard monotony
- tiny mobile tables
- status colors without text

## UI Readiness

UI planning is **82 / 100** ready.

It becomes 95 / 100 ready when:

- the 26-frame responsive Figma baseline exists
- the required desktop, tablet, mobile, and signal-intake screenshots are captured from Figma
- the command-room wireframe is updated from those frames if needed
- the final color tokens are applied
- the mobile decision flow is reviewed
- the first static React screen is built from synthetic fixture data
