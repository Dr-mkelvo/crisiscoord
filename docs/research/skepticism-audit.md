# Skepticism Audit

Last updated: June 13, 2026.

## Purpose

This audit checks the current CrisisCoord documentation from a skeptical implementation and demo-readiness angle.

The goal is not to add more brainstorming. The goal is to identify what could still break the project, confuse contributors, weaken the pitch, or cause the team to build the wrong thing.

## Method

Reviewed:

- product docs
- architecture docs
- API docs
- compliance and crisis signal docs
- design docs
- demo and presentation docs
- collaboration docs
- local skills and repo workflow files

Checks run:

- `node scripts/check-master-doc-consistency.mjs`
- `git diff --check`
- repository scans for stale stack options, regional-only framing, unresolved implementation decisions, upload-first language, partner-proof gaps, and planned-versus-live architecture language

## What Looks Strong

The project now has a much clearer center of gravity:

- The first experience is a crisis command room, not a landing page or upload tool.
- The five-agent model is justified and mapped to real crisis roles.
- Band is framed as the active collaboration layer, not a notification wrapper.
- Communications is dependency-gated by Legal and Technical.
- Supabase is consistently positioned as app state and queryable audit state.
- AI/ML API and Featherless are required in visible demo paths.
- The project is global by default, with sector sandboxes rather than one-country assumptions.
- Finance, Health, and Product/Supply Chain give the demo room to grow without becoming generic.
- Human approval is consistently required for external, legal, destructive, or unclear high-risk actions.
- The team has collaboration rules, branch rules, skills, a PR template, and a local push guard.

## Highest-Risk Gaps

### 1. Band Runtime Path Is Still Not Proven

Status: open blocker.

The docs correctly describe Band as core, but implementation still needs a live runtime decision:

- TypeScript workers
- Python SDK workers
- direct Agent API
- hybrid approach

Risk:

If this is not spiked early, the team may build a polished UI with only simulated collaboration.

Recommendation:

- Run a focused Band spike before building all agents.
- Prove one remote agent can receive context, post a message, post an event, and store the Band reference in Supabase.
- Default to TypeScript only if the SDK/API path is fast enough for the team.
- Use Python SDK workers if that is the faster documented path.
- Keep seeded fallback mode, but do not let fallback become the only demo path.

### 2. Contracts Are Planned But Not Concrete

Status: open blocker.

The docs name contracts such as `CrisisSignal`, `AgentRun`, `AgentFinding`, `CommunicationDraft`, and `DecisionRequest`, but the repo does not yet have actual shared Zod schemas.

Risk:

Each contributor could invent slightly different shapes for agent outputs, UI state, Band messages, and Supabase rows.

Recommendation:

- Create `src/contracts/` before implementing agent logic.
- Add one schema file per domain: crisis signal, sandbox, agent run, findings, drafts, decisions, audit events.
- Make every seeded fixture validate against the same schemas.
- Block model output from entering Supabase until it validates.

### 3. Supabase Schema Needs A First Migration

Status: open blocker.

The docs list tables, but there is no migration or SQL source of truth yet.

Risk:

UI, backend, and audit work will drift if the schema remains prose-only.

Recommendation:

- Add the first migration with incidents, rooms, agent runs, findings, drafts, decisions, audit events, and sandbox profiles.
- Enable RLS immediately.
- Add indexes for `incident_id`, `room_id`, `agent_name`, `status`, `created_at`, and `idempotency_key`.
- Add synthetic seed data for the first finance scenario.

### 4. Three Sandboxes Are Conceptual, Not Buildable Yet

Status: open blocker.

The master guide defines Finance, Health, and Product/Supply Chain sandboxes, but there is no fixture format or loader yet.

Risk:

The team could talk about three sandboxes but only build one hard-coded scenario.

Recommendation:

- Create `fixtures/sandboxes/`.
- Add `finance-payment-exposure.json`, `health-patient-record-exposure.json`, and `product-supply-chain-recall.json`.
- Each fixture should include safe facts, blocked facts, expected agent route, seeded outputs, and required reviewers.
- The scenario launcher should load a sandbox profile, not hard-code the payment scenario.

### 5. Demo Acceptance Gates Are Not Executable Yet

Status: open blocker.

The docs describe partner proof and demo modes, but there is no command that verifies readiness.

Risk:

On demo day, the team may discover too late that Band, AI/ML API, Featherless, Supabase, or seeded mode is broken.

Recommendation:

- Add a `pnpm demo:check` script once the app exists.
- It should verify environment variables, Band identity checks, model-provider diagnostics, Supabase connectivity, seed fixture validity, and responsive smoke tests.
- It should print `live`, `assisted`, or `seeded` readiness.

## Medium-Risk Gaps

### 6. Presentation Docs Were Slightly Behind The Master Guide

Status: patched in this audit pass.

The presentation docs still framed architecture as not yet finalized. The master implementation guide is now the source of truth, so the presentation should say built, seeded, or planned instead of presenting the architecture as unsettled.

