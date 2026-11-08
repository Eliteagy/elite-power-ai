# Search Guild Messages

Date: 2026-03-19
Categories: HTTP API
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L828) · [Year index](INDEX.md)

<a id="source-search-guild-messages"></a>


Documentation for the [Search Guild Messages](https://docs.discord.com/developers/resources/message#search-guild-messages) endpoint has been added. Bots can use it to search messages within a guild with filters such as content, author, channel, mentions, attachments, embeds, and more. Results may be sorted by timestamp or relevance. The endpoint requires `READ_MESSAGE_HISTORY` permission and the `MESSAGE_CONTENT` [Privileged Intent](https://docs.discord.com/developers/events/gateway#privileged-intents). Error code `110000` was added to the [error codes](https://docs.discord.com/developers/topics/opcodes-and-status-codes#json) table for the index-not-ready response returned when a guild has not been indexed for search yet.
