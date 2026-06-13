# UI Page Plan And Figma Sketch Brief

Last updated: June 13, 2026.

## Core Rule: Do Not One-Shot The UI

Do not attempt to build every page, component, state, and integration in one pass.

Every major UI surface should move through this sequence:

1. Define the page goal.
2. Define the primary user and decision.
3. Sketch the Figma frame.
4. List required data and empty/loading/error states.
5. Build the static version with synthetic data.
6. Connect local state or seeded Supabase data.
7. Connect Band/API behavior.
8. Verify desktop and mobile behavior.
9. Merge only after the page has a clear review path.

This keeps the project from becoming a wide, shallow dashboard. We want a few excellent screens that prove the crisis-response workflow.

The final build recommendation and route ceiling live in [final-ui-ux-brief.md](./final-ui-ux-brief.md). Treat that brief as the source of truth before starting Figma frames or React implementation.

## Design System Direction

Use Figma for the first design pass and shadcn/ui-style React components for implementation.

Color tokens, severity mapping, status mapping, and accessibility rules are defined in [ui-color-system.md](./ui-color-system.md).

The detailed dashboard anatomy, tabs, table rules, and command-room happy path are defined in [command-room-page-plan.md](./command-room-page-plan.md).

Static visual references for the first seven workspaces are available in [ui-design-mockups.md](./ui-design-mockups.md).

Figma owns:

- layout
- tokens
- component variants
- state design
- demo prototype

Code owns:

- accessible components
- data loading
- validation
- role permissions
- Band/Supabase state
- responsive behavior

Responsive behavior must follow [../platform-support.md](../platform-support.md). Do not merge a major UI page unless mobile, tablet, laptop, and desktop behavior is known.

Recommended implementation base:

- Tailwind CSS tokens
- shadcn/ui-style components
- Radix primitives for dialogs, drawers, tabs, select menus, tooltips, and focus handling
- lucide-react icons
- TanStack Table for evidence/audit tables
- TanStack Query for server state

## Recommended Page Count

Best sweet spot: seven real app workspaces.

This is a revised recommendation after reviewing the current product direction, the existing UI inspiration, shadcn/ui application patterns, and incident-management products such as FireHydrant and Rootly. The strongest pattern is not "more pages." It is one excellent incident command surface supported by a small set of meaningful operational workspaces.

Do not count incident creation as a standalone page. Starting an incident should be an action inside Signal Intake, because the page should also show incoming signals, sandbox scenarios, and future integration entry points.

Recommended route set:

| # | Route | Page | MVP role |
| --- | --- | --- | --- |
| 1 | `/signals` | Signal Intake And Sandbox Launcher | Receive or launch crisis signals; choose finance, health, or product/supply-chain scenarios. |
| 2 | `/incidents` | Incident Registry | Show active, demo, resolved, and archived incidents. |
| 3 | `/incidents/:incidentId` | Crisis Command Room | Main product surface and demo centerpiece. |
| 4 | `/incidents/:incidentId/communications` | Communications Review | Review regulator, customer, executive, and internal drafts. |
| 5 | `/decisions` | Decision Desk | Fast executive, legal, or communications approvals. |
| 6 | `/incidents/:incidentId/audit` | Evidence And Audit | Review source facts, evidence, model/provider metadata, and timeline. |
| 7 | `/settings` | Integrations And Demo Readiness | Demo-safe status for Band, Supabase, AI/ML API, Featherless, and fallback mode. |

Build priority should be:

1. Crisis Command Room
2. Signal Intake And Sandbox Launcher
3. Incident Registry
4. Communications Review
5. Decision Desk
6. Evidence And Audit
7. Integrations And Demo Readiness

Keep these inside existing pages instead of making separate routes at first:

- Agent Handoff Map: panel/tab inside Crisis Command Room.
- Compliance Rules Review: panel/tab inside Crisis Command Room or Evidence And Audit.
- Agent details: drawer inside Crisis Command Room.
- Evidence detail: drawer inside Evidence And Audit.
- Playbook details: section inside Signal Intake or Evidence And Audit.
- Provider diagnostics detail: drawer inside Settings.

This gives us a clean URL map while still allowing the UI to show detailed workflow states.

## Page Details

### 1. Signal Intake And Sandbox Launcher

Priority: MVP support page, but make it feel like a real product entry point.

Route:

```text
/signals
```

Primary user:

- Demo operator, Incident Commander, Security Lead, Compliance Lead

Purpose:

- Receive or launch synthetic crisis signals without connecting real systems.
- Show how CrisisCoord would later sit in front of business tools, alert sources, vendor notices, support escalations, and legal/compliance reports.

Core layout:

- signal source cards: security alert, vendor notice, support escalation, legal/compliance report, manual tabletop scenario
- sandbox selector: finance, health, product/supply chain
- incident signal text area
- data category chips
- affected systems chips
- expected agents preview
- launch command room button

Suggested scenario templates:

- payment data exposure
- public-company zero-day
- healthcare data exposure
- critical infrastructure ransomware
- supply-chain compromise

Rule:

- Do not make this a marketing page or file-upload page.
- Do not label the nav item as a creation form. Use "Signals" or "Signal Intake."
- File upload can appear later as supporting evidence after an incident exists.

### 2. Incident Registry

Priority: MVP support page.

Route:

```text
/incidents
```

Primary user:

- Incident Commander

Purpose:

- List active and synthetic demo incidents so the app has a clear entry point after login.

Core layout:

- incident table or compact list
- severity
- incident type
- current phase
- decision status
- deadline
- assigned owner
- open command room action

Rule:

- Keep this page lean. It is a registry and triage surface, not the main dashboard.

