# v0.4.2 Name This Action Diagram Refresh Notes

Problem:

A coach/player reported that the diagram in the Name This Action quiz did not appear to change.

Cause:

The diagram quiz was selecting every term with a diagramType value. After the expanded pack and migration work, many terms can carry a generic diagramType, which makes different questions appear visually identical.

Fix:

- Added hasDistinctQuizDiagram(term).
- Limited Name This Action to terms with motionSteps or a non-generic diagramType.
- Rendered the first motion step in the quiz diagram when motionSteps exist.
- Preserved the existing quiz flow and answer logic.

