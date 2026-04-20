# Game Controller Extraction Guided-Notice Review

Date: 2026-04-20
Queue: `ECO-20260420-critic-406`
Packet: `.agents/packets/150-game-controller-extraction-wave.json`
Lane: `lane-1`

## Review Result

No blocker found.

The lane-1 extraction is behavior-preserving and appropriately small for packet `150`. Guided field-season notice classification and replacement gating now live in `src/engine/field-notices.ts`, while `game.ts` keeps only the stateful decision about whether each notice should be attempted.

## Checks

- The extracted helper mirrors the old behavior: no current notice allows guidance, guided notice titles may replace other guided notice titles, and non-guided or filed-route notices block guided replacements.
- `game.ts` passes the current `fieldRequestNotice` into the helper at every previous call site and no local guided-notice helper remains.
- The unit tests cover the extracted title and replacement policy directly.
- The focused runtime-smoke slice still covers first field-season guidance and season-capstone notice flow.
- No notice copy, notice duration, field-request completion, route filing, expedition activation, station behavior, support behavior, save schema, overlay rendering, authored science/content, geometry, or new controller framework changed.

## Verification

```bash
npm test -- --run src/test/field-notices.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "field-season guidance|season capstone"
npm run build
npm run validate:agents
git diff --check
```

`npm run validate:agents` passed with the known work-queue-size warning only.

## Follow-Up

Packet `150` lane 1 is clear. Promote `ECO-20260420-scout-410` for packet `151`.
