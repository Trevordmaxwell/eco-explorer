# Treeline Stone Shelter Copy Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-367`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-2`

## Recommendation

Use the existing Treeline Pass ecosystem note `stone-shelter` as the lane-2 shelter/exposure refresh.

This note already unlocks from `frost-heave-boulder`, `hoary-marmot`, and `krummholz-spruce`, and it sits on the Treeline Pass shelter seam without touching the Route v2 request. It is the right small content seam for packet `140` because it can make treeline identity clearer through bent wood, raised stone, wind break, and lee pocket language.

## Proposed Copy

Current summary:

`Near treeline, bent wood and raised stone make calmer pockets that animals can also use.`

Recommended summary:

`Bent krummholz and raised stone break wind into lee pockets animals can use.`

Current prompt:

`What here breaks the wind first?`

Recommended prompt:

`Where do stone and bent wood make a lee pocket?`

## Implementation Scope

- Update only the `stone-shelter` ecosystem note in `src/content/biomes/treeline.ts`.
- Preserve the existing note `id`, `title`, `entryIds`, `minimumDiscoveries`, and `zoneId`.
- Add focused resolver coverage in `src/test/ecosystem-notes.test.ts` asserting the refreshed note still unlocks through the shelter pair and contains the new tactile copy.
- Run `rg` for the old summary/prompt and update only exact stale expectations if any appear.

## Guardrails

- Do not touch `src/engine/field-requests.ts`, Route v2 state, station behavior, save/schema behavior, world-map focus, Treeline geometry, High Pass copy, or the science ledger for this pass.
- Keep the summary under the 110-character ecosystem-note budget and the prompt under the 52-character prompt budget.
- Keep the science claim broad and source-backed: wind-shaped krummholz and stones can break wind and make lee/shelter pockets, while marmots can use rocky shelter.
- Do not create a new Treeline note, new species, new close-look card, or new comparison branch.

## Verification Target

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run validate:agents`
- `git diff --check`
