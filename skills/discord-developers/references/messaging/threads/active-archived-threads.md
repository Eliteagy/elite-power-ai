# Active archived threads
Context: Discord developer reference: Active archived threads
[Source](threads-index.md) / [Previous source section](locked-threads.md) / [Following source section](permissions.md)
<a id="source-active--archived-threads"></a>

### Active & Archived Threads

 A thread is either active or archived; moving from archived to active is unarchiving. If `locked` is true, only a user with `MANAGE_THREADS` can unarchive it. Archiving reduces UI clutter and limits the active thread set that must be kept available, because archived thread counts can become large. Guilds therefore cap the number of active threads. Mutation is limited to active threads: archived threads do not allow users to edit messages, add reactions, use application commands, or join; deleting messages is the only expected operation inside one. Sending a message automatically unarchives a thread unless a moderator locked it. The gateway is built so bots can accurately track active threads, but archived threads are not synced up front. Threads do not count toward a guild's max-channels limit, though guilds do have a maximum active-thread count. Threads auto-archive after inactivity. As a server nears the max thread limit, the timer may shorten, usually not below `auto_archive_duration`; very busy channels with 7 day auto archive can archive sooner to avoid the server becoming full. Activity means sending a message, unarchiving, or changing the auto-archive time. `auto_archive_duration` previously controlled how long a thread stayed active, but now controls how long it remains in the channel list. Channels may also define `default_auto_archive_duration`, which clients use to preselect an `auto_archive_duration` when creating a thread.

