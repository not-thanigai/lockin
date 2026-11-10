# LOCKIN Master Specification

This file preserves the user-provided product and engineering requirements as the authoritative specification. Addenda are appended in the order received.

# LOCKIN — COMPLETE MASTER CODEX BUILD PROMPT

## YOUR ROLE

Act as a senior Android application engineer, React Native architect, product designer, database engineer, performance engineer and QA engineer.

Build **LOCKIN**, a complete personal fitness and nutrition management application.

This is a real software engineering project, not a UI demonstration.

You are responsible for:
- Architecture.
- Application implementation.
- Database design.
- UI and UX.
- Android integrations.
- Nutrition calculations.
- Automated workflows.
- Data security.
- Performance.
- Testing.
- Documentation.
- Android APK generation.

Do not stop after creating a project skeleton, mockup, or partially functioning prototype.

Make sensible engineering decisions without repeatedly asking for approval. If a feature requires credentials, permissions, external configuration or a user action, implement the integration properly and document the remaining setup.

Prioritise a working, fast, maintainable application over unnecessary architectural complexity.

---

# 1. PRODUCT IDENTITY

**Application:** LOCKIN

**Package:** `com.lockin.fitness`

**Tagline:** Discipline. Consistency. Results.

**Platform:** Android first.

**Development environment:** Linux using Codex.

**Primary objective:** Execution and consistency.

**Automation preference:** Highly automated.

**Privacy preference:** Convenience first, while maintaining sensible protection of personal data.

LOCKIN is a personal fitness operating system.

It combines:
- Nutrition tracking.
- Meal planning.
- Recipe management.
- Weekly retrospective food logging.
- Grocery and inventory management.
- Meal preparation.
- Workout tracking.
- Activity tracking.
- Weight and body measurements.
- Hydration.
- Reminders.
- Progress analytics.
- Automated daily and weekly planning.
- Cloud backup and restoration.

The application should minimise the effort required to maintain a consistent fitness routine.

The guiding principle is:

**The user should spend more time executing their plan than managing the application.**

---

# 2. USER PROFILE AND INITIAL CONFIGURATION

Create an editable profile with these initial values:

| Field | Initial value |
|---|---:|
| Age | 21 |
| Sex | Male |
| Height | 180 cm |
| Starting weight | 113 kg |
| Target weight | 90 kg |
| Daily calories | 2,300 kcal |
| Protein | 190 g |
| Carbohydrates | 228 g |
| Fat | 70 g |
| Daily steps | 8,000 |
| Daily water | 3,000 ml |
| Resistance training | 3 sessions/week |

These are starting defaults, not hardcoded restrictions or medical prescriptions.

Allow the user to edit every target.

The app must support:
- Weight in kg or lb.
- Height in cm or ft/in.
- Water in ml or fl oz.
- Food quantities in grams, millilitres, servings and custom units.
- Custom calorie and macro targets.
- Custom activity targets.
- Custom training schedules.
- Dietary preferences.
- Food exclusions.
- Allergies.
- Budget preferences.
- Cooking equipment.
- Meal schedules.
- Wake-up and sleep times.

Default meal schedule:
- First meal: 12:00 PM.
- Second meal: 4:00 PM.
- Dinner: 9:30 PM.

These times must be editable.

Allow the user to skip breakfast without treating it as a missed task.

---

# 3. TECHNICAL STACK

Use a modern, Android-compatible React Native architecture.

Preferred stack:

- React Native.
- Expo with the current stable SDK.
- TypeScript with strict mode.
- Expo Router.
- React Native New Architecture.
- SQLite using `expo-sqlite`.
- Zustand for lightweight state management.
- Zod for validation.
- React Hook Form where appropriate.
- Expo Notifications for local notifications.
- Android Health Connect integration.
- Google OAuth 2.0 for account authentication.
- Google Drive API for cloud backup.
- Android Keystore for encryption key protection.
- Expo Camera / Image Picker for progress photographs.
- A lightweight charting solution compatible with the chosen Expo SDK.

Use compatible library versions. Do not blindly install outdated packages or mix incompatible versions.

Use `npx expo install` for Expo-managed dependencies.

Use a development build rather than relying on Expo Go for native integrations.

Do not introduce a backend unless a genuinely necessary feature cannot be implemented locally.

The app must be local-first and offline-capable.

## Architecture principles

Separate the application into:

1. Presentation layer.
2. Application/business logic layer.
3. Data access layer.
4. Local database.
5. External integrations.
6. Background and scheduled tasks.

Keep business logic independent of UI components.

Use repositories and service modules for database operations and integrations.

Avoid putting calculations, database operations and networking directly inside screen components.

Use typed models and schemas.

Use database migrations from the beginning.

Do not build one enormous component or one enormous application file.

---

# 4. PERFORMANCE — NON-NEGOTIABLE REQUIREMENT

LOCKIN must feel fast, light and responsive.

Performance is a core product requirement.

Do not sacrifice responsiveness for decorative effects or excessive abstraction.

## Startup

- Show the application shell immediately.
- Load only essential dashboard data initially.
- Defer nonessential analytics and historical queries.
- Avoid unnecessary startup network requests.
- Do not wait for Google Drive synchronisation before showing the dashboard.
- Do not wait for Health Connect before rendering local data.
- Use a lightweight loading state rather than a full-screen spinner.
- Cache frequently accessed data.
- Avoid unnecessary application-wide state updates.

## UI responsiveness

Target:
- Smooth 60 FPS interaction on supported devices.
- Immediate visual feedback for taps.
- No blocking database calls on the UI thread.
- No expensive calculations during rendering.
- No unnecessary screen re-renders.
- No full-screen reloads after adding food or water.
- No layout jumps when data loads.
- Fast tab switching.
- Smooth scrolling through long histories.

Use:
- Memoised components where useful.
- Stable callbacks and keys.
- Virtualised lists.
- Pagination for long histories.
- Efficient list item components.
- Optimised images and thumbnails.
- Lazy loading for nonessential screens.
- Debounced search.
- Indexed database queries.
- Batched database writes.
- Background processing for expensive tasks.

Avoid:
- Rendering thousands of historical entries at once.
- Large uncompressed images.
- Heavy animations.
- Excessive shadows and blur.
- Unnecessary dependencies.
- Repeated database queries inside render loops.
- Recalculating all historical analytics after every small action.

## SQLite performance

Use:
- Appropriate indexes.
- Prepared statements.
- Transactions for multi-record changes.
- Query projections that retrieve only necessary columns.
- Pagination.
- Efficient date-range queries.
- Database migrations.
- Foreign keys where appropriate.

Use a consistent date and timezone strategy.

Store timestamps in UTC and preserve the user's local consumption date separately where needed.

## Performance testing

Measure actual performance rather than claiming it is fast.

Test:
- Cold launch.
- Warm launch.
- Dashboard load.
- Food search.
- Food logging.
- Weekly history scrolling.
- Tab switching.
- Database operations.
- Backup and restore.

Record measurements in a performance document.

Identify and fix avoidable bottlenecks before release.

---

# 5. VISUAL DESIGN AND DESIGN SYSTEM

Create a polished, minimal, dark interface.

Visual direction:

| Element | Colour |
|---|---|
| Main background | `#101114` |
| Cards | `#1C1F25` |
| Elevated cards | `#242831` |
| Primary text | `#FFFFFF` |
| Secondary text | `#9297A1` |
| Primary accent | `#45B58A` |
| Warning | Restrained amber |
| Critical | Restrained red |

Use:
- Consistent typography.
- Consistent spacing.
- Rounded but restrained cards.
- Clear hierarchy.
- Simple icons.
- Thin progress indicators.
- Subtle separators.
- Minimal animation.
- Appropriate touch targets.
- Accessible contrast.

Avoid:
- Excessive gradients.
- Excessive shadows.
- Giant decorative illustrations.
- Overly colourful dashboards.
- Dense tables on mobile.
- Too many cards.
- Unnecessary gamification.
- Social feeds.
- Clutter.

## Visual priority system

The app must visually communicate the priority of tasks without overwhelming the user.

Use four priority levels:

**Critical**
- Red or restrained warning treatment.
- Only for genuinely time-sensitive or important issues.
- Examples: expired ingredients, failed backup requiring attention, overdue essential task.

**High**
- Amber treatment.
- Important tasks that should be completed soon.
- Examples: grocery purchase needed before meal prep, scheduled workout approaching.

**Normal**
- Neutral treatment.
- Routine tasks and ordinary reminders.

**Completed**
- Muted green treatment.
- Clearly marked as completed without dominating the interface.

Do not use red for ordinary incomplete tasks.

Every priority indicator must have a reason.

Do not create fake urgency.

## Task cards

Each task card should show:
- Task name.
- Short context.
- Priority.
- Due time, if applicable.
- Completion status.
- One clear primary action.

Use small labels, progress bars, subtle coloured side indicators or icons to communicate priority.

Do not fill every card with colour.

## Navigation

Use five bottom tabs:

1. Dashboard.
2. Food.
3. Activity.
4. Prep.
5. Progress.

Settings and profile should be accessible without cluttering the primary navigation.

---

# 6. DASHBOARD — DAILY OPERATING SYSTEM

The dashboard is the most important screen.

It should answer:

1. What has been completed?
2. What needs attention?
3. What should happen next?

Display:

## Daily overview

- Current date.
- Weight and goal progress.
- Calories consumed.
- Calories remaining.
- Protein consumed.
- Carbohydrates.
- Fat.
- Steps.
- Water.
- Workout status.
- Meal preparation status.

Use compact visual indicators.

Do not display every available metric at once.

## Daily priority

Generate one primary recommended action based on:
- Incomplete tasks.
- Upcoming deadlines.
- Nutrition progress.
- Workout schedule.
- Grocery availability.
- Meal preparation schedule.
- Hydration.
- User preferences.

Examples:
- Buy chicken before tomorrow's meal preparation.
- Complete today's scheduled workout.
- Log dinner.
- Prepare tomorrow's meals.
- Complete the remaining step target.

Display why the task is being recommended.

## Upcoming tasks

Show the next few tasks, ordered by actual priority and due time.

Allow:
- Complete.
- Snooze.
- Reschedule.
- Skip.
- Edit.

## Quick actions

Include:
- Log food.
- Repeat previous meal.
- Add water.
- Log weight.
- Start workout.
- Add a grocery item.
- Complete meal-prep task.
- Open weekly food log.

All quick actions should require as few interactions as reasonably possible.

## Daily operating plan

Automatically create a simple daily plan from the user's recurring schedule.

The plan should adapt when tasks are completed, missed or rescheduled.

Do not require the user to manually rebuild their day every morning.

---

# 7. FOOD TRACKING

Build a complete nutrition tracking system.

## Food logging

Support:
- Search.
- Manual food entry.
- Food quantity.
- Serving size.
- Gram and millilitre units.
- Calories.
- Protein.
- Carbohydrates.
- Fat.
- Fibre.
- Meal category.
- Consumption date.
- Consumption time.
- Notes.
- Favourites.
- Food history.

Allow users to edit and delete entries.

## Raw and cooked distinction

This is essential.

Clearly distinguish:
- Raw chicken.
- Cooked chicken.
- Raw rice.
- Cooked rice.
- Raw vegetables.
- Cooked vegetables.
- Other foods where preparation changes nutritional density.

Never silently apply raw nutritional values to cooked weights.

When a user searches for a food, clearly label its preparation state.

## Food database

Seed the database with commonly used Indian foods:

- Eggs.
- Chicken breast.
- Chicken thighs.
- Fish.
- Whey protein.
- Milk.
- Curd.
- Greek yoghurt.
- Rice.
- Roti.
- Oats.
- Fruits.
- Vegetables.
- Nuts.
- Lentils.
- Cooking oils.
- Common spices and sauces.

Include both raw and cooked versions where appropriate.

Use reputable nutrition sources.

