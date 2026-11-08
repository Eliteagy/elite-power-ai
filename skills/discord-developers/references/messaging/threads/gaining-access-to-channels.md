# Gaining access to channels
Context: Discord developer reference: Gaining access to channels
[Source](threads-index.md) / [Previous source section](gaining-access-to-public-threads.md) / [Following source section](losing-access-to-channels.md)
<a id="source-channel-access"></a> <a id="source-gaining-access-to-channels"></a>

### Channel Access

#### Gaining Access to Channels

 When an app gains access to a channel, such as by receiving a moderator role, it may not have that channel's threads in memory because the Gateway only syncs visible threads. Discord sends [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) to address this. The [Thread List Sync](https://docs.discord.com/developers/events/gateway-events#thread-list-sync) event includes `channel_ids`, the IDs of channels whose threads are being synced. Use it to clear active threads whose `parent_id` is in `channel_ids`, then ingest the event's thread list.

