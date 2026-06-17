export type Tone =
  | "brand"
  | "info"
  | "warning"
  | "risk"
  | "danger"
  | "success"
  | "review"
  | "muted";

export type SandboxId =
  | "third-party-risk"
  | "cyber-resilience"
  | "health-privacy"
  | "product-supply-chain"
  | "finance-payments";

export type SandboxProfile = {
  id: SandboxId;
  label: string;
  domain: string;
  description: string;
};

export type ActionKind =
  | "navigate-command"
  | "navigate-communications"
  | "navigate-audit"
  | "tab-email"
  | "tab-sms"
  | "tab-delivery"
  | "tab-messaging"
  | "tab-evidence"
  | "tab-escalations";

export type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: Tone;
};

export type FeedItem = {
  title: string;
  detail: string;
  meta: string;
  tone: Tone;
};

export type DetailCard = {
  title: string;
  body: string;
  meta: string;
  tone: Tone;
};

export type PageAction = {
  label: string;
  tone: Tone;
  kind?: ActionKind;
};

export type PageTab = {
  name: string;
  eyebrow: string;
  title: string;
  summary: string;
  metrics: Metric[];
  feedTitle: string;
  feed: FeedItem[];
  mainTitle: string;
  mainSummary: string;
  cards: DetailCard[];
  actionTitle: string;
  actionSummary: string;
  actions: PageAction[];
  status: FeedItem[];
};

export type WorkspacePage = {
  id: string;
  href: string;
  navLabel: string;
  title: string;
  subtitle: string;
  routeLabel: string;
  activeBadge: string;
  tone: Tone;
  tabs: PageTab[];
};

export type IncidentScenario = {
  id: string;
  sandboxId: SandboxId;
  title: string;
  shortTitle: string;
  type: string;
  sourceType: string;
  severity: "Critical" | "High" | "Medium";
  tone: Tone;
  phase: string;
  owner: string;
  detectedAt: string;
  deadline: string;
  summary: string;
  suspectedScope: string;
  affectedSystems: string[];
  dataCategories: string[];
  legalFocus: string;
  technicalFinding: string;
  communicationsBlocker: string;
  decisionQuestion: string;
  riskOfApproving: string;
  riskOfWaiting: string;
};

export type IncidentSummary = Pick<
  IncidentScenario,
  | "id"
  | "title"
  | "shortTitle"
  | "sandboxId"
  | "type"
  | "severity"
  | "tone"
  | "phase"
  | "owner"
  | "deadline"
  | "summary"
>;

export type WorkspacePayload = {
  activeIncidentId: string;
  incidents: IncidentSummary[];
  pages: WorkspacePage[];
};

export const defaultIncidentId = "vendor-credential-compromise";

export const sandboxProfiles: SandboxProfile[] = [
  {
    id: "third-party-risk",
    label: "Third-party risk",
    domain: "Vendor and SaaS access",
    description:
      "Vendor notices, integration credentials, SaaS access logs, and customer-impact review.",
  },
  {
    id: "cyber-resilience",
    label: "Cyber resilience",
    domain: "Ransomware and outage response",
    description:
      "Containment, restoration, executive updates, and unverified exfiltration claims.",
  },
  {
    id: "health-privacy",
    label: "Health privacy",
    domain: "Healthcare privacy workflow",
    description:
      "Privacy review, service-account access, report exports, and protected-data safeguards.",
  },
  {
    id: "product-supply-chain",
    label: "Product and supply chain",
    domain: "Safety, recall, and supplier quality",
    description:
      "Support spikes, public-risk assessment, field reports, supplier facts, and customer guidance.",
  },
  {
    id: "finance-payments",
    label: "Finance and payments",
    domain: "Payment and personal-data exposure",
    description:
      "Payment-system access, card-data candidates, customer notices, and regulator review.",
  },
];

export const seededIncidents: IncidentScenario[] = [
  {
    id: "vendor-credential-compromise",
    sandboxId: "third-party-risk",
    title: "Vendor credential compromise",
    shortTitle: "Vendor credentials",
    type: "Third-party access incident",
    sourceType: "Vendor notice and identity logs",
    severity: "High",
    tone: "warning",
    phase: "Legal and Technical review",
    owner: "Incident commander",
    detectedAt: "04:18 UTC",
    deadline: "48h",
    summary:
      "A third-party platform reports that integration credentials may have been used outside the approved network boundary.",
    suspectedScope:
      "Customer export logs, integration tokens, service account activity, and vendor support access records.",
    affectedSystems: ["Vendor integration gateway", "Identity provider", "Customer export service"],
    dataCategories: ["customer metadata", "integration credentials", "support-access audit logs"],
    legalFocus:
      "Determine whether unauthorized third-party access creates notification or contractual disclosure obligations.",
    technicalFinding:
      "Credential rotation is complete; exported-record scope is still being reconciled against source logs.",
    communicationsBlocker:
      "Customer-facing language is blocked until Technical confirms whether data was exported.",
    decisionQuestion:
      "Do we notify impacted enterprise customers before final export reconciliation is complete?",
    riskOfApproving:
      "The notice could overstate confirmed exposure if export reconciliation later narrows the scope.",
    riskOfWaiting:
      "Waiting could leave account teams without a consistent answer while customers ask about vendor access.",
  },
  {
    id: "ransomware-containment",
    sandboxId: "cyber-resilience",
    title: "Ransomware containment event",
    shortTitle: "Ransomware",
    type: "Extortion and service disruption",
    sourceType: "Endpoint and backup alerts",
    severity: "Critical",
    tone: "danger",
    phase: "Containment and executive decision",
    owner: "Technical lead",
    detectedAt: "01:36 UTC",
    deadline: "24h",
    summary:
      "Multiple endpoints show encryption behavior while the attacker claims data exfiltration through an external mailbox.",
    suspectedScope:
      "Endpoint fleet, file shares, backup restore points, executive escalation notes, and possible leak-site evidence.",
    affectedSystems: ["Endpoint fleet", "File shares", "Backup platform"],
    dataCategories: ["employee files", "business documents", "system telemetry"],
    legalFocus:
      "Separate operational outage decisions from legal conclusions about confirmed exfiltration or materiality.",
    technicalFinding:
      "Network isolation is active; restore validation is running; exfiltration claim is unverified.",
    communicationsBlocker:
      "External statements cannot imply confirmed exfiltration until evidence supports it.",
    decisionQuestion: "Do we escalate to executives for an outage update before exfiltration is confirmed?",
    riskOfApproving:
      "The update may be interpreted as confirmation of data theft before forensic evidence is available.",
    riskOfWaiting:
      "Delayed executive alignment can slow containment, customer support, and business continuity decisions.",
  },
  {
    id: "health-privacy-review",
    sandboxId: "health-privacy",
    title: "Health privacy exposure review",
    shortTitle: "Health privacy",
    type: "Healthcare data workflow",
    sourceType: "Application access anomaly",
    severity: "High",
    tone: "review",
    phase: "Privacy and technical validation",
    owner: "Privacy reviewer",
    detectedAt: "13:22 UTC",
    deadline: "60d",
    summary:
      "A healthcare workflow shows unusual report access by a service account during a vendor maintenance window.",
    suspectedScope:
      "Care reports, account identifiers, vendor access logs, support tickets, and clinical workflow metadata.",
    affectedSystems: ["Care reporting app", "Vendor access portal", "Audit log pipeline"],
    dataCategories: ["health information candidate", "account identifiers", "vendor access logs"],
    legalFocus:
      "Evaluate privacy obligations while keeping patient data and identifiers out of model context.",
    technicalFinding:
      "Access was time-bounded; report export status is unknown and requires audit-log correlation.",
    communicationsBlocker:
      "Patient or regulator language is blocked until privacy reviewer and Technical both confirm scope.",
    decisionQuestion: "Do we notify the privacy officer and executive owner before export status is known?",
    riskOfApproving:
      "Early notification may create confusion if the event is later confirmed as authorized maintenance.",
    riskOfWaiting:
      "Waiting may reduce time available for privacy review, containment, and stakeholder preparation.",
  },
  {
    id: "product-recall-safety",
    sandboxId: "product-supply-chain",
    title: "Product recall safety review",
    shortTitle: "Product safety",
    type: "Public-risk product incident",
    sourceType: "Support spike and safety ticket",
    severity: "High",
    tone: "risk",
    phase: "Evidence gathering",
    owner: "Operations owner",
    detectedAt: "16:05 UTC",
    deadline: "36h",
    summary:
      "Support and field teams report a repeatable product failure pattern that may require customer instructions or recall review.",
    suspectedScope:
      "Manufacturing batch, support cases, field reports, supplier quality data, and public customer guidance.",
    affectedSystems: ["Support queue", "Quality management system", "Supplier portal"],
    dataCategories: ["customer reports", "supplier quality data", "product batch metadata"],
    legalFocus:
      "Determine reporting, recall, and customer-warning obligations without overstating causality.",
    technicalFinding:
      "Failure pattern is reproducible in a subset of synthetic batch records; root cause is not final.",
    communicationsBlocker:
      "Public instructions are blocked until Legal and Operations approve the safety language.",
    decisionQuestion: "Do we issue a precautionary customer instruction while root cause remains open?",
    riskOfApproving:
      "A precautionary instruction may trigger recall expectations before causality is final.",
    riskOfWaiting:
      "Waiting may increase public-risk exposure if the failure pattern is confirmed.",
  },
  {
    id: "payment-data-exposure",
    sandboxId: "finance-payments",
    title: "Payment data exposure",
    shortTitle: "Payment exposure",
    type: "Payment and personal-data incident",
    sourceType: "Payment processor alert",
    severity: "Critical",
    tone: "danger",
    phase: "Disclosure review",
    owner: "Legal reviewer",
    detectedAt: "02:47 UTC",
    deadline: "72h",
    summary:
      "Unauthorized access was detected in a payment environment with a synthetic card-record exposure estimate.",
    suspectedScope:
      "Payment records, account identifiers, transaction metadata, service logs, and customer notice language.",
    affectedSystems: ["Payment gateway", "Transaction log service", "Customer notification workflow"],
    dataCategories: ["payment-card data candidate", "personal-data candidate", "transaction metadata"],
    legalFocus:
      "Evaluate regulator, customer, and payment-card notification obligations from confirmed facts only.",
    technicalFinding:
      "Containment is positive; final affected-record count remains under technical review.",
    communicationsBlocker:
      "Customer notice is blocked until Legal and Technical confirm scope and wording.",
    decisionQuestion: "Do we prepare proactive customer notification before final record count is confirmed?",
    riskOfApproving:
      "Customer language may overstate the affected-record count before Technical finalizes scope.",
    riskOfWaiting:
      "Delayed notification could compress legal review time and weaken stakeholder trust.",
  },
];

