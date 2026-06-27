# 2D Game Mode Plan

## Purpose

The future 2D game should turn Hoop IQ Trainer from a glossary app into an interactive basketball IQ trainer.

Players should not only memorize terms. They should learn to recognize actions, move to the correct spots, make the right reads, and understand timing.

## Core Concept

The game should teach execution.

Example:

Coach calls: Zoom.

The player must:

1. Start in the correct spot.
2. Cut off the screen.
3. Receive the handoff.
4. Turn the corner.
5. Make the correct read based on the defense.

## Design Rule

Do not build the full game before the motion diagram data is ready.

The game should eventually use the same motionSteps data as the diagrams.

One source of truth should power:

- Glossary
- Static diagrams
- Motion diagrams
- Quizzes
- Game mode

## First Game Mode: Run the Action

The first playable mode should be simple:

- The app shows a half-court.
- The coach call appears at the top.
- The player controls one offensive player.
- The player must move through the correct route.
- The app checks if the player follows the right path.

Example actions:

- Backdoor Cut
- V-Cut
- UCLA Cut
- Zipper Cut
- Zoom
- Pistol
- Hammer
- Spain

## Future Controls

Possible player controls:

### Desktop

- Arrow keys or WASD to move
- Spacebar to pass or receive
- E to screen or handoff
- R to reset

### Mobile

- Touch drag to move
- Tap button to pass
- Tap button to screen
- Tap button to handoff
- Tap button to shoot or drive

## Scoring System

The game can score:

- Correct starting location
- Correct movement path
- Correct timing
- Correct spacing
- Correct screen angle
- Correct read
- Correct pass
- Avoiding wrong spots

## Mistake Feedback

The game should teach after mistakes.

Examples:

- You drifted too wide. Come tighter off the screen.
- You left too early. Wait for the screen.
- You missed the handoff window.
- You rolled when the action called for a pop.
- You drove into help instead of reading the low man.
- You passed late against the blitz.

## Defensive Read Mode

Later, the game can add defenders and coverages:

- Over
- Under
- Switch
- Drop
- Hedge
- Ice
- Blitz
- Weak

The player must recognize the coverage and choose the correct response.

Examples:

- Defender goes under: shoot or re-screen.
- Defense switches: attack mismatch.
- Defense blitzes: pass quickly.
- Big drops: use floater, pull-up, pocket pass, or short roll.
- Defense ices: reject the screen or move the ball.

## Development Stages

### Stage 1: Planning

- Define game modes.
- Define court coordinate system.
- Define playable player movement.
- Define scoring logic.

### Stage 2: Motion Diagram Data

- Add motionSteps to terms.
- Add player positions.
- Add movement paths.
- Add pass and screen events.

### Stage 3: Walkthrough Mode

- Player taps through the action step by step.
- No free movement yet.

### Stage 4: Guided Game Mode

- Player controls one player.
- App shows target path.
- App grades movement.

### Stage 5: Read and React Mode

- Add defenders.
- Add coverages.
- Player must make decisions.

### Stage 6: Team Mode

- Supabase can save player scores, progress, and coach assignments.

## Technical Notes

The first game version can be built inside the existing single-file app using:

- HTML canvas or SVG
- JavaScript game loop
- Local state
- No backend
- No Supabase yet

Supabase should only be added after the local game and motion data structure are stable.

## First Playable Candidates

Start with simple movement actions:

1. Backdoor Cut
2. V-Cut
3. UCLA Cut
4. Zipper Cut
5. Zoom

Then add more complex actions:

6. Pistol
7. Hammer
8. Ram
9. Spain
10. Double Drag / 77
