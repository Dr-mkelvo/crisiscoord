# Decision Guardrails Questionnaire

Last updated: June 13, 2026.

## Purpose

This document narrows CrisisCoord by answering the questions the team should ask before building. It defines what agents can automate, what agents can recommend, and what must escalate to humans.

Use this before implementation, design review, agent prompt writing, and demo rehearsal.

## Fast Recommendation

Use five agents, not the minimum three.

The recommended product is:

> A five-agent Band command room for regulated crisis response. Agents classify the crisis, identify possible obligations, confirm technical scope, draft communications, and surface human decisions. The system can automate safe internal workflow steps, but humans approve legal conclusions, external communications, destructive technical actions, and unresolved high-risk decisions.

The MVP should prove one narrow path:

1. A synthetic crisis signal starts the incident.
2. Assessment creates the crisis room and recruits the other agents.
3. Legal and Technical work in parallel.
4. Communications is blocked until Legal and Technical outputs exist.
5. Escalation reads the whole room and asks for a human decision.
6. The UI shows Band handoffs, provider metadata, deadlines, uncertainty, and audit events.

Do not widen the product into a generic SOC, chatbot, upload tool, or dashboard.

## What AI Can And Cannot Do

### AI Can Automate In The MVP

These are safe because they are internal, reversible, synthetic, or validation-only:

- normalize a synthetic crisis signal into structured fields
- create a local incident record
- create or seed a Band crisis room
- recruit or mention the five agents in Band
- mark an agent run as `running`, `blocked`, `failed`, or `complete`
- validate agent output against Zod schemas
- calculate visible countdowns from known timestamps
- record audit events
- display provider badges and model metadata
- run safe diagnostics that do not expose keys or prompts
- switch to seeded demo mode when live providers fail

### AI Can Recommend Or Draft

These outputs need review before they become business decisions:

- severity classification
- likely crisis category
- affected systems and data categories
- obligation candidates
- deadline estimates
- stakeholder communication drafts
- executive summaries
- conflict detection
- missing-fact lists
- suggested next actions
- escalation questions

### Humans Must Approve

These require a human gate:

- whether a legal breach notification is required
- whether an incident is material for public-company disclosure
- whether to contact regulators, customers, media, insurers, law enforcement, or payment networks
- whether to send any external communication
- whether to make a public statement
- whether technical containment should affect production systems
- whether to shut down, isolate, or restore a real system
- whether to pay, refuse, or negotiate a ransom
- whether to attribute the incident to a threat actor
- whether evidence is sufficient for a final conclusion
- whether to override an agent recommendation

### AI Must Not Do In The MVP

The public demo must not allow agents to:

- send regulator, customer, investor, media, or law-enforcement notices automatically
- file SEC, GDPR, HIPAA, CISA, PCI, or insurance reports automatically
- claim final legal advice
- connect to real customer or enterprise systems
- run destructive technical actions
- delete or alter evidence
- decide materiality as a final conclusion
- decide ransom payment
- publish external-facing updates
- process real personal, health, payment, legal, or confidential data

## Autonomy Ladder

| Level | Meaning | Allowed in MVP | Example |
| --- | --- | --- | --- |
| A0 | Human-only decision | Yes, with human UI | Final legal/materiality/ransom/send decision. |
| A1 | Human approval required | Yes | Draft communication waits for approval. |
| A2 | AI recommends or drafts | Yes | Legal obligation candidate or executive summary. |
| A3 | AI automates safe internal workflow | Yes | Create audit event, set blocked state, recruit Band agents. |
| A4 | AI acts externally or destructively | No | Auto-file notice, email customers, isolate production systems. |

Default rule:

> If the action changes the outside world, creates legal exposure, affects production systems, or depends on unclear facts, escalate to a human.

## Five-Agent Recommendation

