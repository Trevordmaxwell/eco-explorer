# Save Snapshot States

These debug-only snapshots help reviewers jump to key RC arc states without replaying the full season or Source to Shore beta route.

They are plain `SaveState` JSON payloads built by `src/engine/debug-save-snapshots.ts`. The storage key comes from `SAVE_STORAGE_KEY` in `src/engine/save.ts` and is also included as `localStorageKey` in every runtime snapshot payload.

## Browser Console Workflow

Open the game, then run this in the browser console:

```js
const snapshots = JSON.parse(window.get_debug_save_snapshots()).snapshots;
const snapshot = snapshots.find(({ id }) => id === 'high-pass-ready-to-file');
localStorage.setItem(snapshot.localStorageKey, snapshot.localStorageValue);
location.reload();
```

Replace `high-pass-ready-to-file` with any snapshot id below.

## Snapshot IDs

- `first-session`: fresh beach start with starter field-season guidance intact.
- `forest-moisture-holders`: Hidden Hollow filed; station, map, and journal keep Root Hollow current for Moisture Holders.
- `station-return`: forest survey logged; the station-return beat points back to Trail Stride.
- `front-half-open-to-shelter`: Trail Stride owned; station and map point toward Coastal Scrub and Open To Shelter.
- `treeline-stone-shelter`: coastal line logged; station, map, and journal point toward Treeline Pass and Stone Shelter before High Pass opens.
- `tundra-thaw-window`: Stone Shelter logged; peak thaw keeps station, map, and journal on active Thaw Window in Tundra Reach.
- `season-close-return`: Season Threads logged with the calm return-to-station close beat still pending.
- `high-pass-active`: season close acknowledged; High Pass is the active next field-season route.
- `high-pass-ready-to-file`: High Pass evidence slots are filled and the note is ready to file.
- `high-pass-filed`: High Pass is completed, route progress is clear, and the arc is settled.
- `source-to-shore-active`: High Pass is filed; Source Shelter is the active beta vertical-slice outing.
- `source-to-shore-ready-to-file`: Source Shelter evidence is filled and the beta note is ready to file.
- `source-to-shore-filed`: Source Shelter is filed; Forest Release is the active downstream beta beat.
- `source-to-shore-forest-release-ready-to-file`: Forest Release evidence is filled and the downstream beta note is ready to file.
- `source-to-shore-forest-release-filed`: Forest Release is filed and Dune Catch is the active coastward beta beat.
- `source-to-shore-dune-catch-ready-to-file`: Dune Catch evidence is filled and the coastward beta note is ready to file.
- `source-to-shore-dune-catch-filed`: Dune Catch is filed as the Source to Shore beta closure.

## Guardrails

- The snapshots do not add telemetry, analytics, network calls, UI, or a debug dashboard.
- The snapshots do not change the save schema; they only serialize current `SaveState` fields.
- If the save shape changes later, update the builders and keep `src/test/save-snapshots.test.ts` round-tripping every payload through `normalizeSaveState()`.
