# Notification And Outbound Communication APIs

Last updated: June 13, 2026.

## Purpose

This document defines how CrisisCoord should notify humans and send or queue approved communications.

The MVP should show the workflow clearly even if real sends are simulated.

## Recommendation

Use three adapter types:

1. `internalNotificationAdapter`: in-app notifications, Band messages, decision assignments, and audit events.
2. `escalationAdapter`: SMS/WhatsApp, PagerDuty/Opsgenie-style paging, Slack/Teams messages, and acknowledgement timers.
3. `outboundCommunicationAdapter`: approved email or support/status-page drafts for regulators, customers, executives, vendors, or support teams.

Do not let agents call these adapters directly. Agents create structured recommendations, drafts, and decision requests. The backend sends notifications only after server-side policy checks.

## MVP Provider Choices

Recommended first build:

- In-app notifications: Supabase records plus optional Realtime subscriptions.
- Band: room messages and events for agent and human coordination.
- Email: Resend for simple transactional email in a test-only demo mode.
- SMTP: supported as an enterprise-friendly option when a team already has a relay and verified sender domain.
- SMS/WhatsApp: Twilio Programmable Messaging only if the team has time and safe test recipients.
- Slack/Teams: optional internal demo connector, not required for submission.
- PagerDuty/Opsgenie: document-ready optional enterprise connectors, not needed for MVP.
- Jira/ServiceNow: document-ready optional ticketing connectors, not needed for MVP.

Why:

- Resend is simple for developer email.
- Twilio supports SMS, MMS, WhatsApp, and delivery status APIs.
- Slack and Teams are common business-notification targets.
- PagerDuty/Opsgenie patterns are useful for on-call escalation.
- Jira/ServiceNow are realistic enterprise work-record targets.

Sources:

- Twilio Programmable Messaging API: <https://www.twilio.com/docs/messaging/api>
- Slack `chat.postMessage`: <https://docs.slack.dev/reference/methods/chat.postMessage>
- Microsoft Teams incoming webhooks: <https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook>
- PagerDuty escalation policies: <https://support.pagerduty.com/main/docs/escalation-policies>
- Opsgenie escalations: <https://support.atlassian.com/opsgenie/docs/how-do-escalations-work-in-opsgenie/>
- Jira create issue API: <https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/>
- ServiceNow create incident record: <https://www.servicenow.com/docs/r/api-reference/rest-api-explorer/t_GetStartedCreateInt.html>

## Notification Data Model

Recommended tables:

```text
notifications:
  id
  incident_id
  decision_request_id
  channel
  audience_type
  recipient_label
  recipient_ref
  status
  priority
  subject
  body_preview
  provider
  provider_message_id
  acknowledgement_required
  acknowledgement_deadline
  acknowledged_at
  escalation_level
  simulated
  created_by_actor_type
  created_by_actor_id
  created_at
  updated_at

notification_attempts:
  id
  notification_id
  provider
  channel
  status
  provider_message_id
  error_code
  error_message
  attempted_at
```

Recommended channels:

```text
in_app
band
email
sms
whatsapp
slack
teams
pager
ticket
status_page_draft
manual_export
```

Recommended audience types:

```text
incident_commander
legal_reviewer
technical_lead
communications_lead
executive_approver
compliance_reviewer
customer
regulator
vendor
support_team
public_status
```

## Outbound Communication Data Model

Recommended tables:

```text
communication_drafts:
  id
  incident_id
  room_id
  run_id
  audience
  status
  subject
  body
  facts_used
  missing_facts
  warnings
  required_approver_role
  approved_by_user_id
  approved_at
  queued_at
  sent_at
  simulated
  provider
  provider_message_id
  band_message_id
  created_at
  updated_at
```

The status lifecycle:

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

## Server Routes

Recommended API routes:

