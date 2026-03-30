# Live Biome Science Audit

Date: 2026-03-28
Status: Completed after `main-18` and `main-27`

## Method

- read queue item `ECO-20260328-critic-10` and packet `006`
- reviewed:
  - `src/content/shared-entries.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`
  - `docs/science-source-ledger.md`
  - `docs/world-travel.md`
- rechecked high-risk names and habitat pairings against current external references
- ran:
  - `npm test -- --run`
  - `npm run build`
  - `npm run validate:agents`

## Findings

### 1. `sea-rocket` is still being used as a shared Pacific coastal anchor even though `Cakile edentula` is introduced on the Pacific coast

File anchors:

- `src/content/shared-entries.ts:16-25`
- `src/content/biomes/beach.ts:39-40`
- `src/content/biomes/coastal-scrub.ts:143-167`

The current short fact and journal text are biologically plausible for the species itself, but the content role is still wrong for this project's now-explicit Pacific coastal branch.

The problem is not that `Cakile edentula` cannot live on beaches. It can. The problem is that the game now uses it as a calm shared foredune default across both `Beach` and `Coastal Scrub`, which reads like a native Pacific anchor. Smithsonian NEMESIS identifies `Cakile edentula` as introduced on the Pacific coast, while Pacific foredune guidance from the Presidio highlights native dune species such as American dunegrass, beach strawberry, yellow sand verbena, and lupines.

For a kid-facing ecosystem game that is trying to keep this branch geographically coherent, that is too muddy. The safest fix is to replace `sea-rocket` with a better Pacific-native foredune/shared-edge species. The fallback is to keep it only if the game explicitly teaches it as an introduced plant rather than a default native dune representative.

### 2. `pickleweed` is still being taught and placed like tidepool content instead of salt-marsh content

File anchors:

- `src/content/biomes/beach.ts:41-49`
- `src/content/biomes/beach.ts:160-166`

`Salicornia pacifica` is a strong Pacific salt-marsh plant, but the live beach biome still puts it in the `tidepool` zone and tells the player it is often found near `marshes and tide pools`.

That wording and placement blur two different habitats. The NPS salt-marsh references support pickleweed in tidal marsh communities, not as a representative tidepool plant. If the game wants a tidepool-facing plant or landmark, this entry should move or be replaced. If the game wants to keep pickleweed, it should be reframed toward a marshy or estuary-edge role instead of tidepool content.

## Overall Assessment

The broader live biome set is in good shape.

I did not find a new science blocker in:

- the forest entries
- the treeline entries after the lichen-category fix
- the tundra entries
- the shared alpine entries

The two remaining accuracy issues are both on the Pacific coastal side, and both are fixable without redesigning the whole chain.

## Queue Outcome

- `ECO-20260328-critic-10` can close.
- Add one main-agent cleanup pass for the remaining Pacific coastal science mismatches.
