# Messages message delete
Context: Discord developer reference: Messages message delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](messages-message-update.md) / [Following source section](message-delete-bulk.md)
<a id="source-message-delete"></a> <a id="source-message-delete-event-fields"></a>

#### Message Delete

 Dispatched after a message is deleted.

###### Message Delete Event Fields

| Field | Type | Description |
| --- | --- | --- |
| id | snowflake | ID of the message |
| channel_id | snowflake | ID of the channel |
| guild_id? | snowflake | ID of the guild |

