# Invites invite delete
Context: Discord developer reference: Invites invite delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](invites.md) / [Previous source section](invites-invite-create.md) / [Following source section](messages.md)
<a id="source-invite-delete"></a> <a id="source-invite-delete-event-fields"></a>

#### Invite Delete

 Dispatched after an invite is deleted.

###### Invite Delete Event Fields

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | Channel of the invite |
| guild_id? | snowflake | Guild of the invite |
| code | string | Unique invite code |

