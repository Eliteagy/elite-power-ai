# Working with tokens
Context: Discord developer reference: Working with tokens
[Source](../entry-points/entry-points-and-linking-index.md) / [Owning endpoint, event, object or procedure conditions](overview.md) / [Previous source section](example-for-manual-token-authorization.md) / [Following source section](overview-next-steps.md)
<a id="source-working-with-tokens"></a>

### Working with Tokens

 After receiving access and refresh tokens for the player, set the SDK access token with [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4). The user is then authorized, and the game can call [`Client::Connect`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a873a844c7c4c72e9e693419bb3e290aa).

```
client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken, [client](discordpp::ClientResult result) {
  client->Connect();
});

```

 Store the player's access and refresh tokens for later sessions. Remember that `access_token` values expire. Use the `refresh_token` to refresh the token; that process is covered in [Refreshing Access Tokens](https://docs.discord.com/developers/discord-social-sdk/development-guides/account-linking-with-discord#refreshing-access-tokens).

---

