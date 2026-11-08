# Thread list sync
Context: Discord developer reference: Thread list sync
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](channels-channel-create.md) / [Previous source section](channels-thread-delete.md) / [Following source section](thread-member-update.md)
<a id="source-thread-list-sync"></a> <a id="source-thread-list-sync-event-fields"></a>

#### Thread List Sync

 Dispatched after the current user *gains* access to a channel.

###### Thread List Sync Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| channel_ids? | array of snowflakes | Parent channel IDs for the thread sync. If this field is absent, the sync covers the whole guild. The array can also include channel_ids without active threads, which signals that local data for those channels should be cleared. |
| threads | array of channel objects | Active threads in the specified channels that the current user can access |
| members | array of thread member objects | Thread member objects for the current user from synced threads, showing which threads include the current user |

