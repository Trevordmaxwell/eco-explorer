# 2026-03-31 Root Hollow Legacy Normalization Handoff

Handoff for `ECO-20260331-main-04`.

## Scope

Normalize older in-progress `ROOT HOLLOW` saves so the new four-leg chapter stays truthful on `main`.

## What Landed

- Save normalization now recognizes legacy `forest-expedition-upper-run` progress that predates the `stone-pocket` middle leg.
- When an older save already reached `root-held` or `high-run` without a `stone-pocket` slot, normalization injects one compatibility `stone-pocket` step so the loaded save matches the live four-leg chapter shape instead of showing false copy.
- Legacy notebook-ready saves now load back into a truthful four-slot ready state instead of filing as if the new leg never existed.

## Verification

- `npx vitest run src/test/save.test.ts src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npm run build`

## Review Focus

- Do older in-progress `ROOT HOLLOW` saves now recover cleanly through both the active request and station surfaces?
- Does the normalization stay narrow to the legacy expedition seam instead of becoming a broader Route v2 migration system?
- Is the compatibility fill still compact and pre-playthrough appropriate?
