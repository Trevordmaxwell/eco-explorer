# 2026-04-03 Visible Home-Place Evolution Handoff

Prepared `ECO-20260403-scout-218` against packet `092`.

## Recommendation

Spend `main-228` on the nursery view, not the season board.

The strongest lane-1 home-place seam is already live there:

- the save knows about unlocked nursery extras
- the teaching bed already tracks project growth and mature rewards
- the compost row already tracks utility upgrades through `compostRate`

But the visible payoff is still too text-led. In the seeded evolved nursery state at [nursery-evolved-state.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-218-browser/nursery-evolved-state.png), the place is clearly more advanced in state data, yet the screen mostly reads that progress as overlapping lines of text.

## Best Main-Agent Slice For `main-228`

Use the existing nursery cards themselves as the visible evolution layer.

Recommended implementation shape:

1. Keep the current `SEASON | NURSERY` shell and the existing three cards:
   - `PROPAGATION BENCH`
   - `COMPOST HEAP`
   - `TEACHING BED`
2. Stay in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) plus focused runtime proof.
3. Promote unlocked `nursery.extras` from the trailing `Extras:` text line into tiny visual accents inside the teaching-bed card.
4. Let the compost card carry the crowberry utility payoff visually when `compostRate > 1`, instead of spending another wrapped sentence in the bed body.
5. Keep the mature bed readable by leaving only the core bed text:
   - project title and stage
   - reward summary
   - memory summary

## Why This Seam

- It is the most literal home-place payoff. `log-pile` and `pollinator-patch` are already described as changes to the station, so they should look like place changes, not only read like labels.
- It stays compact. No new save field, station page, or shell row is needed.
- It fits the phase goal. The next gain should come from visible feedback rather than more words.
- It avoids extra plumbing. The field-station overlay does not currently carry sprites, so `main-228` should prefer tiny pixel motifs or badge-like shapes drawn directly in the existing cards.

## Preferred Visual Direction

Keep it tiny and card-local.

Good target family:

- `log-pile`: a small stacked-wood marker tucked into one lower card corner
- `pollinator-patch`: a tiny bloom or dot cluster tucked into the opposite corner
- compost utility: a small upgraded compost indicator in the compost row when `Auto 2/step` is live

This should read like “the station has changed” before the player reads any extra sentence.

## Keep Out Of Scope

- no new station page, recap strip, or nursery sub-menu
- no new reward text or longer nursery prose
- no sprite-plumbing pass for the field station
- no change to route-support logic, save shape, or world-map behavior

## Verification Target For `main-228`

- focused runtime proof on a seeded nursery state with:
  - one mature teaching-bed project
  - unlocked `log-pile`
  - unlocked `pollinator-patch`
  - `compostRate > 1`
- one browser capture at `256x160` showing the evolved nursery view cleanly
- `npm run build`

## Queue Guidance

- Close `ECO-20260403-scout-218` as done.
- Promote `ECO-20260403-main-228` to `READY`.
