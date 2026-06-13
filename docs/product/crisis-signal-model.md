# Crisis Signal Model

Last updated: June 13, 2026.

## Purpose

CrisisCoord should start from a crisis signal, not a file upload.

The product-facing language should be:

- crisis signal
- incident signal
- event signal
- incident declaration

Use `trigger` only as an internal rules-engine word when discussing compliance logic. Do not make `trigger` the main UI label.

## What Is A Crisis Signal?

A crisis signal is a fact pattern that starts or updates a crisis response workflow.

It tells the system:

- something important may have happened
- specialist review is needed
- facts are incomplete
- a shared room should be opened
- legal, technical, communications, compliance, or executive teams may need to coordinate

A crisis signal does not prove a breach, violation, material event, or legal obligation. It starts the structured review.

## What A Crisis Signal Is Not

A crisis signal is not:

- a CSV upload
- a PDF upload
- a generic chatbot prompt
- a one-off document analysis request
- a spreadsheet row
- a manually pasted report as the primary product experience

Files can be supporting evidence after an incident exists. They should not be the thing that defines the product.

## Signal Sources

MVP sources:

- demo scenario launcher
- synthetic webhook payload
- manually entered incident signal

Future production sources:

- SIEM alert
- EDR/XDR detection
- cloud security alert
- DLP alert
- payment processor alert
- vulnerability intelligence
- CISA KEV/CVE match
- vendor breach notice
- customer support escalation
- regulator inquiry
- legal notice
- ransomware note
- executive incident declaration
- public media/reputation event

See [../architecture/business-integration-plan.md](../architecture/business-integration-plan.md) for the staged plan to connect these sources safely through read-only webhooks, sensitivity filtering, and human-approved outbound updates.

## Signal Examples

### Payment Data Exposure

```text
At 2:47 AM, unauthorized access was detected in the payment system.
50,000 card records are potentially exposed.
Containment status is unknown.
```

### Public-Company Cyber Event

```text
Production outage and suspected unauthorized access may affect revenue-critical systems.
Materiality review may be required.
```

### Healthcare Data Exposure

```text
A vendor reports unauthorized access to patient appointment records.
The affected population and PHI fields are still being confirmed.
```

### Zero-Day / KEV Signal

```text
An internet-facing asset matches a known exploited vulnerability.
Exploit activity is suspected but not confirmed.
```

### Vendor Compromise

```text
A third-party SaaS provider reports a breach involving exported customer records.
Contract notice obligations may apply.
```

## Signal Intake Shape

Use this shape for demo fixtures, API payloads, and Supabase records.

```ts
type CrisisSignal = {
  id: string;
  title: string;
  sourceType:
    | "demo"
    | "manual"
    | "webhook"
    | "siem"
    | "edr"
    | "cloud"
    | "dlp"
    | "vendor_notice"
    | "customer_report"
    | "regulator_inquiry"
    | "legal_notice"
    | "media_event"
    | "executive_declaration";
  detectedAt: string;
  receivedAt: string;
  summary: string;
  affectedSystems: string[];
  affectedDataCategories: string[];
  affectedJurisdictions: string[];
  organizationContext: string[];
  initialSeverity: "low" | "medium" | "high" | "critical" | "unknown";
  knownFacts: string[];
  assumptions: string[];
  unknowns: string[];
  evidenceRefs: string[];
  recommendedAgents: Array<
    "assessment" | "legal" | "technical" | "communications" | "escalation"
  >;
};
```

## Intake Flow

```text
Crisis signal
  -> integration gateway validates source and signature when signal comes from a business system
  -> sensitivity classifier/redactor removes unsafe data
  -> normalize into CrisisSignal
  -> create incident
  -> create/open Band room
  -> Assessment Agent posts initial context
  -> Legal + Technical are recruited
  -> Communications waits for both
  -> Escalation routes human decisions
```

## UI Implications

The first screen should show a crisis signal already becoming an incident.

Recommended labels:

- `Signal received`
- `Open crisis room`
- `Start coordinated response`
- `Source`
- `Detected at`
- `Known facts`
- `Unknowns`
- `Recommended agents`

Avoid labels:

- `Upload file`
- `Analyze CSV`
- `Ask AI`
- `Trigger`
- `Run bot`

## Evidence Handling

Evidence is secondary to the crisis signal.

After the incident exists, users may attach or reference:

- system logs
- forensic notes
- screenshots
- vendor notices
- regulator letters
- call notes
- email excerpts
- public advisories
- affected-system records

Every evidence artifact should link to:

- incident ID
- source
- owner
- confidence
- review status
- agent output it supports

## Why This Matters

Competitor demos that start with file upload make the product feel like document analysis. CrisisCoord should feel like operational coordination under pressure. The user should see the crisis, the room, the agents, the dependency gate, the decision, and the audit trail before they see any optional evidence upload.
