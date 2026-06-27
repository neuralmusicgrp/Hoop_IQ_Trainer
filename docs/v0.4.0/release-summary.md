# Hoop IQ Trainer v0.4.0 Release Summary

## Release Name

Expanded IQ Pack + Motion Steps

## Date

2026-06-27

## Summary

v0.4.0 expands Hoop IQ Trainer from the original coach terminology pack into a deeper basketball IQ training tool.

This release adds expanded offensive actions, cuts, screener reads, defensive coverages, motion diagram seed data, a visible Motion Steps panel, and localStorage migration support so returning users receive the expanded term pack without losing coach edits.

## Major Additions

### Expanded Basketball IQ Pack

Added 19 new terms:

- Chicago
- Miami
- Double Drag / 77
- 45 Cut
- Laker Cut
- Slip
- Curl Cut
- Fade Cut
- Over
- Under
- Switch
- Hedge / Show
- Drop
- High Drop
- Low Drop
- Ice / Down
- Blitz / Trap
- Weak
- Low Man

The app now contains 50 terms.

### Motion Steps Data

Seeded step-by-step motion data for 10 actions:

- Pistol
- Zoom
- Spain / Stack Pick-and-Roll
- Hammer Screen
- UCLA Cut
- Chicago
- Miami
- Double Drag / 77
- Zipper Cut
- Ram Screen

Each seeded motion diagram includes:

- Player positions
- Movement events
- Pass events
- Screen events
- Coaching checkpoints

### Motion Steps UI

Diagram Study now includes a Motion Steps panel for terms with motionSteps data.

Players can tap:

- Step 1
- Step 2
- Step 3

The court diagram updates to show the selected step, and the app displays a coaching checkpoint for that moment.

### Metadata Support

The app now preserves:

- tags
- role
- motionSteps

This prepares the app for future diagram filters, player-role learning, quiz improvements, and 2D game mode.

### Dynamic Categories

Categories are now derived from the term list, allowing new categories such as:

- Defensive Coverage
- Defensive Concept

### localStorage Migration

Returning users with older saved v3 terms now receive the expanded 50-term pack automatically.

The migration:

- Preserves existing coach edits
- Adds new default terms
- Backfills new metadata
- Preserves custom user-created terms

## Planning Docs Added

- expanded-iq-pack-plan.md
- motion-diagram-system-plan.md
- 2d-game-mode-plan.md
- supabase-team-dashboard-plan.md
- expanded-iq-terms-source-notes.md
- motion-steps-seed-notes.md
- motion-steps-expanded-notes.md
- motion-steps-ui-notes.md
- local-storage-term-migration-notes.md

## Technical Notes

- No Supabase code was added.
- The app remains static and offline-capable.
- The Motion Steps system is step-by-step playback, not full animation yet.
- JavaScript syntax checks passed for both app files.
- Final branch audit passed before release prep.

## Next Recommended Version

v0.4.1 should focus on polish and testing:

- Manual browser testing
- Mobile layout check
- Motion panel styling refinements
- Add motion steps for more defensive coverages
- Add simple walkthrough mode before full 2D gameplay
