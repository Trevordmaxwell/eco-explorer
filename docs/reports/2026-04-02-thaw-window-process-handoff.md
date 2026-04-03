# 2026-04-02 Thaw-Window Process Handoff

Scout handoff for `ECO-20260402-scout-130`.

## Scope

Prepare one lane-4 implementation slice so `main-168` turns an existing Route v2 beat into a fuller process-witness outing through the live living-world seam, not through a new route type, support row change, or filing shell.

## Best Target

Promote `tundra-short-season` into a full `Thaw Window` outing during the live `thaw-fringe` window.

This is the strongest next gain because:

- `tundra-short-season` is already the route most clearly about a living process: the brief thaw window between the last sheltered treeline and the inland survey pass.
- `field-season-board.ts` already has the right replay seam for it. When `thaw-fringe` is active, the board already relabels the beat as `Thaw Window` and surfaces the line `Peak thaw makes the short bright season feel easiest to read today.`
- The route's in-biome request copy is the lagging seam. The board can already hint that the outing is special, but the active field request still stays generic `Short Season`, so the outing itself does not fully cash in on that process moment yet.
- The route was just strengthened through ordered thaw-window slots and `place-tab`. That makes it the cleanest place to spend one more process-backed pass without re-opening slot or support churn.

## Best Small Pass

### Reuse the existing `Thaw Window` process cue

Add `processFocus` to `tundra-short-season` in `src/engine/field-requests.ts`:

- `momentId: 'thaw-fringe'`
- `activeTitle: 'Thaw Window'`
- one compact `activeSummary` that makes the player read the thaw window through the live clue family instead of inventing a second route structure

Recommended reading:

- `In Tundra Reach, read where first bloom and wet tuft make the thaw window easiest to follow before brief fruit finishes it.`

That keeps the route on the current ordered `first-bloom -> wet-tuft -> brief-fruit` seam while making the active outing feel more like a living process and less like a neutral checklist.

### Keep filing and save behavior unchanged

Do not rename the underlying route for notebook-ready or filed states.

Keep:

- the canonical request id `tundra-short-season`
- the filed route title `Short Season`
- the current slot order
- the current note-preview and filed-note seams

The process pass should be contextual, not structural. Once the player has gathered the route and is back in notebook-ready state, the route should still resolve through the stable `Short Season` filing surfaces just like `forest-cool-edge` reverts to its canonical filing state after the active `Moist Edge` window.

### Lock the board and request into one shared story

`field-season-board.ts` already carries the right active replay note for this beat, so `main-168` should prefer aligning the request-side wording to that existing seam instead of inventing another process label family.

If a tiny wording adjustment is needed, keep it shared and compact:

- active route beat title
- active route summary
- in-biome active field request title and summary
- route replay notice on biome enter

Those should all read like one calm outing, not four slightly different versions of the same idea.

## Why The Alternatives Are Weaker

### `scrub-edge-pattern`

The coastal `Held Sand` replay note is a useful replay warmth cue, but the route's required transect still leans on a broader dune-to-edge transition than the process moment itself. Promoting it first would make the outing feel less coherent than the now-strong tundra middle beat.

### `treeline-stone-shelter`

`Rime Shelter` is good replay flavor, but that route still reads primarily as a shelter-structure outing. `tundra-short-season` is the cleaner match for a process-first follow-on because the outing is already about where thaw briefly holds.

### Filing follow-on first

The packet's later filing step will land better if the outing itself already feels distinct. Right now the bigger gap is not notebook return depth. It is that the live tundra process cue stops at the board instead of carrying into the outing request.

## Best Main-Agent Slice For `main-168`

1. In `src/engine/field-requests.ts`, add `processFocus` to `tundra-short-season` so the active request becomes `Thaw Window` while `thaw-fringe` is active.
2. Keep `routeV2Note`, slot ids, slot order, and filed-note behavior unchanged so ready-to-file and filed states still read as `Short Season`.
3. In `src/test/field-requests.test.ts`, add a focused regression that the active tundra outing becomes process-backed during `thaw-fringe`, plus a second regression that ready-to-file and filed note text stay canonical and clue-backed.
4. In `src/test/field-season-board.test.ts`, add an explicit `Thaw Window` replay-note regression for the active tundra beat so the board-side seam is now locked down alongside the request-side change.
5. In `src/test/runtime-smoke.test.ts`, add one targeted inland flow where `tundra-short-season` is active during `thaw-fringe` and assert that the board, active outing, and enter-biome notice all stay aligned around `Thaw Window`.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new route type
- do not change the route's saved slot ids or filed-note identity
- do not widen the support row or notebook-return UI in this step
- do not turn the process moment into a timer, failure state, or harsher gate
- keep the route calm, observational, and high-country in tone

## Queue Guidance

- close `ECO-20260402-scout-130` with this report
- bump packet `063` to version `2`
- rename and promote `ECO-20260402-main-168` to the specific `Thaw Window` process pass
- leave `ECO-20260402-critic-141` blocked behind implementation
