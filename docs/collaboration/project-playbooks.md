# Project Playbooks

Last updated: June 13, 2026.

## Purpose

These are tool-agnostic operating playbooks for CrisisCoord. Use them with any coding or design tool: Codex, Cursor, Windsurf, Claude Code, ChatGPT, Band-connected agents, GitHub review, or manual work.

The `.codex/skills` files are the auto-load version. This document is the normal documentation version for everyone else.

## Universal Contributor Prompt

Paste this into any coding assistant before asking it to work in the repo:

```text
You are working on CrisisCoord.

Follow AGENTS.md, ONBOARDING.md, docs/collaboration/skills-and-rules.md, and the relevant project playbook.

Do not push directly to main.
Work on a branch, keep changes scoped, use synthetic data only, do not commit secrets, and open a pull request.

For UI work, follow crisiscoord-ui-ux.
For backend, Supabase, Band, agents, model providers, rate limits, or audit events, follow crisiscoord-backend-agents.
For docs, setup, repo hygiene, or GitHub workflow, follow crisiscoord-collaboration.
```

## Collaboration Playbook

Use for branching, PRs, repo setup, collaborator workflow, docs, and repository hygiene.

Rules:

- Start from updated `main`.
- Create a branch for every change.
- Keep the change scoped.
- Run relevant checks.
- Commit intentionally.
- Push the branch.
- Open a pull request into `main`.
- Merge only through PR.
- Do not push directly to `main`.

After cloning, run:

```bash
./scripts/setup-git-hooks.sh
```

Required docs:

- `AGENTS.md`
- `ONBOARDING.md`
- `docs/github/branching-and-collaboration.md`
- `docs/collaboration/skills-and-rules.md`

Never commit:

- secrets
- `.env.local`
- Band agent keys
- Supabase service-role keys
- model API keys
- real incident data
- private customer, employee, legal, payment, health, or security data

Docs-only checks:

```bash
git diff --check
rg -n '<{7}|={7}|>{7}' . --glob '!/.git/**'
LC_ALL=C rg -n '[^\x00-\x7F]' . --glob '!/.git/**'
```

## UI/UX Playbook

Use for Figma, frontend routes, component design, page states, and UI reviews.

Required docs:

- `docs/design/ui-page-plan.md`
- `docs/design/design-direction.md`
- `docs/design/ui-ux-research.md`

Rules:

- Do not one-shot the UI.
- Plan, sketch, build static synthetic UI, then connect data and integrations.
- First screen should be the crisis command room, not a landing page.
- Keep the interface dense, calm, operational, and audit-ready.
- Use semantic status indicators with text or icons, not color alone.

Seven-route plan:

- `/incidents/new`
- `/incidents`
- `/incidents/:incidentId`
- `/incidents/:incidentId/communications`
- `/incidents/:incidentId/audit`
- `/decisions`
- `/settings`

Every page must define:

- primary user
- primary decision
- desktop frame
- mobile behavior
- loading state
- empty state
- error state
- blocked state
- review/approval state

Preferred implementation stack:

- React + TypeScript
- Tailwind CSS tokens
- shadcn/ui-style components
- Radix primitives
- TanStack Query
- TanStack Table
- React Hook Form + Zod
- lucide-react

## Backend And Agents Playbook

Use for backend APIs, Supabase schema, Band integration, agent workers, model providers, rate limits, audit events, and compliance triggers.

Required docs:

- `docs/architecture/system-architecture.md`
- `docs/architecture/agent-implementation-plan.md`
- `docs/api/README.md`
- `docs/api/model-provider-apis.md`
- `docs/research/technology-partners.md`
- `docs/compliance/trigger-model.md`

Rules:

- Use TypeScript and Hono unless the team explicitly chooses otherwise.
- Validate requests, responses, environment variables, and agent outputs with Zod.
- Enforce critical workflow gates server-side.
- Communications cannot run until Legal and Technical outputs exist.
- Generated communications remain drafts until human approval.
- Supabase service-role keys never reach the browser.
- Band records collaboration.
- Supabase records queryable app state and audit history.

Every backend feature should define:

- entrypoint
- request schema
- response schema
- tables touched
- Band messages or events
- audit events
- idempotency key
- rate-limit rule
- failure state

Every agent needs:

- Band identity
- input contract
- output contract
- prompt or instructions
- allowed tools
- blocked/failure state
- audit event mapping
- test fixture

## Provider Playbook

Use AI/ML API as the primary model provider and Featherless as fallback/open-model provider.

Rules:

- Keep provider-specific code inside `model-provider`.
- Agent code should not import vendor clients directly.
- Use OpenAI-compatible request shapes as transport convenience only.
- Do not require direct OpenAI.
- Record provider, model, latency, retry count, and failure reason.
- Check Featherless model availability before demo runs.
- Never expose provider keys to the browser.

Recommended provider order:

1. AI/ML API for normal agent reasoning and structured outputs.
2. Featherless if AI/ML API fails or when demonstrating open-source model inference.
3. Direct OpenAI only if deliberately added later for reliability.

## PR Review Rule

Every PR should answer:

```text
Which CrisisCoord playbook did you use?
Which tool or app did you use?
What changed?
How did you test it?
For UI: what route, state, and mobile behavior changed?
For backend: what schema, Band event, audit event, and failure mode changed?
```
