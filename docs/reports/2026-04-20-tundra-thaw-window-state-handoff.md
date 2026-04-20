# Tundra Thaw Window State Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-370`
Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
Lane: `lane-1`

## Recommendation

Add one debug-only save snapshot for the active `Thaw Window` process state, suggested id `tundra-thaw-window`.

This is the smallest lane-1 systems contribution to packet `141`. Existing route-board and runtime smoke coverage already proves the normal inactive handoff from `Stone Shelter` into Tundra and the live process-backed `Thaw Window` replay behavior. The missing reviewer aid is a named loadable state that starts in Tundra during the peak thaw window so station, map, journal, and route-board surfaces can be checked without replaying the inland chain.

## Proposed Main Scope

Add `tundra-thaw-window` in `src/engine/debug-save-snapshots.ts` and document it in `docs/save-snapshot-states.md`.

The snapshot should represent:

- completed forest starter chain: `forest-hidden-hollow`, `forest-moisture-holders`, and `forest-survey-slice`
- completed front-half coastal chain: `coastal-shelter-shift` and `coastal-edge-moisture`
- completed Treeline handoff: `treeline-stone-shelter`
- owned `trail-stride`
- active, incomplete `tundra-short-season`
- `lastBiomeId` set to `tundra`
- `worldStep` set to `4` so phenology is `peak`
- `biomeVisits.tundra` set to at least `2` so the `thaw-fringe` process moment is active
- default outing support still `hand-lens`
- no `route-marker`, `tundra-survey-slice`, `treeline-low-fell`, `forest-season-threads`, `High Pass`, filed-season archive, save-schema, station-shell, or route-controller change

## Expected Assertions

Extend `src/test/save-snapshots.test.ts` so the named state proves:

- snapshot round-trips through `normalizeSaveState()`
- guided field-season state is `settled`, next biome is `tundra`, and station note is `THAW WINDOW`
- active field request is `tundra-short-season` in `tundra`, with the process-backed title `Thaw Window`
- route board stays on `TREELINE SHELTER LINE`, targets `tundra`, keeps `tundra-short-season` active, and has `launchCard: null`
- route board summary and `replayNote.text` both use `Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.`
- world map current/focused location is `tundra`, `routeMarkerLocationId` is `null`, and the footer stays `Today: Thaw Window`
- station stays on `routes`, selected support stays `hand-lens` / `HAND LENS`, and `seasonWrap` uses `TODAY` with the peak-thaw text
- journal field request matches `tundra-short-season`

## Guardrails

Do not change `src/engine/field-requests.ts`, Route v2 slot order, process focus copy, support targeting, lane-2 Tundra copy, station layout, world-map focus priority, save schema, Tundra geometry, High Pass copy, or route-controller behavior. This should be debug/test/documentation only.

## Verification Target

- `npm test -- --run src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "route board to tundra|thaw-window route replay"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

Current dirty-tree note: the broad `High Pass` smoke filter is already known to catch an unrelated rime-footing exact-copy mismatch outside this lane-1 snapshot scope, so prefer the narrower Tundra/Thaw Window slice for this handoff.
