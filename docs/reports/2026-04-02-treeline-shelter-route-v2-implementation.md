# 2026-04-02 Treeline Shelter Route V2 Implementation

Implementation note for `ECO-20260402-main-152`.

## Outcome

`treeline-stone-shelter` now behaves like an ordered sheltered-treeline chapter instead of a loose three-clue inland checklist.

The pass stays inside the existing lane-4 seams:

- `field-requests.ts` keeps the route on `assemble-evidence`, but now enforces `bent-cover -> stone-break -> lee-life`
- `field-season-board.ts` teaches that same order on the inland route board
- the clue-backed filed note now resolves in the same sheltered order
- no new route type, save ledger, support row, or station shell was introduced

## What Changed

### Ordered treeline shelter progression

`treeline-stone-shelter` now uses ordered `slotOrder` so the outing starts with wind-bent shelter at `Krummholz Belt`, then moves into the lee-pocket ground, then finishes on the animal life using that shelter.

That means:

- `krummholz-spruce` must register before the later lee-pocket clues
- older partial saves still stay coherent through first-missing-slot guidance
- the filed note now resolves as `Krummholz Spruce, Frost-Heave Boulder, and Hoary Marmot...`

### Board copy and compact-copy cleanup

The inland route board now frames the family as one sheltered treeline pocket before the thaw edge:

- the route summary and next direction now teach bent cover first, then stone break, then lee life
- the active and logged `Treeline Shelter` beat text now reflects that same order
- the live `treeline-low-fell` request summary was trimmed back under the shared 96-character notebook budget so the route layer stays green in `content-quality`

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker"`
- `npx vitest run src/test/content-quality.test.ts`
- `npm run build`
