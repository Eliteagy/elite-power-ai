# Message reaction add
Context: Discord developer reference: Message reaction add
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](messages.md) / [Previous source section](message-delete-bulk.md) / [Following source section](message-reaction-remove.md)
<a id="source-message-reaction-add"></a> <a id="source-message-reaction-add-event-fields"></a>

#### Message Reaction Add

 Dispatched after a user adds a reaction to a message.

###### Message Reaction Add Event Fields

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | ID of the user |
| channel_id | snowflake | ID of the channel |
| message_id | snowflake | ID of the message |
| guild_id? | snowflake | ID of the guild |
| member? | member object | Member that reacted, when the reaction occurred in a guild |
| emoji | a partial emoji object | Emoji used to react - example |
| message_author_id? | snowflake | ID of the user who wrote the message that received the reaction |
| burst | boolean | true when this is a super-reaction |
| burst_colors? | array of strings | Super-reaction animation colors in "#rrggbb" format |
| type | integer | The type of reaction |

