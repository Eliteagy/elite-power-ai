# Private channels
Context: Discord developer reference: Private channels
[Source](linked-channels-index.md) / [Previous source section](channel-requirements-required-permissions.md) / [Following source section](linking-a-lobby.md)
<a id="source-private-channels"></a>

### Private Channels

 Discord lets a user link any server channel they can access, including channels that are private from other server members. For example, an admin could link a private admins chat channel. The game cannot determine which Discord users should be allowed into that channel, and every lobby member can read and reply to linked-channel messages. If private channels are allowed, clearly warn users that the linked channel will be visible to the full lobby. Discord provides the `isViewableAndWriteableByAllMembers` boolean to help identify public versus restricted channels; use it to block private channel links or to decide when to show a warning.

