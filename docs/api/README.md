# CrisisCoord API Research Index

Last updated: June 13, 2026.

This folder documents the external APIs and SDK surfaces CrisisCoord expects to use. Keep these notes current as implementation decisions change.

## API Tiers

The project does not need every documented API key to run v1.

Use this categorization when setting up credentials:

| Tier | APIs | Required for v1? | Why it exists |
| --- | --- | --- | --- |
| Default v1 | Band, Supabase, AI/ML API, Featherless | Yes | Core crisis room, persistence, agent reasoning, and required partner proof. |
| Default optional | Resend | No | Only needed if the team wants safe test email instead of simulated sends. |
| Public live-data add-ons | CISA KEV, NVD, FIRST EPSS, OSV, GitHub Advisories, SEC EDGAR, openFDA | No | Evidence enrichment for more realistic source snapshots. These should not block the app. |
| Keyed threat-intel add-ons | OTX, AbuseIPDB, URLhaus | No | Deeper IOC enrichment if keys are available. Keep behind feature flags. |
| Enterprise workflow add-ons | Twilio, Slack, Teams, Jira, ServiceNow, alternate email providers | No | Future customer-style integrations for escalation, ticketing, and communications. |
| Runtime/observability add-ons | Vercel runtime controls, optional AgentOps | No | Hosting, rate limits, logs, and debugging once the core app works. |

For v1 setup, start with only:

```text
BAND_*
SUPABASE_*
AI_ML_API_KEY
FEATHERLESS_API_KEY
```

Add `RESEND_*` only if live test email is needed. Everything else is an add-on and should remain disabled until deliberately selected.

## API Map

| Area | Provider | Purpose | Primary docs |
| --- | --- | --- | --- |
| Agent collaboration | Band Agent API / Band SDK | Shared crisis room, agent handoffs, message routing, room events, participant management | [Band Agent API](https://docs.thenvoi.com/api/agent-api) |
| App data | Supabase | Auth, Postgres records, audit timeline, synthetic evidence storage, optional realtime updates | [Supabase JS reference](https://supabase.com/docs/reference/javascript/introduction) |
| Live source data | CISA KEV, NVD, FIRST EPSS, OSV, GitHub Advisories, SEC EDGAR, openFDA, optional OTX/AbuseIPDB/URLhaus | Real source snapshots for CVE, vulnerability, disclosure, recall, provider/feed health, source feed, global search, and audit evidence | [Live Data APIs](./live-data-apis.md) |
| Notifications and outbound communication | In-app, Band, Resend, Twilio, Slack, Teams, PagerDuty/Opsgenie-style paging, Jira/ServiceNow-style ticketing | Human escalation, acknowledgement, approved communication queueing, simulated demo sends, and audit logging | [Notification APIs](./notification-apis.md) |
| Main-path model calls | AI/ML API | Required OpenAI-compatible model calls for agent reasoning and structured outputs | [AI/ML API quickstart](https://docs.aimlapi.com/quickstart/simple-model) |
| Visible open-model call | Featherless AI | Required open-model inference, model discovery, and fallback support | [Featherless API overview](https://featherless.ai/docs/api-overview-and-common-options) |
| Agent observability | AgentOps | Optional session replay, metrics, cost tracking, and debugging if core demo is stable | [AgentOps docs](https://docs.agentops.ai/v1/introduction) |
| Runtime controls | Vercel | Hosting, functions, caching, CDN, and WAF rate limiting | [Vercel Functions](https://vercel.com/docs/functions) |

## Implementation Order

1. Wire environment validation for the default v1 keys: Band, Supabase, AI/ML API, and Featherless.
2. Build a Band connection check: `GET /me` relative to the Band agent base URL for each remote agent key.
3. Build one model-provider client that accepts `baseURL`, `apiKey`, and `model`.
4. Create Supabase schema for incidents, rooms, agent outputs, evidence artifacts, human decisions, and audit events.
5. Keep outbound communications simulated unless `RESEND_*` is configured with safe test recipients.
6. Implement the crisis signal API that creates or seeds a Band room and records the incident in Supabase.
7. Add in-app notification and human decision records before external sending.
8. Add agent workers that process Band messages, write structured output, and post events back to Band.
9. Prove AI/ML API and Featherless both appear in `agent_runs` and the UI/audit trail.
10. Add live-data adapters only after the default v1 loop works.
11. Add Vercel rate limits, cache rules, and observability before the public demo link is shared.

## Data Rules

- Use synthetic demo incidents only.
- Do not send real regulated, legal, security, payment, employee, patient, or customer data to any API.
- Keep all generated communications in draft/review state until a human approves them.
- Keep outbound communications simulated or test-recipient-only during the hackathon demo.
- Store API keys only in local `.env.local`, Supabase secrets, or deployment environment settings.
- Do not expose Band agent keys, Supabase service-role keys, or model-provider keys in browser code.

## Files

- [band-api.md](./band-api.md): Band REST, WebSocket, SDK tools, message lifecycle, and CrisisCoord usage.
- [supabase-api.md](./supabase-api.md): Supabase client methods, schema starting point, RLS, Storage, Realtime, and Edge Functions.
- [model-provider-apis.md](./model-provider-apis.md): AI/ML API, Featherless AI, provider wrapper, fallback behavior, and structured-output rules.
- [live-data-apis.md](./live-data-apis.md): public and optional keyed source APIs, UI placement, adapters, cache rules, and privacy constraints.
- [notification-apis.md](./notification-apis.md): in-app notifications, human escalation, email/SMS/internal connector options, API routes, and delivery safety.
- [runtime-and-rate-limits.md](./runtime-and-rate-limits.md): Vercel Functions, caching, CDN, and WAF rate-limiting notes.
- [../research/technology-partners.md](../research/technology-partners.md): Band, Codeband, AI/ML API, Featherless, lablab.ai, and optional AgentOps usage plan.
- [../architecture/partner-implementation-requirements.md](../architecture/partner-implementation-requirements.md): required partner proof and implementation acceptance gates.
