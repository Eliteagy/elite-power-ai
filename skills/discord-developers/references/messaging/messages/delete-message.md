# Delete message
Context: Discord developer reference: Delete message
[Source](reactions-edits-and-pins-index.md) / [Previous source section](edit-message.md) / [Following source section](bulk-delete-messages.md)
<a id="source-delete-message"></a>

### Delete Message

  Deletes a message. In a guild channel, deleting a message sent by someone other than the current user requires `MANAGE_MESSAGES`. Success returns a 204 empty response and emits a [Message Delete](https://docs.discord.com/developers/events/gateway-events#message-delete) Gateway event. The endpoint accepts the `X-Audit-Log-Reason` header.