### 3. Crisis Command Room

Priority: MVP, build first.

Route:

```text
/incidents/:incidentId
```

Primary user:

- Incident Commander

Purpose:

- Show the whole crisis workflow in one operational surface.

Core layout:

- top incident bar
- left agent rail
- center Band timeline and handoff map
- right decision desk with draft review and evidence summary
- tabs for Overview, Handoffs, Findings, Drafts, and Audit

Must show:

- incident severity
- current phase
- disclosure/deadline clock
- last refreshed time
- five agent statuses
- Communications dependency gate
- Band messages/events
- human decision request

The first viewport should not be a table. Tables belong in the incident queue, evidence/audit view, and diagnostics/settings surfaces.

States:

- initial signal received
- assessment running
- Legal and Technical running in parallel
- Communications blocked
- Communications unlocked
- Escalation needs decision
- failed agent run

### Command Room Panel: Agent Handoff Map

Priority: MVP, but keep it inside the command room first.

Location:

```text
/incidents/:incidentId
```

Primary user:

- Incident Commander

Purpose:

- Explain why Band is necessary and what each agent is waiting for.

Core layout:

- graph of Assessment to Legal/Technical to Communications to Escalation
- status row for each handoff
- dependency details drawer

Must show:

- Communications waits for both Legal and Technical
- Escalation reads full room state
- failed or missing handoffs are visible

### 4. Communications Review

Priority: MVP.

Route:

```text
/incidents/:incidentId/communications
```

Primary user:

- Communications Lead and Legal Reviewer

Purpose:

- Review regulator, customer, executive, and internal drafts.

Core layout:

- draft selector
- draft body
- facts used
- missing facts
- legal warnings
- approve / request changes / escalate actions

Rule:

- Every generated message is a draft. The UI must never imply external delivery happened automatically.

### 5. Decision Desk

Priority: MVP for mobile and executive review.

Route:

```text
/decisions
```

Primary user:

- Executive Approver, Legal Reviewer, Communications Lead

Purpose:

- Let a reviewer see pending human decisions quickly.

Core layout:

- compact list of decision cards
- incident severity and deadline
- recommendation summary
- risk of approving
- risk of waiting
- approve / reject / request more info

Mobile behavior:

- This is the most important mobile view.
- No dense tables on mobile.

### 6. Evidence And Audit

Priority: MVP if time allows; otherwise post-MVP.

Route:

```text
/incidents/:incidentId/audit
```

Primary user:

- Compliance Auditor, Legal Reviewer, Technical Lead

Purpose:

- Show source facts, evidence packets, generated findings, approvals, and Band references.

Core layout:

- filterable audit timeline
- evidence table
- agent outputs
- decision records
- export placeholder

Must show:

- actor
- timestamp
- source
- confidence
- review status

### Command Room Or Audit Panel: Compliance Rules Review

Priority: post-MVP unless needed for demo explanation. Keep it as a panel/tab first.

Location:

```text
/incidents/:incidentId
/incidents/:incidentId/audit
```

Primary user:

- Legal Reviewer

Purpose:

- Review possible obligations surfaced by the Legal Agent.

Core layout:

- obligation candidates
- crisis signal facts
- source references
- deadline estimate
- confidence and missing facts
- approve / reject / mark unknown

Rule:

- The product surfaces possible obligations for review. It does not finalize legal conclusions.

### 7. Integrations And Demo Readiness

Priority: post-MVP.

Route:

```text
/settings
```

Primary user:

- Admin, Demo Operator, Technical Lead

Purpose:

- Configure demo-safe integration state.

Core layout:

- Band agent status
- Supabase status
- AI/ML API status
- Featherless status
- synthetic-data mode indicator
- seeded fallback state
- last successful provider run

Rule:

- Keep secrets out of the browser and out of screenshots.

## Suggested First Figma Frames

Create these frames before frontend coding:

1. `Desktop / Crisis Command Room / Assessment running`
2. `Desktop / Crisis Command Room / Communications blocked`
3. `Desktop / Crisis Command Room / Communications unlocked`
4. `Desktop / Communications Review / Draft needs approval`
5. `Desktop / Signal Intake / Sandbox launcher`
6. `Desktop / Evidence Audit / Filtered timeline`
7. `Mobile / Decision Desk / Pending approval`

## Figma Frame Sizes

Use:

- desktop: `1440 x 960`
- laptop: `1280 x 832`
- tablet: `834 x 1112`
- mobile: `390 x 844`

Also sanity-check small mobile at `360 x 740` and wide desktop at `1536 x 960` or wider once implementation exists.

## Command Room Wireframe

A low-fidelity SVG wireframe is available at:

- [wireframes/crisis-command-room-low-fi.svg](./wireframes/crisis-command-room-low-fi.svg)

This can be imported into Figma as a rough starting point. It is intentionally low-fidelity so the team can refine layout, spacing, typography, and component variants in Figma.

## Page Acceptance Checklist

Before a page moves from design to implementation:

- Does it have a clear primary user?
- Does it have one primary decision or workflow?
- Are loading, empty, error, blocked, and review states defined?
- Are required data fields known?
- Are permissions known?
- Is the mobile behavior known?
- Is the page connected to the demo story?
- Does it avoid real/private data?

Before a page is merged:

- Static synthetic data renders correctly.
- Text does not overflow.
- The layout works on mobile, tablet, laptop, and desktop.
- The page does not create accidental horizontal scrolling.
- Interactive controls have visible focus.
- Status color is paired with text or icon.
- Critical rules are enforced server-side or documented for backend wiring.
- Playwright or manual screenshot check is recorded once the app exists.
