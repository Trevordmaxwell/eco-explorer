# 2026-03-29 Corridor Edge-Content Matrix Handoff

## Recommendation

For the first `beach <-> coastal-scrub` corridor proof, keep the content matrix deliberately narrow and edge-focused.

Do not pull the full live biome rosters into the corridor. The proof should teach dune stabilization and first scrub shelter, not the entire beach or scrub habitats at once.

Recommended corridor slices:

- origin anchor slice: mirrored `beach` `dune-edge`
- visible blend band: shared dune transition plus first scrub cues
- destination anchor slice: `coastal-scrub` `back-dune` leading into very early `shrub-thicket`

## Content Matrix

| Corridor section | Terrain and tile read | Parallax and atmosphere | Primary entries | Secondary entries | Exclude in v1 |
| --- | --- | --- | --- | --- | --- |
| Origin anchor | flatter dune mounds, open sand, sparse low lifts | beach haze, wider sky, lower ridge contrast | `beach-grass`, `sand-verbena` | `sea-rocket`, one small driftwood accent at most | `bull-kelp-wrack`, `pacific-sand-crab`, `tidepool` props |
| Early blend | slightly rising dune line, more rooted sand, mild surface variation | haze still beach-led, first inland ridge hint | `beach-grass`, `sand-verbena` | `sea-rocket` | any shrub wall or pine silhouettes |
| Center blend | mixed dune-to-scrub footing, denser ground texture, first low shrub silhouettes | balanced coastal haze plus first scrub-band darkening | `beach-grass`, `sand-verbena`, `dune-lupine` | `sea-rocket` | `shore-pine`, `sword-fern`, forest-edge props |
| Late blend | firmer raised ground, more root hold, less open sand | scrub ridge becomes clearer, sky slightly less open | `dune-lupine`, `beach-grass` | `sand-verbena` | dense thicket clutter, pine stand props |
| Destination anchor | back-dune with first sheltered scrub pockets | stronger scrub-band contrast, less open beach sky | `dune-lupine`, `beach-grass` | `sand-verbena`, a very light first `coyote-brush` accent only if needed | `shore-pine`, `sword-fern`, `salmonberry`, inland forest cues |

## Practical Weight Direction

If the proof uses weighted decor or spawn emphasis inside corridor slices, keep it simple:

- origin anchor: roughly `5 / 3 / 1` for `beach-grass`, `sand-verbena`, `sea-rocket`
- center blend: roughly `4 / 3 / 2 / 1` for `beach-grass`, `sand-verbena`, `dune-lupine`, `sea-rocket`
- destination anchor: roughly `4 / 3 / 2` for `dune-lupine`, `beach-grass`, `sand-verbena`

That is enough to show ecological drift without making the corridor feel like a random mixed-biome lottery.

## Terrain Read

The corridor should signal facilitation through terrain, not just species lists.

Recommended progression:

- open looser sand at the origin side
- slightly firmer, more rooted dune shapes through the center
- modestly lifted, more sheltered ground at the destination side

Keep vertical changes small. The corridor needs to read at `192x144` without turning into a platforming difficulty spike.

## Why This Is Safer Than Full-Roster Mixing

- It protects the ecological lesson: pioneers first, shelter later.
- It reduces science drift by avoiding tide-line and inland forest content in the same narrow corridor.
- It keeps the threshold readable because the destination side feels more sheltered before deeper scrub or forest plants appear.
- It fits the current runtime better because the seam can be authored from edge slices instead of merged from two full biome generators.

## Queue Outcome

This should tighten `main-46`, not expand it.

The first corridor proof should:

- stay inside the `beach` dune-edge and `coastal-scrub` back-dune vocabulary
- introduce `dune-lupine` as the main “new habitat” signal
- avoid tidepool, wrack-line, shore-pine, and forest-edge content in v1
