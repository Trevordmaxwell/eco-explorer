# 2026-03-30 Route v2 Chapter Review

Review for `ECO-20260330-critic-89` covering `ECO-20260330-main-114`.

## Result

One blocking issue.

## Blocking Issue

### Root Hollow guidance assumes a fixed clue order, but the runtime still accepts any order

`ROOT HOLLOW` now reads like an authored seep -> climb -> return chapter, and the expedition card plus route-board copy both narrate that exact sequence. But the live `assemble-evidence` request in `src/engine/field-requests.ts` still accepts whichever matching slot the player inspects first.

That creates a truth gap:

- the player can inspect `root-curtain` or `fir-cone` before `seep-stone`
- the expedition card in `src/engine/field-season-board.ts` still says `The seep mark is logged...` as soon as *any* one clue is recorded
- the route-board handoff likewise says `Climb from the seep mark...` whenever *any* one expedition clue exists

This matters because lane 4 is trying to make outings feel like authored cozy chapters, not generic evidence counters. Once the copy lies about what the player actually found, the new chapter framing loses trust and starts reading like UI polish over a count-based task.

## Recommended Next Step

Tighten `ROOT HOLLOW` so its live progression matches its authored copy.

The cleanest fix is to require the expedition clues in order:

1. `seep-mark`
2. `root-held`
3. `high-run`

That keeps the existing expedition-card, atlas, and route-board copy truthful without reopening the broader Route v2 conversion work.

If that turns out to be too rigid in play, the fallback is to derive the expedition copy from the exact filled slot ids instead of from the raw evidence count.
