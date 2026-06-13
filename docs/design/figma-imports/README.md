# Figma Import Assets

These files provide a reproducible fallback for the responsive Figma sketches when the Figma MCP write tool is blocked by Starter plan quota.

## Current Asset

- [crisiscoord-responsive-triptychs.svg](./crisiscoord-responsive-triptychs.svg)

The SVG contains one clean board with seven workspace sections. Each section includes:

- desktop sketch
- tablet sketch
- mobile sketch

That gives the planned 21 responsive views without adding more product pages.

## Regenerate

Run:

```bash
node scripts/generate-figma-triptych-svg.mjs
```

Then paste or import the generated SVG into the Figma page named `01 Responsive Workspaces`.

## Figma Notes

The SVG import is a fallback, not the final native component-library pass. It gives designers an organized, editable visual board while Figma MCP write access is quota-blocked. When MCP write access is available again, rebuild the same structure as native Figma frames/components using [figma-repair-spec.md](../figma-repair-spec.md).
