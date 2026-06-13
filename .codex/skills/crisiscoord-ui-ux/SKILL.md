---
name: crisiscoord-ui-ux
description: Use when designing, reviewing, or implementing CrisisCoord frontend UI/UX, Figma frames, design systems, command-room layouts, dashboard components, agent handoff flows, or visual direction.
---

# CrisisCoord UI/UX

Use this skill for CrisisCoord product design and frontend UI work.

## Portable Use

This is a project playbook, not a Codex-only instruction. Use it in Figma reviews, Cursor, Windsurf, Claude Code, ChatGPT, Band-connected coding agents, or manual frontend PR reviews.

If the tool cannot load skills, paste or attach this file before designing or implementing a page.

Before designing or implementing any page, read:

- `docs/design/ui-page-plan.md`
- `docs/design/design-direction.md`
- `docs/design/ui-ux-research.md`

## Core Direction

Design CrisisCoord as a regulated crisis command center:

- dense but calm
- scan-friendly
- operational, not decorative
- audit-ready
- human-review oriented
- visibly Band-mediated

Do not create a landing page as the primary experience. The first screen should be the working crisis command room.

Do not one-shot the UI. Plan, sketch, build static synthetic UI, then connect data and integrations.

Keep the app to the seven-route plan unless the team explicitly changes the scope:

- `/incidents/new`
- `/incidents`
- `/incidents/:incidentId`
- `/incidents/:incidentId/communications`
- `/incidents/:incidentId/audit`
- `/decisions`
- `/settings`

## Required UX Story

Every design must make this flow obvious:

1. Incident signal arrives.
2. Assessment opens or seeds the room.
3. Legal and Technical work in parallel.
4. Communications is blocked until Legal and Technical complete.
5. Communications drafts only after dependencies exist.
6. Escalation flags conflicts and human decisions.

## UI Shell

Default desktop layout:

- top incident bar with severity, phase, deadline, last refresh, and run state
- left agent rail with Assessment, Legal, Technical, Communications, Escalation
- center Band timeline and handoff map
- right decision/evidence/draft review panel

Mobile should prioritize the decision queue, incident summary, and approval actions.

## Components To Prefer

Use familiar operational components before inventing custom UI:

- status badges
- severity badges
- timeline rows
- data tables
- tabs
- segmented controls
- drawers
- dialogs
- alerts
- tooltips
- toasts
- skeleton loaders
- empty states
- decision cards
- draft review panels
- file/evidence rows

Use lucide icons for action buttons when an icon exists. Add tooltips for non-obvious icon actions.

## Visual Rules

- Use restrained neutrals plus semantic accents.
- Avoid one-note palettes.
- Avoid oversized hero type inside panels.
- Use 4px spacing rhythm.
- Keep border radius between 4px and 8px unless the local system changes.
- Do not nest cards inside cards.
- Do not use decorative gradient orbs, bokeh, or stock-like hero art.
- Keep text inside containers at all responsive sizes.

## State Rules

Every agent and workflow item needs states for:

- waiting
- running
- blocked
- complete
- failed
- needs review
- approved
- rejected

Color cannot be the only status cue. Include label, icon, or text.

## Implementation Preference

When app code exists, prefer:

- React + TypeScript
- Tailwind CSS tokens
- shadcn/ui-style components where useful
- Radix primitives for accessibility-sensitive controls
- TanStack Table for dense data tables
- TanStack Query for server state
- React Hook Form + Zod for review forms
- lucide-react for icons

## References

Read `references/ui-ux-principles.md` when you need a fuller checklist.

Project docs:

- `docs/design/ui-ux-research.md`
- `docs/design/design-direction.md`
- `docs/design/ui-page-plan.md`
