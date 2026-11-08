# Token exchange for public clients
Context: Discord developer reference: Token exchange for public clients
[Source](account-linking-with-discord-index.md) / [Owning endpoint, event, object or procedure conditions](server-to-server-get-token-exchange.md) / [Previous source section](authorization-code-token-exchange-response.md) / [Following source section](working-with-tokens.md)
<a id="source-token-exchange-for-public-clients"></a>

#### Token Exchange for Public Clients

 This path requires **Public Client** to be enabled for your app, which most games should avoid shipping with. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) If there is no backend server, enable `Public Client` in the Discord Developer Portal and use [`Client::GetToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aaee636f91fb1ea3465157c20313b702c) to exchange the authorization code automatically. Provide the code verifier that produced the Step 1 code challenge.

```
client->GetToken(YOUR_DISCORD_APPLICATION_ID, code, codeVerifier.Verifier(), redirectUri,
  [client](discordpp::ClientResult result,
    std::string accessToken,
    std::string refreshToken,
    discordpp::AuthorizationTokenType tokenType,
    int32_t expiresIn,
    std::string scope) {
    std::cout << "🔓 Access token received! Establishing connection...\n";
    // Next step: Update the token in the client and connect to Discord
  });

```

---

