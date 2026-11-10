# Known testing limitations

- The local development environment has no Android SDK, ADB, Gradle, or emulator.
- The current test dataset is the app's deterministic seeded reference-food data plus a clear-state emulator install; no personal data is used.
- Only the foundation navigation / food-log / persistence Maestro journey exists. Most requested product journeys are blocked by features that are not implemented yet.
- React Native Testing Library is installed, but only the shared button interaction has a component test; screen-level coverage is pending.
- No real Google authentication, Drive, Health Connect, or notification service tests are configured.
- The GitHub Actions emulator workflow is an Android emulator test, not physical-device validation.
- Manual usability, alternate screen density/font scale, performance, and battery/memory checks remain outstanding.
- Test records, screenshots, and logs must not be considered evidence unless produced by a completed run and linked from a report.
