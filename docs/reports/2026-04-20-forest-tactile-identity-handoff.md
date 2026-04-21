# Forest Tactile Identity Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-364`
Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
Lane: `lane-3`

## Scout Read

Packet `139` asks lane 3 to make the forest middle feel more memorable through place, shelter, moisture, and root/wood relationships. The live forest already has a strong spatial family: the lower `root-hollow-under-basin-rest`, the `filtered-return-mouth-sill`, and the `log-run-high-run-log` carry form a damp lower pocket -> filtered return -> high log-run chain.

Because that geometry is already dense and previously browser-reviewed, the safest next lane-3 chunk is proof-first. Main should make the existing tactile chain explicit in focused biome coverage instead of adding another platform, another cave chamber, or another old-growth branch.

## Recommended Main Chunk

Add one focused guard to `src/test/forest-biome.test.ts` that names the live forest physical-memory chain and pins the relationships that make it readable:

- Lower wet pocket: `root-hollow-under-basin-rest`, `root-hollow-under-basin-pocket`, `root-hollow-basin-slug`, `root-hollow-basin-ensatina`, and `root-hollow-under-basin-moss`.
- Filtered return mouth: `filtered-return-mouth-sill`, `filtered-return-root-curtain`, `filtered-return-seep-moss`, and `filtered-return-mouth-moss`.
- Log-run carry out: `root-hollow-exit-log`, `log-run-high-run-log`, `log-run-fir-trunk`, and `log-run-licorice-trunk`.

Default to a test/report-only pass. If main finds a real missing visual gap, it may add at most one tiny existing-id carrier near `filtered-return-mouth-sill` or `log-run-high-run-log`, but that should trigger fresh browser proof because the forest middle is already near the useful density ceiling.

## Guardrails

- Do not add cave-system breadth, another old-growth branch, a new route objective, new support behavior, new station UI, save/schema fields, world-map behavior, player-physics changes, or journal-heavy copy.
- Do not duplicate lane 4's completed `Moist Edge` / `Moist Hollow` support work or lane 2's completed root-shelter copy work.
- Preserve the existing root-hollow traversal smoke tests and the high-run carry tests.
- No browser proof is required for test/report-only work; browser proof is required if any geometry, rendering, or placement changes land.

## Baseline Verification

- `PASS npm test -- --run src/test/forest-biome.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "root-hollow|Moist Hollow|Moisture Holders|log-run"`

## Main Verification

- `npm test -- --run src/test/forest-biome.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "root-hollow|Moist Hollow|Moisture Holders|log-run"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
