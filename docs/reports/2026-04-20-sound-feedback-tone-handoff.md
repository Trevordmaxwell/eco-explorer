# 2026-04-20 Sound Feedback Tone Handoff

Prepared for `ECO-20260420-scout-399` in lane 2.

## Scout Read

Packet `148` asks lane 2 to keep sound and feedback language naturalist-notebook toned without taking over runtime audio, input, or visual-feedback systems. I audited the existing seams that touch sound/feedback:

- `src/engine/audio.ts` keeps sparse ambient profiles and UI cue ids. These names are internal/debug-facing and should remain lane-1 owned.
- `src/test/audio.test.ts` already protects biome-to-ambient mapping and no-op safety.
- `src/engine/overlay-render.ts` contains the only player-facing sound helper copy found in this pass: `Sound wakes after your first key or click.`
- `src/test/overlay-copy.test.ts` already owns menu helper copy expectations and can carry the narrow regression.
- `src/test/runtime-smoke.test.ts` checks sound arming/toggle behavior; it should not need changes for a copy-only pass.
- Route notices and filed/support feedback are lane-4 owned, and tiny visual accents are lane-3 owned.

## Recommendation

Promote `ECO-20260420-main-399` as a copy-only helper pass. The smallest useful chunk is to soften the menu fallback sound helper from:

```text
Sound wakes after your first key or click.
```

to:

```text
Quiet sounds start after a key or click.
```

This keeps the required browser-audio gesture message, fits the handheld copy budget, and reads more like a calm field-notebook setting than an implementation note.

## Implementation Contract

- Edit only the player-facing helper string in `getMenuOverlayHelperText`.
- Update both fallback branches that currently return the old sound helper copy.
- Add exact overlay-copy coverage for the field-guide-only case and the no-primary-action fallback case.
- Treat `src/engine/overlay-render.ts` as a shared-file copy-only exception; do not touch render coordinates, menu actions, settings behavior, or runtime dispatch.
- Do not rename audio profile ids, UI cue ids, save fields, sound settings, route notices, station pages, field-season board copy, or visual feedback accents.

## Suggested Verification

- `npm test -- --run src/test/overlay-copy.test.ts src/test/audio.test.ts -t "sound|menu|overlay|audio"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
