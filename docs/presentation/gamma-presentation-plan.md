# Gamma Presentation Plan

Last updated: June 13, 2026.

## Purpose

We will use Gamma to create the CrisisCoord hackathon presentation. The source material should read like a deck brief, not a workbook. Gamma should be asked to design a polished crisis-command story with agent handoffs, dependency gates, human approval, and auditability.

Use [gamma-deck-brief.md](./gamma-deck-brief.md) as the paste-ready source prompt and [visual-storyboard.md](./visual-storyboard.md) as the quality checklist.

## Gamma Role

Gamma is the presentation builder. It should help with layout, typography, visual rhythm, and deck polish. It should not invent architecture, compliance claims, legal obligations, integrations, or implementation details.

## Deck Goal

Create a concise hackathon pitch that explains:

- what CrisisCoord is
- which crisis-coordination problem it solves
- why Band is essential to the workflow
- how the five agents coordinate
- how AI/ML API and Featherless are used
- where human approval fits
- what the 60-second demo will show
- which implementation details are built, planned, or seeded for the demo

## Quality Bar

The deck should feel like a calm enterprise crisis command room. The product should be visible through interface-like slides: incident room, agent lanes, dependency gate, decision queue, and audit trail.

Avoid spreadsheet screenshots, fake metric tiles, heavy tables, robot imagery, stock-photo cyber drama, and large decorative numbers. The only numbers that should matter in the draft are the demo context, such as `2:47 AM` and the possible exposure scenario.

## Working Narrative

CrisisCoord helps regulated companies coordinate crisis response when legal, technical, communications, compliance, and executive teams all need to act from the same facts.

The product creates a shared Band room where specialized agents post findings, wait on dependencies, and escalate decisions that should remain human-controlled. Communications cannot draft external messages until Legal and Technical have posted their findings. Escalation reads the room state and flags conflicts or unresolved decisions.

That handoff is the product. Band is required because the workflow depends on agents sharing structured context and changing each other's allowed next step.

## Visual Centerpiece

The dependency gate must be the strongest visual in the deck:

```text
Legal finding + Technical finding
  -> Communications draft unlocked
  -> Human approval required
  -> Audit trail preserved
```

## Operating Architecture

Use the master implementation guide as the source of truth. In the deck, show only this level of architecture unless a deeper detail has already been built:

```text
Command-room UI
  -> Backend rule layer
  -> Supabase app state and audit records
  -> Band room for agent collaboration
  -> Specialized agents
  -> AI/ML API and Featherless model providers
```

Do not present database schema, runtime topology, production deployment choices, or unavailable screenshots as live if they are still planned.

## Team Meeting Questions

- What is the exact 60-90 second demo path?
- Which screens must exist for the first demo?
- Which agent runs live vs synthetic if API setup is risky?
- Which Featherless model will Technical Forensics use?
- Which AI/ML API model will Assessment, Legal, Communications, and Escalation use?
- How much architecture detail should be shown to judges?
- Who owns final Gamma polish and export?

## Sources

- [Gamma homepage](https://gamma.app/)
- [Gamma presentations](https://gamma.app/products/presentations)
- [Gamma import guide](https://help.gamma.app/en/articles/11047840-how-can-i-import-slides-or-documents-into-gamma)
- [Band of Agents Hackathon](https://lablab.ai/ai-hackathons/band-of-agents-hackathon)
