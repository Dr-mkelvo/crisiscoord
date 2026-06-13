import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const outputPath = path.join(
  repoRoot,
  "docs/presentation/crisiscoord-presentation-planning-workbook.xlsx",
);

const workbook = Workbook.create();

const palette = {
  navy: "#0F172A",
  blue: "#2563EB",
  cyan: "#0891B2",
  green: "#15803D",
  amber: "#B45309",
  red: "#B91C1C",
  slate: "#334155",
  light: "#F8FAFC",
  border: "#CBD5E1",
  white: "#FFFFFF",
};

function addSheet(name) {
  const sheet = workbook.worksheets.add(name);
  sheet.showGridLines = false;
  return sheet;
}

function setTitle(sheet, title, subtitle = "") {
  const titleRange = sheet.getRange("A1");
  titleRange.values = [[title]];
  titleRange.format.font = { bold: true, color: palette.navy, size: 18 };
  titleRange.format.rowHeightPx = 34;

  const subtitleRange = sheet.getRange("A2");
  subtitleRange.values = [[subtitle]];
  subtitleRange.format.font = { color: palette.slate, italic: true, size: 11 };
  subtitleRange.format.rowHeightPx = 28;
}

function writeTable(sheet, startCell, headers, rows, tableName) {
  const start = sheet.getRange(startCell);
  const rowCount = rows.length + 1;
  const colCount = headers.length;
  const range = start.resize(rowCount, colCount);
  range.values = [headers, ...rows];
  range.format.wrapText = true;
  range.format.borders = { preset: "all", style: "thin", color: palette.border };
  range.format.font = { size: 10, color: "#111827" };
  const headerRange = start.resize(1, colCount);
  headerRange.format.fill = { color: palette.blue };
  headerRange.format.font = { bold: true, color: palette.navy };
  headerRange.format.rowHeightPx = 28;
  if (tableName) {
    const table = sheet.tables.add(range.address, true, tableName);
    table.style = "TableStyleMedium2";
    table.showFilterButton = true;
  }
  return range;
}

function setWidths(sheet, widths) {
  widths.forEach((width, idx) => {
    sheet.getRangeByIndexes(0, idx, 1, 1).format.columnWidthPx = width;
  });
}

function statusCellStyle(range, color) {
  range.format.fill = { color };
  range.format.font = { bold: true, color: palette.white };
  range.format.borders = { preset: "outside", style: "thin", color };
}

const dashboard = addSheet("Dashboard");
setTitle(
  dashboard,
  "CrisisCoord Presentation Planning Workbook",
  "Meeting-ready packet for Gamma deck creation. Architecture details remain provisional until the team finalizes them.",
);
setWidths(dashboard, [180, 160, 160, 160, 160, 160, 160, 160]);

dashboard.getRange("A4:H4").merge();
dashboard.getRange("A4:H4").values = [
  [
    "CrisisCoord is a Band-powered multi-agent crisis response room for regulated incidents. It coordinates Legal, Technical, Communications, Compliance, and Executive work in one auditable crisis room.",
  ],
];
dashboard.getRange("A4:H4").format.wrapText = true;
dashboard.getRange("A4:H4").format.fill = { color: palette.light };
dashboard.getRange("A4:H4").format.borders = {
  preset: "outside",
  style: "thin",
  color: palette.border,
};
dashboard.getRange("A4:H4").format.rowHeightPx = 60;

dashboard.getRange("A6:B9").values = [
  ["Deck Cards Ready", null],
  ["Needs Team Decision", null],
  ["Required Partners", null],
  ["Architecture Items TBD", null],
];
dashboard.getRange("A6:B9").format.borders = {
  preset: "all",
  style: "thin",
  color: palette.border,
};
dashboard.getRange("A6:A9").format.fill = { color: "#DBEAFE" };
dashboard.getRange("A6:A9").format.font = { bold: true, color: palette.navy };
dashboard.getRange("B6:B9").format.font = { bold: true, color: palette.blue, size: 14 };

