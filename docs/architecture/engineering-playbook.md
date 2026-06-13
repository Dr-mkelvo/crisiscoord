# CrisisCoord Engineering Playbook

This playbook explains how the team should think, plan, and build CrisisCoord.

The production stack standard says what must exist. This playbook says how to approach the work so important web-app and regulated-workflow concerns do not get missed during a fast hackathon build.

## Product North Star

CrisisCoord is a crisis command room where specialized agents coordinate regulated incidents through Band.

The product is not a chatbot. It is a dependency-aware workflow:

- Assessment defines the incident.
- Legal defines obligations and deadlines.
- Technical defines scope, affected systems, containment, and evidence confidence.
- Communications drafts only after Legal and Technical findings exist.
- Escalation identifies conflicts and routes human decisions.

If Band is removed and the workflow still works the same way, we built the wrong thing.

## How We Map The Project

Before coding a feature, map it through these six layers.

1. User workflow: who uses it, what decision they need, and what state they start from.
2. Agent workflow: which agent owns the step, what it reads, what it posts, and who depends on it.
3. Data model: what durable records are created, updated, or read.
4. Permission model: which role can view, edit, approve, export, or send.
5. Audit model: what event proves the action happened and who/what caused it.
6. Demo model: how this appears clearly in the 60-90 second judge demo.

If a feature cannot be mapped through these layers, keep it out of the first build.

## First Build Shape

Build one polished crisis path before building many shallow paths.

First scenario:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

First screen:

- incident summary
- crisis timeline
- Band room state
- five agent status cards
- legal/regulatory deadline table
- technical findings table
- communications drafts panel
- escalation decision queue
- audit trail

## Core Architecture

Recommended shape:

```text
Browser UI
  -> Hono API / server actions
  -> Supabase Postgres + Storage
  -> Band room + agent workers
  -> model providers / partner APIs
```

Rules:

- UI reads structured state; it should not invent business conclusions.
- Backend validates all inputs and agent outputs.
- Supabase stores durable incident state and audit events.
- Band stores and displays collaboration handoffs.
- Agents produce structured outputs and room messages.
- External model/API calls are bounded, logged, and retry-limited.

## Data Modeling Approach

Separate these concepts:

- source signal: original crisis report
- assessment: classification and severity
- legal finding: obligations, deadlines, assumptions
- technical finding: affected systems, records, containment, confidence
- communication draft: audience, message, dependencies, approval state
- decision request: question, options, risk, owner, deadline
- audit event: timestamped proof of action

Do not collapse all of these into one JSON blob. The demo needs visible state, and the architecture needs traceability.

## Agent Contract Approach

Every agent output should include:

- `incident_id`
- `agent_name`
- `status`
- `summary`
- `findings`
- `confidence`
- `assumptions`
- `open_questions`
- `next_agent_or_owner`
- `created_at`

Special rules:

- Legal outputs must include source references for regulatory claims.
- Technical outputs must separate confirmed facts from estimates.
- Communications outputs must list dependencies used.
- Escalation outputs must state what human decision is required.

## 18-Point Web Build Checklist

Use this checklist before merging any feature that touches the app, API, database, agents, or deployment.

### 00 - Operating Principle

- Is this feature necessary for the crisis command room or the hackathon demo?
- Does it use synthetic data only?
- Does it keep generated communications in draft/review state?

### 01 - Frontend Experience

- Is the workflow visible and understandable in one screen?
- Are loading, empty, blocked, failed, and success states designed?
- Does the UI avoid layout shifts during live updates?
- Are long tables filterable or scannable?

### 02 - Backend Domain Logic

- Is the business rule enforced on the server?
- Are all inputs validated with Zod?
- Are agent outputs validated before storage?
- Are request IDs or run IDs attached?

### 03 - Database And Migrations

- Is this durable state modeled in Supabase?
- Is the migration reproducible?
- Are source facts separate from derived findings?
- Is seed data synthetic and resettable?

### 04 - Auth And Authorization

- Is the route or API protected?
- Does Supabase RLS apply to exposed tables?
- Are object-level checks present for incident-specific data?
- Are approve/send/export permissions separated from view/edit?

### 05 - Security Baseline

- Are secrets absent from code, docs, screenshots, and logs?
- Are dangerous inputs sanitized or rejected?
- Are upload sizes and file types limited?
- Are errors safe to show to users?

