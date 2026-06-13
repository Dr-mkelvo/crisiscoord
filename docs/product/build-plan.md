# CrisisCoord Product And Build Plan

Last updated: June 13, 2026.

## What We Are Building

CrisisCoord is a multi-agent enterprise crisis response room for regulated, high-stakes incidents.

The first product experience is a crisis command room. A user enters or receives an incident signal, then five specialized agents coordinate through Band to assess the situation, identify obligations, confirm technical scope, draft communications, and escalate human decisions.

This is not a chatbot, a generic incident tracker, or a static dashboard. The product is the coordination layer between specialized agents, human reviewers, and an auditable crisis timeline.

## Planning Docs

- [Project vision](./project-vision.md): goal, vision, users, differentiation, and product boundaries.
- [System architecture](../architecture/system-architecture.md): frontend, Figma, backend, agents, Band tools, data, and build order.
- [UI page plan](../design/ui-page-plan.md): page map, no-one-shot rule, Figma frames, and wireframe sketch.
- [Research roadmap](../research/research-roadmap.md): what has been researched, what still needs targeted validation, and when to research it.
- [Technology partner plan](../research/technology-partners.md): how Band, Codeband, AI/ML API, Featherless, lablab.ai, and optional AgentOps fit the project.
- [Trigger model](../compliance/trigger-model.md): what counts as a crisis trigger and how SEC, CVE, zero-day, GDPR, HIPAA, CISA, ransomware, and supply-chain scenarios route through the system.

## What The App Must Do

1. Capture a synthetic crisis signal.
2. Start a Band-backed crisis room.
3. Run the Crisis Assessment Agent first.
4. Run Legal and Technical agents from the shared assessment context.
5. Block Communications until Legal and Technical have posted their findings.
6. Generate regulator, customer, and executive draft communications in review-only state.
7. Run Escalation after enough room state exists.
8. Show human decision points, conflicts, missing evidence, deadlines, and approvals.
9. Persist the incident, agent outputs, decisions, and audit events in Supabase.
10. Present a clean demo flow that judges can understand in 60-90 seconds.

## How We Are Building It

The build should happen in layers:

1. App shell: React, TypeScript, Vite, Tailwind, TanStack Router, and the command-room layout.
2. Synthetic demo state: one polished crisis scenario with all agent outputs represented.
3. Data model: Supabase tables for incidents, rooms, agent runs, outputs, decisions, and audit events.
4. Band adapter: a thin service layer for Band agent identity, room state, messages, and events.
5. Agent contracts: Zod schemas for each agent input and output.
6. API routes: Hono or Fastify endpoints for incident intake, agent runs, decisions, and timeline reads.
7. UI components: incident bar, agent rail, Band timeline, dependency gate, draft review panel, decision queue, and audit log.
8. Real integrations: connect Band, model providers, and Supabase after the synthetic flow is visually correct.
9. Verification: unit tests for contracts and Playwright checks for the demo path.
10. Demo polish: short copy, stable states, no real data, and no unsupported legal claims.

## MVP Scope

The MVP should prove one scenario end to end:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Required visible output:

- Assessment classifies severity and crisis type.
- Legal identifies disclosure windows and unknowns.
- Technical confirms affected systems, record scope, containment, and confidence.
- Communications drafts only after Legal and Technical are available.
- Escalation asks for a human decision about proactive customer notification.

## What We Are Not Building

- No real legal advice.
- No real incident response system connected to customer infrastructure.
- No real customer, employee, patient, payment, legal, security, or confidential company data.
- No broad SOC platform.
- No generic admin dashboard detached from the crisis workflow.
- No direct publishing of generated communications without human approval.

## Research Status

Foundational research is sufficient to start implementation.

Already covered:

- hackathon requirements and judging criteria
- Band collaboration concepts and API direction
- Supabase fit for database, auth, storage, realtime, and RLS
- model provider options, including AI/ML API as primary and Featherless as fallback/open-model path
- technology partner usage boundaries
- regulated incident disclosure concepts for demo grounding
- production standards across frontend, backend, data, auth, security, deployment, testing, observability, rate limiting, caching, backup, and compliance
- UI/UX direction for an operational command-center product

Research still needed during implementation:

- confirm live Band credentials and exact SDK/API calls in our environment
- confirm final Supabase project setup and local migration flow
- confirm which model provider is fastest and stable enough for the demo
- verify any regulatory wording used in public demo copy before submission
- test Vercel deployment behavior, environment variables, and rate limits

That means we should not pause for broad research. We should start building, and only do targeted research when an implementation choice depends on a live API detail.

## Build Policy

- Every major change gets a branch, commit, push, pull request, and immediate merge during initial setup.
- `main` remains protected for normal collaboration.
- Contributors work on feature branches.
- Use synthetic data only.
- Keep all copied material out of the repo unless its license and purpose are clear.
- Keep every doc written as CrisisCoord-owned project guidance.
