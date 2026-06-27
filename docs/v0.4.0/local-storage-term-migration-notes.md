# Local Storage Term Migration Notes - v0.4.0

This checkpoint protects users who already opened earlier versions of Hoop IQ Trainer.

Problem:

- The app stores edited terminology in browser localStorage.
- Older v3 users may have the old 31-term list saved locally.
- Without migration, their browser could keep showing the older saved list instead of the expanded 50-term v0.4.0 pack.

Solution:

- loadTerms now merges saved terms with DEFAULT_TERMS.
- Existing coach edits are preserved when the term ID matches.
- New default terms are added automatically.
- New metadata such as tags, role, and motionSteps is backfilled from defaults.
- Custom user-created terms are preserved.
