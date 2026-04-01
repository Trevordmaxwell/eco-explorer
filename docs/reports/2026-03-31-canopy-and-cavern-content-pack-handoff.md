# 2026-03-31 Canopy And Cavern Content Pack Handoff

Prepared for `ECO-20260331-scout-94` in lane 2.

## Scope Reviewed

- `src/content/biomes/forest.ts`
- `src/test/forest-biome.test.ts`
- `docs/science-source-ledger.md`
- `docs/reports/2026-03-30-old-growth-and-cave-support-pack-handoff.md`
- `docs/reports/2026-03-31-microhabitat-content-pack-handoff.md`
- browser references:
  - `output/main-126-browser/crown-rest.png`
  - `output/main-127-browser/under-basin-pocket.png`

## Current Read

- The forest vertical spaces are structurally strong now, but their authored teaching density is uneven.
- The old-growth height reads clearly as a destination, yet the high route still leans on repeated `tree-lungwort`, `licorice-fern`, and `old-mans-beard` placements more than on one new teachable habitat clue.
- The under-root side already has the right animal carriers for a calm cave-family read: `ensatina`, `banana-slug`, and `seep-stone` do their jobs. The thin spot is now the seep wall itself, not another floor animal.
- That means `main-132` should not open another fauna branch. The best next gain is one canopy habitat carrier plus one seep-surface habitat carrier, then let two compact notes do the synthesis work.

## Recommendation

Treat `main-132` as one narrow two-entry, two-note pack.

## 1. Add One Canopy Habitat Carrier

Best entry:

- `canopy-moss-bed`

Recommended shape:

- common name: `Canopy Moss Bed`
- category: `landmark`
- subtitle: `Water-holding branch moss`

Suggested placement:

- one authored placement near `old-growth-crown-window`
- one authored placement near `old-growth-crown-rest` or `old-growth-inner-bark-rest`

Teaching role:

- thick moss and lichen on old limbs can act like a soft substrate that holds water and lets other plants start high above the ground

Science support:

- Olympic says mosses and lichens on living trees can provide soil and structure for ferns and even tree seeds high above the ground

This recommendation is an inference from those habitat descriptions, so the entry should stay landmark-framed rather than pretending to name one exact moss species.

## 2. Add One Seep-Surface Habitat Carrier

Best entry:

- `seep-moss-mat`

Recommended shape:

- common name: `Seep Moss Mat`
- category: `landmark`
- subtitle: `Water-holding seep moss`

Suggested placement:

- one authored patch on the `root-hollow-under-basin-pocket` wall or lip
- one smaller authored patch near `filtered-return` where the player can still read it without dropping all the way down

Teaching role:

- tiny seep flow can keep rough stone wet enough for mosses and other small clinging life to persist on the wall itself, not only on the basin floor

Science support:

- NPS seep guidance directly says tiny flows can support mosses, lichens, ferns, and flowering plants clinging to rough rock or slope surfaces

This is also an inference-driven landmark entry, so keep the naming descriptive and general.

## 3. Let Two Notes Do The Teaching Work

### Note A

- id: `forests-above`
- title: `Forests Above`
- entryIds: `canopy-moss-bed`, `old-mans-beard`, `western-hemlock-seedling`
- minimumDiscoveries: `2`
- zoneId: `old-growth-pocket`

Main lesson:

- one giant tree can hold enough moss, water, and bark texture for a tiny branch-top garden to start above the forest floor

Suggested prompt direction:

- what here looks like a little forest growing above your head?

### Note B

- id: `seep-wall-garden`
- title: `Seep Wall Garden`
- entryIds: `seep-moss-mat`, `seep-stone`, `tree-lungwort`
- minimumDiscoveries: `2`
- zoneId: `stone-basin`

Main lesson:

- seep water can keep life clinging right on rough stone and damp wall surfaces, not only in the lowest wet pocket

Suggested prompt direction:

- what here seems growing right on wet stone?

## Why This Is The Right Pack

- It deepens both target spaces without reopening lane-3 geometry or adding another traversal ask.
- It avoids a second cave-fauna wave now that the under-root side already has stronger living carriers than the canopy side.
- It gives the later memory-payoff scout step cleaner anchors than another repeated bark lichen or another low-floor animal would.

## What `main-132` Should Avoid

- no new forest animal branch
- no new comparison or close-look additions in this pass
- no journal-layout, route, station, or traversal runtime changes
- no more than two new entries

## Suggested File Targets

- `src/content/biomes/forest.ts`
- `src/assets/forest-flora.ts` if bespoke moss sprites are needed
- `src/test/forest-biome.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Suggested Verification

- `npm test -- --run src/test/forest-biome.test.ts src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the high old-growth route with the new canopy carrier visible
- one seeded browser capture of the under-basin pocket with the new seep-surface carrier visible

## Queue Guidance

- Close `ECO-20260331-scout-94`.
- Promote `ECO-20260331-main-132` to `READY`.
- Keep `ECO-20260331-critic-105` blocked until the content pack lands.

## Source Trail

- [Olympic National Park: Mosses](https://www.nps.gov/olym/learn/nature/mosses.htm)
- [Delaware Water Gap National Recreation Area: Springs and Seeps](https://www.nps.gov/dewa/learn/nature/springs.htm)
