# Create lobby channel invite for self
Context: Discord developer reference: Create lobby channel invite for self
[Source](../invites-and-lobbies-index.md) / [Owning endpoint, event, object or procedure conditions](lobby-object.md) / [Previous source section](update-lobby-message-moderation-metadata-parameters.md) / [Following source section](create-lobby-channel-invite-for-user.md)
<a id="source-create-lobby-channel-invite-for-self"></a>

### Create Lobby Channel Invite for Self

  Generates a single-use guild invite to the lobby's [linked channel](https://docs.discord.com/developers/discord-social-sdk/development-guides/linked-channels), for the calling user. The lobby needs a linked channel; membership is required for the caller. The invite expires after one hour. A [lobby invite object](https://docs.discord.com/developers/resources/lobby#lobby-invite-object) is returned. Authorization uses a `Bearer` token with the [`sdk.social_layer`](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#default-communication-scopes) scope.

