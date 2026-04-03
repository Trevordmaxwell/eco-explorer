# 2026-04-02 Forest Support Sub-Space Handoff

Prepared `ECO-20260402-scout-113` against packet `054`, the lane-3 brief, the fresh forest-expedition review, the current `forest` geometry, the earlier old-growth pocket and canopy reports, and the live browser artifacts in `output/main-150-browser/`, `output/main-94-bridge-visual/`, `output/main-92-forest-visual/`, and `output/main-103-canopy-visual/`.

## Current Read

The forest vertical family now has its chapter carry.

What still feels slightly thin is not the route anymore. It is the first moment after that route pays off.

Right now:

- the under-root side already has multiple discovered-feeling places
- the upper canopy already has its own sheltered rest and inner pocket
- the new `high-run` carry now makes the bridge and giant-tree approach read as one outing
- but the arrival at the giant-tree base is still mostly a recovery bowl plus climb start

So the next gain should deepen the old-growth arrival itself instead of spending more budget on height or on the cave side.

## Best Next Move

Use `main-151` on one compact trunk-foot support nook inside the existing `old-growth-pocket`.

That should make the player feel like they have reached a small sheltered place at the giant tree before deciding whether to climb farther.

## Option Comparison

### 1. Add one trunk-foot nook inside the current old-growth pocket

What it is:

- use the current `old-growth-pocket` / `old-growth-trunk-interior` footprint
- add one tiny sheltered bay, bark-foot rest, or root-log nook at giant-tree arrival height
- keep the climb and carry intact, but give the destination one small place of its own

Pros:

- deepens the currently thinnest part of the outing
- stays in the same family the review just cleared
- does not reopen canopy height, cave depth, or corridor travel scope
- can reuse already-grounded old-growth carriers such as `woodpecker-cavity`, `western-hemlock-seedling`, `tree-lungwort`, or `canopy-moss-bed`

Tradeoffs:

- needs careful placement so it reads as a place, not just one more helper shelf

Assessment:

- best option

### 2. Extend the bridge carry farther or add another elevated crossing beat

What it is:

- keep pushing the player higher or farther right before the trunk climb

Pros:

- would make the route feel even longer

Tradeoffs:

- spends the budget on more height instead of on the destination
- risks flattening the nice handoff that now already works
- pushes back toward “another traversal proof” instead of “one outing with a real place”

Assessment:

- reject

### 3. Spend the support beat back on the under-root side

What it is:

- add one more filtered-return, basin, or cave-adjacent support pocket

Pros:

- easy to place in an already rich family

Tradeoffs:

- the cave side is no longer the weak point
- would unbalance the outing again just after the new carry fixed the middle

Assessment:

- reject

## Recommendation For `main-151`

Keep the new support sub-space inside the existing old-growth arrival band:

- stay roughly in the current `old-growth-pocket` and `old-growth-trunk-interior` space
- prefer the `x 648-716` and `y 132-190` band around the giant-tree base
- do not touch `old-growth-rise`, the corridor-facing right edge, or the upper canopy tier
- do not widen `worldWidth` or raise `worldHeight`

The desired feel is:

1. finish the `high-run` carry
2. arrive at the giant tree
3. notice one small sheltered old-growth place
4. choose whether to rest there, inspect it, or keep climbing

## Strongest Shape

The best smallest pass is one tucked trunk-foot nook:

- a small bark-foot or root-log bay at the giant-tree base
- readable from the current arrival floor
- recoverable back to `old-growth-main-trunk` and the existing bridge carry
- distinct from the canopy rest above

The important thing is that it should read like a tucked old-growth place, not like a new challenge.

## Scope Boundary

- no new cave chamber
- no new canopy tier
- no new bridge-height extension
- no corridor-door move
- no new cue language
- no route-board, station, or notebook-shell work

If one extra teaching carrier is needed, reuse the current old-growth set rather than broadening the roster.

## Suggested Acceptance For `main-151`

- the giant-tree arrival now has one compact sheltered sub-space that feels like part of the destination outing
- the player can enter and leave that nook cleanly without turning the pocket into a harsher branch
- the `high-run -> bridge -> giant tree` carry still reads clearly
- the trunk climb and the quiet ground route remain recoverable

## Test Suggestions

### Forest biome test

- assert one new authored support platform or depth-facing placement inside the current old-growth arrival band
- keep the assertions focused on staying within the current old-growth pocket footprint instead of growing height or width

### Runtime smoke

- start from the live `high-run` carry or the giant-tree arrival
- confirm the player can settle into the new nook and then rejoin `old-growth-main-trunk` or the pocket floor without a trap state

### Browser proof

- capture one frame where the new nook reads as part of the giant-tree arrival, not a separate branch
- capture one frame that still shows the trunk climb and nearby recovery relationship clearly on the handheld screen

## Queue Guidance

- Close `ECO-20260402-scout-113`.
- Promote `ECO-20260402-main-151` to `READY`.
- Retarget `ECO-20260402-main-151` and `ECO-20260402-critic-124` to this handoff report as the immediate source of truth.
