# v0.4.1 Motion UI Browser Test Plan

## Goal

Polish the v0.4.0 Motion Steps release after it has been merged into main.

This branch should focus on browser testing, mobile layout, Motion Steps readability, and small safe UI fixes.

## Scope

Allowed:

- Manual browser test notes
- Mobile layout improvements
- Motion Steps panel polish
- Diagram Study readability fixes
- Small CSS fixes
- Small JavaScript safety fixes
- Documentation updates

Avoid:

- No Supabase code
- No major architecture rewrite
- No full 2D game mode yet
- No large terminology rewrite unless a bug is found

## Test Areas

### Home Screen

- Confirm app loads from GitHub Pages.
- Confirm v0.4.0 terms are available.
- Confirm buttons still fit on desktop and mobile.

### Term Library

- Confirm 50 terms appear.
- Confirm new categories appear, including Defensive Coverage and Defensive Concept.
- Confirm expanded terms are searchable/browsable by category.

### Diagram Study

- Confirm terms with motionSteps show the Motion Steps panel.
- Confirm terms without motionSteps hide the Motion Steps panel.
- Confirm Step 1, Step 2, Step 3 buttons work.
- Confirm court diagram changes when tapping steps.
- Confirm Previous and Next Diagram reset to Step 1.

### Motion Steps Visuals

- Confirm player circles are visible.
- Confirm movement arrows are readable.
- Confirm pass arrows are readable.
- Confirm screen markers are readable.
- Confirm checkpoint text is easy to read.

### Mobile Layout

- Confirm Motion Steps buttons are tappable.
- Confirm no horizontal overflow.
- Confirm court diagram scales properly.
- Confirm footer nav still fits.

### localStorage Migration

- Confirm returning users with saved old terms get the expanded pack.
- Confirm coach edits are not wiped.
- Confirm custom duplicated terms are preserved.

## First Fix Candidates

- Improve Motion Steps panel spacing.
- Make active step button more obvious.
- Add a small note explaining that Motion Steps are step-by-step diagrams, not animation yet.
- Improve small-screen court spacing if needed.