Use ICMR–NIN Indian Food Composition Tables as a key reference for Indian ingredients.

Use USDA FoodData Central or other reputable sources where appropriate.

Clearly record:
- Data source.
- Serving basis.
- Preparation state.
- Whether values are estimated or verified.

Do not invent precision.

## Custom foods

Allow unlimited custom foods.

Users can:
- Create.
- Edit.
- Duplicate.
- Archive.
- Delete.
- Favourite.

Store a nutritional snapshot with every historical food log so database edits do not alter previously recorded consumption.

## Fast logging

Provide:
- Recent foods.
- Favourite foods.
- Frequently used quantities.
- Saved meals.
- Search suggestions.
- Repeat previous meal.
- Duplicate yesterday.
- Quick quantity adjustments.

The common logging workflow should be extremely fast.

---

# 8. BULK FOOD LOGGING AND RETROSPECTIVE TRACKING

This is a core feature.

The user may forget to log food for several days or an entire week.

LOCKIN must make it easy to reconstruct historical consumption.

Never interpret a day without food entries as zero calories.

## Weekly food logging

Create a weekly view showing Monday through Sunday.

Each day should show:
- Breakfast.
- Lunch.
- Snacks.
- Dinner.
- Calories.
- Protein.
- Carbohydrates.
- Fat.
- Logging completeness.

Allow the user to add food to any previous day.

Support multi-day editing.

## Bulk entry methods

### Method A — Repeat previous meals

Allow users to:
- Copy one meal.
- Copy multiple meals.
- Copy an entire day.
- Copy a day to multiple selected dates.
- Change quantities before saving.

Prevent accidental duplicate entries.

### Method B — Saved meals

Add recipes and saved meals to any historical date.

Allow quantity changes before saving.

### Method C — Natural-language entry

Create a quick text-entry interface.

Example:

"Monday lunch 250g chicken, 200g cooked rice and 150g curd. Monday dinner 3 eggs and 2 rotis. Tuesday lunch chicken biryani."

Parse the text into proposed meals and ingredients.

Display the parsed result for confirmation.

Allow corrections before saving.

If quantities, food identities or raw/cooked states are ambiguous, ask for clarification rather than silently guessing.

Natural-language parsing may use an optional AI service, but:
- It must not be mandatory for basic functionality.
- API keys must not be hardcoded.
- Remote processing must be disclosed.
- A manual fallback must always exist.
- Parsed results must be confirmed before writing to the database.

### Method D — Approximate meal entry

Allow approximate quantities when exact measurements are unavailable.

Options:
- Small portion.
- Medium portion.
- Large portion.
- Estimated grams.
- Approximate calories and macros.
- Custom notes.

Clearly label estimates.

### Method E — Restaurant and mixed meals

Allow recording meals without exact recipes.

Allow the user to:
- Enter a meal name.
- Add approximate ingredients.
- Enter estimated calories and macros.
- Add notes.
- Save the meal for reuse.

## Missing-day recovery

Identify:
- Fully logged days.
- Partially logged days.
- Completely untracked days.

Offer:
- Fill missing meals.
- Copy a similar day.
- Add an approximate daily summary.
- Mark as intentionally untracked.

Do not pressure the user to invent data.

## Weekly nutrition analytics

Calculate:
- Average calories.
- Average protein.
- Average carbohydrates.
- Average fat.
- Number of fully logged days.
- Number of partially logged days.
- Number of untracked days.
- Estimated-data proportion.

Always state how many days contributed to an average.

Do not calculate a seven-day average from three days of data without clearly labelling it as a three-day average.

Keep logging completeness separate from nutritional adherence.

Historical entries must retain:
- Consumption date.
- Creation timestamp.
- Last edited timestamp.
- Nutritional snapshot.
- Estimated or verified status.

Support batch saving and undo where practical.

---

# 9. MEAL AND RECIPE BUILDER

Build a complete custom meal and recipe system.

## Custom meals

Allow unlimited meals.

Users can:
- Create.
- Edit.
- Duplicate.
- Archive.
- Delete.
- Save as templates.
- Add ingredients.
- Change quantities.
- Set preferred times.
- Assign categories.
- Log directly.

## Recipe builder

Each recipe must support:

- Recipe name.
- Ingredients.
- Ingredient quantities.
- Units.
- Raw/cooked states.
- Preparation instructions.
- Cooking method.
- Cooking time.
- Preparation time.
- Temperature.
- Number of servings.
- Total nutrition.
- Nutrition per serving.
- Tags.
- Favourites.
- Optional photographs.

Cooking methods:
- Air fryer.
- Oven.
- Stovetop.
- Boiling.
- Grilling.
- Custom method.

Changing servings must automatically scale ingredients and nutrition.

## Recipe scaling

If a recipe changes from two servings to four, double the ingredients and calculate the new nutritional totals.

Allow fractional servings.

## Meal templates

Save combinations of ingredients and recipes as reusable meals.

Allow one-tap logging.

---

# 10. WEEKLY MEAL PLANNER

Create a calendar-based weekly planner.

Features:
- Daily view.
- Weekly view.
- Meal scheduling.
- Recurring meals.
- Meal templates.
- Meal rescheduling.
- Planned versus consumed status.
- Planned versus actual nutrition.
- Recipe-based grocery generation.

When a meal is missed, offer a sensible rescheduling action.

Do not silently delete planned meals or historical records.

---

# 11. GROCERY AND INVENTORY MANAGEMENT

Build an automated grocery manager.

## Inventory

Each item should support:
- Name.
- Brand.
- Quantity.
- Unit.
- Purchase date.
- Expiry date.
- Minimum stock.
- Estimated consumption.
- Optional price.
- Notes.

## Automatic inventory deductions

When a recipe is marked as prepared, calculate ingredient usage.

Deduct quantities only after the user confirms preparation.

Do not deduct ingredients just because a meal was planned.

Allow manual correction.

## Automatic shopping lists

Generate shopping lists using:
- Upcoming meal plans.
- Recipe ingredients.
- Existing inventory.
- Minimum stock levels.
- Recurring purchases.
- Expiry dates.

Calculate the quantity needed after accounting for available stock.

Support:
- Shopping lists.
- Shopping history.
- Purchased status.
- Recurring shopping days.
- Manual additions.
- Item categories.

## Expiry and stock alerts

Highlight:
- Items approaching expiry.
- Items below minimum stock.
- Ingredients required for upcoming meals.
- Items that need replenishing.

Use sensible priorities.

---

# 12. MEAL PREPARATION MANAGER

Build a dedicated meal-prep system.

Default recurring preparation days:
- Sunday.
- Wednesday.

These must be configurable.

Create recurring checklists for:

1. Review upcoming meals.
2. Check inventory.
3. Generate shopping list.
4. Purchase ingredients.
5. Prepare ingredients.
6. Marinate food.
7. Cook meals.
8. Portion meals.
9. Store meals.
10. Record prepared quantities.

Support:
- Task completion.
- Task scheduling.
- Snoozing.
- Rescheduling.
- Missed-task recovery.
- Task history.
- Recurring task templates.
- Meal-prep reminders.

Completed historical occurrences must never disappear when the next recurring occurrence is generated.

Allow meal-prep tasks to be linked to recipes and inventory items.

---

# 13. WORKOUT TRACKING

Build a complete workout tracker.

## Workout routines

Provide editable starter routines:

- Workout A.
- Workout B.
- Workout C.

Do not lock users into a fixed training programme.

Allow:
- Custom routines.
- Custom exercises.
- Exercise categories.
- Equipment.
- Sets.
- Repetitions.
- Weight.
- Rest duration.
- Notes.
- Exercise order.

## Workout execution

During a workout:
- Show current exercise.
- Show current set.
- Record repetitions.
- Record weight.
- Provide rest timer.
- Move to next set.
- Skip exercise.
- Edit workout.
- Finish workout.

Support unfinished workout saving and resuming.

Do not lose workout progress if the application closes.

## Workout history

Display:
- Workout history.
- Total sessions.
- Weekly training frequency.
- Exercise progression.
- Personal records.
- Volume trends.
- Previous performance for each exercise.

Calculate volume consistently.

## Progressive overload

Show previous performance when beginning an exercise.

Provide suggestions based on recorded history.

Do not automatically increase training loads.

Allow the user to accept, reject or edit progression suggestions.

---

# 14. ACTIVITY AND HEALTH CONNECT

Integrate Android Health Connect.

## Step tracking

Read daily step totals.

Support:
- Today's steps.
- Historical steps.
- Weekly averages.
- Step goal progress.
- Last sync timestamp.
- Permission status.

Use Health Connect aggregation to avoid double-counting overlapping step records from multiple sources.

Do not sum raw records from multiple applications indiscriminately.

Account for current Health Connect attribution behaviour and do not hardcode assumptions about data-origin package names.

## Permissions

Request only the permissions needed.

Explain why each permission is needed.

Support:
- Permission denied.
- Permission revoked.
- Health Connect unavailable.
- Missing data.
- Sync failure.
- Manual fallback.

Request historical and background permissions only when the relevant feature needs them and the platform supports them.

Do not block the application if Health Connect is unavailable.

## Sync

Use sensible sync intervals.

Refresh data when the app opens and when appropriate.

Display the last successful sync time.

Never overwrite manually entered data without a clear rule.

Clearly distinguish:
- Health Connect data.
- Manually entered activity.
- Imported historical data.

---

# 15. WEIGHT AND BODY PROGRESS

Create a dedicated progress section.

## Weight logging

Support:
- Manual weight entry.
- Date and time.
- Notes.
- Editing.
- Deletion.
- Historical logs.

Display:
- Current weight.
- Starting weight.
- Goal weight.
- Total weight change.
- Remaining weight to goal.
- Seven-day average.
- Thirty-day average.
- Weight trend.

Use a trend calculation that reduces the impact of normal daily fluctuations.

Do not present one weigh-in as definitive progress.

## Measurements

Track:
- Waist.
- Neck.
- Chest.
- Arms.
- Thighs.
- Hips.
- Other custom measurements.

Show historical changes.

## Progress photographs

Allow users to capture or import progress photographs.

Support:
- Front.
- Side.
- Back.
- Custom categories.
- Date labels.
- Comparison view.

Photographs must:
- Remain on the device.
- Be encrypted individually.
- Be stored in app-private storage.
- Never be uploaded to Google Drive.
- Have thumbnails protected as well.
- Be excluded from ordinary Android cloud backup.
- Be deletable by the user.

Do not send photographs to AI services or external APIs.

---

# 16. HYDRATION TRACKING

Create a complete water tracker.

Support:
- Configurable daily target.
- Quick-add 250 ml.
- Quick-add 500 ml.
- Quick-add 750 ml.
- Custom quantity.
- Water history.
- Daily progress.
- Weekly averages.
- Editing and deleting entries.

Allow different reminder intervals.

Support wake-up and sleep windows.

Suppress unnecessary reminders when:
- The target has already been reached.
- The user has disabled reminders.
- A scheduled reminder is no longer relevant.

Do not treat water reminders as urgent tasks.

---

# 17. ADHERENCE SCORE

Build a transparent weekly adherence score.

Potential categories:

- Nutrition logging.
- Protein target consistency.
- Step target completion.
- Workout completion.
- Meal-prep completion.
- Hydration consistency.

Allow weights to be configured.

Calculate each category separately.

Display:
- Weekly score.
- Category breakdown.
- Previous-week comparison.
- Improvement opportunities.

Important rules:

- Missing data must not automatically count as failure.
- An untracked day must not be interpreted as zero intake.
- Do not reward excessive calorie restriction.
- Do not encourage unsafe exercise volume.
- Explain the calculation.
- Let the user disable the score.

This feature exists to make execution measurable, not to punish the user.

---

# 18. INTELLIGENT AUTOMATION ENGINE

This is a defining feature of LOCKIN.

Automate routine planning and administration.

