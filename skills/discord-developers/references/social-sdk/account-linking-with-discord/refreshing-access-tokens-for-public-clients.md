# Refreshing access tokens for public clients
Context: Discord developer reference: Refreshing access tokens for public clients
[Source](account-linking-with-discord-index.md) / [Previous source section](server-to-server-token-refresh.md) / [Following source section](when-refresh-fails.md)
<a id="source-refreshing-access-tokens-for-public-clients"></a>

### Refreshing Access Tokens for Public Clients

 This path requires **Public Client** to be enabled for your app, which most games should avoid shipping with. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) For public clients, the simplest refresh path is the SDK method [`Client::RefreshToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a187af0f99f94b3b9a4ad4302f6a443e7).

```
client->RefreshToken(
      YOUR_DISCORD_APPLICATION_ID, GetRefreshToken(),
      [client](discordpp::ClientResult result, std::string accessToken,
               std::string refreshToken,
               discordpp::AuthorizationTokenType tokenType, int32_t expiresIn,
               std::string scope) {
        if (!result.Successful()) {
          std::cout << "❌ Error refreshing token: " << result.Error()
                    << std::endl;
          return;
        }

        // Update token and connect
        UpdateToken(client, refreshToken, accessToken);
      });

```

