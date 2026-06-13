# Production Stack Extraction And CrisisCoord Adaptation

This document extracts the production-stack standards from the 312 Strength standards folder and adapts them for CrisisCoord.

Source standards reviewed:

- `00 - Current Operating Principles`
- `01 - Frontend and Client Experience`
- `02 - Backend APIs and Domain Logic`
- `03 - Database Storage Migrations and Data Lifecycle`
- `04 - AuthN AuthZ Permissions and Tenant Isolation`
- `05 - Security Baseline and Secure Coding`
- `06 - Secrets and Configuration Management`
- `07 - Hosting Runtime Cloud and Networking`
- `08 - CI CD Version Control and Supply Chain Safety`
- `09 - Testing Release Gates and Rollback Strategy`
- `10 - Rate Limiting Abuse Prevention and DoS Resilience`
- `11 - Caching CDN and Performance`
- `12 - Scaling Load Balancing and Capacity Planning`
- `13 - Observability Logs Metrics Traces and Dashboards`
- `14 - Alerting Incident Response and Operational Ownership`
- `15 - Availability Backups Disaster Recovery and Restore Drills`
- `16 - Privacy Compliance Auditability and Cost Controls`
- `17 - Domain Rules Publication and Data Exposure Review`
- `18 - Jurisdictional Rules and Florida Operating Checks`

## Important Boundary

The 312 Strength standards are for a private property-management repo. CrisisCoord is a public hackathon project. We will use the engineering discipline, privacy posture, review gates, and stack preferences, but we will not reuse real private data, names, records, documents, schemas, or workflows.

All CrisisCoord demo data must be synthetic.

## Extracted Stack

### Operating Principles

Original principle:

- Local-first.
- Private by default.
- No public deployment, preview link, external data sync, payment action, or legal automation without approval.
- Keep raw source records separate from generated summaries.
- Require owner/legal review before high-risk communications or actions.

CrisisCoord adaptation:

- Public repo is allowed because it contains only synthetic data.
- Demo hosting is allowed for hackathon judging.
- No real customer, patient, payment, incident, employee, or company-sensitive data.
- Human approval gates must be visible in the product.
- Generated communications are drafts until a human approves them.

### Frontend

Extracted standard:

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
- Dense operational screens rather than marketing landing pages
- Explicit missing-source, needs-review, approved, sent, and blocked states

CrisisCoord adaptation:

- Build the first screen as a crisis command room.
- Show crisis timeline, Band room messages, agent status, deadlines, evidence packets, draft communications, and human decision queue.
- Avoid a marketing landing page as the primary experience.
- Use stable table and panel dimensions so the demo does not shift during agent updates.

### Backend APIs And Domain Logic

Extracted standard:

- Local TypeScript scripts first.
- Use Hono, Fastify, or Express only when server behavior is needed.
- Zod for request, response, import, and environment validation.
- OpenAPI only if a partner-facing or multi-client API is approved.
- Keep business rules server-side.
- Use idempotency for imports, external checks, notification drafts, and retryable tasks.
- Add request IDs or run IDs.

CrisisCoord adaptation:

- Use a small TypeScript API service for incident creation, demo orchestration, agent output recording, and decision approval.
- Use Zod schemas for every crisis signal and agent output.
- Add `incident_id`, `room_id`, `run_id`, and `agent_run_id` to every important record.
- Communications generation must enforce dependency gates server-side, not only in UI.

### Database, Storage, Migrations, Data Lifecycle

Extracted standard:

- Markdown and source folders can be source records.
- Local files, SQLite, or local Postgres are acceptable for early app work.
- Managed Postgres only after cloud storage is approved.
- Use migrations through Drizzle Kit, Prisma Migrate, Supabase CLI, Flyway, or Liquibase when a database exists.
- Preserve source records and extracted fields separately.
- Track import date, source file, reviewer, confidence, and open questions.

CrisisCoord adaptation:

- Use Supabase Postgres instead of Convex.
- Use Supabase CLI migrations or Drizzle migrations.
- Tables should separate source crisis signals, agent findings, draft communications, decisions, and audit events.
- Store synthetic evidence packets separately from interpreted conclusions.

Recommended initial tables:

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

### AuthN, AuthZ, Permissions, Tenant Isolation

Extracted standard:

- Define roles before app work.
- Require MFA for admin/high-risk accounts.
- Separate view, edit, export, approve, and send permissions.
- Restrict sensitive data by role.
- Audit admin actions, exports, source-record changes, approval decisions, and sent notices.

CrisisCoord adaptation:

Suggested roles:

- Admin
- Incident Commander
- Legal Reviewer
- Technical Lead
- Communications Lead
- Executive Approver
- Compliance Auditor
- Read-only Observer

Supabase RLS should enforce role-scoped reads and writes. Draft communications and decisions should require named approval.

### Security Baseline

Extracted standard:

- Keep private work local and private by default.
- Sanitize sensitive data before AI or external tools.
- Validate file imports and reject unexpected file types.
- Use least-privilege credentials.
- Review packages before installing.
- Keep audit trails for generated reports, drafts, and compliance decisions.
- Run dependency and secret checks before sharing code.

CrisisCoord adaptation:

- No real sensitive data in prompts, logs, commits, screenshots, or demo recordings.
- Use synthetic incident payloads only.
- Add a pre-push secret scan before production submission if time allows.
- Log agent outputs with redaction-ready fields.

### Secrets And Configuration

Extracted standard:

- Store secrets only in `.env` files or approved secure local storage.
- Keep `.env` ignored by Git.
- Use separate local, test, and production credentials.
- Document purpose, owner, and rotation for each credential.

