# Decision Guardrails Plan

Last updated: June 13, 2026.

## Purpose

This plan turns the earlier planning notes into a usable operating model for CrisisCoord.

It explains how to build the five-agent crisis command room while protecting data, limiting AI autonomy, supporting human review, and making the demo clear enough for judges and teammates.

The filename remains unchanged so existing links keep working.

## Narrow Product Goal

Build one polished command room where a synthetic payment-data crisis signal launches five Band agents, uses AI/ML API and Featherless visibly, blocks Communications until Legal and Technical findings exist, and ends with a human decision request plus audit trail.

Everything that does not strengthen that path waits until later.

## Operating Plan

### Evidence And Context

Known facts:

- The hackathon requires at least three agents collaborating through Band.
- CrisisCoord should use five agents because the domain naturally needs Assessment, Legal, Technical, Communications, and Escalation roles.
- Band must be the visible collaboration layer, not a final notification wrapper.
- AI/ML API should power main-path reasoning for Assessment, Legal, Communications, and Escalation.
- Featherless should power a visible open-model Technical Forensics run or another clearly labeled model-backed review step.
- Supabase should store incidents, agent runs, findings, drafts, decisions, and audit events.
- The public demo must use synthetic data only.
- Communications must remain blocked until Legal and Technical findings exist.
- Generated communications are drafts until humans approve them.

Global and regional compliance facts to model as review clocks, not final legal conclusions:

- OECD privacy principles provide a global baseline for collection limitation, data quality, purpose specification, use limitation, security safeguards, openness, individual participation, and accountability.
- GDPR Article 33 includes a 72-hour supervisory authority notification concept after awareness of a personal data breach, unless unlikely to create risk to rights and freedoms.
- HIPAA breach notification can require notification without unreasonable delay and no later than 60 days for unsecured protected health information, with details depending on entity and breach scope.
- SEC cybersecurity disclosure depends on a human materiality determination, after which public companies generally face a four-business-day Form 8-K timing requirement.
- CISA CIRCIA requirements should be treated carefully because final effective reporting obligations must be confirmed before public claims.
- Contractual customer or partner notice periods vary by agreement and should be tenant-configurable, not hard-coded.

Evidence conclusion:

The best approach is a dependency-gated workflow with structured facts, source references, visible deadlines, and human approval. The product should not claim to decide the law; it should organize crisis facts so humans can decide faster.

### Value And Strengths

Best things about the project:

- It solves a real enterprise coordination problem, not a toy prompt workflow.
- It makes Band necessary because agents depend on shared room state and handoffs.
- It naturally fits regulated and high-stakes workflows.
- It gives judges an easy story: one crisis, five agents, one blocked gate, one human decision.
- It can show both partner model providers without making the architecture feel like a vendor showcase.
- It is safer than a fully autonomous agent because it keeps legal, communications, and destructive actions human-gated.
- It has a strong UI story: command room, agent rail, decision desk, audit trail.
- It creates a credible enterprise architecture through Supabase records, Band messages, provider metadata, and audit events.

Value recommendation:

Lead the pitch with coordination and trust. The best line is:

> CrisisCoord helps companies respond to regulated crises by making specialized agents coordinate through a shared Band room while humans retain approval over high-risk decisions.

### Risks, Limits, And Controls

This section should shape the guardrails before implementation.

| Risk | Why it matters | Control |
| --- | --- | --- |
| Real customer data enters prompts | Personal, health, payment, legal, or confidential data may be exposed to providers. | Public demo uses synthetic data only. Future real mode requires redaction, data processing agreement/vendor review, and explicit data policy. |
| AI gives final legal advice | Could mislead users and judges. | Legal outputs are obligation candidates with sources, confidence, assumptions, and human review state. |
| AI sends external notices | Creates legal, reputational, and operational exposure. | No external sending in MVP. All communications stay draft-only. |
| Communications drafts from stale facts | Could produce wrong regulator/customer messaging. | Server-side dependency gate requires Legal and Technical validated outputs. |
| Deadline clocks are overconfident | Jurisdiction, entity type, discovery time, and legal status may be unclear. | Display clocks as review candidates with assumptions and owner role. |
| Technical agent invents scope | Model may hallucinate affected records or systems. | Technical output separates confirmed facts, estimates, assumptions, and unknowns. |
| Evidence is altered | Audit credibility collapses. | Evidence records are immutable or versioned; corrections create new audit events. |
| Prompt injection appears in uploaded evidence | Future upload flow could manipulate agents. | No upload-first MVP. Future upload requires sanitization, extraction, and prompt-injection checks. |
| Provider outage breaks demo | Partner APIs can be slow or unavailable. | Live, assisted, and seeded demo modes with transparent banners. |
| Judges cannot see Band usage | The project looks like a normal scripted workflow. | UI shows Band room ID, participants, messages, events, and handoff references. |
| Too many pages dilute build quality | Wide shallow app hurts demo. | Build command room first; keep seven routes as the ceiling. |
| Mac-only scripts block teammates | Windows/Linux contributors struggle. | Use Git, Git Bash, package scripts, and Node helpers for portability. |

