# Nursery Visual Growth Proof Handoff

Created: 2026-04-20

Queue: `ECO-20260420-scout-348`
Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
Role: `scout-agent`
Lane: `lane-3`

## Finding

Lane 3 should not reopen nursery layout, copy, route-support behavior, or save state for packet `135`.

The live nursery page already has the right small visual seam in `src/engine/field-station-nursery-page.ts`: `drawNurseryHomePlaceStrip(...)` draws a bottom strip on active and mature teaching-bed states, with four stage pips plus tiny log-pile and pollinator-patch motifs from existing nursery extras. That is the right "read before copy" surface.

The missing piece is proof and maintainability. The strip state is currently implicit inside drawing code, so future agents can accidentally weaken the visual growth read while changing copy or layout tests.

## Main Target

For `ECO-20260420-main-348`, add the smallest pure state seam for the nursery home-place strip and focused tests around it.

Recommended shape:

- Export a tiny pure helper from `src/engine/field-station-nursery-page.ts`, for example `resolveNurseryHomePlaceStripState(nursery)`.
- The helper should return whether the strip is shown, the stage progress `0-4`, and whether existing `log-pile` / `pollinator-patch` motifs are active.
- Keep `drawFieldStationNurseryPage(...)` visually equivalent by using that helper to drive the existing `drawNurseryHomePlaceStrip(...)` call.
- Do not add another row, panel, title, text line, new nursery card, new route hint, or new save field.

## Recommended Files

- `src/engine/field-station-nursery-page.ts`
- `src/test/field-station-nursery-page.test.ts`
- `docs/reports/2026-04-20-nursery-visual-growth-proof-implementation.md`

## Acceptance For Main

- Adds or exposes a tiny tested nursery home-place strip state seam using existing `NurseryStateView` data.
- Proves locked/ready teaching-bed states do not show the strip.
- Proves active `stocked`, `rooting`, `growing`, and `mature` bed states map to visual progress `1`, `2`, `3`, and `4`.
- Proves existing nursery extras can light the log-pile and pollinator-patch motifs without changing reward or route-support behavior.
- Keeps mature-bed memory priority and existing nursery page dimensions intact.
- No nursery copy, route-support resolver, station page, save schema, route definition, route filing behavior, geometry, or science content changes.
- If the drawing itself changes, add ignored browser proof under `output/lane-3-main-348-browser/` at `256x160`; if the pass is helper/test-only and visually equivalent, no browser proof is required.

## Verification For Scout

- `npm run validate:agents`
- Packet `135` JSON parse
- `git diff --check`
