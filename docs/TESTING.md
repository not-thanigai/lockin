# Testing

## Local checks

```sh
npm run typecheck
npm test
npm run lint
```

Current unit coverage is in `src/__tests__/nutrition.test.ts`: per-100 g nutrient scaling, averages with missing days, untracked / partial / complete day classification, and remaining calories. The app's initial schema uses `CREATE IF NOT EXISTS`; database migration / repository integration tests have not been added.

## Android checks

With Node 22.13+, Android SDK, and an emulator or device configured:

```sh
npm run android
```

The current workspace has no Android SDK, emulator, or `adb`, so native compilation and runtime permission checks have not been performed. Do not describe the JavaScript bundle export as an APK build.

## Before release

Add integration tests for local database transactions, historical logs, food snapshot stability, offline operation, migration upgrades, export / restore, and duplicate prevention. Exercise notifications, Health Connect, Drive restore, and encrypted photo storage on Android devices. Record cold launch, dashboard query, logging, navigation, and long-list timings on a representative device.
