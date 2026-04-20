# 2026-04-20 Lane 4 Alpha Playthrough Checklist Handoff

Completed `ECO-20260420-scout-329` for packet `130`.

## Finding

The route loop itself is in good shape after packet `129`: `runtime-smoke.test.ts` now files `High Pass` from the live talus-hold path and verifies the filed notice, cleared active request, cleared route marker/replay label, and cleared journal request. The remaining preflight gap is not another route rule. It is a reviewer-facing route checklist that maps the current alpha spine into one source-of-truth playthrough contract before the longer alpha runway begins.

## Main Scope

Implement a lane-4 documentation pass that creates a full alpha route playthrough checklist from the first beach outing through filed `High Pass`.

Recommended file:

- `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md`

Recommended checklist spine:

- `beach-shore-shelter` / `Shore Shelter`: Sunny Beach `dune-grass -> lee-cover -> wrack-line`, then station filing.
- `forest-hidden-hollow` / `Hidden Hollow`: Root Hollow seep-stone confirmation, then station filing.
- `forest-moisture-holders` / `Moisture Holders`: shelter, ground, and living clues, then station filing.
- `forest-survey-slice` / `Forest Survey`: Forest Trail reaches surveyed state.
- station return: `Trail Stride` / next-habitat transition into the coast-to-forest chapter.
- `coastal-shelter-shift` / `Open To Shelter`: `open-bloom -> pine-cover -> edge-log`, then station filing.
- `coastal-edge-moisture` / `Edge Moisture`: two cooler forest-edge moisture clues.
- `treeline-stone-shelter` / `Stone Shelter`: `bent-cover -> stone-break -> lee-life`, then station filing.
- `tundra-short-season` / `Thaw Window`: `first-bloom -> wet-tuft -> brief-fruit`, including active-window alternates, then station filing.
- `tundra-survey-slice` / `Tundra Survey` / `Bright Survey`: Tundra Reach reaches surveyed state.
- `scrub-edge-pattern` / `Scrub Pattern` / `Held Sand`: `open-pioneer -> holding-cover -> thicker-edge`, including the Held Sand active-window alternate, then station filing.
- `forest-cool-edge` / `Cool Edge` / `Moist Edge`: `edge-carrier -> cool-floor -> wet-shade`, then station filing.
- `treeline-low-fell` / `Low Fell` / `Brief Bloom`: `last-tree-shape -> low-wood -> fell-bloom -> low-rest`, then station filing.
- `forest-expedition-upper-run` / `Root Hollow`: `seep-mark -> stone-pocket -> root-held -> high-run`, then station filing.
- `forest-season-threads` / `Season Threads`: floor cover, edge growth, and canopy-life link; return for calm season close.
- `treeline-high-pass` / `High Pass` / `Rimed Pass`: `stone-lift -> lee-watch -> rime-mark -> talus-hold`, then station filing and filed-state cleanup.

For each row, the main checklist should record:

- public title and route id
- biome and route type
- required player-facing proof state: active, ready-to-file, filed, replay/active-window label, or cleared post-filed state
- support or route-state wrinkle worth checking, especially `hand-lens`, `note-tabs`, `place-tab`, and `route-marker`
- existing automated proof, if known
- proof gap, if the behavior currently relies on scattered seeded tests or a manual reviewer pass

## Route-State Proof Gaps To Name

- No single human-readable checklist currently tells a reviewer how to progress from fresh save to filed `High Pass`.
- Existing runtime coverage is strong but scattered: first-session guidance, support choice, live route shelves, season close, and final `High Pass` filing live in separate test slices.
- Packet `131` should own instrumentation assertions and save snapshots; packet `130` should only name the expected route-state states and gaps.
- Packet `133` should own the deterministic route-state progression matrix; packet `130` should not add that full matrix or rewrite tests early.
- If the checklist reveals a real missing proof, record it as a narrow later packet follow-up instead of widening `main-329`.

## Acceptance For Main

- Adds `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md`.
- Covers the full route spine from `Shore Shelter` through filed `High Pass`.
- Separates currently proven states from proof gaps without opening new route behavior.
- Explicitly defers instrumentation/snapshot work to packet `131` and deterministic smoke-matrix work to packet `133`.
- Does not edit route runtime, station UI, broad copy, geometry, or support systems.

## Verification

- `npm run validate:agents`
