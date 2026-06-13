# Interaction And Notification Model

Last updated: June 13, 2026.

## Purpose

This document answers what the UI is showing, what buttons do, where notifications go, and how humans work inside CrisisCoord.

CrisisCoord is not a threat-detection firewall. It is the response coordination layer after a crisis signal exists.

The product helps a business answer:

- What happened?
- Who is responsible now?
- Which agents have posted facts?
- Which facts are confirmed, assumed, or still unknown?
- Which communications are safe to draft?
- Which actions require a human?
- Who was notified, through which channel, and did they acknowledge?
- What was approved, sent, delayed, or escalated?

## Core Product Loop

```text
Crisis signal
  -> command room opens
  -> Assessment posts context
  -> Legal and Technical work from that context
  -> Communications unlocks only after required facts exist
  -> Escalation creates human decision requests
  -> human approves, revises, escalates, or sends
  -> notifications and outbound updates are logged
  -> audit trail preserves every step
```

Professional incident tools tend to center around ownership, escalation, communication, and audit. PagerDuty escalation policies notify on-call responders and keep escalating until someone acknowledges. Opsgenie uses escalation rules to notify responders after configured time and alert-state conditions. NIST incident-response guidance emphasizes a common language for internal and external communication. CrisisCoord should borrow those operational patterns, then add the agent collaboration layer.

Sources:

- PagerDuty escalation policies: <https://support.pagerduty.com/main/docs/escalation-policies>
- Opsgenie escalation flow: <https://support.atlassian.com/opsgenie/docs/how-do-escalations-work-in-opsgenie/>
- NIST SP 800-61r3: <https://csrc.nist.gov/pubs/sp/800/61/r3/final>

## What The User Is Looking At

The UI should not feel like a static dashboard. Each page should answer one working question.

| Workspace | User question | Main action |
| --- | --- | --- |
| Signal Intake And Sandbox Launcher | What incident signal are we starting from? | Launch command room from a sanitized signal or seeded sandbox. |
| Incident Registry | Which incidents need attention? | Open an active command room or filter by decision/deadline risk. |
| Crisis Command Room | What is happening right now, and who needs to act? | Watch agent handoffs, open facts, request human action, and inspect reasoning. |
| Communications Review | What can we safely say, to whom, and why? | Approve, revise, queue, or cancel draft communications. |
| Decision Desk | What human decisions are blocking progress? | Acknowledge, approve, request facts, assign, or escalate. |
| Evidence And Audit | Can we prove what happened and why? | Export facts, agent outputs, approvals, provider metadata, and notification logs. |
| Integrations And Demo Readiness | Are our providers and demo modes ready? | Check Band, Supabase, AI/ML API, Featherless, notification providers, and seeded fallback. |

## Tabs Inside The Seven Pages

The app should keep seven top-level pages, but each page can use tabs for local work modes.

| Workspace | Tabs |
| --- | --- |
| Signal Intake And Sandbox Launcher | Sources, Sandbox, Validation |
| Incident Registry | Active, Deadlines, Owners |
| Crisis Command Room | Overview, Handoffs, Notifications, Audit |
| Communications Review | Drafts, Review, Send Log |
| Decision Desk | Pending, Escalated, Resolved |
| Evidence And Audit | Timeline, Evidence, Exports |
| Integrations And Demo Readiness | Providers, Secrets, Demo |

Tabs are local UI states, not new routes unless implementation needs deep links later.

## What The Five Agent Nodes Mean

The agent nodes must not be decorative. They are a map of work state.

Each agent node should show:

- status: waiting, running, blocked, complete, failed, needs review
- input it read
- output it posted
- confidence
- unknowns
- Band message reference
- provider/model if AI-backed
- next dependency
- whether a human decision was created

### Assessment

Meaning:

- classifies the incident type and severity
- creates the first normalized fact packet
- recruits Legal and Technical into the Band room

User should be able to click it and see:

- crisis type
- severity rationale
- affected systems and data categories
- known facts, assumptions, unknowns
- source references
- Band message ID

### Legal & Regulatory

Meaning:

- identifies possible disclosure obligations, deadlines, and legal unknowns
- does not make final legal determinations

User should be able to click it and see:

- possible obligations by jurisdiction or business context
- deadline clock
- required facts still missing
- whether regulator notification is only a draft
- required legal approver

### Technical Forensics

Meaning:

- confirms affected systems, scope, containment, and evidence confidence
- does not directly change production systems in the MVP

User should be able to click it and see:

- affected assets
- confirmed versus suspected record counts
- containment state
- indicators or source snapshots
- uncertainty and required follow-up

### Stakeholder Communications

Meaning:

