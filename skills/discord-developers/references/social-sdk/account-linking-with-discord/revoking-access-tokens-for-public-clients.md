# Revoking access tokens for public clients
Context: Discord developer reference: Revoking access tokens for public clients
[Source](account-linking-with-discord-index.md) / [Previous source section](server-to-server-token-revocation.md) / [Following source section](out-of-band-revocation.md)
<a id="source-revoking-access-tokens-for-public-clients"></a>

### Revoking Access Tokens for Public Clients

 This path requires **Public Client** to be enabled for your app, which most games should avoid shipping with. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types) For public clients, the simplest revocation path is the SDK method `Client::RevokeToken`. It invalidates all access and refresh tokens for the user so they cannot be used again.

```
client->RevokeToken(YOUR_DISCORD_APPLICATION_ID,
                    accessToken, // Can also use refresh token
                    [](const discordpp::ClientResult &result) {
                      if (!result.Successful()) {
                        std::cout
                            << "? Error revoking token: " << result.Error()
                            << std::endl;
                        return;
                      }

                      std::cout
                          << "? Token successfully revoked! User logged out."
                          << std::endl;
                      // Handle successful logout (clear stored tokens,
                      // redirect to login, etc.)
                    });

```

