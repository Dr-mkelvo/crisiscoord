# CrisisCoord Product And Build Plan

Last updated: June 13, 2026.

## What We Are Building

CrisisCoord is a multi-agent enterprise crisis response room for regulated, high-stakes incidents.

The first product experience is a crisis command room. A user enters or receives an incident signal, then five specialized agents coordinate through Band to assess the situation, identify obligations, confirm technical scope, draft communications, and escalate human decisions.

This is not a chatbot, a generic incident tracker, or a static dashboard. The product is the coordination layer between specialized agents, human reviewers, and an auditable crisis timeline.

## Planning Docs

- [Project vision](./project-vision.md): goal, vision, users, differentiation, and product boundaries.
- [Decision guardrails plan](./decision-guardrails-questionnaire.md): Six Thinking Hats operating plan for AI boundaries, privacy, communications, crisis clocks, and human escalation.
- [System architecture](../architecture/system-architecture.md): frontend, Figma, backend, agents, Band tools, data, and build order.
- [Platform support](../platform-support.md): macOS/Linux/Windows setup rules plus mobile/tablet/desktop responsive standards.
- [Partner implementation requirements](../architecture/partner-implementation-requirements.md): acceptance gates for Band, AI/ML API, Featherless, Codeband, and provider proof.
- [UI page plan](../design/ui-page-plan.md): page map, no-one-shot rule, Figma frames, and wireframe sketch.
- [Command room page plan](../design/command-room-page-plan.md): dashboard anatomy, tabs, table usage, decision desk, and happy path.
- [UI color system](../design/ui-color-system.md): Figma/Tailwind-ready color tokens, severity mapping, state mapping, and accessibility rules.
- [Demo day failure plan](../demo/demo-day-failure-plan.md): live, assisted, and seeded demo modes plus failure matrix and readiness checklist.
- [Research roadmap](../research/research-roadmap.md): what has been researched, what still needs targeted validation, and when to research it.
- [Competitive UI notes](../research/competitive-ui-notes.md): public incident-management and adjacent hackathon submission research.
- [Competitor landscape](../research/competitor-landscape.md): closest product categories, competitor patterns, and CrisisCoord differentiation.
- [Technology partner plan](../research/technology-partners.md): required Band, AI/ML API, and Featherless usage plus Codeband/lablab.ai/AgentOps boundaries.
- [Presentation packet](../presentation/README.md): Gamma deck brief, visual storyboard, and architecture caveat for the pitch.
- [Crisis signal model](./crisis-signal-model.md): why the product starts from an incident signal, not a file upload.
- [Compliance signal model](../compliance/trigger-model.md): what counts as a regulated crisis signal and how SEC, CVE, zero-day, GDPR, HIPAA, CISA, ransomware, and supply-chain scenarios route through the system.

## What The App Must Do

1. Capture a synthetic crisis signal.
2. Start a Band-backed crisis room.
3. Run the Crisis Assessment Agent first.
4. Run Legal and Technical agents from the shared assessment context.
5. Block Communications until Legal and Technical have posted their findings.
6. Generate regulator, customer, and executive draft communications in review-only state.
7. Run Escalation after enough room state exists.
8. Show human decision points, conflicts, missing evidence, deadlines, and approvals.
9. Persist the incident, agent outputs, decisions, and audit events in Supabase.
10. Present a clean demo flow that judges can understand in 60-90 seconds.

The app must not start from a CSV/PDF upload. Evidence upload can be added later as supporting material after an incident exists.

## How We Are Building It

The build should happen in layers:

1. App shell: React, TypeScript, Vite, Tailwind, TanStack Router, and the command-room layout.
2. Synthetic demo state: one polished crisis scenario with all agent outputs represented.
3. Data model: Supabase tables for incidents, rooms, agent runs, outputs, decisions, and audit events.
4. Band adapter: a thin service layer for Band agent identity, room state, messages, and events.
5. Agent contracts: Zod schemas for each agent input and output.
6. API routes: Hono or Fastify endpoints for incident intake, agent runs, decisions, and timeline reads.
7. UI components: incident bar, agent rail, Band timeline, dependency gate, draft review panel, decision queue, and audit log.
8. Real integrations: connect Band, model providers, and Supabase after the synthetic flow is visually correct.
9. Partner proof: verify Band collaboration, AI/ML API-backed runs, Featherless-backed runs, and visible provider metadata.
10. Verification: unit tests for contracts and Playwright checks for the demo path across mobile, tablet, and desktop.
11. Demo resilience: live, assisted, and seeded modes from [demo-day-failure-plan.md](../demo/demo-day-failure-plan.md).
12. Demo polish: short copy, stable states, no real data, and no unsupported legal claims.

## MVP Scope

The MVP should prove one scenario end to end:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Required visible output:

- Assessment classifies severity and crisis type through AI/ML API.
- Legal identifies disclosure windows and unknowns through AI/ML API.
- Technical confirms affected systems, record scope, containment, and confidence through Featherless.
- Communications drafts only after Legal and Technical are available.
- Escalation asks for a human decision about proactive customer notification through AI/ML API.
- The audit trail shows provider/model metadata for each model-backed agent.

## What We Are Not Building

- No real legal advice.
- No real incident response system connected to customer infrastructure.
- No real customer, employee, patient, payment, legal, security, or confidential company data.
- No broad SOC platform.
- No generic admin dashboard detached from the crisis workflow.
- No upload-first investigation flow.
- No direct publishing of generated communications without human approval.

## Research Status

Foundational research is sufficient to start implementation.

Already covered:

- hackathon requirements and judging criteria
- Band collaboration concepts and API direction
- Supabase fit for database, auth, storage, realtime, and RLS
- required technology partner usage, including Band, AI/ML API, and Featherless
- model provider options, including AI/ML API as main-path provider and Featherless as visible open-model provider
- regulated incident disclosure concepts for demo grounding
- closest product categories and competitor positioning
- crisis signal model and upload-first anti-pattern
- production standards across frontend, backend, data, auth, security, deployment, testing, observability, rate limiting, caching, backup, and compliance
- UI/UX direction for an operational command-center product
- cross-platform contributor setup and responsive viewport requirements
- automation boundaries, five-agent default, human escalation rules, and Six Thinking Hats operating plan

Research still needed during implementation:

- confirm live Band credentials and exact SDK/API calls in our environment
- confirm final Supabase project setup and local migration flow
- confirm which model provider is fastest and stable enough for the demo
- confirm the command-room color tokens in Figma before final UI polish
- verify any regulatory wording used in public demo copy before submission
- test Vercel deployment behavior, environment variables, and rate limits
- test live, assisted, and seeded demo modes before submission

That means we should not pause for broad research. We should start building, and only do targeted research when an implementation choice depends on a live API detail.

## Build Policy

- Every major change gets a branch, commit, push, pull request, and immediate merge during initial setup.
- `main` remains protected for normal collaboration.
- Contributors work on feature branches.
- Use synthetic data only.
- Keep all copied material out of the repo unless its license and purpose are clear.
- Keep every doc written as CrisisCoord-owned project guidance.
- Keep scripts and setup instructions portable across macOS, Linux, and Windows.
- Verify major UI work at mobile, tablet, laptop, and desktop viewport sizes.
- Do not automate external, legal, destructive, or unclear high-risk decisions.
