# Platform And Responsive Support Standard

Last updated: June 13, 2026.

CrisisCoord must be easy for contributors to run on macOS, Linux, and Windows. The product UI must also work cleanly across mobile, tablet, laptop, desktop, and wide desktop screens.

This is a project rule, not a later polish task.

## Supported Contributor Platforms

The repo should support local development on:

- macOS
- Linux
- Windows 10/11

The implementation should prefer cross-platform tooling:

- Node.js LTS, pinned once the app is scaffolded.
- pnpm through Corepack, so every contributor uses the same package manager path.
- npm package scripts for common commands: `pnpm dev`, `pnpm test`, `pnpm lint`, `pnpm build`, `pnpm db:migrate`, and `pnpm db:seed`.
- JavaScript or TypeScript helper scripts for tasks that need path handling or file operations.
- POSIX shell scripts only when they have a PowerShell equivalent or are clearly optional.

## Cross-Platform Coding Rules

Do:

- Use `node:path` for filesystem paths.
- Keep paths relative to the repo root when possible.
- Put repeated commands behind package scripts.
- Use `.env.local` for local secrets and `.env.example` for variable names.
- Use `cross-env` or a small Node script if an npm script needs environment variables across Windows/macOS/Linux.
- Keep database migrations reproducible through Supabase CLI or a package-script wrapper.
- Document any OS-specific prerequisite before relying on it.

Do not:

- Hard-code absolute local paths.
- Assume `/` path separators in app or build scripts.
- Require bash-only command chains for normal development.
- Put `VAR=value command` style environment assignments in package scripts unless they are wrapped for Windows.
- Depend on macOS-only tools, Linux-only package managers, or Windows-only shell behavior.
- Store secrets in OS keychains as the only supported local setup path.

## Git Hook Setup

Local hook setup must work for macOS/Linux and Windows contributors.

macOS/Linux:

```bash
./scripts/setup-git-hooks.sh
```

Windows PowerShell:

```powershell
.\scripts\setup-git-hooks.ps1
```

Both scripts configure `.githooks/pre-push`, which blocks accidental direct pushes to `main` or `master`.

## Responsive Product Targets

The UI should be designed and tested against these core targets:

| Target | Size |
| --- | --- |
| Mobile | `390 x 844` |
| Tablet | `834 x 1112` |
| Laptop | `1280 x 832` |
| Desktop | `1440 x 960` |

Additional useful checks:

- Small mobile: `360 x 740`
- Standard tablet: `768 x 1024`
- Wide desktop: `1536 x 960` or wider

Recommended Tailwind breakpoint map:

- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`

## Responsive Layout Rules

Desktop command room:

- Top incident bar remains visible.
- Agent rail sits on the left.
- Band timeline and tabs sit in the main workspace.
- Decision desk sits on the right.

Tablet command room:

- Keep the incident bar first.
- Collapse the agent rail into a compact horizontal rail, drawer, or accordion.
- Move the decision desk below the main workspace or into a persistent review panel.
- Avoid cramped three-column layouts.

Mobile command room:

- Incident summary comes first.
- Current human decision comes second.
- Agent status becomes an accordion or segmented list.
- Timeline, findings, drafts, and audit move behind tabs.
- No dense table should appear above the fold.

## Component Acceptance Criteria

Before merging UI work:

- Text must not overflow cards, buttons, tabs, tables, or side panels.
- The page must not create accidental horizontal scrolling.
- Data tables may scroll inside their own container, but the whole page should stay stable.
- Touch targets should be at least `44px` high or wide for important controls.
- Empty, loading, error, blocked, review, and success states must fit on mobile.
- Keyboard focus must be visible.
- Status color must be paired with text or an icon.
- Fixed-height regions must not trap content on mobile.
- Modals and drawers must be usable on phone screens.

## Verification Rule

Once the app exists, every major UI PR should include a quick responsive check:

- desktop screenshot or Playwright run
- tablet screenshot or Playwright run
- mobile screenshot or Playwright run

Every major setup or script PR should be tested on at least the contributor's OS and reviewed for Windows/macOS/Linux portability.
