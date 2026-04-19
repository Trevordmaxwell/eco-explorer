# 2026-04-19 Late-Season Consequence And Homecoming Pass

## Summary

Sprint 4 landed well enough that the next move should be bigger than another tiny High Pass polish wave, but still disciplined enough to avoid a premature season-three jump. The right follow-on is one packet that makes the north end of the live season feel more consequential and gives station returns a little more visible payoff.

This packet should not open biome six, a broader planner shell, or another home-base dashboard. It should cash in the current late-season structure by making the Tundra half feel more remembered in its own right and by making returns to the existing field station shell feel slightly more earned.

## Why this is next

- `High Pass` now reads as a real chapter rather than just another station card.
- The queue is effectively clear, so this is a good point to launch one coherent next packet instead of fragmenting the work into unrelated cleanup.
- The remaining leverage is qualitative: make the north end more place-based, make `Thaw Window` more player-felt, and make station returns show just a little more consequence without adding more UI.
- `overlay-render.ts` is still one of the remaining concentration risks, so the next visible homecoming payoff should come through a protective split rather than more inline render growth.

## Preflight

Treat this as standing housekeeping, not a separate lane:

- omit `node_modules/` from future external review or playable repo drops
- clean-install verify with:
  - `npm install`
  - `npm run build`
  - `npm test`
  - `npm run validate:agents`

## Packet 128

### Lane 1

- extract the progression-driven station-shell accent or homecoming composition out of `overlay-render.ts`
- spend that seam on one additional calm visual return payoff on the existing station shell
- keep the shell compact and avoid any new card, row, or planner panel

### Lane 2

- add one compact Tundra relationship-teaching pass in the earlier `snow-meadow` / `thaw-skirt` family
- teach thaw, wet ground, and low holding plants through one note or prompt-scale seam
- keep copy compact and relationship-first

### Lane 3

- add one remembered Tundra place in the earlier `snow-meadow -> thaw-skirt` transition
- keep traversal calm and recoverable
- do not spend more density on the far-right `meltwater-bank-rest` pocket

### Lane 4

- deepen `Thaw Window` with one route-local consequence in the same earlier Tundra band
- make the active window change what the player notices or reaches for in play
- keep the station, notebook, and filed identity stable

## Explicit non-goals

- season three
- biome six
- a broader planner, dashboard, or quest shell
- more nursery rescue
- more Beach opener or extra High Pass destination density
- a second Tundra route

## Queue translation

### Ready

- `ECO-20260419-scout-315` — lane 1 station-shell payoff + architecture split
- `ECO-20260419-scout-316` — lane 2 compact Tundra relationship teaching
- `ECO-20260419-scout-317` — lane 3 earlier-band Tundra remembered place
- `ECO-20260419-scout-318` — lane 4 stronger `Thaw Window` consequence

### Blocked

- `ECO-20260419-main-315` / `critic-315`
- `ECO-20260419-main-316` / `critic-316`
- `ECO-20260419-main-317` / `critic-317`
- `ECO-20260419-main-318` / `critic-318`

## Notes for the next editor

- Treat packet `128` as the new active strategic priority.
- Keep `High Pass` stable as the proof that chapter-grade work can land cleanly; do not reopen that shell just because it is currently the strongest chapter.
- Use this packet to raise the broader late-season north end and the return loop toward the same standard before another scale jump.
