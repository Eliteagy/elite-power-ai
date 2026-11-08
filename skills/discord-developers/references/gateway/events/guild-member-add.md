# Guild member add
Context: Discord developer reference: Guild member add
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guild-integrations-update.md) / [Following source section](guild-member-remove.md)
<a id="source-guild-member-add"></a> <a id="source-guild-member-add-extra-fields"></a>

#### Guild Member Add

 When [Gateway Intents](https://docs.discord.com/developers/events/gateway#gateway-intents) are used, `GUILD_MEMBERS` is required for this event. It is dispatched when a user joins a guild, and can also arrive for users who already belong to the guild. The payload body is a [guild member](https://docs.discord.com/developers/resources/guild#guild-member-object) object plus an extra `guild_id` key:

###### Guild Member Add Extra Fields

| Field | Type | Description |
| --- | --- | --- |
| guild_id | snowflake | ID of the guild |