### 06 - Secrets And Config

- Is every required environment variable documented in `.env.example`?
- Are service-role or secret keys backend-only?
- Are deployment secrets stored in Vercel/Supabase/Band, not Git?
- Is there a clear local setup path?

### 07 - Hosting And Networking

- Does the feature work on localhost and hosted demo?
- Does it assume HTTPS in production?
- Are callbacks/webhooks documented?
- Are real enterprise systems avoided during the demo?

### 08 - CI/CD And Supply Chain

- Are package additions justified?
- Are scripts added for repeatable checks?
- Does the PR describe how to test the change?
- Would the change pass install, lint, test, and build once CI exists?

### 09 - Testing And Release Gates

- Is there a focused test for the risky part?
- Is the demo path still intact?
- Can the change be rolled back or disabled?
- Are migrations reversible or resettable for demo data?

### 10 - Rate Limiting And Resource Protection

- Could this endpoint be spammed or retried accidentally?
- Are agent/model calls bounded?
- Are expensive operations protected by rate limits or quotas?
- Are retries capped and idempotent?
- Are auth and password flows stricter than normal API traffic?

### 11 - CDN, Caching, And Performance

- Is the response safe to cache?
- Are personalized or incident-specific responses marked private/no-store?
- Are static assets allowed to use long-lived caching?
- Is stale data visibly timestamped?
- Does the feature reduce repeated calls to model providers or external APIs?

### 12 - Scaling And Capacity

- What happens with 10 incidents, 100 incidents, or many agent events?
- Are lists paginated or limited?
- Are long-running jobs separated from request/response UI?
- Are model/API usage and cost bounded?

### 13 - Observability

- Does the system log or store useful audit events?
- Can we see where an agent failed?
- Are logs free of secrets and private data?
- Can the demo show what happened in chronological order?

### 14 - Alerting And Ownership

- Does an alert have an owner?
- Does a deadline have a responsible role?
- Is escalation visible when agents disagree or data is missing?
- Are human decisions routed clearly?

### 15 - Availability And Recovery

- Can a teammate clone, install, seed, and run it?
- Can demo data be recreated?
- Is there a fallback if live Band/model calls fail during the demo?
- Can we run a scripted or mocked demo path if needed?

### 16 - Privacy, Compliance, And Cost

- Is all data synthetic?
- Is the minimum necessary data shown?
- Are generated outputs clearly labeled as draft guidance?
- Are paid services, quotas, and credits understood?

### 17 - Publication And Data Exposure

- Could this screenshot reveal secrets, real data, or confusing claims?
- Is the public README safe for judges and teammates?
- Are legal/regulatory outputs presented as reviewable recommendations?
- Are source links included for researched claims?

### 18 - Jurisdiction And Sector Checks

- Does the Legal Agent classify data type, organization type, affected geography, and sector?
- Does it separate confirmed rules from assumptions?
- Does it avoid hard-coding one state, country, or industry?
- Does it route uncertain obligations to a human Legal Reviewer?

## Suggested Feature Order

1. Repo docs, stack standard, and playbook.
2. App scaffold.
3. Supabase schema and synthetic seed data.
4. Crisis command room shell.
5. Agent output schemas.
6. Simulated agent outputs for the demo path.
7. Band room integration.
8. Communications dependency gate.
9. Escalation decision queue.
10. Audit timeline.
11. Real agent workers.
12. Vercel deployment.
13. Demo video and slides.

## Build Vs Fake

Build:

- the crisis command room UI
- structured incident state
- agent dependency gates
- audit timeline
- Band-mediated handoffs

Acceptable to simulate early:

- exact forensics tooling
- real regulatory filing submission
- real customer notification delivery
- real enterprise integrations

Never fake:

- whether Band is used for collaboration
- whether Communications depends on Legal and Technical
- whether a human approval is required before external communications

## Research Sources To Keep In Mind

- Band docs for rooms, agent messages, events, peer discovery, and SDK integration.
- OWASP API Security Top 10 for object authorization, authentication, resource limits, and API inventory.
- Supabase docs for RLS, grants, publishable keys, and service-role key handling.
- Vercel docs for CDN caching, security headers, WAF, and rate limiting.
- NIST/CISA/DOJ guidance for incident response, evidence preservation, reporting data elements, and coordination.
- GDPR, SEC, HIPAA, and FTC guidance for example regulated incident obligations.
