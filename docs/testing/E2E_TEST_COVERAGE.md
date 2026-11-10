# Android end-to-end coverage

Flows live in `maestro/`. Tests use a dedicated clean app state and interact with visible UI controls; they must not manipulate application state to simulate a successful outcome.

| Journey | Status | Flow / dependency |
|---|---|---|
| Foundation navigation, food search/logging, dashboard update, and local persistence | Implemented; CI run pending | `maestro/foundation-smoke.yaml` |
| Onboarding and Google sign-in | Pending implementation | Onboarding screens and isolated test auth provider |
| Retrospective multi-day logging | Pending implementation | Weekly logging feature |
| Recipes and meal planning | Pending implementation | Recipe and planning features |
| Grocery, inventory, and meal preparation | Partial UI only | Transactional inventory deduction feature |
| Workout session and resume | Pending implementation | Session/set workflow |
| Progress measurements and charts | Pending implementation | Measurement and chart features |
| Hydration reminders and notification permissions | Pending implementation | Notification scheduling |
| Offline local logging | Partial capability | Deterministic network controls and sync feature |
| Backup and restore | Pending implementation | Encrypted backup workflow and test account |
| Process recovery | Included in foundation flow | App relaunch after process kill |

Do not move a journey to verified until its test flow passes on Android and the evidence is recorded.
