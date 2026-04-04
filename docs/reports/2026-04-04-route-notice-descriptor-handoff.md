# 2026-04-04 Route Notice Descriptor Handoff

Prepared `ECO-20260404-scout-254` against packet `104`.

## Recommendation

The next safe extraction should target the pure field-notice descriptor seam inside `src/engine/game.ts`, not the whole guided-notice family.

Recommended implementation target for `ECO-20260404-main-254`:

- extract one small helper module such as `src/engine/field-notices.ts`
- move only the copy, title, and variant derivation for filed-route and notebook-ready notices into that helper
- keep `showFieldNotice()` and every notice timer, ordering, and save mutation inside `src/engine/game.ts`

## Why This Seam First

This is the smallest high-value split still sitting in the lane-1 controller surface.

- `showFieldRequestNotice()` currently mixes the side-effect boundary with pure derivation for route-backed versus generic recorded notices.
- `maybeCompleteActiveFieldRequest()` still hardcodes the notebook-ready notice payload inline even though it belongs to the same family of compact completion feedback.
- This exact seam already had one regression: `filed-route` styling leaked onto non-route recorded notices until the variant logic was narrowed again.
- Pulling just the descriptor logic out of `game.ts` reduces coordinator concentration without reopening guided prompt timing, replay timing, or field-station filing side effects.

## Scope For Main-254

Keep `main-254` narrow and behavior-preserving.

Move:

- filed-route recorded notice title, text, and variant derivation
- notebook-ready notice title, text, and variant derivation
- any tiny notice payload type needed to return those values cleanly

Keep in `game.ts`:

- `showFieldNotice()`
- notice timer mutation
- field-partner quieting
- enqueue order and existing call sites
- `persistSave(save)` and completed-request recording
- capstone and season-close special cases
- the `maybeShow*Notice` guided prompt family

## Suggested Shape

One safe shape is:

- `src/engine/field-notices.ts`
- export a small `FieldNoticeDescriptor` type
- export narrow helpers such as:
  - `resolveRecordedFieldRequestNotice(...)`
  - `createNotebookReadyFieldNotice(...)`

That keeps the module focused on copy and variant resolution, instead of drifting into timer or gameplay orchestration.

## Verification For Main-254

Keep verification focused on unchanged notice behavior.

- `npx vitest run src/test/runtime-smoke.test.ts -t "turns the beach start into a notebook-ready Shore Shelter outing and files it at the station|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station|keeps Forest Survey on the default recorded notice style"`
- `npm run build`
- the shared web-game client smoke
- one lightweight browser proof or console recheck after a seeded notice flow

## Follow-On Note

If this lands cleanly, `scout-255` should stay on the original packet plan and pick one `field-season-board.ts` composition seam next. The guided notice wrappers can wait until a later controller-protection wave, because they still interleave more timing and priority rules than this narrower descriptor split.
