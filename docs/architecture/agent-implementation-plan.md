# Agent Implementation Plan

Last updated: June 13, 2026.

## Goal

Add CrisisCoord agents in a way that is consistent, testable, and visibly Band-mediated.

Band is the collaboration layer. The agents should not be hidden behind a single sequential script.

The actual agents are not implemented yet. This document is the implementation rulebook for adding them without each contributor inventing a different pattern.

The five-agent architecture is the recommended default. Keep five agents for the MVP instead of adding more specialist agents before the first stable demo. See [../product/master-implementation-guide.md](../product/master-implementation-guide.md) for the agent communication model, global sandboxes, and implementation sequence. See [../product/phased-delivery-plan.md](../product/phased-delivery-plan.md) for the phase-by-phase delivery plan and [../product/decision-guardrails-questionnaire.md](../product/decision-guardrails-questionnaire.md) for the global guardrails plan, AI autonomy boundaries, human-only decisions, and escalation rules that agent implementations must follow.

## Agent Count Decision

Use five agents for the first build:

- It is above the hackathon minimum of three without becoming too heavy.
- It maps to the real crisis roles: assessment, legal, technical, communications, and escalation.
- It makes the Band dependency visible because Communications waits on Legal and Technical, while Escalation reads the full room state.
- It gives contributors clear implementation lanes.

Do not add a sixth agent until the five-agent loop runs end to end with audit events, provider metadata, and a seeded demo fallback.

## Architecture Decision

Use one shared agent execution pattern:

```text
UI action or scheduled crisis signal
  -> backend API validates request
  -> backend creates agent_runs record
  -> backend posts or reads Band room context
  -> agent worker executes with a typed contract
  -> model provider or deterministic rule returns draft output
  -> backend validates output
  -> backend writes Supabase records
  -> backend posts Band message/event
  -> backend creates notification or decision records when humans are required
  -> UI renders status, evidence, drafts, notifications, decisions, and audit trail
```

This keeps the demo visibly collaborative while still giving us a reliable source of truth.

## Recommended Code Shape

Once the app is scaffolded, keep related logic grouped like this:

```text
src/
  app/                  # React routes and UI shell
  components/           # shared UI components
  server/
    api/                # Hono routes
    band/               # Band adapter
    agents/             # agent runners and prompts
    model-provider/     # AI/ML API and Featherless wrapper
    supabase/           # database client and repositories
    audit/              # audit event helpers
    rate-limit/         # request and agent run limits
  contracts/
    agents/             # Zod input/output schemas
    api/                # route request/response schemas
  fixtures/
    incidents/          # synthetic demo incidents
```

The folder names can change during scaffolding, but the separation should remain: contracts, adapters, agent runners, repositories, and UI must not be tangled together.

## Agent Build Order

Build one complete agent loop first, then repeat the pattern.

1. Crisis Assessment Agent
   - receives crisis signal
   - classifies incident type and severity
   - uses AI/ML API for model-backed classification in the demo path
   - creates or seeds Band room context
   - recruits or mentions required agents
   - writes assessment finding and audit event

2. Technical Forensics Agent
   - reads assessment context
   - confirms affected systems, data categories, containment, and confidence
   - uses Featherless AI for open-model inference in the demo path
   - posts technical finding to Band
   - writes technical finding and audit event

3. Legal & Regulatory Agent
   - reads assessment and technical context when available
   - identifies possible obligations, deadlines, source references, and unknowns
   - uses AI/ML API for obligation extraction in the demo path
   - posts reviewable legal packet to Band
   - writes obligation candidates and audit event

4. Stakeholder Communications Agent
   - checks Legal and Technical dependency gate
   - if blocked, posts blocked event and stops
   - if unblocked, drafts regulator, customer, executive, and internal communications
   - writes draft records in review-only state

5. Escalation & Decision Agent
   - reads room state, findings, drafts, and unknowns
   - detects conflicts or missing facts
   - uses AI/ML API for conflict detection and decision routing in the demo path
   - creates human decision requests
   - creates internal notification requests for assigned reviewers
   - explains why escalation happened and what acknowledgement is required
   - writes decision request and audit event

## Standard Agent Contract

Each agent needs:

- `agent_name`
- `incident_id`
- `room_id`
- `run_id`
- `input_schema`
- `output_schema`
- `status`
- `known_facts`
- `assumptions`
- `unknowns`
- `confidence`
- `source_references`
- `band_message_ids`
- `band_event_ids`
- `audit_event_id`

The output should always separate:

- confirmed facts
- assumptions
- unknowns
- recommendations
- source references
- confidence
- next required human decision, if any

Do not let agents return free-form text as the only output. Free-form text can exist inside a validated field, but the app needs structured fields for UI, audit, and dependency gates.

## Standard Run Lifecycle

```text
1. Validate input.
2. Mark run as running.
3. Read required incident, Band, and Supabase state.
4. Check dependency gates.
5. Call model provider or deterministic logic.
6. Validate output.
7. Store finding/draft/decision records.
8. Post Band message or event.
9. Record audit event.
10. Mark run as complete, blocked, or failed.
```

## Band Behavior

Use Band messages for directed handoffs:

- Assessment mentions Legal and Technical.
- Legal and Technical mention Communications when their outputs are ready.
- Communications mentions Escalation after drafts are created.
- Escalation mentions the human reviewer or Incident Commander.

Use Band events for:

- run started
- tool call
- tool result
- dependency blocked
- validation failed
- retry
- run completed

Every Band message we create should also store a matching ID or reference in Supabase when possible. If Band is temporarily unavailable, the backend should record a failed or pending Band sync state rather than losing the local audit trail.

## Supabase Behavior

Recommended tables:

