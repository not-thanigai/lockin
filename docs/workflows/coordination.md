# Codex and OpenCode coordination

## Chosen workflow

Use shared repository files (`AGENTS.md`, `MASTER_SPEC.md`, `TASKS.md`, `CURRENT_STATE.md`, `HANDOFF.md`, reviews and reports) with ordinary Git branches/worktrees. Once connected, GitHub Issues/Projects become the shared task board, pull requests become the integration/review unit, and Actions provide deterministic checks. This avoids a custom orchestrator and makes work portable between providers.

Codex recognizes repository `AGENTS.md` as persistent guidance. OpenCode v2 also recognizes root and nested `AGENTS.md`; it combines instruction sources and does not resolve conflicts, so keep one shared source. Official references: [Codex agent instructions](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex), [OpenCode instructions](https://opencode.ai/docs/instructions/), [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects), [GitHub Actions](https://docs.github.com/en/actions/get-started/quickstart), [GitHub pull requests](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request).

## Start a session

```sh
cat AGENTS.md MASTER_SPEC.md CURRENT_STATE.md HANDOFF.md TASKS.md
git status
git branch --show-current
git log -5 --oneline
git fetch origin
```

`git fetch origin` applies only after a remote exists. Before then, note that there is no remote and continue from local history. Never reveal credential values when inspecting provider state.

## Claim and isolate a task

1. Choose a Ready row in `TASKS.md`; if GitHub is configured, confirm no Issue is In Progress or assigned to another owner.
2. Change it to In Progress with one owner, task ID, and branch.
3. Create a branch from current `main` (never develop on `main`): `git switch -c codex/<task-slug> main` or `opencode/<task-slug>`.
4. For simultaneous work, create a distinct worktree: `git worktree add ../lockin-<owner>-<task> -b <owner>/<task> main`. Each agent must use its own worktree. Do not edit the same directory concurrently.
5. If working on an existing branch, check out only after the current owner has handed it off and the working tree is clean or its uncommitted state is explicitly accepted.

## Implement, test and review

- Keep scope narrow and commit logically. Do not commit credentials, generated user data, local databases, APK signing keys, or test personal data.
- Run checks in `AGENTS.md`. For native changes run Android build + emulator smoke; for end-to-end journeys run the relevant Maestro flow. A JS export is not an APK test.
- Request an independent review after a substantial change. The reviewer reads the actual diff and affected modules, records P0-P3 findings in `docs/reviews/`, and does not modify the code. Fix P0/P1, address practical P2, rerun tests, and re-review.
- Update the task row, `CURRENT_STATE.md`, `HANDOFF.md`, review report, `docs/TECH_DEBT.md`, and `docs/testing/reports/` as applicable.

## Commit and integrate

- Inspect `git diff --check` and `git diff` before committing.
- Use focused commits on the feature branch. Never force-push or merge unreviewed changes.
- When GitHub is connected, open a PR linked to its Issue, require CI, review, and resolve all review conversations before merge. Branch protection is a manual repository-admin setting.
- After merge, update local task state, remove the worktree only when clean, and ensure `main` contains the integrated result.

## GitHub availability

This checkout currently has no remote. GitHub Issues, Projects, PRs, Actions, and branch rules are therefore not active yet. The local queue in `TASKS.md` is authoritative until the user connects a GitHub account and a repository remote is created. The repository contains issue/PR templates and workflow definitions ready for that point.

## Tool differences

OpenCode v2.2.7 was found in the local environment. Its current CLI check could list the catalog after redirecting XDG config/data/state/cache directories to `/tmp`; `auth list` reported no authenticated integrations in that isolated run. OpenCode model catalog output does not prove that a model is authenticated or usable. See `model-routing.md`.

Do not rely on an agent subcommand, tool permission, provider, GitHub connector, or model unless that installation exposes and verifies it. If a tool lacks a capability, use the documented Git workflow or leave an explicit setup blocker.
