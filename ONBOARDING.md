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
- Hono or Fastify for API routes
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

- Use Supabase Auth if we want one platform for auth, database, RLS, and storage.
- Use Clerk only if we want a more polished auth UX quickly.

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
BAND_AGENT_COMMS_ID=
BAND_AGENT_COMMS_KEY=
BAND_AGENT_ESCALATION_ID=
BAND_AGENT_ESCALATION_KEY=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

MODEL_PROVIDER=aimlapi
MODEL_TIMEOUT_MS=45000
MODEL_MAX_RETRIES=2

OPENAI_API_KEY=
AIML_API_BASE_URL=https://api.aimlapi.com/v1
AI_ML_API_KEY=
AIML_DEFAULT_MODEL=google/gemma-3-4b-it
FEATHERLESS_API_BASE_URL=https://api.featherless.ai/v1
FEATHERLESS_API_KEY=
FEATHERLESS_DEFAULT_MODEL=Qwen/Qwen2.5-7B-Instruct
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
3. Choose Supabase Auth vs Clerk.
4. Define the crisis-room schema.
5. Define structured output contracts for each agent.
6. Build the model-provider wrapper for AI/ML API and Featherless.
7. Build the synthetic 60-second demo scenario.
8. Create the first UI wireframe for the crisis command room.
