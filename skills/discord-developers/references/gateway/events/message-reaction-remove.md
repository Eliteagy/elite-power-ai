# Message reaction remove
Context: Discord developer reference: Message reaction remove
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](message-reaction-add.md) / [Following source section](message-reaction-remove-all.md)
<a id="source-message-reaction-remove"></a> <a id="source-message-reaction-remove-event-fields"></a>

#### Message Reaction Remove

 Dispatched after a user removes a reaction from a message.

###### Message Reaction Remove Event Fields

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | ID of the user |
| channel_id | snowflake | ID of the channel |
| message_id | snowflake | ID of the message |
| guild_id? | snowflake | ID of the guild |
| emoji | a partial emoji object | Emoji used to react - example |
| burst | boolean | true when this was a super-reaction |
| type | integer | The type of reaction |

