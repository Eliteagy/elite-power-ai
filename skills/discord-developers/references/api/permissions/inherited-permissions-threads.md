# Inherited permissions threads
Context: Discord developer reference: Inherited permissions threads
[Source](permissions-index.md) / [Previous source section](implicit-permissions.md) / [Following source section](permission-syncing.md)
<a id="source-inherited-permissions-threads"></a>

### Inherited Permissions (Threads)

Threads use permissions from their parent channel, except for message sending. `SEND_MESSAGES` does not carry into threads; a user needs `SEND_MESSAGES_IN_THREADS` to post there. That lets users participate in threads created under areas such as announcement channels. A user still needs `VIEW_CHANNEL` to see *any* thread in the parent channel, even after being mentioned in or added to that thread.

