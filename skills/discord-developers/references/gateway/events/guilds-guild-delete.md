# Guilds guild delete
Context: Discord developer reference: Guilds guild delete
[Source](channel-thread-and-message-events-index.md) / [Owning endpoint, event, object or procedure conditions](guilds-guild-create.md) / [Previous source section](guilds-guild-update.md) / [Following source section](guild-audit-log-entry-create.md)
<a id="source-guild-delete"></a>

#### Guild Delete

 Dispatched when a guild becomes unavailable, was already unavailable because of an outage, or the user leaves or is removed from a guild. The payload body is an [unavailable guild](https://docs.discord.com/developers/resources/guild#unavailable-guild-object) object. If `unavailable` is unset, the user was removed from the guild.

