# 2026-04-02 High-Country Route V2 Implementation

Implementation note for `ECO-20260402-main-160`.

## Outcome

`tundra-short-season` now behaves like an ordered thaw-window chapter instead of a loose three-clue middle beat.

The pass stayed inside the current lane-4 seams:

- `field-requests.ts` keeps `Short Season` on `assemble-evidence`, but now enforces `first-bloom -> wet-tuft -> brief-fruit`
- `field-season-board.ts` teaches that same thaw-window order on the inland route board
- the route keeps the current slot family and notebook-return flow, so no save normalization or shell growth was needed

## What Changed

### Ordered Short Season progression

`tundra-short-season` now uses ordered slot progression so the outing starts on first bloom, drops into the thaw-skirt middle for wet tuft, and only then resolves the brief-fruit finish.

That means:

- the route now teaches a real high-country sequence instead of another generic clue trio
- older in-progress saves still recover through first-missing-slot guidance because the slot ids stayed the same
- the filed note now reads in the same authored order as the live route

### Stronger high-country board framing

The inland board now treats `Short Season` like the middle chapter between treeline shelter and survey finish:

- the active beat detail now points through `Snow Meadow -> Thaw Skirt -> brief-fruit return`
- the logged beat detail now reads like one short thaw-window run
- the inland route summary and next direction now stage the tundra leg more deliberately instead of using generic clue language

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to treeline and can hand the outing guide to route marker|switches the route board to tundra and can hand the outing guide to route marker"`
- `npm run build`
