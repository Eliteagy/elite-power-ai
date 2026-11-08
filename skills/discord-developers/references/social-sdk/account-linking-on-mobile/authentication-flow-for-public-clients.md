# Authentication flow for public clients
Context: Discord developer reference: Authentication flow for public clients
[Source](account-linking-on-mobile-index.md) / [Previous source section](how-pkce-works.md) / [Following source section](create-code-verifier-and-challenge.md)
<a id="source-authentication-flow-for-public-clients"></a>

### Authentication Flow for Public Clients

 This path requires **Public Client** to be enabled for your app, which most games should avoid shipping with. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) If the app has no backend server and `Public Client` is enabled in the Discord Developer Portal, the SDK can handle the full authentication sequence, including PKCE.

