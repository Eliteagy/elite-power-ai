# Guild Scheduled Events

Date: 2021-11-23
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3928) · [Year index](INDEX.md)

<a id="source-guild-scheduled-events"></a>


- Added official support for `guild_scheduled_events` on the `Guild` resource sent with `GUILD_CREATE` event

<a id="source-nov-18-2021"></a>

#### Nov 18, 2021

- Breaking change to the return type for `GET /guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}/users`
- Added `with_user_count` query param for `GET /guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}`
- Response for `GET /guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}` now returns an extra `creator` field by default
- Added more detail and clarification for Guild Scheduled Events.
- Documented `before` and `after` query params for `GET /guilds/{guild.id}/scheduled-events/{guild_scheduled_event.id}/users`

<a id="source-nov-15-2021"></a>

#### Nov 15, 2021

Added documentation for the recently released Guild Scheduled Events feature.
