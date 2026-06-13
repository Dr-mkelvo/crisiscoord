# CrisisCoord API Research Index

Last updated: June 13, 2026.

This folder documents the external APIs and SDK surfaces CrisisCoord expects to use. Keep these notes current as implementation decisions change.

## API Map

| Area | Provider | Purpose | Primary docs |
| --- | --- | --- | --- |
| Agent collaboration | Band Agent API / Band SDK | Shared crisis room, agent handoffs, message routing, room events, participant management | [Band Agent API](https://docs.thenvoi.com/api/agent-api) |
| App data | Supabase | Auth, Postgres records, audit timeline, synthetic evidence storage, optional realtime updates | [Supabase JS reference](https://supabase.com/docs/reference/javascript/introduction) |
| Model calls | AI/ML API | OpenAI-compatible model calls for agent reasoning and structured outputs | [AI/ML API quickstart](https://docs.aimlapi.com/quickstart/simple-model) |
| Model fallback | Featherless AI | OpenAI-compatible open-model inference and model discovery | [Featherless API overview](https://featherless.ai/docs/api-overview-and-common-options) |
| Runtime controls | Vercel | Hosting, functions, caching, CDN, and WAF rate limiting | [Vercel Functions](https://vercel.com/docs/functions) |

## Implementation Order

1. Wire environment validation for Band, Supabase, and model-provider keys.
2. Build a Band connection check: `GET /me` relative to the Band agent base URL for each remote agent key.
3. Build one model-provider client that accepts `baseURL`, `apiKey`, and `model`.
4. Create Supabase schema for incidents, rooms, agent outputs, evidence artifacts, human decisions, and audit events.
5. Implement the crisis trigger API that creates or seeds a Band room and records the incident in Supabase.
6. Add agent workers that process Band messages, write structured output, and post events back to Band.
7. Add Vercel rate limits, cache rules, and observability before the public demo link is shared.

## Data Rules

- Use synthetic demo incidents only.
- Do not send real regulated, legal, security, payment, employee, patient, or customer data to any API.
- Keep all generated communications in draft/review state until a human approves them.
- Store API keys only in local `.env.local`, Supabase secrets, or deployment environment settings.
- Do not expose Band agent keys, Supabase service-role keys, or model-provider keys in browser code.

## Files

- [band-api.md](./band-api.md): Band REST, WebSocket, SDK tools, message lifecycle, and CrisisCoord usage.
- [supabase-api.md](./supabase-api.md): Supabase client methods, schema starting point, RLS, Storage, Realtime, and Edge Functions.
- [model-provider-apis.md](./model-provider-apis.md): AI/ML API, Featherless AI, provider wrapper, fallback behavior, and structured-output rules.
- [runtime-and-rate-limits.md](./runtime-and-rate-limits.md): Vercel Functions, caching, CDN, and WAF rate-limiting notes.
