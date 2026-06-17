# Live-Data UI Components

Last updated: June 13, 2026.

## Purpose

This document captures the useful UI ideas from cybersecurity dashboard references without changing CrisisCoord's product shape.

We are not adding pages. We are adding better components to the seven existing workspaces.

## What To Borrow

Borrow the operational patterns:

- search across real identifiers
- compact status strips
- source/feed health
- event timelines
- confidence labels
- dependency topology
- notification center
- acknowledgement ladder
- delivery status log
- mobile action navigation
- provider readiness

Do not borrow:

- fake global threat counts
- fake detection accuracy
- decorative cyber maps
- consumer security hero screens
- chart-heavy dashboards
- metrics that do not trace to data

## Components To Add

### 1. Global Command Bar

Placement:

- desktop/tablet top bar
- mobile command drawer or search sheet

Searchable identifiers:

- incident ID
- affected system
- CVE ID
- GHSA ID
- OSV ID
- CPE/package/version
- public company CIK/ticker
- recall terms
- Band message ID
- decision ID
- evidence ID

Data source:

- Supabase
- Band references
- live-data adapters documented in [../api/live-data-apis.md](../api/live-data-apis.md)

### 2. Operational Status Strip

Placement:

- Incident Registry
- Crisis Command Room compact top bar
- Settings as provider readiness detail

Use these metrics only if backed by data:

- active incidents
- pending human decisions
- deadline-risk incidents
- degraded providers
- failed agent runs
- last successful Band sync
- confirmed affected records/systems for active incident

Avoid:

- global threat count
- protected assets
- detection accuracy
- blocked-today numbers

Those are not CrisisCoord's core product unless the implementation actually computes them.

### 3. Source / Intel Feed

Placement:

- Signal Intake right panel
- Crisis Command Room compact feed rail
- Evidence And Audit source snapshot table

Feed item content:

- source name
- title
- matched entity
- source-published timestamp
- retrieved timestamp
- confidence
- severity
- source URL
- live/cached/seeded label

Example:

```text
CISA KEV
CVE-2026-XXXX added to known exploited catalog
Matched affected asset: payment-gateway-prod
Retrieved 03:04 UTC
Confidence: high - source authority match
```

### 4. Handoff Topology Map

Placement:

- Crisis Command Room overview
- Crisis Command Room handoffs tab

This is the strongest visual from the references, but it must show agent coordination rather than network threats.

Required shape:

```text
Assessment
  -> Legal
  -> Technical
Legal + Technical
  -> Communications
All findings
  -> Escalation + Human decision
```

States:

- waiting
- running
- blocked
- complete
- failed
- needs review

Must show:

- why Communications is blocked
- which Band message unlocked a dependency
- which agent output each dependency requires
- what human decision is currently needed

### 5. Real Event Ledger

Placement:

- Evidence And Audit page
- Command Room Audit tab preview

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

Use tables here, not on the first viewport of the Command Room.

### 6. Provider / Feed Status Card

Placement:

- Integrations And Operations
- Command Room compact provider badges
- Evidence And Audit provider metadata

Fields:

- provider
- purpose
- configured
- current status
- last successful call
- latency
- last error
- fallback ready
- seeded mode available

Providers:

- Band
- Supabase
- AI/ML API
- Featherless
- CISA KEV
- NVD
- EPSS
- OSV
- GitHub Advisories
- SEC EDGAR
- openFDA
- optional OTX
- optional AbuseIPDB
- optional URLhaus

### 7. Notification Center And Escalation Ladder

Placement:

- Crisis Command Room top bar and drawer
- Crisis Command Room Notifications tab
- Decision Desk cards
- Evidence And Audit delivery log

Notification item content:

- incident
- owner or audience
- channel
- current status
- acknowledgement deadline
- escalation level
- provider or simulated label
- linked decision request
- linked Band message

Escalation ladder example:

```text
Primary Legal Reviewer - notified - awaiting acknowledgement
Backup Legal Reviewer - next if no acknowledgement
Incident Commander - final escalation
```

Use this component to answer what happens when a required human is unavailable. Do not hide escalation in backend logs.

### 8. Outbound Communication Composer

Placement:

- Communications Review
- Crisis Command Room Drafts tab
- Evidence And Audit delivery log after approval

Composer content:

- audience: regulator, customer, executive, vendor, support team, public status
- draft status
- facts used
- missing facts
- legal warnings
- required approver
- recipient safety state
- queue/send button state
- simulated or provider delivery status

Rule:

- The default demo state is simulated. Real email/SMS delivery is disabled unless a safe test recipient and provider configuration are present.

### 9. Mobile Bottom Action Bar

Placement:

- all mobile workspaces

Navigation:

- Signals
- Incidents
- Command
- Decisions
- More

Center action is contextual:

| Page | Center action |
| --- | --- |
| Signal Intake | Launch |
| Incident Registry | Open selected |
| Crisis Command Room | Decision |
| Communications Review | Review |
| Decision Desk | Approve |
| Evidence And Audit | Export |
| Integrations And Operations | Test |

### 10. Last Updated And Confidence Labels

Placement:

- every fact, finding, decision, source, and provider card

Required labels:

- source
- last updated
- confidence
- review state
- live/cached/seeded state

Example:

```text
Source: NVD + EPSS
Last updated: 03:04 UTC
Confidence: medium
Review: Technical pending
Mode: cached
```

## Existing Page Fit

| Page | Added components |
| --- | --- |
| Signal Intake And Sandbox Launcher | global command bar, source feed, source health cards, sandbox selector, confidence labels |
| Incident Registry | operational status strip, deadline-risk filters, decision-needed filter, unread notification count |
| Crisis Command Room | handoff topology map, source feed rail, Band timeline, dependency gate, Notification Center, escalation ladder, compact provider badges |
| Communications Review | facts used, missing facts, legal warnings, outbound composer, simulated delivery preview, confidence labels, human approval actions |
| Decision Desk | mobile-first decision cards, acknowledgement state, escalation ladder, risk of approving, risk of waiting, confidence labels |
| Evidence And Audit | event ledger, source snapshots, provider/model metadata, Band references, notification attempts, delivery log |
| Integrations And Operations | provider/feed/status cards, email/SMS/internal connector health, last successful run, fallback readiness, safe diagnostics |

## Figma Triptych Requirement

The Figma frame structure should be seven workspace sections. Each workspace section should contain three sibling frames:

```text
01 Signal Intake And Sandbox Launcher
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844

02 Incident Registry
  Desktop / 1440 x 960
  Tablet / 834 x 1112
  Mobile / 390 x 844

...repeat through the seventh workspace.
```

If the Figma plan supports enough pages, each workspace can be a separate Figma page. If the team remains on Figma Starter, use one physical Figma page with seven clearly labeled workspace sections, each containing desktop, tablet, and mobile frames.

Do not scatter component examples across the token board. Components belong below the token board or on a dedicated component-library area.

## Acceptance Rules

- No page-count expansion.
- No fake metrics.
- No dense tables above the fold on mobile.
- Every colored status has a text label.
- Every fact has source, timestamp, confidence, and live/cached/seeded status.
- The Command Room still centers the Band handoff and Communications blocked/unblocked logic.
- Notification, acknowledgement, and escalation state are visible wherever a human decision is required.
- Outbound communication is draft, queued, simulated, sent, failed, or cancelled; never ambiguous.
- External data enriches the crisis workflow; it does not replace the five-agent workflow.
