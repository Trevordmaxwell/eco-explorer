# Playtest Comprehension Rubric Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-331`

## Recommendation

Packet `131` lane 2 should create a reusable playtest rubric, not a telemetry system and not a feature-request form. The main pass should add one source-tracked document that helps an adult observer record whether the completed alpha arc is understandable, memorable, science-safe, and emotionally sticky for kids.

Recommended implementation file:

- `docs/playtest-comprehension-rubric.md`

## Main-331 Target

Create a short rubric that can be used with the save snapshots and route-state proof work from other packet `131` lanes, but does not depend on those systems landing first.

The rubric should include:

- a tiny pre-playtest setup note for adults
- a child-friendly post-play prompt set
- an adult observer checklist
- a science-takeaway section focused on ecosystem relationships, not vocabulary quizzes
- a memory/emotion section that asks which places and moments stuck
- a friction section for reading load, controls, wayfinding, and station/journal comprehension
- a feature-request parking-lot rule that separates "cool idea" notes from actual comprehension blockers
- a simple `green / yellow / red` triage scheme for follow-up work

## Guardrails

- Do not collect personal information about children.
- Do not ask kids to score the game numerically or rank themselves.
- Do not turn the rubric into a survey wall; keep it short enough for one completed-arc playtest.
- Do not add runtime code, telemetry, analytics, UI, save schema, route logic, or station behavior.
- Do not promise that every feature request becomes queue work. Repeated comprehension, science, or readability patterns should outrank one-off preferences.

## Suggested Rubric Anchors

Use the completed alpha arc as the reference path:

- first beach outing and `Shore Shelter`
- station return and support choice
- Root Hollow / forest expedition memory
- transition from filed season into `High Pass`
- filed `High Pass` and post-filed settling

Use these as learning checks:

- "What helped something survive here?"
- "What place do you remember most?"
- "Where did you know what to do next?"
- "Where did you need adult help?"
- "What did the game make you curious about in real nature?"

## Suggested Verification

- `npm run validate:agents`
- `git diff --check`
- No build required if the implementation stays docs-only.