The automation engine should evaluate:
- Current date and time.
- User schedules.
- Completed tasks.
- Missed tasks.
- Upcoming meals.
- Food logging status.
- Nutrition targets.
- Inventory.
- Grocery requirements.
- Workout schedule.
- Water progress.
- Health Connect data.
- Reminder preferences.

## Automated actions

The system should automatically:

1. Generate daily task lists.
2. Create recurring meal-prep tasks.
3. Generate grocery lists from meal plans.
4. Identify missing ingredients.
5. Detect low inventory.
6. Identify ingredients approaching expiry.
7. Suggest meal-prep adjustments.
8. Detect missing food logs.
9. Offer weekly retrospective logging.
10. Generate weekly nutrition summaries.
11. Calculate adherence.
12. Suggest schedule adjustments.
13. Identify upcoming workouts.
14. Suppress irrelevant reminders.
15. Recalculate dashboard priorities.

## Intelligent missed-task handling

If a task is missed:
- Determine whether it is still relevant.
- Offer an appropriate new time.
- Reorder remaining tasks.
- Avoid creating duplicate tasks.
- Preserve the missed task in history.

Do not endlessly repeat reminders for tasks the user has intentionally skipped.

## Nutrition adjustments

Analyse two to three weeks of reliable weight and nutrition data before suggesting target changes.

Account for:
- Weight trends.
- Logging completeness.
- Estimated food entries.
- Activity consistency.
- User-set targets.

Do not use incomplete food logs as evidence of low calorie intake.

Suggestions must be conservative.

Do not automatically make aggressive calorie reductions.

Show the reasoning and require user confirmation before changing important nutritional targets.

## Automation controls

Provide:
- Fully automated routines.
- User approval for consequential changes.
- Automation history.
- Enable/disable controls.
- Notification preferences.
- Manual override.

The user should be able to see what the app automated and why.

---

# 19. NOTIFICATION SYSTEM

Use local Android notifications.

Support:
- One-time reminders.
- Recurring reminders.
- Custom schedules.
- Snooze.
- Reschedule.
- Disable.
- Completion actions where supported.

Suggested default reminders:

| Time | Reminder |
|---|---|
| 12 PM | Log first meal |
| 4 PM | Log second meal |
| 8 PM | Check steps |
| 9:30 PM | Log dinner |
| Sunday | Meal preparation |
| Wednesday | Meal preparation |
| Weekly | Review weight trend and measurements |

All times must be editable.

## Smart notifications

Do not send a notification if the task is already complete.

Do not send repeated reminders for the same task without a reason.

Respect:
- Wake-up time.
- Sleep time.
- Quiet hours.
- User preferences.
- Completed tasks.
- Snoozed tasks.

Use notification categories and channels appropriately.

Do not request exact alarm permissions unless genuinely necessary.

Handle Android notification permission denial gracefully.

Do not claim that Android guarantees exact delivery times for ordinary scheduled notifications.

---

# 20. GOOGLE DRIVE BACKUP AND RESTORE

Implement real Google Drive synchronisation.

Use Google OAuth 2.0 with the narrowest suitable scope.

Prefer the Drive application data folder:

`drive.appdata`

Do not request full Drive access unnecessarily.

## Backup contents

Back up:
- Profile.
- Food database additions.
- Food logs.
- Recipes.
- Saved meals.
- Meal plans.
- Grocery lists.
- Inventory.
- Meal-prep history.
- Workouts.
- Weight logs.
- Measurements.
- Water history.
- Settings.
- Notification preferences.
- Adherence data.
- Relevant automation state.

Never upload progress photographs.

Never upload photo thumbnails or photo metadata.

## Encryption

Encrypt backup data before uploading.

Use authenticated encryption such as AES-256-GCM.

Protect encryption keys using Android Keystore.

For cross-device recovery, implement a recovery mechanism using a user-controlled recovery passphrase or recovery key.

Do not assume Android Keystore keys can be transferred to another device.

Derive recovery encryption keys using a recognised password-based key derivation function with a unique salt and appropriate parameters.

Never store plaintext recovery secrets in Google Drive.

## Synchronisation

Support:
- Automatic backup.
- Manual backup.
- Automatic restore.
- Manual restore.
- Last successful sync.
- Sync progress.
- Offline queue.
- Retry.
- Error reporting.
- Conflict detection.
- Versioning.
- Backup integrity verification.

Use logical database exports or versioned encrypted backup packages.

Do not upload the live SQLite database file directly while it is being modified.

Use atomic backup creation.

Validate backups before restoring.

Prevent partial restore from corrupting the current database.

Provide a clear restore confirmation.

## Convenience

Allow the user to connect Google Drive once and enable automatic backups.

Do not ask for repeated authentication unnecessarily.

Never claim backup succeeded unless the remote operation actually succeeded.

Show clear sync status:
- Synced.
- Sync pending.
- Syncing.
- Failed.
- Account disconnected.

The application must remain fully usable without a Google account.

---

# 21. DATA MODEL AND DATABASE DESIGN

Design a normalised SQLite database with migrations.

Include suitable entities for:

- UserProfile.
- Targets.
- Food.
- FoodNutrition.
- FoodLog.
- Meal.
- MealIngredient.
- Recipe.
- RecipeIngredient.
- MealPlan.
- InventoryItem.
- GroceryList.
- GroceryListItem.
- MealPrepTemplate.
- MealPrepTask.
- MealPrepHistory.
- Exercise.
- WorkoutRoutine.
- WorkoutSession.
- WorkoutExercise.
- WorkoutSet.
- WeightEntry.
- BodyMeasurement.
- ProgressPhotoReference.
- WaterEntry.
- ActivityEntry.
- NotificationSchedule.
- AutomationRule.
- AutomationHistory.
- AdherenceRecord.
- SyncMetadata.
- BackupMetadata.

Use stable identifiers.

Preserve historical snapshots.

Use database transactions for operations that affect multiple entities.

Implement foreign keys and deletion policies carefully.

Do not accidentally delete historical records when editing recurring templates.

Include appropriate indexes for:
- Dates.
- Food names.
- Recipe names.
- Workout history.
- Inventory expiry.
- Task status.
- Sync status.

---

# 22. DATA EXPORT AND USER CONTROL

Provide:
- JSON export.
- CSV export for food logs.
- CSV export for weight history.
- CSV export for workouts.
- Backup verification.
- Restore.
- Clear application data.

Require explicit confirmation before destructive actions.

Allow users to export their information without depending on Google Drive.

Provide a clear explanation of what is stored locally and what is synchronised.

---

# 23. ERROR HANDLING AND RELIABILITY

Every major workflow must have proper error handling.

Examples:
- Database unavailable.
- Invalid input.
- Health Connect permission denied.
- Health Connect data unavailable.
- Google authentication failure.
- Drive upload failure.
- Drive restore failure.
- Notification permission denied.
- Insufficient local storage.
- Corrupt backup.
- Interrupted operation.

Never silently discard user data.

Use clear, concise error messages.

Preserve unsaved user input where possible.

Implement retry behaviour for recoverable network failures.

Make important operations idempotent so retrying them does not create duplicate entries.

---

# 24. SECURITY AND PRIVACY

Convenience is the priority, but sensitive data still requires sensible safeguards.

Requirements:

- Use Android Keystore for cryptographic key protection.
- Encrypt cloud backup data before upload.
- Keep progress photographs encrypted and local-only.
- Avoid logging sensitive personal information.
- Do not hardcode API secrets.
- Use secure OAuth flows.
- Request only necessary permissions.
- Protect recovery secrets.
- Validate imported data.
- Use prepared SQL statements.
- Exclude sensitive photos from system cloud backup.
- Provide account disconnection.
- Provide local data deletion.

Do not send personal fitness information to third-party services without an explicit feature requiring it.

If an optional AI service is implemented, explain what data is transmitted and provide a manual alternative.

---

# 25. APPLICATION STRUCTURE

Use a clean, modular project structure.

Suggested organisation:

`app/`
- Expo Router screens and layouts.
- Dashboard.
- Food.
- Weekly food log.
- Recipes.
- Meal planner.
- Activity.
- Workouts.
- Prep.
- Grocery.
- Progress.
- Settings.

`src/components/`
- Reusable cards.
- Progress indicators.
- Priority indicators.
- Buttons.
- Inputs.
- Charts.
- Empty states.
- Loading states.

`src/features/`
- Nutrition.
- Recipes.
- Meal planning.
- Inventory.
- Meal prep.
- Workouts.
- Health Connect.
- Progress.
- Hydration.
- Automation.
- Notifications.
- Sync.

`src/database/`
- Schema.
- Migrations.
- Repositories.
- Queries.
- Seed data.

`src/services/`
- Nutrition calculations.
- Automation engine.
- Scheduling.
- Backup.
- Encryption.
- Health Connect.
- Notifications.

`src/store/`
- Lightweight application state.

`src/types/`
- Shared TypeScript models.

`src/utils/`
- Dates.
- Units.
- Validation.
- Formatting.

`docs/`
- Architecture.
- Setup.
- Database.
- Integrations.
- Testing.
- Performance.

Adjust the structure if a better maintainable design is justified.

---

# 26. TESTING REQUIREMENTS

Write actual tests.

Do not merely state that testing was completed.

## Unit tests

Test:
- Calorie calculations.
- Macro calculations.
- Serving conversions.
- Recipe scaling.
- Raw/cooked distinctions.
- Weight averages.
- Weekly averages.
- Adherence calculations.
- Missing-data handling.
- Inventory deductions.
- Grocery quantity calculations.
- Priority ranking.
- Task recurrence.
- Timezone handling.

## Integration tests

Test:
- Food logging.
- Historical editing.
- Weekly bulk logging.
- Meal duplication.
- Recipe creation.
- Recipe scaling.
- Meal planning.
- Grocery generation.
- Inventory updates.
- Workout saving.
- Water tracking.
- Database migrations.
- Backup creation.
- Backup restore.
- Duplicate prevention.

## Android tests

Test on an emulator and, where possible, a physical device.

Verify:
- Permissions.
- Notifications.
- Health Connect.
- Application lifecycle.
- Offline operation.
- Database persistence.
- Photo storage.
- Google authentication.
- Google Drive backup.

## Critical test scenarios

1. Add food and immediately see updated nutrition.
2. Copy yesterday's meals without duplicate records.
3. Reconstruct an entire missing week.
4. Edit historical meals and update weekly averages.
5. Ensure missing days are not treated as zero calories.
6. Complete meal preparation and deduct ingredients correctly.
7. Prevent inventory deductions when meals are only planned.
8. Resume an unfinished workout after closing the app.
9. Prevent reminders for completed tasks.
10. Restore an encrypted backup on a fresh installation.
11. Confirm progress photographs are not uploaded.
12. Ensure the dashboard works without internet.
13. Confirm a failed backup is never displayed as successful.

---

# 27. BUILD AND RELEASE REQUIREMENTS

The development environment is Linux.

Configure Android build support.

Generate:
- Development build.
- Release build.
- Installable APK where supported.
- Android App Bundle if practical.

The final APK must be installable on a compatible Android device.

Provide:
- Build instructions.
- Environment setup instructions.
- Android SDK requirements.
- Google OAuth setup.
- Google Drive API configuration.
- Health Connect setup.
- Permission explanations.
- Troubleshooting guide.

Do not claim an APK was generated unless it actually exists.

Do not leave critical features represented by fake data or placeholder buttons.

If an external integration requires credentials, complete all code and configuration that can be completed without those credentials, then document the exact remaining setup steps.

---

# 28. IMPLEMENTATION PLAN

Build in stages, but keep the project architecture ready for the full product.

## Stage 1 — Foundation

- Inspect the environment.
- Create the Expo project.
- Configure TypeScript.
- Configure Expo Router.
- Configure SQLite.
- Create database migrations.
- Build the design system.
- Build navigation.
- Build the dashboard shell.
- Verify Android build.

## Stage 2 — Core tracking

