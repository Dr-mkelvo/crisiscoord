export type Tone =
  | "brand"
  | "info"
  | "warning"
  | "risk"
  | "danger"
  | "success"
  | "review"
  | "muted";

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

const commonMetrics: Record<string, Metric> = {
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
    detail: "all synthetic and redacted",
    tone: "success",
  },
  deadline: {
    label: "Next deadline",
    value: "68h",
    detail: "regulator draft window",
    tone: "warning",
  },
};

const statusItems: FeedItem[] = [
  {
    title: "Band room active",
    detail: "Shared incident room is receiving structured agent posts.",
    meta: "source: Band adapter",
    tone: "info",
  },
  {
    title: "Synthetic mode enforced",
    detail: "No real customer, patient, payment, or private incident data is loaded.",
    meta: "policy: demo-safe",
    tone: "success",
  },
  {
    title: "Human review required",
    detail: "External communications remain draft-only until an owner approves.",
    meta: "gate: approval",
    tone: "review",
  },
];

const agents: DetailCard[] = [
  {
    title: "Assessment",
    body: "Classified the signal as critical payment-system exposure and posted normalized context.",
    meta: "complete",
    tone: "success",
  },
  {
    title: "Legal & Regulatory",
    body: "Drafted likely obligation paths and marked regulator notification as human-review only.",
    meta: "needs review",
    tone: "review",
  },
  {
    title: "Technical Forensics",
    body: "Confirmed affected payment service, containment checkpoint, and source confidence.",
    meta: "running",
    tone: "brand",
  },
  {
    title: "Stakeholder Communications",
    body: "Waits for Legal and Technical facts before unlock; drafts never send automatically.",
    meta: "blocked",
    tone: "warning",
  },
  {
    title: "Escalation & Decision",
    body: "Routes unresolved approval and notification ownership to the incident commander.",
    meta: "human owner",
    tone: "review",
  },
];

const signalFeed: FeedItem[] = [
  {
    title: "Payment system anomaly",
    detail: "Unauthorized access detected at 2:47 AM with possible card-record exposure.",
    meta: "security alert",
    tone: "danger",
  },
  {
    title: "Vendor processor notice",
    detail: "Third-party processor reports investigation into exposed integration credentials.",
    meta: "vendor notice",
    tone: "warning",
  },
  {
    title: "Support escalation",
    detail: "Customer-support queue reports payment dispute spike after the anomaly window.",
    meta: "support signal",
    tone: "info",
  },
];

