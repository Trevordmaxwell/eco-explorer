# High-Country Season Shelter Content Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-2
Packet: `.agents/packets/177-lane-2-content-richness-runway.json`

## Recommendation

Use a one-seed close-look pass for `woolly-lousewort`.

Treeline already has a dense shelter/season set across `krummholz-spruce`, `dwarf-birch`, `frost-heave-boulder`, `talus-cushion-pocket`, `hoary-marmot`, and `white-arctic-mountain-heather` notes. Adding another Treeline ecosystem note would mostly duplicate the existing `Stone Shelter`, `Heath Thread`, `Rime Footholds`, and `Talus Islands` teaching.

The clearer high-country gap is Tundra Reach: `woolly-lousewort` is already a live peak-season bloom, a `Brief Thaw Bloom` note member, and the `Thaw Window` hand-lens carrier, but it has no close-look card. A compact close-look seed makes the short-season adaptation visible without changing route semantics or adding another notebook surface.

## Implementation Contract

Add exactly one close-look seed in `src/engine/close-look.ts`:

- Entry id: `woolly-lousewort`
- Callouts: `woolly stem`, `flower cluster`
- Sentence: `Woolly fuzz helps hold warm air around the stem in cold tundra wind.`
- Sprite scale: `5`

Update `src/test/close-look.test.ts` so the allowlist and payload assertions cover `woolly-lousewort`. Run `src/test/content-quality.test.ts`; no ledger row should be needed because `docs/science-source-ledger.md` already has a verified `woolly-lousewort` row.

## Science Support

- NPS Bering Land Bridge describes woolly lousewort as a stony-tundra plant and supports the woolly stem insulation/wind/cold claim.
- Existing high-country heather and alpine-community sources remain sufficient for Treeline; this pass intentionally avoids new Treeline copy.

## Out Of Scope

- No new inspectables, sprites, asset modules, ecosystem notes, comparison allowlists, sketchbook shell, atlas page, station UI, route catalog semantics, route beats, support behavior, world-map behavior, save-schema changes, geometry, or broad `game.ts` edits.
- Do not add a fourth Source to Shore beat, badge, reward economy, or new page.

## Verification

Main-agent proof should run:

```bash
npm test -- --run src/test/close-look.test.ts src/test/content-quality.test.ts
npm run build
```

No browser proof is required for this handoff unless the reviewer sees a card-cropping or readability problem, because the pass reuses the existing close-look card and sprite pipeline.
