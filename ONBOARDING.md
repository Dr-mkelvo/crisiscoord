# Onboarding

This guide explains how contributors should set up and work on CrisisCoord.

## Project Name

- Product name: CrisisCoord
- Repository slug: `crisiscoord`
- Purpose: multi-agent enterprise crisis response for regulated workflows

## Development Rules

- Do not commit secrets.
- Do not use real customer, employee, patient, payment, legal, security, company-confidential, or private incident data.
- Use synthetic demo incidents only.
- Do not push directly to `main`.
- Create a branch for every change and open a pull request.
- Run `./scripts/setup-git-hooks.sh` after cloning so Git blocks direct pushes to `main`.
- On Windows, install Git for Windows and run `./scripts/setup-git-hooks.sh` from Git Bash. Do not use PowerShell as the required project setup path.

## Platform Support

CrisisCoord must support contributors on macOS, Linux, and Windows 10/11.

The product UI must support mobile, tablet, laptop, desktop, and wide desktop screens. Use [docs/platform-support.md](./docs/platform-support.md) as the source of truth for:

- cross-platform scripting rules
- path and environment-variable handling
- Git hook setup on macOS/Linux/Windows
- responsive breakpoints and viewport targets
- UI acceptance criteria for mobile, tablet, and desktop

Normal development commands should run through package scripts once implementation starts:

```bash
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm build
```

Do not add bash-only commands to normal project scripts unless there is a Windows-compatible wrapper.

Windows-compatible means the command runs from Git Bash, or the logic is moved into a Node/TypeScript helper called from a package script.

## Shared Skills

Use the repo skills in `.codex/skills` to keep work consistent across contributors:

- `crisiscoord-collaboration`: branch, PR, validation, and repo hygiene workflow.
- `crisiscoord-ui-ux`: Figma, shadcn/ui-style components, route scope, page states, and visual consistency.
- `crisiscoord-backend-agents`: backend APIs, Supabase, Band agents, model providers, trigger handling, audit events, and server-side gates.

These are portable Markdown playbooks. Codex can auto-load them, but contributors using Cursor, Windsurf, Claude Code, ChatGPT, Band-connected coding agents, or manual GitHub review should still read or attach the relevant `SKILL.md`.

Read [docs/collaboration/skills-and-rules.md](./docs/collaboration/skills-and-rules.md) and [docs/collaboration/project-playbooks.md](./docs/collaboration/project-playbooks.md) before opening a pull request. The GitHub pull request template asks which skill was used and captures the UI or backend contract for review.

## Recommended Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Router
- TanStack Query
- TanStack Table
- React Hook Form
- Zod
- lucide-react
- Playwright for browser checks

### Backend

- TypeScript
- Hono for API routes
- Zod for request, response, and environment validation
- OpenAPI later if we expose a formal API contract
- Background jobs through scripts or a lightweight worker

### Database

We are not using Convex for this project.

Recommended database: Supabase Postgres.

Why Supabase fits:

- Postgres is familiar to enterprise teams and judges.
- Row Level Security can model Legal, Technical, Communications, Executive, Admin, and Read-only roles.
- Realtime can support crisis-room updates if we need it.
- Storage can hold synthetic evidence packets, reports, and generated communications.
- Edge Functions can support small server-side workflows if needed.
- Supabase CLI gives local development and migrations.

Alternative database options:

- Neon Postgres: strong hosted Postgres choice if we want a thinner backend.
- Railway Postgres: simple for hackathon deployment.
- SQLite/libSQL: fastest local prototype, weaker for role/security story.

Recommendation: use Supabase unless setup speed becomes a blocker.

### Auth

Recommended path:

- Use Supabase Auth first so auth, database, RLS, and storage stay in one explainable platform.
- Use Clerk only if Supabase Auth becomes a demo-blocking issue.

For judging, Supabase Auth plus RLS is easier to explain as a regulated-workflow architecture.

### Deployment

- Demo app: Vercel
- Database: Supabase project
- Agents: local/hosted workers connected to Band through the Band SDK or Agent API
- Repository: public GitHub repo

## API Documentation

Start with [docs/api/README.md](./docs/api/README.md).

Key guides:

