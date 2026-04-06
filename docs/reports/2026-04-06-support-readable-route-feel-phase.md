# 2026-04-06 Support-Readable Route Feel Phase

## Summary

The last route-differentiation wave landed the real gameplay win: `hand-lens` now changes live clue-finding on `Thaw Window` and `Held Sand`. The next push should not add more geometry, more nursery surgery, or more notebook density. It should make that win easier to feel at a glance and safer to extend.

## Direction

- Keep `Tundra` and `Coastal Scrub` content stable.
- Add one tiny player-facing cue when active support is biasing live clue-finding.
- Move support-biased inspect-target selection and its debug export farther out of `game.ts`.
- Spend lane 3 on regression protection only, not new destination growth.

## Lane Split

### Lane 1

- extract the inspect-target support seam into a dedicated helper/controller boundary
- keep `game.ts` from absorbing another route-feel wrapper cluster

### Lane 2

- prepare and tune one tiny handheld-safe cue
- keep copy and visuals under strict `256x160` budgets

### Lane 3

- protect thaw-skirt and back-dune proof bands from readability or recoverability regressions
- avoid new geometry, new landmarks, or denser authored stops

### Lane 4

- own the coherent player-facing pass
- pair the tiny cue with the extracted helper seam
- prove the result only on `Thaw Window` and `Held Sand`

## Guardrails

- no new route HUD
- no new planner shell
- no more immediate nursery rescue
- no immediate new `Tundra` geometry or `Beach` / `Treeline` destination growth
- future external review drops should continue to omit `node_modules`
