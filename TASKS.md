# LOCKIN task queue

GitHub Issues and Projects become the shared source of truth once the repository remote and GitHub account are connected. Until then, this file is the local queue. Keep only one owner on each active task. Statuses: Backlog, Ready, In Progress, Review Required, Changes Requested, Approved, Done, Blocked.

Priority: P0 critical, P1 high, P2 medium, P3 low. Complexity: S, M, L.

| ID | Task | Priority | Owner | Status | Dependencies | Related issue | Branch | Completion criteria |
|---|---|---:|---|---|---|---|---|---|
| OPS-001 | Establish repo-based Codex/OpenCode workflow, handoff, tasks, templates, and CI | P1 | Codex | Review Required | None | [#3](https://github.com/not-thanigai/lockin/issues/3) | `codex/phase01-quality` | Shared instructions, task queue, handoff, templates and CI committed; local config checks documented. |
| FND-001 | Finish foundation quality gate and close review findings | P1 | Codex | In Progress | None | [#2](https://github.com/not-thanigai/lockin/issues/2) | `codex/phase01-quality` | Typecheck, lint, tests, Expo Android export pass; targeted review findings fixed and re-reviewed; deferred debt recorded. |
| AUTH-001 | Implement premium first-launch welcome and progressive setup | P1 | Unassigned | Ready | FND-001 | Not created | — | Splash / welcome / first-use setup persists progress, respects reduced motion, and returning users open dashboard. |
| AUTH-002 | Integrate Google-only Android Credential Manager sign-in | P1 | Unassigned | Blocked | AUTH-001; Google OAuth config | Not created | — | Native Credential Manager flow, branded button, session recovery, account switching/sign-out, cancellation/error handling; tested with configured Android client. |
| AUTH-003 | Complete profile setup and confirmed target recommendations | P1 | Unassigned | Backlog | AUTH-001 | Not created | — | Profile/preferences saved progressively; estimates explained and target changes require confirmation; tests cover invalid/missing values. |
| NUT-001 | Food CRUD, units, favorites, saved meals, and nutrition provenance | P1 | Unassigned | Backlog | FND-001 | Not created | — | Raw/cooked distinction, snapshot history, edit/delete, sources and conversions tested. |
| NUT-002 | Weekly retrospective logging and missing-day recovery | P1 | Unassigned | Backlog | NUT-001 | Not created | — | Multi-day entry/copy/edit and completeness analytics preserve untracked days; duplicate prevention tested. |
| MEAL-001 | Recipes and meal planning | P1 | Unassigned | Backlog | NUT-001 | Not created | — | Recipe scaling and planned meal creation update targets without prematurely deducting inventory. |
| PREP-001 | Grocery list, inventory, expiry and meal prep | P1 | Unassigned | Backlog | MEAL-001 | Not created | — | List generation, purchased items, prep completion and inventory deductions are transactional and tested. |
| FIT-001 | Workout routines, active sessions, sets, resume and history | P1 | Unassigned | Backlog | FND-001 | Not created | — | Session save/resume, volume, records and history persist across app relaunch. |
| FIT-002 | Weight, measurements and private local progress photos | P1 | Unassigned | Backlog | FND-001 | Not created | — | Trends use valid records only; photos remain locally encrypted and excluded from backup. |
| HYD-001 | Hydration history, edit/delete and target adherence | P2 | Unassigned | Backlog | FND-001 | Not created | — | Daily totals and edits update dashboard and reminder suppression correctly. |
| AUTO-001 | Daily plan, task priorities, recurring tasks and adherence | P1 | Unassigned | Backlog | NUT-002; PREP-001; FIT-001 | Not created | — | Priorities include reasons; missed tasks recover without duplication; incomplete logs never imply zero intake. |
| NOTIF-001 | Local notification schedules, quiet hours and actions | P2 | Unassigned | Backlog | AUTO-001 | Not created | — | Permission is requested just in time; completed/snoozed tasks suppress repeats; Android timing caveats documented. |
| HC-001 | Health Connect activity read integration | P2 | Unassigned | Backlog | FIT-001 | Not created | — | Native permission-denial and provenance flows; emulator/device tests; offline behavior retained. |
| SYNC-001 | Encrypted Drive backup, recovery and restore | P1 | Unassigned | Backlog | Auth; data model; export | Not created | — | AES-GCM package, user-controlled recovery, `drive.appdata`, validation/conflict behavior and fresh-install restore tests. |
| PERF-001 | Android performance baselines and regression checks | P2 | Unassigned | Backlog | Core flows | Not created | — | Cold/warm launch, dashboard, search, save, navigation and scrolling measured on a representative device. |
| QA-001 | Maestro user journeys and Android release verification | P1 | Unassigned | Backlog | Core feature tasks | Not created | — | Deterministic flows, emulator installation, screenshots/logs, no release blockers, reviewed test report and APK. |

When GitHub is connected, create Issues from these entries and a GitHub Project with status, priority, phase, owner, dependency, and complexity fields. Then update the Related issue column with real issue URLs and make GitHub authoritative.
