# Research Roadmap

Last updated: June 13, 2026.

## Purpose

This roadmap defines what we need to research before and during implementation so we do not miss important blind spots, copy an existing project, or build a regulated workflow with weak assumptions.

The rule is:

> Do broad research before architecture locks. Do targeted research during implementation when a live API, regulation, or integration detail blocks a decision.

## Research Coverage Status

We have enough foundational research to proceed into design and implementation.

Covered enough for the first build:

- Band hackathon requirements, judging criteria, Agent API, SDK, WebSocket flow, and adapter options.
- Supabase database/auth/storage direction.
- AI/ML API and Featherless model-provider direction, with both required in the demo and direct OpenAI treated as optional.
- Technology partner plan for Band, Codeband, AI/ML API, Featherless, lablab.ai, and optional AgentOps.
- UI/UX direction, Figma workflow, page map, color system, dashboard anatomy, adjacent submission notes, and low-fidelity command-room wireframe.
- Competitor landscape covering incident operations, breach response, privacy incident management, AI regulatory reporting, and adjacent hackathon submissions.
- HIPAA breach-notification basics for unsecured protected health information.
- GDPR personal-data breach notification basics.
- SEC public-company cybersecurity disclosure review basics.
- CISA incident notification fields, attack-vector taxonomy, KEV catalog, BOD 26-04 risk factors, and CIRCIA status.
- Crisis signal taxonomy covering payment data, public-company cyber events, GDPR, HIPAA, critical infrastructure, CVE/KEV, zero-day, ransomware, supply-chain, and product-safety scenarios.
- Decision guardrails covering five-agent scope, partner proof, automation boundaries, human-only decisions, and demo escalation rules.

Still needs targeted validation during implementation:

- live Band credentials, limits, SDK behavior, and exact deployment flow
- provider latency, JSON reliability, retry limits, and rate limits
- Supabase RLS policies and realtime limits
- final demo wording for any regulatory claims
- Vercel deployment, WAF/rate-limit behavior, and environment handling
- live, assisted, and seeded demo-mode behavior

So the project is not blocked on broad research. The remaining research should be tied to implementation decisions.

## Research Questions To Exhaust

### 1. Hackathon Fit

Questions:

- What does the hackathon require?
- What does a winning Band project need to show?
- How many agents are required?
- What counts as meaningful Band usage?
- Which partner technologies matter?

Current answer:

- At least three agents must collaborate through Band.
- Strong submissions should show handoffs, shared context, role specialization, task state, review, decision-making, and Band as the active coordination layer.
- CrisisCoord fits Track 3: Regulated & High-Stakes Workflows.
- Partner tools required for the demo: Band, AI/ML API, and Featherless AI.
- Codeband is useful as development-workflow reference, not product runtime.
- AgentOps-style observability is optional and should wait until the core demo is stable.

See [technology-partners.md](./technology-partners.md).

### 2. Existing / Adjacent Projects

Questions:

- Has someone already built the same thing?
- Which nearby ideas exist in this hackathon or adjacent hackathons?
- How do we avoid sounding like a copy?

Current findings:

- There are adjacent "war room" and incident response ideas.
- There are SOC automation, financial decision, risk-review, and generic command-center projects.
- CrisisCoord should differentiate as regulated crisis governance, with dependency-gated legal, technical, communications, and human decision workflows.
- Current adjacent submission notes are documented in [competitive-ui-notes.md](./competitive-ui-notes.md).
- The broader competitor landscape is documented in [competitor-landscape.md](./competitor-landscape.md).

Research action:

- Re-check the public submissions list before finalizing the demo title and pitch.
- Compare against SOC, SOAR, crisis-management, and AI copilot products.
- Keep our story focused on cross-functional regulated response, not generic incident triage.

### 3. Band Runtime And Tools

Questions:

- Should we use Band SDK, direct Agent API, or both?
- Which language path is fastest?
- Which adapters are stable enough?
- How do agents receive messages?
- What can Band tools do for us?

Current findings:

- Band provides REST for commands and WebSocket subscriptions for live events.
- The SDK handles WebSocket subscriptions, room lifecycle, crash recovery, and tool exposure.
- Available adapters include LangGraph, CrewAI, Pydantic AI, Claude SDK, Codex, OpenAI-compatible, Gemini, Google ADK, Letta, and Parlant.
- Platform tools include message sending, event posting, participant management, peer lookup, and chat room creation.
- REST-only integration can send commands but cannot replace live WebSocket subscriptions for receiving messages.

Research action:

- Validate event-issued Band credentials.
- Spike one agent with the SDK.
- Confirm TypeScript vs Python SDK speed.
- Confirm how to expose custom tools and structured output.

### 4. Model Providers

Questions:

- Do we need OpenAI?
- Which model provider is fast and stable enough for the demo?
- Can we switch providers quickly if one fails?

Current answer:

- We do not need direct OpenAI unless we choose it later.
- We must use AI/ML API and Featherless through an OpenAI-compatible client shape.
- The architecture should call this `model-provider`, not `openai`.

