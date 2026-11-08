# Unlink channel from lobby
Context: Discord developer reference: Unlink channel from lobby
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](link-channel-to-lobby-parameters.md) / [Following source section](send-lobby-message.md)
<a id="source-unlink-channel-from-lobby"></a>

### Unlink Channel from Lobby

  Clears any channels linked to the specified lobby. Send this endpoint an empty body to remove current links. Authorization uses a `Bearer` token, and the operation requires a lobby member holding the `CanLinkLobby` [lobby member flag](https://docs.discord.com/developers/resources/lobby#lobby-member-object-lobby-member-flags). The returned [lobby](https://docs.discord.com/developers/resources/lobby#lobby-object) object has no linked channel.