| Agent | Core job | Provider path | Human gate |
| --- | --- | --- | --- |
| Crisis Assessment Agent | Classify signal, severity, room context, agent recruitment. | AI/ML API | Human can override severity and crisis type. |
| Legal & Regulatory Agent | Surface obligation candidates, deadlines, assumptions, source references. | AI/ML API | Legal Reviewer approves or rejects conclusions. |
| Technical Forensics Agent | Summarize scope, systems, records, containment, confidence. | Featherless AI | Technical Lead confirms facts and production actions. |
| Stakeholder Communications Agent | Draft regulator, customer, executive, and internal updates. | AI/ML API | Legal/Comms must approve before external use. |
| Escalation & Decision Agent | Detect conflicts, missing facts, and human decisions. | AI/ML API | Incident Commander or Executive decides. |

## Better Questions To Ask

The following matrix gives more than 100 questions and a recommended answer for each. Use it to cut scope, design gates, and assign team work.

Legend:

- `Automate`: safe internal workflow action.
- `Recommend`: AI may draft, classify, or suggest.
- `Approve`: human approval required.
- `Human-only`: final decision must be made by a human.
- `Not MVP`: leave out of the first build.

### 1. Hackathon Fit And Partner Proof

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 1 | Are we using at least three agents? | Use five visible agents because the use case naturally needs five roles. | Automate |
| 2 | Is Band central or decorative? | Make Band the room, handoff layer, message layer, and audit reference. | Automate |
| 3 | Can judges see agent collaboration? | Show messages/events, dependency gates, and participant status in the command room. | Automate |
| 4 | Do agents share structured context? | Store and display what each agent reads and posts. | Automate |
| 5 | Does AI/ML API appear in the demo? | Use it for Assessment, Legal, Communications, and Escalation. | Automate |
| 6 | Does Featherless appear in the demo? | Use it for Technical Forensics and show the provider badge. | Automate |
| 7 | Can partner usage be proven from data? | Store provider, model, latency, retry count, and Band IDs on agent runs. | Automate |
| 8 | Do submission tags match actual usage? | Use Band, AI/ML API, Featherless AI, Supabase, Vercel, TypeScript. | Approve |
| 9 | Are partner failures survivable? | Build seeded fallback, but do not hide whether live partner calls worked. | Automate |
| 10 | What is the one-sentence pitch? | "CrisisCoord is a five-agent crisis command room for regulated incident response." | Approve |

### 2. Product Scope And Differentiation

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 11 | Are we building a chatbot? | No. Build a command room with agent handoffs and decisions. | Approve |
| 12 | Are we building a SOC/SOAR product? | No. Borrow incident discipline, but focus on cross-functional regulated response. | Approve |
| 13 | Are we building a legal advice engine? | No. Surface reviewable legal candidates only. | Human-only |
| 14 | Are we building an upload tool? | No. Start from a crisis signal; uploads are supporting evidence later. | Approve |
| 15 | Are we building a generic dashboard? | No. The first screen is one active crisis command room. | Approve |
| 16 | What is the core product dependency? | Communications waits for Legal plus Technical findings. | Automate |
| 17 | What is the core user promise? | Show what happened, what is known, what is unknown, and who must decide. | Approve |
| 18 | What is the MVP scenario? | Synthetic payment-system unauthorized access with possible card exposure. | Approve |
| 19 | What is outside MVP? | Real integrations, external sending, broad analytics, postmortem builder, user admin. | Not MVP |
| 20 | How do we stay original? | Emphasize regulated crisis governance and Band-mediated agent dependencies. | Approve |

### 3. Crisis Signal And Scenario Scope

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 21 | What starts the workflow? | A structured or free-text crisis signal, not a file upload. | Automate |
| 22 | What makes a signal valid? | It names a plausible event, affected system, possible data/category, and time. | Automate |
| 23 | Should vague signals be accepted? | Yes, but mark missing facts and lower confidence. | Recommend |
| 24 | Should the system reject real data? | Yes. Public demo should warn and avoid real sensitive data. | Automate |
| 25 | Which first signal type should we use? | Payment data exposure because it touches Legal, Technical, Comms, and Executive. | Approve |
| 26 | Should we support healthcare examples? | Use as optional scenario, not the first build. | Not MVP |
| 27 | Should we support public-company SEC examples? | Add as optional second demo if time allows. | Not MVP |
| 28 | Should we support ransomware? | Add as future scenario because it requires ransom and law-enforcement gates. | Not MVP |
| 29 | Should signals create deadlines automatically? | Create draft deadline candidates, then require human review. | Recommend |
| 30 | Should signals recruit agents automatically? | Yes. Assessment can recruit the standard five agents. | Automate |

