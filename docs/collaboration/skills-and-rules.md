# Skills And Collaboration Rules

Last updated: June 13, 2026.

## Purpose

This document defines the shared skills and rules contributors should follow so UI pages, backend APIs, Band agents, and pull requests stay consistent across the team.

## Required Skills

The repo includes these project skills under `.codex/skills`.

| Skill | Use when | Main rule |
| --- | --- | --- |
| `crisiscoord-collaboration` | Branching, PRs, commits, repo hygiene, setup changes, or contributor workflow. | Do not push directly to `main`; work through branches and PRs. |
| `crisiscoord-ui-ux` | Figma, page design, frontend implementation, UI review, or shadcn/ui-style component work. | Do not one-shot UI; follow the seven-route page plan and shared states. |
| `crisiscoord-backend-agents` | Backend APIs, Supabase, Band agents, model providers, trigger handling, audit events, or rate limits. | Enforce workflow gates server-side and validate every agent output. |

These skills are committed into the repo so every collaborator gets the same guidance after cloning. They are not personal notes. Treat them as the shared operating rules for the project.

## Contributor Setup

After cloning:

```bash
./scripts/setup-git-hooks.sh
```

This installs the local pre-push guard. It blocks direct pushes to `main` and tells the contributor to push a feature branch instead.

Git hooks are local by design, so each contributor must run the setup command once after cloning. GitHub branch protection should also be enabled for `main` so the server rejects accidental direct pushes.

## Pull Request Rule

Every change should follow:

```text
branch -> commit -> push branch -> pull request -> merge
```

Do not push directly to `main`.

During early setup, maintainers may merge PRs immediately after checks. Once implementation begins, UI/backend work should be reviewed against the relevant skill rules.

Every pull request should say which skill was used:

- `crisiscoord-collaboration` for docs, setup, branches, repository rules, or workflow changes.
- `crisiscoord-ui-ux` for Figma work, frontend routes, components, interaction states, or visual decisions.
- `crisiscoord-backend-agents` for API routes, Supabase schema, Band integration, agent contracts, model providers, rate limits, and audit behavior.

## UI Consistency Rules

Before creating or editing a page, read:

- `docs/design/ui-page-plan.md`
- `docs/design/design-direction.md`
- `.codex/skills/crisiscoord-ui-ux/SKILL.md`

The seven planned app routes are:

- `/incidents/new`
- `/incidents`
- `/incidents/:incidentId`
- `/incidents/:incidentId/communications`
- `/incidents/:incidentId/audit`
- `/decisions`
- `/settings`

Keep handoff maps, compliance review, agent details, and evidence details as panels, tabs, or drawers before adding new routes.

Every UI page should define:

- primary user
- primary decision
- desktop frame
- mobile behavior
- loading state
- empty state
- error state
- blocked state
- review/approval state

Every frontend pull request should include a page contract:

```text
Route:
Primary user:
Primary decision:
Data source:
Agent states shown:
Empty/loading/error/blocked states:
Mobile behavior:
Figma frame or screenshot:
```

Use:

- Figma for layout and variants
- Tailwind tokens
- shadcn/ui-style components
- Radix primitives
- lucide-react icons
- TanStack Query
- TanStack Table
- React Hook Form
- Zod

## Backend Consistency Rules

Before backend or agent work, read:

- `docs/architecture/system-architecture.md`
- `docs/architecture/agent-implementation-plan.md`
- `docs/api/README.md`
- `docs/compliance/trigger-model.md`
- `.codex/skills/crisiscoord-backend-agents/SKILL.md`

Every backend feature should define:

- route or worker entrypoint
- request schema
- response schema
- database records touched
- Band message/event behavior
- audit event behavior
- retry/idempotency behavior
- rate-limit behavior
- failure mode

Every backend pull request should include an execution contract:

```text
Entrypoint:
Request schema:
Response schema:
Tables touched:
Band messages/events:
Audit events:
Idempotency key:
Rate-limit rule:
Failure state:
```

Rules:

- Communications cannot run until Legal and Technical outputs exist.
- Generated communications stay draft-only until human approval.
- Model output is untrusted until Zod validation passes.
- Supabase service-role keys never reach the browser.
- Band records collaboration; Supabase records app state and audit queries.

## Agent Consistency Rules

Every agent should have:

- Band identity
- input contract
- output contract
- prompt/instructions
- allowed tools
- blocked/failure state
- audit event mapping
- test fixture

The first implementation should add one agent end to end before all five are wired.

Recommended order:

1. Crisis Assessment Agent
2. Technical Forensics Agent
3. Legal & Regulatory Agent
4. Stakeholder Communications Agent
5. Escalation & Decision Agent

## Band Versus Our Backend

Band coordinates the agents and makes their shared room visible. It should own:

- room creation and membership
- agent identity and participant lookup
- messages between agents and humans
- events such as run started, dependency blocked, and run completed
- live collaboration context

Our backend owns application truth. It should own:

- incident records
- validated agent outputs
- dependency gates
- communication draft state
- decision requests and approvals
- audit events
- permission checks
- rate limits and retries

The rule is simple: Band shows collaboration; Supabase stores queryable product state; the backend enforces the workflow.

## Review Checklist

Before merging, confirm:

- the change is on a branch, not `main`
- no secrets or real regulated data are committed
- docs do not reference unrelated source projects
- UI work follows the seven-route plan or clearly updates it
- backend work validates input and output with Zod
- agent work records blocked and failed states
- communications remain draft-only until human approval
- the PR says how it was tested
