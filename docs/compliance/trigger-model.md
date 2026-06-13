# Compliance And Crisis Trigger Model

Last updated: June 13, 2026.

## Purpose

This document defines what CrisisCoord means by a trigger and how the system should classify regulated crisis scenarios.

It is not legal advice. It is a product and architecture guide for creating reviewable compliance workflows.

## What Is A Trigger?

A trigger is a fact pattern that should start or update a crisis workflow.

A trigger can come from:

- security detection
- vulnerability intelligence
- customer report
- vendor notice
- legal notice
- regulator inquiry
- system outage
- product safety report
- payment processor alert
- ransomware note
- executive decision threshold
- media or public reputation event

The trigger does not prove an obligation. It tells CrisisCoord that the incident needs structured assessment, specialist agents, evidence collection, deadline tracking, and human review.

## How Breaches Commonly Occur

The trigger model should identify the likely breach mechanism when possible, but it must also record uncertainty. Early crisis facts are often incomplete.

Common breach mechanisms to support:

- credential compromise: stolen passwords, session tokens, API keys, admin credentials, or service accounts
- phishing or social engineering: malicious email, impersonation, business-email compromise, or fake login flows
- web or API exploitation: injection, auth bypass, broken access control, exposed admin routes, or vulnerable web components
- CVE/known exploited vulnerability: affected asset matches a CVE, appears in CISA KEV, or has public exploitation evidence
- zero-day or unknown exploit: exploitation is observed before a complete patch, CVE, or public advisory exists
- cloud or storage misconfiguration: public bucket, exposed database, overly broad sharing, or incorrect access policy
- third-party or supply-chain compromise: SaaS vendor breach, managed service provider breach, malicious dependency, or compromised update channel
- ransomware/extortion: encryption, data leak threat, ransom payment demand, or attacker claim of exfiltration
- insider misuse or improper usage: authorized user violates policy or accesses data without business need
- loss or theft: lost laptop, mobile device, removable media, or printed records
- destructive or availability event: denial of service, destructive malware, corrupted systems, or critical service outage

For each suspected mechanism, record:

- evidence source
- confidence
- affected systems
- affected data categories
- known indicators
- containment status
- whether legal/compliance review is required

## Trigger Output Shape

Every trigger should be normalized into this shape:

```ts
type CrisisTrigger = {
  triggerType: string;
  source: string;
  detectedAt: string;
  affectedSystems: string[];
  affectedDataCategories: string[];
  affectedJurisdictions: string[];
  organizationContext: string[];
  suspectedObligations: string[];
  severity: "low" | "medium" | "high" | "critical";
  confidence: "low" | "medium" | "high";
  knownFacts: string[];
  assumptions: string[];
  unknowns: string[];
  recommendedAgents: string[];
};
```

## Agent Routing

| Trigger condition | Required agents |
| --- | --- |
| Any high-stakes incident | Assessment, Escalation |
| Personal data involved | Legal, Communications |
| Health data involved | Legal, Communications |
| Payment or card data involved | Legal, Technical, Communications |
| Public-company materiality possible | Legal, Escalation |
| Vulnerability exploited or zero-day suspected | Technical, Legal |
| Ransomware or extortion | Technical, Legal, Communications, Escalation |
| Customer/public trust impact | Communications, Escalation |
| Critical service disruption | Technical, Communications, Escalation |
| Vendor/supply-chain incident | Legal, Technical, Communications |

## Trigger Families

### 1. Payment Data Exposure

Examples:

- unauthorized access to payment system
- card records exposed
- payment token database accessed
- payment processor alert

Likely review paths:

- data breach review
- payment-card obligation review
- customer notification review
- regulator or partner notice review

Required facts:

- data categories
- number of records
- jurisdictions
- tokenized vs full card data
- containment status
- evidence confidence

### 2. Public-Company Cybersecurity Incident

Examples:

- cyber incident may be material to investors
- large outage affects revenue
- public disclosure decision needed
- board-level cyber event

Likely review paths:

- SEC materiality review
- Form 8-K Item 1.05 deadline if materiality is determined
- executive and board decision queue

Important rule:

- CrisisCoord can flag possible materiality review. A human legal/executive reviewer must determine materiality.

### 3. GDPR Personal Data Breach

Examples:

- EU personal data exposed
- unauthorized access to customer account data
- personal data exfiltration confirmed

Likely review paths:

- supervisory authority notification review
- 72-hour clock assessment
- data subject communication review if high risk
- documentation of facts, effects, and remedial action

Required facts:

- controller vs processor role
- EU/EEA data subjects affected
- risk to rights and freedoms
- categories and approximate number of data subjects
- categories and approximate number of records
- mitigation measures

### 4. HIPAA / Health Data Breach

Examples:

- unsecured protected health information exposed
- patient records accessed
- healthcare vendor breach

Likely review paths:

- individual notification review
- HHS Secretary notice review
- media notice review for 500+ affected residents in a state or jurisdiction
- business associate notification review

Required facts:

- covered entity or business associate role
- unsecured PHI involved
- number of affected individuals
- affected locations
- discovery date
- mitigation steps

### 5. CISA / Critical Infrastructure Cyber Incident

Examples:

- critical service disruption
- operational technology impact
- ransomware payment
- third-party compromise affecting critical operations

Likely review paths:

- voluntary CISA report before final CIRCIA rules are effective
- CIRCIA readiness review for covered entities once final rule applies
- technical indicator sharing

Required facts:

