# Bulk delete messages
Context: Discord developer reference: Bulk delete messages
[Source](reactions-edits-and-pins-index.md) / [Previous source section](delete-message.md) / [Following source section](get-channel-pins.md)
<a id="source-bulk-delete-messages"></a> <a id="source-json-params"></a>

### Bulk Delete Messages

  Deletes multiple messages in one request. This endpoint is limited to guild channels and requires `MANAGE_MESSAGES`. Success returns a 204 empty response and emits a [Message Delete Bulk](https://docs.discord.com/developers/events/gateway-events#message-delete-bulk) Gateway event. Message IDs that are invalid or do not exist still count toward the minimum and maximum message counts, currently 2 and 100. The request fails with 400 BAD REQUEST if any supplied message is older than 2 weeks or if the same message ID appears more than once. The endpoint accepts the `X-Audit-Log-Reason` header.

###### JSON Params

| Field | Type | Description |
| --- | --- | --- |
| messages | array of snowflakes | array of message ids to delete (2-100) |

