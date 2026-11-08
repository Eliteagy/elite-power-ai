# Working with tokens
Context: Discord developer reference: Working with tokens
[Source](account-linking-on-mobile-index.md) / [Previous source section](client-side-update-token.md) / [Following source section](i-os-authorization-opens-browser-instead-of-discord-app.md)
<a id="source-working-with-tokens"></a>

### Working with Tokens

 Store the player's access and refresh tokens for later sessions. Because `access_token`s generally expire after 7 days, use the `refresh_token` to refresh the player's access token; the process is covered in [Refreshing Access Tokens](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#refreshing-access-tokens).

---

