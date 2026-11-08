# Guild ban add
Context: Discord developer reference: Guild ban add
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-audit-log-entry-create.md) / [Following source section](guild-ban-remove.md)
<a id="source-guild-ban-add"></a> <a id="source-guild-ban-add-event-fields"></a>

#### Guild Ban Add

 Dispatched when a user is banned from a guild. Bots receive it only with the `BAN_MEMBERS` or `VIEW_AUDIT_LOG` permission.

###### Guild Ban Add Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| user | a user object | User who was banned |

