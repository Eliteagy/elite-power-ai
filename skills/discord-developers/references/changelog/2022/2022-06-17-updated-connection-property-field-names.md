# Updated Connection Property Field Names

Date: 2022-06-17
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3818) · [Year index](INDEX.md)

<a id="source-updated-connection-property-field-names"></a>


The `$` prefix on [identify connection properties](https://docs.discord.com/developers/events/gateway-events#identify-identify-connection-properties) is deprecated. Use `os`, `browser`, and `device` instead. If `$`-prefixed names are passed, they resolve to the new names. API v11 removes support for `$os`, `$browser`, and `$device`.
