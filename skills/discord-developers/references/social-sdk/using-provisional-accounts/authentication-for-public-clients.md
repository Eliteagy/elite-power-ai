# Authentication for public clients
Context: Discord developer reference: Authentication for public clients
[Source](authentication-and-merging-index.md) / [Previous source section](external-credentials-exchange-response.md) / [Following source section](oidc-integration-requirements.md)
<a id="source-authentication-for-public-clients"></a>

### Authentication for Public Clients

 This method requires **Public Client** to be enabled for the app. Most games should not ship with this enabled. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) If `Public Client` is enabled on the Discord app, the following code can authenticate players with the external provider.

```
// filepath: your_game/auth_manager.cpp
void AuthenticateUser(std::shared_ptr<discordpp::Client> client) {
    // Get your external auth token (Steam, OIDC, etc.)
    std::string externalToken = GetExternalAuthToken();

    // Get provisional token from Discord
    client->GetProvisionalToken(DISCORD_APPLICATION_ID,
        discordpp::AuthenticationExternalAuthType::OIDC,
        externalToken,
        [client](discordpp::ClientResult result, std::string accessToken, std::string refreshToken, discordpp::AuthorizationTokenType tokenType, int32_t expiresIn, std::string scope) {
        if (result.Successful()) {
            std::cout << "🔓 Provisional token received! Establishing connection...\n";
            client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken, [client](discordpp::ClientResult result) {
                client->Connect();
            });
        } else {
            std::cerr << "❌ Provisional token request failed: " << result.Error() << std::endl;
        }
    });
}

```

