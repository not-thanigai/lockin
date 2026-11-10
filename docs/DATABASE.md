# Database

The app opens `lockin.db` with `expo-sqlite`, enables WAL and foreign keys, creates the initial schema idempotently, and seeds reference foods using `INSERT OR IGNORE`.

## Current tables

`profile`, `foods`, `food_logs`, `water_logs`, `weight_logs`, `workouts`, `activity_logs`, `tasks`, `inventory`, and `schema_migrations`.

Indexed access paths include food-name search and food logs by local date / timestamp. Food logs retain food name, preparation state, amount, and nutrient totals as a historical snapshot. A missing date has no `food_logs` rows and remains untracked rather than being interpreted as zero intake.

## Migration policy

The initial schema is safe to initialize on a fresh database. `schema_migrations` currently records version 1, but there is not yet an upgrade runner for later schema versions. Before shipping an upgrade that changes a table, add a forward-only migration with a transaction, schema-version test, and rollback / recovery strategy. Never modify past migration contents after release.

## Date and numeric rules

- Store event instants as ISO UTC strings.
- Store the device-local `YYYY-MM-DD` consumption date separately for day views.
- Nutrients are currently stored as floating point totals per logged row; display rounding happens in the UI.
- Seed and custom food nutrition uses a per-100-gram basis in the current UI. Millilitre, serving, and custom unit conversion is not implemented yet.
