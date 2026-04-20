# Station Homecoming Lane 1 Handoff

Queue: `ECO-20260420-scout-342`
Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
Role: `scout-agent`
Lane: `lane-1`

## Finding

Lane 1 already has the start of a station homecoming seam, but it is still too transient for the rest of packet `134` to build on.

Current useful pieces:

- `src/engine/field-station-session.ts` derives `arrivalMode: "homecoming"` only when station open work actually changed save state: new field-credit ledger claims, nursery sync, or season-close acknowledgment.
- `src/engine/game.ts` stores `fieldStationArrivalMode`, exposes it through `render_game_to_text().fieldStation.arrivalMode`, and passes it to `drawFieldStationOverlay(...)`.
- `src/engine/field-station-homecoming-shell.ts` already uses that arrival mode for a short brace pulse, but it does not expose a persistent station-owned homecoming milestone.
- Lane 2 has completed and reviewed `src/engine/field-station-homecoming-copy.ts`, a copy-only resolver that returns the strongest filed-progress `WELCOME BACK` line from existing `completedFieldRequestIds`.
- Lane 3 and lane 4 are explicitly blocked until lane 1 lands and reviews the station-owned seam.

What is missing:

- a station-owned homecoming state object that combines the transient `arrivalMode` with the lane-2 copy helper
- a debug/test surface proving the state only appears on earned homecoming opens, not every later station visit
- a small non-sill seam key that lane 3 can consume later for its upper-frame accent without inventing another station/save/copy state

## Main-342 Target

Add the smallest station-owned homecoming state seam and consume the lane-2 copy helper conditionally.

Recommended shape:

- add `resolveFieldStationHomecomingState(...)` in `src/engine/field-station-state.ts` or a small adjacent station helper
- input should include `save` plus `arrivalMode`; output should be `null` unless `arrivalMode === "homecoming"` and `resolveFieldStationHomecomingCopy(save)` returns a line
- output should carry the lane-2 copy object, its `requestId`, and a compact visual seam flag/key such as `homecomingMilestoneRequestId`
- surface this state on `FieldStationStateView` and in `render_game_to_text().fieldStation.homecoming`
- pass the seam key into `buildFieldStationGrowthInput(...)` / station-shell debug state so lane 3 can later draw its accent from the same station-owned truth
- render at most one transient, compact `WELCOME BACK` line inside the existing station chrome; do not replace route-board, atlas, season-wrap, subtitle, or add a panel

Recommended files:

- `src/engine/field-station-state.ts`
- `src/engine/field-station-session.ts` if the open-state return needs a richer reason/key
- `src/engine/field-station-homecoming-shell.ts`
- `src/engine/overlay-render.ts`
- `src/engine/game.ts`
- `src/test/field-station.test.ts`
- `src/test/overlay-copy.test.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-20-station-homecoming-lane-1-implementation.md`

## Acceptance For Main-342

- consumes `resolveFieldStationHomecomingCopy(...)` only through a station-owned seam
- keeps homecoming copy conditional on `arrivalMode === "homecoming"` so it is not an always-on station subtitle
- exposes a `fieldStation.homecoming` debug state with label/text/request id during earned homecoming opens and `null` on calm reopens
- adds or extends pure tests for default, earned, and repeated/calm station open states
- adds focused runtime-smoke coverage proving a representative earned station return exposes the homecoming state and a second open clears it
- gives lane 3 one non-sill seam key/flag to consume later, without drawing the lane-3 visual accent yet
- does not change save schema, route definitions, route filing behavior, support notices, geometry, science copy, lane-2 copy text, new station pages, or broad station layout
- runs focused station/homecoming tests, the relevant runtime-smoke slice, `npm run build`, `npm run validate:agents`, and `git diff --check`

## Non-Goals

- no new dashboard, page, card stack, or permanent station subtitle
- no committed screenshots or new browser proof unless runtime rendering changes require it
- no lane-3 upper-frame visual accent implementation before `ECO-20260420-critic-342`
- no lane-4 route-notice lifecycle changes before `ECO-20260420-critic-342`
- no edits to lane-2 copy text unless a concrete bug appears
