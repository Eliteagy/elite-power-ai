# Message delete bulk
Context: Discord developer reference: Message delete bulk
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](messages-message-delete.md) / [Following source section](message-reaction-add.md)
<a id="source-message-delete-bulk"></a> <a id="source-message-delete-bulk-event-fields"></a>

#### Message Delete Bulk

 Dispatched after multiple messages are deleted together.

###### Message Delete Bulk Event Fields

| Field | Type | Description |
| --- | --- | --- |
| ids | array of snowflakes | IDs of the messages |
| channel_id | snowflake | ID of the channel |
| guild_id? | snowflake | ID of the guild |

