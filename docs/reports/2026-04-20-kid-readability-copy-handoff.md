# 2026-04-20 Kid Readability Copy Handoff

Prepared for `ECO-20260420-scout-395` in lane 2.

## Scope Reviewed

- `.agents/packets/147-kid-readability-and-input-accessibility.json`
- `docs/reports/2026-04-20-alpha-runway-megapush.md`
- `docs/reports/2026-04-20-first-session-onboarding-copy-handoff.md`
- `docs/reports/2026-04-20-first-session-onboarding-copy-implementation.md`
- `docs/reports/2026-04-20-filed-note-synthesis-matrix-handoff.md`
- `src/engine/field-requests.ts`
- `src/test/content-quality.test.ts`
- `src/test/field-requests.test.ts`

## Current Read

- First-session copy has already been tightened around `J`, `M`, `Enter`, and `Shore Shelter`, so packet `147` should not reopen title/menu/tutorial copy in lane 2.
- Route filed-note budgets and relationship anchors are already guarded in `content-quality`.
- The remaining kid-readability gap is in active field-request summaries that expose internal evidence-slot ids directly, such as `stone-lift`, `last-tree-shape`, `seep-mark`, and `talus-hold`.
- Those hyphenated tokens are useful developer identifiers, but player-facing summaries should read like plain clue phrases.

## Recommendation

Treat `main-395` as one copy-only field-request summary cleanup.

## Exact Target

Update only `summary` strings in `src/engine/field-requests.ts` where the text currently includes an exact `evidenceSlots[].id` token.

Recommended summaries to rewrite:

- `treeline-stone-shelter`
- `tundra-short-season`
- `scrub-edge-pattern`
- `forest-cool-edge`
- `treeline-low-fell`
- `forest-expedition-upper-run`
- `treeline-high-pass`

The rewrite should keep the same route meaning and order, but swap slug-like ids for spaced phrases:

- `stone-lift` -> `stone lift`
- `last-tree-shape` -> `last tree shape`
- `seep-mark` -> `seep mark`

## Guardrail Test

Add one focused content-quality guard:

- for every Route v2 definition with `evidenceSlots`, assert `request.summary` does not contain any exact `slot.id`

This allows normal hyphenated English such as `coast-to-forest` to remain, while blocking developer-slot ids from leaking into player-facing summaries.

## File Targets

- `src/engine/field-requests.ts`
- `src/test/content-quality.test.ts`
- `src/test/field-requests.test.ts`
- `docs/reports/2026-04-20-kid-readability-copy-implementation.md`

## Non-Goals

- Do not change evidence slot ids, slot order, entry ids, route behavior, support behavior, station behavior, world-map behavior, save schema, geometry, menu/input behavior, or filed-note synthesis.
- Do not rewrite `label` fields unless a test proves those labels are directly player-facing in the current UI.
- Do not broaden this into a full content prose rewrite or science simplification pass.

## Suggested Verification

- `npm test -- --run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "field-request|route|summary|content quality"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Queue Guidance

- Move `ECO-20260420-scout-395` to Done.
- Promote `ECO-20260420-main-395` to Ready.
- Keep `ECO-20260420-critic-395` blocked until implementation lands.
