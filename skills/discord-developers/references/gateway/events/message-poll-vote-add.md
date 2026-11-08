# Message poll vote add
Context: Discord developer reference: Message poll vote add
[Source](reaction-presence-and-user-events-index.md) / [Previous source section](subscriptions-subscription-delete.md) / [Following source section](message-poll-vote-remove.md)
<a id="source-polls"></a> <a id="source-message-poll-vote-add"></a> <a id="source-message-poll-vote-add-fields"></a>

### Polls

#### Message Poll Vote Add

 Emitted when a user casts a poll vote. For polls with multiple selections, Discord sends one event for each answer.

###### Message Poll Vote Add Fields

| Field | Type | Description |
| --- | --- | --- |
| user_id | snowflake | ID of the user |
| channel_id | snowflake | ID of the channel |
| message_id | snowflake | ID of the message |
| guild_id? | snowflake | ID of the guild |
| answer_id | integer | ID of the answer |

