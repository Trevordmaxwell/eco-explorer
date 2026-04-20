# Alpha RC Packaging Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-434`
Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
Lane: `lane-1`

## Finding

Lane 1 already has a solid source-review-drop foundation: `npm run review:pack`, `npm run review:verify -- <archive>`, `docs/review-drop-checklist.md`, and README instructions all describe the clean source-complete archive path.

The missing release-candidate layer is a single command and docs seam that turns those pieces into an explicit alpha RC gate. That gate should run source preflight, create the review-drop archive, verify it from a clean extract, and report the archive path.

This should not run as a partial RC yet. `npm test -- --run src/test/runtime-smoke.test.ts` currently fails only on the known lane-2 High Pass rime-footing exact-copy mismatch, and packet `157` also depends on the lane-2, lane-3, and lane-4 packet `156` critics. The lane-1 implementation should stay blocked until those gates are clear.

## Recommended Main Scope

Recommended files once unblocked:
- `package.json`
- `scripts/create-alpha-rc.mjs`
- `README.md`
- `docs/review-drop-checklist.md`
- `docs/reports/2026-04-20-alpha-rc-packaging-implementation.md`

Recommended implementation:
- Add `npm run alpha:rc` backed by `scripts/create-alpha-rc.mjs`.
- The script should run source preflight with `npm run validate:agents`, `npm run science:check`, `npm test`, and `npm run build`.
- If preflight passes, the script should run `npm run review:pack`, capture the emitted archive path, then run `npm run review:verify -- <archive>`.
- Print the verified archive path at the end so the reviewer knows exactly which `.tgz` is the RC artifact.
- Use `execFileSync` or equivalent argument arrays instead of shell string interpolation.
- Preserve the existing `review:pack` and `review:verify` semantics; the RC wrapper should orchestrate them, not duplicate or weaken them.

## Blocking Conditions

Do not promote `ECO-20260420-main-434` until:
- `ECO-20260420-critic-431` is done
- `ECO-20260420-critic-432` is done
- `ECO-20260420-critic-433` is done
- the known High Pass rime-footing exact-copy failure is resolved by the owning content lane
- `npm test` can pass in the source tree

## Non-Goals

- No runtime/gameplay behavior changes.
- No authored science copy, biome geometry, route prose, station UI, save schema, or map behavior changes.
- No generated archive or extracted `.tmp/` workspace should be committed.
- Do not relax `review:verify`; the RC should be a stricter wrapper, not a bypass.

## Acceptance For Main

- `npm run alpha:rc` exists and produces a verified source-complete archive under `output/review-drops/` once the blockers are clear.
- README and `docs/review-drop-checklist.md` explain the RC command and the manual fallback using `review:pack` / `review:verify`.
- `node --check scripts/create-alpha-rc.mjs`, `npm run validate:agents`, `npm run science:check`, `npm test`, `npm run build`, `npm run alpha:rc`, and `git diff --check` pass when main runs after unblock.
