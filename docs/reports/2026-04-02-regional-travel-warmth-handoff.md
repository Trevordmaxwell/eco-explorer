# 2026-04-02 Regional Travel Warmth Handoff

## Scope

Complete `ECO-20260402-scout-100` and narrow `ECO-20260402-main-138` to one compact lane-1 travel-warmth pass.

## Summary

The live season-two travel layer is already structurally solid.

The strongest cues are already in place:

- the focused `Treeline Pass` map footer reads `Today: High Pass`
- split-origin map states still read cleanly through `FROM FOREST TRAIL`
- the walking-only top label `HIGH PASS` is a good ceiling for approach warmth

The remaining weak seam is smaller and more specific. When season two is open and the player is still standing on the forest side, the departure copy is still using older generic inland language:

- the forest map-return post still reads `INLAND MAP`
- the forest-focused idle map footer still falls back to `Middle woods between scrub and treeline.`

That makes the second-season opening feel strongest once the player has already focused `Treeline Pass`, but more generic at the exact moment they leave `Forest Trail`.

## Live Evidence

Seeded season-two browser proof on the current build:

- `output/lane-1-scout-100-browser/post-cue.png`
- `output/lane-1-scout-100-browser/high-pass-map.png`
- `output/lane-1-scout-100-browser/high-pass-walk.png`
- `output/lane-1-scout-100-browser/console-errors.json`

Observed live:

- the forest post cue is readable and calm, but `INLAND MAP` still sounds like a utility stop instead of a chapter-facing departure seam
- the focused `Treeline Pass` map state is already the correct ceiling and should stay structurally unchanged
- the walking-state `HIGH PASS` label also already reads well and should stay the ceiling for the moving map layer

## Findings

### 1. The High Pass destination seam is already good enough

The best current state is the focused `Treeline Pass` map:

- `Today: High Pass`
- `FROM FOREST TRAIL`

That pairing already explains both destination and origin without adding another travel HUD. `main-138` should preserve that exact structure.

### 2. The forest-side departure seam is still using pre-season-two language

In the live season-two state, the forest post still shows `INLAND MAP`, and the forest-focused idle map footer still uses the evergreen location summary `Middle woods between scrub and treeline.`

Those are not wrong, but they are the last travel-facing bits that do not acknowledge the active `High Pass` chapter. They are also the smallest possible seams to warm without widening the shell.

### 3. The cleanest implementation is a tiny runtime override, not a permanent data rewrite

Do not rewrite the static labels in `src/content/world-map.ts` globally.

Earlier-season forest travel still needs the generic inland wording. The better move is one tiny season-aware helper derived from the current active-outing state, then reuse it only when:

- the current season-two outing is `High Pass`
- the player is leaving from the forest side

That keeps the base map data evergreen while letting the live second-season moment feel more authored.

## Recommended `main-138` Pass

Keep `main-138` to one linked forest-side warmth family:

1. Add one tiny season-aware travel-warmth helper derived from the current active outing.
2. Use it to override the forest map-return post label once `High Pass` is live.
3. Use that same helper to warm the forest-focused idle world-map footer summary in the same state.
4. Leave the focused `Treeline Pass` footer, `FROM FOREST TRAIL`, and the walking `HIGH PASS` top label unchanged.

## Concrete Target Seams

Touch only:

- the forest-side map-return post cue label
- the forest-focused idle world-map footer summary when season two is live

Suggested wording targets:

- forest post label: `HIGH PASS MAP`
- forest idle footer summary: one short line equivalent to `Last woods before High Pass.`

The exact idle-footer sentence can vary, but it should stay:

- one short line
- travel-facing, not ecological exposition
- clearly weaker than `Today: High Pass`

## Keep Out Of Scope

Do not:

- touch the coast-facing labels
- widen the `HIGH PASS` walking label into a bigger banner
- add a second footer row
- add another planner or season card
- rewrite all map labels to be season-two-specific forever

## Likely File Targets

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/world-map.test.ts`

## Suggested Verification For `main-138`

- add runtime coverage showing the forest post label shifts from generic inland wording to `High Pass`-aware wording once the next-season state is live
- add runtime coverage showing the forest-focused idle map footer summary becomes season-two-aware while the focused `Treeline Pass` state still keeps:
  - `Today: High Pass`
  - `FROM FOREST TRAIL`
- keep coverage that the walking-only top label remains `HIGH PASS`
- run `npx vitest run src/test/world-map.test.ts`
- run the targeted season-two slice in `src/test/runtime-smoke.test.ts`
- run `npm run build`
- run the required web-game client
- capture seeded browser proof for:
  - the forest post cue
  - the forest-focused idle map state
  - the focused `Treeline Pass` / `High Pass` state

## Queue Guidance

- close `ECO-20260402-scout-100`
- promote `ECO-20260402-main-138` to `READY`
- keep `ECO-20260402-critic-111` blocked until the warmth pass lands
