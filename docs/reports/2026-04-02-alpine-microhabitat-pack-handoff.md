# 2026-04-02 Alpine Microhabitat Pack Handoff

Prepared for `ECO-20260402-scout-102` in lane 2.

## Scope Reviewed

- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/test/treeline-biome.test.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`
- `docs/reports/2026-04-02-alpine-microhabitat-richness-phase.md`

## Current Read

- Treeline and tundra already have enough broad species coverage to teach the alpine branch, but their most interesting local microhabitats are still under-authored compared with the recent forest lane-2 work.
- `treeline` now has a strong `lee-side lift`, yet the authored content in that space is still mostly one `moss-campion` placement plus the existing general fell and berry tables. It reads as climbable, but not yet as a biologically specific alpine shelter pocket.
- `tundra` now has a real `thaw-skirt` band, but it still has no authored habitat carriers at all. The biome teaches thaw and tussocks through repeated plants, not through one named wet-space clue that makes the band feel memorable.
- That means `main-140` should not open a broad new alpine species wave or a shared-entry migration. The cleaner next gain is one landmark-framed microhabitat carrier in treeline, one in tundra, and two compact notes that teach what those small places are doing.

## Recommendation

Treat `main-140` as one narrow two-entry, two-note alpine pack.

## 1. Add One Treeline Talus Microhabitat Carrier

Best entry:

- `talus-cushion-pocket`

Recommended shape:

- common name: `Talus Cushion Pocket`
- category: `landmark`
- subtitle: `Rock-sheltered alpine patch`

Suggested placement:

- one authored placement near `lee-pocket-rime-rest`
- one authored placement on the open `lichen-fell` side near the `lee-pocket-fell-return`

Teaching role:

- exposed alpine stone can still hold tiny islands of life where rock breaks wind just enough for cushion plants and lichens to keep hold

Science support:

- Yukon-Charley plant guidance describes exposed talus supporting sparse islands of cushion plants interspersed with lichens

This should stay landmark-framed rather than pretending to name one exact talus species.

## 2. Add One Tundra Wet-Channel Microhabitat Carrier

Best entry:

- `tussock-thaw-channel`

Recommended shape:

- common name: `Tussock Thaw Channel`
- category: `landmark`
- subtitle: `Wet space between tussocks`

Suggested placement:

- one authored placement in the `thaw-skirt` band near `thaw-skirt-upper-shelf`
- one smaller authored placement toward `meltwater-edge`

Teaching role:

- raised tundra tussocks leave wet low channels where thaw water lingers and tiny mossy ground can keep holding on

Science support:

- Arctic park guidance describes mosses and lichens growing in moist channels between tundra tussocks

This should also stay landmark-framed and descriptive instead of naming one exact moss community.

## 3. Let Two Notes Do The Teaching Work

### Note A

- id: `talus-islands`
- title: `Talus Islands`
- entryIds: `talus-cushion-pocket`, `moss-campion`, `frost-heave-boulder`
- minimumDiscoveries: `2`
- zoneId: `lichen-fell`

Main lesson:

- among bare alpine stones, tiny sheltered islands let cushion plants and lichens keep a foothold

Suggested prompt direction:

- what here stays alive between bare stones?

### Note B

- id: `between-tussocks`
- title: `Between Tussocks`
- entryIds: `tussock-thaw-channel`, `bigelows-sedge`, `cottongrass`
- minimumDiscoveries: `2`
- zoneId: `thaw-skirt`

Main lesson:

- raised tundra tussocks leave wetter low channels where thaw water and tiny low growth linger

Suggested prompt direction:

- what here grows in the low wet spaces?

## Why This Is The Right Pack

- It gives both alpine biomes one stronger place-based teaching cue instead of trying to solve the density gap with more general species repetition.
- It keeps the wave content-owned and compact: no route work, no traversal edits, no journal-shell changes, and no shared-species migration.
- It gives `scout-103` cleaner future memory-payoff targets than another berry patch or another broad alpine bloom would.

## What `main-140` Should Avoid

- no shared-entry migration in this pass
- no new close-look or comparison work yet
- no route, station, world-map, or traversal runtime changes
- no more than two new entries

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/assets/treeline-ambient.ts` or `src/assets/treeline-flora.ts` if a bespoke treeline microhabitat sprite is needed
- `src/assets/tundra-ambient.ts` or `src/assets/tundra-flora.ts` if a bespoke tundra channel sprite is needed
- `src/test/treeline-biome.test.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/content-quality.test.ts`
- `docs/science-source-ledger.md`

## Suggested Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/tundra-biome.test.ts src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run build`
- one seeded browser capture of the `lee-side lift` showing the new treeline carrier
- one seeded browser capture of the `thaw-skirt` or `meltwater-edge` band showing the new tundra carrier

## Queue Guidance

- Close `ECO-20260402-scout-102`.
- Promote `ECO-20260402-main-140` to `READY`.
- Keep `ECO-20260402-critic-113` blocked until the alpine content pack lands.

## Source Trail

- [Yukon-Charley plants](https://www.nps.gov/yuch/learn/nature/plants.htm)
- [Bering Land Bridge grasses](https://www.nps.gov/bela/learn/nature/grasses.htm)
- [Arctic Network ecosystems](https://www.nps.gov/im/arcn/ecosystems.htm)
