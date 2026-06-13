#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "docs/design/figma-imports");
const outFile = path.join(outDir, "crisiscoord-responsive-triptychs.svg");

const C = {
  page: "#E5E7EB",
  shell: "#0F172A",
  shell2: "#111827",
  panel: "#111827",
  panel2: "#0B1220",
  surface: "#FFFFFF",
  canvas: "#F7F8FA",
  text: "#F8FAFC",
  muted: "#94A3B8",
  faint: "#CBD5E1",
  border: "#263244",
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
    metrics: [["Signals", "8"], ["Live feeds", "5"], ["Sandbox", "Finance"], ["Ready", "5 agents"]],
    cards: ["CISA KEV: payment gateway CVE match", "SIEM alert: unusual card-token query volume", "GitHub advisory: dependency risk found"],
    timeline: ["Signal normalized", "Sandbox selected", "Agent roster previewed"],
    decision: "Launch command room",
  },
  {
    n: "02",
    title: "Incident Registry",
    short: "Incident Registry",
    subtitle: "Prioritize active crises without burying users in dense tables.",
    accent: C.blue,
    metrics: [["Open", "12"], ["Critical", "3"], ["Decisions", "5"], ["Next SLA", "71h"]],
    cards: ["Payment system access review", "Healthcare portal data anomaly", "Supplier recall coordination"],
    timeline: ["Assessment running", "Legal clock active", "Owner assigned"],
    decision: "Open incident",
  },
  {
    n: "03",
    title: "Crisis Command Room",
    short: "Command Room",
    subtitle: "The hero workspace where five agents coordinate through Band.",
    accent: C.violet,
    metrics: [["Severity", "Critical"], ["Records", "50k"], ["EU confirmed", "12.4k"], ["Gate", "Blocked"]],
    cards: ["Assessment: breach signal classified", "Legal: GDPR Art. 33 clock active", "Technical: containment evidence pending"],
    timeline: ["02:47 signal received", "02:49 assessment posted", "02:54 legal obligation posted", "03:02 technical scope posted"],
    decision: "Customer notification needs human decision",
  },
  {
    n: "04",
    title: "Communications Review",
    short: "Communications",
    subtitle: "Draft regulator, customer, and executive comms from verified facts only.",
    accent: C.amber,
    metrics: [["Drafts", "3"], ["Facts used", "9"], ["Missing", "2"], ["Review", "Legal"]],
    cards: ["Regulator notice: uses confirmed EU scope", "Customer notice: pending proactive decision", "Executive brief: ready for review"],
    timeline: ["Legal facts linked", "Technical facts linked", "Warnings attached"],
    decision: "Approve, revise, or escalate",
  },
  {
    n: "05",
    title: "Decision Desk",
    short: "Decision Desk",
    subtitle: "Human-in-the-loop decisions with approve, wait, and escalate tradeoffs.",
    accent: C.violet,
    metrics: [["Pending", "4"], ["Urgent", "2"], ["Escalated", "1"], ["Owners", "3"]],
    cards: ["Notify customers proactively?", "Pause payment processing?", "Disclose to secondary regulator?"],
    timeline: ["Risk of approving: over-notification", "Risk of waiting: missed duty", "Recommended: legal review"],
    decision: "Approve decision",
  },
  {
    n: "06",
    title: "Evidence And Audit",
    short: "Evidence Audit",
    subtitle: "Every fact, model result, source, timestamp, and human action is traceable.",
    accent: C.green,
    metrics: [["Events", "128"], ["Sources", "7"], ["Exports", "2"], ["Integrity", "OK"]],
    cards: ["CISA KEV source snapshot", "Band message reference", "AI provider metadata redacted"],
    timeline: ["Fact captured", "Agent output linked", "Human approval recorded", "Export package prepared"],
    decision: "Export audit package",
  },
  {
    n: "07",
    title: "Integrations And Demo Readiness",
    short: "Integrations",
    subtitle: "Show the partner stack, diagnostics, fallback mode, and demo safety.",
    accent: C.blue,
    metrics: [["Band", "OK"], ["Supabase", "OK"], ["AI/ML", "Ready"], ["Fallback", "Seeded"]],
    cards: ["Band room active", "Supabase RLS check passed", "Featherless fallback model ready"],
    timeline: ["Last live run succeeded", "Seeded mode verified", "Diagnostics safe to show"],
    decision: "Run demo scenario",
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

function pill(x, y, label, fill, color = C.text, w = 0) {
  const width = w || Math.max(72, label.length * 8 + 26);
  return [
    rect(x, y, width, 28, fill, "none", 14),
    circle(x + 14, y + 14, 4, color),
    text(x + 26, y + 19, label, 12, color, 700),
  ].join("");
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
  out.push(rect(x, y, w, h, C.shell, C.border, 22));
  out.push(rect(x + side, y, w - side, h, C.canvas, "none", 0));
  if (!mobile) {
    out.push(rect(x, y, side, h, "#070B12", "none", 22));
    out.push(text(x + 24, y + 44, "CrisisCoord", 21, C.text, 800));
    out.push(text(x + 24, y + 68, "Enterprise response", 11, C.muted, 600));
    const nav = ["Signal", "Registry", "Command", "Comms", "Decision", "Audit", "Demo"];
    nav.forEach((n, i) => {
      const yy = y + 126 + i * 46;
      const active = ws.title.includes(n) || (n === "Command" && ws.n === "03") || (n === "Comms" && ws.n === "04") || (n === "Demo" && ws.n === "07");
      out.push(rect(x + 18, yy - 24, side - 36, 34, active ? "#172554" : "transparent", active ? "#1D4ED8" : "none", 8));
      out.push(circle(x + 34, yy - 7, 5, active ? ws.accent : C.border));
      if (!tablet) out.push(text(x + 48, yy - 2, n, 13, active ? C.text : C.muted, 700));
    });
    out.push(rect(x + 18, y + h - 106, side - 36, 70, "#0B1220", C.border, 12));
    out.push(text(x + 34, y + h - 74, "Source status", 12, C.faint, 700));
    out.push(text(x + 34, y + h - 48, "Live + seeded fallback", 11, C.green, 700));
  }
  out.push(rect(x + side, y, w - side, top, C.surface, "none", mobile ? 22 : 0));
  out.push(text(x + side + 28, y + 34, `${ws.n} ${ws.title}`, mobile ? 17 : 23, "#0F172A", 800));
  out.push(text(x + side + 28, y + 58, ws.subtitle, mobile ? 10 : 12, "#64748B", 600));
  if (!mobile) {
    out.push(rect(x + w - 612, y + 22, 330, 38, "#F8FAFC", "#CBD5E1", 10));
    out.push(text(x + w - 590, y + 47, "Search incidents, CVEs, sources, owners", 13, "#64748B", 600));
    out.push(pill(x + w - 264, y + 27, "All systems operational", "#ECFDF5", C.green, 210));
  } else {
    out.push(rect(x + 22, y + h - 70, w - 44, 54, "#050A12", C.border, 22));
    ["Home", "List", "+", "Audit", "Me"].forEach((n, i) => {
      const xx = x + 54 + i * ((w - 108) / 4);
      out.push(circle(xx, y + h - 43, n === "+" ? 22 : 18, n === "+" ? ws.accent : "#111827", C.border));
      out.push(text(xx, y + h - 38, n, n === "+" ? 21 : 9, C.text, 800, "middle"));
    });
  }
  return { svg: out.join(""), side, top };
}

function metricCards(x, y, w, ws, mode) {
  const out = [];
  const mobile = mode === "mobile";
  const cols = mobile ? 2 : 4;
  const gap = mobile ? 10 : 16;
  const cw = (w - gap * (cols - 1)) / cols;
  ws.metrics.forEach((m, i) => {
    const xx = x + (i % cols) * (cw + gap);
    const yy = y + Math.floor(i / cols) * 94;
    out.push(rect(xx, yy, cw, mobile ? 76 : 86, C.surface, "#D7DEE8", 12));
    out.push(text(xx + 16, yy + 28, m[0], mobile ? 10 : 12, "#64748B", 700));
    out.push(text(xx + 16, yy + 60, m[1], mobile ? 22 : 28, "#0F172A", 800));
    out.push(circle(xx + cw - 22, yy + 24, 7, ws.accent));
  });
  return out.join("");
}

function topology(x, y, w, h, ws, compact = false) {
  const out = [];
  out.push(rect(x, y, w, h, "#08111F", "#233044", 16));
  out.push(text(x + 20, y + 32, "Band handoff topology", compact ? 14 : 18, C.text, 800));
  out.push(text(x + 20, y + 54, "Agents post facts before downstream actions unlock", compact ? 10 : 12, C.muted, 600));
  const cx = x + w * 0.48;
  const cy = y + h * 0.56;
  const nodes = [
    ["Assessment", x + w * 0.2, y + h * 0.45, C.cyan],
    ["Legal", x + w * 0.36, y + h * 0.28, C.amber],
    ["Technical", x + w * 0.68, y + h * 0.32, C.blue],
    ["Comms", x + w * 0.72, y + h * 0.64, C.violet],
    ["Escalation", x + w * 0.28, y + h * 0.72, C.red],
  ];
  nodes.forEach(([, nx, ny, color]) => out.push(line(cx, cy, nx, ny, color, 2, 'opacity="0.55"')));
  out.push(circle(cx, cy, compact ? 26 : 34, ws.accent, "#E0F2FE", 'stroke-width="3"'));
  out.push(text(cx, cy + 5, "Band", compact ? 12 : 15, C.text, 800, "middle"));
  nodes.forEach(([name, nx, ny, color]) => {
    out.push(circle(nx, ny, compact ? 15 : 20, color, "#E5E7EB", 'stroke-width="2"'));
    out.push(text(nx, ny + (compact ? 31 : 38), name, compact ? 9 : 11, C.faint, 700, "middle"));
  });
  return out.join("");
}

function timeline(x, y, w, h, ws, compact = false) {
  const out = [rect(x, y, w, h, C.surface, "#D7DEE8", 14), text(x + 18, y + 30, "Live Band timeline", compact ? 13 : 17, "#0F172A", 800)];
  ws.timeline.slice(0, compact ? 3 : 4).forEach((event, i) => {
    const yy = y + 62 + i * (compact ? 54 : 64);
    out.push(circle(x + 24, yy, 8, i === 0 ? ws.accent : C.green));
    out.push(line(x + 24, yy + 8, x + 24, yy + (compact ? 42 : 52), "#CBD5E1", 2));
    out.push(text(x + 46, yy - 4, event, compact ? 11 : 13, "#0F172A", 800));
    out.push(text(x + 46, yy + 15, "source linked - confidence shown - timestamp kept", compact ? 9 : 10, "#64748B", 600));
  });
  return out.join("");
}

function ledger(x, y, w, h, ws, mode) {
  const out = [rect(x, y, w, h, C.surface, "#D7DEE8", 14), text(x + 18, y + 30, mode === "mobile" ? "Source feed" : "Event ledger and source feed", mode === "mobile" ? 13 : 17, "#0F172A", 800)];
  ws.cards.forEach((card, i) => {
    const yy = y + 54 + i * (mode === "mobile" ? 74 : 78);
    out.push(rect(x + 14, yy, w - 28, mode === "mobile" ? 58 : 62, "#F8FAFC", "#E2E8F0", 10));
    out.push(circle(x + 30, yy + 24, 6, [ws.accent, C.amber, C.green][i % 3]));
    out.push(text(x + 46, yy + 22, card, mode === "mobile" ? 10 : 12, "#0F172A", 800));
    out.push(text(x + 46, yy + 42, "live/cached label - source - timestamp - confidence", mode === "mobile" ? 8 : 10, "#64748B", 600));
  });
  return out.join("");
}

function decisionCard(x, y, w, h, ws, mode) {
  const out = [rect(x, y, w, h, "#FAF5FF", "#C4B5FD", 14), pill(x + 16, y + 16, "Human review", "#EDE9FE", C.violet, 132)];
  out.push(text(x + 18, y + 66, ws.decision, mode === "mobile" ? 15 : 19, "#3B0764", 800));
  out.push(text(x + 18, y + 94, "Approval risk, delay risk, and required owner are visible.", mode === "mobile" ? 9 : 11, "#6B21A8", 600));
  out.push(rect(x + 18, y + h - 48, (w - 48) / 2, 32, C.violet, "none", 9));
  out.push(text(x + 32, y + h - 27, "Approve", 11, C.text, 800));
  out.push(rect(x + 28 + (w - 48) / 2, y + h - 48, (w - 48) / 2, 32, "#FFFFFF", "#C4B5FD", 9));
  out.push(text(x + 42 + (w - 48) / 2, y + h - 27, "Escalate", 11, C.violet, 800));
  return out.join("");
}

function desktopFrame(x, y, ws) {
  const w = 1440, h = 960;
  const out = [labelFrame(x, y, `Desktop / ${ws.short}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, ws, "desktop");
  out.push(svg);
  const cx = x + side + 28;
  const cy = y + top + 28;
  const cw = w - side - 56;
  out.push(metricCards(cx, cy, cw, ws, "desktop"));
  if (ws.n === "03") {
    out.push(topology(cx, cy + 120, 590, 390, ws));
    out.push(timeline(cx + 614, cy + 120, 360, 390, ws));
    out.push(decisionCard(cx + 998, cy + 120, cw - 998, 210, ws, "desktop"));
    out.push(ledger(cx + 998, cy + 350, cw - 998, 270, ws, "desktop"));
    out.push(rect(cx, cy + 540, 974, 280, C.surface, "#D7DEE8", 14));
    out.push(text(cx + 20, cy + 574, "Communications dependency gate", 18, "#0F172A", 800));
    out.push(pill(cx + 22, cy + 596, "Blocked until Legal + Technical complete", "#FEF3C7", C.amber, 300));
    out.push(pill(cx + 342, cy + 596, "Band references required", "#E0F2FE", C.cyan, 218));
    out.push(pill(cx + 582, cy + 596, "No private data leaves workspace", "#ECFDF5", C.green, 270));
  } else {
    out.push(ledger(cx, cy + 118, 432, 430, ws, "desktop"));
    out.push(topology(cx + 456, cy + 118, 440, 430, ws));
    out.push(decisionCard(cx + 920, cy + 118, cw - 920, 220, ws, "desktop"));
    out.push(timeline(cx + 920, cy + 358, cw - 920, 260, ws));
    out.push(rect(cx, cy + 580, cw, 240, C.surface, "#D7DEE8", 14));
    out.push(text(cx + 18, cy + 614, "Implementation notes for this workspace", 18, "#0F172A", 800));
    ["Status is text plus color", "Every fact has source and confidence", "Mobile avoids dense tables above fold", "Band handoff remains visible"].forEach((n, i) => {
      out.push(circle(cx + 28 + i * 300, cy + 668, 8, [ws.accent, C.green, C.amber, C.violet][i]));
      out.push(text(cx + 44 + i * 300, cy + 672, n, 12, "#334155", 700));
    });
  }
  return out.join("");
}

function tabletFrame(x, y, ws) {
  const w = 834, h = 1112;
  const out = [labelFrame(x, y, `Tablet / ${ws.short}`, w)];
  const { svg, side, top } = chrome(x, y, w, h, ws, "tablet");
  out.push(svg);
  const cx = x + side + 24;
  const cy = y + top + 24;
  const cw = w - side - 48;
  out.push(metricCards(cx, cy, cw, ws, "tablet"));
  out.push(topology(cx, cy + 118, cw, 300, ws, true));
  out.push(timeline(cx, cy + 438, cw * 0.48, 332, ws, true));
  out.push(ledger(cx + cw * 0.52, cy + 438, cw * 0.48, 332, ws, "tablet"));
  out.push(decisionCard(cx, cy + 792, cw, 196, ws, "tablet"));
  return out.join("");
}

function mobileFrame(x, y, ws) {
  const w = 390, h = 844;
  const out = [labelFrame(x, y, `Mobile / ${ws.short}`, w)];
  const { svg, top } = chrome(x, y, w, h, ws, "mobile");
  out.push(svg);
  const cx = x + 18;
  const cy = y + top + 18;
  const cw = w - 36;
  out.push(metricCards(cx, cy, cw, ws, "mobile"));
  out.push(decisionCard(cx, cy + 172, cw, 158, ws, "mobile"));
  out.push(ledger(cx, cy + 348, cw, 236, ws, "mobile"));
  out.push(timeline(cx, cy + 602, cw, 120, ws, true));
  return out.join("");
}

function section(x, y, ws) {
  const out = [];
  out.push(text(x, y, `${ws.n} ${ws.title}`, 32, "#111827", 900));
  out.push(text(x, y + 34, ws.subtitle, 15, "#475569", 650));
  out.push(pill(x + 1220, y - 4, "No page-count expansion", "#E0F2FE", C.cyan, 220));
  out.push(pill(x + 1460, y - 4, "Desktop + tablet + mobile", "#ECFDF5", C.green, 240));
  const fy = y + 76;
  out.push(desktopFrame(x, fy, ws));
  out.push(tabletFrame(x + 1520, fy, ws));
  out.push(mobileFrame(x + 2434, fy, ws));
  return out.join("");
}

const boardW = 2924;
const sectionH = 1280;
const margin = 90;
const boardH = margin * 2 + workspaces.length * sectionH;
const parts = [];
parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${boardW}" height="${boardH}" viewBox="0 0 ${boardW} ${boardH}">`);
parts.push(rect(0, 0, boardW, boardH, C.page));
parts.push(text(margin, 58, "CrisisCoord Responsive Workspace Triptychs", 38, "#111827", 900));
parts.push(text(margin, 88, "Seven product workspaces, each shown as desktop, tablet, and mobile. Import/paste into Figma page 01 Responsive Workspaces.", 15, "#475569", 650));
parts.push(pill(boardW - 760, 44, "Palette: graphite, cyan, blue, amber, red, green, violet", "#FFFFFF", "#0F172A", 510));
parts.push(pill(boardW - 230, 44, "Generated source", "#FFFFFF", "#0F172A", 160));
workspaces.forEach((ws, i) => parts.push(section(margin, 150 + i * sectionH, ws)));
parts.push("</svg>\n");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, parts.join(""), "utf8");
console.log(outFile);
