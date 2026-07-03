# v0.5.0 Action Dictionary Style Diagrams Backlog

## Goal

Rebuild the app's basketball diagrams as cleaner original SVG teaching diagrams inspired by the clarity of the Basketball Action Dictionary reference PDF.

Important:

- Do not copy/paste PDF images into the app.
- Use the PDF as a teaching reference only.
- Recreate original diagrams with our own SVG court, arrows, labels, screens, passes, and movement paths.
- Keep app copyright attribution: Anthony Boyd / Worldmedia Publishing & Consulting LLC.

## Why This Version Matters

The app currently works, but some diagrams are still too generic or rough.

v0.5.0 should make the visual learning side stronger by improving:

- player spacing
- court readability
- numbered player labels
- screen bars
- movement arrows
- dashed pass lines
- action-specific court layouts
- diagram quiz clarity

## Phase 1 Priority Diagrams

These are the first diagrams to rebuild because they are visible, important, or recently reported during testing:

1. Chicago
2. Zoom
3. UCLA Cut
4. Pistol
5. Zipper Cut
6. Miami
7. Double Drag / 77
8. Spain / Stack Pick-and-Roll
9. Hammer Screen
10. Ram Screen
11. Slip
12. 45 Cut
13. Laker Cut

## Phase 2 Offensive Actions

After Phase 1, rebuild or improve:

1. Pick-and-Roll
2. Pick-and-Pop
3. Roll
4. Pop
5. Step-Up Screen
6. Backdoor Cut
7. Flare Screen
8. Flex Screen
9. Iverson Cut
10. Rip Screen
11. Down Screen
12. Curl Cut
13. Fade Cut

## Phase 3 Defensive Coverage Diagrams

Then add simple coverage diagrams for:

1. Over
2. Under
3. Switch
4. Hedge / Show
5. Drop
6. High Drop
7. Low Drop
8. Ice / Down
9. Blitz / Trap
10. Weak
11. Low Man

## Phase 4 Diagram System Improvements

After the core diagrams are rebuilt:

- Add better arrow types:
  - solid movement arrow
  - dashed pass arrow
  - screen bar
  - DHO handoff marker
  - ball-screen marker
  - defensive coverage marker

- Add diagramType-specific layout functions.
- Add a reusable SVG helper system.
- Add diagram audit tests to prevent:
  - undefined labels
  - repeated generic diagrams in visual quiz
  - missing player labels
  - missing screen labels

## Phase 5 App Integration

After diagrams are improved:

- Update Diagram Study.
- Update Name This Action quiz.
- Confirm diagrams change every question.
- Confirm motion-step diagrams still work.
- Confirm mobile layout remains readable.
- Confirm no runtime errors.
- Confirm no undefined text.

## Reference PDF Notes

Useful reference areas from the Basketball Action Dictionary PDF:

- Chicago: pages 45-46
- Miami: pages 25 and 134-135
- Pistol: pages 166-178
- UCLA Cut: pages 216-219
- Zipper: pages 229-232
- Double Drag / 77: pages 19 and 65-72
- Spain / Stack: pages 32 and 198-200
- Slip: page 31
- 45 Cut: pages 14-16
- Pick-and-roll coverages: pages 96-114

These are reference points only. Recreate original diagrams in our own app style.

## Completion Checklist

- [ ] Branch created
- [ ] Backlog committed
- [ ] New SVG helper plan written
- [ ] Phase 1 diagrams rebuilt
- [ ] Phase 1 diagrams tested in Diagram Study
- [ ] Phase 1 diagrams tested in Name This Action
- [ ] No undefined labels
- [ ] No repeated generic diagrams for visual quiz
- [ ] Mobile browser check
- [ ] Desktop browser check
- [ ] Changelog updated
- [ ] Release tagged

## Suggested Release Tag

v0.5.0-action-dictionary-style-diagrams
