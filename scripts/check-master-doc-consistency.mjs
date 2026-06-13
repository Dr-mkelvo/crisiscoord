#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relPath) {
  const fullPath = path.join(root, relPath);
  if (!fs.existsSync(fullPath)) {
    failures.push(`Missing file: ${relPath}`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function requireContains(relPath, terms) {
  const text = read(relPath);
  for (const term of terms) {
    if (!text.includes(term)) {
      failures.push(`${relPath} must include: ${term}`);
    }
  }
}

function requireAbsent(relPath, patterns) {
  const text = read(relPath);
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      failures.push(`${relPath} contains forbidden pattern: ${pattern}`);
    }
  }
}

const masterPath = "docs/product/master-implementation-guide.md";
const master = read(masterPath);

const requiredMasterTerms = [
  "Crisis Assessment Agent",
  "Legal & Regulatory Agent",
  "Technical Forensics Agent",
  "Stakeholder Communications Agent",
  "Escalation & Decision Agent",
  "Band messages",
  "Band events",
  "Supabase records",
  "AI/ML API",
  "Featherless",
  "Finance Sandbox",
  "Health Sandbox",
  "Product And Supply Chain Sandbox",
  "Phase",
  "global",
  "Communications blocked until Legal and Technical",
];

for (const term of requiredMasterTerms) {
  if (!master.includes(term)) {
    failures.push(`${masterPath} must include: ${term}`);
  }
}

const mermaidMatch = master.match(/```mermaid\n([\s\S]*?)```/);
if (!mermaidMatch) {
  failures.push(`${masterPath} must include a Mermaid diagram block.`);
} else {
  const diagram = mermaidMatch[1];
  const requiredDiagramNodes = [
    "CrisisSignal",
    "SandboxCatalog",
    "BackendRules",
    "SupabaseAudit",
    "BandRoom",
    "AssessmentAgent",
    "LegalAgent",
    "TechnicalAgent",
    "CommunicationsAgent",
    "EscalationAgent",
    "AIMLAPI",
    "Featherless",
    "HumanReview",
    "UICommandRoom",
  ];
  for (const node of requiredDiagramNodes) {
    if (!diagram.includes(node)) {
      failures.push(`Mermaid diagram must include node: ${node}`);
    }
  }
}

requireContains("README.md", ["docs/product/master-implementation-guide.md"]);
requireContains("README.md", ["docs/product/pre-development-readiness.md"]);
requireContains("README.md", ["docs/design/final-ui-ux-brief.md"]);
requireContains("docs/product/build-plan.md", ["master-implementation-guide.md"]);
requireContains("docs/product/build-plan.md", ["pre-development-readiness.md"]);
requireContains("docs/product/build-plan.md", ["final-ui-ux-brief.md"]);
requireContains("docs/product/project-vision.md", ["master-implementation-guide.md"]);
requireContains("docs/architecture/system-architecture.md", ["master-implementation-guide.md"]);
requireContains("docs/architecture/agent-implementation-plan.md", ["master-implementation-guide.md"]);
requireContains("docs/design/design-direction.md", ["final-ui-ux-brief.md"]);
requireContains("docs/collaboration/skills-and-rules.md", ["crisiscoord-doc-consistency"]);
requireContains("docs/collaboration/project-playbooks.md", ["check-master-doc-consistency.mjs"]);

function re(parts, flags = "i") {
  return new RegExp(parts.join(""), flags);
}

const forbiddenPatterns = [
  re(["Ken", "ya"]),
  re(["Ken", "yan"]),
  re(["OD", "PC"]),
  re(["Data", " Protection", " Act"]),
  re(["22", "-hour"]),
  re(["Six", " Thinking", " Hats"]),
  re(["White", " Hat"]),
  re(["Yellow", " Hat"]),
  re(["Black", " Hat"]),
  re(["Red", " Hat"]),
  re(["Green", " Hat"]),
  re(["Blue", " Hat"]),
  re(["red", " heart"]),
  re(["blue", " heart"]),
  re(["100", "\\+", " questions"]),
  re(["600", " questions"]),
];

const checkedDocs = [
  "README.md",
  "AGENTS.md",
  "ONBOARDING.md",
  "PRODUCTION_STACK_STANDARD.md",
  "docs/product/master-implementation-guide.md",
  "docs/product/pre-development-readiness.md",
  "docs/product/build-plan.md",
  "docs/product/project-vision.md",
  "docs/product/phased-delivery-plan.md",
  "docs/product/decision-guardrails-questionnaire.md",
  "docs/architecture/system-architecture.md",
  "docs/architecture/agent-implementation-plan.md",
  "docs/architecture/business-integration-plan.md",
  "docs/design/final-ui-ux-brief.md",
  "docs/collaboration/skills-and-rules.md",
  "docs/collaboration/project-playbooks.md",
];

for (const relPath of checkedDocs) {
  requireAbsent(relPath, forbiddenPatterns);
}

if (failures.length > 0) {
  console.error("Master doc consistency check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Master doc consistency check passed.");
