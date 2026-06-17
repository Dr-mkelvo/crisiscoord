# Exa Generic Incident Research

Last updated: June 17, 2026.

## Purpose

This note records the Exa research pass used to check whether the current CrisisCoord routing, backend roadmap, and UI direction are still aligned with real incident-response practice.

The short answer: yes. The app should stay generic, signal-first, and command-room centered. It should not be tied to one payment incident, one file upload, one regulation, or one country.

## Sources Checked With Exa

- NIST SP 800-61 Rev. 3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: <https://csrc.nist.gov/pubs/sp/800/61/r3/final>
- NIST SP 800-61r3 PDF: <https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=959417>
- CISA Incident Response Plan Basics: <https://www.cisa.gov/sites/default/files/publications/Incident-Response-Plan-Basics_508c.pdf>
- CISA Federal Government Cybersecurity Incident and Vulnerability Response Playbooks: <https://www.cisa.gov/sites/default/files/2024-08/Federal_Government_Cybersecurity_Incident_and_Vulnerability_Response_Playbooks_508C.pdf>
- Palo Alto Networks Cortex XSOAR incident case management: <https://www.paloaltonetworks.com/cortex/incident-case-management>
- Splunk SOAR features: <https://www.splunk.com/en_us/products/splunk-security-orchestration-and-automation-features.html>
- EDPB Guidelines 9/2022 on GDPR personal data breach notification: <https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202209_personal_data_breach_notification_v2.0_en.pdf>
- SEC final cybersecurity incident disclosure rule: <https://www.sec.gov/files/rules/final/2023/33-11216.pdf>
- HHS HIPAA Breach Notification Rule: <https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html>

## What Changed From The Research

### 1. Current NIST Guidance Supports A Generic Incident Model

NIST SP 800-61 Rev. 3 supersedes Rev. 2 and frames incident response as part of organization-wide cybersecurity risk management. It explicitly treats incidents broadly across confidentiality, integrity, availability, policy violations, SaaS compromise, ransomware, phishing fraud, vulnerability exploitation, and supply-chain compromise.

Product implication:

- Keep `/incidents/:incidentId` as the primary route shape.
- Keep many incident scenarios in the catalog.
- Keep one reusable command-room workflow that adapts to the incident, sector, source, affected assets, obligations, and owners.
- Do not build the app around one permanent demo slug or one permanent data-breach story.

### 2. CISA Guidance Validates The Role Model

CISA's incident response plan guidance separates incident leadership, technical leadership, communications ownership, legal review, stakeholder planning, law-enforcement/vendor coordination, tabletop exercises, holding statements, and retrospectives.

Product implication:

- The UI must show human owners, acknowledgement, escalation, and communication status.
- The backend must store role assignments and decision authority.
- The notification model should support in-app, Band, email/SMS test mode, paging-style escalation, and manual fallback.
- Retrospective and audit exports are not decorative. They are part of the product proof.

### 3. SOAR Products Validate War Rooms, Tabs, Evidence, And Integrations

Cortex XSOAR and Splunk SOAR both emphasize case management, incident-specific layouts, real-time collaboration, playbooks, integrations, evidence, auto-documentation, custom tabs, dashboards, and action history.

Product implication:

- Seven top-level routes are still enough.
- Tabs inside each route are necessary because real incident work has multiple work modes.
- The Command Room should remain the hero surface.
- A Band timeline, agent handoff map, notification center, evidence trail, and provider status are more important than adding more top-level pages.
- The app should integrate with existing business systems instead of asking teams to replace their stack.

### 4. Regulatory Research Confirms Candidate Obligations, Not Final Legal Answers

The checked sources confirm that deadlines and notification triggers vary by jurisdiction, sector, entity type, affected data, awareness/discovery state, and materiality decision.

Useful examples for the sandbox catalog:

- GDPR personal data breach notification can require supervisory authority notice within 72 hours after awareness when the risk threshold is met.
- SEC public-company cybersecurity disclosure is tied to materiality determination and Form 8-K timing.
- HIPAA breach notification depends on unsecured protected health information and affected-individual/media/HHS reporting rules.

Product implication:

- Legal & Regulatory Agent output must say "candidate obligation" and "requires human legal review."
- Deadline clocks must be computed from scenario facts and jurisdiction metadata, not hard-coded globally.
- The app must preserve why a notification was or was not recommended.
- The demo should show a human decision point before external communication.

## Research-Backed Product Rules

1. A crisis signal can become an incident only after assessment records the affected domain, severity, source, confidence, and unknowns.
2. Every incident must have a stable `incidentId`, but the UI copy must show the human-readable incident name and type.
3. Agent outputs must be validated and stored before they are posted into the Band room or used by another agent.
4. Communications can draft only after Legal and Technical outputs are valid for the same incident and room.
5. Notification actions create CrisisCoord records first, then optional external provider attempts.
6. External email/SMS/customer/regulator delivery stays disabled unless safe demo recipients and provider status are configured.
7. The audit trail must preserve source, owner, provider/model metadata, Band reference, timestamp, confidence, and human decision state.
8. Scenario fixtures must cover multiple domains: vendor/SaaS compromise, ransomware, health privacy, product/supply-chain safety, and financial data exposure.
9. No top-level route should assume one incident category. Use route parameters, filters, and seeded scenario ids.
10. The product should make existing-system integration visible through adapters, not through a fake file-upload-first workflow.

## Implementation Consequences

For the current codebase, the Exa pass supports the changes already made:

- generic incident routes
- multiple seeded incidents
- no-key local backend
- workspace payloads loaded by `incidentId`
- tests across more than one scenario
- legacy route normalization rather than a permanent product assumption

For the next backend sprint, prioritize:

1. Shared contracts for incidents, signals, agent runs, findings, decisions, notifications, drafts, and audit events.
2. Supabase migrations and seeded scenario fixtures.
3. Band room adapter with visible message/event references.
4. Provider adapters for AI/ML API and Featherless with validated JSON output and provider metadata.
5. Notification records and safe simulated provider attempts.
6. Role and tenant access checks before any write action.
7. Evidence export and retrospective package generation.

## What Not To Build

- Do not make upload the main product entry point.
- Do not make the command room a static dashboard with no action trail.
- Do not let model output directly become trusted app state.
- Do not send customer, regulator, patient, employee, or payment-related messages automatically.
- Do not treat one regulation as the global default.
- Do not add more top-level pages to solve tab-level work modes.
