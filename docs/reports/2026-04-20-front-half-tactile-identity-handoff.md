# Front-Half Tactile Identity Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-360`
Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
Lane: `lane-3`

## Scout Read

Packet `138` has already been strengthened by the other lanes: lane 1 added the `front-half-open-to-shelter` debug snapshot, lane 2 tightened the `shelter-builds-here` back-dune note, and lane 4 route-proofed `Open To Shelter` support behavior. The remaining lane-3 gap is physical: the beach-to-scrub corridor has a held back-dune shelf, but the live Coastal Scrub biome's opening `back-dune` band still has no authored starter shelf or deterministic plant carrier before the player reaches the larger windbreak/swale traversal family.

The safest next chunk is a tiny optional opening shelter beat inside `src/content/biomes/coastal-scrub.ts`. It should read as "the sand starts holding life here" through existing drift-platform language and existing back-dune species, not as a new route, system, or notebook surface.

## Recommended Main Chunk

Add one small authored back-dune starter shelf/hold in the Coastal Scrub biome, using existing tile and species ids.

Recommended files:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- `docs/reports/2026-04-20-front-half-tactile-identity-implementation.md`
- ignored browser proof under `output/lane-3-main-360-browser/` if runtime geometry changes land

Suggested shape:

- Add two very small authored platforms in the `back-dune` zone, around `x=76..136`, using existing `drift-platform` art.
- Name them so future agents can find the beat, for example `back-dune-shelter-lip` and `back-dune-shelter-rest`.
- Keep the hop shallow and optional; do not create a gate or a new vertical route.
- Add at most two authored stable carriers near the shelf, preferably existing `beach-grass` and `sand-verbena`, so the `Open To Shelter` opening has a deterministic tactile cluster without relying only on spawn luck.

## Acceptance

- `coastal-scrub-biome.test.ts` proves the new authored shelf stays inside the `back-dune` zone and before `shrub-thicket`.
- The test proves the rest platform is reachable-looking from the lip with existing low-hop spacing and does not overlap the later `windbreak-*` platform family.
- If authored carriers are added, the test pins their entry ids and positions near the shelf while keeping them inside the back-dune zone.
- The implementation does not touch route definitions, field-request support behavior, station pages, save schema, science copy, world-map behavior, corridor geometry, player physics, or new UI.
- If the main step changes live geometry, capture one browser proof from the Coastal Scrub opening under ignored `output/lane-3-main-360-browser/`, with matching state JSON and no console/page errors.

## Baseline Verification

Passed before this handoff:

- `npm test -- --run src/test/coastal-scrub-biome.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter|front-half-open-to-shelter|held back-dune shelf"`
- `npm test -- --run src/test/corridor.test.ts -t "back-dune shelf"`

## Main Verification

Recommended for `ECO-20260420-main-360`:

- `npm test -- --run src/test/coastal-scrub-biome.test.ts`
- focused `runtime-smoke` slice if runtime expectations are touched
- `npm run build`
- browser proof if geometry changes land
- `npm run validate:agents`
- `git diff --check`
