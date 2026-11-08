# Crosspost message
Context: Discord developer reference: Crosspost message
[Source](reactions-edits-and-pins-index.md) / [Previous source section](create-message-json-form-params.md) / [Following source section](create-reaction.md)
<a id="source-crosspost-message"></a>

### Crosspost Message

  Publishes an Announcement Channel message to follower channels. If the current user authored the message, `SEND_MESSAGES` is required; for messages from other users, the current user also needs `MANAGE_MESSAGES`. A successful call returns a [message](https://docs.discord.com/developers/resources/message#message-object) object and emits a [Message Update](https://docs.discord.com/developers/events/gateway-events#message-update) Gateway event.

