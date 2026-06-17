# Live Data APIs And UI Placement

Last updated: June 13, 2026.

## Purpose

This document defines the real data sources CrisisCoord can use for the operational UI elements inspired by cybersecurity command-center references.

This does not change the seven-page product plan. It only defines what live or seeded data belongs inside the existing pages.

## Rule

Do not show vanity metrics.

Every number or status in the UI must be traceable to one of these sources:

- Supabase incident, decision, provider, or audit records
- Band room messages, handoffs, and agent events
- a live public source API snapshot
- a keyed threat-intelligence provider snapshot
- a clearly labeled seeded demo snapshot

If the data is not backed by one of those sources, do not render it as a metric.

## Source Tiers

Global product note:

- CrisisCoord is global.
- The sources below are practical demo anchors and optional enrichment feeds, not hard-coded product assumptions.
- The adapter layer must allow customer-approved regional sources later, such as local regulator feeds, national CERT feeds, sector-specific advisories, or internal enterprise systems.

### Tier 1: Public No-Key Sources

Use these first because they are easier to demo, easier to explain, and safer for a hackathon build.

| Source | API / endpoint | Use in CrisisCoord | UI placement | Notes |
| --- | --- | --- | --- | --- |
| CISA KEV | `https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json` or the CISA GitHub mirror JSON | Known exploited vulnerability matches, KEV status, due-date context | Signal Intake, Command Room source feed, Evidence And Audit | Use for CVE/zero-day and critical-infrastructure scenarios. |
| NVD CVE API 2.0 | `https://services.nvd.nist.gov/rest/json/cves/2.0` | CVE descriptions, CVSS severity, CPE matching, KEV filters | Global search, Signal Intake, Evidence And Audit | Prefer an API key for higher reliability. Cache aggressively. |
| FIRST EPSS | `https://api.first.org/data/v1/epss` | Exploit-likelihood enrichment for CVEs | Signal Intake, Technical findings, Evidence And Audit | Use as risk evidence, not as a final severity decision. |
| OSV.dev | `https://api.osv.dev/v1/query`, `/v1/querybatch`, `/v1/vulns/{id}` | Open-source dependency vulnerability checks | Signal Intake, Technical findings, Evidence And Audit | Useful for vendor/supply-chain and software dependency scenarios. |
| GitHub Global Advisories | `https://api.github.com/advisories` | GHSA/CVE advisories, ecosystem/package metadata | Global search, Signal Intake, Evidence And Audit | Public endpoint works without auth, but token improves rate limits. |
| SEC EDGAR | `https://data.sec.gov/submissions/CIK##########.json`, `https://data.sec.gov/api/xbrl/companyfacts/CIK##########.json` | Public-company filings and disclosure context | Legal findings, Decision Desk, Evidence And Audit | Server-side only because SEC data API has CORS limitations. |
| openFDA Enforcement | `https://api.fda.gov/drug/enforcement.json`, `device/enforcement.json`, `food/enforcement.json` | Product, device, drug, and food recall scenarios | Signal Intake, Incident Registry, Evidence And Audit | Useful for the third sandbox niche: product/supply-chain crisis. |

HHS OCR breach portal is useful as healthcare context, but it is not a first-pass live API adapter because it is not a clean JSON API. Do not scrape it for the MVP. If used later, treat it as a human-reviewed source import or a customer-approved compliance reference.

### Tier 2: Optional Keyed Threat-Intel Sources

Use these only if the team has time to obtain keys and the demo needs richer IOC enrichment.

| Source | API / endpoint | Use in CrisisCoord | UI placement | Key required |
| --- | --- | --- | --- | --- |
| AlienVault OTX / LevelBlue OTX | OTX DirectConnect API / TAXII | Pulse and IOC enrichment for IPs, domains, hashes, URLs | Source feed, Technical findings, Evidence And Audit | Yes |
| AbuseIPDB | `https://api.abuseipdb.com/api/v2/` | IP reputation and abuse-confidence score | Technical findings, Evidence And Audit | Yes |
| URLhaus | `https://urlhaus.abuse.ch/api/` | Malware URL lookup and feed snapshots | Source feed, Technical findings | Some endpoints require auth key |

