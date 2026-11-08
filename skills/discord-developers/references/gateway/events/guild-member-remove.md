# Guild member remove
Context: Discord developer reference: Guild member remove
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-member-add.md) / [Following source section](guild-member-update.md)
<a id="source-guild-member-remove"></a> <a id="source-guild-member-remove-event-fields"></a>

#### Guild Member Remove

 When [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents) are used, `GUILD_MEMBERS` is required for this event. It is dispatched when a user leaves, is kicked from, or is banned from a guild.

###### Guild Member Remove Event Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |
| user | a user object | User who was removed |

