# Demo Day Failure Plan

Last updated: June 13, 2026.

## Purpose

The demo should look calm even if a provider, Band connection, database, hosting platform, or network path misbehaves. The user and judges should still understand the product, the Band coordination story, partner usage, dependency gate, human decision flow, and audit trail.

This plan defines the live path, fallback path, and pre-demo checks.

## Demo Modes

The app should support three demo modes.

### 1. Live Mode

Use when all integrations are healthy.

Live mode uses:

- Band room creation and agent messages/events
- Supabase incident and audit records
- AI/ML API for Assessment, Legal, Communications, and Escalation
- Featherless for Technical Forensics
- real provider metadata shown in UI
- in-app Notification Center and simulated outbound communication queue

UI label:

```text
Demo mode: Live
```

### 2. Assisted Mode

Use when one live service is slow or unstable, but the app is still online.

Assisted mode uses:

- seeded incident state
- latest successful Band transcript or simulated Band-style transcript
- latest successful provider outputs with stored metadata
- live UI transitions
- clear fallback banner

UI label:

```text
Demo mode: Assisted - using latest validated run
```

Do not pretend assisted output is a fresh live model call.

### 3. Seeded Mode

Use when live APIs, network, or hosting are unreliable.

Seeded mode uses:

- local/static JSON fixture
- read-only UI
- recorded provider metadata from a previous successful run
- recorded Band message/event IDs when available
- pre-recorded video as backup

UI label:

```text
Demo mode: Seeded - offline-safe walkthrough
```

Seeded mode is acceptable if we are transparent and still show the product story.

## Failure Matrix

| Failure | What judge sees | Fallback | Owner action |
| --- | --- | --- | --- |
| Band credentials fail | Band status red in settings | Switch to assisted transcript from latest successful Band run | Show dependency gate and explain live credential issue briefly only if asked. |
| Band WebSocket slow | Timeline stalls | Use REST/polling or seeded timeline | Keep UI moving; do not wait silently. |
| Band room creation fails | No new room ID | Use pre-created demo room or seeded room reference | Open existing demo incident. |
| AI/ML API rate-limited | Main-path agent fails | Use latest validated Assessment/Legal/Communications/Escalation outputs | UI shows `fallback` provider status. |
| Featherless model unavailable | Technical Forensics fails | Try alternate configured model; otherwise use latest validated Technical output | Settings page shows model availability. |
| Provider returns invalid JSON | Agent output validation fails | Retry once with repair prompt; otherwise use seeded validated output | Audit logs validation failure. |
| Supabase unavailable | App cannot load saved state | Use local JSON fixture read-only | Do not attempt writes. |
| Email/SMS provider unavailable | Notification provider status is degraded | Keep in-app and Band notifications, mark outbound communication as simulated | Do not claim real external delivery. |
| Human acknowledgement timer bug | Escalation state looks wrong | Use seeded notification state | Explain that the live demo is using a validated notification transcript. |
| Vercel cold start or deploy issue | App slow/unavailable | Use local dev server or recorded video | Keep final deck/video ready. |
| Browser or UI bug | Click path breaks | Use backup URL/state or recorded walkthrough | Do not debug live in front of judges. |
| Network failure | App cannot reach services | Use local recording and Gamma deck | Keep demo video downloaded locally. |
| Regulatory wording issue | Claim sounds too strong | Use safe reviewed script | Say "possible obligation for review," not legal conclusion. |

## Required Demo Readiness UI

The `/settings` page should include a demo readiness panel:

- Band configured
- Band latest room test
- AI/ML API configured
- AI/ML API latest successful call
- Featherless configured
- Featherless model availability
- Supabase configured
- Notification Center state available
- email/SMS/internal connector safe mode
- seeded fallback fixture available
- latest demo run recorded

Do not expose secrets, full raw prompts, or personal data.

## Required Backend Support

Add these implementation hooks when coding starts:

- seed/reset endpoint for the demo incident
- provider diagnostic endpoint
- Band diagnostic endpoint
- local fixture loader
- latest successful run snapshot
- explicit `demo_mode` field in incident response
- audit event for fallback mode switch

Suggested routes:

```text
POST /api/demo/reset
GET  /api/demo/readiness
POST /api/demo/run-live
POST /api/demo/run-assisted
GET  /api/diagnostics/band
GET  /api/diagnostics/model-providers
GET  /api/integrations/notification-providers/health
```

## Pre-Demo Checklist

### T-24 Hours

- Run full live demo.
- Record a clean 60-90 second backup video.
- Export Gamma deck to PDF.
- Confirm public GitHub repo link works.
- Confirm demo app URL works outside local machine.
- Confirm no secrets in screenshots, logs, docs, or env examples.
- Confirm final regulatory wording is safe.

### T-6 Hours

- Run Band diagnostic.
- Run AI/ML API diagnostic.
- Run Featherless diagnostic.
- Run Supabase connection check.
- Run notification provider safe-mode check.
- Reset demo incident.
- Verify assisted and seeded modes work.
- Rehearse voiceover once with a timer.

### T-1 Hour

- Pre-warm Vercel/demo app.
- Pre-warm Render/other hosted demos only if using them as comparison references.
- Open the demo URL.
- Open Gamma/PDF deck.
- Open backup video locally.
- Check browser zoom is 100 percent.
- Close unrelated tabs and notifications.

### T-10 Minutes

- Refresh the app once.
- Confirm `/settings` shows green or known fallback.
- Keep command room loaded on the starting state.
- Keep backup video ready but hidden.

## The 90-Second Script

0-10 seconds:

- Show the incident signal and severity.
- Say this is a synthetic regulated crisis scenario.

10-25 seconds:

- Assessment opens the Band-backed room.
- Legal and Technical are recruited.

25-45 seconds:

- Legal posts possible obligations and unknowns.
- Technical posts confirmed scope through Featherless.
- Communications remains blocked until both are present.

45-65 seconds:

- Communications unlocks and produces draft-only messages.
- Show facts used and missing facts.

65-80 seconds:

- Escalation asks for a human decision.
- Show approve/request changes/escalate options.
- Show the Notification Center state: owner notified, acknowledgement pending or acknowledged, and simulated send package queued.

80-90 seconds:

- Open Audit briefly.
- Show Band/provider/audit proof.
- Close with: Band coordinates the agents, humans keep authority, audit survives the crisis.

## Do Not Do This Live

- Do not debug credentials live.
- Do not wait more than 10 seconds for a model call without switching mode.
- Do not claim live mode if using seeded data.
- Do not claim real notification delivery if the UI is using simulated outbound communication.
- Do not upload real files.
- Do not show API keys, browser history, private tabs, or unrelated repos.
- Do not over-explain architecture while the UI is stuck.

## Success Criteria

The demo is ready when:

- live mode works once end to end
- assisted mode works without code changes
- seeded mode works offline or with minimal network
- UI labels the current mode clearly
- backup video is available
- the team can explain fallback honestly in one sentence
- the dependency gate remains visible in every mode
- notification and simulated delivery status remain visible in every mode
