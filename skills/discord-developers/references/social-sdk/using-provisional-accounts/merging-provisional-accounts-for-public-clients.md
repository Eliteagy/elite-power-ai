# Merging provisional accounts for public clients
Context: Discord developer reference: Merging provisional accounts for public clients
[Source](merge-lifecycle-and-clients-index.md) / [Previous source section](merge-request-response.md) / [Following source section](data-migration-during-merging.md)
<a id="source-merging-provisional-accounts-for-public-clients"></a>

### Merging Provisional Accounts for Public Clients

 This approach requires **Public Client** on the app, a setting most shipped games should avoid unless the team intentionally accepts it. [Learn more](https://docs.discord.com/developers/discord-social-sdk/core-concepts/oauth2-scopes#oauth2-client-types). For clients without a backend, use [`Client::GetTokenFromProvisionalMerge`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a41062b7dafa331ddd2320daf1b4b273b) on Desktop & Mobile or [`Client::GetTokenFromDeviceProvisionalMerge`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#afd2207590ae7d6f60ee7bbb4fc7c21c8) on Console; those methods cover the process. First, enable Public Client in the Discord application's OAuth2 tab in the Discord developer portal. Then call [`Client::GetTokenFromProvisionalMerge`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#a41062b7dafa331ddd2320daf1b4b273b) or [`Client::GetTokenFromDeviceProvisionalMerge`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#afd2207590ae7d6f60ee7bbb4fc7c21c8) from the client. Use this function together with [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) when a provisional-account user wants to connect an existing Discord account or upgrade the provisional account into a full Discord account. During this account merging flow, provisional-account data is migrated into the Discord account: relationships, DMs, and lobby memberships move over. The provisional account is deleted after merge completion. If the user later unlinks, Discord creates a new provisional account with a new unique ID. The merge starts like standard login: call [`Client::Authorize`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#ace94a58e27545a933d79db32b387a468) to receive an authorization code. Instead of `GetToken`, call the merge token function and include the provisional user's identity. Discord uses that identity to locate both the provisional account and the new Discord account, then merges data as needed. Callback behavior is covered by [`Client::GetToken`](https://discord.com/developers/docs/social-sdk/classdiscordpp_1_1Client.html#aaee636f91fb1ea3465157c20313b702c). The callback runs when token exchange finishes, but account merging is asynchronous and may still be in progress.

```
// Create a code verifier and challenge if using GetToken
auto codeVerifier = client->CreateAuthorizationCodeVerifier();
discordpp::AuthorizationArgs args{};
args.SetClientId(YOUR_DISCORD_APPLICATION_ID);
args.SetScopes(discordpp::Client::GetDefaultPresenceScopes());
args.SetCodeChallenge(codeVerifier.Challenge());

client->Authorize(args, [client, codeVerifier](discordpp::ClientResult result, std::string code, std::string redirectUri) {
  if (!result.Successful()) {
    std::cerr << "❌ Authorization Error: " << result.Error() << std::endl;
  } else {
    std::cout << "✅ Authorization successful! Next step: GetTokenFromProvisionalMerge \n";

    // Retrieve your external auth token
    std::string externalAuthToken = GetExternalAuthToken();

    client->GetTokenFromProvisionalMerge(YOUR_DISCORD_APPLICATION_ID, code, codeVerifier.Verifier(), redirectUri, discordpp::AuthenticationExternalAuthType::OIDC, externalAuthToken,[client](
      discordpp::ClientResult result,
      std::string accessToken,
      std::string refreshToken,
      discordpp::AuthorizationTokenType tokenType,
      int32_t expiresIn,
      std::string scope) {
        if (result.Successful()) {
          std::cout << "🔓 Token received! Establishing connection...\n";
          client->UpdateToken(discordpp::AuthorizationTokenType::Bearer, accessToken, [client](discordpp::ClientResult result) {
            client->Connect();
          });
        } else {
          std::cerr << "❌ Token request failed: " << result.Error() << std::endl;
        }
    });

  }
});

```

