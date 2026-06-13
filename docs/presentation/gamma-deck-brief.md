# Gamma Deck Brief

Last updated: June 13, 2026.

Paste the prompt below into Gamma as the starting point for the hackathon deck.

## Gamma Prompt

```text
Create a polished 10-12 card hackathon pitch deck for CrisisCoord.

Audience:
Judges evaluating the Band of Agents Hackathon, especially Track 3: Regulated & High-Stakes Workflows.

Deck objective:
Make judges understand, in under three minutes, that CrisisCoord is not a chatbot. It is a shared crisis response room where specialized agents coordinate through Band, wait on each other's findings, and escalate risky decisions to humans with an audit trail.

Tone:
Calm, serious, enterprise, high-stakes, modern, credible. The deck should feel like an operating room for corporate crisis response.

Visual style:
Use a command-center interface aesthetic with clear lanes, message handoffs, dependency gates, audit trails, and decision cards. Prefer a light-first operational interface with clean white panels, graphite text, crisp borders, and restrained semantic colors: trust blue for active coordination, amber/orange for attention and risk, red for critical danger, green for complete/approved, and purple for human review. Use sharp typography, generous whitespace, thin dividers, subtle gridlines, and interface-like components.

Avoid:
Giant fake KPI numbers.
Generic dashboard screenshots.
Dense spreadsheet tables.
Robot faces.
Cartoon legal scales.
Cyber hoodie imagery.
Overly dramatic stock photos.
Claims that imply the app gives final legal advice.
Unverified implementation details that are not in the master guide.

Project:
CrisisCoord is a Band-powered multi-agent enterprise crisis response system for regulated incidents. When a company faces a breach, cyberattack, product recall, compliance event, or public-risk incident, Legal, Technical, Communications, Compliance, and Executive teams need to act together. Today that response is scattered across chat, tickets, docs, spreadsheets, meetings, and inboxes. CrisisCoord turns the crisis into one shared, auditable room where specialized agents coordinate, dependency gates are visible, and humans approve high-risk decisions.

Problem:
During a regulated crisis, the organization does not fail because one person lacks information. It fails because every team is waiting on a different version of the truth. Legal needs confirmed scope. Communications needs Legal and Technical. Executives need a decision brief. Compliance needs timestamps and evidence. The current workflow is manual, siloed, and hard to audit.

Solution:
CrisisCoord creates a crisis command room with five specialized agents:
Crisis Assessment Agent - classifies the incident, severity, affected business area, and immediate unknowns.
Legal & Regulatory Agent - identifies likely obligations, clocks, caveats, and review requirements.
Technical Forensics Agent - determines affected systems, likely scope, containment status, and evidence gaps.
Stakeholder Communications Agent - drafts regulator, customer, executive, and internal messages only after Legal and Technical findings exist.
Escalation & Decision Agent - reviews the whole room, flags conflicts, and asks humans for decisions that should not be automated.

Why Band is essential:
Band is the collaboration layer, not a notification wrapper. Each agent's output changes what the next agent is allowed to do. Communications must wait for Legal and Technical. Escalation reads the entire room state and detects conflicts. Agents need a shared place to hand off context, recruit specialists, and leave an audit trail.

Required partner usage:
Band is the active multi-agent room and handoff layer.
AI/ML API powers the main-path reasoning agents: Assessment, Legal, Communications, and Escalation.
Featherless AI powers a visible open-source model run for Technical Forensics.
Supabase stores case state, audit records, approvals, evidence references, and demo fixtures.
Gamma is used only for the presentation.

Demo scenario:
At 2:47 AM, unauthorized access is detected in the payment system. Card records may be exposed. The company needs a coordinated response before legal clocks, technical uncertainty, and customer communications split into separate threads.

Core demo flow:
Assessment opens the room and classifies the incident.
Legal posts possible disclosure obligations and unknowns.
Technical posts confirmed scope, containment status, and evidence gaps through Featherless AI.
Communications unlocks only after Legal and Technical findings exist.
Escalation flags a human decision: should the company proactively notify customers before every detail is confirmed?

Human control:
Generated communications are draft-only.
Risky decisions require human approval.
The product supports review, escalation, and auditability; it does not replace counsel, security leadership, or compliance officers.

Architecture note:
Use the master implementation guide as the source of truth. Show the architecture at concept level unless the app has already implemented the detail:
Command-room UI -> backend rule layer -> Supabase audit state -> Band collaboration room -> specialized agents -> AI/ML API and Featherless model providers.

Create the deck with these cards:

Card: CrisisCoord
Headline: Multi-agent crisis response for regulated incidents.
Visual: A clean crisis room interface with one active incident and agent lanes.

Card: The 2:47 AM Problem
Headline: In a crisis, the truth fragments before the response begins.
Visual: Legal, Technical, Communications, Compliance, and Executives each holding different fragments of the same incident.

Card: Why Current Tools Fail
Headline: The handoff is the risk.
Visual: A broken chain of chat, docs, tickets, meetings, and email with missing context between teams.

Card: One Shared Crisis Room
Headline: CrisisCoord turns the incident into a coordinated Band room.
Visual: Central room timeline with agent messages and status chips.

Card: Five Agents, One Operating Rhythm
Headline: Each agent owns a role, not the whole crisis.
Visual: Five clean lanes: Assessment, Legal, Technical, Communications, Escalation.

Card: The Dependency Gate
Headline: Communications waits for Legal and Technical.
Visual: Legal finding plus Technical finding unlock a Communications draft. Make this the strongest diagram.

Card: Partner Stack
Headline: Band coordinates. AI/ML API reasons. Featherless runs open-model forensics.
Visual: Three partner blocks connected to the agent lanes, with Supabase below as the audit store.

Card: The 60-Second Demo
Headline: From signal to decision request in one visible flow.
Visual: Timeline from signal -> assessment -> legal -> technical -> communications -> escalation.

Card: Human Approval
Headline: The agent can draft. The human decides.
Visual: Decision queue with approve, request revision, escalate, and hold states.

Card: Audit Trail
Headline: Every claim has a source, timestamp, owner, and status.
Visual: Evidence ledger showing who said what, when, and what it unlocked.

Card: Operating Architecture
Headline: Simple architecture, built around coordinated state.
Visual: UI, backend rule layer, Supabase, Band room, agents, model providers. Mark unbuilt details as planned, not live.

Card: Judging Takeaway
Headline: CrisisCoord makes high-stakes response faster without removing accountability.
Visual: The command room in a resolved state with decision trail preserved.
```

## Manual Gamma Polish Notes

After Gamma generates the first deck:

- Replace any generic dashboard tiles with agent handoff diagrams.
- Remove any invented metrics or fake performance numbers.
- Keep the demo scenario numbers only where they help the story: `2:47 AM` and potential card-record exposure.
- Make the dependency-gate slide the visual centerpiece.
- Keep partner usage visible, but do not let partner logos dominate the story.
- Mark unbuilt implementation details as planned, not live.
- Make every generated compliance sentence read like support for human review, not final legal advice.
