# UI/UX Research For CrisisCoord

Last updated: June 13, 2026.

This note summarizes the local design-link corpus under `/Users/mac/Desktop/research` and adapts the useful findings for CrisisCoord. It does not rely on, mention, or copy from any private project.

## Corpus Reviewed

Local inventory reviewed:

- 7,478 raw URL occurrences.
- 7,162 deduped URLs.
- 8 source CSV files.
- Main useful source: `The People's Design Library 1 - COMMUNITY.csv`.
- Supporting outputs: `research_outputs/all_links_deduped.csv`, `research_outputs/all_links_raw.csv`, and `research_outputs/summary.md`.

Filtering approach:

- Prioritized Figma, dashboard UI, design systems, component references, UI/UX guides, accessible primitives, icon systems, data tables, and enterprise interface patterns.
- Deprioritized unrelated 3D asset libraries, video/audio resources, social feeds, broad marketplace pages, and unclear-license download sites.
- Treated all third-party templates as inspiration only unless their license is checked before use.

## Best References To Use

| Priority | Reference | Why it matters for CrisisCoord | Use |
| --- | --- | --- | --- |
| 1 | [Figma Dashboard UI templates](https://www.figma.com/community/ui-kits/dashboards) | Strongest match for "Figma-ish" dashboard structure. Includes admin dashboards, SaaS dashboards, charts, data visualization, Tailwind-style kits, and design systems. | Layout inspiration and Figma wireframe starting point. |
| 2 | [shadcn/ui](https://ui.shadcn.com/docs) | Open-code components with accessible defaults and easy customization. Fits React, TypeScript, Tailwind, and AI-assisted development. | Recommended implementation baseline once app scaffolding starts. |
| 3 | [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Low-level accessible primitives for dialogs, dropdowns, selects, tooltips, tabs, and focus management. | Accessibility and interaction foundation. |
| 4 | [Component Gallery](https://component.gallery/components) | Clear taxonomy for tables, alerts, badges, dialogs, progress indicators, tabs, drawers, tooltips, and forms. | Component checklist for command-room UI. |
| 5 | [UI Guideline](https://www.uiguideline.com/components) | Compares common components across leading design systems. | Pattern sanity checks before building custom controls. |
| 6 | [Design Systems Repo](https://designsystemsrepo.com/) | Collection of mature design systems, articles, tools, and process references. | Design-system process and token inspiration. |
| 7 | [Awesome Design Systems](https://github.com/alexpate/awesome-design-systems) | Curated design-system references. | Secondary research when picking patterns. |
| 8 | [Material Design 3](https://m3.material.io/) | Strong system for component states, adaptive layouts, progress, motion, and design tokens. | Component behavior and responsive pattern references. |
| 9 | [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) | Strong interaction, clarity, hierarchy, and platform guidance. | UX clarity and interaction review. |
| 10 | [Laws of UX](https://lawsofux.com/) | Useful heuristics for cognitive load, chunking, Hick's Law, proximity, and selective attention. | Command-room simplification and decision-flow review. |
| 11 | [Lucide](https://lucide.dev/guide/) | Open-source icon set already aligned with the intended frontend stack. | Use for all product icons unless a missing symbol requires another set. |
| 12 | [Behance UI/UX gallery](https://www.behance.net/galleries/ui-ux) | Broad visual inspiration, but less implementation-specific. | Optional mood reference only. Do not copy layouts. |

## What To Avoid

- Do not build a landing page as the first screen. CrisisCoord should open into the working command room.
- Do not use generic 3D illustrations, decorative bokeh, abstract gradient blobs, or oversized hero sections.
- Do not copy Figma templates directly. Use them as layout references and rebuild CrisisCoord-specific components.
- Do not rely on unclear-license marketplace downloads.
- Do not use social media boards as primary design authority.
- Do not make the interface look like a consumer chatbot. It should feel like an enterprise crisis operations tool.

## Recommended Visual Direction

Use a "regulated command center" direction:

- Calm, dense, scan-friendly, and operational.
- Light-first or balanced neutral UI with a robust dark mode, not a one-note dark slate dashboard.
- Strong semantic color system for severity, deadlines, risk, completion, blocked states, and human approval.
- Small radius, crisp borders, precise spacing, and compact typography.
- Data-rich panels, timelines, tables, agent status, and decision queues.
- Visual emphasis on the workflow dependency: Communications waits for Legal and Technical outputs.

The current color recommendation is documented in [ui-color-system.md](./ui-color-system.md). The current dashboard/page recommendation is documented in [command-room-page-plan.md](./command-room-page-plan.md).

## CrisisCoord Screens To Design First

1. Crisis Command Room
   - Incident summary bar.
   - Severity, incident type, deadline, and current phase.
   - Agent status rail.
   - Band room timeline.
   - Legal obligations panel.
   - Technical findings panel.
   - Communications draft panel.
   - Human decision queue.

2. Agent Handoff Map
   - Assessment to Legal and Technical.
   - Legal and Technical to Communications.
   - All agents to Escalation.
   - Show blocked, running, complete, failed, and needs-review states.

3. Evidence And Audit View
   - Evidence artifacts table.
   - Source/fact confidence.
   - Generated draft history.
   - Human approvals and rejected drafts.
   - Band message/event references.

4. Communications Review
   - Draft body.
   - Facts used.
   - Missing facts.
   - Risk warnings.
   - Approve, request changes, or escalate actions.

5. Mobile Reviewer View
   - Decision queue.
   - One incident summary.
   - Approve/request changes controls.
   - No dense tables on mobile unless collapsed into cards.

## Component Checklist

Use these components before inventing anything custom:

- App shell with sidebar and top incident bar.
- Status badge.
- Severity badge.
- Agent status pill.
- Timeline item.
- Data table.
- Filter bar.
- Search input.
- Tabs.
- Segmented control.
- Drawer.
- Dialog.
- Tooltip.
- Toast.
- Alert/callout.
- Progress tracker.
- Skeleton loader.
- Empty state.
- File/evidence row.
- Draft review panel.
- Decision card.
- Audit event row.

## Figma Work Plan

Create one Figma file with:

1. Design tokens:
   - color roles
   - typography
   - spacing
   - radius
   - borders
   - shadows
   - state colors

2. Components:
   - buttons
   - inputs
   - badges
   - tables
   - timeline items
   - agent cards
   - decision cards
   - draft review panels

3. Frames:
   - desktop command room
   - desktop evidence/audit view
   - desktop communications review
   - mobile decision queue
   - demo start and end states

4. Prototype:
   - incident triggered
   - Assessment posts context
   - Legal and Technical complete
   - Communications draft unlocks
   - Escalation asks for human decision

## Implementation Recommendation

When the frontend is scaffolded, use:

- React + TypeScript.
- Tailwind CSS design tokens.
- shadcn/ui-style components where useful.
- Radix primitives for accessibility-sensitive controls.
- lucide-react for icons.
- TanStack Table for dense tables.
- TanStack Query for live server state.
- React Hook Form + Zod for review/approval forms.

This keeps Figma and code aligned: components, tokens, variants, and states should map directly to implementation.

## Sources

- Local link inventory: `/Users/mac/Desktop/research/research_outputs/summary.md`
- [Figma Dashboard UI templates](https://www.figma.com/community/ui-kits/dashboards)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Component Gallery](https://component.gallery/components)
- [UI Guideline](https://www.uiguideline.com/components)
- [Design Systems Repo](https://designsystemsrepo.com/)
- [Awesome Design Systems](https://github.com/alexpate/awesome-design-systems)
- [Material Design 3](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Laws of UX](https://lawsofux.com/)
- [Lucide](https://lucide.dev/guide/)