Recommendation:

- Keep Gamma slides aligned with the master implementation guide.
- Never present planned pieces as live.

### 7. Stack Decision Drift Needed Cleanup

Status: patched in this audit pass.

Some docs still presented the backend framework and auth provider as open choices, while production standards already preferred Hono and Supabase Auth.

Recommendation:

- Use Hono as the default backend API.
- Use Supabase Auth first.
- Treat Fastify or Clerk as fallback decisions only if the preferred path blocks the demo.

### 8. Seven Routes Can Still Tempt Overbuilding

Status: watch item.

The seven-route plan is useful as a ceiling, but the hackathon build should be deep in the command room before it is wide across routes.

Risk:

Contributors may split effort across route shells and leave the core room shallow.

Recommendation:

- Build `/command` first, with the selected incident held in app/API context.
- Add `/signals` as the Signal Intake and Sandbox Launcher.
- Add `/settings` only if needed for provider diagnostics.
- Treat the remaining routes as panels or later routes until the demo path works.

### 9. Legal And Compliance Wording Needs A Final Source Review

Status: watch item.

The docs generally use candidate/review language, which is good. Still, final demo copy needs one last review to avoid sounding like legal advice or implying exact obligations without enough context.

Risk:

Judges may be sensitive to overclaiming in regulated workflows.

Recommendation:

- Keep every legal/regulatory result labeled as candidate guidance for human review.
- Show assumptions and missing facts beside every deadline or obligation.
- Before submission, review public-facing copy in README, deck, UI, and video script.

### 10. Provider Defaults May Not Be Available On Demo Accounts

Status: watch item.

The docs name default models, but live availability depends on the active account, provider limits, and promo setup.

Risk:

Agent calls fail even though the code is correct.

Recommendation:

- Add provider diagnostics early.
- Discover available Featherless models at runtime or setup time.
- Keep default model names configurable.
- Store fallback reason in `agent_runs`.

### 11. Audit Trail Is Strong In Prose But Needs Exact Event Shape

Status: watch item.

The docs define event names and audit intent, but not yet a final `AuditEvent` schema.

Risk:

The UI, Band adapter, and Supabase records could disagree about event shape.

Recommendation:

- Define the audit event contract alongside the first Supabase migration.
- Include actor type, actor ID, action, target type, target ID, source system, Band reference, provider reference, before/after state, and timestamp.
- Make audit records append-only from normal app flows.

### 12. Prompt-Injection And Unsafe Evidence Handling Need Test Fixtures

Status: watch item.

The docs repeatedly say not to send raw sensitive data or untrusted evidence to models. The implementation still needs test cases that prove those rules work.

Risk:

The app may be safe by intention but not by enforcement.

Recommendation:

- Add fixtures with fake secrets, fake payment data, fake patient identifiers, and malicious instruction text.
- Verify redaction blocks or removes them before model calls.
- Verify the model never receives raw evidence dumps in the demo path.

### 13. Team Ownership Exists In Docs But Not In Work Items

Status: watch item.

The docs list roles, branches, and ownership areas, but there are no issues or task cards yet.

Risk:

Multiple contributors may work on the same surface or leave blockers unowned.

Recommendation:

- Create GitHub issues or a simple task board for the top implementation slices.
- Assign one owner to Band spike, contracts/schema, command room UI, provider wrapper, sandbox fixtures, and demo readiness.
- Keep PRs small enough to review quickly.

## Lower-Risk Gaps

### 14. Research Docs Still Contain Older Planning Context

Status: acceptable.

Some research docs keep earlier questions and source exploration. That is fine as long as product docs remain the source of truth.

Recommendation:

- Do not rewrite every research note.
- Add a short note only if a research doc contradicts current master guidance.

### 15. Static Diagram Export Is Not Needed Yet

Status: acceptable.

The Mermaid diagram is the right source of truth. A static image is useful later for Gamma or Figma, but not required now.

Recommendation:

- Export from Mermaid only when needed for the deck.
- Do not hand-edit the exported image.

## Recommended Next Work Order

1. Band runtime spike: one agent receives, posts, and stores references.
2. Contract package: shared Zod schemas for crisis signal, sandbox, agent outputs, drafts, decisions, and audit events.
3. Supabase migration and synthetic seed.
4. Scenario fixture loader for the three sandboxes.
5. Static command room wired to fixture state.
6. Assessment agent end to end through AI/ML API.
7. Technical agent through Featherless and Legal agent through AI/ML API.
8. Communications dependency gate.
9. Escalation decision request.
10. Provider/Band/Supabase readiness diagnostics.
11. Playwright demo path and responsive checks.
12. Gamma deck update from real screenshots or clearly marked mockups.

## Bottom Line

The roadmap is now strong enough to start building.

The biggest remaining risk is not product direction. The risk is execution drift: building UI before proving Band, writing agents before contracts, or presenting planned pieces as live.

If the team keeps the next sprint focused on Band proof, contracts, schema, fixtures, and one excellent command-room path, the project is in a good place.
