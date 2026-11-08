# Syncing for other users
Context: Discord developer reference: Syncing for other users
[Source](threads-index.md) / [Previous source section](syncing-for-the-current-user.md) / [Following source section](editing-deleting-threads.md)
<a id="source-syncing-for-other-users"></a>

### Syncing for other users

 These operations require the `GUILD_MEMBERS` [Gateway Intent](https://docs.discord.com/developers/events/gateway#gateway-intents).
- An API `GET` request to [`/channels/<channel_id>/thread-members`](https://docs.discord.com/developers/resources/channel#list-thread-members) returns an array of [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) objects.
- [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) includes users added to or removed from a thread by an action.