dashboard.getRange("D6:E10").values = [
  ["Presentation Principle", "Rule"],
  ["Do not overclaim architecture", "Show high-level concept only until team finalizes implementation."],
  ["Do not invent compliance claims", "All legal/regulatory language is draft guidance for review."],
  ["Use partners visibly", "Band, AI/ML API, and Featherless must appear in the demo proof."],
  ["Keep demo synthetic", "No real customer, payment, patient, employee, or incident data."],
];
dashboard.getRange("D6:E10").format.wrapText = true;
dashboard.getRange("D6:E10").format.borders = {
  preset: "all",
  style: "thin",
  color: palette.border,
};
dashboard.getRange("D6:E6").format.fill = { color: palette.slate };
dashboard.getRange("D6:E6").format.font = { bold: true, color: palette.navy };

const problem = addSheet("Problem Solution");
setTitle(problem, "Problem And Solution", "What we are making, why it matters, and how CrisisCoord solves it.");
setWidths(problem, [180, 260, 300, 260, 160]);
writeTable(
  problem,
  "A4",
  ["Area", "Current Pain", "CrisisCoord Answer", "Demo Proof", "Status"],
  [
    [
      "Crisis coordination",
      "Legal, Technical, Communications, Compliance, and Executive teams work in separate tools.",
      "A shared Band-backed crisis room coordinates agent handoffs and human review.",
      "Band timeline shows agents posting findings and handoffs.",
      "Ready",
    ],
    [
      "Regulatory risk",
      "Disclosure clocks and obligations are easy to miss when facts are scattered.",
      "Legal agent surfaces possible obligations, deadlines, assumptions, and source references.",
      "Legal packet shows reviewable obligations and unknowns.",
      "Ready",
    ],
    [
      "Technical uncertainty",
      "Communications often drafts from incomplete or stale technical scope.",
      "Technical Forensics confirms affected systems, records, containment, and confidence.",
      "Technical finding is required before Communications unlocks.",
      "Ready",
    ],
    [
      "Unsafe communications",
      "Customer/regulator drafts may be published before Legal and Technical agree.",
      "Communications remains blocked until Legal and Technical outputs exist.",
      "Blocked state is visible in command room.",
      "Ready",
    ],
    [
      "Audit trail",
      "Teams reconstruct what happened after the crisis.",
      "Supabase stores incident state, agent outputs, decisions, provider metadata, and audit events.",
      "Audit panel shows chronology and model/provider proof.",
      "Provisional",
    ],
  ],
  "ProblemSolutionTable",
);

const workflow = addSheet("Agent Workflow");
setTitle(workflow, "Agent Workflow", "Five specialized agents coordinate through Band with provider proof.");
setWidths(workflow, [180, 210, 240, 240, 160, 220, 160]);
writeTable(
  workflow,
  "A4",
  ["Agent", "Role", "Inputs", "Outputs", "Provider", "Band Behavior", "Status"],
  [
    [
      "Crisis Assessment",
      "Classifies crisis type and severity.",
      "Synthetic incident signal.",
      "Severity, summary, required agents, known facts, unknowns.",
      "AI/ML API",
      "Creates/seeds room and mentions Legal + Technical.",
      "Required",
    ],
    [
      "Legal & Regulatory",
      "Identifies possible obligations and deadlines.",
      "Assessment and technical context when available.",
      "Reviewable legal packet, unknowns, references.",
      "AI/ML API",
      "Posts obligations and mentions Communications when ready.",
      "Required",
    ],
    [
      "Technical Forensics",
      "Confirms scope, systems, containment, and confidence.",
      "Assessment context and synthetic evidence.",
      "Technical finding with affected systems and record scope.",
      "Featherless",
      "Posts technical finding and unlocks Communications dependency.",
      "Required",
    ],
    [
      "Stakeholder Communications",
      "Drafts regulator, customer, executive, and internal messages.",
      "Validated Legal and Technical findings.",
      "Draft-only communications with review states.",
      "AI/ML API",
      "Posts drafts after dependency gate passes.",
      "Required",
    ],
    [
      "Escalation & Decision",
      "Flags conflicts and human decision points.",
      "Room state, findings, drafts, unknowns.",
      "Decision request for Incident Commander.",
      "AI/ML API",
      "Mentions human reviewer with decision request.",
      "Required",
    ],
  ],
  "AgentWorkflowTable",
);

