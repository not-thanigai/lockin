# Phase 1 foundation review

## Scope

Independent inspection of commit `030bb4f` (`Build LOCKIN local fitness tracking foundation`) and affected startup, activity, dashboard, SQLite, and nutrition code. The initial reviewer report was prepared by a separate review agent.

## Initial findings

- **P1 — Initialization race and invisible startup failure.** Concurrent callers could open multiple SQLite connections; startup errors only reached the console.
- **P1 — Step total inflation.** The activity query summed multiple daily readings even though the interface described them as cumulative counter readings.
- **P2 — Fixed weight baseline.** Dashboard progress used 113 kg directly and ignored the editable starting weight.
- **P2 — Architecture and test gaps.** Screens have direct SQL and `any` types; the migration marker is not a versioned migration runner; screen-level error handling and SQLite integration coverage are incomplete.
- **P3 — Compressed route source.** Some route JSX is difficult to review and maintain.

## Fixes in this pass

- Initialization now shares one in-flight promise; a failed attempt resets state for retry and closes the connection when schema setup fails.
- The root route gates screen rendering until local storage is ready and shows a retry state on initialization failure.
- Step inputs are defined as current daily counter readings; the newest reading is displayed instead of summing all readings.
- Weight progress is calculated from the profile's editable starting weight and target, supports either goal direction, and clamps the result.
- Added regression tests for concurrent initialization, retry after open and schema failures, step readings, and weight progress.
- Broader repository separation, complete typed route models, per-screen failure states, and a true migration runner remain deferred in `TECH_DEBT.md`.

## Verification

- `npm run typecheck` — passed after fixes.
- `npm test` — passed: 3 suites, 11 tests.
- Android native build / APK — not run; the local environment lacks Android SDK tooling.

## Review gate

Initial status: **needs fixes**. The independent re-review confirmed the four targeted fixes and the focused checks passed. The overall phase gate remains **open** because full-project lint currently reports 27 errors across 10 files, and the P2 direct-SQL / `any` architecture findings remain documented in `TECH_DEBT.md`. Re-review the full phase after those cleanup items are addressed.