### 4. Five-Agent Architecture

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 31 | Which agent runs first? | Crisis Assessment always runs first. | Automate |
| 32 | Which agents can run in parallel? | Legal and Technical can run after Assessment. | Automate |
| 33 | Which agent is dependency-gated? | Communications must wait for Legal and Technical. | Automate |
| 34 | Which agent reads the whole room? | Escalation reads Assessment, Legal, Technical, Comms, and decisions. | Automate |
| 35 | Can agents skip Band? | No. Important handoffs must be posted to Band. | Automate |
| 36 | Can one backend script fake all agents? | No for final demo. Seeded mode can simulate states, but product proof needs agent roles. | Approve |
| 37 | Should agents have separate identities? | Yes. Separate Band IDs and run records are cleaner and more judge-visible. | Automate |
| 38 | Should every agent call a model? | Not necessarily, but model-backed runs must show provider metadata. | Recommend |
| 39 | Can deterministic logic assist agents? | Yes, especially for gates, validation, timers, and status transitions. | Automate |
| 40 | Can humans override an agent? | Yes. Overrides should be logged with reason and role. | Human-only |

### 5. Band Collaboration Proof

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 41 | What proves Band is being used? | Room ID, participants, messages, events, and handoff references in UI and database. | Automate |
| 42 | Should handoffs be messages or events? | Use messages for directed handoffs and events for progress/tool activity. | Automate |
| 43 | Should Communications receive direct mentions? | Yes, after Legal and Technical post findings. | Automate |
| 44 | Should Escalation mention a human? | Yes, for the decision request. | Automate |
| 45 | Should Band be the only database? | No. Band is collaboration; Supabase is app state and audit query layer. | Approve |
| 46 | Should the UI show raw chat only? | No. Show structured status plus Band references. | Approve |
| 47 | How do we handle Band downtime? | Record local pending/failed sync and use seeded mode for demo continuity. | Automate |
| 48 | Should messages include private data? | No. Synthetic data only; keep secrets and real sensitive data out. | Automate |
| 49 | Should every agent be visible in Band? | Yes. The five-agent room is the product. | Automate |
| 50 | What Band feature matters most? | Shared room context and agent-to-agent handoffs. | Approve |

### 6. AI Capability And Model-Provider Boundaries

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 51 | Can AI classify crisis type? | Yes, as a recommendation with confidence and assumptions. | Recommend |
| 52 | Can AI determine severity? | Yes, as draft severity; human can override. | Recommend |
| 53 | Can AI detect missing facts? | Yes. This is one of the safest and most useful agent jobs. | Recommend |
| 54 | Can AI identify possible legal obligations? | Yes, as candidates with sources and uncertainty. | Recommend |
| 55 | Can AI make final legal determinations? | No. Legal Reviewer must decide. | Human-only |
| 56 | Can AI summarize technical scope? | Yes, from provided facts and synthetic evidence. | Recommend |
| 57 | Can AI confirm facts that are not in evidence? | No. It must mark them unknown or assumed. | Human-only |
| 58 | Can AI draft communications? | Yes, but drafts remain review-only. | Recommend |
| 59 | Can AI send communications? | No. External sends are out of MVP. | Human-only |
| 60 | Can AI choose fallback providers? | Yes, within configured limits and with logged fallback reason. | Automate |

### 7. Human Approval And Escalation

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 61 | What always escalates to humans? | Legal conclusions, external notices, materiality, destructive actions, ransom, unclear high-risk facts. | Human-only |
| 62 | Who approves customer notification? | Communications Lead plus Legal Reviewer, with Executive if risk is high. | Human-only |
| 63 | Who approves regulator notification? | Legal Reviewer, with Incident Commander awareness. | Human-only |
| 64 | Who approves SEC materiality language? | Legal/Disclosure counsel or equivalent human role. | Human-only |
| 65 | Who approves technical containment? | Technical Lead or Incident Commander, never the agent alone. | Human-only |
| 66 | What if Legal and Technical disagree? | Escalation creates a decision request and blocks Communications if needed. | Automate |
| 67 | What if facts are incomplete? | Draft phased communication and surface missing facts; do not finalize. | Recommend |
| 68 | What if deadline is close? | Escalation highlights urgency and asks for human decision. | Automate |
| 69 | What if a human overrides an agent? | Log actor, reason, before/after state, and timestamp. | Automate |
| 70 | Can the system auto-close decisions? | No. Human decisions need explicit resolution. | Human-only |

