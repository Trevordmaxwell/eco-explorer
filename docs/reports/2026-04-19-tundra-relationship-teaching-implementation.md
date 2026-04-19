# 2026-04-19 Tundra Relationship-Teaching Implementation

Implemented `ECO-20260419-main-316`.

## What Changed

- Retuned `between-tussocks` in `src/content/biomes/tundra.ts` so the thaw-skirt relationship now teaches `tussock-thaw-channel + bigelows-sedge + arctic-willow` instead of the older `channel + sedge + cottongrass` blend.
- Kept the note id stable and tightened the copy to:
  - summary: `Sedge and willow hold the edges while wetter thaw channels stay low between them.`
  - prompt: `What here keeps thaw water low and slow?`
- Added one new local observation seed in `src/engine/observation-prompts.ts`:
  - `tundra-held-thaw`

## Why The Seed Was Necessary

The scout recommendation preferred ecosystem-note fallback first, which was the right starting point. In the live thaw-skirt band, though, the existing `tundra-short-season` seed still matches too broadly because `arctic-willow` is already part of that route-facing trio.

Without a more specific local seed:

- the refreshed note text would exist
- but the journal prompt in the thaw-skirt cluster would still usually resolve to `tundra-short-season`
- so the new relationship would remain harder to notice in the live north-end band

The new `tundra-held-thaw` seed is intentionally tighter than `tundra-short-season`:

- same zone family: `thaw-skirt`
- same weather gate: `clear` or `light-flurry`
- more specific required cluster: `tussock-thaw-channel`, `bigelows-sedge`, `arctic-willow`

That lets the route-facing short-season prompt stay intact for its broader thaw-window cases while the local channel cluster now surfaces the sharper relationship question when the stronger evidence is present.

## Tests Updated

- `src/test/ecosystem-notes.test.ts`
  - updated the `between-tussocks` unlock proof to use `tussock-thaw-channel + arctic-willow`
- `src/test/observation-prompts.test.ts`
  - added coverage for `tundra-held-thaw`
- `src/test/content-quality.test.ts`
  - updated prompt-seed count after adding the new local seed
- `src/test/runtime-smoke.test.ts`
  - added a thaw-skirt journal proof around the authored channel cluster

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts src/test/content-quality.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "thaw-hold note|High Pass rime-footing note|wrack-chain relationship note"`
- `npm run build`

## Result

The earlier tundra band now teaches a more specific thaw-hold relationship through the existing notebook surfaces without adding a new note id, a new journal shell, or another comparison branch.
