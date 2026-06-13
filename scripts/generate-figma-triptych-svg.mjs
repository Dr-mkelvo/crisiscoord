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

const workspaces = [
  {
    n: "01",
    title: "Signal Intake And Sandbox Launcher",
    short: "Signal Intake",
    subtitle: "Turn a real business signal into a controlled crisis workspace.",
    accent: C.cyan,
    route: "/signals",
    tabs: ["Sources", "Sandbox", "Validation"],
    metrics: [["Signals", "8"], ["Live feeds", "5"], ["Sandbox", "Finance"], ["Ready", "5 agents"]],
    feed: ["CISA KEV: payment gateway CVE match", "SIEM alert: unusual card-token query volume", "GitHub advisory: dependency risk found"],
    primary: {
      title: "Sanitized Signal Builder",
      rows: [
        ["Source", "SIEM, vendor notice, legal report, support escalation"],
        ["Sandbox", "Finance selected, Health and Supply Chain available"],
        ["Safe facts", "Affected system, category, time, confidence, source link"],
        ["Blocked data", "No customer records, secrets, payment data, or raw logs"],
      ],
      actions: ["Launch Room", "Preview Agents"],
      outcome: "Launch creates incident, Band room, Assessment run, audit event, and opens Command Room.",
    },
    decision: "Launch command room",
    decisionMeta: "Operator confirms sanitized facts before agents run.",
    notifications: ["Band room created", "Operator assigned", "Demo mode shown"],
    detail: {
      title: "Expected Response Flow",
      rows: ["Assessment classifies severity", "Legal and Technical read shared context", "Communications stays blocked until facts exist", "Escalation opens a human decision when needed"],
    },
    interaction: {
      title: "Launch Confirmation Drawer",
      subtitle: "Opened from Launch Room after the user reviews sanitized facts.",
      tabs: ["Signal", "Agents", "Safety"],
      leftTitle: "Before launch",
      leftRows: ["Signal source locked", "Sandbox selected", "Sensitive fields redacted", "Expected agents previewed"],
      drawerTitle: "Launch Command Room",
      drawerRows: ["Create incident record", "Open Band room", "Queue Assessment agent", "Write audit event"],
      actions: ["Cancel", "Launch Room"],
      outcome: "User lands in Command Room with room ID, agent roster, and notification status.",
    },
  },
  {
    n: "02",
    title: "Incident Registry",
    short: "Incident Registry",
    subtitle: "Prioritize active crises without burying users in dense tables.",
    accent: C.blue,
    route: "/incidents",
    tabs: ["Active", "Deadlines", "Owners"],
    metrics: [["Open", "12"], ["Critical", "3"], ["Decisions", "5"], ["Next SLA", "71h"]],
    feed: ["Payment system access review", "Healthcare portal data anomaly", "Supplier recall coordination"],
    primary: {
      title: "Incident Triage List",
      rows: [
        ["Critical", "Payment access", "Legal active", "Open room"],
        ["High", "Healthcare portal", "Decision due", "Review"],
        ["Medium", "Supplier recall", "Draft pending", "Open"],
        ["High", "Vendor compromise", "Technical running", "Watch"],
      ],
      actions: ["Open Room", "Filter Urgent"],
      outcome: "Open Room loads the Command Room with owner, deadline, agent state, and audit context.",
    },
    decision: "Open incident",
    decisionMeta: "Registry routes users to work, not reports.",
    notifications: ["2 owners unacknowledged", "1 deadline risk", "Backup owner next"],
    detail: {
      title: "Registry Behavior",
      rows: ["Sort by severity plus deadline", "Show owner and next action", "Avoid dense tables on mobile", "Keep demo incident pinned for judges"],
    },
    interaction: {
      title: "Incident Detail Drawer",
      subtitle: "Opened from Open Room or any incident list row.",
      tabs: ["Summary", "Owners", "History"],
      leftTitle: "Selected incident",
      leftRows: ["Severity and phase", "Deadline risk", "Decision status", "Primary owner"],
      drawerTitle: "Open Incident Workspace",
      drawerRows: ["Load Command Room", "Carry active filters", "Preserve owner context", "Show latest Band event"],
      actions: ["Back", "Open Room"],
      outcome: "Command Room opens with the selected incident, owner, deadline, and active agent state.",
    },
  },
  {
    n: "03",
    title: "Crisis Command Room",
    short: "Command Room",
    subtitle: "The hero workspace where five agents coordinate through Band.",
    accent: C.violet,
    route: "/incidents/:incidentId",
    tabs: ["Overview", "Handoffs", "Notifications", "Audit"],
    metrics: [["Severity", "Critical"], ["Records", "50k"], ["EU confirmed", "12.4k"], ["Gate", "Blocked"]],
    feed: ["Assessment: breach signal classified", "Legal: GDPR Article 33 clock active", "Technical: containment evidence pending"],
    timeline: ["02:47 signal received", "02:49 Assessment posted", "02:54 Legal obligation posted", "03:02 Technical scope posted"],
    primary: {
      title: "Band Agent Handoff",
      rows: [
        ["Assessment", "Complete: crisis type, severity, facts, unknowns"],
        ["Legal", "Complete: duties, deadlines, missing facts"],
        ["Technical", "Running: scope, affected systems, containment"],
        ["Communications", "Blocked until Legal and Technical are complete"],
        ["Escalation", "Creates human decision when risk is unclear"],
      ],
      actions: ["Run Next Agent", "Notify Owner"],
      outcome: "Every agent post writes a Band event, Supabase record, and audit entry.",
    },
    decision: "Customer notification decision",
    decisionMeta: "Incident Commander must decide before external notice is queued.",
    notifications: ["Legal reviewer notified", "SMS fallback armed", "Band mention sent"],
    detail: {
      title: "Dependency Gate",
      rows: ["Communications blocked until Legal facts exist", "Technical scope required before customer wording", "Human decision required before proactive notice", "No external send before approval"],
    },
    interaction: {
      title: "Notification Drawer",
      subtitle: "Opened from Notify Owner, Email/SMS, or escalation items.",
      tabs: ["In-app", "Email", "SMS", "Band"],
      leftTitle: "Notification queue",
      leftRows: ["Primary owner pending", "Band mention sent", "Email draft ready", "SMS fallback armed"],
      drawerTitle: "Notify Human Owner",
      drawerRows: ["Choose channel", "Confirm recipient role", "Preview message", "Start acknowledgement timer"],
      actions: ["Save Draft", "Send Test", "Escalate"],
      outcome: "Creates notification and attempt records; real sends require configured safe recipients.",
    },
  },
  {
    n: "04",
    title: "Communications Review",
    short: "Communications",
    subtitle: "Draft regulator, customer, and executive communications from verified facts only.",
    accent: C.amber,
    route: "/incidents/:incidentId/communications",
    tabs: ["Drafts", "Review", "Send Log"],
    metrics: [["Drafts", "3"], ["Facts used", "9"], ["Missing", "2"], ["Review", "Legal"]],
    feed: ["Regulator notice uses confirmed EU scope", "Customer notice waiting on proactive decision", "Executive brief ready for review"],
    primary: {
      title: "Draft Review Workspace",
      rows: [
        ["Audience", "Regulator, customer, executive, support"],
        ["Facts used", "Legal obligations plus Technical scope"],
        ["Missing", "Final customer-notification decision"],
        ["Warning", "Human approval required before queue or send"],
      ],
      actions: ["Approve Draft", "Request Revision", "Queue Package"],
      outcome: "Approve locks the draft version. Queue creates a simulated delivery package and audit record.",
    },
    decision: "Approve, revise, or escalate",
    decisionMeta: "Owner sees facts, missing facts, and legal warnings before action.",
    notifications: ["Draft review owner paged", "Email test package ready", "Customer notice still blocked"],
    detail: {
      title: "Outbound Package State",
      rows: ["Draft only until approved", "Queue is simulated for demo safety", "Provider ID stored when enabled", "Audit shows audience, facts, approver, and status"],
    },
    interaction: {
      title: "Email Composer Drawer",
      subtitle: "Opened from Email/SMS or Queue Package after human approval checks.",
      tabs: ["Email", "SMS", "Status"],
      leftTitle: "Communication package",
      leftRows: ["Audience selected", "Subject generated", "Facts locked", "Missing facts visible"],
      drawerTitle: "Approved Email Draft",
      drawerRows: ["To: test-safe recipients only", "Subject and body editable", "Facts used and warnings shown", "SMTP/provider status checked"],
      actions: ["Save Draft", "Send Test", "Queue"],
      outcome: "Queued communication writes provider status, simulated flag, Band reference, and audit event.",
    },
  },
  {
    n: "05",
    title: "Decision Desk",
    short: "Decision Desk",
    subtitle: "Human-in-the-loop decisions with approve, wait, and escalate tradeoffs.",
    accent: C.violet,
    route: "/decisions",
    tabs: ["Pending", "Escalated", "Resolved"],
    metrics: [["Pending", "4"], ["Urgent", "2"], ["Escalated", "1"], ["Owners", "3"]],
    feed: ["Notify customers proactively?", "Pause payment processing?", "Disclose to secondary regulator?"],
    primary: {
      title: "Decision Detail",
      rows: [
        ["Decision", "Notify affected customers proactively?"],
        ["Risk if approving", "Over-notification, reputational impact, legal wording risk"],
        ["Risk if waiting", "Missed duty, delayed trust recovery, escalation risk"],
        ["Owner", "Incident Commander, backup owner in timer"],
      ],
      actions: ["Approve", "Need Facts", "Escalate"],
      outcome: "Approve writes a human decision. Escalate pages backup owner and resets acknowledgement timer.",
    },
    decision: "Approve decision",
    decisionMeta: "Every choice records owner, time, reason, and evidence links.",
    notifications: ["Primary owner unacknowledged", "Backup owner next", "SMS fallback ready"],
    detail: {
      title: "Acknowledgement Ladder",
      rows: ["Primary owner notified", "If no acknowledgement, backup owner is notified", "Incident Commander sees final escalation", "Decision remains visible until resolved"],
    },
    interaction: {
      title: "Escalation Action Sheet",
      subtitle: "Opened from Escalate, Need Facts, or an unacknowledged decision.",
      tabs: ["Decision", "Channels", "Timer"],
      leftTitle: "Decision context",
      leftRows: ["Risk if approving", "Risk if waiting", "Evidence links", "Assigned owner"],
      drawerTitle: "Escalate Decision",
      drawerRows: ["Notify backup owner", "Send Band mention", "Optional email/SMS if configured", "Reset acknowledgement timer"],
      actions: ["Need Facts", "Notify", "Escalate"],
      outcome: "Escalation advances the ladder and records who was notified, by channel, and when.",
    },
  },
  {
    n: "06",
    title: "Evidence And Audit",
    short: "Evidence Audit",
    subtitle: "Every fact, model result, source, timestamp, and human action is traceable.",
    accent: C.green,
    route: "/incidents/:incidentId/audit",
    tabs: ["Timeline", "Evidence", "Exports"],
    metrics: [["Events", "128"], ["Sources", "7"], ["Exports", "2"], ["Integrity", "OK"]],
    feed: ["CISA KEV source snapshot", "Band message reference", "AI provider metadata redacted"],
    primary: {
      title: "Audit Trail And Delivery Log",
      rows: [
        ["Fact", "Source, timestamp, confidence, redaction state"],
        ["Agent output", "Provider, model, prompt class, Band message ID"],
        ["Human action", "Owner, decision, acknowledgement, reason"],
        ["Notification", "Channel, simulated/provider ID, status, retry count"],
      ],
      actions: ["Export Package", "Verify Chain"],
      outcome: "Export packages facts, decisions, notifications, provider metadata, and Band references.",
    },
    decision: "Export audit package",
    decisionMeta: "Exports are review artifacts, not raw sensitive data dumps.",
    notifications: ["Delivery attempt logged", "Acknowledgement recorded", "Audit export ready"],
    detail: {
      title: "Audit Rules",
      rows: ["Raw sensitive data is redacted", "Every external draft has an approver", "Every notification attempt is stored", "Every model call has provider metadata"],
    },
    interaction: {
      title: "Export Review Modal",
      subtitle: "Opened from Export Package or Verify Chain.",
      tabs: ["Package", "Chain", "Redactions"],
      leftTitle: "Export contents",
      leftRows: ["Facts and sources", "Agent outputs", "Human decisions", "Notification attempts"],
      drawerTitle: "Audit Export",
      drawerRows: ["Redactions confirmed", "Provider metadata included", "Band references linked", "Integrity check passed"],
      actions: ["Cancel", "Export"],
      outcome: "Creates a review-safe audit artifact without exposing raw sensitive data.",
    },
  },
  {
    n: "07",
    title: "Integrations And Demo Readiness",
    short: "Integrations",
    subtitle: "Show the partner stack, diagnostics, fallback mode, and demo safety.",
    accent: C.blue,
    route: "/settings",
    tabs: ["Providers", "Secrets", "Demo"],
    metrics: [["Band", "OK"], ["Supabase", "OK"], ["AI/ML", "Ready"], ["Fallback", "Seeded"]],
    feed: ["Band room active", "Supabase RLS check passed", "Featherless fallback model ready"],
    primary: {
      title: "Provider Readiness Matrix",
      rows: [
        ["Band", "Room, messages, and handoff events healthy"],
        ["Supabase", "RLS, audit tables, and realtime status healthy"],
        ["AI/ML API", "Primary reasoning provider configured"],
        ["Featherless", "Fallback model route ready"],
        ["Email/SMS", "Simulated mode unless safe test recipients are configured"],
      ],
      actions: ["Run Diagnostics", "Seed Demo"],
      outcome: "Diagnostics show last success, fallback mode, missing secrets, and safe-send status.",
    },
    decision: "Run demo scenario",
    decisionMeta: "Demo uses synthetic facts and test-safe notification paths.",
    notifications: ["Provider status refreshed", "Seeded fallback ready", "No real recipients active"],
    detail: {
      title: "Demo Safety",
      rows: ["Live, assisted, seeded, and simulated labels are visible", "No production incident data enters prompts", "Notification providers require safe test recipients", "Fallback still shows the full workflow"],
    },
    interaction: {
      title: "Provider Setup Drawer",
      subtitle: "Opened from Run Diagnostics, Email/SMS status, or provider cards.",
      tabs: ["Email", "SMS", "Band", "Models"],
      leftTitle: "Provider checklist",
      leftRows: ["SMTP or API key configured", "Verified sender domain", "Test recipients only", "Fallback mode ready"],
      drawerTitle: "Email/SMS Configuration",
      drawerRows: ["SMTP host or Resend API key", "From address and reply-to", "Safe recipient allowlist", "Last diagnostic result"],
      actions: ["Test Email", "Test SMS", "Save"],
      outcome: "Provider setup enables test sends only; production sends stay disabled until policy checks pass.",
    },
  },
];

