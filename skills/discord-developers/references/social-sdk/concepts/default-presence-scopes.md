# Default presence scopes
[Source](linking-permissions-and-support-index.md) / [Previous source section](next-steps-change-log.md) / [Following source section](default-presence-scopes.md)

<a id="source-default-presence-scopes"></a>

## Default Presence Scopes

This page describes OAuth2 scopes used by the Discord Social SDK. For the broader Discord API OAuth2 scope list, including bots and webhooks, see the [OAuth2 topic guide](https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes). OAuth2 scopes control what access your app has to a user's Discord account. Configure the scopes for your integration with [`AuthorizationArgs::SetScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1AuthorizationArgs.html#aa3714d11a196e0d71c8c1cf38c506d92) on [`AuthorizationArgs`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1AuthorizationArgs.html#adb47ac55258db29d4cb8a2c506093eed), which is passed to [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) during Social SDK authentication.

<a id="source-default-presence-scopes-1"></a>

### Default Presence Scopes

 For rich presence, friends list, and similar baseline features, the Social SDK needs at least these scopes:
- `openid`
- `sdk.social_layer_presence`
 The default presence features include:
- [Account Linking](https://docs.discord.com/developers/discord-social-sdk/core-concepts/core-features#account-linking)
- [Provisional Accounts](https://docs.discord.com/developers/discord-social-sdk/core-concepts/core-features#provisional-accounts)
- [Friend System & Relationships](https://docs.discord.com/developers/discord-social-sdk/core-concepts/core-features#friend-system-relationships)
- [Presence & Rich Presence](https://docs.discord.com/developers/discord-social-sdk/core-concepts/core-features#presence-rich-presence)
 The Social SDK includes [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c), which returns `openid sdk.social_layer_presence`. Use it when setting up OAuth2 for integrations that need only the functionality listed above. Default presence scopes alone do not allow a game to use limited-access communication features.
