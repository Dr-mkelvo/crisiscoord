# Competitor And Product Landscape

Last updated: June 13, 2026.

## Purpose

This document captures what nearby products and hackathon submissions are doing, what problem they solve, how they solve it, and how CrisisCoord should use the tools available to build a differentiated product.

CrisisCoord should not copy a file-upload investigation demo. The product should start from a crisis signal and create a coordinated response room.

## The Product Lane

CrisisCoord sits between three markets:

1. Incident operations platforms
2. Cyber/privacy breach response platforms
3. AI-assisted regulated decision workflows

The closest lane is:

```text
enterprise crisis response + regulatory review + cross-functional coordination
```

This is closer to BreachRx, RadarFirst, Cytactic, and Alaris than it is to a generic SOC dashboard or a CSV investigation tool.

## Competitor Categories

### 1. Cyber Incident Response Management

Examples:

- BreachRx
- Cytactic
- Alaris Security
- regulatory clock tools

What they solve:

- cyber incidents become enterprise risk events, not just technical alerts
- legal, privacy, IT, security, communications, and executives need one operating process
- regulatory clocks and notification duties are easy to miss
- evidence and decisions must be defensible after the incident

How they solve it:

- command dashboard
- structured workflows
- role ownership
- regulatory obligation mapping
- communications drafting
- evidence capture
- audit-ready timeline
- legal/privilege-aware collaboration

What CrisisCoord should learn:

- this is the correct market story
- legal, technical, communications, and executive work must be shown together
- deadlines, obligations, drafts, and decisions need to be visible in the same room
- every output should preserve source, owner, timestamp, confidence, and review status

How CrisisCoord differs:

- Band is the active agent-to-agent coordination layer
- agents must communicate through a shared room, not a hidden orchestrator
- Communications is dependency-gated by Legal and Technical findings
- the hackathon demo can show the whole workflow in 60-90 seconds

### 2. Privacy Incident And Breach Notification Platforms

Examples:

- RadarFirst
- NotifAI-style breach notification automation
- privacy operations-style tools

What they solve:

- privacy incidents need structured intake, legal interpretation, risk assessment, and defensible notification decisions
- organizations must map affected individuals, data types, jurisdictions, deadlines, and notification content
- final decisions remain with human legal/privacy teams

How they solve it:

- privacy incident intake
- jurisdiction and regulatory mapping
- decision frameworks
- notification obligation assessment
- legal review packages
- audit documentation
- integrations with systems such as ServiceNow

What CrisisCoord should learn:

- human review is a strength, not a weakness
- obligation outputs should be candidates for review, not final legal conclusions
- the UI should separate confirmed facts, assumptions, unknowns, and obligations

How CrisisCoord differs:

- CrisisCoord is broader than privacy intake: it coordinates Legal, Technical, Communications, Compliance, and Executive response in one crisis room
- it does not start with a form or document upload
- it starts with an event signal and updates as facts evolve

### 3. Incident Operations Platforms

Examples:

- FireHydrant
- Rootly
- incident.io
- PagerDuty / Opsgenie-style incident response
- ServiceNow Security Incident Response

What they solve:

- alerts need responders, roles, timelines, tasks, status updates, runbooks, and retrospectives
- engineering teams need fast coordination across Slack, Teams, tickets, on-call, and observability tools

How they solve it:

- incident declaration
- on-call paging
- Slack/Teams rooms
- incident command center
- roles and tasks
- runbooks/workflows
- status pages
- timelines and postmortems
- service ownership context

What CrisisCoord should learn:

- one incident detail page beats a broad dashboard
- the timeline is the record of truth
- roles, tasks, current phase, severity, and status must be visible
- workflow automation should be inspectable

How CrisisCoord differs:

- CrisisCoord is not mainly about MTTR or service restoration
- it should not center uptime charts or status-page publishing
- it should center regulated crisis governance: legal clocks, technical scope, communications drafts, human decisions, and audit trail

### 4. Hackathon Adjacent Submissions

Examples:

- WarRoom
- AEGIS
- Band Decision Desk
- MediChain
- KINANTI

What they solve:

- WarRoom: production service incident triage, diagnosis, remediation, approval
- AEGIS: financial-crime investigation from uploaded transaction files
- Band Decision Desk: financial decision approval with veto loop
- MediChain: medical prior authorization review packet
- KINANTI: oil well operations diagnosis and HSE review

What CrisisCoord should learn:

