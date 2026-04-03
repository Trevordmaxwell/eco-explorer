# 2026-04-02 Nursery Habitat Memory Handoff

Prepared for `ECO-20260402-scout-126` in lane 2.

## Recommendation

Use the live `TEACHING BED` seam for the first habitat-memory pass instead of adding another nursery card, extra, or page.

The best narrow implementation is:

1. add one optional authored `memorySummary` line to `NurseryProjectDefinition`
2. author that line for only three nursery projects:
   - `sand-verbena-bed`
   - `salmonberry-bed`
   - `crowberry-bed`
3. surface the line only when that project is mature in the teaching bed

That keeps the new warmth inside the existing nursery card where the player is already looking, instead of spreading memory copy across the station.

## Why This Seam

- It stays secondary. The nursery remains a quiet station subview instead of turning into a second journal, planner, or garden-management layer.
- It is place-linked. Mature plants are the moment when the station already feels most personal, so one remembered-habitat line reads as a payoff instead of another instruction.
- It avoids cross-lane churn. Route-support hint logic, world-map travel, and progression rules do not need to move.
- It uses content the game already teaches well:
  - `sand-verbena` remembers bright shifting dunes
  - `salmonberry` remembers the cooler wetter forest edge
  - `crowberry` remembers low cold ground and short-season calm

## Preferred Content Scope

Keep the first pass to three authored lines only.

Suggested direction:

- `sand-verbena-bed`: bright dune memory
- `salmonberry-bed`: cool wet edge memory
- `crowberry-bed`: low cold ground memory

Hold these for the second follow-on unless the first pass proves too thin:

- `dune-lupine-bed`
- `mountain-avens-bed`
- `beach-strawberry-bed`

## Implementation Notes For `main-164`

- Add `memorySummary?: string` to `NurseryProjectDefinition`.
- Keep the new line out of save data.
- Surface it only inside the mature active-bed state in the nursery overlay.
- Do not replace the existing reward or route clue text.
- If space gets tight, prefer replacing the mature footer line (`ENTER clears the bed`) before widening the card or adding a new row.

## Verification Target

- focused nursery coverage for the new authored memory line
- one runtime or browser check on the nursery view with a mature supported plant in the bed
- `npm run build`

## Queue Guidance

- Close `ECO-20260402-scout-126` as done.
- Promote `ECO-20260402-main-164` to `READY`.
