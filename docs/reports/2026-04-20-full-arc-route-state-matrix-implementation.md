# 2026-04-20 Full-Arc Route-State Matrix Implementation

Completed `ECO-20260420-main-341` for packet `133`.

## Summary

- Added a compact, table-driven Route v2 route-state matrix in `src/test/field-requests.test.ts`.
- Covered all 11 live notebook routes from active state through clue progress, ready-to-file, filing, and next-state handoff.
- Kept `forest-survey-slice`, `coastal-edge-moisture`, `tundra-survey-slice`, and `forest-season-threads` as handoff-only states instead of treating them as Route v2 matrix routes.
- Added live-only variant checks for `Wrack Shelter`, `Moist Hollow`, `Held Sand`, `Moist Edge`, `Thaw Window`, `Brief Bloom`, and `Rimed Pass` while preserving canonical ready/filed route identity.

## Files

- `src/test/field-requests.test.ts`

## Boundaries Kept

- No runtime route behavior, save schema, station page, browser automation, screenshot output, science/copy rewrite, geometry, or new route framework changes.
- No duplication of lane-1 debug save snapshots or lane-3 screenshot proof.

## Verification

- `npm test -- src/test/field-requests.test.ts` passed.
- `npm run build` passed after widening the local filed-text assertion helper to accept nullable display text from optional route-state lookups.
