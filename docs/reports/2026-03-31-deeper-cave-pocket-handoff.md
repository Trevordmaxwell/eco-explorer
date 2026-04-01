# 2026-03-31 Deeper Cave Pocket Handoff

Prepared `ECO-20260331-scout-89` against packet `042`, the lane-3 brief, the completed crown-rest review, the current `forest` cave geometry, and the existing cave browser artifacts in `output/main-120-cave-loop/`.

## Current Read

The forest cave family now has the right broad shape:

- `root-hollow` is the upper lip and sheltered entry
- `seep-pocket` is the first damp drop
- `stone-basin` is the current lowest chamber
- `filtered-return` is the brighter recovery side
- `root-hollow-return-nook` helps the upper route feel looped and forgiving

That means the next cave gain should not be another general deepening pass or a wider tunnel. The cave already feels coherent. What it still lacks is one secret-feeling place inside that family: a tucked lower chamber that feels discovered, not just lower.

## Recommendation

Treat `main-127` as one under-basin pocket pass inside the current footprint, not another cave rewrite.

The safest next shape is:

- keep the current `root-hollow-cave-trunk` as the main visible recovery spine
- keep `filtered-return` as the brighter way out
- keep `stone-basin` as the interpretive middle chamber
- add one small lower pocket tucked below and slightly left of the current basin sill, so it feels hidden behind the basin lip instead of just farther right or farther down

That gives the cave a real secret chamber while staying recoverable on the current handheld screen.

## Why This Specific Location

- The seeded `stone-basin-loop` frame already shows spare emotional space under the basin lip and left of the recovery trunk. That is the part of the cave that currently reads as “there could be one more place here.”
- The right side already has a clear job: it is the recovery spine back toward `filtered-return`. Making that side deeper would muddy the current fair-return read.
- A pocket below the basin sill can stay hidden while still keeping the recovery trunk in the same visual family. That is the best recipe for “secret and recoverable” instead of “lower and harsher.”

## Option Comparison

### Option 1. Add one tucked under-basin pocket below the current sill

What it is:

- add one compact lower chamber beneath the current `root-hollow-basin-sill`
- let the player drop from the current basin band into that pocket
- keep recovery tied to the existing `root-hollow-cave-trunk` and basin sill rather than adding a second climb spine

Pros:

- feels hidden without needing a wider cave
- preserves the current recovery language
- keeps the new depth emotionally distinct from the brighter return side

Tradeoffs:

- needs careful shelf placement so the player reads it as an optional pocket instead of a trap

Assessment:

- best option

### Option 2. Deepen the bright filtered-return side

What it is:

- place the new chamber on the right side near `filtered-return`

Pros:

- easy to connect to the current recovery trunk

Tradeoffs:

- weakens the bright-way-out read that currently makes the cave feel fair
- risks turning the recovery side into the new lowest point

Assessment:

- reject

### Option 3. Add another shaft or lateral tunnel under `log-run`

What it is:

- open a second deeper branch instead of one tucked pocket

Pros:

- immediately feels larger

Tradeoffs:

- spends the packet on network growth instead of place quality
- pushes the cave toward maze logic and a denser cue problem
- collides with the packet guardrail about staying cozy and recoverable

Assessment:

- reject

## Proposed Shape For `main-127`

### Geometry

- Stay inside the current cave slice around `x ≈ 344-416`; do not widen under `log-run`.
- Keep `root-hollow-cave-trunk` as the only tall recovery spine.
- Add one compact deeper pocket below and slightly left of the current `root-hollow-basin-sill`, as if the stone floor drops into one more tucked chamber behind the sill.
- Prefer one small new shelf or ledge above the pocket lip if needed for readability, but do not add a second trunk or a second upper-return nook.
- If a new depth feature is needed, treat it as one nested stone/root pocket rather than another open bowl.

### Route Feel

The ideal route language should become:

1. upper lip
2. damp drop
3. stone basin
4. tucked lower pocket
5. back to basin sill / cave trunk
6. brighter return side

That keeps the pocket optional and memorable without turning the whole cave into a harsher descent chain.

### Recovery And Fairness

- The lower pocket should not be leap-only.
- A missed move should still leave the player in the basin family with the recovery trunk catchable nearby.
- Reuse the current `stone-basin-return-light` seam if possible. If the new pocket needs extra support, spend at most one tiny reposition or one more cave-local cue on the same authored language, not a new marker style.

### Content Budget

- Keep content minimal and reuse current cave carriers.
- Best current anchors:
  - `seep-stone`
  - `tree-lungwort`
  - `root-curtain`
  - `banana-slug`
  - `ensatina`
- The safest content move is one tiny anchored organism or landmark in the lower pocket so it feels intentionally inhabited, not empty geometry. Do not open a new note wave or new species pack here.

## Suggested Acceptance For `main-127`

- the player can reach one distinct deeper cave pocket below the basin family
- the pocket feels hidden but not punishing
- the existing recovery trunk / brighter return route still reads
- the pass stays inside one compact chamber / one tiny support beat scale

## Test Suggestions

- extend `runtime-smoke` from the current `stone-basin` route to:
  - drop into the new lower pocket
  - confirm the player can recover back to the basin sill or cave trunk
  - preserve the existing recovery into `filtered-return`
- add or update a focused `forest-biome` assertion for the new lower chamber geometry
- re-run a seeded browser pass where the new pocket and its recovery read in the same frame

## Queue Guidance

- Close `ECO-20260331-scout-89`.
- Promote `ECO-20260331-main-127` to `READY`.
- Update `ECO-20260331-main-127` and `ECO-20260331-critic-100` to use this handoff as their immediate source report.
