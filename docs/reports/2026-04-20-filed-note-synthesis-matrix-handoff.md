# Filed-Note Synthesis Matrix Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-339`

## Scope

Prepare lane 2 for packet `133` by turning the completed alpha arc's filed-note copy into a deterministic content guardrail. This should stay test-first and content-facing: no route progression changes, station behavior, geometry, save migration, or new player-facing surfaces.

## Existing Seams

- `src/engine/field-requests.ts` already centralizes Route v2 filed-note copy in each `routeV2Note`.
- `resolveRouteV2FiledNoteText(...)` builds the final filed sentence from saved evidence when a route is `ready-to-synthesize`, then falls back to authored `filedText` when evidence is missing or invalid.
- `resolveRouteV2FiledDisplayText(...)` is the display-only seam for route page / recorded notice copy; the current live display prefix is `Thaw Window.` on `tundra-short-season`.
- `src/test/field-requests.test.ts` already covers several exact filed-note cases and process-reframed stability cases, but the assertions are scattered by feature history rather than one full-arc content matrix.
- `src/test/content-quality.test.ts` already owns compact copy budgets for field-request titles and summaries, but it does not yet protect `routeV2Note.readyText`, `filedText`, `clueBackedTail`, or display-prefix copy.

## Recommended Main Chunk

Add a lane-2 test-only smoke matrix that checks every live Route v2 filed-note route in the completed alpha arc:

- `beach-shore-shelter`
- `forest-hidden-hollow`
- `forest-moisture-holders`
- `coastal-shelter-shift`
- `treeline-stone-shelter`
- `tundra-short-season`
- `scrub-edge-pattern`
- `forest-cool-edge`
- `treeline-low-fell`
- `forest-expedition-upper-run`
- `treeline-high-pass`

Recommended files:

- `src/test/content-quality.test.ts`
- `src/test/field-requests.test.ts`
- `docs/reports/2026-04-20-filed-note-synthesis-matrix-implementation.md`

## Test Shape

In `content-quality.test.ts`, add a compact route-note quality test that:

- filters `FIELD_REQUEST_DEFINITIONS` to definitions with `routeV2Note`
- asserts the exact route-note ids above are present and no unexpected Route v2 note ids have appeared silently
- keeps `readyText`, `filedText`, optional `clueBackedTail`, and optional `displayPrefix` under explicit handheld budgets
- asserts filed-note copy remains one sentence, with display-prefix text allowed to be a short stamp plus one sentence
- checks each route keeps at least one relationship anchor such as `shelter`, `moisture`, `transition`, `thaw`, `open fell`, `hollow return`, or `exposed High Pass`

In `field-requests.test.ts`, prefer one table-driven resolved-note matrix rather than more one-off tests. It should seed `routeV2Progress` for the 11 routes above and assert:

- `resolveRouteV2FiledNoteText(...)` stays under a generated-note budget; current resolved High Pass is the longest at about 140 characters, so use a tight-but-current-safe ceiling such as `144`
- `resolveRouteV2FiledDisplayText(...)` stays under the same ceiling unless a future display prefix requires a consciously raised budget
- the resolved sentence still contains the intended ecology relationship anchor for that arc segment
- display-only prefixes do not rename the saved filed identity; for now only `tundra-short-season` should emit `Thaw Window.` through the display seam

## Non-Goals

- Do not change route state, support behavior, station filing, map travel, save schema, or route-controller code.
- Do not add new discoveries, facts, route objectives, or ecosystem-note prose.
- Do not duplicate lane 4's route-state progression matrix or lane 1's save snapshot work.
- Do not reduce science specificity just to shorten strings unless a test exposes an actual budget failure.

## Verification

- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "route|filed|content quality|synthesis"`
- `npm run build` if TypeScript test edits require the broader compiler check
- `npm run validate:agents`
- `git diff --check`
