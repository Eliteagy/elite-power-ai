# Guild ban remove
Context: Discord developer reference: Guild ban remove
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-ban-add.md) / [Following source section](guild-emojis-update.md)
<a id="source-guild-ban-remove"></a> <a id="source-guild-ban-remove-event-fields"></a>

#### Guild Ban Remove

 Dispatched when a user is unbanned from a guild. Bots receive it only with the `BAN_MEMBERS` or `VIEW_AUDIT_LOG` permission.

###### Guild Ban Remove Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| user | a user object | User who was unbanned |

