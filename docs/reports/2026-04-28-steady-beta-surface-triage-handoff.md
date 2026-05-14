# Steady Beta Surface Triage Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Packet: `.agents/packets/168-steady-beta-surface-triage.json`

## Scope

This handoff narrows packet `168` to the smallest surface-only implementation pass before the Source to Shore station-container work starts.

## Findings

- `src/engine/overlay-render.ts` draws the field-station subtitle at `contentRect.y + 8` while the main `SEASON` / `NURSERY` tabs begin at `contentRect.y + 12`, so long Source to Shore subtitles can occupy the same vertical band as the tabs.
- `src/engine/overlay-render.ts` trims the journal field-request progress label to `36px`, but right-aligns the original label string. Wider labels such as `0/3 stages` can still clip or crowd the route title.
- `src/engine/field-season-board.ts` currently feeds Source to Shore through the completed `EDGE LINE LOGGED` board shell. That is real packet `169` work and should remain out of packet `168`.

## Implementation Contract For Main

- Runtime edit target: `src/engine/overlay-render.ts`.
- Station fix: separate the subtitle and `SEASON` / `NURSERY` tab rows without changing station state, season pages, Source to Shore copy, or the field-season board data model.
- Journal fix: measure and draw the same trimmed progress string, widen the title/progress split enough for `0/3 stages`, and preserve the compact field-request card.
- Behavior parity: existing Source to Shore route state should stay unchanged; board container work waits for packet `169`.

## Proof Needed

- Focused runtime proof for Source to Shore station/journal surfaces in `src/test/runtime-smoke.test.ts`.
- Existing board parity from `src/test/field-season-board.test.ts` for Source to Shore state.
- `npm run build` after runtime edits.
- Native `256x160` browser proof of the field-station routes page and the journal route card after the fix.
