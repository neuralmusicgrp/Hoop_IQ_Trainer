# AGENTS.md - Hoop IQ Trainer Codex Instructions

## Project

Hoop IQ Trainer is a single-file offline basketball IQ training web app.

Primary files:
- index.html
- v3.0/hoop-iq-trainer-v3.html

Both files must stay in sync unless the task explicitly says otherwise.

## Current Branch

Use the active feature branch:

feature/v0.5.0-action-dictionary-style-diagrams

## Non-Negotiable Rules

1. Do not rewrite the whole app.
2. Do not change app navigation, localStorage, quiz flow, or copyright text.
3. Do not copy or embed images from any reference PDF.
4. Recreate diagrams as original SVG code only.
5. Preserve UTF-8 encoding.
6. Do not introduce broken encoding characters.
7. Avoid new non-ASCII symbols in labels.
8. Use plain labels like "pin-down to handoff" instead of arrows.
9. Keep index.html and v3.0/hoop-iq-trainer-v3.html in sync.
10. Keep the app working offline.

## Encoding Guardrails

Before finishing, check that these corruption patterns do not appear in changed files:

- ?
- ?
- ?
- ?
- ?

If any appear because of the task, fix them before reporting completion.

## Diagram System

The static diagram system is mainly controlled by:

- diagramMoves(type)
- courtSvg(term, compact, motionStep)
- playerSvg()
- moveSvg()
- passSvg()
- screenSvg()
- extraSvg()

Motion-step diagrams are controlled by:

- motionStepMoves(step)

Do not break motion-step diagrams while improving static diagrams.

## Existing SVG Helpers

The app currently includes helper functions such as:

- svgText()
- svgMoveArrow()
- svgPassArrow()
- svgPlayerCircle()

Prefer using existing helpers where practical, but do not over-refactor unless needed.

## v0.5.0 Goal

Improve Phase 1 basketball action diagrams with clearer original SVG teaching diagrams.

Priority diagrams:

1. Zoom
2. UCLA Cut
3. Pistol
4. Zipper Cut
5. Miami
6. Double Drag / 77
7. Spain / Stack Pick-and-Roll
8. Hammer Screen
9. Ram Screen
10. Slip
11. 45 Cut
12. Laker Cut

Chicago already has a new diagram case.

## Testing Checklist

Before reporting completion:

- Run git diff --check.
- Confirm both HTML files have matching diagram cases.
- Confirm no generated SVG contains "undefined".
- Confirm no encoding corruption patterns appear.
- Confirm the app still loads.
- Confirm visual quiz diagrams remain distinct.

## Reporting Format

When done, report:

1. Summary of changed diagram cases.
2. Files changed.
3. Tests/checks run.
4. Any risks or follow-up needed.
