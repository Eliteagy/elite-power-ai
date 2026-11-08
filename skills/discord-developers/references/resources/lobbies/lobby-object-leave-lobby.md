# Lobby object leave lobby
Context: Discord developer reference: Lobby object leave lobby
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](remove-a-member-from-a-lobby.md) / [Following source section](link-channel-to-lobby.md)
<a id="source-leave-lobby"></a>

### Leave Lobby

  Removes the caller from the lobby. Calling this after the caller has left is safe, but the request fails if the lobby does not exist. Authorization uses a `Bearer` token. Returns nothing.

