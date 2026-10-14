# AGENTS.md - Hoop IQ Trainer Codex Instructions

## Project

Hoop IQ Trainer is a single-file offline basketball IQ training web app.

Primary files:
- index.html
- v3.0/hoop-iq-trainer-v3.html

Both files must stay in sync unless the task explicitly says otherwise.

## Branching

Start scoped work from the current `main` branch on a dedicated feature or fix branch.
Do not treat the historical `feature/v0.5.0-action-dictionary-style-diagrams` branch as current.
Use a reviewed pull request for integration; do not rewrite unrelated app behavior.

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
- screenLineSvg() and screenLabelSvg()
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

## Current Maintenance Scope

- Released baseline before this patch: `v0.9.14` (import safety and quiz reliability).
- Keep coach-customized and imported categories available in study, quiz, Coach Tools, and category progress views.
- Escape imported category labels rendered into HTML.
- Preserve the default 50 basketball terms, existing diagrams and Motion Steps, quiz scoring, saved-data keys, copyright, and offline operation.
- Coach/player sign-in, cloud data sync, animation, and new basketball terminology require separate authorization.
- The v0.5.0 action-diagram milestone is historical; see `docs/` and `CHANGELOG.md` for release history.

## Testing Checklist

Before reporting completion:

- Run git diff --check.
- Confirm both HTML files have matching diagram cases.
- Confirm no generated SVG contains "undefined".
- Confirm no encoding corruption patterns appear.
- Confirm the app still loads.
- Confirm visual quiz diagrams remain distinct.
- Check that imported custom categories appear in category pickers, Coach Tools, and progress after a refresh.
- Reject malformed JSON and out-of-range motion-step coordinates without losing saved terms.
- Verify imported category labels are HTML-escaped in the picker and dashboard.

## Reporting Format

When done, report:

1. Summary of changed diagram cases.
2. Files changed.
3. Tests/checks run.
4. Any risks or follow-up needed.