Avoid account-breach lookup APIs that require user or customer email addresses for the demo. CrisisCoord should not upload customer identifiers to third-party APIs.

### Tier 3: CrisisCoord System Sources

These are not external intel feeds. These are the product's own system-of-record sources.

| Source | Role |
| --- | --- |
| Band | Shared room messages, agent handoffs, dependency gates, agent-to-agent coordination. |
| Supabase | Incidents, source snapshots, normalized observations, agent outputs, decisions, provider health, audit trail. |
| AI/ML API | Main-path model reasoning and structured outputs. |
| Featherless | Open-model route and fallback model evidence. |
| Vercel / runtime logs | Deployment, function, health-check, and cache diagnostics. |

## Existing Page Placement

No new pages are added.

| Existing page | Components to add | Data source |
| --- | --- | --- |
| `/signals` Signal Intake And Sandbox Launcher | global search bar, source cards, live source feed, sandbox selector, source health labels, confidence labels | CISA KEV, NVD, EPSS, OSV, GitHub advisories, openFDA, seeded snapshots |
| `/incidents` Incident Registry | operational status strip, lean incident table, deadline-risk filter, decision-needed filter | Supabase incident aggregates |
| `/command` Crisis Command Room | handoff topology map, Band timeline, source feed rail, dependency gate, last-updated labels | Band, Supabase, selected source snapshots |
| `/communications` Communications Review | facts used, missing facts, legal warnings, confidence labels, source references | Supabase evidence, Legal/Technical agent outputs, Band refs |
| `/decisions` Decision Desk | mobile-first approval cards, risk of approving, risk of waiting, confidence and last-updated labels | Supabase decisions, agent outputs, audit events |
| `/audit` Evidence And Audit | real event ledger, source snapshots, provider/model metadata, Band references, export status | Supabase audit/events/evidence/provider tables |
| `/settings` Integrations And Operations | provider/feed health cards, last successful sync, fallback mode, latency, key status | health checks, source sync logs, Vercel diagnostics |

## Component Decisions

### 1. Global Command/Search Bar

Purpose:

- search incident ID
- search affected system
- search CVE, GHSA, OSV ID, CPE, package, vendor, domain, IP, hash
- search Band message ID
- search decision ID
- search evidence ID

Recommended implementation:

```text
GET /api/search/global?q=
  -> Supabase incident/evidence/decision search
  -> if q matches CVE: NVD + EPSS + CISA KEV
  -> if q matches GHSA/package: GitHub Advisories + OSV
  -> if q matches IP/domain/hash/url: optional OTX/AbuseIPDB/URLhaus
  -> return grouped results with source, confidence, and retrievedAt
```

Do not call every external API for every keystroke. Debounce, classify the query first, then call the relevant adapters.

### 2. Operational Status Strip

Use real internal aggregates only:

- active incidents
- pending human decisions
- incidents with deadline risk
- degraded provider/feed count
- failed agent runs
- last successful Band sync
- confirmed affected records/systems for the active incident

Source:

```text
Supabase views or server-side aggregate endpoint:
GET /api/ops/status
```

Do not show global threat counts, detection accuracy, or protected assets unless the app genuinely computes them.

### 3. Live Source / Intel Feed

Use as a source feed, not as the center of the product.

Feed item fields:

```ts
type SourceFeedItem = {
  id: string;
  source: "cisa_kev" | "nvd" | "epss" | "osv" | "github_advisory" | "sec_edgar" | "openfda" | "otx" | "abuseipdb" | "urlhaus" | "seeded";
  title: string;
  summary: string;
  sourcePublishedAt?: string;
  retrievedAt: string;
  matchedEntity?: string;
  severity?: "low" | "medium" | "high" | "critical" | "unknown";
  confidence: "low" | "medium" | "high";
  confidenceReason: string;
  sourceUrl?: string;
};
```

