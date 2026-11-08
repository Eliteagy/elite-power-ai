# Prerequisites
Context: Discord developer reference: Prerequisites
[Source](creating-a-unified-friends-list-index.md) / [Previous source section](overview.md) / [Following source section](implementing-a-unified-friends-list.md)
<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, confirm that you have:
- Configured the Discord Social SDK by following the [Getting Started Guide](https://docs.discord.com/developers/discord-social-sdk/getting-started)
- Authenticated users with [Development Guide: Account Linking](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord)
- Learned the relationship model from [Development Guide: Managing Relationships in Your Game](https://docs.discord.com/developers/discord-social-sdk/development-guides/managing-relationships)
 This feature needs the **Default Presence Scopes** (`openid` and `sdk.social_layer_presence`). When configuring OAuth2, use [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c). The [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) describes the full scope set.

