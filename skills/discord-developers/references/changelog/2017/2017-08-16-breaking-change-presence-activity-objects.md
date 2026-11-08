# Breaking Change: Presence Activity Objects

Date: 2017-08-16
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4497) · [Year index](INDEX.md)

<a id="source-breaking-change-presence-activity-objects"></a>


The `type` field in the [activity object](https://docs.discord.com/developers/events/gateway-events#activity-object) is now required when that object is not null in [Gateway Status Update](https://docs.discord.com/developers/events/gateway-events#update-presence) and [Presence Update](https://docs.discord.com/developers/events/gateway-events#presence-update) payloads.
