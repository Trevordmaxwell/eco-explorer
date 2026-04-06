# 2026-04-05 Light-Band Route Approach Handoff

Prepared `ECO-20260405-scout-286` in lane 3 against packet `118`, the lane brief, the scout role guide, the new light-band phase report, and the live Tundra / Coastal Scrub route-support geometry.

## Recommendation

Use `main-286` on `Tundra Reach`, not `Coastal Scrub`.

The cleanest low-density approach seam is the `Short Season` / `Thaw Window` handoff from the snow-meadow drift hold into the first thaw-skirt step:

- `snow-threshold-lee-rest`
- `snow-meadow-drift-shoulder`
- `snow-meadow-drift-rest`
- gap into `thaw-skirt-entry-heave`

## Why Tundra Wins

### Tundra

The current Tundra route already has the right learning shape:

- `first-bloom` starts in `snow-meadow`
- `wet-tuft` lives in `thaw-skirt`
- the drift-hold family already teaches one brief pause before the wetter band

That means a tiny approach cleanup can make the route feel more tactile in motion without adding another destination:

- the player reaches the drift hold
- then crosses into the thaw-skirt
- then the wetter route clue family opens

Right now that handoff still looks like the best candidate for a small lane-3 feel pass because it has room and stays below the current density ceiling.

### Coastal Scrub

`Coastal Scrub` has useful route material, but the best available transition geometry still sits too close to the already-authored bluff / swale complex:

- `windbreak-bluff-lee-step`
- `windbreak-bluff-mid-step`
- `windbreak-bluff-crest`
- `windbreak-bluff-lookout-rest`
- `windbreak-swale-entry-log`
- `windbreak-swale-upper-log`

That is exactly the area the packet told us not to densify again. A scout handoff there would be too easy to turn into another lookout-family expansion instead of a light route-approach support pass.

## Exact Risk

The `Short Season` route asks the player to feel a move from the snow-meadow drift-hold cluster into the thaw-skirt wet band, but the current handoff still has more dead travel than approach read:

- the route smoke proves the player can reach the drift hold
- then it jumps to a broad `thaw-skirt` arrival assertion
- the authored geometry leaves a noticeable open handoff between `snow-meadow-drift-rest` and `thaw-skirt-entry-heave`

That means the route identity is currently stronger in notebook and carrier logic than in the physical approach itself.

## Best Shape For `main-286`

Keep this tiny and geometry-first.

### Preferred seam

One compact approach pass around:

- `snow-meadow-drift-rest`
- `thaw-skirt-entry-heave`

### Preferred change shape

- slightly shorten the empty handoff between the drift hold and the thaw-skirt entry
- preserve the existing drift-hold identity and the later thaw-skirt upper shelf
- make the player feel a clearer “last dry step into thaw” approach before the route opens wider

### Good implementation candidates

- widen `thaw-skirt-entry-heave` a little toward the incoming drift-rest side
- if needed, use only a tiny companion nudge to `snow-meadow-drift-rest`

### Non-targets

- no new platform id
- no new `snow-meadow` landmark family
- no new `thaw-skirt` landmark or pocket
- no changes to Coastal Scrub for this wave
- no route-board, notebook, or station copy expansion

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family|adds one compact snow-meadow drift hold before the thaw-skirt family"`
- `npm run build`

If the shared browser lane is available, one fresh real-start Tundra pass is a nice follow-on proof, but the core delivery should stay in deterministic tests.

## Queue Outcome

- Close `ECO-20260405-scout-286` as done.
- Promote `ECO-20260405-main-286` to `READY`.
- Retarget `main-286` to this handoff instead of the broad phase summary.
