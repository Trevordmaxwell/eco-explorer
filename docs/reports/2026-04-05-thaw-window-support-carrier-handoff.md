# 2026-04-05 Thaw-Window Support Carrier Handoff

Scout handoff for `ECO-20260405-scout-283`.

## Scope Reviewed

- `docs/reports/2026-04-05-light-band-route-support-phase.md`
- `.agents/packets/117-light-band-route-support-phase.json`
- `src/content/biomes/tundra.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/engine/field-requests.ts`
- `docs/reports/2026-04-02-thaw-window-process-handoff.md`
- `docs/reports/2026-04-03-route-aware-world-state-handoff.md`
- `docs/reports/2026-04-04-held-sand-open-pioneer-implementation.md`

## Best Target

Spend `main-283` on `tundra-short-season`, centered in the live `thaw-skirt` band.

The right support family is:

- `arctic-willow`
- `bigelows-sedge`
- `tussock-thaw-channel`

These should deepen the existing `Thaw Window` route read without adding another notebook seam, close-look card, or comparison layer.

## Why This Is The Best Next Move

- `tundra-short-season` already has the cleanest light-band route identity. `Thaw Window` is live in the board, request, replay notice, and filed-display seam, so the missing piece is richer in-world support around that band rather than more wording.
- `thaw-skirt` already owns the right authored teaching seams. `Thaw Edge` and `Between Tussocks` are already present in `tundra.ts`, so lane 2 can reinforce the route through content placement instead of another note.
- The proposed carriers are same-band and same-story. `arctic-willow` marks the lower thaw edge, `bigelows-sedge` marks raised tussock structure, and `tussock-thaw-channel` marks the wet low lane between them.
- Coastal Scrub is the weaker first pick for this packet. `Held Sand` already has a live opportunity seam through `beach-grass`, plus denser replay and note support in the swale and back-dune family. Spending lane 2 there again would stack more density where the scrub branch has already been strengthened.

## Concrete Follow-On

### `tundra.ts`

Add one compact authored `thaw-skirt` support cluster that rides beside the current `Short Season` route instead of changing it.

Preferred shape:

- keep the route clues unchanged:
  - `purple-saxifrage`
  - `cottongrass`
  - `cloudberry`
- reinforce the same band with the support family:
  - `arctic-willow`
  - `bigelows-sedge`
  - `tussock-thaw-channel`

Recommended implementation:

1. Add 2-4 new authored entities in `thaw-skirt`, grouped around the existing `thaw-skirt-entry-heave`, `thaw-skirt-upper-shelf`, `thaw-skirt-bank-shoulder`, and `thaw-skirt-exit-heave` platforms.
2. Make the grouping read like one low wet lane plus one raised tussock edge, not like a new landmark pocket or second destination.
3. If the seeded zone still reads thin after the authored placements, allow one tiny count nudge on the existing `stable-thaw-edge` or `stable-thaw-tussocks` tables instead of adding a new note or new entry family.

### What Should Stay Unchanged

- do not add a new ecosystem note; `Thaw Edge` and `Between Tussocks` already cover this teaching seam
- do not add a comparison card, close-look card, or sketchbook strip
- do not change `tundra-short-season` slot ids, route order, filed identity, or route-support behavior
- do not widen `coastal-scrub` in the same pass

## Tests And Verification

Add focused coverage that the chosen thaw band now carries the extra support family without changing route identity.

Recommended checks:

- `src/test/tundra-biome.test.ts`
  - seeded `thaw-skirt` generation still includes the live route clues
  - seeded `thaw-skirt` generation now also includes at least two of the three support carriers in the same band
- optional focused `content-quality` assertion only if a new authored placement pattern needs a guardrail
- browser proof in the handheld frame showing the `thaw-skirt` band reads denser without becoming a new note-heavy pocket

## Why The Alternatives Are Weaker

### Do not spend this pass on `scrub-edge-pattern`

`Held Sand` already got the first clean low-risk same-band carrier swap through `beach-grass`. The scrub branch still has room for future support work, but it is no longer the lighter or emptier band.

### Do not spend this pass on `tundra-survey-slice`

`Bright Survey` is stronger as a route-awareness and support-choice seam than as a content-density seam. Lane 2 can help more by strengthening the earlier thaw band the survey beat inherits from.

### Do not add another tundra note first

The biome already has the right note coverage. More notebook text would solve the wrong problem and reopen the exact density pressure this packet is trying to avoid.

## Best Main-Agent Slice For `main-283`

1. In `src/content/biomes/tundra.ts`, add one compact `thaw-skirt` support-carrier cluster built from `arctic-willow`, `bigelows-sedge`, and `tussock-thaw-channel`.
2. Keep `tundra-short-season`, `Thaw Window`, and `Bright Survey` request or support behavior unchanged.
3. Add focused tundra content coverage proving the `thaw-skirt` band now reads as a fuller thaw-edge family without introducing a new surface.

## Expected File Touches

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- optionally `src/test/content-quality.test.ts` if a tiny authored-placement guardrail is useful

## Guardrails

- do not add new entries to the ledger for this pass unless a truly new species is introduced
- do not widen into route logic, route-support runtime, or station copy
- keep the added carriers inside the existing `thaw-skirt` band
- favor authored placements first, tiny spawn-count tuning second

## Queue Guidance

- close `ECO-20260405-scout-283` with this report
- bump packet `117` to version `2`
- retarget `ECO-20260405-main-283` and `ECO-20260405-critic-283` to this report
- promote `ECO-20260405-main-283` to `READY`
