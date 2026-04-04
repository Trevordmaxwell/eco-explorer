# 2026-04-03 Field-Station Support Normalization Review

Reviewed `ECO-20260403-critic-251` against packet `102`.

## Result

No blocker.

## What Holds

- `src/engine/field-station-state.ts` now uses `resolveSelectedOutingSupportId(save)` again, so the extracted helper matches the old pre-split save-safe behavior instead of reintroducing locked support ids through the station view path.
- The new runtime regression proves the exact stale-save case that mattered here: a save carrying `route-marker` before the upgrade is unlocked still renders the field station with `hand-lens`.
- The fix stays narrowly inside packet `102`; it does not reopen the broader controller split, station input handling, or notice flow.

## Follow-Through

Promote `ECO-20260403-scout-227`. The first controller split is now clean enough for lane 1 to pick the second seam.
