# Working with tokens
Context: Discord developer reference: Working with tokens
[Source](account-linking-with-discord-index.md) / [Previous source section](token-exchange-for-public-clients.md) / [Following source section](refreshing-access-tokens.md)
<a id="source-working-with-tokens"></a>

### Working with Tokens

 After you receive an access token, pass it into the SDK with [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4). The user is authorized at that point. Store both the player's access token and refresh tokens, because `access_token` values expire and the `refresh_token` is needed to obtain a fresh access token.

```
client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, ACCESS_TOKEN_VALUE, [client](discordpp::ClientResult result) {
  if (result.Successful()) client->Connect();
});

```

---

