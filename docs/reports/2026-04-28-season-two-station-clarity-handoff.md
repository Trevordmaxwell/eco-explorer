# Season-Two Station Clarity Handoff

Date: 2026-04-28
Role: scout
Queue: `ECO-20260428-scout-487`
Packet: `.agents/packets/180-lane-1-season-two-station-clarity.json`

## Finding

The current Source to Shore endpoint is structurally clean: the route board stays on its dedicated `SOURCE TO SHORE` container and keeps exactly three filed beats after `Dune Catch`. The small clarity issue is on the station subtitle path. Once Source to Shore is fully filed, the `SEASON -> EXPEDITION` subtitle can still say `High Pass opens the next field season.` even though the expedition card is now `SOURCE TO SHORE / FILED`. That makes the post-Source-to-Shore endpoint feel like it is pointing backward instead of calmly closing the current field arc.

## Implementation Contract

Make the smallest filed-Source-to-Shore terminal-copy pass:

- Add a tiny filed-arc copy helper in `src/engine/source-to-shore-state.ts`, similar in spirit to `resolveHighPassFiledArcCopy`, so filed Source to Shore terminal language has one stable source.
- Use that helper in the filed `Dune Catch`/Source to Shore state, preserving the existing three-beat flow and not adding any new beat, route id, save field, or catalog entry.
- Update `src/engine/field-season-wrap.ts` so filed Source to Shore archive subtitles no longer fall through to the High Pass expedition subtitle. The route and expedition subtitles should read as filed-current-arc copy, not as a new launch prompt.
- Keep `src/engine/field-station-routes-page.ts` layout unchanged unless a test proves the subtitle fix needs a rendering nudge.

## Proof

Recommended focused checks:

- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|subtitle|filed arc"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Dune Catch"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Source to Shore station|Dune Catch|season capstone"`
- `npm run build`

Add or tighten tests so they prove:

- filed Source to Shore still has exactly three beats: `Source Shelter`, `Forest Release`, `Dune Catch`;
- filed Source to Shore has no active outing, no route marker, and no fourth beat;
- the `SEASON -> EXPEDITION` subtitle in the filed `source-to-shore-dune-catch-filed` state no longer says `High Pass opens the next field season`;
- the existing High Pass season-close subtitle behavior stays intact before Source to Shore is filed.

## Boundaries

Do not add a planner, dashboard, new station page, new route catalog entry, season-three shell, save migration, content pack, geometry, or fourth Source to Shore beat. This is a copy/state clarity pass on existing lane-1 station seams only.