- User profile.
- Food database.
- Food logging.
- Custom foods.
- Saved meals.
- Historical logging.
- Weekly bulk logging.
- Nutrition calculations.

## Stage 3 — Planning and preparation

- Recipe builder.
- Meal planner.
- Grocery manager.
- Inventory.
- Meal-prep manager.
- Automated shopping lists.

## Stage 4 — Fitness tracking

- Workout routines.
- Workout execution.
- Workout history.
- Weight tracking.
- Body measurements.
- Progress photographs.
- Hydration.

## Stage 5 — Automation and integrations

- Daily operating plan.
- Adherence score.
- Intelligent priorities.
- Notifications.
- Health Connect.
- Google authentication.
- Encrypted Drive backup.
- Restore and conflict handling.

## Stage 6 — Quality and release

- Performance optimisation.
- Unit and integration tests.
- Android testing.
- Error handling.
- Security review.
- Documentation.
- APK generation.

Do not wait until the final stage to test performance or database correctness.

---

# 29. CODING RULES

Follow these rules throughout implementation:

1. Inspect the repository before making changes.
2. Preserve existing working code if a project already exists.
3. Do not overwrite user files unnecessarily.
4. Use strict TypeScript.
5. Avoid `any` unless justified.
6. Avoid unnecessary dependencies.
7. Use maintained packages compatible with the selected Expo SDK.
8. Keep business logic outside UI components.
9. Use database migrations.
10. Use reusable components.
11. Handle loading, empty and error states.
12. Avoid mock implementations for core functionality.
13. Do not hardcode secrets.
14. Do not silently discard user data.
15. Do not fabricate Health Connect or Drive data.
16. Do not mark unfinished integrations as complete.
17. Run tests after implementing each major feature.
18. Run Android builds regularly.
19. Document unresolved limitations.
20. Prefer simple, maintainable solutions over unnecessary complexity.

When an implementation choice is uncertain, research the current official documentation and select the simplest supported approach.

Do not use deprecated APIs merely because an old tutorial recommends them.

---

# 30. DEFINITION OF DONE

LOCKIN is not complete until all of the following are true:

- The Android application launches.
- Navigation works.
- Dashboard loads local data.
- Food logging works.
- Historical food logging works.
- Weekly bulk food logging works.
- Saved meals work.
- Recipe scaling works.
- Meal planning works.
- Grocery generation works.
- Inventory deductions work.
- Meal-prep tasks work.
- Workout tracking works.
- Weight and measurement tracking work.
- Progress photos are locally encrypted.
- Hydration tracking works.
- Notifications work within Android's scheduling constraints.
- Health Connect integration is implemented.
- Google Drive backup is implemented.
- Backup encryption is implemented.
- Restore is implemented and tested.
- Missing food data is never treated as zero intake.
- Automated priorities work.
- The application remains usable offline.
- Core workflows have automated tests.
- Performance has been measured.
- Android build instructions are documented.
- An APK has been generated if the environment supports it.

At the end, provide a concise engineering report:

1. Features completed.
2. Features partially completed.
3. Features requiring external credentials or permissions.
4. Tests executed and results.
5. Performance issues discovered and fixed.
6. Build status.
7. APK location if generated.
8. Remaining limitations.

**Start by inspecting the current working directory and environment. Then implement the application. Do not respond with another plan instead of writing code.**

---

## Addendum 1

# 31. CLEAN CODE, SOFTWARE ENGINEERING & INDEPENDENT REVIEW STANDARDS

Clean, maintainable, secure and well-tested code is a non-negotiable requirement.

LOCKIN must be designed for long-term development, debugging, testing and feature expansion.

Code must not be rushed or made unnecessarily complicated simply to generate features faster.

## A. Architecture and design principles

- Follow separation of concerns.
- Apply SOLID principles where appropriate.
- Use modular, feature-oriented architecture.
- Keep UI, business logic, database access and external integrations separate.
- Use dependency injection where it meaningfully improves testability.
- Avoid circular dependencies.
- Avoid tightly coupled modules.
- Keep components focused on a single responsibility.
- Keep business logic independent of presentation components.
- Prefer simple, maintainable solutions over unnecessary abstractions.

## B. Code quality standards

- Use TypeScript strict mode.
- Avoid `any`, `@ts-ignore` and unsafe type assertions.
- Use descriptive and consistent naming.
- Keep functions small and focused.
- Avoid deeply nested conditionals.
- Extract repeated logic into reusable functions.
- Avoid duplicated business logic.
- Use constants instead of unexplained magic numbers.
- Remove dead code and unused dependencies.
- Avoid unnecessary abstractions.
- Comment why complicated code exists, not what obvious code does.
- Keep files reasonably sized and organised.

## C. React Native standards

- Keep components small and reusable.
- Separate screen components from business logic.
- Avoid unnecessary re-renders.
- Use memoisation only where beneficial.
- Keep state local unless it genuinely needs to be shared.
- Avoid oversized global Zustand stores.
- Use typed navigation and route parameters.
- Handle loading, empty and error states consistently.
- Never place expensive calculations inside render functions.
- Keep UI components independent of direct database access.

## D. Database standards

- Use repository patterns for data access.
- Use migrations for schema changes.
- Use transactions for multi-step operations.
- Use prepared statements.
- Preserve historical records and nutritional snapshots.
- Avoid direct database queries inside UI components.
- Keep database models and UI models appropriately separated.
- Use appropriate indexes.
- Ensure data operations are safe to retry.
- Prevent duplicate records during synchronisation and automated workflows.

## E. Error handling

- Never silently swallow errors.
- Use consistent error types.
- Handle recoverable errors gracefully.
- Provide useful user-facing error messages.
- Log technical details without exposing sensitive information.
- Never claim an operation succeeded when it failed.
- Preserve user input where possible.
- Never silently discard user data.

## F. Testing and quality gates

Before considering a feature complete, run:

1. TypeScript type checking.
2. ESLint.
3. Relevant automated tests.
4. Database migration checks where applicable.
5. Android build checks where applicable.

Do not suppress errors merely to make checks pass.

Write:
- Unit tests for business logic.
- Integration tests for database workflows.
- Regression tests for discovered bugs.
- Tests for important edge cases.
- Tests for offline operation.
- Tests for date and timezone boundaries.
- Tests for missing and incomplete data.
- Tests for synchronisation conflicts.

Maintain reliable test coverage of critical application workflows.

## G. Documentation

Maintain:

- `README.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `INTEGRATIONS.md`
- `TESTING.md`
- `CHANGELOG.md`
- `TECH_DEBT.md`

Document significant architectural decisions.

Record known shortcuts, incomplete integrations and architectural compromises in `TECH_DEBT.md`.

Never hide unfinished functionality or known limitations.

---

# 32. MANDATORY INDEPENDENT CODE-REVIEW AGENT WORKFLOW

A separate code-review agent must review the implementation after every development phase and every substantial development run.

This is mandatory.

The implementation agent must not be allowed to mark its own work complete without an independent review.

## A. Agent responsibilities

Use three distinct responsibilities.

### 1. Implementation Agent

Responsible for:
- Implementing features.
- Writing tests.
- Updating documentation.
- Running initial checks.
- Reporting completed changes.

### 2. Independent Review Agent

Responsible for:
- Independently inspecting actual code changes.
- Reviewing architecture.
- Checking code quality.
- Identifying bugs.
- Finding missing functionality.
- Checking security.
- Checking performance.
- Verifying test quality.
- Reporting actionable findings.

The review agent must not assume the implementation is correct.

Its purpose is to find problems, not simply approve the implementation.

### 3. Fix Agent

Responsible for:
- Addressing review findings.
- Refactoring problematic code.
- Adding or updating tests.
- Correcting bugs.
- Running verification again.

Use separate Codex subagents where available.

If independent subagent execution is unavailable, perform a deliberate second-pass review with fresh scrutiny. Clearly document that the review was not performed by an independent agent.

Do not pretend an independent agent was used when one was not.

## B. Mandatory review checkpoints

Run the independent review agent:

- After every implementation phase.
- After every substantial development run.
- After major architectural changes.
- After database schema changes.
- After authentication or encryption changes.
- After external integration changes.
- Before release.

Do not postpone code review until the entire application is finished.

## C. Review checklist

### Architecture
- Separation of concerns.
- SOLID principles where appropriate.
- Module boundaries.
- Dependency management.
- Circular dependencies.
- Unnecessary abstractions.
- Architectural consistency.

### Code quality
- TypeScript correctness.
- Readability.
- Naming.
- Duplicated logic.
- Function complexity.
- Dead code.
- Unnecessary dependencies.
- Maintainability.

### Functionality
- Requirements coverage.
- Missing functionality.
- Incorrect calculations.
- Broken workflows.
- Edge cases.
- Data integrity.
- Historical record preservation.

### Performance
- Unnecessary renders.
- Expensive operations.
- Database query efficiency.
- Large-list handling.
- Startup performance.
- Memory usage.
- Unnecessary network operations.
- Slow navigation and interactions.

### Security
- Credential exposure.
- OAuth implementation.
- Encryption.
- Local data protection.
- Input validation.
- Backup and restore integrity.
- Permission handling.
- Sensitive information in logs.

### Testing
- Coverage of critical logic.
- Missing regression tests.
- Incorrect test assumptions.
- Build failures.
- Lint failures.
- Unverified integrations.

## D. Finding severity

Classify every finding.

**P0 — Critical**
- Data loss.
- Security vulnerability.
- Application cannot launch.
- Serious database corruption.

**P1 — High**
- Major feature broken.
- Incorrect nutrition calculations.
- Broken synchronisation.
- Serious performance problems.
- Important workflow failure.

**P2 — Medium**
- Incorrect edge-case behaviour.
- Maintainability issues.
- Incomplete workflows.
- Moderate performance problems.

**P3 — Low**
- Minor UI inconsistencies.
- Small refactoring opportunities.
- Noncritical optimisation.

## E. Mandatory correction cycle

For every review checkpoint:

1. Implementation agent reports completed changes.
2. Review agent inspects the actual Git diff.
3. Review agent examines affected modules and relevant surrounding code.
4. Review agent runs or requests relevant checks.
5. Review agent produces a written findings report.
6. Fix agent addresses P0 and P1 findings before proceeding.
7. Address P2 findings where practical.
8. Record deferred P2/P3 findings in `TECH_DEBT.md`.
9. Run tests again after fixes.
10. Re-review corrected changes.
11. Confirm that fixes did not introduce regressions.
12. Mark the phase complete only after its exit criteria are satisfied.

Never claim an issue is fixed without verification.

Do not allow the implementation agent to dismiss findings without a documented technical reason.

If a finding is disputed, require evidence and record the resolution.

## F. Review reports

Maintain:

`docs/reviews/`

Create a report for each phase or substantial development run.

Suggested filenames:

- `phase-01-foundation-review.md`
- `phase-02-nutrition-review.md`
- `phase-03-meal-management-review.md`
- `phase-04-fitness-review.md`
- `phase-05-automation-review.md`
- `phase-06-integrations-review.md`
- `phase-07-release-review.md`

Each report must include:

- Scope reviewed.
- Git commit or diff reviewed.
- Files inspected.
- Findings.
- Severity.
- Recommended fixes.
- Fixes completed.
- Tests executed.
- Remaining issues.
- Deferred technical debt.
- Final review status.

## G. Phase completion gate

A development phase cannot be marked complete unless:

- Implementation is finished.
- TypeScript checks pass.
- ESLint passes.
- Relevant tests pass.
- Database checks pass where applicable.
- Android build checks pass where applicable.
- Review agent has completed its review.
- P0 findings are resolved.
- P1 findings are resolved or explicitly documented with a justified exception.
- Remaining issues are documented.
- Corrected code has been re-reviewed.

## H. Git workflow

Use Git to make development and review traceable.

- Keep changes organised into meaningful commits.
- Avoid unrelated changes in a single commit.
- Review actual diffs, not just implementation summaries.
- Do not commit credentials, tokens, signing keys or sensitive files.
- Use feature branches where practical.
- Preserve a working main branch.
- Do not overwrite working code without justification.

## I. Final release review

Before declaring LOCKIN release-ready, perform a dedicated review of:

- Overall architecture.
- Database integrity.
- Nutrition calculations.
- Offline functionality.
- Performance.
- Android permissions.
- Health Connect.
- Google authentication.
- Google Drive backup.
- Encryption and recovery.
- Progress photo protection.
- Notification behaviour.
- Automated workflows.
- Data export and restoration.

The final review must identify any remaining release blockers.

---

# 33. DEVELOPMENT RULE

The mandatory development cycle is:

**Implement → Test → Independent Review → Fix → Retest → Re-review → Commit → Next phase.**

Never skip the review stage to save time.

Never prioritise development speed over data integrity, security or maintainability.

The goal is not merely to generate a working application. The goal is to build a reliable application that remains understandable, fast and maintainable as LOCKIN grows.

---

## Addendum 2

# 34. PREMIUM ONBOARDING, SPLASH SCREEN & GOOGLE LOGIN

Design and implement a premium, minimal and visually polished first-launch experience.

The first impression should communicate that LOCKIN is a sophisticated personal fitness operating system.

The experience must feel:
- Premium.
- Minimal.
- Fast.
- Modern.
- Refined.
- Confident.
- Effortless.

Avoid making onboarding feel like a long registration process.

## A. SPLASH SCREEN

Create a custom branded splash screen.

### Visual direction

- Deep near-black background: `#101114`.
- LOCKIN wordmark centred.
- Minimal custom logo or geometric brand symbol.
- Accent green: `#45B58A`.
- Elegant typography.
- Subtle lighting or restrained gradient treatment.
- Generous negative space.

