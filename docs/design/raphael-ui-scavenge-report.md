# Raphael UI Reference Scavenge Report

Last updated: June 13, 2026.

External repo reviewed: [rapha-io-ui/kelvin-rapha](https://github.com/rapha-io-ui/kelvin-rapha)

Purpose: identify UI/UX ideas we can adapt for CrisisCoord without copying the repo directly into this project.

## Invite Status

The GitHub repository invitation from `rapha-io-ui` was accepted for the `rapha-io-ui/kelvin-rapha` repo.

An unrelated pending invite from another account was not accepted.

## Repo Shape

Raphael's repo is a Codex-style skill toolkit, not a working product UI.

Relevant folders:

- `frontend-builder`
- `ui-ux-designer`
- `hackathon-frontend-ui`

Not relevant for CrisisCoord app UI:

- `thumbnail-workflow`

## What We Should Scavenge

### 1. Build The Real First Screen

Useful idea:

- Build the actual product workflow first, not a marketing page.

CrisisCoord adaptation:

- First screen should be the crisis command room.
- It should show the incident, five agents, Band timeline, dependency gate, draft review, and escalation decision.

### 2. Choose One UI Archetype

Useful idea:

- Pick a UI archetype before designing or coding.

CrisisCoord adaptation:

- Primary archetype: operational SaaS / regulated command center.
- Secondary archetype: AI workspace, but only inside agent output and draft review panels.
- Avoid marketplace, consumer app, and pitch/landing archetypes as the main UI.

### 3. Use A 90-Minute Hackathon Build Order

Useful idea:

- Frame, layout, build, states, polish.

CrisisCoord adaptation:

1. Frame: user is an incident commander or reviewer handling a regulated crisis.
2. Layout: incident bar, agent rail, Band timeline, right-side decision desk.
3. Build: one demo scenario end to end.
4. States: waiting, running, blocked, complete, failed, needs review, approved.
5. Polish: spacing, alignment, mobile reviewer view, text overflow, status color consistency.

### 4. Use Realistic Demo Data

Useful idea:

- Mock data should explain the product without a long voiceover.

CrisisCoord adaptation:

- Use specific timestamps.
- Use concrete agent states.
- Include one blocked dependency: Communications waiting for Legal and Technical.
- Include one failed/retry state only if it helps prove resilience.
- Keep the dataset small enough for judges to understand in under one minute.

### 5. Design Around Explicit States

Useful idea:

- Name and design UI states, not just happy-path screens.

CrisisCoord adaptation:

Required states:

- waiting
- running
- blocked
- complete
- failed
- needs review
- approved
- rejected

Apply these to:

- each agent
- every Band handoff
- communications drafts
- human decisions
- evidence artifacts
- model/provider calls

### 6. Add The Critique Rubric

Useful idea:

- Review UI by clarity, flow, hierarchy, trust, accessibility, responsiveness, and polish.

CrisisCoord adaptation:

Use this before demo:

- Clarity: can a judge understand the workflow in 10 seconds?
- Flow: does the UI show why Communications cannot run yet?
- Hierarchy: are incident severity, deadline, and human decision visible?
- Trust: are draft/legal outputs clearly review-only?
- Accessibility: are status colors paired with text or icons?
- Responsiveness: does mobile support approval review?
- Polish: do panels align and avoid text overflow?

### 7. Component Checklist

Useful idea:

- Use a small, stable component checklist before final review.

CrisisCoord adaptation:

Core components:

- incident bar
- agent rail
- Band timeline
- handoff map
- status badge
- severity badge
- dependency gate
- evidence row
- audit event row
- decision card
- draft review panel
- detail drawer
- toast
- alert
- skeleton state
- empty state
- error state

### 8. Frontend Build Layering

Useful idea:

- Implement UI in layers: shell, data, components, states, responsive behavior, polish.

CrisisCoord adaptation:

When app code starts:

1. Build app shell.
2. Add synthetic incident data.
3. Add agent status components.
4. Add timeline and handoff map.
5. Add draft review and decision queue.
6. Add all required states.
7. Verify desktop and mobile screenshots.

## What We Should Not Copy

- Do not copy Raphael's skill files into CrisisCoord as-is.
- Do not copy wording directly except short labels that are generic.
- Do not copy the thumbnail workflow into product docs.
- Do not replace CrisisCoord's existing stack or production standards with Raphael's generic hackathon workflow.
- Do not make a generic admin dashboard; keep every screen tied to the crisis-response story.

## Recommended Design Decision

Use Raphael's repo as a process reference, not a code source.

Best next UI task:

- Create a Figma or wireframe spec for the Crisis Command Room using the operational SaaS archetype.

Best next implementation task:

- Scaffold the app shell and synthetic demo state, then build the command room before secondary pages.

## Sources Reviewed

- `README.md`
- `frontend-builder/SKILL.md`
- `frontend-builder/references/demo-data-and-states.md`
- `frontend-builder/references/react-next-patterns.md`
- `frontend-builder/references/responsive-accessibility-checklist.md`
- `hackathon-frontend-ui/SKILL.md`
- `hackathon-frontend-ui/references/component-checklist.md`
- `hackathon-frontend-ui/references/hackathon-ui-playbook.md`
- `hackathon-frontend-ui/references/ui-research-from-links.md`
- `ui-ux-designer/SKILL.md`
- `ui-ux-designer/references/ui-critique-rubric.md`
- `ui-ux-designer/references/ux-flow-patterns.md`
- `ui-ux-designer/references/visual-system-guide.md`
