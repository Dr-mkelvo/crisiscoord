# CrisisCoord Production Stack Standard

This is the native production stack standard for CrisisCoord.

It exists to help the team build a clean public hackathon project with enterprise-grade habits: clear ownership, traceable agent handoffs, safe synthetic data, and a credible regulated-workflow architecture.

This document is not legal advice. CrisisCoord should present regulatory outputs as draft guidance that requires human review.

API-specific notes live in [docs/api/README.md](../api/README.md).

## Standards Map

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

## 00 - Current Operating Principles

Purpose:

- Keep CrisisCoord safe, public-repo friendly, and focused on the hackathon demo.

Rules:

- Use synthetic demo data only.
- Do not use real customer, employee, patient, payment, legal, security, company-confidential, or private incident data.
- Band must be the actual collaboration layer, not a notification wrapper.
- Generated communications stay in draft/review state until a human approves them.
- Human decision gates must be visible in the product.
- Every important action should be traceable through Band room state, database records, or audit events.
- Build the crisis command room first.

## 01 - Frontend and Client Experience

Stack:

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

Rules:

- The first screen should be the working crisis command room.
- Show incident summary, timeline, agent state, Band handoffs, deadlines, evidence packets, draft communications, escalation decisions, and audit trail.
- Use dense operational layouts built for scanning.
- Show explicit states: `waiting`, `running`, `blocked`, `needs review`, `approved`, `drafted`, `failed`.
- Avoid layout shifts during agent updates.
- Do not store sensitive values in unsafe browser storage.

## 02 - Backend APIs and Domain Logic

Stack:

- TypeScript
- Hono as the preferred API framework
- Fastify as fallback
- Zod for request, response, environment, and agent-output validation
- OpenAPI later if a stable external API is needed

Rules:

- Business rules must live server-side, not only in the UI.
- Communications generation must enforce dependency gates server-side.
- Use `incident_id`, `room_id`, `run_id`, and `agent_run_id`.
- Use idempotency keys for retryable agent runs and draft generation.
- Do not expose raw stack traces or provider errors to users.

## 03 - Database, Storage, Migrations, and Data Lifecycle

Decision:

- Use Supabase Postgres.
- Do not use Convex for this project.

Why Supabase:

- Postgres is credible for enterprise workflows.
- Row Level Security supports role-based access.
- Realtime can support crisis-room updates.
- Supabase Storage can hold synthetic evidence packets and generated reports.
- Supabase CLI supports local development and migrations.

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

Rules:

- Store source crisis signals separately from interpreted findings.
- Store agent findings separately from human decisions.
- Keep generated communications as drafts until approved.
- Track timestamps, agent identity, confidence, assumptions, source references, and reviewer state.

## 04 - AuthN, AuthZ, Roles, and Access Isolation

Preferred path:

- Supabase Auth
- Supabase Row Level Security

Fallback:

- Clerk only if auth UX speed becomes more important than single-platform simplicity.

Suggested roles:

- Admin
- Incident Commander
- Legal Reviewer
- Technical Lead
- Communications Lead
- Executive Approver
- Compliance Auditor
- Read-only Observer

Rules:

- Separate view, edit, approve, export, and send permissions.
- Audit approval decisions.
- Do not rely on hidden navigation for security.
- Service-role keys must never reach the browser.

## 05 - Security Baseline and Secure Coding

Rules:

- No secrets in Git.
- No real private incident data in prompts, logs, screenshots, demo videos, or commits.
- Validate all uploaded or seeded data.
- Review packages before installing.
- Prefer least-privilege credentials.
- Keep agent outputs structured enough to redact later.
- Run secret/dependency checks before final submission if time allows.

## 06 - Secrets and Configuration Management

Expected local files:

- `.env.local`
- Optional local-only agent config files

Never commit:

- Band agent keys
- Supabase service-role keys
- model provider keys
- deployment tokens
- personal access tokens

Rules:

- Document variable names in `.env.example`.
- Keep real values in local environment files or platform secret stores.
- Use separate local/demo values where possible.

## 07 - Hosting, Runtime, Cloud, and Networking

Stack:

- Vercel for the demo app
- Supabase for database/auth/storage
- Band for collaboration rooms and agent coordination
- GitHub for source control and collaboration

Rules:

- Hosted demo must use synthetic data only.
- Use HTTPS.
- Keep environment variables in platform secret stores.
- Do not connect real enterprise systems during the hackathon demo.

## 08 - CI/CD, Version Control, and Supply Chain Safety

Rules:

- Public GitHub repo.
- Main branch is protected.
- Contributors work on branches.
- Pull requests merge into `main`.
- No direct pushes to `main` during normal collaboration.
- Review diffs before merging.
- Pin or review new npm/Python packages.

Future GitHub Actions:

- install
- lint
- test
- build

## 09 - Testing, Release Gates, and Rollback Strategy

Stack:

- Vitest
- Playwright
- Zod schema tests

Test priorities:

- Communications Agent dependency gate.
- Escalation conflict detection.
- Supabase RLS policies.
- Demo scenario from incident signal to decision request.
- Seed data reproducibility.

