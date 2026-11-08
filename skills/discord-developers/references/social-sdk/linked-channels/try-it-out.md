# Try it out
Context: Discord developer reference: Try it out
[Source](linked-channels-index.md) / [Previous source section](saving-a-channel-link-selection.md) / [Following source section](set-up-message-handling.md)
<a id="source-try-it-out"></a>

### Try It Out

 To prototype Linked Channels before building a full player UI, use the Discord API with this flow:
1. Create a lobby with the **[Create Lobby](https://docs.discord.com/developers/resources/lobby#create-lobby)** endpoint.
2. Set the `CanLinkLobby` flag (`1 << 0`) for the lobby member by calling `/lobbies/<lobby_id>/members/<user_id>` or by including the member data in the [Create Lobby](https://docs.discord.com/developers/resources/lobby#create-lobby) request body.
3. Choose a Discord server text channel where the `lobby_member` has the required permissions, including read/write and manage channels, then record the channel id.
4. Call `/lobbies/<lobby_id>/channel-linking` with that channel id.
 The lobby and channel should now be connected; messages sent on either side should appear on the other side.

---