- `agent_runs`
- `agent_findings`
- `regulatory_obligations`
- `technical_findings`
- `communication_drafts`
- `decision_requests`
- `notifications`
- `notification_attempts`
- `audit_events`

Store Band IDs on Supabase records whenever possible.

Recommended minimum columns:

```text
agent_runs:
  id, incident_id, room_id, agent_name, status, idempotency_key,
  started_at, completed_at, blocked_reason, failure_reason,
  provider, model, latency_ms, retry_count

agent_findings:
  id, incident_id, room_id, agent_name, run_id, finding_type,
  known_facts, assumptions, unknowns, confidence, source_references,
  band_message_id, created_at

communication_drafts:
  id, incident_id, room_id, run_id, audience, status, subject,
  body, required_approver_role, legal_finding_id, technical_finding_id,
  band_message_id, created_at

decision_requests:
  id, incident_id, room_id, title, status, owner_role, owner_user_id,
  risk_of_approving, risk_of_waiting, acknowledgement_required,
  acknowledgement_deadline, acknowledged_at, escalation_level,
  created_by_run_id, created_at

notifications:
  id, incident_id, decision_request_id, channel, audience_type,
  recipient_label, status, priority, provider, provider_message_id,
  acknowledgement_required, acknowledgement_deadline, acknowledged_at,
  escalation_level, simulated, created_at

audit_events:
  id, incident_id, actor_type, actor_id, action, target_type,
  target_id, before_state, after_state, created_at
```

## Server-Side Gates

Do not rely on the UI to enforce critical workflow rules.

Communications can run only if:

- Legal output exists.
- Technical output exists.
- Both outputs are validated.
- Both outputs belong to the same `incident_id` and `room_id`.

If the gate fails:

- return status `blocked`
- store an `agent_runs` blocked record
- post a Band event
- show the blocked state in the UI

Escalate to a human instead of automating when an action:

- creates legal or regulatory exposure
- sends, files, publishes, or externally communicates anything
- changes or disrupts production systems
- affects evidence integrity
- depends on unclear facts
- involves ransom, attribution, materiality, or final breach determination

## Notification And Human Escalation Behavior

Agents may recommend that a human is notified. Agents do not send external notifications directly.

Server-side behavior:

1. Create a `decision_requests` record when a human must act.
2. Create an in-app `notifications` record for the assigned owner.
3. Post a Band message or event that names the owner role and required action.
4. Start an acknowledgement window.
5. If the owner does not acknowledge in time, escalate to the next configured owner or channel.
6. Store every attempt in `notification_attempts`.
7. Show acknowledgement, timeout, escalation, and simulated-send status in the UI.

For the MVP:

- internal notifications should work through app records and Band messages
- external emails/SMS should default to simulated or safe test-recipient-only
- Communications drafts can be approved and queued, but not actually sent to real customers or regulators
- Evidence And Audit must show who was notified, which channel was used, and whether the notification was acknowledged

See [../product/interaction-and-notification-model.md](../product/interaction-and-notification-model.md) and [../api/notification-apis.md](../api/notification-apis.md).

## Model Provider Rules

- Use the `model-provider` abstraction.
- AI/ML API is required in the main demo path.
- Featherless AI is required in the visible demo path.
- Technical Forensics should use Featherless in the demo path unless live testing proves the selected model cannot meet latency or JSON reliability needs.
- If the Technical Forensics provider assignment changes, another visible agent or review step must use Featherless before submission.
- Direct OpenAI is optional and not required.
- Use bounded retries and timeouts.
- Record provider, model, latency, retry count, and failure type.

The abstraction should expose a small interface:

```text
generateStructuredOutput(input) -> validated typed result
```

It should not leak provider-specific response objects into agent code.

## Partner Proof Requirements

Each model-backed agent run must store:

- provider
- model
- latency
- retry count
- fallback reason, if provider-switched
- safe provider metadata for the UI

The demo cannot be considered ready unless the audit trail shows both AI/ML API and Featherless runs.

See [partner-implementation-requirements.md](./partner-implementation-requirements.md) for the full acceptance gate.

## Crisis Signal Handling

Every crisis signal should become a normalized incident signal before agents run. Product/UI language should say `crisis signal` or `incident signal`, not `trigger`.

Initial crisis signal categories:

- payment or customer data exposure
- ransomware or extortion notice
- zero-day exploitation against a critical system
- vendor or supply-chain compromise
- product safety or recall risk
- executive impersonation or account takeover
- health-data exposure
- public disclosure deadline or regulator inquiry
- material cybersecurity incident for a public-company style demo

The first scenario remains the payment-system unauthorized-access demo. Additional scenarios should reuse the same agent contracts, not create separate one-off flows.

## Contributor Work Split

Recommended branch ownership:

- `feature/supabase-schema`: tables, migrations, seed data, RLS notes.
- `feature/band-room-orchestration`: room creation, participant lookup, message/event adapter.
- `feature/agent-assessment`: first complete agent run pattern.
- `feature/technical-forensics-agent`: technical finding contract and runner.
- `feature/legal-regulatory-agent`: obligation contract and runner.
- `feature/communications-agent`: dependency gate and draft generation.
- `feature/escalation-agent`: conflict detection and decision requests.
- `feature/notifications`: Notification Center, acknowledgement, escalation ladder, and simulated outbound communication.
- `feature/demo-ui`: command room rendering against synthetic and API state.

Each branch should keep its contract files and test fixtures close to the implementation so reviewers can see the behavior.

## Definition Of Done For An Agent

An agent is done when:

- input schema exists
- output schema exists
- synthetic fixture exists
- success path works
- blocked path works if applicable
- failure path records useful state
- Band message/event behavior is visible
- Supabase records are written
- audit event is written
- UI can render the status