Display:

**LOCKIN**

*Discipline. Consistency. Results.*

### Animation

Use a restrained entrance animation:

1. Background appears immediately.
2. Logo fades in with a slight scale transition.
3. LOCKIN wordmark appears smoothly.
4. Tagline fades in.
5. Transition naturally to the next screen.

Use opacity and small transform animations.

Avoid:
- Long intro animations.
- Excessive particles.
- Flashing effects.
- Unnecessary loading indicators.
- Animations that delay interaction.

The splash screen must not become a bottleneck.

Use the native Android splash screen for initial application launch and a matching in-app transition where appropriate.

Do not show the branded introduction on every app opening.

## B. WELCOME / ONBOARDING SCREEN

After the initial splash, show a simple welcome screen for first-time users.

### Content

Main heading:

**Your routine. Under control.**

Supporting text:

"Nutrition, training and daily progress. One place to keep everything moving."

Include a premium visual representation of the application.

Prefer a restrained animated preview of actual LOCKIN dashboard components:
- Nutrition progress.
- Workout progress.
- Daily priorities.
- Weekly consistency.

The visual should feel like a carefully designed product preview, not a promotional advertisement.

### Primary action

**Get started**

### Secondary action

**Sign in with Google**

Keep the layout clean and uncluttered.

Do not introduce multiple onboarding slides unless user testing demonstrates a genuine need.

Allow returning users to bypass onboarding automatically.

## C. GOOGLE-ONLY AUTHENTICATION

Google is the only login provider.

Do not implement:
- Email and password registration.
- Phone-number login.
- Apple login.
- Facebook login.
- Username and password.
- Additional social login providers.

Implement:
- Sign in with Google.
- Automatic account creation on first successful authentication.
- Returning-user authentication.
- Secure sign-out.
- Account deletion flow.
- Account switching.
- Authentication error recovery.

### Authentication UI

Use Google's official branded Sign in with Google button.

Do not recreate or modify Google's branding in a way that violates its guidelines.

The button should be clearly visible and easy to tap.

Suggested surrounding copy:

**Continue with Google**

"One account. Your fitness data, synced securely."

Do not add unnecessary text fields.

### Android implementation

Use Android Credential Manager and the recommended Sign in with Google implementation.

Use the appropriate Android OAuth client configuration.

Do not use embedded WebViews for Google authentication.

Handle:
- No Google account on device.
- Account selection.
- Authentication cancellation.
- Network failure.
- Invalid configuration.
- Expired credentials.
- Sign-out.
- Account switching.

Never expose client secrets in the application.

Do not confuse Google sign-in authentication with Google Drive authorisation.

Google sign-in establishes the user's identity.

Google Drive access requires its own appropriate authorisation and consent flow.

## D. FIRST-TIME USER SETUP

After successful Google authentication, create the user's LOCKIN profile automatically.

Do not immediately present a long form.

Use a short, progressive setup process.

### Step 1 — Basic profile

Collect only essential information:
- Age.
- Sex.
- Height.
- Current weight.
- Goal weight.

Allow users to skip nonessential fields and complete them later.

### Step 2 — Fitness preferences

Allow the user to configure:
- Primary objective.
- Training frequency.
- Dietary preferences.
- Food exclusions.
- Preferred meal times.

Use simple selection cards and sensible defaults.

### Step 3 — Targets

Calculate initial suggested targets using the supplied profile information.

Display:
- Suggested calories.
- Protein.
- Carbohydrates.
- Fat.
- Steps.
- Water.
- Weekly workout frequency.

Explain that these are estimates and can be edited.

Require user confirmation before saving the initial targets.

### Step 4 — Ready

Display:

**You're set.**

"Your daily operating plan is ready."

Primary action:

**Enter LOCKIN**

Keep setup progress saved if the user exits partway through.

Allow profile completion later.

## E. PERMISSIONS — REQUEST JUST IN TIME

Do not request every Android permission immediately after login.

Ask only when the user first uses the relevant feature.

Examples:

**Notifications**

Explain that notifications are used for meal reminders, workouts and meal preparation.

**Health Connect**

Explain that it allows LOCKIN to read supported activity data such as steps.

**Camera and photos**

Explain that access is used for progress photographs.

**Google Drive**

Explain that access is used for cloud backup and restoration.

Use a short explanation before the native Android permission dialog.

Allow users to decline optional permissions without blocking unrelated features.

## F. PREMIUM MOTION DESIGN

Animations must feel refined and purposeful.

Use:
- Fade transitions.
- Subtle scale transitions.
- Small vertical movement.
- Smooth card entrance.
- Animated progress indicators.
- Gentle button feedback.
- Smooth screen transitions.
- Skeleton loading where appropriate.

Suggested timing:
- Micro-interactions: approximately 120–180 ms.
- Standard transitions: approximately 180–250 ms.
- Larger entrance transitions: approximately 250–350 ms.

These are design targets, not rigid requirements.

Animations must:
- Avoid blocking input.
- Avoid delaying screen navigation.
- Avoid causing layout shifts.
- Remain smooth on mid-range Android devices.
- Respect Android reduced-motion and accessibility settings.
- Use native-driver or platform-appropriate animation mechanisms where possible.

Avoid:
- Constant background animation.
- Excessive parallax.
- Large animated illustrations.
- Heavy Lottie assets without a clear benefit.
- Animations that replay unnecessarily.

The application should remain visually polished with animations disabled.

## G. RETURNING USER EXPERIENCE

After the first successful setup:

- Do not show onboarding again.
- Restore the authenticated session securely.
- Open the dashboard directly.
- Load local data immediately.
- Perform cloud synchronisation in the background.
- Display a lightweight sync indicator where appropriate.

If authentication expires, show a clear reauthentication flow.

Do not erase local records simply because the user signs out.

## H. ACCOUNT AND DATA MANAGEMENT

Provide a settings section for:

- Signed-in Google account.
- Account switching.
- Google Drive connection status.
- Last successful backup.
- Manual backup.
- Sign-out.
- Account deletion.
- Data export.
- Data restoration.

Clearly distinguish:
- Signing out.
- Disconnecting Google Drive.
- Deleting the LOCKIN account.
- Deleting local application data.

Require explicit confirmation for destructive actions.

Provide a clear account-deletion process and explain the treatment of local and cloud data.

## I. PERFORMANCE REQUIREMENTS

The splash and authentication experience must not compromise application startup performance.

- Avoid large image assets.
- Avoid unnecessary network requests.
- Do not wait for Drive synchronisation.
- Do not block the UI while fetching profile information.
- Cache appropriate non-sensitive onboarding state.
- Restore sessions efficiently.
- Avoid repeated splash screens.
- Keep animations lightweight.

## J. TESTING REQUIREMENTS

Test:

1. First installation.
2. First launch.
3. Splash animation.
4. Welcome screen.
5. Google sign-in.
6. New account creation.
7. Existing account sign-in.
8. Authentication cancellation.
9. No internet connection.
10. Returning-user launch.
11. Partial onboarding recovery.
12. Permission denial.
13. Account switching.
14. Sign-out.
15. Account deletion.
16. Reduced-motion behaviour.
17. Performance on mid-range Android devices.

Do not use fake authentication or simulated Google accounts in the production implementation.

The authentication system must be functional before release.

**Design objective:** LOCKIN should feel like a premium, carefully engineered fitness product from the first second, while allowing a returning user to get to their dashboard as quickly as possible.

---

## Addendum 3

# 13. OPENCODE MODEL ROUTING AND USAGE OPTIMISATION

## OBJECTIVE

Optimise model usage across LOCKIN development.

OpenCode has access to two categories of models:

1. Free or open-source models available through configured OpenCode providers.
2. Paid models available through the OpenCode Go subscription.

The objective is to preserve premium model usage for tasks that genuinely benefit from stronger reasoning, coding ability or debugging.

Do not use expensive models for every operation.

## A. MODEL DISCOVERY

At the beginning of an OpenCode session:

1. Inspect available providers.
2. Inspect available models.
3. Identify which models are free.
4. Identify which models are included in OpenCode Go.
5. Identify context-window limits.
6. Identify tool-calling capabilities.
7. Identify model capabilities relevant to coding.
8. Verify that the selected model is actually accessible.

Use OpenCode's native provider and model configuration.

Do not invent model names or assume that a model is available.

Maintain a lightweight configuration document:

`docs/workflows/model-routing.md`

Record:
- Available providers.
- Available models.
- Free versus paid classification.
- Context limits.
- Recommended tasks.
- Known limitations.
- Last verification date.

Never store API keys or credentials in this document.

## B. MODEL ROUTING POLICY

Use the following default routing strategy.

### Tier 1 — Free / Open-source models

Prefer free models for:

- Reading project documentation.
- Summarising handoff files.
- Updating TASKS.md.
- Generating basic documentation.
- Simple UI changes.
- Boilerplate generation.
- Formatting.
- Straightforward refactoring.
- Writing simple unit tests.
- Basic bug fixes.
- Reviewing straightforward diffs.
- Routine code explanations.

Do not spend premium model usage on tasks that a reliable free model can complete.

### Tier 2 — OpenCode Go models

Use OpenCode Go models for:

- Complex architectural decisions.
- Difficult TypeScript errors.
- Complex React Native state problems.
- Database architecture.
- SQLite migration problems.
- Concurrency and synchronisation.
- Google OAuth implementation.
- Google Drive integration.
- Encryption and recovery design.
- Health Connect integration.
- Difficult Android build errors.
- Complex performance optimisation.
- Difficult debugging.
- Security-sensitive code review.
- Cross-module refactoring.
- Critical regression analysis.

Choose the least expensive suitable Go model that can reliably complete the task.

Use a stronger model only when the problem requires it.

## C. AUTOMATIC ESCALATION

Start with a suitable free model for routine work.

Escalate to an OpenCode Go model when:

- The free model repeatedly fails.
- It produces incorrect implementations.
- It cannot understand the existing architecture.
- It fails to resolve a complex bug.
- It introduces regressions.
- It cannot reliably use required tools.
- The task requires advanced reasoning.
- Security or data integrity is involved.

