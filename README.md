<div align="center">

# LOCKIN

### Build better habits. Track what matters.

An Android-first fitness and nutrition tracker built around private, on-device data.

[![Quality](https://github.com/not-thanigai/lockin/actions/workflows/quality.yml/badge.svg)](https://github.com/not-thanigai/lockin/actions/workflows/quality.yml)
[![Android smoke](https://github.com/not-thanigai/lockin/actions/workflows/android-smoke.yml/badge.svg)](https://github.com/not-thanigai/lockin/actions/workflows/android-smoke.yml)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-58-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

> **Early development:** LOCKIN is an active foundation build, not a release-ready app. No APK is published yet. See [current status](docs/STATUS.md) for what works and what remains.

## What it does today

The current app is a local-first foundation for everyday tracking:

- **Today** — calorie and macro totals, hydration, and activity at a glance.
- **Food** — search and log foods by grams, record historical entries, and add custom foods.
- **Activity** — track water, steps, workouts, and body weight manually.
- **Prep** — keep a lightweight inventory and preparation task list.
- **Progress** — review weight history and personal targets.

Data is stored locally in SQLite. Food entries keep a nutrition snapshot, and days without logs stay untracked rather than being treated as zero-intake days. Seed nutrition values are estimates marked as unverified; check labels and preparation details before relying on them.

## Built with

| Layer | Technology |
| --- | --- |
| App | React Native, Expo SDK 58, Expo Router |
| Language | TypeScript with strict checks |
| Local storage | SQLite via `expo-sqlite` |
| Unit tests | Jest and `jest-expo` |
| Automation | GitHub Actions; Android emulator smoke workflow |

## Get started

### Requirements

- Node.js **22.13.1** (see [`.nvmrc`](.nvmrc)) and npm
- Android Studio with Android SDK and an emulator for native Android builds
- Java 21 for the Android Gradle build

### Install and run

```bash
git clone https://github.com/not-thanigai/lockin.git
cd lockin
npm ci
npm start
```

To build and launch on a connected Android device or emulator:

```bash
npm run android
```

The Android SDK must be installed and configured for this command. Native builds and emulator launches have not yet been verified from the local development environment; CI is configured to perform an Android emulator smoke run on relevant pull requests and pushes to `main`.

## Quality checks

Run the same core checks locally before opening a pull request:

```bash
npm run typecheck
npm run lint
npm test -- --ci
```

Exporting the JavaScript bundle is useful for catching bundling problems, but it does **not** produce or verify an APK:

```bash
npx expo export --platform android
```

See [testing and verification](docs/TESTING.md) and the [latest test report](docs/testing/reports/2026-11-10-phase-01-local.md) for exact results and known gaps.

## Roadmap

The next milestones include premium first-launch onboarding, Google Credential Manager sign-in, richer nutrition and recipe workflows, workout sessions, progress history, hydration reminders, and secure backup/restore. These are planned work and are **not** represented as implemented features.

Follow progress in the [engineering status](docs/STATUS.md), [roadmap](ROADMAP.md), and [task queue](TASKS.md).

## Project notes

- [Architecture](docs/ARCHITECTURE.md)
- [Database and local data](docs/DATABASE.md)
- [Integrations and setup](docs/INTEGRATIONS.md)
- [Testing strategy](docs/TESTING.md)
- [Known technical debt](docs/TECH_DEBT.md)
- [Codex / OpenCode contribution workflow](docs/workflows/coordination.md)
- [Full product specification](MASTER_SPEC.md)

## Contributing

Work from a task in [`TASKS.md`](TASKS.md), use a focused `codex/` or `opencode/` feature branch, and open a pull request against `main`. Include the checks you ran and any limitations in the PR description. See the [shared workflow](docs/workflows/coordination.md) and [pull request template](.github/PULL_REQUEST_TEMPLATE.md) before starting.

## License

No license has been added yet. Until one is chosen, all rights remain with the copyright holder; please do not assume the code is available for reuse.
