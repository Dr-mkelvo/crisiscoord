# Supabase API Notes

Last updated: June 13, 2026.

Supabase should hold CrisisCoord application state: users, roles, incidents, Band room references, agent outputs, audit events, human decisions, and synthetic evidence artifacts.

## Use Cases

- Supabase Auth for contributor/demo-user login.
- Postgres for incident records, agent outputs, and audit timeline.
- Row Level Security for role-based access.
- Storage for synthetic evidence packets, generated reports, and draft communications.
- Realtime for live dashboard updates if Band events alone are not enough.
- Edge Functions only if we need small server-side workflows near Supabase.

## Required Environment Variables

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Browser code may use only `SUPABASE_ANON_KEY` or the current publishable key. Server-side code may use `SUPABASE_SERVICE_ROLE_KEY` only when necessary and must never expose it to the browser.

## Client Initialization

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);
```

For server-side administrative operations:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  },
);
```

## Core Methods

| Method | Purpose | CrisisCoord example |
| --- | --- | --- |
| `createClient(url, key, options?)` | Initialize the client. | Create browser and server clients. |
| `supabase.auth.signInWithPassword()` | Email/password sign-in. | Demo reviewer/admin login. |
| `supabase.auth.getUser()` | Validate current user with the Auth server. | Backend authorization checks. |
| `supabase.auth.onAuthStateChange()` | React to sign-in/sign-out/token refresh. | Keep UI session state current. |
| `supabase.from(table).select()` | Read rows. | Load incident timeline or agent outputs. |
| `supabase.from(table).insert()` | Create rows. | Store a new incident or audit event. |
| `supabase.from(table).update().eq()` | Update rows. | Mark a human decision as approved. |
| `supabase.from(table).delete().eq()` | Delete rows. | Demo cleanup only. Prefer soft delete for audit rows. |
| `supabase.from(table).upsert()` | Insert or update on conflict. | Persist latest agent status by incident and agent. |
| `supabase.rpc(fn, args)` | Call Postgres functions. | Produce a consolidated decision packet later. |
| `supabase.storage.from(bucket).upload()` | Store files. | Upload synthetic evidence packet. |
| `supabase.storage.from(bucket).download()` | Read files from private bucket. | Review evidence packet server-side. |
| `supabase.storage.from(bucket).createSignedUrl()` | Time-limited file sharing. | Let reviewers open a generated report. |
| `supabase.channel(name).on(...).subscribe()` | Realtime subscription. | Refresh the command-room timeline as rows change. |
| `supabase.functions.invoke(name, options)` | Call Edge Function. | Optional workflow helper if needed. |

## Starting Schema

Use this as the first schema pass. Adjust once the UI and Band integration are scaffolded.

| Table | Purpose |
| --- | --- |
| `profiles` | App users and display names. |
| `roles` | Role labels such as `admin`, `legal`, `technical`, `communications`, `executive`, `viewer`. |
| `profile_roles` | User-to-role mapping. |
| `incidents` | Crisis signal, type, severity, status, scenario data, created-by user. |
| `band_rooms` | Band room ID, incident ID, room status, created agent, timestamps. |
| `agent_runs` | One row per agent execution attempt. |
| `agent_outputs` | Validated structured outputs from each agent. |
| `evidence_artifacts` | Synthetic files, hashes, storage paths, source notes. |
| `communications_drafts` | Draft regulator/customer/executive messages. |
| `human_decisions` | Escalation questions, approver, decision, status, timestamp. |
| `audit_events` | Append-only event stream linking app, Band, and model actions. |

## RLS Standards

Enable Row Level Security on every table in exposed schemas:

```sql
alter table public.incidents enable row level security;
```

Recommended policy pattern:

```sql
create policy "authenticated users can read demo incidents"
on public.incidents
for select
to authenticated
using (true);
```

For ownership-sensitive records:

```sql
create policy "users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);
```

Rules for this repo:

- Enable RLS before exposing a table to browser clients.
- Add indexes for columns used in RLS policies.
- Use `to authenticated` or another explicit role in policies.
- Do not put authorization data in user-editable metadata.
- Keep service-role usage server-side and limited to administrative operations.
- Make audit tables append-only from normal app paths.

## Realtime Pattern

Realtime is optional but useful for the dashboard:

```ts
const channel = supabase
  .channel("incident-timeline")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "audit_events" },
    (payload) => {
      console.log("timeline changed", payload);
    },
  )
  .subscribe();
```

Use Realtime for UI refresh, not as the source of truth. The database row is the source of truth.

## Storage Pattern

Recommended buckets:

- `evidence-artifacts`: private, synthetic files only.
- `generated-reports`: private until explicitly shared.

Use signed URLs for time-limited review access:

```ts
const { data, error } = await supabase.storage
  .from("generated-reports")
  .createSignedUrl("incident-001/regulator-draft.pdf", 60 * 10);
```

## Sources

- [Supabase JavaScript API introduction](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase client initialization](https://supabase.com/docs/reference/javascript/initializing)
- [Supabase Auth signInWithPassword](https://supabase.com/docs/reference/javascript/auth-signinwithpassword)
- [Supabase Auth getUser](https://supabase.com/docs/reference/javascript/auth-getuser)
- [Supabase Auth onAuthStateChange](https://supabase.com/docs/reference/javascript/auth-onauthstatechange)
- [Supabase select](https://supabase.com/docs/reference/javascript/select)
- [Supabase insert](https://supabase.com/docs/reference/javascript/insert)
- [Supabase update](https://supabase.com/docs/reference/javascript/update)
- [Supabase delete](https://supabase.com/docs/reference/javascript/delete)
- [Supabase upsert](https://supabase.com/docs/reference/javascript/upsert)
- [Supabase rpc](https://supabase.com/docs/reference/javascript/rpc)
- [Supabase Storage upload](https://supabase.com/docs/reference/javascript/storage-from-upload)
- [Supabase Storage signed URLs](https://supabase.com/docs/reference/javascript/storage-from-createsignedurl)
- [Supabase Realtime subscribe](https://supabase.com/docs/reference/javascript/subscribe)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
