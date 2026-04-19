# Late-Season Homecoming Shell Review

## Queue Ref

- `ECO-20260419-critic-315`

## Verdict

No blocker.

The lane-1 pass spends the homecoming payoff in the right place:

- the new archived-return lintel is visible but still calm
- it stays on the existing brace family instead of adding another row, card, or subtitle
- [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) is materially smaller now that the shell accent cluster lives in [field-station-homecoming-shell.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-homecoming-shell.ts)

The review also confirms the proof shape stayed disciplined:

- early station return still resolves with no shell growth
- mid-progression brace behavior still comes from the existing nursery and logged-route state
- the archived `SEASON ARCHIVE` `High Pass` shell now exposes the new lintel through the same `render_game_to_text()` field-station state instead of inventing another debug seam

## Watch Item

If lane 1 wants more station-shell nuance later, keep that work inside [field-station-homecoming-shell.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-homecoming-shell.ts) or split it again there first.

The new helper is still one coherent subsystem, but it should not become a second inline renderer concentration point by gradually absorbing unrelated routes-page or copy layout work.

## Verification Reviewed

- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`
- `npm run validate:agents`
- shared web-game client smoke in `output/lane-1-main-315-client/`

## Residual Risk

The shared tree still has one unrelated full-file `runtime-smoke` failure in another lane’s Tundra geometry spec. That is workspace noise, not a lane-1 blocker for this shell review.
