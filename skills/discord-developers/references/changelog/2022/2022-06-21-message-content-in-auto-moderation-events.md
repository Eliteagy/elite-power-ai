# Message Content in Auto Moderation events

Date: 2022-06-21
Categories: Breaking Change
[Official source](https://github.com/discord/discord-api-docs/blob/37148620d2324292b76047541d5f8331f81ea77a/developers/change-log.mdx#L3809) · [Year index](INDEX.md)

<a id="source-message-content-in-auto-moderation-events"></a>


In API v10, receiving non-empty `content` and `matched_content` values in [`AUTO_MODERATION_ACTION_EXECUTION`](https://docs.discord.com/developers/events/gateway-events#auto-moderation-action-execution) gateway events requires the `MESSAGE_CONTENT` (`1 << 15`) intent. This matches intended message-content behavior across the API.
