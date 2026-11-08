# Guild audit log entry create
Context: Discord developer reference: Guild audit log entry create
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guilds-guild-delete.md) / [Following source section](guild-ban-add.md)
<a id="source-guild-audit-log-entry-create"></a> <a id="source-guild-audit-log-entry-create-event-extra-fields"></a>

#### Guild Audit Log Entry Create

 Dispatched after a guild audit log entry is created. The payload body is an [Audit Log Entry](https://docs.discord.com/developers/resources/audit-log#audit-log-entry-object) object with an extra `guild_id` key. Only bots with the `VIEW_AUDIT_LOG` permission receive this event.

###### Guild Audit Log Entry Create Event Extra Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |

