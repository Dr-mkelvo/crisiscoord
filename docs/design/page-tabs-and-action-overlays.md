# Page Tabs And Action States

Last updated: June 13, 2026.

## Purpose

CrisisCoord keeps seven top-level routes, but each route needs real working tabs. A tab is not a decorative label and it is not a tiny overlay. Each tab represents a usable work mode inside the same page.

The corrected responsive Figma board contains:

- 7 product routes
- 4 working tabs per route
- 28 tab states total
- 3 responsive frames per tab state: desktop, tablet, and mobile
- 84 responsive frames total

This is the design source of truth for the next UI pass.

## Scope Lock

CrisisCoord is a global crisis-response coordination workspace. It is not a firewall dashboard and it is not a file-upload demo.

The UI should help a business answer:

- What happened?
- Which incident or signal are we working?
- Which agents have posted facts?
- Which facts are confirmed, missing, or unsafe to use?
- Which human owns the next decision?
- Which communication can be drafted, tested, queued, or blocked?
- Who was notified, by which channel, and did they acknowledge?
- What can we prove later in audit?

## Research Findings

The tab model borrows from established incident-response and enterprise workflow patterns:

- PagerDuty incident details use timeline and status-update concepts so responders can review actions and notifications in context.
- PagerDuty stakeholder communication uses status-update tabs and subscriber management for ongoing incident communication.
- FireHydrant separates incident roles, including Communications, to manage stakeholder updates.
- Jira Service Management supports incident Slack channels, stakeholder email updates, responders, and major-incident views.
- Rootly emphasizes lifecycle, timeline, workflow, and retrospective records.
- Radix Tabs and shadcn/ui Tabs provide accessible tab primitives for keyboard-friendly, responsive tab panels.
- NN/g guidance reinforces that tabs should behave consistently and switch related panels in the same context.

Sources:

- PagerDuty incidents: <https://support.pagerduty.com/main/docs/incidents>
- PagerDuty stakeholder communication: <https://support.pagerduty.com/main/docs/communicate-with-stakeholders>
- FireHydrant incident roles: <https://docs.firehydrant.com/docs/incident-roles>
- Jira Service Management incident management: <https://www.atlassian.com/software/jira/service-management/product-guide/getting-started/incident-management>
- Rootly incident lifecycle: <https://docs.rootly.com/incidents/incident-lifecycle>
- shadcn/ui Tabs: <https://ui.shadcn.com/docs/components/radix/tabs>
- Radix Tabs: <https://www.radix-ui.com/primitives/docs/components/tabs>
- NN/g tabs guidance: <https://www.nngroup.com/articles/tabs-used-right/>

## Tab Matrix

| Route | Page | Tabs |
| --- | --- | --- |
| `/signals` | Signal Intake And Sandbox Launcher | Signals, Scenarios, Redaction, Launch Review |
| `/incidents` | Incident Registry | Queue, Details, Owners, Deadlines |
| `/incidents/:incidentId` | Crisis Command Room | Overview, Agents, Messaging, Decisions |
| `/incidents/:incidentId/communications` | Communications Review | Drafts, Email, SMS, Delivery Log |
| `/decisions` | Decision Desk | Pending, Evidence Needed, Escalations, Resolved |
| `/incidents/:incidentId/audit` | Evidence And Audit | Timeline, Evidence, Agent Reasoning, Exports |
| `/settings` | Integrations And Demo Readiness | Providers, Notification Channels, Secrets And Policies, Demo Readiness |

Tabs are local UI states. They should not become new top-level routes in the MVP unless deep linking becomes necessary later.

## What Clicks Do

Every major button should either switch to a specific tab, open an in-page drawer/modal, or update the selected item inside the current tab.

| Button or action | Expected UI result |
| --- | --- |
| Review Signal | Selects the Signals tab detail panel with the source packet. |
| Load Scenario | Stays on `/signals`, switches/fills the Scenarios tab, and prepares synthetic facts. |
| Validate Packet | Stays on Redaction and shows pass/fail plus blocked fields. |
| Launch Room | Creates records and routes to the Command Room Overview tab. |
| Open Room | Opens Command Room with the selected incident. |
| Notify Owner | Opens the relevant Messaging tab state with owner, channel, timer, and template context. |
| Open Email | Switches Communications Review to the Email tab with the selected draft loaded. |
| Send Test | Stays in Email or SMS tab and records provider attempt status. |
| Queue | Moves the communication to Delivery Log as queued or simulated. |
| Escalate | Switches or opens Decision Desk Escalations with owner ladder and channel attempts. |
| Open Audit | Opens Evidence And Audit at the relevant Timeline, Evidence, Agent Reasoning, or Exports tab. |

## Messaging Pattern

Messaging must feel like a real work area:

- left rail: threads, recipients, owners, or notification queue
- center: selected thread, message history, selected draft, or evidence request
- right rail: composer, template preview, channel selection, allowlist, warnings, and status
- bottom or status rail: queued, simulated, sent, failed, acknowledged, timed out, or escalated

This pattern applies to:

- Command Room > Messaging
- Communications Review > Email
- Communications Review > SMS
- Communications Review > Delivery Log
- Decision Desk > Evidence Needed
- Integrations > Notification Channels

## Email And SMS Behavior

Email and SMS never jump to a random external platform.

When a user clicks `Open Email`, `Email/SMS`, `Send Test`, or `Queue`, the UI should show an internal tab state with:

- recipient or owner role
- safe recipient allowlist
- subject for email
- body composer
- template preview or insert flow
- facts used
- missing facts and warnings
- provider status
- simulated/live mode
- delivery attempt status

For MVP, real customer or regulator sending stays disabled. Test sends can be enabled only for configured safe recipients.

## Notification Destinations

Notifications can land in multiple places, but every notification starts as a CrisisCoord record:

- in-app notification
- active decision card
- Command Room Messaging thread
- Band timeline message
- Communications Delivery Log
- Evidence And Audit event

External destinations are adapters:

- Band room message
- email provider or SMTP relay
- SMS or WhatsApp provider
- Slack or Teams channel, optional
- pager or ticketing connector, optional post-MVP

Agents do not directly send notifications. Agents create structured recommendations, drafts, facts, and decision requests. The backend enforces policy, records audit events, and performs safe sends or simulated sends.

## Responsive Rules

- Desktop can use queue, workspace, and action rail columns.
- Tablet should stack the action rail below the main workspace or use a two-column split.
- Mobile should show the active tab, metrics, selected work item, action panel, and status cards before deeper details.
- Mobile tabs may horizontally scroll, but the active tab must remain visible.
- Dense tables become cards on mobile.
- Buttons must be centered inside their owning panel.
- Color must be paired with text labels and status copy.
