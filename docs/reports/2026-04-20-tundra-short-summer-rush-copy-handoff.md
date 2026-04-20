# Tundra Short Summer Rush Copy Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-371`
Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
Lane: `lane-2`

## Target

Spend the lane-2 implementation on the existing Tundra Reach `short-summer-rush` ecosystem note in `src/content/biomes/tundra.ts`.

This is the smallest safe payoff for packet `141` because it reinforces the route's final `brief-fruit` idea through the journal without touching `tundra-short-season`, `Thaw Window` process behavior, support targeting, station state, or Tundra geometry.

## Why This Note

- `between-tussocks` was already sharpened on 2026-04-19 around `tussock-thaw-channel`, `bigelows-sedge`, and `arctic-willow`; do not spend this packet by retuning that same seam again.
- `thaw-edge` already covers the wet edge where low shrubs, blooms, and tufts mark thaw.
- `short-summer-rush` is currently the weaker Tundra note: `Plants and birds must use the short summer fast.`
- The note already links `purple-saxifrage`, `cloudberry`, and `snow-bunting`, so it can make first bloom, bird activity, and brief fruit feel like one short-season rush.
- The science ledger already supports conservative bloom timing for `purple-saxifrage`, short-summer berry timing for `cloudberry`, and northern bird presence for `snow-bunting`.

## Recommended Copy

Preserve the note `id`, `title`, `entryIds`, and `zoneId`.

Recommended `summary`:

`First blooms, birds, and cloudberry fruit all race the short tundra summer.`

Recommended `observationPrompt`:

`What here races the short summer?`

Budget check:

- summary: 75 characters, below the 110-character ecosystem-note summary ceiling
- prompt: 33 characters, below the 52-character ecosystem-note prompt ceiling

## Main-Agent Scope

Change only:

- `src/content/biomes/tundra.ts`
- `src/test/ecosystem-notes.test.ts`
- `docs/reports/2026-04-20-tundra-short-summer-rush-copy-implementation.md`
- `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- `.agents/work-queue.md`
- `progress.md`

Recommended test coverage:

- Extend the existing `short-summer-rush` resolver coverage or add a focused test using `purple-saxifrage`, `cloudberry`, and `snow-bunting`.
- Assert the note resolves to `short-summer-rush`.
- Assert the refreshed summary contains `cloudberry fruit`, `race`, and `short tundra summer`.
- Assert the prompt exactly matches `What here races the short summer?`
- Keep relying on `content-quality` for the ecosystem-note budget ceiling.

## Explicit Non-Goals

Do not change:

- `src/engine/field-requests.ts`
- `tundra-short-season` route definition, slot order, `routeV2Note`, `processFocus`, active title, display prefix, or filed note behavior
- observation prompt seeds
- support targeting or support choice copy
- station/state/save behavior
- world-map focus or route marker behavior
- Tundra geometry, spawn ratios, or process moments
- science-ledger rows, close-look cards, sketchbook notes, comparison branches, or new species

## Verification For Main

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
- `rg` for the old summary should find only this handoff report after implementation
