# Production Standard Research

This research note supports the CrisisCoord production stack standard.

The goal is not to hard-code one jurisdiction or one industry. CrisisCoord should classify each incident by facts, data category, sector, affected geography, contracts, and organization type, then produce reviewable recommendations for the Legal Reviewer.

This document is not legal advice.

## Incident Response Structure

NIST SP 800-61 Revision 3 frames incident response as a coordinated capability with preparation, detection, analysis, response, communications, recovery, and improvement. It supports the CrisisCoord choice to model incident response as structured playbooks, agent roles, status transitions, evidence, and post-incident review.

Source:

- https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf

## Incident Notification Data Elements

CISA incident notification guidance identifies practical reporting elements such as impact, information type, recoverability, detection time, affected systems/records/users, network location, indicators of compromise, and mitigation actions. These are useful fields for CrisisCoord incident assessment and technical findings.

Source:

- https://www.cisa.gov/federal-incident-notification-guidelines

## Incident Response Coordination

CISA incident response material emphasizes clear response plans, stakeholder coordination, information sharing, and minimizing incident impact. That supports the CrisisCoord focus on a shared Band room and cross-functional agent handoffs.

Source:

- https://www.cisa.gov/topics/cyber-threats-and-response/incident-response

## Evidence Preservation And Internal Notification

DOJ cyber incident guidance emphasizes preserving logs, notes, records, and data, plus notifying the right internal points of contact such as senior management, technical responders, communications personnel, and legal counsel. That supports CrisisCoord's audit timeline and multi-agent role separation.

Source:

- https://www.justice.gov/criminal/criminal-ccips/file/1096971/dl

## Business Breach Response

FTC business guidance emphasizes determining legal requirements, checking applicable state/federal rules, coordinating with law enforcement where needed, and providing practical affected-person guidance. That supports CrisisCoord's generic jurisdiction/sector check instead of one state-specific checklist.

Source:

- https://www.ftc.gov/business-guidance/resources/data-breach-response-guide-business

## GDPR Personal Data Breach Notification

GDPR Article 33 requires notification to the competent supervisory authority without undue delay and, where feasible, within 72 hours after becoming aware of a personal data breach unless the breach is unlikely to result in risk to individuals' rights and freedoms. It also requires documenting breach facts, effects, and remedial action.

Sources:

- https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
- https://www.edpb.europa.eu/system/files/2023-04/edpb_guidelines_202209_personal_data_breach_notification_v2.0_en.pdf

## SEC Cybersecurity Incident Disclosure

SEC cybersecurity disclosure rules require public companies to disclose material cybersecurity incidents on Form 8-K Item 1.05 generally within four business days after determining materiality, with limited delay possibilities. This supports CrisisCoord's deadline and materiality-review model for public-company scenarios.

Sources:

- https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure
- https://www.sec.gov/files/33-11216-fact-sheet.pdf

## HIPAA Breach Notification

HHS guidance says covered entities and business associates must provide notifications following breaches of unsecured protected health information. Timing and recipients depend on the facts, including whether 500 or more individuals are affected. This supports CrisisCoord's sector-specific checks for health-data incidents.

Source:

- https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html

## CrisisCoord Implications

The 18 production standards should:

- stay project-specific;
- avoid one-state or one-industry assumptions;
- classify the incident first;
- separate facts from assumptions;
- preserve evidence and audit trails;
- show deadlines as reviewable recommendations;
- require human legal/executive approval before external communications;
- keep demo data synthetic;
- make Band-mediated handoffs visible.
