# Guild Audit Log Events

Date: 2023-01-18
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3367) · [Year index](INDEX.md)

<a id="source-guild-audit-log-events"></a>

Discord added the [`GUILD_AUDIT_LOG_ENTRY_CREATE`](https://docs.discord.com/developers/events/gateway-events#guild-audit-log-entry-create) gateway event so applications can respond to guild moderation actions. Receiving it requires `VIEW_AUDIT_LOG`, and gateway connections must request the [`GUILD_MODERATION` intent](https://docs.discord.com/developers/events/gateway#gateway-intents).
