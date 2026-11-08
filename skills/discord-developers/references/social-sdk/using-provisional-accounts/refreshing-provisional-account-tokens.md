# Refreshing provisional account tokens
Context: Discord developer reference: Refreshing provisional account tokens
[Source](authentication-and-merging-index.md) / [Owning endpoint, event, object or procedure conditions](provisional-account-access-tokens.md) / [Following source section](provisional-account-access-token-storage.md)
<a id="source-refreshing-provisional-account-tokens"></a>

#### Refreshing Provisional Account Tokens

 Use [`Client::SetTokenExpirationCallback`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aab5bfc76809ea22e79f2f7a067ac4519) to receive a callback when the current token is near expiration or expired, letting the game refresh without disrupting the user. When the token expires, call the original token acquisition method again, then pass the new token to [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4). The SDK still receives updates such as lobby messages, and voice calls stay active, after token expiration. New actions, such as sending messages or adding friends, fail until a fresh token is passed to [`Client::UpdateToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a606b32cef7796f7fb91c2497bc31afc4).

```
// Register a callback to handle token expiration
client->SetTokenExpirationCallback([client](discordpp::AuthorizationTokenType tokenType) {
    // Re-acquire a new token using the same method you used originally.
    // For example, if you used GetProvisionalToken:
    std::string externalToken = GetExternalAuthToken(); // get a fresh token from your identity provider
    client->GetProvisionalToken(DISCORD_APPLICATION_ID,
        discordpp::AuthenticationExternalAuthType::OIDC,
        externalToken,
        [client](discordpp::ClientResult result, std::string accessToken, std::string refreshToken,
                 discordpp::AuthorizationTokenType tokenType, int32_t expiresIn, std::string scope) {
            if (result.Successful()) {
                // Pass the new access token to UpdateToken — no reconnect needed
                client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken, [](discordpp::ClientResult result) {
                    if (result.Successful()) {
                        std::cout << "✅ Token refreshed successfully\n";
                    }
                });
            } else {
                std::cerr << "❌ Failed to refresh provisional token: " << result.Error() << std::endl;
            }
        });
});

```

 For Server Authentication with OIDC, the response returns `refresh_token`, but the OAuth2 `refresh_token` grant is **deprecated**. Re-authenticate with a fresh provider token.

