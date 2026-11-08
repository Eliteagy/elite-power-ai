# Limit Number of Fields in Embeds

Date: 2023-12-19
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3050) · [Year index](INDEX.md)

<a id="source-limit-number-of-fields-in-embeds"></a>


[Embed objects](https://docs.discord.com/developers/resources/message#embed-object) now enforce the 25 [embed fields](https://docs.discord.com/developers/resources/message#embed-object-embed-field-structure) limit more explicitly. Sending more than 25 entries in an embed's `fields` property returns an error. Before this change, Discord displayed only the first 25 fields and returned no error.
