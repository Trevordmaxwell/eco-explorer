# 2026-04-03 Front-Half Comparison Candidates Handoff

## Scope

Scout handoff for `ECO-20260403-scout-163`: narrow the next lane-2 front-half comparison pass to the strongest remaining note-backed candidates.

## Current Read

The front half already has a healthy first comparison layer:

- beach to scrub: `beach-grass`, `sand-verbena`
- scrub to forest: `sword-fern`, `nootka-rose`, `salmonberry`

That means the next pass should not reopen every shared coastal carrier. The cleanest value now is one small second beach-to-scrub wave built from the remaining low-runner and tucked-cover species.

## Ready Now

### `beach-pea`

Why it is ready:

- beach now gives it `Low Runner Band`
- coastal scrub now gives it `Runner Hold`
- both notes teach the same species across a real habitat shift: open sand beginning to hold cover, then back-dune ground holding thicker cover

What it would teach:

- beach: low runners on brighter, drier sand
- scrub: the same low runner persisting where back-dune structure starts to build

### `beach-strawberry`

Why it is ready:

- beach gives it `Lee Pocket Hold`
- coastal scrub gives it `Swale Shelter`
- both notes stay about calm pocket shelter, but the surrounding cover changes from tucked driftwood sand to shrub-backed swale shelter

What it would teach:

- beach: small lee-pocket refuge in exposed sand
- scrub: broader swale shelter built by low runners plus shrubs

## Hold For Later

### `dune-lupine`

Why not yet:

- the beach side is stable through `Low Runner Band`
- the scrub side can legitimately resolve to either `Shelter Builds Here`, `Runner Hold`, or `Sturdier Cover` depending on local discoveries
- that makes it a weaker first comparison target than `beach-pea` or `beach-strawberry`, whose local note payoffs are more stable and clearer

Recommendation:

- do not widen the allowlist to `dune-lupine` in `main-201`
- if a later wave wants it, first decide whether scrub comparison entries should be tied to a more stable preferred note rule

## Recommended `main-201` Shape

Keep `main-201` compact:

1. add `beach-pea` and `beach-strawberry` to the comparison allowlist
2. add focused `journal-comparison` tests for both beach-to-scrub pairs
3. add one runtime or journal-facing regression check that both comparisons stay same-pane and note-backed
4. leave the existing front-half comparison entries unchanged

## What `main-201` Should Not Do

- do not add more than these two new front-half comparison entries
- do not loosen the note-backed comparison rule
- do not touch close-look, sketchbook, atlas, or station systems in this step
- do not reorder ecosystem-note resolution just to make a shakier comparison candidate fit

## Queue Guidance

- `ECO-20260403-scout-163` can close with this handoff.
- `ECO-20260403-main-201` can move to `READY` once this report is linked.
