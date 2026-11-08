# Channel pins update
Context: Discord developer reference: Channel pins update
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](thread-members-update.md) / [Following source section](entitlements-entitlement-create.md)
<a id="source-channel-pins-update"></a> <a id="source-channel-pins-update-event-fields"></a>

#### Channel Pins Update

 Dispatched when a text channel message is pinned or unpinned. Deleting a pinned message does not send this event.

###### Channel Pins Update Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id? | snowflake | ID of the guild |
| channel_id | snowflake | ID of the channel |
| last_pin_timestamp? | ?ISO8601 timestamp | Timestamp for when the newest pinned message was pinned |

