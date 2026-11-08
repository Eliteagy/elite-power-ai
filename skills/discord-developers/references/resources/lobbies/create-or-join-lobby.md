# Create or join lobby
Context: Discord developer reference: Create or join lobby
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-member-json-params.md) / [Following source section](create-or-join-lobby-parameters.md)
<a id="source-create-or-join-lobby"></a>

### Create or Join Lobby

  Creates a lobby for the application identified by `secret`; if that same secret already has a lobby, the caller joins it. Joining updates lobby metadata and the caller's member metadata. Authorization uses a `Bearer` token with [`sdk.social_layer`](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#default-communication-scopes) scope. A [lobby](https://docs.discord.com/developers/resources/lobby#lobby-object) object is returned.

