# Test results

See [`reports/2026-11-10-phase-01-local.md`](reports/2026-11-10-phase-01-local.md) for the initial local checks. See [`reports/2026-11-10-human-ui-implementation.md`](reports/2026-11-10-human-ui-implementation.md) for the component test and Android workflow correction record.

## Latest GitHub Actions state

- Quality workflow run 2 passed after aligning React DOM with React 19.
- Android emulator smoke run 2 was cancelled when the PR head advanced.
- Android emulator smoke run 3 failed before Gradle started because the action could not find `./gradlew` from its script working directory.
- Android emulator smoke run 4 booted the emulator but failed because `android-emulator-runner` executes each configured script line separately; a multiline shell function was split apart. The workflow moved to a standalone Bash script.
- Android emulator smoke run 5 was cancelled when the PR head advanced after the emulator step remained in progress for over 17 minutes. The exact stalled command could not be confirmed because GitHub exposes the log archive only after job completion.
- Android emulator smoke run 6 failed at `setup-java`: Gradle caching was initialized before Expo generated `android/`, leaving no Gradle files for its cache key. Java setup has moved after prebuild; run 7 will verify the fix.
- The workflow now builds the APK before emulator startup, caches Gradle, emits phase logs, bounds network/install/UI commands, and has job/step timeouts.
- A deterministic Maestro foundation UI flow and a React Native Testing Library component interaction test are now in the branch's working tree. Maestro has not yet been executed successfully.

Do not describe the emulator build or Maestro flow as passed until the workflow reaches a successful conclusion and its artifacts have been inspected.
