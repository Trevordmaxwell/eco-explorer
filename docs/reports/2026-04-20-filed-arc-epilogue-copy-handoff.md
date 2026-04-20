# Filed Arc Epilogue Copy Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-355`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-2`

## Scout Read

Packet `137` asks lane 2 for one filed-arc synthesis line after `High Pass` is filed. The safest surface is the existing station homecoming copy helper, because it is already a copy-only lane-2 seam and now resolves during earned field-station homecoming state.

The current strongest filed milestone line is:

- `High Pass filed. Treeline stone and talus close the field arc.`

That is compact, but it reads mostly as closure. The next pass should make it feel a little more like an epilogue/revisit invitation while still avoiding season-three promises or route-task reopening.

## Recommended Main Chunk

Update only the `treeline-high-pass` homecoming line to:

- `High Pass filed. Revisit how stone, shelter, and talus connect.`

Why this line:

- celebrates the relationship the route taught instead of just naming completion
- makes revisit optional and reflective, not a required task
- does not promise season three, biome six, new route content, rewards, crafting, combat, inventory, or a broader planner
- stays under the existing `FIELD_STATION_HOMECOMING_COPY_TEXT_MAX` budget

## Suggested Files

- `src/engine/field-station-homecoming-copy.ts`
- `src/test/field-station-homecoming-copy.test.ts`
- `docs/reports/2026-04-20-filed-arc-epilogue-copy-implementation.md`

## Acceptance

- Only the `treeline-high-pass` homecoming line changes.
- Tests assert the exact new line through the chronological milestone case.
- The existing compact-copy and repeated-clue-list guard still pass.
- No station state machine, route replay behavior, save schema, route definition, map behavior, geometry, journal layout, atlas layout, or new UI surface changes.

## Verification

- `npm test -- --run src/test/field-station-homecoming-copy.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