Risk non-negotiables:

- No real sensitive data in the public demo.
- No auto-filing, auto-sending, auto-publishing, or production-impacting actions.
- No final legal conclusions from AI.
- No raw API keys, prompts, or provider errors in browser diagnostics.
- No hidden sequential script pretending to be multi-agent collaboration.

### Human Experience

Crisis response is emotional. The product should reduce panic instead of adding another noisy dashboard.

Human needs during a crisis:

- reassurance that facts are being organized
- clarity about who owns the next decision
- visible uncertainty rather than false confidence
- calm language that does not minimize harm
- enough urgency to act without making people reckless
- one place to see confirmed facts, assumptions, deadlines, and drafts

UI tone:

- calm, direct, and operational
- no playful copy inside crisis flows
- no scary exaggerated language
- no "AI has decided" phrasing
- use "candidate", "draft", "needs review", "confirmed", "unknown", and "requires approval"

Human-experience recommendation:

The decision desk should feel like a steady incident commander:

> Here is what we know, here is what is still uncertain, here is the deadline, here is the human decision needed now.

### Product Innovation

The project can feel innovative without becoming complicated.

Creative features for MVP:

- A visible dependency gate that shows Communications waiting for Legal plus Technical.
- A Band handoff map that proves agents are collaborating.
- Provider badges that show AI/ML API and Featherless usage without overwhelming the UI.
- A decision desk that turns uncertainty into a specific human approval task.
- A "safe prompt packet" viewer that shows what sanitized facts were sent to the model.
- A synthetic-data banner that makes the public demo trustworthy.
- A seeded fallback mode that honestly shows when live integrations are unavailable.

Post-MVP ideas:

- Data protection impact assessment helper.
- Regulator-notice checklist builder.
- Evidence packet redaction preview.
- Crisis simulation library for payment, healthcare, SEC, ransomware, supply-chain, and product-safety scenarios.
- Human stress-mode UI with fewer controls and larger decision cards.
- Cross-jurisdiction comparison mode for Legal Reviewers.

Innovation recommendation:

The most distinctive creative feature is the handoff map plus decision desk. Build that before adding extra scenarios.

### Delivery Management

This section controls the work and keeps the team aligned.

Build order:

1. Figma command-room frame.
2. Static command room with synthetic data.
3. Supabase schema for incidents, rooms, agent runs, findings, drafts, decisions, and audit events.
4. Server-side Communications dependency gate.
5. Band room creation and participant/handoff display.
6. Model-provider abstraction with AI/ML API and Featherless metadata.
7. Five agent contracts with Zod validation.
8. Human decision desk and draft approval states.
9. Demo modes: live, assisted, seeded.
10. Playwright checks for desktop, tablet, and mobile.

Ownership:

- UI owner: command room, decision desk, responsive layout, provider badges.
- Backend owner: Hono routes, Zod contracts, Supabase repositories, audit events.
- Agent owner: five agent prompts/runners, Band handoffs, provider wrapper.
- Compliance owner: source references, review clocks, legal disclaimers, data-protection rules.
- Demo owner: seeded scenario, pitch script, Gamma deck, fallback rehearsal.

Delivery rule:

Every feature must answer this before merge:

> Does this make the five-agent crisis path clearer, safer, or more judge-visible.

## Data Protection And AI Safety Plan

### Public Demo Data Rule

The public hackathon demo uses synthetic data only.

Do not use:

- real customer names
- real employee names
- real patient data
- real payment card data
- real breach logs
- real legal documents
- real company-confidential evidence
- real access tokens, API keys, IP allowlists, or credentials

### Future Real-Data Rule

If CrisisCoord ever handles real data, the product must add a formal privacy and security gate before any production use.

Required future controls:

