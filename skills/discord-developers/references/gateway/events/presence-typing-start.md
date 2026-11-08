# Presence typing start
Context: Discord developer reference: Presence typing start
[Source](reaction-presence-and-user-events-index.md) / [Owning endpoint, event, object or procedure conditions](presence-presence-update.md) / [Previous source section](example-activity-with-rich-presence.md) / [Following source section](presence-user-update.md)
<a id="source-typing-start"></a> <a id="source-typing-start-event-fields"></a>

#### Typing Start

 Emitted when a user begins typing in a channel.

###### Typing Start Event Fields

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | ID of the channel |
| guild_id? | snowflake | ID of the guild |
| user_id | snowflake | ID of the user |
| timestamp | integer | Unix time in seconds when the user began typing. |
| member? | member object | Member that began typing, included when the channel is in a guild. |

