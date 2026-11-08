# Prerequisites
Context: Discord developer reference: Prerequisites
[Source](account-linking-with-discord-index.md) / [Previous source section](flexible-account-options.md) / [Following source section](our-authentication-flow.md)
<a id="source-prerequisites"></a>

### Prerequisites

 Before starting, confirm you have the following:
- Read the [Core Concepts](https://docs.discord.com/developers/discord-social-sdk/core-concepts) guide so these topics are familiar:
  - OAuth2 authentication flow
  - Discord application setup
  - SDK initialization

- Prepared your development environment with:
  - A Discord application in the [Developer Portal](https://discord.com/developers/applications)
  - The Discord Social SDK downloaded and configured
  - A working basic SDK integration, including initialization and connection

 If these prerequisites are not complete, follow the [Getting Started](https://docs.discord.com/developers/discord-social-sdk/getting-started) guide first. This feature needs the **Default Presence Scopes** (`openid` and `sdk.social_layer_presence`). Configure your OAuth2 flow with [`Client::GetDefaultPresenceScopes`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a7648bd1d2f7d9a86ebd0edb8bef12b5c), and use the [OAuth2 Scopes guide](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes) for the full scope list.

---

