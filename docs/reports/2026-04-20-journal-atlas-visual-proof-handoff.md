# Journal And Atlas Visual Proof Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-384`
Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
Lane: `lane-3`

## Scope

Packet `144` already has the systems, content, and route-copy guards in place. Lane 3 should not add more notebook copy, station chrome, route logic, or atlas layout. Its job is to provide visual proof that the most text-stressed notebook/atlas surfaces still read at the live `256x160` viewport.

## Recommended Main Contract

Make `ECO-20260420-main-384` a screenshot/proof pass. The default expected output is report plus ignored browser artifacts under `output/lane-3-main-384-browser/`; production source edits are only appropriate if the proof reveals a small lane-3-owned visual/place issue.

Capture these surfaces:

- `journal-alpine-detail`: a custom Treeline journal save with `mountain-avens` sighted in Treeline and Tundra, plus `moss-campion` in Treeline and `woolly-lousewort` in Tundra. Open the journal from Treeline and capture the normal Mountain Avens detail state before comparison is opened.
- `journal-alpine-comparison`: from that same save, press `C` or `Enter` to open the comparison card and capture the two-card `Fell Bloom Window` / `Brief Thaw Bloom` view. This directly proves lane 2's shortened ecosystem-note summaries fit in the tighter same-pane comparison layout.
- `station-atlas-high-pass`: use the existing `high-pass-ready-to-file` debug snapshot, open the field station `SEASON` routes page, and capture the station wrap, route board, and field atlas strip together.
- Optional if time allows: repeat the station capture with `high-pass-filed` to prove the final filed-alpha atlas/route page remains calm.

For each capture, save a companion `render_game_to_text()` JSON state next to the screenshot. Expected state checks:

- Journal detail: `journal.selectedBiomeId` is `treeline`, `journal.selectedEntryId` is `mountain-avens`, `journal.ecosystemNote.title` is `Fell Bloom Window`, and comparison is available but closed.
- Journal comparison: `journal.comparison.open` is `true` with card titles `Fell Bloom Window` and `Brief Thaw Bloom`.
- Station atlas: `fieldStation.view` is `season`, `fieldStation.atlas` is non-null, and the route board still names the active High Pass / filing state without visible clipping.

## Browser Setup Notes

The direct browser script can seed localStorage with `eco-explorer-save-v1`. The custom alpine journal save only needs a normal `SaveState` shape plus these discovered entries:

```json
{
  "mountain-avens": {
    "entryId": "mountain-avens",
    "discoveredAt": "2026-04-20T12:00:00.000Z",
    "biomeIds": ["treeline", "tundra"]
  },
  "moss-campion": {
    "entryId": "moss-campion",
    "discoveredAt": "2026-04-20T12:01:00.000Z",
    "biomeIds": ["treeline"]
  },
  "woolly-lousewort": {
    "entryId": "woolly-lousewort",
    "discoveredAt": "2026-04-20T12:02:00.000Z",
    "biomeIds": ["tundra"]
  }
}
```

Using the runtime `window.get_debug_save_snapshots()` hook is preferred for the station states so the proof stays aligned with existing save-snapshot coverage.

## Guardrails

- Do not edit authored science copy, route filed-note synthesis, station state, save schema, world-map behavior, corridor behavior, traversal geometry, or High Pass route logic.
- Do not add a new notebook, atlas, route, HUD, or station panel.
- If the proof shows an overflow that needs copy trimming, hand it to lane 2. If it needs station layout or route-preview behavior, hand it to lane 1 or lane 4. Lane 3 should only fix a visual proof artifact if it is clearly in the rendering/screenshot/place-readability layer.

## Verification For Main

- Run the required web-game client at least once against the current preview URL.
- Save screenshots and `render_game_to_text()` states under `output/lane-3-main-384-browser/`.
- Open and inspect the generated screenshots, then document whether the text is readable and whether any clipping/overlap appears.
- Run `npm run build` if any source file changes. If no runtime source changes land, `npm run validate:agents` plus `git diff --check` is enough after queue/packet/report updates.
