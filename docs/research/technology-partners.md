# Technology Partners And Provider Plan

Last updated: June 13, 2026.

## Purpose

This document captures the technology partners and adjacent tools CrisisCoord must account for. It turns the hackathon resource list into project decisions.

For the decision guardrails that explain what these partners may automate, draft, or escalate to humans, see [../product/decision-guardrails-questionnaire.md](../product/decision-guardrails-questionnaire.md).

## Partner Usage Policy

CrisisCoord must visibly use the hackathon partner stack in the submitted demo.

Required:

- Band must be the active multi-agent collaboration layer, not a final notification channel.
- Codeband patterns must inform the team workflow: branch isolation, planning/review handoffs, scoped PRs, and risk-aware merge rules.
- AI/ML API must power real agent reasoning in the main demo path.
- Featherless AI must power at least one real agent run or review step in the visible demo path.
- The UI and audit trail must show which provider powered each agent run.
- The submission notes must mention Band, AI/ML API, and Featherless AI as used technologies.

Not required for runtime:

- Codeband is a required development-process reference, not product runtime.
- lablab.ai is the hackathon/submission platform, not a runtime dependency.
- NativelyAI appears in event/community context, but the official technology partners called out for model/provider use are AI/ML API and Featherless AI.
- AgentOps is useful observability research, but it is not required for the MVP unless the team explicitly decides to include it after the core demo works.

## Confirmed Hackathon Technology Stack

The official hackathon page centers the build around:

| Technology | Role in CrisisCoord | Use requirement |
| --- | --- | --- |
| Band | Agent collaboration, shared crisis room, handoffs, room messages, events, and human-in-the-loop coordination. | Required. Core requirement. |
| Codeband | Reference for coding-agent collaboration, planning/review handoffs, branch discipline, and multi-agent development workflows. | Required as development-process influence, not product runtime. |
| AI/ML API | Model-provider for agent reasoning, extraction, summarization, and structured outputs. | Required in main demo path. |
| Featherless AI | Serverless inference for open-source models, model discovery, and partner-prize path. | Required in visible demo path. |
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

Use AI/ML API as the required primary model provider for:

- Crisis Assessment classification and severity scoring.
- Legal and regulatory obligation extraction.
- Escalation conflict detection and decision request drafting.

Recommended main-path assignment:

| Agent | Provider | Why |
| --- | --- | --- |
| Crisis Assessment Agent | AI/ML API | Fast, deterministic classification and routing. |
| Legal & Regulatory Agent | AI/ML API | Conservative structured obligation extraction. |
| Escalation & Decision Agent | AI/ML API | Conflict detection and human decision routing. |

Implementation rules:

- Use the internal `model-provider` abstraction.
- Configure AI/ML API with `AIML_API_BASE_URL`, `AI_ML_API_KEY`, and `AIML_DEFAULT_MODEL`.
- Use low temperature for classification, compliance, and conflict detection.
- Use slightly higher temperature only for draft communications.
- Parse every response as structured JSON and validate it with Zod.
- Record provider, model, latency, retry count, and failure reason on each agent run.

## How We Use Featherless AI

Use Featherless as a required open-model partner, not only as emergency fallback.

Required visible use:

| Agent or workflow | Provider | Why |
| --- | --- | --- |
| Technical Forensics Agent | Featherless AI | Open-source model inference for technical-scope summarization and containment reasoning. |
| Provider diagnostic panel | Featherless AI | Shows model discovery and current-plan availability before the demo run. |

Additional fallback use:

- Use Featherless when AI/ML API is unavailable, slow, rate-limited, or missing a model we need.
- Use Featherless for open-source model experiments if we add extra scenarios.
- Use Featherless model discovery for chat-capable, tool-capable, or longer-context open models.

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
3. AI/ML API as required main-path model inference.
4. Featherless as required visible open-model inference.
5. Codeband ideas for team workflow only, with branch/PR rules and playbooks carrying that influence.
6. AgentOps only after the core demo works and only if time allows.

This gives us clear partner usage for the hackathon without turning the architecture into a vendor showcase.

## Partner Proof Checklist

Before submission, verify:

- Band room shows at least three specialized agents collaborating through messages or events.
- AI/ML API is used by at least two main-path agents.
- Featherless is used by at least one main-path or visible demo agent.
- `agent_runs` records include provider and model for every model-backed run.
- The command-room UI shows provider badges or metadata in the agent detail/audit panel.
- The demo script names why each partner matters.
- Submission tags include Band, AI/ML API, and Featherless AI.

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
