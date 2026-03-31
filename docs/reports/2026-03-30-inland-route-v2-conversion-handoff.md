# 2026-03-30 Inland Route V2 Conversion Handoff

## Scope

Scout handoff for `ECO-20260330-scout-77`: prepare the smallest concrete Route v2 pack that makes the inland second act feel more like a stress-and-exposure chapter without reopening the route board structure.

## Current Live Gap

Lane 4 now has the right Route v2 foundation and a stronger middle-habitat pair, but the inland half still reads old-shaped:

- `treeline-stone-shelter` is still a raw `inspect-entry-set`
- `tundra-short-season` is still a raw `inspect-entry-set`
- `treeline-low-fell` is still a raw `inspect-entry-set`

That leaves the back half of the season in an awkward split:

- the `Treeline Shelter Line` board is compact and distinct
- the route replay notes already speak in more authored inland language
- the later `Low Fell` finish already acts like the exposure capstone

What is missing is not another system. It is one pack that turns those three request beats into real notebook-ready outings using the live Route v2 core.

## Best Conversion Rule

Do not move route order and do not add a new Route v2 type.

Use the existing `assemble-evidence` shape for all three beats:

1. convert `treeline-stone-shelter`
2. convert `tundra-short-season`
3. convert `treeline-low-fell`

Leave `tundra-survey-slice` as the inland route's fieldwork capstone.

Why this is the right main-agent slice:

- it makes the inland second act feel authored without reopening the station shell
- it keeps `treeline-low-fell` in `edge-pattern-line`, where it already works as the later exposure capstone
- it reuses live zones, prompts, notes, replay seams, and nursery hooks instead of inventing a second traversal tracker

## Conversion Pack

### 1. `treeline-stone-shelter`

Recommended Route v2 type:

- shelter-reading `assemble-evidence`

Best live path:

- `krummholz-belt -> dwarf-shrub`

Recommended slot family:

- `stone-break`
- `bent-cover`
- `lee-life`

Recommended carriers:

- `stone-break`: `frost-heave-boulder`
- `bent-cover`: `krummholz-spruce`
- `lee-life`: `hoary-marmot`

Recommended zones:

- `krummholz-belt`
- `dwarf-shrub`

Why this works:

- it matches the live `Stone Shelter` note and prompt instead of asking for another generic two-sign count
- it makes the outing read like “where does shelter still hold?” instead of “inspect two alpine things”
- it keeps the treeline beat distinct from the coastal transect by centering on lee-side structure, not a broad gradient walk

Recommended board detail:

- `Match one stone break, one bent cover, and one lee-life clue where treeline still blocks the wind.`

### 2. `tundra-short-season`

Recommended Route v2 type:

- thaw-window `assemble-evidence`

Best live path:

- `snow-meadow -> thaw-skirt`

Recommended slot family:

- `first-bloom`
- `wet-tuft`
- `brief-fruit`

Recommended carriers:

- `first-bloom`: `purple-saxifrage`
- `wet-tuft`: `cottongrass`
- `brief-fruit`: `cloudberry`

Recommended zones:

- `snow-meadow`
- `thaw-skirt`

Why this works:

- it keeps the beat grounded in the current short-season prompt and note carriers instead of asking for a broader tundra rewrite
- it lets the existing `thaw-skirt` proof and `thaw-fringe` replay window make the outing feel more movement-led without turning it into a reach-area task
- it gives the inland route a timing-focused middle beat before the later low-fell exposure capstone

Recommended board detail:

- `Match one first bloom, one wet tuft, and one brief-fruit clue across the thaw edge.`

### 3. `treeline-low-fell`

Recommended Route v2 type:

- exposure-capstone `assemble-evidence`

Best live path:

- `krummholz-belt -> dwarf-shrub -> lichen-fell`

Recommended slot family:

- `last-tree-shape`
- `low-wood`
- `fell-bloom`

Recommended carriers:

- `last-tree-shape`: `krummholz-spruce`
- `low-wood`: `dwarf-birch`
- `fell-bloom`: `mountain-avens`

Recommended zones:

- `krummholz-belt`
- `dwarf-shrub`
- `lichen-fell`

Why this works:

- it matches the live `Tree Line Drops`, `Low Ground Wins`, and `Fell Bloom Window` note cluster better than the current three-sign count
- it lets the beat act like the downstream exposure payoff for the inland chapter without moving it onto another board
- it keeps the later `edge-pattern-line` finish consistent with the same stress-and-exposure language the player learned in treeline and tundra

Recommended board detail:

- `Match one last tree shape, one low wood, and one fell-bloom clue from krummholz to lichen fell.`

## Route-Board Guidance

`main-113` should update only the route-facing copy that needs to reflect the new beat shape:

- `Treeline Shelter Line` next-direction copy should point at matching shelter roles, not two signs
- `Tundra Short Season` detail should point at the thaw-edge trio, not a generic bright-season count
- `Low Fell` detail and the edge-line lead-in should point at the three exposure roles, not “log three clues”

Keep the route shells themselves unchanged:

- `Treeline Shelter Line` stays `treeline-stone-shelter -> tundra-short-season -> tundra-survey-slice`
- `Edge Pattern Line` still ends on `treeline-low-fell`
- do not move `treeline-low-fell` onto the inland route board just because it is part of the same chapter feel

## Best Main-Agent Slice

`main-113` should stay tightly scoped to:

1. convert the three request definitions above to Route v2 `assemble-evidence`
2. add notebook-ready filing text for those three beats
3. update inland and low-fell route-board detail / next-direction copy to match the new roles
4. add focused tests for the new slot logic and the updated board states

Avoid in `main-113`:

- new Route v2 runtime types
- moving route order between boards
- turning `tundra-survey-slice` into another Route v2 beat
- new support options or station rows
- content-file edits unless a tiny text mismatch absolutely forces one

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not collapse all three beats into one zone each; the inland pack should feel more spatial than the old inspect-count chain
- do not widen `tundra-short-season` into a harsher traversal requirement; the thaw-skirt should stay supportive, not gatey
- do not move `treeline-low-fell` off `edge-pattern-line` just to make the chapter feel cleaner
- keep slot names readable and role-shaped rather than taxonomy-heavy
- keep notebook filing, replay-note logic, and support-row behavior unchanged

## Queue Guidance

- close `ECO-20260330-scout-77` with this report
- bump packet `035` so this inland conversion pack is part of the lane record
- promote `ECO-20260330-main-113` to `READY`
- keep `ECO-20260330-critic-88` blocked behind implementation
