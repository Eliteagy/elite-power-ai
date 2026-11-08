# Link channel to lobby
Context: Discord developer reference: Link channel to lobby
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-object-leave-lobby.md) / [Following source section](link-channel-to-lobby-parameters.md)
<a id="source-link-channel-to-lobby"></a>

### Link Channel to Lobby

  Connects a lobby with an existing text channel. See [Linked Channels](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels) for details. Authorization uses a `Bearer` token, and the operation requires a lobby member holding the `CanLinkLobby` [lobby member flag](https://docs.discord.com/developers/resources/lobby#lobby-member-object-lobby-member-flags). A [lobby](https://docs.discord.com/developers/resources/lobby#lobby-object) object containing a linked channel is returned.

