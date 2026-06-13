# CrisisCoord Project Vision

Last updated: June 13, 2026.

## Project Goal

CrisisCoord helps an enterprise coordinate high-stakes incidents where Legal, Technical, Communications, Compliance, and Executive teams must act together.

The goal is to turn a crisis signal into a structured, auditable response room where specialized agents work through Band, produce reviewable outputs, and route human decisions before anything external is sent.

## Problem Statement

When a regulated company faces a crisis, the response usually fragments immediately.

Technical teams investigate scope in one place. Legal teams track disclosure risk in another. Communications teams draft customer, regulator, investor, or executive language with incomplete facts. Compliance teams try to reconstruct the timeline afterward. Executives are forced to make time-sensitive decisions without a single reliable view of confirmed facts, assumptions, deadlines, and unresolved questions.

That creates predictable failure modes:

- missed or misunderstood disclosure clocks
- customer or regulator messages drafted from stale facts
- technical findings that never reach Legal or Communications in time
- duplicated work across teams
- unclear ownership for high-risk decisions
- audit trails rebuilt after the incident instead of captured during it
- unsafe pressure to publish or escalate before facts are reviewed

CrisisCoord solves this by making the crisis room itself the product. The system forces specialized agents to coordinate through Band, makes dependency gates visible, separates source facts from generated findings, and keeps human approval at the center of every external-facing decision.

The core problem is not that companies lack another dashboard. The problem is that crisis response is cross-functional, time-sensitive, regulated, and usually coordinated through disconnected tools. CrisisCoord gives that workflow one shared, reviewable operating surface.

## Product Vision

CrisisCoord should become the command layer for regulated crisis response.

In a real organization, a breach, cyberattack, product issue, platform outage, or compliance event often spreads across ticketing tools, chat threads, legal drafts, spreadsheets, executive updates, and forensic notes. The product vision is to replace that scattered coordination with one shared crisis room that can show:

- what happened
- what is confirmed
- what is assumed
- who is working on each part
- what legal or regulatory clocks may apply
- what technical scope is known
- what communications are drafted
- what decisions need a human
- what evidence supports each step

The hackathon version should prove that vision through one excellent demo scenario.

## Core Thesis

The crisis response should not be a single assistant answering questions. It should be a coordinated group of specialized agents that depend on one another.

The most important dependency is:

```text
Assessment -> Legal + Technical -> Communications -> Escalation + Human decision
```

Communications must not draft regulator, customer, or executive messages until Legal and Technical have posted enough findings. That dependency is the product.

## Who We Are Building For

Primary demo user:

- Incident Commander who needs a fast, trustworthy crisis picture.

Secondary users:

- Legal Reviewer who verifies obligations, deadlines, and wording.
- Technical Lead who confirms affected systems, scope, containment, and evidence confidence.
- Communications Lead who prepares drafts but cannot publish without approval.
- Executive Approver who handles high-risk tradeoffs.
- Compliance Auditor who reviews the event timeline after the fact.

## User Promise

CrisisCoord should let the user say:

> I know what happened, what is still unknown, what obligations may apply, what communications are safe to review, and what decision needs a human right now.

## Product Principles

- Band is the collaboration layer, not a wrapper.
- Human approval is required for external-facing decisions.
- Five agents are the default demo architecture, not the minimum three-agent fallback.
- AI may classify, summarize, draft, route, validate, and log, but it must not make final legal, external, destructive, or unclear high-risk decisions.
- Legal and compliance outputs are draft guidance, not legal advice.
- Every output must separate confirmed facts from assumptions.
- Every important action must be traceable.
- The UI must show dependency gates, deadlines, and uncertainty.
- Demo data must be synthetic.

## What Makes CrisisCoord Different

Adjacent products and hackathon ideas already cover incident triage, SOC automation, generic executive war rooms, and financial decision desks.

CrisisCoord should stay differentiated as regulated crisis governance:

- cross-functional response, not only technical incident response
- dependency-gated communications, not free-form drafting
- human-in-the-loop escalation, not autonomous external action
- regulatory deadline awareness, not final legal advice
- audit-ready evidence and decision trail, not a chat transcript alone

## First Demo Story

Initial signal:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Expected story:

1. Assessment identifies a high-severity data breach scenario.
2. Legal identifies possible disclosure obligations and missing jurisdiction facts.
3. Technical confirms systems, data categories, containment, and confidence.
4. Communications unlocks only after Legal and Technical findings exist.
5. Escalation asks whether to notify customers proactively before every fact is complete.

## Product Boundaries

CrisisCoord does not:

- provide final legal advice
- connect to real enterprise systems during the public demo
- send customer, regulator, investor, or media notices automatically
- store real incident or personal data
- replace forensic teams, lawyers, or executives

CrisisCoord does:

- structure the crisis room
- coordinate specialized agents
- surface likely obligations for review
- produce draft communications
- capture human decisions
- preserve an auditable timeline

## Success Criteria

For the hackathon, success means:

- the demo shows at least three agents collaborating through Band
- the five-agent flow is visible in the UI
- Communications is visibly blocked until Legal and Technical finish
- the regulatory clock and human decision are easy to understand
- the app feels like an enterprise command center, not a chatbot
- the architecture is credible enough for a regulated workflow

See [decision-guardrails-questionnaire.md](./decision-guardrails-questionnaire.md) for the global decision guardrails plan, automation boundaries, data-protection controls, and human-escalation rules.
