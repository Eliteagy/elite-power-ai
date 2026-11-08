# Discord Social SDK Release 1.9.15332

Date: 2026-04-23
Categories: Discord Social SDK
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L669) · [Year index](INDEX.md)

<a id="source-discord-social-sdk-release-1915332"></a>


A Discord Social SDK release is available with these updates:

<a id="source-playstation-5-1"></a>

### Playstation 5

- Added OS 13.000 support

<a id="source-activity-invites"></a>

### Activity Invites

- Accepting an activity invite over RPC now uses the invite's `application_id` when present. This fixes cases where sibling-application invites were sometimes attributed to the wrong app, and only affects teams using Publisher Level Account Linking for one auth flow across all games in their portfolio.
