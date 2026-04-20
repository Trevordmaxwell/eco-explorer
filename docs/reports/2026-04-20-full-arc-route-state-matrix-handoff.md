# 2026-04-20 Full-Arc Route-State Matrix Handoff

Completed `ECO-20260420-scout-341` for packet `133`.

## Findings

- The live Route v2 notebook routes are `beach-shore-shelter`, `forest-hidden-hollow`, `forest-moisture-holders`, `coastal-shelter-shift`, `treeline-stone-shelter`, `tundra-short-season`, `scrub-edge-pattern`, `forest-cool-edge`, `treeline-low-fell`, `forest-expedition-upper-run`, and `treeline-high-pass`.
- Non-Route-v2 requests such as `forest-survey-slice`, `coastal-edge-moisture`, `tundra-survey-slice`, and `forest-season-threads` should appear only as handoff or post-filed states in this lane-4 pass.
- Existing coverage is useful but scattered across one-off `field-requests` cases and selected `runtime-smoke` paths. Packet `133` needs one compact deterministic matrix so future route edits have a single full-arc regression target.

## Recommended Main Pass

Keep this in `src/test/field-requests.test.ts`. Add a table-driven matrix helper that walks each live Route v2 route from active start to ready-to-file to filed handoff using deterministic contexts, not a long browser traversal.

The matrix should assert for each route:

- active route id, title, progress label, `routeV2.status`, `routeV2.selectedSupportId`, and empty or expected starting evidence
- clue progression through the expected slot ids and entry ids, including ordered-route gates where order matters
- final `ready-to-synthesize` result, ready notice title/text, `Ready To File` active state, and clue-backed filed text where the route has a `clueBackedTail`
- `fileReadyRouteV2FieldRequest()` clears `save.routeV2Progress`, records the route id, and hands off to the expected next request or settled filed state
- process or world-state variants stay live-only: `Wrack Shelter`, `Moist Hollow`, `Held Sand`, `Moist Edge`, `Thaw Window`, `Brief Bloom`, and `Rimed Pass` may change active title or allowed clue carriers, but ready/filed route identity remains canonical unless an existing display-prefix seam explicitly says otherwise

## Suggested Route Cases

- `beach-shore-shelter`: `dune-grass -> lee-cover -> wrack-line`, post-filed `forest-hidden-hollow`, plus active `wrack-hold` alternate `beach-hopper`
- `forest-hidden-hollow`: landmark `seep-stone`, post-filed `forest-moisture-holders`
- `forest-moisture-holders`: `shelter / ground / living`, post-filed `forest-survey-slice`, plus `moisture-hold` alternates `tree-lungwort` and `seep-moss-mat`
- `coastal-shelter-shift`: `open-bloom -> pine-cover -> edge-log`, post-filed `coastal-edge-moisture`
- `treeline-stone-shelter`: ordered `bent-cover -> stone-break -> lee-life`, post-filed `tundra-short-season`
- `tundra-short-season`: ordered `first-bloom -> wet-tuft -> brief-fruit`, post-filed `tundra-survey-slice`, plus `thaw-fringe` alternates `woolly-lousewort` and `bigelows-sedge`
- `scrub-edge-pattern`: `open-pioneer -> holding-cover -> thicker-edge`, post-filed `forest-cool-edge`, plus `sand-capture` alternate `beach-grass`
- `forest-cool-edge`: `edge-carrier / cool-floor / wet-shade`, post-filed `treeline-low-fell`, plus active title `Moist Edge`
- `treeline-low-fell`: ordered `last-tree-shape -> low-wood -> fell-bloom -> low-rest`, post-filed `forest-expedition-upper-run`, plus peak-phase alternate `moss-campion`
- `forest-expedition-upper-run`: ordered `seep-mark -> stone-pocket -> root-held -> high-run`, post-filed `forest-season-threads`
- `treeline-high-pass`: ordered `stone-lift -> lee-watch -> rime-mark -> talus-hold`, post-filed no active request, plus `frost-rime` alternate `reindeer-lichen`

## Non-Goals

- Do not add a new route framework, station page, browser automation flow, committed screenshots, save schema, science copy, broad onboarding copy, or geometry.
- Do not duplicate lane-1 debug save snapshots or lane-3 screenshot proof.
- Do not make exact player-facing copy assertions beyond existing route note/notice strings needed to prove canonical ready/filed identity.

## Verification

- Baseline `npm test -- src/test/field-requests.test.ts` passed before handoff.
- Main should run `npm test -- src/test/field-requests.test.ts`, `npm run validate:agents`, and `git diff --check`; run `npm run build` only if runtime TypeScript changes.
