# Generic Incident Backend Roadmap

## Why This Exists

The first UI pass overfit the app to one synthetic payment incident. That was useful for a demo story, but it was too narrow for the actual product. CrisisCoord must handle many regulated crisis types through the same command-room workflow.

The product now treats the incident as active workspace context instead of a visible section URL:

- `/command`
- `/communications`
- `/audit`

Incident record IDs still exist in backend payloads and API endpoints, but they should not be exposed in the main product navigation. The crisis type belongs in the incident payload and UI, not in the route. Legacy incident-scoped demo URLs redirect to clean workspace sections instead of becoming permanent product assumptions.

## Assumptions Found And Fixed

| Narrow assumption | Why it was wrong | Fix |
| --- | --- | --- |
| Hardcoded semantic incident URLs | CrisisCoord receives unknown signals and then classifies them. URLs must not imply we knew the crisis type upfront. | Replaced page URLs with clean workspace sections such as `/command`, `/communications`, and `/audit`. |
| One active payment-data command room | The same workflow must handle vendor, ransomware, privacy, product, and finance scenarios. | Added five seeded incident scenarios. |
| Frontend-only seeded data | API keys alone would not make the backend work. | Added a no-key local backend API that serves seeded workspace payloads. |
| Frontend actions knew only one incident | Clicking Email, Audit, or Command needed to preserve selected incident context without exposing it in every URL. | Actions navigate to clean workspace URLs while the payload keeps `activeIncidentId`. |
| Browser tests only checked one scenario URL | Tests could pass while the product stayed narrow. | E2E tests now cover clean workspace URLs, legacy redirect behavior, and a live deadline clock. |

## Current Backend Foundation

The backend is intentionally no-key and seeded at this stage.

Implemented endpoints:

- `GET /api/health`
- `GET /api/incidents`
- `GET /api/incidents/:incidentId`
- `GET /api/workspace?incidentId=:incidentId`
- `GET /api/incidents/:incidentId/workspace`

Current seeded incident scenarios:

- `inc-2026-0001` - vendor and SaaS access scenario
- `inc-2026-0002` - ransomware and outage response scenario
- `inc-2026-0003` - healthcare privacy workflow scenario
- `inc-2026-0004` - product and supply-chain safety scenario
- `inc-2026-0005` - finance and payments exposure scenario

Legacy semantic slugs and old incident-scoped workspace URLs are compatibility redirects only. New UI code, docs, tests, and demos should use clean workspace routes.

## Frontend Data Flow

1. Signal Intake or Incident Registry selects an active incident.
2. Frontend stores the selected incident as workspace context and navigates to `/command`, `/communications`, `/decisions`, or `/audit`.
3. Frontend requests `/api/workspace?incidentId=:incidentId`.
4. API returns the seven workspace pages shaped for that incident.
5. Frontend keeps a local seeded fallback if the API is unavailable.
6. Actions such as Email, Audit, Messaging, and Command preserve the active incident id in state/API context, not in the visible section URL.
7. Deadline and counter cards derive from scenario timing plus recorded workflow events, not random numbers.

## Exa Research Cross-Check

The generic route and backend direction were checked against an Exa research pass on current incident-response guidance and nearby product patterns. The research confirmed that CrisisCoord should stay generic, global, and signal-first.

Key takeaways:

- NIST SP 800-61 Rev. 3 treats incident response as organization-wide cybersecurity risk management, not a single breach playbook. It supports a broad scenario catalog across SaaS compromise, ransomware, phishing fraud, vulnerability exploitation, supply-chain compromise, and data exposure.
- CISA guidance reinforces named human roles, stakeholder plans, communications ownership, out-of-band notification options, contact lists, tabletop exercises, retrospectives, and evidence preservation.
- Cortex XSOAR and Splunk SOAR validate per-incident war rooms, incident-specific layouts, tabs, playbooks, integrations, evidence tagging, auto-documentation, and action history.
- GDPR, SEC, and HIPAA sources confirm that deadline clocks and notification duties are contextual. The Legal & Regulatory Agent should produce candidate obligations for human review, not final legal determinations.

Implementation rule:

```text
No top-level route, backend endpoint, UI action, seeded fixture, or browser test should depend on one permanent incident category.
```

See [../research/exa-generic-incident-research.md](../research/exa-generic-incident-research.md).

## Next Backend Roadmap

### Phase 1: Contracts And Persistence

- Move shared incident/workspace contracts into a dedicated shared module.
- Add Supabase schema for incidents, signals, agents, Band messages, decisions, evidence, delivery attempts, and audit events.
- Add migrations and seed scripts.
- Keep RLS and role design ready for Legal, Technical, Communications, Executive, Admin, and Read-only roles.

### Phase 2: Provider Adapters

- Add Band room adapter.
- Add AI/ML API and Featherless model adapters.
- Add notification adapters in safe mode first: in-app, Band, email test mode, SMS simulation.
- Store provider metadata and fallback state in the audit trail.

### Phase 3: Agent Runtime

- Implement Assessment, Legal & Regulatory, Technical Forensics, Stakeholder Communications, and Escalation & Decision agents.
- Enforce the Communications dependency gate in the backend, not only in the UI.
- Persist agent inputs, outputs, confidence, unknowns, and human-review requirements.

### Phase 4: Production Safety

- Add auth and tenant isolation.
- Add redaction and prompt-safety checks server-side.
- Add rate limiting and request validation.
- Add audit export packages.
- Add CI checks for unit tests, browser tests, backend type checks, and migrations.

## Verification Expectations

Before a PR touches incident routing, backend payloads, or workspace tabs, run:

```bash
npm run test
npm run test:e2e
npm run build
npm run build:api
```

Use `npm run test:all` when you want the full chain in one command.
