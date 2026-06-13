# Competitive UI And Adjacent Submission Notes

Last updated: June 13, 2026.

## Purpose

This note captures public research on incident-management products and adjacent Band hackathon submissions. The goal is not to copy them. The goal is to sharpen CrisisCoord's UI and positioning.

## Research Takeaways

The strongest incident-response products and adjacent submissions emphasize:

- one incident detail surface
- timeline as the record of truth
- status/severity/milestone visibility
- role ownership
- runbooks or workflow steps
- human approval on risky actions
- audit/export/postmortem trail

CrisisCoord should use these patterns, but stay differentiated by focusing on regulated cross-functional crisis coordination:

```text
Legal + Technical findings
  -> Communications unlock
  -> Human decision
  -> Audit trail
```

## Public Product Patterns

### FireHydrant

Useful pattern:

- Command Center as the hub of an incident.
- Central section plus right details panel.
- Top section with incident name, opener, priority, severity, milestone, status page, and incident channel.
- Incident timeline records runbook steps, user actions, task completion, messages, images, and UI events.
- Status-page publishing is not necessarily automatic.

CrisisCoord adaptation:

- Use a central command room and right decision desk.
- Treat timeline as evidence, not decoration.
- Keep communications draft-only unless a human approves.

### Rootly

Useful pattern:

- Incident timeline is the authoritative record.
- Timeline captures status transitions, role assignments, Slack messages, attachments, alerts, workflow-triggered actions, decisions, notes, and investigation steps.
- Filtering, starring, exporting, and retrospective support matter.

CrisisCoord adaptation:

- Audit tab should combine Band messages, agent events, provider metadata, evidence, and human decisions.
- Timeline filters should separate agent, human, model, Band, decision, and evidence events.

### incident.io / Incident Management Products

Useful pattern:

- Strong products reduce coordination friction.
- Slack-native tools avoid making responders switch contexts.
- Timelines, stakeholder updates, postmortems, roles, and severity updates are core.

CrisisCoord adaptation:

- Band is our coordination environment instead of Slack.
- The UI should make Band handoffs visible rather than hiding them behind a generic dashboard.

## Adjacent Band Hackathon Submissions

The public hackathon page and submission pages show several nearby ideas.

### WarRoom

Public positioning:

- Production service breaks.
- Specialized agents triage, diagnose, and fix the incident.
- Six participants share one Band room.
- Detector, Commander, Diagnostician, Remediator, Communications, Bridge.
- Human approval gates destructive remediation.
- Dashboard shows service health red-to-green, Band conversation, approval button, and MTTR.

What to learn:

- Their Band proof is strong because every handoff happens through Band messages.
- Human approval is not cosmetic because action is blocked server-side.
- The demo is clear: detect, diagnose, approve, remediate, resolve.

CrisisCoord differentiation:

- We are not production-service remediation.
- We should not center MTTR or service health.
- We should center regulated response: legal clocks, technical scope, draft communications, executive/legal decision, auditability.
- Our human gate controls external communications and regulated decisions, not server restarts or rollback.

### AEGIS

Public positioning:

- Autonomous financial-crime investigation mesh.
- 15 specialist agents.
- Evidence-grounded case room.
- Challenger and Verifier agents reduce unsupported claims.
- Human compliance escalation for uncertain cases.
- Public demo opens with upload, command center, and ask flow.
- The current public UI starts with transaction-file upload and an optional account focus field.

What to learn:

- Evidence and challenge/review loops are persuasive in regulated workflows.
- Too many agents can feel heavy for a short demo.

CrisisCoord differentiation:

- Keep five agents.
- Make the agent dependency simple enough to explain in one minute.
- Focus on crisis coordination, not investigation mesh complexity.
- Do not make file upload the first interaction. CrisisCoord should start with a crisis signal and then allow evidence to support findings.

### Band Decision Desk

Public positioning:

- Regulated financial decision desk.
- Three agents coordinate live.
- Risk can veto Strategy and force a re-plan.
- Audit hash anchors inputs and decision.

What to learn:

- Veto loops and non-linear agent coordination are memorable.
- Audit proof matters.

CrisisCoord differentiation:

- Our key non-linear behavior is not a trading veto.
- It is a communications dependency gate plus human decision escalation.

### KINANTI

Public positioning:

- Well-operations multi-agent system.
- Agents diagnose, plan intervention, review HSE, and support decisions.
- Public demo UI is simple: scenario, agents, agent results, start workflow.

What to learn:

- A simple scenario -> agents -> results flow is easy to understand.
- We can use that simplicity while making the command room more polished.

CrisisCoord differentiation:

- Add regulated communications, deadline clock, evidence review, and human decision desk.

### MediChain

Public positioning:

- Medical prior authorization review.
- Five agents collaborate through Band.
- Prepares human-reviewable decision packets.

What to learn:

- Human-reviewable packets are a strong regulated-workflow pattern.

CrisisCoord differentiation:

- Our packet is crisis response across Legal, Technical, Communications, Compliance, and Executive review.

## UI Implications For CrisisCoord

Build:

- one excellent command-room screen as the demo centerpiece
- seven real workspaces, not an incident-creation helper page counted as product depth
- Signal Intake as the place for incoming signals, sandbox scenarios, and future business-system entry points
- visible Band timeline and @mention handoffs
- dependency gate as the hero interaction
- decision desk with human approval
- audit table for source, actor, provider, model, Band reference, and review status
- settings/diagnostics page for demo readiness

Avoid:

- generic MTTR dashboard
- autonomous remediation story
- too many agents
- upload-first experience
- terminal-heavy dark UI
- fake metrics
- broad analytics before the workflow is clear

## Sources

- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon)
- [WarRoom submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/acid/warroom-band-of-agents-runs-your-incident-response)
- [AEGIS submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/agenticdeveloper/aegis-autonomous-financial-crime-investigation)
- [Band Decision Desk submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/band-decision-desk/band-decision-desk)
- [KINANTI submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/opsband-ai/kinanti-well-ops-agent-system)
- [MediChain submission](https://lablab.ai/ai-hackathons/band-of-agents-hackathon/punk67/medichain-ai-prior-auth-review)
- [FireHydrant Command Center](https://docs.firehydrant.com/docs/the-command-center)
- [FireHydrant Incident Timeline](https://docs.firehydrant.com/docs/incident-timeline)
- [Rootly Incident Timeline](https://docs.rootly.com/incidents/incident-timeline/incident-timeline)
- [Rootly incident overview](https://docs.rootly.com/incidents/incidents)
- [Rootly Incident Workflows](https://docs.rootly.com/workflows/incident-workflows)
- [incident.io evaluation framework](https://incident.io/blog/evaluate-incident-management-platforms-framework)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/base/sidebar)
- [shadcn/ui Data Table](https://ui.shadcn.com/docs/components/base/data-table)
