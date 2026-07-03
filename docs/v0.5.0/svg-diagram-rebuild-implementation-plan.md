# v0.5.0 SVG Diagram Rebuild Implementation Plan

## Purpose

This plan explains how to rebuild Hoop IQ Trainer diagrams as original SVG teaching diagrams.

The Basketball Action Dictionary PDF is a reference only. We will not copy its images into the app.

## Diagram Design Rules

Each rebuilt diagram should use:

- Clean half-court layout
- Numbered offensive players: 1, 2, 3, 4, 5
- Optional defensive players: x1, x2, x3, x4, x5
- Solid arrows for player movement
- Dashed arrows for passes
- Thick bars for screens
- Small text labels only when helpful
- No undefined labels
- No generic fallback when an action-specific diagram exists

## Technical Approach

Create reusable SVG helper functions:

- svgPlayer()
- svgDefender()
- svgMoveArrow()
- svgPassArrow()
- svgScreen()
- svgText()
- svgCourt()
- svgDiagramShell()

Then create action-specific diagram functions:

- diagramChicago()
- diagramZoom()
- diagramUcla()
- diagramPistol()
- diagramZipper()
- diagramMiami()
- diagramDoubleDrag()
- diagramSpain()
- diagramHammer()
- diagramRam()
- diagramSlip()
- diagram45Cut()
- diagramLakerCut()

## Safer Build Order

### Checkpoint 1

Add helper functions only.

Test:

- App loads
- Existing diagrams still work
- No undefined labels

### Checkpoint 2

Rebuild first 5 reported diagrams:

1. Chicago
2. Zoom
3. UCLA Cut
4. Pistol
5. Zipper Cut

Test:

- Diagram Study
- Name This Action
- Mobile layout
- No undefined text

### Checkpoint 3

Rebuild next 5 core diagrams:

1. Miami
2. Double Drag / 77
3. Spain / Stack Pick-and-Roll
4. Hammer Screen
5. Ram Screen

### Checkpoint 4

Rebuild 3 cut/read diagrams:

1. Slip
2. 45 Cut
3. Laker Cut

### Checkpoint 5

Create audit script for all diagram types.

Audit must check:

- 50 terms still load
- no duplicate IDs
- app runtime passes
- all action-specific diagrams render
- Name This Action diagrams change
- no undefined text appears in generated SVG
- generic diagram only appears for terms not rebuilt yet

## Release Goal

v0.5.0 should ship when Phase 1 diagrams are rebuilt and tested.

## Future Work After v0.5.0

- Rebuild remaining offensive action diagrams
- Add defensive coverage diagrams
- Add animated step playback
- Add coach/team dashboard later
