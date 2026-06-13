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
6. The audit trail preserved who said what and why.

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
  Overview | Handoffs | Findings | Drafts | Audit

Right decision desk
  active human decision
  risks of approving
  risks of waiting
  approve / request revision / escalate
```

Mobile:

```text
Incident summary
Active decision card
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
6. Desktop audit tab: provider metadata and Band references.
7. Mobile command room: active decision state.
8. Settings: partner/demo readiness diagnostics.

## Required Components

- incident bar
- agent rail row
- Band timeline item
- handoff/dependency gate
- legal finding card
- technical finding card
- draft review panel
- decision card
- audit event row
- provider badge
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

- the six Figma frames exist
- the command-room wireframe is updated from those frames if needed
- the final color tokens are applied
- the mobile decision flow is reviewed
- the first static React screen is built from synthetic fixture data