### 8. Compliance And Legal Guardrails

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 71 | Should GDPR Article 33 be hard-coded as final? | No. Surface a 72-hour candidate when EU personal data risk exists. | Recommend |
| 72 | Should HIPAA be hard-coded as final? | No. Surface candidates when health data and covered-entity facts appear. | Recommend |
| 73 | Should SEC disclosure be automatic? | No. Surface materiality review and four-business-day timing after human materiality determination. | Human-only |
| 74 | Should CIRCIA reporting be automatic? | No. Treat as critical-infrastructure review; note final-rule status must be checked. | Human-only |
| 75 | Should PCI/card network obligations be final? | No. Flag payment-card exposure and route to Legal/Compliance. | Recommend |
| 76 | Should state breach laws be modeled in MVP? | Not deeply. Surface "jurisdiction review required." | Not MVP |
| 77 | Should the system cite sources? | Yes. Legal candidates need source references or source family labels. | Recommend |
| 78 | Should outputs say "not legal advice"? | Yes, in legal panels and demo copy. | Automate |
| 79 | Can AI decide affected jurisdiction? | It can infer candidates from facts, but humans confirm. | Recommend |
| 80 | Can AI decide notification content is legally sufficient? | No. It can draft required content checklist only. | Human-only |

### 9. Technical Forensics And Security

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 81 | Can Technical Forensics run on synthetic evidence? | Yes. Use structured demo facts and Featherless. | Automate |
| 82 | Can it run real scans? | No for MVP. Keep real infrastructure disconnected. | Not MVP |
| 83 | Can it recommend containment? | Yes, as options with risk and confidence. | Recommend |
| 84 | Can it execute containment? | No. Destructive or production-affecting actions need humans. | Human-only |
| 85 | Can it confirm record counts? | Only if the count is in source evidence; otherwise estimate/unknown. | Recommend |
| 86 | Can it classify data categories? | Yes, as candidates from the incident signal. | Recommend |
| 87 | Can it identify CVE/zero-day relevance? | Yes, as candidate enrichment if evidence contains indicators. | Recommend |
| 88 | Should it attribute a threat actor? | No final attribution; mark as unknown unless human-confirmed. | Human-only |
| 89 | Should it delete or mutate evidence? | No. Evidence must remain immutable in the audit story. | Human-only |
| 90 | Should prompt injection be considered? | Yes, especially before any future evidence upload. | Automate |

### 10. Communications And Public Messaging

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 91 | Can Communications draft before Legal and Technical finish? | No. It should visibly block. | Automate |
| 92 | What drafts are in MVP? | Regulator notice, customer notice, executive update, internal holding statement. | Recommend |
| 93 | Can drafts include unknown facts? | Yes, but label them as unknowns or placeholders. | Recommend |
| 94 | Can drafts overstate certainty? | No. Require confidence and fact-source checks. | Automate |
| 95 | Can Communications send emails? | No. Draft-only in MVP. | Human-only |
| 96 | Can it publish to a status page? | No. External publishing is out of MVP. | Not MVP |
| 97 | Should it tailor language by audience? | Yes. Regulator, customer, executive, and internal tone should differ. | Recommend |
| 98 | Should Legal review all external drafts? | Yes. Legal review is mandatory before external use. | Human-only |
| 99 | Should Executive approve customer strategy? | Yes, for high-impact or proactive notification decisions. | Human-only |
| 100 | What should the demo decision be? | "Do we proactively notify customers before every detail is confirmed?" | Human-only |

