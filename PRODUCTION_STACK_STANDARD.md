# CrisisCoord Production Stack Standard

This is the project-facing production stack standard for CrisisCoord.

For the detailed version, see [docs/architecture/production-stack.md](./docs/architecture/production-stack.md).

## Core Rules

- Use synthetic demo data only.
- Do not use real customer, employee, patient, payment, legal, security, company-confidential, or private incident data.
- Do not commit secrets.
- Do not push directly to `main`.
- Use Band as the actual collaboration layer.
- Keep generated communications in draft/review state until a human approves them.
- Make every important action traceable through Band room state, database records, or audit events.

## Recommended Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Routing: TanStack Router
- Server state: TanStack Query
- Tables: TanStack Table
- Forms and schemas: React Hook Form + Zod
- Backend/API: Hono with TypeScript
- Database: Supabase Postgres
- Auth: Supabase Auth
- Storage: Supabase Storage for synthetic evidence packets
- Agents: Band SDK / Agent API
- Hosting: Vercel
- Tests: Vitest and Playwright

## Database Decision

We are not using Convex.

Use Supabase Postgres because it gives us:

- Postgres credibility for enterprise workflows
- Row Level Security for role-based access
- Realtime updates if needed
- Storage for synthetic evidence/report artifacts
- CLI migrations for reproducible setup
- A simple story for judges

## First Build Target

Build the crisis command room first.

It should show:

- incident summary
- agent statuses
- Band room handoffs
- legal/regulatory deadlines
- technical findings
- communications drafts
- escalation decisions
- audit timeline

## Collaboration Workflow

- `main` is protected.
- Work happens in feature branches.
- Pull requests merge into `main`.
- At least one review is required.

Suggested branches:

- `feature/agent-assessment`
- `feature/legal-regulatory-agent`
- `feature/technical-forensics-agent`
- `feature/comms-agent`
- `feature/escalation-agent`
- `feature/demo-ui`
- `feature/supabase-schema`
