# 2026-04-03 Field-Station Support Normalization Implementation

Implemented `ECO-20260403-main-251` against packet `102`.

## What Changed

- Restored `resolveSelectedOutingSupportId(save)` inside `src/engine/field-station-state.ts` so the extracted helper keeps the same save-safe outing-support fallback that `game.ts` used before the split.
- Added one focused runtime regression in `src/test/runtime-smoke.test.ts` that opens the field station from a save still carrying a locked `route-marker` support id and confirms the rendered station state falls back to `hand-lens`.

## Why This Shape

This keeps the fix inside the new helper seam and re-locks the old behavior without reopening the broader controller split. Older or partially unlocked saves now normalize the same way in both the overlay state and `render_game_to_text()`.

## Verification

- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|falls back to hand-lens when a save still carries a locked route-marker support id"`
- `npm run build`
