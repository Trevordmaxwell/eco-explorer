# 2026-04-19 Tundra Relationship-Teaching Handoff

Scout handoff for `ECO-20260419-scout-316`.

## Scope Reviewed

- `docs/reports/2026-04-19-late-season-consequence-and-homecoming-pass.md`
- `.agents/packets/128-late-season-consequence-and-homecoming-pass.json`
- `src/content/biomes/tundra.ts`
- `src/engine/ecosystem-notes.ts`
- `src/engine/observation-prompts.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/observation-prompts.test.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-05-thaw-window-support-carrier-handoff.md`
- `docs/reports/2026-04-05-thaw-window-support-carrier-review.md`

## Best Target

Spend `main-316` on the existing `between-tussocks` note in `src/content/biomes/tundra.ts`.

Do not add a ninth tundra note and do not add a brand-new notebook surface. Retune the live thaw-skirt note so it teaches one clearer relationship:

- `tussock-thaw-channel` is the wet low lane
- `bigelows-sedge` is the raised edge structure
- `arctic-willow` is the low holding plant that marks where thaw can stay

The safest journal-facing entry target is `tussock-thaw-channel`, because it already owns this seam and does not require reordering the stronger `snow-meadow` or `thaw-edge` note stack.

## Why This Is The Best Next Move

- Packet `128` asks for one compact earlier-band relationship seam, not another density-only pass. The live authored carriers are already in place around `thaw-skirt-entry-willow`, `thaw-skirt-channel`, and `thaw-skirt-upper-sedge`.
- The last tundra lane-2 pass deliberately spent on support carriers instead of more note count. This follow-on can now cash that in by sharpening the existing `between-tussocks` teaching seam instead of opening another note family.
- `between-tussocks` is the cleanest seam to sharpen. It is already tied to `tussock-thaw-channel`, so the journal can surface the new relationship without destabilizing `tussock-ground` in `snow-meadow` or the route-facing `thaw-edge` story.
- A brand-new note would create avoidable resolver risk for `bigelows-sedge` and `arctic-willow`, both of which already participate in stronger older note chains.

## Exact Recommendation

Keep the note id `between-tussocks`, but retune it to the thaw-hold relationship.

Recommended shape:

- title: `Between Tussocks`
- entryIds:
  - `tussock-thaw-channel`
  - `bigelows-sedge`
  - `arctic-willow`
- minimumDiscoveries: `2`
- summary:
  - `Sedge and willow hold the edges while wetter thaw channels stay low between them.`
- observationPrompt:
  - `What here keeps thaw water low and slow?`
- zoneId: `thaw-skirt`

## What Should Stay Unchanged

- do not add a new tundra note id
- do not add a new prompt seed unless the note fallback proves insufficient during implementation
- do not change `tundra-short-season`, `Thaw Window`, or support-choice behavior
- do not widen the notebook or atlas shell
- do not spend this pass on `meltwater-edge`; keep the teaching seam in the earlier `thaw-skirt` band

## Tests And Verification

Recommended checks:

- `src/test/ecosystem-notes.test.ts`
  - prove `tussock-thaw-channel` now resolves `between-tussocks` through the `tussock-thaw-channel + arctic-willow` pair
- `src/test/runtime-smoke.test.ts`
  - seed a thaw-skirt journal state around the authored `tussock-thaw-channel`
  - confirm the journal shows the sharpened `Between Tussocks` note with the new summary
  - confirm the journal observation prompt comes from the ecosystem-note fallback and stays in `thaw-skirt`
- `npm run build`

`src/test/observation-prompts.test.ts` only needs a touch if implementation adds a dedicated seed, which is not the recommended first move.

## Why The Alternatives Are Weaker

### Do not add a fresh thaw-skirt note first

That would reopen note-order risk for `arctic-willow` and `bigelows-sedge`, both of which already belong to older, stronger note chains.

### Do not spend this pass on another seed-only prompt first

The live journal already has the right fallback seam for note-backed teaching. Using the existing note keeps the relationship stable and avoids another authored prompt that might overpower the route-facing `tundra-short-season` prompt family.

### Do not move this work to `meltwater-edge`

Packet `128` specifically wants the earlier band to feel more remembered. The far-right rest already has its own pocket identity.

## Best Main-Agent Slice For `main-316`

1. In `src/content/biomes/tundra.ts`, retune `between-tussocks` toward the `channel + sedge + willow` relationship.
2. Keep the id stable and let the ecosystem-note fallback carry the prompt instead of adding a new seed.
3. Add one focused journal/runtime proof in the live `thaw-skirt` authored cluster.

## Expected File Touches

- `src/content/biomes/tundra.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/runtime-smoke.test.ts`

## Queue Guidance

- close `ECO-20260419-scout-316` with this report
- bump packet `128` and narrow `main_316_focus` to the existing `between-tussocks` seam
- promote `ECO-20260419-main-316` to `READY`
