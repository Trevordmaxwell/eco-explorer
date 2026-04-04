# 2026-04-03 Station Transformation Handoff

Prepared `ECO-20260403-scout-230` against packet `097`.

## Recommendation

Spend `main-230` on the field-station shell, not on more nursery copy.

The strongest next payoff is to let the whole station read as more settled before the player even reads the cards. The current nursery pass already spends the best card-local budget on the mature teaching bed, and the review correctly flagged that surface as near its ceiling. The next visible change should therefore live in the station frame that both `SEASON` and `NURSERY` share.

## Best Main-Agent Slice For `main-230`

Use the existing station header, tab gutter, and lower shell edge as one compact home-place accent band.

Recommended implementation shape:

1. Stay primarily in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts).
2. Derive one small station-growth read from nursery state that already exists:
   - active teaching-bed stage
   - unlocked `log-pile`
   - unlocked `pollinator-patch`
   - compost utility upgrade
3. Draw a tiny shell-level transformation that appears on both station pages:
   - a short settled sill or planter strip along the lower station panel edge
   - one tucked log-stack accent on the sheltered side when `log-pile` is unlocked
   - one tiny bloom cluster on the opposite side when `pollinator-patch` is unlocked
   - a slightly fuller or greener middle read once the bed is growing or mature
4. Keep the cards, subtitle copy, and tab structure intact. The accent should read as part of the station itself, not as another info row.

## Why This Seam

- It makes the station feel changed even when the player opens on `SEASON`, which is where more of the progression loop now lives.
- It spends visual budget outside the mature teaching-bed card, which is already close to the handheld ceiling.
- It uses state the runtime already has, so the pass can stay render-first and calm.
- It sets up the later arrival/departure feel pass by giving the station a stronger baseline identity before motion or punctuation is layered on top.

## Keep Out Of Scope

- no new station page, recap strip, or tab
- no extra nursery text rows
- no save-shape or progression rewiring
- no animation-heavy pass yet; that belongs to `scout-231` / `main-231`

## Verification Target For `main-230`

- focused runtime proof on two seeded station states:
  - an earlier station with no nursery extras
  - an evolved station with at least one growing-or-mature bed plus unlocked extras
- browser captures at `256x160` showing the evolved shell on:
  - `SEASON -> ROUTES`
  - `NURSERY`
- `npm run build`

## Queue Guidance

- Close `ECO-20260403-scout-230` as done.
- Promote `ECO-20260403-main-230` to `READY`.
