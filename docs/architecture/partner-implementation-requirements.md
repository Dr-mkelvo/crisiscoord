# Partner Implementation Requirements

Last updated: June 13, 2026.

## Purpose

This is the implementation checklist for required hackathon partner usage. It is intentionally stricter than "provider options" because the submitted demo must visibly use the partner stack.

For the human approval, AI automation, and escalation boundaries that govern these partner integrations, see [../product/decision-guardrails-questionnaire.md](../product/decision-guardrails-questionnaire.md).

## Required Partners

| Partner/resource | Required proof |
| --- | --- |
| Band | At least three specialized agents collaborate through Band messages or events. |
| Codeband | Repo workflow reflects Codeband-style planning/review handoffs, branch isolation, scoped PRs, and risk-aware merge rules. |
| AI/ML API | Main-path agent runs use AI/ML API for real model-backed reasoning. |
| Featherless AI | At least one visible agent run uses Featherless open-model inference. |
| lablab.ai | Submission uses lablab.ai requirements, technology tags, repository link, demo link, and presentation assets. |

## Required Demo Provider Assignment

Use this assignment unless live testing proves a model cannot meet latency or structured-output reliability.

| Agent/workflow | Required provider | Evidence to store |
| --- | --- | --- |
| Crisis Assessment Agent | AI/ML API | `agent_runs.provider=aimlapi`, model, latency, retry count, output validation status. |
| Legal & Regulatory Agent | AI/ML API | `agent_runs.provider=aimlapi`, model, source-reference confidence, validation status. |
| Technical Forensics Agent | Featherless AI | `agent_runs.provider=featherless`, model, model availability check, latency, validation status. |
| Stakeholder Communications Agent | AI/ML API | Provider metadata, draft-only state, dependency IDs for Legal and Technical outputs. |
| Escalation & Decision Agent | AI/ML API | Provider metadata, conflict flags, human decision request IDs. |
| Provider diagnostics | Featherless AI and AI/ML API | Safe configured/missing state, selected model names, no keys or raw prompts. |

## Required UI Proof

The command room should show:

- Band room/timeline activity with agent handoffs.
- Provider badge or metadata on each model-backed agent run.
- AI/ML API visible on Assessment, Legal, Communications, or Escalation runs.
- Featherless visible on Technical Forensics or another clearly labeled open-model run.
- Blocked state when Communications dependencies are missing.
- Draft-only state for generated communications.

## Required Backend Proof

The backend should record:

- `agent_runs.provider`
- `agent_runs.model`
- `agent_runs.latency_ms`
- `agent_runs.retry_count`
- `agent_runs.fallback_reason`
- `agent_runs.validation_status`
- Band message/event IDs when available
- audit events for run started, completed, blocked, failed, or provider-switched

## Required Environment Variables

```bash
BAND_API_BASE_URL=
BAND_WS_URL=
BAND_AGENT_ASSESSMENT_ID=
BAND_AGENT_ASSESSMENT_KEY=
BAND_AGENT_LEGAL_ID=
BAND_AGENT_LEGAL_KEY=
BAND_AGENT_TECHNICAL_ID=
BAND_AGENT_TECHNICAL_KEY=
BAND_AGENT_COMMS_ID=
BAND_AGENT_COMMS_KEY=
BAND_AGENT_ESCALATION_ID=
BAND_AGENT_ESCALATION_KEY=

AIML_API_BASE_URL=https://api.aimlapi.com/v1
AI_ML_API_KEY=
AIML_DEFAULT_MODEL=

FEATHERLESS_API_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_API_KEY=
FEATHERLESS_DEFAULT_MODEL=
```

Never commit real values.

## Acceptance Gate

Do not mark the MVP integration complete unless all are true:

- Band collaboration works or has a documented live-API blocker.
- AI/ML API has completed at least one validated agent run.
- Featherless has completed at least one validated agent run.
- Provider metadata is visible in Supabase/audit records.
- Provider metadata is visible in the command-room UI or demo script.
- The fallback path does not erase the required proof that both partner model providers were used.

## Sources

- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon)
- [Band platform](https://www.band.ai/platform)
- [Band coding agents](https://www.band.ai/for-coding-agents)
- [AI/ML API quickstart](https://docs.aimlapi.com/quickstart/simple-model)
- [AI/ML API text models reference](https://docs.aimlapi.com/api-references/text-models-llm)
- [Featherless API overview](https://featherless.ai/docs/api-overview-and-common-options)
- [Featherless completions](https://featherless.ai/docs/completions)
- [Featherless models API](https://featherless.ai/docs/api-reference-models)
