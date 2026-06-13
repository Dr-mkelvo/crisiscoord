# CrisisCoord Agent And Contributor Rules

These rules apply to humans and AI agents working in this repository.

## Collaboration Rules

- Do not push directly to `main`.
- Create a branch for every change.
- Open a pull request into `main`.
- Keep pull requests scoped to one clear unit of work.
- For major setup changes, commit, push, open the PR, and merge during the early setup phase.
- Do not commit secrets, real incident data, private customer data, legal files, payment data, health data, credentials, or screenshots containing sensitive values.
- Use synthetic demo data only.
- Keep docs and code written as CrisisCoord-owned project guidance. Do not reference unrelated projects or private source repos.

## Branch Naming

Use short, descriptive branches:

```text
feature/demo-ui
feature/supabase-schema
feature/band-agent-assessment
feature/communications-review
fix/model-provider-timeout
docs/ui-page-plan
```

## Required Local Guard

After cloning, run:

```bash
./scripts/setup-git-hooks.sh
```

This enables the repository pre-push hook that blocks direct pushes to `main`.

Also read [docs/collaboration/skills-and-rules.md](docs/collaboration/skills-and-rules.md) and [docs/collaboration/project-playbooks.md](docs/collaboration/project-playbooks.md). Every pull request should use the template in `.github/pull_request_template.md` and name the project skill used for the change.

## Skills To Use

Use the repo skills under `.codex/skills`:

- `crisiscoord-collaboration`: branch, PR, review, and repo hygiene workflow.
- `crisiscoord-ui-ux`: UI/Figma/page consistency workflow.
- `crisiscoord-backend-agents`: backend, Supabase, Band, model-provider, and agent-contract workflow.

These skills are portable project playbooks. Codex can load them automatically, but contributors using another AI coding tool or a manual workflow should still read the relevant `SKILL.md` and follow it.

## UI Rules

- Do not one-shot the UI.
- Read `docs/design/ui-page-plan.md` before creating a page.
- Keep the app to the seven-route plan unless the team explicitly changes the scope.
- Build static synthetic UI first, then connect data and integrations.
- Use shadcn/ui-style components, Tailwind tokens, Radix primitives, lucide icons, TanStack Table, TanStack Query, React Hook Form, and Zod where appropriate.
- Every UI page must define loading, empty, error, blocked, review, and mobile states.

## Backend And Agent Rules

- Read `docs/architecture/system-architecture.md`, `docs/architecture/agent-implementation-plan.md`, `docs/architecture/partner-implementation-requirements.md`, `docs/api/README.md`, and `docs/compliance/trigger-model.md` before backend or agent work.
- Enforce critical workflow gates server-side.
- Communications cannot run until Legal and Technical findings exist.
- Model output is untrusted until validated with Zod.
- Store source facts, agent findings, communication drafts, human decisions, and audit events separately.
- Band is the collaboration layer.
- Supabase is the app state and queryable audit record.
- AI/ML API and Featherless are both required in the visible demo path.
- Generated communications remain drafts until human approval.