Do not repeatedly retry the same failed approach with the same model.

After two unsuccessful attempts, reassess the problem and escalate if necessary.

For critical security, encryption and data migration work, use a capable model from the beginning.

## D. MODEL SELECTION BY TASK

| Task | Default model |
|---|---|
| Documentation | Free |
| Task tracking | Free |
| Simple UI implementation | Free |
| Boilerplate | Free |
| Basic tests | Free |
| Simple refactoring | Free |
| Standard code review | Free |
| Complex debugging | OpenCode Go |
| Database migrations | OpenCode Go |
| Architecture design | OpenCode Go |
| Encryption | OpenCode Go |
| Authentication | OpenCode Go |
| Cloud synchronisation | OpenCode Go |
| Security review | OpenCode Go |
| Complex performance analysis | OpenCode Go |

This table is a default, not a rigid restriction.

Model capabilities must be evaluated rather than assumed from the model's name.

## E. TOKEN AND USAGE OPTIMISATION

Reduce unnecessary model usage.

- Read only relevant files.
- Avoid repeatedly loading the entire repository.
- Use targeted Git diffs.
- Keep task descriptions concise.
- Reuse existing documentation.
- Avoid repeating project context unnecessarily.
- Summarise long investigations.
- Avoid unnecessary agent conversations.
- Avoid repeated full-code reviews when only a small change was made.
- Run deterministic checks through shell commands rather than asking a model to reason about their output unnecessarily.
- Use scripts for repetitive operations.
- Keep handoff documents current.

Do not sacrifice correctness merely to save tokens.

## F. MODEL SWITCHING PROCEDURE

When starting a task:

1. Read the task description.
2. Assess its complexity and risk.
3. Select an appropriate model.
4. Record the selected model when useful.
5. Complete the task.
6. Run deterministic checks.
7. Escalate if the model cannot complete the work reliably.

When switching models during an unfinished task:

1. Save the current work.
2. Update HANDOFF.md.
3. Summarise the problem.
4. Record attempted solutions.
5. Record files modified.
6. Record errors encountered.
7. Switch to the more suitable model.
8. Continue from the saved state.

Do not discard useful investigation when changing models.

## G. REVIEW MODEL INDEPENDENCE

For important implementations, avoid relying on the same model that wrote the code to perform the only review.

Prefer:
- Free model for routine independent reviews.
- OpenCode Go model for difficult architectural, security and data-integrity reviews.

Where practical, use a different model family for independent review.

The reviewer must inspect actual code and Git diffs.

Model diversity is useful, but does not replace tests or human verification.

## H. COST AND USAGE TRANSPARENCY

Maintain a lightweight record of model usage in:

`docs/workflows/model-usage.md`

Where provider information makes it available, record:
- Model.
- Provider.
- Task.
- Free or paid classification.
- Approximate usage.
- Reason for escalation.

Do not invent token counts or costs when provider usage information is unavailable.

Never expose credentials.

## I. MODEL CONFIGURATION SAFETY

- Use OpenCode's native model switching functionality.
- Do not hardcode model names without verifying availability.
- Do not change provider credentials automatically.
- Do not switch to an unverified provider.
- Do not send sensitive personal data to untrusted providers.
- Keep secrets out of prompts, logs and repository files.
- Preserve the user's ability to manually select a model.

## J. FINAL OPERATING PRINCIPLE

Use free models for routine work.

Use OpenCode Go models for difficult work where stronger capabilities justify the usage.

Escalate intelligently rather than repeatedly wasting requests.

The objective is to maximise reliable development output per unit of model usage, without compromising application quality, security or correctness.

---

## Addendum 4

# LOCKIN — MULTI-AGENT DEVELOPMENT COORDINATION SYSTEM

## OBJECTIVE

Configure this repository so that OpenAI Codex and OpenCode can independently develop, review, test and maintain LOCKIN.

Both coding agents must be able to work on the project without depending on the other agent's conversation history, memory or active session.

The coordination system must be persistent, repository-based and tool-independent.

Codex is responsible for establishing the system initially.

OpenCode must be able to open the repository at any time, understand the current project state, identify available tasks, implement them and leave a complete handoff for the next agent.

The same must be possible in reverse.

Do not build a custom orchestration framework unless existing tools are insufficient.

Prefer established Git workflows, repository-based task tracking and documented agent instructions.

---

# 1. COORDINATION ARCHITECTURE

Use the following principles:

- GitHub is the source of truth.
- Git is the source of development history.
- Repository documentation is the source of project knowledge.
- A persistent task board is the source of task status.
- Git branches isolate concurrent work.
- Pull requests provide integration and review.
- Automated checks verify implementation quality.
- Review reports document independent verification.

Neither agent should depend on information stored exclusively in the other's conversation.

Everything necessary to resume development must be available in the repository or linked GitHub records.

---

# 2. INVESTIGATE ESTABLISHED WORKFLOWS FIRST

Before implementing coordination infrastructure, investigate established options compatible with Codex and OpenCode.

Consider:

1. GitHub Issues and Projects.
2. GitHub Pull Requests.
3. GitHub Actions.
4. Git worktrees.
5. Repository-level AGENTS.md instructions.
6. Codex-supported agent configuration.
7. OpenCode agent configuration.
8. Existing task-management or multi-agent workflows.

Use official documentation to verify compatibility.

Prefer GitHub Issues and Projects as the shared task-management layer if available.

Do not introduce unnecessary external services or subscriptions.

Do not assume that a particular feature exists in either coding tool without verifying it.

Select the simplest reliable workflow that both agents can follow.

Document why the selected approach was chosen.

---

# 3. CREATE A SHARED REPOSITORY KNOWLEDGE BASE

Create and maintain the following files:

```text
/
├── AGENTS.md
├── MASTER_SPEC.md
├── ARCHITECTURE.md
├── TASKS.md
├── ROADMAP.md
├── CURRENT_STATE.md
├── HANDOFF.md
├── TECH_DEBT.md
├── CHANGELOG.md
├── DECISIONS.md
│
├── docs/
│   ├── architecture/
│   ├── database/
│   ├── integrations/
│   ├── testing/
│   ├── performance/
│   ├── reviews/
│   └── workflows/
│
└── .github/
    ├── ISSUE_TEMPLATE/
    ├── PULL_REQUEST_TEMPLATE.md
    └── workflows/
```

Adjust this structure if an existing project already has equivalent files.

Do not create duplicate documentation.

## AGENTS.md

This is the shared instruction file.

Both Codex and OpenCode must read it before modifying code.

It must explain:

- Project purpose.
- Technology stack.
- Architecture.
- Coding standards.
- Git rules.
- Task ownership rules.
- Testing requirements.
- Review requirements.
- Handoff procedure.
- Definition of done.

Create tool-specific instruction files only when necessary.

Avoid conflicting instructions between agents.

## MASTER_SPEC.md

Contains the complete LOCKIN product and technical specification.

This must remain the authoritative feature specification.

## CURRENT_STATE.md

Must describe the actual current implementation.

Include:

- Completed features.
- Partially completed features.
- Unimplemented features.
- Current architecture.
- Current database state.
- Known bugs.
- Current build status.
- Current integration status.

Update it after every substantial development session.

Do not describe planned features as completed.

## HANDOFF.md

This is the most important file for switching between agents.

It must contain:

- Last completed task.
- Current development phase.
- Current branch.
- Latest relevant commit.
- Files modified.
- Work completed.
- Work in progress.
- Tests executed.
- Test results.
- Known issues.
- Unresolved review findings.
- Next recommended task.
- Instructions for resuming work.

Update it before ending a substantial development session.

## TASKS.md

Maintain a concise local representation of the shared task queue.

Include:
- Task ID.
- Description.
- Priority.
- Assigned agent.
- Status.
- Dependencies.
- Related GitHub issue.
- Branch.
- Completion criteria.

GitHub Issues should remain authoritative for shared task status if GitHub Projects is selected.

Avoid inconsistent duplicate task databases.

---

# 4. SHARED TASK MANAGEMENT

Use GitHub Issues and GitHub Projects where available.

Create a task structure organised by development phases.

Suggested phases:

1. Foundation and architecture.
2. Onboarding and authentication.
3. Dashboard and design system.
4. Nutrition and food logging.
5. Weekly retrospective food logging.
6. Recipes and meal planning.
7. Grocery and inventory management.
8. Meal preparation.
9. Workout tracking.
10. Weight and body progress.
11. Hydration.
12. Intelligent automation.
13. Notifications.
14. Health Connect.
15. Google Drive backup and encryption.
16. Performance optimisation.
17. Final QA and release.

Each task must include:

- Unique ID.
- Clear description.
- Priority.
- Dependencies.
- Expected deliverables.
- Acceptance criteria.
- Testing requirements.
- Relevant modules.
- Estimated complexity.

Break large features into small, independently executable tasks.

Avoid assigning an entire development phase as one enormous task.

## Task statuses

Use:

- Backlog.
- Ready.
- In Progress.
- Review Required.
- Changes Requested.
- Approved.
- Done.
- Blocked.

## Task ownership

Every active task must have one clearly identified owner.

The owner may be:
- Codex.
- OpenCode.
- Human.

Do not let both agents independently claim the same task.

If a task is already in progress, the other agent should select another available task.

An agent may take over abandoned work only after checking the latest commits and handoff notes.

---

# 5. AGENT OPERATING PROCEDURE

Whenever either agent starts a new session, it must follow this procedure.

### Step 1 — Understand the project

Read:

1. AGENTS.md.
2. MASTER_SPEC.md.
3. CURRENT_STATE.md.
4. HANDOFF.md.
5. Relevant architecture documentation.

### Step 2 — Inspect Git

Run:

```bash
git status
git branch --show-current
git log -5 --oneline
git fetch origin
```

Inspect available branches and recent commits.

Never overwrite uncommitted user changes.

### Step 3 — Inspect task status

Check GitHub Issues or the selected shared task board.

Identify:
- Ready tasks.
- Active tasks.
- Blocked tasks.
- Tasks awaiting review.

Do not duplicate existing work.

### Step 4 — Select work

If an explicit task is provided, follow it.

Otherwise, select the highest-priority available task whose dependencies are satisfied.

Before starting:
- Claim the task.
- Record the assigned agent.
- Record the branch.
- Record the task status.

### Step 5 — Implement

Follow all existing architecture and coding rules.

Write tests.

Update documentation.

Avoid unrelated changes.

### Step 6 — Verify

Run:
- TypeScript checks.
- ESLint.
- Relevant unit tests.
- Integration tests.
- Android build checks where applicable.

Report actual results.

### Step 7 — Review

Request an independent review agent.

Resolve critical and high-severity findings.

Do not approve your own implementation without independent scrutiny.

### Step 8 — Commit and hand off

Create meaningful Git commits.

Update:
- Task status.
- CURRENT_STATE.md.
- HANDOFF.md.
- TECH_DEBT.md where applicable.
- Review documentation.

Create or update the relevant pull request.

The next agent must be able to continue without asking what happened previously.

---

# 6. GIT AND CONCURRENT DEVELOPMENT STRATEGY

Use Git branches and GitHub pull requests.

Never let two agents edit the same working directory simultaneously.

Use separate Git worktrees when concurrent local development is required.

Suggested branch naming:

```text
main

codex/feature-name
opencode/feature-name

codex/fix-name
opencode/fix-name

review/task-id
```

Rules:

- Never work directly on main.
- Never force-push.
- Never overwrite another agent's changes.
- Never commit secrets.
- Keep commits focused.
- Pull the latest base branch before starting work.
- Review diffs before committing.
- Use pull requests for integration.
- Resolve conflicts deliberately.
- Run regression tests after merging.

Do not automatically merge unreviewed code.

Keep main buildable and reasonably stable.

If both agents need to work on the same feature, divide the work into separate modules or use sequential ownership.

---

# 7. INDEPENDENT REVIEW WORKFLOW

