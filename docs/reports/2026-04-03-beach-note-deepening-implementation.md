# 2026-04-03 Beach Note Deepening Implementation

Implemented `ECO-20260402-main-184` in lane 2.

## What Changed

- refreshed `low-runner-band` in `src/content/biomes/beach.ts` so the dry-sand note now teaches the new bloom-and-runner transition with `beach-pea`, `dune-lupine`, and `sand-verbena`
- added one new `lee-pocket-hold` note so the beach journal now teaches driftwood-sheltered runners and calmer sand through `driftwood-log`, `dune-lupine`, and `beach-strawberry`
- repurposed `wave-edge-survivors` into the sharper `Wrack Workers` card built around `bull-kelp-wrack`, `beach-hopper`, and `western-snowy-plover`
- updated `src/test/ecosystem-notes.test.ts` so the refreshed dry-sand note, the new lee-pocket note, and the wrack-food-web note all resolve through compact beach-local discovery pairs

## Why This Holds

- The pass stays beach-first. It deepens shelter, calmer sand, and wrack-line food-web teaching without importing scrub shrubs or adding more shell-only notes.
- The journal stays calm. This is one revision, one new note, and one replacement inside the existing note surface instead of a broader note count jump.
- The new note layer now matches the front-half content pack from `main-183`: `dune-lupine`, `beach-strawberry`, and `beach-hopper` all now matter in the journal instead of only in the playfield.

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts src/test/journal.test.ts`
- `npm run build`
- `node "$WEB_GAME_CLIENT" --url http://127.0.0.1:4181 --iterations 1 --pause-ms 200 --screenshot-dir output/lane-2-main-184-client --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":[],"frames":12},{"buttons":["right"],"frames":12},{"buttons":[],"frames":6}]}'`
- seeded Playwright browser verification with clean console output in:
  - `output/lane-2-main-184-browser/lee-pocket-state.json`
  - `output/lane-2-main-184-browser/lee-pocket.png`
  - `output/lane-2-main-184-browser/wrack-workers-state.json`
  - `output/lane-2-main-184-browser/wrack-workers.png`
  - `output/lane-2-main-184-browser/console-errors.json`

## Queue Outcome

- Close `ECO-20260402-main-184`.
- Promote `ECO-20260402-critic-157` to `READY`.
