# Current state

Last updated: 2026-11-10.

## Repository

- Local Git repository: `work/lockin/`.
- Current branch: `codex/phase01-quality`.
- Latest implementation commits are on `codex/phase01-quality`; see `git log -5 --oneline` for the exact branch head.
- GitHub repository: `not-thanigai/lockin` (public), with `origin` configured. `main` and `codex/phase01-quality` are pushed; draft PR #1 is open.
- The first GitHub Actions run on PR #1 failed at `npm ci` because React DOM 18 conflicted with React 19. That is fixed and Quality passed on run 2. Android emulator run 3 booted but failed before Gradle because the action could not find the wrapper from its script working directory. The current branch update corrects the working directory and adds the Maestro flow; the rerun is pending.
- A GitHub Projects board is not configured; the current tool connection exposes repository/issue/PR actions but no Projects creation action.
- The active feature branch includes a Maestro flow, navigation/food test IDs, a React Native Testing Library test, and workflow/report updates. Inspect `git status` before continuing.

## Completed in the application

- Expo SDK 58 / React Native app with dark five-tab navigation.
- Local SQLite schema and estimated reference foods with raw/cooked labels.
- Dashboard, food search/logging for historical dates, custom foods, hydration, manual activity and workout logs, weight entries, editable profile targets, inventory and prep tasks.
- Step readings use latest daily counter reading; weight-goal progress uses editable profile values.
- Dashboard and activity screen data moved into typed repositories.

## Partially completed / not complete

- Google sign-in, onboarding, recipes, weekly bulk food logging, meal planning, generated grocery lists, workouts with sets, encrypted photos, Health Connect, notifications, encrypted Drive backup/restore, export, and automation are not implemented.
- SQLite currently has an initial schema/version marker; a full ordered upgrade migration runner and tests remain required before schema evolution.
- No local Android APK or UI automation run has been verified; the latest CI emulator run failed before Gradle started.
- No on-device performance measurements have been collected.

## Latest checks

- Latest local checks: `npm ci`, typecheck, ESLint, and Jest passed (4 suites / 12 tests); Expo Android prebuild and `bash ./gradlew --version` from `android/` passed; workflow and Maestro YAML parsed.
- Quality workflow passed in GitHub Actions after the React DOM alignment. Android emulator build and Maestro flow have not passed yet.
- Latest local export is a JS bundle, not an APK.
- Android build is unavailable locally: Java exists, but Android SDK / `adb` / Gradle are not installed.
- OpenCode is installed (v2.2.7). A sandboxed `opencode models` / `auth list` check saw catalog models but no authenticated integrations. Full model/provider setup needs a normal OpenCode environment.

See `HANDOFF.md`, `docs/TECH_DEBT.md`, `docs/reviews/`, and `docs/workflows/` before resuming.
