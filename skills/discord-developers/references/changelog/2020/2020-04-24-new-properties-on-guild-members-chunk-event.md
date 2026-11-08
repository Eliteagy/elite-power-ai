# New Properties on Guild Members Chunk Event

Date: 2020-04-24
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L4218) · [Year index](INDEX.md)

<a id="source-new-properties-on-guild-members-chunk-event"></a>


[Guild Members Chunk](https://docs.discord.com/developers/events/gateway-events#guild-members-chunk) gateway events now include `chunk_index` and `chunk_count`. Use them to track how many chunk events remain after a [Request Guild Members](https://docs.discord.com/developers/events/gateway-events#request-guild-members) command.
