# LOCKIN

**Discipline. Consistency. Results.**

LOCKIN is an Android-first, local-first fitness and nutrition tracker built with Expo, React Native, TypeScript, Expo Router, and SQLite. The current working slice provides a dark dashboard, editable personal targets, food search and logging (including historical dates and explicit raw/cooked states), custom foods, hydration, manual steps and workout logs, weight history, and a lightweight grocery inventory / task list.

## Requirements

- Node.js 22.13 or newer (the current Expo SDK requirement).
- npm.
- Android Studio with Android SDK / emulator for native builds.
- A development build for testing native integrations.

## Run

```sh
npm install
npm run typecheck
npm test
npm start
```

For Android, install the SDK and set `ANDROID_HOME`, then run `npm run android`. This generates the native Android project and installs it on a connected device or emulator. `npm run android` is not available in an environment without the Android SDK.

## Local data

SQLite stores profile values, food reference entries, food logs with nutrition snapshots, water, activity, workouts, tasks, and inventory. Dates are stored using the device's local calendar date alongside UTC timestamps. Days without entries remain untracked; they are never counted as zero-calorie days. Reference nutrition values are estimates and carry an unverified source label in the database. Check food labels and preparation state before relying on an entry.

## Current status

See [`docs/STATUS.md`](docs/STATUS.md) for completed work, tested behavior, unimplemented integrations, and environment limits. This repository is a working foundation; it does not yet meet the full LOCKIN master prompt's definition of done. No APK has been generated.
