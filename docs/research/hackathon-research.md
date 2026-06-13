# Hackathon Research

## Event

- Name: Band of Agents Hackathon
- Organizer: lablab.ai
- URL: https://lablab.ai/ai-hackathons/band-of-agents-hackathon
- Dates: June 12-19, 2026
- Submission deadline: June 19, 2026, 6:00 PM EAT / 3:00 PM UTC
- Prize pool: $10,000+

## Challenge Summary

The hackathon asks teams to build cross-framework multi-agent systems with Band.

Minimum requirement:

- At least 3 agents collaborate through Band.

Strong projects should show:

- Agent-to-agent communication.
- Structured context exchange.
- Delegation and handoff.
- Shared task state.
- Review and decision-making.
- Band as the core collaboration layer, not a final notification channel.

## Track Fit

CrisisCoord fits Track 3: Regulated & High-Stakes Workflows.

Track 3 emphasizes:

- Review
- Traceability
- Escalation
- Careful decision-making
- Compliance, risk, cybersecurity, legal, healthcare, insurance, and financial workflows

## Judging Criteria

Application of Technology:

- Show Band as the coordination layer between specialized agents.
- Make handoffs, shared context, task state, and role specialization visible.

Presentation:

- Explain the problem, agents, Band's role, context flow, handoffs, and enterprise value.

Business Value:

- Solve a meaningful enterprise workflow.
- Reduce manual coordination.
- Improve decision-making.
- Accelerate execution.
- Make complex workflows easier to operate.

Originality:

- Go beyond a chatbot or linear automation.
- Show agents discovering, coordinating, reviewing, escalating, or collaborating across frameworks.

## Relevant Band Concepts

Band provides:

- Shared agent rooms.
- Persistent agent identity.
- @mention-based routing.
- Peer discovery and recruitment.
- Structured room context.
- Real-time WebSocket subscriptions for remote agents.
- Request API for commands.
- Events for tool calls, thoughts, progress, and errors.
- Unified audit trail across agents.

Important docs:

- https://docs.band.ai/welcome
- https://docs.band.ai/api/introduction
- https://docs.thenvoi.com/core-concepts/agents
- https://docs.thenvoi.com/integrations/sdks/overview
- https://docs.thenvoi.com/getting-started/connect-remote-agent

## CrisisCoord Concept

CrisisCoord is a multi-agent enterprise crisis-response room for regulated incidents.

Target incidents:

- Data breach
- Cyberattack
- Product recall
- Compliance emergency
- Public-risk incident

Core value:

- Legal, Technical, Communications, Compliance, and Executive workflows happen together in one auditable Band room.
- Agents operate in parallel where possible and block where required.
- Human decisions are routed explicitly.

## Agent Workflow

1. Crisis Assessment Agent receives the incident signal, classifies severity, and recruits the correct agents.
2. Legal & Regulatory Agent determines disclosure obligations and posts deadlines.
3. Technical Forensics Agent confirms affected systems, scope, records, and containment.
4. Stakeholder Communications Agent drafts communications only after Legal and Technical findings are present.
5. Escalation & Decision Agent reviews the room state, detects conflicts, and requests human decisions.

## Demo Scenario

Prompt:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Expected outputs:

- Assessment: high-severity data breach, payment system, regulated disclosure likely.
- Legal: GDPR Article 33 may create a 72-hour supervisory-authority notification window for affected EU personal data; SEC materiality review may be needed if the company is public.
- Technical: 12,400 EU records confirmed, breach contained, evidence confidence high.
- Communications: regulator notification draft using Legal and Technical posts.
- Escalation: human decision required on proactive customer notification.

## Regulatory Grounding

Use these as demo context, not legal advice.

GDPR:

- Article 33 requires notification to a supervisory authority without undue delay and, where feasible, within 72 hours after awareness unless the breach is unlikely to risk individual rights and freedoms.
- Article 33 also requires documenting breach facts, effects, and remedial action.
- Article 34 covers communication to data subjects where high risk exists.

SEC:

- Domestic public companies generally file Form 8-K Item 1.05 within four business days after determining that a cybersecurity incident is material.
- Materiality determination should not be unreasonably delayed.

HIPAA:

- Covered entities must notify affected individuals, HHS, and sometimes media after breaches of unsecured protected health information.
- Individual notice is generally without unreasonable delay and no later than 60 days after discovery.
- Breaches affecting 500 or more individuals trigger additional HHS/media timing requirements.

Equifax cautionary reference:

- Public records and congressional hearing material show the 2017 incident became a cautionary story around disclosure timing, consumer response readiness, technical remediation, and coordination.

Sources:

- https://edpb.europa.eu/sme-data-protection-guide/data-breaches_en
- https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
- https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure
- https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html
- https://www.govinfo.gov/content/pkg/CHRG-115shrg28123/html/CHRG-115shrg28123.htm

## Competitive / Adjacent Submissions

The public submissions list already includes adjacent concepts:

- A production incident response room.
- A financial-crime investigation system.
- A regulated financial decision desk.
- A healthcare prior-authorization workflow.

CrisisCoord should therefore avoid sounding like a generic incident-response bot.

Differentiation:

- Cross-department enterprise crisis governance.
- Legal and technical dependencies before communications.
- Human-in-the-loop escalation as a first-class output.
- Audit-ready room state and decision packet.
