# CrisisCoord Hackathon Brief

## Source Context

- Hackathon: Band of Agents Hackathon by lablab.ai
- Official page: https://lablab.ai/ai-hackathons/band-of-agents-hackathon
- Build window: June 12-19, 2026
- Submission deadline shown in the pasted local page: June 19, 2026, 6:00 PM EAT
- Track: Track 3, Regulated & High-Stakes Workflows
- Note: no separate public "ZAD track" was found in Exa results. Treat this as Track 3 unless the team has private sponsor guidance.

## Official Hackathon Requirements To Optimize For

- Build a cross-framework multi-agent system with Band.
- Use at least 3 agents collaborating through Band.
- Band must be the actual collaboration layer, not a thin wrapper or final notification channel.
- Agents should communicate, share structured context, delegate work, hand off tasks, or coordinate state as part of the core workflow.
- Strong submissions should make the agent collaboration visible, useful, and central.

## Judging Criteria

- Application of Technology: Band as coordination layer between specialized agents, with visible handoffs, shared context, role specialization, task state, and coordination.
- Presentation: clear problem, agent roles, Band's role, context flow, handoffs, and enterprise value.
- Business Value: solve a meaningful enterprise workflow, reduce manual coordination, improve decisions, accelerate execution, or make complex workflows easier to operate.
- Originality: go beyond a simple chatbot, single-agent assistant, or linear automation; show discovery, coordination, review, escalation, conflicts, or cross-framework collaboration.

## Product Direction

CrisisCoord is a multi-agent enterprise crisis-response room for regulated incidents such as data breaches, cyberattacks, product recalls, and compliance emergencies.

The core promise:

> When a crisis hits, Legal, Technical, Communications, and Compliance work at the same time in one auditable Band room instead of passing scattered documents and Slack messages sequentially.

## Differentiation

The public submissions list already includes adjacent ideas:

- "WarRoom band of agents runs your incident response" focuses on production service incident response.
- "AEGIS" focuses on autonomous financial-crime investigation.
- "MediChain AI" focuses on medical prior authorization.
- "Band Decision Desk" focuses on regulated financial decisions.

CrisisCoord should differentiate as cross-department enterprise crisis governance:

- Not only technical incident response.
- Not only legal/regulatory analysis.
- Not only communications drafting.
- The product is the dependency-aware coordination between those functions.

## Five Agents

1. Crisis Assessment Agent
   - Receives the crisis signal.
   - Classifies crisis type and severity.
   - Creates or seeds the Band room with structured incident context.
   - Recruits the needed specialist agents.

2. Legal & Regulatory Agent
   - Reads the assessment.
   - Determines likely disclosure obligations and deadlines.
   - Posts a structured obligations packet to Band.
   - Example obligations for the demo can include GDPR Article 33 and SEC cybersecurity disclosure checks.

3. Technical Forensics Agent
   - Reads the assessment.
   - Determines affected systems, data categories, containment state, evidence confidence, and unknowns.
   - Posts a structured scope-and-containment packet to Band.

4. Stakeholder Communications Agent
   - Must wait until both Legal and Technical findings are present.
   - Drafts tiered communications for regulators, executives, customers, and internal responders.
   - Should visibly refuse to run when required dependencies are missing.

5. Escalation & Decision Agent
   - Reads the full Band room.
   - Flags conflicts, missing evidence, deadline risk, and decision points.
   - Routes human-in-the-loop decisions.
   - Produces the final crisis decision packet and audit summary.

## Band Usage That Must Be Visible

Show these moments in the demo:

- Assessment posts structured context to the Band room.
- Assessment recruits Legal and Technical.
- Legal posts obligations and deadlines.
- Technical posts scope, systems, containment, and confidence.
- Communications checks room state and blocks if Legal or Technical findings are missing.
- Communications drafts only after both dependencies exist.
- Escalation compares all posts, detects conflicts or missing approvals, and asks for a human decision.
- Agents post task events/progress so the room becomes an audit trail.

## Demo Scenario

Initial crisis signal:

> At 2:47 AM, unauthorized access was detected in the payment system. 50,000 card records are potentially exposed.

Expected 60-second flow:

1. Assessment: severity high, data-breach crisis, payment-system scope, potential regulated disclosure.
2. Legal: GDPR Article 33 may create a 72-hour supervisory-authority notification window for affected EU personal data; SEC materiality review may be needed for public-company scenarios.
3. Technical: 12,400 EU records confirmed, payment token table accessed, intrusion contained, evidence confidence high.
4. Communications: regulator notification draft uses Legal obligations plus Technical scope; customer draft remains gated.
5. Escalation: "Do we notify customers proactively before complete card-brand confirmation? Human decision required."

## Regulatory Grounding For Demo

Use as demo context, not legal advice:

- GDPR Article 33: controllers notify the supervisory authority without undue delay and, where feasible, within 72 hours after awareness unless the breach is unlikely to risk individuals' rights and freedoms.
- GDPR Article 33 also requires documentation of breach facts, effects, and remedial action.
- SEC cybersecurity rules: domestic public-company Form 8-K Item 1.05 is generally due within four business days after determining a cybersecurity incident is material.
- HIPAA breach notification: for unsecured protected health information, notifications are generally without unreasonable delay and no later than 60 days after discovery; 500+ individual breaches trigger Secretary and sometimes media notice requirements.
- Equifax 2017 is useful as a recognizable cautionary example: public records show a gap between discovery and public disclosure, and congressional questioning focused heavily on delay, preparedness, and coordination.

Sources:

- Hackathon page: https://lablab.ai/ai-hackathons/band-of-agents-hackathon
- Band docs: https://docs.band.ai/welcome
- Band API intro: https://docs.band.ai/api/introduction
- Band SDK overview: https://docs.thenvoi.com/integrations/sdks/overview
- Band agents concept: https://docs.thenvoi.com/core-concepts/agents
- GDPR text: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679
- EDPB breach guide: https://edpb.europa.eu/sme-data-protection-guide/data-breaches_en
- SEC cybersecurity disclosure guide: https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/cybersecurity-risk-management-strategy-governance-incident-disclosure
- HHS HIPAA breach notification: https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html
- Equifax Senate hearing record: https://www.govinfo.gov/content/pkg/CHRG-115shrg28123/html/CHRG-115shrg28123.htm

## Recommended Build Shape

- Frontend: React, TypeScript, Tailwind, and dense operational dashboard UI.
- Use synthetic demo incidents only.
- Backend/demo orchestration: a small local or hosted service that sends incident signals and displays Band room state.
- Agents: implement at least 3, preferably all 5. The minimum viable demo can ship with Assessment, Legal, Technical, Communications, and Escalation as separate Band-visible participants.
- Data: use synthetic crisis scenarios only.
- UI: first screen should be the crisis command room, not a landing page.

## Submission Assets Checklist

- Project title: CrisisCoord
- Short description: Multi-agent enterprise crisis response room where legal, technical, communications, and escalation agents coordinate regulated incidents through Band.
- Long description: emphasize dependency-aware collaboration, traceability, and human-in-the-loop decisions.
- Tags: Band, multi-agent, crisis response, compliance, cybersecurity, regulated workflows, enterprise operations.
- Public GitHub repo.
- Hosted demo URL.
- 60-90 second video showing the Band room handoffs.
- Slide deck with problem, agent architecture, Band flow, demo scenario, business value, and roadmap.
