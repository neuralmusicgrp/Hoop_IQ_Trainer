# v0.4.0 Expanded IQ Pack Plan

## Goal

Expand Hoop IQ Trainer beyond the original coach homework list into a deeper basketball IQ training tool.

This branch prepares the app for:

- Expanded terminology
- Motion diagram data
- Future animated diagrams
- Future 2D gameplay
- Future Supabase team dashboard planning

## Core Rule

Do not add Supabase code yet.

This version should keep the app static, offline, and safe while preparing the structure for future cloud features.

## Expanded IQ Terms

Planned additions:

### Offensive Actions

- Chicago
- Miami
- Double Drag / 77
- 45 Cut
- Laker Cut

### Screener Reads / Cuts

- Slip
- Curl Cut
- Fade Cut

### Defensive Coverages

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

## Motion Diagram System

Current diagrams are static.

v0.4.0 should begin moving toward motion diagrams by adding a future-ready structure:

- diagramType
- diagramNote
- motionSteps
- player starting spots
- ball movement
- player movement
- screen events
- teaching checkpoints

The first version of motion diagrams may be step-by-step instead of fully animated.

## Future 2D Game Concept

The future game should teach players to execute actions, not just name them.

Possible game modes:

- Run the Action
- Name the Action
- Beat the Clock
- Read the Defense
- Make the Right Pass
- Attack the Coverage

Example:

Coach calls: Zoom.

Player must:
1. Start in the correct spot.
2. Cut off the screen.
3. Receive the handoff.
4. Turn the corner.
5. Make the correct read.

## Supabase Planning

Supabase should wait until the local app structure is stronger.

Future tables may include:

- teams
- players
- coaches
- terms
- motion_diagrams
- quiz_sessions
- quiz_answers
- player_progress
- team_invites

## v0.4.0 Deliverables

- Add expanded IQ terms to local app data.
- Add tags for term type, role, difficulty, and coverage.
- Add motionSteps field to term objects.
- Add planning docs for motion diagrams.
- Add planning docs for 2D game mode.
- Add Supabase planning doc only, no Supabase code.
