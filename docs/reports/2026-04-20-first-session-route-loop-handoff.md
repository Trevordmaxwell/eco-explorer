# 2026-04-20 First-Session Route Loop Handoff

Completed `ECO-20260420-scout-337` for packet `132`.

## Finding

Lane 4 does not need new first-session route behavior for this packet. The existing runtime smoke `turns the beach start into a notebook-ready Shore Shelter outing and files it at the station` already starts a fresh save, activates `beach-shore-shelter`, gathers `dune-grass -> lee-cover -> wrack-line`, opens the station, files the note, and advances to `Hidden Hollow`.

The remaining lane-4 gap is proof shape. The current test leans on raw `seededSave.routeV2Progress` for gathered slots and checks only a light station preview. For first-session onboarding, the proof should show that the in-game debug seam itself exposes the route loop a fresh player needs: active request, visible progress, notebook-ready return, station filing preview, one-press filing, and next-route handoff.

## Main Scope

Recommended file:

- `src/test/runtime-smoke.test.ts`

Recommended implementation:

- Tighten the existing `turns the beach start into a notebook-ready Shore Shelter outing and files it at the station` test.
- Prefer structural assertions over broad exact-copy assertions where lane 2 is actively tuning first-session copy.
- Keep using the existing `render_game_to_text()` state via `readState(fakeWindow)`; do not add telemetry, screenshots, a dashboard, or a new fixture.

Recommended checkpoints:

- Fresh start: `activeFieldRequest.id === "beach-shore-shelter"`, title `Shore Shelter`, progress `0/3 stages`, and serialized `activeFieldRequest.routeV2.status === "gathering"` with no evidence slots.
- First and second clues: after beach grass and driftwood inspect, serialized `activeFieldRequest.routeV2.evidenceSlots` reflects `dune-grass` and then `lee-cover`, and the progress label advances from `1/3 stages` to `2/3 stages`.
- Ready to file: after bull kelp wrack inspect, serialized `activeFieldRequest.routeV2.status === "ready-to-synthesize"`, progress is `Ready To File`, and `fieldRequestNotice.variant === "notebook-ready"`.
- Station filing preview: before pressing `Enter` to file, `fieldStation.routeBoard.notebookReady.requestId === "beach-shore-shelter"` and the preview carries the `SHORE SHELTER` label plus the clue-backed filed sentence.
- Filed handoff: after filing, `routeV2Progress` is cleared, `beach-shore-shelter` is completed, the filed notice uses `variant: "filed-route"`, and `activeFieldRequest` points to `forest-hidden-hollow`.

## Coordination Notes

- Lane 1 owns menu focus defaults and station/menu travel behavior for packet `132`.
- Lane 2 owns copy cuts and exact wording around `J`, `M`, `Enter`, `Shore Shelter`, and ready-to-file text.
- Lane 3 owns first-session physical cue proof and geometry only if screenshot/state evidence contradicts the current beach start.
- If lane 2 lands first, align any exact text expectations with its updated copy. If lane 4 lands first, avoid introducing new exact-copy obligations beyond the current route titles, ids, variants, and preview labels.

## Non-Goals

- Do not change route behavior, route definitions, station layout, menu focus, save schema, support-choice behavior, beach geometry, science content, or onboarding copy.
- Do not add a tutorial panel, new UI surface, telemetry, analytics, screenshots, or packet `133`'s all-route deterministic matrix.

## Acceptance For Main

- Adds or tightens test-only assertions for the first `Shore Shelter` route loop in `src/test/runtime-smoke.test.ts`.
- Proves first request activation, clue progress, ready-to-file state, station filing preview, filed notice, and next-route handoff through `render_game_to_text()` output.
- Leaves runtime/source behavior unchanged unless a truly missing debug field is found and justified in the implementation report.
- Runs focused `Shore Shelter` runtime smoke coverage plus `npm run validate:agents` and `git diff --check`.
