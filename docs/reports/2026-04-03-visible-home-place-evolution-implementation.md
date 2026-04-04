# 2026-04-03 Visible Home-Place Evolution Implementation

Implemented `ECO-20260403-main-228` against packet `092`.

## What Changed

The visible home-place pass stayed inside the existing nursery cards in `src/engine/overlay-render.ts`.

- `PROPAGATION BENCH`, `COMPOST HEAP`, and `TEACHING BED` now use a clearer card-header treatment so body copy starts below the title instead of crowding it.
- The compost card now shows a tiny upgraded heap accent when `compostRate > 1` instead of spending more space on extra utility text.
- The teaching-bed card now carries one compact home-place strip along its footer:
  - a tiny `log-pile` marker when unlocked
  - a four-pip growth read
  - a tiny `pollinator-patch` bloom when unlocked
- Mature-bed states now stay focused on the core read:
  - project title and stage
  - one compact reward-clue line
  - one memory line
- The old trailing `Extras:` text row is gone, and the duplicated mature route clue is suppressed so the evolved bed reads cleanly.

## Why This Fits The Handoff

The pass makes the station feel more shaped by prior play without adding a new station page, recap strip, or denser shell. The visual payoff now lives in the nursery cards themselves, which matches the scout recommendation and keeps the change inside lane-1 overlay scope.

## Verification

- `npm run build`
- `npx vitest run src/test/runtime-smoke.test.ts -t "opens the nursery tab and starts one teaching-bed project from the field station|adds a season expedition page that becomes ready after the three live routes are logged"`
- `node "$HOME/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js" --url http://127.0.0.1:4193/ --actions-json '{"steps":[{"buttons":["enter"],"frames":2},{"buttons":["right"],"frames":18},{"buttons":[],"frames":10}]}' --iterations 2 --pause-ms 200 --screenshot-dir output/lane-1-main-228-client`
- Seeded live browser proof at `256x160` with:
  - mature `sand-verbena-bed`
  - unlocked `log-pile`
  - unlocked `pollinator-patch`
  - `compostRate: 2`
- Browser artifact saved to `output/lane-1-main-228-browser/nursery-evolved-state.png`
- Browser console check stayed clean; `output/lane-1-main-228-browser/console-errors.json` contains `[]`
