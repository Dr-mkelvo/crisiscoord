# CrisisCoord Design Direction

Last updated: June 13, 2026.

## Product Feel

CrisisCoord should feel like an enterprise crisis command center:

- calm under pressure
- dense but organized
- fast to scan
- trustworthy
- auditable
- human-review oriented

It should not feel like:

- a marketing landing page
- a generic chatbot
- a decorative AI demo
- a consumer productivity app
- a dark-blue analytics template with swapped labels

## First View

The first screen should be the working crisis command room.

Default desktop layout:

```text
+--------------------------------------------------------------------+
| Incident bar: severity, phase, deadline, last refresh, run status   |
+--------------+--------------------------------------+--------------+
| Agent rail   | Band room timeline + handoff map     | Decision desk|
|              |                                      | Evidence     |
| Assessment   | Assessment context                   | Draft review |
| Legal        | Legal obligations                    | Audit facts  |
| Technical    | Technical findings                   |              |
| Comms        | Communications dependency gate       |              |
| Escalation   | Escalation notes                     |              |
+--------------+--------------------------------------+--------------+
```

## Visual System

Use restrained neutrals with semantic accents.

Recommended roles:

- `background`: off-white or deep graphite, depending on theme.
- `surface`: slightly raised panels.
- `border`: crisp low-contrast line.
- `text`: high-contrast neutral.
- `muted`: secondary labels and metadata.
- `info`: Band room updates and neutral workflow progress.
- `success`: completed findings and approvals.
- `warning`: approaching deadlines, assumptions, missing evidence.
- `danger`: critical incident, failed agent run, blocked compliance step.
- `review`: human approval required.

Avoid a one-color palette. The interface needs semantic color, not decoration.

## Typography

- Use a clean UI sans-serif.
- Keep table, timeline, and metadata text compact.
- Reserve large type for the incident title and major state changes only.
- Do not use negative letter spacing.
- Do not scale font size with viewport width.

Suggested scale:

- 12px metadata
- 13px table cells
- 14px body
- 16px panel headings
- 20px page/incident heading
- 24px exceptional demo emphasis only

## Spacing And Shape

- Use a 4px spacing rhythm.
- Prefer 4px to 8px radii.
- Keep cards shallow and purposeful.
- Do not put cards inside cards.
- Use full-height panels instead of decorative floating sections.
- Keep hover states and loading states dimensionally stable.

## Interaction Rules

- Communications is locked until Legal and Technical complete.
- Human approvals are explicit actions, never hidden behind automatic generation.
- Every generated draft shows facts used and missing facts.
- Every timeline item shows agent, timestamp, state, and confidence where relevant.
- Failed agent runs must be visible and recoverable.
- The user can inspect why a decision is needed.

## Required States

Every agent and workflow item should support:

- waiting
- running
- blocked
- complete
- failed
- needs review
- approved
- rejected

## Demo Storyboard

The 60-second demo should show:

1. Incident arrives.
2. Assessment classifies severity and opens the room.
3. Legal and Technical run in parallel.
4. Communications is visibly gated.
5. Legal posts obligations.
6. Technical posts confirmed scope.
7. Communications unlocks and drafts messages.
8. Escalation asks for a human decision.

## Accessibility Baseline

- All interactive controls must be keyboard reachable.
- Visible focus states are required.
- Icons need accessible names when they are actions.
- Color cannot be the only status indicator.
- Avoid tiny click targets.
- Motion should be brief and avoid distracting loops.
- Use `aria-live` only for important real-time updates.

## Design Review Checklist

Before implementing or merging UI work:

- Does the first screen show the actual crisis room?
- Can a judge understand the five agents in under 10 seconds?
- Is the Communications dependency gate visible?
- Is the human decision point visible?
- Are legal/regulatory outputs framed as draft guidance for review?
- Are generated communications clearly drafts?
- Are synthetic data labels present where needed?
- Can the UI handle loading, failed, empty, and blocked states?
- Does it work on mobile for quick approvals?
- Does the design avoid decorative hero/layout patterns?