- data protection impact assessment
- vendor and model-provider review
- data processing agreements where needed
- cross-border transfer review
- retention policy
- deletion and correction workflow
- role-based access control
- encryption at rest and in transit
- redaction before AI processing
- audit trail for every human and agent action
- data subject rights handling where applicable

### AI Prompt Data Classes

| Data class | AI handling |
| --- | --- |
| Synthetic demo facts | Allowed. |
| Publicly available generic rules | Allowed with source references. |
| Redacted incident summaries | Allowed only after human/privacy review in future real mode. |
| Personal data | Not allowed in public demo prompts. |
| Sensitive personal data | Not allowed in public demo prompts. |
| Payment card details | Not allowed. Use synthetic counts and categories only. |
| Health data | Not allowed in public demo prompts. |
| Legal privileged material | Not allowed. |
| Secrets and credentials | Never allowed. |
| Raw logs with identifiers | Not allowed until redacted and approved. |

### Redaction Pipeline

Use this pipeline before any model call once real integrations exist:

1. Intake receives a crisis signal.
2. Classifier labels data categories and sensitivity.
3. Redactor removes or replaces personal identifiers, credentials, account numbers, tokens, and confidential details.
4. Privacy gate stores the raw value separately with restricted access or rejects it.
5. Model prompt uses only the sanitized fact packet.
6. Agent output stores assumptions and source references.
7. Audit event records that a sanitized prompt packet was used.

For the hackathon, skip raw real intake entirely and seed sanitized synthetic packets directly.

### Global Data Protection Alignment

For global data-protection reasoning, model these principles in the product:

- lawful, fair, and transparent processing
- collection limitation and data minimization
- purpose specification and use limitation
- data quality, accuracy, and source tracking
- integrity and confidentiality
- storage limitation
- security safeguards
- accountability and governance
- breach documentation
- cross-border transfer review where applicable
- regulator or supervisory-authority notification review where applicable
- affected-person communication review where applicable

Implementation translation:

- Only collect fields needed for the demo.
- Store source facts separately from model findings.
- Label every finding as confirmed, assumed, unknown, or reviewed.
- Keep customer-facing notices as drafts.
- Require a human Legal/Privacy Reviewer before any data-protection conclusion.
- Preserve facts, effects, and remedial action in the audit timeline.

## UI Plan

The UI should have one primary mental model:

> A crisis is moving through a safe review pipeline.

Command room regions:

- top incident bar for severity, phase, data category, deadline, demo mode, and last refresh
- left agent rail for five agent statuses
- center workspace for Band timeline, handoff map, findings, drafts, and audit tabs
- right decision desk for the human decision, risks, and approval actions

UI states:

- `synthetic`
- `running`
- `blocked`
- `needs review`
- `draft`
- `approved`
- `failed`
- `seeded fallback`

Required UI labels:

- "Draft guidance"
- "Needs human review"
- "Synthetic demo data"
- "Communications blocked"
- "Provider: AI/ML API"
- "Provider: Featherless"
- "Legal conclusion not finalized"
- "External sending disabled"

Mobile priority:

1. Incident summary.
2. Human decision card.
3. Agent status accordion.
4. Timeline and findings behind tabs.

## Data, Audit, And Privacy Plan

Supabase should store separate records for:

- crisis signal
- incident
- Band room
- agent run
- assessment finding
- legal obligation candidate
- technical finding
- communication draft
- decision request
- decision response
- audit event
- provider diagnostic

Audit event requirements:

- actor type: human, agent, system
- actor ID or role
- action
- target record
- timestamp
- previous state when relevant
- next state when relevant
- provider and model when model-backed
- Band message or event reference when available
- redaction status when a model prompt was used

Privacy design:

- raw facts and derived findings stay separate
- generated text never overwrites source facts
- corrections create new records
- every approval has a human actor and reason
- audit views avoid showing secrets or raw sensitive data
- data export is post-MVP unless needed for the pitch

## Communications Plan

Communications must be the most guarded part of the product.

Allowed in MVP:

- regulator draft
- customer draft
- executive update
- internal holding statement
- missing-fact checklist
- facts-used panel
- legal warnings
- approval status

Not allowed in MVP:

- sending email
- posting to status page
- filing regulator notice
- notifying customers
- notifying media
- messaging insurers, law enforcement, or payment networks from the app

Draft approval flow:

1. Communications receives Legal and Technical outputs.
2. Server confirms both outputs are validated and tied to the same incident.
3. Communications drafts audience-specific messages.
4. Draft records are created with `needs_review`.
5. Legal Reviewer approves legal wording or requests changes.
6. Communications Lead approves tone and audience fit.
7. Executive Approver handles proactive customer strategy if high impact.
8. Audit records every decision.

