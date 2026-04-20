# Forest Root Shelter Copy Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-363`
Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
Lane: `lane-2`

## Recommendation

Use the existing forest ecosystem note `root-held-shelter` as the lane-2 forest tactile identity pass.

This note is already scoped to Root Hollow / filtered-return content and unlocks from `root-curtain`, `licorice-fern`, and `tree-lungwort`. It is the best small seam for packet `139` because it can make the forest middle feel more tactile through roots, shade, damp shelter, and seep-floor layering without adding new species, new routes, new geometry, or wider notebook surfaces.

## Proposed Copy

Current summary:

`Hanging roots and bark can keep damp shelter above the seep floor.`

Recommended summary:

`Root curtains catch drips and shade, keeping damp shelter above the seep floor.`

Current prompt:

`What here keeps moisture above the seep floor?`

Recommended prompt:

`Where do roots keep damp shelter above the seep?`

## Implementation Scope

- Update only the `root-held-shelter` ecosystem note in `src/content/biomes/forest.ts`.
- Preserve the existing note `id`, `title`, `entryIds`, `minimumDiscoveries`, and `zoneId`.
- Add focused resolver coverage in `src/test/ecosystem-notes.test.ts` asserting the refreshed note still unlocks from `root-curtain` plus an off-ground bark/lichen clue and contains the new tactile copy.
- Run `rg` for the old summary/prompt and update only exact stale test expectations if any appear.

## Guardrails

- Do not add a new forest note, route, observation prompt, science-ledger row, close-look entry, species, station surface, save state, or geometry beat for this pass.
- Keep the summary under the existing 110-character ecosystem-note budget and the prompt under the 52-character prompt budget.
- Keep the relationship science-safe: roots can intercept drips, hold soil/organic matter, and create shaded damp microhabitats near seep walls, but the copy should not imply roots create groundwater or permanent habitat guarantees.
- Avoid touching lane-1 station/progression files, lane-3 spatial bands/rendering, and lane-4 route controller/request behavior.

## Verification Target

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run validate:agents`
- `git diff --check`