- drafts internal, regulator, customer, executive, and support communications from verified facts
- stays blocked until Legal and Technical outputs are available
- never sends externally without human approval

Use the full word `Communications` in the UI. Avoid unexplained shorthand.

User should be able to click it and see:

- audience selector
- draft body
- facts used
- missing facts
- legal warnings
- approval status
- send or queue state

### Escalation & Decision

Meaning:

- reads the whole Band room state
- detects conflicts, missing evidence, deadlines, and human-only actions
- creates decision requests and notification tasks

User should be able to click it and see:

- why escalation happened
- who owns the decision
- risk of approving
- risk of waiting
- acknowledgement timer
- escalation ladder
- notification delivery status

## Where Notifications Go

There are three notification layers.

### 1. In-App Notifications

These appear inside CrisisCoord:

- notification bell in the top bar
- right-side Notification Center drawer
- decision cards
- incident timeline
- audit log

Examples:

- `Legal finding posted. Communications can check gate.`
- `Customer notice requires approval from Incident Commander.`
- `Primary reviewer has not acknowledged in 10 minutes. Escalating to backup.`

Clicking a notification opens the Notification Center drawer inside CrisisCoord. The drawer should show:

- channel tabs: in-app, Band, email, SMS
- assigned owner or role
- message preview
- acknowledgement timer
- delivery attempts
- escalation level
- audit reference

### 2. Internal Human Escalations

These notify people inside the business:

- Band mention or Band room message
- email to assigned owner
- SMS or WhatsApp to on-call owner
- Slack or Microsoft Teams channel message, if configured
- PagerDuty or Opsgenie incident/page, if configured
- Jira or ServiceNow task/ticket update, if configured

These are for humans who must review, approve, investigate, or decide.

If the person is asleep or does not acknowledge:

```text
Notify primary owner
  -> wait configured acknowledgement window
  -> if no acknowledgement, notify backup owner
  -> if still no acknowledgement, notify incident commander
  -> if still no acknowledgement, mark decision as escalated and visible in the command room
```

The UI should show this as an escalation ladder, not as a hidden backend action.

### 3. External Stakeholder Communications

These are regulator, customer, executive, support, vendor, or public-status communications.

Rule:

> AI may draft external communication, but a human must approve before it is queued or sent.

Possible delivery channels:

- email provider, such as Resend, SendGrid, Postmark, or Amazon SES
- SMTP relay for teams that already have email infrastructure
- CRM/support export
- status page draft
- legal/regulatory portal attachment, usually manual or enterprise-specific

For the MVP, external sending should be simulated or held in `queued_for_human_send` unless the team explicitly enables a safe demo email provider with test recipients only.

Clicking Email, SMS, Queue Package, or Send Test should open an in-app drawer. It should not jump to a random external platform.

The Email tab should show:

- safe recipient allowlist
- subject
- editable body
- facts used
- missing facts and warnings
- SMTP/API provider status
- send-test, queue, or disabled-send button

The SMS tab should show:

- owner or test recipient
- phone/test destination
- message body
- segment count
- unresolved placeholder warning
- provider status

The Status tab should show queued, simulated, sent, failed, acknowledged, timed out, or escalated attempts.

Useful provider docs:

- Resend: <https://resend.com/>
- SendGrid Mail Send API: <https://www.twilio.com/docs/sendgrid/api-reference/mail-send/mail-send>
- Postmark Email API: <https://postmarkapp.com/developer/api/email-api>
- Amazon SES SendEmail: <https://docs.aws.amazon.com/ses/latest/APIReference/API_SendEmail.html>

## Button Behavior

Every visible action must show or imply its post-click consequence in the UI. A user should never have to guess whether a click sends a real message, queues a simulated package, opens a room, starts an agent run, or pages a human.