Place it in Signal Intake and as a compact right rail or tab in the Command Room.

### 4. Handoff Topology Map

This is the most important visual pattern to keep from the screenshots.

Source:

- Band events
- Supabase `agent_runs`
- Supabase `handoff_dependencies`
- Supabase `agent_outputs`

Required nodes:

```text
Assessment
  -> Legal
  -> Technical
Legal + Technical
  -> Communications
All findings
  -> Escalation + Human decision
```

Show:

- waiting
- running
- blocked
- complete
- failed
- needs review

Do not turn this into a generic threat map. It is an agent dependency map.

### 5. Real Event Ledger

This replaces fake tables.

Event fields:

```ts
type AuditEvent = {
  id: string;
  incidentId: string;
  occurredAt: string;
  actorType: "system" | "agent" | "human" | "source_api" | "provider";
  actorName: string;
  eventType:
    | "signal_received"
    | "source_snapshot"
    | "band_message"
    | "agent_started"
    | "agent_output"
    | "dependency_blocked"
    | "dependency_unlocked"
    | "decision_requested"
    | "decision_approved"
    | "decision_rejected"
    | "provider_health"
    | "export_generated";
  summary: string;
  confidence?: "low" | "medium" | "high";
  reviewStatus?: "unreviewed" | "reviewed" | "approved" | "rejected";
  bandRef?: string;
  providerRef?: string;
  sourceSnapshotId?: string;
};
```

Place dense tables only in Evidence And Audit.

### 6. Provider / Feed Status

Provider cards should include:

- provider name
- purpose
- configured or missing
- last successful call
- last failure
- latency
- fallback-ready state
- whether it can be used in seeded mode

Recommended endpoint:

```text
GET /api/health/providers
```

Settings should show full detail. The Command Room should show only compact status.

### 7. Mobile Bottom Action Bar

This is UI state, not external API data.

Use it for:

- Signals
- Incidents
- Command
- Decisions
- More

The center action changes by context:

- Signal Intake: `Launch`
- Command Room: `Decision`
- Communications: `Review`
- Evidence And Audit: `Export`
- Settings: `Test`

Do not show dense tables above the fold on mobile.

### 8. Last Updated And Confidence Labels

Every fact card should show:

- source
- last updated
- confidence
- whether a human reviewed it
- whether the value is live, cached, or seeded

This applies to:

- source feed items
- Legal findings
- Technical findings
- generated drafts
- decisions
- evidence rows
- provider health

## Adapter Interface

Use one shared adapter shape so the UI does not care which source produced the observation.

```ts
type LiveDataAdapter = {
  id: string;
  displayName: string;
  requiresApiKey: boolean;
  supportedQueries: Array<"cve" | "package" | "ip" | "domain" | "hash" | "url" | "company" | "recall">;
  healthCheck: () => Promise<ProviderHealth>;
  search: (query: LiveDataQuery) => Promise<SourceObservation[]>;
};

type LiveDataQuery = {
  type: "cve" | "package" | "ip" | "domain" | "hash" | "url" | "company" | "recall";
  value: string;
  incidentId?: string;
  sandbox?: "finance" | "health" | "product_supply_chain";
};

type SourceObservation = {
  source: string;
  sourceRecordId: string;
  title: string;
  summary: string;
  observedAt?: string;
  retrievedAt: string;
  sourceUrl?: string;
  severity?: "low" | "medium" | "high" | "critical" | "unknown";
  confidence: "low" | "medium" | "high";
  confidenceReason: string;
  raw: unknown;
};

type ProviderHealth = {
  provider: string;
  configured: boolean;
  status: "ok" | "degraded" | "missing_key" | "failed" | "seeded";
  lastSuccessfulAt?: string;
  latencyMs?: number;
  lastError?: string;
};
```

