# Gaining access to private threads
Context: Discord developer reference: Gaining access to private threads
[Source](threads-index.md) / [Previous source section](details-about-thread-access-and-syncing.md) / [Following source section](gaining-access-to-public-threads.md)
<a id="source-thread-access"></a> <a id="source-gaining-access-to-private-threads"></a>

### Thread Access

#### Gaining Access to Private Threads

 When an app is added to a private thread, it often does not already have that thread in memory because it lacked permission to view it. Private threads are synced only for members and moderators. When a user is added to a private thread, the Gateway sends [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create), ensuring the client has a non-null thread value. `THREAD_CREATE` is also sent for moderators, even though they may already have the channel in memory.

