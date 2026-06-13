#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "docs/design/figma-imports");
const outFile = path.join(outDir, "crisiscoord-responsive-triptychs.svg");

const C = {
  page: "#E5E7EB",
  shell: "#0F172A",
  shell2: "#0B1220",
  surface: "#FFFFFF",
  canvas: "#F7F8FA",
  text: "#F8FAFC",
  ink: "#0F172A",
  muted: "#64748B",
  faint: "#CBD5E1",
  border: "#D7DEE8",
  darkBorder: "#263244",
  blue: "#2563EB",
  cyan: "#0891B2",
  amber: "#D97706",
  orange: "#EA580C",
  red: "#DC2626",
  green: "#16A34A",
  violet: "#7C3AED",
};

const pages = [
  {
    n: "01",
    title: "Signal Intake And Sandbox Launcher",
    short: "Signal Intake",
    route: "/signals",
    accent: C.cyan,
    subtitle: "Convert a business signal into a safe crisis workspace.",
    tabs: [
      {
        name: "Signals",
        goal: "Review incoming signals from tools, support, vendors, or manual tabletop scenarios.",
        metrics: [["Signals", "8"], ["Critical", "2"], ["Safe", "6"], ["Blocked", "2"]],
        leftTitle: "Incoming Signal Inbox",
        leftItems: ["Security alert", "Vendor notice", "Support escalation", "Legal/compliance report"],
        centerTitle: "Selected Signal Packet",
        centerItems: ["Source and timestamp", "Affected system", "Data categories", "Confidence and unknowns"],
        rightTitle: "Start Decision",
        rightItems: ["Sanitize first", "Choose sandbox", "Preview agents", "Create room"],
        actions: ["Review Signal", "Launch Review"],
        outcome: "Clicking Review Signal opens the packet detail inside this tab; Launch Review moves to the final pre-run check.",
      },
      {
        name: "Scenarios",
        goal: "Choose a demo sandbox without uploading real customer data.",
        metrics: [["Finance", "Ready"], ["Health", "Ready"], ["Supply", "Ready"], ["Fallback", "Seeded"]],
        leftTitle: "Sandbox Library",
        leftItems: ["Payment data exposure", "Healthcare record incident", "Supply-chain compromise", "Public-company zero-day"],
        centerTitle: "Scenario Preview",
        centerItems: ["Synthetic facts only", "Expected agent sequence", "Likely decision point", "Demo-safe timeline"],
        rightTitle: "Operator Controls",
        rightItems: ["Load scenario", "Edit safe facts", "Reset seed", "Preview judges flow"],
        actions: ["Load Scenario", "Preview Flow"],
        outcome: "Clicking Load Scenario populates the safe signal packet and keeps the user on the same page.",
      },
      {
        name: "Redaction",
        goal: "Separate prompt-safe facts from protected records, secrets, and raw logs.",
        metrics: [["Safe facts", "11"], ["PII blocked", "4"], ["Secrets", "0"], ["Audit", "On"]],
        leftTitle: "Data Classifier",
        leftItems: ["Personal data", "Payment data", "Health data", "Secrets/raw logs"],
        centerTitle: "Prompt-Safe Packet",
        centerItems: ["Facts summarized", "Record samples removed", "Source references kept", "Jurisdiction hints retained"],
        rightTitle: "Validation Result",
        rightItems: ["No raw records", "No credentials", "No full card data", "Redaction audit written"],
        actions: ["Validate Packet", "Block Unsafe"],
        outcome: "Validation must pass before any agent can receive the incident context.",
      },
      {
        name: "Launch Review",
        goal: "Confirm the final facts, agents, room, and audit records before the run starts.",
        metrics: [["Agents", "5"], ["Band room", "Ready"], ["Owner", "Set"], ["Mode", "Simulated"]],
        leftTitle: "Launch Checklist",
        leftItems: ["Incident title", "Severity", "Owner role", "Allowed providers"],
        centerTitle: "Agent Run Plan",
        centerItems: ["Assessment starts first", "Legal and Technical run next", "Communications waits", "Escalation watches conflicts"],
        rightTitle: "Created On Launch",
        rightItems: ["Incident record", "Band room", "Agent run", "Audit event"],
        actions: ["Launch Room", "Cancel"],
        outcome: "Clicking Launch Room creates the records and routes the operator to the Command Room.",
      },
    ],
  },
  {
    n: "02",
    title: "Incident Registry",
    short: "Incident Registry",
    route: "/incidents",
    accent: C.blue,
    subtitle: "Find the active incident, owner, deadline, or blocked decision quickly.",
    tabs: [
      {
        name: "Queue",
        goal: "Triage active and demo incidents by severity, phase, and next action.",
        metrics: [["Open", "12"], ["Critical", "3"], ["Blocked", "5"], ["Unread", "9"]],
        leftTitle: "Incident List",
        leftItems: ["Payment system access", "Healthcare portal anomaly", "Supplier recall", "Vendor compromise"],
        centerTitle: "Selected Incident Summary",
        centerItems: ["Severity and phase", "Affected business area", "Latest agent post", "Next required action"],
        rightTitle: "Primary Actions",
        rightItems: ["Open room", "Assign owner", "Pin demo", "Mark watched"],
        actions: ["Open Room", "Assign"],
        outcome: "Clicking an incident selects it and opens a detail panel before entering the Command Room.",
      },
      {
        name: "Details",
        goal: "Show one incident's current context without leaving the registry.",
        metrics: [["Facts", "14"], ["Agents", "3/5"], ["Decisions", "2"], ["Messages", "6"]],
        leftTitle: "Selected Incident",
        leftItems: ["Business impact", "Systems affected", "Data categories", "Current phase"],
        centerTitle: "Detail Panel",
        centerItems: ["Confirmed facts", "Unknowns", "Agent state", "Recent timeline"],
        rightTitle: "Open Targets",
        rightItems: ["Command Room", "Communications", "Decision Desk", "Audit"],
        actions: ["Open Room", "View Audit"],
        outcome: "Clicking Open Room carries the selected incident, filters, and owner context forward.",
      },
      {
        name: "Owners",
        goal: "See who is responsible, who acknowledged, and who is next in the ladder.",
        metrics: [["Owners", "3"], ["Unacked", "2"], ["Backup", "1"], ["Teams", "4"]],
        leftTitle: "Role Assignments",
        leftItems: ["Incident Commander", "Legal reviewer", "Technical lead", "Communications lead"],
        centerTitle: "Acknowledgement State",
        centerItems: ["Primary owner pending", "Backup owner ready", "Band mention sent", "Escalation timer running"],
        rightTitle: "Owner Actions",
        rightItems: ["Notify owner", "Reassign", "Escalate", "Record acknowledgement"],
        actions: ["Notify Owner", "Reassign"],
        outcome: "Clicking Notify Owner opens the notification workflow for this owner, not a separate page.",
      },
      {
        name: "Deadlines",
        goal: "Sort incidents by disclosure windows, internal SLA, and unanswered decisions.",
        metrics: [["Next", "68h"], ["At risk", "2"], ["Paused", "0"], ["Done", "4"]],
        leftTitle: "Deadline Queue",
        leftItems: ["Regulator draft due", "Customer decision due", "Executive brief due", "Audit export due"],
        centerTitle: "Deadline Detail",
        centerItems: ["Clock basis", "Responsible role", "Required facts", "Blocking decision"],
        rightTitle: "Deadline Controls",
        rightItems: ["Escalate", "Request facts", "Update owner", "Add note"],
        actions: ["Escalate", "Need Facts"],
        outcome: "Clicking Escalate creates a decision or notification task with a timer and audit record.",
      },
    ],
  },
  {
    n: "03",
    title: "Crisis Command Room",
    short: "Command Room",
    route: "/incidents/:incidentId",
    accent: C.violet,
    subtitle: "Run the incident: agents, Band room, humans, messages, and decisions in one workspace.",
    tabs: [
      {
        name: "Overview",
        goal: "Show the current crisis state and what must happen next.",
        metrics: [["Severity", "Critical"], ["Records", "50k"], ["Gate", "Blocked"], ["Owner", "Awake"]],
        leftTitle: "Incident Brief",
        leftItems: ["2:47 AM signal", "Payment system", "Potential records", "Containment pending"],
        centerTitle: "Band Timeline",
        centerItems: ["Assessment posted", "Legal finding posted", "Technical scope running", "Communications blocked"],
        rightTitle: "Next Action",
        rightItems: ["Wait for scope", "Notify owner", "Open decision", "Review evidence"],
        actions: ["Run Next Agent", "Notify"],
        outcome: "The overview is the demo hero: it explains what happened and why Communications is still blocked.",
      },
      {
        name: "Agents",
        goal: "Inspect each agent's inputs, outputs, confidence, unknowns, and dependencies.",
        metrics: [["Agents", "5"], ["Complete", "2"], ["Running", "1"], ["Blocked", "1"]],
        leftTitle: "Agent Rail",
        leftItems: ["Assessment", "Legal", "Technical", "Communications", "Escalation"],
        centerTitle: "Agent Reasoning Detail",
        centerItems: ["Inputs read", "Output posted to Band", "Confidence and unknowns", "Next dependency"],
        rightTitle: "Agent Actions",
        rightItems: ["Open Band post", "Request retry", "Ask human", "Attach evidence"],
        actions: ["Open Agent", "Request Retry"],
        outcome: "Clicking an agent opens its reasoning detail and shows the exact Band handoff it depends on.",
      },
      {
        name: "Messaging",
        goal: "Coordinate humans from inside the incident without jumping to random tools.",
        metrics: [["Threads", "4"], ["Unread", "7"], ["Email", "Ready"], ["SMS", "Test only"]],
        leftTitle: "Thread Inbox",
        leftItems: ["Incident room", "Legal reviewer", "Technical lead", "Executive owner"],
        centerTitle: "Selected Thread",
        centerItems: ["Message history", "Recipient role", "Acknowledgement timer", "Delivery status"],
        rightTitle: "Composer",
        rightItems: ["Channel: in-app/email/SMS/Band", "Template preview", "Recipient allowlist", "Send-test status"],
        actions: ["Open Email", "Send Test"],
        outcome: "Clicking Email switches to the email composer state in this tab with subject, body, recipients, and warnings.",
      },
      {
        name: "Decisions",
        goal: "Resolve the human decision that is blocking the workflow.",
        metrics: [["Pending", "2"], ["Urgent", "1"], ["Escalated", "1"], ["Resolved", "3"]],
        leftTitle: "Decision Queue",
        leftItems: ["Notify customers proactively?", "Pause payment processing?", "Disclose secondary regulator?", "Assign public spokesperson?"],
        centerTitle: "Decision Detail",
        centerItems: ["Risk if approving", "Risk if waiting", "Facts available", "Facts missing"],
        rightTitle: "Human Actions",
        rightItems: ["Approve", "Need facts", "Escalate", "Record reason"],
        actions: ["Approve", "Need Facts", "Escalate"],
        outcome: "Every decision action records the human owner, reason, timestamp, evidence, and downstream unlock.",
      },
    ],
  },
  {
    n: "04",
    title: "Communications Review",
    short: "Communications",
    route: "/incidents/:incidentId/communications",
    accent: C.amber,
    subtitle: "Draft, review, and queue external or internal communications from verified facts only.",
    tabs: [
      {
        name: "Drafts",
        goal: "Review all generated drafts by audience before sending anything.",
        metrics: [["Drafts", "4"], ["Ready", "1"], ["Blocked", "2"], ["Needs legal", "1"]],
        leftTitle: "Draft Queue",
        leftItems: ["Regulator notice", "Customer notice", "Executive brief", "Support script"],
        centerTitle: "Draft Preview",
        centerItems: ["Audience", "Facts used", "Missing facts", "Legal warnings"],
        rightTitle: "Review Actions",
        rightItems: ["Approve", "Request revision", "Escalate", "Open Email"],
        actions: ["Approve Draft", "Open Email"],
        outcome: "Clicking Open Email moves to the Email tab with the selected approved draft loaded.",
      },
      {
        name: "Email",
        goal: "Compose and test an email package after approval and policy checks.",
        metrics: [["Recipients", "Test"], ["Subject", "Ready"], ["Warnings", "2"], ["Provider", "SMTP/API"]],
        leftTitle: "Recipient Inbox",
        leftItems: ["Regulator test group", "Executive owner", "Support lead", "Customer sample group"],
        centerTitle: "Email Composer",
        centerItems: ["To allowlist", "Subject", "Editable body", "Facts and warning rail"],
        rightTitle: "Send Controls",
        rightItems: ["Save draft", "Send test", "Queue package", "Disabled real send"],
        actions: ["Save Draft", "Send Test", "Queue"],
        outcome: "Clicking Send Test records a provider attempt and keeps production send disabled unless policy allows it.",
      },
      {
        name: "SMS",
        goal: "Send or simulate short acknowledgement-critical messages to internal owners.",
        metrics: [["Recipients", "3"], ["Segments", "1"], ["Unacked", "2"], ["Mode", "Test"]],
        leftTitle: "SMS Queue",
        leftItems: ["Incident Commander", "Backup owner", "Legal reviewer", "Technical lead"],
        centerTitle: "SMS Composer",
        centerItems: ["Phone/test destination", "Short body", "Segment count", "Unresolved placeholder check"],
        rightTitle: "SMS Status",
        rightItems: ["Queued", "Sent test", "Acknowledged", "Escalated"],
        actions: ["Send Test", "Escalate"],
        outcome: "Clicking Send Test sends only to allowlisted test numbers and writes delivery status to audit.",
      },
      {
        name: "Delivery Log",
        goal: "Show what was queued, simulated, sent, failed, acknowledged, or escalated.",
        metrics: [["Attempts", "9"], ["Queued", "3"], ["Failed", "1"], ["Acked", "5"]],
        leftTitle: "Attempt List",
        leftItems: ["Email test sent", "Band message posted", "SMS pending", "Escalation timed out"],
        centerTitle: "Attempt Detail",
        centerItems: ["Provider", "Channel", "Message ID", "Error or acknowledgement"],
        rightTitle: "Recovery Actions",
        rightItems: ["Retry test", "Escalate owner", "Open audit", "Copy reference"],
        actions: ["Retry Test", "Open Audit"],
        outcome: "The delivery log proves that the UI action created a traceable communication record.",
      },
    ],
  },
  {
    n: "05",
    title: "Decision Desk",
    short: "Decision Desk",
    route: "/decisions",
    accent: C.violet,
    subtitle: "A focused queue for human approvals, facts, escalations, and completed decisions.",
    tabs: [
      {
        name: "Pending",
        goal: "Show decisions waiting on a human owner.",
        metrics: [["Pending", "4"], ["Critical", "2"], ["Owners", "3"], ["Unread", "5"]],
        leftTitle: "Pending Queue",
        leftItems: ["Customer notification", "Payment pause", "Regulator timing", "Vendor disclosure"],
        centerTitle: "Decision Card",
        centerItems: ["Question", "Recommended action", "Risk if approving", "Risk if waiting"],
        rightTitle: "Action Panel",
        rightItems: ["Approve", "Need facts", "Assign", "Escalate"],
        actions: ["Approve", "Need Facts"],
        outcome: "Approval unlocks the dependent workflow and records the reason and approver.",
      },
      {
        name: "Evidence Needed",
        goal: "Collect facts required before a decision can be safely made.",
        metrics: [["Requests", "3"], ["Technical", "2"], ["Legal", "1"], ["Blocked", "2"]],
        leftTitle: "Fact Requests",
        leftItems: ["Confirmed scope", "Containment proof", "Jurisdiction impact", "Customer segment"],
        centerTitle: "Evidence Request",
        centerItems: ["Who owes it", "Why needed", "Source to attach", "Deadline"],
        rightTitle: "Request Actions",
        rightItems: ["Message owner", "Attach source", "Mark satisfied", "Escalate"],
        actions: ["Message Owner", "Attach Evidence"],
        outcome: "Clicking Message Owner opens the Messaging tab context with a prefilled fact request.",
      },
      {
        name: "Escalations",
        goal: "Handle sleeping owners, missed acknowledgements, and unresolved risks.",
        metrics: [["Escalated", "2"], ["Timers", "3"], ["Backup", "1"], ["Pages", "Test"]],
        leftTitle: "Escalation Queue",
        leftItems: ["Primary owner missed timer", "Legal reviewer unavailable", "Executive owner pending", "Backup notified"],
        centerTitle: "Escalation Detail",
        centerItems: ["Current owner", "Backup owner", "Channel attempts", "Timer history"],
        rightTitle: "Escalation Actions",
        rightItems: ["Notify backup", "Send SMS test", "Record manual call", "Pause timer"],
        actions: ["Notify Backup", "Record Call"],
        outcome: "Escalation advances the ladder and shows who is liable for the next decision.",
      },
      {
        name: "Resolved",
        goal: "Keep completed human decisions searchable and auditable.",
        metrics: [["Resolved", "8"], ["Approved", "5"], ["Rejected", "1"], ["Revised", "2"]],
        leftTitle: "Resolved Decisions",
        leftItems: ["Customer notice approved", "Payment pause rejected", "Draft revised", "Disclosure clock confirmed"],
        centerTitle: "Decision Record",
        centerItems: ["Final decision", "Owner and timestamp", "Reason", "Evidence links"],
        rightTitle: "Review Actions",
        rightItems: ["Open audit", "Copy summary", "Export", "Reopen if allowed"],
        actions: ["Open Audit", "Export"],
        outcome: "Resolved decisions become audit evidence, not transient UI state.",
      },
    ],
  },
  {
    n: "06",
    title: "Evidence And Audit",
    short: "Evidence Audit",
    route: "/incidents/:incidentId/audit",
    accent: C.green,
    subtitle: "Trace every fact, source, model result, message, and human decision.",
    tabs: [
      {
        name: "Timeline",
        goal: "Show the incident chronology with filters for agent, human, provider, and notification events.",
        metrics: [["Events", "128"], ["Agents", "34"], ["Humans", "19"], ["Messages", "21"]],
        leftTitle: "Event Filters",
        leftItems: ["Agent posts", "Human decisions", "Notifications", "Provider attempts"],
        centerTitle: "Chronological Timeline",
        centerItems: ["Timestamp", "Actor", "Action", "Reference"],
        rightTitle: "Timeline Actions",
        rightItems: ["Filter", "Open event", "Copy link", "Export slice"],
        actions: ["Filter Events", "Open Event"],
        outcome: "The timeline tab is the proof that every visible workflow generated an audit event.",
      },
      {
        name: "Evidence",
        goal: "Review source facts without exposing raw sensitive data.",
        metrics: [["Sources", "7"], ["Redacted", "4"], ["Safe", "11"], ["Needs review", "2"]],
        leftTitle: "Evidence Sources",
        leftItems: ["Alert snapshot", "System summary", "Legal source", "Technical finding"],
        centerTitle: "Evidence Detail",
        centerItems: ["Safe excerpt", "Confidence", "Redaction state", "Linked decision"],
        rightTitle: "Evidence Actions",
        rightItems: ["Attach to decision", "Mark reviewed", "Request source", "Export safe copy"],
        actions: ["Attach", "Request Source"],
        outcome: "Evidence is shown as safe summaries and references, not raw customer records.",
      },
      {
        name: "Agent Reasoning",
        goal: "Audit model/provider metadata, prompts classes, outputs, and human overrides.",
        metrics: [["Runs", "22"], ["Providers", "2"], ["Retries", "1"], ["Overrides", "3"]],
        leftTitle: "Agent Runs",
        leftItems: ["Assessment run", "Legal run", "Technical run", "Communications run"],
        centerTitle: "Reasoning Record",
        centerItems: ["Input packet ID", "Provider/model", "Output summary", "Confidence and unknowns"],
        rightTitle: "Review Actions",
        rightItems: ["Open Band post", "Compare retry", "Mark reviewed", "Flag issue"],
        actions: ["Open Run", "Flag"],
        outcome: "This tab makes AI assistance explainable without revealing sensitive prompt data.",
      },
      {
        name: "Exports",
        goal: "Build review-safe export packages for legal, executives, and judges.",
        metrics: [["Packages", "2"], ["Ready", "1"], ["Redactions", "OK"], ["Integrity", "OK"]],
        leftTitle: "Export Packages",
        leftItems: ["Executive summary", "Regulatory evidence", "Delivery log", "Decision record"],
        centerTitle: "Package Builder",
        centerItems: ["Included facts", "Excluded sensitive fields", "Band references", "Provider metadata"],
        rightTitle: "Export Controls",
        rightItems: ["Preview", "Verify chain", "Export", "Copy package ID"],
        actions: ["Preview", "Export"],
        outcome: "Export creates a review artifact with redactions, references, and integrity status.",
      },
    ],
  },
  {
    n: "07",
    title: "Integrations And Demo Readiness",
    short: "Integrations",
    route: "/settings",
    accent: C.blue,
    subtitle: "Configure partner providers, channels, policies, and demo-safe fallback.",
    tabs: [
      {
        name: "Providers",
        goal: "Show health for Band, Supabase, AI/ML API, Featherless, and fallback routes.",
        metrics: [["Band", "OK"], ["Supabase", "OK"], ["AI/ML", "Ready"], ["Fallback", "Ready"]],
        leftTitle: "Provider Cards",
        leftItems: ["Band room API", "Supabase database", "Primary model API", "Featherless fallback"],
        centerTitle: "Diagnostic Detail",
        centerItems: ["Last success", "Latency", "Error message", "Fallback state"],
        rightTitle: "Provider Actions",
        rightItems: ["Run diagnostic", "Open setup", "Test fallback", "Copy status"],
        actions: ["Run Diagnostic", "Test Fallback"],
        outcome: "Diagnostics update provider status and show whether the demo can still run without live services.",
      },
      {
        name: "Notification Channels",
        goal: "Configure email, SMTP, SMS, Band, and optional internal messaging adapters.",
        metrics: [["Email", "Test"], ["SMTP", "Optional"], ["SMS", "Test"], ["Band", "Live"]],
        leftTitle: "Channel List",
        leftItems: ["In-app", "Band", "Email/SMTP", "SMS/WhatsApp"],
        centerTitle: "Channel Setup",
        centerItems: ["Safe recipient allowlist", "Sender identity", "Webhook/status callback", "Simulated/live mode"],
        rightTitle: "Test Actions",
        rightItems: ["Send email test", "Send SMS test", "Post Band test", "View attempts"],
        actions: ["Test Email", "Test SMS"],
        outcome: "Channel tests write attempt records and never use real recipients unless explicitly enabled.",
      },
      {
        name: "Secrets And Policies",
        goal: "Show which integrations are configured without exposing secret values.",
        metrics: [["Secrets", "6"], ["Missing", "1"], ["Policies", "8"], ["Safe", "Yes"]],
        leftTitle: "Configuration Groups",
        leftItems: ["Model providers", "Notification channels", "Database", "Band"],
        centerTitle: "Policy Checks",
        centerItems: ["No secret display", "RLS enabled", "Prompt redaction", "Safe send policy"],
        rightTitle: "Admin Actions",
        rightItems: ["Copy env checklist", "Rotate outside app", "Run policy check", "Disable live sends"],
        actions: ["Run Policy Check", "Copy Checklist"],
        outcome: "Secrets are status-only in the UI; values live in environment configuration.",
      },
      {
        name: "Demo Readiness",
        goal: "Give the team a one-screen launch checklist for demo day.",
        metrics: [["Scenario", "Loaded"], ["Mode", "Safe"], ["Fallback", "Seeded"], ["Ready", "92%"]],
        leftTitle: "Demo Checklist",
        leftItems: ["Scenario seeded", "Band route ready", "Provider fallback ready", "No real sends"],
        centerTitle: "Run Controls",
        centerItems: ["Reset demo", "Start 60-second scenario", "Simulate provider outage", "Export backup screenshots"],
        rightTitle: "Failure Plan",
        rightItems: ["Seeded fallback", "Static screenshots", "Manual narration", "Known risk log"],
        actions: ["Run Demo", "Export Backup"],
        outcome: "Demo Readiness is the safety switch: it proves the experience even if a partner API is down.",
      },
    ],
  },
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rect(x, y, w, h, fill, stroke = "none", r = 0, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
}

function line(x1, y1, x2, y2, stroke = C.border, width = 1, extra = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
}

function circle(cx, cy, r, fill, stroke = "none", extra = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
}

function text(x, y, value, size = 16, fill = C.text, weight = 500, anchor = "start") {
  return `<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function wrapLines(value, maxChars) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let lineText = "";
  for (const word of words) {
    const next = lineText ? `${lineText} ${word}` : word;
    if (next.length > maxChars && lineText) {
      lines.push(lineText);
      lineText = word;
    } else {
      lineText = next;
    }
  }
  if (lineText) lines.push(lineText);
  return lines;
}

function wrappedText(
  x,
  y,
  value,
  size,
  fill,
  weight,
  maxChars,
  lineHeight = 17,
  anchor = "start",
  maxLines = 2,
) {
  return wrapLines(value, maxChars)
    .slice(0, maxLines)
    .map((lineText, i) => text(x, y + i * lineHeight, lineText, size, fill, weight, anchor))
    .join("");
}

function pill(x, y, label, fill, color = C.text, w = 0) {
  const width = w || Math.max(72, label.length * 8 + 26);
  return [
    rect(x, y, width, 28, fill, "none", 14),
    circle(x + 14, y + 14, 4, color),
    text(x + 26, y + 19, label, 12, color, 700),
  ].join("");
}

function button(x, y, w, h, label, fill, stroke = "none", color = C.text) {
  return [
    rect(x, y, w, h, fill, stroke, Math.min(10, h / 2)),
    text(x + w / 2, y + h / 2 + 5, label, h < 32 ? 10 : 11, color, 800, "middle"),
  ].join("");
}

function buttonRow(x, y, w, labels, accent, mode = "desktop") {
  const gap = mode === "mobile" ? 7 : 10;
  const base = mode === "mobile" ? 82 : 112;
  const sizes = labels.map((label) => Math.min(mode === "mobile" ? 106 : 148, Math.max(base, label.length * 7 + 34)));
  const total = sizes.reduce((sum, size) => sum + size, 0) + gap * (labels.length - 1);
  let xx = x + Math.max(0, (w - total) / 2);
  return labels
    .map((label, i) => {
      const primary = i === 0;
      const out = button(
        xx,
        y,
        sizes[i],
        32,
        label,
        primary ? accent : "#FFFFFF",
        primary ? "none" : C.border,
        primary ? C.text : C.ink,
      );
      xx += sizes[i] + gap;
      return out;
    })
    .join("");
}

function shortTabLabel(label) {
  const labels = {
    "Agent Reasoning": "Reasoning",
    "Demo Readiness": "Demo",
    "Delivery Log": "Log",
    "Evidence Needed": "Evidence",
    "Launch Review": "Launch",
    "Notification Channels": "Channels",
    "Secrets And Policies": "Policies",
  };

  return labels[label] ?? label;
}

function labelFrame(x, y, title, w) {
  return [
    text(x, y - 18, title, 18, "#111827", 850),
    text(x + w - 8, y - 18, "Editable tab-state sketch", 11, "#64748B", 650, "end"),
  ].join("");
}

function tabBar(x, y, w, page, activeTab, mode) {
  const tabs = page.tabs.map((tab) => tab.name);
  const compact = mode === "mobile";
  const visibleTabs = compact ? tabs.slice(0, 4) : tabs;
  const gap = compact ? 5 : 8;
  const h = compact ? 28 : 34;
  const chipW = compact
    ? (w - gap * (visibleTabs.length - 1)) / visibleTabs.length
    : Math.min(172, (w - gap * (visibleTabs.length - 1)) / visibleTabs.length);
  let xx = x;
  return visibleTabs
    .map((label) => {
      const active = label === activeTab.name;
      const displayLabel = compact ? shortTabLabel(label) : label;
      const out = [
        rect(xx, y, chipW, h, active ? page.accent : C.surface, active ? "none" : C.border, h / 2),
        text(
          xx + chipW / 2,
          y + (compact ? 18 : 22),
          displayLabel,
          compact ? 8 : 12,
          active ? C.text : C.ink,
          800,
          "middle",
        ),
      ].join("");
      xx += chipW + gap;
      return out;
    })
    .join("");
}

function chrome(x, y, w, h, page, tab, mode) {
  const mobile = mode === "mobile";
  const tablet = mode === "tablet";
  const side = mobile ? 0 : tablet ? 76 : 220;
  const top = mobile ? 76 : 82;
  const out = [];
  out.push(rect(x, y, w, h, C.shell, C.darkBorder, 22));
  out.push(rect(x + side, y, w - side, h, C.canvas, "none", mobile ? 22 : 0));
  if (!mobile) {
    out.push(rect(x, y, side, h, "#070B12", "none", 22));
    if (!tablet) {
      out.push(text(x + 24, y + 44, "CrisisCoord", 21, C.text, 850));
      out.push(text(x + 24, y + 68, "Global crisis response", 11, C.faint, 650));
    }
    pages.forEach((navPage, i) => {
      const yy = y + 126 + i * 46;
      const active = navPage.n === page.n;
      out.push(rect(x + 18, yy - 24, side - 36, 34, active ? "#172554" : "transparent", active ? "#1D4ED8" : "none", 8));
      out.push(circle(x + 34, yy - 7, 5, active ? page.accent : C.darkBorder));
      if (!tablet) out.push(text(x + 48, yy - 2, navPage.short, 13, active ? C.text : C.faint, 700));
    });
    out.push(rect(x + 18, y + h - 106, side - 36, 70, "#0B1220", C.darkBorder, 12));
    if (tablet) {
      out.push(circle(x + side / 2, y + h - 70, 7, C.green));
      out.push(text(x + side / 2, y + h - 44, "OK", 10, C.green, 800, "middle"));
    } else {
      out.push(text(x + 34, y + h - 74, "Route", 12, C.faint, 700));
      out.push(wrappedText(x + 34, y + h - 49, page.route, 11, C.green, 700, 20, 12, "start", 2));
    }
  }
  out.push(rect(x + side, y, w - side, top, C.surface, "none", mobile ? 22 : 0));
  out.push(text(x + side + 28, y + 34, `${page.n} ${page.title}`, mobile ? 15 : 23, C.ink, 850));
  out.push(wrappedText(x + side + 28, y + 58, tab.goal, mobile ? 9 : 12, C.muted, 650, mobile ? 42 : 96, mobile ? 12 : 16, "start", mobile ? 1 : 2));
  if (!mobile && !tablet) {
    out.push(rect(x + w - 612, y + 22, 330, 38, "#F8FAFC", "#CBD5E1", 10));
    out.push(text(x + w - 590, y + 47, "Search incidents, sources, owners", 13, C.muted, 600));
    out.push(pill(x + w - 264, y + 27, `${tab.name} tab active`, "#EDE9FE", C.violet, 210));
  } else if (tablet) {
    out.push(pill(x + w - 236, y + 27, `${tab.name} active`, "#EDE9FE", C.violet, 196));
  } else {
    out.push(rect(x + 22, y + h - 70, w - 44, 54, "#050A12", C.darkBorder, 22));
    ["Home", "List", "+", "Audit", "Me"].forEach((label, i) => {
      const xx = x + 54 + i * ((w - 108) / 4);
      out.push(circle(xx, y + h - 43, label === "+" ? 22 : 18, label === "+" ? page.accent : "#111827", C.darkBorder));
      out.push(text(xx, y + h - 38, label, label === "+" ? 21 : 9, C.text, 800, "middle"));
    });
  }
  return { svg: out.join(""), side, top };
}

function metrics(x, y, w, tab, mode) {
  const compact = mode === "mobile";
  const cols = compact ? 2 : 4;
  const gap = compact ? 10 : 16;
  const cardW = (w - gap * (cols - 1)) / cols;
  const cardH = compact ? 64 : 86;
  const rowStep = compact ? 72 : 0;
  return tab.metrics
    .map(([label, value], i) => {
      const xx = x + (i % cols) * (cardW + gap);
      const yy = y + Math.floor(i / cols) * rowStep;
      return [
        rect(xx, yy, cardW, cardH, C.surface, C.border, 12),
        text(xx + 14, yy + (compact ? 24 : 28), label, compact ? 9 : 12, C.muted, 700),
        text(xx + 14, yy + (compact ? 50 : 60), value, compact ? 18 : 26, C.ink, 850),
        circle(xx + cardW - 20, yy + (compact ? 20 : 23), 6, C.green),
      ].join("");
    })
    .join("");
}

function listPanel(x, y, w, h, title, items, accent, mode) {
  const compact = mode === "mobile";
  const rowH = compact ? 38 : 48;
  const out = [rect(x, y, w, h, C.surface, C.border, 14), text(x + 18, y + 30, title, compact ? 13 : 17, C.ink, 850)];
  items.slice(0, compact ? 3 : 4).forEach((item, i) => {
    const yy = y + 52 + i * (rowH + 8);
    out.push(rect(x + 14, yy, w - 28, rowH, "#F8FAFC", "#E2E8F0", 10));
    out.push(circle(x + 30, yy + rowH / 2, 6, [accent, C.amber, C.green, C.violet][i % 4]));
    out.push(wrappedText(x + 46, yy + (compact ? 23 : 28), item, compact ? 9 : 11, C.ink, 800, compact ? 32 : 54, compact ? 11 : 14, "start", compact ? 1 : 2));
  });
  return out.join("");
}

function composerPanel(x, y, w, h, tab, accent, mode) {
  const compact = mode === "mobile";
  const out = [rect(x, y, w, h, C.surface, C.border, 14)];
  out.push(text(x + 18, y + 30, tab.centerTitle, compact ? 13 : 17, C.ink, 850));
  const boxY = y + 52;
  out.push(rect(x + 14, boxY, w - 28, compact ? 52 : 58, "#F8FAFC", "#E2E8F0", 10));
  out.push(text(x + 30, boxY + 23, tab.centerItems[0] ?? "Recipient", compact ? 9 : 11, C.muted, 750));
  out.push(text(x + 30, boxY + (compact ? 42 : 45), "safe recipient / owner role", compact ? 10 : 13, C.ink, 850));
  out.push(rect(x + 14, boxY + (compact ? 64 : 76), w - 28, compact ? 82 : 112, "#FFFFFF", "#CBD5E1", 10));
  out.push(wrappedText(x + 30, boxY + (compact ? 88 : 104), "Draft text or selected thread appears here. Templates, warnings, and missing facts stay visible before send.", compact ? 9 : 12, C.ink, 650, compact ? 44 : 72, compact ? 12 : 16, "start", compact ? 4 : 5));
  if (!compact) {
    out.push(rect(x + 14, y + h - 104, w - 28, 42, "#FFF7ED", "#FDBA74", 10));
    out.push(text(x + 30, y + h - 78, "Warnings: approval, allowlist, provider status, redaction", 11, C.orange, 800));
  }
  out.push(buttonRow(x + 16, y + h - 48, w - 32, tab.actions, accent, mode));
  return out.join("");
}

function mainPanel(x, y, w, h, tab, accent, mode) {
  const isMessaging =
    tab.name.includes("Messaging") ||
    tab.name.includes("Email") ||
    tab.name.includes("SMS") ||
    tab.name.includes("Notification");
  if (isMessaging) return composerPanel(x, y, w, h, tab, accent, mode);
  return listPanel(x, y, w, h, tab.centerTitle, tab.centerItems, accent, mode);
}

function outcomePanel(x, y, w, h, tab, mode) {
  const compact = mode === "mobile";
  return [
    rect(x, y, w, h, "#FFF7ED", "#FDBA74", 12),
    text(x + 16, y + 24, "What happens after click", compact ? 11 : 13, C.orange, 900),
    wrappedText(x + 16, y + 46, tab.outcome, compact ? 8 : 10, "#9A3412", 750, compact ? 44 : 62, compact ? 11 : 13, "start", compact ? 3 : 4),
  ].join("");
}

function desktopFrame(x, y, page, tab) {
  const w = 1440;
  const h = 960;
  const out = [labelFrame(x, y, `Desktop / ${page.short} / ${tab.name}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, page, tab, "desktop");
  out.push(svg);
  const cx = x + side + 28;
  const cy = y + top + 28;
  const cw = w - side - 56;
  out.push(metrics(cx, cy, cw, tab, "desktop"));
  out.push(tabBar(cx, cy + 104, cw, page, tab, "desktop"));
  const mainY = cy + 154;
  out.push(listPanel(cx, mainY, 392, 336, tab.leftTitle, tab.leftItems, page.accent, "desktop"));
  out.push(mainPanel(cx + 416, mainY, 464, 336, tab, page.accent, "desktop"));
  out.push(listPanel(cx + 904, mainY, cw - 904, 206, tab.rightTitle, tab.rightItems, page.accent, "desktop"));
  out.push(outcomePanel(cx + 904, mainY + 226, cw - 904, 110, tab, "desktop"));
  out.push(rect(cx, mainY + 366, cw, 236, C.surface, C.border, 14));
  out.push(text(cx + 20, mainY + 400, "Implementation notes", 18, C.ink, 850));
  out.push(wrappedText(cx + 20, mainY + 430, tab.goal, 13, C.ink, 650, 96, 17, "start", 2));
  out.push(pill(cx + 20, mainY + 486, "Same route, different tab state", "#E0F2FE", C.cyan, 260));
  out.push(pill(cx + 300, mainY + 486, "Audit-backed action", "#ECFDF5", C.green, 210));
  out.push(pill(cx + 530, mainY + 486, "Mobile has card layout", "#F5F3FF", C.violet, 220));
  out.push(buttonRow(cx + 20, mainY + 548, 520, tab.actions, page.accent, "desktop"));
  return out.join("");
}

