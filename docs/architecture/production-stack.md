# CrisisCoord Production Stack Standard

This document defines the production stack standard for CrisisCoord.

CrisisCoord is a public hackathon project, so every design decision must support a clean collaborative repo, a fast demo build, and a credible enterprise architecture for regulated crisis response.

## Operating Principles

- Synthetic data only.
- Public repo safe by default.
- Human approval before any high-risk generated communication is marked approved.
- No real customer, employee, patient, payment, legal, security, company-confidential, or private incident data.
- Band is the collaboration layer, not a notification wrapper.
- Every important action should be traceable through room messages, agent events, database records, or audit logs.
- Build the actual crisis command room first, not a marketing landing page.

## Frontend Standard

Use:

- React
- Vite
- TypeScript
- Tailwind CSS
- TanStack Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- lucide-react
- Playwright for browser checks

Design rules:

- First screen should be the crisis command room.
- Show crisis timeline, Band room state, agent status, deadlines, evidence packets, draft communications, and human decision queue.
- Use dense operational screens built for scanning and repeated review.
- Show explicit states: `waiting`, `running`, `blocked`, `needs review`, `approved`, `drafted`, `sent`, `failed`.
- Avoid layout shifts during agent updates.
- Do not store sensitive values in browser localStorage.

## Backend/API Standard

Use:

- TypeScript
- Hono as the preferred API framework
- Fastify as the fallback if Hono becomes limiting
- Zod for request, response, environment, and agent-output validation
- OpenAPI later if we expose a formal partner-facing API

Backend rules:

- Business rules must live server-side, not only in the UI.
- Communications generation must enforce dependency gates server-side.
- Use request IDs, incident IDs, room IDs, and agent run IDs.
- Use idempotency keys for retryable agent runs and draft generation.
- Do not expose raw stack traces or provider errors to end users.

## Database Standard

We are not using Convex for CrisisCoord.

Recommended database: Supabase Postgres.

Why Supabase:

- Postgres is familiar and credible for enterprise workflows.
- Row Level Security can model regulated access.
- Realtime can support crisis-room updates.
- Supabase Storage can hold synthetic evidence packets and generated reports.
- Supabase CLI supports local development and migrations.
- It is easy to explain in the hackathon pitch.

Alternatives:

- Neon Postgres if we want hosted Postgres with a thinner app backend.
- Railway Postgres if we need the fastest deployment path.
- SQLite/libSQL for a local-only prototype, though it is weaker for the regulated-access story.

Recommendation:

- Use Supabase Postgres unless setup speed becomes a blocker.

## Initial Data Model

Suggested tables:

- `incidents`
- `crisis_rooms`
- `agent_runs`
- `agent_findings`
- `regulatory_obligations`
- `technical_findings`
- `communication_drafts`
- `decision_requests`
- `decision_responses`
- `audit_events`

Data rules:

- Store original crisis signals separately from interpreted findings.
- Store agent findings separately from human decisions.
- Keep generated communications as drafts until approved.
- Track timestamps, agent identity, confidence, source assumptions, and reviewer state.

## Auth And Permissions

Preferred path:

- Supabase Auth
- Supabase Row Level Security

Fallback:

- Clerk if auth UX speed becomes more important than single-platform simplicity.

Suggested roles:

- Admin
- Incident Commander
- Legal Reviewer
- Technical Lead
- Communications Lead
- Executive Approver
- Compliance Auditor
- Read-only Observer

Permission rules:

- Separate view, edit, approve, export, and send permissions.
- Audit approval decisions.
- Do not rely on hidden navigation for security.
- Service-role keys must never reach the browser.

## Agent Collaboration Standard

Use:

- Band SDK / Agent API
- Band rooms for shared state and collaboration
- Agent messages for directed handoffs
- Agent events for progress, tool calls, errors, and audit trail

Required visible collaboration:

- Assessment Agent seeds incident context in Band.
- Assessment Agent recruits specialist agents.
- Legal Agent posts obligations and deadlines.
- Technical Agent posts scope and containment.
- Communications Agent blocks until Legal and Technical outputs are present.
- Escalation Agent reads the full room state and asks for human decisions.

