# Forest Cool Edge Process Route Handoff

## Summary

The first process-backed Route v2 conversion should target `forest-cool-edge`.

This is the cleanest lane-4 candidate because the live `moisture-hold` habitat-process moment already overlaps the route's current shape exactly: same biome (`forest`), same zone (`creek-bend`), and the same three live evidence carriers (`salmonberry`, `redwood-sorrel`, `sword-fern`).

## Why This Route

- `forest-cool-edge` already has a live replay seam in `field-season-board.ts` as `Moist Edge`, so the process-backed pass can deepen an existing authored read instead of inventing a second ecology channel.
- The process moment is already science-safe and authored as a soft condition, not a binary gate: late-phase `mist-drip` plus revisit count makes moisture holdovers easier to notice, but the route can still work outside that window.
- `scrub-edge-pattern` is a worse first target because it just became the first real `transect-evidence` outing; stacking a process conversion on top of that immediately would blur two different Route v2 semantics in the same beat.
- `tundra-short-season` is a worse first target because it already bridges directly into `tundra-survey-slice` and a nursery unlock, so process work there would tangle with the inland timing chain rather than standing on its own.

## Main-Agent Recipe

1. Keep `forest-cool-edge` on the current `assemble-evidence` runtime and `routeV2Progress` save seam.
2. Add a small route-facing process presentation layer rather than a new route type:
   - one authored `processMomentId` or equivalent route hook
   - one active-summary variant for the process window
   - any tiny helper needed to ask "what is still holding moisture here?" while the window is live
3. When `moisture-hold` is active, let the live outing framing shift from generic comparison copy toward "read what is still holding moisture on the cooler forest side."
4. Keep the three current evidence slots and notebook completion flow intact. The outing should stay completable with the same evidence outside the process window.
5. Do not add timers, miss states, extra station surfaces, or a second route/process ledger.
6. Leave richer filed-note synthesis for `scout-99` / `main-137`; this step only needs the outing itself to feel process-aware.

## Verification Focus

- `field-requests.test.ts`: cover `forest-cool-edge` in both a live `moisture-hold` window and a normal window.
- `field-season-board.test.ts`: keep `Moist Edge` replay-note behavior aligned with the updated route framing.
- `runtime-smoke.test.ts`: re-check the active forest replay/state path that already surfaces `Moist Edge`.
