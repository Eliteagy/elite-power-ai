# Implementing provisional accounts
Context: Discord developer reference: Implementing provisional accounts
[Source](authentication-and-merging-index.md) / [Previous source section](external-auth-types.md) / [Following source section](server-authentication-with-bot-token-endpoint.md)
<a id="source-implementing-provisional-accounts"></a>

### Implementing Provisional Accounts

 Creating a Provisional Account and requesting its Access Token are one operation. You provide external authentication that uniquely identifies the user, and Discord locates the user linked to that identifier.
- If the identity has no associated account, Discord creates a provisional account and returns a new access token for that user.
- If the identity already has a provisional account, Discord returns an access token.
- If the identity already maps to a *full Discord account*, the request is aborted; see [Error Handling](https://docs.discord.com/developers/discord-social-sdk/development-guides/using-provisional-accounts#error-handling).
 After authentication succeeds, use the access token the same way you would use a full Discord user's access token.

