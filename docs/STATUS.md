# Engineering status

## Implemented

- Expo SDK 58 / React Native 0.88.1 project with TypeScript strict mode and Expo Router.
- Dark five-tab interface: Today, Food, Activity, Prep, Progress.
- SQLite local storage with initial schema, indexes, foreign keys, and version marker.
- Default profile values and a locally editable target/profile screen.
- Seed foods with raw / cooked preparation labels. Reference rows are marked unverified estimates; they must not be treated as precision-verified nutrition data.
- Food search and gram-based logging; quantity-scaled nutrients are snapshotted into the log. Historical date navigation is available, and missing days are visibly untracked.
- Custom food entry per 100 g.
- Dashboard calorie and macro totals, hydration, weight and workout status.
- Manual hydration, steps, workout, weight, inventory, and prep-task entries.
- Unit tests for nutrient scaling, missing-day average behavior, completeness classification, and calorie remainder.

## Not implemented yet

- Full recipe / saved meal workflows, meal planning, retrospective multi-day bulk entry, natural-language parsing, weekly analytics, adherence, or meal duplication.
- Full grocery list generation, pantry expiry handling, meal prep templates, or inventory deductions.
- Workout routines / sets, Health Connect, progress photos, measurements, or charts.
- Notification scheduling and smart reminders.
- Encrypted photo vault, encrypted export/restore, Google OAuth, or Google Drive backup. No sensitive data is uploaded.
- Data export, restore validation, conflict resolution, and backup history.
- Android emulator / device tests, actual performance measurements, and release APK / AAB.

## Verification

- `npm run typecheck` — passed on the current source.
- `npm test` — passed (5 nutrition helper tests).
- Expo dependency check — SDK native package versions align; the CLI reported dev-only versions needing updates, which were then updated in `package.json`.
- Android build — not run. This environment has Java 21 but no Android SDK / `adb` / Gradle setup.
- Performance — not measured on a device. No performance claims are made.
- Dependency audit — npm reported transitive vulnerabilities during installation; review with `npm audit` before a release build.

## External setup still needed

The current working slice has no external service requirement. Health Connect and Drive are not implemented, so no OAuth client IDs, cloud scopes, or credentials are configured. Adding those integrations requires explicit Android package configuration, Google Cloud OAuth setup, and a recovery-key design before any real backup is enabled.
