# Obtaining the parent access token
Context: Discord developer reference: Obtaining the parent access token
[Source](publisher-level-account-linking-index.md) / [Previous source section](implementing-token-exchange.md) / [Following source section](exchanging-parent-token-for-child-token.md)
<a id="source-linked-discord-account-flow"></a> <a id="source-provisional-account-flow"></a> <a id="source-obtaining-the-parent-access-token"></a>

### Linked Discord Account Flow

### Provisional Account Flow

### Obtaining the Parent Access Token

 Before exchanging tokens, get the parent access token by authorizing with the **publisher application ID**. Either Discord OAuth2 authorization or provisional-account authorization can produce it. For publisher level account linking, use the publisher application ID for all authorization work. OAuth2 and provisional account requests made with child (game) application IDs fail. User authorization is only valid through the publisher application. Follow [Account Linking with Discord](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord) or [Using Provisional Accounts](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts) with your publisher application id; the result is a parent access token and refresh token.