Retain the mandatory independent review process.

After every substantial implementation:

1. Implementation agent completes the feature.
2. Tests run.
3. Independent review agent inspects the Git diff.
4. Review findings are documented.
5. Fixes are implemented.
6. Tests run again.
7. Review agent verifies corrections.
8. Pull request is approved.
9. Changes are merged.

Use these severity levels:

- P0: Critical.
- P1: High.
- P2: Medium.
- P3: Low.

P0 and P1 findings must be resolved before merging, except where a documented and explicitly approved exception exists.

Store review reports in:

```text
docs/reviews/
```

The reviewer must inspect actual code, not simply read the implementation agent's summary.

---

# 8. AUTOMATED QUALITY CHECKS

Configure GitHub Actions where practical.

Create workflows for:

- TypeScript validation.
- ESLint.
- Unit tests.
- Integration tests where feasible.
- Build verification.
- Dependency checks.
- Pull request validation.

Use caching to reduce CI execution time.

Do not make CI unnecessarily expensive.

Protect the main branch with required checks where repository permissions allow.

Do not claim a check passed unless it actually executed successfully.

---

# 9. CODEX AND OPENCODE COMPATIBILITY

The coordination system must not rely on features exclusive to one agent.

Both agents must be able to:

- Read the master specification.
- Read architecture documentation.
- Access shared tasks.
- Claim tasks.
- Create branches.
- Implement features.
- Run tests.
- Request reviews.
- Create pull requests.
- Update documentation.
- Leave handoff notes.

Create tool-specific configuration only where required.

Do not assume Codex configuration automatically applies to OpenCode.

Do not assume OpenCode configuration automatically applies to Codex.

Keep shared project instructions tool-independent.

---

# 10. SESSION END AND HANDOFF REQUIREMENTS

Before ending any substantial session, the agent must:

1. Save its work.
2. Commit completed changes.
3. Record incomplete work.
4. Update task status.
5. Update CURRENT_STATE.md.
6. Update HANDOFF.md.
7. Document test results.
8. Document unresolved issues.
9. Identify the next available task.

If work is unfinished, leave the task in an accurate state.

Never mark incomplete work as done merely to make the board look clean.

---

# 11. IMPORTANT: DO NOT OVERENGINEER

This is a personal application.

Do not build:
- A custom agent orchestration platform.
- A complex distributed task scheduler.
- An unnecessary backend.
- A separate database for agent coordination.
- Excessive automation infrastructure.

Use GitHub, Git, repository documentation and the coding agents' existing capabilities.

Keep the coordination system lightweight and understandable.

---

# 12. IMPLEMENTATION TASK

First inspect the existing LOCKIN repository.

Determine:
- Current project structure.
- Existing Git configuration.
- GitHub remote.
- Existing documentation.
- Existing Codex instructions.
- Existing OpenCode configuration.
- Available GitHub integration and permissions.

Then:

1. Select the most suitable established workflow.
2. Explain the chosen architecture briefly.
3. Create the required shared instruction files.
4. Create the project task breakdown.
5. Configure GitHub templates and CI where appropriate.
6. Create a reliable handoff procedure.
7. Test the workflow locally.
8. Document how Codex and OpenCode should start, claim, complete and review tasks.
9. Update HANDOFF.md with the current state.

If GitHub access is unavailable, implement the repository-local workflow first and document the remaining GitHub setup.

Do not expose tokens or credentials.

Do not modify application functionality unnecessarily during this setup.

## FINAL DELIVERABLE

At completion, provide:

1. Selected coordination workflow.
2. Files created or modified.
3. GitHub configuration completed.
4. How Codex starts work.
5. How OpenCode resumes work.
6. How tasks are claimed.
7. How concurrent development is isolated.
8. How reviews are enforced.
9. How changes are merged.
10. Any remaining manual configuration.

The final system must allow Codex to stop working completely and OpenCode to resume the next task using only the repository, GitHub and its own configured model provider.

Likewise, Codex must be able to resume work after OpenCode finishes.

**The repository, not the conversation, must remember the project.**

---

# ADDENDUM 6 — AUTOMATED TESTING, ANDROID EMULATOR & CONTINUOUS VERIFICATION

# 35. AUTOMATED TESTING, ANDROID EMULATOR & CONTINUOUS VERIFICATION

## OBJECTIVE

LOCKIN must automatically test its own implementation after every substantial development change.

The user should not have to manually navigate the application to discover ordinary bugs.

Codex and OpenCode are responsible for building, installing, launching, testing and verifying the application.

A successful compilation must never be treated as proof that the application works.

Use automated testing at multiple levels.

## A. TESTING TECHNOLOGY

Use the following preferred stack:

- Jest for unit tests.
- React Native Testing Library for component tests.
- Maestro for end-to-end Android UI testing.
- Android Emulator for actual application execution.
- Gradle for Android builds.
- GitHub Actions for continuous integration.
- Android Logcat for runtime error inspection.
- Screenshot capture for visual regression evidence.

Use compatible, maintained versions.

Do not introduce multiple overlapping testing frameworks without a clear reason.

## B. AUTOMATED TESTING PIPELINE

After every substantial application change:

1. Inspect the Git diff.
2. Run TypeScript checks.
3. Run ESLint.
4. Run relevant unit tests.
5. Run database tests.
6. Build the Android application when native or application code changes require it.
7. Install the application on an Android emulator.
8. Launch the application.
9. Execute relevant Maestro flows.
10. Collect logs and screenshots.
11. Inspect crashes and failures.
12. Fix discovered issues.
13. Repeat failed tests.
14. Generate a test report.

Do not skip a failed test simply to finish a development task.

## C. UNIT TESTS

Write tests for all important business logic.

Mandatory coverage:

### Nutrition
- Calorie calculations.
- Macro calculations.
- Food quantity conversions.
- Raw versus cooked food handling.
- Recipe scaling.
- Daily nutrition totals.
- Historical nutrition snapshots.

### Weekly logging
- Multi-day food entry.
- Copying previous meals.
- Duplicate prevention.
- Historical editing.
- Weekly averages.
- Missing-data handling.
- Estimated versus verified entries.

### Inventory
- Ingredient deductions.
- Stock calculations.
- Expiry detection.
- Shopping list generation.
- Recipe-based quantity calculations.

### Fitness
- Weight averages.
- Weight trend calculations.
- Workout volume.
- Personal records.
- Adherence calculations.

### Automation
- Task prioritisation.
- Recurring tasks.
- Missed-task recovery.
- Notification suppression.
- Duplicate task prevention.

### Synchronisation
- Backup creation.
- Backup validation.
- Conflict detection.
- Retry handling.
- Restore integrity.

Include edge cases and invalid inputs.

## D. COMPONENT TESTS

Use React Native Testing Library.

Test:
- Login screen.
- Onboarding.
- Dashboard.
- Food search.
- Food logging forms.
- Recipe builder.
- Weekly food logging.
- Grocery lists.
- Workout screens.
- Weight entry.
- Water tracking.
- Settings.
- Error states.
- Loading states.
- Empty states.

Test observable behaviour rather than relying excessively on component implementation details.

## E. ANDROID EMULATOR

Configure at least one Android emulator for automated testing.

Use a stable Android API level supported by the selected Expo SDK and required native integrations.

Prefer a representative device configuration with:
- Standard Android screen dimensions.
- A realistic density.
- A modern Android version.
- Adequate memory.
- Working network access.

The testing environment must support:
- APK installation.
- Application launch.
- App data clearing.
- Permission changes.
- Application relaunch.
- Screenshot capture.
- Logcat inspection.

Where practical, test a second screen size or Android version before release.

## F. MAESTRO END-TO-END TESTING

Create a dedicated directory:

`maestro/`

Store independent YAML flows for important user journeys.

Each flow must test actual visible application behaviour.

### Mandatory flow 1 — First launch

- Launch LOCKIN.
- Verify splash screen.
- Verify welcome screen.
- Navigate to Google login.
- Verify login screen.
- Verify first-time onboarding.

Use a dedicated test authentication provider or controlled test account for automated tests.

Never automate against a real personal Google account or embed personal credentials in test files.

### Mandatory flow 2 — Dashboard

- Open dashboard.
- Verify daily nutrition summary.
- Verify activity section.
- Verify hydration section.
- Verify task priority.
- Verify quick actions.

### Mandatory flow 3 — Food logging

- Search for a food.
- Select it.
- Enter quantity.
- Save.
- Verify calories and macros.
- Edit the entry.
- Verify updated totals.
- Delete the entry.
- Verify updated totals again.

### Mandatory flow 4 — Weekly retrospective logging

- Open previous week.
- Select a previous date.
- Add multiple foods.
- Copy a saved meal.
- Copy a complete day.
- Verify daily totals.
- Verify weekly averages.
- Verify missing days remain untracked rather than zero-calorie days.

### Mandatory flow 5 — Recipes

- Create a recipe.
- Add ingredients.
- Change quantities.
- Change serving count.
- Verify recalculated nutrition.
- Save the recipe.
- Add it to a food log.

### Mandatory flow 6 — Grocery and meal preparation

- Create a shopping list.
- Add an ingredient.
- Mark it purchased.
- Create a meal-prep task.
- Complete preparation.
- Verify inventory deduction.
- Verify that merely scheduling a meal does not deduct inventory.

### Mandatory flow 7 — Workouts

- Start a workout.
- Record sets.
- Enter repetitions and weight.
- Use the rest timer.
- Save an unfinished workout.
- Relaunch the app.
- Resume the workout.
- Complete it.
- Verify workout history.

### Mandatory flow 8 — Weight and progress

- Add a weight entry.
- Verify updated weight information.
- Add a body measurement.
- Verify history.
- Verify trend calculations.

### Mandatory flow 9 — Hydration

- Add water.
- Verify progress.
- Edit an entry.
- Verify updated totals.
- Reach the daily target.
- Verify that unnecessary hydration reminders are suppressed.

### Mandatory flow 10 — Offline operation

- Disable network access.
- Launch the app.
- Log food.
- Add water.
- Record a workout.
- Verify local persistence.
- Restore network access.
- Verify pending synchronisation.

### Mandatory flow 11 — Backup and restore

- Create an encrypted backup.
- Verify backup status.
- Simulate interrupted synchronisation.
- Retry.
- Restore into a clean test environment.
- Verify restored records.
- Verify that progress photographs were not uploaded.

### Mandatory flow 12 — Application stability

- Navigate between all main tabs.
- Open and close important screens.
- Test repeated interactions.
- Relaunch the app.
- Check for crashes.
- Inspect runtime logs.

## G. TEST DATA AND TEST ENVIRONMENT

Create a dedicated deterministic test dataset.

Use:
- Known food values.
- Known recipes.
- Known workout sessions.
- Known weight records.
- Known inventory quantities.
- Known dates.

Tests must produce repeatable results.

Do not use the user's actual personal data.

Provide test database reset and seed scripts.

Keep development, test and production data separate.

## H. GOOGLE AUTHENTICATION AND EXTERNAL INTEGRATIONS

Do not require personal credentials for automated testing.

Create abstraction layers for external services.

Provide test implementations for:
- Google authentication.
- Google Drive.
- Health Connect.
- Notifications.

Use mocks or controlled test providers in automated tests.

Also perform real integration tests in an explicitly configured Android environment before release.

Never claim that a mocked integration proves the actual external integration works.

## I. VISUAL REGRESSION TESTING

Capture screenshots of important screens.

Include:
- Splash screen.
- Welcome screen.
- Google login.
- Onboarding.
- Dashboard.
- Food logging.
- Weekly food log.
- Recipe builder.
- Grocery management.
- Workout screen.
- Progress dashboard.

Compare screenshots against approved baselines.

Use tolerances for small rendering differences.

Do not automatically approve major visual changes.

Store failure screenshots as CI artifacts.

