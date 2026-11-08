# Gateway events
Context: Discord developer reference: Gateway events
[Source](threads-index.md) / [Previous source section](permissions.md) / [Following source section](thread-membership.md)
<a id="source-gateway-events"></a>

### Gateway Events

- [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) includes `threads`, an array of channel objects representing all active threads the current user can view in the guild.
- Creating, updating, or deleting a thread sends [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create), [Thread Update](https://docs.discord.com/developers/events/gateway-events#thread-update), or [Thread Delete](https://docs.discord.com/developers/events/gateway-events#thread-delete). As with channel events, the payload contains the thread.
- Because the gateway syncs only active visible threads, gaining access to a channel may require syncing that channel's active threads. Discord sends a [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) event for that case; the [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) payload identifies the affected channels.

