# Treeline Stone Shelter Copy Implementation

Created: 2026-04-20

Queue item: `ECO-20260420-main-367`
Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
Lane: `lane-2`

## Change

Refreshed the existing Treeline Pass `stone-shelter` ecosystem note so the shelter/exposure relationship reads more clearly below High Pass without adding content breadth.

Updated summary:

`Bent krummholz and raised stone break wind into lee pockets animals can use.`

Updated prompt:

`Where do stone and bent wood make a lee pocket?`

The note keeps the same `id`, `title`, `entryIds`, `minimumDiscoveries`, and `zoneId`, so the unlock path remains stable.

## Scope Check

- Changed `src/content/biomes/treeline.ts` only for the existing `stone-shelter` summary and observation prompt.
- Added focused resolver coverage in `src/test/ecosystem-notes.test.ts` for the refreshed tactile copy.
- Did not edit `src/engine/field-requests.ts`, Route v2 behavior, station/state/save behavior, world-map focus, Treeline geometry, High Pass copy, science-ledger rows, close-look cards, new species, or comparison branches.
- `rg` for the old summary and prompt found only the scout handoff's documented "Current copy" section, not stale source or test expectations.

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts` passed.
- `npm run build` passed.
- `npm run validate:agents` passed with the known queue-size warning only.
- `git diff --check` passed.
- Copy budget check: summary is 76 characters and prompt is 47 characters.