Rules:

- Keep rollback/reset instructions for schema changes.
- Test the demo path before recording or submitting.

## 10 - Rate Limiting, Abuse Prevention, and Reliability

Rules:

- Bound retries for agent runs.
- Track run IDs.
- Use idempotency keys for repeated actions.
- Do not retry draft generation indefinitely.
- Keep model/provider calls bounded for demo stability.
- Keep all communications draft-only unless explicitly approved in the UI.

## 11 - Caching, CDN, and Performance

Rules:

- Cache stable synthetic reference data when helpful.
- Show `last_updated_at` for incident findings and drafts.
- Never cache secrets in unsafe browser storage.
- Mark stale agent output visibly.
- Invalidate derived summaries after source updates or reviewer corrections.
- Keep the demo path fast enough for a 60-90 second presentation.

## 12 - Scaling, Load Balancing, and Capacity Planning

Rules:

- Keep the hackathon build lean.
- Design for multiple incidents and rooms, but implement one polished demo path first.
- Use pagination and filters for incident tables.
- Separate interactive UI actions from longer-running agent work.
- Avoid distributed infrastructure until the workflow proves it needs it.

## 13 - Observability, Logs, Metrics, Traces, and Dashboards

Track:

- incident created
- agent recruited
- agent started
- output posted
- dependency blocked
- draft generated
- conflict detected
- human decision requested
- human decision recorded
- error/failure

Preferred table:

- `audit_events`

UI requirement:

- Show an audit timeline in the crisis command room.

## 14 - Alerting, Incident Response, and Operational Ownership

Rules:

- Every alert needs an owner, source, deadline, and next action.
- Escalation decisions must identify the human approver.
- Deadline warnings should be visible and time-bound.
- Do not auto-send external notifications from an agent.
- Keep legal/regulatory/customer communications in review state.

## 15 - Availability, Backups, Disaster Recovery, and Restore Drills

Rules:

- Code and docs live in GitHub.
- Schema changes live in migrations.
- Demo scenarios should be reproducible from seed scripts.
- Avoid one-off manual setup that cannot be recreated.
- Document reset/reseed steps once the app is scaffolded.

## 16 - Privacy, Compliance, Auditability, and Cost Controls

Rules:

- Use minimum necessary data.
- Synthetic data only for public demo.
- Keep source signals, agent findings, communications, and approvals separate.
- Record who approved decisions and when.
- Avoid unnecessary recurring paid services.

Cost preference:

- Band hackathon access
- Supabase free tier
- Vercel free tier
- AI/ML API credits
- Featherless AI credits

## 17 - Domain Rules, Publication, and Data Exposure Review

Purpose:

- Prevent the system from publishing or acting on unsafe outputs.

Rules:

- Classify each incident by crisis type, data type, affected population, business impact, and confidence.
- Mark generated communications as drafts.
- Show what can be shared internally, what needs review, and what must not be shared.
- Store assumptions and unknowns beside every regulated recommendation.
- Require human review before any external-facing output is approved.

## 18 - Jurisdictional and Sector Rules Operating Checks

Purpose:

- Make regulatory checks generic and reusable across jurisdictions and sectors.

Do not hard-code this standard to one state, country, or industry.

Rules:

- Identify affected jurisdictions from the incident facts.
- Identify data categories involved: payment data, personal data, health data, financial data, employee data, credentials, operational data, source code, or confidential business data.
- Identify organization type: public company, healthcare entity, financial institution, processor/service provider, merchant, vendor, or general business.
- Identify applicable sector rules, contracts, platform obligations, insurance obligations, and regulator deadlines.
- Distinguish confirmed facts from assumptions.
- Produce deadlines as reviewable recommendations, not final legal advice.
- Route uncertain obligations to a human Legal Reviewer.
- Keep a source link or reference for every regulatory claim used in the demo.

Example rule families for demo research:

- GDPR personal data breach notification.
- SEC material cybersecurity incident disclosure for public-company scenarios.
- HIPAA breach notification for health data scenarios.
- FTC breach response guidance for consumer-facing businesses.
- CISA incident reporting guidance and incident data elements.
- PCI/payment-card obligations if payment-card data is involved.
- Contractual notice duties to customers, processors, vendors, insurers, or partners.

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
- Model providers: AI/ML API primary, Featherless AI fallback through an OpenAI-compatible wrapper
- Deployment: Vercel app + Supabase project + Band agents
- Tests: Vitest + Playwright

## Research Basis

The 18 standards are informed by official and broadly applicable crisis-response sources:

- NIST SP 800-61 Revision 3, incident response recommendations.
- CISA incident response and incident notification guidance.
- DOJ cyber incident victim response guidance.
- FTC data breach response guidance for businesses.
- GDPR Article 33 and EDPB breach notification guidance.
- SEC cybersecurity incident disclosure guidance.
- HHS HIPAA breach notification guidance.

See [docs/research/production-standard-research.md](../research/production-standard-research.md).

See [docs/api/README.md](../api/README.md) for Band, Supabase, model-provider, and runtime API research.

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