Check:
- Layout overflow.
- Text clipping.
- Missing icons.
- Incorrect spacing.
- Unexpected empty areas.
- Broken progress indicators.
- Dark theme consistency.

## J. PERFORMANCE TESTING

Measure:
- Cold startup.
- Warm startup.
- Dashboard rendering.
- Food search response.
- Food save operation.
- Tab switching.
- Long-list scrolling.
- Memory usage.
- Unnecessary re-rendering.

Establish baseline measurements and track regressions.

Do not claim performance improvements without measurements.

## K. GITHUB ACTIONS

Configure CI workflows.

Run lightweight checks for every relevant pull request.

Run full Android testing for application changes.

The CI workflow should:

1. Check out the repository.
2. Install the correct Node.js version.
3. Install dependencies using the lockfile.
4. Run TypeScript validation.
5. Run ESLint.
6. Run unit tests.
7. Build Android.
8. Start an emulator where supported.
9. Install the APK.
10. Run Maestro flows.
11. Collect test results.
12. Upload relevant screenshots and logs.

Cache dependencies and Android build outputs where appropriate.

Avoid unnecessarily rebuilding when only documentation changes.

## L. AUTOMATIC FAILURE HANDLING

If a test fails:

1. Identify the failing test.
2. Capture logs and screenshots.
3. Identify the likely cause.
4. Reproduce the issue.
5. Fix the underlying problem.
6. Add a regression test.
7. Rerun the failing test.
8. Run related tests.
9. Run the broader suite when appropriate.

Do not repeatedly rerun a failing test without investigating it.

Do not disable tests to make CI green.

Do not modify expected test results merely to hide a defect.

## M. REVIEW AGENT INTEGRATION

After implementation and initial tests, launch the independent review agent.

The reviewer must inspect:
- Actual Git changes.
- Test results.
- Failed test history.
- Relevant screenshots.
- Runtime logs.
- Database behaviour.
- Performance measurements.

The reviewer must identify missing tests and weak assertions.

After fixes, run the affected tests again.

A development task cannot be marked complete while critical automated tests are failing.

## N. TEST REPORTS

Store reports in:

`docs/testing/reports/`

Each report must include:

- Commit hash.
- Build identifier.
- Test environment.
- Tests executed.
- Tests passed.
- Tests failed.
- Tests skipped.
- Build result.
- Screenshots.
- Relevant logs.
- Known limitations.
- Final status.

Never report an unexecuted test as passed.

## O. DEFINITION OF DONE

A feature is complete only when:

- Implementation is finished.
- TypeScript checks pass.
- Lint passes.
- Relevant unit tests pass.
- Relevant component tests pass.
- Relevant database tests pass.
- Android build succeeds where applicable.
- Relevant Maestro flows pass.
- No unresolved P0 or P1 issue remains.
- Independent review is complete.
- Test reports are updated.

The objective is to detect and fix ordinary software defects automatically before the user needs to inspect the application.

The application must be tested as software and as an actual Android product, not merely as a collection of source files.

# ADDITIONAL REQUIREMENT: HUMAN-LIKE ANDROID UI TESTING

## 1. Objective

Codex must test LOCKIN by interacting with the actual running Android application, simulating how a real person uses it.

Testing must go beyond inspecting source code, running unit tests, checking TypeScript, or successfully compiling the APK.

The objective is to verify that the application works correctly from the user's perspective, including navigation, interactions, visual presentation, data persistence, permissions, error handling and complete user workflows.

## 2. Required Testing Environment

Configure and maintain the following testing environment:

- Android Studio.
- Android SDK and Android Emulator.
- Android Debug Bridge (ADB).
- Maestro for end-to-end UI automation.
- Jest for unit testing.
- React Native Testing Library for component testing.
- GitHub Actions for continuous integration.
- Android Logcat for runtime diagnostics.

Codex must be able to:

1. Build the Android debug APK.
2. Start and configure an Android emulator.
3. Install the APK.
4. Launch LOCKIN.
5. Interact with the application through UI automation.
6. Inspect screenshots and UI hierarchy.
7. Read Android runtime logs.
8. Identify failures.
9. Fix defects.
10. Rebuild and repeat failed tests.

If the environment does not support a particular operation, Codex must report the limitation rather than claim the test was completed.

## 3. Human-Like Interaction Testing

Use Maestro to simulate real user interactions.

Test interactions must include:

- Tapping buttons and interactive elements.
- Entering text into input fields.
- Searching and selecting results.
- Scrolling through lists and pages.
- Switching between navigation tabs.
- Opening and closing dialogs.
- Using dropdowns and selection controls.
- Interacting with the Android keyboard.
- Handling system permission dialogs.
- Navigating backwards and forwards.
- Backgrounding and reopening the application.
- Force-closing and relaunching the application.

Use stable accessibility identifiers (`testID`) for important interactive components.

Tests must interact with the actual application UI rather than directly manipulating application state to simulate success.

## 4. Complete User Journey Testing

Create repeatable end-to-end tests for the following workflows.

### Onboarding
- Fresh application installation.
- First launch.
- Welcome screen.
- Google sign-in flow, using an appropriate test account or mocked authentication environment.
- Profile configuration.
- Target configuration.
- Permission requests.
- Completion of onboarding.
- Returning-user launch.

### Nutrition
- Open Food.
- Search for a food.
- Select a result.
- Enter quantity.
- Save the entry.
- Verify calculated nutrition.
- Verify dashboard updates.
- Edit and delete an entry.
- Verify historical records.

### Retrospective Food Logging
- Navigate to a previous date.
- Add meals to that date.
- Add multiple meals.
- Edit existing entries.
- Copy meals between dates.
- Verify weekly summaries.
- Verify that missing days are not incorrectly counted as zero intake.

### Recipes and Meal Planning
- Create a recipe.
- Add ingredients.
- Set quantities and servings.
- Verify nutritional calculations.
- Save the recipe.
- Add it to a meal plan.
- Modify planned meals.
- Confirm actual preparation separately from planning.

### Grocery and Inventory
- Add grocery items.
- Edit quantities.
- Mark items as purchased.
- Update inventory.
- Generate shopping lists.
- Verify inventory deductions only occur after confirmed preparation.

### Meal Preparation
- Open the preparation checklist.
- Complete individual tasks.
- Verify completion states.
- Verify recurring preparation schedules.

### Workouts
- Open a workout.
- Start a session.
- Record exercises, sets, repetitions and weights.
- Use rest timers.
- Resume an unfinished workout.
- Complete the workout.
- Verify workout history and personal records.

### Progress
- Enter body weight.
- Enter measurements.
- View progress charts.
- Verify historical entries.
- Verify trend calculations.

### Water Tracking
- Add water through quick-add buttons.
- Verify daily totals.
- Test reminder scheduling.
- Verify reminder suppression when the target is reached.

### Notifications
- Schedule reminders.
- Verify notification delivery.
- Interact with notifications.
- Snooze and reschedule reminders.
- Verify disabled reminders do not reappear.
- Test notification permission denial and later re-enablement.

### Offline Functionality
- Disable internet connectivity.
- Launch LOCKIN.
- Navigate through available features.
- Create and edit local records.
- Close and reopen the application.
- Verify data persistence.
- Restore connectivity.
- Verify appropriate synchronisation behaviour.

### Backup and Restore
- Create a backup using a test Google account.
- Verify backup completion.
- Restore into a clean test installation.
- Verify restored records.
- Test invalid, incomplete and corrupted backup files.
- Verify that failed restoration does not destroy existing data.

### Application Recovery
- Force-close the application.
- Relaunch it.
- Background and foreground the application.
- Rotate the device where supported.
- Test interrupted workflows.
- Verify that saved data remains intact.

## 5. Visual Inspection and Screenshot Testing

Codex must inspect the actual rendered application, not just its component structure.

For every major screen:

- Capture screenshots.
- Inspect layout and spacing.
- Check text readability.
- Check alignment and clipping.
- Check scrolling behaviour.
- Check dark theme consistency.
- Check loading, empty, success and error states.
- Check that buttons and interactive elements are visible and usable.

Where practical, test different:

- Android screen sizes.
- Screen resolutions.
- Display densities.
- Android versions.
- Font scaling settings.

Use screenshot regression testing where practical.

Do not automatically accept screenshots containing obvious visual defects merely because the UI automation passed.

## 6. Android-Specific Behaviour

Test Android functionality that cannot be adequately verified through ordinary component tests.

Include:

- Runtime permission requests.
- Permission denial and recovery.
- Android notification behaviour.
- Keyboard visibility and dismissal.
- System back-button behaviour.
- App backgrounding and foregrounding.
- Process termination and restoration.
- Local database persistence.
- Android lifecycle events.
- Health Connect permissions and integration using appropriate test data.
- Camera and photo permissions where implemented.

## 7. Runtime Diagnostics and Evidence

Every failed end-to-end test must produce diagnostic evidence where possible.

Collect:

- Screenshots.
- Screen recordings for important failures where supported.
- Maestro execution reports.
- Android Logcat output.
- JavaScript error logs.
- Stack traces.
- Relevant database state.
- Build and test output.

Codex must inspect this evidence before deciding how to fix a defect.

Do not suppress errors, disable failing tests, weaken assertions or change expected results merely to obtain a passing test.

## 8. Test Failure and Recovery Procedure

When a test fails:

1. Reproduce the failure.
2. Identify whether it originates from the UI, application logic, database, Android platform, integration or test infrastructure.
3. Inspect relevant logs and screenshots.
4. Identify the underlying cause.
5. Implement the correction.
6. Add or update a regression test.
7. Rebuild the application when necessary.
8. Repeat the failed test.
9. Run related tests to identify regressions.
10. Record the result.

A test must not be marked passed unless it has actually completed successfully.

## 9. Mandatory Testing Gates

For every substantial feature or development phase:

- TypeScript type checking must pass.
- Linting must pass.
- Relevant unit tests must pass.
- Relevant component tests must pass.
- Relevant integration tests must pass.
- Android build verification must pass.
- Relevant Maestro end-to-end tests must pass.
- Visual inspection must be performed for affected screens.
- Runtime errors must be investigated.
- Independent code review must be completed.

If a test cannot be executed, document the exact reason and classify the feature as partially verified rather than fully verified.

## 10. Definition of Done: Actual User Experience

A feature is NOT complete merely because:

- The code exists.
- The screen renders.
- TypeScript compiles.
- The APK builds.
- Unit tests pass.
- A reviewer approves the implementation.

A feature is complete only when:

1. Its intended functionality is implemented.
2. Its relevant automated tests pass.
3. Its actual Android UI workflow has been tested.
4. Its data persists correctly.
5. Its error and empty states behave correctly.
6. Its visual presentation has been inspected.
7. No unresolved P0 or P1 defects remain.
8. Independent review is complete.
9. Test evidence and documentation are recorded.

## 11. Testing Reports

Maintain test reports under:

`docs/testing/`

Include:

- `TEST_PLAN.md`
- `E2E_TEST_COVERAGE.md`
- `DEVICE_COMPATIBILITY.md`
- `TEST_RESULTS.md`
- `KNOWN_TEST_LIMITATIONS.md`

For every development phase, record:

- Features tested.
- Test cases executed.
- Tests passed.
- Tests failed.
- Tests skipped.
- Known limitations.
- Screenshots and logs.
- Outstanding defects.

Never fabricate test results or claim successful real-device testing when only emulator testing was performed.

## 12. Human Testing Remains Mandatory

Automated testing does not replace actual human usability testing.

The developer must periodically install LOCKIN on a physical Android device and manually evaluate:

- Ease of navigation.
- Responsiveness.
- Readability.
- Input convenience.
- Overall usability.
- Battery and memory behaviour.
- Real-world notification reliability.
- Whether workflows make sense to an ordinary user.

Record discovered usability problems and address significant issues before release.

**Final principle: Codex must verify LOCKIN as a functioning Android application, not merely as a collection of successfully compiled source files.**
