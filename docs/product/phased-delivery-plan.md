# Phased Delivery Plan

Last updated: June 13, 2026.

## Purpose

This plan turns the CrisisCoord build into three practical phases.

The goal is to keep the project focused enough for the hackathon, but mature enough that the team can explain how a real enterprise would adopt it later. The main product docs should stay readable. This document carries the detail behind the short phase summaries.

## Agent Count Decision

Keep five agents for the MVP.

The hackathon requires at least three specialized agents, but five is the strongest number for this problem:

- It maps cleanly to the real crisis roles: assessment, legal, technical, communications, and escalation.
- It makes Band necessary because Communications depends on Legal and Technical, and Escalation depends on the full room state.
- It gives the demo enough depth without turning the build into an agent maze.
- It gives contributors clear ownership lanes.

Do not add more agents before the first demo is stable. Extra specialist agents can be discussed after the five-agent loop works end to end.

## Phase 1: Demo Sandbox Foundation

Phase 1 proves the product story with synthetic data only.

The user starts from a crisis signal, not a file upload. The app creates a crisis command room, shows the five agents coordinating through Band, writes the incident state to Supabase, and surfaces human decisions. This phase is the hackathon build target.

What we build:

- command-room UI with incident summary, agent rail, Band timeline, dependency gate, draft review, decision desk, and audit view
- synthetic `2:47 AM` payment-system crisis signal
- Supabase schema for incidents, rooms, agent runs, findings, drafts, decisions, and audit events
- Band adapter for room creation, agent presence, messages, and events
- AI/ML API main-path reasoning for Assessment, Legal, Communications, and Escalation
- Featherless-backed Technical Forensics run or visible review step
- server-side Communications gate that blocks until Legal and Technical outputs exist
- provider/model metadata visible in audit records
- live, assisted, and seeded demo modes

Agent behavior in this phase:

- Crisis Assessment Agent starts first, classifies severity, and recruits the specialist agents.
- Legal & Regulatory Agent identifies obligation candidates, timelines, unknowns, and review requirements.
- Technical Forensics Agent summarizes affected systems, candidate scope, containment state, and evidence confidence.
- Stakeholder Communications Agent drafts review-only messages only after Legal and Technical outputs are validated.
- Escalation & Decision Agent reads the full room state and creates human decision requests.

What stays out:

- real customer, payment, patient, employee, legal, security, or confidential business data
- live production integrations
- external regulatory filing
- external customer notification
- automated containment actions
- upload-first investigation flow

Exit criteria:

- A judge can understand the workflow in 60 to 90 seconds.
- The demo shows at least three Band-visible agents collaborating, with all five represented in the final experience.
- Communications visibly waits on Legal and Technical.
- The audit trail shows model-provider metadata for AI/ML API and Featherless.
- The seeded demo still works if a live partner API is slow.

Primary docs:

- [build-plan.md](./build-plan.md)
- [crisis-signal-model.md](./crisis-signal-model.md)
- [../design/command-room-page-plan.md](../design/command-room-page-plan.md)
- [../demo/demo-day-failure-plan.md](../demo/demo-day-failure-plan.md)
- [../architecture/agent-implementation-plan.md](../architecture/agent-implementation-plan.md)

## Phase 2: Integration Sandbox

Phase 2 validates how CrisisCoord would fit into an existing business without touching production systems.

The company context is still fake or demo-safe. The focus shifts from product story to safe integration mechanics: signed inbound signals, redaction, role mapping, audit records, rate limits, and deployment behavior.

What we build:

- read-only integration gateway for inbound crisis signals
- webhook signature verification and idempotency handling
- sensitivity classification and redaction pipeline
- fake-company tenant, roles, and permissions
- Supabase Row Level Security checks for incident, finding, draft, and audit records
- integration health surface in the settings page
- replayable tabletop scenarios for security, legal, communications, and executive review
- contract tests for inbound signal shape and agent outputs
- cross-platform setup validation for macOS, Linux, and Windows contributors

Agent behavior in this phase:

- Agents receive only sanitized signal facts and approved business context.
- Agents must separate confirmed facts, assumptions, unknowns, confidence, and recommended next steps.
- Agents cannot pull raw logs, raw records, screenshots, secrets, credentials, or unredacted messages.
- Any unclear, high-impact, or externally visible action becomes a human decision request.

What stays out:

- write access to production systems
- real sensitive records in model prompts
- direct external notifications
- automated account lockout, containment, deletion, or evidence mutation
- broad connector sprawl

Exit criteria:

- One inbound signal can be accepted, deduplicated, redacted, stored, and routed to the five-agent workflow.
- Redaction status is visible in audit records.
- Role-based access and tenant isolation are tested.
- The system can explain which facts went to the model and which facts were blocked.
- The team can run a tabletop exercise without using real business data.

Primary docs:

- [../architecture/business-integration-plan.md](../architecture/business-integration-plan.md)
- [../architecture/system-architecture.md](../architecture/system-architecture.md)
- [../api/README.md](../api/README.md)
- [../api/runtime-and-rate-limits.md](../api/runtime-and-rate-limits.md)
- [../architecture/production-stack.md](../architecture/production-stack.md)

## Phase 3: Controlled Enterprise Pilot

Phase 3 is the first real-business pilot posture.

The system can connect to limited enterprise tools, but only through scoped, reviewed, and auditable paths. CrisisCoord remains a coordination and decision-support layer. Humans still approve high-risk conclusions and outbound actions.

What we build:

- one approved read-only security, ticketing, or incident source
- SSO and role mapping for incident commander, legal reviewer, technical reviewer, communications reviewer, and executive approver
- internal collaboration notifications for review requests
- ticket/task updates after human approval
- audit export for review and demo-safe evidence packages
- integration health dashboard
- operational alerts for failed agent runs, failed Band sync, provider errors, and webhook issues
- documented rollback and disable switches for each integration

Agent behavior in this phase:

- Agents can use sanitized business context from approved sources.
- Agents can recommend actions and draft language.
- Agents can create internal tasks or update internal tickets only through human-approved workflows.
- Agents cannot make final legal determinations, publish statements, notify customers, file regulatory notices, or change production systems.

What stays out until a later security/legal review:

- direct customer messaging
- direct regulator submission
- public status-page updates
- automated containment commands
- high-volume account actions
- use of raw sensitive data in third-party AI prompts

Exit criteria:

- A real organization can run a limited pilot with one approved inbound source.
- Every agent output is traceable to source facts, model provider, human reviewer, and audit event.
- Humans can approve, reject, or request changes before any outbound action.
- Integration failure does not break the local incident record.
- The organization can disable integrations without losing the audit trail.

Primary docs:

- [../architecture/business-integration-plan.md](../architecture/business-integration-plan.md)
- [decision-guardrails-questionnaire.md](./decision-guardrails-questionnaire.md)
- [../compliance/trigger-model.md](../compliance/trigger-model.md)
- [../architecture/engineering-playbook.md](../architecture/engineering-playbook.md)

## Later: Approved External Workflows

External workflows should not be part of the hackathon MVP.

They become possible only after a business has reviewed its legal, privacy, security, and communications policies. Even then, CrisisCoord should keep external sends and filings behind explicit human approval, clear role permissions, audit logging, and rollback/disable controls.

Examples:

- attach an approved regulator draft to a legal workflow
- prepare a customer notice package for review
- queue a public-status update for approval
- export an incident audit packet

This later stage is a product roadmap direction, not a current build commitment.
