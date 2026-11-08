# Unmerging provisional accounts for public clients
Context: Discord developer reference: Unmerging provisional accounts for public clients
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](unmerging-with-bot-token-endpoint.md) / [Following source section](out-of-band-unmerge.md)
<a id="source-unmerging-provisional-accounts-for-public-clients"></a>

### Unmerging Provisional Accounts for Public Clients

 This method requires **Public Client** on the app, which most shipped games should avoid. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types). For the fastest public-client unmerge path, call [`Client::UnmergeIntoProvisionalAccount`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a2da21ae8a3015e0e5e42c1a7226b256f); it performs the full process. The method is intended for public clients with no backend server. **Important Notes:**
- This function is only for **public clients**, meaning applications without backend servers
- Enable "Public Client" in the Discord application's OAuth2 tab in the Discord developer portal
- After unmerge, call [`Client::GetProvisionalToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a8003130b6c46e54ac68442483bf0480c) to retrieve a fresh provisional token for the new provisional account

```
// unmerge a user account
void UnmergeUserAccount(const std::shared_ptr<discordpp::Client>& client) {
    // Get your external auth token (Steam, OIDC, etc.)
    std::string externalToken = GetExternalAuthToken();

    // Unmerge the Discord account from the external identity
    client->UnmergeIntoProvisionalAccount(
        YOUR_DISCORD_APPLICATION_ID,
        discordpp::AuthenticationExternalAuthType::OIDC, // or STEAM, EOS, etc.
        externalToken,
        [client, externalToken](const discordpp::ClientResult &result) {
            if (result.Successful()) {
                std::cout << "✅ Account unmerged successfully! Creating new provisional account...\n";

                // Now get a new provisional token for the unlinked identity
                client->GetProvisionalToken(
                    YOUR_DISCORD_APPLICATION_ID,
                    discordpp::AuthenticationExternalAuthType::OIDC,
                    externalToken,
                    [client](const discordpp::ClientResult &result,
                                 const std::string &accessToken,
                                                     const std::string& refreshToken,
                                                     discordpp::AuthorizationTokenType tokenType,
                                                     int32_t expiresIn,
                                                     const std::string& scopes) {
                        if (result.Successful()) {
                            std::cout << "🔓 New provisional account created! Establishing connection...\n";
                            client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken,
                                [client](const discordpp::ClientResult &updateResult) {
                                    if (updateResult.Successful()) {
                                        client->Connect();
                                    } else {
                                        std::cerr << "❌ Failed to update token: " << updateResult.Error() << std::endl;
                                    }
                                }
                            );
                        } else {
                            std::cerr << "❌ Failed to create new provisional account: " << result.Error() << std::endl;
                        }
                    }
                );
            } else {
                std::cerr << "❌ Unmerge failed: " << result.Error() << std::endl;
            }
        }
    );
}

```