## Security Standard

- No secrets in Git.
- No real private incident data in prompts, logs, screenshots, demo videos, or commits.
- Use `.env.local` locally.
- Use Vercel/Supabase environment stores for deployed secrets.
- Review packages before installing.
- Run secret/dependency checks before final submission if time allows.
- Keep agent output structured enough to redact later.

## Secrets And Configuration

Expected local files:

- `.env.local`
- Optional local-only agent config files

Never commit:

- Band agent keys
- Supabase service-role keys
- model provider keys
- deployment tokens
- personal access tokens

Use `.env.example` to document variable names without values.

## Hosting And Deployment

Use:

- Vercel for the demo app
- Supabase for database/auth/storage
- Band for collaboration rooms and agent coordination
- GitHub for source control and collaboration

Deployment rules:

- Hosted demo must use synthetic data only.
- Use HTTPS.
- Keep environment variables in platform secret stores.
- Do not connect real enterprise systems during the hackathon demo.

## CI/CD And GitHub Workflow

Repository rules:

- Public GitHub repo.
- Main branch is protected.
- Contributors work on branches.
- Pull requests merge into `main`.
- No direct pushes to `main`.

Future GitHub Actions:

- install
- lint
- test
- build

## Testing Standard

Use:

- Vitest for unit tests.
- Playwright for browser/demo flow checks.
- Zod schema tests for agent contracts.

Test priorities:

- Communications Agent dependency gate.
- Escalation conflict detection.
- Supabase RLS policies.
- Demo scenario from signal to decision request.

## Rate Limiting And Reliability

- Bound retries for agent runs.
- Track run IDs.
- Cache stable synthetic reference snippets when helpful.
- Do not retry draft generation indefinitely.
- Keep the demo path deterministic enough for judging.

## Caching And Performance

- Cache read-heavy synthetic reference data.
- Show `last_updated_at` for incident findings and drafts.
- Never cache secrets in unsafe browser storage.
- Mark stale agent output visibly.
- Invalidate derived summaries after source updates or reviewer corrections.

## Observability And Audit

Track:

- incident creation
- agent recruited
- agent started
- agent output posted
- dependency blocked
- draft generated
- conflict detected
- human decision requested
- human decision recorded

Preferred table:

- `audit_events`

UI requirement:

- Show an audit timeline in the crisis command room.

## Availability And Recovery

- Code and docs live in GitHub.
- Schema changes live in migrations.
- Demo scenarios should be reproducible from seed scripts.
- Avoid one-off manual setup that cannot be recreated.

## Cost Control

Use free tiers and hackathon credits where possible:

- Band hackathon access
- Supabase free tier
- Vercel free tier
- AI/ML API credits
- Featherless AI credits

Avoid unnecessary recurring paid services.

## Final Recommended Stack

- App: React + Vite + TypeScript
- Styling: Tailwind CSS
- Routing: TanStack Router
- Data fetching: TanStack Query
- Tables: TanStack Table
- Forms/contracts: React Hook Form + Zod
- Backend: Hono TypeScript API
- Database: Supabase Postgres
- Auth: Supabase Auth first; Clerk only if auth UX becomes the bottleneck
- Storage: Supabase Storage for synthetic evidence packets
- Migrations: Supabase CLI or Drizzle Kit
- Agent layer: Band SDK / Agent API
- Deployment: Vercel app + Supabase project + Band agents
- Tests: Vitest + Playwright

## Implementation Approach

1. Keep repo docs clean and project-specific.
2. Scaffold the app.
3. Add Supabase schema and seed synthetic incident data.
4. Implement the crisis command room UI.
5. Implement structured agent contracts.
6. Connect Band agents and show real Band-mediated handoffs.
7. Add dependency gate for Communications Agent.
8. Add Escalation Agent decision queue.
9. Add audit timeline.
10. Record demo video and prepare submission assets.
