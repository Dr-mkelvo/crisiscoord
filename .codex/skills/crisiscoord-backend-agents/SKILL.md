---
name: crisiscoord-backend-agents
description: Use when implementing or reviewing CrisisCoord backend APIs, Supabase schema, Band integration, agent workers, model providers, compliance triggers, audit events, rate limits, or server-side workflow gates.
---

# CrisisCoord Backend And Agents

Use this skill for backend, data, Band, model-provider, and agent work.

## Portable Use

This is a project playbook, not a Codex-only instruction. Codex can load it automatically from `.codex/skills`, but any teammate can use it in Cursor, Windsurf, Claude Code, ChatGPT, a Band-connected coding agent, or a manual backend review.

If the tool cannot load skills, paste or attach this file before implementing backend, agent, or provider code.

## Read First

- `docs/architecture/system-architecture.md`
- `docs/product/master-implementation-guide.md`
- `docs/api/README.md`
- `docs/api/band-api.md`
- `docs/api/supabase-api.md`
- `docs/api/model-provider-apis.md`
- `docs/research/technology-partners.md`
- `docs/architecture/partner-implementation-requirements.md`
- `docs/api/runtime-and-rate-limits.md`
- `docs/compliance/trigger-model.md`

## Core Architecture

- Supabase is the app state and queryable audit record.
- Band is the collaboration layer and room/message/event record.
- Model providers are reasoning services, not source of truth.
- The UI is not source of truth.

## Backend Rules

- Use TypeScript and Hono unless the team explicitly chooses otherwise.
- Validate requests, responses, environment, and agent outputs with Zod.
- Enforce Communications dependency gates server-side.
- Use idempotency keys for retryable agent runs and draft generation.
- Record audit events for state-changing actions.
- Keep service-role keys server-only.
- Never send real regulated/private data to model providers.

## Agent Rules

Each agent must have:

- input schema
- output schema
- Band identity
- run status
- failure path
- audit event emission
- confidence, assumptions, known facts, and unknowns

Required agents:

- Crisis Assessment Agent
- Legal & Regulatory Agent
- Technical Forensics Agent
- Stakeholder Communications Agent
- Escalation & Decision Agent

## Workflow Gate

Communications cannot run until:

- Legal has posted validated findings.
- Technical has posted validated findings.
- Both findings are linked to the same incident and Band room.

If dependencies are missing, return a blocked state and post a Band event instead of generating drafts.

## Model Provider Strategy

- Do not require direct OpenAI.
- Use AI/ML API in the main demo path.
- Use Featherless AI in the visible demo path.
- Technical Forensics should use Featherless unless live testing forces a documented provider swap.
- Keep an OpenAI-compatible client shape only as a provider-switching convenience.
- Track timeout, retry count, provider, model, latency, and failure reason.
- Keep provider-specific code inside `model-provider`; agent code should not import vendor clients directly.
- Check Featherless model availability before demo runs.
- Treat partner credits and promo codes as account setup details, never as committed project config.

## Compliance Behavior

- Surface possible obligations for review.
- Do not present final legal advice.
- Attach source references for regulatory claims.
- Separate confirmed facts from assumptions.
- Require human approval before external-facing communications.
