# 2026-04-05 Vertical Regression Guardrail Review

Reviewed `ECO-20260405-critic-276` in lane 3 against packet `114`, the lane brief, the critic brief, the implementation report, the updated treeline smoke path, and a fresh live browser proof.

## Result

No blocking issue.

The pass does the right small thing for a cooldown wave:

- it protects the newest treeline return family without reopening geometry growth
- it ties the regression seam to the authored `lee-pocket-fell-return -> lee-pocket-lee-rest` family instead of another broad magic-number settle box
- it keeps the proof deterministic and lightweight

## What I Rechecked

### Deterministic proof

The updated `runtime-smoke` path still proves the important order:

1. the route reaches the crest-brow side of the loop
2. the player settles in the sheltered return family
3. only then does the route continue into wider `lichen-fell`

That is the right risk to guard, and the new helper is specific enough to catch future drift without turning into a brittle frame-perfect landing test.

### Live browser check

The older browser/runtime watch item from `critic-275` is now resolved.

With the shared build issue cleared, a fresh Playwright browser pass from the normal treeline start successfully reached:

- `krummholz-belt` at the expected approach band
- then `dwarf-shrub` / lee-pocket approach with the `lee-pocket-rime-light` cue visible

The browser console stayed free of errors during that pass.

## Scope Check

The implementation stayed inside the intended cooldown envelope:

- no new platform ids
- no new landmark or cue family
- no geometry churn
- no generalized traversal framework

## Follow-On

Lane 3 can close this cooldown packet cleanly.

The next lane-3 wave can return to later destination growth when it is reactivated; it does not need another immediate cleanup patch for this treeline family.

## Verification

- `npm test -- --run src/test/treeline-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a tucked backside notch and upper cap for the treeline loop|turns the treeline lee pocket into a compact crest-and-notch loop|turns the treeline threshold into a last-tree shelter followed by the existing lee pocket"`
- `npm run build`
- Live Playwright browser proof on `http://127.0.0.1:4173/` from a normal treeline start, confirming `krummholz-belt` then lee-pocket approach and zero console errors
