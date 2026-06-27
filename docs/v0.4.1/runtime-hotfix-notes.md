# Runtime Hotfix Notes - v0.4.1

Problem:

The v0.4.0 release could fail during app startup because loadTerms called normalizeTerms before a valid normalizeTerms function was available.

Fix:

- Added a safe normalizeTerms function before mergeWithDefaultTerms and loadTerms.
- Kept metadata preservation for tags, role, and motionSteps.
- Verified runtime load with a Node-based DOM/localStorage harness.

