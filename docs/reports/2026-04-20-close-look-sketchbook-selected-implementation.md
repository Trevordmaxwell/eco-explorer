# 2026-04-20 Close-Look Sketchbook Selected Implementation

Completed `ECO-20260420-main-391` in lane 2.

## What Changed

- Added compact close-look payload support for exactly two selected route/place-memory carriers:
  - `root-curtain`
  - `shore-pine`
- Kept both cards visual-first with two callouts and one short sentence tied to their existing sketchbook memory role.
- Extended focused close-look coverage so both new carriers are supported, shape their payloads correctly, and `fallen-giant-log` remains outside this pass.

## Scope Kept Out

- No new entries, sketchbook slots, comparison rules, route behavior, field-request logic, station surfaces, world-map cues, or biome geometry.
- `src/engine/close-look.ts` stayed a data-only allowlist/seed edit, matching the scout handoff's shared-file note.

## Verification

- `npm test -- --run src/test/close-look.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

Browser proof was not added for this small data-only pass; the next visual lane can use the selected carrier list if it needs screenshot proof.
