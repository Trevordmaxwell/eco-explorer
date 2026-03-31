# 2026-03-30 Support Choice And Replay Note Review

## Scope

Review for `ECO-20260330-critic-86` covering the new lane-4 support row, the `hand-lens` inspect annotation path, and the support-aware `TODAY` note behavior added in `main-111`.

## Result

No blocking lane-4 issues found.

The pass stays inside the intended shell:

- the new choice is one row inside the existing `SUPPORT` block, not a new page or loadout
- `hand-lens` and `route-marker` now feel meaningfully different without becoming two navigation tools
- the replay-aware `TODAY` copy remains compact and readable while changing tone based on the chosen support

## What Landed Cleanly

- `SEASON -> ROUTES` now exposes the support choice in the smallest possible place: one `OUTING SUPPORT` row above permanent upgrades
- `hand-lens` only annotates active missing evidence slots, so it helps interpretation without spoiling future targets
- `route-marker` now behaves like a real outing aid instead of a passive permanent perk, because the world-map marker only appears when the player actually selects it
- the lane kept the station shell calm by reusing the existing route strip, inspect bubble, and world-map marker instead of adding another hint surface

## Watch Item

One non-blocking watch item remains external to this lane step:

- `runtime-smoke` expectations were updated for the new support behavior, but the file was not rerun because the shared `verticalCues` regression in `src/engine/biome-scene-render.ts` still breaks that broader smoke pass outside lane 4

This does not block the lane-4 review because the focused support/request/season-board coverage passed and the runtime regression predates this step.

## Verification Reviewed

- `npx vitest run src/test/save.test.ts src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npx tsc --noEmit`

## Recommendation

Promote `ECO-20260330-scout-76` to `READY`.
