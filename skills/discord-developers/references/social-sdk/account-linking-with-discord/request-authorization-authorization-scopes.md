# Request authorization authorization scopes
Context: Discord developer reference: Request authorization authorization scopes
[Source](account-linking-with-discord-index.md) / [Owning endpoint, event, object or procedure conditions](request-authorization.md) / [Following source section](authorization-code-verifier.md)
<a id="source-authorization-scopes"></a>

#### Authorization Scopes

 Scopes are a required argument to [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468); they define the permissions your game requests from the user. The Discord Social SDK provides two helper methods for the common cases:
| Helper Method | Scopes Requested | Features Enabled |
| --- | --- | --- |
| `Client::GetDefaultPresenceScopes` | `openid sdk.social_layer_presence` | Account linking, friends list, rich presence |
| `Client::GetDefaultCommunicationScopes` | `openid sdk.social_layer` | Everything above, plus lobbies, voice chat, direct messaging, and linked channels |

 Use [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c) as the starting point unless communication features are required. You can request additional scopes later as the integration grows. The [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) has the complete details.

