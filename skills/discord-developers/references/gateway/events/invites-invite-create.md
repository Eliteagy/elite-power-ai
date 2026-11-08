# Invites invite create
Context: Discord developer reference: Invites invite create
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](invites.md) / [Following source section](invites-invite-delete.md)
<a id="source-invite-create"></a> <a id="source-invite-create-event-fields"></a>

#### Invite Create

 Dispatched after a channel invite is created.

###### Invite Create Event Fields

| Field | Type | Description |
| --- | --- | --- |
| channel_id | snowflake | Channel the invite is for |
| code | string | Unique invite code |
| created_at | ISO8601 timestamp | Time when the invite was created |
| guild_id? | snowflake | Guild of the invite |
| inviter? | user object | User that created the invite |
| max_age | integer | Invite validity duration (in seconds) |
| max_uses | integer | Maximum use count for the invite |
| target_type? | integer | Target type for this voice channel invite |
| target_user? | user object | User whose stream should be shown for this voice channel stream invite |
| target_application? | partial application object | Embedded application opened by this voice channel embedded application invite |
| temporary | boolean | Whether the invite is temporary; invited users are kicked when they disconnect unless they receive a role |
| uses | integer | Number of times the invite has been used; always 0 |
| expires_at | ?ISO8601 timestamp | Expiration date for this invite |
| role_ids? | array of snowflakes | Role ID(s) assigned in the guild to users who accept this invite |

