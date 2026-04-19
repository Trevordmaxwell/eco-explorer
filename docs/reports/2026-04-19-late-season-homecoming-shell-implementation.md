# Late-Season Homecoming Shell Implementation

## Queue Ref

- `ECO-20260419-main-315`

## What Landed

Lane 1 pulled the field-station shell accent cluster out of [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) and moved it into the new helper [field-station-homecoming-shell.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-homecoming-shell.ts).

That helper now owns:

- the nursery-and-route-derived shell input builder
- the lower growth accent state
- the backdrop brace and pulse state
- the actual shell drawing pass for both the brace family and sill family

[overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) now stays as the station overlay coordinator: it builds one shell input from the existing station state, delegates shell rendering, and leaves tabs, routes, expedition, nursery, and copy layout untouched.

## Late-Season Payoff

The new visible spend is one tiny upper lintel on the existing brace family when the station is in the archived return shell:

- default early return stays unchanged
- mid-progression brace behavior stays unchanged
- the archived `SEASON ARCHIVE` return now gets one calmer upper-shell cap instead of more station text or another panel

The late-season shell bit is derived from existing render-facing station inputs through the new helper, then exposed back through the existing `render_game_to_text()` field-station state so runtime proof can assert it without adding another debug seam.

## Verification

- `npm run validate:agents`
- `npm test -- --run src/test/overlay-copy.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "opens the world-map field station, claims field credit, and buys trail stride|surfaces the season capstone, then opens the next field season on the routes shell"`
- `npm run build`
- `node "$WEB_GAME_CLIENT" --url http://127.0.0.1:4189/ --iterations 1 --pause-ms 300 --screenshot-dir output/lane-1-main-315-client --actions-json '{"steps":[{"buttons":["enter"],"frames":6},{"buttons":[],"frames":12}]}'`

## Notes

The full `src/test/runtime-smoke.test.ts` file still has one unrelated failing Tundra geometry spec in another lane (`turns the earlier tundra band into a drift hold, thaw bench, then ridge release`). The lane-1 shell-targeted runtime slice above passed cleanly.
