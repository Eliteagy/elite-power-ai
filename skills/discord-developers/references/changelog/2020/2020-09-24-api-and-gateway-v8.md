# API and Gateway V8

Date: 2020-09-24
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4150) · [Year index](INDEX.md)

<a id="source-api-and-gateway-v8"></a>


API and Gateway v8 are now introduced. The documentation marks the changes, and [this commit in our docs repo](https://github.com/discord/discord-api-docs/commit/545ff4a7883e5eee7ee91d19a5e5d760a0730033) shows the full diff. The changes are:
- API and Gateway v8 are available now; v6 remains the default for the moment.
- [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents) must now be used
- `guild_subscriptions` in identify was removed and replaced by [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents).
- Permission values now use string-serialized numbers everywhere, so `permissions_new`, `allow_new`, and `deny_new` were removed
- The `game` field was removed; use the first item in `activities` when you need an equivalent value
- Channel Permission Overwrite `type`s now use numeric values 0 and 1 instead of string values `role` and `member`. Because of a current technical constraint, audit log `options` still expose them as string-serialized numbers.
- `embed_enabled` and `embed_channel_id` were removed; use `widget_enabled` and `widget_channel_id` instead.
- Form body validation errors now return clearer messages. [See more here](https://docs.discord.com/developers/reference#error-messages)
- `Retry-After` header values and `retry_after` response body values now use seconds, not milliseconds; for example, `123` means 123 seconds
- `X-RateLimit-Precision` is ignored now. `X-RateLimit-Reset` and `X-RateLimit-Reset-After` always use millisecond precision, such as `123.456` rather than `124`
- Bots no longer receive [Channel Create Gateway Event](https://docs.discord.com/developers/events/gateway-events#channel-create) for DMs
- `delete-message-days` is no longer supported; use `delete_message_days`.
- [Presence Update Gateway Event](https://docs.discord.com/developers/events/gateway-events#presence-update) no longer includes `roles`, `premium_since`, or `nick`
- Some [integration object](https://docs.discord.com/developers/resources/guild#integration-object) fields were removed for Discord application integrations
- [Get Guild Integrations](https://docs.discord.com/developers/resources/guild#get-guild-integrations) no longer accepts `include_applications`; application integrations are always returned.
- These deprecated routes were removed in favor of clearer route names:
Replaced by `/guilds/<guild_id>/widget`:
- `/guilds/<guild_id>/embed`
Replaced by `/guilds/<guild_id>/widget.json`:
- `/servers/<guild_id>/embed.json`
- `/servers/<guild_id>/widget.json`
- `/guilds/<guild_id>/embed.json`
Replaced by `/guilds/<guild_id>/widget.png`:
- `/guilds/<guild_id>/embed.png`
Replaced by `/channels/<channel_id>/messages/bulk-delete`:
- `/channels/<channel_id>/messages/bulk_delete/`
Replaced by `/invites/<code>/`:
- `/invite/<code>/`
