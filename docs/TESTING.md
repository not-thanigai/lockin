# Testing

## Local quality checks

```sh
npm ci
npm run typecheck
npm run lint
npm test -- --ci
```

Current coverage in `src/__tests__/` includes database initialization, nutrient scaling, missing-day averages, day completeness, calorie remainder, and an accessible button interaction test. Screen and repository behavior still need broader coverage.

## Android UI testing

The GitHub Actions Android workflow builds a debug APK, boots a Pixel 6 profile emulator (API 35), installs the app, runs Maestro UI flows, and uploads screenshots, logs, test results, and the APK. The flow currently verifies tab navigation, food search and logging, dashboard totals, background/foreground behavior, process restart, and SQLite persistence.

To run the flow locally, install Android Studio, Android SDK / platform tools, Java 17+, and [Maestro CLI](https://docs.maestro.dev/maestro-cli/how-to-install-maestro-cli). Then:

```sh
npm ci
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
maestro test maestro/foundation-smoke.yaml
```

The current workspace has no local Android SDK, ADB, Gradle, or emulator, so local Android interaction has not been run. The first GitHub emulator run is the source of actual device-execution evidence; check [`TEST_RESULTS.md`](testing/TEST_RESULTS.md) before claiming it passed.

## Test planning and coverage

- [`TEST_PLAN.md`](testing/TEST_PLAN.md) — quality gates and per-feature process
- [`E2E_TEST_COVERAGE.md`](testing/E2E_TEST_COVERAGE.md) — journey coverage and pending features
- [`DEVICE_COMPATIBILITY.md`](testing/DEVICE_COMPATIBILITY.md) — tested devices and configurations
- [`TEST_RESULTS.md`](testing/TEST_RESULTS.md) — latest CI and local test state
- [`KNOWN_TEST_LIMITATIONS.md`](testing/KNOWN_TEST_LIMITATIONS.md) — current gaps
- [`reports/`](testing/reports/) — dated run reports and templates

For release, expand React Native Testing Library coverage across screen behavior; cover external-service behavior through test doubles and separately verify real Android integrations in configured environments. Automated UI checks do not replace human usability testing on a physical device.
