# Runtime, Caching, And Rate-Limit Notes

Last updated: June 13, 2026.

This file covers the API-adjacent runtime controls we need for a reliable public demo: Vercel Functions, CDN caching, and WAF rate limiting.

## Vercel Functions

Vercel Functions run server-side code without managing servers. For CrisisCoord, they are useful for:

- crisis trigger endpoint
- health checks
- model-provider proxy calls
- Band connection checks
- signed URL helpers
- lightweight admin/demo reset actions

Recommended routes once the app is scaffolded:

| Route | Purpose |
| --- | --- |
| `POST /api/incidents` | Create synthetic incident and start Band workflow. |
| `GET /api/incidents/:id` | Read incident summary for UI. |
| `POST /api/incidents/:id/demo-reset` | Reset synthetic demo state. Restrict to admin. |
| `GET /api/health` | Check app, Supabase, and optional Band config presence. |
| `POST /api/model/structured` | Server-side model call with validation and rate limiting. |

Keep model-provider and service-role calls server-side.

## Caching

Vercel caches at multiple layers, including CDN cache, framework cache, runtime cache, and image cache.

CrisisCoord caching rules:

- Do not cache authenticated incident dashboards globally.
- Do not cache API responses that include user-specific data, draft communications, secrets, or decision records.
- Cache only public static assets and demo-safe static documentation.
- For read-heavy public demo pages, set conservative cache headers and add a visible refresh timestamp.

Suggested default for sensitive API responses:

```http
Cache-Control: no-store
```

Suggested default for static assets handled by the framework:

```http
Cache-Control: public, max-age=31536000, immutable
```

## Rate Limiting

Vercel WAF rate limiting can limit repeated requests from the same source. This protects:

- `/api/model/*`
- `/api/incidents`
- `/api/incidents/*/demo-reset`
- auth routes if exposed through custom endpoints

Recommended demo defaults:

| Area | Suggested protection |
| --- | --- |
| Model proxy | Low request limit per IP and route. Return `429` on abuse. |
| Incident creation | Small fixed-window limit to prevent accidental rapid demo resets. |
| Health check | Higher limit, cheap response, no secrets. |
| Static docs | CDN cache, no special WAF rule required. |

Vercel docs note that rate-limit counters are tracked per region, so global traffic may exceed a single configured regional limit. Keep server-side model/provider safeguards as a second layer.

## Operational Checks

Before sharing a public URL:

- Confirm `.env.local` and deployment secrets are not committed.
- Confirm service-role and model-provider calls are server-side only.
- Confirm sensitive routes return `Cache-Control: no-store`.
- Confirm rate limits are active for expensive endpoints.
- Confirm logs redact API keys and incident payload details.
- Confirm demo data is synthetic.

## Sources

- [Vercel Functions](https://vercel.com/docs/functions)
- [Vercel Caching](https://vercel.com/docs/caching)
- [Vercel WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting)
