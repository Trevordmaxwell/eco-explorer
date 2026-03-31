# 2026-03-30 Cavern Loop Follow-Up Handoff

Prepared `ECO-20260330-scout-84` against packet `038`, the lane-3 brief, the completed canopy review, the current `forest` cave geometry, the existing cave-cue layer, and the seeded cave artifacts in `output/main-104-cave-visual/` and `output/main-105-browser/`.

## Recommendation

Treat `main-120` as one same-footprint upper-return loop pass for the existing cave family, not another deeper chamber push.

The cave already has the right vertical moods:

- `root-hollow` as the upper lip
- `seep-pocket` as the damp drop
- `stone-basin` as the deepest chamber
- `filtered-return` as the brighter recovery side

What it still lacks is one calmer feeling that those chambers belong to a small internal loop instead of one down-and-out corridor. The safest way to add that is:

- keep the current under-root footprint
- keep the existing `root-hollow-cave-trunk` as the main recovery spine
- add one small upper-return shelf or root-window nook tied to that spine
- let that nook reconnect the right-side recovery into the current upper cave ledges so the family reads as a loop, not a maze

## Proposed Shape For `main-120`

### Geometry

- Stay inside the current cave slice around `x ≈ 320-432`; do not widen under `log-run` or reopen the bridge side.
- Keep `stone-basin` as the lowest point. No third drop and no `worldHeight` expansion.
- Add one compact upper-return beat above `filtered-return` and below the current root lip, preferably as:
  - one short shelf or root-bridge just left of the cave trunk, or
  - one tiny `root-window` / `return-nook` shelf that visually tucks behind the trunk and rejoins the existing upper ledges
- Reuse current climbables if possible. If a new climbable is needed, it should be shorter and calmer than the current trunk spine, not another tall shaft.

### Route Feel

The target route language should become:

1. upper lip
2. damp drop
3. deeper basin
4. brighter recovery side
5. tiny upper return nook
6. back to the upper lip / ledge family

That keeps the cave revisitable and more spatially memorable without adding a second cave branch or a true maze.

### Wayfinding Budget

- Reuse the existing cave cue language. Do not add a new HUD or a second cue style.
- If the loop needs extra support, spend at most one more tiny `recovery-light`-style cue near the upper return nook or reposition the current cue so the climb-and-return read happens a little earlier.
- Avoid collectible sparkle, arrow language, or text labels.

### Content Budget

- Keep biology support minimal and moisture-led.
- Good current carriers:
  - `tree-lungwort`
  - `licorice-fern`
  - `root-curtain`
  - `banana-slug`
  - `ensatina`
- The safest content move is one small anchored organism on the new upper-return nook if that helps distinguish it from the lower basin. Do not open a new note or close-look wave here.

## Option Comparison

### Option 1. Same-footprint upper-return loop

What it is:

- add one compact upper-return nook off the current cave trunk / recovery side
- reconnect it to the existing upper ledges

Pros:

- turns the cave family into a loop-like place without broadening the biome
- reuses current climb and cue seams
- keeps revisits playful and forgiving

Tradeoffs:

- needs careful shelf placement so it reads as a loop and not just another ledge

Assessment:

- best option

### Option 2. Deepen the basin again

What it is:

- add more depth or another lower chamber below `stone-basin`

Pros:

- immediately feels bigger

Tradeoffs:

- spends the wrong budget after the canopy close
- pushes the cave toward harsher vertical repetition instead of better place identity

Assessment:

- reject

### Option 3. Widen under `log-run`

What it is:

- stretch the cave farther right under the surface return

Pros:

- more room

Tradeoffs:

- muddies the clean chamber family
- starts turning the space into a tunnel or maze
- collides with the packet guardrail about tiny wayfinding

Assessment:

- reject

## Suggested Test Shape

### Forest biome test

- Extend the cave-family platform expectations with one new upper-return shelf or nook anchor.
- If a depth feature moves, assert only the small reshaping needed for the upper-return pocket.
- If a cue changes, keep it on the existing tiny authored cave-cue seam.

### Runtime smoke

- Start from the current `stone-basin` route.
- Verify the player can recover through the new upper-return nook and rejoin the upper cave ledges without blind drops or a precision hop chain.
- Keep the existing `stone-basin -> filtered-return -> log-run` exit path valid if it still exists; the loop should add coherence, not remove the easier outward recovery.

### Browser proof

- Capture one seeded screenshot from the basin or upper-return nook where both the deeper chamber and the recovery route are readable in the same frame.
- If the feature works, the frame should feel like a cozy chamber family instead of a long tunnel.

## Guardrails For Main

- No broader cave rewrite.
- No new canopy work in this step.
- No second cue language or text signage.
- No danger or “lost underground” framing.
- Keep the pass small enough that `main-120` can close with focused forest/runtime checks plus one seeded browser proof.

## Queue Guidance

- Close `ECO-20260330-scout-84`.
- Promote `ECO-20260330-main-120` to `READY`.
- Retarget `main-120` and `critic-95` to this handoff report as the immediate source of truth for the cave-side follow-up.
