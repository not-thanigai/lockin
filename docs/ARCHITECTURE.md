# Architecture

## Current shape

- `app/` owns Expo Router routes and presentation.
- `src/components.tsx` and `src/theme.ts` provide reusable visual primitives and tokens.
- `src/database.ts` owns SQLite opening, initial schema creation, and reference-food seeding.
- `src/foodLog.ts`, `src/nutrition.ts`, and `src/dates.ts` contain small domain utilities.
- `src/__tests__/` covers pure nutrition helpers.

The current foundation is local-first and has no application backend. Expo SQLite persists user data. Food log rows keep a nutrition snapshot so later edits to a food do not rewrite history.

## Boundaries to preserve

Keep UI routes focused on input and rendering. Move SQL into feature repositories before adding additional screens or integrations. Keep nutrition calculations pure and independently testable. Inject integration services into use cases instead of calling platform APIs from UI components. Any external synchronization must run after the local UI is usable and must never be required to read or write local records.

## Decisions

- Expo SDK 58 and New Architecture are selected to match the current stable Expo release and Android-first deployment.
- SQLite uses WAL and foreign keys for local durability and relational integrity.
- A consumption row stores both UTC timestamp and local calendar date to support history around timezone changes.
- Reference nutrition values are marked unverified estimates until a source-specific import and review pipeline is established.

## Current compromise

The current screens still issue several feature queries directly through the database module. This is a temporary foundation shortcut and is recorded in `TECH_DEBT.md`; extract repositories before expanding the feature set.
