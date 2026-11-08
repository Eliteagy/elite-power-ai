# Message reaction remove emoji
Context: Discord developer reference: Message reaction remove emoji
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](message-reaction-remove-all-event-fields.md) / [Following source section](presence-presence-update.md)
<a id="source-message-reaction-remove-emoji"></a> <a id="source-message-reaction-remove-emoji-event-fields"></a>

#### Message Reaction Remove Emoji

 Emitted when a bot clears all reactions using a particular emoji from a message.

###### Message Reaction Remove Emoji Event Fields

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | ID of the channel |
| guild_id? | snowflake | ID of the guild |
| message_id | snowflake | ID of the message |
| emoji | partial emoji object | Emoji that was removed |

