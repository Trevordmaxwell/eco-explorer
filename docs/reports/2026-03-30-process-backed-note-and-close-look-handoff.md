# 2026-03-30 Process-Backed Note And Close-Look Handoff

Prepared for `ECO-20260330-scout-67` in lane 2.

## Scope Reviewed

- `src/content/biomes/forest.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/engine/close-look.ts`
- `src/engine/habitat-process.ts`
- `src/engine/observation-prompts.ts`
- `src/test/close-look.test.ts`
- `src/test/habitat-process.test.ts`
- `src/test/observation-prompts.test.ts`
- `docs/content-authoring.md`
- `docs/science-source-ledger.md`

## Current Read

- The live process layer is strongest as a visual seam, not a notebook seam. Coastal scrub and forest already have enough nearby note and prompt support to feel intentional.
- Treeline and tundra are now the thinner pair: both have real process carriers in the world, but they do not yet have one compact note-and-close-look follow-on that turns those carriers into a stronger remembered teaching beat.
- The close-look allowlist is still weighted toward shells, cones, lichens, and flowers. It does not yet include one visual-first alpine landmark or one clear tundra process carrier from the newer inland content wave.
- `ObservationPromptSeed` has day-part and weather filters, but no phenology filter. Truly phase-specific prompt growth would need engine work and would push `main-101` outside lane 2's preferred content-owned scope.

## Recommendation

Treat `main-101` as one alpine-only process-teaching pass.

### 1. Add one treeline process note

Use the live freeze-thaw and rime carriers, not another animal-shelter card.

Best trio:

- `frost-heave-boulder`
- `dwarf-birch`
- `reindeer-lichen`

What it should teach:

- cold ground and freeze-thaw keep shaping the treeline fell
- low shrubs and lichens still hold on where the ground stays exposed

Suggested shape:

- one new note with `minimumDiscoveries: 2`
- no new shared-species comparison work
- zone can stay broad or be omitted if the note wants to bridge `dwarf-shrub` and `lichen-fell`

### 2. Add one tundra thaw-edge note

Use the current thaw-band carriers that already power the live `thaw-fringe` process moment.

Best trio:

- `arctic-willow`
- `purple-saxifrage`
- `cottongrass`

What it should teach:

- the thaw edge is a short wet band, not a whole new habitat
- low shrubs, bloom mats, and fluffy seed heads all mark that brief opening differently

Suggested shape:

- one new note in `thaw-skirt`
- `minimumDiscoveries: 2`
- keep the text about thaw-edge structure and wet ground, not broader summer abundance

### 3. Add two visual-first close-look entries

The strongest compact pair is:

- `frost-heave-boulder`
- `cottongrass`

Why this pair:

- both are visually distinct at enlarged scale
- both directly support the new process-backed note wave
- neither requires a new overlay pattern or broader journal restructuring

Suggested callout direction:

- `frost-heave-boulder`: lifted edge, cold-worked ground
- `cottongrass`: white tuft, wet stem base

## What To Avoid In `main-101`

- Do not reopen forest microhabitat density. Packet `037` still owns the next deeper old-growth and cave content wave.
- Do not add new observation prompt seeds in this pass. Without phenology gating, process-specific prompt copy would either be inaccurate or would require engine work.
- Do not widen shared-species comparison again here. If the new tundra note later makes `lingonberry` comparison more plausible, leave that for a later payoff pass instead of folding it into this one.
- Do not add more than two new close-look entries.

## Suggested File Shape

- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/engine/close-look.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/close-look.test.ts`
- `src/test/content-quality.test.ts`
- optionally one focused journal or runtime assertion only if needed to protect unlock or readability behavior

## Acceptance Focus For `main-101`

- treeline and tundra gain one stronger process-teaching note each
- the new close-look entries stay visual-first and compact
- the pass remains content-owned and does not drift into prompt-system or comparison-system expansion

## Verification Guidance

At minimum:

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/close-look.test.ts src/test/content-quality.test.ts`
- `npm run build`
- if the main agent takes browser captures, prefer one treeline note state and one tundra close-look state over a wide multi-biome sweep
