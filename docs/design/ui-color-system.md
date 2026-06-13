# UI Color System

Last updated: June 13, 2026.

## Recommendation

CrisisCoord should use a light-first operational command-center palette with an optional dark mode later. The first build should not be a dark-blue dashboard or a neon cyber UI. It should feel calm, readable, regulated, and easy to operate under pressure.

Best direction:

- light canvas
- crisp white panels
- graphite text
- blue for active coordination
- amber/orange for attention and risk
- red for critical danger or failed operations
- green for completed or approved states
- purple only for human review/escalation
- gray for waiting, draft, disabled, or unknown states

Color should communicate state, not decoration. Pair every color with text, icon, or shape.

## Core Tokens

Use these as the first Figma and Tailwind token draft.

| Token | Hex | Use |
| --- | --- | --- |
| `background` | `#F7F8FA` | App canvas. |
| `surface` | `#FFFFFF` | Panels, tables, cards, drawers. |
| `surface-muted` | `#F1F5F9` | Subtle nested sections and timeline rows. |
| `surface-inset` | `#E2E8F0` | Disabled fields, inactive rails, separators. |
| `border` | `#D8DEE8` | Default panel and table border. |
| `border-strong` | `#94A3B8` | Focused/active structural borders. |
| `text` | `#111827` | Primary text. |
| `text-muted` | `#64748B` | Secondary metadata. |
| `text-subtle` | `#94A3B8` | Timestamps, IDs, disabled text. |
| `brand` | `#2563EB` | Primary action, active nav, active agent run. |
| `brand-soft` | `#EFF6FF` | Active but non-danger background. |
| `info` | `#0891B2` | Low-severity informational state. |
| `info-soft` | `#ECFEFF` | Low-severity informational background. |
| `review` | `#7C3AED` | Human review, escalation, legal approval state. |
| `review-soft` | `#F5F3FF` | Review-required background. |
| `success` | `#16A34A` | Complete, contained, approved. |
| `success-soft` | `#F0FDF4` | Complete/approved background. |
| `warning` | `#D97706` | Missing facts, approaching deadlines, degraded. |
| `warning-soft` | `#FFFBEB` | Warning background. |
| `risk` | `#EA580C` | High risk, unstable, urgent attention. |
| `risk-soft` | `#FFF7ED` | Risk background. |
| `danger` | `#DC2626` | Critical, failed, blocked compliance action. |
| `danger-soft` | `#FEF2F2` | Critical background. |
| `unknown` | `#6B7280` | Unknown, pending, not configured. |
| `unknown-soft` | `#F8FAFC` | Unknown/pending background. |

## Status Mapping

Use the same status meanings everywhere: agent rail, handoff map, timeline, table badges, draft review, decision queue, and settings.

| State | Color | Icon suggestion | Label rule |
| --- | --- | --- | --- |
| `waiting` | gray | clock | Always show "Waiting". |
| `running` | blue | activity/spinner | Always show the current action. |
| `blocked` | amber | lock | Include the blocking dependency. |
| `complete` | green | check-circle | Include output type, not just "done". |
| `failed` | red | x-circle | Include retry action or fallback state. |
| `needs_review` | purple | user-check | Name the human role needed. |
| `approved` | green | shield-check | Include approver when available. |
| `rejected` | red | shield-x | Include reason/requested change. |
| `draft` | gray | file-text | Never imply delivery happened. |
| `fallback` | orange | rotate-ccw | Say seeded/cached/fallback clearly. |

## UI State Schema

Use these exact strings in Figma variant names, mock data, API payloads, and React props.

```ts
type WorkflowStatus =
  | "waiting"
  | "running"
  | "blocked"
  | "complete"
  | "failed"
  | "needs_review"
  | "approved"
  | "rejected"
  | "draft"
  | "fallback";

type IncidentSeverity = "low" | "medium" | "high" | "critical";

type DemoMode = "live" | "assisted" | "seeded";
```

Component prop naming should follow this shape:

