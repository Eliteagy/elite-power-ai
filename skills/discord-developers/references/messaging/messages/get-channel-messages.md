# Get channel messages
Context: Discord developer reference: Get channel messages
[Source](attachments-and-message-creation-index.md) / [Previous source section](shared-client-theme-object-struture.md) / [Following source section](search-guild-messages.md)
<a id="source-get-channel-messages"></a> <a id="source-query-string-params"></a>

### Get Channel Messages

  Gets messages from a channel. On success, returns an array of [message](https://docs.discord.com/developers/resources/message#message-object) objects ordered newest to oldest. For a guild channel, the current user needs `VIEW_CHANNEL`; for a voice channel, the user needs `CONNECT` as well. Without `READ_MESSAGE_HISTORY`, the channel returns no messages. The `before`, `after`, and `around` parameters are mutually exclusive; send only one.

###### Query String Params

| Field | Type | Description | Default |
| --- | --- | --- | --- |
| around? | snowflake | message ID to center results around | absent |
| before? | snowflake | message ID to fetch messages before | absent |
| after? | snowflake | message ID to fetch messages after | absent |
| limit? | integer | maximum messages to return (1-100) | 50 |

