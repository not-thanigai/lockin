# Integrations

No remote integration is active in the current build. The app works locally and does not upload personal fitness data.

## Planned integrations

- **Health Connect:** native Android development build, explicit read permissions, permission-denied fallback, provenance / sync cursor records, and local aggregation tests are required.
- **Notifications:** local scheduling with permission checks, deduplication, quiet hours, and reschedule behavior. Android does not guarantee exact delivery for ordinary schedules.
- **Google Drive:** narrow `drive.appdata` OAuth scope, authenticated encryption before upload, user-controlled recovery key, versioned atomic package, restore validation, and conflict handling. No recovery secret belongs in Drive.
- **Photos:** local-only encrypted originals and thumbnails, with backup exclusion verified at the platform layer.

Do not put credentials in source control. Before a service is enabled, document the data transmitted, permissions, setup steps, offline behavior, and tests here.
