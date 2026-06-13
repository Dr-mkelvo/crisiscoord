# CrisisCoord Production Stack Standard

This is the project-facing production stack standard for CrisisCoord.

It exists to help the team build a clean public hackathon project with enterprise-grade habits.

For the detailed version, see [docs/architecture/production-stack.md](./docs/architecture/production-stack.md).

For API research and implementation notes, see [docs/api/README.md](./docs/api/README.md).

For the build approach and merge checklist, see [docs/architecture/engineering-playbook.md](./docs/architecture/engineering-playbook.md).

For product vision, system architecture, research planning, and trigger modeling, see:

- [docs/product/project-vision.md](./docs/product/project-vision.md)
- [docs/product/build-plan.md](./docs/product/build-plan.md)
- [docs/architecture/system-architecture.md](./docs/architecture/system-architecture.md)
- [docs/design/ui-page-plan.md](./docs/design/ui-page-plan.md)
- [docs/research/research-roadmap.md](./docs/research/research-roadmap.md)
- [docs/compliance/trigger-model.md](./docs/compliance/trigger-model.md)

## Core Rules

- Use synthetic demo data only.
- Do not use real customer, employee, patient, payment, legal, security, company-confidential, or private incident data.
- Do not commit secrets.
- Do not push directly to `main` during normal collaboration.
- Use Band as the actual collaboration layer.
- Keep generated communications in draft/review state until a human approves them.
- Make every important action traceable through Band room state, database records, or audit events.

## 18 Production Standards

- 00 - Current Operating Principles
- 01 - Frontend and Client Experience
- 02 - Backend APIs and Domain Logic
- 03 - Database, Storage, Migrations, and Data Lifecycle
- 04 - AuthN, AuthZ, Roles, and Access Isolation
- 05 - Security Baseline and Secure Coding
- 06 - Secrets and Configuration Management
- 07 - Hosting, Runtime, Cloud, and Networking
- 08 - CI/CD, Version Control, and Supply Chain Safety
- 09 - Testing, Release Gates, and Rollback Strategy
- 10 - Rate Limiting, Abuse Prevention, and Reliability
- 11 - Caching, CDN, and Performance
- 12 - Scaling, Load Balancing, and Capacity Planning
- 13 - Observability, Logs, Metrics, Traces, and Dashboards
- 14 - Alerting, Incident Response, and Operational Ownership
- 15 - Availability, Backups, Disaster Recovery, and Restore Drills
- 16 - Privacy, Compliance, Auditability, and Cost Controls
- 17 - Domain Rules, Publication, and Data Exposure Review
- 18 - Jurisdictional and Sector Rules Operating Checks

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
- Models: AI/ML API required for main-path reasoning, Featherless AI required for visible open-model inference, both through an OpenAI-compatible wrapper
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
- `feature/model-provider-wrapper`
