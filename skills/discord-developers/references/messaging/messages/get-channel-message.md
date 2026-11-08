# Get channel message
Context: Discord developer reference: Get channel message
[Source](attachments-and-message-creation-index.md) / [Previous source section](search-sort-modes.md) / [Following source section](create-message.md)
<a id="source-get-channel-message"></a>

### Get Channel Message

  Gets one message from the channel. On success, returns a [message](https://docs.discord.com/developers/resources/message#message-object) object. In guild channels, the current user needs `VIEW_CHANNEL` and `READ_MESSAGE_HISTORY`; in voice channels, `CONNECT` is required too.