export const pages: WorkspacePage[] = [
  {
    id: "signals",
    href: "/signals",
    navLabel: "Signal Intake",
    title: "Signal Intake And Sandbox Launcher",
    subtitle:
      "Start a crisis room from a sanitized signal, seeded sandbox, or manual tabletop scenario.",
    routeLabel: "/signals",
    activeBadge: "Synthetic input",
    tone: "brand",
    tabs: [
      {
        name: "Signals",
        eyebrow: "incoming source queue",
        title: "Review a crisis signal before room creation",
        summary:
          "Signals are structured packets from alerts, vendor notices, support escalations, or legal reports. Nothing here is treated as confirmed until Assessment posts to Band.",
        metrics: [
          { label: "Signals", value: "5", detail: "3 ready for sandbox", tone: "brand" },
          { label: "Blocked fields", value: "7", detail: "private data withheld", tone: "warning" },
          commonMetrics.evidence,
          commonMetrics.band,
        ],
        feedTitle: "Signal source feed",
        feed: signalFeed,
        mainTitle: "Selected signal packet",
        mainSummary:
          "At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed. Initial monitoring suggests EU and US payment flows may be involved.",
        cards: [
          {
            title: "Data categories",
            body: "Payment records, account identifiers, transaction metadata, and service logs are marked as suspected until Technical confirms scope.",
            meta: "unconfirmed",
            tone: "warning",
          },
          {
            title: "Expected response",
            body: "Assessment starts first, Legal and Technical run in parallel, Communications waits for both findings.",
            meta: "agent order",
            tone: "info",
          },
        ],
        actionTitle: "Launch review",
        actionSummary: "Validate redaction and start the crisis command room with this signal.",
        actions: [
          { label: "Review signal", tone: "brand" },
          { label: "Launch room", tone: "success", kind: "navigate-command" },
        ],
        status: statusItems,
      },
      {
        name: "Scenarios",
        eyebrow: "sandbox selector",
        title: "Choose a global regulated-workflow demo scenario",
        summary:
          "The sandbox gives the team repeatable demo paths without connecting real enterprise systems or using private data.",
        metrics: [
          { label: "Scenario families", value: "3", detail: "finance, health, supply", tone: "brand" },
          { label: "Seeded facts", value: "42", detail: "all synthetic", tone: "success" },
          commonMetrics.decisions,
          commonMetrics.deadline,
        ],
        feedTitle: "Sandbox options",
        feed: [
          {
            title: "Finance",
            detail: "Payment data exposure with regulator and customer notification decisions.",
            meta: "primary demo",
            tone: "danger",
          },
          {
            title: "Health",
            detail: "Healthcare data exposure with patient-privacy and provider-review constraints.",
            meta: "sector sandbox",
            tone: "review",
          },
          {
            title: "Product and supply chain",
            detail: "Vendor compromise or recall scenario with executive and customer messaging.",
            meta: "sector sandbox",
            tone: "warning",
          },
        ],
        mainTitle: "Scenario outcome preview",
        mainSummary:
          "Each scenario creates a Band room, seeded agent findings, decision requests, draft communications, and audit events.",
        cards: [
          {
            title: "Finance happy path",
            body: "Assessment posts severity, Legal starts a disclosure clock, Technical narrows confirmed scope, Communications prepares drafts, Escalation requests customer-notice approval.",
            meta: "demo-ready",
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
        actionSummary: "Load the finance scenario or inspect the seeded facts before launch.",
        actions: [
          { label: "Load finance scenario", tone: "brand" },
          { label: "Launch room", tone: "success", kind: "navigate-command" },
        ],
        status: statusItems,
      },
      {
        name: "Redaction",
        eyebrow: "safe input gate",
        title: "Block private data before any agent sees it",
        summary:
          "The demo input is treated like an enterprise intake gate: sensitive fields are withheld, replaced, or marked as unsafe for model context.",
        metrics: [
          { label: "Allowed fields", value: "18", detail: "safe for agents", tone: "success" },
          { label: "Blocked fields", value: "7", detail: "private or unknown", tone: "warning" },
          { label: "Prompt packets", value: "5", detail: "agent-scoped", tone: "info" },
          commonMetrics.evidence,
        ],
        feedTitle: "Redaction checks",
        feed: [
          {
            title: "Private identifiers withheld",
            detail: "Customer names, full payment numbers, tokens, and credentials stay out of prompts.",
            meta: "blocked",
            tone: "warning",
          },
          {
            title: "Synthetic labels applied",
            detail: "Record counts, systems, jurisdictions, and roles are demo-safe placeholders.",
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
            body: "Severity, time window, synthetic record count, service category, confidence labels, and source trace IDs.",
            meta: "safe",
            tone: "success",
          },
          {
            title: "What agents cannot use",
            body: "Raw credentials, private account details, exact customer identities, or unredacted logs.",
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
        status: statusItems,
      },
      {
        name: "Launch Review",
        eyebrow: "room creation checklist",
        title: "Confirm agents, facts, and human owner before launch",
        summary:
          "The launch review prevents a narrow one-click demo by showing exactly what will be created in the command room.",
        metrics: [
          { label: "Agents queued", value: "5", detail: "dependency order ready", tone: "brand" },
          { label: "Owner", value: "IC", detail: "incident commander", tone: "review" },
          commonMetrics.deadline,
          commonMetrics.evidence,
        ],
        feedTitle: "Launch checklist",
        feed: [
          {
            title: "Band room",
            detail: "Create shared room and first context post.",
            meta: "ready",
            tone: "success",
          },
          {
            title: "Agent sequence",
            detail: "Assessment, Legal, Technical, Communications, Escalation.",
            meta: "ready",
            tone: "brand",
          },
          {
            title: "Human owner",
            detail: "Incident commander owns approval, notification, and escalation review.",
            meta: "required",
            tone: "review",
          },
        ],
        mainTitle: "Room launch package",
        mainSummary:
          "Creates a crisis room with the signal packet, dependency gates, synthetic evidence references, and first decision request.",
        cards: agents.slice(0, 3),
        actionTitle: "Ready to launch",
        actionSummary: "Create the command room and move into the live crisis workflow.",
        actions: [{ label: "Launch command room", tone: "success", kind: "navigate-command" }],
        status: statusItems,
      },
    ],
  },
  {
    id: "incidents",
    href: "/incidents",
    navLabel: "Incident Registry",
    title: "Incident Registry",
    subtitle: "Triage active, demo, resolved, and deadline-sensitive crisis rooms.",
    routeLabel: "/incidents",
    activeBadge: "3 active rooms",
    tone: "brand",
    tabs: [
      {
        name: "Queue",
        eyebrow: "incident list",
        title: "Open the room that needs attention",
        summary:
          "The registry stays lean: severity, phase, decision status, deadline, owner, and open action.",
        metrics: [
          { label: "Active", value: "3", detail: "2 synthetic demos", tone: "brand" },
          { label: "Critical", value: "1", detail: "payment exposure", tone: "danger" },
          commonMetrics.decisions,
          commonMetrics.deadline,
        ],
        feedTitle: "Incident queue",
        feed: [
          {
            title: "INC-2041 Payment data exposure",
            detail: "Critical, legal review open, Technical confidence 82 percent.",
            meta: "owner: incident commander",
            tone: "danger",
          },
          {
            title: "INC-2038 Vendor credential notice",
            detail: "High risk, waiting on vendor confirmation and executive owner.",
            meta: "owner: technical lead",
            tone: "warning",
          },
          {
            title: "INC-2032 Product recall inquiry",
            detail: "Resolved scenario retained for audit and demo replay.",
            meta: "resolved",
            tone: "success",
          },
        ],
        mainTitle: "Selected incident snapshot",
        mainSummary:
          "Payment system exposure is the primary demo incident. Communications are blocked until Legal and Technical findings are complete.",
        cards: [
          {
            title: "Phase",
            body: "Assessment complete, Legal needs review, Technical running, Communications gated.",
            meta: "active",
            tone: "brand",
          },
          {
            title: "Decision state",
            body: "Customer notification approval is pending owner acknowledgement.",
            meta: "human review",
            tone: "review",
          },
        ],
        actionTitle: "Open room",
        actionSummary: "Continue the active incident in the command room.",
        actions: [{ label: "Open command room", tone: "brand", kind: "navigate-command" }],
        status: statusItems,
      },
      {
        name: "Details",
        eyebrow: "incident facts",
        title: "Review current severity, phase, and data categories",
        summary:
          "Details give enough context to choose the correct room without duplicating the command surface.",
        metrics: [
          { label: "Severity", value: "Critical", detail: "potential exposure", tone: "danger" },
          { label: "Phase", value: "Review", detail: "legal and technical", tone: "review" },
          commonMetrics.evidence,
          commonMetrics.band,
        ],
        feedTitle: "Fact summary",
        feed: signalFeed,
        mainTitle: "Incident detail",
        mainSummary:
          "Unauthorized access window, suspected payment records, regulator draft requirement, and containment status are summarized here.",
        cards: agents.slice(0, 4),
        actionTitle: "Continue workflow",
        actionSummary: "Open the command room or jump directly to audit if evidence needs review.",
        actions: [
          { label: "Open room", tone: "brand", kind: "navigate-command" },
          { label: "Open audit", tone: "muted", kind: "navigate-audit" },
        ],
        status: statusItems,
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
          commonMetrics.decisions,
          { label: "Escalations", value: "1", detail: "backup owner ready", tone: "review" },
        ],
        feedTitle: "Owner queue",
        feed: [
          {
            title: "Incident commander",
            detail: "Owns room state, customer notification decision, and escalation ladder.",
            meta: "acknowledged",
            tone: "success",
          },
          {
            title: "Legal reviewer",
            detail: "Owns regulator draft and obligation language review.",
            meta: "pending",
            tone: "review",
          },
          {
            title: "Communications lead",
            detail: "Owns approved audience package and simulated delivery status.",
            meta: "waiting",
            tone: "warning",
          },
        ],
        mainTitle: "Acknowledgement ladder",
        mainSummary:
          "If a primary owner does not acknowledge, CrisisCoord records the attempt and escalates to the configured backup owner.",
        cards: [
          {
            title: "Primary owner",
            body: "Incident commander receives in-app and Band notification first.",
            meta: "acknowledged",
            tone: "success",
          },
          {
            title: "Backup owner",
            body: "Executive approver receives follow-up if the acknowledgement timer expires.",
            meta: "standby",
            tone: "warning",
          },
        ],
        actionTitle: "Notify owner",
        actionSummary: "Open the command room messaging tab with the owner selected.",
        actions: [{ label: "Message owner", tone: "review", kind: "tab-messaging" }],
        status: statusItems,
      },
      {
        name: "Deadlines",
        eyebrow: "clock view",
        title: "Track disclosure and review clocks",
        summary:
          "Deadlines are shown as operating windows and draft guidance, not final legal advice.",
        metrics: [
          commonMetrics.deadline,
          { label: "Drafts blocked", value: "2", detail: "missing facts", tone: "warning" },
          { label: "Review owners", value: "3", detail: "legal, technical, executive", tone: "review" },
          commonMetrics.evidence,
        ],
        feedTitle: "Deadline ledger",
        feed: [
          {
            title: "Regulator notification draft",
            detail: "Clock starts from confirmed breach awareness; legal approval required.",
            meta: "draft guidance",
            tone: "warning",
          },
          {
            title: "Customer notification decision",
            detail: "Escalation agent asks whether proactive notice is approved.",
            meta: "human decision",
            tone: "review",
          },
        ],
        mainTitle: "Deadline dependencies",
        mainSummary:
          "Legal obligations depend on confirmed scope, jurisdictions, affected data categories, and containment status.",
        cards: [
          {
            title: "Missing fact",
            body: "Technical must confirm final affected record count before customer language unlocks.",
            meta: "blocking",
            tone: "warning",
          },
          {
            title: "Audit note",
            body: "All deadline assumptions are preserved with timestamps and owner decisions.",
            meta: "traceable",
            tone: "info",
          },
        ],
        actionTitle: "Deadline action",
        actionSummary: "Open decisions or command room depending on what is blocking progress.",
        actions: [
          { label: "Open decision desk", tone: "review", kind: "tab-escalations" },
          { label: "Open room", tone: "brand", kind: "navigate-command" },
        ],
        status: statusItems,
      },
    ],
  },
  {
    id: "command",
    href: "/incidents/payment-breach",
    navLabel: "Command Room",
    title: "Crisis Command Room",
    subtitle:
      "The primary workspace for Band handoffs, agent state, human decisions, and safe communications.",
    routeLabel: "/incidents/:incidentId",
    activeBadge: "INC-2041 live",
    tone: "review",
    tabs: [
      {
        name: "Overview",
        eyebrow: "live room",
        title: "Payment exposure command room",
        summary:
          "Assessment has posted context. Legal and Technical are working from the same Band room. Communications remains gated until required facts exist.",
        metrics: [commonMetrics.band, commonMetrics.decisions, commonMetrics.evidence, commonMetrics.deadline],
        feedTitle: "Band timeline",
        feed: [
          {
            title: "Assessment posted normalized context",
            detail: "Severity, affected system, known unknowns, and required agents are visible.",
            meta: "02:49 synthetic",
            tone: "success",
          },
          {
            title: "Legal posted obligations draft",
            detail: "Regulator notification language is draft-only and awaits review.",
            meta: "03:02 synthetic",
            tone: "review",
          },
          {
            title: "Technical scope update",
            detail: "Containment signal is positive; final record count remains under review.",
            meta: "03:11 synthetic",
            tone: "brand",
          },
        ],
        mainTitle: "Agent handoff map",
        mainSummary:
          "Band is the shared room state. Each agent reads prior posts before producing findings, drafts, or decisions.",
        cards: agents,
        actionTitle: "Active human decision",
        actionSummary:
          "Approve proactive customer notification, request more facts, or escalate to executive owner.",
        actions: [
          { label: "Open messaging", tone: "brand", kind: "tab-messaging" },
          { label: "Open decisions", tone: "review", kind: "tab-escalations" },
          { label: "Open email draft", tone: "warning", kind: "tab-email" },
        ],
        status: statusItems,
      },
      {
        name: "Agents",
        eyebrow: "agent details",
        title: "Inspect the five-agent collaboration chain",
        summary:
          "Agent nodes are not decoration. Each node shows input, output, status, confidence, unknowns, Band reference, and next dependency.",
        metrics: [
          { label: "Complete", value: "2", detail: "assessment and legal draft", tone: "success" },
          { label: "Running", value: "1", detail: "technical forensics", tone: "brand" },
          { label: "Blocked", value: "1", detail: "communications", tone: "warning" },
          commonMetrics.decisions,
        ],
        feedTitle: "Agent run ledger",
        feed: agents.map((agent) => ({
          title: agent.title,
          detail: agent.body,
          meta: agent.meta,
          tone: agent.tone,
        })),
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
        status: statusItems,
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
          commonMetrics.decisions,
        ],
        feedTitle: "Thread queue",
        feed: [
          {
            title: "Incident commander",
            detail: "Customer notification decision awaits approval.",
            meta: "in-app and Band",
            tone: "review",
          },
          {
            title: "Legal reviewer",
            detail: "Regulator language needs final review before unlock.",
            meta: "email test available",
            tone: "warning",
          },
          {
            title: "Technical lead",
            detail: "Scope confirmation request is active.",
            meta: "acknowledged",
            tone: "success",
          },
        ],
        mainTitle: "Selected message thread",
        mainSummary:
          "Owner, evidence request, acknowledgement timer, channel attempts, and escalation level stay visible in one work area.",
        cards: [
          {
            title: "Draft message",
            body: "Please approve or request revision for proactive customer notification. Legal and Technical facts are attached.",
            meta: "requires approval",
            tone: "review",
          },
          {
            title: "Delivery options",
            body: "In-app, Band mention, safe test email, and SMS simulation are available for configured recipients only.",
            meta: "safe mode",
            tone: "info",
          },
        ],
        actionTitle: "Message actions",
        actionSummary: "Send a safe test, escalate, or open the Communications Review composer.",
        actions: [
          { label: "Open email", tone: "brand", kind: "tab-email" },
          { label: "Escalate", tone: "review", kind: "tab-escalations" },
        ],
        status: statusItems,
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
          commonMetrics.evidence,
        ],
        feedTitle: "Decision queue",
        feed: [
          {
            title: "Notify customers proactively?",
            detail: "Owner must approve strategy before customer-facing draft is queued.",
            meta: "urgent",
            tone: "review",
          },
          {
            title: "Regulator language final?",
            detail: "Legal reviewer must approve exact wording.",
            meta: "legal review",
            tone: "warning",
          },
        ],
        mainTitle: "Decision detail",
        mainSummary:
          "The decision card compares risk of approving, risk of waiting, required facts, and escalation owner.",
        cards: [
          {
            title: "Risk of approving",
            body: "The current affected-record count may change after Technical finalizes scope.",
            meta: "medium",
            tone: "risk",
          },
          {
            title: "Risk of waiting",
            body: "Delayed notification could compress review time and weaken stakeholder trust.",
            meta: "high",
            tone: "warning",
          },
        ],
        actionTitle: "Decision actions",
        actionSummary: "Approve, request more facts, or escalate to backup owner.",
        actions: [
          { label: "Request facts", tone: "brand", kind: "tab-evidence" },
          { label: "Escalate", tone: "review", kind: "tab-escalations" },
        ],
        status: statusItems,
      },
    ],
  },
  {
    id: "communications",
    href: "/incidents/payment-breach/communications",
    navLabel: "Communications",
    title: "Communications Review",
    subtitle: "Draft, review, test, queue, and audit outbound communications from verified facts.",
    routeLabel: "/incidents/:incidentId/communications",
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
          commonMetrics.evidence,
        ],
        feedTitle: "Draft queue",
        feed: [
          {
            title: "Regulator notification",
            detail: "Uses confirmed EU scope, containment state, and legal obligation draft.",
            meta: "needs review",
            tone: "review",
          },
          {
            title: "Customer notice",
            detail: "Blocked until proactive-notification decision is approved.",
            meta: "blocked",
            tone: "warning",
          },
        ],
        mainTitle: "Draft review panel",
        mainSummary:
          "Every draft displays facts used, missing facts, legal warnings, and the approval or revision action.",
        cards: [
          {
            title: "Facts used",
            body: "Incident time, affected service, suspected record categories, Technical containment update, and Legal obligation draft.",
            meta: "9 facts",
            tone: "success",
          },
          {
            title: "Missing facts",
            body: "Final affected-record count and final customer-notification decision.",
            meta: "2 blockers",
            tone: "warning",
          },
        ],
        actionTitle: "Draft actions",
        actionSummary: "Open Email or SMS tab with the selected draft loaded.",
        actions: [
          { label: "Open email", tone: "brand", kind: "tab-email" },
          { label: "Open SMS", tone: "warning", kind: "tab-sms" },
        ],
        status: statusItems,
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
          commonMetrics.decisions,
        ],
        feedTitle: "Email thread",
        feed: [
          {
            title: "Regulator reviewer",
            detail: "Safe test recipient selected; external regulator send disabled in MVP.",
            meta: "allowlisted",
            tone: "success",
          },
          {
            title: "Executive owner",
            detail: "Approval reminder can be sent as a safe internal email.",
            meta: "internal",
            tone: "review",
          },
        ],
        mainTitle: "Email composer",
        mainSummary:
          "Subject, body, source facts, missing facts, and warnings are visible before queueing a simulated send package.",
        cards: [
          {
            title: "Subject",
            body: "Draft regulator notice for payment-system security incident INC-2041.",
            meta: "editable",
            tone: "brand",
          },
          {
            title: "Provider status",
            body: "Test mode only. External production sending is disabled until credentials and approvals exist.",
            meta: "safe",
            tone: "success",
          },
        ],
        actionTitle: "Email actions",
        actionSummary: "Send a safe test or queue the simulated package for audit review.",
        actions: [
          { label: "Send test", tone: "brand" },
          { label: "Queue package", tone: "success", kind: "tab-delivery" },
        ],
        status: statusItems,
      },
      {
        name: "SMS",
        eyebrow: "urgent owner channel",
        title: "Prepare a safe SMS escalation",
        summary:
          "SMS is for internal owner acknowledgement and escalation. Customer or regulator SMS remains disabled for MVP.",
        metrics: [
          { label: "Recipients", value: "2", detail: "owner ladder", tone: "review" },
          { label: "Template", value: "1", detail: "approval request", tone: "brand" },
          { label: "Segments", value: "1", detail: "safe length", tone: "success" },
          { label: "Mode", value: "Sim", detail: "no live customer send", tone: "warning" },
        ],
        feedTitle: "SMS queue",
        feed: [
          {
            title: "Primary owner",
            detail: "Approval reminder prepared for incident commander.",
            meta: "safe recipient",
            tone: "review",
          },
          {
            title: "Backup owner",
            detail: "Escalation fallback if acknowledgement timer expires.",
            meta: "standby",
            tone: "warning",
          },
        ],
        mainTitle: "SMS composer",
        mainSummary:
          "The SMS tab shows recipient, template preview, acknowledgement timer, and simulated delivery result.",
        cards: [
          {
            title: "Message preview",
            body: "INC-2041 needs approval: proactive customer notification decision is waiting. Open CrisisCoord Decision Desk.",
            meta: "template",
            tone: "brand",
          },
          {
            title: "Channel rule",
            body: "SMS is only for internal owner escalation in this MVP.",
            meta: "policy",
            tone: "warning",
          },
        ],
        actionTitle: "SMS actions",
        actionSummary: "Send simulated test or escalate through the owner ladder.",
        actions: [
          { label: "Simulate SMS", tone: "brand" },
          { label: "Escalate", tone: "review", kind: "tab-escalations" },
        ],
        status: statusItems,
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
          commonMetrics.evidence,
        ],
        feedTitle: "Delivery attempts",
        feed: [
          {
            title: "Band room post",
            detail: "Legal finding linked and visible in the command room timeline.",
            meta: "delivered",
            tone: "success",
          },
          {
            title: "Email test package",
            detail: "Regulator draft package queued in simulated mode.",
            meta: "queued",
            tone: "brand",
          },
          {
            title: "Owner SMS reminder",
            detail: "Primary owner did not acknowledge before timer threshold.",
            meta: "timed out",
            tone: "warning",
          },
        ],
        mainTitle: "Delivery status detail",
        mainSummary:
          "Each attempt carries channel, provider, draft ID, owner, result, timestamp, and audit reference.",
        cards: [
          {
            title: "Provider metadata",
            body: "Adapter, mode, message ID, status code, and fallback path are retained for audit.",
            meta: "traceable",
            tone: "info",
          },
          {
            title: "Human acknowledgement",
            body: "Approvals and acknowledgement states are separate from delivery success.",
            meta: "owner state",
            tone: "review",
          },
        ],
        actionTitle: "Delivery actions",
        actionSummary: "Open audit export or return to command room messaging.",
        actions: [
          { label: "Open audit", tone: "brand", kind: "navigate-audit" },
          { label: "Open messaging", tone: "review", kind: "tab-messaging" },
        ],
        status: statusItems,
      },
    ],
  },
  {
    id: "decisions",
    href: "/decisions",
    navLabel: "Decision Desk",
    title: "Decision Desk",
    subtitle: "Mobile-first human approvals with risk of approving, waiting, requesting facts, or escalating.",
    routeLabel: "/decisions",
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
          { label: "Urgent", value: "1", detail: "customer notice", tone: "warning" },
          { label: "Owners", value: "3", detail: "role-based", tone: "brand" },
          commonMetrics.deadline,
        ],
        feedTitle: "Pending decisions",
        feed: [
          {
            title: "Notify customers proactively?",
            detail: "Customer communication strategy needs owner decision.",
            meta: "urgent",
            tone: "review",
          },
          {
            title: "Pause payment processing?",
            detail: "Technical recommends no full pause while containment is stable.",
            meta: "technical review",
            tone: "warning",
          },
          {
            title: "Disclose to secondary regulator?",
            detail: "Legal needs final jurisdiction facts.",
            meta: "needs facts",
            tone: "brand",
          },
        ],
        mainTitle: "Decision card",
        mainSummary:
          "The active decision includes risk of approving, risk of waiting, missing facts, owner, timer, and escalation path.",
        cards: [
          {
            title: "Risk of approving",
            body: "Customer notice may overstate confirmed scope before Technical finalizes record counts.",
            meta: "medium",
            tone: "risk",
          },
          {
            title: "Risk of waiting",
            body: "Delay could compress legal review time and weaken stakeholder trust.",
            meta: "high",
            tone: "warning",
          },
        ],
        actionTitle: "Decision actions",
        actionSummary: "Acknowledge, approve, request more facts, or escalate.",
        actions: [
          { label: "Request facts", tone: "brand", kind: "tab-evidence" },
          { label: "Escalate", tone: "review", kind: "tab-escalations" },
        ],
        status: statusItems,
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
          commonMetrics.band,
        ],
        feedTitle: "Evidence request queue",
        feed: [
          {
            title: "Final affected record count",
            detail: "Technical must confirm before customer notice unlocks.",
            meta: "blocking",
            tone: "warning",
          },
          {
            title: "Jurisdiction confirmation",
            detail: "Legal needs final region mapping for regulator draft.",
            meta: "needs review",
            tone: "review",
          },
        ],
        mainTitle: "Evidence request composer",
        mainSummary:
          "The selected request preloads owner, requested fact, due time, channel, and escalation behavior.",
        cards: [
          {
            title: "Message to Technical",
            body: "Please confirm final affected record count and confidence score for INC-2041.",
            meta: "ready",
            tone: "brand",
          },
          {
            title: "Audit record",
            body: "Request will be recorded with Band reference and owner acknowledgement state.",
            meta: "traceable",
            tone: "info",
          },
        ],
        actionTitle: "Evidence actions",
        actionSummary: "Send internal request or open the command-room messaging tab.",
        actions: [
          { label: "Open messaging", tone: "brand", kind: "tab-messaging" },
          { label: "Open audit", tone: "muted", kind: "navigate-audit" },
        ],
        status: statusItems,
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
          commonMetrics.decisions,
        ],
        feedTitle: "Escalation ladder",
        feed: [
          {
            title: "Primary reviewer",
            detail: "Notified in-app and Band; acknowledgement timer expired.",
            meta: "timed out",
            tone: "warning",
          },
          {
            title: "Backup approver",
            detail: "Receives escalation with evidence packet and decision summary.",
            meta: "next",
            tone: "review",
          },
        ],
        mainTitle: "Escalation detail",
        mainSummary:
          "The app explains why escalation happened and preserves the notification attempts for audit.",
        cards: [
          {
            title: "Why escalation happened",
            body: "Customer notification approval remained unacknowledged while deadline pressure increased.",
            meta: "policy",
            tone: "warning",
          },
          {
            title: "Next owner",
            body: "Executive approver receives the decision package and risk summary.",
            meta: "backup owner",
            tone: "review",
          },
        ],
        actionTitle: "Escalation actions",
        actionSummary: "Notify backup owner or open the communication package.",
        actions: [
          { label: "Notify backup", tone: "review" },
          { label: "Open email", tone: "brand", kind: "tab-email" },
        ],
        status: statusItems,
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
          commonMetrics.evidence,
        ],
        feedTitle: "Resolved ledger",
        feed: [
          {
            title: "Legal wording revised",
            detail: "Regulator draft changed to say suspected scope instead of confirmed scope.",
            meta: "approved",
            tone: "success",
          },
          {
            title: "Raw record count blocked",
            detail: "Unverified count removed from customer draft until Technical confirms.",
            meta: "rejected",
            tone: "risk",
          },
        ],
        mainTitle: "Decision archive",
        mainSummary:
          "Resolved cards show who decided, what changed, what evidence was used, and what audit record was created.",
        cards: [
          {
            title: "Approved regulator draft",
            body: "Legal reviewer approved draft language after Technical added containment status.",
            meta: "approved",
            tone: "success",
          },
          {
            title: "Rejected customer line",
            body: "A customer-facing sentence was rejected because final scope was not confirmed.",
            meta: "rejected",
            tone: "risk",
          },
        ],
        actionTitle: "Resolved actions",
        actionSummary: "Open audit export for decisions or return to command room.",
        actions: [
          { label: "Open audit", tone: "brand", kind: "navigate-audit" },
          { label: "Open room", tone: "muted", kind: "navigate-command" },
        ],
        status: statusItems,
      },
    ],
  },
  {
    id: "audit",
    href: "/incidents/payment-breach/audit",
    navLabel: "Evidence And Audit",
    title: "Evidence And Audit",
    subtitle: "Trace every source fact, model/provider output, Band reference, human decision, and delivery attempt.",
    routeLabel: "/incidents/:incidentId/audit",
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
          commonMetrics.decisions,
        ],
        feedTitle: "Audit timeline",
        feed: [
          {
            title: "Signal received",
            detail: "Security alert normalized with private fields blocked.",
            meta: "02:47 synthetic",
            tone: "brand",
          },
          {
            title: "Band room created",
            detail: "Assessment context posted and dependent agents recruited.",
            meta: "02:49 synthetic",
            tone: "success",
          },
          {
            title: "Human decision requested",
            detail: "Customer notification strategy requires approval.",
            meta: "03:18 synthetic",
            tone: "review",
          },
        ],
        mainTitle: "Selected audit event",
        mainSummary:
          "Every event includes source, timestamp, actor, generated output, human decision, and related Band message.",
        cards: [
          {
            title: "Source reference",
            body: "Security signal packet, redaction result, and Band message reference are linked.",
            meta: "traceable",
            tone: "success",
          },
          {
            title: "Review state",
            body: "Legal language and customer-notification decisions are pending or approved independently.",
            meta: "human review",
            tone: "review",
          },
        ],
        actionTitle: "Audit actions",
        actionSummary: "Open export controls or inspect agent reasoning.",
        actions: [
          { label: "Open exports", tone: "brand" },
          { label: "Inspect reasoning", tone: "review" },
        ],
        status: statusItems,
      },
      {
        name: "Evidence",
        eyebrow: "source facts",
        title: "Review facts before they feed drafts or decisions",
        summary:
          "Evidence records distinguish source facts, interpreted findings, assumptions, unknowns, and human decisions.",
        metrics: [
          commonMetrics.evidence,
          { label: "Assumptions", value: "4", detail: "visible", tone: "warning" },
          { label: "Confirmed", value: "13", detail: "agent-supported", tone: "success" },
          { label: "Unknowns", value: "5", detail: "open requests", tone: "review" },
        ],
        feedTitle: "Evidence packet list",
        feed: [
          {
            title: "Payment service logs",
            detail: "Synthetic containment and access window details.",
            meta: "technical source",
            tone: "brand",
          },
          {
            title: "Legal obligation draft",
            detail: "Draft guidance and review state for regulator notice.",
            meta: "legal source",
            tone: "review",
          },
          {
            title: "Communication facts used",
            detail: "Approved facts copied into draft package with source links.",
            meta: "draft source",
            tone: "success",
          },
        ],
        mainTitle: "Evidence detail",
        mainSummary:
          "The UI makes it clear which facts are confirmed and which are still assumptions.",
        cards: [
          {
            title: "Confirmed",
            body: "Affected service, incident time, containment checkpoint, and owner assignments.",
            meta: "safe to use",
            tone: "success",
          },
          {
            title: "Not confirmed",
            body: "Final record count and final external notification strategy.",
            meta: "do not state as fact",
            tone: "warning",
          },
        ],
        actionTitle: "Evidence actions",
        actionSummary: "Request missing facts or open the decision requiring evidence.",
        actions: [
          { label: "Request facts", tone: "brand", kind: "tab-evidence" },
          { label: "Open decisions", tone: "review", kind: "tab-escalations" },
        ],
        status: statusItems,
      },
      {
        name: "Agent Reasoning",
        eyebrow: "model/provider metadata",
        title: "Inspect what each agent read and produced",
        summary:
          "Reasoning views are structured and redacted. They expose inputs, outputs, confidence, unknowns, and provider metadata without leaking private data.",
        metrics: [
          { label: "Agent runs", value: "11", detail: "current room", tone: "brand" },
          { label: "Providers", value: "3", detail: "Band, AI/ML API, Featherless", tone: "info" },
          { label: "Redacted", value: "7", detail: "private fields", tone: "warning" },
          commonMetrics.evidence,
        ],
        feedTitle: "Agent reasoning ledger",
        feed: agents.map((agent) => ({
          title: agent.title,
          detail: agent.body,
          meta: agent.meta,
          tone: agent.tone,
        })),
        mainTitle: "Reasoning packet",
        mainSummary:
          "The selected agent shows source inputs, output summary, confidence, missing evidence, and Band references.",
        cards: [
          {
            title: "Inputs",
            body: "Normalized signal, Band messages, redacted evidence, and prior agent outputs.",
            meta: "safe",
            tone: "success",
          },
          {
            title: "Output guardrail",
            body: "Legal and regulatory statements are draft guidance requiring human review.",
            meta: "guarded",
            tone: "review",
          },
        ],
        actionTitle: "Reasoning actions",
        actionSummary: "Open related evidence, Band message, or communication draft.",
        actions: [
          { label: "Open evidence", tone: "brand" },
          { label: "Open draft", tone: "warning", kind: "navigate-communications" },
        ],
        status: statusItems,
      },
      {
        name: "Exports",
        eyebrow: "review package",
        title: "Export an audit-ready review package",
        summary:
          "Exports bundle source facts, agent outputs, human approvals, delivery logs, and provider metadata for review.",
        metrics: [
          { label: "Packages", value: "2", detail: "legal and executive", tone: "brand" },
          { label: "Integrity", value: "OK", detail: "no broken refs", tone: "success" },
          { label: "Private data", value: "0", detail: "synthetic only", tone: "success" },
          commonMetrics.band,
        ],
        feedTitle: "Export queue",
        feed: [
          {
            title: "Legal review package",
            detail: "Obligations, regulator draft, source facts, and legal decision history.",
            meta: "ready",
            tone: "success",
          },
          {
            title: "Executive summary package",
            detail: "Timeline, decisions, risk tradeoffs, and simulated communication status.",
            meta: "ready",
            tone: "brand",
          },
        ],
        mainTitle: "Export detail",
        mainSummary:
          "Each export describes what is included, what is excluded, and who requested it.",
        cards: [
          {
            title: "Included",
            body: "Timeline, evidence packets, agent summaries, decisions, delivery logs, and Band references.",
            meta: "review package",
            tone: "success",
          },
          {
            title: "Excluded",
            body: "Raw private records, credentials, unredacted logs, and real customer data.",
            meta: "blocked",
            tone: "danger",
          },
        ],
        actionTitle: "Export actions",
        actionSummary: "Generate a demo export or return to command room.",
        actions: [
          { label: "Generate export", tone: "brand" },
          { label: "Open room", tone: "muted", kind: "navigate-command" },
        ],
        status: statusItems,
      },
    ],
  },
  {
    id: "settings",
    href: "/settings",
    navLabel: "Integrations",
    title: "Integrations And Demo Readiness",
    subtitle:
      "Check Band, Supabase, AI/ML API, Featherless, notification adapters, seeded fallback mode, and safe diagnostics.",
    routeLabel: "/settings",
    activeBadge: "Demo ready",
    tone: "success",
    tabs: [
      {
        name: "Providers",
        eyebrow: "partner readiness",
        title: "Know which providers are connected or simulated",
        summary:
          "The page shows real provider intent without exposing secrets or requiring live enterprise systems for the demo.",
        metrics: [
          { label: "Providers", value: "5", detail: "Band, Supabase, AI/ML API, Featherless, notifications", tone: "brand" },
          { label: "Ready", value: "4", detail: "seeded fallback available", tone: "success" },
          { label: "Warnings", value: "1", detail: "email live send disabled", tone: "warning" },
          commonMetrics.evidence,
        ],
        feedTitle: "Provider status",
        feed: [
          {
            title: "Band",
            detail: "Collaboration room and agent handoff layer.",
            meta: "required",
            tone: "success",
          },
          {
            title: "Supabase",
            detail: "Postgres, auth, storage, realtime-ready data layer.",
            meta: "planned",
            tone: "brand",
          },
          {
            title: "AI/ML API and Featherless",
            detail: "Model providers for agent reasoning and fallback route.",
            meta: "partner path",
            tone: "info",
          },
        ],
        mainTitle: "Provider detail",
        mainSummary:
          "Provider cards show purpose, mode, last successful run, safe diagnostic status, and whether fallback is available.",
        cards: [
          {
            title: "Band",
            body: "Required for shared room state, agent message ordering, and visible handoffs.",
            meta: "configured",
            tone: "success",
          },
          {
            title: "Notification adapters",
            body: "Email and SMS can operate in safe test or simulated mode until credentials and recipients are configured.",
            meta: "guarded",
            tone: "warning",
          },
        ],
        actionTitle: "Provider actions",
        actionSummary: "Run safe diagnostics or open notification channel setup.",
        actions: [
          { label: "Run diagnostics", tone: "brand" },
          { label: "Notification setup", tone: "review" },
        ],
        status: statusItems,
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
          commonMetrics.decisions,
        ],
        feedTitle: "Channel list",
        feed: [
          {
            title: "In-app",
            detail: "Notification center, decision cards, and command-room messaging.",
            meta: "enabled",
            tone: "success",
          },
          {
            title: "Band",
            detail: "Agent room posts and human mentions.",
            meta: "enabled",
            tone: "success",
          },
          {
            title: "Email and SMS",
            detail: "Safe test or simulated mode for MVP.",
            meta: "guarded",
            tone: "warning",
          },
        ],
        mainTitle: "Channel policy",
        mainSummary:
          "The UI separates channel health from permission to send. A channel can be healthy while live external send remains disabled.",
        cards: [
          {
            title: "Safe recipients",
            body: "Test sends are limited to configured internal demo recipients.",
            meta: "allowlist",
            tone: "success",
          },
          {
            title: "Live-send lock",
            body: "External customer or regulator sending remains disabled in MVP without approval gates.",
            meta: "locked",
            tone: "warning",
          },
        ],
        actionTitle: "Channel actions",
        actionSummary: "Open a test composer or inspect delivery log behavior.",
        actions: [
          { label: "Open email", tone: "brand", kind: "tab-email" },
          { label: "Delivery log", tone: "muted", kind: "tab-delivery" },
        ],
        status: statusItems,
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
          commonMetrics.evidence,
        ],
        feedTitle: "Policy checks",
        feed: [
          {
            title: "No secrets in browser",
            detail: "Service-role and provider keys never reach client code.",
            meta: "pass",
            tone: "success",
          },
          {
            title: "Draft-only communications",
            detail: "External communication requires human approval and safe channel mode.",
            meta: "pass",
            tone: "success",
          },
          {
            title: "Fallback mode",
            detail: "Seeded data supports demo if provider calls fail.",
            meta: "enabled",
            tone: "brand",
          },
        ],
        mainTitle: "Configuration overview",
        mainSummary:
          "Environment status is shown as configured, missing, disabled, or simulated with no sensitive values.",
        cards: [
          {
            title: "Configured",
            body: "Band room adapter, Supabase placeholder, model provider route, and seeded fallback mode.",
            meta: "safe",
            tone: "success",
          },
          {
            title: "Disabled",
            body: "Live customer/regulator messaging is disabled by default in demo mode.",
            meta: "policy",
            tone: "warning",
          },
        ],
        actionTitle: "Policy actions",
        actionSummary: "Run a safe configuration check or inspect audit export readiness.",
        actions: [
          { label: "Run policy check", tone: "brand" },
          { label: "Open exports", tone: "success", kind: "navigate-audit" },
        ],
        status: statusItems,
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
          { label: "Last run", value: "OK", detail: "payment exposure path", tone: "success" },
          { label: "Risks", value: "2", detail: "provider latency and Figma review", tone: "warning" },
        ],
        feedTitle: "Demo checklist",
        feed: [
          {
            title: "Payment exposure scenario",
            detail: "Launch, agent handoff, communications gate, decision, and audit path are ready.",
            meta: "ready",
            tone: "success",
          },
          {
            title: "Seeded fallback",
            detail: "Demo can continue if Band or model provider calls are slow.",
            meta: "enabled",
            tone: "brand",
          },
          {
            title: "Safe data only",
            detail: "Screens use synthetic crisis data and no private business records.",
            meta: "pass",
            tone: "success",
          },
        ],
        mainTitle: "60-second scenario run",
        mainSummary:
          "At 2:47 AM, unauthorized access is detected. Assessment fires, Legal posts obligation window, Technical confirms scope, Communications drafts, and Escalation asks for a human decision.",
        cards: [
          {
            title: "Judge-visible value",
            body: "Band is required because every agent output changes the next agent action.",
            meta: "core proof",
            tone: "info",
          },
          {
            title: "Demo fail plan",
            body: "Seeded fallback keeps the room, decisions, communications, and audit flow visible.",
            meta: "resilient",
            tone: "success",
          },
        ],
        actionTitle: "Demo actions",
        actionSummary: "Open the command room or inspect the audit package.",
        actions: [
          { label: "Open command room", tone: "brand", kind: "navigate-command" },
          { label: "Open audit", tone: "success", kind: "navigate-audit" },
        ],
        status: statusItems,
      },
    ],
  },
];

export const commandHref = "/incidents/payment-breach";
export const communicationsHref = "/incidents/payment-breach/communications";
export const auditHref = "/incidents/payment-breach/audit";

export const pageById = new Map(pages.map((page) => [page.id, page]));
