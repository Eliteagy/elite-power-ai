# Enumerating threads
Context: Discord developer reference: Enumerating threads
[Source](threads-index.md) / [Previous source section](new-message-types.md) / [Following source section](webhooks.md)
<a id="source-enumerating-threads"></a>

### Enumerating threads

 Four `GET` routes enumerate threads for a channel or guild:
- [`/guilds/<guild_id>/threads/active`](https://docs.discord.com/developers/resources/guild#list-active-guild-threads) returns accessible active public and private threads in a guild
- [`/channels/<channel_id>/users/@me/threads/archived/private`](https://docs.discord.com/developers/resources/channel#list-joined-private-archived-threads) returns archived private threads in a channel where the current user is a member, sorted by descending thread ID
- [`/channels/<channel_id>/threads/archived/public`](https://docs.discord.com/developers/resources/channel#list-public-archived-threads) returns archived public threads in a channel, sorted by descending archive timestamp
- [`/channels/<channel_id>/threads/archived/private`](https://docs.discord.com/developers/resources/channel#list-private-archived-threads) returns archived private threads in a channel, sorted by descending archive timestamp

