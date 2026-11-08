# Prerequisites
Context: Discord developer reference: Prerequisites
[Source](setting-rich-presence-index.md) / [Previous source section](overview.md) / [Following source section](understanding-rich-presence.md)
<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, verify you have:
- [Set up the Discord Social SDK](https://docs.discord.com/developers/discord-social-sdk/getting-started)
- A valid client instance connected to Discord
 This feature needs the **Default Presence Scopes** (`openid` and `sdk.social_layer_presence`). Configure OAuth2 with [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c). The [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) covers the complete scope set.

---

