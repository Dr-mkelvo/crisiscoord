# Technology Partners And Provider Plan

Last updated: June 13, 2026.

## Purpose

This document captures the technology partners and adjacent tools we should consider for CrisisCoord. It turns the hackathon resource list into project decisions.

## Confirmed Hackathon Technology Stack

The official hackathon page centers the build around:

| Technology | Role in CrisisCoord | Use now? |
| --- | --- | --- |
| Band | Agent collaboration, shared crisis room, handoffs, room messages, events, and human-in-the-loop coordination. | Yes. Core requirement. |
| Codeband | Reference for coding-agent collaboration, planning/review handoffs, branch discipline, and multi-agent development workflows. | Use as reference only, not product runtime. |
| AI/ML API | Primary model-provider option for agent reasoning, extraction, summarization, and structured outputs. | Yes. Primary provider. |
| Featherless AI | Serverless inference for open-source models, model discovery, and fallback inference. | Yes. Fallback and partner-prize path. |
| lablab.ai | Hackathon submission, partner access coordination, credits, event rules, judging, and community channel. | Yes. Submission and access only. |

## Partner Credits And Access

Based on the hackathon page:

| Partner | Hackathon access | Notes |
| --- | --- | --- |
| Band Pro | Promo code `BANDHACK26` for one free month. | May require billing setup. Cancel after the hackathon if not continuing. |
| AI/ML API | $10 per person, up to 500 participants, valid until hackathon ends, claimed through lablab.ai. | Each platform manages credits, limits, billing, API keys, and availability. |
| Featherless AI | $25 per participant, first-come first-served up to 1,000 participants, valid for one month from activation. Promo code `BOA26`. | Follow Featherless setup guide and confirm model availability on the active plan. |

Do not commit API keys, billing screenshots, coupon screenshots, or account details.

## How We Use AI/ML API

Use AI/ML API as the primary model provider for:

- Crisis Assessment classification and severity scoring.
- Legal and regulatory obligation extraction.
- Technical finding summarization.
- Communications draft generation after dependency gates pass.
- Escalation conflict detection and decision request drafting.

Implementation rules:

- Use the internal `model-provider` abstraction.
- Configure AI/ML API with `AIML_API_BASE_URL`, `AI_ML_API_KEY`, and `AIML_DEFAULT_MODEL`.
- Use low temperature for classification, compliance, and conflict detection.
- Use slightly higher temperature only for draft communications.
- Parse every response as structured JSON and validate it with Zod.
- Record provider, model, latency, retry count, and failure reason on each agent run.

## How We Use Featherless AI

Use Featherless as:

- fallback provider when AI/ML API is unavailable, slow, rate-limited, or missing a model we need
- open-source model path for the Featherless partner prize
- model discovery source for chat-capable, tool-capable, or longer-context open models

Implementation rules:

- Configure Featherless with `FEATHERLESS_API_BASE_URL`, `FEATHERLESS_API_KEY`, and `FEATHERLESS_DEFAULT_MODEL`.
- Call `GET /models` during setup or diagnostics to choose available models on the current plan.
- Prefer chat-capable models for all five agents.
- Filter for models available on the current plan before using them in the demo.
- Treat gated or unavailable models as setup failures, not runtime surprises.

## Optional Adjacent Tool: AgentOps

AgentOps appears in the lablab technology ecosystem and is useful for monitoring, debugging, session replay, metrics, and cost tracking for AI agents.

Use it only if the core demo is already stable. It is optional because:

- Band already gives us the visible collaboration layer.
- Supabase audit events already give us product-level traceability.
- Extra observability setup can distract from the 60-90 second demo if added too early.

If added, keep it behind an `agent-observability` abstraction and never log secrets or real regulated data.

## What Not To Add Yet

Do not add a new agent framework just because it appears in a partner ecosystem list. LangGraph, CrewAI, AutoGen, Pydantic AI, and similar frameworks may be useful later, but the first implementation should prove:

```text
Band room + backend gate + model-provider abstraction + Supabase audit state
```

If a framework helps one contributor move faster, it must still use the shared agent contract and communicate through Band.

## Current Recommendation

Use:

1. Band as the required collaboration layer.
2. Supabase as application state and audit storage.
3. AI/ML API as primary model inference.
4. Featherless as fallback and open-model inference.
5. Codeband ideas for team workflow only.
6. AgentOps only after the core demo works.

This gives us enough partner usage for the hackathon without turning the architecture into a vendor showcase.

## Sources

- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon)
- [Band platform](https://www.band.ai/platform)
- [Band coding agents](https://www.band.ai/for-coding-agents)
- [AI/ML API quickstart](https://docs.aimlapi.com/quickstart/simple-model)
- [AI/ML API text models reference](https://docs.aimlapi.com/api-references/text-models-llm)
- [AI/ML API supported SDKs](https://docs.aimlapi.com/quickstart/supported-sdks)
- [Featherless API overview](https://featherless.ai/docs/api-overview-and-common-options)
- [Featherless completions](https://featherless.ai/docs/completions)
- [Featherless models API](https://featherless.ai/docs/api-reference-models)
- [AgentOps technology page](https://lablab.ai/tech/agentops)
- [AgentOps docs](https://docs.agentops.ai/v1/introduction)