function esc(s) {
  return String(s)
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
  words.forEach((word) => {
    const next = lineText ? `${lineText} ${word}` : word;
    if (next.length > maxChars && lineText) {
      lines.push(lineText);
      lineText = word;
    } else {
      lineText = next;
    }
  });
  if (lineText) lines.push(lineText);
  return lines;
}

function wrappedText(x, y, value, size, fill, weight, maxChars, lineHeight = 17, anchor = "start", maxLines = 2) {
  const lines = wrapLines(value, maxChars).slice(0, maxLines);
  return lines.map((lineText, i) => text(x, y + i * lineHeight, lineText, size, fill, weight, anchor)).join("");
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

function buttonRow(x, y, w, items, accent, mode = "desktop") {
  const gap = mode === "mobile" ? 8 : 10;
  const sizes = items.map((label, i) => {
    const base = mode === "mobile" ? 88 : 116;
    const labelSize = Math.min(mode === "mobile" ? 112 : 148, Math.max(base, label.length * 8 + 34));
    return i === 0 ? labelSize : Math.max(mode === "mobile" ? 80 : 104, labelSize - 12);
  });
  const total = sizes.reduce((sum, size) => sum + size, 0) + gap * (items.length - 1);
  let xx = x + Math.max(0, (w - total) / 2);
  const out = [];
  items.forEach((label, i) => {
    const primary = i === 0;
    const isWarn = label.includes("Escalate") || label.includes("Queue");
    out.push(button(xx, y, sizes[i], 32, label, primary ? accent : "#FFFFFF", primary ? "none" : (isWarn ? "#FDBA74" : "#C4B5FD"), primary ? C.text : (isWarn ? C.orange : C.violet)));
    xx += sizes[i] + gap;
  });
  return out.join("");
}

function labelFrame(x, y, title, w) {
  return [
    text(x, y - 18, title, 20, "#111827", 800),
    text(x + w - 8, y - 18, "Editable sketch target", 12, "#64748B", 600, "end"),
  ].join("");
}

function chrome(x, y, w, h, ws, mode) {
  const mobile = mode === "mobile";
  const tablet = mode === "tablet";
  const side = mobile ? 0 : tablet ? 76 : 220;
  const top = mobile ? 76 : 82;
  const out = [];
  out.push(rect(x, y, w, h, C.shell, C.darkBorder, 22));
  out.push(rect(x + side, y, w - side, h, C.canvas, "none", 0));
  if (!mobile) {
    out.push(rect(x, y, side, h, "#070B12", "none", 22));
    out.push(text(x + 24, y + 44, "CrisisCoord", 21, C.text, 800));
    out.push(text(x + 24, y + 68, "Enterprise response", 11, C.faint, 600));
    const nav = ["Signal", "Registry", "Command", "Communications", "Decision", "Audit", "Demo"];
    nav.forEach((name, i) => {
      const yy = y + 126 + i * 46;
      const active =
        ws.title.includes(name) ||
        (name === "Command" && ws.n === "03") ||
        (name === "Demo" && ws.n === "07");
      out.push(rect(x + 18, yy - 24, side - 36, 34, active ? "#172554" : "transparent", active ? "#1D4ED8" : "none", 8));
      out.push(circle(x + 34, yy - 7, 5, active ? ws.accent : C.darkBorder));
      if (!tablet) out.push(text(x + 48, yy - 2, name, 13, active ? C.text : C.faint, 700));
    });
    out.push(rect(x + 18, y + h - 106, side - 36, 70, "#0B1220", C.darkBorder, 12));
    if (tablet) {
      out.push(circle(x + side / 2, y + h - 70, 7, C.green));
      out.push(text(x + side / 2, y + h - 44, "OK", 10, C.green, 800, "middle"));
    } else {
      out.push(text(x + 34, y + h - 74, "Source status", 12, C.faint, 700));
      out.push(text(x + 34, y + h - 48, "Live + seeded fallback", 11, C.green, 700));
    }
  }
  out.push(rect(x + side, y, w - side, top, C.surface, "none", mobile ? 22 : 0));
  out.push(text(x + side + 28, y + 34, `${ws.n} ${ws.title}`, mobile ? 16 : 23, C.ink, 800));
  out.push(wrappedText(x + side + 28, y + 58, ws.subtitle, mobile ? 9 : 12, C.muted, 600, mobile ? 44 : 86, mobile ? 12 : 16, "start", mobile ? 1 : 2));
  if (!mobile && !tablet) {
    out.push(rect(x + w - 612, y + 22, 330, 38, "#F8FAFC", "#CBD5E1", 10));
    out.push(text(x + w - 590, y + 47, "Search incidents, CVEs, sources, owners", 13, C.muted, 600));
    out.push(pill(x + w - 264, y + 27, "3 pending actions", "#EDE9FE", C.violet, 210));
  } else if (tablet) {
    out.push(pill(x + w - 230, y + 27, "3 pending actions", "#EDE9FE", C.violet, 190));
  } else {
    out.push(rect(x + 22, y + h - 70, w - 44, 54, "#050A12", C.darkBorder, 22));
    ["Home", "List", "+", "Audit", "Me"].forEach((label, i) => {
      const xx = x + 54 + i * ((w - 108) / 4);
      out.push(circle(xx, y + h - 43, label === "+" ? 22 : 18, label === "+" ? ws.accent : "#111827", C.darkBorder));
      out.push(text(xx, y + h - 38, label, label === "+" ? 21 : 9, C.text, 800, "middle"));
    });
  }
  return { svg: out.join(""), side, top };
}

function metricCards(x, y, w, ws, mode) {
  const out = [];
  const mobile = mode === "mobile";
  const cols = mobile ? 2 : 4;
  const gap = mobile ? 10 : 16;
  const cardW = (w - gap * (cols - 1)) / cols;
  const cardH = mobile ? 64 : 86;
  const rowStep = mobile ? 72 : 0;
  ws.metrics.forEach((metric, i) => {
    const xx = x + (i % cols) * (cardW + gap);
    const yy = y + Math.floor(i / cols) * rowStep;
    out.push(rect(xx, yy, cardW, cardH, C.surface, C.border, 12));
    out.push(text(xx + 14, yy + (mobile ? 24 : 28), metric[0], mobile ? 9 : 12, C.muted, 700));
    out.push(text(xx + 14, yy + (mobile ? 50 : 60), metric[1], mobile ? 18 : 28, C.ink, 800));
    out.push(circle(xx + cardW - 20, yy + (mobile ? 20 : 23), 6, ws.accent));
  });
  return out.join("");
}

function tabBar(x, y, w, ws, mode) {
  const tabs = ws.tabs ?? [];
  const compact = mode === "mobile";
  const visibleTabs = compact ? tabs.slice(0, 3) : tabs;
  const gap = compact ? 6 : 8;
  const h = compact ? 28 : 34;
  const out = [];
  const calculated = visibleTabs.map((label) =>
    compact ? 0 : Math.max(102, Math.min(156, label.length * 8 + 34)),
  );
  const chipW = compact
    ? (w - gap * (visibleTabs.length - 1)) / visibleTabs.length
    : Math.min(156, (w - gap * (visibleTabs.length - 1)) / visibleTabs.length);
  let xx = x;
  visibleTabs.forEach((label, i) => {
    const active = i === 0;
    const width = compact ? chipW : Math.min(calculated[i], chipW);
    out.push(rect(xx, y, width, h, active ? ws.accent : C.surface, active ? "none" : C.border, h / 2));
    out.push(text(xx + width / 2, y + (compact ? 18 : 22), label, compact ? 9 : 12, active ? C.text : C.ink, 800, "middle"));
    xx += width + gap;
  });
  if (compact && tabs.length > visibleTabs.length) {
    out.push(text(x + w - 4, y + 18, "...", 10, C.muted, 800, "end"));
  }
  return out.join("");
}

function sourceFeed(x, y, w, h, ws, mode) {
  const compact = mode === "mobile";
  const out = [rect(x, y, w, h, C.surface, C.border, 14), text(x + 18, y + 30, compact ? "Source Feed" : "Event Ledger And Source Feed", compact ? 13 : 17, C.ink, 800)];
  ws.feed.slice(0, compact ? 2 : 3).forEach((item, i) => {
    const rowH = compact ? 50 : 58;
    const yy = y + 50 + i * (rowH + 8);
    out.push(rect(x + 14, yy, w - 28, rowH, "#F8FAFC", "#E2E8F0", 10));
    out.push(circle(x + 30, yy + 21, 6, [ws.accent, C.amber, C.green][i % 3]));
    out.push(wrappedText(x + 46, yy + 19, item, compact ? 9 : 12, C.ink, 800, compact ? 32 : 48, compact ? 13 : 16, "start", 2));
    if (!compact) out.push(text(x + 46, yy + 43, "source linked - confidence shown - timestamp kept", 10, C.muted, 600));
  });
  return out.join("");
}

function agentMap(x, y, w, h, ws, mode) {
  const compact = mode !== "desktop";
  const out = [];
  out.push(rect(x, y, w, h, "#08111F", "#233044", 16));
  out.push(text(x + 20, y + 32, "Band Agent Handoff", compact ? 14 : 18, C.text, 800));
  out.push(wrappedText(x + 20, y + 54, "Click a node to see inputs, outputs, confidence, unknowns, Band reference, and next dependency.", compact ? 9 : 12, C.faint, 600, compact ? 72 : 86, compact ? 12 : 16, "start", 2));
  const cx = x + w * 0.48;
  const cy = y + h * 0.58;
  const nodes = [
    ["Assessment", x + w * 0.2, y + h * 0.46, C.cyan],
    ["Legal", x + w * 0.36, y + h * 0.28, C.amber],
    ["Technical", x + w * 0.68, y + h * 0.33, C.blue],
    ["Communications", x + w * 0.72, y + h * 0.66, C.violet],
    ["Escalation", x + w * 0.28, y + h * 0.74, C.red],
  ];
  nodes.forEach(([, nx, ny, color]) => out.push(line(cx, cy, nx, ny, color, 2, 'opacity="0.58"')));
  out.push(circle(cx, cy, compact ? 25 : 34, ws.accent, "#E0F2FE", 'stroke-width="3"'));
  out.push(text(cx, cy + 5, "Band", compact ? 11 : 15, C.text, 800, "middle"));
  nodes.forEach(([name, nx, ny, color]) => {
    out.push(circle(nx, ny, compact ? 14 : 20, color, "#E5E7EB", 'stroke-width="2"'));
    out.push(text(nx, ny + (compact ? 30 : 38), name, compact ? 8 : 11, C.faint, 700, "middle"));
  });
  return out.join("");
}

function timeline(x, y, w, h, ws, mode = "desktop") {
  const compact = mode !== "desktop" || h < 210;
  const events = ws.timeline || ws.primary.rows.map((row) => row[0]);
  const out = [rect(x, y, w, h, C.surface, C.border, 14), text(x + 18, y + 30, compact ? "Band Timeline" : "Live Band Timeline", compact ? 13 : 17, C.ink, 800)];
  events.slice(0, compact ? 3 : 4).forEach((event, i) => {
    const yy = y + 58 + i * (compact ? 40 : 56);
    out.push(circle(x + 24, yy, 7, i === 0 ? ws.accent : C.green));
    if (i < Math.min(events.length, compact ? 3 : 4) - 1) out.push(line(x + 24, yy + 7, x + 24, yy + (compact ? 34 : 48), "#CBD5E1", 2));
    out.push(wrappedText(x + 44, yy - 2, event, compact ? 10 : 12, C.ink, 800, compact ? 28 : 42, compact ? 12 : 15, "start", 2));
    if (!compact) out.push(text(x + 44, yy + 28, "source linked - confidence shown - timestamp kept", 10, C.muted, 600));
  });
  return out.join("");
}

function notificationPanel(x, y, w, h, ws, mode) {
  const compact = mode === "mobile" || h < 190;
  const out = [rect(x, y, w, h, C.surface, C.border, 14)];
  out.push(text(x + 18, y + 30, "Notification Center", compact ? 13 : 17, C.ink, 800));
  out.push(pill(x + w - (compact ? 122 : 150), y + 12, "2 unacked", "#FEF3C7", C.amber, compact ? 108 : 132));
  const rows = [
    ["Band", ws.notifications[0], C.violet],
    ["Email/SMS", ws.notifications[1], C.cyan],
    ["Escalation", ws.notifications[2], C.orange],
  ];
  rows.slice(0, compact ? 2 : 3).forEach(([label, detail, color], i) => {
    const rowH = compact ? 28 : 44;
    const yy = y + (compact ? 48 : 56) + i * (rowH + (compact ? 6 : 8));
    out.push(rect(x + 14, yy, w - 28, rowH, "#F8FAFC", "#E2E8F0", 9));
    out.push(circle(x + 30, yy + rowH / 2, 6, color));
    out.push(text(x + 46, yy + (compact ? 12 : 16), label, compact ? 8 : 11, C.ink, 800));
    out.push(wrappedText(x + 46, yy + (compact ? 23 : 30), detail, compact ? 6 : 9, C.muted, 650, compact ? 34 : 48, compact ? 8 : 12, "start", 1));
  });
  return out.join("");
}

function decisionCard(x, y, w, h, ws, mode) {
  const compact = mode === "mobile";
  const actions = compact ? ["Ack", "Escalate"] : ["Acknowledge", "Escalate"];
  const out = [rect(x, y, w, h, "#FAF5FF", "#C4B5FD", 14), pill(x + 16, y + 14, "Human review", "#EDE9FE", C.violet, compact ? 118 : 132)];
  out.push(wrappedText(x + 18, y + 60, ws.decision, compact ? 14 : 18, "#3B0764", 800, compact ? 26 : 36, compact ? 16 : 21, "start", 2));
  out.push(wrappedText(x + 18, y + (compact ? 92 : 102), ws.decisionMeta, compact ? 8 : 10, "#6B21A8", 650, compact ? 46 : 60, compact ? 11 : 13, "start", compact ? 1 : 2));
  if (!compact && h > 180) {
    out.push(rect(x + 18, y + 126, w - 36, 34, "#FFFFFF", "#DDD6FE", 9));
    out.push(text(x + 30, y + 148, "Owner: Incident Commander - acknowledgement due in 8m", 11, "#4C1D95", 800));
  }
  out.push(buttonRow(x + 18, y + h - (compact ? 38 : 46), w - 36, actions, C.violet, mode));
  return out.join("");
}

function outcomeStrip(x, y, w, h, ws, mode) {
  const compact = mode === "mobile";
  const maxChars = compact ? 46 : Math.max(36, Math.floor((w - 32) / 6.4));
  const out = [rect(x, y, w, h, "#FFF7ED", "#FDBA74", 12)];
  out.push(text(x + 16, y + 24, "After click", compact ? 11 : 13, C.orange, 900));
  out.push(wrappedText(x + 16, y + 46, ws.primary.outcome, compact ? 8 : 10, "#9A3412", 700, maxChars, compact ? 11 : 13, "start", compact ? 3 : 3));
  return out.join("");
}

function primaryPanel(x, y, w, h, ws, mode) {
  if (ws.n === "03") return agentMap(x, y, w, h, ws, mode);
  const compact = mode === "mobile";
  const out = [rect(x, y, w, h, C.surface, C.border, 14)];
  out.push(text(x + 18, y + 30, ws.primary.title, compact ? 13 : 17, C.ink, 800));
  const rows = ws.primary.rows.slice(0, compact ? 1 : 5);
  const rowH = compact ? 34 : Math.min(58, Math.max(42, (h - 112) / Math.max(rows.length, 1)));
  rows.forEach((row, i) => {
    const yy = y + 52 + i * (rowH + (compact ? 6 : 8));
    const label = Array.isArray(row) ? row[0] : row;
    const detail = Array.isArray(row) ? row.slice(1).join(" - ") : "";
    out.push(rect(x + 14, yy, w - 28, rowH, "#F8FAFC", "#E2E8F0", 10));
    out.push(circle(x + 30, yy + rowH / 2, 6, [ws.accent, C.amber, C.green, C.violet, C.blue][i % 5]));
    out.push(text(x + 46, yy + 18, label, compact ? 9 : 11, C.ink, 900));
    if (detail) out.push(wrappedText(x + 46, yy + (compact ? 31 : 34), detail, compact ? 7 : 10, C.muted, 650, compact ? 38 : 70, compact ? 9 : 13, "start", 1));
  });
  out.push(buttonRow(x + 18, y + h - (compact ? 40 : 46), w - 36, ws.primary.actions.slice(0, compact ? 2 : 3), ws.accent, mode));
  return out.join("");
}

function detailPanel(x, y, w, h, ws, mode) {
  const compact = mode === "mobile";
  const out = [rect(x, y, w, h, C.surface, C.border, 14), text(x + 18, y + 30, ws.detail.title, compact ? 13 : 17, C.ink, 800)];
  ws.detail.rows.slice(0, compact ? 3 : 4).forEach((row, i) => {
    const yy = y + 58 + i * (compact ? 34 : 42);
    out.push(circle(x + 28, yy, 7, [ws.accent, C.green, C.amber, C.violet][i % 4]));
    if (!compact && i < 3) out.push(line(x + 28, yy + 7, x + 28, yy + 33, "#CBD5E1", 2));
    out.push(wrappedText(x + 46, yy + 4, row, compact ? 9 : 11, C.ink, 800, compact ? 42 : 86, compact ? 11 : 14, "start", compact ? 1 : 2));
  });
  return out.join("");
}

function dependencyGate(x, y, w, h, ws) {
  const out = [rect(x, y, w, h, C.surface, C.border, 14)];
  out.push(text(x + 20, y + 34, "Communications Dependency Gate", 18, C.ink, 800));
  out.push(pill(x + 20, y + 56, "Blocked until Legal + Technical complete", "#FEF3C7", C.amber, 316));
  out.push(pill(x + 360, y + 56, "Band references required", "#E0F2FE", C.cyan, 226));
  out.push(pill(x + 610, y + 56, "Human approval before send", "#EDE9FE", C.violet, 248));
  out.push(detailPanel(x + 20, y + 106, 350, h - 126, ws, "desktop"));
  out.push(primaryPanel(x + 392, y + 106, w - 412, h - 126, { ...ws, n: "04", primary: workspaces[3].primary }, "desktop"));
  return out.join("");
}

function interactionFrame(x, y, ws) {
  const w = 1440;
  const h = 320;
  const out = [labelFrame(x, y, `Interaction State / ${ws.short}`, w)];
  out.push(rect(x, y, w, h, C.canvas, C.border, 18));
  out.push(rect(x, y, w, 70, C.surface, "none", 18));
  out.push(text(x + 28, y + 32, ws.interaction.title, 22, C.ink, 900));
  out.push(wrappedText(x + 28, y + 54, ws.interaction.subtitle, 12, C.muted, 650, 100, 15, "start", 1));
  out.push(pill(x + w - 282, y + 20, "Click-result layout", "#FFF7ED", C.orange, 210));
  out.push(pill(x + w - 516, y + 20, "Tabs stay inside page", "#E0F2FE", C.cyan, 220));
  out.push(tabBar(x + 28, y + 92, 520, { ...ws, tabs: ws.interaction.tabs }, "desktop"));

  out.push(rect(x + 28, y + 144, 340, 142, C.surface, C.border, 14));
  out.push(text(x + 46, y + 174, ws.interaction.leftTitle, 17, C.ink, 800));
  ws.interaction.leftRows.slice(0, 4).forEach((row, i) => {
    const yy = y + 204 + i * 24;
    out.push(circle(x + 52, yy, 6, [ws.accent, C.green, C.amber, C.violet][i % 4]));
    out.push(wrappedText(x + 68, yy + 4, row, 10, C.ink, 750, 42, 12, "start", 1));
  });

  out.push(rect(x + 392, y + 92, 532, 194, C.surface, C.border, 14));
  out.push(text(x + 412, y + 126, ws.interaction.drawerTitle, 19, C.ink, 900));
  ws.interaction.drawerRows.slice(0, 4).forEach((row, i) => {
    const yy = y + 158 + i * 27;
    out.push(rect(x + 412, yy - 16, 220, 22, "#F8FAFC", "#E2E8F0", 8));
    out.push(circle(x + 426, yy - 5, 5, [ws.accent, C.cyan, C.green, C.amber][i % 4]));
    out.push(wrappedText(x + 438, yy - 2, row, 10, C.ink, 700, 34, 12, "start", 1));
  });
  out.push(buttonRow(x + 412, y + 242, 492, ws.interaction.actions, ws.accent, "desktop"));

  out.push(rect(x + 948, y + 92, 464, 194, "#FFF7ED", "#FDBA74", 14));
  out.push(text(x + 968, y + 126, "Result after click", 18, C.orange, 900));
  out.push(wrappedText(x + 968, y + 154, ws.interaction.outcome, 12, "#9A3412", 750, 58, 16, "start", 4));
  out.push(line(x + 968, y + 230, x + 1388, y + 230, "#FDBA74", 1));
  out.push(text(x + 968, y + 256, "Backend records: action result, delivery/provider status when relevant, audit event", 11, "#9A3412", 800));
  return out.join("");
}

function desktopFrame(x, y, ws) {
  const w = 1440;
  const h = 960;
  const out = [labelFrame(x, y, `Desktop / ${ws.short}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, ws, "desktop");
  out.push(svg);
  const cx = x + side + 28;
  const cy = y + top + 28;
  const cw = w - side - 56;
  out.push(metricCards(cx, cy, cw, ws, "desktop"));
  out.push(tabBar(cx, cy + 104, cw * 0.68, ws, "desktop"));
  const mainY = cy + 150;
  if (ws.n === "03") {
    out.push(agentMap(cx, mainY, 590, 326, ws, "desktop"));
    out.push(timeline(cx + 614, mainY, 360, 326, ws, "desktop"));
    out.push(decisionCard(cx + 998, mainY, cw - 998, 206, ws, "desktop"));
    out.push(notificationPanel(cx + 998, mainY + 226, cw - 998, 224, ws, "desktop"));
    out.push(dependencyGate(cx, cy + 520, 974, 300, ws));
  } else {
    out.push(sourceFeed(cx, mainY, 408, 326, ws, "desktop"));
    out.push(primaryPanel(cx + 432, mainY, 462, 326, ws, "desktop"));
    out.push(decisionCard(cx + 918, mainY, cw - 918, 196, ws, "desktop"));
    out.push(notificationPanel(cx + 918, mainY + 216, cw - 918, 202, ws, "desktop"));
    out.push(outcomeStrip(cx + 918, mainY + 438, cw - 918, 88, ws, "desktop"));
    out.push(detailPanel(cx, cy + 530, 894, 290, ws, "desktop"));
  }
  return out.join("");
}

function tabletFrame(x, y, ws) {
  const w = 834;
  const h = 1112;
  const out = [labelFrame(x, y, `Tablet / ${ws.short}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, ws, "tablet");
  out.push(svg);
  const cx = x + side + 24;
  const cy = y + top + 24;
  const cw = w - side - 48;
  out.push(metricCards(cx, cy, cw, ws, "tablet"));
  out.push(tabBar(cx, cy + 104, cw, ws, "tablet"));
  const mainY = cy + 148;
  out.push(primaryPanel(cx, mainY, cw, 270, ws, "tablet"));
  out.push(timeline(cx, mainY + 290, cw * 0.48, 210, ws, "tablet"));
  out.push(notificationPanel(cx + cw * 0.52, mainY + 290, cw * 0.48, 210, ws, "tablet"));
  out.push(decisionCard(cx, mainY + 520, cw, 150, ws, "tablet"));
  out.push(outcomeStrip(cx, mainY + 688, cw, 78, ws, "tablet"));
  out.push(detailPanel(cx, mainY + 784, cw, 58, ws, "tablet"));
  return out.join("");
}

function mobileFrame(x, y, ws) {
  const w = 390;
  const h = 844;
  const out = [labelFrame(x, y, `Mobile / ${ws.short}`, w)];
  const { svg, top } = chrome(x, y, w, h, ws, "mobile");
  out.push(svg);
  const cx = x + 18;
  const cy = y + top + 50;
  const cw = w - 36;
  out.push(tabBar(cx, y + top + 8, cw, ws, "mobile"));
  out.push(metricCards(cx, cy, cw, ws, "mobile"));
  out.push(decisionCard(cx, cy + 148, cw, 124, ws, "mobile"));
  out.push(outcomeStrip(cx, cy + 282, cw, 70, ws, "mobile"));
  out.push(notificationPanel(cx, cy + 362, cw, 94, ws, "mobile"));
  out.push(primaryPanel(cx, cy + 466, cw, 92, ws, "mobile"));
  return out.join("");
}

function section(x, y, ws) {
  const out = [];
  out.push(text(x, y, `${ws.n} ${ws.title}`, 32, "#111827", 900));
  out.push(text(x, y + 34, ws.subtitle, 15, "#475569", 650));
  out.push(pill(x + 1190, y - 4, "No page-count expansion", "#E0F2FE", C.cyan, 220));
  out.push(pill(x + 1430, y - 4, "Desktop + tablet + mobile", "#ECFDF5", C.green, 240));
  out.push(pill(x + 1690, y - 4, "Button outcomes visible", "#FFF7ED", C.orange, 220));
  const fy = y + 76;
  out.push(desktopFrame(x, fy, ws));
  out.push(tabletFrame(x + 1520, fy, ws));
  out.push(mobileFrame(x + 2434, fy, ws));
  out.push(interactionFrame(x, fy + 1064, ws));
  return out.join("");
}

const boardW = 2924;
const sectionH = 1480;
const margin = 90;
const boardH = margin * 2 + workspaces.length * sectionH;
const parts = [];
parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}">`);
parts.push(rect(0, 0, boardW, boardH, C.page));
parts.push(text(margin, 58, "CrisisCoord Responsive Workspace Triptychs", 38, "#111827", 900));
parts.push(text(margin, 88, "Seven product workspaces, each shown as desktop, tablet, mobile, and click-result state. Tabs stay inside the same seven pages.", 15, "#475569", 650));
parts.push(pill(boardW - 798, 44, "Palette: graphite, cyan, blue, amber, red, green, violet", "#FFFFFF", "#0F172A", 510));
parts.push(pill(boardW - 270, 44, "Generated source", "#FFFFFF", "#0F172A", 160));
workspaces.forEach((ws, i) => parts.push(section(margin, 150 + i * sectionH, ws)));
parts.push("</svg>\n");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, parts.join(""), "utf8");
console.log(outFile);
