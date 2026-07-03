# v0.4.4 Motion Step Undefined Text Hotfix Notes

Problem:

Some motion-step terms, including Chicago, Zoom, UCLA Cut, Pistol, and Zipper Cut, displayed "undefined" in the diagram/motion-step area.

Cause:

The app uses generated SVG diagrams and motion-step data, not image files. Some motion steps had labels/checkpoints but did not always include every text field expected by the UI.

Fix:

- Added safeMotionText(value, fallback).
- Added fallback text for missing motion step descriptions.
- Added fallback text for missing motion step checkpoints.
- Preserved the SVG diagram system.
- No image files were added.

