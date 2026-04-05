# 2026-04-05 Vertical Regression Guardrail Handoff

Prepared `ECO-20260405-scout-276` in lane 3 against packet `114`, the lane brief, the scout role guide, the cooldown cleanup review, the current treeline geometry, and the focused smoke path that now covers the softened right-hand return.

## Current Read

The cooldown cleanup fixed the right thing:

- `lee-pocket-fell-return` now catches earlier
- the treeline route still reads as one compact family
- no new landmark or branch was added

The next risk is no longer geometry-first. It is guardrail-first.

Right now the strongest remaining regression seam is this:

- the runtime smoke still proves the player stabilizes in the broad right-hand band before open fell
- but that proof still uses one generic `x/y` settle window rather than a named sheltered-return family derived from the authored treeline platforms

That means a later vertical pass could quietly flatten, shift, or partially bypass the intended `fell-return -> lee-rest` family while still scraping through a broad final-state check.

## Best Next Guardrail

Use `main-276` on the treeline return-band proof, not on beach and not on new geometry.

### Exact regression risk

Future treeline edits could make the player skip the intended sheltered hand-back under `lee-pocket-crest-brow` and still satisfy the current broad `lichen-fell` settle assertion.

That is the right next guardrail target because:

- it protects the newest cooldown fix directly
- it stays inside the current benchmark space
- it avoids adding more geography during a cooldown wave
- it does not depend on the unrelated nursery/browser break being fixed first

## Recommendation For `main-276`

Add one compact treeline-specific regression helper and one dedicated smoke assertion.

### Suggested shape

1. In `src/test/runtime-smoke.test.ts`, derive the sheltered return band from the authored treeline platform ids:
   - `lee-pocket-fell-return`
   - `lee-pocket-lee-rest`
2. Add a tiny helper that answers the real question:
   - has the player stabilized inside the authored sheltered-return family before fully spilling into open fell?
3. Use that helper in one dedicated proof that starts from the existing treeline loop path and asserts:
   - crest brow is reached
   - the player next settles in the authored return family
   - only after that does the route continue out into the wider `lichen-fell`

### Why this is better than another raw coordinate check

- it ties the smoke proof to the actual authored family instead of a magic-number window
- it is less brittle than frame-perfect one-platform landing checks
- it protects the cooled-down route feel, not just one screenshot state

## Non-Targets

- do not reopen `src/content/biomes/treeline.ts` unless the smoke helper exposes a real mismatch
- do not spend this pass on beach opener geometry
- do not add another browser-only proof as the main guardrail while the unrelated nursery runtime error is still breaking stepped browser verification
- do not widen this into a general traversal framework or a new engine helper

## Suggested File Targets

- `src/test/runtime-smoke.test.ts`
- optionally `src/test/treeline-biome.test.ts` only if one small companion assertion helps name the same family more clearly

## Suggested Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "turns the treeline lee pocket into a compact crest-and-notch loop|stabilizes in the treeline sheltered return band before open fell"`
- `npm run validate:agents`

If the unrelated nursery error clears during the same work window, a fresh browser proof is a nice follow-on check, but it should not be the core deliverable for this guardrail pass.

## Queue Outcome

- Close `ECO-20260405-scout-276` as done.
- Promote `ECO-20260405-main-276` to `READY`.
- Retarget `main-276` to this handoff instead of the broader packet summary.
