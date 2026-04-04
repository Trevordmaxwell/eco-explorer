# 2026-04-04 Route Notice Descriptor Implementation

Implemented `ECO-20260404-main-254` against packet `104`.

## What Changed

Kept the notice side-effect boundary in `src/engine/game.ts`, but moved the pure descriptor work into a new helper seam.

- Added `src/engine/field-notices.ts` with:
  - `FieldNoticeDescriptor`
  - `FieldNoticeVariant`
  - `resolveRecordedFieldRequestNotice(...)`
  - `createNotebookReadyFieldNotice(...)`
- Updated `src/engine/game.ts` so:
  - `showFieldRequestNotice()` now delegates recorded notice title, text, and variant derivation to the new helper
  - `maybeCompleteActiveFieldRequest()` now delegates notebook-ready fallback copy and variant derivation to the same helper family
- Added `src/test/field-notices.test.ts` to lock the new pure seam down directly.

## Why This Shape

This buys down `game.ts` concentration without widening the split into guided notice timing or filing logic.

- route-backed versus generic recorded notice styling now lives in one pure place
- notebook-ready fallback copy no longer sits inline in the controller
- timer mutation, enqueue order, field-partner quieting, and save writes stay exactly where the packet asked them to stay

## Verification

- `npx vitest run src/test/field-notices.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the beach start into a notebook-ready Shore Shelter outing and files it at the station|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|keeps Forest Survey on the default recorded notice style"`
- `npm run build`
- shared web-game client smoke in `output/lane-1-main-254-client/`
- Playwright page load plus console recheck at `http://127.0.0.1:4177` with 0 errors
