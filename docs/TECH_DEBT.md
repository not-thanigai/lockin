# Technical debt and release blockers

## P1 — Release blockers

- **Native Android build unverified:** no Android SDK, emulator, `adb`, or generated APK in the environment. Build on an Android-enabled machine before distribution.
- **Requested product scope incomplete:** recipes, meal planning, bulk retrospective logging, workouts with sets, measurement/photo protection, reminders, Health Connect, secure Drive backup / restore, data export, and automation are not implemented. See `STATUS.md`.
- **Database upgrades:** only the initial schema exists; a migration runner and migration tests must be added before changing released schemas.
- **Data provenance:** seeded nutrition values are estimates and not independently reconciled against the source record. Replace / verify the seed set before presenting it as authoritative.

## P2 — Architecture / workflow

- Several screens currently contain SQL queries and writes. Extract repositories and typed domain models before expanding features.
- Many route screen modules combine loading, validation, business calls, and view markup. Split reusable field/list pieces as workflows grow.
- Only database startup has a recoverable error state so far; add consistent per-screen loading / error handling and preserve entered values on storage errors.
- Food entry supports grams only; add ml, servings, custom units, favorites, saved meals, and edit/delete with snapshot-preserving updates.
- The app currently has no offline conflict model because there is no synchronization layer yet.

## P3 — Polish / observability

- No on-device performance measurements, accessibility audit, or chart design yet.
- Nutrition value display and units need a localization / preference layer.
- Add structured, privacy-safe diagnostics for recoverable database and integration failures.

## Deferred until implementation

Do not claim any backup encryption, Android Keystore protection, Health Connect integration, Google authentication, notification delivery, or photo encryption until device tests and independent review cover the actual implementation.
