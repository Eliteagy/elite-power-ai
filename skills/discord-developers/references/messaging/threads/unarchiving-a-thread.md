# Unarchiving a thread
Context: Discord developer reference: Unarchiving a thread
[Source](threads-index.md) / [Previous source section](losing-access-to-channels.md) / [Following source section](forums.md)
<a id="source-unarchiving-a-thread"></a>

### Unarchiving a Thread

 When a thread is unarchived, an app may lack the thread or its membership state in memory. The Gateway therefore sends two events in this order:
1. [Thread Update](https://docs.discord.com/developers/events/gateway-events#thread-update), containing the complete channel object.
2. [Thread Member Update](https://docs.discord.com/developers/events/gateway-events#thread-member-update), sent to every member of the unarchived thread. Discord clients load only active threads at startup, so this event is sent even when many apps may not need it.

