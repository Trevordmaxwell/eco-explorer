# 2026-04-03 Held Sand Replay-Consequence Handoff

Scout handoff for `ECO-20260403-scout-248`.

## Scope Reviewed

- `docs/reports/2026-04-03-route-consequence-and-replay-phase.md`
- `.agents/packets/100-route-consequence-and-replay-phase.json`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-03-route-aware-world-state-handoff.md`
- `docs/reports/2026-04-02-thaw-window-process-handoff.md`

## Best Target

Promote `scrub-edge-pattern` into a temporary `Held Sand` outing during the live `sand-capture` replay window.

This should stay an in-place process-backed variant, not a new route, filing rewrite, or extra replay system.

Recommended request-side addition in `src/engine/field-requests.ts`:

- keep `id: 'scrub-edge-pattern'`
- keep the canonical route title `Scrub Pattern` for notebook-ready and filed states
- add `processFocus`:
  - `momentId: 'sand-capture'`
  - `activeTitle: 'Held Sand'`
  - one compact `activeSummary` aligned to the current transect, for example:
    - `In Coastal Scrub, read where open pioneer and holding cover start trapping sand before the thicker edge takes over.`

## Why This Is The Best Next Move

- `field-season-board.ts` already has the right replay seam. When `sand-capture` is active on `scrub-edge-pattern`, the board already relabels the beat as `Held Sand` and surfaces `Trapped sand shows where the pioneer side is giving way to steadier scrub cover.`
- The process and route now overlap tightly enough to feel consequential. `sand-capture` is authored for `back-dune` and `windbreak-swale`, and its live entries include `dune-lupine` plus `pacific-wax-myrtle`, which are already the first two `Scrub Pattern` route clues.
- The active request is the lagging seam. The replay note can already make the board and entry notice feel special, but the live outing itself still stays generic `Scrub Pattern`, so the replay window does not yet cash in as a full route difference.
- The earlier overlap concern has cooled. The Coastal Scrub identity and signature-pocket waves in lanes 2 and 3 have already landed, and the current live queue in those lanes has moved to high-country work, so this route pass can now stay inside lane 4 without colliding with ongoing coastal geometry or content-identity edits.

## Keep The Filing Identity Stable

This pass should stay contextual, not structural.

Keep unchanged:

- request id `scrub-edge-pattern`
- notebook-ready copy `Return to the field station and file the Scrub Pattern note.`
- clue-backed filed-note identity and `note-tabs` preview text
- the compact logged-close follow-on once the route is filed

The active outing may read as `Held Sand`, but once the player reaches notebook-ready or filed states, the stable route identity should still resolve through `Scrub Pattern`.

## Why The Alternatives Are Weaker

### Do not spend this pass on `coastal-shelter-shift`

`Open To Shelter` still shares the broader `coastal-comparison` beat with `Edge Moisture`, so turning it into the next replay-consequence pass would blur a grouped board seam the main agent does not need to untangle yet.

### Do not spend this pass on `treeline-stone-shelter`

`Rime Shelter` is a good replay cue, but the authored `frost-rime` moment only overlaps one core route clue directly. `Held Sand` already rides on the first two live `Scrub Pattern` legs, so it reads like a stronger route consequence instead of a looser atmosphere variant.

### Do not widen into every `scrub-edge-pattern` replay cue at once

`Haze Edge` and `Pioneer Clue` can stay board-only for now. The cleanest next gain is to align the strongest process-backed replay window first instead of solving all three coastal replay variants in one pass.

## Best Main-Agent Slice For `main-248`

1. In `src/engine/field-requests.ts`, add `processFocus` to `scrub-edge-pattern` for `sand-capture`.
2. Keep `routeV2Note`, evidence-stage ids, route order, notebook-ready title, and filed-note behavior unchanged so notebook return still resolves as `Scrub Pattern`.
3. In `src/test/field-requests.test.ts`, add:
   - one regression that late Coastal Scrub revisits turn the active outing into `Held Sand`
   - one regression that clue-backed filed note text stays canonical for `scrub-edge-pattern` even after the active replay title changes
4. In `src/test/field-season-board.test.ts`, lock the existing board-side replay seam with one explicit `Held Sand` regression for the active `scrub-edge-pattern` beat.
5. In `src/test/runtime-smoke.test.ts`, add one seeded coastal replay flow where entering `coastal-scrub` during `sand-capture` keeps the active request, enter-biome notice, route board, and season wrap aligned around `Held Sand` while notebook-ready and filed states remain `Scrub Pattern`.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new route id or route type
- do not change the route's evidence-slot ids or canonical filing identity
- do not widen the support row, route board shell, or station page
- do not try to solve `Haze Edge` and `Pioneer Clue` in the same pass
- do not turn `sand-capture` into a stricter timer or missable state
- keep the replay pass calm, coastal, and notebook-first

## Queue Guidance

- close `ECO-20260403-scout-248` with this report
- bump packet `100` to version `2`
- add a `main_248_focus` block for the `Held Sand` process handoff
- retarget and promote `ECO-20260403-main-248` to the specific `Held Sand` replay-consequence pass
- retarget `ECO-20260403-critic-248` to the same report while leaving it blocked behind implementation
