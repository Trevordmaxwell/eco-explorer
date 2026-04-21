# Alpha Contact Sheet Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-404`
- Packet: `.agents/packets/149-alpha-content-parity-and-dead-copy-prune.json`
- Lane: `lane-3`

## Finding

`docs/alpha-screenshot-proof-manifest.md` already provides the right lane-3 proof surface for representative alpha screenshots: it names stable frame ids, ignored `output/alpha-screenshot-proof/` targets, state fields, pass criteria, and non-goals. The remaining packet-149 work is not a new screenshot automation or runtime pass. It is a small parity/docs cleanup so the manifest more clearly reads as the current five-biome alpha contact-sheet recipe.

The manifest currently has useful detailed sections, but the top-level reviewer path still asks readers to infer the representative five-biome set from the longer tables. For alpha parity, the main pass should add one compact contact-sheet index near the top that names the live five-biome representative rows in review order and points to the existing detailed frame ids below.

## Main Scope

- Update `docs/alpha-screenshot-proof-manifest.md` only unless a direct manifest typo forces a tiny report correction.
- Add a short `Representative Five-Biome Contact Sheet` section near the top of the manifest.
- Include one compact row for each current alpha biome/place family:
  - beach and coast opener/shelter/tidepool frames
  - coastal scrub handoff frame
  - forest giant-tree and Root Hollow frames
  - treeline / High Pass frames
  - tundra relief frames
- Make the section explicit that this is a recapture recipe for the current completed alpha arc, not a promise of more biomes, screenshots committed to git, route-state assertions, or new content.
- Preserve the existing detailed frame tables, state-field checklist, quick path check, and non-goals.

## Non-Goals

- Do not change runtime code, biome geometry, route behavior, station/menu behavior, save schema, authored science facts, journal/notebook copy, package scripts, screenshot automation, or tests.
- Do not commit generated screenshots, state dumps, browser logs, or new `output/` files.
- Do not create a new visual baseline system; this is a source-tracked reviewer index over the manifest that already exists.
- Do not edit lane-1 command docs, lane-2 content-copy surfaces, or lane-4 route/support wording.

## Suggested Verification

- `rg -n "Representative Five-Biome Contact Sheet|beach|coastal scrub|forest|treeline|tundra|output/alpha-screenshot-proof" docs/alpha-screenshot-proof-manifest.md`
- `npm run validate:agents`
- `git diff --check`

`npm run build` is not required if the main pass remains docs-only.