## Server Routes To Build

Recommended routes:

```text
GET  /api/search/global
GET  /api/ops/status
GET  /api/health/providers
POST /api/source-sync/cisa-kev
POST /api/source-sync/nvd-cve
POST /api/source-sync/epss
POST /api/source-sync/osv
POST /api/source-sync/github-advisories
POST /api/source-sync/sec-edgar
POST /api/source-sync/openfda
POST /api/source-sync/otx
POST /api/source-sync/abuseipdb
POST /api/source-sync/urlhaus
```

For the first build, only `GET /api/search/global`, `GET /api/ops/status`, and `GET /api/health/providers` need to be visible to the UI. The sync routes can be called by server actions, scheduled jobs, or admin-only buttons.

## Supabase Tables To Add

Minimum live-data tables:

```text
source_providers
source_snapshots
source_observations
provider_health_checks
global_search_events
```

Existing project tables should still own incidents, evidence, agent runs, decisions, and audit events.

## Cache Strategy

| Source | Suggested cache |
| --- | --- |
| CISA KEV | 6-24 hours, refresh on demo start |
| NVD | 15 minutes for exact CVE lookup, 6 hours for broad searches |
| EPSS | daily |
| OSV | 1-6 hours per package/version query |
| GitHub Advisories | 1-6 hours |
| SEC EDGAR | 5-15 minutes for watched companies, longer for search |
| openFDA | daily or weekly; the source updates weekly |
| OTX / AbuseIPDB / URLhaus | 15 minutes to 6 hours depending on quota |

Always label cached or seeded data clearly.

## Privacy And Safety Rules

- Do not send real customer names, emails, card data, patient data, employee data, or secrets to external APIs.
- Query external APIs with public identifiers only: CVE, GHSA, OSV ID, package/version, public company CIK, product/recall terms, IP/domain/hash/URL from synthetic data.
- Keep keyed provider calls server-side.
- Store raw source snapshots in Supabase for auditability, but redact unnecessary payload fields before showing them in the UI.
- Generated communications must remain draft-only until human approval.
- If a source is down, show `seeded fallback` or `source unavailable`; do not silently fabricate fresh data.

## Implementation Order

1. Add environment validation for live-data keys and optional providers.
2. Create source-provider registry and adapter interface.
3. Implement CISA KEV, NVD, EPSS, OSV, GitHub Advisories, SEC EDGAR, and openFDA adapters.
4. Implement optional OTX, AbuseIPDB, and URLhaus adapters behind feature flags.
5. Create Supabase tables for source snapshots, observations, provider health, and search events.
6. Add `/api/search/global`, `/api/ops/status`, and `/api/health/providers`.
7. Update Signal Intake, Command Room, Evidence And Audit, and Settings UI to consume normalized source observations.
8. Add seeded fallback snapshots for demo-day reliability.
9. Record every source lookup, source snapshot, and provider health change into the audit trail.

## Research Sources

- [CISA KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [CISA KEV data mirror](https://github.com/cisagov/kev-data)
- [NVD CVE API 2.0](https://nvd.nist.gov/developers/vulnerabilities)
- [FIRST EPSS API](https://www.first.org/epss/api)
- [OSV.dev API](https://google.github.io/osv.dev/api/)
- [GitHub Global Security Advisories API](https://docs.github.com/en/rest/security-advisories/global-advisories)
- [SEC EDGAR APIs](https://www.sec.gov/search-filings/edgar-application-programming-interfaces)
- [openFDA enforcement API](https://open.fda.gov/apis/food/enforcement/)
- [AlienVault / LevelBlue OTX API](https://otx.alienvault.com/api)
- [AbuseIPDB API](https://docs.abuseipdb.com/)
- [URLhaus Community API](https://urlhaus.abuse.ch/api/)
