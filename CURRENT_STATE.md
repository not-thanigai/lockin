# Current state

Last updated: 2026-11-10.

## Repository

- Local Git repository: `work/lockin/`.
- Current branch: `codex/phase01-quality`.
- Latest commit: `030bb4f` — `Build LOCKIN local fitness tracking foundation`.
- GitHub repository: `not-thanigai/lockin` (public), with `origin` configured. `main` and `codex/phase01-quality` are pushed; draft PR #1 is open.
- GitHub Actions ran on PR #1 but both workflows initially failed at `npm ci` due to a React / React DOM peer mismatch. The mismatch is fixed locally by aligning React DOM to React 19; corrected workflow results are pending the next push.
- A GitHub Projects board is not configured; the current tool connection exposes repository/issue/PR actions but no Projects creation action.
- The current branch has uncommitted foundation fixes, repository extraction, lint/dependency changes, and docs. Do not switch or discard them.

## Completed in the application

- Expo SDK 58 / React Native app with dark five-tab navigation.
- Local SQLite schema and estimated reference foods with raw/cooked labels.
- Dashboard, food search/logging for historical dates, custom foods, hydration, manual activity and workout logs, weight entries, editable profile targets, inventory and prep tasks.
- Step readings use latest daily counter reading; weight-goal progress uses editable profile values.
- Dashboard and activity screen data moved into typed repositories.

## Partially completed / not complete

- Google sign-in, onboarding, recipes, weekly bulk food logging, meal planning, generated grocery lists, workouts with sets, encrypted photos, Health Connect, notifications, encrypted Drive backup/restore, export, and automation are not implemented.
- SQLite currently has an initial schema/version marker; a full ordered upgrade migration runner and tests remain required before schema evolution.
- No Android APK/AAB or emulator execution has been verified.
- No on-device performance measurements have been collected.

## Latest checks

- Latest local checks: TypeScript passed, full ESLint passed, Jest passed (3 suites / 11 tests), and `npx expo export --platform android` produced the Android JavaScript bundle.
- CI workflows now define quality checks and an Android emulator build/launch smoke job. The first remote run confirmed dependency installation needs the new React DOM alignment; rerun is pending.
- Latest local export is a JS bundle, not an APK.
- Android build is unavailable locally: Java exists, but Android SDK / `adb` / Gradle are not installed.
- OpenCode is installed (v2.2.7). A sandboxed `opencode models` / `auth list` check saw catalog models but no authenticated integrations. Full model/provider setup needs a normal OpenCode environment.

See `HANDOFF.md`, `docs/TECH_DEBT.md`, `docs/reviews/`, and `docs/workflows/` before resuming.