- sector
- covered-entity possibility
- impact to services or goods
- vulnerabilities exploited
- tactics, techniques, and procedures
- indicators of compromise
- ransom payment status

### 6. CVE / Known Exploited Vulnerability

Examples:

- vulnerable internet-facing asset matches a CVE
- CVE appears in CISA KEV catalog
- exploit automation exists
- exploit grants total or partial control

Likely review paths:

- vulnerability remediation priority
- forensic triage
- incident investigation if exploitation is suspected
- customer/vendor communication if exposed service is affected

Required facts:

- CVE ID
- affected asset
- public exposure
- KEV status
- exploit automation
- technical impact
- patch or mitigation availability
- evidence of exploitation

### 7. Zero-Day Or Unknown Exploit

Examples:

- exploitation observed before patch or CVE exists
- abnormal access pattern tied to unknown exploit
- vendor advisory says active exploitation with no full fix

Likely review paths:

- Technical Forensics containment
- Legal risk review
- Communications holding statement
- Escalation for shutdown, isolation, or customer-notice decisions

Required facts:

- observed behavior
- affected product or system
- indicators of compromise
- vendor advisory status
- patch/mitigation status
- evidence of data access
- blast radius

### 8. Ransomware / Extortion

Examples:

- ransom note received
- data leak threat
- encryption event
- attacker claims exfiltration
- payment considered or made

Likely review paths:

- containment and restoration
- legal/regulatory reporting
- sanctions/payment review
- insurer and law enforcement notice
- customer/public communications

Required facts:

- systems encrypted
- data exfiltration evidence
- ransom demand
- payment status
- operational impact
- recoverability
- backups and restoration plan

### 9. Supply-Chain Or Vendor Compromise

Examples:

- third-party SaaS breach
- managed service provider compromise
- malicious package or dependency
- compromised update channel

Likely review paths:

- vendor contract notice
- customer downstream impact review
- technical containment
- legal responsibility review

Required facts:

- vendor role
- systems connected
- data shared with vendor
- downstream customers affected
- contract notice deadlines
- mitigation steps

### 10. Product Safety / Recall

Examples:

- unsafe product batch
- customer injury signal
- defective component
- regulatory complaint

Likely review paths:

- product recall workflow
- customer notification
- regulator notice
- legal review
- executive decision

Required facts:

- affected product
- batch or serial range
- harm severity
- jurisdictions
- distribution scope
- corrective action

## Hyper-Compliant Product Behavior

CrisisCoord should be hyper-compliant by design:

- show possible obligations, not final legal conclusions
- capture source facts separately from generated findings
- record assumptions and missing information
- require human approval before external action
- preserve timestamps and actor identity
- attach source references to legal/regulatory claims
- keep every generated communication in draft state
- mark confidence and evidence quality
- provide audit export later
- make uncertainty visible instead of hiding it

## Severity Scoring Inputs

Severity should combine:

- functional impact
- information impact
- recoverability
- affected record/user count
- critical system involvement
- public exposure
- KEV status
- exploitability
- technical impact
- ransomware involvement
- customer/public trust impact
- regulatory deadline pressure
- executive/materiality threshold

## Example Trigger Scenarios

### Finance Scenario

Signal:

> Unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Agents:

- Assessment
- Legal
- Technical
- Communications
- Escalation

Likely concerns:

- payment data
- personal data
- customer notification
- possible SEC materiality review if public company
- technical containment

### Public Company Zero-Day Scenario

Signal:

> A zero-day vulnerability is being exploited against an internet-facing customer portal. Vendor mitigation is available but no patch exists.

Agents:

- Assessment
- Technical
- Legal
- Communications
- Escalation

Likely concerns:

- KEV/CVE monitoring
- public exposure
- materiality review
- containment decision
- customer advisory draft

### Healthcare Scenario

Signal:

> A misconfigured storage bucket exposed 18,000 patient billing records for three days.

Agents:

- Assessment
- Legal
- Technical
- Communications
- Escalation

Likely concerns:

- unsecured PHI
- HIPAA notification
- individual notice
- HHS notice
- media notice if jurisdiction thresholds apply

### Critical Infrastructure Ransomware Scenario

Signal:

> Ransomware encrypted scheduling systems for a regional utility. Operations are degraded and attackers claim data exfiltration.

Agents:

- Assessment
- Technical
- Legal
- Communications
- Escalation

Likely concerns:

- operational disruption
- CISA reporting readiness
- law enforcement/insurer notice
- customer/public messaging
- ransom payment decision

### Supply-Chain Scenario

Signal:

> A vendor reports that an update package used by our production monitoring agent contained credential-stealing malware.

Agents:

- Assessment
- Technical
- Legal
- Communications
- Escalation

Likely concerns:

- malicious dependency
- credential compromise
- customer downstream impact
- vendor contract notice
- forced rotation and containment

## Sources

- CISA Known Exploited Vulnerabilities Catalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- CISA BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk
- CISA Federal Incident Notification Guidelines: https://www.cisa.gov/federal-incident-notification-guidelines
- CISA CIRCIA: https://www.cisa.gov/topics/cyber-threats-and-advisories/information-sharing/cyber-incident-reporting-critical-infrastructure-act-2022-circia
- NIST SP 800-61r3 announcement: https://www.nist.gov/news-events/news/2025/04/nist-revises-sp-800-61-incident-response-recommendations-and-considerations
- SEC cybersecurity disclosure guide: https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure
- EDPB data breach guide: https://www.edpb.europa.eu/sme-data-protection-guide/data-breaches_en
- HHS HIPAA breach notification: https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html
