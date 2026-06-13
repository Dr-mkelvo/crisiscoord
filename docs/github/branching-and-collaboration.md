# Branching And Collaboration

This repository is public for the hackathon, but contributors should not push directly to `main`.

## Default Rule

Every contributor works in a branch and opens a pull request.

No direct commits to `main` unless the team explicitly agrees during an emergency.

## Required Local Push Guard

After cloning the repo, run:

```bash
./scripts/setup-git-hooks.sh
```

This configures Git to use `.githooks/pre-push`.

The hook blocks:

- pushing while checked out on `main`
- pushing directly to the remote `main` branch

If the hook blocks you, create a feature branch and push that branch instead.

## Branch Naming

Use short, descriptive branch names:

```text
feature/agent-assessment
feature/legal-regulatory-agent
feature/technical-forensics-agent
feature/communications-agent
feature/escalation-agent
feature/band-room-orchestration
feature/demo-ui
feature/supabase-schema
feature/demo-script
docs/research-notes
fix/env-validation
```

## Pull Request Rules

Each pull request should include:

- What changed.
- Why it changed.
- How to test it.
- Screenshots or video for UI changes.
- Any open questions.

Use the repository pull request template. It asks which project skill was used and captures the UI or backend contract reviewers need.

Before requesting review:

```bash
pnpm lint
pnpm test
pnpm build
```

These commands will become active once the app is scaffolded.

## Suggested Ownership

- Assessment agent and demo scenario.
- Legal/regulatory agent and regulatory reference data.
- Technical forensics agent and containment model.
- Communications agent and draft templates.
- Escalation agent and decision queue.
- Supabase schema and RLS.
- Crisis command room UI.
- Submission assets: slides, cover image, video.

## Git Flow

Create a branch:

```bash
git switch -c feature/my-work
```

Commit:

```bash
git add <files>
git commit -m "Add my work"
```

Push:

```bash
git push -u origin feature/my-work
```

Open a pull request into `main`.

If you see a warning that direct pushes to `main` are blocked, the guard is working correctly.

## Main Branch Protection

After GitHub repository creation, enable branch protection for `main`:

- Require pull request before merging.
- Require at least one approval if team size allows.
- Require status checks once CI exists.
- Block force pushes.
- Block branch deletion.

The local hook is a contributor warning and guard. GitHub branch protection remains the server-side enforcement.
