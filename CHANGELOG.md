## v0.9.9 - Card Subtitle High-Contrast Fix

### Changed

- Strengthened bright card subtitle contrast after the v0.9.8 adjustment was too subtle.

### Notes

- No feature, Supabase, authentication, database, backend, diagram logic, or basketball terminology changes were added.

## v0.9.8 - Card Subtitle Contrast Polish

### Changed

- Improved subtitle contrast on bright gradient cards and buttons.

### Notes

- No feature, Supabase, authentication, database, backend, diagram logic, or basketball terminology changes were added.

## v0.9.7 - Team Colors Future Idea

### Added

- Added Team Colors / Team Themes to the public team setup future ideas.

### Notes

- No working theme customization was added.
- No Supabase, authentication, database, backend, or team-color settings code was added.

## v0.9.5 - Mobile UX Polish and Home Flow Cleanup

### Changed

- Simplified the Home screen so the main workout choices focus on Study, Quiz, Diagram Study, Daily 10, and Progress.
- Moved secondary actions into a clearer Coach & App Tools area.
- Renamed the fixed bottom nav item from Edit to Coach.
- Added an active state for the fixed bottom nav across Home, Study, Quiz, Diagram, Stats, and Coach flows.
- Improved mobile bottom-nav readability while preserving touch targets and footer spacing.
- Softened public-facing roadmap language around account setup notes.
- Added a concise helper cue for the Name This Action diagram quiz.
- Improved straightforward form label associations in Coach Tools and Player / Settings.
- Updated README status for the current offline v0.9.5-era app.

### Notes

- No Supabase, authentication, database, backend, schema, SDK, environment variable, or synced-account work was added.
- Basketball term definitions, quiz scoring, localStorage keys, and core app flow were not redesigned.

## v0.9.4 - Visible Global Copyright Footer

### Fixed

- Restored the copyright footer as a global element above the fixed bottom navigation.
- Added bottom spacing so content, copyright text, and footer navigation do not overlap.
- Kept the footer text encoding-safe with HTML entities.

### Notes

- No Supabase, authentication, database, schema, SQL, SDK, environment variable, or backend changes were added.

## v0.9.3 - Mojibake Logo Cleanup

### Fixed

- Fixed remaining mojibake in live and archived app text.
- Replaced the unsafe header basketball emoji/logo with an encoding-safe inline SVG mark.
- Corrected copyright/footer rendering to use safe entities where needed.

### Notes

- No Supabase, authentication, database, schema, SQL, SDK, environment variable, or backend changes were added.

## v0.9.2 - Supabase Schema Planning

### Added

- Added a planning document for the future Supabase database schema.
- Documented planned tables, relationships, indexes, constraints, and plain-language RLS/privacy notes for coach, player, and team features.

### Notes

- No Supabase SDK, environment variables, API keys, SQL, migrations, database tables, backend code, app UI changes, or live Supabase integration was added.

## v0.9.1 - Supabase Auth Provider Selection

### Added

- Added an architecture decision record selecting Supabase as the planned future auth/backend provider.
- Started RLS and privacy planning for future coach, player, and team data.

### Notes

- No Supabase SDK, auth UI, API keys, environment variables, database migrations, live database, backend code, or synced player progress was added.

## v0.9.0 - Team Model and Invite-Code Planning

### Added

- Added planning documentation for the future team data model.
- Added invite-code flow planning for future coach-created teams.
- Added privacy and youth-safety planning notes.
- Added role and permissions planning for Coach, Player, Guest, and future Admin roles.

### Notes

- No live authentication, backend code, database tables, invite-code logic, roster management, assignment UI, progress syncing, or permissions enforcement was added.

## v0.8.10 - App-Wide Audit and Encoding Cleanup

### Fixed

- Cleaned encoding corruption in the live app HTML, including footer/copyright text, smart punctuation, separator dots, and the basketball logo glyph.
- Restored the Settings/App Notes closing HTML structure.
- Confirmed `index.html` and `v3.0/hoop-iq-trainer-v3.html` are aligned.

### Audited

- Verified local role selection defaults, save/reset behavior, display updates, and progress reset role preservation.
- Verified sign-in mockups remain disabled planning UI with no real authentication logic.
- Added a v0.8.10 planning audit note.
- No new features were added.

## v0.8.6 - Social Preview Metadata

### Added

- Added Open Graph and Twitter/X card metadata for public link sharing.
- Added social preview and app icon assets for GitHub Pages previews.

## v0.8.5 - Home Card Color Polish

### Changed

- Updated the How to Use and Quick Start onboarding accents to teal so they read as help/guidance instead of a core workout mode.

## v0.8.4 - How to Use Quick Start Guide

### Added

- Added a focused How to Use guide for players, parents, and coaches.
- Added a First Time Here quick-start card on the Home screen.
- Added guide steps for Study, Diagram Study, Quiz, Name This Action, weakness review, Team Feedback, and Coach Edit Mode.

## v0.4.0 - Expanded IQ Pack + Motion Steps

Released: 2026-06-27

### Added

- Added 19 expanded basketball IQ terms, bringing the app to 50 total terms.
- Added new offensive actions, cuts, screener reads, defensive coverages, and defensive concepts.
- Added motionSteps data for Pistol, Zoom, Spain, Hammer, UCLA, Chicago, Miami, Double Drag / 77, Zipper, and Ram.
- Added a Motion Steps panel to Diagram Study.
- Added step buttons, step descriptions, and coaching checkpoints.
- Added support for tags, role, and motionSteps metadata.
- Added dynamic category generation so new categories appear automatically.
- Added v0.4.0 planning docs for expanded IQ terms, motion diagrams, 2D game mode, and future Supabase team dashboard.

### Fixed

- Added localStorage migration so returning users with older saved terms receive the expanded 50-term pack.
- Preserved existing coach edits while backfilling new default terms and metadata.

### Notes

- No Supabase code was added in this release.
- The app remains static, offline-capable, and GitHub Pages friendly.
- Motion Steps are step-by-step diagrams, not full animation yet.


# Changelog

## v0.3.0 - Visual Basketball IQ

Initial GitHub version.

Added:
- Flashcards
- Mixed quizzes
- Category quizzes
- Missed-answer review
- Daily 10 workout
- Progress dashboard
- Coach Edit Mode
- Import/export JSON
- Half-court diagrams
- Diagram Study mode
- Name This Action diagram quiz
- Copyright attribution
