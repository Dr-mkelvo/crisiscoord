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
/command
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
|                       | Notifications                    | - ack/escalation      |
|                       | Audit                            |                      |
+----------------------+----------------------------------+----------------------+
```

Mobile layout:

- incident summary first
- notification and decision card second
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
- compact provider/feed health badges
- optional global command/search access
- notification bell with unread decision count

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
- input read and output posted in the details drawer
- Band message or event reference
- missing facts and next dependency

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
- handoff topology map
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

- All communications start as draft-only. No real external sending in the demo unless a safe test-recipient provider is explicitly configured.

### 5. Notifications

Purpose:

- Show where human escalation and approved communication packages go.

Includes:

- in-app notifications
- Band notification messages
- current owner and backup owner
- acknowledgement deadline
- escalation ladder
- delivery attempts
- simulated email/SMS/internal channel status

The key visual is the ladder:

```text
Primary owner notified
  -> waiting for acknowledgement
  -> backup owner if no acknowledgement
  -> incident commander if still unacknowledged
```

This tab should answer: "If the person is asleep, what happens next?"

### 6. Audit

Purpose:

- Show traceability for regulated workflows.

Includes:

- filterable audit table
- evidence table
- provider/model metadata
- Band references
- human decisions
- notification attempts
- communication delivery log

This is where tables belong.

### Source Feed Rail

Purpose:

- Show real source snapshots without making the Command Room look like a generic threat dashboard.

Includes:

- CISA KEV, NVD, EPSS, OSV, GitHub Advisories, SEC EDGAR, openFDA, or seeded source snapshots when relevant
- source name
- matched entity
- retrieved timestamp
- confidence
- live/cached/seeded label
- link to the Evidence And Audit source snapshot

Rule:

- External source data enriches the incident. It does not replace Band handoffs, Legal findings, Technical findings, or human decisions.

## Tables To Use

Use tables only where comparison, filtering, or audit review matters. Do not place a big table as the main hero of the product.

### Incident Registry Table

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
/audit
/command -> Audit tab
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

### Notification Attempts Table

Route or tab:

```text
/audit
/command -> Notifications tab
```

Columns:

- timestamp
- owner or audience
- channel
- provider
- status
- acknowledgement deadline
- acknowledged at
- escalation level
- simulated or live
- provider reference

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
- assigned owner
- acknowledgement status
- escalation ladder preview
- notify owner / acknowledge / escalate actions
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
9. Notify owner, acknowledge, approve, request revision, or escalate.
10. Queue a simulated communication package after approval.
11. Open Audit to see the recorded trail and delivery log.

## What Not To Add Yet

Avoid these in the first build:

- broad analytics dashboard
- organization admin area beyond integration status
- user management screens
- status-page publishing
- real evidence upload
- real customer notification sending outside safe test-recipient mode
- postmortem builder
- complex charts
- too many metrics

## MVP Page Set

Keep the same seven-route plan, but build depth in this order:

1. `/command` - command room
2. `/signals` - signal intake and sandbox launcher
3. `/incidents` - incident registry
4. `/communications` - expanded draft review
5. `/decisions` - decision desk
6. `/audit` - expanded audit/evidence
7. `/settings` - integrations and system health

## Acceptance Criteria

- A judge can understand the current incident in under 10 seconds.
- The dependency gate is visible without narration.
- Band handoffs are visible as messages/events, not hidden backend calls.
- Tables appear only where they support review.
- The right decision desk always shows what the human needs to do next.
- Notification and acknowledgement status are visible without leaving the command room.
- Agent nodes explain inputs, outputs, source confidence, and why escalation happened.
- Mobile view makes decisions possible without reading a dense dashboard.
- Tablet view stays usable without squeezed three-column panels.
- The page passes mobile, tablet, laptop, and desktop screenshot checks once the app exists.