function getIncidentSummary(incident: IncidentScenario): IncidentSummary {
  return {
    id: incident.id,
    sandboxId: incident.sandboxId,
    title: incident.title,
    shortTitle: incident.shortTitle,
    type: incident.type,
    severity: incident.severity,
    tone: incident.tone,
    phase: incident.phase,
    owner: incident.owner,
    deadline: incident.deadline,
    summary: incident.summary,
  };
}

export function getIncidentById(incidentId = defaultIncidentId) {
  return seededIncidents.find((incident) => incident.id === incidentId) ?? seededIncidents[0];
}

export function getSandboxProfile(sandboxId: SandboxId) {
  return sandboxProfiles.find((sandbox) => sandbox.id === sandboxId) ?? sandboxProfiles[0];
}

export function getIncidentsBySandbox(sandboxId: SandboxId) {
  return seededIncidents.filter((incident) => incident.sandboxId === sandboxId);
}

export function getIncidentCommandHref(incidentId = defaultIncidentId) {
  return `/incidents/${incidentId}`;
}

export function getIncidentCommunicationsHref(incidentId = defaultIncidentId) {
  return `/incidents/${incidentId}/communications`;
}

export function getIncidentAuditHref(incidentId = defaultIncidentId) {
  return `/incidents/${incidentId}/audit`;
}

export function getIncidentIdFromPath(pathname: string) {
  const match = pathname.match(/^\/incidents\/([^/]+)/);
  if (!match || match[1] === "payment-breach") return null;
  return match[1];
}

export function isLegacyIncidentPath(pathname: string) {
  return pathname.includes("/incidents/payment-breach");
}

const commonStatus = (incident: IncidentScenario): FeedItem[] => [
  {
    title: "Band room active",
    detail: "Shared incident room is receiving structured agent posts for this selected incident.",
    meta: `source: ${incident.sourceType}`,
    tone: "info",
  },
  {
    title: "Synthetic mode enforced",
    detail: "No real customer, patient, payment, legal, security, or private incident data is loaded.",
    meta: "policy: demo-safe",
    tone: "success",
  },
  {
    title: "Human review required",
    detail: "External communications remain draft-only until an owner approves.",
    meta: `owner: ${incident.owner}`,
    tone: "review",
  },
];

function commonMetrics(incident: IncidentScenario): Record<string, Metric> {
  return {
    band: {
      label: "Band handoffs",
      value: "12",
      detail: "5 agent posts verified",
      tone: "info",
    },
    decisions: {
      label: "Human decisions",
      value: "3",
      detail: "1 urgent owner needed",
      tone: "review",
    },
    evidence: {
      label: "Evidence packets",
      value: "9",
      detail: "synthetic and redacted",
      tone: "success",
    },
    deadline: {
      label: "Next deadline",
      value: incident.deadline,
      detail: "draft review window",
      tone: "warning",
    },
  };
}

function agentCards(incident: IncidentScenario): DetailCard[] {
  return [
    {
      title: "Assessment",
      body: `Classified ${incident.shortTitle.toLowerCase()} as a ${incident.severity.toLowerCase()} ${incident.type.toLowerCase()} and posted normalized context.`,
      meta: "complete",
      tone: "success",
    },
    {
      title: "Legal & Regulatory",
      body: incident.legalFocus,
      meta: "needs review",
      tone: "review",
    },
    {
      title: "Technical Forensics",
      body: incident.technicalFinding,
      meta: "running",
      tone: "brand",
    },
    {
      title: "Stakeholder Communications",
      body: incident.communicationsBlocker,
      meta: "blocked",
      tone: "warning",
    },
    {
      title: "Escalation & Decision",
      body: `Routes unresolved approval for "${incident.decisionQuestion}" to ${incident.owner}.`,
      meta: "human owner",
      tone: "review",
    },
  ];
}

function signalFeed(incident: IncidentScenario): FeedItem[] {
  return [
    {
      title: incident.title,
      detail: incident.summary,
      meta: incident.sourceType,
      tone: incident.tone,
    },
    ...seededIncidents
      .filter((candidate) => candidate.id !== incident.id)
      .slice(0, 2)
      .map((candidate) => ({
        title: candidate.title,
        detail: candidate.summary,
        meta: candidate.sourceType,
        tone: candidate.tone,
      })),
  ];
}

function incidentQueue(incident: IncidentScenario): FeedItem[] {
  return seededIncidents.map((candidate) => ({
    title: candidate.id === incident.id ? `${candidate.title} (active)` : candidate.title,
    detail: `${candidate.severity}, ${candidate.phase}. ${candidate.summary}`,
    meta: `owner: ${candidate.owner}`,
    tone: candidate.tone,
  }));
}

