# 2026-03-30 Regional Travel Post And Approach Handoff

## Scope

Complete `ECO-20260330-scout-79` and narrow `ECO-20260330-main-115` to one compact regional travel follow-on.

## Summary

The directional travel phase is now clean enough that the remaining travel gap is no longer trust or orientation. It is warmth.

Two surfaces still read as generic even though the world now has stronger place logic:

- every interior map-return post still teaches only function through the same `WORLD MAP` cue
- the map-walk HUD still says `TRAVELING TO NEXT STOP`, which is correct but not very chapter-like

That points to a small next pass, not a redesign. `main-115` should make the current map-return posts and map-walk moments feel a little more region-aware without adding another persistent navigation layer.

## Findings

### 1. Map-return posts are coherent but still interchangeable

The last phase made map-return posts spatially trustworthy, but they still feel mechanically identical.

Current implementation seam:

- `src/engine/game.ts` routes every map-return interactable through `getTravelInteractableLabel('map-return', null)`
- that helper always returns `WORLD MAP`

So the player now understands what a post does, but not what kind of outing or return point it represents. That is the clearest place to add calmer regional identity without changing the travel model.

### 2. Map walking still uses a generic “next stop” message

`src/engine/overlay-render.ts` currently shows one walking-only top-left panel:

- `TRAVELING TO NEXT STOP`

That keeps the HUD tiny, which is good, but it also means longer map walks still feel like a transport mechanic instead of an approach into a broader region. After the coherence pass, this is the smallest remaining place to add chapter feel.

## Recommended `main-115` Pass

Keep `main-115` to two linked changes:

1. Add short authored regional post labels through `src/content/world-map.ts`, then use them for map-return interactables instead of the shared `WORLD MAP` string.
2. Replace the generic walking-only map HUD line with one authored destination-region approach cue while the avatar is actively walking on the map.

Good implementation shape:

- extend `WorldMapLocation` with one or two tiny authored strings such as:
  - `mapReturnLabel`
  - `approachLabel`
- keep corridor door labels as they are; they already solved the directional problem
- keep the new approach wording visible only during map walking, not as a persistent idle HUD line

Good label families:

- coast-facing examples:
  - `COAST MAP`
  - `COAST APPROACH`
- interior examples:
  - `INLAND MAP`
  - `INLAND APPROACH`
- alpine examples:
  - `HIGH PASS MAP`
  - `HIGH COUNTRY`

Exact wording can change, but it should stay short, authored, and obviously calmer than a quest prompt.

## Keep Out Of Scope

Leave these for `scout-80` and `main-116`:

- the explicit second-season or next-district invitation
- new route-board cards or station panels
- another map footer strip
- corridor cue rewrites beyond whatever is needed for consistency

This pass should make existing travel surfaces feel more regional, not start the outward invitation step early.

## Verification For `main-115`

- add runtime coverage showing at least one interior post now exposes a region-aware label instead of the generic `WORLD MAP`
- add runtime or text-render coverage for the walking-only map approach cue
- capture one browser state of the post cue and one browser state of the walking HUD to confirm the copy stays readable and small

## Queue Guidance

- Close `ECO-20260330-scout-79`.
- Promote `ECO-20260330-main-115` to `READY`.
- Keep `ECO-20260330-critic-90` parked until the implementation lands.
