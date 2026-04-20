# Filed Arc Epilogue State Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-354`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-1`

## Scout Read

Packet `137` asks lane 1 to make the post-filed `High Pass` state read as complete while still allowing a calm revisit invitation. The runtime behavior is already mostly correct: filed `High Pass` suppresses the active outing locator, world-map route marker, route replay label, and journal field request. The remaining systems gap is that the filed-state language is repeated inline in `src/engine/high-pass-chapter-state.ts` and partially mirrored by an exact-text special case in `src/engine/field-season-wrap.ts`.

The main pass should not add a new station page, replay UI, save field, route task, or season-three promise. The smallest useful seam is a compact filed-arc copy resolver that names the existing meanings explicitly while preserving the exact player-facing strings.

## Recommended Main Chunk

Add a small exported helper in `src/engine/high-pass-chapter-state.ts`, such as `resolveHighPassFiledArcCopy(locationLabel)`, with a typed return shape that separates these buckets:

- filed location: `High Pass filed from Treeline Pass.`
- complete arc: `High Pass filed. This field arc is complete.`
- optional revisit: `Current field arc filed. Revisit when you want a quiet pass.`
- filed expedition subtitle: `High Pass is filed for this field arc.`
- composed notice: `High Pass filed from Treeline Pass. Current field arc filed. Revisit when you want a quiet pass.`

Use that helper only to populate the existing filed `HighPassChapterState` fields. If `src/engine/field-season-wrap.ts` is touched, keep it tiny and avoid changing the current archive-subtitle behavior; the exact filed subtitle may stay in the helper and be covered by tests instead of forcing a broader wrap-state redesign.

## Suggested Files

- `src/engine/high-pass-chapter-state.ts`
- `src/engine/field-season-wrap.ts` only if needed for a constant/helper import
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/save-snapshots.test.ts`
- `docs/reports/2026-04-20-filed-arc-epilogue-state-implementation.md`

## Acceptance

- The filed High Pass resolver separates filed-location, field-arc-complete, optional-revisit, and filed-expedition-subtitle copy without player-facing copy drift.
- Filed High Pass still suppresses `resolveSeasonOutingLocator`, active field request, route marker, route replay label, and journal field request.
- Routes page, archive strip, atlas note, launch card, expedition card, and expedition notice still render the same exact filed lines.
- The lane-2 homecoming epilogue line remains `High Pass filed. Revisit how stone, shelter, and talus connect.`
- No save schema, route definition, support behavior, station page/UI, geometry, season-three promise, new route task, or science-copy change lands in this pass.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "files High Pass|High Pass filed|filed High Pass"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