function createWorkspacePages(incident: IncidentScenario): WorkspacePage[] {
  const metrics = commonMetrics(incident);
  const status = commonStatus(incident);
  const agents = agentCards(incident);
  const commandHref = getIncidentCommandHref(incident.id);
  const communicationsHref = getIncidentCommunicationsHref(incident.id);
  const auditHref = getIncidentAuditHref(incident.id);

  return [
    {
      id: "signals",
      href: "/signals",
      navLabel: "Signal Intake",
      title: "Signal Intake And Sandbox Launcher",
      subtitle:
        "Start a crisis room from a sanitized signal, seeded sandbox, or manual tabletop scenario.",
      routeLabel: "Signal intake",
      activeBadge: "Multi-scenario input",
      tone: "brand",
      tabs: [
        {
          name: "Signals",
          eyebrow: "incoming source queue",
          title: "Review a crisis signal before room creation",
          summary:
            "Signals are structured packets from alerts, vendor notices, support escalations, legal reports, safety tickets, or privacy reviews.",
          metrics: [
            { label: "Signals", value: String(seededIncidents.length), detail: "ready for sandbox", tone: "brand" },
            { label: "Incident types", value: "5", detail: "no single-issue assumption", tone: "success" },
            metrics.evidence,
            metrics.band,
          ],
          feedTitle: "Signal source feed",
          feed: signalFeed(incident),
          mainTitle: "Selected signal packet",
          mainSummary: `${incident.summary} The selected packet covers ${incident.suspectedScope.toLowerCase()}`,
          cards: [
            {
              title: "Data categories",
              body: incident.dataCategories.join(", "),
              meta: "suspected",
              tone: "warning",
            },
            {
              title: "Expected response",
              body: "Assessment starts first. Legal and Technical run in parallel. Communications waits for verified findings.",
              meta: "agent order",
              tone: "info",
            },
          ],
          actionTitle: "Launch review",
          actionSummary: "Validate redaction and start the command room for the selected incident.",
          actions: [
            { label: "Review signal", tone: "brand" },
            { label: "Launch room", tone: "success", kind: "navigate-command" },
          ],
          status,
        },
        {
          name: "Scenarios",
          eyebrow: "sandbox selector",
          title: "Choose a global regulated-workflow demo scenario",
          summary:
            "The sandbox gives the team repeatable paths without connecting real enterprise systems or using private data.",
          metrics: [
            { label: "Scenario families", value: "5", detail: "security, privacy, product, vendor, finance", tone: "brand" },
            { label: "Seeded facts", value: "64", detail: "all synthetic", tone: "success" },
            metrics.decisions,
            metrics.deadline,
          ],
          feedTitle: "Sandbox options",
          feed: incidentQueue(incident),
          mainTitle: "Scenario outcome preview",
          mainSummary:
            "Each scenario creates a Band room, seeded agent findings, decision requests, draft communications, and audit events.",
          cards: [
            {
              title: "Reusable workflow",
              body: "The same five-agent chain handles vendor, ransomware, privacy, product safety, and payment incidents.",
              meta: "core fix",
              tone: "success",
            },
            {
              title: "Safe fallback",
              body: "If a provider is unavailable, the app can use seeded fallback outputs while still showing handoff and audit behavior.",
              meta: "demo resilience",
              tone: "info",
            },
          ],
          actionTitle: "Scenario controls",
          actionSummary: "Load a scenario or open the active command room.",
          actions: [
            { label: "Launch room", tone: "success", kind: "navigate-command" },
            { label: "Open registry", tone: "muted" },
          ],
          status,
        },
        {
          name: "Redaction",
          eyebrow: "safe input gate",
          title: "Block private data before any agent sees it",
          summary:
            "The intake gate withholds sensitive fields, replaces identifiers, and records which fields are unsafe for model context.",
          metrics: [
            { label: "Allowed fields", value: "18", detail: "safe for agents", tone: "success" },
            { label: "Blocked fields", value: "7", detail: "private or unknown", tone: "warning" },
            { label: "Prompt packets", value: "5", detail: "agent-scoped", tone: "info" },
            metrics.evidence,
          ],
          feedTitle: "Redaction checks",
          feed: [
            {
              title: "Private identifiers withheld",
              detail: "Names, raw credentials, full records, secrets, and exact customer identities stay out of prompts.",
              meta: "blocked",
              tone: "warning",
            },
            {
              title: "Synthetic labels applied",
              detail: "Counts, systems, jurisdictions, and roles are demo-safe placeholders.",
              meta: "allowed",
              tone: "success",
            },
          ],
          mainTitle: "Safe prompt packet",
          mainSummary:
            "Agents receive only the crisis type, suspected scope, affected systems, timing, known unknowns, and source references.",
          cards: [
            {
              title: "What agents can use",
              body: "Severity, time window, synthetic scope, service category, confidence labels, and source trace IDs.",
              meta: "safe",
              tone: "success",
            },
            {
              title: "What agents cannot use",
              body: "Raw credentials, private account details, exact customer identities, patient identifiers, or unredacted logs.",
              meta: "blocked",
              tone: "danger",
            },
          ],
          actionTitle: "Validation result",
          actionSummary: "The packet is safe to launch after all blocked fields are excluded.",
          actions: [
            { label: "Validate packet", tone: "brand" },
            { label: "Launch room", tone: "success", kind: "navigate-command" },
          ],
          status,
        },
        {
          name: "Launch Review",
          eyebrow: "room creation checklist",
          title: "Confirm agents, facts, and human owner before launch",
          summary:
            "The launch review shows exactly what will be created in the command room for the selected incident.",
          metrics: [
            { label: "Agents queued", value: "5", detail: "dependency order ready", tone: "brand" },
            { label: "Owner", value: incident.owner.split(" ")[0], detail: incident.owner, tone: "review" },
            metrics.deadline,
            metrics.evidence,
          ],
          feedTitle: "Launch checklist",
          feed: [
            { title: "Band room", detail: "Create shared room and first context post.", meta: "ready", tone: "success" },
            { title: "Agent sequence", detail: "Assessment, Legal, Technical, Communications, Escalation.", meta: "ready", tone: "brand" },
            { title: "Human owner", detail: `${incident.owner} owns approval and escalation review.`, meta: "required", tone: "review" },
          ],
          mainTitle: "Room launch package",
          mainSummary:
            "Creates a crisis room with the signal packet, dependency gates, synthetic evidence references, and first decision request.",
          cards: agents.slice(0, 3),
          actionTitle: "Ready to launch",
          actionSummary: "Create the command room and move into the live crisis workflow.",
          actions: [{ label: "Launch command room", tone: "success", kind: "navigate-command" }],
          status,
        },
      ],
    },
    {
      id: "incidents",
      href: "/incidents",
      navLabel: "Incident Registry",
      title: "Incident Registry",
      subtitle: "Triage active, demo, resolved, and deadline-sensitive crisis rooms.",
      routeLabel: "Incident registry",
      activeBadge: `${seededIncidents.length} scenarios`,
      tone: "brand",
      tabs: [
        {
          name: "Queue",
          eyebrow: "incident list",
          title: "Open the room that needs attention",
          summary:
            "The registry stays lean: severity, phase, decision status, deadline, owner, and open action.",
          metrics: [
            { label: "Active", value: String(seededIncidents.length), detail: "seeded scenarios", tone: "brand" },
            { label: "Critical", value: "2", detail: "ransomware and payment", tone: "danger" },
            metrics.decisions,
            metrics.deadline,
          ],
          feedTitle: "Incident queue",
          feed: incidentQueue(incident),
          mainTitle: "Selected incident snapshot",
          mainSummary:
            `${incident.title} is selected. Communications remain blocked until Legal and Technical findings are complete.`,
          cards: [
            { title: "Phase", body: incident.phase, meta: "active", tone: "brand" },
            { title: "Decision state", body: incident.decisionQuestion, meta: "human review", tone: "review" },
          ],
          actionTitle: "Open room",
          actionSummary: "Continue the selected incident in the command room.",
          actions: [{ label: "Open command room", tone: "brand", kind: "navigate-command" }],
          status,
        },
        {
          name: "Details",
          eyebrow: "incident facts",
          title: "Review severity, phase, and data categories",
          summary:
            "Details give enough context to choose the correct room without duplicating the command surface.",
          metrics: [
            { label: "Severity", value: incident.severity, detail: incident.type, tone: incident.tone },
            { label: "Phase", value: "Review", detail: incident.phase, tone: "review" },
            metrics.evidence,
            metrics.band,
          ],
          feedTitle: "Fact summary",
          feed: signalFeed(incident),
          mainTitle: "Incident detail",
          mainSummary: incident.suspectedScope,
          cards: agents.slice(0, 4),
          actionTitle: "Continue workflow",
          actionSummary: "Open the command room or jump directly to audit if evidence needs review.",
          actions: [
            { label: "Open room", tone: "brand", kind: "navigate-command" },
            { label: "Open audit", tone: "muted", kind: "navigate-audit" },
          ],
          status,
        },
        {
          name: "Owners",
          eyebrow: "responsibility map",
          title: "Know who owns the next decision",
          summary:
            "Ownership is explicit across incident command, legal, technical, communications, executive, and audit review.",
          metrics: [
            { label: "Owners", value: "6", detail: "role-based", tone: "brand" },
            { label: "Acknowledged", value: "4", detail: "2 pending", tone: "warning" },
            metrics.decisions,
            { label: "Escalations", value: "1", detail: "backup owner ready", tone: "review" },
          ],
          feedTitle: "Owner queue",
          feed: [
            { title: "Incident commander", detail: "Owns room state and escalation ladder.", meta: "acknowledged", tone: "success" },
            { title: incident.owner, detail: "Owns the next high-risk decision.", meta: "pending", tone: "review" },
            { title: "Communications lead", detail: "Owns approved audience package and delivery status.", meta: "waiting", tone: "warning" },
          ],
          mainTitle: "Acknowledgement ladder",
          mainSummary:
            "If a primary owner does not acknowledge, CrisisCoord records the attempt and escalates to the configured backup owner.",
          cards: [
            { title: "Primary owner", body: `${incident.owner} receives in-app and Band notification first.`, meta: "pending", tone: "review" },
            { title: "Backup owner", body: "Executive approver receives follow-up if the timer expires.", meta: "standby", tone: "warning" },
          ],
          actionTitle: "Notify owner",
          actionSummary: "Open the command room messaging tab with the owner selected.",
          actions: [{ label: "Message owner", tone: "review", kind: "tab-messaging" }],
          status,
        },
        {
          name: "Deadlines",
          eyebrow: "clock view",
          title: "Track disclosure and review clocks",
          summary:
            "Deadlines are shown as operating windows and draft guidance, not final legal advice.",
          metrics: [
            metrics.deadline,
            { label: "Drafts blocked", value: "2", detail: "missing facts", tone: "warning" },
            { label: "Review owners", value: "3", detail: "legal, technical, executive", tone: "review" },
            metrics.evidence,
          ],
          feedTitle: "Deadline ledger",
          feed: [
            { title: "Regulator or stakeholder draft", detail: "Clock starts from confirmed awareness and applicable obligation review.", meta: "draft guidance", tone: "warning" },
            { title: "External-notification decision", detail: incident.decisionQuestion, meta: "human decision", tone: "review" },
          ],
          mainTitle: "Deadline dependencies",
          mainSummary:
            "Obligations depend on confirmed scope, jurisdictions, affected categories, containment status, and owner approval.",
          cards: [
            { title: "Missing fact", body: incident.communicationsBlocker, meta: "blocking", tone: "warning" },
            { title: "Audit note", body: "All deadline assumptions are preserved with timestamps and owner decisions.", meta: "traceable", tone: "info" },
          ],
          actionTitle: "Deadline action",
          actionSummary: "Open decisions or command room depending on what is blocking progress.",
          actions: [
            { label: "Open decision desk", tone: "review", kind: "tab-escalations" },
            { label: "Open room", tone: "brand", kind: "navigate-command" },
          ],
          status,
        },
      ],
    },
    {
      id: "command",
      href: commandHref,
      navLabel: "Command Room",
      title: "Crisis Command Room",
      subtitle:
        "The primary workspace for Band handoffs, agent state, human decisions, and safe communications.",
      routeLabel: "Command room",
      activeBadge: incident.shortTitle,
      tone: "review",
      tabs: [
        {
          name: "Overview",
          eyebrow: "live room",
          title: `${incident.title} command room`,
          summary:
            "Assessment has posted context. Legal and Technical work from the same Band room. Communications remains gated until required facts exist.",
          metrics: [metrics.band, metrics.decisions, metrics.evidence, metrics.deadline],
          feedTitle: "Band timeline",
          feed: [
            { title: "Assessment posted normalized context", detail: incident.summary, meta: incident.detectedAt, tone: "success" },
            { title: "Legal posted obligation draft", detail: incident.legalFocus, meta: "review state", tone: "review" },
            { title: "Technical scope update", detail: incident.technicalFinding, meta: "technical state", tone: "brand" },
          ],
          mainTitle: "Agent handoff map",
          mainSummary:
            "Band is the shared room state. Each agent reads prior posts before producing findings, drafts, or decisions.",
          cards: agents,
          actionTitle: "Active human decision",
          actionSummary: incident.decisionQuestion,
          actions: [
            { label: "Open messaging", tone: "brand", kind: "tab-messaging" },
            { label: "Open decisions", tone: "review", kind: "tab-escalations" },
            { label: "Open email draft", tone: "warning", kind: "tab-email" },
          ],
          status,
        },
        {
          name: "Agents",
          eyebrow: "agent details",
          title: "Inspect the five-agent collaboration chain",
          summary:
            "Each agent shows input, output, status, confidence, unknowns, Band reference, and next dependency.",
          metrics: [
            { label: "Complete", value: "2", detail: "assessment and legal draft", tone: "success" },
            { label: "Running", value: "1", detail: "technical forensics", tone: "brand" },
            { label: "Blocked", value: "1", detail: "communications", tone: "warning" },
            metrics.decisions,
          ],
          feedTitle: "Agent run ledger",
          feed: agents.map((agent) => ({ title: agent.title, detail: agent.body, meta: agent.meta, tone: agent.tone })),
          mainTitle: "Agent dependency view",
          mainSummary:
            "Communications can only draft from verified Legal and Technical outputs. Escalation reads the full room and routes human decisions.",
          cards: agents,
          actionTitle: "Agent action",
          actionSummary: "Open audit for model/provider metadata or message an owner for missing evidence.",
          actions: [
            { label: "Open audit", tone: "brand", kind: "navigate-audit" },
            { label: "Message owner", tone: "review", kind: "tab-messaging" },
          ],
          status,
        },
        {
          name: "Messaging",
          eyebrow: "owner notification center",
          title: "Message humans from inside the incident room",
          summary:
            "Notifications start as CrisisCoord records. External channels are adapters, while the in-app thread remains the source of truth.",
          metrics: [
            { label: "Threads", value: "4", detail: "owner, legal, technical, executive", tone: "brand" },
            { label: "Unacked", value: "2", detail: "timer active", tone: "warning" },
            { label: "Queued", value: "3", detail: "Band and email adapters", tone: "info" },
            metrics.decisions,
          ],
          feedTitle: "Thread queue",
          feed: [
            { title: incident.owner, detail: incident.decisionQuestion, meta: "in-app and Band", tone: "review" },
            { title: "Legal reviewer", detail: "Draft language needs final review before unlock.", meta: "email test available", tone: "warning" },
            { title: "Technical lead", detail: "Scope confirmation request is active.", meta: "acknowledged", tone: "success" },
          ],
          mainTitle: "Selected message thread",
          mainSummary:
            "Owner, evidence request, acknowledgement timer, channel attempts, and escalation level stay visible in one work area.",
          cards: [
            { title: "Draft message", body: `Please review: ${incident.decisionQuestion} Evidence and risks are attached.`, meta: "requires approval", tone: "review" },
            { title: "Delivery options", body: "In-app, Band mention, safe test email, and SMS simulation are available for configured recipients only.", meta: "safe mode", tone: "info" },
          ],
          actionTitle: "Message actions",
          actionSummary: "Send a safe test, escalate, or open the Communications Review composer.",
          actions: [
            { label: "Open email", tone: "brand", kind: "tab-email" },
            { label: "Escalate", tone: "review", kind: "tab-escalations" },
          ],
          status,
        },
        {
          name: "Decisions",
          eyebrow: "human-in-the-loop",
          title: "Resolve what automation should not decide",
          summary:
            "AI can draft, summarize, and route. Humans approve external communications, legal language, customer strategy, and escalation decisions.",
          metrics: [
            { label: "Pending", value: "3", detail: "1 urgent", tone: "review" },
            { label: "Risk of waiting", value: "High", detail: "deadline pressure", tone: "warning" },
            { label: "Risk of approving", value: "Medium", detail: "scope uncertainty", tone: "risk" },
            metrics.evidence,
          ],
          feedTitle: "Decision queue",
          feed: [
            { title: incident.decisionQuestion, detail: "Owner must approve strategy before external-facing draft is queued.", meta: "urgent", tone: "review" },
            { title: "Final language approved?", detail: "Legal reviewer must approve exact wording.", meta: "legal review", tone: "warning" },
          ],
          mainTitle: "Decision detail",
          mainSummary:
            "The decision card compares risk of approving, risk of waiting, required facts, and escalation owner.",
          cards: [
            { title: "Risk of approving", body: incident.riskOfApproving, meta: "medium", tone: "risk" },
            { title: "Risk of waiting", body: incident.riskOfWaiting, meta: "high", tone: "warning" },
          ],
          actionTitle: "Decision actions",
          actionSummary: "Approve, request more facts, or escalate to backup owner.",
          actions: [
            { label: "Request facts", tone: "brand", kind: "tab-evidence" },
            { label: "Escalate", tone: "review", kind: "tab-escalations" },
          ],
          status,
        },
      ],
    },
    {
      id: "communications",
      href: communicationsHref,
      navLabel: "Communications",
      title: "Communications Review",
      subtitle: "Draft, review, test, queue, and audit outbound communications from verified facts.",
      routeLabel: "Communications review",
      activeBadge: "Drafts gated",
      tone: "warning",
      tabs: [
        {
          name: "Drafts",
          eyebrow: "draft queue",
          title: "Review generated drafts against verified facts",
          summary:
            "Drafts show facts used, missing facts, warnings, owner, and approval state before any send action appears.",
          metrics: [
            { label: "Drafts", value: "4", detail: "regulator, customer, executive, support", tone: "brand" },
            { label: "Needs review", value: "3", detail: "human approval", tone: "review" },
            { label: "Missing facts", value: "2", detail: "technical scope", tone: "warning" },
            metrics.evidence,
          ],
          feedTitle: "Draft queue",
          feed: [
            { title: "Regulator or stakeholder notice", detail: `Uses ${incident.legalFocus.toLowerCase()}`, meta: "needs review", tone: "review" },
            { title: "External audience notice", detail: incident.communicationsBlocker, meta: "blocked", tone: "warning" },
          ],
          mainTitle: "Draft review panel",
          mainSummary:
            "Every draft displays facts used, missing facts, legal warnings, and the approval or revision action.",
          cards: [
            { title: "Facts used", body: `${incident.detectedAt}, ${incident.affectedSystems.join(", ")}, ${incident.technicalFinding}`, meta: "source linked", tone: "success" },
            { title: "Missing facts", body: incident.communicationsBlocker, meta: "blockers", tone: "warning" },
          ],
          actionTitle: "Draft actions",
          actionSummary: "Open Email or SMS tab with the selected draft loaded.",
          actions: [
            { label: "Open email", tone: "brand", kind: "tab-email" },
            { label: "Open SMS", tone: "warning", kind: "tab-sms" },
          ],
          status,
        },
        {
          name: "Email",
          eyebrow: "safe email composer",
          title: "Prepare a safe test email package",
          summary:
            "Email stays inside CrisisCoord. The composer shows allowlist, subject, body, facts used, missing facts, provider status, and simulated/live mode.",
          metrics: [
            { label: "Recipients", value: "3", detail: "safe allowlist", tone: "success" },
            { label: "Provider", value: "Ready", detail: "SMTP/Resend placeholder", tone: "brand" },
            { label: "Warnings", value: "2", detail: "legal and scope", tone: "warning" },
            metrics.decisions,
          ],
          feedTitle: "Email thread",
          feed: [
            { title: "Reviewer", detail: "Safe test recipient selected; external send disabled in MVP.", meta: "allowlisted", tone: "success" },
            { title: "Executive owner", detail: "Approval reminder can be sent as a safe internal email.", meta: "internal", tone: "review" },
          ],
          mainTitle: "Email composer",
          mainSummary:
            "Subject, body, source facts, missing facts, and warnings are visible before queueing a simulated send package.",
          cards: [
            { title: "Subject", body: `Draft notice for ${incident.title}.`, meta: "editable", tone: "brand" },
            { title: "Provider status", body: "Test mode only. External production sending is disabled until credentials and approvals exist.", meta: "safe", tone: "success" },
          ],
          actionTitle: "Email actions",
          actionSummary: "Send a safe test or queue the simulated package for audit review.",
          actions: [
            { label: "Send test", tone: "brand" },
            { label: "Queue package", tone: "success", kind: "tab-delivery" },
          ],
          status,
        },
        {
          name: "SMS",
          eyebrow: "urgent owner channel",
          title: "Prepare a safe SMS escalation",
          summary:
            "SMS is for internal owner acknowledgement and escalation. External audience SMS remains disabled for MVP.",
          metrics: [
            { label: "Recipients", value: "2", detail: "owner ladder", tone: "review" },
            { label: "Template", value: "1", detail: "approval request", tone: "brand" },
            { label: "Segments", value: "1", detail: "safe length", tone: "success" },
            { label: "Mode", value: "Sim", detail: "no live external send", tone: "warning" },
          ],
          feedTitle: "SMS queue",
          feed: [
            { title: incident.owner, detail: "Approval reminder prepared for primary owner.", meta: "safe recipient", tone: "review" },
            { title: "Backup owner", detail: "Escalation fallback if acknowledgement timer expires.", meta: "standby", tone: "warning" },
          ],
          mainTitle: "SMS composer",
          mainSummary:
            "The SMS tab shows recipient, template preview, acknowledgement timer, and simulated delivery result.",
          cards: [
            { title: "Message preview", body: `${incident.shortTitle} needs approval: ${incident.decisionQuestion} Open CrisisCoord Decision Desk.`, meta: "template", tone: "brand" },
            { title: "Channel rule", body: "SMS is only for internal owner escalation in this MVP.", meta: "policy", tone: "warning" },
          ],
          actionTitle: "SMS actions",
          actionSummary: "Send simulated test or escalate through the owner ladder.",
          actions: [
            { label: "Simulate SMS", tone: "brand" },
            { label: "Escalate", tone: "review", kind: "tab-escalations" },
          ],
          status,
        },
        {
          name: "Delivery Log",
          eyebrow: "attempt ledger",
          title: "Prove what was queued, sent, failed, or acknowledged",
          summary:
            "Delivery status stays tied to the draft, owner, provider, channel, and audit event.",
          metrics: [
            { label: "Queued", value: "3", detail: "simulated packages", tone: "brand" },
            { label: "Acknowledged", value: "1", detail: "technical owner", tone: "success" },
            { label: "Timed out", value: "1", detail: "escalation ready", tone: "warning" },
            metrics.evidence,
          ],
          feedTitle: "Delivery attempts",
          feed: [
            { title: "Band room post", detail: "Legal finding linked and visible in the command room timeline.", meta: "delivered", tone: "success" },
            { title: "Email test package", detail: "Draft package queued in simulated mode.", meta: "queued", tone: "brand" },
            { title: "Owner SMS reminder", detail: "Primary owner did not acknowledge before timer threshold.", meta: "timed out", tone: "warning" },
          ],
          mainTitle: "Delivery status detail",
          mainSummary:
            "Each attempt carries channel, provider, draft ID, owner, result, timestamp, and audit reference.",
          cards: [
            { title: "Provider metadata", body: "Adapter, mode, message ID, status code, and fallback path are retained for audit.", meta: "traceable", tone: "info" },
            { title: "Human acknowledgement", body: "Approvals and acknowledgement states are separate from delivery success.", meta: "owner state", tone: "review" },
          ],
          actionTitle: "Delivery actions",
          actionSummary: "Open audit export or return to command room messaging.",
          actions: [
            { label: "Open audit", tone: "brand", kind: "navigate-audit" },
            { label: "Open messaging", tone: "review", kind: "tab-messaging" },
          ],
          status,
        },
      ],
    },
    {
      id: "decisions",
      href: "/decisions",
      navLabel: "Decision Desk",
      title: "Decision Desk",
      subtitle: "Mobile-first human approvals with risk of approving, waiting, requesting facts, or escalating.",
      routeLabel: "Decision desk",
      activeBadge: "3 pending",
      tone: "review",
      tabs: [
        {
          name: "Pending",
          eyebrow: "approval queue",
          title: "Approve, wait, request facts, or escalate",
          summary:
            "The desk is built for fast human work: decision, owner, risk, evidence, and action in one place.",
          metrics: [
            { label: "Pending", value: "3", detail: "1 urgent", tone: "review" },
            { label: "Urgent", value: "1", detail: incident.shortTitle, tone: "warning" },
            { label: "Owners", value: "3", detail: "role-based", tone: "brand" },
            metrics.deadline,
          ],
          feedTitle: "Pending decisions",
          feed: [
            { title: incident.decisionQuestion, detail: "External strategy needs owner decision.", meta: "urgent", tone: "review" },
            { title: "Pause affected workflow?", detail: "Technical recommends targeted containment while evidence is reviewed.", meta: "technical review", tone: "warning" },
            { title: "Notify secondary stakeholder?", detail: "Legal needs final scope facts.", meta: "needs facts", tone: "brand" },
          ],
          mainTitle: "Decision card",
          mainSummary:
            "The active decision includes risk of approving, risk of waiting, missing facts, owner, timer, and escalation path.",
          cards: [
            { title: "Risk of approving", body: incident.riskOfApproving, meta: "medium", tone: "risk" },
            { title: "Risk of waiting", body: incident.riskOfWaiting, meta: "high", tone: "warning" },
          ],
          actionTitle: "Decision actions",
          actionSummary: "Acknowledge, approve, request more facts, or escalate.",
          actions: [
            { label: "Request facts", tone: "brand", kind: "tab-evidence" },
            { label: "Escalate", tone: "review", kind: "tab-escalations" },
          ],
          status,
        },
        {
          name: "Evidence Needed",
          eyebrow: "fact request queue",
          title: "Ask the right owner for missing facts",
          summary:
            "Evidence requests become structured messages with owner, due time, source reference, and audit event.",
          metrics: [
            { label: "Requests", value: "4", detail: "2 technical, 2 legal", tone: "brand" },
            { label: "Blocking", value: "2", detail: "draft unlock", tone: "warning" },
            { label: "Satisfied", value: "6", detail: "since launch", tone: "success" },
            metrics.band,
          ],
          feedTitle: "Evidence request queue",
          feed: [
            { title: "Final affected scope", detail: incident.communicationsBlocker, meta: "blocking", tone: "warning" },
            { title: "Jurisdiction or audience confirmation", detail: "Legal needs final routing for stakeholder drafts.", meta: "needs review", tone: "review" },
          ],
          mainTitle: "Evidence request composer",
          mainSummary:
            "The selected request preloads owner, requested fact, due time, channel, and escalation behavior.",
          cards: [
            { title: "Message to Technical", body: `Please confirm final affected scope and confidence score for ${incident.title}.`, meta: "ready", tone: "brand" },
            { title: "Audit record", body: "Request will be recorded with Band reference and owner acknowledgement state.", meta: "traceable", tone: "info" },
          ],
          actionTitle: "Evidence actions",
          actionSummary: "Send internal request or open the command-room messaging tab.",
          actions: [
            { label: "Open messaging", tone: "brand", kind: "tab-messaging" },
            { label: "Open audit", tone: "muted", kind: "navigate-audit" },
          ],
          status,
        },
        {
          name: "Escalations",
          eyebrow: "owner ladder",
          title: "Escalate when the primary owner does not respond",
          summary:
            "Escalations show who was notified, what channel was used, what timed out, and who receives the next attempt.",
          metrics: [
            { label: "Escalated", value: "1", detail: "backup owner", tone: "review" },
            { label: "Timed out", value: "1", detail: "primary owner", tone: "warning" },
            { label: "Acked", value: "4", detail: "current incident", tone: "success" },
            metrics.decisions,
          ],
          feedTitle: "Escalation ladder",
          feed: [
            { title: "Primary reviewer", detail: "Notified in-app and Band; acknowledgement timer expired.", meta: "timed out", tone: "warning" },
            { title: "Backup approver", detail: "Receives escalation with evidence packet and decision summary.", meta: "next", tone: "review" },
          ],
          mainTitle: "Escalation detail",
          mainSummary:
            "The app explains why escalation happened and preserves the notification attempts for audit.",
          cards: [
            { title: "Why escalation happened", body: `${incident.decisionQuestion} remained unacknowledged while deadline pressure increased.`, meta: "policy", tone: "warning" },
            { title: "Next owner", body: "Executive approver receives the decision package and risk summary.", meta: "backup owner", tone: "review" },
          ],
          actionTitle: "Escalation actions",
          actionSummary: "Notify backup owner or open the communication package.",
          actions: [
            { label: "Notify backup", tone: "review" },
            { label: "Open email", tone: "brand", kind: "tab-email" },
          ],
          status,
        },
        {
          name: "Resolved",
          eyebrow: "decision history",
          title: "Review completed approvals and rejected paths",
          summary:
            "Resolved decisions stay searchable for audit and retrospective review.",
          metrics: [
            { label: "Resolved", value: "8", detail: "this demo run", tone: "success" },
            { label: "Rejected", value: "1", detail: "unsafe language", tone: "risk" },
            { label: "Revisions", value: "3", detail: "draft edits", tone: "brand" },
            metrics.evidence,
          ],
          feedTitle: "Resolved ledger",
          feed: [
            { title: "Legal wording revised", detail: "Draft changed to say suspected scope instead of confirmed scope.", meta: "approved", tone: "success" },
            { title: "Unverified claim blocked", detail: "Unverified scope removed from external draft until Technical confirms.", meta: "rejected", tone: "risk" },
          ],
          mainTitle: "Decision archive",
          mainSummary:
            "Resolved cards show who decided, what changed, what evidence was used, and what audit record was created.",
          cards: [
            { title: "Approved internal update", body: "Reviewer approved draft language after Technical added containment status.", meta: "approved", tone: "success" },
            { title: "Rejected external line", body: "A public-facing sentence was rejected because final scope was not confirmed.", meta: "rejected", tone: "risk" },
          ],
          actionTitle: "Resolved actions",
          actionSummary: "Open audit export for decisions or return to command room.",
          actions: [
            { label: "Open audit", tone: "brand", kind: "navigate-audit" },
            { label: "Open room", tone: "muted", kind: "navigate-command" },
          ],
          status,
        },
      ],
    },
    {
      id: "audit",
      href: auditHref,
      navLabel: "Evidence And Audit",
      title: "Evidence And Audit",
      subtitle: "Trace every source fact, model/provider output, Band reference, human decision, and delivery attempt.",
      routeLabel: "Evidence and audit",
      activeBadge: "Audit ready",
      tone: "success",
      tabs: [
        {
          name: "Timeline",
          eyebrow: "chronological ledger",
          title: "Trace the incident from signal to decision",
          summary:
            "The timeline preserves source events, agent posts, decisions, communication states, and provider metadata.",
          metrics: [
            { label: "Events", value: "128", detail: "current incident", tone: "success" },
            { label: "Sources", value: "7", detail: "synthetic", tone: "brand" },
            { label: "Exports", value: "2", detail: "review packages", tone: "info" },
            metrics.decisions,
          ],
          feedTitle: "Audit timeline",
          feed: [
            { title: "Signal received", detail: incident.summary, meta: incident.detectedAt, tone: "brand" },
            { title: "Band room created", detail: "Assessment context posted and dependent agents recruited.", meta: "room event", tone: "success" },
            { title: "Human decision requested", detail: incident.decisionQuestion, meta: "review event", tone: "review" },
          ],
          mainTitle: "Selected audit event",
          mainSummary:
            "Every event includes source, timestamp, actor, generated output, human decision, and related Band message.",
          cards: [
            { title: "Source reference", body: `${incident.sourceType}, redaction result, and Band message reference are linked.`, meta: "traceable", tone: "success" },
            { title: "Review state", body: "Legal language and external-notification decisions are pending or approved independently.", meta: "human review", tone: "review" },
          ],
          actionTitle: "Audit actions",
          actionSummary: "Open export controls or inspect agent reasoning.",
          actions: [
            { label: "Open exports", tone: "brand" },
            { label: "Inspect reasoning", tone: "review" },
          ],
          status,
        },
        {
          name: "Evidence",
          eyebrow: "source facts",
          title: "Review facts before they feed drafts or decisions",
          summary:
            "Evidence records distinguish source facts, interpreted findings, assumptions, unknowns, and human decisions.",
          metrics: [
            metrics.evidence,
            { label: "Assumptions", value: "4", detail: "visible", tone: "warning" },
            { label: "Confirmed", value: "13", detail: "agent-supported", tone: "success" },
            { label: "Unknowns", value: "5", detail: "open requests", tone: "review" },
          ],
          feedTitle: "Evidence packet list",
          feed: [
            { title: incident.sourceType, detail: incident.suspectedScope, meta: "source", tone: "brand" },
            { title: "Legal obligation draft", detail: incident.legalFocus, meta: "legal source", tone: "review" },
            { title: "Communication facts used", detail: "Approved facts copied into draft package with source links.", meta: "draft source", tone: "success" },
          ],
          mainTitle: "Evidence detail",
          mainSummary:
            "The UI makes it clear which facts are confirmed and which are still assumptions.",
          cards: [
            { title: "Confirmed", body: `Affected systems: ${incident.affectedSystems.join(", ")}.`, meta: "safe to use", tone: "success" },
            { title: "Not confirmed", body: incident.communicationsBlocker, meta: "do not state as fact", tone: "warning" },
          ],
          actionTitle: "Evidence actions",
          actionSummary: "Request missing facts or open the decision requiring evidence.",
          actions: [
            { label: "Request facts", tone: "brand", kind: "tab-evidence" },
            { label: "Open decisions", tone: "review", kind: "tab-escalations" },
          ],
          status,
        },
        {
          name: "Agent Reasoning",
          eyebrow: "model/provider trace",
          title: "Inspect why the agents reached their outputs",
          summary:
            "Reasoning views show inputs, outputs, confidence, unknowns, provider metadata, and human-review gates.",
          metrics: [
            { label: "Agent runs", value: "5", detail: "single room", tone: "brand" },
            { label: "Providers", value: "2", detail: "AI/ML API and Featherless", tone: "info" },
            { label: "Fallback", value: "On", detail: "seeded backup", tone: "success" },
            metrics.decisions,
          ],
          feedTitle: "Reasoning ledger",
          feed: agents.map((agent) => ({ title: agent.title, detail: agent.body, meta: agent.meta, tone: agent.tone })),
          mainTitle: "Reasoning packet",
          mainSummary:
            "The product should show enough reasoning to audit decisions without exposing private data or raw chain-of-thought.",
          cards: [
            { title: "Shown", body: "Inputs, structured outputs, confidence, source links, unknowns, and action taken.", meta: "auditable", tone: "success" },
            { title: "Hidden", body: "Private data, secrets, raw credentials, and provider-internal traces.", meta: "protected", tone: "warning" },
          ],
          actionTitle: "Reasoning actions",
          actionSummary: "Open evidence or export the audit package.",
          actions: [
            { label: "Open evidence", tone: "brand", kind: "tab-evidence" },
            { label: "Export audit", tone: "success" },
          ],
          status,
        },
        {
          name: "Exports",
          eyebrow: "review package",
          title: "Export a safe audit package",
          summary:
            "Exports are designed for internal review, demo replay, and future compliance evidence packages.",
          metrics: [
            { label: "Packages", value: "2", detail: "incident and demo", tone: "brand" },
            { label: "Redacted", value: "100%", detail: "synthetic mode", tone: "success" },
            { label: "References", value: "18", detail: "Band and source links", tone: "info" },
            metrics.deadline,
          ],
          feedTitle: "Export queue",
          feed: [
            { title: "Incident evidence package", detail: "Timeline, facts, decisions, and communication states.", meta: "ready", tone: "success" },
            { title: "Demo replay package", detail: "Seeded fallback story for presentation use.", meta: "ready", tone: "brand" },
          ],
          mainTitle: "Export detail",
          mainSummary:
            "Exports should never contain secrets or real personal data. Production mode will require tenant policy and role checks.",
          cards: [
            { title: "Safe contents", body: "Synthetic facts, source references, agent outputs, owner actions, and delivery statuses.", meta: "allowed", tone: "success" },
            { title: "Blocked contents", body: "Raw logs, credentials, full personal records, private keys, or provider secrets.", meta: "blocked", tone: "danger" },
          ],
          actionTitle: "Export actions",
          actionSummary: "Download a future package or return to the command room.",
          actions: [
            { label: "Prepare export", tone: "brand" },
            { label: "Open room", tone: "muted", kind: "navigate-command" },
          ],
          status,
        },
      ],
    },
    {
      id: "settings",
      href: "/settings",
      navLabel: "Integrations",
      title: "Integrations And Demo Readiness",
      subtitle: "Verify provider health, notification channels, safe mode, seeded fallback, and demo readiness.",
      routeLabel: "Integrations",
      activeBadge: "Safe mode",
      tone: "success",
      tabs: [
        {
          name: "Providers",
          eyebrow: "integration health",
          title: "Check partner and platform readiness",
          summary:
            "Provider cards show purpose, mode, last successful run, safe diagnostic status, and whether fallback is available.",
          metrics: [
            { label: "Band", value: "Ready", detail: "room adapter planned", tone: "success" },
            { label: "Supabase", value: "Schema", detail: "next backend step", tone: "brand" },
            { label: "Models", value: "2", detail: "AI/ML API and Featherless", tone: "info" },
            { label: "Fallback", value: "On", detail: "seeded data available", tone: "success" },
          ],
          feedTitle: "Provider list",
          feed: [
            { title: "Band", detail: "Room state, agent handoffs, and human mentions.", meta: "required", tone: "success" },
            { title: "Supabase", detail: "Postgres, auth, storage, realtime-ready data layer.", meta: "planned", tone: "brand" },
            { title: "AI/ML API and Featherless", detail: "Model providers for agent reasoning and fallback route.", meta: "partner path", tone: "info" },
          ],
          mainTitle: "Provider detail",
          mainSummary:
            "The backend API now serves seeded workspace payloads. External providers plug into this layer later.",
          cards: [
            { title: "Backend seed API", body: "Local API exposes health, incident list, incident detail, and workspace payload endpoints.", meta: "ready", tone: "success" },
            { title: "Notification adapters", body: "Email and SMS can operate in safe test or simulated mode until credentials and recipients are configured.", meta: "guarded", tone: "warning" },
          ],
          actionTitle: "Provider actions",
          actionSummary: "Run safe diagnostics or open notification channel setup.",
          actions: [
            { label: "Run diagnostics", tone: "brand" },
            { label: "Notification setup", tone: "review" },
          ],
          status,
        },
        {
          name: "Notification Channels",
          eyebrow: "channel setup",
          title: "Configure where human notifications can go",
          summary:
            "All notifications start as CrisisCoord records. External channels are adapters with safe-mode rules and allowlists.",
          metrics: [
            { label: "Channels", value: "5", detail: "in-app, Band, email, SMS, optional chat", tone: "brand" },
            { label: "Allowlist", value: "8", detail: "safe demo recipients", tone: "success" },
            { label: "Live external", value: "Off", detail: "MVP default", tone: "warning" },
            metrics.decisions,
          ],
          feedTitle: "Channel list",
          feed: [
            { title: "In-app", detail: "Notification center, decision cards, and command-room messaging.", meta: "enabled", tone: "success" },
            { title: "Band", detail: "Agent room posts and human mentions.", meta: "enabled", tone: "success" },
            { title: "Email and SMS", detail: "Safe test or simulated mode for MVP.", meta: "guarded", tone: "warning" },
          ],
          mainTitle: "Channel policy",
          mainSummary:
            "The UI separates channel health from permission to send. A channel can be healthy while live external send remains disabled.",
          cards: [
            { title: "Safe recipients", body: "Test sends are limited to configured internal demo recipients.", meta: "allowlist", tone: "success" },
            { title: "Live-send lock", body: "External audience sending remains disabled in MVP without approval gates.", meta: "locked", tone: "warning" },
          ],
          actionTitle: "Channel actions",
          actionSummary: "Open a test composer or inspect delivery log behavior.",
          actions: [
            { label: "Open email", tone: "brand", kind: "tab-email" },
            { label: "Delivery log", tone: "muted", kind: "tab-delivery" },
          ],
          status,
        },
        {
          name: "Secrets And Policies",
          eyebrow: "safe configuration",
          title: "Show required environment without exposing values",
          summary:
            "The app can display configuration health and missing variables without showing secrets.",
          metrics: [
            { label: "Secrets", value: "0", detail: "values never shown", tone: "success" },
            { label: "Policy checks", value: "9", detail: "redaction, approval, send locks", tone: "brand" },
            { label: "Missing", value: "1", detail: "live email disabled", tone: "warning" },
            metrics.evidence,
          ],
          feedTitle: "Policy checks",
          feed: [
            { title: "No secrets in browser", detail: "Service-role and provider keys never reach client code.", meta: "pass", tone: "success" },
            { title: "Draft-only communications", detail: "External communication requires human approval and safe channel mode.", meta: "pass", tone: "success" },
            { title: "Fallback mode", detail: "Seeded data supports demo if provider calls fail.", meta: "enabled", tone: "brand" },
          ],
          mainTitle: "Configuration overview",
          mainSummary:
            "Environment status is shown as configured, missing, disabled, or simulated with no sensitive values.",
          cards: [
            { title: "Configured", body: "Backend seed API, Band placeholders, Supabase placeholders, model provider route, and seeded fallback mode.", meta: "safe", tone: "success" },
            { title: "Disabled", body: "Live audience messaging is disabled by default in demo mode.", meta: "policy", tone: "warning" },
          ],
          actionTitle: "Policy actions",
          actionSummary: "Run a safe configuration check or inspect audit export readiness.",
          actions: [
            { label: "Run policy check", tone: "brand" },
            { label: "Open exports", tone: "success", kind: "navigate-audit" },
          ],
          status,
        },
        {
          name: "Demo Readiness",
          eyebrow: "presentation mode",
          title: "Make the 60-second demo reliable",
          summary:
            "Demo readiness shows seeded fallback, provider status, last successful run, and safe diagnostic checks.",
          metrics: [
            { label: "Readiness", value: "92%", detail: "demo safe", tone: "success" },
            { label: "Fallback", value: "On", detail: "seeded run available", tone: "brand" },
            { label: "Last run", value: "OK", detail: incident.shortTitle, tone: "success" },
            { label: "Risks", value: "2", detail: "provider latency and review", tone: "warning" },
          ],
          feedTitle: "Demo checklist",
          feed: [
            { title: incident.title, detail: "Launch, agent handoff, communications gate, decision, and audit path are ready.", meta: "ready", tone: "success" },
            { title: "Seeded fallback", detail: "Demo can continue if Band or model provider calls are slow.", meta: "enabled", tone: "brand" },
            { title: "Safe data only", detail: "Screens use synthetic crisis data and no private business records.", meta: "pass", tone: "success" },
          ],
          mainTitle: "60-second scenario run",
          mainSummary:
            `${incident.detectedAt}: ${incident.summary} Assessment fires, Legal and Technical post findings, Communications drafts, and Escalation asks for a human decision.`,
          cards: [
            { title: "Judge-visible value", body: "Band is required because every agent output changes the next agent action.", meta: "core proof", tone: "info" },
            { title: "Demo fail plan", body: "Seeded fallback keeps the room, decisions, communications, and audit flow visible.", meta: "resilient", tone: "success" },
          ],
          actionTitle: "Demo actions",
          actionSummary: "Open the command room or inspect the audit package.",
          actions: [
            { label: "Open command room", tone: "brand", kind: "navigate-command" },
            { label: "Open audit", tone: "success", kind: "navigate-audit" },
          ],
          status,
        },
      ],
    },
  ];
}

export function createWorkspacePayload(incidentId = defaultIncidentId): WorkspacePayload {
  const incident = getIncidentById(incidentId);
  return {
    activeIncidentId: incident.id,
    incidents: seededIncidents.map(getIncidentSummary),
    pages: createWorkspacePages(incident),
  };
}

const defaultWorkspacePayload = createWorkspacePayload(defaultIncidentId);

export const pages = defaultWorkspacePayload.pages;
export const commandHref = getIncidentCommandHref(defaultIncidentId);
export const communicationsHref = getIncidentCommunicationsHref(defaultIncidentId);
export const auditHref = getIncidentAuditHref(defaultIncidentId);
export const pageById = new Map(pages.map((page) => [page.id, page]));
