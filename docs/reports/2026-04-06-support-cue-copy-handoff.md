# 2026-04-06 Support Cue Copy Handoff

## Recommendation

Use the existing inspect-bubble accent line as the first support-readable cue seam.

- Do not add a new route strip, board row, or notebook surface.
- Keep the current bubble layout and reuse the single accent line already rendered under the fact text.
- Reserve the stronger cue for the active hand-lens win only:
  - when `hand-lens` is selected
  - when the inspected entry is currently the active support-preferred route clue

## Why This Seam

The live route-feel difference is already inspect-facing.

- `getHandLensNotebookFitForEntry(...)` already feeds the inspect bubble's `resourceNote`.
- `prefersHandLensActiveEntry(...)` already knows when hand lens is steering the player toward the active clue instead of the nearest generic inspectable.
- The bubble accent line is already handheld-safe at `256x160`, while the season strip and route-card seams are denser and less local to the moment of discovery.

That makes the bubble the smallest place where the player can feel, "my selected support is helping here," without growing a new HUD.

## Copy Direction

Keep the baseline generic notebook-fit language for non-preferred matches, but use a shorter active cue when the inspected entry is the support-shaped win.

Recommended first cue:

- `LENS CLUE: first bloom`
- `LENS CLUE: open pioneer`

Guardrails:

- one short label plus the existing slot text only
- one line only
- calmer than a notebook card or route strip
- no explanatory sentence like "Hand Lens is helping here"

Avoid:

- adding an icon row or helper legend
- changing the season-board `NOTEBOOK J` hint
- duplicating the support notice text inside the bubble

## Main-Agent Focus

`ECO-20260406-main-294` should stay narrow:

1. Add one tiny formatter/helper seam for the bubble note.
2. Use `prefersHandLensActiveEntry(...)` to swap the label only for active support-biased wins.
3. Leave ordinary notebook-fit bubbles on their current calmer label path.

The best proof cases are the already-landed route-differentiation shelves:

- `Thaw Window` in `tundra-short-season`
- `Held Sand` in `scrub-edge-pattern`

## Verification Target

Prefer focused proof over new UI infrastructure.

- extend controller or runtime tests so the active hand-lens winner exposes the stronger cue label
- prove non-hand-lens or non-preferred matches do not inherit the stronger label
- keep browser verification lightweight if needed, because the bubble seam is already an established surface
