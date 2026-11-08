# Send lobby message
Context: Discord developer reference: Send lobby message
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](unlink-channel-from-lobby.md) / [Following source section](send-lobby-message-parameters.md)
<a id="source-send-lobby-message"></a>

### Send Lobby Message

  Posts into the specified lobby. The caller must be a lobby member. The created lobby message object is returned. Authorization uses a `Bearer` token with the [`sdk.social_layer`](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#default-communication-scopes) scope. When the lobby includes [a linked channel](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels), Discord forwards the message there too. If forwarding fails, for example because of AutoMod, other lobby members still receive the lobby message.