### 11. Data, Audit, Privacy, And Observability

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 101 | What is the source of truth? | Supabase for app state; Band for collaboration record. | Automate |
| 102 | What data must every agent run store? | Agent, provider, model, status, latency, retries, Band IDs, validation status. | Automate |
| 103 | Should we store raw prompts? | Avoid by default; store safe summaries and metadata. | Approve |
| 104 | Should we store raw model outputs? | Store only if safe and needed; always store validated structured output. | Approve |
| 105 | Should audit events be append-only? | Yes for the demo story; corrections should create new events. | Automate |
| 106 | Should evidence be mutable? | No. Treat evidence as immutable or versioned. | Automate |
| 107 | Should secrets ever appear in UI diagnostics? | No. Show configured/missing only. | Automate |
| 108 | Should provider errors be shown raw? | No. Normalize safe error messages. | Automate |
| 109 | Should every human approval be logged? | Yes. Actor, role, decision, reason, timestamp. | Automate |
| 110 | Should the audit trail export in MVP? | Optional. Visible audit timeline matters more. | Not MVP |

### 12. UI, Demo, And Resilience

| # | Question | Recommendation | Level |
| --- | --- | --- | --- |
| 111 | What should be visible in 10 seconds? | Incident, severity, agent state, blocked gate, deadline, human decision. | Approve |
| 112 | What should mobile prioritize? | Decision queue and incident summary, not dense tables. | Approve |
| 113 | What should tablet prioritize? | Incident bar, compact agent rail, main workspace, then decision panel. | Approve |
| 114 | What should desktop prioritize? | Three-panel command room with decision desk. | Approve |
| 115 | Should demo have live and seeded modes? | Yes. Live first, seeded fallback for reliability. | Automate |
| 116 | What happens if Band fails? | Show fallback banner and seeded room state; do not claim live Band success. | Automate |
| 117 | What happens if AI/ML API fails? | Use seeded or fallback result, log provider failure, keep proof if any successful run occurred. | Automate |
| 118 | What happens if Featherless fails? | Use seeded technical output, log failure, keep provider diagnostic visible. | Automate |
| 119 | What should be cut first if time is short? | Cut expanded audit route and settings polish, not the command room or dependency gate. | Approve |
| 120 | What proves success? | Five agents, Band handoffs, partner provider proof, human decision, audit trail, clean demo. | Approve |

## Recommended Guardrails To Implement First

1. Server-side Communications dependency gate.
2. Agent output Zod schemas.
3. `agent_runs` provider metadata.
4. Band message/event references on audit records.
5. Human approval status for all communication drafts.
6. Escalation rule for conflicts, missing facts, external sends, materiality, and destructive actions.
7. Seeded demo mode that is clearly labeled.
8. UI badges for `draft`, `blocked`, `needs review`, `approved`, `failed`, and `seeded`.
9. Legal disclaimer on compliance outputs.
10. Synthetic-data warning in the command room.

## Narrowed Goal

For the first build, the goal should be:

> Build one polished command room where a synthetic payment-data crisis signal launches five Band agents, uses AI/ML API and Featherless visibly, gates Communications until Legal and Technical findings exist, and ends with a human decision request plus audit trail.

Everything that does not strengthen that path should be postponed.

## Source Anchors

- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon): Band must be the collaboration layer; at least three agents are required; AI/ML API and Featherless AI are partner technologies.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/): govern, map, measure, and manage AI risk; define human-AI roles and oversight.
- [NIST SP 800-61 Rev. 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf): incident response should integrate governance, detection, response, recovery, communications, and roles.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): prompt injection and excessive agency are core risks for LLM apps and agentic systems.
- [SEC cybersecurity disclosure final rule](https://www.sec.gov/rules-regulations/2023/07/s7-09-22): public-company cybersecurity incident disclosure depends on materiality and human governance.
- [HHS HIPAA Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html): health-data breach notification has strict timing and content requirements that should be routed for legal review.
- [GDPR Article 33](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?qid=1775261725114&uri=CELEX%3A02016R0679-20160504): personal-data breach notification requires assessment, documentation, and timely supervisory-authority review.
- [CISA CIRCIA](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/cyber-incident-reporting-critical-infrastructure-act-2022-circia): critical-infrastructure reporting should be treated as reviewable until final effective requirements are confirmed.
