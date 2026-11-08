# Prerequisites
Context: Discord developer reference: Prerequisites
[Source](managing-game-invites-index.md) / [Previous source section](overview.md) / [Following source section](configuring-rich-presence-to-enable-game-invites.md)
<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, confirm you have the following:
- Finished the [Setting Rich Presence](https://docs.discord.com/developers/discord-social-sdk/development-guides/setting-rich-presence) guide
- Understand that invites require active Rich Presence with party data
- Configured the Discord Social SDK by following the [Getting Started guide](https://docs.discord.com/developers/discord-social-sdk/getting-started)
 To use this communication capability, include [`Client::GetDefaultCommunicationScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a71499da752fbdc2d4326ae0fd36c0dd1) in your OAuth Scope configuration. The [OAuth Scopes Core Concepts Guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) covers the available scopes.

---

