# 2026-03-30 Nursery Capstone Support Handoff

## Scope

Scout handoff for `ECO-20260330-scout-64`: prepare the smallest nursery-backed support pass that helps the capstone and `ROOT HOLLOW` loop without turning the nursery into a bigger progression lane.

## Current Live Gap

The nursery already works well as a secondary route-support loop during active routes:

- `resolveNurseryStateView()` can surface one optional `routeSupportHint`
- `edge-pattern-line` already resolves that hint by active beat instead of freezing on the first claimed plant
- the nursery tab stays compact and readable at station scale

But once the route board is fully logged and the season moves into `ROOT HOLLOW` plus `Season Threads`, that support mostly drops out of the visible loop:

- the nursery clue model is still centered on active route beats
- `ROOT HOLLOW` uses its own one-card expedition note, with no tiny nursery-aware carry-through
- once the season is archived, the nursery still exists, but it no longer feels connected to the just-finished chapter unless the player manually infers that connection

So the nursery is now structurally present but no longer clearly helping the chapter close.

## Best Small Pass

### 1. Keep the nursery support in existing surfaces

Do not add:

- a new expedition reward type
- a new station panel or reward row
- another season card
- a second nursery-specific progression track

The clean move is to reuse the existing nursery hint seam and, if needed, the expedition card's existing `note` field.

### 2. Use one post-route forest clue, not a whole new clue set

Best support carrier:

- claimed `nursery:salmonberry-support`

Why this is the right fit:

- it already points at the cooler, wetter forest edge
- that idea bridges `forest-cool-edge`, `ROOT HOLLOW`, `log-run`, and `Season Threads`
- it still belongs to the current season, unlike `mountain-avens`, which starts to feel like next-season staging

Recommended clue direction:

- keep the existing wet-edge language family
- tune it slightly toward the forest return and the season-thread recap

Example tone:

- `Wet edge clue: the salmonberry bed still points back to the cooler forest return.`

### 3. Let the nursery keep one tiny chapter clue alive during expedition and season close

Recommended behavior:

- if `ROOT HOLLOW` is `READY`, `ACTIVE`, or `LOGGED`, and `nursery:salmonberry-support` is claimed, let the nursery view surface one support clue even though the active route is already complete
- if `forest-season-threads` is the active capstone request or the season archive is live, keep that same clue window alive as a recap-style nursery hint rather than switching to a new next-season teaser

This keeps the nursery:

- optional
- secondary
- still visibly part of the current chapter

### 4. If one season-facing surface borrows the clue, use the expedition card's existing note only

If `main-97` needs one visible connection outside the nursery tab, the expedition page already has the safest place for it:

- reuse the card's current `note`
- swap or lightly tune that line when a claimed nursery clue is relevant
- do not add a new badge, strip, or reward line

That is small enough to keep faith with the earlier `ROOT HOLLOW` support guidance, which already rejected a dedicated nursery-expedition reward lane.

## Why Not The Other Options

### 1. Do not use `mountain-avens` as the main support here

Why not:

- it naturally points forward into alpine or next-season territory
- `main-98` still needs room to add the clearer outward-facing setup card
- using it now would blur capstone support with next-season staging

### 2. Do not add a new nursery reward or expedition-specific nursery branch

Why not:

- the nursery reward model is intentionally tiny
- the queue item asks for support cues, not a broader reward system
- this would reopen the exact system-growth risk that earlier expedition guidance avoided

### 3. Do not bring nursery details back onto the routes page

Why not:

- the routes page is already carrying archive strip, route board, atlas strip, and support rows
- the archive pass just proved out the safe upper density for this surface
- `main-98` still needs one calm next-season card without fighting extra nursery copy

## Best Main-Agent Slice For `main-97`

The cleanest implementation bundle is:

1. add one pure resolver for a post-route nursery support clue window keyed to:
   - claimed `nursery:salmonberry-support`
   - `ROOT HOLLOW` ready/active/logged
   - `forest-season-threads` active or logged
2. feed that result through the existing field-station state model without adding new persistence
3. reuse the current nursery bottom accent line for that clue when no active route-support hint is available
4. optionally let the expedition card's `note` borrow the same clue family, but only by tuning the existing note field

## Expected File Touches

- `src/engine/nursery.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/nursery.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- keep the nursery optional and secondary
- show only one nursery clue at a time
- do not add a new expedition reward row or card
- do not let the pass crowd the archived routes page
- leave stronger next-season direction for `main-98`

## Queue Guidance

- close `ECO-20260330-scout-64` with this handoff
- promote `ECO-20260330-main-97` to `READY`
- keep `ECO-20260330-critic-72` blocked until the support pass lands