- WarRoom has a strong Band story because the agents use Band as the only channel
- Band Decision Desk has a strong non-linear loop because Risk can veto Strategy
- AEGIS shows evidence grounding and human escalation, but the upload-first entry point is not our product
- KINANTI proves a simple scenario -> agents -> results flow can be easy to demo
- MediChain reinforces the value of human-reviewable packets

How CrisisCoord differs:

- no upload-first UX
- no 15-agent mesh for the MVP
- no autonomous remediation
- no trading or financial recommendation loop
- no single-domain prior authorization workflow
- yes to a cross-functional crisis room with dependency-gated communications

## Competitor Pattern Table

| Product category | Typical start point | Main surface | Core proof | Gap CrisisCoord can own |
| --- | --- | --- | --- | --- |
| Incident ops | Alert or incident declaration | Incident command center | roles, runbooks, timeline, status updates | regulated legal/communications decisioning |
| Privacy breach response | privacy/security incident intake | assessment workflow | jurisdiction mapping and notification decision | multi-agent crisis coordination through Band |
| Cyber incident response management | cyber event or breach declaration | enterprise command dashboard | cross-functional workflow and evidence capture | visible agent handoffs and dependency gates |
| AI investigation demo | uploaded file or dataset | analysis workspace | generated findings from data | signal-first crisis response, not file upload |
| Band hackathon war room | service health alert | live ops dashboard | detect -> diagnose -> approve -> remediate | legal + technical -> communications gate |

## What We Should Build

Build a product where the first action is one of these:

- receive synthetic crisis signal
- start demo incident from scenario launcher
- import webhook-style alert payload
- select existing active incident

Do not make the first action:

- upload CSV
- upload PDF
- ask a chatbot a question
- paste a document for analysis

Evidence upload can exist later, but only after an incident exists.

## Tool-To-Product Map

### Band

Use Band as the visible collaboration layer:

- create the crisis room
- add/recruit agents
- post agent findings
- post blocked/unblocked events
- mention downstream agents
- preserve handoff context

Judge-visible proof:

- Band timeline
- @mention handoffs
- room participant list
- message/event IDs in audit

### AI/ML API

Use AI/ML API for main-path reasoning:

- Assessment
- Legal
- Communications
- Escalation

Judge-visible proof:

- provider badge
- model name
- latency
- validation status
- agent output in audit trail

### Featherless

Use Featherless for visible open-model Technical Forensics:

- affected systems
- data scope
- containment status
- evidence gaps
- confidence

Judge-visible proof:

- Technical Forensics provider badge
- open-model run status
- model availability check
- audit metadata

### Supabase

Use Supabase as the app source of truth:

- incidents
- crisis rooms
- agent runs
- findings
- communications drafts
- decision requests
- audit events
- evidence artifacts

Judge-visible proof:

- audit tab
- provider metadata
- decision record
- fallback mode snapshot

## Product Positioning

Short positioning:

> CrisisCoord is a Band-powered crisis command room where legal, technical, communications, compliance, and executive agents coordinate regulated incident response with human approval and an audit trail.

Longer positioning:

> When a crisis signal arrives, CrisisCoord opens a shared Band room, runs specialized agents, gates external communications on legal and technical findings, and routes risky decisions to humans. It is built for regulated crisis coordination, not generic incident triage or file-based investigation.

## Sources

- [BreachRx Cyber Incident Response Management](https://www.breachrx.com/rex-platform/cyber-incident-response-management-cirm/)
- [BreachRx Cyber RegScout](https://www.breachrx.com/rex-platform/cyber-regscout-regulatory-intelligence/)
- [RadarFirst platform](https://www.radarfirst.com/platform/)
- [RadarFirst privacy incident management](https://www.radarfirst.com/privacy-incident-management/)
- [RadarFirst ServiceNow integration](https://www.radarfirst.com/resources/integrated-privacy-incident-response-with-servicenow-datasheet/)
- [Cytactic platform](https://cytactic.com/platform/)
- [Alaris compliance reporting](https://alaris.security/usecases/compliance-reporting)
- [NotifAI](https://www.covasant.com/products/notifai)
- [IR-OS regulatory deadlines](https://ir-os.com/regulatory-deadlines)
- [FireHydrant platform](https://firehydrant.com/platform/)
- [FireHydrant Command Center](https://docs.firehydrant.com/docs/the-command-center)
- [Rootly incident workflows](https://docs.rootly.com/workflows/incident-workflows)
- [incident.io](https://incident.io/)
- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon)
- [WarRoom submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/acid/warroom-band-of-agents-runs-your-incident-response)
- [AEGIS submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/agenticdeveloper/aegis-autonomous-financial-crime-investigation)
- [Band Decision Desk submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/band-decision-desk/band-decision-desk)