const demo = addSheet("Demo Flow");
setTitle(demo, "Demo Flow", "Sixty to ninety second story judges can understand quickly.");
setWidths(demo, [100, 220, 300, 260, 160]);
writeTable(
  demo,
  "A4",
  ["Moment", "Step", "What Happens", "What Judge Sees", "Status"],
  [
    ["00:00", "Incident signal", "Payment-system unauthorized access detected.", "Incident summary bar and severity placeholder.", "Ready"],
    ["00:08", "Assessment runs", "Assessment classifies high-severity data breach.", "Band room seeded; AI/ML API provider badge.", "Ready"],
    ["00:18", "Legal + Technical parallel", "Legal reviews obligations while Technical confirms scope.", "Two agents running in parallel.", "Ready"],
    ["00:32", "Technical posts", "Technical confirms containment and affected record scope via Featherless.", "Featherless provider badge on Technical finding.", "Ready"],
    ["00:42", "Communications unlocks", "Comms drafts only after Legal and Technical complete.", "Dependency gate changes from blocked to review.", "Ready"],
    ["00:55", "Escalation asks decision", "Escalation requests human choice on proactive customer notification.", "Decision queue item and audit trail entry.", "Ready"],
    ["01:10", "Close", "Explain why Band is essential and how partners are used.", "Partner proof and takeaway slide.", "Ready"],
  ],
  "DemoFlowTable",
);

const partners = addSheet("Partner Proof");
setTitle(partners, "Partner Proof", "Required partner usage and visible evidence for submission.");
setWidths(partners, [150, 260, 300, 220, 160]);
writeTable(
  partners,
  "A4",
  ["Partner", "Required Use", "Proof In Product", "Submission Proof", "Status"],
  [
    ["Band", "Active collaboration layer for at least three agents.", "Band timeline, messages, events, agent handoffs.", "Demo narration and app screenshot.", "Required"],
    ["AI/ML API", "Main-path model reasoning.", "Assessment, Legal, Communications, and Escalation provider metadata.", "Technology tag and audit screenshot.", "Required"],
    ["Featherless", "Visible open-model inference.", "Technical Forensics provider metadata and model availability check.", "Technology tag and audit screenshot.", "Required"],
    ["Codeband", "Development-process influence.", "Branching, PR workflow, playbooks, review gates.", "Repository docs and PR history.", "Required process"],
    ["Gamma", "Presentation creation and export.", "Gamma deck generated from this packet.", "Final deck link/PDF/PPT.", "Presentation"],
  ],
  "PartnerProofTable",
);

const architecture = addSheet("Architecture TBD");
setTitle(
  architecture,
  "Architecture Decisions Pending",
  "High-level concept only. Final architecture should be decided in the team meeting before implementation locks.",
);
setWidths(architecture, [170, 260, 280, 230, 180]);
writeTable(
  architecture,
  "A4",
  ["Layer", "Current Direction", "Decision Needed", "Meeting Question", "Status"],
  [
    ["Frontend", "React, TypeScript, Vite, Tailwind, TanStack tools.", "Confirm page scope and Figma handoff.", "Which seven routes are MVP-critical?", "Needs team decision"],
    ["Backend", "Hono TypeScript API as rule layer.", "Confirm runtime and deployment split.", "One service or separate worker process?", "Needs team decision"],
    ["Database", "Supabase Postgres for app state and audit.", "Confirm schema and RLS timing.", "Which tables are required for first demo?", "Needs team decision"],
    ["Band", "Band room, Agent API/SDK, WebSocket events.", "Confirm SDK path and agent registration.", "TypeScript SDK, Python SDK, or direct API first?", "Needs team decision"],
    ["Model providers", "AI/ML API + Featherless through model-provider wrapper.", "Confirm model choices and fallback rules.", "Which default model for each agent?", "Needs team decision"],
    ["Observability", "Audit events first; AgentOps optional later.", "Confirm whether to include AgentOps.", "Does AgentOps help demo enough to justify setup?", "Needs team decision"],
    ["Deployment", "Vercel + Supabase + Band agents.", "Confirm hosting topology.", "Where do agent workers run for demo?", "Needs team decision"],
    ["Demo mode", "Synthetic scenario with optional live provider calls.", "Confirm live vs scripted fallback.", "What is our failure-safe demo path?", "Needs team decision"],
  ],
  "ArchitectureTBDTable",
);

