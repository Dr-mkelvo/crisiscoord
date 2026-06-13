---
name: crisiscoord-doc-consistency
description: Use when updating CrisisCoord master docs, architecture diagrams, phase plans, agent operating models, sandbox scenarios, README links, or any documentation that should stay globally consistent with the master implementation guide.
---

# CrisisCoord Doc Consistency

Use this skill before merging major product, architecture, agent-workflow, sandbox, or diagram documentation changes.

## Portable Use

This is a project playbook, not a Codex-only instruction. Any teammate can use it in Codex, Cursor, Windsurf, Claude Code, ChatGPT, a Band-connected coding agent, GitHub review, or manual review.

If the tool cannot auto-load skills, open or paste this file before changing master project docs.

## Read First

- `docs/product/master-implementation-guide.md`
- `docs/product/build-plan.md`
- `docs/architecture/system-architecture.md`
- `docs/architecture/agent-implementation-plan.md`
- `docs/collaboration/skills-and-rules.md`

## Consistency Rules

- Keep the project global. Do not make one country or one regulator the product default.
- Keep the MVP at five agents unless the team explicitly changes the master guide.
- Keep Band as the visible collaboration layer.
- Keep Supabase as the queryable state and audit layer.
- Keep the backend as the rule layer, not a hidden sixth agent.
- Keep Communications blocked until Legal and Technical outputs validate.
- Keep finance, health, and product/supply-chain sandboxes aligned with the master guide.
- Keep Mermaid diagrams aligned with the actual agent order, sandbox names, provider assignments, and system flow.
- Do not add brainstorming question dumps, obsolete framework labels, emoji labels, private repo references, or regional-only assumptions.

## Required Check

Run this from the repo root:

```bash
node scripts/check-master-doc-consistency.mjs
```

If it fails, update the docs or the check intentionally before merging.

## When Updating The Diagram

The Mermaid diagram in `docs/product/master-implementation-guide.md` is the source structure.

Update it when changing:

- agent count or agent order
- provider assignment
- phase names
- sandbox names
- Band, backend, Supabase, or UI ownership
- human approval flow

If a static image is exported for slides or design files, export it from the Mermaid source. The static export is not the source of truth.
