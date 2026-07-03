# v0.4.3 Undefined Diagram Label Hotfix Notes

Problem:

Some generated SVG diagrams displayed "undefined" labels.

Cause:

The app uses generated SVG diagrams, not image files. Some motion-step player objects used label while the older SVG player renderer expected n. Some screen objects also lacked a clean display label.

Fix:

- Added formatDiagramLabel(value, fallback).
- Added safe player label fallback.
- Added safe screen label fallback.
- Updated motionStepMoves players to include both n and label.
- Confirmed generated quiz/study diagrams do not contain undefined text.

No external image files were added.
