# Public private threads
Context: Discord developer reference: Public private threads
[Source](threads-index.md) / [Previous source section](thread-fields.md) / [Following source section](locked-threads.md)
<a id="source-public--private-threads"></a>

### Public & Private Threads

 Public threads are visible to users who can view the parent channel. They must start from an existing message, though they may become orphaned if that message is removed. The thread and starter message share an ID. The parent channel [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) determines the resulting thread [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types): `GUILD_TEXT` channels [create](https://docs.discord.com/developers/resources/channel#start-thread-from-message) `PUBLIC_THREAD`, and `GUILD_ANNOUNCEMENT` channels [create](https://docs.discord.com/developers/resources/channel#start-thread-from-message) `ANNOUNCEMENT_THREAD`. Private threads are guild-scoped and behave like Group DMs. They are always [created](https://docs.discord.com/developers/resources/channel#start-thread-without-message) as `GUILD_PRIVATE_THREAD` [type](https://docs.discord.com/developers/resources/channel#channel-object-channel-types) and can only be created inside `GUILD_TEXT` channels.

