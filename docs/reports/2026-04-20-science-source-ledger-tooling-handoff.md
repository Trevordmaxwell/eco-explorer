# Science Source-Ledger Tooling Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-386`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-1`

## Scout Verdict

Implementation-ready. Lane 2 already completed the science-ledger coverage work, so lane 1 should not rewrite science copy, add ledger rows, or reopen content tests. The smallest useful lane-1 chunk is to make the existing source-ledger gate explicit in package scripts and review-drop verification.

## Findings

- `src/test/content-quality.test.ts` now imports `docs/science-source-ledger.md` and checks every live authored biome entry id plus every live `processMoments` id against the ledger.
- `npm test -- --run src/test/content-quality.test.ts` passes and is the right focused proof for the source-ledger gate.
- `package.json` does not yet expose a named source-ledger command, so the gate is easy to miss outside full `npm test`.
- `docs/review-drop-checklist.md` says `review:verify` runs full tests, but it does not call out science-ledger coverage as an alpha release gate.
- `scripts/verify-review-drop.mjs` can enforce the gate cheaply by requiring the ledger/test files and running the named focused command before the broader test suite.

## Recommended Main Scope

- Add a package script such as `science:check` that runs `vitest run --run src/test/content-quality.test.ts`.
- Update `scripts/verify-review-drop.mjs` to require `docs/science-source-ledger.md` and `src/test/content-quality.test.ts` in the archive, then run `npm run science:check` after agent validation and before full `npm test`.
- Update `docs/review-drop-checklist.md` so source-ledger coverage is an explicit local pre-pack command and part of the clean extract proof description.
- Do not edit `docs/science-source-ledger.md`, `src/content/**`, `src/test/content-quality.test.ts`, route/station/world-map runtime behavior, save schema, geometry, or authored science copy unless the new command exposes a true failing gate.

## Verification

Baseline scout proof passed:

```bash
npm test -- --run src/test/content-quality.test.ts
```

Result: 2 files passed, 36 tests passed.