## Crisis Clock Plan

The product should show clocks as reviewable decision aids.

| Clock | Use in CrisisCoord |
| --- | --- |
| GDPR 72-hour supervisory authority review | Candidate clock when EU personal data risk exists. |
| HIPAA 60-day notification review | Candidate clock when unsecured protected health information may be involved. |
| SEC four-business-day review | Candidate clock only after human materiality determination for public-company scenario. |
| Configurable contractual notice SLA | Candidate customer, vendor, insurer, payment-network, or partner deadline based on the specific agreement. |
| CISA/CIRCIA review | Candidate critical-infrastructure review, with final effective status confirmed before demo claims. |

Clock UI rules:

- show start time and assumption
- show owner role
- show source family
- show confidence
- show missing facts
- show "review required"
- never show "automatically due" as a final legal conclusion

## AI Autonomy Boundaries

AI may automate:

- synthetic signal normalization
- room creation
- agent recruitment
- run state updates
- schema validation
- audit logging
- provider diagnostics
- seeded fallback selection

AI may recommend:

- crisis category
- severity
- likely obligations
- technical scope
- containment options
- draft communications
- missing facts
- escalation decision text

Humans must approve:

- final legal conclusions
- final materiality determination
- regulator, customer, media, insurer, law-enforcement, or payment-network contact
- external communication wording
- production containment actions
- ransom decisions
- threat attribution
- evidence sufficiency
- overrides

AI must not:

- auto-send
- auto-file
- auto-publish
- execute destructive technical actions
- process real sensitive demo data
- delete or mutate evidence
- claim final legal advice

## Implementation Priorities

Use the same three phases defined in [phased-delivery-plan.md](./phased-delivery-plan.md).

### Phase 1: Demo Sandbox Foundation

- Build the static command room, five agent statuses, synthetic payment-data crisis, Communications blocked state, and decision desk.
- Add Supabase records for incidents, agent runs, findings, draft communications, human decisions, and audit events.
- Prove Band room creation, agent participant display, Band messages/events, AI/ML API calls, Featherless calls, and provider metadata.
- Add synthetic-data banners, legal disclaimer copy, seeded fallback mode, responsive checks, and Gamma presentation assets.

### Phase 2: Integration Sandbox

- Add redaction status fields, safe inbound-signal validation, and server-side dependency gates.
- Test fake-company roles, tenant isolation, audit logging, rate limits, and sanitized tabletop scenarios.
- Ensure model prompts receive sanitized facts only, not raw customer, payment, health, employee, legal, security, or confidential business data.

### Phase 3: Controlled Enterprise Pilot

- Add one approved read-only enterprise source after sandbox validation.
- Keep external communications, regulator filings, production changes, and destructive actions behind explicit human approval.
- Export audit packets that show source facts, agent outputs, model providers, human reviewers, and final decisions.

## Final Operating Principle

CrisisCoord should help humans make faster, better crisis decisions. It should not replace lawyers, incident commanders, communications leads, privacy officers, executives, or forensic teams.

The strongest demo is not full autonomy. The strongest demo is controlled collaboration:

> Five agents move the crisis forward, but humans keep authority over the decisions that can harm people, expose the company, or change the outside world.

## Source Anchors

- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon): Band collaboration, minimum agent requirement, and partner stack.
- [OECD Privacy Principles](https://www.oecd.org/en/topics/privacy-principles.html): global privacy principles, cross-border data protection, and accountability.
- [ISO/IEC 27035-1:2023](https://www.iso.org/standard/78973.html): globally applicable information security incident management principles and process.
- [NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/): AI governance, human oversight, mapping, measuring, and managing AI risk.
- [NIST SP 800-61 Rev. 3](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf): incident response roles, governance, detection, response, recovery, and communications.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): prompt injection and excessive agency risks.
- [SEC cybersecurity disclosure final rule](https://www.sec.gov/rules-regulations/2023/07/s7-09-22): material cybersecurity incident disclosure timing depends on materiality determination.
- [HHS HIPAA Breach Notification Rule](https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html): unsecured protected health information notification timing and content.
- [GDPR Article 33](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?qid=1775261725114&uri=CELEX%3A02016R0679-20160504): supervisory authority notification and breach documentation.
- [CISA CIRCIA](https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/cyber-incident-reporting-critical-infrastructure-act-2022-circia): critical-infrastructure reporting context and final-rule caution.
