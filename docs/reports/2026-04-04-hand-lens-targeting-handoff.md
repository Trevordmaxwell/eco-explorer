# 2026-04-04 Hand-Lens Targeting Handoff

Scout handoff for `ECO-20260404-scout-269`.

## Scope Reviewed

- `docs/reports/2026-04-04-helper-differentiation-and-second-route-opportunity-phase.md`
- `.agents/packets/111-helper-differentiation-and-second-route-opportunity-phase.json`
- `src/engine/game.ts`
- `src/engine/field-requests.ts`
- `src/engine/biome-scene-render.ts`
- `src/content/biomes/beach.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend `main-269` on `hand-lens`, not `place-tab` or `note-tabs`.

The strongest remaining non-route-marker helper difference is not another strip variant. It is targeted in-field inspection:

- when `hand-lens` is selected
- when a live Route v2 clue is inside inspect range
- make the inspect marker and `E` inspect action prefer that notebook-fit clue over a nearby non-route decoy

That turns `hand-lens` into a real outing aid instead of only a fact-bubble suffix.

## Why This Is The Best Next Move

- It stays fully inside lane 4's owned seams: live outing targeting, Route v2 clue fit, and inspect behavior.
- It follows the packet guardrail to prefer clue visibility and targeting over more text.
- It makes helper choice felt during play, not only while reading the station strip.
- `route-marker` already owns map-planning feel, so `hand-lens` is the cleanest remaining helper to strengthen without adding a new support or new chrome.

## Best Live Proof

Use the last `beach-shore-shelter` leg as the proof seam.

Why this route:

- the `wrack-line` stage already has one canonical clue: `bull-kelp-wrack`
- the tide-line also carries truthful nearby decoys such as `pacific-sand-crab` and shells
- `beach.ts` already places a stable wrack at `x 486` and a stable crab at `x 516`, so one narrow tide-line position can truthfully hold both in inspect range

That makes it a strong targeting proof:

- without the new pass, `E` can drift toward the closer decoy
- with the new pass, `hand-lens` should steer the marker and inspect action to `bull-kelp-wrack`

This is a better first proof than a more abstract station-side wording change because the player can feel it immediately while moving through the route.

## Why The Alternatives Are Weaker

### Do not spend this pass on `place-tab`

`place-tab` already has a clean distinct job on the season strip. Another step there would mostly be copy polish, not a stronger in-field feel.

### Do not spend this pass on `note-tabs`

`note-tabs` already owns notebook preview, filed-note, and chapter-close variants. It is the most station-facing helper, so spending more on it would miss the packet's in-field differentiation goal.

### Do not add a new helper cue or HUD chip

The field already has the needed seam:

- an inspect marker
- an inspect key path
- an existing notebook-fit resolver

The missing piece is target choice, not another overlay.

## Concrete Follow-On

### `game.ts`

Add one small helper-sized target resolver for inspectables in range.

Recommended shape:

1. Gather the current in-range inspectables instead of only the nearest one.
2. If `hand-lens` is not selected, keep the current nearest-entity behavior.
3. If `hand-lens` is selected, prefer the nearest in-range inspectable whose entry resolves through `getHandLensNotebookFit(getFieldRequestContext(), entryId, entityZoneId)`.
4. Fall back to the current nearest inspectable if no notebook-fit clue is present.
5. Reuse that same resolver for:
   - the field marker target
   - the `E` inspect action

That keeps the marker and the actual inspect result aligned.

### Behavior Guardrail

Keep the pass narrow:

- only affect `hand-lens`
- only affect in-range inspect targeting
- do not make click-to-inspect override explicit clicked entities
- do not widen inspect range
- do not change route fit rules or accepted evidence ids

## Why This Should Feel Different In Play

After this pass:

- `route-marker` still owns where the outing points on the map
- `place-tab` still owns place-reading questions
- `note-tabs` still owns notebook framing
- `hand-lens` now helps the player grab the right live clue when the field is busy

That is a cleaner support split than stacking more strip copy onto the existing helpers.

## Tests

Add focused runtime coverage:

- seed `beach-shore-shelter` at the final `wrack-line` stage with `hand-lens` selected
- move the player to a tide-line position where `bull-kelp-wrack` and `pacific-sand-crab` are both in inspect range
- confirm `E` opens `bull-kelp-wrack`, not the nearer non-route decoy
- confirm the route completes into notebook-ready from that targeted inspect
- confirm a non-`hand-lens` support in the same setup keeps the current nearest-entity behavior

If implementation extracts a tiny pure helper, add a narrow helper test. Otherwise the runtime-smoke proof is enough.

## Best Main-Agent Slice For `main-269`

1. In `src/engine/game.ts`, add one preferred inspect-target resolver for `hand-lens`.
2. Reuse it for both the field marker and keyboard inspect path.
3. Add focused runtime coverage proving the beach tide-line helper difference without adding new UI.

## Expected File Touches

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new support id, helper row, or planner layer
- do not widen the pass into station copy changes
- do not change click-hit behavior for explicit entity selection
- do not alter route evidence truth or accepted clue ids
- keep the pass reversible and helper-sized

## Queue Guidance

- close `ECO-20260404-scout-269` with this report
- bump packet `111` to version `2`
- add a `main_269_focus` block centered on `hand-lens` inspect targeting
- retarget `ECO-20260404-main-269` and `ECO-20260404-critic-269` to this report
- promote `ECO-20260404-main-269` to `READY`
