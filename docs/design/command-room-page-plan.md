# Command Room Page Plan

Last updated: June 13, 2026.

## Recommendation

The best first product screen is not a generic dashboard. It is a crisis command room focused on one active incident.

Use [final-ui-ux-brief.md](./final-ui-ux-brief.md) as the final design brief for how this page should feel, where it sits in the business workflow, and which routes should exist before the project expands.

The normal user should understand three things immediately:

1. What happened?
2. What is each agent doing or waiting on?
3. What needs a human decision?

Everything else should support those three questions.

## Route

```text
/incidents/:incidentId
```

## Primary Layout

Desktop layout:

```text
+--------------------------------------------------------------------------------+
| Incident bar: title, severity, phase, deadline, last refresh, demo mode         |
+----------------------+----------------------------------+----------------------+
| Agent rail            | Main workspace                   | Decision desk         |
| - Assessment          | Tabs:                            | - required approval   |
| - Legal               | Overview                         | - draft status        |
| - Technical           | Handoffs                         | - missing facts       |
| - Communications      | Findings                         | - provider proof      |
| - Escalation          | Drafts                           | - fallback banner     |
|                       | Audit                            |                      |
+----------------------+----------------------------------+----------------------+
```

Mobile layout:

- incident summary first
- decision card second
- agent status accordion third
- timeline and audit collapsed behind tabs
- no dense table above the fold

Tablet layout:

- keep the incident bar first
- collapse the agent rail into a compact horizontal rail, drawer, or accordion
- move the decision desk below the main workspace or into a persistent review panel
- avoid forcing the full three-column desktop layout into tablet width

See [../platform-support.md](../platform-support.md) for viewport targets and responsive acceptance criteria.

## Top Incident Bar

Must include:

- incident title
- severity
- current phase
- disclosure/deadline clock
- affected data category chips
- current demo mode: `live`, `assisted`, or `seeded`
- last refreshed time
- safe synthetic-data label

Do not include fake KPI tiles. This is not a metrics dashboard.

## Agent Rail

The left rail should show all five agents as stable rows:

- Crisis Assessment
- Legal & Regulatory
- Technical Forensics
- Stakeholder Communications
- Escalation & Decision

Each row includes:

- icon
- status
- provider badge when model-backed
- last output timestamp
- blocker text when blocked

Agent row example:

```text
Communications
Blocked
Waiting for Legal + Technical
```

## Main Workspace Tabs

Use tabs inside the command room rather than creating too many top-level pages.

### 1. Overview

Purpose:

- Give the judge/operator the whole story in one glance.

Includes:

- Band room timeline preview
- current handoff
- latest Legal and Technical summaries
- Communications dependency gate
- active human decision

This is the default tab for the 60-90 second demo.

### 2. Handoffs

Purpose:

- Prove Band is the collaboration layer, not a wrapper.

Includes:

- agent dependency graph
- @mention handoff list
- required inputs per agent
- blocked/running/complete state per handoff
- Band message/event IDs when available

Critical visual:

```text
Assessment
  -> Legal
  -> Technical
Legal + Technical
  -> Communications
All findings
  -> Escalation + Human decision
```

### 3. Findings

Purpose:

- Show the reviewable outputs that later agents depend on.

Includes:

- Legal obligations card
- Technical scope card
- unknowns/missing facts
- confidence
- source references
- review status

Do not make this a long legal memo. Use cards and expandable details.

### 4. Drafts

Purpose:

- Review communications after the dependency gate unlocks.

Includes:

- regulator draft
- customer draft
- executive update
- facts used
- missing facts
- legal warnings
- approve/request changes/escalate actions

Rule:

- All communications are draft-only. No external sending in the demo.

### 5. Audit

Purpose:

- Show traceability for regulated workflows.

Includes:

- filterable audit table
- evidence table
- provider/model metadata
- Band references
- human decisions

This is where tables belong.

## Tables To Use

Use tables only where comparison, filtering, or audit review matters. Do not place a big table as the main hero of the product.

### Incident Queue Table

Route:

```text
/incidents
```

Columns:

- severity
- incident title
- type
- phase
- deadline
- decision status
- owner
- last update
- action

### Audit Events Table

Route or tab:

```text
/incidents/:incidentId/audit
/incidents/:incidentId -> Audit tab
```

Columns:

- timestamp
- actor
- event type
- source
- summary
- confidence
- review status
- provider/model
- Band reference

### Evidence Table

Columns:

- evidence ID
- source type
- source name
- fact extracted
- confidence
- owner
- review status
- linked agent output

### Provider Diagnostics Table

Route:

```text
/settings
```

Columns:

- provider
- configured
- default model
- last successful call
- latency
- last failure
- demo fallback ready

## Right Decision Desk

The right panel is the product's safety center.

Must include:

- active decision request
- reason the decision is needed
- recommendation summary
- risks of approving
- risks of waiting
- approve/request revision/escalate buttons
- audit event preview

For the MVP, there should be one main decision:

> Should we proactively notify customers before every detail is confirmed?

## Happy Path

The user should be able to complete this flow with minimal instruction:

1. Open the demo incident.
2. See Assessment complete.
3. Watch Legal and Technical run in parallel.
4. See Communications blocked.
5. See Legal and Technical findings appear.
6. See Communications unlock.
7. Review one draft.
8. See Escalation ask for a human decision.
9. Approve, request revision, or escalate.
10. Open Audit to see the recorded trail.

## What Not To Add Yet

Avoid these in the first build:

- broad analytics dashboard
- organization admin area beyond integration status
- user management screens
- status-page publishing
- real evidence upload
- real customer notification sending
- postmortem builder
- complex charts
- too many metrics

## MVP Page Set

Keep the same seven-route plan, but build depth in this order:

1. `/incidents/:incidentId` - command room
2. `/incidents/new` - scenario launcher
3. `/incidents` - incident queue
4. `/decisions` - mobile-friendly decision queue
5. `/incidents/:incidentId/communications` - expanded draft review
6. `/incidents/:incidentId/audit` - expanded audit/evidence
7. `/settings` - integration and demo readiness

## Acceptance Criteria

- A judge can understand the current incident in under 10 seconds.
- The dependency gate is visible without narration.
- Band handoffs are visible as messages/events, not hidden backend calls.
- Tables appear only where they support review.
- The right decision desk always shows what the human needs to do next.
- Mobile view makes decisions possible without reading a dense dashboard.
- Tablet view stays usable without squeezed three-column panels.
- The page passes mobile, tablet, laptop, and desktop screenshot checks once the app exists.
