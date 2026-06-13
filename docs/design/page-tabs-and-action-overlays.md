# Page Tabs And Action Overlays

Last updated: June 13, 2026.

## Purpose

CrisisCoord keeps seven top-level pages, but each page can contain tabs, drawers, sheets, and modals. This lets the product feel complete without expanding the route count.

The responsive Figma board now contains:

- 7 product pages
- 21 baseline responsive layouts: desktop, tablet, and mobile for each page
- 7 interaction-state layouts: one click-result layout per page
- 28 total layouts in the generated board

## Page Tabs

| Page | Tabs | Why they exist |
| --- | --- | --- |
| Signal Intake And Sandbox Launcher | Sources, Sandbox, Validation | Separate incoming signals, demo sector selection, and redaction/safety checks. |
| Incident Registry | Active, Deadlines, Owners | Let users sort work by current incidents, time pressure, and human ownership. |
| Crisis Command Room | Overview, Handoffs, Notifications, Audit | Keep the hero room focused while still exposing agent flow, notification status, and evidence. |
| Communications Review | Drafts, Review, Send Log | Separate draft creation, human/legal review, and delivery history. |
| Decision Desk | Pending, Escalated, Resolved | Make human work queues easy to triage. |
| Evidence And Audit | Timeline, Evidence, Exports | Separate chronological history, source material, and review-safe export packages. |
| Integrations And Demo Readiness | Providers, Secrets, Demo | Separate provider health, configuration, and demo-mode controls. |

Tabs must be visible on desktop, tablet, and mobile. On mobile, the tabs can horizontally scroll, but they should not become hidden menu items.

## Click-Result Overlays

Every major action opens or updates a visible surface.

| Trigger | Opens | What it shows |
| --- | --- | --- |
| Launch Room | Launch confirmation drawer | Sanitized facts, selected sandbox, expected agents, and created records. |
| Open Room | Incident detail drawer | Selected incident, owner, deadline, latest Band event, and route into Command Room. |
| Notify Owner / Email/SMS | Notification drawer | Channel tabs for in-app, Band, email, and SMS; recipient role; message preview; acknowledgement timer. |
| Queue Package / Email | Email composer drawer | To/test recipients, subject, body, facts used, warnings, SMTP/provider status, and queue/send state. |
| Escalate | Escalation action sheet | Current owner, backup owner, channel choices, timer reset, and audit result. |
| Export Package | Export review modal | Included facts, redactions, provider metadata, Band references, and export integrity. |
| Run Diagnostics / Email/SMS status | Provider setup drawer | SMTP or API provider settings, test recipient allowlist, last diagnostic, and simulated/live mode. |

## Email And SMS Behavior

Email/SMS should not feel like a random external jump.

Recommended UI behavior:

1. User clicks Email/SMS, Queue Package, or Send Test.
2. A drawer opens inside CrisisCoord.
3. The drawer shows channel tabs: Email, SMS, Status.
4. Email tab shows recipient allowlist, subject, body, facts used, warnings, and provider status.
5. SMS tab shows recipient role, phone/test number, message body, segment count, unresolved placeholders, and provider status.
6. Status tab shows queued, simulated, sent, failed, acknowledged, or escalated attempts.
7. Send buttons stay disabled until approval, safe recipients, provider configuration, and audit pre-write pass.

For MVP, real customer or regulator sends should remain disabled. Test sends can be enabled only for configured safe recipients.

## Notification Destinations

Notifications can land in multiple places, but all of them must first appear inside CrisisCoord:

- Notification Center drawer
- active decision cards
- Band timeline
- Evidence And Audit delivery log
- in-app unread count

External or partner destinations are adapters:

- Band room message
- email provider or SMTP relay
- SMS or WhatsApp provider
- Slack or Teams channel, optional
- pager or ticketing connector, optional post-MVP

Agents do not directly send notifications. Agents create structured recommendations and decision requests. The backend enforces policy, creates records, and performs safe sends or simulated sends.

## Responsive Rules

- Desktop can show a left queue, center workspace, and right action drawer preview.
- Tablet stacks the action surface below the main workspace.
- Mobile shows active decision, after-click result, Notification Center, and one contextual action panel before deeper details.
- Buttons must be centered inside their owning panel or drawer.
- Dense tables are replaced by cards on mobile.
- Color must be paired with text labels and status copy.
