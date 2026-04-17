# Route-Feel Extension Handoff

Prepared `ECO-20260416-scout-302` for lane 4.

## Recommendation

Extend the existing support-readable `NOTEBOOK J` chip to two earlier route-feel proofs by teaching it about the broader case it already misses today:

- `hand-lens` retargeting inspect to the current notebook-fit route clue, even when that clue is not a process-only alternate

Do not answer this pass with more route copy, a new support row, or another planner seam. The win is already live in input feel on some earlier routes; Sprint 1 should make that win readable in the same tiny chip without widening the shell.

## Why `supportBiasActive` Needs A Cleaner Split First

`resolveInspectTargetSelection()` already tracks three distinct winners:

- the raw nearest inspectable
- the nearest notebook-fit route clue
- the nearest preferred active-clue alternate

But the returned UI state only exposes one boolean, `supportBiasActive`, which currently means the third case only.

That is enough for the existing `Thaw Window` and `Held Sand` proofs, but it is not truthful for earlier routes where `hand-lens` already retargets inspect toward the active route clue without relying on a process-only alternate. Before the chip grows to those routes, lane 4 should split this seam so the UI can read the broader retarget case without overloading the old flag.

## Concrete Main Handoff

`ECO-20260416-main-302` should use exactly two route proofs:

### 1. Front-Half Proof: `beach-shore-shelter`

Use the ordinary live final `wrack-line` stage on `Shore Shelter`, not a new process variant.

This route already has a player-felt support win:

- the existing runtime proof shows `hand-lens` pulling `E` from a nearer `pacific-sand-crab` to the live `bull-kelp-wrack` clue on the tide-line shelf
- `note-tabs` stays on the physically nearer inspectable in the same setup

Sprint 1 should make that earlier beach win readable through the existing chip.

### 2. Forest Proof: `forest-cool-edge`

Use the ordinary live `Cool Edge` gathering state at `creek-bend` after `edge-carrier` is already logged, so the next live clue is `cool-floor`.

Preferred proof shape:

- seed the route with `edge-carrier` filled by `salmonberry`
- use one deterministic `creek-bend` shelf where `hand-lens` pulls inspect from a nearer non-route floor or life decoy to `redwood-sorrel`
- keep the comparison support on the plain hint state in the same shelf setup

If `redwood-sorrel` cannot be made deterministic enough on the first shelf pass, the same proof can use `wet-shade` / `sword-fern` instead. The important part is that the forest proof should stay on an ordinary route clue, not a new route title or new UI surface.

## Seam Guidance

Keep the seam small and explicit:

- expose one broader inspect-selection signal for `hand-lens changed what E will inspect right now`
- keep the narrower active-clue meaning separate if the controller still needs it later
- drive the chip from the broader retarget signal
- keep the stronger `LENS CLUE:` bubble copy limited to the narrower active-clue path for now

Practical shape:

- replace or split `supportBiasActive` instead of reusing it for two meanings
- let the chip care about `support retargeted inspect`
- let the bubble stay on the current active-clue-only seam unless the main pass finds a clear reason to widen that too

## Proof Plan

- Add one controller test proving the early beach retarget case is now visible to the chip without pretending it is an active-clue alternate.
- Add one controller and runtime proof for the forest `Cool Edge` shelf.
- Keep the existing `Thaw Window` and `Held Sand` proofs green.
- Keep `note-tabs` on the plain hint state in both new setups.

## Guardrails

- no new HUD
- no new planner shell
- no support-strip growth
- no route-title or notebook-copy expansion
- no new route definitions unless the deterministic forest proof truly cannot be expressed on the live `Cool Edge` shelf

## Why This Is The Right Sprint-1 Spend

This pass buys down two risks at once:

- it spreads the support-feel win into earlier route play, so support choice matters before the late-route proofs
- it keeps the inspect-target seam honest before more UI depends on an overloaded boolean