function tabletFrame(x, y, page, tab) {
  const w = 834;
  const h = 1112;
  const out = [labelFrame(x, y, `Tablet / ${page.short} / ${tab.name}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, page, tab, "tablet");
  out.push(svg);
  const cx = x + side + 24;
  const cy = y + top + 24;
  const cw = w - side - 48;
  out.push(metrics(cx, cy, cw, tab, "tablet"));
  out.push(tabBar(cx, cy + 104, cw, page, tab, "tablet"));
  const mainY = cy + 150;
  out.push(listPanel(cx, mainY, cw, 200, tab.leftTitle, tab.leftItems, page.accent, "tablet"));
  out.push(mainPanel(cx, mainY + 220, cw, 260, tab, page.accent, "tablet"));
  out.push(listPanel(cx, mainY + 500, cw * 0.5 - 8, 220, tab.rightTitle, tab.rightItems, page.accent, "tablet"));
  out.push(outcomePanel(cx + cw * 0.5 + 8, mainY + 500, cw * 0.5 - 8, 220, tab, "tablet"));
  return out.join("");
}

function mobileFrame(x, y, page, tab) {
  const w = 390;
  const h = 844;
  const out = [labelFrame(x, y, `Mobile / ${page.short} / ${tab.name}`, w)];
  const { svg, top } = chrome(x, y, w, h, page, tab, "mobile");
  out.push(svg);
  const cx = x + 18;
  const cy = y + top + 50;
  const cw = w - 36;
  out.push(tabBar(cx, y + top + 8, cw, page, tab, "mobile"));
  out.push(metrics(cx, cy, cw, tab, "mobile"));
  out.push(mainPanel(cx, cy + 148, cw, 166, tab, page.accent, "mobile"));
  out.push(listPanel(cx, cy + 326, cw, 132, tab.rightTitle, tab.rightItems, page.accent, "mobile"));
  out.push(outcomePanel(cx, cy + 468, cw, 84, tab, "mobile"));
  return out.join("");
}

function tabRow(x, y, page, tab) {
  const out = [];
  out.push(text(x, y, `${page.n} / ${tab.name}`, 28, "#111827", 900));
  out.push(wrappedText(x, y + 30, tab.goal, 14, "#475569", 650, 120, 17, "start", 2));
  out.push(pill(x + 1190, y - 4, "Tab detail state", "#E0F2FE", C.cyan, 190));
  out.push(pill(x + 1400, y - 4, "Desktop + tablet + mobile", "#ECFDF5", C.green, 240));
  out.push(pill(x + 1660, y - 4, "No new route", "#FFF7ED", C.orange, 150));
  const fy = y + 78;
  out.push(desktopFrame(x, fy, page, tab));
  out.push(tabletFrame(x + 1520, fy, page, tab));
  out.push(mobileFrame(x + 2434, fy, page, tab));
  return out.join("");
}

function pageSection(x, y, page) {
  const out = [];
  out.push(text(x, y, `${page.n} ${page.title}`, 34, "#111827", 900));
  out.push(text(x, y + 34, `${page.route} - ${page.subtitle}`, 15, "#475569", 650));
  out.push(tabBar(x, y + 58, 720, page, page.tabs[0], "desktop"));
  page.tabs.forEach((tab, tabIndex) => {
    out.push(tabRow(x, y + 118 + tabIndex * tabRowH, page, tab));
  });
  return out.join("");
}

const boardW = 2924;
const margin = 90;
const tabRowH = 1238;
const pageSectionH = 118 + tabRowH * 4 + 70;
const boardH = margin * 2 + 80 + pages.length * pageSectionH;
const parts = [];

parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}">`);
parts.push(rect(0, 0, boardW, boardH, C.page));
parts.push(text(margin, 58, "CrisisCoord Responsive Tab-State Matrix", 38, "#111827", 900));
parts.push(text(margin, 88, "Seven product routes, four working tabs each, and desktop/tablet/mobile frames for every tab state. Total: 84 responsive frames.", 15, "#475569", 650));
parts.push(pill(boardW - 870, 44, "Tabs are real work modes, not annotations", "#FFFFFF", "#0F172A", 360));
parts.push(pill(boardW - 490, 44, "Email/SMS/messaging modeled", "#FFFFFF", "#0F172A", 270));
parts.push(pill(boardW - 200, 44, "Generated source", "#FFFFFF", "#0F172A", 160));

pages.forEach((page, i) => {
  parts.push(pageSection(margin, 150 + i * pageSectionH, page));
});

parts.push("</svg>\n");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, parts.join(""), "utf8");
console.log(outFile);
