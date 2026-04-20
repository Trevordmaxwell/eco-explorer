# Route Evidence Language Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-389`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-4`

## Scout Finding

Lane 2 already closed the source-ledger coverage gaps for live entries and process moments. Lane 4 does not need new source rows; the remaining route-facing science risk is wording discipline in filed Route v2 notes.

Most filed-note language is already observation-led: `mark`, `trace`, and `now read as` keep the note framed as player evidence. Two current strings lean too causal or developmental for what the route actually proves:

- `beach-shore-shelter`: `shelter grows from dune edge to tide line`
- `coastal-shelter-shift`: `the coast settling into forest-edge shelter`

Those phrases are small, but they matter because the notes are presented as synthesized field evidence. They should say the route clues mark a shelter pattern, not that the player proved growth, succession, or settlement.

## Recommended Main Scope

Keep `ECO-20260420-main-389` to a two-phrase route-note softening plus targeted expectation updates:

- In `src/engine/field-requests.ts`, change `beach-shore-shelter` filed text and `clueBackedTail` to an observation-led phrasing such as `mark shelter from dune edge to tide line.`
- In `src/engine/field-requests.ts`, change `coastal-shelter-shift` filed text and `clueBackedTail` to an observation-led phrasing such as `mark open coast meeting forest-edge shelter.`
- Update `src/test/content-quality.test.ts` route-note anchors and add a tiny guard against these two exact overclaim phrases returning.
- Update `src/test/field-requests.test.ts` filed-note matrix anchors, expected includes, and exact string expectations for the two changed notes and the `Wrack Shelter` variant.

## Non-Goals

- No new `docs/science-source-ledger.md` rows; lane 2 already closed packet `145` ledger coverage.
- No route progression, support, station, world-map, save/schema, geometry, UI, or filing-state behavior changes.
- No broad rewrite of route summaries, active process titles, ready text, or evidence slots.
- No edits to lane-2 authored biome copy unless a focused test exposes a real blocker.

## Verification

Recommended main verification:

```bash
npm test -- --run src/test/field-requests.test.ts -t "route-state matrix|filed-note|Shore Shelter|Open To Shelter"
npm run science:check
npm run build
npm run validate:agents
git diff --check
```

Baseline scout checks passed before handoff:

```bash
npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|clue-backed filed note|Route v2 filed-note"
npm run science:check
```