Research action:

- Run timing tests for Assessment, Legal, Technical, Communications, and Escalation prompts.
- Confirm JSON output reliability.
- Confirm AI/ML API main-path behavior.
- Confirm Featherless visible-demo behavior and fallback behavior.
- Track latency, failure rate, and cost.

### 5. UI/UX And Figma

Questions:

- What should the first screen be?
- How do we make the product feel enterprise-grade?
- What should be designed in Figma before coding?

Current answer:

- First screen is the crisis command room.
- The UI should be operational SaaS: dense, calm, scan-friendly, and auditable.
- Figma should define tokens, components, command-room frames, mobile reviewer frames, and demo prototype states.
- The recommended color system is light-first neutral with semantic status accents; see [../design/ui-color-system.md](../design/ui-color-system.md).
- The dashboard should use Overview, Handoffs, Findings, Drafts, and Audit tabs; see [../design/command-room-page-plan.md](../design/command-room-page-plan.md).

Research action:

- Create Figma frames for all key states.
- Validate that a judge can understand the workflow in 10 seconds.
- Keep third-party templates as inspiration only.

### 6. Backend And Data Model

Questions:

- What data is the source of truth?
- How do we represent agent outputs?
- How do we enforce workflow gates?
- How does the audit timeline work?

Current answer:

- Supabase is the app source of truth.
- Band is the collaboration record.
- Communications dependency gate must be enforced server-side.
- Zod contracts validate every agent output.

Research action:

- Confirm Supabase Auth and RLS setup.
- Design schema for incidents, rooms, agent runs, findings, drafts, decisions, and audit events.
- Validate seed/reset flow for demo reproducibility.

### 7. Compliance And Crisis Signal Model

Questions:

- What is considered a crisis signal?
- How do we identify SEC, GDPR, HIPAA, CVE, zero-day, ransomware, and supply-chain scenarios?
- What should the agents flag vs what should humans decide?
- Why should the product not start from file upload?

Current answer:

- A crisis signal is a fact pattern that may create a crisis workflow, regulatory review, operational response, disclosure clock, or human decision.
- Agents should detect possible regulated conditions and route them to review.
- The product should never claim final legal determination.
- CSV/PDF upload is not the crisis signal. Files can be supporting evidence after an incident exists.

Research action:

- Build a crisis signal taxonomy.
- Map signals to agent routing.
- Add source references and confidence fields.
- Test multiple demo scenarios beyond the payment breach.
- Use [../product/decision-guardrails-questionnaire.md](../product/decision-guardrails-questionnaire.md) to decide what agents can automate and what must escalate.

### 8. Security And Abuse

Questions:

- What could go wrong with the app itself?
- How do we avoid unsafe autonomous behavior?
- How do we prevent prompt injection and bogus outputs?

Research action:

- Threat model agent prompts, uploaded synthetic evidence, dependency gates, role approvals, and model output parsing.
- Keep external sending disabled.
- Keep a clear distinction between draft, reviewed, approved, and sent.
- Add prompt-injection checks if we support document upload.
- Prevent excessive agency by minimizing agent permissions and requiring human approval for high-impact actions.

## Research Phases

### Phase 0: Done Enough To Start

- Hackathon requirements.
- Band architecture direction.
- Supabase choice.
- Model-provider direction.
- UI direction.
- Production standards.
- Initial compliance source list.

### Phase 1: Before First Code Merge

- Finalize Figma command-room frame.
- Confirm Band credentials and SDK path.
- Confirm direct OpenAI is not required.
- Finalize database schema draft.
- Finalize crisis signal taxonomy v1.

### Phase 2: During Implementation

- Validate Band room creation and participant recruitment.
- Validate one full agent message loop.
- Validate provider JSON output.
- Validate Supabase RLS policies.
- Validate Communications dependency gate.
- Validate audit events.

### Phase 3: Before Submission

- Re-check adjacent submissions.
- Verify all regulatory wording in demo copy.
- Run demo end to end.
- Run live, assisted, and seeded demo modes.
- Confirm no real data or secrets.
- Confirm README and onboarding are enough for judges and collaborators.

## Current Source List

- Hackathon page: https://lablab.ai/ai-hackathons/band-of-agents-hackathon
- Band SDK overview: https://docs.thenvoi.com/integrations/sdks/overview
- Band framework adapters: https://docs.thenvoi.com/integrations/adapters
- Band Agent API: https://docs.thenvoi.com/api/agent-api
- Codeband: https://github.com/thenvoi/codeband
- CISA Known Exploited Vulnerabilities Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- CISA BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk
- NIST SP 800-61r3 announcement: https://www.nist.gov/news-events/news/2025/04/nist-revises-sp-800-61-incident-response-recommendations-and-considerations
- CISA Federal Incident Notification Guidelines: https://www.cisa.gov/federal-incident-notification-guidelines
- SEC cybersecurity disclosure guide: https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure
- EDPB data breach guide: https://www.edpb.europa.eu/sme-data-protection-guide/data-breaches_en
- HHS HIPAA breach notification: https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html