| Button | Immediate result | Visible confirmation |
| --- | --- | --- |
| Launch Room | Creates the incident, Band room, Assessment agent run, and audit event. | User lands in Command Room with demo/sandbox mode visible. |
| Preview Agents | Shows the five-agent roster and dependency order before launch. | Assessment, Legal, Technical, Communications, and Escalation readiness states appear. |
| Open Room | Opens an existing incident with its owner, deadline, agent state, and audit context. | Command Room route loads with the selected incident summary. |
| Filter Urgent | Narrows the registry to deadline, severity, and unacknowledged-owner risk. | Filter chip and reduced registry list appear. |
| Run Next Agent | Starts the next eligible agent or marks it blocked if dependencies are missing. | Band timeline receives a run, blocked, complete, or failed event. |
| Notify Owner | Creates an internal notification task for the current owner. | Notification Center shows channel, owner, and acknowledgement timer. |
| Acknowledge | Records that the assigned human has seen the decision or notification. | Escalation timer stops or moves to the next state; audit event is written. |
| Escalate | Pages the configured backup owner or incident commander. | Escalation ladder advances and the Notification Center logs the attempt. |
| Approve Draft | Locks the draft version with approver, facts used, and timestamp. | Queue Package becomes allowed only for approved/test-safe delivery. |
| Request Revision | Creates a revision task for Communications with the missing facts or warning. | Draft status changes to `needs_review` or `blocked_missing_facts`. |
| Queue Package | Creates a simulated delivery package unless safe test recipients are configured. | Delivery status shows `simulated` or `queued`, with audit and provider reference. |
| Approve | Records a human decision and unlocks dependent workflow steps. | Decision card moves from pending to approved and Band receives the decision event. |
| Need Facts | Sends the decision back to the relevant agent or human owner for more evidence. | Decision status changes to waiting for facts, with owner and due time shown. |
| Export Package | Builds an audit export from facts, decisions, notifications, provider metadata, and Band references. | Export appears as a review artifact, not as a raw sensitive-data dump. |
| Verify Chain | Checks that facts, agent outputs, human decisions, and notifications are linked. | Audit integrity remains OK or shows the missing link. |
| Run Diagnostics | Checks Band, Supabase, AI/ML API, Featherless, and notification provider readiness. | Provider readiness matrix shows last success, fallback mode, missing secrets, and safe-send status. |
| Seed Demo | Loads the synthetic scenario and fallback data. | Demo mode badge changes to seeded or simulated. |

### Launch Command Room

Creates:

- incident record
- Band room
- assessment agent run
- audit event

Then routes user to the Crisis Command Room.

### Run Agent

Creates:

- agent run
- provider call or deterministic seeded output
- Band message/event
- Supabase record
- audit event

If dependencies are missing, the run becomes `blocked` and explains why.

### Approve Draft

Creates:

- human approval record
- draft version lock
- audit event

Then unlocks `Queue notification` or `Prepare send package`.

### Queue Notification

Creates:

- outbound notification record
- delivery target list
- compliance/safety check
- audit event

For MVP, the notification can stay in simulated/queued state.

### Send Notification

Only available when:

- draft is approved
- recipient list is test-safe or explicitly configured
- role permission allows send
- required facts are locked
- audit event can be written

Creates:

- provider delivery request
- provider message ID, if available
- delivery status
- audit event

### Escalate Human

Creates:

- decision request
- assigned owner
- acknowledgement deadline
- escalation ladder
- internal notification task
- audit event

If the primary owner does not acknowledge, the system escalates to the next configured owner or channel.

## Communication Statuses

Use these statuses across UI, API, and database:

```text
draft
blocked_missing_facts
needs_review
approved
queued
sent
failed
cancelled
simulated
```

The demo should show `simulated` clearly when no real provider is sending anything.

## Notification Statuses

Use these statuses:

```text
pending
queued
sent
delivered
acknowledged
failed
timed_out
escalated
cancelled
simulated
```

## Human Roles

The MVP should include these human roles in synthetic form:

- Incident Commander
- Legal Reviewer
- Technical Lead
- Communications Lead
- Executive Approver
- Compliance Reviewer

The UI should always show who owns the next decision.

## Demo Count

One primary demo is enough for judging if it is polished.

Recommended demo setup:

1. Primary demo: Finance Sandbox, payment-system unauthorized-access scenario.
2. Optional selectable sandbox: Health Sandbox, patient-portal exposure scenario.
3. Optional selectable sandbox: Product And Supply Chain Sandbox, product recall or vendor compromise scenario.

Do not build three separate products. All demos must reuse the same seven pages, five agents, notification model, audit trail, and approval workflow.

## What To Add To The UI

Add:

- top-bar notification bell with unread count
- Notification Center drawer
- human escalation ladder on decision cards
- outbound communication composer in Communications Review
- notification delivery log in Evidence And Audit
- agent detail drawer on each agent card
- `why escalated` explanation on every human decision
- `facts used` and `facts missing` on every communication draft
- provider delivery status in Integrations And Demo Readiness
- demo mode label: live, assisted, seeded, or simulated

Retract or reduce:

- repeated decorative topology maps on every page
- generic KPI cards that do not drive action
- any button that says approve/send without showing consequence and owner
- any external-send implication before human approval
- unexplained shorthand for key business functions

## Non-Negotiable Safety Rule

No real customer, patient, payment, employee, secret, legal, or production incident data should be sent to model providers or demo notification providers.

All demo communications should use synthetic recipients and synthetic facts.
