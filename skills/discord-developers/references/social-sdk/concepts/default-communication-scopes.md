# Default communication scopes
Context: Discord developer reference: Default communication scopes
[Source](linking-permissions-and-support-index.md) / [Owning endpoint, event, object or procedure conditions](default-presence-scopes.md) / [Previous source section](default-presence-scopes.md) / [Following source section](oauth2-client-types.md)
<a id="source-default-communication-scopes"></a>

### Default Communication Scopes

 Communication features are available with limited access. They **require** `sdk.social_layer`, a scope that includes `sdk.social_layer_presence` and also permits the app to use those limited features for the user.
- `openid`
- `sdk.social_layer`
 These communication features include:
- [Messaging & Communication](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#messaging-communication)
- [Lobbies & In-Game Chat](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#lobbies-ingame-chat)
- [Linked Channels](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features#linked-channels)
 The Social SDK includes [`Client::GetDefaultCommunicationScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a71499da752fbdc2d4326ae0fd36c0dd1), which returns `openid sdk.social_layer`. Use it for OAuth2 setup when the integration needs both default functionality and limited communication features. For details, see [Core Concepts: Communication Features](https://docs.discord.com/developers/discord-social-sdk/core-concepts/communication-features). If your game needs additional scopes, append only the scopes required for the game to function. Asking for unnecessary scopes can reduce user trust and may cause users to avoid linking Discord.

