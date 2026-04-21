# Route Save Migration Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-421`
Packet: `.agents/packets/153-save-schema-and-migration-hardening.json`
Lane: `lane-4`

## Scout Read

Lane 1 already narrowed packet `153` to raw save normalization in `src/engine/save.ts`, and its implementation now safely normalizes `biomeVisits`, `lastBiomeId`, `routeV2Progress`, and `selectedOutingSupportId` without changing Route v2 progression semantics. Lane 4 should therefore add behavior coverage around the route-facing result of those normalized saves, not a new migration layer.

The riskiest lane-4 seam is a mixed old High Pass save where:

- `completedFieldRequestIds` carries the Root Hollow and Season Threads prerequisites plus malformed values
- `selectedOutingSupportId` is `route-marker` and the upgrade is owned
- `routeV2Progress` points at `treeline-high-pass` with ready evidence plus malformed evidence entries
- `seasonCloseReturnPending` is still `true`

That state should not snap straight into the filing surface while the calm season-close return beat is pending. Once `seasonCloseReturnPending` clears, the same normalized progress should become the ready-to-file High Pass note. If High Pass is already completed, stale High Pass progress and selected `route-marker` support must not rehydrate active outing, journal, marker, or replay state.

## Recommended Main Scope

Add a test-only regression in `src/test/field-requests.test.ts` near the existing High Pass request-state coverage:

- Build a malformed persisted save and pass it through `normalizeSaveState()`.
- Assert invalid completed ids, landmark ids, and evidence slots are filtered while valid High Pass evidence and owned `route-marker` support survive.
- With `seasonCloseReturnPending: true`, assert `resolveHighPassChapterState(save)` is `dormant`, `resolveFieldRequestState()` has no active field request, and the journal/replay/marker state follows the season outing locator rather than the ready-to-file note.
- After clearing `seasonCloseReturnPending`, assert the same save becomes `ready-to-file`: active/journal request is `treeline-high-pass`, active outing is suppressed, route marker is suppressed, and replay label is null.
- Add a filed-state stale-progress case: if `treeline-high-pass` is already in `completedFieldRequestIds`, stale High Pass progress plus selected `route-marker` must still resolve to filed chapter state with no active request, no active outing, no journal request, no route marker, and no replay label.

## Keep Out

- No save schema version bump.
- No `normalizeRouteV2Progress()` behavior change unless the new regression exposes a real bug.
- No High Pass route definition, station page, map, support-choice, copy, or geometry changes.
- No broad replay or route-history system.

## Suggested Verification

```bash
npm test -- --run src/test/save.test.ts -t "Route v2 progress|Low Fell|Root Hollow|outing support"
npm test -- --run src/test/field-requests.test.ts -t "High Pass|legacy notebook-ready Root Hollow"
npm run build
npm run validate:agents
git diff --check
```
