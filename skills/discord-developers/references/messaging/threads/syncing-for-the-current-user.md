# Syncing for the current user
Context: Discord developer reference: Syncing for the current user
[Source](threads-index.md) / [Previous source section](thread-membership.md) / [Following source section](syncing-for-other-users.md)
<a id="source-syncing-for-the-current-user"></a>

### Syncing for the current user

- Discord always emits [Thread Members Update](https://docs.discord.com/developers/events/gateway-events#thread-members-update) for current-user membership changes, including being added to a thread or removed from one.
- [Thread Member Update](https://docs.discord.com/developers/events/gateway-events#thread-member-update) is sent whenever the current user's [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object changes.
- Some API calls, including archived-thread listing and search, return an array of [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) objects for returned threads that include the current user. Other calls, such as getting a channel, return the current user's [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object as a property on the channel when applicable.
- [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) includes a [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object on returned threads where the current user is a member.
- [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) includes a [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) object on the thread when the current user is a member and recently gained access to the parent channel.
- [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) includes [thread member](https://docs.discord.com/developers/resources/channel#thread-member-object) objects for returned threads where the current user is a member.

