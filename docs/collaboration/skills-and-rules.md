# Skills And Collaboration Rules

Last updated: June 13, 2026.

## Purpose

This document defines the shared skills and rules contributors should follow so UI pages, backend APIs, Band agents, and pull requests stay consistent across the team.

## Tool-Agnostic Project Playbooks

The repo stores project skills under `.codex/skills` because that format is easy for Codex to load automatically. The rules themselves are not Codex-only.

Treat each skill as a portable Markdown playbook. A teammate can use the same instructions in Codex, Cursor, Windsurf, Claude Code, ChatGPT, a Band-connected coding agent, a GitHub PR review, or a manual checklist.

If a tool cannot auto-load `.codex/skills`, the contributor should open the `SKILL.md` file directly and follow it as written.

For a non-hidden documentation version, use [project-playbooks.md](./project-playbooks.md).

## Required Skills

| Skill | Use when | Main rule |
| --- | --- | --- |
| `crisiscoord-collaboration` | Branching, PRs, commits, repo hygiene, setup changes, or contributor workflow. | Do not push directly to `main`; work through branches and PRs. |
| `crisiscoord-ui-ux` | Figma, page design, frontend implementation, UI review, or shadcn/ui-style component work. | Do not one-shot UI; follow the seven-route page plan and shared states. |
| `crisiscoord-backend-agents` | Backend APIs, Supabase, Band agents, model providers, crisis signal handling, audit events, or rate limits. | Enforce workflow gates server-side and validate every agent output. |
| `crisiscoord-doc-consistency` | Master docs, architecture diagrams, phase plans, agent operating models, sandbox scenarios, or README link updates. | Keep docs global and aligned with the master implementation guide; run the consistency script. |

These skills are committed into the repo so every collaborator gets the same guidance after cloning. They are not personal notes, private assistant prompts, or tool-specific preferences.

## How Different Tools Should Use Them

Use this mapping:

| Tool or workflow | How to use the skills |
| --- | --- |
| Codex | Auto-load or read `.codex/skills/<skill>/SKILL.md` before editing. |
| Cursor / Windsurf / other IDE agents | Paste or attach the relevant `SKILL.md` into the agent context before asking it to code. |
| Claude Code / CLI agents | Point the agent at `AGENTS.md`, this document, and the relevant `SKILL.md`. |
| Band-connected coding agents | Use the skill name as the role instruction and post the selected skill in the Band room before work starts. |
| Human-only work | Use the same skill as a checklist before opening a PR. |
| GitHub review | Check the PR template for the selected skill and verify the route or backend contract. |

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
- `crisiscoord-doc-consistency` for master docs, diagrams, sandbox scenarios, phase plans, or cross-doc consistency updates.

If a contributor used another app, they should still name the CrisisCoord skill followed. Example: "Used `crisiscoord-ui-ux` in Cursor" or "Used `crisiscoord-backend-agents` in Claude Code."

## UI Consistency Rules

Before creating or editing a page, read:

- `docs/design/ui-page-plan.md`
- `docs/design/design-direction.md`
- `.codex/skills/crisiscoord-ui-ux/SKILL.md`

The seven planned app routes are:

- `/signals`
- `/incidents`
- `/incidents/:incidentId`
- `/incidents/:incidentId/communications`
- `/decisions`
- `/incidents/:incidentId/audit`
- `/settings`

Do not count incident creation as a standalone page. Starting an incident is an action inside Signal Intake.

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
- AI/ML API must be used in the main demo path.
- Featherless must be used in the visible demo path.
- Every model-backed agent run must record provider and model metadata.
- Optional model or observability partners must go through the same `model-provider` or `agent-observability` abstraction instead of leaking vendor code across agents.

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
- major docs or diagrams pass `node scripts/check-master-doc-consistency.mjs`
- the PR says how it was tested
