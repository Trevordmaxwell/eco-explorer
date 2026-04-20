# Treeline Route Support Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-369`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Lane: `lane-4`

## Recommendation

Implement a controller-level `Brief Bloom` support proof for the existing `treeline-low-fell` outing. The route and runtime behavior already exist; the missing small guard is the paired proof that `hand-lens` can prefer the peak-window alternate carrier while `note-tabs` keeps normal nearest-inspect behavior.

## Main-Agent Scope

- Edit `src/test/field-request-controller.test.ts` only, plus normal report/packet/queue/progress updates.
- Seed `treeline-low-fell` with `worldStep = 4`, `biomeVisits.treeline = 2`, and route progress already holding `last-tree-shape` / `krummholz-spruce` plus `low-wood` / `dwarf-birch`, so `fell-bloom` is the next ordered slot.
- Use `mountain-avens` as the nearer ordinary `fell-bloom` carrier and `moss-campion` as the farther active peak-window carrier in `lichen-fell`.
- For `hand-lens`, assert active request title `Brief Bloom`, `mountain-avens` receives `Notebook fit: fell bloom`, `moss-campion` receives `LENS CLUE: fell bloom`, target selection retargets to `moss-campion`, `supportRetargetsInspect` is true, `supportPrefersActiveClue` is true, and the `NOTEBOOK J` chip is `Brief Bloom` / `support-biased`.
- For `note-tabs`, assert `prefersHandLensActiveEntry` is false for `moss-campion`, target selection stays on the nearer `mountain-avens`, no support retarget/active-clue flags are set, and the in-field chip stays progress-facing with `2/4 clues` / `support-biased`.

## Guardrails

- Do not change route definitions, world-state focus copy, filed-note copy, station pages, support order, save schema, world-map focus, route-marker behavior, Treeline geometry, High Pass copy, science copy, or UI/replay/loadout/planner surfaces.
- Do not add another High Pass route or broaden the High Pass `Rimed Pass` proof; this pass is explicitly about lower Treeline `Low Fell` / `Brief Bloom`.
- Keep this behavior-neutral unless the test exposes a real mismatch.

## Baseline Verification

- `PASS npm test -- --run src/test/field-request-controller.test.ts -t "Brief Bloom|Rimed Pass|High Pass|non-hand-lens"`
- `PASS npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "Brief Bloom|Low Fell|place-tab"`

## Required Main Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