const gamma = addSheet("Gamma Deck");
setTitle(gamma, "Gamma Deck Outline", "Slide/card outline to paste into Gamma or use as a review checklist.");
setWidths(gamma, [80, 220, 300, 260, 240, 170]);
writeTable(
  gamma,
  "A4",
  ["Slide", "Title", "Message", "Visual Direction", "Speaker Note", "Status"],
  [
    [1, "CrisisCoord", "Multi-agent crisis response room for regulated incidents.", "Command-center title visual.", "Name the product and one-sentence value.", "Ready"],
    [2, "The Problem", "Crisis response fragments across teams and tools.", "Split workflow map.", "Legal, Technical, Comms, Compliance, Executive all move at once.", "Ready"],
    [3, "Why It Hurts", "Missed clocks, stale facts, inconsistent messages, weak auditability.", "Risk list with severity markers.", "This is not another dashboard problem.", "Ready"],
    [4, "The Solution", "One Band-backed crisis room with specialized agents and human review.", "Room/timeline concept.", "The room itself is the product.", "Ready"],
    [5, "Why Band", "Agent outputs change downstream agents; Band is the collaboration layer.", "Agent handoff network.", "Remove Band and the workflow breaks.", "Ready"],
    [6, "Five Agents", "Assessment, Legal, Technical, Communications, Escalation.", "Agent rail.", "Each agent owns a specific part of response.", "Ready"],
    [7, "Critical Gate", "Communications waits for Legal and Technical.", "Dependency gate diagram.", "This is the key product behavior.", "Ready"],
    [8, "Partner Stack", "Band, AI/ML API, Featherless, Supabase, Gamma.", "Partner proof matrix.", "Show required partner usage clearly.", "Ready"],
    [9, "Demo Scenario", "2:47 AM payment-system unauthorized access.", "Incident card.", "Judges should feel the urgency quickly.", "Ready"],
    [10, "Human Control", "Draft-only communications and decision queue.", "Approval panel.", "No final legal advice, no automatic external sending.", "Ready"],
    [11, "Provisional Architecture", "High-level concept only pending team finalization.", "Simple layered diagram.", "Do not overclaim architecture yet.", "Needs team decision"],
    [12, "Takeaway", "Faster, safer, auditable regulated crisis coordination.", "Before/after summary.", "Close with business value and Band necessity.", "Ready"],
  ],
  "GammaDeckTable",
);

for (const sheet of [
  dashboard,
  problem,
  workflow,
  demo,
  partners,
  architecture,
  gamma,
]) {
  sheet.freezePanes.freezeRows(4);
  const used = sheet.getUsedRange();
  used.format.wrapText = true;
  used.format.autofitRows();
}

dashboard.getRange("B6:B9").formulas = [
  ["=COUNTIF('Gamma Deck'!F5:F16,\"Ready\")"],
  ["=COUNTIF('Gamma Deck'!F5:F16,\"Needs team decision\")"],
  ["=COUNTA('Partner Proof'!A5:A9)"],
  ["=COUNTIF('Architecture TBD'!E5:E12,\"Needs team decision\")"],
];
dashboard.getRange("B6:B9").format.font = { bold: true, color: palette.blue, size: 14 };
dashboard.getRange("B6:B9").format.fill = { color: "#EFF6FF" };

const inspect = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 5000,
  tableMaxRows: 4,
  tableMaxCols: 6,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`Saved ${outputPath}`);
