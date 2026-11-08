# Gaining access to public threads
Context: Discord developer reference: Gaining access to public threads
[Source](threads-index.md) / [Owning endpoint, event, object or procedure conditions](gaining-access-to-private-threads.md) / [Following source section](gaining-access-to-channels.md)
<a id="source-gaining-access-to-public-threads"></a>

#### Gaining Access to Public Threads

 Apps automatically subscribe to thread events and active threads when connecting to the Gateway. For non-app users, being added to a public thread before subscribing may leave the thread absent from memory, which Discord clients require. Therefore the Gateway sends [Thread Create](https://docs.discord.com/developers/events/gateway-events#thread-create) whenever a user is added to *any* thread, even if apps do not strictly need that event.

