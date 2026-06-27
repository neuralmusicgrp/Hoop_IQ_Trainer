# Motion Diagram System Plan

## Purpose

Motion diagrams should help players see how an action unfolds over time.

The current app has static half-court diagrams. The next evolution is step-by-step movement:

- Starting positions
- First pass
- First cut
- Screen event
- Handoff or ball screen
- Roll, pop, curl, fade, or cut
- Final read

This teaches players timing, spacing, and sequence.

## Design Rule

Start with step-by-step diagrams before full animation.

The first motion version should let the player tap:

Step 1 -> Step 2 -> Step 3 -> Step 4

Later, those same steps can animate automatically.

## One Source of Truth

The same play data should eventually power:

- Glossary definitions
- Static diagrams
- Motion diagrams
- Diagram quizzes
- Future 2D gameplay

Do not create separate play logic for each feature if avoidable.

## Future Term Data Structure

Each term can eventually support a motionSteps field.

Example shape:

motionSteps:
  - label: Step 1
    description: 1 passes to 2 on the wing.
    players:
      1: x 300, y 430
      2: x 95, y 365
      3: x 505, y 365
      4: x 120, y 150
      5: x 300, y 245
    movements: []
    passes:
      - from: 1
        to: 2
    screens: []
    checkpoint: Start with proper spacing before the action begins.

## Motion Event Types

Supported event types should eventually include:

- playerMove
- pass
- dribble
- handoff
- ballScreen
- backScreen
- downScreen
- flareScreen
- ramScreen
- ghostScreen
- seal
- roll
- shortRoll
- pop
- slip
- curl
- fade
- cut
- decisionPoint

## Teaching Checkpoints

Each step should be able to include a coaching checkpoint.

Examples:

- Come shoulder-to-shoulder off the screen.
- Do not drift away from the handoff.
- Roll hard enough to force help.
- Read the low man before passing.
- If the defender goes under, be ready to shoot.
- If the defense switches, attack the mismatch.

## First Motion Diagram Candidates

Build motion diagrams first for:

1. Zoom
2. Pistol
3. Spain / Stack Pick-and-Roll
4. Hammer
5. UCLA Cut
6. Zipper Cut
7. Ram Screen
8. Chicago
9. Miami
10. Double Drag / 77

## Future Controls

Motion diagrams should eventually include:

- Previous step
- Next step
- Play
- Pause
- Restart
- Speed control
- Show or hide labels
- Show or hide teaching checkpoints

## Future Quiz Types

Motion diagrams unlock new quiz types:

- What happens next?
- Which player sets the screen?
- Which player receives the handoff?
- Where should the screener roll?
- What coverage is the defense using?
- What is the correct read?
- Which player is out of position?

## Future 2D Game Connection

The future 2D game should use the same motionSteps data.

Example:

Coach calls: Zoom.

The player must:

1. Move to the correct starting spot.
2. Cut off the screen.
3. Receive the handoff.
4. Turn the corner.
5. Make the correct read.

The game can score:

- Correct path
- Timing
- Spacing
- Decision-making
- Passing accuracy
- Recognition of defensive coverage
