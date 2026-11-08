# Tracking state
Context: Discord developer reference: Tracking state
[Source](intents-members-and-sharding-index.md) / [Previous source section](transport-compression-zstd-stream.md) / [Following source section](guild-availability.md)
<a id="source-tracking-state"></a>

### Tracking State

 Most client state arrives in the initial [Ready](https://docs.discord.com/developers/events/gateway#ready-event) event and later [Guild Create](https://docs.discord.com/developers/events/gateway-events#guild-create) events. As resources are created, changed, and removed, Gateway events notify the app and include relevant data. Cache the resource state the app needs so it can avoid excessive API calls, then update cached state as events arrive. Large apps can accumulate a very large client state, so keep only data required for operation. Some member data, such as roles or permissions, may not need separate caching because events like [MESSAGE_CREATE](https://docs.discord.com/developers/events/gateway-events#message-create) include the full member object. For a member-status tracker, the app receives guild member online status during the initial Gateway connection, including online, idle, dnd, or offline. It then parses [Presence Update](https://docs.discord.com/developers/events/gateway-events#presence-update) events and updates cached member objects as those updates arrive.

