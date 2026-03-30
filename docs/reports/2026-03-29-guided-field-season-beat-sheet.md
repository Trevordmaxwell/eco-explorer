# 2026-03-29 Guided Field-Season Beat Sheet

## Strongest Fresh-Save Loop

The strongest current act-one path is now:

1. `Beach` start with the visible `NOTEBOOK TASK` pointing to `Forest Trail`
2. `Forest Trail` route-find into `Root Hollow` for `Hidden Hollow`
3. stay in `Root Hollow` for the damp-ground comparison beat in `Moisture Holders`
4. widen to `Log Run` plus `Root Hollow` for the four-clue `Forest Survey`
5. return through the world map and field station for the first support beat
6. move into `Coastal Scrub` for `Shelter Shift`
7. continue one step deeper to `forest-edge` for `Edge Moisture`

That path introduces movement, one authored traversal proof, one comparison-heavy notebook beat, one station payoff, and one clear next habitat without turning the game into a quest-log ladder.

## Beat Matrix

### Beat 1. Beach start

- Primary systems: guided field-season note, active field request, beach journal shell
- Player-facing question: where should I go first?
- Current strength: the notebook task lands immediately and the request now says `Go To Forest Trail` before the player arrives

### Beat 2. Forest route-find

- Primary systems: traversal, biome travel, request completion
- Player-facing question: where is the sheltered lower lane?
- Current strength: `Root Hollow` is now a real exploration beat instead of a flat corridor

### Beat 3. Forest comparison

- Primary systems: inspect, ecosystem-note unlocks, notebook request progress
- Player-facing question: which damp-ground neighbors help this floor stay cool and wet?
- Current strength: the player now gets a meaningful compare-and-notice beat before survey cleanup

### Beat 4. Forest survey

- Primary systems: journal progress, survey state, field-credit eligibility
- Player-facing question: can I finish a small slice of this habitat before heading back?
- Current strength: the survey beat reads as an authored finish, not a grind target

### Beat 5. Station return

- Primary systems: world map, field station, first upgrade
- Player-facing question: what did that fieldwork earn?
- Current strength: the station now functions as a return beat and acknowledgment layer

### Beat 6. Coastal shelter comparison

- Primary systems: new request support in `src/engine/field-requests.ts`, back-dune spawn mix in `src/content/biomes/coastal-scrub.ts`, beach/coast comparison support in `src/engine/journal-comparison.ts`
- Player-facing question: where do the dunes start feeling more sheltered?
- Current strength: this is now the clearest next stop after the forest run because `sand-verbena`, `beach-grass`, and `dune-lupine` support one tight notebook task

### Beat 7. Forest-edge moisture shift

- Primary systems: new note and prompt support in `src/content/biomes/coastal-scrub.ts`, `src/engine/observation-prompts.ts`, and `src/engine/journal-comparison.ts`
- Player-facing question: where does scrub start holding forest-like shade and moisture?
- Current strength: `sword-fern` now bridges `forest` and `coastal-scrub`, which gives the loop a better habitat-gradient teaching beat

## Thin Spots That Still Matter

- `Coastal Scrub` now has better authored content support, but it is still much flatter than `forest` as a movement space. The next high-value implementation pass should deepen its traversal rather than add more station logic first.
- The field-station surface is already near its comfortable copy budget at `256x160`. Future reinforcement should prefer better discoveries, requests, and prompts over more station rows.
- The beach still functions more as launch context than as a full teaching stop inside this loop. That is acceptable for act one, but later packets should avoid starving beach of revisit value.
- Shared-species comparison remains intentionally allowlisted. Future pairs should be note-backed and habitat-role-driven, not added just to increase totals.

## Queue Guidance

`ECO-20260329-scout-34` can close with this report.

`ECO-20260329-main-57` should prefer `coastal-scrub` over `treeline` as the second traversal-heavy biome, because the guided loop now already points the player there and the content fuel pack has made that stop teachable.
