# Decisions

## DEC-001 — Local-first application data

Use SQLite as the primary store. The app must remain usable offline and must not require Google Drive synchronization to render local information. No personal fitness data is sent remotely until an explicit integration is implemented and disclosed.

## DEC-002 — Portable agent instructions

Use one root `AGENTS.md` for shared Codex and OpenCode operating rules. Do not add tool-specific prompt copies while both tools recognize repository `AGENTS.md`.

## DEC-003 — Task management fallback

Use GitHub Issues/Projects as the shared source of truth once a remote/account is available. Until then, use `TASKS.md` locally and mark every GitHub issue as not created; do not fabricate IDs.

## DEC-004 — Branch isolation

Never develop on `main`. Use owner-prefixed feature branches, one owner per task, and separate Git worktrees for simultaneous agents.

## DEC-005 — Model selection

Do not hardcode or infer model availability. At OpenCode session start, inspect connected providers and model catalog. Use the lowest-cost suitable model for routine tasks; escalate for architecture, migrations, authentication, encryption, synchronization, and difficult debugging. Provider/model metadata not exposed by CLI must be recorded as unknown, not guessed.
