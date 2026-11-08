# Default Value in Auto-populated Select Menus

Date: 2023-09-22
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3187) · [Year index](INDEX.md)

<a id="source-default-value-in-auto-populated-select-menus"></a>


`default_values` was added for user (`5`), role (`6`), mentionable (`7`), and channel (`8`) [select menu components](https://docs.discord.com/developers/components/reference). `default_values` is a list of [default value objects](https://docs.discord.com/developers/components/reference#user-select-select-default-value-structure), each with an `id` snowflake and a `type` of `"user"`, `"role"`, or `"channel"`.
