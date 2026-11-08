# Message poll vote remove
Context: Discord developer reference: Message poll vote remove
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](message-poll-vote-add.md) / [Following source section](rate-limits-rate-limited.md)
<a id="source-message-poll-vote-remove"></a> <a id="source-message-poll-vote-remove-fields"></a>

#### Message Poll Vote Remove

 Emitted when a user withdraws a poll vote. For polls that allow multiple selections, Discord sends one event for each answer.

###### Message Poll Vote Remove Fields

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | ID of the user |
| channel_id | snowflake | ID of the channel |
| message_id | snowflake | ID of the message |
| guild_id? | snowflake | ID of the guild |
| answer_id | integer | ID of the answer |