```ts
type StatusBadgeProps = {
  status: WorkflowStatus;
  label: string;
  detail?: string;
};

type SeverityBadgeProps = {
  severity: IncidentSeverity;
  label?: string;
};
```

## Incident Severity Mapping

Incident severity is separate from agent status.

| Severity | Token | Hex | UI treatment |
| --- | --- | --- | --- |
| `low` | `info` | `#0891B2` | Thin border, no heavy fill. |
| `medium` | `brand` | `#2563EB` | Blue badge and timeline marker. |
| `high` | `risk` | `#EA580C` | Orange border and top-bar accent. |
| `critical` | `danger` | `#DC2626` | Red border, alert icon, top-bar accent. |

Do not use full red page backgrounds. Critical should feel urgent without making the interface unreadable.

## Alert Panels

Use tinted backgrounds with strong borders, not saturated cards.

| Alert | Background | Border/icon | Text |
| --- | --- | --- | --- |
| Info | `#EFF6FF` | `#2563EB` | `#1E3A8A` |
| Success | `#F0FDF4` | `#16A34A` | `#14532D` |
| Warning | `#FFFBEB` | `#D97706` | `#78350F` |
| Risk | `#FFF7ED` | `#EA580C` | `#7C2D12` |
| Critical | `#FEF2F2` | `#DC2626` | `#7F1D1D` |
| Review | `#F5F3FF` | `#7C3AED` | `#4C1D95` |

## Figma Setup

Create Figma color styles with these names:

```text
Canvas / Background
Surface / Default
Surface / Muted
Border / Default
Border / Strong
Text / Primary
Text / Muted
Text / Subtle
State / Running
State / Blocked
State / Complete
State / Failed
State / Needs Review
State / Draft
Severity / Low
Severity / Medium
Severity / High
Severity / Critical
```

Build component variants for:

- status badge
- severity badge
- alert banner
- timeline event
- agent rail item
- dependency gate
- decision card
- draft state label
- provider badge

## Tailwind Draft

When implementation starts, map tokens into CSS variables rather than hardcoding hex values across components.

```css
:root {
  --background: #f7f8fa;
  --surface: #ffffff;
  --surface-muted: #f1f5f9;
  --border: #d8dee8;
  --border-strong: #94a3b8;
  --text: #111827;
  --text-muted: #64748b;
  --brand: #2563eb;
  --info: #0891b2;
  --review: #7c3aed;
  --success: #16a34a;
  --warning: #d97706;
  --risk: #ea580c;
  --danger: #dc2626;
  --unknown: #6b7280;
}
```

## Accessibility Rules

- Do not rely on color alone.
- Pair every colored status with a label and icon.
- Keep text contrast at WCAG AA minimum.
- Avoid tiny pale amber text on white.
- Do not use red for ordinary destructive buttons when critical incident states are on screen; use text labels and confirmation dialogs instead.
- Consolidated status should show the highest-attention child state. If one agent failed, the incident summary should not look healthy.

## Why This Scheme Fits

Public incident-management and dashboard systems generally use neutral layouts with semantic status color. FireHydrant and Rootly emphasize incident detail, timelines, milestones, roles, and exportable records. Carbon and Elastic both stress consistent status/severity systems and accessible color-plus-label indicators. CrisisCoord should inherit that discipline while making the Band dependency gate and human review states more visible than ordinary incident tools.

## Sources

- [FireHydrant Command Center](https://docs.firehydrant.com/docs/the-command-center)
- [FireHydrant Incident Timeline](https://docs.firehydrant.com/docs/incident-timeline)
- [Rootly Incident Timeline](https://docs.rootly.com/incidents/incident-timeline/incident-timeline)
- [Elastic UI health and severity pattern](https://eui.elastic.co/v113.3.0/docs/patterns/severity/)
- [Carbon status indicator pattern](https://carbondesignsystem.com/patterns/status-indicator-pattern/)
- [Color in dashboard design](https://colorfyi.com/blog/color-in-dashboard-design/)
