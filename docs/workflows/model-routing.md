# OpenCode model routing

Last checked: 2026-11-10. OpenCode CLI: v2.2.7.

## Verify each session

Use OpenCode's native provider/model selection; available models depend on provider credentials and project configuration. At session start:

```sh
opencode auth list
opencode models
```

In the TUI, use `/connect` for provider setup and `/models` to pick an available model. The CLI model list is a catalog, not proof of login or session access. The official model selector lists enabled models only when their provider is available; IDs must be copied from that selector instead of guessed. See [OpenCode models](https://opencode.ai/docs/models/), [providers](https://opencode.ai/docs/providers/), and [CLI commands](https://opencode.ai/docs/cli/commands).

## Observed environment (no credentials)

The isolated, redirected-XDG inspection returned `No authenticated integrations`. The model catalog listed:

| Observed model ID | Catalog label | Access / capability status |
|---|---|---|
| `opencode/beam-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/big-pickle` | not classified | Provider returned ID; price/access/context/tool support unknown |
| `opencode/deepseek-v4.1-flash-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/flint-40b-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/glm-5.3-flash-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/iceman-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/inkling-2-small-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/longcat-2.5-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/mimo-v2.6-flash-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/minimax-m3.1-flash-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/nemotron-3.5-lightning-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |
| `opencode/nemotron-3.5-super-vl-free` | free-marked ID | Provider returned ID; auth, context limit, tool support not verified |

Only IDs containing `-free` are recorded as free-marked; this is a name observation, not an account entitlement or billing check. The inspected CLI did not expose context windows or tool-calling metadata. No OpenCode Go connection was configured/verified in that run. Do not select the table's IDs by hardcoding them; re-check `/models` in the active session and verify tool calling before assigning agent work.

## Routing defaults

| Work type | Default |
|---|---|
| Documentation, task updates, formatting, boilerplate, simple UI, basic tests, routine explanations | Lowest-cost verified model with sufficient context and tools |
| Standard diff review, small refactor, straightforward bug | Verified free model; use focused files and diff |
| Architecture, strict TypeScript / React state issues, SQLite migrations, concurrency | Lowest-cost verified model with reliable coding/reasoning and tool use; escalate if two attempts fail |
| Authentication, encryption/recovery, backup/restore, Health Connect, data integrity, security review | Capable paid/Go model or human review from the beginning; never use unverified model/provider for sensitive data |
| Android native build failure or complex performance regression | Start with the least costly verified coding model; escalate when evidence shows complexity |

Do not classify a model as free or Go solely from its name. Check actual OpenCode provider and account availability. Keep personal fitness data out of model prompts unless the user explicitly approves an applicable feature and provider.

## Switching safely

For an unfinished task, record current branch, diff, attempted approaches, errors, tests, and next step in `HANDOFF.md` before changing tools or models. Select the replacement from OpenCode's active `/models` list. Do not change provider credentials or repository defaults automatically. Re-run deterministic tests after the switch.
