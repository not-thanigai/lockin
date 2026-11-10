# LOCKIN repository instructions

## Purpose and current stage

LOCKIN is an Android-first, offline-capable fitness and nutrition app. The product requirements are in [`MASTER_SPEC.md`](MASTER_SPEC.md); this file describes how to work in the repository. Read `MASTER_SPEC.md`, `CURRENT_STATE.md`, `HANDOFF.md`, `TASKS.md`, and the relevant docs before taking a task.

The app is an early foundation, not a release-ready product. Do not describe planned integrations as implemented. Read `docs/TECH_DEBT.md` and the latest `docs/reviews/` report before expanding a feature.

## Stack and architecture

- Expo SDK 58, React Native 0.88, TypeScript strict mode, Expo Router, SQLite.
- `app/` contains navigation and screens. `src/repositories/` owns feature SQL and persistence. Pure calculations belong in `src/` domain modules. Integrations belong behind service modules.
- Keep SQLite local-first. A missing day is untracked, never zero intake. Food logs retain nutrient snapshots.
- Profile, nutrition and progress data are sensitive. Do not log them, put them in tests with real user values, or transmit them to services without an approved feature.
- `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, and `docs/INTEGRATIONS.md` describe the current architecture and limits.

## Coding rules

- Keep strict TypeScript. Avoid `any`, unsafe assertions, ignored errors, and unexplained magic values.
- Keep SQL out of route components. Use typed repositories and validate writes at the boundary.
- Handle loading, empty and recoverable error states. Preserve user input after failed writes.
- Use transactions for multi-record changes and idempotent operations for retries.
- Add or update tests and documentation with each behavior change. Never claim a native integration, measurement, or build that was not executed.
- Do not add dependencies unless the feature uses them and they match Expo SDK 58.

## Start-of-task procedure

1. Read this file, `MASTER_SPEC.md`, `CURRENT_STATE.md`, `HANDOFF.md`, `TASKS.md`, and relevant feature docs.
2. Inspect `git status`, `git branch --show-current`, and `git log -5 --oneline`. Do not overwrite or discard uncommitted work.
3. When the GitHub remote is configured, fetch and inspect Issues / Projects for active ownership. Until then, use `TASKS.md` as the local task queue.
4. Claim one Ready task in `TASKS.md`, record the owner and branch, and avoid work claimed by another agent.

## Branch and ownership rules

- Never develop directly on `main`. Create `codex/<task-slug>` or `opencode/<task-slug>` branches from current `main`.
- One active owner per task. Do not run two agents in the same working tree at once. Use separate Git worktrees for simultaneous work: `git worktree add ../lockin-<agent>-<task> -b <agent>/<task> main`.
- Never force-push, commit secrets, or rewrite another agent's changes. Keep commits focused. Use pull requests when a GitHub remote exists.
- Do not merge unreviewed work. Protect `main` with required CI and review rules when repository permissions allow.

## Verification gate

Run checks that apply to the change:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npx expo export --platform android
```

For native changes, also prebuild and run `npm run android` on an Android SDK / emulator. For user journeys, add and run Maestro flows. A JavaScript export is not an Android APK or emulator test. Record actual commands/results in `docs/testing/reports/` and update `TESTING.md`.

## Independent review

After a substantial implementation, have a separate reviewer inspect the actual Git diff and affected modules. Record P0–P3 findings under `docs/reviews/`. Resolve P0/P1 before merge; fix P2 where practical and track deferred work in `docs/TECH_DEBT.md`. After fixes, rerun affected checks and request a re-review. Do not treat the implementation author's self-review as independent.

## Task and handoff rules

- GitHub Issues / Projects are authoritative when the remote and account connection are available. `TASKS.md` mirrors the work queue for agents without GitHub access. Do not claim an Issue or Project was created until verified.
- Before ending a substantial session, update `CURRENT_STATE.md`, `HANDOFF.md`, `TASKS.md`, `docs/TECH_DEBT.md`, and the relevant review / test report. Record the branch, commit, uncommitted files, checks, remaining issues, and next Ready task.
- Keep project knowledge in the repo, not only in chat history.

## Model routing

Follow [`docs/workflows/model-routing.md`](docs/workflows/model-routing.md). Verify models with each tool's own provider/model selector; do not assume Codex credentials or model choices transfer to OpenCode. Use the least costly suitable model for routine work and escalate for security, data integrity, architecture, and difficult debugging. Record only usage information actually exposed by the provider.