```text
GET  /api/incidents/:incidentId/notifications
POST /api/incidents/:incidentId/notifications
POST /api/notifications/:notificationId/acknowledge
POST /api/notifications/:notificationId/escalate

GET  /api/incidents/:incidentId/communications
POST /api/communications/:draftId/approve
POST /api/communications/:draftId/request-revision
POST /api/communications/:draftId/queue
POST /api/communications/:draftId/send

GET  /api/integrations/notification-providers/health
```

Every write route must:

- validate role and tenant access
- validate incident status
- validate human approval where required
- write audit events
- record provider metadata
- support simulated mode

## Button-To-API Mapping

| UI button | Route | External side effect? | Default MVP behavior |
| --- | --- | --- | --- |
| Notify owner | `POST /api/incidents/:incidentId/notifications` | Internal only | Create in-app + Band notification. |
| Escalate human | `POST /api/notifications/:id/escalate` | Internal only | Move to next escalation level and log it. |
| Approve draft | `POST /api/communications/:draftId/approve` | No | Lock draft version and write approval. |
| Queue notification | `POST /api/communications/:draftId/queue` | Maybe later | Queue simulated send package. |
| Send notification | `POST /api/communications/:draftId/send` | Yes | Disabled unless safe test provider is configured. |
| Acknowledge | `POST /api/notifications/:id/acknowledge` | No | Mark owner as awake/active. |

## UI Surfaces For Sends

Clicking `Email/SMS`, `Queue notification`, `Send notification`, or provider status opens an in-app drawer instead of jumping to an external tool.

The drawer should include:

- Email, SMS, and Status tabs
- safe recipient allowlist
- editable subject/body for email
- editable body and segment count for SMS
- facts used and warnings
- SMTP/API provider status
- simulated/live mode label
- delivery attempt history
- buttons for save draft, send test, queue, or disabled send

The backend still owns policy. The drawer is only the review and command surface.

## Delivery Safety

External send is allowed only when:

- the draft is human-approved
- the audience is allowed for demo mode
- recipients are synthetic or test-safe
- the channel is configured
- the sender domain is verified
- the audit write succeeds before the provider call
- the provider response is stored after the provider call

If any condition fails, show:

```text
Not sent. Draft is safe in review state.
```

## Provider Environment Variables

```text
# Email provider, optional for MVP
EMAIL_PROVIDER=resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_TEST_RECIPIENT=

SMTP_HOST=
SMTP_PORT=
SMTP_USERNAME=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_TEST_RECIPIENT=

SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=
POSTMARK_SERVER_TOKEN=
POSTMARK_FROM_EMAIL=
AWS_SES_REGION=
AWS_SES_FROM_EMAIL=

# SMS / WhatsApp provider, optional for MVP
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_MESSAGING_SERVICE_SID=
TWILIO_TEST_TO=

# Internal collaboration connectors, optional for MVP
SLACK_BOT_TOKEN=
SLACK_INCIDENT_CHANNEL_ID=
TEAMS_WEBHOOK_URL=

# Ticketing connectors, optional post-MVP
JIRA_BASE_URL=
JIRA_PROJECT_KEY=
JIRA_EMAIL=
JIRA_API_TOKEN=
SERVICENOW_INSTANCE_URL=
SERVICENOW_USERNAME=
SERVICENOW_PASSWORD=
```

## UI Placement

| UI area | Notification behavior |
| --- | --- |
| Top bar | Bell with unread count and provider health hint. |
| Notification Center drawer | All pending acknowledgements, sends, failures, and escalations. |
| Crisis Command Room | Active owner, escalation ladder, agent-created decision requests. |
| Communications Review | Draft approval, queue/send controls, delivery preview, recipient safety warning. |
| Decision Desk | Human acknowledgement, approve, request facts, assign, escalate. |
| Evidence And Audit | Notification attempts, provider IDs, acknowledgements, failed sends, simulated sends. |
| Integrations And Operations | Provider config and safe test-mode status. |

## Demo Rule

For the hackathon demo, default to simulated outbound communications. Show the exact payload, recipient label, channel, and provider status, but avoid sending real external crisis communications.