CrisisCoord adaptation:

- Use `.env.local` for local app secrets.
- Use Vercel and Supabase environment stores for hosted demo secrets.
- Never commit Band agent keys, Supabase service-role keys, model provider keys, or deployment tokens.

### Hosting, Runtime, Cloud, Networking

Extracted standard:

- Local repo and local dev server by default.
- Public hosting requires approval.
- Use sanitized demo data for any screen share.
- Use HTTPS, secure headers, and restricted access if hosting is approved.

CrisisCoord adaptation:

- Public hosting is approved for hackathon demo because all data is synthetic.
- Vercel is the preferred web hosting target.
- Supabase is the preferred managed database target.
- Band hosts the collaboration room layer.

### CI/CD, Version Control, Supply Chain

Extracted standard:

- Use GitHub / GitHub Desktop.
- Review diffs before committing.
- Run local checks before sharing or merging.
- Scan for secrets before pushing.
- Pin or review new npm/Python packages.

CrisisCoord adaptation:

- Public GitHub repository.
- Branch-based collaboration with pull requests.
- No direct pushes to `main`.
- Add GitHub Actions after app scaffolding: install, lint, test, build.
- Add branch protection once the repo exists and collaborators are invited.

### Testing, Release Gates, Rollback

Extracted standard:

- Test locally before sharing.
- Test import scripts on copies or fixtures.
- Add regression checks for repeated workflows.
- Keep rollback steps for schema changes, imports, generated reports, and releases.

CrisisCoord adaptation:

- Vitest for schema and agent-gating logic.
- Playwright for the 60-second demo path.
- Use seed scripts for synthetic scenarios.
- Keep migration rollback or reset instructions.

### Rate Limiting, Abuse Prevention, DoS

Extracted standard:

- Rate limit external API checks.
- Use dry runs for email, SMS, notices, and task generation.
- Add idempotency keys for imports and notification drafts.
- Respect provider limits.
- Bound retries.

CrisisCoord adaptation:

- No real emails/SMS in the hackathon build.
- Communications are draft-only.
- Agent runs should have retry limits and run IDs.
- Model provider calls should be bounded and cacheable for demo stability.

### Caching, CDN, Performance

Extracted standard:

- Cache read-heavy snapshots and report calculations.
- Show when data was last refreshed.
- Separate cached public records from reviewed compliance decisions.
- Invalidate cache after source updates, imports, or reviewer corrections.
- Do not cache sensitive data in unsafe browser storage.
- Do not show stale regulated data without visible timestamps.

CrisisCoord adaptation:

- Cache synthetic regulatory reference snippets and demo scenario data.
- Always show `last_updated_at` for incident findings and drafts.
- Do not store secrets or sensitive findings in localStorage.
- Use server state or Supabase for durable room state.

### Scaling, Capacity

Extracted standard:

- Avoid heavy infrastructure before the workflow proves the need.
- Use pagination and filters for large tables.
- Separate interactive screens from long-running imports.
- Measure script run time as data grows.

CrisisCoord adaptation:

- Keep the hackathon build lean.
- Use queue-like agent run records rather than distributed infrastructure.
- Design for multiple incidents and multiple rooms, but implement one polished demo path first.

### Observability

Extracted standard:

- Track import runs, status changes, draft creation, approvals, report generation, and failures.
- Redact sensitive data from logs.
- Include source, run ID, timestamp, and reviewer status.

CrisisCoord adaptation:

- `audit_events` table should record agent starts, outputs, dependency blocks, draft generation, escalation flags, and human approvals.
- UI should show the audit timeline.

### Alerting And Ownership

Extracted standard:

- Alerts should have an owner, source, due date, and next action.
- Tenant/legal actions stay in review until approved.

CrisisCoord adaptation:

- Deadline alerts must identify the owner and next step.
- Customer/regulator communications remain draft-only until approved.
- Escalation agent owns unresolved decisions.

### Availability, Backups, Restore

Extracted standard:

- Back up source records and generated summaries together.
- Test restores before relying on a database.
- Do not rely on one laptop as the only copy.

CrisisCoord adaptation:

- Public GitHub stores code/docs.
- Supabase migrations store schema.
- Demo seed data should be reproducible from scripts.

### Privacy, Compliance, Auditability, Cost

Extracted standard:

- Private by default.
- Minimum necessary access.
- Public records are not automatically safe to republish.
- Record who approved notices, reports, exports, and sharing.
- Avoid unnecessary recurring spend.

CrisisCoord adaptation:

- Synthetic-only public demo.
- No unreviewed real-world claims or legal advice.
- Keep generated outputs as reviewable recommendations.
- Favor free-tier Band, Supabase, Vercel, and partner credits.

### Domain And Jurisdiction Review

Extracted standard:

- Before building or automating workflows, identify affected domain, source records, sensitivity, rules, publication boundaries, and approval gates.

CrisisCoord adaptation:

- This becomes the Legal & Regulatory Agent's model.
- Each incident should produce a rule checklist, jurisdiction assumptions, deadline table, unknowns, and approval gates.

## Final Stack Recommendation

For the hackathon:

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

1. Document project, stack, and collaboration rules.
2. Create public GitHub repository and invite collaborators.
3. Scaffold the app.
4. Add Supabase schema and seed synthetic incident data.
5. Implement the crisis command room UI.
6. Implement structured agent contracts.
7. Connect Band agents and show real Band-mediated handoffs.
8. Add dependency gate for Communications Agent.
9. Add Escalation Agent decision queue.
10. Record demo video and prepare submission assets.
