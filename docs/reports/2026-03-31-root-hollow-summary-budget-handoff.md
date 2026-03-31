# 2026-03-31 Root Hollow Summary Budget Handoff

Handoff for `ECO-20260331-main-06`.

## Scope

Trim the live `ROOT HOLLOW` field-request summary back under the shared compact notebook budget on `main`.

## What Landed

- Shortened the `forest-expedition-upper-run` summary in `src/engine/field-requests.ts` from the over-budget 101-character version to a 94-character one-sentence line.
- The live request still names all four chapter clues in order: `seep-mark`, `stone-pocket`, `root-held`, and `high-run`.
- No Route v2 structure, save logic, or station copy changed; this is a copy-only cleanup.

## Verification

- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts`
- `npm run build`

## Review Focus

- Does the shorter summary still read truthfully as the four-leg `ROOT HOLLOW` chapter?
- Is the shared compact-copy guardrail now green again on `main`?
- Did the follow-up stay copy-only and lane-4 scoped?
