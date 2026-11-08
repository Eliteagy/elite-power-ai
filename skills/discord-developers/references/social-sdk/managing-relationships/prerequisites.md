# Prerequisites
Context: Discord developer reference: Prerequisites
[Source](managing-relationships-index.md) / [Previous source section](overview.md) / [Following source section](understanding-relationship-types.md)
<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, confirm you have:
- Finished the [Getting Started](https://docs.discord.com/developers/discord-social-sdk/getting-started) guide
- Finished the [Creating a Unified Friends List](https://docs.discord.com/developers/discord-social-sdk/development-guides/creating-a-unified-friends-list) guide
 This feature depends on the **Default Presence Scopes** (`openid` and `sdk.social_layer_presence`). Configure your OAuth2 flow with [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c). For the complete scope list, see the [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes).

---

