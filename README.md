# CrisisCoord

CrisisCoord is a Band-powered multi-agent enterprise crisis response system for regulated and high-stakes workflows.

When a company faces a crisis such as a data breach, cyberattack, product recall, compliance emergency, or public-risk incident, Legal, Technical, Communications, Compliance, and Executive teams usually work across fragmented channels. That delay creates risk: missed disclosure deadlines, inconsistent messaging, incomplete evidence, and unclear human ownership.

CrisisCoord turns the crisis response into a shared, auditable Band room where specialized agents coordinate in sequence and in parallel.

## What We Are Building

We are building the first working version of a crisis command room.

The app will let a reviewer launch a synthetic incident, watch specialized agents coordinate through Band, inspect the legal and technical findings that gate communications, review draft messages, and approve or escalate human decisions. Supabase stores the incident record, agent outputs, decisions, and audit events so the workflow can be replayed and explained.

See [docs/product/build-plan.md](./docs/product/build-plan.md) for the product scope, build order, MVP boundaries, and research status.

## Hackathon Context

- Event: Band of Agents Hackathon by lablab.ai
- Track: Track 3, Regulated & High-Stakes Workflows
- Build window: June 12-19, 2026
- Submission deadline: June 19, 2026, 6:00 PM EAT / 3:00 PM UTC
- Core requirement: at least 3 specialized agents collaborating through Band

The project is intentionally synthetic. Do not use real customer, employee, patient, payment, legal, security, company-confidential, or private incident data. Use only synthetic demo scenarios created for CrisisCoord.

## Demo Scenario

Initial signal:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Expected agent flow:

1. Crisis Assessment Agent classifies the incident and starts the shared crisis room.
2. Legal & Regulatory Agent identifies disclosure obligations and deadlines.
3. Technical Forensics Agent confirms breach scope, affected systems, and containment status.
4. Stakeholder Communications Agent drafts regulator, customer, and executive communications only after Legal and Technical findings exist.
5. Escalation & Decision Agent flags conflicts, missing evidence, and human-in-the-loop decisions.

## Why Band Is Core

Band is not a notification wrapper in this project. The workflow depends on Band because each agent changes what the next agent can safely do.

The Communications Agent cannot draft accurate regulator or customer notices until Legal has posted obligations and Technical has posted confirmed scope. The Escalation Agent cannot identify decision conflicts until the shared room contains the assessment, legal, technical, and communications outputs.

The Band room is the coordination layer, state surface, and audit trail.

## Agents

- Crisis Assessment Agent: receives crisis signals, classifies type/severity, seeds the Band room, and recruits specialist agents.
- Legal & Regulatory Agent: determines likely disclosure obligations, deadlines, and legal unknowns.
- Technical Forensics Agent: identifies affected systems, records, containment state, and evidence confidence.
- Stakeholder Communications Agent: drafts tiered communications after required dependencies are present.
- Escalation & Decision Agent: detects conflicts, missing approvals, and human decision points.

## Initial Stack Direction

- Frontend: React, TypeScript, Vite, Tailwind CSS, TanStack Router, TanStack Query, TanStack Table.
- Backend/API: TypeScript service using Hono or Fastify.
- Database: Supabase Postgres, not Convex.
- Validation: Zod for API payloads, environment variables, and agent output contracts.
- Auth: Supabase Auth or Clerk, with role-based access and audit logging.
- Agent collaboration: Band SDK / Agent API.
- Hosting: Vercel for the demo app, with synthetic data only.
- Testing: Vitest for unit tests and Playwright for browser/demo flow checks.

See [ONBOARDING.md](./ONBOARDING.md), [PRODUCTION_STACK_STANDARD.md](./PRODUCTION_STACK_STANDARD.md), [docs/product/build-plan.md](./docs/product/build-plan.md), [docs/api/README.md](./docs/api/README.md), and [docs/architecture/engineering-playbook.md](./docs/architecture/engineering-playbook.md) for setup, stack, product scope, API details, and the project build approach.

## Collaboration Policy

Do not push directly to `main`. Each teammate should create a feature branch and open a pull request.

Recommended branch names:

- `feature/agent-assessment`
- `feature/band-room-orchestration`
- `feature/legal-regulatory-agent`
- `feature/technical-forensics-agent`
- `feature/comms-agent`
- `feature/escalation-agent`
- `feature/demo-ui`

See [docs/github/branching-and-collaboration.md](./docs/github/branching-and-collaboration.md).

## Research Sources

- lablab.ai Band of Agents Hackathon page
- Band documentation and Agent API documentation
- Supabase JavaScript, Auth, Storage, Realtime, and RLS documentation
- AI/ML API and Featherless AI model-provider documentation
- Vercel Functions, caching, and WAF rate-limiting documentation
- GDPR Article 33 and EDPB breach notification guidance
- SEC cybersecurity incident disclosure guidance
- HHS HIPAA breach notification guidance
- Public Equifax 2017 breach records and congressional hearing material

See [docs/research/hackathon-research.md](./docs/research/hackathon-research.md).
