# 2026-04-20 Route Loop Instrumentation Handoff

Completed `ECO-20260420-scout-333` for packet `131`.

## Finding

Lane 4 does not need a new telemetry surface for this packet. The existing `render_game_to_text()` seam already exposes the route-loop state that reviewers need for deterministic internal proof: active request, field-request hint, nearest inspectable, field request notice, field-station support choice, route board state, world-map route marker, world-map replay label, and journal request state.

The remaining lane-4 gap is assertion shape, not runtime data. The main pass should turn the existing High Pass route-loop smoke into a tighter instrumentation contract that proves a reviewer can observe the key route states from debug output.

## Main Scope

Recommended file:

- `src/test/runtime-smoke.test.ts`

Recommended implementation:

- Reuse the existing `treeline-high-pass` runtime helpers near `createHighPassFellHoldSave()` and `findHighPassFellHoldStartX()`.
- Add a focused test or focused helper assertions around the current `files High Pass from the live talus-hold loop and settles the completed field arc` path.
- Keep the test centered on `render_game_to_text()` state, not raw DOM, screenshot output, browser telemetry, or new localStorage fixtures.

The main assertions should cover these debug checkpoints:

- Active High Pass: `activeFieldRequest.id === "treeline-high-pass"`, title `High Pass`, visible `nearestInspectableEntityId`, and a `support-biased` `fieldRequestHint` when `selectedOutingSupportId` is `hand-lens`.
- Support contrast: a non-`hand-lens` support on the same pocket should not target the same notebook-fit `talus-cushion-pocket` clue and should leave the hint variant as `default`.
- Ready to file: after inspecting the talus-hold carrier, `routeV2Progress.status` is `ready-to-synthesize`, `activeFieldRequest.progressLabel` is `Ready To File`, and `fieldRequestNotice.variant` is `notebook-ready`.
- Filing: station-side filing clears `routeV2Progress`, adds `treeline-high-pass` to `completedFieldRequestIds`, and emits the route-authored `HIGH PASS` filed notice with `variant: "filed-route"`.
- Post-filed cleared state: after leaving the station, `activeFieldRequest` is `null`, `worldMap.routeMarkerLocationId` is `null`, `worldMap.routeReplayLabel` is `null`, and `journal.fieldRequest` is `null`.

## Non-Goals

- Do not add runtime telemetry, analytics, UI, screenshots, save schema, or a player-facing dashboard.
- Do not change Route v2 behavior, support selection behavior, station layout, route copy, biome geometry, or science content.
- Do not build the full route-state matrix here; packet `133` owns all-route matrix coverage.
- Do not duplicate lane-1 save snapshot helpers or lane-3 visual-anchor capture policy.

## Acceptance For Main

- Adds or tightens test-only route-loop instrumentation assertions in `src/test/runtime-smoke.test.ts`.
- Covers active request, support behavior, ready-to-file, filed notice, and post-filed replay-cleared states using `render_game_to_text()` output.
- Leaves runtime source files unchanged unless a truly missing debug field is discovered and explicitly justified in the implementation report.
- Runs the focused runtime smoke slice for the edited High Pass tests, plus `npm run validate:agents` and `git diff --check`.
