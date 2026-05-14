# Atlas Parity And Source-Risk Contract

Date: 2026-05-14
Role: scout-agent
Lane: lane-2
Queue: `ECO-20260514-scout-02`
Packet: `.agents/packets/192-director-playability-sprint.json`

## Recommendation

Promote `ECO-20260514-main-02` as a content-only sketchbook archive parity pass. Do not touch the station atlas strip, route board, world map, save schema, overlay layout, or route catalog semantics.

The current `FIELD ATLAS` strip is still too tight for visible expansion. The better payoff is to make a few route-defining discoveries read like remembered field notes when the player places them in the existing sketchbook.

## Target Set

Add authored `sketchbookNote` lines only for these entries:

| Entry | Why This Entry | Source Risk |
| --- | --- | --- |
| `licorice-fern` | `Moisture Holders` shelter evidence; currently falls back to its fact copy in sketchbook. | Low. Ledger `Verified`; keep wording to damp bark/log/rock surfaces. |
| `banana-slug` | `Moisture Holders` living evidence and `Root Hollow` stone-pocket evidence. | Low. Ledger `Verified`; keep moisture/decomposer wording. |
| `fir-cone` | `Root Hollow` high-run evidence and an existing close-look entry without a sketchbook line. | Low. Ledger `Verified`; keep cone-scale/seed wording. |
| `hoary-marmot` | Repeated route memory anchor for `Stone Shelter`, `High Pass`, and Source Shelter lee-watch slots. | Low. Ledger `Verified`; keep rocky shelter/watch wording. |
| `purple-saxifrage` | `Short Season` first-bloom evidence and existing close-look entry without a sketchbook line. | Medium. Ledger `Watch`; use cautious wording like `near thawing snow`, not exact bloom guarantees. |
| `cloudberry` | `Short Season` brief-fruit evidence; currently falls back to fact copy. | Low. Ledger `Verified`; keep short-summer berry timing broad. |
| `coyote-brush` | `Dune Catch` swale-hold alternate and coastal scrub habitat anchor. | Low. Ledger `Verified`; keep wording to dense coastal scrub / open sand to brush transition. |

Suggested copy can vary, but stay at one sentence and `<= 56` characters. Avoid new causal claims. Good shapes:

- `licorice-fern`: `Fern fronds gripping damp bark and old wood.`
- `banana-slug`: `Soft slug life working through the wet hollow.`
- `fir-cone`: `Cone scales holding seeds above the hollow.`
- `hoary-marmot`: `Rocky lookout watching the lee shelter.`
- `purple-saxifrage`: `Early bloom tucked near thawing snow.`
- `cloudberry`: `Amber fruit marking the short bright season.`
- `coyote-brush`: `Dense brush where open sand turns scrub.`

## Implementation Scope

Allowed files:

- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/test/content-quality.test.ts`
- optionally `src/test/sketchbook.test.ts` if the implementer wants a direct sketchbook fallback regression

Recommended test guard:

- Add a small `SKETCHBOOK_ARCHIVE_PARITY_MARKERS` list in `content-quality.test.ts`.
- Assert each listed entry has a `sketchbookNote`.
- Let the existing sketchbook note budget test keep the one-sentence and length guard.

## Explicit Exclusions

- No atlas/station layout changes.
- No new archive panel or journal surface.
- No route ids, route evidence ids, filed text, support behavior, world-map target, save field, progression rule, or route-board copy changes.
- No broad content pack or new inspectables.
- No source-ledger churn unless a chosen line changes the meaning of a claim.

## Follow-On Close-Look Candidate

For the parked `ECO-20260514-main-03` step, the best single candidate is `coyote-brush` if the team still wants one close-look payoff after the sketchbook pass.

Why:

- it is `Verified` in the source ledger
- it strengthens the Source to Shore / Dune Catch swale-hold memory without touching route behavior
- it gives Coastal Scrub one more visual habitat-structure payoff while staying inside the existing close-look seam

Suggested close-look seed:

- callouts: `dense twigs`, `coastal brush`
- sentence: `Dense coyote brush helps mark where open dunes turn into thicker coastal scrub.`
- sprite scale: `5`

If `main-02` already provides enough payoff, `main-03` can remain narrow by documenting that no close-look addition is needed.

## Verification

Scout baseline:

- `npm run science:check` passed (`2` files, `42` tests).

Expected implementation checks:

- `npm run science:check`
- `npm test -- --run src/test/sketchbook.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
