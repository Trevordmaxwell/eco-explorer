# Station Homecoming Visual Accent Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-344`
- Packet: `.agents/packets/134-station-homecoming-evolution-pass.json`
- Lane: `lane-3`

## Scout Finding

Lane 3 should not race lane 1 on this packet. The visual homecoming accent belongs in the existing station shell helper, but lane 1 owns the station homecoming resolver and any new non-sill seam wiring. Keep `ECO-20260420-main-344` blocked until `ECO-20260420-critic-342` clears.

The current station shell already has three working accent families:

- lower sill / planter growth in `drawFieldStationGrowthAccent(...)`
- side-gutter brace family in `drawFieldStationBackdropAccent(...)`
- archived-return upper lintel when `SEASON ARCHIVE` plus the `High Pass` launch card are present

Those are all valid, but they are near the visual ceiling. The next lane-3 spend should be a tiny frame accent, not another row, panel, route note, or broader decoration system.

## Main Target

After lane 1 lands the new station homecoming seam, update the visual treatment in `src/engine/field-station-homecoming-shell.ts` so that the new seam reads as one small upper-frame memory accent.

Recommended shape:

- Use the existing `drawFieldStationHomecomingShell(...)` path.
- Prefer a tiny upper-corner, roofline, or brace-cap detail tied to the new seam state.
- Keep the lower sill family untouched.
- Do not widen the side-gutter brace trunks.
- Do not add another broad lintel across the whole card.
- Expose only the smallest debug state needed through existing `render_game_to_text()` station-shell state.

## Recommended Files

- `src/engine/field-station-homecoming-shell.ts`
- `src/test/overlay-copy.test.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-20-station-homecoming-visual-accent-implementation.md`

## Acceptance For Main

- `ECO-20260420-main-344` stays blocked until `ECO-20260420-critic-342` clears.
- The implementation uses lane 1's new homecoming seam instead of inventing a separate route, station, save, or copy state.
- The visible accent stays in the upper-frame / roofline / brace-cap family and does not add lower-sill growth, side-gutter bulk, a new lintel, a new panel, or new text.
- Unit coverage protects default, mid-progress, archived High Pass, and new-seam accent states.
- Focused runtime smoke proves the representative station return state exposes the accent through `render_game_to_text()` without crowding existing sill/gutter/lintel state.
- If runtime drawing changes land, an ignored browser proof under `output/` captures the station shell at `256x160`.

## Non-Goals

- No station resolver work, route filing behavior, support notices, save/schema changes, route copy, science copy, journal copy, new station pages, dashboard panels, committed screenshots, committed state dumps, or screenshot automation framework.
- No additional lower-sill growth, larger side-gutter brace growth, or second full-width lintel.

## Verification For Scout

- `npm run validate:agents`
- `git diff --check`
