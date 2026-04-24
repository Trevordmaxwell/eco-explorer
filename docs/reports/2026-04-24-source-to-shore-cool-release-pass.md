# Source to Shore Cool Release Pass

Date: 2026-04-24

## Summary

- Added a live `Cool Release` variant for the downstream `Forest Release` Source to Shore beat when Forest Trail is in its late mist-drip revisit window.
- Let the existing `Rime Source` high-source variant travel through the Source to Shore station, map, atlas, and launch-card surfaces instead of living only on the active request.
- Kept filed-note identity stable: live variants can rename the active outing, but ready-to-file and filed returns still resolve to `Source Shelter` and `Forest Release`.

## Science And Feel

- The new forest variant keys off the already-authored `moisture-hold` process moment: late phenology, mist-drip weather, and repeat forest visits.
- Hand lens now favors `seep-moss-mat` for seep hold and `sword-fern` for cool release during that wet window, making the route read as a damp seep-to-shade pathway rather than a generic checklist.
- The station copy stays compact: `FIELD ATLAS` remains one action/memory line, while the launch card carries the live outing name.

## Verification

- `npm test -- --run src/test/field-requests.test.ts src/test/field-season-board.test.ts -t "Source to Shore|Cool Release|route-state matrix|station atlas and active outing copy"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Cool Release Source to Shore|Source Shelter beta|source-to-shore"`
- `npm run build`
- Web-game client smoke: `output/source-to-shore-cool-release-client/`
- Browser proof at `256x160`: `output/source-to-shore-cool-release-browser/cool-release-station-256x160.png`
- Browser state/console proof: `output/source-to-shore-cool-release-browser/cool-release-station-state.json`, `output/source-to-shore-cool-release-browser/console-errors.json`
