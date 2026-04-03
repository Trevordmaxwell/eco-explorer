# 2026-04-02 Treeline Shelter Route V2 Handoff

Scout handoff for `ECO-20260402-scout-114`.

## Scope

Prepare one more chapter-like Route v2 conversion so `main-152` can spread the stronger outing feel into another family without reopening the station shell, adding a new save ledger, or broadening lane 4 into content-pack work.

## Best Target

Convert `treeline-stone-shelter` into an ordered sheltered-treeline chapter on `treeline-shelter-line`.

Recommended slot order:

1. `bent-cover`
2. `stone-break`
3. `lee-life`

That keeps the route on the existing `assemble-evidence` seam while giving the family a clearer mini-chapter shape:

- first read the wind-bent treeline itself in `krummholz-belt`
- then read the freeze-lifted lee-pocket ground in `dwarf-shrub`
- then finish on the animal life using that shelter in the same lee pocket

## Why This Is The Best Next Spread

`treeline-stone-shelter` is already the cleanest small conversion target in packet `055`:

- it is already Route v2 `assemble-evidence`
- its carriers already imply one calm spatial progression
- its family already has replay-note seams that reinforce the same read
- it sits in a different family from the newly strengthened `edge-pattern-line`, so the chapter feel spreads instead of clustering in one route

The three live carriers already map well onto an authored shelter read:

- `krummholz-spruce` -> `bent-cover` in `krummholz-belt`
- `frost-heave-boulder` -> `stone-break` in `dwarf-shrub`
- `hoary-marmot` -> `lee-life` in `dwarf-shrub`

That makes the outing feel like "follow the last treeline shelter into its lee pocket" instead of "collect any three alpine clues."

## Why The Alternatives Are Weaker Right Now

### `tundra-short-season`

This is still a promising later follow-on, but it is a weaker next chapter conversion:

- `purple-saxifrage` and `cloudberry` both live in `snow-meadow`
- only `cottongrass` cleanly pulls the route into `thaw-skirt`
- an ordered pass there would feel more artificially staged and less spatially truthful than the treeline shelter route

### The older `coastal-shelter-line` family

That family still contains good material, but it is not the smallest clean next spread:

- `forest-study` still compresses a broader forest cluster
- `coastal-comparison` still reflects older inspect-set structure
- strengthening that family would likely pull on bigger board or request structure rather than one tight Route v2 retrofit

Packet `055` wants one compact chapter spread, and `treeline-stone-shelter` is the narrowest high-confidence fit.

## Best Main-Agent Slice For `main-152`

`main-152` should stay tightly scoped to:

1. add ordered `slotOrder` to `treeline-stone-shelter` in `src/engine/field-requests.ts`
2. update the route summary, next-direction copy, and filed-note wording so they teach the new sheltered order
3. update the `treeline-shelter-line` board beat detail to read like one ordered lee-pocket chapter
4. add focused tests for ordered advancement, first-missing-slot guidance, board wording, and one targeted runtime station flow

## Runtime Shape

Do not add a new route type.

The clean move is:

- keep `treeline-stone-shelter` on `assemble-evidence`
- add `slotOrder: ['bent-cover', 'stone-break', 'lee-life']`
- let the current ordered-assemble runtime enforce the first missing slot
- keep the existing notebook-ready filing seam

This reuses the same ordered route behavior already proven on `treeline-low-fell` and `forest-expedition-upper-run`.

## Save Compatibility

Do not add save normalization for this pass unless implementation uncovers a real truth gap.

The current ordered `assemble-evidence` seam already resolves first-missing-slot guidance from saved `evidenceSlots`, so older partial `treeline-stone-shelter` progress can stay compact:

- if an older save logged `stone-break` first, the next needed slot will still correctly become `bent-cover`
- the progress label stays generic `x/3 clues`, so older saves do not create a misleading stage-specific string

This should follow the same lighter compatibility approach cleared in the `treeline-low-fell` review rather than repeating the heavier `ROOT HOLLOW` migration work.

## Route-Board Guidance

The board should stay compact and only teach the stronger order.

Recommended copy direction:

- route summary should frame the family as leaving canopy cover and following the last sheltered treeline pocket before tundra thaw
- `Treeline Shelter` beat detail should name the order clearly, ideally `Krummholz Belt` first and the lee-pocket ground/life second
- `nextDirection` should explicitly tell the player to log bent cover first, then stone break, then lee life
- the logged text should keep the same "last sheltered treeline pocket" conclusion, but now echo the ordered read

The existing replay notes already fit this target:

- `Early Lee` supports seeing bent shelter shapes first
- `Rime Shelter` supports comparing the lee-pocket ground later

So `main-152` should reuse those seams instead of authoring another replay layer.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

`src/test/save.test.ts` is optional only if implementation decides a direct older-progress regression is worth pinning.

## Guardrails

- do not add a new route type
- do not widen the station shell or support row
- do not open another notebook page or ledger
- keep the chapter readable at `256x160`
- keep the copy science-safe and place-first, not checklist-heavy

## Queue Guidance

- close `ECO-20260402-scout-114` with this report
- bump packet `055` to version `2`
- promote `ECO-20260402-main-152` to `READY`
- leave `ECO-20260402-critic-125` blocked behind implementation