- [Band API notes](./docs/api/band-api.md)
- [Supabase API notes](./docs/api/supabase-api.md)
- [Model provider API notes](./docs/api/model-provider-apis.md)
- [Live data API notes](./docs/api/live-data-apis.md)
- [Technology partner plan](./docs/research/technology-partners.md)
- [Partner implementation requirements](./docs/architecture/partner-implementation-requirements.md)
- [Runtime and rate-limit notes](./docs/api/runtime-and-rate-limits.md)

## Environment Variables

Create `.env.local` for local app values.

Expected variables once implementation starts:

```bash
BAND_API_BASE_URL=https://app.band.ai/api/v1/agent
BAND_WS_URL=wss://app.band.ai/api/v1/socket/websocket
BAND_AGENT_ASSESSMENT_ID=
BAND_AGENT_ASSESSMENT_KEY=
BAND_AGENT_LEGAL_ID=
BAND_AGENT_LEGAL_KEY=
BAND_AGENT_TECHNICAL_ID=
BAND_AGENT_TECHNICAL_KEY=
BAND_AGENT_COMMUNICATIONS_ID=
BAND_AGENT_COMMUNICATIONS_KEY=
BAND_AGENT_ESCALATION_ID=
BAND_AGENT_ESCALATION_KEY=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

MODEL_PROVIDER=aimlapi
MODEL_TIMEOUT_MS=45000
MODEL_MAX_RETRIES=2

AIML_API_BASE_URL=https://api.aimlapi.com/v1
AI_ML_API_KEY=
AIML_DEFAULT_MODEL=google/gemma-3-4b-it
FEATHERLESS_API_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_API_KEY=
FEATHERLESS_DEFAULT_MODEL=Qwen/Qwen2.5-7B-Instruct

# Optional live-data providers are listed in .env.example.
# Keep all provider keys server-side.
```

Never commit `.env.local`, Band API keys, Supabase service-role keys, model API keys, or deployment tokens.

## Local Setup Placeholder

Implementation has not started yet. Once the app is scaffolded, setup should look like:

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Planned scripts:

```bash
pnpm dev
pnpm test
pnpm lint
pnpm build
pnpm db:migrate
pnpm db:seed
```

## First Research Tasks

1. Validate Band agent keys with `GET /me` relative to the Band agent base URL.
2. Confirm Band SDK setup path and whether to use platform agents, remote agents, or a mix.
3. Confirm Supabase Auth setup and RLS role mapping.
4. Define the crisis-room schema.
5. Define structured output contracts for each agent.
6. Build the model-provider wrapper for AI/ML API and Featherless.
7. Build public live-data adapters for CISA KEV, NVD, EPSS, OSV, GitHub Advisories, SEC EDGAR, and openFDA.
8. Prove the demo path uses AI/ML API and Featherless with provider metadata in the audit trail.
9. Build the synthetic 60-second demo scenario.
10. Keep the Figma file aligned with the responsive tab-state matrix: seven routes, four tabs per route, and desktop/tablet/mobile frames for every tab.
11. Create the first UI wireframe for the crisis command room.

## Product Direction

Before implementation starts, read:

- [AGENTS.md](./AGENTS.md)
- [docs/product/project-vision.md](./docs/product/project-vision.md)
- [docs/product/build-plan.md](./docs/product/build-plan.md)
- [docs/collaboration/skills-and-rules.md](./docs/collaboration/skills-and-rules.md)
- [docs/collaboration/project-playbooks.md](./docs/collaboration/project-playbooks.md)
- [docs/architecture/system-architecture.md](./docs/architecture/system-architecture.md)
- [docs/architecture/agent-implementation-plan.md](./docs/architecture/agent-implementation-plan.md)
- [docs/architecture/partner-implementation-requirements.md](./docs/architecture/partner-implementation-requirements.md)
- [docs/design/ui-page-plan.md](./docs/design/ui-page-plan.md)
- [docs/compliance/trigger-model.md](./docs/compliance/trigger-model.md)
- [docs/research/research-roadmap.md](./docs/research/research-roadmap.md)

These documents explain what we are building, how UI/UX and backend work together, which pages we plan to add, what the MVP includes, what we are not building, which research is already complete, and which targeted questions still need validation.

## Build Approach

Before coding a feature, read [docs/architecture/engineering-playbook.md](./docs/architecture/engineering-playbook.md).

Use the playbook to map each feature through:

- user workflow
- agent workflow
- data model
- permission model
- audit model
- demo value
