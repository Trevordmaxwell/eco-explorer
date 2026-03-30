# 2026-03-30 Inland Corridor Beats Review

## Scope

Review `ECO-20260330-main-69`: the quiet authored inland corridor beats that follow the second live route and the compact route-atlas pass.

## What Changed

- `forest <-> treeline` now carries two route-aware seam anchors instead of reading like a generic biome blend:
  - `salal-berry` now marks the last richer forest-side patch on the `log-run` side
  - `mountain-avens` now appears as the first stronger alpine bloom on the `thin-canopy` side
- `treeline <-> tundra` now carries the inland route’s alpine and thaw language directly in the seam:
  - `mountain-avens` now shows up before the open-ground handoff fully clears
  - `woolly-lousewort` now joins the tundra-side carriers with `purple-saxifrage` and `cottongrass`
- `tundra` gained one quiet open-ground shelter prompt at `wind-bluff`:
  - `What still makes a calmer pocket close to the ground here?`
- The existing `tundra-low-shelter` field-partner cue now explicitly recognizes that new prompt id.

## Review Read

No blocking issues.

Why the pass is working:

- The forest-to-treeline link stays mostly world-first. The new carriers do teaching work without forcing a new chatter layer onto the seam that still needs silence.
- The treeline-to-tundra link is the right place for the one extra notebook window because the species and ground shift are already legible there.
- `mountain-avens` now does route work outside the journal as well as inside it, helping the inland chapter feel continuous instead of split into separate screens.
- The browser pass showed the new tundra-side shelter question landing exactly when `arctic-willow`, `mountain-avens`, and `purple-saxifrage` came into view on the corridor threshold.

## Verification

- Focused inland corridor and prompt tests passed:
  - `src/test/corridor.test.ts`
  - `src/test/observation-prompts.test.ts`
  - `src/test/field-partner.test.ts`
- Full `npm test` passed.
- `npm run build` passed.
- Ran the shared web-game client and inspected the resulting screenshot and state output in `output/web-game-main-69`.
- Live seeded browser checks at `http://127.0.0.1:4189/` confirmed:
  - `forest-treeline-corridor` shows `salal-berry` on the forest-owned `log-run` side
  - the same seam shows `mountain-avens` once ownership shifts to `treeline` `thin-canopy`
  - `treeline-tundra-corridor` reaches `ownerBiomeId: "tundra"` with prompt text `What still makes a calmer pocket close to the ground here?`
  - nearby tundra-side carriers included `arctic-willow`, `mountain-avens`, and `purple-saxifrage`
- Browser console errors: `0`

## Queue Guidance

- Close `ECO-20260330-main-69`.
- Leave the queue with no runnable `READY` items.
- Keep `ECO-20260328-main-13` blocked until a server-side secret boundary exists for direct API mode.
