# LOCKIN test plan

## Purpose

Verify behavior at the business-logic, component, database, and actual Android UI levels. A successful TypeScript check or APK build alone does not complete a feature.

## Test levels

| Level | Tool | Current scope | Gate |
|---|---|---|---|
| Unit | Jest | Nutrition metrics and database initialization | Run relevant tests on every PR |
| Component | React Native Testing Library | Accessible `Action` button behavior; broader screen coverage pending | Add with each screen/interaction |
| Android end to end | Maestro | Foundation food logging, navigation, and persistence | Emulator workflow on app changes |
| Runtime diagnostics | ADB / Logcat | Android and React Native fatal errors | Upload logs and screenshots on CI |
| Human usability | Physical Android device | Not yet performed | Required before release |

## Current end-to-end scenario

`maestro/foundation-smoke.yaml` uses the running app UI to reset app data, navigate tabs, search for a seeded food, change its amount, save the entry, verify nutrition on the dashboard, background/reopen, terminate/relaunch, and verify the entry persisted.

## Per-feature checklist

1. Inspect the diff and add regression coverage for business rules.
2. Run `npm ci`, typecheck, lint, relevant Jest tests, and database tests.
3. Build and install the native app on an Android emulator for app/native changes.
4. Run affected Maestro flows and inspect the actual rendered screen.
5. Capture screenshots, Maestro reports, logs, and failure evidence.
6. Fix root causes and repeat failed checks; never mark skipped tests as passed.
7. Request independent review and record remaining limitations.

## Release coverage

See [`E2E_TEST_COVERAGE.md`](E2E_TEST_COVERAGE.md), [`DEVICE_COMPATIBILITY.md`](DEVICE_COMPATIBILITY.md), [`KNOWN_TEST_LIMITATIONS.md`](KNOWN_TEST_LIMITATIONS.md), and [`TEST_RESULTS.md`](TEST_RESULTS.md).
