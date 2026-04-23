# High-Country Traversal Spread Pass

Date: 2026-04-23

## Summary

This pass deepens the high-country branch without adding a new traversal system. Treeline Pass now has a small dwarf-shrub recovery pocket after Stone Shelter, and Tundra Reach now has a snow-edge pocket between the wind threshold and the existing drift hold.

## Treeline Pass

- Added two small granite holds: `dwarf-shelter-stone-lip` and `dwarf-shelter-berry-rest`.
- Added four authored shelter carriers: dwarf birch, frost-heave boulder, hoary marmot, and rock ptarmigan.
- Kept the pocket authored-only after browser proof showed the existing stable and visit tables already add enough surrounding life at this camera band.

Science grounding:

- Low woody shrubs are plausible near treeline where wind and cold suppress taller growth.
- Raised frost-heave stone and nearby alpine animals make the pocket read as lee shelter rather than a generic jump challenge.

## Tundra Reach

- Added two small ice-platform holds: `snow-edge-pocket-lip` and `snow-edge-pocket-rest`.
- Added four authored snow-edge carriers: purple saxifrage, Bigelow's sedge, northern collared lemming, and snow bunting.
- Kept the pocket authored-only so the new lemming and bunting beats stay readable beside the existing snow-meadow spawn tables.

Science grounding:

- Purple saxifrage fits the early snowmelt edge, sedge marks low tussock ground, and lemming / bunting staging keeps the pocket animal-readable without implying a heavy predator-prey system.
- The pocket stays low and forgiving so Tundra remains an exposed plateau and thaw-window biome, not a second mountain-climb space.

## Verification

- `npm run test -- src/test/treeline-biome.test.ts src/test/tundra-biome.test.ts`
- Browser proof at native `256x160`:
  - `output/high-country-traversal-spread-browser/treeline-dwarf-shelter-pocket.png`
  - `output/high-country-traversal-spread-browser/tundra-snow-edge-pocket.png`
  - `output/high-country-traversal-spread-browser/errors.json` was empty.
- `npm run alpha:rc`

Alpha RC generated and verified `output/review-drops/eco-explorer-review-drop-20260423-153244.tgz`.
