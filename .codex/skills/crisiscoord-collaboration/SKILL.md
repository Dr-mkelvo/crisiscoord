---
name: crisiscoord-collaboration
description: Use when working in the CrisisCoord repo on branching, pull requests, collaboration rules, contributor onboarding, repo hygiene, commits, pushes, or any change that should follow the team workflow.
---

# CrisisCoord Collaboration

Use this skill for repository workflow and contributor consistency.

## Portable Use

This is a project playbook, not a Codex-only instruction. Codex can load it automatically from `.codex/skills`, but any teammate can use it in Cursor, Windsurf, Claude Code, ChatGPT, a Band-connected coding agent, or a manual GitHub review.

If the tool cannot load skills, paste or attach this file before starting the task.

## Required Workflow

1. Start from a clean `main`.
2. Create a branch for the work.
3. Keep the change scoped.
4. Run relevant checks.
5. Commit.
6. Push the branch.
7. Open a pull request into `main`.
8. Merge only through PR.

Do not push directly to `main`.

## Local Guard

After cloning, contributors should run:

```bash
./scripts/setup-git-hooks.sh
```

This installs `.githooks/pre-push`, which blocks pushes to `main` and tells the contributor to create a branch.

## Before Editing

Read:

- `AGENTS.md`
- `ONBOARDING.md`
- `docs/github/branching-and-collaboration.md`

For major work, also read the relevant product docs:

- `docs/product/project-vision.md`
- `docs/product/build-plan.md`
- `docs/architecture/system-architecture.md`

## Repo Hygiene

Never commit:

- secrets
- `.env.local`
- Band agent keys
- Supabase service-role keys
- model API keys
- real incident data
- private customer, employee, legal, payment, health, or security data

Keep public docs standalone. Do not mention unrelated private repos, source projects, or contributor-specific source breadcrumbs.

## Standard Checks

Use the checks that fit the change. For docs-only work:

```bash
git diff --check
rg -n '<{7}|={7}|>{7}' . --glob '!/.git/**'
LC_ALL=C rg -n '[^\x00-\x7F]' . --glob '!/.git/**'
```

When app code exists, also run the relevant package scripts:

```bash
pnpm lint
pnpm test
pnpm build
```
