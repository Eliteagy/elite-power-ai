# Interaction Channel Data

Date: 2023-04-06
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3320) · [Year index](INDEX.md)

<a id="source-interaction-channel-data"></a>


Interactions now include `channel`, a partial channel object guaranteed to contain `id` and `type`. Start using this field to identify the interaction source channel; `channel_id` may be deprecated later. See the [interaction documentation](https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object).
