# 2026-04-03 Front-Half Replay Process Handoff

Scout handoff for `ECO-20260403-scout-160`.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-4-front-half-route-v2-follow-ons.md`
- `docs/reports/2026-04-03-front-half-transition-route-v2-review.md`
- `.agents/packets/082-front-half-transition-route-v2-phase.json`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/content/biomes/beach.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Promote `beach-shore-shelter` into a temporary `Wrack Shelter` outing during the live `wrack-hold` replay window.

This should stay an in-place process-backed variant, not a new route or a filing rewrite.

Recommended request-side addition in `src/engine/field-requests.ts`:

- keep `id: 'beach-shore-shelter'`
- keep the canonical route title `Shore Shelter` for ready-to-file and filed states
- add `processFocus`:
  - `momentId: 'wrack-hold'`
  - `activeTitle: 'Wrack Shelter'`
  - one compact `activeSummary` aligned to the beach opener, for example:
    - `On Sunny Beach, fresh wrack makes dune grass, lee cover, and wrack line easier to connect today.`

## Why This Is The Best Next Move

- `field-season-board.ts` already has the right front-half replay seam. On the live opening beat, late `marine-haze` revisits already surface `Wrack Shelter` with `Fresh wrack makes the dune-to-driftwood shelter line easier to follow today.`
- `beach.ts` already carries the matching habitat-process moment. `wrack-hold` is authored for `bull-kelp-wrack`, `beach-hopper`, and `pacific-sand-crab` on the `tide-line` during late `marine-haze` revisits.
- `beach-shore-shelter` is the best route match for that process. The outing already ends on `bull-kelp-wrack`, and the replay note belongs to the live first beach chapter rather than to a later inland beat.
- The gap is now request-side cohesion, not route architecture. The board can already say `Wrack Shelter`, but the active field request still stays generic `Shore Shelter`, so the outing itself does not fully inherit the replay window.

## Keep The Filing Identity Stable

This pass should stay contextual, not structural.

Keep unchanged:

- request id `beach-shore-shelter`
- notebook-ready copy `Return to the field station and file the Shore Shelter note.`
- clue-backed filed-note identity and `note-tabs` preview text
- the compact `SHORE SHELTER LOGGED` post-file close

The active outing may read as `Wrack Shelter`, but once the player reaches notebook-ready or filed states, the stable route identity should still resolve through `Shore Shelter`.

## Why The Alternatives Are Weaker

### Do not spend this pass on `coastal-shelter-shift`

`Open To Shelter` just landed as the bigger front-half chapter hinge. Reframing it immediately around `sand-capture` would blur that new outing before the beach opener has gotten its own replay-aware depth.

### Do not add another filing or station polish here

The notebook return seam already has its beach-specific close. The remaining gap is that the live replay window stops at the board instead of carrying into the active outing request.

### Do not invent another replay system

The existing `processFocus` seam already solved this cleanly for `Moist Edge` and `Thaw Window`. The beach opener can use the same pattern without new save fields, replay history, or HUD growth.

## Best Main-Agent Slice For `main-198`

1. In `src/engine/field-requests.ts`, add `processFocus` to `beach-shore-shelter` for `wrack-hold`.
2. Keep `routeV2Note`, evidence-stage ids, ready-to-file title, and filed-note behavior unchanged so notebook return still resolves as `Shore Shelter`.
3. In `src/test/field-requests.test.ts`, add:
   - one regression that late `marine-haze` beach revisits turn the active outing into `Wrack Shelter`
   - one regression that clue-backed filed note text stays canonical for `beach-shore-shelter` even after the active replay title changes
4. In `src/test/field-season-board.test.ts`, lock the existing board-side replay seam with one explicit `Wrack Shelter` regression for the active opening beat.
5. In `src/test/runtime-smoke.test.ts`, add one seeded beach replay flow where entering `beach` during `wrack-hold` keeps the active request, enter-biome notice, route board, and season wrap aligned around `Wrack Shelter` while ready-to-file and filed states remain `Shore Shelter`.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new route id or route type
- do not change the route's stage order or canonical filing identity
- do not widen the support row, route board shell, or station page
- do not turn `wrack-hold` into a stricter timer or missable state
- keep the replay pass calm, beach-specific, and notebook-first

## Queue Guidance

- close `ECO-20260403-scout-160` with this report
- bump packet `082` to version `3`
- retarget and promote `ECO-20260403-main-198` to the specific `Wrack Shelter` replay pass
- leave `ECO-20260403-critic-171` blocked behind implementation
