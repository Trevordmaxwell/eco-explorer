# 2026-04-03 Season-Two Capstone Handoff

`ECO-20260402-scout-142` narrowed the next lane-1 step to one compact capstone-close bridge.

## What The Live Build Is Doing

- The project already has a real capstone outing: `Season Threads`.
- The routes shell already has a real filed-season destination waiting after that: the `High Pass` opener on `SEASON -> ROUTES`.
- There is also still an older calm-close seam in code and tests:
  - `field-season-board.ts` carries a `Season threads logged. Return to the field station for a calm season close.` branch
  - `field-season-board.test.ts` still passes a `RETURN TO STATION` season-close note into the wrap helper
- In practice, that calm-close seam is now mostly bypassed because `resolveSeasonOutingLocator(save)` immediately turns the filed state into the `High Pass` opener.

## Constraint To Keep

- Do not add a second post-capstone routes shell or a new ceremony surface.
- Do not displace the current `High Pass` opener once the player is back at the station.
- Keep the capstone close notebook-toned and short.

## Recommended `main-180` Shape

Use one compact return-to-station close cue after `Season Threads` logs, then let the current `High Pass` routes shell take over as it already does.

Suggested implementation shape:

1. Reuse the existing `RETURN TO STATION / ... calm season close.` wording family as the short post-file cue instead of inventing a new board or archive state.
2. Surface that close through the current guided notice / station-note seam right after `forest-season-threads` logs and before the player re-enters the filed `High Pass` shell.
3. Leave the current `High Pass` routes page, archive strip, atlas note, and expedition teaser intact once the player actually reaches the station.
4. Remove or stop relying on the stale dead-end season-close board branch if the new cue makes it fully redundant.

## Likely File Targets

- `src/engine/guided-field-season.ts`
- `src/engine/game.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Concrete Acceptance For `main-180`

- finishing `Season Threads` no longer feels like it jumps straight into the next season with no calm close beat
- the close beat uses existing notice or station-note seams
- the filed `High Pass` routes shell still remains the steady next destination once the player is back at the station
- no new archive page, ceremony panel, or extra routes card appears
