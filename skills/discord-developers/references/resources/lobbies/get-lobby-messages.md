# Get lobby messages
Context: Discord developer reference: Get lobby messages
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](lobby-message-object.md) / [Following source section](lobby-object-query-params.md)
<a id="source-get-lobby-messages"></a>

### Get Lobby Messages

  Returns the newest messages in the specified lobby. The caller must be a lobby member. Authorization uses a `Bearer` token with the [`sdk.social_layer`](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#default-communication-scopes) scope. For the object shape, see [Send Lobby Message](https://docs.discord.com/developers/resources/lobby#send-lobby-message); the response contains lobby message objects.

